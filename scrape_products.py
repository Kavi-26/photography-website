"""
Karakovan Photography / Product Image Scraper
Visits Karakovan.in pages, discovers portfolio/product galleries, extracts
highest-resolution images, downloads them into organized folders, and writes a CSV report.
"""

import argparse
import csv
import hashlib
import os
import re
import sys
import time
from pathlib import Path
from urllib.parse import urljoin, urlparse, urldefrag
import requests
from bs4 import BeautifulSoup

# Ensure Windows terminal doesn't crash on character encoding
if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass


BASE_URL = "https://www.karakovan.in/"
DEFAULT_OUTPUT_DIR = Path("downloaded_products")
DEFAULT_MAX_PAGES = 50
DEFAULT_DELAY = 0.5
USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/124.0.0.0 Safari/537.36"
)

# Common image extensions
IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif", ".svg"}


def clean_url(url: str) -> str:
    """Strip fragments and normalize trailing slashes on directory paths."""
    url, _ = urldefrag(url)
    url = url.strip()
    parsed = urlparse(url)
    path = parsed.path
    if path and not path.endswith("/") and "." not in Path(path).name:
        path = path + "/"
    return parsed._replace(path=path).geturl()


def sanitize_folder_name(name: str) -> str:
    """Sanitize folder or file name for Windows filesystem."""
    # Replace characters not allowed in Windows paths: <>:"/\|?*
    clean = re.sub(r'[<>:"/\\|?*]+', "_", name)
    clean = re.sub(r"\s+", "_", clean).strip(" ._-")
    # Preserve extension if present
    p = Path(clean)
    stem = p.stem[:80] if p.stem else "untitled"
    suffix = p.suffix[:10]
    return f"{stem}{suffix}" if suffix else stem


def extract_highest_res_from_srcset(srcset_str: str) -> str | None:
    """
    Parses a srcset string (e.g. 'url1 300w, url2 2500w') and returns the URL
    with the highest width descriptor.
    """
    if not srcset_str:
        return None
    candidates = []
    for item in srcset_str.split(","):
        parts = item.strip().split()
        if not parts:
            continue
        url = parts[0]
        width = 0
        if len(parts) > 1:
            w_match = re.search(r"(\d+)w", parts[1])
            if w_match:
                width = int(w_match.group(1))
            else:
                x_match = re.search(r"([\d.]+)x", parts[1])
                if x_match:
                    width = int(float(x_match.group(1)) * 1000)
        candidates.append((width, url))

    if candidates:
        candidates.sort(key=lambda x: x[0], reverse=True)
        return candidates[0][1]
    return None


def get_page_category_name(page_url: str, soup: BeautifulSoup) -> str:
    """Determine a human-friendly folder name for the page."""
    parsed = urlparse(page_url)
    path_parts = [p for p in parsed.path.split("/") if p]
    if path_parts:
        slug = path_parts[-1]
        # Clean slug
        slug = re.sub(r"[-_]+", " ", slug).title()
        return sanitize_folder_name(slug)

    # If home page, check title
    title_tag = soup.find("title")
    if title_tag and title_tag.string:
        t = title_tag.string.split("-")[0].strip()
        if t and "karakovan" not in t.lower():
            return sanitize_folder_name(t)
    return "Home"


def is_image_url(url: str) -> bool:
    """Check if URL points to an image resource."""
    parsed = urlparse(url)
    path_lower = parsed.path.lower()
    
    # Exclude font files, scripts, stylesheets, or telemetry
    if any(ext in path_lower for ext in [".woff", ".woff2", ".ttf", ".eot", ".css", ".js"]):
        return False
    if "sentry.io" in url or "google-analytics" in url:
        return False
    # Exclude Pixieset theme templates/placeholders
    if "sample_photos" in url:
        return False
        
    # Check known image extensions
    for ext in IMAGE_EXTENSIONS:
        if path_lower.endswith(ext):
            return True
            
    # Check Pixieset / Instagram CDN patterns
    if "images-pw.pixieset.com" in parsed.netloc:
        return True
    if "cdninstagram.com" in parsed.netloc:
        return True

    return False


def extract_images_from_html(html_content: str, current_page_url: str) -> list[dict]:
    """
    Extracts all images from regular img tags, srcset, lazy attributes on any tag,
    CSS background styles, Instagram feed widgets, and embedded Pixieset JSON payloads.
    """
    soup = BeautifulSoup(html_content, "html.parser")
    found_urls = {}  # url -> {'source': source_type}

    def add_candidate(raw_url: str, source: str):
        if not raw_url:
            return
        # Clean html entities and query params if needed
        cleaned = raw_url.replace("&amp;", "&").strip()
        cleaned = cleaned.rstrip(")'\"`}>,;\\").lstrip("('\"`<")
        # For Pixieset CDN images, strip query params like &amp;description=...
        if "pixieset.com" in cleaned and ("?" in cleaned or "&" in cleaned):
            cleaned = re.split(r"[?&]", cleaned)[0]
        full_url = urljoin(current_page_url, cleaned)
        if is_image_url(full_url):
            if full_url not in found_urls:
                found_urls[full_url] = {"source": source}

    # 1. <img> and <picture><source> tags
    for img in soup.find_all("img"):
        srcset = img.get("srcset")
        highest = extract_highest_res_from_srcset(srcset)
        if highest:
            add_candidate(highest, "img_srcset_highres")
        src = img.get("src")
        if src:
            add_candidate(src, "img_src")

    for source in soup.find_all("source"):
        srcset = source.get("srcset")
        highest = extract_highest_res_from_srcset(srcset)
        if highest:
            add_candidate(highest, "picture_source")

    # 2. Any elements with data-* image attributes (including divs, spans, etc.)
    for el in soup.find_all(attrs=True):
        for attr in ["data-lazy", "data-src", "data-original", "data-bg", "data-background"]:
            if el.has_attr(attr):
                val = el[attr]
                if val:
                    add_candidate(val, f"attr_{attr}")

    # 3. CSS inline background-image
    for tag in soup.find_all(style=True):
        style = tag["style"]
        matches = re.findall(r"url\(['\"]?(https?://[^'\")]+)['\"]?\)", style)
        for m in matches:
            add_candidate(m, "css_background")

    # 4. OpenGraph and Twitter meta tags
    for meta in soup.find_all("meta", property=re.compile(r"og:image")):
        add_candidate(meta.get("content"), "meta_og_image")
    for meta in soup.find_all("meta", attrs={"name": re.compile(r"twitter:image")}):
        add_candidate(meta.get("content"), "meta_twitter_image")

    # 5. Raw Pixieset image URLs inside scripts / JSON payloads (like js-payload-pw)
    pixieset_matches = re.findall(r"https?://images-pw\.pixieset\.com/[^\"'\\<>\s]+", html_content)
    for m in pixieset_matches:
        clean_m = m.replace(r"\/", "/")
        add_candidate(clean_m, "json_payload")

    # 6. Instagram feed URLs inside footer widgets / scripts
    ig_matches = re.findall(r"https?://[^\s\"\'<>\\]*cdninstagram\.com/[^\s\"\'<>\\]+", html_content)
    for m in ig_matches:
        clean_m = m.replace(r"\/", "/")
        add_candidate(clean_m, "instagram_feed")

    # Deduplicate Pixieset images having multiple size variants:
    # If we have both a 300/500/1000 and 1500/2500 of the same base file, keep the highest!
    # Pixieset format: .../<id>/<basename>-<hash>-<size>.jpg
    deduped = {}
    for url, info in found_urls.items():
        # Match pixieset size variant pattern
        m = re.search(r"^(.*?)-[a-f0-9]+-(\d+)\.(jpg|jpeg|png|webp)$", url, re.IGNORECASE)
        if m:
            base_key = m.group(1)
            size = int(m.group(2))
            ext = m.group(3)
            if base_key not in deduped or size > deduped[base_key]["size"]:
                deduped[base_key] = {"url": url, "size": size, "info": info}
        else:
            deduped[url] = {"url": url, "size": 0, "info": info}

    results = []
    for item in deduped.values():
        results.append({
            "url": item["url"],
            "source": item["info"]["source"]
        })

    return results


def crawl_and_scrape(
    base_url: str = BASE_URL,
    output_dir: Path = DEFAULT_OUTPUT_DIR,
    max_pages: int = DEFAULT_MAX_PAGES,
    delay: float = DEFAULT_DELAY,
    dry_run: bool = False,
    max_images_per_page: int | None = None
):
    """
    Crawls internal pages starting from base_url, extracts all product/gallery images,
    downloads them into organized subdirectories, and saves image_report.csv.
    """
    output_dir.mkdir(parents=True, exist_ok=True)
    report_csv_path = output_dir / "image_report.csv"

    session = requests.Session()
    session.headers.update({
        "User-Agent": USER_AGENT,
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
    })

    base_domain = urlparse(base_url).netloc
    visited_pages = set()
    queue = [clean_url(base_url)]
    downloaded_image_hashes = set()  # prevent downloading byte-identical files

    reports = []
    total_images_saved = 0

    print("=" * 65)
    print(f"[*] Starting Karakovan Image Scraper")
    print(f"   Base URL:    {base_url}")
    print(f"   Output dir:  {output_dir.resolve()}")
    print(f"   Max pages:   {max_pages}")
    print(f"   Dry run:     {dry_run}")
    print("=" * 65)

    page_counter = 0

    while queue and page_counter < max_pages:
        current_page = queue.pop(0)
        current_page = clean_url(current_page)

        if current_page in visited_pages:
            continue

        visited_pages.add(current_page)
        page_counter += 1

        print(f"\n[{page_counter}/{max_pages}] Visiting: {current_page}")

        try:
            resp = session.get(current_page, timeout=15)
            if resp.status_code != 200:
                print(f"   [!] HTTP {resp.status_code} for {current_page}")
                continue
        except Exception as e:
            print(f"   [!] Error fetching page: {e}")
            continue

        soup = BeautifulSoup(resp.text, "html.parser")
        category_name = get_page_category_name(current_page, soup)
        page_folder = output_dir / category_name
        if not dry_run:
            page_folder.mkdir(parents=True, exist_ok=True)

        # Discover internal links to queue
        for a_tag in soup.find_all("a", href=True):
            href = a_tag["href"].strip()
            full_link = urljoin(current_page, href)
            full_link = clean_url(full_link)
            parsed_link = urlparse(full_link)

            # Keep only same domain, http/https, no anchors or assets
            if (
                parsed_link.netloc == base_domain
                and parsed_link.scheme in ("http", "https")
                and not any(parsed_link.path.lower().endswith(ext) for ext in [".pdf", ".zip", ".jpg", ".png"])
                and full_link not in visited_pages
                and full_link not in queue
            ):
                queue.append(full_link)

        # Extract images
        image_records = extract_images_from_html(resp.text, current_page)
        print(f"   [+] Section: '{category_name}' | Found {len(image_records)} candidate image(s)")

        if max_images_per_page:
            image_records = image_records[:max_images_per_page]

        for idx, img_info in enumerate(image_records, start=1):
            img_url = img_info["url"]
            source_type = img_info["source"]

            # Generate target filename
            parsed_img = urlparse(img_url)
            img_filename = Path(parsed_img.path).name

            if not img_filename or len(img_filename) < 4:
                img_filename = f"image_{idx:03d}.jpg"
            else:
                img_filename = sanitize_folder_name(img_filename)
                # Ensure extension
                if not any(img_filename.lower().endswith(ext) for ext in IMAGE_EXTENSIONS):
                    img_filename += ".jpg"

            target_file = page_folder / img_filename

            # Avoid filename collisions in same folder
            stem = target_file.stem
            suffix = target_file.suffix
            counter = 1
            while target_file.exists() and not dry_run:
                target_file = page_folder / f"{stem}_{counter}{suffix}"
                counter += 1

            # Check if image hash already downloaded elsewhere
            url_hash = hashlib.md5(img_url.encode("utf-8")).hexdigest()
            if url_hash in downloaded_image_hashes:
                reports.append({
                    "page_title": category_name,
                    "page_url": current_page,
                    "image_url": img_url,
                    "local_path": str(target_file.relative_to(output_dir)),
                    "resolution_source": source_type,
                    "status": "skipped_duplicate",
                    "file_size_kb": 0
                })
                continue

            downloaded_image_hashes.add(url_hash)

            if dry_run:
                print(f"     [DRY-RUN] Found: {img_url} ({source_type})")
                reports.append({
                    "page_title": category_name,
                    "page_url": current_page,
                    "image_url": img_url,
                    "local_path": str(target_file.relative_to(output_dir)),
                    "resolution_source": source_type,
                    "status": "dry_run",
                    "file_size_kb": 0
                })
                continue

            # Download the image
            try:
                img_resp = session.get(img_url, timeout=20, stream=True)
                if img_resp.status_code == 200:
                    with open(target_file, "wb") as f:
                        for chunk in img_resp.iter_content(chunk_size=16384):
                            if chunk:
                                f.write(chunk)

                    size_kb = round(target_file.stat().st_size / 1024, 1)
                    total_images_saved += 1
                    print(f"     [+] Downloaded: {target_file.name} ({size_kb} KB)")

                    reports.append({
                        "page_title": category_name,
                        "page_url": current_page,
                        "image_url": img_url,
                        "local_path": str(target_file.relative_to(output_dir)),
                        "resolution_source": source_type,
                        "status": "success",
                        "file_size_kb": size_kb
                    })
                else:
                    print(f"     [!] HTTP {img_resp.status_code} for {img_url}")
                    reports.append({
                        "page_title": category_name,
                        "page_url": current_page,
                        "image_url": img_url,
                        "local_path": "",
                        "resolution_source": source_type,
                        "status": f"http_{img_resp.status_code}",
                        "file_size_kb": 0
                    })
            except Exception as e:
                print(f"     [-] Download error for {img_url}: {e}")
                reports.append({
                    "page_title": category_name,
                    "page_url": current_page,
                    "image_url": img_url,
                    "local_path": "",
                    "resolution_source": source_type,
                    "status": f"error: {str(e)}",
                    "file_size_kb": 0
                })

            time.sleep(0.05)  # micro-delay between image downloads

        time.sleep(delay)

    # Save CSV Report
    if reports:
        with open(report_csv_path, "w", newline="", encoding="utf-8") as csvfile:
            fieldnames = [
                "page_title",
                "page_url",
                "image_url",
                "local_path",
                "resolution_source",
                "status",
                "file_size_kb"
            ]
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(reports)

    print("\n" + "=" * 65)
    print("[*] Scraping Completed!")
    print(f"   Pages visited:       {len(visited_pages)}")
    print(f"   Images downloaded:   {total_images_saved}")
    print(f"   CSV Report saved to: {report_csv_path.resolve()}")
    print("=" * 65)


def main():
    parser = argparse.ArgumentParser(description="Scrape images from Karakovan.in")
    parser.add_argument("--url", default=BASE_URL, help=f"Base URL (default: {BASE_URL})")
    parser.add_argument(
        "--output",
        type=Path,
        default=DEFAULT_OUTPUT_DIR,
        help=f"Output folder (default: {DEFAULT_OUTPUT_DIR})",
    )
    parser.add_argument(
        "--max-pages",
        type=int,
        default=DEFAULT_MAX_PAGES,
        help=f"Max pages to visit (default: {DEFAULT_MAX_PAGES})",
    )
    parser.add_argument(
        "--delay",
        type=float,
        default=DEFAULT_DELAY,
        help=f"Delay in seconds between page requests (default: {DEFAULT_DELAY})",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Crawl pages and discover images without saving files to disk",
    )
    parser.add_argument(
        "--limit-per-page",
        type=int,
        default=None,
        help="Optional limit on images per page (useful for testing)",
    )

    args = parser.parse_args()
    crawl_and_scrape(
        base_url=args.url,
        output_dir=args.output,
        max_pages=args.max_pages,
        delay=args.delay,
        dry_run=args.dry_run,
        max_images_per_page=args.limit_per_page,
    )


if __name__ == "__main__":
    main()

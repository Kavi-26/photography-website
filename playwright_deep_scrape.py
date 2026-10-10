"""
Playwright Deep Scraper for Karakovan.in
Renders pages in full Chromium, handles JavaScript execution, scrolls pages
to trigger IntersectionObservers and lazy loaders, intercepts network image
requests, and downloads all high-res photos into organized folders.
"""

import asyncio
import csv
import hashlib
import re
import sys
import time
from pathlib import Path
from urllib.parse import urljoin, urlparse, urldefrag
import requests
from bs4 import BeautifulSoup
from playwright.async_api import async_playwright

BASE_URL = "https://www.karakovan.in/"
OUTPUT_DIR = Path("downloaded_products")
IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif", ".svg"}

USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/124.0.0.0 Safari/537.36"
)


def clean_url(url: str) -> str:
    url, _ = urldefrag(url)
    url = url.strip()
    parsed = urlparse(url)
    path = parsed.path
    if path and not path.endswith("/") and "." not in Path(path).name:
        path = path + "/"
    return parsed._replace(path=path).geturl()


def sanitize_folder_name(name: str) -> str:
    clean = re.sub(r'[<>:"/\\|?*]+', "_", name)
    clean = re.sub(r"\s+", "_", clean).strip(" ._-")
    p = Path(clean)
    stem = p.stem[:80] if p.stem else "untitled"
    suffix = p.suffix[:10]
    return f"{stem}{suffix}" if suffix else stem


def get_page_category_name(page_url: str) -> str:
    parsed = urlparse(page_url)
    path_parts = [p for p in parsed.path.split("/") if p]
    if path_parts:
        slug = path_parts[-1]
        slug = re.sub(r"[-_]+", " ", slug).title()
        return sanitize_folder_name(slug)
    return "Home"


def is_image_url(url: str) -> bool:
    parsed = urlparse(url)
    path_lower = parsed.path.lower()
    if any(ext in path_lower for ext in [".woff", ".woff2", ".ttf", ".eot", ".css", ".js"]):
        return False
    if "sentry.io" in url or "google-analytics" in url or "sample_photos" in url:
        return False
    for ext in IMAGE_EXTENSIONS:
        if path_lower.endswith(ext):
            return True
    if "images-pw.pixieset.com" in parsed.netloc or "cdninstagram.com" in parsed.netloc:
        return True
    return False


async def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    report_csv = OUTPUT_DIR / "image_report.csv"

    session = requests.Session()
    session.headers.update({"User-Agent": USER_AGENT})

    visited_pages = set()
    queue = [clean_url(BASE_URL)]
    base_domain = urlparse(BASE_URL).netloc

    all_discovered_images = {}  # url -> {'page': ..., 'source': ...}

    print("=" * 65)
    print("[*] Starting Playwright Deep Scraper for Karakovan.in")
    print("=" * 65)

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            user_agent=USER_AGENT,
            viewport={"width": 1920, "height": 1080}
        )
        page = await context.new_page()

        # Listen to network requests for images
        def handle_response(response):
            try:
                url = response.url
                content_type = response.headers.get("content-type", "")
                if ("image" in content_type or is_image_url(url)) and is_image_url(url):
                    clean_m = re.split(r"[?&]", url)[0] if "pixieset.com" in url else url
                    if clean_m not in all_discovered_images:
                        all_discovered_images[clean_m] = {
                            "page": page.url,
                            "source": "network_response"
                        }
            except Exception:
                pass

        page.on("response", handle_response)

        while queue:
            current_url = queue.pop(0)
            if current_url in visited_pages:
                continue

            visited_pages.add(current_url)
            print(f"\n[+] Navigating with Chromium: {current_url}")

            try:
                await page.goto(current_url, wait_until="networkidle", timeout=30000)
            except Exception as e:
                print(f"    [!] Navigation warning: {e}")

            # Smooth scroll down to trigger IntersectionObservers / lazy images
            try:
                scroll_height = await page.evaluate("() => document.body.scrollHeight")
                for pos in range(0, scroll_height, 600):
                    await page.evaluate(f"window.scrollTo(0, {pos})")
                    await asyncio.sleep(0.15)
                await page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
                await asyncio.sleep(1.0)
            except Exception:
                pass

            # Extract internal links from DOM
            hrefs = await page.eval_on_selector_all(
                "a[href]",
                "elements => elements.map(e => e.href)"
            )
            for h in hrefs:
                clean_h = clean_url(h)
                parsed_h = urlparse(clean_h)
                if (
                    parsed_h.netloc == base_domain
                    and parsed_h.scheme in ("http", "https")
                    and not any(parsed_h.path.lower().endswith(ext) for ext in [".pdf", ".zip", ".jpg", ".png"])
                    and clean_h not in visited_pages
                    and clean_h not in queue
                ):
                    queue.append(clean_h)

            # Extract DOM images (img, srcset, backgrounds, data-src)
            dom_images = await page.evaluate("""() => {
                const results = [];
                // All img tags
                document.querySelectorAll('img').forEach(img => {
                    if (img.src) results.push({url: img.src, type: 'dom_img'});
                    if (img.srcset) {
                        img.srcset.split(',').forEach(s => {
                            const p = s.trim().split(' ')[0];
                            if (p) results.push({url: p, type: 'dom_srcset'});
                        });
                    }
                    ['data-lazy', 'data-src', 'data-original'].forEach(attr => {
                        const val = img.getAttribute(attr);
                        if (val) results.push({url: val, type: 'dom_' + attr});
                    });
                });
                // All elements with data-src or background-image
                document.querySelectorAll('*').forEach(el => {
                    ['data-src', 'data-lazy', 'data-original'].forEach(attr => {
                        const val = el.getAttribute(attr);
                        if (val) results.push({url: val, type: 'dom_' + attr});
                    });
                    const style = window.getComputedStyle(el);
                    const bg = style.backgroundImage;
                    if (bg && bg !== 'none') {
                        const match = bg.match(/url\\(['"]?(https?:\\/\\/[^'"]+)['"]?\\)/);
                        if (match) results.push({url: match[1], type: 'computed_bg'});
                    }
                });
                return results;
            }""")

            for item in dom_images:
                raw_u = item["url"]
                clean_u = re.split(r"[?&]", raw_u)[0] if "pixieset.com" in raw_u else raw_u
                clean_u = clean_u.rstrip(")'\"`}>,;\\").lstrip("('\"`<")
                if is_image_url(clean_u) and clean_u not in all_discovered_images:
                    all_discovered_images[clean_u] = {
                        "page": current_url,
                        "source": item["type"]
                    }

        await browser.close()

    print("\n" + "=" * 65)
    print(f"[*] Total Raw Image URLs Discovered by Playwright: {len(all_discovered_images)}")
    print("=" * 65)

    # High-resolution upgrade & deduplication for Pixieset
    # Group by photo ID base
    photo_groups = {}
    for url, meta in all_discovered_images.items():
        m = re.search(r"^(.*?)-[a-f0-9]+-(\d+)\.(jpg|jpeg|png|webp)$", url, re.IGNORECASE)
        if m:
            base_key = m.group(1)
            size = int(m.group(2))
            if base_key not in photo_groups or size > photo_groups[base_key]["size"]:
                photo_groups[base_key] = {"url": url, "size": size, "meta": meta}
        else:
            photo_groups[url] = {"url": url, "size": 0, "meta": meta}

    print(f"[*] Distinct Photographs (Highest-Resolution): {len(photo_groups)}")

    # Download any photos that are not yet downloaded
    downloaded_count = 0
    skipped_count = 0
    reports = []

    for item in photo_groups.values():
        img_url = item["url"]
        meta = item["meta"]
        page_url = meta["page"]
        category_name = get_page_category_name(page_url)

        # If it's an Instagram image, place in Instagram_Feed
        if "instagram" in img_url.lower():
            category_name = "Instagram_Feed"

        page_folder = OUTPUT_DIR / category_name
        page_folder.mkdir(parents=True, exist_ok=True)

        parsed_img = urlparse(img_url)
        img_filename = Path(parsed_img.path).name
        if not img_filename or len(img_filename) < 4:
            img_filename = f"photo_{hashlib.md5(img_url.encode()).hexdigest()[:8]}.jpg"
        else:
            img_filename = sanitize_folder_name(img_filename)
            if not any(img_filename.lower().endswith(ext) for ext in IMAGE_EXTENSIONS):
                img_filename += ".jpg"

        target_file = page_folder / img_filename

        if target_file.exists() and target_file.stat().st_size > 0:
            skipped_count += 1
            reports.append({
                "page_title": category_name,
                "page_url": page_url,
                "image_url": img_url,
                "local_path": str(target_file.relative_to(OUTPUT_DIR)),
                "resolution_source": meta["source"],
                "status": "already_exists",
                "file_size_kb": round(target_file.stat().st_size / 1024, 1)
            })
            continue

        try:
            resp = session.get(img_url, timeout=20, stream=True)
            if resp.status_code == 200:
                with open(target_file, "wb") as f:
                    for chunk in resp.iter_content(chunk_size=16384):
                        if chunk:
                            f.write(chunk)
                size_kb = round(target_file.stat().st_size / 1024, 1)
                downloaded_count += 1
                print(f"  [+] Downloaded new: {target_file.name} ({size_kb} KB)")
                reports.append({
                    "page_title": category_name,
                    "page_url": page_url,
                    "image_url": img_url,
                    "local_path": str(target_file.relative_to(OUTPUT_DIR)),
                    "resolution_source": meta["source"],
                    "status": "success",
                    "file_size_kb": size_kb
                })
            else:
                reports.append({
                    "page_title": category_name,
                    "page_url": page_url,
                    "image_url": img_url,
                    "local_path": "",
                    "resolution_source": meta["source"],
                    "status": f"http_{resp.status_code}",
                    "file_size_kb": 0
                })
        except Exception as e:
            reports.append({
                "page_title": category_name,
                "page_url": page_url,
                "image_url": img_url,
                "local_path": "",
                "resolution_source": meta["source"],
                "status": f"error: {e}",
                "file_size_kb": 0
            })

    # Save comprehensive CSV report
    with open(report_csv, "w", newline="", encoding="utf-8") as f:
        fieldnames = ["page_title", "page_url", "image_url", "local_path", "resolution_source", "status", "file_size_kb"]
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(reports)

    print("\n" + "=" * 65)
    print(f"[*] Playwright Scraping Complete!")
    print(f"    Already downloaded:  {skipped_count}")
    print(f"    Newly downloaded:    {downloaded_count}")
    print(f"    Total in collection: {skipped_count + downloaded_count}")
    print(f"    Report updated:      {report_csv.resolve()}")
    print("=" * 65)


if __name__ == "__main__":
    asyncio.run(main())

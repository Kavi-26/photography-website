import requests
import re
import csv
from bs4 import BeautifulSoup
from urllib.parse import urljoin
from pathlib import Path

urls = [
    'https://www.karakovan.in/',
    'https://www.karakovan.in/portfolio/',
    'https://www.karakovan.in/couples/',
    'https://www.karakovan.in/weddings/',
    'https://www.karakovan.in/elopements/',
    'https://www.karakovan.in/adventure/',
    'https://www.karakovan.in/investment/',
    'https://www.karakovan.in/experience/',
    'https://www.karakovan.in/about/',
    'https://www.karakovan.in/contact/',
    'https://www.karakovan.in/blog/',
    'https://www.karakovan.in/blog/the-subconscious-echo-when-art-emerges-unbidden/'
]

csv_path = Path('downloaded_products/image_report.csv')
with open(csv_path, encoding='utf-8') as f:
    report = list(csv.DictReader(f))

downloaded_urls = set(x['image_url'] for x in report if x['status'] == 'success')
all_reported_urls = set(x['image_url'] for x in report)

print(f"Report has {len(all_reported_urls)} recorded URLs ({len(downloaded_urls)} successful downloads)")

all_raw_images = set()
instagram_images = set()
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for u in urls:
    r = requests.get(u, headers=headers)
    matches = re.findall(r'https://images-pw\.pixieset\.com/[^\s"\'<>\\]+', r.text)
    for m in matches:
        m = m.replace(r'\/', '/').replace('&amp;', '&')
        m = re.split(r'[?&]', m)[0]
        m = m.rstrip(")'\"`}>,;\\").lstrip("('\"`<")
        if 'sample_photos' not in m and not m.endswith('.css') and not m.endswith('.js'):
            all_raw_images.add(m)

    ig_matches = re.findall(r'https://[^\s"\'<>\\]*cdninstagram\.com/[^\s"\'<>\\]+', r.text)
    for ig in ig_matches:
        ig = ig.replace(r'\/', '/').replace('&amp;', '&')
        instagram_images.add(ig)

print(f"Total Pixieset image URLs found in raw HTML: {len(all_raw_images)}")
print(f"Total Instagram feed images found in footer: {len(instagram_images)}")

# Group raw pixieset images by distinct photo base
photo_bases = {}
for img in all_raw_images:
    m = re.search(r'^(.*?)-[a-f0-9]+-(\d+)\.(jpg|jpeg|png|webp)$', img, re.IGNORECASE)
    if m:
        base = m.group(1)
        size = int(m.group(2))
        if base not in photo_bases or size > photo_bases[base]['size']:
            photo_bases[base] = {'url': img, 'size': size}
    else:
        photo_bases[img] = {'url': img, 'size': 0}

print(f"Total distinct photographs across the entire site: {len(photo_bases)}")

downloaded_bases = set()
for d_url in downloaded_urls:
    m = re.search(r'^(.*?)-[a-f0-9]+-(\d+)\.(jpg|jpeg|png|webp)$', d_url, re.IGNORECASE)
    if m:
        downloaded_bases.add(m.group(1))
    else:
        downloaded_bases.add(d_url)

missing_bases = set(photo_bases.keys()) - downloaded_bases
print(f"Missing distinct photographs from download: {len(missing_bases)}")

if missing_bases:
    print("\n--- Details of Missing Photographs ---")
    for mb in missing_bases:
        print("MISSING:", photo_bases[mb]['url'])
else:
    print("\nSUCCESS: Every single distinct photograph on the website has been captured!")

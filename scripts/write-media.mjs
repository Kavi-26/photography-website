import fs from 'fs';
import path from 'path';
import os from 'os';

const pages = ['about','contact','blog','portfolio','couples','weddings','elopements','adventure','investment','experience'];
const tmp = os.tmpdir();
const media = {};

for (const page of pages) {
  const html = fs.readFileSync(path.join(tmp, `kk-${page}.html`), 'utf8')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '');
  const start = html.indexOf('class="main-body"');
  const end = html.indexOf('block-theme8-footer');
  const body = html.slice(start, end > start ? end : undefined);
  const urls = [];
  for (const m of body.matchAll(/https:\/\/images-pw\.pixieset\.com\/elementfield\/[^"'\s)]+/g)) {
    let url = m[0].replace(/&amp;/g, '&').split(' ')[0];
    if (/-300\.|-500\./.test(url)) continue;
    const base = url.replace(/-\d{3,4}\.(jpg|jpeg|png|webp)$/i, '');
    if (urls.some((u) => u.replace(/-\d{3,4}\.(jpg|jpeg|png|webp)$/i, '') === base)) continue;
    urls.push(url);
  }
  media[page] = urls;
  console.log(page, urls.length);
}

fs.writeFileSync(
  path.join('src', 'data', 'media.json'),
  JSON.stringify(media, null, 2)
);

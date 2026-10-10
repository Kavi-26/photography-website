import fs from 'fs';
import path from 'path';
import os from 'os';

const pages = ['about','contact','blog','portfolio','couples','weddings','elopements','adventure','investment','experience'];
const tmp = os.tmpdir();

function strip(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '');
}

for (const page of pages) {
  const html = strip(fs.readFileSync(path.join(tmp, `kk-${page}.html`), 'utf8'));
  const start = html.indexOf('class="main-body"');
  const end = html.indexOf('block-theme8-footer');
  const body = html.slice(start, end > start ? end : undefined);
  const urls = [];
  for (const m of body.matchAll(/https:\/\/images-pw\.pixieset\.com\/[^"'\s)]+/g)) {
    let url = m[0].replace(/&amp;/g, '&');
    if (/-300\.jpg|-500\.jpg|-1000\.jpg/.test(url)) continue;
    if (url.includes('srcset')) continue;
    url = url.split(' ')[0];
    if (!urls.includes(url)) urls.push(url);
  }
  const texts = [...body.matchAll(/<(h[1-6]|p)[^>]*>([\s\S]*?)<\/\1>/gi)]
    .map((m) => m[2].replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim())
    .filter((t) => t && t !== '.' && t.length > 1);
  console.log('\n##', page, 'imgs', urls.length);
  urls.slice(0, 18).forEach((u) => console.log(u.split('/').slice(-2).join('/')));
  console.log('TEXT:');
  [...new Set(texts)].slice(0, 18).forEach((t) => console.log('-', t.slice(0, 220)));
}

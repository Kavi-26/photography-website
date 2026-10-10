import fs from 'fs';
import path from 'path';
import os from 'os';

const page = process.argv[2];
const html = fs.readFileSync(path.join(os.tmpdir(), `kk-${page}.html`), 'utf8');
const start = html.indexOf('class="main-body"');
const end = html.indexOf('block-theme8-footer');
const body = html.slice(start, end)
  .replace(/<script[\s\S]*?<\/script>/gi, '')
  .replace(/<style[\s\S]*?<\/style>/gi, '');
const texts = [...body.matchAll(/<(h[1-6]|p)[^>]*>([\s\S]*?)<\/\1>/gi)]
  .map((m) => m[2]
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;|&#160;/g, ' ')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim())
  .filter((t) => t && t.length > 2 && t !== '.');
const uniq = [];
for (const t of texts) if (!uniq.includes(t)) uniq.push(t);
const out = path.join('src', 'data', `${page}-copy.txt`);
fs.writeFileSync(out, uniq.join('\n---\n'));
console.log(page, uniq.length, out);

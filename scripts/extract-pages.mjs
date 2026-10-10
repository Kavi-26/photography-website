import fs from 'fs';
import path from 'path';
import os from 'os';

const pages = ['about','contact','blog','portfolio','couples','weddings','elopements','adventure','investment','experience'];

function decode(s) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#8217;/g, '’')
    .replace(/&#8211;/g, '–')
    .replace(/&#8220;/g, '“')
    .replace(/&#8221;/g, '”');
}

function textOf(html) {
  return decode(
    html
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
  );
}

function imgs(html) {
  const out = [];
  for (const m of html.matchAll(/(?:src|background-image:\s*url\()["']?(https:\/\/images-pw\.pixieset\.com\/[^"')\s]+)/g)) {
    const url = m[1].replace(/&amp;/g, '&');
    if (!out.includes(url) && !url.includes('/300.') && !url.includes('-300.jpg') && !url.includes('-500.jpg') && !url.includes('-1000.jpg')) {
      out.push(url);
    }
  }
  return out;
}

const summary = {};

for (const page of pages) {
  const html = fs.readFileSync(path.join(os.tmpdir(), `kk-${page}.html`), 'utf8');
  const body = (html.split('<div class="main-body">')[1] || '').split('block-theme8-footer')[0] || '';
  const blocks = [...body.matchAll(/<div class="block-container ([^"]+)"/g)].map((m) => m[1]);
  const headings = [...body.matchAll(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi)].map((m) => textOf(m[1])).filter(Boolean);
  const paras = [...body.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map((m) => textOf(m[1])).filter((t) => t.length > 1);
  const links = [...body.matchAll(/<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ href: m[1], text: textOf(m[2]) }))
    .filter((l) => l.text && !l.href.startsWith('#') && l.text.length < 80);
  summary[page] = {
    blocks: [...new Set(blocks)],
    headings: [...new Set(headings)].slice(0, 40),
    paras: [...new Set(paras)].slice(0, 30),
    links: links.slice(0, 20),
    images: imgs(body).slice(0, 40),
  };
}

fs.writeFileSync(
  path.join(os.tmpdir(), 'kk-pages.json'),
  JSON.stringify(summary, null, 2)
);
console.log('wrote', Object.keys(summary).length);
for (const [k, v] of Object.entries(summary)) {
  console.log(k, 'blocks', v.blocks.length, 'h', v.headings.length, 'p', v.paras.length, 'img', v.images.length);
}

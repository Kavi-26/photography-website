import fs from 'fs';
import path from 'path';
import os from 'os';

const html = fs.readFileSync(path.join(os.tmpdir(), 'kk-home.html'), 'utf8');
const styleMatch = html.match(/<style>\s*:root \{--base-size:[\s\S]*?<\/style>/);
if (!styleMatch) {
  console.log('no style block');
} else {
  const keys = [...styleMatch[0].matchAll(/--([a-z0-9_-]+):([^;]+);/gi)].map(
    (x) => `--${x[1]}: ${x[2].trim()}`
  );
  fs.writeFileSync(path.join(os.tmpdir(), 'kk-vars.txt'), keys.join('\n'));
  console.log('vars', keys.length);
}

const body = html.split('<body')[1] || '';
const textish = body
  .replace(/<script[\s\S]*?<\/script>/gi, '')
  .replace(/<style[\s\S]*?<\/style>/gi, '');
const classes = [...textish.matchAll(/class="([^"]+)"/g)].map((m) => m[1]);
const interesting = classes.filter((c) =>
  /header|slide|info|portfolio|quote|testimonial|banner|footer|carousel|nav|menu|section|hero|content/i.test(c)
);
fs.writeFileSync(path.join(os.tmpdir(), 'kk-classes.txt'), [...new Set(interesting)].join('\n'));
console.log('classes', new Set(interesting).size);

const main = textish.match(/<main[\s\S]*<\/main>/i);
const source = main ? main[0] : textish;
const simplified = source
  .replace(/\s+/g, ' ')
  .replace(/<(div|section|article|header|footer|h1|h2|h3|h4|h5|p|a|span|li|ul|button|img)([^>]*)>/gi, (full, tag, attrs) => {
    const cls = (attrs.match(/class="([^"]+)"/) || [])[1] || '';
    const href = (attrs.match(/href="([^"]+)"/) || [])[1] || '';
    const src = (attrs.match(/(?:src|data-src)="([^"]+)"/) || [])[1] || '';
    const bg = (attrs.match(/background-image:\s*url\(([^)]+)\)/) || [])[1] || '';
    const bits = [tag];
    if (cls) bits.push('.' + cls.split(' ').slice(0, 3).join('.'));
    if (href) bits.push('href=' + href);
    if (src) bits.push('src=' + src.split('/').pop());
    if (bg) bits.push('bg=' + bg.split('/').pop());
    return `\n<${bits.join(' ')}>`;
  })
  .replace(/<\/(div|section|article|header|footer|h1|h2|h3|h4|h5|p|a|span|li|ul|button)>/gi, '\n</$1>');
fs.writeFileSync(path.join(os.tmpdir(), 'kk-structure.txt'), simplified.slice(0, 120000));
console.log('structure bytes', simplified.length);

import fs from 'fs';
const theme = fs.readFileSync(process.env.TEMP + '/theme8.css', 'utf8');
const n = 'display-subtitle_font-size)';
let i = 0;
let c = 0;
while ((i = theme.indexOf(n, i)) !== -1 && c < 8) {
  const s = theme.slice(Math.max(0, i - 180), i + 40);
  if (s.includes('info') || s.includes('subtitle')) {
    console.log('\n##', s);
    c += 1;
  }
  i += n.length;
}
console.log('count printed', c);
const html = fs.readFileSync(process.env.TEMP + '/kk-home.html', 'utf8');
const a = html.indexOf('--heading-5_letter-spacing');
console.log('\nH5', html.slice(a, a + 80));
const b = html.indexOf('--paragraph-1_line-height');
console.log('P', html.slice(b, b + 60));
const d = html.indexOf('--global-block-padding');
console.log('PAD', html.slice(d, d + 80));
const e = html.indexOf('--paragraph-1_letter-spacing');
console.log('PL', html.slice(e, e + 50));

import fs from 'fs';
const theme = fs.readFileSync(process.env.TEMP + '/theme8.css', 'utf8');
const n = 'info__photo-container-overlay';
let i = 0;
let c = 0;
while ((i = theme.indexOf(n, i)) !== -1 && c < 12) {
  console.log('\n##', i, theme.slice(Math.max(0, i - 120), i + 220).replace(/\n/g, ' '));
  i += n.length;
  c += 1;
}
const html = fs.readFileSync(process.env.TEMP + '/kk-home.html', 'utf8');
for (const k of ['--paragraph_font-size', '--body_font-size', '--primary-paragraphs_font-size', 'font-size:1.125rem', '--button_font-size']) {
  const j = html.indexOf(k);
  console.log('\nHTML', k, j, j >= 0 ? html.slice(j, j + 80) : '');
}
const p = theme.indexOf('.element-info .info__body,');
console.log('\nP', theme.slice(p, p + 350));
const q = theme.indexOf('info__container--style_2 .info__text-container .info__subtitle{');
console.log('\nQ', theme.slice(q - 100, q + 200));

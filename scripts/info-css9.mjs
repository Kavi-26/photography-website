import fs from 'fs';
const theme = fs.readFileSync(process.env.TEMP + '/theme8.css', 'utf8');
const needles = [
  '.info__text-container{',
  '.element-info .info__text{',
  '.info__text{',
  'info__container--style_2 .info__text-container{',
  '.button{',
  'paragraph_font-size',
  '--paragraph_',
];
for (const n of needles) {
  let i = 0;
  let c = 0;
  console.log('\n====', n);
  while ((i = theme.indexOf(n, i)) !== -1 && c < 4) {
    console.log(theme.slice(i, i + 320));
    console.log('---');
    i += n.length;
    c += 1;
  }
}
const html = fs.readFileSync(process.env.TEMP + '/kk-home.html', 'utf8');
const idx = html.indexOf('--primary-paragraphs');
console.log('\nHTML vars window');
console.log(html.slice(idx - 200, idx + 900));

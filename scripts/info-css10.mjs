import fs from 'fs';
const theme = fs.readFileSync(process.env.TEMP + '/theme8.css', 'utf8');
const needles = ['.element-info{', '.element-info .info{', '.info__body{', '.info__subtitle{', 'text-align:center}.element-info', '.info__container--style_2{'];
for (const n of needles) {
  let i = 0;
  let c = 0;
  console.log('\n====', n);
  while ((i = theme.indexOf(n, i)) !== -1 && c < 3) {
    console.log(theme.slice(Math.max(0, i - 40), i + 260));
    console.log('---');
    i += n.length;
    c += 1;
  }
}
// paragraph font in html head
const html = fs.readFileSync(process.env.TEMP + '/kk-home.html', 'utf8');
const a = html.indexOf('display-heading_font-size');
console.log('\nHEADING BLOCK\n', html.slice(a - 400, a + 700));

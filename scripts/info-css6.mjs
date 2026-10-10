import fs from 'fs';
const theme = fs.readFileSync(process.env.TEMP + '/theme8.css', 'utf8');
const n = '.info__tablet-bg{';
let i = 0;
let c = 0;
while ((i = theme.indexOf(n, i)) !== -1 && c < 6) {
  const start = Math.max(0, i - 220);
  console.log('\n##', i);
  console.log(theme.slice(start, i + 700));
  i += n.length;
  c += 1;
}
const vars = ['--accent-background', '--display-heading_font-size', '--primary-paragraphs', '--scaled-block-padding', 'text-align:center'];
const html = fs.readFileSync(process.env.TEMP + '/kk-home.html', 'utf8');
const m = html.match(/--accent-background:[^;]+;/);
const m2 = html.match(/--display-heading_font-size:[^;]+;/);
const m3 = html.match(/--primary-paragraphs:[^;]+;/);
const m4 = html.match(/--paragraph_font-size:[^;]+;/);
const m5 = html.match(/--display-heading_line-height:[^;]+;/);
const m6 = html.match(/--display-heading_letter-spacing:[^;]+;/);
console.log('\nVARS', m && m[0], m2 && m2[0], m3 && m3[0], m4 && m4[0], m5 && m5[0], m6 && m6[0]);
const body = theme.indexOf('.element-info .info__body');
console.log('\nBODY', theme.slice(body, body + 500));
const sub = theme.indexOf('.info__subtitle{');
console.log('\nSUB', theme.slice(sub, sub + 400));

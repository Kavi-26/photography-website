import fs from 'fs';
const html = fs.readFileSync(process.env.TEMP + '/kk-home.html', 'utf8');
const style = html.match(/<style id="js-ac-css-definitions">([\s\S]*?)<\/style>/);
const css = style ? style[1] : '';
const keys = ['ca-card-2rQqDg', 'ca-background-BD5LZN', 'ca-subtitle-BA5VAB', 'ca-title-BZmn82', 'ca-body-2kYq0N', 'ca-button-N0zpE2'];
for (const k of keys) {
  const i = css.indexOf('.' + k);
  console.log('\n##', k, i);
  if (i >= 0) console.log(css.slice(i, i + 280));
}
const root = html.match(/:root\{[^}]+\}/);
console.log('\nROOT', root && root[0].slice(0, 2000));
const theme = fs.readFileSync(process.env.TEMP + '/theme8.css', 'utf8');
const needles = [
  '.info__text{',
  '.element-info .info__container--style_2 .info__text-container .info__text',
  '--block-edge-space-x',
  '.info__tablet-bg',
  'info__photo-container-overlay{',
];
for (const n of needles) {
  let i = 0;
  let c = 0;
  console.log('\n====', n);
  while ((i = theme.indexOf(n, i)) !== -1 && c < 3) {
    console.log(theme.slice(Math.max(0, i - 80), i + 420));
    console.log('---');
    i += n.length;
    c += 1;
  }
}

import fs from 'fs';
const css = fs.readFileSync(process.env.TEMP + '/theme8.css', 'utf8');
const needles = ['info--b', 'info__vector', 'vector-line', 'info-b', '.element-info'];
for (const n of needles) {
  let i = 0;
  let c = 0;
  while ((i = css.indexOf(n, i)) !== -1 && c < 3) {
    console.log('\n##', n, i);
    console.log(css.slice(Math.max(0, i - 80), i + 380));
    i += n.length;
    c += 1;
  }
}

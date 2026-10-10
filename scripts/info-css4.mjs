import fs from 'fs';
const css = fs.readFileSync(process.env.TEMP + '/theme8.css', 'utf8');
const n = '.element-info .bg-line';
let i = 0;
let c = 0;
while ((i = css.indexOf(n, i)) !== -1 && c < 4) {
  console.log('\n##', i);
  console.log(css.slice(i, i + 450));
  i += n.length;
  c += 1;
}
if (c === 0) {
  const j = css.indexOf('bg-line{position');
  console.log('pos', j, css.slice(j, j + 300));
  const k = css.indexOf('.bg-line,');
  console.log('comma', k);
}

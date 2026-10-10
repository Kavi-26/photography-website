import fs from 'fs';
const theme = fs.readFileSync(process.env.TEMP + '/theme8.css', 'utf8');
const start = theme.indexOf('.element-info .info__container--style_2 .info__text-container .info__title{');
console.log(theme.slice(start, start + 1800));
console.log('\n\n==== ALIGN ====');
let i = 0;
let c = 0;
const n = 'info__text{text-align';
while ((i = theme.indexOf('text-align', i)) !== -1 && c < 8) {
  const ctx = theme.slice(Math.max(0, i - 90), i + 40);
  if (ctx.includes('info')) {
    console.log(ctx);
    console.log('---');
    c += 1;
  }
  i += 10;
}

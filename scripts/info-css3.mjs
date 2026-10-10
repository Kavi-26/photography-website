import fs from 'fs';
const css = fs.readFileSync(process.env.TEMP + '/theme8.css', 'utf8');
let i = 0;
let c = 0;
while ((i = css.indexOf('.bg-line{', i)) !== -1 && c < 6) {
  console.log('\n##', i);
  console.log(css.slice(i, i + 500));
  i += 8;
  c += 1;
}
const j = css.lastIndexOf('info__text-container .info__', css.indexOf('info__container--style_2') + 2500);
console.log('\nTAIL\n', css.slice(css.indexOf('info__container--style_2 .info__text-container .info__body'), css.indexOf('info__container--style_2 .info__text-container .info__body') + 900));

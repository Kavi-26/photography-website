import fs from 'fs';
const css = fs.readFileSync(process.env.TEMP + '/theme8.css', 'utf8');
const i = css.indexOf('info__container--style_2');
console.log(css.slice(i, i + 2200));

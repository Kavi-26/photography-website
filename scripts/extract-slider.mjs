import fs from 'fs';
const css = fs.readFileSync(process.env.TEMP + '/theme8.css', 'utf8');
const i = css.indexOf('@keyframes');
console.log('first keyframes context\n', css.slice(i - 200, i + 1800));
const names = [...css.matchAll(/@keyframes\s+([^{]+)/g)].map((m) => m[1].trim());
console.log('\nNAMES', [...new Set(names)].join(', '));

const js = fs.readFileSync(process.env.TEMP + '/theme8.js', 'utf8');
const s = js.indexOf('slider-banner');
console.log('\nJS slider', s);
if (s > 0) console.log(js.slice(s - 100, s + 600));
const a = js.indexOf('auto_play');
console.log('\nauto_play', a);

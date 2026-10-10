import fs from 'fs';
const css = fs.readFileSync(process.env.TEMP + '/theme8.css', 'utf8');
const re = /animation-duration:[^;}{]+/g;
const hits = [...css.matchAll(re)].map((m) => m[0]);
console.log([...new Set(hits)].join('\n'));

const js = fs.readFileSync(process.env.TEMP + '/theme8.js', 'utf8');
const j = js.indexOf('autoplay');
console.log('\nAUTOPLAY\n', js.slice(j - 300, j + 700));
const k = js.indexOf('ken');
console.log('\nKEN\n', js.slice(k - 200, k + 500));

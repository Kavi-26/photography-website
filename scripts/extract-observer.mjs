import fs from 'fs';
const js = fs.readFileSync(process.env.TEMP + '/index-pw.js', 'utf8');
const i = js.indexOf('animatableSelectors');
console.log(js.slice(i, i + 4500));
console.log('\n\n===== OBS =====\n');
const j = js.indexOf('animatable--animated');
console.log('count search');
let p = 0;
let c = 0;
while ((p = js.indexOf('animatedClass', p)) !== -1 && c < 8) {
  console.log('\n---', p);
  console.log(js.slice(p - 250, p + 500));
  p += 10;
  c += 1;
}

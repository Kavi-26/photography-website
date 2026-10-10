import fs from 'fs';

const css = fs.readFileSync(process.env.TEMP + '/theme8.css', 'utf8');
const start = css.indexOf('.theme-container{--animation-duration');
const end = css.indexOf('.theme-container[data-animation-duration', start + 10);
const slice = css.slice(start, start + 12000);
fs.writeFileSync(process.env.TEMP + '/anim-slice.css', slice);
console.log('wrote', slice.length, 'endMarker', end);

const js = fs.readFileSync(process.env.TEMP + '/theme8.js', 'utf8');
for (const n of ['animatable--animated', 'animation-type', 'IntersectionObserver', 'data-animation']) {
  const i = js.indexOf(n);
  console.log(n, i);
  if (i >= 0) console.log(js.slice(i - 180, i + 400));
}

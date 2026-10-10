import fs from 'fs';
const css = fs.readFileSync(process.env.TEMP + '/theme8.css', 'utf8');
let i = 0;
let n = 0;
const needle = 'data-animation-duration';
while ((i = css.indexOf(needle, i)) !== -1 && n < 12) {
  console.log('\n#', n, i);
  console.log(css.slice(i - 40, i + 220));
  i += needle.length;
  n += 1;
}

const heroNeedles = ['kenburns', 'slider', 'autoplay', 'swiper', 'fade'];
const js = fs.readFileSync(process.env.TEMP + '/theme8.js', 'utf8');
for (const n of ['autoplay', 'ken', 'slider--', 'fadeOut', 'swiper']) {
  const j = js.indexOf(n);
  console.log('JS', n, j);
}

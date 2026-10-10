import fs from 'fs';
const theme = fs.readFileSync(process.env.TEMP + '/theme8.css', 'utf8');
const needles = ['carousel-slider{', 'carousel-slider__photo{', 'carousel-slider__photos', 'carousel-slider--wrapper', '.slick-slide'];
for (const n of needles) {
  let i = 0;
  let c = 0;
  console.log('\n====', n);
  while ((i = theme.indexOf(n, i)) !== -1 && c < 4) {
    console.log(theme.slice(Math.max(0, i - 60), i + 420));
    console.log('---');
    i += n.length;
    c += 1;
  }
}
const html = fs.readFileSync(process.env.TEMP + '/kk-home.html', 'utf8');
const start = html.indexOf('class="carousel-slider pos-rel"');
console.log('\nHTML SLICE\n', html.slice(start, start + 1800));

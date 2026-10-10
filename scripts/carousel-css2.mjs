import fs from 'fs';
const theme = fs.readFileSync(process.env.TEMP + '/theme8.css', 'utf8');
const n = 'carousel-slider__photo-container--cropped';
let i = 0;
let c = 0;
while ((i = theme.indexOf(n, i)) !== -1 && c < 8) {
  console.log('\n##', i);
  console.log(theme.slice(Math.max(0, i - 140), i + 280));
  i += n.length;
  c += 1;
}
const nav = theme.indexOf('carousel-slider__nav{');
console.log('\nNAV', theme.slice(nav, nav + 500));

import fs from 'fs';

const files = process.argv.slice(2);
for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  const needles = ['animatable', 'animation-type', 'fade-on-scale', 'data-animation'];
  console.log('\n==', file, text.length);
  for (const n of needles) {
    let i = 0;
    let c = 0;
    while ((i = text.indexOf(n, i)) !== -1 && c < 3) {
      console.log('---', n, i);
      console.log(text.slice(Math.max(0, i - 120), i + 280).replace(/\n/g, ' '));
      i += n.length;
      c += 1;
    }
    if (c === 0) console.log('missing', n);
  }
}

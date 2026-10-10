import fs from 'fs';
const theme = fs.readFileSync(process.env.TEMP + '/theme8.css', 'utf8');
const n = 'info__photo-wrapper';
let i = 0;
let c = 0;
while ((i = theme.indexOf(n, i)) !== -1 && c < 15) {
  const s = theme.slice(Math.max(0, i - 30), i + 180);
  if (s.includes('style_2')) {
    console.log('\n##', i);
    console.log(s);
  }
  i += n.length;
  c += 1;
}
console.log('total', c);

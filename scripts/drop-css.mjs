import fs from 'fs';
const theme = fs.readFileSync(process.env.TEMP + '/theme8.css', 'utf8');
const needles = [
  '.header-menu__dropdown{',
  '.header-menu__dropdown-nav{',
  '.header-menu__secondary{',
  '.dropdown-item{',
  '.header-menu__dropdown .dropdown-item',
];
for (const n of needles) {
  let i = 0;
  let c = 0;
  console.log('\n====', n);
  while ((i = theme.indexOf(n, i)) !== -1 && c < 3) {
    console.log(theme.slice(Math.max(0, i - 40), i + 360));
    console.log('---');
    i += n.length;
    c += 1;
  }
}

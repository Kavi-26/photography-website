import fs from 'fs';
const css = fs.readFileSync(process.env.TEMP + '/theme8.css', 'utf8');
const needles = [
  '.post-header--a',
  '.post-header__title',
  '.post-header__date',
  '.post-header__content',
  '.post-header__photo',
  '.header-menu{',
  '.header-menu ',
  'sticky_header',
];
for (const n of needles) {
  let i = 0;
  let c = 0;
  while ((i = css.indexOf(n, i)) !== -1 && c < 2) {
    console.log('\n##', n, i);
    console.log(css.slice(i, i + 420));
    i += n.length;
    c += 1;
  }
}

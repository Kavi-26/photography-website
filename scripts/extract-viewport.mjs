import fs from 'fs';
const js = fs.readFileSync(process.env.TEMP + '/index-pw.js', 'utf8');
for (const n of ['pwaIsInViewport', 'pwaAddAnimatedClasses', 'addAnimateClassToVisibleEl']) {
  const i = js.indexOf(n + '=function') >= 0 ? js.indexOf(n + '=function') : js.indexOf(n);
  console.log('\n########', n, i);
  console.log(js.slice(i, i + 1800));
}

const css = fs.readFileSync(process.env.TEMP + '/theme8.css', 'utf8');
for (const n of ['slider-banner', 'ken-burns', 'slideshow', '@keyframes']) {
  const i = css.indexOf(n);
  console.log('\nCSS', n, i);
}

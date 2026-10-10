import fs from 'fs';
const html = fs.readFileSync(process.env.TEMP + '/kk-post.html', 'utf8');
for (const n of ['post-header__title', 'post-header__photo', 'post-header__date', 'object-position', 'background-image']) {
  const i = html.indexOf(n);
  console.log('\n====', n, i);
  if (i >= 0) console.log(html.slice(i - 120, i + 500).replace(/\s+/g, ' ').slice(0, 700));
}

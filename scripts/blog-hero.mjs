import fs from 'fs';

const html = fs.readFileSync(process.env.TEMP + '/kk-post.html', 'utf8');
const i = html.indexOf('post-header');
console.log('idx', i);
console.log(html.slice(Math.max(0, i - 200), i + 1800));

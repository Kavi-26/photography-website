import fs from 'fs';
const html = fs.readFileSync(process.env.TEMP + '/kk-home.html', 'utf8');
const i = html.indexOf('.ca-dropdown-g3JaAN');
console.log(html.slice(i, i + 180));

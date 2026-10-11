import fs from 'fs';
const theme = fs.readFileSync(process.env.TEMP + '/theme8.css', 'utf8');
const n = '.element-header-menu .header-menu__dropdown-nav{list-style';
const i = theme.indexOf(n);
console.log(theme.slice(i - 500, i + 200));

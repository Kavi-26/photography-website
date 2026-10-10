import fs from 'fs';

const css = fs.readFileSync(process.env.TEMP + '/theme8.css', 'utf8');
const needles = process.argv.slice(2);
const chunks = [];

for (const n of needles) {
  let i = 0;
  let count = 0;
  while ((i = css.indexOf(n, i)) !== -1 && count < 2) {
    const end = css.indexOf('}', i);
    chunks.push(`\n/* ${n} @${i} */\n${css.slice(i, Math.min(end + 1, i + 900))}`);
    i = end + 1;
    count++;
  }
  if (count === 0) chunks.push(`\n/* MISSING ${n} */`);
}

fs.writeFileSync(process.env.TEMP + '/kk-css-extract.css', chunks.join('\n'));
console.log(chunks.length);

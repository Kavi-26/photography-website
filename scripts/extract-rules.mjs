import fs from 'fs';

const css = fs.readFileSync(process.env.TEMP + '/theme8.css', 'utf8');
const needles = process.argv.slice(2);
const out = [];

function rulesContaining(needle) {
  const found = [];
  let i = 0;
  while ((i = css.indexOf(needle, i)) !== -1) {
    const start = css.lastIndexOf('}', i) + 1;
    const end = css.indexOf('}', i);
    if (end === -1) break;
    const rule = css.slice(start, end + 1);
    if (!found.includes(rule) && rule.length < 2500) found.push(rule);
    i = end + 1;
    if (found.length > 12) break;
  }
  return found;
}

for (const n of needles) {
  const rules = rulesContaining(n).filter((r) => r.includes(n) && !r.includes('block-map'));
  out.push(`\n\n===== ${n} (${rules.length}) =====\n` + rules.join('\n'));
}

fs.writeFileSync(process.env.TEMP + '/kk-rules.txt', out.join('\n'));
console.log('wrote', out.join('\n').length);

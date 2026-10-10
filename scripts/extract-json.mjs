import fs from 'fs';
import path from 'path';
import os from 'os';

const file = process.argv[2];
const html = fs.readFileSync(file, 'utf8');
const idx = html.indexOf('{"s":{"t":');
if (idx < 0) {
  console.log('no json', file);
  process.exit(1);
}
let raw = html.slice(idx);
const end = raw.indexOf('</script>');
if (end > 0) raw = raw.slice(0, end);
raw = raw.trim();
const data = JSON.parse(raw);
const out = path.join(os.tmpdir(), path.basename(file, '.html') + '.json');
fs.writeFileSync(out, JSON.stringify(data, null, 2));
console.log(out, 'keys', Object.keys(data));
const blks = data?.s?.blks || data?.blks;
console.log('blk keys', blks ? Object.keys(blks) : 'none');

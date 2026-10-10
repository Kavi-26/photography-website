import fs from 'fs';
import path from 'path';
import os from 'os';

const pages = process.argv.slice(2);
const tmp = os.tmpdir();

function slim(value, depth = 0) {
  if (value == null) return value;
  if (typeof value === 'string') {
    if (value.startsWith('{') || value.startsWith('[')) {
      try {
        const parsed = JSON.parse(value);
        if (parsed && typeof parsed === 'object' && (parsed.XL || parsed.LG || parsed.OR)) {
          return parsed.XL || parsed.LG || parsed.MD || parsed.OR;
        }
        return slim(parsed, depth + 1);
      } catch {
        return value.length > 500 ? value.slice(0, 500) : value;
      }
    }
    return value.length > 800 ? value.slice(0, 800) : value;
  }
  if (typeof value !== 'object') return value;
  if (Array.isArray(value)) return value.slice(0, 30).map((v) => slim(v, depth + 1));
  const out = {};
  for (const [k, v] of Object.entries(value)) {
    if (['color_scheme', 'uuid', 'open_link_in_new_window'].includes(k)) continue;
    out[k] = slim(v, depth + 1);
  }
  return out;
}

for (const page of pages) {
  const htmlPath = path.join(tmp, `kk-${page}.html`);
  const html = fs.readFileSync(htmlPath, 'utf8');
  const idx = html.indexOf('{"s":{"t":');
  if (idx < 0) {
    console.log(page, 'no json');
    continue;
  }
  let raw = html.slice(idx);
  const end = raw.indexOf('</script>');
  raw = raw.slice(0, end).trim();
  let data;
  try {
    data = JSON.parse(raw);
  } catch (err) {
    console.log(page, 'parse fail', err.message, 'len', raw.length);
    continue;
  }
  const dump = {
    blocks: slim(data.p?.blks || []),
    flex: slim(data.p?.fblks || []),
  };
  const out = path.join(tmp, `kk-${page}-blocks.json`);
  fs.writeFileSync(out, JSON.stringify(dump, null, 2));
  console.log(page, 'blocks', dump.blocks.length, 'flex', Array.isArray(dump.flex) ? dump.flex.length : 0, 'bytes', fs.statSync(out).size);
}

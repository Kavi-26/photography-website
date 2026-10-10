import fs from 'fs';
import path from 'path';
import os from 'os';

const data = JSON.parse(fs.readFileSync(path.join(os.tmpdir(), 'kk-about.json'), 'utf8'));

function walk(node, depth = 0, trail = '') {
  if (!node || typeof node !== 'object') return;
  if (Array.isArray(node)) {
    if (depth < 3) console.log(' '.repeat(depth), trail, 'array', node.length);
    node.slice(0, 3).forEach((n, i) => walk(n, depth + 1, `${trail}[${i}]`));
    return;
  }
  const keys = Object.keys(node);
  if (depth < 4) console.log(' '.repeat(depth), trail, keys.slice(0, 30).join(','));
  for (const k of keys) {
    if (['html', 'text', 'title', 'body', 'subtitle', 'quote', 'content'].includes(k) && typeof node[k] === 'string') {
      console.log('TEXT', trail + '.' + k, node[k].slice(0, 180).replace(/\s+/g, ' '));
    }
  }
  if (depth < 5) {
    for (const k of keys) walk(node[k], depth + 1, trail + '.' + k);
  }
}

console.log('p keys', Object.keys(data.p || {}));
walk(data.p, 0, 'p');

import fs from 'fs';
import path from 'path';

function getFiles(dir) {
  let results = [];
  fs.readdirSync(dir).forEach(file => {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) results = results.concat(getFiles(full));
    else results.push(full.replace(/\\/g, '/'));
  });
  return results;
}

const localFiles = getFiles('public/photos');
function getBaseKey(filename) {
  return filename
    .replace(/^_+/, '')
    .replace(/-[a-f0-9]{6,}-\d{3,4}\.(jpg|jpeg|png|webp)$/i, '')
    .replace(/\.(jpg|jpeg|png|webp)$/i, '')
    .toLowerCase();
}

const localMap = new Map();
localFiles.forEach(f => {
  const name = path.basename(f);
  const key = getBaseKey(name);
  if (!localMap.has(key)) localMap.set(key, []);
  localMap.get(key).push(f.replace(/^public/, ''));
});

// Extract all pixieset URLs from src/data/images.js
const code = fs.readFileSync('src/data/images.js', 'utf8');
const urls = [...code.matchAll(/https:\/\/[^'"\s]+/g)].map(m => m[0]);
console.log('Total URLs found in images.js:', urls.length);

let matched = 0, unmatched = [];
urls.forEach(url => {
  const fname = path.basename(url.split('?')[0]);
  const key = getBaseKey(fname);
  if (localMap.has(key)) {
    matched++;
  } else {
    unmatched.push({ fname, key, url });
  }
});

console.log('Matched:', matched, 'Unmatched:', unmatched.length);
if (unmatched.length > 0) console.log('Unmatched URLs:', unmatched);

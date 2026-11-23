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
    .replace(/-[a-f0-9]{6,}-\d{3,4}(_\d+)?\.(jpg|jpeg|png|webp)$/i, '')
    .replace(/\.(jpg|jpeg|png|webp)$/i, '')
    .toLowerCase();
}

// Map base keys to preferred high-res local path
const keyToPath = new Map();
localFiles.forEach(f => {
  const name = path.basename(f);
  // Prefer 2500 over 1500 or 1000, avoid _1 duplicates if possible
  const key = getBaseKey(name);
  const webPath = f.replace(/^public/, '');
  
  if (!keyToPath.has(key)) {
    keyToPath.set(key, webPath);
  } else {
    const existing = keyToPath.get(key);
    // prefer 2500 over 1000/1500
    const is2500 = webPath.includes('-2500.');
    const existing2500 = existing.includes('-2500.');
    if (is2500 && !existing2500) {
      keyToPath.set(key, webPath);
    }
  }
});

console.log('Unique local photo base keys indexed:', keyToPath.size);

// Read media.json and map each
const media = JSON.parse(fs.readFileSync('src/data/media.json', 'utf8'));
const localMedia = {};

for (const cat in media) {
  localMedia[cat] = [];
  for (const url of media[cat]) {
    const fname = path.basename(url.split('?')[0]);
    const key = getBaseKey(fname);
    const local = keyToPath.get(key);
    if (local) {
      if (!localMedia[cat].includes(local)) {
        localMedia[cat].push(local);
      }
    } else {
      console.log('MISSING in media.json:', cat, fname, key);
    }
  }
  console.log(`Category "${cat}": ${localMedia[cat].length} local photos mapped.`);
}

fs.writeFileSync('src/data/media.local.json', JSON.stringify(localMedia, null, 2));
console.log('Saved src/data/media.local.json');

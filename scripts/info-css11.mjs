import fs from 'fs';
const html = fs.readFileSync(process.env.TEMP + '/kk-home.html', 'utf8');
const a = html.indexOf('--display-heading_font-family');
const chunk = html.slice(a, a + 4500);
const keys = chunk.match(/--[a-z0-9_-]+:[^;]{0,80}/gi) || [];
for (const k of keys) {
  if (/paragraph|body|subtitle|button_|text-align|font-size/.test(k)) console.log(k);
}

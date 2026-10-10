import { spawn } from 'child_process';
import { setTimeout as delay } from 'timers/promises';
import fs from 'fs';

const dir = `${process.env.TEMP}\\kk-mobile`;
fs.mkdirSync(dir, { recursive: true });
const proc = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new', '--disable-gpu', '--hide-scrollbars',
  '--remote-debugging-port=9223', '--window-size=390,844', 'about:blank',
], { stdio: 'ignore' });
await delay(900);
const list = await fetch('http://127.0.0.1:9223/json/list').then((r) => r.json());
const page = list.find((t) => t.type === 'page');
const ws = new WebSocket(page.webSocketDebuggerUrl);
let seq = 0;
const pending = new Map();
ws.addEventListener('message', (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
});
await new Promise((resolve) => ws.addEventListener('open', resolve, { once: true }));
function send(method, params = {}) {
  const id = ++seq;
  return new Promise((resolve) => {
    pending.set(id, resolve);
    ws.send(JSON.stringify({ id, method, params }));
  });
}
await send('Page.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });

const routes = ['/', '/portfolio', '/about', '/investment', '/experience', '/contact', '/blog/the-subconscious-echo-when-art-emerges-unbidden'];
for (const route of routes) {
  await send('Page.navigate', { url: 'http://localhost:5173' + route });
  await delay(900);
  const info = await send('Runtime.evaluate', {
    expression: `(() => {
      const doc = document.documentElement;
      const offenders = [...document.querySelectorAll('body *')].filter((el) => el.scrollWidth > doc.clientWidth + 8).slice(0, 8).map((el) => el.className && el.className.toString().slice(0, 80));
      return { overflow: doc.scrollWidth - doc.clientWidth, h: doc.scrollHeight, offenders };
    })()`,
    returnByValue: true,
  });
  const name = route === '/' ? 'home' : route.split('/').filter(Boolean).slice(-1)[0];
  const shot = await send('Page.captureScreenshot', { format: 'jpeg', quality: 60 });
  fs.writeFileSync(`${dir}\\${name}.jpg`, Buffer.from(shot.result.data, 'base64'));
  console.log(name, JSON.stringify(info.result?.result?.value));
}
ws.close();
proc.kill();

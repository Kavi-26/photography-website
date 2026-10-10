import { spawn } from 'child_process';
import { setTimeout as delay } from 'timers/promises';
import fs from 'fs';

const dir = `${process.env.TEMP}\\kk-mobile2`;
fs.mkdirSync(dir, { recursive: true });
const proc = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new', '--disable-gpu', '--hide-scrollbars',
  '--remote-debugging-port=9223', '--window-size=390,844', 'about:blank',
], { stdio: 'ignore' });
await delay(800);
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
async function ev(expression) {
  const res = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  return res.result?.result?.value;
}
await send('Page.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });

async function shot(name) {
  const res = await send('Page.captureScreenshot', { format: 'jpeg', quality: 55 });
  fs.writeFileSync(`${dir}\\${name}.jpg`, Buffer.from(res.result.data, 'base64'));
}

const routes = ['/', '/about', '/investment', '/contact', '/blog/the-subconscious-echo-when-art-emerges-unbidden'];
for (const route of routes) {
  await send('Page.navigate', { url: 'http://localhost:5173' + route });
  await delay(1600);
  const name = route === '/' ? 'home' : route.split('/').filter(Boolean).pop();
  const info = await ev(`({overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth, hero: getComputedStyle(document.querySelector('.hero h1, .post-hero h1, h1')).fontSize})`);
  console.log(name, JSON.stringify(info));
  await shot(name);
}
await ev(`document.querySelector('.kk-burger').click()`);
await delay(300);
await shot('menu');
const menu = await ev(`document.querySelector('.kk-overlay').className`);
console.log('menu', menu);
ws.close();
proc.kill();

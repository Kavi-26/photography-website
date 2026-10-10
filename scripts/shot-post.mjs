import { spawn } from 'child_process';
import { setTimeout as delay } from 'timers/promises';
import fs from 'fs';

const dir = `${process.env.TEMP}\\kk-post-shots`;
fs.mkdirSync(dir, { recursive: true });
const proc = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new', '--disable-gpu', '--hide-scrollbars',
  '--remote-debugging-port=9223', '--window-size=1440,900', 'about:blank',
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
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
await send('Page.navigate', { url: 'http://localhost:5173/blog/the-subconscious-echo-when-art-emerges-unbidden' });
await delay(1800);
await send('Runtime.evaluate', {
  expression: `Promise.all([...document.images].map((img) => img.complete ? 1 : new Promise((r) => { img.onload = img.onerror = r; })))`,
  awaitPromise: true,
});
await delay(1600);
async function shot(name) {
  const res = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(`${dir}\\${name}.png`, Buffer.from(res.result.data, 'base64'));
  console.log(name, fs.statSync(`${dir}\\${name}.png`).size);
}
await shot('top');
const metrics = await send('Runtime.evaluate', {
  expression: `(() => {
    const nav = document.querySelector('.kk-nav');
    const h1 = document.querySelector('.post-hero h1');
    const time = document.querySelector('.post-hero time');
    return {
      nav: nav && nav.getBoundingClientRect().top,
      pos: getComputedStyle(nav).position,
      title: h1 && h1.textContent.slice(0, 40),
      date: time && time.textContent,
      img: document.querySelector('.post-hero img')?.currentSrc,
    };
  })()`,
  returnByValue: true,
});
console.log(JSON.stringify(metrics.result?.result?.value));
await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 520)' });
await delay(400);
await shot('scrolled');
const after = await send('Runtime.evaluate', {
  expression: `document.querySelector('.kk-nav').getBoundingClientRect().top`,
  returnByValue: true,
});
console.log('navTopAfterScroll', after.result?.result?.value);
ws.close();
proc.kill();

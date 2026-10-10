import { spawn } from 'child_process';
import { setTimeout as delay } from 'timers/promises';
import fs from 'fs';

const dir = `${process.env.TEMP}\\kk-hello`;
fs.mkdirSync(dir, { recursive: true });

const proc = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--disable-gpu',
  '--hide-scrollbars',
  '--remote-debugging-port=9223',
  '--window-size=1536,900',
  'about:blank',
], { stdio: 'ignore' });

await delay(1000);
const list = await fetch('http://127.0.0.1:9223/json/list').then((r) => r.json());
const page = list.find((t) => t.type === 'page');
const ws = new WebSocket(page.webSocketDebuggerUrl);
let seq = 0;
const pending = new Map();
ws.addEventListener('message', (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg);
    pending.delete(msg.id);
  }
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
await send('Emulation.setDeviceMetricsOverride', {
  width: 390, height: 844, deviceScaleFactor: 1, mobile: true,
});
await send('Page.navigate', { url: 'http://localhost:5173/#hello' });
await delay(1600);
await send('Runtime.evaluate', {
  expression: `document.querySelector('#hello').scrollIntoView({block:'center'})`,
});
await delay(500);
for (let n = 0; n < 20; n += 1) {
  const loaded = await send('Runtime.evaluate', {
    expression: `(() => { const img = document.querySelector('#hello .about-photo img'); return img ? (img.naturalWidth + ':' + img.complete) : 'missing'; })()`,
    returnByValue: true,
  });
  const value = loaded.result?.result?.value;
  console.log('poll', n, value);
  if (value === '2500:true') break;
  await delay(400);
}
await delay(400);
const metrics = await send('Runtime.evaluate', {
  expression: `(() => {
    const sec = document.querySelector('#hello');
    const img = sec.querySelector('.about-photo img');
    const span = sec.querySelector('.about-photo span');
    const deco = sec.querySelector('.deco-about');
    const h2 = sec.querySelector('h2');
    const h5 = sec.querySelector('h5');
    const p = sec.querySelector('p');
    const btn = sec.querySelector('.ps-button');
    const box = (el) => {
      const r = el.getBoundingClientRect();
      const s = getComputedStyle(el);
      return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), op: s.opacity, fs: s.fontSize };
    };
    return JSON.stringify({ img: box(img), span: box(span), deco: box(deco), h2: box(h2), h5: box(h5), p: box(p), btn: box(btn) });
  })()`,
  returnByValue: true,
});
console.log(metrics.result?.result?.value || JSON.stringify(metrics).slice(0, 500));
const res = await send('Page.captureScreenshot', { format: 'jpeg', quality: 70 });
fs.writeFileSync(`${dir}\\hello-mobile.jpg`, Buffer.from(res.result.data, 'base64'));
console.log('wrote', fs.statSync(`${dir}\\hello-mobile.jpg`).size);
ws.close();
proc.kill();

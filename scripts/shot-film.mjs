import { spawn } from 'child_process';
import { setTimeout as delay } from 'timers/promises';
import fs from 'fs';

const dir = `${process.env.TEMP}\\kk-film`;
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
  width: 1536, height: 900, deviceScaleFactor: 1, mobile: false,
});
await send('Page.navigate', { url: 'http://localhost:5173/#stories' });
await delay(1600);
await send('Runtime.evaluate', { expression: `document.querySelector('#stories').scrollIntoView({block:'center'})` });
for (let n = 0; n < 24; n += 1) {
  const loaded = await send('Runtime.evaluate', {
    expression: `(() => { const on=document.querySelector('.story-track button.on'); const imgs=[on.previousElementSibling, on, on.nextElementSibling].map(b=>b.querySelector('img')); return imgs.every(i=>i.complete&&i.naturalWidth) ? 'ready' : 'wait'; })()`,
    returnByValue: true,
  });
  const value = loaded.result?.result?.value;
  console.log('poll', value);
  if (value === 'ready') break;
  await delay(400);
}
await delay(600);
async function shot(name) {
  const res = await send('Page.captureScreenshot', { format: 'jpeg', quality: 72 });
  fs.writeFileSync(`${dir}\\${name}.jpg`, Buffer.from(res.result.data, 'base64'));
  const info = await send('Runtime.evaluate', {
    expression: `(() => {
      const nav = document.querySelector('.story-nav span').textContent;
      const slides = [...document.querySelectorAll('.story-track button')].map(b => {
        const r = b.getBoundingClientRect();
        return { x: Math.round(r.x), w: Math.round(r.width), on: b.classList.contains('on') };
      }).filter(s => s.x + s.w > 0 && s.x < 1536);
      return JSON.stringify({ nav, slides });
    })()`,
    returnByValue: true,
  });
  console.log(name, info.result?.result?.value);
}
await shot('before');
await send('Runtime.evaluate', {
  expression: `(() => {
    const slides = [...document.querySelectorAll('.story-track button')];
    const right = slides.find(b => b.getBoundingClientRect().x > 900 && b.getBoundingClientRect().x < 1536);
    right.click();
  })()`,
});
await delay(700);
await shot('after-right');
await send('Runtime.evaluate', {
  expression: `(() => {
    const slides = [...document.querySelectorAll('.story-track button')];
    const left = slides.filter(b => {
      const r = b.getBoundingClientRect();
      return r.x < 200 && r.x + r.width > 20;
    }).pop();
    left.click();
  })()`,
});
await delay(700);
await shot('after-left');
ws.close();
proc.kill();

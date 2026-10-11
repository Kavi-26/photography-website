import { spawn } from 'child_process';
import { setTimeout as delay } from 'timers/promises';
import fs from 'fs';

const dir = `${process.env.TEMP}\\kk-drop`;
fs.mkdirSync(dir, { recursive: true });
const proc = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new', '--disable-gpu', '--hide-scrollbars', '--remote-debugging-port=9223', '--window-size=1440,900', 'about:blank',
], { stdio: 'ignore' });
await delay(900);
const list = await fetch('http://127.0.0.1:9223/json/list').then((r) => r.json());
const page = list.find((t) => t.type === 'page');
const ws = new WebSocket(page.webSocketDebuggerUrl);
let seq = 0;
const pending = new Map();
ws.addEventListener('message', (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) pending.get(msg.id)(msg);
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
await send('Page.navigate', { url: 'http://localhost:5173/' });
await delay(1600);

async function hover(label) {
  const res = await send('Runtime.evaluate', {
    expression: `(() => {
      const el = [...document.querySelectorAll('.kk-drop')].find(n => n.textContent.trim().startsWith('${label}'));
      const r = el.getBoundingClientRect();
      return JSON.stringify({ x: r.x + r.width / 2, y: r.y + r.height / 2 });
    })()`,
    returnByValue: true,
  });
  const { x, y } = JSON.parse(res.result.result.value);
  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y });
  await delay(400);
  const box = await send('Runtime.evaluate', {
    expression: `(() => {
      const el = [...document.querySelectorAll('.kk-drop')].find(n => n.textContent.trim().startsWith('${label}'));
      const m = el.querySelector('.kk-menu');
      const r = m.getBoundingClientRect();
      const a = m.querySelector('a');
      const s = getComputedStyle(a);
      return JSON.stringify({ w: Math.round(r.width), h: Math.round(r.height), fs: s.fontSize, pad: s.padding });
    })()`,
    returnByValue: true,
  });
  console.log(label, box.result.result.value);
  const shot = await send('Page.captureScreenshot', { format: 'jpeg', quality: 70, clip: { x: 700, y: 0, width: 520, height: 420, scale: 1 } });
  fs.writeFileSync(`${dir}\\${label}.jpg`, Buffer.from(shot.result.data, 'base64'));
}

await hover('Portfolio');
await hover('Info');
ws.close();
proc.kill();

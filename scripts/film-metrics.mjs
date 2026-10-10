import { spawn } from 'child_process';
import { setTimeout as delay } from 'timers/promises';

const proc = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new', '--disable-gpu', '--remote-debugging-port=9223', '--window-size=1536,900', 'about:blank',
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
await send('Emulation.setDeviceMetricsOverride', { width: 1536, height: 900, deviceScaleFactor: 1, mobile: false });
await send('Page.navigate', { url: 'http://localhost:5173/#stories' });
await delay(1800);
const res = await send('Runtime.evaluate', {
  expression: `(() => {
    const film = document.querySelector('.film');
    const track = document.querySelector('.film-track');
    const on = document.querySelector('.film-track button.on');
    const fs = getComputedStyle(film);
    const ts = getComputedStyle(track);
    const fr = film.getBoundingClientRect();
    const tr = track.getBoundingClientRect();
    const or = on.getBoundingClientRect();
    return JSON.stringify({
      slide: fs.getPropertyValue('--film-slide'),
      stride: fs.getPropertyValue('--film-stride'),
      transform: ts.transform,
      inline: track.style.transform,
      filmX: Math.round(fr.x), filmW: Math.round(fr.width),
      trackX: Math.round(tr.x),
      onX: Math.round(or.x), onW: Math.round(or.width),
      inner: window.innerWidth,
    });
  })()`,
  returnByValue: true,
});
console.log(res.result?.result?.value || JSON.stringify(res).slice(0, 800));
ws.close();
proc.kill();

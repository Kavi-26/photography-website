import { spawn } from 'child_process';
import { setTimeout as delay } from 'timers/promises';

const proc = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new', '--disable-gpu', '--remote-debugging-port=9223', '--window-size=1440,900', 'about:blank',
], { stdio: 'ignore' });
await delay(900);
const list = await fetch('http://127.0.0.1:9223/json/list').then((r) => r.json());
const page = list.find((t) => t.type === 'page');
const ws = new WebSocket(page.webSocketDebuggerUrl);
let seq = 0;
const pending = new Map();
const logs = [];
ws.addEventListener('message', (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.method === 'Runtime.exceptionThrown') logs.push(JSON.stringify(msg.params.exceptionDetails).slice(0, 400));
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
await send('Runtime.enable');
await send('Page.navigate', { url: 'http://localhost:5173/' });
await delay(1800);
const res = await send('Runtime.evaluate', {
  expression: `(() => {
    const h1 = document.querySelector('.hero h1');
    const track = document.querySelector('.story-track');
    const hidden = document.querySelectorAll('.kk-anim:not(.kk-anim-on)').length;
    const shown = document.querySelectorAll('.kk-anim-on').length;
    return JSON.stringify({
      hero: h1 && getComputedStyle(h1).opacity,
      track: track && getComputedStyle(track).transitionDuration,
      hidden, shown,
      overlay: !!document.getElementById('kk-page-overlay'),
    });
  })()`,
  returnByValue: true,
});
console.log(res.result?.result?.value);
console.log('errors', logs.join('\n') || 'none');
ws.close();
proc.kill();

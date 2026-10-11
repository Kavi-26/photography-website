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
  if (msg.method === 'Runtime.exceptionThrown') logs.push('EXC ' + JSON.stringify(msg.params.exceptionDetails).slice(0, 500));
  if (msg.method === 'Runtime.consoleAPICalled') {
    const text = msg.params.args.map((a) => a.value || a.description || '').join(' ');
    if (/error|warn|overlay|blank/i.test(text)) logs.push('LOG ' + text.slice(0, 300));
  }
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
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });

async function probe(label) {
  const res = await send('Runtime.evaluate', {
    expression: `(() => {
      const ov = document.getElementById('kk-page-overlay');
      const s = ov ? getComputedStyle(ov) : null;
      const main = document.querySelector('main');
      const root = document.getElementById('root');
      return JSON.stringify({
        href: location.href,
        rootText: (root?.innerText || '').slice(0, 80),
        mainH: main ? Math.round(main.getBoundingClientRect().height) : 0,
        overlay: !!ov,
        cursor: !!document.getElementById('kk-cursor'),
        bodyCursor: getComputedStyle(document.body).cursor,
        heroOp: getComputedStyle(document.querySelector('h1') || document.body).opacity,
        animOn: document.querySelectorAll('.kk-anim-on').length,
      });
    })()`,
    returnByValue: true,
  });
  console.log(label, res.result?.result?.value || JSON.stringify(res).slice(0, 400));
}

await send('Page.navigate', { url: 'http://localhost:5173/' });
await delay(500);
await probe('early');
await delay(1200);
await probe('home-settled');
await send('Runtime.evaluate', { expression: `document.querySelector('a.kk-link[href="/about"]').click()` });
await delay(200);
await probe('about-200');
await delay(1000);
await probe('about-settled');
await send('Page.reload');
await delay(400);
await probe('reload-early');
await delay(1500);
await probe('reload-settled');
console.log('LOGS', logs.join('\n') || 'none');
ws.close();
proc.kill();

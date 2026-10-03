import { spawn } from 'node:child_process';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const url = 'http://127.0.0.1:8798/index.html';
const wsUrls = [];

async function getHeights(largura) {
  const CH = process.env.CHROME_PATH || (process.platform === 'win32' ? 'C:/Program Files/Google/Chrome/Application/chrome.exe' : 'google-chrome');
  const PORT = Math.floor(Math.random() * 10000) + 10000;
  const prof = mkdtempSync(join(tmpdir(), 'cdpa-'));
  const chrome = spawn(CH, ['--headless=new', '--no-sandbox', '--disable-gpu', '--hide-scrollbars', `--remote-debugging-port=${PORT}`, `--user-data-dir=${prof}`, 'about:blank'], { stdio: 'ignore' });
  
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  let wsUrl;
  for (let i = 0; i < 50; i++) {
    try { const r = await fetch(`http://127.0.0.1:${PORT}/json/list`); const t = (await r.json()).find((x) => x.type === 'page'); if (t) { wsUrl = t.webSocketDebuggerUrl; break; } } catch {}
    await sleep(200);
  }
  
  const ws = new WebSocket(wsUrl);
  await new Promise(r => ws.addEventListener('open', r));
  
  let seq = 0; const pend = new Map(), waiters = [];
  const send = (method, params = {}) => new Promise((res, rej) => { const id = ++seq; pend.set(id, { res, rej }); ws.send(JSON.stringify({ id, method, params })); });
  ws.addEventListener('message', (m) => { 
    const d = JSON.parse(m.data); 
    if (d.id && pend.has(d.id)) { 
      const p = pend.get(d.id); pend.delete(d.id); 
      d.error ? p.rej(new Error(d.error.message)) : p.res(d.result); 
    }
  });

  await send('Page.enable'); 
  await send('Runtime.enable');
  await send('Network.enable');
  await send('Network.setCacheDisabled', { cacheDisabled: true });
  await send('Emulation.setDeviceMetricsOverride', { width: largura, height: 900, deviceScaleFactor: 1, mobile: largura < 768 });
  
  const ev = async (expr) => (await send('Runtime.evaluate', { expression: expr, returnByValue: true })).result.value;
  
  await send('Page.navigate', { url });
  await sleep(3000);
  
  // scroll slowly down
  const sections = ['#top', '#idf', '.idf-bridge', '#dvo', '#ciere', '#quantum', '#vivencias', '#about', '#contact', '.site-footer'];
  for (let i = 0; i < sections.length; i++) {
    const s = sections[i];
    const exists = await ev(`!!document.querySelector('${s}')`);
    if (exists) {
      await ev(`document.querySelector('${s}').scrollIntoView(true)`);
      await sleep(500);
    }
  }

  const heights = {};
  for (const s of ['#quantum', '#vivencias', '#about', '#contact', '.site-footer']) {
    heights[s] = await ev(`Math.round(document.querySelector('${s}').getBoundingClientRect().height)`);
  }

  ws.close();
  chrome.kill();
  return heights;
}

(async () => {
  for (const w of [1440, 768, 390]) {
    const h = await getHeights(w);
    console.log(`Heights for ${w}:`, h);
  }
})();

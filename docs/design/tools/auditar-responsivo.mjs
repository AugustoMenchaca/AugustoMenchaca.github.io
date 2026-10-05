import { spawn } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { mkdtempSync } from 'node:fs';

const args = process.argv.slice(2);
let url = args[0];
let jsonOutput, capturasDir;

for (let i = 1; i < args.length; i++) {
  if (args[i] === '--json') jsonOutput = args[++i];
  if (args[i] === '--capturas') capturasDir = args[++i];
}

const CH = process.env.CHROME_PATH || (process.platform === 'win32' ? 'C:/Program Files/Google/Chrome/Application/chrome.exe' : 'google-chrome');
const PORT = 9700 + Math.floor(Math.random() * 90);
const prof = mkdtempSync(join(tmpdir(), 'cdpr-'));
const chrome = spawn(CH, ['--headless=new', '--disable-gpu', '--hide-scrollbars', `--remote-debugging-port=${PORT}`, `--user-data-dir=${prof}`, 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

let ws, seq = 0; const pend = new Map(), waiters = [];
async function connect() {
  for (let i = 0; i < 50; i++) {
    try { const r = await fetch(`http://127.0.0.1:${PORT}/json/list`); const t = (await r.json()).find((x) => x.type === 'page'); if (t) return t.webSocketDebuggerUrl; } catch {}
    await sleep(200);
  }
  throw new Error('sem CDP');
}
const send = (method, params = {}) => new Promise((res, rej) => { const id = ++seq; pend.set(id, { res, rej }); ws.send(JSON.stringify({ id, method, params })); });
const once = (ev) => new Promise((res) => waiters.push({ ev, res }));

try {
  const wsUrl = await connect();
  ws = new WebSocket(wsUrl);
  await new Promise(r => ws.addEventListener('open', r));

  ws.addEventListener('message', (m) => {
    const d = JSON.parse(m.data);
    if (d.id && pend.has(d.id)) {
      const p = pend.get(d.id); pend.delete(d.id);
      d.error ? p.rej(new Error(d.error.message)) : p.res(d.result);
    } else if (d.method) {
      for (let i = waiters.length - 1; i >= 0; i--) {
        if (waiters[i].ev === d.method) {
          waiters[i].res(d.params); waiters.splice(i, 1);
        }
      }
    }
  });

  await send('Page.enable');
  await send('Runtime.enable');

  const ev = async (expr) => {
    const res = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    if (res.exceptionDetails) {
      console.error(res.exceptionDetails.exception.description);
      throw new Error('Evaluation failed');
    }
    return res.result.value;
  };

  const shot = async (name, clip) => {
    // sem clip: a pagina inteira (ate o limite de textura do Chrome, 16000 px), para conferir cada secao e nao so a janela
    let area = clip;
    if (!area) {
      const m = await send('Page.getLayoutMetrics');
      const sz = m.cssContentSize || m.contentSize;
      area = { x: 0, y: 0, width: sz.width, height: Math.min(sz.height, 16000) };
    }
    const r = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { ...area, scale: 1 } });
    if (capturasDir) {
      mkdirSync(capturasDir, { recursive: true });
      writeFileSync(join(capturasDir, name + '.png'), Buffer.from(r.data, 'base64'));
    }
  };

  const load = async (w, h, mobile) => {
    await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile });
    await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
    const l = once('Page.loadEventFired');
    await send('Page.navigate', { url });
    await l;
  };

  const larguras = [320, 360, 390, 414, 480, 600, 768, 900, 1024, 1280, 1440, 1920, 2560, 3000, 3440];
  const resultado = {};
  let exitCode = 0;

  const probe = `(async () => {
    const wait = (ms) => new Promise(r => setTimeout(r, ms));
    const style = document.createElement('style');
    style.textContent = '* { content-visibility: visible !important; contain-intrinsic-size: auto !important; }';
    document.head.appendChild(style);

    await document.fonts.ready;
    await wait(500);

    let y = 0;
    const maxScroll = document.documentElement.scrollHeight;
    while (y < maxScroll) {
      window.scrollTo(0, y);
      y += 600;
      await wait(120);
    }
    window.scrollTo(0, 0);
    await wait(120);

    const vw = window.innerWidth;
    const ALVO = 'main > header, main > section, footer';
    
    const out = {
      estouro: { contagem: 0, exemplos: [] },
      colisao: { contagem: 0, exemplos: [] },
      corte: { contagem: 0, exemplos: [] }
    };
    
    const sections = Array.from(document.querySelectorAll(ALVO));
    
    if (document.documentElement.scrollWidth > window.innerWidth) {
      out.estouro.contagem++;
      out.estouro.exemplos.push({ seletor: 'html', texto: '', caixa: 'scrollWidth > innerWidth', secao: 'viewport' });
    }

    const getSel = (e) => e.tagName.toLowerCase() + (e.className ? '.' + String(e.className).split(' ')[0] : '') + (e.id ? '#' + e.id : '');

    for (const sec of sections) {
      const secName = sec.id || sec.tagName.toLowerCase();
      const items = [];
      
      for (const e of sec.querySelectorAll('*')) {
        const cs = getComputedStyle(e);
        if (cs.display === 'none' || cs.visibility === 'hidden') continue;
        let isInvisible = false;
        for (let p = e; p && p !== document.body.parentElement; p = p.parentElement) {
          if (getComputedStyle(p).opacity === '0') { isInvisible = true; break; }
        }
        if (isInvisible) continue;
        const r = e.getBoundingClientRect();
        if (!r.width || !r.height) continue;
        
        const cont = e.closest('.container') || sec;
        const cr = cont.getBoundingClientRect();
        let isCutByParent = false;
        let isFixed = cs.position === 'fixed';
        
        if (!isFixed) {
          for (let p = e.parentElement; p && p !== sec; p = p.parentElement) {
            const pcs = getComputedStyle(p);
            const ox = pcs.overflowX;
            const oy = pcs.overflow;
            const cuts = (o) => o === 'hidden' || o === 'clip' || o === 'auto' || o === 'scroll';
            if (cuts(ox) || cuts(oy)) {
              const pr = p.getBoundingClientRect();
              if (pr.left >= -1 && pr.right <= vw + 1 && pr.right <= cr.right + 2) {
                isCutByParent = true;
                break;
              }
            }
          }
        }
        
        if (!isCutByParent && !isFixed) {
          if (r.right > vw + 1 || r.left < -1 || r.right > cr.right + 2 || r.left < cr.left - 1) {
            out.estouro.contagem++;
            if (out.estouro.exemplos.length < 10) {
              out.estouro.exemplos.push({
                seletor: getSel(e),
                texto: (e.textContent || '').trim().substring(0, 40),
                caixa: \`L\${Math.round(r.left)} R\${Math.round(r.right)} (cont L\${Math.round(cr.left)} R\${Math.round(cr.right)})\`,
                secao: secName
              });
            }
          }
        }

        const hasDirectText = Array.from(e.childNodes).some(n => n.nodeType === Node.TEXT_NODE && n.textContent.trim().length > 0);
        const isMedia = (e.tagName === 'IMG' || e.tagName === 'VIDEO' || e.tagName === 'SVG') && r.width > 24;
        
        if (hasDirectText || isMedia) {
          let rects = [];
          if (hasDirectText) {
            const range = document.createRange();
            for (const n of e.childNodes) {
              if (n.nodeType === Node.TEXT_NODE && n.textContent.trim().length > 0) {
                range.selectNodeContents(n);
                rects.push(...Array.from(range.getClientRects()));
              }
            }
          } else {
            rects = [r];
          }
          items.push({ e, r, cs, rects, hasText: hasDirectText, secName });
        }
        
        if (cs.overflow !== 'visible' && (cs.textOverflow === 'ellipsis' || cs.whiteSpace === 'nowrap')) {
           if (e.scrollWidth > e.clientWidth + 1) {
             out.corte.contagem++;
             if (out.corte.exemplos.length < 10) {
               out.corte.exemplos.push({
                 seletor: getSel(e),
                 texto: (e.textContent || '').trim().substring(0, 40),
                 caixa: \`sw:\${e.scrollWidth} cw:\${e.clientWidth}\`,
                 secao: secName
               });
             }
           }
        }
      }

      const matchesOverlap = (e1, e2) => {
        const m = (el, sel) => el.matches(sel);
        // o pôster do vídeo fica sobre a captura estática; ver assets/js/device-media.js
        if (m(e1, 'img.device-video-poster') && m(e2, 'img.win__shot')) return true;
        if (m(e2, 'img.device-video-poster') && m(e1, 'img.win__shot')) return true;
        // colagem de polaroides: uma foto menor sobre a maior, por desenho do Augusto
        if (e1.closest('#vivencias') && e2.closest('#vivencias') && m(e1, 'img') && m(e2, 'img')) return true;
        return false;
      };

      for (let i = 0; i < items.length; i++) {
        const item1 = items[i];
        for (let j = i + 1; j < items.length; j++) {
          const item2 = items[j];
          if (item1.e.contains(item2.e) || item2.e.contains(item1.e)) continue;
          if (matchesOverlap(item1.e, item2.e)) continue;

          let hasCollision = false;
          let maxArea = 0;
          for (const rect1 of item1.rects) {
            for (const rect2 of item2.rects) {
              const ix0 = Math.max(rect1.left, rect2.left);
              const iy0 = Math.max(rect1.top, rect2.top);
              const ix1 = Math.min(rect1.right, rect2.right);
              const iy1 = Math.min(rect1.bottom, rect2.bottom);
              if (ix0 < ix1 && iy0 < iy1) {
                const area = (ix1 - ix0) * (iy1 - iy0);
                if (area > 16) {
                  const c1 = rect1.left <= rect2.left && rect1.right >= rect2.right && rect1.top <= rect2.top && rect1.bottom >= rect2.bottom;
                  const c2 = rect2.left <= rect1.left && rect2.right >= rect1.right && rect2.top <= rect1.top && rect2.bottom >= rect1.bottom;
                  if (!c1 && !c2) {
                    hasCollision = true;
                    if (area > maxArea) maxArea = area;
                  }
                }
              }
            }
          }

          if (hasCollision) {
            out.colisao.contagem++;
            if (out.colisao.exemplos.length < 10) {
              out.colisao.exemplos.push({
                seletor: getSel(item1.e) + ' x ' + getSel(item2.e),
                texto: '',
                caixa: \`L\${Math.round(item1.r.left)},T\${Math.round(item1.r.top)} W\${Math.round(item1.r.width)}xH\${Math.round(item1.r.height)} vs L\${Math.round(item2.r.left)},T\${Math.round(item2.r.top)} W\${Math.round(item2.r.width)}xH\${Math.round(item2.r.height)} (area \${Math.round(maxArea)})\`,
                secao: secName
              });
            }
          }
        }
        
        if (item1.hasText) {
          const range = document.createRange();
          let tr = { top: Infinity, left: Infinity, bottom: -Infinity, right: -Infinity };
          for (const n of item1.e.childNodes) {
            if (n.nodeType === Node.TEXT_NODE && n.textContent.trim().length > 0) {
              range.selectNodeContents(n);
              const rects = range.getClientRects();
              for (const cr of rects) {
                tr.top = Math.min(tr.top, cr.top);
                tr.left = Math.min(tr.left, cr.left);
                tr.bottom = Math.max(tr.bottom, cr.bottom);
                tr.right = Math.max(tr.right, cr.right);
              }
            }
          }
          
          if (tr.top !== Infinity) {
            let cutter = null;
            for (let p = item1.e.parentElement; p && p !== document.body; p = p.parentElement) {
              const o = getComputedStyle(p).overflow;
              if (o === 'hidden' || o === 'clip' || o === 'auto' || o === 'scroll') {
                cutter = p;
                break;
              }
            }
            if (cutter) {
              const cr = cutter.getBoundingClientRect();
              if (tr.left < cr.left - 1 || tr.right > cr.right + 1 || tr.top < cr.top - 1 || tr.bottom > cr.bottom + 1) {
                out.corte.contagem++;
                if (out.corte.exemplos.length < 10) {
                  out.corte.exemplos.push({
                    seletor: getSel(item1.e),
                    texto: (item1.e.textContent || '').trim().substring(0, 40),
                    caixa: \`texto L\${Math.round(tr.left)} R\${Math.round(tr.right)} (cutter L\${Math.round(cr.left)} R\${Math.round(cr.right)})\`,
                    secao: secName
                  });
                }
              }
            }
          }
        }
      }
    }
    
    return out;
  })()`;

  const tableData = [];
  
  for (const w of larguras) {
    await load(w, 900, w < 768);
    const res = await ev(probe);
    if (!res) {
      console.error('ERRO: res undefined na largura', w);
    } else {
      resultado[w] = res;
      
      if (res.estouro && (res.estouro.contagem > 0 || res.colisao.contagem > 0 || res.corte.contagem > 0)) {
        exitCode = 1;
      }
      
      if ((w === 320 || w === 3440) && capturasDir) {
        await shot(w.toString(), null);
      }
      
      tableData.push({
        Largura: w,
        Estouro: res.estouro.contagem,
        'Colisão': res.colisao.contagem,
        'Corte': res.corte.contagem
      });
    }
  }

  console.table(tableData);

  if (jsonOutput) {
    mkdirSync(dirname(jsonOutput), { recursive: true });
    writeFileSync(jsonOutput, JSON.stringify(resultado, null, 2));
  }
  
  ws.close();
  chrome.kill();
  process.exit(exitCode);

} catch (e) {
  console.error(e);
  if (ws) ws.close();
  chrome.kill();
  process.exit(1);
}

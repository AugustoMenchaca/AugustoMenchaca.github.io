import { spawn } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { mkdtempSync } from 'node:fs';

const args = process.argv.slice(2);
let url = args[0];
let orcamentoFile, largura = 1440, saidaDir, jsonOutput = false;

for (let i = 1; i < args.length; i++) {
  if (args[i] === '--orcamento') orcamentoFile = args[++i];
  if (args[i] === '--largura') largura = parseInt(args[++i], 10);
  if (args[i] === '--saida') saidaDir = args[++i];
  if (args[i] === '--json') jsonOutput = true;
}

const CH = process.env.CHROME_PATH || (process.platform === 'win32' ? 'C:/Program Files/Google/Chrome/Application/chrome.exe' : 'google-chrome');
const PORT = 9333;
const prof = mkdtempSync(join(tmpdir(), 'cdpa-'));
const chrome = spawn(CH, ['--headless=new', '--no-sandbox', '--disable-gpu', '--hide-scrollbars', `--remote-debugging-port=${PORT}`, `--user-data-dir=${prof}`, 'about:blank'], { stdio: 'ignore' });
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
  
  const reqTypes = new Map();
  const reqUrls = new Map();
  const reqs = [];
  let totalBytes = 0;
  let stepBytes = 0;

  ws.addEventListener('message', (m) => { 
    const d = JSON.parse(m.data); 
    if (d.id && pend.has(d.id)) { 
      const p = pend.get(d.id); pend.delete(d.id); 
      d.error ? p.rej(new Error(d.error.message)) : p.res(d.result); 
    } else if (d.method) { 
      for (const w of waiters) if (w.ev === d.method) w.res(d.params); 
      
      if (d.method === 'Network.responseReceived') {
        reqTypes.set(d.params.requestId, d.params.type);
        reqUrls.set(d.params.requestId, d.params.response.url);
      }
      if (d.method === 'Network.loadingFinished') {
        const id = d.params.requestId;
        const type = reqTypes.get(id);
        const url = reqUrls.get(id) || '';
        const len = d.params.encodedDataLength;
        if (url.startsWith('data:')) return;
        
        let ctg = 'Other';
        if (type === 'Document') ctg = 'HTML';
        else if (type === 'Stylesheet') ctg = 'CSS';
        else if (type === 'Script') ctg = 'JS';
        else if (type === 'Image') ctg = 'Image';
        else if (type === 'Font') ctg = 'Font';
        else if (type === 'Media') ctg = 'Media';
        
        reqs.push({ id, url, len, type: ctg, isVideo: url.endsWith('.mp4') || ctg === 'Media' });
        totalBytes += len;
        stepBytes += len;
      }
    } 
  });
  
  await send('Page.enable'); 
  await send('Runtime.enable');
  await send('Network.enable');
  await send('Network.setCacheDisabled', { cacheDisabled: true });
  await send('Emulation.setDeviceMetricsOverride', { width: largura, height: 900, deviceScaleFactor: 1, mobile: false });
  
  const ev = async (expr) => (await send('Runtime.evaluate', { expression: expr, returnByValue: true })).result.value;
  
  await send('Page.addScriptToEvaluateOnNewDocument', {
    source: `
      window.__cls = 0;
      new PerformanceObserver(l => {
        for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value;
      }).observe({ type: 'layout-shift', buffered: true });
    `
  });
  
  const loadP = once('Page.loadEventFired');
  await send('Page.navigate', { url });
  await loadP;
  await sleep(3000);
  
  const sections = ['#top', '#idf', '.idf-bridge', '#dvo', '#ciere', '#quantum', '#vivencias', '#about', '#contact', 'footer'];
  const log = [];
  
  let stepReqs = [...reqs]; reqs.length = 0;
  
  const reportStep = (name) => {
    const kb = (stepBytes / 1024);
    const acc = (totalBytes / 1024);
    
    const uniqueUrls = [...new Set(stepReqs.map(r => {
      try {
        const path = new URL(r.url).pathname;
        return path.split('/').pop() || path;
      } catch {
        return r.url.substring(0, 30);
      }
    }))];

    const urls = uniqueUrls.slice(0, 3).join(', ') + (uniqueUrls.length > 3 ? '...' : '');
    const mp4 = stepReqs.some(r => r.isVideo) ? 'Sim' : 'Não';
    log.push({ section: name, bytesKB: kb, accKB: acc, reqs: stepReqs.length, mp4, newUrls: urls, rawBytes: stepBytes, rawReqs: [...stepReqs] });
    stepBytes = 0;
    stepReqs = [];
  };
  
  reportStep('primeira-carga');
  
  for (let i = 0; i < sections.length; i++) {
    const s = sections[i];
    stepReqs = [];
    const exists = await ev(`!!document.querySelector('${s}')`);
    if (exists) {
      await ev(`document.querySelector('${s}').scrollIntoView(true)`);
      await sleep(1200);
      
      const novos = [];
      while(reqs.length > 0) novos.push(reqs.shift()); 
      stepReqs.push(...novos);

      reportStep(s);
    }
  }
  
  const cls = await ev(`window.__cls`);
  const sw = await ev(`document.documentElement.scrollWidth`);
  const iw = await ev(`window.innerWidth`);
  
  ws.close();
  chrome.kill();
  
  const orcamento = orcamentoFile ? JSON.parse(readFileSync(orcamentoFile, 'utf8')) : null;
  const result = {
    url,
    largura,
    cls,
    sw,
    iw,
    steps: log,
    violacoes: []
  };
  
  const pc = log[0];
  const roladaSteps = log.slice(1);
  const pcKB = pc.bytesKB;
  const roladaSemVideoBytes = roladaSteps.reduce((acc, step) => {
    return acc + step.rawReqs.filter(r => !r.isVideo).reduce((s, r) => s + r.len, 0);
  }, 0);
  const roladaSemVideoKB = roladaSemVideoBytes / 1024;
  
  if (orcamento) {
    if (pcKB > orcamento.primeiraCargaKB) result.violacoes.push(`PRIMEIRA CARGA ${pcKB.toFixed(1)} KB > ${orcamento.primeiraCargaKB} KB`);
    if (roladaSemVideoKB > orcamento.roladaSemVideoKB) result.violacoes.push(`ROLADA SEM VIDEO ${roladaSemVideoKB.toFixed(1)} KB > ${orcamento.roladaSemVideoKB} KB`);
    if (orcamento.clsMax !== undefined && cls > orcamento.clsMax) result.violacoes.push(`CLS ${cls.toFixed(3)} > ${orcamento.clsMax}`);
    if (orcamento.mp4AntesDeRolar !== undefined) {
      const mp4Count = pc.rawReqs.filter(r => r.isVideo).length;
      if (mp4Count > orcamento.mp4AntesDeRolar) result.violacoes.push(`MP4 ANTES DE ROLAR ${mp4Count} > ${orcamento.mp4AntesDeRolar}`);
    }
    
    for (const step of roladaSteps) {
      const key = step.section.replace(/[#.]/g, '');
      const limit = (orcamento.porSecaoKB && orcamento.porSecaoKB[key]) || (orcamento.porSecaoKB && orcamento.porSecaoKB.padrao);
      const stepNoVideo = step.rawReqs.filter(r => !r.isVideo).reduce((s, r) => s + r.len, 0) / 1024;
      if (limit && stepNoVideo > limit) {
        result.violacoes.push(`SECAO ${step.section} ${stepNoVideo.toFixed(1)} KB > ${limit} KB`);
      }
    }
  }
  
  if (jsonOutput) console.log(JSON.stringify(result, null, 2));
  else {
    console.table(log.map((s, i) => ({
      Prof: i,
      Secao: s.section,
      'Novos (KB)': s.bytesKB.toFixed(1),
      'Acumulado (KB)': s.accKB.toFixed(1),
      Reqs: s.reqs,
      'MP4?': s.mp4,
      URLs: s.newUrls
    })));
    console.log(`\nResumo:\nCLS: ${cls.toFixed(4)}\nScrollWidth vs Largura: ${sw} vs ${iw}`);
    if (result.violacoes.length > 0) {
      console.log('\nVIOLAÇÕES:');
      for (const v of result.violacoes) console.log(v);
    } else {
      console.log('\nTudo passou no orçamento.');
    }
  }
  
  if (saidaDir) {
    mkdirSync(saidaDir, { recursive: true });
    writeFileSync(join(saidaDir, `carga-${largura}.json`), JSON.stringify(result, null, 2));
    let md = `## Relatório de Carga (${largura}px)\n\n`;
    md += `| Profundidade | Seção | Novos (KB) | Acumulado (KB) | Reqs | MP4? | URLs |\n`;
    md += `| --- | --- | --- | --- | --- | --- | --- |\n`;
    for (let i = 0; i < log.length; i++) {
      const s = log[i];
      md += `| ${i} | \`${s.section}\` | ${s.bytesKB.toFixed(1)} | ${s.accKB.toFixed(1)} | ${s.reqs} | ${s.mp4} | ${s.newUrls} |\n`;
    }
    md += `\n**CLS:** ${cls.toFixed(4)}\n`;
    if (result.violacoes.length > 0) {
      md += `\n### Violações\n`;
      for (const v of result.violacoes) md += `- ${v}\n`;
    }
    writeFileSync(join(saidaDir, `carga-${largura}.md`), md);
  }
  
  process.exit(result.violacoes.length > 0 ? 1 : 0);
  
} catch (e) {
  console.error(e);
  process.exit(1);
}

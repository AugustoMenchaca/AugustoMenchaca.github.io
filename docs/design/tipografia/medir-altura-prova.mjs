// Medicao da issue #7: distancia do topo do documento ate a primeira
// representacao tecnica escolhida como predicado. O cartao e esquematico;
// ver ALTURA-ATE-A-PROVA.md. Este driver nao altera medir.mjs; extrai dele a
// CSS_ESCALA para que a variante B tenha exatamente a mesma fonte da verdade.
//
// Rodada oficial (PowerShell):
//   node docs/design/tipografia/medir-altura-prova.mjs --headed --saida "$env:TEMP\altura-prova.json"
//
// O script executa duas rodadas independentes de A e B nas cinco larguras de
// alvos.json. A conversao em telas sempre usa 900px, conforme o viewport padrao
// do projeto, independentemente da altura usada para emular cada largura.

import { spawn } from 'node:child_process';
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const AQUI = dirname(fileURLToPath(import.meta.url));
const RAIZ = resolve(AQUI, '../../..');
const MEDIR = join(AQUI, 'medir.mjs');
const ALVOS = join(AQUI, 'alvos.json');
const VP_TELAS = 900;
const SELETOR = '#idf .data-grid .data-card';

const arg = (nome, padrao) => {
  const i = process.argv.indexOf(nome);
  return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : padrao;
};
const flag = nome => process.argv.includes(nome);
const saidaArg = arg('--saida', null);
if (!saidaArg) throw new Error('Informe --saida; este driver nao sobrescreve artefatos por padrao.');

const CHROME = arg('--chrome', process.env.CHROME_PATH ||
  'C:/Program Files/Google/Chrome/Application/chrome.exe');
const ESPERA = Number(arg('--espera', 4000));
const HEADED = flag('--headed');
const SAIDA = resolve(saidaArg);
const alvos = JSON.parse(readFileSync(ALVOS, 'utf8'));
const fonteMedir = readFileSync(MEDIR, 'utf8');
const escalaMatch = fonteMedir.match(/const CSS_ESCALA = `([\s\S]*?)`;/);
if (!escalaMatch) throw new Error('Nao foi possivel extrair CSS_ESCALA de medir.mjs.');
const CSS_ESCALA = escalaMatch[1];

class CDP {
  constructor(ws) {
    this.ws = ws;
    this.id = 0;
    this.pendentes = new Map();
    ws.addEventListener('message', evento => {
      const mensagem = JSON.parse(evento.data);
      if (!mensagem.id || !this.pendentes.has(mensagem.id)) return;
      const { ok, falha, limite } = this.pendentes.get(mensagem.id);
      this.pendentes.delete(mensagem.id);
      clearTimeout(limite);
      mensagem.error ? falha(new Error(mensagem.error.message)) : ok(mensagem.result);
    });
  }

  envia(method, params = {}, sessionId) {
    const id = ++this.id;
    return new Promise((ok, falha) => {
      const limite = setTimeout(() => {
        if (!this.pendentes.has(id)) return;
        this.pendentes.delete(id);
        falha(new Error(`timeout CDP: ${method}`));
      }, 90000);
      this.pendentes.set(id, { ok, falha, limite });
      this.ws.send(JSON.stringify(sessionId ? { id, method, params, sessionId } : { id, method, params }));
    });
  }
}

const dormir = ms => new Promise(resolvePromise => setTimeout(resolvePromise, ms));

async function abrirChrome() {
  const perfil = mkdtempSync(join(tmpdir(), 'altura-prova-'));
  const proc = spawn(CHROME, [
    ...(HEADED ? [] : ['--headless=new']),
    '--remote-debugging-port=0', `--user-data-dir=${perfil}`,
    '--no-first-run', '--no-default-browser-check', '--disable-extensions',
    // Neste host, o processo de GPU/sandbox do Chrome encerra antes de Page.enable.
    '--disable-gpu', '--no-sandbox',
    '--disable-background-networking', '--hide-scrollbars', '--mute-audio',
    '--force-device-scale-factor=1',
    ...(HEADED ? ['--window-position=-2400,0', '--window-size=1500,1000'] : []),
    'about:blank'
  ], { stdio: ['ignore', 'pipe', 'pipe'] });

  const wsUrl = await new Promise((ok, falha) => {
    let buffer = '';
    const limite = setTimeout(() => falha(new Error('Chrome nao anunciou CDP em 30s')), 30000);
    proc.stderr.on('data', dados => {
      buffer += dados.toString();
      const achado = buffer.match(/ws:\/\/[^\s]+/);
      if (achado) { clearTimeout(limite); ok(achado[0]); }
    });
    proc.on('exit', codigo => { clearTimeout(limite); falha(new Error(`Chrome saiu com codigo ${codigo}`)); });
  });

  const ws = new WebSocket(wsUrl);
  await new Promise((ok, falha) => {
    ws.addEventListener('open', ok, { once: true });
    ws.addEventListener('error', falha, { once: true });
  });
  return {
    cdp: new CDP(ws),
    fechar: () => {
      try { ws.close(); } catch {}
      proc.kill();
      try { rmSync(perfil, { recursive: true, force: true }); } catch {}
    }
  };
}

async function medirUma(cdp, url, vp, css) {
  const { targetId } = await cdp.envia('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await cdp.envia('Target.attachToTarget', { targetId, flatten: true });
  const s = sessionId;
  try {
    await cdp.envia('Page.enable', {}, s);
    await cdp.envia('Runtime.enable', {}, s);
    try { await cdp.envia('Page.bringToFront', {}, s); } catch {}
    await cdp.envia('Emulation.setDeviceMetricsOverride',
      { width: vp.w, height: vp.h, deviceScaleFactor: vp.dpr, mobile: vp.dpr > 1 }, s);

    const carregou = new Promise(ok => {
      let limite;
      const aoCarregar = evento => {
        const mensagem = JSON.parse(evento.data);
        if (mensagem.sessionId !== s || mensagem.method !== 'Page.loadEventFired') return;
        cdp.ws.removeEventListener('message', aoCarregar);
        clearTimeout(limite);
        ok();
      };
      cdp.ws.addEventListener('message', aoCarregar);
      limite = setTimeout(() => { cdp.ws.removeEventListener('message', aoCarregar); ok(); }, 45000);
    });
    await cdp.envia('Page.navigate', { url }, s);
    await carregou;
    await dormir(ESPERA);

    const avalia = async (expression, awaitPromise = false) => {
      const resposta = await cdp.envia('Runtime.evaluate',
        { expression, returnByValue: true, awaitPromise }, s);
      if (resposta.exceptionDetails) throw new Error(resposta.exceptionDetails.text);
      return resposta.result.value;
    };

    if (css) {
      await avalia(`(() => { const style = document.createElement('style');
        style.id = 'escala-injetada'; style.textContent = ${JSON.stringify(css)};
        document.head.appendChild(style); return true; })()`);
      await dormir(600);
    }
    await avalia(`(async () => {
      if (document.fonts && document.fonts.ready) await document.fonts.ready;
      return document.fonts ? document.fonts.status : 'indisponivel';
    })()`, true);

    // Levar o alvo ao viewport faz o IntersectionObserver assentar o reveal.
    await avalia(`(() => {
      const alvo = document.querySelector(${JSON.stringify(SELETOR)});
      if (!alvo) throw new Error('Predicado nao encontrou elemento');
      alvo.scrollIntoView({ block: 'center' });
      return true;
    })()`);
    await dormir(700);

    return await avalia(`(() => {
      const candidatos = [...document.querySelectorAll(${JSON.stringify(SELETOR)})];
      const alvo = candidatos[0];
      if (!alvo) throw new Error('Predicado nao encontrou elemento');
      const caixa = alvo.getBoundingClientRect();
      const topPx = Math.round((caixa.top + window.scrollY) * 100) / 100;
      return {
        topPx,
        telas900: Math.round(topPx / ${VP_TELAS} * 1000) / 1000,
        textoIdentificador: alvo.querySelector('.data-card-head')?.innerText.trim() || null,
        candidatos: candidatos.length,
        tag: alvo.tagName.toLowerCase(),
        classes: alvo.className,
        alturaDocumentoPx: document.documentElement.scrollHeight,
        revealAssentado: alvo.closest('[data-reveal]')?.classList.contains('is-revealed') ?? null
      };
    })()`);
  } finally {
    try { await cdp.envia('Target.closeTarget', { targetId }); } catch {}
  }
}

if (!HEADED) console.error('AVISO: rodada nao oficial; use --headed.');
const { cdp, fechar } = await abrirChrome();
const url = pathToFileURL(join(RAIZ, alvos.local.arquivo)).href;
const variantes = [
  { id: 'A-lp-atual', css: null },
  { id: 'B-so-escala', css: CSS_ESCALA }
];
const resultados = [];

try {
  for (let rodada = 1; rodada <= 2; rodada++) {
    for (const vp of alvos.viewportsDaLP) {
      for (const variante of variantes) {
        process.stderr.write(`rodada ${rodada} ${variante.id}@${vp.w} ... `);
        const dados = await medirUma(cdp, url, vp, variante.css);
        resultados.push({ rodada, variante: variante.id, viewport: vp, ...dados });
        process.stderr.write(`${dados.topPx}px = ${dados.telas900} telas de 900px\n`);
      }
    }
  }
} finally {
  fechar();
}

const documento = {
  _meta: {
    gerado: new Date().toISOString(),
    comando: ['node', 'docs/design/tipografia/medir-altura-prova.mjs', ...process.argv.slice(2)].join(' '),
    rodadaOficial: HEADED,
    fontePagina: alvos.local.arquivo,
    fonteEscala: 'const CSS_ESCALA em docs/design/tipografia/medir.mjs',
    seletor: SELETOR,
    viewportDeConversaoPx: VP_TELAS,
    repeticoes: 2
  },
  resultados
};
writeFileSync(SAIDA, `${JSON.stringify(documento, null, 2)}\n`);
console.log(SAIDA);

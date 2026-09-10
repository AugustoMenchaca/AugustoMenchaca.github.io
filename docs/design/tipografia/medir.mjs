// Driver de medição — issue #36.
//
// UM comando repete a rodada inteira e regenera os artefatos:
//
//     node docs/design/tipografia/medir.mjs --headed
//
// A flag --headed NAO e opcional para uma rodada oficial. Sem ela o Chrome roda
// headless, onde peca com animacao de entrada fica em `opacity: 0` e a sonda a
// descarta — o heroi de 111px do `illoca.unseen.co` cai para 77px e o corte do
// classificador se move. O driver AVISA e marca o resultado se for executado
// sem a flag.
//
// Opções:
//     --so-local          mede apenas a lp-final.html e as variantes de escala
//     --so-referencias    mede apenas os 18 sites externos
//     --chrome <caminho>  Chrome alternativo
//     --saida <arquivo>   padrão: docs/design/tipografia/medicoes.json
//
// SEM DEPENDÊNCIA. Node >= 22 (WebSocket nativo) e um Chrome instalado. Fala
// CDP direto — nada de puppeteer, nada de npm install, nada de node_modules
// dentro do repositório. Foi essa a lição do v2, que perdeu o próprio script.
//
// O que ele produz, além das 19 peças: o "depois" da escala proposta, medido
// por INJEÇÃO sobre a wireframes/lp-final.html real, em três variantes —
//   A  a LP como está
//   B  só a escala (CSS), conteúdo intocado
//   C  a escala mais o "evento curto" no herói
// nos dois viewports. Não existe arquivo de protótipo: ver provenance.md P-015.

import { spawn } from 'node:child_process';
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { sonda } from './sonda-tipografia.mjs';

const AQUI = dirname(fileURLToPath(import.meta.url));
const RAIZ = resolve(AQUI, '../../..');
const alvos = JSON.parse(readFileSync(join(AQUI, 'alvos.json'), 'utf8'));

const arg = (nome, padrao) => {
  const i = process.argv.indexOf(nome);
  return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : padrao;
};
const flag = (nome) => process.argv.includes(nome);

const CHROME = arg('--chrome', process.env.CHROME_PATH ||
  'C:/Program Files/Google/Chrome/Application/chrome.exe');
// Assentamento antes de medir. Precisa ser generoso: `illoca.unseen.co` é uma
// cena WebGL com sequestro de rolagem, e a 1,2s o herói de 111px ainda estava
// em animacao de entrada — a sonda o descartou como invisivel e o maior titulo
// caiu para 77px, o que teria movido o corte do board de 89px para ~76px por
// artefato de tempo. Verificado na mao: o elemento renderiza normalmente.
const ESPERA = Number(arg('--espera', process.env.SONDA_ESPERA || 4000));
const SO = arg('--so', null);
// Numero de amostras de tipografia antes de rolar, e o intervalo entre elas.
const AMOSTRAS = Number(arg('--amostras', 4));
const INTERVALO = Number(arg('--intervalo', 1500));
const SAIDA = resolve(arg('--saida', join(AQUI, 'medicoes.json')));

// Neutraliza o revelador da própria LP para contar caixa alta (issue #46).
//
// Por que existe: a LP aplica `.will-reveal { opacity: 0 }` por JS a todo
// `[data-reveal]` e só solta `.is-revealed` quando o `IntersectionObserver`
// dispara. A guarda C1 rejeita, corretamente, o que está a `opacity: 0` — então
// o que a sonda conta depende de o revelador ter disparado.
//
// A varredura de 700px com 90ms de pausa NÃO resolve isso, e isto foi medido,
// não suposto: com `SONDA_DIAG=1`, dos **25** blocos `[data-reveal]` a passada
// revela **6**. Os outros 19 ficam em `opacity: 0` em todas as amostras, e o
// campo `caixaAlta` mudava de 46 para 55 entre rodadas conforme quais blocos a
// corrida pegava. Unir as amostras — que este commit também faz — estabiliza a
// origem do número mas não o corrige: o teto continua sendo o que a passada
// revelou. Medir o estado assentado é o que "caixa alta na página inteira"
// significa.
//
// Entra num PASSE PRÓPRIO, no fim, e só a caixa alta dele é aproveitada — nenhum
// campo geométrico. O escopo é essencial e foi decidido por medição:
//
// - `transform: none !important` junto foi tentado e descartado: derrubou
//   `A-lp-atual@390` de 48 para 22 nós. A guarda C1 não olha transform, então
//   ele não era necessário para nada.
// - Só com `opacity`, aplicado desde o início, a altura de `A-lp-atual@1440`
//   passou de **8.374px para 8.350px** — reprodutível nos dois modos. Eu não
//   expliquei o mecanismo, e altura é número publicado (o custo de +26,6% sai
//   dela). Então a neutralização não pode valer para os passes que medem
//   geometria. Só para contar caixa alta.
const CSS_REVELADOR_OFF = `
  [data-reveal], .will-reveal { opacity: 1 !important; }
`;

// A escala proposta, como folha injetada. Esta é a fonte da verdade do CSS;
// a cópia no PESQUISA-TIPOGRAFIA.md §8 tem que bater com ela.
const CSS_ESCALA = `
  body { font-size: 1rem; line-height: 1.6; }
  .hero-headline { font-size: clamp(3rem, 10vw, 9rem) !important; line-height: .9 !important;
    letter-spacing: -.04em !important; text-transform: none !important; max-width: none !important; }
  .slab-headline { font-size: clamp(2.25rem, 5vw, 4.5rem) !important; line-height: 1.05 !important;
    letter-spacing: -.02em !important; text-transform: none !important; }
  .qml-quote p, .ciere-flow-wrap, .about-copy p { font-size: clamp(1.5rem, 2.22vw, 2rem) !important;
    line-height: 1.2 !important; text-transform: none !important; }
  .rail-title, .data-card-head { font-size: 1.25rem !important; text-transform: none !important; }
  .meta-label, .pill, .btn, .spec-head, .spec-term, .rail-badge, .qml-col-title, .h8-tag,
  .h8-figcap, .footer-col h3, .footer-top { text-transform: none !important; letter-spacing: .02em !important; }
  .hero-lede { font-size: 1rem !important; }
  .hero-subheadline { font-weight: 500; font-size: 1.25rem; max-width: 40ch; margin-bottom: 20px; }`;

// Variante C: o "evento curto". Registrado aqui porque é decisão de conteúdo, e
// precisa ficar visível como tal — não embutida numa cópia de página.
const JS_EVENTO_CURTO = `() => {
  for (const h of document.querySelectorAll('h1.hero-headline')) {
    const frase = h.textContent.trim();
    const p = document.createElement('p');
    p.className = 'i18n hero-subheadline';
    p.setAttribute('lang', h.getAttribute('lang') || 'pt');
    p.textContent = frase;
    const sp = h.querySelector('span');
    if (sp) sp.innerHTML = 'AUGUSTO<br>MENCHACA';
    h.after(p);
  }
  return true;
}`;

const ROLAR = `async () => {
  const h = document.documentElement.scrollHeight;
  for (let y = 0; y < h; y += 700) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 90)); }
  window.scrollTo(0, 0); await new Promise(r => setTimeout(r, 700));
  const imgs = [...document.querySelectorAll('img')];
  return { altura: document.documentElement.scrollHeight, imgs: imgs.length,
           carregadas: imgs.filter(i => i.complete && i.naturalWidth > 0).length };
}`;

const dormir = ms => new Promise(r => setTimeout(r, ms));

// ---------------------------------------------------------------------------
// Cliente CDP mínimo sobre o WebSocket nativo
// ---------------------------------------------------------------------------
class CDP {
  constructor(ws) { this.ws = ws; this.id = 0; this.pend = new Map();
    ws.addEventListener('message', ev => {
      const m = JSON.parse(ev.data);
      if (m.id && this.pend.has(m.id)) {
        const { ok, no } = this.pend.get(m.id); this.pend.delete(m.id);
        m.error ? no(new Error(m.error.message)) : ok(m.result);
      }
    });
  }
  envia(method, params = {}, sessionId) {
    const id = ++this.id;
    return new Promise((ok, no) => {
      this.pend.set(id, { ok, no });
      this.ws.send(JSON.stringify(sessionId ? { id, method, params, sessionId } : { id, method, params }));
      setTimeout(() => { if (this.pend.has(id)) { this.pend.delete(id); no(new Error('timeout CDP: ' + method)); } }, 90000);
    });
  }
}

async function abrirChrome() {
  const perfil = mkdtempSync(join(tmpdir(), 'sonda-tipo-'));
  // --headed existe por medicao, nao por conforto: em headless o heroi de 111px
  // do `illoca.unseen.co` fica em `opacity: 0` — a animacao de entrada nao
  // dispara sem compositor real —, e a sonda o descarta. Com janela real ele
  // renderiza normalmente. O v3 reportou 111px so porque nao filtrava
  // visibilidade: numero certo por motivo errado.
  const proc = spawn(CHROME, [
    ...(flag('--headed') ? [] : ['--headless=new']),
    '--remote-debugging-port=0', `--user-data-dir=${perfil}`,
    '--no-first-run', '--no-default-browser-check', '--disable-extensions',
    '--disable-background-networking', '--hide-scrollbars', '--mute-audio',
    '--force-device-scale-factor=1',
    ...(flag('--headed') ? ['--window-position=-2400,0', '--window-size=1500,1000'] : []),
    'about:blank'
  ], { stdio: ['ignore', 'pipe', 'pipe'] });

  const wsUrl = await new Promise((ok, no) => {
    let buf = '';
    const t = setTimeout(() => no(new Error('Chrome nao anunciou a porta de debug em 30s')), 30000);
    proc.stderr.on('data', d => {
      buf += d.toString();
      const m = buf.match(/ws:\/\/[^\s]+/);
      if (m) { clearTimeout(t); ok(m[0]); }
    });
    proc.on('exit', c => { clearTimeout(t); no(new Error('Chrome saiu com codigo ' + c)); });
  });

  const ws = new WebSocket(wsUrl);
  await new Promise((ok, no) => { ws.addEventListener('open', ok, { once: true });
                                  ws.addEventListener('error', no, { once: true }); });
  return { cdp: new CDP(ws), fechar: () => { try { ws.close(); } catch {} proc.kill();
    try { rmSync(perfil, { recursive: true, force: true }); } catch {} } };
}

// Une N amostras. Cor, midia e movimento vem da ULTIMA (pos-rolagem), que e
// onde a imagem preguicosa ja carregou. Tipografia vem da UNIAO: um degrau
// conta se apareceu visivel em qualquer amostra.
//
// Por que N e nao 2: o `illoca.unseen.co` e nao-deterministico. Duas execucoes
// identicas, medidas isoladamente, deram 111px e 77px — corrida com a animacao
// de entrada do heroi, que fica em `opacity: 0` ate completar. Como esse unico
// numero decide se a margem do classificador e de 26px ou de 1px, medir uma vez
// so nao serve. `vistoEmAmostras` registra em quantas cada degrau apareceu, para
// a instabilidade ficar no dado em vez de virar sorte.
function unirAmostras(amostras, amostraCaps) {
  const ultima = amostras[amostras.length - 1];
  const d = { ...ultima };
  const porPx = new Map();
  const vistos = new Map();
  for (let i = amostras.length - 1; i >= 0; i--) {
    for (const t of (amostras[i].titulosDetalhes || [])) {
      if (!porPx.has(t.px)) porPx.set(t.px, t);
      vistos.set(t.px, (vistos.get(t.px) || 0) + 1);
    }
  }
  d.titulosDetalhes = [...porPx.values()].sort((a, b) => b.px - a.px)
    .map(t => ({ ...t, vistoEmAmostras: `${vistos.get(t.px)}/${amostras.length}` }));
  d.tamTitulos = d.titulosDetalhes.map(t => t.px);

  let wh = null;
  for (const a of amostras) if (a.workhorse && (!wh || a.workhorse.ocorrencias > wh.ocorrencias)) {
    wh = a.workhorse; d.workhorseDetalhe = a.workhorseDetalhe;
  }
  d.workhorse = wh;
  d.razaoTituloWorkhorse = (d.tamTitulos.length && wh)
    ? Math.round(d.tamTitulos[0] / wh.px * 100) / 100 : null;

  let maior = null;
  for (const a of amostras) {
    const m = a.maiorTextoRenderizado;
    if (m && (!maior || m.px > maior.px)) maior = m;
  }
  d.maiorTextoRenderizado = maior;
  const maiorH = d.tamTitulos.length ? d.tamTitulos[0] : 0;
  d.pontoCego = maior ? maior.px > maiorH : false;
  d.diferencaPx = maior ? maior.px - maiorH : 0;

  // C6 — caixa alta se une pelo CONJUNTO DE NÓS, não pela contagem.
  // Contagem não se une: máximo entre amostras herda o ruído da amostra mais
  // sortuda, e deixar `caixaAlta` vir de carona no `{ ...ultima }` fazia o campo
  // depender de a varredura ter revelado cada bloco `[data-reveal]` antes da
  // amostra pós-rolagem — corrida entre instrumento e página, que é o que fazia
  // o mesmo arquivo medir 46, 55, 67 ou 70 (issue #46). Aqui vale o princípio já
  // usado nos títulos: une, e registra em quantas amostras cada nó apareceu,
  // para a instabilidade ficar no dado em vez de virar sorte.
  const capsPorCaminho = new Map();
  for (const a of (amostraCaps ? [...amostras, amostraCaps] : amostras)) {
    for (const n of (a.caixaAlta?.nos || [])) {
      if (!capsPorCaminho.has(n.caminho)) capsPorCaminho.set(n.caminho, n);
    }
  }
  const capsChars = [...capsPorCaminho.values()].reduce((s, n) => s + n.caracteres, 0);
  // Quanto o revelador escondia, no próprio dado: o maior que os passes NÃO
  // neutralizados conseguiram ver. É o número que este projeto publicou antes
  // (55 a 1440) e serve para auditar a diferença sem reler o histórico.
  const capsSemNeutralizar = amostras.reduce(
    (m, a) => Math.max(m, (a.caixaAlta?.nos || []).length), 0);
  d.caixaAlta = {
    elementos: capsPorCaminho.size,
    caracteresTotais: capsChars,
    caracteresPor1000px: d.altura > 0 ? Math.round(capsChars / d.altura * 1000 * 100) / 100 : 0,
    semNeutralizar: capsSemNeutralizar,
    passeNeutralizado: !!amostraCaps,
    amostras: amostras.length + (amostraCaps ? 1 : 0)
  };

  d.descartes = {
    titulos: (ultima.descartes?.titulos || []).filter(x => !porPx.has(x.px)),
    porRecorte: ultima.descartes?.porRecorte || []
  };
  // `_diag` é instrumento de diagnóstico, não medição: `isRevealed` varia entre
  // rodadas porque a corrida do revelador continua existindo — ela só deixou de
  // afetar o resultado. Fica fora do JSON para o arquivo ser determinístico;
  // veja com `SONDA_DIAG=1`.
  delete d._diag;
  d._amostras = amostras.length;
  d._instavel = d.titulosDetalhes.some(t => t.vistoEmAmostras !== `${amostras.length}/${amostras.length}`);
  return d;
}

async function medirPagina(cdp, url, vp, { css, js } = {}) {
  const { targetId } = await cdp.envia('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await cdp.envia('Target.attachToTarget', { targetId, flatten: true });
  const s = sessionId;
  try {
    await cdp.envia('Page.enable', {}, s);
    await cdp.envia('Runtime.enable', {}, s);
    // Aba de fundo e estrangulada pelo Chrome: rAF quase nao roda e animacao de
    // entrada nao completa. Medido: o heroi de 111px do `illoca.unseen.co` sai
    // como 77px quando a aba nao esta em primeiro plano, e como 111px quando
    // esta. Sem isto, a ordem dos alvos mudaria o resultado.
    try { await cdp.envia('Page.bringToFront', {}, s); } catch {}
    await cdp.envia('Emulation.setDeviceMetricsOverride',
      { width: vp.w, height: vp.h, deviceScaleFactor: vp.dpr, mobile: vp.dpr > 1 }, s);

    const carregou = new Promise(ok => {
      const h = ev => { const m = JSON.parse(ev.data);
        if (m.sessionId === s && m.method === 'Page.loadEventFired') { cdp.ws.removeEventListener('message', h); ok(); } };
      cdp.ws.addEventListener('message', h);
      setTimeout(ok, 45000);   // segue mesmo se a pagina nunca disparar load
    });
    await cdp.envia('Page.navigate', { url }, s);
    await carregou;
    await dormir(ESPERA);

    const aval = async (expr, awaitPromise = false) => {
      const r = await cdp.envia('Runtime.evaluate',
        { expression: expr, returnByValue: true, awaitPromise }, s);
      if (r.exceptionDetails) throw new Error(r.exceptionDetails.text + ' :: ' +
        (r.exceptionDetails.exception?.description || '').slice(0, 200));
      return r.result.value;
    };

    // Estilo e conteudo entram ANTES de qualquer passe, para valerem nos dois.
    if (css) await aval(`(() => { const st = document.createElement('style');
      st.id = 'escala-injetada'; st.textContent = ${JSON.stringify(css)};
      document.head.appendChild(st); return true; })()`);
    if (js) await aval(`(${js})()`);
    if (css || js) await dormir(600);

    // DOIS PASSES.
    // A rotina de rolagem existe para carregar imagem preguicosa — necessario
    // para cor e midia, irrelevante para tipografia. Em site que anima por
    // scroll ela ATRAPALHA: no `illoca.unseen.co` o heroi de 111px termina em
    // `opacity: 0` depois de rolar, porque a maquina de estados do sequestro de
    // scroll nao volta ao inicio. Verificado na mao: no carregamento o elemento
    // esta com opacidade 1 e 960x200. Medir so depois de rolar derrubaria o
    // maior titulo dele para 77px e moveria o corte do board por artefato.
    // Entao mede-se antes e depois, e a tipografia e a UNIAO dos dois — que e o
    // que um leitor de fato ve ao longo da visita.
    // C7 — nao amostrar antes das webfonts resolverem: `document.fonts.check`
    // devolveria falso para fonte ainda em carregamento, e a familia renderizada
    // sairia como fallback que o leitor nunca ve.
    try {
      await aval(`(async () => { if (document.fonts && document.fonts.ready) await document.fonts.ready; return document.fonts ? document.fonts.status : 'indisponivel'; })()`, true);
    } catch {}

    const amostras = [];
    for (let i = 0; i < AMOSTRAS; i++) {
      if (i > 0) await dormir(INTERVALO);
      amostras.push(await aval(`(${sonda.toString()})()`));
    }
    const rolagem = await aval(`(${ROLAR})()`, true);
    amostras.push(await aval(`(${sonda.toString()})()`));

    // TERCEIRO PASSE, só para caixa alta (issue #46).
    // A varredura acima revela 6 dos 25 blocos `[data-reveal]` da LP — medido com
    // `SONDA_DIAG=1`, não suposto. Os outros 19 ficam em `opacity: 0`, a guarda C1
    // os rejeita corretamente, e o número de caixa alta virava função de quais
    // blocos a corrida pegou. Aqui o revelador é neutralizado e a página é
    // amostrada uma última vez; desta amostra aproveita-se **apenas** a caixa
    // alta, porque a folha injetada altera altura em 24px por motivo que eu não
    // determinei. Geometria continua vindo dos passes anteriores, intactos.
    let amostraCaps = null;
    try {
      await aval(`(() => { const st = document.createElement('style');
        st.id = 'revelador-off'; st.textContent = ${JSON.stringify(CSS_REVELADOR_OFF)};
        document.head.appendChild(st); return true; })()`);
      await dormir(300);
      amostraCaps = await aval(`(${sonda.toString()})()`);
    } catch {}

    if (process.env.SONDA_DIAG) {
      for (const [i, a] of amostras.entries()) {
        const g = a._diag || {};
        console.error(`    DIAG a${i}: caps=${a.caixaAlta?.nos?.length} reduce=${g.reduce}`
          + ` dataReveal=${g.dataReveal} will=${g.willReveal} revealed=${g.isRevealed}`);
      }
    }
    const dados = unirAmostras(amostras, amostraCaps);
    return { status: 'sucesso', dataHora: new Date().toISOString(),
             viewport: `${vp.w}x${vp.h}x${vp.dpr}`, rolagem, data: dados,
             amostras: amostras.map((a, i) => ({
               quando: i < AMOSTRAS ? `t+${(ESPERA + i * INTERVALO) / 1000}s` : 'pos-rolagem',
               tamTitulos: a.tamTitulos,
               maiorTexto: a.maiorTextoRenderizado?.px ?? null })) };
  } catch (e) {
    return { status: 'falha', dataHora: new Date().toISOString(),
             viewport: `${vp.w}x${vp.h}x${vp.dpr}`, erro: String(e.message || e) };
  } finally {
    try { await cdp.envia('Target.closeTarget', { targetId }); } catch {}
  }
}

// ---------------------------------------------------------------------------
// Rodada
// ---------------------------------------------------------------------------
const HEADED = flag('--headed');
if (!HEADED) {
  console.error('');
  console.error('  AVISO: rodando em HEADLESS. Peca com animacao de entrada pode ser');
  console.error('  medida a menos (ver P-017 em docs/design/provenance.md). A rodada');
  console.error('  oficial usa --headed; sem ela o resultado sai com rodadaOficial: false.');
  console.error('');
}

const { cdp, fechar } = await abrirChrome();
const saida = {
  _meta: {
    gerado: new Date().toISOString(),
    comando: ['node', 'docs/design/tipografia/medir.mjs', ...process.argv.slice(2)].join(' '),
    comandoOficial: 'node docs/design/tipografia/medir.mjs --headed',
    modo: HEADED ? 'headed' : 'headless',
    rodadaOficial: HEADED,
    sonda: 'docs/design/tipografia/sonda-tipografia.mjs',
    alvos: 'docs/design/tipografia/alvos.json',
    nota: 'Nao ha arquivo de prototipo. O "depois" da escala e medido por injecao ' +
          'de CSS sobre a wireframes/lp-final.html real. Ver provenance.md P-015.',
    notaCaixaAlta: 'caixaAlta.semNeutralizar NAO e numero citavel: e a contagem ' +
          'sem neutralizar o revelador, ou seja, a propria grandeza nao ' +
          'deterministica que a issue #46 conserta, e varia entre rodadas. ' +
          'Existe so para dimensionar quanto o revelador escondia. O numero ' +
          'valido e caixaAlta.elementos, medido no passe neutralizado.'
  },
  referencias: {},
  variantesDaLP: {}
};

const VP = alvos.viewportPadrao, VM = alvos.viewportMovel;

if (!flag('--so-local')) {
  for (const a of alvos.referencias) {
    if (SO && a.id !== SO) continue;
    process.stderr.write(`medindo ${a.id} ... `);
    const r = await medirPagina(cdp, a.url, VP);
    r.rotulo = a.rotulo; r.url = a.url;
    saida.referencias[a.id] = r;
    const d = r.data;
    process.stderr.write(r.status === 'sucesso'
      ? `${d.tamTitulos[0] ?? '?'}px  razao ${d.razaoTituloWorkhorse ?? '?'}` +
        (d._legado.divergeDoCorrigido ? `  [legado dizia ${d._legado.tamTitulos_semFiltro[0]}px]` : '') + '\n'
      : `FALHA: ${r.erro}\n`);
  }
}

if (!flag('--so-referencias')) {
  const lp = pathToFileURL(join(RAIZ, alvos.local.arquivo)).href;
  const variantes = [
    { id: 'A-lp-atual',            css: null,        js: null },
    { id: 'B-so-escala',           css: CSS_ESCALA,  js: null },
    { id: 'C-escala-evento-curto', css: CSS_ESCALA,  js: JS_EVENTO_CURTO }
  ];
  for (const vp of [VP, VM]) {
    for (const v of variantes) {
      const chave = `${v.id}@${vp.w}`;
      process.stderr.write(`medindo ${chave} ... `);
      const r = await medirPagina(cdp, lp, vp, { css: v.css, js: v.js });
      r.variante = v.id; r.url = lp;
      saida.variantesDaLP[chave] = r;
      const d = r.data;
      process.stderr.write(r.status === 'sucesso'
        ? `${d.tamTitulos[0] ?? '?'}px  razao ${d.razaoTituloWorkhorse ?? '?'}  ` +
          `maiorTexto ${d.maiorTextoRenderizado?.px ?? '?'}px  ${d.telas} telas\n`
        : `FALHA: ${r.erro}\n`);
    }
  }
}

fechar();

const todos = [...Object.values(saida.referencias), ...Object.values(saida.variantesDaLP)];
saida._meta.total = todos.length;
saida._meta.sucessos = todos.filter(r => r.status === 'sucesso').length;
saida._meta.falhas = todos.filter(r => r.status !== 'sucesso').map(r => r.url || r.variante);

writeFileSync(SAIDA, JSON.stringify(saida, null, 2), 'utf8');
process.stderr.write(`\n${saida._meta.sucessos}/${saida._meta.total} medidas -> ${SAIDA}\n`);
if (saida._meta.falhas.length) {
  process.stderr.write(`falhas: ${saida._meta.falhas.join(', ')}\n`);
  process.exit(1);
}

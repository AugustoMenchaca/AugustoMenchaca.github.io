// Sonda de tipografia — issue #36.
//
// Deriva da sonda de DOM do REFERENCE-BOARD-v3 §8.1. Todas as métricas daquele
// board continuam aqui. O que foi acrescentado é tipografia detalhada; o que foi
// CORRIGIDO está listado abaixo, e em cada caso o valor antigo permanece exposto
// em `_legado`, para o erro continuar visível em vez de sumir na correção.
//
// CORREÇÕES desta versão (revisão do PR #42):
//   C1 — visibilidade real. O laço de títulos e o de corpo não verificavam nada:
//        contavam `display:none`. Foi assim que `incomescrane.com` entrou no
//        board com 68px num cabeçalho que nunca renderizou (o real é 32px).
//        Agora exige display, visibility, cadeia de opacidade, caixa renderizada
//        e área não-nula.
//   C2 — recorte. `maiorTextoRenderizado` filtrava visibilidade mas não recorte,
//        e marcou 641px no `paulkalkbrenner.net` — que é um contador animado de
//        dígitos num span de 342x10143px clipado por container, um dígito
//        visível por vez. Agora calcula a fração da caixa que sobrevive aos
//        ancestrais que recortam.
//   C3 — `line-height: normal` devolvia razão nula (4 de 79 degraus, 5 peças).
//        Agora resolve medindo a caixa de linha real da fonte.
//   C4 — `telas` dividia por 900 fixo, errado em qualquer viewport diferente de
//        1440x900. Agora usa a altura real do viewport.
//   C5 — serifa lia a lista inteira de fallback, então "Scribo, Georgia,
//        sans-serif" e "Oswald, Arial Narrow, sans-serif" caíam no mesmo balde.
//        Agora decide pela primeira família, que é a que de fato renderiza.
//
// Rodar com: node docs/design/tipografia/medir.mjs   (ver o cabeçalho de lá)

export const sonda = () => {
  const P = s => { const m=String(s).match(/rgba?\(([^)]+)\)/); if(!m) return null;
    const p=m[1].split(/[,\s\/]+/).filter(Boolean).map(Number);
    return (p.length<3||p.some(Number.isNaN))?null:{r:p[0],g:p[1],b:p[2],a:p.length>3?p[3]:1}; };
  const lin = c => { c/=255; return c<=0.04045 ? c/12.92 : Math.pow((c+0.055)/1.055, 2.4); };
  const oklch = ({r,g,b}) => {
    const R=lin(r),G=lin(g),B=lin(b);
    const l=Math.cbrt(0.4122214708*R+0.5363325363*G+0.0514459929*B);
    const m=Math.cbrt(0.2119034982*R+0.6806995451*G+0.1073969566*B);
    const s=Math.cbrt(0.0883024619*R+0.2817188376*G+0.6299787005*B);
    const L=0.2104542553*l+0.7936177850*m-0.0040720468*s;
    const A=1.9779984951*l-2.4285922050*m+0.4505937099*s;
    const Bb=0.0259040371*l+0.7827717662*m-0.8086757660*s;
    let H=Math.atan2(Bb,A)*180/Math.PI; if(H<0)H+=360;
    return {L, C: Math.hypot(A,Bb), H};
  };
  const hsvS = ({r,g,b}) => { const mx=Math.max(r,g,b),mn=Math.min(r,g,b); return mx===0?0:(mx-mn)/mx; };
  let total=0, hsv15=0, c05=0, c12=0, somaC=0, picoC=0;
  const cores=new Map(); const todos=document.querySelectorAll('*');
  for (const el of todos) {
    const c=P(getComputedStyle(el).backgroundColor); if(!c||c.a!==1) continue;
    const rc=el.getBoundingClientRect(); const ar=rc.width*rc.height; if(ar<=900) continue;
    total+=ar; const o=oklch(c);
    somaC+=o.C*ar; if(o.C>picoC) picoC=o.C;
    if(hsvS(c)>0.15) hsv15+=ar;
    if(o.C>=0.05) c05+=ar;
    if(o.C>=0.12) c12+=ar;
    const k=`rgb(${c.r},${c.g},${c.b})`;
    const p=cores.get(k)||{a:0,C:o.C,L:o.L,H:o.H}; p.a+=ar; cores.set(k,p);
  }
  const pc = n => total? Math.round(n/total*1000)/10 : 0;
  const img=document.querySelectorAll('img').length, svg=document.querySelectorAll('svg').length,
        video=document.querySelectorAll('video').length, canvas=document.querySelectorAll('canvas').length;
  let keyframes=0; const nomes=[]; let bloq=0;
  const varrer=(rs)=>{ for(const r of rs){ if(r.type===7){keyframes++;nomes.push(r.name);}
    else if(r.cssRules){try{varrer(r.cssRules);}catch(e){}} } };
  for (const s of document.styleSheets) { try{ varrer(s.cssRules); }catch(e){ bloq++; } }
  const dur=new Map(); let trans=0, anim=0;
  for (const el of todos) {
    const cs=getComputedStyle(el); const d=cs.transitionDuration;
    if (d && d.split(',').some(x=>parseFloat(x)>0)) { trans++;
      d.split(',').map(x=>x.trim()).forEach(x=>{ if(parseFloat(x)>0) dur.set(x,(dur.get(x)||0)+1); }); }
    if (cs.animationName && cs.animationName!=='none') anim++;
  }

  // ==========================================================================
  // C1 — visibilidade real
  // ==========================================================================
  // `display:none` num ancestral zera getClientRects, e `visibility` é herdada,
  // então as duas caem nas checagens diretas. `opacity` NÃO é herdada em estilo
  // computado — um pai a 0 deixa o filho reportando 1 —, por isso a cadeia é
  // percorrida à mão.
  const opacidadeEfetiva = (el) => {
    let o = 1, n = el;
    while (n && n.nodeType === 1) {
      const v = parseFloat(getComputedStyle(n).opacity);
      if (!isNaN(v)) o *= v;
      if (o <= 0.05) return o;
      n = n.parentElement;
    }
    return o;
  };

  // Devolve null quando visivel, ou o nome do predicado que reprovou. O motivo
  // vai para `descartes`, para que toda exclusao seja auditavel — foi assim que
  // se descobriu que o descarte do heroi do illoca nao era `display:none`.
  const porQueInvisivel = (el, cs) => {
    cs = cs || getComputedStyle(el);
    if (cs.display === 'none') return 'display:none';
    if (cs.visibility === 'hidden' || cs.visibility === 'collapse') return 'visibility:' + cs.visibility;
    if (cs.contentVisibility === 'hidden') return 'content-visibility:hidden';
    const rects = el.getClientRects();
    if (!rects || rects.length === 0) return 'sem-caixa-renderizada';
    const r = el.getBoundingClientRect();
    if (r.width <= 0 || r.height <= 0) return 'area-zero';
    const op = opacidadeEfetiva(el);
    if (op <= 0.05) return 'opacidade-' + (Math.round(op * 1000) / 1000);
    return null;
  };

  const visivel = (el, cs) => porQueInvisivel(el, cs) === null;

  // ==========================================================================
  // C2 — recorte por maquinário, NÃO por posição de rolagem
  // ==========================================================================
  // A primeira versão desta guarda comparava a caixa do elemento com a
  // interseção geométrica dos ancestrais que recortam. Isso apagou o
  // `illoca.unseen.co` inteiro — site de revelação por rolagem, onde a 0 de
  // scroll todo o conteúdo está fora da janela. "Fora da tela agora" não é
  // "recortado".
  //
  // O que se quer pegar é maquinário: um contador animado de dígitos mora numa
  // caixa dezenas de vezes mais alta que a janela que o mostra. Então a medida
  // passa a ser de PROPORÇÃO — quanto da caixa do elemento o recortador
  // conseguiria conter —, que independe de onde a página está rolada.
  const fracaoContida = (el) => {
    const r = el.getBoundingClientRect();
    if (r.width <= 0 || r.height <= 0) return 0;
    let frac = 1;
    let n = el.parentElement, saltos = 0;
    while (n && n.nodeType === 1 && saltos < 40) {
      const cs = getComputedStyle(n);
      const recorta = cs.overflow !== 'visible' || cs.overflowX !== 'visible' ||
                      cs.overflowY !== 'visible' || (cs.clipPath && cs.clipPath !== 'none');
      if (recorta) {
        const c = n.getBoundingClientRect();
        if (c.width > 0 && c.height > 0) {
          const fx = Math.min(1, c.width / r.width);
          const fy = Math.min(1, c.height / r.height);
          frac = Math.min(frac, fx * fy);
        }
      }
      n = n.parentElement; saltos++;
    }
    return Math.max(0, Math.min(1, frac));
  };

  const LIMIAR_RECORTE = 0.25;

  // ==========================================================================
  // C3 — line-height: normal, e largura em ch
  // ==========================================================================
  const sondaOffscreen = (cs, conteudo, lhNormal) => {
    if (!document.body) return null;
    const span = document.createElement('span');
    span.textContent = conteudo;
    span.style.fontFamily = cs.fontFamily;
    span.style.fontSize = cs.fontSize;
    span.style.fontWeight = cs.fontWeight;
    span.style.fontStyle = cs.fontStyle;
    span.style.letterSpacing = cs.letterSpacing;
    if (lhNormal) span.style.lineHeight = 'normal';
    span.style.textTransform = 'none';
    span.style.position = 'absolute';
    span.style.left = '-99999px';
    span.style.top = '0';
    span.style.visibility = 'hidden';
    span.style.whiteSpace = 'nowrap';
    document.body.appendChild(span);
    const rect = span.getBoundingClientRect();
    document.body.removeChild(span);
    return rect;
  };

  const larguraDoZero = (cs) => {
    const r = sondaOffscreen(cs, '0', false);
    return (r && r.width) ? r.width : 1;
  };

  const razaoAlturaLinha = (cs, fs) => {
    const v = parseFloat(cs.lineHeight);
    if (!isNaN(v)) return { razao: Math.round((v / fs) * 100) / 100, origem: 'declarada' };
    const r = sondaOffscreen(cs, 'Hxg', true);
    if (r && r.height > 0 && fs > 0) {
      return { razao: Math.round((r.height / fs) * 100) / 100, origem: 'normal-medida' };
    }
    return { razao: null, origem: 'indisponivel' };
  };

  let upperCount = 0, upperChars = 0;
  const fontsInUse = new Map();

  // ==========================================================================
  // C5 — serifa decidida pela família que de fato renderiza
  // ==========================================================================
  const serifNames = ['times','georgia','garamond','playfair','lora','merriweather','baskerville',
    'palatino','cambria','didot','bodoni','minion','pt serif','noto serif','eb garamond','crimson',
    'libre baskerville','fraunces','newsreader','cormorant','spectral','source serif','ibm plex serif',
    'literata','domine','bitter','arvo','rockwell','scribo','freight','tiempos','canela','recoleta'];
  const primeiraFamilia = (family) =>
    String(family).split(',')[0].trim().replace(/^["']|["']$/g, '').toLowerCase();
  const isSerif = (family) => {
    const p = primeiraFamilia(family);
    if (!p) return false;
    if (p === 'serif' || p.endsWith(' serif')) return true;
    if (p.includes('sans')) return false;
    return serifNames.some(n => p.includes(n));
  };

  // ==========================================================================
  // Títulos
  // ==========================================================================
  const hEls = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')];
  const titGroups = new Map();
  const titSemFiltro = new Set();
  const titDescartados = [];
  const alturaViewport = window.innerHeight || 900;

  for (const el of hEls) {
    const cs = getComputedStyle(el);
    const fs = Math.round(parseFloat(cs.fontSize));
    const fam = cs.fontFamily;
    const txt = (el.innerText || el.textContent || '').trim();

    if (!isNaN(fs) && txt) titSemFiltro.add(fs);
    if (!txt || isNaN(fs)) continue;

    const motivo = porQueInvisivel(el, cs);
    if (motivo) {
      titDescartados.push({ px: fs, motivo, texto: txt.slice(0, 40) });
      continue;
    }
    const frac = fracaoContida(el);
    if (frac < LIMIAR_RECORTE) {
      titDescartados.push({ px: fs, motivo: 'recortado',
        fracaoContida: Math.round(frac*100)/100, texto: txt.slice(0, 40) });
      continue;
    }

    fontsInUse.set(fam, (fontsInUse.get(fam) || 0) + 1);

    const chars = txt.length;
    const words = txt.split(/\s+/).filter(Boolean).length;
    const rect = el.getBoundingClientRect();
    const topoAbs = rect.top + (window.scrollY || 0);
    const inFirstViewport = topoAbs < alturaViewport;
    const chWidth = Math.round(rect.width / larguraDoZero(cs));

    if (!titGroups.has(fs)) {
      const lh = razaoAlturaLinha(cs, fs);
      titGroups.set(fs, {
        px: fs, elementos: 1, caracteres: chars, palavras: words, textos: [txt.slice(0, 120)],
        fontFamily: fam, familiaEfetiva: primeiraFamilia(fam), serifa: isSerif(fam),
        fontWeight: cs.fontWeight,
        lineHeightPx: cs.lineHeight, lineHeightRazao: lh.razao, lineHeightOrigem: lh.origem,
        letterSpacing: cs.letterSpacing, textTransform: cs.textTransform,
        inFirstViewport, largura_ch: chWidth, maiorLarguraCh: chWidth,
        fracaoContidaMin: Math.round(frac * 100) / 100
      });
    } else {
      const g = titGroups.get(fs);
      g.elementos++; g.caracteres += chars; g.palavras += words;
      if (g.textos.length < 6) g.textos.push(txt.slice(0, 120));
      if (inFirstViewport) g.inFirstViewport = true;
      if (chWidth > g.maiorLarguraCh) g.maiorLarguraCh = chWidth;
      const f2 = Math.round(frac * 100) / 100;
      if (f2 < g.fracaoContidaMin) g.fracaoContidaMin = f2;
    }
  }

  const titDetalhes = [...titGroups.values()].sort((a,b)=>b.px-a.px);
  const tit = titDetalhes.map(x => x.px);
  const titLegado = [...titSemFiltro].sort((a,b)=>b-a);

  // ==========================================================================
  // Corpo / workhorse
  // ==========================================================================
  const corpo = new Map();
  const corpoSemFiltro = new Map();

  for (const el of document.querySelectorAll('p,li,td,dd,figcaption')) {
    const cs = getComputedStyle(el);
    const txt = (el.innerText || el.textContent || '').trim();
    if (!txt) continue;
    const fs = Math.round(parseFloat(cs.fontSize));
    if (isNaN(fs)) continue;

    corpoSemFiltro.set(fs, (corpoSemFiltro.get(fs) || 0) + 1);

    if (!visivel(el, cs)) continue;
    if (fracaoContida(el) < LIMIAR_RECORTE) continue;

    const fam = cs.fontFamily;
    fontsInUse.set(fam, (fontsInUse.get(fam) || 0) + 1);

    const rect = el.getBoundingClientRect();
    const e = corpo.get(fs);
    if (!e) {
      const lh = razaoAlturaLinha(cs, fs);
      corpo.set(fs, { fs, ocorrencias: 1, fontFamily: fam,
        lineHeightPx: cs.lineHeight, lineHeightRazao: lh.razao, lineHeightOrigem: lh.origem,
        csSample: cs, larguraMax: rect.width });
    } else {
      e.ocorrencias++;
      if (rect.width > e.larguraMax) { e.larguraMax = rect.width; e.csSample = cs; }
    }
  }

  const wh = [...corpo.values()].sort((a,b)=>b.ocorrencias-a.ocorrencias)[0] || null;
  if (wh) wh.largura_ch = Math.round(wh.larguraMax / larguraDoZero(wh.csSample));
  const whLegado = [...corpoSemFiltro.entries()].sort((a,b)=>b[1]-a[1])[0] || null;

  // C6 — caixa alta em TODA a pagina.
  // Antes so contava p/li/td/dd/figcaption mais cabecalhos, o que dava 3 numa
  // pagina com dezenas de rotulos, botoes e itens de navegacao em maiuscula. A
  // reducao de ALL CAPS e pedido explicito do cliente e precisa de contagem
  // honesta. Agora percorre qualquer elemento com texto proprio visivel.
  for (const el of todos) {
    const cs = getComputedStyle(el);
    if (cs.textTransform !== 'uppercase') continue;
    let direto = '';
    for (const n of el.childNodes) if (n.nodeType === 3) direto += (n.nodeValue || '');
    const txt = direto.trim();
    if (!txt) continue;
    if (!visivel(el, cs)) continue;
    upperCount++; upperChars += txt.length;
  }

  const altura = Math.max(document.documentElement.scrollHeight, document.body ? document.body.scrollHeight : 0);
  const p1000 = n => Math.round(n/altura*1000*100)/100;

  // ==========================================================================
  // Maior texto renderizado em qualquer tag — com C1 e C2
  // ==========================================================================
  let maiorTextoRenderizado = null, maxFs = -1;
  const descartadosPorRecorte = [];

  for (const el of todos) {
    let direto = '';
    for (const node of el.childNodes) {
      if (node.nodeType === 3) { const v = node.nodeValue || ''; if (v.trim()) direto += v; }
    }
    if (!direto.trim()) continue;

    const cs = getComputedStyle(el);
    if (!visivel(el, cs)) continue;

    const fs = Math.round(parseFloat(cs.fontSize));
    if (isNaN(fs) || fs <= maxFs) continue;

    const frac = fracaoContida(el);
    if (frac < LIMIAR_RECORTE) {
      descartadosPorRecorte.push({ px: fs, tag: el.tagName.toLowerCase(),
        fracaoContida: Math.round(frac*100)/100, texto: direto.trim().slice(0, 40) });
      continue;
    }

    maxFs = fs;
    const rect = el.getBoundingClientRect();
    const topoAbs = rect.top + (window.scrollY || 0);
    const txt = direto.trim();
    const cls = typeof el.className === 'string' ? el.className.trim()
      : (el.className && el.className.baseVal ? el.className.baseVal.trim() : (el.getAttribute('class') || ''));
    maiorTextoRenderizado = {
      px: fs, tag: el.tagName.toLowerCase(), className: cls,
      caracteres: txt.length, palavras: txt.split(/\s+/).filter(Boolean).length,
      fontFamily: cs.fontFamily, familiaEfetiva: primeiraFamilia(cs.fontFamily),
      serifa: isSerif(cs.fontFamily),
      fontWeight: cs.fontWeight, textTransform: cs.textTransform,
      fracaoContida: Math.round(frac * 100) / 100,
      profundidadeDeRolagem: altura > 0 ? Math.round((topoAbs / altura) * 1000) / 10 : 0
    };
  }

  const maiorH = tit.length ? tit[0] : 0;

  return {
    url: location.href,
    altura,
    // C4 — telas contra o viewport real, não contra 900 fixo
    viewportMedido: { w: window.innerWidth, h: alturaViewport, dpr: window.devicePixelRatio },
    telas: Math.round(altura / alturaViewport * 10) / 10,
    telas_base900_legado: Math.round(altura / 900 * 10) / 10,

    metricaV2_hsvS015: pc(hsv15),
    corPerceptivel_C005: pc(c05),
    corForte_C012: pc(c12),
    cromaMedioPonderado: total ? Math.round(somaC/total*1000)/1000 : 0,
    cromaPicoOklch: Math.round(picoC*1000)/1000,
    fundos: [...cores.entries()].sort((a,b)=>b[1].a-a[1].a).slice(0,6)
      .map(([cor,v])=>({cor, pct: pc(v.a), L: Math.round(v.L*100)/100,
                        C: Math.round(v.C*1000)/1000, H: Math.round(v.H)})),
    midia: {img,svg,video,canvas},
    midiaTotalPor1000: p1000(img+svg+video+canvas),
    keyframes, nomes, keyframesPor1000: p1000(keyframes), folhasBloqueadas: bloq,
    emTransicao: trans, emTransicaoPor1000: p1000(trans), animacoesAtivas: anim,
    duracoes: [...dur.entries()].sort((a,b)=>b[1]-a[1]).slice(0,8),

    // Tipografia — CORRIGIDA: só o que renderiza e não está recortado
    tamTitulos: tit,
    workhorse: wh ? { px: wh.fs, ocorrencias: wh.ocorrencias } : null,
    razaoTituloWorkhorse: (tit.length && wh) ? Math.round(tit[0]/wh.fs*100)/100 : null,
    titulosDetalhes: titDetalhes,
    workhorseDetalhe: wh ? { px: wh.fs, fontFamily: wh.fontFamily,
      familiaEfetiva: primeiraFamilia(wh.fontFamily),
      lineHeightPx: wh.lineHeightPx, lineHeightRazao: wh.lineHeightRazao,
      lineHeightOrigem: wh.lineHeightOrigem, largura_ch: wh.largura_ch } : null,

    // LEGADO, sem filtro — mantido para a correção ficar auditável
    _legado: {
      tamTitulos_semFiltro: titLegado,
      workhorse_semFiltro: whLegado ? { px: whLegado[0], ocorrencias: whLegado[1] } : null,
      razao_semFiltro: (titLegado.length && whLegado) ? Math.round(titLegado[0]/whLegado[0]*100)/100 : null,
      divergeDoCorrigido: (titLegado.length ? titLegado[0] : null) !== (tit.length ? tit[0] : null)
    },
    descartes: { titulos: titDescartados, porRecorte: descartadosPorRecorte },

    caixaAlta: { elementos: upperCount, caracteresTotais: upperChars, caracteresPor1000px: p1000(upperChars) },
    familiasUsadas: [...fontsInUse.entries()].sort((a,b)=>b[1]-a[1]).map(([familia, contagem]) => ({familia, contagem})),

    maiorTextoRenderizado,
    pontoCego: maiorTextoRenderizado ? maiorTextoRenderizado.px > maiorH : false,
    diferencaPx: maiorTextoRenderizado ? maiorTextoRenderizado.px - maiorH : 0
  };
};

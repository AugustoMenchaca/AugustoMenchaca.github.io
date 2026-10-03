// Sonda de contraste — par de texto/fundo REALMENTE renderizado na pagina.
//
// Por que existe: combinar tokens dois a dois produz uma matriz que inclui
// pares que a pagina nunca usa. O que a issue #35 pede e o contraste de cada
// par que existe. Esta sonda resolve o fundo efetivo subindo a arvore,
// acumula alpha e opacity (que reduzem contraste silenciosamente) e escolhe o
// limiar WCAG certo por tamanho e peso da fonte.
//
// Uso: Chrome headless, viewport 1440x900x1. RODE O PRE-SCROLL DA §8.1 DO
// REFERENCE-BOARD-v3 ANTES. Sem isso a sonda le elementos ainda em opacity:0
// (revelacao por scroll) e reporta 12 reprovacoes falsas, todas com
// ratio exatamente 1,00 e cor de texto igual a cor de fundo.
() => {
  const P = s => { const m=String(s).match(/rgba?\(([^)]+)\)/); if(!m) return null;
    const p=m[1].split(/[,\s\/]+/).filter(Boolean).map(Number);
    return (p.length<3||p.some(Number.isNaN))?null:{r:p[0],g:p[1],b:p[2],a:p.length>3?p[3]:1}; };
  const lin = c => { c/=255; return c<=0.03928 ? c/12.92 : Math.pow((c+0.055)/1.055,2.4); };
  const Lum = c => 0.2126*lin(c.r)+0.7152*lin(c.g)+0.0722*lin(c.b);
  const CR = (a,b) => { const la=Lum(a), lb=Lum(b); const hi=Math.max(la,lb), lo=Math.min(la,lb);
    return (hi+0.05)/(lo+0.05); };
  const over = (fg,bg) => ({ r: fg.r*fg.a+bg.r*(1-fg.a), g: fg.g*fg.a+bg.g*(1-fg.a),
                             b: fg.b*fg.a+bg.b*(1-fg.a), a:1 });
  const hex = c => '#'+[c.r,c.g,c.b].map(v=>Math.round(v).toString(16).padStart(2,'0').toUpperCase()).join('');
  const bgOf = el => { const layers=[]; let n=el;
    while(n && n.nodeType===1){ const cs=getComputedStyle(n); const c=P(cs.backgroundColor);
      const op=parseFloat(cs.opacity);
      if(c && c.a>0) layers.push({c, a: c.a*(isNaN(op)?1:op)});
      if(c && c.a>=1 && (isNaN(op)||op>=1)) break;
      n=n.parentElement; }
    let acc={r:255,g:255,b:255,a:1};
    for(let i=layers.length-1;i>=0;i--) acc=over({...layers[i].c, a:layers[i].a}, acc);
    return acc; };
  const opChain = el => { let o=1,n=el;
    while(n&&n.nodeType===1){ const v=parseFloat(getComputedStyle(n).opacity); if(!isNaN(v)) o*=v;
      n=n.parentElement; } return o; };

  const groups=new Map(); let elementos=0, sobreImagem=0;
  for (const el of document.querySelectorAll('*')) {
    let txt=''; for(const nd of el.childNodes) if(nd.nodeType===3) txt+=nd.textContent;
    txt=txt.trim(); if(!txt) continue;            // so quem tem texto proprio
    const cs=getComputedStyle(el);
    if(cs.display==='none'||cs.visibility==='hidden') continue;
    const fg=P(cs.color); if(!fg) continue;
    let temImg=false, n=el;
    while(n&&n.nodeType===1){ if(getComputedStyle(n).backgroundImage!=='none'){temImg=true;break;} n=n.parentElement; }
    const bg=bgOf(el); const chain=opChain(el);
    const eff=over({...fg, a: fg.a*chain}, bg);
    const fs=parseFloat(cs.fontSize); const fw=parseInt(cs.fontWeight)||400;
    const grande = fs>=24 || (fs>=18.66 && fw>=700);   // WCAG 1.4.3 texto grande
    const limiar = grande ? 3.0 : 4.5;
    elementos++; if(temImg) sobreImagem++;
    const key = `${hex(eff)}|${hex(bg)}|${limiar}`;
    const g = groups.get(key) || { texto:hex(eff), fundo:hex(bg), limiar,
      ratio: Math.round(CR(eff,bg)*100)/100, n:0, minPx:999, maxPx:0, exemplo:'', amostra:'' };
    g.n++; g.minPx=Math.min(g.minPx,Math.round(fs)); g.maxPx=Math.max(g.maxPx,Math.round(fs));
    if(!g.exemplo){ g.exemplo = el.tagName.toLowerCase()+(typeof el.className==='string'&&el.className.trim()
      ?'.'+el.className.trim().split(/\s+/).slice(0,2).join('.'):''); g.amostra=txt.slice(0,28); }
    groups.set(key,g);
  }
  const todos=[...groups.values()].sort((a,b)=>a.ratio-b.ratio);
  return { elementosComTexto: elementos, textoSobreBackgroundImage: sobreImagem,
    paresDistintos: todos.length,
    reprovados: todos.filter(g=>g.ratio<g.limiar),
    margemFina: todos.filter(g=>g.ratio>=g.limiar && g.ratio<g.limiar*1.2),
    pares: todos };
}

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
  
  // NEW METRICS FOR TYPOGRAPHY
  let upperCount = 0;
  let upperChars = 0;
  const fontsInUse = new Map();
  
  // To measure '0' char width correctly
  function getZeroWidth(cs) {
    const span = document.createElement('span');
    span.textContent = '0';
    span.style.fontFamily = cs.fontFamily;
    span.style.fontSize = cs.fontSize;
    span.style.fontWeight = cs.fontWeight;
    span.style.fontStyle = cs.fontStyle;
    span.style.letterSpacing = cs.letterSpacing;
    span.style.textTransform = 'none';
    span.style.position = 'absolute';
    span.style.visibility = 'hidden';
    span.style.whiteSpace = 'nowrap';
    document.body.appendChild(span);
    const w = span.getBoundingClientRect().width;
    document.body.removeChild(span);
    return w || 1;
  }

  // Helper to guess serif
  const serifNames = ['times', 'georgia', 'garamond', 'playfair', 'lora', 'merriweather', 'baskerville', 'palatino', 'cambria', 'didot', 'bodoni', 'minion', 'pt serif', 'noto serif', 'roberto serif', 'eb garamond', 'crimson', 'libre baskerville', 'fraunces', 'newsreader'];
  function isSerif(family) {
    const f = family.toLowerCase();
    if (f.includes('serif') && !f.includes('sans-serif')) return true;
    for (const name of serifNames) {
      if (f.includes(name)) return true;
    }
    return false;
  }

  const hEls = document.querySelectorAll('h1,h2,h3,h4,h5,h6');
  const titGroups = new Map();

  for (const el of hEls) {
    const cs = getComputedStyle(el);
    const fsStr = cs.fontSize;
    const fs = Math.round(parseFloat(fsStr));
    
    // Add to typography inventory
    const fam = cs.fontFamily;
    fontsInUse.set(fam, (fontsInUse.get(fam) || 0) + 1);

    const txt = el.innerText || el.textContent || '';
    const txtTrim = txt.trim();
    if (!txtTrim) continue;
    
    const chars = txtTrim.length;
    const words = txtTrim.split(/\s+/).length;
    const rect = el.getBoundingClientRect();
    const inFirstViewport = rect.top < 900;
    
    let zeroW = getZeroWidth(cs);
    const chWidth = Math.round(rect.width / zeroW);

    if (!titGroups.has(fs)) {
      let lhRatio = null;
      let lhVal = parseFloat(cs.lineHeight);
      if (!isNaN(lhVal)) {
        lhRatio = Math.round((lhVal / fs) * 100) / 100;
      }
      titGroups.set(fs, {
        px: fs,
        elementos: 1,
        caracteres: chars,
        palavras: words,
        textos: [txtTrim],
        fontFamily: fam,
        serifa: isSerif(fam),
        fontWeight: cs.fontWeight,
        lineHeightPx: cs.lineHeight,
        lineHeightRazao: lhRatio,
        letterSpacing: cs.letterSpacing,
        textTransform: cs.textTransform,
        inFirstViewport: inFirstViewport,
        largura_ch: chWidth,
        maiorLarguraCh: chWidth
      });
    } else {
      const g = titGroups.get(fs);
      g.elementos++;
      g.caracteres += chars;
      g.palavras += words;
      g.textos.push(txtTrim);
      if (inFirstViewport) g.inFirstViewport = true;
      if (chWidth > g.maiorLarguraCh) g.maiorLarguraCh = chWidth;
    }
  }

  const titDetalhes = [...titGroups.values()].sort((a,b)=>b.px-a.px);
  const tit = titDetalhes.map(x => x.px);

  const corpo=new Map();
  let maxCorpoCount = 0;
  let workhorseDetalhe = null;

  for (const el of document.querySelectorAll('p,li,td,dd,figcaption')) {
    const cs = getComputedStyle(el);
    const txt = el.innerText || el.textContent || '';
    const txtTrim = txt.trim();
    
    // Check uppercase for all visible elements (we'll just use these common text tags + headings)
    if (cs.textTransform === 'uppercase') {
      if (txtTrim && el.getBoundingClientRect().height > 0) {
        upperCount++;
        upperChars += txtTrim.length;
      }
    }
    
    if(!txtTrim) continue;

    const fam = cs.fontFamily;
    fontsInUse.set(fam, (fontsInUse.get(fam) || 0) + 1);

    const fs=Math.round(parseFloat(cs.fontSize)); 
    let entry = corpo.get(fs);
    if (!entry) {
      entry = {
        ocorrencias: 1, 
        fs,
        fontFamily: fam,
        lineHeightPx: cs.lineHeight,
        lineHeightRazao: Math.round((parseFloat(cs.lineHeight)/fs)*100)/100,
        largura_ch_max: 0,
        cs_sample: cs,
        rect_sample: el.getBoundingClientRect()
      };
      corpo.set(fs, entry);
    } else {
      entry.ocorrencias++;
      // Just keep one sample for rect/width measurement to avoid measuring all
      if (el.getBoundingClientRect().width > entry.rect_sample.width) {
         entry.rect_sample = el.getBoundingClientRect();
         entry.cs_sample = cs;
      }
    }
  }
  
  // Measure CH for the workhorse
  const wh_entries = [...corpo.values()].sort((a,b)=>b.ocorrencias-a.ocorrencias);
  const wh = wh_entries.length > 0 ? wh_entries[0] : null;
  if (wh) {
    let zeroW = getZeroWidth(wh.cs_sample);
    wh.largura_ch = Math.round(wh.rect_sample.width / zeroW);
  }

  // Also count uppercase in headings
  for (const el of hEls) {
    const cs = getComputedStyle(el);
    if (cs.textTransform === 'uppercase') {
       const txt = el.innerText || el.textContent || '';
       if (txt.trim() && el.getBoundingClientRect().height > 0) {
          upperCount++;
          upperChars += txt.trim().length;
       }
    }
  }

  const altura=Math.max(document.documentElement.scrollHeight, document.body?document.body.scrollHeight:0);
  const p1000=n=>Math.round(n/altura*1000*100)/100;
  
  // NEW METRIC: maiorTextoRenderizado
  let maiorTextoRenderizado = null;
  let maxFs = -1;

  for (const el of todos) {
    let hasDirectText = false;
    let directTextContent = '';
    for (const node of el.childNodes) {
      if (node.nodeType === 3 /* Node.TEXT_NODE */) {
        const val = node.nodeValue || node.textContent || '';
        if (val.trim().length > 0) {
          hasDirectText = true;
          directTextContent += val;
        }
      }
    }
    if (!hasDirectText) continue;

    const cs = getComputedStyle(el);
    if (cs.display === 'none') continue;
    if (cs.visibility === 'hidden') continue;
    const op = parseFloat(cs.opacity);
    if (isNaN(op) || op <= 0.05) continue;
    const rects = el.getClientRects();
    if (!rects || rects.length === 0) continue;

    const fs = Math.round(parseFloat(cs.fontSize));
    if (isNaN(fs)) continue;

    if (fs > maxFs) {
      maxFs = fs;
      const rect = el.getBoundingClientRect();
      const topAbs = rect.top + (window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0);
      const prof = altura > 0 ? Math.round((topAbs / altura) * 1000) / 10 : 0;
      
      const txt = (el.innerText || el.textContent || directTextContent || '').trim();
      const chars = txt.length;
      const words = txt.split(/\s+/).filter(Boolean).length;
      
      const cls = typeof el.className === 'string' ? el.className.trim() : (el.className && el.className.baseVal ? el.className.baseVal.trim() : (el.getAttribute('class') || '').trim());

      maiorTextoRenderizado = {
        px: fs,
        tag: el.tagName.toLowerCase(),
        className: cls,
        caracteres: chars,
        palavras: words,
        fontFamily: cs.fontFamily,
        fontWeight: cs.fontWeight,
        textTransform: cs.textTransform,
        profundidadeDeRolagem: prof
      };
    }
  }

  const maiorH = (tit && tit.length > 0) ? tit[0] : 0;
  const pontoCego = maiorTextoRenderizado ? (maiorTextoRenderizado.px > maiorH) : false;
  const diferencaPx = maiorTextoRenderizado ? (maiorTextoRenderizado.px - maiorH) : 0;
  
  return { 
    url: location.href, 
    altura, 
    telas: Math.round(altura/900*10)/10,
    metricaV2_hsvS015: pc(hsv15), 
    corPerceptivel_C005: pc(c05), 
    corForte_C012: pc(c12),
    cromaMedioPonderado: total? Math.round(somaC/total*1000)/1000 : 0,
    cromaPicoOklch: Math.round(picoC*1000)/1000,
    fundos: [...cores.entries()].sort((a,b)=>b[1].a-a[1].a).slice(0,6)
      .map(([cor,v])=>({cor, pct: pc(v.a), L: Math.round(v.L*100)/100,
                        C: Math.round(v.C*1000)/1000, H: Math.round(v.H)})),
    midia:{img,svg,video,canvas}, 
    midiaTotalPor1000: p1000(img+svg+video+canvas),
    keyframes, 
    nomes, 
    keyframesPor1000: p1000(keyframes), 
    folhasBloqueadas: bloq,
    emTransicao: trans, 
    emTransicaoPor1000: p1000(trans), 
    animacoesAtivas: anim,
    duracoes: [...dur.entries()].sort((a,b)=>b[1]-a[1]).slice(0,8),
    tamTitulos: tit, 
    workhorse: wh?{px:wh.fs,ocorrencias:wh.ocorrencias}:null,
    razaoTituloWorkhorse: (tit.length&&wh)? Math.round(tit[0]/wh.fs*100)/100 : null,
    
    // TYPOGRAPHY NEW METRICS
    titulosDetalhes: titDetalhes,
    workhorseDetalhe: wh ? {
      px: wh.fs,
      fontFamily: wh.fontFamily,
      lineHeightPx: wh.lineHeightPx,
      lineHeightRazao: wh.lineHeightRazao,
      largura_ch: wh.largura_ch
    } : null,
    caixaAlta: {
      elementos: upperCount,
      caracteresTotais: upperChars,
      caracteresPor1000px: p1000(upperChars)
    },
    familiasUsadas: [...fontsInUse.entries()].sort((a,b)=>b[1]-a[1]).map(x => ({familia: x[0], contagem: x[1]})),

    // BLIND SPOT METRICS (maiorTextoRenderizado)
    maiorTextoRenderizado,
    pontoCego,
    diferencaPx
  };
}
;

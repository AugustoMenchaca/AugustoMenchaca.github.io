/* Painel de diagnóstico do celular. Só entra com ?diag na URL (o carregador está no fim do index.html).
   Mostra, na própria tela, por que o vídeo e a animação podem estar desligados. Não envia nada a lugar nenhum. */
(() => {
  const mq = (q) => window.matchMedia(q).matches;
  const con = navigator.connection;
  const sim = (v) => (v ? 'SIM' : 'não');
  const arq = (u) => String(u || '').split('/').pop() || '';
  const html = document.documentElement;

  const painel = document.createElement('div');
  painel.style.cssText = 'position:fixed;left:0;right:0;bottom:0;z-index:2147483647;max-height:55vh;overflow:auto;' +
    'background:rgba(8,12,10,.94);color:#d9f2e2;font:11px/1.45 ui-monospace,Menlo,Consolas,monospace;padding:8px 10px;' +
    'border-top:2px solid #f6ed6c;-webkit-overflow-scrolling:touch';
  const topo = document.createElement('div');
  topo.style.cssText = 'display:flex;gap:8px;align-items:center;margin-bottom:6px;position:sticky;top:0';
  const titulo = document.createElement('strong');
  titulo.textContent = 'diag ?';
  titulo.style.cssText = 'flex:1;color:#f6ed6c';
  const btnTocar = document.createElement('button');
  btnTocar.textContent = 'tocar vídeos';
  const btnFechar = document.createElement('button');
  btnFechar.textContent = '×';
  for (const b of [btnTocar, btnFechar]) {
    b.type = 'button';
    b.style.cssText = 'font:inherit;color:#111;background:#f6ed6c;border:0;border-radius:4px;padding:4px 9px';
  }
  topo.append(titulo, btnTocar, btnFechar);
  const corpo = document.createElement('div');
  painel.append(topo, corpo);
  document.body.appendChild(painel);
  btnFechar.addEventListener('click', () => { clearInterval(timer); painel.remove(); });
  btnTocar.addEventListener('click', () => {
    document.querySelectorAll('.device-screen[data-device-video] video').forEach((v) => {
      if (v.hasAttribute('src')) v.play().catch(() => {});
    });
  });

  const linha = (rotulo, valor, nivel) => {
    const el = document.createElement('div');
    el.style.cssText = 'white-space:pre-wrap;word-break:break-word;color:' + (nivel === 'x' ? '#ff8a80' : nivel === '!' ? '#ffd54a' : '#d9f2e2');
    el.textContent = rotulo + ': ' + valor;
    return el;
  };

  function medir() {
    const out = [];
    const reduz = mq('(prefers-reduced-motion: reduce)');
    const saveData = con ? Boolean(con.saveData) : null;
    const tipo = con && con.effectiveType ? con.effectiveType : null;
    const lenta = tipo === '2g' || tipo === 'slow-2g';
    const temView = !!(window.CSS && CSS.supports && CSS.supports('animation-timeline: view()'));
    const temIO = 'IntersectionObserver' in window;
    const jogadas = window.__diagPlay || [];
    // resultado mais recente de cada vídeo: uma recusa seguida de sucesso (o toque liberou) já não conta como recusa
    const ultimo = {};
    jogadas.forEach((j) => { const i = j.lastIndexOf(': '); ultimo[j.slice(0, i)] = j.slice(i + 2); });
    const recusadas = Object.entries(ultimo).filter(([, r]) => r !== 'ok').map(([s, r]) => s + ': ' + r);
    const recusouAntes = jogadas.some((j) => !/: ok$/.test(j));

    // veredito: cada linha é uma condição que o site realmente usa (device-media.js e janelas-movimento.js)
    const veredito = [];
    if (reduz) veredito.push(['x', 'REDUZIR MOVIMENTO está ligado no aparelho: o site, de propósito, não toca vídeo e não anima.']);
    if (saveData) veredito.push(['x', 'ECONOMIA DE DADOS está ligada: o site não carrega vídeo.']);
    if (lenta) veredito.push(['x', 'Rede ' + tipo + ': o site não carrega vídeo.']);
    if (!temIO) veredito.push(['x', 'Sem IntersectionObserver: o site não anima nem carrega vídeo sob demanda.']);
    if (recusadas.length) veredito.push(['x', 'play() RECUSADO pelo navegador (' + recusadas.slice(-1)[0] + '). Em vídeo mudo isso costuma ser Modo de Baixo Consumo (iPhone) ou economia de bateria; o site tenta de novo no primeiro toque.']);
    if (!recusadas.length && recusouAntes) veredito.push(['!', 'play() foi recusado e depois passou (no primeiro toque): o autoplay ficou bloqueado até o toque, típico de Modo de Baixo Consumo (iPhone) ou economia de bateria.']);
    if (!temView) veredito.push(['!', 'Sem animation-timeline: view(): as animações usam o caminho alternativo (IntersectionObserver). Funciona, só que de outro jeito.']);
    if (!veredito.some((v) => v[0] === 'x')) veredito.push(['', 'Nenhuma condição do site desliga vídeo ou animação neste aparelho.']);
    veredito.forEach(([n, t]) => out.push(linha('>>', t, n)));

    out.push(linha('reduzir movimento', sim(reduz), reduz ? 'x' : ''));
    out.push(linha('economia de dados (Save-Data)', saveData === null ? 'o navegador não informa' : sim(saveData), saveData ? 'x' : ''));
    out.push(linha('rede (effectiveType / downlink)', (tipo || 'não informa') + ' / ' + (con && con.downlink != null ? con.downlink + ' Mb/s' : 'não informa'), lenta ? 'x' : ''));
    out.push(linha('animation-timeline: view()', temView ? 'suportado' : 'NÃO suportado', temView ? '' : '!'));
    out.push(linha('IntersectionObserver', temIO ? 'suportado' : 'NÃO suportado', temIO ? '' : 'x'));
    out.push(linha('classes do <html>', html.className || '(nenhuma)', ''));
    out.push(linha('tela', innerWidth + 'x' + innerHeight + ' @' + devicePixelRatio + ' | variante ' + (mq('(max-width: 899px)') ? 'celular' : 'desktop') + ' | toque ' + (mq('(hover: none)') ? 'sim' : 'não'), ''));
    out.push(linha('aba visível', sim(!document.hidden), document.hidden ? '!' : ''));
    out.push(linha('aparelho', navigator.userAgent, ''));

    const slots = document.querySelectorAll('.device-screen[data-device-video]');
    out.push(linha('janelas com vídeo', String(slots.length), ''));
    slots.forEach((slot) => {
      const v = slot.querySelector('video');
      if (!v) { out.push(linha(' - janela', 'sem <video> (device-media.js não rodou)', 'x')); return; }
      const secao = (slot.closest('[id]') || {}).id || arq(slot.dataset.deviceVideo).replace(/\.mp4$/, '') || '?';
      const src = v.hasAttribute('src') ? arq(v.getAttribute('src')) : '(sem src: fora da tela ou desligado)';
      const erro = v.error ? ' ERRO ' + v.error.code : '';
      out.push(linha(' - ' + secao, src + ' | pausado ' + sim(v.paused) + ' | ready ' + v.readyState + ' | rede ' + v.networkState + ' | t ' + v.currentTime.toFixed(1) + 's | tocando ' + sim(slot.classList.contains('device-screen--playing')) + erro, erro ? 'x' : ''));
    });
    out.push(linha('play() registrados', jogadas.length ? jogadas.slice(-6).join(' ; ') : '(nenhum ainda)', recusadas.length ? 'x' : ''));
    return out;
  }

  function desenhar() {
    corpo.replaceChildren(...medir());
    titulo.textContent = 'diag ' + new Date().toLocaleTimeString('pt-BR');
  }
  desenhar();
  const timer = setInterval(desenhar, 1000);
})();

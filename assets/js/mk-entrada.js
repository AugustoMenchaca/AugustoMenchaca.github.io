/* Entrada da colagem Mokker ao rolar (#92) + parallax leve de ponteiro.
   CSS em mk-entrada.css cuida do estado visual; este arquivo só dispara o
   fallback (sem animation-timeline: view()), encerra o will-change e liga o
   parallax depois que a entrada assenta. Falha seguranca: sem JS, a colagem
   fica no repouso do CSS. */
(() => {
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const fineHover = matchMedia('(hover: hover) and (pointer: fine)');
  const supportsView = CSS.supports('animation-timeline', 'view()');
  const colagens = document.querySelectorAll('[data-mk-colagem]');
  if (!colagens.length || reduceMotion.matches) return;

  const emRepouso = (mk) => {
    const t = getComputedStyle(mk).translate;
    return !t || t === 'none' || /^0px(\s+0px)?$/.test(t.trim());
  };

  function wireView(wrap) {
    wrap.querySelectorAll('.mk[data-mk-papel]').forEach((mk) => {
      mk.addEventListener('animationstart', () => wrap.classList.add('mk-animating'));
      mk.addEventListener('animationend', () => {
        if (!emRepouso(mk)) return;
        mk.style.animation = 'none';
        wrap.classList.remove('mk-animating');
        initParallax(wrap);
      });
    });
  }

  function wireFallback(wrap) {
    const io = new IntersectionObserver((entries) => {
      const e = entries[0];
      if (!e.isIntersecting) return;
      io.disconnect();
      wrap.classList.add('is-in', 'mk-animating');
      const mks = wrap.querySelectorAll('.mk[data-mk-papel]');
      let pendentes = mks.length;
      mks.forEach((mk) => mk.addEventListener('transitionend', () => {
        if (--pendentes > 0) return;
        wrap.classList.remove('mk-animating');
        initParallax(wrap);
      }, { once: true }));
    }, { threshold: 0.25 });
    io.observe(wrap);
  }

  function initParallax(wrap) {
    if (wrap.dataset.mkParallax) return;
    wrap.dataset.mkParallax = '1';
    const celular = wrap.querySelector('.mk[data-mk-papel="celular"]');
    const notebook = wrap.querySelector('.mk[data-mk-papel="notebook"]');
    if (!celular || !notebook) return;

    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0, ativo = false;

    const io = new IntersectionObserver((e) => {
      ativo = e[0].isIntersecting;
      if (ativo) tentarIniciar();
      else raf = (cancelAnimationFrame(raf), 0);
    }, { threshold: 0 });
    io.observe(wrap);

    function onMove(ev) {
      if (!ativo || reduceMotion.matches || !fineHover.matches) return;
      const r = wrap.getBoundingClientRect();
      tx = ((ev.clientX - r.left) / r.width) * 2 - 1;
      ty = ((ev.clientY - r.top) / r.height) * 2 - 1;
      tentarIniciar();
    }

    function quadro() {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      celular.style.translate = `${(cx * 6).toFixed(2)}px ${(cy * 6).toFixed(2)}px`;
      notebook.style.translate = `${(-cx * 3).toFixed(2)}px ${(-cy * 3).toFixed(2)}px`;
      raf = (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) ? requestAnimationFrame(quadro) : 0;
    }

    function tentarIniciar() {
      if (!raf && ativo && fineHover.matches && !reduceMotion.matches) raf = requestAnimationFrame(quadro);
    }

    if (fineHover.matches) window.addEventListener('pointermove', onMove, { passive: true });
    reduceMotion.addEventListener('change', () => {
      if (reduceMotion.matches && raf) raf = (cancelAnimationFrame(raf), 0);
    });
  }

  colagens.forEach((wrap) => (supportsView ? wireView : wireFallback)(wrap));
})();

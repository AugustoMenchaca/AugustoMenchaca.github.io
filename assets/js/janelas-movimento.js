(() => {
  document.documentElement.classList.add('js-janelas');

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduceMotion.matches || !window.IntersectionObserver) return;

  const nums = document.querySelector('.nums');
  if (nums) {
    // Um formatador por idioma, criado em tempo ocioso: toLocaleString() a cada quadro recria o formatador
    // e a primeira chamada carrega os dados do idioma, o que travava a rolagem ao chegar nos números.
    const formatos = {};
    const formato = (lang) => formatos[lang] || (formatos[lang] = new Intl.NumberFormat(lang));
    const aquecer = () => { formato('pt-BR').format(0); formato('en-US').format(0); };
    if (window.requestIdleCallback) requestIdleCallback(aquecer, { timeout: 2000 });
    else setTimeout(aquecer, 800);

    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        obs.disconnect();
        
        const start = performance.now();
        const dur = 1600;
        const targets = Array.from(nums.querySelectorAll('[data-count-to]')).filter(el => el.getClientRects().length).map(el => {
          const orig = el.textContent;
          const isSuffix = orig.trim().endsWith('+');
          return {
            el,
            to: parseInt(el.getAttribute('data-count-to') || '0', 10),
            prefix: isSuffix ? '' : (el.getAttribute('data-count-prefix') || ''),
            suffix: isSuffix ? '+' : '',
            lang: (el.getAttribute('lang') || el.closest('[lang]')?.lang) === 'en' ? 'en-US' : 'pt-BR',
            orig
          };
        });

        const tick = (now) => {
          const k = Math.min(1, Math.max(0, (now - start) / dur));
          const ease = 1 - Math.pow(1 - k, 3);
          
          if (k < 1) {
            targets.forEach(t => {
              const val = Math.round(t.to * ease);
              t.el.textContent = t.prefix + formato(t.lang).format(val) + t.suffix;
            });
            requestAnimationFrame(tick);
          } else {
            targets.forEach(t => t.el.textContent = t.orig);
          }
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    obs.observe(nums);
  }

  if (!CSS.supports('animation-timeline: view()')) {
    document.documentElement.classList.add('sem-view');
    const fallbackObs = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    document.querySelectorAll('.win-rise, .rise, .nums > *, .clist li, .track li, .qml-cols > *, .qml-formula-caption, .viv-col, .viv-divider, .viv-period, .about-copy p, .contact-links .btn-b3b, .footer-grid > *').forEach(el => {
      fallbackObs.observe(el);
    });
  }
})();

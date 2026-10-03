(() => {
  document.documentElement.classList.add('js-janelas');

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduceMotion.matches || !window.IntersectionObserver) return;

  const nums = document.querySelector('.nums');
  if (nums) {
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        obs.disconnect();
        
        const start = performance.now();
        const dur = 1600;
        const targets = Array.from(nums.querySelectorAll('[data-count-to]')).map(el => {
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
              t.el.textContent = t.prefix + val.toLocaleString(t.lang) + t.suffix;
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

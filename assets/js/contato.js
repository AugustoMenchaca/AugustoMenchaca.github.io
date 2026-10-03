/* Contato sem numero nem e-mail no HTML (issues #97, #101 e #103): o href publicado e https://wa.me/ e o
   endereco com o numero e montado na primeira interacao (mouse, foco, toque ou clique).
   As partes ficam invertidas e em base64 nos data-*. */
(() => {
  const link = document.querySelector('.wa-link');
  if (!link) return;
  const parte = (k) => atob(link.dataset[k]).split('').reverse().join('');
  const montar = () => {
    link.href = 'https://wa.me/' + parte('p0') + parte('p1') + parte('p2') + parte('p3');
  };
  ['pointerenter', 'focus', 'touchstart'].forEach((tipo) => link.addEventListener(tipo, montar, { once: true, passive: true }));
  link.addEventListener('click', montar, { capture: true });

  // E-mail (issue #103): o href publicado e "mailto:" vazio; o endereco e montado na primeira interacao.
  const M = ['YWNhaGNuZW1jZGE=', 'QA==', 'LmZuaQ==', 'LmxlcGZ1', 'cmIudWRl'];
  const endereco = () => M.map((p) => atob(p).split('').reverse().join('')).join('');
  document.querySelectorAll('.mail-link').forEach((a) => {
    const montar = () => { a.href = 'mailto:' + endereco(); };
    ['pointerenter', 'focus', 'touchstart'].forEach((tipo) => a.addEventListener(tipo, montar, { once: true, passive: true }));
    a.addEventListener('click', montar, { capture: true });
  });
})();

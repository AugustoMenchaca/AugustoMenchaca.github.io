/* Telefone sob clique (issue #97): o HTML publicado nao traz o numero em texto.
   As partes ficam invertidas e em base64 nos data-*, e so viram o link tel: no clique. */
(() => {
  const botao = document.querySelector('.tel-reveal');
  if (!botao) return;
  const parte = (k) => atob(botao.dataset[k]).split('').reverse().join('');
  botao.addEventListener('click', () => {
    const n = parte('p0') + parte('p1') + parte('p2') + parte('p3');
    const link = document.createElement('a');
    link.href = 'tel:+' + n;
    link.textContent = '(' + n.slice(2, 4) + ')\u00a0' + n.slice(4, 9) + '\u2011' + n.slice(9);
    botao.replaceWith(link);
    link.focus();
  }, { once: true });
})();

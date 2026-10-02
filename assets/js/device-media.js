/* Vídeo opcional por tela; a captura continua disponível como fallback. */
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const isMobile = window.matchMedia('(max-width: 899px)');
  const conn = navigator.connection;
  const slowConn = () => !!conn && (conn.saveData || ['2g', 'slow-2g'].includes(conn.effectiveType));
  const states = new Map();

  function pick(slot, key) {
    const variant = isMobile.matches && slot.dataset[`device${key}Mobile`];
    return variant || slot.dataset[`device${key}`] || '';
  }

  function update(state) {
    const { slot, video, poster } = state;
    if (state.visible && !poster.src) {
      poster.src = pick(slot, 'Poster');
      video.poster = poster.src;
    }
    if (!state.visible || reduceMotion.matches || slowConn() || document.hidden || state.failed) {
      video.pause();
      return;
    }
    if (!video.hasAttribute('src')) video.src = pick(slot, 'Video');
    video.play().catch(() => {});
  }

  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      const state = states.get(entry.target);
      state.visible = entry.isIntersecting;
      update(state);
    }
  }, { rootMargin: '300px' });

  document.querySelectorAll('.device-screen[data-device-video]').forEach(slot => {
    const video = document.createElement('video');
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = 'none';
    video.disablePictureInPicture = true;
    video.setAttribute('aria-hidden', 'true');
    const poster = document.createElement('img');
    poster.className = 'device-video-poster';
    poster.alt = '';
    poster.decoding = 'async';
    poster.setAttribute('aria-hidden', 'true');
    const state = { slot, video, poster, visible: false, failed: false };
    video.addEventListener('playing', () => slot.classList.add('device-screen--playing'));
    video.addEventListener('error', () => {
      state.failed = true;
      slot.classList.remove('device-screen--playing');
    });
    slot.append(video, poster);
    states.set(slot, state);
    observer.observe(slot);
  });

  const refresh = () => states.forEach(update);
  reduceMotion.addEventListener('change', refresh);
  document.addEventListener('visibilitychange', refresh);

  // Mokker (#90): escala o palco (.mk__stage) para o tamanho renderizado do .mk.
  const mkScale = new ResizeObserver((entries) => {
    for (const { target, contentRect } of entries) {
      const w = parseFloat(getComputedStyle(target).getPropertyValue('--w'));
      target.style.setProperty('--k', contentRect.width / w);
    }
  });
  document.querySelectorAll('.mk').forEach((mk) => mkScale.observe(mk));
})();

/* Vídeo opcional por tela; a captura continua disponível como fallback. */
(() => {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const states = new Map();

  function update(state) {
    const { slot, video } = state;
    if (!state.visible || motion.matches || document.hidden || state.failed) {
      video.pause();
      slot.classList.remove('device-screen--playing');
      return;
    }
    if (!video.hasAttribute('src')) video.src = slot.dataset.deviceVideo;
    video.play().catch(() => slot.classList.remove('device-screen--playing'));
  }

  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      const state = states.get(entry.target);
      state.visible = entry.isIntersecting;
      update(state);
    }
  });

  document.querySelectorAll('.device-screen[data-device-video]').forEach(slot => {
    if (!slot.dataset.deviceVideo.trim()) return;
    const video = document.createElement('video');
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = 'none';
    video.setAttribute('aria-hidden', 'true');
    const state = { slot, video, visible: false, failed: false };
    video.addEventListener('playing', () => {
      if (state.visible && !motion.matches && !document.hidden) {
        slot.classList.add('device-screen--playing');
      }
    });
    video.addEventListener('error', () => {
      state.failed = true;
      slot.classList.remove('device-screen--playing');
    });
    slot.append(video);
    states.set(slot, state);
    observer.observe(slot);
  });

  const refresh = () => states.forEach(update);
  motion.addEventListener('change', refresh);
  document.addEventListener('visibilitychange', refresh);
})();

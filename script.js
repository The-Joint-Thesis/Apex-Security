/* Apex Security · script.js */

// SO YOU'RE HERE!

// Nav scroll state
const nav = document.getElementById('nav');
if (nav) window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

// Mobile menu
const tog = document.getElementById('tog');
const mob = document.getElementById('mob');
if (tog && mob) {
  tog.addEventListener('click', () => {
    const open = mob.classList.toggle('open');
    tog.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mob.classList.remove('open');
    tog.classList.remove('open');
    document.body.style.overflow = '';
  }));
}


// Stat counters
document.querySelectorAll('[data-target]').forEach(el => {
  const cio = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return;
    const target = parseFloat(el.dataset.target);
    const dec = parseInt(el.dataset.dec || '0');
    const t0 = performance.now();
    (function tick(now) {
      const p = Math.min((now - t0) / 1200, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      el.textContent = dec ? (ease * target).toFixed(dec) : Math.round(ease * target);
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
    cio.disconnect();
  }, { threshold: 0.5 });
  cio.observe(el);
});

// Footer year
document.querySelectorAll('#yr').forEach(el => el.textContent = new Date().getFullYear());



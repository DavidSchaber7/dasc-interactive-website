/* ============ YEAR ============ */
document.getElementById('year').textContent = new Date().getFullYear();

/* ============ NAV SCROLL + MOBILE ============ */
const nav = document.getElementById('nav');
const toggle = document.getElementById('nav-toggle');
const links = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
  const p = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  document.getElementById('scroll-progress').style.width = p + '%';
}, { passive: true });

toggle.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.classList.toggle('open', open);
  toggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
});
links.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => { links.classList.remove('open'); toggle.classList.remove('open'); })
);

/* ============ ACTIVE NAV LINK ============ */
const sections = ['products', 'services', 'studio', 'contact'].map(id => document.getElementById(id));
const navMap = {};
links.querySelectorAll('a').forEach(a => { navMap[a.getAttribute('href').slice(1)] = a; });
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      Object.values(navMap).forEach(a => a.classList.remove('active'));
      navMap[e.target.id]?.classList.add('active');
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(s => s && navObserver.observe(s));

/* ============ REVEAL ON SCROLL ============ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), (i % 4) * 80);
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ============ STAT COUNTERS ============ */
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = +el.dataset.target;
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    let cur = 0;
    const step = Math.max(1, Math.ceil(target / 40));
    const tick = () => {
      cur = Math.min(target, cur + step);
      el.innerHTML = prefix + cur + suffix;
      if (cur < target) requestAnimationFrame(tick);
    };
    tick();
    statObserver.unobserve(el);
  });
}, { threshold: 0.6 });
document.querySelectorAll('.stat-num').forEach(el => statObserver.observe(el));

/* ============ CURSOR GLOW (desktop only) ============ */
const glow = document.querySelector('.cursor-glow');
const fine = window.matchMedia('(pointer: fine)').matches;
if (fine) {
  let gx = 0, gy = 0, cx = 0, cy = 0;
  window.addEventListener('mousemove', (e) => { gx = e.clientX; gy = e.clientY; glow.style.opacity = '1'; });
  (function follow() {
    cx += (gx - cx) * 0.12; cy += (gy - cy) * 0.12;
    glow.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
    requestAnimationFrame(follow);
  })();
}

/* ============ CARD TILT + SHINE ============ */
if (fine) {
  document.querySelectorAll('.tilt').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      card.style.transform = `perspective(900px) rotateY(${(px - 0.5) * 8}deg) rotateX(${(0.5 - py) * 8}deg) translateY(-6px)`;
      card.style.setProperty('--mx', px * 100 + '%');
      card.style.setProperty('--my', py * 100 + '%');
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}

/* ============ MAGNETIC BUTTONS ============ */
if (fine) {
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });
}

/* ============ PARTICLE / CONSTELLATION BACKGROUND ============ */
(function particles() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let w, h, dpr, pts = [];
  const COUNT = window.innerWidth < 700 ? 38 : 70;
  const mouse = { x: -9999, y: -9999 };

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.width = innerWidth * dpr;
    h = canvas.height = innerHeight * dpr;
    canvas.style.width = innerWidth + 'px';
    canvas.style.height = innerHeight + 'px';
  }
  function init() {
    pts = Array.from({ length: COUNT }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.28 * dpr,
      vy: (Math.random() - 0.5) * 0.28 * dpr,
      r: (Math.random() * 1.6 + 0.6) * dpr,
    }));
  }
  window.addEventListener('mousemove', e => { mouse.x = e.clientX * dpr; mouse.y = e.clientY * dpr; });
  window.addEventListener('mouseout', () => { mouse.x = -9999; mouse.y = -9999; });

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const LINK = 130 * dpr;
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;

      // mouse repel
      const mdx = p.x - mouse.x, mdy = p.y - mouse.y;
      const md = Math.hypot(mdx, mdy);
      if (md < 120 * dpr) { p.x += (mdx / md) * 1.4; p.y += (mdy / md) * 1.4; }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(34,211,238,0.7)';
      ctx.fill();

      for (let j = i + 1; j < pts.length; j++) {
        const q = pts[j];
        const d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < LINK) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
          const a = (1 - d / LINK) * 0.22;
          ctx.strokeStyle = `rgba(140,120,250,${a})`;
          ctx.lineWidth = dpr * 0.6;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  resize(); init(); draw();
  let t;
  window.addEventListener('resize', () => { clearTimeout(t); t = setTimeout(() => { resize(); init(); }, 200); });
})();

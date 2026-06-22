/* year */
document.getElementById('year').textContent = new Date().getFullYear();

/* nav scrolled state */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* mobile menu */
const toggle = document.getElementById('nav-toggle');
const links = document.getElementById('nav-links');
toggle.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  toggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
});
links.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    links.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  })
);

/* active nav link */
const navMap = {};
links.querySelectorAll('a').forEach(a => {
  const id = a.getAttribute('href').slice(1);
  if (id) navMap[id] = a;
});
const sectionEls = Object.keys(navMap).map(id => document.getElementById(id)).filter(Boolean);
const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      Object.values(navMap).forEach(a => a.classList.remove('active'));
      navMap[e.target.id]?.classList.add('active');
    }
  });
}, { rootMargin: '-50% 0px -48% 0px' });
sectionEls.forEach(s => activeObserver.observe(s));

/* subtle reveal on scroll */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

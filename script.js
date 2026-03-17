/* ===== NAVBAR SCROLL ===== */
const navbar  = document.getElementById('navbar');
const navLinks = document.getElementById('navLinks');
const hamburger = document.getElementById('hamburger');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ===== SMOOTH ACTIVE NAV ===== */
const sections = document.querySelectorAll('section[id]');
const navItems  = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));

/* ===== COUNTER ANIMATION ===== */
function animateCounter(el) {
  const target = +el.dataset.target;
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current).toLocaleString('pt-PT');
  }, 16);
}

const statsSection = document.querySelector('.stats');
let countersStarted = false;

const statsObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !countersStarted) {
    countersStarted = true;
    document.querySelectorAll('.stat-num[data-target]').forEach(animateCounter);
  }
}, { threshold: 0.4 });

if (statsSection) statsObserver.observe(statsSection);

/* ===== REVEAL ON SCROLL ===== */
const revealEls = document.querySelectorAll(
  '.sobre-text, .sobre-imgs, .prov-card, .parceria-text, ' +
  '.parceria-img-wrap, .contact-info, .contact-form, ' +
  '.proj-card, .section-header'
);

revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

/* ===== CONTACT FORM ===== */
const form        = document.getElementById('contactForm');
const successMsg  = document.getElementById('formSuccess');

const isEN = document.documentElement.lang === 'en';

form.addEventListener('submit', e => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = isEN ? 'Sending…' : 'A enviar…';
  btn.disabled = true;

  setTimeout(() => {
    form.reset();
    btn.textContent = isEN ? 'Send Message' : 'Enviar Mensagem';
    btn.disabled = false;
    successMsg.style.display = 'block';
    setTimeout(() => (successMsg.style.display = 'none'), 5000);
  }, 1200);
});

/* ===== HERO PARALLAX ===== */
const heroBg = document.querySelector('.hero-bg');
window.addEventListener('scroll', () => {
  if (!heroBg) return;
  const scrolled = window.scrollY;
  if (scrolled < window.innerHeight) {
    heroBg.style.transform = `scale(1.05) translateY(${scrolled * 0.25}px)`;
  }
}, { passive: true });

/* ===== CARD TILT (subtle) ===== */
document.querySelectorAll('.proj-card, .prov-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect   = card.getBoundingClientRect();
    const x      = (e.clientX - rect.left) / rect.width  - 0.5;
    const y      = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform .4s ease';
  });
});

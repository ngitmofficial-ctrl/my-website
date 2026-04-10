/* ===========================
   NEXTGEN — script.js
   =========================== */

"use strict";

// ── Navbar scroll effect ──────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ── Mobile hamburger menu ─────────────────────────────────────
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  hamburger.textContent = mobileMenu.classList.contains('open') ? '✕' : '☰';
});

// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.textContent = '☰';
  });
});

// ── Particle generator ────────────────────────────────────────
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  for (let i = 0; i < 40; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    p.style.left     = Math.random() * 100 + 'vw';
    p.style.top      = Math.random() * 100 + 'vh';
    p.style.width    = (Math.random() * 3 + 1.5) + 'px';
    p.style.height   = p.style.width;
    p.style.opacity  = Math.random() * 0.6 + 0.1;
    p.style.animationDuration = (Math.random() * 12 + 8) + 's';
    p.style.animationDelay   = (Math.random() * 8) + 's';
    // Random blue/purple hues
    const hue = Math.random() > 0.5 ? '195' : '265';
    p.style.background = `hsl(${hue}, 100%, 65%)`;
    container.appendChild(p);
  }
}
createParticles();

// ── Scroll reveal ─────────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

// ── Counter animation ─────────────────────────────────────────
function animateCount(el, target, duration = 1800) {
  let start     = 0;
  const step    = target / (duration / 16);
  const timer   = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start);
    }
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.stat-num').forEach(el => {
        animateCount(el, parseInt(el.dataset.target));
      });
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ── Active nav link highlighting ──────────────────────────────
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));

// ── Contact form feedback ─────────────────────────────────────
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = '✅ Message Sent!';
    btn.style.background = 'linear-gradient(135deg,#00c853,#00897b)';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      btn.disabled = false;
      contactForm.reset();
    }, 3000);
  });
}

// ── Course cards — staggered entrance ────────────────────────
const courseCards = document.querySelectorAll('.course-card');
const courseObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, parseInt(delay));
    }
  });
}, { threshold: 0.1 });

courseCards.forEach(card => courseObserver.observe(card));

// ── Smooth scroll for anchor links ────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── Dynamic year in footer ────────────────────────────────────
const yearEl = document.querySelector('.footer-copy');
if (yearEl) {
  yearEl.textContent = yearEl.textContent.replace('2025', new Date().getFullYear());
}
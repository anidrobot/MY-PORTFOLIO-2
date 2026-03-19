/* ══════════════════════════════════════════════
   ANIDRO PAUL — PORTFOLIO SCRIPT
══════════════════════════════════════════════ */

'use strict';

// ── Loader ──────────────────────────────────
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => loader.classList.add('hidden'), 1800);
});

// ── Custom Cursor ────────────────────────────
const dot  = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');

if (dot && ring && window.matchMedia('(pointer:fine)').matches) {
  let mx = 0, my = 0, rx = 0, ry = 0;
  // Use transform for pixel-perfect positioning (no offset bias)
  window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  const animateCursor = () => {
    // Dot: instant snap
    dot.style.transform  = `translate(${mx - 4}px, ${my - 4}px)`;
    // Ring: smooth lag
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
    requestAnimationFrame(animateCursor);
  };
  animateCursor();
  document.querySelectorAll('a,button,.cert-card,.project-card,.skill-chip').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });
} else {
  // Hide cursors on touch/mobile
  if (dot)  dot.style.display  = 'none';
  if (ring) ring.style.display = 'none';
}

// ── Navbar: scroll style + active link ──────
const navbar  = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const onScroll = () => {
  const scrollY = window.scrollY;
  // Sticky style
  navbar.classList.toggle('scrolled', scrollY > 40);
  // Scroll-to-top button
  document.getElementById('scrollTop').classList.toggle('visible', scrollY > 400);
  // Active section highlight
  sections.forEach(sec => {
    const top    = sec.offsetTop - 120;
    const bottom = top + sec.offsetHeight;
    if (scrollY >= top && scrollY < bottom) {
      navLinks.forEach(l => l.classList.remove('active'));
      document.querySelector(`.nav-link[href="#${sec.id}"]`)?.classList.add('active');
    }
  });
};
window.addEventListener('scroll', onScroll, { passive: true });

// ── Hamburger ────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('open');
  document.body.classList.toggle('no-scroll');
});
navMenu.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
    document.body.classList.remove('no-scroll');
  });
});

// ── Scroll to top ────────────────────────────
document.getElementById('scrollTop').addEventListener('click', () =>
  window.scrollTo({ top: 0, behavior: 'smooth' })
);

// ── Hero Particle Canvas ─────────────────────
(function initCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  const resize = () => {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  };
  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.r  = Math.random() * 1.5 + 0.3;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.a  = Math.random() * 0.5 + 0.1;
      this.color = Math.random() > 0.5 ? '#06b6d4' : '#67e8f9';
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.a;
      ctx.fill();
    }
  }

  for (let i = 0; i < 120; i++) particles.push(new Particle());

  // Connect nearby particles
  const drawConnections = () => {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 90) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = '#06b6d4';
          ctx.globalAlpha = (1 - dist / 90) * 0.12;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  };

  const animate = () => {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    requestAnimationFrame(animate);
  };
  animate();
})();

// ── Typed Effect ─────────────────────────────
(function typeWriter() {
  const el = document.getElementById('typedText');
  if (!el) return;
  const roles = ['Developer', 'Researcher', 'Innovator', 'Problem Solver', 'Tech Enthusiast'];
  let rIdx = 0, cIdx = 0, deleting = false;
  const type = () => {
    const word = roles[rIdx];
    if (deleting) {
      el.textContent = word.slice(0, --cIdx);
    } else {
      el.textContent = word.slice(0, ++cIdx);
    }
    let delay = deleting ? 60 : 100;
    if (!deleting && cIdx === word.length) { delay = 1800; deleting = true; }
    else if (deleting && cIdx === 0)       { deleting = false; rIdx = (rIdx + 1) % roles.length; delay = 350; }
    setTimeout(type, delay);
  };
  type();
})();

// ── Scroll Reveal ────────────────────────────
const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
revealEls.forEach(el => revealObserver.observe(el));

// ── Animated Bars (skills + interests) ──────
const barEls = document.querySelectorAll('.skill-fill, .bar-fill');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const w  = el.getAttribute('data-width') || 0;
      el.style.width = w + '%';
      barObserver.unobserve(el);
    }
  });
}, { threshold: 0.3 });
barEls.forEach(el => barObserver.observe(el));

// ── Modal ────────────────────────────────────
const overlay   = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalImg  = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalDesc  = document.getElementById('modalDesc');
const modalYear  = document.getElementById('modalYear');

document.querySelectorAll('.cert-card').forEach(card => {
  card.addEventListener('click', () => {
    const img   = card.querySelector('img')?.src || '';
    const title = card.dataset.title || card.querySelector('h3')?.textContent || '';
    const desc  = card.dataset.desc  || card.querySelector('p')?.textContent  || '';
    const year  = card.dataset.year  || '';
    modalImg.src         = img;
    modalImg.alt         = title;
    modalTitle.textContent = title;
    modalDesc.textContent  = desc;
    modalYear.textContent  = year;
    overlay.classList.add('active');
    document.body.classList.add('no-scroll');
  });
});

const closeModal = () => {
  overlay.classList.remove('active');
  document.body.classList.remove('no-scroll');
};
modalClose.addEventListener('click', closeModal);
overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ── Contact Form ─────────────────────────────
const form       = document.getElementById('contactForm');
const submitBtn  = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');

const validate = () => {
  let ok = true;
  const nameEl  = document.getElementById('name');
  const emailEl = document.getElementById('email');
  const msgEl   = document.getElementById('message');
  const nameErr  = document.getElementById('nameError');
  const emailErr = document.getElementById('emailError');
  const msgErr   = document.getElementById('messageError');

  // Reset
  [nameEl, emailEl, msgEl].forEach(el => el.classList.remove('error'));
  [nameErr, emailErr, msgErr].forEach(el => el.textContent = '');

  if (!nameEl.value.trim()) {
    nameErr.textContent = 'Name is required.';
    nameEl.classList.add('error');
    ok = false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailEl.value.trim() || !emailRegex.test(emailEl.value)) {
    emailErr.textContent = 'A valid email address is required.';
    emailEl.classList.add('error');
    ok = false;
  }
  if (msgEl.value.trim().length < 10) {
    msgErr.textContent = 'Message must be at least 10 characters.';
    msgEl.classList.add('error');
    ok = false;
  }
  return ok;
};

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!validate()) return;

  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending…';

  // ── EmailJS integration (replace with your own IDs) ──
  // emailjs.send('SERVICE_ID', 'TEMPLATE_ID', {
  //   from_name: document.getElementById('name').value,
  //   from_email: document.getElementById('email').value,
  //   message: document.getElementById('message').value,
  // })
  // .then(() => showSuccess())
  // .catch(() => { submitBtn.disabled = false; submitBtn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>'; });

  // Simulated send for now
  await new Promise(r => setTimeout(r, 1600));
  form.reset();
  formSuccess.classList.add('show');
  submitBtn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
  submitBtn.disabled = false;
  setTimeout(() => formSuccess.classList.remove('show'), 5000);
});

// ── Footer year ──────────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();

// ── Smooth scroll for all anchor links ───────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── Lazy image loading fallback ───────────────
document.querySelectorAll('img[loading="lazy"]').forEach(img => {
  if ('loading' in HTMLImageElement.prototype) return; // native support
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.src = entry.target.dataset.src || entry.target.src;
        observer.unobserve(entry.target);
      }
    });
  });
  observer.observe(img);
});
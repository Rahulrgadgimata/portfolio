/* =============================================
   ANTIGRAVITY PORTFOLIO — Confetti Particle JS
   ============================================= */

// ================ CONFETTI PARTICLES (Google Colors) ================
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = document.documentElement.scrollHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const GOOGLE_COLORS = ['#4285f4','#ea4335','#fbbc04','#34a853','#fa7b17','#f538a0'];

class Confetti {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 6 + 3;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotSpeed = (Math.random() - 0.5) * 0.02;
    this.opacity = Math.random() * 0.5 + 0.15;
    this.color = GOOGLE_COLORS[Math.floor(Math.random() * GOOGLE_COLORS.length)];
    this.shape = Math.random() > 0.5 ? 'dash' : 'dot';
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.rotation += this.rotSpeed;
    if (this.x < -20) this.x = canvas.width + 20;
    if (this.x > canvas.width + 20) this.x = -20;
    if (this.y < -20) this.y = canvas.height + 20;
    if (this.y > canvas.height + 20) this.y = -20;
  }
  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    if (this.shape === 'dash') {
      ctx.beginPath();
      ctx.roundRect(-this.size, -1.5, this.size * 2, 3, 1.5);
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.arc(0, 0, this.size * 0.4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
}

function initParticles() {
  const count = Math.min(Math.floor((canvas.width * canvas.height) / 18000), 100);
  particles = [];
  for (let i = 0; i < count; i++) particles.push(new Confetti());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animate);
}

initParticles();
animate();
window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });

// Resize canvas on scroll to cover full page
let scrollTimeout;
window.addEventListener('scroll', () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(resizeCanvas, 200);
});

// ================ TYPING EFFECT ================
const typedEl = document.getElementById('typedText');
const phrases = [
  'Co-Founder & CTO @ Stack Education',
  'AI/ML Engineer & Full-Stack Developer',
  '4x Hackathon Winner',
  'Building the Future with Generative AI',
  'General Secretary @ GM University',
];
let pi = 0, ci = 0, deleting = false;

function typeEffect() {
  const cur = phrases[pi];
  if (deleting) {
    typedEl.textContent = cur.substring(0, ci--);
    if (ci < 0) { deleting = false; pi = (pi + 1) % phrases.length; setTimeout(typeEffect, 400); return; }
    setTimeout(typeEffect, 30);
  } else {
    typedEl.textContent = cur.substring(0, ci++);
    if (ci > cur.length) { deleting = true; setTimeout(typeEffect, 2000); return; }
    setTimeout(typeEffect, 55);
  }
}
typeEffect();

// ================ NAVBAR ================
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section, .hero');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 150) current = s.id; });
  navLinks.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === `#${current}`);
  });
});

// ================ MOBILE NAV ================
const navToggle = document.getElementById('navToggle');
const navLinksContainer = document.getElementById('navLinks');
navToggle.addEventListener('click', () => navLinksContainer.classList.toggle('open'));
navLinksContainer.querySelectorAll('.nav-link').forEach(l =>
  l.addEventListener('click', () => navLinksContainer.classList.remove('open'))
);

// ================ COUNTERS ================
function animateCounters() {
  document.querySelectorAll('.stat-num[data-target]').forEach(counter => {
    const target = parseInt(counter.dataset.target);
    let current = 0;
    const step = target / 120;
    const update = () => {
      current += step;
      if (current < target) { counter.textContent = Math.floor(current); requestAnimationFrame(update); }
      else counter.textContent = target;
    };
    update();
  });
}

// ================ SCROLL ANIMATIONS ================
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      if (e.target.id === 'hero') animateCounters();
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));
const hero = document.getElementById('hero');
if (hero) observer.observe(hero);

// ================ SMOOTH SCROLL ================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

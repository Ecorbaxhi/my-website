// ===== Hero Dotted Dome / Leaf Background =====
(function initHeroCanvas() {
  const canvas = document.getElementById("heroCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const hero = canvas.parentElement;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const DOT_RGB = "74, 196, 150";
  const CORAL = "#e2725b";
  const flowSeed = Math.random() * 1000;
  let width, height, dpr;
  let grid = [];
  let bump;
  let leaves = [];

  // dome center sits toward the top-right, like a hill rising out of the frame
  function buildScene() {
    const spacing = Math.max(14, Math.min(22, width / 45));
    grid = [];
    for (let y = -spacing; y <= height + spacing; y += spacing) {
      const row = [];
      for (let x = -spacing; x <= width + spacing; x += spacing) {
        row.push({ x, y });
      }
      grid.push(row);
    }

    bump = {
      cx: width * 0.72,
      cy: height * 0.4,
      radius: Math.max(width, height) * 0.62,
      height: Math.min(width, height) * 0.28,
    };

    const rand = (min, max) => min + Math.random() * (max - min);
    leaves = Array.from({ length: 16 }, () => {
      const angle = rand(0, Math.PI * 2);
      const dist = rand(0, bump.radius * 0.85);
      return {
        x: bump.cx + Math.cos(angle) * dist,
        y: bump.cy + Math.sin(angle) * dist * 0.6,
        size: rand(3, 7),
        rot: rand(0, Math.PI * 2),
      };
    });
  }

  function resize() {
    dpr = window.devicePixelRatio || 1;
    width = hero.clientWidth;
    height = hero.clientHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildScene();
  }

  // pulls points upward near the dome center so rows read as curved contour lines
  function falloffAt(x, y) {
    const dx = x - bump.cx;
    const dy = y - bump.cy;
    const dist = Math.sqrt(dx * dx + dy * dy * 2.2);
    return { dist, falloff: Math.exp(-(dist * dist) / (2 * bump.radius * bump.radius)) };
  }

  function displacedY(x, y, t, falloff, dist) {
    const pulse = 1 + 0.04 * Math.sin(t * 0.0006 + dist * 0.01);
    return y - bump.height * falloff * pulse;
  }

  function drawLeaf(x, y, size, rot) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.fillStyle = CORAL;
    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.quadraticCurveTo(size * 0.9, -size * 0.2, 0, size);
    ctx.quadraticCurveTo(-size * 0.9, -size * 0.2, 0, -size);
    ctx.fill();
    ctx.restore();
  }

  function draw(t) {
    ctx.clearRect(0, 0, width, height);

    for (const row of grid) {
      for (const p of row) {
        const { dist, falloff } = falloffAt(p.x, p.y);
        if (falloff < 0.03) continue;
        const y = displacedY(p.x, p.y, t, falloff, dist);
        const alpha = 0.08 + falloff * 0.55;
        const r = 0.6 + falloff * 1.4;
        ctx.fillStyle = `rgba(${DOT_RGB}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // bright flowing line threading across the dome
    ctx.beginPath();
    const steps = 60;
    for (let i = 0; i <= steps; i++) {
      const x = width * 1.1 * (i / steps) - width * 0.05;
      const baseY = bump.cy + bump.radius * 0.05;
      const { dist, falloff } = falloffAt(x, baseY);
      const y = displacedY(x, baseY, t, falloff, dist) + Math.sin(i * 0.35 + t * 0.0008 + flowSeed) * 14;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = "rgba(243, 241, 234, 0.55)";
    ctx.lineWidth = 1.4;
    ctx.stroke();

    for (const leaf of leaves) {
      const { dist, falloff } = falloffAt(leaf.x, leaf.y);
      const y = displacedY(leaf.x, leaf.y, t, falloff, dist);
      drawLeaf(leaf.x, y, leaf.size, leaf.rot);
    }

    if (!prefersReducedMotion) requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener("resize", resize);
  requestAnimationFrame(draw);
})();

// ===== Mobile Navigation Toggle =====
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  navToggle.classList.toggle("active");
  const expanded = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!expanded));
});

// Close mobile menu when a link is clicked
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    navToggle.classList.remove("active");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// ===== Active Nav Link on Scroll =====
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function setActiveLink() {
  const scrollY = window.scrollY + 120;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");
    const link = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (link && scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    }
  });
}

// ===== Navbar Shadow on Scroll =====
const navbar = document.getElementById("navbar");

function toggleNavbarShadow() {
  if (window.scrollY > 10) {
    navbar.style.boxShadow = "0 2px 15px rgba(0, 0, 0, 0.1)";
  } else {
    navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.05)";
  }
}

// ===== Back to Top Button =====
const backToTop = document.getElementById("backToTop");

function toggleBackToTop() {
  if (window.scrollY > 400) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
}

window.addEventListener("scroll", () => {
  setActiveLink();
  toggleNavbarShadow();
  toggleBackToTop();
});

// ===== Scroll Reveal Animations =====
const faders = document.querySelectorAll(".fade-in");

const appearOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -60px 0px",
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach((fader) => appearOnScroll.observe(fader));

// ===== Animate Skill Bars When Visible =====
const skillCards = document.querySelectorAll(".skill-card");

const skillObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const fill = entry.target.querySelector(".skill-fill");
    if (fill) fill.style.width = fill.style.width || fill.getAttribute("data-width");
    observer.unobserve(entry.target);
  });
}, { threshold: 0.3 });

skillCards.forEach((card) => skillObserver.observe(card));

// ===== Footer Year =====
document.getElementById("year").textContent = new Date().getFullYear();

// Initialize on load
setActiveLink();
toggleNavbarShadow();
toggleBackToTop();

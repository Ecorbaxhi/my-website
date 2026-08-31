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

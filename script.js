const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav-links");

if (menuBtn && nav) {
  const setMenuOpen = (open, restoreFocus = false) => {
    nav.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    if (restoreFocus) menuBtn.focus();
  };

  menuBtn.addEventListener("click", () => {
    setMenuOpen(!nav.classList.contains("open"));
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      const restoreFocus = nav.classList.contains("open") && nav.contains(document.activeElement);
      setMenuOpen(false, restoreFocus);
    });
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && nav.classList.contains("open")) {
      setMenuOpen(false, nav.contains(document.activeElement));
    }
  });
}

// Content stays visible unless a supported observer starts a finite animation.
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
}

const header = document.querySelector(".site-header");
window.addEventListener("scroll", () => {
  if (header) {
    header.style.background = window.scrollY > 40
      ? "rgba(5,7,10,.93)"
      : "rgba(5,7,10,.72)";
  }
});

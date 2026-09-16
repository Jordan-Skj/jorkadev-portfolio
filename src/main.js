const navbar = document.querySelector("#navbar");
const menuButton = document.querySelector("#menu-button");
const mobileMenu = document.querySelector("#mobile-menu");
const menuIcon = document.querySelector("#menu-icon");
const closeIcon = document.querySelector("#close-icon");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id]");

function updateNavbar() {
  const hasScrolled = window.scrollY > 20;

  navbar.classList.toggle("navbar-scrolled", hasScrolled);
}

function openMenu() {
  mobileMenu.classList.remove("hidden");
  menuIcon.classList.add("hidden");
  closeIcon.classList.remove("hidden");

  menuButton.setAttribute("aria-expanded", "true");
  menuButton.setAttribute("aria-label", "Fermer le menu");
}

function closeMenu() {
  mobileMenu.classList.add("hidden");
  menuIcon.classList.remove("hidden");
  closeIcon.classList.add("hidden");

  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Ouvrir le menu");
}

function toggleMenu() {
  const isClosed = mobileMenu.classList.contains("hidden");

  if (isClosed) {
    openMenu();
  } else {
    closeMenu();
  }
}

function updateActiveLink() {
  const scrollPosition = window.scrollY + 160;
  let currentSectionId = "accueil";

  sections.forEach((section) => {
    if (scrollPosition >= section.offsetTop) {
      currentSectionId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const linkTarget = link.getAttribute("href");

    link.classList.toggle(
      "active",
      linkTarget === `#${currentSectionId}`,
    );
  });
}

menuButton.addEventListener("click", toggleMenu);

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    closeMenu();
  }
});

window.addEventListener(
  "scroll",
  () => {
    updateNavbar();
    updateActiveLink();
  },
  { passive: true },
);

updateNavbar();
updateActiveLink();
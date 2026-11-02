"use strict";

const navbar = document.querySelector("#navbar");
const menuButton = document.querySelector("#menu-button");
const mobileMenu = document.querySelector("#mobile-menu");
const menuIcon = menuButton?.querySelector("[data-menu-icon]");
const closeIcon = menuButton?.querySelector("[data-close-icon]");
const scrollProgress = document.querySelector("#scroll-progress");
const navLinks = [...document.querySelectorAll("[data-nav-link]")];

/* ---------- Menu mobile ---------- */

function setMenuState(isOpen) {
    if (!menuButton || !mobileMenu) return;

    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
    mobileMenu.hidden = !isOpen;
    document.body.classList.toggle("menu-open", isOpen);

    menuIcon?.classList.toggle("hidden", isOpen);
    closeIcon?.classList.toggle("hidden", !isOpen);
}

menuButton?.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    setMenuState(!isOpen);
});

navLinks.forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenuState(false);
});

/* ---------- Scroll : barre de progression + navbar ---------- */

let maxScroll = 0;
let ticking = false;

function measure() {
    maxScroll = document.documentElement.scrollHeight - window.innerHeight;
}

function updateScrollInterface() {
    const scrollTop = window.scrollY;

    navbar?.classList.toggle("nav-scrolled", scrollTop > 20);

    if (scrollProgress) {
        const progress = maxScroll > 0 ? Math.min(scrollTop / maxScroll, 1) : 0;
        scrollProgress.style.transform = `scaleX(${progress})`;
    }

    ticking = false;
}

function requestScrollUpdate() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateScrollInterface);
}

measure();
updateScrollInterface();

window.addEventListener("scroll", requestScrollUpdate, { passive: true });

window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) setMenuState(false);
    measure();
    requestScrollUpdate();
});

if ("ResizeObserver" in window) {
    new ResizeObserver(() => {
        measure();
        requestScrollUpdate();
    }).observe(document.body);
}

/* ---------- Navigation active selon la section ---------- */

const sections = [...document.querySelectorAll("[data-section][id]")];

function activateNavigation(sectionId) {
    navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${sectionId}`;
        link.classList.toggle("is-active", isActive);

        if (isActive) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            const visibleSection = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

            if (visibleSection) activateNavigation(visibleSection.target.id);
        },
        { rootMargin: "-25% 0px -58%", threshold: [0.05, 0.2, 0.5] }
    );

    sections.forEach((section) => sectionObserver.observe(section));
} else {
    activateNavigation("accueil");
}

/* ---------- FAQ : un seul élément ouvert ---------- */

document.querySelectorAll("[data-accordion]").forEach((accordion) => {
    const items = [...accordion.querySelectorAll("details")];

    items.forEach((item) => {
        item.addEventListener("toggle", () => {
            if (!item.open) return;
            items.forEach((otherItem) => {
                if (otherItem !== item) otherItem.open = false;
            });
        });
    });
});

/* ---------- Images de projets : repli si l'image échoue ---------- */

function showProjectFallback(image) {
    image.hidden = true;
    const fallback = image.parentElement?.querySelector("[data-project-fallback]");
    if (fallback) fallback.hidden = false;
}

document.querySelectorAll("[data-project-image]").forEach((image) => {
    image.addEventListener("error", () => showProjectFallback(image), { once: true });

    if (image.complete && image.naturalWidth === 0) {
        showProjectFallback(image);
    }
});

/* ---------- Année du pied de page ---------- */

document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
});
"use strict";

const navbar = document.querySelector("#navbar");
const menuButton = document.querySelector("#menu-button");
const mobileMenu = document.querySelector("#mobile-menu");
const menuLabel = menuButton?.querySelector("[data-menu-label]");
const menuIcon = menuButton?.querySelector("[data-menu-icon]");
const closeIcon = menuButton?.querySelector("[data-close-icon]");
const scrollProgress = document.querySelector("#scroll-progress");
const navLinks = [...document.querySelectorAll("[data-nav-link]")];

function setMenuState(isOpen) {
    if (!menuButton || !mobileMenu) return;

    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
    mobileMenu.hidden = !isOpen;
    document.body.classList.toggle("menu-open", isOpen);

    menuIcon?.classList.toggle("hidden", isOpen);
    closeIcon?.classList.toggle("hidden", !isOpen);

    if (menuLabel) menuLabel.textContent = isOpen ? "Fermer le menu" : "Ouvrir le menu";
}

menuButton?.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    setMenuState(!isOpen);
});

navLinks.forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
});

window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) setMenuState(false);
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenuState(false);
});

function updateScrollInterface() {
    const scrollTop = window.scrollY;
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;

    navbar?.classList.toggle("nav-scrolled", scrollTop > 20);

    if (scrollProgress) {
        scrollProgress.style.width = `${Math.min(progress, 100)}%`;
    }
}

updateScrollInterface();
window.addEventListener("scroll", updateScrollInterface, { passive: true });

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealElements = [...document.querySelectorAll("[data-reveal]")];

revealElements.forEach((element) => {
    const delay = Number(element.dataset.revealDelay || 0);
    element.style.transitionDelay = `${delay}ms`;
});

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
} else {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        },
        { threshold: 0.14, rootMargin: "0px 0px -45px" }
    );

    revealElements.forEach((element) => revealObserver.observe(element));
}

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

document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
});

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const primaryNav = document.getElementById("primaryNav");

function closeMenu() {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    primaryNav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
}

menuToggle.addEventListener("click", function () {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
    primaryNav.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
});

primaryNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeMenu();
});

window.addEventListener("resize", function () {
    if (window.innerWidth > 800) closeMenu();
});

// Filter internship cards by domain
const filterButtons = document.querySelectorAll(".filter-chip");
const programCards = document.querySelectorAll(".program-card");
const filterEmpty = document.getElementById("filterEmpty");

filterButtons.forEach(button => {
    button.addEventListener("click", function () {
        const selectedFilter = button.dataset.filter;

        filterButtons.forEach(chip => {
            const selected = chip === button;
            chip.classList.toggle("active", selected);
            chip.setAttribute("aria-pressed", String(selected));
        });

        let visibleCount = 0;
        programCards.forEach(card => {
            const matches = selectedFilter === "all" || card.dataset.category === selectedFilter;
            card.hidden = !matches;
            if (matches) visibleCount++;
        });
        filterEmpty.hidden = visibleCount !== 0;
    });
});

// Accessible FAQ accordion; only one item stays open at a time
const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(question => {
    question.addEventListener("click", function () {
        const isExpanded = question.getAttribute("aria-expanded") === "true";

        faqQuestions.forEach(otherQuestion => {
            otherQuestion.setAttribute("aria-expanded", "false");
            otherQuestion.closest(".faq-item").querySelector(".faq-answer").hidden = true;
        });

        if (!isExpanded) {
            question.setAttribute("aria-expanded", "true");
            question.closest(".faq-item").querySelector(".faq-answer").hidden = false;
        }
    });
});

// Reveal content as it enters the viewport, with a reduced-motion fallback
const revealElements = document.querySelectorAll(".reveal");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window && !reduceMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealElements.forEach(element => revealObserver.observe(element));
} else {
    revealElements.forEach(element => element.classList.add("is-visible"));
}

// Current year in footer
document.getElementById("currentYear").textContent = new Date().getFullYear();

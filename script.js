/* ================= MOBILE NAVIGATION ================= */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navigationLinks = document.querySelectorAll(".nav-links a");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const menuIsOpen = navLinks.classList.toggle("active");

        menuToggle.classList.toggle("active", menuIsOpen);
        menuToggle.setAttribute("aria-expanded", String(menuIsOpen));
    });

    navigationLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}


/* ================= SCROLL ANIMATIONS ================= */

const animatedElements = document.querySelectorAll(
    ".service-card, " +
    ".project-card, " +
    ".about-content, " +
    ".about-card, " +
    ".benefit-card, " +
    ".process-card, " +
    ".testimonial-card, " +
    ".faq-item, " +
    ".cta, " +
    ".contact-content, " +
    ".contact-form"
);

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        (entries, currentObserver) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");

                    currentObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15
        }
    );

    animatedElements.forEach((element) => {
        observer.observe(element);
    });
} else {
    animatedElements.forEach((element) => {
        element.classList.add("show");
    });
}


/* ================= FAQ ACCORDION ================= */

const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach((question) => {
    question.setAttribute("aria-expanded", "false");

    question.addEventListener("click", () => {
        const selectedItem = question.closest(".faq-item");
        const selectedAnswer =
            selectedItem?.querySelector(".faq-answer");

        if (!selectedItem || !selectedAnswer) {
            return;
        }

        const itemIsOpen =
            selectedItem.classList.contains("active");

        document.querySelectorAll(".faq-item").forEach((item) => {
            const itemQuestion =
                item.querySelector(".faq-question");

            const itemAnswer =
                item.querySelector(".faq-answer");

            item.classList.remove("active");

            if (itemQuestion) {
                itemQuestion.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }

            if (itemAnswer) {
                itemAnswer.style.maxHeight = null;
            }
        });

        if (!itemIsOpen) {
            selectedItem.classList.add("active");

            question.setAttribute(
                "aria-expanded",
                "true"
            );

            selectedAnswer.style.maxHeight =
                `${selectedAnswer.scrollHeight}px`;
        }
    });
});


/* ================= CLOSE MOBILE MENU ON RESIZE ================= */

window.addEventListener("resize", () => {
    if (
        window.innerWidth > 700 &&
        menuToggle &&
        navLinks
    ) {
        navLinks.classList.remove("active");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
    }
});
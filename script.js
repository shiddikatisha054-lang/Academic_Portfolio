// ========================================
// TISHA PORTFOLIO - SCRIPT.JS
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    // -----------------------------
    // Mobile Menu
    // -----------------------------
    const menuButton = document.getElementById("menuButton");
    const navLinks = document.getElementById("navLinks");

    if (menuButton && navLinks) {
        menuButton.addEventListener("click", () => {
            navLinks.classList.toggle("mobile-open");
            menuButton.classList.toggle("active");
        });

        // Close menu after clicking a navigation link
        const links = navLinks.querySelectorAll("a");

        links.forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("mobile-open");
                menuButton.classList.remove("active");
            });
        });
    }


    // -----------------------------
    // Navbar Scroll Effect
    // -----------------------------
    const navbar = document.querySelector(".navbar");

    function handleNavbarScroll() {
        if (!navbar) return;

        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", handleNavbarScroll);
    handleNavbarScroll();


    // -----------------------------
    // Smooth Scrolling
    // -----------------------------
    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (e) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                e.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });

    });


    // -----------------------------
    // Active Navigation Link
    // -----------------------------
    const sections = document.querySelectorAll("section[id]");
    const navItems = document.querySelectorAll(".nav-links a");

    function updateActiveNav() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }

        });

        navItems.forEach(item => {

            item.classList.remove("active");

            const href = item.getAttribute("href");

            if (href === `#${currentSection}`) {
                item.classList.add("active");
            }

        });
    }

    window.addEventListener("scroll", updateActiveNav);
    updateActiveNav();


    // -----------------------------
    // Scroll Reveal Animation
    // -----------------------------
    const revealElements = document.querySelectorAll(
        ".section-heading, .about-container, .timeline-item, .tech-category, .other-skill-card, .project-card, .contact-card, .contact-form-wrapper"
    );

    revealElements.forEach(element => {
        element.classList.add("reveal-element");
    });


    const observer = new IntersectionObserver(
        (entries, observerInstance) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show-element");

                    observerInstance.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach(element => {
        observer.observe(element);
    });


    // -----------------------------
    // Contact Form
    // -----------------------------
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {

        contactForm.addEventListener("submit", async function (e) {

            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const subject = document.getElementById("subject").value.trim();
            const message = document.getElementById("message").value.trim();

            // Basic validation
            if (!name || !email || !subject || !message) {
                alert("Please fill in all fields.");
                return;
            }

            // Simple email validation
            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {
                alert("Please enter a valid email address.");
                return;
            }


            // Button
            const submitButton =
                contactForm.querySelector('button[type="submit"]');

            const originalButtonText =
                submitButton ? submitButton.innerHTML : "SEND MESSAGE";

            if (submitButton) {
                submitButton.disabled = true;
                submitButton.innerHTML = "SENDING...";
            }


            // --------------------------------
            // Backend API
            // --------------------------------
            try {

                const response = await fetch(
                    "http://localhost:5000/api/contact",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify({
                            name: name,
                            email: email,
                            subject: subject,
                            message: message
                        })
                    }
                );


                const data = await response.json();


                if (response.ok) {

                    alert(
                        data.message ||
                        "Message sent successfully!"
                    );

                    contactForm.reset();

                } else {

                    alert(
                        data.message ||
                        "Something went wrong. Please try again."
                    );

                }

            } catch (error) {

                console.error(
                    "Contact form error:",
                    error
                );

                alert(
                    "Backend server is not connected yet."
                );

            } finally {

                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalButtonText;
                }

            }

        });

    }


    // -----------------------------
    // Current Year
    // -----------------------------
    const yearElement =
        document.getElementById("current-year");

    if (yearElement) {
        yearElement.textContent =
            new Date().getFullYear();
    }


    // -----------------------------
    // Prevent Empty Project Links
    // -----------------------------
    document.querySelectorAll('.project-card a[href="#"]')
        .forEach(link => {

            link.addEventListener("click", event => {
                event.preventDefault();
            });

        });


    // -----------------------------
    // Console Message
    // -----------------------------
    console.log(
        "%cTISHA PORTFOLIO",
        "font-size: 20px; font-weight: bold;"
    );

    console.log(
        "Ayesha Siddika Tisha | CSE Student"
    );

});
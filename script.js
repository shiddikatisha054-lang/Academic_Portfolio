document.addEventListener("DOMContentLoaded", function () {

    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const nameInput = document.getElementById("name");
            let userName = "Visitor";

            if (nameInput && nameInput.value.trim() !== "") {
                userName = nameInput.value.trim();
            }

            alert(
                "Thank you, " + userName + "!\n\n" +
                "Your message has been submitted successfully."
            );

            contactForm.reset();
        });
    }

    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.forEach(function (item) {
                item.classList.remove("active");
            });

            link.classList.add("active");
        });
    });

    const projectButtons = document.querySelectorAll(".project-btn");

    projectButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const projectName = button.getAttribute("data-project");

            if (projectName) {
                alert(
                    "Project Name: " + projectName + "\n\n" +
                    "More details about this project will be added soon."
                );
            }
        });
    });

    window.addEventListener("scroll", function () {
        const sections = document.querySelectorAll("section");
        let currentSection = "";

        sections.forEach(function (section) {
            const sectionTop = section.offsetTop;

            if (window.scrollY >= sectionTop - 150) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach(function (link) {
            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + currentSection) {
                link.classList.add("active");
            }
        });
    });

});
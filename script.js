console.log("TISHA GAMES JS LOADED");
/* =========================================================
   TISHA — HORROR PORTFOLIO
   JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       WELCOME SCREEN
       ===================================================== */

    const welcomeScreen = document.getElementById("welcomeScreen");

    if (welcomeScreen) {

        setTimeout(() => {
            welcomeScreen.classList.add("welcome-ready");
        }, 800);

        const enterArea = welcomeScreen.querySelector(".enter-text");

        if (enterArea) {
            enterArea.addEventListener("click", () => {

                welcomeScreen.classList.add("hide-welcome");

                setTimeout(() => {
                    document.body.classList.add("portfolio-started");
                }, 900);

            });
        }

        welcomeScreen.addEventListener("click", (e) => {

            if (
                e.target === welcomeScreen ||
                e.target.classList.contains("welcome-arrow")
            ) {

                welcomeScreen.classList.add("hide-welcome");

                setTimeout(() => {
                    document.body.classList.add("portfolio-started");
                }, 900);

            }

        });

    }


    /* =====================================================
       SMOOTH SCROLL
       ===================================================== */

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


    /* =====================================================
       GAME 1 — FIND THE GHOST
       Room 7 is correct
       ===================================================== */

    const roomButtons = document.querySelectorAll(".room-btn");
    const ghostResult = document.getElementById("ghostResult");

    roomButtons.forEach(button => {

        button.addEventListener("click", function () {

            const selectedRoom = Number(this.dataset.room);

            roomButtons.forEach(room => {
                room.disabled = true;
                room.classList.remove("correct-room", "wrong-room");
            });

            if (selectedRoom === 7) {

                this.classList.add("correct-room");

                if (ghostResult) {

                    ghostResult.innerHTML =
                        '👻 <strong>YOU FOUND THE GHOST!</strong><br>' +
                        'Room 7 was the haunted room.';

                    ghostResult.className = "game-result success";

                }

            } else {

                this.classList.add("wrong-room");

                if (ghostResult) {

                    ghostResult.innerHTML =
                        '☠️ <strong>WRONG ROOM...</strong><br>' +
                        'The ghost escaped. Try again.';

                    ghostResult.className = "game-result danger";

                }

                setTimeout(() => {

                    roomButtons.forEach(room => {

                        room.disabled = false;

                        room.classList.remove(
                            "correct-room",
                            "wrong-room"
                        );

                    });

                    if (ghostResult) {

                        ghostResult.innerHTML = "";

                        ghostResult.className = "game-result";

                    }

                }, 1300);

            }

        });

    });


    /* =====================================================
       GAME 2 — CRACK THE CODE
       2, 4, 8, 16, ? = 32
       ===================================================== */

    const codeAnswer = document.getElementById("codeAnswer");
    const codeResult = document.getElementById("codeResult");

    window.checkCode = function () {

        if (!codeAnswer || !codeResult) return;

        const answer = codeAnswer.value.trim();

        if (answer === "32") {

            codeResult.innerHTML =
                '✓ CODE CRACKED — <strong>32</strong> IS CORRECT.';

            codeResult.className = "game-result success";

        } else {

            codeResult.innerHTML =
                "✕ WRONG CODE — THE SYSTEM REMAINS LOCKED.";

            codeResult.className = "game-result danger";

        }

    };


    if (codeAnswer) {

        codeAnswer.addEventListener("keydown", function (e) {

            if (e.key === "Enter") {
                window.checkCode();
            }

        });

    }


    /* =====================================================
       GAME 3 — CSE MEMORY
       16 cards = 8 pairs
       ===================================================== */

    const memoryGrid = document.getElementById("memoryGrid");
    const memoryResult = document.getElementById("memoryResult");

    const memorySymbols = [
        "C",
        "C++",
        "JAVA",
        "HTML",
        "CSS",
        "JS",
        "SQL",
        "AI"
    ];

    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let matchedPairs = 0;


    function shuffle(array) {

        const shuffled = [...array];

        for (let i = shuffled.length - 1; i > 0; i--) {

            const j = Math.floor(Math.random() * (i + 1));

            [shuffled[i], shuffled[j]] =
                [shuffled[j], shuffled[i]];

        }

        return shuffled;

    }


    function createMemoryGame() {

        if (!memoryGrid) return;

        memoryGrid.innerHTML = "";

        firstCard = null;
        secondCard = null;
        lockBoard = false;
        matchedPairs = 0;

        if (memoryResult) {

            memoryResult.innerHTML =
                "Find all 8 matching pairs.";

            memoryResult.className = "game-result";

        }

        const shuffledSymbols =
            shuffle([...memorySymbols, ...memorySymbols]);

        shuffledSymbols.forEach((symbol, index) => {

            const card = document.createElement("button");

            card.className = "memory-card";

            card.dataset.symbol = symbol;
            card.dataset.index = index;

            card.innerHTML = `
                <span class="memory-front">?</span>
                <span class="memory-back">${symbol}</span>
            `;

            card.addEventListener("click", () => {
                flipMemoryCard(card);
            });

            memoryGrid.appendChild(card);

        });

    }


    function flipMemoryCard(card) {

        if (lockBoard) return;
        if (card === firstCard) return;
        if (card.classList.contains("matched")) return;

        card.classList.add("flipped");

        if (!firstCard) {

            firstCard = card;

            return;

        }

        secondCard = card;

        checkMemoryMatch();

    }


    function checkMemoryMatch() {

        if (!firstCard || !secondCard) return;

        const isMatch =
            firstCard.dataset.symbol ===
            secondCard.dataset.symbol;

        if (isMatch) {

            firstCard.classList.add("matched");
            secondCard.classList.add("matched");

            matchedPairs++;

            if (matchedPairs === 8) {

                if (memoryResult) {

                    memoryResult.innerHTML =
                        '🧠 <strong>MEMORY MASTER!</strong><br>' +
                        'You found all 8 pairs.';

                    memoryResult.className =
                        "game-result success";

                }

            }

            resetMemoryTurn();

        } else {

            lockBoard = true;

            setTimeout(() => {

                if (firstCard) {
                    firstCard.classList.remove("flipped");
                }

                if (secondCard) {
                    secondCard.classList.remove("flipped");
                }

                resetMemoryTurn();

            }, 850);

        }

    }


    function resetMemoryTurn() {

        firstCard = null;
        secondCard = null;
        lockBoard = false;

    }


    const memoryModal =
        document.getElementById("memoryGame");

    if (memoryModal) {

        memoryModal.addEventListener(
            "shown.bs.modal",
            createMemoryGame
        );

    } else {

        createMemoryGame();

    }


    /* =====================================================
       GAME 4 — ESCAPE THE BUG
       Catch the moving bug 10 times
       ===================================================== */

    const bugArea = document.getElementById("bugArea");
    const bug = document.getElementById("bug");
    const bugScore = document.getElementById("bugScore");
    const bugResult = document.getElementById("bugResult");

    let bugHits = 0;
    let bugMoving = false;


    function moveBug() {

        if (!bugArea || !bug) return;

        const areaWidth = bugArea.clientWidth;
        const areaHeight = bugArea.clientHeight;

        const bugWidth = bug.offsetWidth || 35;
        const bugHeight = bug.offsetHeight || 35;

        const maxX =
            Math.max(0, areaWidth - bugWidth - 10);

        const maxY =
            Math.max(0, areaHeight - bugHeight - 10);

        const randomX =
            Math.floor(Math.random() * maxX);

        const randomY =
            Math.floor(Math.random() * maxY);

        bug.style.left = `${randomX}px`;
        bug.style.top = `${randomY}px`;

    }


    function resetBugGame() {

        bugHits = 0;
        bugMoving = true;

        if (bugScore) {
            bugScore.textContent = "0 / 10";
        }

        if (bugResult) {

            bugResult.innerHTML =
                "Catch the bug 10 times!";

            bugResult.className =
                "game-result";

        }

        moveBug();

    }


    if (bug) {

        bug.addEventListener("click", function (e) {

            e.stopPropagation();

            if (!bugMoving) return;

            bugHits++;

            if (bugScore) {

                bugScore.textContent =
                    `${bugHits} / 10`;

            }

            if (bugHits >= 10) {

                bugMoving = false;

                if (bugResult) {

                    bugResult.innerHTML =
                        '🐛 <strong>YOU ESCAPED THE BUG!</strong><br>' +
                        '10 hits completed.';

                    bugResult.className =
                        "game-result success";

                }

                return;

            }

            moveBug();

        });

    }


    const bugModal =
        document.getElementById("bugGame");

    if (bugModal) {

        bugModal.addEventListener(
            "shown.bs.modal",
            resetBugGame
        );

        bugModal.addEventListener(
            "hidden.bs.modal",
            () => {
                bugMoving = false;
            }
        );

    }


    /* =====================================================
       GHOST TRAVELER
       ONLY MOVES FORWARD WITH SCROLL
       ===================================================== */

    const ghostTraveler =
        document.getElementById("ghostTraveler");

    const road =
        document.getElementById("road");

    const ghostHi =
        document.querySelector(".ghost-hi");

    let lastScrollY = window.scrollY;
    let lastHiTime = 0;


    function updateGhost() {

        if (!ghostTraveler || !road) return;

        const roadTop =
            road.offsetTop;

        const roadHeight =
            road.offsetHeight;

        const viewportHeight =
            window.innerHeight;

        const scrollY =
            window.scrollY;

        const startPoint =
            Math.max(
                0,
                roadTop - viewportHeight * 0.7
            );

        const endPoint =
            roadTop + roadHeight - viewportHeight;

        let progress =
            (scrollY - startPoint) /
            (endPoint - startPoint);

        progress =
            Math.max(0, Math.min(1, progress));

        const minTop = 68;
        const maxTop = 43;

        const ghostTop =
            minTop -
            ((minTop - maxTop) * progress);

        ghostTraveler.style.top =
            `${ghostTop}%`;

    }


    function ghostInteraction() {

        if (!ghostHi) return;

        const now = Date.now();

        if (now - lastHiTime < 5000) return;

        if (Math.random() < 0.35) {

            lastHiTime = now;

            ghostHi.classList.add("show");

            setTimeout(() => {

                ghostHi.classList.remove("show");

            }, 1800);

        }

    }


    window.addEventListener(
        "scroll",
        () => {

            updateGhost();

            if (window.scrollY > lastScrollY) {
                ghostInteraction();
            }

            lastScrollY = window.scrollY;

        },
        { passive: true }
    );


    updateGhost();


    /* =====================================================
       ACTIVE NAVIGATION
       ===================================================== */

    const navLinks =
        document.querySelectorAll(
            ".horror-navbar a[href^='#']"
        );

    const sections =
        document.querySelectorAll(
            "#games, #about, #personal, #education, " +
            "#technical, #other, #project, #social, #contact"
        );


    function updateActiveNav() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 250;

            if (window.scrollY >= sectionTop) {
                currentSection = section.id;
            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (href === `#${currentSection}`) {
                link.classList.add("active");
            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNav,
        { passive: true }
    );

    updateActiveNav();


    /* =====================================================
       CONTACT FORM
       ===================================================== */

    const contactForm =
        document.querySelector("#contact form");


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (e) {

                e.preventDefault();

                const nameField =
                    this.querySelector(
                        'input[name="name"], #name'
                    );

                const emailField =
                    this.querySelector(
                        'input[name="email"], #email'
                    );

                const subjectField =
                    this.querySelector(
                        'input[name="subject"], #subject'
                    );

                const messageField =
                    this.querySelector(
                        'textarea[name="message"], #message'
                    );


                const name =
                    nameField
                        ? nameField.value.trim()
                        : "";

                const email =
                    emailField
                        ? emailField.value.trim()
                        : "";

                const subject =
                    subjectField
                        ? subjectField.value.trim()
                        : "Portfolio Contact";

                const message =
                    messageField
                        ? messageField.value.trim()
                        : "";


                if (!name || !email || !message) {

                    alert(
                        "Please fill in your name, email and message."
                    );

                    return;

                }


                const mailSubject =
                    encodeURIComponent(subject);

                const mailBody =
                    encodeURIComponent(
                        `Hello Tisha,

Name: ${name}
Email: ${email}

Message:
${message}`
                    );


                const mailto =
                    `mailto:shiddikatisha054@gmail.com` +
                    `?subject=${mailSubject}` +
                    `&body=${mailBody}`;


                window.location.href = mailto;

            }
        );

    }


    /* =====================================================
       RESET GHOST GAME WHEN MODAL CLOSES
       ===================================================== */

    const ghostModal =
        document.getElementById("ghostGame");

    if (ghostModal) {

        ghostModal.addEventListener(
            "hidden.bs.modal",
            () => {

                roomButtons.forEach(room => {

                    room.disabled = false;

                    room.classList.remove(
                        "correct-room",
                        "wrong-room"
                    );

                });

                if (ghostResult) {

                    ghostResult.innerHTML = "";

                    ghostResult.className =
                        "game-result";

                }

            }
        );

    }


    /* =====================================================
       RESET CODE GAME WHEN MODAL CLOSES
       ===================================================== */

    const codeModal =
        document.getElementById("codeGame");

    if (codeModal) {

        codeModal.addEventListener(
            "hidden.bs.modal",
            () => {

                if (codeAnswer) {
                    codeAnswer.value = "";
                }

                if (codeResult) {

                    codeResult.innerHTML = "";

                    codeResult.className =
                        "game-result";

                }

            }
        );

    }


    /* =====================================================
       SMALL HORROR EFFECT — FLICKER
       ===================================================== */

    const flickerElements =
        document.querySelectorAll(".flicker");


    flickerElements.forEach(element => {

        const randomDelay =
            Math.random() * 5000;

        setTimeout(() => {

            setInterval(() => {

                if (Math.random() > 0.45) {

                    element.classList.toggle(
                        "window-flicker"
                    );

                }

            }, 2200 + Math.random() * 3000);

        }, randomDelay);

    });


    /* =====================================================
       PAGE LOADED
       ===================================================== */

    console.log(
        "%c TISHA. ",
        "font-size:24px;font-weight:bold;"
    );

    console.log(
        "%c Welcome to the haunted portfolio.",
        "font-size:14px;"
    );

});
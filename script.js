/* =====================================================
   MOBILE NAVIGATION
===================================================== */

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("active");

    const icon = menuToggle.querySelector("i");

    if (navMenu.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }

});


/* Close mobile menu when clicking a link */

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("active");

        const icon = menuToggle.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            current = section.getAttribute("id");
        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") === "#" + current
        ) {
            link.classList.add("active");
        }

    });

});


/* =====================================================
   CONTACT FORM
===================================================== */

const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

contactForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name =
        document.getElementById("name").value;

    const email =
        document.getElementById("email").value;

    const subject =
        document.getElementById("subject").value;

    const message =
        document.getElementById("message").value;


    /* Create contact information */

    const contactData = {

        name: name,

        email: email,

        subject: subject,

        message: message,

        date: new Date().toLocaleString()

    };


    /* Get old messages */

    let contacts =
        JSON.parse(
            localStorage.getItem("portfolioContacts")
        ) || [];


    /* Add new message */

    contacts.push(contactData);


    /* Save */

    localStorage.setItem(
        "portfolioContacts",
        JSON.stringify(contacts)
    );


    /* Success message */

    formMessage.textContent =
        "Thank you! Your message has been received.";

    formMessage.style.color = "#75f5d0";


    /* Reset form */

    contactForm.reset();

});


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".section-title, .about-text, .skills, .gallery-item, .contact-info, .contact-form"
    );


const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.15
        }
    );


revealElements.forEach(element => {

    element.classList.add("reveal");

    revealObserver.observe(element);

});


/* =====================================================
   GALLERY IMAGE PREVIEW
===================================================== */

const galleryItems =
    document.querySelectorAll(".gallery-item");

galleryItems.forEach(item => {

    item.addEventListener("click", () => {

        const image =
            item.querySelector("img");

        if (image) {

            const imageWindow =
                window.open("");

            imageWindow.document.write(`
                <html>
                    <head>
                        <title>Photo Preview</title>

                        <style>

                            body {
                                margin: 0;
                                background: #080a0a;

                                display: flex;
                                align-items: center;
                                justify-content: center;

                                min-height: 100vh;
                            }

                            img {
                                max-width: 90%;
                                max-height: 90vh;

                                object-fit: contain;

                                border-radius: 10px;
                            }

                        </style>

                    </head>

                    <body>

                        <img src="${image.src}">

                    </body>
                </html>
            `);

        }

    });

});


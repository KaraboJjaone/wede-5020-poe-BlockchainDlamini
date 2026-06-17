// Part 3 JavaScript functionality
// This file adds simple interactivity and form validation to the website.

document.addEventListener("DOMContentLoaded", function () {
  setupForms();
  setupAccordion();
  setupLightbox();
  setupBackToTopButton();
});

function setupForms() {
  const forms = document.querySelectorAll(".contact-form, .enquiry-form");

  forms.forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = form.querySelector('input[name="name"]');
      const email = form.querySelector('input[name="email"]');
      const message = form.querySelector('textarea[name="message"]');
      const feedback = form.querySelector(".form-feedback");

      let errors = [];

      if (name.value.trim() === "") {
        errors.push("Please enter your full name.");
      }

      if (email.value.trim() === "" || !email.value.includes("@")) {
        errors.push("Please enter a valid email address.");
      }

      if (message.value.trim().length < 10) {
        errors.push("Please enter a message of at least 10 characters.");
      }

      if (errors.length > 0) {
        feedback.textContent = errors.join(" ");
        feedback.className = "form-feedback error-message";
      } else {
        feedback.textContent =
          "Thank you. Your message has been checked and is ready to send.";
        feedback.className = "form-feedback success-message";
        form.reset();
      }
    });
  });
}

function setupAccordion() {
  const buttons = document.querySelectorAll(".accordion-button");

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      const content = button.nextElementSibling;
      const isOpen = content.classList.contains("show");

      content.classList.toggle("show");
      button.setAttribute("aria-expanded", !isOpen);
    });
  });
}

function setupLightbox() {
  const images = document.querySelectorAll(".lightbox-image");
  const lightbox = document.querySelector(".lightbox");

  if (!lightbox) {
    return;
  }

  const lightboxImage = lightbox.querySelector("img");
  const closeButton = lightbox.querySelector("button");

  images.forEach(function (image) {
    image.addEventListener("click", function () {
      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt;
      lightbox.classList.add("show");
    });
  });

  closeButton.addEventListener("click", function () {
    lightbox.classList.remove("show");
  });
}

function setupBackToTopButton() {
  const button = document.querySelector(".back-to-top");

  if (!button) {
    return;
  }

  button.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

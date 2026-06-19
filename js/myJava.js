// Part 3 JavaScript functionality
// This file adds simple interactivity and form validation to the website.

document.addEventListener("DOMContentLoaded", function () {
  setupForms();
  setupAccordion();
  setupLightbox();
  setupServiceSearch();
  setupBackToTopButton();
});

function setupForms() {
  const forms = document.querySelectorAll(".contact-form, .enquiry-form");

  forms.forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = form.querySelector('input[name="name"]');
      const email = form.querySelector('input[name="email"]');
      const phone = form.querySelector('input[name="phone"]');
      const enquiryType = form.querySelector('select[name="enquiryType"]');
      const messageType = form.querySelector('select[name="messageType"]');
      const message = form.querySelector('textarea[name="message"]');
      const feedback = form.querySelector(".form-feedback");

      let errors = [];

      if (name.value.trim() === "") {
        errors.push("Please enter your full name.");
      }

      if (email.value.trim() === "" || !email.value.includes("@")) {
        errors.push("Please enter a valid email address.");
      }

      if (phone && phone.value.trim() === "") {
        errors.push("Please enter your phone number.");
      }

      if (phone && !/^[0-9]+$/.test(phone.value.trim())) {
        errors.push("Phone number must contain numbers only.");
      }

      if (enquiryType && enquiryType.value === "") {
        errors.push("Please choose an enquiry type.");
      }

      if (messageType && messageType.value === "") {
        errors.push("Please choose a message type.");
      }

      if (message.value.trim().length < 10) {
        errors.push("Please enter a message of at least 10 characters.");
      }

      if (errors.length > 0) {
        feedback.textContent = errors.join(" ");
        feedback.className = "form-feedback error-message";
      } else {
        feedback.textContent = "Processing your form...";
        feedback.className = "form-feedback success-message";

        setTimeout(function () {
          const reply = createFormReply(form, enquiryType, messageType);
          const emailLink = createEmailLink(form, name, email, phone, message);

          feedback.innerHTML = reply + ' <a href="' + emailLink + '">Send email</a>';
          form.reset();
        }, 500);
      }
    });
  });
}

function createFormReply(form, enquiryType, messageType) {
  if (form.classList.contains("enquiry-form") && enquiryType) {
    if (enquiryType.value === "services") {
      return "Thank you. Our service team can respond with cost and availability details.";
    }

    if (enquiryType.value === "volunteer") {
      return "Thank you. We will respond with volunteer opportunities and next steps.";
    }

    if (enquiryType.value === "sponsor") {
      return "Thank you. We will respond with sponsorship options and available programmes.";
    }
  }

  if (messageType) {
    return "Thank you. Your " + messageType.value + " message has been checked and is ready.";
  }

  return "Thank you. Your message has been checked and is ready.";
}

function createEmailLink(form, name, email, phone, message) {
  const subject = form.classList.contains("enquiry-form")
    ? "Website enquiry"
    : "Website contact message";
  const body =
    "Name: " +
    name.value +
    "\nEmail: " +
    email.value +
    "\nPhone: " +
    (phone ? phone.value : "Not provided") +
    "\nMessage: " +
    message.value;

  return (
    "mailto:hello@sabusinesscouncil.org.za?subject=" +
    encodeURIComponent(subject) +
    "&body=" +
    encodeURIComponent(body)
  );
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

function setupServiceSearch() {
  const searchBox = document.querySelector("#serviceSearch");
  const cards = document.querySelectorAll(".service-card");
  const resultMessage = document.querySelector(".search-result");

  if (!searchBox) {
    return;
  }

  searchBox.addEventListener("input", function () {
    const searchText = searchBox.value.toLowerCase();
    let visibleCards = 0;

    cards.forEach(function (card) {
      const cardText = card.textContent.toLowerCase();
      const isMatch = cardText.includes(searchText);

      card.style.display = isMatch ? "block" : "none";

      if (isMatch) {
        visibleCards = visibleCards + 1;
      }
    });

    resultMessage.textContent = visibleCards + " service result(s) found.";
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

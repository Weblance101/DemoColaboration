
const contactForm = document.getElementById("contactForm");

const formStatus = document.getElementById("formStatus");

const submitBtn = document.getElementById("submitBtn");

const fields = {
    name: document.getElementById("name"),
    phone: document.getElementById("phone"),
    email: document.getElementById("email"),
    subject: document.getElementById("subject"),
    message: document.getElementById("message")
};

function showError(field, message) {
    const group = field.closest(".form-group");

    group.querySelector(".error-message").textContent = message;

    field.classList.toggle("invalid", Boolean(message));
    field.setAttribute("aria-invalid", message ? "true" : "false");
}

function validateForm() {
    let isValid = true;

    Object.values(fields).forEach(field => {
        showError(field, "");
    });

    const name = fields.name.value.trim();
    const phone = fields.phone.value.trim();
    const email = fields.email.value.trim();
    const subject = fields.subject.value;
    const message = fields.message.value.trim();

    if (!/^[\p{L}][\p{L}\s.'-]{1,79}$/u.test(name)) {
        showError(fields.name, "Please enter a valid name.");
        isValid = false;
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
        showError(fields.phone, "Enter a valid 10-digit Indian mobile number.");
        isValid = false;
    }

    if (
        email &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
        showError(fields.email, "Please enter a valid email address.");
        isValid = false;
    }

    if (!subject) {
        showError(fields.subject, "Please select your requirement.");
        isValid = false;
    }

    if (message.length < 10 || message.length > 2000) {
        showError(fields.message, "Message must contain 10–2000 characters.");
        isValid = false;
    }

    return isValid;
}

// Clear errors while typing
Object.values(fields).forEach(field => {
    field.addEventListener("input", () => {
        showError(field, "");
    });

    field.addEventListener("change", () => {
        showError(field, "");
    });
});

// Form submission
contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    formStatus.textContent = "";
    formStatus.className = "form-status";

    if (!validateForm()) {
        formStatus.textContent = "Please correct the highlighted fields.";
        formStatus.classList.add("error");
        return;
    }

    const name = fields.name.value.trim();
    const phone = fields.phone.value.trim();
    const email = fields.email.value.trim();
    const subject = fields.subject.value;
    const message = fields.message.value.trim();

    const whatsappMessage = `
New Website Inquiry

Name: ${name}
Phone: ${phone}
Email: ${email || "Not provided"}
Requirement: ${subject}

Message:
${message}
    `.trim();

    const whatsappURL =
        "https://wa.me/917369875573?text=" +
        encodeURIComponent(whatsappMessage);

    formStatus.textContent = "Opening WhatsApp to send your inquiry...";
    formStatus.classList.add("success");

    submitBtn.disabled = true;

    const whatsappWindow = window.open(
        whatsappURL,
        "_blank",
        "noopener,noreferrer"
    );

    if (!whatsappWindow) {
        formStatus.textContent =
            "WhatsApp could not open. Please allow pop-ups and try again.";

        formStatus.className = "form-status error";
        submitBtn.disabled = false;
        return;
    }

    contactForm.reset();

    Object.values(fields).forEach(field => {
        showError(field, "");
    });

    submitBtn.disabled = false;
});

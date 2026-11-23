
document.addEventListener("DOMContentLoaded", function () {

  // Dynamic copyright year
  const year = document.getElementById("currentYear");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Reveal animations
  const revealElements = document.querySelectorAll(
    ".project-card, .service-card, .timeline-item, .about-content, .about-visual, .stat"
  );

  if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver((entries, obs) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }

      });

    }, {
      threshold: 0.12
    });

    revealElements.forEach(element => {
      element.classList.add("reveal");
      observer.observe(element);
    });

  }

  // Interactive electric glow following mouse
  const cards = document.querySelectorAll(
    ".project-card, .service-card"
  );

  cards.forEach(card => {

    card.addEventListener("mousemove", function (event) {

      const rect = card.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);

    });

  });

});

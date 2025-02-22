AOS.init({
  duration: 1000,
  once: true,
});
document.addEventListener("DOMContentLoaded", function () {
  particlesJS("particles-js", {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: ["#001a3a", "#00ff9d", "#00ccff"],
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 0.5,
        random: false,
      },
      size: {
        value: 3,
        random: true,
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#00ff9d",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 6,
        direction: "none",
        random: false,
        straight: false,
        bounce: false,
        attract: false,
      },
      bounce: {
        vertical: 0.4,
        horizontal: 0.4,
      },
      friction: {
        value: 0.1,
      },
    },
    interactivity: {
      detect_on: "window", // Change this from 'canvas' to 'window'
      events: {
        onhover: {
          enable: true,
          mode: "repulse",
        },
        onclick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        repulse: {
          distance: 100,
          duration: 0.4,
        },
        push: {
          particles_nb: 4,
        },
      },
    },
    animation: {
      enable: true,
      speed: 1,
    },
    retina_detect: true,
  });

  // Add touch support
  document.addEventListener("touchstart", function (e) {
    e.preventDefault();
    particlesJS("particles-js").eachParticlerepell();
  });
});
const dynamicText = document.getElementById("dynamicText");
const titles = ["AI Enthusiast", "Software Developer", "Anti-Social Butterfly"];
let currentTitleIndex = 0;

function typeText() {
  const title = titles[currentTitleIndex];
  let charIndex = 0;

  dynamicText.textContent = "";
  dynamicText.style.opacity = "0";

  setTimeout(() => {
    dynamicText.style.opacity = "1";
  }, 100);

  function writeText() {
    if (charIndex < title.length) {
      dynamicText.textContent += title.charAt(charIndex);
      charIndex++;
      setTimeout(writeText, 50);
    }
  }

  writeText();
}

function changeTitle() {
  currentTitleIndex = (currentTitleIndex + 1) % titles.length;
  typeText();
}

typeText();
setInterval(changeTitle, 3000);

// Add active class to nav links when section is in view
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const section = document.querySelector(this.getAttribute("href"));
    section.scrollIntoView({ behavior: "smooth" });
  });
});

// Add the new project card flip animation
[].slice
  .call(document.querySelectorAll(".project-card"))
  .forEach((projectCard) => {
    projectCard.addEventListener("click", () => {
      projectCard.classList.toggle("active");
    });
  });

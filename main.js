AOS.init({
  duration: 1000,
  once: true,
});

const dynamicText = document.getElementById("dynamicText");
const titles = ["Full Stack Developer", "React Expert", "Java Expert"];
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

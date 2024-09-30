// Function to load header and footer
function loadComponent(file, elementId) {
  fetch(file)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById(elementId).innerHTML = data;
    })
    .catch((error) => console.error("Error loading component:", error));
}

// Load the header and footer dynamically
window.onload = function () {
  loadComponent("header.html", "header");
  loadComponent("footer.html", "footer");
};

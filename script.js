document.addEventListener("DOMContentLoaded", () => {
  // Search functionality
  document
    .getElementById("search-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const query = document.getElementById("search-input").value.toLowerCase();
      if (query) {
        performSearch(query);
      }
    });
});

function performSearch(query) {
  const contentFolder = "content/";
  const files = [
    "linux-commands.html",
    "docker-commands.html",
    "code-layout-python-standards.html",
    "whitespace-commas-python-standards.html",
    "jenkins-setup-on-debian.html",
    "build-spring-project-using-jenkins.html",
    "nx-monorepo-setup.html",
    "deployment-strategies-in-devops.html",
    "hyperledger-fabric-basics.html",
    // Add more file names as needed
  ];

  let results = [];
  let filesProcessed = 0;

  files.forEach((file) => {
    fetch(contentFolder + file)
      .then((response) => response.text())
      .then((data) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, "text/html");
        const textContent = doc.body.textContent.toLowerCase();

        if (textContent.includes(query)) {
          results.push({
            file: file,
            content: data,
          });
        }
        filesProcessed++;
        if (filesProcessed === files.length) {
          displaySearchResults(results, query);
        }
      });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    card.addEventListener("click", function () {
      const category = this.dataset.category; // Get the category name from data attribute
      loadContent(category);
    });
  });

  function loadContent(category) {
    fetch(`content/${category}.html`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.text();
      })
      .then((htmlContent) => {
        const mainContent = document.querySelector("body"); // Get the body element
        const header = document.querySelector("header"); // Get the header
        const footer = document.querySelector("footer"); // Get the footer

        // Clear out the current content (except header and footer)
        mainContent.innerHTML = "";

        // Append the header
        mainContent.appendChild(header);

        // Create a div to hold the new content
        const contentDiv = document.createElement("div");
        contentDiv.innerHTML = htmlContent;

        // Append the new content
        mainContent.appendChild(contentDiv);

        // Append the footer
        mainContent.appendChild(footer);
      })
      .catch((error) => {
        console.error("Error fetching content:", error);
      });
  }
});

function displaySearchResults(results, query) {
  const mainContent = document.querySelector("main");
  mainContent.innerHTML = "";

  if (results.length > 0) {
    results.forEach((result) => {
      const resultElement = document.createElement("article");
      resultElement.innerHTML = `
                <h2><a href="content/${result.file}">${result.file
        .replace(".html", "")
        .replace(/-/g, " ")}</a></h2>
                <p>Matching content: ...${extractSnippet(
                  result.content,
                  query
                )}...</p>
            `;
      mainContent.appendChild(resultElement);
    });
  } else {
    mainContent.innerHTML = "<p>No results found.</p>";
  }
}

function extractSnippet(content, query) {
  const lowerContent = content.toLowerCase();
  const queryIndex = lowerContent.indexOf(query);
  if (queryIndex === -1) return "";

  const snippetLength = 100;
  const start = Math.max(0, queryIndex - snippetLength / 2);
  const end = Math.min(content.length, queryIndex + snippetLength / 2);

  return content
    .substring(start, end)
    .replace(new RegExp(query, "gi"), (match) => `<mark>${match}</mark>`);
}

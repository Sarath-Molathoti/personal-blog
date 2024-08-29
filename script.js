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

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
  const contentFolder = "content/categories/";
  const files = [
    "linux/linux-commands.html",
    "devops/docker-commands.html",
    "python/code-layout-python-standards.html",
    "python/whitespace-commas-python-standards.html",
    "devops/jenkins-setup-on-debian.html",
    "devops/build-spring-project-using-jenkins.html",
    "web-development/nx-monorepo-setup.html",
    "web-development/nginx-configuration.html",
    "devops/deployment-strategies-in-devops.html",
    "blockchain/hyperledger-fabric-basics.html",
    "cloud-computing/aws-cognito.html",
    "cyber-security/clickjacking-attack.html",
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
  const mainContent = document.getElementById("main-content");
  mainContent.innerHTML = "";

  if (results.length > 0) {
    results.forEach((result) => {
      const resultElement = document.createElement("article");
      resultElement.innerHTML = `
                <h2><a href="content/categories/${result.file}">${result.file
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

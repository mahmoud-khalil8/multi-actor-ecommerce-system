
// =================================

document.addEventListener("DOMContentLoaded", () => {
    var contentDiv = document.querySelector(".content");
    let navLinks = document.querySelectorAll(".nav-link");
  
    // Function to load content based on the page
    function loadPage(page) {
      fetch(`${page}.html`)
        .then(response => {
          if (!response.ok) throw new Error("Page not found");
          return response.text();
        })
        .then(html => {
          contentDiv.innerHTML = html;

           // Execute any script tags in the loaded HTML
      var scripts = contentDiv.querySelectorAll("script");
      scripts.forEach(script => {
        var newScript = document.createElement("script");
        if (script.src) {
          // External script
          newScript.src = script.src;
        } else {
          // Inline script
          newScript.textContent = script.textContent;
        }
        document.body.appendChild(newScript); // Add to the body for execution
        newScript.remove(); // Remove after execution (optional)
      });
    })
        

        .catch(error => {
          contentDiv.innerHTML = `<p>Error: ${error.message}</p>`;
        });
    }
  
    // Add event listeners to nav links
    navLinks.forEach(link => {
      link.addEventListener("click", event => {
        event.preventDefault();
        var page = event.currentTarget.getAttribute("data-page");
        loadPage(page);
      });
    });
  
    // Load the default page (products) on initial load
    loadPage("sellerProducts");
    
  });
  
  
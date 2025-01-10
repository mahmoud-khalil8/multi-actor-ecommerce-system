
// =================================

document.addEventListener("DOMContentLoaded", () => {
  // Check if orders exist in local storage
if (!localStorage.getItem("orders")) {
  const sampleOrders = [
    {
      orderId: 1,
      userId: 123,
      sellerId: 2,
      items: [
        {
          productId: 101,
          quantity: 2,
          price: 50,
        },
      ],
      total: 100,
      shippingAddress: "123 Main St, City, Country",
      paymentMethod: "cash on delivery",
      status: "Pending",
    },
    {
      orderId: 2,
      userId: 124,
      sellerId: 2,
      items: [
        {
          productId: 102,
          quantity: 1,
          price: 75,
        },
      ],
      total: 75,
      shippingAddress: "456 Elm St, City, Country",
      paymentMethod: "direct bank transfer",
      status: "Shipped",
    },
    {
      orderId: 3,
      userId: 125,
      sellerId: 3, // This order belongs to a different seller
      items: [
        {
          productId: 103,
          quantity: 3,
          price: 20,
        },
      ],
      total: 60,
      shippingAddress: "789 Oak St, City, Country",
      paymentMethod: "cash on delivery",
      status: "Delivered",
    },
  ];

  // Store sample orders in local storage
  localStorage.setItem("orders", JSON.stringify(sampleOrders));
}
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
  
  
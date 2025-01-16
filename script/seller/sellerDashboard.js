
// =================================

document.addEventListener("DOMContentLoaded", () => {
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
      sellerId: 3, 
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

  localStorage.setItem("orders", JSON.stringify(sampleOrders));
}
    var contentDiv = document.querySelector(".content");
    let navLinks = document.querySelectorAll(".nav-link");
    var navbarCollapse = document.querySelector(".navbar-collapse");

    function loadPage(page) {
      fetch(`${page}.html`)
        .then(response => {
          if (!response.ok) throw new Error("Page not found");
          return response.text();
        })
        .then(html => {
          contentDiv.innerHTML = html;

      var scripts = contentDiv.querySelectorAll("script");
      scripts.forEach(script => {
        var newScript = document.createElement("script");
        if (script.src) {
          newScript.src = script.src;
        } else {
          newScript.textContent = script.textContent;
        }
        document.body.appendChild(newScript); 
        newScript.remove(); 
      });
    })
        

        .catch(error => {
          contentDiv.innerHTML = `<p>Error: ${error.message}</p>`;
        });
    }
  
    navLinks.forEach(link => {
      link.addEventListener("click", event => {
        event.preventDefault();
        var page = event.currentTarget.getAttribute("data-page");
        loadPage(page);
        if(page === "sellerProducts"){
          window.location.reload();
        }
       
        if (navbarCollapse.classList.contains("show")) {
          // navbarToggler.click();
          bootstrap.Collapse.getInstance(navbarCollapse).toggle();
          console.log(navbarCollapse.classList.contains("show"));
        }
      });
    });
  
    loadPage("sellerProducts");
    
  });
  
  
  
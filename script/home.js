// Fetch and display products
function fetchAndDisplayProducts(url, containerId, isRandom = false) {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      let products = data.products;

      // Sort products if not random
      if (!isRandom) {
        products = products.sort((a, b) => b.rating - a.rating).slice(1, 6); // Top 5 rated
      } else {
        products = products.sort(() => 0.5 - Math.random()).slice(0, 5); // Random 5
      }

      const container = document.getElementById(containerId);
      products.forEach((product) => {
        const productDiv = createProductElement(product);
        container.appendChild(productDiv);
      });

      checkLoginBeforeCart(); // Adjust cart links based on login status
    })
    .catch((error) => console.error(`Error fetching products:`, error));
}

// Create product element
function createProductElement(product) {
  const productDiv = document.createElement("div");
  productDiv.className = "product-item";

  // Navigate to product details on click
  productDiv.addEventListener("click", () => {
    window.location.href = `product.html?id=${product.id}`;
  });

  // Product image
  const img = document.createElement("img");
  img.src = product.thumbnail;
  img.alt = product.title;
  productDiv.appendChild(img);

  // Product title
  const title = document.createElement("h5");
  title.innerText = product.title;
  title.style.marginTop = "20px";
  productDiv.appendChild(title);

  // Product rating
  const stars = document.createElement("div");
  stars.className = "star";
  for (let i = 0; i < Math.round(product.rating); i++) {
    const star = document.createElement("i");
    star.className = "fas fa-star";
    stars.appendChild(star);
  }
  productDiv.appendChild(stars);

  // Price and cart symbol
  const priceAndCart = document.createElement("div");
  priceAndCart.style.display = "flex";
  priceAndCart.style.justifyContent = "space-evenly";
  priceAndCart.style.marginTop = "20px";

  const price = document.createElement("p");
  price.innerText = `$${product.price}`;
  priceAndCart.appendChild(price);

  const link = document.createElement("a");
  link.href = "#"; // Default cart action
  link.className = "addtocartsympol";

  const sympol = document.createElement("i");
  sympol.className = "fa-solid fa-cart-shopping";
  sympol.style.color = "#323232";

  // // Prevent container click propagation
  // link.addEventListener("click", (event) => {
  //   event.stopPropagation();
  //   window.location.href = `cart.html?id=${product.id}`;
  // });

  link.appendChild(sympol);
  priceAndCart.appendChild(link);

  productDiv.appendChild(priceAndCart);
  return productDiv;
}

// Redirect cart links if not logged in
function checkLoginBeforeCart() {
  if (!localStorage.getItem("currentUser")) {
    document.querySelectorAll(".addtocartsympol").forEach((cart) => {
      cart.href = "login.html";
    });
  }
}

// Show login button if not logged in
const loginButton = document.getElementById("loginbutton");
if (!localStorage.getItem("currentUser")) {
  loginButton.style.display = "block";
}

// Fetch top-rated and random products
fetchAndDisplayProducts("script/api.json", "product-container");
fetchAndDisplayProducts("script/api.json", "secondproduct-container", true);

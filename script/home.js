

function getProductsFromLocalStorage() {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  return products;
}

function displayNewReleases() {
  const products = getProductsFromLocalStorage();
  const container = document.getElementById('new-releases-container');
  if (!container) return;

  container.innerHTML = "<h2>New Releases</h2>"; // Clear existing content and add heading

  products.forEach((product) => {
    const productDiv = createProductElementLocalStorage(product);
    container.appendChild(productDiv);
  });

  checkLoginBeforeCart(); // Adjust cart links based on login status
}
// Call this function to display new releases when the page loads
displayNewReleases();
// Fetch and display products
function fetchAndDisplayProducts(url, containerId, isRandom = false) {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      let products = data.products;

      // Sort products by rating or randomize
      products = isRandom
        ? products.sort(() => 0.5 - Math.random()).slice(0, 5)
        : products.sort((a, b) => b.rating - a.rating).slice(0, 5);

      const container = document.getElementById(containerId);
      if (!container) return;

      container.innerHTML = ""; // Clear existing content
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

  // Add product image
  const img = document.createElement("img");
  img.src = product.thumbnail;
  img.alt = product.title;
  productDiv.appendChild(img);

  // Add product title
  const title = document.createElement("h5");
  title.innerText = product.title;
  title.style.marginTop = "20px";
  productDiv.appendChild(title);

  // Add product rating
  const stars = document.createElement("div");
  stars.className = "star";
  for (let i = 0; i < Math.round(product.rating); i++) {
    const star = document.createElement("i");
    star.className = "fas fa-star";
    stars.appendChild(star);
  }
  productDiv.appendChild(stars);

  // Add price and cart icon
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

  const cartIcon = document.createElement("i");
  cartIcon.className = "fa-solid fa-cart-shopping";
  cartIcon.style.color = "#323232";

  link.appendChild(cartIcon);
  priceAndCart.appendChild(link);
  productDiv.appendChild(priceAndCart);

  return productDiv;
}
function createProductElementLocalStorage(product) {
  const productDiv = document.createElement("div");
  productDiv.className = "product-item";

  // Show modal on click for local storage products
  productDiv.addEventListener("click", () => {
    const underReviewModal = new bootstrap.Modal(document.getElementById("underReviewModal"));
    underReviewModal.show();
  });

  // Add product image
  const img = document.createElement("img");
  img.src = product.image; // Use 'image' instead of 'thumbnail'
  img.alt = product.name;  // Use 'name' instead of 'title'
  productDiv.appendChild(img);

  // Add product title
  const title = document.createElement("h5");
  title.innerText = product.name; // Use 'name' instead of 'title'
  title.style.marginTop = "20px";
  productDiv.appendChild(title);

  // Add product rating (if available)
  if (product.rating) {
    const stars = document.createElement("div");
    stars.className = "star";
    for (let i = 0; i < Math.round(product.rating); i++) {
      const star = document.createElement("i");
      star.className = "fas fa-star";
      stars.appendChild(star);
    }
    productDiv.appendChild(stars);
  }

  // Add price and cart icon
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

  const cartIcon = document.createElement("i");
  cartIcon.className = "fa-solid fa-cart-shopping";
  cartIcon.style.color = "#323232";

  link.appendChild(cartIcon);
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
if (loginButton && !localStorage.getItem("currentUser")) {
  loginButton.style.display = "block";
}

document.addEventListener('DOMContentLoaded', () => {
  fetchAndDisplayProducts("script/api.json", "product-container");
  fetchAndDisplayProducts("script/api.json", "secondproduct-container", true);
  displayNewReleases();
});


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

  checkLoginBeforeCart(); 
}
displayNewReleases();

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

      products = isRandom
        ? products.sort(() => 0.5 - Math.random()).slice(0, 5)
        : products.sort((a, b) => b.rating - a.rating).slice(0, 5);

      const container = document.getElementById(containerId);
      if (!container) return;

      container.innerHTML = "";
      products.forEach((product) => {
        const productDiv = createProductElement(product);
        container.appendChild(productDiv);
      });
    


      checkLoginBeforeCart(); 
    })
    .catch((error) => console.error(`Error fetching products:`, error));
}

function createProductElement(product) {
  const productDiv = document.createElement("div");
  productDiv.className = "product-item";

  productDiv.addEventListener("click", () => {
    window.location.href = `product.html?id=${product.id}`;
  });

  
  const img = document.createElement("img");
  img.src = product.thumbnail;
  img.alt = product.title;
  productDiv.appendChild(img);

  const title = document.createElement("h5");
  title.innerText = product.title;
  title.style.marginTop = "20px";
  productDiv.appendChild(title);

  const stars = document.createElement("div");
  stars.className = "star";
  for (let i = 0; i < Math.round(product.rating); i++) {
    const star = document.createElement("i");
    star.className = "fas fa-star";
    stars.appendChild(star);
  }
  productDiv.appendChild(stars);

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

  productDiv.addEventListener("click", () => {
    const underReviewModal = new bootstrap.Modal(document.getElementById("underReviewModal"));
    underReviewModal.show();
  });

  const img = document.createElement("img");
  img.src = product.image; 
  img.alt = product.name;  
  productDiv.appendChild(img);

  const title = document.createElement("h5");
  title.innerText = product.name;
  title.style.marginTop = "20px";
  productDiv.appendChild(title);

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

  const priceAndCart = document.createElement("div");
  priceAndCart.style.display = "flex";
  priceAndCart.style.justifyContent = "space-evenly";
  priceAndCart.style.marginTop = "20px";

  const price = document.createElement("p");
  price.innerText = `$${product.price}`;
  priceAndCart.appendChild(price);

  const link = document.createElement("a");
  link.href = "#";  
  link.className = "addtocartsympol";

  const cartIcon = document.createElement("i");
  cartIcon.className = "fa-solid fa-cart-shopping";
  cartIcon.style.color = "#323232";

  link.appendChild(cartIcon);
  priceAndCart.appendChild(link);
  productDiv.appendChild(priceAndCart);

  return productDiv;
}
function checkLoginBeforeCart() {
  if (!localStorage.getItem("currentUser")) {
    document.querySelectorAll(".addtocartsympol").forEach((cart) => {
      cart.href = "login.html";
    });
  }
}

const loginButton = document.getElementById("loginbutton");
if (loginButton && !localStorage.getItem("currentUser")) {
  loginButton.style.display = "block";
}

document.addEventListener('DOMContentLoaded', () => {
  fetchAndDisplayProducts("script/api.json", "product-container");
  fetchAndDisplayProducts("script/api.json", "secondproduct-container", true);
  displayNewReleases();
});
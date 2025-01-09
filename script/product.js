let cart = {
  products: [],
};

function loadCartFromStorage() {
  let storedCart = localStorage.getItem("cart");

  if (storedCart) {
    cart = JSON.parse(storedCart);
    console.log("Cart loaded from localStorage:", cart);
  }
}

loadCartFromStorage();

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

if (!productId || isNaN(productId)) {
  console.error("Invalid or missing Product ID in the URL.");
}

// Fetch product data from api.json
fetch("script/api.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    const product = data.products.find((p) => p.id === parseInt(productId));
    if (product) {
      displayProductDetails(product);

      document
        .getElementById("addToCart")
        .addEventListener("click", function () {
          if(localStorage.getItem("currentUser") === null){
            window.location.href = "login.html";
            return ;
          }
          addToCart(product);
        });
    } else {
      console.error("Product not found.");
    }
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });

function displayProductDetails(product) {
  document.getElementById("productImg").src = product.images[0]; // Set the image
  document.getElementById("description").innerText = product.description; // Set description
  document.getElementById("name").innerText = product.title; // Set name
  document.getElementById("price").innerText = `${product.price} L.E`; // Set price

  let rateHTML = "";
  for (let i = 0; i < Math.round(product.rating); i++) {
    rateHTML += `<img width="20" height="20" src="./assets/images/star.png" alt="rate" />`; // Update the path as needed
  }
  document.getElementById("rate").innerHTML = rateHTML;
}

function addToCart(product) {
  let quantityInput = document.getElementById("quantity");
  if (!quantityInput) {
    console.error("Quantity input not found.");
    return;
  }

  let quantity = parseInt(quantityInput.value);
  if (isNaN(quantity) || quantity <= 0) {
    alert("Please enter a valid quantity.");
    return;
  }

  let productIndex = cart.products.findIndex((item) => item.id === product.id);

  if (productIndex !== -1) {
    cart.products[productIndex].quantity += quantity;
    console.log("Product quantity updated in the cart:", cart);
  } else {
    cart.products.push({
      id: product.id,
      name: product.title,
      // description: product.description,
      price: product.price, // Added the price property here
      image: product.images[0],
      rate: Math.round(product.rating),
      quantity: quantity,
    });
    console.log("Item added to the cart:", cart);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}
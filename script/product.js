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
//  // for check from nada
// const productId = 1736962899716;

if (!productId || isNaN(productId)) {
  console.error("Invalid or missing Product ID in the URL.");
}

if (productId <= 100) {
  fromJsonFile();
} else {
  let sellerProducts = localStorage.getItem("products");

  if (sellerProducts) {
    let products = JSON.parse(sellerProducts);
    console.log("Products loaded from localStorage:", products);

    products.forEach(function (product) {
      if (product.id === parseInt(productId)) {
        displayProductDetailsFromSeller(product);

        document
          .getElementById("addToCart")
          .addEventListener("click", function () {
            if (localStorage.getItem("currentUser") === null) {
              window.location.href = "login.html";
              return;
            }
            addToCartfromSeller(product);
          });
      } else {
        console.error("Product not found.");
      }
    });
  }
}

async function fromJsonFile() {
  await fetch("data/api.json")
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
            if (localStorage.getItem("currentUser") === null) {
              window.location.href = "login.html";
              return;
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
}

function displayProductDetails(product) {
  document.getElementById("productImg").src = product.images[0];
  document.getElementById("description").innerText = product.description;
  document.getElementById("name").innerText = product.title;
  document.getElementById("price").innerText = `${product.price} Dollars`;

  let rateHTML = "";
  for (let i = 0; i < Math.round(product.rating); i++) {
    rateHTML += `<img width="20" height="20" src="./assets/images/star.png" alt="rate" />`;
  }
  document.getElementById("rate").innerHTML = rateHTML;
}

function displayProductDetailsFromSeller(product) {
  // console.log(product.image);
  document.getElementById("productImg").src = product.image;
  document.getElementById("description").innerText = product.description;
  document.getElementById("name").innerText = product.name;
  document.getElementById("price").innerText = `${product.price} Dollars`;

  let rateHTML = "";
  for (let i = 0; i < 4; i++) {
    rateHTML += `<img width="20" height="20" src="./assets/images/star.png" alt="rate" />`;
  }
  document.getElementById("rate").innerHTML = rateHTML;
}

function addToCart(product) {
  let stock = product.stock;
  console.log(stock);
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

  if (quantity > stock) {
    alert("The quantity of Your order is more than the stock .");
    return;
  }

  let productIndex = cart.products.findIndex((item) => item.id === product.id);
  // console.log(productIndex);
product.stock -= quantity;
  
  if (productIndex !== -1) {
    let quantityinLocalstorage = cart.products[productIndex].quantity;
    if (quantityinLocalstorage + quantity > stock) {
      // quantityinLocalstorage = stock;
      alert("That will be more than the stock! Check your cart");
      return;
    } else {
      cart.products[productIndex].quantity += quantity;
      console.log("Product quantity updated in the cart:", cart);
    }
  } else {
    cart.products.push({
      id: product.id,
      name: product.title,
      // description: product.description,
      price: product.price,
      image: product.images[0],
      quantity: quantity,
      stock: product.stock,
      userId: JSON.parse(localStorage.getItem("currentUser")).id,
    });
    console.log("Item added to the cart:", cart);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  const successModal = new bootstrap.Modal(
    document.getElementById("successModal")
  );
  successModal.show();

  setTimeout(() => {
    successModal.hide();
  }, 2000);
  
}

function displayProductDetailsFromSeller(product) {
  // console.log(product.image);
  document.getElementById("productImg").src = product.image;
  document.getElementById("description").innerText = product.description;
  document.getElementById("name").innerText = product.name;
  document.getElementById("price").innerText = `${product.price} Dollars`;

  let rateHTML = "";
  for (let i = 0; i < 4; i++) {
    rateHTML += `<img width="20" height="20" src="./assets/images/star.png" alt="rate" />`;
  }
  document.getElementById("rate").innerHTML = rateHTML;
}

function addToCartfromSeller(product) {
  let quantityInput = document.getElementById("quantity");
  if (!quantityInput) {
    console.error("Quantity input not found.");
    return;
  }

  let stock = product.stock;

  let quantity = parseInt(quantityInput.value);

  if (isNaN(quantity) || quantity <= 0) {
    alert("Please enter a valid quantity.");
    return;
  }
  if (quantity > stock) {
    alert("The quantity of Your order is more than the stock .");
    return;
  }

  let productIndex = cart.products.findIndex((item) => item.id === product.id);
  console.log(productIndex);

  if (productIndex !== -1) {
    let quantityinLocalstorage = cart.products[productIndex].quantity;
    if (quantityinLocalstorage + quantity > stock) {
      // cart.products[productIndex].quantity = stock - 1;
      alert("That will be more than the stock! Check your cart");
      return;
    } else {
      cart.products[productIndex].quantity += quantity;
      console.log("Product quantity updated in the cart:", cart);
    }
  } else {
    cart.products.push({
      id: product.id,
      sellerId: product.sellerId,
      name: product.name,
      // description: product.description,
      price: product.price,
      image: product.image,
      quantity: quantity,
      stock: product.stock,
      userId: JSON.parse(localStorage.getItem("currentUser")).id,
      sellerId:product.sellerId?product.sellerId:0,
    });
    console.log("Item added to the cart:", cart);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  const successModal = new bootstrap.Modal(
    document.getElementById("successModal")
  );
  successModal.show();

  setTimeout(() => {
    successModal.hide();
  }, 2000);
}

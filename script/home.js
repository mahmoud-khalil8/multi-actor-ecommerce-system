// best seller 
fetch('script/api.json')
.then(response => {
  if (!response.ok) {
    throw new Error('Failed to fetch ' + response.statusText);
  }
  return response.json();
})
  .then(data => {
    const products = data.products; // Get all products

    // Sort the products by rating in descending order
    const topRatedProducts = products.sort((a, b) => b.rating - a.rating).slice(1, 6); // Get top 5 rated products

    const container = document.getElementById('product-container');

    // Loop through each product and display its details
    topRatedProducts.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.className = 'product-item';

      // Add product image
      const img = document.createElement('img');
      img.src = product.thumbnail; // Set the thumbnail as image source
      img.alt = product.title; // Set alt text for accessibility
      productDiv.appendChild(img);

      // Add product title
      const title = document.createElement('h5');
      title.innerText = product.title;
      title.style.marginTop = `20px`;
      productDiv.appendChild(title);

      // Add stars
      const stars = document.createElement("div");
      stars.className = "star";
      const rate = Math.round(product.rating);
      for (let i = 0; i < rate; i++) {
        const star = document.createElement("i");
        star.className = `fas fa-star`;
        stars.appendChild(star);
      }
      productDiv.appendChild(stars);

      // Add product price
      const sympolandprice = document.createElement("div");
      sympolandprice.style.display = `flex`;
      sympolandprice.style.justifyContent = `space-evenly`;
      sympolandprice.style.marginTop = `20px`;
      const price = document.createElement('p');
      price.innerText = `$${product.price}`;
      sympolandprice.appendChild(price);
      productDiv.appendChild(sympolandprice);

      // Add cart symbol
      const link = document.createElement("a");
      link.href = "#"; // go to cart
      link.className="addtocartsympol"
      const sympol = document.createElement("i");
      sympol.className = `fa-solid fa-cart-shopping`;
      sympol.style.color = `#323232`;
      link.appendChild(sympol);
      sympolandprice.appendChild(link);
      productDiv.appendChild(sympolandprice);

      // Append the product to the container
      container.appendChild(productDiv);
    });

    // Redirect to login page for cart symbol if not logged in
      checkLoginBeforeCart()
  })
  .catch(error => console.error('Error fetching products:', error)); // Handle errors



  // random 
  fetch('script/api.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    const products = data.products; // Get all products
    const shuffledProducts = products.sort(() => 0.5 - Math.random()); // Shuffle the products array randomly
    const selectedProducts = shuffledProducts.slice(0, 5); // Get the first 5 random products

    const container = document.getElementById('secondproduct-container');

    // Loop through each product and display its details
    selectedProducts.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.className = 'product-item';

      // Add product image
      const img = document.createElement('img');
      img.src = product.thumbnail; // Set the thumbnail as image source
      img.alt = product.title; // Set alt text for accessibility
      productDiv.appendChild(img);

      // Add product title
      const title = document.createElement('h5');
      title.innerText = product.title;
      title.style.marginTop = `20px`;
      productDiv.appendChild(title);

      // Add stars
      const stars = document.createElement("div");
      stars.className = "star";
      const rate = Math.round(product.rating);
      for (let i = 0; i < rate; i++) {
        const star = document.createElement("i");
        star.className = `fas fa-star`;
        stars.appendChild(star);
      }
      productDiv.appendChild(stars);

      // Add product price
      const sympolandprice = document.createElement("div");
      sympolandprice.style.display = `flex`;
      sympolandprice.style.justifyContent = `space-evenly`;
      sympolandprice.style.marginTop = `20px`;
      const price = document.createElement('p');
      price.innerText = `$${product.price}`;
      sympolandprice.appendChild(price);
      productDiv.appendChild(sympolandprice);

      // Add cart symbol
      const link = document.createElement("a");
      link.href = "#"; // go to cart
      link.className="addtocartsympol";
      const sympol = document.createElement("i");
      sympol.className = `fa-solid fa-cart-shopping`;
      sympol.style.color = `#323232`;
      link.appendChild(sympol);
      sympolandprice.appendChild(link);
      productDiv.appendChild(sympolandprice);

      // Append the product to the container
      container.appendChild(productDiv);
    });

    // Redirect to login page for cart symbol if not logged in
     checkLoginBeforeCart();
  })
  .catch(error => console.error('Error fetching products:', error)); // Handle errors
 



  // display login button if isn't in local storage 
let loginbutton=document.getElementById("loginbutton")
if(!(localStorage.getItem("currentUser"))){
  loginbutton.style.display="block";
}

    // Redirect to login page for cart symbol if not logged in
function checkLoginBeforeCart(){
  if (!(localStorage.getItem("currentUser"))) {
    const cartSymbols = document.getElementsByClassName("addtocartsympol");
    for (let i = 0; i < cartSymbols.length; i++) {
      cartSymbols[i].href = "login.html";
    }
  }
}
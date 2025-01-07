let currentPage = 1; // Current page
const totalPages = 3; // Total number of pages
let categories = {}; // To store grouped categories

function fetchAndDisplayProducts(apiUrl) {
  fetch(apiUrl)
    .then((response) => response.json()) // Convert response to JSON
    .then((data) => {
      const products = data.products;
      categories = groupByCategory(products);
      displayPage(currentPage); // Display the first page
      createPaginationButtons(); // Create the pagination buttons
    })
    .catch((error) => console.error("Error fetching products:", error));
}

// Group products by category
function groupByCategory(products) {
  return products.reduce((acc, product) => {
    acc[product.category] = acc[product.category] || [];
    acc[product.category].push(product);
    return acc;
  }, {});
}

// Display products for the current page
function displayPage(page) {
    currentPage = page;  // Update currentPage value
  
    const container = document.getElementById("products-container");
    container.innerHTML = ""; // Clear previous content
  
    const categoryKeys = Object.keys(categories);
    const categoriesPerPage = Math.ceil(categoryKeys.length / totalPages);
    const startIndex = (page - 1) * categoriesPerPage;
    const endIndex = Math.min(startIndex + categoriesPerPage, categoryKeys.length); // Prevent going beyond available categories
  
    categoryKeys.slice(startIndex, endIndex).forEach((category) => {
      const categoryDiv = document.createElement("div");
      categoryDiv.className = "category-container";
  
      // Add category title
      const categoryTitle = document.createElement("h2");
      categoryTitle.innerText = category;
      categoryTitle.className = "category-title";
      
      
      
      categoryDiv.appendChild(categoryTitle);
  
      // Create a grid for the products in this category
      const productsDiv = document.createElement("div");
      productsDiv.className = "products-grid";
  
      categories[category].forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.className = "product-item";
  
        // Add product image
        const img = document.createElement("img");
        img.src = product.thumbnail;
        img.alt = product.title;
        productDiv.appendChild(img);
  
        // Add product title
        const title = document.createElement("h5");
        title.innerText = product.title;
        productDiv.appendChild(title);
  
        // Add stars
        const stars = document.createElement("div");
        stars.className = "star";
        const rate = Math.round(product.rating);
        for (let i = 0; i < rate; i++) {
          const star = document.createElement("i");
          star.className = "fas fa-star";
          stars.appendChild(star);
        }
        productDiv.appendChild(stars);
  
        // Add product price and cart
        const sympolandprice = document.createElement("div");
        sympolandprice.style.display = "flex";
        sympolandprice.style.justifyContent = "space-between";
  
        const price = document.createElement("p");
        price.innerText = `$${product.price}`;
        sympolandprice.appendChild(price);
  
        const link = document.createElement("a");
        link.href = "#"; // Placeholder for cart functionality
        link.className="addtocartsympol";

        const sympol = document.createElement("i");
        sympol.className = "fa-solid fa-cart-shopping";
        sympol.style.color = '#323232';

        link.appendChild(sympol);
        sympolandprice.appendChild(link);
  
        productDiv.appendChild(sympolandprice);
  
        productsDiv.appendChild(productDiv);
      });
      
  
      categoryDiv.appendChild(productsDiv);
      container.appendChild(categoryDiv);
    // Redirect to login page for cart symbol if not logged in
    checkLoginBeforeCart();
    });
  
  
    // Scroll the page to the top
    window.scrollTo(0, 0);
  
    createPaginationButtons();  // Recreate pagination buttons after each page change
  }
  

// Create pagination buttons
function createPaginationButtons() {
  const paginationContainer = document.getElementById("pagination-container");
  paginationContainer.innerHTML = ""; // Clear previous buttons

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.innerText = i;
    button.className = "pagination-button";
    button.addEventListener("click", () => displayPage(i));

    if (i === currentPage) {
      button.classList.add("active"); // Highlight current page button
    }

    paginationContainer.appendChild(button);
  }
}

// Fetch and display products
fetchAndDisplayProducts(`script/api.json`);


  // search
  // Attach event listener to the form
document.getElementById('searchForm').addEventListener('submit', async function (event) {
  event.preventDefault(); // Prevent form submission

  const query = document.getElementById('searchInput').value.trim().toLowerCase(); // Get search query
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = ''; // Clear previous results

  if (!query) {
    return; // Exit if the query is empty
  }

  try {
    // Fetch data from the local JSON file
    const response = await fetch('script/api.json');

    // Check if response is OK
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const data = await response.json();
    const products = data.products;

    // Filter products based on the search query
    const filteredProducts = products.filter(product =>
      product.title.toLowerCase().includes(query)
    );

    // Check if products are found
    if (filteredProducts.length === 0) {
      resultsContainer.innerHTML = '<p class="text-danger" style="margin:20px auto;text-align:center;">No products found for your search.</p>';
      return;
    }

    // Display results
    filteredProducts.forEach(product => {
      const productHTML = `
 <div class="card mb-3 shadow-lg rounded-lg text-center " style=" border-radius: 10px; transition: transform 0.3s ease, box-shadow 0.3s ease;">
  <div class="row g-0">
    <div class="col-12 col-md-4 text-center">
      <img src="${product.thumbnail}" class="img-fluid rounded-start" alt="${product.title}" style="object-fit: cover; height: 200px; border-radius: 10px;">
    </div>
    <div class="col-12 col-md-8">
      <div class="card-body ">
        <h5 class="card-title text-dark" style="font-size: 1.2rem; font-weight: bold; color: #333;">${product.title}</h5>
        <p class="card-text" style="color: #777; font-size: 1rem;"><strong>Price:</strong> $${product.price}</p>
      </div>
      <div class="add text-center" style="padding: 10px 15px; background-color: white;">
      <div class="add text-center" style="padding: 10px 15px; background-color: white;">
           <a class="btn btn-warning btn-sm w-100 rounded-3 addtocartsympol" 
            style="font-size: 1rem; padding: 10px; transition: background-color 0.3s ease; color: white; text-decoration: none;" 
             href="#">
              Add to Cart
             </a>
      </div>

      </div>
    </div>
  </div>
</div>
      `;
      resultsContainer.innerHTML += productHTML;

      // Optionally hide the main product container
      const pro = document.getElementById("products-container");
      pro.style.display = "none";
    });
    // Redirect to login page for cart symbol if not logged in
    checkLoginBeforeCart()
  } catch (error) {
    console.error('Error fetching data:', error);
    resultsContainer.innerHTML = '<p class="text-danger">An error occurred while fetching the data.</p>';
  }
});


// handle search clear

document.getElementById('searchInput').addEventListener('input', function () {
  const resultsContainer = document.getElementById('results');
      // document.getElementById("products").style.display="block"
  
  // Check if the input is empty (e.g., "X" button was clicked)
  if (this.value.trim() === '') {
      resultsContainer.innerHTML = ''; // Clear results
      resultsContainer.style.display = 'none'; // Optionally hide the results container
      document.getElementById("products-container").style.display="block"

  } else {
      resultsContainer.style.display = ''; // Show results container if typing again
      // document.getElementById("products").style.display="block"
  }
});

// handle search form  active , blur , input 

// Add event listener for focus (when input is active)
searchInput.addEventListener('focus', function () {
this.style.borderColor = '#007BFF'; // Change border color (e.g., Bootstrap primary color)
this.style.boxShadow = '0 0 8px rgba(0, 123, 255, 0.6)'; // Add a glowing blue shadow
});

// Add event listener for blur (when input loses focus)
searchInput.addEventListener('blur', function () {
this.style.borderColor = ''; // Reset to default
this.style.boxShadow = ''; // Reset shadow
});

// Optional: Add dynamic styling during input
searchInput.addEventListener('input', function () {
if (this.value.trim() !== '') {
this.style.borderColor = '#28A745'; // Change border to green for typing
this.style.boxShadow = '0 0 8px rgba(40, 167, 69, 0.6)'; // Green glow
} else {
this.style.borderColor = '#007BFF'; // Reset to blue for focus
this.style.boxShadow = '0 0 8px rgba(0, 123, 255, 0.6)'; // Blue glow
}
});





    // Redirect to login page for cart symbol if not logged in
    function checkLoginBeforeCart(){
      if (!(localStorage.getItem("currentUser"))) {
        const cartSymbols = document.getElementsByClassName("addtocartsympol");
        for (let i = 0; i < cartSymbols.length; i++) {
          cartSymbols[i].href = "login.html";
        }
      }
    }





// filter




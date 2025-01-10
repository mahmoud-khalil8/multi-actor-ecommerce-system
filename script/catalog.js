

let currentPage = 1; 
const totalPages = 3; 
let categories = {};  


function fetchAndDisplayProducts(apiUrl) {
  fetch(apiUrl)
    .then((response) => response.json())  
    .then((data) => {
      const products = data.products;
      categories = groupByCategory(products);
      displayPage(currentPage);  
      createPaginationButtons();  
    })
    .catch((error) => console.error("Error fetching products:", error));
}

function groupByCategory(products) {
  return products.reduce((acc, product) => {
    acc[product.category] = acc[product.category] || [];
    acc[product.category].push(product);
    return acc;
  }, {});
}

function displayPage(page) {
    currentPage = page;   
  
    const container = document.getElementById("products-container");
    container.innerHTML = "";  
  
    const categoryKeys = Object.keys(categories);
    const categoriesPerPage = Math.ceil(categoryKeys.length / totalPages);
    const startIndex = (page - 1) * categoriesPerPage;
    const endIndex = Math.min(startIndex + categoriesPerPage, categoryKeys.length); 
  
    categoryKeys.slice(startIndex, endIndex).forEach((category) => {
      const categoryDiv = document.createElement("div");
      categoryDiv.className = "category-container";
  
      const categoryTitle = document.createElement("h2");
      categoryTitle.innerText = category;
      categoryTitle.className = "category-title";
      
      
      
      categoryDiv.appendChild(categoryTitle);
  
      const productsDiv = document.createElement("div");
      productsDiv.className = "products-grid";
  
      categories[category].forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.className = "product-item";

        productDiv.addEventListener("click",()=>{
          window.location.href=`product.html?id=${product.id}`
        })
  
        const img = document.createElement("img");
        img.src = product.thumbnail;
        img.alt = product.title;
        productDiv.appendChild(img);
  
        const title = document.createElement("h5");
        title.innerText = product.title;
        productDiv.appendChild(title);
  
        const stars = document.createElement("div");
        stars.className = "star";
        const rate = Math.round(product.rating);
        for (let i = 0; i < rate; i++) {
          const star = document.createElement("i");
          star.className = "fas fa-star";
          stars.appendChild(star);
        }
        productDiv.appendChild(stars);
  
        const sympolandprice = document.createElement("div");
        sympolandprice.style.display = "flex";
        sympolandprice.style.justifyContent = "space-between";
  
        const price = document.createElement("p");
        price.innerText = `$${product.price}`;
        sympolandprice.appendChild(price);
  
        const link = document.createElement("a");
        link.href = "#";  
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
    checkLoginBeforeCart();
    });
  
  
    window.scrollTo(0, 0);
  
    createPaginationButtons();  
  }
  

function createPaginationButtons() {
  const paginationContainer = document.getElementById("pagination-container");
  paginationContainer.innerHTML = ""; 

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.innerText = i;
    button.className = "pagination-button";
    button.addEventListener("click", () => displayPage(i));

    if (i === currentPage) {
      button.classList.add("active"); 
    }

    paginationContainer.appendChild(button);
  }
}

fetchAndDisplayProducts(`script/api.json`);


document.getElementById('searchForm').addEventListener('submit', async function (event) {
  event.preventDefault();

  const query = document.getElementById('searchInput').value.trim().toLowerCase(); // Get search query
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = ''; 

  if (!query) {
    return; 
  }

  try {
    const response = await fetch('script/api.json');

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const data = await response.json();
    const products = data.products;

    const filteredProducts = products.filter(product =>
      product.title.toLowerCase().includes(query)
    );

    if (filteredProducts.length === 0) {
      resultsContainer.innerHTML = '<p class="text-danger" style="margin:20px auto;text-align:center;">No products found for your search.</p>';
      return;
    }

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

      const pro = document.getElementById("products-container");
      pro.style.display = "none";
    });
    checkLoginBeforeCart()
  } catch (error) {
    console.error('Error fetching data:', error);
    resultsContainer.innerHTML = '<p class="text-danger">An error occurred while fetching the data.</p>';
  }
});



document.getElementById('searchInput').addEventListener('input', function () {
  const resultsContainer = document.getElementById('results');
  
  if (this.value.trim() === '') {
      resultsContainer.innerHTML = '';  
      resultsContainer.style.display = 'none'; 
      document.getElementById("products-container").style.display="block"

  } else {
      resultsContainer.style.display = ''; 
      // document.getElementById("products").style.display="block"
  }
});


searchInput.addEventListener('focus', function () {
this.style.borderColor = '#007BFF'; 
this.style.boxShadow = '0 0 8px rgba(0, 123, 255, 0.6)';  
});

 searchInput.addEventListener('blur', function () {
this.style.borderColor = '';  
this.style.boxShadow = '';  
});

 searchInput.addEventListener('input', function () {
if (this.value.trim() !== '') {
this.style.borderColor = '#28A745';  
this.style.boxShadow = '0 0 8px rgba(40, 167, 69, 0.6)'; 
} else {
this.style.borderColor = '#007BFF'; 
this.style.boxShadow = '0 0 8px rgba(0, 123, 255, 0.6)';  
}
});





    function checkLoginBeforeCart(){
      if (!(localStorage.getItem("currentUser"))) {
        const cartSymbols = document.getElementsByClassName("addtocartsympol");
        for (let i = 0; i < cartSymbols.length; i++) {
          cartSymbols[i].href = "login.html";
        }
      }
    }





// filter




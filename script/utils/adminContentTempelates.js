const productsLength = 100 + (localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')).length : 0);
const usersLength = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')).length : 0;
const ordersLength = localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders')).length : 0;

function getTopRatedProducts(){
  let products = JSON.parse(localStorage.getItem('products'));
  let topRatedProducts = products.sort((a,b) => b.rating - a.rating).slice(0, 3);
  return topRatedProducts;
}
const topRatedProducts = getTopRatedProducts();

function getLatestOrders(){
  let orders = localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders')) : [];
  let latestOrders = orders.slice(0, ordersLength > 3 ? 3 : ordersLength);
  return latestOrders;
}

export const contentTemplates = {
  dashboard: `
    <div class="container py-4">
      <!-- Top Summary Cards -->
      <div class="row g-4">
        <div class="col-md-4">
          <div class="card text-center">
            <div class="card-body card1">
              <h5 class="card-title">number of users </h5>
              <h2 class="usersCount">${usersLength}</h2>
              <p class="text-success">+30% this month</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card text-center">
            <div class="card-body card2">
              <h5 class="card-title ">Number of products</h5>
              <h2 class="productsCount">${productsLength}</h2>
              <p class="text-danger">-15% this month</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card text-center">
            <div class="card-body card3">
              <h5 class="card-title">number of orders</h5>
              <h2 class="ordersCount">${ordersLength}</h2>
              <p class="text-success">+23% this month</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Section: Charts and Lists -->
      <section class="mt-5 charts-and-lists">
        <div class="row">
          <!-- Earnings Chart -->
          <div class="col-lg-8 col-md-12 mb-4">
            <div class="earningAndSalesCharts">
              <div class="card">
                <div class="card-header">Earnings Chart</div>
                <div class="card-body">
                  <canvas id="earningsChart" height="100"></canvas>
                </div>
              </div>
            </div>
            <div class="card mb-4">
              <div class="card-header">Sales by category</div>
              <div class="card-body">
                <canvas id="polarAreaChart" height="100"></canvas>
              </div>
            </div>
          </div>

          <!-- Top rated products -->
          <div class="col-lg-4 col-md-12">
            <div class="card mb-4">
              <div class="card-header">Top Rated Products </div>
              <div class="card-body">

              <ul class="list-group list-group-flush">
              
                ${topRatedProducts.map((product, index) => `
                  <li class="list-group-item">
                    <span class="float-start">${index + 1} &nbsp; </span>
                    <span> ${product.title}</span>

                    <span class="float-end">${product.rating}/5</span>
                  </li>
                `).join('')}



              </ul>
              </div>
            </div>

            <!-- Top Customers -->
            <div class="card mb-4">
              <div class="card-header">Top Customers</div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">Robert Lewis <span class="float-end">$4.19K</span></li>
                <li class="list-group-item">Tom Barrett <span class="float-end">$3.56K</span></li>
                <li class="list-group-item">Tom Barrett <span class="float-end">$3.56K</span></li>
              </ul>
            </div>

            <!-- Recent Orders -->
            <div class="card">
              <div class="card-header">Recent Orders</div>
              <ul class="list-group list-group-flush" id="recentOrdersList">
                
                ${getLatestOrders().map(order => `
                  <li class="list-group
                  -item">
                    <span class="float-start">${order.date}</span>
                    <span class="float-end">$${order.total}</span>
                  </li>
                `).join('')}

              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Section: Top Selling Products -->
      <section class="mt-5">
        <div class="card">
          <div class="card-header">Top Selling Products</div>
          <div class="table-responsive">
            <table class="table" id="topSellingProductsTable">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Stock</th>
                  <th>Total Sales</th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  `,
  users: `
    <div class="container py-4">
      <h2>Manage Users</h2>
      <div class="table-responsive">
        <table class="table" id="usersTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
    </div>
  `,
  products: `
    <div class="container py-4">
      <h2>Moderate Product Listings</h2>
      <div class="table-responsive">
        <table class="table" id="productsTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
    </div>
  `,
 
};

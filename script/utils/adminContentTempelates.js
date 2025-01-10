export const contentTemplates = {
  dashboard: `
    <div class="container py-4">
      <!-- Top Summary Cards -->
      <div class="row g-4">
        <div class="col-md-4">
          <div class="card text-center">
            <div class="card-body card1">
              <h5 class="card-title">Total Customers</h5>
              <h2>307.48K</h2>
              <p class="text-success">+30% this month</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card text-center">
            <div class="card-body card2">
              <h5 class="card-title">Total Revenue</h5>
              <h2>$30.58K</h2>
              <p class="text-danger">-15% this month</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card text-center">
            <div class="card-body card3">
              <h5 class="card-title">Total Deals</h5>
              <h2>2.48K</h2>
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

          <!-- Top Countries by Sales and Recent Orders -->
          <div class="col-lg-4 col-md-12">
            <!-- Top Countries -->
            <div class="card mb-4">
              <div class="card-header">Top Countries by Sells</div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">Australia <span class="float-end">7.12K</span></li>
                <li class="list-group-item">Belgium <span class="float-end">4.15K</span></li>
                <li class="list-group-item">Canada <span class="float-end">6.45K</span></li>
              </ul>
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
                <!-- Dynamically populated -->
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
                <!-- Dynamically populated -->
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
            <!-- Users will be dynamically populated here -->
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
            <!-- Products will be dynamically populated here -->
          </tbody>
        </table>
      </div>
    </div>
  `,
 
};

import { initializeEarningsChart, initializePolarAreaChart } from './utils/charts.js';

// Content templates for different pages
const contentTemplates = {
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
  orders: `
    <h2>Orders</h2>
    <p>Manage all orders here.</p>
  `,
};

// Function to fetch and display top-selling products
function displayTopSellingProducts() {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  const sales = JSON.parse(localStorage.getItem('sales')) || [];
  const topSellingProductsTable = document.getElementById('topSellingProductsTable').getElementsByTagName('tbody')[0];

  topSellingProductsTable.innerHTML = '';

  products.forEach((product, index) => {
    const row = topSellingProductsTable.insertRow();
    row.insertCell(0).textContent = index + 1;
    row.insertCell(1).textContent = product.name;
    row.insertCell(2).textContent = product.category;
    row.insertCell(3).textContent = product.stock > 0 ? 'In Stock' : 'Out of Stock';
    row.insertCell(4).textContent = sales.reduce((total, sale) => {
      const productSale = sale.productsSold.find(p => p.productId === product.id);
      return total + (productSale ? productSale.quantitySold : 0);
    }, 0);
  });
}

// Function to fetch and display recent orders
function displayRecentOrders() {
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  const recentOrdersList = document.getElementById('recentOrdersList');

  recentOrdersList.innerHTML = '';

  orders.slice(0, 5).forEach(order => {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item';
    listItem.textContent = `Order #${order.id} - Total: $${order.total}`;
    recentOrdersList.appendChild(listItem);
  });
}

// Function to fetch and display users in the table
function displayUsers() {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const usersTable = document.getElementById('usersTable').getElementsByTagName('tbody')[0];

  usersTable.innerHTML = '';

  users.forEach(user => {
    const row = usersTable.insertRow();
    row.insertCell(0).textContent = user.id;
    row.insertCell(1).textContent = user.name;
    row.insertCell(2).textContent = user.email;
    row.insertCell(3).textContent = user.role;
    row.insertCell(4).textContent = user.address || 'N/A';
    row.insertCell(5).textContent = user.phoneNumber || 'N/A';

    // Add buttons for actions (Edit and Delete)
    const actionsCell = row.insertCell(6);
    const editButton = document.createElement('button');
    editButton.className = 'btn btn-warning btn-sm me-2';
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => {
      editUser(user);
    });

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-danger btn-sm';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      deleteUser(user.id);
    });

    actionsCell.appendChild(editButton);
    actionsCell.appendChild(deleteButton);
  });
}

let currentUser = null;

function editUser(user) {
  currentUser = user;

  // Populate modal fields
  document.getElementById('userName').value = user.name;
  document.getElementById('userRole').value = user.role;

  // Show the modal
  const editUserModal = new bootstrap.Modal(document.getElementById('editUserModal'));
  editUserModal.show();
}

// Save changes when the "Save Changes" button is clicked
document.getElementById('saveUserChanges')?.addEventListener('click', () => {
  const newName = document.getElementById('userName').value;
  const newRole = document.getElementById('userRole').value;

  if (newName && newRole && currentUser) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map(u =>
      u.id === currentUser.id ? { ...u, name: newName, role: newRole } : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    displayUsers(); // Refresh the table
    alert('User updated successfully!');

    // Hide the modal
    const editUserModal = bootstrap.Modal.getInstance(document.getElementById('editUserModal'));
    editUserModal.hide();
  }
});

let userIdToDelete = null;

function deleteUser(userId) {
  userIdToDelete = userId;

  // Show the modal
  const deleteUserModal = new bootstrap.Modal(document.getElementById('deleteUserModal'));
  deleteUserModal.show();
}

// Confirm deletion when the "Delete" button is clicked
document.getElementById('confirmDeleteUser')?.addEventListener('click', () => {
  if (userIdToDelete) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.filter(u => u.id !== userIdToDelete);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    displayUsers(); // Refresh the table
    alert('User deleted successfully!');

    // Hide the modal
    const deleteUserModal = bootstrap.Modal.getInstance(document.getElementById('deleteUserModal'));
    deleteUserModal.hide();
  }
});

// Function to fetch and display products in the table
function displayProducts() {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  const productsTable = document.getElementById('productsTable').getElementsByTagName('tbody')[0];

  productsTable.innerHTML = '';

  products.forEach(product => {
    const row = productsTable.insertRow();
    row.insertCell(0).textContent = product.id;
    row.insertCell(1).textContent = product.name;
    row.insertCell(2).textContent = product.category;
    row.insertCell(3).textContent = `$${product.price}`;
    row.insertCell(4).textContent = product.stock;
    row.insertCell(5).textContent = product.status || 'Pending'; // Default status

    // Add buttons for actions (Approve and Reject)
    const actionsCell = row.insertCell(6);
    const approveButton = document.createElement('button');
    approveButton.className = 'btn btn-success btn-sm me-2';
    approveButton.textContent = 'Approve';
    approveButton.addEventListener('click', () => {
      updateProductStatus(product.id, 'Approved');
    });

    const rejectButton = document.createElement('button');
    rejectButton.className = 'btn btn-danger btn-sm';
    rejectButton.textContent = 'Reject';
    rejectButton.addEventListener('click', () => {
      updateProductStatus(product.id, 'Rejected');
    });

    actionsCell.appendChild(approveButton);
    actionsCell.appendChild(rejectButton);
  });
}

let productIdToUpdate = null;

function updateProductStatus(productId, status) {
  productIdToUpdate = productId;

  // Populate modal fields
  document.getElementById('productStatus').value = status;

  // Show the modal
  const updateProductStatusModal = new bootstrap.Modal(document.getElementById('updateProductStatusModal'));
  updateProductStatusModal.show();
}

// Save changes when the "Save Changes" button is clicked
document.getElementById('saveProductStatus')?.addEventListener('click', () => {
  const newStatus = document.getElementById('productStatus').value;

  if (newStatus && productIdToUpdate) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const updatedProducts = products.map(p =>
      p.id === productIdToUpdate ? { ...p, status: newStatus } : p
    );
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    displayProducts(); // Refresh the table
    alert(`Product status updated to: ${newStatus}`);

    // Hide the modal
    const updateProductStatusModal = bootstrap.Modal.getInstance(document.getElementById('updateProductStatusModal'));
    updateProductStatusModal.hide();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const contentContainer = document.getElementById('contentContainer');

  // Load the dashboard initially
  if (contentContainer && contentTemplates.dashboard) {
    contentContainer.innerHTML = contentTemplates.dashboard;
    initializeEarningsChart(); // Initialize chart for the dashboard
    initializePolarAreaChart();
    displayTopSellingProducts();
    displayRecentOrders();
  }

  // Add event handler for navigation
  document.addEventListener('click', e => {
    const target = e.target;
    if (target.matches('.nav-link[data-page]')) {
      e.preventDefault();
      const page = target.getAttribute('data-page');

      // Load content and charts dynamically
      if (contentTemplates[page]) {
        contentContainer.innerHTML = contentTemplates[page];

        if (page === 'dashboard') {
          initializeEarningsChart(); // Initialize chart for the dashboard
          initializePolarAreaChart();
          displayTopSellingProducts();
          displayRecentOrders();
        } else if (page === 'users') {
          displayUsers(); // Display users when the Users page is loaded
        } else if (page === 'products') {
          displayProducts(); // Display products when the Products page is loaded
        }
      }

      // Update navigation active state
      document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
      target.classList.add('active');

      // Collapse the sidebar if open
      const sidebar = document.getElementById('sidebar');
      if (sidebar.classList.contains('show')) {
        const bsCollapse = new bootstrap.Collapse(sidebar, { toggle: false });
        bsCollapse.hide();
      }
    }
  });
});
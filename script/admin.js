import { contentTemplates } from './utils/adminContentTempelates.js';
const user = JSON.parse(localStorage.getItem('currentUser'));

if (!user || user.role !== 'admin') {
document.body.innerHTML = `
    <div style="display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f8d7da; color: #721c24; font-family: Arial, sans-serif;">
      <div style="text-align: center;">
        <h1>Not Authorized</h1>
        <p>You do not have permission to access this page.</p>
        <a href="login.html" style="color: #721c24; text-decoration: underline;">Go to Login</a>
      </div>
    </div>
  `;
  throw new Error('Not Authorized');}
import { initializeEarningsChart, initializePolarAreaChart } from './utils/charts.js';


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

  document.getElementById('userName').value = user.name;
  document.getElementById('userRole').value = user.role;

  const editUserModal = new bootstrap.Modal(document.getElementById('editUserModal'));
  editUserModal.show();
}

document.getElementById('saveUserChanges').addEventListener('click', () => {
  const newName = document.getElementById('userName').value;
  const newRole = document.getElementById('userRole').value;

  if (newName && newRole && currentUser) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map(u =>
      u.id === currentUser.id ? { ...u, name: newName, role: newRole } : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    displayUsers(); 
    alert('User updated successfully!');

    const editUserModal = bootstrap.Modal.getInstance(document.getElementById('editUserModal'));
    editUserModal.hide();
  }
});




let currentProduct = null;

function editProduct(product) {
  currentProduct = product;

  document.getElementById('productName').value = product.name;
  document.getElementById('productCategory').value = product.category;
  document.getElementById('productPrice').value = product.price;
  document.getElementById('productStock').value = product.stock;
  document.getElementById('productStatus').value = product.status || 'Pending';

  const editProductModal = new bootstrap.Modal(document.getElementById('editProductModal'));
  editProductModal.show();
}

let productIdToDelete = null;

function deleteProduct(productId) {
  productIdToDelete = productId;

  const deleteProductModal = new bootstrap.Modal(document.getElementById('deleteProductModal'));
  deleteProductModal.show();
}
document.getElementById('confirmDeleteProduct').addEventListener('click', () => {
  if (productIdToDelete) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const updatedProducts = products.filter(product => product.id !== productIdToDelete);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    displayProducts();  
    alert('Product deleted successfully!');

    const deleteProductModal = bootstrap.Modal.getInstance(document.getElementById('deleteProductModal'));
    deleteProductModal.hide();
  }
});
document.getElementById('saveProductChanges').addEventListener('click', () => {
  const newName = document.getElementById('productName').value;
  const newCategory = document.getElementById('productCategory').value;
  const newPrice = parseFloat(document.getElementById('productPrice').value);
  const newStock = parseInt(document.getElementById('productStock').value);
  const newStatus = document.getElementById('productStatus').value;

  if (newName && newCategory && newPrice && newStock && newStatus && currentProduct) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const updatedProducts = products.map(p =>
      p.id === currentProduct.id ? { ...p, name: newName, category: newCategory, price: newPrice, stock: newStock, status: newStatus } : p
    );
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    displayProducts(); 
    alert('Product updated successfully!');

    const editProductModal = bootstrap.Modal.getInstance(document.getElementById('editProductModal'));
    editProductModal.hide();
  }
});


let userIdToDelete = null;

function deleteUser(userId) {
  userIdToDelete = userId;

  const deleteUserModal = new bootstrap.Modal(document.getElementById('deleteUserModal'));
  deleteUserModal.show();
}

document.getElementById('confirmDeleteUser')?.addEventListener('click', () => {
  if (userIdToDelete) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.filter(u => u.id !== userIdToDelete);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    displayUsers(); 
    alert('User deleted successfully!');

    const deleteUserModal = bootstrap.Modal.getInstance(document.getElementById('deleteUserModal'));
    deleteUserModal.hide();
  }
});

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
    row.insertCell(5).textContent = product.status || 'Pending';

    const actionsCell = row.insertCell(6);

    const editButton = document.createElement('button');
    editButton.className = 'btn btn-warning btn-sm me-2';
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => {
      editProduct(product);
    });

    const approveButton = document.createElement('button');
    approveButton.className = 'btn btn-success btn-sm me-2';
    approveButton.textContent = 'Approve';
    approveButton.addEventListener('click', () => {
      updateProductStatus(product.id, 'Approved');
    });

    const rejectButton = document.createElement('button');
    rejectButton.className = 'btn btn-danger btn-sm me-2';
    rejectButton.textContent = 'Reject';
    rejectButton.addEventListener('click', () => {
      updateProductStatus(product.id, 'Rejected');
    });

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-danger btn-sm';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      deleteProduct(product.id);
    });

    actionsCell.appendChild(editButton);
    actionsCell.appendChild(approveButton);
    actionsCell.appendChild(rejectButton);
    actionsCell.appendChild(deleteButton);
  });
}

let productIdToUpdate = null;

function updateProductStatus(productId, status) {
  productIdToUpdate = productId;

  
  document.getElementById('productStatus').value = status;

  const updateProductStatusModal = new bootstrap.Modal(document.getElementById('updateProductStatusModal'));
  updateProductStatusModal.show();
}

document.getElementById('saveProductStatus')?.addEventListener('click', () => {
  const newStatus = document.getElementById('productStatus').value;

  if (newStatus && productIdToUpdate) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const updatedProducts = products.map(p =>
      p.id === productIdToUpdate ? { ...p, status: newStatus } : p
    );
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    displayProducts();  
    alert(`Product status updated to: ${newStatus}`);

    const updateProductStatusModal = bootstrap.Modal.getInstance(document.getElementById('updateProductStatusModal'));
    updateProductStatusModal.hide();
  }
});
function initializeLocalStorage() {
  if (!localStorage.getItem('products')) {
    const sampleProducts = [
      {
        id: 1,
        name: "Essence Mascara Lash Princess",
        category: "beauty",
        price: 9.99,
        stock: 50,
        status: "Pending"
      },
      {
        id: 2,
        name: "Wireless Bluetooth Earbuds",
        category: "electronics",
        price: 29.99,
        stock: 100,
        status: "Approved"
      },
      {
        id: 3,
        name: "Organic Green Tea",
        category: "food",
        price: 5.99,
        stock: 200,
        status: "Rejected"
      }
    ];

    localStorage.setItem('products', JSON.stringify(sampleProducts));
  }

  if (!localStorage.getItem('users')) {
    const sampleUsers = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        role: "Admin",
        address: "123 Main St, City",
        phoneNumber: "01018714720"
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        role: "User",
        address: "456 Elm St, Town",
        phoneNumber: "01023456770"
      },
      {
        id: 3,
        name: "Alice Johnson",
        email: "alice@example.com",
        role: "User",
        address: "789 Oak St, Village",
        phoneNumber: "0104695678"
      }
    ];

    localStorage.setItem('users', JSON.stringify(sampleUsers));
  }

  if (!localStorage.getItem('sales')) {
    const sampleSales = [
      {
        id: 1,
        productsSold: [
          { productId: 1, quantitySold: 10 },
          { productId: 2, quantitySold: 5 }
        ]
      },
      {
        id: 2,
        productsSold: [
          { productId: 1, quantitySold: 15 },
          { productId: 3, quantitySold: 20 }
        ]
      }
    ];

    localStorage.setItem('sales', JSON.stringify(sampleSales));
  }

  if (!localStorage.getItem('orders')) {
    const sampleOrders = [
      {
        id: 1,
        customerName: "John Doe",
        total: 120.50,
        status: "Pending",
        date: "2023-10-01"
      },
      {
        id: 2,
        customerName: "Jane Smith",
        total: 89.99,
        status: "Shipped",
        date: "2023-10-02"
      },
      {
        id: 3,
        customerName: "Alice Johnson",
        total: 45.00,
        status: "Delivered",
        date: "2023-10-03"
      }
    ];

    localStorage.setItem('orders', JSON.stringify(sampleOrders));
  }
}
document.addEventListener('DOMContentLoaded', () => {
  const contentContainer = document.getElementById('contentContainer');
  initializeLocalStorage(); 
  
  if (contentContainer && contentTemplates.dashboard) {
    contentContainer.innerHTML = contentTemplates.dashboard;
    
    initializeEarningsChart(); 
    initializePolarAreaChart();
    displayTopSellingProducts();
    displayRecentOrders();
  }

  document.addEventListener('click', e => {
    const target = e.target;
    if (target.matches('.nav-link[data-page]')) {
      e.preventDefault();
      const page = target.getAttribute('data-page');

      if (contentTemplates[page]) {
        contentContainer.innerHTML = contentTemplates[page];

        if (page === 'dashboard') {
          initializeEarningsChart();
          initializePolarAreaChart();
          displayTopSellingProducts();
          displayRecentOrders();
        } else if (page === 'users') {
          displayUsers();  
        } else if (page === 'products') {
          displayProducts();  
        }
      }

       document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
      target.classList.add('active');

       const sidebar = document.getElementById('sidebar');
      if (sidebar.classList.contains('show')) {
        const bsCollapse = new bootstrap.Collapse(sidebar, { toggle: false });
        bsCollapse.hide();
      }
    }
  });
});
 document.getElementById("logoutBtn").addEventListener("click", function () {
   localStorage.removeItem("currentUser");

 
  
  if(localStorage.getItem("sales")) {
     localStorage.removeItem("sales");
  }

  
   window.location.href = "login.html";  
});
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
    listItem.textContent = `Order #${order.id} - Total: $${order.totalPrice}`;
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
    editButton.className = 'btn btn-warning btn-sm me-2 my-2';
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => {
      editUser(user);
    });

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-danger btn-sm me-2 my-2';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      deleteUser(user.id);
    });
const addUserButton = document.createElement('button');
addUserButton.className = 'btn btn-primary btn-sm';
addUserButton.textContent = 'Add User';
addUserButton.addEventListener('click', addUser);


    

    actionsCell.appendChild(editButton);
    actionsCell.appendChild(deleteButton);
    actionsCell.appendChild(addUserButton);
  });
}

let currentUser = null;
function addUser(){

  const addUserModal = new bootstrap.Modal(document.getElementById('addUserModal'));
  addUserModal.show();

}

function editUser(user) {
  currentUser = user;

  document.getElementById('userName').value = user.name;
  document.getElementById('userRole').value = user.role;

  const editUserModal = new bootstrap.Modal(document.getElementById('editUserModal'));
  editUserModal.show();
}
document.getElementById('saveNewUser').addEventListener('click', () => {
  const name = document.getElementById('addUserName').value;
  const email = document.getElementById('addUserEmail').value;
  const role = document.getElementById('addUserRole').value;
  const address = document.getElementById('addUserAddress').value;
  const phoneNumber = document.getElementById('addUserPhone').value;

  if (name && email && role) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const newUser = {
      id: users.length + 1,
      name,
      email,
      role,
      address,
      phoneNumber,
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    displayUsers(); 
    alert('User added successfully!');

    const addUserModal = bootstrap.Modal.getInstance(document.getElementById('addUserModal'));
    addUserModal.hide();
  }
}
);
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
function displayOrders() {
  const orders = localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders'))  : [];

  const ordersTable = document.getElementById('ordersTable').getElementsByTagName('tbody')[0];

  ordersTable.innerHTML = '';

  orders.forEach(order => {
    const row = ordersTable.insertRow();
    row.insertCell(0).textContent = order.id;
    row.insertCell(1).textContent = order.user;
    row.insertCell(2).textContent = `$${order.totalPrice}`;
    row.insertCell(3).textContent = order.address ? `${order.address.street}, ${order.address.city}, ${order.address.country}, ${order.address.zipCode}` : 'N/A';
    row.insertCell(4).textContent = order.paymentMethod;
    row.insertCell(5).textContent = order.status || 'Pending';

    const actionsCell = row.insertCell(6);
    const cancelOrder = document.createElement('button');
    cancelOrder.className = 'btn btn-danger btn-sm';
    cancelOrder.textContent = 'Cancel';
    cancelOrder.addEventListener('click', () => {
      deleteOrder(order.id);
    });

    actionsCell.appendChild(cancelOrder);

  });
}

function deleteOrder (orderId) {
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  const updatedOrders = orders.filter(order => order.id !== orderId);
  localStorage.setItem('orders', JSON.stringify(updatedOrders));
  displayOrders();
  alert('Order deleted successfully!');
}

function displayProducts() {
  const products = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products'))  : [];
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
    approveButton.textContent = 'activate';
    approveButton.addEventListener('click', () => {
      updateProductStatus(product.id, 'Approved');
    });

    const rejectButton = document.createElement('button');
    rejectButton.className = 'btn btn-danger btn-sm me-2';
    rejectButton.textContent = 'deactivate';
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
  //get product from local storage and add activate field to it true or false based on status

  const product = JSON.parse(localStorage.getItem('products')).find(p => p.id === productId);
  const activate = status === 'Approved' ? true : false;
  product.activate = activate;

  //update product in local storage
  const products = JSON.parse(localStorage.getItem('products')) || [];
  const updatedProducts = products.map(p =>
    p.id === productId ? { ...p, status, activate } : p
  );
  localStorage.setItem('products', JSON.stringify(updatedProducts));
  displayProducts();

  
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

document.addEventListener('DOMContentLoaded', () => {
 
  const contentContainer = document.getElementById('contentContainer');
  
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
        }else if(page ==='orders'){
          displayOrders();
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

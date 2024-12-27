import { renderCustomerContent } from './customer.js';
import { renderAdminContent } from './admin.js';
import { renderSellerContent } from './seller.js';

const userInfo = document.getElementById('userInfo');
const userSpecificContent = document.getElementById('userSpecificContent');

if (userInfo && userSpecificContent) {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    userInfo.innerHTML = `<h3>Welcome, ${user.name || 'User'}!</h3>`;

    switch (user.userType) {
      case 'customer':
        userSpecificContent.innerHTML = renderCustomerContent();
        break;
      case 'admin':
        userSpecificContent.innerHTML = renderAdminContent();
        break;
      case 'seller':
        userSpecificContent.innerHTML = renderSellerContent();
        break;
      default:
        userSpecificContent.innerHTML = `<p>Invalid user type. Please contact support.</p>`;
    }
  } else {
    userInfo.innerHTML = '<p>No user data found. Please log in.</p>';
    window.location.href = 'index.html';
  }
}

// Logout Functionality
const logoutButton = document.getElementById('logoutButton');
if (logoutButton) {
  logoutButton.addEventListener('click', () => {
    localStorage.removeItem('user');
    alert('Logged out successfully!');
    window.location.href = 'login.html';
  });
}
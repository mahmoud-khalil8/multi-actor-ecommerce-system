import { renderCustomerContent } from './customer.js';
import { renderAdminContent } from './admin.js';
import { renderSellerContent } from './seller.js';

const mainWrapper = document.getElementById('mainWrapper');

if (mainWrapper) {
  console.log('Profile page loaded!');
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {

    switch (user.userType) {
      case 'customer':
        mainWrapper.innerHTML = renderCustomerContent();
        break;
      case 'admin':
        mainWrapper.innerHTML = renderAdminContent();
        break;
      case 'seller':
        mainWrapper.innerHTML = renderSellerContent();
        break;
      default:
        mainWrapper.innerHTML = `<p>Invalid user type. Please contact support.</p>`;
    }
  } else {
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

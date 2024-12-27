const userInfo = document.getElementById('userInfo');
const userSpecificContent = document.getElementById('userSpecificContent');

if (userInfo && userSpecificContent) {
  const user = JSON.parse(localStorage.getItem('user')); 
  if (user) {
    userInfo.innerHTML = `<h3>Welcome, ${user.name || 'User'}!</h3>`;

    if (user.userType === 'customer') {
      userSpecificContent.innerHTML = `
        <h4>Welcome, Customer!</h4>
        <p>Here are some exclusive deals for you:</p>
        <ul>
          <li>Deal 1</li>
          <li>Deal 2</li>
        </ul>
      `;
    } else if (user.userType === 'admin') {
      userSpecificContent.innerHTML = `
        <h4>Welcome, Admin!</h4>
        <p>Manage the platform and users:</p>
        <ul>
          <li>User Management</li>
          <li>Platform Settings</li>
        </ul>
      `;
    } else if (user.userType === 'seller') {
      userSpecificContent.innerHTML = `
        <h4>Welcome, Seller!</h4>
        <p>Manage your products and sales:</p>
        <ul>
          <li>Product 1</li>
          <li>Product 2</li>
        </ul>
      `;
    } else {
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
const userInfo = document.getElementById('userInfo');
const userSpecificContent = document.getElementById('userSpecificContent');
if (userInfo && userSpecificContent) {
  const user = JSON.parse(localStorage.getItem('user')); // Retrieve user data
  if (user) {
    userInfo.innerHTML = `
      <p><strong>First Name:</strong> ${user.firstName}</p>
      <p><strong>Last Name:</strong> ${user.lastName}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>User Type:</strong> ${user.userType}</p>
    `;

    if (user.userType === 'customer') {
      userSpecificContent.innerHTML = `
        <h4>Welcome, Customer!</h4>
        <p>Here are some exclusive deals for you:</p>
        <ul>
          <li>Deal 1</li>
          <li>Deal 2</li>
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
    window.location.href = 'index.html'; 
  });
}

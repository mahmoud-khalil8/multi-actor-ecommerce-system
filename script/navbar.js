// Handle profile button click
const profile = document.getElementById("profilebtn");
if (profile) {
  profile.addEventListener("click", () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) return;

    const currentUserRole = currentUser.role;
    switch (currentUserRole) {
      case "admin":
        window.location.href = "admin-dashboard.html";
        break;
      case "customer":
        window.location.href = "customer-dashboard.html";
        break;
      case "seller":
        window.location.href = "seller/index.html";
        break;
      default:
        console.error("Unknown user role:", currentUserRole);
    }
  });
}
// Function to check if a user is logged in
function checkLoginStatus() {
  // Get the current user from localStorage
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // Get references to the Orders and Cart links
  let ordersLink = document.getElementById("ordersLink");
  let cartLink = document.getElementById("cartLink");
  let loginButton = document.getElementById("loginbutton");
  let profileLink = document.getElementById("profileLink");

  if (currentUser) {
    // User is logged in: Show Orders and Cart, hide Login button
    if (ordersLink) ordersLink.style.display = "block";
    if (cartLink) cartLink.style.display = "block";
    if (profileLink) profileLink.style.display = "block";
    if (loginButton) loginButton.style.display = "none";
    
  } else {
    // User is not logged in: Hide Orders and Cart, show Login button
    if (ordersLink) ordersLink.style.display = "none";
    if (cartLink) cartLink.style.display = "none";
    if (profileLink) profileLink.style.display = "none";
    if (loginButton) loginButton.style.display = "block";
  }
}

// Run the checkLoginStatus function when the page loads
window.onload = checkLoginStatus;
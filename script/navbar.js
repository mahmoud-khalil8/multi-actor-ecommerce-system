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
  console.log("Checking login status...");
  // Get the current user from localStorage
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // Get references to the Orders and Cart links
  let ordersLink = document.getElementById("ordersLink");
  let cartLink = document.getElementById("cartLink");
  let loginButton = document.getElementById("loginbutton");
  let profileLink = document.getElementById("profileLink");
  if (currentUser) {
    // User is logged in: Show Orders and Cart, hide Login button
    if (ordersLink) ordersLink.classList.remove("hidden");
    if (cartLink) cartLink.classList.remove("hidden");
    if (profileLink) profileLink.classList.remove("hidden");
    if (loginButton) loginButton.classList.add("hidden");
    
  } else {
    // User is not logged in: Hide Orders and Cart, show Login button
    if (ordersLink) ordersLink.classList.add("hidden");
    if (cartLink) cartLink.classList.add("hidden");
    if (profileLink) profileLink.classList.add("hidden");
    if (loginButton) loginButton.classList.remove("hidden");
  }
}

// Run the checkLoginStatus function when the page loads
window.onload = checkLoginStatus;
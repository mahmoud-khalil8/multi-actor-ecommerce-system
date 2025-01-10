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
function checkLoginStatus() {
  console.log("Checking login status...");
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));

  let ordersLink = document.getElementById("ordersLink");
  let cartLink = document.getElementById("cartLink");
  let loginButton = document.getElementById("loginbutton");
  let profileLink = document.getElementById("profileLink");
  if (currentUser) {

    if (ordersLink) ordersLink.classList.remove("hidden");
    if (cartLink) cartLink.classList.remove("hidden");
    if (profileLink) profileLink.classList.remove("hidden");
    if (loginButton) loginButton.classList.add("hidden");
    
  } else {
    if (ordersLink) ordersLink.classList.add("hidden");
    if (cartLink) cartLink.classList.add("hidden");
    if (profileLink) profileLink.classList.add("hidden");
    if (loginButton) loginButton.classList.remove("hidden");
  }
}

window.onload = checkLoginStatus;
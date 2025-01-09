
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
        window.location.href = "seller-dashboard.html";
        break;
      default:
        console.error("Unknown user role:", currentUserRole);
    }
  });
}
const orders = [
    {
      "id": 101,
      "userId": "jji02NFzb9YoCBg9KnBGBn1fWJi1", // userId is a string
      "sellerid": 3,
      "items": [
        {
          "productId": 201,
          "quantity": 2,
          "price": 99.99
        }
      ],
      "total": 199.98,
      "shippingAddress": "123 Main St, City, Country",
      "paymentMethod": "Credit Card",
      "status": "Delivered"
    }
  ];
  
  // Store orders in localStorage
  localStorage.setItem('orders', JSON.stringify(orders));
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  
  // Retrieve the orders from localStorage and parse it
  const storedOrders = JSON.parse(localStorage.getItem("orders"));
  
  // Function to check and display order details if userId matches currentUser
  function checkAndDisplayOrderDetails() {
    const container = document.getElementById("order-details");

    // Check if the currentUser exists and if storedOrders are available
    if (currentUser && storedOrders) {
      // Loop through the orders and check if userId matches currentUser
      const userOrder = storedOrders.find(order => order.userId === currentUser.id); // Compare as strings
  
      if (userOrder) {
        // If a matching order is found, display the total in the body
  
        // Access the items array for quantity and price
        let itemsHTML = "";
        userOrder.items.forEach(item => {
          itemsHTML += `
            <tr>
              <td>Quantity</td>
              <td>${item.quantity}</td>
            </tr>
            <tr>
              <td>Price</td>
              <td>$${item.price}</td>
            </tr>
          `;
        });
  
        container.innerHTML = `
          <table>
            <tbody>
              ${itemsHTML}
              <tr>
                <td>Payment Method</td>
                <td>${userOrder.paymentMethod}</td>
              </tr>
              <tr>
                <td>Shipping Address</td>
                <td>${userOrder.shippingAddress}</td>
              </tr>
              <tr>
                <td>Status</td>
                <td>${userOrder.status}</td>
              </tr>
              <tr>
                <td>Total</td>
                <td>$${userOrder.total}</td>
              </tr>
            </tbody>
          </table>
        `;
      } else {
        container.innerHTML="No orders found for this user"
      }
    } else {
      console.log("Current user or orders not found.");
    }
  }
  
  // Call the function to check and display the order details
  checkAndDisplayOrderDetails();
  
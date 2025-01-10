// Store orders in localStorage if not already present
localStorage.getItem('orders') ? '' : localStorage.setItem('orders', JSON.stringify([]));

// Retrieve the current user and orders from localStorage
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const storedOrders = JSON.parse(localStorage.getItem("orders"));

// Function to display order details in the table
function displayOrderDetails() {
  const orderInfo = document.querySelector(".orderInfo");

  // Check if the currentUser exists and if storedOrders are available
  if (currentUser && storedOrders) {
    // Filter orders for the current user
    const userOrders = storedOrders.filter(order => order.user === currentUser.id);

    if (userOrders.length > 0) {
      // Loop through the user's orders and populate the table
      userOrders.forEach((order, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${order.user}</td>
          <td>$${order.totalPrice}</td>
          <td>${order.address ? `${order.address.street}, ${order.address.city}, ${order.address.country}, ${order.address.zipCode}` : "N/A"}</td>
          <td>${order.paymentMethod}</td>
          <td>${order.status || "Pending"}</td>
        `;

        orderInfo.appendChild(row);
      });
    } else {
      // If no orders are found for the user
      orderInfo.innerHTML = `
        <tr>
          <td colspan="9" style="text-align: center;">No orders found for this user.</td>
        </tr>
      `;
    }
  } else {
    // If current user or orders are not found
    orderInfo.innerHTML = `
      <tr>
        <td colspan="9" style="text-align: center;">Current user or orders not found.</td>
      </tr>
    `;
  }
}

// Call the function to display the order details
displayOrderDetails();
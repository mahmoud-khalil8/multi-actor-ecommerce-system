localStorage.getItem('orders') ? '' : localStorage.setItem('orders', JSON.stringify([]));

const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const storedOrders = JSON.parse(localStorage.getItem("orders"));

function displayOrderDetails() {
  const orderInfo = document.querySelector(".orderInfo");

  if (currentUser && storedOrders) {
    const userOrders = storedOrders.filter(order => order.user === currentUser.id);

    if (userOrders.length > 0) {
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
      orderInfo.innerHTML = `
        <tr>
          <td colspan="9" style="text-align: center;">No orders found for this user.</td>
        </tr>
      `;
    }
  } else {
    orderInfo.innerHTML = `
      <tr>
        <td colspan="9" style="text-align: center;">Current user or orders not found.</td>
      </tr>
    `;
  }
}

displayOrderDetails();

var targetTable2 = document.querySelector("table");
var  orderInfo2 =document.querySelector(".orderInfo");

var currentSellerId2 = 2;


var originalData2 = localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders')):[]
var getData2 = [...originalData2]
var sellerOrders2 = getData2.filter(order => order.sellerId === currentSellerId2); 




function showInfo() {
  orderInfo2.innerHTML = ""; 

  if (sellerOrders2.length > 0) {
    for (var i = 0; i < sellerOrders2.length; i++) {
      var order = sellerOrders2[i];
      if (order) {
        // Loop through the items in the order
        for (var j = 0; j < order.items.length; j++) {
          var item = order.items[j];

          // Determine the status box class based on the order status
          var statusClass = order.status.toLowerCase() === "pending" ? "status-pending" : "status-succeeded";
          var statusBox = `<span class="status-box ${statusClass}">${order.status}</span>`;

          var createElement2 = `<tr class="productDetails">
                                <td>${i + 1}</td>
                                <td>${order.userId}</td>
                                <td>${item.productId}</td>
                                <td>${item.quantity}</td>
                                <td>${item.price}</td>
                                <td>${order.total}</td>
                                <td>${order.shippingAddress}</td>
                                <td>${order.paymentMethod}</td>
                                <td>${statusBox}</td>
                              </tr>`;
          orderInfo2.innerHTML += createElement2;
        }
      }
    }
  } else {
    orderInfo2.innerHTML = `<tr class="employeeDetails"><td class="empty" colspan="11" align="center">No data available in table</td></tr>`;
  }
}

// Call the function to display orders
showInfo();

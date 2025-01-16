var targetTable2 = document.querySelector("table");
  var orderInfo2 = document.querySelector(".orderInfo");

  var currentSellerId2 = localStorage.getItem("currentUser") ? JSON.parse(localStorage.getItem("currentUser")).id : 0;

  var originalData2 = localStorage.getItem("orders") ? JSON.parse(localStorage.getItem("orders")) : [];

  var sellerOrders2 = originalData2.filter(order => {
    console.log(order)
    return order.products.some(product => product.sellerId === currentSellerId2);
  });

  console.log(sellerOrders2); 

  function showInfo() {
    orderInfo2.innerHTML = ""; 

    if (sellerOrders2.length > 0) {
      for (var i = 0; i < sellerOrders2.length; i++) {
        var order = sellerOrders2[i];

        for (var j = 0; j < order.products.length; j++) {
          var product = order.products[j];

          if (product.sellerId === currentSellerId2) {
            var statusClass = "shipped" ;
            var statusBox = `<span class="status-box ${statusClass}">${statusClass}</span>`;
            let username = JSON.parse(localStorage.getItem("users")).find(user => user.id === order.user).name;
            console.log(username)
            var createElement2 = `
              <tr class="productDetails">
                <td>${i + 1}</td>
                <td>${username}</td>
                <td>${product.name}</td>
                <td>${product.quantity}</td>
                <td>$${product.price}</td>
                <td>$${order.totalPrice}</td>
                <td>${order.address.street}, ${order.address.city}, ${order.address.country}, ${order.address.zipCode}</td>
                <td>${order.paymentMethod}</td>
                <td>${statusBox}</td>
              </tr>
            `;
            orderInfo2.innerHTML += createElement2;
          }
        }
      }
    } else {
      orderInfo2.innerHTML = `
        <tr class="employeeDetails">
          <td class="empty" colspan="9" align="center">No data available in table</td>
        </tr>
      `;
    }
  }

  showInfo();
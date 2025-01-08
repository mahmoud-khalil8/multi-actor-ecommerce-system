
var navList  = document.querySelectorAll('.navigation li');

function activeLink(){
    navList.forEach((item)=> { 
        item.classList.remove("hovered");
     });
     this.classList.add("hovered")
}
navList.forEach(item=> item.addEventListener("click",activeLink));

var targetToggle = document.querySelector(".toggle");
var targetNavigation = document.querySelector(".navigation");
var targetTMain = document.querySelector(".orderContainer");
targetToggle.onclick = function(){
    targetNavigation.classList.toggle("active");
    targetTMain.classList.toggle("active");
}

// ================================================


var targetTable2 = document.querySelector("table");
var  orderInfo2 =document.querySelector(".orderInfo");

var currentSellerId2 = 2;


var originalData2 = localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders')):[]
var getData2 = [...originalData2]
var sellerOrders2 = getData2.filter(order => order.sellerId === currentSellerId2); 




function showInfo(){
    orderInfo2.innerHTML = ''; 
    if(sellerOrders2.length>0){
        for(var i=0; i<sellerOrders2.length;i++){
            var order = sellerOrders2[i];
            // document.querySelectorAll(".productDetails").forEach(info => info.remove());
            if(order){
                var createElement2=`<tr class = "productDetails">
                            <td>${i+1}</td>
                            <td>${order.userId}</td>
                            <td>${order.items[i].productId}</td>
                            <td>${order.items[i].quantity}</td>
                            <td>${order.items[i].price}</td>
                            <td>${order.total}</td>
                            <td>${order.shippingAddress}</td>
                            <td>${order.paymentMethod}</td>
                            <td>${order.status}</td>
                        </tr> `
                        orderInfo2.innerHTML += createElement2         
            }
        }
    }
    else{
        orderInfo2.innerHTML = `<tr class="employeeDetails"><td class="empty" colspan="11" align="center">No data available in table</td></tr>`
        // targetTable.style.minWidth = "1400px"
    }
}showInfo()



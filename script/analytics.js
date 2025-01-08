

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
var targetTMain = document.querySelector(".analyticsContainer");
targetToggle.onclick = function(){
    targetNavigation.classList.toggle("active");
    targetTMain.classList.toggle("active");
}

// ================================================



var chertBoxes = document.querySelector(".chartBox");

var currentSellerId3 = 2;

var originalData3 = localStorage.getItem('sales') ? JSON.parse(localStorage.getItem('sales')):[]
var getData3 = [...originalData3]
var sellerSales3 = getData3.filter(sales => sales.sellerId === currentSellerId3); 

var totalSales = sellerSales3 ? sellerSales3[0].totalSales : 0;
var ordersCount = sellerSales3 && sellerSales3[0] ? sellerSales3[0].orders.length: 0;

var totalQuantity=0;
for(var i=0 ; i<sellerSales3[0].productsSold.length ; i++){
  totalQuantity += sellerSales3[0].productsSold[i].quantitySold;
}
var quantity = sellerSales3 && sellerSales3[0] ? totalQuantity : 0;


// if (Array.isArray(sellerSales[0].productsSold)) {
//   quantity = sellerSales[0].productsSold.reduce((sum, product) => sum + (product.quantitySold || 0), 0);
// }


// ==================================chart analysis================================== 


var ctx1 = document.getElementById('myChart1').getContext('2d');
var ctx2 = document.getElementById('myChart2').getContext('2d');


new Chart(ctx1, {
    type: 'polarArea',
  data: {
    labels: ['Total Sales', 'Orders', 'Quantity'],
    datasets: [{
      label: '# of Votes',
      data: [totalSales, ordersCount, quantity],
      // backgroundColor:["red","green","blue"],
      // borderWidth: 1
    }]
  },
  options: {
    // scales: {
    //   y: {
    //     beginAtZero: true
    //   }
    // }
    responsive:true,
  }
});



new Chart(ctx2, {
  type: 'bar',
data: {
  labels: ['Total Sales', 'Orders', 'Quantity'],
  datasets: [{
    label: '# of Votes',
    data: [totalSales, ordersCount, quantity],
    backgroundColor:["#FFA07A","green","blue"],
    // borderWidth: 1
  }]
},
options: {
  // scales: {
  //   y: {
  //     beginAtZero: true
  //   }
  // }
  responsive:true,
}
});
showInfo()



//============================================================================


function showInfo(){
  chertBoxes.innerHTML = ''; 
    if(sellerSales3.length>0){
        for(var i=0; i<sellerSales3.length;i++){
            var sales = sellerSales3[i];
            // document.querySelectorAll(".productDetails").forEach(info => info.remove());
            if(sales){
                var createElement=`<div class="chart">
                <div>
                    <div class="rate">${totalSales}</div>
                    <div class="type">Total Sales</div>
                </div>
                <div class="chartIcons"><i class="bi bi-cash-stack"></i></div>
            </div>
            <div class="chart">
                <div>
                    <div class="rate">${ordersCount}</div>
                    <div class="type">Orders</div>
                </div>
                <div class="chartIcons"><i class="bi bi-journal-text"></i></div>
            </div>
            <div class="chart">
                <div>
                    <div class="rate">${quantity}</div>
                    <div class="type">Quantity</div>
                </div>
                <div class="chartIcons"><i class="bi bi-question-octagon-fill"></i></div>
            </div> 
            </div>`
                     chertBoxes.innerHTML += createElement         
            }
        }
    }
    else{
         chertBoxes.innerHTML = `<tr class="employeeDetails"><td class="empty" colspan="11" align="center">No data available in table</td></tr>`
        // targetTable.style.minWidth = "1400px"
    }
}showInfo()






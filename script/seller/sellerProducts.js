

// ================================product=======================
var newMemberAddBtn = document.getElementById('addButton');
var popUpPage = document.querySelector('.popUp');
var popUpForm = document.querySelector('.formPopUp');
var colseButton = document.querySelector('.closeBtn');
var submtionButton = document.querySelector('.submtBtn');
var formtitle = document.querySelector('.formTitle');
var targetForm = document.querySelector('form');
var uploadImage = document.getElementById("uploading");
var targetImg = document.querySelector(".img");
var ProductDescription =document.getElementById("PDescription");
var ProductName =document.getElementById("PName");
var ProductPrice =document.getElementById("PPrice");
var ProductStock =document.getElementById("PStock");
var ProductCategory =document.getElementById("PCategory");
var productInfo = document.querySelector(".productInfo");
var targetTable = document.querySelector("table");
var popUpFooter = document.querySelector(".formPopUpFooter");
var formInputFeild =document.querySelectorAll(".inputFeild");

var isEdit = false , editId;
const sellerId = JSON.parse(localStorage.getItem('currentUser')).id;
var currentSellerId = sellerId ? sellerId : 2;


var originalData = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')):[]
var getData = [...originalData]
var sellerProducts = getData.filter(product => product.sellerId === currentSellerId); 

newMemberAddBtn.addEventListener('click',()=>{
    isEdit = false
    submtionButton.innerHTML="Add";
    formtitle.innerHTML="New Product";
     
    popUpPage.classList.add("visible");
    popUpForm.classList.add("visible");
    
    popUpFooter.style.display = "block"
    targetForm.querySelectorAll('input').forEach(input => {
      input.disabled = false; // Disable all input fields
      });
    
}); 

colseButton.addEventListener('click',()=>{
    popUpPage.classList.remove("visible");
    popUpForm.classList.remove("visible");
    targetForm.reset();
    targetImg.src ="../../assets/images/flowers/17.PNG";
    popUpFooter.style.display = "block"
});//end close button

uploadImage.onchange = ()=>{
    if(uploadImage.files[0].size<1000000){
        var fileReader= new FileReader();

        fileReader.onload=(e)=>{
            var imgURL = e.target.result;
            targetImg.src = imgURL;
        }
        fileReader.readAsDataURL(uploadImage.files[0]);
    }else{
        alert("This file is too large ");
    }
}


// ===========================validation================================


function validateForm(name, category, description, price ,stock) {
    const nameRegex = /^[a-zA-Z0-9\s\-_.,'&]{2,100}$/; // At least 3 characters, letters, numbers, and spaces allowed
    const descriptionMinLength = 10;
    const descriptionRegex = /^[a-zA-Z0-9\s\-_.,'&!?()@#%$*]{10,1000}$/;

    // Validate Product Name
    if (!name) {
        alert("Product name cannot be empty.");
        ProductName.focus();
        return false;
    }
    if (!nameRegex.test(name)) {
        alert("Product name must be at least 3 characters.");
        ProductName.focus();
        return false;
    }

    // Validate Product Category
    if (!category) {
        alert("Please select a product category.");
        ProductCategory.focus();
        return false;
    }
    if (!nameRegex.test(category)) {
        alert("Product Catogry must be at least 3 characters.");
        ProductCategory.focus();
        return false;
    }

    // Validate Product Description
    if (!description) {
        alert("Product description cannot be empty.");
        ProductDescription.focus();
        return false;
    }
    if (!descriptionRegex.test(description)) {
        alert("Product Description must be at least 3 characters.");
        ProductDescription.focus();
        return false;
    }
    if (!price || price==0) {
        alert("Product price cannot be empty and can't be 0.");
        ProductPrice.focus();
        return false;
    }
    if (!stock || stock==0) {
        alert("Product stock cannot be empty and can't be 0.");
        ProductStock.focus();
        return false;
    }

    // All validations passed
    return true;
}

// ==================================enter&update data===============================



//submit button of poppage
submtionButton.addEventListener('click', (e)=>{
    e.preventDefault();


     // Perform Validation
    var name = ProductName.value.trim();
    var category = ProductCategory.value.trim();
    var description = ProductDescription.value.trim();
    var price = ProductPrice.value.trim();
    var stock = ProductStock.value.trim();

   
    if (!validateForm(name, category, description ,price , stock)) {
        return; 
    }

    const information = {  
        id:isEdit ? editId : Date.now(),
        sellerId: sellerId,
        name: ProductName.value,
        description: ProductDescription.value,
        price: ProductPrice.value,
        image: targetImg.src,
        category:ProductCategory.value,
        stock: ProductStock.value
    }
    if(!isEdit){
        originalData.unshift(information)
    }
    else{
        // originalData[editId] = information;
        var index = originalData.findIndex(product => product.id === editId);
        if (index !== -1) {
            originalData[index] = information; // Update existing product
       }

    }
    getData= [...originalData]
    localStorage.setItem('products', JSON.stringify(originalData))

    
    formtitle.innerHTML="New Product";   
    popUpPage.classList.remove("visible");
    popUpForm.classList.remove("visible");
    targetForm.reset();
    targetImg.src ="../../assets/images/flowers/17.PNG";
    popUpFooter.style.display = "block"
    targetForm.querySelectorAll('input').forEach(input => {
      input.disabled = false; // Disable all input fields
      });
   
      location.reload();
});//end form data



function showInfo(){
  productInfo.innerHTML = '';
  if(sellerProducts.length>0){
      for(var i=0; i<sellerProducts.length;i++){
          var product = sellerProducts[i];
          // document.querySelectorAll(".productDetails").forEach(info => info.remove());
          if(product){
              let createElement=`<tr class = "productDetails">
                          <td>${i+1}</td>
                          <td><img src="${product.image}"></td>
                          <td>${product.name}</td>
                          <td>${product.category}</td>
                          <td>${product.price}</td>
                          <td>${product.description}</td>
                          <td>${product.stock}</td>
                          <td>
                              <button onclick="readInfo('${product.image}','${product.name}','${product.category}','${product.price}','${product.description}','${product.stock}')"><i class="bi bi-eye-fill"></i></button>
                              <button onclick="editInfo('${product.id}','${product.image}','${product.name}','${product.category}','${product.price}','${product.description}','${product.stock}')"><i class="bi bi-pencil-square"></i></button>
                              <button onclick="deleteProduct('${i}')"><i class="bi bi-trash-fill"></i></button>    
                          </td>
                      </tr> `
                      productInfo.innerHTML += createElement         
          }
      }
  }
  else{
      productInfo.innerHTML = `<tr class="employeeDetails"><td class="empty" colspan="11" align="center">No data available in table</td></tr>`
      
  }
 
} showInfo()


function readInfo(_img,_name,_cat,_price,_desc,_stock){        
        ProductName.value= _name;
        ProductDescription.value= _desc;
        ProductPrice.value= _price;
        targetImg.src= _img;
        ProductCategory.value=_cat;
        ProductStock.value=_stock;

        formtitle.innerHTML="Product";   
        popUpPage.classList.add("visible");
        popUpForm.classList.add("visible");
        popUpFooter.style.display = "none"
        targetForm.querySelectorAll('input').forEach(input => {
        input.disabled = true; // Disable all input fields
        });


             
}

function editInfo(_id,_img,_name,_cat,_price,_desc,_stock){
    isEdit = true
    editId =parseInt(_id);
    let originalIndex = originalData.findIndex(item => item.id === _id)
    originalData[originalIndex]={
        id: _id,
        sellerId: sellerId,
        name: _name,
        description: _desc,
        price: _price,
        image: _img,
        category: _cat,
        stock: _stock,
    }

        ProductName.value= _name;
        ProductDescription.value= _desc;
        ProductPrice.value= _price;
        targetImg.src= _img;
        ProductCategory.value=_cat;
        ProductStock.value=_stock;

        formtitle.innerHTML="Update";   
        popUpPage.classList.add("visible");
        popUpForm.classList.add("visible");
        submtionButton.innerHTML = "Update"
        targetForm.querySelectorAll('input').forEach(input => {
        input.disabled = false;
      }) 
        
      
      // location.reload(); 
              
}  

function deleteProduct(d) {
  if (confirm("Are you sure you want to delete this product?")) {
        originalData.splice(d,1);
        localStorage.setItem('products', JSON.stringify(originalData));
        getData = [...originalData];
   
  
        location.reload();  
  }
  
} 






// ============================================data================================================

//Function to initialize data in local storage
// function initializeLocalStorage() {
//     // User Data
//     const users = [
//       {
//         id: 1,
//         role: "customer",
//         name: "John Doe",
//         email: "john@example.com",
//         password: "hashed_password",
//         address: "123 Main St, City, Country",
//         phoneNumber: "123-456-7890",
//         orders: [101, 102],
//       },
//       {
//         id: 2,
//         role: "seller",
//         name: "Jane Smith",
//         email: "jane@example.com",
//         password: "hashed_password",
//         products: [201, 202],
//       },
//     ];
  
//     // Product Data
//     const products = [
//       {
//         id: 201,
//         sellerId: 2,
//         name: "Wireless Headphones",
//         description: "Noise-cancelling wireless headphones.",
//         price: 99.99,
//         image: "./flowers/17.PNG",
//         category: "Electronics",
//         stock: 50,
//       },
//     ];
  
//     // Shopping Cart Data
//     const carts = [
//       {
//         userId: 1,
//         items: [
//           {
//             productId: 201,
//             quantity: 2,
//             price: 99.99,
//           },
//           {
//             productId: 202,
//             quantity: 1,
//             price: 149.99,
//           },
//         ],
//         total: 349.97,
//       },
//     ];
  
//     // Order Data
//     const orders = [
//       {
//         id: 101,
//         userId: 1,
//         sellerId: 2,
//         items: [
//           {
//             productId: 201,
//             quantity: 2,
//             price: 99.99,
//           },
//         ],
//         total: 199.98,
//         shippingAddress: "123 Main St, City, Country",
//         paymentMethod: "Credit Card",
//         status: "Delivered",
//       },
//     ];
  
//     // Sales Analytics Data
//     const sales = [
//       {
//         sellerId: 2,
//         totalSales: 349.97,
//         orders: [101, 102],
//         productsSold: [
//           {
//             productId: 201,
//             quantitySold: 2,
//           },
//           {
//             productId: 202,
//             quantitySold: 1,
//           },
//         ],
//       },
//     ];
  
//     // Store data in local storage
//     localStorage.setItem("users", JSON.stringify(users));
//     localStorage.setItem("products", JSON.stringify(products));
//     localStorage.setItem("carts", JSON.stringify(carts));
//     localStorage.setItem("orders", JSON.stringify(orders));
//     localStorage.setItem("sales", JSON.stringify(sales));
  
//     // console.log("Data initialized in local storage.");
//   }
//    initializeLocalStorage()
  


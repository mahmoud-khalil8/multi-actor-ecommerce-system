// fetch("product.json")
// .then(function(response){
//     return response.json();
// })
// .then(function(data){
//     localStorage.setItem("products",JSON.stringify(data))
//     if(!localStorage.getItem("cart")){
//         localStorage.setItem("cart",JSON.stringify([]))
//     }
//     updateShopUI(); 
//     updateCartUI();
// });
// let products = JSON.parse(localStorage.getItem("products"));
// let cart = JSON.parse(localStorage.getItem("cart"))

// function addItemToCart(productId){
//     let product = products.find(function(product){
//         return product.id == productId;
//     });
//     if (cart.length == 0){
//         cart.push(product)
//     }else{
//         let res = cart.find(item => item.id == productId)
//         if (res === undefined){
//             cart.push(product)
//         }
//     }
//     localStorage.setItem("cart",JSON.stringify(cart));
//     updateCartUI(); 
// }
// Retrieve the existing cart
let storedCartString = localStorage.getItem('cart') || '[]'; // تأكد من أن القيمة هي مصفوفة
let storedCart = JSON.parse(storedCartString); // تحويلها إلى مصفوفة كائنات

// إضافة منتجات جديدة
storedCart.push({ name: "Product 1", price: 39.99, quantity: 3 });
storedCart.push({ name: "Product 2", price: 39.99, quantity: 3 });
storedCart.push({ name: "Product 3", price: 39.99, quantity: 3 });

// تحديث localStorage
localStorage.setItem('cart', JSON.stringify(storedCart));
let cart = JSON.parse(localStorage.getItem("cart"))

function removeItemfromCart(productId){
    let temp = cart.filter(item => item.id !== productId)
    localStorage.setItem("cart",JSON.stringify(temp))
}

function updateQuantity(productId,quantity){
    for(let product of cart){
        if(product.id == productId)
            product.quantity = quantity;
    }
    localStorage.setItem("cart",JSON.stringify(cart))
    updateCartUI();
}

function getTotal(){
    let temp = cart.map(function(item){
        return parseFloat(item.price)
    })
    let sum = temp.reduce(function(pre,next){
        return pre + next;
    },0)
    return sum;
}

function updateShopUI(){
    let shopDiv = document.querySelector('.shop')
    shopDiv.innerHTML = "";
    products.forEach(function(product) {
        let productBox = document.createElement('div');
        productBox.classList.add('box');

        let img = document.createElement('img');
        img.src = product.image;
        img.alt = product.name;
        productBox.appendChild(img);

        let content = document.createElement('div');
        content.classList.add('content'); 

        let productName = document.createElement('h3');
        productName.textContent = product.name;
        content.appendChild(productName);

        let productPrice = document.createElement('h4');
        productPrice.textContent = `Price: ${product.price}`;
        content.appendChild(productPrice);

        let quantityLabel = document.createElement('p');
        quantityLabel.classList.add('unit');
        quantityLabel.innerHTML = `Quantity: <input value="1" class="num" onchange="updateQuantity(${product.id}, this.value)">`;
        content.appendChild(quantityLabel);
           
        let addButton = document.createElement('button');
        addButton.textContent = "Add to Cart";
        addButton.onclick = function() {
            addItemToCart(product.id);
        };
        content.appendChild(addButton);
        
        productBox.appendChild(content);
        shopDiv.appendChild(productBox); 
    });
}
// updateShopUI();

function updateCartUI() {
    let cartDiv = document.querySelector('.right-bar');
    let subtotal = getTotal();
    
    cartDiv.innerHTML = `
        <p class="total"><span>Subtotal</span> <span>${subtotal}</span></p>
        <hr>
        <p class="total"><span>Shipping</span> <span>10</span></p> 
        <hr>
        <p class="total"><span>Total</span> <span>${subtotal + 10}</span></p> 
        <div class="button-position"><input type="button" value="Checkout" class="check"></div>
    `;
}
updateCartUI();

   




document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || { products: [] };
    if (cart.products?.length === 0) {
        cart.products = [
            { name: "Product 1", price: 19.99, quantity: 2, image: "products/1.jpg" },
            { name: "Product 2", price: 29.99, quantity: 1, image: "products/2.jpg" },
            { name: "Product 3", price: 39.99, quantity: 3, image: "products/3.jpg" }
        ];

        localStorage.setItem("cart", JSON.stringify(cart));
    }

    const shopSection = document.querySelector(".shop");
    const subtotalElement = document.getElementById("subtotal");
    const totalElement = document.getElementById("total");

    let subtotal = 0;
    shopSection.innerHTML = "";

    cart.products.forEach((product) => {
        const productTotal = product.price * product.quantity;
        subtotal += productTotal;

        const productHTML = `
        <div class="box">
            <img src="${product.image || "products/2.jpg"}" alt="${product.name}">
            <div class="content">
                <h3>${product.name}</h3>
                <h4>Price: $${product.price.toFixed(2)}</h4>
                <p class="unit">Quantity: <input type="number" value="${product.quantity}" class="num" min="1"></p>
                <!-- Use the SVG as the delete icon with class "size-6" -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="delete-icon size-6" style="cursor: pointer; color: darkred;">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
            </div>
        </div>
    `;
        shopSection.insertAdjacentHTML("beforeend", productHTML);
    });

    const shipping = 10;
    total = subtotal + shipping;
    localStorage.setItem('Total price', total)
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;

    const deleteIcons = document.querySelectorAll(".delete-icon");

    deleteIcons.forEach((icon) => {
        icon.addEventListener("click", function () {
            const productName = icon.closest('.box').querySelector('h3').textContent;
            cart.products = cart.products.filter((product) => product.name !== productName);
            localStorage.setItem("cart", JSON.stringify(cart));
            location.reload();
        });
    });
    
});

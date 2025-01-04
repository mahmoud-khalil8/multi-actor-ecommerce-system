// Function to initialize data in local storage
export function initializeLocalStorage() {
  // User Data
  const users = [
    {
      id: 1,
      role: "customer",
      name: "John Doe",
      email: "john@example.com",
      password: "hashed_password",
      address: "123 Main St, City, Country",
      phoneNumber: "123-456-7890",
      orders: [101, 102],
    },
    {
      id: 2,
      role: "seller",
      name: "Jane Smith",
      email: "jane@example.com",
      password: "hashed_password",
      products: [201, 202],
    },
  ];

  // Product Data
  const products = [
    {
      id: 201,
      sellerId: 2,
      name: "Wireless Headphones",
      description: "Noise-cancelling wireless headphones.",
      price: 99.99,
      image: "headphones.jpg",
      category: "Electronics",
      stock: 50,
    },
  ];

  // Shopping Cart Data
  const carts = [
    {
      userId: 1,
      items: [
        {
          productId: 201,
          quantity: 2,
          price: 99.99,
        },
        {
          productId: 202,
          quantity: 1,
          price: 149.99,
        },
      ],
      total: 349.97,
    },
  ];

  // Order Data
  const orders = [
    {
      id: 101,
      userId: 1,
      sellerId: 3,
      items: [
        {
          productId: 201,
          quantity: 2,
          price: 99.99,
        },
      ],
      total: 199.98,
      shippingAddress: "123 Main St, City, Country",
      paymentMethod: "Credit Card",
      status: "Delivered",
    },
  ];

  // Sales Analytics Data
  const sales = [
    {
      sellerId: 2,
      totalSales: 349.97,
      orders: [101, 102],
      productsSold: [
        {
          productId: 201,
          quantitySold: 2,
        },
        {
          productId: 202,
          quantitySold: 1,
        },
      ],
    },
  ];

  // Store data in local storage
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("products", JSON.stringify(products));
  localStorage.setItem("carts", JSON.stringify(carts));
  localStorage.setItem("orders", JSON.stringify(orders));
  localStorage.setItem("sales", JSON.stringify(sales));

  console.log("Data initialized in local storage.");
}


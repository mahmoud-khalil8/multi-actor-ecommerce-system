class LocalStorageInitializer {
  constructor() {
    if (LocalStorageInitializer.instance) {
      return LocalStorageInitializer.instance;
    }

    // Initialize local storage only if it hasn't been initialized before
    if (!localStorage.getItem("initialized")) {
      this.initializeLocalStorage();
      localStorage.setItem("initialized", "true"); // Mark as initialized
    }

    LocalStorageInitializer.instance = this;
  }

  initializeLocalStorage() {
    // User Data
    const users = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        role: "admin",
        password: "password123", // Note: In a real app, never store plain-text passwords
        address: "123 Main St, City, Country",
        phoneNumber: "123-456-7890",
        orders: [],
        products: [],
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        role: "user",
        password: "password123", // Note: In a real app, never store plain-text passwords
        address: "456 Elm St, Town, Country",
        phoneNumber: "987-654-3210",
        orders: [],
        products: [],
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
        status: "Approved", // Default status
      },
      {
        id: 202,
        sellerId: 2,
        name: "Smartwatch",
        description: "Fitness and health tracking smartwatch.",
        price: 149.99,
        image: "smartwatch.jpg",
        category: "Electronics",
        stock: 30,
        status: "Pending", // Default status
      },
    ];
    const cart = [
      {
        id: 1,
        userId: 1,
        items: [
          {
            productId: 201,
            quantity: 2,
            price: 99.99,
          },
        ],
        total: 199.98,

      }
    ]

    // Order Data
    const orders = [
      {
        id: 101,
        userId: 1,
        sellerId: 2,
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
      {
        id: 102,
        userId: 2,
        sellerId: 2,
        items: [
          {
            productId: 202,
            quantity: 1,
            price: 149.99,
          },
        ],
        total: 149.99,
        shippingAddress: "456 Elm St, Town, Country",
        paymentMethod: "PayPal",
        status: "Pending",
      },
    ];

    // Store data in local storage
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.setItem("cart", JSON.stringify(cart));

    console.log("Local storage initialized.");
  }
}

// Export the Singleton instance
export const localStorageInitializer = new LocalStorageInitializer();
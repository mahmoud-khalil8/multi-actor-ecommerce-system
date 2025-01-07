// localStorage.js
export function initializeLocalStorage() {
  if (!localStorage.getItem("initialized")) {
    const initialData = {
      users: [],
      products: [],
      orders: [],
      cart: [],
    };
    localStorage.setItem("initialized", "true");
    localStorage.setItem("data", JSON.stringify(initialData));
    console.log("Local storage initialized.");
  }
}
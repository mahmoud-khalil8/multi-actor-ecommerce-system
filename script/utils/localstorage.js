export async function initializeLocalStorageWithProducts() {
  if (localStorage.getItem('products')) {
    console.log('Products are already initialized in Local Storage.');
    return;
  }

  try {
    const response = await fetch('data/api.json');
    const data = await response.json();

    // Save products to Local Storage
    localStorage.setItem('products', JSON.stringify(data));
    console.log('Products initialized successfully in Local Storage!');
  } catch (error) {
    console.error('Error initializing products:', error);
  }
}
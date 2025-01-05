//mohamed 
function loadCSS(fileName) {
  const existingLink = document.getElementById('user-specific-style');
  if (existingLink) {
    existingLink.remove();
  }

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.id = 'user-specific-style';
  link.href = fileName; 
  document.head.appendChild(link);
}

export const renderCustomerContent = () => {
  loadCSS('../styles/customer.css');
  return `

  

<h1>Customer Dashboard</h1>

  <div class=username></div>
   
  `;
};







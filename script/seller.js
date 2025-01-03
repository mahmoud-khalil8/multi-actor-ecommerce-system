
//nada 
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
export const renderSellerContent = () => {
  loadCSS('../styles/seller.css');
  return `
    HTML
  `;
};
//js 
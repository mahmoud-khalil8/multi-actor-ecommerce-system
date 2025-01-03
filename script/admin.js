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


export const renderAdminContent = () => {
  loadCSS('../styles/admin.css');
  return `
    <div class="row">
      <!-- Burger Menu Button for Mobile -->
      <button class="navbar-toggler d-md-none position-absolute top-0 start-0 m-3" type="button" data-bs-toggle="collapse" data-bs-target="#sidebar" aria-controls="sidebar" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Sidebar -->
      <nav id="sidebar" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
        <div class="sidebar-sticky">
          <h5 class="mt-4 ms-3">LOGO</h5>
          <button class="btn bg-warning mt-3 ms-3"><a href="index.html">Back to home</a></button>
          <ul class="nav flex-column mt-3">
            <li class="nav-item">
              <a class="nav-link active" href="#" data-page="users">Users</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" data-page="products">Products</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" data-page="orders">Orders</a>
            </li>
          </ul>
        </div>
      </nav>

      <!-- Main Content -->
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-5" id="contentContainer">
        <h2>Welcome to the Users</h2>
        <p>Select an option from the sidebar to view details.</p>
      </main>
    </div>
  `;
};

// Content templates for different pages
const contentTemplates = {
  users: `
    <h2>Users</h2>
    <div class="table-container">
  <div class="table-responsive">
    <table class="table table-bordered table-hover align-middle">
      <thead>
        <tr>
          <th scope="col">User ID</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Phone</th>
          <th scope="col">Registration Date</th>
          <th scope="col">Last Login</th>
          <th scope="col">Status</th>
          <th scope="col">Total Orders</th>
          <th scope="col">Total Spent</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>12345</td>
          <td>
            <img src="https://via.placeholder.com/40" alt="John Doe" class="customer-avatar">
            John Doe
          </td>
          <td>johndoe@example.com</td>
          <td>+1234567890</td>
          <td>2023-10-15 14:32</td>
          <td>2023-10-20 09:15</td>
          <td><span class="status-active">● Active</span></td>
          <td>5</td>
          <td>$250.00</td>
          <td>
            <button class="btn btn-sm btn-warning">Edit</button>
            <button class="btn btn-sm btn-danger">Delete</button>
          </td>
        </tr>
        <tr>
          <td>67890</td>
          <td>
            <img src="https://via.placeholder.com/40" alt="Jane Smith" class="customer-avatar">
            Jane Smith
          </td>
          <td>janesmith@example.com</td>
          <td>+0987654321</td>
          <td>2023-09-10 10:45</td>
          <td>2023-10-19 16:20</td>
          <td><span class="status-inactive">● Inactive</span></td>
          <td>2</td>
          <td>$100.00</td>
          <td>
            <button class="btn btn-sm btn-warning">Edit</button>
            <button class="btn btn-sm btn-danger">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
  `,
  products: `
    <h2>Products</h2>
    <p>View historical records.</p>
  `,
  orders: `
    <h2>Orders</h2>
    <p>Manage all orders here.</p>
  `,
};

document.addEventListener('DOMContentLoaded', () => {
  // Initialize the content container with the "Users" template
  const contentContainer = document.getElementById('contentContainer');
  if (contentContainer && contentTemplates.users) {
    contentContainer.innerHTML = contentTemplates.users;
  }

  // Set the "Users" link as active by default
  const usersLink = document.querySelector('.nav-link[data-page="users"]');
  if (usersLink) {
    usersLink.classList.add('active');
  }

  // Event handler to load content
  document.addEventListener('click', (e) => {
    const target = e.target;
    if (target.matches('.nav-link[data-page]')) {
      e.preventDefault();
      const page = target.getAttribute('data-page');
      const contentContainer = document.getElementById('contentContainer');

      // Set the content based on the clicked link
      if (contentTemplates[page]) {
        contentContainer.innerHTML = contentTemplates[page];
      }

      // Update the active class for navigation links
      document.querySelectorAll('.nav-link').forEach((link) => {
        link.classList.remove('active');
      });
      target.classList.add('active');

      // Close the sidebar on mobile after clicking a link
      const sidebar = document.getElementById('sidebar');
      if (sidebar.classList.contains('show')) {
        const bsCollapse = new bootstrap.Collapse(sidebar, { toggle: false });
        bsCollapse.hide();
      }
    }
  });
});
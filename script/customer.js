import { validatePhoneNumber, showMessage } from "./utils/validation.js";

// Load user data from localStorage and populate the profile page
function loadUserData() {
  try {
    // Check if a user is logged in
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      alert("No user is currently logged in.");
      window.location.href = "login.html"; // Redirect to login page
      return;
    }

    // Fetch all users from localStorage
    let data = JSON.parse(localStorage.getItem("data"));
    if (!data || !data.users) {
      alert("No user data found in localStorage.");
      return;
    }

    // Find the updated user data from the `users` array
    let updatedUser = data.users.find((u) => u.id === currentUser.id);
    if (!updatedUser) {
      alert("User data not found.");
      return;
    }

    // Update the displayed data
    document.getElementById("headerName").innerText = updatedUser.name;
    document.getElementById("emailHeader").innerText = updatedUser.email;

    document.getElementById("firstName").innerText = updatedUser.name.split(" ")[0];
    document.getElementById("lastName").innerText = updatedUser.name.split(" ")[1];
    document.getElementById("email").innerText = updatedUser.email;
    document.getElementById("phone").innerText = updatedUser.phoneNumber || "N/A";
    document.getElementById("userImg").src = updatedUser.userImg || "UP/userpic.png";

    // Parse and display address
    if (updatedUser.address) {
      let address = updatedUser.address.split(",");
      if (address.length >= 2) {
        document.getElementById("City").innerText = address[1].trim();
        document.getElementById("Country").innerText = address[0].trim();
      } else {
        console.error("Invalid address format:", updatedUser.address);
      }
    }
  } catch (error) {
    console.error("Error loading user data:", error);
    alert("An error occurred while loading user data.");
  }
}

// Initial load of user data when the page is loaded or refreshed
window.onload = loadUserData;

let currentEditSection;

const fields = {
  personal: [
    { id: "firstName", label: "First Name" },
    { id: "lastName", label: "Last Name" },
    { id: "phone", label: "Phone" },
  ],
  address: [
    { id: "City", label: "City" },
    { id: "Country", label: "Country" },
  ],
  password: [
    { id: "currentpassword", label: "Current Password" },
    { id: "newPassword", label: "New Password" },
    { id: "confirmPassword", label: "Confirm Password" },
  ],
};

// Edit personal information
document.getElementById("editPersonal").addEventListener("click", () => editFields("personal"));

// Edit address
document.getElementById("editAddress").addEventListener("click", () => editFields("address"));

// Open modal for editing fields
function editFields(section) {
  currentEditSection = section;
  let modalForm = document.getElementById("modalForm");
  modalForm.innerHTML = "";

  if (section === "password") {
    modalForm.innerHTML = `
      <form>
        <div class="mb-3">
          <label for="currentPass" class="form-label">Current Password</label>
          <input type="password" autocomplete="on" class="form-control" id="modal-currentpassword">
        </div>
        <div class="mb-3">
          <label for="newPass" class="form-label">New Password</label>
          <input type="password" autocomplete="on" class="form-control" id="modal-newPassword">
        </div>
        <div class="mb-3">
          <label for="confirmPass" class="form-label">Confirm Password</label>
          <input type="password" autocomplete="on" class="form-control" id="modal-confirmPassword">
        </div>
      </form>`;
  } else {
    fields[section].forEach((field) => {
      let value = document.getElementById(field.id).innerText;
      modalForm.innerHTML += `
        <div class="mb-3">
          <label for="${field.id}" class="form-label">${field.label}</label>
          <input type="text" class="form-control" id="modal-${field.id}" value="${value}">
        </div>`;
    });
  }

  // Show the modal
  const modal = new bootstrap.Modal(document.getElementById("editModal"));
  modal.show();
}

// Handle profile image upload
document.getElementById("imageInput").addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (!file) return;

  // Validate file type
  if (!file.type.startsWith("image/")) {
    alert("Please upload a valid image file.");
    return;
  }

  // Validate file size (e.g., 5MB limit)
  if (file.size > 5 * 1024 * 1024) {
    alert("File size must be less than 5MB.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    document.getElementById("userImg").src = e.target.result;

    // Update user data in localStorage
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      let data = JSON.parse(localStorage.getItem("data"));
      let users = data.users;
      let userIndex = users.findIndex((u) => u.id === currentUser.id);

      if (userIndex !== -1) {
        users[userIndex].userImg = e.target.result; // Update profile image
        localStorage.setItem("data", JSON.stringify({ ...data, users }));

        // Update currentUser in localStorage
        currentUser.userImg = e.target.result;
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
      }
    }
  };

  reader.readAsDataURL(file);
});

// Save changes made in the modal
document.getElementById("saveBtn").addEventListener("click", function () {
  let valid = true;

  if (currentEditSection === "password") {
    let currentPassword = document.getElementById("modal-currentpassword").value;
    let newPassword = document.getElementById("modal-newPassword").value;
    let confirmPassword = document.getElementById("modal-confirmPassword").value;

    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("All fields are required.");
      valid = false;
    } else if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      valid = false;
    } else {
      let currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (currentUser) {
        let data = JSON.parse(localStorage.getItem("data"));
        let users = data.users;
        let userIndex = users.findIndex((u) => u.id === currentUser.id);

        if (userIndex !== -1) {
          if (users[userIndex].password === currentPassword) {
            users[userIndex].password = newPassword; // Update password
            localStorage.setItem("data", JSON.stringify({ ...data, users }));

            // Update currentUser in localStorage
            currentUser.password = newPassword;
            localStorage.setItem("currentUser", JSON.stringify(currentUser));

            alert("Password changed successfully!");
          } else {
            alert("Current password is incorrect.");
          }
        }
      }
    }
  } else {
    // Validate phone number only if the "personal" section is being edited
    if (currentEditSection === "personal") {
      let phoneInput = document.getElementById("modal-phone");
      if (phoneInput) {
        let phoneNumber = phoneInput.value;
        if (phoneNumber && !validatePhoneNumber(phoneNumber)) {
          showMessage("modal-phone-error", "Invalid phone number.");
          valid = false;
        }
      }
    }

    if (valid) {
      let currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (currentUser) {
        let data = JSON.parse(localStorage.getItem("data"));
        let users = data.users;
        let userIndex = users.findIndex((u) => u.id === currentUser.id);

        if (userIndex !== -1) {
          fields[currentEditSection].forEach((field) => {
            let newValue = document.getElementById(`modal-${field.id}`).value;
            if (field.id === "phone") {
              users[userIndex].phoneNumber = newValue;
            } else if (field.id === "firstName" || field.id === "lastName") {
              users[userIndex].name = `${document.getElementById("modal-firstName").value} ${document.getElementById("modal-lastName").value}`;
            } else if (field.id === "email") {
              users[userIndex].email = newValue;
            } else if ( field.id === "City" || field.id === "Country") {
              users[userIndex].address = ` ${document.getElementById("modal-Country").value}, ${document.getElementById("modal-City").value}`;
            }
          });

          // Update localStorage
          localStorage.setItem("data", JSON.stringify({ ...data, users }));

          // Update currentUser in localStorage
          Object.assign(currentUser, users[userIndex]);
          localStorage.setItem("currentUser", JSON.stringify(currentUser));

          // Refresh the displayed data
          loadUserData();
        }
      }
    }
  }

  if (valid) {
    bootstrap.Modal.getInstance(document.getElementById("editModal")).hide();
  }
});

// Logout functionality
document.getElementById("logoutBtn").addEventListener("click", function () {
  // Clear the current user data from localStorage
  localStorage.removeItem("currentUser");

  // Redirect to the login page (or home page)
  window.location.href = "login.html"; // Replace with your login page URL
});
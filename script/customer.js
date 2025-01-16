import { validatePhoneNumber} from "./utils/validation.js";

function loadUserData() {
  try {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      alert("No user is currently logged in.");
      window.location.href = "login.html";
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (!Array.isArray(users)) {
      alert("Invalid user data found in localStorage.");
      return;
    }

    let updatedUser = users.find((u) => u.id === currentUser.id);
    if (!updatedUser) {
      alert("User data not found.");
      return;
    }

    document.getElementById("headerName").innerText = updatedUser.name;
    document.getElementById("emailHeader").innerText = updatedUser.email;

    document.getElementById("firstName").innerText = updatedUser.name.split(" ")[0];
    document.getElementById("lastName").innerText = updatedUser.name.split(" ")[1];
    document.getElementById("email").innerText = updatedUser.email;
    document.getElementById("phone").innerText = updatedUser.phoneNumber || "N/A";
    document.getElementById("userImg").src = updatedUser.userImg || "UP/userpic.png";

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

document.getElementById("editPersonal").addEventListener("click", () => editFields("personal"));

document.getElementById("editAddress").addEventListener("click", () => editFields("address"));

function editFields(section) {
    currentEditSection = section;
    let modalForm = document.getElementById("modalForm");
    modalForm.innerHTML = "";

    if (section === "password") {
      modalForm.innerHTML = `
        <form>
          <span id="modal-error"></span>
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
      modalForm.innerHTML = `<span id="modal-error"></span>`;

      fields[section].forEach((field) => {
        let value = document.getElementById(field.id).innerText;
        modalForm.innerHTML += `
          <div class="mb-3">
            <label for="${field.id}" class="form-label">${field.label}</label>
            <input type="text" class="form-control" id="modal-${field.id}" value="${value}">
          </div>`;
      });
    }

    const modal = new bootstrap.Modal(document.getElementById("editModal"));
    modal.show();
  }

document.getElementById("imageInput").addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (!file) return;

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

    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      let users = JSON.parse(localStorage.getItem("users")) || [];
      let userIndex = users.findIndex((u) => u.id === currentUser.id);

      if (userIndex !== -1) {
        users[userIndex].userImg = e.target.result; 
        localStorage.setItem("users", JSON.stringify(users));

        currentUser.userImg = e.target.result;
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
      }
    }
  };

  reader.readAsDataURL(file);
});

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
        let users = JSON.parse(localStorage.getItem("users")) || [];
        let userIndex = users.findIndex((u) => u.id === currentUser.id);

        if (userIndex !== -1) {
          if (users[userIndex].password === currentPassword) {
            users[userIndex].password = newPassword; // Update password
            localStorage.setItem("users", JSON.stringify(users));

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
    if (currentEditSection === "personal") {
      let phoneInput = document.getElementById("modal-phone");
      if (phoneInput) {
        let phoneNumber = phoneInput.value;
        if (phoneNumber && !validatePhoneNumber(phoneNumber)) {
            showMessage("modal-error", "Invalid phone number.");
          valid = false;
        }
      }
    }

    if (valid) {
      let currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (currentUser) {
        let users = JSON.parse(localStorage.getItem("users")) || [];
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
            } else if (field.id === "City" || field.id === "Country") {
              users[userIndex].address = ` ${document.getElementById("modal-Country").value}, ${document.getElementById("modal-City").value}`;
            }
          });

          localStorage.setItem("users", JSON.stringify(users));

          Object.assign(currentUser, users[userIndex]);
          localStorage.setItem("currentUser", JSON.stringify(currentUser));

          loadUserData();
        }
      }
    }
  }

  if (valid) {
    bootstrap.Modal.getInstance(document.getElementById("editModal")).hide();
  }
});

document.getElementById("logoutBtn").addEventListener("click", function () {

  localStorage.removeItem("currentUser");
  //localStorage.removeItem("cart");


  window.location.href = "login.html";  
});

function showMessage(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
      element.textContent = message;
      element.style.display = "block";  
      element.classList.add("alert", "alert-danger");  
      setTimeout(() => {
        element.style.display = "none";  
      }, 3000); 
    } else {
      console.error(`Element with ID ${elementId} not found.`);
      alert(message);  
    }
  }
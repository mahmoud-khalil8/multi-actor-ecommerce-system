import { validatePhoneNumber, showMessage } from "./utils/validation.js";
// // creating an object
// let userData = {
//   users: [
//     {
//       id: 1,
//       role: "customer",
//       name: "John Doe",
//       userImg: "UP/userpic.png",
//       email: "john@example.com",
//       password: "hashed_password",
//       address: "123 Main St, City, Country",
//       "phone number": "123-456-7890",
//       orders: [101, 102],
//     },
//     {
//       id: 2,
//       role: "seller",
//       name: "Jane Smith",
//       email: "jane@example.com",
//       password: "hashed_password",
//       products: [201, 202],
//     },
//   ],
// };

// if (!localStorage.getItem("userData")) {
//   localStorage.setItem("userData", JSON.stringify(userData));
// }

// load userdata in the local strorage and to the data elements
function loadUserData() {
  let storedData = localStorage.getItem("currentUser");
  if (storedData) {
    let user = JSON.parse(storedData);

    if (user.role === "customer") {
      // Fetch the latest user data from the `users` array in `localStorage`
      let data = JSON.parse(localStorage.getItem("data"));
      let users = data.users;
      let updatedUser = users.find((u) => u.id === user.id);

      if (updatedUser) {
        // Update the displayed data
        document.getElementById("headerName").innerText = updatedUser.name;
        document.getElementById("emailHeader").innerText = updatedUser.email;

        document.getElementById("firstName").innerText = updatedUser.name.split(" ")[0];
        document.getElementById("lastName").innerText = updatedUser.name.split(" ")[1];
        document.getElementById("email").innerText = updatedUser.email;
        document.getElementById("phone").innerText = updatedUser["phoneNumber"];
        document.getElementById("userImg").src = updatedUser.userImg || "UP/userpic.png";
        
        let address = updatedUser.address.split(",");
        document.getElementById("Street").innerText = "";
        document.getElementById("City").innerText = address[1];
        document.getElementById("Country").innerText = address[0];

      }
    }
  }
}

// Initial load of user data when the page is loaded or refreshed
window.onload = loadUserData;

let currentEditSection;

let fields = {
  personal: [
    { id: "firstName", label: "First Name" },
    { id: "lastName", label: "Last Name" },
    { id: "phone", label: "Phone" },
  ],
  address: [
    { id: "Street", label: "Street" },
    { id: "City", label: "City" },
    { id: "Country", label: "Country" },
  ],
  password: [
    { id: "currentpassword", label: "Current Password" },
    { id: "newPassword", label: "New Password" },
    { id: "confirmPassword", label: "Confirm Password" },
  ],
};
const editPersonal = document.getElementById("editPersonal");
editPersonal.addEventListener("click", function () {
  editFields("personal");
});
// editing the
function editFields(section) {
  currentEditSection = section;
  let modalForm = document.getElementById("modalForm");
  modalForm.innerHTML = "";

  if (section === "password") {
    modalForm.innerHTML += `
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

// profiel image

let imageInput = document.getElementById("imageInput");
let userImg = document.getElementById("userImg");

imageInput.addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      userImg.src = e.target.result;
      let storedData = localStorage.getItem("currentUser");
      if (storedData) {
        let user = JSON.parse(storedData);

        if (user.role === "customer") {
          user.userImg = e.target.result;

          // Update the user's profile image in the `users` array in `localStorage`
          let data = JSON.parse(localStorage.getItem("data"));
          let users = data.users;
          let userIndex = users.findIndex((u) => u.id === user.id);
          if (userIndex !== -1) {
            users[userIndex].userImg = e.target.result; // Update profile image
            localStorage.setItem("data", JSON.stringify({ ...data, users }));
          }

          localStorage.setItem("currentUser", JSON.stringify(user));
        }
      }
    };

    reader.readAsDataURL(file);
  }
});


document.getElementById("saveBtn").addEventListener("click", function () {
  let valid = true;

  if (currentEditSection === "password") {
    let currentPassword = document.getElementById("modal-currentpassword").value;
    let newPassword = document.getElementById("modal-newPassword").value;
    let confirmPassword = document.getElementById("modal-confirmPassword").value;

    if (!currentPassword) {
      showMessage("modal-currentpassword-error", "Current password is required.");
      valid = false;
    }

    if (!newPassword) {
      showMessage("modal-newPassword-error", "New password is required.");
      valid = false;
    }

    if (!confirmPassword) {
      showMessage("modal-confirmPassword-error", "Confirm password is required.");
      valid = false;
    }

    if (newPassword !== confirmPassword) {
      showMessage("modal-newPassword-error", "Passwords do not match.");
      valid = false;
    }

    if (valid) {
      let storedData = localStorage.getItem("currentUser");
      if (storedData) {
        let user = JSON.parse(storedData);

        if (user.role === "customer") {
          if (user.password === currentPassword) {
            user.password = newPassword;

            let data = JSON.parse(localStorage.getItem("data"));
            let users = data.users;
            let userIndex = users.findIndex((u) => u.id === user.id);
            if (userIndex !== -1) {
              users[userIndex].password = newPassword;
              localStorage.setItem("data", JSON.stringify({ ...data, users }));
            }

            localStorage.setItem("currentUser", JSON.stringify(user));
            alert("Password changed successfully!");
          } else {
            alert("Current password is incorrect.");
          }
        }
      } else {
        alert("No user data found in localStorage.");
      }

      bootstrap.Modal.getInstance(document.getElementById("editModal")).hide();
    }
  } else {
    // Validate only phone number
    let phoneNumber = document.getElementById("modal-phone").value;
    if (!validatePhoneNumber(phoneNumber)) {
      let message = "Invalid phone number.";
      if(document.getElementById("modal-phone-error")) {
        document.getElementById("modal-phone-error").innerText = message;
      } else {

      let span = document.createElement("span");
      span.id = "modal-phone-error";
      span.className = "text-danger";
      span.innerText = message;
      document.getElementById("modalForm").appendChild(span);
      }


      showMessage("modal-phone-error", "Invalid phone number.");
      valid = false;
    }

    if (valid) {
      let storedData = localStorage.getItem("currentUser");

      if (storedData) {
        let user = JSON.parse(storedData);

        if (user.role === "customer") {
          fields[currentEditSection].forEach((field) => {
            let newValue = document.getElementById(`modal-${field.id}`).value;

            if (field.id === "phone") {
              user["phoneNumber"] = document.getElementById("modal-phone").value;
            } else if (field.id === "firstName" || field.id === "lastName") {
              user.name = `${document.getElementById("modal-firstName").value} ${document.getElementById("modal-lastName").value}`;
              user.firstName = document.getElementById("modal-firstName").value;
              user.lastName = document.getElementById("modal-lastName").value;
              document.getElementById("headerName").innerText = user.name;
            } else if (field.id === "email") {
              user.email = document.getElementById("modal-email").value;
            } else if (field.id === "userImg") {
              user.userImg = document.getElementById("modal-userImg").value;
            } else if (
              field.id === "Street" ||
              field.id === "City" ||
              field.id === "Country"
            ) {
              user.address = `${document.getElementById("modal-Street").value}, ${document.getElementById("modal-City").value}, ${document.getElementById("modal-Country").value}`;
            }
          });

          let data = JSON.parse(localStorage.getItem("data"));
          let users = data.users;
          let userIndex = users.findIndex((u) => u.id === user.id);
          if (userIndex !== -1) {
            users[userIndex] = user;
            localStorage.setItem("data", JSON.stringify({ ...data, users }));
          }

          localStorage.setItem("currentUser", JSON.stringify(user));
        }
      } else {
        alert("No user data found in localStorage.");
      }

      bootstrap.Modal.getInstance(document.getElementById("editModal")).hide();
      loadUserData();
    }
  }
});


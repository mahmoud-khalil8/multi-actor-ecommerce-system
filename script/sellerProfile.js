
var navList  = document.querySelectorAll('.navigation li');

function activeLink(){
    navList.forEach((item)=> { 
        item.classList.remove("hovered");
     });
     this.classList.add("hovered")
}
navList.forEach(item=> item.addEventListener("click",activeLink));

var targetToggle = document.querySelector(".toggle");
var targetNavigation = document.querySelector(".navigation");
var targetTMain = document.querySelector(".container");
targetToggle.onclick = function(){
    targetNavigation.classList.toggle("active");
    targetTMain.classList.toggle("active");
}



// localStorage.clear();
// creating an object
// var userData = {
//     users: [
//         {
//             id: 1,
//             role: "customer",
//             name: "John Doe",
//             userImg: "./flowers/17.PNG",
//             email: "john@example.com",
//             password: "hashed_password",
//             address: "123 Main St, City, Country",
//             "phone number": "123-456-7890",
//             orders: [101, 102],
//         },
//         {
//             id: 2,
//             role: "seller",
//             name: "Jane Smith",
//             email: "jane@example.com",
//             password: "hashed_password",
//             products: [201, 202],
//         },
//     ],
// };

var originalData = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')):[]
var getData = [...originalData]


// load userdata in the local strorage and to the data elements
function loadUserData() {
    // var storedData = localStorage.getItem("userData");
    if (getData) {
        // var parsedData = JSON.parse(getData);
        getData.forEach((seller) => {
            if (seller.role === "seller") {
                document.getElementById("headerName").innerText = seller.name;
                document.getElementById("emailHeader").innerText = seller.email;

                document.getElementById("firstName").innerText =
                    seller.name.split(" ")[0];
                document.getElementById("lastName").innerText =
                    seller.name.split(" ")[1];
                document.getElementById("email").innerText = seller.email;
                // document.getElementById("phone").innerText =
                //     seller["phone number"];
                document.getElementById("userImg").src = seller.userImg;
                // document.getElementById("Street").innerText =
                //     seller.address.split(",")[0];
                // document.getElementById("City").innerText =
                //     seller.address.split(",")[1];
                // document.getElementById("Country").innerText =
                //     seller.address.split(",")[2];
            }
        });
    }
}

// Initial load of user data when the page is loaded or refreshed
// window.onload = loadUserData;
loadUserData()

var currentEditSection;

var fields = {
    personal: [
        { id: "firstName", label: "First Name" },
        { id: "lastName", label: "Last Name" },
       
    ],
    password: [
        { id: "currentpassword", label: "Current Password" },
        { id: "newPassword", label: "New Password" },
        { id: "confirmPassword", label: "Confirm Password" },
    ],
};

// editing the
function editFields(section) {
    currentEditSection = section;
    var modalForm = document.getElementById("modalForm");
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
            var value = document.getElementById(field.id).innerText;
            modalForm.innerHTML += `
            <div class="mb-3">
                <label for="${field.id}" class="form-label">${field.label}</label>
                <input type="text" class="form-control" id="modal-${field.id}" value="${value}">
            </div>`;
        });
    }

    // Show the modal
    var modal = new bootstrap.Modal(document.getElementById("editModal"));
    modal.show();
}

// profiel image

var imageInput = document.getElementById("imageInput");
var userImg = document.getElementById("userImg");

imageInput.addEventListener("change", function (event) {
    var file = event.target.files[0];
    if (file) {
        var reader = new FileReader();

        reader.onload = function (e) {
            userImg.src = e.target.result;
            // var storedData = localStorage.getItem("userData");
            if (getData) {
                // var parsedData = JSON.parse(getData);

                getData.forEach((seller) => {
                    if (seller.role === "seller") {
                        seller.userImg = e.target.result;
                        localStorage.setItem(
                            "users",
                            JSON.stringify(parsedData)
                        );
                    }
                });
            }
        };

        reader.readAsDataURL(file);
    }
});

document.getElementById("saveBtn").addEventListener("click", function () {
    var valid = true; // Flag to track if all fields are valid

    if (currentEditSection === "password") {
        var currentPassword = document.getElementById(
            "modal-currentpassword"
        ).value;
        var newPassword = document.getElementById("modal-newPassword").value;
        var confirmPassword = document.getElementById(
            "modal-confirmPassword"
        ).value;

        if (!currentPassword) {
            alert("Current password is required.");
            valid = false;
        }

        if (!newPassword) {
            alert("New password is required.");
            valid = false;
        }

        if (!confirmPassword) {
            alert("Confirm password is required.");
            valid = false;
        }

        if (newPassword !== confirmPassword) {
            alert("New password and confirm password do not match.");
            valid = false;
        }

        if (newPassword.length < 8) {
            alert("Password must not be less than 8 characters.");
            valid = false;
        }

        if (valid) {
            // var storedData = localStorage.getItem("userData");
            if (getData) {
                // var parsedData = JSON.parse(getData);
                getData.forEach((seller) => {
                    if (seller.role === "seller") {
                        if (seller.password === currentPassword) {
                            seller.password = newPassword;
                            localStorage.setItem(
                                "users",
                                JSON.stringify(getData)
                            );
                            alert("Password changed successfully!");
                        } else {
                            alert("Current password is incorrect.");
                        }
                    }
                });
            } else {
                alert("No user data found in localStorage.");
            }

            // Close the modal after saving
            bootstrap.Modal.getInstance(
                document.getElementById("editModal")
            ).hide();
        }
    } else {
        // Validate profile data fields
        fields[currentEditSection].forEach((field) => {
            let newValue = document.getElementById(`modal-${field.id}`).value;

            if (field.id === "firstName" || field.id === "lastName") {
                // Allow spaces for first and last name, but only alphabetic
                if (!/^[a-zA-Z\s]+$/.test(newValue)) {
                    alert(
                        `${field.label} should only contain letters and spaces (no numbers or special characters).`
                    );
                    valid = false;
                }
            // } else if (field.id === "phone") {
            //     // Validate phone number (10 digits)
            //     const phoneRegex = /^\d{10}$/;
            //     if (!phoneRegex.test(newValue)) {
            //         alert("Please enter a valid 10-digit phone number.");
            //         valid = false;
            //     }
            // } else if (field.id === "email") {
            //     // Validate email format
            //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            //     if (!emailRegex.test(newValue)) {
            //         alert("Please enter a valid email address.");
            //         valid = false;
            //     }
            } else if (field.id === "userImg") {
                // Image URL validation (basic URL check)
                if (!newValue) {
                    alert("User image URL is required.");
                    valid = false;
                }
            } 
           
        });

        if (valid) {
            // let storedData = localStorage.getItem("userData");

            if (getData) {
                // let parsedData = JSON.parse(getData);
                getData.forEach((seller) => {
                    if (seller.role === "seller") {
                        fields[currentEditSection].forEach((field) => {
                            var newValue = document.getElementById(
                                `modal-${field.id}`
                            ).value;

                            if (
                                field.id === "firstName" ||
                                field.id === "lastName"
                            ) {
                                seller.name = `${
                                    document.getElementById("modal-firstName")
                                        .value
                                } ${
                                    document.getElementById("modal-lastName")
                                        .value
                                }`;
                                document.getElementById(
                                    "headerName"
                                ).innerText = seller.name;
                            
                            } else if (field.id === "userImg") {
                                seller.userImg =
                                    document.getElementById(
                                        "modal-userImg"
                                    ).value;
                            } 
                        });

                        // Save the updated user data in local storage
                        localStorage.setItem(
                            "users",
                            JSON.stringify(getData)
                        );
                    }
                });
            } else {
                alert("No user data found in localStorage.");
            }

            // Close the modal after saving
            bootstrap.Modal.getInstance(
                document.getElementById("editModal")
            ).hide();
            loadUserData();
        } else {
            alert("Please make sure that all fields match the validation");
        }
    }
});

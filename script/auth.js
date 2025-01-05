import { localStorageInitializer } from "./utils/localStorage.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import {
  validateUserType,
  validateEmail,
  validateLocation,
  validateName,
  validatePassword,
  validatePhoneNumber,
} from "./utils/validation.js";

// Initialize local storage (Singleton ensures it runs only once)
localStorageInitializer;

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGLNwqUDP66mgoYzqvFaQ2YPuzADCCsLs",
  authDomain: "ecommerce-c5d40.firebaseapp.com",
  projectId: "ecommerce-c5d40",
  storageBucket: "ecommerce-c5d40.firebasestorage.app",
  messagingSenderId: "854550212095",
  appId: "1:854550212095:web:890e6224b059ea66674bca",
  measurementId: "G-7N198PN05F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Function to display messages
function showMessage(elementId, message, type = "danger") {
  const messageElement = document.getElementById(elementId);
  if (messageElement) {
    messageElement.textContent = message;
    messageElement.className = `text-${type}`;
  }
}

// Sign-Up Functionality
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const country = document.getElementById("country").value;
    const city = document.getElementById("city").value;
    const phoneNumber = document.getElementById("tel").value;
    const userType = document.getElementById("userType").value;

    const address = `${country}, ${city}`;

    // Validate fields
    const firstNameError = validateName(firstName, "First name");
    const lastNameError = validateName(lastName, "Last name");
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const addressError = validateLocation(address, "Address");
    const phoneNumberError = validatePhoneNumber(phoneNumber);

    if(firstNameError){
      showMessage("signupMessage", firstNameError, "danger");
      return;
    }
    if(lastNameError){
      showMessage("signupMessage", lastNameError, "danger");
      return;
    }
    if(emailError){
      showMessage("signupMessage", emailError, "danger");
      return;
    }
    if(passwordError){

      showMessage("signupMessage", passwordError, "danger");
      return;
    }
    if(addressError){
      showMessage("signupMessage", addressError, "danger");
      return;
    }
    if(phoneNumberError){
      showMessage("signupMessage", phoneNumberError, "danger");
      return;
    }


   
    // Create user with Firebase
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Save user data to local storage
        const newUser = {
          id: Date.now(), // Unique ID
          role: userType, // Role (e.g., customer, seller, admin)
          name: `${firstName} ${lastName}`,
          email: email,
          password: password, // Note: In a real app, never store plain-text passwords
          address: address, // Save address
          phoneNumber: phoneNumber, // Save phone number
          orders: [], // Initialize empty orders array
          products: [], // Initialize empty products array (for sellers)
          
        };

        // Get existing users from local storage
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // Add the new user to the users array
        users.push(newUser);

        // Save the updated users array back to local storage
        localStorage.setItem("users", JSON.stringify(users));

        // Save the new user as the current user
        localStorage.setItem("currentUser", JSON.stringify(newUser));

        showMessage("signupMessage", "Sign-up successful! Redirecting...", "success");
        setTimeout(() => {
          window.location.href = "profile.html";
        }, 2000);
      })
      .catch((error) => {
        showMessage("signupMessage", error.message, "danger");
      });
  });
}

// Login Functionality
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    // Hardcoded admin credentials (for demonstration purposes)
    if (email === "mahmoud@gmail.com" && password === "123456") {
      const adminUser = {
        id: 0, // Unique ID for admin
        role: "admin",
        name: "Admin User",
        email: email,
        password: password, // Note: In a real app, never store plain-text passwords
        address: "", // Add address if available
        phoneNumber: "", // Add phone number if available
        orders: [],
        products: [],
      };

      // Save admin user to local storage
      localStorage.setItem("currentUser", JSON.stringify(adminUser));
      window.location.href = "profile.html";
      return;
    }

    // Sign in with Firebase
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Get existing users from local storage
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // Find the user in the users array
        const existingUser = users.find((u) => u.email === email);

        if (existingUser) {
          // Save the user data to local storage
          localStorage.setItem("currentUser", JSON.stringify(existingUser));
        } else {
          // If the user doesn't exist in local storage, create a new entry
          const newUser = {
            id: Date.now(), // Unique ID
            role: "customer", // Default role
            name: "", // Add name if available
            email: email,
            password: password, // Note: In a real app, never store plain-text passwords
            address: "", // Add address if available
            phoneNumber: "", // Add phone number if available
            orders: [], // Initialize empty orders array
            products: [], // Initialize empty products array (for sellers)
          };

          // Add the new user to the users array
          users.push(newUser);

          // Save the updated users array back to local storage
          localStorage.setItem("users", JSON.stringify(users));

          // Save the new user as the current user
          localStorage.setItem("currentUser", JSON.stringify(newUser));
        }

        showMessage("loginMessage", "Sign-in successful! Redirecting...", "success");
        setTimeout(() => {
          window.location.href = "profile.html";
        }, 2000);
      })
      .catch((error) => {
        showMessage("loginMessage", error.message, "danger");
      });
  });
}

// Forgot Password Functionality
const forgotPasswordForm = document.getElementById("forgotPasswordForm");
if (forgotPasswordForm) {
  forgotPasswordForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("forgotPasswordEmail").value;

    sendPasswordResetEmail(auth, email)
      .then(() => {
        showMessage("resetPasswordMessage", "Password reset email sent. Check your inbox.", "success");
      })
      .catch((error) => {
        showMessage("resetPasswordMessage", error.message, "danger");
      });
  });
}
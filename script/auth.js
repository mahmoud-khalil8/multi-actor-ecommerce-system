import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { showMessage, validateForm } from "./utils/validation.js";

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

// Sign-Up Functionality
export function setupSignup() {
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
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

      const errors = validateForm({ firstName, lastName, email, password, address, phoneNumber });
      if (errors.length > 0) {
        showMessage("signupMessage", errors.join(" "), "danger");
        return;
      }

      try {
        // Create user with Firebase
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const newUser = {
          id: user.uid,
          role: userType,
          name: `${firstName} ${lastName}`,
          email: email,
          address: address,
          phoneNumber: phoneNumber,
        };

        const users = JSON.parse(localStorage.getItem("users")) || [];
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        localStorage.setItem("currentUser", JSON.stringify(newUser));

        showMessage("signupMessage", "Sign-up successful! Redirecting...", "success");
        setTimeout(() => {
          switch (userType) {
            case "customer":
              window.location.href = "home.html";
              break;
            case "seller":
              window.location.href = "home.html";
              break;
            default:
              console.error("Invalid user type:", userType);
              window.location.href = "login.html";
          }
        }, 2000);
      } catch (error) {
        showMessage("signupMessage", error.message, "danger");
      }
    });
  }
}

export function setupLogin() {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;

      if (email === "admin@admin.com" && password === "admin123") {
        const adminUser = {
          id: "admin-uid", 
          role: "admin",
          name: "Admin User",
          email: email,
          address: "",  
          phoneNumber: "",  
        };
         localStorage.setItem("currentUser", JSON.stringify(adminUser));

         window.location.href = "admin-dashboard.html";
        return;
      }
      const users = localStorage.getItem("users")? JSON.parse(localStorage.getItem("users")) : [];
      const existingUser = users.find((u) => u.email === email && u.role !== "admin");
      if(!existingUser){
        showMessage("loginMessage", "User not found", "danger");
        return;
      }
      

       try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

         const users = JSON.parse(localStorage.getItem("users")) || [];
        const existingUser = users.find((u) => u.email === email);

        if (existingUser) {
          localStorage.setItem("currentUser", JSON.stringify(existingUser));

          switch (existingUser.role) {
            case "customer":
              window.location.href = "home.html";
              break;
            case "seller":
              window.location.href = "home.html";
              break;
            case "admin":
              window.location.href = "home.html";
              break;
            default:
              console.error("Invalid user role:", existingUser.role);
              window.location.href = "login.html";
          }
        } 
      } catch (error) {
        showMessage("loginMessage", error.message, "danger");
      }
    });
  }
}

export function setupForgotPassword() {
  const forgotPasswordForm = document.getElementById("forgotPasswordForm");
  if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("forgotPasswordEmail").value;

      try {
        await sendPasswordResetEmail(auth, email);
        showMessage("resetPasswordMessage", "Password reset email sent. Check your inbox.", "success");
      } catch (error) {
        showMessage("resetPasswordMessage", error.message, "danger");
      }
    });
  }
}
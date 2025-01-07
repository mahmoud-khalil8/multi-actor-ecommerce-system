// main.js
import { initializeLocalStorage } from "./utils/localStorage.js";
import { setupSignup, setupLogin, setupForgotPassword } from "./auth.js";

// Initialize local storage
initializeLocalStorage();

// Set up authentication event listeners
setupSignup();
setupLogin();
setupForgotPassword();
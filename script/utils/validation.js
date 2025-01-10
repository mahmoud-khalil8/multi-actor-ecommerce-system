// utils.js
export function showMessage(elementId, message, type = "danger") {
  if(type=='danger'){}
  const messageElement = document.getElementById(elementId);
  if (messageElement) {
    messageElement.textContent = message;
    messageElement.className = `text-${type}`;
  }
}

export function validateForm(data) {
  const errors = [];
  if (!validateName(data.firstName)) errors.push("Invalid first name.");
  if (!validateName(data.lastName)) errors.push("Invalid last name.");
  if (!validateEmail(data.email)) errors.push("Invalid email.");
  if (!validatePassword(data.password)) errors.push("Invalid password.");
  if (!validateLocation(data.address)) errors.push("Invalid address.");
  if (!validatePhoneNumber(data.phoneNumber)) errors.push("Invalid phone number.");
  return errors;
}

// Validation functions
function validateName(name) {
  return name && name.length >= 2;
}

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validatePassword(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
  return regex.test(password);
}
function validateLocation(location) {
  return location && location.length >= 5;
}

export function validatePhoneNumber(phoneNumber) {
  const regex = /^010\d{8}$/; // Starts with 010 and has exactly 11 digits
  return regex.test(phoneNumber);
}


// utils.js
export function showMessage(elementId, message, type = "danger") {
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
  return password && password.length >= 6;
}

function validateLocation(location) {
  return location && location.length >= 5;
}

function validatePhoneNumber(phoneNumber) {
  const regex = /^\d{10}$/;
  return regex.test(phoneNumber);
}
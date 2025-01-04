export function validateName(name, fieldName) {
  if (!name.trim()) {
    return `${fieldName} is required.`;
  }
  if (!/^[A-Za-z\s]+$/.test(name)) {
    return `${fieldName} should contain only letters and spaces.`;
  }
  return null; // No error
}

// Function to validate country and city
export function validateLocation(location, fieldName) {
  if (!location.trim()) {
    return `${fieldName} is required.`;
  }
  return null; // No error
}

// Function to validate phone number
export function validatePhoneNumber(phoneNumber) {
  if (!phoneNumber.trim()) {
    return "Phone number is required.";
  }
  if (!/^\d{3}-\d{3}-\d{4}$/.test(phoneNumber)) {
    return "Phone number should be in the format 123-456-7890.";
  }
  return null; // No error
}

// Function to validate email
export function validateEmail(email) {
  if (!email.trim()) {
    return "Email is required.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Invalid email format.";
  }
  return null; // No error
}

// Function to validate password
export function validatePassword(password) {
  if (!password.trim()) {
    return "Password is required.";
  }
  if (password.length < 8) {
    return "Password must be at least 8 characters long.";
  }
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter.";
  }
  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter.";
  }
  if (!/[0-9]/.test(password)) {
    return "Password must contain at least one number.";
  }
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return "Password must contain at least one special character.";
  }
  return null; // No error
}
export function validateUserType(userType) {
  if (!userType) {
    return "User type is required.";
  }
  return null; // No error
}
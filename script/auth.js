// Function to display messages on the page
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded');
  // async function fetchCountries() {

  //   try {
  //       const response = await fetch('https://restcountries.com/v3.1/all');
  //       const countries = await response.json();
  //       const countrySelect = document.getElementById('country');
  //       countries
  //       .sort((a, b) => a.name.common.localeCompare(b.name.common)) // Sort alphabetically
  //         .forEach(country => {
  //           const option = document.createElement('option');
  //           option.value = country.cca2; // Country code
  //           option.textContent = country.name.common; // Country name
  //           countrySelect.appendChild(option);
  //         });
  //       } catch (error) {
  //         console.error('Error fetching countries:', error);
  //       }
  //     }

  //   // Fetch and populate cities based on the selected country
  //   async function fetchCities(countryCode) {
  //     try {
  //       const response = await fetch(`https://countriesnow.space/api/v0.1/countries/cities`, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ country: countryCode }),
  //       });
  //       const data = await response.json();
  //       const citySelect = document.getElementById('city');
  //       citySelect.innerHTML = '<option value="">Select a city</option>'; // Reset cities
  //       if (data.data) {
  //         data.data.forEach(city => {
  //           const option = document.createElement('option');
  //           option.value = city;
  //           option.textContent = city;
  //           citySelect.appendChild(option);
  //         });
  //       }
  //     } catch (error) {
  //       console.error('Error fetching cities:', error);
  //     }
  //   }

  //   // Event listeners
  //   document.addEventListener('DOMContentLoaded', fetchCountries);
  //   document.getElementById('country').addEventListener('change', function () {
  //     const countryName = this.options[this.selectedIndex].text;
  //     if (countryName) fetchCities(countryName);
  //   });
    
    function showMessage(elementId, message, type = 'danger') {
  const messageElement = document.getElementById(elementId);
  messageElement.textContent = message;
  messageElement.className = `text-${type}`; // Add class for text color
}


// Signup Form Submission
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const firstName = document.getElementById('firstName').value;
      const lastName = document.getElementById('lastName').value;
      const email = document.getElementById('signupEmail').value;
      const password = document.getElementById('signupPassword').value;
      const userType = document.getElementById('userType').value;
      
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const emailExists = users.some(user => user.email === email);
    if (emailExists) {
      showMessage('signupMessage', 'Email already exists. Please use a different email.', 'danger');
      return;
    }
    
    const newUser = { firstName, lastName, email, password, userType };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    window.location.href = 'login.html';
  });
}

const loginForm = document.getElementById('loginForm');
console.log(loginForm)
if (loginForm) {
  console.log('from login form')
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("hi")
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    const adminEmails = ["mahmoud@gmail.com"];
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    if (adminEmails.includes(email) && password === "123456") {
      console.log("hi")
      const adminUser = { firstName: "Admin", lastName: "Admin", email: email, password: password, userType: "admin" };
      localStorage.setItem('user', JSON.stringify(adminUser));
      window.location.href = 'profile.html';
      return;
    }
    
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      window.location.href = 'profile.html';
    } else {
      showMessage('loginMessage', 'Invalid email or password.', 'danger');
    }
  });
}// Function to display messages on the page

// Forgot Password Form Submission
const forgotPasswordForm = document.getElementById('forgotPasswordForm');
if (forgotPasswordForm) {
  forgotPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('forgotPasswordEmail').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email);

    if (user) {
      // Redirect to reset password page with email as a query parameter
      window.location.href = `reset-password.html?email=${encodeURIComponent(email)}`;
    } else {
      showMessage('Email not found. Please check your email address.', 'danger');
    }
  });
}

// Reset Password Form Submission
const resetPasswordForm = document.getElementById('resetPasswordForm');
if (resetPasswordForm) {
  resetPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (newPassword !== confirmPassword) {
      showMessage('Passwords do not match.', 'danger');
      return;
    }
    
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(user => user.email === email);
    
    if (userIndex !== -1) {
      users[userIndex].password = newPassword;
      localStorage.setItem('users', JSON.stringify(users));
      showMessage('Password reset successfully. You can now login with your new password.', 'success');
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 2000); // Redirect after 2 seconds
    } else {
      showMessage('User not found.', 'danger');
    }
  });
}
});
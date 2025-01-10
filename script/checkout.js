const user = JSON.parse(localStorage.getItem('currentUser'));

if (!user) {
  document.body.innerHTML = `
    <div style="display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f8d7da; color: #721c24; font-family: Arial, sans-serif;">
      <div style="text-align: center;">
        <h1>Not Authorized</h1>
        <p>You do not have permission to access this page.</p>
        <a href="login.html" style="color: #721c24; text-decoration: underline;">Go to Login</a>
      </div>
    </div>
  `;
  // Stop further execution
  throw new Error('Not Authorized');
}

window.addEventListener('load', function () {
    console.log('loaded');
  let cachedTotalPrice = localStorage.getItem('Total price');
  let first = document.getElementById('first-name');
  let last = document.getElementById('last-name');
  let country = document.getElementById('country');
  let code = document.getElementById('code');
  let city = document.getElementById('city');
  let street = document.getElementById('street');
  let number = document.getElementById('number');
  let email = document.getElementById('email');
  let check = document.getElementById('checkk');
  let form = document.querySelector('.all');
  let inputs = document.querySelectorAll('input[type="text"], input[type="radio"],input[type="email"],select');
  let radio1 = document.getElementById('radio1');
  let radio2 = document.getElementById('radio2');
  let label2 = document.getElementById('label2');
  let totalPrice = document.getElementById('total-price');

  // Modal for successful checkout
  const successModal = new bootstrap.Modal(document.getElementById('successModal'));

  inputs.forEach(function (input) {
    input.addEventListener('blur', function () {
      if (input.value.trim() === "") {
        input.style.border = "3px solid red";
        showMessage(input, `${input.placeholder || input.name || "Field"} is required`);
      }
    });

    input.addEventListener('focus', function () {
      input.style.border = "";
      hideMessage(input);
    });
  });

  check.addEventListener('click', function (e) {
    e.preventDefault();
    if (validateInputs()) {
      // Save checkout details to localStorage
      const order = {
        id: Date.now(), // Unique order ID
        user: user.id, // User ID
        firstName: first.value.trim(),
        lastName: last.value.trim(),
        email: email.value.trim(),
        address: {
          country: country.value.trim(),
          city: city.value.trim(),
          street: street.value.trim(),
          zipCode: code.value.trim(),
        },
        phoneNumber: number.value.trim(),
        paymentMethod: radio1.checked ? "Credit Card" : "Cash on Delivery",
        totalPrice: parseFloat(cachedTotalPrice),
        date: new Date().toISOString(),
      };

      // Save order to localStorage
      const orders = JSON.parse(localStorage.getItem('orders')) || [];
      orders.push(order);
      localStorage.setItem('orders', JSON.stringify(orders));

      // Clear the cart after successful checkout
      localStorage.removeItem('cart');
      localStorage.removeItem('Total price');

      // Show success modal
      successModal.show();
      window.location.href = 'order.html';
      // Reset the form
      form.reset();
    }
  });

  radio1.addEventListener('click', () => {
    hideMessage(radio1);
    hideMessage(radio2);
    hideMessage(label2);
  });

  radio2.addEventListener('change', () => {
    hideMessage(radio1);
    hideMessage(radio2);
    hideMessage(label2);
  });

  function validateInputs() {
    let isValid = true;
    let inputsToValidate = [first, last, country, code, city, number, street, email];

    inputsToValidate.forEach((input) => {
      let value = input.value.trim();
      if (value === "") {
        let message = `${input.placeholder || "please select one"}`;
        showMessage(input, message);
        isValid = false;
      } else {
        hideMessage(input);
      }
    });

    if (first.value.trim() !== "" && !validateName(first.value.trim())) {
      showMessage(first, "Please enter a valid First Name");
      isValid = false;
    }
    if (last.value.trim() !== "" && !validateName(last.value.trim())) {
      showMessage(last, "Please enter a valid Last Name");
      isValid = false;
    }
    if (code.value.trim() !== "" && !validateZipCode(code.value.trim())) {
      showMessage(code, "Please enter a valid Zip Code");
      isValid = false;
    }
    if (number.value.trim() !== "" && !validatePhoneNumber(number.value.trim())) {
      showMessage(number, "Please enter a valid Phone Number");
      isValid = false;
    }
    if (email.value.trim() !== "" && !validateEmail(email.value.trim())) {
      showMessage(email, "Please enter a valid Email Address");
      isValid = false;
    }
    if (!radio1.checked && !radio2.checked) {
      showMessage(radio2);
      showMessage(radio1);
      showMessage(label2, "please select a money transfer method");
      isValid = false;
    }
    return isValid;
  }

  function showMessage(input, message) {
    let span = input.nextElementSibling;
    if (!span || !span.classList.contains("error-message")) {
      span = document.createElement("span");
      span.style.color = "red";
      span.style.display = "block";
      span.classList.add("error-message");
      span.style.marginTop = "10px";
      input.insertAdjacentElement("afterend", span);
    }
    span.textContent = message;
    if (input != label2) {
      input.style.border = "3px solid red";
    }
  }

  function hideMessage(input) {
    let span = input.nextElementSibling;
    if (span && span.classList.contains("error-message")) {
      span.remove();
    }
    input.style.border = "";
  }

  function validateEmail(email) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }

  function validateName(name) {
    return name && name.length >= 2;
  }

  function validatePhoneNumber(phoneNumber) {
    const regex = /^\d{11}$/;
    return regex.test(phoneNumber);
  }

  function validateZipCode(code) {
    const regex = /^\d{5}$/;
    return regex.test(code);
  }

  totalPrice.innerHTML = cachedTotalPrice;
});
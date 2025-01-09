window.addEventListener('load', function() {
    let first = document.getElementById('first-name');
    let last = document.getElementById('last-name');
    let country = document.getElementById('country')
    let code = document.getElementById('code')
    let city = document.getElementById('city');
    let street = document.getElementById('street');
    let number = document.getElementById('number')
    let email = document.getElementById('email');
    let check = document.getElementById('checkk');
    let form = document.querySelector('.all');
    let inputs = document.querySelectorAll('input[type="text"], input[type="radio"]');
    let paymentRadios = document.querySelectorAll('input[name="payment"]')

    var myModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
    inputs.forEach(function(input) {
        input.addEventListener('blur', function() {
            if (input.value.trim() === "") {
                input.style.border = "3px solid red";
                showMessage(input, `${input.placeholder || input.name || "Field"} is required`);
            }
        });

        input.addEventListener('focus', function() {
            input.style.border = "";
            hideMessage(input);
        });
    });

    check.addEventListener('click', function(e) {
        e.preventDefault();
        if (validateInputs()) {
            form.submit(); 
            myModal.show();
        }
    });

    function validateInputs() {
        let isValid = true;
        let inputsToValidate = [first, last,country,code, city,number, street, email];

        inputsToValidate.forEach((input) => {
            let value = input.value.trim();
            if (value === "") {
                let message = `${input.placeholder || "please select one" }`;
                showMessage(input, message);
                isValid = false;
            } else {
                hideMessage(input);
            }
        });

        if (first.value.trim() !== "" && !validateName(first.value.trim())) {
            showMessage(email, "Please enter a valid First Name");
            isValid = false;
        }
        if (second.value.trim() !== "" && !validateName(last.value.trim())) {
            showMessage(email, "Please enter a valid Last Name");
            isValid = false;
        }
        if (code.value.trim() !== "" && !validateZipCode(code.value.trim())) {
            showMessage(email, "Please enter a valid Zip Code");
            isValid = false;
        }
         if (number.value.trim() !== "" && !validatePhoneNumber(number.value.trim())) {
            showMessage(email, "Please enter a valid Phone Number");
            isValid = false;
        }
        if (email.value.trim() !== "" && !validateEmail(email.value.trim())) {
            showMessage(email, "Please enter a valid Email Address");
            isValid = false;
        }
        let paymentSelected = false;
        paymentRadios.forEach((radio) => {
            if (radio.checked) {
                paymentSelected = true;
            }
        });
        if (!paymentSelected) {
            showMessage(paymentRadios[0], "Please select a payment method.");
            showMessage(paymentRadios[1], "Please select a payment method.");
            isValid = false;
        } else {
            hideMessage(paymentRadios[0]);
            hideMessage(paymentRadios[1]);
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
        input.style.border = "3px solid red";
    }

    function hideMessage(input) {
        let span = input.nextElementSibling;
        if (span && span.classList.contains("error-message")) {
            span.remove();
        }
        input.style.border = "";
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function validateName(name) {
        return name && name.length >= 2;
    }

    function validatePhoneNumber(phoneNumber) {
        const regex = /^\d{10}$/;
        return regex.test(phoneNumber);
    }

    function validateZipCode(code) {
        const regex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
        return regex.test(code);
    }
});
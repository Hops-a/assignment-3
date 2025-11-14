// validation.js - Enhanced with real-time validation for all fields

// Global error tracking
var fieldErrors = {
    firstName: true,
    middleInitial: false,
    lastName: true,
    dob: true,
    patientId: true,
    email: true,
    phone: true,
    address1: true,
    address2: false,
    city: true,
    state: true,
    zip: true,
    userId: true,
    password: true,
    confirmPassword: true
};

// Check if form has any errors
function hasErrors() {
    for (var key in fieldErrors) {
        if (fieldErrors[key]) return true;
    }
    return false;
}

// Update submit button state
function updateSubmitButton() {
    var submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
        submitBtn.disabled = hasErrors();
    }
}

// Update health slider value
function updateHealthValue(value) {
    document.getElementById('healthValue').textContent = value;
}

// Convert user ID to lowercase
function convertToLowercase(field) {
    field.value = field.value.toLowerCase();
    checkUserId();
}

// Validate First Name
function validateFirstName() {
    var field = document.getElementById('firstName');
    var error = document.getElementById('firstNameError');
    var value = field.value.trim();
    
    if (value.length === 0) {
        error.textContent = "First name is required";
        error.style.color = "red";
        fieldErrors.firstName = true;
    } else if (value.length > 30) {
        error.textContent = "Max 30 characters";
        error.style.color = "red";
        fieldErrors.firstName = true;
    } else if (!/^[A-Za-z\-']+$/.test(value)) {
        error.textContent = "Letters, apostrophes, dashes only";
        error.style.color = "red";
        fieldErrors.firstName = true;
    } else {
        error.textContent = "✓";
        error.style.color = "green";
        fieldErrors.firstName = false;
    }
    updateSubmitButton();
    checkPassword(); // Recheck password in case it contains name
}

// Validate Middle Initial
function validateMiddleInitial() {
    var field = document.getElementById('middleInitial');
    var error = document.getElementById('middleInitialError');
    var value = field.value.trim();
    
    if (value.length === 0) {
        error.textContent = "";
        fieldErrors.middleInitial = false;
    } else if (!/^[A-Za-z]$/.test(value)) {
        error.textContent = "One letter only";
        error.style.color = "red";
        fieldErrors.middleInitial = true;
    } else {
        error.textContent = "✓";
        error.style.color = "green";
        fieldErrors.middleInitial = false;
    }
    updateSubmitButton();
}

// Validate Last Name
function validateLastName() {
    var field = document.getElementById('lastName');
    var error = document.getElementById('lastNameError');
    var value = field.value.trim();
    
    if (value.length === 0) {
        error.textContent = "Last name is required";
        error.style.color = "red";
        fieldErrors.lastName = true;
    } else if (value.length > 30) {
        error.textContent = "Max 30 characters";
        error.style.color = "red";
        fieldErrors.lastName = true;
    } else if (!/^[A-Za-z\-'2-5]+$/.test(value)) {
        error.textContent = "Letters, dashes, apostrophes, numbers 2-5 only";
        error.style.color = "red";
        fieldErrors.lastName = true;
    } else {
        error.textContent = "✓";
        error.style.color = "green";
        fieldErrors.lastName = false;
    }
    updateSubmitButton();
    checkPassword(); // Recheck password in case it contains name
}

// Validate Date of Birth
function validateDOB() {
    var field = document.getElementById('dob');
    var error = document.getElementById('dobError');
    var value = field.value;
    
    if (!value) {
        error.textContent = "Date of birth is required";
        error.style.color = "red";
        fieldErrors.dob = true;
    } else {
        var dobDate = new Date(value);
        var today = new Date();
        var maxDate = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate());
        
        if (dobDate > today) {
            error.textContent = "Date cannot be in the future";
            error.style.color = "red";
            fieldErrors.dob = true;
        } else if (dobDate < maxDate) {
            error.textContent = "Date cannot be more than 120 years ago";
            error.style.color = "red";
            fieldErrors.dob = true;
        } else {
            error.textContent = "✓";
            error.style.color = "green";
            fieldErrors.dob = false;
        }
    }
    updateSubmitButton();
}

// Format Patient ID (SSN) as user types
function formatPatientId() {
    var field = document.getElementById('patientId');
    var value = field.value.replace(/\D/g, ''); // Remove non-digits
    
    if (value.length > 9) {
        value = value.substring(0, 9);
    }
    
    var formatted = '';
    if (value.length > 0) {
        formatted = value.substring(0, 3);
        if (value.length > 3) {
            formatted += '-' + value.substring(3, 5);
        }
        if (value.length > 5) {
            formatted += '-' + value.substring(5, 9);
        }
    }
    
    field.value = formatted;
    validatePatientId();
}

// Validate Patient ID
function validatePatientId() {
    var field = document.getElementById('patientId');
    var error = document.getElementById('patientIdError');
    var value = field.value;
    
    if (value.length === 0) {
        error.textContent = "Patient ID is required";
        error.style.color = "red";
        fieldErrors.patientId = true;
    } else if (!/^\d{3}-\d{2}-\d{4}$/.test(value)) {
        error.textContent = "Format: XXX-XX-XXXX (9 digits)";
        error.style.color = "red";
        fieldErrors.patientId = true;
    } else {
        error.textContent = "✓";
        error.style.color = "green";
        fieldErrors.patientId = false;
    }
    updateSubmitButton();
}

// Validate Email
function validateEmail() {
    var field = document.getElementById('email');
    var error = document.getElementById('emailError');
    var value = field.value.trim().toLowerCase();
    field.value = value; // Force lowercase
    
    if (value.length === 0) {
        error.textContent = "Email is required";
        error.style.color = "red";
        fieldErrors.email = true;
    } else if (!/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(value)) {
        error.textContent = "Invalid email format (name@domain.com)";
        error.style.color = "red";
        fieldErrors.email = true;
    } else {
        error.textContent = "✓";
        error.style.color = "green";
        fieldErrors.email = false;
    }
    updateSubmitButton();
}

// Format Phone as user types
function formatPhone() {
    var field = document.getElementById('phone');
    var value = field.value.replace(/\D/g, ''); // Remove non-digits
    
    if (value.length > 10) {
        value = value.substring(0, 10);
    }
    
    var formatted = '';
    if (value.length > 0) {
        formatted = value.substring(0, 3);
        if (value.length > 3) {
            formatted += '-' + value.substring(3, 6);
        }
        if (value.length > 6) {
            formatted += '-' + value.substring(6, 10);
        }
    }
    
    field.value = formatted;
    validatePhone();
}

// Validate Phone
function validatePhone() {
    var field = document.getElementById('phone');
    var error = document.getElementById('phoneError');
    var value = field.value;
    
    if (value.length === 0) {
        error.textContent = "Phone is required";
        error.style.color = "red";
        fieldErrors.phone = true;
    } else if (!/^\d{3}-\d{3}-\d{4}$/.test(value)) {
        error.textContent = "Format: XXX-XXX-XXXX (10 digits)";
        error.style.color = "red";
        fieldErrors.phone = true;
    } else {
        error.textContent = "✓";
        error.style.color = "green";
        fieldErrors.phone = false;
    }
    updateSubmitButton();
}

// Validate Address 1
function validateAddress1() {
    var field = document.getElementById('address1');
    var error = document.getElementById('address1Error');
    var value = field.value.trim();
    
    if (value.length === 0) {
        error.textContent = "Address is required";
        error.style.color = "red";
        fieldErrors.address1 = true;
    } else if (value.length < 2) {
        error.textContent = "At least 2 characters";
        error.style.color = "red";
        fieldErrors.address1 = true;
    } else if (value.length > 30) {
        error.textContent = "Max 30 characters";
        error.style.color = "red";
        fieldErrors.address1 = true;
    } else {
        error.textContent = "✓";
        error.style.color = "green";
        fieldErrors.address1 = false;
    }
    updateSubmitButton();
}

// Validate Address 2 (optional)
function validateAddress2() {
    var field = document.getElementById('address2');
    var error = document.getElementById('address2Error');
    var value = field.value.trim();
    
    if (value.length === 0) {
        error.textContent = "";
        fieldErrors.address2 = false;
    } else if (value.length < 2) {
        error.textContent = "At least 2 characters if entered";
        error.style.color = "red";
        fieldErrors.address2 = true;
    } else if (value.length > 30) {
        error.textContent = "Max 30 characters";
        error.style.color = "red";
        fieldErrors.address2 = true;
    } else {
        error.textContent = "✓";
        error.style.color = "green";
        fieldErrors.address2 = false;
    }
    updateSubmitButton();
}

// Validate City
function validateCity() {
    var field = document.getElementById('city');
    var error = document.getElementById('cityError');
    var value = field.value.trim();
    
    if (value.length === 0) {
        error.textContent = "City is required";
        error.style.color = "red";
        fieldErrors.city = true;
    } else if (value.length < 2) {
        error.textContent = "At least 2 characters";
        error.style.color = "red";
        fieldErrors.city = true;
    } else if (value.length > 30) {
        error.textContent = "Max 30 characters";
        error.style.color = "red";
        fieldErrors.city = true;
    } else if (!/^[A-Za-z\s\-]+$/.test(value)) {
        error.textContent = "Letters, spaces, dashes only";
        error.style.color = "red";
        fieldErrors.city = true;
    } else {
        error.textContent = "✓";
        error.style.color = "green";
        fieldErrors.city = false;
    }
    updateSubmitButton();
}

// Validate State
function validateState() {
    var field = document.getElementById('state');
    var error = document.getElementById('stateError');
    var value = field.value;
    
    if (!value) {
        error.textContent = "State is required";
        error.style.color = "red";
        fieldErrors.state = true;
    } else {
        error.textContent = "✓";
        error.style.color = "green";
        fieldErrors.state = false;
    }
    updateSubmitButton();
}

// Format and Validate ZIP
function formatZip() {
    var field = document.getElementById('zip');
    var value = field.value.replace(/\D/g, ''); // Remove non-digits
    
    // Truncate to 5 digits automatically
    if (value.length > 5) {
        value = value.substring(0, 5);
    }
    
    field.value = value;
    validateZip();
}

// Validate ZIP
function validateZip() {
    var field = document.getElementById('zip');
    var error = document.getElementById('zipError');
    var value = field.value;
    
    if (value.length === 0) {
        error.textContent = "ZIP is required";
        error.style.color = "red";
        fieldErrors.zip = true;
    } else if (!/^\d{5}$/.test(value)) {
        error.textContent = "5 digits required";
        error.style.color = "red";
        fieldErrors.zip = true;
    } else {
        error.textContent = "✓";
        error.style.color = "green";
        fieldErrors.zip = false;
    }
    updateSubmitButton();
}

// Check User ID
function checkUserId() {
    var field = document.getElementById('userId');
    var error = document.getElementById('userIdError');
    var value = field.value.trim();
    
    var problems = [];
    
    if (value.length === 0) {
        error.textContent = "User ID is required";
        error.style.color = "red";
        fieldErrors.userId = true;
    } else {
        // Check if starts with letter
        if (!/^[A-Za-z]/.test(value)) {
            problems.push("must start with letter");
        }
        
        // Check length
        if (value.length < 5) {
            problems.push("at least 5 chars");
        } else if (value.length > 30) {
            problems.push("max 30 chars");
        }
        
        // Check for invalid characters
        if (!/^[A-Za-z0-9_\-]+$/.test(value)) {
            problems.push("letters, numbers, dash, underscore only");
        }
        
        if (problems.length > 0) {
            error.textContent = "Need: " + problems.join(", ");
            error.style.color = "red";
            fieldErrors.userId = true;
        } else {
            error.textContent = "✓";
            error.style.color = "green";
            fieldErrors.userId = false;
        }
    }
    updateSubmitButton();
    checkPassword(); // Recheck password since it can't contain userId
}

// Check password requirements
function checkPassword() {
    var pass = document.getElementById('password').value;
    var error = document.getElementById('passError');
    var userId = document.getElementById('userId').value.toLowerCase();
    var firstName = document.getElementById('firstName').value.toLowerCase();
    var lastName = document.getElementById('lastName').value.toLowerCase();
    
    if (pass.length === 0) {
        error.textContent = "Password is required";
        error.style.color = "red";
        fieldErrors.password = true;
        updateSubmitButton();
        return;
    }
    
    var problems = [];
    
    // Check for uppercase letter
    var hasUpper = false;
    for (var i = 0; i < pass.length; i++) {
        if (pass[i] >= 'A' && pass[i] <= 'Z') {
            hasUpper = true;
            break;
        }
    }
    if (!hasUpper) problems.push("uppercase");
    
    // Check for lowercase letter
    var hasLower = false;
    for (var i = 0; i < pass.length; i++) {
        if (pass[i] >= 'a' && pass[i] <= 'z') {
            hasLower = true;
            break;
        }
    }
    if (!hasLower) problems.push("lowercase");
    
    // Check for number
    var hasNumber = false;
    for (var i = 0; i < pass.length; i++) {
        if (pass[i] >= '0' && pass[i] <= '9') {
            hasNumber = true;
            break;
        }
    }
    if (!hasNumber) problems.push("number");
    
    // Check for special character
    var specialChars = "!@#%^&*()-_+=\\/><.,`~";
    var hasSpecial = false;
    for (var i = 0; i < pass.length; i++) {
        if (specialChars.indexOf(pass[i]) >= 0) {
            hasSpecial = true;
            break;
        }
    }
    if (!hasSpecial) problems.push("special char");
    
    // Check length
    if (pass.length < 8) problems.push("8+ chars");
    
    // Check if password contains userId
    if (userId && pass.toLowerCase().indexOf(userId) >= 0) {
        problems.push("can't contain userId");
    }
    
    // Check if password contains first name
    if (firstName && pass.toLowerCase().indexOf(firstName) >= 0) {
        problems.push("can't contain first name");
    }
    
    // Check if password contains last name
    if (lastName && pass.toLowerCase().indexOf(lastName) >= 0) {
        problems.push("can't contain last name");
    }
    
    // Display results
    if (problems.length > 0) {
        error.textContent = "Need: " + problems.join(", ");
        error.style.color = "red";
        fieldErrors.password = true;
    } else {
        error.textContent = "✓";
        error.style.color = "green";
        fieldErrors.password = false;
    }
    updateSubmitButton();
}

// Check if passwords match
function checkPasswordMatch() {
    var pass = document.getElementById('password').value;
    var confirm = document.getElementById('confirmPassword').value;
    var error = document.getElementById('confirmError');
    
    if (confirm.length === 0) {
        error.textContent = "Please confirm password";
        error.style.color = "red";
        fieldErrors.confirmPassword = true;
    } else if (pass === confirm) {
        error.textContent = "✓ Passwords match";
        error.style.color = "green";
        fieldErrors.confirmPassword = false;
    } else {
        error.textContent = "Passwords do not match";
        error.style.color = "red";
        fieldErrors.confirmPassword = true;
    }
    updateSubmitButton();
}

// Show review of form data
function reviewForm() {
    var form = document.getElementById('patientForm');
    
    // Run all validations first
    validateFirstName();
    validateMiddleInitial();
    validateLastName();
    validateDOB();
    validatePatientId();
    validateEmail();
    validatePhone();
    validateAddress1();
    validateAddress2();
    validateCity();
    validateState();
    validateZip();
    checkUserId();
    checkPassword();
    checkPasswordMatch();
    
    // Check if form has errors
    if (hasErrors()) {
        alert("Please correct all errors before reviewing the form.");
        return;
    }
    
    // Get all form values
    var firstName = document.getElementById('firstName').value;
    var mi = document.getElementById('middleInitial').value;
    var lastName = document.getElementById('lastName').value;
    var dob = document.getElementById('dob').value;
    var patientId = document.getElementById('patientId').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var address1 = document.getElementById('address1').value;
    var address2 = document.getElementById('address2').value;
    var city = document.getElementById('city').value;
    var state = document.getElementById('state').value;
    var zip = document.getElementById('zip').value;
    var symptoms = document.getElementById('symptoms').value;
    var userId = document.getElementById('userId').value;
    var password = document.getElementById('password').value;
    var health = document.getElementById('healthScale').value;
    
    // Get checked boxes
    var checkboxes = document.getElementsByName('history');
    var checkedItems = "";
    var count = 0;
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            if (count > 0) checkedItems += ", ";
            checkedItems += checkboxes[i].value;
            count++;
        }
    }
    if (checkedItems === "") checkedItems = "None";
    
    // Get radio button values
    var genderRadios = document.getElementsByName('gender');
    var gender = "Not specified";
    for (var i = 0; i < genderRadios.length; i++) {
        if (genderRadios[i].checked) {
            gender = genderRadios[i].value;
            break;
        }
    }
    
    var vaccinatedRadios = document.getElementsByName('vaccinated');
    var vaccinated = "Not specified";
    for (var i = 0; i < vaccinatedRadios.length; i++) {
        if (vaccinatedRadios[i].checked) {
            vaccinated = vaccinatedRadios[i].value;
            break;
        }
    }
    
    var insuranceRadios = document.getElementsByName('insurance');
    var insurance = "Not specified";
    for (var i = 0; i < insuranceRadios.length; i++) {
        if (insuranceRadios[i].checked) {
            insurance = insuranceRadios[i].value;
            break;
        }
    }
    
    // Format date
    var dobDate = new Date(dob);
    var dobFormatted = (dobDate.getMonth() + 1) + '/' + dobDate.getDate() + '/' + dobDate.getFullYear();
    
    // Build review HTML
    var html = '<table style="width:100%">';
    html += '<tr><td><strong>Name:</strong></td><td>' + firstName + ' ';
    if (mi) html += mi + '. ';
    html += lastName + '</td><td style="color:green">✓ pass</td></tr>';
    
    html += '<tr><td><strong>Date of Birth:</strong></td><td>' + dobFormatted + '</td><td style="color:green">✓ pass</td></tr>';
    
    html += '<tr><td><strong>Patient ID:</strong></td><td>***-**-****</td><td style="color:green">✓ pass</td></tr>';
    
    html += '<tr><td><strong>Email:</strong></td><td>' + email + '</td><td style="color:green">✓ pass</td></tr>';
    
    html += '<tr><td><strong>Phone:</strong></td><td>' + phone + '</td><td style="color:green">✓ pass</td></tr>';
    
    html += '<tr><td><strong>Address:</strong></td><td>' + address1 + '<br>';
    if (address2) html += address2 + '<br>';
    html += city + ', ' + state + ' ' + zip + '</td><td style="color:green">✓ pass</td></tr>';
    
    html += '<tr><td colspan="3"><hr></td></tr>';
    
    html += '<tr><td><strong>Symptoms:</strong></td><td colspan="2">';
    html += symptoms ? symptoms : 'None';
    html += '</td></tr>';
    
    html += '<tr><td><strong>Medical History:</strong></td><td colspan="2">' + checkedItems + '</td></tr>';
    
    html += '<tr><td><strong>Gender:</strong></td><td colspan="2">' + gender + '</td></tr>';
    
    html += '<tr><td><strong>Vaccinated:</strong></td><td colspan="2">' + vaccinated + '</td></tr>';
    
    html += '<tr><td><strong>Insurance:</strong></td><td colspan="2">' + insurance + '</td></tr>';
    
    html += '<tr><td><strong>Health Level:</strong></td><td colspan="2">' + health + ' / 10</td></tr>';
    
    html += '<tr><td colspan="3"><hr></td></tr>';
    
    html += '<tr><td><strong>User ID:</strong></td><td colspan="2">' + userId + '</td></tr>';
    
    html += '<tr><td><strong>Password:</strong></td><td colspan="2">' + password + ' (normally hidden)</td></tr>';
    
    html += '</table>';
    
    // Display review
    document.getElementById('reviewContent').innerHTML = html;
    document.getElementById('reviewSection').style.display = 'block';
    document.getElementById('reviewSection').scrollIntoView({ behavior: 'smooth' });
}

// Hide review section
function hideReview() {
    document.getElementById('reviewSection').style.display = 'none';
}

// Submit the form
function submitForm() {
    // Run all validations one final time
    validateFirstName();
    validateMiddleInitial();
    validateLastName();
    validateDOB();
    validatePatientId();
    validateEmail();
    validatePhone();
    validateAddress1();
    validateAddress2();
    validateCity();
    validateState();
    validateZip();
    checkUserId();
    checkPassword();
    checkPasswordMatch();
    
    if (hasErrors()) {
        alert("Please correct all errors before submitting the form.");
        return;
    }
    
    alert("Form submitted successfully!");
    window.location.href = "thankyou.html";
}
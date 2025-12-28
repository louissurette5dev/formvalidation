// Select Element //
const form = document.getElementById("signupForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

// Validation helpers //
function showError(input, message) {
  const error = input.nextElementSibling;
  input.className = "error";
  error.textContent = message;
}

function showSuccess(input) {
  const error = input.nextElementSibling;
  input.className = "success";
  error.textContent = "";
}

// Field validation logic //
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function checkRequired(input) {
  if (input.value.trim() === "") {
    showError(input, "This field is required");
    return false;
  }
  showSuccess(input);
  return true;
}

//Field validation logic// 
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function checkRequired(input) {
  if (input.value.trim() === "") {
    showError(input, "This field is required");
    return false;
  }
  showSuccess(input);
  return true;
}

//Form submit handling//
form.addEventListener("submit", function (e) {
  e.preventDefault();

  let isValid = true;

  isValid &= checkRequired(nameInput);

  if (!validateEmail(emailInput.value)) {
    showError(emailInput, "Enter a valid email");
    isValid = false;
  } else {
    showSuccess(emailInput);
  }

  if (passwordInput.value.length < 6) {
    showError(passwordInput, "Password must be at least 6 characters");
    isValid = false;
  } else {
    showSuccess(passwordInput);
  }

  if (passwordInput.value !== confirmPasswordInput.value) {
    showError(confirmPasswordInput, "Passwords do not match");
    isValid = false;
  } else {
    showSuccess(confirmPasswordInput);
  }

  if (isValid) {
    saveToLocalStorage();
    alert("Form submitted successfully!");
    form.reset();
  }
});


//Save data//
function saveToLocalStorage() {
  const data = {
    name: nameInput.value,
    email: emailInput.value
  };
  localStorage.setItem("formData", JSON.stringify(data));
}

//Restore data//
window.addEventListener("DOMContentLoaded", () => {
  const saved = JSON.parse(localStorage.getItem("formData"));
  if (saved) {
    nameInput.value = saved.name || "";
    emailInput.value = saved.email || "";
  }
});

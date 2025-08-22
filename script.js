const signupBtn = document.getElementById("signup-btn");
const loginBtn = document.getElementById("login-btn");

function toggleForms() {
  document.getElementById("login-form").classList.toggle("active");
  document.getElementById("signup-form").classList.toggle("active");
  checkLoginFields();
  validatePassword();
}

function validatePassword() {
  const password = document.getElementById("signup-password").value;
  const name = document.getElementById("signup-name").value;
  const email = document.getElementById("signup-email").value;

  const isLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*]/.test(password);

  document.getElementById("length").className = isLength ? "valid" : "invalid";
  document.getElementById("uppercase").className = hasUpper ? "valid" : "invalid";
  document.getElementById("lowercase").className = hasLower ? "valid" : "invalid";
  document.getElementById("number").className = hasNumber ? "valid" : "invalid";
  document.getElementById("special").className = hasSpecial ? "valid" : "invalid";

  signupBtn.disabled = !(isLength && hasUpper && hasLower && hasNumber && hasSpecial && name && email);
}

function checkLoginFields() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  loginBtn.disabled = !(email && password);
}

function signup() {
  const name = document.getElementById("signup-name").value;
  alert("✅ Signup successful! Welcome, " + name);
  toggleForms();
}

function login() {
  alert("✅ Login successful! Redirecting...");
  window.location.href = "menu.html";
}

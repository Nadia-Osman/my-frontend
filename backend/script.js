(() => {
  const signupBtn = document.getElementById("signup-btn");
  const loginBtn = document.getElementById("login-btn");
  const messageDiv = document.getElementById("message");

  function toggleForms() {
    document.getElementById("login-form").classList.toggle("active");
    document.getElementById("signup-form").classList.toggle("active");
    clearMessage();
    validateForm();
    checkLoginFields();
  }

  function clearMessage() {
    messageDiv.textContent = '';
    messageDiv.style.color = 'green';
  }

  function validatePassword() {
    const password = document.getElementById("signup-password").value;

    const checks = {
      isLength: password.length >= 8,
      hasUpper: /[A-Z]/.test(password),
      hasLower: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecial: /[!@#$%^&*]/.test(password)
    };

    document.getElementById("length").className = checks.isLength ? "valid" : "invalid";
    document.getElementById("uppercase").className = checks.hasUpper ? "valid" : "invalid";
    document.getElementById("lowercase").className = checks.hasLower ? "valid" : "invalid";
    document.getElementById("number").className = checks.hasNumber ? "valid" : "invalid";
    document.getElementById("special").className = checks.hasSpecial ? "valid" : "invalid";

    return Object.values(checks).every(Boolean);
  }

  function validateForm() {
    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const isPasswordValid = validatePassword();

    signupBtn.disabled = !(name && email && isPasswordValid);
  }

  function checkLoginFields() {
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();
    loginBtn.disabled = !(email && password);
  }

  function signup() {
    const name = document.getElementById("signup-name").value.trim();

    messageDiv.textContent = `✅ Signup successful! Welcome, ${name}`;
    messageDiv.style.color = 'green';

    document.getElementById("signup-form").reset();
    validateForm();

    // Redirect to menu.html after 1.5 seconds
    setTimeout(() => {
      window.location.href = "menu.html";
    }, 1500);
  }

  function login() {
    const email = document.getElementById("login-email").value.trim();

    messageDiv.textContent = "✅ Login successful! Redirecting...";
    messageDiv.style.color = 'green';

    setTimeout(() => {
      window.location.href = "menu.html";
    }, 1500);
  }

  // Expose functions globally for HTML onclick
  window.toggleForms = toggleForms;
  window.validateForm = validateForm;
  window.checkLoginFields = checkLoginFields;
  window.signup = signup;
  window.login = login;
})();

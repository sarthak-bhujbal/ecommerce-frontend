const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const authMsg = document.getElementById("auth-msg");

// Utility: validate email format
function validateEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

// Utility: validate password strength
function validatePassword(password) {
  // min 8 chars, 1 uppercase, 1 lowercase, 1 number
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
}

// Handle signup
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("signup-name").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value;
  const confirm = document.getElementById("signup-confirm").value;

  if (!name) {
    authMsg.textContent = "Full Name is required.";
    return;
  }
  if (!validateEmail(email)) {
    authMsg.textContent = "Invalid email format.";
    return;
  }
  if (!validatePassword(password)) {
    authMsg.textContent = "Password must be at least 8 characters, including uppercase, lowercase, and a number.";
    return;
  }
  if (password !== confirm) {
    authMsg.textContent = "Passwords do not match.";
    return;
  }

  authMsg.textContent = "Signing up...";
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Optionally, update user profile
      userCredential.user.updateProfile({ displayName: name });
      authMsg.style.color = "green";
      authMsg.textContent = "Signup successful! You can now login.";
      toggleForm(true);
      signupForm.reset();
    })
    .catch((error) => {
      authMsg.style.color = "red";
      authMsg.textContent = error.message;
    });
});

// Handle login
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;

  if (!validateEmail(email)) {
    authMsg.textContent = "Invalid email format.";
    return;
  }
  if (!password) {
    authMsg.textContent = "Password is required.";
    return;
  }

  authMsg.textContent = "Logging in...";
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      authMsg.style.color = "green";
      authMsg.textContent = "Login successful! Redirecting...";
      // Redirect to dashboard or homepage
      setTimeout(() => {
        window.location.href = "index.html"; // or your dashboard page
      }, 1500);
    })
    .catch((error) => {
      authMsg.style.color = "red";
      authMsg.textContent = error.message;
    });
});

// Optional: maintain login session and update UI accordingly
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    // User is logged in, optionally redirect or update UI
    // e.g., show logout button, user info
  } else {
    // No user is signed in
  }
});


document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const messageDiv = document.getElementById("loginMessage");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      messageDiv.textContent = "Please enter both email and password.";
      messageDiv.style.color = "red";
      return;
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        messageDiv.style.color = "green";
        messageDiv.textContent = "Login successful! Redirecting...";
        setTimeout(() => {
          window.location.href = "upload.html";
        }, 1500);
      } else {
        messageDiv.textContent = data.message || "Login failed.";
        messageDiv.style.color = "red";
      }
    } catch (err) {
      console.error("Login error:", err);
      messageDiv.textContent = "Something went wrong. Try again.";
      messageDiv.style.color = "red";
    }
  });
});

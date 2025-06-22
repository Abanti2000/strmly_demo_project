document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const messageEl = document.getElementById("message");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    messageEl.textContent = "Logging in...";

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        messageEl.style.color = "green";
        messageEl.textContent = data.message || "Login successful!";
        localStorage.setItem("token", data.token);
        setTimeout(() => {
          window.location.href = "upload.html";
        }, 1000);
      } else {
        messageEl.style.color = "red";
        messageEl.textContent = data.message || "Login failed!";
      }
    } catch (err) {
      console.error(err);
      messageEl.style.color = "red";
      messageEl.textContent = "Network error";
    }
  });
});

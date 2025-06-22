document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  const messageEl = document.getElementById("message");

  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    messageEl.textContent = "Signing up...";

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        messageEl.style.color = "green";
        messageEl.textContent = data.message || "Signup successful!";
        setTimeout(() => {
          window.location.href = "login.html";
        }, 1000);
      } else {
        messageEl.style.color = "red";
        messageEl.textContent = data.message || "Signup failed!";
      }
    } catch (err) {
      console.error(err);
      messageEl.style.color = "red";
      messageEl.textContent = "Network error";
    }
  });
});

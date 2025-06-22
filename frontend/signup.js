document.getElementById("signupForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = e.target;
  const name = form.name.value;
  const email = form.email.value;
  const password = form.password.value;
  const confirmPassword = form.confirmPassword.value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Signup successful! Redirecting to login...");
      window.location.href = "login.html";
    } else {
      alert("Signup failed: " + data.message);
    }
  } catch (err) {
    alert("Signup error: " + err.message);
  }
});

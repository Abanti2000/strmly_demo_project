
const token = localStorage.getItem("token");
if (!token) location.href = "login.html";

fetch("/videos", {
  headers: { Authorization: `Bearer ${token}` },
})
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("videoFeed");
    if (!data.length) return (container.innerHTML = "<p>No videos uploaded yet.</p>");

    data.forEach(video => {
      const div = document.createElement("div");
      div.className = "video-card";
      div.innerHTML = `
        <video controls>
          <source src="${video.videoUrl}" type="video/mp4">
          Your browser does not support video.
        </video>
        <h3>${video.title}</h3>
        <p>By ${video.uploader || "Anonymous"} on ${new Date(video.uploadDate).toLocaleDateString()}</p>
      `;
      container.appendChild(div);
    });
  });

function logout() {
  localStorage.removeItem("token");
  location.href = "login.html";
}
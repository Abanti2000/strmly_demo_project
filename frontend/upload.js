
document.getElementById('uploadForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const fileInput = document.getElementById('file');
  const titleInput = document.getElementById('title');
  const descriptionInput = document.getElementById('description');
  const modal = document.getElementById('successModal');
  const closeModalBtn = document.getElementById('closeModalBtn');

  if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
    alert('Please select a file to upload.');
    return;
  }

  const file = fileInput.files[0];
  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();
  const token = localStorage.getItem('token');

  if (!token) {
    alert('You must be logged in to upload.');
    return;
  }

  const formData = new FormData();
  formData.append('video', file); 
  formData.append('title', title);
  formData.append('description', description);

  try {
    const response = await fetch('http://localhost:5000/api/upload/', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token
      },
      body: formData
    });

    const contentType = response.headers.get('content-type');
    const isJSON = contentType && contentType.includes('application/json');
    const data = isJSON ? await response.json() : null;

    if (!response.ok) {
      throw new Error((data && data.message) || 'Upload failed');
    }

    modal.style.display = 'block';

    closeModalBtn.onclick = () => {
      modal.style.display = 'none';
      document.getElementById('uploadForm').reset();
    };

    window.onclick = (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
        document.getElementById('uploadForm').reset();
      }
    };
  } catch (error) {
    console.error('Upload failed:', error.message);
    alert('Upload failed: ' + error.message);
  }
});

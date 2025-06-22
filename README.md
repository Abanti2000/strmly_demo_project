# strmly_demo_project
STRMLY Demo Project

Overview

A mini backend + frontend demo replicating core features of STRMLY, including user signup/login, video upload, and public video feed.

Features

- User authentication (signup/login) with JWT
- Video upload with metadata storage in MongoDB
- Public video feed with sorting by newest first
- Simple HTML,CSS,JS frontend for demo purposes

Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- Multer for file uploads
- Cloudinary Storage for video storage
- JWT for authentication
- HTML,CSS,JS for frontend

Endpoints

Authentication
- POST /signup: Register with name, email, password
- POST /login: Authenticate and return JWT
- GET /profile: Protected route, return user info (requires token)

Video Upload
- POST /upload: Upload video with title, description, and MP4 file

Video Feed
- GET /videos: Return all uploaded videos (public) with title, video URL, uploader name/id, and upload date

Setup

1. Clone the repository
2. Run npm install to install dependencies
3. Start the server with npm start
4. Access the frontend at http://localhost:5000

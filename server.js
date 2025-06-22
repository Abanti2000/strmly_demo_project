const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const helmet = require('helmet');
const rateLimiter = require('./middleware/rateLimiter');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const videoFeed = require('./routes/videoFeed');
const profileRoutes = require('./routes/profileRoutes');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(helmet());
app.use(rateLimiter);


connectDB();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'login.html'));
});
app.use(express.static(path.join(__dirname, 'frontend')));

app.use('/api/auth/login', rateLimiter);
app.use('/api/auth/register', rateLimiter);
app.use('/api/auth', authRoutes);
app.use('/api/auth/profile', profileRoutes);
app.use('/api/video', uploadRoutes);
app.use('/api/upload', uploadRoutes); 
app.use('/api', videoFeed);


app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

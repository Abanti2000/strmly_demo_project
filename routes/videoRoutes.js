const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const { uploadVideo, getAllVideos } = require('../controllers/videoController');

router.post('/upload', auth, upload.single('video'), uploadVideo);
router.get('/', getAllVideos);

module.exports = router;

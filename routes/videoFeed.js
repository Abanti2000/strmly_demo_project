const express = require('express');
const router = express.Router();
const Video = require('../models/Video');


router.get('/videos', async (req, res) => {
  try {
    const videos = await Video.find({})
      .populate('uploadedBy', 'name')
      .sort({ createdAt: -1 });

    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
});


module.exports = router;

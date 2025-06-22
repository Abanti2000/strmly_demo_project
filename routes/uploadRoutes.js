
const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.memoryStorage(); 
const upload = multer({ storage });


router.post('/', upload.single('video'), async (req, res) => {
  try {
    console.log(req.file); 
    console.log(req.body.description); 
    res.status(200).json({ message: 'Upload successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;


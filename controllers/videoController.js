const cloudinary = require('cloudinary').v2;
// const Video = require('../models/video'); // Your Mongoose model
const Video = require('../models/Video'); 

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadVideo = async (req, res) => {
  try {
    const { title, description } = req.body;

    const result = await cloudinary.uploader.upload_stream(
      { resource_type: 'video', folder: 'videos' },
      async (error, result) => {
        if (error) return res.status(500).json({ error: error.message });

        const newVideo = await Video.create({
          title,
          description,
          videoUrl: result.secure_url,
        });

        res.status(201).json({ message: 'Video uploaded', video: newVideo });
      }
    );

    req.file.stream.pipe(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { uploadVideo };

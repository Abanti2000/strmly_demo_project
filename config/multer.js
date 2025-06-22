// // config/multer.js
// const multer = require('multer');
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const cloudinary = require('./cloudinary');

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: 'videos', // optional: creates a folder in Cloudinary
//     resource_type: 'video', // IMPORTANT for videos
//     format: async (req, file) => 'mp4', // forces mp4 format
//   },
// });

// const upload = multer({ storage });

// module.exports = upload;// middleware/multer.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'videos',
    resource_type: 'video',
    format: async () => 'mp4',
  },
});

const upload = multer({ storage });
module.exports = upload;

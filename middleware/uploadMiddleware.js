const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (_, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const fileFilter = (_, file, cb) => {
  if (file.mimetype === 'video/mp4') cb(null, true);
  else cb(new Error('Only MP4 files allowed'), false);
};

module.exports = multer({ storage, fileFilter });

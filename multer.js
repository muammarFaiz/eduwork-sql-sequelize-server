const multer = require('multer');

const storageEngine = multer.diskStorage({
  destination: (req, file, cb) => {cb(null, './uploads');},
  filename: (req, file, cb) => {cb(null, Date.now() + '-tugasSequelize-' + file.originalname);}
});
const upload = multer({storage: storageEngine});

module.exports = upload;

const router = require('express').Router();
const Product = require('./model.js');
const multer = require('multer');

const storageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-sequelizeMysql-' + file.originalname);
  }
});
const upload = multer({storage: storageEngine});

router.post('/product', upload.single('image'), async (req, res) => {
  const {userid, name, price, stock, status} = req.body;
  const image = req.file;
  if(image) {
    try {
      await Product.sync();
      const result = await Product.create({userid, name, price, stock, status,
        imageurl: 'http://localhost:3001/showimage/' + image.filename});
      console.log('the image edited name: ' + image.filename);
      res.send(result);
    } catch(error) {
      res.send(error);
    }
  }
});

module.exports = router;

const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const multer = require('multer');
const {connection, conn_query_simple} = require('./config/mysql.js');
const database2 = require('./product_2/router.js');
const Product = require('./product_2/model.js');
const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(database2);
app.use(express.static(__dirname + '/client'));

const storageEngine = multer.diskStorage({
  destination: (req, file, cb) => {cb(null, './uploads');},
  filename: (req, file, cb) => {cb(null, Date.now() + '-tugasSequelize-' + file.originalname);}
});
const upload = multer({storage: storageEngine});


app.route('/')
.get( async (req, res) => {
  // const data = await Product.findAll();
  res.sendFile(__dirname + '/client/index.html');
});

app.route('/updatetable')
.post(upload.single('image'), async (req, res) => {
  let {name, price, stock, status} = req.body;
  const image = req.file;
  if(image) {
    try {
      const result = await Product.create({userid: (Date.now()+'').slice(3, 10), name, price, stock, status,
        imageurl: 'http://localhost:3001/showimage/' + image.filename});
      res.send(result);
    } catch(err) {res.send(err);}}
})
.delete( async (req, res) => {
  let {name} = req.body;
  console.log(req.body);
  try {
    const result = await Product.destroy({where: {name: name}});
    const toshare = '' + result;
    res.send(toshare);
  } catch(err) {res.send(err);}
});

app.route('/updateproduct')
.get( async (req, res) => {
  try {
    const result = await Product.findAll({where: {name: req.query.productname}});
    res.send(result);
  } catch(err) {res.send(err);}
})
.patch( async (req, res) => {
  console.log(req.query);
  try {
    const result = Product.update({price: req.query.newprice}, {where: {name: req.query.name}});
    res.send(result);
  } catch(err) {res.send(err);}
});

app.route('/showimage/:filename')
.get((req, res) => {
  res.sendFile(__dirname + '/uploads/' + req.params.filename);
});

app.listen(process.env.PORT || 3001, () => console.log('server running 3001 faiz'));

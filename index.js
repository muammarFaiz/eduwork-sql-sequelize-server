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

const storageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-tugasSequelize-' + file.originalname);
  }
});
const upload = multer({storage: storageEngine});

app.route('/')
.get( async (req, res) => {
  const data = await Product.findAll();
  res.send(data);
})
.post((req, res) => {
  res.send('hehe');
});

app.route('/updatetable')
.post(upload.single('image'), async (req, res) => {
  let {userid, name, price, stock, status} = req.body;
  const image = req.file;
  if(image) {
    try {
      const result = await Product.create({userid, name, price, stock, status,
        imageurl: 'http://localhost:3001/showimage/' + image.filename});
      res.send(result);
    } catch(err) {
      res.send(err);
    }
  }
})
.delete( async (req, res) => {
  let {name} = req.body;
  try {
    const result = await Product.destroy({
      where: {name: name}
    });
    // the result only return an integer 1, and if i send it to res.send, cors will fail, wtf???
    // console.log(typeof(result));
    // this is some kind of work around i can do for now
    const udin = '' + result;
    res.send(udin);
  } catch(err) {
    console.log(err);
    res.send(err);
  }
});

app.route('/updateproduct')
.get( async (req, res) => {
  try {
    const result = await Product.findAll({where: {name: req.query.productname}});
    res.send(result);
  } catch(err) {
    res.send(err);
  }
  // conn_query_simple(`SELECT * FROM productsfaiz WHERE productName="${req.query.productname}"`, res);
})
.patch( async (req, res) => {
  try {
    const result = await Product.update({price: req.query.newprice}, {where: {id: req.query.productid}});
    console.log(result);
    res.send(result);
  } catch(err) {
    console.log(err);
    res.send(err);
  }
  // conn_query_simple(`UPDATE productsfaiz SET price=${req.query.newprice} WHERE id=${req.query.productid}`, res);
});

app.route('/showimage/:filename')
.get((req, res) => {
  res.sendFile(__dirname + '/uploads/' + req.params.filename);
});

app.listen(3001, () => console.log('server running 3001 faiz'));

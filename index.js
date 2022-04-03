const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const upload = require('./multer.js');
// const dbcol = require('./config/mongodb1.js');
const app = express();
// mongoose
require('./config/mongoose.js');
const NgooseMod = require('./mongoose_model/model.js');

app.use(logger('dev'));
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(__dirname + '/client'));

app.route('/').get( async (req, res) => {
  res.sendFile(__dirname + '/client/index.html');
});

app.route('/getall').get(async (req, res) => {
  try {
    const result = await NgooseMod.find();
    console.log('get all success...');
    res.send(result);
  } catch(e) {
    console.log(e);
    res.send(e);
  }
});

// add and delete
app.route('/updatetable')
.post(upload.single('image'), async (req, res) => {
  let {name, price, stock, status} = req.body;
  const image = req.file;
  try {
    const result = await NgooseMod.create({
      id: Date.now(), name: name, price: price, action: status, stock: stock
    });
    console.log('insert many success...');
    res.send(result);
  } catch(e) {
    console.log(e);
    res.send(e);
  }
})
.delete( async (req, res) => {
  let {id} = req.query;
  console.log(req.query);
  try {
    const result = await NgooseMod.findByIdAndDelete(id);
    console.log('success mongoose...');
    res.send(result);
  } catch(e) {
    console.log(e);
    res.send(e);
  }
});

// find and change
app.route('/updateproduct')
.get( async (req, res) => {
  const tosearch = req.query.id;
  try {
    const result = await NgooseMod.findById(tosearch);
    console.log('success find mongoose...');
    res.send(result);
  } catch(e) {
    console.log(e);
    res.send(e);
  }
})
.patch( async (req, res) => {
  const filter = {_id: req.query.filter};
  const update = {
    name: req.query.name,
    price: req.query.price,
    stock: req.query.stock,
    action: req.query.status
  };
  try {
    console.log(req.query);
    const result = await NgooseMod.updateOne(filter, update);
    console.log('update success mongoose...');
    res.send(result);
  } catch(e) {
    console.log(e);
    res.send(e);
  }
});

app.route('/showimage/:filename')
.get((req, res) => {
  res.sendFile(__dirname + '/uploads/' + req.params.filename);
});

app.listen(process.env.PORT || 3001, () => console.log('server running 3001 faiz'));

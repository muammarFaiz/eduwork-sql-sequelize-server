const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: Number,
  action: Boolean,
  stock: Number
});

const MongooseModel = mongoose.model('tugas', modelSchema);

module.exports = MongooseModel;

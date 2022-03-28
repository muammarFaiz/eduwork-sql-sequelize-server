const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../config/sequelize.js');
const Product = sequelize.define('userWithImage', {
  // model attributes are defined here
  userid: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  imageurl: {
    type: DataTypes.STRING,
  }
});

module.exports = Product;

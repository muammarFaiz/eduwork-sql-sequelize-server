const {Sequelize} = require('sequelize');

const sequelize = new Sequelize({
  database: 'sequelizetry',
  host: 'localhost',
  username: 'root',
  dialect: 'mysql'
});

const f = async () => {
  try {
    await sequelize.authenticate();
    console.log('connection has been established succesfully');
  } catch (error) {
    console.log('unnable to connect to the database: ' + error);
  }
};
f();

module.exports = sequelize;

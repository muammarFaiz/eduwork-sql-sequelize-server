const mongoose = require('mongoose');

const password = process.env.PASSWORD;
const testpass = '123';
const connAtlas = 'mongodb://faiz1:' + testpass + '@cluster0-shard-00-00.bd5hs.mongodb.net:27017,cluster0-shard-00-01.' +
'bd5hs.mongodb.net:27017,cluster0-shard-00-02.bd5hs.mongodb.net:27017/cluster0?ssl=true&' +
'replicaSet=atlas-10erh7-shard-0&authSource=admin&retryWrites=true&w=majority';
console.log(connAtlas);
// const srvConn =

const connLocal = 'mongodb://mainuser:123@localhost:27017/mongoosedb?authSource=admin';

mongoose.connect(connAtlas);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error test atlas: '));
db.once('open', () => {console.log('connection mongoose success...');});

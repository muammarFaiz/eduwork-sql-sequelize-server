const {MongoClient} = require('mongodb');

const url = 'mongodb://mainuser:123@localhost:27017?authSource=admin';
const client = new MongoClient(url, {
  useUnifiedTopology: true
});

async function test() {
  try {
    await client.connect();
    console.log('connected to mongodb');
  } catch(err) {
    console.log(err);
  }
}
test();

const db = client.db('eduwork-1');
const dbcol = db.collection('firsttry');

module.exports = dbcol;

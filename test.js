 let a = 'mongodb://faiz1:' + '${password}' + '@cluster0-shard-00-00.bd5hs.mongodb.net:27017,cluster0-shard-00-01.' +
 'bd5hs.mongodb.net:27017,cluster0-shard-00-02.bd5hs.mongodb.net:27017/myFirstDatabase?ssl=true&' +
 'replicaSet=atlas-10erh7-shard-0&authSource=admin&retryWrites=true&w=majority';
let b = 'a cow';
let myword = 'cow';
let myregex = /cow/g;
let myregex2 = new RegExp('o', 'g');
console.log(b.match(myregex2));

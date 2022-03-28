const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'faizsql'
});

const mysqlCallback = (res) => {
  return (error, result, fields) => {
    if(error) {
      console.log('error...');
      res.send(error);
    } else {
      console.log('no error');
      res.send(result);
    }
  };
};

const conn_query_simple = (sql_command_string, res) => {
  connection.query(
    {sql: sql_command_string},
    mysqlCallback(res)
  );
};

module.exports = {connection, conn_query_simple};

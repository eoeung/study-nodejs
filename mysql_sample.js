// 1) mysql 설치
// - $ npm install mysql

// 2) 실행 방법
// - $ node mysql_sample.js

let mysql = require('mysql');
let security = require('./security');

let connection = mysql.createConnection({
  host: security.host,
  user: security.user,
  password: security.password,
  database: security.database,
});

connection.connect(function (err) {
  if (err) {
    console.error(`connection.connect ::: ${err.stack}`);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

connection.query('SELECT * FROM CUSTOMER', function (error, results, fields) {
  if (error) throw error;
  console.log(results);
  // console.log(fields);
});

connection.end(function (err) {
  console.error(`connection.end ::: ${err}`);
});

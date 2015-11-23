var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : '192.168.1.28',
  user            : 'hellouser',
  password        : 'default',
  database        : 'hellodb'
});

module.exports.pool = pool;
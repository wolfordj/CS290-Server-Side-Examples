var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'mysql.eecs.oregonstate.edu',
  user            : 'cs290_yourengrusername',
  password        : 'last-4-digits-of-your-osu-id',
  database        : 'cs290_yourengrusername'
});

module.exports.pool = pool;

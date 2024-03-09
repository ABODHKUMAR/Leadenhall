const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root@localhost',
  password: 'Abodh@2000',
  database: ''
});

module.exports = pool;

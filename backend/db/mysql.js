const mysql = require('mysql');
const pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'star7134',
    port     : 3306,
    database : 'kblref',
    multipleStatements: true,
    acquireTimeout: 1000000,
});
module.exports=pool;
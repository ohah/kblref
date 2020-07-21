var express = require("express");
var router = express.Router();
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
/* GET users listing. */
router.get("/:query", function(req, res, next) {
    pool.getConnection(function(err, db) {
        db.query("SELECT * FROM kbl_pcode WHERE name LIKE '%"+req.params.query+"%' group by pcode", function (error, results, fields) { 
            if (error) {
                console.log(error);
            } else {
                res.send(results);
            }
        });
        db.release();
    });
});
module.exports = router;
var express = require("express");
var router = express.Router();
const pool = require('../db/mysql');
/* GET users listing. */
router.get("/:date", function(req, res, next) {
    pool.getConnection(function(err, db) {
        const sql = "SELECT * FROM kbl_game_schedule WHERE LEFT(game_date, 7) = '"+req.params.date+"'";
        db.query(sql, function (error, results, fields) { 
            if (error) {
                console.log(error);
            } else {
                var data = [];
                results.forEach(function(ele, idx, array) {
                    var row = {};
                    row.id = (idx + 1).toString();
                    row.calendarId = ele.gno;
                    row.title = ele.home + " VS " + ele.away;
                    row.dueDateClass = '';
                    row.category = 'time';
                    row.start = ele.game_date.replace(/\./g, '-') + 'T' + ele.game_time + ':00+09:00';
                    row.end = ele.game_date.replace(/\./g, '-') + 'T' + ele.game_time + ':00+09:00';
                    row.gno = ele.gno;
                    data.push(row);
                });
                res.send(data);
            }
        });
        db.release();
    });
});
module.exports = router;
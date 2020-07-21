var express = require("express");
var router = express.Router();
const pool = require('../db/mysql');
/* GET users listing. */
router.get("/", function(req, res, next) {
    var col = [
        "TEAM",
        "SUM(FB) as FB",
        "SUM(TOV) as TOV",
        "SUM(GD) as GD",
        "SUM(TF) as TF",
        "SUM(EJECT) as EJECT",
        "SUM(TWOP) as TWOP",
        "SUM(TWOPA) as TWOPA",
        "ROUND( (SUM(TWOP) / SUM(TWOPA)) * 100 , 2) as TWOPPERCENT",
        "SUM(THREEP) as THREEP",
        "SUM(THREEPA) as THREEPA",
        "ROUND( (SUM(THREEP) / SUM(THREEPA)) * 100 , 2) as THREEPPERCENT",
        "SUM(FT) as FT",
        "SUM(FTA) as FTA",
        "ROUND( (SUM(FT) / SUM(FTA)) * 100 , 2) as FTPERCENT",
        "SUM(DK) as DK",
        "SUM(DKA) as DKA",
        "ROUND( (SUM(DK) / SUM(DKA)) * 100 , 2) as DKPERCENT",
        "SUM(AST) as AST",
        "SUM(ORB) as ORB",
        "SUM(DRB) as DRB",
        "SUM(TRB) as TRB",
        "SUM(REB) as REB",
        "SUM(STL) as STL",
        "SUM(BLK) as BLK",
        "SUM(FOUL) as FOUL",
        "SUM(SUB) as SUB",
        "SUM(PP) as PP",
        "SUM(FB_PTS) as FB_PTS",
        "SUM(TOV_PTS) as TOV_PTS",
        "SUM(SEC_PTS) as SEC_PTS",
        "SUM(BENCH_PTS) as BENCH_PTS",
        "SUM(LEAD_TIME) as LEAD_TIME",
    ].join(',');
    pool.getConnection(function(err, db) {
        const sql = "SELECT "+col+" FROM kbl_team_stat WHERE season = '"+req.query.season+"' AND spc = '"+req.query.spc+"' group by TEAM ORDER BY TEAM;";
        db.query(sql, function (error, results, fields) { 
            if (error) {
                console.log(error);
            } else {
                results.forEach(ele => {
                    ele.TEAM = '<a class="team" onclick="return false;" href="/팀스탯/'+ele.TEAM+'">' + ele.TEAM + '</a>'
                });
                var data = {
                        "result" : true,
                        "data" : {
                        "contents" : results,
                    }
                }
                res.send(data);
            }
        });
        db.release();
    });
});
module.exports = router;
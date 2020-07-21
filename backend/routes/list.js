var express = require("express");
var router = express.Router();
const pool = require('../db/mysql');
/* GET users listing. */
router.get("/", function(req, res, next) {
    pool.getConnection(function(err, db) {
        console.log(req.query);
        var page = req.query.perPage;
        var now_page = req.query.page - 1;
        var f_row = page ? page * now_page : 0;
        var l_row = parseInt(req.query.perPage);
        var col = [
            "NAME",
            "SUM(start) as start",
            "COUNT(TIME_TO_SEC(MIN)) as G",
            "CONCAT(ROUND((SUM(LEFT(MIN, 2)) * 60 + SUM(RIGHT(MIN,2))) / 60, 0), '.', ROUND((SUM(LEFT(MIN, 2)) * 60 + SUM(RIGHT(MIN,2))) % 60, 0) ) as MIN",
            "SUM(TWOP) as TWOP",
            "SUM(TWOPA) as TWOPA",
            "ROUND( (SUM(TWOP) / SUM(TWOPA)) * 100 , 2) as TWOPPERCENT",
            "SUM(THREEP) as THREEP",
            "SUM(THREEPA) as THREEPA",
            "ROUND( (SUM(THREEP) / SUM(THREEPA)) * 100 , 2) as THREEPPERCENT",
            "SUM(FT) as FT",
            "SUM(FTA) as FTA",
            "ROUND( (SUM(FT) / SUM(FTA)) * 100 , 2) as FTPERCENT",
            "SUM(ORB) as ORB",
            "SUM(DRB) as DRB",
            "SUM(REB) as REB",
            "SUM(AST) as AST",
            "SUM(wFT) as wFT",
            "SUM(woFT) as woFT",
            "SUM(STL) as STL",
            "SUM(BLK) as BLK",
            "SUM(TOV) as TOV",
            "SUM(DK) as DK",
            "SUM(PTS) as PTS",
            "SUM(PP) as PP",
            "SUM(PF) as PF",
            "TEAM",
        ].join(',');
        if(req.query.type == "avg"){
            var G = "COUNT(TIME_TO_SEC(MIN))";
            col = [
                "NAME",
                "SUM(start) as start",
                "COUNT(TIME_TO_SEC(MIN)) as G",
                "CONCAT(ROUND((SUM(LEFT(MIN, 2)) * 60 + SUM(RIGHT(MIN,2))) / 60, 0), '.', ROUND((SUM(LEFT(MIN, 2)) * 60 + SUM(RIGHT(MIN,2))) % 60, 0) ) as MIN",
                "ROUND(SUM(TWOP)/"+G+",2) as TWOP",
                "ROUND(SUM(TWOPA)/"+G+",2) as TWOPA",
                "ROUND( (SUM(TWOP) / SUM(TWOPA)) * 100 , 2) as TWOPPERCENT",
                "ROUND(SUM(THREEP)/"+G+",2) as THREEP",
                "ROUND(SUM(THREEPA)/"+G+",2) as THREEPA",
                "ROUND( (SUM(THREEP) / SUM(THREEPA)) * 100 , 2) as THREEPPERCENT",
                "ROUND(SUM(FT)/"+G+",2) as FT",
                "ROUND(SUM(FTA)/"+G+",2) as FTA",
                "ROUND( (SUM(FT) / SUM(FTA)) * 100 , 2) as FTPERCENT",
                "ROUND(SUM(ORB)/"+G+",2) as ORB",
                "ROUND(SUM(DRB)/"+G+",2) as DRB",
                "ROUND(SUM(REB)/"+G+",2) as REB",
                "ROUND(SUM(AST)/"+G+",2) as AST",
                "ROUND(SUM(wFT)/"+G+",2) as wFT",
                "ROUND(SUM(woFT)/"+G+",2) as woFT",
                "ROUND(SUM(STL)/"+G+",2) as STL",
                "ROUND(SUM(BLK)/"+G+",2) as BLK",
                "ROUND(SUM(TOV)/"+G+",2) as TOV",
                "ROUND(SUM(DK)/"+G+",2) as DK",
                "ROUND(SUM(PTS)/"+G+",2) as PTS",
                "ROUND(SUM(PP)/"+G+",2) as PP",
                "ROUND(SUM(PF)/"+G+",2) as PF",
                "TEAM",
            ].join(',');
        }else if(req.query.type="sec"){

        }
        var order = "NAME";
        var asc = "desc";
        if(req.query.sortColumn) {
            order = req.query.sortColumn;
        }
        if(req.query.sortAscending == "true") {
            asc = "asc";
        }
        const sql = "SELECT " + col + " FROM kbl_game_stat WHERE season = '"+req.query.season+"' AND SPC = '"+req.query.spc+"' group by NAME, TEAM ORDER BY "+ order + " " + asc + " limit "+ f_row + "," + l_row + ";"
        const sql2 = "SELECT count(DISTINCT NAME) as totalCount FROM kbl_game_stat WHERE season = '"+req.query.season+"' AND SPC = '"+req.query.spc+"';"
        db.query(sql + sql2, function (error, results, fields) { 
            if (error) {
                console.log(error);
            } else {
                results[0].forEach(ele => {
                    ele.NAME = '<a class="person" onclick="return false;" href="/선수스탯/'+ele.NAME+'/정규시즌">' + ele.NAME + '</a>'
                });
                var data = {
                        "result" : true,
                        "data" : {
                        "contents" : results[0],
                        "pagination" : {
                            "page" : parseInt(req.query.page),
                            "totalCount" : results[1][0].totalCount,
                        }
                    }
                }
                res.send(data);
            }
        });
        db.release();
    });
});
module.exports = router;
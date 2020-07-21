var express = require("express");
var router = express.Router();
const pool = require('../db/mysql');
/* GET users listing. */
router.get("/:name", function(req, res, next) {
    if(req.params.name.indexOf('(') != -1){
        var pcode = req.params.name.split('(');
        pcode = pcode[1].replace(')','');
        console.log(pcode);
        pool.getConnection(function(err, db) {
            const sql = "SELECT name, pcode, tname FROM kbl_pcode WHERE pcode = '" + pcode + "' group by pcode";
            db.query(sql, async function (error, results, fields) { 
                if (error) {
                    console.log(error);
                } else {
                    res.send(results);
                }
            });
            db.release();
        });

    }else{
        pool.getConnection(function(err, db) {
            const sql = "SELECT name, pcode, tname FROM kbl_pcode WHERE name = '"+req.params.name+"' group by pcode";
            db.query(sql, async function (error, results, fields) { 
                if (error) {
                    console.log(error);
                } else {
                    res.send(results);
                }
            });
            db.release();
        });
    }
});
router.get("/:name/:spc", function(req, res, next) {
    let spc = 'regular';
    var col = [
        "season",
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
    if(req.params.spc == '플레이오프'){
        spc = 'po';
    }else if(req.params.spc == '챔피언결정전'){
        spc = 'cham';
    }
    if(req.params.name.indexOf('(') != -1){
        var pcode = req.params.name.split('(');
        var name = pcode[0];
        pcode = pcode[1].replace(')','');
        var sql = "SELECT b.* FROM kbl_pcode a JOIN kbl_game_stat b ON b.TEAM = a.tname AND b.NAME = a.name WHERE a.pcode = '"+ pcode +"' AND b.SPC = '"+spc+"' group by b.season, b.TEAM, b.NAME, b.SPC, a.pcode";
    }else{
        var name = req.params.name;
        var sql = "SELECT "+col+" FROM kbl_game_stat WHERE name = '"+ req.params.name +"' AND SPC = '"+spc+"' group by season, TEAM, NAME, SPC";
    }
    pool.getConnection(function(err, db) {
        db.query(sql, async function (error, results, fields) { 
            if (error) {
                console.log(error);
            } else {
                res.send({
                    "result" : true,
                    "data" : {
                        "contents" : results,
                    }
                });
            }
        });
        db.release();
    });
});
module.exports = router;
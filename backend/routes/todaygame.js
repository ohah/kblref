var express = require("express");
var router = express.Router();
const pool = require('../db/mysql');
/* GET users listing. */
router.get("/:date", function(req, res, next) {
    pool.getConnection(function(err, db) {
        const date = new Date([
            req.params.date.substring(0,4),
            req.params.date.substring(4,6),
            req.params.date.substring(6,8)
        ].join('.'));
        const Month = date.getMonth() + 1;
        const MonthNum = Month >= 6 ? 0 : 1;
        const Year = '_'+date.getFullYear();
        const seasonObj = new Object();
        seasonObj._2021 = ['2020', '2021'],
        seasonObj._2020 = ['1920', '1819'],
        seasonObj._2019 = ['1819','1920'],
        seasonObj._2018 = ['1718','1819'],
        seasonObj._2017 = ['1617','1718'],
        seasonObj._2016 = ['1516','1617'],
        seasonObj._2015 = ['1415','1516'],
        seasonObj._2014 = ['1314','1415'],
        seasonObj._2013 = ['1213','1314'],
        seasonObj._2012 = ['1112','1213'],
        seasonObj._2011 = ['1011','1112'],
        seasonObj._2010 = ['0910','1011'],
        seasonObj._2009 = ['0809','0910'],
        seasonObj._2008 = ['0708','0809'],
        seasonObj._2007 = ['0607','0708'],
        seasonObj._2006 = ['0506','0607'],
        seasonObj._2005 = ['0405','0506'],
        seasonObj._2004 = ['0304','0405'],
        seasonObj._2003 = ['0203','0304'],
        seasonObj._2002 = ['0102','0203'],
        seasonObj._2001 = ['0001','0102'],
        seasonObj._2000 = ['9900','0001'],
        seasonObj._1999 = ['9899','9900'],
        seasonObj._1998 = ['9798','9899'],
        seasonObj._1997 = ['97','9798'];
        const season = seasonObj[Year][MonthNum];
        const gno = req.query.gno;
        const HANDA = req.query.HANDA;
        const sql = "SELECT * FROM kbl_game_stat WHERE season = '" + season + "' AND GNO = '" + gno + "' AND HANDA = '" + HANDA + "' ORDER BY start DESC";
        db.query(sql, function (error, results, fields) { 
            if (error) {
                console.log(error);
            } else {
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
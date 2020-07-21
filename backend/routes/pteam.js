var express = require("express");
var router = express.Router();
const pool = require('../db/mysql');
const team = [
    {'tcode' : '06', 'tname' : '부산 KT 소닉붐', 'tlink' : '01'},
    {'tcode' : '10', 'tname' : '울산 현대모비스 피버스', 'tlink' : '02'},
    {'tcode' : '16', 'tname' : '원주 DB 프로미', 'tlink' : '03'},
    {'tcode' : '30', 'tname' : '고양 오리온 오리온스', 'tlink' : '04'},
    {'tcode' : '35', 'tname' : '서울 삼성 썬더스', 'tlink' : '05'},
    {'tcode' : '50', 'tname' : '창원 LG 세이커스', 'tlink' : '06'},
    {'tcode' : '55', 'tname' : '서울 SK 나이츠', 'tlink' : '07'},
    {'tcode' : '60', 'tname' : '전주 KCC 이지스', 'tlink' : '08'},
    {'tcode' : '65', 'tname' : '인천 전자랜드 엘리펀츠', 'tlink' : '09'},
    {'tcode' : '70', 'tname' : '안양 KGC 인삼공사', 'tlink' : '10'},
    {'tcode' : '06', 'tname' : '부산 KT 소닉붐', 'tlink' : '01'},
    {'tcode' : '10', 'tname' : '울산 현대모비스 피버스', 'tlink' : '02'},
    {'tcode' : '16', 'tname' : '원주 DB 프로미', 'tlink' : '03'},
    {'tcode' : '30', 'tname' : '고양 오리온 오리온스', 'tlink' : '04'},
    {'tcode' : '35', 'tname' : '서울 삼성 썬더스', 'tlink' : '05'},
    {'tcode' : '50', 'tname' : '창원 LG 세이커스', 'tlink' : '06'},
    {'tcode' : '55', 'tname' : '서울 SK 나이츠', 'tlink' : '07'},
    {'tcode' : '60', 'tname' : '전주 KCC 이지스', 'tlink' : '08'},
    {'tcode' : '65', 'tname' : '인천 전자랜드 엘리펀츠', 'tlink' : '09'},
    {'tcode' : '70', 'tname' : '안양 KT&G 카이츠', 'tlink' : '10'},
    {'tcode' : '06', 'tname' : '부산 KTF 매직윙스', 'tlink' : '01'},
    {'tcode' : '10', 'tname' : '울산 현대모비스 피버스', 'tlink' : '02'},
    {'tcode' : '16', 'tname' : '원주 동부 프로미', 'tlink' : '03'},
    {'tcode' : '30', 'tname' : '대구 오리온스', 'tlink' : '04'},
    {'tcode' : '35', 'tname' : '서울 삼성 썬더스', 'tlink' : '05'},
    {'tcode' : '50', 'tname' : '창원 LG 세이커스', 'tlink' : '06'},
    {'tcode' : '55', 'tname' : '서울 SK 나이츠', 'tlink' : '07'},
    {'tcode' : '60', 'tname' : '전주 KCC 이지스', 'tlink' : '08'},
    {'tcode' : '65', 'tname' : '인천 전자랜드 블랙슬래머', 'tlink' : '09'},
    {'tcode' : '70', 'tname' : '안양 KT&G 카이츠', 'tlink' : "10"},
    {'tcode' : '06', 'tname' : '부산 KTF 매직윙스', 'tlink' : '01'},
    {'tcode' : '10', 'tname' : '울산 모비스 피버스', 'tlink' : '02'},
    {'tcode' : '15', 'tname' : '원주 TG삼보 엑써스', 'tlink' : '03'},
    {'tcode' : '30', 'tname' : '대구 오리온스', 'tlink' : '04'},
    {'tcode' : '35', 'tname' : '서울 삼성 썬더스', 'tlink' : '05'},
    {'tcode' : '40', 'tname' : '안양 SBS 스타즈', 'tlink' : "10"},
    {'tcode' : '50', 'tname' : '창원 LG 세이커스', 'tlink' : '06'},
    {'tcode' : '55', 'tname' : '서울 SK 나이츠', 'tlink' : '07'},
    {'tcode' : '60', 'tname' : '전주 KCC 이지스', 'tlink' : '08'},
    {'tcode' : '65', 'tname' : '인천 전자랜드 블랙슬래머', 'tlink' : '09'},
    {'tcode' : '06', 'tname' : '부산 KTF 매직윙스', 'tlink' : '01'},
    {'tcode' : '10', 'tname' : '울산 모비스 오트몬스', 'tlink' : '02'},
    {'tcode' : '15', 'tname' : '원주 TG삼보 엑써스', 'tlink' : '03'},
    {'tcode' : '30', 'tname' : '대구 오리온스', 'tlink' : '04'},
    {'tcode' : '35', 'tname' : '서울 삼성 썬더스', 'tlink' : '05'},
    {'tcode' : '40', 'tname' : '안양 SBS 스타즈', 'tlink' : "10"},
    {'tcode' : '50', 'tname' : '창원 LG 세이커스', 'tlink' : '06'},
    {'tcode' : '55', 'tname' : '서울 SK 나이츠', 'tlink' : '07'},
    {'tcode' : '60', 'tname' : '전주 KCC 이지스', 'tlink' : '08'},
    {'tcode' : '65', 'tname' : '인천 전자랜드 블랙슬래머', 'tlink' : '09'},
    {'tcode' : '05', 'tname' : '여수 코리아텐더 푸르미', 'tlink' : '01'},
    {'tcode' : '10', 'tname' : '울산 모비스 오트몬스', 'tlink' : '02'},
    {'tcode' : '15', 'tname' : '원주 TG 엑써스', 'tlink' : '03'},
    {'tcode' : '30', 'tname' : '대구 동양 오리온스', 'tlink' : '04'},
    {'tcode' : '35', 'tname' : '서울 삼성 썬더스', 'tlink' : '05'},
    {'tcode' : '37', 'tname' : '인천 SK 빅스', 'tlink' : '09'},
    {'tcode' : '40', 'tname' : '안양 SBS 스타즈', 'tlink' : "10"},
    {'tcode' : '50', 'tname' : '창원 LG 세이커스', 'tlink' : '06'},
    {'tcode' : '55', 'tname' : '서울 SK 나이츠', 'tlink' : '07'},
    {'tcode' : '60', 'tname' : '전주 KCC 이지스', 'tlink' : '08'},
    {'tcode' : '05', 'tname' : '여수 코리아텐더 푸르미', 'tlink' : '01'},
    {'tcode' : '10', 'tname' : '울산 모비스 오트몬스', 'tlink' : '02'},
    {'tcode' : '15', 'tname' : '원주 삼보 엑써스', 'tlink' : '03'},
    {'tcode' : '30', 'tname' : '대구 동양 오리온스', 'tlink' : '04'},
    {'tcode' : '35', 'tname' : '서울 삼성 썬더스', 'tlink' : '05'},
    {'tcode' : '37', 'tname' : '인천 SK 빅스', 'tlink' : '09'},
    {'tcode' : '40', 'tname' : '안양 SBS 스타즈', 'tlink' : "10"},
    {'tcode' : '50', 'tname' : '창원 LG 세이커스', 'tlink' : '06'},
    {'tcode' : '55', 'tname' : '서울 SK 나이츠', 'tlink' : '07'},
    {'tcode' : '60', 'tname' : '전주 KCC 이지스', 'tlink' : '08'},
    {'tcode' : '05', 'tname' : '여수 골드뱅크 클리커스', 'tlink' : '01'},
    {'tcode' : '10', 'tname' : '부산 기아 엔터프라이즈', 'tlink' : '02'},
    {'tcode' : '15', 'tname' : '원주 쌈보 엑써스', 'tlink' : '03'},
    {'tcode' : '30', 'tname' : '대구 동양 오리온스', 'tlink' : '04'},
    {'tcode' : '35', 'tname' : '수원 삼성 썬더스', 'tlink' : '05'},
    {'tcode' : '37', 'tname' : '인천 신세기 빅스', 'tlink' : '09'},
    {'tcode' : '40', 'tname' : '안양 SBS 스타즈', 'tlink' : "10"},
    {'tcode' : '45', 'tname' : '대전 현대 걸리버스', 'tlink' : '08'},
    {'tcode' : '50', 'tname' : '창원 LG 세이커스', 'tlink' : '06'},
    {'tcode' : '55', 'tname' : '청주 SK 나이츠', 'tlink' : '07'},
    {'tcode' : '05', 'tname' : '광주 골드뱅크 클리커스', 'tlink' : '01'},
    {'tcode' : '10', 'tname' : '부산 기아 엔터프라이즈', 'tlink' : '02'},
    {'tcode' : '15', 'tname' : '원주 쌈보 엑써스', 'tlink' : '03'},
    {'tcode' : '30', 'tname' : '대구 동양 오리온스', 'tlink' : '04'},
    {'tcode' : '35', 'tname' : '수원 삼성 썬더스', 'tlink' : '05'},
    {'tcode' : '37', 'tname' : '인천 신세기 빅스', 'tlink' : '09'},
    {'tcode' : '40', 'tname' : '안양 SBS 스타즈', 'tlink' : "10"},
    {'tcode' : '45', 'tname' : '대전 현대 걸리버스', 'tlink' : '08'},
    {'tcode' : '50', 'tname' : '창원 LG 세이커스', 'tlink' : '06'},
    {'tcode' : '55', 'tname' : '청주 SK 나이츠', 'tlink' : '07'},
    {'tcode' : '10', 'tname' : '부산 기아 엔터프라이즈', 'tlink' : '02'},
    {'tcode' : '15', 'tname' : '원주 나래 블루버드', 'tlink' : '03'},
    {'tcode' : '20', 'tname' : '광주 나산 플라망스', 'tlink' : '01'},
    {'tcode' : '25', 'tname' : '인천 대우 제우스', 'tlink' : '09'},
    {'tcode' : '30', 'tname' : '대구 동양 오리온스', 'tlink' : '04'},
    {'tcode' : '35', 'tname' : '수원 삼성 썬더스', 'tlink' : '05'},
    {'tcode' : '40', 'tname' : '안양 SBS 스타즈', 'tlink' : "10"},
    {'tcode' : '45', 'tname' : '대전 현대 다이넷', 'tlink' : '08'},
    {'tcode' : '50', 'tname' : '창원 LG 세이커스', 'tlink' : '06'},
    {'tcode' : '55', 'tname' : '청주 SK 나이츠', 'tlink' : '07'},
    {'tcode' : '10', 'tname' : '부산 기아 엔터프라이즈', 'tlink' : '02'},
    {'tcode' : '15', 'tname' : '원주 나래 블루버드', 'tlink' : '03'},
    {'tcode' : '20', 'tname' : '광주 나산 플라망스', 'tlink' : '01'},
    {'tcode' : '25', 'tname' : '인천 대우증권 제우스', 'tlink' : '09'},
    {'tcode' : '30', 'tname' : '대구 동양 오리온스', 'tlink' : '04'},
    {'tcode' : '35', 'tname' : '수원 삼성 썬더스', 'tlink' : '05'},
    {'tcode' : '40', 'tname' : '안양 SBS 스타즈', 'tlink' : "10"},
    {'tcode' : '45', 'tname' : '대전 현대 다이넷', 'tlink' : '08'},
];
const GetTeam = (tname) =>{
    const tlink = GetTlink(tname);
    let result = [];
    for (var i = 0; i < team.length; i++) {
        if(tlink == team[i].tlink)
            result.push("'" + team[i].tname + "'");
    }
    result = Array.from(new Set(result));
    result = result.join(',');
    return result;
}
const GetTlink = (tname) => {
    for (var i = 0; i < team.length; i++){
        if(team[i].tname == tname){
            return team[i].tlink;
        }
    }
}
var col = [
    "TEAM",
    "SUM(BENCH_PTS) as BENCH_PTS",
    "SUM(AST) as AST",
    "SUM(BLK) as BLK",
    "SUM(DK) as DK",
    "SUM(DKA) as DKA",
    "ROUND( (SUM(DK) / SUM(DKA)) * 100 , 2) as DKPERCENT",
    "SUM(TWOP) as TWOP",
    "SUM(TWOPA) as TWOPA",
    "ROUND( (SUM(TWOP) / SUM(TWOPA)) * 100 , 2) as TWOPPERCENT",
    "SUM(THREEP) as THREEP",
    "SUM(THREEPA) as THREEPA",
    "ROUND( (SUM(THREEP) / SUM(THREEPA)) * 100 , 2) as THREEPPERCENT",
    "SUM(FT) as FT",
    "SUM(FTA) as FTA",
    "ROUND( (SUM(FT) / SUM(FTA)) * 100 , 2) as FTPERCENT",
    "SUM(DRB) as DRB",
    "SUM(ORB) as ORB",
    "SUM(TRB) as TRB",
    "SUM(DRB + ORB + TRB) as REB",
    "SUM(EJECT) as EJECT",
    "Q1",
    "Q2",
    "Q3",
    "Q4",
    "EQ1",
    "EQ2",
    "EQ3",
    "EQ4",
    "EQ5",
    "Q1 + Q2 + Q3 + Q4 + EQ1 + EQ2 + EQ3 + EQ4 + EQ5 as PTS",
    "SUM(FOUL) as FOUL",
    "SUM(GD) as GD",
    "SUM(LEAD_TIME) as LEAD_TIME",
    "SUM(PP) as PP",
    "SUM(SEC_PTS) as SEC_PTS",
    "SUM(STL) as STL",
    "SUM(SUB) as SUB",
    "SUM(TOV) as TOV",
    "SUM(FB) as FB",
    "SUM(FB_PTS) as FB_PTS",
    "SUM(TF) as TF",
    "MIN",
    "season",
    "spc",
].join(',');
/* GET users listing. */
router.get("/:team", function(req, res, next) {
    console.log(req.params);
    var tname = GetTeam(req.params.team);
    console.log(tname);
    pool.getConnection(function(err, db) {
        //const sql = "SELECT * FROM kbl_team_stat WHERE team IN (" + tname + ") GROUP BY season, team, spc";
        const sql = "SELECT " + col + " FROM kbl_team_stat a, (SELECT SUM(Q1) as Q1, SUM(Q2) as Q2, SUM(Q3) as Q3, SUM(Q4) as Q4, SUM(EQ1) as EQ1, SUM(EQ2) as EQ2, SUM(EQ3) as EQ3, SUM(EQ4) as EQ4, SUM(EQ5) as EQ5, SUM(Q1 + Q2 + Q3 + Q4 + EQ1 + EQ2 + EQ3 + EQ4 + EQ5) as PTS, season as season2, spc as spc2, CONCAT(ROUND((SUM(LEFT(MIN, 2)) * 60 + SUM(RIGHT(MIN,2))) / 60, 0), '.', ROUND((SUM(LEFT(MIN, 2)) * 60 + SUM(RIGHT(MIN,2))) % 60, 0) ) as MIN FROM kbl_game_stat WHERE team IN (" + tname + ") GROUP by season, team, spc) b WHERE a.team IN (" + tname + ") AND b.season2 = a.season AND a.spc = b.spc2 GROUP BY a.season, a.team, a.spc";
        console.log(sql);
        db.query(sql, function (error, results, fields) { 
            if (error) {
                console.log(error);
            } else {
                results.forEach(ele => {
                    if(ele.spc == "regular") ele.spc = "정규시즌";
                    else if(ele.spc == "po") ele.spc = "플레이오프";
                    else if(ele.spc == "cham") ele.spc = "챔피언결정전";
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
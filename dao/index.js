var mysql      = require('mysql');
var db = mysql.createConnection({
    host     : 'sydb.cwp32sw5gaxo.ap-northeast-2.rds.amazonaws.com',
    user     : 'suyeon',
    password : 'suyeondb',
    database : 'sydb'
  });

exports.login = function(l_id, l_pw, callback){

    db.query(`SELECT count(*) cnt FROM users_table WHERE user_id=? and user_pw=?`, [l_id, l_pw], function(err1, rows){
        if(err1){
            console.log('err');
        }
        var cnt=rows[0].cnt;
        console.log(cnt);
        if(cnt===1){
            db.query(`SELECT * FROM users_table WHERE user_id=?`, [l_id], function(err2, user){
                if(err2){
                    console.log('err');
                }
                console.log(user);
                callback(err2, user[0]);
            });
        }
        else{
            callback(err1, '0');
        }
    });
}
exports.signup = function(s_id, s_pw, s_name, s_email, s_address, s_mobile, s_birth, callback){
    db.query(`SELECT count(*) cnt FROM users_table WHERE user_id=?`, [s_id], function(err1, rows){
        if(err1){
            console.err('err', err);
        }
        var cnt=rows[0].cnt;
        if(cnt===0){
            db.query(`INSERT INTO users_table (user_id, user_pw, user_name, user_email, user_address, user_mobile, user_birth, user_join_date, user_profile_path, user_point, user_access_date, user_withdraw) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), 0, 0, NOW(), 0)`,[s_id, s_pw, s_name, s_email, s_address, s_mobile, s_birth],
            function(err2, result){
                if(err2){
                    console.error('err', err);
                }
                callback(err2, result);
            });
        }
        else if(cnt===1){
            callback(err1, 'double');
        }
    })
}

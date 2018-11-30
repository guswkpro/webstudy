var dao = require('../../dao/index')
exports.signup = function(s_id, s_pw, s_name, s_email, s_address, s_mobile, s_birth, callback){
    dao.signup(s_id, s_pw, s_name, s_email, s_address, s_mobile, s_birth, function(err, result){
        if(err){
            console.error('err', err);
        }
        callback(err, result);
    }
)}
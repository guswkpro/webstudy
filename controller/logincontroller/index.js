var dao = require('../../dao/index')

exports.login = function(l_id, l_pw, callback){
    dao.login(l_id, l_pw, function(err, result){
        if(err){
            console.log('err');
        }
        callback(err, result);
    });
}
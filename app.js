var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var logincontroller = require('./controller/logincontroller/index');
var singncontroller = require('./controller/signupcontroller/index');
var server = app.listen(3000, function(){
    console.log("Express server has started on port 3000");
})

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.get('/', function(req, res){
    res.render('./login.html');
});
app.get('/login', function(req, res){
    res.render('./login.html');
});

app.post('/login_process', function(req, res){
    var l_id=req.body.id;
    var l_pw=req.body.pw;
    if(l_id === '' || l_pw === ''){
        res.send('<script type="text/javascript">alert("check the blank"); history.go(-1);</script>');
    }
    else{       
        logincontroller.login(l_id, l_pw, function(err, user){
        if(err){
            console.error('err');
        }
        if(user==='0'){
            res.send('<script type="text/javascript">alert("login failed check your id or password");</script>');
        }else{
       res.json("name: "+ user.user_name);
    }
    });
}
});

app.get('/signup', function(req, res){
    res.render('./signup.html');
});


app.post('/signup_process', function(req, res){
    var s_id = req.body.id;
    var s_pw = req.body.pw;
    var s_name = req.body.name;
    var s_email = req.body.email;
    var s_address = req.body.email;
    var s_mobile = req.body.mobile;
    var s_birth = req.body.birth;
    if(s_id === '' || s_pw === '' || s_name ===''){
        res.send('<script type="text/javascript">alert("please, check the blank"); location.href="./signup";</script>');
    }else{
        singncontroller.signup(s_id, s_pw, s_name, s_email, s_address, s_mobile, s_birth, function(err, result){
            if(err){
                console.error('err', err);
            }
            console.log(result);
            
            if(result==='double'){
                res.send('<script type="text/javascript">alert("check the Id, overlapped"); location.href="/signup";</script>');
            }
            else{
            res.redirect('/');
            //res.render('<script> alert("Hi '+s_name+'"! you succeeded in joining!");</script>');
        }
        });
    }


});
from_submit(); //函数封装
//提交表单
function from_submit() {
    var express = require('express');
    var app = express();
    var bodyParser = require('body-parser');

    var urlencodedParser = bodyParser.urlencoded({ extended: false })

    app.use(express.static('public'));
    //参数里为'/'则是默认打开页面
    app.get('/', function(req, res) {
        res.sendFile(__dirname + "/" + "login.html");
    })

    //注册
    app.get('/signup.html', function(req, res) {
        res.sendFile(__dirname + "/" + signup.html); //提供页面文件
    })

    app.post('/signup', urlencodedParser, function(req, res) { //post处理方法
        // 输出 JSON 格式
        var response = {
            "username": req.body.userId, //得到页面提交的数据
            "password": req.body.userPassword
        };
        //MD5加盐
        let load_password = md5(md5(JSON.stringify(req.body.userId) + md5(JSON.stringify(req.body.userPassword)))) 
        let user_ticket_service = md5(load_password)
        //加入数据库
        mysql_add(req.body.userId, user_ticket_service, res);
        //console.log(response);
        //res.end();

    })

    //登录
    app.get('/login.html', function(req, res) {
        res.sendFile(__dirname + "/" + login.html); //提供页面文件
    })

    app.post('/login', urlencodedParser, function(req, res) { //get处理方法
        var response = {
            "username": req.body.username,
            "password": req.body.password,
        };
        //md5加盐
        let load_password = md5(md5(JSON.stringify(req.body.username) + md5(JSON.stringify(req.body.password)))) 
        let user_ticket_client = md5(load_password)
        //数据库查找
        mysql_check(req.body.username, user_ticket_client, res);
        //res.end();
    })

    var server = app.listen(8888, function() { //监听
        var host = server.address().address
        var port = server.address().port
        console.log("正在监听。。。")
    })

}

//添加
function mysql_add(name, pas, res) {
    var mysql = require("mysql");
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'web'
    })

    connection.connect(function(err) {
        if (err) {
            console.log('与mysql数据库建立连接失败');
        } else {
            console.log('与mysql数据库建立连接成功');
            var addSql = "insert into users(username,password) values(?,?)"; //存放数据库语言的，这里是添加
            var addParmas = [name, pas];
            connection.query(addSql, addParmas, function(err, result) {
                if (err) {
                    console.log("[insert error]-", err.message);
                    return;
                }
                if (result=="") {
                    console.log("用户已存在");
                    res.end(0);
                }else{
                    console.log("插入成功");
                    res.end(1);  
             }
                
            })
        }
    })
}

//查找数据库
function mysql_check(name, pas, res) {
    var mysql = require("mysql");
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'web'
    })

    connection.connect(function(err) {
        if (err) {
            console.log('与mysql数据库建立连接失败');
        } else {
            console.log('与mysql数据库建立连接成功');
            var selectSQL = "select username,password from users where username = '" + name + "' and password = '" + pas + "'";
            connection.query(selectSQL, function(err, result) {
                if (err) {
                    console.log('[login ERROR] - ', err.message);
                    return;
                }
                if (result == '') {
                    console.log("帐号密码错误");
                    res.end(0); //登录失败
                } else {
                    console.log("登陆成功");
                    res.end(1); //登陆成功
                }
            });

        }
    })
}

//密码加盐
var crypto = require('crypto');

//hash 方法
const hash = (method, s, format) => {
    var sum = crypto.createHash(method);
    var isBuffer = Buffer.isBuffer(s);
    if (!isBuffer && typeof s === 'object') {
        s = JSON.stringify(sortObject(s));
    }
    s = JSON.stringify(s);
    sum.update(s, isBuffer ? 'binary' : 'utf8');
    return sum.digest(format || 'hex');
};

//md5编码
const md5 = (s, format) => {
    return hash('md5', s, format);
};
module.exports = {
    md5
};
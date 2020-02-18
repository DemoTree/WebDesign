function checkLogin() {
    var username = document.forms['myForm']['username'].value;
    var password = document.forms['myForm']['password'].value;
    var div = document.getElementById("wrong-info");
    //未输入用户名提示
    if (username.length == 0) {
        div.innerHTML = "<font size='2' color='red'>用户名不能为空</font>";
        //document.getElementById("username").setAttribute("placeholder", "用户名不能为空");
        return false;
    }
    //未输入密码提示
    if (password.length == 0) {
        div.innerHTML = "<font size='2' color='red'>密码不能为空</font>";
        return false;
    }
    return true;
}
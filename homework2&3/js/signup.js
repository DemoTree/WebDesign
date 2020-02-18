/******判断输入格式******/
function checkSignup() {
    var id = document.forms['myForm']['userId'].value;
    var password1 = document.forms['myForm']['userPassword'].value;
    var password2 = document.forms['myForm']['rePassword'].value;
    var div = document.getElementById("wrong-info");
    if (id == "") {
        div.innerHTML = "<font size='2' color='red'>用户名不能为空</font>";
        return false;
    } else if (id.length > 12 || id.length < 4) {
        div.innerHTML = "<font size='2' color='red'>用户名长度必须在 4-12 个字符</font>";
        return false;
    } else {
        for (var i = 0; i < id.length; i++) {
            if (!( (id.charCodeAt(i) >= 48 && id.charCodeAt(i) <= 57) || (id.charCodeAt(i) >= 65 
                && id.charCodeAt(i) <= 90) || (id.charCodeAt(i) >= 97 && id.charCodeAt(i) <= 122) )) {
                div.innerHTML = "<font size='2' color='red'>用户名必须为字母或数字</font>";
                return false;
            }
        }
    }

    var errStr="< > { } \\ @ $ % & ! ?".split(" ");
    for(i=0;i<errStr.length;i++){
        if(password1.indexOf(errStr[i])!=-1){
             div.innerHTML = "<font size='2' color='red'>用户名已存在</font>";
        return false;
        }
    }
    if (password1 == "") {
        div.innerHTML = "<font size='2' color='red'>密码不能为空</font>";
        return false;
    }
    if (password2 == '') {
        div.innerHTML = "<font size='2' color='red'>确认密码不能为空</font>";
        return false;
    }
    if (password1 != password2) {
        div.innerHTML = "<font size='2' color='red'>两次输入密码必须一致</font>";
        return false;
    }
    return true;
}

/******判断密码强度******/
//判断输入密码的类型  
function CharMode(ch) {
    if (ch >= 48 && ch <= 57) //数字  
        return 1;
    if (ch >= 97 && ch <= 122) //小写  
        return 2;
    if (ch >= 65 && ch <= 90) //大写  
        return 4;
    else //符号
        return 8;
}

//bitTotal函数  计算密码模式  
function bitTotal(num) {
    modes = 0;
    for (i = 0; i < 4; i++) {
        if (num & 1) {
            modes++;
        }
        num >>>= 1;
    }
    return modes;
}

//返回强度级别  
function checkStrong(password) {
    if (password.length < 6)
        return 0; //密码太短，不检测级别
    psw_modes = 0;
    for (i = 0; i < password.length; i++) {
        //密码模式  
        psw_modes |= CharMode(password.charCodeAt(i));
    }
    return bitTotal(psw_modes);
}

//显示颜色  
function checkIntensity(password) {
    default_color = "#EEEEEE"; //默认颜色
    L_color = "#FF0000"; //低强度
    M_color = "#FF9900"; //中等强度
    H_color = "#33CC00"; //高强度
    if (password == null || password == '') {
        Lcolor = Mcolor = Hcolor = default_color;
    } else {
        S_level = checkStrong(password);
        switch (S_level) {
            case 0: //
                Lcolor = Mcolor = Hcolor = default_color;
                break;
            case 1: //低强度显色
                Lcolor = L_color;
                Mcolor = Hcolor = default_color;
                break;
            case 2: //低强度和中等强度显色
                Lcolor = Mcolor = M_color;
                Hcolor = default_color;
                break;
            default: //都显色
                Lcolor = Mcolor = Hcolor = H_color;
        }
    }
    document.getElementById("strength_L").style.background = Lcolor;
    document.getElementById("strength_M").style.background = Mcolor;
    document.getElementById("strength_H").style.background = Hcolor;
    return;
}
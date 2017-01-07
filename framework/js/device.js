window._heimdall_deviectHelper = {
    initOS:function initOS(){
    var sUserAgent = navigator.userAgent;
    var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
    var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
    if (isMac) return "mac";
    var isUnix = (navigator.platform == "X11") && !isWin && !isMac;
    if (isUnix) return "unix";
    var isLinux = (String(navigator.platform).indexOf("Linux") > -1);
    if (isLinux) return "linux";
    if (isWin){
        return "windows"
    }
    return "other"
},
    initBR:function initBR(){
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isOpera = userAgent.indexOf("Opera") > -1;
        if (isOpera) {
            return "Opera"
        }; //判断是否Opera浏览器
        if (userAgent.indexOf("Firefox") > -1) {
            return "FF";
        } //判断是否Firefox浏览器
        if (userAgent.indexOf("Chrome") > -1){
            return "Chrome";
        }
        if (userAgent.indexOf("Safari") > -1) {
            return "Safari";
        } //判断是否Safari浏览器
        if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
            return "IE";
        }
        return ""
        ; //判断是否IE浏览器
    },
    initLAN:function initLAN() {
        if (navigator.browserLanguage) {
            return navigator.browserLanguage;
        } else {
            return navigator.language;
        }
    },
    initIFC:function initIFC(){
        if(window.navigator.cookieenabled){
            return 1;
        }else{
            return 0;
        }
    },
    initFV:function initFV(){
        var flashVersion ="";
        if (navigator.plugins && navigator.plugins.length > 0) {
            var swf = navigator.plugins["Shockwave Flash"];
            if (swf) {
                hasFlash = 1;
                var words = swf.description.split(" ");
                for (var i = 0; i < words.length; ++i) {
                    if (isNaN(parseInt(words[i]))) continue;
                    flashVersion = parseInt(words[i]);
                }
            }
        }

        return flashVersion;
    },
    initIFJ:function initIFJ(){
        if(navigator.javaEnabled()){
            return 1;
        }else{
            return 0;
        }
    }
}
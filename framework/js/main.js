var _heimdall_host = "http://heimdall.oudianyun.com/";
var _heimdall_manager = null;


var _heimdall_manager_getCookie = function(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}


function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

function _heimdall_requireJs(url){
    var vds = document.createElement('script');
    vds.type='text/javascript';
    vds.async = true;
    vds.src = url;
    var s = document.getElementsByTagName('script')[0];

    s.parentNode.insertBefore(vds, s);
}

function _heimdall_requireCSS(url){
    var vds = document.createElement('link');
    vds.type='text/css';
    vds.rel = "stylesheet";
    vds.media = "all";
    vds.href = url;
    var s = document.getElementsByTagName('link')[0];
    s.parentNode.appendChild (vds);
}


var userInfo = _heimdall;
_heimdall_requireJs("http://pv.sohu.com/cityjson?ie=utf-8");
_heimdall_requireJs(_heimdall_host + "/heimdall-web/heimdall-bi/heimdall-js_sdk/XMan.js");
_heimdall_requireCSS(_heimdall_host +"/heimdall-web/heimdall-bi/heimdall-js_sdk/sdk.css");
_heimdall_requireJs(_heimdall_host + "/heimdall-web/heimdall-bi/heimdall-js_sdk/device.js");
_heimdall_requireJs(_heimdall_host + "/heimdall-web/heimdall-bi/heimdall-js_sdk/config.js");
_heimdall_requireJs(_heimdall_host + "/heimdall-web/heimdall-bi/heimdall-js_sdk/track.js");
_heimdall_requireJs(_heimdall_host + "/heimdall-web/heimdall-bi/heimdall-js_sdk/manager.js");
_heimdall_requireJs(_heimdall_host + "/heimdall-web/heimdall-bi/heimdall-js_sdk/server.js");
_heimdall_requireJs(_heimdall_host + "/heimdall-web/heimdall-bi/heimdall-js_sdk/TMServer.js");
_heimdall_editControl=null;
_heimdall_tackList=[];
_heimdall_ids=[];
_heimdall_loadcount = 0;

function heimdall_initSt(){
    try{
        if(_heimdall_systemtype){
            return _heimdall_systemtype;
        }
    }catch(e){
        var system ={
            win : false,
            mac : false,
            xll : false
        };
        var p = navigator.platform;
        system.win = p.indexOf("Win") == 0;
        system.mac = p.indexOf("Mac") == 0;
        system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
        if(system.win||system.mac||system.xll){
            return 1;
        }else{
            return 2;
        }
    }

}


var heimdall_isPageLoaded = false

window.onload = function(){

    heimdall_isPageLoaded = true
    var heimdall_st=heimdall_initSt()
    var controls= document.all;
    for(var i = 0 ; i < controls.length ; i++){

        controls[i].setAttribute("_heimdall_id", i.toString() + _heimdall_loadcount);
    }
    _heimdall_loadcount ++;
    var id="";
    var isNew = 0;
    if(document.cookie.indexOf("_heimdall_guid")==-1){
        id = _heimdall_config.uuid();
        document.cookie ="_heimdall_guid=" +id;
        isNew =1;
    }else{
        id = _heimdall_manager_getCookie("_heimdall_guid")
    }
    var chn =_heimdall_manager_getCookie("_heimdall_source");
    var usertoken = localStorage.heimdall_token;
  //  console.log(navigator.platform)

    if(document.referrer != "*"){
        _heimdall_tackList = [];
        _heimdall_server.sdkCheck(_heimdall.appKey,_heimdall.appSecret,function(token){
         //  console.log(token);
            var tracker = new _heimdall_track(token);
            var MutationObserver = window.MutationObserver ||
                window.WebKitMutationObserver ||
                window.MozMutationObserver;

           if(MutationObserver!= undefined){
               var callback = function(records) {
                   records.map(function(record) {
                       record.target.setAttribute("_heimdall_id", "reload" + _heimdall_loadcount);
                       _heimdall_loadcount++;
                       tracker.track(record.target);
                   });
               };
               var mo = new MutationObserver(callback);
               var option = {
                   'childList': true,
                   'subtree': true
               };
               mo.observe(document.body, option);
           }

            _heimdall_TMServer.list(_heimdall.appKey,_heimdall.pageName,function(trackList){
                //console.log("可视化埋点获取成功" + trackList.length)
                _heimdall_tackList = trackList;
                _heimdall_config.deviceInfo={
                    ak:_heimdall.appKey,
                    uk:"test",
                    gu:id,
                    in:isNew,
                    st:heimdall_st,
                    pl:_heimdall.productLine,
                    os:_heimdall_config.encodekey(_heimdall_deviectHelper.initOS()),
                    ov:"",
                    ss:window.screen.width + "*" + window.screen.height,
                    ip:returnCitySN["cip"],
                    br:_heimdall_deviectHelper.initBR(),
                    lan:_heimdall_deviectHelper.initLAN(),
                    fv: _heimdall_deviectHelper.initFV(),
                    ifj:_heimdall_deviectHelper.initIFJ(),
                    ifc:_heimdall_deviectHelper.initIFC(),
                    brs:window.screen.availWidth + "*" + window.screen.availHeight,
                    ts:new Date()._heimdall_Format("yyyy-MM-dd hh:mm:ss"),
                    cp:window.location.href,
                    pp:document.referrer,
                    pn:_heimdall.pageName,
                    chn:chn,
                    token:token
                }
                var isLoad = false;

                if(_heimdall.pageName == "首页"){
                    tracker.trackFirstPage();
                    isLoad = true
                }else if(_heimdall.pageName.indexOf("商品详情页")!= -1){
                    isLoad = true
                    tracker.trackInfoPage(_heimdall.productName,_heimdall.productType,_heimdall.productTypeId,_heimdall.brandId,_heimdall.brandName,_heimdall.productPrice,_heimdall.productId);
                }
                if(!isLoad){
                    document.cookie="_heimdall_source="+document.referrer;
                    tracker.loadCount(function(){
                        tracker.track();
                    });
                }else{
                    tracker.track();
                }
            /*    if(document.referrer == "" || document.referrer.indexOf(document.domain) == -1  )
                {
                    if(!isLoad){
                        document.cookie="_heimdall_source="+document.referrer;
                        tracker.loadCount(function(){

                            tracker.track();
                        });
                    }
                }else{
                    //console.log("开启页面监控")
                    tracker.track();
                }*/
            })
         /*    var tracker = new _heimdall_track(token);
             if(document.referrer == "" || document.referrer.indexOf(document.domain) == -1 )
             {
             document.cookie="_heimdall_source="+document.referrer;
             tracker.loadCount(function(){
             console.log("页面加载事件发送成功")
             tracker.track();
             });
             }else{
             console.log("开启页面监控")
             tracker.track();
             }*/
        },function(){
            //console.log("获取可视化埋点失败")
        })
    }
    if(usertoken != null){
        var socket = new WebSocket('ws://heimdall.oudianyun.com/heimdall-websocket/websocket');
        socket.onopen=function(){
            var params = {event:"findPool",token:usertoken,appKey:_heimdall.appKey,appSecret:_heimdall.appSecret}
           // console.log("已发发送链接请求")
            socket.send(JSON.stringify(params));
            socket.onmessage=function(msg){
                console.log(msg.data);
                if(msg.data=="edit"){
                    //打开编辑模式
                   // console.log("打开编辑模式")
                    _heimdall_manager.beginEdit()
                }else if(msg.data=="view"){
                    //关闭编辑模式
                    //console.log("关闭编辑模式")
                    document.getElementById("heimdall_event_view").style.display="none";

                    _heimdall_manager.endEdit();
                }
            }
        }
    }
}

setTimeout(function(){

    if(!heimdall_isPageLoaded){
        heimdall_isPageLoaded = true
        var heimdall_st=heimdall_initSt()
        var controls= document.all;
        for(var i = 0 ; i < controls.length ; i++){
            _heimdall_loadcount ++;
            controls[i].setAttribute("_heimdall_id", i.toString() + _heimdall_loadcount);
        }
        _heimdall_manager = new _heimdall_manager();
        var id="";
        var isNew = 0;
        if(document.cookie.indexOf("_heimdall_guid")==-1){
            id = _heimdall_config.uuid();
            document.cookie ="_heimdall_guid=" +id;
            isNew =1;
        }else{
            id = _heimdall_manager_getCookie("_heimdall_guid")
        }
        var chn =_heimdall_manager_getCookie("_heimdall_source");
        var usertoken = localStorage.heimdall_token;
        //  console.log(navigator.platform)

        if(document.referrer != "*"){
            _heimdall_tackList = [];

            _heimdall_server.sdkCheck(_heimdall.appKey,_heimdall.appSecret,function(token){
                //  console.log(token);
                var tracker = new _heimdall_track(token);
                if(MutationObserver!= undefined){
                    var callback = function(records) {
                        records.map(function(record) {
                            record.target.setAttribute("_heimdall_id", "reload" + _heimdall_loadcount);
                            _heimdall_loadcount++;
                            tracker.track(record.target);
                        });
                    };
                    var mo = new MutationObserver(callback);
                    var option = {
                        'childList': true,
                        'subtree': true
                    };
                    mo.observe(document.body, option);
                }
                _heimdall_TMServer.list(_heimdall.appKey,_heimdall.pageName,function(trackList){
                    //console.log("可视化埋点获取成功" + trackList.length)
                    _heimdall_tackList = trackList;
                    _heimdall_config.deviceInfo={
                        ak:_heimdall.appKey,
                        uk:"test",
                        gu:id,
                        in:isNew,
                        st:heimdall_st,
                        pl:_heimdall.productLine,
                        os:_heimdall_config.encodekey(_heimdall_deviectHelper.initOS()),
                        ov:"",
                        ss:window.screen.width + "*" + window.screen.height,
                        ip:returnCitySN["cip"],
                        br:_heimdall_deviectHelper.initBR(),
                        lan:_heimdall_deviectHelper.initLAN(),
                        fv: _heimdall_deviectHelper.initFV(),
                        ifj:_heimdall_deviectHelper.initIFJ(),
                        ifc:_heimdall_deviectHelper.initIFC(),
                        brs:window.screen.availWidth + "*" + window.screen.availHeight,
                        ts:new Date()._heimdall_Format("yyyy-MM-dd hh:mm:ss"),
                        cp:window.location.href,
                        pp:document.referrer,
                        pn:_heimdall.pageName,
                        chn:chn,
                        token:token
                    }
                    var isLoad = false;
                    if(_heimdall.pageName == "首页"){
                        tracker.trackFirstPage();
                        isLoad = true
                    }else if(_heimdall.pageName.indexOf("商品详情页")!= -1){
                        isLoad = true
                        tracker.trackInfoPage(_heimdall.productName,_heimdall.productType,_heimdall.productTypeId,_heimdall.brandId,_heimdall.brandName,_heimdall.productPrice,_heimdall.productId);
                    }

                    if(document.referrer == "" || document.referrer.indexOf(document.domain) == -1  )
                    {
                        if(!isLoad){
                            document.cookie="_heimdall_source="+document.referrer;
                            tracker.loadCount(function(){

                                tracker.track();
                            });
                        }
                    }else{
                        //console.log("开启页面监控")
                        tracker.track();
                    }
                })
                /*    var tracker = new _heimdall_track(token);
                 if(document.referrer == "" || document.referrer.indexOf(document.domain) == -1 )
                 {
                 document.cookie="_heimdall_source="+document.referrer;
                 tracker.loadCount(function(){
                 console.log("页面加载事件发送成功")
                 tracker.track();
                 });
                 }else{
                 console.log("开启页面监控")
                 tracker.track();
                 }*/
            },function(){
                //console.log("获取可视化埋点失败")
            })
        }
        if(usertoken != null){
            var heimdall_managerClient = new  _heimdall_manager();
            var socket = new WebSocket('ws://heimdall.oudianyun.com/heimdall-websocket/websocket');
            socket.onopen=function(){
                var params = {event:"findPool",token:usertoken,appKey:_heimdall.appKey,appSecret:_heimdall.appSecret}
                // console.log("已发发送链接请求")
                socket.send(JSON.stringify(params));
                socket.onmessage=function(msg){
                    console.log(msg.data);
                    if(msg.data=="edit"){
                        //打开编辑模式
                        // console.log("打开编辑模式")
                        heimdall_managerClient.beginEdit()
                    }else if(msg.data=="view"){
                        //关闭编辑模式
                        //console.log("关闭编辑模式")
                        document.getElementById("heimdall_event_view").style.display="none";
                        heimdall_managerClient.endEdit();
                    }
                }
            }
        }
    }
},1000)


Date.prototype._heimdall_Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


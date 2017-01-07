window._heimdall_config_serverhost ="http://heimdall.oudianyun.com/heimdall-daq"

window._heimdall_server={
    checkServer:_heimdall_config_serverhost + "/server/sdkcheck.do",
    trackServer:_heimdall_config_serverhost + "/trackeraction/web.do",
    _http: function(type,url,param,fun,error){
        var isReturn = false;
        param.type="form";
        x.formRequest(type, url, param, function (data) {
            isReturn =true
            fun(data);
        },'application/x-www-form-urlencoded');
        setTimeout(function(){
            if(!isReturn){
                error()
            }
        },5000)
    },
    sdkCheck:function(appKey,appSecret,success,error){
         this._http("post",_heimdall_server.checkServer,{appKey:appKey,appSecret:appSecret},function(data){
             var result = JSON.parse(data);
             if(result.code=="0"){
                 success(result.data.token);
             }
         },function(){
                if(error != undefined){
                    error();
                }
         })
    },
    track:function(params,success,error){

        delete params.isNew;
        delete params.toString;
        delete params.valueOf;
        if(params.st != 0 && params.st!= "0" ){
            this._http("post",this.trackServer,params,function(data){
                success(data);
            },function(){
                if(error != undefined){
                    error();
                }
            })
        }
    }
}


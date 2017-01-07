window._heimdall_config={
    lock_tag :["A","SPAN","IMG","H1","H2","H3","H4","H5","LABEL","P","I","INPUT"],
    serverhost:"https://120.92.133.221/heimdall-daq",
    elements :{},
    A_elements:[],
    deviceInfo:{},
    dectionary:{
        viewHomePage:0,
        searchProduct:1,
        viewDetailPage:2,
        favorite:3,
        addCart:4,
        signUp:5,
        submitOrder:6,
        payOrder:7,
        cancelOrder:8,
        refund:9,
        undoFavorite:11,
        viewActivePage:10,
        minusCart:12,
        pc:0,
        h5:1,
        ios:4,
        android:5,
        windows:1,
        mac:2,
        linux:3,
        heimdall_keyword:"kw",
        heimdall_products:"prs",
        heimdall_productname:"prn",
        heimdall_productid:"pri",
        heimdall_producttype:"pt",
        heimdall_producttypeid:"pti",
        heimdall_productTypeId:"pti",
        heimdall_productnum:"prm",
        heimdall_productcount:"pc",
        heimdall_orderid:"oid",
        heimdall_ordertotalprice:"otp",
        heimdall_shipprice:"sp",
        heimdall_paymentmethod:"pm",
        heimdall_brandname:"bn",
        heimdall_brandid:"bni",
        heimdall_productprice:"prp",
        heimdall_eventname:"ev"
    },
    encodekey:function(name){
        if(_heimdall_config.dectionary[name] != undefined){
            name = _heimdall_config.dectionary[name]
        }
        return name;
    },
    uuid:function(){
        function base64(t){
            var i64Bit='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ`^abcdefghijklmnopqrstuvwxyz';
            var i64BitTable = i64Bit.split("");
            var value = t;
            var result = [];
            var arr = toArray(value);
            var len = arr.length;
            for ( var i = 0; i < len; i++) {
                result.push(i64BitTable[parseInt(arr[i], 2).toString(10)]);
            }
            return result.join("");
            // 把十进制转换成2进制，以6个字符为单位存储进数组中。
            function toArray(value) {
                // 10进制转2进制
                var t = parseInt(value).toString(2);
                // console.log(t);
                var length = t.length;
                var arr = [];
                // 对6进行求模，剩余位存储在高位
                var ys = length % 6;
                if (ys > 0) {
                    arr.push(t.substring(0, ys));
                }
                var index = ys;
                // 为余下的二进制，以6个为单位push进数组中
                while (index < length) {
                    arr.push(t.substring(index, index + 6));
                    index += 6;
                }
                return arr;
            }
        };

        function hash(str){
            var hash=0,
                charCode=0,
                idx;
            if(str){
                for(idx = str.length - 1; idx >= 0; idx--){
                    charCode = str.charCodeAt(idx);
                    hash = (hash << 6&268435455) + charCode+(charCode << 14);
                    charCode = hash&266338304;
                    hash = charCode != 0 ? hash ^ charCode>>21 : hash;
                }
            }
            return hash;
        };
        var uuid;
        var nav= navigator.appName + navigator.platform + navigator.userAgent;
        var value = new Date().getTime();
        if(document.cookie.indexOf("_heimdall_guid")==-1){
            uuid = base64(value) + "-" +base64(hash(nav)+"10");
        }else{
            uuid =base64(value) + "-" +base64(hash(nav)+"00");
        }
        return uuid;
    },
    controlId: function(e,name,fun){
        var id = "";
        if(e.parentNode != null){
            id +=e.parentNode.childNodes.length;
            var brother = e.parentNode.childNodes;
            for(var i = 0 ; i < brother.length ; i ++){
                if(brother[i] === e){
                    id  += i;
                }
            }
            var result = name + id;
            this.controlId(e.parentNode,result,fun)
        }else{
            fun(name)
        }
    }
}

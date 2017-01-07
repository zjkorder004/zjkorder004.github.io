/**
 * Created by xiaoma on 2016/6/20.
 */
var _heimdall_manager = function(){
      var $This = this;
      var  AElement =[];
      var  Elements={};
      var  vds = null;
      var  LockTags= ["A","SPAN","IMG","H1","H2","H3","H4","H5","LABEL","P","I","INPUT"];
      var  lockA= function(){
        var elements = document.getElementsByTagName("A");
        for(var i = 0 ; i < elements.length ; i ++){
            AElement.push( elements[i].href);
            elements[i].href="javascript:void(0)";
        }
      }

      var unlockA =function(){
          var elements = document.getElementsByTagName("A");
          for(var i = 0 ; i < elements.length ; i ++){
              elements[i].href= AElement[i];
          }
          AElement = [];
      }




    var initPostion = function(element) {
        o = element;
        oTop = o.offsetTop;
        oLeft = o.offsetLeft;
        while(o.offsetParent!=null)
        {
            oParent = o.offsetParent
            oTop += oParent.offsetTop  // Add parent top position
            oLeft += oParent.offsetLeft
            o = oParent
        }
        var baseLeft = oLeft;
        if(document.body.clientWidth - oLeft -element.offsetWidth < 345){

            oLeft= oLeft -element.offsetWidth -345;
            vds.className ="heimdall-popover heimdall-right-view";
            if(oTop < 35){
                oTop = oTop + element.offsetHeight + 30 + 30
                oLeft = oLeft + element.offsetWidth + 20;
                vds.className ="heimdall-popover heimdall-topleft-view";
            }

            if(oTop + 300 >document.body.scrollTop + window.screen.availHeight){
                oTop =  oTop -300-20;
                oLeft = oLeft + element.offsetWidth;
                vds.className ="heimdall-popover heimdall-bottomleft-view";
            }
        }else{

            vds.className ="heimdall-popover heimdall-left-view";
            if(oTop < 35){
                oTop = oTop + element.offsetHeight + 30 + 30
                oLeft = oLeft - element.offsetWidth - 20;
                vds.className ="heimdall-popover heimdall-topright-view";
            }



            if(oTop + 300 >document.body.scrollTop + window.screen.availHeight){

                oTop =  oTop -300-20;
                oLeft = oLeft - element.offsetWidth;

                vds.className ="heimdall-popover heimdall-bottomright-view";
            }
        }



        return {X:oLeft,Y:oTop}
    }


    var editEventView = function(e){
            var element = e.target;
            _heimdall_editControl = element
            if(element.getAttribute("heimdall_name") == null){
                document.getElementById("heimdall_event").value="";
            }else{
                document.getElementById("heimdall_event").value=element.getAttribute("heimdall_name");
            }
            if(element.getAttribute("heimdall_remark") == null){
                document.getElementById("heimdall_remark").value="";
            }else{
                document.getElementById("heimdall_remark").value=element.getAttribute("heimdall_remark");
            }
            if(element.getAttribute("heimdall_linkurl") == null){
                document.getElementById("heimdall_linkurl").value="";
            }else{
                document.getElementById("heimdall_linkurl").value=element.getAttribute("heimdall_linkurl");
            }
            var postion = initPostion(element);
            var width = element.offsetWidth;
            vds.style["top"] = postion.Y - 25 + "px";
            vds.style["left"] = postion.X + width + 25+ "px";
            vds.style["display"] = "block";
            vds.setAttribute("heimdall_controllid",element.getAttribute("_heimdall_id"));
            vds.setAttribute("heimdall_eventId",element.getAttribute("heimdall_eventId"));
             if(element.getAttribute("heimdall_eventId") != null && element.getAttribute("heimdall_eventId") != "" && element.getAttribute("heimdall_eventId")!="null" ){

                 document.getElementById("heimdall_cancel").textContent="删除";
             }else{
                 document.getElementById("heimdall_cancel").textContent="取消";
             }
      }

      var moustover_webkit = function(obj){
          var element = obj.target;
          if(element.name != "heimdall_view"){
              if(LockTags .indexOf(element.tagName) != -1 || element.onclick!=null ){
                      var id = element.getAttribute("_heimdall_id")
                      if(element.tagName != "DIV"){
                          element.style["outline"]="solid red"
                          element.style["border"]="blue"
                          Elements[id] = {};
                          Elements[id].click = element.onclick;
                          element.onclick = editEventView;
                      }
              }
          }
      }

      var moustout_webkit = function(obj){
          var element = obj.target;
          if(element.tagName != "DIV" && element.name != "heimdall_view"){
              if(element.getAttribute("heimdall_eventId") == null || element.getAttribute("heimdall_eventId") == "" || element.getAttribute("heimdall_eventId") == "null"){
                  element.style["outline"]="none";
                  element.style["border"]="none";
              }
          }
      }

      var initEditViewControl = function(){
          vds = document.createElement('div');
          vds.name = "heimdall_view"
          vds.id="heimdall_event_view"
          vds.className="heimdall-popover"
          vds.innerHTML="<div name='heimdall_view'  class='heimdall-popover-title'>自定义事件 <div name='heimdall_view' class='heimdall_popover_close'><a name='heimdall_view' onclick='heimdall_event_close()' >x</a></div></div>";
          vds.innerHTML += "<div name='heimdall_view' class='heimdall-popover-row'>事件名称<div class='heimdall-popover-cell' ><input id='heimdall_event' type='text'  name='heimdall_view' /></div></div>"
          vds.innerHTML += "<div name='heimdall_view' class='heimdall-popover-row'>链接路径<div class='heimdall-popover-cell' ><input id='heimdall_linkurl' type='text'  name='heimdall_view' /></div></div>"
          vds.innerHTML += "<div name='heimdall_view' class='heimdall-popover-row'>事件说明<div class='heimdall-popover-cell' ><textarea id='heimdall_remark'  name='heimdall_view'></textarea></div></div>"
          vds.innerHTML += "<div name='heimdall_view' class='heimdall-popover-bottom'></div>"
          vds.innerHTML += "<div name='heimdall_view' class='heimdall-popover-menu'><button  name='heimdall_view' onclick='heimdall_event_submit(this)' >确定</button><button class='heimdall-cancel' id='heimdall_cancel' name='heimdall_view' onclick='heimdall_event_cancel()' >取消</button></div>"
          vds.style["display"] ="none"
          var first = document.body.children[0];
          document.body.insertBefore(vds, first);
      }

      var decodeControl = function(index,controls,list,fun){
           if(index < controls.length){
                   for(var i = 0 ; i < list.length ; i ++)
                   {
                       if(list[i].widgetid.toString() == controls[index].getAttribute("_heimdall_id")){
                           controls[index].setAttribute("heimdall_eventId",list[i].eventid)
                           controls[index].setAttribute("heimdall_name",list[i].eventname)
                           controls[index].setAttribute("heimdall_remark",list[i].remark)
                           controls[index].setAttribute("heimdall_linkurl",list[i].linkurl)
                           controls[index].style["outline"]="solid red"
                           controls[index].style["border"]="blue"
                       }
                   }
                   index = index + 1;
                   decodeControl(index,controls,list,fun)
           }else{
               fun()
           }
      }

      var initTrack=function(fun){

          _heimdall_TMServer.list(_heimdall.appKey,_heimdall.pageName,function(list){

                var controls = document.all;
                decodeControl(0,document.all,list,function(){

                    //console.log("埋点信息加载完成")
                    fun();
                })
          },function(){
             // console.log("埋点获取失败")

          })
      }

      this.beginEdit = function(){

          initTrack(function(){
              lockA();
              document.addEventListener("mouseover",moustover_webkit,false)
              document.addEventListener("mouseout", moustout_webkit,false)
              initEditViewControl()
          })

      }

      this.endEdit=function(){
          unlockA();
          document.removeEventListener("mouseover",moustover_webkit)
          document.removeEventListener("mouseout",moustout_webkit)
          var controls = document.all;
          for(i = 0 ; i < controls.length ; i++){
              if(controls[i].getAttribute("heimdall_eventId") != null && controls[i].getAttribute("heimdall_eventId") != "" ){
                  controls[i].style["outline"]="none";
                  controls[i].style["border"]="none";
              }
          }
      }

}

function heimdall_event_submit(e){

    var eventname = document.getElementById("heimdall_event").value;
    var eventremark = document.getElementById("heimdall_remark").value;
    var linkurl = document.getElementById("heimdall_linkurl").value;
    var pageName=  _heimdall.pageName;
    var controlId=e.parentNode.parentNode.getAttribute("heimdall_controllid");
    var eventId = e.parentNode.parentNode.getAttribute("heimdall_eventId");
    if(eventId == "null" || eventId == "" || eventId == null ){
        if(eventname == "" || eventname==undefined ){
            alert("事件名称不能为空")
        }else{
            _heimdall_TMServer.add(_heimdall.appKey,_heimdall.pageName,eventname,eventremark,controlId,linkurl,function(data){
                _heimdall_editControl.style["outline"]="solid red";
                _heimdall_editControl.style["border"]="blue";
                e.parentNode.parentNode.style["display"] = "none";
                _heimdall_editControl.setAttribute("heimdall_linkurl",linkurl)
                _heimdall_editControl.setAttribute("heimdall_name",eventname)
                _heimdall_editControl.setAttribute("heimdall_remark",eventremark)
                _heimdall_editControl.setAttribute("heimdall_remark",eventremark)
                _heimdall_editControl.setAttribute("heimdall_eventId",data.eventId)
                console.log("埋点新增成功！");
            },function(){
                console.log("埋点新增失败！");
            })
        }

    }else{
        if(eventname == "" || eventname==undefined ){
            alert("事件名称不能为空")
        }else{
            _heimdall_TMServer.update(eventId,eventname,eventremark,linkurl,function(){
                _heimdall_editControl.setAttribute("heimdall_linkurl",linkurl)
                _heimdall_editControl.setAttribute("heimdall_name",eventname)
                _heimdall_editControl.setAttribute("heimdall_remark",eventremark)

                e.parentNode.parentNode.style["display"] = "none";
                console.log("埋点更新成功！")
            },function(){
                console.log("埋点更新失败！")
            })
        }
    }

}

function heimdall_event_cancel(){
    var eventId = _heimdall_editControl.getAttribute("heimdall_eventId");

    if(eventId == null || eventId=="" || eventId=="null" ){
        var element = document.getElementById("heimdall_event_view");
        element.style["display"] = "none";
    }else{
        _heimdall_TMServer.delete(eventId,function(){
            var element = document.getElementById("heimdall_event_view");
            element.style["display"] = "none";
            _heimdall_editControl.style["outline"]="none";
            _heimdall_editControl.style["border"]="none";
            _heimdall_editControl.setAttribute("heimdall_linkurl","")
            _heimdall_editControl.setAttribute("heimdall_name","")
            _heimdall_editControl.setAttribute("heimdall_remark","")
            _heimdall_editControl.setAttribute("heimdall_eventId","")
            console.log("删除成功")
        },function(){
            var element = document.getElementById("heimdall_event_view");
            element.style["display"] = "none";
            console.log("删除失败")
        })
    }
}

function heimdall_event_close(){
    var element = document.getElementById("heimdall_event_view");
    element.style["display"] = "none";
}
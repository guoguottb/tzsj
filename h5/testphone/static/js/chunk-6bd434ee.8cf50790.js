(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6bd434ee"],{"05e4":function(e,t,a){"use strict";a("b843")},"365c":function(e,t,a){"use strict";a.d(t,"f",(function(){return i})),a.d(t,"c",(function(){return o})),a.d(t,"d",(function(){return l})),a.d(t,"h",(function(){return r})),a.d(t,"g",(function(){return n["e"]})),a.d(t,"i",(function(){return n["f"]})),a.d(t,"b",(function(){return n["a"]})),a.d(t,"j",(function(){return c})),a.d(t,"a",(function(){return h})),a.d(t,"k",(function(){return d})),a.d(t,"e",(function(){return u}));var s=a("b775");const i=e=>Object(s["a"])({method:"POST",url:"/social/child/getChildCheckList",data:e}),o=e=>Object(s["a"])({method:"POST",url:"/social/assistanceWeixin/queryDisabledList",data:e}),l=e=>Object(s["a"])({method:"POST",url:"/social/assistanceWeixin/getDisabled",data:e}),r=e=>Object(s["a"])({method:"POST",url:"/social/assistanceWeixin/saveDisabledInfo",data:e});var n=a("8a25");const c=e=>Object(s["a"])({method:"POST",url:"/social/assistanceWeixin/verifyCode",data:e}),h=e=>Object(s["a"])({method:"POST",url:"/social/weixinMinios/fileUpload",data:e}),d=e=>Object(s["a"])({method:"POST",url:e,data:{}}),u=e=>Object(s["a"])({method:"POST",url:"/social/assistanceWeixin/getReliefdistOpen",data:e})},"8a25":function(e,t,a){"use strict";a.d(t,"e",(function(){return i})),a.d(t,"f",(function(){return o})),a.d(t,"a",(function(){return l})),a.d(t,"b",(function(){return r})),a.d(t,"d",(function(){return n})),a.d(t,"c",(function(){return c}));var s=a("b775");const i=e=>Object(s["a"])({method:"POST",url:"/social/child/saveChildInfo",data:e}),o=e=>Object(s["a"])({method:"POST",url:"/social/child/temporarilySave",data:e}),l=e=>Object(s["a"])({method:"POST",url:"/social/child/getChildDetailInfo",data:e}),r=e=>Object(s["a"])({method:"POST",url:"/social/childEvaluate/getNewEvaluateRecord",data:e}),n=e=>Object(s["a"])({method:"POST",url:"/social/childEvaluate/saveAloneEvaluateRecord",data:e}),c=e=>Object(s["a"])({method:"POST",url:"/social/childEvaluate/saveAloneEvaluateOpinion",data:e})},a06c:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e._self._c;return t("div",{staticClass:"helpApply"},[t("header",[t("div",{staticClass:"headerHead"},[t("div",[t("div",{class:{headerF:e.isShow}},[e._v("申请须知")])]),t("div",{staticClass:"headerRectangle"}),t("div",[t("div",{class:{headerF:e.isShow2}},[e._v("在线填表")])]),t("div",{staticClass:"headerRectangle"}),t("div",[t("div",{class:{headerF:e.isShow3}},[e._v("材料申报")])])])]),t("main",[t("div",{directives:[{name:"show",rawName:"v-show",value:e.page1,expression:"page1"}],staticStyle:{height:"auto",display:"block","text-align":"left"},attrs:{id:"page1"}},[e._m(0),t("div",{staticStyle:{"margin-top":"40px"}},[e.isApply?t("div",[t("van-button",{staticStyle:{width:"100%",height:"55px"},attrs:{type:"info",size:"large",to:"policiesCalculator"},on:{click:e.next1}},[e._v("不 了 解 政 策 , 进 行 自 我 评 估")]),t("van-button",{staticStyle:{width:"100%","margin-top":"30px",height:"55px"},attrs:{type:"primary",size:"large"},on:{click:function(t){e.isApply=!1}}},[e._v("了 解 政 策 , 直 接 进 入 申 请")])],1):e._e(),e.isApply?e._e():t("div",{staticStyle:{display:"flex","justify-content":"center"}},[t("van-checkbox",{staticClass:"page1Font3",model:{value:e.checked,callback:function(t){e.checked=t},expression:"checked"}},[e._v("我已知晓，并继续下一步操作")])],1)]),t("div",{directives:[{name:"show",rawName:"v-show",value:e.checked,expression:"checked"}],staticStyle:{"margin-left":"20px","margin-right":"20px","margin-top":"40px"}},[t("div",{staticStyle:{width:"100%","margin-bottom":"10px"}},[e._v("民政救助申请")]),t("van-button",{staticStyle:{width:"100%"},attrs:{type:"info"},on:{click:e.next1}},[e._v("下一步")])],1)]),t("div",{directives:[{name:"show",rawName:"v-show",value:e.page2,expression:"page2"}],staticStyle:{display:"block","padding-top":"10px"},attrs:{id:"page2"}},[t("div",{staticClass:"page2Div1"},[e._m(1),t("van-form",{ref:"apply",staticStyle:{"margin-top":"10px"},on:{submit:e.next2}},[t("van-field",{attrs:{required:"",name:"ab_ex75",label:"申请方式",rules:e.rules.rules1},scopedSlots:e._u([{key:"input",fn:function(){return[t("van-radio-group",{attrs:{direction:"horizontal"},model:{value:e.form.ab_ex75,callback:function(t){e.$set(e.form,"ab_ex75",t)},expression:"form.ab_ex75"}},[t("van-radio",{attrs:{name:"委托代理"}},[e._v("代申请")]),t("van-radio",{attrs:{name:"本人"}},[e._v("本人")])],1)]},proxy:!0}])}),t("van-field",{attrs:{required:"",readonly:"",name:"ab_ex13",value:e.form.ab_ex13,label:"求助类别","is-link":"",placeholder:"请选择一个求助类别",clickable:"",rules:e.rules.rules11},on:{click:function(t){e.showOption1=!0}}}),t("van-popup",{attrs:{position:"bottom"},model:{value:e.showOption1,callback:function(t){e.showOption1=t},expression:"showOption1"}},[t("van-picker",{attrs:{"show-toolbar":"",columns:e.help_list},on:{confirm:function(t){return e.optionEvent(t)},cancel:function(t){e.showOption1=!1}}})],1),t("van-field",{attrs:{required:"",maxlength:"10",name:"ab_ex3",label:"救助人姓名",placeholder:"请输入救助人姓名",rules:e.rules.rules2},scopedSlots:e._u([{key:"button",fn:function(){return[t("van-uploader",{attrs:{"before-read":e.beforeRead,"after-read":e.uploadImg("pz"),"before-delete":e.beforeDelete("photo")}},[t("van-button",{attrs:{size:"small",type:"info","native-type":"button"}},[e._v("拍照识别 ")])],1)]},proxy:!0}]),model:{value:e.form.ab_ex3,callback:function(t){e.$set(e.form,"ab_ex3",t)},expression:"form.ab_ex3"}}),t("van-field",{attrs:{name:"ab_ex7",label:"身份证号",placeholder:"请输入身份证号"},model:{value:e.form.ab_ex7,callback:function(t){e.$set(e.form,"ab_ex7",t)},expression:"form.ab_ex7"}}),t("van-field",{attrs:{required:"",name:"ab_ex162_2",center:"",readonly:"",label:"行政区划",placeholder:"请选择所在行政区划",rules:e.rules.rules4},on:{click:function(t){e.show=!0}},scopedSlots:e._u([{key:"button",fn:function(){return[t("van-button",{attrs:{size:"small",type:"info","native-type":"button"},on:{click:function(t){return t.stopPropagation(),e.syqh.apply(null,arguments)}}},[e._v("市外")])]},proxy:!0}]),model:{value:e.ab_ex162_2,callback:function(t){e.ab_ex162_2=t},expression:"ab_ex162_2"}}),t("van-popup",{attrs:{round:"",position:"bottom"},model:{value:e.show,callback:function(t){e.show=t},expression:"show"}},[t("van-cascader",{attrs:{title:"请选择所在行政区划",options:e.options},on:{close:function(t){e.show=!1},finish:e.onFinish}})],1),t("van-field",{attrs:{required:"",maxlength:"50",name:"ab_ex11",label:"家庭住址",placeholder:"家庭住址",rules:e.rules.rules5},model:{value:e.form.ab_ex11,callback:function(t){e.$set(e.form,"ab_ex11",t)},expression:"form.ab_ex11"}}),t("van-field",{attrs:{required:"",name:"ab_ex5",type:"number",label:"家庭人口",placeholder:"家庭人口",rules:e.rules.rules6},model:{value:e.form.ab_ex5,callback:function(t){e.$set(e.form,"ab_ex5",t)},expression:"form.ab_ex5"}}),t("van-field",{attrs:{required:"",name:"ab_ex6",label:"户籍性质",rules:e.rules.rules7},scopedSlots:e._u([{key:"input",fn:function(){return[t("van-radio-group",{attrs:{direction:"horizontal"},model:{value:e.form.ab_ex6,callback:function(t){e.$set(e.form,"ab_ex6",t)},expression:"form.ab_ex6"}},[t("van-radio",{attrs:{name:"农业户口"}},[e._v("农业户口")]),t("van-radio",{attrs:{name:"非农业户口"}},[e._v("非农业户口")])],1)]},proxy:!0}])}),t("van-field",{attrs:{required:"",center:"",type:"number",name:"ab_ex28",label:"联系电话",placeholder:"联系电话",rules:e.rules.rules8},scopedSlots:e._u([{key:"button",fn:function(){return[t("van-button",{attrs:{size:"small",type:"info",disabled:e.hqyzmDis,"native-type":"button"},on:{click:e.hqyzm}},[e._v(e._s(e.hqyzmtext))])]},proxy:!0}]),model:{value:e.form.ab_ex28,callback:function(t){e.$set(e.form,"ab_ex28",t)},expression:"form.ab_ex28"}}),t("van-field",{attrs:{center:"",name:"yanzm",type:"number",label:"验证码",placeholder:"验证码",rules:e.rules.rules12},model:{value:e.form.yanzm,callback:function(t){e.$set(e.form,"yanzm",t)},expression:"form.yanzm"}}),t("van-field",{attrs:{required:"",name:"ab_ex46_1",label:"求助原因",rules:e.rules.rules10},scopedSlots:e._u([{key:"input",fn:function(){return[t("van-checkbox-group",{attrs:{direction:"horizontal"},model:{value:e.ab_ex46_1,callback:function(t){e.ab_ex46_1=t},expression:"ab_ex46_1"}},[t("van-checkbox",{staticClass:"marginstyle",attrs:{name:"疾病",shape:"square"}},[e._v("疾病")]),t("van-checkbox",{staticClass:"marginstyle",attrs:{name:"受灾",shape:"square"}},[e._v("受灾")]),t("van-checkbox",{staticClass:"marginstyle",attrs:{name:"失业",shape:"square"}},[e._v("失业")]),t("van-checkbox",{staticClass:"marginstyle",attrs:{name:"教育",shape:"square"}},[e._v("教育")]),t("van-checkbox",{staticClass:"marginstyle",attrs:{name:"住房",shape:"square"}},[e._v("住房")]),t("van-checkbox",{staticClass:"marginstyle",attrs:{name:"残疾",shape:"square"}},[e._v("残疾")]),t("van-checkbox",{staticClass:"marginstyle",attrs:{name:"缺乏劳动力",shape:"square"}},[e._v("缺乏劳动力")]),t("van-checkbox",{staticClass:"marginstyle",attrs:{name:"其他",shape:"square"}},[e._v("其他")])],1)]},proxy:!0}])}),t("van-field",{attrs:{required:"",maxlength:"100",name:"ab_ex93",rows:"2",type:"textarea","show-word-limit":"",label:"求助描述",placeholder:"请填写100字以内的求助描述",rules:e.rules.rules9},model:{value:e.form.ab_ex93,callback:function(t){e.$set(e.form,"ab_ex93",t)},expression:"form.ab_ex93"}}),t("div",{staticStyle:{margin:"16px 0 16px 0",display:"flex","justify-content":"space-around"}},[t("van-button",{attrs:{block:"","native-type":"button"},on:{click:e.back2}},[e._v("上一步")]),t("van-button",{attrs:{block:"",type:"info","native-type":"button"},on:{click:e.next2}},[e._v("下一步")])],1)],1)],1)]),t("div",{directives:[{name:"show",rawName:"v-show",value:e.page3,expression:"page3"}],staticStyle:{display:"none"},attrs:{id:"page3"}},[t("div",{staticClass:"page3Class"},[t("div",{staticStyle:{height:"40px","line-height":"40px"}},[e._v("身份证照片:")]),t("div",{staticStyle:{"margin-top":"10px"},attrs:{id:"img"}},[t("div",{staticStyle:{position:"relative",width:"100%",float:"left"},attrs:{id:"be"}},[t("div",{staticClass:"cd-bouncy-nav-trigger",staticStyle:{width:"40%",height:"200px","text-align":"center",float:"left","margin-left":"20px"},attrs:{id:"sfzm"}},[t("van-uploader",{attrs:{"before-read":e.beforeRead,"max-count":1,"after-read":e.uploadImg(1),"before-delete":e.beforeDelete("ab_ex10_1")},model:{value:e.fileList,callback:function(t){e.fileList=t},expression:"fileList"}}),t("br"),t("span",[e._v("上传身份证国徽面")])],1),t("div",{staticClass:"cd-bouncy-nav-trigger",staticStyle:{width:"40%",height:"200px","text-align":"center",float:"right","margin-right":"20px"},attrs:{id:"sfzm2"}},[t("van-uploader",{attrs:{"before-read":e.beforeRead,"max-count":1,"after-read":e.uploadImg(2),"before-delete":e.beforeDelete("ab_ex10_2")},model:{value:e.fileList2,callback:function(t){e.fileList2=t},expression:"fileList2"}}),t("br"),t("span",[e._v("上传身份证头像面")])],1)])])]),t("div",{staticClass:"page3Class2"},[t("div",{staticStyle:{height:"40px","line-height":"40px"}},[e._v("证明材料照片:")]),t("div",{staticStyle:{"margin-top":"10px"}},[t("div",{staticStyle:{position:"relative",width:"100%",float:"left"}},[t("van-uploader",{attrs:{"before-read":e.beforeRead,"after-read":e.uploadImg(3),"before-delete":e.beforeDelete("ab_ex16")},model:{value:e.fileList3,callback:function(t){e.fileList3=t},expression:"fileList3"}})],1)])]),t("div",{staticStyle:{"margin-top":"20px",display:"flex","justify-content":"space-around"}},[t("van-button",{attrs:{block:"","native-type":"button"},on:{click:e.back3}},[e._v("上一步")]),t("van-button",{attrs:{block:"",type:"info"},on:{click:e.save}},[e._v("提交")])],1)])]),t("footer")])},i=[function(){var e=this,t=e._self._c;return t("div",{staticStyle:{color:"#333333","padding-left":"20px","padding-right":"20px","margin-top":"110px"}},[t("span",{staticClass:"page1Font1"},[e._v("温馨提示:")]),t("br"),t("br"),t("span",{staticClass:"page1Font2"},[e._v("1.申请救助需提供申请人的身份证件；")]),t("br"),t("br"),t("span",{staticClass:"page1Font2"},[e._v("2.救助核查可能会通过大数据核对申请人家庭财产收入等状况，需要申请人授权确认；")]),t("br"),t("br"),t("span",{staticClass:"page1Font2"},[e._v("3.申请人需对所提供材料和信息的真实性负责，否则有可能影响个人诚信记录。")]),t("br"),t("br")])},function(){var e=this,t=e._self._c;return t("div",{staticClass:"page2Div2"},[t("span",{staticClass:"title2",staticStyle:{color:"#333333"}},[e._v("基本信息")])])}],o=(a("caad"),a("b775")),l=a("365c"),r=a("fa7d"),n={data(){return{dis1:!1,dis2:!1,isShow:!0,isShow2:!1,isShow3:!1,isApply:!0,checked:!1,page1:!0,page2:!1,page3:!1,hqyzmtext:"获取验证码",m:60,rules:{rules1:[{required:!0,message:"请选择申请方式",trigger:"onBlur"}],rules2:[{required:!0,message:"请填写姓名",trigger:"onBlur"}],rules4:[{required:!0,message:"请选择行政区划",trigger:"onBlur"}],rules5:[{required:!0,message:"请填写家庭住址",trigger:"onBlur"}],rules6:[{required:!0,message:"请填写家庭人口",trigger:"onBlur"}],rules7:[{required:!0,message:"请选择户籍性质",trigger:"onBlur"}],rules8:[{required:!0,message:"请填写联系电话",trigger:"onBlur"}],rules9:[{required:!0,message:"请填写求助描述",trigger:"onBlur"}],rules10:[{required:!0,message:"请选择求助原因",trigger:"onBlur"}],rules11:[{required:!0,message:"请选择求助类别",trigger:"onBlur"}],rules12:[{required:!0,message:"请填写验证码",trigger:"onBlur"}]},form:{ab_ex75:"本人",ab_ex3:"",ab_ex7:"",ab_ex1:"",ab_ex2:"",ab_ex4:"",ab_ex11:"",ab_ex13:"",ab_ex15:"申请",ab_ex5:"",ab_ex6:"",ab_ex28:"",ab_ex46:"",ab_ex93:"",ab_ex161:"",ab_ex157:"泰州公众号",ab_ex162:"",yanzm:"",ab_dat14:"",ab_ex10:"",ab_ex10_1:"",ab_ex10_2:"",ab_ex16:""},ab_ex46_1:[],fileList:[],fileList2:[],fileList3:[],ab_ex162:"",ab_ex162_2:"",yzm:"",show:!1,hqyzmDis:!1,options:[],help_list:["群众申请","困境儿童","尊老金","残疾人两项补贴"],showOption1:!1}},created(){Object(o["a"])({method:"post",url:"/social/assistanceWeixin/getCitys",data:{}}).then(e=>{console.log(e,"接口区划");for(let t in e){this.options.push({text:"",value:"",children:[]}),this.options[t].text=e[t].n.split("#")[0],this.options[t].value="#"+e[t].n.split("#")[1];for(let a in e[t].c){this.options[t].children[a]={text:"",value:"",children:[]},this.options[t].children[a].text=e[t].c[a].n.split("#")[0],this.options[t].children[a].value="#"+e[t].c[a].n.split("#")[1];for(let s in e[t].c[a].a)this.options[t].children[a].children[s]={text:"",value:""},this.options[t].children[a].children[s].text=e[t].c[a].a[s].split("#")[0],this.options[t].children[a].children[s].value="#"+e[t].c[a].a[s].split("#")[1]}}console.log(this.options,"区划")}).catch(e=>{console.log(e,"xzqh"),this.$toast.fail("数据请求失败1")})},methods:{optionEvent(e){console.log(e),this.form.ab_ex13=e,this.showOption1=!1},syqh(){this.ab_ex162="泰州市外",this.ab_ex162_2="泰州市外",this.form.ab_ex2="泰州市外",this.form.ab_ex162_2="泰州市外",console.log(this.ab_ex162)},next1(){this.page1=!1,this.page2=!0,this.isShow=!1,this.isShow2=!0},async next2(){if(""==this.form.ab_ex13)return this.$toast.fail("请选择一种求助类别"),fals;this.form.ab_ex3=this.form.ab_ex3.replace(/\s*/g,"");let e=Object(r["i"])(this.form.ab_ex3);if(e)return this.$toast.fail("请输入正确的姓名"),!1;let t=Object(r["e"])(this.form.ab_ex7);if(t)return this.$toast.fail(t),!1;let a=Object(r["b"])(this.form.ab_ex7);if(a<80&&"尊老金"==this.form.ab_ex13)return this.$dialog.alert({message:"申请尊老金需要大于80周岁"}).then(()=>{}),!1;if(a>=18&&"困境儿童"==this.form.ab_ex13)return this.$dialog.alert({message:"申请困境儿童需要小于18周岁"}).then(()=>{}),!1;if(console.log(a),this.form.ab_ex11=this.form.ab_ex11.replace(/\s*/g,""),this.form.ab_ex11=Object(r["g"])(this.form.ab_ex11),this.form.ab_ex5<1||this.form.ab_ex5>20)return this.$toast.fail("家庭人口在1-20之间"),!1;var s=/^[1][3,4,5,7,8,9][0-9]{9}$/;if(!s.test(this.form.ab_ex28))return this.$toast.fail("请填写正确的手机号"),!1;const i=await Object(l["j"])({code:this.form.yanzm,phone:this.form.ab_ex28});if("+OK"!==i.status)return this.$toast(i.msg);this.form.ab_ex93=this.form.ab_ex93.replace(/\s*/g,""),this.form.ab_ex93=Object(r["h"])(this.form.ab_ex93),this.page2=!1,this.page3=!0,this.isShow2=!1,this.isShow3=!0},back2(){this.page1=!0,this.page2=!1,this.isShow=!0,this.isShow2=!1},save(){if(0==this.fileList.length)return void this.$dialog({message:"身份证国徽面不能为空"});if(0==this.fileList2.length)return void this.$dialog({message:"身份证头像面不能为空"});console.log(this.form.ab_ex10_1),console.log(this.form.ab_ex10_2),this.form.ab_ex10=this.form.ab_ex10_1+","+this.form.ab_ex10_2,console.log(this.form.ab_ex10);let e=this.$toast({type:"loading",message:"提交中...",overlay:!0,duration:0});var t=new Date,a=t.getFullYear(),s=t.getMonth()+1,i=t.getDate(),l=(t.getDay(),t.getHours()),n=t.getMinutes(),c=t.getSeconds();document.getElementById("Date");l<10&&(l="0"+l),n<10&&(n="0"+n),c<10&&(c="0"+c);var h=a+"-"+s+"-"+i+" "+l+":"+n+":"+c;if(this.form.ab_dat14=h,this.form.ab_ex46=this.ab_ex46_1.join(),this.form.ab_ex13.includes("尊老金")){this.form.ab_dat11=Object(r["c"])(this.form.ab_ex7),this.form.ab_ex69=Object(r["d"])(this.form.ab_ex7);let t=Object(r["b"])(this.form.ab_ex7);if(this.form.ab_ex70=t,t<80)return this.$dialog({message:"申请尊老金需要大于80周岁"}),void e.clear()}Object(o["a"])({method:"post",url:"/social/assistanceWeixin/applyBasic",data:{data:"["+JSON.stringify(this.form)+"]"}}).then(t=>{e.clear(),this.$dialog.alert({message:"提交成功"}).then(()=>{this.$router.push("/")}),console.log(t)}).catch(t=>{e.clear(),this.$toast.fail("提交失败"),console.log(t)})},qzlbChange(e){console.log(e,1),1==e.length?"尊老金"==e[0]?this.dis1=!0:this.dis2=!0:0==e.length&&(this.dis1=!1,this.dis2=!1)},back3(){this.page3=!1,this.page2=!0,this.isShow3=!1,this.isShow2=!0},onFinish({selectedOptions:e}){this.show=!1,console.log(e.map(e=>e.text));let t=e.map(e=>e.text),a=e.map(e=>e.text+e.value);this.form.ab_ex1=t[2],this.form.ab_ex2=t[1],this.form.ab_ex161=t[0],this.ab_ex162_2=t.join("/"),this.form.ab_ex162=a.join(","),""==this.form.ab_ex11&&(this.form.ab_ex11=t[0]+t[1]+t[2])},hqyzm(){var e=/^[1][3,4,5,7,8,9][0-9]{9}$/;if(!e.test(this.form.ab_ex28))return this.$toast.fail("请填写正确的手机号"),!1;console.log("-----------------"),Object(o["a"])({method:"POST",url:"/social/assistanceWeixin/sendSMS2",params:{mobiles:this.form.ab_ex28}}).then(e=>{"+OK"===e.status?this.$toast.success(e.msg):this.$toast.fail(e.msg)}).catch(e=>{this.$toast.fail("验证码发送失败"),console.log(e)}),console.log("-----------------"),this.hqyzmtext=this.m+"s",this.hqyzmDis=!0;let t=setInterval(()=>{this.m--,this.hqyzmtext=this.m+"s",0==this.m&&(this.hqyzmtext="获取验证码",this.m=60,this.hqyzmDis=!1,clearInterval(t))},1e3)},beforeRead(e){return console.log(e,"file"),"image/heic"!=e.type&&""!=e.type||(this.$toast.fail("照片格式不正确"),!1)},imgRequest(e,t,a){console.log(222),console.log(e,t,a),Object(o["a"])({method:"post",url:"/social/weixinMinios/fileUpload",data:e}).then(e=>{t.status="done",t.message="上传完成",console.log(e),1==a||2==a||"pz"==a?(Object(o["a"])({method:"post",url:"/social/assistanceWeixin/idOrc",data:{img:t.content}}).then(e=>{if(console.log(e,a),2==a||"pz"==a)if("ok"==e[0].status)if("0"!=e[0].data.words_result_num)try{let t=e[0].data.words_result;console.log(t),"pz"==a&&(this.form.ab_ex7=t["公民身份号码"].words,this.form.ab_ex3=t["姓名"].words,this.form.ab_ex4=t["住址"].words)}catch(t){this.fileList2.pop(),this.$toast.fail("身份证对比信息不符,请上传正确的身份证1")}else this.fileList2.pop(),this.$toast.fail("身份证对比信息不符,请上传正确的身份证2");else this.fileList2.pop(),this.$toast.fail("身份证对比信息不符,请上传正确的身份证3");else if(1==a)if("ok"==e[0].status)if(console.log(e[0].data,"data========================"),"ok"==e[0].status)try{let t=e[0].data.words_result,a=t["签发机关"].words,s=t["签发日期"].words,i=t["失效日期"].words;a&&s&&i||(this.fileList.pop(),this.$toast.fail("身份证国徽面照片不符,请上传正确的身份证国徽面1"))}catch(t){this.fileList.pop(),this.$toast.fail("身份证国徽面照片不符,请上传正确的身份证国徽面2")}else this.fileList.pop(),this.$toast.fail("身份证国徽面照片不符,请上传正确的身份证国徽面3");else this.fileList.pop(),this.$toast.fail("身份证国徽面照片不符,请上传正确的身份证国徽面4")}).catch(e=>{console.log(e),this.$toast.fail("拍照识别请求失败")}),1==a?this.form.ab_ex10_1=e[0].filename:2==a&&(this.form.ab_ex10_2=e[0].filename)):3==a&&(console.log("其他证明材料"),this.form.ab_ex16?this.form.ab_ex16=this.form.ab_ex16.concat(",",e[0].filename):this.form.ab_ex16=this.form.ab_ex16.concat(e[0].filename),console.log(this.form.ab_ex16))}).catch(e=>{t.status="failed",t.message="上传失败",1==a?this.fileList.pop():2==a?this.fileList2.pop():3==a&&this.fileList3.pop(),this.$toast.fail("上传失败"),console.log(e)})},uploadImg(e){return t=>{console.log(t),console.log(e),t.status="uploading",t.message="上传中...";new r["a"](t,e,this.imgRequest)}},beforeDelete(e){return(t,a)=>{let s=this.form[e].split(",");return s.splice(a.index,1),this.form[e]=s.join(","),console.log(this.form[e]),console.log(e),console.log(t),console.log(a),!0}}}},c=n,h=(a("05e4"),a("2877")),d=Object(h["a"])(c,s,i,!1,null,"d51b4dce",null);t["default"]=d.exports},b843:function(e,t,a){}}]);
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5bce13a9"],{"5aba":function(e,t,a){},cbfa:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e._self._c;return t("div",{staticClass:"helpApply"},[t("header",[t("div",{staticClass:"headerHead"},[t("div",[t("div",{class:{headerF:e.isShow2}},[e._v(e._s(this.title)+"申请")])])])]),t("main",[t("div",{directives:[{name:"show",rawName:"v-show",value:e.page1,expression:"page1"}],staticStyle:{display:"block","padding-top":"20px"},attrs:{id:"page1"}},[t("div",{staticClass:"page1Div1"},[e._m(0),t("van-form",{ref:"apply",staticStyle:{"margin-top":"20px"}},[t("van-field",{attrs:{required:"",name:"aa_ex6",maxlength:"10",label:"姓名",placeholder:"姓名",rules:e.rules.rules2},scopedSlots:e._u([{key:"button",fn:function(){return[t("van-uploader",{attrs:{"before-read":e.beforeRead,"after-read":e.uploadImg("IDCard"),"before-delete":e.beforeDelete("photo")}},[t("van-button",{attrs:{size:"small",type:"info","native-type":"button"}},[e._v("拍照识别 ")])],1)]},proxy:!0}]),model:{value:e.form2.aa_ex6,callback:function(t){e.$set(e.form2,"aa_ex6",t)},expression:"form2.aa_ex6"}}),t("van-field",{attrs:{required:"",name:"aa_ex5",label:"身份证号",placeholder:"身份证号",rules:e.rules.rules3},on:{input:function(t){return e.changeCard1(t,"aa_ex7")}},model:{value:e.form2.aa_ex5,callback:function(t){e.$set(e.form2,"aa_ex5",t)},expression:"form2.aa_ex5"}}),t("van-field",{attrs:{name:"aa_ex7",label:"性别",placeholder:"性别"},model:{value:e.form2.aa_ex7,callback:function(t){e.$set(e.form2,"aa_ex7",t)},expression:"form2.aa_ex7"}}),t("van-field",{attrs:{required:"",name:"aa_ex1",readonly:"",label:"申请类型"},model:{value:e.form2.aa_ex1,callback:function(t){e.$set(e.form2,"aa_ex1",t)},expression:"form2.aa_ex1"}}),t("van-field",{attrs:{required:"",name:"ab_ex162_2",center:"",readonly:"",label:"行政区划",placeholder:"请选择所在行政区划",rules:e.rules.rules4},on:{click:function(t){e.show=!0}},model:{value:e.ab_ex162_2,callback:function(t){e.ab_ex162_2=t},expression:"ab_ex162_2"}}),t("van-popup",{attrs:{round:"",position:"bottom"},model:{value:e.show,callback:function(t){e.show=t},expression:"show"}},[t("van-cascader",{attrs:{title:"请选择所在行政区划",options:e.options},on:{click:function(t){e.show=!1},finish:e.onFinish}})],1),t("van-field",{attrs:{required:"",name:"aa_ex8",label:"家庭住址",type:"textarea",rows:"1",placeholder:"家庭住址",rules:e.rules.rules5,autosize:""},model:{value:e.form2.aa_ex8,callback:function(t){e.$set(e.form2,"aa_ex8",t)},expression:"form2.aa_ex8"}}),t("van-field",{attrs:{required:"",center:"",type:"number",name:"aa_ex9",label:"联系电话",placeholder:"联系电话",rules:e.rules.rules8},scopedSlots:e._u([{key:"button",fn:function(){return[t("van-button",{attrs:{size:"small",type:"info",disabled:e.hqyzmDis,"native-type":"button"},on:{click:e.hqyzm}},[e._v(e._s(e.hqyzmtext))])]},proxy:!0}]),model:{value:e.form2.aa_ex9,callback:function(t){e.$set(e.form2,"aa_ex9",t)},expression:"form2.aa_ex9"}}),t("van-field",{attrs:{required:"",center:"",name:"yanzm",type:"number",label:"验证码",placeholder:"验证码",rules:[{required:!0,message:"请填写验证码"}]},model:{value:e.form2.yanzm,callback:function(t){e.$set(e.form2,"yanzm",t)},expression:"form2.yanzm"}}),t("div",{staticStyle:{margin:"16px 0 16px 0",display:"flex","justify-content":"space-around"}},[t("van-button",{attrs:{block:"",type:"info"},on:{click:e.save}},[e._v("提交")])],1)],1)],1)])]),t("footer")])},o=[function(){var e=this,t=e._self._c;return t("div",{staticClass:"page1Div2"},[t("span",{staticStyle:{"background-color":"#333333",display:"inline-block",width:"5px",height:"10px"}}),t("span",{staticStyle:{color:"#333333"}},[e._v("基本信息")])])}],i=a("b775"),l=a("fa7d"),r={data(){return{isShow:!0,isShow2:!1,checked:!1,page1:!0,page2:!1,hqyzmtext:"获取验证码",m:60,rules:{rules1:[{required:!0,message:"请选择申请方式",trigger:"onBlur"}],rules2:[{required:!0,message:"请填写姓名",trigger:"onBlur"}],rules3:[{required:!0,message:"请填写身份证号",trigger:"onBlur"}],rules4:[{required:!0,message:"请选择行政区划",trigger:"onBlur"}],rules5:[{required:!0,message:"请填写家庭住址",trigger:"onBlur"}],rules8:[{required:!0,message:"请填写联系电话",trigger:"onBlur"}]},form2:{aa_id:"",aa_ex1:this.$route.query.type,aa_ex2:"",aa_ex3:"",aa_ex4:"",aa_ex5:"",aa_ex6:"",aa_ex7:"",aa_ex8:"",aa_ex9:"",yanzm:""},fileList:[],fileList2:[],fileList3:[],fileList4:[],ab_ex162:"",ab_ex162_2:"",yzm:"",show:!1,hqyzmDis:!1,options:[],title:this.$route.query.type}},created(){Object(i["a"])({method:"post",url:"/social/assistanceWeixin/getCitys",data:{}}).then(e=>{for(let t in e){this.options.push({text:"",value:"",children:[]}),this.options[t].text=e[t].n.split("#")[0],this.options[t].value="#"+e[t].n.split("#")[1];for(let a in e[t].c){this.options[t].children[a]={text:"",value:"",children:[]},this.options[t].children[a].text=e[t].c[a].n.split("#")[0],this.options[t].children[a].value="#"+e[t].c[a].n.split("#")[1];for(let s in e[t].c[a].a)this.options[t].children[a].children[s]={text:"",value:""},this.options[t].children[a].children[s].text=e[t].c[a].a[s].split("#")[0],this.options[t].children[a].children[s].value="#"+e[t].c[a].a[s].split("#")[1]}}}).catch(e=>{console.log(e,"xzqh"),this.$toast.fail("数据请求失败1")}),console.log(this.form2.aa_ex1)},methods:{changeCard1(e,t){""==Object(l["e"])(e)&&this.$set(this.form2,t,Object(l["d"])(e))},next1(){this.form2.aa_ex6=this.form2.aa_ex6.replace(/\s*/g,"");let e=Object(l["i"])(this.form2.aa_ex6);if(e)return this.$toast.fail("请输入正确的姓名"),!1;let t=Object(l["e"])(this.form2.aa_ex5);if(t)return this.$toast.fail(t),!1;console.log(this.form2),document.getElementsByClassName("helpApply")[0].scrollTop=0,this.page1=!1,this.page2=!0,this.isShow=!1,this.isShow2=!0},back2(){this.page1=!0,this.page2=!1,this.isShow=!0,this.isShow2=!1},save(){this.form2.aa_ex6=this.form2.aa_ex6.replace(/\s*/g,"");let e=Object(l["i"])(this.form2.aa_ex6);if(e)return this.$toast.fail("请输入正确的姓名"),!1;let t=Object(l["e"])(this.form2.aa_ex5);if(t)return this.$toast.fail(t),!1;var a=/^[1][3,4,5,7,8,9][0-9]{9}$/;if(!a.test(this.form2.aa_ex9))return this.$toast.fail("请填写正确的手机号"),!1;if(!this.yzm||this.yzm!=this.form2.yanzm)return"0"!=this.form2.yanzm&&(this.$toast.fail("验证码错误"),!1);console.log("执行到");let s=this.$toast({type:"loading",message:"提交中...",overlay:!0,duration:0});Object(i["a"])({method:"post",url:"/social/assistanceWeixin/saveApply",data:{data:JSON.stringify(this.form2)}}).then(e=>{s.clear(),this.$dialog.alert({message:"提交成功"}).then(()=>{this.$router.push("/apply")}),console.log(e)}).catch(e=>{s.clear(),this.$toast.fail("提交失败"),console.log(e)})},onFinish({selectedOptions:e}){this.show=!1,console.log(e.map(e=>e.text));let t=e.map(e=>e.text),a=e.map(e=>e.text+e.value);this.form2.aa_ex3=t[2],this.form2.aa_ex4=t[1],this.form2.aa_ex2=t[0],this.ab_ex162_2=t.join("/"),this.form2.aa_ex2=a.join(","),""==this.form2.aa_ex8&&(this.form2.aa_ex8=t[0]+t[1]+t[2])},hqyzm(){var e=/^[1][3,4,5,7,8,9][0-9]{9}$/;if(!e.test(this.form2.aa_ex9))return this.$toast.fail("请填写正确的手机号"),!1;console.log("-----------------"),Object(i["a"])({method:"get",url:"/social/assistanceWeixin/sendSMS",params:{mobiles:this.form2.aa_ex9}}).then(e=>{"+OK"==e.status?(this.$toast.success("发送成功"),this.yzm=e.data.securityCode):this.$toast.fail(e.msg)}).catch(e=>{this.$toast.fail("验证码发送失败"),console.log(e)}),console.log("-----------------"),this.hqyzmtext=this.m+"s",this.hqyzmDis=!0;let t=setInterval(()=>{this.m--,this.hqyzmtext=this.m+"s",0==this.m&&(this.hqyzmtext="获取验证码",this.m=60,this.hqyzmDis=!1,clearInterval(t))},1e3)},beforeRead(e){return"image/heic"!=e.type&&""!=e.type||(this.$toast.fail("照片格式不正确"),!1)},imgRequest(e,t,a,s){console.log(t,"照片文件"),Object(i["a"])({method:"post",url:"/social/weixinMinios/fileUpload",data:e}).then(e=>{t.status="done",t.message="上传完成",console.log(e),-1!=a.indexOf("IDCard")&&Object(i["a"])({method:"post",url:"/social/assistanceWeixin/idOrc",data:{img:t.content}}).then(e=>{if(console.log(e,"res"),"ok"==e[0].status)try{let t=e[0].data.words_result;console.log(t),"IDCard"==a&&(this.form2.aa_ex6=t["姓名"].words,t["公民身份号码"].words=t["公民身份号码"].words.replace(/\s+/g,""),this.form2.aa_ex5=t["公民身份号码"].words,this.form2.aa_ex8=t["住址"].words,this.form2.aa_ex7=t["性别"].words)}catch(t){console.log(t),this.fileList2.pop(),this.$toast.fail("身份证对比信息不符,请上传正确的身份证")}else this.fileList2.pop(),this.$toast.fail("身份证对比信息不符,请上传正确的身份证")}).catch(e=>{console.log(e)})}).catch(e=>{t.status="failed",t.message="上传失败",this.$toast.fail("上传失败"),console.log(e)})},uploadImg(e,t){return a=>{a.status="uploading",a.message="上传中...",console.log(a.file);new l["a"](a,e,this.imgRequest,t)}},beforeDelete(e){return(t,a)=>{let s=this.form[e].split(",");return s.splice(a.index,1),this.form[e]=s.join(","),console.log(this.form[e]),console.log(e),console.log(t),console.log(a),!0}}}},n=r,c=(a("ef3c"),a("2877")),h=Object(c["a"])(n,s,o,!1,null,"084b2b68",null);t["default"]=h.exports},ef3c:function(e,t,a){"use strict";a("5aba")}}]);
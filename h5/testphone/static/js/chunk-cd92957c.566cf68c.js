(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-cd92957c"],{"396c":function(e,a,t){"use strict";t.r(a);var i=function(){var e=this,a=e._self._c;return a("div",{staticClass:"dbjz"},[a("header",[a("div",{staticClass:"headerHead"},[a("div",[a("div",{class:{headerF:e.isShow}},[e._v("基础信息")])]),a("div",{staticClass:"headerRectangle"}),a("div",[a("div",{class:{headerF:e.isShow5}},[e._v("授权书")])]),a("div",{staticClass:"headerRectangle"}),a("div",[a("div",{class:{headerF:e.isShow6}},[e._v("材料上传")])])])]),a("main",[a("div",{directives:[{name:"show",rawName:"v-show",value:e.page1,expression:"page1"}],staticClass:"page1Div1",attrs:{id:"page1"}},[e._m(0),a("van-form",{ref:"rule1",on:{submit:e.next1}},[a("van-field",{attrs:{name:"ab_ex75",label:"申请方式",required:"",rules:[{required:!0,message:"请选择申请方式"}]},scopedSlots:e._u([{key:"input",fn:function(){return[a("van-radio-group",{attrs:{direction:"horizontal"},model:{value:e.form.ab_ex75,callback:function(a){e.$set(e.form,"ab_ex75",a)},expression:"form.ab_ex75"}},[a("van-radio",{attrs:{name:"委托代理"}},[e._v("代申请")]),a("van-radio",{attrs:{name:"本人"}},[e._v("本人")])],1)]},proxy:!0}])}),a("van-field",{attrs:{required:"",name:"ab_ex3",maxlength:"10",label:"姓名",placeholder:"姓名",rules:[{required:!0,message:"请填写姓名"}]},model:{value:e.form.ab_ex3,callback:function(a){e.$set(e.form,"ab_ex3",a)},expression:"form.ab_ex3"}}),a("van-field",{attrs:{required:"",name:"ab_ex7",label:"身份证号",placeholder:"身份证号",rules:[{required:!0,message:"请填写身份证号"}]},on:{input:e.changeSfz},model:{value:e.form.ab_ex7,callback:function(a){e.$set(e.form,"ab_ex7",a)},expression:"form.ab_ex7"}}),a("van-field",{attrs:{name:"ab_dat11",disabled:"",label:"出生年月",placeholder:"出生年月"},model:{value:e.form.ab_dat11,callback:function(a){e.$set(e.form,"ab_dat11",a)},expression:"form.ab_dat11"}}),a("van-field",{attrs:{name:"ab_ex70",disabled:"",label:"年龄",placeholder:"年龄"},model:{value:e.form.ab_ex70,callback:function(a){e.$set(e.form,"ab_ex70",a)},expression:"form.ab_ex70"}}),a("van-field",{attrs:{required:"",center:"",readonly:"",label:"行政区划",placeholder:"请选择所在行政区划",rules:[{required:!0,message:"请选择行政区划"}]},on:{click:function(a){e.showxzqh=!0}},model:{value:e.form.ab_ex162_2,callback:function(a){e.$set(e.form,"ab_ex162_2",a)},expression:"form.ab_ex162_2"}}),a("van-popup",{attrs:{round:"",position:"bottom"},model:{value:e.showxzqh,callback:function(a){e.showxzqh=a},expression:"showxzqh"}},[a("van-cascader",{attrs:{title:"请选择所在行政区划",options:e.options},on:{close:function(a){e.showxzqh=!1},finish:e.onFinish},model:{value:e.form.ab_ex162_3,callback:function(a){e.$set(e.form,"ab_ex162_3",a)},expression:"form.ab_ex162_3"}})],1),a("van-field",{attrs:{center:"",name:"ab_ex28",maxlength:"11",type:"number",required:"",label:"联系电话",placeholder:"联系电话",rules:[{required:!0,message:"请填写联系电话"}]},model:{value:e.form.ab_ex28,callback:function(a){e.$set(e.form,"ab_ex28",a)},expression:"form.ab_ex28"}}),a("van-field",{attrs:{name:"ab_ex4",required:"",label:"户籍地址",placeholder:"户籍地址",rules:[{required:!0,message:"请填写户籍地址"}]},model:{value:e.form.ab_ex4,callback:function(a){e.$set(e.form,"ab_ex4",a)},expression:"form.ab_ex4"}}),a("van-field",{attrs:{name:"ab_ex11",maxlength:"50",label:"家庭住址",required:"",placeholder:"家庭住址",rules:[{required:!0,message:"请填写家庭住址"}]},model:{value:e.form.ab_ex11,callback:function(a){e.$set(e.form,"ab_ex11",a)},expression:"form.ab_ex11"}}),a("van-field",{attrs:{name:"ab_ex29",label:"代理人姓名",placeholder:"代理人姓名"},model:{value:e.form.ab_ex29,callback:function(a){e.$set(e.form,"ab_ex29",a)},expression:"form.ab_ex29"}}),a("van-field",{attrs:{name:"ab_ex31",label:"代理人身份证号",placeholder:"代理人身份证号"},model:{value:e.form.ab_ex31,callback:function(a){e.$set(e.form,"ab_ex31",a)},expression:"form.ab_ex31"}}),a("van-field",{attrs:{name:"ab_ex30",label:"与申请人关系",placeholder:"与申请人关系"},model:{value:e.form.ab_ex30,callback:function(a){e.$set(e.form,"ab_ex30",a)},expression:"form.ab_ex30"}}),a("van-field",{attrs:{center:"",name:"ab_ex32",type:"number",label:"代理人联系电话",placeholder:"代理人联系电话"},model:{value:e.form.ab_ex32,callback:function(a){e.$set(e.form,"ab_ex32",a)},expression:"form.ab_ex32"}}),a("van-field",{attrs:{name:"ab_ex92",label:"是否属于村干部或近亲属",required:"",rules:[{required:!0,message:"请选择是否属于村干部或近亲属"}]},scopedSlots:e._u([{key:"input",fn:function(){return[a("van-radio-group",{attrs:{direction:"horizontal"},model:{value:e.form.ab_ex92,callback:function(a){e.$set(e.form,"ab_ex92",a)},expression:"form.ab_ex92"}},[a("van-radio",{attrs:{name:"是"}},[e._v("是")]),a("van-radio",{attrs:{name:"否"}},[e._v("否")])],1)]},proxy:!0}])}),a("div",{staticClass:"page1Div2"},[e._v("     "),a("span",{staticClass:"page1Div2Font"},[e._v("其他信息")])]),a("van-field",{attrs:{name:"ab_ex42",maxlength:"15",label:"开户银行",placeholder:"开户银行",required:"",rules:[{required:!0,message:"请填写开户银行"}]},model:{value:e.form.ab_ex42,callback:function(a){e.$set(e.form,"ab_ex42",a)},expression:"form.ab_ex42"}}),a("van-field",{attrs:{center:"",name:"ab_ex8",maxlength:"15",label:"开户人",placeholder:"开户人",required:"",rules:[{required:!0,message:"请填写开户人"}]},model:{value:e.form.ab_ex8,callback:function(a){e.$set(e.form,"ab_ex8",a)},expression:"form.ab_ex8"}}),a("van-field",{attrs:{center:"",name:"ab_ex43",maxlength:"22",label:"银行账号",placeholder:"银行账号",required:"",rules:[{required:!0,message:"请填写银行账号"}],onkeyup:"value=value.replace(/[^\\dx]/gi,'')"},model:{value:e.form.ab_ex43,callback:function(a){e.$set(e.form,"ab_ex43",a)},expression:"form.ab_ex43"}}),a("van-field",{attrs:{disabled:"",center:"",name:"ab_ex5",type:"number",label:"尊老金发放标准",placeholder:"尊老金发放标准"},model:{value:e.form.ab_ex5,callback:function(a){e.$set(e.form,"ab_ex5",a)},expression:"form.ab_ex5"}}),a("van-field",{attrs:{name:"ab_ex33",label:"人员是否健在"},scopedSlots:e._u([{key:"input",fn:function(){return[a("van-radio-group",{attrs:{direction:"horizontal"},model:{value:e.form.ab_ex33,callback:function(a){e.$set(e.form,"ab_ex33",a)},expression:"form.ab_ex33"}},[a("van-radio",{attrs:{name:"是"}},[e._v("是")]),a("van-radio",{attrs:{name:"否"}},[e._v("否")])],1)]},proxy:!0}])}),a("van-field",{attrs:{center:"",name:"ab_ex34",label:"备注",placeholder:"备注"},model:{value:e.form.ab_ex34,callback:function(a){e.$set(e.form,"ab_ex34",a)},expression:"form.ab_ex34"}}),a("div",{staticClass:"page1Div2"},[e._v("     "),a("span",{staticClass:"page1Div2Font"},[e._v("自定义预警")])]),e._l(e.warning,(function(t,i){return a("van-cell-group",{key:i},[a("van-field",{attrs:{name:"message",maxlength:"50",rows:"1",autosize:"",label:"预警内容",type:"textarea",placeholder:"请输入预警内容"},model:{value:t.aw_ex1,callback:function(a){e.$set(t,"aw_ex1",a)},expression:"item.aw_ex1"}}),a("van-field",{attrs:{readonly:"",clickable:"",name:"time",value:t.aw_dat1,label:"预警时间",placeholder:"点击选择预警时间"},on:{click:function(e){t.showPicker=!0}}}),a("van-popup",{attrs:{position:"bottom"},model:{value:t.showPicker,callback:function(a){e.$set(t,"showPicker",a)},expression:"item.showPicker"}},[a("van-datetime-picker",{attrs:{type:"date"},on:{confirm:function(a){return e.onConfirm(a,i)},cancel:function(e){t.showPicker=!1}},model:{value:t.currentDate,callback:function(a){e.$set(t,"currentDate",a)},expression:"item.currentDate"}})],1)],1)})),a("div",{staticStyle:{width:"100%",position:"fixed",bottom:"0px","text-align":"center",display:"flex","justify-content":"space-around"}},[a("van-button",{attrs:{block:"",type:"info","native-type":"button"},on:{click:e.next1}},[e._v("下一步")])],1)],2)],1),a("div",{directives:[{name:"show",rawName:"v-show",value:e.page5,expression:"page5"}],staticStyle:{"margin-bottom":"100px",display:"block","padding-top":"20px"},attrs:{id:"page5"}},[a("div",{staticClass:"page5Div"},[a("div",{staticStyle:{"margin-bottom":"10px"}},[e._v("授权书编号")]),a("van-field",{attrs:{type:"digit",size:"large"},model:{value:e.form.ab_ex85,callback:function(a){e.$set(e.form,"ab_ex85",a)},expression:"form.ab_ex85"}}),a("div",{staticStyle:{"margin-top":"50px"}},[e._v("请务必将授权书编号准确无误的誊抄到纸质授权书上！")])],1),a("div",{staticStyle:{width:"100%",position:"fixed",bottom:"0px","text-align":"center",display:"flex","justify-content":"space-around"}},[a("van-button",{attrs:{block:"","native-type":"button"},on:{click:e.back5}},[e._v("上一步")]),a("van-button",{attrs:{block:"",type:"info","native-type":"button"},on:{click:e.next5}},[e._v("下一步")])],1)]),a("div",{directives:[{name:"show",rawName:"v-show",value:e.page6,expression:"page6"}],staticStyle:{"margin-bottom":"100px"},attrs:{id:"page6"}},[a("div",{staticClass:"page6Div1"},[e._m(1),a("div",{staticClass:"page6Div3"},[a("div",{staticStyle:{height:"40px","line-height":"40px"}},[e._v("身份证照片:")]),a("div",{staticStyle:{"margin-top":"10px"}},[a("div",{staticStyle:{position:"relative",width:"100%",float:"left"}},[a("div",{staticClass:"cd-bouncy-nav-trigger",staticStyle:{width:"40%",height:"200px","text-align":"center",float:"left","margin-left":"20px"}},[a("van-uploader",{attrs:{"before-read":e.beforeRead,"max-count":1,"after-read":e.uploadImg(1),"before-delete":e.beforeDelete("ab_ex10_1")},model:{value:e.fileList,callback:function(a){e.fileList=a},expression:"fileList"}}),a("br"),a("span",[e._v("上传身份证正面")])],1),a("div",{staticClass:"cd-bouncy-nav-trigger",staticStyle:{width:"40%",height:"200px","text-align":"center",float:"right","margin-right":"20px"}},[a("van-uploader",{attrs:{"before-read":e.beforeRead,"max-count":1,"after-read":e.uploadImg(2),"before-delete":e.beforeDelete("ab_ex10_2")},model:{value:e.fileList2,callback:function(a){e.fileList2=a},expression:"fileList2"}}),a("br"),a("span",[e._v("上传身份证反面")])],1)])])])]),a("div",{staticClass:"page6Div4"},[a("div",{staticClass:"page6Div3"},[a("div",{staticStyle:{height:"40px","line-height":"40px"}},[e._v("授权书及民主评议:")]),a("div",{staticStyle:{"margin-top":"10px"}},[a("div",{staticStyle:{position:"relative",width:"100%",float:"left"}},[a("div",{staticClass:"cd-bouncy-nav-trigger",staticStyle:{width:"40%",height:"200px","text-align":"center",float:"left","margin-left":"20px"}},[a("van-uploader",{attrs:{"before-read":e.beforeRead,"max-count":1,"after-read":e.uploadImg(3),"before-delete":e.beforeDelete("ab_ex73")},model:{value:e.fileList3,callback:function(a){e.fileList3=a},expression:"fileList3"}}),a("br"),a("span",[e._v("上传授权书照片")])],1),a("div",{staticClass:"cd-bouncy-nav-trigger",staticStyle:{width:"40%",height:"200px","text-align":"center",float:"right","margin-right":"20px"},attrs:{id:"sfzm2"}},[a("van-uploader",{attrs:{"before-read":e.beforeRead,"max-count":1,"after-read":e.uploadImg(5),"before-delete":e.beforeDelete("ab_ex97")},model:{value:e.fileList4,callback:function(a){e.fileList4=a},expression:"fileList4"}}),a("br"),a("span",[e._v("民主评议")])],1)])])])]),a("div",{staticClass:"page6Div5"},[a("div",{staticClass:"page6Div6"},[e._v("其他证明材料:")]),a("div",{staticStyle:{"margin-top":"10px"}},[a("div",{staticStyle:{position:"relative",width:"91%",float:"left"},attrs:{id:"zmcl"}},[a("van-uploader",{attrs:{"before-read":e.beforeRead,"after-read":e.uploadImg(4),"before-delete":e.beforeDelete("ab_ex16")},model:{value:e.fileList5,callback:function(a){e.fileList5=a},expression:"fileList5"}})],1)])]),a("div",{staticClass:"page6Div7"},[e._m(2),a("van-form",{staticStyle:{"margin-top":"20px"}},[a("van-field",{attrs:{required:"",readonly:"",clickable:"",name:"ab_ex79",value:e.form.ab_ex79,label:"情况是否属实",placeholder:"点击选择情况是否属实"},on:{click:function(a){e.showPicker61=!0}}}),a("van-popup",{attrs:{position:"bottom"},model:{value:e.showPicker61,callback:function(a){e.showPicker61=a},expression:"showPicker61"}},[a("van-picker",{attrs:{"show-toolbar":"",columns:e.columns16},on:{confirm:e.onConfirm61,cancel:function(a){e.showPicker61=!1}}})],1),a("van-field",{attrs:{disabled:"",value:"调查人以' , '分隔(如 张三,李四 )"}}),a("van-field",{attrs:{name:"ab_ex78",maxlength:"30",label:"调查人",placeholder:"调查人",required:"",rules:[{required:!0,message:"请填写调查人"}]},model:{value:e.form.ab_ex78,callback:function(a){e.$set(e.form,"ab_ex78",a)},expression:"form.ab_ex78"}}),a("van-field",{attrs:{name:"ab_ex80",maxlength:"50",label:"备注",placeholder:"备注",required:"",rules:[{required:!0,message:"请填写备注"}]},model:{value:e.form.ab_ex80,callback:function(a){e.$set(e.form,"ab_ex80",a)},expression:"form.ab_ex80"}})],1)],1),a("div",{staticStyle:{width:"100%",position:"fixed",bottom:"0px","text-align":"center",display:"flex","justify-content":"space-around"}},[a("van-button",{attrs:{block:""},on:{click:e.back6}},[e._v("上一步")]),a("van-button",{attrs:{block:"",type:"info"},on:{click:e.save}},[e._v("提交")])],1)])])])},s=[function(){var e=this,a=e._self._c;return a("div",{staticClass:"page1Div2"},[e._v("     "),a("span",{staticClass:"page1Div2Font"},[e._v("基本信息")])])},function(){var e=this,a=e._self._c;return a("div",{staticClass:"page6Div2"},[a("span",{staticStyle:{"background-color":"#00AAFF",display:"inline-block",width:"5px",height:"10px"}}),a("span",{staticStyle:{color:"#00AAFF"}},[e._v("照片")])])},function(){var e=this,a=e._self._c;return a("div",{staticClass:"page6Div2"},[a("span",{staticStyle:{"background-color":"#00AAFF",display:"inline-block",width:"5px",height:"10px"}}),a("span",{staticStyle:{color:"#00AAFF"}},[e._v("核查结果(不属实将自动生成诚信记录)")])])}],o=t("b775"),r=t("fa7d"),l={data(){return{typelx:this.$route.query.type,isShow:!0,isShow5:!1,isShow6:!1,page1:!0,page5:!1,page6:!1,fileList:[],fileList2:[],fileList3:[],fileList4:[],fileList5:[],ab_ex85_2:"",showPicker61:!1,form:{ab_ex75:"",ab_ex3:"",ab_ex7:"",ab_ex162:"",ab_ex162_2:"",ab_ex162_3:"",ab_ex4:"",ab_ex11:"",ab_ex28:"",ab_ex92:"",ab_ex42:"",ab_ex8:"",ab_ex43:"",ab_ex13:"",ab_ex78:"",ab_ex85:"",ab_ex79:"",ab_ex80:""},warning:[{aw_ex1:"",aw_dat1:"",currentDate:new Date,showPicker:!1},{aw_ex1:"",aw_dat1:"",currentDate:new Date,showPicker:!1},{aw_ex1:"",aw_dat1:"",currentDate:new Date,showPicker:!1},{aw_ex1:"",aw_dat1:"",currentDate:new Date,showPicker:!1},{aw_ex1:"",aw_dat1:"",currentDate:new Date,showPicker:!1}],showPicker:!1,showPicker2:!1,showPicker3:!1,showPicker4:!1,showPicker5:!1,showxzqh:!1,common:[],columns:["户主本人","配偶","子女","父母","兄弟姐妹","孙子女","其他"],columns16:["属实","不属实","转其他救助"],options:r["j"]}},created(){this.getBasic()},methods:{next1(){this.getBasicIdNum(1),this.form.ab_ex3=this.form.ab_ex3.replace(/\s*/g,"");let e=Object(r["i"])(this.form.ab_ex3);if(e)return this.$toast.fail("请输入正确的姓名"),!1;let a=Object(r["e"])(this.form.ab_ex7);if(a)return this.$toast.fail(a),!1;let t=/^[1][3,4,5,7,8,9][0-9]{9}$/;return t.test(this.form.ab_ex28)?(this.form.ab_ex11=this.form.ab_ex11.replace(/\s*/g,""),this.form.ab_ex11=Object(r["g"])(this.form.ab_ex11),parseInt(this.form.ab_ex70)>200?(this.$toast.fail("年龄不能超过200"),!1):(this.form.ab_ex42=this.form.ab_ex42.replace(/\s*/g,""),this.form.ab_ex42=Object(r["g"])(this.form.ab_ex42),this.form.ab_ex8=this.form.ab_ex8.replace(/\s*/g,""),this.form.ab_ex8=Object(r["g"])(this.form.ab_ex8),this.warning.forEach((e,a)=>{e.aw_ex1&&e.aw_dat1&&(e.aw_ex1=e.aw_ex1.replace(/\s*/g,""),e.aw_ex1=Object(r["h"])(e.aw_ex1))}),void this.$refs.rule1.validate().then(()=>{this.page1=!1,this.page5=!0,this.isShow=!1,this.isShow5=!0,document.getElementsByClassName("dbjz")[0].scrollTop=0}).catch(e=>{this.$toast.fail(e[0].message)}))):(this.$toast.fail("请填写正确的联系电话"),!1)},next5(){this.page5=!1,this.page6=!0,this.isShow5=!1,this.isShow6=!0,document.getElementsByClassName("dbjz")[0].scrollTop=0},back5(){this.page5=!1,this.page1=!0,this.isShow5=!1,this.isShow=!0,document.getElementsByClassName("dbjz")[0].scrollTop=0},back6(){this.page6=!1,this.page5=!0,this.isShow6=!1,this.isShow5=!0,document.getElementsByClassName("dbjz")[0].scrollTop=0},onFinish({selectedOptions:e}){this.showxzqh=!1;let a=e.map(e=>e.text),t=e.map(e=>e.text+e.value);console.log(t),console.log(a),this.form.ab_ex1=a[2],this.form.ab_ex2=a[1],this.form.ab_ex161=a[0],this.form.ab_ex162_2=a.join("/"),this.form.ab_ex162=t.join(","),""==this.form.ab_ex11&&(this.form.ab_ex11=a[0]+a[1]+a[2]),""==this.form.ab_ex4&&(this.form.ab_ex4=a[0]+a[1]+a[2])},beforeRead(e){return"image/heic"!=e.type&&""!=e.type||(this.$toast.fail("照片格式不正确"),!1)},imgRequest(e,a,t){Object(o["a"])({method:"post",url:"/social/weixinMinios/fileUpload",data:e}).then(e=>{a.status="done",a.message="上传完成",1==t?this.form.ab_ex10_1=e[0].filename:2==t?this.form.ab_ex10_2=e[0].filename:3==t?this.form.ab_ex73=e[0].filename:4==t?(this.form.ab_ex16?this.form.ab_ex16=this.form.ab_ex16.concat(",",e[0].filename):this.form.ab_ex16=this.form.ab_ex16.concat(e[0].filename),console.log(this.form.ab_ex16)):5==t&&(this.form.ab_ex97=e[0].filename)}).catch(e=>{a.status="failed",a.message="上传失败",console.log(e),1==t?this.fileList.pop():2==t?this.fileList2.pop():3==t?this.fileList3.pop():4==t?this.fileList5.pop():5==t&&this.fileList4.pop(),this.$toast.fail("上传失败")})},uploadImg(e){return a=>{console.log(a),console.log(this.fileList),console.log(e),a.status="uploading",a.message="上传中...";new r["a"](a,e,this.imgRequest)}},beforeDelete(e){return(a,t)=>{let i=this.form[e].split(",");return i.splice(t.index,1),this.form[e]=i.join(","),console.log(this.form[e]),console.log(e),console.log(a),console.log(t),!0}},onConfirm(e,a){console.log(a);let t=e.getFullYear()+"-",i=(e.getMonth()+1<10?"0"+(e.getMonth()+1):e.getMonth()+1)+"-",s=e.getDate()<10?"0"+e.getDate():e.getDate();this.warning[a].aw_dat1=t+i+s,this.warning[a].showPicker=!1},onConfirm61(e){this.form.ab_ex79=e,this.showPicker61=!1},getBasic(){Object(o["a"])({method:"post",url:"/social/assistanceWeixin/getBasic",data:{sId:this.$route.query.sId},headers:{token:sessionStorage.getItem("token")}}).then(e=>{this.common=e[0].common;let a=e[0].data[0],t=e[0].waring;this.form=a,""==a.ab_ex8&&(this.form.ab_ex8=a.ab_ex3);var i=a.ab_ex10.split(",");if(this.form.ab_ex10_1=i[0],this.form.ab_ex10_2=i.length>1?i[1]:"",this.form.ab_ex10_1&&(console.log(this.form.ab_ex10_1),this.imageView(this.form.ab_ex10_1).then(e=>{console.log(e),this.fileList.push({url:e,isImage:!0})}).catch(e=>{console.log(e)})),this.form.ab_ex10_2&&this.imageView(this.form.ab_ex10_2).then(e=>{this.fileList2.push({url:e,isImage:!0}),console.log(this.fileList2)}).catch(e=>{console.log(e)}),a.ab_ex73){let e=a.ab_ex73.split(",");this.imageView(e[0]).then(e=>{this.fileList3.push({url:e,isImage:!0})}).catch(e=>{console.log(e)})}if(a.ab_ex16){let e=a.ab_ex16.split(",");console.log(this.fileList5),e.forEach((e,a)=>{this.imageView(e).then(e=>{this.fileList5.push({url:e,isImage:!0})}).catch(e=>{console.log(e)})})}if(a.ab_ex97){let e=a.ab_ex97.split(",");this.imageView(e[0]).then(e=>{this.fileList4.push({url:e,isImage:!0}),console.log(this.fileList4)}).catch(e=>{console.log(e)})}console.log(this.$route.query.sId),this.$route.query.sId&&(console.log(this.form.ab_ex162),""!=a.ab_ex161&&""!=a.ab_ex2&&""!=a.ab_ex1&&(this.form.ab_ex162_2=a.ab_ex161+"/"+a.ab_ex2+"/"+a.ab_ex1)),t.length>0&&(this.warning=t,t.forEach((e,a)=>{this.$set(this.warning[a],"showPicker",!1),console.log(this.warning)})),""==a.ab_ex42&&(this.form.ab_ex42="泰兴农商行"),""==a.ab_ex13&&(this.form.ab_ex13=this.$route.query.type,this.form.ab_ex15="委托确认",this.form.ab_ex100="Y")}).catch(e=>{})},getBasicIdNum(e){if(!this.ab_ex85_2&&this.form.ab_ex85&&22==this.form.ab_ex85.length)this.ab_ex85_2=this.form.ab_ex85;else{var a="",t=this.form.ab_ex2;"济川街道"==t?a="321283001":"延令街道"==t?a="321283002":"黄桥镇"==t?a="321283101":"珊瑚镇"==t?a="321283102":"广陵镇"==t?a="321283103":"古溪镇"==t?a="321283106":"元竹镇"==t?a="321283107":"张桥镇"==t?a="321283108":"曲霞镇"==t?a="321283109":"河失镇"==t?a="321283110":"新街镇"==t?a="321283113":"姚王街道"==t?a="321283114":"宣堡镇"==t?a="321283115":"分界镇"==t?a="321283122":"滨江镇"==t?a="321283123":"虹桥镇"==t?a="321283124":"根思乡"==t&&(a="321283201");var i=new Date;a+=""+i.getFullYear()+(i.getMonth()>8?i.getMonth()+1:"0"+(i.getMonth()+1));var s=this.form.ab_ex13;"低保"==s||"城乡低保"==s?a+="01":"特困供养"==s?a+="02":"医疗救助"==s?a+="04":"教育救助"==s?a+="21":"住房救助"==s?a+="22":"就业救助"==s?a+="23":"其他"==s?a+="90":"家庭边缘"==s?a+="11":"支出型困难"==s?a+="27":"临时救助"==s?a+="05":"受灾人员救助"==s?a+="03":"低保外重残"==s?a+="06":"低保外一户多残依老养残"==s?a+="07":"慈善救助"==s?a+="09":"易返贫易致贫对象"==s?a+="24":"法律援助"==s?a+="25":"困难职工"==s&&(a+="26"),Object(o["a"])({method:"post",url:"/social/assistanceWeixin/getBasicIdNum?type="+e+"&ab_id="+this.$route.query.sId,data:{idNum:a},headers:{token:sessionStorage.getItem("token")}}).then(e=>{console.log(e),null!=e[0].data&&e[0].data.length>20?a=""+e[0].data:a+=""+e[0].data,this.form.ab_ex85=a}).catch(e=>{console.log(e)})}},save(){this.form.ab_ex13="";let e=this.$toast({type:"loading",message:"提交中...",overlay:!0,duration:0});if(0==this.fileList.length)return this.$toast.fail("身份证正面不能为空"),!1;if(0==this.fileList2.length)return this.$toast.fail("身份证反面不能为空"),!1;if(0==this.fileList5.length)return this.$toast.fail("其他证明材料不能为空"),!1;if(!this.form.ab_ex79)return this.$toast.fail("请选择情况是否属实"),!1;if(!this.form.ab_ex78)return this.$toast.fail("请填写调查人"),!1;if(this.form.ab_ex78&&this.form.ab_ex78.split(",").length<2&&this.form.ab_ex78.split("，").length<2)return this.$toast.fail("调查人数不能少于两人"),!1;if(!this.form.ab_ex80)return this.$toast.fail("请填写备注"),!1;this.form.ab_ex78=this.form.ab_ex78.replace(/\s*/g,""),this.form.ab_ex78=Object(r["h"])(this.form.ab_ex78),this.form.ab_ex80=this.form.ab_ex80.replace(/\s*/g,""),this.form.ab_ex80=Object(r["h"])(this.form.ab_ex80),this.form.ab_ex10=this.form.ab_ex10_1+","+this.form.ab_ex10_2,this.form.ab_ex17="泰州市姜堰区社会救助综合平台",this.form.stype=this.$route.query.type,console.log(this.form);let a=[];this.warning.forEach((e,t)=>{e.aw_ex1&&e.aw_dat1&&a.push(e)}),console.log(a),Object(o["a"])({method:"post",url:"/social/assistanceWeixin/saveBasic",data:{data:"["+JSON.stringify(this.form)+"]",waring:JSON.stringify(a),isHc:"Y",isCf:"Y",type:"核查"},headers:{token:sessionStorage.getItem("token")}}).then(a=>{e.clear(),this.$dialog.alert({message:a[0].msg}).then(()=>{this.$router.go(-1)})}).catch(a=>{e.clear(),console.log(a)})},changeSfz(e){if(""==Object(r["e"])(e)){this.form.ab_ex69=Object(r["d"])(e),this.form.ab_dat11=Object(r["c"])(e);let a=Object(r["b"])(e);this.form.ab_ex70=a,a>=80&&a<90?this.form.ab_ex5=50:a>=90&&a<100?this.form.ab_ex5=100:a>=100&&(this.form.ab_ex5=300)}},imageView(e){return Object(o["a"])({method:"post",url:e,headers:{token:sessionStorage.getItem("token")},data:{}})}}},n=l,c=(t("e0e8"),t("2877")),f=Object(c["a"])(n,i,s,!1,null,"8e106204",null);a["default"]=f.exports},"867c":function(e,a,t){},e0e8:function(e,a,t){"use strict";t("867c")}}]);
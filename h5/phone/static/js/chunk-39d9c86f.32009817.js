(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-39d9c86f"],{"2ba4":function(e,t,a){var s=a("40d5"),i=Function.prototype,r=i.apply,o=i.call;e.exports="object"==typeof Reflect&&Reflect.apply||(s?o.bind(r):function(){return o.apply(r,arguments)})},"365c":function(e,t,a){"use strict";a.d(t,"f",(function(){return i})),a.d(t,"c",(function(){return r})),a.d(t,"d",(function(){return o})),a.d(t,"h",(function(){return n})),a.d(t,"g",(function(){return l["e"]})),a.d(t,"i",(function(){return l["f"]})),a.d(t,"b",(function(){return l["a"]})),a.d(t,"j",(function(){return c})),a.d(t,"a",(function(){return u})),a.d(t,"k",(function(){return d})),a.d(t,"e",(function(){return f}));var s=a("b775");const i=e=>Object(s["a"])({method:"POST",url:"/social/child/getChildCheckList",data:e}),r=e=>Object(s["a"])({method:"POST",url:"/social/assistanceWeixin/queryDisabledList",data:e}),o=e=>Object(s["a"])({method:"POST",url:"/social/assistanceWeixin/getDisabled",data:e}),n=e=>Object(s["a"])({method:"POST",url:"/social/assistanceWeixin/saveDisabledInfo",data:e});var l=a("8a25");const c=e=>Object(s["a"])({method:"POST",url:"/social/assistanceWeixin/verifyCode",data:e}),u=e=>Object(s["a"])({method:"POST",url:"/social/weixinMinios/fileUpload",data:e}),d=e=>Object(s["a"])({method:"POST",url:e,data:{}}),f=e=>Object(s["a"])({method:"POST",url:"/social/assistanceWeixin/getReliefdistOpen",data:e})},"3c2d":function(e,t,a){},"8a25":function(e,t,a){"use strict";a.d(t,"e",(function(){return i})),a.d(t,"f",(function(){return r})),a.d(t,"a",(function(){return o})),a.d(t,"b",(function(){return n})),a.d(t,"d",(function(){return l})),a.d(t,"c",(function(){return c}));var s=a("b775");const i=e=>Object(s["a"])({method:"POST",url:"/social/child/saveChildInfo",data:e}),r=e=>Object(s["a"])({method:"POST",url:"/social/child/temporarilySave",data:e}),o=e=>Object(s["a"])({method:"POST",url:"/social/child/getChildDetailInfo",data:e}),n=e=>Object(s["a"])({method:"POST",url:"/social/childEvaluate/getNewEvaluateRecord",data:e}),l=e=>Object(s["a"])({method:"POST",url:"/social/childEvaluate/saveAloneEvaluateRecord",data:e}),c=e=>Object(s["a"])({method:"POST",url:"/social/childEvaluate/saveAloneEvaluateOpinion",data:e})},ab36:function(e,t,a){var s=a("861d"),i=a("9112");e.exports=function(e,t){s(t)&&"cause"in t&&i(e,"cause",t.cause)}},aeb0:function(e,t,a){var s=a("9bf2").f;e.exports=function(e,t,a){a in e||s(e,a,{configurable:!0,get:function(){return t[a]},set:function(e){t[a]=e}})}},b980:function(e,t,a){var s=a("d039"),i=a("5c6c");e.exports=!s((function(){var e=Error("a");return!("stack"in e)||(Object.defineProperty(e,"stack",i(1,7)),7!==e.stack)}))},d549:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e._self._c;return t("div",{staticClass:"maxBox"},[t("van-form",{ref:"rule1",attrs:{"validate-first":""},on:{failed:e.onFailed}},[t("van-tabs",{attrs:{sticky:"",color:"#fff","title-active-color":"#fff","title-inactive-color":"#323233",background:"#3e80cc"},model:{value:e.active,callback:function(t){e.active=t},expression:"active"}},[t("van-tab",{attrs:{title:"基本信息",name:"1"}},[t("van-field",{attrs:{required:"",name:"pattern",maxlength:"10",label:"姓名",placeholder:"姓名",rules:[{required:!0,message:"请填写姓名"},{pattern:/^(?:[\u4e00-\u9fa5·]{2,16})$/,message:"姓名应为2-16位的汉字！"}]},scopedSlots:e._u([{key:"button",fn:function(){return[t("van-uploader",{attrs:{"before-read":e.beforeRead,"after-read":e.uploadImg("IDCard")}},[t("van-button",{attrs:{size:"small",type:"info","native-type":"button"}},[e._v("拍照识别 ")])],1)]},proxy:!0}]),model:{value:e.userInfo.abd_ex2,callback:function(t){e.$set(e.userInfo,"abd_ex2",t)},expression:"userInfo.abd_ex2"}}),t("van-field",{attrs:{required:"",name:"pattern",label:"身份证号",placeholder:"身份证号",rules:[{required:!0,message:"请填写身份证号"},{pattern:/^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))(\d|X|x)$/,message:"身份证格式错误！"}]},model:{value:e.userInfo.abd_ex3,callback:function(t){e.$set(e.userInfo,"abd_ex3",t)},expression:"userInfo.abd_ex3"}}),t("van-field",{attrs:{name:"radio",label:"性别",required:"",rules:[{required:!0,message:"请填写性别"}]},scopedSlots:e._u([{key:"input",fn:function(){return[t("van-radio-group",{attrs:{direction:"horizontal"},model:{value:e.userInfo.abd_ex12,callback:function(t){e.$set(e.userInfo,"abd_ex12",t)},expression:"userInfo.abd_ex12"}},[t("van-radio",{attrs:{name:"男"}},[e._v("男")]),t("van-radio",{attrs:{name:"女"}},[e._v("女")])],1)]},proxy:!0}])}),t("van-field",{attrs:{type:"number",required:"",name:"abd_ex34",label:"年龄",placeholder:"年龄",rules:[{required:!0,message:"请填写年龄"}]},model:{value:e.userInfo.abd_ex34,callback:function(t){e.$set(e.userInfo,"abd_ex34",t)},expression:"userInfo.abd_ex34"}}),t("van-field",{attrs:{required:"",readonly:"",clickable:"",name:"ab_ex192",value:e.userInfo.abd_ex17,label:"户籍类别","is-link":"",placeholder:"点击选择户籍类别",rules:[{required:!0,message:"请选择户籍类别"}]},on:{click:function(t){return e.showSelect("户籍类别")}}}),t("van-field",{attrs:{required:"",readonly:"",clickable:"",name:"abd_ex16",value:e.userInfo.abd_ex16,label:"民族","is-link":"",placeholder:"点击选择民族",rules:[{required:!0,message:"请选择核对民族"}]},on:{click:function(t){return e.showSelect("民族")}}}),t("van-field",{attrs:{required:"",readonly:"",clickable:"",name:"abd_ex16",value:e.userInfo.abd_ex66,label:"与户主关系","is-link":"",placeholder:"点击选择与户主关系",rules:[{required:!0,message:"请选择与户主关系"}]},on:{click:function(t){return e.showSelect("与户主关系")}}}),t("van-field",{attrs:{type:"number",required:"",label:"残疾证号",placeholder:"残疾证号",rules:[{required:!0,message:"请填写残疾证号"},{pattern:/[a-zA-Z0-9_\u4e00-\u9fa5]+/,message:"残疾证号只能有数字"}]},model:{value:e.userInfo.abd_ex5,callback:function(t){e.$set(e.userInfo,"abd_ex5",t)},expression:"userInfo.abd_ex5"}}),t("van-field",{attrs:{required:"",readonly:"",clickable:"",name:"abd_ex15",value:e.userInfo.abd_ex15,label:"残疾类别","is-link":"",placeholder:"点击选择残疾类别",rules:[{required:!0,message:"请选择残疾类别"}]},on:{click:function(t){return e.showSelect("残疾类别")}}}),t("van-field",{attrs:{required:"",readonly:"",clickable:"",name:"abd_ex14",value:e.userInfo.abd_ex14,label:"残疾等级","is-link":"",placeholder:"点击选择残疾等级",rules:[{required:!0,message:"请选择残疾等级"}]},on:{click:function(t){return e.showSelect("残疾等级")}}}),t("van-field",{attrs:{required:"",name:"pattern",label:"户籍地址",placeholder:"户籍地址",rules:[{required:!0,message:"请输入户籍地址"},{pattern:/[a-zA-Z0-9_\u4e00-\u9fa5]+/,message:"户籍地址只能有大小写字母,汉字,数字"}]},model:{value:e.userInfo.abd_ex18,callback:function(t){e.$set(e.userInfo,"abd_ex18",t)},expression:"userInfo.abd_ex18"}}),t("van-field",{attrs:{required:"",name:"pattern",label:"现住址",placeholder:"现住址",rules:[{required:!0,message:"请输入现住址"},{pattern:/[a-zA-Z0-9_\u4e00-\u9fa5]+/,message:"现住址只能有大小写字母,汉字,数字"}]},model:{value:e.userInfo.abd_ex19,callback:function(t){e.$set(e.userInfo,"abd_ex19",t)},expression:"userInfo.abd_ex19"}}),t("van-field",{attrs:{type:"number",required:"",name:"abd_ex67",label:"家庭人口数",placeholder:"家庭人口数",rules:[{required:!0,message:"请输入家庭人口数"},{pattern:/[a-zA-Z0-9_\u4e00-\u9fa5]+/,message:"家庭人口数只能有数字"}]},model:{value:e.userInfo.abd_ex67,callback:function(t){e.$set(e.userInfo,"abd_ex67",t)},expression:"userInfo.abd_ex67"}}),t("van-field",{attrs:{required:"",name:"abd_ex68",label:"伤残原因说明",placeholder:"伤残原因说明"},model:{value:e.userInfo.abd_ex68,callback:function(t){e.$set(e.userInfo,"abd_ex68",t)},expression:"userInfo.abd_ex68"}}),t("van-field",{attrs:{required:"",name:"abd_ex69",label:"伤残收入说明",placeholder:"伤残收入说明"},model:{value:e.userInfo.abd_ex69,callback:function(t){e.$set(e.userInfo,"abd_ex69",t)},expression:"userInfo.abd_ex69"}}),t("van-field",{attrs:{required:"",readonly:"",clickable:"",name:"abd_ex70",value:e.userInfo.abd_ex70,label:"是否享受低保","is-link":"",placeholder:"是否享受低保",rules:[{required:!0,message:"是否享受低保"}]},on:{click:function(t){return e.showSelect("是否享受低保")}}}),t("van-field",{attrs:{required:"",readonly:"",clickable:"",name:"abd_ex73",value:e.userInfo.abd_ex73,label:"家庭特征","is-link":"",placeholder:"家庭特征",rules:[{required:!0,message:"请填写家庭特征"}]},on:{click:function(t){return e.showSelect("家庭特征")}}}),t("van-field",{attrs:{required:"",name:"abd_ex20",label:"联系电话",placeholder:"联系电话",rules:[{required:!0,message:"请填写联系电话"}]},model:{value:e.userInfo.abd_ex20,callback:function(t){e.$set(e.userInfo,"abd_ex20",t)},expression:"userInfo.abd_ex20"}}),t("van-field",{attrs:{required:"",center:"",readonly:"",label:"行政区划",placeholder:"请选择所在行政区划",rules:[{required:!0,message:"请选择儿童基本情况下的行政区划"}]},on:{click:function(t){e.areaShow=!0}},model:{value:e.areaName,callback:function(t){e.areaName=t},expression:"areaName"}}),t("van-popup",{attrs:{round:"",position:"bottom"},model:{value:e.areaShow,callback:function(t){e.areaShow=t},expression:"areaShow"}},[t("van-cascader",{attrs:{title:"请选择所在行政区划",options:e.options},on:{close:function(t){e.areaShow=!1},finish:e.onFinish}})],1),t("van-field",{attrs:{required:"",readonly:"",clickable:"",name:"abd_ex75",value:e.userInfo.abd_ex75,label:"是否属于村干部或经办人员近亲属","is-link":"",placeholder:"是否属于村干部或经办人员近亲属",rules:[{required:!0,message:"请选择是否属于村干部或经办人员近亲属"}]},on:{click:function(t){return e.showSelect("是否属于村干部或经办人员近亲属")}}}),t("van-field",{attrs:{required:"",name:"abd_ex76",label:"求助描述",placeholder:"求助描述",rules:[{required:!0,message:"请填写求助描述"}]},model:{value:e.userInfo.abd_ex76,callback:function(t){e.$set(e.userInfo,"abd_ex76",t)},expression:"userInfo.abd_ex76"}}),t("van-field",{attrs:{name:"checkboxGroup",required:"",label:"求助原因",rules:[{required:!0,message:"请至少选择一项"}]},scopedSlots:e._u([{key:"input",fn:function(){return[t("van-checkbox-group",{attrs:{direction:"horizontal"},model:{value:e.helpCause,callback:function(t){e.helpCause=t},expression:"helpCause"}},[t("van-checkbox",{attrs:{name:"缺乏劳动力",shape:"square"}},[e._v("缺乏劳动力")]),t("van-checkbox",{attrs:{name:"无生活来源",shape:"square"}},[e._v("无生活来源")]),t("van-checkbox",{attrs:{name:"疾病",shape:"square"}},[e._v("疾病")]),t("van-checkbox",{attrs:{name:"残疾",shape:"square"}},[e._v("残疾")]),t("van-checkbox",{attrs:{name:"教育",shape:"square"}},[e._v("教育")]),t("van-checkbox",{attrs:{name:"住房",shape:"square"}},[e._v("住房")]),t("van-checkbox",{attrs:{name:"受灾",shape:"square"}},[e._v("受灾")]),t("van-checkbox",{attrs:{name:"其他",shape:"square"}},[e._v("其他")])],1)]},proxy:!0}])}),t("van-popup",{attrs:{position:"bottom"},model:{value:e.showPicker,callback:function(t){e.showPicker=t},expression:"showPicker"}},[t("van-picker",{attrs:{"show-toolbar":"",columns:e.kosekiTyle},on:{confirm:function(t){return e.confirmType(t)},cancel:function(t){e.showPicker=!1}}})],1)],1),t("van-tab",{attrs:{title:"其他信息",name:"2"}},[t("van-field",{attrs:{required:"",name:"abd_ex23",label:"开户银行",placeholder:"开户银行",rules:[{required:!0,message:"请填写开户银行"}]},model:{value:e.userInfo.abd_ex23,callback:function(t){e.$set(e.userInfo,"abd_ex23",t)},expression:"userInfo.abd_ex23"}}),t("van-field",{attrs:{required:"",name:"abd_ex78",label:"开户人",placeholder:"开户人",rules:[{required:!0,message:"请填写开户人"}]},model:{value:e.userInfo.abd_ex78,callback:function(t){e.$set(e.userInfo,"abd_ex78",t)},expression:"userInfo.abd_ex78"}}),t("van-field",{attrs:{required:"",name:"abd_ex24",label:"银行卡号",placeholder:"银行卡号",rules:[{required:!0,message:"请填写银行卡号"}]},model:{value:e.userInfo.abd_ex24,callback:function(t){e.$set(e.userInfo,"abd_ex24",t)},expression:"userInfo.abd_ex24"}}),t("van-field",{attrs:{name:"abd_ex79",label:"银行总存款",placeholder:"银行总存款"},model:{value:e.userInfo.abd_ex79,callback:function(t){e.$set(e.userInfo,"abd_ex79",t)},expression:"userInfo.abd_ex79"}}),t("van-field",{attrs:{name:"abd_ex80",label:"有价证券",placeholder:"有价证券"},model:{value:e.userInfo.abd_ex80,callback:function(t){e.$set(e.userInfo,"abd_ex80",t)},expression:"userInfo.abd_ex80"}}),t("van-field",{attrs:{name:"abd_ex81",label:"债权",placeholder:"债权"},model:{value:e.userInfo.abd_ex81,callback:function(t){e.$set(e.userInfo,"abd_ex81",t)},expression:"userInfo.abd_ex81"}}),t("van-field",{attrs:{name:"abd_ex82",label:"其他金融产品",placeholder:"其他金融产品金额"},model:{value:e.userInfo.abd_ex82,callback:function(t){e.$set(e.userInfo,"abd_ex82",t)},expression:"userInfo.abd_ex82"}}),t("van-field",{attrs:{required:"",name:"abd_ex104",label:"前六个月护理费用",placeholder:"前六个月护理费用",rules:[{required:!0,message:"请填写前六个月护理费用"}]},model:{value:e.userInfo.abd_ex104,callback:function(t){e.$set(e.userInfo,"abd_ex104",t)},expression:"userInfo.abd_ex104"}}),t("van-field",{attrs:{required:"",name:"abd_ex89",label:"家庭人均月收入",placeholder:"家庭人均月收入",rules:[{required:!0,message:"请填写家庭人均月收入"}]},model:{value:e.userInfo.abd_ex89,callback:function(t){e.$set(e.userInfo,"abd_ex89",t)},expression:"userInfo.abd_ex89"}})],1),t("van-tab",{attrs:{title:"证明材料",name:"3"}},[t("div",{staticClass:"page6Div5"},[t("div",{staticClass:"page4Img2Font"},[e._v("身份证照片:")]),t("div",{staticClass:"page4Img2Div"},[t("div",{staticStyle:{position:"relative",width:"91%",float:"left"}},[t("van-uploader",{attrs:{"after-read":e.myAfterRead1,"before-delete":e.myBeforeDelete1,multiple:""},model:{value:e.fileList1,callback:function(t){e.fileList1=t},expression:"fileList1"}})],1)])]),t("div",{staticClass:"page6Div5"},[t("div",{staticClass:"page4Img2Font"},[e._v("纸质授权书:")]),t("div",{staticClass:"page4Img2Div"},[t("div",{staticStyle:{position:"relative",width:"91%",float:"left"}},[t("van-uploader",{attrs:{"after-read":e.myAfterRead2,"before-delete":e.myBeforeDelete2,multiple:""},model:{value:e.fileList2,callback:function(t){e.fileList2=t},expression:"fileList2"}})],1)])]),t("div",{staticClass:"page6Div5"},[t("div",{staticClass:"page4Img2Font"},[e._v("其他证明材料:")]),t("div",{staticClass:"page4Img2Div"},[t("div",{staticStyle:{position:"relative",width:"91%",float:"left"}},[t("van-uploader",{attrs:{"after-read":e.myAfterRead5,"before-delete":e.myBeforeDelete5,multiple:""},model:{value:e.fileList5,callback:function(t){e.fileList5=t},expression:"fileList5"}})],1)])]),t("div",{staticClass:"page6Div5"},[t("div",{staticClass:"page4Img2Font"},[e._v("近亲属备案照片:")]),t("div",{staticClass:"page4Img2Div"},[t("div",{staticStyle:{position:"relative",width:"91%",float:"left"}},[t("van-uploader",{attrs:{"after-read":e.myAfterRead6,"before-delete":e.myBeforeDelete6,multiple:""},model:{value:e.fileList6,callback:function(t){e.fileList6=t},expression:"fileList6"}})],1)])])])],1)],1),t("div",{staticClass:"footerButton"},[t("van-button",{attrs:{type:"primary"},on:{click:function(t){return e.submit("暂存")}}},[e._v("暂存")]),t("van-button",{attrs:{type:"info"},on:{click:function(t){return e.submit("提交")}}},[e._v("提交")])],1)],1)},i=[],r=(a("d9e2"),a("365c")),o=a("fa7d"),n=a("b775");let l=["汉族","满族","蒙古族","回族","藏族","维吾尔族","苗族","彝族","壮族","布依族","侗族","瑶族","白族","土家族","哈尼族","哈萨克族","傣族","黎族","傈僳族","佤族","畲族","高山族","拉祜族","水族","东乡族","纳西族","景颇族","柯尔克孜族","土族","达斡尔族","仫佬族","羌族","布朗族","撒拉族","毛南族","仡佬族","锡伯族","阿昌族","普米族","朝鲜族","塔吉克族","怒族","乌孜别克族","俄罗斯族","鄂温克族","德昂族","保安族","裕固族","京族","塔塔尔族","独龙族","鄂伦春族","赫哲族","门巴族","珞巴族","基诺族"];var c={name:"userInfoAccept",data(){return{active:1,userInfo:{},fileList1:[],img1Arr:[],fileList2:[],img2Arr:[],fileList5:[],img5Arr:[],fileList6:[],img6Arr:[],areaName:"",helpCause:[],showPicker:!1,kosekiTyle:[],kosekiTyleName:"",areaShow:!1,fieldValue:"",cascaderValue:"",options:[],saveFlage:!1}},created(){this.getDisabledUserInfo({id:this.$route.query.sId}),Object(n["a"])({method:"post",url:"/social/assistanceWeixin/getCitys",data:{}}).then(e=>{for(let t in e){this.options.push({text:"",value:"",children:[]}),this.options[t].text=e[t].n.split("#")[0],this.options[t].value="#"+e[t].n.split("#")[1];for(let a in e[t].c){this.options[t].children[a]={text:"",value:"",children:[]},this.options[t].children[a].text=e[t].c[a].n.split("#")[0],this.options[t].children[a].value="#"+e[t].c[a].n.split("#")[1];for(let s in e[t].c[a].a)this.options[t].children[a].children[s]={text:"",value:""},this.options[t].children[a].children[s].text=e[t].c[a].a[s].split("#")[0],this.options[t].children[a].children[s].value="#"+e[t].c[a].a[s].split("#")[1]}}}).catch(e=>{console.log(e,"xzqh"),this.$toast.fail("数据请求失败1")})},methods:{async getDisabledUserInfo(e){try{const t=await Object(r["d"])(e);this.userInfo=t.data,this.formatData(),this.helpCause=this.userInfo.abd_ex77.split(","),this.userInfo.abd_ex37&&this.userInfo.abd_ex37.split(",").forEach(async e=>{try{const t=await Object(r["k"])(e);this.fileList1.push({url:t,isImage:!0}),this.img1Arr.push(e)}catch(t){console.log(t,"this.userInfo.abd_ex37.split.forEach Error")}}),this.userInfo.abd_ex92&&this.userInfo.abd_ex92.split(",").forEach(async e=>{try{const t=await Object(r["k"])(e);this.fileList2.push({url:t,isImage:!0}),this.img2Arr.push(e)}catch(t){console.log(t,"this.userInfo.abd_ex92.split.forEach Error")}}),this.userInfo.abd_ex38&&this.userInfo.abd_ex38.split(",").forEach(async e=>{try{const t=await Object(r["k"])(e);this.fileList5.push({url:t,isImage:!0}),this.img5Arr.push(e)}catch(t){console.log(t,"this.userInfo.abd_ex38.split.forEach Error")}}),this.userInfo.abd_ex95&&this.userInfo.abd_ex95.split(",").forEach(async e=>{try{const t=await Object(r["k"])(e);this.fileList6.push({url:t,isImage:!0}),this.img6Arr.push(e)}catch(t){console.log(t,"this.userInfo.abd_ex95.split.forEach Error")}})}catch(t){console.log("根据id获取残疾人信息失败")}},async submit(e){if(this.saveFlage)return this.$toast("请勿重复保存");this.saveFlage=!0,setTimeout(()=>{this.saveFlage=!1},3e3),this.userInfo.abd_ex77=this.helpCause.join(),this.userInfo.abd_ex37=this.img1Arr.join(),this.userInfo.abd_ex92=this.img2Arr.join(),this.userInfo.abd_ex38=this.img5Arr.join(),this.userInfo.abd_ex95=this.img6Arr.join(),"暂存"===e&&(this.userInfo.abd_ex99=!1,this.onRegister(this.userInfo)),"提交"===e&&(this.userInfo.abd_ex99=!0,this.onSave(this.userInfo))},async onRegister(e){try{const t=await Object(r["h"])(e);"+OK"===t.msg?(console.log(t,"暂存按钮 res"),this.$toast("暂存成功"),this.getDisabledUserInfo({id:this.$route.query.sId})):this.$toast(t.msg)}catch(t){this.$toast("暂存失败，请稍后重试"),console.log(t,"暂存按钮 Error")}},async onSave(e){try{const t=await Object(r["h"])(e);"+OK"===t.status?(console.log(t,"保存 res"),this.$toast("保存成功"),this.getDisabledUserInfo({id:this.$route.query.sId})):this.$toast(t.msg)}catch(t){this.$toast("保存失败，请稍后重试"),console.log(t,"保存按钮 Error")}},formatData(){this.fileList1=[],this.img1Arr=[],this.fileList2=[],this.img2Arr=[],this.fileList5=[],this.img5Arr=[],this.fileList6=[],this.img6Arr=[]},onFailed(e){console.log("failed",e)},confirmType(e){"核对类别"===this.kosekiTyleName&&(this.userInfo.ab_ex192=e),"民族"===this.kosekiTyleName&&(this.userInfo.abd_ex16=e),"与户主关系"===this.kosekiTyleName&&(this.userInfo.abd_ex66=e),"残疾类别"===this.kosekiTyleName&&(this.userInfo.abd_ex15=e),"残疾等级"===this.kosekiTyleName&&(this.userInfo.abd_ex14=e),"是否享受低保"===this.kosekiTyleName&&(this.userInfo.abd_ex70=e),"家庭特征"===this.kosekiTyleName&&(this.userInfo.abd_ex73=e),"是否属于村干部或经办人员近亲属"===this.kosekiTyleName&&(this.userInfo.abd_ex75=e),"户籍类别"===this.kosekiTyleName&&(this.userInfo.abd_ex17=e),this.showPicker=!1},showSelect(e){"核对类别"===e&&(this.kosekiTyle=["农业户口","非农业户口"]),"民族"===e&&(this.kosekiTyle=l),"与户主关系"===e&&(this.kosekiTyle=["户主本人","户主配偶"]),"残疾类别"===e&&(this.kosekiTyle=["肢体残疾","精神残疾","智力残疾","盲视力残疾","言语残疾","听力残疾"]),"残疾等级"===e&&(this.kosekiTyle=["一级残疾","二级残疾","三级残疾","四级残疾"]),"是否享受低保"===e&&(this.kosekiTyle=["是","否"]),"家庭特征"===e&&(this.kosekiTyle=["一名残疾人","两名以上残疾人","由达到法定退休年龄父母供养","由达到法定退休年龄的其他供养人员供养","其他特征"]),"是否属于村干部或经办人员近亲属"===e&&(this.kosekiTyle=["是","否"]),"户籍类别"===e&&(this.kosekiTyle=["农业户口","非农业户口"]),this.kosekiTyleName=e,this.showPicker=!0},onFinish({selectedOptions:e}){this.areaShow=!1;let t=e.map(e=>e.text),a=e.map(e=>e.text+e.value);this.userInfo.abd_ex28=a.join(","),this.areaName=t.join("/")},beforeRead(e){return"image/heic"!=e.type&&""!=e.type||(this.$toast.fail("照片格式不正确"),!1)},uploadImg(e,t){return a=>{a.status="uploading",a.message="上传中...",console.log(a.file);new o["a"](a,e,this.imgRequest,t)}},imgRequest(e,t,a,s){console.log("index",s,a),Object(n["a"])({method:"post",url:"/social/weixinMinios/fileUpload",data:e}).then(e=>{t.status="done",t.message="上传完成",console.log(e),-1!=(a+"").indexOf("IDCard")?Object(n["a"])({method:"post",url:"/social/assistanceWeixin/idOrc",data:{img:t.content}}).then(e=>{if(console.log(e,"res"),"ok"==e[0].status)try{let t=e[0].data.words_result;console.log(t),"IDCard"==a?(this.form.ab_ex3=t["姓名"].words,t["公民身份号码"].words=t["公民身份号码"].words.replace(/\s+/g,""),this.form.ab_ex7=t["公民身份号码"].words,this.form.ab_ex4=t["住址"].words):"IDCard2"==a?(t["公民身份号码"].words=t["公民身份号码"].words.replace(/\s+/g,""),this.$set(this.family[s],"abm_ex3",t["姓名"].words),this.$set(this.family[s],"abm_ex2",t["公民身份号码"].words),this.changeSfz2(this.family[s])):"IDCard3"==a?(this.family2[s].abm_ex3=t["姓名"].words,t["公民身份号码"].words=t["公民身份号码"].words.replace(/\s+/g,""),this.family2[s].abm_ex2=t["公民身份号码"].words,this.changeSfz2(this.family2[s])):"IDCard4"==a&&(this.family4[s].abm_ex3=t["姓名"].words,t["公民身份号码"].words=t["公民身份号码"].words.replace(/\s+/g,""),this.family4[s].abm_ex2=t["公民身份号码"].words)}catch(t){this.fileList2.pop(),this.$toast.fail("身份证对比信息不符,请上传正确的身份证1")}else this.fileList2.pop(),this.$toast.fail("身份证对比信息不符,请上传正确的身份证2")}).catch(e=>{}):1!=a&&2!=a||Object(n["a"])({method:"post",url:"/social/assistanceWeixin/idOrc",data:{img:t.content}}).then(e=>{if(console.log(e,"res",a),"ok"==e[0].status)try{let t=e[0].data.words_result;if(console.log(t),"1"==a){let e=t["签发机关"].words,a=t["签发日期"].words,s=t["失效日期"].words;e&&a&&s||(this.fileList.pop(),this.$toast.fail("身份证国徽面照片不符,请上传正确的身份证国徽面1"))}else"2"==a&&(t["公民身份号码"].words=t["公民身份号码"].words.replace(/\s+/g,""),this.$set(this.family[s],"abm_ex3",t["姓名"].words),this.$set(this.family[s],"abm_ex2",t["公民身份号码"].words),this.changeSfz2(this.family[s]))}catch(t){console.log(t),this.fileList2.pop(),this.$toast.fail("身份证对比信息不符,请上传正确的身份证1")}else this.fileList2.pop(),this.$toast.fail("身份证对比信息不符,请上传正确的身份证2")}).catch(e=>{console.log(e)}),"bankCard"==a&&Object(n["a"])({method:"post",url:"/social/assistanceWeixin/orc",data:{img:t.content}}).then(e=>{if(console.log(e,"res"),console.log(e[0].data.result,"res"),"ok"==e[0].status)try{let t=e[0].data.result;console.log(t),t.bank_card_number=t.bank_card_number.replace(/\s+/g,""),this.form.ab_ex42=t.bank_name,this.form.ab_ex43=t.bank_card_number}catch(t){console.log(t),this.fileList2.pop(),this.$toast.fail("银行卡对比信息不符,请上传正确的银行卡")}else this.fileList2.pop(),this.$toast.fail("银行卡对比信息不符,请上传正确的银行卡")}).catch(e=>{console.log(e)}),1==a?this.form.ab_ex10_1=e[0].filename:2==a?this.form.ab_ex10_2=e[0].filename:3==a?this.form.ab_ex73=e[0].filename:4==a?(this.form.ab_ex16?this.form.ab_ex16=this.form.ab_ex16.concat(",",e[0].filename):this.form.ab_ex16=this.form.ab_ex16.concat(e[0].filename),console.log(this.form.ab_ex16)):5==a?this.form.ab_ex97=e[0].filename:11==a?this.form.ab_ex196=e[0].filename:12==a?this.form.ab_ex197=e[0].filename:6==a?this.form.ab_ex166?this.form.ab_ex166=this.form.ab_ex166.concat(",",e[0].filename):this.form.ab_ex166=this.form.ab_ex166.concat(e[0].filename):7==a?this.form.ab_ex167?this.form.ab_ex167=this.form.ab_ex167.concat(",",e[0].filename):this.form.ab_ex167=this.form.ab_ex167.concat(e[0].filename):8==a?this.form.ab_ex168?this.form.ab_ex168=this.form.ab_ex168.concat(",",e[0].filename):this.form.ab_ex168=this.form.ab_ex168.concat(e[0].filename):9==a?this.form.ab_ex169?this.form.ab_ex169=this.form.ab_ex169.concat(",",e[0].filename):this.form.ab_ex169=this.form.ab_ex169.concat(e[0].filename):10==a&&(this.form.ab_ex175?this.form.ab_ex175=this.form.ab_ex175.concat(",",e[0].filename):this.form.ab_ex175=this.form.ab_ex175.concat(e[0].filename))}).catch(e=>{t.status="failed",t.message="上传失败",1==a?this.fileList.pop():2==a?this.fileList2.pop():3==a?this.fileList3.pop():4==a?this.fileList5.pop():5==a?this.fileList4.pop():6==a?this.fileList6.pop():7==a?this.fileList7.pop():10==a?this.fileList10.pop():11==a?this.fileList11.pop():12==a&&this.fileList12.pop(),this.$toast.fail("上传失败"),console.log(e)})},async myAfterRead1(e){let t=new FormData;t.append("file",e.file);try{const e=await Object(r["a"])(t);this.img1Arr.push("/social/weixinMinios/show?filename="+e[0].filename)}catch(a){throw this.fileList1.pop(),this.$toast("图片上传失败"),new Error("图片上传失败")}},myBeforeDelete1(e,t){this.fileList1=this.fileList1.filter((e,a)=>a!==t.index),this.img1Arr=this.img1Arr.filter((e,a)=>a!==t.index)},async myAfterRead2(e){let t=new FormData;t.append("file",e.file);try{const e=await Object(r["a"])(t);this.img2Arr.push("/social/weixinMinios/show?filename="+e[0].filename)}catch(a){throw this.fileList2.pop(),this.$toast("图片上传失败"),new Error("图片上传失败")}},myBeforeDelete2(e,t){this.fileList2=this.fileList2.filter((e,a)=>a!==t.index),this.img2Arr=this.img2Arr.filter((e,a)=>a!==t.index)},async myAfterRead5(e){let t=new FormData;t.append("file",e.file);try{const e=await Object(r["a"])(t);this.img5Arr.push("/social/weixinMinios/show?filename="+e[0].filename)}catch(a){throw this.fileList5.pop(),this.$toast("图片上传失败"),new Error("图片上传失败")}},myBeforeDelete5(e,t){this.fileList5=this.fileList5.filter((e,a)=>a!==t.index),this.img5Arr=this.img5Arr.filter((e,a)=>a!==t.index)},async myAfterRead6(e){let t=new FormData;t.append("file",e.file);try{const e=await Object(r["a"])(t);this.img6Arr.push("/social/weixinMinios/show?filename="+e[0].filename)}catch(a){throw this.fileList6.pop(),this.$toast("图片上传失败"),new Error("图片上传失败")}},myBeforeDelete6(e,t){this.fileList6=this.fileList6.filter((e,a)=>a!==t.index),this.img6Arr=this.img6Arr.filter((e,a)=>a!==t.index)}}},u=c,d=(a("ec8f"),a("2877")),f=Object(d["a"])(u,s,i,!1,null,"4a51f887",null);t["default"]=f.exports},d9e2:function(e,t,a){var s=a("23e7"),i=a("da84"),r=a("2ba4"),o=a("e5cb"),n="WebAssembly",l=i[n],c=7!==Error("e",{cause:7}).cause,u=function(e,t){var a={};a[e]=o(e,t,c),s({global:!0,constructor:!0,arity:1,forced:c},a)},d=function(e,t){if(l&&l[e]){var a={};a[e]=o(n+"."+e,t,c),s({target:n,stat:!0,constructor:!0,arity:1,forced:c},a)}};u("Error",(function(e){return function(t){return r(e,this,arguments)}})),u("EvalError",(function(e){return function(t){return r(e,this,arguments)}})),u("RangeError",(function(e){return function(t){return r(e,this,arguments)}})),u("ReferenceError",(function(e){return function(t){return r(e,this,arguments)}})),u("SyntaxError",(function(e){return function(t){return r(e,this,arguments)}})),u("TypeError",(function(e){return function(t){return r(e,this,arguments)}})),u("URIError",(function(e){return function(t){return r(e,this,arguments)}})),d("CompileError",(function(e){return function(t){return r(e,this,arguments)}})),d("LinkError",(function(e){return function(t){return r(e,this,arguments)}})),d("RuntimeError",(function(e){return function(t){return r(e,this,arguments)}}))},e5cb:function(e,t,a){"use strict";var s=a("d066"),i=a("1a2d"),r=a("9112"),o=a("3a9b"),n=a("d2bb"),l=a("e893"),c=a("aeb0"),u=a("7156"),d=a("e391"),f=a("ab36"),h=a("c770"),b=a("b980"),m=a("83ab"),p=a("c430");e.exports=function(e,t,a,x){var _="stackTraceLimit",v=x?2:1,g=e.split("."),k=g[g.length-1],I=s.apply(null,g);if(I){var y=I.prototype;if(!p&&i(y,"cause")&&delete y.cause,!a)return I;var w=s("Error"),q=t((function(e,t){var a=d(x?t:e,void 0),s=x?new I(e):new I;return void 0!==a&&r(s,"message",a),b&&r(s,"stack",h(s.stack,2)),this&&o(y,this)&&u(s,this,q),arguments.length>v&&f(s,arguments[v]),s}));if(q.prototype=y,"Error"!==k?n?n(q,w):l(q,w,{name:!0}):m&&_ in I&&(c(q,I,_),c(q,I,"prepareStackTrace")),l(q,I),!p)try{y.name!==k&&r(y,"name",k),y.constructor=q}catch(L){}return q}}},ec8f:function(e,t,a){"use strict";a("3c2d")}}]);
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-01ba1d9e"],{"1d43":function(e,a,t){},"7ee3":function(e,a,t){"use strict";t.r(a);var s=function(){var e=this,a=e._self._c;return a("div",{staticClass:"dbjz"},[a("header",[a("div",{staticClass:"headerHead"},[a("div",[a("div",{class:{headerF:e.isShow}},[e._v("基础信息")])]),a("div",{staticClass:"headerRectangle"}),a("div",[a("div",{class:{headerF:e.isShow2}},[e._v("收入情况")])]),a("div",{staticClass:"headerRectangle"}),a("div",[a("div",{class:{headerF:e.isShow3}},[e._v("财产情况")])]),a("div",{staticClass:"headerRectangle"}),a("div",[a("div",{class:{headerF:e.isShow4}},[e._v("材料上传")])])])]),a("main",[a("div",{directives:[{name:"show",rawName:"v-show",value:e.page1,expression:"page1"}],staticClass:"page1Div1",attrs:{id:"page1"}},[e._m(0),a("van-form",{ref:"rule1",on:{submit:e.next1}},[a("van-field",{attrs:{required:"",name:"abd_ex2",maxlength:"10",label:"姓名",placeholder:"姓名",rules:[{required:!0,message:"请填写姓名"}]},model:{value:e.form.abd_ex2,callback:function(a){e.$set(e.form,"abd_ex2",a)},expression:"form.abd_ex2"}}),a("van-field",{attrs:{required:"",name:"abd_ex3",label:"身份证号",placeholder:"身份证号",rules:[{required:!0,message:"请填写身份证号"}]},on:{input:e.changeSfz},model:{value:e.form.abd_ex3,callback:function(a){e.$set(e.form,"abd_ex3",a)},expression:"form.abd_ex3"}}),a("van-field",{attrs:{required:"",center:"",readonly:"",label:"行政区划",placeholder:"请选择所在行政区划",rules:[{required:!0,message:"请选择行政区划"}]},on:{click:function(a){e.showxzqh=!0}},model:{value:e.form.abd_ex28_2,callback:function(a){e.$set(e.form,"abd_ex28_2",a)},expression:"form.abd_ex28_2"}}),a("van-popup",{attrs:{round:"",position:"bottom"},model:{value:e.showxzqh,callback:function(a){e.showxzqh=a},expression:"showxzqh"}},[a("van-cascader",{attrs:{title:"请选择所在行政区划",options:e.options},on:{close:function(a){e.showxzqh=!1},finish:e.onFinish},model:{value:e.form.abd_ex28_3,callback:function(a){e.$set(e.form,"abd_ex28_3",a)},expression:"form.abd_ex28_3"}})],1),a("van-field",{attrs:{disabled:"",name:"form.abd_ex12",label:"性别",placeholder:"性别"},model:{value:e.form.abd_ex12,callback:function(a){e.$set(e.form,"abd_ex12",a)},expression:"form.abd_ex12"}}),a("van-field",{attrs:{disabled:"",type:"number",name:"abd_ex34",label:"年龄",placeholder:"年龄"},model:{value:e.form.abd_ex34,callback:function(a){e.$set(e.form,"abd_ex34",a)},expression:"form.abd_ex34"}}),a("van-field",{attrs:{name:"abd_ex17",label:"户籍类别",required:"",rules:[{required:!0,message:"请选择户籍类别"}]},scopedSlots:e._u([{key:"input",fn:function(){return[a("van-radio-group",{attrs:{direction:"horizontal"},model:{value:e.form.abd_ex17,callback:function(a){e.$set(e.form,"abd_ex17",a)},expression:"form.abd_ex17"}},[a("van-radio",{attrs:{name:"农业户口"}},[e._v("农业户口")]),a("van-radio",{attrs:{name:"非农业户口"}},[e._v("非农业户口")])],1)]},proxy:!0}])}),a("van-field",{attrs:{readonly:"",clickable:"",name:"abd_ex16",value:e.form.abd_ex16,label:"民族",required:"",placeholder:"点击选择民族",rules:[{required:!0,message:"请选择民族"}]},on:{click:function(a){e.showPicker11=!0}}}),a("van-popup",{attrs:{position:"bottom"},model:{value:e.showPicker11,callback:function(a){e.showPicker11=a},expression:"showPicker11"}},[a("van-picker",{attrs:{"show-toolbar":"",columns:e.columns3},on:{confirm:function(a){return e.onConfirm11(a,e.form,"abd_ex16","showPicker11")},cancel:function(a){e.showPicker11=!1}}})],1),a("van-field",{attrs:{readonly:"",clickable:"",name:"abd_ex66",value:e.form.abd_ex66,label:"与户主关系",required:"",placeholder:"点击选择与户主关系",rules:[{required:!0,message:"请选择与户主关系"}]},on:{click:function(a){e.showPicker12=!0}}}),a("van-popup",{attrs:{position:"bottom"},model:{value:e.showPicker12,callback:function(a){e.showPicker12=a},expression:"showPicker12"}},[a("van-picker",{attrs:{"show-toolbar":"",columns:e.columns6},on:{confirm:function(a){return e.onConfirm11(a,e.form,"abd_ex66","showPicker12")},cancel:function(a){e.showPicker12=!1}}})],1),a("van-field",{attrs:{required:"",name:"abd_ex5",label:"残疾证号",placeholder:"残疾证号",rules:[{required:!0,message:"请填写残疾证号"}]},model:{value:e.form.abd_ex5,callback:function(a){e.$set(e.form,"abd_ex5",a)},expression:"form.abd_ex5"}}),a("van-field",{attrs:{required:"",name:"abd_ex15",label:"残疾类别",placeholder:"点击选择残疾类别",rules:[{required:!0,message:"请选择残疾类别"}]},on:{click:function(a){e.showPicker13=!0}},model:{value:e.form.abd_ex15,callback:function(a){e.$set(e.form,"abd_ex15",a)},expression:"form.abd_ex15"}}),a("van-popup",{attrs:{position:"bottom"},model:{value:e.showPicker13,callback:function(a){e.showPicker13=a},expression:"showPicker13"}},[a("van-picker",{attrs:{"show-toolbar":"",columns:e.columns2},on:{confirm:function(a){return e.onConfirm11(a,e.form,"abd_ex15","showPicker13")},cancel:function(a){e.showPicker13=!1}}})],1),a("van-field",{attrs:{required:"",name:"abd_ex14",label:"残疾等级",placeholder:"点击选择残疾等级",rules:[{required:!0,message:"请选择残疾等级"}]},on:{click:function(a){e.showPicker14=!0}},model:{value:e.form.abd_ex14,callback:function(a){e.$set(e.form,"abd_ex14",a)},expression:"form.abd_ex14"}}),a("van-popup",{attrs:{position:"bottom"},model:{value:e.showPicker14,callback:function(a){e.showPicker14=a},expression:"showPicker14"}},[a("van-picker",{attrs:{"show-toolbar":"",columns:e.columns4},on:{confirm:function(a){return e.onConfirm11(a,e.form,"abd_ex14","showPicker14")},cancel:function(a){e.showPicker14=!1}}})],1),a("van-field",{attrs:{name:"abd_ex18",required:"",label:"户籍地址",placeholder:"户籍地址",rules:[{required:!0,message:"请填写户籍地址"}]},model:{value:e.form.abd_ex18,callback:function(a){e.$set(e.form,"abd_ex18",a)},expression:"form.abd_ex18"}}),a("van-field",{attrs:{name:"abd_ex19",maxlength:"50",label:"现住址",required:"",placeholder:"现住址",rules:[{required:!0,message:"请填写现住址"}]},model:{value:e.form.abd_ex19,callback:function(a){e.$set(e.form,"abd_ex19",a)},expression:"form.abd_ex19"}}),a("van-field",{attrs:{name:"abd_ex67",label:"家庭人口",placeholder:"家庭人口",required:"",rules:[{required:!0,message:"请填写家庭人口"}],type:"digit"},model:{value:e.form.abd_ex67,callback:function(a){e.$set(e.form,"abd_ex67",a)},expression:"form.abd_ex67"}}),a("van-field",{attrs:{name:"abd_ex68",label:"伤残原因说明",placeholder:"伤残原因说明",required:"",rules:[{required:!0,message:"请填写伤残原因说明"}]},model:{value:e.form.abd_ex68,callback:function(a){e.$set(e.form,"abd_ex68",a)},expression:"form.abd_ex68"}}),a("van-field",{attrs:{name:"abd_ex69",label:"残疾人收入说明",placeholder:"残疾人收入说明",required:"",rules:[{required:!0,message:"请填写残疾人收入说明"}]},model:{value:e.form.abd_ex69,callback:function(a){e.$set(e.form,"abd_ex69",a)},expression:"form.abd_ex69"}}),a("van-field",{attrs:{name:"abd_ex70",label:"是否享受低保",required:"",rules:[{required:!0,message:"请选择是否享受低保"}]},scopedSlots:e._u([{key:"input",fn:function(){return[a("van-radio-group",{attrs:{direction:"horizontal"},model:{value:e.form.abd_ex70,callback:function(a){e.$set(e.form,"abd_ex70",a)},expression:"form.abd_ex70"}},[a("van-radio",{attrs:{name:"是"}},[e._v("是")]),a("van-radio",{attrs:{name:"否"}},[e._v("否")])],1)]},proxy:!0}])}),a("van-field",{attrs:{required:"",name:"abd_ex73",label:"家庭特征",placeholder:"点击选择家庭特征",rules:[{required:!0,message:"请选择家庭特征"}]},on:{click:function(a){e.showPicker15=!0}},model:{value:e.form.abd_ex73,callback:function(a){e.$set(e.form,"abd_ex73",a)},expression:"form.abd_ex73"}}),a("van-popup",{attrs:{position:"bottom"},model:{value:e.showPicker15,callback:function(a){e.showPicker15=a},expression:"showPicker15"}},[a("van-picker",{attrs:{"show-toolbar":"",columns:e.columns5},on:{confirm:function(a){return e.onConfirm11(a,e.form,"abd_ex73","showPicker15")},cancel:function(a){e.showPicker15=!1}}})],1),a("van-field",{attrs:{center:"",name:"abd_ex20",maxlength:"11",type:"number",required:"",label:"联系电话",placeholder:"联系电话",rules:[{required:!0,message:"请填写联系电话"}]},model:{value:e.form.abd_ex20,callback:function(a){e.$set(e.form,"abd_ex20",a)},expression:"form.abd_ex20"}}),a("van-field",{attrs:{readonly:"",clickable:"",name:"abd_dat5",value:e.form.abd_dat5,label:"申请时间",placeholder:"点击选择申请时间"},on:{click:function(a){e.showPicker16=!0}}}),a("van-popup",{attrs:{position:"bottom"},model:{value:e.showPicker16,callback:function(a){e.showPicker16=a},expression:"showPicker16"}},[a("van-datetime-picker",{attrs:{type:"date"},on:{confirm:function(a){return e.onConfirm2(a,e.index)},cancel:function(a){e.showPicker16=!1}},model:{value:e.abd_dat5_2,callback:function(a){e.abd_dat5_2=a},expression:"abd_dat5_2"}})],1),a("van-field",{attrs:{name:"abd_ex103",label:"求助属实类别",required:"",rules:[{required:!0,message:"请选择求助属实类别"}]},scopedSlots:e._u([{key:"input",fn:function(){return[a("van-checkbox-group",{attrs:{direction:"horizontal"},on:{change:e.sslbChange},model:{value:e.abd_ex103,callback:function(a){e.abd_ex103=a},expression:"abd_ex103"}},[a("van-checkbox",{staticClass:"marginstyle",attrs:{disabled:e.sslbDisabled1,name:"残疾人两项补贴",shape:"square"}},[e._v("残疾人两项补贴")]),a("van-checkbox",{staticClass:"marginstyle",attrs:{disabled:e.sslbDisabled2,name:"不符合救助条件",shape:"square"}},[e._v("不符合救助条件")])],1)]},proxy:!0}])}),a("van-field",{attrs:{name:"abd_ex77",label:"原因分类",required:"",rules:[{required:!0,message:"请选择原因分类"}]},scopedSlots:e._u([{key:"input",fn:function(){return[a("van-checkbox-group",{attrs:{direction:"horizontal"},model:{value:e.abd_ex77,callback:function(a){e.abd_ex77=a},expression:"abd_ex77"}},[a("van-checkbox",{staticClass:"marginstyle",attrs:{name:"疾病",shape:"square"}},[e._v("疾病")]),a("van-checkbox",{staticClass:"marginstyle",attrs:{name:"受灾",shape:"square"}},[e._v("受灾")]),a("van-checkbox",{staticClass:"marginstyle",attrs:{name:"教育",shape:"square"}},[e._v("教育")]),a("van-checkbox",{staticClass:"marginstyle",attrs:{name:"住房",shape:"square"}},[e._v("住房")]),a("van-checkbox",{staticClass:"marginstyle",attrs:{name:"残疾",shape:"square"}},[e._v("残疾")]),a("van-checkbox",{staticClass:"marginstyle",attrs:{name:"缺乏劳动力",shape:"square"}},[e._v("缺乏劳动力")]),a("van-checkbox",{staticClass:"marginstyle",attrs:{name:"无生活来源",shape:"square"}},[e._v("无生活来源")]),a("van-checkbox",{staticClass:"marginstyle",attrs:{name:"其他",shape:"square"}},[e._v("其他")])],1)]},proxy:!0}])}),a("van-field",{attrs:{name:"abd_ex75",label:"是否属于村干部或近亲属",required:"",rules:[{required:!0,message:"请选择是否属于村干部或近亲属"}]},scopedSlots:e._u([{key:"input",fn:function(){return[a("van-radio-group",{attrs:{direction:"horizontal"},model:{value:e.form.abd_ex75,callback:function(a){e.$set(e.form,"abd_ex75",a)},expression:"form.abd_ex75"}},[a("van-radio",{attrs:{name:"是"}},[e._v("是")]),a("van-radio",{attrs:{name:"否"}},[e._v("否")])],1)]},proxy:!0}])}),a("div",{staticClass:"page1Div2"},[e._v("     "),a("span",{staticClass:"page1Div2Font"},[e._v("其他信息")])]),a("van-field",{attrs:{name:"abd_ex23",maxlength:"15",label:"开户银行",placeholder:"开户银行",required:"",rules:[{required:!0,message:"请填写开户银行"}]},model:{value:e.form.abd_ex23,callback:function(a){e.$set(e.form,"abd_ex23",a)},expression:"form.abd_ex23"}}),a("van-field",{attrs:{center:"",name:"abd_ex78",maxlength:"15",label:"开户人",placeholder:"开户人",required:"",rules:[{required:!0,message:"请填写开户人"}]},model:{value:e.form.abd_ex78,callback:function(a){e.$set(e.form,"abd_ex78",a)},expression:"form.abd_ex78"}}),a("van-field",{attrs:{center:"",name:"abd_ex24",maxlength:"22",label:"银行账号",placeholder:"银行账号",required:"",rules:[{required:!0,message:"请填写银行账号"}],onkeyup:"value=value.replace(/[^\\dx]/gi,'')"},model:{value:e.form.abd_ex24,callback:function(a){e.$set(e.form,"abd_ex24",a)},expression:"form.abd_ex24"}}),a("div",{staticClass:"page1Div2"},[e._v("     "),a("span",{staticClass:"page1Div2Font"},[e._v("自定义预警")])]),e._l(e.warning,(function(t,s){return a("van-cell-group",{key:s},[a("van-field",{attrs:{name:"message",maxlength:"50",rows:"1",autosize:"",label:"预警内容",type:"textarea",placeholder:"请输入预警内容"},model:{value:t.aw_ex1,callback:function(a){e.$set(t,"aw_ex1",a)},expression:"item.aw_ex1"}}),a("van-field",{attrs:{readonly:"",clickable:"",name:"time",value:t.aw_dat1,label:"预警时间",placeholder:"点击选择预警时间"},on:{click:function(e){t.showPicker=!0}}}),a("van-popup",{attrs:{position:"bottom"},model:{value:t.showPicker,callback:function(a){e.$set(t,"showPicker",a)},expression:"item.showPicker"}},[a("van-datetime-picker",{attrs:{type:"date"},on:{confirm:function(a){return e.onConfirm(a,s)},cancel:function(e){t.showPicker=!1}},model:{value:t.currentDate,callback:function(a){e.$set(t,"currentDate",a)},expression:"item.currentDate"}})],1)],1)})),a("div",{staticStyle:{width:"100%",position:"fixed",bottom:"0px","text-align":"center",display:"flex","justify-content":"space-around"}},[a("van-button",{attrs:{block:"",type:"info","native-type":"button"},on:{click:e.next1}},[e._v("下一步")])],1)],2)],1),a("div",{directives:[{name:"show",rawName:"v-show",value:e.page2,expression:"page2"}],staticClass:"page2Div",attrs:{id:"page2"}},[a("div",{staticClass:"page2Div2"},[e._m(1),a("van-form",{staticStyle:{"margin-top":"20px"}},[a("van-field",{attrs:{name:"abd_ex83",label:"工资性收入",placeholder:"工资性收入",rules:[{required:!0,message:"请填写工资性收入"}],type:"number"},on:{input:e.changeAmt},model:{value:e.form.abd_ex83,callback:function(a){e.$set(e.form,"abd_ex83",a)},expression:"form.abd_ex83"}}),a("van-field",{attrs:{name:"abd_ex84",label:"经营净收入",placeholder:"经营净收入",rules:[{required:!0,message:"请填写经营净收入"}],type:"number"},on:{input:e.changeAmt},model:{value:e.form.abd_ex84,callback:function(a){e.$set(e.form,"abd_ex84",a)},expression:"form.abd_ex84"}}),a("van-field",{attrs:{name:"abd_ex85",label:"财产净收入",placeholder:"财产净收入",rules:[{required:!0,message:"请填写财产净收入"}],type:"number"},on:{input:e.changeAmt},model:{value:e.form.abd_ex85,callback:function(a){e.$set(e.form,"abd_ex85",a)},expression:"form.abd_ex85"}}),a("van-field",{attrs:{name:"abd_ex86",label:"转移净收入",placeholder:"转移净收入",rules:[{required:!0,message:"请填写转移净收入"}],type:"number"},on:{input:e.changeAmt},model:{value:e.form.abd_ex86,callback:function(a){e.$set(e.form,"abd_ex86",a)},expression:"form.abd_ex86"}}),a("van-field",{attrs:{name:"abd_ex87",label:"其他收入",placeholder:"其他收入",rules:[{required:!0,message:"请填写其他收入"}],type:"number"},on:{input:e.changeAmt},model:{value:e.form.abd_ex87,callback:function(a){e.$set(e.form,"abd_ex87",a)},expression:"form.abd_ex87"}}),a("van-field",{attrs:{name:"abd_ex88",label:"家庭总收入",placeholder:"家庭总收入",rules:[{required:!0,message:"请填写家庭总收入"}],type:"number"},on:{input:e.change},model:{value:e.form.abd_ex88,callback:function(a){e.$set(e.form,"abd_ex88",a)},expression:"form.abd_ex88"}}),a("van-field",{attrs:{name:"abd_ex89",label:"家庭月平均收入",placeholder:"家庭月平均收入",rules:[{required:!0,message:"请填写家庭月平均收入"}],type:"number"},model:{value:e.form.abd_ex89,callback:function(a){e.$set(e.form,"abd_ex89",a)},expression:"form.abd_ex89"}}),a("van-field",{attrs:{name:"abd_ex89_",disabled:"",label:"家庭月人均收入",placeholder:"家庭月人均收入",type:"number"},model:{value:e.form.abd_ex89_,callback:function(a){e.$set(e.form,"abd_ex89_",a)},expression:"form.abd_ex89_"}}),a("van-field",{attrs:{name:"abd_ex90",label:"低保标准",placeholder:"低保标准",disabled:"",type:"number"},model:{value:e.form.abd_ex90,callback:function(a){e.$set(e.form,"abd_ex90",a)},expression:"form.abd_ex90"}}),a("van-field",{attrs:{name:"abd_ex91",label:"家庭月保障金额",placeholder:"家庭月保障金额",rules:[{required:!0,message:"请填写家庭月保障金额"}],type:"number"},model:{value:e.form.abd_ex91,callback:function(a){e.$set(e.form,"abd_ex91",a)},expression:"form.abd_ex91"}}),a("van-field",{attrs:{name:"abd_ex72",label:"月享受金额",placeholder:"月享受金额",type:"number"},model:{value:e.form.abd_ex72,callback:function(a){e.$set(e.form,"abd_ex72",a)},expression:"form.abd_ex72"}}),a("van-field",{attrs:{name:"abd_ex42",label:"护理补贴金额",placeholder:"护理补贴金额",type:"number"},model:{value:e.form.abd_ex42,callback:function(a){e.$set(e.form,"abd_ex42",a)},expression:"form.abd_ex42"}}),a("van-field",{attrs:{name:"abd_ex71",label:"增发金额",placeholder:"增发金额",type:"number"},model:{value:e.form.abd_ex71,callback:function(a){e.$set(e.form,"abd_ex71",a)},expression:"form.abd_ex71"}}),a("div",{staticStyle:{"border-bottom":"10px solid #f3f3f3"}})],1)],1),a("div",{staticStyle:{width:"100%",position:"fixed",bottom:"0px","text-align":"center",display:"flex","justify-content":"space-around"}},[a("van-button",{attrs:{block:"","native-type":"button"},on:{click:e.back2}},[e._v("上一步")]),a("van-button",{attrs:{block:"",type:"info","native-type":"button"},on:{click:e.next2}},[e._v("下一步")])],1)]),a("div",{directives:[{name:"show",rawName:"v-show",value:e.page3,expression:"page3"}],staticClass:"page2Div",attrs:{id:"page3"}},[a("div",{staticClass:"page2Div2"},[e._m(2),a("van-form",{staticStyle:{"margin-top":"20px"}},[a("van-field",{attrs:{name:"abd_ex79",type:"number",label:"银行总存款",placeholder:"银行总存款",rules:[{required:!0,message:"请填写银行总存款"}]},model:{value:e.form.abd_ex79,callback:function(a){e.$set(e.form,"abd_ex79",a)},expression:"form.abd_ex79"}}),a("van-field",{attrs:{name:"abd_ex80",label:"有价证券",placeholder:"有价证券",rules:[{required:!0,message:"请填写有价证券"}]},model:{value:e.form.abd_ex80,callback:function(a){e.$set(e.form,"abd_ex80",a)},expression:"form.abd_ex80"}}),a("van-field",{attrs:{name:"abd_ex81",label:"债权",placeholder:"债权",rules:[{required:!0,message:"请填写债权"}]},model:{value:e.form.abd_ex81,callback:function(a){e.$set(e.form,"abd_ex81",a)},expression:"form.abd_ex81"}}),a("van-field",{attrs:{name:"abd_ex82",label:"其他金融产品",placeholder:"其他金融产品",rules:[{required:!0,message:"请填写其他金融产品"}]},model:{value:e.form.abd_ex82,callback:function(a){e.$set(e.form,"abd_ex82",a)},expression:"form.abd_ex82"}}),a("div",{staticStyle:{"border-bottom":"10px solid #f3f3f3"}})],1)],1),a("div",{staticStyle:{width:"100%",position:"fixed",bottom:"0px","text-align":"center",display:"flex","justify-content":"space-around"}},[a("van-button",{attrs:{block:"","native-type":"button"},on:{click:e.back3}},[e._v("上一步")]),a("van-button",{attrs:{block:"",type:"info","native-type":"button"},on:{click:e.next3}},[e._v("下一步")])],1)]),a("div",{directives:[{name:"show",rawName:"v-show",value:e.page4,expression:"page4"}],staticClass:"page4Div",attrs:{id:"page4"}},[a("div",{staticClass:"page4Div2"},[e._m(3),a("div",{staticClass:"page4Div3"},[a("div",{staticClass:"page4Div3Font"},[e._v("身份证照片:")]),a("div",{staticStyle:{"margin-top":"10px"}},[a("div",{staticStyle:{position:"relative",width:"100%",float:"left"}},[a("div",{staticClass:"page4Div4"},[a("van-uploader",{attrs:{"before-read":e.beforeRead,"max-count":1,"after-read":e.uploadImg(1),"before-delete":e.beforeDelete("abd_ex37_1")},model:{value:e.fileList,callback:function(a){e.fileList=a},expression:"fileList"}}),a("br"),a("span",[e._v("上传身份证正面")])],1),a("div",{staticClass:"page4Div5"},[a("van-uploader",{attrs:{"before-read":e.beforeRead,"max-count":1,"after-read":e.uploadImg(2),"before-delete":e.beforeDelete("abd_ex37_2")},model:{value:e.fileList2,callback:function(a){e.fileList2=a},expression:"fileList2"}}),a("br"),a("span",[e._v("上传身份证反面")])],1)])])])]),a("div",{staticClass:"page4Div6"},[a("div",{staticClass:"page4Div3"},[a("div",{staticClass:"page4Div3Font"},[e._v("授权书及民主评议:")]),a("div",{staticStyle:{"margin-top":"10px"}},[a("div",{staticStyle:{position:"relative",width:"100%",float:"left"}},[a("div",{staticClass:"page4Div4"},[a("van-uploader",{attrs:{"before-read":e.beforeRead,"max-count":1,"after-read":e.uploadImg(3),"before-delete":e.beforeDelete("abd_ex92")},model:{value:e.fileList3,callback:function(a){e.fileList3=a},expression:"fileList3"}}),a("br"),a("span",[e._v("上传授权书照片")])],1),a("div",{staticClass:"page4Div5",attrs:{id:"sfzm2"}},[a("van-uploader",{attrs:{"before-read":e.beforeRead,"max-count":1,"after-read":e.uploadImg(5),"before-delete":e.beforeDelete("abd_ex96")},model:{value:e.fileList4,callback:function(a){e.fileList4=a},expression:"fileList4"}}),a("br"),a("span",[e._v("民主评议")])],1)])])])]),a("div",{staticClass:"page4Div7"},[a("div",{staticClass:"page4Div7Font"},[e._v("其他证明材料:")]),a("div",{staticStyle:{"margin-top":"10px"}},[a("div",{staticStyle:{position:"relative",width:"91%",float:"left"},attrs:{id:"zmcl"}},[a("van-uploader",{attrs:{"before-read":e.beforeRead,"after-read":e.uploadImg(4),"before-delete":e.beforeDelete("abd_ex38")},model:{value:e.fileList5,callback:function(a){e.fileList5=a},expression:"fileList5"}})],1)])]),a("div",{staticClass:"page2Div2"},[e._m(4),a("van-form",{staticStyle:{"margin-top":"20px"}},[a("van-field",{attrs:{required:"",readonly:"",clickable:"",name:"abd_ex100",value:e.form.abd_ex100,label:"情况是否属实",placeholder:"点击选择情况是否属实"},on:{click:function(a){e.showPicker61=!0}}}),a("van-popup",{attrs:{position:"bottom"},model:{value:e.showPicker61,callback:function(a){e.showPicker61=a},expression:"showPicker61"}},[a("van-picker",{attrs:{"show-toolbar":"",columns:e.columns16},on:{confirm:e.onConfirm61,cancel:function(a){e.showPicker61=!1}}})],1),a("van-field",{attrs:{disabled:"",value:"调查人以' , '分隔(如 张三,李四 )"}}),a("van-field",{attrs:{name:"abd_ex101",maxlength:"30",label:"调查人",placeholder:"调查人",required:"",rules:[{required:!0,message:"请填写调查人"}]},model:{value:e.form.abd_ex101,callback:function(a){e.$set(e.form,"abd_ex101",a)},expression:"form.abd_ex101"}}),a("van-field",{attrs:{name:"abd_ex102",maxlength:"50",label:"备注",placeholder:"备注",required:"",rules:[{required:!0,message:"请填写备注"}]},model:{value:e.form.abd_ex102,callback:function(a){e.$set(e.form,"abd_ex102",a)},expression:"form.abd_ex102"}})],1)],1),a("div",{staticStyle:{width:"100%",position:"fixed",bottom:"0px","text-align":"center",display:"flex","justify-content":"space-around"}},[a("van-button",{attrs:{block:""},on:{click:e.back4}},[e._v("上一步")]),a("van-button",{attrs:{block:"",type:"info"},on:{click:e.save}},[e._v("提交")])],1)])])])},i=[function(){var e=this,a=e._self._c;return a("div",{staticClass:"page1Div2"},[e._v("     "),a("span",{staticClass:"page1Div2Font"},[e._v("基本信息")])])},function(){var e=this,a=e._self._c;return a("div",{staticClass:"page2Div3"},[a("span",{staticClass:"page2Div3Div"}),a("span",{staticClass:"page2Div3Font"},[e._v("家庭前12个月总收入情况")])])},function(){var e=this,a=e._self._c;return a("div",{staticClass:"page2Div3"},[a("span",{staticClass:"page2Div3Div"}),a("span",{staticClass:"page2Div3Font"},[e._v("金融资产")])])},function(){var e=this,a=e._self._c;return a("div",{staticClass:"page2Div3"},[a("span",{staticClass:"page2Div3Div"}),a("span",{staticClass:"page2Div3Font"},[e._v("照片")])])},function(){var e=this,a=e._self._c;return a("div",{staticClass:"page2Div3"},[a("span",{staticClass:"page2Div3Div"}),a("span",{staticClass:"page2Div3Font"},[e._v("核查结果(不属实将自动生成诚信记录)")])])}],o=t("b775"),r=t("fa7d"),l={data(){return{sslbDisabled1:!1,sslbDisabled2:!1,showPicker11:!1,showPicker12:!1,showPicker13:!1,showPicker14:!1,showPicker15:!1,showPicker16:!1,abd_dat5_2:new Date,typelx:this.$route.query.type,isShow:!0,isShow2:!1,isShow3:!1,isShow4:!1,isShow5:!1,isShow6:!1,page1:!0,page2:!1,page3:!1,page4:!1,page5:!1,page6:!1,fileList:[],fileList2:[],fileList3:[],fileList4:[],fileList5:[],abd_ex103:[],showPicker61:!1,abd_ex77:[],form:{},warning:[{aw_ex1:"",aw_dat1:"",currentDate:new Date,showPicker:!1},{aw_ex1:"",aw_dat1:"",currentDate:new Date,showPicker:!1},{aw_ex1:"",aw_dat1:"",currentDate:new Date,showPicker:!1},{aw_ex1:"",aw_dat1:"",currentDate:new Date,showPicker:!1},{aw_ex1:"",aw_dat1:"",currentDate:new Date,showPicker:!1}],showxzqh:!1,columns2:["肢体","精神","智力","盲视力","言语","听力"],columns3:r["f"],columns4:["一级","二级","三级","四级"],columns5:["","2名以上残疾人","由达到法定退休年龄父母供养","由达到法定退休年龄的其他供养人供养"],columns6:["户主本人","父母","配偶","子女","兄弟姐妹","孙子女","其他"],columns16:["属实","不属实","转其他救助"],options:r["j"]}},created(){this.getBasic()},methods:{next1(){this.form.abd_ex2=this.form.abd_ex2.replace(/\s*/g,"");let e=Object(r["i"])(this.form.abd_ex2);if(e)return this.$toast.fail("请输入正确的姓名"),!1;let a=Object(r["e"])(this.form.abd_ex3);if(a)return this.$toast.fail(a),!1;if(parseInt(this.form.abd_ex34)>200)return this.$toast.fail("年龄不能超过200"),!1;if(this.form.abd_ex19=this.form.abd_ex19.replace(/\s*/g,""),this.form.abd_ex19=Object(r["g"])(this.form.abd_ex19),this.form.abd_ex67>20)return this.$toast.fail("家庭人口不能超过20"),!1;this.form.abd_ex23=this.form.abd_ex23.replace(/\s*/g,""),this.form.abd_ex23=Object(r["g"])(this.form.abd_ex23),this.form.abd_ex78=this.form.abd_ex78.replace(/\s*/g,""),this.form.abd_ex78=Object(r["g"])(this.form.abd_ex78);let t=/^[1][3,4,5,7,8,9][0-9]{9}$/;if(!t.test(this.form.abd_ex20))return this.$toast.fail("请填写正确的联系电话"),!1;this.warning.forEach((e,a)=>{e.aw_ex1&&e.aw_dat1&&(e.aw_ex1=e.aw_ex1.replace(/\s*/g,""),e.aw_ex1=Object(r["h"])(e.aw_ex1))}),this.$refs.rule1.validate().then(()=>{this.page1=!1,this.page2=!0,this.isShow=!1,this.isShow2=!0,document.getElementsByClassName("dbjz")[0].scrollTop=0}).catch(e=>{this.$toast.fail(e[0].message)})},next2(){this.page2=!1,this.page3=!0,this.isShow2=!1,this.isShow3=!0,document.getElementsByClassName("dbjz")[0].scrollTop=0},next3(){this.form.abd_ex80=this.form.abd_ex80.replace(/\s*/g,""),this.form.abd_ex80=Object(r["g"])(this.form.abd_ex80),this.form.abd_ex81=this.form.abd_ex81.replace(/\s*/g,""),this.form.abd_ex81=Object(r["g"])(this.form.abd_ex81),this.form.abd_ex82=this.form.abd_ex82.replace(/\s*/g,""),this.form.abd_ex82=Object(r["g"])(this.form.abd_ex82),this.page3=!1,this.page4=!0,this.isShow3=!1,this.isShow4=!0,document.getElementsByClassName("dbjz")[0].scrollTop=0},next4(){this.page4=!1,this.page5=!0,this.isShow4=!1,this.isShow5=!0,document.getElementsByClassName("dbjz")[0].scrollTop=0},back2(){this.page2=!1,this.page1=!0,this.isShow2=!1,this.isShow=!0,document.getElementsByClassName("dbjz")[0].scrollTop=0},back3(){this.page3=!1,this.page2=!0,this.isShow3=!1,this.isShow2=!0,document.getElementsByClassName("dbjz")[0].scrollTop=0},back4(){this.page4=!1,this.page3=!0,this.isShow4=!1,this.isShow3=!0,document.getElementsByClassName("dbjz")[0].scrollTop=0},onFinish({selectedOptions:e}){this.showxzqh=!1;let a=e.map(e=>e.text),t=e.map(e=>e.text+e.value);console.log(t),console.log(a),this.form.abd_ex26=a[2],this.form.abd_ex1=a[1],this.form.abd_ex27=a[0],this.form.abd_ex28_2=a.join("/"),this.form.abd_ex28=t.join(","),""==this.form.abd_ex19&&(this.form.abd_ex19=a[0]+a[1]+a[2]),""==this.form.abd_ex18&&(this.form.abd_ex18=a[0]+a[1]+a[2])},beforeRead(e){return"image/heic"!=e.type&&""!=e.type||(this.$toast.fail("照片格式不正确"),!1)},imgRequest(e,a,t){Object(o["a"])({method:"post",url:"/social/weixinMinios/fileUpload",data:e}).then(e=>{a.status="done",a.message="上传完成",1==t?this.form.abd_ex37_1=e[0].filename:2==t?this.form.abd_ex37_2=e[0].filename:3==t?this.form.abd_ex92=e[0].filename:4==t?(this.form.abd_ex38?this.form.abd_ex38=this.form.abd_ex38.concat(",",e[0].filename):this.form.abd_ex38=this.form.abd_ex38.concat(e[0].filename),console.log(this.form.abd_ex38)):5==t&&(this.form.abd_ex96=e[0].filename)}).catch(e=>{a.status="failed",a.message="上传失败",1==t?this.fileList.pop():2==t?this.fileList2.pop():3==t?this.fileList3.pop():4==t?this.fileList5.pop():5==t&&this.fileList4.pop(),this.$toast.fail("上传失败"),console.log(e)})},uploadImg(e){return a=>{console.log(a),console.log(this.fileList),console.log(e),a.status="uploading",a.message="上传中...";new r["a"](a,e,this.imgRequest)}},beforeDelete(e){return(a,t)=>{let s=this.form[e].split(",");return s.splice(t.index,1),this.form[e]=s.join(","),console.log(this.form[e]),console.log(e),console.log(a),console.log(t),!0}},onConfirm(e,a){console.log(a);let t=e.getFullYear()+"-",s=(e.getMonth()+1<10?"0"+(e.getMonth()+1):e.getMonth()+1)+"-",i=e.getDate()<10?"0"+e.getDate():e.getDate();this.warning[a].aw_dat1=t+s+i,this.warning[a].showPicker=!1},onConfirm2(e){let a=e.getFullYear()+"-",t=(e.getMonth()+1<10?"0"+(e.getMonth()+1):e.getMonth()+1)+"-",s=e.getDate()<10?"0"+e.getDate():e.getDate();this.form.abd_dat5=a+t+s,this.showPicker16=!1},onConfirm11(e,a,t,s){a[t]=e,this[s]=!1},onConfirm61(e){this.form.abd_ex100=e,this.showPicker61=!1},getBasic(){Object(o["a"])({method:"post",url:"/social/assistanceWeixin/getCJBasic",data:{sId:this.$route.query.sId},headers:{token:sessionStorage.getItem("token")}}).then(e=>{let a=e[0].data[0],t=e[0].waring;this.form=a,this.changeSfz(a.abd_ex3),this.form.abd_ex89_=(a.abd_ex89/a.abd_ex67).toFixed(2),a.abd_ex77&&(this.abd_ex77=a.abd_ex77.split(",")),""==a.abd_ex78&&(this.form.abd_ex78=a.abd_ex2),a.abd_ex103&&(this.abd_ex103=a.abd_ex103.split(","),this.sslbChange(this.abd_ex103));var s=a.abd_ex37.split(",");if(this.form.abd_ex37_1=s[0],this.form.abd_ex37_2=s.length>1?s[1]:"",this.form.abd_ex37_1&&(console.log(this.form.abd_ex37_1),this.imageView(this.form.abd_ex37_1).then(e=>{console.log(e),this.fileList.push({url:e,isImage:!0})}).catch(e=>{console.log(e)})),this.form.abd_ex37_2&&this.imageView(this.form.abd_ex37_2).then(e=>{this.fileList2.push({url:e,isImage:!0}),console.log(this.fileList2)}).catch(e=>{console.log(e)}),a.abd_ex92){let e=a.abd_ex92.split(",");this.imageView(e[0]).then(e=>{this.fileList3.push({url:e,isImage:!0})}).catch(e=>{console.log(e)})}if(a.abd_ex38){let e=a.abd_ex38.split(",");console.log(this.fileList5),e.forEach((e,a)=>{this.imageView(e).then(e=>{this.fileList5.push({url:e,isImage:!0})}).catch(e=>{console.log(e)})})}if(a.abd_ex96){let e=a.abd_ex96.split(",");this.imageView(e[0]).then(e=>{this.fileList4.push({url:e,isImage:!0}),console.log(this.fileList4)}).catch(e=>{console.log(e)})}console.log(this.$route.query.sId),this.$route.query.sId&&(console.log(this.form.abd_ex28),""!=a.abd_ex27&&""!=a.abd_ex1&&""!=a.abd_ex26&&(this.form.abd_ex28_2=a.abd_ex27+"/"+a.abd_ex1+"/"+a.abd_ex26)),t.length>0&&(this.warning=t,t.forEach((e,a)=>{this.$set(this.warning[a],"showPicker",!1),console.log(this.warning)})),""==a.abd_ex23&&(this.form.abd_ex23="泰兴农商行")}).catch(e=>{})},save(){let e=this.$toast({type:"loading",message:"提交中...",overlay:!0,duration:0});if(0==this.fileList.length)return this.$toast.fail("身份证正面不能为空"),!1;if(0==this.fileList2.length)return this.$toast.fail("身份证反面不能为空"),!1;if(0==this.fileList5.length)return this.$toast.fail("其他证明材料不能为空"),!1;if(!this.form.abd_ex100)return this.$toast.fail("请选择情况是否属实"),!1;if(!this.form.abd_ex101)return this.$toast.fail("请填写调查人"),!1;if(this.form.abd_ex101&&this.form.abd_ex101.split(",").length<2&&this.form.abd_ex101.split("，").length<2)return this.$toast.fail("调查人数不能少于两人"),!1;if(!this.form.abd_ex102)return this.$toast.fail("请填写备注"),!1;this.form.abd_ex101=this.form.abd_ex101.replace(/\s*/g,""),this.form.abd_ex101=Object(r["h"])(this.form.abd_ex101),this.form.abd_ex102=this.form.abd_ex102.replace(/\s*/g,""),this.form.abd_ex102=Object(r["h"])(this.form.abd_ex102),this.abd_ex103.length>0&&(this.form.abd_ex103=this.abd_ex103.join(",")),this.form.abd_ex37=this.form.abd_ex37_1+","+this.form.abd_ex37_2,this.form.abd_ex77=this.abd_ex77.join(),this.form.stype=this.$route.query.type,console.log(this.form);let a=[];this.warning.forEach((e,t)=>{e.aw_ex1&&e.aw_dat1&&a.push(e)}),console.log(a),Object(o["a"])({method:"post",url:"/social/assistanceWeixin/saveBasic",data:{data:"["+JSON.stringify(this.form)+"]",waring:JSON.stringify(a),isHc:"Y",isCf:"Y",type:"核查"},headers:{token:sessionStorage.getItem("token")}}).then(a=>{e.clear(),this.$dialog.alert({message:a[0].msg}).then(()=>{this.$router.go(-1)})}).catch(a=>{e.clear(),console.log(a)})},sslbChange(e){e.length>0?1==e.length&&"不符合救助条件"==e[0]?this.sslbDisabled1=!0:this.sslbDisabled2=!0:(this.sslbDisabled1=!1,this.sslbDisabled2=!1)},change(e){console.log(e),console.log("change方法"),this.form.abd_ex89=(e/12).toFixed(2),this.form.abd_ex89_=(this.form.abd_ex89/this.form.abd_ex67).toFixed(2),this.changeAmt("change")},changeSfz(e){""==Object(r["e"])(e)&&(this.form.abd_ex12=Object(r["d"])(e),this.form.abd_ex34=Object(r["b"])(e))},imageView(e){return Object(o["a"])({method:"post",url:e,headers:{token:sessionStorage.getItem("token")},data:{}})},changeAmt(e){let a=this.form.abd_ex83?parseInt(this.form.abd_ex83):0,t=this.form.abd_ex84?parseInt(this.form.abd_ex84):0,s=this.form.abd_ex85?parseInt(this.form.abd_ex85):0,i=this.form.abd_ex86?parseInt(this.form.abd_ex86):0,o=this.form.abd_ex87?parseInt(this.form.abd_ex87):0;var r=a+t+s+i+o;"true"!=e&&r&&(this.form.abd_ex88=r,this.form.abd_ex89=(r/12).toFixed(2))}}},n=l,d=(t("fe6e"),t("2877")),c=Object(d["a"])(n,s,i,!1,null,"7fd7d504",null);a["default"]=c.exports},fe6e:function(e,a,t){"use strict";t("1d43")}}]);
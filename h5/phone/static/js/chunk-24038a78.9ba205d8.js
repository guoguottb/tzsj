(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-24038a78"],{"1f65":function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e._self._c;return t("div",{staticClass:"dbhc"},[t("header",[e._v(" 上门走访 ")]),t("main",[t("van-search",{attrs:{"show-action":"",clearable:"",placeholder:"请输入姓名/身份证号码"},on:{search:e.onSearch},scopedSlots:e._u([{key:"action",fn:function(){return[t("div",{on:{click:e.onSearch}},[e._v("搜索")])]},proxy:!0}]),model:{value:e.searchValue,callback:function(t){e.searchValue="string"===typeof t?t.trim():t},expression:"searchValue"}}),e.show?t("van-dropdown-menu",[t("van-dropdown-item",{attrs:{options:e.option1},on:{change:e.change1},model:{value:e.value1,callback:function(t){e.value1=t},expression:"value1"}}),t("van-dropdown-item",{attrs:{options:e.option2},on:{change:e.change2},model:{value:e.value2,callback:function(t){e.value2=t},expression:"value2"}})],1):e._e(),t("van-pull-refresh",{on:{refresh:e.onRefresh},model:{value:e.refreshing,callback:function(t){e.refreshing=t},expression:"refreshing"}},[t("van-list",{attrs:{finished:e.finished,"finished-text":"没有更多了"},on:{load:e.onLoad},model:{value:e.loading,callback:function(t){e.loading=t},expression:"loading"}},e._l(e.items,(function(a,s){return t("div",{key:s},[t("div",{staticClass:"hc"},[t("div",{staticClass:"boxTop",on:{click:function(t){return e.goInspect(a)}}},[t("div",{staticClass:"hcHeader"},[t("div",{staticClass:"hcHeader1"},[t("div",{staticClass:"circle",style:{backgroundColor:a.bgcolor}})]),t("div",{staticStyle:{color:"#666666"}},[e._v("完成情况："+e._s(a.completionStatus))])]),t("div",{staticClass:"hcHeader3"},[t("div",[e._v("走访人员："+e._s(a.personName))])]),t("div",{staticClass:"hcHeader3"},[t("div",[e._v("被走访人员姓名："+e._s(a.visitName))])]),t("div",{staticClass:"hcHeader3"},[t("div",[e._v(" 被走访人员身份证："+e._s(a.visitIdCard))])]),t("div",{staticClass:"hcHeader3"},[t("div",[e._v("被走访人员保障类型："+e._s(a.supportType))])]),t("div",{staticClass:"hcHeader3"},[t("div",[e._v(" 创建时间："+e._s(a.createTime))])])]),"已完成"===a.completionStatus?t("div",{staticClass:"boxBottom"},[t("van-row",[t("van-col",{attrs:{span:"18"}}),t("van-col",{attrs:{span:"6"}},[t("a",{staticStyle:{color:"#3E80CC"},attrs:{href:"javascript:;"},on:{click:function(t){return e.createWork(a)}}},[e._v("创建工单")])])],1)],1):e._e()]),t("div",{staticClass:"footBtn"})])})),0)],1)],1)])},i=[],o=a("5d66"),r={name:"reexaminationList",data(){return{historySearch:"",items:[],page:1,bgcolor:"#bcbcbc",loading:!1,finished:!1,refreshing:!1,searchValue:"",key:"",show:!0,value1:"",value2:"未完成",option1:[],option2:[{text:"未完成",value:"未完成"},{text:"已完成",value:"已完成"}]}},created(){},watch:{},methods:{async getNotFinishBatchList(e){try{const t=await Object(o["b"])(e);if(200!==t.code)return this.$toast.fail(t.msg);t.data.length||(this.show=!1),this.option1=t.data,this.value1=this.option1[0].value}catch(error){}},async loadData(e){try{const{data:t}=await Object(o["c"])(e);this.historySearch=e,this.items=[...this.items,...t.content],this.items.length===t.totalElements&&(this.finished=!0),t.key?this.key=t.key:this.key="",this.page=this.page+1,this.loading=!1}catch(error){}},async onLoad(){this.value1||await this.getNotFinishBatchList({}),this.refreshing&&(this.item=[],this.refreshing=!1),this.historySearch&&(this.historySearch.pageNo=this.page),this.loadData(this.historySearch||{batchId:this.value1,completionStatus:this.value2,key:this.searchValue,pageNo:this.page,pageSize:10})},onRefresh(){this.resetInfo(),this.finished=!1,this.loading=!0,this.onLoad()},onSearch(){this.resetInfo(),this.loadData({key:this.searchValue,batchId:this.value1,completionStatus:this.value2,key:this.searchValue,notNeedPage:!1,pageNo:1,pageSize:10})},createWork(e){this.$router.push(`/WorkOrderDetails?familyId=${e.familyId}&personId=${e.personId}`)},resetInfo(){this.items=[],this.page=1,this.key=""},goInspect(e){this.$router.push(e.viewRoute)},change1(e){this.historySearch.batchId=e,this.historySearch.pageNo=1,this.items=[],this.loadData(this.historySearch)},change2(e){this.historySearch.completionStatus=e,this.historySearch.pageNo=1,this.items=[],this.loadData(this.historySearch)}}},n=r,c=(a("d823"),a("2877")),h=Object(c["a"])(n,s,i,!1,null,"a0b7d262",null);t["default"]=h.exports},"5d66":function(e,t,a){"use strict";a.d(t,"d",(function(){return i})),a.d(t,"b",(function(){return o})),a.d(t,"c",(function(){return r})),a.d(t,"a",(function(){return n}));var s=a("b775");const i=e=>Object(s["a"])({method:"POST",url:"/social/SocialWorkOperate/visitPersonRateService",data:e}),o=e=>Object(s["a"])({method:"POST",url:"/social/SocialWorkOperate/getNotFinishBatchList",data:e}),r=e=>Object(s["a"])({method:"POST",url:"/social/SocialWorkOperate/getRecordList",data:e}),n=e=>Object(s["a"])({method:"POST",url:"/social/SocialWorkOrder/createOrder",data:e})},9467:function(e,t,a){},b775:function(e,t,a){"use strict";var s=a("bc3a"),i=a.n(s),o=a("a18c");let r=Object({NODE_ENV:"production",BASE_URL:"/phone/"}).baseURL;const n=i.a.create({baseURL:r,timeout:3e4});n.interceptors.request.use(e=>(sessionStorage.token&&(e.headers.token=sessionStorage.token),e),e=>{console.log(e),Promise.reject(e)}),n.interceptors.response.use(e=>"blob"==e.config.responseType?200==e.status?e:Promise.reject(error):200===e.status?e.data:407!==e.status?Promise.reject("error1"):void 0,e=>{if(console.log("err"+e),e.response)switch(e.response.data.message){case"401":console.log("token过期了，需要重新登录"),o["a"].replace({path:"/login",query:{redirect:o["a"].currentRoute.fullPath}})}return Promise.reject(e.response.data)}),t["a"]=n},d823:function(e,t,a){"use strict";a("9467")}}]);
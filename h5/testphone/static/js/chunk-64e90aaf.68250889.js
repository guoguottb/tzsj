(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-64e90aaf"],{2477:function(e,t,s){"use strict";s("8b9f")},"8b9f":function(e,t,s){},b775:function(e,t,s){"use strict";var a=s("bc3a"),o=s.n(a),r=s("a18c");let i=Object({NODE_ENV:"production",BASE_URL:"/testphone/"}).baseURL;const n=o.a.create({baseURL:i,timeout:3e4});n.interceptors.request.use(e=>(sessionStorage.token&&(e.headers.token=sessionStorage.token),e),e=>{console.log(e),Promise.reject(e)}),n.interceptors.response.use(e=>"blob"==e.config.responseType?200==e.status?e:Promise.reject(error):200===e.status?e.data:407!==e.status?Promise.reject("error1"):void 0,e=>{if(console.log("err"+e),e.response)switch(e.response.data.message){case"401":console.log("token过期了，需要重新登录"),r["a"].replace({path:"/login",query:{redirect:r["a"].currentRoute.fullPath}})}return Promise.reject(e.response.data)}),t["a"]=n},c549:function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e._self._c;return t("div",{staticClass:"dbhc"},[t("header",[e._v(" 住房救助 ")]),t("main",[t("van-pull-refresh",{on:{refresh:e.onRefresh},model:{value:e.refreshing,callback:function(t){e.refreshing=t},expression:"refreshing"}},[t("van-list",{attrs:{finished:e.finished,"finished-text":"没有更多了"},on:{load:e.onLoad},model:{value:e.loading,callback:function(t){e.loading=t},expression:"loading"}},e._l(e.items,(function(s,a){return t("div",{key:a,staticClass:"hc",on:{click:function(t){return e.routerPush(s.arv_id)}}},[t("div",{staticClass:"hcHeader"},[t("div",{staticClass:"hcHeader1"},[t("div",{staticClass:"circle",style:{backgroundColor:s.bgcolor}}),t("div",{staticStyle:{color:"#333333"}},[e._v(e._s(s.arv_ex1)+"("+e._s(s.arv_ex8)+")")])])]),t("div",{staticClass:"hcHeader2"},[t("div",[e._v("联系电话："+e._s(s.arv_ex5))])]),t("div",{staticClass:"hcHeader3"},[e._v("现住地："+e._s(s.arv_ex3))]),t("div",{staticClass:"hcHeader4"},[e._v("申请日期："+e._s(s.arv_dat1))])])})),0)],1)],1),t("div",{staticClass:"btn_group"},[t("van-button",{staticStyle:{width:"45%"},attrs:{type:"info",block:"",to:"zjbt"}},[e._v("租金补贴")]),t("van-button",{staticStyle:{width:"45%"},attrs:{type:"info",block:"",to:"zlzf"}},[e._v("租赁住房")])],1)])},o=[],r=s("b775"),i={name:"hc",data(){return{items:[],page:1,bgcolor:"#bcbcbc",loading:!1,finished:!1,refreshing:!1}},methods:{loadData(e){return Object(r["a"])({method:"post",url:"/social/assistanceWeixin/WXListByPage?stype="+escape(escape(this.$route.query.stype)),data:e,headers:{token:sessionStorage.getItem("token")}})},onLoad(){this.refreshing&&(this.items=[],this.page=1),this.loadData({page:this.page,sqlwhere:""}).then(e=>{this.refreshing=!1,console.log(e);for(let t=0;t<e.length;t++){let s=parseInt(e[t].rownumber)-1;console.log(s),this.$set(this.items,s,{arv_ex1:unescape(e[t].arv_ex1),arv_ex8:unescape(e[t].arv_ex8),arv_ex5:unescape(e[t].arv_ex5),arv_ex3:unescape(e[t].arv_ex3),arv_dat1:unescape(e[t].arv_dat1),arv_id:e[t].arv_id})}this.loading=!1,console.log(this.items),this.page++,console.log(this.page),0==e.length&&(this.finished=!0)}).catch(e=>{console.log(e)})},onRefresh(){this.finished=!1,this.loading=!0,this.onLoad()},routerPush(e){console.log(e),console.log(this.$route.query.stype),this.$router.push({path:"/zfjz",query:{sId:e,type:this.$route.query.stype}})}},created(){}},n=i,c=(s("2477"),s("2877")),l=Object(c["a"])(n,a,o,!1,null,"f4b981ca",null);t["default"]=l.exports}}]);
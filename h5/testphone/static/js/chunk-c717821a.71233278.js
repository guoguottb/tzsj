(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c717821a"],{"0ae9":function(t,s,e){},"4d35":function(t,s,e){"use strict";e("0ae9")},b775:function(t,s,e){"use strict";var j=e("bc3a"),r=e.n(j),g=e("a18c");let i=Object({NODE_ENV:"production",BASE_URL:"/testphone/"}).baseURL;const p=r.a.create({baseURL:i,timeout:3e4});p.interceptors.request.use(t=>(sessionStorage.token&&(t.headers.token=sessionStorage.token),t),t=>{console.log(t),Promise.reject(t)}),p.interceptors.response.use(t=>"blob"==t.config.responseType?200==t.status?t:Promise.reject(error):200===t.status?t.data:407!==t.status?Promise.reject("error1"):void 0,t=>{if(console.log("err"+t),t.response)switch(t.response.data.message){case"401":console.log("token过期了，需要重新登录"),g["a"].replace({path:"/login",query:{redirect:g["a"].currentRoute.fullPath}})}return Promise.reject(t.response.data)}),s["a"]=p},bbfc:function(t,s,e){"use strict";e.r(s);var j=function(){var t=this,s=t._self._c;return s("div",{staticClass:"policyDetail"},t._l(t.fileList1,(function(e,j){return s("div",{key:j,staticStyle:{position:"relative",width:"100%",float:"left"}},[e.isImage?s("van-image",{staticStyle:{width:"auto",height:"auto"},attrs:{src:e.url}}):t._e()],1)})),0)},r=[],g=e("b775"),i=e("858e"),p={name:"policyDetail",components:{pdf:i["a"]},data(){return{fileList1:[],data:[],title:"题目",pdfPage:"1",pdfPage:1,pdfPageCount:1,imgURl:"",i:0,values:[],lsimgarr:["ls1.jpg","ls2.jpg","ls3.jpg","ls4.jpg"],kjetimgarr:["kjet1.jpg","kjet2.jpg","kjet3.jpg","kjet4.jpg"],tkimgarr:["tk1.jpg","tk2.jpg","tk3.jpg","tk4.jpg","tk5.jpg","tk6.jpg","tk7.jpg","tk8.jpg","tk9.jpg","tk10.jpg","tk11.jpg","tk12.jpg"],dbimgarr:["db1.jpg","db2.jpg","db3.jpg","db4.jpg","db5.jpg","db6.jpg","db7.jpg","db8.jpg","db9.jpg","db10.jpg","db11.jpg","db12.jpg","db13.jpg","db14.jpg","db15.jpg","db16.jpg","db17.jpg","db18.jpg","db19.jpg","db20.jpg","db21.jpg","db22.jpg","db23.jpg","db24.jpg","db25.jpg","db26.jpg","db27.jpg","db28.jpg"],dsrimgarr:["dsr1.jpg","dsr2.jpg","dsr3.jpg","dsr4.jpg","dsr5.jpg","dsr6.jpg","dsr7.jpg","dsr8.jpg","dsr9.jpg","dsr10.jpg","dsr11.jpg","dsr12.jpg","dsr13.jpg","dsr14.jpg","dsr15.jpg","dsr16.jpg","dsr17.jpg","dsr18.jpg","dsr19.jpg","dsr20.jpg","dsr21.jpg","dsr22.jpg"],cjr1:["cjr1_1.jpg","cjr1_2.jpg","cjr1_3.jpg","cjr1_4.jpg"],cjr2:["cjr2_1.jpg","cjr2_2.jpg","cjr2_3.jpg","cjr2_4.jpg"],cjr3:["cjr3_1.jpg","cjr3_2.jpg","cjr3_3.jpg","cjr3_4.jpg","cjr3_5.jpg","cjr3_6.jpg","cjr3_7.jpg","cjr3_8.jpg","cjr3_9.jpg","cjr3_10.jpg","cjr3_11.jpg","cjr3_12.jpg","cjr3_13.jpg","cjr3_14.jpg","cjr3_15.jpg","cjr3_16.jpg","cjr3_17.jpg","cjr3_18.jpg","cjr3_19.jpg","cjr3_20.jpg"]}},mounted(){},created(){this.title=this.$route.query.type,this.getPDF()},methods:{getPDF(){console.log(this.title),"江苏省最低生活保障工作规程"==this.title?this.values=this.dbimgarr:"市政府办公室关于印发泰州市临时救助实施办法的通知"==this.title?this.values=this.lsimgarr:"江苏省特困人员认定办法"==this.title?this.values=this.tkimgarr:"市政府办公室关于城乡居民最低生活保障特困人员供养困境儿童分类保障和重度残疾人护理补贴标准的通知"==this.title?this.values=this.kjetimgarr:"市政府关于印发泰州市低收入人口认定管理办法的通知"==this.title&&(this.values=this.dsrimgarr),"关于明确困难残疾人生活补贴和重度残疾人护理补贴工作相关事项的通知"==this.title&&(this.values=this.cjr1),"关于对市区三、四级智力、精神残疾人发放生活补贴的通知"==this.title&&(this.values=this.cjr2),"关于做好困难残疾人生活补贴和重度残疾人护理补贴发放管理工作的通知"==this.title&&(this.values=this.cjr3),console.log(this.values),this.putImg()},putImg(){this.values[this.i]="/social/weixinMinios/show?filename="+this.values[this.i],this.imageView(this.values[this.i]).then(t=>{this.i<this.values.length-1&&(this.i++,this.putImg()),this.fileList1.push({url:t,isImage:!0})}).catch(t=>{console.log(t)})},imageView(t){return Object(g["a"])({method:"post",async:!0,url:t,headers:{token:sessionStorage.getItem("token")},data:{}})},getData(t){Object(g["a"])({method:"post",url:"/social/assistanceWeixin/getPolicy",data:{type:t}}).then(t=>{console.log(t),this.data=t}).catch(t=>{this.$toast.fail("数据加载失败"),console.log(t)})}}},a=p,c=(e("4d35"),e("2877")),o=Object(c["a"])(a,j,r,!1,null,"565811fe",null);s["default"]=o.exports}}]);
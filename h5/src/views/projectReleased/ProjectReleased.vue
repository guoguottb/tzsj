<template>
	<div :model="helpData" class="infinite-list-wrapper" style="overflow:auto" infinite-scroll-immediate-check="true">
		<header >
			<div>我要救助</div>	
		</header>
		<div class="select-list">
			<div>
				<span>街镇：</span>
				<select style= "width: 60%; border: 0;background-color:#fff;padding: 2px 10px;border-radius: 2px;box-sizing: border-box;" :value="select1" id="select1"  @change="fn()">
					<option value="请选择">请选择</option>
					<option value="济川街道">济川街道</option>
					<option value="延令街道">延令街道</option>
					<option value="黄桥镇">黄桥镇</option>
					<option value="珊瑚镇">珊瑚镇</option>
					<option value="广陵镇">广陵镇</option>
					<option value="古溪镇">古溪镇</option>
					<option value="元竹镇">元竹镇</option>
					<option value="张桥镇">张桥镇</option>
					<option value="曲霞镇">曲霞镇</option>
					<option value="河失镇">河失镇</option>
					<option value="张甸镇">张甸镇</option>
					<option value="新街镇">新街镇</option>
					<option value="姚王街道">姚王街道</option>
					<option value="宣堡镇">宣堡镇</option>
					<option value="分界镇">分界镇</option>
					<option value="滨江镇">滨江镇</option>
					<option value="虹桥镇">虹桥镇</option>
					<option value="根思乡">根思乡</option>
				</select>
			</div>
			<div>
				<span>需求类型：</span>
				<select style= "width: 55%; border: 0;background-color:#fff;padding: 2px 10px;border-radius: 2px;box-sizing: border-box;" :value="select2"  id="select2" @change="fn()">
					<option  value="请选择">请选择</option>
					<option  value="物品">物品</option>
					<option value="资金">资金</option>
					<option value="服务">服务</option>
					<option value="其他">其他</option>
				</select>
			</div>
		</div>
		<el-row :gutter="12" style="margin:70px 0 10px 0;">
		<!-- <el-row :gutter="12" style="margin:70px 0 10px 0;" infinite-scroll-distance="0" v-infinite-scroll="load" infinite-scroll-disabled="disabled"  > -->
			<el-col :offset="1" :span="22"  >
				<ul infinite-scroll-distance="0" v-infinite-scroll="load" infinite-scroll-disabled="disabled" infinite-scroll-immediate="flase">
					<li>
						<el-card shadow="always" style="margin-top:10px;text-align:left;" v-for="(item,index) in helpData" :key="index">
							<el-row :gutter="12" style="" >
								<el-col :span="8" style="font-size:16px">
									{{item.abc_ex1}}
								</el-col>
								<el-col :span="8" style="font-size:16px;text-align:center;overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" >
									{{item.abc_ex3}}
								</el-col>
								<el-col :span="8" style="font-size:16px;text-align:right;" >
									{{item.abc_ex5}}
								</el-col>
							</el-row>
							<el-row :gutter="12" left >
								<!-- background-color:red -->
								<el-col :span="20"  class="need_content" style="">
									{{item.abc_ex6}}
								</el-col>
								<el-col :span="4">
								</el-col>
								
							</el-row>
							<el-row :gutter="12" >
								<el-col :offset="9" :span="15" style="text-align:right;" >
									<el-button size="mini" type="success" @click="routerPush('/helpLook',item.abc_id)">查看</el-button>
									<el-button size="mini" type="primary" @click="routerPush('/helpClaim',item.abc_id)">认领</el-button>
								</el-col>
							</el-row>
						</el-card>
					</li>
				</ul>
			</el-col>
		</el-row>
		 <p v-if="loading">加载中...</p>
		<p v-if="noMore">没有更多了</p>
		<!-- <input type="text" :value="select1" id="up"> -->
		<!-- <input type="text"/> -->
	</div>
</template>

<script>
	import request from '@/utils/request.js'
	export default{
		data(){
			return{
				helpData:[],
				num:0,
				helpList:[],
				lastpage:false,
				page:1,
				sqlwherer:"",
				loading: false,
				select1:"请选择",
				select2:"请选择"
			}
		},
		created() {
			// this.load09();
		},
		 computed: {
			noMore () {
				return this.lastpage
			},
			disabled () {
				return this.loading || this.noMore
			}
		},
		methods:{
			// 页面跳转
			routerPush(url,id){
				console.log("id:"+id);
				this.$router.push({
					path:url+"?id="+id,
				})
			},

			

			// 懒加载数据
			// load () {
			// 	// var datalist=[]
			// 	this.loading = true
			// 	setTimeout(() => {
			// 	this.page += 1;
			// 	this.loading = false;
			// 	console.log("page",this.page);
			// 	}, 1000)
			// },

			
			// 列表信息加载
			load(){
				// debugger
				// 清空筛选条件，防止连续拼接，使筛选条件语法错误，导致筛选失败
				this.sqlwhere="";
				// this.helpData=[];
				var Select1=document.getElementById("select1").value;
				var Select2=document.getElementById("select2").value;
				// console.log("Select1"+Select1,"Select2"+Select2);
				
				//读取缓存，判断缓存是否有值，有值则赋值，否则不赋值 
				if(sessionStorage.getItem("select1")!="" && sessionStorage.getItem("select1")!=null && sessionStorage.getItem("select1")!=undefined){
					this.select1=sessionStorage.getItem("select1");
					Select1=this.select1;
				}
				if(sessionStorage.getItem("select2")!="" && sessionStorage.getItem("select2")!=null && sessionStorage.getItem("select2")!=undefined){
					this.select2=sessionStorage.getItem("select2");
					Select2=this.select2;
				}

				// page缓存不知道怎么用合适，就先不用了
				// if(sessionStorage.getItem("page")!=""&&sessionStorage.getItem("page")!=null&&sessionStorage.getItem("page")!=null){
				// 	this.page=sessionStorage.getItem("page");
				// }

				// console.log(this.select1,this.select2,this.page);
				// console.log("Select1"+Select1,"Select2"+Select2);

				// 判断筛选条件的值是否符合要求，符合则进行条件拼接
				if(this.select1!='' && this.select1!=undefined && this.select1!=null && this.select1!="请选择"){
					// console.log("this.select1");
					this.sqlwhere += "and abc_ex1= '"+this.select1+"'";
					Select1=this.select1;
				}
				if(this.select2!='' && this.select2!=undefined && this.select2!=null && this.select2!="请选择"){
					// console.log("this.select2");
					this.sqlwhere += "and abc_ex5= '"+this.select2+"'";
					Select2=this.select2;
				}
				// console.log('this.sqlwhere',this.sqlwhere);
				
				// sessionStorage.clear();           //删除全部缓存数据
				console.log(this.lastpage,"lastpage");
				if(this.num==0){
					this.needList({
						'page': this.page,
						'sqlwhere':this.sqlwhere,
					}).then(res => {
						// console.log('this.sqlwhere',this.sqlwhere);
						console.log(res,"res");

						if(res.length==0){
							this.lastpage=true;
							// this.page =1
							console.log(this.lastpage,"lastpage");
						}else{
							// this.lastpage=false;
							

							// 数据解码--返回的数据（数组对象）是未解码的--这个前后端一方搞就行了
							for(let i in res ){
								for(let j in res[i]){
									res[i][j]=unescape(res[i][j])
								}
							}

							// 将解码的数据放到helpData里面用于前端展示
							for(let i  in res){
								this.helpData.push(res[i]);
							}
						}

						// this.helpData=this.helpList.concat(datalist);
						console.log(this.helpData,"this.helpData");
						
					}).catch(res => {
						console.log('请求失败了',res);
						this.$message.error('数据获取失败或请求超时');
						this.$router.go(-1)
					})
				}
					// setTimeout(() => {
						
						
						// sessionStorage.removeItem("page")    //删除缓存数据
						// sessionStorage.removeItem("select2")  //删除缓存数据
						// sessionStorage.removeItem("select1")  //删除缓存数据
					// }, 1000)

				// page自增必须放接口外面，不然页面滚动时数据会重复
				this.loading = true
				this.page =this.page*1+ 1;
				this.loading = false;

				console.log("page",this.page);
				console.log(this.helpList,"this.helpList");

				// this.num+=1;
				// return this.helpList;
			},
			// 需求列表数据接口
			needList(data) {
				
				console.log(data,"data");
				return request({
					method: 'post',
					url : "/social/assistanceWeixin/WXListByPageCharity",//路径
					data: data
				})
			},

			// 数据筛选
			fn(){
				this.sqlwhere="";
				this.page = 1;
				this.helpData=[];

				var select1=document.getElementById("select1").value;
				var select2=document.getElementById("select2").value;
				console.log(select1,select2);
				console.log("==========tselect1,select2================");

				// 本地缓存，返回页面时读取缓存保存筛选条件
				sessionStorage.setItem("select1",select1);
				sessionStorage.setItem("select2",select2);
				
				// 使筛选匡能实时显示所选内容
				this.select1=select1;
				this.select2=select2;
				// console.log(this.select1,this.select2);
				// console.log("==========this.select1,this.select2================");

				// 拼接传给后端的数据库查找条件
				if(select1!='请选择' && select1!='' && select1!=undefined && select1!=null){ //按街镇查找
					this.sqlwhere += "and abc_ex1= '"+select1+"'";
				}
				if(select2!='请选择' && select2!='' && select2!=undefined && select2!=null){ //按需求类型查找
					this.sqlwhere += "and abc_ex5= '"+select2+"'";
				}

				this.load();
				// 调用接口，将筛选条件传给后端并接收数据
				// this.needList({
				// 	'page': this.page,
				// 	'sqlwhere':this.sqlwhere,
				// }).then(res => {
				// 	if(res.length==0){  //根据返回数据的长度判断数据是否全部显示，
				// 		this.lastpage=true;    //lastpage为是否继续加载的条件，true则不再加载，false则继续加载
				// 	}else{
				// 		this.lastpage=false;
				// 	}
				// 	console.log(this.lastpage,"lastpage");

				// 	// 数据解码--返回的数据（数组对象）是未解码的--这个前后端一方搞就行了
				// 	for(let i in res ){
				// 		for(let j in res[i]){
				// 			res[i][j]=unescape(res[i][j])
				// 		}
				// 	}

				// 	// 将解码的数据放到helpData里面用于前端展示
				// 	for(let i  in res){
				// 		this.helpData.push(res[i]);
				// 	}
				// 	// console.log(res);

				// }).catch(res => {
				// 	// if(typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200){
				// 		console.log('请求失败了-----------------',res)
				// 	// 	this.$message.error('数据获取失败或请求超时3333')
				// 	// 	this.$emit("closes", false)
				// 		this.$router.go(-1)
				// 		// return false
				// 	// }
				// })

			},
		}
	}
</script>

<style scoped>
	header{
		width: 100%;
		height: 135px;
		line-height: 80px;
		background-color: rgb(60, 159, 240);
		color: #fff;
		font-size: 40px;
		font-weight: 600;
		position: fixed;
		top: 0px;
		left: 0%;
		right: 0;
		z-index: 100;
	}
	header>div{
		
	}
	.select-list{
		z-index: 100;
		position: fixed;
		top: 80px;
		left: 0%;
		right: 0;
		height: 50px;
		line-height: 32px;
		padding: 3px 10px;
		display: flex;
		background-color: #ffffff;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	}
	.select-list>div{
		width: 50%;
		box-sizing: border-box;
		margin-top: 4px;
		line-height: 32px;
	}
	.infinite-list-wrapper{
		height: 100vh;
	}
	.need_content{
		width: 100%;
		text-align:left;
		color:#aaa;
		/* background-color: aqua; */
		margin:20px 0;
		font-size:30px;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		word-break: break-all;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
	}
        
</style>

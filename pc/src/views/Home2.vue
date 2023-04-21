<template>
	<div class="home" v-loading="loadingH">
		<header style="margin-top: 20px;margin-bottom: 0px;font-size: 45px;font-weight: bold;letter-spacing: 10px;color: rgb(80, 105, 171);">
			<!-- <img src="@/assets/logo.png" style="width: 60px;height: 60px;" alt=""> -->
			<!-- <img src="@/assets/img/font/tx2.png" style="width: 650px;height: 60px;" alt=""> -->
			泰州市智慧民政综合服务平台
			<!-- <img style="width: 50px; height: 50px;float:right;margin-right:20px" src="@/assets/img/inform.png" @click="Table"> -->

            <!-- 抽屉 -->
			<el-drawer title="表格!" :visible.sync="table" direction="rtl" :modal="false" :with-header="false" size="auto">
                <el-table :data="gridData" @row-click="getTable" highlight-current-row   >
                    <el-table-column property="tn_ex1" align="center" label="标题" style="cursor: pointer;" width="250"></el-table-column>
                    <el-table-column property="tn_dat1" align="center" label="发布日期" style="cursor: pointer;" width="250"></el-table-column>
                </el-table>
            </el-drawer>
		</header>
		
		<main>
			 <div style="min-height: 100px;">
				<!-- <el-alert title="消息提示的文案" type="info" description="文字说明" center></el-alert> -->
			</div>
			<div class="mainDiv">
				<div class="link" @click="routePush1(item)" v-for="(item,index) in models" :key="index">
					<el-badge :value="item.text=='预警信息' ? 'new' : '' ">
						<div :class="item.className" >
							<i :class="item.fa"></i>
						</div>
					</el-badge>
					<!-- 模块名称 -->
					<div class="itemFont">{{item.text}}</div>
				</div>
			</div>
		</main>

		<!-- 表格填写 -->
		<el-dialog  :data="gridData2" :title="gridData2[0].tn_ex1"  align="center" :visible.sync="dialogFormVisible" :append-to-body="true">
			<!-- <h3>{{gridData2[0].tn_ex1}}</h3> -->
			<p style="font-size:18px"  align="center">{{gridData2[0].tn_ex2}}</p>
		</el-dialog>

	</div>
</template>

<script>
	import request from '@/utils/request'
	// import '@/assets/font/img/iconfont.css'
	export default {
		name: 'Home',
		data(){
			return{
				modelId:"77",
				models:[{
                    fa: "el-icon-s-platform",
                    height: "500",
                    icon: "el-icon-s-platform",
                    id: "83",
                    text: "受理中心",
                    type: "",
                    url: "/home",
                    width: "600",
                },{
                    className: "itemdiv item2",
                    fa: "el-icon-tickets",
                    height: "500",
                    icon: "el-icon-tickets",
                    id: "190",
                    text: "政策数据库",
                    type: "",
                    url: "/Home3",
                    width: "600",
                },
                // {
                //     className: "itemdiv item2",
                //     fa: "el-icon-message-solid",
                //     height: "500",
                //     icon: "el-icon-message-solid",
                //     id: "190",
                //     text: "预警信息",
                //     type: "",
                //     url: "/warningInformation?title=预警信息",
                //     width: "600",
                // },
                {
                    className: "itemdiv item2",
                    fa: "el-icon-message-solid",
                    height: "500",
                    icon: "el-icon-message-solid",
                    id: "190",
                    text: "预警信息",
                    type: "",
                    url: "/warningInformation?title=预警信息",
                    width: "600",
                },{
                    appid: "",
                    children: Array(0),
                    className: "itemdiv item3",
                    fa: "el-icon-search",
                    height: "500",
                    icon: "el-icon-search",
                    id: "267",
                    text: "救助查询",
                    type: "",
                    url: "/iframeView?iframe=/social/assistance/salvation2&title=救助查询",
                    width: "600",
                },{
                   appid: "",
                    children: Array(0),
                    className: "itemdiv item4",
                    fa: "el-icon-pie-chart",
                    height: "500",
                    icon: "el-icon-pie-chart",
                    id: "268",
                    text: "统计分析",
                    type: "",
                    url: "/tjfx",
                    width: "600",
                },{
                    appid: "",
                    children: Array(0),
                    className: "itemdiv item5",
                    fa: "el-icon-chat-line-square",
                    height: '500',
                    icon: "el-icon-chat-line-square",
                    id: "270",
                    text: "救助诚信",
                    type: "",
                    url: "/list?modelId=270&title=救助诚信",
                    width: "600",
                },{
                    appid: "",
                    children: Array(0),
                    className: "itemdiv item7",
                    fa: "el-icon-suitcase",
                    height: "500",
                    icon: "el-icon-suitcase",
                    id: "279",
                    text: "定期走访",
                    type: "",
                    url: "/list?modelId=279&title=定期走访",
                    width: "600",
                },{
                    appid: "",
                    children: Array(0),
                    className: "itemdiv item8",
                    fa: "el-icon-s-platform",
                    height: "500",
                    icon: "el-icon-s-platform",
                    id: "465",
                    text: "留言板",
                    type: "",
                    url: "/list?modelId=465&title=留言板",
                    width: "600",
                },{
                    appid: "",
                    children: Array(0),
                    className: "itemdiv item8",
                    fa: "el-icon-s-platform",
                    height: "500",
                    icon: "el-icon-s-platform",
                    id: "465",
                    text: "留言板",
                    type: "",
                    url: "/list?modelId=465&title=留言板",
                    width: "600",
                }],
				loadingH:true,
				table: false,
				// dialog: false,
				loading: false,
				// 右边列表数据
				gridData: [],
				// 点击列表弹出框数据
				gridData2: [{
					tn_ex1:"",
					tn_ex2:""
				}],
				// 弹出框显示
				dialogFormVisible: false,
			}
			
		},
		created(){
			this.loadModel();
		},
		methods:{
			
			routePush1(item) {

                console.log(item);
				let url=item.url;
				url=url.indexOf("?")==-1 ? url+"?url=&preName="+"&preModelId="+this.modelId : url+"&url=&preName="+"&preModelId="+this.modelId
				// url=url.indexOf("?")==-1 ? url+"?url=assistance" : url+"&url=assistance"
				this.$router.push({
					path: url
				})
			},
			
			loadModel(){
				this.loadingH = true;
				// request({
				// 	url:"/social/weida/getUserModels",
				// 	method:"post",
				// 	data:{
				// 		modelId:this.modelId
				// 	}
				// }).then(res => {
				// 	this.loadingH=false;
				// 	this.models=JSON.parse(unescape(res[0].nav));
				// 	console.log("this.modelds================");
				// 	console.log(this.models)
					for(let i=0 ; i<this.models.length ; i++){
						this.models[i].className="itemdiv item"+(i+1);
				// 		if(this.models[i].url.indexOf("/social/assistance/statusReport")!= -1){
				// 			this.models[i].url="/iframeView?iframe=/social/assistance/statusReport&title="+this.models[i].text;
				// 		}else{
				// 			// this.models[i].url="/list?title="+this.models[i].text;
				// 			if(this.models[i].text == "业务办理"){
				// 				this.models[i].url="/assistance?title="+this.models[i].text;
				// 			}else if(this.models[i].text == "慈善供需"){
				// 				this.models[i].url="/list?modelId="+this.models[i].id+"&title="+this.models[i].text;
				// 			}else if(this.models[i].text == "预警信息"){
				// 				// this.models[i].url="/warningInformation";
				// 				this.models[i].url="/warningInformation?title="+this.models[i].text;
				// 			}else if(this.models[i].text == "定期走访"){
				// 				this.models[i].url="/list?modelId="+this.models[i].id+"&title="+this.models[i].text;
				// 				// this.models[i].url="/dqzf";
				// 			}else if(this.models[i].text == "统计分析"){
				// 				this.models[i].url="/tjfx";
				// 			}else if(this.models[i].text == "救助查询"){
				// 				this.models[i].url="/iframeView?iframe=/social/assistance/salvation2&title=救助查询";
				// 			}else if(this.models[i].text == "救助需求"){
				// 				this.models[i].url="/list?modelId="+this.models[i].id+"&title="+this.models[i].text;
				// 			}else if(this.models[i].text == "救助诚信"){
				// 				this.models[i].url="/list?modelId="+this.models[i].id+"&title="+this.models[i].text;
				// 			}else if(this.models[i].text == "基础数据"){
				// 				this.models[i].url="/basicData?title="+this.models[i].text;
				// 			}else if(this.models[i].text == "家庭核对系统"){
				// 				this.models[i].url="/list?modelId="+this.models[i].id+"&title="+this.models[i].text;
				// 			}else if(this.models[i].text == "死亡核对系统"){
				// 				this.models[i].url="/list?modelId="+this.models[i].id+"&title="+this.models[i].text;
				// 			}else if(this.models[i].text == "系统设置"){
				// 				this.models[i].url="/setting?title="+this.models[i].text;
				// 			}else{
				// 				this.models[i].url="/list?modelId="+this.models[i].id+"&title="+this.models[i].text;
				// 			}
				// 		}
							
					}
                    this.loadingH=false;
				// 	console.log(this.models)
				// 	console.log(JSON.parse(unescape(res[0].nav)))
				// }).catch(res=>{
				
				// })
                console.log(this.models);
			},

			Table(){
				this.table=true
				request({
					url:"/social/systemSetting/getNotify",
					method:"post",
					data:{
						// modelId:this.modelId
					}
				}).then(res => {
					console.log(res);
					this.gridData=res
				})
			},
			getTable(data){
				console.log(data);
				this.dialogFormVisible = true
				// this.loading=false

				request({
					url:"/social/systemSetting/getMsg",
					method:"post",
					data:{
						sId:data.tn_id
					}
				}).then(res => {
					console.log(res);
					this.gridData2=res
				})
				// this.table=false;
			}
		}
	}
</script>
<style scoped>

	.g-box {
		height: 80VH !important;
	}
	.g-box2{
		width:100%;
		height:100%;
		overflow: auto !important;
		display: flex;
		display: -webkit-flex;
		flex-direction: row;
	}
	.home {
		background: url(../assets/loginbg3.jpg) rgba(255, 255, 255, 0.4);
		/* background: url(../assets/loginbg3.jpg); */
		/* 背景层的混合模式:滤色模式 */
		background-blend-mode: screen;
		background-size: 100% 100%;
		/* background: url(../assets/img/88888.png);
		background-size: 100% 100%; */
		width: 100%;
		height: 100%;
		position: fixed;
		text-align: center;
		overflow: auto;
	}
	i{
		font-size: 80px;
		color: white;
	}
	header{
		min-width: 800px;
	}
	main{
		min-width: 800px;
		width: 90%;
		overflow: auto;
		box-sizing: border-box;
		margin: auto;
	}
	.mainDiv{
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		/* justify-content: space-between; */
		justify-content: flex-start;
		margin-bottom: 100px;
	}
	.link{
		cursor: pointer;
		margin-bottom: 80px;
		/* width: 350px; */
		width: 25%;
		height: 160px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.itemdiv {
		width: 110px;
		height: 110px;
		border-radius: 5px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.item1{
		background-color: #eb7168;
	}
	.item2{
		background: linear-gradient(#eb7168, #fc8c54);
	}
	.item3{
		background: linear-gradient(#eb6fb2, #e87d6f);
	}
	.item4{
		background: linear-gradient(#eb7168, #eb8f53);
	}
	.item5{
		background: linear-gradient(#FFA500, #275113);
	}
	.item6{
		background: linear-gradient(#FFA500, #eb7168);
	}
	.item7{
		background: linear-gradient(#FFA500, #667816);
	}
	.item8{
		background: linear-gradient(#FFA500, #fc8c54);
	}
	.item9{
		background: linear-gradient(#FFFF00, #e87d6f);
	}
	.item10{
		background: linear-gradient(#FFFF00, #fc8c54);
	}
	.item11{
		background: linear-gradient(#FFFF00, #e87d6f);
	}
	.item12{
		background: linear-gradient(#FFFF00, #9b64b4);
	}
	.itemFont{
		margin-top: 10px;
		font-size: 18px;
		font-weight: bold;
	}
</style>

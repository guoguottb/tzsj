<template>
	<div class="tjfx">
		<!-- 头部样式 -->
		<div class="header">
			<div class="header-left">
				<div class="header-left-1" > <p class="backBtn" @click="goBack"><i class="el-icon-arrow-left"></i> 返回</p></div>
				<div class="header-left-2"></div>
				<div class="header-left-3"></div>
			</div>
			<div class="header-center">泰州市{{new Date().getFullYear()}}年社会救助数据展示系统</div>
			<div class="header-right">
				<div class="header-right-1"></div>
				<div class="header-right-2"></div>
				<div class="header-right-3"></div>
			</div>
		</div>
		<div class="main">
			<div class="main-left">
				<!-- <TjfxBox>
					<div style="display: flex;justify-content: space-between;">
						<TjfxBoxSlot icon='el-icon-data-analysis' :num='zhjc.num' unit='起' title='智慧监察' />
						<TjfxBoxSlot icon='el-icon-data-analysis' :num='zhjc.num' unit='起' title='智慧监察' />
					</div>
				</TjfxBox> -->
				<div style="display: flex;justify-content: space-between;">
					<TjfxBox>
						<TjfxBoxSlot icon='el-icon-data-analysis' :num='zhjcNum' unit='起' title='智慧监察' />
					</TjfxBox>
					<TjfxBox>
						<TjfxBoxSlot icon='el-icon-user' :num='oldManNum' unit='人' title='80岁老人' />
					</TjfxBox>
				</div>
				
				<!-- <div style="display: flex;justify-content: space-between;">
					<TjfxBox>
						<TjfxBoxSlot icon='el-icon-office-building' :num='zhjc.num' unit='人' title='全市人数' />
					</TjfxBox>
					<TjfxBox>
						<TjfxBoxSlot icon='el-icon-school' :num='zhjc.num' unit='人' title='救助人数' />
					</TjfxBox>
				</div>
				<div style="display: flex;justify-content: space-between;">
					<TjfxBox>
						<TjfxBoxSlot icon='el-icon-house' :num='zhjc.num' unit='户' title='核对户数' />
					</TjfxBox>
					<TjfxBox>
						<TjfxBoxSlot icon='el-icon-open' :num='zhjc.num' unit='起' title='智能预警' />
					</TjfxBox>
				</div> -->
				
				<TjfxBox class="main-left-margin">
					<template v-slot:header>智慧监察</template>
					<template>
						<EchartsBar :dataNameArr="zhjcName" :dataArr="zhjcData"  />
					</template>
				</TjfxBox>
				<TjfxBox class="main-left-margin">
					<template v-slot:header>处理户数</template>
					<template>
						<EchartsPie :name="'处理户数'"
						:data="clhs" />
					</template>
				</TjfxBox>
				<TjfxBox class="main-left-margin">
					<template v-slot:header>80周岁以上老人情况</template>
					<template>
						<div class="tjfx-box-slot-1">
							<div v-for="(item,index) in oldMan" :key="index" class="tjfx-box-slot-1-1">
								<EchartsGauge style="flex: 4;"
								 :name="item.title"
								 :data="[item]"/>
								<div class="tjfx-box-slot-1-1-text">{{item.title}}</div>
							</div>
							<!-- <div class="tjfx-box-slot-1-1">
								<EchartsGauge style="flex: 4;"
								 :name="'90-99周岁'"
								 :data="[
								 	{ value: oldMan.ninety, name: '人数' },
								 ]"/>
								<div class="tjfx-box-slot-1-1-text">90-99周岁</div>
							</div>
							<div class="tjfx-box-slot-1-1">
								<EchartsGauge style="flex: 4;"
								 :name="'100周岁以上'"
								 :data="[
								 	{ value: oldMan.oneHundred, name: '人数' },
								 ]"/>
								<div class="tjfx-box-slot-1-1-text">100周岁以上</div>
							</div> -->
						</div>
					</template>
				</TjfxBox>
			</div>
			<div class="main-center">
				<Map></Map>
				<TjfxBox class="main-center-margin">
					<template v-slot:header>新增、核减数据</template>
					<template>
						<div class="main-center-bottom">
							<div v-for="(item,index) in addSubtractData" :key="index" class="main-center-bottom-content">
								<div class="main-center-bottom-content-flex">{{item.name}}</div>
								<div class="main-center-bottom-content-flex">新增: {{item.addNumber}}</div>
								<div class="main-center-bottom-content-flex main-center-bottom-content-div"><i class="el-icon-caret-top"></i>{{item.addPercent}}</div>
								<div class="main-center-bottom-content-flex">核减: {{item.decreaseNumber}}</div>
								<div class="main-center-bottom-content-flex main-center-bottom-content-div"><i class="el-icon-caret-bottom"></i>{{item.decPercent}}</div>
							</div>
							<!-- C -->
						</div>
					</template>
				</TjfxBox>
			</div>
			<div class="main-right">
				<div style="display: flex;justify-content: space-between;">
					<!-- <TjfxBox>
						<TjfxBoxSlot icon='el-icon-tickets' :num='cityPersonNum' unit='人' title='全市人数' />
					</TjfxBox> -->
					<TjfxBox>
						<TjfxBoxSlot icon='el-icon-document-remove' :num='salvationNum' unit='人' title='救助人数' />
					</TjfxBox>
				</div>
				<TjfxBox class="main-right-margin">
					<template v-slot:header>核对户数</template>
					<template>
						<EchartsPie :name="'核对户数'"
						roseType=''
						:data="hdhs" />
					</template>
				</TjfxBox>
				<TjfxBox class="main-right-margin">
					<template v-slot:header>业务办结</template>
					<template>
						<EchartsBar :dataNameArr="ywbjName" :dataArr="ywbjData"  />
					</template>
				</TjfxBox>
				
				<TjfxBox class="main-right-margin">
					<template v-slot:header>智能预警</template>
					<template>
						<EchartsLine :xAxis='yjName' :data='yjData' />
					</template>
				</TjfxBox>
			</div>
		</div>
		
	</div>
</template>
<script>
	import { getByDateCount, getPersonCount, getLoopChartData, getPieChart, getAgeLevelCount, getTimeoutCount, getHandleCount, getAlertCount } from '@/utils/requestUtils.js'
	import TjfxBox from './TjfxBox.vue'
	import TjfxBoxSlot from './TjfxBoxSlot.vue'
	import EchartsBar from './EchartsBar.vue'
	import EchartsPie from './EchartsPie.vue'
	import EchartsGauge from './EchartsGauge.vue'
	import EchartsLine from './EchartsLine.vue'
	import Map from './Map.vue'
	import request from "@/utils/request"; //请求接口（自己封装）
	
	
	export default {
		components:{
			TjfxBox,
			TjfxBoxSlot,
			EchartsBar,
			EchartsPie,
			EchartsGauge,
			EchartsLine,
			Map
		},
		data() {
			return {
				// 智慧监察
				// zhjc: {
				// 	num: 4000,
				// 	slcs: 500,
				// 	hccs: 1500,
				// 	gscs: 1200,
				// 	slsq: 800,
				// },
				zhjcNum: '',
				zhjcName: [],
				zhjcData: [],
				// 处理户数
				clhs: [],
				// 80周岁以上老人情况
				oldMan: [],
				oldManNum: '' ,
				// 业务办结
				ywbjName: [],
				ywbjData: [],
				
				// 新增核减数据
				addSubtractData: [],
				// 全市人数
				cityPersonNum: '',
				// 救助人数
				salvationNum: '',
				// 核对户数
				hdhs: [],
				// 智能预警
				yjName: [],
				yjData: [],
			}
		},
		created() {
			// // 统计分析 - 新增、核减数据
			// getByDateCount().then(res => {
			// 	this.addSubtractData = res
			// })
			// // 统计分析 - 全区总人数,救助人数
			// getPersonCount().then(res => {
			// 	this.cityPersonNum = res[0].count
			// 	this.salvationNum = 0
			// 	res[0].data.forEach((item) => {
			// 		this.salvationNum += Number(item.value)
			// 	})
			// })
			// // 统计分析 - 办结业务
			// getLoopChartData().then(res =>{
			// 	// this.ywbjName = []
			// 	// this.ywbj = []
			// 	res.forEach(item =>{
			// 		this.ywbjName.push(unescape(item.name))
			// 		this.ywbjData.push(item.value)
			// 	})
				
			// })
			// // 统计分析 - 核对户数
			// getPieChart().then(res =>{
			// 	this.hdhs = res
			// 	this.hdhs.forEach(item =>{
			// 		item.name = unescape(item.name)
			// 	})
			// })
			// // 统计分析 - 80周岁以上老人情况
			// getAgeLevelCount().then(res =>{
			// 	this.oldMan = res
			// 	this.oldManNum = 0
			// 	this.oldMan.forEach(item =>{
			// 		this.oldManNum += Number(item.value)
			// 		item.title = item.name
			// 		item.name = '人数'
			// 	})
			// })
			// // 统计分析 - 智慧监察
			// getTimeoutCount().then(res =>{
			// 	this.zhjcNum = 0
			// 	res.data1.forEach(item =>{
			// 		this.zhjcName.push(item.name)
			// 		this.zhjcData.push(item.value)
			// 		this.zhjcNum += Number(item.value)
			// 	})
			// })
			// // 统计分析 - 处理户数
			// getHandleCount().then(res =>{
			// 	this.clhs = res
			// })
			// // 统计分析 - 智能预警
			// getAlertCount().then(res =>{
			// 	res.data1.forEach(item => {
			// 		this.yjData.push(item.value)
			// 		this.yjName.push(item.name)
			// 	})
			// })
			
			// 没加的接口
			// getBySexAndYearCount 救助同比去年增长 增长百分比:percent 增长人次:count 男性增长:men 女性增长:women
			this.loadData();
		},
		methods: {
			goBack(){
				this.$emit("closes", false);
			    this.$router.go(-1);
			    if(process.env.NODE_ENV!="development"){
			        this.$router.go(-1);
			    }
			},

			loadData(){

				this.getSocialAssistanceData().then(res=>{

				}).catch(res=>{
					// console.log(res.response.data,'数据');
					// console.log(res.response.data.addAndDecrease,'新增、核减数据');
					// console.log(res.response.data.assistance,'办结数据');
					// console.log(res.response.data.check,'核对户数');
					// console.log(res.response.data.deliverance,'救助人数');
					// console.log(res.response.data.dispose,'处理户数');
					// console.log(res.response.data.elder,'80周岁以上老人情况');
					// console.log(res.response.data.monitor,'智慧监察');
					// console.log(res.response.data.warning,'智能预警');

					// 统计分析 - 新增、核减数据
					this.addSubtractData = res.response.data.addAndDecrease;

					// 业务办结
					this.ywbjName = []
					this.ywbj = []
					res.response.data.assistance.forEach(item =>{
						this.ywbjName.push(unescape(item.name))
						this.ywbjData.push(item.number)
					})

					// 统计分析 - 核对户数
					this.hdhs = res.response.data.check
					this.hdhs.forEach(item =>{
						item.name = unescape(item.name)
						item.value = unescape(item.number)
					})

					// 救助人数
					this.salvationNum = res.response.data.deliverance
					

					// 处理户数
					this.clhs = res.response.data.dispose
					this.clhs.forEach((item) => {
						// item.title = item.name
						item.value = item.number
					})
					
					// 80周岁以上老人情况
					this.oldMan = res.response.data.elder
					this.oldManNum = res.response.data.elderNum
					let number = 0
					for(let i in this.oldMan){
						// number += this.oldMan[i].number;
						this.oldMan[i].value = this.oldMan[i].number
						this.oldMan[i].title = this.oldMan[i].name
					}

					// 统计分析 - 智慧监察
					this.zhjcNum = res.response.data.monitorNum
					res.response.data.monitor.forEach(item =>{
						this.zhjcName.push(item.name)
						this.zhjcData.push(item.number)
						// this.zhjcNum += Number(item.number)
					})
					
					// 统计分析 - 智能预警
					res.response.data.warning.forEach(item => {
						this.yjData.push(item.number)
						this.yjName.push(item.name)
					})
				})
			},
			//接口
			getSocialAssistanceData(data) {
			        return request({
			            headers: {
			                Accept: "application/json",
			            },
			            url: "/social/assistance/getSocialAssistanceData",
			            method: "post",
			        });
			},
		}
	}
</script>
<style scoped>
	
	/* .chamfer{
		background: #009EEB;
		width: 200px;
		height: 200px;
		clip-path: polygon(0 0, 200px 0, 100px 200px, 0 0);
	} */
	.tjfx{
		width: 100vw;
		height: 100vh;
		background: url('~@/assets/img/tjfx/tjfxbg.png');
		background-size: 100% 100%;
		padding: 0 1vw 0 1vw;
		--border: 3px solid #1d9bc1;
		--color: #1d9bc1;
	}
	.header{
		padding-top: 2vh;
		display: flex;
		border-bottom: var(--border);
		/* background-color: rgba(255, 255, 255, 0) !important; */
	}
	.header-left{
		display: flex;
	}
	.header-left-1{
		width: 25vw;
		height: 4vh;
		border-top: var(--border);
		/* background-color: #000000; */
	}
	.header-left-2{
		margin-top: 3vh;
		width: 5vw;
		height: 0.3vh;
		background-color: var(--color);
		/* transform: translateY(10px); */
		transform: rotate(50deg);
	}
	.header-left-3{
		margin-top: 3vh;
		width: 5vw;
		height: 0.3vh;
		background-color: var(--color);
		/* transform: translateY(10px); */
		transform: rotate(50deg);
		position: relative;
		left: -60px;
	}
	.header-center{
		width: 40vw;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #00FFFF;
		font-size: 30px;
		text-align: center;
		/* border-bottom: var(--border); */
	}
	.header-right{
		display: flex;
	}
	.header-right-1{
		margin-top: 3vh;
		width: 5vw;
		height: 0.3vh;
		background-color: var(--color);
		/* transform: translateY(10px); */
		transform: rotate(-50deg);
		position: relative;
		left: 60px;
	}
	.header-right-2{
		margin-top: 3vh;
		width: 5vw;
		height: 0.44vh;
		background-color: var(--color);
		/* transform: translateY(10px); */
		transform: rotate(-50deg);
		
	}
	.header-right-3{
		width: 25vw;
		height: 8vh;
		border-top: var(--border);
		/* background-color: #000000; */
	}
	.main{
		display: flex;
	}
	/* 左边 */
	.main-left{
		width: 20vw;
		margin-top: 1.5vh;
		/* height: 20vw;
		background-color: #001245 */
	}
	.main-left-margin{
		margin-top: 1.5vh;
	}
	/* tjfx-box-slot */
	.tjfx-box-slot-1{
		display: flex;
		height: 20vh;
	}
	.tjfx-box-slot-1-1{
		flex: 1;
		display: flex;
		flex-direction: column;
	}
	.tjfx-box-slot-1-1-text{
		flex: 1;text-align: center;color:var(--color)
	}
	/* 中间 */
	.main-center{
		width: 60vw;
		margin-top: 1.5vh;
		padding: 0 0.5vw 0 0.5vw;
	}
	.main-center-margin{
		/* margin-top: 1.5vh; */
		margin-top: 1.9vh;
	}
	.main-center-bottom{
		padding: 5px;
		height: 20vh;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	.main-center-bottom-content{
		display: flex;
		justify-content: space-between;
		color: var(--color)
	}
	.main-center-bottom-content-flex {
		flex: 1;
		/* text-align: center; */
	}
	.main-center-bottom-content-div{
		display: flex;
		align-items: center;
		/* justify-content: center; */
	}
	
	/* 右边 */
	.main-right{
		width: 20vw;
		margin-top: 1.5vh;
		/* height: 20vw;
		background-color: #001245 */
	}
	.main-right-margin{
		margin-top: 1.5vh;
	}

	/* 返回按钮样式 */
	.backBtn{
		color:#00FFFF;
		font-size:20px;
		margin: 20px 0 0 20px;
		cursor: pointer;
	}
</style>
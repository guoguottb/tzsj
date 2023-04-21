<template>
	<div>
		<header>
			<div></div>
		</header>
		<van-tabs v-model="active" animated>
			<van-tab title="民政局">
			<main style="margin-top: 30px;">
				<div v-for="item in datas" class="maindiv" :key="item.key" @click="routerPush(item)">
					<img width="100%" src="../../assets/img/policy/policyimg2.png" alt="">
					<div class="maindivfont1">{{item.title}}</div>
					<div class="maindivfont2">{{item.main}}</div>
				</div>
			</main>
			</van-tab>
			<van-tab title="医保局">
				<div v-for="item in datas2" class="maindiv" :key="item.key" @click="routerPush(item)">
					<img width="100%" src="../../assets/img/policy/policyimg2.png" alt="">
					<div class="maindivfont1">{{item.title}}</div>
					<div class="maindivfont2">{{item.main}}</div>
				</div>
			</van-tab>
			<van-tab title="其他">暂无内容发布</van-tab>
			<!-- <van-tab title="标签 4">内容 4</van-tab> -->
			<!-- <van-tab title="标签 5">内容 5</van-tab> -->
		</van-tabs>
		
	</div>
</template>

<script>
	import Vue from 'vue';
	import { Tab, Tabs } from 'vant';
	Vue.use(Tab);
	Vue.use(Tabs);
	
	export default{
		data(){
			return{
				
				active: 0,  //tab下标
				datas:[],	//民政政策
				datas2:[],	//医疗政策
				jsonData:[  //所有政策
					{
						key:1,
						organization:"民生",
						title:'关于开展2021年度白血病、尿毒症和重性精神病患者专项救助工作的通知',
						main:'根据《市政府关于调整城乡居民医疗救助有关政策的通知》(泰政发〔2017〕48号)、《关于进一步贯彻落实社会救助工作的通知》(泰民）(2017)105号）等文件精神，决定开展2021年度白血病、尿毒症和重性精神病患者专项救助工作,现将有关事项通知如下:',
						date:'2021-12-8'
					},{
						key:2,
						organization:"民生",
						title:'关于调整全市困难群体大病保险医疗救助帮扶政策的通知',
						main:'为进一步落实市委、市政府关于助力打赢脱贫攻坚战部署，切实提高贫困人口医疗保障水平，为全面建成小康社会奠定健康基础，根据“省人社厅关于切实做好建档立卡低收入人口等困难群体医疗保障有关工作的通知“(苏人社发[2017]300号).”关于转发市人力资源社会保障局等部门实施市区困难群体大病保险医疗救助帮扶政策的通知“(泰政办发[2017]115号)等精神，现对全市参加基本医疗保险的困难群体大病保险、医疗救助帮扶政策调整如下:',
						date:'2022-4-22'
					},{
						key:3,
						organization:"民生",
						title:'关于进一步做好全市医疗救助工作的通知',
						main:'为进-步落实市委、市政府关于助力打赢脱贫攻坚战部署，做好医疗救助工作，提高医疗救助水平,有效缓解困难群体因病致贫、因病返贫问题，根据《省政府办公厅关于进一步完善医疗救助制度的实施意见》(苏政办发[2015] 135号)、《医疗保障扶贫三年行动实施方案(2018-2020年 )》(苏医保发[2018] 11号)、《关于调整全市困难群体大病保险医疗救助帮扶政策的通知》(泰人社发[2018] 458号)等文件精神，现就进一步做好全市医疗救助工作有关事项通知如下:',
						date:'2022-4-22'
					},{
						key:4,
						organization:"医疗",
						title:'测试',
						main:'为进-步落实市委、市政府关于助力打赢脱贫攻坚战部署，做好医疗救助工作，提高医疗救助水平,有效缓解困难群体因病致贫、因病返贫问题，根据《省政府办公厅关于进一步完善医疗救助制度的实施意见》(苏政办发[2015] 135号)、《医疗保障扶贫三年行动实施方案(2018-2020年 )》(苏医保发[2018] 11号)、《关于调整全市困难群体大病保险医疗救助帮扶政策的通知》(泰人社发[2018] 458号)等文件精神，现就进一步做好全市医疗救助工作有关事项通知如下:',
						date:'2022-4-22'
					}
				]
			}
		},
		created(){
			this.loadData();
		},
		methods:{
			loadData(){
				for(let i in this.jsonData){
					var organization = this.jsonData[i].organization;
					if(organization=='民生'){
						this.datas.push(this.jsonData[i]);
					}else if(organization=='医疗'){
						this.datas2.push(this.jsonData[i]);
					}
				}
				console.log(this.datas);
				console.log(this.datas2);

			},

			routerPush(item){
				this.$router.push({
					path:'/PolicyMessage',
					query:{
						key:item.key,
						title:item.title,
						date:item.date
					}
				})
			}
			
		}
	}
</script>

<style scoped>
	header {
		display: flex;
		justify-content: center;
		background: url(../../assets/img/policy/policybg.png) no-repeat;
		/* background-color: #42B983; */
		background-size: 100% 90%;
		margin-bottom: 20px;
	}

	header>div {
		width: 90%;
		height: 350px;
		margin-top: 80px;
		background: url(../../assets/img/policy/policy.png);
		background-size: 100% 100%;
	}

	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		/* justify-content: center; */
	}

	.maindiv {
		width: 90%;
		margin: auto;
		/* border: 1px solid #2C3E50; */
		box-shadow: 0px 0px 10px 10px #e3eee9;
		border-radius: 20px;
		overflow: hidden;
		margin-bottom: 50px;
	}

	.maindivfont1 {
		color: #333333;
		font-size: 34px;
		font-weight: bold;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		/* margin-top: 20px;
		margin-bottom: 20px; */
		margin: 20px auto;
		padding: 0 50px;
	}

	.maindivfont2 {
		color: #666666;
		font-size: 28px;
		word-break: break-all;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		margin-bottom: 60px;
		padding: 0 10px;
	}
</style>

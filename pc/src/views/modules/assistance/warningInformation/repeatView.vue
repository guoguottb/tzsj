<template>
	<div class="g-box">
		<div class='g-box2'>
			<div class="info2">
			<el-form :inline="true" class="demo-form-inline">
				<h3 class="line_blue" id="page1">&emsp;{{sTitle}}</h3>
				<div class="lineSt"></div>
				<div class="top_1">
					<table class="top_2">
						<tr style="height:40px;">
							<td style="width:10%;">姓名:</td>
							<td style="width:10%;">{{ab_ex3}}</td>
							<td style="width:15%;">身份证号码:</td>
							<td style="width:25%;">{{ab_ex7}}</td>
							<td rowspan="2"></td>
						</tr>
					</table>
				</div>
				<!-- <div style='clear:both'></div> -->
				<div v-for="(item,index) in BasicHeadHtml1" :key='index'>
					<h3 class="line_blue" id="page2">&emsp;{{item.ab_ex13}}</h3>
					<div class="lineSt"></div>
					<div class="top_1">
						<table class="top_2" v-if='item.ab_ex13=="低保" || item.ab_ex13=="特困供养" || item.ab_ex13=="临时救助" || item.ab_ex13=="其他救助" || item.ab_ex13=="低收入家庭" || item.ab_ex13=="家庭边缘" || item.ab_ex13=="司法援助" '>
							<tr style="height:40px;">
								<td style="width:15%;">户主姓名:</td>
								<td style="width:35%;">{{item.hzxm}}</td>
								<td style="width:15%;">户主身份证:</td>
								<td style="width:35%;">{{item.hzsfz}}</td>
							</tr>
							<tr style="height:40px;">
								<td style="width:15%;">与户主关系:</td>
								<td style="width:35%;">{{item.abm_ex1}}</td>
								<td style="width:15%;">家庭人口:</td>
								<td style="width:35%;">{{item.pnum}}</td>
							</tr>
							<tr style="height:40px;">
								<td style="width:15%;">行政区划:</td>
								<td style="width:35%;">{{item.ab_ex2+item.ab_ex1}}</td>
								<td style="width:15%;">户籍地址:</td>
								<td style="width:35%;">{{item.ab_ex4}}</td>
							</tr>
							<tr style="height:40px;">
								<td style="width:15%;">申请时间:</td>
								<td style="width:35%;">{{item.ab_dat14}}</td>
								<td style="width:15%;">审批时间:</td>
								<td style="width:35%;">{{item.ab_dat5}}</td>
							</tr>
							<tr style="height:40px;">
								<td style="width:15%;">核对人:</td>
								<td style="width:35%;">{{item.ab_ex18}}</td>
								<td style="width:15%;">审核人:</td>
								<td style="width:35%;">{{item.ab_ex19}}</td>
							</tr>
							<tr style="height:40px;">
								<td style="width:15%;">公示人:</td>
								<td style="width:35%;">{{item.ab_ex49}}</td>
								<td style="width:15%;">审批人:</td>
								<td style="width:35%;">{{item.ab_ex20}}</td>
							</tr>
						</table>
						
						<table class="top_2" v-else-if='item.ab_ex13=="医疗救助" || item.ab_ex13=="住房救助" || item.ab_ex13=="教育救助" || item.ab_ex13=="灾害救助" || item.ab_ex13=="就业救助" || item.ab_ex13=="工会救助" || item.ab_ex13=="团委救助" || item.ab_ex13=="妇联救助" || item.ab_ex13=="红会救助" || item.ab_ex13=="慈善救助" || item.ab_ex13=="特困职工"'>
							<tr style="height:40px;">
								<td style="width:15%;">户主姓名:</td>
								<td style="width:35%;">{{item.hzxm}}</td>
								<td style="width:15%;">户主身份证:</td>
								<td style="width:35%;">{{item.hzsfz}}</td>
							</tr>
							<tr style="height:40px;">
								<td style="width:15%;">与户主关系:</td>
								<td style="width:35%;">{{item.abm_ex1}}</td>
								<td style="width:15%;">家庭人口:</td>
								<td style="width:35%;">{{item.pnum}}</td>
							</tr>
							<tr style="height:40px;">
								<td style="width:15%;">行政区划:</td>
								<td style="width:35%;">{{item.ab_ex2+item.ab_ex1}}</td>
								<td style="width:15%;">户籍地址:</td>
								<td style="width:35%;">{{item.ab_ex4}}</td>
							</tr>
							<tr style="height:40px;">
								<td style="width:15%;">救助类型:</td>
								<td style="width:35%;">{{item.ab_ex82}}</td>
								<td style="width:15%;">项目名称:</td>
								<td style="width:35%;">{{item.ab_ex83}}</td>
							</tr>
							<tr style="height:40px;">
								<td style="width:15%;">救助金额:</td>
								<td style="width:35%;">{{item.ab_ex84}}</td>
								<td style="width:15%;">发放时间:</td>
								<td style="width:35%;">{{item.ab_dat17}}</td>
							</tr>
						</table>
						
						<table class="top_2" v-else-if='item.ab_ex13=="社会组织救助" '>
							<tr style="height:40px;">
								<td style="width:15%;">户主姓名:</td>
								<td style="width:35%;">{{item.hzxm}}</td>
								<td style="width:15%;">户主身份证:</td>
								<td style="width:35%;">{{item.hzsfz}}</td>
							</tr>
							<tr style="height:40px;">
								<td style="width:15%;">与户主关系:</td>
								<td style="width:35%;">{{item.abm_ex1}}</td>
								<td style="width:15%;">家庭人口:</td>
								<td style="width:35%;">{{item.pnum}}</td>
							</tr>
							<tr style="height:40px;">
								<td style="width:15%;">行政区划:</td>
								<td style="width:35%;">{{item.ab_ex2+item.ab_ex1}}</td>
								<td style="width:15%;">户籍地址:</td>
								<td style="width:35%;">{{item.ab_ex4}}</td>
							</tr>
							<tr style="height:40px;" >
								<td style="width:15%;">社会组织:</td>
								<td style="width:35%;">{{item.ab_ex115}}</td>
								<td style="width:15%;">救助类型:</td>
								<td style="width:35%;">{{item.ab_ex82}}</td>
							</tr>
							<tr style="height:40px;" >
								<td style="width:15%;">项目名称:</td>
								<td style="width:35%;">{{item.ab_ex83}}</td>
								<td style="width:15%;">救助金额:</td>
								<td style="width:35%;">{{item.ab_ex84}}</td>
							</tr>
							<tr style="height:40px;" >
								<td style="width:15%;">发放时间:</td>
								<td style="width:35%;">{{item.ab_dat17}}</td>
							</tr>
						</table>
						
						<table class="top_2" v-else-if='item.ab_ex13=="民政补助"'>
							<tr style="height:40px;">
								<td style="width:15%;">户主姓名:</td>
								<td style="width:35%;">{{item.hzxm}}</td>
								<td style="width:15%;">户主身份证:</td>
								<td style="width:35%;">{{item.hzsfz}}</td>
							</tr>
							<tr style="height:40px;">
								<td style="width:15%;">与户主关系:</td>
								<td style="width:35%;">{{item.abm_ex1}}</td>
								<td style="width:15%;">家庭人口:</td>
								<td style="width:35%;">{{item.pnum}}</td>
							</tr>
							<tr style="height:40px;">
								<td style="width:15%;">行政区划:</td>
								<td style="width:35%;">{{item.ab_ex2+item.ab_ex1}}</td>
								<td style="width:15%;">资金名称:</td>
								<td style="width:35%;">{{item.ab_ex11}}</td>
							</tr>
							<tr style="height:40px;">
								<td style="width:15%;">救助金额:</td>
								<td style="width:35%;">{{item.ab_ex84}}</td>
								<td style="width:15%;">发放日期:</td>
								<td style="width:35%;">{{item.ab_dat17}}</td>
							</tr>
						</table>
						<table class="top_2" v-else-if='item.ab_ex13=="长护险"'>
							<tr style="height:40px;">
								<td style="width:15%;">统筹区:</td>
								<td style="width:35%;">{{item.abi_ex1}}</td>
								<td style="width:15%;">镇街:</td>
								<td style="width:35%;">{{item.abi_ex7}}</td>
							</tr>
							<tr style="height:40px;">
								<td style="width:15%;">残疾类别:</td>
								<td style="width:35%;">{{item.abi_ex5}}</td>
								<td style="width:15%;">残疾等级:</td>
								<td style="width:35%;">{{item.abi_ex6}}</td>
							</tr>
							<tr style="height:40px;">
								<td style="width:15%;">待遇开始日期:</td>
								<td style="width:35%;">{{item.abi_ex8}}</td>
								<td style="width:15%;">待遇标准:</td>
								<td style="width:35%;">{{item.abi_ex9}}</td>
							</tr>
							<tr style="height:40px;">
								<td style="width:15%;">备注:</td>
								<td style="width:35%;">{{item.abi_ex10}}</td>
							</tr>
						</table>
						<table class="top_2" v-else-if='item.ab_ex13!="低保" && item.ab_ex13!="特困供养" && item.ab_ex13!="临时救助" && item.ab_ex13!="其他救助" && item.ab_ex13!="低收入家庭" && item.ab_ex13!="家庭边缘" && item.ab_ex13!="司法援助" && item.ab_ex13!="医疗救助" && item.ab_ex13!="住房救助" && item.ab_ex13!="教育救助" && item.ab_ex13!="灾害救助" && item.ab_ex13!="就业救助" && item.ab_ex13!="工会救助" && item.ab_ex13!="团委救助" && item.ab_ex13!="妇联救助" && item.ab_ex13!="红会救助" && item.ab_ex13!="慈善救助" && item.ab_ex13!="特困职工" && item.ab_ex13!="社会组织救助" && item.ab_ex13!="民政补助" && item.ab_ex13!="长护险"'>
							<tr style="height:40px;">
								<td style="width:15%;">行政区划:</td>
								<td style="width:35%;">{{item.abd_ex1}}</td>
								<td style="width:15%;">残疾证号:</td>
								<td style="width:35%;">{{item.abd_ex5}}</td>
							</tr>
							<tr style="height:40px;">
								<td style="width:15%;">补贴类型:</td>
								<td style="width:35%;">{{item.abd_ex6}}</td>
								<td style="width:15%;">补贴对象类型:</td>
								<td style="width:35%;">{{item.abd_ex7}}</td>
							</tr>
							<tr style="height:40px;">
								<td style="width:15%;">申请时间:</td>
								<td style="width:35%;">{{item.abd_dat3}}</td>
								<td style="width:15%;">补贴金额:</td>
								<td style="width:35%;">{{item.abd_ex8}}</td>
							</tr>
							<tr style="height:40px;">
								<td style="width:15%;">发放起始月份:</td>
								<td style="width:35%;">{{item.abd_ex9}}</td>
								<td style="width:15%;">续发月份:</td>
								<td style="width:35%;">{{item.abd_ex10}}</td>
							</tr>
							<tr style="height:40px;">
								<td style="width:15%;">生活补贴:</td>
								<td style="width:35%;">{{item.abd_ex39}}</td>
								<td style="width:15%;">补贴金额:</td>
								<td style="width:35%;">{{item.abd_ex40}}</td>
							</tr>
							<tr style="height:40px;">
								<td style="width:15%;">护理补贴:</td>
								<td style="width:35%;">{{item.abd_ex41}}</td>
								<td style="width:15%;">补贴金额:</td>
								<td style="width:35%;">{{item.abd_ex42}}</td>
							</tr>
							<tr style="height:40px;">
								<td style="width:15%;">残疾等级:</td>
								<td style="width:35%;">{{item.abd_ex14}}</td>
								<td style="width:15%;">残疾类别:</td>
								<td style="width:35%;">{{item.abd_ex15}}</td>
							</tr>
						</table>
						<el-table :data='item.tableData' v-if='item.tableData && item.tableData.length>0' height='200' border  class="top_2">
							<el-table-column prop="ag_ex1" label="发放月份" width="180" :formatter="formatValue"></el-table-column>
							<el-table-column prop="ag_ex2" label="发放金额" width="180" :formatter="formatValue"></el-table-column>
							<el-table-column prop="ag_ex3" label="发放人" width="180" :formatter="formatValue"></el-table-column>
							<el-table-column prop="ag_ex4" label="备注" width="180" :formatter="formatValue"></el-table-column>
							<el-table-column prop="ag_ex5" label="开户银行" width="180" :formatter="formatValue"></el-table-column>
							<el-table-column prop="ag_ex6" label="银行账户" width="180" :formatter="formatValue"></el-table-column>
							<el-table-column prop="ag_ex7" label="人数" width="180" :formatter="formatValue"></el-table-column>
							<el-table-column prop="ag_ex8" label="发放类目" width="180" :formatter="formatValue"></el-table-column>
						</el-table>
					</div>
				</div>
				<!-- <div style='clear:both'></div> -->
			</el-form>
		</div>
		<div class="ainfo2">
			<div style="margin-left:20px;text-align:center;border-bottom:1px solid #ddd;padding-bottom:10px;">
				<!-- <el-button type="primary" size="small" @click="save">保存</el-button> -->
				<el-button size="small" @click="closeView">返回</el-button>
			</div>
			<div style="margin-left:25%;margin-top:20px;">
				<ul>
					<li :class="{listStyle:isShow1}" @click="isShow(1)">
						<a class="ainfoFont" :class="{listStyleA:!isShow1}" @click="counter('#page1')">申请人基本情况</a><br>
					</li>
					<li :class="{listStyle:isShow2}" @click="isShow(2)">
						<a class="ainfoFont" :class="{listStyleA:!isShow2}" @click="counter('#page2')">救助情况</a><br>
					</li>
				</ul>
			</div>
		</div>
		</div>
		
	</div>
</template>
<script>
	import request from '@/utils/request'
	import imageView from '../imageView'
	import upload from '../upload'
	// import  baseURL from '@/utils/baseUrl'
	export default {
		name: "dsrListView",
		components:{
			imageView,
			upload
		},
		filters:{
			
		},
		data() {
			return {
				isShow1: false,
				isShow2: true,
				isShow3: true,
				basicInf: {},
				sId: "",
				cId: "",
				type: "",
				ab_ex3:this.$route.query.name,
				ab_ex7:this.$route.query.cId,
				sTitle:'',
				BasicHeadHtml1:[],
				// BasicHeadHtml1:[
				// 	{
				// 		idName:'王友荣的基本保障重复对比',
				// 		hzxm:'hzxm',
				// 		hzsfz:'hzsfz',
				// 		abm_ex1:'abm_ex1',
				// 		pnum:'pnum',
				// 		ab_ex1:'ab_ex1',
				// 		ab_ex13:'低保',
				// 		ab_ex4:'ab_ex4',
				// 		ab_dat14:'ab_dat14',
				// 		ab_dat5:'ab_dat5',
				// 		ab_ex18:'ab_ex18',
				// 		ab_ex19:'ab_ex19',
				// 		ab_ex49:'ab_ex49',
				// 		ab_ex20:'ab_ex20',
				// 		tableData:[
				// 			{
				// 				date:11,
				// 				date2:12,
				// 				date3:13,
				// 				date4:14,
				// 				date5:15,
				// 				date6:16,
				// 				date7:17,
				// 				date8:18,
				// 			},{
				// 				date:11,
				// 				date2:12,
				// 				date3:13,
				// 				date4:14,
				// 				date5:15,
				// 				date6:16,
				// 				date7:17,
				// 				date8:18,
				// 			},{
				// 				date:11,
				// 				date2:12,
				// 				date3:13,
				// 				date4:14,
				// 				date5:15,
				// 				date6:16,
				// 				date7:17,
				// 				date8:18,
				// 			},{
				// 				date:11,
				// 				date2:12,
				// 				date3:13,
				// 				date4:14,
				// 				date5:15,
				// 				date6:16,
				// 				date7:17,
				// 				date8:18,
				// 			},{
				// 				date:11,
				// 				date2:12,
				// 				date3:13,
				// 				date4:14,
				// 				date5:15,
				// 				date6:16,
				// 				date7:17,
				// 				date8:18,
				// 			}
				// 		]
				// 	},{
				// 		idName:'王友荣的基本保障重复对比',
				// 		hzxm:'hzxm',
				// 		hzsfz:'hzsfz',
				// 		abm_ex1:'abm_ex1',
				// 		pnum:'pnum',
				// 		ab_ex1:'ab_ex1',
				// 		ab_ex13:'低保',
				// 		ab_ex4:'ab_ex4',
				// 		ab_dat14:'ab_dat14',
				// 		ab_dat5:'ab_dat5',
				// 		ab_ex18:'ab_ex18',
				// 		ab_ex19:'ab_ex19',
				// 		ab_ex49:'ab_ex49',
				// 		ab_ex20:'ab_ex20',
				// 		tableData:[
				// 			{
				// 				date:11,
				// 				date2:12,
				// 				date3:13,
				// 				date4:14,
				// 				date5:15,
				// 				date6:16,
				// 				date7:17,
				// 				date8:18,
				// 			},{
				// 				date:11,
				// 				date2:12,
				// 				date3:13,
				// 				date4:14,
				// 				date5:15,
				// 				date6:16,
				// 				date7:17,
				// 				date8:18,
				// 			},{
				// 				date:11,
				// 				date2:12,
				// 				date3:13,
				// 				date4:14,
				// 				date5:15,
				// 				date6:16,
				// 				date7:17,
				// 				date8:18,
				// 			},{
				// 				date:11,
				// 				date2:12,
				// 				date3:13,
				// 				date4:14,
				// 				date5:15,
				// 				date6:16,
				// 				date7:17,
				// 				date8:18,
				// 			},{
				// 				date:11,
				// 				date2:12,
				// 				date3:13,
				// 				date4:14,
				// 				date5:15,
				// 				date6:16,
				// 				date7:17,
				// 				date8:18,
				// 			}
				// 		]
				// 	}
				// ]
			}
		},
		created() {
			this.loadData();
		},
		watch:{
			$route(){
				this.BasicHeadHtml1 = []
				this.ab_ex3=this.$route.query.name
				this.ab_ex7=this.$route.query.cId
				this.loadData()
			}
		},
		methods: {
			counter(id) { //counter1是绑定的点击事件名称
				document.querySelector(id).scrollIntoView(true);
			},
			loadData() {
				this.sId = this.$route.query.sId;
				// this.cId = this.$route.query.cId;
				this.type = this.$route.query.type;
				this.getRepeatBasicData({
					// // 测试数据
					// sId: '32128420020221522X',
					// type: '其他救助重复对比',
					// jz:'慈善救助,教育救助,教育救助,教育救助',
					// ab_ex3:'谢欣雨',
					sId: this.$route.query.cId,    //身份证
					type: this.type,
					// type: '基本保障重复对比',
					jz:this.$route.query.jz,
					ab_ex3:this.$route.query.name,
					ar_ex11:this.$route.query.ar_ex11,
				}).then(res => {
					console.log(res)
				}).catch(res => {
					if(typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200){
						console.log('请求失败了-----------------------')
						this.$message.error('数据获取失败或请求超时')
						this.$emit("closes", false)
						this.$router.go(-1)
						return false
					}
					console.log(res)
					console.log(res.response.data[0].sTitle)
					let json = res.response.data[0]
					let jsonData = res.response.data[0].data
					this.sTitle = json.sTitle
					jsonData.forEach((item,index)=>{
						let data = jsonData[index]
						for(let k in data){
						    let v = data[k];
						    if(!v){
						        continue;
						    }
						    v = unescape(v);
						    if(k.indexOf('dat') != -1||k=='abi_ex8'){
						        v = v.indexOf('1900') != -1 ? "" : v.substring(0, 10);
						    }
						    data[k]=v;
						}
						let ab_ex13=data.ab_ex13;
						
						// 在页面里循环显示这个内容
						if(ab_ex13=="低保" || ab_ex13=="特困供养" || ab_ex13=="临时救助" || ab_ex13=="其他救助" || ab_ex13=="低收入家庭"){
							this.BasicHeadHtml1[index] = data
							// this.BasicHeadHtml1[index].ab_ex13 = data.ab_ex13
							// this.BasicHeadHtml1[index].hzxm = data.hzxm
							// this.BasicHeadHtml1[index].hzsfz = data.hzsfz
							// this.BasicHeadHtml1[index].abm_ex2 = data.abm_ex2
							// this.BasicHeadHtml1[index].abm_ex1 = data.abm_ex1
							// this.BasicHeadHtml1[index].pnum = data.pnum
							// this.BasicHeadHtml1[index].ab_ex1 = data.ab_ex1
							// this.BasicHeadHtml1[index].ab_ex4 = data.ab_ex4
							// this.BasicHeadHtml1[index].ab_dat14 = data.ab_dat14
							// this.BasicHeadHtml1[index].ab_dat5 = data.ab_dat5
							// this.BasicHeadHtml1[index].ab_ex18 = data.ab_ex18
							// this.BasicHeadHtml1[index].ab_ex19 = data.ab_ex19
							// this.BasicHeadHtml1[index].ab_ex49 = data.ab_ex49
							// this.BasicHeadHtml1[index].ab_ex20 = data.ab_ex20
							this.getGrantData({
								sId: data.ab_id
							}).then((res)=>{
								console.log(res)
							}).catch((res)=>{
								console.log(res.response.data[0].data)
								let jsonData = res.response.data[0].data;
								// this.BasicHeadHtml1[index].tableData=[]
								this.$set(this.BasicHeadHtml1[index],'tableData',[])
								console.log(this.BasicHeadHtml1[index])
								jsonData.forEach((item2,index2)=>{
									// for(let i in item2){
									// 	item2[i] =unescape(item2[i])
									// }
									console.log(item2)
									console.log(1111)
									console.log(this.BasicHeadHtml1[index].tableData)
									// this.BasicHeadHtml1[index].tableData[ag_ex1] = item.ag_ex1
									this.$set(this.BasicHeadHtml1[index].tableData,index2,item2)
									// this.BasicHeadHtml1[index].tableData[index2] = item2
									console.log(this.BasicHeadHtml1)
									
								})
								console.log(this.BasicHeadHtml1)
								this.$forceUpdate();
							})
						}else if(ab_ex13=="家庭边缘"){
							this.BasicHeadHtml1[index] = data
							this.BasicHeadHtml1[index].ab_ex13 = '低收入家庭'
							this.getGrantData({
								sId: data.ab_id
							}).then((res)=>{
								console.log(res)
							}).catch((res)=>{
								console.log(res)
								let jsonData = res.response.data[0].data;
								this.$set(this.BasicHeadHtml1[index],'tableData',[])
								jsonData.forEach((item2,index2)=>{
									// this.BasicHeadHtml1[index].tableData = item
									// this.BasicHeadHtml1[index].tableData[index2] = item2
									this.$set(this.BasicHeadHtml1[index].tableData,index2,item2)
								})
							})
						}else if(ab_ex13=="医疗救助" || ab_ex13=="住房救助" || ab_ex13=="教育救助" || ab_ex13=="灾害救助" || ab_ex13=="就业救助" || ab_ex13=="工会救助" || ab_ex13=="团委救助" || ab_ex13=="妇联救助" || ab_ex13=="红会救助" || ab_ex13=="慈善救助" || ab_ex13=="特困职工" || ab_ex13=="司法援助" || ab_ex13=="社会组织救助" || ab_ex13=="民政补助" || ab_ex13=="长护险"){
							// this.BasicHeadHtml1[index] = data
							// this.BasicHeadHtml1[index].tableData[index2] = item2
							this.$set(this.BasicHeadHtml1[index].tableData,index2,item2)
						}else{
							// this.BasicHeadHtml1[index] = data
							// this.BasicHeadHtml1[index].tableData[index2] = item2
							this.$set(this.BasicHeadHtml1[index].tableData,index2,item2)
						}
						this.$forceUpdate()
					})
				})

			
			},
			getRepeatBasicData(data) {
				return request({
					headers: {
						'Accept': 'application/json',
					},
					url: '/social/assistance/getRepeatBasicData',
					method: 'post',
					data
				})
			},
			getGrantData(data){
				return request({
					headers: {
						'Accept': 'application/json',
					},
					url: '/social/assistance/getGrantData',
					method: 'post',
					data
				})
			},
			formatValue(row, column, cellValue, index){
				return unescape(cellValue)
			},
			closeView() {
				this.$emit("closes", false)
				this.$router.go(-1)
			},
			isShow(n) {
				this.isShow1 = true
				this.isShow2 = true
				this.isShow3 = true

				if (n == 1) {
					this.isShow1 = false
				} else if (n == 2) {
					this.isShow2 = false
				} else if (n == 3) {
					this.isShow3 = false
				}
			},

		}
	}
</script>
<style scoped>
	.g-box {
		height: 80VH !important;
	}
.g-box2 {
		height:100%;
		width:100%;
		overflow: auto !important;
		display: flex;
		display: -webkit-flex;
		flex-direction: row;
	}
	.lineSt {
		background-color: #dcdfe6;
		height: 1px;
		width: 100%;
		margin-bottom: 10px;
	}

	.top_2 {
		width: 100%;
	}

	.top_1 {
		margin-bottom: 50px;
	}

	.imgSt {
		width: 140px;
		margin-top: -4%;
		z-index: 10000;
		transform: rotate(30deg);
		-ms-transform: rotate(30deg);
		/* IE 9 */
	}

	.line_blue {
		border-left: 2px solid #3385FF;
	}

	.family {
		width: 100%;
		margin-top: 20px;
		margin-bottom: 50px;
	}

	.top_3 {
		width: 50%;
		float: left;
	}

	.top_4 {
		height: 200px;
		margin-top: 40px;
		margin-bottom: -30px;
	}

	.demo-image__preview {
		height: 120px;
		width: 100px;
		float: left;
		margin-left: 5%;
	}

	.info2 {
		flex: 1;
		padding-right: 10px;
		box-sizing: border-box;
		border-right: 1px solid #ddd;
		overflow: auto
	}

	.ainfo2 {
		width: 240px;
		font-size: 14px;
		line-height: 20px;
		text-align: left;
		padding-left: 10px;
		box-sizing: border-box;
	}


	.ainfoFont {
		display: block;
		margin-bottom: -15px;
		font-weight: bold;
		color: #606266;
	}

	.listStyle {
		list-style: none;
	}

	.listStyleA {
		color: #3385FF !important
	}


	.btn button {
		padding: 2px 6px;
		background: #ffffff;
		border: 1px solid #606266;
	}

	.btn :nth-child(1) {
		margin-right: 5px;
		background: blue;
		color: #ffffff;
		border: 1px solid blue;

	}
</style>

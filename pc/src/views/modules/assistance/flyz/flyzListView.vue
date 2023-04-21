<template>
	<div class="g-box">
		<div class='g-box2'>
			<div class="info2">
			<el-form :inline="true" class="demo-form-inline">
				<h3 class="line_blue" id="page1">&emsp;申请人基本情况</h3>
				<div class="lineSt"></div>
				<div class="top_1">
					<table class="top_2">
						<tr style="height:40px;">
							<td style="width:10%;">姓名:</td>
							<td style="width:10%;">{{basicInf.ab_ex3}}</td>
							<td style="width:10%;">性别:</td>
							<td style="width:20%;">{{basicInf.ab_ex69}}</td>
							<td style="width:10%;">出生日期:</td>
							<td style="width:20%;">{{basicInf.ab_dat11 | formatDate}}</td>
							<td rowspan="2"></td>
						</tr>
						<tr style="height:40px;">
							<td style="width:10%;">国籍:</td>
							<td style="width:10%;">{{basicInf.ab_ex54}}</td>
							<td style="width:10%;">民族:</td>
							<td style="width:20%;">{{basicInf.ab_ex65}}</td>
							<td style="width:10%;">身份证号:</td>
							<td style="width:20%;">{{basicInf.ab_ex7}}</td>
							<td rowspan="2"></td>
						</tr>
						<tr style="height:40px;">
							<td style="width:10%;">文化程度:</td>
							<td style="width:10%;">{{basicInf.ab_ex91}}</td>
							<td style="width:10%;">户籍所在地:</td>
							<td style="width:20%;">{{basicInf.ab_ex4}}</td>
							<td style="width:10%;">住所地<br>(经常居住地):</td>
							<td style="width:20%;">{{basicInf.ab_ex11}}</td>
							<td rowspan="2"></td>
						</tr>
						<tr style="height:40px;">
							<td style="width:10%;">邮政编码:</td>
							<td style="width:10%;">{{basicInf.ab_ex52}}</td>
							<td style="width:10%;">联系电话:</td>
							<td style="width:20%;">{{basicInf.ab_ex28}}</td>
							<td style="width:10%;">工作单位:</td>
							<td style="width:20%;">{{basicInf.ab_ex53}}</td>
							<td rowspan="2"></td>
						</tr><tr style="height:40px;">
							<td style="width:10%;">身份类别<br>(可重复交叉):</td>
							<td style="width:10%;">{{basicInf.ab_ex55}}</td>
						</tr>
					</table>
				</div>
				<!-- <div style='clear:both'></div> -->
				<h3 class="line_blue" id="page2">&emsp;代理人基本情况</h3>
				<div class="lineSt"></div>
				<div class="top_1">
					<table class="top_2">
						<tr style="height:40px;">
							<td style="width:10%;">姓名:</td>
							<td style="width:35%;">{{basicInf.ab_ex82}}</td>
							<td style="width:15%;">身份证号:</td>
							<td style="width:40%;">{{basicInf.ab_ex84}}</td>
						</tr>
						<tr style="height:40px;">
							<td style="width:10%;">代理方式:</td>
							<td style="width:35%;">{{basicInf.ab_ex59}}</td>
							<td style="width:15%;">与申请人的关系:</td>
							<td style="width:40%;">{{basicInf.ab_ex86}}</td>
						</tr>
						<tr style="height:40px;">
							<td>联系方式:</td>
							<td>{{basicInf.ab_ex87}}</td>
						</tr>
					</table>
				</div>
				<!-- <div style='clear:both'></div> -->
				<h3 class="line_blue" id="page3">&emsp;案件情况</h3>
				<div class="lineSt"></div>
				<div class="top_1">
					<table class="top_2">
						<tr style="height:40px;">
							<td style="width:10%;">案件来源:</td>
							<td style="width:20%;">{{basicInf.ab_ex56}}</td>
							<td style="width:10%;">申请事项:</td>
							<td style="width:20%;">{{basicInf.ab_ex57}}</td>
							<td style="width:10%;">申请事项所处阶段:</td>
							<td style="width:20%;">{{basicInf.ab_ex58}}</td>
						</tr>
						<tr style="height:40px;">
							<td colspan="6" style="width: 100%;">案情及申请理由概述:</td>
						</tr>
						<tr style="height:40px;">
							<td colspan="6" style="width: 100%;">{{basicInf.ab_ex51}}</td>
						</tr>
						<tr>
							<td colspan="6" style="width:100%;text-align: right;">本人承诺以上所填内容和提交的证件、证明材料均真实。</td>
						</tr>
						<tr>
							<td colspan="6" style="width:100%;text-align: right;">申请人:<span style="width: 6%;min-width: 70px;display: inline-block; padding-right: 1%;">{{basicInf.ab_ex3}}</span>代理人:<span style="width: 6%;min-width: 70px;display: inline-block; padding-right: 1%;">{{basicInf.ab_ex82}}</span>日期:<span style="width: 8%;min-width: 100px;display: inline-block; padding-right: 1%;">{{basicInf.ab_dat14 | formatDate}}</span></td>
						</tr>
						
						<tr style="height:40px;">
							<td colspan="6" style="width:10%;">审查意见:</td>
						</tr>
						<tr style="height:40px;">
							<td colspan="6" style="width:100%;">{{basicInf.ab_ex27_ab_ex25}}</td>
						</tr>
						<tr>
							<td colspan="6" style="width:100%;text-align: right;">审查人:<span style="width: 6%;min-width: 70px;display: inline-block; padding-right: 1%;">{{basicInf.ab_ex19}}</span>日期:<span style="width: 8%;min-width: 100px;display: inline-block; padding-right: 1%;">{{basicInf.ab_dat4 | formatDate}}</span></td>
						</tr>
						
						<tr style="height:40px;">
							<td colspan="6" style="width:10%;">审批意见:</td>
						</tr>
						<tr style="height:40px;">
							<td colspan="6" style="width:100%;">{{basicInf.ab_ex21_ab_ex26}}</td>
						</tr>
						<tr>
							<td colspan="6" style="width:100%;text-align: right;">审批人:<span style="width: 6%;min-width: 70px;display: inline-block; padding-right: 1%;">{{basicInf.ab_ex20}}</span>日期:<span style="width: 8%;min-width: 100px;display: inline-block; padding-right: 1%;">{{basicInf.ab_dat5 | formatDate}}</span></td>
						</tr>
					</table>
				</div>			
				<!-- <div style='clear:both'></div> -->
				<h3 class="line_blue" id="page11" style="margin-top: 10px;" v-if="this.type == 'cs'">&emsp;审核</h3>
				<div class="lineSt" v-if="this.type == 'cs'"></div>
				<div class="top_1" v-if="this.type == 'cs'">
					<el-row>
							<el-col :span="2">
								<div style="line-height: 30px;">审核意见</div>
							</el-col>
							<el-col :span="6">
								<el-select @change="changeSh" v-model="auditValue.ab_ex27" placeholder="请选择">
									<el-option v-for="item in options" :key="item.value" :label="item.label"
										:value="item.value"></el-option>
								</el-select>
							</el-col>
							<el-col :span="2">
								<div style="line-height: 30px;">审核人</div>
							</el-col>
							<el-col :span="6">
								<el-input v-model="auditValue.ab_ex19"></el-input>
							</el-col>
							<el-col :span="2" style="line-height: 30px;">
								<div>审核时间</div>
							</el-col>
							<el-col :span="6">
								<el-date-picker
								    v-model="auditValue.ab_dat4"
								    type="datetime"
									value-format="yyyy-MM-dd HH:mm"
								    placeholder="选择日期时间">
								</el-date-picker>
							</el-col>
					</el-row>
					<el-row style="margin-top: 10px;">
						<el-col :span="2" style="line-height: 30px;">
							<div>备注</div>
						</el-col>
						<el-col :span="20">
							<el-input type="textarea" autosize v-model="auditValue.ab_ex25"></el-input>
						</el-col>
					</el-row>
					<el-row style="margin-top: 10px;" type="flex" justify="center">
						<el-col :span="24" style="text-align: center;">
							<el-button type="primary" @click="save(auditValue)">保存</el-button>
						</el-col>
					</el-row>
				</div>
				<br>
				<!-- //退回 -->
				<h3 class="line_blue" id="page11" style="margin-top: 20px;" v-if="this.type == 'th'">&emsp;审核</h3>
				<div class="lineSt" v-if="this.type == 'th'"></div>
				<div class="top_1" v-if="this.type == 'th'">
					<el-row :gutter="0">
							<el-col :span="2">
								<div style="line-height: 30px;">审核意见</div>
							</el-col>
							<el-col :span="6">
								<el-select @change="changeSh" v-model="auditValue.ab_ex27" placeholder="请选择">
									<el-option v-for="item in options1" :key="item.value" :label="item.label"
										:value="item.value"></el-option>
								</el-select>
							</el-col>
							<el-col :span="2">
								<div style="line-height: 30px;">审核人</div>
							</el-col>
							<el-col :span="6">
								<el-input v-model="auditValue.ab_ex19"></el-input>
							</el-col>
							<el-col :span="2" style="line-height: 30px;">
								<div>审核时间</div>
							</el-col>
							<el-col :span="6">
								<el-date-picker
								    v-model="auditValue.ab_dat4"
								    type="datetime"
									value-format="yyyy-MM-dd HH:mm"
								    placeholder="选择日期时间">
								</el-date-picker>
							</el-col>
					</el-row>
					<el-row style="margin-top: 10px;">
						<el-col :span="2" style="line-height: 30px;">
							<div>退回原因</div>
						</el-col>
						<el-col :span="20">
							<el-input type="textarea" autosize v-model="auditValue.ab_ex25"></el-input>
						</el-col>
					</el-row>
					<el-row style="margin-top: 10px;" type="flex" justify="center">
						<el-input v-if="false" v-model="auditValue.ab_ex15"></el-input>
						<el-col :span="24" style="text-align: center;">
							<el-button type="primary" @click="save(auditValue)">保存</el-button>
						</el-col>
					</el-row>
				</div>
				<br>

				<h3 class="line_blue" id="page11" style="margin-top: 20px;" v-if="this.type == 'sp'">&emsp;审批</h3>
				<div class="lineSt" v-if="this.type == 'sp'"></div>
				<div class="top_1" v-if="this.type == 'sp'">
					<el-row>
							<el-col :span="2">
								<div style="line-height: 30px;">审批意见</div>
							</el-col>
							<el-col :span="6">
								<el-select @change="changeSh" v-model="approval.ab_ex21" placeholder="请选择">
									<el-option v-for="item in options3" :key="item.value" :label="item.label"
										:value="item.value"></el-option>
								</el-select>
							</el-col>
							<el-col :span="2">
								<div style="line-height: 30px;">审批人</div>
							</el-col>
							<el-col :span="6">
								<el-input v-model="approval.ab_ex20"></el-input>
							</el-col>
							<el-col :span="2" style="line-height: 30px;">
								<div>审批时间</div>
							</el-col>
							<el-col :span="6">
								<!-- <el-input placeholder="yyyy-MM-dd" v-model="approval.ab_dat5"></el-input> -->
								<el-date-picker
								    v-model="auditValue.ab_dat5"
								    type="datetime"
									value-format="yyyy-MM-dd HH:mm"
								    placeholder="选择日期时间">
								</el-date-picker>
							</el-col>
					</el-row>
					<el-row style="margin-top: 10px;">
						<el-col :span="2" style="line-height: 30px;">
							<div>备注</div>
						</el-col>
						<el-col :span="20">
							<el-input type="textarea" autosize v-model="approval.ab_ex26"></el-input>
						</el-col>
					</el-row>
					<el-row style="margin-top: 10px;" type="flex" justify="center">
						<el-col :span="24" style="text-align: center;">
							<el-button type="primary" @click="save3(approval)">保存</el-button>
						</el-col>
					</el-row>
				</div>
				<br>

				<h3 class="line_blue" id="page10">&emsp;审批记录</h3>
				<div class="lineSt"></div>
				<div class="top_1">
					<div class="top_1">
						<table style="width:100%;table-layout:fixed" id="recordt">
							<colgroup>
								<col style="width:15%">
								<col style="width:20%">
								<col style="width:15%">
								<col style="width:15%">
								<col style="width:15%">
								<col style="width:20%">
							</colgroup>
							
							<tbody v-for="(itemR,index) in record" :key="index">
								<tr>
									<td style="color:#899197;height:30px">处理步骤：</td>
									<td>{{itemR.ar_ex4}}</td>
									<td style="color:#899197">处理时间：</td>
									<td>{{itemR.ar_dat1}}</td>
									<td style="color:#899197">处理结果：</td>
									<td rowspan="2" style="text-align:left">
										<img v-if="itemR.ar_ex3 == '同意'"
											src="@/assets/img/auditStatus/agree.png" style="width:100px">
										<img v-else src="@/assets/img/auditStatus/return.png"
											style="width:100px">
									</td>
								</tr>
								<tr>
									<td style="color:#899197;height:30px">处理人：</td>
									<td>{{itemR.ar_ex5}}</td>
									<td style="color:#899197">处理用时：</td>
									<td>{{itemR.ar_ex6}}天</td>
								</tr>
								<tr v-if="itemR.flag == true">
									<td style="color:#899197;height:30px">公示时间：</td>
									<td>{{itemR.ab_dat9}}</td>
									<td style="color:#899197">公示地点：</td>
									<td>{{itemR.ab_ex47}}</td>
								</tr>
								<tr style="border-bottom:1px solid #ddd">
									<td style="color:#899197;height:30px">处理意见：</td>
									<td colspan="4">{{itemR.ar_ex2}}</td>
								</tr>
								<tr>
									<td colspan="5" style="height:20px">&nbsp;</td>
								</tr>
							</tbody>
							<!-- <tbody><tr><td style="color:#899197;height:30px">处理步骤：</td><td>{{basicInf.ar_ex4}}</td><td style="color:#899197">处理时间：</td><td>{{basicInf.ar_dat1}}</td><td style="color:#899197">处理结果：</td><td rowspan="2" style="text-align:left"><img src="http://221.130.79.150:10088/image/aud/%E5%90%8C%E6%84%8F.png" style="width:100px"></td></tr><tr><td style="color:#899197;height:30px">处理人：</td><td>{{basicInf.ar_ex5}}</td><td style="color:#899197">处理用时：</td><td>{{basicInf.ar_ex6}}天</td></tr><tr style="border-bottom:1px solid #ddd"><td style="color:#899197;height:30px">处理意见：</td><td colspan="4">{{basicInf.ar_ex2}}</td></tr><tr><td colspan="5" style="height:20px">&nbsp;</td></tr></tbody> -->
						</table>
					</div>
				</div>
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
						<a class="ainfoFont" :class="{listStyleA:!isShow2}" @click="counter('#page2')">代理人基本情况</a><br>
					</li>
					<li :class="{listStyle:isShow3}" @click="isShow(3)">
						<a class="ainfoFont" :class="{listStyleA:!isShow3}" @click="counter('#page3')">案件情况</a><br>
					</li>
					<li :class="{listStyle:isShow11}" @click="isShow(11)"
						v-if="type=='cs'||type=='th'||type=='gs'||type=='sp'">
						<a class="ainfoFont" :class="{listStyleA:!isShow11}" @click="counter('#page11')">
							<span v-if="type=='cs'">审核</span>
							<span v-if="type=='th'">审核</span>
							<span v-if="type=='sp'">审批</span>
						</a><br>
					</li>
					<li :class="{listStyle:isShow10}" @click="isShow(10)">
						<a class="ainfoFont" :class="{listStyleA:!isShow10}" @click="counter('#page10')">审批记录</a>
					</li>
				</ul>
			</div>
		</div>
		</div>
		
	</div>
</template>
<script>
	import request from '@/utils/request'
	import imageView from '@/views/modules/assistance/imageView'
	import upload from '@/views/modules/assistance/upload'
	// import  baseURL from '@/utils/baseUrl'
	export default {
		name: "dsrListView",
		components:{
			imageView,
			upload
		},
		filters:{
			formatDate(date) {
				// date没有数据时不进行过滤
				if(!date){
					return
				}
				var d = new Date(date),
			    month = '' + (d.getMonth() + 1),
			    day = '' + d.getDate(),
			    year = d.getFullYear();
			 
				if (month.length < 2) month = '0' + month;
				if (day.length < 2) day = '0' + day;
			 
				return [year, month, day].join('-');
			}
		},
		data() {
			return {
				tableData: [],
				record: [],
				flag: true,
				// 初审
				auditValue: {
				},
				// 公示
				publicity: {
				},
				//审批
				approval: {
				},
				options: [{
					value: '同意',
					label: '同意'
				}, {
					value: '退回',
					label: '退回'
				}],
				options1: [{
					value: '退回',
					label: '退回'
				}],
				options2: [{
					value: '无异议',
					label: '无异议'
				}, {
					value: '有异议',
					label: '有异议'
				}],
				options3: [{
					value: '同意',
					label: '同意'
				}, {
					value: '退回',
					label: '退回'
				}],
				isShow1: false,
				isShow2: true,
				isShow3: true,
				isShow10: true,
				isShow11: true,
				basicInf: {},
				sId: "",
				cId: "",
				type: ""
			}
		},
		created() {
			// console.log('222222222222221111',this.type)
			// console.log(this.$route.query.tableData)
			this.loadData();
		},

		methods: {
			counter(id) { //counter1是绑定的点击事件名称
				document.querySelector(id).scrollIntoView(true);
				// const returnEle = document.querySelector("#page8"); //productId是将要跳转区域的id
				// if (!!returnEle) {
				// 	returnEle.scrollIntoView(true); // true 是默认的
				// }
				// document.querySelector("counter1").scrollIntoView(true); //这里的counter1是将要返回地方的id
			},
			loadData() {
				this.sId = this.$route.query.sId;
				this.cId = this.$route.query.cId;
				this.type = this.$route.query.type;
				this.getData({
					sId: this.sId,
					type: this.type
				}).then(res => {
					console.log(res)
					this.basicInf = res[0].data[0]
					// this.record = res.response.data[0].record
					this.record1(res[0].record)
					this.auditValue = res[0].data[0]
					if (this.type == "th")
						this.auditValue.ab_ex27 = "退回";

					this.publicity = res[0].data[0]

					this.approval = res[0].data[0]

				}).catch(res => {
					if(typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200){
						console.log('请求失败了-----------------------')
						this.$message.error('数据获取失败或请求超时')
						this.$emit("closes", false)
						this.$router.go(-1)
						return false
					}
					// console.log(res.response.data)
					this.basicInf = res.response.data[0].data[0]
					// this.record = res.response.data[0].record
					this.record1(res.response.data[0].record)
					this.auditValue = res.response.data[0].data[0]
					if (this.type == "th")
						this.auditValue.ab_ex27 = "退回";

					this.publicity = res.response.data[0].data[0]

					this.approval = res.response.data[0].data[0]
				})

			
			},
			getData(sid) {
				return request({
					headers: {
						'Accept': 'application/json',
					},
					url: '/social/assistance/getBasics',
					method: 'post',
					// data:{
					// sId:"57943",
					// },
					data: sid
				})
			},
			record1(rec) {
				for (let i in rec) {
					if ("公示开始" == rec[i].ar_ex4 && this.flag == false) {
						return true;
					}
					// this.record[i].ar_ex4 = rec[i].ar_ex4
					// this.record[i].ar_dat1 = rec[i].ar_dat1
					// this.record[i].ar_ex3 = rec[i].ar_ex3
					// this.record[i].ar_ex5 = rec[i].ar_ex5
					// this.record[i].ar_ex6 = rec[i].ar_ex6
					// this.record[i].ar_ex2 = rec[i].ar_ex2
					// this.record[i].flag = false
					this.record[i] = {
						ar_ex4: rec[i].ar_ex4,
						ar_dat1: rec[i].ar_dat1,
						ar_ex3: rec[i].ar_ex3,
						ar_ex5: rec[i].ar_ex5,
						ar_ex6: rec[i].ar_ex6,
						ar_ex2: rec[i].ar_ex2,
						flag: false
					}
					if ("公示开始" == rec[i].ar_ex4 && this.flag) {
						this.record[i].flag = true
						this.flag = false;
						this.record[i].ab_dat9 = this.basicInf.ab_dat9 + "~" + this.basicInf.ab_dat10
						this.record[i].ab_ex47 = this.basicInf.ab_ex47
						console.log(rec[i])
					}
				}
				console.log(this.record)
			},
			changeSh(val) {
				// var text = $("#ab_ex25").val();
				// if(text==null||text==''||text=='同意'||text=='退回重新核查'||text=='退回'){
				//     $("#ab_ex25").val(val);
				// }
				console.log(val)
			},
			save(data) {
				// console.log(data)
				if (data.ab_ex27 == "") {
					this.$message.error('请选择审核意见');
				} else {
					const loading = this.$loading({
						lock: true,
						text: 'Loading',
						spinner: 'el-icon-loading',
						background: 'rgba(0, 0, 0, 0.7)'
					});
					// 设置定时器，30秒请求失败刷新页面
					let time = setTimeout(()=>{
									loading.close()
									this.$emit("closes", false)
									this.$message.error("网络异常");
									this.$router.go(-1)
								},30000)
					this.saveBasiccs({
						"data": "[" + JSON.stringify(data) + "]",
						"sId": this.sId
					}).then((res) => {
						if (res[0].status == "+ok") {
							loading.close()
							this.$message.success(res[0].msg)
							this.$emit("closes", false)
							this.$router.go(-1)
						} else {
							loading.close()
							this.$message.error(res[0].msg)
						}
					}).catch((res) => {
						// 数据请求成功删除定时器
						clearTimeout(time);
						if (res.response.data[0].status=="+ok") {
							loading.close()
							this.$message.success(res.response.data[0].msg)
							this.$emit("closes", false)
							this.$router.go(-1)
						} else {
							loading.close()
							this.$message.error(res.response.data[0].msg)
						}
					})
				}
			},
			save3(data) {
				// console.log(data)
				if (data.ab_ex21 == "") {
					this.$message.error('请选择审批意见');
				} else {
					const loading = this.$loading({
						lock: true,
						text: 'Loading',
						spinner: 'el-icon-loading',
						background: 'rgba(0, 0, 0, 0.7)'
					});
					// 设置定时器，30秒请求失败刷新页面
					let time = setTimeout(()=>{
									loading.close()
									this.$emit("closes", false)
									this.$message.error("网络异常");
									this.$router.go(-1)
								},30000)
					this.saveBasicsh({
						"data": "[" + JSON.stringify(data) + "]",
						"sId": this.sId
					}).then((res) => {
						if (res[0].status == "+OK") {
							loading.close()
							this.$message.success(res[0].msg)
							this.$emit("closes", false)
							this.$router.go(-1)
						} else {
							loading.close()
							this.$message.error(res[0].msg)
						}
					}).catch((res) => {
						// 数据请求成功删除定时器
						clearTimeout(time);
						if (res.response.data[0].status=="+OK") {
							loading.close()
							this.$message.success(res.response.data[0].msg)
							this.$emit("closes", false)
							this.$router.go(-1)
						} else {
							loading.close()
							this.$message.error(res.response.data[0].msg)
						}
					})
				}
			},
			//初审 /.退回
			saveBasiccs(data) {
				let url = ''
				if (this.type == 'th') {
					url = "/social/assistance/saveBasicth"
				} else {
					url = "/social/assistance/saveSfyzBasiccs"
				}
				return request({
					headers: {
						'Accept': 'application/json',
					},
					url: url,
					method: 'post',
					data: data
				})
			},
			//审批
			saveBasicsh(data) {
				return request({
					headers: {
						'Accept': 'application/json',
					},
					url: '/social/assistance/saveBasicsh',
					method: 'post',
					data: data
				})
			},
			closeView() {
				this.$emit("closes", false)
				this.$router.go(-1)
			},
			isShow(n) {
				this.isShow1 = true
				this.isShow2 = true
				this.isShow3 = true
				this.isShow10 = true
				this.isShow11 = true

				if (n == 1) {
					this.isShow1 = false
				} else if (n == 2) {
					this.isShow2 = false
				} else if (n == 3) {
					this.isShow3 = false
				} else if (n == 10) {
					this.isShow10 = false
				} else if (n == 11) {
					this.isShow11 = false
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
		width: 90%;
		margin-top: 20px;
		margin-left: 5%;
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

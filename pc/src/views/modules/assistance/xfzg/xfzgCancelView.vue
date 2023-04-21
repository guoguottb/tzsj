<template>
	<div class="g-box">
		<div class='g-box2'>
			<div class="info2">
			<el-form :inline="true" class="demo-form-inline">
				<h3 class="line_blue" id="page1">&emsp;档案信息</h3>
				<div class="lineSt"></div>
				<div class="top_1">
					<table class="top_2">
						<tr style="height:40px;">
							<td style="width:10%;">姓名:</td>
							<td style="width:10%;">{{basicInf.ab_ex3}}</td>
							<td style="width:10%;">身份证号码:</td>
							<td style="width:20%;">{{basicInf.ab_ex7}}</td>
							<td style="width:10%;">类别:</td>
							<td style="width:10%;">{{basicInf.ab_ex13}}</td>
							<td rowspan="2"></td>
						</tr>
					</table>
				</div>
				<h3 class="line_blue" id="page2">&emsp;基础信息</h3>
				<div class="lineSt"></div>
				<div class="top_1">
					<table class="top_2">
						<tr style="height:40px;">
							<td style="width:10%;">行政区划:</td>
							<td style="width:40%;">{{basicInf.address}}</td>
							<td style="width:10%;">联系电话:</td>
							<td style="width:40%;">{{basicInf.ab_ex28}}</td>
						</tr>
						<tr style="height:40px;">
							<td colspan="2">家庭地址:</td>
							<td colspan="2">{{basicInf.ab_ex11}}</td>
						</tr>
					</table>
				</div>
				<div style='clear:both'></div>
                <div v-if="type!='zx'" style='margin-top:15px'>
                    <h3 class="line_blue" id="page12">&emsp;注销报告</h3>
                    <div class="lineSt"></div>
                    <div class="top_1">
                        <div style="color:#6292c2;font-weight:bold;padding:5px;margin-left:5%;">注销原因：<span style="color:red;">{{basicInf.ac_ex8}}</span></div>
                        <div style="color:#6292c2;font-weight:bold;padding:5px;margin-left:5%;">申请注销时间：<span id="ac_dat1_2">{{basicInf.ac_dat1}}</span></div>
                    </div>
                </div>
				<div style='clear:both'></div>
				<h3 class="line_blue" id="page11" style="margin-top: 20px;"  v-if="this.type == 'cs'">&emsp;审核</h3>
				<div class="lineSt"  v-if="this.type == 'cs'"></div>
				<div class="top_1" v-if="this.type == 'cs'">
					<el-row>
						<el-col :span="2"><div style="line-height: 30px;text-align:center;">审核意见</div></el-col>
						<el-col :span="6">
							<el-select @change="changeSh" v-model="auditValue.ac_ex1" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</el-col>
						<el-col :span="2"><div style="line-height: 30px;text-align:center;">审核人</div></el-col>
						<el-col :span="6"><el-input v-model="auditValue.ac_ex3"></el-input></el-col>
						<el-col :span="2" style="line-height: 30px;text-align:center;"><div>审核时间</div></el-col>
						<el-col :span="6">
							<el-date-picker
							      v-model="auditValue.ac_dat2"
							      type="datetime"
								   value-format="yyyy-MM-dd HH:mm"
							      placeholder="选择审核时间">
							</el-date-picker>
						</el-col>
					</el-row>
					<el-row style="margin-top: 10px;">
						<el-col :span="2" style="line-height: 30px;text-align:center;"><div>备注</div></el-col>
						<el-col :span="22"><el-input type="textarea" autosize v-model="auditValue.ac_ex2"></el-input></el-col>
					</el-row>
					<el-row style="margin-top: 10px;" type="flex" justify="center">
						<el-col :span="24" style="text-align: center;"><el-button type="primary" @click="save(auditValue)">保存</el-button></el-col>
					</el-row>
				</div>
				<br>
				
				
				<h3 class="line_blue" id="page11" style="margin-top: 20px;"  v-if="this.type == 'zx'">&emsp;注销</h3>
				<div class="lineSt"  v-if="this.type == 'zx'"></div>
				<div class="top_1" v-if="this.type == 'zx'">
					<el-row>
						<el-col :span="2" style="line-height: 30px;text-align:center;"><div>注销时间</div></el-col>
						<el-col :span="16">
							<el-date-picker
								v-model="publicity.ac_dat1"
								type="datetime"
								value-format="yyyy-MM-dd"
								placeholder="选择注销时间">
							</el-date-picker>
						</el-col>
					</el-row>
					
					<el-row style="margin-top: 10px;">
						<el-col :span="2" style="line-height: 30px;text-align:center;"><div>注销原因</div></el-col>
						<el-col :span="20"><el-input type="textarea" autosize v-model="publicity.ac_ex8"></el-input></el-col>
					</el-row>
					<el-row>
						<el-col>
							<el-card class="box-card">
								<div slot="header" class="clearfix">
									<span>核销依据(<span
										style='color:red'>{{basicInf.ab_ex121.split(',')[0]=="" ? 0 : basicInf.ab_ex121.split(',').length}}</span>)</span>
									
								</div>
								<image-view :imgList="this.basicInf.ab_ex121.split(',')" height="150px" width="150px"></image-view>
							</el-card>
						</el-col>
					</el-row>
					<el-row style="margin-top: 10px;" type="flex" justify="center">
						<el-col :span="24" style="text-align: center;"><el-button type="primary" @click="save2(publicity)">保存</el-button></el-col>
					</el-row>
				</div>
				<br>
				
				<h3 class="line_blue" id="page11" style="margin-top: 20px;"  v-if="this.type == 'sp'">&emsp;审批</h3>
				<div class="lineSt"  v-if="this.type == 'sp'"></div>
				<div class="top_1" v-if="this.type == 'sp'">
					<el-row>
						<el-col :span="2"><div style="line-height: 30px;text-align:center;">审批意见</div></el-col>
						<el-col :span="6">
							<el-select @change="changeSh" v-model="approval.ac_ex4" placeholder="请选择">
								<el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</el-col>
						<el-col :span="2"><div style="line-height: 30px;text-align:center;">审批人</div></el-col>
						<el-col :span="6"><el-input v-model="approval.ac_ex6"></el-input></el-col>
						<el-col :span="2" style="line-height: 30px;text-align:center;"><div>审批时间</div></el-col>
						<el-col :span="6">
							<el-date-picker
							      v-model="approval.ac_dat3"
							      type="datetime"
								   value-format="yyyy-MM-dd HH:mm"
							      placeholder="选择审批时间">
							</el-date-picker>
						</el-col>
					</el-row>
					<el-row style="margin-top: 10px;">
						<el-col :span="2" style="line-height: 30px;text-align:center;"><div>备注</div></el-col>
						<el-col :span="22"><el-input type="textarea" autosize v-model="approval.ac_ex5"></el-input></el-col>
					</el-row>
					<el-row style="margin-top: 10px;" type="flex" justify="center">
						<el-col :span="24" style="text-align: center;"><el-button type="primary" @click="save3(approval)">保存</el-button></el-col>
					</el-row>
				</div>
				<br>
				
				<h3 class="line_blue" id="page10" v-if="type!='zx'">&emsp;审批记录</h3>
				<div class="lineSt"  v-if="type!='zx'"></div>
				<div class="top_1"  v-if="type!='zx'">
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
                            <tbody>
								<tr>
									<td style="color:#899197;height:30px">处理步骤：</td>
									<td>申请注销</td>
									<td style="color:#899197">处理时间：</td>
									<td>{{basicInf.ac_dat1}}</td>
									<td style="color:#899197">处理结果：</td>
									<td rowspan="2" style="text-align:left">
										<img 
											src="@/assets/img/auditStatus/agree.png" style="width:100px">
									
									</td>
								</tr>
								<tr  style="border-bottom:1px solid #ddd">
									<td style="color:#899197;height:30px">申请注销人：</td>
									<td>{{basicInf.ac_ex10}}</td>
									<td style="color:#899197">申请理由</td>
									<td>{{basicInf.ac_ex8}}</td>
								</tr>
								<tr>
									<td colspan="5" style="height:20px">&nbsp;</td>
								</tr>
							</tbody>

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
			<div style="margin-left:30px;margin-top:20px;">
				<ul>
					<li :class="{listStyle:isShow1}" @click="isShow(1)">
						<a class="ainfoFont" :class="{listStyleA:!isShow1}" @click="counter('#page1')">档案信息</a><br>
					</li>
					<li :class="{listStyle:isShow2}" @click="isShow(2)">
						<a class="ainfoFont" :class="{listStyleA:!isShow2}" @click="counter('#page2')">基础信息</a><br>
					</li>
					<li :class="{listStyle:isShow12}" @click="isShow(12)"  v-if="type!='zx'">
						<a class="ainfoFont" :class="{listStyleA:!isShow12}" @click="counter('#page12')">注销报告</a><br>
					</li>
					<li :class="{listStyle:isShow11}" @click="isShow(11)" v-if="type=='cs'||type=='th'||type=='gs'||type=='sp'||type=='zx'">
						<a class="ainfoFont" :class="{listStyleA:!isShow11}" @click="counter('#page11')">
							<span v-if="type=='cs'">审核</span>
							<span v-if="type=='th'">审核</span>
							<span v-if="type=='gs'">公示</span>
							<span v-if="type=='sp'">审批</span>
							<span v-if="type=='zx'">注销</span>
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
	import imageView from '@/views/modules/assistance/imageView'
	import upload from '@/views/modules/assistance/upload'
	// import  baseURL from '@/utils/baseUrl'
	export default {
		components: {
			imageView
		},
		data() {
			return {
				tableData: [],
				record: [],
				flag: true,
				// 初审
				auditValue:{
				},
				// 公示
				publicity:{
				},
				//审批
				approval:{
				},
				options:[{
					value:'同意',
					label:'同意'
				},{
					value:'退回',
					label:'退回'
				}],
				options1:[{
					value:'退回',
					label:'退回'
				}],
				options2:[{
					value:'无异议',
					label:'无异议'
				},{
					value:'有异议',
					label:'有异议'
				}],
				options3:[{
					value:'同意',
					label:'同意'
				},{
					value:'退回',
					label:'退回'
				}],
				isShow1: false,
				isShow2: true,
				isShow10: true,
				isShow11: true,
				isShow12: true,
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
			loadData(){
				this.sId=this.$route.query.sId;
				this.cId=this.$route.query.cId;
				this.type=this.$route.query.type;
				
				this.getData({
					sId: this.sId,
					type: this.type
				}).then(res => {
					let json=res;
					this.basicInf = res[0].data[0]
					// this.record = res.response.data[0].record
					this.record1(res[0].record)
					this.auditValue = json[0].data[0]
					this.publicity = json[0].data[0]
					this.approval = json[0].data[0]
				}).catch(res => {
					if(typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200){
						console.log('请求失败了-----------------------')
						this.$message.error('数据获取失败或请求超时')
						this.$emit("closes", false)
						this.$router.go(-1)
						return false
					}
					// console.log(res.response.data)
                    let json=res.response.data[0].data[0];
					Object.keys(json).forEach((key)=>{
						json[key]=unescape(json[key])
					})
					this.basicInf = json
					// this.record = json[0].record
					this.record1(json[0].record)
					this.auditValue = json
					this.publicity = json
					this.approval = json
					
				})

				
			},
			getData(sid) {
				return request({
					headers: {
						'Accept': 'application/json',
					},
					url: '/social/assistance/getXFZGViewData',
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
			changeSh(val){
			    // var text = $("#ab_ex25").val();
			    // if(text==null||text==''||text=='同意'||text=='退回重新核查'||text=='退回'){
			    //     $("#ab_ex25").val(val);
			    // }
				console.log(val)
			},
			save(data){
				// console.log(data)
				if(data.ac_ex1 == ""){
					this.$message.error('请选择审核意见');
				}else{
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
						"data": "["+JSON.stringify(data)+"]",
						"sId": this.sId,
						"type":this.type
					}).then((res)=>{
						if(res[0].status=="+OK"){
							loading.close()
							this.$message.success(res[0].msg)
							this.$emit("closes", false)
							this.$router.go(-1)
						}else{
							loading.close()
							this.$message.error(res[0].msg)
						}
					}).catch((res)=>{
						// 数据请求成功删除定时器
						clearTimeout(time);
						if(res.response.data[0].status=="+OK"){
							loading.close()
							this.$message.success(res.response.data[0].msg)
							this.$emit("closes", false)
							this.$router.go(-1)
						}else{
							loading.close()
							this.$message.error(res.response.data[0].msg)
						}
					})
				}
			},
			save2(data){
				// console.log(data)
				if(data.ac_ex8 == ""){
					this.$message.error('请输入注销原因');
				}else if(data.ac_dat1 == ""){
					this.$message.error('请选择注销时间');
				}else{
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
					this.saveBasicgs({
						"data": "["+JSON.stringify(data)+"]",
						"sId": this.sId
					}).then((res)=>{
						if(res[0].status=="+OK"){
							loading.close()
							this.$message.success(res[0].msg)
							this.$emit("closes", false)
							this.$router.go(-1)
						}else{
							loading.close()
							this.$message.error(res[0].msg)
						}
					}).catch((res)=>{
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
			closeView() {
				this.$emit("closes", false)
				this.$router.go(-1)
			},
			save3(data){
				if(data.ac_ex4 == ""){
					this.$message.error('请选择审批意见');
				}else{
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
						"data": "["+JSON.stringify(data)+"]",
						"sId": this.sId,
						"type":this.type
					}).then((res)=>{
						if(res[0].status=="+OK"){
							loading.close()
							this.$message.success(res[0].msg)
							this.$emit("closes", false)
							this.$router.go(-1)
						}else{
							loading.close()
							this.$message.error(res[0].msg)
						}
					}).catch((res)=>{
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
			saveBasiccs(data){
				let url = "/social/assistance/xfzgSaveBasicCancelAud"
				return request({
					headers: {
						'Accept': 'application/json',
					},
					url: url,
					method: 'post',
					data: data
				})
			},
			//注销
			saveBasicgs(data){
				return request({
					headers: {
						'Accept': 'application/json',
					},
					url: '/social/assistance/xfzgSaveBasicCancel',
					method: 'post',
					data: data
				})
			},
			//审批
			saveBasicsh(data){
				return request({
					headers: {
						'Accept': 'application/json',
					},
					url: '/social/assistance/xfzgSaveBasicCancelAud',
					method: 'post',
					data: data
				})
			},
			isShow(n) {
				this.isShow1 = true
				this.isShow2 = true
				this.isShow10 = true
				this.isShow11 = true
				this.isShow12 = true

				if (n == 1) {
					this.isShow1 = false
				} else if (n == 2) {
					this.isShow2 = false
				} else if (n == 10) {
					this.isShow10 = false
				}else if (n == 11) {
					this.isShow11 = false
				}else if (n == 12) {
					this.isShow12 = false
				}
			},

		}
	}
</script>
<style scoped>
	.g-box {
		
		height: 80VH !important;
	}
	.g-box2{
		
		overflow: auto !important;
		display:flex;
		display: -webkit-flex;
		flex-direction: row;
		height:100%;
		width:100%;
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
		flex:1;
		padding-right:10px;
		box-sizing: border-box;
		border-right: 1px solid #ddd;
		overflow: auto
	}

	.ainfo2 {
		width: 240px;
		font-size: 14px;
		line-height: 20px;
		text-align: left;
		padding-left:10px;
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

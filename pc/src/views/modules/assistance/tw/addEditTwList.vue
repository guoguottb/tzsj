<template>
	<div class="g-box">
	<div class="g-box2">
		<div class="info2">
			<el-form :model="dibaoForm" :rules="rules" :inline-message="true" :show-message="false" ref="dibaoForm"
				label-width="auto" style='padding-right: 10px;'>
				<h3 class="line_blue" id="page1">&emsp;基本信息</h3>
				<div class="lineSt"></div>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="发放时间" prop="ab_dat17">
							<el-date-picker v-model="dibaoForm.ab_dat17" value-format="yyyy-MM-dd" type="date" placeholder="请选择发放时间"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="姓名" prop="ab_ex3">
							<el-input v-model="dibaoForm.ab_ex3" placeholder="请输入姓名"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="身份证号" prop="ab_ex7">
							<el-input v-model="dibaoForm.ab_ex7" placeholder="请输入身份证号"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="联系电话" prop="ab_ex28">
							<el-input v-model="dibaoForm.ab_ex28" placeholder="请输入联系电话"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="救助类别" prop="ab_ex82">
							<el-select v-model="dibaoForm.ab_ex82" placeholder="请选择救助类别">
								<el-option lebel="助医" value="助医"></el-option>
								<el-option lebel="助学" value="助学"></el-option>
								<el-option lebel="助老" value="助老"></el-option>
								<el-option lebel="助困" value="助困"></el-option>
								<el-option lebel="助残" value="助残"></el-option>
								<el-option lebel="其他" value="其他"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="项目名称" prop="ab_ex83">
							<el-input v-model="dibaoForm.ab_ex83" placeholder="请输入项目名称"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="救助金额" prop="ab_ex84">
							<el-input v-model="dibaoForm.ab_ex84" placeholder="请输入救助金额"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="行政区域" prop="ab_ex162">
							<el-cascader :props="props" v-model="xzqhArray" v-if="isFinish"></el-cascader>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="家庭住址" prop="ab_ex11">
							<el-input v-model="dibaoForm.ab_ex11" placeholder="请输入家庭住址"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<div class="ainfo2">
			<div style="margin-left:20px;text-align:center;border-bottom:1px solid #ddd;padding-bottom:10px;">
				<el-button type="primary" size="small" @click="save">保存</el-button>
				<el-button size="small" @click="closeView">返回</el-button>
			</div>

			<div style="margin-left:20px;margin-top:20px;">
				<ul>
					<li :class="{listStyle:isShow1}" @click="isShow(1)">
						<a class="ainfoFont" :class="{listStyleA:!isShow1}" @click="counter('#page1')">标准信息</a><br>
					</li>
				</ul>
			</div>
		</div>

	</div>
	</div>
</template>

<script>
	import request from '@/utils/request'
	export default {
		name: "addEditTwList",
		data() {
			return {
				dibaoForm: {
					
				},
				rules: {
					ab_ex3: [{
						required: true,
						message: '姓名不能为空',
						trigger: 'blur'
					}],
					ab_ex7: [{
						required: true,
						message: '身份证不能为空',
						trigger: 'blur'
					}],
					ab_ex162: [{
						required: true,
						message: '行政区划不能为空',
						trigger: 'blur'
					}],
					ab_ex11: [{
						required: true,
						message: '家庭住址不能为空',
						trigger: 'blur'
					}],
					ab_ex28: [{
						required: true,
						message: '联系电话不能为空',
						trigger: 'blur'
					}],
				},
				isShow1: false,
				isFinish:false,
				xzqhArray:[],
				// el-cascader懒加载
				props: {
					lazy: true,
					lazyLoad(node, resolve) {
						const { level } = node; // 获取当前node对象中的level属性
						let pId="0";
						if(level>0){
							let value=node.value;
							if(value){
								let values=value.split("#")
								pId=values.length>1 ? values[1]:"0";
							}
							
						}
						request({
							url:"/social/assistance/getCityOption",
							method:"post",
							data:{
								pId:pId
							}
						}).then(res => {
						}).catch(res=>{
							console.log(res)
							const nodes = res.response.data;
							nodes.forEach(item => {
								item.value = item.cs_ex2+"#"+item.cs_ex1;
								item.label = item.cs_ex2;
								item.leaf = level >= 2; //判断是否为末尾节点，这个地方是0,1,2三级
							})
							resolve(nodes);
						})
					}
				},
			}
		},
		created() {
			this.loadData();
		},
		watch:{
			xzqhArray(newA,oldA){
				let qu = newA[0].split("#")[0]
				let cun = newA[1].split("#")[0]
				let zhen = newA[2].split("#")[0]
				// let i =qu+"#"+cun+"#"+zhen
				this.dibaoForm.ab_ex162 = newA[0]+","+newA[1]+","+newA[2]
				this.dibaoForm.ab_ex161 = qu
				this.dibaoForm.ab_ex1 = zhen
				this.dibaoForm.ab_ex2 = cun
				// console.log(i)
			}
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
				this.isFinish = false
				this.getBasic({
					ab_id: this.$route.query.sId,
				}).then(res => {
					console.log(res)
					// this.dibaoForm = res[0]
				}).catch(res => {
					if(typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200){
						console.log('请求失败了-----------------------')
						this.$message.error('数据获取失败或请求超时')
						this.$emit("closes", false)
						this.$router.go(-1)
						return false
					}
					if(res.response.data[0].common.length == 0){
						this.dibaoForm = res.response.data[0].data[0]
						let  xzqhArray=this.dibaoForm.ab_ex162.split(",");
						if(xzqhArray.length==3){
							this.$set(this.xzqhArray,0,xzqhArray[0]);
							this.$set(this.xzqhArray,1,xzqhArray[1]);
							this.$set(this.xzqhArray,2,xzqhArray[2]);
						}else{
							this.xzqhArray=[]
						}
						this.isFinish=true;
					}else{
						this.dibaoForm = res.response.data[0].common[0]
						let  xzqhArray=this.dibaoForm.ab_ex162.split(",");
						if(xzqhArray.length==3){
							this.$set(this.xzqhArray,0,xzqhArray[0]);
							this.$set(this.xzqhArray,1,xzqhArray[1]);
							this.$set(this.xzqhArray,2,xzqhArray[2]);
						}else{
							this.xzqhArray=[]
						}
						this.isFinish = true
					}
				})
			},
			getBasic(data) {
				return request({
					method: 'post',
					url: '/social/assistance/otherRescue/getBasic',
					data: data
				})
			},
			isShow(n) {
				this.isShow1 = true
				if (n == 1) {
					this.isShow1 = false
				}
			},
			closeView() {
				this.$emit("closes", false)
				this.$router.go(-1)
			},
			save() {
				this.$refs['dibaoForm'].validate((valid) => {
					if (valid) {
						//alert('submit!');
					} else {
						// alert('submit!');
						//console.log('error submit!!');
						return false;
					}
				});
				let msgs = this.validate();
				if (msgs) {
					this.$message.warning(msgs);
					return false
				}
				if(this.dibaoForm.ab_ex7){
					let msg=this.isCardID(this.dibaoForm.ab_ex7);
					if(msg){
						this.$message.warning(msg);
						return false
					}
				}
				const loading = this.$loading({
					lock: true,
					text: 'Loading',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				});
				this.$set(this.dibaoForm,'ab_ex13','团委救助')
				// 设置定时器，30秒请求失败刷新页面
				let time = setTimeout(()=>{
								loading.close()
								this.$emit("closes", false)
								this.$message.error("网络异常");
								this.$router.go(-1)
							},30000)
				this.saveBasic({
					data: JSON.stringify(this.dibaoForm),
					ab_id: this.$route.query.sId
				}).then(res => {
					if (res[0].status=="+OK") {
						loading.close()
						this.$message.success(res[0].msg)
						this.$emit("closes", false)
						this.$router.go(-1)
					} else {
						loading.close()
						this.$message.error(res[0].msg)
					}
				}).catch(res => {
					// 数据请求成功删除定时器
					clearTimeout(time);
					console.log(res)
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

			},
			saveBasic(data) {
				return request({
					method: 'post',
					url: '/social/assistance/otherRescue/saveBasic',
					data: data
				})
			},
			isCardID(sId){
				var aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};
				var iSum=0 ;
				var info="" ;
				if(!/^\d{17}(\d|x)$/i.test(sId)) return "身份证长度或格式错误";
				sId=sId.replace(/x$/i,"a");
				if(aCity[parseInt(sId.substr(0,2))]==null) return "身份证地区非法";
				let sBirthday=sId.substr(6,4)+"-"+Number(sId.substr(10,2))+"-"+Number(sId.substr(12,2));
				var d=new Date(sBirthday.replace(/-/g,"/")) ;
				if(sBirthday!=(d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate()))return "身份证上的出生日期非法";
				for(var i = 17;i>=0;i --) iSum += (Math.pow(2,i) % 11) * parseInt(sId.charAt(17 - i),11) ;
				if(iSum%11!=1) return "身份证号非法";
				//aCity[parseInt(sId.substr(0,2))]+","+sBirthday+","+(sId.substr(16,1)%2?"男":"女");//此次还可以判断出输入的身份证号的人性别
				return "";
			},
			validate() {
				try {
					let msg = "";
					for (let key in this.rules) {
						try {

							let r_ = this.rules[key];

							let val = this.dibaoForm[key];

							if (val == "") {
								msg = r_[0].message;
								//document.getElementById(key).style.border="1px solid red"
								break;
							} else {
								//document.getElementById(key).style.border="1px solid #C0C4CC"
							}
						} catch (e) {

						}

					}
					return msg;
				} catch (e) {
					return "";
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
			display:flex;
			display: -webkit-flex;
			flex-direction: row;
		}

	.info2 {
		flex: 1;
		padding-right: 10px;
		box-sizing: border-box;
		border-right: 1px solid #ddd;
		overflow: auto
	}

	.my-divider {
		margin: 15px auto 10px;
	}

	.my-table {
		width: 100%;
		margin-bottom: 5px;
	}

	.my-col {
		text-align: center;
		color: #909399;
	}

	.button-group {
		margin-bottom: 5px;
		margin-left: 10px
	}

	.el-table__body-wrapper .el-table__empty-block {
		background-image: none;
		min-height: auto;
		height: auto !important;
	}

	.el-table__empty-block .el-table__empty-text {
		display: block;
		line-height: 40px;
	}

	.el-table--border {
		border-bottom: 1px solid #EBEEF5 !important;
	}


	.ainfo2 {

		width: 240px;
		font-size: 14px;
		line-height: 20px;
		text-align: left;
		padding-left: 10px;
		box-sizing: border-box;
	}



	.line_blue {
		border-left: 2px solid #3385FF;
		margin-top: 25px;
	}

	.lineSt {
		background-color: #dcdfe6;
		height: 1px;
		width: 100%;
		margin-bottom: 10px;
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

	/* 	.my-table .el-input .el-input__inner{
		border: none !important;
	} */
	.my-table>>>.el-input__inner {
		border: 0;
	}
</style>

<template>
	<div class="g-box">
	<div class="g-box2">
		<div class="info2">
			<el-form :model="dibaoForm" :rules="rules" :inline-message="true" :show-message="false" ref="dibaoForm"
				label-width="auto" style='padding-right: 10px;'>
				<h3 class="line_blue" id="page1">&emsp;申请人基本情况</h3>
				<div class="lineSt"></div>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="申请时间" prop="ab_dat14">
							<el-date-picker style="width: 100%;" v-model="dibaoForm.ab_dat14" value-format="yyyy-MM-dd" type="date" placeholder="请选择申请时间"></el-date-picker>
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
						<el-form-item label="性别" prop="ab_ex69">
							<el-select v-model="dibaoForm.ab_ex69">
								<el-option value="男"></el-option>
								<el-option value="女"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="出生日期" prop="ab_dat11">
							<el-date-picker v-model="dibaoForm.ab_dat11" value-format="yyyy-MM-dd" type="date" placeholder="请选择出生日期"></el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="国籍" prop="ab_ex54">
							<el-input v-model="dibaoForm.ab_ex54" placeholder="请输入国籍"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="民族" prop="ab_ex65">
							<el-select v-model="dibaoForm.ab_ex65" placeholder="请选择民族">
								<el-option value="汉族"></el-option>
								<el-option value="壮族"></el-option>
								<el-option value="满族"></el-option>
								<el-option value="回族"></el-option>
								<el-option value="苗族"></el-option>
								<el-option value="维吾尔族"></el-option>
								<el-option value="维吾尔族"></el-option>
								<el-option value="彝族"></el-option>
								<el-option value="土家族"></el-option>
								<el-option value="蒙古族"></el-option>
								<el-option value="藏族"></el-option>
								<el-option value="布依族"></el-option>
								<el-option value="侗族"></el-option>
								<el-option value="瑶族"></el-option>
								<el-option value="朝鲜族"></el-option>
								<el-option value="白族"></el-option>
								<el-option value="哈尼族"></el-option>
								<el-option value="哈萨克族"></el-option>
								<el-option value="黎族"></el-option>
								<el-option value="傣族"></el-option>
								<el-option value="畲族"></el-option>
								<el-option value="傈僳族"></el-option>
								<el-option value="仡佬族"></el-option>
								<el-option value="拉祜族"></el-option>
								<el-option value="高山族"></el-option>
								<el-option value="东乡族"></el-option>
								<el-option value="佤族"></el-option>
								<el-option value="水族"></el-option>
								<el-option value="纳西族"></el-option>
								<el-option value="羌族"></el-option>
								<el-option value="土族"></el-option>
								<el-option value="锡伯族"></el-option>
								<el-option value="仫佬族"></el-option>
								<el-option value="柯尔克孜族"></el-option>
								<el-option value="达斡尔族"></el-option>
								<el-option value="景颇族"></el-option>
								<el-option value="撒拉族"></el-option>
								<el-option value="布朗族"></el-option>
								<el-option value="毛难族"></el-option>
								<el-option value="塔吉克族"></el-option>
								<el-option value="普米族"></el-option>
								<el-option value="阿昌族"></el-option>
								<el-option value="怒族"></el-option>
								<el-option value="鄂温克族"></el-option>
								<el-option value="京族"></el-option>
								<el-option value="基诺族"></el-option>
								<el-option value="德昂族"></el-option>
								<el-option value="乌孜别克族"></el-option>
								<el-option value="俄罗斯族"></el-option>
								<el-option value="保安族"></el-option>
								<el-option value="裕固族"></el-option>
								<el-option value="门巴族"></el-option>
								<el-option value="鄂伦春族"></el-option>
								<el-option value="独龙族"></el-option>
								<el-option value="塔塔尔族"></el-option>
								<el-option value="赫哲族"></el-option>
								<el-option value="珞巴族"></el-option>
								<el-option value="其他"></el-option>
								<el-option value="外国血统中国籍人士"></el-option>
							</el-select>
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
						<el-form-item label="文化程度" prop="ab_ex91">
							<el-input v-model="dibaoForm.ab_ex91" placeholder="请输入文化程度"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="邮政编码" prop="ab_ex52">
							<el-input v-model="dibaoForm.ab_ex52" placeholder="请输入邮政编码"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="户籍所在地" prop="ab_ex4">
							<el-input v-model="dibaoForm.ab_ex4" placeholder="请输入户籍所在地"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="联系电话" prop="ab_ex28">
							<el-input v-model="dibaoForm.ab_ex28" placeholder="请输入联系电话"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="住所处（经常居住地）" prop="ab_ex11">
							<el-input v-model="dibaoForm.ab_ex11" placeholder="请输入住所处（经常居住地）"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="工作单位" prop="ab_ex53">
							<el-input v-model="dibaoForm.ab_ex53" placeholder="请输入工作单位"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="24">
						<el-form-item label="身份类别" prop="ab_ex55">
							<el-checkbox-group @change="changeCheckbox" v-model="checkList">
								<el-checkbox label="低保对象"></el-checkbox>
								<el-checkbox label="社会福利机构中由政府供养人员"></el-checkbox>
								<el-checkbox label="特困职工"></el-checkbox>
								<el-checkbox label="优抚对象"></el-checkbox>
								<el-checkbox label="灾民"></el-checkbox>
								<el-checkbox label="农民"></el-checkbox>
								<el-checkbox label="农村“五保”对象"></el-checkbox>
								<el-checkbox label="农民工"></el-checkbox>
								<el-checkbox label="军人"></el-checkbox>
								<el-checkbox label="军属"></el-checkbox>
								<el-checkbox label="离退休人员"></el-checkbox>
								<el-checkbox label="无业、事业人员"></el-checkbox>
								<el-checkbox label="在校生"></el-checkbox>
								<el-checkbox label="未成年人"></el-checkbox>
								<el-checkbox label="学龄前儿童"></el-checkbox>
								<el-checkbox label="辍学生"></el-checkbox>
								<el-checkbox label="单亲家庭儿童"></el-checkbox>
								<el-checkbox label="留守儿童"></el-checkbox>
								<el-checkbox label="残疾人"></el-checkbox>
								<el-checkbox label="老年人（60岁以上"></el-checkbox>
								<el-checkbox label="其他（注明）"></el-checkbox>
							</el-checkbox-group>
						</el-form-item>
					</el-col>
				</el-row>
				<h3 class="line_blue" id="page2">&emsp;代理人基本情况</h3>
				<div class="lineSt"></div>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="姓名" prop="ab_ex82">
							<el-input v-model="dibaoForm.ab_ex82" placeholder="请输入姓名"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="代理人类型" prop="ab_ex83">
							<el-select v-model="dibaoForm.ab_ex83" placeholder="请选择代理人类型">
								<el-option value="法定代理人"></el-option>
								<el-option value="委托代理人"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="身份证号" prop="ab_ex84">
							<el-input v-model="dibaoForm.ab_ex84" placeholder="请输入身份证号"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="与申请人关系" prop="ab_ex86">
							<el-input v-model="dibaoForm.ab_ex86" placeholder="请输入与申请人关系"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="联系方式" prop="ab_ex87">
							<el-input v-model="dibaoForm.ab_ex87" placeholder="请输入联系方式"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="代理方式" prop="ab_ex59">
							<el-select v-model="dibaoForm.ab_ex59" placeholder="请选择代理方式">
								<el-option value="委托代理"></el-option>
								<el-option value="法定代理"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<h3 class="line_blue" id="page3">&emsp;案件情况</h3>
				<div class="lineSt"></div>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="案件来源" prop="ab_ex56">
							<el-select v-model="dibaoForm.ab_ex56" placeholder="请选择案件来源">
								<el-option value="当事人直接申请"></el-option>
								<el-option value="转交申请至人民法院口人民检察院口公安机关"></el-option>
								<el-option value="转交申请至至监狱"></el-option>
								<el-option value="转交申请至看守所"></el-option>
								<el-option value="转交申请至劳动教养管理所"></el-option>
								<el-option value="转交申请至强制隔离戒毒所"></el-option>
								<el-option value="其他来源(注明)"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="申请事项" prop="ab_ex57">
							<el-input v-model="dibaoForm.ab_ex57" placeholder="请输入申请事项"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="申请事项所处阶段" prop="ab_ex58">
							<el-select v-model="dibaoForm.ab_ex58" placeholder="请选择申请事项所处阶段">
								<el-option value="尚未进入法律程序"></el-option>
								<el-option value="侦查"></el-option>
								<el-option value="审查起诉"></el-option>
								<el-option value="仲裁"></el-option>
								<el-option value="调节口诉讼(一审)"></el-option>
								<el-option value="调节口诉讼(二审)"></el-option>
								<el-option value="调节口诉讼(审判监督程序)"></el-option>
								<el-option value="行政处理口行政复议"></el-option>
								<el-option value="国家赔偿"></el-option>
								<el-option value="死刑复核"></el-option>
								<el-option value="申诉"></el-option>
								<el-option value="执行"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="24">
						<el-form-item label="案情及申诉理由概述" prop="ab_ex51">
							<el-input type="textarea" placeholder="请输入案情及申诉理由概述" v-model="dibaoForm.ab_ex51"></el-input>
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
						<a class="ainfoFont" :class="{listStyleA:!isShow1}" @click="counter('#page1')">申请人基本情况</a><br>
					</li>
					<li :class="{listStyle:isShow2}" @click="isShow(2)">
						<a class="ainfoFont" :class="{listStyleA:!isShow2}" @click="counter('#page2')">代理人基本情况</a><br>
					</li>
					<li :class="{listStyle:isShow3}" @click="isShow(3)">
						<a class="ainfoFont" :class="{listStyleA:!isShow3}" @click="counter('#page3')">案件情况</a><br>
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
		name: "addEditFlyzList",
		data() {
			return {
				dibaoForm: {
				},
				checkList:[],
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
					ab_ex11: [{
						required: true,
						message: '住所处（经常居住地）不能为空',
						trigger: 'blur'
					}],
					ab_ex28: [{
						required: true,
						message: '联系电话不能为空',
						trigger: 'blur'
					}],
				},
				isShow1: false,
				isShow2: true,
				isShow3: true,
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
			// setTimeout(()=>{
			// 	console.log(this.dibaoForm)
			// },2000)
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
				this.isFinish=false;
				this.getBasic({
					sId: this.$route.query.sId,
					type:"法律援助",
					company:"泰州市姜堰区社会救助综合平台"
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
					console.log(res.response.data[0].data[0])
					this.dibaoForm = res.response.data[0].data[0]
					this.checkList = res.response.data[0].data[0].ab_ex55.split(",")[0] == "" ? [] : res.response.data[0].data[0].ab_ex55.split(",")
					let  xzqhArray=this.dibaoForm.ab_ex162.split(",");
					if(xzqhArray.length==3){
						this.$set(this.xzqhArray,0,xzqhArray[0]);
						this.$set(this.xzqhArray,1,xzqhArray[1]);
						this.$set(this.xzqhArray,2,xzqhArray[2]);
					}else{
						this.xzqhArray=[]
					}
					this.isFinish=true;
				})
			},
			getBasic(data) {
				return request({
					method: 'post',
					url: '/social/assistance/getBasic',
					data: data
				})
			},
			isShow(n) {
				this.isShow1 = true
				this.isShow2 = true
				this.isShow3 = true
				if (n == 1) {
					this.isShow1 = false
				}else if(n == 2) {
					this.isShow2 = false
				}else if(n == 3) {
					this.isShow3 = false
				}
			},
			changeCheckbox(item) {
				console.log(this.checkList)
				// let string = ''
				this.dibaoForm.ab_ex55=''
				this.checkList.forEach((it, index) => {
					if (this.checkList.length - 1 == index) {
						this.dibaoForm.ab_ex55 += it
					} else {
						this.dibaoForm.ab_ex55 = this.dibaoForm.ab_ex55 + it + ','
					}
				})
				console.log(this.dibaoForm.ab_ex55)
				//把改变后的值传给ab_ex55
			},
			closeView() {
				this.$emit("closes", false)
				this.$router.go(-1)
			},
			save() {
				this.$refs['dibaoForm'].validate((valid) => {
					if (valid) {
						// alert('submit!');
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
				// this.$set(this.dibaoForm,'ab_ex13',"法律援助")
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
				this.saveBasic({
					data: "["+JSON.stringify(this.dibaoForm)+"]",
					// ab_id: this.$route.query.sId
				}).then(res => {
					if (res[0].status=="+Ok") {
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
					if (res.response.data[0].status=="+Ok") {
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
					url: '/social/assistance/saveBasic',
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

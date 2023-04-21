<template>
	<div class="g-box">
	<div class="g-box2">
		<div class="info2">
			<el-form :model="supportinst" :rules="rules"  :inline-message="true" :show-message="false" 
                ref="supportinst" label-width="auto" style='padding-right: 10px;'>

				<h3 class="line_blue" id="page1">&emsp;基本信息</h3>
				<div class="lineSt"></div>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="机构名称" prop="abs_ex1">
							<el-input v-model="supportinst.abs_ex1" placeholder="请输入机构名称"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="成立时间" prop="abs_dat3">
							 <el-date-picker v-model="supportinst.abs_dat3" type="date" placeholder="请选择机构成立时间" class="setTime" style="width:100% !important"></el-date-picker>
							<!-- <el-input v-model="supportinst.abs_dat3" placeholder="请输入机构成立时间"></el-input> -->
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="所在区域" prop="abs_ex10">
							<el-cascader :props="props" v-model="xzqhArray1" placeholder="请选择" style="width:100%;" v-if="isFinish"></el-cascader>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="法人类型" prop="abs_ex2">
                            <el-select v-model="supportinst.abs_ex2" placeholder="请选择法人类型" style="width:100%;">
                                <el-option
                                    v-for="item in legalType"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
						</el-form-item>
					</el-col>
				</el-row>

                <el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="服务范围" prop="abs_ex9">
							<el-cascader :props="props" v-model="xzqhArray2" placeholder="请选择" style="width:100%;" v-if="isFinish"></el-cascader>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="法人代表" prop="abs_ex3">
							<el-input v-model="supportinst.abs_ex3" placeholder="请输入法人代表"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="地区名称代码" prop="abs_ex14">
							<el-input v-model="supportinst.abs_ex14" placeholder="请输入地区名称代码"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="联系电话" prop="abs_ex4">
							<el-input v-model="supportinst.abs_ex4" placeholder="请输入联系电话"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="所在地址" prop="abs_ex5">
							<el-input v-model="supportinst.abs_ex5" placeholder="请输入所在地址"></el-input>
						</el-form-item>
					</el-col>
				</el-row>

				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="床位数" prop="abs_ex6">
							<el-input type="number" v-model="supportinst.abs_ex6" placeholder="请输入床位数"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="护理人员数" prop="abs_ex7">
							<el-input type="number" v-model="supportinst.abs_ex7" placeholder="请输入护理人员数"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
                
                <el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="执证人数" prop="abs_ex8">
							<el-input type="number" v-model="supportinst.abs_ex8" placeholder="请输入执证人数"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
                
                <el-row :gutter="20">
					<el-col :span="24" style="line-height: 40px">
						<el-form-item label="配套设置">
							<el-checkbox v-model="supportinst.abs_ex21">厨房</el-checkbox>
							<el-checkbox v-model="supportinst.abs_ex22">康复训练中心</el-checkbox>
							<el-checkbox v-model="supportinst.abs_ex23">健身房</el-checkbox>
							<el-checkbox v-model="supportinst.abs_ex24">医疗护理室</el-checkbox>
							<br/>
							<el-checkbox v-model="supportinst.abs_ex25">清洗房</el-checkbox>
							<el-checkbox v-model="supportinst.abs_ex26">室外活动设备</el-checkbox>
							<el-checkbox v-model="supportinst.abs_ex27">娱乐室</el-checkbox>
							<el-checkbox v-model="supportinst.abs_ex28">读书室</el-checkbox>
						</el-form-item>
					</el-col>
				</el-row>

				<!--el-row :gutter="20">
				</el-row-->

				<h3 class="line_blue" id="page2">&emsp;银行信息</h3>
				<div class="lineSt"></div>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="开户人名称" prop="abs_ex13">
							<el-input v-model="supportinst.abs_ex13" placeholder="请输入开户人名称"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="开户银行" prop="abs_ex12">
                            <el-select v-model="supportinst.abs_ex12" placeholder="请选择开户银行" style="width:100%;">
                                <el-option
                                    v-for="item in depBank"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
								<el-col :span="12">
						<el-form-item label="银行卡号" prop="abs_ex11">
							<el-input v-model="supportinst.abs_ex11" placeholder="请输入银行卡号"></el-input>
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
						<a class="ainfoFont" :class="{listStyleA:!isShow1}" 
						@click="counter('#page1')">基本信息</a><br>
					</li>
					<li :class="{listStyle:isShow2}" @click="isShow(2)">
						<a class="ainfoFont" :class="{listStyleA:!isShow2}" 
						@click="counter('#page2')">银行信息</a><br>
					</li>
				</ul>
			</div>
		</div>
		</div>
		

	</div>

</template>

<script>
	import request from '@/utils/request'
	import {commonValidator, formsVerify} from '@/utils/until'

	export default {
		name: "addEditYljg",
		components:{
		},
		data() {
			return {
                depBank: [
                    {value: "中国银行", label: "中国银行"},
                    {value: "中国建设银行", label: "中国建设银行"},
                    {value: "中国工商银行", label: "中国工商银行"},
                    {value: "中国农业银行", label: "中国农业银行"},
                    {value: "交通银行", label: "交通银行"},
                    {value: "中信银行", label: "中信银行"},
                    {value: "招商银行", label: "招商银行"},
                    {value: "中国光大银行", label: "中国光大银行"},
                    {value: "华夏银行", label: "华夏银行"},
                    {value: "兴业银行", label: "兴业银行"},
                    {value: "民生银行", label: "民生银行"},
                    {value: "国家邮政局邮政储汇局", label: "国家邮政局邮政储汇局"},
                    {value: "农村信用合作社", label: "农村信用合作社"},
                    {value: "农村商业银行", label: "农村商业银行"},
                    {value: "江苏银行", label: "江苏银行"},
                    {value: "苏州银行", label: "苏州银行"},
                    {value: "南京银行", label: "南京银行"},
                    {value: "其他金融机构", label: "其他金融机构"}
                ],
                legalType: [
                    {value: "机关法人", label: "机关法人"},
                    {value: "企业法人", label: "企业法人"},
                    {value: "社会团体法人", label: "社会团体法人"},
                    {value: "事业单位法人", label: "事业单位法人"}
                ],
                supportinst: {},
                xzqhArray1: [],
                xzqhArray2: [],
				isFinish:false,
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
							// console.log(res)
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
				// 必填项未填警告弹框
				rules: {
					abs_ex1: [{
						required: true,
						message: '机构名称不能为空',
						trigger: 'blur'
					}],
					abs_ex2: [{
						required: true,
						message: '法人类型不能为空',
						trigger: 'blur'
					}],
					abs_ex3: [{
						required: true,
						message: '法人代表不能为空',
						trigger: 'blur'
					}, {
						validator: this.isPersonName, 
						message: '法人代表姓名必须为中文字',
						trigger: 'blur'
					}],
					abs_ex4: [{
						required: true,
						message: '联系电话不能为空',
						trigger: 'blur'
					}, {
						validator: this.isPhone,
						message: '联系电话不正确',
						trigger: 'blur'
					}],
					abs_ex5: [{
						required: true,
						message: '所在地址不能为空',
						trigger: 'blur'
					}],
					abs_ex6: [{
						required: true,
						message: '床位数不能为空',
						trigger: 'blur'
					}, {
						validator: this.isZero,
						message: '床位数不能为0',
						trigger: 'blur'
					}],
					abs_ex7: [{
						required: true,
						message: '护理人员数不能为空',
						trigger: 'blur'
					}, {
						validator: this.isZero,
						message: '床位数不能为0',
						trigger: 'blur'
					}],
					abs_ex9: [{
						required: true,
						message: '服务范围不能为空',
						trigger: 'blur'
					}],
					abs_ex10: [{
						required: true,
						message: '所地区域不能为空',
						trigger: 'blur'
					}],
					abs_ex11: [{
						required: true,
						message: '银行卡号不能为空',
						trigger: 'blur'
					}, {
						validator: this.isBankCardNo,
						message: '银行卡号不正确',
						trigger: 'blur'
					}],
					abs_ex12: [{
						required: true,
						message: '开户银行不能为空',
						trigger: 'blur'
					}],
					abs_ex13: [{
						required: true,
						message: '开户人名称不能为空',
						trigger: 'blur'
					}],
					abs_ex14: [{
						required: true,
						message: '地区名称代码不能为空',
						trigger: 'blur'
					}],
					abs_dat3: [{
						required: true,
						message: '机构成立时间不能为空',
						trigger: 'blur'
					}]
				},
				isShow1: false,
				isShow2: true
			}
		},
		mounted() {
			// 滚动鼠标右侧导航栏跟随滚动位置改变而改变显示
			// window.removeEventListener('scroll',this.scroll,false)
			window.addEventListener('scroll', this.scroll, true)
		},
		watch:{
			xzqhArray1(newA, oldA){
				if(newA != ""){
					console.log(newA);
					console.log(newA != "");
					let qu = newA[0].split("#")[0];
					let cun = newA[1].split("#")[0];
					let zhen = newA[2].split("#")[0];
					this.supportinst.abs_ex10 = newA[0]+","+newA[1]+","+newA[2];
					this.supportinst.abs_ex16 = qu + " / " + cun + " / " + zhen;
				}
			},
			xzqhArray2(newA, oldA){
				if(newA != ""){
					let qu = newA[0].split("#")[0];
					let cun = newA[1].split("#")[0];
					let zhen = newA[2].split("#")[0];
					this.supportinst.abs_ex9 = newA[0]+","+newA[1]+","+newA[2];
					this.supportinst.abs_ex15 = qu + " / " + cun + " / " + zhen;
				}
			}
		},
		created() {
			this.loadData();
		},
		methods: {
			// 法人代表姓名必须为中文字
			isPersonName(rule, value, cb){
				return commonValidator("PersonName", rule, value, cb);
			},

			// 联系电话
			isPhone(rule, value, cb){
				return commonValidator("Phone", rule, value, cb);
			},

			//床位数 
			isZero(rule, value, cb){
				return commonValidator("Zero", rule, String(Number(value)), cb);
			},
			// 银行卡
			isBankCardNo(rule, value, cb){
				return commonValidator("BankCardNo", rule, value, cb);
			},
			scroll(){
				// var scrollTop =document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset;
				if(document.querySelector('.info2')==null || document.querySelector('#recordt')==null){
					return ''
				}
				let scrollTop = document.querySelector('.info2').scrollTop
				let cHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
				let oDiv1 = document.querySelector('#page1');
				let oDiv2 = document.querySelector('#page2');
			
				// 顺序跟上面显示顺序要相反
				let clientHeight = document.querySelector('.info2').clientHeight
				let recordtClientHeight = document.querySelector('#recordt').scrollHeight
				if(!oDiv1 || !oDiv2){
					return ''
				}
				if(scrollTop > (oDiv2.offsetTop-oDiv1.offsetTop)){
					this.isShow(2)
				}else if(scrollTop > (oDiv1.offsetTop-oDiv1.offsetTop)){
					this.isShow(1)
				}
			},
			counter(id) { //counter1是绑定的点击事件名称
				document.querySelector(id).scrollIntoView(true);
			},
			isShow(n) {
				this.isShow1 = true
				this.isShow2 = true
				if (n == 1) {
					this.isShow1 = false
				} else if (n == 2) {
					this.isShow2 = false
				}
			},
			closeView() {
				this.$emit("closes", false)
				this.$router.go(-1)
				if(process.env.NODE_ENV!="development"){
					this.$router.go(-1)
				}
			},
			loadData() {// 进入页面加载数据
				this.isFinish=false;
				this.getSupportinst({
					sId: this.$route.query.sId,
					company: "泰州市社会救助综合平台"
				}).then(res => {
					this.supportinst = this.formatCheckBox(res[0].data, "set");
					this.xzqhArray1 = this.supportinst.abs_ex10.split(",");
					this.xzqhArray2 = this.supportinst.abs_ex9.split(",");
					this.isFinish=true;
				}).catch(res => {
					if(typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200){
						console.log('请求失败了-----------------------')
						this.$message.error('数据获取失败或请求超时11111')
						this.$emit("closes", false)
						this.$router.go(-1)
						return false
					}
					this.supportinst = this.formatCheckBox(res.response.data[0].data, "set");
					this.xzqhArray1 = this.supportinst.abs_ex10.split(",");
					this.xzqhArray2 = this.supportinst.abs_ex9.split(",");
					this.isFinish=true; 
				})
			},
			vss(d){
				var h = [];
				for(var k in d){
					h.push(k + "=" + d[k]);
				}
				return h.join("\r");
			},
			save() {
				try{
					this.isSaves = true;
				// 信息提示的判断条件
				//let doms = document.getElementsByClassName('el-message')[0]
				if(!formsVerify(this.rules, this.supportinst, this.$message)){
                    this.isSaves = false;
                }

                if(!this.isSaves){
                    return false;
                }
                // 设置定时器，30秒请求失败刷新页面
                let time = setTimeout(()=>{
                                loading.close()
                                this.$emit("closes", false)
                                this.$message.error("网络异常");
                                this.$router.go(-1)
                            },30000)
                
				const loading = this.$loading({
					lock: true,
					text: 'Loading',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				});

			    this.saveSupportinst({
					"data": '[' + JSON.stringify(this.formatCheckBox(this.supportinst, "get")) + ']'
				}).then((res) => {
					if (res[0].status=="+Ok") {
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
					// console.log(res.response.data)
					if (res.response.data[0].status=="+Ok") {
						loading.close()
						this.$message.success(res.response.data[0].msg)
						this.$emit("closes", false)
						this.$router.go(-1)
					} else {
						loading.close()
						this.$message.error(res.response.data[0].msg)
					}
				});
				}catch(e){alert(e.message)}
			},
			getSupportinst(data) {
				return request({
					url: "/social/assistance/getBasicSupportinst",
					method: 'post',
					data: data
				})
			},
			saveSupportinst(data) {
				return request({
					method: 'post',
					url: '/social/assistance/saveBasicSupportinst',
					data: data
				})
			},
            formatCheckBox(data, type){
                if(type == "set"){
                    for(var i = 21; i < 29; i++){
                        data["abs_ex" + i] = data["abs_ex" + i] == 1 ? true: false;
                    }
                }else if(type == "get"){
                    for(var i = 21; i < 29; i++){
                        data["abs_ex" + i] = data["abs_ex" + i] == true ? 1: 0;
                    }
                }
                return data;
            }
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
		flex:1;
		padding-right:10px;
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
		padding-left:10px;
		box-sizing: border-box;
	}

	

	.line_blue {
		border-left: 2px solid #3385FF;
		margin-top:25px;
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

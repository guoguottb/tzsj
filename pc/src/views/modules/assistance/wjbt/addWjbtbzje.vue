<template>
	<div class="g-box">
	<div class="g-box2">
		<div class="info2">
			<el-form :model="dibaoForm" :rules="rules" :inline-message="true" :show-message="false" ref="dibaoForm"
				label-width="auto" style='padding-right: 10px;'>
				<h3 class="line_blue" id="page1">&emsp;基本信息</h3>
				<div class="lineSt"></div>
				<el-row :gutter="20">
					<el-col>
						<el-form-item label="请输入保障金额" prop="abs_ex4">
							<el-input v-model="dibaoForm.abs_ex4" placeholder="请输入保障金额"></el-input>
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
						<a class="ainfoFont" :class="{listStyleA:!isShow1}" @click="counter('#page1')">保障金额</a><br>
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
		name: "addEditXfzgList",
		data() {
			return {
				dibaoForm: {
					abs_ex4:''
				},
				rules: {
					abs_ex4: [{
						required: true,
						message: '保障金额不能为空',
						trigger: 'blur'
					}],
					// ab_ex7: [{
					// 	required: true,
					// 	message: '职工身份证不能为空',
					// 	trigger: 'blur'
					// }],
					
				},
				isShow1: false,
			}
		},
		created() {
			this.dibaoForm.abs_ex4 == ''
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
				this.doAddWjbtBzje({
					data: this.dibaoForm.abs_ex4,
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
			doAddWjbtBzje(data) {
				return request({
					method: 'post',
					url: '/social/assistance/subsidy/doAddWjbtBzje',
					data: data
				})
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

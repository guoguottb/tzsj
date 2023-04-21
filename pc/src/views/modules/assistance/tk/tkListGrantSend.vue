<template>
	<div class="g-box">
		<div class='g-box2'>
			<div class="info2">
			<div class='head'>
				<h3 class="line_blue" id="page1">&emsp;户主信息</h3>
				<div class="lineSt"></div>
				
					
				<div class="top_1"  style='overflow:auto'>
					<el-row>
						<el-col :span='24'>
							<div v-html="table"></div>
						</el-col>
					</el-row>
				</div>
				
			</div>
			<div class='send'>
				<h3 class="line_blue" id="page2">&emsp;发放信息</h3>
				<div class="lineSt"></div>
				<div class="top_1">
					<el-form :model='table2' label-width="auto" style='padding-right: 10px;'>
						<el-row :gutter="20">
							<el-col :span="12">
								<el-form-item label="发放月份" prop="ag_ex1">
									<!-- <el-input v-model="table2.ab_ex1" placeholder="请输入发放月份"></el-input> -->
									<el-date-picker format="yyyy-MM" value-format="yyyy-MM" v-model="table2.ag_ex1" type="month" placeholder="请输入发放月份">
									</el-date-picker>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="发放金额" prop="ag_ex2">
									<el-input v-model="table2.ag_ex2" placeholder="请输入发放金额"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="12">
								<el-form-item label="发放时间" prop="ag_dat1">
									<!-- <el-input v-model="table2.ab_ex3" placeholder="请输入发放时间"></el-input> -->
									<el-date-picker v-model="table2.ag_dat1" type="datetime" placeholder="请输入发放月份">
									</el-date-picker>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="人数" prop="rs">
									<el-input v-model="table2.rs" placeholder="请输入人数"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="12">
								<el-form-item label="户数" prop="hs">
									<el-input v-model="table2.hs" placeholder="请输入户数"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col>
								<el-form-item label="备注" prop="ag_ex4">
									<el-input  v-model="table2.ag_ex4"  placeholder="请输入备注">
									</el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
				</div>
			</div>
			
		</div>
		<div class="ainfo2">
			<div style="margin-left:20px;text-align:center;border-bottom:1px solid #ddd;padding-bottom:10px;">
				<el-button type="primary" size="small" @click="save">保存</el-button>
				<el-button size="small" @click="closeView">返回</el-button>
			</div>

		</div>
		</div>
		
	</div>
</template>

<script>
	import request from '@/utils/request'
	export default {
		name: 'tkListGrantSend',
		data() {
			return {
				table: '',
				table2: {
					ag_dat1: '',
					ag_ex1: '',
					ag_ex2: '',
					ag_ex3: '',
					ag_ex4: '',
					hs: '',
					rs: ''
				},
			}
		},
		created() {
			this.loadData()
			console.log(this.$route.query.params)
		},
		methods: {
			loadData() {
				this.getGrant({
					type: '特困供养',
					params: this.$route.query.params,
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
					console.log(res.response.data)
					this.table = unescape(res.response.data[0].info)
					this.table2 = res.response.data[0]
				})
			},
			getGrant(data) {
				return request({
					url: '/social/assistance/getGrant',
					method: 'post',
					data: data
				})
			},
			save() {
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
				this.saveGrant({
					type: '特困供养',
					params: "[" + this.$route.params + "]",
					data: '[' + JSON.stringify(this.table2) + ']'
				}).then(res => {
					if (res[0].status == "+Ok") {
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
					if (res.response.data[0].status == "+OK") {
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
			saveGrant(data) {
				return request({
					url: '/social//assistance/saveGrant',
					method: 'post',
					data: data
				})
			},
			closeView() {
				this.$emit("closes", false)
				this.$router.go(-1)
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
		display: flex;
		display: -webkit-flex;
		flex-direction: row;
		
	}
	.info2 {
		flex: 1;
		padding-right: 10px;
		box-sizing: border-box;
		border-right: 1px solid #ddd;
		overflow: hidden;
		display:flex;
		flex-direction: column;
	}
	.head{
		flex:1;
		overflow:hidden;
		display:flex;
		flex-direction: column;
	}
	.send{
	
		box-sizing: border-box;
		height: 220px;
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

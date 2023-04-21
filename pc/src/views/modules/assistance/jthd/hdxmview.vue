<template>
	<div class="g-box">
		<div class="head">
			选择核对项目
		</div>
		<div>
					<el-button style='margin: 10px;' @click='closeView'>返回</el-button>
				</div>
		<div class="content">
			<el-table :data="tableData" :row-class-name="tableRowClassName" height="100%" border style="width: 100%">
				<el-table-column type="selection" width="42" style="text-align: center;"></el-table-column>
				<el-table-column prop="ab_ex13" label="保障类型" width="350"></el-table-column>
				<el-table-column prop="familynum" label="户数" width="350"></el-table-column>
				<el-table-column prop="peoplenum" label="人数" width="350"></el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button-group>
							<el-button type="primary" @click='look(scope.row.ab_ex13,scope.row.familynum)'>查看</el-button>
							<el-button type="primary" @click='submit(scope.row.ab_ex13)'>提交核对</el-button>
						</el-button-group>
					</template>
				</el-table-column>
			</el-table>
			<div class="footer">
				 
				<!-- <el-pagination background          layout="total, sizes, prev, pager, next, jumper"
					         :page-size="30"          :current-page="page" @size-change="handleSizeChange"
					         @current-change="handleCurrentPageChange"          :total="count">
				</el-pagination> -->
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	import request from '@/utils/request'
	export default {
		data() {
			return {
				tableData: []
			}
		},
		created() {
			request({
				url: "/social/assistance/getHdTypeData",
				method: "post",
				data: {}
			}).then(res => {

			}).catch(res => {
				console.log(res)
				this.tableData = res.response.data
			})
		},
		methods: {
			look(val,num) {
				// 本来应该和commonList一样用dialog显示，但是那边不支持
				if(process.env.NODE_ENV=="development"){
					this.$router.push({
						path:'/assistance/jthd/jthdListView',
						query:{
							type:val,
							num:num
						}
					})
				}else{
					this.$pushRouter({path:generalConfig.defaultUrl + '/assistance/jthd/jthdListView?type='+val,})
				}
				
				// this.$pushRouter({path:generalConfig.defaultUrl + '/assistance/jthd/jthdListView?type='+val,})
			},
			submit(type) {
				this.$prompt('请输入核对人数比例(0~100)', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
				}).then(({
					value
				}) => {
					request({
						url: "/social/assistance/submitHdData",
						method: "post",
						data: {
							type,
							num:value
						}
					}).then(res => {
					this.$message({
						type: 'success',
						message: '成功提交'
					});
					}).catch(res => {
						console.log(res)
						this.tableData = res.response.data
					})
					// this.$message({
					// 	type: 'success',
					// 	message: '您输入的是: ' + value
					// });
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消输入'
					});
				});
			},
			closeView() {
				// this.$emit("closes", false)
				this.$router.go(-1)
			},
		}
	}
</script>
<style scoped>
	.head{
		display: flex;
		justify-content: center;
		font-size: 30px;
	}
	.g-box {
		display: flex;
		width: 100%;
		height: 80VH;
		flex-direction: column;
	}

	.content {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.e-table {
		flex: 1;
		overflow: auto;
	}

	.footer {
		height: 50px;
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		padding-top: 10px;
		text-align: right;
		padding-right: 30px;
		/*background:#f9f9f9;*/
		background: #fff;
		border-top: 1px solid #ddd;
	}
</style>

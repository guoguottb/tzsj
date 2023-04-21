<template>
	<div class="g-box">
		<div class="head">
			家庭核对查看
		</div>
		<div>
			<el-button style='margin: 10px;' @click='closeView'>返回</el-button>
		</div>
		<div class="content" v-loading="loading">
			<!-- <el-table :data="tableData[index]" v-for="(item,index) in tableData" :key='index' :row-class-name="tableRowClassName" height="100%" border style="width: 100%">
				<el-table-column type="selection" width="42" style="text-align: center;"></el-table-column>
				<el-table-column prop="item.abm_ex3" label="姓名" width="100"></el-table-column>
				<el-table-column prop="item.abm_ex5" label="性别" width="350"></el-table-column>
				<el-table-column prop="item.abm_ex15" label="职业" width="350"></el-table-column>
			</el-table> -->
			<div v-for="(item,index) in tableData" :key='index' v-if="item.length>0">
				<el-table :data="tableData[index]" :row-class-name="tableRowClassName" height="100%" border style="width: 100%">
					<!-- <el-table-column type="selection" width="42" style="text-align: center;"></el-table-column> -->
					<el-table-column prop="abm_ex3" label="姓名" width="200"></el-table-column>
					<el-table-column prop="abm_ex1" label="与户主关系" width="200"></el-table-column>
					<el-table-column prop="abm_ex2" label="身份证号" width="300"></el-table-column>
					<el-table-column prop="abm_ex9" label="家庭住址"></el-table-column>
				</el-table>
				<el-divider></el-divider>
			</div>
			<div class="footer">
				 
				<!-- <el-pagination background          layout="total, sizes, prev, pager, next, jumper"
					         :page-size="30"          :current-page="page" @size-change="handleSizeChange"
					         @current-change="handleCurrentPageChange"          :total="count">
				</el-pagination> -->
			</div>
		</div>
	</div>
</template>

<script>
	import request from '@/utils/request'
	export default{
		data(){
			return{
				tableData:[],
				loading:true,
				// page: 1,//当前页数
				// count: 1,//总条目数
				nowNum1:1,
			}
		},
		created() {
			// this.loadData({
			// 	type:'临时救助',
			// 	nowNum:'1',
			// 	dataNum:'1000'
			// }).then(res=>{
				
			// }).catch(res=>{
			// 	this.loading = false
			// 	console.log(res.response.data)
			// 	this.tableData = res.response.data
			// })
			
			// for(let i =1;i<=Math.ceil(Number(this.$route.query.num)/100);i++){
			// 	this.loadData({
			// 		type:this.$route.query.type,
			// 		nowNum:''+i,
			// 		dataNum:'100'
			// 	}).then(res=>{
					
			// 	}).catch(res=>{
			// 		this.loading = false
			// 		this.tableData = this.tableData.concat(res.response.data)
			// 	})
			// }
			this.fun()
		},
		methods:{
			closeView() {
				// this.$emit("closes", false)
				this.$router.go(-1)
			},
			loadData(data){
				return request({
					url: "/social/assistance/showHdTypeData?type="+this.$route.query.type,
					method: "post",
					data
				})
			},
			// 递归调用
			fun(){
				if(this.nowNum1>Math.ceil(Number(this.$route.query.num)/100)){
					return ''
				}else{
					this.loadData({
						type:this.$route.query.type,
						nowNum:this.nowNum1+'',
						dataNum:'1000'
					}).then(res=>{
						
					}).catch(res=>{
						this.loading = false
						this.nowNum1++
						// this.tableData = this.tableData.concat(res.response.data)
						this.tableData.push.apply(this.tableData,res.response.data)
						console.log(this.tableData)
						this.fun()
					})
				}
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

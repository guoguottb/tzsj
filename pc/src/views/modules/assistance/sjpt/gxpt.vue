
// 提交金民数据的页面---目前是老早以前熊德隆写的接口-具体是显示金民的啥的数据忘了
<template>
  	<div class="g-box"> 
		<!-- 查询 -->
		<div class="search">
			<!-- <div class="block">
				<span class="demonstration">提交时间：</span>
				<el-date-picker value-format="yyyy-MM-dd"
				v-model="value1"
				type="daterange"
				range-separator="至"
				start-placeholder="开始日期"
				end-placeholder="结束日期">
				</el-date-picker>
			</div> -->

            <el-form :inline="true" :model="searchData" class="demo-form-inline tycxForm">
                <el-form-item label="姓名">
                    <el-input v-model="searchData.user" placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item label="身份证号">
                    <el-input v-model="searchData.IDCard" placeholder="身份证号"></el-input>
                </el-form-item>
                <el-form-item label="户口性质">
                    <el-select v-model="searchData.region" placeholder="户口性质">
                    <el-option label="农业户口" value="农业户口"></el-option>
                    <el-option label="非农业户口" value="非农业户口"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
			<div>
				<el-button type="primary"  @click="queryListByCriteria" 
				 icon="el-icon-search" >
				查询</el-button>
				<el-button type="info" @click="resetQuery" icon="el-icon-refresh" >
				重置</el-button >
                <el-button type="primary"  @click="queryListByCriteria" 
				 icon="el-icon-s-promotion" >
				导出</el-button>
			</div>
		</div>
		
		<!-- 表格 -->
		<el-table  ref="multipleTable" :data="tableData" tooltip-effect="dark" border 
		style="width: 100%" @selection-change="handleSelectionChange" height="100%" v-loading="loading">
			<el-table-column type="selection" width="55"> </el-table-column>
			<el-table-column prop="num" label="NO" width="120"> </el-table-column>
			<el-table-column prop="jm_ex1" label="救助类型" width="120"> </el-table-column>
			<el-table-column prop="jm_ex2" label="户数" width="120"> </el-table-column>
			<el-table-column prop="jm_ex3" label="人数" width="120"></el-table-column>
			<el-table-column label="提交时间" width="200">
				<template slot-scope="scope">{{ scope.row.jm_dat1 }}</template>
			</el-table-column>
			<el-table-column prop="active" label="操作" width="100">
				 <template slot-scope="scope">
					<el-button @click="handleClick(scope.row)" type="primary" size="small">查看</el-button>
      			</template>
			</el-table-column>
		</el-table>

		<!-- 分页 -->
		<div class="block footer">
    <!-- <span class="demonstration">完整功能</span> -->
			<el-pagination background layout="total, sizes, prev, pager, next, jumper"
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="page"
			:page-size="limit"
			
			:total="count">
			</el-pagination>
		</div>
	</div>
</template>
<script>
// import commonList from "../commonList";
import request from "@/utils/request";
import { Loading } from "element-ui";
export default {
  data() {
    return {
        searchData: {
            user: '',
            IDCard: ''
        },
		tableData: [],
		value1: ['',''],
        value2: '',
		page: 1, //当前页
		pageNum: "1",
		limit:20,
		count:null, //总数
		loading: true,
	};
  },

  components: {
    // commonList,
  },
  created(){
	  this.loadData()
  },
  methods:{
	  
		handleSizeChange(val) {
			this.limit = val;
			this.loadData();
			console.log(`每页 ${val} 条`);
		},
		handleCurrentChange(val) {
			this.page = val
			this.loadData();
			console.log(`当前页: ${val}`);
		},

		// 查询
		queryListByCriteria(){
			console.log(this.value1);
			this.page = 1;
			this.loadData();
			console.log(this.value1[0]);
			console.log(this.value1[1]);

		},
		// 重置
		resetQuery() {
			// for (let key in this.searchData) {
			// 	this.searchData[key] = "";
			// }
			this.value1=['',''];
		},

		handleSelectionChange(val) {
			this.multipleSelection = val;
		},

		handleClick(data){
			console.log(data);
		},
		loadData(){
			this.loading = true;
			this.jmList({
				pageNum : JSON.stringify(this.page),
				pageSize : JSON.stringify(this.limit),
				startTime :this.value1[0],
				endTime :this.value1[1],
			}).then((res)=>{
				console.log(res,'then');
			}).catch((res)=>{
				console.log(res.response.data,'catch');
				this.tableData = JSON.parse(JSON.stringify(res.response.data.data) ) 
				console.log(this.tableData);
				// 编号赋值
				for(let i in this.tableData){
					this.tableData[i].num = i*1+1+(this.page-1)*this.limit;
				}
				this.count = Number(res.response.data.count) 
				console.log(this.count);
				this.loading = false;
			})
		},


		jmList(data) {
		return request({
			headers: {
			Accept: "application/json",
			},
			url: "/social/assistance/jmList",
			method: "post",
			data: data,
		});
    },
  }
};
</script>
<style scoped>
.g-box {
  display: flex;
  /* width: 100%; */
  height: 80vh;
  flex-direction: column;
}
.search{
	display: flex;
}
.search .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 240px !important;
}
.demonstration{
	font-size: 14px;
    color: #606266;
}
.block{
	margin-right: 20px;
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
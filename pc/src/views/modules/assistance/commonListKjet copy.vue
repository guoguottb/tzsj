<!-- 只有困境儿童用到了，会有些东西多余用不到 -->
<template>
	<div class="g-box">

		<el-dialog :title="titles" @close='close' :visible.sync="centerDialogVisible2" width="80%" height="60VH" center>
			<router-view @closes="closes" ref="routers"></router-view>
		</el-dialog>

		<el-dialog :title="titles2" :visible.sync="centerDialogVisible4" width="80%" height="60VH" center>
			<iframe :src="src" style='width:100%;height:60VH' frameborder="no" border="0" marginwidth="0"
				marginheight="0"></iframe>
		</el-dialog>
		<el-dialog :title="titles2" :visible.sync="centerDialogVisible5" width="80%" height="60VH" center>
			<div style='height:60VH;overflow:auto'>
				<img :src="item" v-for="(item,index) in pdfList" :key="index">
			</div>
		</el-dialog>
		<div class="search">
			<el-form :inline="true" :model="searchInline" class="demo-form-inline">
				<el-form-item v-for="(item,index) in searchInline" :label="item.text" :key="index" label-width="110px">
					<el-input v-if="item.searchType=='text'" v-model="searchData[item.searchId]"
						:placeholder="item.text" style="width:180px;"></el-input>
					<el-select
						v-else-if="item.searchType=='select' || item.searchType=='link' && item.searchId != 'stone' "
						v-model="searchData[item.searchId]" :placeholder="item.text" style="width:180px;">
						<el-option v-for="(itemOp,index22) in item.vals.split('#')" :value="itemOp" :key="index22">
						</el-option>
					</el-select>
					
					<el-cascader
						v-else-if="item.searchType=='select' || item.searchType=='link' && item.searchId=='stone' "
						:props="props2" v-model="xzqhArray" :placeholder="item.text" style="width:180px;">
					</el-cascader>
					
					<el-date-picker v-else-if="item.searchType=='date'||item.searchType=='date2' "
						v-model="searchData[item.searchId]" :placeholder="item.text" style="width:180px;" type="date"
						value-format="yyyy-MM-dd">
					</el-date-picker>
					<el-date-picker v-else-if="item.searchType=='date5'|| item.searchType=='date4'"
						v-model="searchData[item.searchId]" :placeholder="item.text" style="width:180px;" type="month"
						value-format="yyyy-MM">
					</el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="queryListByCriteria" icon="el-icon-search">查询</el-button>
					<el-button type="info" @click="resetQuery" icon="el-icon-refresh">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="content">
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane v-for="(item,index) in tabData" :name="item.listname" :key="index">
					<span slot="label">{{item.val}}
						<!-- tabs数量 -->
						<span v-if="tabsNum2[item.val] && tabsNum2[item.val]<=99"
							style="background-color: red; color: white; width: 30px; height: 20px; line-height: 20px; display: inline-block; text-align: center;">
							{{tabsNum2[item.val]}}
						</span>
						<span v-else-if="tabsNum2[item.val] && tabsNum2[item.val]>99"
							style="background-color: red; color: white; width: 30px; height: 20px; line-height: 20px; display: inline-block; text-align: center;">
							99+
						</span>
					</span>
				</el-tab-pane>
			</el-tabs>
			<!--div class="umc-filter clearfix tables"-->
			<!-- :row-class-name="tableRowClassName" 隔行换色的方法 -->
			<!-- <el-table :data="tableData" :row-class-name="tableRowClassName" height="100%" border style="width: 100%" v-loading="loading"> -->
			<el-table :data="tableData" class="table-fixed" height="100%" :row-style="{height: '40px'}" :cell-style="{padding:'2px'}" border style="width: 100%"
				v-loading="loading">
				<el-table-column type="selection" width="42" style="text-align: center;"></el-table-column>
				<el-table-column v-if="itemT.field!='btn'" v-for="(itemT,index4) in tableList" :key="index4"
					:prop="itemT.field" :label="itemT.names" :width="itemT.width"></el-table-column>
				<el-table-column v-else label="操作" :width="itemT.width">
					<template slot-scope="scope">
						<el-button-group>
							<el-button :type="itemF.btnType" v-for="(itemF,index3) in scope.row[itemT.field]"
								:key="index3" @click="btnEvent(itemF)">{{itemF.name}}</el-button>
						</el-button-group>
					</template>
				</el-table-column>
			</el-table>
			<!--/div-->
			<div class="footer">
				 <el-pagination background          layout="total, sizes, prev, pager, next, jumper"
					         :page-size="30"          :current-page="page" @size-change="handleSizeChange"
					         @current-change="handleCurrentPageChange"          :total="count">
				</el-pagination>
			</div>
		</div>
	</div>
</template>
<script>
	//
	import axios from 'axios'
	import request from '@/utils/request'
	export default {
		name: "commonList",
		props: ['sKey', 'type', 'tableName'],
		data() {
			return {
				page: 1,
				count: 1,
				limit: 30,
				listname: "",
				loading: true,
				centerDialogVisible: false,
				centerDialogVisible2: false,
				centerDialogVisible3: false,
				centerDialogVisible4: false,
				centerDialogVisible5: false,
				pdfList: [],
				src: '',
				isLoad: true,
				titles: '',
				titles2: '',
				activeName: '',
				formInline: {
					field: "",
				},
				searchInline: [],
				searchData: {
					// ab_ex3:""
				},
				tabData: [],
				tableList: [],
				tableData: [],
				buttonJson: [],
				tabsnum: [],
				tabsnumArr: [],
				xzqhArray: [],
				tabsNum2: {},
				searchDataNum: {},
				// el-cascader懒加载
				props2: {
					lazy: true,
					lazyLoad(node, resolve) {
						const {
							level
						} = node; // 获取当前node对象中的level属性
						let pId = "0";
						if (level > 0) {
							let value = node.value;
							if (value) {
								let values = value.split("#")
								pId = values.length > 1 ? values[1] : "0";
							}

						}
						request({
							url: "/social/assistance/getCityOption",
							method: "post",
							data: {
								pId: pId
							}
						}).then(res => {
							// console.log(res)
							// const nodes = res;
							// nodes.forEach(item => {
							// 	item.value = item.cs_ex2 + "#" + item.cs_ex1;
							// 	item.label = item.cs_ex2;
							// 	item.leaf = level >= 1; //判断是否为末尾节点，这个地方是0,1,2三级
							// })
							// resolve(nodes);
						}).catch(res => {
							console.log(res)
							const nodes = res.response.data;
							nodes.forEach(item => {
								item.value = item.cs_ex2+"#"+item.cs_ex1;
								item.label = item.cs_ex2;
								item.leaf = level >= 1; //判断是否为末尾节点，这个地方是0,1,2三级
							})
							resolve(nodes);
						})
					}
				},
			}
		},
		watch: {
			xzqhArray(newA, oldA) {
				let i = newA[0].split("#")[0] + "#" + newA[1].split("#")[0]
				this.searchData.stone = i;
				console.log(i)
			},
			'$route': 'fetchData',
		},
		methods: {
			tableRowClassName({
				rowIndex
			}) {
				if (rowIndex % 2 === 0) {
					return "warning-row";
				} else if (rowIndex % 2 === 1) {
					return "success-row";
				}
				return "";
			},
			fetchData() {
				console.log('路由发送变化doing...');
				this.loadData()
				this.getData();
				// this.$refs.routers.loadData();
				// this.isLoad = true;
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						alert('submit!');
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			resetQuery() {
				for (let key in this.searchData) {
					this.searchData[key] = "";
				}
				this.xzqhArray = []
			},
			handleClick(tab, event) {
				console.log(tab, event);
				console.log("tab.name===============" + tab.name)
				this.listname = tab.name;
				this.page = 1;
				this.getData();
				this.loadData();
			},
			closedbListView(n) {
				this.centerDialogVisible2 = false
			},
			handleSizeChange(val) {
				this.limit = val;
				this.loadData()
			},
			handleCurrentPageChange(val) {
				this.page = val;
				this.loadData()
			},
			loadData() {
				console.log(123456);
				this.loading = true
				this.getSearchData({
					params: JSON.stringify(this.searchData),
					abcd_ex23:this.$route.query.abcd_ex23,
					abcd_ex28:this.$route.query.abcd_ex28,
					abcd_ex33:this.$route.query.abcd_ex33,
					abcd_id:this.$route.query.abcd_id,
					page: "" + this.page,
					limit: "" + this.limit,
				}).then(res => {

					// this.tableData = [];
					// this.count = 1;

					// if (res.data) {
					// 	this.tableData = res.data
					// 	this.count = res.count;
					// }
					// for (let i = 0; i < this.tableData.length; i++) {
					// 	if (this.tableData[i]['btn']) {
					// 		let btn = this.tableData[i].btn;
					// 		for (let j = 0; j < btn.length; j++) {
					// 			let type = this.tableData[i].btn[j].type;
					// 			if (type == "openWin") {
					// 				this.tableData[i].btn[j].btnType = "primary"
					// 			} else
					// 				this.tableData[i].btn[j].btnType = "danger"
					// 		}

					// 	}
					// }
					// this.loading = false;
				}).catch(res => {
					
					// this.loading = false;
					this.tableData = [];
					this.count = 1;
					
					if (res.response.data.data) {
						this.tableData = res.response.data.data
						this.count = res.response.data.count;
					}
					for (let i = 0; i < this.tableData.length; i++) {
						if (this.tableData[i]['btn']) {
							let btn = this.tableData[i].btn;
							for (let j = 0; j < btn.length; j++) {
								let type = this.tableData[i].btn[j].type;
								if (type == "openWin") {
									this.tableData[i].btn[j].btnType = "primary"
								} else
									this.tableData[i].btn[j].btnType = "danger"
							}
					
						}
					}
					this.loading = false;
				})
			},
			queryListByCriteria() {
				this.page = 1;
				if (this.searchData.code && this.searchData.code.length != 18) {
					this.$message.warning('请输入正确的身份证号码')
				} else {
					this.loadData();
				}
			},
			getData() {
				this.loading = true
				this.getDatas({
					sKey: "" + this.sKey,
					listname: this.listname
				}).then(res => {
					// console.log(res)
					// if (this.listname == '') {
					// 	if (res[0].searchStr.length > 0) {
					// 		this.searchInline = res[0].searchStr
					// 	}
					// 	if (res[0].tabJson.length > 0 && res[0].tabJson[0].maps.length > 0) {

					// 		this.tabData = res[0].tabJson[0].maps
					// 		// this.activeName = res.response.data[0].tabJson[0].maps[0].val
					// 		this.activeName = res[0].tabJson[0].maps[0].listname
					// 	}
					// }
					// this.tableList = [];
					// if (res[0].list.length > 0) {
					// 	this.tableList = res[0].list
					// 	console.log(res[0].list)
					// }
					// this.buttonJson = res[0].buttonJson
				}).catch(res => {
					if (this.listname == '') {
						if (res.response.data[0].searchStr.length > 0) {
							this.searchInline = res.response.data[0].searchStr
						}
						if (res.response.data[0].tabJson.length > 0 && res.response.data[0].tabJson[0].maps.length > 0) {
					
							this.tabData = res.response.data[0].tabJson[0].maps
							// this.activeName = res.response.data.res.response.dataponse.data[0].tabJson[0].maps[0].val
							this.activeName = res.response.data[0].tabJson[0].maps[0].listname
						}
					}
					this.tableList = [];
					if (res.response.data[0].list.length > 0) {
						this.tableList = res.response.data[0].list
						console.log(res.response.data[0].list)
					}
					this.buttonJson = res.response.data[0].buttonJson
				})
			},
			getSearchData(data) {
				return request({
					headers: {
						'Accept': 'application/json',
					},
					url: '/social/assistance/getchildLineList',
					method: 'post',

					data: data
				})
			},
			getDatas(data) {
				return request({

					url: '/social/common/commonListJson',
					method: 'post',
					data: data
				})
			},
			closes(data) {
				console.log('关闭了啊')
				this.centerDialogVisible2 = false;
				this.loadData();
			},
			// 修改了内容未保存点击关闭，重新打开由于路由没有发生变化，导致会显示上次修改内容，需要重新获取数据
			close() {
				console.log('关闭了')
				//this.$refs.routers.loadData();
			},
			
			btnEvent(item) {
				//alert(item.url)
				if (item.type == "openWin") {
					let timestamp = Date.parse(new Date());
					let url = item.url;
					url = url.indexOf("?") == -1 ? url + "?timestamp=" + timestamp : url + "&timestamp=" + timestamp;
					if(process.env.NODE_ENV=="development"){
						this.$router.push({
							path: url
						});
					}else
						this.$pushRouter({path:generalConfig.defaultUrl + url,})

					this.centerDialogVisible2 = true;

					if (item.title) {
						this.titles = item.title;
					} else {
						this.titles = item.name;
					}
				} else if (item.type == "get") {
					this.titles2 = item.name;
					this.src = item.url;
					this.centerDialogVisible4 = true;
				} else if (item.type == "get2") {
					this.titles2 = item.name;
					this.loading = true;
					request({
						headers: {
							'Accept': 'application/json',
						},
						url: item.url,
						method: 'post',
						data: {}
					}).then(res => {
						// this.loading = false;
						// let json = res;
						// this.pdfList = [];
						// for (let i = 0; i < json.length; i++) {
						// 	this.pdfList.push('data:image/;base64,' + unescape(json[i].base64))
						// }
						// //this.src = 'data:application/pdf;base64,' + res.response.data;
						// this.centerDialogVisible5 = true;

					}).catch(res => {
						// this.loading = false;
						this.loading = false;
						let json = res.response.data;
						this.pdfList = [];
						for (let i = 0; i < json.length; i++) {
							this.pdfList.push('data:image/;base64,' + unescape(json[i].base64))
						}
						//this.src = 'data:application/pdf;base64,' + res.response.data;
						this.centerDialogVisible5 = true;
					})

				} else if (item.type == "confirm" || item.type == "comfirms") {
					let sef = this;
					this.$confirm('确定要' + item.name + '?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						// 打开遮罩层
						this.loading = true
						// 设置定时器，30秒请求失败刷新页面
						let time = setTimeout(() => {
							this.loadData();
							this.$message.error("网络异常");
						}, 30000)
						request({

							url: item.url,
							method: 'post',
							data: {}
						}).then(res => {
							// // 数据请求成功删除定时器
							// clearTimeout(time);
							// this.loading = false
							// if (res[0].status == "+OK") {
							// 	this.$message({
							// 		message: unescape(res[0].msg),
							// 		type: 'success'
							// 	});

							// 	this.loadData();
							// } else {
							// 	sef.$message.error(unescape(res[0].msg));
							// }

						}).catch(res => {
							// // 数据请求成功删除定时器
							// clearTimeout(time);
							// this.loading = false
							// 数据请求成功删除定时器
							clearTimeout(time);
							this.loading = false
							if (res.response.data[0].status == "+OK") {
								this.$message({
									message: unescape(res.response.data[0].msg),
									type: 'success'
								});
							
								this.loadData();
							} else {
								sef.$message.error(unescape(res.response.data[0].msg));
							}
						})
					}).catch(() => {

					});
				}
			},
		},
		created() {

			this.getData();

			this.loadData();
		}
	}
</script>



<style scoped>
	.g-box {
		display: flex;
		width: 100%;
		height: 60VH;
		/* height: 100%; */
		flex-direction: column;
	}

	.content {
		/* height: 90%; */
		height: 100%;
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.e-table {
		flex: 1;
		overflow: auto;
	}

	.item {
		margin-top: 10px;
		margin-right: 40px;
	}

	.view {
		height: 50px;
	}

	.footer {
		/* height: 50px; */
		height: 10%;
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
<!-- 
<style>
	/* 全局样式 */
	.el-date-editor.el-input,
	.el-date-editor.el-input__inner {
		width: 180px !important;
	}

	.warning-row {
		/* background: #c0d2c6 !important; */
		/* background: #DCDCDC !important; */
	}

	.success-row {
		/* background: #C0C0C0 !important; */
		background: #DCDCDC !important;
	}

	/* 	.el-dialog__header{
		text-align: center !important;
	} */
	.el-dialog__title {
		font-size: 22px !important;
	}

	.el-table-column--selection .cell {
		text-align: center;
	}

	/* 操作下居中 */
	.cell {
		text-align: center;
	}

	/* 表头颜色 */
	.el-table--border th {
		background-color: #e6e6dc !important;
		font-weight: 700;
		font-size: 14px;
	}

	/* 查询选项 */
	.el-form-item {
		margin-bottom: 10px;
		margin-right: 0;
	}

	/* 滚动条 */
	::-webkit-scrollbar {
	  width: 10px;
	  height: 10px;
	}
	 ::-webkit-scrollbar-thumb {
	  /*滚动条里面小方块*/
	  border-radius: 5px;
	  box-shadow : inset 0 0 5px rgba(0, 0, 0, 0.2);
	  background : #959595;
	  }
	  ::-webkit-scrollbar-track {
	  /*滚动条里面轨道*/
	  box-shadow : inset 0 0 5px rgba(0, 0, 0, 0.2);
	  border-radius: 5px;
	  background : #ededed;
	  }
</style> -->


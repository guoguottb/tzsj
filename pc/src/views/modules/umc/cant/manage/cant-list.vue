<template>
	<div>
		<!--<div class="page-header">-->
		<!--<h3></h3>-->
		<!--</div>-->
		<div class="g-box">
			<div style="margin-bottom: 10px;">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item v-for="(item, index) in titleList" :key="index">
						<el-button type="text" @click="breadcrumbFunc(item, index)">
							{{ item.cantName }}
						</el-button>
					</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<div class="umc-filter clearfix">
				<el-form :inline="true" class="demo-form-inline" size="small">
					<el-form-item label="行政区划代码">
						<el-input placeholder="行政区划代码" maxlength="20" v-model="pageParam.cantCode"></el-input>
					</el-form-item>
					<el-form-item label="行政区划名称">
						<el-input placeholder="行政区划名称" maxlength="250" v-model="pageParam.cantName" @change="btKeyDown"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="queryListByCriteria" icon="el-icon-search">查询</el-button>
						<el-button type="info" @click="resetQuery" icon="el-icon-refresh">重置</el-button>
					</el-form-item>
				</el-form>
				<el-button-group style="float: right">
					<el-button type="primary" icon="el-icon-edit" size="small" v-if="btnUrls.add.permit" @click="addOrUpdateHandle()">新增</el-button>
					<el-button type="danger" icon="el-icon-delete" size="small" v-if="btnUrls.del.permit" @click="deleteCant()">删除</el-button>
				</el-button-group>
			</div>
			<el-table :data="tableData" stripe border ref="showTable" @row-click="clickRow" style="width: 100%" v-loading="loading">
				<el-table-column type="selection" width="40"></el-table-column>
				<el-table-column align="left" prop="cantCode" label="行政区划代码" width="auto"></el-table-column>
				<el-table-column align="left" prop="cantName" label="行政区划名称" width="auto">
					<template slot-scope="scope">
						<el-button type="text" @click="rowNameClick(scope.row)" size="small">{{ scope.row.cantName }}</el-button>
					</template>
				</el-table-column>
				<el-table-column align="left" prop="shortName" label="行政区划简称" width="auto"></el-table-column>
				<el-table-column align="left" prop="cantTypeName" label="行政区划类型" width="auto"></el-table-column>
				<el-table-column align="left" label="操作" width="220">
					<template slot-scope="scope">
						<el-button-group>
							<el-button type="primary" v-if="btnUrls.update.permit" @click="addOrUpdateHandle(scope.row)" size="mini">编辑</el-button>
							<el-button type="danger" v-if="btnUrls.del.permit" @click="deleteCant(scope.row)" size="mini">删除</el-button>
							<el-button type="danger" v-if="btnUrls.hist.permit" @click="goToHistoryPage(scope.row)" size="mini">查看历史</el-button>
						</el-button-group>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<el-pagination class="pull-right" background layout="total, sizes, prev, pager, next" :total="page.pageTotal"
		 :page-size="page.pageSize" :page-sizes="[5, 10, 20, 50, 100]" :current-page="page.page + 1" @size-change="handleSizeChange"
		 @current-change="handleCurrentChange"></el-pagination>
		<manager-dialog ref="addOrUpdate" :dicts="dicts" :parentData="currentCant" @save="getCantList"></manager-dialog>

		<!--<cant-history ref="history" @backListPage="backListPage"></cant-history>-->
	</div>
</template>
<script>
	import managerDialog from "./add-edit-cant";
	import cantHistory from "./cant-history";
	import {
		debug
	} from "util";
	import cantListService from "@/api/cant/cant-list";
	import dictService from "@/api/dict/dict.js"
	const btnUrls = {
		add: {
		    url:"cant/saveCant",method:"post",permit:false
		},
		del: {
		    url:"cant/batchDelCant",method:"get",permit:false
		},
		update:{
		    url:"cant/updateCant",method:"post",permit:false
		},
		hist:{
		    url:"history/cant",method:"get",permit:false
		}
	};
	const rootData = {
		cantId: "rootId",
		cantName: "行政区划"
	};

	export default {
		data() {
			return {
				btnUrls: { ...btnUrls
				},
				btnAuths: {
					[btnUrls.add]: true,
					[btnUrls.del]: true,
					[btnUrls.update]: true,
					[btnUrls.hist]: true
				},
				loading: false,
				saving: false,
				//导航条数据
				titleList: [],
				//表格数据
				tableData: [],
				//字典配置
				dicts: {
					// 需要加载的字典项
					needDicts: ['YES_OR_NO'],

					// 是否自建
					yesNo: [],
                    // 需要加载的字典项
                    // needDicts: ["APPROVAL,UNIT_CREATE"],
                    // // 字典项
                    dictList: {
							'YES_OR_NO':[]
					},
                    // // 是否已拿到字典项
                    // dictFlag: false,
                    // // 是否已拿到字典项数据列表
                    // dataFlag: false,
                    // // 是否批复
                    // approvalList: [],
                    // // 是否自建
                    // unitCreateList: []
				},
				//分页信息
				page: {
					page: 0,
					pageSize: 10,
					pageTotal: 0,

					sortFiled: "",
					sortAsc: ""
				},
				//查询条件
				pageParam: {
					cantCode: "",
					cantName: ""
				}
			};
		},
		components: {
			managerDialog,
			cantHistory
		},
		computed: {
			//当前选中区划
			currentCant: function() {
				if (this.titleList.length < 1) {
					return null;
				}
				return this.titleList[this.titleList.length - 1];
			}
		},
		created() {
			this.titleList.push(Object.assign({}, rootData));
			this.queryListByCriteria();
			this.getDictListItem();
			this.getBtnAuth();

		},
		watch: {
			//监听导航条，如果变化了就重新加载organtype下拉框的数据
			titleList(val) {
				if (val == null || val.length == 0) {
					return;
				}
				this.getCantList();
				// this.getOrganTypeList(this.getNodeData);
			}
		},
		methods: {
			// 只能输入汉字、英文、数字
			btKeyDown() {
				this.pageParam.cantName = this.pageParam.cantName.replace(
					/[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g,
					""
				);
			},

			// 获取按钮权限信息
			getBtnAuth() {
				for (const key in btnUrls) {
					if (btnUrls.hasOwnProperty(key)) {
						const element = btnUrls[key];
						this.$permitBtnAuth(element, this.btnAuths);
					}
				}
			},
			// table 处理基本函数 start
			clickRow(row) {
				this.$refs.showTable.toggleRowSelection(row);
			},
			handleSizeChange(pageSize) {
				this.page.page = 0;
				this.page.pageSize = pageSize;
				this.getCantList();
			},
			handleCurrentChange(currentPage) {
				this.page.page = currentPage - 1;
				this.getCantList();
			},
			// table 处理基本函数 end
			// 获取字典项
			getDictListItem() {
                this.$findDicts(this.dicts.needDicts,this.dicts.dictList)

			},
			// 表格数据处理的相关函数 start
			getCantList() {
				if (this.loading) {
					return;
				}
				this.loading = true;
				cantListService.query(Object.assign({
							superId: this.currentCant.cantId
						},
						this.pageParam,
						this.page
					)).then(data => {
						if (data.status === 0) {
							this.tableData = data.data.rows;
							this.page.pageTotal = data.data.totalCount;
						} else {
							this.$message.warning(data.msg ? data.msg : "网络异常");
						}
					})
					.catch(error => {
					}).finally(data => {
						this.loading = false;
					});
			},
			queryListByCriteria() {
				this.pageParam.page = 0;
				this.getCantList();
			},
			resetQuery() {
				this.pageParam.page = 0;
				this.pageParam.cantCode = "";
				this.pageParam.cantName = "";
				this.queryListByCriteria();
			},
			// 表格数据处理的相关函数 end
			// 新增/修改 相关的函数处理
			addOrUpdateHandle(row) {
				let data = null;
				if (row) {
					data = Object.assign({}, row);
				} else {
					//根节点可能根据权限获取， 为虚拟节点 不能增加
					if (this.currentCant.cantId === rootData.cantId) {
						this.$message({
							message: "当前区划不允许增加下级",
							type: "warning"
						});
						return;
					}
					data = {
						superId: this.currentCant.cantId,
						superName: this.currentCant.cantName,
						inUse: '1'
					};
				}
				this.$nextTick(() => {
					this.$refs.addOrUpdate.init(data);
				});
			},
			// 删除
			deleteCant(param) {
				if (!param && this.$refs.showTable.selection.length < 1) {
					this.$message({
						message: "请选择要删除的数据",
						type: "warning"
					});
					return;
				}
				this.$confirm("确认删除?", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				}).then(() => {
					let codes = param ?
						param.cantId :
						this.$refs.showTable.selection.map(item => item.cantId).join();
					//        this.$http({
					//          url: this.$http.adornUrl(btnUrls.del),
					//          method: "post",
					//          data: this.$http.adornData(
					//            {
					//              cantList: codes
					//            },
					//            false,
					//            "notJson"
					//          ),
					//          headers: {
					//            "Content-Type": "application/x-www-form-urlencoded"
					//          }
					//        })
					cantListService.batchDelCant(codes).then(data => {
							if (data.status === 0) {
								this.$message({
									message: "删除成功",
									type: "success"
								});
								this.getCantList();
							} else {
								this.$message.warning(data.msg ? data.msg : "网络异常");
							}
						})
						.catch(error => {
						});
				});
			},
			//
			breadcrumbFunc(row, idx) {
				if (!row) {
					return;
				}
				this.pageParam.page = 0;

				if (idx != -1 && idx < this.titleList.length - 1) {
					//删除后续元素
					this.titleList.splice(idx + 1);
				}
			},
			//行点击
			rowNameClick(row) {
				if (this.currentCant.cantId === row.cantId) {
					return;
				}
				this.titleList.push(row);
			},
			/** 历史变更相关的函数 start */
			goToHistoryPage(row) {
				this.histVisible = true;
				this.$nextTick(() => {
					this.$refs.history.init(row);
				});
			},
			backListPage(data) {
				this.histVisible = false;
			}
			/** 历史变更相关的函数 end */
		}
	};
</script>
<style lang="scss" scoped></style>

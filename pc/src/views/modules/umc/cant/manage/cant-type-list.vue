<template>
	<div>
		<div class="g-box">
			<div class="toolbar">
				<div class="g-search-simple pull-left" style="width: 100%;">
					<el-form :inline="true" class="demo-form-inline" size="small">
						<el-form-item label="区划类型代码">
							<el-input placeholder="区划类型代码" v-model="pageParam.cantType"></el-input>
						</el-form-item>
						<el-form-item label="区划类型名称">
							<el-input placeholder="区划类型名称" v-model="pageParam.typeName"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="queryListByCriteria" icon="el-icon-search">查询</el-button>
							<el-button type="info" @click="resetQuery" icon="el-icon-refresh">重置</el-button>
						</el-form-item>
					</el-form>
				</div>
				<div class="pull-right">
					<el-button type="primary" v-if="btnUrls.add.permit" icon="el-icon-edit" size="small" @click="addOrUpdateHandle()">新增</el-button>
					<el-button type="danger" v-if="btnUrls.del.permit" icon="el-icon-delete" size="small" @click="deleteItem()">删除</el-button>
				</div>
				<div class="clearfix"></div>
			</div>
			<el-table :data="tableData" border ref="showTable" @sort-change="sortChange" @row-click="clickRow" v-loading="loading">
				<el-table-column align="left" type="selection" width="50"></el-table-column>
				<el-table-column align="left" prop="cantType" label="区划类型代码" width></el-table-column>
				<el-table-column align="left" prop="typeName" label="区划类型名称" show-overflow-tooltip></el-table-column>
				<el-table-column align="left" prop="inUse" label="是否启用" width :formatter="inUseFormatter"></el-table-column>
				<el-table-column align="left" label="操作" width="150">
					<template slot-scope="scope">
						<el-button-group>
							<el-button type="primary" v-if="btnUrls.update.permit" @click="addOrUpdateHandle(scope.row)" size="mini">编辑</el-button>
							<el-button type="danger" v-if="btnUrls.del.permit" @click="deleteItem(scope.row)" size="mini">删除</el-button>
						</el-button-group>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<el-pagination class="pull-right" background layout="total, sizes, prev, pager, next" :total="totalCount"
		 :current-page="pageParam.page + 1" :page-size="pageParam.pageSize" :page-sizes="[5, 10, 20, 50,100]" @size-change="handleSizeChange"
		 @current-change="handleCurrentChange"></el-pagination>


		<div>
			<el-dialog :title="curTitle" v-if="addOrUpdateVisible" :visible.sync="addOrUpdateVisible" width="30%"
			 :close-on-click-modal="false">
				<el-form :model="addData" status-icon label-width="auto" :rules="curRule" ref="addData">
					<el-form-item label="区划类型代码" prop="cantType">
						<el-input v-model="addData.cantType" maxlength="10" :disabled="addData.edit"></el-input>
					</el-form-item>
					<el-form-item label="区划类型名称" prop="typeName">
						<el-input v-model="addData.typeName" maxlength="20"></el-input>
					</el-form-item>
					<el-form-item label="是否启用">
						<el-switch v-model="addData.inUse" active-text="是" active-value="1" inactive-text="否" inactive-value="0"></el-switch>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button @click="addFormClose">取 消</el-button>
					<el-button type="primary" :loading="saving" @click="save('addData')">确 定</el-button>
				</span>
			</el-dialog>
		</div>
	</div>
</template>
<script>
	import {
		isCH
	} from "@/utils/index";

	import cantTypeService from '@/api/cant/cant-manage'
	import cantListService from "@/api/cant/cant-list";
    const btnUrls = {
        add: {
            url:"cant/saveCantType",method:"post",permit:false
        },
        del: {
            url:"cant/deleteCantType",method:"post",permit:false
        },
        update:{
            url:"cant/updateCantType",method:"post",permit:false
        }
    };
	export default {
		data() {
			//名称唯一校验
			let typeNameUniqueCheck = (rule, value, callback) => {
				if (value && this.curCantTypeName === value) {
					callback();
					return;
				}
				cantTypeService.existTypeName({
						typeName: this.addData.typeName
					})
					.then(data => {
						if (data.status === 0 && data.data) {
							callback(new Error("区划类型名称已存在"));
						} else {
							callback();
						}
					})
					.catch(error => {
						callback(
							new Error(
								error.response.data.message ?
								error.response.data.message :
								"服务器错误"
							)
						);
					});
			};
			//区划类型代码校验
			let cantTypeCheck = (rule, value, callback) => {
				const reg = /^[A-Za-z0-9]{1,10}$/;
				if (!value) {
					return callback(new Error("区划类型代码不能为空"));
				} else if (value.length > 10) {
					return callback(new Error("区划类型代码不能超过十位"));
				} else if (!reg.test(value)) {
					return callback(new Error("区划类型代码只能是数字或英文字母"));
				}
				callback();
			};
			//区划类型代码唯一校验
			let cantTypeUniqueCheck = (rule, value, callback) => {
				if (this.addData.edit) {
					callback();
				}
				cantTypeService.existCantType({
						cantType: this.addData.cantType
					}).then(data => {
						if (data.status === 0 && data.data) {
							callback(new Error("区划类型代码已存在"));
						} else {
							callback();
						}
					})
					.catch(error => {
						callback(
							new Error(
								error.response.data.message ?
								error.response.data.message :
								"服务器错误"
							)
						);
					});
			};

			return {
                btnUrls: { ...btnUrls
                },
                btnAuths: {},
				saving: false,
				loading: false,
				// 编辑弹窗使用的变量 start
				curTitle: "",
				//校验规则
				curRule: "",
				//
				curCantTypeName: "",
				// 编辑弹窗使用的变量 end
				// 规则弹框
				tableData: [],
				totalCount: 0,
				addOrUpdateVisible: false,
				addData: {
					edit: false,
					cantType: "",
					typeName: "",
					inUse: ""
				},
				addRule: {
					cantType: [{
							validator: cantTypeCheck,
							trigger: "blur"
						},
						{
							validator: cantTypeUniqueCheck,
							trigger: "blur"
						}
					],
					typeName: [{
							required: true,
							message: "区划类型名称不能为空",
							trigger: "blur"
						},
						{
							validator: isCH,
							trigger: "blur"
						},
						{
							validator: typeNameUniqueCheck,
							trigger: "blur"
						}
					]
				},
				editRule: {
					typeName: [{
							required: true,
							message: "区划类型名称不能为空",
							trigger: "blur"
						},
						{
							validator: isCH,
							trigger: "blur"
						},
						{
							validator: typeNameUniqueCheck,
							trigger: "blur"
						}
					]
				},
				pageParam: {
					cantType: "",
					typeName: "",
					page: 0,
					pageSize: 10
				}
			};
		},
		watch: {
			addOrUpdateVisible(val) {
				if (this.addOrUpdateVisible) {
					this.saving = false;
				}
			}
		},
		created() {
			this.getDataList();
			this.getBtnAuth();
		},
		methods: {
			// table 处理基本函数 start
			clickRow(row) {
				this.$refs.showTable.toggleRowSelection(row);
			},
			handleSizeChange(pageSize) {
				this.pageParam.pageSize = pageSize;
				this.getDataList();
			},
			handleCurrentChange(currentPage) {
				this.pageParam.page = currentPage - 1;
				this.getDataList();
			},
			inUseFormatter(row, column, cellValue, index) {
				return cellValue === "1" ? "是" : "否";
			},
			// table 处理基本函数 end
			// 表格数据处理的相关函数 start
			getDataList() {
				if (this.loading) {
					return;
				}
				this.loading = true;
				cantTypeService.getCantTypesList(this.pageParam).then(data => {
						if (data.status === 0) {
							this.tableData = data.data.rows;
							this.totalCount = data.data.totalCount;
						} else {
							this.$message({
								message: data.msg ? data.msg : "查询时出现错误,请稍后重试",
								type: "warning"
							});
						}
					})
					.catch(error => {

					}).finally(d => {
						this.loading = false;
					});
			},
			queryListByCriteria() {
				this.pageParam.page = 0;
				this.getDataList();
			},
			resetQuery() {
				this.pageParam.cantType = "";
				this.pageParam.typeName = "";
				this.pageParam.page = 0;
				this.getDataList();
			},
			sortChange(param) {
				// column, prop, order
				this.pageParam.sortFiled = param.prop;
				this.pageParam.sortAsc = "DESC";
				this.queryListByCriteria();
			},
			// 表格数据处理的相关函数 end
			// 新增/修改 相关的函数处理
			addOrUpdateHandle(row) {
				if (row) {
					this.curCantTypeName = row.typeName;
					this.curTitle = "编辑类型";
					this.curRule = this.editRule;

					this.addData.edit = true;
					this.addData.cantType = row.cantType;
					this.addData.typeName = row.typeName;
					this.addData.inUse = row.inUse;
				} else {
					this.curCantTypeName = "";
					this.curTitle = "新增";
					this.curRule = this.addRule;

					this.addData.edit = false;
					this.addData.cantType = "";
					this.addData.typeName = "";
					this.addData.inUse = "1";
				}
				this.addOrUpdateVisible = true;
			},

			addFormClose() {
				this.addOrUpdateVisible = false;
			},
			// 删除
			deleteItem(param) {
				if (!param && this.$refs.showTable.selection.length < 1) {
					this.$message({
						message: "请选择要删除的数据",
						type: "warning"
					});
					return;
				}
				let names = param ? param.typeName : this.$refs.showTable.selection.map(item => item.typeName).join();
				this.$confirm("确认删除“" + names + "”?", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				}).then(() => {
					let codes = param ?
						param.cantType :
						this.$refs.showTable.selection.map(item => item.cantType).join();
					let codestr = codes.split(",");
					cantTypeService.deleteCantType(codestr).then(data => {
							if (data.status === 0) {
								this.$message({
									message: "删除成功",
									type: "success"
								});
								this.getDataList();
								return;
							}
							this.$message({
								message: "删除失败",
								type: "warning"
							});
						})
						.catch(error => {
						});
				});
			},
			//
			save() {
				this.$refs["addData"].validate(valid => {
					if (valid) {
						this.saving = true;

						cantTypeService.updateOrSaveCantType({
								cantType: this.addData.cantType,
								typeName: this.addData.typeName,
								inUse: this.addData.inUse
							}, this.addData.edit).then(data => {
								if (data.status === 0) {
									this.$message({
										message: "保存成功！",
										type: "success"
									});
									this.addOrUpdateVisible = false;
									this.getDataList();
								} else {
									this.$message.warning(data.msg ? data.msg : "保存失败");
								}
								this.saving = false;
							})
							.catch(error => {
								this.saving = false;
							});
					}
				});
			},
            // 获取按钮权限信息
            getBtnAuth() {
                for (const key in btnUrls) {
                    if (btnUrls.hasOwnProperty(key)) {
                        const element = btnUrls[key];
                        this.$permitBtnAuth(element, this.btnAuths);
                    }
                }
            }
		}
	};
</script>
<style lang='scss' scoped>
</style>

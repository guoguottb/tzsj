<template>
	<div>
		<el-dialog :title="title" :visible="dialogVisible" width="50%" :close-on-click-modal="false" @close="handleClose">
			<div class="form-cls">
				<el-form   :model="formData" :rules="addRules" ref="formData" label-width="auto">

					<el-form-item label="上级行政区划">
						<span style="color: blue">{{ parentData.cantName }}({{ parentData.cantCode }})</span>
					</el-form-item>

					 

					<el-form-item label="行政区划类型" prop="cantType">
						<el-cascader :disabled="notEditFlag" v-model="formData.cantType" :options="cantTypeList" :props="cantCascaderProps"
						 filterable></el-cascader>
					</el-form-item>

					<el-form-item label="行政区划代码" prop="cantCode">
						<el-input maxlength="12" v-model="formData.cantCode"></el-input>
					</el-form-item>

					<el-form-item label="行政区划名称" prop="cantName">
						<el-input maxlength="250" v-model="formData.cantName"></el-input>
					</el-form-item>

					<el-form-item label="行政区划简称" prop="shortName">
						<el-input maxlength="120" v-model="formData.shortName"></el-input>
					</el-form-item>

					<el-form-item label="是否批复" prop="approval">
						<el-select v-model="formData.approval" placeholder="请选择">
							<el-option v-for="item in dicts.dictList['YES_OR_NO']" :key="item.itemCode" :label="item.itemValue" :value="item.itemCode"></el-option>
						</el-select>
					</el-form-item>

					<el-form-item label="是否自建" prop="unitCreate">
						<el-select v-model="formData.unitCreate" placeholder="请选择">
							<el-option v-for="item in dicts.dictList['YES_OR_NO']" :key="item.itemCode" :label="item.itemValue" :value="item.itemCode"></el-option>

						</el-select>
					</el-form-item>

					</el-form>
				 
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" :loading="isLoading" @click="saveForm('formData')">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
	const btnUrls = {
		add: "cant/saveCant",
		update: "cant/updateCant"
	};
	import cantListService from '@/api/cant/cant-list'
	export default {
		props: {
			dicts: {
				type: Object
			},
			parentData: {
				type: Object
			}
		},
		data() {
			let existCode = async (rule, value, callback) => {
				// let b = await this.$cantService.ifCantCodeExist(
				//   value,
				//   this.formData.cantId
				// );
				cantListService.ifCantCodeExist({
					cantId: this.formData.cantId
				}).then(data => {
					if (data) {
						return callback(new Error("行政区划代码已存在"));
					} else {
						return callback();
					}
				})

			};
			let matchsuperId = (rule, value, callback) => {
				if (
					this.parentData.cantCode === "000000000000" ||
					this.parentData.cantId === "rootId" ||
					this.formData.cantCode.startsWith(
						this.precantCode(this.parentData.cantCode)
					)
				) {
					callback();
				} else {
					callback(new Error("区划编码与上级区划编码不匹配"));
				}
			};

			return {
				isLoading: false,
				title: "保存",
				dialogVisible: false,
				notEditFlag: false,
				cantTypeList: [],
				formData: {
					cantId: "",
					cantType: "",
					cantCode: "",
					cantName: "",
					shortName: "",
					approval: "",
					unitCreate: "",
					inUse: "1",
                    batNum:null,
                    cantNote:null,
                    cantPath:null,
                    countryCode:null,
                    superId:"000000000000"
				},
				cantCascaderProps: {
					expandTrigger: "hover",
					value: "cantType",
					label: "typeName",
					emitPath: false
				},

				addRules: {
					cantCode: [{
							required: true,
							message: "行政区划代码不能为空",
							trigger: "blur"
						},
						{
							min: 12,
							max: 12,
							message: "区划编码为12位"
						},
						{
							validator: existCode,
							trigger: "blur"
						},
						{
							validator: matchsuperId,
							trigger: "blur"
						}
					],
					cantType: [{
						required: true,
						message: "行政类型不能为空",
						trigger: "blur"
					}],
					cantName: [{
						required: true,
						message: "行政区划名称不能为空",
						trigger: "blur"
					}],
					approval: [{
						required: true,
						message: "批复类型不能为空",
						trigger: "blur"
					}],
					unitCreate: [{
						required: true,
						message: "自建类型不能为空",
						trigger: "blur"
					}]
				}
			};
		},
		watch: {
			dialogVisible(val) {
				!val &&
					setTimeout(() => {
						this.$refs["formData"].resetFields();
					}, 0);
			}
		},
		computed: {},
		created() {
			this.getCantTypeList();
		},
		methods: {
			init(data) {
				if (!data) {
					return;
				}
				setTimeout(() => {
					this.$refs.formData.clearValidate();
				}, 100);
				this.isLoading = false;
				this.dialogVisible = true;
				//新增
				if (!data.cantId) {
                    this.formData.superId = data.superId;
                    this.formData.inUse = data.inUse;
					this.notEditFlag = false;
					this.title = "新增行政区划";
				} else {
				    this.formData = data;
					//修改
					this.title = "编辑行政区划";
					this.notEditFlag = true;
				}
			},
			//计算区划代码的前缀
			precantCode(data) {
				if (data === "rootId") {
					return "";
				}
				let idx = data.indexOf("00");
				if (idx % 2 != 0) {
					idx = idx + 1;
				}
				return data.substring(0, idx);
			},
			//清除校验结果
			clearValidate(formName) {
				this.$refs[formName].resetFields();
			}, //区划类型
			getCantTypeList() {
				//      this.$http({
				//        url: this.$http.adornUrl("cantType/listAllCantTypes"),
				//        method: "get",
				//        params: { inUse: "1" }
				//      })
				cantListService.listAllCantTypes({
					inUse: "1"
				}).then(data => {
					if (data.status === 0) {
						this.cantTypeList = this.transCantTypeListToTreeData(data.data.rows);
					}
				});
			},
			//转换成级联
			transCantTypeListToTreeData(cantTypeList) {
				let optionsAry = [{
						typeName: "国家级",
						level: "0",
						cantType: "ty0",
						children: []
					},
					{
						typeName: "省级",
						level: "1",
						cantType: "ty1",
						children: []
					},
					{
						typeName: "市级",
						level: "2",
						cantType: "ty2",
						children: []
					},
					{
						typeName: "县区级",
						level: "3",
						cantType: "ty3",
						children: []
					},
					{
						typeName: "乡镇级",
						level: "4",
						cantType: "ty4",
						children: []
					}
				];

				cantTypeList.forEach(item => {
					optionsAry.forEach(ele => {
						if (item.cantType.substr(0, 1) === ele.level) {
							ele.children.push(item);
						}
					});
				});

				return optionsAry;
			},
			//窗口关闭
			handleClose() {

				this.dialogVisible = false;
				this.clearValidate("formData");
				this.$emit("cancel");
			},
			// 保存
			updateCantItem() {
				if (!this.formData.cantName.length) {
					return;
				}
				this.isLoading = true;
				//      this.$http({
				//        url: this.$http.adornUrl(btnUrls.update),
				//        method: "post",
				//        data: this.formData
				//      })
				cantListService.updateCant(this.formData).then(data => {
						if (data.status === 0) {
							this.$message({
								message: "修改成功",
								type: "success"
							});
							this.dialogVisible = false;
							this.$emit("save");
						} else {
							this.$message.warning(data.msg ? data.msg : "修改失败");
						}
					})
					.catch(error => {

					});
			},
			insertCantItem(formName) {
				this.$refs[formName].validate(valid => {
					if (!valid) {
						return false;
					}
					this.isLoading = true;
					//        this.$http({
					//          url: this.$http.adornUrl(btnUrls.add),
					//          method: "post",
					//          data: this.formData
					//        })
					cantListService.saveCant(this.formData).then(data => {
							if (data.status === 0) {
								this.$message({
									message: "添加成功",
									type: "success"
								});
								this.dialogVisible = false;
								this.$emit("save");
							} else {
								this.$message.warning(data.msg ? data.msg : "添加失败");
							}
							this.isLoading = false;
						})
						.catch(error => {
							this.isLoading = false;
						});
				});
			},
			saveForm() {
				if (this.notEditFlag) {
					this.updateCantItem();
					return;
				}
				this.insertCantItem("formData");
			}
		}
	};
</script>
<style lang="scss" scoped>
	.el-form-item .el-select {
		width: 100%;
	}
</style>

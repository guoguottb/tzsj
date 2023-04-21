<template>
  <div>
    <div class="g-box">
      <div class="" v-if="!organParentVisible">
        <div class="col-md-10 col-md-offset-1">
          <div style="margin-bottom: 10px;">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item>
                <span style="margin-right:20px;">当前位置: </span>
                <el-button type="text" @click="breadcrumbFunc()">{{this.currentUnitName}}</el-button>
              </el-breadcrumb-item>
              <el-breadcrumb-item v-for="(item, index) in titleList" :key="index">
                <el-button type="text" @click="breadcrumbFunc(item)"> {{item.name}}</el-button>
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="umc-filter clearfix">
            <el-form :inline="true" class="demo-form-inline" size="small">
              <el-form-item label="角色编码">
                <el-input placeholder="角色编码" maxlength="250" v-model="pageParam.roleId"></el-input>
              </el-form-item>
              <el-form-item label="角色名称">
                <el-input placeholder="角色名称" maxlength="250" v-model="pageParam.name"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="queryListByCriteria"
                           icon="el-icon-search">查询
                </el-button>
                <el-button type="info" @click="resetQuery" icon="el-icon-refresh">重置
                </el-button>
              </el-form-item>
            </el-form>
            <div style="text-align: right;">
                <el-button-group>
                  <el-button type="primary" icon="el-icon-edit" size="small"
                             @click="addNode()">新增
                  </el-button>
                  <el-button type="danger" icon="el-icon-delete" size="small"
                             @click="delNode()">删除
                  </el-button>
                </el-button-group>
            </div>
          </div>
          <el-table :data="tableList" stripe border ref="showTable" @row-click="clickRow" style="width: 100%">
            <el-table-column align="left" type="selection" width="50"></el-table-column>
            <el-table-column align="left" prop="roleId" label="角色编码" show-overflow-tooltip
                             width="auto"></el-table-column>
            <el-table-column align="left" prop="name" label="角色名称" show-overflow-tooltip width="auto">
              <template slot-scope="scope">
                <el-button type="text" @click="breadcrumbFunc(scope.row)" size="small">
                  {{scope.row.name}}
                </el-button>
              </template>
            </el-table-column>
            <el-table-column align="left" label="操作" width="220">
              <template slot-scope="scope">
                <el-button-group>
                  <el-button type="primary" @click="updateNode(scope.row)" size="mini">
                    编辑
                  </el-button>
                  <el-button type="primary" @click="roleManager(scope.row)" size="mini">
                    角色分配
                  </el-button>
                  <el-button type="danger" @click="delNode(scope.row)" size="mini">删除
                  </el-button>
                </el-button-group>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination background layout="total, sizes, prev, pager, next" :total="pageTotal"
                         :page-size="pageParam.pageSize" :page-sizes="[5, 10, 20, 50,100]"
                         :current-page="pageParam.page + 1" @size-change="handleSizeChange"
                         @current-change="handleCurrentChange">
          </el-pagination>
        </div>
      </div>

      <!--新增组织机构-->
      <div class="g-dialog">
        <el-dialog title="添加下级" v-if="addVisible" :visible.sync="addVisible" :close-on-click-modal="false">
          <el-form :model="addData" :rules="dataRule" ref="addData"
                   status-icon label-width="30%">
            <el-row>
              <el-col :span="24">
                <el-form-item label="角色编码" prop="roleId">
                  <el-input v-model="addData.roleId" maxlength="12"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="角色名称" prop="name">
                  <el-input v-model="addData.name" maxlength="100"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="备注" prop="note">
                  <el-input v-model="addData.note" maxlength="40"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

          <span slot="footer" class="dialog-footer">
            <el-button @click="addFormClose">取 消</el-button>
            <el-button type="primary" :loading="isLoading" @click="add">确 定</el-button>
          </span>
        </el-dialog>
      </div>

      <!--编辑功能-->
      <editManager v-if="editVisible" ref="editManagerModal" @getUpdateData="updatedata"
                   :regionTreeData="regionTreeData" :regionCascaderProps="regionCascaderProps"
                   :organTreeData="organTreeData" :organCascaderProps="organCascaderProps"></editManager>

        <!--分配角色-->
        <div style="" class="g-dialog">
            <el-dialog title="可分配角色"
                       v-if="roleManagerVisible"
                       :visible.sync="roleManagerVisible"
                       width="50%"
                       :close-on-click-modal="false">
                <el-transfer
                        :titles="['未分配角色','已分配角色']"
                        style="margin-left: 5%;margin-right: 5%;"
                        v-model="roleManagerValue"
                        :data="roleManagerData"></el-transfer>
                <span slot="footer"
                      class="dialog-footer">
          <el-button @click="roleManagerVisible=false">取 消</el-button>
          <el-button type="primary"
                     :loading="isLoading"
                     @click="editRolesManager()">确 定</el-button>
        </span>
            </el-dialog>
        </div>

    </div>

  </div>
</template>



<script>
    import roleService from "@/api/user/role-manage";
    import editManager from './add-edit-role'
    export default {

        data () {
            // 机构编码校验
            let dictCodeCheck = (rule, value, callback) => {
                callback()
            }
            return {
                // 上级机构
                organParentVisible: false,
                currentUnitName: '',
                pageTotal: 0,
                pageParam: {
                    superCode: 'rootId',
                    inUse: '',
                    page: 0,
                    pageSize: 10,
                    needTotal: true,
                    roleId:'',
                    name:''
                },
                isLoading: false,
                struTypeName: '',
                page: 0,
                pageSize: 10,
                data: {},
                options: [],
                // 组织类型名称以及类型
                valueTitle: '',
                valueId: '', // 初始值
                defaultProps: {
                    children: 'children',
                    label: 'label',
                    value: 'value'
                },
                sortname: '横排',
                horizontal: true,
                titleList: [],
                tableData: [],
                tableList: [],
                // struType: "00",
                collapsable: true,
                expandAll: false,
                addData: {},
                // 组织机构类型对应的组织机构的名称
                organTypeName: '',
                organTypeList: [],
                // 列表页面的组织机构类型
                listOrganType: [
                    { organType: '选择全部' },
                    { organType: '组织'},
                    { organType: '组织类型'}],
                addVisible: false,
                showVisible: false,
                currentData: {},
                currentRoleData: {},
                editVisible: false,
                editData: {},
                dataRule: {
                    roleId: [{
                        required: true,
                        message: '角色编码不能为空',
                        trigger: 'blur'
                    }, {
                        validator: dictCodeCheck,
                        trigger: 'blur'
                    }],
                    name: [{
                        required: true,
                        message: '角色名称不能为空',
                        trigger: 'blur'
                    }]
                },
                roleManagerVisible: false,
                // 区划级联选择器数据
                regionTreeData: [],
                regionCascaderProps: {
                    expandTrigger: 'click',
                    multiple: false,
                    checkStrictly: true,
                    value: 'cantId',
                    label: 'cantName',
                    emitPath: false,
                    lazy: true,
                    lazyLoad: this.getChildCant
                },

                // 机构级联选择器数据
                organTreeData: [],
                organCascaderProps: {
                    expandTrigger: 'click',
                    checkStrictly: true,
                    value: 'organId',
                    label: 'organName',
                    emitPath: false,
                    lazy: true,
                    lazyLoad: this.getChildOrgan
                },
                roleSetData: {},
                roleSetVisible: false,
                roleManagerVisible: false,
                roleManagerData: [],
                roleManagerValue: [],
                treeData: [],
                expandedKeys: ['00'],
                menuListTreeProps: {
                    label: 'moduleName',
                    children: 'child'
                },
                defaultMenuKeys: [],
                checkedKeysArray: [],
                cantSelDisable: true
            }
        },

        watch: {

        },

        components: {
            editManager
        },

        created () {
            // 获取表格数据
            this.getRootData(),
            this.generateRoleManager()
        },

        computed: {
            mainNavbarHeight: {
                get () {
                    return this.$store.state.common.mainNavbarHeight
                },
                set (val) {
                    this.$store.commit('common/updateMainNavbarHeight', val)
                }
            },
            mainMenuHeight: {
                get () {
                    return this.$store.state.common.mainMenuHeight
                },
                set (val) {
                    this.$store.commit('common/updateMainMenuHeight', val)
                }
            },
            leftSideWidth: {
                get () {
                    return this.$store.state.common.leftSideWidth
                }
            }
        },

        methods: {
            // table 处理基本函数 start
            clickRow (row) {
                this.$refs.showTable.toggleRowSelection(row)
            },
            // 点击名称进入下级
            breadcrumbFunc (row) {
                this.pageParam.page = 0
                if (!row) {
                    this.pageParam.superCode = 'rootId'
                    this.titleList = []
                    this.getRootData()
                    this.generateRoleManager()
                    return
                }
                this.pageParam.superCode = row.roleId
                this.titleList = this.titleList.filter(item => item.rolePath < row.rolePath)
                this.titleList.push(row)
                this.currentData = row
                this.getNodeData()
            },
            // 根目录下数据
            getRootData () {
                roleService.getRoleChildrenInfo({
                    parentId: this.pageParam.superCode,
                }).then(data => {
                    if (data.status === 0 && data.data) {
                        this.currentData = data.data['0']
                        this.currentUnitName = data.data['0'].name
                        // 添加当前页数及每页大小的参数。
                        this.getNodeData()
                    } else {
                        this.data = {}
                    }
                }).catch(error => {
                })
            },
            // 点击获取当前节点的子节点数据
            getNodeData () {
                let dataList = []
                roleService.getRoleChildren({
                    page: this.pageParam.page,
                    pageSize: this.pageParam.pageSize,
                    roleId: this.pageParam.roleId,
                    parentRole: this.currentData.roleId,
                    name:this.pageParam.name
                }).then(res => {
                        this.tableList = [];
                        let list = res.data.rows;
                        dataList = list;
                        for (let i = 0; i < list.length; i++) {
                            let str = [];
                            str.roleId = list[i].roleId;
                            str.name = list[i].name
                            str.parentRole = list[i].parentRole
                            str.rolePath = list[i].rolePath
                            str.note = list[i].note
                            this.tableList.push(str)
                        }
                        this.pageTotal = res.data.totalCount
                    }).catch(error => {

                })
                if (dataList.length === this.pageParam.pageSize) {
                    this.getNodeData()
                }
            },
            //  查询按钮
            queryListByCriteria () {
                this.page = 0
                this.getNodeData()
            },
            //  重置按钮
            resetQuery () {
                this.pageParam.page = 0
                this.pageParam.roleId = ''
                this.pageParam.name = ''
                this.getNodeData()
            },
            handleSizeChange (pageSize) {
                this.pageParam.page = 0
                this.pageParam.pageSize = pageSize
                this.getNodeData()
            },
            handleCurrentChange (currentPage) {
                this.pageParam.page = currentPage - 1
                this.getNodeData()
            },
            addNode () {
                let item = {
                    roleId: '',
                    name: '',
                    parentRole: '',
                    note: ''
                }
                this.isLoading = false
                this.addData = Object.assign({}, item)
                this.addVisible = true
            },
            addFormClose () {
                this.addVisible = false
            },
            // 添加下级节点
            add (data) {
                this.$refs['addData'].validate(valid => {
                    if (valid) {
                        this.addData.parentRole = this.currentData.roleId
                        this.isLoading = true
                        console.log(this.addData);
                        roleService.saveRole(this.addData).then( data => {
                            if (data.status === 0) {
                                this.$message({
                                    message: '添加成功!',
                                    type: 'success'
                                })
                                this.addVisible = false
                                this.getNodeData()
                                this.generateRoleManager()
                                this.isLoading = false
                            } else {
                                this.$message({
                                    message: '添加失败！',
                                    type: 'warning'
                                })
                                this.isLoading = false
                            }
                        }).catch(error => {
                            this.isLoading = false
                        })
                    }
                })
            },
            async updateNode (data) {
                this.editData = data
                this.editVisible = true
                this.$nextTick(() => {
                    this.$refs.editManagerModal.init('修改节点')
                    this.$refs.editManagerModal.initData(this.editData)
                })
            },
            // 通过子组件传递过来的数据进行更新父组件的data数据
            updatedata (val) {
                this.getNodeData();
                this.editVisible = false;
            },
            delNode (data) {
                if (!data && this.$refs.showTable.selection.length < 1) {
                    this.$message({message: '请选择要删除的数据', type: 'warning'})
                    return
                }
                this.$confirm('确认删除该节点？', '提示', {
                    type: 'warning'
                }).then(() => {
                    let roleIds = data ? data.roleId
                        : this.$refs.showTable.selection.map(item => item.roleId).join()
                    console.log(roleIds);
                    roleService.delRole({roleId:roleIds}).then((data) => {
                        if (data.status === 0) {
                            this.$message({
                                message: "删除成功！",
                                type: "success"
                            });
                            this.getNodeData();
                        } else {
                            this.$message({
                                message: data.msg,
                                type: "warning"
                            });
                        }
                    }).catch((error) => {
                    });
                })
            },

            // 可分配角色
            roleManager (data) {
                this.currentRoleData = data
                this.getRoleManagerValue()
                this.isLoading = false
                this.roleManagerVisible = true
            },
            // 未分配
            generateRoleManager() {
                roleService.getRoleChildrens('rootId').then((data) => {
                    let parentRole = data.data[0].roleId;
                    roleService.getRoleChildrens(parentRole).then((data) => {
                        const roleManagerData = []
                        for (let i = 0; i < data.data.length; i++) {
                            roleManagerData.push({
                                key: data.data[i].roleId,
                                label: data.data[i].name
                            })
                        }
                        this.roleManagerData = roleManagerData
                    }).catch(error => {
                        this.$message({
                            message: error.response.data.message
                                ? error.response.data.message
                                : '网络异常',
                            type: 'warning'
                        })
                    })
                }).catch(error => {
                    this.$message({
                        message: error.response.data.message
                            ? error.response.data.message
                            : '网络异常',
                        type: 'warning'
                    })
                })

            },
            // 可分配角色列表
            getRoleManagerValue () {
                console.log(this.currentRoleData.roleId);
                roleService.roleManager({roleId: this.currentRoleData.roleId})
                    .then((data) => {
                        const roleManagerValue = []
                        for (let i = 0; i < data.data.length; i++) {
                            for (let j = 0; j < this.roleManagerData.length; j++) {
                                if (data.data[i].roleId == this.roleManagerData[j].key) {
                                    roleManagerValue.push(data.data[i].roleId)
                                }
                            }
                        }
                        this.roleManagerValue = roleManagerValue
                    })
                    .catch(error => {
                        this.$message({
                            message: error.response.data.message
                                ? error.response.data.message
                                : '网络异常',
                            type: 'warning'
                        })
                    })
            },
            editRolesManager() {
                let roleId = this.currentRoleData.roleId
                let roleManagerValue = this.roleManagerValue.join()
                var params={
                        roleId:roleId,
                        assignRoleIds:roleManagerValue
                    }
                this.isLoading = true
                roleService.editRoles(params)
                    .then((data) => {
                        if (data.status === 0) {
                            this.$message({
                                message: '修改成功！',
                                type: 'success'
                            })
                        }
                        this.roleManagerVisible = false
                    })
                    .catch(error => {
                        this.$message({
                            message: error.response.data.message
                                ? error.response.data.message
                                : '网络异常',
                            type: 'warning'
                        })
                    })
            },






        }

    }
</script>
<style scoped lang="scss">

  .page-header {
    border: none;
    margin-bottom: 0;
  }
</style>
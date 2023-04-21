<template>

    <div class="umc-maincon g-box">
        <div v-show="mainVisible">

            <el-row :gutter="20">
                <el-col :span="5">
                    <el-tree :data="treeData" style="overflow-y: scroll;" ref="showTree"
                             :props="defaultProps" accordion node-key="id" :highlight-current="true"
                             :expand-on-click-node="false" :default-expanded-keys="expandedKeys"
                             @node-click="handleNodeClick" @node-expand="handleNodeExpand">
          <span class="custom-tree-node span-ellipsis" slot-scope="{ node, data }">
            <span :title="node.label">{{ node.label }}</span>
          </span>
                    </el-tree>
                </el-col>
                <el-col :span="19">
                    <div class="umc-content">
                        <div class="umc-filter clearfix">
                            <el-form :inline="true" class="demo-form-inline" size="small">
                                <el-form-item label="登录账号">
                                    <el-input placeholder="登录账号" v-model="nickId"></el-input>
                                </el-form-item>
                                <el-form-item label="姓名">
                                    <el-input placeholder="姓名" v-model="userName" @keyup.native="btKeyDown"></el-input>
                                </el-form-item>
                                <el-form-item label="手机号">
                                    <el-input placeholder="手机号" maxlength="11" v-model.number="loginPhone"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="onSubmit(nickId,userName)" icon="el-icon-search">
                                        查询
                                    </el-button>
                                    <el-button type="info" @click="onReset(nickId,userName)" icon="el-icon-refresh">重置
                                    </el-button>
                                </el-form-item>

                            </el-form>

                        </div>
                        <div class="umc-tableCom">
                            <div style="text-align: right;">
                                <el-button-group >
                                    <el-button type="primary" icon="el-icon-stopwatch" size="small"
                                               @click="gotoDelHistPage">岗位删除历史
                                    </el-button>
                                    <el-button type="primary" icon="el-icon-edit" size="small" @click="changeOrgan">组织变更
                                    </el-button>
                                    <el-button type="primary" icon="el-icon-edit" size="small" @click="addUser">新增
                                    </el-button>
                                    <!-- <el-button type="primary" icon="el-icon-share"></el-button> -->
                                    <el-button type="danger" icon="el-icon-delete" @click="batchDelete" size="small">删除
                                    </el-button>
                                </el-button-group>
                            </div>
                            <el-table :data="tableData" border ref="showTable" style="width: 100%">
                                <el-table-column type="selection" align="left" width="50"></el-table-column>
                                <el-table-column prop="userId" align="left" :show-overflow-tooltip="true"
                                                 label="登录账号"></el-table-column>
                                <el-table-column prop="loginPhone" align="left" label="手机号"/>
                                <el-table-column prop="chartName" align="left" label="岗位名称"
                                                 :show-overflow-tooltip="true"></el-table-column>
                                <el-table-column prop="nickName" align="left" :show-overflow-tooltip="true"
                                                 label="姓名"></el-table-column>
                                <el-table-column prop="userStatus" align="left" label="账号状态" width="90">
                                    <template slot-scope="scope">
                                        <el-tag :type="scope.row.userStatus == '正常' ? 'success' : 'warning'"
                                                size="medium">{{scope.row.userStatus}}
                                        </el-tag>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="chartStatus" align="left" label="岗位状态" width="90">
                                    <template slot-scope="scope">
                                        <el-tag :type="scope.row.chartStatus == '正常' ? 'success' : 'warning'"
                                                size="medium">{{scope.row.chartStatus}}
                                        </el-tag>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作" align="left" width="250">
                                    <template slot-scope="scope">
                                        <el-button-group>
                                            <el-button size="mini" type="primary" v-if="btnUrls.initPwd.permit"
                                                       @click="handleInitPasswd(scope.row.ucUid)">重置密码
                                            </el-button>
                                            <el-button size="mini" type="primary" v-if="btnUrls.update.permit"
                                                       @click="handleEdit(scope.row.userId,scope.row.ucUid,scope.row.chartId)">
                                                编辑
                                            </el-button>

                                            <el-dropdown trigger="click">
                                                <el-button size="mini" type="default">
                                                    更多<i class="el-icon-arrow-down el-icon--right"></i>
                                                </el-button>
                                                <el-dropdown-menu slot="dropdown">
                                                    <el-dropdown-item>

                                                        <el-button type="text" v-if="btnUrls.userHist.permit"
                                                                   @click="gotoHistoryPage('user', scope.row)">账号信息历史
                                                        </el-button>
                                                    </el-dropdown-item>
                                                    <el-dropdown-item>
                                                        <el-button type="text" v-if="btnUrls.personHist.permit"
                                                                   @click="gotoHistoryPage('person', scope.row)">个人信息历史
                                                        </el-button>
                                                    </el-dropdown-item>
                                                    <el-dropdown-item>
                                                        <el-button type="text" v-if="btnUrls.chartHist.permit"
                                                                   @click="gotoHistoryPage('char', scope.row)">岗位历史变更
                                                        </el-button>
                                                    </el-dropdown-item>
                                                    <el-dropdown-item>
                                                        <el-button type="text" v-if="btnUrls.lockUser.permit"
                                                                   @click="operLockUser(scope.row)">
                                                            {{scope.row.userStatus != '正常' ? '账号解锁' : '锁定账号'}}
                                                        </el-button>
                                                    </el-dropdown-item>
                                                    <el-dropdown-item>
                                                        <el-button type="text" v-if="btnUrls.lockChart.permit"
                                                                   @click="operLockChart(scope.row)">
                                                            {{scope.row.chartStatus != '正常' ? '岗位解锁' : '锁定岗位'}}
                                                        </el-button>
                                                    </el-dropdown-item>
                                                    <el-dropdown-item>
                                                        <el-button type="text" v-if="btnUrls.del.permit"
                                                                   @click="handleDelete(scope.row.chartId,scope.row.nickName)">
                                                            删除
                                                        </el-button>
                                                    </el-dropdown-item>
                                                </el-dropdown-menu>
                                            </el-dropdown>
                                        </el-button-group>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-pagination background @size-change="sizeChangeHandle"
                                           @current-change="currentChangeHandle" :current-page="pageIndex + 1"
                                           :page-sizes="[5, 10, 20, 50, 100]" :page-size="pageSize" :total="totalPage"
                                           layout="total, sizes, prev, pager, next"></el-pagination>
                        </div>
                    </div>
                    <addUser v-if="addUserVisible" ref="addUserModal" @refreshDataList="getPersonList"
                             :parentTochild="listoptions" :dicts="dicts"></addUser>
                    <editUser v-if="editUserVisible" ref="editUserModal" @refreshDataList="getPersonList"
                              :dicts="dicts"></editUser>
                </el-col>
            </el-row>
        </div>
        <div v-if="histVisible">
            <user-manage-history @backToMainList="backToMainList" ref="history"></user-manage-history>
        </div>
        <div v-if="delHistVisible">
            <user-char-del-history @backToMainList="backToMainList" ref="delHistory"></user-char-del-history>
        </div>
        <!-- <user-changeorgan v-if="changeOrganVisible" ref="userChangeorgan"
                          @changeSeach="changeSeach()"></user-changeorgan> -->
    </div>
</template>
<script>
    // import userManageHistory from './user-manage-history'
    import addUser from './add-user'
    import editUser from './edit-user'
    // import userChangeorgan from './user-changeorgan'
    import userCharDelHistory from './user-char-del-history'
    import userService from '../../../../api/user/userService'
	import characterService from "../../../../api/system/characterService";
	import struService from "../../../../api/stru/struService";
	import roleService from "../../../../api/user/role-manage";
	import authenService from "../../../../api/system/authen";

    const urls = {
        struByUserchartId: 'stru/getStruByUserchartId'
    }

    // 设置树上每层的每页展示的数量
    // 设定-1为全部展示
    const nodePage = {
        page: 0,
        pageSize: -1
    }

    const btnUrls = {
        unLockUser: {
            url:"users/unLockUser",method:"post",permit:false
        },
        lockUser:{
            url:"users/lockUser",method:"post",permit:false
        },
        unLockChart:{
            url:"character/unLockChart",method:"post",permit:false
        },
        lockChart:{
            url:"character/lockChart",method:"post",permit:false
        },
        personHist:{
            url:"history/person",method:"post",permit:false
        },
        userHist:{
            url:"history/users",method:"post",permit:false
        },
        chartHist:{
            url:"history/character",method:"post",permit:false
        },
        update:{
            url:"users/update",method:"post",permit:false
        },
        add:{
            url:"uumUser/addUser",method:"post",permit:false
        },
        changeOrgan:{
            url:"/character/updateOrg",method:"post",permit:false
        },
        del:{
            url:"character/delete",method:"post",permit:false
        },
        query:{
            url:"character/userchart/list",method:"get",permit:false
        },
        initPwd:{
            url:"users/initpasswd",method:"post",permit:false
        }
    };
    export default {
        data() {
            return {
                mainVisible: true,
                histVisible: false,
                delHistVisible: false,
                changeOrganVisible: false,
                // 权限相关
                btnUrls: {
                    ...btnUrls
                },
                btnAuths: {
                    [btnUrls.initPwd]: false,
                    [btnUrls.query]: false,
                    [btnUrls.del]: false,
                    [btnUrls.add]: false,
                    [btnUrls.changeOrgan]: false,
                    [btnUrls.update]: false,
                    [btnUrls.chartHist]: false,
                    [btnUrls.userHist]: false,
                    [btnUrls.personHist]: false
                },
                // 组织树
                // 组织树默认展开节点
                expandedKeys: [],
                treeRootParam: {
                    struId: '',
                    struType: '',
                    organCode: '',
                    organName: '',
                    organId: ''
                },
                treeData: [],
                subset: [],
                listoptions: {},
                defaultProps: {
                    children: 'children',
                    label: 'label',
                    isLeaf: 'leaf',
                    title: 'label'
                },
                // 查询条件 手机号查询
                loginPhone: '',
                // 人员列表
                tableData: [],
                firstNode: {
                    struId: ''
                },
                // 分页信息
                pageIndex: 0,
                pageSize: 10,
                totalPage: 0,
                // 新增人员弹框
                addUserVisible: false,
                // 修改资料弹框
                editUserVisible: false,
                nickId: '',
                userName: '',
				/** 字典相关的变量 start */
				dicts: {
					dictList: {
						'IDCARD_TYPE':[],
                        'GenderCode':[]
					},
					needDicts: ['IDCARD_TYPE','GenderCode'],
				}
				/** 字典相关的变量 end */
            }
        },

        components: {
            addUser,
            editUser,
            // userManageHistory,
            // userChangeorgan,
            userCharDelHistory
        },
        computed: {
            struId: {
                get() {
                    return this.$store.state.common.struId
                    /*return 'S00000000000000001'*/
                },
                set(val) {
                    this.$store.commit('common/updateStruId', val)
                }
            },
            selectOrganName: {
                get() {
                    return this.$store.state.common.selectOrganName
                },
                set(val) {
                    this.$store.commit('common/updateSelectOrganName', val)
                }
            },
            selectOrganId: {
                get() {
                    return this.$store.state.common.selectOrganId
                },
                set(val) {
                    this.$store.commit('common/updateSelectOrganId', val)
                }
            },
            loginOrganId: {
                get() {
                    return this.$store.state.common.loginOrganId
                },
                set(val) {
                    this.$store.commit('common/updateLoginOrganId', val)
                }
            },
            editUserId: {
                get() {
                    return this.$store.state.common.editUserId
                },
                set(val) {
                    this.$store.commit('common/updateEditUserId', val)
                }
            },
            userUcUid: {
                get() {
                    return this.$store.state.common.userUcUid
                },
                set(val) {
                    this.$store.commit('common/updateUserUcUid', val)
                }
            },
            userChartId: {
                get() {
                    return this.$store.state.common.userChartId
                },
                set(val) {
                    this.$store.commit('common/updateUserChartId', val)
                }
            }
        },
        created() {
            this.initTreeNode()
            this.info()
            this.getBtnAuth()
            this.getDictListItem()
        },
        methods: {
            // 只能输入汉字、英文、数字
            btKeyDown() {
                this.userName = this.userName.replace(/[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g, "");
            },
            changeSeach() {
                this.onSubmit(this.nickId, this.userName)
            },
            // 获取按钮权限信息
            getBtnAuth() {
                for (const key in btnUrls) {
                    if (btnUrls.hasOwnProperty(key)) {
                        const element = btnUrls[key]
                        this.$permitBtnAuth(element, this.btnAuths)
                    }
                }
            },
            info() {
				roleService.getRoleTree({roleId: 'public'}).then(res => {
                        if (res.status === 0) {
                            let str = []
                            let list = res.data
                            this.listoptions = list
                        } else {
                            this.$message({
                                message: '查询出错，请稍后再试',
                                type: 'warning'
                            })
                        }
                    })
                    .catch(error => {

                    })
            },
            onReset(id, name) {
                this.nickId = ''
                this.userName = ''
                this.loginPhone = ''
                this.getPersonList()
            },
            // 树点击后事件
            handleNodeClick(data) {
                this.getChildNode(data)
                this.getPersonList(data)
            },
            handleNodeExpand(data) {
                this.getChildNode(data)
            },
            // 获取根节点
            initTreeNode() {

                // this.$http({
                //     url: this.$http.adornUrl('authen/loginfo/full'),
                //     method: 'get'
                // })

                authenService.getTreeNode().then(res => {
                        let list = res.data
                        this.selectOrganName = res.data.organName
                        this.selectOrganId = res.data.corpId
                        this.loginOrganId = res.data.corpId
                        let str = {}
                        str.id = list.corpId
                        str.struId = ''
                        str.label = list.organName
                        str.organName = list.organName
                        str.children = [{}]
                        this.treeData.push(str)
                        // 默认展开根节点
                        this.expandedKeys.push(str.id)
                        // 请求struId
                        // this.$http({
                        //     url: this.$http.adornUrl('stru/getStru'),
                        //     method: 'get',
                        //     params: this.$http.adornParams({
                        //             organId: str.id
                        //         },
                        //         false
                        //     )
                        // })

                        struService.getStru({organId: str.id}).then(res => {
                            this.treeRootParam.struId = res.data.struId
                            this.treeRootParam.struType = res.data.struType
                            this.treeRootParam.organCode = res.data.organCode
                            this.treeRootParam.organName = res.data.organName
                            this.treeRootParam.organId = res.data.organId
                            //
                            let list = res.data.struId
                            str.struId = list
                            // this.firstNode.struId=list;
                            this.struId = list
                            this.treeData.push(str)
                            // 获取第一级的人员列表信息
                            this.getPersonList(str)
                            // 初始化查询树的下级 默认显示用
                            this.getChildNode(str)
                            })
                            .catch(error => {

                            })
                    })
                    .catch(error => {

                    })
            },
            // 获取子节点
            getChildNode(data) {
                // 存 store  新增人员时用到
                this.struId = data.struId;
                this.selectOrganName = data.organName;
                this.selectOrganId = data.id;
               /* this.$http({
                    url: this.$http.adornUrl('stru/children'),
                    method: 'get',
                    params: this.$http.adornParams({
                            organId: data.id,
                            struType: this.treeRootParam.struType,
                            page: nodePage.page,
                            pageSize: nodePage.pageSize
                        },
                        false
                    )
                })*/
				struService.query({
					organId: data.id,
					struType: this.treeRootParam.struType,
					page: nodePage.page,
					pageSize: nodePage.pageSize
				}).then(res => {
                        data.children = []
                        let list = res.data.rows
                        for (let i = 0; i < list.length; i++) {
                            let item = this.fillData(list[i])
                            data.children.push(item)
                        }
                    })
                    .catch(error => {

                    })
            },
            //  获取人员列表
            loadNode(node, resolve) {
                if (node.level === 0) {
                    return resolve([{
                        name: this.treeRootParam.organName
                    }])
                }
                if (node.level > 1) {
                    return resolve([])
                }
                setTimeout(() => {
                   /* this.$http({
                        url: this.$http.adornUrl('stru/children'),
                        method: 'get',
                        params: this.$http.adornParams({
                                organId: this.treeRootParam.organId,
                                struType: this.treeRootParam.struType,
                                page: nodePage.page,
                                pageSize: nodePage.pageSize
                            },
                            false
                        )
                    })*/

                   struService.query({
					   organId: this.treeRootParam.organId,
					   struType: this.treeRootParam.struType,
					   page: nodePage.page,
					   pageSize: nodePage.pageSize
                   }).then(res => {
                            const data = []
                            let list = res.data.data.rows
                            for (let i = 0; i < list.length; i++) {
                                let name = {}
                                name.name = list[i].organName
                                name.organId = list[i].organId
                                data.push(name)
                                resolve(data)
                            }
                    }).catch(error => {

                        })
                }, 500)
            },

            getPersonList(data) {
                if (data) {
                    this.firstNode.struId = data.struId
                }
                let queryParam = {
                    struId: this.struId,
                    page: this.pageIndex,
                    pageSize: this.pageSize
                }
                if (this.nickId) {
                    queryParam.userId = this.nickId
                }
                if (this.userName) {
                    queryParam.nickName = this.userName
                }
                if (this.loginPhone) {
                    queryParam.loginPhone = this.loginPhone
                }

				characterService.query(queryParam)

                        .then(res => {
                        this.tableData = []
                        let list = res.data.rows
                        this.totalPage = res.data.totalCount
                        if (!list || !list.length) {
                            this.tableData = list
                        }
                        for (let i = 0; i < list.length; i++) {
                            let str = []
                            str.ucUid = list[i].ucUid
                            str.userId = list[i].userId
                            str.chartId = list[i].chartId
                            str.chartName = list[i].chartName
                            str.nickName = list[i].nickName
                            str.loginPhone = list[i].loginPhone
                            if (list[i].userStatus == '11') {
                                list[i].userStatus = '正常'
                            } else if (list[i].userStatus == '10') {
                                list[i].userStatus = '停用'
                            } else if (list[i].userStatus == '00') {
                                list[i].userStatus = '临时停用'
                            }
                            if (list[i].chartStatus == '11') {
                                list[i].chartStatus = '正常'
                            } else if (list[i].chartStatus == '10') {
                                list[i].chartStatus = '停用'
                            } else if (list[i].chartStatus == '00') {
                                list[i].chartStatus = '临时停用'
                            }
                            str.userStatus = list[i].userStatus
                            str.chartStatus = list[i].chartStatus
                            this.tableData.push(str)
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        this.$message({
                            message: error.response.data.message ?
                                error.response.data.message :
                                '网络异常',
                            type: 'warning'
                        })
                    })
            },
            // 查询按钮点击事件
            onSubmit(id, name) {
                this.pageIndex = 0
                let queryParam = {
                    struId: this.struId,
                    // 点击查询按钮，应显示第一页数据，不应使用全局变量
                    // this.pageIndex ,这个值会随当前页而变化。
                    page: this.pageIndex,
                    pageSize: this.pageSize
                }
                if (this.nickId) {
                    queryParam.userId = this.nickId
                }
                if (this.userName) {
                    queryParam.nickName = this.userName
                }
                if (this.loginPhone) {
                    queryParam.loginPhone = this.loginPhone
                }

                // this.$http({
                //     url: this.$http.adornUrl('character/userchart/list'),
                //     method: 'get',
                //     params: this.$http.adornParams(queryParam, false)
                // })


				characterService.query(queryParam)

                    .then(res => {
                        this.tableData = []
                        let list = res.data.rows
                        this.totalPage = res.data.totalCount
                        if (!list || !list.length) {
                            this.tableData = list
                        }
                        // console.audit(list)
                        for (let i = 0; i < list.length; i++) {
                            let str = []
                            str.chartName = list[i].chartName
                            str.ucUid = list[i].ucUid
                            str.userId = list[i].userId
                            str.chartId = list[i].chartId
                            str.nickName = list[i].nickName
                            str.loginPhone = list[i].loginPhone
                            if (list[i].userStatus == '11') {
                                list[i].userStatus = '正常'
                            } else if (list[i].userStatus == '10') {
                                list[i].userStatus = '停用'
                            } else if (list[i].userStatus == '00') {
                                list[i].userStatus = '临时停用'
                            }

                            if (list[i].chartStatus == '11') {
                                list[i].chartStatus = '正常'
                            } else if (list[i].chartStatus == '10') {
                                list[i].chartStatus = '停用'
                            } else if (list[i].chartStatus == '00') {
                                list[i].chartStatus = '临时停用'
                            }
                            str.userStatus = list[i].userStatus
                            str.chartStatus = list[i].chartStatus
                            this.tableData.push(str)
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        this.$message({
                            message: error.response.data.message ?
                                error.response.data.message :
                                '网络异常',
                            type: 'warning'
                        })
                    })
                this.tableData.length = 0
            },

            handleInitPasswd(ucUid) {
                this.$confirm('重置密码将以短信的方式通知用户，确认重置密码?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
					userService.resetPwd({ ucUid: ucUid}) .then((data) => {
                            if (data.status === 0) {
                                this.$message({
                                    message: '重置成功，请注意查收短信',
                                    type: 'success'
                                })
                                this.getPersonList()
                                return
                            }
                            this.$message({
                                message: '重置失败',
                                type: 'warning'
                            })
                        })
                        .catch(error => {
                            console.log(error)
                            this.$message({
                                message: error.response.data.message ?
                                    error.response.data.message :
                                    '重置密码失败',
                                type: 'warning'
                            })
                        })
                })
            },
            // 编辑表格
            handleEdit(userId, ucUid, chartId) {
                this.editUserVisible = true
                this.editUserId = userId
                this.userUcUid = ucUid
                this.userChartId = chartId
                this.$nextTick(() => {
                    this.$refs.editUserModal.init('修改资料', ucUid, chartId)
                })
            },
            // 根据复选框 批量删除
            batchDelete() {
                if (this.$refs.showTable.selection.length < 1) {
                    this.$message({
                        message: '请选择要删除的数据',
                        type: 'warning'
                    })
                    return
                }
                this.$confirm('确认删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let chartIds = this.$refs.showTable.selection
                        .map(item => item.chartId)
                        .join()
                    characterService.delete({chartId: chartIds})

                            .then(({
                                   data
                               }) => {
                            if (data.status === 0) {
                                this.$message({
                                    message: '删除成功',
                                    type: 'success'
                                })
                                this.getPersonList()
                                return
                            } else {
                                this.$message({
                                    message: data.msg,
                                    type: 'warning'
                                })
                            }
                        })
                        .catch(error => {
                            console.log(error)
                            this.$message({
                                message: error.response.data.message ?
                                    error.response.data.message :
                                    '网络异常',
                                type: 'warning'
                            })
                        })
                })
            },
            // 岗位的组织变更
            changeOrgan() {
                if (this.$refs.showTable.selection.length < 1) {
                    this.$message({
                        message: '请选择要变更组织的数据',
                        type: 'warning'
                    })
                    return
                }
                let chartIds = this.$refs.showTable.selection
                this.changeOrganVisible = true
                this.$nextTick(() => {
                    this.$refs.userChangeorgan.init(chartIds)
                })
                // 打开组织选择页面
            },
            // 删除表格
            handleDelete(id, nickName) {
                this.$confirm(`确定要删除` + nickName + `吗`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                        characterService.delete({chartId: id}).then(res => {
                            if (res.data && res.status === 0) {
                                this.$message({
                                    message: '删除成功',
                                    type: 'success',
                                    duration: 1500
                                })
                                this.getPersonList()
                            } else {
                                this.$message.warning(res.msg)
                            }
                        })
                        .catch(error => {
                            console.log(error)
                            this.$message({
                                message: error.response.data.message ?
                                    error.response.data.message :
                                    '网络异常',
                                type: 'warning'
                            })
                        })
                })
            },
            // 每页数
            sizeChangeHandle(pageSize) {
                this.pageIndex = 0
                this.pageSize = pageSize
                this.getPersonList(this.data)
            },
            // 当前页
            currentChangeHandle(currentPage) {
                this.pageIndex = currentPage - 1
                this.getPersonList()
            },
            // 格式化子节点
            fillData(data) {
                let str = {}
                str.id = data.organId
                str.organCode = data.organCode
                str.struId = data.struId
                str.label = data.organName
                str.organName = data.organName
                str.organShort = data.organShort
                str.children = [{}]
                return str
            },
            // 获取字典项
            getDictListItem() {
                this.$findDicts(this.dicts.needDicts,this.dicts.dictList);
            },
            addUser() {
                if (!this.$refs.showTree.getCurrentKey()) {
                    this.$message({
                        message: '请先选中组织树上节点',
                        type: 'warning'
                    })
                    return
                }
                let node = this.$refs.showTree.getCurrentNode()
                let organName = node.organName
                let organId = node.id
                // 先选中组织树上一个节点才能新增用户
                this.addUserVisible = true
                this.$nextTick(() => {
                    this.$refs.addUserModal.init('新增用户授权', organId, organName)
                })
            },
            /** 历史变更相关的代码 start */
            backToMainList() {
                this.mainVisible = true
                this.histVisible = false
                this.delHistVisible = false
            },
            gotoDelHistPage() {
                if (!this.$refs.showTree.getCurrentKey()) {
                    this.$message({
                        message: '请先选中组织树上节点',
                        type: 'warning'
                    })
                    return
                }
                let node = this.$refs.showTree.getCurrentNode()
                this.histVisible = false
                this.mainVisible = false
                this.delHistVisible = true
                this.$nextTick(() => {
                    this.$refs.delHistory.init(node)
                })
            },
            gotoHistoryPage(histType, row) {
                this.histVisible = true
                this.mainVisible = false
                this.delHistVisible = false
                this.$nextTick(() => {
                    this.$refs.history.init(histType, row)
                })
            },
            /** 历史变更相关的代码 start */

            /** 锁定账号和锁定岗位 start */
            operLockUser(row) {
                var lock = row.userStatus != '正常' ? false : true;
				userService.lockUser({ucUid: row.ucUid}, lock).then(res => {
                        if (res.status === 0 && res.data > 0) {
                            this.$message({
                                message: '操作成功',
                                type: 'success',
                                onClose: () => {
                                    this.changeSeach()
                                }
                            })
                        } else {
                            this.$message({
                                message: '操作失败',
                                type: 'warning'
                            })
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        this.$message({
                            message: error.response.data.message ?
                                error.response.data.message :
                                '网络异常',
                            type: 'warning'
                        })
                    })
            },
            operLockChart(row) {
                let lock = row.chartStatus != '正常' ? false : true;
                   characterService.lockChart({chartId: row.chartId},lock) .then(res => {
                        if (res.status === 0 && res.data > 0) {
                            this.$message({
                                message: '操作成功',
                                type: 'success',
                                onClose: () => {
                                    this.changeSeach()
                                }
                            })
                        } else {
                            this.$message({
                                message: '操作失败',
                                type: 'warning'
                            })
                        }
                    })
                    .catch(error => {

                    })
            }
            /** 锁定账号和锁定岗位 end */
        }
    }
</script>

<template>
  <div class="user-task">
    <div v-if="!detailVisible">
      <div class="page-header">
        <h3>超期账户</h3>
      </div>
      <div class="batch-content">
        <div class="umc-filter clearfix">
          <el-form :inline="true"
                   class="demo-form-inline"
                   size="small"
                   style="width: 100%;"
                   v-if="searchVisible">
            <el-form-item label="登录账号">
              <el-input placeholder="登录账号"
                        v-model="pageParam.userId"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input placeholder="姓名"
                        v-model="pageParam.userName" @keyup.native="btKeyDown"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input placeholder="手机号"
                        maxlength="11"
                        v-model.number="pageParam.loginPhone"></el-input>
            </el-form-item>
            <el-form-item label="身份证号">
              <el-input placeholder="手机号"
                        maxlength="11"
                        v-model.number="pageParam.certNum"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"
                         @click="queryListByCriteria"
                         icon="el-icon-search">查询
              </el-button>
              <el-button type="info"
                         @click="resetQuery"
                         icon="el-icon-refresh">重置
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="search-tableCom"
           v-if="searchVisible">
        <el-table :data="tableData"
                  stripe
                  style="width: 100%"
                  border>
          <el-table-column type="index"
                           :index="getStartPageNo"
                           :show-overflow-tooltip="true"
                           align="left"
                           label="序号"
                           width="60">
          </el-table-column>
          <el-table-column prop="userId"
                           width="auto"
                           header-align="left"
                           align="left"
                           label="登录账号"
                           :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="loginPhone"
                           header-align="left"
                           align="left"
                           width="auto"
                           label="手机号"
                           :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="nickName"
                           width="auto"
                           align="left"
                           label="姓名"
                           :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="loginEmail"
                           width="auto"
                           align="left"
                           label="身份证号"
                           :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="pwdExpirTime"
                           width="auto"
                           label="到期时间"
                           :show-overflow-tooltip="true"
                           :formatter="ctimeConvert"
                           align="left"></el-table-column>
          <el-table-column label="操作"
                           align="left"
          >
            <template slot-scope="scope">
              <el-button-group>
                <el-button type="text"
                           @click="updatePwdExpirTime(scope.row)"
                           size="mini">解除超期
                </el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination background
                       layout="total, sizes, prev, pager, next"
                       :total="pageTotal"
                       :page-size="pageParam.pageSize"
                       :page-sizes="[5, 10, 20, 50,100]"
                       :current-page="pageParam.page + 1"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"></el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
    import {formatTime} from '@/utils'
    import userOtherService from "../../../../api/system/system";
/*
    const btnUrls = {
        query: 'uumUser/query',
        updatePwdExpirTimeByUserId: 'uumUser/updatePwdExpirTimeByUserId'

    }*/
    export default {
        data() {
            return {
                detailVisible: false,
                // 查询头部是否展示
                searchVisible: true,
                // 编辑头部是否展示
                editVisible: false,

                // 分页信息
                pageIndex: 1,
                pageSize: 10,
                totalPage: 0,
                tableData: [],
                pageTotal: 0,
                pageParam: {         // 表格参数

                    page: 0,
                    pageSize: 10,
                    userId: '',
                    userName: '',
                    loginPhone: '',
                    certNum: ''

                },
                myhead: {
                    'Accept': 'application/json',
                    // 'Content-type':'multipart/form-data',
                    'X-CSRF-TOKEN': sessionStorage.getItem('token')
                }
            }
        },
        components: {
        },
        created() {
            this.getUserList()
        },
        watch: {
        },
        methods: {
            // 只能输入汉字、英文、数字
            btKeyDown() {
                this.pageParam.nickName = this.pageParam.nickName.replace(/[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g, "");
            },
            init(from) {
                this.getUserList()
            },
            // 每页条数切换查询方法
            handleSizeChange(pageSize) {
                this.pageParam.page = 0
                this.pageParam.pageSize = pageSize
                this.getUserList()
            },
            // 页码切换方法
            handleCurrentChange(currentPage) {
                this.pageParam.page = currentPage - 1
                this.getUserList()
            },
            // 列表数据加载
            getUserList() {
               /* this.$http({
                    url: this.$http.adornUrl(btnUrls.query),
                    method: 'post',
                    data: this.pageParam
                }).*/
                userOtherService.queryUumUser(this.pageParam).then(({data}) => {
                    if (data.status === 0) {
                        this.tableData = data.data.rows
                        this.pageTotal = data.data.totalCount
                    } else {
                        this.$message.warning(data.msg ? data.msg : '网络异常')
                    }
                }).catch(error => {
                    this.$message({
                        message: error.response.data.message ? error.response.data.message : '网络异常',
                        type: 'warning'
                    })
                })
            },
            // 查询按钮点击方法
            queryListByCriteria() {
                this.pageParam.page = 0
                this.getUserList()
            },
            // 重置按钮
            resetQuery() {

                this.pageParam.page = 0
                this.pageParam.userId = ''
                this.pageParam.userName = ''
                this.pageParam.loginPhone = ''
                this.pageParam.certNum = ''


                this.getUserList()
            },
            // 详情页面返回主页面方法
            backToMain() {
                this.detailVisible = false
            },
            // 表格数据处理的相关函数 end
            // 数据查询先关代码 end
            // table格式化
            ctimeConvert(row, column) {
                return formatTime(new Date(row.pwdExpirTime * 1000))
            },
            /** 表格上的操作 start */
            updatePwdExpirTime(row) {

                /*this.$http({
                    url: this.$http.adornUrl(btnUrls.updatePwdExpirTimeByUserId),
                    method: 'post',
                    data: this.$http.adornData(
                        {
                            userId: row.userId
                        },
                        false,
                        'notJson'
                    ),
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })*/
                  userOtherService.updatePwdExpirTimeByUserId({ userId: row.userId})  .then(res => {
                      if (res.status === 200 && res.data.data > 0) {
                          this.$message({
                              message: '操作成功',
                              type: 'success',
                              onClose: () => {
                                  this.getUserList()
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
        },
        computed: {
            // 序号自动生成
            getStartPageNo() {
                return this.pageParam.page * this.pageParam.pageSize + 1
            }
        }
    }
</script>

<style lang="scss" scoped>
  .el-button-group {
    float: left;
  }

  .upload-demo {
    margin-right: 20px;
  }

  .el-button-group > .el-button:last-child {
    border-radius: 5px;
  }

</style>

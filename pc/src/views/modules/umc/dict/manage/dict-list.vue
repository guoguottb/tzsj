<template>
  <div>
    <div class="dict"
         v-if="!itemParam.show && !histShow">
      <!--<div class="page-header">-->
        <!--<h3>字典管理{{histShow ? '-历史变更': ''}}</h3>-->
      <!--</div>-->
      <div class="umc-filter clearfix">
        <el-form :inline="true"
                 class="demo-form-inline"
                 size="small">
          <el-form-item label="字典编码">
            <el-input placeholder="请输字典编码"
                      maxlength="32"
                      v-model="pageParam.dictCode"></el-input>
          </el-form-item>
          <el-form-item label="字典名称">
            <el-input placeholder="请输字典名称"
                      maxlength="60"
                      v-model="pageParam.dictName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="queryListByCriteria"
                       icon="el-icon-search">查询</el-button>
            <el-button type="info"
                       @click="resetQuery"
                       icon="el-icon-refresh">重置</el-button>
          </el-form-item>
        </el-form>
        <el-button-group>
          <el-button type="primary"
                     icon="el-icon-edit"
                     size="small"
                     v-if="btnUrls.save.permit"
                     @click="addOrUpdateHandle">新增</el-button>
          <el-button type="danger"
                     icon="el-icon-delete"
                     size="small"
                     v-if="btnUrls.delete.permit"
                     @click="deleteDict()">删除</el-button>
        </el-button-group>
      </div>
      <el-table :data="tableData"
                stripe
                border
                ref="showTable"
                @row-click="clickRow"
                style="width: 100%">
        <el-table-column type="selection"
                         width="40"></el-table-column>
        <el-table-column prop="dictCode"
                         label="字典编码"
                         :show-overflow-tooltip="true"
                         align="left"
                         width="auto"></el-table-column>
        <el-table-column prop="dictName"
                         label="字典名称"
                         :show-overflow-tooltip="true"
                         align="left"
                         width="auto"></el-table-column>
        <el-table-column prop="note"
                         label="描述"
                         :show-overflow-tooltip="true"
                         align="left"
                         width="auto"></el-table-column>
        <el-table-column prop="setManName"
                         label="最近修改人"
                         align="left"
                         width="auto"></el-table-column>
        <el-table-column label="操作"
                         align="left"
                         width="180">
          <template slot-scope="scope">
            <el-button-group>
              <el-button type="primary"
                         v-if="btnUrls.update.permit"
                         @click="addOrUpdateHandle(scope.row)"
                         size="mini">编辑</el-button>
              <el-dropdown trigger="click">
                <el-button size="mini" type="default">
                  更多<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <el-button type="warning"
                               @click="gotoDictItem(scope.row)"
                               size="mini">字典项</el-button>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-button type="danger"
                               v-if="btnUrls.delete.permit"
                               @click="deleteDict(scope.row)"
                               size="mini">删除</el-button>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-button type="danger"
                               v-if="btnUrls.hist.permit"
                               @click="gotoHistory(scope.row)"
                               size="mini">查看历史</el-button>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>




            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background
                     layout="total, sizes, prev, pager, next"
                     :total="pageTotal"
                     :current-page="pageParam.page+1"
                     :page-size="pageParam.curPageSize"
                     :page-sizes="[5, 10, 20, 50,100]"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"></el-pagination>
      <dict-dialog v-if="addOrUpdateVisible"
                   ref="addOrUpdate"
                   @refreshDataList="getDictList"></dict-dialog>
    </div>
    <div class="hist"
         v-if="histShow">
      <dict-history @backListPage="backListPage"
                    ref="history"></dict-history>
    </div>
    <div class="dictItem"
         v-if="itemParam.show && !histShow">
      <dict-item ref="dictItem"></dict-item>
    </div>
  </div>
</template>

<script>
import dictDialog from './add-edit-dict'
import dictItem from './dict-item-list'
import dictHistory from './dict-history'
import dictSendService from "../../../../../api/dict/dict-send";
import ElTablePagination from "../../../../../components/table-pagination";
const btnUrls = {
    query: {
        url:"dict/listPageDicts",method:"get",permit:false
    },
    save: {
        url:"dict/saveDict",method:"post",permit:false
    },
    update:{
        url:"dict/updateDict",method:"post",permit:false
    },
    delete:{
        url:"dict/batchDelDict",method:"post",permit:false
    },
    isExistDict:{
        url:"dict/isExistDict",method:"post",permit:false
    },
    hist:{
        url:"dict/listDictHistory",method:"post",permit:false
    }
};
export default {
  data () {
    return {
      btnUrls: { ...btnUrls },
      btnAuth: {},
      histShow: false,
      itemParam: {
        show: false
      },
      tableData: [],
      queryData: '',
      pageTotal: 0,
      curPage: 0,
      curPageSize: 5,
      addOrUpdateVisible: false,
      pageParam: {
        dictCode: '',
        dictName: '',
        setMan: '',
        setTime: 0,
        note: '',
        inUse: '',
        page: 0,
        pageSize: 10,
        needTotal: true,
        sortFiled: 'setTime',
        sortAsc: ''
      }
    }
  },
  components: {
      ElTablePagination,
    dictDialog,
    dictItem,
    dictHistory
  },
  computed: {

  },
  created () {
    this.getDictList()
    this.getBtnAuth()
  },
  mounted () {

  },
  methods: {
    // 获取按钮权限信息
    getBtnAuth () {
      for (const key in this.btnUrls) {
        if (this.btnUrls.hasOwnProperty(key)) {
          const element = this.btnUrls[key]
          // 公共方法 传入 (uri,存放授权信息的对象)
          this.$permitBtnAuth(element, this.btnAuth)
        }
      }
    },
    // 跳转到字典项 列表页
    gotoDictItem (row) {
      this.itemParam.dictCode = row.dictCode
      this.itemParam.show = true
      this.itemParam.dictName = row.dictName
      this.$nextTick(() => {
        this.$refs.dictItem.init(this.itemParam)
      })
    },
    // table 相关的函数
    clickRow (row) {
      this.$refs.showTable.toggleRowSelection(row)
    },
    deleteDict (param) {
      if (!param && this.$refs.showTable.selection.length < 1) {
        this.$message({ message: '请选择要删除的数据', type: 'warning' })
        return
      }
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let codes = param ? param.dictCode
          : this.$refs.showTable.selection.map(item => item.dictCode).join()
         dictSendService.deleteDicts({ 'dictCodeList': codes}).then((data) => {
            if (data.status === 0) {
              this.$message({ message: '删除成功', type: 'success' })
              this.getDictList()
            } else {
              this.$message.warning(data.msg ? data.msg : '网络异常')
            }
          })
          .catch(error => {

          })
      })
    },
    // 新增 / 修改
    addOrUpdateHandle (row) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(row)
      })
    },
    handleSizeChange (pageSize) {
      this.pageParam.page = 0
      this.pageParam.pageSize = pageSize
      this.getDictList()
    },
    handleCurrentChange (currentPage) {
      this.pageParam.page = currentPage - 1
      this.getDictList()
    },
    resetQuery () {
      this.pageParam = {
        dictCode: '',
        dictName: '',
        setMan: '',
        setTime: 0,
        note: '',
        inUse: '',
        page: 0,
        pageSize: 10,
        needTotal: true,
        sortFiled: 'setTime',
        sortAsc: ''
      }
      this.getDictList()
    },
    getDictList () {
      dictSendService.getDictsList(this.pageParam).then((data) => {
        if (data.status === 0) {
          this.tableData = data.data.rows
          this.pageTotal = data.data.totalCount
        } else {
          this.$message.warning(data.msg ? data.msg : '网络异常')
        }
      }).catch(error => {

      })
    },
    queryListByCriteria () {
      this.pageParam.page = 0
      this.getDictList()
    },
    /** 历史变更相关的 start */
    gotoHistory (row) {
      this.histShow = true
      this.$nextTick(() => {
        this.$refs.history.init(row)
      })
    },
    backListPage () {
      this.histShow = false
    }
    /** 历史变更相关的 end */
  }
}
</script>
<style lang='scss' scoped>
.el-input--medium .el-input__inner {
  width: 250px;
}
</style>

<template>
  <div>
    <div class="page-header">
      <h3>字典管理 - 字典项 - {{dictName}} {{histVisible ? '-历史变更': ''}}</h3>
    </div>
    <div v-if="!histVisible">
      <div>
        <el-button-group style="float:right;margin-bottom:10px;">
          <el-button type="primary"
                     icon="el-icon-edit"
                     size="small"
                     v-if="btnUrls.save.permit"
                     @click="addOrUpdateHandle">新增</el-button>
          <el-button type="danger"
                     icon="el-icon-delete"
                     size="small"
                     v-if="btnUrls.delete.permit"
                     @click="deleteDictItem()">删除</el-button>
          <el-button type="infor"
                     icon="el-icon-back"
                     size="small"
                     @click="backToDict">返回</el-button>
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
        <el-table-column prop="itemCode"
                         label="编号"
                         align="left"
                         width="auto"></el-table-column>
        <el-table-column prop="itemValue"
                         label="名称"
                         align="left"
                         width="auto"></el-table-column>
        <el-table-column prop="sortNum"
                         label="序号"
                         align="left"
                         width="auto"></el-table-column>
        <el-table-column prop="note"
                         label="描述"
                         align="left"
                         width="auto"></el-table-column>
        <el-table-column label="操作"
                         align="left"
                         width="220">
          <template slot-scope="scope">
            <el-button-group>
              <el-button type="primary"
                         v-if="btnUrls.update.permit"
                         @click="addOrUpdateHandle(scope.row)"
                         size="small">编辑</el-button>
              <el-button type="danger"
                         v-if="btnUrls.delete.permit"
                         @click="deleteDictItem(scope.row)"
                         size="small">删除</el-button>
              <el-button type=""
                         v-if="btnUrls.hist.permit"
                         @click="gotoHistory(scope.row)"
                         size="small">历史变更</el-button>
            </el-button-group>

          </template>
        </el-table-column>
      </el-table>
      <el-pagination background
                     layout="total, sizes, prev, pager, next"
                     :total="pageTotal"
                     :page-sizes="[5, 10, 20, 50,100]"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"></el-pagination>
      <dict-item-dialog v-if="showItemDialog"
                        ref="addOrUpdate"
                        @refreshDataList="getDictListItem"></dict-item-dialog>
    </div>
    <div v-if="histVisible">
      <dict-item-history ref="hist"
                         @backListPage="backListPage"></dict-item-history>
    </div>
  </div>
</template>
<script>
import dictItemHistory from './dict-item-history'
import dictItemDialog from './add-edit-dict-item'
import dictSendService from "../../../../../api/dict/dict-send";
// TODO
const btnUrls = {
    query: {
        url:"dict/listPageDictItems",method:"get",permit:false
    },
    save: {
        url:"dict/saveDictItem",method:"post",permit:false
    },
    update:{
        url:"dict/updateDictItem",method:"post",permit:false
    },
    delete:{
        url:"dict/batchDelDictItem",method:"post",permit:false
    },
    hist:{
        url:"dict/listItemHistory",method:"post",permit:false
    }
};
export default {
  data () {
    return {
      histVisible: false,
      btnUrls: { ...btnUrls },
      btnAuth: {},
      dictCode: '',
      tableData: [],
      queryData: '',
      dictName: '',
      pageTotal: 0,
      showItemDialog: false,
      pageParam: {
        'dictCode': '',
        'itemCode': '',
        'itemValue': '',
        'sortNum': 0,
        'parentCode': '',
        'note': '',
        'inUse': '',
        'page': 0,
        'pageSize': 10,
        'needTotal': true,
        'sortFiled': '',
        'sortAsc': ''
      }
    }
  },
  components: {
    dictItemDialog,
    dictItemHistory
  },
  computed: {},
  created () {
      this.getBtnAuth();
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
    backToParent () {

    },
    backToDict () {
      this.$parent.itemParam.show = false
      this.$parent.addOrUpdateVisible = false
    },
    init (param) {
      this.getBtnAuth()
      this.dictCode = param.dictCode
      this.dictName = param.dictName
      this.pageParam.dictCode = this.dictCode
      this.getDictListItem()
    },
    deleteDictItem (param) {
      if (!param && this.$refs.showTable.selection.length < 1) {
        this.$message({ message: '请选择要删除的数据', type: 'warning' })
        return
      }
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let codes = param ? param.itemCode
          : this.$refs.showTable.selection.map(item => item.itemCode).join()
         dictSendService.batchDelDictItem({
           'dictCode': this.dictCode,
           'dictItemCodeList': codes
         }) .then((data) => {
            if (data.status === 0) {
              this.$message({ message: '删除成功', type: 'success' })
              this.getDictListItem()
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
      this.showItemDialog = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(this.dictCode, row)
      })
    },
    // table 相关的函数
    clickRow (row) {
      this.$refs.showTable.toggleRowSelection(row)
    },
    handleSizeChange (pageSize) {
      this.pageParam.page = 0
      this.pageParam.pageSize = pageSize
      this.getDictListItem()
    },
    handleCurrentChange (currentPage) {
      this.pageParam.page = currentPage - 1
      this.getDictListItem()
    },
    getDictListItem () {
      dictSendService.listPageDictItems(this.pageParam).then((data) => {
        if (data.status === 0) {
          this.tableData = data.data.rows
          this.pageTotal = data.data.totalCount
        } else {
          this.$message.warning(data.msg ? data.msg : '网络异常')
        }
      }).catch(error => {

      })
    },
    /** 历史变更相关的出来函数start */
    backListPage () {
      this.histVisible = false
    },
    gotoHistory (row) {
      this.histVisible = true
      this.$nextTick(() => {
        this.$refs.hist.init(row)
      })
    }
    /** 历史变更相关的出来函数send */
  }
}
</script>
<style lang='scss' scoped>
.title {
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bolder;
}
</style>

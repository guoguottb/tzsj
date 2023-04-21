<template>
  <div>
    <el-table :data="tableData"
              stripe
              border
              ref="showTable"
              style="width: 100%">
      <el-table-column type="index"
                       :index="getStartPageNo"
                       width="60"
                       label="序号"></el-table-column>
      <el-table-column align="left"
                       prop="source.userId"
                       label="用户账号"
                       :show-overflow-tooltip="true"
                       width="auto"></el-table-column>
      <el-table-column align="left"
                       prop="source.nickName"
                       label="姓名"
                       :show-overflow-tooltip="true"
                       width="auto">
      </el-table-column>
      <el-table-column align="left"
                       prop="source.loginEmail"
                       label="登录邮箱"
                       :show-overflow-tooltip="true"
                       width="auto"></el-table-column>
      <el-table-column align="left"
                       prop="source.loginPhone"
                       label="手机号"
                       :show-overflow-tooltip="true"
                       width="auto"></el-table-column>
      <el-table-column align="left"
                       prop="source.status"
                       :formatter="statusFormat"
                       label="账号状态"
                       :show-overflow-tooltip="true"
                       width="auto">
      </el-table-column>
      <el-table-column align="left"
                       prop="operateTime"
                       :formatter="operateTimeFormat"
                       label="变更时间"
                       :show-overflow-tooltip="true"
                       width="auto">
      </el-table-column>
      <el-table-column align="left"
                       prop="operator"
                       label="变更人"
                       :show-overflow-tooltip="true"
                       width="auto"></el-table-column>
      <el-table-column align="left"
                       prop="operate"
                       :formatter="operateFormat"
                       :show-overflow-tooltip="true"
                       label="变更类型"
                       width="auto"></el-table-column>
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
</template>
<script>
import { formatTime } from '@/utils'
import historyService from "../../../../api/other/historyService";
const histUrls = {
  query: 'history/users'
}

export default {
  data () {
    return {
      tableData: [],
      pageTotal: 0,
      pageParam: {
        source: {},
        page: 0,
        pageSize: 10,
        needTotal: true,
        sortFiled: '',
        sortAsc: ''
      }
    }
  },
  components: {},
  computed: {
    getStartPageNo () {
      return this.pageParam.page * this.pageParam.pageSize + 1
    }
  },
  created () {

  },
  methods: {
    init (ucUid) {
      this.pageParam.source.ucUid = ucUid
      this.queryList()
    },
    async queryList () {
      let res = await historyService['getUsersHistory'](this.pageParam);
      this.tableData = res.rows
      this.pageTotal = res.totalCount
    },
    // table 处理基本函数 start
    handleSizeChange (pageSize) {
      this.pageParam.page = 0
      this.pageParam.pageSize = pageSize
      this.queryList()
    },
    handleCurrentChange (currentPage) {
      this.pageParam.page = currentPage - 1
      this.queryList()
    },
    // table 格式化 start
    statusFormat (row,col) {
      if (row.source.status == '11') {
        return '正常'
      } else if (row.source.status == '10') {
        return'停用'
      } else if (row.source.status == '00') {
        return '临时停用'
      }
    },
    operateFormat (row, col) {
      if (row.operate === '1') {
        return '修改'
      } else if (row.operate === '2') {
        return '删除'
      }
      return ''
    },
    operateTimeFormat (row, col) {
      return formatTime(new Date(row.operateTime * 1000))
    }
    // table 格式化 end
  }

}
</script>
<style lang='scss' scoped>
</style>

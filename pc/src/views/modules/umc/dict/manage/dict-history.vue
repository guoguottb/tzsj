<template>
  <div>
    <!--<div class="page-header">-->
      <!--<h3>字典管理-历史变更</h3>-->
    <!--</div>-->
    <div>
      <el-button-group style="float:right;margin-bottom:10px;">
        <el-button type="infor"
                   icon="el-icon-back"
                   size="small"
                   @click="backToMainList">返回</el-button>
      </el-button-group>
    </div>
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
                         prop="source.dictCode"
                         label="字典编码"
                         :show-overflow-tooltip="true"
                         width="auto"></el-table-column>
        <el-table-column align="left"
                         prop="source.dictName"
                         label="字典名称"
                         :show-overflow-tooltip="true"
                         width="auto"></el-table-column>
        <el-table-column align="left"
                         prop="source.note"
                         label="字典描述"
                         :show-overflow-tooltip="true"
                         width="auto"></el-table-column>
        <el-table-column align="left"
                         prop="operateTime"
                         :formatter="timeFormat"
                         label="变更时间"
                         :show-overflow-tooltip="true"
                         width="180"></el-table-column>
        <el-table-column align="left"
                         prop="operator"
                         label="变更人"
                         :show-overflow-tooltip="true"
                         width="auto"></el-table-column>
        <el-table-column align="left"
                         prop="operate"
                         :formatter="operateFormat"
                         label="变更类型"
                         :show-overflow-tooltip="true"
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
  </div>
</template>
<script>
import { formatTime } from '@/utils/'
import historyService from "../../../../../api/other/historyService";
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
    init (row) {
      this.pageParam.source.dictCode = row.dictCode
      this.queryList()
    },
    async queryList () {
      let res = await historyService['getDictHistory'](this.pageParam)
      this.tableData = res.rows
      this.pageTotal = res.totalCount
    },
    backToMainList () {
      this.$emit('backListPage')
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
    // table 处理基本函数 end
    // table 格式化 start
    operateFormat (row, col) {
      if (row.operate === '1') {
        return '修改'
      } else if (row.operate === '2') {
        return '删除'
      }
      return ''
    },
    timeFormat (row, col) {
      return formatTime(new Date(row.operateTime * 1000))
    }
    // table 格式化 end
  }
}
</script>
<style lang='scss' scoped>
</style>

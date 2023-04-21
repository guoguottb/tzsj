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
                       prop="source.charName"
                       label="岗位名称"
                       :show-overflow-tooltip="true"
                       width="auto"></el-table-column>
      <el-table-column align="left"
                       prop="roleIds"
                       label="授权角色"
                       min-width="150"
                       width="auto"
                       :show-overflow-tooltip="true"></el-table-column>
      <el-table-column align="left"
                       prop="source.status"
                       :formatter="statusFormat"
                       label="岗位状态"
                       :show-overflow-tooltip="true"
                       width="auto"></el-table-column>
      <el-table-column align="left"
                       prop="operateTime"
                       :formatter="timeFormat"
                       label="变更时间"
                       :show-overflow-tooltip="true"
                       width="auto"></el-table-column>
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
</template>
<script>
import { formatTime } from '@/utils'
import historyService from "../../../../api/other/historyService";
const histUrls = {
  query: 'history/character'
}

export default {
  data () {
    return {
      tableData: [],
      pageTotal: 0,
      pageParam: {
        source: {
        },
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

  methods: {
    init (charId) {
      this.pageParam.source = {}
      if (charId && typeof charId === 'string') {
        this.pageParam.source.charId = charId
      } else {
        this.pageParam.source.organId = this.$store.state.common.organId
      }

      this.queryList()
      this.$findDicts(['CHART_STATUS'], this.dicts)
    },
    async queryList () {
      let res = await historyService['getCharacterHistory'](this.pageParam);
      this.tableData = res.rows
      this.pageTotal = res.totalCount
    },
    queryListForFather (pageParam) {
      this.pageParam.organId = pageParam.organId
      this.queryList()
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
    /** 格式化函数 start */
    statusFormat (row, col) {
      if (row.source.status == '11') {
        return '正常'
      } else if (row.source.status == '10') {
        return '停用'
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
    timeFormat (row, col) {
      return formatTime(new Date(row.operateTime * 1000))
    }
    /** 格式化函数 start */
  }
}
</script>
<style lang='scss' scoped>
</style>

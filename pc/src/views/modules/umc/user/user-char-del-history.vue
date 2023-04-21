<template>
  <div>
    <div class="page-header">
      <h3>用户管理-{{organName}}-{{titleText}}</h3>
    </div>
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
  </div>
</template>
<script>
  import { formatTime } from '@/utils'
  import { debug } from 'util'
  import historyService from "../../../../api/other/historyService";
  const histUrls = {
    query: 'history/character'
  }

  export default {
    data () {
      return {
        organName: '',
        titleText: '岗位删除历史',
        dicts: {
          CHART_STATUS: []
        },
        tableData: [],
        pageTotal: 0,
        pageParam: {
          source:{
            organId: '',
          },
          operate: '2',
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
    watch: {
      'dicts.CHART_STATUS' (val) {
        if (val && this.tableData.length) {
          this.detailStatusFormat()
        }
      },
      tableData (val) {
        if (val && this.dicts.CHART_STATUS.length) {
          this.detailStatusFormat()
        }
      }
    },
    created () {

    },
    methods: {
      init (node) {
        this.organName = node.organName
        this.pageParam.source.organId = node.id
        this.queryList()
        this.$findDicts(['CHART_STATUS'], this.dicts)
      },
      async queryList () {
        let res = await historyService['getCharacterHistory'](this.pageParam);
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
      /** 格式化函数 start */
      operateFormat (row, col) {
        if (row.operate === '1') {
          return '修改'
        } else if (row.operate === '2') {
          return '删除'
        }
        return ''
      },
      timeFormat (row, col) {
        return formatTime(new Date(row[col.property]*1000))
      },
      detailStatusFormat () {
        this.tableData.forEach(item => {
          this.dicts.CHART_STATUS.forEach(ele => {
            if (ele.itemCode === item.source.status + '') {
              item.source.status = ele.itemValue
              return true
            }
          })
        })
      },
      backToMainList () {
        this.$emit('backToMainList')
      }
      /** 格式化函数 start */
    }
  }
</script>
<style lang='scss' scoped>
</style>

<template>
  <!-- 救助服务站 考核管理 救助服务站考核列表-->
  <div class="g-box">
    <el-form inline
             :model="formData"
             label-width="100px">
      <el-form-item label="服务站名称">
        <el-input v-model="formData.title"
                  placeholder="请输入救助服务站名称">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="onSearch"
                   icon="el-icon-search">查询</el-button>
        <el-button type="info"
                   @click="resetForm"
                   icon="el-icon-refresh">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- table list -->
    <my-table :columns="columns"
              :loading="tableLoading"
              :table-data="tableData"
              @sortChange="sortChange"
              :pagination="true"
              :page-size.sync="pageSize"
              :tableWidth="120"
              :total="total"
              :current-page.sync="pageNo"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange">
      <!-- button 插槽 -->
      <template slot="buttons"
                slot-scope="{row}">
        <el-button type="danger"
                   @click="viewRowInfo(row.row)">待定</el-button>
      </template>
    </my-table>
  </div>
</template>

<script>
import myTable from "@/views/common/newMyTable"
// api 
import { getStationExamineListApi } from "@/api/SocialWorkStation"
export default {
  name: "SocialWorAssess",
  data () {
    return {
      historySearch: {
        title: "",
        sortField: "",
        sortDir: "",
      },
      formData: {
        title: "",
        sortField: "",
        sortDir: "",
      },
      columns: [
        { label: '救助服务站名称', prop: 'title' },
        { label: '区县', prop: 'district' },
        { label: '所属镇街', prop: 'townStreet' },
        { label: '完成批次数量', prop: 'batchNumber', sortable: true },
        { label: '总上门服务次数', prop: 'number', sortable: true },
        { label: '综合得分', prop: 'score', sortable: true },
      ],
      tableData: [],
      pageSize: 10,
      total: 0,
      pageNo: 1,
      tableLoading: false,
    }
  },
  components: {
    myTable,
  },
  created () {
    this.getTableData(this.formData)
  },
  methods: {
    // 数据回显
    async getTableData (data) {
      try {
        this.tableLoading = true
        await getStationExamineListApi(data)
      } catch (error) {
        console.log(error, "数据回显")
        if (error.response.data.code !== 200) return this.$message.error(error.response.data.msg)
        let result = error.response.data.data
        this.historySearch = data // 存储历史搜索
        this.tableData = result.content
        this.pageNo = result.pageNo
        this.pageSize = result.pageSize
        this.total = result.totalElements
      } finally {
        this.tableLoading = false
      }
    },
    // 搜索
    onSearch () {
      this.pageNo = 1
      this.getTableData({
        title: this.formData.title,
        pageNo: this.pageNo,
        pageSize: this.pageSize,
      })
    },
    // 重置
    resetForm () {
      this.formData.title = ""
    },
    // 切换页码
    handleSizeChange (row) {
      this.historySearch.pageSize = row
      this.getTableData(this.historySearch)
    },
    // 切页
    handleCurrentChange (row) {
      this.historySearch.pageNo = row
      this.getTableData(this.historySearch)
    },
    // table 查看删除
    refuseRowInfo (row) {
      console.log(row)
    },
    // table 查看
    viewRowInfo (row) {
      console.log(row)
      // this.$router.push(`/assessDetail?batchId=${row.stationId}`)
      // batchId
    },
    // table 通过
    passRowInfo (row) {
      console.log(row)
    },
    sortChange (object) {
      this.historySearch.pageNo = 1
      this.historySearch.sortField = object.prop
      this.historySearch.sortDir = object.order

      this.getTableData(this.historySearch)
    }
  },
}
</script>

<style scoped lang='less'></style>

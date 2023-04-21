<template>
  <!-- 救助服务站 考核管理 救助服务站考核列表-->
  <div class="g-box">
    <el-form inline
             :model="formData"
             label-width="100px">
      <el-form-item label="服务站名称">
        <el-input v-model="formData.name"
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
              :pagination="true"
              @sortChange="sortChange"
              :page-size.sync="pageSize"
              :total="total"
              :tableWidth="120"
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
import { getPersonExamineListApi } from "@/api/SocialWorkStation"
export default {
  name: "SocialWorStaffAssess",
  data () {
    return {
      historySearch: {
        name: "",
      },
      formData: {
        name: "",
      },
      columns: [
        { label: '员工姓名', prop: 'name' },
        { label: '员工身份证', prop: 'idCard', minWidth: 160 },
        { label: '所属服务站', prop: 'stationTitle' },
        { label: '有效性综合得分', prop: 'availability', minWidth: 110, sortable: true },
        { label: '专业程度综合得分', prop: 'professionalism', minWidth: 120, sortable: true },
        { label: '服务态度综合得分', prop: 'service', minWidth: 120, sortable: true },
        { label: '及时性综合得分', prop: 'timeliness', minWidth: 110, sortable: true },
        { label: '综合得分', prop: 'score', sortable: true },
        { label: '完成数量', prop: 'number', sortable: true },
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
        await getPersonExamineListApi(data)
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
        title: this.formData.name,
        pageNo: this.pageNo,
        pageSize: this.pageSize,
      })
    },
    // 重置
    resetForm () {
      this.formData.name = ""
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

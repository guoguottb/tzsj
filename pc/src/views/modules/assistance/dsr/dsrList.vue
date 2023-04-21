<template>
  <div>
    <common-list :sKey="120"
                 :type="'家庭边缘'"
                 @rowOperatingButton="rowOperatingButton"
                 :tableName="'申请'"></common-list>
    <!-- 提取按人保成员 -->
    <el-dialog title="提取按人保成员"
               :visible.sync="dialogVisible"
               width="50%"
               :before-close="handleClose">
      <!-- table list -->
      <el-table :data="tableData"
                border
                max-height="460px"
                style="width: 100%">
        <el-table-column prop="abm_ex3"
                         label="姓名">
        </el-table-column>
        <el-table-column prop="abm_ex2"
                         label="身份证"
                         width="180">
        </el-table-column>
        <el-table-column prop="abm_ex1"
                         label="家庭关系">
        </el-table-column>
        <el-table-column prop="abm_ex11"
                         label="健康状况">
        </el-table-column>
        <el-table-column prop="isTiqu"
                         width="220"
                         label="是否存在于按人保流程">
        </el-table-column>
      </el-table>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary"
                   @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>

import commonList from '../commonList'
import {
  showdrbtiquApi, // 按人保成员数据回显
  drbtiquApi,  // 确认 提取按人保成员
} from "@/api/lifeRescue/singleInsurance"
export default {
  data () {
    return {
      dialogVisible: false,
      tableData: [],
      rowInfo: {},
      abm_mainid: ""
    }
  },
  beforeRouteLeave (to, from, next) {
    sessionStorage.setItem('activeName', this.$children[0].activeName);
    next();
  },
  components: {
    commonList
  },
  methods: {
    // operation button events
    rowOperatingButton (val) {
      this.rowInfo = val // row information
      this.showdrbtiqu(val.ab_id) // 数据回显
      this.dialogVisible = true // 展示弹框
    },
    // 按人保成员 弹框关闭前
    handleClose () {
      this.dialogVisible = false  // 先关弹框
      this.tableData = []     // 在重置列表
      this.rowInfo = {} // 重置rowInfo
      this.abm_mainid = "" // 重置rowInfo
    },
    // 按人保成员数据回显
    async showdrbtiqu (id) {
      try {
        await showdrbtiquApi(id)
      } catch (error) {
        console.log(error)
        if (error && error.response.data.code === 200) {
          this.abm_mainid = error.response.data.data.abm_mainid
          return this.tableData = error.response.data.data.vo
        }
        this.$message.error(error.response.data.msg)
      }
    },
    // 确认 提取按人保成员
    async confirm () {
      try {
        await drbtiquApi(this.abm_mainid)
      } catch (error) {
        if (error && error.response.data.code === 200) {
          this.handleClose()
          return this.$message.success(error.response.data.msg)
        }
        this.$message.error(error.response.data.msg)
      }
    }
  }
}
</script>
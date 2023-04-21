<template>
  <div>
    <common-list :sKey="466"
                 :type="'救助资金发放信息管理'"
                 :tableName="'救助资金发放信息管理'"
                 :search="search"
                 @urbanStatisticalStatement="urbanStatisticalStatement"></common-list>
    <el-dialog title="市区发放统计报表"
               :visible.sync="exportMoneyDialogVisible"
               width="60%"
               :before-close="exportMoneyHandleClose">
      <el-button type="success"
                 style="marginBottom:12px"
                 :loading="exportMoneyLoading"
                 @click="excelReliefdistListExport">导出列表</el-button>
      <!-- 列表数据 -->
      <el-table :data="exportList"
                height="420px"
                border
                style="width: 100%">
        <el-table-column label="发放类型"
                         width="120">
          <template slot-scope="{row}">
            <p :title="row.ar_ex1"
               class="ellipsis">{{row.ar_ex1}}</p>
          </template>
        </el-table-column>
        <el-table-column label="发放地区"
                         width="120">
          <template slot-scope="{row}">
            <p :title="row.ar_ex9"
               class="ellipsis">{{row.ar_ex9}}</p>
          </template>
        </el-table-column>
        <el-table-column label="是否发放">
          <template slot-scope="{row}">
            <p :title="row.ar_ex10 | moneyIsGrant"
               class="ellipsis">{{row.ar_ex10 | moneyIsGrant}}</p>
          </template>
        </el-table-column>
        <el-table-column label="已发放户数">
          <template slot-scope="{row}">
            <p :title="row.ar_ex2"
               class="ellipsis">{{row.ar_ex2}}</p>
          </template>
        </el-table-column>
        <el-table-column label="已发放金额">
          <template slot-scope="{row}">
            <p :title="row.ar_ex3"
               class="ellipsis">{{row.ar_ex3}}</p>
          </template>
        </el-table-column>
        <el-table-column label="已发放人数">
          <template slot-scope="{row}">
            <p :title="row.man_num"
               class="ellipsis">{{row.man_num}}</p>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>

</template>
<script>
import { reliefdistListApi, excelReliefdistListExportApi } from "@/api/moneyProvide"
import commonList from '../commonList'
export default {
  name: "jzffList",
  data () {
    return {
      search: {},
      exportList: [],
      exportMoneyDialogVisible: false,
      exportMoneyLoading: false,
    }
  },

  created () {
    this.reliefdistList()
  },
  components: {
    commonList
  },
  methods: {
    urbanStatisticalStatement (val) {
      this.exportMoneyDialogVisible = true
    },
    // 市区发放统计报表 数据回显
    async reliefdistList () {
      try {
        await reliefdistListApi({})
      } catch (error) {
        if (error.response.data.code === 200) return this.exportList = error.response.data.data
      }
    },
    exportMoneyHandleClose () {
      this.exportMoneyDialogVisible = false
    },
    // 市区发放统计报表 导出
    async excelReliefdistListExport () {
      try {
        this.exportMoneyLoading = true
        await excelReliefdistListExportApi({})
      } catch (error) {
        if (error.response.status === 200) {
          const base64Data = error.response.data;
          const fileName = "市区发放统计报表.xlsx";
          return this.downloadExcelFromBase64(base64Data, fileName);
        }
        this.$message.error("导出失败请稍后重试")
      } finally {
        this.exportMoneyLoading = false
      }
    },
    // base64 transform excel file
    downloadExcelFromBase64 (base64Data, fileName) {
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    },
  },
  filters: {
    moneyIsGrant (val) {
      if (val == 0) return '已发放'
      if (val == 1) return '未发放'
    }

  }
}
</script>
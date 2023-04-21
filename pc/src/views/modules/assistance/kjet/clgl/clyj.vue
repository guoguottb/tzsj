<template>
  <div class="g-box">
    <el-form :inline="true"
             :model="searchData"
             class="demo-form-inline">
      <el-form-item label="行政区划">
        <el-cascader :props="props"
                     v-model="xzqhArray"
                     placeholder="行政区划">
        </el-cascader>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="searchData.name"
                  placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="身份证号码">
        <el-input v-model="searchData.idCard"
                  placeholder="身份证号码"></el-input>
      </el-form-item>
      <el-form-item label="处理状态">
        <el-select v-model="searchData.processed"
                   placeholder="请选择处理状态">
          <el-option label="未处理"
                     value="0"></el-option>
          <el-option label="处理中"
                     value="1"></el-option>
          <el-option label="已处理"
                     value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary"
                 @click="searchDate"
                 icon="el-icon-search">查询</el-button>
      <el-button type="info"
                 @click="tableReset"
                 icon="el-icon-refresh">重置</el-button>
    </el-form>
    <myTable :tableData="tableData.content"
             :tableInfo="tableInfo"
             :maxHeight="`500px`"
             :operateWidth="380"
             :pageSizes="pageSizes"
             :pageNo="searchData.pageNo"
             :pageSize="searchData.pageSize"
             :totalElements="tableData.totalElements"
             @handleSizeChange="handleSizeChange"
             @handleCurrentChange="handleCurrentChange">
      <template slot="buttons"
                slot-scope="{row}">
        <el-button type="primary"
                   @click="viewRowInfo(row.row)">查看</el-button>
        <el-button type="warning"
                   @click="renewalOfInsurance(row.row)">超龄续保</el-button>
        <el-button type="warning"
                   @click="disposableContinue(row.row)">一次性续发</el-button>
        <el-button type="warning"
                   @click="exceeTheAgeOut(row.row)">超龄退出</el-button>
      </template>
    </myTable>
  </div>
</template>

<script>
import myTable from "@/views/common/myTable"
import {
  getCityOptionApi,
  getChildWarningListApi,  // 超龄管理 超龄预警  困境儿童预警列表
  toOldContinueGuaranteeApi,  // 超龄续保 按钮接口
  exceedOldContinueGrantApi,  // 一次性续发 按钮接口
  OverageWithdrawalApi,  // 超龄退出 按钮接口
} from "@/api"
export default {
  name: "clglclyj",
  data () {
    return {
      tableData: {
        content: [],
        totalElements: 0
      },
      tableInfo: [{
        label: "区(县)",
        value: "district",
      },
      {
        label: "街道",
        value: "townStreet",
      },
      {
        label: "村镇",
        value: "village",
      },
      {
        label: "姓名",
        value: "name",
      },
      {
        label: "身份证号码",
        value: "idCard",
        width: "180px"
      },
      {
        label: "预警创建时间",
        value: "createTime",
        width: "180px"
      },
      {
        label: "处理状态",
        value: "processedStr",
      },],
      searchData: {
        divisionCod: "",  // 行政区划代码
        idCard: "",       // 儿童身份证
        name: "",         // 儿童姓名
        processed: "",           // 处理状态(0:未处理,1:处理中,2:已处理)
        pageNo: 1,
        pageSize: 10,
      },
      pageSizes: [10, 20, 50, 100],
      totalElements: 0,
      xzqhArray: [],      //行政区划搜索
      props: {
        checkStrictly: true,
        lazy: true,
        lazyLoad (node, resolve) {
          const { level } = node; // 获取当前node对象中的level属性
          let pId = "0";
          if (level > 0) {
            let value = node.value;
            if (value) {
              let values = value.split("#");
              pId = values.length > 1 ? values[1] : "0";
            }
          }
          getCityOptionApi(pId).then((res) => { })
            .catch((res) => {
              const nodes = res.response.data;
              nodes.forEach((item) => {
                item.value = item.cs_ex2 + "#" + item.cs_ex1;
                item.label = item.cs_ex2;
                item.leaf = level >= 2; //判断是否为末尾节点，这个地方是0,1,2三级
              });
              resolve(nodes);
            });
        },
      },
      formerSearchData: {
      }
    }
  },
  created () {
    this.getChildWarningList(this.searchData)
  },
  methods: {
    // tableData-search
    async getChildWarningList (data) {
      try {
        this.formerSearchData = data
        await getChildWarningListApi(data)
      } catch (error) {
        console.log(error, "table list")
        if (error && error.response.data.status === "+OK") {
          this.searchData = data
          this.tableData = error.response.data.data
        }

      }
    },
    // top-search-button
    searchDate () {
      let searchForm = this.searchData
      let reg = /[^0-9]/ig
      // 如果选择了行政区划
      searchForm.divisionCod = this.xzqhArray.length ? this.xzqhArray[this.xzqhArray.length - 1].replace(reg, "") : ""
      this.getChildWarningList(searchForm)
    },
    // top-reset-button
    tableReset () {
      this.xzqhArray = []
      this.formerSearchData = this.searchData = {
        divisionCod: "",  // 行政区划代码
        idCard: "",       // 儿童身份证
        name: "",         // 儿童姓名
        processed: "",           // 处理状态(0:未处理,1:处理中,2:已处理)
        pageNo: 1,
        pageSize: this.searchData.pageSize,
      }
    },
    // 切换页码
    handleSizeChange (val) {
      this.formerSearchData.pageNo = 1
      this.formerSearchData.pageSize = val
      this.getChildWarningList(this.formerSearchData)
    },
    // 切页
    handleCurrentChange (val) {
      this.formerSearchData.pageNo = val
      this.getChildWarningList(this.formerSearchData)
    },
    // 查看按钮
    viewRowInfo (row) {
      if (process.env.NODE_ENV == "development") return this.$router.push({ path: '/social/assistance/kjet/kjetListView?id=' + row.childId, });
      this.$pushRouter({ path: generalConfig.defaultUrl + '/social/assistance/kjet/kjetListView?id=' + row.childId, })
    },
    // 超龄续保   按钮
    async renewalOfInsurance (row) {
      this.$confirm('是否要进行超龄续保操作').then(async res => {
        try {
          await toOldContinueGuaranteeApi({
            childId: row.childId,
            warnId: row.warnId,
          })
        } catch (error) {
          if (error.response.data.code === 200) {
            this.getChildWarningList(this.searchData)
            return this.$message.success(error.response.data.msg)
          }
          this.$message.error(error.response.data.msg)
        }
      }).catch(error => {
        console.log(error)
      })

    },
    // 一次性续保  按钮
    async disposableContinue (row) {
      this.$confirm('是否要进行一次性续保操作').then(async res => {
        try {
          await exceedOldContinueGrantApi({
            childId: row.childId,
            warnId: row.warnId,
          })
        } catch (error) {
          if (error.response.data.code === 200) {
            this.getChildWarningList(this.searchData)
            return this.$message.success(error.response.data.msg)
          }
          this.$message.error(error.response.data.msg)
        }
      }).catch(error => {
        console.log(error)
      })

    },
    // 超龄退出 按钮
    async exceeTheAgeOut (row) {
      this.$confirm('是否要进行超龄退出操作').then(async res => {
        try {
          await OverageWithdrawalApi({
            childId: row.childId,
            warnId: row.warnId,
          })
        } catch (error) {
          if (error.response.data.code === 200) {
            this.getChildWarningList(this.searchData)
            return this.$message.success(error.response.data.msg)
          }
          this.$message.error(error.response.data.msg)
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },
  components: {
    myTable,
  }
}
</script>

<style scoped lang='less'>
</style>

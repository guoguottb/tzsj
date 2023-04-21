<!-- 特困自理能力评估 -->
<template>
  <div>
    <el-card class="box-card">
      <el-table :data="tableData"
                style="width: 100%;">
        <el-table-column prop="date"
                         label="特困老人自理能力情况评估数量统计">
          <el-table-column prop="province"
                           label="序号"
                           width="80"
                           type="index">
          </el-table-column>
          <el-table-column prop="city"
                           label="区域">
          </el-table-column>
          <el-table-column prop="voList.finish"
                           label="已评估总数">
          </el-table-column>
          <el-table-column prop="zip"
                           label="评估结果">
            <el-table-column prop="voList.zili"
                             label="自理">
            </el-table-column>
            <el-table-column prop="voList.banShiNeng"
                             label="半失能">
            </el-table-column>
            <el-table-column prop="voList.shiNeng"
                             label="失能">
            </el-table-column>
          </el-table-column>
          <el-table-column prop="voList.unfinish"
                           label="未评估数量">
          </el-table-column>
          <el-table-column prop="voList.sunNum"
                           label="评估任务总数">
          </el-table-column>
          <el-table-column prop="voList.wanChengLv"
                           label="评估完成率">
          </el-table-column>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getExceptionalAssessListApi } from "@/api/dataCentre"
export default {
  data () {
    return {
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-08',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-07',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }]
    }
  },
  created () {
    this.getExceptionalAssessList()
  },
  methods: {
    async getExceptionalAssessList () {
      try {
        await getExceptionalAssessListApi()
      } catch (error) {
        console.log(error.response.data)
        if (error && error.response && error.response.statusText === "OK") {
          // this.tableData
          let table = error.response.data
          let lastList = {
            city: "总数",
            voList: {
              finish: 0,
              zili: 0,
              banShiNeng: 0,
              shiNeng: 0,
              unfinish: 0,
              sunNum: 0,
              wanChengLv: 0
            }
          }

          table.every(item => item.voList.sumNum instanceof String) ? table.forEach(item => {
            lastList.voList.sunNum += +item.voList.sunNum
            lastList.voList.wanChengLv += +item.voList.wanChengLv.replace(/%/, "")
          }) : "暂无"
          table.every(item => item.voList.sunNum === "") ? lastList.voList.sunNum = "数据不全" : ""
          table.every(item => item.voList.wanChengLv !== null && item.voList.wanChengLv !== "") ?lastList.voList.wanChengLv = (lastList.voList.wanChengLv/table.length).toFixed(2) + "%" : lastList.voList.wanChengLv = "数据不全"
          table.forEach(item => {
            lastList.voList.finish += +item.voList.finish
            lastList.voList.zili += +item.voList.zili
            lastList.voList.banShiNeng += +item.voList.banShiNeng
            lastList.voList.shiNeng += +item.voList.shiNeng
            lastList.voList.unfinish += +item.voList.unfinish
          })
          table.push(lastList)
          this.tableData = table
          console.log(this.tableData)
          return this.tableData
        }
        this.$message.error("获取特困自理能力评估失败，请稍后重试")
      }
    },
  },
}
</script>

<style scoped lang='less'>
.box-card {
  height: 720px;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>

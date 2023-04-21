<!-- 低保特定对象统计表 -->
<template>
  <div class="g-box">
    <div class="g-box2">
      <div style="display: flex; justify-content: space-between">
        <div style="width: 100%; height: auto; margin: 10px 0">
          <!-- fromdata -->
          <el-form class="searchTj demo-form-inline">
            <el-form-item class="block"
                          :inline="true">
              <span class="yearOption">选择年份:&nbsp;&nbsp;</span>
              <el-date-picker v-model="fromData.year"
                              type="year"
                              :clearable="false"
                              width="200"
                              :picker-options="pickerOptions"></el-date-picker>
            </el-form-item>
            <el-form-item label="选择季度" class="block" :inline="true">
              <el-select v-model="fromData.quarter">
                <el-option value="第一季度"
                           label="第一季度"></el-option>
                <el-option value="第二季度"
                           label="第二季度"></el-option>
                <el-option value="第三季度"
                           label="第三季度"></el-option>
                <el-option value="第四季度"
                           label="第四季度"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="选择区域"
                          class="block"
                          :inline="true">
              <el-select v-model="fromData.type">
                <el-option value="农村"
                           label="农村"></el-option>
                <el-option value="城市"
                           label="城市"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="line-height: 52px; display: inline-block">
              <el-button type="primary"
                         @click="queryListByCriteria"
                         icon="el-icon-search">
                查询</el-button>

              <el-button type="info"
                         @click="resetQuery"
                         icon="el-icon-refresh">
                重置</el-button>
            </el-form-item>
          </el-form>
          <div style="margin: 6px">
            <el-button icon="el-icon-folder-opened"
                       type="success"
                       @click="exportExcel">导出</el-button>
            <el-button icon="el-icon-printer"
                       type="success"
                       @click="printTable">打印</el-button>
          </div>
        </div>
      </div>
      <h4>{{thisTableTile}}</h4>
      <!-- table -->
      <el-table id="mytable"
                v-loading="loading"
                border
                :data="tableData"
                stripe
                style="width: 100%">
        <el-table-column prop="area"
                         label="地区"> </el-table-column>
        <el-table-column prop="release"
                         label="两劳释放人员"> </el-table-column>
        <el-table-column prop="lose"
                         label="失独人员"> </el-table-column>
        <el-table-column prop="community"
                         label="社区矫正人员"> </el-table-column>
        <el-table-column prop="party"
                         label="建国前老党员"> </el-table-column>
        <el-table-column prop="returned"
                         label="散居归侨侨眷"> </el-table-column>
        <el-table-column prop="fisherman"
                         label="退捕渔民"> </el-table-column>
        <el-table-column prop="minority"
                         label="少数民族"> </el-table-column>
        <el-table-column prop="graduate"
                         label="高校毕业生"> </el-table-column>
        <el-table-column prop="religion"
                         label="宗教教职人员"> </el-table-column>
        <el-table-column prop="cadre"
                         label="低保经办人员和村（居）委会干部近亲属">
        </el-table-column>
        <el-table-column prop="psychosis"
                         label="易肇事肇祸精神病人">
        </el-table-column>
        <el-table-column prop="aids"
                         label="艾滋病人"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
import FileSaver from 'file-saver'
import XLSX from 'xlsx-style'
import XLSX2 from 'xlsx'
// api
import { DBspecificObjectApi } from "@/api/dataCentre"
export default {
  name: 'QuarterlyTable',
  data () {
    return {
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() < Date.now()
          // return time.getFullYear() < 2022;
        },
      },
      tableName: '江苏省城市低保特定救助对象统计表',
      tableName2: '江苏省农村低保特定救助对象统计表',
      thisTableTile: "",
      tableData: [],
      fromData: {
        type: '农村', // 户口类型
        quarter: '', // 第n季度
        year: new Date().Format('yyyy'), // 年份
      },
      loading: false  // table loading
    }
  },
  created () {
    this.formatQuarter()
    this.DBspecificObject(this.fromData)
  },
  methods: {
    // 查询按钮
    queryListByCriteria () {
      this.fromData.year = new Date(this.fromData.year).Format('yyyy'),
        this.DBspecificObject(this.fromData)
    },
    // 重置按钮
    resetQuery () {
      this.fromData.type = "农村"
      this.fromData.year = new Date().Format('yyyy')
      this.fromData.quarter = this.formatQuarter()
    },
    // 进入页面table数据回显
    async DBspecificObject (data) {
      try {
        this.loading = true
        this.fromData.year = new Date(data.year).Format('yyyy')
        await DBspecificObjectApi(data)
        this.$message.error("数据请求失败，请稍后重试！")
      } catch (error) {
        if (error&& error.response && error.response.data.status == "+OK") {
          this.tableData = error.response.data.data
          this.thisTableTile = `${data.year}年江苏省${data.quarter}${data.type}低保特定救助对象统计表`
          this.$message.success("数据请求成功");
          console.log(this.tableData, data)
        }
      } finally {
        this.loading = false
      }
    },
    //定义导出Excel表格事件
    exportExcel (tableName) {
      /* 从表生成工作簿对象 */
      let wb = XLSX2.utils.table_to_book(document.querySelector('#mytable'))
      // if(!wb['!merges']){
      //   this.$message.warning('无法导出：报表无数据');
      //   return
      // }
      console.log((wb.Sheets.Sheet1['!fullref'] = 'A1:N6'))
      console.log((wb.Sheets.Sheet1['!ref'] = 'A1:N6'))
      console.log(
        (wb.Sheets.Sheet1.A6 = { t: 's', v: '填报单位：泰州市民政局' })
      )
      console.log((wb.Sheets.Sheet1.C6 = { t: 's', v: '填表人：XX' }))
      console.log((wb.Sheets.Sheet1.E6 = { t: 's', v: '审核人：XX' }))
      console.log((wb.Sheets.Sheet1.N6 = { t: 's', v: '送报日期：xx-xx-xx' }))
      console.log(wb.Sheets.Sheet1)
      /* 获取二进制字符串作为输出 */
      var wbout = XLSX2.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array',
      })


      // return
      try {
        for (let key in wb) {
          wb[key].s = {
            alignment: {
              // 文字居中
              horizontal: 'center',
              vertical: 'center',
              wrap_text: true,
            },
          }
        }

        FileSaver.saveAs(
          //Blob 对象表示一个不可变、原始数据的类文件对象。
          //Blob 表示的不一定是JavaScript原生格式的数据。
          //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
          //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
          new Blob([wbout], { type: 'application/octet-stream' }),
          //设置导出文件名称
          tableName + '.xlsx'
        )
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout)
      }
      return wbout
    },
    //打印页面内容
    printTable () {
      let wpt = document.querySelector('#mytable')
      let newContent = wpt.innerHTML
      let oldContent = document.body.innerHTML
      document.body.innerHTML = newContent
      window.print() //打印方法
      // window.localtion.reload();
      history.go(0)
      document.body.innerHTML = oldContent
    },
    formatQuarter () {
      let quarter = Math.floor((new Date().getMonth() + 1) / 3)
      if (quarter === 0) return (this.fromData.quarter = '第四季度')
      if (quarter === 1) return (this.fromData.quarter = '第一季度')
      if (quarter === 2) return (this.fromData.quarter = '第二季度')
      if (quarter === 3) return (this.fromData.quarter = '第三季度')
    },
  },
}
</script>

<style>
.g-box {
  height: 80vh !important;
}
.g-box2 {
  width: 100%;
  height: 100%;
}
.el-header,
.el-footer {
  /* background-color: #cfcfcf; */
  border-bottom: 1px solid #ddd;
  color: #333;
  text-align: center;
  line-height: 50px;
  font-size: 30px;
  /* font-weight: 500; */
}
.el-table th > .cell,
.el-table .cell {
  white-space: pre-wrap;
  word-break: unset;
}
.demonstration {
  font-size: 14px;
  color: #606266;
}
.yearOption {
  font-size: 14px;
  color: #606266;
}
</style>

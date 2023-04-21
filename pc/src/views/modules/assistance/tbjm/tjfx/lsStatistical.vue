<!-- 临时救助季度表 -->
<template>
  <div class="g-box">
    <div class="g-box2">
      <div style="display: flex; justify-content: space-between">
        <div id="page1"
             style="width:100% ;height:auto;margin:10px 0;">
          <el-form class="searchTj">
            <el-form-item class="block"
                          :inline="true"
                          style="margin-right:20px">
              <span class="demonstration">选择年份：</span>
              <el-date-picker v-model="fromData.year"
                              type="year"
                              :clearable='false'></el-date-picker>
            </el-form-item>
            <el-form-item class="block"
                          :inline="true"
                          style="margin-right:20px">
              <span class="demonstration">选择季度：</span>
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

            <el-form-item style="line-height:52px;display:inline-block;">
              <el-button type="primary"
                         @click="queryListByCriteria"
                         icon="el-icon-search"> 查询</el-button>
              <el-button type="info"
                         @click="resetQuery"
                         icon="el-icon-refresh"> 重置</el-button>
            </el-form-item>

          </el-form>
        </div>
      </div>
      <div style="margin:6px">
        <el-button icon="el-icon-folder-opened"
                   type="success"
                   @click="exportExcel">导出</el-button>
        <el-button icon="el-icon-printer"
                   type="success"
                   @click="printTable">打印</el-button>
      </div>

      <el-table class="oneTh"
                :data="tableData"
                v-loading="loading"
                border
                id="BtableA"
                style="width: auto">
        <el-table-column prop="area"
                         label="地区"
                         width="100">
        </el-table-column>
        <el-table-column prop="entire"
                         label="临时救助对象"
                         width="80">
        </el-table-column>

        <el-table-column prop="ab_ex2"
                         label="按属地分类">
          <el-table-column label="本地户籍"
                           width="80"
                           prop="within">
          </el-table-column>
          <el-table-column label="非本地户籍"
                           width="80"
                           prop="nonlocal">
          </el-table-column>
        </el-table-column>
        <el-table-column prop="ab_ex2"
                         label="按对象分类"
                         width="120">
          <el-table-column label="低保对象"
                           width="80"
                           prop="db">
          </el-table-column>
          <el-table-column label="特困对象"
                           width="80"
                           prop="tk">
          </el-table-column>
          <el-table-column label="其他"
                           width="80"
                           prop="annum">
          </el-table-column>
        </el-table-column>

        <el-table-column label="季度累计支出（万元）"
                         width="80"
                         prop="quarter">
        </el-table-column>

        <el-table-column label="其中">
          <el-table-column label="政府救助（万元）"
                           width="80"
                           prop="qzsqRs">
          </el-table-column>

          <el-table-column label="发放救助金（万元）"
                           width="80"
                           prop="qzsqRs">
          </el-table-column>

          <el-table-column label="实物折价（万元）"
                           width="80"
                           prop="qzsqRs">
          </el-table-column>

          <el-table-column label="政府转介慈善救助（万元）"
                           width="80"
                           prop="qzsqRs">
          </el-table-column>
        </el-table-column>

        <el-table-column label="全年累计支出（万元）"
                         width="80"
                         prop="year">
        </el-table-column>

        <el-table-column label="其中">
          <el-table-column label="政府救助（万元）"
                           width="80"
                           prop="qzsqRs">
          </el-table-column>

          <el-table-column label="发放救助金（万元）"
                           width="80"
                           prop="qzsqRs">
          </el-table-column>

          <el-table-column label="实物折价（万元）"
                           width="80"
                           prop="qzsqRs">
          </el-table-column>

          <el-table-column label="政府转介慈善救助（万元）"
                           width="80"
                           prop="qzsqRs">
          </el-table-column>
        </el-table-column>

        <el-table-column label="救助水平（政府救助/总人次）"
                         prop="a"
                         width="100">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
import FileSaver from "file-saver";
import XLSX from "xlsx-style";
import XLSX2 from "xlsx";
// api
import { TemporaryAssistanceApi } from "@/api/dataCentre"
export default {
  name: "QuarterlyTable",
  data () {
    return {
      tableTitle: '', //表格标题
      heigth: 'auto',
      isShow: true,
      loading: false,
      activeName: 'first',
      tableData: [],
      fromData: {
        year: new Date().Format('yyyy'),
        quarter: ""
      },
      loading: false
    };
  },
  created () {
    this.formatQuarter()
    this.TemporaryAssistance(this.fromData)
  },
  methods: {
    // 监听窗口变化
    watchWindowSize () {
      var zoomTable = document.getElementById('mytable');
      // var page1 = document.getElementById('page1');
      // 获取窗口的宽度和高度，不包括滚动条
      var w = document.documentElement.clientWidth;
      var h = document.documentElement.clientHeight;
      zoomTable.style.zoom = Number(w / 1920)
    },
    // table 数据请求
    async TemporaryAssistance (data) {
      this.loading = true
      try {
        this.fromData.year = new Date(data.year).Format('yyyy')
        await TemporaryAssistanceApi(data)
        this.$message.error("数据请求失败，请稍后重试！")
      } catch (error) {
        const res = error.response
        if (error && res && res.data.status == "+OK") {
          this.tableData = res.data.data
          this.$message.success("数据请求成功")
          console.log(this.tableData)
        }
      } finally {
        this.loading = false
      }
    },
    // 数据加载
    // 查询
    queryListByCriteria () {
      this.fromData.year = new Date(this.fromData.year).Format('yyyy')
      this.TemporaryAssistance(this.fromData)
    },
    // 重置
    resetQuery () {
      this.fromData.year = new Date().Format('yyyy')
      this.fromData.quarter = this.formatQuarter()
    },
    //定义导出Excel表格事件
    exportExcel () {
      /* 从表生成工作簿对象 */
      // let wb = XLSX2.utils.table_to_book(document.querySelector('#mytable'))
      let wb = XLSX2.utils.table_to_book(document.querySelector('#BtableA'))
      /* 获取二进制字符串作为输出 */
      var wbout = XLSX2.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
      })
      try {
        for (let key in wb) {
          wb[key].s = {
            alignment: {// 文字居中
              horizontal: 'center',
              vertical: 'center',
              wrap_text: true
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
          '泰州市民政局社会救助季度表.xlsx'
        )
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout)
      }
      return wbout
    },
    //打印页面内容
    printTable () {
      var win = window.open('');
      // 写入
      win.document.write(`
            <html>
                <head>
                    <title>`+ this.tableTitle + `打印</title>
                </head>
            
                <style>
                    .clearfix:after{
                        content: "020"; 
                        display: block; 
                        height: 0; 
                        clear: both; 
                        visibility: hidden;
                    }
                    .clearfix {
                        zoom: 1; 
                    }
                    #detailePrintStyle{
                        width:100%;
                        height: 100%;
                    }
                    .printTitleSpan{
                        width:100%;
                        margin-bottom:10px;
                    }
                    .printTitleSpan .titleContent{
                        float:left;
                        margin-right:10px;
                    }
                    .printTitleSpan .contentStyle{
                        min-width:100px;
                        padding:0 5px;
                        border-bottom:1px solid #ccc;
                    }
                    #detailePrintStyle #BtableA{
                        border:1px solid #666;
                        margin-bottom:20px;
                    }
                   
                    #detailePrintStyle #BtableA el-table__body thead tbody{
                        text-align:center;
                        font-size:0.5rem;
                        width:100%;
                        
                    }
                   .titleColor{
                        background-color:#95e3f8;
                    }
                    .tabTime{
                        display:none;
                        // 
                    }
                    .title{
                        border-top:1px solid #666;
                    }
                    th{
                        height:30px;
                        line-height:30px;
                    }
                    tr{
                        height:20px;
                        line-height:20px;
                        font-size:0.5rem;
                    }
                    .printThA1{
                        width:100px;
                    }
                    .printThA2{
                        width:85px;
                        word-break:break-all; word-wrap:break-all;
                    }
                    .printThA3{
                        width:200px;
                    }
                     .printThA5{
                        width:600px;
                    }
                    input{
                        border:none;
                        text-align:center;
                    }
                    #detailePrintStyle .inputTxt{
                        border-bottom: 1px solid #000;
                    }
                    .noPrint{
                        display: none;
                    }
                </style>
                <body>
                    <div id="detailePrintStyle">
                <!--<div class="printTitleSpan">
                    <div class="clearfix" style="width:100%">
                        <div class="titleContent">交出人：</div><div class="titleContent contentStyle">123</div>
                        <div class="titleContent">接收人：</div><div class="titleContent contentStyle">123</div>
                    </div>
                    <br>
                    <div class="clearfix" style="width:100%">
                        <div class="titleContent">交接时间：</div><div class="titleContent contentStyle">123</div>
                        <div class="titleContent">所属期间：</div><div class="titleContent contentStyle">123</div>                 
                    </div>
                </div> -->
            `);

      let wpt = document.querySelector('#BtableA');
      win.document.write(wpt.outerHTML);
      win.document.write('</div></body></html>');
      win.document.close();//在IE浏览器中使用必须添加这一句
      win.focus();//在IE浏览器中使用必须添加这一句
      win.print();
      win.close();
      // let newContent = wpt.innerHTML;
      // let oldContent = document.body.innerHTML;
      // document.body.innerHTML = newContent;
      // window.print(); //打印方法
      // // window.localtion.reload();
      // history.go(0)
      // document.body.innerHTML = oldContent;
    },
    formatQuarter () {
      let quarter = Math.floor((new Date().getMonth() + 1) / 3)
      if (quarter === 0) return this.fromData.quarter = "第四季度"
      if (quarter === 1) return this.fromData.quarter = "第一季度"
      if (quarter === 2) return this.fromData.quarter = "第二季度"
      if (quarter === 3) return this.fromData.quarter = "第三季度"
    }
  },
}

</script>


<style>
/* 低保特困进度表 */
.g-box {
  height: 80vh !important;
}
.g-box2 {
  width: 100%;
  height: 100%;
  overflow-y: auto !important;
}
.oneTh .el-table__header th {
  font-size: 0.75rem;
  /* border:1px solid #333; */
}
.el-header,
.el-footer {
  border-bottom: 1px solid #e9e9e9;
  color: #333;
  text-align: center;
  line-height: 50px;
  font-size: 30px;
}
.tableBox {
  border: 0;
  color: #111;
}
.tableBox tr {
  border: 0.5px solid #aaa;
}
.tableBox tr:nth-child(0) {
  border: none;
}
.titleColor {
  padding: 5px;
  background-color: #dbf7ff;
}
.titleColor > th {
  padding: 5px;
}
.printThA2 {
  padding: 5px;
}
.demonstration {
  font-size: 14px;
  color: #606266;
}
.block {
  display: inline-block;
  min-width: 290px;
}
.footer {
  height: 50px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  padding-top: 10px;
  text-align: right;
  padding-right: 30px;
  background: #fff;
  border-top: 1px solid #e9e9e9;
}
</style>


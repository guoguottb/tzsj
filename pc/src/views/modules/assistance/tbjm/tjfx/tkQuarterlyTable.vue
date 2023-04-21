<!-- 特困供养季度表 -->
<template>
  <div class="g-box">
    <div class="g-box2">
      <!-- <h2 style="text-align:center">泰州市特困人员救助供养对象综合统计表</h2> -->

      <!-- <div style="width:100%;height:10px;background-color:#eee"></div> -->
      <div id="page1"
           style="width:100% ;height:auto;margin:10px 0;">
        <el-form class="searchTj demo-form-inline">
          <el-form-item class="block"
                        :inline="true">
            <span class="demonstration">选择年份：</span>
            <el-date-picker v-model="fromData.year"
                            type="year"
                            format="yyyy"
                            :clearable='false'
                            width='200'></el-date-picker>
          </el-form-item>
          <el-form-item label="选择季度"
                        class="block"
                        :inline="true">
            <!-- <span class="demonstration">选择季度：</span> -->
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
          <el-form-item label="供养方式"
                        class="block"
                        :inline="true">
            <!-- <span class="demonstration">供养方式：</span> -->
            <el-select v-model="fromData.way">
              <el-option value="集中"
                         label="集中"></el-option>
              <el-option value="分散"
                         label="分散"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择区域"
                        class="block"
                        :inline="true">
            <!-- <span class="demonstration">选择区域：</span> -->
            <el-select v-model="fromData.type">
              <el-option value="城市"
                         label="城市"></el-option>
              <el-option value="农村"
                         label="农村"></el-option>
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
      <div style="margin:6px">

        <el-button icon="el-icon-folder-opened"
                   type="success"
                   @click="exportExcel">导出</el-button>
        <el-button icon="el-icon-printer"
                   type="success"
                   v-print="printObj">打印</el-button>
      </div>
      <el-table class="oneTh"
                :data="TKSTableData"
                :stripe='true'
                border
                height="700px"
                id="mytable"
                v-show="isShow"
                v-loading="loading"
                style="width:100%">
        <el-table-column :label="tableTitle"
                         style="display:none">
          <el-table-column prop="area"
                           label="地区">
          </el-table-column>
          <el-table-column prop="safeguard"
                           label="本季度末保障人数">
          </el-table-column>
          <!-- 预警信息 -->
          <el-table-column :label="supportWay">

            <el-table-column label="集中供养人数">
              <el-table-column label="人数"
                               prop="provide">
              </el-table-column>
            </el-table-column>
            <el-table-column label="按自理能力划分">
              <el-table-column label="自理">
                <el-table-column label="人数"
                                 prop="whole">
                </el-table-column>
              </el-table-column>
            </el-table-column>
            <el-table-column label="按自理能力划分">
              <el-table-column label="自理">
                <el-table-column label="人数"
                                 prop="whole">
                </el-table-column>
              </el-table-column>

              <el-table-column label="半自理">
                <el-table-column label="人数"
                                 prop="half">
                </el-table-column>
              </el-table-column>

              <el-table-column label="全护理">
                <el-table-column label="人数"
                                 prop="incompletion">
                </el-table-column>
              </el-table-column>
            </el-table-column>
            <el-table-column label="按年龄划分">
              <el-table-column label="16岁以下">
                <el-table-column label="人数"
                                 prop="child">
                </el-table-column>
              </el-table-column>

              <el-table-column label="16-60岁">
                <el-table-column label="人数"
                                 prop="adult">
                </el-table-column>
              </el-table-column>

              <el-table-column label="60-80岁">
                <el-table-column label="人数"
                                 prop="aged">
                </el-table-column>
              </el-table-column>
              <el-table-column label="80岁以上">
                <el-table-column label="人数"
                                 prop="old">
                </el-table-column>
              </el-table-column>
            </el-table-column>

            <el-table-column label="按特殊身份划分">
              <el-table-column label="女性">
                <el-table-column label="人数"
                                 prop="female">
                </el-table-column>
              </el-table-column>

              <el-table-column label="重度残疾人">
                <el-table-column label="人数"
                                 prop="disability">
                </el-table-column>
              </el-table-column>

              <el-table-column label="患精神疾病人">
                <el-table-column label="人数"
                                 prop="psychosis">
                </el-table-column>
              </el-table-column>
            </el-table-column>

            <el-table-column label="动态管理">
              <el-table-column label="本季度末新增保">
                <el-table-column label="人数"
                                 prop="plus">
                </el-table-column>
              </el-table-column>

              <el-table-column label="本季度末退出保">
                <el-table-column label="人数"
                                 prop="subtract">
                </el-table-column>
              </el-table-column>

              <el-table-column label="本季度末支出保障金">
                <el-table-column label="万元"
                                 prop="money">
                </el-table-column>
              </el-table-column>
            </el-table-column>

            <el-table-column label="供养救助标准">
              <el-table-column label="基本生保障标准">
                <el-table-column label="元/月"
                                 prop="`空`">
                </el-table-column>
              </el-table-column>

              <el-table-column label="照料护理标准">
                <el-table-column label="一档">
                  <el-table-column label="元/月"
                                   prop="`空`">
                  </el-table-column>
                </el-table-column>
                <el-table-column label="二档">
                  <el-table-column label="元/月"
                                   prop="`空`">
                  </el-table-column>
                </el-table-column>
                <el-table-column label="三档">
                  <el-table-column label="元/月"
                                   prop="`空`">
                  </el-table-column>
                </el-table-column>

              </el-table-column>
            </el-table-column>
          </el-table-column>
        </el-table-column>
      </el-table>

      <el-table class="oneTh"
                :data="TKSTableData"
                border
                height="79%"
                id="mytable1"
                v-show="!isShow"
                v-loading="loading">
        <el-table-column prop="ab_ex161"
                         :label="tableTitle"
                         style="display:none">
          <el-table-column prop="tj_ex1"
                           label="地区1111"
                           width="100">
          </el-table-column>
          <el-table-column prop="tj_ex2"
                           label="本季度末保障人数"
                           width="70">
          </el-table-column>
          <!-- 预警信息 -->
          <el-table-column label="分散供养">

            <el-table-column label="分散供养人数"
                             width="70">
              <el-table-column label="人数"
                               prop="tj_ex3"
                               width="70">
              </el-table-column>
            </el-table-column>

            <el-table-column label="按自理能力划分">
              <el-table-column label="自理">
                <el-table-column label="人数"
                                 prop="tj_ex4"
                                 width="70">
                </el-table-column>
              </el-table-column>

              <el-table-column label="半自理">
                <el-table-column label="人数"
                                 prop="tj_ex5"
                                 width="70">
                </el-table-column>
              </el-table-column>

              <el-table-column label="全护理">
                <el-table-column label="人数"
                                 prop="tj_ex6"
                                 width="70">
                </el-table-column>
              </el-table-column>
            </el-table-column>

            <el-table-column label="按年龄划分"
                             width="70">
              <el-table-column label="16岁以下">
                <el-table-column label="人数"
                                 prop="tj_ex7"
                                 width="70">
                </el-table-column>
              </el-table-column>

              <el-table-column label="16-60岁">
                <el-table-column label="人数"
                                 prop="tj_ex8"
                                 width="70">
                </el-table-column>
              </el-table-column>

              <el-table-column label="60-80岁">
                <el-table-column label="人数"
                                 prop="tj_ex9"
                                 width="70">
                </el-table-column>
              </el-table-column>

              <el-table-column label="80岁以上">
                <el-table-column label="人数"
                                 prop="tj_ex10"
                                 width="70">
                </el-table-column>
              </el-table-column>
            </el-table-column>

            <el-table-column label="按特殊身份划分"
                             width="70">
              <el-table-column label="女性">
                <el-table-column label="人数"
                                 prop="tj_ex11"
                                 width="70">
                </el-table-column>
              </el-table-column>

              <el-table-column label="重度残疾人">
                <el-table-column label="人数"
                                 prop="tj_ex12"
                                 width="70">
                </el-table-column>
              </el-table-column>

              <el-table-column label="患精神疾病人">
                <el-table-column label="人数"
                                 prop="tj_ex13"
                                 width="70">
                </el-table-column>
              </el-table-column>
            </el-table-column>

            <el-table-column label="动态管理"
                             width="70">
              <el-table-column label="本季度末新增保">
                <el-table-column label="人数"
                                 prop="tj_ex14"
                                 width="70">
                </el-table-column>
              </el-table-column>

              <el-table-column label="本季度末退出保">
                <el-table-column label="人数"
                                 prop="tj_ex15"
                                 width="70">
                </el-table-column>
              </el-table-column>

              <el-table-column label="本季度末支出保障金">
                <el-table-column label="万元"
                                 prop="tj_ex16"
                                 width="70">
                </el-table-column>
              </el-table-column>
            </el-table-column>

            <el-table-column label="供养救助标准">
              <el-table-column label="基本生保障标准">
                <el-table-column label="元/月"
                                 prop="tj_ex17"
                                 width="70">
                </el-table-column>
              </el-table-column>

              <el-table-column label="照料护理标准">
                <el-table-column label="一档">
                  <el-table-column label="元/月"
                                   prop="tj_ex18"
                                   width="70">
                  </el-table-column>
                </el-table-column>
                <el-table-column label="二档">
                  <el-table-column label="元/月"
                                   prop="tj_ex19"
                                   width="70">
                  </el-table-column>
                </el-table-column>
                <el-table-column label="三档">
                  <el-table-column label="元/月"
                                   prop="tj_ex20"
                                   width="70">
                  </el-table-column>
                </el-table-column>

              </el-table-column>
            </el-table-column>
          </el-table-column>

          <!-- 前置核查 -->
          <!-- <el-table-column  label="前置核查">

          
          </el-table-column>  -->
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
import { exceptionalQuarterlyTableApi } from "@/api/dataCentre"
export default {
  name: "QuarterlyTable",
  data () {
    return {
      // heigth: '550',
      isShow: true,
      loading: false,  // table lodding
      TKSTableData: [],
      fromData: {
        type: "农村",
        way: "集中",
        year: new Date().Format('yyyy'),
        quarter: ""
      },
      supportWay: "", // 供养方式
      tableTitle: "",
      printLoading: true,
      printObj: {
        id: "mytable",
        popTitle: 'good print',
        extraCss: "https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.compat.css, https://cdn.bootcdn.net/ajax/libs/hover.css/2.3.1/css/hover-min.css",
        extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',
        beforeOpenCallback (vue) {
          vue.printLoading = true
          console.log('打开之前')
        },
        openCallback (vue) {
          vue.printLoading = false
          console.log('执行了打印')
        },
        closeCallback (vue) {
          console.log('关闭了打印工具')
        }
      }
    };
  },
  created () {
    this.formatQuarter()
    // window.addEventListener("resize", this.watchWindowSize);
    this.exceptionalQuarterlyTable()
  },
  mounted () {
    this.watchWindowSize()
  },
  methods: {
    // 监听窗口变化
    watchWindowSize () {
      //  var zoomTable = document.getElementById('mytable');
      //  var page1 = document.getElementById('page1');
      //  var zoomTable1 = document.getElementById('mytable1');
      // // 获取窗口的宽度和高度，不包括滚动条
      // var w = document.documentElement.clientWidth;
      // var h = document.documentElement.clientHeight;
      // zoomTable.style.zoom = Number(w / 1920 )
      // zoomTable1.style.zoom = Number(w / 1920 )
      // 打印结果
      // console.log('page1=>',page1.children);
      // console.log('w=>',w);
      // console.log('h=>',h);
      // console.log("result.innerHTML = 宽: " + w + ", " + "高: " + h);
    },
    // 缩放表格滚轮
    // bigTable(i){
    //   var zoomTable = document.getElementById('mytable');
    //   var zoombox = document.getElementById('g-box2');

    //   // console.log(zoomTable.style);
    //   // console.log(i);
    //   zoomTable.style.zoom = Number(window.innerWidth / 1920 )
    //   console.log('滚轮变换宽度=>',window.innerWidth);
    //   this.zoom = window.innerWidth
    //   console.log("zoomTable.style.zoom=>",zoomTable.style.zoom);
    //   // zoomTable.style.zoom = Number(this.big / window.innerWidth)
    //   // zoombox.style.zoom = Number(window.innerWidth / this.big )
    // },

    // 查询按钮
    queryListByCriteria () {
      this.fromData.year = new Date(this.fromData.year).getFullYear() + ""
      this.exceptionalQuarterlyTable()

    },
    // 重置
    resetQuery () {
      this.fromData.type = "农村"
      this.fromData.way = "集中"
      this.fromData.year = new Date().Format('yyyy')
      this.fromData.quarter = this.formatQuarter()
    },
    // 写一个getSpanArr(data,params)方法 ：构造一个SpanArr数组赋予rowspan，即控制行合并
    getSpanArr (data, params) {
      let arr = []; //--接收重构数组
      let pos = 0;  //--设置索引
      this.spanArr = []; //--控制合并的数组
      this.groupBy(this.tableData, 'ab_ex161').map(v => (arr = arr.concat(v))); //将groupby()处理好的数据再次用arr进行处理：连接所有数组成员为一个新数组
      console.log("arr", arr);

      arr.map(res => {
        // 每次遍历都删除data && this.tableData 的第一个元素
        data.shift()
        // 每次遍历都将arr数组元素对应push进 data && this.tableData
        data.push(res)
      })
      //  定义一个redata存放arr要合并字段的value
      const redata = arr.map(v => v[params])

      redata.reduce((old, cur, i) => {
        // old 上一个元素  cur 当前元素  i 索引
        if (i === 0) {
          // 第一次判断先增加一个 1 占位 ，索引为0 
          this.spanArr.push(1)
          pos = 0
        } else {
          if (cur === old) {
            this.spanArr[pos] += 1
            this.spanArr.push(0)
          } else {
            this.spanArr.push(1)
            pos = i
          }
        }
        console.log(cur);
        return cur
      }, {})

    },
    //定义导出Excel表格事件
    exportExcel () {
      let wb = XLSX2.utils.table_to_book(document.querySelector('#mytable'))
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
      let wpt = document.querySelector('#mytable');
      let newContent = wpt.innerHTML;
      let oldContent = document.body.innerHTML;
      document.body.innerHTML = newContent;
      window.print(); //打印方法
      // window.localtion.reload();
      history.go(0)
      document.body.innerHTML = oldContent;
    },
    // 查询table数据
    async exceptionalQuarterlyTable () {
      this.loading = true;
      try {
        await exceptionalQuarterlyTableApi(this.fromData)
        this.$message.error("数据请求失败，请稍后重试！")
      } catch (error) {
        if (error && error.response && error.response.data.status === "+OK") {
          this.TKSTableData = error.response.data.data
          this.supportWay = this.fromData.way + "供养"
          this.tableTitle = this.fromData.year + this.fromData.quarter + this.fromData.type + '特困人员救助供养'
          this.$message.success("数据请求成功")
          console.log(this.TKSTableData)
        }
      } finally {
        this.loading = false
      }
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


<style lang="less" scoped>
/* 特困季度表 */
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
  border-bottom: 1px solid #ddd;
  color: #333;
  text-align: center;
  line-height: 50px;
  font-size: 30px;
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
  border-top: 1px solid #ddd;
}

#mytable {
  /deep/ .el-table {
    margin-top: 10px;
    table {
      width: 100% !important;
    }
    .el-table__body,
    .el-table__header {
      width: 100% !important;
    }

    .el-table__body {
      width: 100% !important;
    }
  }
}
</style>
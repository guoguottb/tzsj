<!-- 低保季度表 -->
<template>
  <div class="g-box">
    <div class="g-box2">
      <div style="display: flex; justify-content: space-between">
        <div id="page1"
             style="width:100% ;height:auto;margin:10px 0;">
          <el-form class="searchTj demo-form-inline">
            <el-form-item class="block"
                          :inline="true">
              <span class="yearOption">选择年份:&nbsp;&nbsp;</span>
              <el-date-picker v-model="fromData.year"
                              type="year"
                              :clearable='false'
                              width='200'
                              :picker-options="pickerOptions"></el-date-picker>
            </el-form-item>
            <el-form-item label="选择季度"
                          class="block"
                          :inline="true">
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
            <el-form-item style="line-height:52px;display:inline-block;">
              <el-button type="primary"
                         @click="queryListByCriteria"
                         icon="el-icon-search"> 查询</el-button>
              <el-button type="info"
                         @click="resetQuery"
                         icon="el-icon-refresh"> 重置</el-button>
            </el-form-item>
          </el-form>
          <div style="margin:6px">
            <el-button icon="el-icon-folder-opened"
                       type="success"
                       @click="exportExcel">导出</el-button>
            <el-button icon="el-icon-printer"
                       type="success"
                       @click="printTable">打印</el-button>
          </div>
        </div>
      </div>
      <!-- 城市table表格 -->
      <el-table class="oneTh"
                v-show="cityRoCountry == '城市'"
                :data="cityData"
                border
                height="78%"
                id="mytable"
                style="width: auto"
                v-loading="loading">
        <el-table-column :label="cityTableTitle"
                         style="display:none">
          <el-table-column prop="area"
                           label="地区"
                           width="100">
          </el-table-column>
          <el-table-column prop="abj_ex1"
                           label="非农人口总数（人）"
                           width="90">
          </el-table-column>
          <el-table-column prop="abj_ex2"
                           label="低保对象占非农人口比例(%)"
                           width="80">
          </el-table-column>
          <el-table-column prop="households"
                           label="低保户数（户）"
                           width="90">
          </el-table-column>
          <!-- 预警信息 -->
          <el-table-column label="当月低保对象人数">
            <el-table-column label="人数"
                             width="60"
                             prop="person">
            </el-table-column>

            <el-table-column label="女性"
                             width="60"
                             prop="female">
            </el-table-column>

            <el-table-column label="残疾人"
                             width="60"
                             prop="disability">
            </el-table-column>

            <el-table-column label="单人保"
                             width="60"
                             prop="single">
            </el-table-column>
          </el-table-column>
          <el-table-column label="累计低保对象人数（万人）"
                           width="90"
                           prop="abj_ex8">
          </el-table-column>

          <el-table-column label="低保对象类别">
            <el-table-column label="老年人(人)"
                             prop="aged"
                             width="80">
            </el-table-column>

            <el-table-column label="成年人">
              <el-table-column label="在职人员(人)"
                               prop="incumbency"
                               width="80">
              </el-table-column>
              <el-table-column label="灵活就业(人)"
                               prop="flexible"
                               width="80">
              </el-table-column>
              <el-table-column label="登记失业(人)"
                               prop="register"
                               width="80">
              </el-table-column>
              <el-table-column label="未登记失业(人)"
                               prop="unregistered"
                               width="80">
              </el-table-column>
            </el-table-column>

            <el-table-column label="未成年人">
              <el-table-column label="在校生(人)"
                               prop="school"
                               width="80">
              </el-table-column>
              <el-table-column label="其他(人)"
                               prop="rests"
                               width="80">
              </el-table-column>
            </el-table-column>
          </el-table-column>

          <el-table-column label="累计资金支出数（万元）"
                           prop="abj_ex16"
                           width="90">
          </el-table-column>

          <el-table-column label="当月人均补助水平（元）"
                           prop="abj_ex17"
                           width="90">
          </el-table-column>

          <el-table-column label="补助标准（元）"
                           prop="abj_ex18"
                           width="80">
          </el-table-column>
        </el-table-column>
      </el-table>

      <!-- 农村table表格 -->
      <el-table fit
                v-show="cityRoCountry == '农村'"
                :data="countryData"
                border
                height="78%"
                id="mytable"
                class="oneTh"
                v-loading="loading">
        <el-table-column :label="countryTableTitle">
          <el-table-column prop="area"
                           label="地区"
                           width="90">
          </el-table-column>
          <!-- 基本保障情况 -->
          <el-table-column label="基本保障情况">
            <el-table-column prop="family"
                             label="本季度末保障户数(户)"
                             width="70">
            </el-table-column>
            <el-table-column prop="person"
                             label="本季度末保障人数(人)"
                             width="70">
            </el-table-column>
            <el-table-column prop="ab_ex2"
                             label="当地农村人口(万人)"
                             width="70">
            </el-table-column>
            <el-table-column prop="ab_ex2"
                             label="保障人数农村人口占比(%)"
                             width="70">
            </el-table-column>
          </el-table-column>
          <!-- 保障对象分类 -->
          <el-table-column label="保障对象分类">
            <el-table-column label="按年龄划分">
              <el-table-column label="老年人(人)"
                               prop="aged"
                               width="70">
              </el-table-column>
              <el-table-column label="成年人(人)"
                               prop="adult"
                               width="70">
              </el-table-column>
              <el-table-column label="未成年人(人)"
                               prop="juvenile"
                               width="70">
              </el-table-column>
            </el-table-column>

            <el-table-column label="按类别划分">
              <el-table-column label="女性(人)"
                               prop="adult"
                               width="70">
              </el-table-column>

              <el-table-column label="残疾人(人)"
                               prop="disability"
                               width="70">
              </el-table-column>
            </el-table-column>

            <el-table-column label="按单人保划分">
              <el-table-column label="重病患者(人)"
                               prop="disease"
                               width="70"> </el-table-column>
              <el-table-column label="残疾人(人)"
                               prop="disability2"
                               width="70"> </el-table-column>
            </el-table-column>
          </el-table-column>
          <!-- 动态管理 -->
          <el-table-column label="动态管理">
            <el-table-column label="本季度新增保障对象(人)"
                             prop="plus"
                             width="70"> </el-table-column>

            <el-table-column label="本季度退出保障对象(人)"
                             prop="reduce"
                             width="70"> </el-table-column>

            <el-table-column label="当年累计新增保障对象(人次)"
                             width="70"> </el-table-column>

            <el-table-column label="当年累计退出保障对象(人次)"
                             width="70"> </el-table-column>
          </el-table-column>
          <!-- 保障资金情况 -->
          <el-table-column label="保障资金情况">
            <el-table-column label="年度预算安排(万元)"
                             width="70"> </el-table-column>
            <el-table-column label="本季度支出保障金(万元)"
                             prop="money"
                             width="70"> </el-table-column>
            <el-table-column label="当年累计支出保障金(万元)"
                             width="70"> </el-table-column>
          </el-table-column>
          <!-- 保障水平 -->
          <el-table-column label="保障水平">
            <el-table-column label="年保障标准(元/年)"
                             prop="jdlkShiBiaoRs"
                             width="70">
            </el-table-column>
            >>>>>>> edae4e1 (完善统计分析的年份选择器样式)
            <el-table-column label="月保障标准(元/月)"
                             prop="jdlkShiBiaoRs"
                             width="70">
            </el-table-column>
            <el-table-column label="本季度末人均月补助(元/月)"
                             prop="jdlkShiBiaoRs"
                             width="70">
            </el-table-column>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
 
<script>
import request from "@/utils/request";
import FileSaver from "file-saver";
import XLSX from "xlsx-style";
import XLSX2 from "xlsx";
// api
import { DBQuarterlyTableApi } from "@/api/dataCentre"
export default {
  name: "dibaoStatistical",
  data () {
    return {
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() < Date.now();
          // return time.getFullYear() < 2022;
        },
      },
      // getSpanArr方法中需要用到的两个属性
      spanArr: [],
      pos: 0,
      tableData: [],
      cityTableTitle: "",
      countryTableTitle: "",
      fromData: {
        type: "农村",  // 户口类型
        quarter: "",  // 第n季度
        year: new Date().Format('yyyy'), // 年份
      },
      cityRoCountry: "农村",
      cityData: [],
      countryData: [],
      loading: false
    };
  },
  created () {
    this.formatQuarter()
    this.DBQuarterlyTable(this.fromData)
  },
  methods: {
    // 进入table数据回显
    async DBQuarterlyTable (data) {
      let type = data.type
      try {
        this.loading = true
        this.fromData.year = new Date(data.year).Format('yyyy')
        await DBQuarterlyTableApi(data)
        this.$message.error("数据请求失败，请稍后重试！")
      } catch (error) {
        if (error && error.response && error.response.data.status == "+OK") {
          if (type == "城市") {
            this.cityData = error.data.data
            this.cityTableTitle = `${data.year}年${data.quarter}${data.type}低保统计分析`
            this.cityRoCountry = "城市"
          } else if (type == "农村") {
            this.countryData = error.data.data
            this.countryTableTitle = `${data.year}年${data.quarter}${data.type}低保统计分析`
            this.cityRoCountry = "农村"
          }
          this.$message.success("数据请求成功")
        }
      } finally {
        this.loading = false
      }
    },
    // 查询
    queryListByCriteria () {
      this.fromData.year = new Date(this.fromData.year).Format('yyyy'),
        this.DBQuarterlyTable(this.fromData)
    },
    resetQuery () {
      this.fromData.type = "农村"
      this.fromData.year = new Date().Format('yyyy')
      this.fromData.quarter = this.formatQuarter()
    },
    // unshift()
    // 向数组的开头添加一个或多个元素，并返回新的数组长度
    loadData () {
      // 数据加载
    },
    //分组排序
    groupBy (data, params) {
      const groups = {};
      data.forEach((v) => {
        // 根据模拟数据 是通过a字段 来分组，获取data中的传入的params属性对应的属性值 ，放入数组中：["2222"]，再将属性值转换为json字符串：'["2222"]'
        const group = JSON.stringify(v[params]);
        // 把group作为groups的key，初始化value，循环时找到相同的v[params]时不变
        groups[group] = groups[group] || [];
        // 将对应找到的值作为value放入数组中
        groups[group].push(v);
      });
      // 返回处理好的二维数组 （如果想返回groupBy形式的数据只返回groups即可）
      console.log(Object.values(groups));
      console.log(groups);
      return Object.values(groups);
    },
    // 写一个getSpanArr(data,params)方法 ：构造一个SpanArr数组赋予rowspan，即控制行合并
    getSpanArr (data, params) {
      let arr = []; //--接收重构数组
      let pos = 0; //--设置索引
      this.spanArr = []; //--控制合并的数组
      this.groupBy(this.tableData, "ab_ex161").map(
        (v) => (arr = arr.concat(v))
      ); //将groupby()处理好的数据再次用arr进行处理：连接所有数组成员为一个新数组
      console.log("arr", arr);
      arr.map((res) => {
        // 每次遍历都删除data && this.tableData 的第一个元素
        data.shift();
        // 每次遍历都将arr数组元素对应push进 data && this.tableData
        data.push(res);
      });
      //  定义一个redata存放arr要合并字段的value
      const redata = arr.map((v) => v[params]);
      redata.reduce((old, cur, i) => {
        // old 上一个元素  cur 当前元素  i 索引
        if (i === 0) {
          // 第一次判断先增加一个 1 占位 ，索引为0
          this.spanArr.push(1);
          pos = 0;
        } else {
          if (cur === old) {
            this.spanArr[pos] += 1;
            this.spanArr.push(0);
          } else {
            this.spanArr.push(1);
            pos = i;
          }

        }
        console.log(cur);
        return cur;
      }, {});
    },
    //定义导出Excel表格事件
    exportExcel () {
      /* 从表生成工作簿对象 */
      let wb = XLSX2.utils.table_to_book(document.querySelector("#mytable"));
      // if(!wb['!merges']){
      //   this.$message.warning('无法导出：报表无数据');
      //   return
      // }
      /* 获取二进制字符串作为输出 */
      var wbout = XLSX2.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
      });

      try {
        for (let key in wb) {
          wb[key].s = {
            alignment: {
              // 文字居中
              horizontal: "center",
              vertical: "center",
              wrap_text: true,
            },
          };
        }
        FileSaver.saveAs(
          //Blob 对象表示一个不可变、原始数据的类文件对象。
          //Blob 表示的不一定是JavaScript原生格式的数据。
          //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
          //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
          new Blob([wbout], { type: "application/octet-stream" }),
          //设置导出文件名称
          "泰州市民政局社会救助季度表.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    //打印页面内容
    printTable () {
      let wpt = document.querySelector("#mytable");
      let newContent = wpt.innerHTML;
      let oldContent = document.body.innerHTML;
      document.body.innerHTML = newContent;
      window.print(); //打印方法
      // window.localtion.reload();
      history.go(0);
      document.body.innerHTML = oldContent;
    },
    formatQuarter () {
      let quarter = Math.floor((new Date().getMonth() + 1) / 3)
      if (quarter === 0) return this.fromData.quarter = "第四季度"
      if (quarter === 1) return this.fromData.quarter = "第一季度"
      if (quarter === 2) return this.fromData.quarter = "第二季度"
      if (quarter === 3) return this.fromData.quarter = "第三季度"
    }
  },
};
</script>
 
 
<style >
.g-box {
  height: 80vh !important;
}
.g-box2 {
  width: 100%;
  height: 100%;
  overflow-y: auto !important;
}
.el-header,
.el-footer {
  border-bottom: 1px solid #ddd;
  color: #333;
  text-align: center;
  line-height: 50px;
  font-size: 30px;
}
/* 取消所有统计表标题超出隐藏省略 */
.oneTh th > .cell,
.oneTh .cell {
  overflow: hidden;
  word-break: normal !important;
  text-overflow: revert !important;
  white-space: normal !important;
}
/* 给表格底部添加边线 */
.el-table__body-wrapper {
  border-bottom: 1px solid #e9e9e9;
}
.yearOption {
  font-size: 14px;
  color: #606266;
}
</style>
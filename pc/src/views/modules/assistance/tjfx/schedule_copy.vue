// 统计分析
<template>
  <div class="g-box">
    <div class="g-box2">
      <el-header>202x年x季度城市低保对象综合统计表</el-header>
      <div style="display: flex; justify-content: space-between">
        <!-- <div style="display: inline-block; width: 200px">
          <span width="10%">填表单位:</span>
          <span width="15%" prop="data">泰州市民政局</span>
          <span></span>
        </div> -->
        <div id="page1" style="width:100% ;height:auto;margin:10px 0;"> 
        <el-form class="searchTj demo-form-inline" >
          <el-form-item class="block" label="选择年份" :inline="true">
            <!-- <span class="demonstration">选择年份：</span> -->
            <el-date-picker  v-model="value1" type="year" :clearable='false' width='200'></el-date-picker>
          </el-form-item>
          <el-form-item label="选择季度" class="block" :inline="true">
            <!-- <span class="demonstration">选择季度：</span> -->
            <el-select  v-model="value3" >
              <el-option value="第一季度" label="第一季度"></el-option>
              <el-option value="第二季度" label="第二季度"></el-option>
              <el-option value="第三季度" label="第三季度"></el-option>
              <el-option value="第四季度" label="第四季度"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择区域" class="block" :inline="true">
            <!-- <span class="demonstration">选择区域：</span> -->
            <el-select  v-model="value4" >
              <el-option value="城市" label="城市"></el-option>
              <el-option value="农村" label="农村"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="line-height:52px;display:inline-block;" >
            <el-button type="primary" @click="queryListByCriteria" 
            icon="el-icon-search" > 查询</el-button>
           
            <el-button type="info" @click="resetQuery" 
            icon="el-icon-refresh" > 重置</el-button >
          </el-form-item>
         
        </el-form>
      </div>
      <!-- <div style="width:100%;height:10px;background-color:#eee"></div> -->
        <div style="display: flex; justify-content: space-between; width: 100px">
          
        
          <el-button
            icon="el-icon-folder-opened"
            type="text"
            size="mini"
            @click="exportExcel"
            >导出</el-button
          >
          <el-button
            icon="el-icon-printer"
            type="text"
            size="mini"
            @click="printTable"
            style="width: 50px"
            >打印</el-button
          >
        </div>
      </div>

      <el-table
        class="oneTh"
        :data="tableData"
        border
        height="87%"
        id="mytable"
        style="width: auto"
      >
        <!-- <el-table-column prop="ab_ex161" label="202x年x季度城市低保对象综合统计表" style="display:none" width="100"> -->
        <el-table-column prop="ab_ex161" label="地区" width="100">
        </el-table-column>
        <el-table-column prop="ab_ex2" label="非农人口总数（人）" width="100">
        </el-table-column>
        <el-table-column prop="ab_ex2" label="低保对象占非农人口比例(%)" width="80">
        </el-table-column>
        <el-table-column prop="ab_ex2" label="低保户数（户）" width="100">
        </el-table-column>
        <!-- 预警信息 -->
        <el-table-column label="当月低保对象人数（人）">
          <el-table-column label="人数" width="60" prop="qzsqRs">
          </el-table-column>

          <el-table-column label="女性" width="60" prop="qzsqRs">
          </el-table-column>

          <el-table-column label="残疾人" width="60" prop="qzsqRs">
          </el-table-column>

          <el-table-column label="单人保" width="60" prop="qzsqRs">
          </el-table-column>
        </el-table-column>
        <el-table-column
          label="累计低保对象人数（万人）"
          width="100"
          prop="qzsqRs"
        >
        </el-table-column>

        <el-table-column label="低保对象类别（人）" width="150">
          <el-table-column label="老年人" prop="jdlkShiBiaoRs" width="80">
          </el-table-column>

          <el-table-column label="成年人">
            <el-table-column label="在职人员" prop="jdlkShiBiaoRs" width="80">
            </el-table-column>
            <el-table-column label="灵活就业" prop="jdlkShiBiaoRs" width="80">
            </el-table-column>
            <el-table-column label="登记失业" prop="jdlkShiBiaoRs" width="80">
            </el-table-column>
            <el-table-column label="未登记失业" prop="jdlkShiBiaoRs" width="80">
            </el-table-column>
          </el-table-column>

          <el-table-column label="未成年人">
            <el-table-column label="在校生" prop="jdlkShiBiaoRs" width="80">
            </el-table-column>
            <el-table-column label="其他" prop="jdlkShiBiaoRs" width="80">
            </el-table-column>
          </el-table-column>
          <el-table-column label="80岁以上">
            <el-table-column label="人数" prop="jdlkShiBiaoRs" width="80">
            </el-table-column>
          </el-table-column>
        </el-table-column>

        <el-table-column label="累计资金支出数（万元）" width="140">
        </el-table-column>

        <el-table-column label="1-当月人均补助水平（元）" width="140">
        </el-table-column>

        <el-table-column label="补助标准（元）" prop="jdlkShiBiaoRs" width="80">
        </el-table-column>
        <!-- </el-table-column>  -->
      </el-table>

      <el-header style="width: auto; margin-top: 50px" >江苏省农村居民最低生活保障情况统计表</el-header>
      <div style="display: flex; justify-content: space-between">
        <div style="display: inline-block; width: 200px">
          <span width="10%">填表单位:</span>
          <span width="15%" prop="data">泰州市民政局</span>
          <span></span>
        </div>
        <div style="display: inline-block; width: 200px">
          <span width="10%">填表人:</span>
          <span width="15%" prop="data">XXX</span>
          <span></span>
        </div>
        <div style="display: flex; justify-content: space-between; width: 100px" >
          <el-button icon="el-icon-folder-opened" type="text" size="mini" @click="exportExcel" >导出</el-button>
          <el-button icon="el-icon-printer" type="text" size="mini" @click="printTable" style="width: 50px" >打印</el-button>
        </div>
      </div>

      <el-table fit :data="tableData" border height="87%" id="mytable">
        <el-table-column
          prop="ab_ex161"
          label="202X年X季度农村居民最低生活保障统计表"
          style="display: none"
          width="100"
        >
          <el-table-column prop="ab_ex161" label="地区" width="100">
          </el-table-column>
          <!-- 基本保障情况 -->
          <el-table-column label="基本保障情况">
            <el-table-column prop="ab_ex2" label="本季度末保障户数" width="100">
            </el-table-column>
            <el-table-column prop="ab_ex2" label="本季度末保障人数" width="100">
            </el-table-column>
            <el-table-column prop="ab_ex2" label="当地农村人口" width="100">
            </el-table-column>
            <el-table-column
              prop="ab_ex2"
              label="保障人数农村人口占比"
              width="100"
            >
            </el-table-column>
          </el-table-column>
          <!-- 保障对象分类 -->
          <el-table-column label="保障对象分类">
            <el-table-column label="按年龄划分" width="100">
              <el-table-column label="老年人" prop="qzsqRs" width="100">
              </el-table-column>
              <el-table-column label="成年人" prop="qzsqRs" width="100">
              </el-table-column>
              <el-table-column label="未成年人" prop="qzsqRs" width="100">
              </el-table-column>
            </el-table-column>

            <el-table-column label="按类别划分">
              <el-table-column label="女性" prop="jdlkShengBiaoRs" width="100">
              </el-table-column>

              <el-table-column label="残疾人"> </el-table-column>
            </el-table-column>

            <el-table-column label="按单人保划分" width="100">
              <el-table-column label="重病患者"> </el-table-column>

              <el-table-column label="残疾人"> </el-table-column>
            </el-table-column>
          </el-table-column>
          <!-- 动态管理 -->
          <el-table-column label="动态管理" width="100">
            <el-table-column label="本季度新增保障对象"> </el-table-column>

            <el-table-column label="本季度退出保障对象"> </el-table-column>

            <el-table-column label="当年累计新增保障对象"> </el-table-column>

            <el-table-column label="当年累计退出保障对象"> </el-table-column>
          </el-table-column>
          <!-- 保障资金情况 -->
          <el-table-column label="保障资金情况" width="100">
            <el-table-column label="年度预算安排"> </el-table-column>

            <el-table-column label="本季度支出保障金"> </el-table-column>

            <el-table-column label="当年累计支出保障金"> </el-table-column>
          </el-table-column>
          <!-- 保障水平 -->
          <el-table-column label="保障水平">
            <el-table-column label="年保障标准">
              <!-- <el-table-column  label="元/年" prop="jdlkShiBiaoRs" width="80">
                            </el-table-column> -->
            </el-table-column>

            <el-table-column label="月保障标准">
              <!-- <el-table-column  label="元/月" prop="jdlkShiBiaoRs" width="80">
                            </el-table-column> -->
            </el-table-column>

            <el-table-column label="本季度末人均月补助">
              <!-- <el-table-column  label="元/月" prop="jdlkShiBiaoRs" width="80">
                            </el-table-column> -->
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
export default {
  name: "QuarterlyTable",
  data() {
    return {
      // getSpanArr方法中需要用到的两个属性
      spanArr: [],
      pos: 0,

      tableData: [],

      mergeColumns: [{ index: 1, name: "ab_ex161" }],
    };
  },
  created() {
    this.loadData();
    // this.groupBy(this.tableData,"ab_ex161");
  },
  methods: {
    // unshift()
    // 向数组的开头添加一个或多个元素，并返回新的数组长度

    loadData() {
      // 数据加载
    },

    //分组排序
    groupBy(data, params) {
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
    getSpanArr(data, params) {
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
    exportExcel() {
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
    printTable() {
      let wpt = document.querySelector("#mytable");
      let newContent = wpt.innerHTML;
      let oldContent = document.body.innerHTML;
      document.body.innerHTML = newContent;
      window.print(); //打印方法
      // window.localtion.reload();
      history.go(0);
      document.body.innerHTML = oldContent;
    },
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
.oneTh {
  /* border:1px solid #333; */
}
/* .oneTh tbody > tr:nth-child(1) {
    background-color: rgb(223, 227, 240);
    font-size: 13px !important;
    font-weight: 600;
} */
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
</style>
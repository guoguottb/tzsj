
<template>
  <div class="g-box">
    <!-- 查询 -->
    <div class="search">
      <el-form :inline="true"
               :model="searchData"
               class="demo-form-inline">

        <el-form-item label-width="110px"
                      label="行政区划">
          <el-cascader :props="props"
                       v-model="xzqhArray"
                       clearable
                       placeholder="行政区划"></el-cascader>
        </el-form-item>

        <el-form-item label-width="110px"
                      label="儿童救助类型">
          <el-select v-model="searchData.childType"
                     placeholder="儿童救助类型">
            <el-option v-for="(item3,index3) in options"
                       :key="index3"
                       :label="item3.label"
                       :value="item3.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label-width="110px">
          <el-button type="primary"
                     @click="queryListByCriteria"
                     icon="el-icon-search">
            查询</el-button>
          <el-button type="info"
                     @click="resetQuery"
                     icon="el-icon-refresh">
            重置</el-button>
          <!-- </div> -->
        </el-form-item>
      </el-form>
    </div>

    <!-- 表格 -->
    <el-table ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              border
              style="width: 100%;"
              @selection-change="handleSelectionChange"
              height="100%"
              v-loading="loading"> 
      <el-table-column type="selection"
                       width="40"> </el-table-column>
      <el-table-column label="id"
                       width='90'>
        <template slot-scope="{row}">
          <p :title="row.id"
             class="ellipsis">{{row.id}}</p>
        </template>
      </el-table-column>
      <el-table-column label="儿童姓名"
                       width="100">
        <template slot-scope="{row}">
          <p :title="row.childName"
             class="ellipsis">{{row.childName}}</p>
        </template>
      </el-table-column>
      <el-table-column label="儿童身份证"
                       width="150">
        <template slot-scope="{row}">
          <p :title="row.childIdCard"
             class="ellipsis">{{row.childIdCard}}</p>
        </template>
      </el-table-column>
      <el-table-column label="儿童救助类型">
        <template slot-scope="{row}">
          <p :title="row.childType"
             class="ellipsis">{{row.childType}}</p>
        </template>
      </el-table-column>
      <el-table-column label="区县">
        <template slot-scope="{row}">
          <p :title="row.district"
             class="ellipsis">{{row.district}}</p>
        </template>
      </el-table-column>
      <el-table-column label="街道">
        <template slot-scope="{row}">
          <p :title="row.townStreet"
             class="ellipsis">{{row.townStreet}}</p>
        </template>
      </el-table-column>
      <el-table-column label="评估人员">
        <template slot-scope="{row}">
          <p :title="row.name"
             class="ellipsis">{{row.name}}</p>
        </template>
      </el-table-column>
      <el-table-column label="评估分数">
        <template slot-scope="{row}">
          <p :title="row.score"
             class="ellipsis">{{row.score}}</p>
        </template>
      </el-table-column>
      <el-table-column label="评估等级">
        <template slot-scope="{row}">
          <p :title="row.level"
             class="ellipsis">{{row.level}}</p>
        </template>
      </el-table-column>
      <el-table-column label="评估时间"
                       width="150">
        <template slot-scope="{row}">
          <p :title="row.evaluateTime"
             class="ellipsis">{{row.evaluateTime}}</p>
        </template>
      </el-table-column>

      <el-table-column prop="active"
                       label="操作"
                       width="150"
                       fixed="right">
        <template slot-scope="scope">
          <el-button-group :inline="true"
                           style=" width=100% ">
            <!-- <el-button  @click="handleClick(scope.row,'查看')" type="primary" size="small">查看</el-button> -->
            <el-button @click="handleClick(scope.row,'查看评估报告')"
                       type="primary"
                       size="small">查看评估报告</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页-->
    <div class="block footer">
      <el-pagination background
                     layout="total, sizes, prev, pager, next, jumper"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="pageNo"
                     :page-size="pageSize"
                     :total="totalElements">
      </el-pagination>
    </div>

    <!-- 儿童评估记录弹框 -->
    <el-dialog title="儿童评估记录"
               :visible.sync="dialogVisible"
               width="80%"
               :before-close="handleClose"
               height="85VH"
               top="5vh">
      <iframe :src="src"
              style="width: 100%; height: 74vh"
              id="iframe1"
              padding="0"
              frameborder="no"
              border="0"
              marginwidth="0"
              marginheight="0"></iframe>
    </el-dialog>
  </div>
</template>
<script>
// import commonList from "../commonList";
import request from "@/utils/request";
import { Loading } from "element-ui";
export default {
  name: 'yjptsz',
  data () {
    return {
      src: '',//儿童评估报告
      searchData: {
        administrativeDivision: "",//儿童行政区划,例：市区#街镇#村居
        childType: "",              //儿童救助类型
        notNeedPage: true,          //是否不需要分页
        pageNo: 1,                  //第几页,默认从1开始
        pageSize: 20,                //每页几条
        sortField: "",              //排序字段
      },

      dialogVisible: false,  //评估任务生成弹框显示
      tableData: [         //列表数据

        {
          id: 0,                  //  评估id
          childIdCard: "",        //	儿童身份证
          childName: "",          //  儿童姓名
          childType: "",          //  儿童救助类型
          district: "",           //  区县
          townStreet: "",         //  街道
          name: "",               //  评估人员
          evaluateTime: "",       //  评估时间
        },

      ],

      pageNo: 1, //当前页
      pageNum: "1",
      pageSize: 20,
      totalElements: 13, //总数
      loading: true,

      // 新增、修改评估任务弹框内容
      taskArr: [
        {
          title: '',                       //任务标题
          administrativeDivisions: [],     //评估范围
          evaluateSubject: '',             //评估主体
          evaluatorIds: [],                //评估人员

        }
      ],
      options: [
        {
          value: '孤儿',
          label: '孤儿'
        }, {
          value: '事实无人抚养',
          label: '事实无人抚养'
        }, {
          value: '重病重残',
          label: '重病重残'
        }, {
          value: '贫困家庭',
          label: '贫困家庭'
        }, {
          value: '其他',
          label: '其他'
        }, {
          value: '未知',
          label: '未知'
        }
      ],

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
          request({
            url: "/social/assistance/getCityOption",
            method: "post",
            data: {
              pId: pId,
            },
          })
            .then((res) => { })
            .catch((res) => {
              // console.log(res);
              // console.log(res,"city");
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
    };
  },

  components: {
    // commonList,
  },
  created () {
    this.loadData()
  },
  methods: {


    // 派发事件
    pgPF () {
      this.dialogVisible = true;
    },

    // 关闭弹框
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },


    // 换页
    handleSizeChange (val) {
      this.pageSize = val;
      this.loadData();
      console.log(`每页 ${val} 条`);
    },
    // 跳页
    handleCurrentChange (val) {
      this.pageNo = val
      this.loadData();
      console.log(`当前页: ${val}`);
    },

    // 查询
    queryListByCriteria () {
      console.log(this.xzqhArray);
      if (this.xzqhArray.length > 0) {

        let xaqhStr = ''
        for (let i in this.xzqhArray) {
          if (i != this.xzqhArray.length - 1) {

            xaqhStr += this.xzqhArray[i].split('#')[0] + '#';
          } else {

            xaqhStr += this.xzqhArray[i].split('#')[0];
          }
        }
        this.searchData.administrativeDivision = xaqhStr
        // console.log(xaqhStr);
        // console.log(1121);
      }

      console.log(this.searchData);
      this.pageNo = 1;
      this.loadData();

    },
    // 重置
    resetQuery () {
      this.searchData = ''
    },

    // 复选
    handleSelectionChange (val) {
      // this.multipleSelection = val;
    },

    // 操作按钮
    handleClick (data, key) {
      console.log(data);

      if (key == '查看评估报告') {
        this.getReportPdf({ id: data.reportId }

        ).then(res => {
          console.log(res, 'getReportPdf-then');

        }).catch(res => {

          if (res.response.data.status == '+OK') {
            this.src = "data:application/pdf;base64," + res.response.data.data;
            this.dialogVisible = true;

          } else if (res.response.data.status == '+ERR') {

            this.$message.error(res.response.data.msg)

          } else {

            // this.$message.error(res.response.data.msg)
            this.$message.error('网络错误')

          }
          console.log(res.response.data, 'getReportPdf-catch');
        })
      }

      // console.log(data);
    },
    loadData () {


      this.getRecordList(
        this.searchData
      ).then(res => {
        console.log(res, 'then');

      }).catch(res => {
        console.log(res.response.data.data.content, 'catch');
        this.tableData = res.response.data.data.content
        this.loading = false;
      })

      // this.loading = false;
    },


    // 四色评估记录列表--已完成
    getRecordList (data) {
      return request({
        headers: {
          Accept: "application/json",
        },
        url: "/social/childEvaluate/getRecordList",
        method: "post",
        data: data,
      });
    },

    getReportPdf (data) {
      return request({
        headers: {
          Accept: "application/json",
        },
        url: "/social/childEvaluate/getReportPdf",
        method: "post",
        data: data,
      })
    },
  }
};
</script>
<style scoped>
.g-box {
  display: flex;
  /* width: 100%; */
  height: 80vh;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
}
.search {
  display: flex;
}

.search .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 240px !important;
}

.demonstration {
  font-size: 14px;
  color: #606266;
}

.block {
  margin-right: 10px;
}
.footer {
  height: 50px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  padding-top: 10px;
  text-align: right;
  padding-right: 30px;
  /*background:#f9f9f9;*/
  background: #fff;
  border-top: 1px solid #ddd;
}

.content {
  max-height: 500px;
  overflow: auto;
}
.Card {
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
}
</style>
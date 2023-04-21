<template>
  <div class="g-box">
    <!-- 查询 -->
    <div class="search">
      <el-form :inline="true"
               :model="searchData"
               class="demo-form-inline">
        <el-form-item label-width="110px"
                      label="姓名">
          <!-- <div class="block"> -->
          <!-- <span class="demonstration">姓名：</span> -->
          <el-input v-model="searchData.name"
                    placeholder="姓名"
                    style="width: 180px"></el-input>
          <!-- </div> -->
        </el-form-item>

        <el-form-item label-width="110px"
                      label="身份证">

          <!-- <div class="block"> -->
          <!-- <span class="demonstration">身份证：</span> -->
          <el-input v-model="searchData.idCard"
                    placeholder="身份证"
                    style="width: 180px"></el-input>
          <!-- </div> -->
        </el-form-item>
        <el-form-item label-width="110px"
                      label="数据来源">
          <!-- <div class="block"> -->
          <!-- <span class="demonstration">数据来源：</span> -->
          <el-input v-model="searchData.source"
                    placeholder="数据来源"
                    style="width: 180px"></el-input>
          <!-- </div> -->
        </el-form-item>
        <el-form-item label-width="110px"
                      label="行政区划">
          <!-- <div class="block"> -->
          <!-- <span class="demonstration">行政区划：</span> -->
          <el-cascader :props="props"
                       v-model="xzqhArray"
                       clearable
                       placeholder="行政区划"></el-cascader>
          <!-- </div> -->
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
              style="width: 100%"
              @selection-change="handleSelectionChange"
              height="100%"
              v-loading="loading">
      <el-table-column type="selection"
                       width="55px"> </el-table-column>
      <el-table-column label="预警规则名称">
        <template slot-scope="{row}">
          <p :title="row.ruleName"
             class="ellipsis">{{row.ruleName}}</p>
        </template>
      </el-table-column>
      <el-table-column label="区县（市）">
        <template slot-scope="{row}">
          <p :title="row.district"
             class="ellipsis">{{row.district}}</p>
        </template>
      </el-table-column>
      <el-table-column label="街镇">
        <template slot-scope="{row}">
          <p :title="row.townStreet"
             class="ellipsis">{{row.townStreet}}</p>
        </template>
      </el-table-column>
      <el-table-column label="村居">
        <template slot-scope="{row}">
          <p :title="row.village"
             class="ellipsis">{{row.village}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="idCard"
                       label="身份证">
        <template slot-scope="{row}">
          <p :title="row.idCard"
             class="ellipsis">{{row.idCard}}</p>
        </template>
      </el-table-column>
      <el-table-column label="姓名"
                       width="120px">
        <template slot-scope="{row}">
          <p :title="row.name"
             class="ellipsis">{{row.name}}</p>
        </template>
      </el-table-column>
      <el-table-column label="来源">
        <template slot-scope="{row}">
          <p :title="row.source"
             class="ellipsis">{{row.source}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="active"
                       label="操作"
                       width="200px">
        <template slot-scope="scope">
          <el-button-group style=" width=100% ">
            <!-- <el-button @click="handleClick(scope.row,'查看')" type="primary" size="small">查看</el-button> -->
            <el-button @click="handleClick(scope.row ,'派发')"
                       type="danger"
                       size="small">派发</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="block footer">
      <el-pagination background
                     layout="total, sizes, prev, pager, next, jumper"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="page"
                     :page-size="pageSize"
                     :total="totalElements">
      </el-pagination>
    </div>

    <el-dialog title="派发预警类别"
               :visible.sync="dialogFormVisible">
      <span style="font-size:17px">请选择一种派发预警类型</span>
      <el-form :model="form">
        <!-- <el-form-item label="派发类型" prop="resource"> -->
        <el-form-item prop="distribute">
          <el-radio-group v-model="form.distribute"
                          class="radio-group">
            <el-radio label="主动排查"></el-radio>
            <el-radio label="建档立卡预警"></el-radio>
            <el-radio label="医保预警"></el-radio>
            <el-radio label="市团委预警"></el-radio>
            <el-radio label="12345涉救预警"></el-radio>
            <el-radio label="水电预警"></el-radio>
            <el-radio label="住房预警"></el-radio>
            <el-radio label="消防预警"></el-radio>
            <el-radio label="物价预警"></el-radio>
            <el-radio label="教育预警"></el-radio>
            <el-radio label="妇联预警"></el-radio>
            <el-radio label="涉农预警"></el-radio>
            <el-radio label="党团委预警"></el-radio>
            <el-radio label="残联预警"></el-radio>
            <el-radio label="慈善预警"></el-radio>
            <el-radio label="卫建委预警"></el-radio>
            <el-radio label="应急灾害预警"></el-radio>
            <el-radio label="就业预警"></el-radio>
            <el-radio label="下方职工预警"></el-radio>
            <el-radio label="其他预警"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="closeView">取 消</el-button>
        <el-button type="primary"
                   @click="saveHDType">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import request from "@/utils/request";
export default {
  data () {
    return {
      tableData: [], //列表数据
      checkData: {},   //选中数据
      page: 1, //当前页
      pageNum: "1",
      pageSize: 20,
      totalElements: null, //总数
      loading: true,
      searchData: {
        name: '',
        divisionCode: '',
        idCard: '',
        source: '',
        pageNo: '1',
        sortField: '',//排序
        pageSize: '', //每页几条
      },
      form: {
        distribute: '' //派发
      },

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

      dialogFormVisible: false,
    };
  },

  components: {
    // commonList,
  },
  created () {
    this.loadData()
  },
  methods: {

    // 派发
    saveHDType () {

      this.form.distribute = this.form.distribute == '建档立卡预警' ? '预警推送' : this.form.distribute;
      this.form.distribute = this.form.distribute == '医保预警' ? '医疗推送' : this.form.distribute;
      this.form.distribute = this.form.distribute == '团市委预警' ? '团市委梦想改造' : this.form.distribute;
      this.form.distribute = this.form.distribute == '12345涉救预警' ? '市长热线涉救' : this.form.distribute;
      this.form.distribute = this.form.distribute == '水电预警' ? '水电减免' : this.form.distribute;
      this.form.distribute = this.form.distribute == '住房预警' ? '住房补助' : this.form.distribute;
      this.form.distribute = this.form.distribute == '消防预警' ? '消防反馈' : this.form.distribute;
      this.form.distribute = this.form.distribute == '物价预警' ? '物价补贴' : this.form.distribute;

      let data = {}
      data.id = this.checkData.id;
      data.type = this.form.distribute;

      console.log(data);

      request({
        headers: {
          Accept: "application/json",
        },
        url: "/social/bigDataWarn/prePareDistribution",
        method: "post",
        data: data,
      }).then(res => {
        console.log(res, 'then');
      }).catch(res => {
        if (res.response.data.status == '+OK') {
          this.$message.success(res.response.data.msg);
          this.loadData();
        } else {
          this.$message.error(res.response.data.msg);

        }
      });


      this.dialogFormVisible = false;

    },
    // 关闭弹框
    closeView () {
      this.dialogFormVisible = false;
    },
    // 每页条数
    handleSizeChange (val) {
      this.pageSize = val;
      this.loadData();
      console.log(`每页 ${val} 条`);
    },
    // 跳页
    handleCurrentChange (val) {
      this.page = val
      // this.searchData.pageNo = this.page+'';
      this.loadData();
      console.log(`当前页: ${val}`);
    },

    // 查询
    queryListByCriteria () {
      console.log(this.searchData, "查询", this.xzqhArray)
      // this.page = 1;
      // this.loadData();
    },
    // 重置
    resetQuery () {
      this.searchData = {
        name: '',
        idCard: '',
        source: '',
      }
      this.xzqhArray = [];
      this.loadData();
    },

    // 复选
    handleSelectionChange (val) {
    },

    // 操作按钮
    handleClick (data, key) {
      this.checkData = {};

      if (key == '查看') {

      } else if (key == '派发') {
        this.dialogFormVisible = true;
        this.checkData = data;
      }
      console.log(data, key);
    },
    loadData () {
      this.loading = true;
      this.yclList({
        name: this.searchData.name,
        divisionCode: this.searchData.divisionCode,
        idCard: this.searchData.idCard,
        source: this.searchData.source,
        sortField: this.searchData.sortField,
        pageSize: this.searchData.pageSize,
        pageNo: this.page + '',
      }).then((res) => {
        console.log(res, 'then');
      }).catch((res) => {
        console.log(res.response.data, 'catch');
        if (res.response.data.status == '+OK') {
          this.tableData = res.response.data.data.content
          this.totalElements = res.response.data.data.totalElements
          this.loading = false;
        } else {
          this.$message.error('网络错误');
          this.loading = false;
        }
      })
    },

    // 预处理列表
    yclList (data) {
      return request({
        headers: {
          Accept: "application/json",
        },
        url: "/social/bigDataWarn/getWarnPrePareList",
        method: "post",
        data: data,
      });
    },
  }
};
</script>
<style scoped lang="less">
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
:deep(.radio-group .el-radio__label) {
  display: inline-block;
  width: 150px;
  margin: 10px 0 0 0;
}
.radio-group {
  margin-top: 10px;
}

/deep/.has-gutter th {
  text-align: center !important;
}
/deep/ .el-table__row td {
  text-align: center !important;
}
</style>
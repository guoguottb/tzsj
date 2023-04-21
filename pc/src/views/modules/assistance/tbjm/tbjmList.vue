// 提交金民数据的页面
<template>
  <div class="g-box">
    <!-- 查询 -->
    <div class="search">
      <el-form :inline="true"
               class="demo-form-inline">
        <el-form-item label="户主姓名">
          <el-input v-model="axdf0002"
                    placeholder="户主姓名"></el-input>
        </el-form-item>
        <el-form-item label="户主身份证">
          <el-input v-model="axdf0004"
                    placeholder="户主身份证"></el-input>
        </el-form-item>
        <el-form-item label="救助类型">
          <!-- <el-input v-model="abax6002" placeholder="救助类型"></el-input> -->
          <el-select v-model="abax6002"
                     placeholder="请选择救助类型"
                     style="width:100%">
            <el-option label="城市最低生活保障"
                       value="110"></el-option>
            <el-option label="农村最低生活保障"
                       value="120"></el-option>
            <!-- <el-option label="特困人员救助供养" value="130"></el-option> -->
            <el-option label="城市特困人员救助供养"
                       value="131"></el-option>
            <el-option label="农村特困人员救助供养"
                       value="132"></el-option>
            <el-option label="临时救助"
                       value="500"></el-option>
            <el-option label="居民最低生活保障边缘救助"
                       value="600"></el-option>
            <el-option label="支出型困难人口救助"
                       value="650"></el-option>
            <!-- <el-option label="其他低收入人口救助" value="660"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="待遇开始年月">
          <el-input v-model="abaf0028"
                    placeholder="yyyymm格式"></el-input>
        </el-form-item>
        <el-form-item label="待遇结束年月">
          <el-input v-model="abaf0029"
                    placeholder="yyyymm格式"></el-input>
        </el-form-item>
        <el-form-item label="注销时间">
          <el-date-picker v-model="cancelDate"
                          type="date"
                          placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="queryListByCriteria"
                     icon="el-icon-search">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="info"
                     @click="resetQuery"
                     icon="el-icon-refresh">
            重置</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="disposeJMDatedialogVisible = true">
            处理金民数据</el-button>
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
                       width="55"> </el-table-column>
      <el-table-column prop="axdf0002"
                       label="户主姓名">
        <template slot-scope="{row}">
          <p :title="row.axdf0002"
             class="ellipsis">{{row.axdf0002}}</p>
        </template>
      </el-table-column>
      <el-table-column label="户主身份证号"
                       width="180">
        <template slot-scope="{row}">
          <p :title="row.axdf0004"
             class="ellipsis">{{row.axdf0004}}</p>
        </template>
      </el-table-column>
      <el-table-column label="居住地址"
                       width="180">
        <template slot-scope="{row}">
          <p :title="row.axdf0008"
             class="ellipsis">{{row.axdf0008}}</p>
        </template>
      </el-table-column>
      <el-table-column label="户籍地址"
                       width="180">
        <template slot-scope="{row}">
          <p :title="row.abaf0004"
             class="ellipsis">{{row.abaf0004}}</p>
        </template>
      </el-table-column>
      <el-table-column label="家庭人口数"
                       width="100">
        <template slot-scope="{row}">
          <p :title="row.axdf0005"
             class="ellipsis">{{row.axdf0005}}</p>
        </template>
      </el-table-column>
      <el-table-column label="救助类型"
                       width="180">
        <template slot-scope="{row}">
          <p :title="row.abax6002"
             class="ellipsis">{{row.abax6002}}</p>
        </template>
      </el-table-column>
      <el-table-column label="救助开始年月"
                       width="120">
        <template slot-scope="{row}">
          <p :title="row.abaf0028"
             class="ellipsis">{{row.abaf0028}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="abaf0029"
                       label="救助结束年月"
                       width="120">
        <template slot-scope="{row}">
          <p :title="row.abaf0029"
             class="ellipsis">{{row.abaf0029}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="azzx0014"
                       label="数据更新时间"
                       width="180">
        <template slot-scope="{row}">
          <p :title="row.azzx0014 | formatDate"
             class="ellipsis">{{row.azzx0014 | formatDate}}</p>
        </template>
      </el-table-column>
      <el-table-column label="申请原因"
                       width="180">
        <template slot-scope="{row}">
          <p :title="row.abaf0005"
             class="ellipsis">{{row.abaf0005}}</p>
        </template>
      </el-table-column>
      <el-table-column label="财产总额">
        <template slot-scope="{row}">
          <p :title="row.abaf0022"
             class="ellipsis">{{row.abaf0022}}</p>
        </template>
      </el-table-column>
      <el-table-column label="所属地区区划编码"
                       width="150">
        <template slot-scope="{row}">
          <p :title="row.abax9999"
             class="ellipsis">{{row.abax9999}}</p>
        </template>
      </el-table-column>
      <el-table-column label="联系电话"
                       width="120">
        <template slot-scope="{row}">
          <p :title="row.axdf0011"
             class="ellipsis">{{row.axdf0011}}</p>
        </template>
      </el-table-column>
      <el-table-column fixed="right"
                       label="操作"
                       width="100">
        <template slot-scope="{row}">
          <el-button @click="operateButton(row,'注销')"
                     type="danger">注销</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block footer">
      <!-- <span class="demonstration">完整功能</span> -->
      <el-pagination background
                     layout="total, sizes, prev, pager, next, jumper"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="pageNo"
                     :page-size="pageSize"
                     :total="count">
      </el-pagination>
    </div>
    <!-- 处理金民数据dialog -->
    <el-dialog title="提示"
               :visible.sync="disposeJMDatedialogVisible"
               width="30%"
               :before-close="handleClose">
      <el-form :model="disposeForm"
               ref="disposeForm"
               label-width="120px">
        <el-form-item label="金民变更ID">
          <el-input v-model="disposeForm.abaf2701"
                    placeholder="请输入金民变更ID"></el-input>
        </el-form-item>
        <el-form-item label="校验时间"
                      :rules="[ { required: true, message: '请选择校验时间', trigger: 'blur' }]">
          <el-date-picker v-model="disposeForm.time"
                          type="date"
                          placeholder="选择日期">
          </el-date-picker>
          <!-- <el-select v-model="disposeForm.abaf2701"
                     placeholder="请选择活动区域">
            <el-option label="区域一"
                       value="shanghai"></el-option>
            <el-option label="区域二"
                       value="beijing"></el-option>
          </el-select> -->
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary"
                   @click="affirmDisposeForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// import commonList from "../commonList";
import request from "@/utils/request";
import {
  directCancelFamilyApi,  // 注销操作按钮
  jmCheckApi,   // 处理金民数据
} from "@/api"
import dayjs from "dayjs"
export default {
  data () {
    return {
      tableData: [],	 //列表数据
      // value1: ['',''], //
      // value2: '',
      count: null, 	 //总数
      loading: true,	 //加载状态
      //请求参数------- 
      abaf0028: '', 	//开始年月 
      abaf0029: '',	//结束年月
      abax6002: '',	//业务编码
      axdf0002: '',	//户主姓名
      axdf0004: '',	//户主身份证
      pageNo: 1,		//第几页
      pageSize: 20,	//每页条数
      cancelDate: new Date(),	// table中的注销按钮
      disposeJMDatedialogVisible: false,
      disposeForm: {
        time: "",
        abaf2701: ""
      }
    };
  },

  components: {
    // commonList,
  },
  created () {
    this.loadData()
  },
  methods: {
    loadData () {
      let queryData = {
        abaf0028: this.abaf0028,
        abaf0029: this.abaf0029,
        axdf0002: this.axdf0002,
        abax6002: this.abax6002,	//业务编码
        axdf0004: this.axdf0004,
        pageNo: this.pageNo + '',
        pageSize: this.pageSize + '',
      };
      this.loading = true;
      this.jmList(queryData)
        .then((res) => {
          console.log(res, 'then');
        }).catch((res) => {
          console.log(res.response.data, 'catch');
          // this.tableData = JSON.parse(JSON.stringify(res.response.data.content) ) 
          this.tableData = res.response.data.data.content;
          console.log(this.tableData);

          this.count = res.response.data.data.totalElements
          this.loading = false;
        })
    },
    // 金民救助基本信息列表
    jmList (data) {
      return request({
        headers: {
          Accept: "application/json",
        },
        // url: "/social/assistance/jmList",
        url: "/social/baf01/getList",
        method: "post",
        data: data,
      });


    },
    // 每页数据条数修改
    handleSizeChange (val) {
      this.pageSize = val;
      this.loadData();
      console.log(`每页 ${val} 条`);
    },
    // 页面输入跳转
    handleCurrentChange (val) {
      this.pageNo = val
      this.loadData();
      console.log(`当前页: ${val}`);
    },
    // 查询
    queryListByCriteria () {
      this.pageNo = 1;
      this.loadData();
    },
    // 重置
    resetQuery () {
      // this.value1=['',''];
      this.abaf0028 = ''	//开始年月 
      this.abaf0029 = ''	//结束年月
      this.abax6002 = ''	//业务编码
      this.axdf0002 = ''	//户主姓名
      this.axdf0004 = ''	//户主身份证
    },
    // 多选框
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    // 操作按钮
    operateButton (row, val) {
      console.log(row, val);
      if (val === '注销') {
        if (!this.cancelDate) return this.$message.warning("请选择注销时间！")
        return this.directCancelFamily(row.id, dayjs(this.cancelDate).format("YYYY-MM-DD HH:mm:ss"))
      }
    },
    // table 注销操作按钮
    async directCancelFamily (id, monthTime) {
      try {
        await directCancelFamilyApi(id, monthTime)
      } catch (error) {
        if (error && error.response.data.status === "+OK") {
          this.loadData()
          return this.$message.success(error.response.data.msg)
        }
        this.$message.error(error.response.data.msg)
      }
    },
    // 处理金民数据dialog 关闭前
    handleClose () {
      this.disposeJMDatedialogVisible = false
      this.disposeForm = {
        time: "",
        abaf2701: ""
      }
    },
    //处理金民数据dialog 确认按钮
    affirmDisposeForm () {
      if (!this.disposeForm.time) return this.$message.warning("请选择校验时间")
      this.jmCheck({
        time: dayjs(this.disposeForm.time).format("YYYY-MM-DD HH:mm:ss"),
        abaf2701: this.disposeForm.abaf2701
      })
    },
    // 处理金民数据 接口
    async jmCheck (data) {
      try {
        await jmCheckApi(data)
      } catch (error) {
        if (error && error.response.data.code === 200) {
          this.$message.success(error.response.data.msg)
          this.handleClose()
          return
        }
        this.$message.error(error.response.data.msg)
      }
    }
  }
};
</script>
<style scoped lang="less">
.g-box {
  display: flex;
  width: 100%;
  height: 80vh;
  flex-direction: column;
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
  margin-right: 20px;
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
/deep/.has-gutter th {
  text-align: center !important;
}
/deep/ .el-table__row td {
  text-align: center !important;
}
</style>
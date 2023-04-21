<template>
  <div class="g-box">
    <div class="topSearchBox">
      <el-form :inline="true"
               :model="formInline"
               class="demo-form-inline"
               ref="form">
        <el-form-item label="用户姓名">
          <el-input v-model.trim="formInline.username"
                    placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model.trim="formInline.userID"
                    placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="核对类型">
          <el-select v-model="checkClass"
                     placeholder="请选择核对类型">
            <el-option label="低保边缘"
                       value="低保边缘"></el-option>
            <el-option label="低保外一户多残依老养残"
                       value="低保外一户多残依老养残"></el-option>
            <el-option label="临时救助"
                       value="临时救助"></el-option>
            <el-option label="其他"
                       value="其他"></el-option>
            <el-option label="特困人员供养"
                       value="特困人员供养"></el-option>
            <el-option label="支出型困难"
                       value="支出型困难"></el-option>
            <el-option label="住房救助"
                       value="住房救助"></el-option>
            <el-option label="最低生活保障"
                       value="最低生活保障"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="onSubmit"
                     icon="el-icon-search">查询</el-button>
          <el-button type="info"
                     @click="onReset"
                     icon="el-icon-refresh">重置</el-button>
          <el-button type="primary">批量核对</el-button>
          <el-button type="success"
                     @click="allSubmit">全量核对</el-button>
          <el-button type="primary"
                     @click="createCheckReportWaringList">标记核对报告超时数据</el-button>
        </el-form-item>
      </el-form>
      <!-- table -->
      <el-table v-loading='loading'
                border
                :data="tableData"
                style="width: 100%"
                height="600">
        <el-table-column prop="No"
                         label="序号"
                         width="60"></el-table-column>
        <el-table-column label="姓名">
          <template slot-scope="{row}">
            <p :title="row.name"
               class="ellipsis">{{row.name}}</p>
          </template>
        </el-table-column>
        <el-table-column label="身份证号">
          <template slot-scope="{row}">
            <p :title="row.IDCard"
               class="ellipsis">{{row.IDCard}}</p>
          </template>
        </el-table-column>
        <el-table-column label="联系电话">
          <template slot-scope="{row}">
            <p :title="row.phone"
               class="ellipsis">{{row.phone}}</p>
          </template>
        </el-table-column>
        <el-table-column label="提交核对时间">
          <template slot-scope="{row}">
            <p :title="row.ab_dat22 | formatDate"
               class="ellipsis">{{row.ab_dat22 | formatDate}}</p>
          </template>
        </el-table-column>
        <el-table-column label="一般核对时间（天）">
          <template slot-scope="{row}">
            <p :title="row.HDTime"
               class="ellipsis">{{row.HDTime }}</p>
          </template>
        </el-table-column>
        <el-table-column label="超时时间（天）">
          <template slot-scope="{row}">
            <p :title="row.timeout"
               class="ellipsis">{{row.timeout}}</p>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         width="240">
          <template slot-scope="{row}">
            <el-button-group style="width=100%"
                             class="buttons">
              <el-button @click="handleClick(scope.$index, tableData)"
                         type="primary"
                         size="small">
                上传纸质授权书
              </el-button>
              <el-button @click="SubmitVerification(row)"
                         type="danger"
                         size="small">
                提交核对
              </el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <!-- footer change page -->
      <div class="block footerPage"
           style="marginTop:10px">
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="currentPage"
                       :page-sizes="[100]"
                       :page-size="30"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="totalData">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getInspectReportWgApi } from "@/api/yjptxt/objectWg"
import {
  fullDoseCommitCheckReportApi,  // 全量核对接口
  commitCheckReportApi, // table 操作按钮（提交核对）
  createCheckReportWaringListApi, //  标记核对报告超时数据 按钮
} from "@/api/warningSystem"
export default {
  data () {
    return {
      formInline: {
        username: '',
        userID: '',
      },
      checkClass: "",
      tableData: [
        //   {
        //   date: '2016-05-03',
        //   name: '王小虎',
        //   province: '上海',
        //   city: '普陀区',
        //   address: '上海市普陀区金沙江路 1518 弄',
        //   zip: 200333
        // }, 
      ],
      currentPage: 1,
      loading: false,
      totalData: 200,  //总条数
    }
  },
  created () {
    this.getInspectReportWg()
    // console.log("create")
  },
  methods: {
    // 查询按钮
    onSubmit () {
      console.log('submit!');
      this.currentPage = 1
      this.formInline;
      this.getInspectReportWg();
    },
    // 重置按钮
    onReset () {
      this.formInline.username = ""
      this.formInline.userID = ""
      this.checkClass = ""
    },
    // 获取table数据
    async getInspectReportWg () {

      this.loading = true;
      console.log(' 获取table数据');
      await getInspectReportWgApi({
        page: this.currentPage.toString(),
        card: this.formInline.userID,
        name: this.formInline.username
      }).then(res => {
        console.log(res, 'then');
      }).catch(res => {
        console.log(res, 'catch');
        if (res.response.status == 200) {
          this.loading = false;
          this.tableData = [];

          for (let i in res.response.data) {
            let obj = {
              No: '',
              ab_dat22: '',
              name: '',
              IDCard: '',
              city: '',
              phone: '',
              timeout: '',
              HDTime: '30',
              sId: ""
            };

            this.tableData.push(obj);

            for (let j in res.response.data[i]) {
              res.response.data[i][j] = unescape(res.response.data[i][j]);
            }
            this.tableData[i].No = res.response.data[i].rownumber;
            this.tableData[i].ab_dat22 = res.response.data[i].ab_dat22;
            this.tableData[i].name = res.response.data[i].ab_ex3;
            this.tableData[i].IDCard = res.response.data[i].ab_ex7;
            this.tableData[i].phone = res.response.data[i].ab_ex28;
            this.tableData[i].sId = res.response.data[i].ab_id;
            this.tableData[i].timeout = Math.round((new Date() - new Date(res.response.data[i].ab_dat22)) / 1000 / 60 / 60 / 24) - 30;
          }
          // console.log(res.response.data);

          console.log(new Date(this.tableData[0].ab_dat22));
          console.log(new Date());
          console.log(Math.round((new Date() - new Date(this.tableData[0].ab_dat22)) / 1000 / 60 / 60 / 24) - 30);
        } else {
          this.loading = false;
          this.$message.error('网络错误')
        }

      })
      // console.log(data)
    },
    // 查看按钮
    handleClick (row) {
      console.log(123)
      this.$router.push("/assistance/tk/tkListView")
    },
    // 切换pageSize
    handleSizeChange () {
      console.log(1);
    },
    // 换页
    handleCurrentChange (val) {
      console.log(`换页:${val}`);
      this.currentPage = val;
      console.log(`当前页:${this.currentPage}`);
      this.getInspectReportWg();
      // this.page
    },
    // 全量提交 按钮
    async allSubmit () {
      if (!this.checkClass) return this.$message.error("请选择核对类型")
      try {
        await fullDoseCommitCheckReportApi({
          type: this.checkClass
        })
      } catch (error) {
        console.log(error, "全量提交 按钮")
      }
    },
    // table 操作按钮（提交核对）
    async SubmitVerification (row) {
      try {
        await commitCheckReportApi(row.sId)
      } catch (error) {
        console.log(error)
      }
    },
    // 标记核对报告超时数据
    async createCheckReportWaringList () {
      try {
        await createCheckReportWaringListApi()
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {
    num () {
      return 123
    }
  }
}
</script>

<style scoped lang="less">
.g-box {
  display: flex;
  /* width: 100%; */
  height: 80vh;
  flex-direction: column;
}
.footerPage {
  display: flex;
  justify-content: flex-end;
}
/deep/.has-gutter th {
  text-align: center !important;
}
/deep/ .el-table__row td {
  text-align: center !important;
}
</style>

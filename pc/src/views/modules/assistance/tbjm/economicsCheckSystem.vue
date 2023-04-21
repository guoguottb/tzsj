 <!-- 经济核对系统 -->
 <template>
  <div class="g-box">
    <div class="createBox">
      <div class="block">
      </div>
      <!-- table search -->
      <div style="marginTop:12px">
        <el-form :inline="true"
                 :model="formInline"
                 class="demo-form-inline">
          <!-- 入库批次ID -->
          <el-form-item label="入库批次ID">
            <el-input v-model="formInline.batch_ID"
                      placeholder="请输入入库批次ID"></el-input>
          </el-form-item>
          <!-- 户主姓名 -->
          <el-form-item label="户主姓名">
            <el-input v-model="formInline.d204A000003"
                      placeholder="请输入户主姓名"></el-input>
          </el-form-item>
          <!-- 户主身份证 -->
          <el-form-item label="户主身份证">
            <el-input v-model="formInline.d204A000005"
                      placeholder="请输入户主身份证"></el-input>
          </el-form-item>
          <!-- 成员名称 -->
          <el-form-item label="成员名称">
            <el-input v-model="formInline.d204A010001"
                      placeholder="请输入成员名称"></el-input>
          </el-form-item>
          <!-- 成员身份证 -->
          <el-form-item label="成员身份证">
            <el-input v-model="formInline.d204A010005"
                      placeholder="请输入成员身份证"></el-input>
          </el-form-item>
          <!-- 抓取状态 -->
          <el-form-item label="抓取状态">
            <el-select v-model="formInline.cur_STATE"
                       placeholder="请输入抓取状态">
              <el-option label="导入"
                         value="00"></el-option>
              <el-option label="提取"
                         value="01"></el-option>
              <el-option label="反馈"
                         value="02"></el-option>
              <el-option label="其他"
                         value="03"></el-option>
            </el-select>
          </el-form-item>
          <!-- formData button -->
          <el-form-item>
            <el-button type="primary"
                       icon="el-icon-search"
                       :loading="searchLoading"
                       @click="searchForm">查询</el-button>
            <el-button type="info"
                       @click="resetForm"
                       icon="el-icon-refresh">重置</el-button>
            <el-button type="primary"
                       @click="addInfo"
                       icon="el-icon-circle-plus-outline">新增</el-button>
            <el-button type="primary"
                       @click="batchInspect"
                       :disabled="isPLHC">批量核查</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- table data -->
      <div class="tableData"
           style="marginTop:8px">
        <el-table ref="multipleTable"
                  v-loading="searchLoading"
                  border
                  fit
                  empty-text="暂无数据"
                  height="540"
                  :data="tableData.content"
                  style="width: 100%;overflow:scroll"
                  @selection-change="handleSelectionChange">
          <el-table-column type="selection"
                           width="55">
          </el-table-column>
          <!-- 入库批次ID -->
          <el-table-column label="入库批次ID"
                           width="100">
            <template slot-scope="{row}">
              <p :title="row.batch_ID"
                 class="ellipsis">{{row.batch_ID}}</p>
            </template>
          </el-table-column>
          <!-- 家庭ID -->
          <el-table-column label="家庭ID">
            <template slot-scope="{row}">
              <p :title="row.basicId"
                 class="ellipsis">{{row.basicId}}</p>
            </template>
          </el-table-column>
          <!-- 成员姓名 -->
          <el-table-column label="成员姓名">
            <template slot-scope="{row}">
              <p :title="row.d204A010001"
                 class="ellipsis">{{row.d204A010001}}</p>
            </template>
          </el-table-column>
          <!-- 性别 -->
          <el-table-column label="性别">
            <template slot-scope="{row}">
              <p :title="row.d204A010002"
                 class="ellipsis">{{row.d204A010002}}</p>
            </template>
          </el-table-column>
          <!-- 出生日期 -->
          <el-table-column label="出生日期"
                           width="100">
            <template slot-scope="{row}">
              <p :title="row.d204A010003"
                 class="ellipsis">{{row.d204A010003}}</p>
            </template>
          </el-table-column>
          <!-- 成员身份证 -->
          <el-table-column label="成员身份证"
                           width="180">
            <template slot-scope="{row}">
              <p :title="row.d204A010005"
                 class="ellipsis">{{row.d204A010005}}</p>
            </template>
          </el-table-column>
          <!-- 与主申请人关系 -->
          <el-table-column label="与主申请人关系"
                           width="120">
            <template slot-scope="{row}">
              <p :title="row.d204A010023"
                 class="ellipsis">{{row.d204A010023}}</p>
            </template>
          </el-table-column>
          <!-- 户主姓名 -->
          <el-table-column label="户主姓名">
            <template slot-scope="{row}">
              <p :title="row.d204A000003"
                 class="ellipsis">{{row.d204A000003}}</p>
            </template>
          </el-table-column>
          <!-- 户主身份证号码 -->
          <el-table-column label="户主身份证号码"
                           width="180">
            <template slot-scope="{row}">
              <p :title="row.d204A000005"
                 class="ellipsis">{{row.d204A000005}}</p>
            </template>
          </el-table-column>
          <!-- 户籍地址 -->
          <el-table-column label="户籍地址"
                           width="160">
            <template slot-scope="{row}">
              <p :title="row.d204A010012"
                 class="ellipsis">{{row.d204A010012}}</p>
            </template>
          </el-table-column>
          <!-- 入库时间 -->
          <el-table-column label="入库时间"
                           width="140">
            <template slot-scope="{row}">
              <p :title="row.inputTime"
                 class="ellipsis">{{row.inputTime}}</p>
            </template>
          </el-table-column>
          <!-- 提取时间 -->
          <el-table-column label="提取时间"
                           width="140">
            <template slot-scope="{row}">
              <p :title="row.outputTime"
                 class="ellipsis">{{row.outputTime}}</p>
            </template>
          </el-table-column>
          <!-- 反馈时间 -->
          <el-table-column label="反馈时间"
                           width="140">
            <template slot-scope="{row}">
              <p :title="row.back_TIME"
                 class="ellipsis">{{row.back_TIME}}</p>
            </template>
          </el-table-column>
          <!-- 授权书名称 -->
          <el-table-column label="授权书名称"
                           width="120">
            <template slot-scope="{row}">
              <p :title="row.sqs_NAME"
                 class="ellipsis">{{row.sqs_NAME}}</p>
            </template>
          </el-table-column>
          <!-- 数据状态 -->
          <el-table-column label="数据状态">
            <template slot-scope="{row}">
              <p :title="row.cur_STATE"
                 class="ellipsis">{{row.cur_STATE}}</p>
            </template>
          </el-table-column>
          <!-- 授权书路径 -->
          <el-table-column label="授权书路径"
                           width="120">
            <template slot-scope="{row}">
              <p :title="row.sqs_PATH"
                 class="ellipsis">{{row.sqs_PATH}}</p>
            </template>
          </el-table-column>
          <!-- 核对报告名称 -->
          <el-table-column label="核对报告名称"
                           width="120">
            <template slot-scope="{row}">
              <p :title="row.hdbg_NAME"
                 class="ellipsis">{{row.hdbg_NAME}}</p>
            </template>
          </el-table-column>
          <!-- 核对报告路径 -->
          <el-table-column label="核对报告路径"
                           width="120">
            <template slot-scope="{row}">
              <p :title="row.hdbg_PATH"
                 class="ellipsis">{{row.hdbg_PATH}}</p>
            </template>
          </el-table-column>
          <!-- 赡扶抚养关系 -->
          <el-table-column label="赡扶抚养关系"
                           width="120">
            <template slot-scope="{row}">
              <p :title="row.d204A010046"
                 class="ellipsis"><span v-if="row.d204A010046 === '0'">申请户</span><span v-if="row.d204A010046 === '1'">赡扶抚养户</span></p>
            </template>
          </el-table-column>
          <!-- 核对类型 -->
          <el-table-column label="核对类型">
            <template slot-scope="{row}">
              <p :title="row.projectId"
                 class="ellipsis">{{row.projectId}}</p>
            </template>
          </el-table-column>
          <!-- 核对类别 -->
          <el-table-column label="核对类别">
            <template slot-scope="{row}">
              <p :title="row.ensureType"
                 class="ellipsis"><span v-if="row.ensureType === '01'">新申请</span><span v-if="row.ensureType === '02'">复查</span></p>
            </template>
          </el-table-column>
          <!-- 提交时间 -->
          <el-table-column label="提交时间"
                           width="100">
            <template slot-scope="{row}">
              <p :title="row.inputTime"
                 class="ellipsis">{{row.inputTime}}</p>
            </template>
          </el-table-column>
          <!-- 提取时间 -->
          <el-table-column label="提取时间"
                           width="100">
            <template slot-scope="{row}">
              <p :title="row.outputTime"
                 class="ellipsis">{{row.outputTime}}</p>
            </template>
          </el-table-column>
          <!-- 委托书名称 -->
          <el-table-column label="委托书名称"
                           width="100">
            <template slot-scope="{row}">
              <p :title="row.wtsName"
                 class="ellipsis">{{row.wtsName}}</p>
            </template>
          </el-table-column>
          <!-- 抓取状态 -->
          <el-table-column label="抓取状态">
            <template slot-scope="{row}">
              <p :title="row.curState"
                 class="ellipsis"><span v-if="row.curState === '00'">导入</span><span v-else-if="row.curState === '01'">提取</span><span v-else-if="row.curState === '02'">反馈</span><span v-else-if="row.curState === '03'">其他</span></p>
            </template>
          </el-table-column>
          <!-- 委托书路径 -->
          <el-table-column label="委托书路径"
                           width="100">
            <template slot-scope="{row}">
              <p :title="row.wtsPath"
                 class="ellipsis">{{row.wtsPath}}</p>
            </template>
          </el-table-column>
          <el-table-column label="操作"
                           fixed="right"
                           class="scopeCell"
                           min-width="160px">
            <template slot-scope="{row}">
              <el-button-group :inline="true"
                               style="width=100% ">
                <el-button type="primary"
                           :loading="resetInspectLoading"
                           @click="resetInspect(row)">重新核查</el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- footer paging -->
      <div class="footerPaging">
        <div class="block">
          <el-pagination @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :page-sizes="[10,20,50,100]"
                         :page-size="tableData.pageSize"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="tableData.totalElements">
          </el-pagination>
        </div>
      </div>
      <!-- 删除提示对话框 -->
      <el-dialog title="提示"
                 :visible.sync="addInfoDialog"
                 width="30%">
        <el-form ref="addForm"
                 :model="addForm"
                 label-width="80px">
          <el-form-item label="家庭ID">
            <el-input v-model="addForm.familyID"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="addInfoDialog = false">取 消</el-button>
          <el-button type="primary"
                     :loading="dialogconfirmLoading"
                     @click="addInfoAffirmBtn">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {
  addEconomicAoi, // 新增经济核查数据
  getEconomicCheckListApi,    // 获取经济核对系统table数据
  recheckOneEconomicApi,    // 重新核查经济核对数据
  recheckAllEconomicApi,  // 批量核查功能
} from "@/api/linkageSalvationPlatform"
// status
import dayjs from "dayjs"   // dayjs(date).format("YYYY-MM-DD HH:mm:ss")
export default {
  name: "economicsCheckSystem",
  data () {
    return {
      formInline: {         // search form
        batch_ID: "",     // 入库批次ID
        cur_STATE: "00",    // 抓取状态
        d204A000003: "",    // 户主姓名
        d204A000005: "",    // 户主身份证号码
        d204A010001: "",  // 成员姓名
        d204A010005: "",    // 成员身份证
        notNeedPage: false,     // 	是否不需要分页
        pageNo: 1,  // 第几页,默认从1开始
        pageSize: 20,   // 每页几条
      },
      tableData: {
        content: []
      },        // table data
      searchLoading: false,
      addInfoDialog: false,         //  删除 提示对话框
      rowInformation: {},
      dialogTitle: "",
      dialogconfirmLoading: false,
      resetInspectLoading: false,
      resetFormFlage: false,
      addForm: {
        familyID: ""
      },
      isPLHC: false
    };
  },

  components: {
  },
  created () {
    this.getTableData(this.formInline)
  },
  methods: {
    // 经济核对系统table数据
    async getTableData (data) {
      try {
        this.searchLoading = true
        await getEconomicCheckListApi(data)
      } catch (error) {
        console.log(error, "table数据")
        if (error && error.response && error.response.data.status === "+OK") return this.tableData = error.response.data.data
        this.$message.error(error.response.data.msg)
      } finally {
        this.searchLoading = false
      }
    },
    // 全选点击事项
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    // 切换pageSize页码
    handleSizeChange (val) {
      this.formInline.pageSize = val
      this.getTableData(this.formInline)
    },
    // 切页pageNo
    handleCurrentChange (val) {
      this.formInline.pageNo = val
      this.getTableData(this.formInline)
    },
    // 新增家庭ID dialog确定 按钮
    async addInfoAffirmBtn () {
      try {
        await addEconomicAoi(this.addForm.familyID)
      } catch (error) {
        if (error && error.response && error.response.data.status === "+OK") {
          this.addInfoDialog = false
          this.addForm.familyID = ""
          return this.$message.success(error.response.data.msg)
        }
        this.$message.error(error.response.data.msg)
      }
      // this.addInfoDialog = false
    },
    // 重新核查经济核对数据
    async resetInspect (val) {
      try {
        this.resetInspectLoading = true
        await recheckOneEconomicApi(val.batch_ID)
      } catch (error) {
        if (error && error.response && error.response.data && error.response.data.status === "+OK") return this.$message.success(error.response.data.msg)
        this.$message.error(error.response.data.msg)
      } finally {
        this.resetInspectLoading = false
      }
    },
    // 重置按钮
    resetForm () {
      if (this.resetFormFlage) return this.$message.warning("请勿重复点击")
      this.resetFormFlage = true
      setTimeout(() => {
        this.resetFormFlage = false
      }, 3000);
      this.formInline.batch_ID = ""
      this.formInline.cur_STATE = ""
      this.formInline.d204A000003 = ""
      this.formInline.d204A000005 = ""
      this.formInline.d204A010001 = ""
      this.formInline.d204A010005 = ""
      this.formInline.notNeedPage = false
      this.formInline.pageNo = 1
      this.formInline.pageSize = 20
      this.$message.success("重置成功")
    },
    // 搜索按钮
    searchForm () {
      this.getTableData(this.formInline)
    },
    // 新增按钮
    addInfo () {
      this.addInfoDialog = true
    },
    // 批量核查按钮
    async batchInspect () {
      try {
        await recheckAllEconomicApi(this.formInline)
      } catch (error) {
        if (error && error.response.data.status === "+OK") {
          this.isPLHC = true
          return this.$message.success(error.response.data.msg)
        }
        this.$message.success(error.response.data.msg)
      }
    }
  }
};
</script>
<style scoped lang="less">
/deep/ .footerPaging {
  display: flex;
  justify-content: flex-end !important;
  margin-top: 6px;
}
/deep/ .el-table__row button {
  margin: 0;
  margin-bottom: 12px;
}

.single {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/deep/ .el-table__cell {
  .cell {
    max-height: 48px !important;
  }
}
/deep/.has-gutter th {
  text-align: center !important;
}
/deep/ .el-table__row td {
  text-align: center !important;
}
</style>
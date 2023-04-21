<template>
  <!-- 救助服务站批次 -->
  <div class="g-box">
    <!-- search form -->
    <el-form :model="searchForm"
             label-width="88px"
             inline
             class="demo-ruleForm">
      <!-- 批次号 -->
      <el-form-item label="批次号"
                    prop="batchNo">
        <el-input v-model="searchForm.batchNo"
                  placeholder="请输入批次号"></el-input>
      </el-form-item>
      <!-- 批次名称 -->
      <el-form-item label="批次名称"
                    prop="title">
        <el-input v-model="searchForm.title"
                  placeholder="请输入批次名称"></el-input>
      </el-form-item>
      <!-- 任务状态 -->
      <el-form-item label="任务状态"
                    prop="taskStatus">
        <el-select v-model="searchForm.taskStatus"
                   placeholder="请选择任务状态">
          <el-option label="进行中"
                     value="进行中"></el-option>
          <el-option label="已完成"
                     value="已完成"></el-option>
        </el-select>
      </el-form-item>
      <!-- 按钮 -->
      <el-form-item>
        <el-button type="primary"
                   ref="formSearchButton"
                   @click="searchList"
                   icon="el-icon-search">查询</el-button>
        <el-button type="info"
                   @click="resetForm"
                   icon="el-icon-refresh">重置</el-button>
        <el-button type="success"
                   @click="newBatch('新建服务站批次')"
                   icon="el-icon-plus">新建</el-button>
      </el-form-item>
    </el-form>
    <!-- table list -->
    <my-table :columns="columns"
              :tableWidth="300"
              :table-data="tableData"
              :pagination="true"
              :page-size.sync="pageSize"
              :total="total"
              :current-page.sync="pageNo"
              :loading="tableLoading"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange">
      <template slot="buttons"
                slot-scope="{row}">
        <el-button type="primary"
                   @click="viewRowInfo(row.row)">查看</el-button>
        <el-button type="primary"
                   :disabled="row.row.taskStatus !== '未开始'"
                   @click="beginRowInfo(row.row)">批次开始</el-button>
        <el-button type="primary"
                   :disabled="row.row.taskStatus !== '进行中'"
                   @click="finishRowInfo(row.row)">批次完成</el-button>
        <el-button type="danger"
                   :disabled="row.row.taskStatus !== '未开始'"
                   @click="deleteRowInfo(row.row)">删除</el-button>
      </template>
    </my-table>
    <!--  dialog -->
    <el-dialog :title="dialogTitle"
               :visible.sync="dialogVisible"
               width="48%"
               :before-close="handleClose">
      <!-- formData -->
      <el-form :model="formData"
               :rules="formDataRules"
               ref="formData"
               label-width="110px"
               class="demo-ruleForm">
        <!-- 批次名称 救助服务站名称 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="批次名称"
                          prop="title">
              <el-select v-model="formData.title"
                         style="width: 100%"
                         placeholder="请输入批次名称">
                <el-option label="上门核查"
                           value="上门核查"></el-option>
                <el-option label="走访复查"
                           value="走访复查"></el-option>
                <el-option label="安全隐患排查"
                           value="安全隐患排查"></el-option>
                <el-option label="困难需求调查"
                           value="困难需求调查"></el-option>
                <el-option label="四方协议落实排查"
                           value="四方协议落实排查"></el-option>
                <el-option label="自理能力评估"
                           value="自理能力评估"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="服务站名称"
                          prop="socialWorkStationId">
              <el-select v-model="formData.socialWorkStationId"
                         style="width: 100%"
                         placeholder="请选择救助服务站名称">
                <el-option :label="item.title"
                           :value="item.id"
                           v-for="item in socialWorkStationList"
                           :key="item.id"></el-option>
              </el-select>
              </el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider content-position="left"></el-divider>
        <!-- <el-divider content-position="left">少年包青天</el-divider> -->
        <!-- 救助类型 处理节点 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="救助类型"
                          prop="queryVO.ab_ex13s">
              <el-select v-model="formData.queryVO.ab_ex13s"
                         multiple
                         style="width: 100%"
                         placeholder="请选择救助类型">
                <el-option label="低保"
                           value="低保"></el-option>
                <el-option label="家庭边缘"
                           value="家庭边缘"></el-option>
                <el-option label="临时救助"
                           value="临时救助"></el-option>
                <el-option label="群众申请"
                           value="群众申请"></el-option>
                <el-option label="特困供养"
                           value="特困供养"></el-option>
                <el-option label="医疗推送"
                           value="医疗推送"></el-option>
                <el-option label="预警推送"
                           value="预警推送"></el-option>
                <el-option label="支出贫困"
                           value="支出贫困"></el-option>
                <el-option label="主动排查"
                           value="主动排查"></el-option>
                <el-option label="尊老金"
                           value="尊老金"></el-option>
                <el-option label="低保边缘"
                           value="低保边缘"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="处理节点"
                          prop="queryVO.ab_ex15s">
              <el-select v-model="formData.queryVO.ab_ex15s"
                         multiple
                         style="width: 100%"
                         placeholder="请选择活动区域">
                <el-option label="申请"
                           value="申请"></el-option>
                <el-option label="委托确认"
                           value="委托确认"></el-option>
                <el-option label="核对中"
                           value="核对中"></el-option>
                <el-option label="办结"
                           value="办结"></el-option>
                <el-option label="初审"
                           value="初审"></el-option>
                <el-option label="公示开始"
                           value="公示开始"></el-option>
                <el-option label="审批"
                           value="审批"></el-option>
                <el-option label="退回"
                           value="退回"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 行政区划 截至日期 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="行政区划"
                          prop="queryVO.divisionCodes">
              <el-cascader :props="props"
                           v-model="formData.queryVO.divisionCodes"
                           style="width: 100%"
                           clearable
                           placeholder="请选择行政区划">
              </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="截止日期"
                          prop="closeTime">
              <el-date-picker v-model="formData.closeTime"
                              style="width: 100%"
                              align="right"
                              type="date"
                              placeholder="选择日期">
              </el-date-picker></el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   :loading="onAffirmLoading"
                   @click="onAffirm">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 评分 dialog -->
    <el-dialog title="救助服务站批次评分"
               :visible.sync="evaluateDialogVisible"
               width="40%"
               :before-close="evaluateHandleClose">
      <el-form :model="evaluateRuleForm"
               :rules="evaluateRules"
               ref="evaluateRuleForm"
               label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="批次打分"
                      prop="score">
          <el-radio v-model="evaluateRuleForm.score"
                    :label="100">非常满意</el-radio>
          <el-radio v-model="evaluateRuleForm.score"
                    :label="90">满意</el-radio>
          <el-radio v-model="evaluateRuleForm.score"
                    :label="80">一般</el-radio>
          <el-radio v-model="evaluateRuleForm.score"
                    :label="70">不满意</el-radio>
          <el-radio v-model="evaluateRuleForm.score"
                    :label="50">非常不满意</el-radio>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="evaluateDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   :loading="onEvaluateLoading"
                   @click="onEvaluate">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import myTable from '@/views/common/newMyTable'
import mixin from "@/mixins"
// api
import {
  socialWorkOperateGetBatchListApi, // 救助服务站下发批次列表
  socialWorkOperateCreateBatchApi,  // 救助服务站批次 创建
  socialWorkStationGetSimpleListApi,  // 删除批次
  startBatchApi,  // 批次开始
  finishBatchApi,  // 批次完成
  deleteBatchApi,  // 救助服务站下拉列表
} from "@/api/SocialWorkStation"
import dayjs from "dayjs"
export default {
  name: "socialWorkStationBatch",
  data () {
    return {
      searchForm: {
        batchNo: "",  // 批次号
        title: "",    // 批次平常
        taskStatus: "",   // 任务状态
      },
      historySearch: {}, // 历史搜索 用于切页且页码
      columns: [
        { label: '救助服务站批次号', prop: 'batchNo', minWidth: 100 },
        { label: '批次名称', prop: 'title', minWidth: 100 },
        { label: '救助服务站名称', prop: 'stationName', minWidth: 100 },
        { label: '任务数量', prop: 'taskNum' },
        { label: '完成数量', prop: 'completedNum' },
        { label: '任务状态', prop: 'taskStatus' },
        { label: '创建时间', prop: 'createTime', minWidth: 110 },
        { label: '截止日期', prop: 'closeTime', minWidth: 80 },
        { label: '完成时间', prop: 'completedTime', minWidth: 110 },
      ],  // table 配置
      tableData: [],  // tableList
      pageNo: 1, // 列表第n页
      pageSize: 10, // 列表页码
      total: 0, // 数据条数
      tableLoading: false, // tableList loading
      dialogVisible: false, // dialog 弹框
      dialogTitle: "", // dialog title
      evaluateDialogVisible: false, // 评分dialog
      formData: {
        title: "", // 救助服务站名称
        queryVO: {
          ab_ex13s: [],  // 救助类型
          ab_ex15s: [],  // 处理节点
          divisionCodes: [],  // 行政区划
        },
        closeTime: "",  // 行政区划
        socialWorkStationId: "",  // 救助服务站名称
      },
      formDataRules: {
        title: [{ required: true, message: '救助类型不可为空', trigger: 'change' }],
        // "queryVO.ab_ex13s": [{ required: true, message: '救助类型不可为空', trigger: 'change' }],
        "queryVO.ab_ex15s": [{ required: true, message: '处理节点不可为空', trigger: 'change' }],
        // "queryVO.divisionCodes": [{ required: true, message: '行政区划不可为空', trigger: 'change' }],
        closeTime: [{ required: true, message: '请选择截至日期', trigger: 'change' }],
        socialWorkStationId: [{ required: true, message: '救助服务站名称不可为空', trigger: 'change' }],
      },
      // 批次评分校验
      evaluateRules: {
        score: [{ required: true, message: '评分选项不可为空', trigger: 'change' }],
      },
      socialWorkStationList: [],
      onAffirmLoading: false,
      // 批次评分 form
      evaluateRuleForm: {
        score: 100
      },
      onEvaluateLoading: false, // 批次打分 确认按钮loading
      rowInfo: {},    // 点击操作按钮时候赋值
    }
  },
  mixins: [mixin],
  created () {
    this.getTableData(this.searchForm)
  },
  methods: {
    // 获取列表数据
    async getTableData (object) {
      try {
        this.tableLoading = true
        await socialWorkOperateGetBatchListApi(object)
      } catch (error) {
        if (error.response.data.code !== 200) return this.$message.error(error.response.data.msg)
        let list = error.response.data.data
        this.historySearch = object
        this.tableData = list.content
        this.pageNo = list.pageNo
        this.pageSize = list.pageSize
        this.total = list.totalElements
      } finally {
        this.tableLoading = false
      }
    },
    // 处理页码
    handleSizeChange (row) {
      this.historySearch.pageSize = row
      // TODO：处理每页显示数据条数变化
      this.getTableData(this.historySearch)
    },
    // 切页
    handleCurrentChange (row) {
      this.historySearch.pageNo = row
      this.getTableData(this.historySearch)
    },
    // 查看
    viewRowInfo (row) {
      this.$router.push(`/socialWorkStationBatch/batchInfo?batchId=${row.id}`)
    },
    // 搜索 
    searchList () {
      this.pageNo = 1
      this.total = 0
      this.getTableData({
        batchNo: this.searchForm.batchNo,
        title: this.searchForm.title,
        taskStatus: this.searchForm.taskStatus,
        pageNo: this.pageNo,
        pageSize: this.pageSize,
      })
    },
    // 重置 表单
    resetForm () {
      this.searchForm.batchNo = ""
      this.searchForm.title = ""
      this.searchForm.taskStatus = ""
    },
    // 新建批次
    newBatch (title) {
      this.dialogTitle = title
      this.dialogVisible = true
      this.socialWorkStationGetSimpleList()
    },
    // 弹框关闭前
    handleClose () {
      this.dialogVisible = false
      this.$refs.formData.clearValidate()

    },
    // 获取所以的救助服务站列表
    async socialWorkStationGetSimpleList () {
      try {
        await socialWorkStationGetSimpleListApi("")
      } catch (error) {
        if (error.response.data.code === 200) return this.socialWorkStationList = error.response.data.data
      }
    },
    // 确认按钮
    async onAffirm () {
      const rulesRes = await this.$refs.formData.validate()
      if (!rulesRes) return this.$message.warning("请仔细核查所填写的信息！")
      this.formData.closeTime = dayjs(this.formData.closeTime).format("YYYY-MM-DD")
      this.socialWorkOperateCreateBatch(this.formData)
    },
    // 新建救助服务站
    async socialWorkOperateCreateBatch (data) {
      try {
        this.onAffirmLoading = true
        await socialWorkOperateCreateBatchApi(data)
      } catch (error) {
        if (error.response.data.code === 200) {
          this.handleClose()  // 关闭弹框
          // 重置表单
          this.$refs.formData.resetFields("title")
          this.$refs.formData.resetFields("queryVO.ab_ex13s")
          this.$refs.formData.resetFields("queryVO.ab_ex15s")
          this.$refs.formData.resetFields("queryVO.divisionCodes")
          this.$refs.formData.resetFields("socialWorkStationId")
          return this.getTableData(this.historySearch)
        }
        this.$message.error(error.response.data.msg)
      } finally {
        this.onAffirmLoading = false
      }
    },
    // 批次开始
    async beginRowInfo (row) {
      try {
        await this.$confirm('确定要开始批次吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await startBatchApi({
          id: row.id,
        })  //{ id:xx}
      } catch (error) {
        console.log(error, "批次开始")
        if (error === 'cancel') return
        this.getTableData(this.historySearch) // 数据回显
      }
    },
    // 批次完成
    async finishRowInfo (row) {
      this.rowInfo = row
      this.evaluateDialogVisible = true
    },
    // 删除
    async deleteRowInfo (row) {
      try {
        await this.$confirm('确定要删除这条记录吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await deleteBatchApi({
          id: row.id
        })
      } catch (error) {
        if (error === 'cancel') return
        if (error.response.data.code !== 200) return this.$message.error(error.response.data.msg)
        this.$message.success(error.response.data.msg)
        this.getTableData(this.historySearch)
      }
    },
    // 批次开始
    async startBatch (data) {
      try {
        await startBatchApi(data)  //{ id:xx}
      } catch (error) {
        console.log(error)
      }
    },
    // 评分弹框关闭前
    evaluateHandleClose () {
      this.rowInfo = {}
      this.evaluateDialogVisible = false
    },
    // 评分弹框  确认按钮
    async onEvaluate () {
      try {
        this.onEvaluateLoading = true
        await finishBatchApi({
          batchId: this.rowInfo.id,
          score: this.evaluateRuleForm.score
        })  //{ id:xx}
      } catch (error) {
        console.log(error, "批次完成")
        this.evaluateHandleClose()
        this.evaluateRuleForm.score = 100
        this.getTableData(this.historySearch) // 数据回显
      } finally {
        this.onEvaluateLoading = false
      }
    }
  },
  components: {
    myTable,
  },
}
</script>

<style scoped lang='less'>
</style>

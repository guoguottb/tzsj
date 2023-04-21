<template>
  <div class="g-box">
    <!-- search -->
    <el-form :model="searchForm"
             label-width="100px"
             inline
             class="demo-ruleForm">
      <el-form-item label="任务状态">
        <el-select v-model="searchForm.completionStatus"
                   placeholder="请选择任务状态">
          <el-option label="未完成"
                     value="未完成"></el-option>
          <el-option label="已完成"
                     value="已完成"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="异常情况">
        <el-select v-model="searchForm.unusual"
                   placeholder="请选择异常情况">
          <el-option label="有异常"
                     value="有异常"></el-option>
          <el-option label="无异常"
                     value="无异常"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="身份证号码">
        <el-input v-model="searchForm.idCard"
                  placeholder="请输入身份证号码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   ref="formSearchButton"
                   @click="searchList"
                   icon="el-icon-search">查询</el-button>
        <el-button type="info"
                   @click="resetForm"
                   icon="el-icon-refresh">重置</el-button>
        <el-button type="success"
                   @click="addRowInfo"
                   icon="el-icon-plus">新增</el-button>
      </el-form-item>
      <el-form-item style="float:right">
        <el-button type="primary"
                   icon="el-icon-arrow-left"
                   @click="returnPreviousPage">返回</el-button>
      </el-form-item>
    </el-form>
    <!-- table list -->
    <my-table :columns="columns"
              :table-data="tableData"
              :tableWidth="216"
              :pagination="true"
              :page-size.sync="pageSize"
              :total="total"
              :current-page.sync="pageNo"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange">
      <template slot="buttons"
                slot-scope="{row}">
        <el-button type="primary"
                   @click="viewRowInfo(row.row,'查看')">查看</el-button>

        <el-button type="primary"
                   :disabled="row.row.completionStatus !== '已完成'"
                   @click="evaluateRowInfo(row.row)">服务评价</el-button>
        <el-button type="danger"
                   :disabled="row.row.completionStatus === '已完成'"
                   @click="deleteRowInfo(row.row)">删除</el-button>
      </template>
    </my-table>
    <Dqzf :isShow="viewRowDialog"
          :data="rowInfoDetail"
          @closeDialog="viewRowCloseDialog"></Dqzf>
    <!-- addRowInfo dialog -->
    <el-dialog title="统一查询"
               :visible.sync="addDialogVisible"
               width="72%"
               :before-close="addHandleClose">
      <el-form :model="uniformQuery"
               inline>
        <el-form-item label="家庭成员身份证">
          <el-input v-model="uniformQuery.abm_ex2"
                    placeholder="请输入家庭成员身份证号码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="onSearch">查询</el-button>
        </el-form-item>
        <el-button type="info"
                   @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
      <my-table :columns="addColumns"
                :table-data="addTableData"
                :pagination="true"
                :page-size.sync="addPageSize"
                :total="addTotal"
                :current-page.sync="addPageNo"
                @size-change="addHandleSizeChange"
                @current-change="addHandleCurrentChange">
        <template slot="buttons"
                  slot-scope="{row}">
          <el-button type="primary"
                     @click="onDistribute(row.row,'查看')">派发</el-button>
        </template>
      </my-table>
    </el-dialog>
    <!-- 评分 dialog -->
    <el-dialog title="服务评分"
               :visible.sync="scoreDialogVisible"
               width="40%"
               :before-close="scoreHandleClose">
      <el-form :model="scoreRuleForm"
               :rules="scoreRules"
               ref="scoreRuleForm"
               label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="有效性"
                      prop="availability">
          <el-radio v-model="scoreRuleForm.availability"
                    :label="100">非常满意</el-radio>
          <el-radio v-model="scoreRuleForm.availability"
                    :label="90">满意</el-radio>
          <el-radio v-model="scoreRuleForm.availability"
                    :label="80">一般</el-radio>
          <el-radio v-model="scoreRuleForm.availability"
                    :label="70">不满意</el-radio>
          <el-radio v-model="scoreRuleForm.availability"
                    :label="50">非常不满意</el-radio>
        </el-form-item>
        <el-form-item label="专业程度"
                      prop="professionalism">
          <el-radio v-model="scoreRuleForm.professionalism"
                    :label="100">非常满意</el-radio>
          <el-radio v-model="scoreRuleForm.professionalism"
                    :label="90">满意</el-radio>
          <el-radio v-model="scoreRuleForm.professionalism"
                    :label="80">一般</el-radio>
          <el-radio v-model="scoreRuleForm.professionalism"
                    :label="70">不满意</el-radio>
          <el-radio v-model="scoreRuleForm.professionalism"
                    :label="50">非常不满意</el-radio>
        </el-form-item>
        <el-form-item label="服务态度"
                      prop="service">
          <!-- <el-input v-model="scoreRuleForm.service"></el-input> -->
          <el-radio v-model="scoreRuleForm.service"
                    :label="100">非常满意</el-radio>
          <el-radio v-model="scoreRuleForm.service"
                    :label="90">满意</el-radio>
          <el-radio v-model="scoreRuleForm.service"
                    :label="80">一般</el-radio>
          <el-radio v-model="scoreRuleForm.service"
                    :label="70">不满意</el-radio>
          <el-radio v-model="scoreRuleForm.service"
                    :label="50">非常不满意</el-radio>
        </el-form-item>
        <el-form-item label="及时性"
                      prop="timeliness">
          <el-radio v-model="scoreRuleForm.timeliness"
                    :label="100">非常满意</el-radio>
          <el-radio v-model="scoreRuleForm.timeliness"
                    :label="90">满意</el-radio>
          <el-radio v-model="scoreRuleForm.timeliness"
                    :label="80">一般</el-radio>
          <el-radio v-model="scoreRuleForm.timeliness"
                    :label="70">不满意</el-radio>
          <el-radio v-model="scoreRuleForm.timeliness"
                    :label="50">非常不满意</el-radio>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="scoreHandleClose">取 消</el-button>
        <el-button type="primary"
                   :loading="onScoreLoading"
                   @click="onScore">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import myTable from '@/views/common/newMyTable'
import {
  socialWorkOperateGetRecordListApi,  // 获取走访记录列表
  addRecordApi, //走访记录 新增
  deleteRecordApi, //走访记录 删除
  rateServiceApi, //走访记录 评分
} from "@/api/SocialWorkStation"
import {
  getGoodsInfoApi,  // 查看定期走访信息 { id:"xxx"}
} from "@/api/RegularVisits"
import mixin from "@/mixins"
import imageView from '@/views/modules/assistance/imageView'
import { getAllAssistanceApi } from "@/api"
import Dqzf from '@/views/modules/assistance/components/Dqzf.vue' //定期走访查看组件 
export default {
  name: "batchInfo",
  components: {
    myTable,
    imageView,
    Dqzf
  },
  mixins: [mixin],
  data () {
    return {
      searchForm: {
        batchId: this.$route.query.batchId, // 批次id,
        completionStatus: "", // 完成情况
        unusual: "",  // 异常情况
        idCard: "",  // 身份证号码
      },
      columns: [
        { label: '被走访姓名', prop: 'visitName' },
        { label: '身份证号', prop: 'visitIdCard', minWidth: 140 },
        { label: '保障类型', prop: 'supportType' },
        { label: '所属镇街', prop: 'townStreet', minWidth: 100 },
        { label: '完成情况', prop: 'completionStatus' },
        { label: '创建时间', prop: 'createTime', minWidth: 140 },
        { label: '任务完成时间', prop: 'completionTime', minWidth: 140 },
        { label: '所属职工', prop: 'personName' },
        { label: '异常情况', prop: 'unusual' },
      ],
      addColumns: [
        { label: '成员姓名', prop: 'abm_ex3' },
        { label: '成员身份证', prop: 'abm_ex2', minWidth: 160 },
        { label: '申请人姓名', prop: 'ab_ex3' },
        { label: '申请身份证', prop: 'ab_ex7', minWidth: 160 },
        { label: '救助类别', prop: 'ab_ex13' },
        { label: '所属市区', prop: 'ab_ex161' },
        { label: '所属街镇', prop: 'ab_ex2' },
      ],
      uniformQuery: {
        abm_ex2: ""
      },
      rowInfo: {},
      dialogTitle: "",
      tableData: [],
      addTableData: [],
      pageSize: 10,
      addPageSize: 10,
      total: 0,
      addTotal: 0,
      pageNo: 1,
      addPageNo: 10,
      tableLoading: false,
      viewDialogVisible: false, // table 查看 dialog
      addDialogVisible: false, // addRowInfo dialog
      scoreDialogVisible: false, // 服务评分 dialog
      onScoreLoading: false, // 确认评分 dialog
      // 图片
      imgArr: {
        arv_ex10: [],
        four_pact_picture: []
      },
      form: {},
      // 服务评价 form
      scoreRuleForm: {
        availability: 100,  // 有效性
        professionalism: 100, // 专业程度
        service: 100, // 服务态度
        timeliness: 100, // 及时性
      },
      // 服务评价校验规则
      scoreRules: {
        availability: [{ required: true, message: '请填写有效性', trigger: 'change' }],
        professionalism: [{ required: true, message: '评分选项不可为空', trigger: 'change' }],
        service: [{ required: true, message: '评分选项不可为空', trigger: 'change' }],
        timeliness: [{ required: true, message: '评分选项不可为空', trigger: 'change' }],
      },
      rowInfoDetail: {},
      viewRowDialog: false,
      arv_ex18: []
    }
  },
  created () {
    this.getTableData(this.searchForm)
  },
  mounted () {
  },
  methods: {
    // 数据回显
    async getTableData (object) {
      try {
        await socialWorkOperateGetRecordListApi(object)
      } catch (error) {
        console.log(error)
        if (error.response.data.code !== 200) return this.$message.error(error.response.data.msg)
        let list = error.response.data.data
        this.historySearch = object // 存储历史搜索
        this.tableData = list.content
        this.pageNo = list.pageNo
        this.pageSize = list.pageSize
        this.total = list.totalElements
      }
      // TODO：从后端获取表格数据
    },
    // 处理每页显示数据条数变化
    handleSizeChange (row) {
      this.historySearch.pageSize = row
      this.getTableData(this.historySearch)
    },
    // 处理当前页码变化
    handleCurrentChange (row) {
      this.historySearch.pageNo = row
      this.getTableData(this.historySearch)
    },
    // 查看
    viewRowInfo (row, title) {
      if (row.viewRoute) return this.$router.push(row.viewRoute)
      this.dialogTitle = title
      // TODO：查看当前行
      this.viewRowDialog = true
      this.getGoodsInfo({
        id: row.businessId
      })
    },
    // 搜索 
    searchList () {
      this.pageNo = 1
      this.total = 0
      this.getTableData({
        batchId: this.searchForm.batchId,
        completionStatus: this.searchForm.completionStatus,
        unusual: this.searchForm.unusual,
        idCard: this.searchForm.idCard,
        pageNo: this.pageNo,
        pageSize: this.pageSize,
      })
    },
    // 重置
    resetForm () {
      this.searchForm.completionStatus = ""
      this.searchForm.unusual = ""
      this.searchForm.idCard = ""
    },
    viewHandleClose () {
      this.viewDialogVisible = false
    },
    // 查看数据回显
    async getGoodsInfo (data) {
      try {
        await getGoodsInfoApi(data)
      } catch (error) {
        if (error.response.data.code !== 200) return this.$message.error(error.response.data.msg)
        this.rowInfoDetail = error.response.data.data
        let str = []
        this.rowInfoDetail.arv_ex18.filter(item => {
          str.push(item.name)
        })
        this.arv_ex18 = str.join(" / ")
        // this.imgArr.arv_ex10 = error.response.data.data.arv_ex10.split(",")
        // this.imgArr.four_pact_picture = error.response.data.data.four_pact_picture.split(",")
      }
    },
    // 新增数据
    addRowInfo () {
      this.addDialogVisible = true
      this.getAllAssistance(this.uniformQuery)
    },
    // 删除
    async deleteRowInfo (row) {
      console.log(row)
      try {
        await this.$confirm('确定要删除这条记录吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await deleteRecordApi({
          id: row.id
        })
      } catch (error) {
        if (error === 'cancel') return
        if (error.response.data.code !== 200) return this.$message.error(error.response.data.msg)
        this.getTableData(this.historySearch) // 数据回显
        this.$message.success(error.response.data.msg)
      }
    },
    // addRowInfo dialog 关闭前
    addHandleClose () {
      this.addDialogVisible = false
    },
    // 新增弹框的 搜索按钮
    async onSearch () {
      this.getAllAssistance(this.uniformQuery)
    },
    // 新增弹框的数据回显
    async getAllAssistance (c) {
      try {
        await getAllAssistanceApi(c)
      } catch (error) {
        console.log(error)
        if (error.response.data.code !== 200) return this.$message.error(error.response.data.msg)
        let list = error.response.data.data
        this.addHistorySearch = c // 存储历史搜索
        this.addTableData = list.content
        this.addPageNo = list.pageNo
        this.addPageSize = list.pageSize
        this.addTotal = list.totalElements
      }
    },
    // 新增弹框的 重置按钮
    resetSearch () {
      this.uniformQuery.abm_ex2 = ""
    },
    // 同一查询弹框 切换页码
    addHandleSizeChange (row) {
      this.addHistorySearch.addPageSize = row
      this.getAllAssistance(this.addHistorySearch) // 同一查询数据回显
    },
    // 同一查询弹框 切页
    addHandleCurrentChange (row) {
      this.addHistorySearch.addPageNo = row
      this.getAllAssistance(this.addHistorySearch)
    },
    // 新增弹框的 table中的派发
    onDistribute (row) {
      this.addRecord({
        batchId: this.$route.query.batchId,
        familyId: row.familyId,
      })
    },
    // 派发按钮
    async addRecord (data) {
      try {
        await addRecordApi(data)
      } catch (error) {
        if (error.response.data.code !== 200) return this.$message.error(error.response.data.msg)
        this.addHandleClose() //关闭弹框
        this.resetSearch()  //  重置参数
        this.getTableData(this.historySearch) // 数据回显
        this.$message.success(error.response.data.msg)
      }
    },
    // 服务评价
    evaluateRowInfo (row) {
      this.rowInfo = row
      this.scoreDialogVisible = true
    },
    // 服务评分弹框 关闭前
    scoreHandleClose () {
      this.scoreDialogVisible = false
    },
    // 确认评分
    async onScore () {
      try {
        this.onScoreLoading = true
        await rateServiceApi({
          availability: this.scoreRuleForm.availability,
          professionalism: this.scoreRuleForm.professionalism,
          service: this.scoreRuleForm.service,
          timeliness: this.scoreRuleForm.timeliness,
          id: this.rowInfo.id
        })
      } catch (error) {
        console.log(error, "评分结果")
        if (error.response.data.code !== 200) return this.$message.error(error.response.data.msg)
        this.scoreHandleClose() // 关闭弹框
        this.$message.success(error.response.data.msg)
        this.scoreRuleForm = {
          availability: 100,  // 有效性
          professionalism: 100, // 专业程度
          service: 100, // 服务态度
          timeliness: 100, // 及时性
        } // 数据重置
      } finally {
        this.onScoreLoading = false
      }
    },
    // 查看 rowInfo 弹框
    viewRowCloseDialog () {
      this.viewRowDialog = false
      this.rowInfoDetail = {}
    },
    // 返回按钮
    returnPreviousPage () {
      this.$router.go(-1);
      if (process.env.NODE_ENV != "development") this.$router.go(-1);
    },
  }
}
</script>
<template>
  <div>
      <common-list :sKey="443"
                   ref="commonList"
                   :type="'全部'"
                   @greenChannel="greenChannel"
                   @sgzDistribute="sgzDistribute"
                   @policyCalculation="policyCalculation"
                   :tableName="'群众申请'"></common-list>
    <!-- 核对授权书类别选择dialog -->
    <el-dialog title="核对类别"
               :before-close="checkDialogClose"
               :visible.sync="dialogVisible"
               width="30%">
      <h3>请确保核对类型与授权书中核对项目保持一致</h3>
      <el-form style="marginTop:20px">
        <el-form-item label="核对类别">
          <el-select v-model="checkClass"
                     placeholder="请选择核对类别">
            <el-option label="最低生活保障"
                       value="最低生活保障"></el-option>
            <el-option label="特困人员供养"
                       value="特困人员供养"></el-option>
            <el-option label="受灾人员救助"
                       value="受灾人员救助"></el-option>
            <el-option label="医疗救助"
                       value="医疗救助"></el-option>
            <el-option label="临时救助"
                       value="临时救助"></el-option>
            <el-option label="低保外重残"
                       value="低保外重残"></el-option>
            <el-option label="低保外一户多残依老养残"
                       value="低保外一户多残依老养残"></el-option>
            <el-option label="慈善救助"
                       value="慈善救助"></el-option>
            <el-option label="低保边缘"
                       value="低保边缘"></el-option>
            <el-option label="教育救助"
                       value="教育救助"></el-option>
            <el-option label="住房救助"
                       value="住房救助"></el-option>
            <el-option label="就业救助"
                       value="就业救助"></el-option>
            <el-option label="易返贫易致贫对象"
                       value="易返贫易致贫对象"></el-option>
            <el-option label="司法援助"
                       value="司法援助"></el-option>
            <el-option label="困难职工"
                       value="困难职工"></el-option>
            <el-option label="支出型困难"
                       value="支出型困难"></el-option>
            <el-option label="其他"
                       value="其他"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="checkDialogClose">取 消</el-button>
        <el-button type="primary"
                   @click="confirmCheckClass">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 救助服务站派发dialog -->
    <el-dialog title="救助服务站派发"
               :before-close="sgzDistributeDialogClose"
               :visible.sync="sgzDistributeDialogVisible"
               width="30%">
      <el-form :model="socialWorkStation"
               ref="socialWorkStationForm"
               style="marginTop:20px">
        <el-form-item label="救助服务站"
                      :rules="[
          { required: true, message: '请选择救助服务站', trigger: 'blur' } 
        ]">
          <el-select v-model="socialWorkStation.value"
                     placeholder="请选择核对类别">
            <el-option v-for="item in socialWorkStationList"
                       :key="item.id"
                       :label="item.title"
                       :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="sgzDistributeDialogClose">取 消</el-button>
        <el-button type="primary"
                   @click="ConfirmationDistribution">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 政策计算弹框 -->
    <el-dialog title="政策计算展示"
               width="48%"
               :before-close="policyHandleClose"
               :visible.sync="policyDialogVisible">
      <el-form :model="ruleForm"
               label-width="84px"
               inline
               class="demo-ruleForm">
        <el-row>
          <el-col :span="20">
            <el-form-item label="派发方式">
              <el-radio :label="1"
                        v-model="ruleForm.distributionMode">低收入救助和临时救助</el-radio>
              <el-radio :label="2"
                        v-model="ruleForm.distributionMode">低收入救助</el-radio>
              <el-radio :label="3"
                        v-model="ruleForm.distributionMode">临时救助</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-button type="primary"
                         v-if="ruleForm.distributionMode === 3"
                         :loading="onAffirmLoading"
                         @click="policyCalculationAffirm()">直接派发</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-table :data="policyCalculationData"
                v-if="ruleForm.distributionMode !== 3"
                border
                max-height="600">
        <el-table-column label="符合救助类型"
                         width="150">
          <template slot-scope="{row}">
            <p :title="row.typeName"
               class="ellipsis">{{row.type}}</p>
          </template>
        </el-table-column>
        <el-table-column label="计算金额"
                         width="100">
          <template slot-scope="{row}">
            <!-- <el-input type="number"
                      :min="0"
                      v-model.trim="row.money"
                      placeholder="请输入计算金额"></el-input> -->
            <p :title="row.money"
               class="ellipsis">{{row.money}}</p>
          </template>
        </el-table-column>
        <el-table-column label="分类公示说明">
          <template slot-scope="{row}">
            <!-- <el-input type="number"
                      :min="0"
                      v-model.trim="row.money"
                      placeholder="请输入计算金额"></el-input> -->
            <p :title="row.gongshi"
               class="ellipsis">{{row.gongshi}}</p>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         width="160">
          <template slot-scope="{row}">
            <el-button type="primary"
                       :loading="policyCalculationAffirmLoading"
                       @click="policyCalculationAffirm(row)">
              选择该救助类型
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <span style="color:red;margin:0 0 20px 0;display:block;">注意：<br>1、选择低收入救助时，请确保该申请人不是已在保人员；<br>2、选择临时救助派发时，请确保该申请人本年度申请次数未超过2次。</span>
      <!-- <span slot="footer"
            class="dialog-footer">
        <el-button @click="policyDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   :loading="policyCalculationAffirmLoading"
                   @click="policyCalculationAffirm">确 定</el-button>
      </span> -->
    </el-dialog>
    <!-- greenChannel -->
    <!-- 绿色通道 弹框 -->
    <el-dialog title="绿色通道"
               :visible.sync="greenDialogVisible"
               width="30%"
               :before-close="greenHandleClose">
      <el-form :model="greenRuleForm"
               label-width="200px"
               class="demo-ruleForm">
        <el-form-item label="是否立即提交经济核对">
          <el-radio-group v-model="greenRuleForm.tjhd">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="greenHandleClose">取 消</el-button>
        <el-button type="primary"
                   @click="isSelectGreenChannel(rowInfo)">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>
<script>

import commonList from '../commonList'
import {
  assistanceCalculationApi, // 政策计算弹框 数据回显
  assistanceBasicCheck3Api, // 政策计算器 派发
} from "@/api/unifiedProcessingCenter"
import {
  isSelectGreenChannelApi,
  assistanceBasicCheckApi,  // 核查派单接口  可以派发到救助服务站
} from "@/api/PreAlertSystem"  // 预警平台系统api
import {
  socialWorkStationGetSimpleListApi,      // 救助服务站下拉选择列表
} from "@/api/SocialWorkStation"
import { saveHDTypeApi } from "@/api/warningSystem"
export default {
  name: "qzsq",
  data () {
    return {
      greenRuleForm: {
        tjhd: "否"
      },
      buttonInfo: {}, // 按钮信息
      rowValue: {}, // table row info
      dialogVisible: false, // 选择核对类别的dialog
      greenDialogVisible: false, // 绿色通道弹框
      checkClass: "最低生活保障", // 核对类别

      // --- 救助服务站
      socialWorkStation: {
        value: '',
      },     // 救助服务站名称
      socialWorkStationList: [],      // 全部救助服务站信息
      sgzDistributeDialogVisible: false,  // 救助服务站弹框
      rowInfo: {},    // 当前行信息 在点击操作按钮时候赋值
      policyDialogVisible: false, // 政策计算 弹框
      policyCalculationData: [], // 政策计算弹框 列表
      policyCalculationAffirmLoading: false, // 政策计算弹框 确认按钮 loading
      onAffirmLoading: false, // 政策计算弹框 确认按钮 loading
      ruleForm: {
        distributionMode: 2
      },
    }
  },
  beforeRouteLeave (to, from, next) {
    // 业务模块名称缓存
    sessionStorage.setItem('activeName', this.$children[0].activeName);
    // 搜索内容缓存
    sessionStorage.setItem('searchData', JSON.stringify(this.$children[0].searchData));

    next();
  },
  methods: {
    // tabal 绿色通道按钮
    greenChannel (btnInfo, row) {
      // console.log(row)
      this.rowInfo = row
      this.greenDialogVisible = true
      // this.rowValue = row
      // if (row.hdzt !== "已完成线下核查") return this.$message.warning("请先完成上门核查！")
      // // return console.log(row)
      // // this.dialogVisible = true
      // this.$confirm('是否通过绿色通道功能转入临时救助？', {
      //   confirmButtonText: '是',
      //   cancelButtonText: '否',
      // })
      //   .then(_ => {
      //     this.saveHDType(row.ab_id, "临时救助", row)
      //   })
      //   .catch(_ => {
      //   });
    },
    // 绿色通道弹框关闭前
    greenHandleClose () {
      this.greenDialogVisible = false
      this.greenRuleForm.tjhd = '否'
    },
    // greenConfirm () { },
    // 绿色通道接口
    async isSelectGreenChannel (row) {
      try {
        await isSelectGreenChannelApi({
          sId: row.ab_id,
          green: "是",
          tjhd: this.greenRuleForm.tjhd,
        })
      } catch (error) {
        if (error && error.response && error.response.data && error.response.data.status === "+OK") {
          this.greenHandleClose()
          this.$message.success(error.response.data.msg)
          // this.checkDialogClose()
          this.$refs.commonList.$refs['formSearchButton'].$el.click()
          return
        }
        this.$message.error(error.response.data.msg)
      }
    },
    // 提交核对授权书类型
    async saveHDType (sid, ab_ex192, row) {
      try {
        await saveHDTypeApi(sid, ab_ex192)
      } catch (error) {
        if (error && error.response.data.status === "+OK") return this.isSelectGreenChannel(row)
        this.$message.error(error.response.data.msg)
      }
    },
    // 核对授权书dialog 确认点击按钮
    confirmCheckClass () {
      if (!this.checkClass) return this.$message.warning("请选择核对授权书类型！")
      this.saveHDType(this.rowValue.sid, this.checkClass)
    },
    // 核对授权书dialog 关闭前的回调
    checkDialogClose () {
      this.dialogVisible = false
      this.checkClass = "最低生活保障"
    },
    // ------- 救助服务站
    async sgzDistribute (row) {
      this.rowInfo = row
      try {
        await socialWorkStationGetSimpleListApi(row.ab_id)
      } catch (error) {
        if (error.response.data.code === 200) {
          this.socialWorkStationList = error.response.data.data // 获取救助服务站列表
          return this.sgzDistributeDialogVisible = true // 打开弹框
        }
        // 失败信息提示
        this.$message.error(error.response.data.msg)
      }
    },
    // 救助服务站 弹框关闭之前
    sgzDistributeDialogClose () {
      this.sgzDistributeDialogVisible = false
      this.socialWorkStationList = []
    },
    // 确认派发救助服务站
    async ConfirmationDistribution () {
      const rulseRes = await this.$refs.socialWorkStationForm.validate()
      if (!rulseRes) return
      try {
        await assistanceBasicCheckApi({
          sId: this.rowInfo.ab_id,
          stationId: this.socialWorkStation.value
        })
      } catch (error) {
        if (error.response.status === 200) {
          this.sgzDistributeDialogClose()
          this.$refs.commonList.$refs['formSearchButton'].$el.click()
          return this.$message.success("派发成功！")
        }
      }
    },
    // 提交政策计算器----------------------------------------------------------------
    // 政策计算 点击事件
    policyCalculation (row) {
      this.rowInfo = row
      this.assistanceCalculation(this.rowInfo.ab_id)
    },
    // 政策计算 弹框 数据展示
    async assistanceCalculation (id) {
      try {
        await assistanceCalculationApi(id)
      } catch (error) {
        if (error.response.data.code === 200) {
          this.policyDialogVisible = true   // 数据获取成功打开弹框
          return this.policyCalculationData = error.response.data.data  // 数组赋值
        }
        this.$message.error(error.response.data.msg)  // 错误信息提示
      }
    },
    // 政策计算 弹框 确认按钮
    async policyCalculationAffirm (row) {
      try {
        let result = null
        // 如果是临时救助
        if (!row) {
          result = await this.$confirm(`当前派发方式为  ${this.distributionClass}  是否确认派发`, {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
          })
          this.onAffirmLoading = true
        } else {
          result = await this.$confirm(`当前派发方式为  ${this.distributionClass}，救助类型为  ${row.type}  是否确认派发`, {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
          })
          this.policyCalculationAffirmLoading = true
        }
        await assistanceBasicCheck3Api({
          id: this.rowInfo.ab_id,
          type: this.ruleForm.distributionMode,
          jzType: row ? row.type : ""
        })
      } catch (error) {
        if (error === "cancel") return
        if (error.response.data.code === 200) {
          this.policyDialogVisible = false  // 关闭弹框
          // 调组件身上获取数据的方法重新获取数据
          this.$refs.commonList.getData()
          return this.$message.success(error.response.data.msg)
        }
        return this.$message.error(error.response.data.msg)
      } finally {
        this.policyCalculationAffirmLoading = false
        this.onAffirmLoading = false
      }
    },
    policyHandleClose () {
      this.policyDialogVisible = false
      this.ruleForm.distributionMode = 2
    },
  },
  components: {
    commonList
  },
  computed: {
    distributionClass () {
      if (this.ruleForm.distributionMode === 1) return "低收入救助和临时救助"
      if (this.ruleForm.distributionMode === 2) return "低收入救助"
      if (this.ruleForm.distributionMode === 3) return "临时救助"
    }
  }
}
</script>
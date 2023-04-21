<template>
  <div class="g-box">
    <!-- 查询 -->
    <div class="search">
      <el-form :inline="true"
               :model="searchData"
               class="demo-form-inline">
        <!-- 儿童类型 -->
        <el-form-item label="儿童类型"
                      label-width="110px">
          <el-select v-model="searchData.type"
                     placeholder="请选择儿童类型"
                     style="width: 180px">
            <el-option label="孤儿"
                       value="孤儿">
            </el-option>
            <el-option label="事实无人抚养"
                       value="事实无人抚养">
            </el-option>
            <el-option label="重病重残"
                       value="重病重残">
            </el-option>
            <el-option label="贫困家庭"
                       value="贫困家庭">
            </el-option>
            <el-option label="其他"
                       value="其他">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 儿童姓名 -->
        <el-form-item label="儿童姓名"
                      label-width="110px">
          <el-input v-model="searchData.name"
                    placeholder="儿童姓名"
                    style="width: 180px"></el-input>
        </el-form-item>
        <!-- 儿童身份证 -->
        <el-form-item label="儿童身份证"
                      label-width="110px">
          <el-input v-model="searchData.idCard"
                    placeholder="儿童身份证"
                    style="width: 180px"></el-input>
        </el-form-item>
        <el-form-item label="是否健康"
                      label-width="110px">
          <el-select v-model="searchData.whetherHealth"
                     placeholder="请选择是否健康"
                     style="width: 180px">
            <el-option v-for="item in whethers"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否残疾"
                      label-width="110px">
          <el-select v-model="searchData.whetherDisability"
                     placeholder="请选择是否残疾"
                     style="width: 180px">
            <el-option v-for="item in whethers"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否重病"
                      label-width="110px">
          <el-select v-model="searchData.whetherSeriousIllness"
                     placeholder="请选择是否重病"
                     style="width: 180px">
            <el-option v-for="item in whethers"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="残疾类型"
                      label-width="110px">
          <el-select v-model="searchData.disabilityType"
                     placeholder="请选择残疾类型"
                     style="width: 180px">
            <el-option label="智力残疾"
                       value="智力残疾">
            </el-option>
            <el-option label="肢体残疾"
                       value="肢体残疾">
            </el-option>
            <el-option label="听力残疾"
                       value="听力残疾">
            </el-option>
            <el-option label="精神残疾"
                       value="精神残疾">
            </el-option>
            <el-option label="视力残疾"
                       value="视力残疾">
            </el-option>
            <el-option label="言语残疾"
                       value="言语残疾">
            </el-option>
            <el-option label="多重残疾"
                       value="多重残疾">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="行政区划"
                      label-width="110px">
          <!-- <div class="block"> -->
          <!-- <span class="demonstration">行政区划：</span> -->
          <el-cascader v-model="xzqhArray"
                       style="width: 180px"
                       :props="props"
                       clearable
                       placeholder="行政区划"></el-cascader>
          <!-- </div> -->
        </el-form-item>
        <el-form-item label-width="110px">
          <el-button icon="el-icon-search"
                     type="primary"
                     @click="queryListByCriteria">
            查询
          </el-button>
          <el-button icon="el-icon-refresh"
                     type="info"
                     @click="resetQuery">
            重置
          </el-button>
          <!-- </div> -->
          <el-button type="success"
                     icon="el-icon-folder-opened"
                     :loading="exportTbleLoading"
                     @click="exportTble">导出列表</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-tabs v-model="activeName"
             @tab-click="handleClickSelect">
      <el-tab-pane v-for="(item, index) in options2"
                   :key="index"
                   :name="item.listname">
        <span slot="label">{{ item.value }}
          <!-- 列表数据数量显示 -->
          <span v-if="item.label && item.label <= 99"
                class="tabNum">
            {{ item.label }}
          </span>
          <span v-else-if="item.label && item.label > 99"
                class="tabNum">
            99+
          </span>
        </span>
      </el-tab-pane>
    </el-tabs>
    <!-- 表格 -->
    <el-table ref="multipleTable"
              v-loading="loading"
              :data="tableData"
              border
              height="100%"
              style="width: 100%"
              tooltip-effect="dark"
              @selection-change="handleSelectionChange">
      <el-table-column prop="selecttions"
                       type="selection"
                       width="40px"></el-table-column>
      <el-table-column align="center"
                       label="序号"
                       type="index"
                       width="50">
        <template slot-scope="scope">
          <span>{{ (page - 1) * pageSize + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="儿童姓名"
                       width="100px">
        <template slot-scope="{row}">
          <p :title="row.name"
             class="ellipsis">{{row.name}}</p>
        </template>
      </el-table-column>
      <el-table-column label="儿童身份证"
                       width="180px">
        <template slot-scope="{row}">
          <p :title="row.idCard"
             class="ellipsis">{{row.idCard}}</p>
        </template>
      </el-table-column>
      <el-table-column label="性别">
        <template slot-scope="{row}">
          <p :title="row.gender"
             class="ellipsis">{{row.gender}}</p>
        </template>
      </el-table-column>
      <el-table-column label="年龄">
        <template slot-scope="{row}">
          <p :title="row.age"
             class="ellipsis">{{row.age}}</p>
        </template>
      </el-table-column>
      <el-table-column label="健康状态">
        <template slot-scope="{row}">
          <p :title="row.healthStatus"
             class="ellipsis">{{row.healthStatus}}</p>
        </template>
      </el-table-column>
      <el-table-column label="儿童类型">
        <template slot-scope="{row}">
          <p :title="row.typeName"
             class="ellipsis">{{row.typeName}}</p>
        </template>
      </el-table-column>
      <el-table-column label="儿童补助政策公式"
                       width="150px">
        <template slot-scope="{row}">
          <p :title="row.expression"
             class="ellipsis">{{row.expression}}</p>
        </template>
      </el-table-column>
      <el-table-column label="儿童生活补贴费"
                       width="150px">
        <template slot-scope="{row}">
          <p :title="row.livingAllowance"
             class="ellipsis">{{row.livingAllowance}}</p>
        </template>
      </el-table-column>
      <el-table-column label="低保金"
                       width="100px">
        <template slot-scope="{row}">
          <p :title="row.basicLivingMoney"
             class="ellipsis">{{row.basicLivingMoney}}</p>
        </template>
      </el-table-column>
      <el-table-column label="残疾人生活补贴费"
                       width="150px">
        <template slot-scope="{row}">
          <p :title="row.disabledSubsidyMoney"
             class="ellipsis">{{row.disabledSubsidyMoney}}</p>
        </template>
      </el-table-column>
      <el-table-column :formatter="formatBoolean"
                       label="是否患有重病"
                       prop="whetherSeriousIllness"
                       width="150px"></el-table-column>
      <el-table-column :formatter="formString"
                       label="重病类型"
                       prop="seriousIllnessType"
                       width="150px"></el-table-column>
      <el-table-column :formatter="formatBoolean"
                       label="是否患有残疾"
                       prop="whetherDisability"
                       width="150px"></el-table-column>
      <el-table-column :formatter="formString"
                       label="残疾类型"
                       prop="disabilityType"
                       width="150px"></el-table-column>
      <el-table-column :formatter="formString"
                       label="残疾等级"
                       prop="disabilityLevel"
                       width="150px">
        <template slot-scope="{row}">
          <p :title="row.disabilityLevel"
             class="ellipsis">{{row.disabilityLevel}}</p>
        </template>
      </el-table-column>
      <el-table-column label="申请时间"
                       width="100px">
        <template slot-scope="{row}">
          <p :title="row.applyTime"
             class="ellipsis">{{row.applyTime}}</p>
        </template>
      </el-table-column>
      <el-table-column v-if="isExamine"
                       label="初审时间"
                       width="100px">
        <template slot-scope="{row}">
          <p :title="row.auditTime"
             class="ellipsis">{{row.auditTime}}</p>
        </template>
      </el-table-column>
      <el-table-column v-if="isApproval"
                       label="审批时间"
                       width="100px">
        <template slot-scope="{row}">
          <p :title="row.isApproval"
             class="ellipsis">{{row.isApproval}}</p>
        </template>
      </el-table-column>
      <el-table-column v-if="isFinish"
                       label="办结时间"
                       width="100px">
        <template slot-scope="{row}">
          <p :title="row.completionTime"
             class="ellipsis">{{row.completionTime}}</p>
        </template>
      </el-table-column>
      <el-table-column label="申请人"
                       width="100px">
        <template slot-scope="{row}">
          <p :title="row.applyName"
             class="ellipsis">{{row.applyName}}</p>
        </template>
      </el-table-column>
      <el-table-column :width="cazuoBtn"
                       fixed="right"
                       label="操作"
                       prop="active">
        <template slot-scope="scope">
          <el-button-group>
            <el-button size="small"
                       type="primary"
                       @click="handleClick(scope.row,'查看')">查看</el-button>
            <!-- <el-button size="small"
                       type="primary"
                       @click="handleClick(scope.row ,'查看核对报告')">查看核对报告</el-button> -->
            <!-- 审核节点的按钮 -->
            <el-button v-if="isExamine"
                       size="small"
                       type="danger"
                       @click="handleClick(scope.row ,'审核')">审核</el-button>
            <!-- 审批节点的按钮 -->
            <el-button v-if="isApproval"
                       size="small"
                       type="danger"
                       @click="handleClick(scope.row ,'审批')">审批</el-button>
            <el-button v-if="isApproval | isFinish"
                       size="small"
                       type="primary"
                       @click="handleClick(scope.row ,'政策计算')">政策计算</el-button>
            <!-- 办结节点 按钮 -->
            <el-button v-if="isFinish"
                       size="small"
                       type="danger"
                       @click="handleClick(scope.row ,'变更')">变更</el-button>
            <el-button v-if="isFinish"
                       size="small"
                       type="danger"
                       @click="handleClick(scope.row ,'注销')">注销</el-button>
            <el-button v-if="isFinish"
                       size="small"
                       type="danger"
                       @click="handleClick(scope.row ,'退回')">退回</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <!-- 点击计算后显示当前填报信息符合的类型 -->
    <el-dialog title="符合救助类型展示"
               width="80%"
               :visible.sync="policyDialogVisible">
      <el-table :data="policyClass"
                border
                max-height="600">
        <el-table-column label="类型名称"
                         width="150">
          <template slot-scope="{row}">
            <p :title="row.typeName"
               class="ellipsis">{{row.typeName}}</p>
          </template>
        </el-table-column>
        <el-table-column label="计算金额">
          <template slot-scope="{row}">
            <!-- <el-input type="number"
                      :min="0"
                      v-model.trim="row.money"
                      placeholder="请输入计算金额"></el-input> -->
            <p :title="row.money"
               class="ellipsis">{{row.money}}</p>
          </template>
        </el-table-column>
        <el-table-column label="当前金额">
          <template slot-scope="{row}">
            <p :title="row.oldMoney"
               class="ellipsis">{{row.oldMoney}}</p>
          </template>
        </el-table-column>
        <el-table-column label="低保金">
          <template slot-scope="{row,column, $index}">
            <!-- <p :title="row.basicLivingMoney"
               class="ellipsis">{{row.basicLivingMoney}}</p> -->
            <el-input type="number"
                      :min="0"
                      @change="childGetCountMoney(row,column, $index)"
                      v-model.trim="row.basicLivingMoney"
                      placeholder="请输入低保金"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="残疾人补助金">
          <template slot-scope="{row,column, $index}">
            <el-input type="number"
                      :min="0"
                      @change="childGetCountMoney(row,column, $index)"
                      v-model.trim="row.disabledSubsidyMoney"
                      placeholder="请输入残疾人补助金"></el-input>
            <!-- <p :title="row.disabledSubsidyMoney"
               class="ellipsis">{{row.disabledSubsidyMoney}}</p> -->
          </template>
        </el-table-column>
        <el-table-column label="计算公式"
                         width="200">
          <template slot-scope="{row}">
            <p :title="row.exp"
               class="ellipsis">{{row.exp}}</p>
          </template>
        </el-table-column>
        <el-table-column label="计算依据"
                         width="200">
          <template slot-scope="{row}">
            <p :title="row.basis"
               class="ellipsis">{{row.basis}}</p>
          </template>
        </el-table-column>
        <el-table-column label="金额计算解释"
                         width="200">
          <template slot-scope="{row}">
            <p :title="row.explain"
               class="ellipsis">{{row.explain}}</p>
          </template>
        </el-table-column>
        <el-table-column fixed="right"
                         label="操作"
                         width="120">
          <template slot-scope="{row}">
            <el-button @click.native.prevent="savePolicyInfo(row)">
              保存
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- 审核 审批 退回 操作dialog-->
    <el-dialog :title="operateTitle"
               :visible.sync="operateDialogVisible"
               width="30%"
               :before-close="operateHandleClose">
      <template>
        <el-form :model="disposeResult"
                 ref="disposeResultRules"
                 :rules="disposeResultRules"
                 label-width="100px">
          <el-form-item label="处理结果"
                        prop="result"
                        v-if="operateTitle !== '注销'">
            <el-select v-model="disposeResult.result"
                       style="width:100%"
                       placeholder="请输入处理结果">
              <el-option label="同意"
                         value="同意"></el-option>
              <el-option label="退回"
                         value="退回"
                         v-if="operateTitle!=='退回'"></el-option>
              <el-option label="退回重新核查"
                         value="退回重新核查"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="处理备注"
                        v-if="operateTitle !== '注销'">
            <el-input v-model="disposeResult.remark"
                      placeholder="请输入处理备注"></el-input>
          </el-form-item>
          <el-form-item label="注销原因"
                        prop="cancelRemark"
                        v-if="operateTitle === '注销'">
            <el-input v-model="disposeResult.cancelRemark"
                      placeholder="请输入注销原因"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="operateHandleClose">取 消</el-button>
        <el-button type="primary"
                   @click="affirmOperate">确 定</el-button>
      </span>
    </el-dialog>
    <!--分页-->
    <div class="block footer">
      <el-pagination :current-page="page"
                     :page-size="pageSize"
                     :total="totalElements"
                     background
                     layout="total, sizes, prev, pager, next, jumper"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import request from "@/utils/request";
import {
  countChildTypeApi,
  setChildTypeApi, // 设置困境儿童救助类型和金额
  childGetCountMoneyApi, // 困境儿童救助金额计算
} from "@/api/lifeRescue/predicamentChild"
import {
  createChildCancelApi,   // 困境儿童注销接口
  childGetChildListApi, // 获取儿童列表
  childSubmitApprovalApi, //  困境儿童提交到审核  根据儿童ID
  childSubmitCloseApi, //  困境儿童提交到办结  根据儿童ID
  childReturnApi, //  提交到 退回节点  根据儿童ID
  childReturnToReturnApi, //  退回到核查派单  根据儿童ID
} from "@/api/lifeRescue/predicamentChild"
import {
  commonExcelExportApi,
} from "@/api/lifeRescue/plightChildren"
import template from '../../../template.vue';
export default {
  components: { template },
  name: 'kjetGe',
  data () {
    return {
      policyDialogVisible: false,  // 政策计算dialog
      policyClass: [], // 政策计算table
      type: '孤儿',				//当前困境儿童救助类型
      cazuoBtn: '300',				//操作框的宽度
      isExamine: false,			//是否审核节点
      isApproval: false,			//是否审批节点
      isFinish: false,				//是否办结节点
      exportTbleLoading: false,				//是否办结节点
      tabsNum2: {},       //业务节点数据数量
      //布尔类型下拉框
      whethers: [
        {
          value: 'true',
          label: '是'
        }, {
          value: 'false',
          label: '否'
        }],
      //困境儿童救助类型:孤儿,事实无人抚养,重病重残,贫困家庭,其他,未知
      options: [{
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
      }],
      //申请,退回,核查派单,信息核对,审核,审批,办结
      options2: [{
        value: '审核',
        label: 0
      }, {
        value: '审批',
        label: 0
      }, {
        value: '办结',
        label: 0
      }],
      activeName: "", //业务节点名
      tableData: [],
      page: 1, //当前页
      pageNum: "1",
      pageSize: 10,
      totalElements: null, //总数
      loading: true,
      businessNode: "审批",
      searchData: {
        disabilityType: '',         //  困境儿童残疾类型 (非残疾,智力残疾,肢体残疾,听力残疾,精神残疾,视力残疾,言语残疾,多重残疾
        idCard: "",                 // 儿童身份证
        name: "",                   // name
        status: "审核",             // 业务状态
        type: "",                   // 困境儿童救助类型:孤儿,事实无人抚养,重病重残,贫困家庭,其他
        whetherDisability: "",      // 是否残疾
        whetherHealth: "",          // 是否健康
        whetherSeriousIllness: "",  // 是否重病
        divisionCode: "",           // 行政区划代码
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
            .then((res) => {
            })
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
      historyForm: {},
      //  审核 审批 退回 注销  dialog
      operateDialogVisible: false,
      //  审核 审批 退回 注销 dialog title
      operateTitle: "提示",
      disposeResult: {
        result: '同意',
        remark: "",
        cancelRemark: "",  // 注销备注
      },
      tableRowInfo: {},
      cancelInfo: "",// 注销原因
      disposeResultRules: {
        "result": [{ required: true, message: '请选择处理结果', trigger: 'change' }],
        "cancelRemark": [{ required: true, message: '请填写注销原因', trigger: 'blur' }],
      }
    };
  },
  created () {
    this.isExamine = true;
    this.childGetChildList({
      disabilityType: '',         //  困境儿童残疾类型 (非残疾,智力残疾,肢体残疾,听力残疾,精神残疾,视力残疾,言语残疾,多重残疾
      idCard: "",                 // 儿童身份证
      name: "",                   // name
      status: "审核",             // 业务状态
      type: "",                   // 困境儿童救助类型:孤儿,事实无人抚养,重病重残,贫困家庭,其他
      whetherDisability: "",      // 是否残疾
      whetherHealth: "",          // 是否健康
      whetherSeriousIllness: "",  // 是否重病
      divisionCode: this.xzqhArray.length ? this.xzqhArray[this.xzqhArray.length - 1].match(/\d+/g).join() : "",           // 行政区划代码
    });
    this.getStatusNums({
      businessNode: "审批",
      disabilityType: '',         //  困境儿童残疾类型 (非残疾,智力残疾,肢体残疾,听力残疾,精神残疾,视力残疾,言语残疾,多重残疾
      idCard: "",                 // 儿童身份证
      name: "",                   // name
      type: "",                   // 困境儿童救助类型:孤儿,事实无人抚养,重病重残,贫困家庭,其他
      whetherDisability: "",      // 是否残疾
      whetherHealth: "",          // 是否健康
      whetherSeriousIllness: "",  // 是否重病
      divisionCode: this.xzqhArray.length ? this.xzqhArray[this.xzqhArray.length - 1].match(/\d+/g).join() : "",           // 行政区划代码
    });
    this.doLayout()
  },
  methods: {
    // 获取儿童列表 数据回显
    async childGetChildList (c) {
      try {
        this.loading = true
        await childGetChildListApi(c)
      } catch (error) {
        if (error.response.data.code === 200) {
          this.tableData = error.response.data.data.content // table数据
          this.page = error.response.data.data.pageNo;
          this.pageSize = error.response.data.data.pageSize;
          this.totalElements = error.response.data.data.totalElements;
          this.totalPages = error.response.data.data.totalPages;
          return this.historyForm = c  // 存储 搜索 
        }
        this.$message.error(error.response.data.msg)
      } finally {
        this.loading = false
      }
    },
    async exportTble () {
      try {
        this.exportTbleLoading = true
        await commonExcelExportApi("/social/child/getChildList", this.historyForm)
      } catch (error) {
        if (error && error.response.status === 200) {
          const base64Data = error.response.data.data;
          const fileName = "困境儿童审批列表.xlsx";
          this.downloadExcelFromBase64(base64Data, fileName);
        }
      } finally {
        this.exportTbleLoading = false
      }
    },
    downloadExcelFromBase64 (base64Data, fileName) {
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    },
    // 设置困境儿童救助类型和金额
    savePolicyInfo (row) {
      this.setChildType(row)
    },
    // 救助金额计算
    async childGetCountMoney (data, column, index) {
      try {
        await childGetCountMoneyApi(data)
      } catch (error) {
        console.log(error)
        if (error.response.data.code === 200) return this.policyClass[index].money = error.response.data.data
        this.$message.error(error.response.data.msg)
      }
    },
    async setChildType (data) {
      try {
        await setChildTypeApi(data)
      } catch (error) {
        if (error && error.response.data.status === "+OK") {
          this.countChildType(data.childId)
          this.childGetChildList(this.historyForm);
          return this.$message.success(error.response.data.msg)
        } else {
          error ? this.$message.error(error.response.data.msg) : this.$message.error("保存错误请稍后重试！")
        }
      }
    },
    /* 重新渲染table组件 */
    doLayout () {
      let that = this
      this.$nextTick(() => {
        that.$refs.multipleTable.doLayout()
      })
    },
    //转换后端的布尔类型
    formatBoolean (row, column, cellValue) {
      var ret = ''  //你想在页面展示的值
      if (cellValue) {
        ret = "是"  //根据自己的需求设定
      } else {
        ret = "否"
      }
      return ret;
    },
    //转换后端为空的字符
    formString (row, column, cellValue) {
      var ret = '';
      if (cellValue === '' || cellValue === null) {
        ret = "无";
      } else {
        ret = cellValue;
      }
      return ret;
    },
    //切换业务节点
    handleClickSelect () {
      this.page = 1
      //0=审核  1=公示  2=审批  3=办结
      if (this.activeName == 0) {
        this.searchData.status = "审核";
        this.isExamine = true;
        this.isApproval = false;
        this.isFinish = false;
        this.cazuoBtn = '180';
      }
      if (this.activeName == 1) {
        this.searchData.status = "审批"
        this.isExamine = false;
        this.isApproval = true;
        this.isFinish = false;
        this.cazuoBtn = '260';
      }
      if (this.activeName == 2) {
        this.searchData.status = "办结"
        this.isExamine = false;
        this.isApproval = false;
        this.isFinish = true;
        this.cazuoBtn = '340';
      }
      let data = this.historyForm
      data.status = this.searchData.status
      this.childGetChildList(data);
    },
    // 换页
    handleSizeChange (val) {
      let data = this.historyForm
      data.pageSize = val
      this.childGetChildList(this.historyForm)
    },
    // 跳页
    handleCurrentChange (val) {
      let data = this.historyForm
      data.pageNo = val
      this.childGetChildList(data)
    },
    // 查询
    queryListByCriteria () {
      this.searchData.divisionCode = this.xzqhArray.length ? this.xzqhArray[this.xzqhArray.length - 1].match(/\d+/g).join() : ""
      let data = this.searchData
      data.pageNo = this.page
      data.pageSize = this.pageSize
      // data.pageNo = 
      this.childGetChildList(data);
      this.getStatusNums({
        businessNode: "审批",
        disabilityType: this.searchData.disabilityType,         //  困境儿童残疾类型 (非残疾,智力残疾,肢体残疾,听力残疾,精神残疾,视力残疾,言语残疾,多重残疾
        idCard: this.searchData.idCard,                 // 儿童身份证
        name: this.searchData.name,                   // name
        type: this.searchData.type,                   // 困境儿童救助类型:孤儿,事实无人抚养,重病重残,贫困家庭,其他
        whetherDisability: this.searchData.whetherDisability,      // 是否残疾
        whetherHealth: this.searchData.whetherHealth,          // 是否健康
        whetherSeriousIllness: this.searchData.whetherSeriousIllness,  // 是否重病
        divisionCode: this.xzqhArray.length ? this.xzqhArray[this.xzqhArray.length - 1].match(/\d+/g).join() : "",           // 行政区划代码
      });
      this.doLayout()
    },
    // 重置
    resetQuery () {
      this.searchData.disabilityType = ""
      this.searchData.idCard = ""
      this.searchData.name = ""
      this.searchData.type = ""
      this.searchData.whetherDisability = ""
      this.searchData.whetherHealth = ""
      this.searchData.whetherSeriousIllness = ""
      this.searchData.divisionCode = ""
      this.xzqhArray = [];
    },
    // 复选
    handleSelectionChange (val) {
    },
    async countChildType (id) {
      try {
        await countChildTypeApi(id)
      } catch (error) {
        console.log(error)
        if (error && error.response.data.status === "+OK") {
          this.policyClass = error.response.data.data
          this.policyDialogVisible = true
        } else {
          this.$message.error(error ? error.response.data.msg : "政策计算错误")
        }
      }
    },
    // 操作按钮
    handleClick (data, key) {
      if (key === '审核' || key === '审批' || key === '注销' || key === '退回') {
        this.tableRowInfo = data
        this.operateTitle = key
        console.log(data, key, "data,key")
        return this.operateDialogVisible = true
      }
      if (key == '查看') {
        if (process.env.NODE_ENV == "development") {  //生产环境执行
          // grade 信息显示等级 1：区（市）2：街道； confirmationDate 选择的年月
          this.$router.push({ path: '/social/assistance/kjet/kjetListView?id=' + data.id, });
        } else {
          this.$pushRouter({ path: generalConfig.defaultUrl + '/social/assistance/kjet/kjetListView?id=' + data.id, })
        }
      }
      else if (key === "政策计算") {
        this.countChildType(data.id)
      }
      else if (key == '审核') {
        if (process.env.NODE_ENV == "development") {  //生产环境执行
          // grade 信息显示等级 1：区（市）2：街道； confirmationDate 选择的年月
          this.$router.push({ path: '/social/assistance/kjet/kjetListView?type=审核&id=' + data.id, });
        } else {
          this.$pushRouter({ path: generalConfig.defaultUrl + '/social/assistance/kjet/kjetListView?type=审核&id=' + data.id, })
        }
      }
      else if (key == '审批') {
        if (!data.livingAllowance) {
          this.$confirm('儿童救助金额为 0，是否进行政策计算').then(async res => {
            this.countChildType(data.id)
          }).catch(error => {
            if (process.env.NODE_ENV == "development") {  //生产环境执行
              // grade 信息显示等级 1：区（市）2：街道； confirmationDate 选择的年月
              this.$router.push({ path: '/social/assistance/kjet/kjetListView?type=审批&id=' + data.id, });
            } else {
              this.$pushRouter({ path: generalConfig.defaultUrl + '/social/assistance/kjet/kjetListView?type=审批&id=' + data.id, })
            }
          })
        }
        else {
          if (process.env.NODE_ENV == "development") return this.$router.push({ path: '/social/assistance/kjet/kjetListView?type=审批&id=' + data.id, });
          this.$pushRouter({ path: generalConfig.defaultUrl + '/social/assistance/kjet/kjetListView?type=审批&id=' + data.id, })
        }
      }
      else if (key == '变更') {
        if (process.env.NODE_ENV == "development") {  //生产环境执行
          // grade 信息显示等级 1：区（市）2：街道； confirmationDate 选择的年月
          this.$router.push({ path: '/social/assistance/kjet/kjetCheck?sId=' + data.id + '&type=kjetspbg', });
        } else {
          this.$pushRouter({ path: generalConfig.defaultUrl + '/social/assistance/kjet/kjetCheck?sId=' + data.id + '&type=kjetspbg', })
        }
      }
      else if (key == '注销') {
        if (process.env.NODE_ENV == "development") {  //生产环境执行
          // grade 信息显示等级 1：区（市）2：街道； confirmationDate 选择的年月
          console.log('生产环境')
          return this.$router.push({ path: '/social/assistance/kjet/kjetListView?type=注销&id=' + data.id, });
        } else {
          console.log("开发环境")
          return this.$pushRouter({ path: generalConfig.defaultUrl + '/social/assistance/kjet/kjetListView?type=注销&id=' + data.id, })
        }
      }
      else if (key === '退回') {
        if (process.env.NODE_ENV == "development") {
          this.$router.push({ path: '/social/assistance/kjet/kjetListView?type=退回&id=' + data.id, });
        } else {
          this.$pushRouter({ path: generalConfig.defaultUrl + '/social/assistance/kjet/kjetListView?type=退回&id=' + data.id, })
        }
      }
    },
    // 获取tabs number
    async getStatusNums (c) {
      try {
        c.businessNode =
          await this.getChildNumsGroupByStatus(c)
      } catch (error) {
        console.log("业务节点数量", error)
        if (error.response.data.code === 200) {
          for (var i = 0; i < this.options2.length; i++) {
            if (this.options2[i].value == '审核') {
              this.options2[i].label = error.response.data.data.审核
            }
            if (this.options2[i].value == '审批') {
              this.options2[i].label = error.response.data.data.审批
            }
            if (this.options2[i].value == '办结') {
              this.options2[i].label = error.response.data.data.办结
            }
          }
          return
        }
        this.$message.error("获取节点数据失败")
      }
    },
    //获取各节点数据
    getChildNumsGroupByStatus (data) {
      return request({
        headers: {
          Accept: "application/json",
        },
        url: "/social/child/getChildNumsGroupByStatus",
        method: "post",
        data,
      });
    },
    // 审核 审批 退回 注销 dialog 关闭前
    operateHandleClose () {
      this.operateDialogVisible = false
      this.disposeResult = {
        result: '同意',
        remark: "",
        cancelRemark: "",  // 注销备注
      }
      this.$refs.disposeResultRules.clearValidate()
    },
    // 审核 审批 退回 注销 dialog 确认
    async affirmOperate () {
      const res = await this.$refs.disposeResultRules.validate()
      if (res) {
        let formData = {
          id: this.tableRowInfo.id,
          result: this.disposeResult.result,
          remark: this.disposeResult.remark,
        }
        // 审核接口
        if (this.operateTitle === '审核') return this.childSubmitApproval(formData)
        // 审批接口
        if (this.operateTitle === '审批') return this.childSubmitClose(formData)
        // 退回 / 重新核查接口 
        if (this.operateTitle === '退回') {
          if (this.disposeResult.result === '同意') return this.childReturn(formData)
          if (this.disposeResult.result === '退回重新核查') return this.childReturnToReturn(formData)
        }
        // 注销接口
        if (this.operateTitle === '注销') return this.affirmCancel(this.tableRowInfo.id, this.disposeResult.cancelRemark)
      }
    },
    // 困境儿童审核提交 根据儿童ID
    async childSubmitApproval (data) {
      try {
        await childSubmitApprovalApi(data)
      } catch (error) {
        if (error.response.data.code === 200) {
          this.refreshTableList()
          this.operateDialogVisible = false
          return this.$message.success(error.response.data.msg)
        }
        error && this.$message.error(error.response.data.msg)
      }
    },
    // 困境儿童审批提交 根据儿童ID
    async childSubmitClose (data) {
      try {
        await childSubmitCloseApi(data)
      } catch (error) {
        this.errorOperation(error)
      }
    },
    // 退回到退回节点
    async childReturn (data) {
      try {
        await childReturnApi(data)
      } catch (error) {
        this.errorOperation(error)
      }
    },
    // 退回到核查派单
    async childReturnToReturn (data) {
      try {
        await childReturnToReturnApi(data)
      } catch (error) {
        console.log(error, "退回到核查派单")
      }
    },
    // 刷新table列表
    refreshTableList () {
      this.childGetChildList(this.historyForm)
      this.getStatusNums({
        businessNode: "审批",
        disabilityType: this.historyForm.disabilityType,         //  困境儿童残疾类型 (非残疾,智力残疾,肢体残疾,听力残疾,精神残疾,视力残疾,言语残疾,多重残疾
        idCard: this.historyForm.idCard,                 // 儿童身份证
        name: this.historyForm.name,                   // name
        type: this.historyForm.type,                   // 困境儿童救助类型:孤儿,事实无人抚养,重病重残,贫困家庭,其他
        whetherDisability: this.historyForm.whetherDisability,      // 是否残疾
        whetherHealth: this.historyForm.whetherHealth,          // 是否健康
        whetherSeriousIllness: this.historyForm.whetherSeriousIllness,  // 是否重病
        divisionCode: this.historyForm.divisionCode,           // 行政区划代码
      })
    },
    // error 
    errorOperation (error) {
      // 刷新列表以及tab红色数值
      this.refreshTableList()
      if (error.response.data.code === 200) {
        // 关闭 处理 弹框
        this.operateDialogVisible = false
        // 成功提示
        return this.$message.success(error.response.data.msg)
      }
      error && this.$message.error(error.response.data.msg)
    },
    // 注销
    async affirmCancel (id, cancelRemark) {
      try {
        await createChildCancelApi(id, cancelRemark)
      } catch (error) {
        this.errorOperation(error)
      }
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
/deep/.has-gutter th {
  text-align: center !important;
}
/deep/ .el-table__row td {
  text-align: center !important;
}
.tabNum {
  background-color: red;
  color: white;
  width: 30px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  text-align: center;
}
</style>
<template>
  <div class="g-box">
    <!-- 查询 -->
    <div class="search">
      <el-form :inline="true"
               :model="searchData"
               label-width="100"
               class="demo-form-inline">
        <el-form-item label="儿童姓名">
          <el-input v-model="searchData.name"
                    placeholder="儿童姓名"></el-input>
        </el-form-item>
        <el-form-item label="儿童身份证"
                      label-width="100px">
          <el-input v-model="searchData.idCard"
                    placeholder="儿童身份证"
                    style="width: 180px"></el-input>
        </el-form-item>
        <el-form-item label="是否有劳动能力"
                      label-width="130px">
          <el-select v-model="searchData.whetherHealth"
                     placeholder="是否有劳动能力">
            <el-option v-for="item in whethers"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否残疾">
          <el-select v-model="searchData.whetherDisability"
                     placeholder="请选择是否残疾">
            <el-option v-for="item in whethers"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否重病">
          <el-select v-model="searchData.whetherSeriousIllness"
                     placeholder="请选择是否重病">
            <el-option v-for="item in whethers"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="残疾类型">
          <el-select v-model="searchData.disabilityType"
                     placeholder="请选择残疾类型">
            <el-option v-for="item in disabilityTypes"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="行政区划">
          <el-cascader v-model="xzqhArray"
                       :props="props"
                       clearable
                       placeholder="行政区划"></el-cascader>
        </el-form-item>
        <el-form-item>
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
          <el-button icon="el-icon-circle-plus"
                     type="danger"
                     @click="dialogVisible=true">
            新增
          </el-button>
          <el-button type="success"
                     icon="el-icon-folder-opened"
                     @click="exportTble">导出列表</el-button>
          <el-button type="primary"
                     icon="el-icon-folder-add"
                     @click="$refs.uploadInput.click()">金民数据导入</el-button>
          <input class="file"
                 ref="uploadInput"
                 type="file"
                 accept=".xls,.xlsx"
                 style="opacity:0"
                 enctype="multipart/form-data"
                 @change="readExcel($event)" />
          <!-- </div> -->
        </el-form-item>
      </el-form>
    </div>
    <!-- 导入excel dialog -->
    <el-dialog title="提示"
               :visible.sync="uploadExceldialogVisible"
               width="30%"
               :before-close="uploadExcelHandleClose">
      <el-form>
        <el-form-item label="儿童类型"
                      :rules="[{ required: true, message: '请选择困境儿童导入类型', trigger: 'change' }]">
          <el-select v-model="excelChildClass"
                     placeholder="请选择困境儿童导入类型">
            <el-option label="孤儿"
                       value="孤儿"></el-option>
            <el-option label="事实无人抚养"
                       value="事实无人抚养"></el-option>
            <el-option label="重病重残"
                       value="重病重残"></el-option>
            <el-option label="贫困家庭"
                       value="贫困家庭"></el-option>
            <el-option label="其他"
                       value="其他"></el-option>
            <el-option label="未知"
                       value="未知"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="uploadExcelHandleClose">取 消</el-button>
        <el-button type="primary"
                   @click="confirmUploadExcel">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 新增困境儿童表单弹框 -->
    <el-dialog :visible.sync="dialogVisible"
               title="新增困境儿童"
               width="60%">
      <el-form :model="childDataForm"
               ref="addChildRef"
               label-width="80px">
        <!-- 姓名 身份证 -->
        <el-row>
          <el-col :span="12">
            <el-form-item :rules="{
                required: true, message: '姓名不能为空', trigger: 'blur'
              }"
                          label="姓名"
                          label-width="140px">
              <el-input v-model="childDataForm.basicInfo.name"
                        placeholder="请输入儿童姓名"></el-input>
            </el-form-item></el-col>
          <el-col :span="12">
            <el-form-item label="身份证号码"
                          :rules="{
              required: true, message: '身份证号码不可为空', trigger: 'blur'
            }"
                          label-width="140px">
              <el-input v-model="childDataForm.basicInfo.idCard"
                        placeholder="请输入儿童身份证号码"></el-input>
            </el-form-item></el-col>
        </el-row>
        <!-- 是否健康 行政区划 -->
        <el-row>
          <el-col :span="12">
            <el-form-item :rules="{
                required: true, message: '是否健康不可为空', trigger: 'blur'
              }"
                          label="是否健康"
                          label-width="140px">
              <el-select v-model="childDataForm.basicInfo.whetherHealth"
                         placeholder="请选择儿童是否健康"
                         style="width:100%">
                <el-option :value="true"
                           label="是"></el-option>
                <el-option :value="false"
                           label="否"></el-option>
              </el-select>
              <!-- <el-radio-group v-model="childDataForm.basicInfo.whetherHealth">
                <el-radio label="是"></el-radio>
                <el-radio label="是"></el-radio>
              </el-radio-group> -->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :rules="{
                required: true, message: '行政区划不能为空', trigger: 'blur'
              }"
                          label="行政区划"
                          label-width="140px">
              <el-cascader v-model="xzqhArray"
                           style="width:100%"
                           :props="addProp"
                           @change="addXzqhChange"
                           clearable
                           placeholder="请选择归属行政区划"></el-cascader>
            </el-form-item></el-col>
        </el-row>
        <!-- 是否健康 行政区划 -->
        <el-row>
          <el-col :span="12">
            <el-form-item :rules="{
          required: true, message: '户籍地址不能为空', trigger: 'blur'
        }"
                          label="户籍地址"
                          label-width="140px">
              <el-input v-model="childDataForm.basicInfo.censusRegisterAddress"
                        placeholder="请输入儿童户籍地址"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :rules="{
          required: true, message: '居住地址不能为空', trigger: 'blur'
        }"
                          label="居住地址"
                          label-width="140px">
              <el-input v-model="childDataForm.basicInfo.residentialAddress"
                        placeholder="请输入儿童居住地址"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="insertChild()">确 定</el-button>
      </span>
    </el-dialog>
    <div class="content">
      <el-tabs v-model="activeName"
               @tab-click="handleClickSelect">
        <el-tab-pane v-for="(item, index) in options2"
                     :key="index"
                     :label="item.listname"
                     :name="item.listname">
          <span slot="label">{{ item.value }}
            <!-- 列表数据数量显示 -->
            <span v-if="item.label"
                  class="tabNum">
              {{ item.label > 99 ? "99" : item.label}}
            </span>
            <!-- <span v-else-if="item.label && item.label > 99"
                  class="tabNum">
              99+
            </span> -->
          </span>
        </el-tab-pane>
      </el-tabs>
      <el-table ref="multipleTable"
                v-loading="loading"
                :data="tableData"
                border
                height="100%"
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
        <el-table-column label="儿童姓名">
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
        <el-table-column :formatter="formatBoolean"
                         label="是否完成上门核查"
                         width="140">
          <template slot-scope="{row}">
            <p :title="row.whetherChecked"
               class="ellipsis">{{row.whetherChecked? "是": "否"}}</p>
          </template>
        </el-table-column>
        <el-table-column :formatter="formatBoolean"
                         label="是否患有重病"
                         width="120">
          <template slot-scope="{row}">
            <p :title="row.whetherSeriousIllness"
               class="ellipsis">{{row.whetherSeriousIllness? "是": "否"}}</p>
          </template>
        </el-table-column>
        <el-table-column :formatter="formString"
                         label="重病类型">
          <template slot-scope="{row}">
            <p :title="row.seriousIllnessType"
               class="ellipsis">{{row.seriousIllnessType}}</p>
          </template>
        </el-table-column>
        <el-table-column :formatter="formatBoolean"
                         label="是否患有残疾"
                         width="120">
          <template slot-scope="{row}">
            <p :title="row.whetherDisability"
               class="ellipsis">{{row.whetherDisability ? "是": "否"}}</p>
          </template>
        </el-table-column>
        <el-table-column :formatter="formString"
                         label="残疾类型"
                         prop="disabilityType"></el-table-column>
        <el-table-column :formatter="formString"
                         label="残疾等级"
                         prop="disabilityLevel"></el-table-column>
        <el-table-column label="申请时间"
                         width="100px">
          <template slot-scope="{row}">
            <p :title="row.applyTime"
               class="ellipsis">{{row.applyTime}}</p>
          </template>
        </el-table-column>
        <el-table-column v-if="isReturn"
                         label="退回时间"
                         width="100px">
          <template slot-scope="{row}">
            <p :title="row.backTime"
               class="ellipsis">{{row.backTime}}</p>
          </template>
        </el-table-column>
        <el-table-column v-if="isCheckDispatch"
                         label="核查派单时间"
                         width="100px">
          <template slot-scope="{row}">
            <p :title="row.dispatchTime"
               class="ellipsis">{{row.dispatchTime}}</p>
          </template>
        </el-table-column>
        <el-table-column v-if="isInformationCheck"
                         label="信息核对时间"
                         width="100px">
          <template slot-scope="{row}">
            <p :title="row.checkTime"
               class="ellipsis">{{row.checkTime}}</p>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="behalfApply" label="是否代申请" width="100px"></el-table-column> -->
        <el-table-column label="申请人"
                         width="100px">
          <template slot-scope="{row}">
            <p :title="row.applyName"
               class="ellipsis">{{row.applyName}}</p>
          </template>
        </el-table-column>
        <el-table-column :width="cazuoBtn"
                         style="text-align: center;"
                         fixed="right"
                         label="操作"
                         prop="active">
          <template slot-scope="scope">
            <el-button-group>
              <el-button size="small"
                         type="primary"
                         @click="handleClick(scope.row,'查看')">查看</el-button>
              <!-- 申请节点的按钮 -->
              <el-button v-if="isApplication"
                         size="small"
                         type="primary"
                         @click="handleClick(scope.row ,'修改')">修改
              </el-button>
              <el-button v-if="isApplication"
                         size="small"
                         type="danger"
                         @click="handleClick(scope.row ,'核查派单')">核查派单
              </el-button>
              <!-- 退回节点的按钮 -->
              <el-button v-if="isReturn"
                         size="small"
                         type="danger"
                         @click="handleClick(scope.row ,'退回重新核查')">退回重新核查
              </el-button>
              <el-button v-if="isReturn"
                         size="small"
                         type="danger"
                         @click="handleClick(scope.row ,'删除')">
                删除
              </el-button>
              <!-- 核查派单节点的按钮 -->
              <el-button v-if="isCheckDispatch"
                         size="small"
                         type="primary"
                         @click="handleClick(scope.row ,'上门核查')">
                上门核查
              </el-button>
              <el-button v-if="isCheckDispatch"
                         size="small"
                         type="danger"
                         @click="handleClick(scope.row ,'提交信息核对')">
                提交信息核对
              </el-button>
              <el-button v-if="isCheckDispatch"
                         size="small"
                         type="primary"
                         @click="handleClick(scope.row ,'退回')">退回
              </el-button>
              <!-- 信息核对节点的按钮 -->
              <el-button v-if="isInformationCheck"
                         size="small"
                         type="primary"
                         @click="handleClick(scope.row ,'政策计算')">政策计算
              </el-button>
              <!-- <el-button v-if="isInformationCheck"
                         size="small"
                         type="primary"
                         @click="handleClick(scope.row ,'查看核对报告')">查看核对报告
              </el-button> -->
              <el-button v-if="isInformationCheck"
                         size="small"
                         type="danger"
                         @click="handleClick(scope.row ,'提交审核')">
                提交审核
              </el-button>
              <!--  <el-button v-if="isInformationCheck"
                         size="small"
                         type="primary"
                         @click="handleClick(scope.row ,'退回重新核查')">退回重新核查
              </el-button> -->
              <el-button v-if="isInformationCheck"
                         size="small"
                         type="primary"
                         @click="handleClick(scope.row ,'退回')">
                退回
              </el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
        <el-table-column label="应发金额">
          <template slot-scope="{row}">
            <!-- <el-input type="number"
                      min="0"
                      v-model.trim="row.money"
                      placeholder="请输入应发金额"></el-input> -->
            <p :title="row.money"
               class="ellipsis">{{row.money}}</p>
          </template>
        </el-table-column>
        <el-table-column label="低保金">
          <template slot-scope="{row}">
            <p :title="row.basicLivingMoney"
               class="ellipsis">{{row.basicLivingMoney}}</p>
          </template>
        </el-table-column>
        <el-table-column label="残疾人补助金">
          <template slot-scope="{row}">
            <!-- <el-input type="number"
                      min="0"
                      v-model.trim="row.disabledSubsidyMoney"
                      placeholder="请输入残疾人补助金"></el-input> -->
            <p :title="row.disabledSubsidyMoney"
               class="ellipsis">{{row.disabledSubsidyMoney}}</p>
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
    <!-- 分页-->
    <div class="block footer">
      <!-- <span class="demonstration">完整功能</span>  -->
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
// import commonList from "../commonList";
import request from "@/utils/request";
import {
  commonExcelExportApi,
  tbjmExcelDataUploadApi, // 金民儿童数据导入
  childDeleteApi, // 退回节点 删除接口
} from "@/api/lifeRescue/plightChildren"
import {
  countChildTypeApi,
  setChildTypeApi, // 设置困境儿童救助类型和金额
} from "@/api/lifeRescue/predicamentChild"

export default {
  name: "yjptsz",
  data () {
    return {
      // 导入excel dialog
      uploadExceldialogVisible: false,
      excelChildClass: '', // 上传困境儿童excel文件的 儿童类型
      dataInfo: {}, // excel export data
      policyDialogVisible: false,
      policyClass: [],
      dialogVisible: false,
      isOpenInsertChild: false,
      cazuoBtn: '240',
      isApplication: false, //是否申请节点
      isReturn: false, //是否退回节点
      isCheckDispatch: false, //是否核查派单节点
      isInformationCheck: false, //是否信息核对节点
      tabsNum2: {}, //业务节点数据数量
      //布尔类型下拉框
      whethers: [
        {
          value: "true",
          label: "是",
        },
        {
          value: "false",
          label: "否",
        },
      ],
      //困境儿童残疾类型 (非残疾,智力残疾,肢体残疾,听力残疾,精神残疾,视力残疾,言语残疾,多重残疾)
      disabilityTypes: [
        {
          value: "智力残疾",
          label: "智力残疾",
        },
        {
          value: "肢体残疾",
          label: "肢体残疾",
        },
        {
          value: "听力残疾",
          label: "听力残疾",
        },
        {
          value: "精神残疾",
          label: "精神残疾",
        },
        {
          value: "视力残疾",
          label: "视力残疾",
        },
        {
          value: "言语残疾",
          label: "言语残疾",
        },
        {
          value: "多重残疾",
          label: "多重残疾",
        },
      ],
      //困境儿童救助类型:孤儿,事实无人抚养,重病重残,贫困家庭,其他,未知
      options: [
        {
          value: "孤儿",
          label: "孤儿",
        },
        {
          value: "事实无人抚养",
          label: "事实无人抚养",
        },
        {
          value: "重病重残",
          label: "重病重残",
        },
        {
          value: "贫困家庭",
          label: "贫困家庭",
        },
        {
          value: "其他",
          label: "其他",
        },
        {
          value: "未知",
          label: "未知",
        },
      ],
      //申请,退回,核查派单,信息核对,审核,审批,办结
      options2: [
        {
          value: "申请",
          label: 0,
        },
        {
          value: "退回",
          label: 0,
        },
        {
          value: "核查派单",
          label: 0,
        },
        {
          value: "信息核对",
          label: 0,
        },
      ],
      newStatus: "申请",
      activeName: "", //业务节点名
      tableData: [],
      tabsNum2: {},       //业务节点数据数量
      page: 1, //当前页
      pageNum: "1",
      pageSize: 10,
      totalElements: 0, //总数
      loading: true,
      searchData: {
        applyName: "",
        checkStatus: "",
        disabilityTypes: "",
        idCard: "",
        name: "",
        pageSize: "", //每页几条
        sortField: "", //排序
        source: "",
        status: "",
        type: "",
        whetherDisability: "",
        whetherHealth: "",
        whetherSeriousIllness: "",
        completeDivisionCode: "",
        district: "",
        townStreet: "",
        village: ""
      },
      childDataForm: {
        assureInfo: {},
        basicInfo: {
          name: '',
          idCard: '',
          gender: '',
          birth: '',
          completeDivisionCode: '',
          district: '',
          townStreet: '',
          village: '',
          divisionCode: '',
          censusRegisterAddress: '',
          residentialAddress: '',
          whetherHealth: "",
          source: '电脑端申请'
        },
        familyInfo: {},
      },
      xzqhArray: [], //行政区划搜索
      addProp: {
        lazy: true,
        lazyLoad (node, resolve) {
          const { level } = node; // 获取当前node对象中的level属性
          let pId = "0";
          if (level > 0) {
            let value = node.value;
            if (value) {
              let values = value.split("#")
              pId = values.length > 1 ? values[1] : "0";
            }
          }
          request({
            url: "/social/assistance/getCityOption",
            method: "post",
            data: {
              pId: pId
            }
          }).then(res => {
          }).catch(res => {
            const nodes = res.response.data;
            nodes.forEach(item => {
              item.value = item.cs_ex2 + "#" + item.cs_ex1;
              item.label = item.cs_ex2;
              item.leaf = level >= 2; //判断是否为末尾节点，这个地方是0,1,2三级
            })
            resolve(nodes);
          })
        }
      },
      props: {
        checkStrictly: true,
        lazy: true,
        lazyLoad (node, resolve) {
          const { level } = node; // 获取当前node对象中的level属性
          let pId = "0";
          if (level > 0) {
            let value = node.value;
            if (value) {
              let values = value.split("#")
              pId = values.length > 1 ? values[1] : "0";
            }
          }
          request({
            url: "/social/assistance/getCityOption",
            method: "post",
            data: {
              pId: pId
            }
          }).then(res => {
          }).catch(res => {
            const nodes = res.response.data;
            nodes.forEach(item => {
              item.value = item.cs_ex2 + "#" + item.cs_ex1;
              item.label = item.cs_ex2;
              item.leaf = level >= 2; //判断是否为末尾节点，这个地方是0,1,2三级
            })
            resolve(nodes);
          })
        }
      },
    };
  },

  components: {
    // commonList,
  },
  created () {
    this.isApplication = true;
    this.loadData({
      checkStatus: this.searchData.checkStatus,
      disabilityType: this.searchData.disabilityType,
      idCard: this.searchData.idCard,
      name: this.searchData.name,
      source: this.searchData.source,
      status: this.newStatus,
      whetherDisability: this.searchData.whetherDisability,
      whetherHealth: this.searchData.whetherHealth,
      whetherSeriousIllness: this.searchData.whetherSeriousIllness,
      divisionCode: this.searchData.completeDivisionCode,
      pageNo: this.page, //第几页默认从0开始
      pageSize: this.pageSize, //每页几条
    });
    this.getStatusNums();
    this.doLayout();
  },
  watch: {
    xzqhArray (newA, oldA) {
      //console.log(newA);
      // console.log(newA.length);
      // let i = newA[0].split("#")[0] + "#" + newA[1].split("#")[0];
      let i = null;
      if (newA.length > 0) {
        i = newA.length == 1 ? newA[0].split("#")[1] : i;
        i = newA.length == 2 ? newA[1].split("#")[1] : i;
        i = newA.length == 3 ? newA[2].split("#")[1] : i;
      }
      this.searchData.completeDivisionCode = i;
      if (newA[0]) {
        let qu = newA[0].split("#")[0]
        let zhen = newA[1].split("#")[0]
        let cun = newA[2].split("#")[0]
        let divisioncode = newA[2].split("#")[1]
        this.childDataForm.basicInfo.completeDivisionCode = newA[0] + "," + newA[1] + "," + newA[2]
        this.childDataForm.basicInfo.district = qu
        this.childDataForm.basicInfo.townStreet = zhen
        this.childDataForm.basicInfo.village = cun
        this.childDataForm.basicInfo.divisionCode = divisioncode
      }
      //console.log("驾驶大"+i);
    },
  },
  methods: {
    // 退回节点 删除按钮
    async childDelete (data) {
      try {
        await childDeleteApi(data)
      } catch (error) {
        if (error.response.data.code !== 200) return this.$message.error(error.response.data.msg)
        this.kjetList(this.dataInfo)
        this.getStatusNums();
        // this.doLayout();
      }
    },
    /* 重新渲染table组件 */
    doLayout () {
      let that = this
      this.$nextTick(() => {
        that.$refs.multipleTable.doLayout()
      })
    },
    readExcel (e) {
      if (e.target && !e.target.files[0]) return false;
      this.uploadExceldialogVisible = true
    },
    uploadExcelHandleClose () {
      this.uploadExceldialogVisible = false
      this.excelChildClass = ""
      this.$refs.uploadInput.value = ""
    },
    async confirmUploadExcel () {
      if (!this.excelChildClass) return this.$message.error("请选择上传类型")
      this.uploadExceldialogVisible = false
      var formData = new FormData()
      // 通过files就可以拿到所有上传的文件，如果是多个文件循环即可
      formData.append('file', this.$refs.uploadInput.files[0])
      formData.set("type", this.excelChildClass)
      try {
        await tbjmExcelDataUploadApi(formData)
      } catch (error) {
        if (error && error.response.data.code === 200) return this.$message.success(error.response.data.msg)
        error ? this.$message.error(error.response.data.msg) : this.$message.error("excel导入失败")
      } finally {
        this.excelChildClass = ""
        this.$refs.uploadInput.value = ""
      }
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
    // 换页
    handleSizeChange (val) {
      this.dataInfo.pageSize = val
      this.loadData(this.dataInfo);
      console.log(`每页 ${val} 条`);
    },
    // 跳页
    handleCurrentChange (val) {
      this.dataInfo.pageNo = val
      this.loadData(this.dataInfo);
      console.log(`当前页: ${val}`);
    },
    // 查询
    queryListByCriteria () {
      this.page = 1;
      this.loadData({
        checkStatus: this.searchData.checkStatus,
        disabilityType: this.searchData.disabilityType,
        idCard: this.searchData.idCard,
        name: this.searchData.name,
        source: this.searchData.source,
        status: this.newStatus,
        whetherDisability: this.searchData.whetherDisability,
        whetherHealth: this.searchData.whetherHealth,
        whetherSeriousIllness: this.searchData.whetherSeriousIllness,
        divisionCode: this.searchData.completeDivisionCode,
        pageNo: this.page, //第几页默认从0开始
        pageSize: this.pageSize, //每页几条
      });
      this.getStatusNums();
    },
    // 重置
    resetQuery () {
      this.searchData = {
        applyName: "",
        checkStatus: "",
        disabilityTypes: "",
        idCard: "",
        name: "",
        pageSize: "", //每页几条
        sortField: "", //排序
        source: "",
        status: "",
        type: "",
        whetherDisability: "",
        whetherHealth: "",
        whetherSeriousIllness: "",
        completeDivisionCode: "",
        district: "",
        townStreet: "",
        village: ""
      },
        this.xzqhArray = []
    },
    // 复选
    handleSelectionChange (val) {
      // this.multipleSelection = val;
    },
    addXzqhChange (val) {
      if (!val.length) return
      const str = val.join("").replace(/[0-9#]/g, "")
      // 如果户籍地址和居住地址还没填的话给其复制行政区划
      if (!this.childDataForm.basicInfo.censusRegisterAddress) this.childDataForm.basicInfo.censusRegisterAddress = str
      if (!this.childDataForm.basicInfo.residentialAddress) this.childDataForm.basicInfo.residentialAddress = str
    },
    //新增困境儿童
    async insertChild () {
      if (!this.childDataForm.basicInfo.name) return this.$message.warning("姓名不可为空")
      if (!this.childDataForm.basicInfo.idCard) return this.$message.warning("身份证号码不可为空")
      if (!this.childDataForm.basicInfo.whetherHealth === '') return this.$message.warning("是否健康不可为空")
      if (!this.xzqhArray.length) return this.$message.warning("行政区划不可为空")
      if (!this.childDataForm.basicInfo.censusRegisterAddress) return this.$message.warning("户籍地址不可为空")
      if (!this.childDataForm.basicInfo.residentialAddress) return this.$message.warning("居住地址不可为空")

      this.childDataForm.basicInfo.gender = this.getSex(this.childDataForm.basicInfo.idCard)
      this.childDataForm.basicInfo.birth = this.getBirthday(this.childDataForm.basicInfo.idCard)
      this.addChildInfo({
        "basicInfo": this.childDataForm.basicInfo,
        "assureInfo": this.childDataForm.assureInfo,
        "familyInfo": this.childDataForm.familyInfo
      }).then((res) => {

      }).catch((res) => {
        if (res.response.data.status == "+OK") {
          this.searchData.completeDivisionCode = '';
          this.getStatusNums();
          this.loadData(this.dataInfo);
          // 关闭dialog 清空表单信息
          this.resetAddChildInfo()
          this.$message.success("申请成功");

        } else {
          this.getStatusNums();
          this.$message({
            type: "error",
            message: res.response.data.msg,
          });
        }
      })

    },
    resetAddChildInfo () {
      this.dialogVisible = false;
      this.xzqhArray = []
      this.childDataForm.basicInfo = {
        name: '',
        idCard: '',
        gender: '',
        birth: '',
        completeDivisionCode: '',
        district: '',
        townStreet: '',
        village: '',
        divisionCode: '',
        censusRegisterAddress: '',
        residentialAddress: '',
        whetherHealth: "",
        source: '电脑端申请'
      }
    },
    //获取年龄
    getAge (identityCard) {
      var len = (identityCard + "").length;
      if (len == 0) {
        return '';
      } else {
        if ((len != 18))//身份证号码只能为18位其它不合法
        {
          return '';
        }
      }
      var strBirthday = "";
      if (len == 18)//处理18位的身份证号码从号码中得到生日和性别代码
      {
        strBirthday = identityCard.substr(6, 4) + "/" + identityCard.substr(10, 2) + "/" + identityCard.substr(12, 2);
      }
      //时间字符串里，必须是“/”
      var birthDate = new Date(strBirthday);
      var nowDateTime = new Date();
      var age = nowDateTime.getFullYear() - birthDate.getFullYear();
      //再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
      if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() == birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    },
    //根据身份证获取性别
    getSex (card) {
      let sex = "";
      //获取性别
      if (parseInt(card.substr(16, 1)) % 2 == 1) {
        sex = "男";
      } else {
        sex = "女";
      }
      return sex;
    },
    //获取出生日期
    getBirthday (IdCard) {
      let birthday = "";
      birthday = IdCard.substring(6, 10) + "-" + IdCard.substring(10, 12) + "-" + IdCard.substring(12, 14)
      return birthday;
    },
    //切换业务节点
    handleClickSelect () {
      this.page = 1
      this.loading = true;
      //1=申请  2=退回  3=委托确认  4=信息核对
      if (this.activeName == 0) {
        this.newStatus = "申请";
        this.isApplication = true;
        this.isReturn = false;
        this.isCheckDispatch = false;
        this.isInformationCheck = false;
        this.cazuoBtn = '240';
      } else if (this.activeName == 1) {
        this.newStatus = "退回";
        this.isReturn = true;
        this.isApplication = false;
        this.isCheckDispatch = false;
        this.isInformationCheck = false;
        this.cazuoBtn = '260';
      } else if (this.activeName == 2) {
        this.newStatus = "核查派单";
        this.isCheckDispatch = true;
        this.isApplication = false;
        this.isReturn = false;
        this.isInformationCheck = false;
        this.cazuoBtn = '340';
      } else if (this.activeName == 3) {
        this.newStatus = "信息核对";
        this.isInformationCheck = true;
        this.isCheckDispatch = false;
        this.isApplication = false;
        this.isReturn = false;
        this.cazuoBtn = '360';
      }
      // status
      this.dataInfo.status = this.newStatus
      this.loadData(this.dataInfo);
      this.doLayout();
    },
    closeView () {
      this.$emit("closes", false);
      this.$router.go(-1);
      if (process.env.NODE_ENV != "development") {
        this.$router.go(-1);
      }
    },
    // 操作按钮
    async handleClick (data, key) {
      if (key == "查看") {
        if (process.env.NODE_ENV == "development") {
          //生产环境执行
          // grade 信息显示等级 1：区（市）2：街道； confirmationDate 选择的年月
          this.$router.push({
            path: "/social/assistance/kjet/kjetListView?id=" + data.id,
          });
        } else {
          this.$pushRouter({
            path:
              generalConfig.defaultUrl +
              "/social/assistance/kjet/kjetListView?id=" + data.id,
          });
        }
      } else if (key == "修改") {

        if (process.env.NODE_ENV == "development") {
          //生产环境执行
          // grade 信息显示等级 1：区（市）2：街道； confirmationDate 选择的年月
          this.$router.push({
            path: "/social/assistance/kjet/kjetCheck?node=sh&sId=" + data.id,
          });
        } else {
          this.$pushRouter({
            path:
              generalConfig.defaultUrl + "/social/assistance/kjet/kjetCheck?node=sh&sId=" + data.id,
          });
        }
      } else if (key == "上门核查") {

        if (process.env.NODE_ENV == "development") {
          //生产环境执行
          // grade 信息显示等级 1：区（市）2：街道； confirmationDate 选择的年月
          this.$router.push({
            path: "/social/assistance/kjet/kjetCheck?sId=" + data.id,
          });
        } else {
          this.$pushRouter({
            path:
              generalConfig.defaultUrl + "/social/assistance/kjet/kjetCheck?sId=" + data.id,
          });
        }
      } else if (key == "核查派单" || key == "退回重新核查") {
        this.$confirm("此操作将提交数据到核查派单, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          this.loading = true;
          this.submitCheckDispatch({
            id: data.id,
            result: "同意",
          })
            .then((res) => {
              console.log(res, "then");
            })
            .catch((res) => {
              if (res.response.data.status == "+OK") {
                this.loadData(this.dataInfo);
                this.getStatusNums();
                this.loading = false;
                this.$message({
                  type: "success",
                  message: "提交至核查派单成功!",
                });
              } else {
                this.loadData(this.dataInfo);
                this.getStatusNums();
                this.loading = false;
                this.$message({
                  type: "error",
                  message: res.response.data.msg,
                });
              }
            });
        })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消提交到核查派单",
            });
          });
      } else if (key == "删除") {
        this.$confirm('确定要删除这条记录吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 用户点击了“确定”按钮，执行相应的操作
          this.childDelete({ id: data.id })
        }).catch(() => {
          // 用户点击了“取消”按钮，不执行任何操作
        })

        // console.log("删除",data)
      } else if (key == "提交信息核对") {
        this.$confirm("此操作将本条数据提交到信息核对, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.loading = true;
            this.submitCheckInfo({
              id: data.id,
              result: "同意",
            })
              .then((res) => {
                console.log(res, "then");
              })
              .catch((res) => {
                if (res.response.data.status == "+OK") {
                  this.loadData(this.dataInfo);
                  this.getStatusNums();
                  this.loading = false;
                  this.$message({
                    type: "success",
                    message: "提交至信息核对成功!",
                  });
                } else {
                  this.getStatusNums();
                  this.loading = false;
                  this.$message({
                    type: "error",
                    message: res.response.data.msg,
                  });
                }
              });
          })
          .catch((res) => {
            // return console.log(res, '已取消提交至信息核对')
            this.$message({
              type: "info",
              message: "已取消提交至信息核对",
            });
          });
      } else if (key == "退回") {
        if (process.env.NODE_ENV == "development") {
          //生产环境执行
          // grade 信息显示等级 1：区（市）2：街道； confirmationDate 选择的年月
          this.$router.push({
            path:
              "/social/assistance/kjet/kjetListView?type=退回&id=" + data.id,
          });
        } else {
          this.$pushRouter({
            path:
              generalConfig.defaultUrl + "/social/assistance/kjet/kjetListView?type=退回&id=" + data.id,
          });
        }
      } else if (key == "查看核对报告") {

      } else if (key == "政策计算") {
        this.countChildType(data.id)

      } else if (key == "提交审核") {
        this.$confirm("此操作将本条数据提交到审核, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.loading = true;
            this.submitToExamine({
              id: data.id,
              result: "同意",
              // data:this.searchData
            })
              .then((res) => {
                console.log(res, "then");
              })
              .catch((res) => {
                if (res.response.data.status == "+OK") {
                  this.loading = false;
                  this.loadData(this.dataInfo);
                  this.getStatusNums();
                  alert(res.response.data.msg)
                } else {
                  this.loading = false;
                  alert(res.response.data.msg)
                }
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消到信息核对",
            });
          });
      }

    },
    async loadData (dataInfo) {
      try {
        this.loading = true;
        await this.kjetList(dataInfo)
      } catch (error) {
        if (error.response.data.status == "+OK") {
          this.dataInfo = dataInfo
          this.tableData = error.response.data.data.content;
          this.totalElements = error.response.data.data.totalElements;
          this.totalPages = error.response.data.data.totalPages;
        } else {
          this.$message.error("网络错误");
        }
      } finally {
        this.loading = false;
      }
    },
    getStatusNums () {
      this.getChildNumsGroupByStatus({
        checkStatus: this.searchData.checkStatus,
        disabilityType: this.searchData.disabilityType,
        idCard: this.searchData.idCard,
        name: this.searchData.name,
        source: this.searchData.source,
        whetherDisability: this.searchData.whetherDisability,
        whetherHealth: this.searchData.whetherHealth,
        whetherSeriousIllness: this.searchData.whetherSeriousIllness,
        divisionCode: this.searchData.completeDivisionCode
      }).then((res) => {

      }).catch((res) => {
        for (var i = 0; i < this.options2.length; i++) {
          if (this.options2[i].value == '申请') {
            this.options2[i].label = res.response.data.data.申请
          }
          if (this.options2[i].value == '退回') {
            this.options2[i].label = res.response.data.data.退回
          }
          if (this.options2[i].value == '核查派单') {
            this.options2[i].label = res.response.data.data.核查派单
          }
          if (this.options2[i].value == '信息核对') {
            this.options2[i].label = res.response.data.data.信息核对
          }
        }
        // console.log(this.options2[1].value)
        // console.log("业务节点数量",res.response.data.data.核查派单)
      })
    },
    // countChildTypeApi
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
    // 设置困境儿童救助类型和金额
    savePolicyInfo (row) {
      this.setChildType(row)
    },
    async setChildType (data) {
      try {
        await setChildTypeApi(data)
      } catch (error) {
        if (error && error.response.data.status === "+OK") {
          return this.$message.success(error.response.data.msg)
        } else {
          error ? this.$message.error(error.response.data.msg) : this.$message.error("保存错误请稍后重试！")
        }

      }
    },
    async exportTble () {
      try {
        await commonExcelExportApi("/social/child/getChildList", this.dataInfo)
      } catch (error) {
        if (error && error.response.status === 200) {
          const base64Data = error.response.data.data;
          const fileName = "困境儿童申请列表.xlsx";
          this.downloadExcelFromBase64(base64Data, fileName);
        }
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
    savePicture (base64, fileName = "下载文件（测试）.zip") {
      var arr = base64.split(",");
      var bytes = atob(arr[1]);
      let ab = new ArrayBuffer(bytes.length);
      let ia = new Uint8Array(ab);
      for (let i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
      }
      var blob = new Blob([ab], { type: "application/octet-stream" });
      var url = URL.createObjectURL(blob);
      const el = document.createElement("a");
      el.style.display = "none";
      el.setAttribute("target", "_blank");
      fileName && el.setAttribute("download", fileName);
      el.href = url;
      document.body.appendChild(el);
      el.click();
      document.body.removeChild(el);
    },
    getOutExcel (fileName, res) {
      let blob = new Blob([res], { type: 'application/x-xls' });
      if (window.navigator.msSaveOrOpenBlob) {
        //兼容 IE & EDGE
        navigator.msSaveBlob(blob, fileName);
      } else {
        var link = document.createElement('a');
        // 兼容不同浏览器的URL对象
        const url = window.URL || window.webkitURL || window.moxURL;
        // 创建下载链接
        link.href = url.createObjectURL(blob);
        //命名下载名称
        link.download = fileName;
        //点击触发下载
        link.click();
        //下载完成进行释放
        url.revokeObjectURL(link.href);
      }
    },
    //接口
    kjetList (data) {
      return request({
        headers: {
          Accept: "application/json",
        },
        url: "/social/child/getChildList",
        method: "post",
        data: data,
      });
    },
    //申请提交到核查派单
    submitCheckDispatch (data) {
      return request({
        headers: {
          Accept: "application/json",
        },
        url: "/social/child/childSubmitCheckDispatch",
        method: "post",
        data: data,
      });
    },

    //退回到核查派单
    returnCheckDispatch (data) {
      return request({
        headers: {
          Accept: "application/json",
        },
        url: "/social/child/childReturnToReturn",
        method: "post",
        data: data,
      });
    },
    //核查派单提交到信息核对
    submitCheckInfo (data) {
      return request({
        headers: {
          Accept: "application/json",
        },
        url: "/social/child/childSubmitCheckInfo",
        method: "post",
        data: data,
      });
    },
    //信息核对提交到审核
    submitToExamine (data) {
      return request({
        headers: {
          Accept: "application/json",
        },
        url: "/social/child/childSubmitToExamine",
        method: "post",
        data: data,
      });
    },
    //获取各节点数据
    getChildNumsGroupByStatus (data) {
      return request({
        headers: {
          Accept: "application/json",
        },
        url: "/social/child/getChildNumsGroupByStatus",
        method: "post",
        data: data,
      });
    },
    //新增困境儿童
    addChildInfo (data) {
      return request({
        headers: {
          Accept: "application/json",
        },
        url: "/social/child/addChildInfo",
        method: "post",
        data: data,
      });
    },
  },
};
</script>
<style scoped>
.g-box {
  display: flex;
  /* width: 100%; */
  height: 80vh;
  flex-direction: column;
  /* overflow: hidden; */
  /* box-sizing: border-box; */
}

.search {
  display: flex;
}

.search .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 240px !important;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.e-table {
  flex: 1;
  overflow: auto;
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
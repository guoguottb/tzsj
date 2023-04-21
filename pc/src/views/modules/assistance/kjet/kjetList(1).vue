<template>
  <div class="g-box">
    <!-- 查询 -->
    <div class="search">
      <el-form :inline="true"
               :model="searchData"
               class="demo-form-inline">
        <el-form-item label="儿童姓名"
                      label-width="110px">
          <el-input v-model="searchData.name"
                    placeholder="儿童姓名"
                    style="width: 180px"></el-input>
        </el-form-item>
        <el-form-item label="儿童身份证"
                      label-width="110px">
          <el-input v-model="searchData.idCard"
                    placeholder="儿童身份证"
                    style="width: 180px"></el-input>
        </el-form-item>
        <el-form-item label="是否健康"
                      label-width="110px">
          <el-select v-model="searchData.whetherHealth"
                     placeholder="请选择是否健康">
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
                     placeholder="请选择是否残疾">
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
                     placeholder="请选择是否重病">
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
                     placeholder="请选择残疾类型">
            <el-option v-for="item in disabilityTypes"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="行政区划"
                      label-width="110px">
          <el-cascader v-model="xzqhArray"
                       :props="props"
                       clearable
                       placeholder="行政区划"></el-cascader>
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
          <el-button icon="el-icon-circle-plus"
                     type="danger"
                     @click="dialogVisible=true">
            新增
          </el-button>
          <!-- </div> -->
        </el-form-item>
      </el-form>
    </div>
    <!-- 新增困境儿童表单弹框 -->
    <el-dialog :visible.sync="dialogVisible"
               title="新增困境儿童"
               width="30%">
      <el-form :model="childDataForm"
               label-width="80px">
        <el-form-item :rules="{
			      required: true, message: '姓名不能为空', trigger: 'blur'
			    }"
                      label="姓名"
                      label-width="110px">
          <el-input v-model="childDataForm.basicInfo.name"></el-input>
        </el-form-item>
        <el-form-item :rules="{
			      required: true, message: '身份证不能为空', trigger: 'blur'
			    }"
                      label="身份证号码"
                      label-width="110px">
          <el-input v-model="childDataForm.basicInfo.idCard"></el-input>
        </el-form-item>
        <el-form-item :rules="{
			      required: true, message: '健康状态', trigger: 'blur'
			    }"
                      label="是否健康"
                      label-width="110px">
          <el-select v-model="childDataForm.basicInfo.whetherHealth">
            <el-option :value="true"
                       label="是"></el-option>
            <el-option :value="false"
                       label="否"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :rules="{
			      required: true, message: '行政区划不能为空', trigger: 'blur'
			    }"
                      label="行政区划"
                      label-width="110px">
          <el-cascader v-model="xzqhArray"
                       :props="addProp"
                       clearable
                       placeholder="行政区划"></el-cascader>
        </el-form-item>
        <el-form-item :rules="{
			      required: true, message: '户籍地址不能为空', trigger: 'blur'
			    }"
                      label="户籍地址"
                      label-width="110px">
          <el-input v-model="childDataForm.basicInfo.censusRegisterAddress"></el-input>
        </el-form-item>
        <el-form-item :rules="{
			      required: true, message: '居住地址不能为空', trigger: 'blur'
			    }"
                      label="居住地址"
                      label-width="110px">
          <el-input v-model="childDataForm.basicInfo.residentialAddress"></el-input>
        </el-form-item>
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
                         prop="name"
                         width="100px"></el-table-column>
        <el-table-column label="儿童身份证"
                         prop="idCard"
                         width="160px"></el-table-column>
        <el-table-column label="性别"
                         prop="gender"
                         width="100px"></el-table-column>
        <el-table-column label="年龄"
                         prop="age"
                         width="100px"></el-table-column>
        <el-table-column label="健康状态"
                         prop="healthStatus"
                         width="120px"></el-table-column>
        <el-table-column label="儿童类型"
                         prop="typeName"
                         width="100px"></el-table-column>
        <el-table-column :formatter="formatBoolean"
                         label="是否完成上门核查"
                         prop="whetherChecked"
                         width="150px"></el-table-column>
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
                         width="150px"></el-table-column>
        <el-table-column label="申请时间"
                         prop="applyTime"
                         width="100px"></el-table-column>
        <el-table-column v-if="isReturn"
                         label="退回时间"
                         prop="backTime"
                         width="100px"></el-table-column>
        <el-table-column v-if="isCheckDispatch"
                         label="核查派单时间"
                         prop="dispatchTime"
                         width="150px"></el-table-column>
        <el-table-column v-if="isInformationCheck"
                         label="信息核对时间"
                         prop="checkTime"
                         width="150px"></el-table-column>
        <!-- <el-table-column prop="behalfApply" label="是否代申请" width="100px"></el-table-column> -->
        <el-table-column label="申请人"
                         prop="applyName"
                         width="100px"></el-table-column>
        <el-table-column :width="cazuoBtn"
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
                         @click="handleClick(scope.row ,'救助申请不予批准决定书')">
                救助申请不予批准决定书
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
                         @click="handleClick(scope.row ,'查看核对报告')">查看核对报告
              </el-button>
              <el-button v-if="isInformationCheck"
                         size="small"
                         type="danger"
                         @click="handleClick(scope.row ,'提交审核')">
                提交审核
              </el-button>
              <el-button v-if="isInformationCheck"
                         size="small"
                         type="primary"
                         @click="handleClick(scope.row ,'退回重新核查')">退回重新核查
              </el-button>
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

export default {
  name: "yjptsz",
  data () {
    return {
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
          whetherHealth: false,
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
    this.loadData();
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
    // 换页
    handleSizeChange (val) {
      this.pageSize = val;
      this.loadData();
      console.log(`每页 ${val} 条`);
    },
    // 跳页
    handleCurrentChange (val) {
      this.page = val;
      this.loadData();
      console.log(`当前页: ${val}`);
    },
    // 查询
    queryListByCriteria () {
      this.page = 1;
      this.loadData();
      this.getStatusNums();
    },
    // 重置
    resetQuery () {
      this.searchData = {};
      this.xzqhArray = []
    },
    // 复选
    handleSelectionChange (val) {
      // this.multipleSelection = val;
    },
    //新增困境儿童
    insertChild () {
      var age = this.getAge(this.childDataForm.basicInfo.idCard)
      if (age > 18) {
        this.$message.warning("身份证年龄已大于18岁,无法申请困境儿童");
      } else {
        this.childDataForm.basicInfo.gender = this.getSex(this.childDataForm.basicInfo.idCard)
        this.childDataForm.basicInfo.birth = this.getBirthday(this.childDataForm.basicInfo.idCard)
        this.addChildInfo({
          "basicInfo": this.childDataForm.basicInfo,
          "assureInfo": this.childDataForm.assureInfo,
          "familyInfo": this.childDataForm.familyInfo
        }).then((res) => {

        }).catch((res) => {
          if (res.response.data.status == "+OK") {
            this.getStatusNums();
            this.dialogVisible = false;
            this.$message({
              type: "success",
              message: "申请成功!",
            });
          } else {
            this.getStatusNums();
            this.$message({
              type: "error",
              message: res.response.data.msg,
            });
          }
        })
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
        this.cazuoBtn = '350';
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
        this.cazuoBtn = '500';
      }
      this.loadData();
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
    handleClick (data, key) {
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
            path: "/social/assistance/kjet/addEditKjet?sId=" + data.id,
          });
        } else {
          this.$pushRouter({
            path:
              generalConfig.defaultUrl + "/social/assistance/kjet/addEditKjet?sId=" + data.id,
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
      } else if (key == "核查派单") {
        this.$confirm("此操作将提交数据到核查派单, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.loading = true;
            this.submitCheckDispatch({
              id: data.id,
              result: "同意",
              // data:this.searchData
            })
              .then((res) => {
                console.log(res, "then");
              })
              .catch((res) => {
                if (res.response.data.status == "+OK") {
                  this.loadData();
                  this.getStatusNums();
                  this.loading = false;
                  this.$message({
                    type: "success",
                    message: "提交至核查派单成功!",
                  });
                } else {
                  this.loadData();
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
      } else if (key == "退回重新核查") {

        this.$confirm("此操作将本条数据退回到核查派单, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.loading = true;
            this.returnCheckDispatch({
              id: data.id,
              result: "同意",
              // data:this.searchData
            })
              .then((res) => {
                console.log(res, "then");
              })
              .catch((res) => {
                if (res.response.data.status == "+OK") {
                  this.getStatusNums();
                  this.loading = false;
                  this.$message({
                    type: "success",
                    message: "退回至核查派单成功!",
                  });
                } else {
                  this.getStatusNums();
                  this.loading = false;
                  this.$message({
                    type: "info",
                    message: "退回至核查派单失败",
                  });
                }
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消退回到核查派单",
            });
          });
      } else if (key == "救助申请不予批准决定书") {

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
              // data:this.searchData
            })
              .then((res) => {
                console.log(res, "then");
              })
              .catch((res) => {
                if (res.response.data.status == "+OK") {
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
          .catch(() => {
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

      console.log(data);
    },
    loadData () {
      this.loading = true;
      this.kjetList({
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
      })
        .then((res) => {
          console.log(res, "then");
        })
        .catch((res) => {
          console.log(res.response.data, "catch");
          if (res.response.data.status == "+OK") {
            this.tableData = res.response.data.data.content;
            this.totalElements = res.response.data.data.totalElements;
            this.totalPages = res.response.data.data.totalPages;
            this.loading = false;
          } else {
            this.$message.error("网络错误");
            this.loading = false;
          }
        });
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
</style>
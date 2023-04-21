<template>
  <div class="g-box">
    <el-form :inline="true"
             :model="searchData"
             class="demo-form-inline tycxForm"
             label-width="160px"
             label-position="left">
      <el-form-item label="申请人姓名">
        <el-input v-model="searchData.name"
                  placeholder="申请人姓名"></el-input>
      </el-form-item>
      <el-form-item label="申请人身份证">
        <el-input v-model="searchData.idCard"
                  placeholder="申请人身份证"></el-input>
      </el-form-item>
      <el-button type="primary"
                 @click="subSelect">查询</el-button>
      <el-button type="info"
                 @click="subReset">重置</el-button>
    </el-form>
    <el-table :data="tableData"
              height="250"
              border
              style="width: 100%">
      <el-table-column label="姓名">
        <template slot-scope="{row}">
          <p :title="row.name"
             class="ellipsis">{{row.name}}</p>
        </template>
      </el-table-column>
      <el-table-column label="身份证号"
                       width="180">
        <template slot-scope="{row}">
          <p :title="row.idCard"
             class="ellipsis">{{row.idCard}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="disabledID"
                       label="残疾信息">
        <template slot-scope="scope">
          <el-button v-if="scope.row.disabledID=='0'"
                     type="text">无信息</el-button>
          <el-button v-else
                     type="text"
                     @click="openDisabledForm(scope.row.disabledID)">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="fillingID"
                       label="建档立卡信息">
        <template slot-scope="scope">
          <el-button v-if="scope.row.fillingID=='0'"
                     type="text">无信息</el-button>
          <el-button v-else
                     type="text"
                     @click="openFillForm(scope.row.fillingID)">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="illnessID"
                       label="大重病信息">
        <template slot-scope="scope">
          <el-button v-if="scope.row.illnessID=='0'"
                     type="text">无信息</el-button>
          <el-button v-else
                     type="text"
                     @click="openIllnessForm(scope.row.illnessID)">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="insuranceID"
                       label="长护险信息">
        <template slot-scope="scope">
          <el-button v-if="scope.row.insuranceID=='0'"
                     type="text">无信息</el-button>
          <el-button v-else
                     type="text"
                     @click="openInsureanceForm(scope.row.insuranceID)">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="chargeID"
                       label="高额医疗费信息">
        <template slot-scope="scope">
          <el-button v-if="scope.row.chargeID=='0'"
                     type="text">无信息</el-button>
          <el-button v-else
                     type="text"
                     @click="openChargeForm(scope.row.chargeID)">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="employeesID"
                       label="特困职工信息">
        <template slot-scope="scope">
          <el-button v-if="scope.row.employeesID=='0'"
                     type="text">无信息</el-button>
          <el-button v-else
                     type="text"
                     @click="openEmployeesForm(scope.row.employeesID)">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="transportationID"
                       label="陆运资格信息">
        <template slot-scope="scope">
          <el-button v-if="scope.row.transportationID=='0'"
                     type="text">无信息</el-button>
          <el-button v-else
                     type="text"
                     @click="openTransportationForm(scope.row.transportationID)">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="infoID"
                       label="死亡信息">
        <template slot-scope="scope">
          <el-button v-if="scope.row.infoID=='0'"
                     type="text">无信息</el-button>
          <el-button v-else
                     type="text"
                     @click="openswINFOForm(scope.row.infoID)">查看</el-button>
        </template>
      </el-table-column>
      <!-- <el-table-column
	   prop="helpInfo"
	   label="救助信息"
	   width="180">
	   <template slot-scope="scope">
	   			  <el-button  v-if="scope.row.disabledID=='0'" type="text">无信息</el-button>
	   			  <el-button  v-else type="text" @click="dialog = true">查看</el-button>			           
	    </template>
	 </el-table-column> -->
    </el-table>
    <!-- 残疾人信息 -->
    <el-drawer title="残疾人信息"
               :before-close="handleClose"
               :visible.sync="dialog1"
               direction="ltr"
               custom-class="demo-drawer"
               ref="drawer">
      <div class="demo-drawer__content">
        <el-form :model="disabledForm"
                 class="overflowAuto"
                 disabled>
          <el-form-item label="姓名"
                        :label-width="formLabelWidth">
            <el-input v-model="disabledForm.abdl_ex1"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别"
                        :label-width="formLabelWidth">
            <el-input v-model="disabledForm.abdl_ex2"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="街道"
                        :label-width="formLabelWidth">
            <el-input v-model="disabledForm.abdl_ex5"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="村居"
                        :label-width="formLabelWidth">
            <el-input v-model="disabledForm.abdl_ex6"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="残疾证号"
                        :label-width="formLabelWidth">
            <el-input v-model="disabledForm.abdl_ex7"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="身份证号"
                        :label-width="formLabelWidth">
            <el-input v-model="disabledForm.abdl_ex8"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="残疾类别"
                        :label-width="formLabelWidth">
            <el-input v-model="disabledForm.abdl_ex9"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="残疾等级"
                        :label-width="formLabelWidth">
            <el-input v-model="disabledForm.abdl_ex10"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系电话"
                        :label-width="formLabelWidth">
            <el-input v-model="disabledForm.abdl_ex15"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="所属地区"
                        :label-width="formLabelWidth">
            <el-input v-model="disabledForm.abdl_ex16"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="民族"
                        :label-width="formLabelWidth">
            <el-input v-model="disabledForm.abdl_ex28"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="居住地址"
                        :label-width="formLabelWidth">
            <el-input v-model="disabledForm.abdl_ex29"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="备注"
                        :label-width="formLabelWidth">
            <el-input v-model="disabledForm.abdl_ex30"
                      autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <!-- <div class="demo-drawer__footer">
         <el-button type="primary" @click="cancelForm">取 消</el-button>
       </div> -->
      </div>
    </el-drawer>
    <!--  建档立卡信息-->
    <el-drawer title="建档立卡信息"
               :before-close="handleClose"
               :visible.sync="dialog2"
               direction="ltr"
               custom-class="demo-drawer"
               ref="drawer">
      <div class="demo-drawer__content">
        <el-form :model="fillForm"
                 class="overflowAuto"
                 disabled>
          <el-form-item label="所属街道"
                        :label-width="formLabelWidth">
            <el-input v-model="fillForm.abf_ex1"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="所属村居"
                        :label-width="formLabelWidth">
            <el-input v-model="fillForm.abf_ex2"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="户主姓名"
                        :label-width="formLabelWidth">
            <el-input v-model="fillForm.abf_ex3"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="身份证号"
                        :label-width="formLabelWidth">
            <el-input v-model="fillForm.abf_ex4"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系电话"
                        :label-width="formLabelWidth">
            <el-input v-model="fillForm.abf_ex5"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="银行账号"
                        :label-width="formLabelWidth">
            <el-input v-model="fillForm.abf_ex6"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="开户银行"
                        :label-width="formLabelWidth">
            <el-input v-model="fillForm.abf_ex7"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="识别标准"
                        :label-width="formLabelWidth">
            <el-input v-model="fillForm.abf_ex8"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="贫困户类型"
                        :label-width="formLabelWidth">
            <el-input v-model="fillForm.abf_ex9"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="脱贫属性"
                        :label-width="formLabelWidth">
            <el-input v-model="fillForm.abf_ex10"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="脱贫时间"
                        :label-width="formLabelWidth">
            <el-input v-model="fillForm.abf_ex11"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="主要致困原因"
                        :label-width="formLabelWidth">
            <el-input v-model="fillForm.abf_ex12"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="其他致困原因"
                        :label-width="formLabelWidth">
            <el-input v-model="fillForm.abf_ex13"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="成员姓名"
                        :label-width="formLabelWidth">
            <el-input v-model="fillForm.abf_ex14"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="成员性别"
                        :label-width="formLabelWidth">
            <el-input v-model="fillForm.abf_ex15"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="成员身份证号"
                        :label-width="formLabelWidth">
            <el-input v-model="fillForm.abf_ex16"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="年龄"
                        :label-width="formLabelWidth">
            <el-input v-model="fillForm.abf_ex17"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="与户主关系"
                        :label-width="formLabelWidth">
            <el-input v-model="fillForm.abf_ex18"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="自理能力"
                        :label-width="formLabelWidth">
            <el-input v-model="fillForm.abf_ex19"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="证件类型"
                        :label-width="formLabelWidth">
            <el-input v-model="fillForm.abf_ex20"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="出生日期"
                        :label-width="formLabelWidth">
            <el-input v-model="fillForm.abf_ex21"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="民族"
                        :label-width="formLabelWidth">
            <el-input v-model="fillForm.abf_ex22"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="政治面貌"
                        :label-width="formLabelWidth">
            <el-input v-model="fillForm.abf_ex23"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="教育程度"
                        :label-width="formLabelWidth">
            <el-input v-model="fillForm.abf_ex24"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="在校生情况"
                        :label-width="formLabelWidth">
            <el-input v-model="fillForm.abf_ex25"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="健康状态"
                        :label-width="formLabelWidth">
            <el-input v-model="fillForm.abf_ex26"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="劳动力状态"
                        :label-width="formLabelWidth">
            <el-input v-model="fillForm.abf_ex27"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="是否现役军人"
                        :label-width="formLabelWidth">
            <el-input v-model="fillForm.abf_ex28"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="家庭成员致困原因"
                        :label-width="formLabelWidth">
            <el-input v-model="fillForm.abf_ex33"
                      autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <!-- <div class="demo-drawer__footer">
	      <el-button type="primary" @click="cancelForm">取 消</el-button>
	    </div> -->
      </div>
    </el-drawer>
    <!-- 大重病信息 -->
    <el-drawer title="重病信息"
               :before-close="handleClose"
               :visible.sync="dialog3"
               direction="ltr"
               custom-class="demo-drawer"
               ref="drawer">
      <div class="demo-drawer__content">
        <el-form :model="illnessForm"
                 class="overflowAuto">
          <el-form-item label="统筹区"
                        :label-width="formLabelWidth"
                        disabled>
            <el-input v-model="illnessForm.abi_ex1"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="镇街"
                        :label-width="formLabelWidth">
            <el-input v-model="illnessForm.abi_ex2"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="姓名"
                        :label-width="formLabelWidth">
            <el-input v-model="illnessForm.abi_ex3"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="身份证号"
                        :label-width="formLabelWidth">
            <el-input v-model="illnessForm.abi_ex4"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="年龄"
                        :label-width="formLabelWidth">
            <el-input v-model="illnessForm.abi_ex5"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="医疗类别"
                        :label-width="formLabelWidth">
            <el-input v-model="illnessForm.abi_ex6"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="医疗人员类别"
                        :label-width="formLabelWidth">
            <el-input v-model="illnessForm.abi_ex7"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="出院诊断名称"
                        :label-width="formLabelWidth">
            <el-input v-model="illnessForm.abi_ex8"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="机构名称"
                        :label-width="formLabelWidth">
            <el-input v-model="illnessForm.abi_ex9"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="现金支付明细"
                        :label-width="formLabelWidth">
            <el-input v-model="illnessForm.abi_ex10"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系电话"
                        :label-width="formLabelWidth">
            <el-input v-model="illnessForm.abi_ex11"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="家庭住址"
                        :label-width="formLabelWidth">
            <el-input v-model="illnessForm.abi_ex12"
                      autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <!-- <div class="demo-drawer__footer">
	      <el-button type="primary" @click="cancelForm">取 消</el-button>
	    </div> -->
      </div>
    </el-drawer>
    <!--  长护险信息-->
    <el-drawer title="长护险信息"
               :before-close="handleClose"
               :visible.sync="dialog4"
               direction="ltr"
               custom-class="demo-drawer"
               ref="drawer">
      <div class="demo-drawer__content">
        <el-form :model="insureanceForm"
                 class="overflowAuto"
                 disabled>
          <el-form-item label="统筹区"
                        :label-width="formLabelWidth">
            <el-input v-model="insureanceForm.abi_ex1"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="姓名"
                        :label-width="formLabelWidth">
            <el-input v-model="insureanceForm.abi_ex2"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="身份证号"
                        :label-width="formLabelWidth">
            <el-input v-model="insureanceForm.abi_ex3"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别"
                        :label-width="formLabelWidth">
            <el-input v-model="insureanceForm.abi_ex4"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="待遇开始日期"
                        :label-width="formLabelWidth">
            <el-input v-model="insureanceForm.abi_ex8"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="长护险待遇标准"
                        :label-width="formLabelWidth">
            <el-input v-model="insureanceForm.abi_ex9"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="人员状态"
                        :label-width="formLabelWidth">
            <el-input v-model="insureanceForm.abi_ex10"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="待遇结束日期"
                        :label-width="formLabelWidth">
            <el-input v-model="insureanceForm.abi_dat1"
                      autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <!-- <div class="demo-drawer__footer">
	      <el-button type="primary" @click="cancelForm">取 消</el-button>
	    </div> -->
      </div>
    </el-drawer>
    <!-- 高额医疗费信息 -->
    <el-drawer title="高额医疗费信息"
               :before-close="handleClose"
               :visible.sync="dialog5"
               direction="ltr"
               custom-class="demo-drawer"
               ref="drawer">
      <div class="demo-drawer__content">
        <el-form :model="chargeForm"
                 class="overflowAuto"
                 disabled>
          <el-form-item label="统筹区"
                        :label-width="formLabelWidth">
            <el-input v-model="chargeForm.ac_ex1"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="单位代码"
                        :label-width="formLabelWidth">
            <el-input v-model="chargeForm.ac_ex2"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="单位名称"
                        :label-width="formLabelWidth">
            <el-input v-model="chargeForm.ac_ex3"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="身份证号码"
                        :label-width="formLabelWidth">
            <el-input v-model="chargeForm.ac_ex4"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="姓名"
                        :label-width="formLabelWidth">
            <el-input v-model="chargeForm.ac_ex5"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="职业状态"
                        :label-width="formLabelWidth">
            <el-input v-model="chargeForm.ac_ex7"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="总费用"
                        :label-width="formLabelWidth">
            <el-input v-model="chargeForm.ac_ex8"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="统筹支出"
                        :label-width="formLabelWidth">
            <el-input v-model="chargeForm.ac_ex9"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="现金支付"
                        :label-width="formLabelWidth">
            <el-input v-model="chargeForm.ac_ex10"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="大病救助"
                        :label-width="formLabelWidth">
            <el-input v-model="chargeForm.ac_ex12"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="城乡救助"
                        :label-width="formLabelWidth">
            <el-input v-model="chargeForm.ac_ex13"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="大病保险"
                        :label-width="formLabelWidth">
            <el-input v-model="chargeForm.ac_ex14"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="健康扶贫支付"
                        :label-width="formLabelWidth">
            <el-input v-model="chargeForm.ac_ex15"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="健康扶贫人员类别"
                        :label-width="formLabelWidth">
            <el-input v-model="chargeForm.ac_ex24"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="统筹区"
                        :label-width="formLabelWidth">
            <el-input v-model="chargeForm.ac_ex25"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="精准扶贫人员类别"
                        :label-width="formLabelWidth">
            <el-input v-model="chargeForm.ac_ex27"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系方式"
                        :label-width="formLabelWidth">
            <el-input v-model="chargeForm.ac_ex28"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="家庭住址"
                        :label-width="formLabelWidth">
            <el-input v-model="chargeForm.ac_ex29"
                      autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <!-- <div class="demo-drawer__footer">
            <el-button type="primary" @click="cancelForm">取 消</el-button>
          </div> -->
      </div>
    </el-drawer>
    <!-- 特困职工信息 -->
    <el-drawer title="特困职工信息"
               :before-close="handleClose"
               :visible.sync="dialog6"
               direction="ltr"
               custom-class="demo-drawer"
               ref="drawer">
      <div class="demo-drawer__content">
        <el-form :model="employeesForm"
                 class="overflowAuto"
                 disabled>
          <el-form-item label="统筹区"
                        :label-width="formLabelWidth">
            <el-input v-model="employeesForm.de_ex1"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="镇街"
                        :label-width="formLabelWidth">
            <el-input v-model="employeesForm.de_ex2"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="姓名"
                        :label-width="formLabelWidth">
            <el-input v-model="employeesForm.de_ex4"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别"
                        :label-width="formLabelWidth">
            <el-input v-model="employeesForm.de_ex5"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="身份证号"
                        :label-width="formLabelWidth">
            <el-input v-model="employeesForm.de_ex6"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="家庭住址"
                        :label-width="formLabelWidth">
            <el-input v-model="employeesForm.de_ex7"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系方式"
                        :label-width="formLabelWidth">
            <el-input v-model="employeesForm.de_ex8"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="救助原因"
                        :label-width="formLabelWidth">
            <el-input v-model="employeesForm.de_ex9"
                      autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <!-- <div class="demo-drawer__footer">
	          <el-button type="primary" @click="cancelForm">取 消</el-button>
	        </div> -->
      </div>
    </el-drawer>
    <!-- 陆运资格信息 -->
    <el-drawer title="陆运资格信息"
               :before-close="handleClose"
               :visible.sync="dialog7"
               direction="ltr"
               custom-class="demo-drawer"
               ref="drawer">
      <div class="demo-drawer__content">
        <el-form :model="transportationForm"
                 class="overflowAuto"
                 disabled>
          <el-form-item label="姓名"
                        :label-width="formLabelWidth">
            <el-input v-model="transportationForm.lt_ex1"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别"
                        :label-width="formLabelWidth">
            <el-input v-model="transportationForm.lt_ex2"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="出生日期"
                        :label-width="formLabelWidth">
            <el-input v-model="transportationForm.lt_ex3"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="证件类型"
                        :label-width="formLabelWidth">
            <el-input v-model="transportationForm.lt_ex4"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="身份证号"
                        :label-width="formLabelWidth">
            <el-input v-model="transportationForm.lt_ex5"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="从业资格名称"
                        :label-width="formLabelWidth">
            <el-input v-model="transportationForm.lt_ex6"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="服务单位"
                        :label-width="formLabelWidth">
            <el-input v-model="transportationForm.lt_ex7"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="民族"
                        :label-width="formLabelWidth">
            <el-input v-model="transportationForm.lt_ex8"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="统筹区"
                        :label-width="formLabelWidth">
            <el-input v-model="transportationForm.lt_ex9"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="管辖机构"
                        :label-width="formLabelWidth">
            <el-input v-model="transportationForm.lt_ex10"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="固定电话"
                        :label-width="formLabelWidth">
            <el-input v-model="transportationForm.lt_ex11"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系电话"
                        :label-width="formLabelWidth">
            <el-input v-model="transportationForm.lt_ex12"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="身份证地址"
                        :label-width="formLabelWidth">
            <el-input v-model="transportationForm.lt_ex13"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="现居住地址"
                        :label-width="formLabelWidth">
            <el-input v-model="transportationForm.lt_ex14"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="学历"
                        :label-width="formLabelWidth">
            <el-input v-model="transportationForm.lt_ex15"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="发证机构名称"
                        :label-width="formLabelWidth">
            <el-input v-model="transportationForm.lt_ex16"
                      autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <!--   <div class="demo-drawer__footer">
		        <el-button type="primary" @click="cancelForm">取 消</el-button>
		      </div> -->
      </div>
    </el-drawer>
    <!-- 死亡信息 -->
    <el-drawer title="死亡信息"
               :before-close="handleClose"
               :visible.sync="dialog8"
               direction="ltr"
               custom-class="demo-drawer"
               ref="drawer">
      <div class="demo-drawer__content">
        <el-form :model="swINFOForm"
                 class="overflowAuto"
                 disabled>
          <el-form-item label="姓名"
                        :label-width="formLabelWidth">
            <el-input v-model="swINFOForm.sz_ex3"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别"
                        :label-width="formLabelWidth">
            <el-input v-model="swINFOForm.sz_ex4"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="身份证号"
                        :label-width="formLabelWidth">
            <el-input v-model="swINFOForm.sz_ex7"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="死亡原因"
                        :label-width="formLabelWidth">
            <el-input v-model="swINFOForm.sz_ex8"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="民族"
                        :label-width="formLabelWidth">
            <el-input v-model="swINFOForm.sz_ex62"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="火化时间"
                        :label-width="formLabelWidth">
            <el-input v-model="swINFOForm.sz_ex90"
                      autocomplete="off"></el-input>
          </el-form-item>

        </el-form>
        <!--   <div class="demo-drawer__footer">
		          <el-button type="primary" @click="cancelForm">取 消</el-button>
		        </div> -->
      </div>
    </el-drawer>
  </div>
</template>

<script>
import request from "@/utils/request";
export default {
  name: "grda",
  data () {
    return {
      formLabelWidth: '90px',
      timer: null,
      loading: false,
      searchData: {
        name: "",
        idCard: "",
      },
      dialog1: false,
      dialog2: false,
      dialog3: false,
      dialog4: false,
      dialog5: false,
      dialog6: false,
      dialog7: false,
      dialog8: false,
      tableData: [],
      disabledForm: {		//残疾证信息
        abdl_ex1: '',  	//姓名
        abdl_ex2: '',	//性别
        abdl_ex5: '',	//街道
        abdl_ex6: '',	//村居
        abdl_ex7: '',	//残疾证号
        abdl_ex8: '',	//身份证号
        abdl_ex9: '',	//残疾类被
        abdl_ex10: '',	//残疾等级
        abdl_ex15: '',	//联系电话
        abdl_ex16: '',	//所属地区
        abdl_ex28: '',	//民族
        abdl_ex29: '',	//居住地址
        abdl_ex30: '',	//备注
      },
      //建档立卡信息
      fillForm: {
        abf_ex1: '',		//所属街道
        abf_ex2: '',		//所属村居
        abf_ex3: '',		//户主姓名
        abf_ex4: '',		//身份证号
        abf_ex5: '',		//联系电话
        abf_ex6: '',		//银行账号
        abf_ex7: '',		//开户银行
        abf_ex8: '',		//识别标准
        abf_ex9: '',		//贫困户类型
        abf_ex10: '',	//脱贫属性
        abf_ex11: '',	//脱贫时间
        abf_ex12: '',	//主要致贫原因	
        abf_ex13: '',	//其他致贫原因
        abf_ex14: '',	//成员姓名
        abf_ex15: '',	//成员性别
        abf_ex16: '',	//成员身份证号
        abf_ex17: '',	//年龄
        abf_ex18: '',	//与户主关系
        abf_ex19: '',	//自理能力
        abf_ex20: '',	//证件类型
        abf_ex21: '',	//出生日期
        abf_ex22: '',	//民族
        abf_ex23: '',	//政治面貌
        abf_ex24: '',	//教育程度
        abf_ex25: '',	//在校生情况
        abf_ex26: '',	//健康状态
        abf_ex27: '',	//劳动力类型
        abf_ex28: '',	//是否现役军人
        abf_ex33: '',//家庭成员致困原因
      },
      //大重病信息
      illnessForm: {
        abi_ex1: '',		//统筹区
        abi_ex2: '',		//镇街
        abi_ex3: '',		//姓名
        abi_ex4: '',		//身份证号
        abi_ex5: '',		//年龄
        abi_ex6: '',		//医疗类别
        abi_ex7: '',		//医疗人员类别
        abi_ex8: '',		//出院诊断名称
        abi_ex9: '',		//机构名称
        abi_ex10: '',	//现金支付明细
        abi_ex11: '',	//电话
        abi_ex12: '',	//家庭住址
      },
      //长护险信息
      insureanceForm: {
        abi_ex1: '',		//统筹区
        abi_ex2: '',		//姓名
        abi_ex3: '',		//身份证号
        abi_ex4: '',		//性别
        abi_ex8: '',		//待遇开始日期
        abi_ex9: '',		//长护险待遇标准
        abi_ex10: '',	//人员状态
        abi_ex12: '',
        abi_dat1: '',	//待遇结束开始日期
      },
      //高额医疗费信息
      chargeForm: {
        ac_ex1: '',		//统筹区
        ac_ex2: '',		//单位代码
        ac_ex3: '',		//单位名称
        ac_ex4: '',		//身份证号
        ac_ex5: '',		//姓名
        ac_ex7: '',		//职业状态
        ac_ex8: '',		//总费用
        ac_ex9: '',		//统筹支出
        ac_ex10: '',		//现金支付
        ac_ex12: '',		//大病救助
        ac_ex13: '',		//城乡救助
        ac_ex14: '',		//大病保险
        ac_ex15: '',		//健康扶贫支付
        ac_ex24: '',		//健康扶贫人员类别
        ac_ex25: '',		//统筹区
        ac_ex26: '',		//城乡救助所属区
        ac_ex27: '',		//精准扶贫人员类别
        ac_ex28: '',		//联系方式
        ac_ex29: '',		//家庭住址
        ac_ex30: '',
        ac_ex31: '',
        ac_ex32: '',
      },
      //特困职工信息
      employeesForm: {
        de_ex1: '',	//统筹区
        de_ex2: '',	//镇街
        de_ex4: '',	//姓名
        de_ex5: '',	//性别
        de_ex6: '',	//身份证号
        de_ex7: '',	//家庭住址
        de_ex8: '',	//联系方式
        de_ex9: '',	//救助原因						
      },
      //陆运资格信息
      transportationForm: {
        lt_ex1: '',	//姓名
        lt_ex2: '',	//性别
        lt_ex3: '',	//出生日期
        lt_ex4: '',	//证件类型
        lt_ex5: '',	//身份证号
        lt_ex6: '',	//从业资格名称
        lt_ex7: '',	//服务单位
        lt_ex8: '',	//民族
        lt_ex9: '',	//统筹区
        lt_ex10: '',	//管辖机构
        lt_ex11: '',	//固定电话
        lt_ex12: '',	//联系电话
        lt_ex13: '',	//身份证地址
        lt_ex14: '',	//现居住地址
        lt_ex15: '',	//学历
        lt_ex16: '',	//发证机构名称
      },
      //死亡信息
      swINFOForm: {
        sz_ex3: '',	//姓名
        sz_ex4: '',	//性别
        sz_ex7: '',	//身份账号
        sz_ex8: '',	//死亡原因
        sz_ex62: '',	//民族
        sz_ex90: '',	//火化机构
      },
    };
  },

  watch: {},
  created () {
    this.subSelect();
  },
  mounted () {

  },

  methods: {
    handleClose (done) {
      this.$confirm('确定关闭吗？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    //关闭表单
    cancelForm () {
      this.loading = false;
      this.dialog1 = false;
      this.dialog2 = false;
      this.dialog3 = false;
      this.dialog4 = false;
      this.dialog5 = false;
      this.dialog6 = false;
      this.dialog7 = false;
      this.dialog8 = false;
      clearTimeout(this.timer);
    },
    //获取残疾人信息详情
    openDisabledForm (id) {
      this.disabledInfo({
        idCard: id,
      })
        .then((res) => {
          console.log(res, "then");
        })
        .catch((res) => {
          //console.log("返回的数据" + JSON.stringify(res.response.data.data));
          this.disabledForm = res.response.data.data;

        });
      this.dialog1 = true
    },
    //获取建档立卡信息
    openFillForm (id) {
      this.fillingInfo({
        idCard: id,
      })
        .then((res) => {
          console.log(res, "then");
        })
        .catch((res) => {
          //console.log("返回的数据" + JSON.stringify(res.response.data.data));
          this.fillForm = res.response.data.data;

        });
      this.dialog2 = true
    },
    //获取大重病信息
    openIllnessForm (id) {
      this.illnessInfo({
        idCard: id,
      })
        .then((res) => {
          console.log(res, "then");
        })
        .catch((res) => {
          //console.log("返回的数据" + JSON.stringify(res.response.data.data));
          this.illnessForm = res.response.data.data;

        });
      this.dialog3 = true
    },
    //获取长护险信息
    openInsureanceForm (id) {
      this.insuranceInfo({
        idCard: id,
      })
        .then((res) => {
          console.log(res, "then");
        })
        .catch((res) => {
          //console.log("返回的数据" + JSON.stringify(res.response.data.data));
          this.insureanceForm = res.response.data.data;

        });
      this.dialog4 = true
    },
    //获取高额医疗费信息
    openChargeForm (id) {
      this.chargeInfo({
        idCard: id,
      })
        .then((res) => {
          console.log(res, "then");
        })
        .catch((res) => {
          //console.log("返回的数据" + JSON.stringify(res.response.data.data));
          this.chargeForm = res.response.data.data;

        });
      this.dialog5 = true
    },
    //获取特困职工信息
    openEmployeesForm (id) {
      this.employeesInfo({
        idCard: id,
      })
        .then((res) => {
          console.log(res, "then");
        })
        .catch((res) => {
          //console.log("返回的数据" + JSON.stringify(res.response.data.data));
          this.employeesForm = res.response.data.data;

        });
      this.dialog6 = true
    },
    //获取陆运资格信息
    openTransportationForm (id) {
      this.transportationInfo({
        idCard: id,
      })
        .then((res) => {
          console.log(res, "then");
        })
        .catch((res) => {
          //console.log("返回的数据" + JSON.stringify(res.response.data.data));
          this.transportationForm = res.response.data.data;

        });
      this.dialog7 = true
    },
    //获取死亡信息
    openswINFOForm (id) {
      this.swInfo({
        idCard: id,
      })
        .then((res) => {
          console.log(res, "then");
        })
        .catch((res) => {
          //console.log("返回的数据" + JSON.stringify(res.response.data.data));
          this.swINFOForm = res.response.data.data;

        });
      this.dialog8 = true
    },
    onSubmit () {
      console.log("submit!");
    },


    //点击查询调用的方法
    subSelect () {
      this.aiList({
        name: this.searchData.name,
        idCard: this.searchData.idCard,
      })
        .then((res) => {
          console.log(res, "then");
        })
        .catch((res) => {
          //console.log("返回的数据" + JSON.stringify(res.response.data.data));
          this.tableData = res.response.data.data;

        });
    },
    //
    //点击重置按钮调用的方法
    subReset () {
      this.searchData = {};

    },
    //接口
    aiList (data) {
      return request({
        headers: {
          Accept: "application/json",
        },
        url: "/social/dataCenter/getAutomaticIdentificationList",
        method: "post",
        data: data,
      });
    },
    //高额医疗费
    chargeInfo (data) {
      return request({
        headers: {
          Accept: "application/json",
        },
        url: "/social/dataCenter/getCharge",
        method: "post",
        data: data,
      });
    },
    //特困职工
    employeesInfo (data) {
      return request({
        headers: {
          Accept: "application/json",
        },
        url: "/social/dataCenter/getDifficultEmployees",
        method: "post",
        data: data,
      });
    },
    //残疾证信息
    disabledInfo (data) {
      return request({
        headers: {
          Accept: "application/json",
        },
        url: "/social/dataCenter/getDisabledInfo",
        method: "post",
        data: data,
      });
    },
    //建档立卡信息
    fillingInfo (data) {
      return request({
        headers: {
          Accept: "application/json",
        },
        url: "/social/dataCenter/getFilling",
        method: "post",
        data: data,
      });
    },
    //获取死亡信息
    swInfo (data) {
      return request({
        headers: {
          Accept: "application/json",
        },
        url: "/social/dataCenter/getINFO",
        method: "post",
        data: data,
      });
    },
    //获取重病信息
    illnessInfo (data) {
      return request({
        headers: {
          Accept: "application/json",
        },
        url: "/social/dataCenter/getIllness",
        method: "post",
        data: data,
      });
    },
    //获取长护险信息
    insuranceInfo (data) {
      return request({
        headers: {
          Accept: "application/json",
        },
        url: "/social/dataCenter/getInsurance",
        method: "post",
        data: data,
      });
    },
    //陆运资格信息
    transportationInfo (data) {
      return request({
        headers: {
          Accept: "application/json",
        },
        url: "/social/dataCenter/getTransportation",
        method: "post",
        data: data,
      });
    },

  },
};
</script>

<style scoped lang="less">
.g-box {
  display: flex;
  /* width: 100%; */
  height: 80vh;
  flex-direction: column;
}
.overflowAuto {
  overflow-y: auto;
  position: absolute;
  width: 100%;
  height: 100%;
}
.overflowAuto::-webkit-scrollbar {
  height: 6px;
  width: 6px;
}
.overflowAuto::-webkit-scrollbar-thumb {
  background: rgb(224, 214, 235);
}
/deep/.has-gutter th {
  text-align: center !important;
}
/deep/ .el-table__row td {
  text-align: center !important;
}
</style>
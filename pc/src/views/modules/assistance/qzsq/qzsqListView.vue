<template>
  <div class="g-box"
       v-loading="loading">
    <div class='g-box2'>
      <div class="info2">
        <el-form :inline="true"
                 class="demo-form-inline">
          <h3 class="line_blue"
              id="page1">&emsp;档案信息</h3>
          <div class="lineSt"></div>
          <div class="top_1">
            <table class="top_2">
              <tr style="height:40px;">
                <td>申请人:</td>
                <td colspan='2'>{{basicInf.ab_ex3}}</td>
                <td>身份证号码:</td>
                <td colspan='2'>{{basicInf.ab_ex7}}</td>
              </tr>
              <tr>
                <td>申请时间:</td>
                <td colspan='2'>{{basicInf.ab_dat14}}</td>
                <!-- 占位用的，用来把图片挤到右边 -->
                <td></td>
                <td colspan='2'></td>
                <td>
                  <img v-if="basicInf.ab_ex15 == '申请'"
                       src='@/assets/img/auditStatus/notSubmitted.png'
                       class='imgSt'>
                  <img v-else-if="basicInf.ab_ex15 == '核对中'"
                       src='@/assets/img/auditStatus/audit.png'
                       class='imgSt'>
                  <img v-else-if="basicInf.ab_ex15 == '办结' || basicInf.ab_ex15=='审核通过' && ab_ex48=='已享受'"
                       src='@/assets/img/auditStatus/enjoyment.png'
                       class='imgSt'>
                  <img v-else-if="basicInf.ab_ex15 == '办结' || basicInf.ab_ex15=='审核通过'"
                       src='@/assets/img/auditStatus/passTheAudit.png'
                       class='imgSt'>
                  <img v-else-if="basicInf.ab_ex15 == '退回'"
                       src='@/assets/img/auditStatus/return.png'
                       class='imgSt'>
                  <img v-else
                       src='@/assets/img/auditStatus/audit.png'
                       class='imgSt'>
                </td>
              </tr>
            </table>
          </div>
          <h3 class="line_blue"
              id="page2">&emsp;基础信息</h3>
          <div class="lineSt"></div>
          <div class="top_1">
            <table class="top_2">
              <tr style="height:40px;">
                <td style="width:10%;">行政区划:</td>
                <td style="width:40%;">{{basicInf.address}}</td>
                <td style="width:10%;">联系电话:</td>
                <td style="width:40%;">{{basicInf.ab_ex28}}</td>
              </tr>
              <tr style="height:40px;">
                <td style="width:10%;">户口性质:</td>
                <td style="width:40%;">{{basicInf.ab_ex6}}</td>
                <td style="width:10%;">家庭人口:</td>
                <td style="width:40%;">{{basicInf.ab_ex5}}</td>
              </tr>
              <tr style="height:40px;">
                <td>户籍地址:</td>
                <td>{{householdRegistrationAddress}}</td>
                <td>家庭地址:</td>
                <td>{{basicInf.ab_ex11}}</td>
              </tr>
              <tr style="height:40px;">
                <td>求助原因:</td>
                <td>{{basicInf.ab_ex46}}</td>
                <td>是否属于村干部或经办人员近亲属:</td>
                <td>{{basicInf.ab_ex92}}</td>
              </tr>

            </table>
          </div>
          <div v-if="basicInf.ab_ex92=='是'">
            <h3 class="line_blue"
                id="page21">&emsp;村干部或经办人员近亲属信息</h3>
            <div class="lineSt"></div>
            <div class="family">
              <el-table :data="tableData7"
                        border
                        style="width: 100%">
                <el-table-column prop="abm_ex3"
                                 label="姓名"
                                 min-width="100"></el-table-column>
                <el-table-column prop="abm_ex1"
                                 label="近亲属关系"
                                 min-width="150"></el-table-column>
                <el-table-column prop="abm_ex15"
                                 label="任职机构和职位"
                                 min-width="280"></el-table-column>
              </el-table>
            </div>
          </div>
          <h3 class="line_blue"
              id="page3">&emsp;银行信息</h3>
          <div class="lineSt"></div>
          <div class="top_1">
            <table class="top_2">
              <tr style="height:40px;">
                <td style="width:10%;">一卡通开户银行:</td>
                <td style="width:20%;">{{basicInf.ab_ex42}}</td>
                <td style="width:10%;">开户人:</td>
                <td style="width:20%;">{{basicInf.ab_ex8}}</td>
                <td style="width:10%;">一卡通银行账号:</td>
                <td style="width:20%;">{{basicInf.ab_ex43}}</td>
              </tr>
            </table>
          </div>

          <h3 class="line_blue"
              id="page12">&emsp;自定义预警</h3>
          <div class="lineSt"></div>
          <div class="top_1">
            <table class="top_2">
              <tr style="height:40px;"
                  v-for="(item,index) in warningData"
                  :key="index">
                <td style="width:10%;">预警内容:</td>
                <td style="width:20%;">{{warningData[index].aw_ex1}}</td>
                <td style="width:10%;">预警时间:</td>
                <td style="width:20%;">{{warningData[index].aw_dat1}}</td>
              </tr>
            </table>
          </div>

          <h3 class="line_blue"
              id="page4">&emsp;共同生活家庭成员情况</h3>
          <div class="lineSt"></div>
          <div class="family">
            <el-table :data="tableData"
                      border
                      style="width: 100%">
              <el-table-column prop="abm_ex3"
                               label="姓名"
                               width="80"></el-table-column>
              <el-table-column prop="abm_ex1"
                               label="与户主关系"
                               width="100"></el-table-column>
              <el-table-column prop="abm_ex2"
                               label="身份证号码"
                               width="180"></el-table-column>
              <el-table-column prop="abm_ex5"
                               label="性别"
                               width="80"></el-table-column>
              <el-table-column prop="abm_ex16"
                               label="民族"
                               width="80"></el-table-column>
              <el-table-column prop="abm_ex7"
                               label="户口性质"
                               width="100"></el-table-column>
              <!-- <el-table-column prop="abm_ex42" label="是否为保障对象" width="130"></el-table-column> -->
              <el-table-column prop="abm_ex28"
                               label="婚姻状况"
                               width="100"></el-table-column>
              <el-table-column prop="abm_ex51"
                               label="特定对象"
                               width="180"></el-table-column>
              <el-table-column prop="age"
                               label="年龄"
                               width="100"></el-table-column>
              <el-table-column prop="work"
                               label="是否属于劳动年龄"
                               width="140"></el-table-column>
              <el-table-column prop="abm_ex11"
                               label="健康状况"
                               width="100"></el-table-column>
              <el-table-column prop="abm_ex52"
                               label="重病病种"
                               width="100"></el-table-column>
              <el-table-column prop="abm_ex39"
                               label="残疾种类"
                               width="100"></el-table-column>
              <el-table-column prop="abm_ex40"
                               label="残疾等级"
                               width="100"></el-table-column>
              <el-table-column prop="abm_ex49"
                               label="劳动能力"
                               width="100"></el-table-column>
              <el-table-column prop="abm_ex14"
                               label="职业状况"
                               width="100"></el-table-column>
              <el-table-column prop="abm_ex15"
                               label="工作单位"
                               width="120"></el-table-column>
              <el-table-column prop="abm_ex17"
                               label="月收入"
                               width="100"></el-table-column>
            </el-table>
          </div>
          <h3 class="line_blue"
              id="page5">&emsp;非共同生活赡抚扶养人信息</h3>
          <div class="lineSt"></div>
          <div class="family">
            <el-table :data="tableData2"
                      border
                      style="width: 100%">
              <el-table-column prop="abm_ex3"
                               label="姓名"
                               min-width="100"></el-table-column>
              <el-table-column prop="abm_ex1"
                               label="家庭关系"></el-table-column>
              <el-table-column prop="abm_ex81"
                               label="赡（扶、抚）养关系"
                               min-width="180"></el-table-column>
              <el-table-column prop="abm_ex2"
                               label="身份证号码"
                               min-width="180"></el-table-column>
              <el-table-column prop="abm_ex11"
                               label="健康状况"
                               min-width="100"></el-table-column>
              <el-table-column prop="abm_ex49"
                               label="劳动能力"
                               width="100"></el-table-column>
              <el-table-column prop="abm_ex15"
                               label="工作单位"
                               min-width="120"></el-table-column>
              <el-table-column prop="abm_ex21"
                               label="家庭主要财产状况(房、车、金融资产)"
                               min-width="220"></el-table-column>
              <el-table-column prop="abm_ex20"
                               label="家庭人口"
                               min-width="100"></el-table-column>
              <el-table-column prop="abm_ex17"
                               label="家庭人均月收入"
                               min-width="120"></el-table-column>
              <el-table-column prop="abm_ex18"
                               label="月赡(抚、扶)养费"
                               min-width="150"></el-table-column>
            </el-table>
          </div>
          <h3 class="line_blue"
              id="page13">&emsp;非共同生活赡抚扶养人家庭成员信息</h3>
          <div class="lineSt"></div>
          <div class="family">
            <el-table :data="tableData2_"
                      border
                      style="width: 100%">
              <el-table-column prop="abm_ex3"
                               label="姓名"
                               min-width="100"></el-table-column>
              <el-table-column prop="abm_ex1"
                               label="家庭关系"
                               min-width="150"></el-table-column>
              <el-table-column prop="abm_ex81"
                               label="赡(扶、抚)养关系"></el-table-column>
              <el-table-column prop="abm_ex2"
                               label="身份证号码"
                               min-width="280"></el-table-column>
            </el-table>
          </div>

          <h3 class="line_blue"
              id="page6">&emsp;家庭前12个收入情况</h3>
          <div class="lineSt"></div>
          <div class="top_1">
            <el-table style="width: 100%"
                      :data="income1">
              <el-table-column label="工资性收入（年）"
                               style="text-align:center">
                <el-table-column prop="abi_ex1"
                                 label="计入收入名称"
                                 min-width="100"></el-table-column>
                <el-table-column prop="abi_ex2"
                                 label="金额"
                                 min-width="150"></el-table-column>
              </el-table-column>
            </el-table>
            <el-table style="width: 100%;margin-top:20px;"
                      :data="income3">
              <el-table-column label="财产净收入（年）"
                               style="text-align:center">
                <el-table-column prop="abi_ex1"
                                 label="计入收入名称"
                                 min-width="100"></el-table-column>
                <el-table-column prop="abi_ex2"
                                 label="金额"
                                 min-width="150"></el-table-column>
              </el-table-column>
            </el-table>
            <el-table style="width: 100%;margin-top:20px;"
                      :data="income4">
              <el-table-column label="转移净收入（年）"
                               style="text-align:center">
                <el-table-column prop="abi_ex1"
                                 label="计入收入名称"
                                 min-width="100"></el-table-column>
                <el-table-column prop="abi_ex2"
                                 label="金额"
                                 min-width="150"></el-table-column>
              </el-table-column>
            </el-table>
            <el-table style="width: 100%;margin-top:20px;"
                      :data="income2">
              <el-table-column label="经营净收入（年）"
                               style="text-align:center">
                <el-table-column prop="abi_ex1"
                                 label="计入收入名称"
                                 min-width="100"></el-table-column>
                <el-table-column prop="abi_ex2"
                                 label="金额"
                                 min-width="150"></el-table-column>
              </el-table-column>
            </el-table>
            <el-table style="width: 100%;margin-top:20px;"
                      :data="income5">
              <el-table-column label="其他收入（年）"
                               style="text-align:center">
                <el-table-column prop="abi_ex1"
                                 label="计入收入名称"
                                 min-width="100"></el-table-column>
                <el-table-column prop="abi_ex2"
                                 label="金额"
                                 min-width="150"></el-table-column>
              </el-table-column>
            </el-table>
            <el-table style="width: 100%;margin-top:20px;"
                      :data="income6">
              <el-table-column label="必要就业成本抵扣"
                               style="text-align:center">
                <el-table-column prop="abi_ex1"
                                 label="计入收入名称"
                                 min-width="100"></el-table-column>
                <el-table-column prop="abi_ex2"
                                 label="金额"
                                 min-width="150"></el-table-column>
              </el-table-column>
            </el-table>
            <el-table style="width: 100%;margin-top:20px;"
                      :data="income7">
              <el-table-column label="总收入"
                               style="text-align:center">
                <el-table-column prop="abi_ex1"
                                 label="计入收入名称"
                                 min-width="100"></el-table-column>
                <el-table-column prop="abi_ex2"
                                 label="金额"
                                 min-width="150"></el-table-column>
              </el-table-column>
            </el-table>
          </div>
          <!-- ================================= -->
          <h3 class="line_blue"
              id="page14">&emsp;家庭前12个月支出情况</h3>
          <div class="lineSt"></div>
          <div class="top_1">
            <table class="top_2">
              <tr style="height:40px;">
                <td style="width:15%;">医疗支出(元):</td>
                <td style="width:35%;">{{pay.abp_ex4}}</td>
                <td style="width:15%;">教育支出(元):</td>
                <td style="width:35%;">{{pay.abp_ex5}}</td>
              </tr>
              <tr style="height:40px;">
                <td style="width:15%;">残疾康复费用支出(元):</td>
                <td style="width:35%;">{{pay.abp_ex6}}</td>
                <td style="width:15%;">因灾、因意外事故费用支出(元):</td>
                <td style="width:35%;">{{pay.abp_ex11}}</td>
              </tr>
              <tr style="height:40px;">
                <td style="width:15%;">其他支出(元):</td>
                <td style="width:35%;">{{pay.abp_ex7}}</td>
                <td>家庭总支出(元):</td>
                <td>{{pay.abp_ex8}}</td>
              </tr>
              <tr>
                <td>扣减刚性支出后家庭年收入(元):</td>
                <td>{{pay.abp_ex9}}</td>
                <td>扣减刚性支出后人均年收入(元):</td>
                <td>{{pay.abp_ex10}}</td>
              </tr>
            </table>
          </div>
          <!-- ======================================== -->
          <h3 class="line_blue"
              id="page7">&emsp;金融资产</h3>
          <div class="lineSt"></div>
          <table class="top_1">
            <tr style="height:40px;">
              <td style="width:10%;">银行总存款:</td>
              <td style="width:40%;">{{basicInf.ab_ex36}}</td>
              <td style="width:10%;">有价证券:</td>
              <td style="width:40%;">{{basicInf.ab_ex60}}</td>
            </tr>
            <tr style="height:40px;">
              <td style="width:10%;">基金:</td>
              <td style="width:40%;">{{basicInf.ab_ex179}}</td>
              <td style="width:10%;">商业保险:</td>
              <td style="width:40%;">{{basicInf.ab_ex180}}</td>
            </tr>
            <tr style="height:40px;">
              <td style="width:10%;">债权:</td>
              <td style="width:40%;">{{basicInf.ab_ex61}}</td>
              <td style="width:10%;">其他金融产品:</td>
              <td style="width:40%;">{{basicInf.ab_ex37}}</td>
            </tr>
          </table>
          <h3 class="line_blue"
              id="page15">&emsp;拥有车、船情况</h3>
          <div class="lineSt"></div>
          <div class="top_1">
            <el-table style="width: 100%"
                      :data="tableData3">
              <el-table-column label="拥有车、船情况"
                               style="text-align:center; ">
                <el-table-column prop="abe_ex1"
                                 label="车(船)主"
                                 min-width="100"></el-table-column>
                <el-table-column prop="abe_ex2"
                                 label="购买时间"
                                 min-width="100"></el-table-column>
                <el-table-column prop="abe_ex3"
                                 label="用途"
                                 min-width="100"></el-table-column>
                <el-table-column prop="abe_ex8"
                                 label="车（船)型"
                                 min-width="100"></el-table-column>
                <el-table-column prop="abe_ex4"
                                 label="车（船)价值"
                                 min-width="100"></el-table-column>
              </el-table-column>
            </el-table>
          </div>
          <h3 class="line_blue"
              id="page16">&emsp;拥有房产情况</h3>
          <div class="lineSt"></div>
          <div class="top_1">
            <el-table style="width: 100% ,border-bottom"
                      :data="tableData4">
              <el-table-column label="拥有房产情况"
                               style="text-align:center">
                <el-table-column prop="abe_ex1"
                                 label="房屋产权人/共有人"
                                 min-width="100"></el-table-column>
                <el-table-column prop="abe_ex2"
                                 label="建房(购房)时间"
                                 min-width="100"></el-table-column>
                <el-table-column prop="abe_ex5"
                                 label="房屋地址"
                                 min-width="100"></el-table-column>
                <el-table-column prop="abe_ex11"
                                 label="房屋性质"
                                 min-width="100"></el-table-column>
                <el-table-column prop="abe_ex6"
                                 label="面积（平方）"
                                 min-width="100"></el-table-column>
                <el-table-column prop="abe_ex4"
                                 label="购置价/建造价"
                                 min-width="100"></el-table-column>
              </el-table-column>
            </el-table>
            <el-row style="margin-top:10px"
                    :gutter="20">
              <el-col :span="12">
                <el-card class="box-card">
                  <div slot="header"
                       class="clearfix">
                    <span>房屋整体照片(
                      <span style='color:red'>{{imgNum.ab_ex166_len}}</span>
                      <!-- <span style='color:red'>{{basicInf.ab_ex166.split(',')[0]=="" ? 0 : basicInf.ab_ex166.split(',').length}}</span>) -->
                      )</span>
                  </div>
                  <image-view :imgList="this.imgArr.ab_ex166_len"
                              height="150px"
                              width="150px"></image-view>
                </el-card>
              </el-col>
              <el-col :span="12">
                <el-card class="box-card">
                  <div slot="header"
                       class="clearfix">
                    <span>房屋室内照片(<span style='color:red'>
                        <!-- {{basicInf.ab_ex167.split(',')[0]=="" ? 0 : basicInf.ab_ex167.split(',').length}} -->
                        {{imgNum.ab_ex167_len}}
                      </span>)</span>
                  </div>
                  <!-- <image-view :imgList="this.basicInf.ab_ex167.split(',')" height="150px" width="150px"></image-view> -->
                  <image-view :imgList="this.imgArr.ab_ex167_len"
                              height="150px"
                              width="150px"></image-view>

                </el-card>
              </el-col>
            </el-row>
          </div>
          <h3 class="line_blue"
              id="page18">&emsp;承包山林土地情况</h3>
          <div class="lineSt"></div>
          <div class="top_1">
            <el-table style="width: 100% ,border-bottom"
                      :data="landInfo">
              <el-table-column label="承包山林土地情况"
                               style="text-align:center">
                <el-table-column prop="abl_ex1"
                                 label="承包人姓名"
                                 min-width="100"></el-table-column>
                <el-table-column prop="abl_ex2"
                                 label="承包面积(亩)"
                                 min-width="100"></el-table-column>
                <el-table-column prop="abl_ex3"
                                 label="土地类型"
                                 min-width="100"></el-table-column>
                <el-table-column prop="abl_ex4"
                                 label="土地估值"
                                 min-width="100"></el-table-column>
                <el-table-column prop="abl_ex5"
                                 label="备注"
                                 min-width="100"></el-table-column>
              </el-table-column>
            </el-table>
          </div>
          <!-- <div class="top_3"> -->
          <!-- </div> -->
          <h3 class="line_blue"
              id="page8">&emsp;已享受救助情况</h3>
          <div class="lineSt"></div>
          <div class="top_1">
            <div class="top_3">
              <el-table :data="tableData5"
                        style="width: 99%">
                <el-table-column label="救助信息"
                                 style="text-align:center">
                  <el-table-column prop="ab_ex3"
                                   label="姓名"
                                   min-width="120"></el-table-column>
                  <el-table-column prop="ab_ex13"
                                   label="救助类型"
                                   min-width="120"></el-table-column>
                  <el-table-column prop="ag_ex1"
                                   label="发放时间"
                                   min-width="120"></el-table-column>
                  <el-table-column prop="ag_ex2"
                                   label="发放金额"
                                   min-width="120"></el-table-column>
                </el-table-column>
              </el-table>
            </div>
            <div class="top_3">
              <el-table :data="tableData6"
                        style="width: 99%">
                <el-table-column label="救助信息"
                                 style="text-align:center">
                  <el-table-column prop="ab_ex3"
                                   label="姓名"
                                   min-width="120"></el-table-column>
                  <el-table-column prop="ab_ex13"
                                   label="救助类型"
                                   min-width="120"></el-table-column>
                  <el-table-column prop="ab_dat14"
                                   label="申请日期"
                                   min-width="150"></el-table-column>
                  <el-table-column prop="ab_dat5"
                                   label="审批日期"
                                   min-width="150"></el-table-column>
                </el-table-column>
              </el-table>
            </div>
          </div>

          <div style='clear:both'></div>
          <h3 class="line_blue"
              id="page9"
              style='margin-top:15px'>&emsp;电子附件</h3>
          <div class="lineSt"></div>
          <div class="top_1">
            <!-- <div class="top_4"> -->
            <el-row :gutter="20"
                    style='margin-top:10px'>
              <el-col :span="12">
                <el-card class="box-card">
                  <div slot="header"
                       class="clearfix">
                    <span>身份证(<span style='color:red'>{{imgNum.ab_ex10_len}}</span>)</span>

                    <!-- <span style='color:red'>{{basicInf.ab_ex10.split(',')[0]=="" ? 0 : basicInf.ab_ex10.split(',').length}}</span> -->

                  </div>
                  <!-- <image-view :imgList="this.basicInf.ab_ex10.split(',')" height="150px" width="150px"></image-view> -->
                  <!-- 增加v-if的目的是为了让子组件有值再显示 -->
                  <image-view v-if="this.imgArr.ab_ex10_len"
                              :imgList="this.imgArr.ab_ex10_len"
                              height="150px"
                              width="150px"></image-view>

                </el-card>
              </el-col>
              <el-col :span="12">
                <el-card class="box-card">
                  <div slot="header"
                       class="clearfix">
                    <span>纸质授权书(<span style='color:red'>{{imgNum.ab_ex177_len}}
                        <!-- {{basicInf.ab_ex177.split(',')[0]=="" ? 0 : basicInf.ab_ex177.split(',').length}} -->
                      </span>)</span>

                  </div>
                  <image-view v-if="this.imgArr.ab_ex177_len"
                              :imgList="this.imgArr.ab_ex177_len"
                              height="150px"
                              width="150px"></image-view>

                </el-card>
              </el-col>
            </el-row>
            <el-row :gutter="20"
                    style='margin-top:10px'>
              <el-col :span="12">
                <el-card class="box-card">
                  <div slot="header"
                       class="clearfix">
                    <span>
                      民主评议(<span style='color:red'>{{imgNum.ab_ex97_len}}</span>)
                    </span>
                  </div>
                  <image-view v-if="this.imgArr.ab_ex97_len"
                              :imgList="this.imgArr.ab_ex97_len"
                              height="150px"
                              width="150px"></image-view>
                </el-card>
              </el-col>
              <el-col :span="12">
                <el-card class="box-card">
                  <div slot="header"
                       class="clearfix">
                    <span>其他材料(<span style='color:red'>{{imgNum.ab_ex16_len}}</span>)</span>
                  </div>
                  <image-view :imgList="this.imgArr.ab_ex16_len"
                              height="150px"
                              width="150px"></image-view>

                </el-card>
              </el-col>
            </el-row>
            <el-row :gutter="20"
                    style='margin-top:10px'>
              <el-col :span="12">
                <el-card class="box-card">
                  <div slot="header"
                       class="clearfix">
                    <span>审核审批表(<span style='color:red'>{{imgNum.ab_ex74_len}}</span>)</span>
                  </div>
                  <image-view v-if="this.imgArr.ab_ex74_len"
                              :imgList="this.imgArr.ab_ex74_len"
                              height="150px"
                              width="150px"></image-view>
                </el-card>
              </el-col>
              <el-col :span="12">
                <el-card class="box-card">
                  <div slot="header"
                       class="clearfix">
                    <span>电子授权书(<span style='color:red'>{{imgNum.ab_ex73_len}}</span>)</span>
                  </div>
                  <image-view v-if="this.imgArr.ab_ex73_len"
                              :imgList="this.imgArr.ab_ex73_len"
                              height="150px"
                              width="150px"></image-view>
                </el-card>
              </el-col>
            </el-row>
            <el-row :gutter="20"
                    style='margin-top:10px'
                    v-if="this.basicInf.ab_ex27=='退回'|| this.basicInf.ab_ex15=='退回'">
              <el-col :span="12">
                <el-card class="box-card">
                  <div slot="header"
                       class="clearfix">
                    <span>公示图片(<span style='color:red'>{{imgNum.ab_ex98_len}}</span>)</span>
                  </div>
                  <image-view v-if="this.imgArr.ab_ex98_len"
                              :imgList="this.imgArr.ab_ex98_len"
                              height="150px"
                              width="150px"></image-view>
                </el-card>
              </el-col>
              <el-col :span="12">
                <el-card class="box-card">
                  <div slot="header"
                       class="clearfix">
                    <span>民主评议(<span style='color:red'>{{imgNum.ab_ex97_len}}</span>)</span>
                  </div>
                  <image-view v-if="this.imgArr.ab_ex97_len"
                              :imgList="this.imgArr.ab_ex97_len"
                              height="150px"
                              width="150px"></image-view>
                </el-card>
              </el-col>
            </el-row>
            <el-row :gutter="20"
                    style='margin-top:10px'
                    v-if="this.basicInf.ab_ex27=='退回'|| this.basicInf.ab_ex15=='退回'">
              <el-col :span="12">
                <el-card class="box-card">
                  <div slot="header"
                       class="clearfix">
                    <span>退回材料(<span style='color:red'>{{imgNum.ab_ex175_len}}</span>)</span>

                  </div>
                  <image-view v-if="this.imgArr.ab_ex175_len"
                              :imgList="this.imgArr.ab_ex175_len"
                              height="150px"
                              width="150px"></image-view>

                </el-card>
              </el-col>
              <el-col :span="12">
                <el-card class="box-card">
                  <div slot="header"
                       class="clearfix">
                    <span>自愿放弃承诺书(<span style='color:red'>{{imgNum.ab_ex194_len}}</span>)</span>

                  </div>
                  <image-view v-if="this.imgArr.ab_ex194_len"
                              :imgList="this.imgArr.ab_ex194_len"
                              height="150px"
                              width="150px"></image-view>

                </el-card>
              </el-col>
            </el-row>

            <!-- </div> -->
          </div>

          <h3 class="line_blue"
              id="page17"
              style='margin-top:15px'>&emsp;代理人信息</h3>
          <div class="lineSt"></div>
          <div class="top_1">
            <table class="top_2">
              <tr style="height:40px;">
                <td style="width:10%; padding: 0px 0px 0px 10px;">姓名: </td>
                <td style="width:40%;">{{agentInfo.aba_ex1}}</td>
                <td style="width:10%; padding: 0px 0px 0px 10px;">身份证号:</td>
                <td style="width:40%;">{{agentInfo.aba_ex3}}</td>
              </tr>
            </table>

            <el-row :gutter="20"
                    style='margin-top:10px'>
              <el-col :span="12">
                <el-card class="box-card">
                  <div slot="header"
                       class="clearfix">
                    <span>身份证(<span style='color:red'>{{imgNum.aba_ex4_len}}</span>)</span>
                  </div>
                  <image-view v-if="this.imgArr.aba_ex4_len"
                              :imgList="this.imgArr.aba_ex4_len"
                              height="150px"
                              width="150px"></image-view>

                </el-card>
              </el-col>
              <el-col :span="12">
                <el-card class="box-card">
                  <div slot="header"
                       class="clearfix">
                    <span>委托书(<span style='color:red'>{{imgNum.aba_ex5_len}}</span>)</span>
                  </div>
                  <image-view v-if="this.imgArr.aba_ex5_len"
                              :imgList="this.imgArr.aba_ex5_len"
                              height="150px"
                              width="150px"></image-view>
                </el-card>
              </el-col>
            </el-row>
          </div>

          <repeatWarnView id="page19"
                          v-if="',申请,退回,'.indexOf(',' + basicInf.ab_ex15 + ',') == -1"></repeatWarnView>

          <div style='clear:both'></div>
          <h3 class="line_blue"
              id="page11"
              style="margin-top: 10px;"
              v-if="this.type == 'cs'">&emsp;审核</h3>
          <div class="lineSt"
               v-if="this.type == 'cs'"></div>
          <div class="top_1"
               v-if="this.type == 'cs'">
            <el-row>
              <el-col :span="2">
                <div style="line-height: 30px;text-align:center;">审核意见</div>
              </el-col>
              <el-col :span="6">
                <el-select @change="changeSh"
                           v-model="auditValue.ab_ex27"
                           placeholder="请选择">
                  <el-option v-for="item in options1"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-col>
              <el-col :span="2">
                <div style="line-height: 30px;text-align:center;">审核人</div>
              </el-col>
              <el-col :span="6">
                <el-input v-model="auditValue.ab_ex19"></el-input>
              </el-col>

              <el-col :span="2"
                      style="line-height: 30px;text-align:center;">
                <div>审核时间</div>
              </el-col>
              <el-col :span="6">
                <el-date-picker v-model="auditValue.ab_dat4"
                                type="datetime"
                                value-format="yyyy-MM-dd HH:mm"
                                placeholder="选择日期时间">
                </el-date-picker>
              </el-col>
            </el-row>
            <el-row style="margin-top: 10px;">
              <el-col :span="2"
                      style="line-height: 30px;text-align:center">
                <div><span style="color:red"> * </span>退回原因</div>
              </el-col>
              <el-col :span="6">
                <el-select @change="changeSh"
                           v-model="auditValue.ab_ex25"
                           placeholder="请选择">
                  <el-option label="自愿放弃"
                             value="自愿放弃"></el-option>
                  <el-option label="两书拒签"
                             value="两书拒签"></el-option>
                  <el-option label="失踪失联"
                             value="失踪失联"></el-option>
                  <el-option label="死亡"
                             value="死亡"></el-option>
                  <el-option label="其他"
                             value="其他"></el-option>
                </el-select>
                <!--  自愿放弃、两书拒签、死亡、失踪失联、其它 -->
              </el-col>
            </el-row>
            <el-row style="margin-top: 10px;text-align:center"
                    type="flex"
                    justify="center">
              <el-col :span="2"
                      style="line-height:30px;">
                <div>退回描述</div>
              </el-col>
              <el-col :span="22">
                <el-input type="textarea"
                          :disabled="auditValue.ab_ex25!='其他'"
                          :rows='4'
                          v-model="auditValue.ab_ex178"></el-input>
              </el-col>
            </el-row>
            <el-row style="margin-top: 10px;">
              <el-col :span="20"
                      :offset="2">
                <el-card class="box-card">
                  <div slot="header"
                       style="text-align:center"
                       class="clearfix">
                    <el-button style="float: left; padding: 3px 0"
                               type="text"
                               @click="handleRemove(imgArr,'ab_ex175')">
                      删除</el-button>
                    <span><span style="color:red"
                            v-if="this.must"> * </span>退回材料(<span style='color:red'>{{imgNum.ab_ex175_len}}</span>)</span>
                    <el-button style="float: right; padding: 3px 0"
                               type="text"
                               @click="uploads('ab_ex175')">
                      上传</el-button>
                  </div>
                  <div class="block">
                    <!-- <image-view :imgList="publicity.ab_ex175.split(',')"  id="ab_ex175"  @Imgindex='getImgIndex'></image-view> -->
                    <image-view :imgList="imgArr.ab_ex175_len"
                                @Imgindex='getImgIndex'
                                id="ab_ex175"></image-view>

                  </div>
                </el-card>
              </el-col>
            </el-row>

            <!-- <el-row style="margin-top: 10px;">
						<el-col :span="2" style="line-height: 30px;text-align:center">
							<div>备注</div>
						</el-col>
						<el-col :span="22">
							<el-input type="textarea" autosize v-model="auditValue.ab_ex25"></el-input>
						</el-col>
					</el-row> -->
            <el-row style="margin-top: 10px;"
                    type="flex"
                    justify="center">
              <el-col :span="24"
                      style="text-align: center;">
                <el-button type="primary"
                           @click="save(auditValue)">保存</el-button>
              </el-col>
            </el-row>
          </div>
          <br>
          <!-- //退回 -->
          <h3 class="line_blue"
              id="page11"
              style="margin-top: 20px;"
              v-if="this.type == 'th'">&emsp;审核</h3>
          <div class="lineSt"
               v-if="this.type == 'th'"></div>
          <div class="top_1"
               v-if="this.type == 'th'">
            <el-row>
              <el-col :span="2">
                <div style="line-height: 30px;text-align:center"><span style="color:red"> * </span>审核意见</div>
              </el-col>
              <el-col :span="6">
                <el-select @change="changeSh"
                           v-model="auditValue.ab_ex27"
                           placeholder="请选择">
                  <el-option v-for="item in options1"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-col>
              <el-col :span="2">
                <div style="line-height: 30px;text-align:center"><span style="color:red"> * </span>审核人</div>
              </el-col>
              <el-col :span="6">
                <el-input v-model="auditValue.ab_ex19"></el-input>
              </el-col>
              <el-col :span="2"
                      style="line-height: 30px;">
                <div><span style="color:red"> * </span>审核时间</div>
              </el-col>
              <el-col :span="6"
                      width="100%">
                <!-- <el-input placeholder="yyyy-MM-dd" v-model="auditValue.ab_dat4"></el-input> -->
                <el-date-picker v-model="auditValue.ab_dat4"
                                type="datetime"
                                value-format="yyyy-MM-dd HH:mm"
                                placeholder="选择日期时间">
                </el-date-picker>
              </el-col>
            </el-row>
            <el-row style="margin-top: 10px;">
              <el-col :span="2"
                      style="line-height: 30px;text-align:center">
                <div><span style="color:red"> * </span>退回原因</div>
              </el-col>
              <el-col :span="6">
                <el-select @change="changeSh"
                           v-model="auditValue.ab_ex25"
                           placeholder="请选择">
                  <el-option label="自愿放弃"
                             value="自愿放弃"></el-option>
                  <el-option label="两书拒签"
                             value="两书拒签"></el-option>
                  <el-option label="失踪失联"
                             value="失踪失联"></el-option>
                  <el-option label="死亡"
                             value="死亡"></el-option>
                  <el-option label="其他"
                             value="其他"></el-option>
                </el-select>
                <!--  自愿放弃、两书拒签、死亡、失踪失联、其它 -->
              </el-col>
            </el-row>
            <el-row style="margin-top: 10px;text-align:center"
                    type="flex"
                    justify="center">
              <el-col :span="2"
                      style="line-height:30px;">
                <div>退回描述</div>
              </el-col>
              <el-col :span="22">
                <el-input type="textarea"
                          :disabled="auditValue.ab_ex25!='其他'"
                          :rows='4'
                          v-model="auditValue.ab_ex178"></el-input>
              </el-col>
            </el-row>
            <el-row style="margin-top: 10px;">
              <el-col :span="20"
                      :offset="2">
                <el-card class="box-card">
                  <div slot="header"
                       style="text-align:center"
                       class="clearfix">
                    <el-button style="float: left; padding: 3px 0"
                               type="text"
                               @click="handleRemove(imgArr,'ab_ex175')">
                      删除</el-button>
                    <span><span style="color:red"
                            v-if="this.must"> * </span>退回材料(<span style='color:red'>{{imgNum.ab_ex175_len}}</span>)</span>
                    <el-button style="float: right; padding: 3px 0"
                               type="text"
                               @click="uploads('ab_ex175')">
                      上传</el-button>
                  </div>
                  <div class="block">
                    <!-- <image-view :imgList="publicity.ab_ex175.split(',')"  id="ab_ex175"  @Imgindex='getImgIndex'></image-view> -->
                    <image-view :imgList="imgArr.ab_ex175_len"
                                @Imgindex='getImgIndex'
                                id="ab_ex175"></image-view>

                  </div>
                </el-card>
              </el-col>
            </el-row>

            <el-row style="margin-top: 10px;"
                    type="flex"
                    justify="center">
              <el-col :span="24"
                      style="text-align: center;">
                <el-button type="primary"
                           @click="save(auditValue)">保存</el-button>
              </el-col>
            </el-row>
          </div>
          <br>

          <h3 class="line_blue"
              id="page11"
              style="margin-top: 20px;"
              v-if="this.type == 'gs'">&emsp;公示</h3>
          <div class="lineSt"
               v-if="this.type == 'gs'"></div>
          <div class="top_1"
               v-if="this.type == 'gs'">
            <el-row>
              <el-col :span="2">
                <div style="line-height: 30px;text-align:center">公示结果</div>
              </el-col>
              <el-col :span="6">
                <el-select @change="changeSh"
                           v-model="publicity.ab_ex34"
                           placeholder="请选择">
                  <el-option v-for="item in options2"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-col>
              <el-col :span="2">
                <div style="line-height: 30px;text-align:center">公示地点</div>
              </el-col>
              <el-col :span="6">
                <el-input v-model="publicity.ab_ex47"></el-input>
              </el-col>
              <el-col :span="2"
                      style="line-height: 30px;;text-align:center">
                <div>公示开始时间</div>
              </el-col>
              <el-col :span="6">
                <el-date-picker v-model="publicity.ab_dat9"
                                type="date"
                                size="small"
                                style="width:90%"
                                value-format="yyyy-MM-dd"
                                placeholder="选择公示开始时间">
                </el-date-picker>
              </el-col>
            </el-row>
            <el-row style='margin-top:10px'>
              <el-col :span="2"
                      style="line-height: 30px;text-align:center">
                <div>公示结束时间</div>
              </el-col>
              <el-col :span="6">
                <el-date-picker v-model="publicity.ab_dat10"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="选择公示结束时间">
                </el-date-picker>
              </el-col>
              <el-col :span="2"
                      style="line-height: 30px;text-align:center">
                <div>备注</div>
              </el-col>
              <el-col :span="14">
                <el-input autosize
                          v-model="publicity.ab_ex35"></el-input>
              </el-col>

            </el-row>
            <el-row style="margin-top: 10px;">

              <el-col :span="20"
                      :offset="2">
                <el-card class="box-card">
                  <div slot="header"
                       class="clearfix">
                    <span>公示图片</span>
                    <el-button style="float: right; padding: 3px 0"
                               type="text"
                               @click="uploads('ab_ex98')">
                      上传</el-button>
                  </div>
                  <div class="block">
                    <image-view :imgList="publicity.ab_ex98.split(',')"></image-view>

                  </div>
                </el-card>
              </el-col>
            </el-row>
            <el-row style="margin-top: 10px;"
                    type="flex"
                    justify="center">
              <el-col :span="24"
                      style="text-align: center;">
                <el-button type="primary"
                           @click="save2(publicity)">保存</el-button>
              </el-col>
            </el-row>
          </div>
          <br>

          <h3 class="line_blue"
              id="page11"
              style="margin-top: 20px;"
              v-if="this.type == 'sp'">&emsp;审批</h3>
          <div class="lineSt"
               v-if="this.type == 'sp'"></div>
          <div class="top_1"
               v-if="this.type == 'sp'">
            <el-row>
              <el-col :span="2">
                <div style="line-height: 30px;text-align:center">审批意见</div>
              </el-col>
              <el-col :span="6">
                <el-select @change="changeSh"
                           v-model="approval.ab_ex21"
                           placeholder="请选择">
                  <el-option v-for="item in options3"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-col>
              <el-col :span="2">
                <div style="line-height: 30px;text-align:center">审批人</div>
              </el-col>
              <el-col :span="6">
                <el-input v-model="approval.ab_ex20"></el-input>
              </el-col>
              <el-col :span="2"
                      style="line-height: 30px;text-align:center;">
                <div>审批时间</div>
              </el-col>
              <el-col :span="6">
                <el-date-picker v-model="approval.ab_dat5"
                                type="datetime"
                                value-format="yyyy-MM-dd HH:mm"
                                placeholder="选择审批时间">
                </el-date-picker>

              </el-col>
            </el-row>
            <el-row style="margin-top: 10px;">
              <el-col :span="2"
                      style="line-height: 30px;text-align:center">
                <div>备注</div>
              </el-col>
              <el-col :span="22">
                <el-input type="textarea"
                          autosize
                          v-model="approval.ab_ex26"></el-input>
              </el-col>
            </el-row>
            <el-row style="margin-top: 10px;"
                    type="flex"
                    justify="center">
              <el-col :span="24"
                      style="text-align: center;">
                <el-button type="primary"
                           @click="save3(approval)">保存</el-button>
              </el-col>
            </el-row>
          </div>
          <br>

          <h3 class="line_blue"
              id="page10">&emsp;审批记录</h3>
          <div class="lineSt"></div>
          <div class="top_1"
               id="record">
            <div class="top_1">
              <table style="width:100%;table-layout:fixed"
                     id="recordt">
                <colgroup>
                  <col style="width:15%">
                  <col style="width:20%">
                  <col style="width:15%">
                  <col style="width:15%">
                  <col style="width:15%">
                  <col style="width:20%">
                </colgroup>

                <tbody v-for="(itemR,index) in record"
                       :key="index">
                  <tr>
                    <td style="color:#899197;height:30px">处理步骤：</td>
                    <td>{{itemR.ar_ex4}}</td>
                    <td style="color:#899197">处理时间：</td>
                    <td>{{itemR.ar_dat1}}</td>
                    <td style="color:#899197">处理结果：</td>
                    <td rowspan="2"
                        style="text-align:left">
                      <img v-if="itemR.ar_ex3 == '同意'"
                           src="@/assets/img/auditStatus/agree.png"
                           style="width:100px">
                      <img v-else
                           src="@/assets/img/auditStatus/return.png"
                           style="width:100px">
                    </td>
                  </tr>
                  <tr>
                    <td style="color:#899197;height:30px">处理人：</td>
                    <td>{{itemR.ar_ex5}}</td>
                    <td style="color:#899197">处理用时：</td>
                    <td>{{itemR.ar_ex6}}天</td>
                  </tr>
                  <tr v-if="itemR.flag == true">
                    <td style="color:#899197;height:30px">公示时间：</td>
                    <td>{{itemR.ab_dat9}}</td>
                    <td style="color:#899197">公示地点：</td>
                    <td>{{itemR.ab_ex47}}</td>
                  </tr>
                  <tr style="border-bottom:1px solid #ddd">
                    <td v-if="itemR.ar_ex3=='退回'"
                        style="color:#899197;height:30px">退回原因：</td>
                    <td v-else
                        style="color:#899197;height:30px">处理意见：</td>
                    <td colspan="4">{{itemR.ar_ex2}}<span v-if="itemR.ar_ex2=='其他'">，{{basicInf.ab_ex178}}</span></td>
                  </tr>
                  <tr>
                    <td colspan="5"
                        style="height:20px">&nbsp;</td>
                  </tr>
                </tbody>
                <!-- <tbody><tr><td style="color:#899197;height:30px">处理步骤：</td><td>{{basicInf.ar_ex4}}</td><td style="color:#899197">处理时间：</td><td>{{basicInf.ar_dat1}}</td><td style="color:#899197">处理结果：</td><td rowspan="2" style="text-align:left"><img src="http://221.130.79.150:10088/image/aud/%E5%90%8C%E6%84%8F.png" style="width:100px"></td></tr><tr><td style="color:#899197;height:30px">处理人：</td><td>{{basicInf.ar_ex5}}</td><td style="color:#899197">处理用时：</td><td>{{basicInf.ar_ex6}}天</td></tr><tr style="border-bottom:1px solid #ddd"><td style="color:#899197;height:30px">处理意见：</td><td colspan="4">{{basicInf.ar_ex2}}</td></tr><tr><td colspan="5" style="height:20px">&nbsp;</td></tr></tbody> -->
              </table>
            </div>
          </div>

        </el-form>
      </div>
      <div class="ainfo2">
        <div style="margin-left:20px;text-align:center;border-bottom:1px solid #ddd;padding-bottom:10px;">
          <!-- <el-button type="primary" size="small" @click="save">保存</el-button> -->
          <el-button size="small"
                     @click="closeView">返回</el-button>
        </div>
        <div style="margin-left:30px;margin-top:20px;">
          <ul>
            <li :class="{listStyle:isShow1}"
                @click="isShow(1)">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow1}"
                 @click="counter('#page1')">档案信息</a><br>
            </li>
            <li :class="{listStyle:isShow2}"
                @click="isShow(2)">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow2}"
                 @click="counter('#page2')">基础信息</a><br>
            </li>
            <li v-if="basicInf.ab_ex92=='是'"
                :class="{listStyle:isShow21}"
                @click="isShow(21)">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow21}"
                 @click="counter('#page21')">近亲属信息</a><br>
            </li>
            <li :class="{listStyle:isShow3}"
                @click="isShow(3)">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow3}"
                 @click="counter('#page3')">银行信息</a><br>
            </li>
            <li :class="{listStyle:isShow12}"
                @click="isShow(12)">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow12}"
                 @click="counter('#page12')">自定义预警信息</a><br>
            </li>
            <li :class="{listStyle:isShow4}"
                @click="isShow(4)">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow4}"
                 @click="counter('#page4')">共同生活家庭成员情况</a><br>
            </li>
            <li :class="{listStyle:isShow5}"
                @click="isShow(5)">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow5}"
                 @click="counter('#page5')">非共同生活赡抚扶养人信息</a><br>
            </li>
            <li :class="{listStyle:isShow13}"
                @click="isShow(13)"
                style="height:45px">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow13}"
                 @click="counter('#page13')">非共同生活赡抚扶养人家庭成员信息</a><br>
            </li>
            <li :class="{listStyle:isShow6}"
                @click="isShow(6)">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow6}"
                 @click="counter('#page6')">家庭前12个月收入情况</a><br>
            </li>
            <li :class="{listStyle:isShow14}"
                @click="isShow(14)">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow14}"
                 @click="counter('#page14')">家庭前12个月支出情况</a><br>
            </li>
            <li :class="{listStyle:isShow7}"
                @click="isShow(7)">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow7}"
                 @click="counter('#page7')">金融资产</a><br>
            </li>
            <li :class="{listStyle:isShow15}"
                @click="isShow(15)">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow15}"
                 @click="counter('#page15')">拥有车、船情况</a><br>
            </li>
            <li :class="{listStyle:isShow16}"
                @click="isShow(16)">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow16}"
                 @click="counter('#page16')">拥有房产情况</a><br>
            </li>
            <li :class="{listStyle:isShow18}"
                @click="isShow(18)">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow18}"
                 @click="counter('#page18')">承包山林土地情况</a><br>
            </li>
            <li :class="{listStyle:isShow8}"
                @click="isShow(8)">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow8}"
                 @click="counter('#page8')">已享受救助情况</a><br>
            </li>
            <li :class="{listStyle:isShow9}"
                @click="isShow(9)">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow9}"
                 @click="counter('#page9')">电子附件</a><br>
            </li>
            <li :class="{listStyle:isShow17}"
                @click="isShow(17)"
                style="height:25px">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow17}"
                 @click="counter('#page17')">代理人信息</a>
            </li>
            <li :class="{listStyle:isShow19}"
                @click="isShow(19)"
                v-if="',申请,退回,'.indexOf(',' + basicInf.ab_ex15 + ',') == -1"
                style="height:25px">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow19}"
                 @click="counter('#page19')">重复预警</a>
            </li>
            <li :class="{listStyle:isShow11}"
                @click="isShow(11)"
                v-if="type=='cs'||type=='th'||type=='gs'||type=='sp'">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow11}"
                 @click="counter('#page11')">
                <span v-if="type=='cs'">审核</span>
                <span v-if="type=='th'">审核</span>
                <span v-if="type=='gs'">公示</span>
                <span v-if="type=='sp'">审批</span>
              </a><br>
            </li>

            <li :class="{listStyle:isShow10}"
                @click="isShow(10)">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow10}"
                 @click="counter('#page10')">审批记录</a><br>
            </li>
          </ul>
        </div>
      </div>

      <el-dialog title="上传"
                 :visible.sync="dialogVisible3"
                 width="500px"
                 append-to-body>
        <upload @upload="uploadEvent"
                ref="myUpload"></upload>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="dialogVisible3 = false">取 消</el-button>
          <el-button type="primary"
                     @click="dialogVisible3 = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>

  </div>
</template>
<script>
import request from '@/utils/request'
import upload from '@/views/modules/assistance/upload'
import imageView from '@/views/modules/assistance/imageView'
import repeatWarnView from '@/views/modules/assistance/qzsq/components/repeatWarnView.vue'
// import  baseURL from '@/utils/baseUrl'
export default {
  name: "qzsqListView",
  components: {
    imageView,
    upload,
    repeatWarnView
  },
  data () {
    return {
      dialogVisible3: false,
      uploadId: '',
      loading: false,
      familyNum: '',
      warningData: [],
      tableData: [],
      tableData2: [],
      tableData2_: [],
      tableData3: [],
      tableData4: [],
      tableData5: [],
      tableData6: [],
      tableData7: [], //近亲属
      assistance: [],
      record: [],
      income1: [],
      income2: [],
      income3: [],
      income4: [],
      income5: [],
      income6: [],
      income7: [],
      agentInfo: { //代理人信息
        "aba_ex1": "",
        "aba_ex2": "",
        "aba_ex3": "",
        "aba_ex4": "",
        "aba_ex5": "",
      },
      "landInfo": [], //山林
      flag: true,
      // 初审
      auditValue: {
      },
      // 公示
      publicity: {
      },
      //审批
      approval: {
      },
      // options: [{
      // 	value: '同意',
      // 	label: '同意'
      // }, {
      // 	value: '退回',
      // 	label: '退回'
      // }, {
      // 	value: '退回重新核查',
      // 	label: '退回重新核查'
      // }],
      options1: [{
        value: '退回',
        label: '退回'
      }],
      // options2: [{
      // 	value: '无异议',
      // 	label: '无异议'
      // }, {
      // 	value: '有异议',
      // 	label: '有异议'
      // }, {
      // 	value: '退回重新核查',
      // 	label: '退回重新核查'
      // }],
      // options3: [{
      // 	value: '同意',
      // 	label: '同意'
      // }, {
      // 	value: '退回',
      // 	label: '退回'
      // }, {
      // 	value: '退回重新核查',
      // 	label: '退回重新核查'
      // }],
      rules: {
        // ab_ex3: [{
        // 	required: true,
        // 	message: '退回原因不能为空',
        // 	trigger: 'blur'
        // }],
        ab_ex175: [{
          required: true,
          message: '请上传退回材料',
          trigger: 'blur'
        }]
      },
      isShow1: false,
      isShow2: true,
      isShow3: true,
      isShow4: true,
      isShow5: true,
      isShow6: true,
      isShow7: true,
      isShow8: true,
      isShow9: true,
      isShow10: true,
      isShow11: true,
      isShow12: true,
      isShow13: true,
      isShow14: true,
      isShow15: true,
      isShow16: true,
      isShow17: true,
      isShow18: true,
      isShow19: true,
      isShow21: true,
      basicInf: {},
      householdRegistrationAddress: '',
      imgNum: {},//图片数量
      imgArr: {
        // ab_ex10_len:[],
        // ab_ex16_len:[],
        // ab_ex73_len:[],
        // ab_ex74_len:[],
        // ab_ex97_len:[],
        // ab_ex98_len:[],
        // ab_ex166_len:[],
        // ab_ex167_len:[],
        ab_ex175_len: [],
        ab_ex194_len: [],
        // ab_ex177_len:[],
      },//图片数组
      pay: {
        abp_ex4: '',
        abp_ex5: '',
        abp_ex6: '',
        abp_ex7: '',
        abp_ex8: '',
        abp_ex9: '',
        abp_ex10: '',
        abp_ex11: '',
      },
      sId: "",
      cId: "",
      type: "",
      // 转办
      typeData: {
        ab_ex13: "",
        ab_ex41: ""
      },
      checked: false,
      disabled: true,
      zdShow: false,
      imgIndex: {
        ab_ex175: 0,
        ab_ex194: 0,
      },
      must: false,  //退回材料是否必填
      // activeNameArr:[] //进入的业务阶段
    }
  },
  created () {
    this.loadData();
  },

  mounted () {
    // 滚动鼠标右侧导航栏跟随滚动位置改变而改变显示
    // window.removeEventListener('scroll',this.scroll,false)
    window.addEventListener('scroll', this.scroll, true)
  },
  methods: {

    isMust () {
      if (!['其他', '死亡'].includes(data.ab_ex25)) {
        console.log(data.ab_ex25, '原因非空');
        this.must = true;
      }
    },
    // 低保转办
    dbChange () {
      this.disabled = !this.disabled;
      console.log(this.typeData.ab_ex13, "this.typeData.ab_ex13");
      if (this.disabled == true) {
        this.zdShow = false;
        this.typeData.ab_ex13 = "";
      }
    },
    radioChange () {
      if (this.typeData.ab_ex13 == "低保" && this.disabled == false) {
        this.zdShow = true;
      }
      else {
        this.zdShow = false;
        this.typeData.ab_ex41 = "";
      }
    },
    // 图片移除
    getImgIndex (item) {
      let data = JSON.parse(item);
      this.imgIndex[data.id] = data.index;
    },

    handleRemove (file, str) {

      this.$confirm('是否删除该图片？', "提示", {
        // distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$delete(this.imgArr[str + "_len"], this.imgIndex[str]);
        this.basicInf[str] = this.imgArr[str + "_len"].join(",");
        this.getImgNum()  //获取图片数量
        console.log(this.imgArr, 'this.imgArr');
        console.log(this.basicInf, 'this.basicInf');
        console.log(this.publicity, 'this.publicity');
      })
        .catch(action => {
          // 取消留在本页
          console.log("留在本页");
        });
    },



    scroll () {
      // var scrollTop =document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset;
      if (document.querySelector('.info2') == null || document.querySelector('#recordt') == null) {
        return ''
      }

      let scrollTop = document.querySelector('.info2').scrollTop
      let cHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      let oDiv1 = document.querySelector('#page1');
      let oDiv2 = document.querySelector('#page2');
      let oDiv3 = document.querySelector('#page3');
      let oDiv4 = document.querySelector('#page4');
      let oDiv5 = document.querySelector('#page5');
      let oDiv6 = document.querySelector('#page6');
      let oDiv7 = document.querySelector('#page7');
      let oDiv8 = document.querySelector('#page8');
      let oDiv9 = document.querySelector('#page9');
      let oDiv10 = document.querySelector('#page10');
      let oDiv11 = document.querySelector('#page11');
      let oDiv12 = document.querySelector('#page12');
      let oDiv13 = document.querySelector('#page13');
      let oDiv14 = document.querySelector('#page14');
      let oDiv15 = document.querySelector('#page15');
      let oDiv16 = document.querySelector('#page16');
      let oDiv17 = document.querySelector('#page17');
      let oDiv18 = document.querySelector('#page18');
      let oDiv19 = true;
      // if(this.basicInf.ab_ex15=="申请" || this.basicInf.ab_ex15=="退回" ){
      // 	oDiv19 = document.querySelector('#page19');
      // }
      let oDiv21 = true;
      if (this.basicInf.ab_ex92 == "是") {
        oDiv21 = document.querySelector('#page21');
      }
      // 顺序跟上面显示顺序要相反
      let clientHeight = document.querySelector('.info2').clientHeight
      let recordtClientHeight = document.querySelector('#recordt').scrollHeight
      // console.log("123",!oDiv1,!oDiv2,!oDiv3,!oDiv4,!oDiv5,!oDiv6,!oDiv7,!oDiv8,!oDiv9,!oDiv10,!oDiv11,!oDiv12,!oDiv13,!oDiv14,!oDiv15,!oDiv16,!oDiv17,!oDiv18,!oDiv19,!oDiv21);
      // 在新增dialog打开时不执行后面的程序
      if (!oDiv1 || !oDiv2 || !oDiv3 || !oDiv4 || !oDiv5 || !oDiv6 || !oDiv7 || !oDiv8 || !oDiv9 || !oDiv10 || !oDiv12 || !oDiv13 || !oDiv14 || !oDiv15 || !oDiv16 || !oDiv17 || !oDiv18 || !oDiv19 || !oDiv21) {

        return ''
      }
      // console.log("123");
      if (recordtClientHeight + oDiv10.clientHeight < clientHeight && scrollTop > (oDiv10.offsetTop - oDiv1.offsetTop - clientHeight + recordtClientHeight + oDiv10.clientHeight)) {
        // console.log('触发了10-1')
        this.isShow(10)
      } else if (scrollTop > (oDiv10.offsetTop - oDiv1.offsetTop - 1)) {
        // console.log('触发了10-2')
        this.isShow(10)
      }
      else if (oDiv11 && scrollTop > (oDiv11.offsetTop - oDiv1.offsetTop - 1)) {
        // console.log('触发了11')
        this.isShow(11)
      } else if (oDiv19 && scrollTop > (oDiv19.offsetTop - oDiv1.offsetTop - 1)) {
        // console.log('触发了19')
        this.isShow(19)
      } else if (oDiv17 && scrollTop > (oDiv17.offsetTop - oDiv1.offsetTop - 1)) {
        // console.log('触发了17')
        this.isShow(17)
      } else if (scrollTop > (oDiv9.offsetTop - oDiv1.offsetTop - 1)) {
        // console.log('触发了9')
        this.isShow(9)
      } else if (scrollTop > (oDiv8.offsetTop - oDiv1.offsetTop - 1)) {
        // console.log('触发了8')
        this.isShow(8)
      }
      else if (scrollTop > (oDiv18.offsetTop - oDiv1.offsetTop - 1)) {
        // console.log('触发了18')
        this.isShow(18)
      }
      else if (scrollTop > (oDiv16.offsetTop - oDiv1.offsetTop - 1)) {
        // console.log('触发了16')
        this.isShow(16)
      } else if (scrollTop > (oDiv15.offsetTop - oDiv1.offsetTop - 1)) {
        // console.log('触发了15')
        this.isShow(15)
      } else if (scrollTop > (oDiv7.offsetTop - oDiv1.offsetTop - 1)) {
        // console.log('触发了7')
        this.isShow(7)
      } else if (scrollTop > (oDiv14.offsetTop - oDiv1.offsetTop - 1)) {
        // console.log('触发了14')
        this.isShow(14)
      } else if (scrollTop > (oDiv6.offsetTop - oDiv1.offsetTop - 1)) {
        // console.log('触发了6')
        this.isShow(6)
      } else if (scrollTop > (oDiv13.offsetTop - oDiv1.offsetTop - 1)) {
        // console.log('触发了13')
        this.isShow(13)
      } else if (scrollTop > (oDiv5.offsetTop - oDiv1.offsetTop - 1)) {
        // console.log('触发了5')
        this.isShow(5)
      } else if (scrollTop > (oDiv4.offsetTop - oDiv1.offsetTop - 1)) {
        // console.log('触发了4')
        this.isShow(4)
      } else if (scrollTop > (oDiv12.offsetTop - oDiv1.offsetTop - 1)) {
        // console.log('触发了12')
        this.isShow(12)
      } else if (scrollTop > (oDiv3.offsetTop - oDiv1.offsetTop - 1)) {
        // console.log('触发了3')
        this.isShow(3)
      } else if (scrollTop > (oDiv21.offsetTop - oDiv1.offsetTop)) {
        // console.log('触发了21')
        this.isShow(21)
      } else if (scrollTop > (oDiv2.offsetTop - oDiv1.offsetTop - 1)) {
        // console.log('触发了2')
        this.isShow(2)
      } else if (scrollTop > (oDiv1.offsetTop - oDiv1.offsetTop - 1)) {
        // console.log('触发了1')
        this.isShow(1)
      }
    },
    counter (id) { //counter1是绑定的点击事件名称
      document.querySelector(id).scrollIntoView(true);
      // const returnEle = document.querySelector("#page8"); //productId是将要跳转区域的id
      // if (!!returnEle) {
      // 	returnEle.scrollIntoView(true); // true 是默认的
      // }
      // document.querySelector("counter1").scrollIntoView(true); //这里的counter1是将要返回地方的id
    },
    // 数据调用 then为失败，catch为成功
    loadData () {

      // this.activeNameArr = sessionStorage.getItem("activeName").split("/")
      // console.log(this.activeNameArr[2]);
      this.sId = this.$route.query.sId;
      this.cId = this.$route.query.cId;
      this.type = this.$route.query.type;
      console.log(this.type, 'this.type');
      if (this.type == 'th') {
        this.type = 'cs'
      }
      console.log(this.type);
      this.getData({
        sId: this.sId,
        type: this.type

      }).then(res => {
        this.warningData = res[0].data
        this.record1(res[0].record)
        this.auditValue = res[0].data[0]
        if (this.$route.query.type == "th") {
          this.auditValue.ab_ex27 = "退回";
        }
        this.publicity = res[0].data[0]
        this.approval = res[0].data[0]
      }).catch(res => {
        // console.log(typeof res.request === 'undefined')
        // console.log(typeof res.response === 'undefined')

        if (typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200) {
          console.log('请求失败了-----------------------getData')
          this.$message.error('数据获取失败或请求超时')
          this.$emit("closes", false)
          this.$router.go(-1)
          return false
        }
        if (res.response.data[0].waring.length > 0) {
          for (let i = 0; i < res.response.data[0].waring.length; i++) {
            this.warningData[i] = res.response.data[0].waring[i]
          }
        }

        this.basicInf = res.response.data[0].data[0]
        // this.record = res.response.data[0].record
        this.record1(res.response.data[0].record)
        this.auditValue = res.response.data[0].data[0]
        // console.log(res.response.data[0].data[0],"this.auditValue")
        if (this.$route.query.type == "th")
          this.auditValue.ab_ex27 = "退回";

        this.publicity = res.response.data[0].data[0]
        this.approval = res.response.data[0].data[0]

        // 户籍地址新老格式判断
        let arr = [];
        arr = this.auditValue.ab_ex4.split(';')
        if (arr.length > 1) {
          let arr2 = [];
          let arr3 = [];
          arr2 = arr[0].split(',');
          console.log();
          for (let i in arr2) {
            arr3.push(arr2[i].split('#')[0])
            console.log('arr2=>', arr2);
            console.log('arr3=>', arr3);
            console.log('arr2.split=>', arr2[i].split('#'));

          }

          this.householdRegistrationAddress = arr3.join('') + arr[1];
        } else {
          this.householdRegistrationAddress = this.auditValue.address
        }

        console.log(res.response.data[0].data[0], "this.basicInf")

        //获取图片数组
        this.imgArr.ab_ex10_len = this.basicInf.ab_ex10.split(",")
        this.imgArr.ab_ex16_len = this.basicInf.ab_ex16.split(",")
        this.imgArr.ab_ex73_len = this.basicInf.ab_ex73.split(",")
        this.imgArr.ab_ex74_len = this.basicInf.ab_ex74.split(",")
        this.imgArr.ab_ex97_len = this.basicInf.ab_ex97.split(",")
        this.imgArr.ab_ex98_len = this.basicInf.ab_ex98.split(",")
        this.imgArr.ab_ex166_len = this.basicInf.ab_ex166.split(",")
        this.imgArr.ab_ex167_len = this.basicInf.ab_ex167.split(",")
        this.imgArr.ab_ex175_len = this.basicInf.ab_ex175.split(",")
        this.imgArr.ab_ex177_len = this.basicInf.ab_ex177.split(",")
        this.imgArr.ab_ex194_len = this.basicInf.ab_ex194.split(",")
        console.log(this.imgArr, '图片');
        // this.imgNum 
        for (let key in this.imgArr) {
          if (this.imgArr[key][0] == '') {
            this.imgArr[key].length = 0
            this.imgNum[key] = this.imgArr[key].length
          } else {
            this.imgNum[key] = this.imgArr[key].length
          }
        }
        console.log(this.imgNum, "this.imgNum----")
        // console.log(res,"this.basicInf----")

      })


      this.loadFamily({
        sId: this.sId,
        sType: "Y" //Y为共同生活，N为非共同生活
      }).then(res => {
        // console.log(res)
        this.tableData = res[0].data
      }).catch(res => {
        if (typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200) {
          console.log('请求失败了-----------------------loadFamily')
          this.$message.error('数据获取失败或请求超时')
          this.$emit("closes", false)
          this.$router.go(-1)
          return false
        }
        // 家庭成员数据分配
        for (let i in res.response.data[0].data) {
          // if(res.response.data[0].data[i].abm_ex6=='Y' && ['','是'].includes(res.response.data[0].data[i].abm_ex42)){
          if (res.response.data[0].data[i].abm_ex6 == 'Y') {
            this.tableData.push(res.response.data[0].data[i])
          } else if (res.response.data[0].data[i].abm_ex6 == 'N') {
            this.tableData2.push(res.response.data[0].data[i])
          } else if (res.response.data[0].data[i].abm_ex6 == 'B') {
            this.tableData2_.push(res.response.data[0].data[i])
          } else if (res.response.data[0].data[i].abm_ex6 == 'C') {
            this.tableData7.push(res.response.data[0].data[i])
          }
        }
        // console.log(res.response.data[0].data,'------共同生活成员') 
        // this.familyNum=this.tableData.length?this.tableData.length:1
        // console.log(this.tableData,"this.tableData")

        //获取共同生活成员的年龄和是否为工作年龄段
        for (let i in this.tableData) {
          this.changeCard(i)
        }

        //收入
        this.loadIncome({
          sId: this.sId,
        }).then(res => {
          console.log(res,)
          this.pay = res[0].data
        }).catch(res => {
          if (typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200) {
            console.log('请求失败了-----------------------loadIncome')
            this.$message.error('数据获取失败或请求超时')
            this.$emit("closes", false)
            this.$router.go(-1)
            return false
          }

          console.log(res.response.data[0], "收入数据")

          if (res.response.data[0].data.length == 0) {
            let income7 = [
              {
                abi_ex1: "总收入",
                abi_ex2: "0.00",
              },
              {
                abi_ex1: "家庭月平均收入",
                abi_ex2: "0.00",
              }, {
                abi_ex1: "家庭月人均收入",
                abi_ex2: "0.00",
              }]
            this.income7 = income7
            // console.log("收入数据为空",this.income7);
          } else {

            for (let i in res.response.data[0].data) {
              for (let j in res.response.data[0].data[i]) {
                res.response.data[0].data[i][j] = unescape(res.response.data[0].data[i][j]) //解码
                // console.log(res.response.data[0].data[i][j]);
              }
              res.response.data[0].data[i].abi_ex2 = Number(res.response.data[0].data[i].abi_ex2).toFixed(2)
              console.log(res.response.data[0].data[i].abi_ex2);
              //收入类型数据分配
              if (res.response.data[0].data[i].abi_ex4 == 'A') {
                this.income1.push(res.response.data[0].data[i])
              } else if (res.response.data[0].data[i].abi_ex4 == 'B') {
                res.response.data[0].data[i].abi_ex1 = "经营性净收入"
                this.income2.push(res.response.data[0].data[i])
              } else if (res.response.data[0].data[i].abi_ex4 == 'C') {
                this.income3.push(res.response.data[0].data[i])
              } else if (res.response.data[0].data[i].abi_ex4 == 'D') {
                this.income4.push(res.response.data[0].data[i])
              } else if (res.response.data[0].data[i].abi_ex4 == 'E') {
                res.response.data[0].data[i].abi_ex1 = "其他收入"
                this.income5.push(res.response.data[0].data[i])
              } else if (res.response.data[0].data[i].abi_ex4 == 'F') {
                res.response.data[0].data[i].abi_ex1 = "必要就业成本抵扣"
                this.income6.push(res.response.data[0].data[i])
              } else if (res.response.data[0].data[i].abi_ex4 == 'G') {
                this.income7.push(res.response.data[0].data[i])
              }
            }


            var abi_ex2_1 = 0;
            var abi_ex2_2 = 0;
            var abi_ex2_3 = 0;
            var abi_ex2_4 = 0;
            var abi_ex2_5 = 0;
            var abi_ex2_6 = 0;
            // var abi_ex2_7=0;

            var len = 0;
            for (let i in this.income1) {
              if (this.income1[i].abi_ex2 != "" && !isNaN(Number(this.income1[i].abi_ex2))) {
                len++;
                abi_ex2_1 += Number(this.income1[i].abi_ex2)
              } else if (len == 0) {
                abi_ex2_1 = 0.00;
              }
            }
            console.log(abi_ex2_1);

            for (let i in this.income2) {
              if (this.income2[i].abi_ex2 != "" && !isNaN(Number(this.income2[i].abi_ex2))) {
                len++;
                abi_ex2_2 += Number(this.income2[i].abi_ex2)
              } else if (len == 0) {
                abi_ex2_2 = 0.00;
              }
            }

            for (let i in this.income3) {
              if (this.income3[i].abi_ex2 != "" && !isNaN(Number(this.income3[i].abi_ex2))) {
                len++;
                abi_ex2_3 += Number(this.income3[i].abi_ex2)
              } else if (len == 0) {
                abi_ex2_3 = 0.00;
              }
            }

            for (let i in this.income4) {
              if (this.income4[i].abi_ex2 != "" && !isNaN(Number(this.income4[i].abi_ex2))) {
                len++;
                abi_ex2_4 += Number(this.income4[i].abi_ex2)
              } else if (len == 0) {
                abi_ex2_4 = 0.00;
              }
              // console.log( this.income4);
            }

            for (let i in this.income5) {
              if (this.income5[i].abi_ex2 != "" && !isNaN(Number(this.income5[i].abi_ex2))) {
                len++;
                abi_ex2_5 += Number(this.income5[i].abi_ex2)
              } else if (len == 0) {
                abi_ex2_5 = 0.00;
              }
              // console.log( this.income5);
            }

            if (this.income6.length > 0) {
              len++;
              abi_ex2_6 += Number(this.income6[0].abi_ex2)
            } else {
              abi_ex2_6 = 0.00;
            }
            // console.log( this.income6);


            var amt = abi_ex2_1 + abi_ex2_2 + abi_ex2_3 + abi_ex2_4 + abi_ex2_5 - abi_ex2_6;


            console.log(this.income7.length, amt);
            if (this.income7.length == 0) {
              console.log("income7.length=0");
              // this.income7[0]={abi_ex1:"",abi_ex2:"",};
              // this.income7[1]={abi_ex1:"",abi_ex2:"",};
              // this.income7[2]={abi_ex1:"",abi_ex2:"",};

              this.income7[0] = { abi_ex1: "总收入", abi_ex2: "120", };
              this.income7[1] = { abi_ex1: "家庭月平均收入", abi_ex2: "120", };
              this.income7[2] = { abi_ex1: "家庭月人均收入", abi_ex2: "120", };
              this.$forceUpdate()
              this.$set(this.income7[0], "abi_ex1", "总收入")
              this.$set(this.income7[0], "abi_ex2", "0.00")
              this.$set(this.income7[1], "abi_ex1", "家庭月平均收入")
              this.$set(this.income7[1], "abi_ex2", "0.00")
              this.$set(this.income7[2], "abi_ex1", "家庭月人均收入")
              this.$set(this.income7[2], "abi_ex2", "0.00")
              console.log(this.income7);
              console.log("income7.length=0");

              console.log(this.income7, "计算出总收入");
            } else {
              console.log("income7.length>0");
              this.income7[0].abi_ex1 = "";
              this.income7[1] = {};
              this.income7[1].abi_ex1 = "";
              this.income7[2] = {};
              this.income7[2].abi_ex1 = "";

              this.$set(this.income7[0], "abi_ex1", "总收入")
              this.$set(this.income7[1], "abi_ex1", "家庭月平均收入")
              this.$set(this.income7[2], "abi_ex1", "家庭月人均收入")

              console.log("总收入有值", this.income7);
              this.income7[0].abi_ex2 = Number(this.income7[0].abi_ex2).toFixed(2)
              this.income7[1].abi_ex2 = Number(this.income7[0].abi_ex2 / 12).toFixed(2)
              console.log("总收入有值，计算月均" + this.income7[1].abi_ex2);

              if (this.tableData.length > 0) {
                console.log("收入计算", this.tableData.length);
                var income7_2 = Number(this.income7[0].abi_ex2 / 12 / this.tableData.length).toFixed(2);
                this.income7[2].abi_ex2 = income7_2;
              } else {
                console.log("收入为零", this.tableData.length);
                this.income7[2].abi_ex2 = "0.00";
              }
            }
          }

        })
      })
      // 刚性支出
      this.loadPay({
        sId: this.sId,
      }).then(res => {
        console.log(res,)
        this.pay = res[0].data
      }).catch(res => {
        if (typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200) {
          console.log('请求失败了-----------------------loadPay')
          this.$message.error('数据获取失败或请求超时')
          this.$emit("closes", false)
          this.$router.go(-1)
          return false
        }
        console.log(res.response.data[0], "// 家庭支出")
        if (res.response.data[0].data3.length > 0) {
          this.pay = res.response.data[0].data3[0] // 家庭支出
        }
      })

      this.loadEstate({
        sId: this.sId,
      }).then(res => {
        console.log(res)
        this.tableData3 = res[0].data //车
        this.tableData4 = res[0].data2 //房
      }).catch(res => {
        if (typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200) {
          console.log('请求失败了-----------------------loadEstate')
          this.$message.error('数据获取失败或请求超时')
          this.$emit("closes", false)
          this.$router.go(-1)
          return false
        }
        console.log(res)
        for (let i in res.response.data[0].data) {
          if (res.response.data[0].data[i].abe_ex7 == '车船') {
            this.tableData3.push(res.response.data[0].data[i])
          } else {
            this.tableData4.push(res.response.data[0].data[i])
          }
        }
      })

      this.loadSalvation({
        sId: this.sId,
        cId: this.cId
      }).then(res => {
        console.log(res)
        this.tableData5 = res[0].data
        this.tableData6 = res[0].data2
      }).catch(res => {

        this.tableData5 = [];
        this.tableData6 = [];

        console.log(res)
        if (res.request.data != undefined) {

          this.tableData5 = res.response.data[0].data
          this.tableData6 = res.response.data[0].data2

        } else if (typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4) {
          console.log('请求失败了-----------------------loadSalvation')
          // this.$message.error('数据获取失败或请求超时')
          // this.$emit("closes", false)
          // this.$router.go(-1)
          return false
        }

      })

      //承包山林土地
      this.loadLand({
        "sId": this.$route.query.sId,
      }).then(res => {
        this.landInfo = res[0].data;
      }).catch(res => {
        if (typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200) {
          console.log('请求失败了-----------------------6')
          this.$message.error('数据获取失败或请求超时666')
          this.$emit("closes", false)
          this.$router.go(-1)
          return false
        }
        this.landInfo = res.response.data[0].data;
      })

      //代理人信息
      this.loadAgent({
        "sId": this.sId
      }).then(res => {
        this.agentInfo = res[0].data
      }).catch(res => {
        /*if(typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200){
          console.log('请求失败了-----------------------')
          this.$message.error('数据获取失败或请求超时')
          this.$emit("closes", false)
          this.$router.go(-1)
          return false
        }*/
        this.agentInfo = res.response.data[0].data
        this.imgArr.aba_ex4_len = this.agentInfo.aba_ex4.split(",");
        this.imgArr.aba_ex5_len = this.agentInfo.aba_ex5.split(",");
        for (let i in this.imgArr) {
          var r = this.imgArr[i].filter(function (s) {
            return s && s.trim();
          });
          // console.log(r,"过滤数组");
          if (i == 'aba_ex4_len') {
            this.agentInfo.aba_ex4 = r.join(",")
          } else if (i == 'aba_ex5_len') {
            this.agentInfo.aba_ex5 = r.join(",")
          }
        }
        this.getImgNum()
      });
    },

    getData (sid) {
      return request({
        headers: {
          'Accept': 'application/json',
        },
        url: '/social/assistance/getBasics',
        method: 'post',
        data: sid
      })
    },

    // 自定义预警
    // loadWarning(data) {
    // 	return request({
    // 		headers: {
    // 			'Accept': 'application/json',
    // 		},
    // 		url: '/social/assistance/getBasics',
    // 		method: 'post',
    // 		data: data
    // 	})
    // },
    // 家庭成员
    loadFamily (data) {
      return request({
        headers: {
          'Accept': 'application/json',
        },
        url: '/social/assistance/getBasicFamily',
        method: 'post',
        data: data
      })
    },
    // 家庭收入
    loadIncome (data) {
      return request({
        headers: {
          'Accept': 'application/json',
        },
        url: '/social/assistance/getBasicIncome',
        method: 'post',
        data: data
      })
    },
    // 家庭支出
    loadPay (data) {
      return request({
        headers: {
          'Accept': 'application/json',
        },
        url: '/social/assistance/getBasicPay',
        method: 'post',
        data: data
      })
    },
    // 家庭财产
    loadEstate (data) {
      return request({
        headers: {
          'Accept': 'application/json',
        },
        url: '/social/assistance/getBasicEstate',
        method: 'post',
        data: data
      })
    },
    loadSalvation (data) {
      return request({
        headers: {
          'Accept': 'application/json',
        },
        url: '/social/assistance/getBasicSalvation',
        method: 'post',
        data: data
      })
    },
    // 山林土地
    loadLand (data) {
      return request({
        method: 'post',
        url: '/social/assistance/getBasicLand',
        data: data
      });
    },
    // 代理人
    loadAgent (data) {
      return request({
        headers: {
          'Accept': 'application/json',
        },
        url: '/social/assistance/getBasicAgent',
        method: 'post',
        data: data
      })
    },
    record1 (rec) {
      for (let i in rec) {
        if ("公示开始" == rec[i].ar_ex4 && this.flag == false) {
          return true;
        }
        this.record[i] = {
          ar_ex4: rec[i].ar_ex4,
          ar_dat1: rec[i].ar_dat1,
          ar_ex3: rec[i].ar_ex3,
          ar_ex5: rec[i].ar_ex5,
          ar_ex6: rec[i].ar_ex6,
          ar_ex2: rec[i].ar_ex2,
          flag: false
        }
        if ("公示开始" == rec[i].ar_ex4 && this.flag) {
          this.record[i].flag = true
          this.flag = false;
          this.record[i].ab_dat9 = this.basicInf.ab_dat9 + "~" + this.basicInf.ab_dat10
          this.record[i].ab_ex47 = this.basicInf.ab_ex47
          console.log(rec[i])
        }
      }
      console.log(this.record)
    },
    // 审核、公示、审批意见/结果，这个方法目前看来 就是打印日志一下没什么用
    changeSh (val) {
      // var text = $("#ab_ex25").val();
      // if(text==null||text==''||text=='同意'||text=='退回重新核查'||text=='退回'){
      //     $("#ab_ex25").val(val);
      // }

      let data = this.basicInf;

      if (!['其他', '死亡'].includes(data.ab_ex25)) {
        console.log(data.ab_ex25, '原因非空');
        this.must = true;
      } else {

        this.must = false;
      }
      console.log(val)
    },
    save (data) {

      // 退回
      if (data.ab_ex25 == "") {
        console.log(data.ab_ex25, 'kong');
        this.$message.error('请选择退回原因');
        return false;
        // this.loading = false;
      } else if (data.ab_ex25 == "其他" && data.ab_ex178 == '') {
        console.log(data.ab_ex25, 'qt');
        this.$message.error('请填写退回描述');
        return false;
      }
      else if (!['其他', '死亡'].includes(data.ab_ex25) && data.ab_ex175 == '') {
        console.log(data.ab_ex25, '原因非空');
        this.$message.error('请上传退回材料');
        this.must = true;
        return false;
      }
      else {
        this.loading = true;
        // 设置定时器，30秒请求失败刷新页面
        let time = setTimeout(() => {
          this.loading = false;
          this.$emit("closes", false)
          this.$message.error("网络异常");
          this.$router.go(-1)
        }, 30000)
        this.saveBasiccs({
          "data": "[" + JSON.stringify(data) + "]",
          "sId": this.sId,
          'typeData': "[" + JSON.stringify(this.typeData) + "]"

        }).then((res) => {
          if (res[0].status == "+OK") {
            this.loading = false;
            this.$message.success(res[0].msg)
            this.$emit("closes", false)
            this.$router.go(-1)
          } else {
            this.loading = false;
            this.$message.error(res[0].msg)
          }
        }).catch((res) => {
          // 数据请求成功删除定时器
          clearTimeout(time);
          console.log(946, res.response.data[0].status);
          if (res.response.data[0].status == "+OK") {
            console.log(948);
            this.loading = false;
            this.$message.success(res.response.data[0].msg)
            this.$emit("closes", false)
            this.$router.go(-1)
          } else {
            console.log(953);
            this.loading = false;
            this.$message.error(res.response.data[0].msg)
          }
        })
      }

      // }
    },
    save2 (data) {
      // console.log(data)
      // 判断公示开始时间比公示结束时间早就取消保存
      if (this.publicity.ab_dat9 > this.publicity.ab_dat10) {
        this.$message.warning("公示结束时间比公示开始时间早")
        return false
      }
      if (data.ab_ex34 == "") {
        this.$message.error('请选择公示结果');
      } else {
        this.loading = true;
        // 设置定时器，30秒请求失败刷新页面
        let time = setTimeout(() => {
          this.loading = false;
          this.$emit("closes", false)
          this.$message.error("网络异常");
          this.$router.go(-1)
        }, 30000)
        this.saveBasicgs({
          "data": "[" + JSON.stringify(data) + "]",
          "sId": this.sId,
          "ab_ex98": data.ab_ex98
        }).then((res) => {
          if (res[0].status == "+OK") {
            this.loading = false;
            this.$message.success(res[0].msg)
            this.$emit("closes", false)
            this.$router.go(-1)
          } else {
            this.loading = false;
            this.$message.error(res[0].msg)
          }
        }).catch((res) => {
          // 数据请求成功删除定时器
          clearTimeout(time);
          if (res.response.data[0].status == "+OK") {
            this.loading = false;
            this.$message.success(res.response.data[0].msg)
            this.$emit("closes", false)
            this.$router.go(-1)
          } else {
            this.loading = false;
            this.$message.error(res.response.data[0].msg)
          }
        })
      }
    },
    save3 (data) {
      // console.log(data)
      if (data.ab_ex21 == "") {
        this.$message.error('请选择审批意见');
      } else {

        this.loading = true;
        // 设置定时器，30秒请求失败刷新页面
        let time = setTimeout(() => {
          this.loading = false;
          this.$emit("closes", false)
          this.$message.error("网络异常");
          this.$router.go(-1)
        }, 30000)
        this.saveBasicsh({
          "data": "[" + JSON.stringify(data) + "]",
          "sId": this.sId
        }).then((res) => {
          if (res[0].status == "+OK") {
            this.loading = false;
            this.$message.success(res[0].msg)
            this.$emit("closes", false)
            this.$router.go(-1)
          } else {
            this.loading = false;
            this.$message.error(res[0].msg)
          }
        }).catch((res) => {
          // 数据请求成功删除定时器
          clearTimeout(time);
          if (res.response.data[0].status == "+OK") {
            this.loading = false;
            this.$message.success(res.response.data[0].msg)
            this.$emit("closes", false)
            this.$router.go(-1)
          } else {
            this.loading = false;
            this.$message.error(res.response.data[0].msg)
          }
        })
      }
    },
    //初审 /.退回
    saveBasiccs (data) {
      let url = ''
      if (this.type == 'th') {
        url = "/social/assistance/saveBasicth"
      } else {
        url = "/social/assistance/saveBasiccs"
      }
      return request({
        headers: {
          'Accept': 'application/json',
        },
        url: url,
        method: 'post',
        data: data
      })
    },
    //公示
    saveBasicgs (data) {
      return request({
        headers: {
          'Accept': 'application/json',
        },
        url: '/social/assistance/saveBasicgs',
        method: 'post',
        data: data
      })
    },
    //审批
    saveBasicsh (data) {
      return request({
        headers: {
          'Accept': 'application/json',
        },
        url: '/social/assistance/saveBasicsh',
        method: 'post',
        data: data
      })
    },
    closeView () {
      this.$emit("closes", false)
      this.$router.go(-1)
      if (process.env.NODE_ENV != "development") {
        this.$router.go(-1)
      }
      // this.$router.back()
    },

    // 获取图片数量
    getImgNum () {
      for (let key in this.imgArr) {
        if (this.imgArr[key][0] == '') {
          this.imgArr[key].length = 0
          this.imgNum[key] = this.imgArr[key].length
        } else {
          this.imgNum[key] = this.imgArr[key].length
          // console.log("图片数量",this.imgArr[key].length);
        }
      }
      console.log(this.imgArr, "this.imgArr");
      console.log(this.imgNum, "this.imgNum");
    },

    isShow (n) {
      this.isShow1 = true;
      this.isShow2 = true;
      this.isShow3 = true;
      this.isShow4 = true;
      this.isShow5 = true;
      this.isShow6 = true;
      this.isShow7 = true;
      this.isShow8 = true;
      this.isShow9 = true;
      this.isShow10 = true;
      this.isShow11 = true;
      this.isShow12 = true;
      this.isShow13 = true;
      this.isShow14 = true;
      this.isShow15 = true;
      this.isShow16 = true;
      this.isShow17 = true;
      this.isShow18 = true;
      this.isShow19 = true;
      this.isShow21 = true;

      if (n == 1) {
        this.isShow1 = false
      } else if (n == 2) {
        this.isShow2 = false
      } else if (n == 3) {
        this.isShow3 = false
      } else if (n == 4) {
        this.isShow4 = false
      } else if (n == 5) {
        this.isShow5 = false
      } else if (n == 6) {
        this.isShow6 = false
      } else if (n == 7) {
        this.isShow7 = false
      } else if (n == 8) {
        this.isShow8 = false
      } else if (n == 9) {
        this.isShow9 = false
      } else if (n == 10) {
        this.isShow10 = false
      } else if (n == 11) {
        this.isShow11 = false
      } else if (n == 12) {
        this.isShow12 = false
      } else if (n == 13) {
        this.isShow13 = false
      } else if (n == 14) {
        this.isShow14 = false
      } else if (n == 15) {
        this.isShow15 = false
      } else if (n == 16) {
        this.isShow16 = false
      } else if (n == 17) {
        this.isShow17 = false
      } else if (n == 18) {
        this.isShow18 = false
      } else if (n == 19) {
        this.isShow19 = false
      } else if (n == 21) {
        this.isShow21 = false
      }
    },
    uploads (id) {
      this.dialogVisible3 = true;
      this.uploadId = id;
      try {
        this.$refs.myUpload.clears();
      } catch (e) { }
    },

    uploadEvent (data) {
      let val = this.publicity[this.uploadId];
      console.log(data);
      val = val == "" ? data : val + "," + data;
      this.publicity[this.uploadId] = val;
      // this.imgArr[this.uploadId+'_len'].push(data);
      this.imgArr[this.uploadId + "_len"] = this.publicity[this.uploadId].split(",");

      console.log(this.publicity, '--publicity');
      console.log(this.imgArr, '--imgArr');
      this.getImgNum()  //获取图片数量
      //	this.a[this.uploadId + "_img"] = val.split(",");
    },
    getAge (identityCard) {
      var len = (identityCard + "").length;
      if (len == 0) {
        return 0;
      } else {
        if ((len != 15) && (len != 18))//身份证号码只能为15位或18位其它不合法
        {
          return 0;
        }
      }
      var strBirthday = "";
      if (len == 18)//处理18位的身份证号码从号码中得到生日和性别代码
      {
        strBirthday = identityCard.substr(6, 4) + "/" + identityCard.substr(10, 2) + "/" + identityCard.substr(12, 2);
      }
      if (len == 15) {
        strBirthday = "19" + identityCard.substr(6, 2) + "/" + identityCard.substr(8, 2) + "/" + identityCard.substr(10, 2);
      }
      //时间字符串里，必须是“/”
      var birthDate = new Date(strBirthday);
      var nowDateTime = new Date();
      var age = nowDateTime.getFullYear() - birthDate.getFullYear();
      //再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
      if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() == birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())) {
        age--;
      }
      console.log(age)
      return age;
    },
    changeCard (index, row) {
      // this.familyData1[index].abm_ex5=this.getSex(this.familyData1[index].abm_ex2);
      this.tableData[index].age = this.getAge(this.tableData[index].abm_ex2);
      if (this.tableData[index].age < 16 || this.tableData[index].age > 60) {
        this.tableData[index].work = "否"
      } else {
        this.tableData[index].work = "是"
      }
    },
  }
}
</script>
<style scoped>
.g-box {
  height: 80vh !important;
}
.g-box2 {
  width: 100%;
  height: 100%;
  overflow: auto !important;
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
}
.lineSt {
  background-color: #dcdfe6;
  height: 1px;
  width: 100%;
  margin-bottom: 10px;
}

.top_2 {
  width: 100%;
}

.top_1 {
  margin-bottom: 50px;
}

.imgSt {
  width: 140px;
  margin-top: -4%;
  z-index: 10000;
  transform: rotate(30deg);
  -ms-transform: rotate(30deg);
  /* IE 9 */
}

.line_blue {
  border-left: 2px solid #3385ff;
}

.family {
  width: 100%;
  margin-top: 20px;
  margin-bottom: 50px;
}

.top_3 {
  width: 50%;
  float: left;
}

.top_4 {
  height: 200px;
  margin-top: 40px;
  margin-bottom: -30px;
}

.demo-image__preview {
  height: 200px;
  width: 200px;
  float: left;
  margin-left: 5%;
  overflow: hidden;
  margin-top: 15px;
}

.info2 {
  flex: 1;
  padding-right: 10px;
  box-sizing: border-box;
  border-right: 1px solid #ddd;
  overflow: auto;
}

.ainfo2 {
  width: 240px;
  font-size: 14px;
  line-height: 20px;
  text-align: left;
  padding-left: 10px;
  box-sizing: border-box;
}

.ainfoFont {
  display: block;
  margin-bottom: -15px;
  font-weight: bold;
  color: #606266;
}

.listStyle {
  list-style: none;
}

.listStyleA {
  color: #3385ff !important;
}

.btn button {
  padding: 2px 6px;
  background: #ffffff;
  border: 1px solid #606266;
}

.btn :nth-child(1) {
  margin-right: 5px;
  background: blue;
  color: #ffffff;
  border: 1px solid blue;
  /* display: inline-block; */
}
/* >>>.el-checkbox__inner{
		border:1px solid #000 !important;
	}
	>>>.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
		border-color: #409EFF !important;
	}
	>>>.el-radio__inner{
		border:1px solid #000 !important;
	}
	>>>.el-radio__input.is-disabled .el-radio__inner, .el-radio__input.is-disabled.is-checked .el-radio__inner{
		border-color: #E4E7ED !important;
	}
	>>>.el-radio__input.is-checked .el-radio__inner{
		border-color: #409EFF !important;
	}
	>>>.el-input--suffix .el-input__inner{
		padding-right: 20px  !important;
		
	}
	>>>.el-input__suffix{
		right: -1px !important;
	} */
</style>
<style scoped>
/* table表下边框 */
div >>> .el-table__empty-block {
  border-bottom: 1px solid #eee;
  height: auto !important;
  background-image: none;
}
</style>

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
                <td></td>
                <td colspan='2'> </td>
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
                <td>{{basicInf.ab_ex4}}</td>
                <td>家庭地址:</td>
                <td>{{basicInf.ab_ex11}}</td>
              </tr>
              <tr style="height:40px;">
                <td>求助原因:</td>
                <td>{{basicInf.ab_ex46}}</td>
                <td>是否属于村干部或经办人员近亲属:</td>
                <td>{{basicInf.ab_ex92}}</td>
              </tr>
              <tr style="height:40px;">
                <td>是否渐退期:</td>
                <td>{{basicInf.ab_ex207}}</td>
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
                               label="家庭关系"
                               min-width="120"></el-table-column>
              <el-table-column prop="abm_ex81"
                               label="赡(扶、抚)养关系"
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
                               label="赡(扶、抚)养关系"
                               min-width="150"></el-table-column>
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
              <el-table-column label="工资性收入(年)"
                               style="text-align:center">
                <el-table-column prop="abi_ex1"
                                 label="计入收入名称"
                                 min-width="100"></el-table-column>
                <el-table-column prop="abi_ex2"
                                 label="金额"
                                 min-width="150"></el-table-column>
              </el-table-column>
            </el-table>
            <el-table style="width: 100%;margin-top:10px"
                      :data="income3">
              <el-table-column label="财产净收入(年)"
                               style="text-align:center">
                <el-table-column prop="abi_ex1"
                                 label="计入收入名称"
                                 min-width="100"></el-table-column>
                <el-table-column prop="abi_ex2"
                                 label="金额"
                                 min-width="150"></el-table-column>
              </el-table-column>
            </el-table>
            <el-table style="width: 100%;margin-top:10px"
                      :data="income4">
              <el-table-column label="转移净收入(年)"
                               style="text-align:center">
                <el-table-column prop="abi_ex1"
                                 label="计入收入名称"
                                 min-width="100"></el-table-column>
                <el-table-column prop="abi_ex2"
                                 label="金额"
                                 min-width="150"></el-table-column>
              </el-table-column>
            </el-table>
            <el-table style="width: 100%;margin-top:10px"
                      :data="income2">
              <el-table-column label="经营净收入(年)"
                               style="text-align:center">
                <el-table-column prop="abi_ex1"
                                 label="计入收入名称"
                                 min-width="100"></el-table-column>
                <el-table-column prop="abi_ex2"
                                 label="金额"
                                 min-width="150"></el-table-column>
              </el-table-column>
            </el-table>
            <el-table style="width: 100%;margin-top:10px"
                      :data="income5">
              <el-table-column label="其他收入(年)"
                               style="text-align:center">
                <el-table-column prop="abi_ex1"
                                 label="计入收入名称"
                                 min-width="100"></el-table-column>
                <el-table-column prop="abi_ex2"
                                 label="金额"
                                 min-width="150"></el-table-column>
              </el-table-column>
            </el-table>
            <el-table style="width: 100%;margin-top:10px"
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
            <el-table style="width: 100%;margin-top:10px"
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
                                 label="车(船)型"
                                 min-width="100"></el-table-column>
                <el-table-column prop="abe_ex4"
                                 label="车(船)价值"
                                 min-width="100"></el-table-column>
              </el-table-column>
            </el-table>
          </div>
          <h3 class="line_blue"
              id="page16">&emsp;拥有房产情况</h3>
          <div class="lineSt"></div>
          <div class="top_1">
            <el-table style="width: 100%"
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
                                 label="面积(平方)"
                                 min-width="100"></el-table-column>
                <el-table-column prop="abe_ex4"
                                 label="购置价/建造价"
                                 min-width="100"></el-table-column>
              </el-table-column>
            </el-table>
            <el-row :gutter="20"
                    style="margin-top:20px">
              <el-col :span="12">
                <el-card class="box-card">
                  <div slot="header"
                       class="clearfix">
                    <span>房屋整体照片(
                      <span style='color:red'>{{imgNum.ab_ex166_len}}</span>)</span>
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
                        {{imgNum.ab_ex167_len}} </span>)</span>
                  </div>
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
            <el-row :gutter="20"
                    style='margin-top:10px'>
              <el-col :span="12">
                <el-card class="box-card">
                  <div slot="header"
                       class="clearfix">
                    <span>身份证(<span style='color:red'>{{imgNum.ab_ex10_len}}</span>)</span>
                  </div>
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
                    <span>纸质授权书(<span style='color:red'>{{imgNum.ab_ex177_len}}</span>)</span>
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
                    <span>民主评议(<span style='color:red'>{{imgNum.ab_ex97_len}}</span>)</span>
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
                  <image-view v-if="this.imgArr.ab_ex16_len"
                              :imgList="this.imgArr.ab_ex16_len"
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
                    style='margin-top:10px'>
              <el-col :span="12"
                      v-if="this.type != 'cs' ">
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

              <el-col v-if="this.basicInf.ab_ex15=='退回'"
                      :span="12">
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
                          v-if="',申请,退回,'.indexOf(',' + basicInf.ab_ex15 + ',') == -1"
                          ref="repeatWarn"></repeatWarnView>

          <div style='clear:both'></div>

          <!-- <h3 class="line_blue" id="page23" style="margin-top: 20px;" v-if="this.showChildren">&emsp;儿童预警</h3>
					<div class="lineSt" v-if="this.showChildren"></div>
					<div v-if="this.showChildren">
						<el-table :data="childrenWarning" border  class="my-table">
							<el-table-column  label="姓名" prop="abm_ex3" min-width="100">
							</el-table-column>
							<el-table-column v-if="this.type!='2'"   label="救助金（元）" prop="abm_ex71" min-width="145" >
								<template slot-scope="scope">
									<el-input v-model="scope.row.abm_ex71"  class="srname" @change="changeChildrenMoney(scope.row.abm_ex3)"></el-input>
								</template>
							</el-table-column>
							<el-table-column  v-if="this.type=='2'"  label="救助金（元）" prop="abm_ex71" min-width="145" >
							</el-table-column>
						</el-table>
					</div> -->

          <h3 class="line_blue"
              id="page24"
              style="margin-top: 20px;">&emsp;汇总表</h3>
          <div class="lineSt"></div>
          <div>
            <el-table :data="[basicInf]"
                      border
                      style="width: 100% ; margin-bottom: 20px;">
              <el-table-column prop="ab_ex13"
                               label="救助类别"
                               min-width="100"></el-table-column>
              <el-table-column prop="ab_ex3"
                               label="申请人"
                               min-width="100"></el-table-column>
              <el-table-column prop="ab_ex40"
                               label="家庭月保障金额（元）"
                               min-width="180"></el-table-column>
              <el-table-column label="详情"
                               min-width="180"
                               v-if="['低保','特困供养',''].includes(publicity.ab_ex13)">
                <template slot-scope="scope">
                  <el-button @click="moneyDetail(scope.row)"
                             type="text"
                             size="small">明细</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div><br>

          <template v-if="this.approval.ab_ex13=='特困供养'">
            <h3 class="line_blue"
                id="page22"
                v-if="this.type == 'cs'">&emsp;特困信息补充</h3>
            <div class="lineSt"
                 v-if="this.type == 'cs'"></div>
            <div class="top_1"
                 v-if="this.type == 'cs'">
              <el-row :gutter="20"
                      style="text-align:center;margin-bottom:10px">
                <el-col :span="2"
                        style="line-height: 30px;text-align:center;">
                  <div style="line-height:30px;;min-width:100px"><span style="color:red"> * </span>特困供养方式</div>
                </el-col>
                <el-col :span="6">
                  <el-select v-model="approval.ab_ex71">
                    <el-option label="请选择"
                               value=""></el-option>
                    <el-option label="分散供养"
                               value="分散供养"></el-option>
                    <el-option label="集中供养"
                               value="集中供养"></el-option>
                  </el-select>
                </el-col>

                <el-col :span="3">
                  <div style="line-height: 30px;"><span style="color:red"> * </span>护理费（元/人）</div>
                </el-col>
                <el-col :span="5">
                  <el-select v-model="approval.ab_ex199"
                             @change="changeMoney(approval.ab_ex199,'ab_ex199')">
                    <el-option label="请选择"
                               value=""></el-option>
                    <el-option label="0"
                               value="0"></el-option>
                    <el-option label="100"
                               value="100"></el-option>
                    <el-option label="250"
                               value="250"></el-option>
                    <el-option label="500"
                               value="500"></el-option>
                  </el-select>
                  <!-- <el-input v-model="approval.ab_ex199" placeholder="请输入护理费" @change="keyVerification(approval.ab_ex199,'ab_ex199')"></el-input> -->
                </el-col>
                <el-col :span="2">
                  <div style="line-height: 30px;"><span v-if="['集中','集中供养'].includes(approval.ab_ex71)"
                          style="color:red"> * </span>供养机构</div>
                </el-col>
                <el-col :span="6">
                  <!-- <el-select v-model="approval.ab_ex195"  filterable placeholder="请选择供养机构名称" @change="getSupportinst(approval.ab_ex195,'ab_ex195')">
										<el-option v-for="item in supportinstList" :key="item.abs_ex1" :label="item.abs_ex1" :value="item.abs_ex1"></el-option>
									</el-select> -->
                  <el-input v-model="approval.ab_ex195"
                            placeholder="请输入供养机构名称"
                            @change="keyVerification(approval.ab_ex195,'ab_ex195')"></el-input>
                </el-col>
              </el-row>

              <el-row :gutter="20"
                      style="text-align:center">
                <el-col :span="2">
                  <div style="line-height: 30px;;min-width:100px"><span style="color:red"> * </span>生活自理能力</div>
                </el-col>
                <el-col :span="6">
                  <el-select v-model="approval.ab_ex198">
                    <el-option label="请选择"
                               value=""></el-option>
                    <el-option label="自理"
                               value="自理"></el-option>
                    <el-option label="失能"
                               value="失能"></el-option>
                    <el-option label="半失能"
                               value="半失能"></el-option>
                  </el-select>
                </el-col>

                <el-col :span="3">
                  <div style="line-height: 30px;"><span style="color:red"> * </span>生活费（元/人）</div>
                </el-col>
                <el-col :span="5">
                  <el-input v-model="ab_ex200"
                            type="number"
                            placeholder="请输入生活费"
                            @change="changeMoney(ab_ex200,'ab_ex200')"></el-input>
                </el-col>
              </el-row>
              <el-row :gutter="20"
                      style="margin-top:20px">
                <el-col :span="12"
                        class="my-col">
                  <el-card class="box-card">
                    <div slot="header"
                         style="text-align: center;">
                      <el-button style="float: left; padding: 3px 0"
                                 type="text"
                                 @click="handleRemove(imgArr,'ab_ex196')">
                        删除</el-button>
                      <span>自理能力状况评估报告<span style='color:red'>&nbsp;必填</span>(<span style='color:red'>{{imgNum.ab_ex196_len}}</span>)</span>
                      <el-button style="float: right; padding: 3px 0"
                                 v-if="!imgArr.ab_ex196_len.length"
                                 type="text"
                                 @click="uploads('ab_ex196')">上传</el-button>
                    </div>
                    <div class="block">
                      <image-view :imgList="imgArr.ab_ex196_len"
                                  id="ab_ex196"
                                  @Imgindex='getImgIndex'></image-view>
                    </div>
                  </el-card>
                </el-col>
                <el-col :span="12"
                        class="my-col">
                  <el-card class="box-card">
                    <div slot="header"
                         style="text-align: center;">
                      <el-button style="float: left; padding: 3px 0"
                                 type="text"
                                 @click="handleRemove(imgArr,'ab_ex197')">
                        删除</el-button>
                      <span>集中供养意愿书<span style='color:red'>&nbsp;必填</span>(<span style='color:red'>{{imgNum.ab_ex197_len}}</span>)</span>
                      <el-button style="float: right; padding: 3px 0"
                                 type="text"
                                 v-if="!imgArr.ab_ex197_len.length"
                                 @click="uploads('ab_ex197')">上传</el-button>
                    </div>
                    <div class="block">
                      <image-view :imgList="imgArr.ab_ex197_len"
                                  id="ab_ex197"
                                  @Imgindex='getImgIndex'></image-view>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </div>
          </template>
          <!-- 初审/审核 -->
          <h3 class="line_blue"
              id="page11"
              style="margin-top: 20px;"
              v-if="this.type == 'cs'">&emsp;审核</h3>
          <div class="lineSt"
               v-if="this.type == 'cs'"></div>
          <div class="top_1"
               v-if="this.type == 'cs'">
            <el-row>
              <el-col :span="2">
                <div style="line-height: 30px;text-align:center;"><span style="color:red"> * </span>审核意见</div>
              </el-col>
              <el-col :span="6">
                <el-select @change="changeSh"
                           v-model="auditValue.ab_ex27"
                           placeholder="请选择"
                           style="width=100%">
                  <el-option v-for="item in options"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-col>
              <el-col :span="2">
                <div style="line-height: 30px;text-align:center;"><span style="color:red"> * </span>审核人</div>
              </el-col>
              <el-col :span="6">
                <el-input v-model="auditValue.ab_ex19"></el-input>
              </el-col>
              <el-col :span="2"
                      style="line-height: 30px;text-align:center;">
                <div><span style="color:red"> * </span>审核时间</div>
              </el-col>
              <el-col :span="6">
                <el-date-picker v-model="auditValue.ab_dat4"
                                type="datetime"
                                value-format="yyyy-MM-dd HH:mm"
                                placeholder="选择日期时间">

                </el-date-picker>
              </el-col>
            </el-row>
            <!--    退回    -->
            <div v-if="auditValue.ab_ex27=='退回'">
              <el-row style="margin-top: 10px;">
                <el-col :span="2"
                        style="line-height: 30px;text-align:center">
                  <div><span style="color:red"> * </span>退回原因</div>
                </el-col>
                <el-col :span="6">
                  <!--  自愿放弃、两书拒签、死亡、失踪失联、其它 -->
                  <el-select @change="changeSh"
                             v-model.trim="auditValue.ab_ex25"
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
                            :rows='4'
                            :disabled="auditValue.ab_ex25!='其他'"
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
                      <el-button style="float:left;padding:3px 0"
                                 type="text"
                                 @click="handleRemove(imgArr,'ab_ex175')">删除</el-button>
                      <span><span style="color:red"
                              v-if="auditValue.ab_ex202=='' && this.must"> * </span>退回材料(<span style='color:red'>{{imgNum.ab_ex175_len}}</span>)</span>
                      <el-button style="float:right;padding:3px 0"
                                 type="text"
                                 @click="uploads('ab_ex175')">上传</el-button>
                    </div>
                    <div class="block">
                      <image-view :imgList="imgArr.ab_ex175_len"
                                  @Imgindex='getImgIndex'
                                  id="ab_ex175"></image-view>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </div>

            <!-- 新增转办功能 -->
            <!-- <el-row style="margin-top: 10px;" v-if="false">
							<el-col :span="2" style="text-align:center" > 	
								<el-checkbox v-model="checked"  @change="zbChange">转办</el-checkbox>
							</el-col>
							<el-col :span="22">
									(<el-radio-group style="margin: 0 5px" :disabled="disabled" v-model="typeData.ab_ex13">
										<el-radio label="低保" :value="'低保'" v-show="dbShow" @change="radioChange">最低生活保障</el-radio>
										<el-radio label="家庭边缘" :value="'家庭边缘'" v-show="dsrShow" @change="radioChange">单人保家庭</el-radio>
										<el-radio label="支出贫困" :value="'支出贫困'" v-show="zcShow" @change="radioChange">支出性困难家庭</el-radio>
										<el-radio label="特困供养" :value="'特困供养'" v-show="tkShow" @change="radioChange">特困人员供养</el-radio>
									</el-radio-group>)
							</el-col>
						</el-row> -->

            <el-row style="margin-top: 10px;"
                    v-if="auditValue.ab_ex27!='退回'">
              <el-col :span="2"
                      style="line-height: 30px;text-align:center">
                <div>备注</div>
              </el-col>
              <el-col :span="22">
                <el-input type="textarea"
                          autosize
                          v-model.trim="auditValue.ab_ex25"></el-input>
              </el-col>
            </el-row>
            <br>
            <el-row style="margin-top: 10px;"
                    type="flex"
                    justify="center">
              <el-col :span="24"
                      style="text-align: center;">
                <el-button type="primary"
                           @click="save(auditValue)"
                           :disabled="saveDisabled">保存</el-button>
                <el-button type="danger"
                           v-if="!arb"
                           @click="changeType(auditValue)">转办</el-button>
                <!-- <el-button type="danger" v-if="['低收入型低保',''].includes(auditValue.ab_ex41)"  @click="changeType(auditValue)">转办</el-button> -->
              </el-col>
            </el-row>
          </div>
          <!-- 转办修改页 -->
          <el-dialog title="转办数据完善"
                     center
                     :visible.sync="dialogChangeForm"
                     :before-close="giveUpZB"
                     z-index=1999
                     width=80%
                     class="change_type">
            <el-row v-if="!arb">
              <el-col :span="2"
                      style="text-align:left">
                <el-checkbox v-model="checked"
                             @change="zbChange">转办</el-checkbox>
              </el-col>
              <el-col :span="22">
                (<el-radio-group class="changeTypeGroup"
                                style="margin: 0 5px"
                                :disabled="disabled"
                                v-model="ab_ex13">
                  <el-radio label="低保"
                            :value="'低保'"
                            v-show="dbShow"
                            @change="radioChange">最低生活保障</el-radio>
                  <el-radio label="家庭边缘"
                            :value="'家庭边缘'"
                            v-show="dsrShow"
                            @change="radioChange">单人保家庭</el-radio>
                  <el-radio label="支出贫困"
                            :value="'支出贫困'"
                            v-show="zcShow"
                            @change="radioChange">支出性困难家庭</el-radio>
                  <el-radio label="特困供养"
                            :value="'特困供养'"
                            v-show="tkShow"
                            @change="radioChange">特困人员供养</el-radio>
                  <el-radio v-if="auditValue.ab_ex13=='低保'"
                            :disabled='to_arb'
                            label="按人保"
                            :value="'按人保'"
                            @change="radioChange">低保按人保</el-radio>
                </el-radio-group>)
                <!-- <el-radio-group style="margin: 0 5px"  v-model="typeData.ab_ex41">
										<el-radio v-if="auditValue.ab_ex13=='低保'" label="按人保" :value="'按人保'" @change="radioChange1">低保按人保</el-radio>
									</el-radio-group>) -->
              </el-col>
            </el-row>
            <el-row :gutter="20"
                    style="margin-top:10px">
              <el-col :span="12">
                <el-form-item label="家庭人口"
                              prop="ab_ex5">
                  <el-input v-model="auditValue.ab_ex5"
                            placeholder="请输入家庭人口"
                            @change="keyVerification(auditValue.ab_ex5,'ab_ex5')"></el-input>
                  <!-- <el-input v-model="dibaoForm.ab_ex5" placeholder="请输入家庭人口"  @change="changeAmt"  ></el-input> -->
                </el-form-item>
              </el-col>
            </el-row>

            <h3 class="line_blue"
                style="margin-top:20px">&emsp;共同生活家庭成员情况</h3>
            <div class="lineSt"></div>
            <el-row class="button-group">
              <el-button type="primary"
                         icon="el-icon-plus"
                         size="mini"
                         @click="handleAddDetails('tableData')">
                新增</el-button>
              <el-button type="danger"
                         icon="el-icon-delete"
                         size="mini"
                         @click="handleDelDetails('tableData')">
                删除</el-button>
            </el-row>
            <el-table :data="tableData"
                      border
                      :row-class-name="rowClassName"
                      @selection-change="handleFamilyData1"
                      empty-text='空'
                      class="my-table">

              <el-table-column type="selection"
                               width="40"
                               align="center"
                               :selectable="selectable" />
              <el-table-column prop="abm_ex3"
                               label="姓名"
                               min-width="110">
                <template slot-scope="scope">
                  <el-input v-model="tableData[scope.row.xh-1].abm_ex3"
                            :disabled="scope.row.abm_ex1=='户主'"
                            @change="keyVerification2(scope.$index,scope.row,'f1.abm_ex3')"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="abm_ex1"
                               label="与户主关系"
                               min-width="150">
                <template slot-scope="scope">
                  <el-select v-model="tableData[scope.row.xh-1].abm_ex1"
                             :disabled="scope.row.abm_ex1=='户主'">
                    <!-- <el-option label="户主" value="户主"></el-option> -->
                    <el-option label="配偶"
                               value="配偶"></el-option>
                    <el-option label="子/婿"
                               value="子/婿"></el-option>
                    <el-option label="女/媳"
                               value="女/媳"></el-option>
                    <el-option label="(外)孙子女"
                               value="(外)孙子女"></el-option>
                    <el-option label="父母/岳父母/公婆"
                               value="父母/岳父母/公婆"></el-option>
                    <el-option label="(外)祖父母"
                               value="(外)祖父母"></el-option>
                    <el-option label="兄弟姐妹"
                               value="兄弟姐妹"></el-option>
                    <el-option label="其他"
                               value="其他"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="abm_ex2"
                               label="身份证号码"
                               min-width="190">
                <template slot-scope="scope">
                  <el-input v-model="tableData[scope.row.xh-1].abm_ex2"
                            :disabled="scope.row.abm_ex1=='户主'"
                            @change="changeCard(scope.$index,scope.row,'f1.abm_ex2')"
                            class="srname"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="abm_ex5"
                               label="性别"
                               min-width="110">
                <template slot-scope="scope">
                  <el-select v-model="tableData[scope.row.xh-1].abm_ex5"
                             :disabled="scope.row.abm_ex1=='户主'">
                    <el-option label="男"
                               value="男"></el-option>
                    <el-option label="女"
                               value="女"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="abm_ex16"
                               label="民族选择"
                               min-width="190">
                <template slot-scope="scope">
                  <el-select v-model="tableData[scope.row.xh-1].abm_ex16"
                             :disabled="scope.row.abm_ex1=='户主'">
                    <el-option label="请选择"
                               value=""></el-option>
                    <el-option v-for="(item,index) in nation"
                               :key="index"
                               :label="item"
                               :value="item">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="abm_ex7"
                               label="户口性质"
                               min-width="130">
                <template slot-scope="scope">
                  <el-select v-model="tableData[scope.row.xh-1].abm_ex7"
                             :disabled="scope.row.abm_ex1=='户主'">
                    <el-option label="请选择"
                               value=""></el-option>
                    <el-option label="非农业户口"
                               value="非农业户口"></el-option>
                    <el-option label="农业户口"
                               value="农业户口"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="abm_ex28"
                               label="婚姻状况"
                               min-width="110">
                <template slot-scope="scope">
                  <el-select v-model="tableData[scope.row.xh-1].abm_ex28"
                             :disabled="scope.row.abm_ex1=='户主'">
                    <el-option label="请选择"
                               value=""></el-option>
                    <el-option label="未婚"
                               value="未婚"></el-option>
                    <el-option label="已婚"
                               value="已婚"></el-option>
                    <el-option label="离异"
                               value="离异"></el-option>
                    <el-option label="初婚"
                               value="初婚"></el-option>
                    <el-option label="再婚"
                               value="再婚"></el-option>
                    <el-option label="复婚"
                               value="复婚"></el-option>
                    <el-option label="丧偶"
                               value="丧偶"></el-option>
                    <!-- <el-option label="未说明的婚姻状况" value="未说明的"></el-option> -->
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="abm_ex51"
                               label="特定对象"
                               min-width="200">
                <template slot-scope="scope">
                  <el-select v-model="tableData[scope.row.xh-1].abm_ex51"
                             :disabled="scope.row.abm_ex1=='户主'">
                    <el-option label="请选择"
                               value=""></el-option>
                    <el-option label="老年人"
                               value="老年人"></el-option>
                    <el-option label="未成年人"
                               value="未成年人"></el-option>
                    <el-option label="独居"
                               value="独居"></el-option>
                    <el-option label="散居归侨/侨属"
                               value="散居归侨/侨属"></el-option>
                    <el-option label="少数民族"
                               value="少数民族"></el-option>
                    <el-option label="重病"
                               value="重病"></el-option>
                    <el-option label="重残"
                               value="重残"></el-option>
                    <el-option label="退役军人"
                               value="退役军人"></el-option>
                    <el-option label="军转干部"
                               value="军转干部"></el-option>
                    <el-option label="已故原工商业者无工作的配偶"
                               value="已故原工商业者无工作的配偶"></el-option>
                    <el-option label="艾滋病患者"
                               value="艾滋病患者"></el-option>
                    <el-option label="易肇事肇祸精神病人"
                               value="易肇事肇祸精神病人"></el-option>
                    <el-option label="两牢释放人员"
                               value="两牢释放人员"></el-option>
                    <el-option label="社区矫正人员"
                               value="社区矫正人员"></el-option>
                    <el-option label="建国前老党员"
                               value="建国前老党员"></el-option>
                    <el-option label="高校毕业生"
                               value="高校毕业生"></el-option>
                    <el-option label="宗教教职员"
                               value="宗教教职员"></el-option>
                    <el-option label="休渔期渔民"
                               value="休渔期渔民"></el-option>
                    <el-option label="非农水库移民"
                               value="非农水库移民"></el-option>
                    <el-option label="农业户口水库移民"
                               value="农业户口水库移民"></el-option>
                    <el-option label="森工企业/含国有林场人员"
                               value="森工企业/含国有林场人员"></el-option>
                    <el-option label="农垦企业人员/含农场"
                               value="农垦企业人员/含农场"></el-option>
                    <el-option label="原民政救济对象"
                               value="原民政救济对象"></el-option>
                    <el-option label="被征地人员"
                               value="被征地人员"></el-option>
                    <el-option label="僧尼"
                               value="僧尼"></el-option>
                    <el-option label="持独生子女父母光荣证人员"
                               value="持独生子女父母光荣证人员"></el-option>
                    <el-option label="奖扶/特扶人员"
                               value="奖扶/特扶人员"></el-option>
                    <el-option label="边民"
                               value="边民"></el-option>
                    <el-option label="归侨"
                               value="归侨"></el-option>
                    <el-option label="劳模先进"
                               value="劳模先进"></el-option>
                    <el-option label="原工商业主"
                               value="原工商业主"></el-option>
                    <el-option label="优抚对象"
                               value="优抚对象"></el-option>
                    <el-option label="其他优抚对象"
                               value="其他优抚对象"></el-option>
                    <el-option label="集中孤儿"
                               value="集中孤儿"></el-option>
                    <el-option label="分散孤儿"
                               value="分散孤儿"></el-option>
                    <el-option label="单亲家庭子女"
                               value="单亲家庭子女"></el-option>
                    <el-option label="三类企业人员"
                               value="三类企业人员"></el-option>
                    <el-option label="托管人员"
                               value="托管人员"></el-option>
                    <el-option label="孤儿"
                               value="孤儿"></el-option>
                    <el-option label="计生失独人员"
                               value="计生失独人员"></el-option>
                    <el-option label="血友病转艾滋病人员"
                               value="血友病转艾滋病人员"></el-option>
                    <el-option label="2008年前鉴定的完全丧失劳动能力残疾人"
                               value="2008年前鉴定的完全丧失劳动能力残疾人"></el-option>
                    <el-option label="吸毒史人员"
                               value="吸毒史人员"></el-option>
                    <el-option label="服刑人员"
                               value="服刑人员"></el-option>
                    <el-option label="信访维稳对象"
                               value="信访维稳对象"></el-option>
                    <el-option label="民政部门认定的其它特定救助对象"
                               value="民政部门认定的其它特定救助对象"></el-option>
                    <el-option label="非特定救助对象"
                               value="非特定救助对象"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop=""
                               label="年龄"
                               min-width="110">
                <template slot-scope="scope">
                  <el-input v-model="tableData[scope.row.xh-1].age"
                            class="srname"
                            :disabled="scope.row.abm_ex1=='户主'"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop=""
                               label="是否属于劳动年龄段"
                               min-width="160">
                <template slot-scope="scope">
                  <el-select v-model="tableData[scope.row.xh-1].work"
                             @change="changeMember(scope.$index)"
                             :disabled="scope.row.abm_ex1=='户主'">
                    <el-option label="是"
                               value="是"></el-option>
                    <el-option label="否"
                               value="否"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="abm_ex11"
                               label="健康状况"
                               min-width="150">

                <template slot-scope="scope">
                  <el-select class="srname"
                             v-model="tableData[scope.row.xh-1].abm_ex11"
                             @change="changeMember(scope.$index)"
                             :disabled="scope.row.abm_ex1=='户主'">
                    <el-option label="请选择"
                               value=""></el-option>
                    <el-option label="健康"
                               value="健康"></el-option>
                    <el-option label="重病"
                               value="重病"></el-option>
                    <el-option label="残疾"
                               value="残疾"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="abm_ex52"
                               label="重病病种"
                               min-width="200">
                <template slot-scope="scope">
                  <!--el-select v-model="tableData[scope.row.xh-1].abm_ex52"  :disabled="disabledList.indexOf('a'+scope.$index)>=0 "   @change="changeMember(scope.$index)"-->
                  <el-select v-model="tableData[scope.row.xh-1].abm_ex52"
                             :disabled="scope.row.abm_ex11!='重病' || scope.row.abm_ex1=='户主'"
                             @change="changeMember(scope.$index)"
                             class="srname">
                    <el-option label="请选择"
                               value=""></el-option>
                    <el-option label="白血病"
                               value="白血病"></el-option>
                    <el-option label="终末期肾病"
                               value="终末期肾病"></el-option>
                    <el-option label="恶性肿瘤"
                               value="恶性肿瘤"></el-option>
                    <el-option label="器官移植后抗排异药物治疗"
                               value="器官移植后抗排异药物治疗"></el-option>
                    <el-option label="再生障碍性贫血"
                               value="再生障碍性贫血"></el-option>
                    <el-option label="系统性红斑狼疮(活动期或伴有脏器损害)"
                               value="系统性红斑狼疮(活动期或伴有脏器损害)"></el-option>
                    <el-option label="血友病"
                               value="血友病"></el-option>
                    <el-option label="肝硬化失代偿期"
                               value="肝硬化失代偿期"></el-option>
                    <el-option label="重症类风湿关节炎"
                               value="重症类风湿关节炎"></el-option>
                    <el-option label="强直性脊柱炎"
                               value="强直性脊柱炎"></el-option>
                    <el-option label="糖尿病合并严重并发症(限晚期糖尿病肾病、糖尿病足〈有坏疽、 深部溃疡、脓肿、骨髓炎〉患者)"
                               value="糖尿病合并严重并发症(限晚期糖尿病肾病、糖尿病足〈有坏疽、 深部溃疡、脓肿、骨髓炎〉患者)"></el-option>
                    <el-option label="艾滋病机会感染"
                               value="艾滋病机会感染"></el-option>
                    <el-option label="慢性阻塞性肺疾病"
                               value="慢性阻塞性肺疾病"></el-option>
                    <el-option label="尘肺"
                               value="尘肺"></el-option>
                    <el-option label="地中海贫血"
                               value="地中海贫血"></el-option>
                    <el-option label="克罗恩病"
                               value="克罗恩病"></el-option>
                    <el-option label="渐冻人病"
                               value="渐冻人病"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="abm_ex39"
                               label="残疾种类"
                               min-width="110">
                <template slot-scope="scope">
                  <!--el-select v-model="tableData[scope.row.xh-1].abm_ex39"  :disabled="disabledList2.indexOf('a'+scope.$index)>=0 "   @change="changeMember(scope.$index)"-->
                  <el-select v-model="tableData[scope.row.xh-1].abm_ex39"
                             :disabled="scope.row.abm_ex11!='残疾' || scope.row.abm_ex1=='户主'"
                             @change="changeMember(scope.$index)">
                    <!--el-option :label="disabledList2.indexOf(scope.$index)>=0" value=""></el-option-->
                    <el-option label="请选择"
                               value=""></el-option>
                    <el-option label="肢体残疾"
                               value="肢体残疾"></el-option>
                    <el-option label="精神残疾"
                               value="精神残疾"></el-option>
                    <el-option label="智力残疾"
                               value="智力残疾"></el-option>
                    <el-option label="视力残疾"
                               value="视力残疾"></el-option>
                    <el-option label="言语残疾"
                               value="言语残疾"></el-option>
                    <el-option label="听力残疾"
                               value="听力残疾"></el-option>
                    <el-option label="多重残疾"
                               value="多重残疾"></el-option>
                    <el-option label="其他残疾"
                               value="其他残疾"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="abm_ex40"
                               label="残疾等级"
                               min-width="110">
                <template slot-scope="scope">
                  <!--el-select v-model="tableData[scope.row.xh-1].abm_ex40"  :disabled="disabledList2.indexOf('a'+scope.$index)>=0 "   @change="changeMember(scope.$index)"-->
                  <el-select v-model="tableData[scope.row.xh-1].abm_ex40"
                             :disabled="scope.row.abm_ex11!='残疾' || scope.row.abm_ex1=='户主' "
                             @change="changeMember(scope.$index)">
                    <el-option label="请选择"
                               value=""></el-option>
                    <el-option label="一级残疾"
                               value="一级残疾"></el-option>
                    <el-option label="二级残疾"
                               value="二级残疾"></el-option>
                    <el-option label="三级残疾"
                               value="三级残疾"></el-option>
                    <el-option label="四级残疾"
                               value="四级残疾"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="abm_ex49"
                               label="劳动能力"
                               min-width="160">
                <template slot-scope="scope">
                  <!-- <el-select v-model="tableData[scope.row.xh-1].abm_ex49"  > -->
                  <el-select v-model="tableData[scope.row.xh-1].abm_ex49">
                    <!-- <el-option label="请选择" value=""></el-option> -->
                    <el-option label="有劳动能力"
                               value="有劳动能力"></el-option>
                    <el-option label="部分丧失劳动能力"
                               value="部分丧失劳动能力"></el-option>
                    <el-option label="完全丧失劳动能力"
                               value="完全丧失劳动能力"></el-option>
                    <el-option label="无劳动能力"
                               value="无劳动能力"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="abm_ex14"
                               label="职业状况"
                               min-width="160">
                <template slot-scope="scope">
                  <el-select v-model="tableData[scope.row.xh-1].abm_ex14"
                             :disabled="scope.row.abm_ex1=='户主'">
                    <!-- <el-select v-model="tableData[scope.row.xh-1].abm_ex14"  > -->
                    <el-option label="请选择"
                               value=""></el-option>
                    <el-option label="在职职工"
                               value="在职职工"></el-option>
                    <el-option label="灵活就业人员"
                               value="灵活就业人员"></el-option>
                    <el-option label="登记失业人员"
                               value="登记失业人员"></el-option>
                    <el-option label="未登记失业人员"
                               value="未登记失业人员"></el-option>
                    <el-option label="无就业条件人员"
                               value="无就业条件"></el-option>
                    <el-option label="离退休人员"
                               value="离退休人员"></el-option>
                    <el-option label="务农人员"
                               value="务农人员"></el-option>
                    <el-option label="务工人员"
                               value="务工人员"></el-option>
                    <el-option label="非法定年龄就业状况"
                               value="非法定年龄就业状况"></el-option>
                    <el-option label="享受养老保险人员"
                               value="享受养老保险人员"></el-option>
                    <el-option label="其他就业情况"
                               value="其他就业情况"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="abm_ex15"
                               label="工作单位"
                               min-width="200">
                <template slot-scope="scope">
                  <!-- <el-input v-model="tableData[scope.row.xh-1].abm_ex15" @change="keyVerification2(scope.$index,scope.row,'f1.abm_ex15')"  ></el-input> -->
                  <el-input v-model="tableData[scope.row.xh-1].abm_ex15"
                            @change="keyVerification2(scope.$index,scope.row,'f1.abm_ex15')"
                            :disabled="scope.row.abm_ex1=='户主'"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="abm_ex17"
                               label="月收入"
                               min-width="100">
                <template slot-scope="scope">
                  <el-input v-model="tableData[scope.row.xh-1].abm_ex17"
                            @change="keyVerification2(scope.$index,scope.row,'f1.abm_ex17')"
                            :disabled="scope.row.abm_ex1=='户主'"></el-input>
                </template>
              </el-table-column>
            </el-table>

            <h3 class="line_blue"
                style="margin-top:20px">&emsp;非共同生活赡抚扶养人信息</h3>
            <div class="lineSt"></div>
            <el-row class="button-group">
              <el-button type="primary"
                         icon="el-icon-plus"
                         size="mini"
                         @click="handleAddDetails('tableData2')">
                新增</el-button>
              <el-button type="danger"
                         icon="el-icon-delete"
                         size="mini"
                         @click="handleDelDetails('tableData2')">
                删除</el-button>
            </el-row>
            <el-table :data="tableData2"
                      border
                      :row-class-name="rowClassName"
                      @selection-change="handleFamilyData2"
                      empty-text='空'
                      class="my-table">
              <el-table-column type="selection"
                               width="40"
                               align="center" />
              <el-table-column prop="abm_ex3"
                               label="姓名"
                               min-width="110">
                <template slot-scope="scope">
                  <el-input v-model="tableData2[scope.row.xh-1].abm_ex3"
                            @change="keyVerification2(scope.$index,scope.row,'f2.abm_ex3')"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="abm_ex1"
                               label="赡(扶、抚)养关系"
                               min-width="150">
                <template slot-scope="scope">
                  <el-select v-model="tableData2[scope.row.xh-1].abm_ex1">
                    <el-option label="请选择"
                               value=""></el-option>
                    <el-option label="户主"
                               value="户主"></el-option>
                    <el-option label="配偶"
                               value="配偶"></el-option>
                    <el-option label="子/婿"
                               value="子/婿"></el-option>
                    <el-option label="女/媳"
                               value="女/媳"></el-option>
                    <el-option label="(外)孙子女"
                               value="(外)孙子女"></el-option>
                    <el-option label="父母/岳父母/公婆"
                               value="父母/岳父母/公婆"></el-option>
                    <el-option label="(外)祖父母"
                               value="(外)祖父母"></el-option>
                    <el-option label="兄弟姐妹"
                               value="兄弟姐妹"></el-option>
                    <el-option label="其他"
                               value="其他"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="abm_ex2"
                               label="身份证号码"
                               min-width="190">
                <template slot-scope="scope">
                  <el-input v-model="tableData2[scope.row.xh-1].abm_ex2"
                            @change="changeCard2(scope.$index,scope.row)"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="abm_ex11"
                               label="健康状况"
                               min-width="110">
                <template slot-scope="scope">
                  <el-select v-model="tableData2[scope.row.xh-1].abm_ex11">
                    <el-option label="请选择"
                               value=""></el-option>
                    <el-option label="健康"
                               value="健康"></el-option>
                    <el-option label="重病"
                               value="重病"></el-option>
                    <el-option label="重残"
                               value="重残"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="abm_ex49"
                               label="劳动能力"
                               min-width="160">
                <template slot-scope="scope">
                  <el-select v-model="tableData2[scope.row.xh-1].abm_ex49">
                    <el-option label="请选择"
                               value=""></el-option>
                    <el-option label="有劳动能力"
                               value="有劳动能力"></el-option>
                    <el-option label="部分丧失劳动能力"
                               value="部分丧失劳动能力"></el-option>
                    <el-option label="完全丧失劳动能力"
                               value="完全丧失劳动能力"></el-option>
                    <el-option label="无劳动能力"
                               value="无劳动能力"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="abm_ex21"
                               label="家庭主要财产状况(房、车、金融资产)"
                               min-width="220">
                <template slot-scope="scope">
                  <el-input v-model="tableData2[scope.row.xh-1].abm_ex21"
                            @change="changeCard2(scope.$index,scope.row,'f2.abm_ex2')"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="abm_ex15"
                               label="工作单位"
                               min-width="200">
                <template slot-scope="scope">
                  <el-input v-model="tableData2[scope.row.xh-1].abm_ex15"
                            @change="keyVerification2(scope.$index,scope.row,'f2.abm_ex15')"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="abm_ex20"
                               label="家庭人口"
                               min-width="120">
                <template slot-scope="scope">
                  <el-input v-model="tableData2[scope.row.xh-1].abm_ex20"
                            @change="keyVerification2(scope.$index,scope.row,'f2.abm_ex20')"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="abm_ex17"
                               label="家庭人均月收入"
                               min-width="100">
                <template slot-scope="scope">
                  <el-input v-model="tableData2[scope.row.xh-1].abm_ex17"
                            @change="keyVerification2(scope.$index,scope.row,'f2.abm_ex17')"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="abm_ex18"
                               label="月赡(扶、抚)养费"
                               min-width="130"
                               @change="keyVerification2(scope.$index,scope.row,'f2.abm_ex18')">
                <template slot-scope="scope">
                  <el-input v-model="tableData2[scope.row.xh-1].abm_ex18"></el-input>
                </template>
              </el-table-column>
            </el-table>

            <h3 class="line_blue"
                style="margin-top:20px">&emsp;家庭前12个月收入情况</h3>
            <div class="lineSt"></div>
            <div>
              <el-row class="button-group">
                <el-button type="primary"
                           icon="el-icon-plus"
                           size="mini"
                           @click="handleAddDetails('income1')">新增</el-button>
                <el-button type="danger"
                           icon="el-icon-delete"
                           size="mini"
                           @click="handleDelDetails('income1')">删除</el-button>
              </el-row>
              <el-table :data="income1"
                        border
                        :row-class-name="rowClassName"
                        @selection-change="handleIncome1"
                        empty-text='空'
                        class="my-table">
                <el-table-column label="工资性收入(年)"
                                 align="center">
                  <el-table-column type="selection"
                                   min-width="40"
                                   align="center" />
                  <el-table-column label="计入收入名称"
                                   prop="abi_ex1"
                                   min-width="145">

                    <template slot-scope="scope">
                      <el-select v-model="income1[scope.row.xh-1].abi_ex1"
                                 class="srname">
                        <el-option label="请选择收入名称"
                                   value=""></el-option>
                        <el-option label="工资"
                                   value="工资"></el-option>
                        <el-option label="奖金"
                                   value="奖金"></el-option>
                        <el-option label="津贴"
                                   value="津贴"></el-option>
                        <el-option label="补贴"
                                   value="补贴"></el-option>
                        <el-option label="福利"
                                   value="福利"></el-option>
                        <el-option label="其他劳动收入"
                                   value="其他劳动收入"></el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column label="金额"
                                   prop="abi_ex2"
                                   min-width="145">
                    <template slot-scope="scope">
                      <el-input v-model="income1[scope.row.xh-1].abi_ex2"
                                class="srname"
                                @change="changeAmt(scope.$index,scope.row,'ico1.abi_ex2')"></el-input>
                    </template>
                  </el-table-column>
                </el-table-column>

              </el-table>
            </div>
            <div style="margin-top:20px">
              <el-table :data="income2"
                        border
                        :row-class-name="rowClassName"
                        @selection-change="handleIncome2"
                        empty-text='空'
                        class="my-table">
                <el-table-column label="经营性收入(年)"
                                 align="center">
                  <el-table-column label="计入收入名称"
                                   prop="abi_ex1"
                                   min-width="160">
                    <template slot-scope="scope">
                      <el-input :value="income2[scope.row.xh-1].abi_ex1"
                                class="srname"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="金额"
                                   prop="abi_ex2"
                                   min-width="145">
                    <template slot-scope="scope">
                      <el-input v-model="income2[scope.row.xh-1].abi_ex2"
                                class="srname"
                                @change="changeAmt(scope.$index,scope.row,'ico2.abi_ex2')"></el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
              </el-table>
            </div>
            <div>
              <el-row class="button-group"
                      style="margin-top:20px">
                <el-button type="primary"
                           icon="el-icon-plus"
                           size="mini"
                           @click="handleAddDetails('income3')">新增</el-button>
                <el-button type="danger"
                           icon="el-icon-delete"
                           size="mini"
                           @click="handleDelDetails('income3')">删除</el-button>
              </el-row>
              <el-table :data="income3"
                        border
                        :row-class-name="rowClassName"
                        @selection-change="handleIncome3"
                        empty-text='空'
                        class="my-table">
                <el-table-column label="财产性收入(年)"
                                 align="center">
                  <el-table-column type="selection"
                                   min-width="40"
                                   align="center" />
                  <el-table-column label="计入收入名称"
                                   prop="abi_ex1"
                                   min-width="145">
                    <!-- <template slot-scope="scope">
											<el-input v-model="income3[scope.row.xh-1].abi_ex1"></el-input>
										</template> -->
                    <template slot-scope="scope">
                      <el-select v-model="income3[scope.row.xh-1].abi_ex1"
                                 class="srname">
                        <el-option label="请选择收入名称"
                                   value=""></el-option>
                        <el-option label="土地和房屋出租收入"
                                   value="土地和房屋出租收入"></el-option>
                        <el-option label="存款及利息"
                                   value="存款及利息"></el-option>
                        <el-option label="有价证券及红利"
                                   value="有价证券及红利"></el-option>
                        <el-option label="其他投资收入"
                                   value="其他投资收入"></el-option>
                        <el-option label="知识产权收入"
                                   value="知识产权收入"></el-option>
                        <el-option label="财产变卖收入"
                                   value="财产变卖收入"></el-option>
                        <el-option label="其他财产性收入"
                                   value="其他财产性收入"></el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column label="金额"
                                   prop="abi_ex2"
                                   min-width="145">
                    <template slot-scope="scope">
                      <el-input v-model="income3[scope.row.xh-1].abi_ex2"
                                class="srname"
                                @change="changeAmt(scope.$index,scope.row,'ico3.abi_ex2')"></el-input>
                    </template>
                  </el-table-column>
                </el-table-column>

              </el-table>
            </div>
            <div>
              <el-row class="button-group"
                      style="margin-top:20px">
                <el-button type="primary"
                           icon="el-icon-plus"
                           size="mini"
                           @click="handleAddDetails('income4')">新增</el-button>
                <el-button type="danger"
                           icon="el-icon-delete"
                           size="mini"
                           @click="handleDelDetails('income4')">删除</el-button>
              </el-row>
              <el-table :data="income4"
                        border
                        :row-class-name="rowClassName"
                        @selection-change="handleIncome4"
                        empty-text='空'
                        class="my-table">
                <el-table-column label="转移净收入(年)"
                                 align="center">
                  <el-table-column type="selection"
                                   min-width="40"
                                   align="center" />
                  <el-table-column label="计入收入名称"
                                   prop="abi_ex1"
                                   min-width="145">
                    <!-- <template slot-scope="scope">
											<el-input v-model="income4[scope.row.xh-1].abi_ex1"></el-input>
										</template> -->
                    <template slot-scope="scope">
                      <el-select v-model="income4[scope.row.xh-1].abi_ex1"
                                 class="srname"
                                 style="text-align:center">
                        <el-option label="请选择收入名称"
                                   value=""></el-option>
                        <el-option label="养老金或离退休金"
                                   value="养老金或离退休金"></el-option>
                        <el-option label="基本生活费"
                                   value="基本生活费"></el-option>
                        <el-option label="失业保险金"
                                   value="失业保险金"></el-option>
                        <el-option label="保险收入"
                                   value="保险收入"></el-option>
                        <el-option label="赔偿收入"
                                   value="赔偿收入"></el-option>
                        <el-option label="捐赠收入"
                                   value="捐赠收入"></el-option>
                        <el-option label="遗产收入"
                                   value="遗产收入"></el-option>
                        <el-option label="赡(扶、抚)养收入"
                                   value="赡(扶、抚)养收入"></el-option>
                        <el-option label="一次性安置费和经济补偿金"
                                   value="一次性安置费和经济补偿金"></el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column label="金额"
                                   prop="abi_ex2"
                                   min-width="145">
                    <template slot-scope="scope">
                      <el-input v-model="income4[scope.row.xh-1].abi_ex2"
                                class="srname"
                                @change="changeAmt(scope.$index,scope.row,'ico4.abi_ex2')"></el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
              </el-table>
            </div>
            <div style="margin-top:20px">
              <el-table :data="income5"
                        border
                        :row-class-name="rowClassName"
                        empty-text='空'
                        class="my-table">
                <el-table-column label="其他收入(年)"
                                 align="center">
                  <el-table-column label="计入收入名称"
                                   prop="abi_ex1"
                                   min-width="160">
                    <template slot-scope="scope">
                      <el-input :value="income5[scope.row.xh-1].abi_ex1"
                                class="srname"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="金额"
                                   prop="abi_ex2"
                                   min-width="145">
                    <template slot-scope="scope">
                      <el-input v-model="income5[scope.row.xh-1].abi_ex2"
                                class="srname"
                                @change="changeAmt(scope.$index,scope.row,'ico5.abi_ex2')"></el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
              </el-table>
            </div>
            <div style="margin-top:20px">
              <el-table :data="income6"
                        border
                        :row-class-name="rowClassName"
                        empty-text='空'
                        class="my-table">
                <el-table-column label="必要就业成本抵扣"
                                 align="center">
                  <el-table-column label="计入收入名称"
                                   prop="abi_ex1"
                                   min-width="160">
                    <template slot-scope="scope">
                      <el-input :value="income6[scope.row.xh-1].abi_ex1"
                                class="srname"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="金额"
                                   prop="abi_ex2"
                                   min-width="145">
                    <template slot-scope="scope">
                      <el-input v-model="income6[scope.row.xh-1].abi_ex2"
                                class="srname"
                                @change="changeAmt(scope.$index,scope.row,'ico6.abi_ex2')"></el-input>
                    </template>
                  </el-table-column>
                </el-table-column>

              </el-table>
            </div>
            <div style="margin-top:20px">
              <el-table :data="income7"
                        border
                        :row-class-name="rowClassName"
                        empty-text='空'
                        class="my-table">
                <el-table-column label="总收入"
                                 align="center">
                  <el-table-column label="计入收入名称"
                                   prop="abi_ex1"
                                   min-width="160">
                    <template slot-scope="scope">
                      <el-input :value="income7[scope.row.xh-1].abi_ex1"
                                class="srname"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="金额"
                                   prop="abi_ex2"
                                   min-width="145">
                    <template slot-scope="scope">
                      <el-input v-model="income7[scope.row.xh-1].abi_ex2"
                                class="srname"
                                readonly
                                @change="changeAmt(scope.$index,scope.row,'ico7.abi_ex2')"></el-input>
                    </template>
                  </el-table-column>

                </el-table-column>

              </el-table>
            </div>

            <h3 class="line_blue"
                style="margin-top:20px">&emsp;家庭前12个月支出情况</h3>
            <div class="lineSt"></div>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="医疗支出"
                              prop="abp_ex4"
                              label-width="200px">
                  <el-input style="outline:none"
                            v-model="pay.abp_ex4"
                            placeholder="请输入医疗支出"
                            @change="changeAmt3(pay.abp_ex4,'pay.abp_ex4')"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="教育支出"
                              prop="abp_ex5"
                              label-width="200px">
                  <el-input v-model="pay.abp_ex5"
                            placeholder="请输入教育支出"
                            @change="changeAmt3(pay.abp_ex5,'pay.abp_ex5')">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="残疾康复费用支出"
                              prop="abp_ex6"
                              label-width="200px">
                  <el-input v-model="pay.abp_ex6"
                            placeholder="请输入残疾康复费用支出"
                            @change="changeAmt3(pay.abp_ex6,'pay.abp_ex6')"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="因灾、因意外事故费用支出"
                              prop="abp_ex11"
                              label-width="200px">
                  <el-input v-model="pay.abp_ex11"
                            placeholder="请输入因灾、因意外事故费用支出"
                            @change="changeAmt3(pay.abp_ex11,'pay.abp_ex11')"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="其他支出"
                              prop="abp_ex7"
                              label-width="200px">
                  <el-input v-model="pay.abp_ex7"
                            placeholder="请输入其他支出"
                            @change="changeAmt3(pay.abp_ex7,'pay.abp_ex7')"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="家庭总支出"
                              prop="abp_ex8"
                              label-width="200px">
                  <el-input v-model="pay.abp_ex8"
                            placeholder="请输入家庭总支出"
                            @change="changeAmt3(pay.abp_ex8,'pay.abp_ex8')"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="扣减刚性支出后家庭年收入"
                              prop="abp_ex9"
                              label-width="200px">
                  <el-input v-model="pay.abp_ex9"
                            placeholder="请输入扣减刚性支出后家庭年收入"
                            @change="changeAmt3(pay.abp_ex9,'pay.abp_ex9')">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="扣减刚性支出后人均年收入"
                              prop="abp_ex10"
                              label-width="200px">
                  <el-input v-model="pay.abp_ex10"
                            placeholder="扣减刚性支出后人均年收入"
                            @change="changeAmt3(pay.abp_ex10,'pay.abp_ex10')"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <h3 class="line_blue"
                style="margin-top:20px">&emsp;身份证及其他证明材料上传</h3>
            <div class="lineSt"></div>
            <div id="recordt">
              <el-row :gutter="20">
                <el-col :span="12"
                        class="my-col">
                  <el-card class="box-card">
                    <div slot="header"
                         class="clearfix">
                      <el-button style="float: left; padding: 3px 0"
                                 type="text"
                                 @click="handleRemove(imgArr,'ab_ex10')">
                        删除</el-button>
                      <span>身份证拍照(正反面)(<span style='color:red'>{{imgNum.ab_ex10_len}}</span>)</span>
                      <el-button style="float: right; padding: 3px 0"
                                 type="text"
                                 @click="uploads('ab_ex10', 'dibaoForm')">上传</el-button>
                    </div>
                    <div class="block">
                      <image-view :imgList="imgArr.ab_ex10_len"
                                  id="ab_ex10"
                                  @Imgindex='getImgIndex'></image-view>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
              <el-row :gutter="20"
                      style='margin-top:10px'>
                <!--  -->
              </el-row>
            </div>

            <div slot="footer"
                 class="dialog-footer">
              <el-button @click="notSave">取 消</el-button>
              <el-button type="primary"
                         @click="saveZB(auditValue)"
                         :disabled='saveDisabled'>确 定</el-button>
            </div>
          </el-dialog>

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
                <div style="line-height: 30px;text-align:center">审核意见</div>
              </el-col>
              <el-col :span="6">
                <el-select @change="changeSh("
                           change")"
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
              <el-col :span="6">
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
              <el-col :span="22">
                <el-input type="textarea"
                          autosize
                          v-model.trim="auditValue.ab_ex25"></el-input>
              </el-col>
            </el-row>
            <br>
            <el-row style="margin-top: 10px;"
                    type="flex"
                    justify="center">
              <el-col :span="24"
                      style="text-align: center;">
                <el-button type="primary"
                           @click="save(auditValue)"
                           :disabled="saveDisabled">保存</el-button>
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
                <div style="line-height: 30px;text-align:center"><span style="color:red"> * </span>公示结果</div>
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
                <div style="line-height: 30px;text-align:center"><span style="color:red"> * </span>公示地点</div>
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
                      style="line-height: 30px;text-align:center"
                      v-if="['无异议','有异议通过',''].includes(publicity.ab_ex34)">
                <div>备注</div>
              </el-col>
              <el-col :span="14"
                      v-if="['无异议','有异议通过',''].includes(publicity.ab_ex34)">
                <el-input type="textarea"
                          autosize
                          v-model.trim="publicity.ab_ex35"></el-input>
              </el-col>
              <el-col :span="2"
                      style="line-height: 30px;text-align:center"
                      v-if="publicity.ab_ex34 == '退回'|| publicity.ab_ex34 == '有异议退回'">
                <div><span style="color:red"> * </span>退回原因</div>
              </el-col>
              <el-col :span="6"
                      v-if="publicity.ab_ex34 == '退回'|| publicity.ab_ex34 == '有异议退回'">
                <el-select @change="changeSh"
                           v-model.trim="auditValue.ab_ex35"
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

            <!--    退回    -->
            <div v-if="publicity.ab_ex34 == '退回'|| publicity.ab_ex34 == '有异议退回'">
              <!-- <el-row style="margin-top: 10px;">
									
								</el-row> -->
              <el-row style="margin-top: 10px;text-align:center"
                      type="flex"
                      justify="center">
                <el-col :span="2"
                        style="line-height:30px;">
                  <div>退回描述</div>
                </el-col>
                <el-col :span="22">
                  <el-input type="textarea"
                            :rows='4'
                            :disabled="auditValue.ab_ex35!='其他'"
                            v-model="auditValue.ab_ex178"></el-input>
                </el-col>
              </el-row>
            </div>

            <el-row :gutter="20"
                    style="margin-top: 10px;">
              <el-col :span="12">
                <el-card class="box-card">
                  <div slot="header"
                       style="text-align:center"
                       class="clearfix">
                    <el-button style="float:left;padding:3px 0"
                               type="text"
                               @click="handleRemove(imgArr,'ab_ex98')">删除</el-button>
                    <span><span v-if="['无异议','有异议通过'].includes(publicity.ab_ex34) && ['','复核','新申请','迁移'].includes(publicity.ab_ex202) "
                            style="color:red"> * </span>公示图片(<span style='color:red'>{{imgNum.ab_ex98_len}}</span>)</span>
                    <el-button style="float: right; padding: 3px 0"
                               type="text"
                               @click="uploads('ab_ex98')">上传</el-button>

                  </div>
                  <div class="block">
                    <image-view :imgList="imgArr.ab_ex98_len"
                                @Imgindex='getImgIndex'
                                id="ab_ex98"></image-view>

                  </div>
                </el-card>
              </el-col>
              <el-col :span="12">
                <el-card class="box-card">
                  <div slot="header"
                       style="text-align:center"
                       class="clearfix">
                    <el-button style="float:left;padding:3px 0"
                               type="text"
                               @click="handleRemove(imgArr,'ab_ex97')">删除</el-button>
                    <span><span v-if="['有异议退回','有异议通过'].includes(publicity.ab_ex34)"
                            style="color:red"> * </span>民主评议(<span style='color:red'>{{imgNum.ab_ex97_len}}</span>)</span>
                    <el-button style="float: right; padding: 3px 0"
                               type="text"
                               @click="uploads('ab_ex97')">上传</el-button>
                  </div>
                  <div class="block">
                    <image-view :imgList="imgArr.ab_ex97_len"
                                @Imgindex='getImgIndex'
                                id="ab_ex97"></image-view>
                  </div>
                </el-card>
              </el-col>
            </el-row>

            <el-row :gutter="20"
                    style="margin-top: 10px;"
                    v-if="publicity.ab_ex34 == '退回'|| publicity.ab_ex34 == '有异议退回'">
              <el-col :span="12">
                <el-card class="box-card">
                  <div slot="header"
                       style="text-align:center"
                       class="clearfix">
                    <el-button style="float:left;padding:3px 0"
                               type="text"
                               @click="handleRemove(imgArr,'ab_ex175')">删除</el-button>
                    <span><span style="color:red"
                            v-if="auditValue.ab_ex202=='' && this.must"> * </span>退回材料(<span style='color:red'>{{imgNum.ab_ex175_len}}</span>)</span>
                    <el-button style="float:right;padding:3px 0"
                               type="text"
                               @click="uploads('ab_ex175')">上传</el-button>
                  </div>
                  <div class="block">
                    <image-view :imgList="imgArr.ab_ex175_len"
                                @Imgindex='getImgIndex'
                                id="ab_ex175"></image-view>
                  </div>
                </el-card>
              </el-col>
            </el-row>
            <!-- <el-row style="margin-top: 10px;">
							</el-row> -->
            <br>
            <el-row style="margin-top: 10px;"
                    type="flex"
                    justify="center">
              <el-col :span="24"
                      style="text-align: center;">
                <el-button type="primary"
                           @click="save2(publicity)"
                           :disabled="saveDisabled">保存</el-button>
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
                <div style="line-height: 30px;text-align:center"><span style="color:red"> * </span>审批意见</div>
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
                <div style="line-height: 30px;text-align:center"><span style="color:red"> * </span>审批人</div>
              </el-col>
              <el-col :span="6">
                <el-input v-model="approval.ab_ex20"></el-input>
              </el-col>
              <el-col :span="2"
                      style="line-height: 30px;text-align:center;">
                <div><span style="color:red"> * </span>审批时间</div>
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
                      style="line-height: 30px;text-align:center"
                      v-if="approval.ab_ex21!='退回'">
                <div v-if="this.approval.ab_ex21=='驳回'"><span style="color:red;"> * </span> 驳回原因</div>
                <div v-else>备注</div>
              </el-col>
              <el-col :span="22"
                      v-if="approval.ab_ex21!='退回'">
                <el-input type="textarea"
                          autosize
                          v-model="approval.ab_ex26"></el-input>
              </el-col>
            </el-row>

            <!--    退回    -->
            <div v-if="approval.ab_ex21=='退回'">
              <el-row style="margin-top: 10px;">
                <el-col :span="2"
                        style="line-height: 30px;text-align:center">
                  <div><span style="color:red"> * </span> 退回原因</div>
                </el-col>
                <el-col :span="6">
                  <el-select @change="changeSh"
                             v-model="auditValue.ab_ex26"
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
                            :disabled="auditValue.ab_ex26!='其他'"
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
                      <el-button style="float:left;padding:3px 0"
                                 type="text"
                                 @click="handleRemove(imgArr,'ab_ex175')">删除</el-button>
                      <span>
                        <span style="color:red"
                              v-if="auditValue.ab_ex202=='' && this.must"> * </span>
                        退回材料(<span style='color:red'>{{imgNum.ab_ex175_len}}</span>)
                      </span>
                      <el-button style="float:right;padding:3px 0"
                                 type="text"
                                 @click="uploads('ab_ex175')">上传</el-button>
                    </div>
                    <div class="block">
                      <image-view :imgList="imgArr.ab_ex175_len"
                                  @Imgindex='getImgIndex'
                                  id="ab_ex175"></image-view>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
              <br>
            </div>

            <el-row style="margin-top: 10px;"
                    type="flex"
                    justify="center">
              <el-col :span="24"
                      style="text-align: center;">
                <el-button type="primary"
                           @click="checkRepeat()"
                           :disabled="saveDisabled">保存</el-button>
                <!-- <el-button type="success" @click="value1=true">待遇微调</el-button> -->
              </el-col>
            </el-row>
          </div>

          <!-- 待遇微调 -->
          <!-- <template v-if="this.approval.ab_ex13=='特困供养' && this.type != 'sp'"> -->
          <!-- <el-dialog  :visible.sync="value1" 	width="80%">
							
							<el-row v-if="this.value1==true">
								<el-col :span="2" style="line-height: 30px;text-align:center" >
									
									<div>种类选择：</div>
								</el-col>
								<el-col :span="3" v-if="this.value1==true">
									<el-select v-model="value2" placeholder="请选择">
										<el-option key="未成年" label="未成年" value="未成年"></el-option>
										<el-option key="老年人" label="老年人" value="老年人"></el-option>
										<el-option key="独居者" label="独居者" value="独居者"></el-option>
										<el-option key="退役军人" label="退役军人" value="退役军人"></el-option>
										<el-option key="归侨" label="归侨" value="归侨"></el-option>
									</el-select>
								</el-col>
								<el-col :offset="1" :span="2" >
									<div>金额调整：</div>
								</el-col>
								<el-col style="margin-left:10px;" :span="3">
									<el-input  v-model="approval.ab_ex26" placeholder="请输入调整后金额"></el-input>
								</el-col>
							</el-row>
						</el-dialog> -->
          <!-- </template> -->

          <!-- 审核汇总表 -->
          <!-- <div v-if=" this.approval.ab_ex15 == '审批'">
						<el-table v-if="this.type != 'sp'" :data="[basicInf]" border style="width: 100%;margin-bottom: 20px;">
							<el-table-column prop="ab_ex13" label="救助类别" min-width="100"></el-table-column>
							<el-table-column prop="ab_ex3"  label="申请人"   min-width="100"></el-table-column>
							<el-table-column prop="ab_ex40" label="家庭月保障金额（元）" min-width="180"></el-table-column>
							<el-table-column label="详情" min-width="180" v-if="['低保','特困供养',''].includes(publicity.ab_ex13)">
								<template slot-scope="scope">
									<el-button @click="moneyDetail(scope.row)" type="text" size="small">明细</el-button>
								</template>
							</el-table-column>
						</el-table>
					</div><br> -->

          <template v-if="this.basicInf.ab_ex15=='办结' && ['特困供养'].includes(publicity.ab_ex13)">
            <h3 class="line_blue"
                id="page25"
                style="margin-top: 20px;">&emsp;第三方特困自理能力复核信息</h3>

            <div class="lineSt"></div>
            <div style="position: relative;">
              <el-table :data="this.tableData"
                        border
                        style="width: 100% ; margin-bottom: 20px;">
                <el-table-column prop="abm_ex3"
                                 label="被评估人"
                                 min-width="100"></el-table-column>
                <el-table-column prop="abm_ex1"
                                 label="与户主关系"
                                 min-width="100"></el-table-column>
                <el-table-column label="复核结果"
                                 min-width="180">

                  <template slot-scope="scope">
                    <el-button @click="openPGJG(scope.row.abm_ex78)"
                               type="text"
                               size="small">明细</el-button>
                  </template>
                </el-table-column>
                <el-table-column label="自理评估表PDF列表"
                                 min-width="180">
                  <template slot-scope="scope">
                    <el-button @click="openPGPDF(scope.row.abm_id)"
                               type="text"
                               size="small">{{detailShow3 ? '关闭' : '查看'}}</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <!-- 自理复核结果PDF列表 -->
              <div style="position: absolute;right:560px">
                <el-popover v-show="detailShow3"
                            placement="bottom"
                            width="560"
                            v-model="detailShow3">
                  <el-table :data="pgjgPDFList"
                            border
                            @row-click="getPDF">
                    <el-table-column property="aer_ex4"
                                     label="姓名"></el-table-column>
                    <el-table-column property="aer_dat3"
                                     label="生成时间"></el-table-column>
                  </el-table>
                </el-popover>
              </div>

            </div><br>
          </template>

          <template v-if="this.approval.ab_ex13=='特困供养' && this.type != 'cs'">
            <h3 class="line_blue"
                style='margin-top:15px'
                id="page22">&emsp;特困信息补充</h3>
            <div class="lineSt"></div>
            <div class="top_1">
              <table class="top_2">
                <tr style="height:40px;">
                  <td style="width:10%; padding: 0px 0px 0px 10px;">特困供养方式: </td>
                  <td style="width:20%;">{{approval.ab_ex71}}</td>
                  <td style="width:10%; padding: 0px 0px 0px 10px;">护理费（元/人）:</td>
                  <td style="width:20%;">{{approval.ab_ex199}}</td>
                  <td style="width:10%; padding: 0px 0px 0px 10px;">供养机构:</td>
                  <td style="width:20%;">{{approval.ab_ex195}}</td>
                </tr>
                <tr style="height:40px;">
                  <td style="width:10%; padding: 0px 0px 0px 10px;">生活自理能力: </td>
                  <td style="width:20%;">{{approval.ab_ex198}}</td>
                  <td style="width:10%; padding: 0px 0px 0px 10px;">生活费（元/人）:</td>
                  <td style="width:20%;">{{approval.ab_ex200}}</td>
                </tr>
              </table>
              <el-row :gutter="20"
                      style='margin-top:10px'>
                <el-col :span="12">
                  <el-card class="box-card">
                    <div slot="header"
                         class="clearfix">
                      <span>自理能力状况评估报告(<span style='color:red'>{{imgNum.ab_ex196_len}}</span>)</span>
                    </div>
                    <image-view v-if="this.imgArr.ab_ex196_len"
                                :imgList="this.imgArr.ab_ex196_len"
                                height="150px"
                                width="150px"></image-view>
                  </el-card>
                </el-col>
                <el-col :span="12">
                  <el-card class="box-card">
                    <div slot="header"
                         class="clearfix">
                      <span>集中供养意愿书(<span style='color:red'>{{imgNum.ab_ex197_len}}</span>)</span>
                    </div>
                    <image-view v-if="this.imgArr.ab_ex197_len"
                                :imgList="this.imgArr.ab_ex197_len"
                                height="150px"
                                width="150px"></image-view>
                  </el-card>
                </el-col>
              </el-row>
            </div>
          </template>

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
                    <td style="color:#899197"
                        v-if="(itemR.ar_ex4).indexOf('标准调整')==-1">处理结果：</td>
                    <td rowspan="2"
                        style="text-align:left"
                        v-if="(itemR.ar_ex4).indexOf('标准调整')==-1">
                      <img v-if="itemR.ar_ex3 == '同意'||itemR.ar_ex3 =='无异议' ||itemR.ar_ex3.indexOf('通过')!=-1 "
                           src="@/assets/img/auditStatus/agree.png"
                           style="width:100px">
                      <img v-else-if="itemR.ar_ex3 =='驳回'"
                           src="@/assets/img/auditStatus/return2.png"
                           style="width:100px">
                      <img v-else
                           src="@/assets/img/auditStatus/return.png"
                           style="width:100px">
                    </td>
                  </tr>
                  <tr v-if="(itemR.ar_ex4).indexOf('标准调整')==-1">
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
                    <td style="color:#899197;height:30px">处理意见：</td>
                    <td colspan="4">{{itemR.ar_ex2}}</td>
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
          <!-- <el-button type="danger"  @click="showMoneyDetail">保障金</el-button> -->
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
                @click="isShow(13)">
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
            <!-- <li :class="{listStyle:isShow23}" @click="isShow(23)" v-if="this.showChildren" style="height:25px">
							<a class="ainfoFont" :class="{listStyleA:!isShow23}"  @click="counter('#page23')">儿童预警</a>
						</li> -->
            <li :class="{listStyle:isShow24}"
                @click="isShow(24)"
                style="height:25px">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow24}"
                 @click="counter('#page24')">汇总表</a>
            </li>
            <!-- <li :class="{listStyle:isShow24}" @click="isShow(25)" style="height:25px">
							<a class="ainfoFont" :class="{listStyleA:!isShow24}"  @click="counter('#page24')">汇总表</a>
						</li> -->

            <li :class="{listStyle:isShow22}"
                @click="isShow(22)"
                v-if="basicInf.ab_ex13=='特困供养'"
                style="height:25px">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow22}"
                 @click="counter('#page22')">特困信息补充</a>
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
                 @click="counter('#page10')">审批记录</a>
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
        </span>
      </el-dialog>

      <el-dialog title="重复预警提醒"
                 :visible.sync="repeatDialogShow"
                 width="1100px"
                 append-to-body>
        <div style="width: 100%;height: 500px;overflow-x: hidden; overflow-y: auto">
          <repeatWarnView :showTitle=false
                          v-if="',申请,退回,'.indexOf(',' + basicInf.ab_ex15 + ',') == -1"></repeatWarnView>
        </div>
        <div style="color:red;">以上在保人员已有救助办结，无法重复享受救助，请将本数据进行退回，或将办结数据注销后进行审批操作！</div>
        <span slot="footer"
              class="dialog-footer">
          <el-button type="danger"
                     @click="saveRepeatBack"
                     style="margin-right: 10px">退回</el-button>
          <el-button type="primary"
                     @click="saveRepeatContinue"
                     style="margin-right: 10px">继续</el-button>
          <el-button @click="repeatDialogShow = false">关闭</el-button>
        </span>
      </el-dialog>

      <!-- 明细表 -->
      <el-dialog title="家庭月保障金额明细"
                 :visible.sync="detailShow"
                 top='30vh'
                 center>
        <el-table :data="detailTable"
                  border>
          <el-table-column property="abd_ex1"
                           label="姓名"></el-table-column>
          <el-table-column property="abd_ex2"
                           label="成员关系"></el-table-column>
          <el-table-column property="abd_ex3"
                           label="救助标准"></el-table-column>
          <el-table-column property="abd_ex10"
                           label="救助类型"></el-table-column>
          <el-table-column property="abd_ex5"
                           v-if="approval.ab_ex13=='特困供养' && ['审批','办结'].includes(approval.ab_ex15)"
                           label="生活费"></el-table-column>
          <el-table-column property="abd_ex6"
                           v-if="approval.ab_ex13=='特困供养' && ['审批','办结'].includes(approval.ab_ex15)"
                           label="护理费"></el-table-column>
          <!-- <el-table-column property="abd_ex7" v-if="zfShow" label="增发类别"></el-table-column> -->
          <!-- <el-table-column property="abd_ex4" v-if="approval.ab_ex13!='特困供养'" label="救助金" width="120"></el-table-column> -->
          <!-- <el-table-column property="abd_ex8" v-if="zfShow" label="增发金额"></el-table-column> -->
          <!-- <el-table-column property="abd_ex9" label="保障金额"></el-table-column> -->
          <el-table-column property="abd_ex9"
                           label="救助金"></el-table-column>
        </el-table>
        <br>
        <hr><br>
        <div style="width:30%;margin:0 auto;">家庭月保障金合计为：<span style="color:red">{{basicInf.ab_ex40}}</span></div>
      </el-dialog>

      <!-- 自理复核结果表 -->
      <el-dialog title="自理复核结果"
                 :visible.sync="detailShow2"
                 top='30vh'
                 center>
        <el-table :data="pgjg"
                  border>
          <el-table-column property="aer_ex4"
                           label="特困人员"
                           width="100"></el-table-column>
          <el-table-column property="aer_ex15"
                           label="评估得分"
                           width="80"></el-table-column>
          <el-table-column property="aer_ex12"
                           label="复核结果"
                           width="100"></el-table-column>
          <el-table-column property="aer_dat3"
                           label="评估完成时间"
                           width="auto"></el-table-column>
          <el-table-column property="aer_ex31"
                           label="评估人员"
                           width="auto"></el-table-column>
          <el-table-column property="aer_ex32"
                           label="评估机构"
                           width="100"></el-table-column>
        </el-table>
      </el-dialog>

      <!-- <el-dialog title="自理能力评估报告" :visible.sync="dialogVisible5"  width="60%" z-index=1999>
				<div style="margin:0 auto;width:100%;height:522px;overflow:auto;">
				<el-image 
					style="dispaly:black;width:99%; text-align:center"
					v-if="this.dialogVisible5"  :z-index="2015"
					:src="this.pgjg_url" :preview-src-list="[this.pgjg_url]">
				</el-image>
				</div>
			</el-dialog> -->

      <el-dialog title="长期护理失能评估表"
                 :visible.sync="dialogVisible5"
                 id="pdfbox"
                 width="80%"
                 height="85VH"
                 center>

        <iframe :src="pgjg_url"
                style="width: 100%; height: 74vh"
                id="iframe1"
                padding="0"
                frameborder="no"
                border="0"
                marginwidth="0"
                marginheight="0"></iframe>

      </el-dialog>
    </div>
  </div>
</template>
<script>
import request from '@/utils/request'
import imageView from '@/views/modules/assistance/imageView'
import upload from '@/views/modules/assistance/upload'
import repeatWarnView from '@/views/modules/assistance/qzsq/components/repeatWarnView.vue'
import { isName, isText, isFamilyNum, isNum, isCardID, isSpecialAccount } from '@/utils/until'
// import  baseURL from '@/utils/baseUrl'
export default {
  name: "dbListView",
  components: {
    imageView,
    upload,
    repeatWarnView //重复预警子组件
  },
  data () {
    return {
      jisuan: { //政策计算-计算元素
        familyNum: '',
        familyZC: '',
        familyZB: '',
        familyFD: '',
        familyAmt: '',
        familyZzc: '',
        familyChildrens: '',
      },
      jisuanShow: false, //计算器弹框显示-在这个页面没用
      kxsjz: ["儿童救助", "临时救助家庭", "特困人员供养", "支出性困难家庭", "单人保家庭", "低保边缘家庭", "最低生活保障-按人保",
        "最低生活保障-按户保", "最低生活保障-按人保-重病单人保", "最低生活保障-按人保-重残单人保"],

      jsjg: [], //救助类型 计算结果数组
      jsjgString: "", //计算结果
      jsjgshow1: false, //计算结果展示1
      jsjgshow2: true, //计算结果展示2

      dialogVisible3: false, //图片（材料）上传弹框
      repeatDialogShow: false, //重复预警弹框
      dialogChangeForm: false, //转办表单弹框
      uploadId: '',
      loading: false,
      value1: false, //待遇微调
      value2: '', //微调种类
      warningData: [], //自定义预警
      familyData: [], //做身份证重复验证用的
      saveDisabled: false, //保存禁用
      nation: [
        '汉族', '壮族', '满族', '回族', '苗族', '维吾尔族', '彝族', '土家族', '蒙古族', '藏族', '布依族',
        '哈尼族', '哈萨克族', '黎族', '傣族', '畲族', '傈僳族', '仡佬族', '朝鲜族', '白族', '侗族', '瑶族',
        '拉祜族', '高山族', '东乡族', '佤族', '水族', '纳西族', '羌族', '土族', '锡伯族', '仫佬族', '柯尔克孜族',
        '布朗族', '毛难族', '塔吉克族', '普米族', '阿昌族', '怒族', '达斡尔族', '景颇族', '撒拉族', '塔塔尔族', '赫哲族',
        '鄂温克族', '京族', '基诺族', '德昂族', '乌孜别克族', '俄罗斯族', '保安族', '裕固族', '门巴族', '鄂伦春族', '独龙族',
        '珞巴族', '僜人', '其他', '外国血统中国籍人士'
      ], //转办弹框共同民族选择
      tableData: [],   //共同生活成员信息
      tableData2: [],  //非共同生活赡抚养人信息
      tableData2_: [], //非共同生活赡抚养人家庭成员信息
      tableData3: [],  //车船信息
      tableData4: [],  //房屋信息
      tableData5: [], //已享受救助数据
      tableData6: [], //已享受救助数据
      tableData7: [], //近亲属

      // assistance: [],
      record: [], //审批记录
      // 收入
      income1: [{
        abi_ex1: "",
        abi_ex2: "",
        abi_ex3: "工资性收入",
        abi_ex4: "A",
        abi_ex5: ""
      }],
      income2: [{
        abi_ex1: "经营性净收入",
        abi_ex2: "",
        abi_ex3: "经营性净收入",
        abi_ex4: "B",
        abi_ex5: ""
      }],
      income3: [{
        abi_ex1: "",
        abi_ex2: "",
        abi_ex3: "财产净收入",
        abi_ex4: "C",
        abi_ex5: ""
      }],
      income4: [{
        abi_ex1: "",
        abi_ex2: "",
        abi_ex3: "转移净收入",
        abi_ex4: "D",
        abi_ex5: ""
      }],
      income5: [{
        abi_ex1: "其他收入",
        abi_ex2: "",
        abi_ex3: "其他收入",
        abi_ex4: "E",
        abi_ex5: ""
      }],
      income6: [{
        abi_ex1: "必要就业成本抵扣",
        abi_ex2: "",
        abi_ex3: "必要就业成本抵扣",
        abi_ex4: "F",
        abi_ex5: ""
      }],
      income7: [{
        abi_ex1: "总收入",
        abi_ex2: "",
        abi_ex3: "总收入",
        abi_ex4: "G",
        abi_ex5: ""
      }, {
        abi_ex1: "家庭月平均收入",
        abi_ex2: "",
        abi_ex3: "家庭月平均收入",
        abi_ex4: "G",
        abi_ex5: ""
      }, {
        abi_ex1: "家庭月人均收入",
        abi_ex2: "",
        abi_ex3: "家庭月人均收入",
        abi_ex4: "G",
        abi_ex5: ""
      }],
      // 对收入数据删除、新增操作用的数组
      checkedIncome1: [],
      checkedIncome2: [],
      checkedIncome3: [],
      checkedIncome4: [],
      checkedFamilyData1: [], //转办弹框共同
      checkedFamilyData2: [], //转办弹框非共同
      // 转办类型
      typeData: {
        ab_ex13: "",
        ab_ex41: ""
      },
      // 转办类型2
      ab_ex13: "",
      to_arb: true,
      flag: true,    // 跟公示有关
      auditValue: {},// 初审
      publicity: {}, // 公示
      approval: {},  // 审批
      ab_ex200: '',   // 输入的生活费
      tkStandard: '', // 特困救助标准
      dbStandard: '', // 低保救助标准
      zcStandard: '',	// 年人均可支配常数标准
      incomeConstant: (39701 / 12), // 月均可支配收入常数
      isHDBG: true,   // 是否有核对报告
      detailShow: false, // 详情列表展示

      detailShow2: false, // 自理复核结果展示
      detailShow3: false, // 自理复核结果PDF列表展示
      detailTable: [{ abd_ex9: '' }], // 救助金明细表
      childrenWarning: [], // 儿童预警数据
      showChildren: false,  // 儿童预警展示
      //审核 
      options: [{
        value: '同意',
        label: '同意',
      }, {
        value: '退回',
        label: '退回',
      }, {
        value: '退回重新核查',
        label: '退回重新核查',
      }],
      // 退回
      options1: [{
        value: '退回',
        label: '退回'
      }],
      // 公示
      options2: [{
        value: '无异议',
        label: '无异议'
      }, {
        value: '有异议通过',
        label: '有异议通过'
      }, {
        value: '有异议退回',
        label: '有异议退回'
      }, {
        value: '退回',
        label: '退回'
      }],
      // 审批
      options3: [{
        value: '同意',
        label: '同意'
      }, {
        value: '退回',
        label: '退回'
      }
        , {
        value: '驳回',
        label: '驳回',
      }
      ],

      // 必填验证
      rules: {
        ab_ex10: [{
          required: true,
          message: '身份证照片不能为空',
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
      isShow22: true,
      isShow23: true,
      isShow24: true,
      basicInf: {},   //展示数据

      imgNum: {},		//图片数量
      imgArr: { 		//图片数组
        ab_ex10_len: [],
        ab_ex97_len: [],
        ab_ex98_len: [],
        ab_ex175_len: [],
        ab_ex196_len: [],
        ab_ex197_len: [],
      },
      agentInfo: {//代理人信息
        "aba_ex1": "",
        "aba_ex2": "",
        "aba_ex3": "",
        "aba_ex4": "",
        "aba_ex5": "",
      },
      "landInfo": [], //山林
      pay: { //支出
        abp_ex4: '',
        abp_ex5: '',
        abp_ex6: '',
        abp_ex7: '',
        abp_ex8: '',
        abp_ex9: '',
        abp_ex10: '',
        abp_ex11: '',
      },
      sId: "", //本户的sid
      cId: "",
      type: "",
      checked: false, //转办复选框禁用
      disabled: true,  //转办类型单选框禁用
      arb: false,   //ab_ex41为xx--低保按人保，转办隐藏
      dbShow: true,   //低保
      tkShow: true,   //特困
      dsrShow: true,  //单人保家庭
      zcShow: true,   //支出
      isSave: true,   //是否可以保存
      isSave2: true,   //符合转办类型
      zfShow: true,  //保障金明细是否展示增发
      imgIndex: {    //图片索引
        ab_ex10: 0,
        ab_ex97: 0,
        ab_ex98: 0,
        ab_ex175: 0,
        ab_ex196: 0,
        ab_ex197: 0,
      },
      supportinstList: [],//供养机构列表
      old_abm_ex71: [],//老的儿童救助金 -- 2022.7.1提标后已取消

      pgjg: [{	//自理能力复核结果

        aer_ex4: '张三',
        aer_ex9: '70',
        aer_ex12: '中度依赖',
        aer_dat3: '2022-12-18 6:30:28',
        aer_ex13: '李四、王五',
        aer_ex14: '阳光评估机构',
      }],
      pgjgPDFList: [{//自理能力复核结果
        aer_ex4: '张三',
        aer_dat3: '2022-12-18 6:30:28',
      }],
      pgjg_url: '',//复核结果PDF路径

      dialogVisible5: false,  //评估图片弹框
      specialAccount: false,  //特殊账号验证
      must: false,
    }
  },

  created () {
    this.loadData();
  },

  mounted () {
    // 滚动鼠标右侧导航栏跟随滚动位置改变而改变显示
    // window.removeEventListener('scroll',this.scroll,false)
    window.addEventListener('scroll', this.scroll, true);
  },
  methods: {

    // 显示自理能力评估报告PDF
    getPDF (item) {

      var st = document.getElementById("pdfbox");
      // var st2 = document.getElementById("iframe1");
      st.children[0].style.marginTop = "6vh";
      st.style.padding = "0px";

      var aer_id = { aer_id: item.aer_id };

      // console.log(st.children[0].children[0].children[0].style.color="black");
      // console.log(st.children[0].children[0].style.fontWeight="600");

      // 拼接pdf请求路径
      var pingjie = "";
      pingjie = item.file_path + "/" + item.file_name;
      pingjie = "/social/minios/showPDF?filename=" + pingjie;

      console.log('显示自理能力评估报告PDF', item);
      //  接口
      if (item) {
        request({
          headers: {
            Accept: "application/json",
          },
          url: '/social/assistance/evaluationReportPrint',
          method: "post",
          data: aer_id,
        }).then((res) => {
          this.loading = false;
          this.src = "data:application/pdf;base64," + res;
          this.dialogVisible5 = true;
        }).catch((res) => {
          this.pgjg_url = "data:application/pdf;base64," + res.response.data;
          // this.pgjg_url = res.response.data;

          this.dialogVisible5 = true;
        });
      }
    },


    // 打开自理能力复核结果弹框
    openPGJG (data) {

      var sid = { abm_ex78: data };
      console.log(data, sid, 'openPGJG');
      if (data == '') {
        this.$alert('暂无复核结果');
      } else {

        return request({
          headers: {
            'Accept': 'application/json',

          },
          url: '/social/assistance/evaluationReportView',
          method: 'post',
          data: sid
        })
          .then()
          .catch((res) => {
            if (typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200) {
              // console.log('请求失败了-----------------------')
              this.$message.error('数据获取失败或请求超时')
              this.$emit("closes", false)
              this.$router.go(-1)
              return false
            }

            console.log(this.pgjg);
            if (res.response.data.length == 0) {

              this.$alert('暂无复核结果明细');

            } else {
              this.pgjg = res.response.data;
              this.detailShow2 = !this.detailShow2;
            }
            console.log('自理能力复核结果');

          })
      }
    },

    // 打开自理能力复核结果PDF列表弹框

    openPGPDF (data) {
      if (this.detailShow3) return this.detailShow3 = false
      var sid = { abm_id: data };
      console.log(data, sid, 'openPGJG');
      return request({
        headers: {
          'Accept': 'application/json',

        },
        url: '/social/assistance/evaluationReportList',
        // url: '/social/assistance/evaluationReportPrint',
        method: 'post',
        data: sid
      })
        .then()
        .catch((res) => {
          if (typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200) {
            // console.log('请求失败了-----------------------')
            this.$message.error('数据获取失败或请求超时')
            this.$emit("closes", false)
            this.$router.go(-1)
            return false
          }
          console.log(res.response.data, '复核结果列表');

          if (res.response.data.length == 0) {
            this.$alert('暂无复核结果pdf');
          } else {
            this.pgjgPDFList = res.response.data;
            this.detailShow3 = !this.detailShow3;

          }

        })

      // }
    },

    // 兴化儿童救助金修改--调标后已废弃
    changeChildrenMoney (abm_ex3) {
      //  var =[]
      //  for(let j in this.childrenWarning){
      // 	// if(this.detailTable[i].abd_ex1 == this.childrenWarning[j].abm_ex3){
      // 	// 	this.detailTable[i].abd_ex9 = this.childrenWarning[j].abm_ex71;
      // 	// 	this.tableData[i].abm_ex71 = this.childrenWarning[j].abm_ex71;
      // 	// 	this.tableData[i].abm_ex69 = this.childrenWarning[j].abm_ex71;
      // 	// 	this.tableData[i].abm_ex72 = 'Y';
      // 	// 	this.childrenWarning[j].abm_ex72 = 'Y';
      // 	// 	this.childrenWarning[j].abm_ex70 = '0';
      // 	// }
      // 	
      // }

      console.log('old_abm_ex71', this.old_abm_ex71);
      console.log('abm_ex3', abm_ex3);

      this.$confirm('是否要修改未成年人救助金额', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(res => {
        console.log('确认修改儿童资金 前----------------',);
        var sum = 0;
        this.showMoneyDetail(this.basicInf);
        for (let i in this.detailTable) {
          for (let j in this.childrenWarning) {
            if (this.detailTable[i].abd_ex1 == this.childrenWarning[j].abm_ex3) {
              this.detailTable[i].abd_ex9 = this.childrenWarning[j].abm_ex71;
              this.tableData[i].abm_ex71 = this.childrenWarning[j].abm_ex71;
              this.tableData[i].abm_ex69 = this.childrenWarning[j].abm_ex71;
              this.old_abm_ex71[j] = this.childrenWarning[j].abm_ex71
              this.tableData[i].abm_ex72 = 'Y';
              this.childrenWarning[j].abm_ex72 = 'Y';
              this.childrenWarning[j].abm_ex70 = '0';
            }
          }
          sum += (this.detailTable[i].abd_ex9 * 1);
        }
        this.basicInf.ab_ex40 = sum.toFixed(1); //这里必须要用 basicInf ，因为汇总表用的就是 basicInf,用其他的会出bug

        // console.log('确认修改儿童资金 后----------------',sum);
        // console.log('兴化儿童表 确定',this.childrenWarning);
        // console.log('明细表 确定',this.detailTable);

      }).catch(res => {
        for (let j in this.childrenWarning) {
          if (this.childrenWarning[j].abm_ex3 == abm_ex3) {
            this.childrenWarning[j].abm_ex71 = this.old_abm_ex71[j];
          }
        }
        // console.log('取消修改儿童资金');
        // console.log('兴化儿童表',this.childrenWarning);
        // console.log('明细表',this.detailTable);
      })
    },


    // 家庭月保障金明细计算
    showMoneyDetail (data, help_type, standard) {
      this.detailTable = [];
      var detailObj = {};
      var abi_ex2 = this.income7[2].abi_ex2;

      // var xinghu_ertong = false; //兴化儿童--调标后废弃

      console.log('moneyDetail data=>', data);
      console.log('this.tableData=>', this.tableData);

      if (data.ab_ex13 == '低保') {

        if (['低收入型低保', ''].includes(data.ab_ex41)) {
          if (data.ab_ex207 == '是') {// 渐退期
            for (let i in this.tableData) {
              detailObj.abd_ex1 = this.tableData[i].abm_ex3;
              detailObj.abd_ex2 = this.tableData[i].abm_ex1;
              detailObj.abd_ex3 = 0;
              detailObj.abd_ex4 = this.tableData[i].abm_ex71;
              detailObj.abd_ex9 = this.tableData[i].abm_ex71;
              detailObj.abd_ex10 = '低保 / 渐退期';
              this.detailTable.push(detailObj);
              console.log('明细对象=》', detailObj);
              detailObj = {};
            }
            console.log('该户处于渐退期', this.detailTable);
          } else { //非渐退期-按户保

            console.log('低收入型低保=>', data.ab_ex41 == '低收入型低保');

            // 非渐退期低保 人均月大于标准 按低保标准算救助金，小于低保标准还按人均月算救助金
            if (this.income7[2].abi_ex2 > this.dbStandard) {
              abi_ex2 = this.dbStandard;
            } else {
              abi_ex2 = this.income7[2].abi_ex2;
            }

            for (let i in this.tableData) {

              detailObj.abd_ex1 = this.tableData[i].abm_ex3; //姓名
              detailObj.abd_ex2 = this.tableData[i].abm_ex1; //关系
              detailObj.abd_ex3 = this.dbStandard;  //低保标准
              detailObj.abd_ex10 = data.ab_ex13;  //救助类型

              // 低保重病
              if (this.tableData[i].abm_ex11 == '重病') {

                // 如果成员表里的个人保障金无值，前端自动计算金额，否则使用成员表里的金额
                if ([''].includes(this.tableData[i].abm_ex71)) {
                  detailObj.abd_ex4 = this.dbStandard * 1;
                  detailObj.abd_ex8 = (this.dbStandard * 0.2).toFixed(0);
                  detailObj.abd_ex9 = detailObj.abd_ex4 * 1 + detailObj.abd_ex8 * 1;

                } else {
                  detailObj.abd_ex4 = this.tableData[i].abm_ex69 * 1;  //基础救助金
                  detailObj.abd_ex8 = this.tableData[i].abm_ex70 * 1;  //分类救助金
                  detailObj.abd_ex9 = this.tableData[i].abm_ex71 * 1; //总救助金
                }

                if (['老年人', '未成年人', '独居', '归侨', '退役军人'].includes(this.tableData[i].abm_ex51)) {
                  detailObj.abd_ex7 = '重病 / ' + this.tableData[i].abm_ex51;
                } else {

                  detailObj.abd_ex7 = '重病';
                }

                // 兴化儿童--调标后废弃
                // if(this.tableData[i].abm_ex51=='未成年人' && xinghu_ertong){
                // 	//兴化儿童资金赋值
                // 	if(this.tableData[i].abm_ex72!=''){
                // 		detailObj.abd_ex4 = this.tableData[i].abm_ex71;
                // 		detailObj.abd_ex8 = 0;
                // 	}
                // 	// 成员数据金额赋值
                // 	if( this.tableData[i].abm_ex71 == ''){
                // 		this.tableData[i].abm_ex71 = (detailObj.abd_ex4 * 1 + detailObj.abd_ex8 * 1).toFixed(2);
                // 	}
                // 	detailObj.abd_ex7 = '低保 / 重病 / 未成年人';
                // }

                // 低保重残
              } else if (this.tableData[i].abm_ex11 == '残疾' && (['一级残疾', '二级残疾', '一级', '二级'].includes(this.tableData[i].abm_ex40))) {
                console.log('低保残疾');

                detailObj.abd_ex7 = '残疾';
                // 如果成员表里的个人保障金无值，前端自动计算金额，否则使用成员表里的金额
                if (this.tableData[i].abm_ex71 == '') {
                  detailObj.abd_ex4 = this.dbStandard * 1;
                  detailObj.abd_ex8 = 0;
                  detailObj.abd_ex9 = detailObj.abd_ex4 * 1 + detailObj.abd_ex8 * 1;

                } else {
                  detailObj.abd_ex4 = this.tableData[i].abm_ex69 * 1;  //基础救助金
                  detailObj.abd_ex8 = this.tableData[i].abm_ex70 * 1;  //分类救助金
                  detailObj.abd_ex9 = this.tableData[i].abm_ex71 * 1; //总救助金
                }



                if (['老年人', '未成年人', '独居', '归侨', '退役军人'].includes(this.tableData[i].abm_ex51)) {
                  detailObj.abd_ex7 = '残疾 / ' + this.tableData[i].abm_ex51;
                } else {
                  detailObj.abd_ex7 = '残疾';
                }

                // if(this.tableData[i].abm_ex51=='未成年人'){
                // 	// 兴化儿童--调标后废弃
                // 	if(this.tableData[i].abm_ex72!='Y'){
                // 		detailObj.abd_ex4 = this.tableData[i].abm_ex71;
                // 		detailObj.abd_ex8 = 0;
                // 	}

                // 	if( this.tableData[i].abm_ex71 == ''){
                // 		this.tableData[i].abm_ex71 = (detailObj.abd_ex4 * 1 + detailObj.abd_ex8 * 1).toFixed(2);
                // 	}else{

                // 	}
                // 	detailObj.abd_ex7 = '低保残疾 / 未成年人';
                // }

              }
              else if (this.tableData[i].abm_ex51 != '') {
                // 低保健康的特定对象

                console.log('特定对象=》', this.tableData[i].abm_ex51);
                console.log('有特定对象=》', detailObj.abd_ex7);

                if (['退役军人', '归侨', '独居', '老年人', '未成年人'].includes(this.tableData[i].abm_ex51)) {
                  // 增发特定对象
                  detailObj.abd_ex7 = this.tableData[i].abm_ex51;

                  if ([''].includes(this.tableData[i].abm_ex71)) {
                    detailObj.abd_ex4 = Math.ceil(this.dbStandard * 1 - abi_ex2).toFixed(1);
                    detailObj.abd_ex8 = (this.dbStandard * 0.1).toFixed(0);
                    detailObj.abd_ex9 = detailObj.abd_ex4 + detailObj.abd_ex8;
                  } else {
                    detailObj.abd_ex4 = this.tableData[i].abm_ex69 * 1;  //基础救助金
                    detailObj.abd_ex8 = this.tableData[i].abm_ex70 * 1;  //分类救助金
                    detailObj.abd_ex9 = this.tableData[i].abm_ex71 * 1; //总救助金
                  }


                  // //  兴化儿童--调标后废弃
                  // if(this.tableData[i].abm_ex51 == '老年人' || this.tableData[i].abm_ex51 == '未成年人'){
                  // 	console.log('兴化儿童',this.tableData[i].abm_ex51);

                  // 	detailObj.abd_ex7 =  this.tableData[i].abm_ex51;
                  // 	if(detailObj.abd_ex7=='未成年人' && this.tableData[i].abm_ex72 !='' && xinghu_ertong){
                  // 		// 兴化儿童修改
                  // 			detailObj.abd_ex4 = this.tableData[i].abm_ex71;
                  // 			detailObj.abd_ex8 = '';
                  // 			console.log('兴化儿童修改==>');

                  // 	}else if(detailObj.abd_ex7=='未成年人'|| detailObj.abd_ex7=='老年人'){

                  // 		console.log('正常增发',detailObj);
                  // 		detailObj.abd_ex4 = (this.dbStandard * 1 - abi_ex2).toFixed(2);
                  // 		detailObj.abd_ex8 = this.dbStandard * 0.1;

                  // 		if( this.tableData[i].abm_ex71 == ''){
                  // 			this.tableData[i].abm_ex71 = (detailObj.abd_ex4 * 1 + detailObj.abd_ex8 * 1).toFixed(2);
                  // 		}

                  // 	}else{

                  // 		detailObj.abd_ex4 = (this.dbStandard * 1 - abi_ex2);
                  // 	}
                  // }else if(['退役军人','归侨','独居'].includes(this.tableData[i].abm_ex51)){

                  // 	detailObj.abd_ex4 = (this.dbStandard * 1 - abi_ex2);
                  // 	detailObj.abd_ex8 = this.dbStandard * 0.1;
                  // 	detailObj.abd_ex8 = this.dbStandard * 0.1;
                  // }

                } else {
                  // 有特定对象非增发特定对象
                  if ([''].includes(this.tableData[i].abm_ex71)) {
                    detailObj.abd_ex4 = Math.ceil(this.dbStandard * 1 - abi_ex2).toFixed(1);
                    detailObj.abd_ex8 = 0;
                    detailObj.abd_ex9 = detailObj.abd_ex4 + detailObj.abd_ex8;
                  } else {
                    detailObj.abd_ex4 = this.tableData[i].abm_ex69 * 1;  //基础救助金
                    detailObj.abd_ex8 = this.tableData[i].abm_ex70 * 1;  //分类救助金
                    detailObj.abd_ex9 = this.tableData[i].abm_ex71 * 1; //总救助金
                  }
                }

              }
              else if (this.tableData[i].abm_ex51 == '') {
                // 普通对象(非病残、非特定对象)
                if ([''].includes(this.tableData[i].abm_ex71)) {
                  detailObj.abd_ex4 = Math.ceil(this.dbStandard * 1 - abi_ex2).toFixed(1);
                  detailObj.abd_ex8 = 0;
                  detailObj.abd_ex9 = detailObj.abd_ex4 + detailObj.abd_ex8;
                } else {
                  detailObj.abd_ex4 = this.tableData[i].abm_ex69 * 1;  //基础救助金
                  detailObj.abd_ex8 = this.tableData[i].abm_ex70 * 1;  //分类救助金
                  detailObj.abd_ex9 = this.tableData[i].abm_ex71 * 1; //总救助金
                }
              }

              detailObj.abd_ex10 += (detailObj.abd_ex7 != '' && detailObj.abd_ex7 != undefined) ? ' / ' + detailObj.abd_ex7 : "";

              this.detailTable.push(detailObj);
              detailObj = {};

            }
            console.log('低保类型救助明细', this.detailTable);
          }
        } else if (data.ab_ex41 == '重病型单列户施保') {

          detailObj.abd_ex1 = data.ab_ex3;

          for (let i in this.tableData) {
            if (this.tableData[i].abm_ex3 == data.ab_ex3) {
              detailObj.abd_ex2 = this.tableData[i].abm_ex1;
              detailObj.abd_ex9 = (this.tableData[i].abm_ex71 * 1);
            }
          }

          // detailObj.abd_ex4 = data.ab_ex38 * 1;

          detailObj.abd_ex3 = data.ab_ex38;
          detailObj.abd_ex10 = data.ab_ex41;

          // detailObj.abd_ex9 = (data.ab_ex38 * 1).toFixed(2);

          this.basicInf.ab_ex40 = detailObj.abd_ex9;
          this.detailTable.push(detailObj);

          console.log(detailObj.abd_ex9, '重病型单列户施保');
          detailObj = {};

        } else if (data.ab_ex41 == '残疾人单列户施保') {

          for (let i in this.tableData) {
            if (this.tableData[i].abm_ex3 == data.ab_ex3) {
              detailObj.abd_ex2 = this.tableData[i].abm_ex1;

              if (['精神残疾', '智力残疾', '精神', '智力'].includes(this.tableData[i].abm_ex39) && ['三级', '三级残疾'].includes(this.tableData[i].abm_ex40)) {
                // detailObj.abd_ex9 = (data.ab_ex38 * 0.75).toFixed(2);
                detailObj.abd_ex9 = (this.tableData[i].abm_ex71 * 1);

              } else if (['一级残疾', '二级残疾', '一级', '二级'].includes(this.tableData[i].abm_ex40)) {
                console.log('残疾人单列户施保2');
                // detailObj.abd_ex9 = (data.ab_ex38 * 0.65).toFixed(2);
                detailObj.abd_ex9 = (this.tableData[i].abm_ex71 * 1);
              }

              console.log('残疾人单列户施保1', detailObj);
            }
          }

          detailObj.abd_ex1 = data.ab_ex3;
          detailObj.abd_ex3 = data.ab_ex38;
          detailObj.abd_ex10 = data.ab_ex41;

          // detailObj.abd_ex9 = detailObj.abd_ex4;
          console.log('残疾种类', detailObj);
          // if(detailObj.abd_ex9){
          // 	this.basicInf.ab_ex40 = detailObj.abd_ex9;
          // }
          this.detailTable.push(detailObj);
          detailObj = {};
        }
      } else if (data.ab_ex13 == '特困供养') {
        // this.zfShow = false;
        console.log('发放明细');
        for (let i in this.tableData) {
          detailObj.abd_ex10 = data.ab_ex13;  //救助类型
          detailObj.abd_ex1 = this.tableData[i].abm_ex3;
          detailObj.abd_ex2 = this.tableData[i].abm_ex1;
          detailObj.abd_ex3 = this.tkStandard;

          if (data.ab_ex15 == '审批' || data.ab_ex15 == '办结') {
            detailObj.abd_ex5 = data.ab_ex200;
            detailObj.abd_ex6 = data.ab_ex199;
          } else {
            detailObj.abd_ex5 = 0;
            detailObj.abd_ex6 = 0;
          }
          // 保障金
          // detailObj.abd_ex9 = this.income7[2].abi_ex2 > this.dbStandard ? '0.00' : detailObj.abd_ex5 * 1 + detailObj.abd_ex6 * 1;
          detailObj.abd_ex9 = abi_ex2 > this.dbStandard ? '0.0' : Math.ceil((detailObj.abd_ex5 * 1 + detailObj.abd_ex6 * 1).toFixed(1));

          this.detailTable.push(detailObj);
          detailObj = {};
        }
      }

      console.log('家庭月保障金明细 after=>', this.detailTable);
      var sumMoney = 0;
      if (this.detailTable.length > 0) {
        for (let i in this.detailTable) {
          sumMoney += this.detailTable[i].abd_ex9 * 1;
        }
      }

      // 若有小数保留两位，无小数保留一位
      if (sumMoney % 1 > 0) {
        sumMoney = sumMoney.toFixed(2);
      } else {
        sumMoney = sumMoney.toFixed(1);
      }

      this.basicInf.ab_ex40 = sumMoney;
      // console.log('家庭月保障金=>',this.basicInf.ab_ex40);
      // console.log('家庭月保障金 sumMoney=>',sumMoney);
    },

    // 显示明细表
    moneyDetail (data) {
      this.detailShow = !this.detailShow;
      this.showMoneyDetail(data);
    },

    // 放弃转办弹框--转办点蒙版或放弃或叉是弹出
    giveUpZB (done) {

      this.$confirm('是否放弃转办？', {
        confirmButtonText: '放弃',
        cancelButtonText: '取消',
      })
        .then(_ => {
          this.save2 = false;
          done();
        })
        .catch(_ => { });
    },

    // 低保转办选择
    zbChange () {
      this.disabled = !this.disabled;

      // 禁用时，转办类型清空
      if (this.disabled == true) {
        this.typeData.ab_ex13 = "";
        this.typeData.ab_ex41 = "";
      } else {
        // 按人保禁选识别
        this.disabledArb();
      }


      // console.log(this.disabled,"this.disabled");
      // console.log(this.auditValue.ab_ex13,"this.auditValue.ab_ex41");
      // console.log(this.typeData.ab_ex13,"this.typeData.ab_ex13");
      // console.log(this.typeData.ab_ex13,"this.typeData.ab_ex41");
    },

    // 转办 按人保 禁选
    disabledArb () {
      console.log('共同生活家庭成员=》', this.tableData);
      console.log('人均月 >= 低保标准 =》', this.income7[2].abi_ex2, this.income7[2].abi_ex2 >= this.dbStandard);
      console.log('人均月 <= 低保标准*2 =》', this.income7[2].abi_ex2 <= this.dbStandard * 2);

      // 单人单户、重病或重残
      if (this.tableData.length == 1) {
        for (let i in this.tableData) {
          if (this.tableData[i].abm_ex2 == this.auditValue.ab_ex7) {
            console.log(this.tableData[i].abm_ex11, this.tableData[i].abm_ex40, this.tableData[i].abm_ex52);
            if (this.tableData[i].abm_ex11 == '重病') {
              this.to_arb = false;
            } else if (this.tableData[i].abm_ex11 == '残疾') {
              if (['一级残疾', '二级残疾', '一级', '二级'].includes(this.tableData[i].abm_ex40)) {
                this.to_arb = false;
              } else if (['三级', '三级残疾'].includes(this.tableData[i].abm_ex40) && ['精神', '智力', '精神残疾', '智力残疾'].includes(this.tableData[i].abm_ex39)) {
                this.to_arb = false;
              } else {
                this.to_arb = true;
              }
            }
          }
        }
      }
    },


    //转办类型选择
    radioChange () {
      this.typeData.ab_ex13 = this.ab_ex13 != '按人保' ? this.ab_ex13 : '低保';
      this.typeData.ab_ex41 = this.ab_ex13 == '低保' ? '低收入型低保' : '';

      // 按人保类型筛选 重病型单列户施保 / 残疾人单列户施保
      if (this.tableData.length > 0 && this.ab_ex13 == '按人保') {
        for (let i in this.tableData) {
          if (this.tableData[i].abm_ex2 == this.auditValue.ab_ex7) {
            console.log(this.tableData[i].abm_ex11, this.tableData[i].abm_ex40, this.tableData[i].abm_ex52);
            if (this.tableData[i].abm_ex11 == '重病') {
              this.typeData.ab_ex41 = '重病型单列户施保';
            }
            else if (this.tableData[i].abm_ex11 == '残疾') {
              if (['一级残疾', '二级残疾', '一级', '二级'].includes(this.tableData[i].abm_ex40)) {
                this.typeData.ab_ex41 = '残疾人单列户施保';
              } else if (['三级', '三级残疾'].includes(this.tableData[i].abm_ex40) && ['精神', '智力', '精神残疾', '智力残疾'].includes(this.tableData[i].abm_ex39)) {
                this.typeData.ab_ex41 = '残疾人单列户施保';
              }
            }
          }
        }
      }

      console.log(this.typeData, "this.type");
    },
    // 计算救助数据
    changeJS () {
      this.changeAmt();
      var jsjg = [];

      // 困境儿童需要家庭成员年龄<18岁，在每本函数中无法进行困境儿童操作--暂时取消
      // if(this.jisuan.familyChildrens>0){
      // 	jsjg.push(this.kxsjz[0]) ; //家庭人口=1，没有赡抚养人(不管有没有重残重病)---特困
      // 	console.log(jsjg,"儿童救助");
      // }

      // 如果总收入<低保标准 this.jisuan.familyAmt>0 &&
      if ((this.jisuan.familyAmt) / this.jisuan.familyNum / 12 < this.dbStandard) {  //人均月<低保标准
        console.log("小于低保标准", this.jisuan.familyNum >= 1, Number(this.jisuan.familyFD) >= 1);
        if (this.jisuan.familyNum == 1 && this.jisuan.familyFD < 1) {
          jsjg.push(this.kxsjz[2]); //家庭人口=1，没有赡抚养人(不管有没有重残重病)---特困
          // console.log(jsjg,"特困");
        } else if (this.jisuan.familyNum > 1 || this.jisuan.familyFD >= 1) {
          jsjg.push(this.kxsjz[7]); //有赡抚养人(非共同生活>=1)或共同生活>1(有或没有重残重病)---按户保
          // console.log(jsjg,this.jisuan,"按户保");

        } else if (Number(this.jisuan.familyNum) >= 1 && (Number(this.jisuan.familyFD) >= 1)) {
          jsjg.push(this.kxsjz[7]); //有赡抚养人(非共同生活>=1)且共同生活=1(有或没有重残重病)---按户保
          // console.log(jsjg,this.jisuan,"按户保");
        }
      }

      //  if 家庭人口>0 && 总收入>0
      if (this.jisuan.familyNum > 0 && this.jisuan.familyAmt > 0) {

        //支出判别公式 ZC = (1.5i ≤ h < G/12) & ((h - (X/12/H)) < i)

        var h1 = 0;    // h1 = 人均月收入
        h1 = this.jisuan.familyAmt / 12 / this.jisuan.familyNum;

        var h2 = 0;    // h2 = 可支配人均月收入
        if (this.jisuan.familyAmt - this.jisuan.familyZzc != 0) {
          h2 = (this.jisuan.familyAmt - this.jisuan.familyZzc) / 12 / this.jisuan.familyNum;
        } else {
          h2 = 0;
        }
        // 条件1是否成立
        var condition1 = ((this.dbStandard * 1.5) < h1 && h1 < this.incomeConstant) ? true : false;
        // 条件2是否成立
        var condition2 = (h2 < this.dbStandard) ? true : false;

        // 如果 低保标准<=月人均<=低保标准 * 2
        if (h1 >= this.dbStandard && h1 <= (this.dbStandard * 2)) {

          if (h1 < (this.dbStandard * 1.5)) {	//如果 低保标准 < 月人均<低保标准 * 1.5

            if (this.jisuan.familyZB > 0 || this.jisuan.familyZC > 0) { 		//如果重病或重残
              jsjg.push(this.kxsjz[4]);
              jsjg.push(this.kxsjz[5]);

              if (this.jisuan.familyZB > 0) {                               //如果重病-按人保+单人保家庭
                jsjg.push(this.kxsjz[8]);
              }

              if (this.jisuan.familyZC > 0) {                               //如果重残-按人保+单人保家庭
                jsjg.push(this.kxsjz[9]);
              }

              console.log(jsjg, "重病/重残-按人保+低保边缘+单人保家庭");
            }
            else {														//否则//低保边缘+单人保家庭-----单人保家庭包含低保边缘
              jsjg.push(this.kxsjz[4]);
              jsjg.push(this.kxsjz[5]);
              console.log(jsjg, "低保边缘+单人保家庭");
            }
          }
          if (h1 >= (this.dbStandard * 1.5)) {       //如果 低保标准*1.5 <= 月人均 <低保标准*2
            if (this.jisuan.familyZB > 0 || this.jisuan.familyZC > 0) { 		//如果重病或重残-按人保+单人保家庭

              jsjg.push(this.kxsjz[4]); //单人保家庭--单人保

              if (this.jisuan.familyZB > 0) {                               //如果重病-按人保+单人保家庭
                jsjg.push(this.kxsjz[8]);
              }
              if (this.jisuan.familyZC > 0) {                               //如果重残-按人保+单人保家庭
                jsjg.push(this.kxsjz[9]);
              }
              if (condition2) {
                jsjg.push(this.kxsjz[3]); //支出
              }
              console.log(jsjg, "重病/重残-按人保+单人保家庭");
            }
            else {
              jsjg.push(this.kxsjz[4]);
              console.log(jsjg, "单人保家庭");

              if (condition2) {
                jsjg.push(this.kxsjz[3]); //支出
                console.log(jsjg, "支出");
              }
            }
          }
        }

        else if ((this.dbStandard * 2) < h1 && h1 < this.incomeConstant && h2 < this.dbStandard) {
          jsjg.push(this.kxsjz[3]); //支出
          console.log("均月>2*低保标准 && < 人均可支配常数 && 可支配月人均 < 标准");
        }
        // 如果人 --支出
      }

      if (jsjg.length > 0) {
        // jsjg.splice(1,0,this.kxsjz[1]) //临时救助--暂时取消
        this.jsjgshow1 = true;
        this.jsjgshow2 = false;
      } else {
        this.jsjgshow1 = false;
        this.jsjgshow2 = true;
      }
      this.jsjgString = jsjg.join("，");
      this.jsjg = jsjg;

      if (this.jsjg.length > 0) {
        // this.jsjg.splice(1,0,this.kxsjz[1]) //临时救助
        this.jsjgshow1 = true;
        this.jsjgshow2 = false;
      } else {
        this.jsjgshow1 = false;
        this.jsjgshow2 = true;
      }
      console.log(this.jisuan);
      console.log(jsjg);
      return jsjg;

    },
    scroll () {
      // var scrollTop =document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset;
      if (document.querySelector('.info2') == null || document.querySelector('#recordt') == null) {
        return ''
      }

      let scrollTop = document.querySelector('.info2').scrollTop;
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
      let oDiv19 = document.querySelector('#page19');
      let oDiv21 = true;

      if (this.basicInf.ab_ex92 == "是") {
        oDiv21 = document.querySelector('#page21');
      }
      let oDiv22 = true;
      if (this.basicInf.ab_ex13 == "特困供养" && (this.basicInf.ab_ex15 == "审批" || this.basicInf.ab_ex15 == "办结")) {
        oDiv22 = document.querySelector('#page22');
      }
      let oDiv23 = true;
      if (this.basicInf.ab_ex13 == "低保") {
        oDiv23 = document.querySelector('#page23');
      }
      let oDiv24 = document.querySelector('#page24');
      // 顺序跟上面显示顺序要相反
      let clientHeight = document.querySelector('.info2').clientHeight
      let recordtClientHeight = document.querySelector('#recordt').scrollHeight
      // 在新增dialog打开时不执行后面的程序
      if (!oDiv1 || !oDiv2 || !oDiv3 || !oDiv4 || !oDiv5 || !oDiv6 || !oDiv7 || !oDiv8 || !oDiv9 || !oDiv10 || !oDiv12 || !oDiv13 || !oDiv14 || !oDiv15 || !oDiv16 || !oDiv17 || !oDiv18 || !oDiv19 || !oDiv21 || !oDiv22 || !oDiv23 || !oDiv24) {
        return ''
      }
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
      } else if (oDiv22 && scrollTop > (oDiv22.offsetTop - oDiv1.offsetTop - 1)) {
        // console.log('触发了22')
        this.isShow(22)
      } else if (oDiv24 && scrollTop > (oDiv24.offsetTop - oDiv1.offsetTop - 1)) {
        // console.log('触发了24')
        this.isShow(24)
      } else if (oDiv23 && scrollTop > (oDiv23.offsetTop - oDiv1.offsetTop - 1)) {
        // console.log('触发了23')
        this.isShow(23)
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
      } else if (scrollTop > (oDiv18.offsetTop - oDiv1.offsetTop - 1)) {
        // console.log('触发了18')
        this.isShow(18)
      } else if (scrollTop > (oDiv16.offsetTop - oDiv1.offsetTop - 1)) {
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
      } else if (scrollTop > (oDiv1.offsetTop - oDiv1.offsetTop)) {
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

    // 数据加载 then为失败，catch为成功
    async loadData () {
      //救助标准
      await this.getStandard();
      this.sId = this.$route.query.sId;
      this.cId = this.$route.query.cId;
      this.type = this.$route.query.type;

      // this.getSupportinstList(); //供养机构
      // this.$forceUpdate();


      await this.checkSpecialAccount()
        .then()
        .catch((res) => {
          try {
            console.log(res.response.data[0].specialAccount, '账号验证');

            this.specialAccount = res.response.data[0].specialAccount;

          } catch (error) {
            this.$message.error(error)
          }
        })

      this.getData({
        sId: this.sId,
        type: this.type
      }).then(res => {
        this.record1(res[0].record)
        this.auditValue = res[0].data[0];
        if (this.type == "th")
          this.auditValue.ab_ex27 = "退回";

        this.publicity = res[0].data[0]
        this.approval = res[0].data[0]

      }).catch(res => {
        if (typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200) {
          // console.log('请求失败了-----------------------')
          this.$message.error('数据获取失败或请求超时')
          this.$emit("closes", false)
          this.$router.go(-1)
          return false
        }
        // 自定义预警
        if (res.response.data[0].waring.length > 0) {
          for (let i = 0; i < res.response.data[0].waring.length; i++) {
            this.warningData[i] = res.response.data[0].waring[i];
          }
        }

        console.log('getData=>', res.response);
        // var datas=JSON.parse(res.response.data)
        // console.log(datas);

        // 生活费 有值赋值 无值用特困标准
        if (res.response.data[0].data[0].ab_ex13 == '特困供养') {
          if (res.response.data[0].data[0].ab_ex200 == '') {
            res.response.data[0].data[0].ab_ex200 = this.tkStandard;
            this.ab_ex200 = this.tkStandard;
          } else {
            this.ab_ex200 = res.response.data[0].data[0].ab_ex200;
          }
        }

        console.log('特困标准=>', this.tkStandard);

        this.basicInf = res.response.data[0].data[0];
        this.publicity = res.response.data[0].data[0];
        this.approval = res.response.data[0].data[0];

        // this.basicInf = JSON.parse(JSON.stringify(res.response.data[0].data[0]))
        // this.publicity = JSON.parse(JSON.stringify(res.response.data[0].data[0]))
        // this.approval = JSON.parse(JSON.stringify(res.response.data[0].data[0]))

        // 特困审核、公示保障金设置为0
        this.basicInf.ab_ex40 = this.basicInf.ab_ex13 == '特困供养' && (this.basicInf.ab_ex15 == '初审' || this.basicInf.ab_ex15 == '公示开始') ? "0.0" : this.basicInf.ab_ex40;
        this.basicInf.ab_ex38 = this.basicInf.ab_ex13 == '特困供养' ? this.tkStandard : this.basicInf.ab_ex38

        // 没有保障金时设置为0
        this.basicInf.ab_ex40 = this.basicInf.ab_ex40 == '' ? "0.0" : this.basicInf.ab_ex40;
        console.log('load 保障金=>', this.basicInf.ab_ex40);

        // console.log(this.basicInf.ab_ex15 !='初审');

        // 救助类型为单人保时不可转办
        if (["残疾人单列户施保", "重病型单列户施保"].includes(this.basicInf.ab_ex41)) {
          this.arb = true;
        }

        // this.record = res.response.data[0].record
        this.record1(res.response.data[0].record);
        this.auditValue = res.response.data[0].data[0];
        // console.log(res.response,"this.auditValue")
        if (this.type == "th")
          this.auditValue.ab_ex27 = "退回";

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
        this.imgArr.ab_ex196_len = this.basicInf.ab_ex196.split(",")
        this.imgArr.ab_ex197_len = this.basicInf.ab_ex197.split(",")
        // console.log(this.imgArr,'图片');
        for (let key in this.imgArr) {
          if (this.imgArr[key][0] == '') {
            this.imgArr[key].length = 0
            this.imgNum[key] = this.imgArr[key].length
          } else {
            this.imgNum[key] = this.imgArr[key].length
          }
        }

        //生活费计算
        console.log(this.tableData.length);
        if (this.tableData.length > 0 && this.approval.ab_ex13 == '特困供养') {
          this.$set(this.approval, "ab_ex200", this.ab_ex200);
        }

        // 自定义预警
        // this.loadWarning({
        // 	sId: this.sId,
        // }).then(res => {
        // 	console.log(res,'预警')
        // 	this.warningData = res[0].data 
        // }).catch(res => {
        // 	if(typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200){
        // 		console.log('请求失败了-----------------------')
        // 		this.$message.error('数据获取失败或请求超时')
        // 		this.$emit("closes", false)
        // 		this.$router.go(-1)
        // 		return false
        // 	}

        // if(res.response.data[0].waring.length>0){
        // 	for(let i=0 ; i < res.response.data[0].waring.length ; i++){
        // 		this.warningData[i] = res.response.data[0].waring[i];
        // 	}
        // }
        // })

        this.loadFamily({
          sId: this.sId,
          sType: "Y" //Y为共同生活，N为非共同生活
        }).then(res => {
          console.log(res, '家庭成员')
          this.tableData = res[0].data
        }).catch(res => {
          if (typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200) {
            // console.log('请求失败了-----------------------')
            this.$message.error('数据获取失败或请求超时')
            this.$emit("closes", false)
            this.$router.go(-1)
            return false
          }

          // 家庭成员数据分配
          this.tableData = [];
          for (let i in res.response.data[0].data) {
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

          console.log(this.tableData, "this.tableData")//得出是否为工作年龄

          for (let i in this.tableData) {
            this.changeCard(i)

            if (this.tableData[i].abm_ex51 == '未成年人') {
              this.childrenWarning.push(this.tableData[i])
              this.old_abm_ex71.push(this.tableData[i].abm_ex71)
            }
          }

          // 兴化儿童预警显示
          // if(this.childrenWarning.length > 0 && this.auditValue.ab_ex161 =='兴化市' && ['审批','办结'].includes(this.auditValue.ab_ex15) ){
          // 	this.showChildren = true;
          // }
          // console.log('儿童人数 =》',this.childrenWarning.length);
          // console.log('兴化市 =》',this.auditValue.ab_ex161 =='兴化市');
          // console.log('儿童预警 =》',this.showChildren);

          //收入
          this.loadIncome({
            sId: this.sId,
          }).then(res => {
            this.pay = res[0].data
          }).catch(res => {
            if (typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200) {
              console.log('请求失败了-----------------------')
              this.$message.error('数据获取失败或请求超时')
              this.$emit("closes", false)
              this.$router.go(-1)
              return false
            }

            console.log(res.response.data[0].data, " 收入")
            if (res.response.data[0].data[0]) {
              this.income1 = [];
              this.income2 = [];
              this.income3 = [];
              this.income4 = [];
              this.income5 = [];
              this.income6 = [];
              this.income7 = [];
            }

            for (let i in res.response.data[0].data) {
              for (let j in res.response.data[0].data[i]) {
                res.response.data[0].data[i][j] = unescape(res.response.data[0].data[i][j]) //解码
                // console.log(res.response.data[0].data[i][j]);
              }
              res.response.data[0].data[i].abi_ex2 = Number(res.response.data[0].data[i].abi_ex2).toFixed(2)
              // console.log(res.response.data[0].data[i].abi_ex2); 
              //收入类型数据分配
              if (res.response.data[0].data[i].abi_ex4 == 'A') {
                this.income1.push(res.response.data[0].data[i])
              } else if (res.response.data[0].data[i].abi_ex4 == 'B') {
                res.response.data[0].data[i].abi_ex1 = '经营性净收入'
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

            if (this.income2.length == 0) {
              this.income2.push({
                abi_ex1: "经营性净收入",
                abi_ex2: "",
                abi_ex3: "经营性净收入",
                abi_ex4: "B",
                abi_ex5: ""
              })
            }
            if (this.income5.length == 0) {
              this.income5.push({
                abi_ex1: '其他收入',
                abi_ex2: "",
                abi_ex3: "其他收入",
                abi_ex4: "E",
                abi_ex5: ""
              })
            }
            if (this.income6.length == 0) {
              this.income6.push({
                abi_ex1: '必要就业成本抵扣',
                abi_ex2: "",
                abi_ex3: "必要就业成本抵扣",
                abi_ex4: "F",
                abi_ex5: ""
              })
            }

            if (res.response.data[0].data.length == 0) {
              let income7 = [
                {
                  abi_ex1: "总收入",
                  abi_ex2: "0.00",
                  abi_ex3: "总收入",
                  abi_ex4: "G",
                  abi_ex5: ""
                }, {
                  abi_ex1: "家庭月平均收入",
                  abi_ex2: "0.00",
                }, {
                  abi_ex1: "家庭月人均收入",
                  abi_ex2: "0.00",
                }]
              this.income7 = income7
            } else {
              var abi_ex2_1 = 0;
              var abi_ex2_2 = 0;
              var abi_ex2_3 = 0;
              var abi_ex2_4 = 0;
              var abi_ex2_5 = 0;
              var abi_ex2_6 = 0;
              var abi_ex2_7 = 0;

              var len = 0;
              for (let i in this.income1) {
                if (this.income1[i].abi_ex2 != "" && !isNaN(Number(this.income1[i].abi_ex2))) {
                  len++;
                  abi_ex2_1 += Number(this.income1[i].abi_ex2)
                } else if (len == 0) {
                  abi_ex2_1 = 0.00;
                }
              }
              // console.log(abi_ex2_1,"income1");

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
              }

              if (this.income6.length > 0) {
                len++;
                abi_ex2_6 += Number(this.income6[0].abi_ex2)
              } else {
                abi_ex2_6 = 0.00;
              }
              // console.log( this.income6);
              if (this.income7.length > 0) {
                abi_ex2_7 += Number(this.income7[0].abi_ex2)
              } else {
                this.income7[0] = {}
                var amt = abi_ex2_1 + abi_ex2_2 + abi_ex2_3 + abi_ex2_4 + abi_ex2_5 - abi_ex2_6;
                abi_ex2_7 = Number(amt);
                this.income7[0].abi_ex2 = Number(amt)
              }
              // console.log( this.income7,"income7");

              // 各项收入为零则可输入总收入
              if (this.income7.length == 0) {
                // console.log("income7.length=0");
                this.income7[0] = {};
                this.income7[1] = {};
                this.income7[2] = {};
                this.income7[0].abi_ex1 = "总收入";
                this.income7[0].abi_ex2 = amt.toFixed(2);
                this.income7[1].abi_ex1 = "家庭月平均收入";
                this.income7[1].abi_ex2 = (amt / 12).toFixed(2);
                this.income7[2].abi_ex1 = "家庭月人均收入";
                this.income7[2].abi_ex2 = this.tableData.length > 0 ? Number(amt / 12 / this.tableData.length).toFixed(2) : "0.00";
                // if(this.tableData.length>0){
                // 	console.log("收入计算",this.tableData.length);
                // 	this.income7[2].abi_ex2 = Number(amt/12/this.tableData.length).toFixed(2);
                // }else{
                // 	console.log("收入为零",this.tableData.length);
                // 	this.income7[2].abi_ex2 = "0.00";
                // }
              } else {
                this.income7[0].abi_ex1 = "总收入";
                this.income7[1] = {};
                this.income7[1].abi_ex1 = "家庭月平均收入";
                this.income7[2] = {};
                this.income7[2].abi_ex1 = "家庭月人均收入";
                this.income7[0].abi_ex2 = Number(this.income7[0].abi_ex2).toFixed(2)
                this.income7[1].abi_ex2 = Number(this.income7[0].abi_ex2 / 12).toFixed(2)
                console.log("总收入有值", this.income7);
                // console.log("总收入有值，计算月均"+this.income7[1].abi_ex2);
                if (this.tableData.length > 0) {
                  // console.log("收入计算",this.tableData.length);
                  var income7_2 = Number(this.income7[0].abi_ex2 / 12 / this.tableData.length).toFixed(2);
                  this.income7[2].abi_ex2 = income7_2;
                } else {
                  // console.log("收入为零",this.tableData.length);
                  this.income7[2].abi_ex2 = "0.00";
                }
              }
            }

            // // 保障金计算
            // if(this.auditValue.ab_ex41=='重病型单列户施保'|| this.auditValue.ab_ex41=='残疾人单列户施保'){
            // 	this.showMoneyDetail(this.auditValue)
            // }
            // // 兴化儿童保障金
            // if(this.childrenWarning.length > 0 && this.auditValue.ab_ex161 =='兴化市' ){
            // 	this.showMoneyDetail(this.auditValue)
            // }
          })
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
          console.log('请求失败了-----------------------')
          this.$message.error('数据获取失败或请求超时')
          this.$emit("closes", false)
          this.$router.go(-1)
          return false
        }
        console.log(res.response.data[0], " 家庭支出")
        if (res.response.data[0].data3.length > 0) {
          this.pay = res.response.data[0].data3[0] // 家庭支出
        }
      })

      // 车船房屋
      this.loadEstate({
        sId: this.sId,
      }).then(res => {
        console.log(res)
        this.tableData3 = res[0].data //车
        this.tableData4 = res[0].data2 //房
      }).catch(res => {
        if (typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200) {
          console.log('请求失败了--------------------车房')
          this.$message.error('数据获取失败或请求超时')
          this.$emit("closes", false)
          this.$router.go(-1)
          return false
        }
        for (let i in res.response.data[0].data) {
          if (res.response.data[0].data[i].abe_ex7 == '车船') {
            this.tableData3.push(res.response.data[0].data[i])
          } else {
            this.tableData4.push(res.response.data[0].data[i])
          }
        }
      })
      // 已享受救助数据
      this.loadSalvation({
        sId: this.sId,
        cId: this.cId
      }).then(res => {
        console.log(res)
        this.tableData5 = res[0].data
        this.tableData6 = res[0].data2
      }).catch(res => {
        if (typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200) {
          console.log('请求失败了-----------------------已享受救助数据')
          // this.$message.error('数据获取失败或请求超时')
          // this.$emit("closes", false)
          // this.$router.go(-1)
          return false
        }
        // console.log(res)
        this.tableData5 = res.response.data[0].data;
        this.tableData6 = res.response.data[0].data2;

        console.log(this.basicInf.ab_ex40, '保障金');
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

    // 给tabledata添加序号便于操作
    rowClassName ({
      row,
      rowIndex
    }) {
      row.xh = rowIndex + 1;
    },

    // 获取tableData1被选中的
    handleFamilyData1 (selection) {
      this.checkedFamilyData1 = selection;
    },

    // 获取tableData2被选中的
    handleFamilyData2 (selection) {
      this.checkedFamilyData2 = selection;
    },

    // 获取Income1被选中的
    handleIncome1 (selection) {
      this.checkedIncome1 = selection;
    },
    // 获取Income2被选中的
    handleIncome2 (selection) {
      this.checkedIncome2 = selection;
    },
    // 获取Income3被选中的
    handleIncome3 (selection) {
      this.checkedIncome3 = selection;
    },
    // 获取Income4被选中的
    handleIncome4 (selection) {
      this.checkedIncome4 = selection;
    },

    // 根据str找table添加行
    handleAddDetails (str) {
      let obj = {};

      // 共同生活
      if (str == 'tableData') {
        if (this.tableData == undefined) {
          this.tableData = new Array();
        }
        obj = {
          abm_ex1: '',
          abm_ex2: '',
          abm_ex3: '',
          abm_ex5: '',
          abm_ex6: 'Y',
          abm_ex7: '',
          abm_ex11: '',
          abm_ex14: '',
          abm_ex15: '',
          abm_ex16: '',
          abm_ex17: '',
          abm_ex28: '',
          abm_ex39: '',
          abm_ex40: '',
          abm_ex49: '',
          abm_ex51: '',
          abm_ex52: '',
          age: '',
          work: ''
          // abm_ex42: ''
        };
        this.tableData.push(obj);
        this.disabledArb();
      }
      // 非共同生活
      if (str == 'tableData2') {
        if (this.tableData2 == undefined) {
          this.tableData2 = new Array();
        }
        obj = {
          abm_ex1: '',
          abm_ex3: '',
          abm_ex2: '',
          abm_ex6: 'N',
          abm_ex11: '',
          abm_ex15: '',
          abm_ex20: '',
          abm_ex17: '',
          abm_ex18: '',
          abm_ex49: '',
          // abm_ex28: ''
        };
        this.tableData2.push(obj);
      }

      // 工资性收入
      if (str == 'income1') {
        if (this.income1 == undefined) {
          this.income1 = new Array();
        }
        obj = {
          abi_ex1: '',
          abi_ex2: '',
          abi_ex3: '工资性收入',
          abi_ex4: 'A',
          abi_ex5: '',
        };
        this.income1.push(obj);
      }
      // 经营净收入
      if (str == 'income2') {
        if (this.income2 == undefined) {
          this.income2 = new Array();
        }
        obj = {
          abi_ex1: '',
          abi_ex2: '',
          abi_ex3: '经营净收入',
          abi_ex4: 'B',
          abi_ex5: '',
        };
        this.income2.push(obj);
      }
      // 财产净收入
      if (str == 'income3') {
        if (this.income3 == undefined) {
          this.income3 = new Array();
        }
        obj = {
          abi_ex1: '',
          abi_ex2: '',
          abi_ex3: '财产净收入',
          abi_ex4: 'C',
          abi_ex5: '',
        };
        this.income3.push(obj);
      }
      // 转移净收入
      if (str == 'income4') {
        if (this.income4 == undefined) {
          this.income4 = new Array();
        }
        obj = {
          abi_ex1: '',
          abi_ex2: '',
          abi_ex3: '转移净收入',
          abi_ex4: 'D',
          abi_ex5: '',
        };
        this.income4.push(obj);
      }

      // 重新计算收入支出
      this.changeAmt()
    },
    // 根据str找table删除选中行
    handleDelDetails (str) {
      let obj;
      let old;

      if (str == 'tableData') {
        obj = this.checkedFamilyData1;
        old = this.tableData;
        if (obj.length > 0) {
          obj.forEach((v1, i1) => {
            old.forEach((v2, i2) => {
              if (v1.xh == v2.xh) {
                old.splice(i2, 1)
              }
            })
          })
        }
        this.disabledArb();
      }
      if (str == 'tableData2') {
        obj = this.checkedFamilyData2;
        old = this.tableData2;
        if (obj.length > 0) {
          obj.forEach((v1, i1) => {
            old.forEach((v2, i2) => {
              if (v1.xh == v2.xh) {
                old.splice(i2, 1)
              }
            })
          })
        }
      }

      if (str == 'income1') {
        obj = this.checkedIncome1;
        old = this.income1;
        if (obj.length > 0) {
          obj.forEach((v1, i1) => {
            old.forEach((v2, i2) => {
              if (v1.xh == v2.xh) {
                old.splice(i2, 1)
              }
            })
          })
        }
      }
      if (str == 'income2') {
        obj = this.checkedIncome2;
        old = this.income2;
        if (obj.length > 0) {
          obj.forEach((v1, i1) => {
            old.forEach((v2, i2) => {
              if (v1.xh == v2.xh) {
                old.splice(i2, 1)
              }
            })
          })
        }
      }
      if (str == 'income3') {
        obj = this.checkedIncome3;
        old = this.income3;
        if (obj.length > 0) {
          obj.forEach((v1, i1) => {
            old.forEach((v2, i2) => {
              if (v1.xh == v2.xh) {
                old.splice(i2, 1)
              }
            })
          })
        }
      }
      if (str == 'income4') {
        obj = this.checkedIncome4;
        old = this.income4;
        if (obj.length > 0) {
          obj.forEach((v1, i1) => {
            old.forEach((v2, i2) => {
              if (v1.xh == v2.xh) {
                old.splice(i2, 1)
              }
            })
          })
        }
      }
      // 重新计算收入支出
      this.changeAmt()
    },

    // 正则校验可增加行数的输入数据
    keyVerification2 (index, row, id) {
      var msg = "";
      // 共同姓名
      if (id == "f1.abm_ex3") {
        this.tableData[index].abm_ex3 = row.abm_ex3.replace(/\s+/g, "");
        msg = isName(row.abm_ex3, id, index);
        if (msg != true) {
          this.$message.warning(msg);
          this.isSave = false;
          return false;
        }
      }
      // 共同工作单位
      if (id == "f1.abm_ex15") {
        this.tableData[index].abm_ex15 = row.abm_ex15.replace(/\s+/g, "");
        msg = isName(row.abm_ex15, id, index);
        if (msg != true) {
          this.$message.warning(msg);
          this.isSave = false;
          return false;
        }
      }
      // 共同月收入
      if (id == "f1.abm_ex17") {
        this.tableData[index].abm_ex17 = row.abm_ex17.replace(/\s+/g, "");
        msg = isNum(row.abm_ex17, id, index);
        if (msg != true) {
          this.$message.warning(msg);
          this.isSave = false;
          return false;
        }
      }
      // 非共同姓名
      if (id == "f2.abm_ex3") {
        this.tableData2[index].abm_ex3 = row.abm_ex3.replace(/\s+/g, "");
        msg = isName(row.abm_ex3, id, index);
        if (msg != true) {
          this.$message.warning(msg)
          this.isSave = false;
          return false;
        }
      }

      // 非共同工作单位
      if (id == "f2.abm_ex15") {
        this.tableData2[index].abm_ex15 = row.abm_ex15.replace(/\s+/g, "");
        msg = isName(row.abm_ex15, id, index);
        if (msg != true) {
          this.$message.warning(msg);
          this.isSave = false;
          return false;
        }
      }
      // 非共同家庭人口
      if (id == "f2.abm_ex20") {
        this.tableData2[index].abm_ex20 = row.abm_ex20.replace(/\s+/g, "");
        msg = isFamilyNum(row.abm_ex20, id, index)
        if (msg != true) {
          this.$message.warning(msg);
          this.isSave = false;
          return false;
        }
      }
      // 非共同家庭人均月收入
      if (id == "f2.abm_ex17") {
        this.tableData2[index].abm_ex17 = row.abm_ex17.replace(/\s+/g, "");
        msg = isNum(row.abm_ex17, id, index);
        if (msg != true) {
          this.$message.warning(msg);
          this.isSave = false;
          return false;
        }
      }
      // 非共同月赡抚养费
      if (id == "f2.abm_ex18") {
        this.tableData2[index].abm_ex18 = row.abm_ex18.replace(/\s+/g, "");
        msg = isNum(row.abm_ex18, id, index);
        if (msg != true) {
          this.$message.warning(msg);
          this.isSave = false;
          return false;
        }
      }
    },

    // 正则校验输入数据
    keyVerification (key, id) {
      //js去掉所有空格 \s表示查找空格带上加好表示连续的空格
      // key=key.replace(/\s+/g,""); 
      var msg = "";

      // 护理费
      if (id == 'ab_ex199') {
        this.approval.ab_ex199 = key.replace(/\s+/g, "");
        msg = isNum(key, id);
        if (msg != true) {
          this.$message.warning(msg);
          this.isSave = false;
          return false
        }
      }
      // 供养机构
      // if(id=='ab_ex195'){
      // 	this.approval.ab_ex195 = key.replace(/\s+/g,"");
      // 	// console.log( '供养机构名称 =>',key);
      // 	// console.log( '供养机构名称长度 =>',key.length);
      // 	// if(key.length>10){
      // 	// 	this.$message.warning('供养机构名称的字符不能超过10个！');
      // 	// 	this.isSave=false;
      // 	// 	return false
      // 	// } 
      // 	msg=isName(key,id);
      // 	if(msg!=true){
      // 		this.$message.warning(msg);
      // 		this.isSave=false;
      // 		return false
      // 	}
      // }
      // 生活费
      if (id == 'ab_ex200') {
        console.log(key);
        this.ab_ex200 = key.replace(/\s+/g, "");
        msg = isNum(key, id);
        if (msg != true) {
          this.$message.warning(msg);
          this.isSave = false;
          return false
        }
      }
    },

    // 账号识别
    checkSpecialAccount () {
      return request({
        url: "/social/common/checkSpecialAccount",
        method: "post",
        // data: data,
      });
    },

    //救助标准调用
    getStandard (data) {
      return request({
        headers: {
          'Accept': 'application/json',
        },
        url: '/social/assistance/getStandard',
        method: 'post',
        data: {}
      }).then(res => { }).catch(res => {

        var data = JSON.parse(JSON.stringify(res.response.data[0]))
        this.dbStandard = data.dbStandard;
        this.tkStandard = data.tkStandard;
        this.zcStandard = data.zcStandard;
        console.log('标准', data);
      })
    },
    // 主表数据
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
    loadWarning (data) {
      return request({
        headers: {
          'Accept': 'application/json',
        },
        url: '/social/assistance/getBasics',
        method: 'post',
        data: data
      })
    },
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
    //家庭收入
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
    // 已享受救助数据
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

    // 关于处理审批记录的一个方法
    record1 (rec) {
      for (let i in rec) {
        if ("公示开始" == rec[i].ar_ex4 && this.flag == false) {
          return true;
        }
        // this.record[i].ar_ex4 = rec[i].ar_ex4
        // this.record[i].ar_dat1 = rec[i].ar_dat1
        // this.record[i].ar_ex3 = rec[i].ar_ex3
        // this.record[i].ar_ex5 = rec[i].ar_ex5
        // this.record[i].ar_ex6 = rec[i].ar_ex6
        // this.record[i].ar_ex2 = rec[i].ar_ex2
        // this.record[i].flag = false
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

    // 退回原因
    changeSh (val) {
      if (val === "退回") {
        this.auditValue.ab_ex25 = ""
      }
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

    checkRepeat () { //检查是否有重复	--重复预警
      console.log(this.approval.ab_ex21);
      // return false;
      //alert(this.$refs.repeatWarn.isRepeat)

      if (this.ab_ex200 % 1 > 0 && this.basicInf.ab_ex13 == '特困供养') {
        this.$message.warning('生活费请填报整数！')
      } else if (this.ab_ex200 < 0 && this.basicInf.ab_ex13 == '特困供养') {
        this.$message.warning('生活费不能填报负数！')
      } else {
        //重复判断  驳回数据不进行重复检测
        if (this.$refs.repeatWarn.isRepeat && this.approval.ab_ex21 != '驳回') {
          this.repeatDialogShow = true;
        } else {
          this.save3(this.approval);
        }
      }
    },

    saveRepeatBack () { //重复预警退回
      if (confirm("是否要退回？\r\n\r\n注意：操作退回后此救助记录将会到退回栏目中\r\n\r\n\"确定\"继续退回操作,\"取消\"返回审批界面！")) {
        this.repeatDialogShow = false;
        this.approval.ab_ex21 = "退回";
        this.save3(this.approval);
      } else {
        this.repeatDialogShow = false;
      }
    },

    saveRepeatContinue () { //重复预警继续
      this.repeatDialogShow = false;

      this.approval.ab_ex21 = "同意";
      this.save3(this.approval);
    },

    // 成员间身份证重复验证
    isSameIDcard () {
      this.familyData = this.tableData.concat(this.tableData2).concat(this.tableData2_)
      // console.log(this.familyData,'家庭成员'+this.familyData.length);
      for (let i = 0; i < this.familyData.length - 1; i++) {
        // console.log(this.familyData[i].abm_ex3);

        for (let j = i + 1; j < this.familyData.length; j++) {
          // console.log(this.familyData[i].abm_ex3 ,this.familyData[j].abm_ex3);
          // console.log(this.familyData[i].abm_ex2 ,this.familyData[j].abm_ex2);
          var whereFamilyLeft = '';
          var whereFamilyRight = '';
          if (this.familyData[i].abm_ex6 == "Y") {
            whereFamilyLeft = "共同生活家庭成员"
          } else if (this.familyData[i].abm_ex6 == "N") {
            whereFamilyLeft = "非共同生活赡抚养人"
          } else if (this.familyData[i].abm_ex6 == "B") {
            whereFamilyLeft = "非共同生活赡抚养人家庭成员"
          }

          if (this.familyData[j].abm_ex6 == "Y") {
            whereFamilyRight = "共同生活家庭成员"
          } else if (this.familyData[j].abm_ex6 == "N") {
            whereFamilyRight = "非共同生活赡抚养人"
          } else if (this.familyData[j].abm_ex6 == "B") {
            whereFamilyRight = "非共同生活赡抚养人家庭成员"
          }
          if (this.familyData[i].abm_ex2 == this.familyData[j].abm_ex2) {
            console.log(this.familyData[i].abm_ex3 + '与' + this.familyData[j].abm_ex3 + '的身份证号重复啦，请修改');
            this.$message.warning(whereFamilyLeft + '"' + this.familyData[i].abm_ex3 + '"，与' + whereFamilyRight + '"' + this.familyData[j].abm_ex3 + '"的身份证号重复，请重新确认填报信息！');
            this.isSave = false;
            return false;
          }
          else {
            this.isSave = true;
          }
        }
      }
      // console.log(this.isSave,"this.isSave1");
    },
    // 转办按钮
    changeType (data) {
      console.log(data);
      // if((data.ab_ex4=='' || data.ab_ex42=='') && data.ab_ex202 !=''){
      if ((data.ab_ex4 == '' || data.ab_ex42 == '')) {
        this.$alert('请将数据补充完整后再进行转办', '提示', {
          confirmButtonText: '确定',
        });

      } else {
        switch (this.auditValue.ab_ex13) {
          case "低保":
            this.dbShow = false; break;
          case "家庭边缘":
            this.dsrShow = false; break;
          case "支出贫困":
            this.zcShow = false; break;
          case "特困供养":
            this.tkShow = false; break;
        }
        this.dialogChangeForm = true;
        console.log('显示弹框');
      }
      // console.log(data.ab_ex10,data.ab_ex177,data.ab_ex204);
    },

    // 转办页取消按钮-不转办了
    notSave () {
      this.save2 = false;
      this.dialogChangeForm = false;
    },

    // 审核转办数据校验
    async saveZB (data) {
      console.log('转办数据校验');

      //基本信息-家庭人口-输入类型判断
      if (Number.isNaN(Number(this.auditValue.ab_ex5)) || this.auditValue.ab_ex5 == 0) {
        this.$message.warning("家庭人口数应大于0");
        // this.isSaves=false
        this.isSave = false;
        return false;
      }

      // 基础信息填写格式验证
      console.log(this.auditValue);
      for (let i in this.auditValue) {
        // 这里要排除特困的-还没完事
        if (this.keyVerification(this.auditValue[i], i) == false) {
          this.isSave = false;
          // this.isSaves=false
          return false;
        }
      }

      // 验证共同生活成员信息
      // 相同姓名数量nameSame、相同身份证号数量IDCardSame
      var nameSame = 0;
      var IDCardSame = 0;
      if (this.tableData.length != this.auditValue.ab_ex5) {
        console.log(123);
        this.$message.warning("家庭人口数与实际填报共同生活成员数不符，请重新填报");
        // this.isSaves=false
        this.isSave = false;
        return false;
      } else if (this.tableData.length > 0) {
        // 共同家庭成员没填全保存不了
        let huzhu = 0;
        var isSpecial_1 = ''; //未成年、老年 特定对象
        var isSpecial_2 = ''; //未成年、老年 特定对象
        var haveOld = false;
        var haveYoung = false;
        for (let i in this.tableData) {
          for (let j in this.tableData[i]) {
            if (this.keyVerification2(i, this.tableData[i], "f1." + j) == false) {
              this.isSave = false;
              return false;
            }
          }
          this.tableData[i].abm_ex6 = "Y"
          let age = this.tableData[i].age;
          let abm_ex1 = this.tableData[i].abm_ex1;
          let abm_ex2 = this.tableData[i].abm_ex2;
          let abm_ex3 = this.tableData[i].abm_ex3;
          let abm_ex7 = this.tableData[i].abm_ex7;
          let abm_ex16 = this.tableData[i].abm_ex16;
          let abm_ex28 = this.tableData[i].abm_ex28;
          let abm_ex11 = this.tableData[i].abm_ex11;
          let abm_ex51 = this.tableData[i].abm_ex51;
          let abm_ex52 = this.tableData[i].abm_ex52;
          let abm_ex39 = this.tableData[i].abm_ex39;
          let abm_ex40 = this.tableData[i].abm_ex40;
          let abm_ex49 = this.tableData[i].abm_ex49;
          let abm_ex14 = this.tableData[i].abm_ex14;
          let abm_ex15 = this.tableData[i].abm_ex15;
          let index = Number(i) + 1;

          if (!abm_ex3 && !abm_ex1 && !abm_ex16 && !abm_ex7 && !abm_ex28 && !abm_ex2 && !abm_ex11 && !abm_ex14 || this.tableData.length != this.auditValue.ab_ex5) {
            console.log('都没填跳过');
            this.$message.warning("请完善第" + (index) + "行成员信息");
            this.isSave = false;
            return false;
          } else {
            // console.log('是否为劳动年龄'+this.tableData[i].work)
            if (!abm_ex3) {
              this.$message.warning("请填写第" + (index) + "行共同家庭成员姓名");
              this.isSave = false;
              return false;
            }
            else if (!abm_ex1) {
              this.$message.warning("请选择第" + (index) + "行共同家庭成员与户主的关系");
              this.isSave = false;
              return false;
            }
            else if (!abm_ex2 || abm_ex2) {
              this.tableData[i].abm_ex2 = abm_ex2.replace(/\s+/g, "");
              this.tableData[i].abm_ex2 = abm_ex2.replace(/x$/i, "X");
              let msg = isCardID(abm_ex2);
              if (msg != true) {
                this.$message.warning("第" + (index) + "行共同家庭成员" + msg);
                this.isSave = false;
                return false;
              } else {
                this.tableData[i].abm_ex5 = this.getSex(abm_ex2);
                this.tableData[i].age = this.getAge(abm_ex2);
              }
            }

            // 必须断开不然会在上一步结束
            if (!abm_ex16) {
              this.$message.warning("请选择第" + (index) + "行共同家庭成员民族");
              this.isSave = false;
              return false;
            }
            else if (!abm_ex7) {
              this.$message.warning("请选择第" + (index) + "行共同家庭成员户口性质");
              this.isSave = false;
              return false;
            }
            else if (!abm_ex28) {
              this.$message.warning("请选择第" + (index) + "行共同家庭成员婚姻状况");
              this.isSave = false;
              return false;
            } else if (!abm_ex11) {
              this.$message.warning("请填写第" + (index) + "行共同家庭成员健康状况");
              this.isSave = false;
              // this.isSaves=false
              return false;
            } else if (abm_ex11 == '重病' && !abm_ex52) {
              this.$message.warning("请填写第" + (index) + "行共同家庭成员重病病种");
              this.isSave = false;
              // this.isSaves=false
              return false;
            } else if (abm_ex11 == '残疾' && !abm_ex39) {
              this.$message.warning("请填写第" + (index) + "行共同家庭成员残疾种类以及等级");
              this.isSave = false;
              // this.isSaves=false
              return false;
            } else if (abm_ex11 == '残疾' && abm_ex39 && !abm_ex40) {
              this.$message.warning("请填写第" + (index) + "行共同家庭成员残疾等级");
              this.isSave = false;
              // this.isSaves=false
              return false;
            } else if (!abm_ex49) {
              this.$message.warning("请填写第" + (index) + "行共同家庭成员劳动能力");
              this.isSave = false;
              // this.isSaves=false
              return false;
            } else if (!abm_ex14) {
              this.$message.warning("请填写第" + (index) + "行共同家庭成员职业状况");
              this.isSave = false;
              // this.isSaves=false
              return false;
            } else if (!abm_ex15) {
              console.log(abm_ex15);
              this.$message.warning("请填写第" + (index) + "行共同家庭成员工作单位");
              this.isSave = false;
              // this.isSaves=false
              return false;
            }

            if (this.tableData[i].abm_ex1.indexOf("户主") != -1 || this.tableData[i].abm_ex1.indexOf("户主本人") != -1) {
              huzhu++;
            }
          }

          // 4.11新增验证排查年龄不是未成年、老年人 特定对象选择未成年、老年人的数据
          if (abm_ex51 == '未成年人' && age >= 18) {
            this.$message.warning("第" + (index) + "行共同家庭成员已满18岁，特定对象选择项非法");
            this.isSaves = false
            return false
          } else if (abm_ex51 == '老年人' && age < 60) {
            this.$message.warning("第" + (index) + "行共同家庭成员未满60岁，特定对象选择项非法");
            this.isSaves = false
            return false
          }

          if (age >= 60 || age < 18) {
            if (abm_ex51 == "") {
              this.$message.warning("请选择第" + (index) + "行共同家庭成员特定对象");
              this.isSaves = false
              return false
            }
            // console.log( '年龄=>',this.tableData[index].age >= 60);
            // console.log( '年龄=>',age >= 60);
            // console.log( '年龄=>',age );
            // console.log('特定对象=>',abm_ex51!="老年人");

            if (age >= 60 && !(['老年人', '独居', '退役军人', '归侨'].includes(abm_ex51))) {
              isSpecial_1 += isSpecial_1 == '' ? abm_ex3 : +' ' + abm_ex3;
              haveOld = true;
            } else if (age < 18 && !(['未成年人', '独居', '退役军人', '归侨'].includes(abm_ex51))) {
              isSpecial_2 += isSpecial_2 == '' ? abm_ex3 : +' ' + abm_ex3;
              haveYoung = true;
            }
          }

          // 计算共同生活家庭成员申请人的姓名、身份证的数量，检测是否有重复姓名身份证
          if (this.auditValue.ab_ex3 == this.tableData[i].abm_ex3) {
            nameSame++;
            if (this.auditValue.ab_ex7 == this.tableData[i].abm_ex2) {
              IDCardSame++;
            }
          }
        }

        // console.log('人均月',this.income7[2].abi_ex2);
        // console.log(this.income7[2].abi_ex2 < this.dbStandard);
        // console.log(this.dbStandard);

        if (this.ab_ex13 == '按人保') {
          if (this.income7[2].abi_ex2 * 1 > this.dbStandard * 2) {
            this.$message.warning("本户人均月收入超出" + this.dbStandard * 2 + "元救助标准，无法转办！");
            this.isSaves = false
            return false
          } else if (this.income7[2].abi_ex2 * 1 < this.dbStandard) {
            this.$message.warning("本户人均月收入低于" + this.dbStandard + "元救助标准，无法转办！");
            this.isSaves = false
            return false
          }

        }

        var SpecialPrompt = "";
        console.log('老年人=》', isSpecial_1);
        console.log('未成年人=》', isSpecial_2);
        console.log('有老年人=》', haveOld);
        console.log('有未成年人=》', haveYoung);

        SpecialPrompt = haveOld ? "<b>" + isSpecial_1 + "</b>  请将特定对象选择 <b>老年人</b> ，有 10% 的增发补贴，当前选择的特定对象无增发补贴，是否继续保存？" : SpecialPrompt;
        SpecialPrompt = haveYoung ? "<b>" + isSpecial_2 + "</b>  请将特定对象选择 <b>未成年人</b> ，有 10% 的增发补贴，当前选择的特定对象无增发补贴，是否继续保存？" : SpecialPrompt;
        SpecialPrompt = (haveOld && haveYoung) ? "<b>" + isSpecial_1 + "</b> 的特定对象选择 <b>老年人</b> ，将有 10% 的增发补贴，当前选择的特定对象无增发补贴<br>" +
          "<br><b>" + isSpecial_2 + "</b>  请将特定对象选择 <b>未成年人</b> ，有 10% 的增发补贴，当前选择的特定对象无增发补贴，是否继续保存？" : SpecialPrompt;

        console.log('是否有年龄特定对象 =》', SpecialPrompt);

        if (SpecialPrompt != '') {
          await this.$confirm(SpecialPrompt, '系统提示', {
            dangerouslyUseHTMLString: true,
            confirmButtonText: '保存',
            cancelButtonText: '取消',
            customClass: 'myClass1'

          }).then(() => {
            console.log("保存成功");
            this.isSaves = true;
          })
            .catch(action => { // 取消留在本页
              this.isSaves = false;
              return false;
            });
        }


        if (this.tableData.length > 0) {
          if (nameSame == IDCardSame) {
            if (nameSame == 1) {
              console.log("申请人是共同家庭成员");
            } else if (nameSame > 1) {
              this.$message.warning('共同生活家庭成员姓名重复！');
              this.isSave = false;
              return false
            } else if (nameSame < 1) {
              this.$message.warning('共同生活家庭成员缺少申请人姓名！');
              this.isSave = false;
              return false
            }
          } else {
            if (nameSame == 1) {
              this.$message.warning('共同生活家庭成员户主身份证号和姓名与申请人的不一致！');
              this.isSave = false;
              return false
            } else if (nameSame < 1) {
              this.$message.warning('共同生活家庭成员缺少申请人姓名！');
              this.isSave = false;
              return false
            } else if (nameSame > 1) {
              // alert()
              this.$message.warning('共同生活家庭成员姓名重复！');
              this.isSave = false;
              return false
            }
          }
        }

        if (huzhu < 1) {
          this.$message.warning("共同生活家庭成员必须有一位户主");
          this.isSave = false;
          return false;
        } else if (huzhu > 1) {
          this.$message.warning("共同生活家庭成员只能有一位户主");
          this.isSave = false;
          return false;
        }
      }

      // 非共同生活赡抚养人没填全保存不了
      for (let i in this.tableData2) {
        for (let j in this.tableData2[i]) {
          if (this.keyVerification2(i, this.tableData2[i], "f2." + j) == false) {
            this.isSave = false;
            // this.isSaves=false
            return false;
          }
        }
        this.tableData2[i].abm_ex6 = "N"
        let abm_ex3 = this.tableData2[i].abm_ex3;
        let abm_ex2 = this.tableData2[i].abm_ex2;
        let abm_ex1 = this.tableData2[i].abm_ex1;
        let abm_ex11 = this.tableData2[i].abm_ex11;
        let abm_ex49 = this.tableData2[i].abm_ex49;
        let index = Number(i) + 1;
        if (!abm_ex3 && !abm_ex1 && !abm_ex2 && !abm_ex11) {
          console.log('都没填跳过');
        } else {
          if (!abm_ex3) {
            this.$message.warning("请填写第" + (index) + "行非共同生活赡扶抚养人姓名");
            this.isSave = false;
            // this.isSaves=false
            return false;
          }
          else if (!abm_ex1) {
            this.$message.warning("请选择第" + (index) + "行非共同生活赡扶抚养人与申请人的关系");
            this.isSave = false;
            // this.isSaves=false
            return false;
          }
          else if (!abm_ex2 || abm_ex2) {
            this.tableData2[i].abm_ex2 = abm_ex2.replace(/x$/i, "X");
            let msg = isCardID(abm_ex2);
            console.log(abm_ex2)
            if (msg != true) {
              this.$message.warning("第" + (index) + "行非共同生活赡扶抚养人" + msg);
              this.isSave = false;
              // this.isSaves=false
              return false;

            } else {
              // this.tableData2[i].abm_ex4=this.getBirthdayFromIdCard(abm_ex2);//abm_ex4已被取消
              this.tableData2[i].abm_ex5 = this.getSex(abm_ex2);
              this.tableData2[i].age = this.getAge(abm_ex2);
            }
          }
          if (!abm_ex11) {
            this.$message.warning("请填写第" + (index) + "行非共同生活赡扶抚养人健康状况");
            this.isSave = false;
            // this.isSaves=false
            return false;

          } else if (!abm_ex49) {
            this.$message.warning("请填写第" + (index) + "行非共同生活赡扶抚养人劳动能力");
            this.isSave = false;
            // this.isSaves=false
            return false;
          }
        }
      }

      // 收入数据保存过滤 : 遍历收入，如果计入收入名称、金额为空，则去除该行，否则进行数据格式验证
      // 1.工资、
      // if(this.income1.length>0){

      // 	for(let i in this.income1){

      // 		let abi_ex1=this.income1[i].abi_ex1;
      // 		let abi_ex2=this.income1[i].abi_ex2;
      // 		if(!abi_ex1 && !abi_ex2 ){
      // 			this.income1.splice(i,1);
      // 			--i;
      // 			console.log(this.income1);
      // 			break;
      // 		}
      // 		else if(!abi_ex1 && abi_ex2){
      // 			this.$message.warning("请将第"+(Number(i)+1)+"行工资性收入计入收入名称补充完整");
      // 			this.isSave = false;
      // 			// this.isSaves=false
      // 			return false;
      // 		}else if(abi_ex1 && !abi_ex2){
      // 			this.$message.warning("请将第"+(Number(i)+1)+"行工资性收入金额补充完整");
      // 			this.isSave = false;
      // 			return false;
      // 		}
      // 		// var icoArr=[]
      // 		for(let j in this.income1[i]){
      // 			if(this.changeAmt(i,this.income1[i],"ico1."+j)==false){
      // 				this.isSave=false;
      // 				return false;
      // 			}
      // 		}
      // 	}
      // }

      // if(this.income1.length==0){
      // 	this.$message.warning("请填写家庭12个月收入，工资性收入");
      // 		this.isSave=false;
      // 		// this.isSaves=false
      // 		return false;
      // }
      // // 2.经营
      // if(this.income2.length>0){
      // 	for(let i=0; this.income2.length>i;i++){
      // 		let abi_ex1=this.income2[i].abi_ex1;
      // 		let abi_ex2=this.income2[i].abi_ex2;
      // 		if( !abi_ex1 &&!abi_ex2 ){
      // 			this.income2.splice(i,1);
      // 			--i;
      // 		}
      // 		else if(abi_ex1 && !abi_ex2){
      // 			this.$message.warning("请将第"+(Number(i)+1)+"行经营性收入金额补充完整");
      // 			this.isSave=false;
      // 			// this.isSaves=false
      // 			return false;
      // 		}
      // 		for(let j in this.income2[i]){
      // 			if(this.changeAmt(i,this.income2[i],"ico2."+j)==false){
      // 				this.isSave=false;
      // 				// this.isSaves=false
      // 				return false;
      // 			}
      // 		}
      // 	}
      // }
      // if(this.income2.length==0){
      // 	this.$message.warning("请填写家庭12个月收入，经营性收入");
      // 		this.isSave=false;
      // 		// this.isSaves=false
      // 		return false;
      // }
      // // 3.财产、
      // if(this.income3.length>0){
      // 	for(let i=0; this.income3.length>i;i++){
      // 		let abi_ex1=this.income3[i].abi_ex1;
      // 		let abi_ex2=this.income3[i].abi_ex2;
      // 		if(!abi_ex1 && !abi_ex2 ){
      // 			this.income3.splice(i,1)
      // 			--i;
      // 		}
      // 		else if(!abi_ex1 && abi_ex2){
      // 			this.$message.warning("请将第"+(Number(i)+1)+"行财产性收入计入收入名称补充完整");
      // 			this.isSave=false;
      // 			// this.isSaves=false
      // 			return false;
      // 		}else if(abi_ex1 && !abi_ex2){
      // 			this.$message.warning("请将第"+(Number(i)+1)+"行财产性收入金额补充完整");
      // 			this.isSave=false;
      // 			// this.isSaves=false
      // 			return false;
      // 		}
      // 		for(let j in this.income3[i]){
      // 			if(this.changeAmt(i,this.income3[i],"ico3."+j)==false){
      // 				this.isSave=false;
      // 				// this.isSaves=false
      // 				return false;
      // 			}
      // 		}
      // 	}
      // }
      // if(this.income3.length==0){
      // 	this.$message.warning("请填写家庭12个月收入，财产净收入");
      // 		this.isSave=false;
      // 		// this.isSaves=false
      // 		return false;
      // }
      // // 4.转移、
      // if(this.income4.length>0){
      // 	for(let i=0; this.income4.length>i;i++){
      // 		let abi_ex1=this.income4[i].abi_ex1;
      // 		let abi_ex2=this.income4[i].abi_ex2;
      // 		if(!abi_ex1 && !abi_ex2 ){
      // 			this.income4.splice(i,1)
      // 			--i;
      // 		}
      // 		else if(!abi_ex1 && abi_ex2){
      // 			this.$message.warning("请将第"+(Number(i)+1)+"行转移净收入入收入名称补充完整");
      // 			this.isSave=false;
      // 			return false;
      // 		}else if(abi_ex1 && !abi_ex2){
      // 			this.$message.warning("请将第"+(Number(i)+1)+"行转移净收入金额补充完整");
      // 			this.isSave=false;
      // 			return false;
      // 		}
      // 		for(let j in this.income4[i]){
      // 			if(this.changeAmt(i,this.income4[i],"ico4."+j)==false){
      // 				this.isSave=false;
      // 				return false;
      // 			}
      // 		}
      // 	}
      // }
      // if(this.income4.length==0){
      // 	this.$message.warning("请填写家庭12个月收入，转移净收入");
      // 		this.isSave=false;
      // 		return false;
      // }

      // 5.其他收入
      if (this.income5.length > 0) {
        for (let i = 0; this.income5.length > i; i++) {

          let abi_ex1 = this.income5[i].abi_ex1;
          let abi_ex2 = this.income5[i].abi_ex2;

          if (!abi_ex1 && !abi_ex2) {
            this.income5.splice(i, 1)
            --i;
          }

          else if (abi_ex1 && !abi_ex2) {
            this.$message.warning("请将第" + (Number(i) + 1) + "行其他收入金额补充完整");
            this.isSave = false;
            return false;
          }
          for (let j in this.income5[i]) {
            if (this.changeAmt(i, this.income5[i], "ico5." + j) == false) {
              this.isSave = false;
              return false;
            }
          }
        }
      }
      if (this.income5.length == 0) {
        this.$message.warning("请填写家庭12个月收入，其他收入");
        this.isSave = false;
        return false;
      }
      // 6.必要就业成
      if (this.income6.length > 0) {
        for (let i = 0; this.income6.length > i; i++) {
          let abi_ex1 = this.income6[i].abi_ex1;
          let abi_ex2 = this.income6[i].abi_ex2;
          if (!abi_ex1 && !abi_ex2) {
            this.income6.splice(i, 1)
            --i;
          }
          else if (abi_ex1 && !abi_ex2) {
            this.$message.warning("请将第" + (Number(i) + 1) + "行必要就业成本抵扣金额补充完整");
            this.isSave = false;
            return false;
          }
          for (let j in this.income6[i]) {
            if (this.changeAmt(i, this.income6[i], "ico6." + j) == false) {
              this.isSave = false;
              return false;
            }
          }
        }
      }
      if (this.income6.length == 0) {
        this.$message.warning("请填写家庭12个月收入，必要就业成本抵扣");
        this.isSave = false;
        return false;
      }

      //支出保存验证
      console.log(this.pay.abp_ex8, "总支出");

      if (this.pay.abp_ex4 == "") {
        this.$message.warning("家庭前12个月支出情况，医疗支出不能为空");
        this.isSave = false;
        return false;
      }
      if (this.pay.abp_ex5 == "") {
        this.$message.warning("家庭前12个月支出情况，教育支出不能为空");
        this.isSave = false;
        return false;
      }
      if (this.pay.abp_ex6 == "") {
        this.$message.warning("家庭前12个月支出情况，残疾康复费用支出不能为空");
        this.isSave = false;
        return false;
      }
      if (this.pay.abp_ex11 == "") {
        this.$message.warning("家庭前12个月支出情况，因灾、因意外事故费用支出不能为空");
        this.isSave = false;
        return false;
      }
      if (this.pay.abp_ex7 == "") {
        this.$message.warning("家庭前12个月支出情况，其他支出不能为空");
        this.isSave = false;
        return false;
      }
      if (this.pay.abp_ex8 == "") {
        this.$message.warning("家庭前12个月支出情况，家庭总支出不能为空");
        this.isSave = false;
        return false;
      }
      // 导入数据可不传，但传时要传完
      console.log('saveZB 图片材料=>', this.imgArr.ab_ex10_len);
      if (data.ab_ex202 == '' || data.ab_ex202 != '') {
        // 每位共同生活家庭成员上传两张身份证照片
        if (this.imgArr.ab_ex10_len.length > 0) {
          if (this.imgArr.ab_ex10_len.length < 2 * (this.tableData.length - this.jisuan.familyChildrens)) {
            this.$message.warning("请确保每位 成年的 共同生活家庭成员上传两张身份证照片!");
            isSave = false;
            this.isSaves = false
            return false;
          }
        }
      } else {// 正常数据照片必传
        // 每位共同生活家庭成员上传两张身份证照片
        if (this.imgArr.ab_ex10_len.length < 2 * (this.tableData.length - this.jisuan.familyChildrens)) {
          this.$message.warning("请确保每位 成年的 共同生活家庭成员上传两张身份证照片!");
          isSave = false;
          this.isSaves = false;
          return false;
        }
      }

      // 支出格式校验
      for (let i in this.pay) {
        if (this.changeAmt3(this.pay[i], "pay." + i) == false) {
          this.isSave = false;
          // this.isSaves=false
          return false;
        }
      }

      if (this.typeData.ab_ex13 == "") {
        this.$message.error('请选择转办类型');
        this.isSave = false;
        return false;
      }

      var assistanceType = this.changeJS().join("，");
      if (!assistanceType) {
        assistanceType = "您不符合救助条件"
      }

      var newHelpType = this.jsjgString.split("，");
      var sameType = false;  //转办类型是否符合计算类型
      var typename = '';     //转办类型转化字符串

      if (this.typeData.ab_ex13 == '家庭边缘') {
        typename = '单人保家庭';
      } else if (this.typeData.ab_ex13 == '支出贫困') {
        typename = '支出性困难家庭'
      } else if (this.typeData.ab_ex13 == '特困供养') {
        typename = '特困人员供养'
      } else if (this.typeData.ab_ex13 == '低保' && this.typeData.ab_ex41 == '低收入型低保') {
        typename = '最低生活保障-按户保'
      } else if (this.typeData.ab_ex13 == '低保' && this.typeData.ab_ex41 == '重病型单列户施保') {
        typename = "最低生活保障-按人保-重病单人保"
      } else if (this.typeData.ab_ex13 == '低保' && this.typeData.ab_ex41 == '残疾人单列户施保') {
        typename = "最低生活保障-按人保-重残单人保"
      }

      if (this.ab_ex13 == '按人保') {
        if (this.income7[2].abi_ex2 > this.dbStandard * 2) {
          this.$message.warning("本户收入超出救助标准");
          this.isSaves = false;
          return false;
        }

      }

      sameType = newHelpType.includes(typename)  //救助是否有符合转办的救助类型
      const narr = newHelpType.filter(value => value != typename)
      // for(let i in newHelpType){
      // 	sameType=false;
      // 	console.log(typename,newHelpType[i],'结果');
      // 	if(typename == newHelpType[i]){
      // 		sameType = true;break;
      // 	}
      // }
      console.log(this.jsjgString, '计算结果');
      console.log(newHelpType, '符合救助数组');
      console.log(this.typeData.ab_ex13, '选择转办类型');
      console.log(typename, '转办转化内容');
      console.log(sameType, '是否符合转办');
      console.log(narr, '同时符合的其他类型');
      // console.log(newHelpType.length,'符合数组长度');
      // console.log(this.isSave,'是否保存');

      this.isSave2 = false;  //不符合转办条件
      // if(!this.isSave2){
      var addString = '';
      var toDiBao = false
      console.log(this.typeData.ab_ex13, typename);
      // 救助有符合转办的救助类型
      if (sameType == true) {
        if (newHelpType.length == 1) {
          addString = this.auditValue.ab_ex3 + "符合<b style='color:red;'> " + typename + " </b>转办条件，是否继续？"
        } else if (newHelpType.length > 1) {
          if (typename == '支出性困难家庭') {
            addString = this.auditValue.ab_ex3 + "符合<b> " + typename + " </b>转办条件，但是会先转办为<b style='color:red;'> 单人保家庭 </b>办结后 自动提取到<b> " + typename + " </b>办结流程中 是否继续？"
            // <br>且同时符合<b> "+narr.join('，')+" </b>

          } else {
            addString = this.auditValue.ab_ex3 + "符合<b style='color:red;'> " + typename + " </b>转办条件，是否继续？"
          }
        }
      } else {
        if (newHelpType.length == 1) {
          if (this.typeData.ab_ex13 == '低保' && newHelpType[0] == '特困人员供养') {
            addString = this.auditValue.ab_ex3 + "符合<b style='color:red;'> " + newHelpType[0] + " </b>救助，但是希望转到<b> " + this.ab_ex13 + " </b>救助，是否继续？"
            toDiBao = true;
          } else {
            addString = this.auditValue.ab_ex3 + '不符合转办条件' + '，是否继续？'
            this.isSave = false;
            this.isSave2 = false;
          }
        } else {
          addString = this.auditValue.ab_ex3 + '不符合转办条件' + '，是否继续？'
          this.isSave = false;
          this.isSave2 = false;
        }
      }
      // await this.$confirm( assistanceType + '，是否继续保存？',"通过政策计算"+this.dibaoForm.ab_ex3+"您可能符合如下救助条件", {
      this.$confirm(addString, '政策计算器提醒', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '继续',
        cancelButtonText: '取消',
        customClass: 'myClass1'
      }).then(async () => {
        if (newHelpType.length > 1 && typename == '支出性困难家庭') {
          this.typeData.ab_ex13 = '家庭边缘'

        }
        if (toDiBao) {
          sameType = true;
        }
        // 符合转办
        if (sameType) {

          // console.log("保存成功1");
          var income7 = [];
          income7.push(this.income7[0]);
          data.ab_ex27 = '同意';

          // 保存按钮禁用
          this.saveDisabled = true;

          await this.saveBasiccs({
            "data": "[" + JSON.stringify(data) + "]",
            "sId": this.sId,
            'typeData': "[" + JSON.stringify(this.typeData) + "]",
            "pay": '[' + JSON.stringify(this.pay) + ']',
            "member": JSON.stringify(this.tableData.concat(this.tableData2)),
            // "income":  JSON.stringify(this.income5.concat(this.income6).concat(income7)),
            "income": JSON.stringify(this.income1.concat(this.income2).concat(this.income3).concat(this.income4).concat(this.income5).concat(this.income6).concat(income7)),
          })
            .then((res) => {
              console.log(res, 'then');
              if (res[0].status == "+OK") {
                this.loading = false;
                this.$message.success(res[0].msg)
                this.closeView();
              } else {
                this.loading = false;
                this.$message.error(res[0].msg)
              }
            }).catch((res) => {
              // 数据请求成功删除定时器
              console.log('catch', res.response.data[0].status);
              if (res.response.data[0].status == "+OK") {
                console.log(res, 'catch');
                this.loading = false;
                this.$message.success(res.response.data[0].msg)
                this.closeView()
              } else {
                this.loading = false;
                this.$message.error(res.response.data[0].msg)
              }
            })
          console.log("符合-转办成功");
          this.dialogChangeForm = false;
        } else {
          console.log("不符合-取消转办");
        }
        // this.dialogChangeForm = false;
      })
        .catch(action => {
          // 取消留在本页

          // this.dialogChangeForm = false;
          console.log("留在本页");
          return false;
        });
      // }
    },

    // 初审保存
    async save (data) {
      console.log(data.ab_ex27, data);
      if (this.tableData.length < 1) {
        this.$message.error('共同生活家庭不全，退回重新核查完善本户数据');
        this.isSave = false;
        return false;
      }
      if (!data.ab_ex27) {
        this.$message.error('请选择审核意见');
        this.isSave = false;
        return false;
      }
      else if (data.ab_ex27 == "同意") {
        if (data.ab_ex13 == '特困供养') {
          if (data.ab_ex71 == '') {
            this.$message.warning("特困供养方式不能为空");
            this.isSave = false;
            return false;
          }
          if (data.ab_ex199 == '') {
            this.$message.warning("护理费不能为空");
            this.isSave = false;
            return false;
          }
          if (data.ab_ex195 == '' && (data.ab_ex71 == '集中供养' || data.ab_ex71 == '集中')) {
            this.$message.warning("供养机构不能为空");
            this.isSave = false;
            return false;
          }
          if (data.ab_ex198 == '') {
            this.$message.warning("生活自理能力不能为空");
            this.isSave = false;
            return false;
          }
          if (data.ab_ex200 == '') {
            this.$message.warning("生活费不能为空");
            this.isSave = false;
            return false;
          }
          if (data.ab_ex196 == '') {
            if (data.ab_ex202 == '' || data.ab_ex202 != '') {
              this.$message.warning("自理能力状况评估报告不能为空");
              this.isSave = false;
              return false;
            } else {
              this.isSave = true;
            }

          }
          if (data.ab_ex197 == '') {
            if (data.ab_ex202 == '' || data.ab_ex202 != '') {
              this.$message.warning("集中供养意愿书不能为空");
              this.isSave = false;
              return false;
            } else {
              this.isSave = true;
            }

          }
          if (data.ab_ex202 == '' || data.ab_ex202 != '') {
            if (data.ab_ex196 != '' && this.imgNum.ab_ex196_len > 1) {
              this.$message.warning("自理能力状况评估报告只能上传一张");
              this.isSave = false;
              return false;
            }
            if (data.ab_ex197 != '' && this.imgNum.ab_ex197_len > 1) {
              this.$message.warning("集中供养意愿书只能上传一张");
              this.isSave = false;
              return false;
            }
          }
        }
        if ((data.ab_ex13 == '特困供养' || data.ab_ex13 == '低保') && data.ab_ex202 != '') {
          if (data.ab_ex4 == '') {//用户籍地址作为导入数据是否补录验证
            this.$message.error('本户未进行补录，请返回列表页点击修改补充本户数据');
            this.isSave = false;
            return false;
          } else {
            this.isSave = true;
          }
        }
        // 非导入 进行 核对报告验证 // 有核对报告或导入不进行弹框提示
        // 特殊账号 不进行核对报告验证
        // var specialAccount = isSpecialAccount();
        if (data.ab_ex202 != "临时放行" && process.env.NODE_ENV != "development" && !this.specialAccount) {
          // 不放行，非特殊账号进行核对报告检测
          // if(data.ab_ex202 != "临时放行" && !this.specialAccount){
          // if(data.ab_ex202 != "临时放行"){
          var HD = await this.getFamilyHDPDF(data);
          console.log('awite save1 验证');
          if (!HD) {
            console.log('审核执行拦截，无核对报告且非导入进行弹框提示');
            this.isSave = false;
            return false;
          } else {
            console.log('审核执行同意，有核对报告或导入不进行弹框提示');
            this.isSave = true;
          }
        }
        // 身份证重复验证 //调用这个方法的时候就让 isSave = true 或false 了
        this.isSameIDcard();
      }

      if (data.ab_ex27 == "退回") {
        if (data.ab_ex25 == "") {
          this.$message.error('请选择退回原因');
          this.isSave = false;
          return false;
        } else if (data.ab_ex25 == "其他" && data.ab_ex178 == '') {
          this.$message.error('请填写退回描述');
          this.isSave = false;
          return false;
        }
        else if (!['其他', '死亡'].includes(data.ab_ex25) && data.ab_ex175 == '') {
          if (data.ab_ex202 != '' || data.ab_ex202 == '') {
            this.$message.error('请上传退回材料');
            this.isSave = false;
            return false;
          } else {
            this.isSave = true;
          }
        }
        else {
          this.isSave = true;
        }
      }

      if (this.isSave) {
        this.typeData.ab_ex13 = '';
        this.typeData.ab_ex41 = '';
        // this.loading = true;
        // 设置定时器，30秒请求失败刷新页面
        let time = setTimeout(() => {
          this.loading = false;
          this.$emit("closes", false)
          this.$message.error("网络异常");
          this.$router.go(-1)
        }, 30000)



        // console.log('save this.saveDisabled=>',this.saveDisabled);

        // 保存按钮禁用
        this.saveDisabled = true;
        data.ab_ex25 = data.ab_ex25.replace(/\s/g, "")
        this.saveBasiccs({
          "data": "[" + JSON.stringify(data) + "]",
          "sId": this.sId,
          'typeData': "[" + JSON.stringify(this.typeData) + "]",
          'children': JSON.stringify(this.childrenWarning),
          // "pay": '[' + JSON.stringify(this.pay) + ']',
          // "member": JSON.stringify(this.tableData.concat(this.tableData2)),
          // "income":  JSON.stringify(this.income1.concat(this.income2).concat(this.income3).concat(this.income4).concat(this.income5).concat(this.income6).concat(income7)),
        }).then((res) => {
          if (res[0].status == "+OK") {
            this.loading = false;
            this.$message.success(res[0].msg)
            this.closeView();
          } else {
            this.loading = false;
            this.$message.error(res[0].msg)
          }
        }).catch((res) => {

          clearTimeout(time);
          console.log(res.response.data[0].status);
          if (res.response.data[0].status == "+OK") {

            this.loading = false;
            this.$message.success(res.response.data[0].msg)
            this.closeView()

          } else {
            this.loading = false;
            this.$message.error(res.response.data[0].msg)
          }
        })
      }
    },
    //公示保存
    async save2 (data) {
      // console.log( data.ab_ex97=='' , data.ab_ex34);
      // console.log( data.ab_ex97=='' , data.ab_ex34 == "有异议通过");
      // console.log( data.ab_ex97=='' && data.ab_ex34 == "有异议通过");

      // console.log(data)
      // 判断公示开始时间比公示结束时间早就取消保存
      // if(this.publicity.ab_dat9>this.publicity.ab_dat10){
      // 	this.$message.warning("公示结束时间比公示开始时间早")
      // 	return false
      // }

      console.log(this.isSave);
      console.log(data);

      if (data.ab_ex34 == "") {
        this.$message.error('请选择公示结果');
        this.isSave = false;
        return false
      } else if (["无异议", "有异议通过"].includes(data.ab_ex34)) {

        // 检验公示地点
        if (data.ab_ex47 == "") {
          this.$message.error('请输入公示地点');
          this.isSave = false;
          return false
        }
        // 检验公示图片
        if (["NULL", ''].includes(data.ab_ex98)) {
          this.$message.error('请上传公示图片');
          this.isSave = false;
          return false
        }
        // 检验民主评议
        if (data.ab_ex97 == "" && data.ab_ex34 == "有异议通过") {
          if (data.ab_ex202 == '' || data.ab_ex202 != '') {
            this.$message.error('请上传民主评议');
            this.isSave = false;
            return false
          } else {
            this.isSave = true;
          }
        } else {
          this.isSave = true;
        }

        // 检测身份证重复
        this.isSameIDcard();   //调用这个方法的时候就返回isSave = true 或false
        // 特殊账号 不进行核对报告验证
        // var specialAccount = isSpecialAccount();
        // 非导入才验证 2022.06.06导入数据复核已完成 改为都检测 核对报告  且非开发环境
        if ((data.ab_ex202 != '临时放行') && process.env.NODE_ENV != "development" && !this.specialAccount) {
          // 核对报告验证 //无核对报告弹框提示
          var HD = await this.getFamilyHDPDF(data);
          console.log('save2 awite验证');
          if (!HD) {
            console.log('公示执行拦截');
            this.isSave = false;
            return false;
          } else {
            console.log('公示执行同意');
            this.isSave = true;
          }
        }
        console.log("data.ab_ex34", this.isSave);
      }
      else if (data.ab_ex34 == "有异议退回") {
        // 检验公示地点
        if (data.ab_ex47 == "") {
          this.$message.error('请输入公示地点');
          this.isSave = false;
          return false
        }
        if (data.ab_ex35 == "") {
          this.$message.error('请选择退回原因');
          this.isSave = false;
          return false
        } else if (data.ab_ex35 == "其他" && data.ab_ex178 == "") {
          this.$message.error('请填报退回描述');
          this.isSave = false;
          return false
        } else if (data.ab_ex98 == "" || data.ab_ex98 == "NULL") {
          if (data.ab_ex202 == '' || data.ab_ex202 != '') {
            this.$message.error('请上传公示图片');
            this.isSave = false;
            return false
          } else {
            this.isSave = true;
          }
        }
        else if (data.ab_ex97 == "") {
          if (data.ab_ex202 == '' || data.ab_ex202 != '') {
            this.$message.error('请上传民主评议');
            this.isSave = false;
            return false
          } else {
            this.isSave = true;
          }
        }
        else if (!['其他', '死亡'].includes(data.ab_ex35) && data.ab_ex175 == "") {
          // else if(data.ab_ex175==""){
          if (data.ab_ex202 == '' || data.ab_ex202 != '') {
            // 有异议退回，退回原因选择其他可以不上传退回材料吗？---不能2022.06.06
            this.$message.error('请上传退回材料');
            this.isSave = false;
            return false;
          } else {
            this.isSave = true;
          }
        }
        else {
          this.isSave = true;
        }
      }
      else if (data.ab_ex34 == "退回") {
        if (data.ab_ex35 == "") {
          this.$message.error('请选择退回原因');
          this.isSave = false;
          return false
        } else if (data.ab_ex35 == "其他" && data.ab_ex178 == "") {
          this.$message.error('请填报退回描述');
          this.isSave = false;
          return false
        }
        else if (!['其他', '死亡'].includes(data.ab_ex35) && data.ab_ex175 == "") {
          if (data.ab_ex202 == '' || data.ab_ex202 != '') {
            this.$message.error('请上传退回材料');
            this.isSave = false;
            return false;
          } else {
            this.isSave = true;
          }
        }
        else {
          this.isSave = true;
        }
      }

      console.log(this.isSave, 'this.isSave');
      // return false

      if (this.isSave) {
        this.loading = true;

        // 保存按钮禁用
        this.saveDisabled = true;
        // 设置定时器，30秒请求失败刷新页面
        let time = setTimeout(() => {
          this.loading = false;
          this.$message.error("网络异常");
          this.$emit("closes", false)
          this.$router.go(-1)
        }, 30000)
        this.saveBasicgs({
          "data": "[" + JSON.stringify(data) + "]",
          "sId": this.sId,
          "ab_ex98": data.ab_ex98,
          "ab_ex97": data.ab_ex97,
          'children': JSON.stringify(this.childrenWarning),
        }).then((res) => {
          if (res[0].status == "+OK") {
            this.loading = false;
            this.$message.success(res[0].msg)
            this.closeView();
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
            this.closeView();
          } else {
            this.loading = false;
            this.$message.error(res.response.data[0].msg)
          }
        })
      }
    },

    // 特困保障金计算
    changeMoney (val, id) {
      // 生活费整数验证
      console.log(val, id);

      if (isNaN(val * 1)) {
        this.$message.warning('生活费只可填报数字！');
        return false;
      }

      // 生活费整数校验
      var float_num = this.ab_ex200 % 1;
      if (float_num > 0) {
        this.$message.warning('生活费请填报整数！');
        return false;
      }
      if (this.ab_ex200 < 0) {
        this.$message.warning('生活费不可填报负数！');
        return false;
      }

      this.approval.ab_ex38 = this.tkStandard; // 给标准赋值
      this.approval.ab_ex200 = this.ab_ex200;

      if (!isNaN(this.approval.ab_ex199 * 1) && !isNaN(this.approval.ab_ex200 * 1) && this.tableData.length != 0) {
        this.basicInf.ab_ex40 = ((this.approval.ab_ex199 * 1 + this.approval.ab_ex200 * 1) * this.tableData.length).toFixed(1)
      } else {
        this.basicInf.ab_ex40 = 0.0;
      }

      this.keyVerification(val, id)
    },
    // 审批
    async save3 (data) {

      console.log(data.ab_ex21);

      // for(let i in data){
      // 	if(this.keyVerification(data[i],i)==false){
      // 		// isSave=false;
      // 		this.isSave=false
      // 		return false;
      // 	}
      // }

      console.log(data)
      if (data.ab_ex21 == "") {
        this.$message.error('请选择审批意见');
        this.isSave = false;
        return false;
      } else if (data.ab_ex21 == "同意") {
        // if (data.ab_ex13 == '特困供养') {
        //   if (data.ab_ex71 == '') {
        //     this.$message.warning("特困供养方式不能为空");
        //     this.isSave = false;
        //     return false;
        //   }
        //   if (data.ab_ex199 == '') {
        //     this.$message.warning("护理费不能为空");
        //     this.isSave = false;
        //     return false;
        //   }

        //   if (data.ab_ex195 == '' && (data.ab_ex71 == '集中供养' || data.ab_ex71 == '集中')) {
        //     this.$message.warning("供养机构不能为空");
        //     this.isSave = false;
        //     return false;
        //   }
        //   if (data.ab_ex198 == '') {
        //     this.$message.warning("生活自理能力不能为空");
        //     this.isSave = false;
        //     return false;
        //   }
        //   if (data.ab_ex200 == '') {
        //     this.$message.warning("生活费不能为空");
        //     this.isSave = false;
        //     return false;
        //   }
        //   if (data.ab_ex196 == '') {
        //     if (data.ab_ex202 == '' || data.ab_ex202 != '') {
        //       this.$message.warning("自理能力状况评估报告不能为空");
        //       this.isSave = false;
        //       return false;
        //     } else {
        //       this.isSave = true;
        //     }

        //   }
        //   if (data.ab_ex197 == '') {
        //     if (data.ab_ex202 == '' || data.ab_ex202 != '') {
        //       this.$message.warning("集中供养意愿书不能为空");
        //       this.isSave = false;
        //       return false;
        //     } else {
        //       this.isSave = true;
        //     }

        //   }
        //   if (data.ab_ex202 == '' || data.ab_ex202 != '') {
        //     if (data.ab_ex196 != '' && this.imgNum.ab_ex196_len > 1) {
        //       this.$message.warning("自理能力状况评估报告只能上传一张");
        //       this.isSave = false;
        //       return false;
        //     }
        //     if (data.ab_ex197 != '' && this.imgNum.ab_ex197_len > 1) {
        //       this.$message.warning("集中供养意愿书只能上传一张");
        //       this.isSave = false;
        //       return false;
        //     }
        //   }
        // }


        this.isSameIDcard();  //调用这个方法的时候就返回isSave = true 或false
        console.log(this.isSave, 'isSave');

        // 非导入 进行 核对报告验证 // 有核对报告或导入不进行弹框提示 && process.env.NODE_ENV!="development"
        // 特殊账号 不进行核对报告验证
        // var specialAccount = isSpecialAccount();
        if (data.ab_ex202 != "临时放行" && process.env.NODE_ENV != "development" && !this.specialAccount) {
          // if(data.ab_ex202 != "临时放行"){
          var HD = await this.getFamilyHDPDF(data);
          console.log('save3 awite验证');
          if (!HD) {
            console.log('审批执行拦截');
            this.isSave = false;
            return false;
          } else {
            console.log('审批执行同意');
            this.isSave = true;
          }
        }

      } else if (data.ab_ex21 == "退回") {
        if (data.ab_ex26 == "") {
          this.$message.error('请选择退回原因');
          this.isSave = false;
          return false
        } else if (data.ab_ex26 == "其他" && data.ab_ex178 == "") {
          this.$message.error('请填报退回描述！');
          this.isSave = false;
          return false
        }
        else if (!['其他', '死亡'].includes(data.ab_ex26) && data.ab_ex175 == "") {
          if (data.ab_ex202 == '' || data.ab_ex202 != '') {
            this.$message.error('请上传退回材料！');
            this.isSave = false;
            return false;
          } else {
            this.isSave = true;
          }
        }
        else {
          this.isSave = true;
        }
      } else if (data.ab_ex21 == "驳回") {
        if (data.ab_ex26 == "") {
          this.$message.error('请填写驳回原因！');
          this.isSave = false;
          return false
        }
      }
      // console.log('审批数据=>',data);
      // data.ab_ex200=data.ab_ex200.toString()
      this.isSave = true;
      if (this.approval.ab_ex13 == '特困供养' && data.ab_ex21 == "同意") {
        // 基础信息填写格式验证

        if (this.keyVerification(data.ab_ex200, 'ab_ex200') == false) {
          return false;
        }
        else if (this.keyVerification(this.approval.ab_ex195, 'ab_ex195') == false) {
          return false;
        }
        let lifeValue = (this.approval.ab_ex200 * this.tableData.length).toFixed(2);
        console.log('家庭生活费=>', lifeValue);

        // 特困生活费提示
        await this.$confirm('请确认本户的<br>生活费为 <b>' + this.approval.ab_ex200 + ' 元/人</b><br>护理费为 <b>' + this.approval.ab_ex199 + ' 元/人</b><br>保障人数为<b> ' +
          this.tableData.length + '人</b><br>家庭月保障金合计为<span style="color:red">' + this.auditValue.ab_ex40 + '元</span>?', "提示", {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确认',
          cancelButtonText: '返回'
        }).then(() => {
          this.isSave = true;
        })
          .catch(action => {
            this.isSave = false;
            console.log("留在本页");
          });
      }

      if (this.isSave) {
        // console.log('保存');
        // return false
        this.loading = true;

        // 保存按钮禁用
        this.saveDisabled = true;
        // 设置定时器，30秒请求失败刷新页面
        let time = setTimeout(() => {
          this.loading = false;
          this.$emit("closes", false)
          this.$message.error("网络异常");
          this.$router.go(-1)
        }, 30000)
        this.saveBasicsh({
          "data": "[" + JSON.stringify(data) + "]",
          "sId": this.sId,
          'children': JSON.stringify(this.childrenWarning),
        }).then((res) => {
          if (res[0].status == "+OK") {
            this.loading = false;
            this.$message.success(res[0].msg)
            this.closeView()
          } else {
            this.loading = false;
            this.$message.error(res[0].msg)
          }
        }).catch((res) => {
          // 数据请求成功删除定时器
          console.log('审批返回标记 catch =>', res);
          clearTimeout(time);
          if (res.response.data.code === 200) {
            this.loading = false;
            this.$message.success(res.response.data.msg)
            this.closeView()
          } else {
            this.loading = false;
            this.$message.error(res.response.data.msg)
          }
        }).finally(() => {
          this.loading = false;
        })
      }
    },
    //初审 /.退回
    saveBasiccs (data) {
      let url = ''
      if (this.type == 'th') {
        console.log(data);
        url = "/social/assistance/saveBasicth"
      } else {
        console.log(data);
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

    // 获取核对列表
    getFamilyHDPDF (data) {
      // console.log(data.ab_ex202=='临时放行');
      // console.log(data.ab_ex41.indexOf('单列户施保')!=-1);
      if (data.ab_ex202 == '临时放行' || data.ab_ex41.indexOf('单列户施保') != -1) {
        console.log('无核对报告，临时放行或按人保可通过提交');
        this.isHDBG = true;
        return true
      }
      return request({
        headers: {
          Accept: "application/json",
        },
        url: '/social/assistance/getFamilyHDPDF',
        method: "post",
        data: {
          sId: this.$route.query.sId,
        },
      }).then((res) => { }).catch((res) => {
        console.log(data.ab_ex15, '业务节点');
        // data.ab_ex202='临时放行'
        console.log(data.ab_ex202, '202标记');
        if (res.response.status == 200) {       //返回成功200
          console.log("本户有无核对报告 =>", res.response.data.length > 0 ? '有' : '无');

          // 非开发环境进行校验
          // if(process.env.NODE_ENV!="development"){
          if (res.response.data.length == 0) { //判断是否有数据--无
            if ((data.ab_ex13 == '低保' || data.ab_ex13 == '特困供养') && data.ab_ex15 == '初审') {
              // 户籍地址为空，或一卡通开户银行为空 进行检验
              if (data.ab_ex4 == '' || data.ab_ex42 == '') {
                // if(data.ab_ex4 == '' ||  data.ab_ex42 == '' && data.ab_ex202 !='' ){
                // if(data.ab_ex10 == '' ||  data.ab_ex177 == '' && (data.ab_ex204 =='太极3月全量特困' || data.ab_ex204 =='太极3月全量低保')){
                this.$alert('该户信息不完整，请联系管理员进行反馈！', '提示', {
                  confirmButtonText: '确定',
                });
                this.isHDBG = false;
                // console.log('无核对报告，但是可与通过提交');
                return false
              }
              // 无核对报告，临时放行或按人保可通过提交
              else if (data.ab_ex202 == '临时放行' || data.ab_ex41.indexOf('单列户施保') != -1) {
                console.log('无核对报告，临时放行或按人保可通过提交');
                this.isHDBG = true;
                return true
              } else {
                this.$alert('该户暂无核对报告，请联系管理员进行反馈！', '提示', {
                  confirmButtonText: '确定',
                });
                this.isHDBG = false;
                console.log('无核对报告！！');
                return false;
              }
            } else {
              // 其他节点导入数据不验证核对报告
              // if(data.ab_ex4 == '' ||  data.ab_ex42 == '' && data.ab_ex202 !='' ){
              // if(data.ab_ex4 == '' ||  data.ab_ex42 == ''){
              // 	this.isHDBG = true;
              // 	console.log('无核对报告，但是导入数据可与通过提交');
              // 	return true
              // }else

              //  非临时放行 且 非按人保进行核对报告验证，
              if (data.ab_ex202 != '临时放行' && data.ab_ex41.indexOf('单列户施保') == -1) {
                // 非导入数据其他节点验证核对报告
                this.$alert('该户无核对报告，请联系管理员进行反馈！', '提示', {
                  confirmButtonText: '确定',
                });
                this.isHDBG = false;
                return false;
              } else {
                console.log('FamilyHDPDF 无核对报告，但临时放行');
                this.isHDBG = true;
                return true;
              }
            }

          }
          else {   //有核对报告
            console.log('FamilyHDPDF 有核对报告');
            this.isHDBG = true;
            return true;
          }
          // }else{ //本地环境 不验证核对报告
          // 	console.log('HDPDF 本地环境 ');
          // 	return true
          // }
        } else {
          this.$alert('网络异常', '提示', {
            confirmButtonText: '确定',
          });
          return false
        }
      })
    },

    //获取供养机构   机构id赋值
    getSupportinst () {
      console.log('供养机构名称=》', this.approval.ab_ex195);
      // this.approval.ab_ex201=1;
      const narr = this.supportinstList.filter(item => (item.abs_ex1 == this.approval.ab_ex195));
      console.log('供养机构对象=》', narr);
      this.approval.ab_ex201 = narr[0].abs_id;
    },

    //供养机构列表
    getSupportinstList () {
      return request({
        headers: {
          'Accept': 'application/json',
        },
        url: '/social/assistance/getSupportinstList',
        method: 'post',
        data: {}
      }).then(res => { }).catch(res => {
        console.log('getSupportinstList=>', res.response.data);
        this.supportinstList = res.response.data;
        console.log(this.supportinstList);
      })
    },

    closeView () {
      this.$emit("closes", false);
      this.$router.go(-1);
      if (process.env.NODE_ENV != "development") {
        this.$router.go(-1);
      }
    },

    // 健康状况
    changeMember (index) {
      let item = this.tableData[index];
      if (item.abm_ex11 == "重病") {
        item.abm_ex39 = "";
        item.abm_ex40 = "";
        if (item.age < 60 && item.age >= 18) this.$set(this.tableData[index], "abm_ex51", "重病");

      } else if (item.abm_ex11 == '残疾') {
        item.abm_ex52 = "";
        if (item.age < 60 && item.age >= 18) this.$set(this.tableData[index], "abm_ex51", "重残");
      } else {
        item.abm_ex39 = "";
        item.abm_ex40 = "";
        item.abm_ex52 = "";
      }
      this.changeAmt();
      // this.tddx(index)
    },
    selectable (row, index) {
      console.log(row, index);
      if (row.abm_ex1 == '户主') { // 条件
        return false;
      } else {
        return true;
      }
    },
    changeAmt (index, row, id) {
      // 工资收入
      var msg = ""
      if (id == "ico1.abi_ex2") {
        this.income1[index].abi_ex2 = row.abi_ex2.replace(/\s+/g, "");
        msg = isNum(row.abi_ex2, id, index);
        if (msg != true) {
          this.$message.warning(msg);
          this.isSaves = false;
          return false;
        }
      }
      // 经营收入
      if (id == "ico2.abi_ex2") {
        this.income2[index].abi_ex2 = row.abi_ex2.replace(/\s+/g, "");
        msg = isNum(row.abi_ex2, id, index);
        if (msg != true) {
          this.$message.warning(msg);
          this.isSaves = false;
          return false;
        }
      }
      // console.log(index,row,id);
      // 财产收入
      if (id == "ico3.abi_ex2") {
        this.income3[index].abi_ex2 = row.abi_ex2.replace(/\s+/g, "");
        msg = isNum(row.abi_ex2, id, index);
        if (msg != true) {
          this.$message.warning(msg);
          this.isSaves = false;
          return false;
        }
      }
      // 转移收入
      if (id == "ico4.abi_ex2") {
        this.income4[index].abi_ex2 = row.abi_ex2.replace(/\s+/g, "");
        msg = isNum(row.abi_ex2, id, index);
        if (msg != true) {
          this.$message.warning(msg);
          this.isSaves = false;
          return false;
        }
      }
      // 其他收入
      if (id == "ico5.abi_ex2") {
        this.income5[index].abi_ex2 = row.abi_ex2.replace(/\s+/g, "");
        msg = isNum(row.abi_ex2, id, index);
        if (msg != true) {
          this.$message.warning(msg);
          this.isSaves = false;
          return false;
        }
      }
      // 必要就业成本
      if (id == "ico6.abi_ex2") {
        this.income6[index].abi_ex2 = row.abi_ex2.replace(/\s+/g, "");
        // this.isNum(row.abi_ex2,id);
        msg = isNum(row.abi_ex2, id);
        if (msg != true) {
          this.$message.warning(msg);
          this.isSaves = false;
          return false;
        }
      }
      // 总收入
      if (id == "ico7.abi_ex2") {
        this.income7[index].abi_ex2 = row.abi_ex2.replace(/\s+/g, "");
        // this.isNum(row.abi_ex2,id);
        msg = isNum(row.abi_ex2, id);
        if (msg != true) {
          this.$message.warning(msg);
          this.isSaves = false;
          return false;
        }
      }

      // 基本信息-家庭人口-输入判断
      if (Number.isNaN(ab_ex5) || ab_ex5 == 0) {
        this.$message.warning("请输入家庭口数，或修改为阿拉伯数字");
        return false;
      }

      // 家庭收入
      var ab_ex5 = Number(this.auditValue.ab_ex5);
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
          abi_ex2_1 = 0;
        }
      }
      // console.log(abi_ex2_1);

      for (let i in this.income2) {
        if (this.income2[i].abi_ex2 != "" && !isNaN(Number(this.income2[i].abi_ex2))) {
          len++;
          abi_ex2_2 += Number(this.income2[i].abi_ex2)
        } else if (len == 0) {
          abi_ex2_2 = 0;
        }
      }

      for (let i in this.income3) {
        if (this.income3[i].abi_ex2 != "" && !isNaN(Number(this.income3[i].abi_ex2))) {
          len++;
          abi_ex2_3 += Number(this.income3[i].abi_ex2)
        } else if (len == 0) {
          abi_ex2_3 = 0;
        }
      }

      for (let i in this.income4) {
        if (this.income4[i].abi_ex2 != "" && !isNaN(Number(this.income4[i].abi_ex2))) {
          len++;
          abi_ex2_4 += Number(this.income4[i].abi_ex2)
        } else if (len == 0) {
          abi_ex2_4 = 0;
        }
        // console.log( this.income4);
      }

      for (let i in this.income5) {
        if (this.income5[i].abi_ex2 != "" && !isNaN(Number(this.income5[i].abi_ex2))) {
          len++;
          abi_ex2_5 += Number(this.income5[i].abi_ex2)
        } else if (len == 0) {
          abi_ex2_5 = 0;
        }
        // console.log( this.income5);
      }

      for (let i in this.income6) {
        if (this.income6[i].abi_ex2 != "" && !isNaN(Number(this.income6[i].abi_ex2))) {
          len++;
          abi_ex2_6 += Number(this.income6[i].abi_ex2)
        } else if (len == 0) {
          abi_ex2_6 = 0;
        }
        // console.log( this.income6);
      }
      // 各项收入为零则可输入总收入
      var amt = abi_ex2_1 != "" || abi_ex2_2 != "" || abi_ex2_3 != "" || abi_ex2_4 != "" || abi_ex2_5 != "" || abi_ex2_5 != "" ? abi_ex2_1 + abi_ex2_2 + abi_ex2_3 + abi_ex2_4 + abi_ex2_5 - abi_ex2_6 : this.income7[0].abi_ex2;

      amt = abi_ex2_1 + abi_ex2_2 + abi_ex2_3 + abi_ex2_4 + abi_ex2_5 - abi_ex2_6;

      this.income7[0].abi_ex2 = (amt).toFixed(2);
      this.income7[1].abi_ex2 = (amt / 12).toFixed(2);

      var income72 = {} //家庭月人均收入
      if (this.tableData.length > 0) {
        // this.income7[2].abi_ex2=(amt/12/this.tableData.length).toFixed(2);
        income72.abi_ex2 = (amt / 12 / this.tableData.length).toFixed(2);
        income72.abi_ex1 = '家庭月人均收入';
        this.income7.splice(2, 1, income72)
      } else {
        this.income7[2].abi_ex2 = "0.00";
      }

      var illness = 0;   //重病
      var disability = 0;  //殘疾
      var children = 0;   //未成年
      if (this.tableData.length > 0) {
        for (let j = 0; j < this.tableData.length; j++) {
          if (this.tableData[j].abm_ex11 == "残疾") {
            if (['一级残疾', '二级残疾', '一级', '二级'].includes(this.tableData[j].abm_ex40)) {
              disability++;
            } else if (['三级', '三级残疾'].includes(this.tableData[j].abm_ex40) && (this.tableData[j].abm_ex39 == '精神残疾' || this.tableData[j].abm_ex39 == '智力残疾')) {
              disability++;
            }
          }
          if (this.tableData[j].abm_ex11 == "重病") {
            illness++;
          }
          if (this.tableData[j].age < 18) {
            children++;
          }
        }
        // this.income7[2].abi_ex2=(amt/12/this.tableData.length).toFixed(2); //月人均
        this.jisuan.familyNum = (this.tableData.length)  //总人口
        this.jisuan.familyZB = illness;  //重病
        this.jisuan.familyZC = disability;  //重残
        this.jisuan.familyChildrens = children;  //儿童
      } else {
        this.income7[2].abi_ex2 = (amt / 12 / 1).toFixed(2);
        this.jisuan.familyZB = illness;  //重病
        this.jisuan.familyZC = disability;	//重残
        this.jisuan.familyNum = 0;     //总人口
        this.jisuan.familyChildrens = 0;      //儿童
      }

      if (this.tableData2.length > 0) {
        this.jisuan.familyFD = (this.tableData2.length)  //法定
      } else {
        this.jisuan.familyFD = 0;
      }

      // console.log(this.tableData.length,"this.tableData.length")

      //12个月支出计算
      var abp_ex4 = Number(this.pay.abp_ex4);
      var abp_ex5 = Number(this.pay.abp_ex5);
      var abp_ex6 = Number(this.pay.abp_ex6);
      var abp_ex7 = Number(this.pay.abp_ex7);
      var abp_ex8 = Number(this.pay.abp_ex8);
      var abp_ex11 = Number(this.pay.abp_ex11);
      // console.log("支出 "+abp_ex4,abp_ex5,abp_ex6,abp_ex7,abp_ex8,abp_ex11);

      if (Number.isNaN(abp_ex4)) {
        abp_ex4 = 0;
      }
      if (Number.isNaN(abp_ex5)) {
        abp_ex5 = 0;
      }
      if (Number.isNaN(abp_ex6)) {
        abp_ex6 = 0;
      }
      if (Number.isNaN(abp_ex7)) {
        abp_ex7 = 0;
      }
      if (Number.isNaN(abp_ex8)) {
        abp_ex8 = 0;
      }
      if (Number.isNaN(abp_ex11)) {
        abp_ex11 = 0;
      }
      var zzc = abp_ex4 != "" || abp_ex5 != "" || abp_ex6 != "" || abp_ex7 != "" || abp_ex11 != "" ? abp_ex4 + abp_ex5 + abp_ex6 + abp_ex7 + abp_ex11 : this.pay.abp_ex8;
      // console.log(abp_ex4,abp_ex5,abp_ex6,abp_ex7,abp_ex8,abp_ex11,"abp_ex4,abp_ex5,abp_ex6,abp_ex7,,abp_ex8,,abp_ex11")

      // 初次加载支出无数据zzc会为空，点击计算时会出错，这里给个判断是否为空，为空赋值
      if (zzc == null || zzc == "" || zzc == undefined) {
        zzc = 0.00;
      }

      this.pay.abp_ex8 = Number(zzc).toFixed(2);
      this.pay.abp_ex9 = Number(amt - zzc).toFixed(2);

      // 收入支出计算
      if (this.tableData.length == 0) {
        // console.log("length==0")
        this.jisuan.familyAmt = 0.00  //总收入
        this.jisuan.familyZzc = 0.00	//总支出
        this.pay.abp_ex10 = Number(this.pay.abp_ex9 / 1).toFixed(2);
        this.income7[2].abi_ex2 = Number(amt / 12 / 1).toFixed(2); //月人均

      } else {
        // console.log("lengt>0")
        this.jisuan.familyAmt = amt.toFixed(2)  //总收入
        this.jisuan.familyZzc = Number(zzc).toFixed(2)	//总支出
        this.pay.abp_ex10 = Number(this.pay.abp_ex9 / this.tableData.length).toFixed(2);
        this.income7[2].abi_ex2 = Number(amt / 12 / this.tableData.length).toFixed(2); //月人均
      }
      // this.income7
      for (let i in this.income) {

        if (this.income[i].abi_ex1 == "总收入") {
          this.income7[0].abi_id = this.income[i].abi_id
        }

      }

      // if( children>0 && this.jsjg[0]!="儿童救助"){
      // 	this.jsjg.push(this.kxsjz[0]); //困境儿童
      // }
      // console.log(this.jsjg,"救助计算结果");
    },

    // 支出、资产--正则验证
    changeAmt3 (key, id) {
      // 医疗
      let msg = "";
      if (id == "pay.abp_ex4") {
        this.pay.abp_ex4 = key.replace(/\s+/g, "");
        msg = isNum(key, id);
        if (msg != true) {
          this.$message.warning(msg);
          this.isSaves = false;
          return false;
        }
      }
      // 教育 5
      if (id == "pay.abp_ex5") {
        this.pay.abp_ex5 = key.replace(/\s+/g, "");
        msg = isNum(key, id);
        if (msg != true) {
          this.$message.warning(msg);
          this.isSaves = false;
          return false;
        }
      }
      // 残疾康复费用 6
      if (id == "pay.abp_ex6") {
        this.pay.abp_ex6 = key.replace(/\s+/g, "");
        msg = isNum(key, id);
        if (msg != true) {
          this.$message.warning(msg);
          this.isSaves = false;
          return false;
        }
      }
      // 因灾、因意外事故费用 11
      if (id == "pay.abp_ex11") {
        this.pay.abp_ex11 = key.replace(/\s+/g, "");
        msg = isNum(key, id);
        if (msg != true) {
          this.$message.warning(msg);
          this.isSaves = false;
          return false;
        }
      }
      // 其他支出 7
      if (id == "pay.abp_ex7") {
        this.pay.abp_ex7 = key.replace(/\s+/g, "");
        msg = isNum(key, id);
        if (msg != true) {
          this.$message.warning(msg);
          this.isSaves = false;
          return false;
        }
      }
      // abp_ex8家庭总支出
      if (id == "pay.abp_ex8") {
        this.pay.abp_ex8 = key.replace(/\s+/g, "");
        msg = isNum(key, id);
        if (msg != true) {
          this.$message.warning(msg);
          this.isSaves = false;
          return false;
        }
      }

      // 总支出
      if (id == "pay.abp_ex8") {
        this.pay.abp_ex8 = key.replace(/\s+/g, "");
        // this.isNum(key,id)
        msg = isNum(key, id);
        if (msg != true) {
          this.$message.warning(msg);
          this.isSaves = false;
          return false;
        }
      }
      // 支出计算
      this.changeAmt();
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
      // console.log(this.imgArr,"this.imgArr");
      // console.log(this.imgNum,"this.imgNum");
    },

    //获取图片索引
    getImgIndex (item) {
      let data = JSON.parse(item);
      this.imgIndex[data.id] = data.index;
    },
    // 图片移除
    handleRemove (file, str) {
      this.$confirm('是否删除该图片？', "提示", {
        // distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$delete(this.imgArr[str + "_len"], this.imgIndex[str]);
        this.basicInf[str] = this.imgArr[str + "_len"].join(",");
        this.getImgNum()  //获取图片数量
        // console.log(this.imgArr,'this.imgArr');
        // console.log(this.basicInf,'this.basicInf');
        // console.log(this.publicity,'this.publicity');
      })
        .catch(action => {
          // 取消留在本页
          console.log("留在本页");
        });
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
      this.isShow22 = true;
      this.isShow23 = true;
      this.isShow24 = true;

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
      } else if (n == 22) {
        this.isShow22 = false
      } else if (n == 23) {
        this.isShow23 = false
      } else if (n == 24) {
        this.isShow24 = false
      }
    },
    uploads (id) {
      this.dialogVisible3 = true;
      this.uploadId = id;
      try {
        this.$refs.myUpload.clears();
      } catch (e) { }
    },
    // 上传事件
    uploadEvent (data) {
      let val = this.publicity[this.uploadId];
      val = val == "" ? data : val + "," + data;
      this.publicity[this.uploadId] = val;
      // this.imgArr[this.uploadId+'_len'].push(data);
      this.imgArr[this.uploadId + "_len"] = this.publicity[this.uploadId].split(",");
      this.dialogVisible3 = false // 上传一个即关闭弹框

      // console.log(data); 
      // console.log(this.publicity,'--publicity');
      // console.log(this.imgArr,'--imgArr');
      this.getImgNum()  //获取图片数量
    },
    //获取性别
    getSex (card) {
      let sex = "";
      let msg = isCardID(card);
      // console.log(msg);
      if (msg == true) {
        if (parseInt(card.substr(16, 1)) % 2 == 1) {
          sex = "男";
        } else
          sex = "女";
      }
      return sex;
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
      // console.log(age)
      return age;
    },
    // changeCard(index,row){
    // 	// this.tableData[index].abm_ex5=this.getSex(this.tableData[index].abm_ex2);
    // 	this.tableData[index].age=this.getAge(this.tableData[index].abm_ex2);
    // 	if(this.tableData[index].age<16 || this.tableData[index].age>60){
    // 		this.tableData[index].work="否"
    // 	}else{
    // 		this.tableData[index].work="是"
    // 	}
    // },

    changeCard (index, row, id) {
      if (id == "f1.abm_ex2") {
        this.tableData[index].abm_ex2 = row.abm_ex2.replace(/\s+/g, "");
        this.tableData[index].abm_ex2 = row.abm_ex2.replace(/x$/i, "X");
        var msg = isCardID(this.tableData[index].abm_ex2)
        if (msg != true) {
          // console.log(msg);
          this.$message.warning("第" + (index + 1) + "行共同生活成员" + msg);
          return false;
        }
      }
      this.tableData[index].abm_ex5 = this.getSex(this.tableData[index].abm_ex2);
      this.tableData[index].age = this.getAge(this.tableData[index].abm_ex2);

      // console.log(this.getSex(this.tableData[index].abm_ex2));
      // console.log(this.tableData[index].abm_ex2);

      if (this.tableData[index].age < 18 || this.tableData[index].age >= 60) {
        this.$set(this.tableData[index], "work", "否");
        if (this.tableData[index].age < 18 && this.tableData[index].abm_ex51 == "") {
          this.$set(this.tableData[index], "abm_ex51", "未成年人");
        } else if (this.tableData[index].age >= 60 && this.tableData[index].abm_ex51 == "") {
          this.$set(this.tableData[index], "abm_ex51", "老年人");
        }
      } else {
        this.$set(this.tableData[index], "work", "是");
      }
    },

    changeCard2 (index, row, id) {
      let rowIndex = Number(index + 1);
      this.tableData2[index].abm_ex2 = row.abm_ex2.replace(/\s+/g, "");
      this.tableData2[index].abm_ex2 = row.abm_ex2.replace(/x$/i, "X");
      if (id == "f2.abm_ex2") {
        var msg = isCardID(this.tableData2[index].abm_ex2)
        if (msg != true) {
          console.log(msg);
          this.$message.warning("第" + (rowIndex) + "行非共同生活赡抚养人" + msg);
          return false;
        }
      }
      let sex = this.getSex(this.tableData2[index].abm_ex2)
      this.$set(this.tableData2[index], "abm_ex5", sex);
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
  margin-bottom: 30px;
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
}
.block {
  width: 100%;
  height: 200px;
}
.changeTypeGroup {
  margin: 0 5px;
}
/* >>>.el-radio__inner{
		border:1px solid #000 !important; */
/* } */
>>> .el-radio__input.is-disabled .el-radio__inner,
.el-radio__input.is-disabled.is-checked .el-radio__inner {
  border-color: #e4e7ed !important;
}
>>> .el-radio__input.is-checked .el-radio__inner {
  border-color: #409eff !important;
}
>>> .el-input--suffix .el-input__inner {
  padding-right: 20px !important;
}
>>> .el-input__suffix {
  right: -1px !important;
}
.mustStyle {
  display: inline-block;
  color: red;
  height: 30px;
  line-height: 33px;
  width: 10px;
}
/* 转办弹框 共同家庭成员表格滑块 */
.my-table > .el-table__footer-wrapper,
.el-table__header-wrapper {
  overflow: auto;
}
/* 转办弹框 表格输入框外边框 */
.my-table .el-input__inner {
  border: 0 !important;
}
/* 转办弹框 表格文字居住 */
/* .srname>.el-input__inner{
		text-align:center;
	} */
.my-col {
  text-align: center;
  color: #909399;
}
div >>> .el-table__empty-block {
  border-bottom: 1px solid #eee;
  height: auto !important;
  background-image: none;
}
</style>
<style scoped>
/* 转办弹框 */
.change_type {
  z-index: 2000 !important;
}
.srname > .el-input__inner {
  text-align: center;
  border: 0px;
}
.change_type .el-dialog__body {
  height: 60vh !important;
  overflow: auto;
  border-top: #ccc solid 1px;

  /* box-shadow: 0px 1px 5px #aaa; */
}
</style>

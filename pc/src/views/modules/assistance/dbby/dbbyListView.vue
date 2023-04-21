// 低收入家庭在册户数页面
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
                <!-- <td style="width:10%;">申请类别:</td>
							<td style="width:10%;">{{basicInf.ab_ex13}}</td> -->
                <td rowspan="2"></td>
              </tr>
              <tr>
                <td>申请时间:</td>
                <td colspan='2'>{{basicInf.ab_dat14}}</td>
                <!-- <td>发放金额:</td>
							<td colspan='2'>{{basicInf.ab_ex40}}</td> -->
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
                <td>{{basicInf.ab_ex4}}</td>
                <td>家庭地址:</td>
                <td>{{basicInf.ab_ex11}}</td>
              </tr>
              <tr style="height:40px;">
                <td>求助原因:</td>
                <td>{{basicInf.ab_ex46}}</td>
                <!-- <td>低保类型:</td>
							<td>{{basicInf.ab_ex41}}</td> -->
                <td>是否属于村干部或经办人员近亲属:</td>
                <td>{{basicInf.ab_ex92}}</td>
              </tr>
              <!-- <tr v-if="$route.query.hdzt!='未核对'" style="height:40px;">
							<td>调查人:</td>
							<td>{{basicInf.ab_ex78}}</td>
							<td>调查结果:</td>
							<td>{{basicInf.ab_ex79}}</td>
						</tr> -->
              <!-- <tr style="height:40px;">
							<td>医保卡号:</td>
							<td>{{basicInf.ab_ex153}}</td>
						</tr> -->
              <!-- <tr style="height:40px;">
							<td>诉求描述:</td>
							<td colspan="3">{{basicInf.ab_ex93}}</td>
						</tr> -->
            </table>
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
              <tr style="height:40px;">
                <td style="width:10%;">预警内容:</td>
                <td style="width:20%;">{{waringData[0].aw_ex1}}</td>
                <td style="width:10%;">预警时间:</td>
                <td style="width:20%;">{{waringData[0].aw_dat1}}</td>
              </tr>
              <tr style="height:40px;">
                <td style="width:10%;">预警内容:</td>
                <td style="width:20%;">{{waringData[1].aw_ex1}}</td>
                <td style="width:10%;">预警时间:</td>
                <td style="width:20%;">{{waringData[1].aw_dat1}}</td>
              </tr>
              <tr style="height:40px;">
                <td style="width:10%;">预警内容:</td>
                <td style="width:20%;">{{waringData[2].aw_ex1}}</td>
                <td style="width:10%;">预警时间:</td>
                <td style="width:20%;">{{waringData[2].aw_dat1}}</td>
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
                               min-width="180"></el-table-column>
              <el-table-column prop="abm_ex81"
                               label="赡（扶、抚）养关系"
                               min-width="180"></el-table-column>
              <el-table-column prop="abm_ex2"
                               label="身份证号码"
                               min-width="180"></el-table-column>
              <!-- <el-table-column prop="abm_ex5" label="性别" width="180"></el-table-column> -->
              <!-- <el-table-column prop="abm_ex28" label="婚姻状况" width="120"></el-table-column> -->
              <el-table-column prop="abm_ex11"
                               label="健康状况"
                               min-width="100"></el-table-column>
              <!-- <el-table-column prop="abm_ex47" label="残疾状况" width="100"></el-table-column> -->
              <!-- <el-table-column prop="abm_ex14" label="职业状况" width="100"></el-table-column> -->
              <el-table-column prop="abm_ex15"
                               label="工作单位"
                               min-width="120"></el-table-column>
              <!-- <el-table-column prop="abm_ex21" label="家庭月总收入" width="100"></el-table-column> -->
              <el-table-column prop="abm_ex20"
                               label="家庭总人口"
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
                               min-width="180"></el-table-column>
              <el-table-column prop="abm_ex81"
                               label="赡（扶、抚）养关系"
                               min-width="180"></el-table-column>
              <el-table-column prop="abm_ex2"
                               label="身份证号码"
                               min-width="280"></el-table-column>
            </el-table>
          </div>
          <h3 class="line_blue"
              id="page6">&emsp;家庭前12个收入情况</h3>
          <div class="lineSt"></div>
          <div class="top_1">
            <table class="top_2">
              <tr style="height:40px;">
                <td style="width:15%;">工资性收入(元):</td>
                <td style="width:35%;">{{basicInf.ab_ex29}}</td>
                <td style="width:15%;">经营性收入(元):</td>
                <td style="width:35%;">{{basicInf.ab_ex30}}</td>
              </tr>
              <tr style="height:40px;">
                <td style="width:15%;">财产性收入(元):</td>
                <td style="width:35%;">{{basicInf.ab_ex31}}</td>
                <td style="width:15%;">转移性收入(元):</td>
                <td style="width:35%;">{{basicInf.ab_ex32}}</td>
              </tr>
              <tr style="height:40px;">
                <td>其他收入(元):</td>
                <td>{{basicInf.ab_ex33}}</td>
                <td>家庭总收入(元):</td>
                <td>{{basicInf.ab_ex58}}</td>
              </tr>
              <tr style="height:40px;">
                <td>家庭月平均收入(元):</td>
                <td>{{basicInf.ab_ex94}}</td>
                <td>家庭月人均收入(元):</td>
                <td>{{(basicInf.ab_ex94/tableData.length).toFixed(2)}}</td>
              </tr>
              <tr style="height:40px;">
                <td>低保标准(元):</td>
                <td>{{basicInf.ab_ex38}}</td>
                <td>月保障金额(元):</td>
                <td>{{basicInf.ab_ex40}}</td>
              </tr>
            </table>
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
                <td style="width:15%;">其他支出(元):</td>
                <td style="width:35%;">{{pay.abp_ex7}}</td>
              </tr>
              <tr style="height:40px;">
                <td>家庭总支出(元):</td>
                <td>{{pay.abp_ex8}}</td>
                <td>扣减刚性支出后家庭年收入(元):</td>
                <td>{{pay.abp_ex9}}</td>
              </tr>
              <tr style="height:40px;">
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
                <el-table-column prop="abe_ex4"
                                 label="车辆价值"
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
                <el-table-column prop="abe_ex6"
                                 label="面积"
                                 min-width="100"></el-table-column>
                <el-table-column prop="abe_ex4"
                                 label="购置价/建造价"
                                 min-width="100"></el-table-column>
              </el-table-column>
            </el-table>
          </div>

          <h3 class="line_blue"
              id="page8">&emsp;已享受救助情况</h3>
          <div class="lineSt"></div>
          <div class="top_1">
            <!-- <div class="top_1">
                        <el-table :data="basicInf" style="width: 100%">
							<el-table-column label="救助信息" style="text-align:center">
								<el-table-column prop="ab_ex3" label="姓名" width="120"></el-table-column>
								<el-table-column prop="ab_ex13" label="救助类型" width="120"></el-table-column>
								<el-table-column prop="ag_ex1" label="发放时间" width="120"></el-table-column>
								<el-table-column prop="ag_ex2" label="发放金额" width="120"></el-table-column>
								<el-table-column prop="ab_dat14" label="申请日期" width="150"></el-table-column>
								<el-table-column prop="ab_dat5" label="审批日期" width="150"></el-table-column>
							</el-table-column>
						</el-table>
                    </div>  -->
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
            <div class="top_4">
              <el-row>
                <el-col :span="12">
                  <el-card class="box-card">
                    <div slot="header"
                         class="clearfix">
                      <span>房屋整体照片(
                        <span style='color:red'>{{basicInf.ab_ex166.split(',')[0]=="" ? 0 : basicInf.ab_ex166.split(',').length}}</span>)
                      </span>
                    </div>
                    <image-view :imgList="this.basicInf.ab_ex166.split(',')"
                                height="150px"
                                width="150px"></image-view>
                  </el-card>
                </el-col>
                <el-col :span="12">
                  <el-card class="box-card">
                    <div slot="header"
                         class="clearfix">
                      <span>房屋室内照片(<span style='color:red'>{{basicInf.ab_ex167.split(',')[0]=="" ? 0 : basicInf.ab_ex167.split(',').length}}</span>)</span>
                    </div>
                    <image-view :imgList="this.basicInf.ab_ex167.split(',')"
                                height="150px"
                                width="150px"></image-view>

                  </el-card>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-card class="box-card">
                    <div slot="header"
                         class="clearfix">
                      <span>身份证(<span style='color:red'>{{basicInf.ab_ex10.split(',')[0]=="" ? 0 : basicInf.ab_ex10.split(',').length}}</span>)</span>

                    </div>
                    <image-view :imgList="this.basicInf.ab_ex10.split(',')"
                                height="150px"
                                width="150px"></image-view>

                  </el-card>
                </el-col>
                <el-col :span="12">
                  <el-card class="box-card">
                    <div slot="header"
                         class="clearfix">
                      <span>核对授权书(<span style='color:red'>{{basicInf.ab_ex73.split(',')[0]=="" ? 0 : basicInf.ab_ex73.split(',').length}}</span>)</span>

                    </div>
                    <image-view :imgList="this.basicInf.ab_ex73.split(',')"
                                height="150px"
                                width="150px"></image-view>

                  </el-card>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-card class="box-card">
                    <div slot="header"
                         class="clearfix">
                      <span>民主评议(<span style='color:red'>{{basicInf.ab_ex97.split(',')[0]=="" ? 0 : basicInf.ab_ex97.split(',').length}}</span>)</span>

                    </div>
                    <image-view :imgList="this.basicInf.ab_ex97.split(',')"
                                height="150px"
                                width="150px"></image-view>

                  </el-card>
                </el-col>
                <el-col :span="12">
                  <el-card class="box-card">
                    <div slot="header"
                         class="clearfix">
                      <span>其他材料(<span style='color:red'>{{basicInf.ab_ex16.split(',')[0]=="" ? 0 : basicInf.ab_ex16.split(',').length}}</span>)</span>

                    </div>
                    <image-view :imgList="this.basicInf.ab_ex16.split(',')"
                                height="150px"
                                width="150px"></image-view>

                  </el-card>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-card class="box-card">
                    <div slot="header"
                         class="clearfix">
                      <span>审核审批表(<span style='color:red'>{{basicInf.ab_ex74.split(',')[0]=="" ? 0 : basicInf.ab_ex74.split(',').length}}</span>)</span>

                    </div>
                    <image-view :imgList="this.basicInf.ab_ex74.split(',')"
                                height="150px"
                                width="150px"></image-view>

                  </el-card>
                </el-col>
                <el-col :span="12">
                  <el-card class="box-card">
                    <div slot="header"
                         class="clearfix">
                      <span>公示图片(<span style='color:red'>{{basicInf.ab_ex98.split(',')[0]=="" ? 0 : basicInf.ab_ex98.split(',').length}}</span>)</span>

                    </div>
                    <image-view :imgList="this.basicInf.ab_ex98.split(',')"
                                height="150px"
                                width="150px"></image-view>

                  </el-card>
                </el-col>
              </el-row>
              <!-- <el-row>
							<el-col :span="12">
								<el-card class="box-card">
									<div slot="header" class="clearfix">
										<span>医保卡图片(<span
									style='color:red'>{{basicInf.ab_ex154.split(',')[0]=="" ? 0 : basicInf.ab_ex154.split(',').length}}</span>)</span>
									</div>
									<image-view :imgList="this.basicInf.ab_ex154.split(',')" height="150px" width="150px"></image-view>
								</el-card>
							</el-col>
						</el-row> -->
            </div>
          </div>
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
                  <el-option v-for="item in options"
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
            <!-- 新增转办功能 -->
            <el-row style="margin-top: 10px;">
              <el-col :span="2">
                <el-checkbox v-model="checked"
                             @change="dbChange">转办</el-checkbox>
              </el-col>
              <el-col :span="22">
                (<el-radio-group style="margin: 0 5px"
                                :disabled="disabled"
                                v-model="typeData.ab_ex13">
                  <!-- <el-radio label="低保" :value="'低保'" @change="radioChange">最低生活保障</el-radio> -->
                  <el-radio label="家庭边缘"
                            @change="radioChange">低收入家庭</el-radio>
                  <el-radio label="支出贫困"
                            @change="radioChange">支出性贫困家庭</el-radio>
                  <el-radio label="特困供养"
                            @change="radioChange">特困人员供养</el-radio>
                </el-radio-group>)
              </el-col>
            </el-row>
            <el-row style="margin: 10px 0 0  8.2% ;"
                    v-show="zdShow">
              <el-col :span="24">
                <span>
                  <span style="color:red">*</span>
                  (<el-radio-group style="margin: 0 5px"
                                  v-model="typeData.ab_ex41">
                    <el-radio label="低收入型低保">低收入型低保</el-radio>
                    <el-radio label="残疾单列施保户">残疾单列施保户</el-radio>
                    <el-radio label="重病单列施保户">重病单列施保户</el-radio>
                  </el-radio-group>)
                </span>
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
                          v-model="auditValue.ab_ex25"></el-input>
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
                <div style="line-height: 30px;text-align:center">审核人</div>
              </el-col>
              <el-col :span="6">
                <el-input v-model="auditValue.ab_ex19"></el-input>
              </el-col>
              <el-col :span="2"
                      style="line-height: 30px;">
                <div>审核时间</div>
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
                <div>退回原因</div>
              </el-col>
              <el-col :span="22">
                <el-input type="textarea"
                          autosize
                          v-model="auditValue.ab_ex25"></el-input>
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

                <!-- <el-image style="width: 100px; height: 100px; padding-top: 2px;"
								:src="this.publicity.ab_ex98.split(',')[0]"
								:preview-src-list="this.publicity.ab_ex98.split(',')"></el-image> -->
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
                <!-- <tbody>
								<tr>
									<td style="color:#899197;height:30px">处理步骤：</td>
									<td>{{basicInf.ar_ex4}}</td><td style="color:#899197">处理时间：</td>
									<td>{{basicInf.ar_dat1}}</td><td style="color:#899197">处理结果：</td>
									<td rowspan="2" style="text-align:left">
										<img src="http://221.130.79.150:10088/image/aud/%E5%90%8C%E6%84%8F.png" style="width:100px">
									</td>
								</tr>
								<tr>
									<td style="color:#899197;height:30px">处理人：</td>
									<td>{{basicInf.ar_ex5}}</td><td style="color:#899197">处理用时：</td>
									<td>{{basicInf.ar_ex6}}天</td>
								</tr>
								<tr style="border-bottom:1px solid #ddd">
									<td style="color:#899197;height:30px">处理意见：</td>
									<td colspan="4">{{basicInf.ar_ex2}}</td></tr><tr><td colspan="5" style="height:20px">&nbsp;</td>
								</tr>
							</tbody> -->
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
import imageView from '@/views/modules/assistance/imageView'
import upload from '@/views/modules/assistance/upload'
// import  baseURL from '@/utils/baseUrl'
export default {
  name: "dbbyListView",
  components: {
    imageView,
    upload
  },
  data () {
    return {
      dialogVisible3: false,
      uploadId: '',
      loading: false,
      waringData: [
        { aw_ex1: "", aw_dat1: "" },
        { aw_ex1: "", aw_dat1: "" },
        { aw_ex1: "", aw_dat1: "" }
      ],
      tableData: [],
      tableData2: [],
      tableData2_: [],
      tableData3: [],
      tableData4: [],
      tableData5: [],
      tableData6: [],
      assistance: [],
      record: [],
      typeData:
      {
        ab_ex13: "",
        ab_ex41: ""
      },
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
      options: [{
        value: '同意',
        label: '同意'
      }, {
        value: '退回',
        label: '退回'
      }, {
        value: '退回重新核查',
        label: '退回重新核查'
      }],
      options1: [{
        value: '退回',
        label: '退回'
      }],
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
      options3: [{
        value: '同意',
        label: '同意'
      }, {
        value: '退回',
        label: '退回'
      }, {
        value: '退回重新核查',
        label: '退回重新核查'
      }],
      // url: 'http://221.130.79.150:9000/jdlsg/2021/2/20/202102201059253401000001912',
      // srcList: [
      // 'http://221.130.79.150:9000/jdlsg/2021/2/20/202102201059253401000001912',
      // 'http://221.130.79.150:9000/jdlsg/2021/2/20/202102201059334601000004624'
      // ],
      // url2: 'http://221.130.79.150:9000/jdlsg/2021/2/20/202102201505421681000008054',
      // srcList2: [
      // 'http://221.130.79.150:9000/jdlsg/2021/2/20/202102201505421681000008054'

      // ],
      // url3: 'http://221.130.79.150:9000/jdlsg/2021/2/20/202102201103247341000008429',
      // srcList3: [
      // 'http://221.130.79.150:9000/jdlsg/2021/2/20/202102201103247341000008429'

      // ],
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
      basicInf: {},
      pay: {
        abp_ex4: '',
        abp_ex5: '',
        abp_ex6: '',
        abp_ex7: '',
        abp_ex8: '',
        abp_ex9: '',
        abp_ex10: '',
      },
      sId: "",
      cId: "",
      type: "",
      checked: false,
      disabled: true,
      zdShow: false,
      // ab_ex41: "",
      // ab_ex13: "",

    }
  },
  created () {
    // console.log('222222222222221111',this.type)
    // console.log(this.$route.query.tableData)
    this.loadData();
  },
  mounted () {
    // 滚动鼠标右侧导航栏跟随滚动位置改变而改变显示
    // window.removeEventListener('scroll',this.scroll,false)
    window.addEventListener('scroll', this.scroll, true)
  },
  methods: {
    // 低保转办
    dbChange () {
      this.disabled = !this.disabled;
      console.log(this.typeData.ab_ex13, "this.typeData.ab_ex13");
      if (this.disabled == true) {
        this.zdShow = false;
        this.typeData.ab_ex13 = "";
        console.log(this.zdShow, "this.zdShow");
        console.log(this.disabled, "this.disabled");
      }
    },
    radioChange () {
      if (this.typeData.ab_ex13 == "低保" && this.disabled == false) {
        this.zdShow = true;
        console.log(this.zdShow, "this.zdShow");
        console.log(this.disabled, "this.disabled");
        console.log(this.typeData.ab_ex13, "this.type.ab_ex41");
      }
      else {
        this.zdShow = false;
        this.typeData.ab_ex41 = "";
        console.log(this.zdShow, "this.zdShow");
        console.log(this.disabled, "this.disabled");
        console.log(this.typeData.ab_ex13, "this.type.ab_ex41");
      }
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

      // 顺序跟上面显示顺序要相反
      let clientHeight = document.querySelector('.info2').clientHeight
      let recordtClientHeight = document.querySelector('#recordt').scrollHeight
      // 在新增dialog打开时不执行后面的程序
      if (!oDiv1 || !oDiv2 || !oDiv3 || !oDiv4 || !oDiv5 || !oDiv6 || !oDiv7 || !oDiv8 || !oDiv9 || !oDiv10 || !oDiv12 || !oDiv13 || !oDiv14 || !oDiv15 || !oDiv16) {
        return ''
      }
      if (recordtClientHeight + oDiv10.clientHeight < clientHeight && scrollTop > (oDiv10.offsetTop - oDiv1.offsetTop - clientHeight + recordtClientHeight + oDiv10.clientHeight)) {
        console.log('触发了10-1')
        this.isShow(10)
      } else if (scrollTop > (oDiv10.offsetTop - oDiv1.offsetTop - 1)) {
        console.log('触发了10-2')
        this.isShow(10)
      }
      else if (oDiv11 && scrollTop > (oDiv11.offsetTop - oDiv1.offsetTop - 1)) {
        console.log('触发了11')
        this.isShow(11)
      } else if (scrollTop > (oDiv9.offsetTop - oDiv1.offsetTop - 1)) {
        console.log('触发了9')
        this.isShow(9)
      } else if (scrollTop > (oDiv8.offsetTop - oDiv1.offsetTop - 1)) {
        console.log('触发了8')
        this.isShow(8)
      } else if (scrollTop > (oDiv16.offsetTop - oDiv1.offsetTop - 1)) {
        console.log('触发了16')
        this.isShow(16)
      } else if (scrollTop > (oDiv15.offsetTop - oDiv1.offsetTop - 1)) {
        console.log('触发了15')
        this.isShow(15)
      } else if (scrollTop > (oDiv7.offsetTop - oDiv1.offsetTop - 1)) {
        console.log('触发了7')
        this.isShow(7)
      } else if (scrollTop > (oDiv14.offsetTop - oDiv1.offsetTop - 1)) {
        console.log('触发了14')
        this.isShow(14)
      } else if (scrollTop > (oDiv6.offsetTop - oDiv1.offsetTop - 1)) {
        console.log('触发了6')
        this.isShow(6)
      } else if (scrollTop > (oDiv13.offsetTop - oDiv1.offsetTop - 1)) {
        console.log('触发了13')
        this.isShow(13)
      } else if (scrollTop > (oDiv5.offsetTop - oDiv1.offsetTop - 1)) {
        console.log('触发了5')
        this.isShow(5)
      } else if (scrollTop > (oDiv4.offsetTop - oDiv1.offsetTop - 1)) {
        console.log('触发了4')
        this.isShow(4)
      } else if (scrollTop > (oDiv12.offsetTop - oDiv1.offsetTop - 1)) {
        console.log('触发了12')
        this.isShow(12)
      } else if (scrollTop > (oDiv3.offsetTop - oDiv1.offsetTop - 1)) {
        console.log('触发了3')
        this.isShow(3)
      } else if (scrollTop > (oDiv2.offsetTop - oDiv1.offsetTop - 1)) {
        console.log('触发了2')
        this.isShow(2)
      } else if (scrollTop > (oDiv1.offsetTop - oDiv1.offsetTop)) {
        console.log('触发了1')
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
    loadData () {
      this.sId = this.$route.query.sId;
      this.cId = this.$route.query.cId;
      this.type = this.$route.query.type;
      this.getData({
        sId: this.sId,
        type: this.type
      }).then(res => {
        console.log(res)
        this.basicInf = res[0].data[0]
        // console.log(this.basicInf,'this.basicInf')
        // this.record = res.response.data[0].record
        this.record1(res[0].record)
        this.auditValue = res[0].data[0]

        if (this.type == "th")
          this.auditValue.ab_ex27 = "退回";

        this.publicity = res[0].data[0]
        this.approval = res[0].data[0]
      }).catch(res => {
        console.log(typeof res.request === 'undefined')
        console.log(typeof res.response === 'undefined')
        if (typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200) {
          console.log('请求失败了-----------------------')
          this.$message.error('数据获取失败或请求超时')
          this.$emit("closes", false)
          this.$router.go(-1)
          return false
        }
        // console.log(res.response.data)
        this.basicInf = res.response.data[0].data[0]
        // 如果不在办结阶段月保障金额不赋值
        if (this.basicInf.ab_ex15 != "办结") {
          this.basicInf.ab_ex40 = ""
        }
        // this.record = res.response.data[0].record
        this.record1(res.response.data[0].record)
        this.auditValue = res.response.data[0].data[0]
        if (this.type == "th")
          this.auditValue.ab_ex27 = "退回";

        this.publicity = res.response.data[0].data[0]
        this.approval = res.response.data[0].data[0]

      })
      // 自定义预警
      this.loadWaring({
        sId: this.sId,
      }).then(res => {
        console.log(res,)
        this.waringData = res[0].data
      }).catch(res => {
        if (typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200) {
          console.log('请求失败了-----------------------')
          this.$message.error('数据获取失败或请求超时')
          this.$emit("closes", false)
          this.$router.go(-1)
          return false
        }

        if (res.response.data[0].waring.length > 0) {
          for (let i = 0; i < res.response.data[0].waring.length; i++) {
            this.waringData[i] = res.response.data[0].waring[i]// 
          }
        }
        console.log(this.waringData);
        this.waringData = res.response.data[0].waring// 
        console.log(res.response.data[0].waring, "// 自定义预警")
      })

      this.loadFamily({
        sId: this.sId,
        sType: "Y" //Y为共同生活，N为非共同生活
      }).then(res => {
        console.log(res)
        this.tableData = res[0].data
      }).catch(res => {
        if (typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200) {
          console.log('请求失败了-----------------------')
          this.$message.error('数据获取失败或请求超时')
          this.$emit("closes", false)
          this.$router.go(-1)
          return false
        }
        console.log(res.response.data[0].data, '------共同生活成员') //共同生活成员
        this.tableData = res.response.data[0].data
        for (let i in this.tableData) {
          this.changeCard(i)
        }
      })
      this.loadFamily({
        sId: this.sId,
        sType: "N" //Y为共同生活，N为非共同生活
      }).then(res => {
        console.log(res)
        this.tableData2 = res[0].data
      }).catch(res => {
        if (typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200) {
          console.log('请求失败了-----------------------')
          this.$message.error('数据获取失败或请求超时')
          this.$emit("closes", false)
          this.$router.go(-1)
          return false
        }
        console.log(res.response.data[0].data) //非共同生活成员
        this.tableData2 = res.response.data[0].data
      })
      this.loadFamily({
        sId: this.sId,
        sType: "B" //Y为共同生活，N为非共同生活，B为非共同生活家庭成员
      }).then(res => {
        console.log(res)
        this.tableData2_ = res[0].data
      }).catch(res => {
        if (typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200) {
          console.log('请求失败了-----------------------')
          this.$message.error('数据获取失败或请求超时')
          this.$emit("closes", false)
          this.$router.go(-1)
          return false
        }
        console.log(res.response.data[0].data) //非共同生活成员
        this.tableData2_ = res.response.data[0].data
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
          console.log('请求失败了-----------------------')
          this.$message.error('数据获取失败或请求超时')
          this.$emit("closes", false)
          this.$router.go(-1)
          return false
        }
        console.log(res)
        this.tableData3 = res.response.data[0].data //车
        this.tableData4 = res.response.data[0].data2 //房
      })
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
        console.log(res)
        this.tableData5 = res.response.data[0].data
        this.tableData6 = res.response.data[0].data2
      })
    },
    getData (sid) {
      return request({
        headers: {
          'Accept': 'application/json',
        },
        url: '/social/assistance/getBasics',
        method: 'post',
        // data:{
        // sId:"57943",
        // },
        data: sid
      })
    },

    // 自定义预警
    loadWaring (data) {
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
    changeSh (val) {
      // var text = $("#ab_ex25").val();
      // if(text==null||text==''||text=='同意'||text=='退回重新核查'||text=='退回'){
      //     $("#ab_ex25").val(val);
      // }
      console.log(val)
    },
    save (data) {
      // console.log(data)
      if (data.ab_ex27 == "") {
        this.$message.error('请选择审核意见');
      } else if (this.typeData.ab_ex13 == "低保" && this.typeData.ab_ex41 == "") {
        this.$message.error('请选择低收入家庭边缘类型');
      } else if (this.disabled == false && this.typeData.ab_ex13 == "") {
        this.$message.error('请选择转办类型');
      } else {
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
    },
    isShow (n) {
      this.isShow1 = true
      this.isShow2 = true
      this.isShow3 = true
      this.isShow4 = true
      this.isShow5 = true
      this.isShow6 = true
      this.isShow7 = true
      this.isShow8 = true
      this.isShow9 = true
      this.isShow10 = true
      this.isShow11 = true
      this.isShow12 = true
      this.isShow13 = true
      this.isShow14 = true
      this.isShow15 = true
      this.isShow16 = true

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
      val = val == "" ? data : val + "," + data;
      this.publicity[this.uploadId] = val;
      //	this.uploadImg[this.uploadId + "_img"] = val.split(",");
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
</style>

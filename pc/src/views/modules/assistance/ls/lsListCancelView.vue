<template>
  <div class="g-box">
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
                       src='../../../../assets/img/auditStatus/notSubmitted.png'
                       class='imgSt'>
                  <img v-else-if="basicInf.ab_ex15 == '核对中'"
                       src='../../../../assets/img/auditStatus/audit.png'
                       class='imgSt'>
                  <img v-else-if="basicInf.ab_ex15 == '办结' || basicInf.ab_ex15=='审核通过' && ab_ex48=='已享受'"
                       src='../../../../assets/img/auditStatus/enjoyment.png'
                       class='imgSt'>
                  <img v-else-if="basicInf.ab_ex15 == '办结' || basicInf.ab_ex15=='审核通过'"
                       src='../../../../assets/img/auditStatus/passTheAudit.png'
                       class='imgSt'>
                  <img v-else-if="basicInf.ab_ex15 == '退回'"
                       src='../../../../assets/img/auditStatus/return.png'
                       class='imgSt'>
                  <img v-else
                       src='../../../../assets/img/auditStatus/audit.png'
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
                <td>医保卡号:</td>
                <td>{{basicInf.ab_ex153}}</td>
              </tr>
              <tr style="height:40px;">
                <td>求助原因:</td>
                <td colspan="3">{{basicInf.ab_ex46}}</td>

              </tr>
              <!-- <tr style="height:40px;">
							<td>调查人:</td>
							<td>{{basicInf.ab_ex78}}</td>
							<td>调查结果:</td>
							<td>{{basicInf.ab_ex79}}</td>
						</tr> -->
              <tr style="height:40px;">
                <td>诉求描述:</td>
                <td colspan="3">{{basicInf.ab_ex93}}</td>
              </tr>
            </table>
          </div>

          <h3 class="line_blue"
              id="page3">&emsp;银行信息</h3>
          <div class="lineSt"></div>
          <div class="top_1">
            <table class="top_2">
              <tr style="height:40px;">
                <td style="width:10%;">开户银行:</td>
                <td style="width:20%;">{{basicInf.ab_ex42}}</td>
                <td style="width:10%;">开户人:</td>
                <td style="width:20%;">{{basicInf.ab_ex8}}</td>
                <td style="width:10%;">银行账号:</td>
                <td style="width:20%;">{{basicInf.ab_ex43}}</td>
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
              <el-table-column prop="abm_ex1"
                               label="与户主关系"
                               width="100"></el-table-column>
              <el-table-column prop="abm_ex3"
                               label="姓名"
                               width="80"></el-table-column>
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
              <el-table-column prop="abm_ex48"
                               label="年龄段"
                               width="100"></el-table-column>
              <el-table-column prop="abm_ex28"
                               label="婚姻状况"
                               width="100"></el-table-column>
              <el-table-column prop="abm_ex11"
                               label="健康状况"
                               width="100"></el-table-column>
              <el-table-column prop="abm_ex47"
                               label="残疾状况"
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
              <el-table-column prop="abm_ex1"
                               label="与户主关系"
                               width="180"></el-table-column>
              <el-table-column prop="abm_ex3"
                               label="姓名"
                               width="100"></el-table-column>
              <el-table-column prop="abm_ex2"
                               label="身份证号码"
                               width="180"></el-table-column>
              <el-table-column prop="abm_ex5"
                               label="性别"
                               width="80"></el-table-column>
              <el-table-column prop="abm_ex11"
                               label="健康状况"
                               width="100"></el-table-column>
              <el-table-column prop="abm_ex47"
                               label="残疾状况"
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
              id="page6">&emsp;家庭收入情况(12个月)</h3>
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
                <td style="width:15%;">财务性收入(元):</td>
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
              </tr>

            </table>
          </div>
          <h3 class="line_blue"
              id="page7">&emsp;家庭财产情况</h3>
          <div class="lineSt"></div>
          <div class="top_1">
            <div class="top_3">
              <el-table style="width: 100%"
                        :data="tableData3">
                <el-table-column label="拥有车(船)情况"
                                 style="text-align:center">
                  <el-table-column prop="abe_ex1"
                                   label="车(船)主"
                                   width="120"></el-table-column>
                  <el-table-column prop="abe_ex2"
                                   label="购买时间"
                                   width="120"></el-table-column>
                  <el-table-column prop="abe_ex3"
                                   label="用途"
                                   width="120"></el-table-column>
                  <el-table-column prop="abe_ex4"
                                   label="车辆价值"
                                   width="150"></el-table-column>
                </el-table-column>
              </el-table>
            </div>
            <div class="top_3">
              <el-table style="width: 100%"
                        :data="tableData4">
                <el-table-column label="拥有房产情况"
                                 style="text-align:center">
                  <el-table-column prop="abe_ex1"
                                   label="产权人/共有人"
                                   width="120"></el-table-column>
                  <el-table-column prop="abe_ex2"
                                   label="建房(购房)时间"
                                   width="120"></el-table-column>
                  <el-table-column prop="abe_ex5"
                                   label="房屋地址"
                                   width="120"></el-table-column>
                  <el-table-column prop="abe_ex6"
                                   label="面积"
                                   width="150"></el-table-column>
                </el-table-column>
              </el-table>
            </div>
            <div style="margin-top:10px;">
              <table class="top_2">
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
            </div>
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
                        style="width: 100%">
                <el-table-column label="救助信息"
                                 style="text-align:center">
                  <el-table-column prop="ab_ex3"
                                   label="姓名"
                                   width="120"></el-table-column>
                  <el-table-column prop="ab_ex13"
                                   label="救助类型"
                                   width="120"></el-table-column>
                  <el-table-column prop="ag_ex1"
                                   label="发放时间"
                                   width="120"></el-table-column>
                  <el-table-column prop="ag_ex2"
                                   label="发放金额"
                                   width="120"></el-table-column>
                </el-table-column>
              </el-table>
            </div>
            <div class="top_3">
              <el-table :data="tableData6"
                        style="width: 100%">
                <el-table-column label="救助信息"
                                 style="text-align:center">
                  <el-table-column prop="ab_ex3"
                                   label="姓名"
                                   width="120"></el-table-column>
                  <el-table-column prop="ab_ex13"
                                   label="救助类型"
                                   width="120"></el-table-column>
                  <el-table-column prop="ab_dat14"
                                   label="申请日期"
                                   width="150"></el-table-column>
                  <el-table-column prop="ab_dat5"
                                   label="审批日期"
                                   width="150"></el-table-column>
                </el-table-column>
              </el-table>
            </div>

          </div>

          <div style='clear:both'></div>
          <div v-if="type!='zx'"
               style='margin-top:15px'>
            <h3 class="line_blue"
                id="page12">&emsp;注销报告</h3>
            <div class="lineSt"></div>
            <div class="top_1">
              <div style="color:#6292c2;font-weight:bold;padding:5px;margin-left:5%;">注销原因：<span style="color:red;">{{basicInf.ac_ex8}}</span></div>
              <div style="color:#6292c2;font-weight:bold;padding:5px;margin-left:5%;">申请注销时间：<span id="ac_dat1_2">{{basicInf.ac_dat1}}</span></div>
            </div>
          </div>

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
                      <span>纸质授权书(<span style='color:red'>{{basicInf.ab_ex177.split(',')[0]=="" ? 0 : basicInf.ab_ex177.split(',').length}}</span>)</span>
                    </div>
                    <image-view :imgList="this.basicInf.ab_ex177.split(',')"
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
                      <span>电子授权书(<span style='color:red'>{{basicInf.ab_ex73.split(',')[0]=="" ? 0 : basicInf.ab_ex73.split(',').length}}</span>)</span>

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
                      <span>公示图片(<span style='color:red'>{{basicInf.ab_ex98.split(',')[0]=="" ? 0 : basicInf.ab_ex98.split(',').length}}</span>)</span>
                    </div>
                    <image-view :imgList="this.basicInf.ab_ex98.split(',')"
                                height="150px"
                                width="150px"></image-view>

                  </el-card>
                </el-col>
              </el-row>
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
                <div style="line-height: 30px;">审核意见</div>
              </el-col>
              <el-col :span="6">
                <el-select @change="changeSh"
                           v-model="auditValue.ac_ex1"
                           placeholder="请选择">
                  <el-option v-for="item in options"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-col>
              <el-col :span="2">
                <div style="line-height: 30px;">审核人</div>
              </el-col>
              <el-col :span="6">
                <el-input v-model="auditValue.ac_ex3"></el-input>
              </el-col>
              <el-col :span="2"
                      style="line-height: 30px;">
                <div>审核时间</div>
              </el-col>
              <el-col :span="6">
                <!-- <el-input placeholder="yyyy-MM-dd" v-model="auditValue.ac_dat2"></el-input> -->
                <el-date-picker v-model="auditValue.ac_dat2"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="选择审核时间">
                </el-date-picker>
              </el-col>
            </el-row>
            <el-row style="margin-top: 10px;">
              <el-col :span="2"
                      style="line-height: 30px;">
                <div>备注</div>
              </el-col>
              <el-col :span="20">
                <el-input type="textarea"
                          autosize
                          v-model="auditValue.ac_ex2"></el-input>
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
              v-if="this.type == 'zx'">&emsp;注销</h3>
          <div class="lineSt"
               v-if="this.type == 'zx'"></div>
          <div class="top_1"
               v-if="this.type == 'zx'">
            <el-row>

              <el-col :span="2"
                      style="line-height: 30px;">
                <div>注销时间</div>
              </el-col>
              <el-col :span="16">
                <!-- <el-input placeholder="yyyy-MM-dd" v-model="publicity.ac_dat1"></el-input> -->
                <el-date-picker v-model="publicity.ac_dat1"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="选择注销时间">
                </el-date-picker>
              </el-col>

            </el-row>

            <el-row style="margin-top: 10px;">
              <el-col :span="2"
                      style="line-height: 30px;">
                <div>注销原因</div>
              </el-col>
              <el-col :span="20">
                <el-input type="textarea"
                          autosize
                          v-model="publicity.ac_ex8"></el-input>
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
                <div style="line-height: 30px;">审批意见</div>
              </el-col>
              <el-col :span="6">
                <el-select @change="changeSh"
                           v-model="approval.ac_ex4"
                           placeholder="请选择">
                  <el-option v-for="item in options3"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-col>
              <el-col :span="2">
                <div style="line-height: 30px;">审批人</div>
              </el-col>
              <el-col :span="6">
                <el-input v-model="approval.ac_ex6"></el-input>
              </el-col>
              <el-col :span="2"
                      style="line-height: 30px;">
                <div>审批时间</div>
              </el-col>
              <el-col :span="6">
                <!-- <el-input placeholder="yyyy-MM-dd" v-model="approval.ac_dat3"></el-input> -->
                <el-date-picker v-model="approval.ac_dat3"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="选择审批时间">
                </el-date-picker>
              </el-col>
            </el-row>
            <el-row style="margin-top: 10px;">
              <el-col :span="2"
                      style="line-height: 30px;">
                <div>备注</div>
              </el-col>
              <el-col :span="20">
                <el-input type="textarea"
                          autosize
                          v-model="approval.ac_ex5"></el-input>
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
              id="page10"
              v-if="type!='zx'">&emsp;审批记录</h3>
          <div class="lineSt"
               v-if="type!='zx'"></div>
          <div class="top_1"
               v-if="type!='zx'">
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
                <tbody>
                  <tr>
                    <td style="color:#899197;height:30px">处理步骤：</td>
                    <td>申请注销</td>
                    <td style="color:#899197">处理时间：</td>
                    <td>{{basicInf.ac_dat1}}</td>
                    <td style="color:#899197">处理结果：</td>
                    <td rowspan="2"
                        style="text-align:left">
                      <img src="../../../../assets/img/auditStatus/agree.png"
                           style="width:100px">

                    </td>
                  </tr>
                  <tr style="border-bottom:1px solid #ddd">
                    <td style="color:#899197;height:30px">申请注销人：</td>
                    <td>{{basicInf.ac_ex10}}</td>
                    <td style="color:#899197">申请理由</td>
                    <td>{{basicInf.ac_ex8}}</td>
                  </tr>
                  <tr>
                    <td colspan="5"
                        style="height:20px">&nbsp;</td>
                  </tr>
                </tbody>

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
                           src="../../../../assets/img/auditStatus/agree.png"
                           style="width:100px">
                      <img v-else
                           src="../../../../assets/img/auditStatus/return.png"
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
        <div style="margin-left:25%;margin-top:20px;">
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
            <li :class="{listStyle:isShow6}"
                @click="isShow(6)">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow6}"
                 @click="counter('#page6')">家庭收入情况(12个月)</a><br>
            </li>
            <li :class="{listStyle:isShow7}"
                @click="isShow(7)">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow7}"
                 @click="counter('#page7')">家庭财产情况</a><br>
            </li>
            <li :class="{listStyle:isShow8}"
                @click="isShow(8)">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow8}"
                 @click="counter('#page8')">已享受救助情况</a><br>
            </li>
            <li :class="{listStyle:isShow12}"
                @click="isShow(12)"
                v-if="type!='zx'">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow12}"
                 @click="counter('#page12')">注销报告</a><br>
            </li>
            <li :class="{listStyle:isShow9}"
                @click="isShow(9)">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow9}"
                 @click="counter('#page9')">电子附件</a><br>
            </li>
            <li :class="{listStyle:isShow11}"
                @click="isShow(11)"
                v-if="type=='cs'||type=='th'||type=='gs'||type=='sp'||type=='zx'">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow11}"
                 @click="counter('#page11')">
                <span v-if="type=='cs'">审核</span>
                <span v-if="type=='th'">审核</span>
                <span v-if="type=='gs'">公示</span>
                <span v-if="type=='sp'">审批</span>
                <span v-if="type=='zx'">注销</span>
              </a><br>
            </li>
            <li :class="{listStyle:isShow10}"
                @click="isShow(10)"
                v-if="type!='zx'">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow10}"
                 @click="counter('#page10')">审批记录</a>
            </li>
          </ul>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import request from '@/utils/request'
import imageView from '../imageView'
// import  baseURL from '@/utils/baseUrl'
export default {
  components: {
    imageView
  },
  data () {
    return {
      tableData: [],
      tableData2: [],
      tableData3: [],
      tableData4: [],
      tableData5: [],
      tableData6: [],
      assistance: [],
      record: [],
      flag: true,
      // 初审
      auditValue: {},
      // 公示
      publicity: {},
      //审批
      approval: {},
      options: [{
        value: '同意',
        label: '同意'
      }, {
        value: '退回',
        label: '退回'
      }],
      options1: [{
        value: '退回',
        label: '退回'
      }],
      options2: [{
        value: '无异议',
        label: '无异议'
      }, {
        value: '有异议',
        label: '有异议'
      }],
      options3: [{
        value: '同意',
        label: '同意'
      }, {
        value: '退回',
        label: '退回'
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
      basicInf: {},
      sId: window.location.href.split('sId=').length > 1 ? window.location.href.split('sId=')[1].split('&')[0] :
        '',
      cId: window.location.href.split('cId=').length > 1 ? window.location.href.split('cId=')[1].split('&')[0] :
        '',
      type: window.location.href.split('type=').length > 1 ? window.location.href.split('type=')[1].split('&')[
        0] : '',
    }
  },
  created () {
    // console.log('222222222222221111',this.type)
    // console.log(this.$route.query.tableData)
    this.loadData();
  },

  methods: {
    counter (id) { //counter1是绑定的点击事件名称
      document.querySelector(id).scrollIntoView(true);
      // const returnEle = document.querySelector("#page8"); //productId是将要跳转区域的id
      // if (!!returnEle) {
      // 	returnEle.scrollIntoView(true); // true 是默认的
      // }
      // document.querySelector("counter1").scrollIntoView(true); //这里的counter1是将要返回地方的id
    },
    loadData () {
      this.sId = window.location.href.split('sId=').length > 1 ? window.location.href.split('sId=')[1].split(
        '&')[0] : '',
        this.cId = window.location.href.split('cId=').length > 1 ? window.location.href.split('cId=')[1].split(
          '&')[0] : '',
        this.type = window.location.href.split('type=').length > 1 ? window.location.href.split('type=')[1]
          .split('&')[0] : '',

        this.getData({
          sId: this.sId,
          type: this.type
        }).then(res => {
          console.log(res)
          let json = res;
          this.basicInf = res[0].data[0]
          // this.record = res.response.data[0].record
          this.record1(res[0].record)
          this.auditValue = json[0].data[0]
          this.publicity = json[0].data[0]
          this.approval = json[0].data[0]
          this.loadData2(this.auditValue.ab_id);
        }).catch(res => {
          if (typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200) {
            console.log('请求失败了-----------------------')
            this.$message.error('数据获取失败或请求超时')
            this.$emit("closes", false)
            this.$router.go(-1)
            return false
          }
          // console.log(res.response.data)
          let json = res.response.data;
          this.basicInf = res.response.data[0].data[0]
          // this.record = res.response.data[0].record
          this.record1(res.response.data[0].record)
          this.auditValue = json[0].data[0]
          this.publicity = json[0].data[0]
          this.approval = json[0].data[0]
          this.loadData2(this.auditValue.ab_id);

        })


    },
    loadData2 (sId) {
      this.loadFamily({
        sId: sId,
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
        console.log(res.response.data[0].data) //共同生活成员
        this.tableData = res.response.data[0].data
      })
      this.loadFamily({
        sId: sId,
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
        console.log(res.response.data[0].data) //共同生活成员
        this.tableData2 = res.response.data[0].data
      })
      this.loadEstate({
        sId: sId,
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
        sId: sId,
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
        url: '/social/assistance/getBasicsCancel',
        method: 'post',
        // data:{
        // sId:"57943",
        // },
        data: sid
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
    closeView () {
      this.$emit("closes", false)
      this.$router.go(-1)
    },
    save (data) {
      if (data.ac_ex1 == "") {
        this.$message.error('请选择审核意见');
      } else {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        // 设置定时器，30秒请求失败刷新页面
        let time = setTimeout(() => {
          loading.close()
          this.$emit("closes", false)
          this.$message.error("网络异常");
          this.$router.go(-1)
        }, 30000)
        this.saveBasiccs({
          "data": "[" + JSON.stringify(data) + "]",
          "sId": this.sId,
          "type": this.type
        }).then((res) => {
          if (res[0].status == "+OK") {
            loading.close()
            this.$message.success(res[0].msg)
            this.$emit("closes", false)
            this.$router.go(-1)
          } else {
            loading.close()
            this.$message.error(res[0].msg)
          }
        }).catch((res) => {
          // 数据请求成功删除定时器
          clearTimeout(time);
          if (res.response.data[0].status == "+OK") {
            loading.close()
            this.$message.success(res.response.data[0].msg)
            this.$emit("closes", false)
            this.$router.go(-1)
          } else {
            loading.close()
            this.$message.error(res.response.data[0].msg)
          }
        })
      }
    },
    save2 (data) {
      if (data.ac_ex8 == "") {
        this.$message.error('请输入注销原因');
      } else if (data.ac_dat1 == "") {
        this.$message.error('请选择注销时间');
      } else {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        // 设置定时器，30秒请求失败刷新页面
        let time = setTimeout(() => {
          loading.close()
          this.$emit("closes", false)
          this.$message.error("网络异常");
          this.$router.go(-1)
        }, 30000)
        this.saveBasicgs({
          "data": "[" + JSON.stringify(data) + "]",
          "sId": this.sId
        }).then((res) => {
          if (res[0].status == "+OK") {
            loading.close()
            this.$message.success(res[0].msg)
            this.$emit("closes", false)
            this.$router.go(-1)
          } else {
            loading.close()
            this.$message.error(res[0].msg)
          }
        }).catch((res) => {
          // 数据请求成功删除定时器
          clearTimeout(time);
          if (res.response.data[0].status == "+OK") {
            loading.close()
            this.$message.success(res.response.data[0].msg)
            this.$emit("closes", false)
            this.$router.go(-1)
          } else {
            loading.close()
            this.$message.error(res.response.data[0].msg)
          }
        })
      }
    },
    save3 (data) {
      if (data.ac_ex4 == "") {
        this.$message.error('请选择审批意见');
      } else {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        // 设置定时器，30秒请求失败刷新页面
        let time = setTimeout(() => {
          loading.close()
          this.$emit("closes", false)
          this.$message.error("网络异常");
          this.$router.go(-1)
        }, 30000)
        this.saveBasicsh({
          "data": "[" + JSON.stringify(data) + "]",
          "sId": this.sId,
          "type": this.type
        }).then((res) => {
          if (res[0].status == "+OK") {
            loading.close()
            this.$message.success(res[0].msg)
            this.$emit("closes", false)
            this.$router.go(-1)
          } else {
            loading.close()
            this.$message.error(res[0].msg)
          }
        }).catch((res) => {
          // 数据请求成功删除定时器
          clearTimeout(time);
          if (res.response.data[0].status == "+OK") {
            loading.close()
            this.$message.success(res.response.data[0].msg)
            this.$emit("closes", false)
            this.$router.go(-1)
          } else {
            loading.close()
            this.$message.error(res.response.data[0].msg)
          }
        })
      }
    },
    //初审 /.退回
    saveBasiccs (data) {
      let url = "/social/assistance/saveBasicCancelAud"
      return request({
        headers: {
          'Accept': 'application/json',
        },
        url: url,
        method: 'post',
        data: data
      })
    },
    //注销
    saveBasicgs (data) {
      return request({
        headers: {
          'Accept': 'application/json',
        },
        url: '/social/assistance/saveBasicCancel',
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
        url: '/social/assistance/saveBasicCancelAud',
        method: 'post',
        data: data
      })
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
  height: 100%;
  width: 100%;
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
  height: 120px;
  width: 100px;
  float: left;
  margin-left: 5%;
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
</style>

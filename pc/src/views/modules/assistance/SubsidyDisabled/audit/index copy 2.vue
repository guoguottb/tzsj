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
                <td style="width:10%;">申请人:</td>
                <td style="width:10%;">{{basicInf.abd_ex2}}</td>
                <td style="width:10%;">身份证号码:</td>
                <td style="width:20%;">{{basicInf.abd_ex3}}</td>
                <td style="width:10%;">性别:</td>
                <td style="width:20%;">{{basicInf.abd_ex12}}</td>
                <td rowspan="2"></td>
              </tr>
              <tr>
                <td>申请时间:</td>
                <td colspan='2'>{{basicInf.abd_dat5}}</td>
                <td>发放金额:</td>
                <td>{{basicInf.abd_ex72}}</td>
                <td></td>
                <td>
                  <img v-if="basicInf.abd_ex35 == '申请'"
                       src='@/assets/img/auditStatus/notSubmitted.png'
                       class='imgSt'>
                  <img v-else-if="basicInf.abd_ex35 == '核对中'"
                       src='@/assets/img/auditStatus/audit.png'
                       class='imgSt'>
                  <img v-else-if="basicInf.abd_ex35 == '办结' || basicInf.abd_ex35=='审核通过' && ab_ex48=='已享受'"
                       src='@/assets/img/auditStatus/enjoyment.png'
                       class='imgSt'>
                  <img v-else-if="basicInf.abd_ex35 == '办结' || basicInf.abd_ex35=='审核通过'"
                       src='@/assets/img/auditStatus/passTheAudit.png'
                       class='imgSt'>
                  <img v-else-if="basicInf.abd_ex35 == '退回'"
                       src='@/assets/img/auditStatus/return.png'
                       class='imgSt'>
                  <img v-else
                       src='@/assets/img/auditStatus/audit.png'
                       class='imgSt'>
                </td>
              </tr>
            </table>
          </div>

          <!-- 变更信息 一步步加classname-->
          <h3 v-if="type == 'bgShow' || className == 'change' "
              class="line_blue"
              id="page14">&emsp;变更信息</h3>
          <div v-if="type == 'bgShow' || className == 'change' "
               class="lineSt"></div>
          <div v-if="type == 'bgShow' || className == 'change' "
               class="top_1">
            <div v-for="(item,index) in childbg"
                 :key="index">
              <!-- <div v-for="(item,index) in childbg" :key="item"> -->
              <div v-if="index>0 && item.acc_ex5!=childbg[index-1].acc_ex5"
                   class='item'>{{item.acc_ex5}}</div>
              <div v-if="item.acc_ex7==''"
                   class='item_child'
                   style='margin-left:15px'>
                <span class='item_text'>{{item.acc_ex1}}</span>:从

                <span style='color:blue'
                      v-if='item.acc_ex2==""'>空</span>
                <span style='color:blue'
                      v-else-if='item.acc_ex2.indexOf("/social/minios/show?filename")==-1'>{{item.acc_ex2}}</span>

                <!-- item.acc_ex2.split(',')只有自己的数组 -->
                <!-- item.acc_ex2.match(/''(\S*)''/)[1] 以''开头 以''结束的字符串 -->
                <image-view v-else
                            :imgList="item.acc_ex2.match(/''(\S*)''/)[1].split(',')"
                            height="150px"
                            width="150px"></image-view>

                变成
                <span style='color:green'
                      v-if='item.acc_ex3==""'>空</span>
                <span style='color:green'
                      v-else-if='item.acc_ex3.indexOf("/social/minios/show?filename")==-1'>{{item.acc_ex3}}</span>
                <!-- item.acc_ex3.split(',')只有自己的数组 -->
                <!-- item.acc_ex2.match(/''(\S*)''/)[1] 以''开头 以''结束的字符串 -->
                <image-view v-else
                            :imgList="item.acc_ex3.match(/''(\S*)''/)[1].split(',')"
                            height="150px"
                            width="150px"></image-view>
              </div>
              <div v-else>
                <div v-if="index>0 && item.acc_ex7!=childbg[index-1].acc_ex7">
                  <div v-if="item.acc_ex6=='修改'"
                       class='item_1_1'>
                    <div class='item_1'>{{item.acc_ex8}}数据变更情况:</div>
                    <span class='item_1_1 item_text'>{{item.acc_ex1}}</span>:从<span style='color:blue'>{{item.acc_ex2=="" ? "空":item.acc_ex2}}</span>变成<span style='color:green'>{{item.acc_ex3}}</span>；
                  </div>
                  <div v-else-if="item.acc_ex6=='删除'"
                       class='item_1_1'>
                    <div class='item_1'>删除数据：</div><span class='item_1_1 item_text'>{{item.acc_ex1}}</span>:{{item.acc_ex2}};
                  </div>
                  <div v-else
                       class='item_1_1'>
                    <div class='item_1'>新增数据：</div><span class='item_1_1 item_text'>{{item.acc_ex1}}</span>:{{item.acc_ex3}};
                  </div>
                </div>
                <div v-else
                     style='margin-left:30px;'>
                  <div v-if="item.acc_ex6=='修改'"><span class='item_text'>{{item.acc_ex1}}</span>:从<span style='color:blue'>{{item.acc_ex2=="" ? "空":item.acc_ex2}}</span>变成<span style='color:green'>{{item.acc_ex3}}</span>；</div>
                  <div v-else-if="item.acc_ex6=='删除'">
                    <div v-if="item.acc_ex2!=''">
                      <span class='item_text'>{{item.acc_ex1}}</span>:{{item.acc_ex2}};
                    </div>
                  </div>
                  <div v-else><span class='item_text'>{{item.acc_ex1}}</span>:{{item.acc_ex3}};</div>
                </div>
              </div>
            </div>
          </div>
          <!-- 变更信息 -->

          <h3 class="line_blue"
              id="page2">&emsp;基础信息</h3>
          <div class="lineSt"></div>
          <div class="top_1">
            <table class="top_2">
              <tr style="height:40px;">
                <td style="width:10%;">性别:</td>
                <td style="width:40%;">{{basicInf.abd_ex12}}</td>
                <td style="width:10%;">年龄:</td>
                <td style="width:40%;">{{basicInf.abd_ex34}}</td>
              </tr>
              <tr style="height:40px;">
                <td style="width:10%;">户籍类别:</td>
                <td style="width:40%;">{{basicInf.abd_ex17}}</td>
                <td style="width:10%;">民族:</td>
                <td style="width:40%;">{{basicInf.abd_ex16}}</td>
              </tr>
              <tr style="height:40px;">
                <td style="width:10%;">与户主关系:</td>
                <td style="width:40%;">{{basicInf.abd_ex66}}</td>
                <td style="width:10%;">残疾证号:</td>
                <td style="width:40%;">{{basicInf.abd_ex5}}</td>
              </tr>
              <tr style="height:40px;">
                <td style="width:10%;">残疾类别:</td>
                <td style="width:40%;">{{basicInf.abd_ex15}}</td>
                <td style="width:10%;">残疾等级:</td>
                <td style="width:40%;">{{basicInf.abd_ex14}}</td>
              </tr>
              <tr style="height:40px;">
                <td style="width:10%;">户籍住址:</td>
                <td style="width:40%;">{{basicInf.abd_ex18}}</td>
                <td style="width:10%;">现住址:</td>
                <td style="width:40%;">{{basicInf.abd_ex19}}</td>
              </tr>
              <tr style="height:40px;">
                <td style="width:10%;">家庭人口数:</td>
                <td style="width:40%;">{{basicInf.abd_ex67}}</td>
                <td style="width:10%;">伤残原因说明:</td>
                <td style="width:40%;">{{basicInf.abd_ex68}}</td>
              </tr>
              <tr style="height:40px;">
                <td style="width:10%;">残疾人收入说明:</td>
                <td style="width:40%;">{{basicInf.abd_ex69}}</td>
                <td style="width:10%;">是否享受低保:</td>
                <td style="width:40%;">{{basicInf.abd_ex70}}</td>
              </tr>
              <tr style="height:40px;">
                <td style="width:10%;">家庭特征:</td>
                <td style="width:40%;">{{basicInf.abd_ex73}}</td>
                <td style="width:10%;">联系电话:</td>
                <td style="width:40%;">{{basicInf.abd_ex20}}</td>
              </tr>
              <tr style="height:40px;">
                <td style="width:10%;">行政区划:</td>
                <td style="width:40%;">{{address}}</td>
                <td>是否属于村干部或经办人员近亲属:</td>
                <td>{{basicInf.abd_ex75}}</td>
              </tr>
              <tr style="height:40px;">
                <td style="width:10%;">求助描述:</td>
                <td style="width:40%;">{{basicInf.abd_ex76}}</td>
                <td style="width:10%;">求助原因:</td>
                <td style="width:40%;">{{basicInf.abd_ex77}}</td>
              </tr>

              <tr style="height:40px;">
                <td>求助原因:</td>
                <td>{{basicInf.abd_ex77}}</td>
                <td>求助描述:</td>
                <td colspan="3">{{basicInf.abd_ex76}}</td>
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
                <td style="width:20%;">{{basicInf.abd_ex23}}</td>
                <td style="width:10%;">开户人:</td>
                <td style="width:20%;">{{basicInf.abd_ex78}}</td>
                <td style="width:10%;">银行账号:</td>
                <td style="width:20%;">{{basicInf.abd_ex24}}</td>
              </tr>
            </table>
          </div>
          <h3 class="line_blue"
              id="page7">&emsp;家庭财产情况</h3>
          <div class="lineSt"></div>
          <div class="top_1">
            <div style="margin-top:10px;">
              <table class="top_2">
                <tr style="height:40px;">
                  <td style="width:10%;">银行总存款:</td>
                  <td style="width:40%;">{{basicInf.abd_ex79}}</td>
                  <td style="width:10%;">有价证券:</td>
                  <td style="width:40%;">{{basicInf.abd_ex80}}</td>
                </tr>
                <tr style="height:40px;">
                  <td style="width:10%;">债权:</td>
                  <td style="width:40%;">{{basicInf.abd_ex81}}</td>
                  <td style="width:10%;">其他金融产品:</td>
                  <td style="width:40%;">{{basicInf.abd_ex82}}</td>
                </tr>
              </table>
            </div>
          </div>
          <h3 class="line_blue"
              id="page8">&emsp;已享受救助情况</h3>
          <div class="lineSt"></div>
          <div class="top_1">
            <div class="top_3">
              <el-table :data="tableData5"
                        max-height="250"
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
                        max-height="250"
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
                      <span>核对授权书(<span style='color:red'>{{basicInf.abd_ex92.split(',')[0]=="" ? 0 : basicInf.abd_ex92.split(',').length}}</span>)</span>
                    </div>
                    <image-view :imgList="this.basicInf.abd_ex92.split(',')"
                                height="150px"
                                width="150px"></image-view>
                  </el-card>
                </el-col>
                <el-col :span="12">
                  <el-card class="box-card">
                    <div slot="header"
                         class="clearfix">
                      <span>身份证(<span style='color:red'>{{basicInf.abd_ex37.split(',')[0]=="" ? 0 : basicInf.abd_ex37.split(',').length}}</span>)</span>
                    </div>
                    <image-view :imgList="this.basicInf.abd_ex37.split(',')"
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
                      <span>公示图片(<span style='color:red'>{{basicInf.abd_ex93.split(',')[0]=="" ? 0 : basicInf.abd_ex93.split(',').length}}</span>)</span>
                    </div>
                    <image-view :imgList="this.basicInf.abd_ex93.split(',')"
                                height="150px"
                                width="150px"></image-view>

                  </el-card>
                </el-col>
                <el-col :span="12">
                  <el-card class="box-card">
                    <div slot="header"
                         class="clearfix">
                      <span>审核审批表(<span style='color:red'>{{basicInf.abd_ex94.split(',')[0]=="" ? 0 : basicInf.abd_ex94.split(',').length}}</span>)</span>
                    </div>
                    <image-view :imgList="this.basicInf.abd_ex94.split(',')"
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
                      <span>其他材料(<span style='color:red'>{{basicInf.abd_ex38.split(',')[0]=="" ? 0 : basicInf.abd_ex38.split(',').length}}</span>)</span>
                    </div>
                    <image-view :imgList="this.basicInf.abd_ex38.split(',')"
                                height="150px"
                                width="150px"></image-view>

                  </el-card>
                </el-col>
                <el-col :span="12">
                  <el-card class="box-card">
                    <div slot="header"
                         class="clearfix">
                      <span>近亲属备案表(<span style='color:red'>{{basicInf.abd_ex95.split(',')[0]=="" ? 0 : basicInf.abd_ex95.split(',').length}}</span>)</span>
                    </div>
                    <image-view :imgList="this.basicInf.abd_ex95.split(',')"
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
                      <span>民主评议(<span style='color:red'>{{basicInf.abd_ex96.split(',')[0]=="" ? 0 : basicInf.abd_ex96.split(',').length}}</span>)</span>
                    </div>
                    <image-view :imgList="this.basicInf.abd_ex96.split(',')"
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
              v-if="type == 'cs' && className != 'change' && className != 'cancel'">&emsp;审核</h3>
          <div class="lineSt"
               v-if="type == 'cs' && className != 'change' && className != 'cancel'"></div>
          <div class="top_1"
               v-if="type == 'cs' && className != 'change' && className != 'cancel'">
            <el-row>
              <el-col :span="2">
                <div style="line-height: 30px;text-align:center;">审核意见</div>
              </el-col>
              <el-col :span="6">
                <el-select v-model="auditValue.abd_ex55"
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
                <el-input v-model="auditValue.abd_ex53"></el-input>
              </el-col>

              <el-col :span="2"
                      style="line-height: 30px;text-align:center;">
                <div>审核时间</div>
              </el-col>
              <el-col :span="6">
                <el-date-picker v-model="auditValue.abd_dat8"
                                type="datetime"
                                value-format="yyyy-MM-dd HH:mm"
                                placeholder="选择日期时间"></el-date-picker>
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
                          v-model="auditValue.abd_ex54"></el-input>
              </el-col>
            </el-row>
            <el-row style="margin-top: 10px;"
                    type="flex"
                    justify="center">
              <el-col :span="24"
                      style="text-align: center;">
                <el-button type="primary"
                           @click="save(auditValue,1)">保存</el-button>
              </el-col>
            </el-row>
          </div>
          <br>
          <!-- //退回 -->
          <h3 class="line_blue"
              id="page11"
              style="margin-top: 20px;"
              v-if="type == 'th' && className != 'change' && className != 'cancel' ">&emsp;审核</h3>
          <div class="lineSt"
               v-if="type == 'th' && className != 'change' && className != 'cancel' "></div>
          <div class="top_1"
               v-if="type == 'th' && className != 'change' && className != 'cancel' ">
            <el-row>
              <el-col :span="2">
                <div style="line-height: 30px;text-align:center">审核意见</div>
              </el-col>
              <el-col :span="6">
                <el-select value='退回'
                           placeholder="请选择">
                  <el-option v-for="item in options1"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-col>
              <el-col :span="2">
                <div style="line-height: 30px;text-align:center">退回人</div>
              </el-col>
              <el-col :span="6">
                <el-input v-model="auditValue.abd_ex62"></el-input>
              </el-col>
              <!-- <el-col :span="2" style="line-height: 30px;">
								<div>审核时间</div>
							</el-col>
							<el-col :span="6">
								<el-date-picker
									  v-model="auditValue.abd_dat8"
									  type="datetime"
									   value-format="yyyy-MM-dd HH:mm"
									  placeholder="选择日期时间">
								</el-date-picker>
							</el-col> -->
            </el-row>
            <el-row style="margin-top: 10px;">
              <el-col :span="2"
                      style="line-height: 30px;text-align:center">
                <div>退回原因</div>
              </el-col>
              <el-col :span="22">
                <el-input type="textarea"
                          autosize
                          v-model="auditValue.abd_ex63"></el-input>
              </el-col>
            </el-row>
            <el-row style="margin-top: 10px;"
                    type="flex"
                    justify="center">
              <el-col :span="24"
                      style="text-align: center;">
                <el-button type="primary"
                           @click="save(auditValue,4)">保存</el-button>
              </el-col>
            </el-row>
          </div>
          <br>

          <!-- 审批 -->
          <h3 class="line_blue"
              id="page11"
              style="margin-top: 20px;"
              v-if="type == 'sp' && className != 'change' && className != 'cancel' ">&emsp;审批</h3>
          <div class="lineSt"
               v-if="type == 'sp' && className != 'change' && className != 'cancel' "></div>
          <div class="top_1"
               v-if="type == 'sp' && className != 'change' && className != 'cancel' ">
            <el-row>
              <el-col :span="2">
                <div style="line-height: 30px;text-align:center">审批意见</div>
              </el-col>
              <el-col :span="6">
                <el-select v-model="approval.abd_ex58"
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
                <el-input v-model="approval.abd_ex56"></el-input>
              </el-col>
              <el-col :span="2"
                      style="line-height: 30px;text-align:center;">
                <div>审批时间</div>
              </el-col>
              <el-col :span="6">
                <el-date-picker v-model="approval.abd_dat9"
                                type="datetime"
                                value-format="yyyy-MM-dd HH:mm"
                                placeholder="选择审批时间"></el-date-picker>
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
                          v-model="approval.abd_ex57"></el-input>
              </el-col>
            </el-row>
            <el-row style="margin-top: 10px;"
                    type="flex"
                    justify="center">
              <el-col :span="24"
                      style="text-align: center;">
                <el-button type="primary"
                           @click="save(approval,2)">保存</el-button>
              </el-col>
            </el-row>
          </div>
          <br>
          <!-- 注销 -->
          <h3 class="line_blue"
              id="page11"
              style="margin-top: 20px;"
              v-if="type == 'zx' && className != 'change' && className != 'cancel'">&emsp;注销</h3>
          <div class="lineSt"
               v-if="type == 'zx' && className != 'change' && className != 'cancel'"></div>
          <div class="top_1"
               v-if="type == 'zx' && className != 'change' && className != 'cancel'">
            <el-row>
              <el-col :span="2"
                      style="line-height: 30px;text-align:center;">
                <div>注销时间</div>
              </el-col>
              <el-col :span="22">
                <el-date-picker v-model="canclezx.abd_dat10"
                                type="datetime"
                                value-format="yyyy-MM-dd HH:mm"
                                placeholder="选择注销时间"></el-date-picker>
              </el-col>
            </el-row>
            <el-row style="margin-top: 10px;">
              <el-col :span="2"
                      style="line-height: 30px;text-align:center">
                <div>注销原因</div>
              </el-col>
              <el-col :span="22">
                <el-input type="textarea"
                          autosize
                          v-model="ac_ex8"></el-input>
              </el-col>
            </el-row>
            <el-row style="margin-top: 10px;"
                    type="flex"
                    justify="center">
              <el-col :span="24"
                      style="text-align: center;">
                <el-button type="primary"
                           @click="save(canclezx,3)">保存</el-button>
              </el-col>
            </el-row>
          </div>
          <br>
          <!-- 公示 -->
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
                <el-select v-model="publicity.abd_ex61"
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
                <el-input v-model="publicity.abd_ex98"></el-input>
              </el-col>
              <el-col :span="2"
                      style="line-height: 30px;;text-align:center">
                <div>公示开始时间</div>
              </el-col>
              <el-col :span="6">
                <el-date-picker v-model="publicity.abd_dat13"
                                type="date"
                                size="small"
                                style="width:90%"
                                value-format="yyyy-MM-dd"
                                placeholder="选择公示开始时间"></el-date-picker>
              </el-col>
            </el-row>
            <el-row style='margin-top:10px'>
              <el-col :span="2"
                      style="line-height: 30px;text-align:center">
                <div>公示结束时间</div>
              </el-col>
              <el-col :span="6">
                <el-date-picker v-model="publicity.abd_dat14"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="选择公示结束时间"></el-date-picker>
              </el-col>
              <el-col :span="2"
                      style="line-height: 30px;text-align:center">
                <div>备注</div>
              </el-col>
              <el-col :span="14">
                <el-input autosize
                          v-model="publicity.abd_ex60"></el-input>
              </el-col>

            </el-row>
            <el-row style="margin-top: 10px;">

              <el-col :span="20"
                      :offset="2"
                      class="my-col">
                <el-card class="box-card">
                  <div slot="header"
                       class="clearfix">
                    <el-button style="float: left; padding: 3px 0"
                               type="text"
                               @click="delImage('abd_ex93')">删除</el-button>
                    <span>公示图片</span>
                    <el-button style="float: right; padding: 3px 0"
                               type="text"
                               @click="uploads('abd_ex93')">上传</el-button>
                  </div>
                  <div class="block">
                    <image-view :imgList="publicity.abd_ex93.split(',')"
                                @imgIndex="imgInd($event,'abd_ex93_imgIn')"></image-view>

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
                           @click="save(publicity,5)">保存</el-button>
              </el-col>
            </el-row>
          </div>
          <br>

          <!-- 变更模块审核 -->
          <h3 class="line_blue"
              id="page11"
              style="margin-top: 10px;"
              v-if="type == 'cs' && className == 'change'">&emsp;审核</h3>
          <div class="lineSt"
               v-if="type == 'cs' && className == 'change'"></div>
          <div class="top_1"
               v-if="type == 'cs' && className == 'change'">
            <el-row>
              <el-col :span="2">
                <div style="line-height: 30px;text-align:center;">审核意见</div>
              </el-col>
              <el-col :span="6">
                <el-select v-model="ac_ex4"
                           placeholder="请选择">
                  <el-option v-for="item in options4"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-col>
              <el-col :span="2">
                <div style="line-height: 30px;text-align:center;">审核人</div>
              </el-col>
              <el-col :span="6">
                <el-input v-model="ac_ex6"></el-input>
              </el-col>
              <el-col :span="2"
                      style="line-height: 30px;text-align:center;">
                <div>审核时间</div>
              </el-col>
              <el-col :span="6">
                <el-date-picker v-model="ac_dat2"
                                type="datetime"
                                value-format="yyyy-MM-dd HH:mm"
                                placeholder="选择日期时间"></el-date-picker>
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
                          v-model="ac_ex5"></el-input>
              </el-col>
            </el-row>
            <el-row style="margin-top: 10px;"
                    type="flex"
                    justify="center">
              <el-col :span="24"
                      style="text-align: center;">
                <el-button type="primary"
                           @click="savechange(1)">保存</el-button>
              </el-col>
            </el-row>
          </div>
          <br>
          <!-- 变更模块审核 -->
          <!-- 变更模块审批 -->
          <h3 class="line_blue"
              id="page11"
              style="margin-top: 10px;"
              v-if="type == 'sp' && className == 'change' ">&emsp;审核</h3>
          <div class="lineSt"
               v-if="type == 'sp' && className == 'change' "></div>
          <div class="top_1"
               v-if="type == 'sp' && className == 'change' ">
            <el-row>
              <el-col :span="2">
                <div style="line-height: 30px;text-align:center;">审批意见</div>
              </el-col>
              <el-col :span="6">
                <el-select v-model="ac_ex7"
                           placeholder="请选择">
                  <el-option v-for="item in options4"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-col>
              <el-col :span="2">
                <div style="line-height: 30px;text-align:center;">审批人</div>
              </el-col>
              <el-col :span="6">
                <el-input v-model="ac_ex9"></el-input>
              </el-col>
              <el-col :span="2"
                      style="line-height: 30px;text-align:center;">
                <div>审批时间</div>
              </el-col>
              <el-col :span="6">
                <el-date-picker v-model="ac_dat3"
                                type="datetime"
                                value-format="yyyy-MM-dd HH:mm"
                                placeholder="选择日期时间"></el-date-picker>
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
                          v-model="ac_ex8"></el-input>
              </el-col>
            </el-row>
            <el-row style="margin-top: 10px;"
                    type="flex"
                    justify="center">
              <el-col :span="24"
                      style="text-align: center;">
                <el-button type="primary"
                           @click="savechange(2)">保存</el-button>
              </el-col>
            </el-row>
          </div>
          <br>
          <!-- 变更模块审批 -->
          <!-- 注销模块审核 -->
          <h3 class="line_blue"
              id="page11"
              style="margin-top: 10px;"
              v-if="type == 'cs' && className == 'cancel'">&emsp;审核</h3>
          <div class="lineSt"
               v-if="type == 'cs' && className == 'cancel'"></div>
          <div class="top_1"
               v-if="type == 'cs' && className == 'cancel'">
            <el-row>
              <el-col :span="2">
                <div style="line-height: 30px;text-align:center;">审核意见</div>
              </el-col>
              <el-col :span="6">
                <el-select v-model="ac_ex1"
                           placeholder="请选择">
                  <el-option v-for="item in options4"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-col>
              <el-col :span="2">
                <div style="line-height: 30px;text-align:center;">审核人</div>
              </el-col>
              <el-col :span="6">
                <el-input v-model="ac_ex3"></el-input>
              </el-col>
              <el-col :span="2"
                      style="line-height: 30px;text-align:center;">
                <div>审核时间</div>
              </el-col>
              <el-col :span="6">
                <el-date-picker v-model="ac_dat2"
                                type="datetime"
                                value-format="yyyy-MM-dd HH:mm"
                                placeholder="选择日期时间"></el-date-picker>
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
                          v-model="ac_ex2"></el-input>
              </el-col>
            </el-row>
            <el-row style="margin-top: 10px;"
                    type="flex"
                    justify="center">
              <el-col :span="24"
                      style="text-align: center;">
                <el-button type="primary"
                           @click="savecancel(1)">保存</el-button>
              </el-col>
            </el-row>
          </div>
          <br>
          <!-- 注销模块审核 -->
          <!-- 注销模块审批 -->
          <h3 class="line_blue"
              id="page11"
              style="margin-top: 10px;"
              v-if="type == 'sp' && className == 'cancel' ">&emsp;审核</h3>
          <div class="lineSt"
               v-if="type == 'sp' && className == 'cancel' "></div>
          <div class="top_1"
               v-if="type == 'sp' && className == 'cancel' ">
            <el-row>
              <el-col :span="2">
                <div style="line-height: 30px;text-align:center;">审批意见</div>
              </el-col>
              <el-col :span="6">
                <el-select v-model="ac_ex4"
                           placeholder="请选择">
                  <el-option v-for="item in options4"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-col>
              <el-col :span="2">
                <div style="line-height: 30px;text-align:center;">审批人</div>
              </el-col>
              <el-col :span="6">
                <el-input v-model="ac_ex6"></el-input>
              </el-col>
              <el-col :span="2"
                      style="line-height: 30px;text-align:center;">
                <div>审批时间</div>
              </el-col>
              <el-col :span="6">
                <el-date-picker v-model="ac_dat3"
                                type="datetime"
                                value-format="yyyy-MM-dd HH:mm"
                                placeholder="选择日期时间"></el-date-picker>
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
                          v-model="ac_ex5"></el-input>
              </el-col>
            </el-row>
            <el-row style="margin-top: 10px;"
                    type="flex"
                    justify="center">
              <el-col :span="24"
                      style="text-align: center;">
                <el-button type="primary"
                           @click="savecancel(2)">保存</el-button>
              </el-col>
            </el-row>
          </div>
          <br>
          <!-- 注销模块审批 -->

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

                <!-- 变更模块,注销模块 -->
                <tbody v-for="(itemR1,index) in record1"
                       :key="index">
                  <!-- <tbody  v-for="(itemR,index) in record1" :key="itemR"> -->
                  <tr>
                    <td style="color:#899197;height:30px">处理步骤：</td>
                    <td v-if="type == 'bgShow' || className == 'change'">申请变更</td>
                    <td v-else-if="type == 'zxShow' || className == 'cancel' ">申请注销</td>
                    <td style="color:#899197">处理时间：</td>
                    <td>{{itemR1.ac_dat1}}</td>
                    <td style="color:#899197">处理结果：</td>
                    <td rowspan="2"
                        style="text-align:left">
                      <img src="@/assets/img/auditStatus/agree.png"
                           style="width:100px">
                    </td>
                  </tr>
                  <tr>
                    <td v-if="type == 'bgShow' || className == 'change'"
                        style="color:#899197;height:30px">申请变更人：</td>
                    <td v-else-if="type == 'zxShow' || className == 'cancel' "
                        style="color:#899197;height:30px">申请注销人：</td>
                    <td>{{itemR1.ac_ex10}}</td>
                    <td style="color:#899197">申请理由：</td>
                    <td>{{itemR1.ac_ex8}}</td>
                  </tr>
                </tbody>
                <!-- 变更模块,注销模块 -->

                <!-- <tbody v-for="(itemR,index) in record2" :key="index"> -->
                <tbody v-for="(itemR,index) in record2"
                       :key="itemR.ar_id">
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
                    <td>{{itemR.abd_dat13}}</td>
                    <td style="color:#899197">公示地点：</td>
                    <td>{{itemR.abd_ex47}}</td>
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

              </table>
            </div>
          </div>
        </el-form>
      </div>
      <div class="ainfo2">
        <div style="margin-left:20px;margin-top:20px;">
          <ul>
            <li :class="{listStyle:isShow1}"
                @click="isShow(1)">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow1}"
                 @click="counter('#page1')">档案信息</a><br>
            </li>

            <li v-if="type == 'bgShow' || className == 'change' "
                :class="{listStyle:isShow14}"
                @click="isShow(14)">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow14}"
                 @click="counter('#page14')">变更信息</a><br>
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
            <!-- <li :class="{listStyle:isShow4}" @click="isShow(4)">
							<a class="ainfoFont" :class="{listStyleA:!isShow4}" @click="counter('#page4')">共同生活家庭成员情况</a><br>
						</li> -->
            <!-- 	<li :class="{listStyle:isShow5}" @click="isShow(5)">
							<a class="ainfoFont" :class="{listStyleA:!isShow5}" @click="counter('#page5')">非共同生活赡抚扶养人信息</a><br>
						</li> -->
            <!-- <li :class="{listStyle:isShow12}" @click="isShow(12)">
							<a class="ainfoFont" :class="{listStyleA:!isShow12}" @click="counter('#page12')">非共同生活赡抚扶养人家庭成员信息</a><br>
						</li> -->
            <!-- <li :class="{listStyle:isShow6}" @click="isShow(6)">
							<a class="ainfoFont" :class="{listStyleA:!isShow6}" @click="counter('#page6')">家庭收入情况(12个月)</a><br>
						</li> -->
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
                @click="isShow(10)">
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
// import  baseURL from '@/utils/baseUrl'
export default {
  name: "dbListView",
  components: {
  },
  data () {
    return {
      dialogVisible3: false,
      uploadId: '',
      loading: false,
      assistance: [],
      // 行政区划
      address: '',
      record1: [],
      record2: [],
      tableData5: [],
      tableData6: [],
      // 变更模块
      childbg: [],
      ac_ex4: '',
      ac_ex6: '',
      ac_dat2: '',
      ac_ex5: '',
      ac_ex7: '',
      ac_ex9: '',
      ac_dat3: '',
      // 注销模块
      ac_ex1: '',
      ac_ex3: '',
      ac_ex2: '',
      // 注销原因
      ac_ex8: '',
      // 初审/退回
      auditValue: {
      },
      // 注销
      canclezx: {
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
        value: '退回委托确认',
        label: '退回委托确认'
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
      }, {
        value: '退回委托确认',
        label: '退回委托确认'
      }
        //  {
        // 	value: '退回重新核查',
        // 	label: '退回重新核查'
        // }
      ],
      options3: [{
        value: '同意',
        label: '同意'
      }, {
        value: '退回',
        label: '退回'
      }, {
        value: '退回委托确认',
        label: '退回委托确认'
      }],
      options4: [{
        value: '同意',
        label: '同意'
      }, {
        value: '退回',
        label: '退回'
      }],
      isShow1: false,
      isShow2: true,
      isShow3: true,
      isShow4: true,
      isShow5: true,
      // isShow6: true,
      isShow7: true,
      isShow8: true,
      isShow9: true,
      isShow10: true,
      isShow11: true,
      isShow12: true,
      basicInf: {},
      sId: "",
      cId: "",
      type: "",
      className: '',
      // flag:true,
      abd_ex93_imgIn: 0, //imageIndex
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
      // let oDiv6 = document.querySelector('#page6');
      let oDiv7 = document.querySelector('#page7');
      let oDiv8 = document.querySelector('#page8');
      let oDiv9 = document.querySelector('#page9');
      let oDiv10 = document.querySelector('#page10');
      let oDiv11 = document.querySelector('#page11');
      let oDiv12 = document.querySelector('#page12');
      let oDiv14 = document.querySelector('#page14');

      // 顺序跟上面显示顺序要相反
      let clientHeight = document.querySelector('.info2').clientHeight
      let recordtClientHeight = document.querySelector('#recordt').scrollHeight
      // 在新增dialog打开时不执行后面的程序
      if (!oDiv1 || !oDiv2 || !oDiv3 || !oDiv7 || !oDiv8 || !oDiv9 || !oDiv10) {
        return ''
      }
      if (recordtClientHeight + oDiv10.clientHeight < clientHeight && scrollTop > (oDiv10.offsetTop - oDiv1.offsetTop - clientHeight + recordtClientHeight + oDiv10.clientHeight)) {
        // console.log('触发了10-1')
        this.isShow(10)
      } else if (scrollTop > (oDiv10.offsetTop - oDiv1.offsetTop)) {
        // console.log('触发了10-2')
        this.isShow(10)
      }
      else if (oDiv11 && scrollTop > (oDiv11.offsetTop - oDiv1.offsetTop)) {
        // console.log('触发了11')
        this.isShow(11)
      } else if (scrollTop > (oDiv9.offsetTop - oDiv1.offsetTop)) {
        // console.log('触发了9')
        this.isShow(9)
      } else if (scrollTop > (oDiv8.offsetTop - oDiv1.offsetTop)) {
        // console.log('触发了8')
        this.isShow(8)
      } else if (scrollTop > (oDiv7.offsetTop - oDiv1.offsetTop)) {
        // console.log('触发了7')
        this.isShow(7)
      } else if (scrollTop > (oDiv3.offsetTop - oDiv1.offsetTop)) {
        // console.log('触发了3')
        this.isShow(3)
      } else if (scrollTop > (oDiv2.offsetTop - oDiv1.offsetTop)) {
        // console.log('触发了2')
        this.isShow(2)
      } else if (oDiv14 && scrollTop > (oDiv14.offsetTop - oDiv1.offsetTop)) {
        // console.log('触发了14')
        this.isShow(14)
      } else if (scrollTop > (oDiv1.offsetTop - oDiv1.offsetTop)) {
        // console.log('触发了1')
        this.isShow(1)
      }
    },
    counter (id) { //counter1是绑定的点击事件名称
      document.querySelector(id).scrollIntoView(true);
    },
    loadData () {
      this.className = this.$route.query.className;
      this.sId = this.$route.query.sId;
      this.cId = this.$route.query.cId;
      this.type = this.$route.query.type;
      this.fId = this.$route.query.fId
      this.getData({
        sId: this.sId,
      }).then(res => {
        this.loadSalvation({
          sId: this.sId,
          cId: this.cId,
          idcard: this.basicInf.abd_ex3
        }).then(res2 => {
          console.log(res2)
          this.tableData5 = res2[0].data
          this.tableData6 = res2[0].data2
        }).catch(res2 => {
          console.log('loadSalvation')
          this.$emit("closes", false)
        })
        // console.log(res[0].abd_ex65)
        // 行政区划拼接
        var arr = res[0].abd_ex65.split(',')
        var arr2 = [];
        var arr3 = [];
        console.log(arr)
        for (let i in arr) {
          arr2 = arr[i].split("#")
          arr3.push(arr2[0])
          // console.log(arr2);
        }
        // console.log(arr3);
        this.address = arr3.join(',')
        // 变更模块,注销模块审核人、审批人
        this.ac_ex6 = res[0].userName
        this.ac_ex9 = res[0].userName
        this.ac_ex3 = res[0].userName


        this.basicInf = res[0]
        // 初审、退回
        this.auditValue = res[0]
        // 审核人/退回人赋值
        this.auditValue.abd_ex53 = res[0].userName
        this.auditValue.abd_ex62 = res[0].userName
        // 注销
        this.canclezx = res[0]
        // 审批
        this.approval = res[0]
        // 审批人赋值
        this.auditValue.abd_ex56 = res[0].userName
        // 公示
        this.publicity = res[0]
        // this.publicity.abd_dat13 = new Date()
        // this.publicity.abd_dat14 = new Date()


        // 变更模块
        this.childbg = res[1].disabled
        console.log(this.childbg, "变更记录");
        console.log(this.type, "类型");
        // record在残疾人班级的审批记录有公示开始的时候会不显示
        this.record1 = []
        this.record2 = []
        // 变更模块,注销模块,和申请模块（className是给审核审批用的）
        if (this.type == 'bgShow' || this.className == 'change') {
          // debugger
          this.getChildrenRecordData({
            sId: this.fId,
            type: 'change'
          }).then(res => {
            this.record1 = res[0].record1;
            this.record2 = res[0].record2;
          }).catch(res => {
            this.$emit("closes", false)
            console.log(res)
          })
        } else if (this.type == 'zxShow') {
          this.getChildrenRecordData({
            sId: this.fId,
            type: 'cancel'
          }).then(res => {
            console.log(res, "注销数据");
            this.record1 = res[0].record1;
            this.record2 = res[0].record2;
          }).catch(res => {
            this.$emit("closes", false)
            console.log(res)
          })
        } else {
          this.getChildrenRecordData({
            sId: this.sId,
            type: ''
          }).then(res => {

            // let record1=res[0].record1;
            // this.record2=res[0].record2;
            this.recordgs1(res[0].record2)
          }).catch(res => {
            this.$emit("closes", false)
            console.log(res)
          })
        }
      }).catch(res => {
        this.$emit("closes", false)
      })


    },
    recordgs1 (rec) {
      for (let i in rec) {
        console.log(i)
        // if ("公示开始" == rec[i].ar_ex4 && this.flag == false) {
        // 	console.log('进入了第一个')
        // 	return true;
        // }
        this.record2[i] = {
          ar_ex4: rec[i].ar_ex4,
          ar_dat1: rec[i].ar_dat1,
          ar_ex3: rec[i].ar_ex3,
          ar_ex5: rec[i].ar_ex5,
          ar_ex6: rec[i].ar_ex6,
          ar_ex2: rec[i].ar_ex2,
          flag: false
        }
        console.log('给record2复制')
        if ("公示开始" == rec[i].ar_ex4) {
          console.log('进入了第三个')
          this.record2[i].flag = true
          console.log(this.basicInf.abd_dat13)
          this.record2[i].abd_dat13 = this.basicInf.abd_dat13 + "~" + this.basicInf.abd_dat14
          this.record2[i].abd_ex98 = this.basicInf.abd_ex98
          console.log(rec)
        }
        // if ("公示开始" == rec[i].ar_ex4 && this.flag) {
        // 	console.log('进入了第三个')
        // 	this.record2[i].flag = true
        // 	this.flag = false;
        // 	console.log(this.basicInf.abd_dat13)
        // 	this.record2[i].abd_dat13 = this.basicInf.abd_dat13 + "~" + this.basicInf.abd_dat14
        // 	this.record2[i].abd_ex98 = this.basicInf.abd_ex98
        // 	console.log(rec)
        // }
      }
    },

    getData (sid) {
      console.log("getData");
      return request({
        headers: {
          'Accept': 'application/json',
        },
        url: '/social/assistance/getDisabledBasics',
        method: 'post',
        // data:{
        // sId:"57943",
        // },
        data: sid
      })
    },
    getChildrenRecordData (data) {
      console.log("getChildrenRecordData");
      return request({
        headers: {
          'Accept': 'application/json',
        },
        url: '/social/assistance/getDisabledRecordData',
        method: 'post',
        // data:{
        // sId:"57943",
        // },
        data: data
      })
    },
    save (data, num) {
      if (data.abd_ex55 == "退回委托确认" || data.abd_ex58 == "退回委托确认" || data.abd_ex61 == "退回委托确认") {
        this.loading = true;
        setSatus({
          sId: this.sId
        }).then((res) => {
          if (res[0].status == "+OK") {
            this.loading = false;
            this.$message.success(res[0].msg)
            this.$emit("closes", false)

          } else {
            this.loading = false;
            this.$message.error(res[0].msg)
          }
        }).catch((res) => {
          this.loading = false;
          this.$emit("closes", false)
          this.$message.error("请求超时或网络异常");
        })
      }
      else if (num == 1 && data.abd_ex55 == "") {
        this.$message.error('请选择审核意见');
        return;
      } else if (num == 1 && data.abd_ex53 == "") {
        this.$message.error('请填写审核人');
        return;
      } else if (num == 2 && data.abd_ex56 == "") {
        this.$message.error('请填写审批人');
        return;
      } else if (num == 2 && data.abd_ex58 == "") {
        this.$message.error('请填写审批意见');
        return;
      } else if (num == 3 && this.ac_ex8 == "") {
        this.$message.error('请填写注销原因');
        return;
      } else if (num == 4 && data.abd_ex63 == "") {
        this.$message.error('请填写退回原因');
        return;
      } else if (num == 4 && data.abd_ex62 == "") {
        this.$message.error('请填写退回人');
        return;
      } else if (num == 5 && data.abd_ex61 == "") {
        this.$message.error('请填写公示结果');
        return;
      } else if (num == 5 && data.abd_ex98 == "") {
        this.$message.error('请填写公示地点');
        return;
      } else if (num == 5 && !data.abd_dat13) {
        this.$message.warning("请选择公示开始时间")
        return;
      } else if (num == 5 && !data.abd_dat14) {
        this.$message.warning("请选择公示结束时间")
        return;
      } else if (num == 5 && (data.abd_dat13 > data.abd_dat14)) {
        // 判断公示开始时间比公示结束时间早就取消保存
        this.$message.warning("公示结束时间比公示开始时间早")
        return false
      } else {
        this.loading = true;
        this.saveBasic({
          abd_ex53: data.abd_ex53,//
          abd_ex54: data.abd_ex54,//
          abd_ex55: data.abd_ex55,//
          abd_dat8: data.abd_dat8, //
          abd_ex63: data.abd_ex63,
          abd_ex62: data.abd_ex62,
          abd_ex58: data.abd_ex58,//
          abd_ex56: data.abd_ex56,//
          abd_dat9: data.abd_dat9,//
          abd_ex57: data.abd_ex57,//
          ac_ex8: this.ac_ex8,
          abd_dat10: data.abd_dat10,
          abd_ex61: data.abd_ex61,//
          abd_ex98: data.abd_ex98,//
          abd_dat13: data.abd_dat13,//
          abd_dat14: data.abd_dat14,//
          abd_ex60: data.abd_ex60,//

          type: num.toString(),
          sId: this.sId
        }).then((res) => {
          if (res[0].status == "+OK") {
            this.loading = false;
            this.$message.success(res[0].msg)
            this.$emit("closes", false)
          } else {
            this.loading = false;
            this.$message.error(res[0].msg)
          }
        }).catch((res) => {
          this.$emit("closes", false)
          this.loading = false;
          this.$message.error("请求超时或网络异常");
        })
      }
    },
    // 变更模块保存
    savechange (num) {
      if (num == 1) {
        if (this.ac_ex4 == '') {
          this.$message.warning('请选择审核意见')
          return false
        } else if (this.ac_ex5 == '') {
          this.$message.warning('请输入备注')
          return false
        }
      } else if (num == 2) {
        if (this.ac_ex7 == '') {
          this.$message.warning('请选择审批意见')
          return false
        } else if (this.ac_ex8 == '') {
          this.$message.warning('请输入备注')
          return false
        }
      }
      this.loading = true;
      this.saveBasic({
        ac_ex4: this.ac_ex4,
        ac_ex5: this.ac_ex5,
        ac_ex6: this.ac_ex6,
        ac_ex7: this.ac_ex7,
        ac_ex8: this.ac_ex8,
        ac_ex9: this.ac_ex9,
        ac_dat2: this.ac_dat2,
        ac_dat3: this.ac_dat3,
        type: "cancel" + num,
        className: "change",
        sId: this.fId
      }).then((res) => {
        this.loading = false;
        this.$message.success(res[0].msg)
        this.$emit("closes", false)
      }).catch((res) => {
        this.loading = false;
        this.$message.error("请求超时或网络异常");
        this.$emit("closes", false)
      })
    },
    // 注销模块保存
    savecancel (num) {
      if (num == 1) {
        if (this.ac_ex1 == '') {
          this.$message.warning('请选择审核意见')
          return false
        } else if (this.ac_ex2 == '') {
          this.$message.warning('请输入备注')
          return false
        }
      } else if (num == 2) {
        if (this.ac_ex4 == '') {
          this.$message.warning('请选择审批意见')
          return false
        } else if (this.ac_ex5 == '') {
          this.$message.warning('请输入备注')
          return false
        }
      }
      this.loading = true;
      this.saveBasic({
        ac_ex1: this.ac_ex1,
        ac_ex2: this.ac_ex2,
        ac_ex3: this.ac_ex3,
        ac_ex4: this.ac_ex4,
        ac_ex5: this.ac_ex5,
        ac_ex6: this.ac_ex6,
        ac_dat2: this.ac_dat2,
        ac_dat3: this.ac_dat3,
        type: 'cancel' + num,
        className: '',
        sId: this.fId,
      }).then((res) => {
        this.loading = false;
        this.$message.success(res[0].msg)
        this.$emit("closes", false)
      }).catch((res) => {
        this.loading = false;
        this.$message.error("请求超时或网络异常");
        this.$emit("closes", false)
      })
    },
    saveBasic (data) {
      console.log("saveBasic");
      return request({
        headers: {
          'Accept': 'application/json',
        },
        url: "/social/assistance/saveBasicsDisabled",
        method: 'post',
        data: data
      })
    },
    isShow (n) {
      this.isShow1 = true
      this.isShow2 = true
      this.isShow3 = true
      // this.isShow6 = true
      this.isShow7 = true
      this.isShow8 = true
      this.isShow9 = true
      this.isShow10 = true
      this.isShow11 = true
      this.isShow14 = true

      if (n == 1) {
        this.isShow1 = false
      } else if (n == 14) {
        this.isShow14 = false
      } else if (n == 2) {
        this.isShow2 = false
      } else if (n == 3) {
        this.isShow3 = false
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
      }
    },
    imgInd (i, val) {
      this[val] = i
      console.log('这是图片index：' + i)
    },
    delImage (id) {
      if (this.publicity[id]) {
        console.log("删除图片")
        let imgArr = this.publicity[id].split(",")
        console.log(imgArr)
        let img2 = imgArr.splice(this[id + "_imgIn"], 1)
        console.log(imgArr)
        this.publicity[id] = imgArr.join(",")
        // this.uploadImg[id+"_img"]=imgArr
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
    loadSalvation (data) {
      return request({
        headers: {
          'Accept': 'application/json',
        },
        url: '/social/assistance/getBasicSalvation1',
        method: 'post',
        data: data
      })
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
  width: 90%;
  margin-top: 20px;
  margin-left: 5%;
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
  cursor: pointer;
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
.my-col {
  text-align: center;
  color: #909399;
}
</style>

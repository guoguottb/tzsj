<template>
  <div>
    <el-card class="box-card">
      <el-row>
        <el-col :span="20">
          <div class="leftFather"
               ref="leftFather">
            <el-form ref="ruleForm"
                     :rules="rules"
                     :model="ruleForm"
                     label-width="80px">
              <!-- 基本信息 -->
              <div id="page1">
                <h3 class="pageTitle">基本信息</h3>
              </div>
              <!-- 姓名、身份证 -->
              <el-row>
                <el-col :span="10"
                        style="marginRight:150px">
                  <el-form-item label="姓名"
                                prop="abd_ex2"
                                label-width="150px">
                    <el-input v-model="ruleForm.abd_ex2"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="身份证"
                                prop="abd_ex3"
                                label-width="150px">
                    <el-input v-model="ruleForm.abd_ex3"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 性别、年龄 -->
              <el-row>
                <el-col :span="10"
                        style="marginRight:150px">
                  <el-form-item label="性别"
                                label-width="150px">
                    <el-select v-model="ruleForm.abd_ex12"
                               placeholder=""
                               disabled>
                      <el-option label="男"
                                 value="男"></el-option>
                      <el-option label="女"
                                 value="女"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="年龄"
                                label-width="150px">
                    <el-input v-model="ruleForm.abd_ex34"
                              disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 户籍类型、民族 -->
              <el-row>
                <el-col :span="10"
                        style="marginRight:150px">
                  <el-form-item label="户籍类别"
                                prop="abd_ex17"
                                label-width="150px">
                    <el-select v-model="ruleForm.abd_ex17"
                               placeholder="">
                      <el-option label="农业户口"
                                 value="农业户口"></el-option>
                      <el-option label="非农业户口"
                                 value="非农业户口"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="民族"
                                prop="abd_ex16"
                                label-width="150px">
                    <el-select v-model="ruleForm.abd_ex16"
                               placeholder="">
                      <el-option :label="item"
                                 :value="item"
                                 v-for="item in nationality"
                                 :key="item"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 与户主关系/残疾证号 -->
              <el-row>
                <el-col :span="10"
                        style="marginRight:150px">
                  <el-form-item label="与户主关系"
                                prop="abd_ex66"
                                label-width="150px">
                    <el-select v-model="ruleForm.abd_ex66">
                      <el-option label="户主本人"
                                 value="户主本人"></el-option>
                      <el-option label="户主母亲"
                                 value="户主母亲"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="残疾证号"
                                prop="abd_ex5"
                                label-width="150px">
                    <el-input v-model="ruleForm.abd_ex5"
                              placeholder="请输入残疾证号"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 残疾类别、残疾等级 -->
              <el-row>
                <el-col :span="10"
                        style="marginRight:150px">
                  <el-form-item label="残疾类别"
                                prop="abd_ex15"
                                label-width="150px">
                    <el-select v-model="ruleForm.abd_ex15"
                               placeholder="">
                      <el-option label="肢体残疾"
                                 value="肢体残疾"></el-option>
                      <el-option label="精神残疾"
                                 value="精神残疾"></el-option>
                      <el-option label="智力残疾"
                                 value="智力残疾"></el-option>
                      <el-option label="盲视力残疾"
                                 value="盲视力残疾"></el-option>
                      <el-option label="言语残疾"
                                 value="言语残疾"></el-option>
                      <el-option label="听力残疾"
                                 value="听力残疾"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="残疾等级"
                                prop="abd_ex14"
                                label-width="150px">
                    <el-select v-model="ruleForm.abd_ex14"
                               placeholder="">
                      <el-option label="一级残疾人"
                                 value="一级残疾人"></el-option>
                      <el-option label="二级残疾人"
                                 value="二级残疾人"></el-option>
                      <el-option label="三级残疾人"
                                 value="三级残疾人"></el-option>
                      <el-option label="四级残疾人"
                                 value="四级残疾人"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 户籍住址、现住址 -->
              <el-row>
                <el-col :span="10"
                        style="marginRight:150px">
                  <el-form-item label="户籍住址"
                                prop="abd_ex19"
                                label-width="150px">
                    <el-input v-model="ruleForm.abd_ex19"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="现住址"
                                prop="abd_ex18"
                                label-width="150px">
                    <el-input v-model="ruleForm.abd_ex18"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 家庭人口数、伤残原因说明 -->
              <el-row>
                <el-col :span="10"
                        style="marginRight:150px">
                  <el-form-item label="家庭人口数"
                                prop="abd_ex67"
                                label-width="150px">
                    <el-input v-model="ruleForm.abd_ex67"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="伤残原因说明"
                                label-width="150px">
                    <el-input v-model="ruleForm.abd_ex68"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 残疾人收入说明、是否享受低保 -->
              <el-row>
                <el-col :span="10"
                        style="marginRight:150px">
                  <el-form-item label="残疾人收入说明"
                                label-width="160px">
                    <el-input v-model="ruleForm.abd_ex69"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="是否享受低保"
                                label-width="150px">
                    <el-select v-model="ruleForm.abd_ex70">
                      <el-option label="是"
                                 value="是"></el-option>
                      <el-option label="否"
                                 value="否"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 家庭特征、联系电话 -->
              <el-row>
                <el-col :span="10"
                        style="marginRight:150px">
                  <el-form-item label="家庭特征"
                                label-width="150px">
                    <el-select v-model="ruleForm.abd_ex73"
                               placeholder="请选择">
                      <el-option label="一名残疾人"
                                 value="一名残疾人"></el-option>
                      <el-option label="两名以上残疾人"
                                 value="两名以上残疾人"></el-option>
                      <el-option label="由达到法定退休年龄父母供养"
                                 value="由达到法定退休年龄父母供养"></el-option>
                      <el-option label="由达到法定退休年龄的其他供养人员供养"
                                 value="由达到法定退休年龄的其他供养人员供养"></el-option>
                      <el-option label="其他特征"
                                 value="其他特征"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="联系电话"
                                prop="abd_ex20"
                                label-width="150px">
                    <el-input v-model="ruleForm.abd_ex20"
                              placeholder="请输入电话号码"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 申请时间、行政区域 -->
              <el-row>
                <el-col :span="10"
                        style="marginRight:150px">
                  <el-form-item label="申请时间"
                                label-width="150px">
                    <div class="block"
                         style="width:100%!important">
                      <el-date-picker v-model="ruleForm.abd_dat5"
                                      type="date"
                                      placeholder="选择日期"
                                      disabled>
                      </el-date-picker>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="行政区域"
                                label-width="150px">
                    <div class="block"
                         style="width:100%!important">
                      <el-cascader :props="props"
                                   v-model="ruleForm.abd_ex28"></el-cascader>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 是否属于村干部或经办人员近亲属、求助描述 -->
              <el-row>
                <el-col :span="10"
                        style="marginRight:150px">
                  <el-form-item label="是否属于村干部或经办人员近亲属"
                                prop="abd_ex75"
                                label-width="250px">
                    <el-select v-model="ruleForm.abd_ex75"
                               placeholder="请选择">
                      <el-option label="是"
                                 value="是"></el-option>
                      <el-option label="否"
                                 value="否"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="求助描述"
                                prop="abd_ex76"
                                label-width="150px">
                    <el-input v-model="ruleForm.abd_ex76"
                              placeholder="请输入求助描述"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 求助原因 -->
              <el-row>
                <el-col :span="24"
                        style="marginRight:150px">
                  <el-form-item label="求助原因"
                                prop="abd_ex77"
                                label-width="150px">
                    <el-checkbox v-model="ruleForm.abd_ex77.checkedA">缺乏劳动力</el-checkbox>
                    <el-checkbox v-model="ruleForm.abd_ex77.checkedB">无生活来源</el-checkbox>
                    <el-checkbox v-model="ruleForm.abd_ex77.checkedC">疾病</el-checkbox>
                    <el-checkbox v-model="ruleForm.abd_ex77.checkedD">残疾</el-checkbox>
                    <el-checkbox v-model="ruleForm.abd_ex77.checkedE">教育</el-checkbox>
                    <el-checkbox v-model="ruleForm.abd_ex77.checkedF">住房</el-checkbox>
                    <el-checkbox v-model="ruleForm.abd_ex77.checkedG">受灾</el-checkbox>
                    <el-checkbox v-model="ruleForm.abd_ex77.checkedH">其他</el-checkbox>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 变更信息 -->
              <div style="marginTop:60px"
                   v-if="bgForm.type === 'bg'"
                   id="page4">
                <h3 class="pageTitle">变更信息</h3>
                <!-- 变更信息 -->
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="变更信息"
                                  label-width="150px">
                      <div class="block">
                        <el-date-picker v-model="bgForm.date"
                                        type="datetime"
                                        placeholder="选择变更时间"
                                        default-time="12:00:00">
                        </el-date-picker>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 变更简述 -->
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="变更原因"
                                  label-width="150px">
                      <el-input type="textarea"
                                v-model.trim="bgForm.remark"
                                placeholder="请输入备注"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
              <!-- 其他信息 -->
              <div id="page2">
                <h3 class="pageTitle">其他信息</h3>
              </div>
              <!-- 开户银行、开户人 -->
              <el-row>
                <el-col :span="10"
                        style="marginRight:150px">
                  <el-form-item label="开户银行"
                                prop="abd_ex23"
                                label-width="150px">
                    <el-input v-model="ruleForm.abd_ex23"
                              placeholder="请输入开户银行名称"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="开户人"
                                prop="abd_ex78"
                                label-width="150px">
                    <el-input v-model="ruleForm.abd_ex78"
                              placeholder="请输入开户人名称"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 银行账号、银行总存款 -->
              <el-row>
                <el-col :span="10"
                        style="marginRight:150px">
                  <el-form-item label="银行账号"
                                prop="abd_ex24"
                                label-width="150px">
                    <el-input v-model="ruleForm.abd_ex24"
                              placeholder="请输入银行卡账号"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="银行总存款"
                                label-width="150px">
                    <el-input v-model="ruleForm.abd_ex79"
                              placeholder="请输入银行卡总金额"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 有价证券、债券 -->
              <el-row>
                <el-col :span="10"
                        style="marginRight:150px">
                  <el-form-item label="有价证券"
                                label-width="150px">
                    <el-input v-model="ruleForm.abd_ex80"
                              placeholder="请输入有价证券总金额"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="债权"
                                label-width="150px">
                    <el-input v-model="ruleForm.abd_ex81"
                              placeholder="请输入债权总金额"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 其他金融产品、前六个月护理费用 -->
              <el-row>
                <el-col :span="10"
                        style="marginRight:150px">
                  <el-form-item label="其他金融产品"
                                label-width="150px">
                    <el-input v-model="ruleForm.abd_ex82"
                              placeholder="请输入其他金融产品总金额"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="前六个月护理费用"
                                prop="abd_ex104"
                                label-width="150px">
                    <el-input v-model="ruleForm.abd_ex104"
                              placeholder="请输入前六个月护理费用"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 家庭月人均收入 -->
              <el-row>
                <el-col :span="10"
                        style="marginRight:150px">
                  <el-form-item label="家庭月人均收入"
                                prop="abd_ex89"
                                label-width="150px">
                    <el-input v-model="ruleForm.abd_ex89"
                              placeholder="请输入家庭月人均收入"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <!-- 身份证及其他证明材料 -->
            <div id="page3">
              <h3 class="pageTitle">身份证及其他证明材料</h3>
              <el-row>
                <el-col :span="12">
                  <el-card class="box-card">
                    <div slot="header"
                         class="clearfix">
                      <span @click="upload('authorizationArr')">上传</span>
                      <span>核对授权书</span>
                      <span @click="deleteImage('authorizationArr')">删除</span>
                    </div>
                    <div>
                      <!-- banner -->
                      <div class="block"
                           style="width:100%">
                        <el-carousel height="150px"
                                     autoplay
                                     :loop="true"
                                     :interval="3000">
                          <el-carousel-item v-for="(item,index) in authorizationArr"
                                            :key="index"
                                            style="display:flex;justify-content:center">
                            <img :src="item"
                                 alt="">
                          </el-carousel-item>
                        </el-carousel>
                      </div>
                    </div>
                  </el-card>
                </el-col>
                <el-col :span="12">
                  <el-card class="box-card">
                    <div slot="header"
                         class="clearfix">
                      <span @click="upload('IDCardArr')">上传</span>
                      <span>身份证拍照</span>
                      <span @click="deleteImage('IDCardArr')">删除</span>
                    </div>
                    <div>
                      <!-- banner -->
                      <div class="block"
                           style="width:100%">
                        <el-carousel height="150px"
                                     autoplay
                                     loop
                                     :interval="3000">
                          <el-carousel-item v-for="(item,index) in IDCardArr"
                                            :key="index"
                                            style="display:flex;justify-content:center">
                            <img :src="item"
                                 alt="">
                          </el-carousel-item>
                        </el-carousel>
                      </div>
                    </div>
                  </el-card>
                </el-col>
                <el-col :span="12">
                  <el-card class="box-card">
                    <div slot="header"
                         class="clearfix">
                      <span @click="upload('PublicityPicturesArr')">上传</span>
                      <span>公示图片</span>
                      <span @click="deleteImage('PublicityPicturesArr')">删除</span>
                    </div>
                    <div>
                      <!-- banner -->
                      <div class="block"
                           style="width:100%">
                        <el-carousel height="150px"
                                     autoplay
                                     loop
                                     :interval="3000">
                          <el-carousel-item v-for="(item,index) in PublicityPicturesArr"
                                            :key="index"
                                            style="display:flex;justify-content:center">
                            <img :src="item"
                                 alt="">
                          </el-carousel-item>
                        </el-carousel>
                      </div>
                    </div>
                  </el-card>
                </el-col>
                <el-col :span="12">
                  <el-card class="box-card">
                    <div slot="header"
                         class="clearfix">
                      <span @click="upload('approvalFormArr')">上传</span>
                      <span>审核审批表</span>
                      <span @click="deleteImage('approvalFormArr')">删除</span>
                    </div>
                    <div>
                      <!-- banner -->
                      <div class="block"
                           style="width:100%">
                        <el-carousel height="150px"
                                     autoplay
                                     loop
                                     :interval="3000">
                          <el-carousel-item v-for="(item,index) in approvalFormArr"
                                            :key="index"
                                            style="display:flex;justify-content:center">
                            <img :src="item"
                                 alt="">
                          </el-carousel-item>
                        </el-carousel>
                      </div>
                    </div>
                  </el-card>
                </el-col>
                <el-col :span="12">
                  <el-card class="box-card">
                    <div slot="header"
                         class="clearfix">
                      <span @click="upload('restsDataArr')">上传</span>
                      <span>其他证明材料</span>
                      <span @click="deleteImage('restsDataArr')">删除</span>
                    </div>
                    <div>
                      <!-- banner -->
                      <div class="block"
                           style="width:100%">
                        <el-carousel height="150px"
                                     autoplay
                                     loop
                                     :interval="3000">
                          <el-carousel-item v-for="(item,index) in restsDataArr"
                                            :key="index"
                                            style="display:flex;justify-content:center">
                            <img :src="item"
                                 alt="">
                          </el-carousel-item>
                        </el-carousel>
                      </div>
                    </div>
                  </el-card>
                </el-col>
                <el-col :span="12">
                  <el-card class="box-card">
                    <div slot="header"
                         class="clearfix">
                      <span @click="upload('closeRelativeArr')">上传</span>
                      <span>近亲属备案表</span>
                      <span @click="deleteImage('closeRelativeArr')">删除</span>
                    </div>
                    <div>
                      <!-- banner -->
                      <div class="block"
                           style="width:100%">
                        <el-carousel height="150px"
                                     autoplay
                                     loop
                                     :interval="3000">
                          <el-carousel-item v-for="(item,index) in closeRelativeArr"
                                            :key="index"
                                            style="display:flex;justify-content:center">
                            <img :src="item"
                                 alt="">
                          </el-carousel-item>
                        </el-carousel>
                      </div>
                    </div>
                  </el-card>
                </el-col>
                <el-col :span="12">
                  <el-card class="box-card">
                    <div slot="header"
                         class="clearfix">
                      <span @click="upload('democracyArr')">上传</span>
                      <span>民主评议</span>
                      <span @click="deleteImage('democracyArr')">删除</span>
                    </div>
                    <div>
                      <!-- banner -->
                      <div class="block"
                           style="width:100%">
                        <el-carousel height="150px"
                                     autoplay
                                     loop
                                     :interval="3000">
                          <el-carousel-item v-for="(item,index) in democracyArr"
                                            :key="index"
                                            style="display:flex;justify-content:center">
                            <img :src="item"
                                 alt="">
                          </el-carousel-item>
                        </el-carousel>
                      </div>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="right-button">
            <el-button type="primary"
                       @click="onsave"
                       :loading="saveLoading">保存</el-button>
            <el-button @click="oncancel">返回</el-button>
          </div>
          <div class="right-ui">
            <ul>
              <li :class="{currentLi: currClass === 'JBXX'}"><a @click="goScrollView('#page1','JBXX')"
                   href="javascript:;">基本信息</a></li>
              <li :class="{currentLi: currClass === 'BGXX'}"
                  v-if="bgForm.type === 'bg'"><a href="javascript:;"
                   @click="goScrollView('#page4','BGXX')">变更信息</a></li>
              <li :class="{currentLi: currClass === 'QTXX'}"><a href="javascript:;"
                   @click="goScrollView('#page2','QTXX')">其他信息</a></li>
              <li :class="{currentLi: currClass === 'SFZJQTZMCL'}"><a href="javascript:;"
                   @click="goScrollView('#page3','SFZJQTZMCL')">身份证及其他证明材料</a></li>
            </ul>
          </div>
        </el-col>
      </el-row>
      <!-- dialog 上传按钮弹出层 -->
      <el-dialog title="提示"
                 v-if="dialogVisible"
                 :close="onClose"
                 :visible.sync="dialogVisible"
                 width="30%"
                 :before-close="handleClose">
        <!-- 上传图片对话框 -->
        <el-upload class="upload-demo"
                   drag
                   :on-success="onSuccess"
                   action="/social/minios/fileUpload"
                   multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip"
               slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="onClose">取 消</el-button>
          <el-button type="primary"
                     @click="onAffirm">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 删除banner对话框 -->
      <el-dialog title="提示"
                 :visible.sync="bannerDialogVisible"
                 width="30%">
        <span>是否删除该项的所有资料图片</span>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="bannerCancel">取 消</el-button>
          <el-button type="primary"
                     @click="bannerConfirm">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
// api 
import {
  getDisabilityAllowanceApi,
  getTaiZhouAreaApi,
  disabledFlowPathApi,
  confirmModificationApi,
  getBannersApi
} from "@/api/lifeRescue/disabilityAllowance"
import dayjs from "dayjs"
let pId = "0";
export default {
  name: "changeDisabilityAllowance",
  data () {
    return {
      selectedOptions: [],
      // form表单数据
      ruleForm: {
        abd_ex77: {},
        abd_ex16: "",
        abd_ex17: "",
        abd_ex66: "",
        abd_ex15: "",
        abd_ex14: "",
        abd_ex75: "",
        abd_ex28: []
      },
      // 校验规则
      rules: {
        abd_ex2: [
          { required: true, trigger: 'blur', message: "姓名不能为空" }
        ],
        abd_ex3: [
          { required: true, trigger: 'blur', message: "身份证号码不能为空" }, {
            pattern: /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/, trigger: 'blur', message: "身份证号码格式不正确"
          }
        ],
        abd_ex17: [
          { required: true, trigger: 'change', message: "户籍类别不能为空" }
        ],
        abd_ex16: [{ required: true, trigger: 'change', message: "民族类型不能为空" }]
        ,
        abd_ex66: [{ required: true, trigger: 'change', message: "与户主关系不能为空" }],
        abd_ex5: [{ required: true, trigger: 'blur', message: "残疾证号不能为空" }],
        abd_ex15: [{ required: true, trigger: 'change', message: "残疾类别不能为空" }],
        abd_ex14: [{ required: true, trigger: 'change', message: "残疾等级不能为空" }],
        abd_ex19: [{ required: true, trigger: 'change', message: "户籍住址不能为空" }],
        abd_ex18: [{ required: true, trigger: 'blur', message: "现住址不能为空" }],
        abd_ex67: [{ required: true, trigger: 'blur', message: "家庭人口数不能为空" }],
        abd_ex20: [{ required: true, trigger: 'blur', message: "联系电话不能为空" }],
        administrativeArea: [{ required: true, trigger: 'blur', message: "行政区域不能为空" }],
        abd_ex75: [{ required: true, trigger: 'change', message: "是否属于村干部或经办人员近亲属选项不能为空" }],
        abd_ex76: [{ required: true, trigger: 'blur', message: "求助描述不能为空" }],
        abd_ex77: [{ required: true, trigger: 'change', message: "求助原因不能为空" }],
        abd_ex23: [{ required: true, trigger: 'blur', message: "开户银行不能为空" }],
        abd_ex78: [{ required: true, trigger: 'blur', message: "开户人不能为空" }],
        abd_ex24: [{ required: true, trigger: 'blur', message: "银行账号不能为空" },
        {
          pattern: /^[1-9]\d{9,29}$/, trigger: 'blur', message: "银行账号格式不正确"
        }],
        abd_ex104: [{ required: true, trigger: 'blur', message: "前六个月护理费用不能为空" }],
        abd_ex89: [{ required: true, trigger: 'blur', message: "家庭月人均月收入不能为空" }]
      },
      userData: {
        idCard: "",
        sId: "",
      },
      areaSelector: [],  //  区域选择器
      props: {
        lazy: true,
        that: this,
        async lazyLoad (node, resolve) {
          const { level } = node;
          try {
            let areaID = node.data ? node.data.pId : pId
            await getTaiZhouAreaApi({ pId: areaID })
          } catch (error) {
            console.log(error, "行政区划")
            if (error && error.response && error.response.statusText === "OK") {
              const nodes = Array.from(error.response.data)
                .map(item => ({
                  value: item.cs_ex2 + "#" + item.cs_ex1,
                  label: item.cs_ex2,
                  leaf: level >= 2,
                  pId: item.cs_ex1
                }));
              // 通过调用resolve将子节点数据返回，通知组件数据加载完成
              resolve(nodes);
            }
          }
          // }, 1000);
        }
      },
      administrativeRegion: "",
      dialogVisible: false,
      imageType: "",
      authorizationArr: [],   // 核对授权书
      IDCardArr: [],    //  身份证拍照
      PublicityPicturesArr: [],  //  公示图片
      approvalFormArr: [],   //  审核审批表
      restsDataArr: [],  //  其他证明材料
      closeRelativeArr: [], //   近亲属备案表
      democracyArr: [],     //  民主评议
      bannerArr: [],
      nationality: ["汉族", "满族", "蒙古族", "回族", "藏族", "维吾尔族", "苗族", "彝族", "壮族", "布依族", "侗族", "瑶族", "白族", "土家族", "哈尼族", "哈萨克族", "傣族", "黎族", "傈僳族", "佤族", "畲族", "高山族", "拉祜族", "水族", "东乡族", "纳西族", "景颇族", "柯尔克孜族", "土族", "达斡尔族", "仫佬族", "羌族", "布朗族", "撒拉族", "毛南族", "仡佬族", "锡伯族", "阿昌族", "普米族", "朝鲜族", "塔吉克族", "怒族", "乌孜别克族", "俄罗斯族", "鄂温克族", "德昂族", "保安族", "裕固族", "京族", "塔塔尔族", "独龙族", "鄂伦春族", "赫哲族", "门巴族", "珞巴族", "基诺族"],
      bannerDialogVisible: false,
      bannerNum: "",
      abd_ex92: [], // 核对授权书
      abd_ex37: [], // 身份证拍照
      abd_ex93: [],  // 公示图片
      abd_ex94: [],   // 审核审批表
      abd_ex38: [],  // 其他证明材料
      abd_ex95: [], // 近亲属备案表
      abd_ex96: [], // 民主评议
      bgForm: {
        sId: "",
        type: "",
        remark: "",
        date: "",
        data: ""
      },
      saveLoading: false,
      fatherDom_Top: "",
      currClass: "JBXX",     // right li curr style
    }
  },
  created () {
    this.getDisabilityAllowance({
      sId: this.userData.sId
    })
  },
  methods: {
    // 获取残疾人信息
    async getDisabilityAllowance (data) {
      try {
        await getDisabilityAllowanceApi(data)
      } catch (error) {
        if (error && error.response && error.response.data.status === "+OK") {
          this.ruleForm = error.response.data.data.data
          this.ruleForm.abd_ex28 = this.ruleForm.abd_ex28.split(",")
          console.log(this.ruleForm.abd_ex77, "this.ruleForm.abd_ex77")
          let helpArr = this.ruleForm.abd_ex77.split(",").length ? this.ruleForm.abd_ex77.split(",") : []
          this.ruleForm.abd_ex77 = {
            checkedA: helpArr.includes("缺乏劳动力") ? true : false,
            checkedB: helpArr.includes("无生活来源") ? true : false,
            checkedC: helpArr.includes("疾病") ? true : false,
            checkedD: helpArr.includes("残疾") ? true : false,
            checkedE: helpArr.includes("教育") ? true : false,
            checkedF: helpArr.includes("住房") ? true : false,
            checkedG: helpArr.includes("受灾") ? true : false,
            checkedH: helpArr.includes("其他") ? true : false,
          }
          // 核对授权书 banner回显
          this.ruleForm.abd_ex92.split(",").forEach(async item => {
            try {
              if (item) await getBannersApi(item)
            } catch (error) {
              if (error && error.response && error.response.statusText === "OK") {
                this.authorizationArr.push(error.response.data)
              }
            }
          })
          // 身份证拍照 banner 数据回显
          this.ruleForm.abd_ex37.split(",").forEach(async item => {
            try {
              if (item) await getBannersApi(item)
            } catch (error) {
              if (error && error.response && error.response.statusText === "OK") {
                this.IDCardArr.push(error.response.data)
              }
            }
          })
          // 公示图片 banner 数据回显
          this.ruleForm.abd_ex93.split(",").forEach(async item => {
            try {
              if (item) await getBannersApi(item)
            } catch (error) {
              if (error && error.response && error.response.statusText === "OK") {
                this.PublicityPicturesArr.push(error.response.data)
              }
            }
          })
          // 审核审批标 banner数据回显
          this.ruleForm.abd_ex94.split(",").forEach(async item => {
            try {
              if (item) await getBannersApi(item)
            } catch (error) {
              if (error && error.response && error.response.statusText === "OK") {
                this.approvalFormArr.push(error.response.data)
              }
            }
          })
          // 其他证明材料 banner数据回显
          this.ruleForm.abd_ex38.split(",").forEach(async item => {
            try {
              if (item) await getBannersApi(item)
            } catch (error) {
              if (error && error.response && error.response.statusText === "OK") {
                this.restsDataArr.push(error.response.data)
              }
            }
          })
          // 近亲属备案表 banner数据回显
          this.ruleForm.abd_ex95.split(",").forEach(async item => {
            try {
              if (item) await getBannersApi(item)
            } catch (error) {
              if (error && error.response && error.response.statusText === "OK") {
                this.closeRelativeArr.push(error.response.data)
              }
            }
          })
          // 民主评议 banner数据回显
          this.ruleForm.abd_ex96.split(",").forEach(async item => {
            try {
              if (item) await getBannersApi(item)
            } catch (error) {
              if (error && error.response && error.response.statusText === "OK") {
                this.democracyArr.push(error.response.data)
              }
            }
          })
          this.abd_ex92 = this.ruleForm.abd_ex92.split(",")
          this.abd_ex37 = this.ruleForm.abd_ex37.split(",")
          this.abd_ex93 = this.ruleForm.abd_ex93.split(",")
          this.abd_ex94 = this.ruleForm.abd_ex94.split(",")
          this.abd_ex38 = this.ruleForm.abd_ex38.split(",")
          this.abd_ex95 = this.ruleForm.abd_ex95.split(",")
          this.abd_ex96 = this.ruleForm.abd_ex96.split(",")
          if (this.$route.name === "toChangeThePagesmhc") {
            this.ruleForm.abd_ex99 = "是"
          }
          this.$forceUpdate();
          console.log(this.ruleForm, "this.ruleForm")
        }
      }
    },
    // 获取泰州区域街道村庄联级选择器
    async getTaiZhouArea (data) {
      try {
        await getTaiZhouAreaApi(data)
      } catch (error) {
        if (error.response.data.status === "+OK") {
          this.areaSelector = error.response.data
          console.log(this.areaSelector, "this.areaSelector")
        }
      }
    },
    // 保存按钮
    async onsave () {
      try {
        await this.$refs["ruleForm"].validate();
        this.saveLoading = true
        let abd_ex77Arr = []
        if (this.ruleForm.abd_ex77.checkedA) abd_ex77Arr.push("缺乏劳动力")
        if (this.ruleForm.abd_ex77.checkedB) abd_ex77Arr.push("无生活来源")
        if (this.ruleForm.abd_ex77.checkedC) abd_ex77Arr.push("疾病")
        if (this.ruleForm.abd_ex77.checkedD) abd_ex77Arr.push("残疾")
        if (this.ruleForm.abd_ex77.checkedE) abd_ex77Arr.push("教育")
        if (this.ruleForm.abd_ex77.checkedF) abd_ex77Arr.push("住房")
        if (this.ruleForm.abd_ex77.checkedG) abd_ex77Arr.push("受灾")
        if (this.ruleForm.abd_ex77.checkedH) abd_ex77Arr.push("其他")
        this.ruleForm.abd_ex77 = abd_ex77Arr.join(",")
        if (!this.ruleForm.abd_ex77.length) {
          this.ruleForm.abd_ex77 = {
            checkedA: false,
            checkedB: false,
            checkedC: false,
            checkedD: false,
            checkedE: false,
            checkedF: false,
            checkedG: false,
            checkedH: false,
          }
          return this.$message.error("求助原因不可以为空")
        }
        this.ruleForm.abd_ex92 = this.abd_ex92.join(",")
        this.ruleForm.abd_ex37 = this.abd_ex37.join(",")
        this.ruleForm.abd_ex93 = this.abd_ex93.join(",")
        this.ruleForm.abd_ex94 = this.abd_ex94.join(",")
        this.ruleForm.abd_ex38 = this.abd_ex38.join(",")
        this.ruleForm.abd_ex95 = this.abd_ex95.join(",")
        this.ruleForm.abd_ex96 = this.abd_ex96.join(",")
        this.ruleForm.abd_ex28 = this.ruleForm.abd_ex28.join()
        if (this.bgForm.type === 'bg') {
          if (this.bgForm.date && this.bgForm.remark) {
            this.bgForm.date = dayjs(this.bgForm.date).format("YYYY-MM-DD HH:mm:ss")
            this.bgForm.data = "[" + JSON.stringify(this.ruleForm) + "]"
            await disabledFlowPathApi(this.bgForm)
            return
          } else {
            return this.$message.warning("请填写完整的变更信息")
          }
        }
        await confirmModificationApi({
          data: "[" + JSON.stringify(this.ruleForm) + "]"
        })
        this.$message.error("数据修改失败")
        this.$router.push("/SubsidyDisabled/audit")
      } catch (error) {
        console.log(error)
        if (error && error.response && error.response.data.status == "+OK") {
          this.$message.success(error.response.data.msg)
          this.$router.push("/SubsidyDisabled/audit")
        }
        else if (error && error.response && error.response.data.status == "+ERR") {
          this.$message.warning(error.response.data.msg)
          this.$router.push("/SubsidyDisabled/audit")
        }
        else {
          this.$message.error("数据修改失败")
        }
      } finally {
        this.saveLoading = false
      }
    },
    // 返回按钮
    oncancel () {
      // this.$router.push("/SubsidyDisabled/audit")
      // this.$emit("closes", false);
      this.$router.go(-1);
      if (process.env.NODE_ENV != "development") this.$router.go(-1);
    },
    // 上传图片按钮
    upload (val) {
      this.imageType = val
      this.dialogVisible = true
    },
    // 图片资料的删除按钮
    deleteImage (val) {
      this.bannerNum = val
      this.bannerDialogVisible = true
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    //点击文件列表中已上传的文件时的钩子
    onSuccess (response, file, fileList) {
      console.log(response, file, fileList)
      this.bannerArr = fileList
    },
    // file 文件转换为 dataUrl
    fileToBase64Async (file, type) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          this[type].push(e.target.result)
          resolve(e.target.result);
        };
      });
    },
    // dialog 关闭回调
    onClose () {
      this.bannerArr = []
      this.dialogVisible = false
    },
    // dialog 图片上传确认事件
    onAffirm () {
      this.bannerArr.forEach(item => {
        let leftText = "/social/minios/show?filename="
        if (this.imageType == "authorizationArr") {
          this.abd_ex92.push(leftText + item.response[0].filename)
        } else if (this.imageType == "IDCardArr") {
          this.abd_ex37.push(leftText + item.response[0].filename)
        } else if (this.imageType == "PublicityPicturesArr") {
          this.abd_ex93.push(leftText + item.response[0].filename)
        } else if (this.imageType == "approvalFormArr") {
          this.abd_ex94.push(leftText + item.response[0].filename)
        } else if (this.imageType == "restsDataArr") {
          this.abd_ex38.push(leftText + item.response[0].filename)
        } else if (this.imageType == "closeRelativeArr") {
          this.abd_ex95.push(leftText + item.response[0].filename)
        } else if (this.imageType == "democracyArr") {
          this.abd_ex96.push(leftText + item.response[0].filename)
        }
        this.fileToBase64Async(item.raw, this.imageType)
      })
      this.onClose()
    },
    // delete banner 取消按钮
    bannerCancel () {
      this.bannerDialogVisible = false
    },
    // delete banner 确认按钮
    bannerConfirm () {
      this.bannerDialogVisible = false
      switch (this.bannerNum) {
        case "authorizationArr":
          this.authorizationArr = []
          this.abd_ex92 = [];
          break;
        case "IDCardArr":
          this.IDCardArr = [];
          this.abd_ex37 = []
          break;
        case "PublicityPicturesArr":
          this.PublicityPicturesArr = [];
          this.abd_ex93 = []
          break;
        case "approvalFormArr":
          this.approvalFormArr = [];
          this.abd_ex94 = []
          break;
        case "restsDataArr":
          this.restsDataArr = [];
          this.abd_ex38 = []
          break;
        case "closeRelativeArr":
          this.closeRelativeArr = [];
          this.abd_ex95 = []
          break;
        case "democracyArr":
          this.democracyArr = [];
          this.abd_ex96 = []
          break;
      }
    },
    onScroll () {
      let JBXX = document.querySelector("#page1") || "" // 基本信息
      let QTXX = document.querySelector("#page2") || "" // 其他信息
      let SFZJQTZMCL = document.querySelector("#page3") || "" // 身份证及其他证明材料
      let BGXX = document.querySelector("#page4") || "" // 变更信息
      if (JBXX && Math.abs(JBXX.getBoundingClientRect().top - this.fatherDom_Top) < 25) this.currClass = "JBXX"
      if (QTXX && Math.abs(QTXX.getBoundingClientRect().top - this.fatherDom_Top) < 25) this.currClass = "QTXX"
      if (SFZJQTZMCL && Math.abs(SFZJQTZMCL.getBoundingClientRect().top - this.fatherDom_Top) < 25) this.currClass = "SFZJQTZMCL"
      if (BGXX && Math.abs(BGXX.getBoundingClientRect().top - this.fatherDom_Top) < 25) this.currClass = "BGXX"
    },
    goScrollView (id, curr) {
      this.currClass = curr
      document.querySelector(id).scrollIntoView(true);
    }
  },
  components: {
  },
  watch: {
    $route: {
      immediate: true,
      handler (to, from) {
        if (to.query.type === "bg") {
          this.bgForm.sId = to.query.sId
          this.bgForm.type = "bg"
        }
        if (to) {
          this.userData.idCard = to.query.idCard
          this.userData.sId = to.query.sId
        }
      }
    }
  },
  mounted () {
    this.$refs.leftFather.addEventListener("scroll", this.onScroll)
    this.fatherDom_Top = this.$refs.leftFather.getBoundingClientRect().top
  }
}
</script>

<style scoped lang='less'>
.pageTitle {
  border-left: 2px solid #3385ff;
  padding-left: 16px;
  border-bottom: 1px solid #dcdfe6;
  margin-bottom: 6px;
}
/deep/ .el-descriptions--small {
  font-size: 14px;
  color: black;
}
/deep/ .leftFather {
  padding-right: 6px;
  height: 75vh !important;
  overflow: hidden;
  overflow-y: scroll;
  border-right: 1px solid #dcdfe6;
  .el-descriptions-row {
    td {
      line-height: 30px;
    }
    height: 30px;
  }

  .el-select.el-select--small {
    width: 100%;
  }

  .el-col {
    margin: 4px 0;
  }

  .el-input input {
    height: 36px;
  }
  .el-date-editor--date {
    width: 100%;
  }
  .el-cascader--large {
    width: 100%;
  }
  .clearfix {
    display: flex;
    font-size: 14px;
    justify-content: space-between;
    span {
      flex: 1;
    }
    span:nth-child(1) {
      display: flex;
      justify-content: flex-start;
      color: #409eff;
      cursor: pointer;
    }
    span:nth-child(2) {
      display: flex;
      justify-content: center;
    }
    span:nth-child(3) {
      display: flex;
      justify-content: flex-end;
      color: #409eff;
      cursor: pointer;
    }
  }
}
/deep/ .el-carousel__indicator.el-carousel__indicator--horizontal.is-active {
  .el-carousel__button {
    background-color: #409eff;
  }
}
/deep/ .el-carousel__button {
  background-color: #dddddd;
}
.right-ui {
  padding: 20px 0 0 40px;
}

.right-button {
  height: 40px;
  text-align: center;
  margin-left: 40px;
  border-bottom: 1px solid rgb(221, 221, 221);
}
#page1 {
  position: relative;
  .no1img {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 2;
    transform: rotate(30deg);
    margin: 4% 4% 0 0;
    img {
      width: 150px;
    }
  }
}

.right-ui li {
  list-style: none;
  a {
    color: #606266;
  }
}
.currentLi {
  list-style: unset !important;
  a {
    color: #409eff !important;
  }
}
</style>

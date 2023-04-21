<template>
  <div class="g-box">
    <div class="g-box2">
      <div class="info2">
        <el-form :model="dibaoForm"
                 :rules="rules"
                 :inline-message="true"
                 :show-message="false"
                 ref="dibaoForm"
                 label-width="auto"
                 style='padding-right: 10px;'>
          <h3 class="line_blue"
              id="page1">&emsp;基本信息</h3>
          <div class="lineSt"></div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="姓名"
                            prop="abd_ex2">
                <el-input v-model="dibaoForm.abd_ex2"
                          :maxlength="10"
                          placeholder="请输入姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="身份证"
                            prop="abd_ex3">
                <el-input v-model="dibaoForm.abd_ex3"
                          placeholder="请输入身份证"
                          @input="changeCard1($event,'abd_ex12','abd_ex34')"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="性别"
                            prop="abd_ex12">
                <el-input v-model="dibaoForm.abd_ex12"
                          disabled
                          placeholder="请输入性别"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="年龄"
                            prop="abd_ex34">
                <el-input v-model="dibaoForm.abd_ex34"
                          type="number"
                          disabled
                          placeholder="请输入年龄"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="户籍类别"
                            prop="abd_ex17">
                <el-select v-model="dibaoForm.abd_ex17">
                  <el-option label="非农业户口"
                             value="非农业户口"></el-option>
                  <el-option label="农业户口"
                             value="农业户口"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="民族"
                            prop="abd_ex16">
                <el-select v-model="dibaoForm.abd_ex16">
                  <el-option v-for="(item,index) in nation"
                             :key="index"
                             :label="item"
                             :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="与户主关系"
                            prop="abd_ex66">
                <el-select v-model="dibaoForm.abd_ex66">
                  <el-option label="户主本人"
                             value="户主本人"></el-option>
                  <el-option label="父母"
                             value="父母"></el-option>
                  <el-option label="配偶"
                             value="配偶"></el-option>
                  <el-option label="子女"
                             value="子女"></el-option>
                  <el-option label="兄弟姐妹"
                             value="兄弟姐妹"></el-option>
                  <el-option label="孙子女"
                             value="孙子女"></el-option>
                  <el-option label="其他"
                             value="其他"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="残疾证号"
                            prop="abd_ex5">
                <el-input v-model="dibaoForm.abd_ex5"
                          placeholder="请输入残疾证号"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="残疾类别"
                            prop="abd_ex15">
                <el-select v-model="dibaoForm.abd_ex15">
                  <el-option label="肢体"
                             value="肢体"></el-option>
                  <el-option label="精神"
                             value="精神"></el-option>
                  <el-option label="智力"
                             value="智力"></el-option>
                  <el-option label="盲视力"
                             value="盲视力"></el-option>
                  <el-option label="言语"
                             value="言语"></el-option>
                  <el-option label="听力"
                             value="听力"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="残疾等级"
                            prop="abd_ex14">
                <el-select v-model="dibaoForm.abd_ex14">
                  <el-option label="一级"
                             value="一级"></el-option>
                  <el-option label="二级"
                             value="二级"></el-option>
                  <el-option label="三级"
                             value="三级"></el-option>
                  <el-option label="四级"
                             value="四级"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="户籍住址"
                            prop="abd_ex18">
                <el-input v-model="dibaoForm.abd_ex18"
                          placeholder="请输入户籍住址"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="现住址"
                            prop="abd_ex19">
                <el-input v-model="dibaoForm.abd_ex19"
                          placeholder="请输入现住址"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="家庭人口数"
                            prop="abd_ex67">
                <!-- <el-input v-model="dibaoForm.abd_ex67" type="number" placeholder="请输入家庭人口数" @change="changeAmt2"></el-input> -->
                <el-input v-model="dibaoForm.abd_ex67"
                          type="number"
                          placeholder="请输入家庭人口数"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="伤残原因说明"
                            prop="abd_ex68">
                <el-input v-model="dibaoForm.abd_ex68"
                          placeholder="请输入伤残原因说明"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="残疾人收入说明"
                            prop="abd_ex69">
                <el-input v-model="dibaoForm.abd_ex69"
                          placeholder="请输入残疾人收入说明"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否享受低保"
                            prop="abd_ex70">
                <el-select v-model="dibaoForm.abd_ex70">
                  <el-option label="是"
                             value="是"></el-option>
                  <el-option label="否"
                             value="否"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="家庭特征"
                            prop="abd_ex73">
                <el-select v-model="dibaoForm.abd_ex73">
                  <el-option label=""
                             value=""></el-option>
                  <el-option label="2名以上残疾人"
                             value="2名以上残疾人"></el-option>
                  <el-option label="由达到法定退休年龄父母供养"
                             value="由达到法定退休年龄父母供养"></el-option>
                  <el-option label="由达到法定退休年龄的其他供养人供养"
                             value="由达到法定退休年龄的其他供养人供养"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话"
                            prop="abd_ex20">
                <el-input v-model="dibaoForm.abd_ex20"
                          type="number"
                          placeholder="请输入联系电话"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="申请时间"
                            prop="abd_dat5">
                <el-date-picker type="date"
                                v-model="dibaoForm.abd_dat5"
                                disabled
                                value-format="yyyy-MM-dd"
                                style="width: 100%;">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="行政区域"
                            prop="abd_ex28">
                <el-cascader :props="props"
                             v-model="xzqhArray"
                             placeholder="请选择"
                             style="width:100%;"
                             v-if="isFinish"></el-cascader>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="是否属于村干部或经办人员近亲属"
                            prop="abd_ex75">
                <el-select v-model="dibaoForm.abd_ex75">
                  <el-option label="否"
                             value="否"></el-option>
                  <el-option label="是"
                             value="是"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="求助描述"
                            prop="abd_ex76">
                <el-input v-model="dibaoForm.abd_ex76"
                          placeholder="请输入求助描述"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="求助原因"
                            prop="abd_ex77">
                <el-checkbox-group v-model="abd_ex77">
                  <el-checkbox label="缺乏劳动力"></el-checkbox>
                  <el-checkbox label="无生活来源"></el-checkbox>
                  <el-checkbox label="疾病"></el-checkbox>
                  <el-checkbox label="残疾"></el-checkbox>
                  <el-checkbox label="教育"></el-checkbox>
                  <el-checkbox label="住房"></el-checkbox>
                  <el-checkbox label="受灾"></el-checkbox>
                  <el-checkbox label="其他"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- 办结变更时的页面 -->
          <h3 v-if="$route.query.type == 'bg'"
              class="line_blue"
              id="page8">&emsp;变更信息</h3>
          <div v-if="$route.query.type == 'bg'"
               class="lineSt"></div>
          <el-row v-if="$route.query.type == 'bg'">
            <el-col :span="2"
                    style="line-height: 30px;text-align:center;">
              <div>变更时间</div>
            </el-col>
            <el-col :span="22">
              <el-date-picker v-model="dibaoForm.abd_dat6"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="选择变更时间"></el-date-picker>
            </el-col>
          </el-row>
          <el-row v-if="$route.query.type == 'bg'"
                  style="margin-top: 10px;">
            <el-col :span="2"
                    style="line-height: 30px;text-align:center">
              <div>变更简述</div>
            </el-col>
            <el-col :span="22">
              <el-input type="textarea"
                        autosize
                        v-model="abd_ex97"></el-input>
            </el-col>
          </el-row>
          <!-- 办结变更时的页面 -->

          <h3 class="line_blue"
              id="page2">&emsp;其他信息</h3>
          <div class="lineSt"></div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="开户银行"
                            prop="abd_ex23">
                <el-input v-model="dibaoForm.abd_ex23"
                          placeholder="请输入开户银行"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="开户人"
                            prop="abd_ex78">
                <el-input v-model="dibaoForm.abd_ex78"
                          placeholder="请输入开户人"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="银行账号"
                            prop="abd_ex24">
                <el-input v-model="dibaoForm.abd_ex24"
                          placeholder="请输入银行账号"
                          onkeyup="value=value.replace(/[^\dx]/gi,'')"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="银行总存款"
                            prop="abd_ex79">
                <el-input v-model="dibaoForm.abd_ex79"
                          type="number"
                          placeholder="请输入银行总存款"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="有价证券"
                            prop="abd_ex80">
                <el-input v-model="dibaoForm.abd_ex80"
                          type="number"
                          placeholder="请输入有价证券"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="债权"
                            prop="abd_ex81">
                <el-input v-model="dibaoForm.abd_ex81"
                          type="number"
                          placeholder="请输入债权"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="其他金融产品"
                            prop="abd_ex82">
                <el-input v-model="dibaoForm.abd_ex82"
                          type="number"
                          placeholder="请输入其他金融产品"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="低保标准"
                            prop="abd_ex90">
                <el-input disabled
                          v-model="dibaoForm.abd_ex90"
                          placeholder="请输入低保标准"
                          type="number"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="家庭月保障金额"
                            prop="abd_ex91">
                <el-input v-model="dibaoForm.abd_ex91"
                          placeholder="请输入家庭月保障金额"
                          type="number"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="月享受金额"
                            prop="abd_ex72">
                <el-input v-model="dibaoForm.abd_ex72"
                          type="number"
                          placeholder="请输入月享受金额"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="护理补贴金额"
                            prop="abd_ex42">
                <el-input v-model="dibaoForm.abd_ex42"
                          type="number"
                          placeholder="请输入护理补贴金额"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="增发金额"
                            prop="abd_ex71">
                <el-input v-model="dibaoForm.abd_ex71"
                          type="number"
                          placeholder="请输入增发金额"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- <h3 class="line_blue" id="page3">&emsp;共同生活家庭成员情况</h3>
				<div class="lineSt"></div> -->

          <!-- <h3 class="line_blue" id="page4">&emsp;非共同生活赡抚扶养人信息</h3>
				<div class="lineSt"></div> -->

          <!-- <h3 class="line_blue" id="page8">&emsp;非共同生活赡抚扶养人家庭成员信息</h3>
				<div class="lineSt"></div> -->

          <!-- <h3 class="line_blue" id="page5">&emsp;家庭总收入情况(12个月)</h3>
				<div class="lineSt"></div>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="工资性收入" prop="abd_ex83">
							<el-input v-model="dibaoForm.abd_ex83" placeholder="请输入工资性收入" type="number" @input="changeAmt"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="经营性净收入" prop="abd_ex84">
							<el-input v-model="dibaoForm.abd_ex84" placeholder="请输入经营性净收入" type="number" @input="changeAmt">
							</el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="财产性收入" prop="abd_ex85">
							<el-input v-model="dibaoForm.abd_ex85" placeholder="请输入财产性收入" type="number" @input="changeAmt"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="转移性收入" prop="abd_ex86">
							<el-input v-model="dibaoForm.abd_ex86" placeholder="请输入转移性收入" type="number" @input="changeAmt"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="其他收入" prop="abd_ex87">
							<el-input v-model="dibaoForm.abd_ex87" placeholder="请输入其他收入" type="number" @input="changeAmt"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="家庭总收入" prop="abd_ex88">
							<el-input v-model="dibaoForm.abd_ex88" placeholder="请输入家庭总收入" type="number" @input="changeAmt2">
							</el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="家庭月平均收入" prop="abd_ex89">
							<el-input disabled v-model="dibaoForm.abd_ex89" placeholder="请输入家庭月平均收入" type="number"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="家庭月人均收入" prop="abd_ex89_">
							<el-input disabled v-model="dibaoForm.abd_ex89_" placeholder="请输入家庭月人均收入" type="number"></el-input>
						</el-form-item>
					</el-col>
				</el-row> -->

          <!-- <h3 class="line_blue" id="page9">&emsp;刚性支出(12个月)</h3>
				<div class="lineSt"></div> -->

          <!-- 	<h3 class="line_blue" id="page6">&emsp;家庭财产情况</h3>
				<div class="lineSt"></div> -->

          <h3 class="line_blue"
              id="page7">&emsp;身份证及其他证明材料</h3>
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
                               @click="delImage('abd_ex92')">删除</el-button>
                    <span>核对授权书</span>
                    <el-button style="float: right; padding: 3px 0"
                               type="text"
                               @click="uploads('abd_ex92')">上传</el-button>
                  </div>
                  <div class="block">
                    <image-view :imgList="uploadImg.abd_ex92_img"
                                @imgIndex="imgInd($event,'abd_ex92_imgIn')"></image-view>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="12"
                      class="my-col">

                <el-card class="box-card">
                  <div slot="header"
                       class="clearfix">
                    <el-button style="float: left; padding: 3px 0"
                               type="text"
                               @click="delImage('abd_ex37')">删除</el-button>
                    <span>身份证拍照</span>
                    <el-button style="float: right; padding: 3px 0"
                               type="text"
                               @click="uploads('abd_ex37')">上传</el-button>
                  </div>
                  <div class="block">
                    <image-view :imgList="uploadImg.abd_ex37_img"
                                :isIdCard="true"
                                @delIdCardImage="delAllImage('abd_ex37')"
                                @imgIndex="imgInd($event,'abd_ex37_imgIn')"></image-view>
                  </div>
                </el-card>
              </el-col>
            </el-row>
            <el-row :gutter="20"
                    style='margin-top:10px'>
              <el-col :span="12"
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
                    <image-view :imgList="uploadImg.abd_ex93_img"
                                @imgIndex="imgInd($event,'abd_ex93_imgIn')"></image-view>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="12"
                      class="my-col">
                <el-card class="box-card">
                  <div slot="header"
                       class="clearfix">
                    <el-button style="float: left; padding: 3px 0"
                               type="text"
                               @click="delImage('abd_ex94')">删除</el-button>
                    <span>审核审批表</span>
                    <el-button style="float: right; padding: 3px 0"
                               type="text"
                               @click="uploads('abd_ex94')">上传</el-button>
                  </div>
                  <div class="block">
                    <image-view :imgList="uploadImg.abd_ex94_img"
                                @imgIndex="imgInd($event,'abd_ex94_imgIn')"></image-view>
                  </div>
                </el-card>
              </el-col>
            </el-row>

            <el-row :gutter="20"
                    style='margin-top:10px'>
              <el-col :span="12"
                      class="my-col">
                <el-card class="box-card">
                  <div slot="header"
                       class="clearfix">
                    <el-button style="float: left; padding: 3px 0"
                               type="text"
                               @click="delImage('abd_ex38')">删除</el-button>
                    <span>其他证明材料</span>
                    <el-button style="float: right; padding: 3px 0"
                               type="text"
                               @click="uploads('abd_ex38')">上传</el-button>
                  </div>
                  <div class="block">
                    <image-view :imgList="uploadImg.abd_ex38_img"
                                @imgIndex="imgInd($event,'abd_ex38_imgIn')"></image-view>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="12"
                      class="my-col">
                <el-card class="box-card">
                  <div slot="header"
                       class="clearfix">
                    <el-button style="float: left; padding: 3px 0"
                               type="text"
                               @click="delImage('abd_ex95')">删除</el-button>
                    <span>近亲属备案表</span>
                    <el-button style="float: right; padding: 3px 0"
                               type="text"
                               @click="uploads('abd_ex95')">上传</el-button>
                  </div>
                  <div class="block">
                    <image-view :imgList="uploadImg.abd_ex95_img"
                                @imgIndex="imgInd($event,'abd_ex95_imgIn')"></image-view>
                  </div>
                </el-card>
              </el-col>
            </el-row>
            <el-row :gutter="20"
                    style='margin-top:10px'>
              <el-col :span="12"
                      class="my-col">
                <el-card class="box-card">
                  <div slot="header"
                       class="clearfix">
                    <el-button style="float: left; padding: 3px 0"
                               type="text"
                               @click="delImage('abd_ex96')">删除</el-button>
                    <span>民主评议</span>
                    <el-button style="float: right; padding: 3px 0"
                               type="text"
                               @click="uploads('abd_ex96')">上传</el-button>
                  </div>
                  <div class="block">
                    <image-view :imgList="uploadImg.abd_ex96_img"
                                @imgIndex="imgInd($event,'abd_ex96_imgIn')"></image-view>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>

          <!-- <el-dialog :visible.sync="dialogVisible" append-to-body>
					<el-image :src="dialogImageUrl" :preview-src-list="dialogImageArray"></el-image>
				</el-dialog> -->

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
        </el-form>
      </div>
      <div class="ainfo2">
        <div style="margin-left:20px;text-align:center;border-bottom:1px solid #ddd;padding-bottom:10px;">
          <el-button type="primary"
                     size="small"
                     @click="save">保存</el-button>
          <el-button size="small"
                     @click="closeView">返回</el-button>
        </div>

        <div style="margin-left:20px;margin-top:20px;">
          <ul>
            <li :class="{listStyle:isShow1}"
                @click="isShow(1)">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow1}"
                 @click="counter('#page1')">基础信息</a><br>
            </li>
            <!-- 办结变更时的页面 -->
            <li v-if="$route.query.type == 'bg'"
                :class="{listStyle:isShow8}"
                @click="isShow(8)">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow8}"
                 @click="counter('#page8')">变更信息</a><br>
            </li>
            <!-- 办结变更时的页面 -->
            <li :class="{listStyle:isShow2}"
                @click="isShow(2)">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow2}"
                 @click="counter('#page2')">其他信息</a><br>
            </li>
            <!-- <li :class="{listStyle:isShow3}" @click="isShow(3)">
						<a class="ainfoFont" :class="{listStyleA:!isShow3}" @click="counter('#page3')">共同生活家庭成员情况</a><br>
					</li> -->
            <!-- <li :class="{listStyle:isShow4}" @click="isShow(4)">
						<a class="ainfoFont" :class="{listStyleA:!isShow4}" @click="counter('#page4')">非共同生活赡抚扶养人信息</a><br>
					</li> -->
            <!-- <li :class="{listStyle:isShow8}" @click="isShow(8)">
						<a class="ainfoFont" :class="{listStyleA:!isShow8}" @click="counter('#page8')">非共同生活赡抚扶养人家庭成员信息</a><br>
					</li> -->
            <!-- <li :class="{listStyle:isShow5}" @click="isShow(5)">
						<a class="ainfoFont" :class="{listStyleA:!isShow5}" @click="counter('#page5')">家庭总收入情况(12个月)</a><br>
					</li> -->
            <!-- <li :class="{listStyle:isShow9}" @click="isShow(9)">
						<a class="ainfoFont" :class="{listStyleA:!isShow9}" @click="counter('#page9')">刚性支出(12个月)</a><br>
					</li> -->
            <!-- <li :class="{listStyle:isShow6}" @click="isShow(6)">
						<a class="ainfoFont" :class="{listStyleA:!isShow6}" @click="counter('#page6')">家庭财产情况</a><br>
					</li> -->
            <li :class="{listStyle:isShow7}"
                @click="isShow(7)">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow7}"
                 @click="counter('#page7')">身份证及其他证明材料</a><br>
            </li>

          </ul>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import request from '@/utils/request'
// import upload from '@/views/upload.vue'
// import imageView from '@/views/imageView.vue'
import imageView from '@/views/modules/assistance/imageView'
import upload from '@/views/modules/assistance/upload'
import { isName, isText, isFamilyNum, isNum, isCardID, isSpecialAccount } from '@/utils/until'
// import {tszfValidate,getAge,nation,isCardID,getSex} from '@/utils/utils.js'
export default {
  name: "addEditDibao",
  components: {
    upload,
    imageView
  },
  data () {
    return {
      test: {
        xzqhArray: []
      },
      xzqhArray: [],
      isFinish: false,
      // el-cascader懒加载
      props: {
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
            const nodes = res;
            nodes.forEach(item => {
              item.value = item.cs_ex2 + "#" + item.cs_ex1;
              item.label = item.cs_ex2;
              item.leaf = level >= 2; //判断是否为末尾节点，这个地方是0,1,2三级
            })
            resolve(nodes);
          }).catch(res => {
            // console.log(res)
            // const nodes = res.response.data;
            // nodes.forEach(item => {
            // 	item.value = item.cs_ex2+"#"+item.cs_ex1;
            // 	item.label = item.cs_ex2;
            // 	item.leaf = level >= 2; //判断是否为末尾节点，这个地方是0,1,2三级
            // })
            // resolve(nodes);
          })
        }
      },
      dibaoForm: {
      },
      abd_ex77: [],
      uploadImg: {
        abd_ex92_img: [],
        abd_ex37_img: [],
        abd_ex96_img: [],
        abd_ex38_img: [],
        abd_ex94_img: [],
        abd_ex93_img: [],
        abd_ex95_img: [],
      },
      uploadId: '',
      abd_ex92_imgIn: 0, //imageIndex
      abd_ex37_imgIn: 0, //imageIndex
      abd_ex93_imgIn: 0, //imageIndex
      abd_ex94_imgIn: 0, //imageIndex
      abd_ex38_imgIn: 0, //imageIndex
      abd_ex95_imgIn: 0, //imageIndex
      abd_ex96_imgIn: 0, //imageIndex
      abd_ex97: '',
      rules: {
        abd_ex2: [{
          required: true,
          message: '姓名不能为空',
          trigger: 'blur'
        }],
        abd_ex3: [{
          required: true,
          message: '身份证不能为空',
          trigger: 'blur'
        }],
        abd_ex20: [{
          required: true,
          message: '联系电话不能为空',
          trigger: 'blur'
        }],
        // abd_dat5: [{
        // 	required: true,
        // 	message: '申请时间不能为空',
        // 	trigger: 'blur'
        // }],
        abd_ex28: [{
          required: true,
          message: '行政区划不能为空',
          trigger: 'blur'
        }],
        abd_ex17: [{
          required: true,
          message: '户籍类别不能为空',
          trigger: 'blur'
        }],
        abd_ex16: [{
          required: true,
          message: '民族不能为空',
          trigger: 'blur'
        }],
        abd_ex66: [{
          required: true,
          message: '与户主关系不能为空',
          trigger: 'blur'
        }],
        abd_ex5: [{
          required: true,
          message: '残疾证号不能为空',
          trigger: 'blur'
        }],
        abd_ex15: [{
          required: true,
          message: '残疾类别不能为空',
          trigger: 'blur'
        }],
        abd_ex14: [{
          required: true,
          message: '残疾等级不能为空',
          trigger: 'blur'
        }],
        abd_ex18: [{
          required: true,
          message: '户籍住址不能为空',
          trigger: 'blur'
        }],
        abd_ex19: [{
          required: true,
          message: '现住址不能为空',
          trigger: 'blur'
        }],
        abd_ex67: [{
          required: true,
          message: '家庭人口数不能为空',
          trigger: 'blur'
        }],
        abd_ex77: [{
          required: true,
          message: '求助原因不能为空',
          trigger: 'blur'
        }],
        abd_ex76: [{
          required: true,
          message: '求助描述不能为空',
          trigger: 'blur'
        }],
        abd_ex23: [{
          required: true,
          message: '请输入开户银行',
          trigger: 'blur'
        }],
        abd_ex78: [{
          required: true,
          message: '请输入开户人',
          trigger: 'blur'
        }],
        abd_ex24: [{
          required: true,
          message: '请输入银行账号',
          trigger: 'blur'
        }],
        abd_ex79: [{
          required: true,
          message: '请输入银行总存款',
          trigger: 'blur'
        }],
        abd_ex80: [{
          required: true,
          message: '请输入有价证券',
          trigger: 'blur'
        }],
        abd_ex81: [{
          required: true,
          message: '请输入债权',
          trigger: 'blur'
        }],
        abd_ex82: [{
          required: true,
          message: '请输入其他金融产品',
          trigger: 'blur'
        }],




        abd_ex75: [{
          required: true,
          message: '请选择是否属于村干部或经办人员近亲属',
          trigger: 'blur'
        }],
      },
      nation: nation,
      // nation: ['汉族', '壮族', '满族', '回族', '苗族', '维吾尔族', '彝族', '土家族', '蒙古族', '藏族', '布依族', '侗族', '瑶族', '朝鲜族', '白族',
      // 	'哈尼族', '哈萨克族', '黎族', '傣族', '畲族', '傈僳族', '仡佬族',
      // 	'拉祜族', '高山族', '东乡族', '佤族', '水族', '纳西族', '羌族', '土族', '锡伯族', '仫佬族', '柯尔克孜族', '达斡尔族', '景颇族', '撒拉族',
      // 	'布朗族', '毛难族', '塔吉克族', '普米族', '阿昌族', '怒族',
      // 	'鄂温克族', '京族', '基诺族', '德昂族', '乌孜别克族', '俄罗斯族', '保安族', '裕固族', '门巴族', '鄂伦春族', '独龙族', '塔塔尔族', '赫哲族',
      // 	'珞巴族', '其他', '外国血统中国籍人士'
      // ],
      // dialogImageUrl: '',
      // dialogImageArray: [],
      // dialogVisible: false,
      dialogVisible3: false,
      isShow1: false,
      isShow2: true,
      isShow3: true,
      isShow4: true,
      // isShow5: true,
      isShow6: true,
      isShow7: true,
      isShow8: true,
      isShow9: true,
      // sId: window.location.href.split('sId=').length>1 ? window.location.href.split('sId=')[1].split('&')[0] : '',
      // cId: window.location.href.split('cId=').length>1 ? window.location.href.split('cId=')[1].split('&')[0] : '',
      // type: window.location.href.split('type=').length>1 ? window.location.href.split('type=')[1].split('&')[0] : '',
    }
  },
  mounted () {
    // 滚动鼠标右侧导航栏跟随滚动位置改变而改变显示
    // window.removeEventListener('scroll',this.scroll,false)
    window.addEventListener('scroll', this.scroll, true)
  },
  watch: {
    xzqhArray (newA, oldA) {
      let qu = newA[0].split("#")[0]
      let zhen = newA[1].split("#")[0]
      let cun = newA[2].split("#")[0]
      // let i =qu+"#"+cun+"#"+zhen
      this.dibaoForm.abd_ex28 = newA[0] + "," + newA[1] + "," + newA[2]
      this.dibaoForm.abd_ex27 = qu
      this.dibaoForm.abd_ex1 = zhen
      this.dibaoForm.abd_ex26 = cun
      // console.log(i)
    }
  },
  created () {
    this.loadData();
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
      // let oDiv3 = document.querySelector('#page3');
      // let oDiv4 = document.querySelector('#page4');
      // let oDiv5 = document.querySelector('#page5');
      // let oDiv6 = document.querySelector('#page6');
      let oDiv7 = document.querySelector('#page7');
      let oDiv8 = document.querySelector('#page8');
      // let oDiv9 = document.querySelector('#page9');

      // 顺序跟上面显示顺序要相反
      let clientHeight = document.querySelector('.info2').clientHeight
      let recordtClientHeight = document.querySelector('#recordt').scrollHeight
      if (!oDiv1 || !oDiv2 || !oDiv7) {
        return ''
      }
      if (recordtClientHeight + oDiv7.clientHeight < clientHeight && scrollTop > (oDiv7.offsetTop - oDiv1.offsetTop - clientHeight + recordtClientHeight + oDiv7.clientHeight)) {
        // console.log('触发了7-1')
        this.isShow(7)
      } else if (scrollTop > (oDiv7.offsetTop - oDiv1.offsetTop)) {
        // console.log('触发了7-2')
        this.isShow(7)
      } else if (scrollTop > (oDiv2.offsetTop - oDiv1.offsetTop)) {
        // console.log('触发了2')
        this.isShow(2)
      } else if (oDiv8 && scrollTop > (oDiv8.offsetTop - oDiv1.offsetTop)) {
        // console.log('触发了8')
        this.isShow(8)
      } else if (scrollTop > (oDiv1.offsetTop - oDiv1.offsetTop)) {
        // console.log('触发了1')
        this.isShow(1)
      }
    },
    counter (id) { //counter1是绑定的点击事件名称
      document.querySelector(id).scrollIntoView(true);
    },
    loadData () {
      this.isFinish = false;
      this.getBasic({
        sId: this.$route.query.sId,
      }).then(res => {



      }).catch(res => {

        console.log(res.response.data, 'catch');
        if (res.response.data.status == '+OK' && res.response.data.data.length > 0) {

          this.dibaoForm = res.response.data.data

          if (res.response.data.data.abd_ex77) {
            this.abd_ex77 = res.response.data.data.abd_ex77.split(',')
          }
          this.uploadImg.abd_ex92_img = res.response.data.data.abd_ex92.split(",");
          this.uploadImg.abd_ex37_img = res.response.data.data.abd_ex37.split(",");
          this.uploadImg.abd_ex38_img = res.response.data.data.abd_ex38.split(",");
          this.uploadImg.abd_ex96_img = res.response.data.data.abd_ex96.split(",");
          this.uploadImg.abd_ex93_img = res.response.data.data.abd_ex93.split(",");
          this.uploadImg.abd_ex94_img = res.response.data.data.abd_ex94.split(",");
          this.uploadImg.abd_ex95_img = res.response.data.data.abd_ex95.split(",");
          let xzqhArray = this.dibaoForm.abd_ex28.split(",");
          if (xzqhArray.length == 3) {
            // this.xzqhArray=[]
            this.$set(this.xzqhArray, 0, xzqhArray[0]);
            this.$set(this.xzqhArray, 1, xzqhArray[1]);
            this.$set(this.xzqhArray, 2, xzqhArray[2]);
            this.$set(this.test, "xzqhArray", xzqhArray);
          } else {
            this.xzqhArray = []
          }
          this.isFinish = true;
          console.log(this.xzqhArray)



        } else {
          this.$emit("closes", false)
        }


      })
    },
    isShow (n) {
      this.isShow1 = true
      this.isShow2 = true
      // this.isShow3 = true
      // this.isShow4 = true
      // this.isShow5 = true
      // this.isShow6 = true
      this.isShow7 = true
      this.isShow8 = true
      // this.isShow9 = true

      if (n == 1) {
        this.isShow1 = false
      } else if (n == 8) {
        this.isShow8 = false
      } else if (n == 2) {
        this.isShow2 = false
      } else if (n == 7) {
        this.isShow7 = false
      }
    },
    closeView () {
      this.$emit("closes", false)
    },
    imgInd (i, val) {
      this[val] = i
      console.log('这是图片index：' + i)
    },
    delImage (id) {
      if (this.dibaoForm[id]) {
        console.log("删除图片")
        let imgArr = this.dibaoForm[id].split(",")
        console.log(imgArr)
        let img2 = imgArr.splice(this[id + "_imgIn"], 1)
        console.log(imgArr)
        this.dibaoForm[id] = imgArr.join(",")
        this.uploadImg[id + "_img"] = imgArr
      }
    },
    delAllImage (id) {
      if (this.dibaoForm[id]) {
        console.log("删除所有图片")
        let imgArr = this.dibaoForm[id].split(",")
        console.log(imgArr)
        let img2 = imgArr.splice(this[id + "_imgIn"], 1)
        console.log(imgArr)
        this.dibaoForm[id] = ""
        this.uploadImg[id + "_img"] = []
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
      let val = this.dibaoForm[this.uploadId];
      val = val == "" ? data : val + "," + data;
      this.dibaoForm[this.uploadId] = val;
      this.uploadImg[this.uploadId + "_img"] = val.split(",");
    },
    // changeAmt() {
    // 	let a1 = this.dibaoForm.abd_ex83 ? parseInt(this.dibaoForm.abd_ex83) : 0
    // 	let a2 = this.dibaoForm.abd_ex84 ? parseInt(this.dibaoForm.abd_ex84) : 0
    // 	let a3 = this.dibaoForm.abd_ex85 ? parseInt(this.dibaoForm.abd_ex85) : 0
    // 	let a4 = this.dibaoForm.abd_ex86 ? parseInt(this.dibaoForm.abd_ex86) : 0
    // 	let a5 = this.dibaoForm.abd_ex87 ? parseInt(this.dibaoForm.abd_ex87) : 0
    // 	var amt =a1+a2+a3+a4+a5;
    // 	this.dibaoForm.abd_ex88 = amt.toFixed(2)
    // 	this.dibaoForm.abd_ex89 = (amt / 12).toFixed(2)
    // 	this.$set(this.dibaoForm,'abd_ex89_',(this.dibaoForm.abd_ex89 / this.dibaoForm.abd_ex67).toFixed(2))
    // },
    // changeAmt2() {
    // 	var amt = Number(this.dibaoForm.abd_ex88);
    // 	this.dibaoForm.abd_ex89 = (amt / 12).toFixed(2)
    // 	this.$set(this.dibaoForm,'abd_ex89_',(this.dibaoForm.abd_ex89 / this.dibaoForm.abd_ex67).toFixed(2))
    // 	// // 有金额时
    // 	// if(this.dibaoForm.abd_ex88){
    // 	// 	var amt = Number(this.dibaoForm.abd_ex88);
    // 	// 	this.dibaoForm.abd_ex89 = (amt / 12).toFixed(2)
    // 	// 	// 有人口数时
    // 	// 	if(this.dibaoForm.abd_ex67){
    // 	// 		this.$set(this.dibaoForm,'abd_ex89_',(this.dibaoForm.abd_ex89 / this.dibaoForm.abd_ex67).toFixed(2))
    // 	// 	}

    // 	// }

    // },
    save () {
      this.dibaoForm.abd_ex77 = this.abd_ex77.join(',')
      /*if(this.dibaoForm.abd_ex3 =='' || this.dibaoForm.abd_ex3.length!=18){
        this.$message.warning('请输入正确的身份证号')
        return false
      }*/
      this.$refs['dibaoForm'].validate((valid) => {
        if (valid) {
        } else {
          //console.log('error submit!!');
          return false;
        }
      });
      let msgs = this.validate();
      if (msgs) {
        this.$message.warning(msgs);
        return false
      }
      if (this.dibaoForm.abd_ex3) {
        let msg = isCardID(this.dibaoForm.abd_ex3);
        if (msg) {
          this.$message.warning(msg);
          return false
        }
      }
      // 去除姓名的空白符号并且判断姓名是否合法
      this.dibaoForm.abd_ex2 = this.dibaoForm.abd_ex2.replace(/\s*/g, "")
      let tszf = tszfValidate(this.dibaoForm.abd_ex2)
      if (tszf) {
        this.$message.warning("请输入正确的姓名")
        return false
      }
      // 变更信息
      if (this.$route.query.type == 'bg') {
        if (this.abd_ex97 == '') {
          this.$message.warning('请输入变更简述');
          return false
        }
      }

      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      this.saveBasic({
        data: '[' + JSON.stringify(this.dibaoForm) + ']',
        type: this.$route.query.type,
        ac_ex10: this.abd_ex97,
      }).then((res) => {
        if (res[0].status == "+OK") {
          loading.close()
          this.$message.success(res[0].msg)
          this.$emit("closes", false)

        } else {
          loading.close()
          this.$message.error(res[0].msg)
        }
      }).catch((res) => {
        loading.close()
        this.$message.error("请求超时或网络异常");
      })
    },
    getBasic (data) {
      return request({
        // headers: {
        // 	'Accept': 'application/json',
        // },
        url: "/social/assistance/getDisabledBasics",
        method: 'post',
        data: data
      })
    },
    saveBasic (data) {
      return request({
        // headers: {
        // 	accept: 'application/json',
        // }
        method: 'post',
        url: '/social/assistance/saveDisabledBasicsEdit',
        data: data
      })
    },
    validate () {
      try {
        let msg = "";
        for (let key in this.rules) {
          try {

            let r_ = this.rules[key];

            let val = this.dibaoForm[key];

            if (val == "") {
              msg = r_[0].message;
              //document.getElementById(key).style.border="1px solid red"
              break;
            } else {
              //document.getElementById(key).style.border="1px solid #C0C4CC"
            }
          } catch (e) {

          }

        }
        return msg;
      } catch (e) {
        return "";
      }
    },
    changeCard1 (value, sex, age) {
      console.log(value, sex, age);
      let msg = isCardID(value)
      if (!msg) {
        this.$set(this.dibaoForm, sex, getSex(value))
        this.$set(this.dibaoForm, age, getAge(value))
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

.info2 {
  flex: 1;
  padding-right: 10px;
  box-sizing: border-box;
  border-right: 1px solid #ddd;
  overflow: auto;
}

.my-divider {
  margin: 15px auto 10px;
}

.my-table {
  width: 100%;
  margin-bottom: 5px;
}

.my-col {
  text-align: center;
  color: #909399;
}

.button-group {
  margin-bottom: 5px;
  margin-left: 10px;
}

.el-table__body-wrapper .el-table__empty-block {
  background-image: none;
  min-height: auto;
  height: auto !important;
}

.el-table__empty-block .el-table__empty-text {
  display: block;
  line-height: 40px;
}

.el-table--border {
  border-bottom: 1px solid #ebeef5 !important;
}

.ainfo2 {
  width: 240px;
  font-size: 14px;
  line-height: 20px;
  text-align: left;
  padding-left: 10px;
  box-sizing: border-box;
}

.line_blue {
  border-left: 2px solid #3385ff;
  margin-top: 25px;
}

.lineSt {
  background-color: #dcdfe6;
  height: 1px;
  width: 100%;
  margin-bottom: 10px;
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

/* 	.my-table .el-input .el-input__inner{
		border: none !important;
	} */
.my-table >>> .el-input__inner {
  border: 0;
}
</style>

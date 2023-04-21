<template>
  <div class="g-box">
    <div class='g-box2'>
      <div class="info2">
        <el-form :model="dibaoForm"
                 :rules="rules"
                 :inline-message="true"
                 :show-message="false"
                 ref="dibaoForm"
                 label-width="auto"
                 style='padding-right: 10px;'
                 @submit.native.prevent>
          <h3 class="line_blue"
              id="page1">&emsp;基本信息
            <!-- <el-popover
					placement="right"
					width="auto"
					trigger="hover"
					content="这是一段提示内容：所有标星号必填。">
					<i slot="reference" class="el-icon-warning-outline" style="color:#e6a544;font-size:18px;margin-left:2px"></i>
					</el-popover> -->
          </h3>
          <div class="lineSt"></div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="申请人姓名"
                            prop="ab_ex3">
                <!-- <el-tooltip class="item" effect="dark" content="申请人变更需要整户注销，并不得变更申请人" placement="top"> -->
                <el-input v-model="dibaoForm.ab_ex3"
                          placeholder="请输入申请人姓名"
                          @change="keyVerification(dibaoForm.ab_ex3,'ab_ex3')"></el-input>
                <!-- </el-tooltip> -->
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="身份证号码"
                            prop="ab_ex7">
                <el-input v-model="dibaoForm.ab_ex7"
                          placeholder="请输入身份证号码"
                          @change="keyVerification(dibaoForm.ab_ex7,'ab_ex7')"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col>
              <el-form-item label="行政区划"
                            prop="ab_ex162">
                <el-cascader :props="props"
                             v-model="xzqhArray"
                             placeholder="请选择区划"
                             style="width:100%;"
                             v-if="isFinish"></el-cascader>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="户籍地址"
                            prop="ab_ex4">
                <el-input v-model="dibaoForm.ab_ex4"
                          placeholder="请输入户籍地址"
                          @change="keyVerification(dibaoForm.ab_ex4,'ab_ex4')"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="家庭住址"
                            prop="ab_ex11">
                <el-input v-model="dibaoForm.ab_ex11"
                          placeholder="请输入家庭住址"
                          @change="keyVerification(dibaoForm.ab_ex11,'ab_ex11')"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="户籍性质"
                            prop="ab_ex6">
                <el-select v-model="dibaoForm.ab_ex6"
                           style="width:100%">
                  <el-option label="非农业户口"
                             value="非农业户口"></el-option>
                  <el-option label="农业户口"
                             value="农业户口"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="家庭人口"
                            prop="ab_ex5">
                <el-input v-model="dibaoForm.ab_ex5"
                          placeholder="请输入家庭人口"
                          @change="keyVerification(dibaoForm.ab_ex5,'ab_ex5')"></el-input>
              </el-form-item>
            </el-col>

          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="联系电话"
                            prop="ab_ex28">
                <el-input v-model="dibaoForm.ab_ex28"
                          placeholder="请输入联系电话(手机)"
                          @change="keyVerification(dibaoForm.ab_ex28,'ab_ex28')"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="求助原因"
                            prop="ab_ex46">
                <el-select v-model="ab_ex46"
                           multiple
                           placeholder="请选择求助原因(可多选)"
                           @change="changeAmt"
                           style="width:100%">
                  <el-option label="缺乏劳动力"
                             value="缺乏劳动力"></el-option>
                  <el-option label="无生活来源"
                             value="无生活来源"></el-option>
                  <el-option label="疾病"
                             value="疾病"></el-option>
                  <el-option label="残疾"
                             value="残疾"></el-option>
                  <el-option label="教育"
                             value="教育"></el-option>
                  <el-option label="住房"
                             value="住房"></el-option>
                  <el-option label="受灾"
                             value="受灾"></el-option>
                  <el-option label="其他"
                             value="其他"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="是否属于村干部或经办人员近亲属"
                            label-width="260px"
                            prop="ab_ex92">
                <el-select v-model="dibaoForm.ab_ex92"
                           style="width:100%"
                           @change="changeFm4(dibaoForm.ab_ex92)">
                  <el-option label="否"
                             value="否"></el-option>
                  <el-option label="是"
                             value="是"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <div v-if="dibaoForm.ab_ex92=='是'"
               style="margin-bottom:30px">
            <h3 class="line_blue"
                id="page21">&emsp;村干部或经办人员近亲属信息</h3>
            <div class="lineSt"></div>
            <el-row class="button-group">
              <el-button type="primary"
                         icon="el-icon-plus"
                         size="mini"
                         @click="handleAddDetails('familyData4')">
                新增</el-button>
              <el-button type="danger"
                         icon="el-icon-delete"
                         size="mini"
                         @click="handleDelDetails('familyData4')">
                删除</el-button>
            </el-row>
            <el-table :data="familyData4"
                      border
                      :row-class-name="rowClassName"
                      @selection-change="handleFamilyData4"
                      empty-text='空'
                      class="my-table">
              <el-table-column type="selection"
                               width="40"
                               align="center" />
              <el-table-column prop="abm_ex3"
                               label="姓名"
                               min-width="110">
                <template slot-scope="scope">
                  <el-input v-model="familyData4[scope.row.xh-1].abm_ex3"
                            @change="keyVerification(familyData4[scope.row.xh-1].abm_ex3,'f4.abm_ex3')"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="abm_ex1"
                               label="近亲属关系"
                               min-width="125">
                <template slot-scope="scope">
                  <el-input v-model="familyData4[scope.row.xh-1].abm_ex1"
                            @change="keyVerification(familyData4[scope.row.xh-1].abm_ex1,'f4.abm_ex1')"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="abm_ex15"
                               label="任职机构和职位"
                               min-width="190">
                <template slot-scope="scope">
                  <el-input v-model="familyData4[scope.row.xh-1].abm_ex15"
                            @change="keyVerification(familyData4[scope.row.xh-1].abm_ex15,'f4.abm_ex15')"></el-input>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="一卡通开户银行"
                            prop="ab_ex42">
                <el-input v-model="dibaoForm.ab_ex42"
                          placeholder="请输入开户银行"
                          @change="keyVerification(dibaoForm.ab_ex42,'ab_ex42')"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="开户人"
                            prop="ab_ex8">
                <el-input v-model="dibaoForm.ab_ex8"
                          placeholder="请输入开户人"
                          @change="keyVerification(dibaoForm.ab_ex8,'ab_ex8')"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="(this.dibaoForm.ab_ex13 == '低保'? 12 : 24)">
              <el-form-item label="一卡通银行账号"
                            prop="ab_ex43">
                <el-input v-model="dibaoForm.ab_ex43"
                          placeholder="请输入银行账号"
                          @change="keyVerification(dibaoForm.ab_ex43,'ab_ex43')"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12"
                    v-if="this.dibaoForm.ab_ex13 == '低保'">
              <el-form-item label="是否进入渐退期"
                            prop="ab_ex207">
                <el-select v-model="dibaoForm.ab_ex207"
                           style="width:100%">
                  <el-option label="否"
                             value="否"></el-option>
                  <el-option label="是"
                             value="是"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <div v-if="this.dibaoForm.ab_ex207=='是'"
               style="margin-top:10px;">
            <h3 class="line_blue"
                id="page21">&emsp;渐退期金额调整</h3>
            <div class="lineSt"></div>
            <el-table :data="familyData1"
                      border
                      :row-class-name="rowClassName"
                      empty-text='空'
                      class="my-table2">

              <!-- <el-table-column type="selection" width="40" align="center" /> -->

              <el-table-column prop="abm_ex3"
                               label="姓名"
                               min-width="110"></el-table-column>
              <el-table-column prop="abm_ex71"
                               label="发放金（元）"
                               min-width="125">
                <template slot-scope="scope">
                  <el-input v-model="familyData1[scope.row.xh-1].abm_ex71"
                            style="text-align:center"
                            @change="isBack(scope.row.xh-1)"></el-input>
                </template>
              </el-table-column>
            </el-table>
          </div>

          <h3 class="line_blue"
              id="page2"
              style="margin-top: 20px;">&emsp;自定义预警</h3>
          <div class="lineSt"></div>
          <el-row class="button-group">
            <el-button type="primary"
                       icon="el-icon-plus"
                       size="mini"
                       @click="handleAddDetails('warningData')">
              新增</el-button>
            <el-button type="danger"
                       icon="el-icon-delete"
                       size="mini"
                       @click="handleDelDetails('warningData')">
              删除</el-button>
          </el-row>
          <el-table :data="warningData"
                    border
                    :row-class-name="rowClassName"
                    @selection-change="handleWarningData"
                    empty-text='空'
                    class="my-table">
            <el-table-column type="selection"
                             width="40"
                             align="center" />
            <el-table-column prop="aw_ex1"
                             label="预警内容"
                             min-width="110">
              <template slot-scope="scope">
                <el-input v-model="warningData[scope.row.xh-1].aw_ex1"
                          placeholder="请输入预警内容"
                          @change="changeAmt2(scope.$index,scope.row,'warning.aw_ex1')"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="aw_dat1"
                             label="预警时间"
                             min-width="125">
              <template slot-scope="scope">
                <!-- <el-input v-model="warningData[scope.row.xh-1].aw_dat1"></el-input> -->
                <el-date-picker v-model="warningData[scope.row.xh-1].aw_dat1"
                                value-format="yyyy-MM-dd"
                                style="width: 100%;"
                                :picker-options="pickerOptions"
                                @change="changeAmt2">
                </el-date-picker>
              </template>
            </el-table-column>
          </el-table>

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
              id="page8"
              style='margin-top:15px'>&emsp;变更信息</h3>
          <div class="lineSt"></div>
          <el-row :gutter="20">
            <el-col :span="24">
              <span class="change_title">(请尽量将变更理由写详细，80字以内--</span>
              <el-popover placement="top"
                          width="650"
                          trigger="hover"
                          content="如：申请人基本信息修改；新增共同成员；核减共同成员；共同成员信息变更；新增赡扶抚人；核减赡扶抚人；赡扶抚人信息变更；更新收入金额；保障标准调整...">
                <ins slot="reference"
                     style="color:#3585ff;cursor: pointer;">例如</ins>
              </el-popover>
              <span>)</span>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label='变更理由说明'>
                <!-- <el-select v-model='changeM.ac_ex10' placeholder='请选择'>
								<el-option label='人口增加' value='人口增加'></el-option>
								<el-option label='人口减少' value='人口减少'></el-option>
								<el-option label='收入变化' value='收入变化'></el-option>
								<el-option label='保障标准调整' value='保障标准调整'></el-option>
								<el-option label='其他' value='其他'></el-option>
							</el-select> -->
                <el-input v-model='changeM.ac_ex10'
                          placeholder='请输入说明情况'></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row :gutter="20">
					<el-col :span="24">
						<el-form-item label='说明情况'>
							<el-input :disabled="changeM.ac_ex10!='其他'" v-model='changeM.ac_ex10_2'
								placeholder='请输入说明情况'></el-input>
						</el-form-item>
					</el-col>
				</el-row> -->
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label='变更时间'>
                <el-date-picker type="datetime"
                                v-model="changeM.ac_dat1"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                style="width: 100%;">
                  <!-- <el-date-picker type="date" v-model="changeM.ac_dat1"  style="width: 100%;"  > -->
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <h3 class="line_blue"
              id="page3"
              style='margin-top:15px'>&emsp;共同生活家庭成员情况</h3>
          <div class="lineSt"></div>
          <el-row class="button-group">
            <el-button type="primary"
                       icon="el-icon-plus"
                       size="mini"
                       @click="handleAddDetails('familyData1')">
              新增</el-button>
            <el-button type="danger"
                       icon="el-icon-delete"
                       size="mini"
                       @click="handleDelDetails('familyData1')">
              删除</el-button>
          </el-row>
          <el-table :data="familyData1"
                    border
                    :row-class-name="rowClassName"
                    @selection-change="handleFamilyData1"
                    empty-text='空'
                    class="my-table">
            <el-table-column type="selection"
                             width="40"
                             align="center" />
            <el-table-column prop="abm_ex3"
                             label="姓名"
                             min-width="110">
              <template slot-scope="scope">
                <el-input v-model="familyData1[scope.row.xh-1].abm_ex3"
                          @change="keyVerification2(scope.$index,scope.row,'f1.abm_ex3')"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="abm_ex1"
                             label="与户主关系"
                             min-width="150">
              <template slot-scope="scope">
                <el-select v-model="familyData1[scope.row.xh-1].abm_ex1">
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
                <el-input v-model="familyData1[scope.row.xh-1].abm_ex2"
                          @change="changeCard(scope.$index,scope.row,'f1.abm_ex2')"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="abm_ex5"
                             label="性别"
                             min-width="110">
              <template slot-scope="scope">
                <el-select v-model="familyData1[scope.row.xh-1].abm_ex5">
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
                <el-select v-model="familyData1[scope.row.xh-1].abm_ex16"
                           @change="getNation(scope.$index)">
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
                <el-select v-model="familyData1[scope.row.xh-1].abm_ex7">
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
                <el-select v-model="familyData1[scope.row.xh-1].abm_ex28">
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
                  <!-- <el-option label="未说明的婚姻状况" value="未说明的婚姻状况"></el-option> -->
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="abm_ex51"
                             label="特定对象"
                             min-width="200">
              <template slot-scope="scope">
                <el-select v-model="familyData1[scope.row.xh-1].abm_ex51"
                           @change="tddx(scope.$index,scope.row,'f1.abm_ex2')">
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
                <el-input v-model="familyData1[scope.row.xh-1].age"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop=""
                             label="是否属于劳动年龄段"
                             min-width="160">
              <template slot-scope="scope">
                <el-select v-model="familyData1[scope.row.xh-1].work"
                           @change="changeMember(scope.$index)">
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
                <el-select v-model="familyData1[scope.row.xh-1].abm_ex11"
                           @change="changeMember(scope.$index)">
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
                <el-select v-model="familyData1[scope.row.xh-1].abm_ex52"
                           :disabled="scope.row.abm_ex11!='重病'"
                           @change="changeMember(scope.$index)">
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
                <el-select v-model="familyData1[scope.row.xh-1].abm_ex39"
                           :disabled="scope.row.abm_ex11!='残疾' "
                           @change="changeMember(scope.$index)">
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
                <el-select v-model="familyData1[scope.row.xh-1].abm_ex40"
                           :disabled="scope.row.abm_ex11!='残疾' "
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
                <el-select v-model="familyData1[scope.row.xh-1].abm_ex49">
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
            <el-table-column prop="abm_ex14"
                             label="职业状况"
                             min-width="160">
              <template slot-scope="scope">
                <el-select v-model="familyData1[scope.row.xh-1].abm_ex14">
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
                <el-input v-model="familyData1[scope.row.xh-1].abm_ex15"
                          @change="keyVerification2(scope.$index,scope.row,'f1.abm_ex15')"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="abm_ex17"
                             label="月收入"
                             min-width="100">
              <template slot-scope="scope">
                <el-input v-model="familyData1[scope.row.xh-1].abm_ex17"
                          @change="keyVerification2(scope.$index,scope.row,'f1.abm_ex17')"></el-input>
              </template>
            </el-table-column>
          </el-table>

          <h3 class="line_blue"
              id="page4"
              style='margin-top:15px'>&emsp;非共同生活赡抚扶养人信息</h3>
          <div class="lineSt"></div>
          <el-row class="button-group">
            <el-button type="primary"
                       icon="el-icon-plus"
                       size="mini"
                       @click="handleAddDetails('familyData2')">
              新增</el-button>
            <el-button type="danger"
                       icon="el-icon-delete"
                       size="mini"
                       @click="handleDelDetails('familyData2')">
              删除</el-button>
          </el-row>
          <el-table :data="familyData2"
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
                <el-input v-model="familyData2[scope.row.xh-1].abm_ex3"
                          @change="keyVerification2(scope.$index,scope.row,'f2.abm_ex3')"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="abm_ex1"
                             label="家庭关系"
                             min-width="150">
              <template slot-scope="scope">
                <el-select v-model="familyData2[scope.row.xh-1].abm_ex1">
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
            <el-table-column prop="abm_ex81"
                             label="赡(扶、抚)养关系"
                             min-width="150">
              <template slot-scope="scope">
                <el-select v-model="familyData2[scope.row.xh-1].abm_ex81">
                  <el-option label="赡养"
                             value="赡养"></el-option>
                  <el-option label="扶养"
                             value="扶养"></el-option>
                  <el-option label="抚养"
                             value="抚养">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="abm_ex2"
                             label="身份证号码"
                             min-width="190">
              <template slot-scope="scope">
                <el-input v-model="familyData2[scope.row.xh-1].abm_ex2"
                          @change="changeCard2(scope.$index,scope.row,'f2.abm_ex2')"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="abm_ex11"
                             label="健康状况"
                             min-width="110">
              <template slot-scope="scope">
                <el-select v-model="familyData2[scope.row.xh-1].abm_ex11">
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
            <el-table-column prop="abm_ex49"
                             label="劳动能力"
                             min-width="160">
              <template slot-scope="scope">
                <el-select v-model="familyData2[scope.row.xh-1].abm_ex49">
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
                <el-input v-model="familyData2[scope.row.xh-1].abm_ex21"
                          @change="keyVerification2(scope.$index,scope.row,'f2.abm_ex21')"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="abm_ex15"
                             label="工作单位"
                             min-width="200">
              <template slot-scope="scope">
                <el-input v-model="familyData2[scope.row.xh-1].abm_ex15"
                          @change="keyVerification2(scope.$index,scope.row,'f2.abm_ex15')"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="abm_ex20"
                             label="家庭人口"
                             min-width="120">
              <template slot-scope="scope">
                <el-input v-model="familyData2[scope.row.xh-1].abm_ex20"
                          @change="keyVerification2(scope.$index,scope.row,'f2.abm_ex20')"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="abm_ex17"
                             label="家庭人均月收入"
                             min-width="100">
              <template slot-scope="scope">
                <el-input v-model="familyData2[scope.row.xh-1].abm_ex17"
                          @change="keyVerification2(scope.$index,scope.row,'f2.abm_ex17')"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="abm_ex18"
                             label="月赡(扶、抚)养费"
                             min-width="130">
              <template slot-scope="scope">
                <el-input v-model="familyData2[scope.row.xh-1].abm_ex18"
                          @change="keyVerification2(scope.$index,scope.row,'f2.abm_ex18')"></el-input>
              </template>
            </el-table-column>
          </el-table>

          <h3 class="line_blue"
              id="page9"
              style='margin-top:15px'>&emsp;非共同生活赡抚扶养人家庭成员信息</h3>
          <div class="lineSt"></div>
          <el-row class="button-group">
            <el-button type="primary"
                       icon="el-icon-plus"
                       size="mini"
                       @click="handleAddDetails('familyData3')">
              新增</el-button>
            <el-button type="danger"
                       icon="el-icon-delete"
                       size="mini"
                       @click="handleDelDetails('familyData3')">
              删除</el-button>
          </el-row>
          <el-table :data="familyData3"
                    border
                    :row-class-name="rowClassName"
                    @selection-change="handleFamilyData3"
                    empty-text='空'
                    class="my-table">
            <el-table-column type="selection"
                             width="40"
                             align="center" />
            <el-table-column prop="abm_ex3"
                             label="姓名"
                             min-width="110">
              <template slot-scope="scope">
                <el-input v-model="familyData3[scope.row.xh-1].abm_ex3"
                          @change="keyVerification2(scope.$index,scope.row,'f3.abm_ex3')"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="abm_ex1"
                             label="家庭关系"
                             min-width="125">
              <template slot-scope="scope">
                <el-select v-model="familyData3[scope.row.xh-1].abm_ex1">
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
            <el-table-column prop="abm_ex81"
                             label="赡(扶、抚)养关系"
                             min-width="150">
              <template slot-scope="scope">
                <el-select v-model="familyData3[scope.row.xh-1].abm_ex81">
                  <el-option label="赡养"
                             value="赡养"></el-option>
                  <el-option label="扶养"
                             value="扶养"></el-option>
                  <el-option label="抚养"
                             value="抚养">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="abm_ex2"
                             label="身份证号码"
                             min-width="190">
              <template slot-scope="scope">
                <el-input v-model="familyData3[scope.row.xh-1].abm_ex2"
                          @change="changeCard3(scope.$index,scope.row,'f3.abm_ex2')"></el-input>
              </template>
            </el-table-column>
          </el-table>

          <h3 class="line_blue"
              id="page5"
              style='margin-top:15px'>&emsp;家庭前12个月收入情况</h3>
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
                  <!-- <template slot-scope="scope">
									<el-input v-model="income1[scope.row.xh-1].abi_ex1"></el-input>
								</template> -->
                  <!-- 工资 奖金 津贴 补贴 福利 -->
                  <template slot-scope="scope">
                    <el-select v-model="income1[scope.row.xh-1].abi_ex1">
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

          <div>
            <el-row class="button-group"
                    style="margin-top:20px">
            </el-row>
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
                  <template>
                    <el-input :value="income2[0].abi_ex1"
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
                    <el-select v-model="income3[scope.row.xh-1].abi_ex1">
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
                    <el-select v-model="income4[scope.row.xh-1].abi_ex1">
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
                  <template>
                    <el-input :value="income5[0].abi_ex1"
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
                  <template>
                    <el-input :value="income6[0].abi_ex1"
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
                    <!-- <el-input v-model="income7[scope.row.xh-1].abi_ex1" class="srname"></el-input> -->
                    <el-input :value="income7[scope.row.xh-1].abi_ex1"
                              class="srname"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="金额"
                                 prop="abi_ex2"
                                 min-width="145">
                  <template slot-scope="scope">
                    <el-input v-model="income7[scope.row.xh-1].abi_ex2"
                              readonly
                              class="srname"
                              @change="changeAmt(scope.$index,scope.row,'ico7.abi_ex2')"></el-input>
                  </template>
                </el-table-column>

              </el-table-column>

            </el-table>
          </div>

          <h3 class="line_blue"
              id="page10"
              style='margin-top:15px'>&emsp;家庭前12个月支出情况</h3>
          <div class="lineSt"></div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="医疗支出"
                            prop="abp_ex4"
                            label-width="200px">
                <el-input v-model="pay.abp_ex4"
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
              id="page6"
              style='margin-top:15px'>&emsp;金融资产</h3>
          <div class="lineSt"></div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="银行总存款"
                            prop="ab_ex36">
                <el-input v-model="dibaoForm.ab_ex36"
                          placeholder="请输入银行总存款"
                          @change="keyVerification(dibaoForm.ab_ex36,'ab_ex36')"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="有价证券"
                            prop="ab_ex60">
                <el-input v-model="dibaoForm.ab_ex60"
                          placeholder="请输入有价证券"
                          @change="keyVerification(dibaoForm.ab_ex60,'ab_ex60')"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="基金"
                            prop="ab_ex179">
                <el-input v-model="dibaoForm.ab_ex179"
                          placeholder="请输入基金"
                          @change="keyVerification(dibaoForm.ab_ex179,'ab_ex179')"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="商业保险"
                            prop="ab_ex180">
                <el-input v-model="dibaoForm.ab_ex180"
                          placeholder="请输入商业保险"
                          @change="keyVerification(dibaoForm.ab_ex180,'ab_ex180')"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="债权"
                            prop="ab_ex61">
                <el-input v-model="dibaoForm.ab_ex61"
                          placeholder="请输入债权"
                          @change="keyVerification(dibaoForm.ab_ex61,'ab_ex61')"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="其他金融产品"
                            prop="ab_ex37">
                <el-input v-model="dibaoForm.ab_ex37"
                          placeholder="请输入其他金融产品"
                          @change="keyVerification(dibaoForm.ab_ex37,'ab_ex37')"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <h3 class="line_blue"
              id="page11"
              style='margin-top:15px'>&emsp;拥有车、船情况</h3>
          <div class="lineSt"></div>
          <el-row class="button-group">
            <el-col :span="12">
              <el-button type="primary"
                         icon="el-icon-plus"
                         size="mini"
                         @click="handleAddDetails('estate1')">
                新增</el-button>
              <el-button type="danger"
                         icon="el-icon-delete"
                         size="mini"
                         @click="handleDelDetails('estate1')">
                删除</el-button>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-table :data="estate1"
                        border
                        :row-class-name="rowClassName"
                        @selection-change="handleEstate1"
                        empty-text='空'
                        class="my-table">
                <el-table-column type="selection"
                                 min-width="40"
                                 align="center" />
                <el-table-column prop="abe_ex1"
                                 label="车(船)主"
                                 min-width="100">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.abe_ex1"
                              @change="keyVerification2(scope.$index,scope.row,'e1.abe_ex1')"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="abe_ex2"
                                 label="购买时间"
                                 min-width="100">
                  <template slot-scope="scope">
                    <el-date-picker type="date"
                                    v-model="scope.row.abe_ex2"
                                    placeholder="选择日期"
                                    value-format="yyyy-MM-dd"
                                    style="width: 100%;">
                    </el-date-picker>
                    <!-- <el-input v-model="scope.row.abe_ex2" @change="keyVerification2(scope.$index,scope.row,'e1.abe_ex2')"></el-input> -->
                  </template>
                </el-table-column>
                <el-table-column prop="abe_ex3"
                                 label="用途"
                                 min-width="100">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.abe_ex3"
                              @change="keyVerification2(scope.$index,scope.row,'e1.abe_ex3')"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="abe_ex8"
                                 label="车(船)型"
                                 min-width="100">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.abe_ex8"
                              @change="keyVerification2(scope.$index,scope.row,'e1.abe_ex8')"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="abe_ex4"
                                 label="车(船)价值"
                                 min-width="100">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.abe_ex4"
                              @change="keyVerification2(scope.$index,scope.row,'e1.abe_ex4')"></el-input>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
          <h3 class="line_blue"
              id="page12"
              style='margin-top:15px'>&emsp;拥有房产情况</h3>
          <div class="lineSt"></div>
          <el-row class="button-group">
            <el-col :span="12">
              <el-button type="primary"
                         icon="el-icon-plus"
                         size="mini"
                         @click="handleAddDetails('estate2')">
                新增</el-button>
              <el-button type="danger"
                         icon="el-icon-delete"
                         size="mini"
                         @click="handleDelDetails('estate2')">
                删除</el-button>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-table :data="estate2"
                        border
                        :row-class-name="rowClassName"
                        @selection-change="handleEstate2"
                        empty-text='空'
                        class="my-table">
                <el-table-column type="selection"
                                 min-width="40"
                                 align="center" />
                <el-table-column prop="abe_ex1"
                                 label="房屋产权人/共有人"
                                 min-width="120">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.abe_ex1"
                              @change="keyVerification2(scope.$index,scope.row,'e2.abe_ex1')"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="abe_ex2"
                                 label="建房(购房)时间"
                                 min-width="120">
                  <template slot-scope="scope">
                    <el-date-picker type="date"
                                    v-model="scope.row.abe_ex2"
                                    placeholder="选择日期"
                                    value-format="yyyy-MM-dd"
                                    style="width: 100%;">
                    </el-date-picker>
                    <!-- <el-input v-model="scope.row.abe_ex2" @change="keyVerification2(scope.$index,scope.row,'e2.abe_ex2')"></el-input> -->
                  </template>
                </el-table-column>
                <el-table-column prop="abe_ex5"
                                 label="房屋地址"
                                 min-width="180">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.abe_ex5"
                              @change="keyVerification2(scope.$index,scope.row,'e2.abe_ex5')"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="abe_ex11"
                                 label="房屋性质"
                                 min-width="180">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.abe_ex11">
                      <el-option label="请选择"
                                 value=""></el-option>
                      <el-option label="商品房"
                                 value="商品房"></el-option>
                      <el-option label="产权房"
                                 value="产权房"></el-option>
                      <el-option label="单位福利房"
                                 value="单位福利房"></el-option>
                      <el-option label="拆迁安置房"
                                 value="拆迁安置房"></el-option>
                      <el-option label="经济适用房"
                                 value="经济适用房"></el-option>
                      <el-option label="自建住房"
                                 value="自建住房"></el-option>
                      <el-option label="共有产权房"
                                 value="共有产权房"></el-option>
                      <el-option label="公租房"
                                 value="公租房"></el-option>
                      <el-option label="廉租房"
                                 value="廉租房"></el-option>
                      <el-option label="租赁房"
                                 value="租赁房"></el-option>
                      <el-option label="借住房"
                                 value="借住房"></el-option>
                      <el-option label="其他"
                                 value="其他"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="abe_ex6"
                                 label="面积(平方)"
                                 min-width="120">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.abe_ex6"
                              @change="keyVerification2(scope.$index,scope.row,'e2.abe_ex6')"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="abe_ex4"
                                 label="购置价/建造价"
                                 min-width="120">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.abe_ex4"
                              @change="keyVerification2(scope.$index,scope.row,'e2.abe_ex4')"></el-input>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>

          <h3 class="line_blue"
              id="page13"
              style="margin-top:15px">&emsp;居住状况照片</h3>
          <div class="lineSt"></div>
          <el-row :gutter="20">
            <el-col :span="12"
                    class="my-col">
              <el-card class="box-card">
                <div slot="header"
                     class="clearfix">
                  <el-button style="float: left; padding: 3px 0"
                             type="text"
                             @click="handleRemove(uploadImg,'ab_ex166')">
                    删除</el-button>
                  <span>房屋整体照片(每套房屋上传两张)(<span style='color:red'>{{imgNum.ab_ex166_img}}</span>)</span>
                  <el-button style="float: right; padding: 3px 0"
                             type="text"
                             @click="uploads('ab_ex166', 'dibaoForm')">
                    上传</el-button>
                </div>
                <div class="block">
                  <image-view :imgList="uploadImg.ab_ex166_img"
                              @Imgindex='getImgIndex'
                              id="ab_ex166"></image-view>
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
                             @click="handleRemove(uploadImg,'ab_ex167')">
                    删除</el-button>
                  <span>室内照片(每套房屋上传两张)(<span style='color:red'>{{imgNum.ab_ex167_img}}</span>)</span>
                  <el-button style="float: right; padding: 3px 0"
                             type="text"
                             @click="uploads('ab_ex167', 'dibaoForm')">
                    上传</el-button>
                </div>
                <div class="block">
                  <image-view :imgList="uploadImg.ab_ex167_img"
                              @Imgindex='getImgIndex'
                              id="ab_ex167"></image-view>
                </div>
              </el-card>
            </el-col>
          </el-row>

          <h3 class="line_blue"
              id="page18"
              style="margin-top:15px">&emsp;承包山林土地情况</h3>
          <div class="lineSt"></div>
          <el-row class="button-group">
            <el-button type="primary"
                       icon="el-icon-plus"
                       size="mini"
                       @click="handleAddDetails('landInfo')">
              新增</el-button>
            <el-button type="danger"
                       icon="el-icon-delete"
                       size="mini"
                       @click="handleDelDetails('landInfo')">
              删除</el-button>
          </el-row>
          <el-table :data="landInfo"
                    border
                    :row-class-name="rowClassName"
                    @selection-change="handleLandInfoData"
                    empty-text='空'
                    class="my-table">
            <el-table-column type="selection"
                             width="40"
                             align="center" />
            <el-table-column prop="abl_ex1"
                             label="承包人姓名"
                             min-width="110">
              <template slot-scope="scope">
                <el-input v-model="landInfo[scope.row.xh-1].abl_ex1"
                          @change="keyVerification2(scope.$index,scope.row,'land.abl_ex1')"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="abl_ex2"
                             label="承包面积(亩)"
                             min-width="190">
              <template slot-scope="scope">
                <el-input v-model="landInfo[scope.row.xh-1].abl_ex2"
                          @change="keyVerification2(scope.$index,scope.row,'land.abl_ex2')"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="abl_ex3"
                             label="土地类型"
                             min-width="130">
              <template slot-scope="scope">
                <el-select v-model="landInfo[scope.row.xh-1].abl_ex3">
                  <el-option label="请选择"
                             value=""></el-option>
                  <el-option label="耕地"
                             value="耕地"></el-option>
                  <el-option label="山林"
                             value="山林"></el-option>
                  <el-option label="草场"
                             value="草场"></el-option>
                  <el-option label="水塘"
                             value="水塘"></el-option>
                  <el-option label="其他"
                             value="其他"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="abl_ex4"
                             label="土地估值"
                             min-width="130">
              <template slot-scope="scope">
                <el-input v-model="landInfo[scope.row.xh-1].abl_ex4"
                          @change="keyVerification2(scope.$index,scope.row,'land.abl_ex4')"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="abl_ex5"
                             label="备注"
                             min-width="200">
              <template slot-scope="scope">
                <el-input v-model="landInfo[scope.row.xh-1].abl_ex5"></el-input>
              </template>
            </el-table-column>
          </el-table>

          <h3 class="line_blue"
              id="page7"
              style="margin-top:15px">&emsp;身份证及其他证明材料上传</h3>
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
                               @click="handleRemove(uploadImg,'ab_ex10')">
                      删除</el-button>
                    <span>身份证拍照(正反面)(<span style='color:red'>{{imgNum.ab_ex10_img}}</span>)</span>
                    <el-button style="float: right; padding: 3px 0"
                               type="text"
                               @click="uploads('ab_ex10', 'dibaoForm')">上传</el-button>
                  </div>
                  <div class="block">
                    <image-view :imgList="uploadImg.ab_ex10_img"
                                id="ab_ex10"
                                @Imgindex='getImgIndex'></image-view>
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
                               @click="handleRemove(uploadImg,'ab_ex177')">
                      删除</el-button>
                    <span>纸质授权书(<span style='color:red'>{{imgNum.ab_ex177_img}}</span>)</span>
                    <el-button style="float: right; padding: 3px 0"
                               type="text"
                               @click="uploads('ab_ex177', 'dibaoForm')">上传</el-button>
                  </div>
                  <div class="block">
                    <image-view :imgList="uploadImg.ab_ex177_img"
                                id="ab_ex177"
                                @Imgindex='getImgIndex'></image-view>
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
                               @click="handleRemove(uploadImg,'ab_ex16')">
                      删除</el-button>
                    <span>其他证明材料(<span style='color:red'>{{imgNum.ab_ex16_img}}</span>)</span>
                    <el-button style="float: right; padding: 3px 0"
                               type="text"
                               @click="uploads('ab_ex16', 'dibaoForm')">上传</el-button>
                  </div>
                  <div class="block">
                    <image-view :imgList="uploadImg.ab_ex16_img"
                                id="ab_ex16"
                                @Imgindex='getImgIndex'></image-view>
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
                               @click="handleRemove(uploadImg,'ab_ex74')">
                      删除</el-button>
                    <span>审核审批表(<span style='color:red'>{{imgNum.ab_ex74_img}}</span>)</span>
                    <el-button style="float: right; padding: 3px 0"
                               type="text"
                               @click="uploads('ab_ex74', 'dibaoForm')">上传</el-button>
                  </div>
                  <div class="block">
                    <image-view :imgList="uploadImg.ab_ex74_img"
                                id="ab_ex74"
                                @Imgindex='getImgIndex'></image-view>
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
                               @click="handleRemove(uploadImg,'ab_ex97')">
                      删除</el-button>
                    <span>民主评议(<span style='color:red'>{{imgNum.ab_ex97_img}}</span>)</span>
                    <el-button style="float: right; padding: 3px 0"
                               type="text"
                               @click="uploads('ab_ex97','dibaoForm')">上传</el-button>
                  </div>
                  <div class="block">
                    <image-view :imgList="uploadImg.ab_ex97_img"
                                id="ab_ex97"
                                @Imgindex='getImgIndex'></image-view>
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
                               @click="handleRemove(uploadImg,'ab_ex98')">
                      删除</el-button>
                    <span>公示图片(<span style='color:red'>{{imgNum.ab_ex98_img}}</span>)</span>
                    <el-button style="float: right; padding: 3px 0"
                               type="text"
                               @click="uploads('ab_ex98','dibaoForm')">上传</el-button>
                  </div>
                  <div class="block">
                    <image-view :imgList="uploadImg.ab_ex98_img"
                                id="ab_ex98"
                                @Imgindex='getImgIndex'></image-view>
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
                               @click="handleRemove(uploadImg,'ab_ex73')">
                      删除</el-button>
                    <span>电子授权书(<span style='color:red'>{{imgNum.ab_ex73_img}}</span>)</span>
                    <el-button style="float: right; padding: 3px 0"
                               type="text"
                               @click="uploads('ab_ex73', 'dibaoForm')">上传</el-button>
                  </div>
                  <div class="block">
                    <image-view :imgList="uploadImg.ab_ex73_img"
                                id="ab_ex73"
                                @Imgindex='getImgIndex'></image-view>
                  </div>
                </el-card>
              </el-col>
            </el-row>
            <el-row :gutter="20"
                    style='margin-top:10px'>

            </el-row>
          </div>

          <h3 class="line_blue"
              id="page17"
              style='margin-top:15px'>&emsp;代理人信息</h3>
          <div class="lineSt"></div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="姓名"
                            prop="aba_ex1">
                <el-input v-model="agentInfo.aba_ex1"
                          placeholder="请输入代理人姓名"
                          @change="keyVerification(agentInfo.aba_ex1, 'aba_ex1')"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="身份证号码"
                            prop="aba_ex3">
                <el-input v-model="agentInfo.aba_ex3"
                          placeholder="请输入身份证号码"
                          @change="keyVerification(agentInfo.aba_ex3, 'aba_ex3')"></el-input>
              </el-form-item>
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
                             @click="handleRemove(uploadImg,'aba_ex4')">
                    删除</el-button>
                  <span>身份证拍照(正反面)(<span style='color:red'>{{imgNum.aba_ex4_img}}</span>)</span>
                  <el-button style="float: right; padding: 3px 0"
                             type="text"
                             @click="uploads('aba_ex4', 'agentInfo')">上传</el-button>
                </div>
                <div class="block">
                  <image-view :imgList="uploadImg.aba_ex4_img"
                              id="aba_ex4"
                              @Imgindex='getImgIndex'></image-view>
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
                             @click="handleRemove(uploadImg,'aba_ex5')">
                    删除</el-button>
                  <span>委托书(<span style='color:red'>{{imgNum.aba_ex5_img}}</span>)</span>
                  <el-button style="float: right; padding: 3px 0"
                             type="text"
                             @click="uploads('aba_ex5', 'agentInfo')">上传</el-button>
                </div>
                <div class="block">
                  <image-view :imgList="uploadImg.aba_ex5_img"
                              id="aba_ex5"
                              @Imgindex='getImgIndex'></image-view>
                </div>
              </el-card>
            </el-col>
          </el-row>

          <template v-if="this.dibaoForm.ab_ex13=='特困供养'">
            <h3 class="line_blue"
                id="page22"
                style="margin-top:15px">&emsp;特困信息补充</h3>
            <div class="lineSt"></div>
            <div class="top_1">
              <el-row :gutter="20"
                      style="text-align:center;margin-bottom:10px">
                <el-col :span="2"
                        style="line-height: 30px;text-align:center;">
                  <div style="line-height:30px;;min-width:100px"><span style="color:red"> * </span>特困供养方式</div>
                </el-col>
                <el-col :span="6">
                  <el-select v-model="dibaoForm.ab_ex71">
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
                  <el-select v-model="dibaoForm.ab_ex199"
                             @change="changeMoney(dibaoForm.ab_ex199,'ab_ex199')">
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
                  <!-- <el-input v-model="dibaoForm.ab_ex199" placeholder="请输入护理费" @change="keyVerification(dibaoForm.ab_ex199,'ab_ex199')" ></el-input> -->
                </el-col>

                <el-col :span="2">
                  <div style="line-height: 30px;"><span v-if="['集中','集中供养'].includes(dibaoForm.ab_ex71)"
                          style="color:red"> * </span>供养机构</div>
                </el-col>
                <el-col :span="6">
                  <!-- <el-select v-model="dibaoForm.ab_ex195"  filterable placeholder="请选择供养机构名称" @change="getSupportinst(dibaoForm.ab_ex195,'ab_ex195')">
									<el-option v-for="item in supportinstList" :key="item.abs_ex1" :label="item.abs_ex1" :value="item.abs_ex1"></el-option>
								</el-select> -->
                  <el-input v-model="dibaoForm.ab_ex195"
                            placeholder="请输入供养机构名称"
                            @change="keyVerification(dibaoForm.ab_ex195,'ab_ex195')"></el-input>
                </el-col>
              </el-row>

              <el-row :gutter="20"
                      style="text-align:center">
                <el-col :span="2">
                  <div style="line-height: 30px;;min-width:100px"><span style="color:red"> * </span>生活自理能力</div>
                </el-col>
                <el-col :span="6">
                  <el-select v-model="dibaoForm.ab_ex198">
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
                            placeholder="请输入生活费"
                            @change="changeMoney(ab_ex200,'ab_ex200')"></el-input>
                </el-col>
              </el-row>

              <el-row :gutter="20"
                      style="margin:20px 0">
                <el-col :span="12"
                        class="my-col">
                  <el-card class="box-card">
                    <div slot="header"
                         style="text-align: center;">
                      <el-button style="float: left; padding: 3px 0"
                                 type="text"
                                 @click="handleRemove(uploadImg,'ab_ex196')">
                        删除</el-button>
                      <span><span style="color:red"> * </span>自理能力状况评估报告(<span style='color:red'>{{imgNum.ab_ex196_img}}</span>)</span>
                      <el-button style="float: right; padding: 3px 0"
                                 type="text"
                                 @click="uploads('ab_ex196','dibaoForm')">上传</el-button>
                    </div>
                    <div class="block">
                      <image-view :imgList="uploadImg.ab_ex196_img"
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
                                 @click="handleRemove(uploadImg,'ab_ex197')">
                        删除</el-button>
                      <span><span style="color:red"> * </span>集中供养意愿书(<span style='color:red'>{{imgNum.ab_ex197_img}}</span>)</span>
                      <el-button style="float: right; padding: 3px 0"
                                 type="text"
                                 @click="uploads('ab_ex197','dibaoForm')">上传</el-button>
                    </div>
                    <div class="block">
                      <image-view :imgList="uploadImg.ab_ex197_img"
                                  id="ab_ex197"
                                  @Imgindex='getImgIndex'></image-view>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </div>
          </template>

          <el-dialog :visible.sync="dialogVisible"
                     append-to-body>
            <el-image :src="dialogImageUrl"
                      :preview-src-list="dialogImageArray"></el-image>
          </el-dialog>
          <el-dialog title="上传"
                     :visible.sync="dialogVisible3"
                     width="500px"
                     append-to-body
                     @close='uploadEvent2'>
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
      <!-- 右边导航 -->
      <div class="ainfo2">
        <div style="margin-left:20px;text-align:center;border-bottom:1px solid #ddd;padding-bottom:10px;">
          <el-button type="primary"
                     size="small"
                     @click="saveDeletedReason"
                     :disabled='disabled'>保存</el-button>
          <el-button size="small"
                     @click="closeView">返回</el-button>
          <el-button type="success"
                     size="small"
                     @click="getDatailMoney('see')"
                     v-if="['低保','特困供养'].includes(this.dibaoForm.ab_ex13) && ['低收入型低保',''].includes(this.dibaoForm.ab_ex41)">救助金</el-button>
        </div>
        <div style="margin-left:40px;margin-top:20px;">
          <ul>
            <li :class="{listStyle:isShow1}"
                @click="isShow(1)">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow1}"
                 @click="counter('#page1')">基本信息</a><br>
            </li>
            <li v-if="dibaoForm.ab_ex92=='是'"
                :class="{listStyle:isShow21}"
                @click="isShow(21)">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow21}"
                 @click="counter('#page21')">近亲属信息</a><br>
            </li>
            <li :class="{listStyle:isShow2}"
                @click="isShow(2)">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow2}"
                 @click="counter('#page2')">自定义预警</a><br>
            </li>
            <li :class="{listStyle:isShow8}"
                @click="isShow(8)">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow8}"
                 @click="counter('#page8')">变更信息</a><br>
            </li>
            <li :class="{listStyle:isShow3}"
                @click="isShow(3)">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow3}"
                 @click="counter('#page3')">共同生活家庭成员情况</a><br>
            </li>
            <li :class="{listStyle:isShow4}"
                @click="isShow(4)">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow4}"
                 @click="counter('#page4')">非共同生活家庭成员情况</a><br>
            </li>
            <li :class="{listStyle:isShow9}"
                @click="isShow(9)">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow9}"
                 @click="counter('#page9')">非共同生活赡抚养人家庭成员信息</a><br>
            </li>
            <li :class="{listStyle:isShow5}"
                @click="isShow(5)">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow5}"
                 @click="counter('#page5')">家庭前12个月收入情况</a><br>
            </li>
            <li :class="{listStyle:isShow10}"
                @click="isShow(10)">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow10}"
                 @click="counter('#page10')">家庭前12个月支出情况</a><br>
            </li>
            <li :class="{listStyle:isShow6}"
                @click="isShow(6)">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow6}"
                 @click="counter('#page6')">金融资产</a><br>
            </li>
            <li :class="{listStyle:isShow11}"
                @click="isShow(11)">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow11}"
                 @click="counter('#page11')">拥有车、船情况</a><br>
            </li>
            <li :class="{listStyle:isShow12}"
                @click="isShow(12)">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow12}"
                 @click="counter('#page12')">拥有房产情况</a><br>
            </li>
            <li :class="{listStyle:isShow13}"
                @click="isShow(13)">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow13}"
                 @click="counter('#page13')">居住状况照片</a><br>
            </li>
            <li :class="{listStyle:isShow18}"
                @click="isShow(18)">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow18}"
                 @click="counter('#page18')">承包山林土地情况</a><br>
            </li>
            <li :class="{listStyle:isShow7}"
                @click="isShow(7)">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow7}"
                 @click="counter('#page7')">身份证及其他证明材料</a><br>
            </li>
            <li :class="{listStyle:isShow17}"
                @click="isShow(17)">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow17}"
                 @click="counter('#page17')">代理人信息</a><br>
            </li>
            <li :class="{listStyle:isShow22}"
                @click="isShow(22)"
                v-if="this.dibaoForm.ab_ex13=='特困供养'">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow22}"
                 @click="counter('#page22')">特困信息补录</a><br>
            </li>
          </ul>
        </div>
      </div>

    </div>
    <!-- 核减原因 -->
    <div>
      <el-dialog title="提示"
                 :visible.sync="dialogVisible"
                 width="60%">
        <el-table :data="deletedReason"
                  border
                  style="width: 100%">
          <el-table-column prop="name"
                           label="姓名"
                           width="180">
          </el-table-column>
          <el-table-column prop="from"
                           label="来源"
                           width="180">
          </el-table-column>
          <el-table-column prop="reason"
                           label="核减原因">
            <template slot-scope="scope">
              <el-input v-model="scope.row.reason"></el-input>
            </template>
          </el-table-column>
        </el-table>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="save(deletedReason)">确 定</el-button>
        </span>
      </el-dialog>
    </div>

    <!-- 政策计算器 -->
    <el-dialog title="政策计算器提醒"
               :visible.sync="dialogVisible4"
               width="50%">
      <!-- <span>{{assistanceType}}</span> -->
      <div style="font-size:16px;">
        <span>{{setType}}</span>
        <!-- <span v-if="this.jsjgString=='特困人员供养' && this.dibaoForm.ab_ex13!='低保'"><b> 特困供养救助 </b>，如需转为低保救助，请在后面的选项里选择‘低保’选项，否则请选择‘特困供养’选项，您选择</span>
				<span v-if="this.jsjgString=='特困人员供养' && this.dibaoForm.ab_ex13=='低保' && this.dibaoForm.ab_ex207!='是'"><b> 特困供养救助 </b> ; 因检测到您在<b> 低保救助</b> 里，如需留在 低保救助 类型请在后面的选项里选择‘低保’，否则请选择‘特困供养’选项，您选择:</span> -->
        <!-- <div v-if="!['残疾人单列户施保','重病型单列户施保'].includes(this.dibaoForm.ab_ex41)"> -->
        <span v-if="this.jsjgString.indexOf('特困人员供养')!=-1 && this.dibaoForm.ab_ex13!='低保'"><b> {{this.jsjgString}} </b>，请选择一个救助类型:</span>
        <span v-if="this.jsjgString.indexOf('特困人员供养')!=-1 && this.dibaoForm.ab_ex13=='低保' && this.dibaoForm.ab_ex207!='是'"><b> 特困供养救助 </b>，请选择一个救助类型:</span>

        <!-- <select v-if="this.jsjgString=='特困人员供养' && ['低保','特困供养'].includes(this.dibaoForm.ab_ex13) && this.dibaoForm.ab_ex207!='是'" v-model="ab_ex13" style="color:#333;margin:0 5px" @change='changeType'> -->
        <!-- <el-select v-if="this.jsjgString=='特困人员供养' && this.dibaoForm.ab_ex207!='是'" v-model="ab_ex13" style="color:#333;margin:0 5px" @change='changeType'>
						<el-option value="特困供养" label="特困供养"></el-option> 
						<el-option value="低保" label="低保"></el-option> 
					</el-select> -->
        <!-- <el-form-item> -->

        <br v-if="this.jsjgString.indexOf('特困人员供养')!=-1 && this.dibaoForm.ab_ex207!='是'">
        <br v-if="this.jsjgString.indexOf('特困人员供养')!=-1 && this.dibaoForm.ab_ex207!='是'">
        <el-radio-group v-model="ab_ex13"
                        @change='changeType'
                        v-if="this.jsjgString.indexOf('特困人员供养')!=-1 && this.dibaoForm.ab_ex207!='是'">
          <el-radio value="特困供养"
                    label="特困供养"></el-radio>
          <el-radio value="低保"
                    label="低保"></el-radio>
        </el-radio-group>
        <br v-if="this.jsjgString.indexOf('特困人员供养')!=-1 && this.dibaoForm.ab_ex207!='是'">
        <br v-if="this.jsjgString.indexOf('特困人员供养')!=-1 && this.dibaoForm.ab_ex207!='是'">
        <span v-if="this.jsjgString.indexOf('特困人员供养')!=-1 && this.dibaoForm.ab_ex207!='是'">请点击确定请继续保存？</span>
      </div>
      <!-- </div> -->
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible4 = false">取 消</el-button>
        <el-button type="primary"
                   @click="save2">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 发放明细表 -->
    <el-dialog title="变更后家庭月保障金："
               :visible.sync="dialogVisible2"
               width="50%">
      <div v-if="this.jstext == ''">
        <el-table :data="detailMoney"
                  border
                  style="width: 100%">
          <el-table-column prop="abd_ex1"
                           label="姓名"></el-table-column>
          <el-table-column prop="abd_ex2"
                           label="成员关系"></el-table-column>
          <el-table-column prop="abd_ex3"
                           label="救助标准"></el-table-column>
          <el-table-column prop="abd_ex10"
                           label="救助类型"></el-table-column>
          <el-table-column prop="abd_ex5"
                           v-if="dibaoForm.ab_ex13=='特困供养' "
                           label="生活费"></el-table-column>
          <el-table-column prop="abd_ex6"
                           v-if="dibaoForm.ab_ex13=='特困供养' "
                           label="护理费"></el-table-column>
          <el-table-column prop="abd_ex9"
                           label="救助金"></el-table-column>
        </el-table>
        <br>
        <hr><br>
        <div style="width:30%;margin:0 auto;">家庭月保障金合计为：<span style="color:red"> {{ab_ex40}} </span>元</div>
      </div>
      <div style="font-size:16px;color:#f93f40"
           v-if="this.jstext!=''">{{jstext}}</div>
      <span slot="footer"
            class="dialog-footer"
            v-if="this.moneybtn">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary"
                   @click="save3">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import request from '@/utils/request'
import { checkPhone, isName, isFamilyNum, isText, isNum, isBankID, isCardID, warningContent, isSpecialAccount } from '@/utils/until'
import upload from '../upload'
import imageView from '../imageView.vue'
import tkFhListVue from '../fh/tk/tkFhList.vue'
export default {
  name: "dbListChangeEdit",
  components: {
    upload,
    imageView
  },
  data () {
    return {
      deletedReason: [],//核减原因
      pickerOptions: {
        disabledDate (time) {
          // 限制预警时间只能选择第10天及以后
          return time.getTime() < Date.now();
          // return time.getTime() < Date.now() + 8.64e7*9;
        }
      },
      jisuan: { //政策计算-计算元素
        familyNum: '',
        familyZC: '',
        familyZB: '',
        familyFD: '',
        familyAmt: '',
        familyZzc: '',
        familyChildrens: '',
      },
      jisuanShow: false,
      // 救助类型
      kxsjz: ["儿童救助", "临时救助家庭", "特困人员供养", "支出性困难家庭", "单人保家庭", "低保边缘家庭", "最低生活保障-按人保", "最低生活保障-按户保", "最低生活保障-按人保-重病单人保", "最低生活保障-按人保-重残单人保"],
      jsjg: [],
      jsjgString: "", //计算结果
      jsjgshow1: false, //计算结果展示1
      jsjgshow2: true, //计算结果展示2

      test: {
        xzqhArray: []
      },
      xzqhArray: [],  // 区划
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
            data: { pId: pId },
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
      waringField: {
        aw_dat1: "预警时间",
        aw_ex1: "预警内容",
      },
      familyField: {
        abm_ex3: "姓名",
        abm_ex1: "与户主关系",
        abm_ex2: "身份证号码",
        abm_ex5: "性别",
        abm_ex16: "民族",
        abm_ex7: "户口性质",
        abm_ex28: "婚姻状况",
        abm_ex51: "特定对象",
        abm_ex11: "健康状况",
        abm_ex52: "重病病种",
        abm_ex39: "残疾种类",
        abm_ex40: "残疾等级",
        abm_ex49: "劳动能力",
        abm_ex14: "职业状况",
        abm_ex15: "工作单位",
        abm_ex17: "月收入",
        abm_ex68: "金民工程人员ID",
        abm_ex69: '个人基础救助金',
        abm_ex70: '个人分类救助金',
        abm_ex71: '总个人救助金',
        abm_ex72: '兴化儿童标记',
        // abm_ex8:"增发类型",
        // abm_ex42:"是否保障对象",
      },
      family2Field: {
        abm_ex3: "姓名",
        abm_ex1: "赡(扶、抚)养关系",
        abm_ex2: "身份证号码",
        abm_ex5: "性别",
        abm_ex28: "婚姻状况",
        abm_ex11: "健康状况",
        abm_ex47: "残疾状况",
        abm_ex49: "劳动能力",
        abm_ex14: "职业状况",
        abm_ex15: "工作单位",
        abm_ex21: "家庭主要财产状况(房、车、金融资产)",
        abm_ex20: "家庭总人口",
        abm_ex17: "月收入",
        abm_ex18: "月赡抚扶养费"
      },
      family3Field: {
        abm_ex3: "姓名",
        abm_ex1: "赡(扶、抚)养关系",
        abm_ex2: "身份证号码",
      },
      family4Field: {
        abm_ex3: "姓名",
        abm_ex1: "近亲属关系",
        abm_ex15: "任职机构和职位",
      },
      incomeField: {
        abi_ex1: "计入收入名称",
        abi_ex2: "金额",
      },
      income1Field: {
        abi_ex1: "",
        abi_ex2: "",
        abi_ex3: "工资性收入",
        abi_ex4: "A",
        abi_ex5: ""
      },
      income2Field: {
        abi_ex1: "经营净收入",
        abi_ex2: "",
        abi_ex3: "经营净收入",
        abi_ex4: "B",
        abi_ex5: ""
      },
      income3Field: {
        abi_ex1: "",
        abi_ex2: "",
        abi_ex3: "财产净收入",
        abi_ex4: "C",
        abi_ex5: ""
      },
      income4Field: {
        abi_ex1: "",
        abi_ex2: "",
        abi_ex3: "转移净收入",
        abi_ex4: "D",
        abi_ex5: ""
      },
      income5Field: {
        abi_ex1: "其他收入",
        abi_ex2: "",
        abi_ex3: "其他收入",
        abi_ex4: "E",
        abi_ex5: ""
      },
      income6Field: {
        abi_ex1: "必要就业成本抵扣",
        abi_ex2: "",
        abi_ex3: "必要就业成本抵扣",
        abi_ex4: "F",
        abi_ex5: ""
      },
      income7Field: {
        abi_ex1: "总收入",
        abi_ex2: "",
        abi_ex3: "总收入",
        abi_ex4: "G",
        abi_ex5: ""
      },
      payField: {
        abp_ex4: "医疗支出",
        abp_ex5: '教育支出',
        abp_ex6: '残疾康复费用支出',
        abp_ex7: '其他支出',
        abp_ex8: '家庭总支出',
        abp_ex9: '扣减刚性支出后家庭年收入',
        abp_ex10: '扣减刚性支出后人均年收入',
        abp_ex11: '因灾、因意外事故费用支出',
      },
      estate1Field: {
        abe_ex1: "车(船)主",
        abe_ex2: "购买时间",
        abe_ex3: "用途",
        abe_ex4: "车(船)价值",
        abe_ex8: "车(船)型",
      },
      estate2Field: {
        abe_ex1: "产权人/共有人",
        abe_ex2: "建房(购买)时间",
        abe_ex5: "房屋地址",
        abe_ex6: "面积",
        abe_ex4: "购置价/建造价",
        abe_ex11: "房屋性质",
      },
      // 户主关系，
      relation: ["户主", "配偶", "子/婿", "女/媳", "(外)孙子女", "父母/岳父母/公婆", "(外)祖父母", "兄弟姐妹", "其他"],
      dibaoForm: {},
      common: [],
      uploadImg: {
        ab_ex10_img: [],
        ab_ex16_img: [],
        ab_ex73_img: [],
        ab_ex74_img: [],
        ab_ex97_img: [],
        ab_ex98_img: [],
        ab_ex166_img: [],//房屋整体图片
        ab_ex167_img: [],//房屋室内图片
        ab_ex177_img: [],//纸质授权书
        ab_ex196_img: [],//自理能力状况评估报告
        ab_ex197_img: [],//集中供养意愿书
        aba_ex4_img: [], //代理人身份证
        aba_ex5_img: [], //代理委托书
      },
      imgNum: {},//图片数量
      uploadId: '',
      imgIndex: { //图片索引
        ab_ex10: 0,
        ab_ex16: 0,
        ab_ex73: 0,
        ab_ex74: 0,
        ab_ex97: 0,
        ab_ex98: 0,
        ab_ex166: 0,
        ab_ex167: 0,
        ab_ex177: 0,
        ab_ex196: 0,
        ab_ex197: 0,
        aba_ex4: 0,
        aba_ex5: 0,

      },
      supportinstList: [],//供养机构列表
      agentInfo: { //代理人信息
        "aba_ex1": "",
        "aba_ex2": "",
        "aba_ex3": "",
        "aba_ex4": "",
        "aba_ex5": "",
      },
      "landInfo": [],
      rules: {
        ab_ex3: [{
          required: true,
          message: '申请人姓名不能为空',
          trigger: 'blur'
        }],
        ab_ex7: [{
          required: true,
          message: '申请人身份证不能为空',
          trigger: 'blur'
        }],
        ab_ex162: [{
          required: true,
          message: '行政区划不能为空',
          trigger: 'blur'
        }],

        ab_ex4: [{
          required: true,
          message: '户籍地址不能为空',
          trigger: 'blur'
        }],
        ab_ex11: [{
          required: true,
          message: '家庭住址不能为空',
          trigger: 'blur'
        }],
        ab_ex5: [{
          required: true,
          message: '家庭人口不能为空',
          trigger: 'blur'
        }],
        ab_ex28: [{
          required: true,
          message: '联系电话不能为空',
          trigger: 'blur'
        }],
        ab_ex6: [{
          required: true,
          message: '户籍性质不能为空',
          trigger: 'blur'
        }],
        ab_ex46: [{
          required: true,
          message: '求助原因不能为空',
          trigger: 'blur'
        }],
        ab_ex92: [{
          required: true,
          message: '是否属于村干部或经办人员近亲属不能为空',
          trigger: 'blur'
        }],

        ab_ex42: [{
          required: true,
          message: '一卡通开户银行不能为空',
          trigger: 'blur'
        }],
        ab_ex8: [{
          required: true,
          message: '开户人不能为空',
          trigger: 'blur'
        }],
        ab_ex43: [{
          required: true,
          message: '一卡通银行账号不能为空',
          trigger: 'blur'
        }],
        ab_ex10: [{
          required: true,
          message: '身份证照片不能为空',
          trigger: 'blur'
        }],

      },

      income1: [{
        abi_ex1: "",
        abi_ex2: "",
        abi_ex3: "工资性收入",
        abi_ex4: "A",
        abi_ex5: ""
      }],

      checkedIncome1: [],
      income2: [{
        abi_ex1: "经营净收入",
        abi_ex2: "",
        abi_ex3: "经营净收入",
        abi_ex4: "B",
        abi_ex5: ""
      }],
      checkedIncome2: [],
      income3: [{
        abi_ex1: "",
        abi_ex2: "",
        abi_ex3: "财产净收入",
        abi_ex4: "C",
        abi_ex5: ""
      },],
      checkedIncome3: [],

      income4: [{
        abi_ex1: "",
        abi_ex2: "",
        abi_ex3: "转移净收入",
        abi_ex4: "D",
        abi_ex5: ""
      },],
      checkedIncome4: [],
      income5: [{
        abi_ex1: "其他收入",
        abi_ex2: "",
        abi_ex3: "其他收入",
        abi_ex4: "E",
        abi_ex5: ""
      },],
      income6: [{
        abi_ex1: "必要就业成本抵扣",
        abi_ex2: "",
        abi_ex3: "必要就业成本抵扣",
        abi_ex4: "F",
        abi_ex5: ""
      },],
      income7: [{
        abi_ex1: "总收入",
        abi_ex2: "",
        abi_ex3: "总收入",
        abi_ex4: "G",
        abi_ex5: ""
      }, {
        abi_ex1: "家庭月平均收入",
        abi_ex2: "",
        abi_ex3: "总收入",
        abi_ex4: "G",
        abi_ex5: ""
      }, {
        abi_ex1: "家庭月人均收入",
        abi_ex2: "",
        abi_ex3: "总收入",
        abi_ex4: "G",
        abi_ex5: ""
      }],

      // 变更数据
      changeM: {
        ac_ex10: '',
        ac_dat1: new Date(),
        // ac_ex10_2: ''
      },
      warningData: [
        // {
        // 	aw_dat1:"",
        // 	aw_ex1:"",
        // },
        // {
        // 	aw_dat1:"",
        // 	aw_ex1:"",
        // },
        // {
        // 	aw_dat1:"",
        // 	aw_ex1:"",
        // },
      ],
      checkedWarningData: [],
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
      familyData: [], //做身份证重复验证用的
      familyData1: [],
      checkedFamilyData1: [],
      familyData2: [],
      checkedFamilyData2: [],
      familyData3: [], //非家庭成员
      checkedFamilyData3: [],
      familyData4: [], //近亲属
      checkedFamilyData4: [],
      estate1: [],
      checkedEstate1: [],
      estate2: [],
      checkedEstate2: [],
      help_reason_list: ['缺乏劳动力', '无生活来源', '疾病', '残疾', '教育', '住房', '受灾', '其他'],
      ab_ex46: [], //求助原因
      // ab_ex94_:'',
      nation: ['汉族', '壮族', '满族', '回族', '苗族', '维吾尔族', '彝族', '土家族', '蒙古族', '藏族', '布依族', '侗族', '瑶族', '朝鲜族', '白族',
        '哈尼族', '哈萨克族', '黎族', '傣族', '畲族', '傈僳族', '仡佬族',
        '拉祜族', '高山族', '东乡族', '佤族', '水族', '纳西族', '羌族', '土族', '锡伯族', '仫佬族', '柯尔克孜族', '达斡尔族', '景颇族', '撒拉族',
        '布朗族', '毛难族', '塔吉克族', '普米族', '阿昌族', '怒族',
        '鄂温克族', '京族', '基诺族', '德昂族', '乌孜别克族', '俄罗斯族', '保安族', '裕固族', '门巴族', '鄂伦春族', '独龙族', '塔塔尔族', '赫哲族',
        '珞巴族', '其他', '外国血统中国籍人士'
      ],
      dialogImageUrl: '',
      dialogImageArray: [],
      dialogVisible: false, //核减列表显示
      dialogVisible2: false, //明细表显示
      dialogVisible3: false, //图片上传组件
      dialogVisible4: false, //政策计算器
      jkShow1: true,
      jkShow2: true,
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
      isShow17: true,
      isShow18: true,
      isShow21: true,
      isShow22: true,
      dibaoFormOld: [],
      familyData1Old: [],
      familyData2Old: [],
      familyData3Old: [],
      familyData4Old: [],
      estate1Old: [],
      estate2Old: [],
      warningDataOld: [],
      incomeOld: [],
      payOld: [],
      payOld2: [],
      income1Old: [],
      income2Old: [],
      income3Old: [],
      income4Old: [],
      income5Old: [],
      income6Old: [],
      income7Old: [],
      visible: false,
      leaveSave: false, //离开页面的弹窗
      isSaves: false,   //控制保存按钮禁用
      isTest: false,    //保存时控制数据验证
      tkStandard: '',   //特困救助标准
      dbStandard: '',   //低保救助标准
      zcStandard: '',	//人均可支配常数
      incomeConstant: '', // 月均可支配收入常数
      ab_ex200: '',     //输入的生活费

      // 变更后资金明细
      detailMoney: [],
      // 总发放金额
      ab_ex40: '',
      setType: '',  //  现在 政策计算器提示内容
      assistanceType: '',//原来 政策计算器提示内容
      ab_ex13: '',  //选择的类型

      jstext: '', //变更保障金结果提示
      datas: [],  //变更报告
      moneybtn: false, //false 明细没有确定按钮 ture 有明细按钮
      childrenWarning: [], //儿童预警
      showChildren: false, //兴化儿童预警显示
      old_abm_ex71: [],//老的儿童救助金
      disabled: false,  //保存禁用
      specialAccount: false, //是否为特殊账号 true 是，false 否

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

  //未保存离开页面的提示 
  beforeRouteLeave (to, from, next) {
    if (this.leaveSave) {
      next();
    } else {
      const answer = window.confirm('当前数据未核查完成，是否确定要离开？')
      if (answer) {
        next();
      } else {
        next(false);
      }
    }
  },

  watch: {
    xzqhArray (newA, oldA) {
      // console.log(newA);
      if (newA.length > 0) {
        let qu = newA[0].split("#")[0]
        let cun = newA[1].split("#")[0]
        let zhen = newA[2].split("#")[0]
        // let i =qu+"#"+cun+"#"+zhen
        this.dibaoForm.ab_ex162 = newA[0] + "," + newA[1] + "," + newA[2]
        this.dibaoForm.ab_ex161 = qu
        this.dibaoForm.ab_ex1 = zhen
        this.dibaoForm.ab_ex2 = cun
        console.log(qu, zhen, cun, '区划监听');
      }
      // console.log(i)
    }
  },

  created () {
    this.loadData();
    // this.getStandard();
  },

  methods: {

    // 儿童预警显示--7.1调标后废弃
    changeChildren () {
      // console.log(this.xzqhArray[0]);
      // 区划有值是判断市区名称
      if (this.xzqhArray[0] != undefined) {

        var shiqu = this.xzqhArray[0].split('#')[0];

        var childrenNum = 0; 			//检测未成年人数量
        console.log(shiqu, '市区');

        for (let i in this.familyData1) {
          if (this.familyData1[i].abm_ex51 == '未成年人') {
            childrenNum++;
          }
        }

        if (shiqu.indexOf("兴化") != -1) {
          // 兴化市 低保 或 结果为低保的显示 儿童预警表
          if ((this.income7[2].abi_ex2 < this.dbStandard || this.dibaoForm.ab_ex41 == '低收入型低保') && childrenNum > 0) {

            this.showChildren = true;
          } else {
            this.showChildren = false;
          }
        } else {
          this.showChildren = false;
        }
      }
    },

    // // 兴化儿童救助金修改--7.1调标后废弃
    // changeChildrenMoney(abm_ex3){
    // 	console.log('old_abm_ex71',this.old_abm_ex71);
    // 	console.log('abm_ex3',abm_ex3);

    // 	 this.$confirm('是否要修改未成年人救助金额','提示',{
    // 		confirmButtonText: '确定',
    // 		cancelButtonText: '取消',
    // 	}).then( res =>{

    // 		// 重新计算一次明细
    // 		var sum = 0;
    // 		console.log(abm_ex3 ,'兴化儿童救助金修改');
    // 		console.log(this.childrenWarning ,'兴化儿童表');

    // 		// 根据明细表 给儿童加一个标记
    // 		for(let i in this.familyData1){
    // 			for(let j in this.childrenWarning){
    // 				if(this.familyData1[i].abm_ex3 == this.childrenWarning[j].abm_ex3){
    // 					// 儿童预警改的是 childrenWarning ，所以改的时候要给 成员表69/70/71 重新赋值，明细表重新赋值
    // 					// this.detailTable[i].abd_ex9 = this.childrenWarning[j].abm_ex71;
    // 					this.familyData1[i].abm_ex71 = this.childrenWarning[j].abm_ex71;
    // 					this.familyData1[i].abm_ex69 = this.childrenWarning[j].abm_ex71;
    // 					this.childrenWarning[j].abm_ex70 = '0.00';

    // 					this.old_abm_ex71[j] = this.childrenWarning[j].abm_ex71;
    // 					this.familyData1[i].abm_ex72 = 'Y';
    // 					this.childrenWarning[j].abm_ex72 = 'Y';
    // 				}
    // 			}
    // 			// sum += (this.detailTable[i].abd_ex9 * 1);
    // 		}
    // 		console.log(this.childrenWarning);
    // 		// this.dibaoForm.ab_ex40 = sum.toFixed(2);

    // 	}).catch(res =>{
    // 		for(let j in this.childrenWarning){
    // 			if(this.childrenWarning[j].abm_ex3 == abm_ex3){
    // 				this.childrenWarning[j].abm_ex71 = this.old_abm_ex71[j];
    // 			}
    // 		}
    // 	})
    // },


    isBack (index) {// 渐退期

      // 小数验证
      var float_num = this.familyData1[index].abm_ex71 % 1;



      if (this.familyData1[index].abm_ex71 < 0) {
        this.$message.warning(this.familyData1[index].abm_ex3 + '渐退期金额不能为负数！')
        return false;
      }
      if (float_num > 0) {
        this.$message.warning(this.familyData1[index].abm_ex3 + '渐退期金额请填报整数！')
        return false;
      }

      for (let i in this.familyData1) {

        this.familyData1[i].abm_ex69 = this.familyData1[i].abm_ex71;
        this.familyData1[i].abm_ex70 = 0;
      }
      // this.computeMoney();

      // console.log(float_num,'小数点后面的数');
      // console.log('家庭保障金=》',this.dibaoForm.ab_ex40);
      console.log('是否渐退=》', this.dibaoForm.ab_ex207);
      // console.log('人均月=>',this.income7[2].abi_ex2);
      // console.log(this.familyData1[index].abm_ex71,'进退期的值');
    },

    // // 特困类型修改
    // // 特困转低保类型选择
    changeType () {
      // console.log(this.ab_ex13);
      return this.ab_ex13;
    },

    // 救助金按钮
    getDatailMoney (showBtn) {
      // 渐退期金额计算
      if (this.dibaoForm.ab_ex207 == '是') {
        for (let i in this.familyData1) {
          var float_num = this.familyData1[i].abm_ex71 % 1;
          if (this.familyData1[i].abm_ex71 < 0) {
            this.$message.warning(this.familyData1[i].abm_ex3 + '渐退期金额不能为负数！')
            return false;
          }
          if (float_num > 0) {
            this.$message.warning(this.familyData1[i].abm_ex3 + '渐退期金额请填报整数！')
            return false;
          }
        }
      }
      if (showBtn == 'see') {
        this.moneybtn = false;			 //隐藏明细表弹框的保存按钮
      }
      this.dialogVisible2 = true; 	 //明细表显示
      this.computeMoney(this.dibaoForm);
    },


    // 低保渐退期
    JianTuiMoney (data, familyData) {

      this.detailMoney = []; 						// 保障金明细
      var detailObj = {};     					// 个人保障金


      for (let i in familyData) {
        this.familyData1[i].abm_ex70 = "0.0";
        this.familyData1[i].abm_ex69 = Math.ceil(this.familyData1[i].abm_ex71 * 1);

        detailObj.abd_ex1 = familyData[i].abm_ex3;  //姓名
        detailObj.abd_ex2 = familyData[i].abm_ex1;	//家庭关系
        detailObj.abd_ex3 = this.dbStandard;		// 低保标准

        detailObj.abd_ex10 = "低保 / 渐退期";		//救助类型
        detailObj.abd_ex9 = Math.ceil(familyData[i].abm_ex71 * 1);

        this.detailMoney.push(detailObj);
        detailObj = {};
      }

    },

    // 低保非渐退期
    DiBaoMoney (data, familyData) {

      var abi_ex2 = this.income7[2].abi_ex2;		// 平均数
      this.detailMoney = []; 						// 保障金明细
      var detailObj = {};     					// 个人保障金
      var isSpecial = '';							//救助类型

      console.log(122, familyData);
      for (let i in familyData) {

        detailObj.abd_ex1 = familyData[i].abm_ex3;
        detailObj.abd_ex2 = familyData[i].abm_ex1;
        detailObj.abd_ex3 = this.dbStandard;		// 低保标准
        detailObj.abd_ex10 = '低保';

        if (this.dibaoForm.ab_ex41.indexOf('单列户') != -1) {
          console.log('单列户');
          if (this.familyData1[i].abm_ex11 == '残疾') {
            isSpecial = ' / 残疾人单列户';
            detailObj.abd_ex10 = detailObj.abd_ex10 + isSpecial;
            if (['二级残疾', '二级', '一级残疾', '一级'].includes(this.familyData1[i].abm_ex40)) {

              this.familyData1[i].abm_ex69 = Math.ceil(this.dbStandard * 0.65);
              this.familyData1[i].abm_ex70 = '0.0';
              detailObj.abd_ex9 = Math.ceil(this.familyData1[i].abm_ex69 * 1 + this.familyData1[i].abm_ex70 * 1);
              this.familyData1[i].abm_ex71 = Math.ceil(this.familyData1[i].abm_ex69 * 1 + this.familyData1[i].abm_ex70 * 1);


            } else if (this.familyData1[i].abm_ex40.indexOf('三级') != -1 && ['精神残疾', '智力残疾', '精神', '智力'].includes(this.familyData1[i].abm_ex39)) {

              this.familyData1[i].abm_ex69 = Math.ceil(this.dbStandard * 0.75);
              this.familyData1[i].abm_ex70 = '0.0';
              detailObj.abd_ex9 = Math.ceil(this.familyData1[i].abm_ex69 * 1 + this.familyData1[i].abm_ex70 * 1);
              this.familyData1[i].abm_ex71 = Math.ceil(this.familyData1[i].abm_ex69 * 1 + this.familyData1[i].abm_ex70 * 1);

            } else {
              // 变更后不符合单列户救助了
              this.familyData1[i].abm_ex69 = '0.0';
              this.familyData1[i].abm_ex70 = '0.0';
              detailObj.abd_ex9 = Math.ceil(this.familyData1[i].abm_ex69 * 1 + this.familyData1[i].abm_ex70 * 1);
              this.familyData1[i].abm_ex71 = Math.ceil(this.familyData1[i].abm_ex69 * 1 + this.familyData1[i].abm_ex70 * 1);

            }
          }
          else if (this.familyData1[i].abm_ex11 == '重病') {
            isSpecial = ' / 重病型单列户';
            detailObj.abd_ex10 = detailObj.abd_ex10 + isSpecial;
            this.familyData1[i].abm_ex69 = Math.ceil(this.dbStandard * 1);
            this.familyData1[i].abm_ex70 = '0.0';
            detailObj.abd_ex9 = Math.ceil(this.familyData1[i].abm_ex69 * 1 + this.familyData1[i].abm_ex70 * 1);
            this.familyData1[i].abm_ex71 = detailObj.abd_ex9;
          } else {
            detailObj.abd_ex10 = '非单列户';
            this.familyData1[i].abm_ex69 = '0.0';
            this.familyData1[i].abm_ex70 = '0.0';
            detailObj.abd_ex9 = Math.ceil(this.familyData1[i].abm_ex69 * 1 + this.familyData1[i].abm_ex70 * 1);
            this.familyData1[i].abm_ex71 = detailObj.abd_ex9;
          }
        }

        else if (abi_ex2 * 1 < this.dbStandard * 1) {
          console.log('dibao');
          if (familyData[i].abm_ex11 == '残疾') {
            console.log('残疾');
            // 重残 1倍
            if (['二级残疾', '二级', '一级残疾', '一级'].includes(familyData[i].abm_ex40)) {
              console.log('DiBaoMoney方法调用');

              // 如果特定对象补助 大于 残疾补助，用特定对象补助，否则用残疾补助
              if (['退役军人', '归侨', '独居', '老年人', '未成年人'].includes(familyData[i].abm_ex51)) {
                isSpecial = '/ 残疾 /' + familyData[i].abm_ex51;
                if (abi_ex2 < 0.1 * this.dbStandard) {

                  familyData[i].abm_ex69 = Math.ceil(this.dbStandard * 1 - this.income7[2].abi_ex2);
                  familyData[i].abm_ex70 = (this.dbStandard * 0.1).toFixed(2);
                  detailObj.abd_ex9 = Math.ceil(familyData[i].abm_ex69 * 1 + familyData[i].abm_ex70 * 1);
                  familyData[i].abm_ex71 = detailObj.abd_ex9;
                } else {
                  familyData[i].abm_ex69 = Math.ceil(this.dbStandard * 1);
                  familyData[i].abm_ex70 = '0.0';
                  detailObj.abd_ex9 = Math.ceil(familyData[i].abm_ex69 * 1 + familyData[i].abm_ex70 * 1);
                  familyData[i].abm_ex71 = Math.ceil(familyData[i].abm_ex69 * 1 + familyData[i].abm_ex70 * 1);
                }
                console.log('DiBaoMoney方法调用1');
                detailObj.abd_ex10 = detailObj.abd_ex10 + isSpecial;

              } else {
                console.log('DiBaoMoney方法调用2');
                isSpecial = '/ 残疾';
                detailObj.abd_ex10 = detailObj.abd_ex10 + isSpecial;
                familyData[i].abm_ex69 = Math.ceil(this.dbStandard * 1);
                familyData[i].abm_ex70 = '0.0';
                detailObj.abd_ex9 = Math.ceil(familyData[i].abm_ex69 * 1 + familyData[i].abm_ex70 * 1);
                familyData[i].abm_ex71 = Math.ceil(familyData[i].abm_ex69 * 1 + familyData[i].abm_ex70 * 1);
              }

            } else {
              // 残疾 非重残 -- 特定对象 1.1-人均
              if (['退役军人', '归侨', '独居', '老年人', '未成年人'].includes(familyData[i].abm_ex51)) {
                isSpecial = ' / ' + familyData[i].abm_ex51;
                detailObj.abd_ex10 = detailObj.abd_ex10 + isSpecial;

                familyData[i].abm_ex69 = Math.ceil(this.dbStandard * 1 - this.income7[2].abi_ex2);
                familyData[i].abm_ex70 = (this.dbStandard * 0.1).toFixed(2);
                detailObj.abd_ex9 = Math.ceil(familyData[i].abm_ex69 * 1 + familyData[i].abm_ex70 * 1);
                familyData[i].abm_ex71 = detailObj.abd_ex9;

              } else {
                // 非重残 -- 普通对象 1-人均
                detailObj.abd_ex9 = Math.ceil(this.dbStandard * 1 - abi_ex2 * 1);
                familyData[i].abm_ex69 = Math.ceil(this.dbStandard * 1 - abi_ex2 * 1);
                familyData[i].abm_ex70 = '0.0';
                familyData[i].abm_ex71 = detailObj.abd_ex9;
              }
            }

            // this.detailMoney.push(detailObj);
            // detailObj = {};

          } else if (familyData[i].abm_ex11 == '重病') {
            // 重病 1.2
            console.log('重病');

            isSpecial = ' / 重病';
            detailObj.abd_ex10 = detailObj.abd_ex10 + isSpecial;
            // this.familyData1[i].abm_ex69 = (this.dbStandard * 1).toFixed(2);
            // detailObj.abd_ex9 = (this.dbStandard * 1.2).toFixed(2);
            familyData[i].abm_ex69 = Math.ceil(this.dbStandard * 1);
            familyData[i].abm_ex70 = (this.dbStandard * 0.2).toFixed(1);
            detailObj.abd_ex9 = Math.ceil(familyData[i].abm_ex69 * 1 + familyData[i].abm_ex70 * 1);
            familyData[i].abm_ex71 = detailObj.abd_ex9;
          } else {
            console.log('低保健康');
            // 健康 
            if (['退役军人', '归侨', '独居', '老年人', '未成年人'].includes(familyData[i].abm_ex51)) {
              // 特定对象 1.1-人均
              console.log('健康特定对象');
              isSpecial = ' / ' + familyData[i].abm_ex51;
              detailObj.abd_ex10 = detailObj.abd_ex10 + isSpecial;


              // 向上取整
              familyData[i].abm_ex69 = Math.ceil(this.dbStandard * 1 - abi_ex2 * 1);
              familyData[i].abm_ex70 = (this.dbStandard * 0.1).toFixed(1);
              detailObj.abd_ex9 = Math.ceil(familyData[i].abm_ex69 * 1 + familyData[i].abm_ex70 * 1);
              familyData[i].abm_ex71 = Math.ceil(familyData[i].abm_ex69 * 1 + familyData[i].abm_ex70 * 1);
              // }
            } else {
              // 健康 --非特定对象 1-人均
              familyData[i].abm_ex69 = Math.ceil(this.dbStandard * 1 - abi_ex2 * 1);
              familyData[i].abm_ex70 = '0.0';
              detailObj.abd_ex9 = Math.ceil(familyData[i].abm_ex69 * 1 + familyData[i].abm_ex70 * 1);
              familyData[i].abm_ex71 = Math.ceil(familyData[i].abm_ex69 * 1 + familyData[i].abm_ex70 * 1);
            }
          }

        } else {//低保 人均月收入大于低保标准，且不是渐退期 救助金相关数据归零
          detailObj.abd_ex3 = "0.0";
          detailObj.abd_ex9 = "0.0";
          detailObj.abd_ex10 = "其他";
          familyData[i].abm_ex69 = '0.0';
          familyData[i].abm_ex70 = "0.0";
          familyData[i].abm_ex71 = '0.0';
          console.log('人均月收入大于低保标准');
        }

        // 插入明细表
        this.detailMoney.push(detailObj);
        detailObj = {};

      }
    },

    // 特困
    teKunMoney (data, familyData) {
      var abi_ex2 = this.income7[2].abi_ex2;		// 平均数
      this.detailMoney = []; 						// 保障金明细
      var detailObj = {};     					// 个人保障金
      var isSpecial = '';							//救助类型


      console.log(1234);
      for (let i in familyData) {

        detailObj.abd_ex1 = familyData[i].abm_ex3;
        detailObj.abd_ex2 = familyData[i].abm_ex1;
        detailObj.abd_ex3 = this.tkStandard;		// 低保标准
        detailObj.abd_ex10 = '特困';

        // console.log(123456789);
        // if(abi_ex2 * 1 < this.dbStandard*1){
        // if(){

        // 	}

        familyData[i].abm_ex69 = data.ab_ex200 != '' ? data.ab_ex200 : this.tkStandard;
        familyData[i].abm_ex70 = data.ab_ex199 != '' ? data.ab_ex199 : 0;

        detailObj.abd_ex5 = data.ab_ex200;
        detailObj.abd_ex6 = data.ab_ex199;

        // familyData[i].abm_ex70 = data.ab_ex199;
        familyData[i].abm_ex71 = Math.ceil(familyData[i].abm_ex69 * 1 + familyData[i].abm_ex70 * 1);
        detailObj.abd_ex9 = Math.ceil(familyData[i].abm_ex69 * 1 + familyData[i].abm_ex70 * 1);
        // }else{

        // }

        this.detailMoney.push(detailObj);
        console.log(detailObj);
        detailObj = {};
      }


    },


    // 获取 计算保障金发放明细
    computeMoney (data) {

      this.changeJS();                            // 计算符合的救助类型
      this.detailMoney = []; 						// 保障金明细
      var detailObj = {};     					// 个人保障金
      var ab_ex207 = this.dibaoForm.ab_ex207; 	// 渐退期
      var abi_ex2 = this.income7[2].abi_ex2;		// 平均数

      // console.log(data , '救助金按钮');
      // console.log(this.dibaoForm.ab_ex207=='是' , '渐退期');
      // console.log(this.dbStandard , '低保标准');
      // console.log(this.ab_ex13 , '单人单户救助选择');
      // console.log(this.jsjgString , '救助类型');
      // console.log('人均月收入' , this.income7[2].abi_ex2);
      // console.log('明细表保存按钮' , this.moneybtn);

      // 如果是明细表按钮
      if (!this.moneybtn) {
        if (data.ab_ex13 == '低保') {
          if (data.ab_ex207 == '是') {
            this.JianTuiMoney(this.dibaoForm, this.familyData1);                            // 计算符合的救助类型

          } else {
            this.DiBaoMoney(this.dibaoForm, this.familyData1)
          }

        } else if (data.ab_ex13 == '特困供养') {
          this.teKunMoney(this.dibaoForm, this.familyData1);
        }

      } else {


        for (let i in this.familyData1) {
          detailObj.abd_ex1 = this.familyData1[i].abm_ex3;
          detailObj.abd_ex2 = this.familyData1[i].abm_ex1;

          if (this.dibaoForm.ab_ex13 == '低保' || this.jsjgString == '最低生活保障-按户保' || this.ab_ex13 == '低保') {

            console.log('低保===', this.ab_ex13, this.moneybtn);
            var isSpecial = '';							// 特定对象
            detailObj.abd_ex3 = this.dbStandard;		// 低保标准
            detailObj.abd_ex10 = '低保';				// 低保

            if (this.ab_ex13 == '特困供养' && this.moneybtn == true && ab_ex207 != '是') {     // 低保 --> 特困 处于保存阶段（明细表保存按钮显示）
              console.log('非渐退期1', ab_ex207);
              detailObj.abd_ex3 = this.tkStandard;		// 低保标准
              detailObj.abd_ex10 = '特困供养';
              detailObj.abd_ex9 = "0.0";

              // this.familyData1[i].abm_ex69 = (this.tkStandard * 1).toFixed(2);
              this.familyData1[i].abm_ex69 = this.tkStandard * 1;
              this.familyData1[i].abm_ex70 = '0.0';
              this.familyData1[i].abm_ex71 = Math.ceil(this.familyData1[i].abm_ex69 * 1 + this.familyData1[i].abm_ex70 * 1);

            } else if (['否', ''].includes(ab_ex207)) { 	// 渐退期检测 不是低保渐退期，计算救助金明细
              console.log('非渐退期2', ab_ex207);
              console.log('非渐退期-人均月-低保标准', abi_ex2, this.dbStandard);
              // 单列户计算
              console.log('单列户', this.dibaoForm.ab_ex41.indexOf('单列户') != -1);
              if (this.dibaoForm.ab_ex41.indexOf('单列户') != -1) {

                if (this.familyData1[i].abm_ex11 == '残疾') {
                  isSpecial = ' / 残疾人单列户';
                  detailObj.abd_ex10 = detailObj.abd_ex10 + isSpecial;
                  if (['二级残疾', '二级', '一级残疾', '一级'].includes(this.familyData1[i].abm_ex40)) {

                    this.familyData1[i].abm_ex69 = Math.ceil(this.dbStandard * 0.65);
                    this.familyData1[i].abm_ex70 = '0.0';
                    detailObj.abd_ex9 = Math.ceil(this.familyData1[i].abm_ex69 * 1 + this.familyData1[i].abm_ex70 * 1);
                    this.familyData1[i].abm_ex71 = Math.ceil(this.familyData1[i].abm_ex69 * 1 + this.familyData1[i].abm_ex70 * 1);


                  } else if (this.familyData1[i].abm_ex40.indexOf('三级') != -1 && ['精神残疾', '智力残疾', '精神', '智力'].includes(this.familyData1[i].abm_ex39)) {

                    this.familyData1[i].abm_ex69 = Math.ceil(this.dbStandard * 0.75);
                    this.familyData1[i].abm_ex70 = '0.0';
                    detailObj.abd_ex9 = Math.ceil(this.familyData1[i].abm_ex69 * 1 + this.familyData1[i].abm_ex70 * 1);
                    this.familyData1[i].abm_ex71 = Math.ceil(this.familyData1[i].abm_ex69 * 1 + this.familyData1[i].abm_ex70 * 1);

                  } else {
                    // 变更后不符合单列户救助了
                    this.familyData1[i].abm_ex69 = '0.0';
                    this.familyData1[i].abm_ex70 = '0.0';
                    detailObj.abd_ex9 = Math.ceil(this.familyData1[i].abm_ex69 * 1 + this.familyData1[i].abm_ex70 * 1);
                    this.familyData1[i].abm_ex71 = Math.ceil(this.familyData1[i].abm_ex69 * 1 + this.familyData1[i].abm_ex70 * 1);

                  }
                }
                else if (this.familyData1[i].abm_ex11 == '重病') {
                  isSpecial = ' / 重病型单列户';
                  detailObj.abd_ex10 = detailObj.abd_ex10 + isSpecial;
                  this.familyData1[i].abm_ex69 = Math.ceil(this.dbStandard * 1);
                  this.familyData1[i].abm_ex70 = '0.0';
                  detailObj.abd_ex9 = Math.ceil(this.familyData1[i].abm_ex69 * 1 + this.familyData1[i].abm_ex70 * 1);
                  this.familyData1[i].abm_ex71 = detailObj.abd_ex9;
                } else {
                  detailObj.abd_ex10 = '非单列户';
                  this.familyData1[i].abm_ex69 = '0.0';
                  this.familyData1[i].abm_ex70 = '0.0';
                  detailObj.abd_ex9 = Math.ceil(this.familyData1[i].abm_ex69 * 1 + this.familyData1[i].abm_ex70 * 1);
                  this.familyData1[i].abm_ex71 = detailObj.abd_ex9;
                }
              }

              else if (abi_ex2 * 1 < this.dbStandard * 1) {

                if (this.familyData1[i].abm_ex11 == '残疾') {
                  console.log('残疾');
                  // 重残 1倍
                  if (['二级残疾', '二级', '一级残疾', '一级'].includes(this.familyData1[i].abm_ex40)) {
                    console.log('DiBaoMoney方法调用');

                    // 如果特定对象补助 大于 残疾补助，用特定对象补助，否则用残疾补助
                    if (['退役军人', '归侨', '独居', '老年人', '未成年人'].includes(this.familyData1[i].abm_ex51)) {
                      isSpecial = '/ 残疾 /' + this.familyData1[i].abm_ex51;

                      if (abi_ex2 < 0.1 * this.dbStandard) {

                        this.familyData1[i].abm_ex69 = Math.ceil(this.dbStandard * 1 - this.income7[2].abi_ex2);
                        this.familyData1[i].abm_ex70 = (this.dbStandard * 0.1).toFixed(2);
                        detailObj.abd_ex9 = Math.ceil(this.familyData1[i].abm_ex69 * 1 + this.familyData1[i].abm_ex70 * 1);
                        this.familyData1[i].abm_ex71 = detailObj.abd_ex9;
                      } else {
                        this.familyData1[i].abm_ex69 = Math.ceil(this.dbStandard * 1);
                        this.familyData1[i].abm_ex70 = '0.0';
                        detailObj.abd_ex9 = Math.ceil(this.familyData1[i].abm_ex69 * 1 + this.familyData1[i].abm_ex70 * 1);
                        this.familyData1[i].abm_ex71 = Math.ceil(this.familyData1[i].abm_ex69 * 1 + this.familyData1[i].abm_ex70 * 1);
                      }
                      console.log('DiBaoMoney方法调用1');
                      detailObj.abd_ex10 = detailObj.abd_ex10 + isSpecial;

                    } else {
                      console.log('DiBaoMoney方法调用2');
                      isSpecial = '/ 残疾';
                      detailObj.abd_ex10 = detailObj.abd_ex10 + isSpecial;
                      this.familyData1[i].abm_ex69 = Math.ceil(this.dbStandard * 1);
                      this.familyData1[i].abm_ex70 = '0.0';
                      detailObj.abd_ex9 = Math.ceil(this.familyData1[i].abm_ex69 * 1 + this.familyData1[i].abm_ex70 * 1);
                      this.familyData1[i].abm_ex71 = Math.ceil(this.familyData1[i].abm_ex69 * 1 + this.familyData1[i].abm_ex70 * 1);
                    }

                  } else {
                    // 残疾 非重残 -- 特定对象 1.1-人均
                    if (['退役军人', '归侨', '独居', '老年人', '未成年人'].includes(this.familyData1[i].abm_ex51)) {
                      isSpecial = ' / ' + this.familyData1[i].abm_ex51;
                      detailObj.abd_ex10 = detailObj.abd_ex10 + isSpecial;

                      this.familyData1[i].abm_ex69 = Math.ceil(this.dbStandard * 1 - this.income7[2].abi_ex2);
                      this.familyData1[i].abm_ex70 = (this.dbStandard * 0.1).toFixed(2);
                      detailObj.abd_ex9 = Math.ceil(this.familyData1[i].abm_ex69 * 1 + this.familyData1[i].abm_ex70 * 1);
                      this.familyData1[i].abm_ex71 = detailObj.abd_ex9;

                    } else {
                      // 非重残 -- 普通对象 1-人均
                      detailObj.abd_ex9 = Math.ceil(this.dbStandard * 1 - abi_ex2 * 1);
                      this.familyData1[i].abm_ex69 = Math.ceil(this.dbStandard * 1 - abi_ex2 * 1);
                      this.familyData1[i].abm_ex70 = '0.0';
                      this.familyData1[i].abm_ex71 = detailObj.abd_ex9;
                    }
                  }

                  // this.detailMoney.push(detailObj);
                  // detailObj = {};

                }

                // if(this.familyData1[i].abm_ex11 == '残疾'){
                // 	// 重残 1倍
                // 	if(['二级残疾','二级','一级残疾','一级'].includes(this.familyData1[i].abm_ex40)){

                // 		isSpecial = '/ 残疾';
                // 		detailObj.abd_ex10 = detailObj.abd_ex10 + isSpecial;
                // 		// detailObj.abd_ex9 = Number(this.dbStandard).toFixed(2);
                // 		// this.familyData1[i].abm_ex69 = (this.dbStandard * 1).toFixed(2);
                // 		this.familyData1[i].abm_ex69 = Math.ceil(this.dbStandard * 1);
                // 		this.familyData1[i].abm_ex70 = '0.0';
                // 		detailObj.abd_ex9 = Math.ceil(this.familyData1[i].abm_ex69*1 + this.familyData1[i].abm_ex70*1);
                // 		this.familyData1[i].abm_ex71 = Math.ceil(this.familyData1[i].abm_ex69*1 + this.familyData1[i].abm_ex70*1);
                // 	}else{
                // 		// 残疾 非重残 -- 特定对象 1.1-人均
                // 		if(['退役军人','归侨','独居','老年人','未成年人'].includes(this.familyData1[i].abm_ex51)){
                // 			isSpecial = this.familyData1[i].abm_ex51 == '退役军人' ? isSpecial+'/ 退役军人' : isSpecial;
                // 			isSpecial = this.familyData1[i].abm_ex51 == '归侨' ? isSpecial+'/ 归侨' : isSpecial;
                // 			isSpecial = this.familyData1[i].abm_ex51 == '独居' ? isSpecial+'/ 独居' : isSpecial;
                // 			isSpecial = this.familyData1[i].abm_ex51 == '老年人' ? isSpecial+'/ 老年人' : isSpecial;
                // 			isSpecial = this.familyData1[i].abm_ex51 == '未成年人' ? isSpecial+'/ 未成年人' : isSpecial;
                // 			detailObj.abd_ex10 = detailObj.abd_ex10 + isSpecial;

                // 			// if(this.familyData1[i].abm_ex51 == '未成年人'){
                // 			// 	if(this.dibaoForm.ab_ex161=='兴化市'){
                // 			// 		// 兴化儿童取成员表71 -- 自己输入

                // 			// 		console.log('兴化儿童取成员表71 -- 自己输入');
                // 			// 		detailObj.abd_ex9 = Math.ceil(this.familyData1[i].abm_ex71 * 1);
                // 			// 		// detailObj.abd_ex9 = (this.familyData1[i].abm_ex71 * 1).toFixed(2);
                // 			// 		this.familyData1[i].abm_ex70 = '0.0';
                // 			// 		this.familyData1[i].abm_ex71 = detailObj.abd_ex9;
                // 			// 		this.familyData1[i].abm_ex72 = 'Y';
                // 			// 	}else{
                // 			// 		// 否则用低保标准计算  1.1-人均
                // 			// 		detailObj.abd_ex9 = Math.ceil(this.dbStandard * 1.1 - this.income7[2].abi_ex2);
                // 			// 		// detailObj.abd_ex9 = (this.dbStandard * 1.1 - this.income7[2].abi_ex2).toFixed(2);
                // 			// 		// this.familyData1[i].abm_ex69 = (this.dbStandard * 1 - this.income7[2].abi_ex2).toFixed(2);
                // 			// 		this.familyData1[i].abm_ex69 = Math.ceil(this.dbStandard * 1 - this.income7[2].abi_ex2);
                // 			// 		this.familyData1[i].abm_ex70 = (this.dbStandard * 0.1).toFixed(1);
                // 			// 		this.familyData1[i].abm_ex71 = detailObj.abd_ex9;
                // 			// 	}


                // 			// }else{
                // 				// 非未成年人 特定对象 小于低保标准
                // 				// 向上取整
                // 				// detailObj.abd_ex9 = (this.dbStandard * 1.1 - this.income7[2].abi_ex2).toFixed(2);
                // 				this.familyData1[i].abm_ex69 = Math.ceil(this.dbStandard * 1 - this.income7[2].abi_ex2);
                // 				// this.familyData1[i].abm_ex69 = (this.dbStandard * 1 - this.income7[2].abi_ex2).toFixed(2);
                // 				this.familyData1[i].abm_ex70 = (this.dbStandard * 0.1).toFixed(2);
                // 				detailObj.abd_ex9 = Math.ceil(this.familyData1[i].abm_ex69 * 1 + this.familyData1[i].abm_ex70 * 1);
                // 				this.familyData1[i].abm_ex71 = detailObj.abd_ex9;
                // 			// }


                // 		}else{
                // 			// 非重残 -- 普通对象 1-人均
                // 			// this.familyData1[i].abm_ex71 = (this.dbStandard * 1 - this.income7[2].abi_ex2).toFixed(2);
                // 			// detailObj.abd_ex9 = (this.dbStandard* 1 - abi_ex2).toFixed(2);
                // 			detailObj.abd_ex9 = Math.ceil(this.dbStandard * 1 - abi_ex2*1);
                // 			this.familyData1[i].abm_ex69 = Math.ceil(this.dbStandard * 1 - abi_ex2*1);
                // 			// this.familyData1[i].abm_ex69 = (this.dbStandard * 1 - this.income7[2].abi_ex2).toFixed(2);
                // 			this.familyData1[i].abm_ex70 = '0.0';
                // 			this.familyData1[i].abm_ex71 = detailObj.abd_ex9;
                // 		}
                // 	}
                // 	console.log('非渐退期--残疾',detailObj.abd_ex9);
                // }
                else if (this.familyData1[i].abm_ex11 == '重病') {
                  // 重病 1.2
                  if (['退役军人', '归侨', '独居', '老年人', '未成年人'].includes(this.familyData1[i].abm_ex51)) {
                    // 特定对象 1.1-人均
                    console.log('健康特定对象');
                    isSpecial = ' / 重病 / ' + this.familyData1[i].abm_ex51;
                  } else {

                    isSpecial = ' / 重病';
                  }
                  detailObj.abd_ex10 = detailObj.abd_ex10 + isSpecial;
                  // this.familyData1[i].abm_ex69 = (this.dbStandard * 1).toFixed(2);
                  // detailObj.abd_ex9 = (this.dbStandard * 1.2).toFixed(2);
                  this.familyData1[i].abm_ex69 = Math.ceil(this.dbStandard * 1);
                  this.familyData1[i].abm_ex70 = (this.dbStandard * 0.2).toFixed(1);
                  detailObj.abd_ex9 = Math.ceil(this.familyData1[i].abm_ex69 * 1 + this.familyData1[i].abm_ex70 * 1);
                  this.familyData1[i].abm_ex71 = detailObj.abd_ex9;
                } else {
                  // 健康 
                  if (['退役军人', '归侨', '独居', '老年人', '未成年人'].includes(this.familyData1[i].abm_ex51)) {
                    // 特定对象 1.1-人均
                    console.log('健康特定对象');
                    isSpecial = ' / ' + this.familyData1[i].abm_ex51;
                    detailObj.abd_ex10 = detailObj.abd_ex10 + isSpecial;

                    // if(this.familyData1[i].abm_ex51 == '未成年人'){
                    // 	// if(this.dibaoForm.ab_ex161=='兴化市'){
                    // 	// 	// 兴化儿童取成员表71 -- 自己输入

                    // 	// 	console.log('兴化儿童取成员表71 -- 自己输入');
                    // 	// 	// detailObj.abd_ex9 = (this.familyData1[i].abm_ex71 * 1).toFixed(2);
                    // 	// 	this.familyData1[i].abm_ex70 = '0.0';
                    // 	// 	detailObj.abd_ex9 = Math.ceil(this.familyData1[i].abm_ex71 * 1);
                    // 	// 	this.familyData1[i].abm_ex71 = detailObj.abd_ex9;
                    // 	// 	this.familyData1[i].abm_ex72 = 'Y';
                    // 	// }else{
                    // 		// 否则用低保标准计算  1.1-人均
                    // 		// detailObj.abd_ex9 = (this.dbStandard * 1.1 - this.income7[2].abi_ex2).toFixed(2);
                    // 		// console.log(Math.ceil(this.dbStandard * 1.1- abi_ex2));

                    // 		// this.familyData1[i].abm_ex69 = (this.dbStandard * 1 - this.income7[2].abi_ex2).toFixed(2);
                    // 		this.familyData1[i].abm_ex69 = Math.ceil(this.dbStandard * 1 - abi_ex2*1);
                    // 		this.familyData1[i].abm_ex70 = (this.dbStandard * 0.1).toFixed(1);
                    // 		detailObj.abd_ex9 = Math.ceil(this.familyData1[i].abm_ex69*1 + this.familyData1[i].abm_ex70*1);
                    // 		this.familyData1[i].abm_ex71 = Math.ceil(this.familyData1[i].abm_ex69*1 + this.familyData1[i].abm_ex70*1);
                    // 	// }
                    // 	console.log(this.familyData1[i].abm_ex69,this.familyData1[i].abm_ex71);
                    // }else{
                    // 非未成年人 特定对象 小于低保标准
                    // 向上取整
                    this.familyData1[i].abm_ex69 = Math.ceil(this.dbStandard * 1 - abi_ex2 * 1);
                    this.familyData1[i].abm_ex70 = (this.dbStandard * 0.1).toFixed(1);
                    detailObj.abd_ex9 = Math.ceil(this.familyData1[i].abm_ex69 * 1 + this.familyData1[i].abm_ex70 * 1);
                    this.familyData1[i].abm_ex71 = Math.ceil(this.familyData1[i].abm_ex69 * 1 + this.familyData1[i].abm_ex70 * 1);
                    // }
                  } else {
                    // 健康 --非特定对象 1-人均
                    // detailObj.abd_ex9 = (this.dbStandard - abi_ex2).toFixed(2);
                    // this.familyData1[i].abm_ex71 = (this.dbStandard * 1 - abi_ex2).toFixed(2);
                    // this.familyData1[i].abm_ex69 = (this.dbStandard * 1 - abi_ex2).toFixed(2);
                    this.familyData1[i].abm_ex69 = Math.ceil(this.dbStandard * 1 - abi_ex2 * 1);
                    this.familyData1[i].abm_ex70 = '0.0';
                    detailObj.abd_ex9 = Math.ceil(this.familyData1[i].abm_ex69 * 1 + this.familyData1[i].abm_ex70 * 1);
                    this.familyData1[i].abm_ex71 = Math.ceil(this.familyData1[i].abm_ex69 * 1 + this.familyData1[i].abm_ex70 * 1);
                  }
                }
              } else {//低保 人均月收入大于低保标准，且不是渐退期 救助金相关数据归零
                detailObj.abd_ex3 = "0.0";
                detailObj.abd_ex9 = "0.0";
                detailObj.abd_ex10 = "其他";
                this.familyData1[i].abm_ex69 = '0.0';
                this.familyData1[i].abm_ex70 = "0.0";
                this.familyData1[i].abm_ex71 = '0.0';
                console.log('人均月收入大于低保标准');
              }

              this.detailMoney.push(detailObj);
              detailObj = {};
            } else { //是渐退期，人工输入救助金 69基础 + 70分支 = 71总救助
              console.log(this.dibaoForm.ab_ex207, '渐退期3');
              // isSpecial = "/ 渐退期";

              // this.familyData1[i].abm_ex70 = "0.0";
              // this.familyData1[i].abm_ex69 = Math.ceil(this.familyData1[i].abm_ex71 * 1);

              // // detailObj.abd_ex9 = Number(this.familyData1[i].abm_ex71).toFixed(2);
              // detailObj.abd_ex9 = Math.ceil(this.familyData1[i].abm_ex69*1 + this.familyData1[i].abm_ex70*1);
              // detailObj.abd_ex10 = detailObj.abd_ex10 + isSpecial;
              this.JianTuiMoney(this.dibaoForm, this.familyData1);

            }
            console.log(this.familyData1[i].abm_ex71, '渐退期-71');
            console.log(this.dibaoForm.ab_ex207, '渐退期');

            // console.log('明细对象=》',detailObj);

          } else if (this.dibaoForm.ab_ex13 == '特困供养') {
            // }else if(this.dibaoForm.ab_ex13=='特困供养' && this.jsjgString=='特困人员供养' && this.ab_ex13 == '特困供养'){
            console.log('特困');
            detailObj.abd_ex10 = '特困供养';
            detailObj.abd_ex3 = this.tkStandard;

            // 只有 原本为 特困 结果为特困 且选择了特困的时候 才计算 特困的发放明细
            if (this.ab_ex13 == '特困供养') {
              // detailObj.abd_ex9 = (this.dibaoForm.ab_ex200 * 1 + this.dibaoForm.ab_ex199 * 1).toFixed(2);
              detailObj.abd_ex5 = this.dibaoForm.ab_ex200;
              detailObj.abd_ex6 = this.dibaoForm.ab_ex199;
              this.familyData1[i].abm_ex69 = this.dibaoForm.ab_ex200;
              this.familyData1[i].abm_ex70 = this.dibaoForm.ab_ex199;
              this.familyData1[i].abm_ex71 = Math.ceil(this.familyData1[i].abm_ex69 * 1 + this.familyData1[i].abm_ex70 * 1);
              detailObj.abd_ex9 = Math.ceil(this.familyData1[i].abm_ex69 * 1 + this.familyData1[i].abm_ex70 * 1);
            } else if (this.ab_ex13 == '低保') {
              // 符合特困 但要转低保的数据 进行明细计算
              var isSpecial = '';
              detailObj.abd_ex3 = this.dbStandard;
              detailObj.abd_ex10 = '低保';
              if (this.familyData1[i].abm_ex11 == '残疾') {
                // 如果残疾 是 一二级
                if (['二级残疾', '二级', '一级残疾', '一级'].includes(this.familyData1[i].abm_ex40)) {
                  isSpecial = '/ 残疾';
                  detailObj.abd_ex10 = detailObj.abd_ex10 + isSpecial;
                  // detailObj.abd_ex9 = Number(this.dbStandard).toFixed(2);
                  // detailObj.abd_ex9 = Math.ceil(this.dbStandard*1);

                  this.familyData1[i].abm_ex69 = Math.ceil(this.dbStandard * 1);
                  this.familyData1[i].abm_ex70 = '0.0';
                  detailObj.abd_ex9 = Math.ceil(this.familyData1[i].abm_ex69 * 1 + this.familyData1[i].abm_ex70 * 1);
                  this.familyData1[i].abm_ex71 = Math.ceil(this.familyData1[i].abm_ex69 * 1 + this.familyData1[i].abm_ex70 * 1);

                } else {
                  if (['退役军人', '归侨', '独居', '老年人', '未成年人'].includes(this.familyData1[i].abm_ex51)) {


                    isSpecial = '/' + this.familyData1[i].abm_ex51;

                    detailObj.abd_ex10 = detailObj.abd_ex10 + isSpecial;

                    this.familyData1[i].abm_ex69 = Math.ceil(this.dbStandard * 1 - abi_ex2);
                    this.familyData1[i].abm_ex70 = (this.dbStandard * 0.1).toFixed(1);
                    detailObj.abd_ex9 = Math.ceil(this.familyData1[i].abm_ex69 * 1 + this.familyData1[i].abm_ex70 * 1);
                    this.familyData1[i].abm_ex71 = Math.ceil(this.familyData1[i].abm_ex69 * 1 + this.familyData1[i].abm_ex70 * 1);
                  } else {
                    this.familyData1[i].abm_ex69 = Math.ceil(this.dbStandard * 1 - abi_ex2);
                    this.familyData1[i].abm_ex70 = '0.0';
                    detailObj.abd_ex9 = Math.ceil(this.familyData1[i].abm_ex69 * 1 + this.familyData1[i].abm_ex70 * 1);
                    this.familyData1[i].abm_ex71 = Math.ceil(this.familyData1[i].abm_ex69 * 1 + this.familyData1[i].abm_ex70 * 1);
                    // detailObj.abd_ex9 = Math.ceil(this.dbStandard - abi_ex2);
                  }
                }

              } else if (this.familyData1[i].abm_ex11 == '重病') {
                isSpecial = '/ 重病';
                detailObj.abd_ex10 = detailObj.abd_ex10 + isSpecial;
                // detailObj.abd_ex9 = (this.dbStandard * 1.2).toFixed(2);
                this.familyData1[i].abm_ex69 = Math.ceil(this.dbStandard * 1 - abi_ex2);
                this.familyData1[i].abm_ex70 = (this.dbStandard * 0.2).toFixed(1);
                detailObj.abd_ex9 = Math.ceil(this.familyData1[i].abm_ex69 * 1 + this.familyData1[i].abm_ex70 * 1);
                this.familyData1[i].abm_ex71 = Math.ceil(this.familyData1[i].abm_ex69 * 1 + this.familyData1[i].abm_ex70 * 1);
              } else {
                if (['退役军人', '归侨', '独居', '老年人', '未成年人'].includes(this.familyData1[i].abm_ex51)) {
                  // isSpecial = this.familyData1[i].abm_ex51=='退役军人' ? isSpecial+'/ 退役军人' : isSpecial;

                  isSpecial = this.familyData1[i].abm_ex51 = '/' + isSpecial;
                  detailObj.abd_ex10 = detailObj.abd_ex10 + isSpecial;

                  // detailObj.abd_ex9 = (this.dbStandard * 1.1 - this.income7[2].abi_ex2).toFixed(2);
                  // detailObj.abd_ex9 = Math.ceil(this.dbStandard * 1.1 - this.income7[2].abi_ex2);
                  this.familyData1[i].abm_ex69 = Math.ceil(this.dbStandard * 1 - abi_ex2);
                  this.familyData1[i].abm_ex70 = (this.dbStandard * 0.1).toFixed(1);
                  detailObj.abd_ex9 = Math.ceil(this.familyData1[i].abm_ex69 * 1 + this.familyData1[i].abm_ex70 * 1);
                  this.familyData1[i].abm_ex71 = Math.ceil(this.familyData1[i].abm_ex69 * 1 + this.familyData1[i].abm_ex70 * 1);
                } else {

                  // this.familyData1[i].abm_ex71 = (this.dbStandard * 1 - this.income7[2].abi_ex2).toFixed(2);
                  // detailObj.abd_ex9 = (this.dbStandard - abi_ex2).toFixed(2);
                  // detailObj.abd_ex9 = Math.ceil(this.dbStandard - abi_ex2);
                  this.familyData1[i].abm_ex69 = Math.ceil(this.dbStandard * 1 - abi_ex2);
                  this.familyData1[i].abm_ex70 = '0.0';
                  detailObj.abd_ex9 = Math.ceil(this.familyData1[i].abm_ex69 * 1 + this.familyData1[i].abm_ex70 * 1);
                  this.familyData1[i].abm_ex71 = Math.ceil(this.familyData1[i].abm_ex69 * 1 + this.familyData1[i].abm_ex70 * 1);
                }
              }
            }
            else if (this.jsjgString.indexOf('特困人员供养') != -1) {
              // detailObj.abd_ex9 = (this.dibaoForm.ab_ex200 * 1 + this.dibaoForm.ab_ex199 * 1).toFixed(2);
              this.familyData1[i].abm_ex69 = this.dibaoForm.ab_ex200;
              this.familyData1[i].abm_ex70 = this.dibaoForm.ab_ex199;
              this.familyData1[i].abm_ex71 = Math.ceil(this.familyData1[i].abm_ex69 * 1 + this.familyData1[i].abm_ex70 * 1);
              detailObj.abd_ex9 = Math.ceil(this.familyData1[i].abm_ex69 * 1 + this.familyData1[i].abm_ex70 * 1);
            }
            else {
              // 超出特困救助标准的有其他的信息提示， 覆盖明细表 不用计算明细了,改一下成员保障金相关字段。
              this.familyData1[i].abm_ex69 = '0.0';
              this.familyData1[i].abm_ex70 = '0.0';
              this.familyData1[i].abm_ex71 = '0.0';
              detailObj.abd_ex9 = this.familyData1[i].abm_ex71;

            }

            this.detailMoney.push(detailObj);
            console.log('明细对象=》', detailObj);
            detailObj = {};
          } else {
            console.log('其他');
            if (this.jsjgString.indexOf('特困人员供养') != -1) {
              if (this.ab_ex13 == '特困供养') {
                detailObj.abd_ex10 = '特困供养';
                // detailObj.abd_ex9 = (this.dibaoForm.ab_ex200 * 1 + this.dibaoForm.ab_ex199 * 1).toFixed(2);
                this.familyData1[i].abm_ex69 = this.tkStandard;
                this.familyData1[i].abm_ex70 = "0.0";
                this.familyData1[i].abm_ex71 = '0.0';
              }
            }
          }


          // this.detailMoney.push(detailObj);
          // console.log('明细对象=》',detailObj);
          // detailObj = {};
        }
      }

      // 家庭保障金计算
      var ab_ex40 = 0;
      if (this.detailMoney.length > 0) {
        for (let i in this.detailMoney) {
          ab_ex40 += this.detailMoney[i].abd_ex9 * 1;
        }
      }
      this.ab_ex40 = Math.ceil(ab_ex40).toFixed(1);

      console.log('明细表=》', this.detailMoney);
      console.log('成员表=》', this.familyData1);
      // console.log('结果为特困时选择的救助类类型=》',this.ab_ex13);

    },

    // 不知道干啥的
    // showEg(){
    // 	console.log(document.getElementsByClassName('eg')[0].outerText);
    // 	document.getElementsByClassName('eg')[0].style.display="block"
    // },
    // 不知道干啥的
    // closeEg(){
    // 	document.getElementsByClassName('eg')[0].style.display="none"
    // },

    // changeAmt(index,row,id)
    // 正则校验可增加行数的输入数据
    keyVerification2 (index, row, id) {
      var msg = "";

      // 近亲属姓名
      if (id == "f4.abm_ex3") {
        this.familyData4[index].abm_ex3 = row.abm_ex3.replace(/\s+/g, "");
        msg = isName(row.abm_ex3, id, index)
        if (msg != true) {
          this.$message.warning(msg)
          this.isSaves = false;
          return false;
        }
      }
      // 近亲属关系
      if (id == "f4.abm_ex1") {
        this.familyData4[index].abm_ex1 = row.abm_ex1.replace(/\s+/g, "");
        msg = isName(row.abm_ex1, id, index)
        if (msg != true) {
          this.$message.warning(msg)
          this.isSaves = false;
          return false;
        }
      }
      // 近亲属职位
      if (id == "f4.abm_ex15") {
        console.log("abm_ex15");
        this.familyData4[index].abm_ex15 = row.abm_ex15.replace(/\s+/g, "");
        msg = isName(row.abm_ex15, id, index);
        if (msg != true) {
          this.$message.warning(msg);
          this.isSaves = false;
          return false;
        }

      }
      // 共同姓名
      if (id == "f1.abm_ex3") {
        this.familyData1[index].abm_ex3 = row.abm_ex3.replace(/\s+/g, "");
        msg = isName(row.abm_ex3, id, index);
        if (msg != true) {
          this.$message.warning(msg);
          this.isSaves = false;
          return false;
        }
      }
      // 共同工作单位
      if (id == "f1.abm_ex15") {
        this.familyData1[index].abm_ex15 = row.abm_ex15.replace(/\s+/g, "");
        msg = isName(row.abm_ex15, id, index);
        if (msg != true) {
          this.$message.warning(msg);
          this.isSaves = false;
          return false;
        }
      }
      // 共同月收入
      if (id == "f1.abm_ex17") {
        this.familyData1[index].abm_ex17 = row.abm_ex17.replace(/\s+/g, "");
        msg = isNum(row.abm_ex17, id, index);
        if (msg != true) {
          this.$message.warning(msg);
          this.isSaves = false;
          return false;
        }
      }
      // 非共同姓名
      if (id == "f2.abm_ex3") {
        this.familyData2[index].abm_ex3 = row.abm_ex3.replace(/\s+/g, "");
        msg = isName(row.abm_ex3, id, index);
        if (msg != true) {
          this.$message.warning(msg)
          this.isSaves = false;
          return false;
        }
      }

      // 非共同工作单位
      if (id == "f2.abm_ex15") {
        this.familyData2[index].abm_ex15 = row.abm_ex15.replace(/\s+/g, "");
        msg = isName(row.abm_ex15, id, index);
        if (msg != true) {
          this.$message.warning(msg);
          this.isSaves = false;
          return false;
        }
      }
      // 非共同家庭人口
      if (id == "f2.abm_ex20") {
        this.familyData2[index].abm_ex20 = row.abm_ex20.replace(/\s+/g, "");
        msg = isFamilyNum(row.abm_ex20, id, index)
        if (msg != true) {
          this.$message.warning(msg);
          this.isSaves = false;
          return false;
        }
      }
      // 非共同家庭人均月收入
      if (id == "f2.abm_ex17") {
        this.familyData2[index].abm_ex17 = row.abm_ex17.replace(/\s+/g, "");
        msg = isNum(row.abm_ex17, id, index);
        if (msg != true) {
          this.$message.warning(msg);
          this.isSaves = false;
          return false;
        }
      }
      // 非共同月赡抚养费
      if (id == "f2.abm_ex18") {
        this.familyData2[index].abm_ex18 = row.abm_ex18.replace(/\s+/g, "");
        msg = isNum(row.abm_ex18, id, index);
        if (msg != true) {
          this.$message.warning(msg);
          this.isSaves = false;
          return false;
        }
      }

      // 非共同成员信息姓名
      if (id == "f3.abm_ex3") {
        this.familyData3[index].abm_ex3 = row.abm_ex3.replace(/\s+/g, "");
        msg = isName(row.abm_ex3, id, index)
        if (msg != true) {
          this.$message.warning(msg);
          this.isSaves = false;
          return false;
        }
      }

      // 车(船)主
      if (id == "e1.abe_ex1") {
        this.estate1[index].abe_ex1 = row.abe_ex1.replace(/\s+/g, "");
        msg = isName(row.abe_ex1, id, index);
        if (msg != true) {
          this.$message.warning(msg)
          this.isSaves = false;
          return false;
        }
      }
      // 购买时间
      // if(id=="e1.abe_ex2"){
      // 	this.estate1[index].abe_ex2=row.abe_ex2.replace(/\s+/g,"");
      // 	msg=isText(row.abe_ex2,id,index);
      // 	if(msg!=true){
      // 		this.$message.warning(msg);
      // 		this.isSaves=false;
      // 		return false;
      // 	}
      // }
      // 用途
      if (id == "e1.abe_ex3") {
        this.estate1[index].abe_ex3 = row.abe_ex3.replace(/\s+/g, "");
        msg = isText(row.abe_ex3, id, index);
        if (msg != true) {
          this.$message.warning(msg);
          this.isSaves = false;
          return false;
        }
      }

      // 车(船)价值
      if (id == "e1.abe_ex4") {
        this.estate1[index].abe_ex4 = row.abe_ex4.replace(/\s+/g, "");
        msg = isNum(row.abe_ex4, id, index);
        if (msg != true) {
          this.$message.warning(msg);
          this.isSaves = false;
          return false;
        }
      }
      // 房屋产权人/共有人
      if (id == "e2.abe_ex1") {
        msg = isName(row.abe_ex1, id, index)
        if (msg != true) {
          this.$message.warning(msg)
          this.isSaves = false;
          return false;
        }
      }
      // 建房(购房)时间
      // if(id=="e2.abe_ex2"){
      // 	this.estate2[index].abe_ex2=row.abe_ex2.replace(/\s+/g,"");
      // 	msg=isText(row.abe_ex2,id,index);
      // 	if(msg!=true){
      // 		this.$message.warning(msg);
      // 		this.isSaves=false;
      // 		return false;
      // 	}
      // }
      // 房屋地址
      if (id == "e2.abe_ex5") {
        this.estate2[index].abe_ex5 = row.abe_ex5.replace(/\s+/g, "");
        msg = isText(row.abe_ex5, id, index);
        if (msg != true) {
          this.$message.warning(msg);
          this.isSaves = false;
          return false;
        }
      }
      // 面积
      if (id == "e2.abe_ex6") {
        this.estate2[index].abe_ex6 = row.abe_ex6.replace(/\s+/g, "");
        msg = isNum(row.abe_ex6, id, index);
        if (msg != true) {
          this.$message.warning(msg);
          this.isSaves = false;
          return false;
        }
      }
      // 购置价/构造价
      if (id == "e2.abe_ex4") {
        this.estate2[index].abe_ex4 = row.abe_ex4.replace(/\s+/g, "");
        msg = isNum(row.abe_ex4, id, index);
        if (msg != true) {
          this.$message.warning(msg);
          this.isSaves = false;
          return false;
        }
      }
      //山林土地：姓名
      if (id == "land.abl_ex1") {
        this.landInfo[index].abl_ex1 = row.abl_ex1.replace(/\s+/g, "");
        msg = isName(row.abl_ex1, id, index)
        if (msg != true) {
          this.$message.warning(msg)
          this.isSaves = false;
          return false;
        }
      }
      //山林土地：承包面积
      if (id == "land.abl_ex2") {
        this.landInfo[index].abl_ex2 = row.abl_ex2.replace(/\s+/g, "");
        msg = isNum(row.abl_ex2, id, index);
        if (msg != true) {
          this.$message.warning(msg);
          this.isSaves = false;
          return false;
        }
      }
      //山林土地：土地估值
      if (id == "land.abl_ex4") {
        this.landInfo[index].abl_ex4 = row.abl_ex4.replace(/\s+/g, "");
        msg = isNum(row.abl_ex4, id, index);
        if (msg != true) {
          this.$message.warning(msg);
          this.isSaves = false;
          return false;
        }
      }
      // console.log(index,row,id);
      // this.$message.warning(msg);
      // return false;

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
        console.log('救助标准=》', res.response.data[0]);
      })
    },

    // 特困保障金计算
    changeMoney (val, id) {
      this.dibaoForm.ab_ex38 = this.tkStandard; //给标准赋值
      this.dibaoForm.ab_ex200 = this.ab_ex200;

      // 生活费 + 护理费 ，共同成员 > 0
      if (!isNaN(this.dibaoForm.ab_ex199 * 1) && !isNaN(this.dibaoForm.ab_ex200 * 1) && this.familyData1.length != 0) {
        // this.familyData1.length = 2;
        this.dibaoForm.ab_ex40 = ((this.dibaoForm.ab_ex199 * 1 + this.dibaoForm.ab_ex200 * 1) * this.familyData1.length).toFixed(2)
      } else {
        this.dibaoForm.ab_ex40 = 0.00
      }

      // console.log(this.dibaoForm.ab_ex199 ,this.dibaoForm.ab_ex200);
      // console.log(this.dibaoForm.ab_ex199*1 + this.dibaoForm.ab_ex200*1);
      // console.log((this.dibaoForm.ab_ex199*1 + this.dibaoForm.ab_ex200*1)*2);
      // this.dibaoForm.ab_ex40 = this.dibaoForm.ab_ex40.toString(2)

      console.log('保障金 计算=》', this.dibaoForm.ab_ex40);
      console.log('生活费 计算=》', this.dibaoForm.ab_ex200);
      console.log('生活费 显示=》', this.ab_ex200);
      console.log(val, id);

      this.keyVerification(val, id)
    },

    // 正则校验输入数据
    keyVerification (key, id) {
      //js去掉所有空格 \s表示查找空格带上加好表示连续的空格
      // console.log(key);
      key = key.replace(/\s+/g, "");
      var msg = "";

      //申请人姓名
      if (id == "ab_ex3") {
        this.dibaoForm.ab_ex3 = key;
        msg = isName(key, id)
        if (msg !== true) {
          // console.log(msg,"msg");
          this.$message.warning(msg)
          this.isSaves = false;
          return false;
        }
      }

      // 申请人身份证号
      if (id == "ab_ex7") {
        this.dibaoForm.ab_ex7 = key;
        this.dibaoForm.ab_ex7 = key.replace(/x$/i, "X");
        msg = isCardID(key, id)
        if (msg != true) {
          // console.log(msg);
          this.$message.warning("申请人" + msg);
          this.isSaves = false;
          return false;
        }
      }

      // 代理人身份证号
      if (id == "aba_ex3" && key != "") {
        // console.log(key,id);
        this.agentInfo.aba_ex3 = key;
        msg = isCardID(key, id)
        if (msg != true) {
          // console.log(msg);
          this.$message.warning("代理人" + msg);
          this.isSaves = false;
          return false;
        }
      }

      if (id == "aba_ex1") {
        // console.log(key,id);
        this.agentInfo.aba_ex1 = key;
        msg = isName(key, id)
        if (msg != true) {
          console.log(msg);
          this.$message.warning(msg);
          this.isSaves = false;
          return false;
        }
      }

      // 户籍地址，家庭住址--不能含有特殊字符或空格
      if (id == "ab_ex4") {
        this.dibaoForm.ab_ex4 = key
        msg = isText(key, id);
        if (msg != true) {
          this.$message.warning(msg);
          this.isSaves = false;
          return false;
        }
      }
      // 家庭住址
      if (id == "ab_ex11") {
        this.dibaoForm.ab_ex11 = key
        msg = isText(key, id);
        if (msg != true) {
          this.$message.warning(msg);
          this.isSaves = false;
          return false;
        }
      }
      // 家庭人口
      if (id == "ab_ex5") {
        this.dibaoForm.ab_ex5 = key
        msg = isFamilyNum(key, id)
        if (msg != true) {
          this.$message.warning(msg);
          this.isSaves = false;
          return false;
        }
      }

      // 联系电话
      if (id == "ab_ex28") {
        this.dibaoForm.ab_ex28 = key
        msg = checkPhone(key, id)
        if (msg != true) {
          this.$message.warning(msg);
          this.isSaves = false;
          return false;
        }
      }
      // 银行名称
      if (id == "ab_ex42") {
        console.log(key);
        this.dibaoForm.ab_ex42 = key.replace(/\s+/g, "");
        msg = isName(key, id)
        if (msg != true) {
          this.$message.warning(msg)
          this.isSaves = false;
          return false;
        }
      }
      // 开户人
      if (id == "ab_ex8") {
        console.log(key, id);
        this.dibaoForm.ab_ex8 = key.replace(/\s+/g, "");
        msg = isName(key, id);
        if (msg != true) {
          this.$message.warning(msg)
          this.isSaves = false;
          return false;
        }
      }
      // 一卡通账号
      if (id == "ab_ex43") {
        console.log("一卡通", key);
        this.dibaoForm.ab_ex43 = key.replace(/\s+/g, "");
        msg = isBankID(key, id);
        if (msg != true) {
          this.$message.warning(msg);
          this.isSaves = false;
          return false;
        }
      }

      // 资产 
      // 银行总存款36
      if (id == "ab_ex36") {
        this.dibaoForm.ab_ex36 = key.replace(/\s+/g, "");
        msg = isNum(key, id);
        if (msg != true) {
          this.$message.warning(msg);
          this.isSaves = false;
          return false
        }
      }
      // 有价证券 60
      if (id == "ab_ex60") {
        this.dibaoForm.ab_ex60 = key.replace(/\s+/g, "");
        msg = isNum(key, id);
        if (msg != true) {
          this.$message.warning(msg);
          this.isSaves = false;
          return false
        }
      }
      // 基金179
      if (id == "ab_ex179") {
        this.dibaoForm.ab_ex179 = key.replace(/\s+/g, "");
        msg = isNum(key, id);
        if (msg != true) {
          this.$message.warning(msg);
          this.isSaves = false;
          return false
        }
      }
      // 商业保险 180
      if (id == "ab_ex180") {
        this.dibaoForm.ab_ex180 = key.replace(/\s+/g, "");
        msg = isNum(key, id);
        if (msg != true) {
          this.$message.warning(msg);
          this.isSaves = false;
          return false
        }
      }
      // 债券 61
      if (id == "ab_ex61") {
        this.dibaoForm.ab_ex61 = key.replace(/\s+/g, "");
        msg = isNum(key, id);
        if (msg != true) {
          this.$message.warning(msg);
          this.isSaves = false;
          return false
        }
      }
      // 其他金融产品37
      if (id == "ab_ex37") {
        this.dibaoForm.ab_ex37 = key.replace(/\s+/g, "");
        msg = isNum(key, id);
        if (msg != true) {
          this.$message.warning(msg);
          this.isSaves = false;
          return false
        }
      }

      // 护理费
      if (id == 'ab_ex199') {
        this.dibaoForm.ab_ex199 = key.replace(/\s+/g, "");
        msg = isNum(key, id);
        if (msg != true) {
          this.$message.warning(msg);
          this.isSaves = false;
          return false
        }
      }
      // 供养机构
      // if(id=='ab_ex195'){
      // 	this.dibaoForm.ab_ex195=key.replace(/\s+/g,"");
      // 	// console.log( '供养机构名称 =>',key);
      // 	// console.log( '供养机构名称长度 =>',key.length);
      // 	// if(key.length>10){
      // 	// 	this.$message.warning('供养机构名称的字符不能超过10个！');
      // 	// 	this.isSaves=false;
      // 	// 	return false
      // 	// } 

      // 	msg=isName(key,id);
      // 	if(msg!=true){
      // 		this.$message.warning(msg);
      // 		this.isSaves=false;
      // 		return false
      // 	}
      // }
      // 生活费
      if (id == 'ab_ex200') {
        // console.log(key);
        this.ab_ex200 = key.replace(/\s+/g, "");
        msg = isNum(key, id);
        if (msg != true) {
          this.$message.warning(msg);
          this.isSave = false;
          return false
        }
      }
    },

    // 计算救助数据
    changeJS () {
      this.changeAmt();
      var jsjg = [];

      this.incomeConstant = (this.zcStandard / 12).toFixed(2);
      console.log(this.incomeConstant, '人均可支配常数-月-after');

      // 困境儿童需要家庭成员年龄<18岁，在每本函数中无法进行困境儿童操作--暂时取消
      // if(this.jisuan.familyChildrens>0){
      // 	jsjg.push(this.kxsjz[0]) ; //家庭人口=1，没有赡抚养人(不管有没有重残重病)---特困
      // 	console.log(jsjg,"儿童救助");
      // }
      // 如果总收入>低保标准 this.jisuan.familyAmt > 0 &&

      console.log((this.jisuan.familyAmt) / this.jisuan.familyNum / 12, '人均月');
      console.log(this.dbStandard, '低保标准');
      if ((this.jisuan.familyAmt) / this.jisuan.familyNum / 12 < this.dbStandard) {  //人均月<低保标准
        console.log("小于低保标准", this.jisuan.familyNum >= 1, Number(this.jisuan.familyFD) >= 1);
        if (this.jisuan.familyNum == 1 && this.jisuan.familyFD < 1) {
          jsjg.push(this.kxsjz[2]); //家庭人口=1，没有赡抚养人(不管有没有重残重病)---特困
          jsjg.push(this.kxsjz[7]); //家庭人口=1，没有赡抚养人(不管有没有重残重病)---特困
          console.log(jsjg, "特困");
        } else if (this.jisuan.familyNum > 1 || this.jisuan.familyFD >= 1) {
          jsjg.push(this.kxsjz[7]); //有赡抚养人(非共同生活>=1)或共同生活>1(有或没有重残重病)---按户保
          console.log(jsjg, this.jisuan, "按户保");
        } else if (Number(this.jisuan.familyNum) >= 1 && (Number(this.jisuan.familyFD) >= 1)) {
          jsjg.push(this.kxsjz[7]); //有赡抚养人(非共同生活>=1)且共同生活=1(有或没有重残重病)---按户保
          console.log(jsjg, this.jisuan, "按户保");
        }
      }
      console.log(this.jisuan, '计算');
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
        // 如果 低保标准 < =月人均<=低保标准 * 2
        if (h1 >= this.dbStandard && h1 <= (this.dbStandard * 2)) {

          if (h1 < (this.dbStandard * 1.5)) {	//如果 低保标准 < 月人均 < 低保标准 * 1.5

            if (this.jisuan.familyZB > 0 || this.jisuan.familyZC > 0) { 		//如果重病或重残
              jsjg.push(this.kxsjz[4]);
              jsjg.push(this.kxsjz[5]);
              if (this.jisuan.familyZB > 0) {                               //如果重病-按人保+低收入
                jsjg.push(this.kxsjz[8]);
              }
              if (this.jisuan.familyZC > 0) {                               //如果重残-按人保+低收入
                jsjg.push(this.kxsjz[9]);
              }
              console.log(jsjg, "重病/重残-按人保+低保边缘+低收入");
            }
            else {														//否则//低保边缘+低收入-----低收入包含低保边缘
              jsjg.push(this.kxsjz[4]);
              jsjg.push(this.kxsjz[5]);
              console.log(jsjg, "低保边缘+低收入");
            }
          }
          if (h1 >= (this.dbStandard * 1.5)) {        									//如果 低保标准 * 1.5 <= 月人均 <低保标准 * 2
            if (this.jisuan.familyZB > 0 || this.jisuan.familyZC > 0) { 		//如果重病或重残-按人保+低收入

              jsjg.push(this.kxsjz[4]); //低收入--单人保

              if (this.jisuan.familyZB > 0) {                               //如果重病-按人保+低收入
                jsjg.push(this.kxsjz[8]);
              }
              if (this.jisuan.familyZC > 0) {                               //如果重残-按人保+低收入
                jsjg.push(this.kxsjz[9]);
              }
              if (condition2) {
                jsjg.push(this.kxsjz[3]); //支出
                console.log(jsjg, "支出");
              }
              console.log(jsjg, "重病/重残-按人保+低收入");
            }
            else {
              jsjg.push(this.kxsjz[4]);
              console.log(jsjg, "低收入");
              if (condition2) {
                jsjg.push(this.kxsjz[3]); //支出
                console.log(jsjg, "支出");
              }
            }
          }
        }

        else if ((this.dbStandard * 2) < h1 && h1 < this.incomeConstant && h2 < this.dbStandard) {
          jsjg.push(this.kxsjz[3]); //支出
          console.log("均月 > 2 * this.dbStandard && < 人均可支配常数 && 可支配月人均<标准");
        }
      }

      if (jsjg.length > 0) {
        // jsjg.splice(1,0,this.kxsjz[1]) //临时救助--暂时取消
        this.jsjgshow1 = true;
        this.jsjgshow2 = false;
      } else {
        this.jsjgshow1 = false;
        this.jsjgshow2 = true;
      }
      this.jsjgString = jsjg.join(" ，")
      this.jsjg = jsjg;
      if (this.jsjg.length > 0) {
        // this.jsjg.splice(1,0,this.kxsjz[1]) //临时救助
        this.jsjgshow1 = true;
        this.jsjgshow2 = false;
      } else {
        this.jsjgshow1 = false;
        this.jsjgshow2 = true;
      }


      if (this.dibaoForm.ab_ex41.indexOf('单列户') != -1) {
        for (let i in this.familyData1) {

          if (this.familyData1[i].abm_ex2 == this.dibaoForm.ab_ex7) {
            if (this.familyData1[i].abm_ex11 == '残疾') {
              if (['一级', '一级残疾', '二级', '二级残疾'].includes(this.familyData1[i].abm_ex40) || (['三级', '三级残疾'].includes(this.familyData1[i].abm_ex40) && ['精神', '精神残疾', '智力', '智力残疾'].includes(this.familyData1[i].abm_ex39))) {

                // this.assistanceType = '残疾人单列户施保';
                // this.ab_ex13 = '';
                this.jsjgString = '最低生活保障-按人保-重残单人保';

              } else {
                // 不符合低保按人保救助
                this.jsjgString = '';
              }
            } else if (this.familyData1[i].abm_ex11 == '重病') {
              // 不符合低保按人保救助
              // this.assistanceType = '重病型单列户施保';
              // this.ab_ex13 = '';
              this.jsjgString = '最低生活保障-按人保-重病单人保';

            } else {
              this.jsjgString = '';
            }
          }
        }
      }
      console.log(this.jsjgString, '救助类型');
      console.log(jsjg, '救助结果');

      return jsjg;
    },

    scroll () {
      // var scrollTop =document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset;
      if (document.querySelector('.info2') == null || document.querySelector('#recordt') == null) {
        return ''
      }
      // console.log(document.querySelector('.info2'),document.querySelector('#recordt')==null,'456456----')
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
      let oDiv17 = document.querySelector('#page17');
      let oDiv18 = document.querySelector('#page18');
      let oDiv21 = true;
      if (this.dibaoForm.ab_ex92 == "是") {
        oDiv21 = document.querySelector('#page21');
      }
      let oDiv22 = true;
      if (this.dibaoForm.ab_ex13 == '特困供养') {
        oDiv22 = document.querySelector('#page22');
      }
      // 顺序跟上面显示顺序要相反
      let clientHeight = document.querySelector('.info2').clientHeight
      let recordtClientHeight = document.querySelector('#recordt').scrollHeight
      if (!oDiv1 || !oDiv2 || !oDiv3 || !oDiv4 || !oDiv5 || !oDiv6 || !oDiv7 || !oDiv8 || !oDiv9 || !oDiv10 || !oDiv11 || !oDiv12 || !oDiv13 || !oDiv17 || !oDiv18 || !oDiv21 || !oDiv22) {
        return ''
      }
      if (recordtClientHeight + oDiv7.clientHeight < clientHeight && scrollTop > (oDiv7.offsetTop - oDiv1.offsetTop - clientHeight + recordtClientHeight + oDiv7.clientHeight)) {
        // console.log('触发了7-1')
        this.isShow(7)
      } else if (scrollTop > (oDiv7.offsetTop - oDiv1.offsetTop - 1)) {
        // console.log('触发了7-2')
        this.isShow(7)
      } else if (scrollTop > (oDiv22.offsetTop - oDiv1.offsetTop)) {
        // console.log('触发了22')
        this.isShow(22)
      } else if (scrollTop > (oDiv18.offsetTop - oDiv1.offsetTop)) {
        // console.log('触发了18')
        this.isShow(18)
      } else if (scrollTop > (oDiv17.offsetTop - oDiv1.offsetTop)) {
        // console.log('触发了17')
        this.isShow(17)
      } else if (scrollTop > (oDiv13.offsetTop - oDiv1.offsetTop - 1)) {
        // console.log('触发了13')
        this.isShow(13)
      } else if (scrollTop > (oDiv12.offsetTop - oDiv1.offsetTop - 1)) {
        // console.log('触发了12')
        this.isShow(12)
      } else if (scrollTop > (oDiv11.offsetTop - oDiv1.offsetTop - 1)) {
        // console.log('触发了11')
        this.isShow(11)
      } else if (scrollTop > (oDiv6.offsetTop - oDiv1.offsetTop - 1)) {
        // console.log('触发了6')
        this.isShow(6)
      } else if (scrollTop > (oDiv10.offsetTop - oDiv1.offsetTop - 1)) {
        // console.log('触发了10')
        this.isShow(10)
      } else if (scrollTop > (oDiv5.offsetTop - oDiv1.offsetTop - 1)) {
        // console.log('触发了5')
        this.isShow(5)
      } else if (scrollTop > (oDiv9.offsetTop - oDiv1.offsetTop - 1)) {
        // console.log('触发了9')
        this.isShow(9)
      } else if (scrollTop > (oDiv4.offsetTop - oDiv1.offsetTop - 1)) {
        // console.log('触发了4')
        this.isShow(4)
      } else if (scrollTop > (oDiv3.offsetTop - oDiv1.offsetTop - 1)) {
        // console.log('触发了3')
        this.isShow(3)
      } else if (scrollTop > (oDiv8.offsetTop - oDiv1.offsetTop - 1)) {
        // console.log('触发了8')
        this.isShow(8)
      } else if (scrollTop > (oDiv2.offsetTop - oDiv1.offsetTop - 1)) {
        // console.log('触发了2')
        this.isShow(2)
      } else if (scrollTop > (oDiv21.offsetTop - oDiv1.offsetTop)) {
        // console.log('触发了21')
        this.isShow(21)
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

    async loadData () {

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

      if (!this.specialAccount) {

        this.rules.ab_ex177 = [{
          required: true,
          message: '纸质授权书不能为空',
          trigger: 'blur'
        }]

      } else {
        this.rules.ab_ex177 = [];
      }

      console.log(this.rules, '校验数组');
      console.log(this.specialAccount, '是否是特殊账号');

      //救助标准
      await this.getStandard()
      this.sId = this.$route.query.sId;
      this.cId = this.$route.query.cId;
      this.type = this.$route.query.type;
      this.isFinish = false;

      this.getBasicsChange({
        sId: this.$route.query.sId,
        // type: "低保",
        company: "泰州市姜堰区社会救助综合平台"
      }).then(res => {
        if (res.response.data[0].msg == "该信息正在进行变更申请，不能进行变更操作") {
          //this.$message.error(res.response.data[0].msg)
          this.$alert(res.response.data[0].msg, {
            confirmButtonText: '确定',
            callback: action => {
              this.$emit("closes", false)
              this.$router.go(-1)
            }
          });

        } else {
          this.dibaoFormOld = JSON.parse(JSON.stringify(res[0].data));
          this.dibaoForm = res[0].data[0];
          this.common = res[0].common;
          this.uploadImg.ab_ex73_img = res[0].data[0].ab_ex73.split(",");
          this.uploadImg.ab_ex10_img = res[0].data[0].ab_ex10.split(",");   //身份证照片
          this.uploadImg.ab_ex16_img = res[0].data[0].ab_ex16.split(",");
          this.uploadImg.ab_ex97_img = res[0].data[0].ab_ex97.split(","); //民主评议
          this.uploadImg.ab_ex98_img = res[0].data[0].ab_ex98.split(","); //公示
          this.uploadImg.ab_ex74_img = res[0].data[0].ab_ex74.split(","); //审核审批表
          this.uploadImg.ab_ex166_img = res[0].data[0].ab_ex166.split(",");//居住外
          this.uploadImg.ab_ex167_img = res[0].data[0].ab_ex167.split(",");//居住内
          this.uploadImg.ab_ex177_img = res[0].data[0].ab_ex177.split(",");//纸质授权书
          this.uploadImg.ab_ex196_img = res[0].data[0].ab_ex196.split(",");//自理能力状况评估报告
          this.uploadImg.ab_ex197_img = res[0].data[0].ab_ex197.split(",");//集中供养意愿书
          let xzqhArray = this.dibaoForm.ab_ex162.split(",");
          if (res.response.data[0].data[0].ab_ex46 != "") {
            this.ab_ex46 = res.response.data[0].data[0].ab_ex46.split(",");
          } else {
            this.ab_ex46 = [];//消除数组ab_ex46中的空元素
          }
          if (xzqhArray.length == 3) {
            this.$set(this.xzqhArray, 0, xzqhArray[0]);
            this.$set(this.xzqhArray, 1, xzqhArray[1]);
            this.$set(this.xzqhArray, 2, xzqhArray[2]);
            this.$set(this.test, "xzqhArray", xzqhArray);
          }
          this.isFinish = true;
        }
      }).catch(res => {
        if (typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200) {
          console.log('请求失败了-----------------------')
          this.$message.error('数据获取失败或请求超时')
          this.$emit("closes", false)
          this.$router.go(-1)
          return false
        }
        // 如果是正在变更的数据，则进行弹框提示 不再继续往下进行其他操作
        if (res.response.data[0].msg == "该信息正在进行变更申请，不能进行变更操作") {
          //this.$message.error(res.response.data[0].msg)
          this.$alert(res.response.data[0].msg, {
            confirmButtonText: '确定',
            callback: action => {
              this.leaveSave = true; //不再做离开页面的弹框提示
              this.$emit("closes", false)
              this.$router.go(-1)
            }
          });

        } else {
          // 过滤数据库里传"NULL"的字段
          for (let i in res.response.data[0].data[0]) {
            if (res.response.data[0].data[0][i] == "NULL") {
              res.response.data[0].data[0][i] = ""
            }
          }

          // 如果是特困的数据 生活费为空时 自动将特困救助标准赋给生活费，否则用其原本的值
          if (res.response.data[0].data[0].ab_ex13 == '特困供养') {
            if (res.response.data[0].data[0].ab_ex200 == '') {
              res.response.data[0].data[0].ab_ex200 = this.tkStandard;
              this.ab_ex200 = res.response.data[0].data[0].ab_ex200;
              // console.log('特困标准 load=》',this.tkStandard);
            } else {
              this.ab_ex200 = res.response.data[0].data[0].ab_ex200
            }
          }
          console.log('特困标准 load=》', this.tkStandard);

          this.dibaoFormOld = JSON.parse(JSON.stringify(res.response.data[0].data));
          this.dibaoForm = res.response.data[0].data[0];
          this.common = res.response.data[0].common; //是增发类别，但是数据杂乱 貌似没什么用

          this.uploadImg.ab_ex10_img = res.response.data[0].data[0].ab_ex10.split(",");
          this.uploadImg.ab_ex16_img = res.response.data[0].data[0].ab_ex16.split(",");
          this.uploadImg.ab_ex73_img = res.response.data[0].data[0].ab_ex73.split(",");
          this.uploadImg.ab_ex74_img = res.response.data[0].data[0].ab_ex74.split(",");
          this.uploadImg.ab_ex97_img = res.response.data[0].data[0].ab_ex97.split(",");
          this.uploadImg.ab_ex98_img = res.response.data[0].data[0].ab_ex98.split(",");
          this.uploadImg.ab_ex166_img = res.response.data[0].data[0].ab_ex166.split(",");
          this.uploadImg.ab_ex167_img = res.response.data[0].data[0].ab_ex167.split(",");
          this.uploadImg.ab_ex177_img = res.response.data[0].data[0].ab_ex177.split(",");
          this.uploadImg.ab_ex196_img = res.response.data[0].data[0].ab_ex196.split(",");//自理能力状况评估报告
          this.uploadImg.ab_ex197_img = res.response.data[0].data[0].ab_ex197.split(",");//集中供养意愿书

          for (let i in this.uploadImg) {
            var r = this.uploadImg[i].filter(function (s) {
              return s && s.trim();
            });

            // console.log(r,"过滤数组");
            if (i == 'ab_ex10_img') {
              this.dibaoForm.ab_ex10 = r.join(",")
              this.uploadImg.ab_ex10_img = r;
            } else if (i == 'ab_ex16_img') {
              this.dibaoForm.ab_ex16 = r.join(",")
              this.uploadImg.ab_ex16_img = r;
            } else if (i == 'ab_ex73_img') {
              this.dibaoForm.ab_ex73 = r.join(",")
              this.uploadImg.ab_ex73_img = r;
            } else if (i == 'ab_ex74_img') {
              this.dibaoForm.ab_ex74 = r.join(",")
              this.uploadImg.ab_ex74_img = r;
            } else if (i == 'ab_ex97_img') {
              this.dibaoForm.ab_ex97 = r.join(",")
              this.uploadImg.ab_ex97_img = r;
            } else if (i == 'ab_ex98_img') {
              this.dibaoForm.ab_ex98 = r.join(",")
              this.uploadImg.ab_ex98_img = r;
            } else if (i == 'ab_ex166_img') {
              this.dibaoForm.ab_ex166 = r.join(",")
              this.uploadImg.ab_ex166_img = r;
            } else if (i == 'ab_ex167_img') {
              this.dibaoForm.ab_ex167 = r.join(",")
              this.uploadImg.ab_ex167_img = r;
            } else if (i == 'ab_ex177_img') {
              this.dibaoForm.ab_ex177 = r.join(",")
              this.uploadImg.ab_ex177_img = r;
            } else if (i == 'ab_ex196_img') {
              this.dibaoForm.ab_ex196 = r.join(",")
              this.uploadImg.ab_ex196_img = r;
            } else if (i == 'ab_ex197_img') {
              this.dibaoForm.ab_ex197 = r.join(",")
              this.uploadImg.ab_ex197_img = r;
            }
          }

          // 获取图片数量
          this.getImgNum()

          // 变更时间
          let dates = new Date();
          let y = dates.getFullYear();
          let M = dates.getMonth() + 1;
          let d = dates.getDate();
          let h = dates.getHours();
          let m = dates.getMinutes();
          let s = dates.getSeconds();
          let time = y + '-' + M + '-' + d + ' ' + h + ":" + m + ":" + s;
          this.changeM.ac_dat1 = time;
          // console.log(this.changeM.ac_dat1,'load变更时间'); 

          if (res.response.data[0].data[0].ab_ex46 != "") {
            this.ab_ex46 = res.response.data[0].data[0].ab_ex46.split(",");
          } else {
            this.ab_ex46 = [];//消除数组ab_ex46中的空元素
          }

          // //是否为村干部选项过滤--不是 "是"/"否"，清空
          // if(this.dibaoForm.ab_ex92!="" && (this.dibaoForm.ab_ex92!="是" || this.dibaoForm.ab_ex92!="否")){
          // 	this.dibaoForm.ab_ex92=""
          // }

          let xzqhArray = this.dibaoForm.ab_ex162.split(",");
          if (xzqhArray.length == 3) {
            this.$set(this.xzqhArray, 0, xzqhArray[0]);
            this.$set(this.xzqhArray, 1, xzqhArray[1]);
            this.$set(this.xzqhArray, 2, xzqhArray[2]);
            this.$set(this.test, "xzqhArray", xzqhArray);
            var cun = this.xzqhArray[2].split("#")[0]
            // console.log(cun);
          } else {
            this.xzqhArray = []
          }

          this.isFinish = true;
          if (this.xzqhArray[2]) {
            var cun = this.xzqhArray[2].split("#")[0]
            // console.log(cun);
            for (let i = 0; i < cun.length; i++) {
              if (i + 1 == cun.length && cun[i] == "村") { cun += "委会"; }
              if (i + 1 == cun.length && cun[i] == "区") { cun += "居委会"; }
            }
            this.xzqhArray[2] = cun + '#' + this.xzqhArray[2].split("#")[1]
          }

          // console.log(this.xzqhArray,'数据加载 区划')
        }

        //自定义预警预警信息
        this.loadWarning({
          sId: this.$route.query.sId,
        }).then(res => {
          // console.log(res)
          this.warningData = res[0].data
        }).catch(res => {
          if (typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200) {
            this.$message.error('数据获取失败或请求超时-预警')
            this.$emit("closes", false)
            this.$router.go(-1)
            return false
          }

          for (var i in res.response.data[0].data) {
            if (res.response.data[0].data[i].aw_dat1 == "1900-01-01 00:00:00.0") {
              res.response.data[0].data[i].aw_dat1 = "";
            }
          }
          // 过滤预警空数据
          this.warningData = res.response.data[0].data.filter((item, index, arr) => {
            return item.aw_dat1 != "" || item.aw_ex1 != "";
          })
          // 老数据
          this.warningDataOld = JSON.parse(JSON.stringify(this.warningData))

          // 初始显示一条数据
          if (this.warningData.length == 0) {
            this.warningData.push({
              aw_dat1: "",
              aw_ex1: ""
            })
          }
          // 老数据在这里没过滤
          // this.warningDataOld=JSON.parse(JSON.stringify(res.response.data[0].data))
        })

        // 成员信息
        this.loadFamily({
          sId: this.$route.query.sId,
          sType: 'Y',
        }).then(res => {
          console.log(res)
          this.familyData1 = res[0].data
        }).catch(res => {
          if (typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200) {
            console.log('请求失败了-----------------------3')
            this.$message.error('数据获取失败或请求超时3333')
            this.$emit("closes", false)
            this.$router.go(-1)
            return false
          }
          let familyRelation = [];
          var familyData = res.response.data[0].data;
          // console.log(res.response.data[0].data)
          for (let i in res.response.data[0].data) {
            // 户主关系过滤:
            if (res.response.data[0].data[i].abm_ex6 != 'C') {
              familyData[i].abm_ex1 = familyData[i].abm_ex1 == "户主本人" ? "户主" : familyData[i].abm_ex1;
              let familyResult = familyData[i].abm_ex1;

              // 如果数据返回的户主关系，与选项都不相同(如选项有户主，没有户主本人，但是返回的是户主本人)则清空户主关系
              familyRelation = (this.relation.filter((relationval) => { return familyResult == relationval }));
              if (familyRelation.length == 0) {
                res.response.data[0].data[i].abm_ex1 = "";
              }
            }

            if (res.response.data[0].data[i].abm_ex6 == 'Y') {
              this.familyData1Old.push(JSON.parse(JSON.stringify(res.response.data[0].data[i]))) //共同生活
              this.familyData1.push(res.response.data[0].data[i]) //共同生活
              // console.log(res.response.data[0].data[i]);
            } else if (res.response.data[0].data[i].abm_ex6 == 'N') {
              this.familyData2Old.push(JSON.parse(JSON.stringify(res.response.data[0].data[i])))
              this.familyData2.push(res.response.data[0].data[i]) //非共同生活

            } else if (res.response.data[0].data[i].abm_ex6 == 'B') {
              this.familyData3Old.push(JSON.parse(JSON.stringify(res.response.data[0].data[i])))
              this.familyData3.push(res.response.data[0].data[i]) //非共同生活赡抚养人信息

            } else if (res.response.data[0].data[i].abm_ex6 == 'C') {
              this.familyData4Old.push(JSON.parse(JSON.stringify(res.response.data[0].data[i])))
              this.familyData4.push(res.response.data[0].data[i]) //村干部、近亲属信息
            }
          }

          for (let i in this.familyData1) {
            // 身份证验证
            this.changeCard(i);
            // 健康状况检测-针对导入数据与本系统的选项不一致
            if (this.familyData1[i].abm_ex52 != '') {
              this.familyData1[i].abm_ex11 == '重病'
              if (this.familyData1[i].abm_ex51 == "") {
                this.$set(this.familyData1[i], "abm_ex51", "重病");
              }
            } else if (this.familyData1[i].abm_ex40 != '') {
              this.familyData1[i].abm_ex11 == '残疾'
              if (this.familyData1[i].abm_ex51 == "") {
                this.$set(this.familyData1[i], "abm_ex51", "残疾");
              }
            } else {
              this.familyData1[i].abm_ex11 == '健康'
            }
          }

          // // 兴化儿童
          // console.log(this.familyData1,"this.familyData1")//得出是否为工作年龄
          // for(let i in this.familyData1 ){
          // 	this.changeCard(i)
          // 	if(this.familyData1[i].abm_ex51 == '未成年人'){
          // 		this.childrenWarning.push(this.familyData1[i])
          // 		this.old_abm_ex71.push(this.familyData1[i].abm_ex71)
          // 	}
          // }
          // if(this.childrenWarning.length > 0 && this.dibaoForm.ab_ex161 == '兴化市' && ['低收入型低保'].includes(this.dibaoForm.ab_ex41) ){
          // 	this.showChildren = true;
          // }
          // console.log('儿童预警 =》',this.showChildren);

          // 收入
          this.getBasicIncome({
            sId: this.$route.query.sId,
          }).then(res => {
            // console.log(res);
            this.income = res[0].data;
            this.incomeOld = JSON.parse(JSON.stringify(res[0].data))
          }).catch(res => {
            if (typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200) {
              console.log('请求失败了-----------------------3')
              this.$message.error('数据获取失败或请求超时')
              this.$emit("closes", false)
              this.$router.go(-1)
              return false;
            }
            //工资性收入 ： A；经营：B；财产：C；转移：D；其他：E；必要就业：F；总：G
            var income1 = [];
            var income2 = [];
            var income3 = [];
            var income4 = [];
            var income5 = [];
            var income6 = [];
            var income7 = [];

            for (let i in res.response.data[0].data) {
              for (let j in res.response.data[0].data[i]) {
                res.response.data[0].data[i][j] = unescape(res.response.data[0].data[i][j])
              }
              // console.log(this.incomeOld);
              // console.log(Number(res.response.data[0].data[i].abi_ex2).toFixed(2));
              res.response.data[0].data[i].abi_ex2 = Number(res.response.data[0].data[i].abi_ex2).toFixed(2)

              if (res.response.data[0].data[i].abi_ex4 == 'A' && (res.response.data[0].data[i].abi_ex1 != "" || res.response.data[0].data[i].abi_ex2 != "")) {
                income1.push(res.response.data[0].data[i])
              }
              else if (res.response.data[0].data[i].abi_ex4 == 'B' && (res.response.data[0].data[i].abi_ex1 != "" || res.response.data[0].data[i].abi_ex2 != "")) {
                res.response.data[0].data[i].abi_ex1 = "经营性净收入"
                income2.push(res.response.data[0].data[i])
              }
              else if (res.response.data[0].data[i].abi_ex4 == 'C' && (res.response.data[0].data[i].abi_ex1 != "" || res.response.data[0].data[i].abi_ex2 != "")) {
                income3.push(res.response.data[0].data[i])
              }
              else if (res.response.data[0].data[i].abi_ex4 == 'D' && (res.response.data[0].data[i].abi_ex1 != "" || res.response.data[0].data[i].abi_ex2 != "")) {
                income4.push(res.response.data[0].data[i])
              }
              else if (res.response.data[0].data[i].abi_ex4 == 'E' && (res.response.data[0].data[i].abi_ex1 != "" || res.response.data[0].data[i].abi_ex2 != "")) {
                res.response.data[0].data[i].abi_ex1 = "其他收入"
                income5.push(res.response.data[0].data[i])
              }
              else if (res.response.data[0].data[i].abi_ex4 == 'F' && (res.response.data[0].data[i].abi_ex1 != "" || res.response.data[0].data[i].abi_ex2 != "")) {
                res.response.data[0].data[i].abi_ex1 = "必要就业成本抵扣"
                income6.push(res.response.data[0].data[i])
              }
              else if (res.response.data[0].data[i].abi_ex4 == 'G' && (res.response.data[0].data[i].abi_ex1 != "" || res.response.data[0].data[i].abi_ex2 != "")) {
                income7.push(res.response.data[0].data[i])
              }
            }
            // console.log(res.response.data[0].data,'收入');
            this.incomeOld = JSON.parse(JSON.stringify(res.response.data[0].data));
            this.income = res.response.data[0].data;
            // 深拷贝
            console.log(this.incomeOld, "接收后端收入数据old");
            // console.log(this.incomeOld.length,);
            // 分支收入汇总
            var income_all = income1.concat(income2).concat(income3).concat(income4).concat(income5).concat(income6);
            var abi_ex2_sum = 0; //分支收入总和
            var len = 0;
            // 新收入数据
            this.income1 = income1.length > 0 ? income1 : this.income1;
            this.income2 = income2.length > 0 ? income2 : this.income2;
            this.income3 = income3.length > 0 ? income3 : this.income3;
            this.income4 = income4.length > 0 ? income4 : this.income4;
            this.income5 = income5.length > 0 ? income5 : this.income5;
            this.income6 = income6.length > 0 ? income6 : this.income6;

            // 错的
            // this.income1 = income1;
            // this.income2 = income2;
            // this.income3 = income3;
            // this.income4 = income4;
            // this.income5 = income5;
            // this.income6 = income6;
            // this.income = income.length > 0 ? income:this.income;

            // 老收入
            this.income1Old = income1;
            this.income2Old = income2;
            this.income3Old = income3;
            this.income4Old = income4;
            this.income5Old = income5;
            this.income6Old = income6;

            // 对所有的收入进行累计
            if (income_all.length > 0) {
              for (let i in income_all) {
                if (income_all[i].abi_ex2 != "" && !isNaN(Number(income_all[i].abi_ex2))) {
                  abi_ex2_sum += Number(income_all[i].abi_ex2);
                  len++;
                } else if (len == 0) {
                  abi_ex2_sum = 0.00;
                }
              }
            }
            console.log(income_all, '所有收入分支');
            console.log(abi_ex2_sum, '分支收入总和');



            if (income_all.length > 0) {
              var amt = abi_ex2_sum;
              this.income7[0].abi_ex1 = "总收入";
              this.income7[1] = { abi_ex1: "家庭月平均收入" };
              this.income7[2] = { abi_ex1: "家庭月人均收入" };
              this.income7[0].abi_ex2 = Number(amt).toFixed(2)
              this.income7[1].abi_ex2 = Number(amt / 12).toFixed(2)
              // console.log("总收入有值",this.income7);
              // this.income7[0].abi_ex2=666.6
              // console.log("总收入有值，计算月均"+amt);

              if (this.familyData1.length > 0) {
                // console.log("收入计算",this.familyData1.length);
                var income7_2 = Number(amt / 12 / this.familyData1.length).toFixed(2);
                this.income7[2].abi_ex2 = income7_2;
              } else {
                console.log("月人均收入为零，因为家庭人口为", this.familyData1.length);
                this.income7[2].abi_ex2 = "0.00";
              }
            }
            else if (income7.length > 0) {
              this.income7 = income7;
              this.income7Old = income7;
              this.income7[0].abi_ex1 = "总收入";
              this.income7[1] = { abi_ex1: "家庭月平均收入" };
              this.income7[2] = { abi_ex1: "家庭月人均收入" };
              this.income7[1].abi_ex2 = (this.income7[0].abi_ex2 / 12).toFixed(2);
              if (this.familyData1.length < 1) {
                this.income7[2].abi_ex2 = 0.00;
              } else {
                this.income7[2].abi_ex2 = (income7[0].abi_ex2 / 12 / this.familyData1.length).toFixed(2);
              }
            } else {
              this.income7[0].abi_ex1 = "总收入";
              this.income7[1].abi_ex1 = "家庭月平均收入";
              this.income7[2].abi_ex1 = "家庭月人均收入";
              this.income7[0].abi_ex2 = "0.00";
              this.income7[1].abi_ex2 = "0.00";
              this.income7[2].abi_ex2 = "0.00";
            }

            for (let i in this.incomeOld) {
              // 将原来的收入id 赋值给新的收入id
              if (this.incomeOld[i].abi_ex1 == "总收入") {
                this.income7[0].abi_id = this.incomeOld[i].abi_id;
              }
            }
            // console.log(this.incomeOld,"old");
            // console.log(this.incomeOld.length,"old长度");

            //生活费计算
            // console.log(this.familyData1.length);
            if (this.familyData1.length > 0 && this.dibaoForm.ab_ex13 == '特困供养') {
              this.$set(this.dibaoForm, "ab_ex200", this.ab_ex200);
            }
          })
          // 刚性支出
          this.loadPay({
            sId: this.$route.query.sId,
          }).then(res => {
            if (res[0].data.length > 0) {
              this.pay = res[0].data3;
            }
            this.payOld = JSON.parse(JSON.stringify(res[0].data))
          }).catch(res => {
            let pay = [];
            let zzc = 0.00;

            if (res.response.data[0].data3[0]) {
              pay = JSON.parse(JSON.stringify(res.response.data[0].data3[0]));
            }

            if (res.response.data[0].data3.length == 0) {
              this.pay.abp_ex4 = '';
              this.pay.abp_ex5 = '';
              this.pay.abp_ex6 = '';
              this.pay.abp_ex7 = '';
              this.pay.abp_ex8 = '0.00';
              this.pay.abp_ex9 = '0.00';
              this.pay.abp_ex10 = '0.00';
              this.pay.abp_ex11 = '';
              this.payOld = [];
            } else {
              this.payOld = JSON.parse(JSON.stringify(res.response.data[0].data3[0]));

              // 过滤支出空数据，将有数据的支出类别进行累加
              Object.keys(pay).filter(function (value) {

                // if([value]=="abp_ex4" || [value]=="abp_ex5" || [value]=="abp_ex6" || [value]=="abp_ex7" ||[value]=="abp_ex11"){
                if (["abp_ex4", "abp_ex5", "abp_ex6", "abp_ex7", "abp_ex11"].includes([value])) {
                  if (isNaN(Number(pay[value])) == false) {
                    zzc += Number(pay[value]);
                  }
                }
                return zzc
              })

              // console.log(res.response.data[0],"---------pay")
              this.pay = JSON.parse(JSON.stringify(res.response.data[0].data3[0]))

              if (this.pay.abp_ex8 == "" || this.pay.abp_ex8 == 0) {
                this.pay.abp_ex8 = Number(zzc).toFixed(2);
              }

              this.pay.abp_ex8 = Number(this.pay.abp_ex8).toFixed(2);
              this.pay.abp_ex9 = (Number(this.income7[0].abi_ex2) - Number(this.pay.abp_ex8)).toFixed(2);
              this.pay.abp_ex10 = this.familyData1.length < 1 ? Number(0).toFixed(2) : Number(this.pay.abp_ex9 / this.familyData1.length).toFixed(2);
              this.payOld2 = JSON.parse(JSON.stringify(res.response.data[0].data3[0]));

              // if(this.familyData1.length<1){
              // this.pay.abp_ex10 =  Number(0).toFixed(2);
              // }else{
              // 	console.log("lengt>0")
              // 	this.pay.abp_ex10 = Number(this.pay.abp_ex9 / this.familyData1.length).toFixed(2);
              // }
            }

            console.log(res.response.data[0], "---------pay")
            console.log(this.payOld, "---------this.payOld")
            console.log(this.payOld2, "---------this.payOld2")
          })
        })
      })
      // 家庭财产
      this.loadEstate({
        sId: this.$route.query.sId,
      }).then(res => {
        // console.log(res)
        this.estate1 = res[0].data
        this.estate2 = res[0].data2
        this.estate1Old = JSON.parse(JSON.stringify(res[0].data))
        this.estate2Old = JSON.parse(JSON.stringify(res[0].data2))
      }).catch(res => {
        if (typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200) {
          console.log('请求失败了-----------------------6')
          this.$message.error('数据获取失败或请求超时666')
          this.$emit("closes", false)
          this.$router.go(-1)
          return false
        }
        // console.log(res.response.data[0].data);
        let estate1 = [];
        let estate2 = [];
        for (let i in res.response.data[0].data) {
          if (res.response.data[0].data[i].abe_ex7 == '车船') {
            this.estate1.push(res.response.data[0].data[i])
            this.estate1Old.push(JSON.parse(JSON.stringify(res.response.data[0].data[i])))
          } else {
            this.estate2.push(res.response.data[0].data[i])
            this.estate2Old.push(JSON.parse(JSON.stringify(res.response.data[0].data[i])))
          }
        }
        if (estate1.length > 0 || estate2.length > 0) {
          this.estate1 = estate1;
          this.estate2 = estate2;
        }
      })

      //加载代理人信息
      this.loadAgent({
        "sId": this.$route.query.sId,
      }).then(res => {
        this.agentInfo = res[0].data;
        this.uploadImg.aba_ex4_img = this.agentInfo.aba_ex4.split(",");
        this.uploadImg.aba_ex5_img = this.agentInfo.aba_ex5.split(",");
      }).catch(res => {
        if (typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200) {
          this.$message.error('数据获取失败或请求超时666')
          this.$emit("closes", false)
          this.$router.go(-1)
          return false
        }
        this.agentInfo = res.response.data[0].data;
        this.uploadImg.aba_ex4_img = this.agentInfo.aba_ex4.split(",");
        this.uploadImg.aba_ex5_img = this.agentInfo.aba_ex5.split(",");
        for (let i in this.uploadImg) {
          var r = this.uploadImg[i].filter(function (s) {
            return s && s.trim();
          });
          if (i == 'aba_ex4_img') {
            this.agentInfo.aba_ex4 = r.join(",")
          } else if (i == 'aba_ex5_img') {
            this.agentInfo.aba_ex5 = r.join(",")
          }
        }
        this.getImgNum()
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
    },

    //清空近亲属
    changeFm4 (ab_ex92) {
      if (ab_ex92 == "否") {
        console.log('清空近亲属 old=>', this.familyData4Old);
        console.log('核减列表 deletedReason before=>', this.deletedReason);

        if (this.deletedReason.length > 0) {
          for (let j in this.deletedReason) {
            if (this.deletedReason[j].from == '近亲属') {
              this.deletedReason.splice(j, 1)
            }
          }
        }
        for (let i in this.familyData4Old) {
          console.log(this.familyData4Old[i].abm_ex3);
          var deletedReason = { name: '', from: '近亲属', reason: '' };
          deletedReason.name = this.familyData4Old[i].abm_ex3;
          this.deletedReason.push(deletedReason);
        }
        this.familyData4 = [];
        console.log('核减列表 deletedReason after=>', this.deletedReason);
        console.log('清空近亲属 new=>', this.familyData4);
      }
    },

    // 给familyData1添加序号便于操作
    rowClassName ({ row, rowIndex }) {
      row.xh = rowIndex + 1;
    },

    handleWarningData (selection) {
      this.checkedWarningData = selection;
    },

    // 获取FamilyData1被选中的
    handleFamilyData1 (selection) {
      this.checkedFamilyData1 = selection;
    },
    // 获取FamilyData2被选中的
    handleFamilyData2 (selection) {
      this.checkedFamilyData2 = selection;
    },
    // 获取FamilyData2被选中的
    handleFamilyData3 (selection) {
      this.checkedFamilyData3 = selection;
    },
    // 获取FamilyData4被选中的
    handleFamilyData4 (selection) {
      this.checkedFamilyData4 = selection;
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
    // 获取Estate1被选中的
    handleEstate1 (selection) {
      this.checkedEstate1 = selection;
    },
    // 获取Estate2被选中的
    handleEstate2 (selection) {
      this.checkedEstate2 = selection;
    },
    handleLandInfoData (selection) {
      this.checkedLandInfo = selection;
    },
    // 根据str找table添加行
    handleAddDetails (str) {
      let obj = {};

      // 自定义预警
      if (str == 'warningData') {
        if (this.warningData == undefined) {
          this.warningData = new Array();
        }
        obj = {
          aw_ex1: '',
          aw_dat1: '',
        };
        this.warningData.push(obj);
        console.log('预警', this.warningData);
      }

      // 共同生活
      if (str == 'familyData1') {
        if (this.familyData1 == undefined) {
          this.familyData1 = new Array();
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
        this.familyData1.push(obj);
      }
      if (str == 'familyData2') {
        if (this.familyData2 == undefined) {
          this.familyData2 = new Array();
        }
        obj = {
          abm_ex1: '',
          abm_ex3: '',
          abm_ex2: '',
          abm_ex2: '',
          abm_ex6: 'N',
          abm_ex11: '',
          abm_ex15: '',
          abm_ex20: '',
          abm_ex17: '',
          abm_ex18: '',
          abm_ex49: '',
        };
        this.familyData2.push(obj);
      }
      // 非共同生活家庭成员
      if (str == 'familyData3') {
        console.log("非共同赡抚养人数", this.familyData2.length);
        let flag = false;
        let message = false;
        if (this.familyData2.length > 0) {

          this.familyData2.forEach((item, i) => {
            if (this.familyData2[i].abm_ex3 && this.familyData2[i].abm_ex1 && this.familyData2[i].abm_ex2 && this.familyData2[i].abm_ex11) {
              if (flag == false) {
                if (this.familyData3 == undefined) {
                  this.familyData3 = new Array();
                }
                obj = {
                  abm_ex1: '',
                  abm_ex3: '',
                  abm_ex6: 'B',
                  abm_ex2: '',
                };
                this.familyData3.push(obj);
                flag = true;
              }
            } else {
              if (flag == false && message == false) {
                message = true;
                this.$message.warning("请先添加非共同生活抚养人信息....");
                return false;
              }
            }
          })

        } else {
          console.log("提示添加非共同生活抚养人");
          this.$message.warning("请先添加非共同生活抚养人信息");
          return false;
        }
      }

      // 村干部、近亲属
      if (str == 'familyData4') {
        if (this.familyData4 == undefined) {
          this.familyData4 = new Array();
        }
        obj = {
          abm_ex1: '',
          abm_ex3: '',
          abm_ex6: 'C',
          abm_ex15: ''
        };
        this.familyData4.push(obj);
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

      // 车船信息
      if (str == 'estate1') {
        if (this.estate1 == undefined) {
          this.estate1 = new Array();
        }
        obj = {
          abe_ex1: '',
          abe_ex2: '',
          abe_ex3: '',
          abe_ex4: '',
          abe_ex7: '车船',
          abe_ex8: '',
        };
        this.estate1.push(obj);
      }
      if (str == 'estate2') {
        if (this.estate2 == undefined) {
          this.estate2 = new Array();
        }
        obj = {
          abe_ex1: '',
          abe_ex2: '',
          abe_ex4: '',
          abe_ex5: '',
          abe_ex6: '',
          abe_ex7: '房屋',
          abe_ex11: '',
        };
        this.estate2.push(obj);
      }

      if (str == 'landInfo') {
        if (this.landInfo == undefined) {
          this.landInfo = new Array();
        }
        obj = {
          abl_id: '',
          abl_ex1: '',
          abl_ex2: '',
          abl_ex3: '',
          abl_ex4: '',
          abl_ex5: ''
        };
        this.landInfo.push(obj);
      }
      this.changeAmt()
    },
    // 根据str找table删除选中行
    handleDelDetails (str) {
      let obj;
      let old;
      if (str == 'warningData') {
        obj = this.checkedWarningData;
        old = this.warningData;
        if (obj.length > 0) {
          obj.forEach((v1, i1) => {
            old.forEach((v2, i2) => {
              if (v1.xh == v2.xh) {
                old.splice(i2, 1)
              }
            })
          })
        }
        console.log("删除选中预警", this.warningData);
      }

      if (str == 'familyData1') {
        obj = this.checkedFamilyData1;
        old = this.familyData1;
        if (obj.length > 0) {
          obj.forEach((v1, i1) => {
            // 共同生活核减检测
            this.deletedReason.push({ name: v1.abm_ex3, from: '共同生活', reason: '', ac_id: v1.abm_id })
            old.forEach((v2, i2) => {
              if (v1.xh == v2.xh) {
                old.splice(i2, 1)
              }
            })
          })
        }
      }
      if (str == 'familyData2') {
        obj = this.checkedFamilyData2;
        old = this.familyData2;
        if (obj.length > 0) {
          obj.forEach((v1, i1) => {
            // 非共同生活核减检测
            this.deletedReason.push({ name: v1.abm_ex3, from: '非共同生活', reason: '', ac_id: v1.abm_id })
            old.forEach((v2, i2) => {
              if (v1.xh == v2.xh) {
                old.splice(i2, 1)
              }
            })
          })
        }
      }
      if (str == 'familyData3') {
        obj = this.checkedFamilyData3;
        old = this.familyData3;
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
      if (str == 'familyData4') {
        obj = this.checkedFamilyData4;
        old = this.familyData4;
        if (obj.length > 0) {
          obj.forEach((v1, i1) => {
            // 近亲属核减检测
            this.deletedReason.push({
              name: v1.abm_ex3,
              from: '近亲属',
              reason: '',
              ac_id: v1.abm_id
            })
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
      if (str == 'estate1') {
        obj = this.checkedEstate1;
        old = this.estate1;
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
      if (str == 'estate2') {
        obj = this.checkedEstate2;
        old = this.estate2;
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
      if (str == 'landInfo') {
        obj = this.checkedLandInfo;
        old = this.landInfo;
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
      console.log(this.deletedReason, '减 成员核减');
      // 重新计算收入支出
      this.changeAmt()
    },
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
      // 支出计算
      this.changeAmt();
      // 资产
      if (id == "pay.abp_ex8") {
        this.pay.abp_ex8 = key.replace(/\s+/g, "");
        msg = isNum(key, id);
        if (msg != true) {
          this.$message.warning(msg);
          this.isSaves = false;
          return false;
        }
      }
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
      this.isShow17 = true
      this.isShow18 = true
      this.isShow21 = true
      this.isShow22 = true

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
      } else if (n == 17) {
        this.isShow17 = false
      } else if (n == 18) {
        this.isShow18 = false
      } else if (n == 21) {
        this.isShow21 = false
      } else if (n == 22) {
        this.isShow22 = false
      }
    },

    //获取供养机构   机构id赋值
    getSupportinst () {
      const narr = this.supportinstList.filter(item => (item.abs_ex1 == this.dibaoForm.ab_ex195));
      this.dibaoForm.ab_ex201 = narr[0].abs_id;
      console.log('供养机构名称=》', this.dibaoForm.ab_ex195);
      console.log('供养机构对象=》', narr);
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
        this.supportinstList = res.response.data;
        console.log('getSupportinstList=>', res.response.data);
        console.log(this.supportinstList);
      })
    },

    // 返回按钮
    closeView () {
      this.$emit("closes", false)
      this.$router.go(-1)
      if (process.env.NODE_ENV != "development") {
        this.$router.go(-1);
      }
    },

    // 给子组件传递图片下标
    getImgIndex (item) {
      let data = JSON.parse(item);
      this.imgIndex[data.id] = data.index;
    },

    // 获取图片数量
    getImgNum () {
      for (let key in this.uploadImg) {
        if (this.uploadImg[key][0] == '') {
          this.uploadImg[key].length = 0;
          this.imgNum[key] = this.uploadImg[key].length;
        } else {
          this.imgNum[key] = this.uploadImg[key].length;
        }
      }
      console.log(this.imgNum, '图片数量');
    },

    handleRemove (file, str) {

      console.log(str, '照片删除');

      this.$confirm('是否删除该图片？', "提示", {
        // distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {

        this.$delete(this.uploadImg[str + "_img"], this.imgIndex[str]);

        if (str + "_img" == "aba_ex4_img" || str + "_img" == "aba_ex5_img") {

          this.agentInfo[str] = this.uploadImg[str + "_img"].join(",");
        } else {
          this.dibaoForm[str] = this.uploadImg[str + "_img"].join(",");
        }

        this.getImgNum()
      }).catch(action => {
        // 取消留在本页
        console.log("留在本页");
      });
    },
    handlePictureCardPreview (file) {
      this.dialogImageArray = file;
      this.dialogImageUrl = file[0];
      this.dialogVisible = true;
    },

    // 上传图片
    uploads (id, dataName) {
      console.log(id, dataName, "================");
      // 过滤身份证照片
      //this.dibaoForm.ab_ex10.split(",")--(result)  是有空值的数组

      //r是处理好的数组
      if (this[dataName][id] == null) this[dataName][id] = "";
      var r = this[dataName][id].split(",").filter(function (s) {
        return s && s.trim();
      });

      this[dataName][id] = r.toString();
      this.dialogVisible3 = true;
      this.uploadId = id;
      this.uploadDataName = dataName;
      // console.log(this.uploadDataName);
      try {
        console.log(this.$refs.myUpload);
        this.$refs.myUpload.clears();
      } catch (e) { }
    },

    uploadEvent (data) {
      // console.log(data);
      let val = this[this.uploadDataName][this.uploadId];
      val = val == "" ? data : val + "," + data;
      this[this.uploadDataName][this.uploadId] = val;
    },

    uploadEvent2 () {
      this.uploadImg[this.uploadId + "_img"] = this[this.uploadDataName][this.uploadId].split(",");
      this.uploadDataName = null;
      this.getImgNum();
      console.log(this.uploadImg);
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

      // 资产
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

    // 预警检测
    changeAmt2 (j, row, id) {
      if (this.warningData.length > 0) {
        for (var i = 0; i < this.warningData.length; i++) {
          var index = Number(i) + 1;
          var aw_dat1 = this.warningData[i].aw_dat1;
          // 自动添加预警时间
          if (this.warningData[i].aw_ex1 != "" && (aw_dat1 == "" || aw_dat1 == null)) {
            this.warningData[i].aw_dat1 = this.getTimeFn();
          }
          // 预警提示
          if (this.warningData[i].aw_ex1 == "" && (aw_dat1 == null || aw_dat1 == "")) {
            continue;
          } else if (this.warningData[i].aw_ex1 != "" && (aw_dat1 == null || aw_dat1 == "")) {
            this.$message.warning("请选择预警" + (index) + "的时间");
            return false;
          } else if (this.warningData[i].aw_ex1 == "" && (aw_dat1 != null || aw_dat1 != "")) {
            this.$message.warning("请将预警" + (index) + "的内容补充完整");
            return false;
          }

          // 预警格式验证
          var msg = ""
          if (id == "warning.aw_ex1") {
            console.log(this.warningData, j);
            this.warningData[j].aw_ex1 = row.aw_ex1.replace(/\s+/g, "");
            msg = warningContent(row.aw_ex1, id, j);
            if (msg != true) {
              this.$message.warning(msg);
              this.isSaves = false;
              return false;
            }
          }
        }
      }
    },

    //设置默认时间--预警时间默认为选择当天 （的第十天——取消）
    getTimeFn () {
      let dates = new Date()
      let y = dates.getFullYear()
      let m = dates.getMonth() + 1
      let d = dates.getDate()
      // let d = dates.getDate()+10
      // if(m==2&&d>28){
      // 	m=dates.getMonth() + 2
      // 	d=dates.getDate()+10-28
      // }else if((m==4||m==6||m==9||m==11)&&d>30){
      // 		m=dates.getMonth() + 2
      // 		d=dates.getDate()+10-30
      // }else{
      // 	m=dates.getMonth() + 2
      // 	d=dates.getDate()+10-31
      // }
      // let time = y + '-' + m + d

      let time = y + '-' + m + '-' + d;
      //  console.log(time)
      return time
    },

    // 健康状况
    changeMember (index) {
      let item = this.familyData1[index];
      if (item.abm_ex11 == "重病") {
        item.abm_ex39 = "";
        item.abm_ex40 = "";
        if (item.age < 60 && item.age >= 18)
          this.$set(this.familyData1[index], "abm_ex51", "重病");

      } else if (item.abm_ex11 == '残疾') {
        item.abm_ex52 = "";
        if (item.age < 60 && item.age >= 18)
          this.$set(this.familyData1[index], "abm_ex51", "重残");
      } else {
        item.abm_ex39 = "";
        item.abm_ex40 = "";
        item.abm_ex52 = "";
      }
      this.changeAmt();
      this.tddx(index)
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
      this.dibaoForm.ab_ex46 = this.ab_ex46.toString();//求助原因字段

      // 家庭收入
      var ab_ex5 = Number(this.dibaoForm.ab_ex5);
      var abi_ex2_1 = 0;
      var abi_ex2_2 = 0;
      var abi_ex2_3 = 0;
      var abi_ex2_4 = 0;
      var abi_ex2_5 = 0;
      var abi_ex2_6 = 0;
      var len = 0;

      for (let i in this.income1) {
        if (this.income1[i].abi_ex2 != "" && !isNaN(Number(this.income1[i].abi_ex2))) {
          len++;
          abi_ex2_1 += Number(this.income1[i].abi_ex2)
        } else if (len == 0) {
          abi_ex2_1 = 0;
        }
      }

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
      }

      for (let i in this.income5) {
        if (this.income5[i].abi_ex2 != "" && !isNaN(Number(this.income5[i].abi_ex2))) {
          len++;
          abi_ex2_5 += Number(this.income5[i].abi_ex2);
        } else if (len == 0) {
          abi_ex2_5 = 0;
        }
      }

      for (let i in this.income6) {
        if (this.income6[i].abi_ex2 != "" && !isNaN(Number(this.income6[i].abi_ex2))) {
          len++;
          abi_ex2_6 += Number(this.income6[i].abi_ex2);
        } else if (len == 0) {
          abi_ex2_6 = 0;
        }
      }
      // 各项收入为零则可输入总收入
      var amt = abi_ex2_1 != "" || abi_ex2_2 != "" || abi_ex2_3 != "" || abi_ex2_4 != "" || abi_ex2_5 != "" || abi_ex2_5 != "" ? abi_ex2_1 + abi_ex2_2 + abi_ex2_3 + abi_ex2_4 + abi_ex2_5 - abi_ex2_6 : this.income7[0].abi_ex2;
      amt = abi_ex2_1 + abi_ex2_2 + abi_ex2_3 + abi_ex2_4 + abi_ex2_5 - abi_ex2_6;

      this.income7[0].abi_ex2 = (amt).toFixed(2);
      this.income7[1].abi_ex2 = (amt / 12).toFixed(2);

      var income72 = {} //家庭月人均收入
      if (this.familyData1.length > 0) {
        income72.abi_ex2 = (amt / 12 / this.familyData1.length).toFixed(2);
        income72.abi_ex1 = '家庭月人均收入';
        this.income7.splice(2, 1, income72)
      } else {
        this.income7[2].abi_ex2 = "0.00";
      }
      var illness = 0;   //重病
      var disability = 0;  //殘疾
      var children = 0;   //未成年
      if (this.familyData1.length > 0) {
        for (let j = 0; j < this.familyData1.length; j++) {
          if (this.familyData1[j].abm_ex11 == "残疾") {
            if (['一级', '一级残疾', '二级', '二级残疾'].includes(this.familyData1[j].abm_ex40)) {
              disability++;
            } else if (['精神残疾', '智力残疾', '精神', '智力'].includes(this.familyData1[j].abm_ex39) && ['三级', '三级残疾'].includes(this.familyData1[j].abm_ex40)) {
              disability++;
            }
          }
          if (this.familyData1[j].abm_ex11 == "重病") {
            illness++;
          }
          if (this.familyData1[j].age < 18) {
            children++;
          }
        }
        // this.income7[2].abi_ex2=(amt/12/this.familyData1.length).toFixed(2); //月人均
        this.jisuan.familyNum = (this.familyData1.length)  //总人口
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
      if (this.familyData2.length > 0) {
        this.jisuan.familyFD = (this.familyData2.length)  //法定
      } else {
        this.jisuan.familyFD = 0;
      }
      // console.log(this.familyData1.length,"this.familyData1.length")

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
      if (this.familyData1.length == 0) {
        // console.log("length==0")
        this.jisuan.familyAmt = 0.00; //总收入
        this.jisuan.familyZzc = 0.00;	//总支出
        this.pay.abp_ex10 = Number(this.pay.abp_ex9 / 1).toFixed(2);
        this.income7[2].abi_ex2 = Number(amt / 12 / 1).toFixed(2); //月人均

      } else {
        // console.log("lengt>0")
        this.jisuan.familyAmt = amt.toFixed(2)  //总收入
        this.jisuan.familyZzc = Number(zzc).toFixed(2)	//总支出
        this.pay.abp_ex10 = Number(this.pay.abp_ex9 / this.familyData1.length).toFixed(2);
        this.income7[2].abi_ex2 = Number(amt / 12 / this.familyData1.length).toFixed(2); //月人均
      }
      // this.income7
      for (let i in this.income) {

        if (this.income[i].abi_ex1 == "总收入") {
          this.income7[0].abi_id = this.income[i].abi_id;
        }
        // if(this.income[i].abi_ex1=="家庭月平均收入"){
        // 	this.income7[1].abi_id=this.income[i].abi_id
        // }
        // if(this.income[i].abi_ex1=="家庭月人均收入"){deleted
        // 	this.income7[2].abi_id=this.income[i].abi_id
        // }
      }
      // console.log(this.income7,'income7');
      // console.log(this.income7Old,"income7Old");
      // console.log(this.incomeOld,"incomeOld");

      // if( children>0 && this.jsjg[0]!="儿童救助"){
      // 	this.jsjg.push(this.kxsjz[0]); //困境儿童
      // }
      // console.log(this.jsjg,"救助计算结果");

      // 儿童预警检测
      // this.changeChildren();
    },

    // 核减原因填报保存
    async saveDeletedReason (data) {
      var data1 = this.deletedReason;


      var isSave = true;
      console.log('核减原因=》', data1);

      // isTest 数据核验  false校验，true不校验
      if (!this.isTest) {
        // 基础信息填写验证
        this.$refs['dibaoForm'].validate((valid) => {
          if (valid) { }
          else { return false; }
        });

        let msgs = this.validate();
        if (msgs) {
          this.$message.warning(msgs);
          return false;
        }

        //基本信息-家庭人口-输入类型判断
        if (Number.isNaN(Number(this.dibaoForm.ab_ex5)) || this.dibaoForm.ab_ex5 == 0) {
          // console.log(Number.isNaN(this.dibaoForm.ab_ex5),"条件1-家庭人口非数字")
          // console.log(this.dibaoForm.ab_ex5==0,"条件2-家庭人口为0")
          this.$message.warning("家庭人口数应大于0");
          return false;
        }

        // 基础信息填写格式验证
        // console.log(this.dibaoForm);
        for (let i in this.dibaoForm) {
          //正则验证的时候只能是字符型，所以正则验证的时候要先转为字符串 
          this.dibaoForm[i] = this.dibaoForm[i].toString()
          if (this.keyVerification(this.dibaoForm[i], i) == false) {
            isSave = false;
            this.isSaves = false;
            return false;
          }
        }
        // 检测求助原因是否有非选项内容
        if (this.ab_ex46.length > 0) {
          console.log("求助原因", this.ab_ex46);
          for (var i in this.ab_ex46) {
            var ab_ex46 = this.ab_ex46[i];
            var help_reason_arr = this.help_reason_list.filter((value) => { return value == ab_ex46 })
            // console.log(help_reason_arr,"求助原因数组");
            if (help_reason_arr.length == 0) {
              this.$message.warning("基础信息：求助原因，不能有除求助列表以外的字符");
              this.isSaves = false;
              return false;
            }
          }
        }
        //是否为村干部选项过滤--不是 "是"/"否"，清空
        if (this.dibaoForm.ab_ex92 != "") {
          if (this.dibaoForm.ab_ex92 != "是" && this.dibaoForm.ab_ex92 != "否") {
            this.$message.warning("基础信息：是否属于村干部或经办人员近亲属，只能选择 '是' 或 '否'");
            this.isSaves = false;
            return false;
          }
        }
        // console.log(this.dibaoForm.ab_ex92+"近亲属","长度为:"+this.familyData4.length);
        if (this.familyData4.length == 0 && this.dibaoForm.ab_ex92 == "是") {
          this.$message.warning("村干部或经办人员近亲属信息不能为空");
          this.isSaves = false;
          return false;
        } else if (this.familyData4.length > 0 && this.dibaoForm.ab_ex92 == "是") {
          // 近亲属选择"是"，近亲属成员信息必填
          for (let i in this.familyData4) {
            // this.familyData4[i].abm_ex6 = "C"
            for (let j in this.familyData4[i]) {
              if (this.keyVerification2(i, this.familyData4[i], "f4." + j) == false) {
                this.isSaves = false;
                return false;
              }
            }
            let abm_ex1 = this.familyData4[i].abm_ex1;
            let abm_ex3 = this.familyData4[i].abm_ex3;
            let abm_ex15 = this.familyData4[i].abm_ex15;

            if (!abm_ex3 && !abm_ex1 && !abm_ex15 && this.dibaoForm.ab_ex92 == "是") { //近亲属选择"是"，近亲属成员信息必填
              this.$message.warning("请将第" + (Number(i) + 1) + "行的村干部或近亲属信息补充完整");
              this.isSaves = false;
              return false;
            } else if (abm_ex3 && abm_ex1 && abm_ex15) {
              console.log('都填了跳过');
            } else {
              this.$message.warning("请将第" + (Number(i) + 1) + "行的村干部或近亲属信息补充完整");
              this.isSaves = false;
              return false;
            }
          }
        }
        // 验证户主身份证格式
        if (this.dibaoForm.ab_ex7) {
          this.dibaoForm.ab_ex7 = this.dibaoForm.ab_ex7.replace(/x$/i, "X");
          let msg = isCardID(this.dibaoForm.ab_ex7);
          if (msg != true) {
            this.$message.warning("申请人" + msg);
            this.isSaves = false;
            return false;
          }
        }
        // 变更理由
        if (this.changeM.ac_ex10 == "") {
          this.$message.warning("请填报变更理由说明");
          return false;
        }
        console.log(this.changeM.ac_dat1, '请填报变更时间');
        if (this.changeM.ac_dat1 == null || this.changeM.ac_dat1 == '') {
          this.$message.warning("请填报变更时间");
          return false;
        }
        if (this.familyData1.length == 0) {
          this.$message.warning("请输入共同生活家庭成员");
          return false;
        }
        var nameSame = 0;
        var IDCardSame = 0;
        // 共同家庭成员没填全保存不了
        if (this.familyData1.length != this.dibaoForm.ab_ex5) {
          this.$message.warning("家庭人口数与实际填报共同生活成员数不符，请重新填报");
          this.isSaves = false;
          return false;
        } else if (this.familyData1.length > 0) {
          // 共同家庭成员没填全保存不了
          let huzhu = 0;
          var isSpecial_1 = ''; //未成年、老年 特定对象
          var isSpecial_2 = ''; //未成年、老年 特定对象
          var haveOld = false;
          var haveYoung = false;

          for (let i in this.familyData1) {
            for (let j in this.familyData1[i]) {
              if (this.keyVerification2(i, this.familyData1[i], "f1." + j) == false) {
                this.isSaves = false
                return false;
              }
            }
            this.familyData1[i].abm_ex6 = "Y"
            let age = this.familyData1[i].age;
            let abm_ex1 = this.familyData1[i].abm_ex1;
            let abm_ex2 = this.familyData1[i].abm_ex2;
            let abm_ex3 = this.familyData1[i].abm_ex3;
            let abm_ex16 = this.familyData1[i].abm_ex16;
            let abm_ex7 = this.familyData1[i].abm_ex7;
            let abm_ex28 = this.familyData1[i].abm_ex28;
            let abm_ex11 = this.familyData1[i].abm_ex11;
            let abm_ex51 = this.familyData1[i].abm_ex51;
            let abm_ex52 = this.familyData1[i].abm_ex52;
            let abm_ex39 = this.familyData1[i].abm_ex39;
            let abm_ex40 = this.familyData1[i].abm_ex40;
            let abm_ex49 = this.familyData1[i].abm_ex49;
            let abm_ex14 = this.familyData1[i].abm_ex14;
            let abm_ex15 = this.familyData1[i].abm_ex15;
            let index = Number(i) + 1;

            if (!abm_ex3 && !abm_ex1 && !abm_ex16 && !abm_ex7 && !abm_ex28 && !abm_ex2 && !abm_ex11 && !abm_ex14 || this.familyData1.length != this.dibaoForm.ab_ex5) {
              // console.log('都没填跳过');
              this.$message.warning("请完善第" + (index) + "行成员信息");
              this.isSaves = false;
              return false;
            } else {
              // console.log('是否为劳动年龄'+this.familyData1[i].work)
              if (!abm_ex3) {
                this.$message.warning("请填写第" + (index) + "行共同家庭成员姓名");
                this.isSaves = false;
                return false;
              } else if (!abm_ex1) {
                this.$message.warning("请选择第" + (index) + "行共同家庭成员与户主的关系");
                this.isSaves = false;
                return false;
              } else if (!abm_ex2 || abm_ex2) {
                this.familyData1[i].abm_ex2 = abm_ex2.replace(/\s+/g, "");
                this.familyData1[i].abm_ex2 = abm_ex2.replace(/x$/i, "X");
                let msg = isCardID(abm_ex2);
                // console.log(abm_ex2)
                if (msg != true) {
                  this.$message.warning("第" + (index) + "行共同家庭成员" + msg);
                  this.isSaves = false;
                  return false;
                } else {
                  this.familyData1[i].abm_ex4 = this.getBirthdayFromIdCard(abm_ex2);//abm_ex4已被取消
                  this.familyData1[i].abm_ex5 = this.getSex(abm_ex2);
                  this.familyData1[i].age = this.getAge(abm_ex2);
                  this.familyData1[i].abm_ex29 = this.getAge(abm_ex2);
                }
              }

              // 必须断开不然会在上一步结束
              if (!abm_ex16) {
                this.$message.warning("请选择第" + (index) + "行共同家庭成员民族");
                this.isSaves = false;
                return false;
              } else if (!abm_ex7) {
                this.$message.warning("请选择第" + (index) + "行共同家庭成员户口性质");
                this.isSaves = false;
                return false;
              } else if (!abm_ex28) {
                this.$message.warning("请选择第" + (index) + "行共同家庭成员婚姻状况");
                this.isSaves = false;
                return false;
              } else if (!abm_ex11) {
                this.$message.warning("请填写第" + (index) + "行共同家庭成员健康状况");
                this.isSaves = false;
                return false;
              } else if (abm_ex11 == '重病' && !abm_ex52) {
                this.$message.warning("请填写第" + (index) + "行共同家庭成员重病病种");
                this.isSaves = false;
                return false;
              } else if (abm_ex11 == '残疾' && !abm_ex39) {
                this.$message.warning("请填写第" + (index) + "行共同家庭成员残疾种类以及等级");
                this.isSaves = false;
                return false;
              } else if (abm_ex11 == '残疾' && abm_ex39 && !abm_ex40) {
                this.$message.warning("请填写第" + (index) + "行共同家庭成员残疾等级");
                this.isSaves = false;
                return false;
              } else if (!abm_ex49) {
                this.$message.warning("请填写第" + (index) + "行共同家庭成员劳动能力");
                this.isSaves = false;
                return false;
              } else if (!abm_ex14) {
                this.$message.warning("请填写第" + (index) + "行共同家庭成员职业状况");
                this.isSaves = false;
                return false;
              } else if (!abm_ex15) {
                // console.log(abm_ex15);
                this.$message.warning("请填写第" + (index) + "行共同家庭成员工作单位");
                this.isSaves = false;
                return false;
              }
              if (abm_ex1.indexOf("户主") != -1 || abm_ex1.indexOf("户主本人") != -1) {
                huzhu++;
              }
            }

            // 4.11新增验证排查年龄不是未成年、老年人 特定对象选择未成年、老年人的数据
            if (abm_ex51 == '未成年人' && age >= 18) {
              this.$message.warning("第" + (index) + "行共同家庭成员已满18岁，特定对象选择项非法");
              this.isSaves = false;
              return false;
            } else if (abm_ex51 == '老年人' && age < 60) {
              this.$message.warning("第" + (index) + "行共同家庭成员未满60岁，特定对象选择项非法");
              this.isSaves = false;
              return false;
            }

            if (age >= 60 || age < 18) {
              if (abm_ex51 == "") {
                this.$message.warning("请选择第" + (index) + "行共同家庭成员特定对象");
                this.isSaves = false;
                return false;
              }
              // console.log( '年龄=>',this.familyData1[index].age >= 60);
              // console.log( '年龄=>',age >= 60);
              // console.log( '年龄=>',age );
              // console.log('特定对象=>',abm_ex51!="老年人");

              if (age >= 60 && !(['老年人', '独居', '退役军人', '归侨'].includes(abm_ex51))) {
                isSpecial_1 += isSpecial_1 == '' ? abm_ex3 : +'、' + abm_ex3;
                haveOld = true;
              } else if (age < 18 && !(['未成年人', '独居', '退役军人', '归侨'].includes(abm_ex51))) {
                isSpecial_2 += isSpecial_2 == '' ? abm_ex3 : +'、' + abm_ex3;
                haveYoung = true;
              }
            }
            // 计算共同生活家庭成员申请人的姓名、身份证的数量，检测是否有重复姓名身份证
            if (this.dibaoForm.ab_ex3 == this.familyData1[i].abm_ex3) {
              nameSame++;
              if (this.dibaoForm.ab_ex7 == this.familyData1[i].abm_ex2) {
                IDCardSame++;
              }
            }
          }

          var SpecialPrompt = "";

          SpecialPrompt = haveOld ? "<b>" + isSpecial_1 + "</b>  特定对象选择 <b>老年人</b> ，将有 10% 的增发补贴，当前选择的特定对象无增发补贴，是否继续保存？" : SpecialPrompt;
          SpecialPrompt = haveYoung ? "<b>" + isSpecial_2 + "</b>  特定对象选择 <b>未成年人</b> ，将有 10% 的增发补贴，当前选择的特定对象无增发补贴，是否继续保存？" : SpecialPrompt;
          SpecialPrompt = (haveOld && haveYoung) ? "<b>" + isSpecial_1 + "</b> 的特定对象选择 <b>老年人</b> ，将有 10% 的增发补贴，当前选择的特定对象无增发补贴<br>" +
            "<br><b>" + isSpecial_2 + "</b>  特定对象选择 <b>未成年人</b> ，将有 10% 的增发补贴，当前选择的特定对象无增发补贴，是否继续保存？" : SpecialPrompt;

          // console.log('是否有年龄特定对象 =》',SpecialPrompt);
          if (SpecialPrompt != '' && this.dibaoForm.ab_ex41.indexOf('单列户') != -1) {
            await this.$confirm(SpecialPrompt, '系统提示', {
              dangerouslyUseHTMLString: true,
              confirmButtonText: '保存',
              cancelButtonText: '取消',
              customClass: 'myClass1'
            }).then(() => {
              // console.log("保存成功"); 
              isSave = true;
              this.isSaves = true;
            }).catch(action => { // 取消留在本页
              this.isSaves = false;
              return false;
            });
          }

          // 是否有一位户主验证
          if (huzhu < 1) {
            this.$message.warning("共同生活家庭成员必须有一位户主");
            this.isSaves = false
            return false;
          } else if (huzhu > 1) {
            this.$message.warning("共同生活家庭成员只能有一位户主");
            this.isSaves = false
            return false;
          }
          // console.log(huzhu,"户主人数");
        }
        // console.log('申请人姓名数量',nameSame);
        // console.log('申请人身份证数量',IDCardSame);

        if (this.familyData1.length > 0) {
          if (nameSame == IDCardSame) {
            if (nameSame == 1) {
              console.log("申请人是共同家庭成员");
            } else if (nameSame > 1) {
              this.$message.warning('共同生活家庭成员姓名重复！');
              this.isSaves = false;
              return false;
            } else if (nameSame < 1) {
              this.$message.warning('共同生活家庭成员缺少申请人姓名！');
              this.isSaves = false;
              return false;
            }
          } else {
            if (nameSame == 1) {
              this.$message.warning('共同生活家庭成员户主身份证号和姓名与申请人的不一致！');
              this.isSaves = false;
              return false;
            } else if (nameSame < 1) {
              this.$message.warning('共同生活家庭成员缺少申请人姓名！');
              this.isSaves = false;
              return false;
            } else if (nameSame > 1) {
              this.$message.warning('共同生活家庭成员姓名重复！');
              this.isSaves = false;
              return false;
            }
          }
        }

        // 非共同生活赡抚养人没填全保存不了
        for (let i in this.familyData2) {
          for (let j in this.familyData2[i]) {
            if (this.keyVerification2(i, this.familyData2[i], "f2." + j) == false) {
              this.isSaves = false
              return false;
            }
          }
          this.familyData2[i].abm_ex6 = "N";
          let abm_ex3 = this.familyData2[i].abm_ex3;
          let abm_ex2 = this.familyData2[i].abm_ex2;
          let abm_ex1 = this.familyData2[i].abm_ex1;
          let abm_ex11 = this.familyData2[i].abm_ex11;
          let abm_ex49 = this.familyData2[i].abm_ex49;
          let index = Number(i) + 1;

          if (!abm_ex3 && !abm_ex1 && !abm_ex2 && !abm_ex11) {
            console.log('都没填跳过');
          } else {
            if (!abm_ex3) {
              this.$message.warning("请填写第" + (index) + "行非共同生活赡扶抚养人姓名");
              this.isSaves = false
              return false;
            } else if (!abm_ex1) {
              this.$message.warning("请选择第" + (index) + "行非共同生活赡扶抚养人与申请人的关系");
              this.isSaves = false
              return false;
            }
            else if (!abm_ex2 || abm_ex2) {
              this.familyData2[i].abm_ex2 = abm_ex2.replace(/x$/i, "X");
              let msg = isCardID(abm_ex2);
              if (msg != true) {
                this.$message.warning("第" + (index) + "行非共同生活赡扶抚养人" + msg);
                this.isSaves = false
                return false;
              } else {
                // this.familyData2[i].abm_ex4=this.getBirthdayFromIdCard(abm_ex2);//abm_ex4已被取消
                this.familyData2[i].abm_ex5 = this.getSex(abm_ex2);
                this.familyData2[i].age = this.getAge(abm_ex2);
                this.familyData2[i].abm_ex29 = this.getAge(abm_ex2);
              }
            }
            if (!abm_ex11) {
              this.$message.warning("请填写第" + (index) + "行非共同生活赡扶抚养人健康状况");
              this.isSaves = false;
              return false;
            } else if (!abm_ex49) {
              this.$message.warning("请填写第" + (index) + "行非共同生活赡扶抚养人劳动能力");
              this.isSaves = false;
              return false;
            }
          }
        }

        // 非共同生活赡抚养人家庭成员没填全保存不了
        for (let i in this.familyData3) {
          for (let j in this.familyData3[i]) {
            if (this.keyVerification2(i, this.familyData3[i], "f3." + j) == false) {
              this.isSaves = false
              return false;
            }
          }
          this.familyData3[i].abm_ex6 = "B"
          let abm_ex3 = this.familyData3[i].abm_ex3;
          let abm_ex1 = this.familyData3[i].abm_ex1;
          let abm_ex2 = this.familyData3[i].abm_ex2;
          let index = Number(i) + 1;

          if (!abm_ex3 && !abm_ex1 && !abm_ex2) {
            console.log('都没填跳过');
          } else {
            if (!abm_ex3) {
              this.$message.warning("请填写第" + (index) + "行非共同生活赡抚养人家庭成员姓名");
              this.isSaves = false;
              return false;

            } else if (!abm_ex1) {
              this.$message.warning("请选择第" + (index) + "行非共同生活赡抚养人家庭成员与申请人的关系");
              this.isSaves = false;
              return false;

            } else if (!abm_ex2 || abm_ex2) {
              this.familyData3[i].abm_ex2 = abm_ex2.replace(/x$/i, "X");
              let msg = isCardID(abm_ex2);
              if (msg != true) {
                this.$message.warning("第" + (index) + "行非共同生活赡抚养人家庭成员" + msg);
                this.isSaves = false;
                return false;
              } else {
                // this.familyData3[i].abm_ex4=this.getBirthdayFromIdCard(abm_ex2);//abm_ex4已被取消
                this.familyData3[i].abm_ex5 = this.getSex(abm_ex2);
                this.familyData3[i].age = this.getAge(abm_ex2);
                this.familyData3[i].abm_ex29 = this.getAge(abm_ex2);
              }
            }

            //已有非共同生活赡抚养人家庭成员，对是否有非共同生活赡抚养人进行判断
            if (this.familyData2.length == 0) {
              this.$message.warning("请填写非共同生活赡抚养人信息");
              this.isSaves = false;
              return false;
            } else if (this.familyData2.length > 0) {
              for (let j in this.familyData2) {
                if (this.familyData2[j].abm_ex3 || this.familyData2[j].abm_ex1 || this.familyData2[j].abm_ex2 || this.familyData2[j].abm_ex11) {
                  console.log('非共同生活抚养人有数据填跳过');
                } else {
                  this.$message.warning("请将非共同生活赡抚养人信息补充完整");
                  this.isSaves = false;
                  return false;
                }
              }
            }
          }
        }

        this.familyData = this.familyData1.concat(this.familyData2).concat(this.familyData3)
        console.log(this.familyData, '家庭成员');

        for (let i = 0; i < this.familyData.length - 1; i++) {
          // console.log(this.familyData[i].abm_ex3);

          for (let j = i + 1; j < this.familyData.length; j++) {
            // console.log(this.familyData[i].abm_ex3 ,this.familyData[j].abm_ex3);
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
              // console.log(this.familyData[i].abm_ex3 +'与'+ this.familyData[j].abm_ex3+'的身份证号重复啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦，请修改');
              this.$message.warning(whereFamilyLeft + '"' + this.familyData[i].abm_ex3 + '"，与' + whereFamilyRight + '"' + this.familyData[j].abm_ex3 + '"的身份证号重复，请重新确认填报信息！');
              this.isSaves = false;
              return false;
            }
          }
        }

        // 变更时人均月、平均月不进入变更报告
        var income7 = []
        income7.push(this.income7[0])

        // 收入保存验证
        this.income = this.income1.concat(this.income2).concat(this.income3).concat(this.income4).concat(this.income5).concat(this.income6).concat(income7)
        console.log(this.income, "income");

        let incomeSave = 0;
        for (let i in this.income) {
          if (this.income[i].abi_ex2 != "") {
            incomeSave++
          }
        }
        if (incomeSave == 0) {
          this.$message.warning("请完善家庭前12个月收入情况");
          this.isSaves = false;
          // console.log("收入不完善");
          return false;
        }

        /// 收入数据保存过滤 : 遍历收入，如果计入收入名称、金额为空，则去除该行数据
        // 1.工资、
        if (this.income1.length > 0) {

          for (let i in this.income1) {
            let abi_ex1 = this.income1[i].abi_ex1;
            let abi_ex2 = this.income1[i].abi_ex2;

            if (!abi_ex1 && !abi_ex2) {
              this.income1.splice(i, 1);
              --i;
            }
            else if (!abi_ex1 && abi_ex2) {
              this.$message.warning("请将第" + (Number(i) + 1) + "行工资性收入计入收入名称补充完整");
              this.isSaves = false;
              return false;
            } else if (abi_ex1 && !abi_ex2) {
              this.$message.warning("请将第" + (Number(i) + 1) + "行工资性收入金额补充完整");
              this.isSaves = false;
              return false;
            }
            // var icoArr=[]
            for (let j in this.income1[i]) {
              if (this.changeAmt(i, this.income1[i], "ico1." + j) == false) {
                this.isSaves = false;
                return false;
              }
            }
            // console.log(icoArr);
          }
        }
        if (this.income1.length == 0) {
          this.$message.warning("请填写家庭12个月收入，工资性收入");
          this.isSaves = false
          return false;
        }
        // 2.经营
        if (this.income2.length > 0) {
          for (let i = 0; this.income2.length > i; i++) {
            let abi_ex1 = this.income2[i].abi_ex1;
            let abi_ex2 = this.income2[i].abi_ex2;
            if (!abi_ex1 && !abi_ex2) {
              this.income2.splice(i, 1);
              --i;
            } else if (abi_ex1 && !abi_ex2) {
              this.$message.warning("请将第" + (Number(i) + 1) + "行经营性收入金额补充完整");
              this.isSaves = false
              return false;
            }
            for (let j in this.income2[i]) {
              if (this.changeAmt(i, this.income2[i], "ico2." + j) == false) {
                this.isSaves = false
                return false;
              }
            }
          }
        }
        if (this.income2.length == 0) {
          this.$message.warning("请填写家庭12个月收入，经营性收入");
          this.isSaves = false
          return false;
        }
        // 3.财产、
        if (this.income3.length > 0) {
          for (let i = 0; this.income3.length > i; i++) {
            let abi_ex1 = this.income3[i].abi_ex1;
            let abi_ex2 = this.income3[i].abi_ex2;
            if (!abi_ex1 && !abi_ex2) {
              this.income3.splice(i, 1)
              --i;
            }
            else if (!abi_ex1 && abi_ex2) {
              this.$message.warning("请将第" + (Number(i) + 1) + "行财产性收入计入收入名称补充完整");
              this.isSaves = false
              return false;
            } else if (abi_ex1 && !abi_ex2) {
              this.$message.warning("请将第" + (Number(i) + 1) + "行财产性收入金额补充完整");
              this.isSaves = false
              return false;
            }
            for (let j in this.income3[i]) {
              if (this.changeAmt(i, this.income3[i], "ico3." + j) == false) {
                this.isSaves = false
                return false;
              }
            }
          }
        }
        if (this.income3.length == 0) {
          this.$message.warning("请填写家庭12个月收入，财产净收入");
          this.isSaves = false
          return false;
        }
        // 4.转移、
        if (this.income4.length > 0) {
          for (let i = 0; this.income4.length > i; i++) {
            let abi_ex1 = this.income4[i].abi_ex1;
            let abi_ex2 = this.income4[i].abi_ex2;
            if (!abi_ex1 && !abi_ex2) {
              this.income4.splice(i, 1)
              --i;
            }
            else if (!abi_ex1 && abi_ex2) {
              this.$message.warning("请将第" + (Number(i) + 1) + "行转移净收入入收入名称补充完整");
              this.isSaves = false
              return false;
            } else if (abi_ex1 && !abi_ex2) {
              this.$message.warning("请将第" + (Number(i) + 1) + "行转移净收入金额补充完整");
              this.isSaves = false
              return false;
            }
            for (let j in this.income4[i]) {
              if (this.changeAmt(i, this.income4[i], "ico4." + j) == false) {
                this.isSaves = false
                return false;
              }
            }
          }
        }
        if (this.income4.length == 0) {
          this.$message.warning("请填写家庭12个月收入，转移净收入");
          this.isSaves = false
          return false;
        }

        // 5.其他收入
        if (this.income5.length > 0) {
          for (let i = 0; this.income5.length > i; i++) {
            let abi_ex1 = this.income5[i].abi_ex1;
            let abi_ex2 = this.income5[i].abi_ex2;
            if (!abi_ex1 && !abi_ex2) {
              this.income5.splice(i, 1)
              --i;
            } else if (abi_ex1 && !abi_ex2) {
              this.$message.warning("请将第" + (Number(i) + 1) + "行其他收入金额补充完整");
              this.isSaves = false
              return false;
            }
            for (let j in this.income5[i]) {
              if (this.changeAmt(i, this.income5[i], "ico5." + j) == false) {
                this.isSaves = false
                return false;
              }
            }
          }
        }
        if (this.income5.length == 0) {
          this.$message.warning("请填写家庭12个月收入，其他收入");
          this.isSaves = false
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
            } else if (abi_ex1 && !abi_ex2) {
              this.$message.warning("请将第" + (Number(i) + 1) + "行必要就业成本抵扣金额补充完整");
              this.isSaves = false
              return false;
            }
            for (let j in this.income6[i]) {
              if (this.changeAmt(i, this.income6[i], "ico6." + j) == false) {
                this.isSaves = false
                return false;
              }
            }
          }
        }
        if (this.income6.length == 0) {
          this.$message.warning("请填写家庭12个月收入，必要就业成本抵扣");
          this.isSaves = false
          return false;
        }
        //支出保存验证
        console.log(this.pay.abp_ex8, "总支出");

        if (this.pay.abp_ex4 == "") {
          this.$message.warning("家庭前12个月支出情况，医疗支出不能为空");
          this.isSaves = false;
          return false;
        }
        if (this.pay.abp_ex5 == "") {
          this.$message.warning("家庭前12个月支出情况，教育支出不能为空");
          this.isSaves = false;
          return false;
        }
        if (this.pay.abp_ex6 == "") {
          this.$message.warning("家庭前12个月支出情况，残疾康复费用支出不能为空");
          this.isSaves = false;
          return false;
        }
        if (this.pay.abp_ex11 == "") {
          this.$message.warning("家庭前12个月支出情况，因灾、因意外事故费用支出不能为空");
          this.isSaves = false;
          return false;
        }
        if (this.pay.abp_ex7 == "") {
          this.$message.warning("家庭前12个月支出情况，其他支出不能为空");
          this.isSaves = false;
          return false;
        }
        if (this.pay.abp_ex8 == "") {
          this.$message.warning("家庭前12个月支出情况，家庭总支出不能为空");
          this.isSaves = false;
          return false;
        }

        // 支出格式校验
        for (let i in this.pay) {
          if (this.changeAmt3(this.pay[i], "pay." + i) == false) {
            this.isSaves = false
            return false;
          }
        }

        // 车船没填全保存不了
        for (let i in this.estate1) {
          this.estate1[i].abe_ex7 = "车船"
          let abe_ex1 = this.estate1[i].abe_ex1;
          let abe_ex2 = this.estate1[i].abe_ex2;
          let abe_ex3 = this.estate1[i].abe_ex3;
          let abe_ex4 = this.estate1[i].abe_ex4;
          let abe_ex8 = this.estate1[i].abe_ex8;
          let index = Number(i) + 1;

          if (!abe_ex1 && !abe_ex2 && !abe_ex3 && !abe_ex4) {
            console.log("我执行了" + i)
            console.log(!abe_ex1 && !abe_ex2 && !abe_ex3 && !abe_ex4 && !abe_ex8)
          } else {
            for (let j in this.estate1[i]) {
              if (this.keyVerification2(i, this.estate1[i], "e1." + j) == false) {
                this.isSaves = false;
                return false;
              }
            }

            if (!abe_ex1) {
              this.$message.warning("请填写第" + (index) + "行车(船)主姓名");
              this.isSaves = false
              return false;

            } else if (!abe_ex2) {
              this.$message.warning("请填写第" + (index) + "行车(船)购买时间");
              this.isSaves = false
              return false;

            } else if (!abe_ex3) {
              this.$message.warning("请填写第" + (index) + "行车(船)用途");
              this.isSaves = false
              return false;

            } else if (!abe_ex8) {
              this.$message.warning("请选择第" + (index) + "行车(船)型号");
              this.isSaves = false
              return false;

            } else if (!abe_ex4) {
              this.$message.warning("请填写第" + (index) + "行车(船)价值");
              this.isSaves = false
              return false;
            }
          }
        }
        // 房屋没填全保存不了
        for (let i in this.estate2) {

          this.estate2[i].abe_ex7 = "房屋"
          let abe_ex1 = this.estate2[i].abe_ex1;
          let abe_ex2 = this.estate2[i].abe_ex2;
          let abe_ex4 = this.estate2[i].abe_ex4;
          let abe_ex5 = this.estate2[i].abe_ex5;
          let abe_ex6 = this.estate2[i].abe_ex6;
          let abe_ex11 = this.estate2[i].abe_ex11;
          let index = Number(i) + 1;
          if (!abe_ex1 && !abe_ex2 && !abe_ex4 && !abe_ex5 && !abe_ex6 && !abe_ex11) {//数据都为空，不进行操作
            console.log(!abe_ex1 && !abe_ex2 && !abe_ex4 && !abe_ex5 && !abe_ex6, '房屋' + i);
            console.log(!abe_ex1, '房屋产权人/共有人姓名');
          } else {
            for (let j in this.estate2[i]) {
              if (this.keyVerification2(i, this.estate2[i], "e2." + j) == false) {
                this.isSaves = false;
                return false;
              }
            }
            if (!abe_ex1) {
              this.$message.warning("请填写第" + (index) + "行房屋产权人/共有人姓名");
              this.isSaves = false;
              return false;
            } else if (!abe_ex2) {
              this.$message.warning("请填写第" + (index) + "行建房(购买)时间");
              this.isSaves = false;
              return false;
            } else if (!abe_ex5) {
              this.$message.warning("请填写第" + (index) + "行房屋地址");
              this.isSaves = false;
              return false;
            } else if (!abe_ex11) {
              this.$message.warning("请选择第" + (index) + "行房屋性质");
              this.isSaves = false;
              return false;
            } else if (!abe_ex6) {
              this.$message.warning("请填写第" + (index) + "行房屋面积");
              this.isSaves = false;
              return false;
            } else if (!abe_ex4) {
              this.$message.warning("请填写第" + (index) + "行房屋购置价/建造价");
              this.isSaves = false;
              return false;
            }
          }
        }

        if (this.estate1.length > 0) {
          for (let i = 0; this.estate1.length > i; i++) {
            let abe_ex1 = this.estate1[i].abe_ex1;
            let abe_ex2 = this.estate1[i].abe_ex2;
            if (!abe_ex1 && !abe_ex2) {
              this.estate1.splice(i, 1);
              --i;
            }
          }
        }

        if (this.estate2.length > 0) {
          for (let i = 0; this.estate2.length > i; i++) {
            let abe_ex1 = this.estate2[i].abe_ex1;
            let abe_ex2 = this.estate2[i].abe_ex2;
            if (!abe_ex1 && !abe_ex2) {
              this.estate2.splice(i, 1);
              --i;
            }
          }
        }

        // 山林
        for (let i in this.landInfo) {
          for (let j in this.landInfo[i]) {
            if (this.keyVerification2(i, this.landInfo[i], "land." + j) == false) {
              this.isSaves = false;
              return false;
            }
          }
        }


        // 根据房产进行房屋照片提示
        if (this.estate2.length > 0) {
          if (this.estate2[0].abe_ex1 != '') {
            if (this.uploadImg.ab_ex166_img.length < 2) {
              this.$message.warning("房屋整体照片至少上传两张");
              this.isSaves = false;
              return false;
            } else if (this.uploadImg.ab_ex167_img.length < 2) {
              this.$message.warning("室内照片至少上传两张");
              this.isSaves = false;
              return false;
            }
          }
        }

        //纸质授权书只能一张
        if (this.uploadImg.ab_ex177_img.length != 1 && !this.specialAccount) {
          this.$message.warning("纸质授权书照片只能上传一张!");
          this.isSaves = false;
          return false;
        }

        // 每位共同生活家庭成员上传两张身份证照片
        if (this.uploadImg.ab_ex10_img.length < 2 * (this.familyData1.length - this.jisuan.familyChildrens)) {
          this.$message.warning("请确保每位 成年的 共同生活家庭成员上传两张身份证照片!!");
          this.isSaves = false;
          return false;
        }

        // 月人均收支计算
        let num = 0;
        for (let i in this.familyData1) {
          if (this.familyData1[i].abm_ex3 == '') {//先判断数据是否符合要求(这里我用申请人姓名是否为空作为判断依据)
            num++
          }
          if (this.familyData1.length - num < 2) { //若符合要求的共同生活成员人数小于2 则默认被除数为1 
            this.pay.abp_ex10 = Number(this.pay.abp_ex9 / 1).toFixed(2);
            this.income7[2].abi_ex2 = Number(this.income7[1].abi_ex2 / 1).toFixed(2);
          } else {
            // 若共同生活成员人数">="2  则被除数数为符合要求的人数
            this.pay.abp_ex10 = Number(this.pay.abp_ex9 / (this.familyData1.length - num)).toFixed(2);
            this.income7[2].abi_ex2 = Number(this.income7[1].abi_ex2 / (this.familyData1.length - num)).toFixed(2);
          }
        }

        // 代理人
        // this.agentInfo.aba_ex3 = key;
        for (let i in this.agentInfo) {
          if (this.keyVerification(this.agentInfo[i], i) == false) {
            this.isSaves = false;
            return false;
          }
        }

        //代理人信息检验，代理人图片上传后删除，依然有记录
        console.log(this.agentInfo.aba_ex4, '代理人身份证');
        console.log(this.dibaoForm.ab_ex73, '申请人授权书');
        if (this.agentInfo.aba_ex1 || this.agentInfo.aba_ex3 || this.agentInfo.aba_ex4 || this.agentInfo.aba_ex5) {
          if (!this.agentInfo.aba_ex1) {
            this.$message.warning("请填写代理人姓名");
            this.isSaves = false;
            return false;
          }
          if (!this.agentInfo.aba_ex3) {
            this.$message.warning("请填写代理人身份证号");
            this.isSaves = false;
            return false;
          }
          if (this.agentInfo.aba_ex3) {
            var msg = isCardID(this.agentInfo.aba_ex3)
            if (!msg) {
              console.log(msg);
              this.$message.warning("代理人" + msg);
              this.isSaves = false;
              return false;
            }
          }
          if (!this.agentInfo.aba_ex4) {
            this.$message.warning("请拍照并上传代理人身份证正反面");
            this.isSaves = false;
            return false;
          }
          if (this.uploadImg.aba_ex4_img.length < 2) {
            this.$message.warning("代理人身份证照片至少上传两张");
            this.isSaves = false;
            return false;
          }
          if (!this.agentInfo.aba_ex5) {
            this.$message.warning("请拍照并上传委托书");
            this.isSaves = false;
            return false;
          }
          if (this.uploadImg.aba_ex5_img.length < 1) {
            this.$message.warning("代理人委托书照片至少上传一张");
            this.isSaves = false;
            return false;
          }
        }

        if (this.dibaoForm.ab_ex13 == '特困供养') {
          if (this.dibaoForm.ab_ex71 == '') {
            this.$message.warning("特困供养方式不能为空");
            this.isSaves = false;
            return false;
          }
          if (this.dibaoForm.ab_ex199 == '') {
            this.$message.warning("护理费不能为空");
            this.isSaves = false;
            return false;
          }

          if (this.dibaoForm.ab_ex195 == '' && (this.dibaoForm.ab_ex71 == '集中供养' || this.dibaoForm.ab_ex71 == '集中')) {
            this.$message.warning("供养机构不能为空");
            this.isSaves = false;
            return false;
          }
          if (this.dibaoForm.ab_ex198 == '') {
            this.$message.warning("生活自理能力不能为空");
            this.isSaves = false;
            return false;
          }
          if (this.dibaoForm.ab_ex200 == '') {
            this.$message.warning("生活费不能为空");
            this.isSaves = false;
            return false;
          }
          if (this.dibaoForm.ab_ex196 == '') {
            this.$message.warning("自理能力状况评估报告不能为空");
            this.isSaves = false;
            return false;
          }
          if (this.dibaoForm.ab_ex197 == '') {
            this.$message.warning("集中供养意愿书不能为空");
            this.isSaves = false;
            return false;
          }
          if (this.dibaoForm.ab_ex196 != '' && this.imgNum.ab_ex196_img > 1) {
            this.$message.warning("自理能力状况评估报告只能上传一张");
            this.isSaves = false;
            return false;
          }
          if (this.dibaoForm.ab_ex197 != '' && this.imgNum.ab_ex197_img > 1) {
            this.$message.warning("集中供养意愿书只能上传一张");
            this.isSaves = false;
            return false;
          }
        }

      }
      // 验证预警信息
      var warningData_ = [];
      // this.isTest 开启上面的所有校验则关闭下面只有预警的校验
      if (this.warningData.length > 0 && this.isTest) {
        for (var i = 0; i < this.warningData.length; i++) {
          var index = Number(i) + 1;

          if (this.warningData[i].aw_ex1 == "" && (this.warningData[i].aw_dat1)) {
            this.$message.warning("请将预警" + index + "的内容补充完整");
            this.isSaves = false;
            return false;
          } else if (this.warningData[i].aw_ex1 && (this.warningData[i].aw_dat1 == null || this.warningData[i].aw_dat1 == "")) {
            this.$message.warning("请选择预警" + index + "的时间");
            this.isSaves = false;
            return false;
          } else if (this.warningData[i].aw_ex1 && (this.warningData[i].aw_dat1 != null || this.warningData[i].aw_dat1)) {
            if (this.warningData[i].aw_dat1 || this.warningData[i].aw_ex1) {
              warningData_.push(this.warningData[i]);
            }
          }
        }

        // 预警内容格式保存校验
        if (warningData_.length > 0) {
          // console.log("预警验证");
          for (let i in warningData_) {
            let msg = warningContent(warningData_[i].aw_ex1, "warning.aw_ex1", i);
            if (msg != true) {
              this.$message.warning(msg);
              this.isSaves = false;
              return false;
            }
          }
        }
      }


      // 兴化儿童保存验证 超出低保救助标准时 儿童调整救助金作废，
      // 选择继续保存，恢复原救助金，选择取消，救助金不变，但是终止保存
      // if(this.dibaoForm.ab_ex161=='兴化市' && this.dibaoForm.ab_ex13=='低保'){

      // 兴化儿童救助金验证，现在要求7月填表后取消兴化儿童的操作
      var isStop = false;
      await this.changeType();

      // 核减原因显示 共同、非共同、非共同家庭、近亲属成员核减，显示核减原因填报弹框
      // 否则直接执行下一步保存
      if (this.deletedReason.length > 0) {
        this.dialogVisible = true;
      } else if (!isStop) {
        this.save();
      }
    },

    // 保存按钮 格式验证 核减验证及填报  
    async save () {

      if (this.deletedReason.length > 0) {
        for (let i in this.deletedReason) {
          if (this.deletedReason.some(item => item.reason == '')) {
            this.$message.warning('请完善所有核减成员的核减原因');
            this.isSaves = false
            return false
          }
        }
      }
      console.log(this.deletedReason, 'save 成员核减');
      this.isSaves = true

      // 支出过滤
      var pay_ = this.pay
      this.pay = {
        abp_ex4: '',
        abp_ex5: '',
        abp_ex6: '',
        abp_ex7: '',
        abp_ex8: '',
        abp_ex9: '',
        abp_ex10: '',
        abp_ex11: ''
      }
      for (let key in pay_) {
        if (pay_[key]) {
          this.pay[key] = pay_[key]
        }
      }
      // 代理人信息过滤
      if (!this.agentInfo.aba_ex1 && !this.agentInfo.aba_ex3 && !this.agentInfo.aba_ex4 && !this.agentInfo.aba_ex5) {
        this.agentInfo = {
          "aba_ex1": "",
          "aba_ex2": "",
          "aba_ex3": "",
          "aba_ex4": "",
          "aba_ex5": "",
        }
      }
      // 救助金验证 触发赋值
      this.moneybtn = true;
      this.computeMoney(this.dibaoForm)
      console.log('save');

      // 核减弹框显示
      if (this.deletedReason.length > 0) {
        this.dialogVisible = false;
        await this.changeType(); //类型选择显示
      }

      if (this.dibaoForm.ab_ex41.indexOf('单列户') != -1) {
        for (let i in this.familyData1) {

          if (this.familyData1[i].abm_ex2 == this.dibaoForm.ab_ex7) {
            if (this.familyData1[i].abm_ex11 == '残疾') {
              if (['一级', '一级残疾', '二级', '二级残疾'].includes(this.familyData1[i].abm_ex40) || (['三级', '三级残疾'].includes(this.familyData1[i].abm_ex40) && ['精神', '精神残疾', '智力', '智力残疾'].includes(this.familyData1[i].abm_ex39))) {

                this.assistanceType = '残疾人单列户施保';
                this.ab_ex13 = '残疾人单列户施保';

              } else {
                // 不符合低保按人保救助
                this.jsjgString = '';
              }
            } else if (this.familyData1[i].abm_ex11 == '重病') {
              // 不符合低保按人保救助
              this.assistanceType = '重病型单列户施保';
              this.ab_ex13 = '重病型单列户施保';

            } else {
              this.jsjgString = '';
            }
          }
        }
        // this.assistanceType = this.dibaoForm.ab_ex41;
      } else {
        this.assistanceType = this.changeJS().join(" ，");
      }
      console.log(this.assistanceType, "救助分类");
      console.log(this.ab_ex13, "选择类别");

      // 救助超标验证
      // 非支出 《人均 2倍低保标准
      // 支出 《 人均可支配常数
      if (this.jsjgString.length == 0) {
        this.$message.warning('不符合任意一种救助类型，请确认填报信息是否有误！');
        this.isSaves = false;
        return false;
      }

      // 渐退期检测
      if (this.dibaoForm.ab_ex207 == "是") {
        // 给渐退期自己输入的救助金设置一个 1.5倍的上限检测，防止有人乱填的太离谱
        if (this.familyData[0].abm_ex71 > 1.5 * this.dbStandard) {
          this.$alert('请确保 ‘个人’ 救助金额没有超出低保救助标准的上限');
          return false;
        }
        if (this.income7[2].abi_ex2 > 2 * this.dbStandard) {
          this.$alert("已超出渐退期救助标准");
          this.assistanceType = "已超出渐退期救助标准，继续保存可能会造成数据丢失";
        } else {
          this.assistanceType = "渐退期-低保";
        }
      }


      // 所在救助类型名称匹配修改
      var ab_ex13_type = '';
      if (this.dibaoForm.ab_ex13 == '家庭边缘') {
        ab_ex13_type = '单人保家庭';
      } else if (this.dibaoForm.ab_ex13 == '特困供养') {
        ab_ex13_type = '特困人员供养';
      } else if (this.dibaoForm.ab_ex13 == '支出贫困') {
        ab_ex13_type = '支出型困难家庭';
      } else if (this.dibaoForm.ab_ex13 == '低保') {
        if (['', '低收入型低保'].includes(this.dibaoForm.ab_ex41)) {

          ab_ex13_type = '低保按户保';
        } else {
          ab_ex13_type = this.dibaoForm.ab_ex41;
        }
      }

      console.log(this.assistanceType);

      if (!this.assistanceType) {
        this.assistanceType = this.dibaoForm.ab_ex3 + "您不符合救助条件";
        this.setType = this.dibaoForm.ab_ex3 + "您不符合救助条件";
      } else if (this.assistanceType.indexOf('单列户') != -1) {
        this.setType = this.dibaoForm.ab_ex3 + "您当前救助类型为：" + ab_ex13_type + "，政策计算器检测到您可能符合：" + this.assistanceType + '，是否继续保存？'
        // this.assistanceType = this.dibaoForm.ab_ex3 + "您可能符合如下救助类型：<br>"+ this.assistanceType + '</br>，是否继续保存？'
      } else if (this.assistanceType.indexOf('特困人员供养') == -1) {
        this.setType = this.dibaoForm.ab_ex3 + "您当前救助类型为：" + ab_ex13_type + "，政策计算器检测到您可能符合：" + this.assistanceType + '，是否继续保存？'
        // this.assistanceType = this.dibaoForm.ab_ex3 + "您可能符合如下救助类型：<br>"+ this.assistanceType + '</br>，是否继续保存？'
      } else {
        this.setType = "您当前救助类型为：" + ab_ex13_type + "，政策计算器检测到您可能符合："
        // this.assistanceType = this.dibaoForm.ab_ex3 + "您可能符合 <b><select  v-model=" + this.setType+" ><option label='特困人员供养' value='特困人员供养'>11</option><option label='低保' value='低保'>22</option></select></b> 救助，如果想转为 低保类型 请选择低保选项"
      }

      if (this.isSaves) {
        this.dialogVisible4 = true;
        // // await this.$confirm( this.assistanceType + '，是否继续保存？',"通过政策计算"+this.dibaoForm.ab_ex3+"您可能符合如下救助条件", {
        // await this.$confirm(this.assistanceType ,'政策计算器提醒', {
        // 	dangerouslyUseHTMLString: true,
        // 	confirmButtonText: '保存',
        // 	cancelButtonText: '取消',
        // 	customClass: 'myClass1'
        // }).then(() => {
        // // this.isSaves = true;
        // 	// console.log("保存成功",this.setType,aa);
        // 	return false;
        // })
        // .catch(action => {
        // // 取消留在本页
        // 	console.log("留在本页");
        // 	this.isSaves=false;
        // 	return false;
        // });	
      }

      if (!this.isSaves) {
        return false;
      }

      // 验证通过离开页面时 取消离开页面的弹框提示
      this.leaveSave = this.isSaves;


      if (this.dibaoForm.ab_ex13 == '特困供养') {
        if (this.jsjgString.indexOf('特困人员供养') != -1) {
          // 特困 变 特困 展示明细表
          this.jstext = '';
        } else if (this.jsjgString == '最低生活保障-按户保') {
          // 特困 变 低保 展示明细表
          this.jstext = '';
          this.ab_ex13 = '';
        } else if (this.jsjgString != '') {
          // 特困 变 其他（特困之外的）信息提示'超出特困标准保障金变为0' ;
          this.jstext = '超出特困标准，变更后保障金变为 0 元';
          // 将默选择的特困类型清空
          this.ab_ex13 = '';

        } else {
          // 超出所有救助标准
          this.jstext = '当前变更信息不符合救助条件，请确认是否要变更？';
        }
      } else if (this.dibaoForm.ab_ex13 == '低保' && this.dibaoForm.ab_ex41 == '低收入型低保') {
        console.log('结果为特困时选择的救助类型=》', this.ab_ex13);
        if (this.jsjgString.indexOf('特困人员供养') != -1) {
          // 低保 变 特困 信息提示'特困办结后的出保障金' 
          if (this.ab_ex13 == '特困供养') {
            // 低保 变 特困  选择特困
            this.jstext = '当前变更信息符合特困供养救助类型，保障金标准为 ' + this.tkStandard + ' 元，该户保障金将在新救助类型审批环节完成认定。';
          } else if (this.ab_ex13 == '低保') {
            // 低保 变 特困  选择低保
            this.jstext = '';
          }
        } else if (this.jsjgString == '最低生活保障-按户保' || this.ab_ex13 == '低保') {
          // 低保 变 低保展示明细表
          this.jstext = '';
          // 将默选择的特困类型清空
          this.ab_ex13 = '';
        } else if (this.jsjgString != '') {
          this.ab_ex13 = '';
          // 低保 变 其他（特困之外的）信息提示'超出低保标准保障金变为0' 
          if (this.dibaoForm.ab_ex207 == '是' && this.income7[2].abi_ex2 <= 2 * this.dbStandard) {
            this.jstext = '';
          } else {
            this.jstext = '当前变更信息符合' + this.jsjgString + '，超出低保标准，变更后保障金变为 0 元。';
          }
        } else {
          // 超出所有救助标准
          this.jstext = '当前变更信息不符合救助条件，请确认是否要变更？';
          this.ab_ex13 = '';
        }

      } else if (this.dibaoForm.ab_ex13 == '低保' && this.dibaoForm.ab_ex41.indexOf('单列户') != -1) {

        if (this.jsjgString != '') {
          this.jstext = '';
        } else {
          // 不符合单列户救助标准
          this.jstext = '当前变更信息不符合救助条件，请确认是否要变更？';
          this.ab_ex13 = '';
        }

      } else if (this.dibaoForm.ab_ex13 != '低保' || this.dibaoForm.ab_ex13 != '特困供养') {
        // 将默选择的特困类型清空
        if (this.jsjgString.indexOf('特困') != -1) {
          if (this.ab_ex13 == '特困供养' && this.dibaoForm.ab_ex207 != '是') {
            this.ab_ex13 = '特困供养';
            // 其他类型 变更后为特困供养 因为没有填报生活费和护理费 信息提示'特困办结后的出保障金' 
            this.jstext = '当前变更信息符合特困供养救助类型，保障金标准为 ' + this.tkStandard + ' 元，该户保障金将在新救助类型审批环节完成认定。';

          } else if (this.ab_ex13 == '低保' || this.dibaoForm.ab_ex207 == '是') {
            this.ab_ex13 = '低保';
            this.jstext = '';
          }

        } else if (this.jsjgString == '最低生活保障-按户保') {
          //   其他 变 低保  显示明细表，没有提示
          this.ab_ex13 = '';
          this.jstext = '';
        } else if (this.jsjgString != '') {
          // '其他 变 其他 不显示明细表'
          console.log(6746);
          // this.jstext = '当前变更信息符合'+this.jsjgString+'，超出救助标准，变更后保障金变为0';
          this.jstext = '当前变更信息符合' + this.jsjgString + '，变更后保障金为 0 元。';
          this.ab_ex13 = '';
        } else {
          // 超出所有救助标准
          this.jstext = '当前变更信息不符合救助条件，请确认是否要变更？';
          this.ab_ex13 = '';
        }
      }

    },  //点击保存显示政策计算器，

    // 点击政策计算器的确定 计算器关闭 显示明细表 生成变更记录
    async save2 () {

      this.ab_x13 = this.changeType();
      console.log(this.ab_x13, '特困选择类型')

      // 不是低保单列户
      if (this.dibaoForm.ab_ex41.indexOf('单列户') == -1 && this.dibaoForm.ab_ex207 != '是') {
        // 结果符合特困，需要选择一个救助类型 没选时提示

        if (this.jsjgString.indexOf('特困人员供养') != -1 && (this.ab_x13 == '' || this.ab_x13 == undefined)) {
          this.$alert('请选择一个救助类别', '提示');
          return false;
        }
      }

      this.computeMoney(this.dibaoForm);
      console.log(this.dibaoForm.ab_ex40, 'save2');


      var data = [];
      var payData = [];
      data.push(this.dibaoForm);
      payData.push(this.pay);

      var data2 = this.familyData1;
      var data3 = this.familyData2;
      var data5 = this.familyData3;
      var data6 = this.familyData4;

      // 变更数据
      var datas = [];

      // 这里要赋值，不然兴化儿童保障金变更时 this.dibaoForm.ab_ex40 会变成 0
      this.dibaoForm.ab_ex40 = this.ab_ex40;

      console.log('救助金计算 =>', this.ab_ex40);
      console.log('变更前救助金 =>', this.dibaoFormOld.ab_ex40);
      console.log('变更后救助金 =>', this.dibaoForm.ab_ex40);
      console.log('变更后主表  =>', this.dibaoForm);
      console.log('变更前主表 =>', this.dibaoFormOld);

      for (var key in data[0]) {
        var val = data[0][key];
        var old = this.dibaoFormOld[0][key];
        old = old == undefined || old == "undefined" || old == null || old == "null" ? "" : old;
        val = val == undefined || val == "undefined" || val == null || val == "null" ? "" : val;
        // console.log("1111");
        // console.log("key==="+key+"=="+val+"=="+old)
        if (old != val && key.indexOf("abm_") == -1 && key.indexOf("abp_") == -1 && key.indexOf("_id") == -1 && key.indexOf("ac_") == -1) {

          var d = {};
          var name = "";
          if (key == "ab_ex11")
            name = "家庭住址";
          else
            name = this.getLabel(key);

          name = key == "ab_ex1" ? "村居" : name;
          name = key == "ab_ex2" ? "街道" : name;
          name = key == "ab_ex161" ? "区县" : name;
          name = key == "ab_ex10" ? "身份证照片" : name;
          name = key == "ab_ex16" ? "其他证明材料照片" : name;
          name = key == "ab_ex73" ? "电子授权书" : name;
          name = key == "ab_ex97" ? "民主评议" : name;
          name = key == "ab_ex74" ? "审核审批表" : name;
          name = key == "ab_ex98" ? "公示图片" : name;
          name = key == "ab_ex166" ? "房屋整体照片" : name;
          name = key == "ab_ex167" ? "室内照片" : name;
          name = key == "ab_ex177" ? "纸质授权书" : name;
          name = key == "ab_ex196" ? "自理能力状况评估报告" : name;
          name = key == "ab_ex197" ? "集中供养意愿书" : name;
          // 标 签 没有l ab el属性手动赋值
          name = key == "ab_ex71" ? "特困供养方式" : name;
          name = key == "ab_ex195" ? "供养机构" : name;
          name = key == "ab_ex198" ? "生活自理能力" : name;
          name = key == "ab_ex199" ? "护理费" : name;
          name = key == "ab_ex200" ? "生活费" : name;
          name = key == "ab_ex207" ? "是否渐退期" : name;
          name = key == "ab_ex40" ? "家庭月保障金" : name;

          // if(key=="ab_ex10"||key=="ab_ex16"||key=="ab_ex73"||key=="ab_ex97"||key=="ab_ex74"||key=="ab_ex98"||key=="ab_ex166"||key=="ab_ex167"||key=="ab_ex177"||key=="ab_ex196"||key=="ab_ex197"){
          if (["ab_ex10", "ab_ex16", "ab_ex73", "ab_ex97", "ab_ex74", "ab_ex98", "ab_ex166", "ab_ex167", "ab_ex177", "ab_ex196", "ab_ex197"].includes(key)) {
            var olds = old.split(",");
            var vals = val.split(",");
            old = "";
            for (let i = 0; i < olds.length; i++) {
              if (olds[i])
                old = old == "" ? olds[i] : old + "," + olds[i]
            }

            val = "";
            for (let i = 0; i < vals.length; i++) {
              if (vals[i])
                val = val == "" ? vals[i] : val + "," + vals[i]
            }
          }

          if (name)
            name = name.replace("&nbsp;", "");
          // console.log("key==111="+key+"=="+val+"=="+old+"=="+name)

          if (name) {
            d.acc_ex1 = name;
            d.acc_ex2 = escape(old);
            d.acc_ex3 = escape(val);
            d.acc_ex4 = key;
            d.acc_ex5 = "基础信息修改";
            d.acc_ex6 = "修改";
            datas.push(d);
          }
        }
      }

      // debugger
      // 预警信息
      var index = 1;
      let warning = this.warningData
      for (let i = 0; i < warning.length; i++) {

        var aw_id = warning[i].aw_id;
        console.log("aw_id=====" + aw_id);
        if (aw_id == "" || aw_id == "0" || aw_id == undefined) {

          for (var key in warning[i]) {
            var val = unescape(warning[i][key]);
            var text = this.waringField[key];
            if (key.indexOf("_id") != -1 || !text || val == "")
              continue;
            var d = {};
            d.acc_ex1 = text;
            d.acc_ex2 = "";
            d.acc_ex3 = escape(val);
            d.acc_ex4 = key;
            d.acc_ex5 = "预警信息";
            d.acc_ex6 = "新增";
            d.acc_ex7 = "add" + index;
            datas.push(d);
          }
        } else {
          var data_ = {};
          for (let j = 0; j < this.warningDataOld.length; j++) {
            var aw_id_ = this.warningDataOld[j].aw_id;
            if (aw_id == aw_id_) {
              data_ = this.warningDataOld[j];
            }
          }

          index = 1;
          var html = "";
          for (var key in warning[i]) {
            var val = unescape(warning[i][key]);
            var old = unescape(data_[key]);
            var text = this.waringField[key];
            if (key.indexOf("_id") != -1 || !text)
              continue;

            if (val != old && text) {
              var d = {};
              d.acc_ex1 = text;
              d.acc_ex2 = escape(old);
              d.acc_ex3 = escape(val);
              d.acc_ex4 = key;
              d.acc_ex5 = "预警信息";
              d.acc_ex6 = "修改";
              d.acc_ex7 = "edit" + index;
              d.acc_ex8 = "自定义预警";
              d.acc_ex9 = aw_id;
              datas.push(d);
            }
          }
        }
        index++;
      }
      index = 1;
      for (let j = 0; j < this.warningDataOld.length; j++) {
        var aw_id = this.warningDataOld[j].aw_id;
        var isOk = false;
        for (let i = 0; i < warning.length; i++) {
          var aw_id_ = warning[i].aw_id;
          // console.log("aw_id_====="+aw_id_);
          if (aw_id == aw_id_) {
            isOk = true;
          }
        }
        // console.log(aw_id+"=="+isOk);
        if (!isOk) {
          for (var key in this.warningDataOld[j]) {
            var text = this.waringField[key];
            if (text) {
              var d = {};
              d.acc_ex1 = text;
              d.acc_ex2 = unescape(this.warningDataOld[j][key]);
              d.acc_ex3 = "";
              d.acc_ex4 = key;
              d.acc_ex5 = "预警信息";
              d.acc_ex6 = "删除";
              d.acc_ex7 = "del" + index;
              d.acc_ex8 = "自定义预警";
              d.acc_ex9 = this.warningDataOld[j]["aw_id"];
              datas.push(d);
            }
          }
        }
      }
      // 共同生活
      var index = 1;
      for (let i = 0; i < data2.length; i++) {

        var abm_id = data2[i].abm_id;
        // console.log("abm_id====="+abm_id);
        if (abm_id == "" || abm_id == "0" || abm_id == undefined) {

          for (var key in data2[i]) {
            var val = unescape(data2[i][key]);
            var text = this.familyField[key];
            if (key.indexOf("_id") != -1 || !text || key == "abm_ex6" || val == "")
              continue;

            var d = {};
            d.acc_ex1 = text;
            d.acc_ex2 = key;
            d.acc_ex3 = escape(val);
            d.acc_ex4 = key;
            d.acc_ex5 = "共同生活家庭成员";
            d.acc_ex6 = "新增";
            d.acc_ex7 = "add" + index;
            datas.push(d);
          }

        } else {
          var data_ = {};
          for (let j = 0; j < this.familyData1Old.length; j++) {
            // console.log(this.familyData1Old)
            var abm_id_ = this.familyData1Old[j].abm_id;
            if (abm_id == abm_id_) {
              data_ = this.familyData1Old[j];
            }
          }


          // index=1;
          // var html="";
          console.log(data2[i])
          console.log(data_)

          for (var key in data2[i]) {
            var val = unescape(data2[i][key]);
            var old = unescape(data_[key]);
            var text = this.familyField[key];
            if (key.indexOf("_id") != -1 || !text || key == "abm_ex6")
              continue;

            if (val != old && text) {
              var d = {};
              d.acc_ex1 = text;
              d.acc_ex2 = escape(old);
              d.acc_ex3 = escape(val);
              d.acc_ex4 = key;
              d.acc_ex5 = "共同生活家庭成员";
              d.acc_ex6 = "修改";
              d.acc_ex7 = "edit" + index;
              d.acc_ex8 = "姓名：" + data_["abm_ex3"];
              d.acc_ex9 = abm_id;
              datas.push(d);
            }
          }
        }
        index++;
        console.log(index);
      }
      index = 1;
      for (let j = 0; j < this.familyData1Old.length; j++) {
        var abm_id = this.familyData1Old[j].abm_id;
        var isOk = false;
        for (let i = 0; i < data2.length; i++) {
          var abm_id_ = data2[i].abm_id;
          // console.log("abm_ex2_====="+abm_ex2_);
          if (abm_id == abm_id_) {
            isOk = true;
          }
        }
        // console.log(abm_ex2+"=="+isOk);
        if (!isOk) {
          // for(var key in data2[0]){
          for (var key in this.familyData1Old[j]) {
            var text = this.familyField[key];
            if (text) {
              var d = {};
              d.acc_ex1 = text;
              d.acc_ex2 = unescape(this.familyData1Old[j][key]);
              d.acc_ex3 = "";
              d.acc_ex4 = key;
              d.acc_ex5 = "共同生活家庭成员";
              d.acc_ex6 = "删除";
              d.acc_ex7 = "del" + index;
              d.acc_ex8 = "姓名：" + this.familyData1Old[j]["abm_ex3"];
              d.acc_ex9 = this.familyData1Old[j]["abm_id"];
              datas.push(d);
            }
          }
        }
      }
      // 核减原因
      index = 1;
      for (let j = 0; j < this.deletedReason.length; j++) {
        // var abm_id=this.deletedReason[j].abm_id;
        // var isOk=false;
        // for(let i=0;i<data2.length;i++){
        // 	var abm_id_=data2[i].abm_id;
        // 	// console.log("abm_ex2_====="+abm_ex2_);
        // 	if(abm_id==abm_id_){
        // 		isOk=true;
        // 	}
        // }
        // console.log(abm_ex2+"=="+isOk);
        // if(!isOk){
        // for(var key in data2[0]){
        var deletedReason = {
          name: '姓名',
          from: '来源',
          reason: '核减原因',
          // ac_id:'成员id'
        }

        for (let key in this.deletedReason[j]) {
          var text = deletedReason[key];

          if (text) {
            var d = {};
            d.acc_ex1 = text;
            d.acc_ex2 = unescape(this.deletedReason[j][key]);
            d.acc_ex3 = "";
            d.acc_ex4 = key;
            d.acc_ex5 = "成员核减";
            d.acc_ex6 = "核减";
            d.acc_ex7 = "del" + index;
            d.acc_ex8 = "姓名：" + this.deletedReason[j]["name"];
            d.acc_ex9 = this.deletedReason[j]["ac_id"];
            datas.push(d);
          }
        }
        console.log('核减原因 ', datas);
      }
      // 非共同
      index = 1;
      for (let i = 0; i < data3.length; i++) {
        var abm_id = data3[i].abm_id;
        if (abm_id == "" || abm_id == "0" || abm_id == undefined) {
          for (var key in data3[i]) {
            var val = data3[i][key];
            var text = this.family2Field[key];
            if (key.indexOf("_id") != -1 || !text || key == "abm_ex6" || val == "") {
              continue;
            }
            var d = {};
            d.acc_ex1 = text;
            d.acc_ex2 = "";
            d.acc_ex3 = val;
            d.acc_ex4 = key;
            d.acc_ex5 = "非共同生活家庭抚扶养人";
            d.acc_ex6 = "新增";
            d.acc_ex7 = "add" + index;
            datas.push(d);
          }
        } else {
          var data_ = {};
          for (let j = 0; j < this.familyData2Old.length; j++) {
            var abm_id_ = this.familyData2Old[j].abm_id;
            if (abm_id == abm_id_) {
              data_ = this.familyData2Old[j];
            }
          }

          // index=1;
          // var html="";
          for (var key in data3[i]) {
            if (key.indexOf("_id") != -1 || key == "abm_ex6") {
              continue;
            }
            var val = data3[i][key];
            var old = data_[key];
            var text = this.family2Field[key];
            if (val != old && text) {
              var d = {};
              d.acc_ex1 = text;
              d.acc_ex2 = old;
              d.acc_ex3 = val;
              d.acc_ex4 = key;
              d.acc_ex5 = "非共同生活家庭抚扶养人";
              d.acc_ex6 = "修改";
              d.acc_ex7 = "edit" + index;
              d.acc_ex8 = "姓名：" + data_["abm_ex3"];
              d.acc_ex9 = abm_id;
              datas.push(d);
            }
          }
        }
        index++;
      }
      index = 1;
      for (let j = 0; j < this.familyData2Old.length; j++) {
        var abm_id = this.familyData2Old[j].abm_id;
        var isOk = false;

        for (let i = 0; i < data3.length; i++) {
          var abm_id_ = data3[i].abm_id;
          // console.log("abm_ex2_====="+abm_ex2_);
          if (abm_id == abm_id_) {
            isOk = true;
          }
        }

        if (!isOk) {
          for (var key in this.familyData2Old[0]) {
            var text = this.family2Field[key];
            if (text) {
              var d = {};
              d.acc_ex1 = text;
              d.acc_ex2 = unescape(this.familyData2Old[j][key]);
              d.acc_ex3 = "";
              d.acc_ex4 = key;
              d.acc_ex5 = "非共同生活家庭抚扶养人";
              d.acc_ex6 = "删除";
              d.acc_ex7 = "del" + index;
              d.acc_ex8 = "姓名：" + this.familyData2Old[j]["abm_ex3"];
              d.acc_ex9 = this.familyData2Old[j]["abm_id"];
              datas.push(d);
            }
          }
        }
      }

      // 非共同成员
      // console.log(datas);
      index = 1;
      for (let i = 0; i < data5.length; i++) {
        var abm_id = data5[i].abm_id;
        if (abm_id == "" || abm_id == "0" || abm_id == undefined) {
          for (var key in data5[i]) {
            var val = data5[i][key];
            var text = this.family3Field[key];
            if (key.indexOf("_id") != -1 || !text || key == "abm_ex6" || val == "") {
              continue;
            }
            var d = {};
            d.acc_ex1 = text;
            d.acc_ex2 = "";
            d.acc_ex3 = val;
            d.acc_ex4 = key;
            d.acc_ex5 = "非共同生活抚扶养人家庭成员";
            d.acc_ex6 = "新增";
            d.acc_ex7 = "add" + index;
            datas.push(d);
          }

        } else {
          var data_ = {};
          for (let j = 0; j < this.familyData3Old.length; j++) {
            var abm_id_ = this.familyData3Old[j].abm_id;
            if (abm_id == abm_id_) {
              data_ = this.familyData3Old[j];
            }
          }

          for (var key in data5[i]) {
            if (key.indexOf("_id") != -1 || key == "abm_ex6")
              continue;
            var val = data5[i][key];
            var old = data_[key];
            var text = this.family3Field[key];
            if (val != old && text) {
              var d = {};
              d.acc_ex1 = text;
              d.acc_ex2 = old;
              d.acc_ex3 = val;
              d.acc_ex4 = key;
              d.acc_ex5 = "非共同生活抚扶养人家庭成员";
              d.acc_ex6 = "修改";
              d.acc_ex7 = "edit" + index;
              d.acc_ex8 = "姓名：" + data_["abm_ex3"];
              d.acc_ex9 = abm_id;
              datas.push(d);
            }
          }
        }
        index++;
      }
      index = 1;
      for (let j = 0; j < this.familyData3Old.length; j++) {

        var abm_id = this.familyData3Old[j].abm_id;
        var isOk = false;
        for (let i = 0; i < data5.length; i++) {
          var abm_id_ = data5[i].abm_id;
          // console.log("abm_ex2_====="+abm_ex2_);
          if (abm_id == abm_id_) {
            isOk = true;
          }
        }
        if (!isOk) {
          for (var key in this.familyData3Old[j]) {
            var text = this.family3Field[key];
            if (text) {
              var d = {};
              d.acc_ex1 = text;
              d.acc_ex2 = unescape(this.familyData3Old[j][key]);
              d.acc_ex3 = "";
              d.acc_ex4 = key;
              d.acc_ex5 = "非共同生活抚扶养人家庭成员";
              d.acc_ex6 = "删除";
              d.acc_ex7 = "del" + index;
              d.acc_ex8 = "姓名：" + this.familyData3Old[j]["abm_ex3"];
              d.acc_ex9 = this.familyData3Old[j]["abm_id"];
              datas.push(d);
            }
          }
        }
      }
      // 近亲属变更信息
      // console.log(datas);
      index = 1;
      for (let i = 0; i < data6.length; i++) {
        var abm_id = data6[i].abm_id;
        if (abm_id == "" || abm_id == "0" || abm_id == undefined) {
          for (var key in data6[i]) {
            var val = data6[i][key];
            var text = this.family4Field[key];
            if (key.indexOf("_id") != -1 || !text || key == "abm_ex6" || val == "") {
              continue;
            }
            var d = {};
            d.acc_ex1 = text;
            d.acc_ex2 = "";
            d.acc_ex3 = val;
            d.acc_ex4 = key;
            d.acc_ex5 = "近亲属";
            d.acc_ex6 = "新增";
            d.acc_ex7 = "add" + index;
            datas.push(d);
          }

        } else {
          var data_ = {};
          for (let j = 0; j < this.familyData4Old.length; j++) {
            var abm_id_ = this.familyData4Old[j].abm_id;
            if (abm_id == abm_id_) {
              data_ = this.familyData4Old[j];
            }
          }

          // index=1;
          // var html="";
          for (var key in data6[i]) {
            if (key.indexOf("_id") != -1 || key == "abm_ex6")
              continue;
            var val = data6[i][key];
            var old = data_[key];
            var text = this.family4Field[key];
            if (val != old && text) {
              var d = {};
              d.acc_ex1 = text;
              d.acc_ex2 = old;
              d.acc_ex3 = val;
              d.acc_ex4 = key;
              d.acc_ex5 = "近亲属";
              d.acc_ex6 = "修改";
              d.acc_ex7 = "edit" + index;
              d.acc_ex8 = "姓名：" + data_["abm_ex3"];
              d.acc_ex9 = abm_id;
              datas.push(d);
            }
          }
        }
        index++;
      }
      index = 1;
      for (let j = 0; j < this.familyData4Old.length; j++) {

        var abm_id = this.familyData4Old[j].abm_id;
        var isOk = false;

        for (let i = 0; i < data6.length; i++) {
          var abm_id_ = data6[i].abm_id;
          if (abm_id == abm_id_) {
            isOk = true;
          }
        }

        console.log(isOk, "近亲属");
        if (!isOk) {
          for (var key in this.familyData4Old[0]) {
            var text = this.family4Field[key];
            if (text) {
              var d = {};
              d.acc_ex1 = text;
              d.acc_ex2 = unescape(this.familyData4Old[j][key]);
              d.acc_ex3 = "";
              d.acc_ex4 = key;
              d.acc_ex5 = "近亲属";
              d.acc_ex6 = "删除";
              d.acc_ex7 = "del" + index;
              d.acc_ex8 = "姓名：" + this.familyData4Old[j]["abm_ex3"];
              d.acc_ex9 = this.familyData4Old[j]["abm_id"];
              datas.push(d);
            }
          }
        }
      }

      // 12月收入变更信息
      // console.log(datas);
      index = 1;
      let income = this.income;
      console.log('收入变更报告录入 =》', income);
      for (let i in income) {
        var abi_id = income[i].abi_id;
        // console.log('收入外层 报告=》', abi_id,income[i].abi_ex1);
        // console.log('收入外层 i =》', i);
        // console.log('income[i].abi_ex1 != "家庭月人均收入" =》', income[i].abi_ex1 != "家庭月人均收入");
        if ((abi_id == "" || abi_id == "0" || abi_id == undefined) && income[i].abi_ex1 != "家庭月人均收入") {
          // console.log('收入下标=》',i);
          // console.log(income[i].abi_ex1,'条件');
          for (var key in income[i]) {
            console.log('收入内层 i =》', i);
            var val = income[i][key];
            var text = this.incomeField[key];
            if (key.indexOf("_id") != -1 || !text || val == "") {
              continue;
            }

            var d = {};
            d.acc_ex1 = text;
            d.acc_ex2 = "";
            d.acc_ex3 = val;
            d.acc_ex4 = key;
            d.acc_ex5 = "12个月收入";
            d.acc_ex6 = "新增";
            d.acc_ex7 = "add" + index;
            switch (income[i].abi_ex4) {
              case "A":
                d.acc_ex8 = "工资性收入"; break;
              case "B":
                d.acc_ex8 = "经营性收入"; break;
              case "C":
                d.acc_ex8 = "财产性收入"; break;
              case "D":
                d.acc_ex8 = "转移净收入"; break;
              case "E":
                d.acc_ex8 = "其他收入"; break;
              case "F":
                d.acc_ex8 = "必要就业成本抵扣"; break;
              case "G":
                d.acc_ex8 = "总收入"; break;
            }
            datas.push(d);
            console.log('收入内层 i 后=》', i);
          }

        } else {
          var data_ = {};
          for (let j = 0; j < this.incomeOld.length; j++) {
            var abi_id_ = this.incomeOld[j].abi_id;
            if (abi_id == abi_id_) {
              data_ = this.incomeOld[j];
            }
          }

          // index=1;
          // var html="";
          for (var key in income[i]) {
            if (key.indexOf("_id") != -1 && income[i].abi_ex1 != "总收入")
              continue;
            var val = income[i][key];
            var old = data_[key];
            var text = this.incomeField[key];
            if (val != old && text) {

              var d = {};
              d.acc_ex1 = text;
              d.acc_ex2 = old;
              d.acc_ex3 = val;
              d.acc_ex4 = key;
              d.acc_ex5 = "12个月收入";
              d.acc_ex6 = "修改";
              d.acc_ex7 = "edit" + index;
              switch (income[i].abi_ex4) {
                case "A":
                  d.acc_ex8 = "工资性收入"; break;
                case "B":
                  d.acc_ex8 = "经营性收入"; break;
                case "C":
                  d.acc_ex8 = "财产性收入"; break;
                case "D":
                  d.acc_ex8 = "转移净收入"; break;
                case "E":
                  d.acc_ex8 = "其他收入"; break;
                case "F":
                  d.acc_ex8 = "必要就业成本抵扣"; break;
                case "G":
                  d.acc_ex8 = "总收入"; break;
              }
              if (income[i].abi_ex1 == "家庭月平均收入") {
                d.acc_ex8 = "家庭月平均收入"
              }
              if (income[i].abi_ex1 == "家庭月人均收入") {
                d.acc_ex8 = "家庭月人均收入"
              }
              d.acc_ex9 = abi_id;
              datas.push(d);
            }
          }
        }
        index++;
      }
      index = 1;
      // console.log(this.incomeOld,"incomeOld");
      // console.log(income,"income");
      for (let j = 0; j < this.incomeOld.length; j++) {

        var abi_id = this.incomeOld[j].abi_id;
        var isOk = false;
        for (let i = 0; i < income.length; i++) {
          var abi_id_ = income[i].abi_id;
          if (abi_id == abi_id_) {
            isOk = true;
          }
        }
        if (this.incomeOld[j].abi_ex4 == "G") {
          isOk = true;
        }
        if (!isOk) {
          for (var key in this.incomeOld[0]) {
            var text = this.incomeField[key];
            if (text) {
              var d = {};
              d.acc_ex1 = text;
              d.acc_ex2 = unescape(this.incomeOld[j][key]);
              d.acc_ex3 = "";
              d.acc_ex4 = key;
              d.acc_ex5 = "12个月收入";
              d.acc_ex6 = "删除";
              d.acc_ex7 = "del" + index;
              if (j < income.length) {
                switch (income[j].abi_ex4) {
                  case "A":
                    d.acc_ex8 = "工资性收入"; break;
                  case "B":
                    d.acc_ex8 = "经营性收入"; break;
                  case "C":
                    d.acc_ex8 = "财产性收入"; break;
                  case "D":
                    d.acc_ex8 = "转移净收入"; break;
                  case "E":
                    d.acc_ex8 = "其他收入"; break;
                  case "F":
                    d.acc_ex8 = "必要就业成本抵扣"; break;
                  // case "G":
                  // 	d.acc_ex8="总收入";break;
                }
              }
              d.acc_ex9 = this.incomeOld[j]["abi_id"];
              datas.push(d);
            }
          }
        }
      }

      // 刚性支出
      // console.log(payData,"--------------payData");
      // console.log(this.payOld,"payOld");
      console.log(this.payOld2, "payOld2");
      for (var key in payData[0]) {
        var val = payData[0][key];
        var old = this.payOld[key];

        // console.log(val,"1--------------pay==val1");
        // console.log(old,'1-------------pay==old1');

        old = old == undefined || old == "undefined" || old == null || old == "null" ? "" : old
        val = val == undefined || val == "undefined" || val == null || val == "null" ? "" : val

        // console.log(val,"2--------------pay==val");
        // console.log(old,'2--------------pay==old');

        if (old != val && key.indexOf("abm_") == -1 && key.indexOf("ab_") == -1 && key.indexOf("_id") == -1 && key.indexOf("ac_") == -1) {
          // console.log("1111");
          console.log("key===" + key + "==" + val + "==" + old)
          var d = {};
          var name = "";
          if (key == "abp_ex5")
            name = "教育支出";
          else
            name = this.getLabel(key);
          console.log(name, "支出变更");

          if (name) {
            name = name.replace("&nbsp;", "");
          }
          // console.log("key==111="+key+"=="+val+"=="+old+"=="+name);
          if (name) {
            d.acc_ex1 = name;
            d.acc_ex2 = escape(old);
            d.acc_ex3 = escape(val);
            d.acc_ex4 = key;
            d.acc_ex5 = "支出情况修改";
            d.acc_ex6 = "修改";
            datas.push(d);
          }
          // console.log(d,"支出变更");
        }
      }

      // 家庭财产： 车船、房屋    
      index = 1;
      var estates = [];
      let estate = this.estate1;
      for (let i = 0; i < this.estate1.length; i++) {
        var abe_id = estate[i].abe_id;
        if (abe_id == "" || abe_id == "0" || abe_id == undefined) {
          for (var key in estate[i]) {
            var val = estate[i][key];
            var text = this.estate1Field[key]
            if (key.indexOf("_id") != -1 || !text || val == "") {
              continue;
            }
            var d = {};
            d.acc_ex1 = text;
            d.acc_ex2 = "";
            d.acc_ex3 = val;
            d.acc_ex4 = key;
            d.acc_ex5 = "家庭财产(车船)";
            d.acc_ex6 = "新增";
            d.acc_ex7 = "add" + index;
            datas.push(d);
          }
        } else {
          var data_ = {};
          for (let j = 0; j < this.estate1Old.length; j++) {
            var abe_id_ = this.estate1Old[j].abe_id;
            if (abe_id == abe_id_) {
              data_ = this.estate1Old[j];
            }
          }
          // index=1;
          // var html="";
          for (var key in estate[i]) {
            if (key.indexOf("_id") != -1)
              continue;
            var val = estate[i][key];
            var old = data_[key];
            var text = this.estate1Field[key]
            if (val != old && text) {
              var d = {};
              d.acc_ex1 = text;
              d.acc_ex2 = old;
              d.acc_ex3 = val;
              d.acc_ex4 = key;
              d.acc_ex5 = "家庭财产(车船)";
              d.acc_ex6 = "修改";
              d.acc_ex7 = "edit" + index;
              d.acc_ex9 = abe_id;
              datas.push(d);
            }
          }
        }
        index++;
      }

      index = 1;
      for (let j = 0; j < this.estate1Old.length; j++) {
        var abe_id = this.estate1Old[j].abe_id;
        var isOk = false;
        for (let i = 0; i < estate.length; i++) {
          var abe_id_ = estate[i].abe_id;
          if (abe_id == abe_id_) {
            isOk = true;
          }
        }
        if (!isOk) {
          for (var key in this.estate1Old[j]) {
            var text = this.estate1Field[key];
            if (text) {
              var d = {};
              d.acc_ex1 = text;
              d.acc_ex2 = this.estate1Old[j][key];
              d.acc_ex3 = "";
              d.acc_ex4 = key;
              d.acc_ex5 = "家庭财产(车船)";
              d.acc_ex6 = "删除";
              d.acc_ex7 = "del" + index;
              d.acc_ex9 = abe_id;
              datas.push(d);
            }
          }
        }
      }
      index = 1;
      let estate2 = this.estate2;
      var estates = [];
      for (let i = 0; i < estate2.length; i++) {

        var abe_id = estate2[i].abe_id;
        if (abe_id == "" || abe_id == "0" || abe_id == undefined) {
          for (var key in estate2[i]) {
            var val = estate2[i][key];
            var text = this.estate2Field[key]
            if (key.indexOf("_id") != -1 || !text || val == "") {
              continue;
            }
            var d = {};
            d.acc_ex1 = text;
            d.acc_ex2 = "";
            d.acc_ex3 = val;
            d.acc_ex4 = key;
            d.acc_ex5 = "拥有房产情况";
            d.acc_ex6 = "新增";
            d.acc_ex7 = "add" + index;
            datas.push(d);
          }
        } else {
          var data_ = {};
          for (let j = 0; j < this.estate2Old.length; j++) {
            var abe_id_ = this.estate2Old[j].abe_id;
            if (abe_id == abe_id_) {
              data_ = this.estate2Old[j];
            }
          }
          // index=1;
          // var html="";
          for (var key in estate2[i]) {
            if (key.indexOf("_id") != -1)
              continue;
            var val = estate2[i][key];
            var old = data_[key];
            var text = this.estate2Field[key];
            if (val != old && text) {
              var d = {};
              d.acc_ex1 = text;
              d.acc_ex2 = old;
              d.acc_ex3 = val;
              d.acc_ex4 = key;
              d.acc_ex5 = "拥有房产情况";
              d.acc_ex6 = "修改";
              d.acc_ex7 = "edit" + index;
              d.acc_ex9 = abe_id;
              datas.push(d);
            }
          }
        }
        index++;
      }
      index = 1;
      console.log('车船 变更=》', this.estate2Old);
      for (let j = 0; j < this.estate2Old.length; j++) {
        var abe_id = this.estate2Old[j].abe_id;
        var isOk = false;
        for (let i = 0; i < estate2.length; i++) {
          var abe_id_ = estate2[i].abe_id;
          if (abe_id == abe_id_) {
            isOk = true;
          }
        }
        console.log(isOk, "===车船1====");
        console.log(estate2, "====车船2====");
        if (!isOk) {
          for (var key in this.estate2Old[j]) {
            var text = this.estate2Field[key];
            if (text) {
              var d = {};
              d.acc_ex1 = text;
              d.acc_ex2 = this.estate2Old[j][key];
              d.acc_ex3 = "";
              d.acc_ex4 = key;
              d.acc_ex5 = "拥有房产情况";
              d.acc_ex6 = "删除";
              d.acc_ex7 = "del" + index;
              d.acc_ex9 = abe_id;
              datas.push(d);
            }
          }
        }
      }
      this.datas = datas;
      console.log(datas, '变更情况=》');

      // return false;
      // ???下面两个条件不知道有没有用，以后有空看看
      if (this.dibaoForm.ab_ex7 == '' || this.dibaoForm.ab_ex7.length != 18) {
        this.$message.warning('请输入正确的身份证号')
        return false
      }
      if (this.dibaoForm.ab_ex3 == '') {
        this.$message.warning('请输入姓名')
        return false
      }


      // 数据在低保（按户保） 符合 特困 
      // 1、选择留在低保，且未修改数据 -->  提示：未检测出数据变动，无法生成变更记录
      // 2、选择变为特困，且数据未修改 -->  获取参数，发送给后端，类型要修改

      // 数据在特困 符合 特困
      // 1、选择留在特困，且未修改数据 -->  提示：未检测出数据变动，无法生成变更记录
      // 2、选择变为低保，且数据未修改 -->  获取参数，发送给后端，类型要修改

      console.log(this.ab_ex13, '选择类型');
      console.log(this.dibaoForm.ab_ex13, '原类型');

      if (this.datas.length == 0 && this.ab_ex13 == this.dibaoForm.ab_ex13) {
        console.log('未检测出数据变动且未进行救助类型改变，无法生成变更记录!');
      } else if (this.datas.length == 0 && this.ab_ex13 != this.dibaoForm.ab_ex13) {
        console.log('未检测出数据变动但救助类型发生了改变，可以生成变更记录!');
      }

      if (this.datas.length == 0) {
        await this.$confirm('未检测出数据变动，无法生成变更记录!', '提示', {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          customClass: 'myClass1'
        }).then(() => {
          // this.isSaves = true;
          console.log("无法生成变更记录,确定");
          return false;
        }).catch(action => {
          // 取消留在本页
          console.log("留在本页");
          this.isSaves = false;
          return false;
        });
      } else {
        this.dialogVisible4 = false; //计算器关闭
        this.getDatailMoney(); //明细表显示
        // console.log(this.dibaoFormOld.ab_ex13,'老类型'); //空
        console.log(this.dibaoForm.ab_ex13, '新类型');
        console.log(this.jsjgString, '计算结果');
        console.log(this.ab_ex13, '选择的救助类型');

        if (this.dibaoForm.ab_ex13 == '特困供养') {
          if (this.jsjgString.indexOf('特困人员供养') != -1) {
            // 特困 变 特困 展示明细表
            this.jstext = '';
          } else if (this.jsjgString == '最低生活保障-按户保') {
            // 特困 变 低保 展示明细表
            this.jstext = '';
            this.ab_ex13 = '';
          } else if (this.jsjgString != '') {
            // 特困 变 其他（特困之外的）信息提示'超出特困标准保障金变为0' ;
            this.jstext = '超出特困标准，变更后保障金变为 0 元';
            // 将默选择的特困类型清空
            this.ab_ex13 = '';

          } else {
            // 超出所有救助标准
            this.jstext = '当前变更信息不符合救助类型，请确认是否要变更？';
          }
        } else if (this.dibaoForm.ab_ex13 == '低保' && this.dibaoForm.ab_ex41 == '低收入型低保') {
          console.log('结果为特困时选择的救助类型=》', this.ab_ex13);

          if (this.jsjgString.indexOf('特困人员供养') != -1) {
            console.log(this.jsjgString, '其他低保1');
            // 低保 变 特困 信息提示'特困办结后的出保障金' 
            if (this.ab_ex13 == '特困供养' && this.dibaoForm.ab_ex207 != '是') {
              console.log(this.jsjgString, '其他低保2');
              // 低保 变 特困  选择特困
              this.jstext = '当前变更信息符合特困供养救助类型，保障金标准为 ' + this.tkStandard + ' 元，该户保障金将在新救助类型审批环节完成认定。';
            } else if (this.ab_ex13 == '低保' || this.dibaoForm.ab_ex207 == '是') {
              console.log(this.jsjgString, '其他低保3');
              // 低保 变 特困  选择低保
              this.jstext = '';
            }
          } else if (this.jsjgString == '最低生活保障-按户保' || this.ab_ex13 == '低保') {
            // 低保 变 低保展示明细表
            this.jstext = '';
            // 将默选择的特困类型清空
            this.ab_ex13 = '';
          } else if (this.jsjgString != '') {

            console.log(this.jsjgString, '其他低保');
            this.ab_ex13 = '';
            // 低保 变 其他（特困之外的）信息提示'超出低保标准保障金变为0' 
            if (this.dibaoForm.ab_ex207 == '是' && this.income7[2].abi_ex2 <= 2 * this.dbStandard) {
              this.jstext = '';
            } else {
              this.jstext = '当前变更信息符合' + this.jsjgString + '，超出低保标准，变更后保障金变为 0 元。';
            }

          } else {
            // 超出所有救助标准
            this.jstext = '当前变更信息不符合救助类型，请确认是否要变更？';
            this.ab_ex13 = '';
          }

        } else if (this.dibaoForm.ab_ex41.indexOf('单列户') != -1) {
          // 将默选择的特困类型清空

          if (this.jsjgString.indexOf('按人保') != -1) {
            // ' 其他 显示明细表' 
            this.jstext = '';

          } else {
            // 超出所有救助标准
            this.jstext = '当前变更信息不符合救助类型，请确认是否要变更？';
          }
        } else if (this.dibaoForm.ab_ex13 != '低保' || this.dibaoForm.ab_ex13 != '特困供养') {
          // 将默选择的特困类型清空
          console.log(22222222222222222222);

          if (this.jsjgString.indexOf('特困') != -1) {
            // // 其他类型 变更后为特困供养 因为没有填报生活费和护理费 信息提示'特困办结后的出保障金' 
            // this.jstext = '当前变更信息符合特困供养救助类型，保障金标准为 '+this.tkStandard+' 元，该户保障金将在新救助类型审批环节完成认定。';

            if (this.ab_ex13 == '特困供养' && this.dibaoForm.ab_ex207 != '是') {
              console.log(456798);
              this.ab_ex13 = '特困供养';
              // 其他类型 变更后为特困供养 因为没有填报生活费和护理费 信息提示'特困办结后的出保障金' 
              this.jstext = '当前变更信息符合特困供养救助类型，保障金标准为 ' + this.tkStandard + ' 元，该户保障金将在新救助类型审批环节完成认定。';

            } else if (this.ab_ex13 == '低保' || this.dibaoForm.ab_ex207 == '是') {
              this.ab_ex13 = '低保';
              this.jstext = '';
            }

          } else if (this.jsjgString == '最低生活保障-按户保') {
            //   其他 变 低保  显示明细表，没有提示
            this.jstext = '';
          } else if (this.jsjgString.indexOf('单列户') != -1) {
            // ' 其他 显示明细表' 
            // this.ab_ex13 = this.dibaoForm.ab_ex41;
            this.jstext = '';

          } else if (this.jsjgString != '') {
            // '其他 变 其他 不显示明细表' 
            // this.jstext = '当前变更信息符合'+this.jsjgString+'，超出救助标准，变更后保障金变为0';
            this.jstext = '当前变更信息符合' + this.jsjgString + '，变更后保障金为 0 元。';

          } else {
            // 超出所有救助标准
            this.jstext = '当前变更信息不符合救助类型，请确认是否要变更？';
          }
        }

        console.log('保障金变更提示', this.jstext);
        this.moneybtn = true;  // 明细表 确定按钮
      }
    },

    async save3 () {
      this.dialogVisible2 = false; //明细表显示

      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });

      // 保存禁用
      this.disabled = true;

      // 设置定时器，30秒请求失败刷新页面
      let time = setTimeout(() => {
        loading.close()
        this.$emit("closes", false)
        this.$message.error("网络异常");
        this.$router.go(-1)
      }, 30000)
      this.saveBasicChange({
        "data": JSON.stringify(this.datas),
        "sId": this.$route.query.sId,
        // ac_ex10 : this.changeM.ac_ex10!='其他' ? this.changeM.ac_ex10 : this.changeM.ac_ex10_2,
        ac_ex10: this.changeM.ac_ex10,
        ac_dat1: this.changeM.ac_dat1,
        ab_ex13: this.dibaoForm.ab_ex13, //本身的类型
        ab_ex41: this.ab_ex13, //选择/计算的类型
        ac_ex13: this.ab_ex13 //选择/计算的类型
      }).then((res) => {
        if (res[0].status == "+Ok") {
          loading.close()
          this.$message.success(res[0].msg)
          this.closeView();
          // console.log("保存成功");
        } else {
          loading.close()
          this.$message.error(res[0].msg)
        }
      }).catch((res) => {
        // 数据请求成功删除定时器
        clearTimeout(time);
        if (res.response.data[0].status == "+Ok") {
          loading.close()
          this.$message.success(res.response.data[0].msg)
          this.closeView();
          // console.log("保存成功");
        } else {
          loading.close()
          this.$message.error(res.response.data[0].msg)
        }
      })
    },

    getLabel (id) {

      let name = "";
      var arr = document.getElementsByTagName("label");
      for (let i = 0; i < arr.length; i++) {
        //取出参数for的值
        if (arr[i].getAttributeNode("for")) {

          var forvalue = arr[i].getAttributeNode("for").value;

          //因为for的值和相应checkbox的id对应，所以判断是否相等，如果
          //相等，那么它的innerHTML的值就是label的显示的值

          if (forvalue == id) {
            //或者使用innerText来获取。
            name = arr[i].innerHTML;
          }
        }
      }
      return name;
    },

    // 账号识别
    checkSpecialAccount () {
      return request({
        url: "/social/common/checkSpecialAccount",
        method: "post",
        // data: data,
      });
    },

    // 自定义预警
    loadWarning (data) {
      return request({
        method: 'post',
        url: '/social/assistance/getBasicWaring4',
        data: data
      })
    },
    // 家庭成员
    loadFamily (data) {
      return request({
        method: 'post',
        url: '/social/assistance/getBasicFamily',
        data: data
      })
    },
    // 家庭收入
    getBasicIncome (data) {
      return request({
        url: "/social/assistance/getBasicIncome",
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
    loadEstate (data) {
      return request({
        // headers: {
        // 	accept: 'application/json',
        // },
        method: 'post',
        url: '/social/assistance/getBasicEstate',
        data: data
      })
    },
    loadAgent (data) {
      return request({
        method: 'post',
        url: '/social/assistance/getBasicAgent',
        data: data
      });
    },
    loadLand (data) {
      return request({
        method: 'post',
        url: '/social/assistance/getBasicLand',
        data: data
      });
    },
    getBasicsChange (data) {
      return request({
        method: 'post',
        url: '/social/assistance/getBasicsChange',
        data: data
      })
    },
    saveBasicChange (data) {
      return request({
        method: 'post',
        url: '/social/assistance/saveBasicChange',
        data: data
      })
    },

    getBirthdayFromIdCard (idCard) {
      var birthday = "";
      if (idCard != null && idCard != "") {
        if (idCard.length == 15) {
          birthday = "19" + idCard.substr(6, 6);
        } else if (idCard.length == 18) {
          birthday = idCard.substr(6, 8);
        }
        birthday = birthday.replace(/(.{4})(.{2})/, "$1-$2-");
      }
      return birthday;
    },
    //获取性别
    getSex (card) {
      let sex = "";
      let msg = isCardID(card);
      // console.log(msg);
      if (msg == true) {
        // if(parseInt(card.substr(16,1))%2==1){ 
        // 	sex="男";
        // }else 
        // 	sex="女";
        sex = parseInt(card.substr(16, 1)) % 2 == 1 ? '男' : '女';
      }
      return sex;
    },
    getAge (identityCard) {
      var len = (identityCard + "").length;

      if (len == 0) {
        return 0;
      } else {
        if ((len != 15) && (len != 18))//身份证号码只能为15位或18位其它不合法
        { return 0; }
      }
      var strBirthday = "";
      if (len == 18) {//处理18位的身份证号码从号码中得到生日和性别代码
        strBirthday = identityCard.substr(6, 4) + "/" + identityCard.substr(10, 2) + "/" + identityCard.substr(12, 2);
      } else if (len == 15) {
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
      return age;
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
              break;
              //document.getElementById(key).style.border="1px solid red"
            } else {
              //document.getElementById(key).style.border="1px solid #C0C4CC"
            }
          } catch (e) { }
        }
        return msg;
      } catch (e) {
        return "";
      }
    },
    getNation (index) {
      if (this.familyData1[index].age >= 18 && this.familyData1[index].age < 60) {

        //如果民族非空且不是汉族，特定对象又没选，特定对象自动赋值
        if ((this.familyData1[index].abm_ex16 != "汉族" && this.familyData1[index].abm_ex16 != "") && !this.familyData1[index].abm_ex51) {
          this.$set(this.familyData1[index], "abm_ex51", "少数民族");
        } else {
          this.tddx(index)
        }
      }
    },
    tddx (index, row, id) {
      let rowIndex = Number(index) + 1;
      // let isOk=true;
      if (this.familyData1[index].abm_ex51 != "") {
        this.familyData1[index].age = this.getAge(this.familyData1[index].abm_ex2);
        if (this.familyData1[index].age >= 60 && this.familyData1[index].abm_ex51 != "老年人") {
          this.$message.warning("第" + (rowIndex) + "行共同生活家庭成员，特定对象首选为 老年人，请重新选择");
          return false
        } else if (this.familyData1[index].age < 18 && this.familyData1[index].abm_ex51 != "未成年人") {
          this.$message.warning("第" + (rowIndex) + "行共同生活家庭成员，特定对象应为 未成年人，请重新选择");
        } else if (this.familyData1[index].age > 18 && this.familyData1[index].age < 60) {
          if (this.familyData1[index].abm_ex16 != "汉族" && this.familyData1[index].abm_ex51 != "少数民族") {
            this.$message.warning("第" + (rowIndex) + "行共同生活家庭成员，特定对象应为 少数民族，请重新选择");
          } else if (this.familyData1[index].abm_ex16 == "汉族" && this.familyData1[index].abm_ex51 == "少数民族") {
            this.$message.warning("第" + (rowIndex) + "行共同生活家庭成员，特定对象不能为 少数民族，请重新选择");
          } else if (this.familyData1[index].abm_ex16 == "汉族" && this.familyData1[index].abm_ex11 == "重病" && this.familyData1[index].abm_ex51 != "重病") {
            this.$message.warning("第" + (rowIndex) + "行共同生活家庭成员，特定对象应为 重病，请重新选择");
          } else if (this.familyData1[index].abm_ex16 == "汉族" && this.familyData1[index].abm_ex11 == "重残" && this.familyData1[index].abm_ex51 != "重残") {
            this.$message.warning("第" + (rowIndex) + "行共同生活家庭成员，特定对象应为 重残，请重新选择");
          }
        }
      }
    },
    changeCard (index, row, id) {
      if (id == "f1.abm_ex2") {
        this.familyData1[index].abm_ex2 = row.abm_ex2.replace(/\s+/g, "");
        this.familyData1[index].abm_ex2 = row.abm_ex2.replace(/x$/i, "X");
        var msg = isCardID(this.familyData1[index].abm_ex2)
        if (msg != true) {
          console.log(msg);
          this.$message.warning("第" + (index + 1) + "行共同生活成员" + msg);
          return false;
        }
      }
      this.familyData1[index].abm_ex5 = this.getSex(this.familyData1[index].abm_ex2);
      this.familyData1[index].age = this.getAge(this.familyData1[index].abm_ex2);
      // console.log(this.getSex(this.familyData1[index].abm_ex2));
      // console.log(this.familyData1[index].abm_ex2);
      if (this.familyData1[index].age < 18 || this.familyData1[index].age >= 60) {
        this.$set(this.familyData1[index], "work", "否");
        if (this.familyData1[index].age < 18 && this.familyData1[index].abm_ex51 == "") {
          this.$set(this.familyData1[index], "abm_ex51", "未成年人");
        } else if (this.familyData1[index].age >= 60 && this.familyData1[index].abm_ex51 == "") {
          this.$set(this.familyData1[index], "abm_ex51", "老年人");
        }
      } else {
        this.$set(this.familyData1[index], "work", "是");
      }
    },
    changeCard2 (index, row, id) {
      let rowIndex = Number(index + 1);
      this.familyData2[index].abm_ex2 = row.abm_ex2.replace(/\s+/g, "");
      this.familyData2[index].abm_ex2 = row.abm_ex2.replace(/x$/i, "X");
      if (id == "f2.abm_ex2") {
        var msg = isCardID(this.familyData2[index].abm_ex2)
        if (msg != true) {
          console.log(msg);
          this.$message.warning("第" + (rowIndex) + "行非共同生活赡抚养人" + msg);
          return false;
        }
      }
      let sex = this.getSex(this.familyData2[index].abm_ex2)
      this.$set(this.familyData2[index], "abm_ex5", sex);
    },
    changeCard3 (index, row, id) {
      let rowIndex = Number(index + 1);
      this.familyData3[index].abm_ex2 = row.abm_ex2.replace(/\s+/g, "");
      this.familyData3[index].abm_ex2 = row.abm_ex2.replace(/x$/i, "X");
      if (id == "f3.abm_ex2") {
        var msg = isCardID(this.familyData3[index].abm_ex2)
        if (msg != true) {
          console.log(msg);
          this.$message.warning("第" + (rowIndex) + "行共非同生活赡抚养人家庭成员" + msg);
          return false;
        }
      }
      let sex = this.getSex(this.familyData3[index].abm_ex2)
      this.$set(this.familyData3[index], "abm_ex5", sex);
    }
  }
}
</script>

<style scoped>
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
.g-box {
  height: 80vh !important;
}
.g-box2 {
  overflow: auto !important;
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
}
.line_blue {
  border-left: 2px solid #3385ff;
}
.lineSt {
  background-color: #dcdfe6;
  height: 1px;
  width: 100%;
  margin-bottom: 10px;
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
.change_title {
  display: inline-block;
  margin: 0 0 5px 20px;
  color: #606266;
  font-size: 14px;
}
.eg {
  display: none;
}
.my-table >>> .el-input__inner {
  border: 0;
}
.srname >>> .el-input__inner {
  text-align: center;
}
div >>> .el-table__empty-block {
  border-bottom: 1px solid #eee;
  height: auto !important;
  background-image: none;
}
</style>
<style >
.myClass1 .el-message-box__title > span {
  font-size: 16px !important;
}
</style>
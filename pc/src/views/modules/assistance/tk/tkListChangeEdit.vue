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
                 style='padding-right: 10px;'>
          <h3 class="line_blue"
              id="page1">&emsp;基本信息</h3>
          <div class="lineSt"></div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="申请人姓名"
                            prop="ab_ex3">
                <el-input v-model="dibaoForm.ab_ex3"
                          placeholder="请输入申请人姓名"
                          @change="keyVerification(dibaoForm.ab_ex3,'ab_ex3')"></el-input>
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
                             placeholder="请选择"
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
                <!-- <el-input v-model="dibaoForm.ab_ex5" placeholder="请输入家庭人口"  @change="changeAmt"  ></el-input> -->
              </el-form-item>
            </el-col>

          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="联系电话"
                            prop="ab_ex28">
                <el-input v-model="dibaoForm.ab_ex28"
                          placeholder="请输入联系电话（手机）"
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
                           placeholder="请选择求助原因（可多选）"
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
            <h3 class="line_blue">&emsp;村干部或经办人员近亲属信息</h3>
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
            <el-col :span="24">
              <el-form-item label="一卡通银行账号"
                            prop="ab_ex43">
                <el-input v-model="dibaoForm.ab_ex43"
                          placeholder="请输入银行账号"
                          @change="keyVerification(dibaoForm.ab_ex43,'ab_ex43')"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <h3 class="line_blue"
              id="page2">&emsp;自定义预警</h3>
          <div class="lineSt"></div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="预警内容1"
                            prop="aw_ex1">
                <el-input v-model="waringData[0].aw_ex1"
                          placeholder="请输入预警内容"
                          @change="changeAmt2"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="预警时间1"
                            prop="aw_ex1">
                <el-date-picker v-model="waringData[0].aw_dat1"
                                value-format="yyyy-MM-dd"
                                style="width: 100%;"
                                :picker-options="pickerOptions"
                                @change="changeAmt2">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="预警内容2"
                            prop="aw_ex1">
                <el-input v-model="waringData[1].aw_ex1"
                          placeholder="请输入预警内容"
                          @change="changeAmt2"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="预警时间2"
                            prop="aw_ex1">
                <el-date-picker type="date"
                                v-model="waringData[1].aw_dat1"
                                value-format="yyyy-MM-dd"
                                style="width: 100%;"
                                :picker-options="pickerOptions"
                                @change="changeAmt2">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="预警内容3"
                            prop="aw_ex1">
                <el-input v-model="waringData[2].aw_ex1"
                          placeholder="请输入预警内容"
                          @change="changeAmt2"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="预警时间3"
                            prop="aw_ex1">
                <el-date-picker type="date"
                                v-model="waringData[2].aw_dat1"
                                value-format="yyyy-MM-dd"
                                style="width: 100%;"
                                :picker-options="pickerOptions"
                                @change="changeAmt2">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <h3 class="line_blue"
              id="page8"
              style='margin-top:15px'>&emsp;变更信息</h3>
          <div class="lineSt"></div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label='变更理由'>
                <el-select v-model='changeM.ac_ex10'
                           placeholder='请选择'>
                  <el-option label='人口增加'
                             value='人口增加'></el-option>
                  <el-option label='人口减少'
                             value='人口减少'></el-option>
                  <el-option label='收入变化'
                             value='收入变化'></el-option>
                  <el-option label='保障标准调整'
                             value='保障标准调整'></el-option>
                  <el-option label='其他'
                             value='其他'></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label='说明情况'>
                <el-input :disabled="changeM.ac_ex10!='其他'"
                          v-model='changeM.ac_ex10_2'
                          placeholder='请输入说明情况'></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label='变更时间'>
                <el-date-picker type="date"
                                v-model="changeM.ac_dat1"
                                style="width: 100%;">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <h3 class="line_blue"
              id="page3">&emsp;共同生活家庭成员情况</h3>
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
                <el-select v-model="familyData1[scope.row.xh-1].abm_ex16">
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
                  <el-option label="请选择"
                             value=""></el-option>
                  <el-option label="未婚"
                             value="未婚"></el-option>
                  <el-option label="已婚"
                             value="已婚"></el-option>
                  <el-option label="离异"
                             value="离异"></el-option>
                  <el-option label="丧偶"
                             value="丧偶"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="abm_ex51"
                             label="特定对象"
                             min-width="200">
              <template slot-scope="scope">
                <el-select v-model="familyData1[scope.row.xh-1].abm_ex51">
                  <el-option label="请选择"
                             value=""></el-option>
                  <el-option label="老年人"
                             value="老年人"></el-option>
                  <el-option label="未成年人"
                             value="未成年人"></el-option>
                  <el-option label="独居"
                             value="独居"></el-option>
                  <el-option label="散居归侨侨属"
                             value="散居归侨侨属"></el-option>
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
                           :disabled="disabledList.indexOf('a'+scope.$index)>=0 "
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
                  <el-option label="系统性红斑狼疮（活动期或伴有脏器损害）"
                             value="系统性红斑狼疮（活动期或伴有脏器损害）"></el-option>
                  <el-option label="血友病"
                             value="血友病"></el-option>
                  <el-option label="肝硬化失代偿期"
                             value="肝硬化失代偿期"></el-option>
                  <el-option label="重症类风湿关节炎"
                             value="重症类风湿关节炎"></el-option>
                  <el-option label="强直性脊柱炎"
                             value="强直性脊柱炎"></el-option>
                  <el-option label="糖尿病合并严重并发症（限晚期糖尿病肾病、糖尿病足〈有坏疽、 深部溃疡、脓肿、骨髓炎〉患者）"
                             value="糖尿病合并严重并发症（限晚期糖尿病肾病、糖尿病足〈有坏疽、 深部溃疡、脓肿、骨髓炎〉患者）"></el-option>
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
                           :disabled="disabledList2.indexOf('a'+scope.$index)>=0 "
                           @change="changeMember(scope.$index)">
                  <el-option :label="disabledList2.indexOf(scope.$index)>=0"
                             value=""></el-option>
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
              </template>
            </el-table-column>
            <el-table-column prop="abm_ex40"
                             label="残疾等级"
                             min-width="110">
              <template slot-scope="scope">
                <el-select v-model="familyData1[scope.row.xh-1].abm_ex40"
                           :disabled="disabledList2.indexOf('a'+scope.$index)>=0 "
                           @change="changeMember(scope.$index)">
                  <el-option label="请选择"
                             value=""></el-option>
                  <el-option label="一级"
                             value="一级"></el-option>
                  <el-option label="二级"
                             value="二级"></el-option>
                  <el-option label="三级"
                             value="三级"></el-option>
                  <el-option label="四级"
                             value="四级"></el-option>
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
                  <el-option label="无就业条件"
                             value="无就业条件"></el-option>
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
              id="page4">&emsp;非共同生活赡抚扶养人信息</h3>
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
                             label="赡（扶、抚）养关系"
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
                  <el-option label="（外）孙子女"
                             value="（外）孙子女"></el-option>
                  <el-option label="父母/岳父母/公婆"
                             value="父母/岳父母/公婆"></el-option>
                  <el-option label="（外）祖父母"
                             value="（外）祖父母"></el-option>
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
                  <el-option label="重残"
                             value="重残"></el-option>
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
                             label="月赡（扶、抚）养费"
                             min-width="130">
              <template slot-scope="scope">
                <el-input v-model="familyData2[scope.row.xh-1].abm_ex18"
                          @change="keyVerification2(scope.$index,scope.row,'f2.abm_ex18')"></el-input>
              </template>
            </el-table-column>
          </el-table>

          <h3 class="line_blue"
              id="page8">&emsp;非共同生活赡抚扶养人家庭成员信息</h3>
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
                             label="赡（扶、抚）养关系"
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
                  <el-option label="（外）孙子女"
                             value="（外）孙子女"></el-option>
                  <el-option label="父母/岳父母/公婆"
                             value="父母/岳父母/公婆"></el-option>
                  <el-option label="（外）祖父母"
                             value="（外）祖父母"></el-option>
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
                <el-input v-model="familyData3[scope.row.xh-1].abm_ex2"
                          @change="changeCard3(scope.$index,scope.row,'f3.abm_ex2')"></el-input>
              </template>
            </el-table-column>
          </el-table>

          <h3 class="line_blue"
              id="page5">&emsp;家庭前12个月收入情况</h3>
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
              <el-table-column label="工资性收入（年）"
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
              <el-button type="primary"
                         icon="el-icon-plus"
                         size="mini"
                         @click="handleAddDetails('income2')">新增</el-button>
              <el-button type="danger"
                         icon="el-icon-delete"
                         size="mini"
                         @click="handleDelDetails('income2')">删除</el-button>
            </el-row>
            <el-table :data="income2"
                      border
                      :row-class-name="rowClassName"
                      @selection-change="handleIncome2"
                      empty-text='空'
                      class="my-table">
              <el-table-column label="经营性收入（年）"
                               align="center">
                <el-table-column type="selection"
                                 min-width="40"
                                 align="center" />
                <el-table-column label="计入收入名称"
                                 prop="abi_ex1"
                                 min-width="140">
                  <!-- <template slot-scope="scope">
									<el-input v-model="income2[scope.row.xh-1].abi_ex1"></el-input>
								</template> -->
                  <template slot-scope="scope">
                    <el-select v-model="income2[scope.row.xh-1].abi_ex1">
                      <el-option label="请选择收入名称"
                                 value=""></el-option>
                      <el-option label="经营性净收入"
                                 value="经营性净收入"></el-option>
                    </el-select>
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
              <el-table-column label="财产性收入（年）"
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
              <el-table-column label="转移净收入（年）"
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
                      <el-option label="赡（扶、抚）养收入"
                                 value="赡（扶、抚）养收入"></el-option>
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
                      @selection-change="handleFamilyData3"
                      empty-text='空'
                      class="my-table">
              <el-table-column label="其他收入（年）"
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
                      @selection-change="handleFamilyData3"
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
                    <el-input v-model="income7[scope.row.xh-1].abi_ex1"
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
              id="page9">&emsp;家庭前12个月支出情况</h3>
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
                            prop="ab6_ex5"
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
              id="page6">&emsp;金融资产</h3>
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
              id="page10">&emsp;拥有车、船情况</h3>
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
                                 label="车（船)主"
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
                                 label="车（船)型"
                                 min-width="100">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.abe_ex8"
                              @change="keyVerification2(scope.$index,scope.row,'e1.abe_ex8')"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="abe_ex4"
                                 label="车（船)价值"
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
              id="page11">&emsp;拥有房产情况</h3>
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
                                 label="面积（平方）"
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
              id="page12">&emsp;居住状况照片</h3>
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
                  <span>房屋整体照片（每套房屋上传两张）(<span style='color:red'>{{dibaoForm.ab_ex166.split(",")[0]=="" ? 0 :dibaoForm.ab_ex166.split(",").length}}</span>)</span>
                  <el-button style="float: right; padding: 3px 0"
                             type="text"
                             @click="uploads('ab_ex166')">
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
                  <span>室内照片（每套房屋上传两张）(<span style='color:red'>{{dibaoForm.ab_ex167.split(",")[0]=="" ? 0 :dibaoForm.ab_ex167.split(",").length}}</span>)</span>
                  <el-button style="float: right; padding: 3px 0"
                             type="text"
                             @click="uploads('ab_ex167')">
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
              id="page7">&emsp;身份证及其他证明材料上传</h3>
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
                    <span>身份证拍照（正反面）(<span style='color:red'>{{dibaoForm.ab_ex10.split(",")[0]=="" ? 0 :dibaoForm.ab_ex10.split(",").length}}</span>)</span>
                    <el-button style="float: right; padding: 3px 0"
                               type="text"
                               @click="uploads('ab_ex10')">上传</el-button>
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
                    <span>纸质授权书(<span style='color:red'>{{dibaoForm.ab_ex177.split(",")[0]=="" ? 0 :dibaoForm.ab_ex177.split(",").length}}</span>)</span>
                    <el-button style="float: right; padding: 3px 0"
                               type="text"
                               @click="uploads('ab_ex177')">上传</el-button>
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
                    <span>其他证明材料(<span style='color:red'>{{dibaoForm.ab_ex16.split(",")[0]=="" ? 0 :dibaoForm.ab_ex16.split(",").length}}</span>)</span>
                    <el-button style="float: right; padding: 3px 0"
                               type="text"
                               @click="uploads('ab_ex16')">上传</el-button>
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
                    <span>审核审批表(<span style='color:red'>{{dibaoForm.ab_ex74.split(",")[0]=="" ? 0 :dibaoForm.ab_ex74.split(",").length}}</span>)</span>
                    <el-button style="float: right; padding: 3px 0"
                               type="text"
                               @click="uploads('ab_ex74')">上传</el-button>
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
                    <span>民主评议(<span style='color:red'>{{dibaoForm.ab_ex97.split(",")[0]=="" ? 0 :dibaoForm.ab_ex97.split(",").length}}</span>)</span>
                    <el-button style="float: right; padding: 3px 0"
                               type="text"
                               @click="uploads('ab_ex97')">上传</el-button>
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
                    <span>公示图片(<span style='color:red'>{{dibaoForm.ab_ex98.split(",")[0]=="" ? 0 :dibaoForm.ab_ex98.split(",").length}}</span>)</span>
                    <el-button style="float: right; padding: 3px 0"
                               type="text"
                               @click="uploads('ab_ex98')">上传</el-button>
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
                    <span>电子授权书(<span style='color:red'>{{dibaoForm.ab_ex73.split(",")[0]=="" ? 0 :dibaoForm.ab_ex73.split(",").length}}</span>)</span>
                    <el-button style="float: right; padding: 3px 0"
                               type="text"
                               @click="uploads('ab_ex73')">上传</el-button>
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
                     @click="save">保存</el-button>
          <el-button size="small"
                     @click="closeView">返回</el-button>
        </div>

        <div style="margin-left:40px;margin-top:20px;">
          <ul>
            <li :class="{listStyle:isShow1}"
                @click="isShow(1)">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow1}"
                 @click="counter('#page1')">基本信息</a><br>
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
import upload from '../upload'
import imageView from '../imageView'
export default {
  name: "tkListChangeEdit",
  components: {
    upload,
    imageView
  },
  data () {
    return {
      disabledList: [],
      disabledList2: [],
      pickerOptions: {
        disabledDate (time) {
          // 限制预警时间只能选择第10天及以后
          return time.getTime() < Date.now() + 8.64e7 * 9;
        }
      },
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
          }).catch(res => {
            console.log(res)
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
        abm_ex11: "健康状况",
        abm_ex52: "重病病种",
        abm_ex49: "劳动能力",
        abm_ex39: "残疾种类",
        abm_ex40: "残疾等级",
        abm_ex14: "职业状况",
        abm_ex15: "工作单位",
        abm_ex17: "月收入",
        abm_ex8: "增发类型",
        abm_ex42: "是否保障对象",
      },
      family2Field: {
        abm_ex3: "姓名",
        abm_ex1: "赡（扶、抚）养关系",
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
        abm_ex1: "赡（扶、抚）养关系",
        abm_ex2: "身份证号码",
      },
      family4Field: {
        abm_ex3: "姓名",
        abm_ex1: "近亲属关系",
        abm_ex15: "任职机构和职位",
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
        abe_ex4: "车（船)价值",
        abe_ex8: "车（船)型",
      },
      estate2Field: {
        abe_ex1: "产权人/共有人",
        abe_ex2: "建房(购买)时间",
        abe_ex5: "房屋地址",
        abe_ex6: "面积",
        abe_ex4: "购置价/建造价",
        abe_ex11: "房屋性质",
      },
      dibaoForm: {

      },
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
      },
      uploadId: '',
      imgIndex: {
        ab_ex166: 0,
        ab_ex167: 0,
        ab_ex98: 0,
        ab_ex97: 0,
        ab_ex74: 0,
        ab_ex73: 0,
        ab_ex16: 0,
        ab_ex10: 0,
        ab_ex177: 0,

      },
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
        ab_ex177: [{
          required: true,
          message: '纸质授权书不能为空',
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
        ac_ex10_2: ''
      },
      waringData: [
        {
          aw_dat1: "",
          aw_ex1: "",
        },
        {
          aw_dat1: "",
          aw_ex1: "",
        },
        {
          aw_dat1: "",
          aw_ex1: "",
        },
      ],
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
      dialogVisible: false,
      dialogVisible3: false,
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
      dibaoFormOld: [],
      familyData1Old: [],
      familyData2Old: [],
      familyData3Old: [],
      familyData4Old: [],
      estate1Old: [],
      estate2Old: [],
      waringDataOld: [],
      incomeOld: [],
      payOld: [],
      income1Old: [],
      income2Old: [],
      income3Old: [],
      income4Old: [],
      income5Old: [],
      income6Old: [],
      income7Old: [],

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
      let cun = newA[1].split("#")[0]
      let zhen = newA[2].split("#")[0]
      // let i =qu+"#"+cun+"#"+zhen
      this.dibaoForm.ab_ex162 = newA[0] + "," + newA[1] + "," + newA[2]
      this.dibaoForm.ab_ex161 = qu
      this.dibaoForm.ab_ex1 = zhen
      this.dibaoForm.ab_ex2 = cun
      // console.log(i)
    }
  },
  created () {
    this.loadData();
  },

  methods: {// changeAmt(index,row,id)
    keyVerification2 (index, row, id) {
      // 共同姓名
      if (id == "f1.abm_ex3") {
        this.familyData1[index].abm_ex3 = row.abm_ex3.replace(/\s+/g, "");
        this.isName(this.familyData1[index].abm_ex3, id)
      }
      // 共同工作单位
      if (id == "f1.abm_ex15") {
        this.familyData1[index].abm_ex15 = row.abm_ex15.replace(/\s+/g, "");
        this.isText(row.abm_ex15, id);
      }
      // 共同月收入
      if (id == "f1.abm_ex17") {
        this.familyData1[index].abm_ex17 = row.abm_ex17.replace(/\s+/g, "");
        this.isNum(row.abm_ex17, id);
      }
      // 非共同姓名
      if (id == "f2.abm_ex3") {
        this.familyData2[index].abm_ex3 = row.abm_ex3.replace(/\s+/g, "");
        this.isName(row.abm_ex3, id);
      }
      // 非共同财产情况--正则后改
      if (id == "f2.abm_ex21") {
        this.familyData2[index].abm_ex21 = row.abm_ex21.replace(/\s+/g, "");
        this.isText(row.abm_ex21, id);
      }
      // 非共同工作单位
      if (id == "f2.abm_ex15") {
        this.familyData2[index].abm_ex15 = row.abm_ex15.replace(/\s+/g, "");
        this.isText(row.abm_ex15, id);
      }
      // 非共同家庭人口
      if (id == "f2.abm_ex20") {
        this.familyData2[index].abm_ex20 = row.abm_ex20.replace(/\s+/g, "");
        this.isFamilyNum(row.abm_ex20, id);
      }
      // 非共同家庭人均月收入
      if (id == "f2.abm_ex17") {
        this.familyData2[index].abm_ex17 = row.abm_ex17.replace(/\s+/g, "");
        this.isNum(row.abm_ex17, id);
      }
      // 非共同月赡抚养费
      if (id == "f2.abm_ex18") {
        this.familyData2[index].abm_ex18 = row.abm_ex18.replace(/\s+/g, "");
        this.isNum(row.abm_ex18, id);
      }

      // 非共同成员信息姓名
      if (id == "f3.abm_ex3") {
        this.familyData3[index].abm_ex3 = row.abm_ex3.replace(/\s+/g, "");
        this.isName(row.abm_ex3, id);
      }

      // 车（船）主
      if (id == "e1.abe_ex1") {
        this.estate1[index].abe_ex1 = row.abe_ex1.replace(/\s+/g, "");
        this.isName(row.abe_ex1, id);
      }
      // 购买时间
      if (id == "e1.abe_ex2") {
        this.estate1[index].abe_ex2 = row.abe_ex2.replace(/\s+/g, "");
        this.isText(row.abe_ex2, id);
      }
      // 用途
      if (id == "e1.abe_ex3") {
        this.estate1[index].abe_ex3 = row.abe_ex3.replace(/\s+/g, "");
        this.isText(row.abe_ex3, id);
      }
      // // 车（船）型
      // if(id=="e1.abe_ex8"){
      // 	this.estate1[index].abe_ex8=row.abe_ex8.replace(/\s+/g,"");
      // 	this.isName(row.abe_ex8,id);
      // }
      // 车（船）价值
      if (id == "e1.abe_ex4") {
        this.estate1[index].abe_ex4 = row.abe_ex4.replace(/\s+/g, "");
        this.isNum(row.abe_ex4, id);
      }
      // 房屋产权人/共有人
      if (id == "e2.abe_ex1") {
        this.estate2[index].abe_ex1 = row.abe_ex1.replace(/\s+/g, "");
        this.isName(row.abe_ex1, id);
      }
      // 建房（购房）时间
      if (id == "e2.abe_ex2") {
        this.estate2[index].abe_ex2 = row.abe_ex2.replace(/\s+/g, "");
        this.isText(row.abe_ex2, id);
      }
      // 房屋地址
      if (id == "e2.abe_ex5") {
        this.estate2[index].abe_ex5 = row.abe_ex5.replace(/\s+/g, "");
        this.isText(row.abe_ex5, id);
      }
      // 面积
      if (id == "e2.abe_ex6") {
        this.estate2[index].abe_ex6 = row.abe_ex6.replace(/\s+/g, "");
        this.isNum(row.abe_ex6, id);
      }
      // 购置价/构造价
      if (id == "e2.abe_ex4") {
        this.estate2[index].abe_ex4 = row.abe_ex4.replace(/\s+/g, "");
        this.isNum(row.abe_ex4, id);
      }

      console.log(index, row, id);
    },





    // 正则校验输入数据
    keyVerification (key, id) {
      //js去掉所有空格 \s表示查找空格带上加好表示连续的空格
      key = key.replace(/\s+/g, "");

      //申请人姓名
      if (id == "ab_ex3") {
        this.dibaoForm.ab_ex3 = key.replace(/\s+/g, "");
        this.isName(key, id)
      }

      // 申请人身份证号
      if (id == "ab_ex7") {
        var msg = this.isCardID(key)
        if (msg) {
          console.log(msg);
          this.$message.warning("申请人" + msg);
          return false;
        } else {
          this.dibaoForm.ab_ex7 = key
        }
      }
      // 户籍地址，家庭住址--不能含有特殊字符或空格
      if (id == "ab_ex4") {
        this.dibaoForm.ab_ex4 = key.replace(/\s+/g, "");
        this.isText(key, id);
      }
      if (id == "ab_ex11") {
        this.dibaoForm.ab_ex11 = key.replace(/\s+/g, "");
        this.isText(key, id);
      }
      // 家庭人口
      if (id == "ab_ex5") {
        this.dibaoForm.ab_ex5 = key.replace(/\s+/g, "");
        this.isFamilyNum(key, id)
      }

      // 联系电话
      var reg5 = /^[1][3,4,5,7,8,9][0-9]{9}$/;
      if (id == "ab_ex28") {
        this.dibaoForm.ab_ex28 = key.replace(/\s+/g, "");
        if (!reg5.test(key)) {
          this.$message.warning("请检查是否输入了正确的手机号长度或格式");
          return false;
        }
      }
      console.log(this.familyData4.length, "近亲属");
      if (this.familyData4.length > 0) {
        for (let i in this.familyData4) {
          // 近亲属姓名
          if (id == "f4.abm_ex3") {
            console.log(key);
            if (this.familyData4[i].abm_ex3.length > 0) {
              this.familyData4[i].abm_ex3 = key.replace(/\s+/g, "");
              this.isName(key, id);
            }
          }
          // 近亲属关系
          if (id == "f4.abm_ex1") {
            if (this.familyData4[i].abm_ex1.length > 0) {
              this.familyData4[i].abm_ex1 = key.replace(/\s+/g, "");
              this.isName(key, id);
            }
          }
          // 近亲属职位
          if (id == "f4.abm_ex15") {
            if (this.familyData4[i].abm_ex15.length > 0) {
              this.familyData4[i].abm_ex15 = key.replace(/\s+/g, "");
              this.isName(key, id);
            }
          }
        }
      }

      // 银行名称
      if (id == "ab_ex42") {
        console.log(key);
        this.dibaoForm.ab_ex42 = key.replace(/\s+/g, "");
        this.isName(key, id)
      }
      // 开户人
      if (id == "ab_ex8") {
        console.log(key);
        this.dibaoForm.ab_ex8 = key.replace(/\s+/g, "");
        this.isName(key, id)
      }
      // 账号
      if (id == "ab_ex43") {
        console.log("一卡通");
        var reg6 = /[A-Za-z0-9]$/g
        this.dibaoForm.ab_ex43 = key.replace(/\s+/g, "");
        // console.log(!reg6.test(key));
        if (!reg6.test(key)) {
          this.$message.warning("一卡通银行卡账号中不能含有特殊字符或空格");
          return false;
        }
      }

      // 资产 
      // 银行总存款36
      if (id == "ab_ex36") {
        this.dibaoForm.ab_ex36 = key.replace(/\s+/g, "");
        this.isNum(key, id)
      }
      // 有价证券 60
      if (id == "ab_ex60") {
        this.dibaoForm.ab_ex60 = key.replace(/\s+/g, "");
        this.isNum(key, id)
      }
      // 基金179
      if (id == "ab_ex179") {
        this.dibaoForm.ab_ex179 = key.replace(/\s+/g, "");
        this.isNum(key, id)
      }
      // 商业保险 180
      if (id == "ab_ex180") {
        this.dibaoForm.ab_ex180 = key.replace(/\s+/g, "");
        this.isNum(key, id)
      }
      // 债券 61
      if (id == "ab_ex61") {
        this.dibaoForm.ab_ex61 = key.replace(/\s+/g, "");
        this.isNum(key, id)
      }
      // 其他金融产品37
      if (id == "ab_ex37") {
        this.dibaoForm.ab_ex37 = key.replace(/\s+/g, "");
        this.isNum(key, id)
      }


    },

    // 汉字验证
    isName (name, id) {
      var reg2 = /^[\u4E00-\u9FFF]{0,}$/;
      console.log(name);
      // console.log("验证信息",reg2.test(name)); 
      //js去掉所有空格 \s表示查找空格带上加好表示连续的空格

      console.log("去除空格了");
      if (!reg2.test(name) && id == "ab_ex3") {
        this.$message.warning("申请人姓名中不能含有数字、字母、特殊字符或空格");
        return false;
      }
      if (!reg2.test(name) && id == "f4.abm_ex3") {
        this.$message.warning("姓名中不能含有数字、字母、特殊字符或空格");
        return false;
      }
      if (!reg2.test(name) && id == "f4.abm_ex1") {
        this.$message.warning("近亲属关系的字符中不能含有数字、字母、特殊字符或空格");
        return false;
      }
      if (!reg2.test(name) && id == "f4.abm_ex15") {
        this.$message.warning("近亲属职位的名称中不能含有数字、字母、特殊字符或空格");
        return false;
      }
      if (!reg2.test(name) && id == "ab_ex42") {
        this.$message.warning("一卡通银行名称中不能含有数字、字母、特殊字符或空格");
        return false;
      }
      if (!reg2.test(name) && id == "ab_ex8") {
        this.$message.warning("开户人姓名中不能含有数字、字母、特殊字符或空格");
        return false;
      }
      if (!reg2.test(name) && id == "f1.abm_ex3") {
        this.$message.warning("共同生活家庭成员" + name + "姓名中不能含有数字、特殊字符或空格");
        return false;
      }
      if (!reg2.test(name) && id == "f2.abm_ex3") {
        this.$message.warning("非共同生活赡抚养人" + name + "姓名中不能含有数字、特殊字符或空格");
        return false;
      }
      if (!reg2.test(name) && id == "f3.abm_ex3") {
        this.$message.warning("非共同生活赡抚养人家庭成员" + name + "姓名中不能含有数字、特殊字符或空格");
        return false;
      }
      if (!reg2.test(name) && id == "e1.abe_ex1") {
        this.$message.warning("车（船）主" + name + "姓名中不能含有数字、特殊字符或空格");
        return false;
      }
      if (!reg2.test(name) && id == "e2.abe_ex1") {
        this.$message.warning("房屋产权人/共有人" + name + "姓名中不能含有数字、特殊字符或空格");
        return false;
      }
    },

    // 人口验证 0~99
    isFamilyNum (key, id) {
      var reg4 = /^[0-9]{1,2}$/;
      if (!reg4.test(key) && id == "ab_ex5") {
        this.$message.warning("家庭人口的区间为0~99，且只能填报数字");
        return false;
      }
      if (!reg4.test(key) && id == "f2.abm_ex20") {
        this.$message.warning("非共同生活赡抚养人，家庭人口的区间为0~99，且只能填报数字");
        return false;
      }
    },
    // 数字验证 // 带小数的数字验证（非0开头，最多保留两位小数）
    isNum (key, id) {
      var reg7 = /^([1-9][0-9]*)+(\.[0-9]{1,2})?$/;
      if (!reg7.test(key) && id == "f1.abm_ex17") {
        this.$message.warning("共同生活家庭成员，月收入只能填报数字（非0开头，最多保留两位小数）");
        return false;
        // isSave=false;
      }
      if (!reg7.test(key) && id == "f2.abm_ex17") {
        this.$message.warning("非共同生活赡抚养人，月人均收入只能填报数字（非0开头，最多保留两位小数）");
        return false;
      }
      if (!reg7.test(key) && id == "f2.abm_ex18") {
        this.$message.warning("非共同生活赡抚养人，月赡(扶、抚)养费只能填报数字（非0开头，最多保留两位小数）");
        return false;
      }
      if (!reg7.test(key) && id == "ico1.abi_ex2") {
        this.$message.warning("工资性收入只能填报数字（非0开头，最多保留两位小数）");
        return false;
      }
      if (!reg7.test(key) && id == "ico2.abi_ex2") {
        this.$message.warning("经营性收入只能填报数字（非0开头，最多保留两位小数）");
        return false;
      }
      if (!reg7.test(key) && id == "ico3.abi_ex2") {
        this.$message.warning("财产性收入只能填报数字（非0开头，最多保留两位小数）");
        return false;
      }
      if (!reg7.test(key) && id == "ico4.abi_ex2") {
        this.$message.warning("转移性收入只能填报数字（非0开头，最多保留两位小数）");
        return false;
      }
      if (!reg7.test(key) && id == "ico5.abi_ex2") {
        this.$message.warning("其他收入只能填报数字（非0开头，最多保留两位小数）");
        return false;
      }
      if (!reg7.test(key) && id == "ico6.abi_ex2") {
        this.$message.warning("必要就业成本只能填报数字（非0开头，最多保留两位小数）");
        return false;
      }
      if (!reg7.test(key) && id == "ico7.abi_ex2") {
        this.$message.warning("总收入只能填报数字（非0开头，最多保留两位小数）");
        return false;
      }

      // 支出
      if (!reg7.test(key) && id == "pay.abp_ex4") {
        this.$message.warning("医疗支出只能填报数字（非0开头，最多保留两位小数）");
        return false;
      }
      if (!reg7.test(key) && id == "pay.abp_ex5") {
        this.$message.warning("教育支出只能填报数字（非0开头，最多保留两位小数）");
        return false;
      }
      if (!reg7.test(key) && id == "pay.abp_ex6") {
        this.$message.warning("残疾康复费用支出只能填报数字（非0开头，最多保留两位小数）");
        return false;
      }
      if (!reg7.test(key) && id == "pay.abp_ex11") {
        this.$message.warning("因灾、因意外事故费用支出只能填报数字（非0开头，最多保留两位小数）");
        return false;
      }
      if (!reg7.test(key) && id == "pay.abp_ex7") {
        this.$message.warning("其他支出只能填报数字（非0开头，最多保留两位小数）");
        return false;
      }
      if (!reg7.test(key) && id == "pay.abp_ex8") {
        this.$message.warning("家庭总支出只能填报数字（非0开头，最多保留两位小数）");
        return false;
      }
      // 金融资产
      if (!reg7.test(key) && id == "ab_ex36") {
        this.$message.warning("银行总存款只能填报数字（非0开头，最多保留两位小数）");
        return false;
      }
      if (!reg7.test(key) && id == "ab_ex60") {
        this.$message.warning("有价证券只能填报数字（非0开头，最多保留两位小数）");
        return false;
      }
      if (!reg7.test(key) && id == "ab_ex170") {
        this.$message.warning("基金只能填报数字（非0开头，最多保留两位小数）");
        return false;
      }
      if (!reg7.test(key) && id == "ab_ex180") {
        this.$message.warning("商业保险只能填报数字（非0开头，最多保留两位小数）");
        return false;
      }
      if (!reg7.test(key) && id == "ab_ex61") {
        this.$message.warning("债券只能填报数字（非0开头，最多保留两位小数）");
        return false;
      }
      if (!reg7.test(key) && id == "ab_ex37") {
        this.$message.warning("其他金融产品只能填报数字（非0开头，最多保留两位小数）");
        return false;
      }
      // 车船，房屋
      if (!reg7.test(key) && id == "e1.abe_ex4") {
        this.$message.warning("车（船）价值只能填报数字（非0开头，最多保留两位小数）");
        return false;
      }
      if (!reg7.test(key) && id == "e2.abe_ex6") {
        this.$message.warning("房屋面积只能填报数字（非0开头，最多保留两位小数）");
        return false;
      }
      if (!reg7.test(key) && id == "e4.abe_ex4") {
        this.$message.warning("房屋价值只能填报数字（非0开头，最多保留两位小数）");
        return false;
      }
    },


    // 内容验证
    isText (key, id) {
      var reg3 = /^[\u4E00-\u9FA5A-Za-z0-9-]+$/;
      if (!reg3.test(key) && id == "ab_ex4") {
        this.$message.warning("户籍地址中不能含有特殊字符或空格");
        return false;
      }
      if (!reg3.test(key) && id == "ab_ex11") {
        this.$message.warning("家庭住址中不能含有特殊字符或空格");
        return false;
      }
      if (!reg3.test(key) && id == "f1.abm_ex15") {
        this.$message.warning("共同生活成员,工作单位名称中不能含有特殊字符或空格");
        return false;
      }
      if (!reg3.test(key) && id == "f2.abm_ex21") {
        this.$message.warning("家庭财产状况简述中不能含有特殊字符或空格");
        return false;
      }
      if (!reg3.test(key) && id == "f2.abm_ex15") {
        this.$message.warning("非共同生活成员,工作单位名称中不能含有特殊字符或空格");
        return false;
      }
      if (!reg3.test(key) && id == "e1.abe_ex2") {
        this.$message.warning("车（船）购买时间不能含有特殊字符或空格");
        return false;
      }
      if (!reg3.test(key) && id == "e1.abe_ex3") {
        this.$message.warning("车（船）用途描述中不能含有特殊字符或空格");
        return false;
      }

      if (!reg3.test(key) && id == "e2.abe_ex2") {
        this.$message.warning("购房/建房时间不能含有特殊字符或空格");
        return false;
      }
      if (!reg3.test(key) && id == "e2.abe_ex5") {
        this.$message.warning("房屋地址中不能含有特殊字符或空格");
        return false;
      }
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
      // 顺序跟上面显示顺序要相反
      let clientHeight = document.querySelector('.info2').clientHeight
      let recordtClientHeight = document.querySelector('#recordt').scrollHeight
      if (!oDiv1 || !oDiv2 || !oDiv3 || !oDiv4 || !oDiv5 || !oDiv6 || !oDiv7 || !oDiv8 || !oDiv9 || !oDiv10 || !oDiv11 || !oDiv12 || !oDiv13) {
        return ''
      }
      if (recordtClientHeight + oDiv7.clientHeight < clientHeight && scrollTop > (oDiv7.offsetTop - oDiv1.offsetTop - clientHeight + recordtClientHeight + oDiv7.clientHeight)) {
        // console.log('触发了7-1')
        this.isShow(7)
      } else if (scrollTop > (oDiv7.offsetTop - oDiv1.offsetTop - 1)) {
        // console.log('触发了7-2')
        this.isShow(7)
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
    loadData () {
      this.sId = this.$route.query.sId;
      this.cId = this.$route.query.cId;
      this.type = this.$route.query.type;
      this.isFinish = false;
      this.getBasicsChange({
        sId: this.$route.query.sId,
        // type: "低保",
        // company: "泰州市姜堰区社会救助综合平台"
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
          this.dibaoFormOld = JSON.parse(JSON.stringify(res[0].data))

          this.dibaoForm = res[0].data[0]
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
          this.dibaoFormOld = JSON.parse(JSON.stringify(res.response.data[0].data))

          this.dibaoForm = res.response.data[0].data[0]
          this.common = res.response.data[0].common;
          this.uploadImg.ab_ex73_img = res.response.data[0].data[0].ab_ex73.split(",");
          this.uploadImg.ab_ex10_img = res.response.data[0].data[0].ab_ex10.split(",");
          this.uploadImg.ab_ex16_img = res.response.data[0].data[0].ab_ex16.split(",");
          this.uploadImg.ab_ex97_img = res.response.data[0].data[0].ab_ex97.split(",");
          this.uploadImg.ab_ex98_img = res.response.data[0].data[0].ab_ex98.split(",");
          this.uploadImg.ab_ex74_img = res.response.data[0].data[0].ab_ex74.split(",");
          this.uploadImg.ab_ex166_img = res.response.data[0].data[0].ab_ex166.split(",");
          this.uploadImg.ab_ex167_img = res.response.data[0].data[0].ab_ex167.split(",");
          this.uploadImg.ab_ex177_img = res.response.data[0].data[0].ab_ex177.split(",");
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
          } else {
            this.xzqhArray = []
          }
          this.isFinish = true;
          console.log(this.xzqhArray)

        }

        //自定义预警预警信息
        this.loadWaring({
          sId: this.$route.query.sId,
        }).then(res => {
          console.log(res)
          this.waringData = res[0].data
        }).catch(res => {
          if (typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200) {
            console.log('请求失败了-----------------------2')
            this.$message.error('数据获取失败或请求超时2222')
            this.$emit("closes", false)
            this.$router.go(-1)
            return false
          }
          // for(var i in  res.response.data[0].data){
          // 	console.log(res.response.data[0].data[i].aw_dat1,"预警时间-------------"+i);
          // 	if(res.response.data[0].data[i].aw_dat1=="1900-01-01 00:00:00.0"){
          // 		res.response.data[0].data[i].aw_dat1=""
          // 	}
          // }
          this.waringData = res.response.data[0].data;
          this.waringDataOld = JSON.parse(JSON.stringify(res.response.data[0].data))

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
          console.log(res.response.data[0].data)
          for (let i = 0; i < res.response.data[0].data.length; i++) {
            if (res.response.data[0].data[i].abm_ex6 == 'Y') {
              this.familyData1.push(res.response.data[0].data[i]) //共同生活
              console.log(res.response.data[0].data[i]);
              this.familyData1Old.push(JSON.parse(JSON.stringify(res.response.data[0].data[i]))) //共同生活
            } else if (res.response.data[0].data[i].abm_ex6 == 'N') {
              this.familyData2.push(res.response.data[0].data[i]) //非共同生活
              this.familyData2Old.push(JSON.parse(JSON.stringify(res.response.data[0].data[i])))
            } else if (res.response.data[0].data[i].abm_ex6 == 'B') {
              this.familyData3.push(res.response.data[0].data[i]) //非共同生活赡抚养人信息
              this.familyData3Old.push(JSON.parse(JSON.stringify(res.response.data[0].data[i])))
            } else if (res.response.data[0].data[i].abm_ex6 == 'C') {
              this.familyData4.push(res.response.data[0].data[i]) //村干部、近亲属信息
              this.familyData4Old.push(JSON.parse(JSON.stringify(res.response.data[0].data[i])))
            }
          }

          var jk = 1;
          for (let i in this.familyData1) {
            this.changeCard(i)
            if (this.familyData1[i].abm_ex11 == '重病') {
              jk *= 2;
              this.jkShow1 = false;
              this.jkShow2 = true;
            } else if (this.familyData1[i].abm_ex11 == '残疾') {
              jk *= 3
              this.jkShow1 = true;
              this.jkShow2 = false;
            }
            if (jk % 6 == 0) {
              this.jkShow1 = false;
              this.jkShow2 = false;
            }
          }
          // 人均月收入计算
          if (this.familyData1.length < 2) {
            this.income7[2].abi_ex2 = Number(this.income7[0].abi_ex2);
            this.pay.abp_ex10 = Number(this.pay.abp_ex9)
          } else {
            this.income7[2].abi_ex2 = Number(this.income7[0].abi_ex2 / this.familyData1.length).toFixed(2);
            this.pay.abp_ex10 = Number(this.pay.abp_ex9 / this.familyData1.length).toFixed(2);
          }
          // 收入
          this.getBasicIncome({
            sId: this.$route.query.sId,
          }).then(res => {
            console.log(res)
            // this.income = res[0].data
            this.incomeOld = JSON.parse(JSON.stringify(res[0].data))
          }).catch(res => {
            if (typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200) {
              console.log('请求失败了-----------------------3')
              this.$message.error('数据获取失败或请求超时3333')
              this.$emit("closes", false)
              this.$router.go(-1)
              return false;
            }
            //工资性收入 ： A；经营：B；财产：C；转移：D；其他：E；必要就业：F；总：G
            var income1 = []
            var income2 = []
            var income3 = []
            var income4 = []
            var income5 = []
            var income6 = []
            var income7 = []

            for (let i in res.response.data[0].data) {
              for (let j in res.response.data[0].data[i]) {
                res.response.data[0].data[i][j] = unescape(res.response.data[0].data[i][j])
                // console.log(res.response.data[0].data[i]);
              }
              console.log(this.incomeOld);
              console.log(Number(res.response.data[0].data[i].abi_ex2).toFixed(2));
              res.response.data[0].data[i].abi_ex2 = Number(res.response.data[0].data[i].abi_ex2).toFixed(2)

              if (res.response.data[0].data[i].abi_ex4 == 'A' && (res.response.data[0].data[i].abi_ex1 != "" || res.response.data[0].data[i].abi_ex2 != "")) {
                income1.push(res.response.data[0].data[i])
              }
              else if (res.response.data[0].data[i].abi_ex4 == 'B' && (res.response.data[0].data[i].abi_ex1 != "" || res.response.data[0].data[i].abi_ex2 != "")) {
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
            var abi_ex2_1 = 0;
            var abi_ex2_2 = 0;
            var abi_ex2_3 = 0;
            var abi_ex2_4 = 0;
            var abi_ex2_5 = 0;
            var abi_ex2_6 = 0;
            var len = 0;

            if (income1.length > 0) {
              this.income1 = income1;
              this.income1Field = income1
              for (let i in this.income1) {
                if (this.income1[i].abi_ex2 != "" && !isNaN(Number(this.income1[i].abi_ex2))) {
                  len++;
                  abi_ex2_1 += Number(this.income1[i].abi_ex2)
                } else if (len == 0) {
                  abi_ex2_1 = 0.00;
                }
              }
            }
            if (income2.length > 0) {
              this.income2 = income2;
              for (let i in this.income2) {
                if (this.income2[i].abi_ex2 != "" && !isNaN(Number(this.income2[i].abi_ex2))) {
                  len++;
                  abi_ex2_2 += Number(this.income2[i].abi_ex2)
                } else if (len == 0) {
                  abi_ex2_2 = 0.00;
                }
              }
            }
            if (income3.length > 0) {
              this.income3 = income3;
              for (let i in this.income3) {
                if (this.income3[i].abi_ex2 != "" && !isNaN(Number(this.income3[i].abi_ex2))) {
                  len++;
                  abi_ex2_3 += Number(this.income3[i].abi_ex2)
                } else if (len == 0) {
                  abi_ex2_3 = 0.00;
                }
              }
            }
            if (income4.length > 0) {
              this.income4 = income4;
              for (let i in this.income4) {
                if (this.income4[i].abi_ex2 != "" && !isNaN(Number(this.income4[i].abi_ex2))) {
                  len++;
                  abi_ex2_4 += Number(this.income4[i].abi_ex2)
                } else if (len == 0) {
                  abi_ex2_4 = 0.00;
                }
                // console.log( this.income4);
              }
            }
            if (income5.length > 0) {
              this.income5 = income5;
              for (let i in this.income5) {
                if (this.income5[i].abi_ex2 != "" && !isNaN(Number(this.income5[i].abi_ex2))) {
                  len++;
                  abi_ex2_5 += Number(this.income5[i].abi_ex2)
                } else if (len == 0) {
                  abi_ex2_5 = 0.00;
                }
                // console.log( this.income5);
              }
            }
            if (income6.length > 0) {
              this.income6 = income6;
              if (this.income6[0].abi_ex2 != "" && !isNaN(Number(this.income6[0].abi_ex2))) {
                len++;
                abi_ex2_6 += Number(this.income6[0].abi_ex2)
              } else if (len == 0) {
                abi_ex2_6 = 0.00;
              }
            }
            if (income7.length > 0) {
              this.income7 = income7;
              this.income7[1] = {};
              this.income7[2] = {};
              this.income7[0].abi_ex1 = "总收入";
              this.income7[1].abi_ex1 = "家庭月平均收入";
              this.income7[2].abi_ex1 = "家庭月人均收入";
              this.income7[1].abi_ex2 = (this.income7[0].abi_ex2 / 12).toFixed(2);
              if (this.familyData1.length < 1) {
                this.income7[2].abi_ex2 = 0.00;
              } else {
                this.income7[2].abi_ex2 = (income7[0].abi_ex2 / 12 / this.familyData1.length).toFixed(2);
              }

            } else if (res.response.data[0].data.length > 0) {
              var amt = abi_ex2_1 + abi_ex2_2 + abi_ex2_3 + abi_ex2_4 + abi_ex2_5 - abi_ex2_6;
              this.income7[0].abi_ex1 = "总收入";
              this.income7[1] = {};
              this.income7[1].abi_ex1 = "家庭月平均收入";
              this.income7[2] = {};
              this.income7[2].abi_ex1 = "家庭月人均收入";
              console.log("总收入有值", this.income7);
              this.income7[0].abi_ex2 = Number(amt).toFixed(2)
              this.income7[1].abi_ex2 = Number(amt / 12).toFixed(2)
              console.log("总收入有值，计算月均" + amt);

              if (this.familyData1.length > 0) {
                console.log("收入计算", this.familyData1.length);
                var income7_2 = Number(amt / 12 / this.familyData1.length).toFixed(2);
                this.income7[2].abi_ex2 = income7_2;
              } else {
                console.log("月人均收入为零，因为家庭人口为", this.familyData1.length);
                this.income7[2].abi_ex2 = "0.00";
              }

            } else {
              this.income7[0].abi_ex1 = "总收入";
              this.income7[1].abi_ex1 = "家庭月平均收入";
              this.income7[2].abi_ex1 = "家庭月人均收入";
              this.income7[0].abi_ex2 = "0.00";
              this.income7[1].abi_ex2 = "0.00";
              this.income7[2].abi_ex2 = "0.00";
            }
            console.log(res.response.data[0].data, "收入")
            // this.income=res.response.data[0].data;
            this.incomeOld.push(JSON.parse(JSON.stringify(res.response.data[0].data)))
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
            if (res.response.data[0].data3.length == 0) {
              this.pay.abp_ex4 = ''
              this.pay.abp_ex5 = ''
              this.pay.abp_ex6 = ''
              this.pay.abp_ex7 = ''
              this.pay.abp_ex8 = ''
              this.pay.abp_ex9 = ''
              this.pay.abp_ex10 = ''
              this.pay.abp_ex11 = ''
            }
            else {
              this.pay = res.response.data[0].data3[0];

            }

            if (this.familyData1.length < 2) {
              console.log("length==0");
              this.pay.abp_ex10 = Number(this.pay.abp_ex9 / 1).toFixed(2);
              // this.dibaoForm.ab_ex94_=(this.pay.ab_ex94 / this.familyData1.length).toFixed(2)
            } else {
              console.log("lengt>0")
              this.pay.abp_ex10 = Number(this.pay.abp_ex9 / this.familyData1.length).toFixed(2);
            }
            console.log(res.response.data[0], "---------pay")
            this.payOld = JSON.parse(JSON.stringify(res.response.data[0].data3[0]));
          })
        })

      })


      // 家庭财产
      this.loadEstate({
        sId: this.$route.query.sId,
      }).then(res => {
        console.log(res)
        this.estate1 = res[0].data
        this.estate2 = res[0].data2
        this.estate1Old = JSON.parse(JSON.stringify(res[0].data))
        this.estate2Old = JSON.parse(JSON.stringify(res[0].data2))
      }).catch(res => {
        console.log(res.response.data[0].data)
        for (let i in res.response.data[0].data) {
          if (res.response.data[0].data[i].abe_ex7 == '车船') {
            this.estate1.push(res.response.data[0].data[i])
            this.estate1Old.push(JSON.parse(JSON.stringify(res.response.data[0].data[i])))
          } else {
            this.estate2.push(res.response.data[0].data[i])
            this.estate2Old.push(JSON.parse(JSON.stringify(res.response.data[0].data[i])))
          }
        }
      })
    },

    //清空近亲属
    changeFm4 (ab_ex92) {
      if (ab_ex92 == "否") {
        this.familyData4 = [];
        console.log(this.familyData4);
      }
    },

    // 给tabledata添加序号便于操作
    rowClassName ({
      row,
      rowIndex
    }) {
      row.xh = rowIndex + 1;
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
    // 根据str找table添加行
    handleAddDetails (str) {
      let obj = {};
      if (str == 'familyData1') {
        if (this.familyData1 == undefined) {
          this.familyData1 = new Array();
        }
        obj = {
          abm_ex1: '',
          abm_ex3: '',
          abm_ex2: '',
          abm_ex5: '',
          abm_ex6: 'Y',
          abm_ex16: '',
          abm_ex7: '',
          abm_ex28: '',
          abm_ex51: '',
          abm_ex11: '',
          abm_ex14: '',
          abm_ex15: '',
          abm_ex17: '',
          age: '',
          work: '',
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
          abm_ex18: ''
        };
        this.familyData2.push(obj);
      }
      // 非共同生活家庭成员
      if (str == 'familyData3') {
        console.log("非共同赡抚养人数", this.familyData2.length);
        let flag = false
        let message = false
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
                  abm_ex2: ''

                };
                this.familyData3.push(obj);
                flag = true
              }

            } else {
              if (flag == false && message == false) {
                message = true
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
      this.changeAmt()
    },
    // 根据str找table删除选中行
    handleDelDetails (str) {
      let obj;
      let old;
      if (str == 'familyData1') {
        obj = this.checkedFamilyData1;
        old = this.familyData1;
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
      if (str == 'familyData2') {
        obj = this.checkedFamilyData2;
        old = this.familyData2;
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
      // 重新计算收入支出
      this.changeAmt()
    },

    getImgIndex (item) {
      let data = JSON.parse(item);
      this.imgIndex[data.id] = data.index;
    },

    handleRemove (file, str) {
      // console.log("str======"+str);
      // console.log(this.imgIndex)

      // console.log("1="+JSON.stringify(this.uploadImg[str+"_img"]))
      this.$delete(this.uploadImg[str + "_img"], this.imgIndex[str]);
      // console.log("2="+JSON.stringify(this.uploadImg[str+"_img"]))
      this.dibaoForm[str] = this.uploadImg[str + "_img"].join(",");
      // console.log(this.dibaoForm[str])
    },
    handlePictureCardPreview (file) {
      this.dialogImageArray = file
      this.dialogImageUrl = file[0];
      this.dialogVisible = true;
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
      }
    },
    // 返回按钮
    closeView () {
      this.$emit("closes", false)
      this.$router.go(-1)
    },
    // 上传图片
    uploads (id) {
      this.dialogVisible3 = true;
      this.uploadId = id;
      console.log(this.uploadId);
      try {
        this.$refs.myUpload.clears();
      } catch (e) { }
    },
    uploadEvent (data) {
      console.log(data);
      let val = this.dibaoForm[this.uploadId];
      val = val == "" ? data : val + "," + data;
      this.dibaoForm[this.uploadId] = val;
    },
    uploadEvent2 () {

      this.uploadImg[this.uploadId + "_img"] = this.dibaoForm[this.uploadId].split(",");

    },
    // 支出、资产--正则验证
    changeAmt3 (key, id) {
      // 医疗
      if (id == "pay.abp_ex4") {
        this.pay.abp_ex4 = key.replace(/\s+/g, "");
        this.isNum(key, id)
      }
      // 教育 5
      if (id == "pay.abp_ex5") {
        this.pay.abp_ex5 = key.replace(/\s+/g, "");
        this.isNum(key, id)
      }
      // 残疾康复费用 6
      if (id == "pay.abp_ex6") {
        this.pay.abp_ex6 = key.replace(/\s+/g, "");
        this.isNum(key, id)
      }
      // 因灾、因意外事故费用 11
      if (id == "pay.abp_ex11") {
        this.pay.abp_ex11 = key.replace(/\s+/g, "");
        this.isNum(key, id)
      }
      // 其他支出 7
      if (id == "pay.abp_ex7") {
        this.pay.abp_ex7 = key.replace(/\s+/g, "");
        this.isNum(key, id)
      }
      // abp_ex8家庭总支出
      if (id == "pay.abp_ex8") {
        this.pay.abp_ex8 = key.replace(/\s+/g, "");
        this.isNum(key, id)
      }
      // 支出计算
      this.changeAmt();

      // 资产

      if (id == "pay.abp_ex8") {
        this.pay.abp_ex8 = key.replace(/\s+/g, "");
        this.isNum(key, id)
      }
    },
    changeAmt2 () {

      console.log(this.waringData[0].aw_dat1, "111111111")
      for (var i = 0; i < 3; i++) {
        var index = Number(i) + 1;

        // console.log(this.waringData[i].aw_dat1,'预警时间')
        // 自动添加预警时间
        if (this.waringData[i].aw_ex1 != "" && (this.waringData[i].aw_dat1 == "" || this.waringData[i].aw_dat1 == null)) {
          this.waringData[i].aw_dat1 = this.getTimeFn();
        }
        // 预警提示
        if (this.waringData[i].aw_ex1 == "" && (this.waringData[i].aw_dat1 == null || this.waringData[i].aw_dat1 == "")) {
          continue;
        } else if (this.waringData[i].aw_ex1 != "" && (this.waringData[i].aw_dat1 == null || this.waringData[i].aw_dat1 == "")) {
          this.$message.warning("请选择预警" + (index) + "的时间");
          return false;
        } else if (this.waringData[i].aw_ex1 == "" && (this.waringData[i].aw_dat1 != null || this.waringData[i].aw_dat1 != "")) {
          this.$message.warning("请将预警" + (index) + "的内容补充完整");
          return false;
        }
      }
    },


    //设置默认时间--预警时间默认为选择当天的第十天
    getTimeFn () {
      let dates = new Date()
      let y = dates.getFullYear()
      let m = dates.getMonth() + 1
      // let d = dates.getDate()+10
      let d = dates.getDate()
      //  console.log(time)
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
      let time = y + '-' + m + '-' + d
      // console.log(time)
      return time
    },

    changeMember (index) {
      let item = this.familyData1[index];
      this.disabledList2.splice("a" + index);
      this.disabledList.splice("a" + index);
      if (item.abm_ex11 == "重病") {
        this.disabledList2.push("a" + index);
        item.abm_ex39 = "";
        item.abm_ex40 = "";
      } else if (item.abm_ex11 == '残疾') {
        this.disabledList.push("a" + index);
        item.abm_ex52 = "";
      } else {
        this.disabledList2.push("a" + index);
        this.disabledList.push("a" + index);
        item.abm_ex39 = "";
        item.abm_ex40 = "";
        item.abm_ex52 = "";

      }

      this.changeAmt();
    },
    changeAmt (index, row, id) {
      // 工资收入
      if (id == "ico1.abi_ex2") {
        this.income1[index].abi_ex2 = row.abi_ex2.replace(/\s+/g, "");
        this.isNum(row.abi_ex2, id);
      }
      // 经营收入
      if (id == "ico2.abi_ex2") {
        this.income2[index].abi_ex2 = row.abi_ex2.replace(/\s+/g, "");
        this.isNum(row.abi_ex2, id);
      }
      // 财产收入
      if (id == "ico3.abi_ex2") {
        this.income3[index].abi_ex2 = row.abi_ex2.replace(/\s+/g, "");
        this.isNum(row.abi_ex2, id);
      }
      // 转移收入
      if (id == "ico4.abi_ex2") {
        this.income4[index].abi_ex2 = row.abi_ex2.replace(/\s+/g, "");
        this.isNum(row.abi_ex2, id);
      }
      // 其他收入
      if (id == "ico5.abi_ex2") {
        this.income5[index].abi_ex2 = row.abi_ex2.replace(/\s+/g, "");
        this.isNum(row.abi_ex2, id);
      }
      // 必要就业成本
      if (id == "ico6.abi_ex2") {
        this.income6[index].abi_ex2 = row.abi_ex2.replace(/\s+/g, "");
        this.isNum(row.abi_ex2, id);
      }
      // 总收入
      if (id == "ico7.abi_ex2") {
        this.income7[index].abi_ex2 = row.abi_ex2.replace(/\s+/g, "");
        this.isNum(row.abi_ex2, id);
      }


      // 基本信息-家庭人口-输入判断
      if (Number.isNaN(ab_ex5) || ab_ex5 == 0) {
        this.$message.warning("请输入家庭口数，或修改为阿拉伯数字");
        return false;
      }

      this.dibaoForm.ab_ex46 = this.ab_ex46.toString();//求助原因字段

      // var jk=1;
      // for (let f = 0; f < this.familyData1.length; f++) {//健康状况
      // 	if(this.familyData1[f].abm_ex11=='残疾'){
      // 		jk*=2;
      // 	}else if(this.familyData1[f].abm_ex11=='重病'){
      // 		jk*=3;
      // 	}
      // 	if(jk==1){  //健康
      // 		this.jkShow1=true;
      // 		this.jkShow2=true;
      // 		console.log(jk,'健康状况','健康');
      // 	}else if(jk%6==0){ //有残疾有重病
      // 		this.jkShow1=false;
      // 		this.jkShow2=false;
      // 		console.log(jk,'健康状况','两个都有');
      // 	}
      // 	else if(jk%2==0){//残疾
      // 		this.jkShow1=true;
      // 		this.jkShow2=false;
      // 		console.log(jk,'健康状况','残疾');
      // 	}else if(jk%3==0){//重病
      // 		this.jkShow1=false;
      // 		this.jkShow2=true;
      // 		console.log(jk,'健康状况','重病');
      // 	}
      // }

      // 家庭收入
      var ab_ex5 = Number(this.dibaoForm.ab_ex5);
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
      console.log(abi_ex2_1);

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
      if (this.familyData1.length > 0) {
        this.income7[2].abi_ex2 = (amt / 12 / this.familyData1.length).toFixed(2);
      } else {
        this.income7[2].abi_ex2 = (amt / 12 / 1).toFixed(2);
      }


      console.log(this.familyData1.length, "this.familyData1.length")
      // this.saveincome();
      //12个月支出计算
      var abp_ex4 = Number(this.pay.abp_ex4);
      var abp_ex5 = Number(this.pay.abp_ex5);
      var abp_ex6 = Number(this.pay.abp_ex6);
      var abp_ex7 = Number(this.pay.abp_ex7);
      console.log(abp_ex4, abp_ex5, abp_ex6, abp_ex7);

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
      var zzc = abp_ex4 != "" || abp_ex5 != "" || abp_ex6 != "" || abp_ex7 != "" ? abp_ex4 + abp_ex5 + abp_ex6 + abp_ex7 : this.pay.abp_ex8;
      console.log(abp_ex4, abp_ex5, abp_ex6, abp_ex7, "abp_ex4,abp_ex5,abp_ex6,abp_ex7")
      // zzc = abp_ex4 + abp_ex5 + abp_ex6 + abp_ex7;
      this.pay.abp_ex8 = Number(zzc).toFixed(2);
      this.pay.abp_ex9 = Number(amt - zzc).toFixed(2);
      // 收入支出计算
      if (this.familyData1.length == 0) {
        console.log("length==0")
        this.pay.abp_ex10 = Number(this.pay.abp_ex9 / 1).toFixed(2);
        // this.ab_ex94_ = Number(this.dibaoForm.ab_ex94/1).toFixed(2);
      } else {
        console.log("lengt>0")
        this.pay.abp_ex10 = Number(this.pay.abp_ex9 / this.familyData1.length).toFixed(2);
        // this.ab_ex94_ = Number(this.dibaoForm.ab_ex94/ this.familyData1.length).toFixed(2);
      }
    },


    save () {

      // 基础信息填写验证
      this.$refs['dibaoForm'].validate((valid) => {
        if (valid) {

        }
        else {
          return false;
        }
      });

      let msgs = this.validate();
      if (msgs) {
        this.$message.warning(msgs);
        return false
      }

      //基本信息-家庭人口-输入类型判断
      if (Number.isNaN(Number(this.dibaoForm.ab_ex5)) || this.dibaoForm.ab_ex5 == 0) {
        console.log(Number.isNaN(this.dibaoForm.ab_ex5), "条件1")
        console.log(this.dibaoForm.ab_ex5, "条件2")
        this.$message.warning("家庭人口数应大于0");
        return false;
      }

      // 村干部近亲属没填全保存不了
      for (let i in this.familyData4) {
        this.familyData4[i].abm_ex6 = "C"
        let abm_ex3 = this.familyData4[i].abm_ex3;
        let abm_ex1 = this.familyData4[i].abm_ex1;
        let abm_ex15 = this.familyData4[i].abm_ex15;
        if (!abm_ex3 && !abm_ex1 && !abm_ex15) {
          console.log('都没填跳过');
        } else if (abm_ex3 && abm_ex1 && abm_ex15) {
          console.log('都填了跳过');
        } else {
          this.$message.warning("请将第" + (Number(i) + 1) + "行的村干部或近亲属信息补充完整");
          return false;
        }
      }

      // 对预警信息进行判断
      for (var i = 0; i < 3; i++) {
        if (this.waringData[i].aw_ex1 == "" && (this.waringData[i].aw_dat1 == null || this.waringData[i].aw_dat1 == "")) {
          continue;
        } else if (this.waringData[i].aw_ex1 != "" && (this.waringData[i].aw_dat1 == null || this.waringData[i].aw_dat1 == "")) {
          this.$message.warning("请选择预警" + (i + 1) + "的时间");
          return false;
        } else if (this.waringData[i].aw_ex1 == "" && (this.waringData[i].aw_dat1 != null || this.waringData[i].aw_dat1 != "")) {
          this.$message.warning("请将预警" + (i + 1) + "的内容补充完整");
          return false;
        }
      }

      // 变更理由
      if (this.changeM.ac_ex10 == "") {
        this.$message.warning("请选择变更理由");
        return false
      }
      if (this.familyData1.length == 0) {
        this.$message.warning("请输入共同生活家庭成员");
        return false
      }

      // 没填姓名保存不了
      let isSave = true;

      // 共同家庭成员没填全保存不了
      if (this.familyData1.length != this.dibaoForm.ab_ex5) {

        this.$message.warning("家庭人口数与实际填报共同生活成员数不符，请重新填报");
        isSave = false;
        return false;
      } else if (this.familyData1.length > 0) {
        // 共同家庭成员没填全保存不了
        for (let i in this.familyData1) {
          this.familyData1[i].abm_ex6 = "Y"
          let abm_ex1 = this.familyData1[i].abm_ex1;
          let abm_ex2 = this.familyData1[i].abm_ex2;
          let abm_ex3 = this.familyData1[i].abm_ex3;
          let abm_ex16 = this.familyData1[i].abm_ex16;
          let abm_ex7 = this.familyData1[i].abm_ex7;
          let abm_ex28 = this.familyData1[i].abm_ex28;
          let abm_ex11 = this.familyData1[i].abm_ex11;
          let abm_ex52 = this.familyData1[i].abm_ex52;
          let abm_ex39 = this.familyData1[i].abm_ex39;
          let abm_ex40 = this.familyData1[i].abm_ex40;
          let abm_ex14 = this.familyData1[i].abm_ex14;
          let abm_ex49 = this.familyData1[i].abm_ex49;
          let index = Number(i) + 1;

          if (!abm_ex3 && !abm_ex1 && !abm_ex16 && !abm_ex7 && !abm_ex28 && !abm_ex2 && !abm_ex11 && !abm_ex14 || this.familyData1.length != this.dibaoForm.ab_ex5) {
            console.log('都没填跳过');
            this.$message.warning("请完善第" + (index) + "行成员信息");
            isSave = false;
            return false;
          } else {
            console.log('是否为劳动年龄' + this.familyData1[i].work)
            if (!abm_ex3) {
              this.$message.warning("请填写第" + (index) + "行共同家庭成员姓名");
              isSave = false;
              return false;
            }
            else if (!abm_ex1) {
              this.$message.warning("请选择第" + (index) + "行共同家庭成员与户主的关系");
              isSave = false;
              return false;
            }
            else if (!abm_ex2 || abm_ex2) {
              let msg = this.isCardID(abm_ex2);
              console.log(abm_ex2)
              if (msg) {
                this.$message.warning("第" + (index) + "行共同家庭成员" + msg);
                isSave = false;
                return false;
              } else {
                this.familyData1[i].abm_ex4 = this.getBirthdayFromIdCard(abm_ex2);//abm_ex4已被取消
                this.familyData1[i].abm_ex5 = this.getSex(abm_ex2);
                this.familyData1[i].age = this.getAge(abm_ex2);
              }
            }
            // 必须断开不然会在上一步结束
            if (!abm_ex16) {
              this.$message.warning("请选择第" + (index) + "行共同家庭成员民族");
              isSave = false;
              return false;
            }
            else if (!abm_ex7) {
              this.$message.warning("请选择第" + (index) + "行共同家庭成员户口性质");
              isSave = false;
              return false;
            }
            else if (!abm_ex28) {
              this.$message.warning("请选择第" + (index) + "行共同家庭成员婚姻状况");
              isSave = false;
              return false;
            }
            else if (!abm_ex11) {
              this.$message.warning("请填写第" + (index) + "行共同家庭成员健康状况");
              isSave = false;
              return false;
            } else if (abm_ex11 == '重病' && !abm_ex52) {
              this.$message.warning("请填写第" + (index) + "行共同家庭成员重病病种");
              isSave = false;
              return false;
            } else if (abm_ex11 == '残疾' && !abm_ex39) {
              this.$message.warning("请填写第" + (index) + "行共同家庭成员残疾种类以及等级");
              isSave = false;
              return false;
            } else if (abm_ex11 == '残疾' && abm_ex39 && !abm_ex40) {
              this.$message.warning("请填写第" + (index) + "行共同家庭成员残疾等级");
              isSave = false;
              return false;
            } else if (!abm_ex49) {
              this.$message.warning("请填写第" + (index) + "行共同家庭成员劳动能力");
              isSave = false;
              return false;
            } else if (this.familyData1[i].work == "是" && !abm_ex14) {
              this.$message.warning("请填写第" + (index) + "行共同家庭成员职业状况");
              isSave = false;
              return false;
            }

            // if((abm_ex11=='健康'||abm_ex11=='残疾')&& abm_ex52){
            // 	this.$message.warning("第"+(index)+"行共同家庭成员健康状况与重病病种冲突");
            // 	isSave=false;
            // 	return false;
            // }
            // if((abm_ex11=='健康'||abm_ex11=='重病')&& abm_ex39){
            // 	this.$message.warning("第"+(index)+"行共同家庭成员健康状况与残疾种类冲突");
            // 	isSave=false;
            // 	return false;
            // }
            // if((abm_ex11=='健康'||abm_ex11=='重病')&& abm_ex40){
            // 	this.$message.warning("第"+(index)+"行共同家庭成员健康状况与残疾等级冲突");
            // 	isSave=false;
            // 	return false;
            // }
          }
        }
      }
      // 非共同生活赡抚养人没填全保存不了
      for (let i in this.familyData2) {
        this.familyData2[i].abm_ex6 = "N"
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
            isSave = false;
            return false;
          } else if (!abm_ex1) {
            this.$message.warning("请选择第" + (index) + "行非共同生活赡扶抚养人与申请人的关系");
            isSave = false;
            return false;
          } else if (!abm_ex2 || abm_ex2) {
            let msg = this.isCardID(abm_ex2);
            console.log(abm_ex2)
            if (msg) {
              this.$message.warning("第" + (index) + "行非共同生活赡扶抚养人" + msg);
              isSave = false;
              return false;
            } else {
              this.familyData2[i].abm_ex4 = this.getBirthdayFromIdCard(abm_ex2);//abm_ex4已被取消
              this.familyData2[i].abm_ex5 = this.getSex(abm_ex2);
              this.familyData2[i].age = this.getAge(abm_ex2);
            }
          }

          if (!abm_ex11) {
            this.$message.warning("请填写第" + (index) + "行非共同生活赡扶抚养人健康状况");
            isSave = false;
            return false;
          } else if (!abm_ex49) {
            this.$message.warning("请填写第" + (index) + "行共同家庭成员劳动能力");
            isSave = false;
            return false;
          }
        }
      }

      // 非共同生活赡抚养人家庭成员没填全保存不了
      for (let i in this.familyData3) {
        this.familyData3[i].abm_ex6 = "B"
        let abm_ex3 = this.familyData3[i].abm_ex3;
        let abm_ex1 = this.familyData3[i].abm_ex1;
        let abm_ex2 = this.familyData3[i].abm_ex2;
        let index = Number(i) + 1;
        if (!abm_ex3 && !abm_ex1 && !abm_ex2) {
          console.log('都没填跳过');
        }
        else {
          if (!abm_ex3) {
            this.$message.warning("请填写第" + (index) + "行非共同生活赡抚养人家庭成员姓名");
            isSave = false;
            return false;
          }
          else if (!abm_ex1) {
            this.$message.warning("请选择第" + (index) + "行非共同生活赡抚养人家庭成员与申请人的关系");
            isSave = false;
            return false;
          }
          else if (!abm_ex2 || abm_ex2) {
            let msg = this.isCardID(abm_ex2);
            console.log(abm_ex2)
            if (msg) {
              this.$message.warning("第" + (index) + "行非共同生活赡抚养人家庭成员" + msg);
              isSave = false;
              return false;
            } else {
              this.familyData3[i].abm_ex4 = this.getBirthdayFromIdCard(abm_ex2);//abm_ex4已被取消
              this.familyData3[i].abm_ex5 = this.getSex(abm_ex2);
              this.familyData3[i].age = this.getAge(abm_ex2);
            }
          }
          //已有非共同生活赡抚养人家庭成员，对是否有非共同生活赡抚养人进行判断
          if (this.familyData2.length == 0) {
            this.$message.warning("请填写非共同生活赡抚养人信息");
            return false;
          }
          else if (this.familyData2.length > 0) {
            for (let j in this.familyData2) {
              if (this.familyData2[j].abm_ex3 || this.familyData2[j].abm_ex1 || this.familyData2[j].abm_ex2 || this.familyData2[j].abm_ex11) {
                console.log('非共同生活抚养人有数据填跳过');
              } else {
                this.$message.warning("请将非共同生活赡抚养人信息补充完整");
                return false;
              }
            }
          }
        }
      }

      /// 收入数据保存过滤 : 遍历收入，如果计入收入名称、金额为空，则去除该行数据
      // 1.工资、
      if (this.income1.length > 0) {
        for (let i = 0; this.income1.length > i; i++) {
          let abi_ex1 = this.income1[i].abi_ex1;
          let abi_ex2 = this.income1[i].abi_ex2;
          if (!abi_ex1 && !abi_ex2) {
            this.income1.splice(i, 1);
            --i;
            console.log(this.income1);
          } else if (!abi_ex1 && abi_ex2) {
            this.$message.warning("请将第" + (i + 1) + "行工资性收入计入收入名称补充完整");
            return false;
          } else if (abi_ex1 && !abi_ex2) {
            this.$message.warning("请将第" + (i + 1) + "行工资性收入金额补充完整");
            return false;
          }
        }
      }
      // 2.财产、
      if (this.income3.length > 0) {
        for (let i = 0; this.income3.length > i; i++) {
          let abi_ex1 = this.income3[i].abi_ex1;
          let abi_ex2 = this.income3[i].abi_ex2;
          if (!abi_ex1 && !abi_ex2) {
            this.income3.splice(i, 1)
            --i;
          } else if (!abi_ex1 && abi_ex2) {
            this.$message.warning("请将第" + (i + 1) + "行财产净收入计入收入名称补充完整");
            return false;
          } else if (abi_ex1 && !abi_ex2) {
            this.$message.warning("请将第" + (i + 1) + "行财产净收入金额补充完整");
            return false;
          }
        }
      }
      // 3.转移、
      if (this.income4.length > 0) {
        for (let i = 0; this.income4.length > i; i++) {
          let abi_ex1 = this.income4[i].abi_ex1;
          let abi_ex2 = this.income4[i].abi_ex2;
          if (!abi_ex1 && !abi_ex2) {
            this.income4.splice(i, 1)
            --i;
          } else if (!abi_ex1 && abi_ex2) {
            this.$message.warning("请将第" + (i + 1) + "行转移净收入入收入名称补充完整");
            return false;
          } else if (abi_ex1 && !abi_ex2) {
            this.$message.warning("请将第" + (i + 1) + "行转移净收入金额补充完整");
            return false;
          }
        }
      }
      // 4.经营、
      // 5.其他、
      // 6.必要、
      // 7.总收入

      // 车船没填全保存不了
      for (let i in this.estate1) {
        this.estate1[i].abe_ex7 = "车船"
        let abe_ex1 = this.estate1[i].abe_ex1;
        let abe_ex2 = this.estate1[i].abe_ex2;
        let abe_ex3 = this.estate1[i].abe_ex3;
        let abe_ex4 = this.estate1[i].abe_ex4;
        let abe_ex8 = this.estate1[i].abe_ex8;
        let index = Number(i) + 1;
        console.log(this.estate1[i]);
        if (!abe_ex1 && !abe_ex2 && !abe_ex3 && !abe_ex4) {
          console.log("我执行了" + i)
          console.log(!abe_ex1 && !abe_ex2 && !abe_ex3 && !abe_ex4)
        } else {
          if (!abe_ex1) {
            this.$message.warning("请填写第" + (index) + "行车（船）主姓名");
            isSave = false;
            return false;
          } else if (!abe_ex2) {
            this.$message.warning("请填写第" + (index) + "行车（船）购买时间");
            isSave = false;
            return false;
          } else if (!abe_ex3) {
            this.$message.warning("请填写第" + (index) + "行车（船）用途");
            isSave = false;
            return false;
          } else if (!abe_ex8) {
            this.$message.warning("请选择第" + (index) + "行车（船）型号");
            isSave = false;
            return false;
          } else if (!abe_ex4) {
            this.$message.warning("请填写第" + (index) + "行车（船）价值");
            isSave = false;
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
        if (!abe_ex1 && !abe_ex2 && !abe_ex4 && !abe_ex5 && !abe_ex6) {//数据都为空，不进行操作
          console.log(!abe_ex1 && !abe_ex2 && !abe_ex4 && !abe_ex5 && !abe_ex6, '房屋' + i);
          console.log(!abe_ex1, '房屋产权人/共有人姓名');
        }
        else {
          if (!abe_ex1) {
            this.$message.warning("请填写第" + (index) + "行房屋产权人/共有人姓名");
            isSave = false;
            return false;
          } else if (!abe_ex2) {
            this.$message.warning("请填写第" + (index) + "行建房（购买）时间");
            isSave = false;
            return false;
          } else if (!abe_ex5) {
            this.$message.warning("请填写第" + (index) + "行房屋地址");
            isSave = false;
            return false;
          } else if (!abe_ex11) {
            this.$message.warning("请选择第" + (index) + "行房屋性质");
            isSave = false;
            return false;
          } else if (!abe_ex6) {
            this.$message.warning("请填写第" + (index) + "行房屋面积");
            isSave = false;
            return false;
          } else if (!abe_ex4) {
            this.$message.warning("请填写第" + (index) + "行房屋购置价/建造价");
            isSave = false;
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
            console.log(this.estate1);
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
            console.log(this.estate2);
          }
        }

      }

      // 根据房产进行房屋照片提示
      if (this.estate2.length > 0) {
        if (this.estate2[0].abe_ex1 != '') {
          if (this.uploadImg.ab_ex166_img.length < 2) {
            this.$message.warning("房屋整体照片至少上传两张");
            isSave = false;
            return false;
          }
          else if (this.uploadImg.ab_ex167_img.length < 2) {
            this.$message.warning("室内照片至少上传两张");
            isSave = false;
            return false;
          }
        }
      }

      // 月人均收支计算
      let num = 0;
      for (let i in this.familyData1) {
        if (this.familyData1[i].abm_ex3 == '') {//先判断数据是否符合要求（这里我用申请人姓名是否为空作为判断依据）
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

      if (!isSave) {
        return false;
      }
      var data = [];
      data.push(this.dibaoForm);
      var payData = [];
      payData.push(this.pay);
      var data2 = this.familyData1;
      var data3 = this.familyData2;
      var data5 = this.familyData3;
      var data6 = this.familyData4;
      //data2 = data2.concat(data3).concat(data4)
      //this.familyData1Old = this.familyData1Old.concat(this.familyData2Old)
      var datas = [];
      console.log("this.dibaoFormOld=============================================");
      console.log(this.dibaoFormOld);

      for (var key in data[0]) {
        var val = data[0][key];
        var old = this.dibaoFormOld[0][key];
        old = old == undefined || old == "undefined" || old == null || old == "null" ? "" : old
        val = val == undefined || val == "undefined" || val == null || val == "null" ? "" : val
        // console.log("1111");
        // console.log("key==="+key+"=="+val+"=="+old)
        if (old != val && key.indexOf("abm_") == -1 && key.indexOf("abp_") == -1 && key.indexOf("_id") == -1 && key.indexOf("ac_") == -1) {

          var d = {};
          var name = "";
          if (key == "ab_ex11")
            name = "家庭住址";
          else
            name = this.getLabel(key);

          name = key == "ab_ex10" ? "身份证照片" : name;
          name = key == "ab_ex16" ? "其他证明材料照片" : name;
          name = key == "ab_ex73" ? "电子授权书" : name;
          name = key == "ab_ex177" ? "纸质授权书" : name;
          name = key == "ab_ex97" ? "民主评议" : name;
          name = key == "ab_ex74" ? "审核审批表" : name;
          name = key == "ab_ex98" ? "公示图片" : name;
          name = key == "ab_ex166" ? "房屋整体照片" : name;
          name = key == "ab_ex167" ? "室内照片" : name;
          if (key == "ab_ex10" || key == "ab_ex16" || key == "ab_ex73" || key == "ab_ex177" || key == "ab_ex97" || key == "ab_ex74" || key == "ab_ex98" || key == "ab_ex166" || key == "ab_ex167") {
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
          console.log("key==111=" + key + "==" + val + "==" + old + "==" + name)
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


      // 刚性支出
      // console.log(payData,"--------------payData");
      // console.log(this.payOld);
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
          // console.log("key==="+key+"=="+val+"=="+old)
          var d = {};
          var name = "";
          // if(key=="ab_ex11")
          // 	name="家庭住址";
          // else
          // 	name=this.getLabel(key);

          if (name) {
            name = name.replace("&nbsp;", "");
          }
          // console.log("key==111="+key+"=="+val+"=="+old+"=="+name)
          if (name) {
            d.acc_ex1 = name;
            d.acc_ex2 = escape(old);
            d.acc_ex3 = escape(val);
            d.acc_ex4 = key;
            d.acc_ex5 = "支出情况修改";
            d.acc_ex6 = "修改";
            datas.push(d);
          }

        }
      }

      // debugger
      // 预警信息

      var index = 1;
      let warning = this.waringData
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
          for (let j = 0; j < this.waringDataOld.length; j++) {
            var aw_id_ = this.waringDataOld[j].aw_id;
            if (aw_id == aw_id_) {
              data_ = this.waringDataOld[j];
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
      for (let j = 0; j < this.waringDataOld.length; j++) {
        var aw_id = this.waringDataOld[j].aw_id;
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
          for (var key in warning[0]) {
            var text = this.waringField[key];
            var d = {};
            d.acc_ex1 = text;
            d.acc_ex2 = unescape(this.waringDataOld[j][key]);
            d.acc_ex3 = "";
            d.acc_ex4 = key;
            d.acc_ex5 = "预警信息";
            d.acc_ex6 = "删除";
            d.acc_ex7 = "del" + index;
            d.acc_ex8 = "自定义预警";
            d.acc_ex9 = this.waringDataOld[j]["aw_id"];
            datas.push(d);
          }
        }
      }

      // 共同生活
      var index = 1;
      // console.log(data2);
      for (let i = 0; i < data2.length; i++) {

        var abm_id = data2[i].abm_id;
        // console.log("abm_id====="+abm_id);
        if (abm_id == "" || abm_id == "0" || abm_id == undefined) {

          for (var key in data2[i]) {
            var val = unescape(data2[i][key]);
            var text = this.familyField[key];
            if (key.indexOf("_id") != -1 || !text || key == "amb_ex6" || val == "")
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

          index = 1;
          var html = "";
          // console.log(data2[i])
          // console.log(data_)

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
      }
      index = 1;
      for (let j = 0; j < this.familyData1Old.length; j++) {
        var abm_ex2 = this.familyData1Old[j].abm_ex2;
        var isOk = false;
        for (let i = 0; i < data2.length; i++) {
          var abm_ex2_ = data2[i].abm_ex2;
          // console.log("abm_ex2_====="+abm_ex2_);
          if (abm_ex2 == abm_ex2_) {
            isOk = true;
          }
        }
        // console.log(abm_ex2+"=="+isOk);
        if (!isOk) {
          for (var key in data2[0]) {
            var text = this.familyField[key];
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
      // 非共同
      console.log(datas);
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

          index = 1;
          var html = "";
          for (var key in data3[i]) {
            if (key.indexOf("_id") != -1 || key == "amb_ex6") {
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
        var abm_ex2 = this.familyData2Old[j].abm_ex2;
        var isOk = false;
        for (let i = 0; i < data3.length; i++) {
          var abm_ex2_ = data3[i].abm_ex2;
          if (abm_ex2 == abm_ex2_) {
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

          index = 1;
          var html = "";
          for (var key in data5[i]) {
            if (key.indexOf("_id") != -1 || key == "amb_ex6")
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

        var abm_ex2 = this.familyData3Old[j].abm_ex2;
        var isOk = false;
        for (let i = 0; i < data5.length; i++) {
          var abm_ex2_ = data5[i].abm_ex2;
          if (abm_ex2 == abm_ex2_) {
            isOk = true;
          }
        }
        if (!isOk) {
          for (var key in this.familyData3Old[0]) {
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

          index = 1;
          var html = "";
          for (var key in data6[i]) {
            if (key.indexOf("_id") != -1 || key == "amb_ex6")
              continue;
            var val = data6[i][key];
            var old = data_[key];
            var text = this.family3Field[key];
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

        var abm_ex2 = this.familyData4Old[j].abm_ex2;
        var isOk = false;
        for (let i = 0; i < data6.length; i++) {
          var abm_ex2_ = data6[i].abm_ex2;
          if (abm_ex2 == abm_ex2_) {
            isOk = true;
          }
        }
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
      console.log(datas);
      // 12月收入
      // 工资性收入
      index = 1;
      let income1 = this.income1;
      for (var i in this.income1) {
        console.log(this.income1);
        var abi_id = income1[i].abi_id;
        if (abi_id == "" || abi_id == "0" || abi_id == undefined) {
          for (var key in income1[i]) {
            console.log(income1[i]);
            var val = income1[i][key];
            var text = this.income1Field[key]
            console.log(text, "text");
            if (key == "abi_ex1" && text == "") {
              text = "计入收入名称";
            }
            if (key == "abi_ex2" && text == "") {
              text = "金额";
            }
            if (key.indexOf("_id") != -1 || !text || key == "abi_ex3" || key == "abi_ex4" || key == "abi_ex5") {
              continue;
            }
            var d = {};
            console.log(key, 'key');

            d.acc_ex1 = text;
            d.acc_ex2 = "";
            d.acc_ex3 = val;
            d.acc_ex4 = key;
            d.acc_ex5 = "工资性收入";
            d.acc_ex6 = "新增";
            d.acc_ex7 = "add" + index;
            datas.push(d);
            console.log(d);
          }
        } else {
          var data_ = {};
          for (let j = 0; j < this.income1Old.length; j++) {
            var abi_id_ = this.income1Old[j].abi_id;
            if (abi_id == abi_id_) {
              data_ = this.income1Old[j];
            }
          }
          index = 1;
          var html = "";
          for (var key in income1[i]) {
            if (key == "abi_ex1" && text == "") {
              text = "计入收入名称";
            }
            if (key == "abi_ex2" && text == "") {
              text = "金额";
            }
            if (key.indexOf("_id") != -1 || !text || key == "abi_ex3" || key == "abi_ex4" || key == "abi_ex5") {
              continue;
            }

            var val = income1[i][key];
            var old = data_[key];
            var text = this.income1Field[key]
            if (val != old && text) {
              var d = {};
              d.acc_ex1 = text;
              d.acc_ex2 = old;
              d.acc_ex3 = val;
              d.acc_ex4 = key;
              d.acc_ex5 = "工资性收入";
              d.acc_ex6 = "修改";
              d.acc_ex7 = "edit" + index;
              d.acc_ex9 = abi_id;
              datas.push(d);
              console.log(d);
            }
          }
        }
        index++;
      }
      index = 1;
      for (let j = 0; j < this.income1Old.length; j++) {

        var abi_id = this.income1Old[j].abi_id;
        var isOk = false;
        for (let i = 0; i < income1.length; i++) {
          var abi_id_ = income1[i].abi_id;

          if (abi_id == abi_id_) {
            isOk = true;
          }
        }

        if (!isOk) {
          for (var key in income1[0]) {
            var text = this.income1Field[key];
            var d = {};
            d.acc_ex1 = text;
            d.acc_ex2 = this.income1Old[j][key];
            d.acc_ex3 = "";
            d.acc_ex4 = key;
            d.acc_ex5 = "工资性收入";
            d.acc_ex6 = "删除";
            d.acc_ex7 = "del" + index;
            d.acc_ex9 = abi_id;
            datas.push(d);
          }
        }
      }
      // 经营性净收入
      index = 1;
      let income2 = this.income2;
      for (var i in this.income2) {
        console.log(this.income2);
        var abi_id = income2[i].abi_id;
        if (abi_id == "" || abi_id == "0" || abi_id == undefined) {
          for (var key in income2[i]) {
            console.log(income2[i]);
            var val = income2[i][key];
            var text = this.income2Field[key]
            console.log(text, "text");
            if (key == "abi_ex1" && text == "") {
              text = "计入收入名称";
            }
            if (key == "abi_ex2" && text == "") {
              text = "金额";
            }
            if (key.indexOf("_id") != -1 || !text || key == "abi_ex3" || key == "abi_ex4" || key == "abi_ex5") {
              continue;
            }
            var d = {};
            console.log(key, 'key');

            d.acc_ex1 = text;
            d.acc_ex2 = "";
            d.acc_ex3 = val;
            d.acc_ex4 = key;
            d.acc_ex5 = "经营性净收入";
            d.acc_ex6 = "新增";
            d.acc_ex7 = "add" + index;
            datas.push(d);
            console.log(d);
          }
        } else {
          var data_ = {};
          for (let j = 0; j < this.income2Old.length; j++) {
            var abi_id_ = this.income2Old[j].abi_id;
            if (abi_id == abi_id_) {
              data_ = this.income2Old[j];
            }
          }
          index = 1;
          var html = "";
          for (var key in income2[i]) {
            if (key == "abi_ex1" && text == "") {
              text = "计入收入名称";
            }
            if (key == "abi_ex2" && text == "") {
              text = "金额";
            }
            if (key.indexOf("_id") != -1 || !text || key == "abi_ex3" || key == "abi_ex4" || key == "abi_ex5") {
              continue;
            }

            var val = income2[i][key];
            var old = data_[key];
            var text = this.income2Field[key]
            if (val != old && text) {
              var d = {};
              d.acc_ex1 = text;
              d.acc_ex2 = old;
              d.acc_ex3 = val;
              d.acc_ex4 = key;
              d.acc_ex5 = "经营性净收入";
              d.acc_ex6 = "修改";
              d.acc_ex7 = "edit" + index;
              d.acc_ex9 = abi_id;
              datas.push(d);
              console.log(d);
            }
          }
        }
        index++;
      }
      index = 1;
      for (let j = 0; j < this.income2Old.length; j++) {

        var abi_id = this.income2Old[j].abi_id;
        var isOk = false;
        for (let i = 0; i < income2.length; i++) {
          var abi_id_ = income2[i].abi_id;

          if (abi_id == abi_id_) {
            isOk = true;
          }
        }

        if (!isOk) {
          for (var key in income2[0]) {
            var text = this.income2Field[key];
            var d = {};
            d.acc_ex1 = text;
            d.acc_ex2 = this.income2Old[j][key];
            d.acc_ex3 = "";
            d.acc_ex4 = key;
            d.acc_ex5 = "经营性净收入";
            d.acc_ex6 = "删除";
            d.acc_ex7 = "del" + index;
            d.acc_ex9 = abi_id;
            datas.push(d);
          }
        }
      }
      // 财产性净收入
      index = 1;
      let income3 = this.income3;
      for (var i in this.income3) {
        console.log(this.income3);
        var abi_id = income3[i].abi_id;
        if (abi_id == "" || abi_id == "0" || abi_id == undefined) {
          for (var key in income3[i]) {
            console.log(income3[i]);
            var val = income3[i][key];
            var text = this.income3Field[key]
            console.log(text, "text");
            if (key == "abi_ex1" && text == "") {
              text = "计入收入名称";
            }
            if (key == "abi_ex2" && text == "") {
              text = "金额";
            }
            if (key.indexOf("_id") != -1 || !text || key == "abi_ex3" || key == "abi_ex4" || key == "abi_ex5") {
              continue;
            }
            var d = {};
            console.log(key, 'key');

            d.acc_ex1 = text;
            d.acc_ex2 = "";
            d.acc_ex3 = val;
            d.acc_ex4 = key;
            d.acc_ex5 = "财产性净收入";
            d.acc_ex6 = "新增";
            d.acc_ex7 = "add" + index;
            datas.push(d);
            console.log(d);
          }
        } else {
          var data_ = {};
          for (let j = 0; j < this.income3Old.length; j++) {
            var abi_id_ = this.income3Old[j].abi_id;
            if (abi_id == abi_id_) {
              data_ = this.income3Old[j];
            }
          }
          index = 1;
          var html = "";
          for (var key in income3[i]) {
            if (key == "abi_ex1" && text == "") {
              text = "计入收入名称";
            }
            if (key == "abi_ex2" && text == "") {
              text = "金额";
            }
            if (key.indexOf("_id") != -1 || !text || key == "abi_ex3" || key == "abi_ex4" || key == "abi_ex5") {
              continue;
            }

            var val = income3[i][key];
            var old = data_[key];
            var text = this.income3Field[key]
            if (val != old && text) {
              var d = {};
              d.acc_ex1 = text;
              d.acc_ex2 = old;
              d.acc_ex3 = val;
              d.acc_ex4 = key;
              d.acc_ex5 = "财产性净收入";
              d.acc_ex6 = "修改";
              d.acc_ex7 = "edit" + index;
              d.acc_ex9 = abi_id;
              datas.push(d);
              console.log(d);
            }
          }
        }
        index++;
      }
      index = 1;
      for (let j = 0; j < this.income3Old.length; j++) {

        var abi_id = this.income3Old[j].abi_id;
        var isOk = false;
        for (let i = 0; i < income3.length; i++) {
          var abi_id_ = income3[i].abi_id;

          if (abi_id == abi_id_) {
            isOk = true;
          }
        }

        if (!isOk) {
          for (var key in income3[0]) {
            var text = this.income3Field[key];
            var d = {};
            d.acc_ex1 = text;
            d.acc_ex2 = this.income3Old[j][key];
            d.acc_ex3 = "";
            d.acc_ex4 = key;
            d.acc_ex5 = "财产性净收入";
            d.acc_ex6 = "删除";
            d.acc_ex7 = "del" + index;
            d.acc_ex9 = abi_id;
            datas.push(d);
          }
        }
      }
      // 转移净收入
      index = 1;
      let income4 = this.income4;
      for (var i in this.income4) {
        console.log(this.income4);
        var abi_id = income4[i].abi_id;
        if (abi_id == "" || abi_id == "0" || abi_id == undefined) {
          for (var key in income4[i]) {
            console.log(income4[i]);
            var val = income4[i][key];
            var text = this.income4Field[key]
            console.log(text, "text");
            if (key == "abi_ex1" && text == "") {
              text = "计入收入名称";
            }
            if (key == "abi_ex2" && text == "") {
              text = "金额";
            }
            if (key.indexOf("_id") != -1 || !text || key == "abi_ex3" || key == "abi_ex4" || key == "abi_ex5") {
              continue;
            }
            var d = {};
            console.log(key, 'key');

            d.acc_ex1 = text;
            d.acc_ex2 = "";
            d.acc_ex3 = val;
            d.acc_ex4 = key;
            d.acc_ex5 = "转移净收入";
            d.acc_ex6 = "新增";
            d.acc_ex7 = "add" + index;
            datas.push(d);
            console.log(d);
          }
        } else {
          var data_ = {};
          for (let j = 0; j < this.income4Old.length; j++) {
            var abi_id_ = this.income4Old[j].abi_id;
            if (abi_id == abi_id_) {
              data_ = this.income4Old[j];
            }
          }
          index = 1;
          var html = "";
          for (var key in income4[i]) {
            if (key == "abi_ex1" && text == "") {
              text = "计入收入名称";
            }
            if (key == "abi_ex2" && text == "") {
              text = "金额";
            }
            if (key.indexOf("_id") != -1 || !text || key == "abi_ex3" || key == "abi_ex4" || key == "abi_ex5") {
              continue;
            }

            var val = income4[i][key];
            var old = data_[key];
            var text = this.income4Field[key]
            if (val != old && text) {
              var d = {};
              d.acc_ex1 = text;
              d.acc_ex2 = old;
              d.acc_ex3 = val;
              d.acc_ex4 = key;
              d.acc_ex5 = "转移净收入";
              d.acc_ex6 = "修改";
              d.acc_ex7 = "edit" + index;
              d.acc_ex9 = abi_id;
              datas.push(d);
              console.log(d);
            }
          }
        }
        index++;
      }
      index = 1;
      for (let j = 0; j < this.income4Old.length; j++) {

        var abi_id = this.income4Old[j].abi_id;
        var isOk = false;
        for (let i = 0; i < income4.length; i++) {
          var abi_id_ = income4[i].abi_id;

          if (abi_id == abi_id_) {
            isOk = true;
          }
        }

        if (!isOk) {
          for (var key in income4[0]) {
            var text = this.income4Field[key];
            var d = {};
            d.acc_ex1 = text;
            d.acc_ex2 = this.income4Old[j][key];
            d.acc_ex3 = "";
            d.acc_ex4 = key;
            d.acc_ex5 = "转移净收入";
            d.acc_ex6 = "删除";
            d.acc_ex7 = "del" + index;
            d.acc_ex9 = abi_id;
            datas.push(d);
          }
        }
      }
      // 其他收入
      index = 1;
      let income5 = this.income5;
      for (var i in this.income5) {
        console.log(this.income5);
        var abi_id = income5[i].abi_id;
        if (abi_id == "" || abi_id == "0" || abi_id == undefined) {
          for (var key in income5[i]) {
            console.log(income5[i]);
            var val = income5[i][key];
            var text = this.income5Field[key]
            console.log(text, "text");
            if (key == "abi_ex1" && text == "") {
              text = "计入收入名称";
            }
            if (key == "abi_ex2" && text == "") {
              text = "金额";
            }
            if (key.indexOf("_id") != -1 || !text || key == "abi_ex3" || key == "abi_ex4" || key == "abi_ex5") {
              continue;
            }
            var d = {};
            console.log(key, 'key');

            d.acc_ex1 = text;
            d.acc_ex2 = "";
            d.acc_ex3 = val;
            d.acc_ex4 = key;
            d.acc_ex5 = "其他收入";
            d.acc_ex6 = "新增";
            d.acc_ex7 = "add" + index;
            datas.push(d);
            console.log(d);
          }
        } else {
          var data_ = {};
          for (let j = 0; j < this.income5Old.length; j++) {
            var abi_id_ = this.income5Old[j].abi_id;
            if (abi_id == abi_id_) {
              data_ = this.income5Old[j];
            }
          }
          index = 1;
          var html = "";
          for (var key in income5[i]) {
            if (key == "abi_ex1" && text == "") {
              text = "计入收入名称";
            }
            if (key == "abi_ex2" && text == "") {
              text = "金额";
            }
            if (key.indexOf("_id") != -1 || !text || key == "abi_ex3" || key == "abi_ex4" || key == "abi_ex5") {
              continue;
            }

            var val = income5[i][key];
            var old = data_[key];
            var text = this.income5Field[key]
            if (val != old && text) {
              var d = {};
              d.acc_ex1 = text;
              d.acc_ex2 = old;
              d.acc_ex3 = val;
              d.acc_ex4 = key;
              d.acc_ex5 = "其他收入";
              d.acc_ex6 = "修改";
              d.acc_ex7 = "edit" + index;
              d.acc_ex9 = abi_id;
              datas.push(d);
              console.log(d);
            }
          }
        }
        index++;
      }
      index = 1;
      for (let j = 0; j < this.income5Old.length; j++) {

        var abi_id = this.income5Old[j].abi_id;
        var isOk = false;
        for (let i = 0; i < income5.length; i++) {
          var abi_id_ = income5[i].abi_id;

          if (abi_id == abi_id_) {
            isOk = true;
          }
        }

        if (!isOk) {
          for (var key in income5[0]) {
            var text = this.income5Field[key];
            var d = {};
            d.acc_ex1 = text;
            d.acc_ex2 = this.income5Old[j][key];
            d.acc_ex3 = "";
            d.acc_ex4 = key;
            d.acc_ex5 = "其他收入";
            d.acc_ex6 = "删除";
            d.acc_ex7 = "del" + index;
            d.acc_ex9 = abi_id;
            datas.push(d);
          }
        }
      }
      // 必要就业成本抵扣
      index = 1;
      let income6 = this.income6;
      for (var i in this.income6) {
        console.log(this.income6);
        var abi_id = income6[i].abi_id;
        if (abi_id == "" || abi_id == "0" || abi_id == undefined) {
          for (var key in income6[i]) {
            console.log(income6[i]);
            var val = income6[i][key];
            var text = this.income6Field[key]
            console.log(text, "text");
            if (key == "abi_ex1" && text == "") {
              text = "计入收入名称";
            }
            if (key == "abi_ex2" && text == "") {
              text = "金额";
            }
            if (key.indexOf("_id") != -1 || !text || key == "abi_ex3" || key == "abi_ex4" || key == "abi_ex5") {
              continue;
            }
            var d = {};
            console.log(key, 'key');

            d.acc_ex1 = text;
            d.acc_ex2 = "";
            d.acc_ex3 = val;
            d.acc_ex4 = key;
            d.acc_ex5 = "必要就业成本抵扣";
            d.acc_ex6 = "新增";
            d.acc_ex7 = "add" + index;
            datas.push(d);
            console.log(d);
          }
        } else {
          var data_ = {};
          for (let j = 0; j < this.income6Old.length; j++) {
            var abi_id_ = this.income6Old[j].abi_id;
            if (abi_id == abi_id_) {
              data_ = this.income6Old[j];
            }
          }
          index = 1;
          var html = "";
          for (var key in income6[i]) {
            if (key == "abi_ex1" && text == "") {
              text = "计入收入名称";
            }
            if (key == "abi_ex2" && text == "") {
              text = "金额";
            }
            if (key.indexOf("_id") != -1 || !text || key == "abi_ex3" || key == "abi_ex4" || key == "abi_ex5") {
              continue;
            }

            var val = income6[i][key];
            var old = data_[key];
            var text = this.income6Field[key]
            if (val != old && text) {
              var d = {};
              d.acc_ex1 = text;
              d.acc_ex2 = old;
              d.acc_ex3 = val;
              d.acc_ex4 = key;
              d.acc_ex5 = "必要就业成本抵扣";
              d.acc_ex6 = "修改";
              d.acc_ex7 = "edit" + index;
              d.acc_ex9 = abi_id;
              datas.push(d);
              console.log(d);
            }
          }
        }
        index++;
      }
      index = 1;
      for (let j = 0; j < this.income6Old.length; j++) {

        var abi_id = this.income6Old[j].abi_id;
        var isOk = false;
        for (let i = 0; i < income6.length; i++) {
          var abi_id_ = income6[i].abi_id;

          if (abi_id == abi_id_) {
            isOk = true;
          }
        }

        if (!isOk) {
          for (var key in income6[0]) {
            var text = this.income6Field[key];
            var d = {};
            d.acc_ex1 = text;
            d.acc_ex2 = this.income6Old[j][key];
            d.acc_ex3 = "";
            d.acc_ex4 = key;
            d.acc_ex5 = "必要就业成本抵扣";
            d.acc_ex6 = "删除";
            d.acc_ex7 = "del" + index;
            d.acc_ex9 = abi_id;
            datas.push(d);
          }
        }
      }
      // 总收入
      index = 1;
      let income7 = this.income7;
      for (var i in this.income7) {
        console.log(this.income7);
        var abi_id = income7[i].abi_id;
        if (abi_id == "" || abi_id == "0" || abi_id == undefined) {
          for (var key in income7[i]) {
            console.log(income7[i]);
            var val = income7[i][key];
            var text = this.income7Field[key]
            console.log(text, "text");
            if (key == "abi_ex1" && text == "") {
              text = "计入收入名称";
            }
            if (key == "abi_ex2" && text == "") {
              text = "金额";
            }
            if (key.indexOf("_id") != -1 || !text || key == "abi_ex3" || key == "abi_ex4" || key == "abi_ex5") {
              continue;
            }
            var d = {};
            console.log(key, 'key');

            d.acc_ex1 = text;
            d.acc_ex2 = "";
            d.acc_ex3 = val;
            d.acc_ex4 = key;
            d.acc_ex5 = "总收入";
            d.acc_ex6 = "新增";
            d.acc_ex7 = "add" + index;
            datas.push(d);
            console.log(d);
          }
        } else {
          var data_ = {};
          for (let j = 0; j < this.income7Old.length; j++) {
            var abi_id_ = this.income7Old[j].abi_id;
            if (abi_id == abi_id_) {
              data_ = this.income7Old[j];
            }
          }
          index = 1;
          var html = "";
          for (var key in income7[i]) {
            if (key == "abi_ex1" && text == "") {
              text = "计入收入名称";
            }
            if (key == "abi_ex2" && text == "") {
              text = "金额";
            }
            if (key.indexOf("_id") != -1 || !text || key == "abi_ex3" || key == "abi_ex4" || key == "abi_ex5") {
              continue;
            }

            var val = income7[i][key];
            var old = data_[key];
            var text = this.income7Field[key]
            if (val != old && text) {
              var d = {};
              d.acc_ex1 = text;
              d.acc_ex2 = old;
              d.acc_ex3 = val;
              d.acc_ex4 = key;
              d.acc_ex5 = "总收入";
              d.acc_ex6 = "修改";
              d.acc_ex7 = "edit" + index;
              d.acc_ex9 = abi_id;
              datas.push(d);
              console.log(d);
            }
          }
        }
        index++;
      }
      index = 1;
      for (let j = 0; j < this.income7Old.length; j++) {

        var abi_id = this.income7Old[j].abi_id;
        var isOk = false;
        for (let i = 0; i < income7.length; i++) {
          var abi_id_ = income7[i].abi_id;

          if (abi_id == abi_id_) {
            isOk = true;
          }
        }

        if (!isOk) {
          for (var key in income7[0]) {
            var text = this.income7Field[key];
            var d = {};
            d.acc_ex1 = text;
            d.acc_ex2 = this.income7Old[j][key];
            d.acc_ex3 = "";
            d.acc_ex4 = key;
            d.acc_ex5 = "总收入";
            d.acc_ex6 = "删除";
            d.acc_ex7 = "del" + index;
            d.acc_ex9 = abi_id;
            datas.push(d);
          }
        }
      }


      // 家庭财产： 车船、房屋    
      index = 1;
      // var estates=[];
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
          index = 1;
          var html = "";
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
          for (var key in estate[0]) {
            var text = this.estate1Field[key];
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
      estate = this.estate2;
      index = 1;
      var estates = [];
      for (let i = 0; i < estate.length; i++) {

        var abe_id = estate[i].abe_id;
        if (abe_id == "" || abe_id == "0" || abe_id == undefined) {
          for (var key in estate[i]) {
            var val = estate[i][key];
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

          index = 1;
          var html = "";
          for (var key in estate[i]) {
            if (key.indexOf("_id") != -1)
              continue;
            var val = estate[i][key];
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

      if (this.dibaoForm.ab_ex7 == '' || this.dibaoForm.ab_ex7.length != 18) {
        this.$message.warning('请输入正确的身份证号')
        return false
      }
      if (this.dibaoForm.ab_ex3 == '') {
        this.$message.warning('请输入姓名')
        return false
      }
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
      this.saveBasicChange({
        "data": JSON.stringify(datas),
        "sId": this.$route.query.sId,
        ac_ex10: this.changeM.ac_ex10 != '其他' ? this.changeM.ac_ex10 : this.changeM.ac_ex10_2,
        ac_dat1: this.changeM.ac_dat1,
        ab_ex13: "特困供养"
      }).then((res) => {
        if (res[0].status == "+Ok") {
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
        if (res.response.data[0].status == "+Ok") {
          loading.close()
          this.$message.success(res.response.data[0].msg)
          this.$emit("closes", false)
          this.$router.go(-1)
        } else {
          loading.close()
          this.$message.error(res.response.data[0].msg)
        }
      })
    },
    getLabel (id) {
      let name = "";
      var arr = document.getElementsByTagName("label");
      //for循环
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
    // 自定义预警
    loadWaring (data) {
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
        // }
        method: 'post',
        url: '/social/assistance/getBasicEstate',
        data: data
      })
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
    getSex (card) {
      let sex = "";
      let msg = this.isCardID(card);
      if (!msg) {
        //获取性别 
        if (parseInt(card.substr(16, 1)) % 2 == 1) {
          sex = "男";
        } else {
          sex = "女";
        }
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
      return age;
    },
    isCardID (sId) {
      //js去掉所有空格 \s表示查找空格带上加好表示连续的空格
      // this.dibaoForm.ab_ex7=sId.replace(/\s+/g,""); 
      sId = sId.replace(/\s+/g, "");
      var aCity = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" };
      var iSum = 0;
      var info = "";
      if (!/^\d{17}(\d|x)$/i.test(sId)) return "身份证长度或格式错误";
      sId = sId.replace(/x$/i, "a");
      if (aCity[parseInt(sId.substr(0, 2))] == null) return "身份证地区非法";
      let sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2));
      var d = new Date(sBirthday.replace(/-/g, "/"));
      if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) return "身份证上的出生日期非法";
      for (var i = 17; i >= 0; i--) iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
      if (iSum % 11 != 1) return "身份证号非法";
      //aCity[parseInt(sId.substr(0,2))]+","+sBirthday+","+(sId.substr(16,1)%2?"男":"女");//此次还可以判断出输入的身份证号的人性别
      return "";
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
    changeCard (index, row, id) {
      if (id == "f1.abm_ex2") {
        var msg = this.isCardID(this.familyData1[index].abm_ex2)
        if (msg) {
          console.log(msg);
          this.$message.warning("第" + (index + 1) + "行共同生活成员" + msg);
          return false;
        }
      }
      this.familyData1[index].abm_ex5 = this.getSex(this.familyData1[index].abm_ex2);
      this.familyData1[index].age = this.getAge(this.familyData1[index].abm_ex2);
      if (this.familyData1[index].age < 16 || this.familyData1[index].age > 60) {
        // this.familyData1[index].work="否"
        this.$set(this.familyData1[index], "work", "否");
      } else {
        this.$set(this.familyData1[index], "work", "是");
      }
    },
    changeCard2 (index, row, id) {
      if (id == "f2.abm_ex2") {
        var msg = this.isCardID(this.familyData2[index].abm_ex2)
        if (msg) {
          console.log(msg);
          this.$message.warning("第" + (index + 1) + "行非共同生活赡抚养人" + msg);
          return false;
        }
      }
      let sex = this.getSex(this.familyData2[index].abm_ex2)
      this.$set(this.familyData2[index], "abm_ex5", sex);
    },
    changeCard3 (index, row, id) {
      if (id == "f3.abm_ex2") {
        var msg = this.isCardID(this.familyData3[index].abm_ex2)
        if (msg) {
          console.log(msg);
          this.$message.warning("第" + (index + 1) + "行共非同生活赡抚养人家庭成员" + msg);
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
  background-image: none !important;
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

/* 	.my-table .el-input__inner {
		border: 0 !important;
	} */
.my-table >>> .el-input__inner {
  border: 0;
}
.srname >>> .el-input__inner {
  text-align: center;
}
</style>
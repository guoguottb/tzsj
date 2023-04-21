// 上门核查
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
                            prop="aw_dat"
                            disabledDate>
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
              <!--  -->
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
          <!-- <el-dialog title="是否删除该图片" :visible.sync="dialogVisible4" width="500px" append-to-body>
					<upload @upload="uploadEvent" ref="myUpload"></upload>
					<span slot="footer" class="dialog-footer">
						<el-button @click="dialogVisible4 = false">取 消</el-button>
						<el-button type="primary" @click="dialogVisible4 = false">确 定</el-button>
					</span>
				</el-dialog> -->
        </el-form>

        <div class="mengBan"
             v-if="jisuanShow"><!-- 灰色蒙版 -->
          <el-card class="box-card calculations">
            <div slot="header"
                 class="clearfix">
              <span style="font-size:18px;">泰州市政策计算器</span>
              <el-button style="float: right; padding: 3px 0"
                         type="text"
                         @click="closeCalculations">关闭</el-button>
            </div>
            <el-form :label-position="labelPosition"
                     :model="jisuan"
                     style="padding:0 20px 10px 20px">
              <el-form-item label="家庭人员总数"
                            label-width="200px">
                <el-input v-model="jisuan.familyNum"
                          placeholder="请输入家庭人员总数"></el-input>
              </el-form-item>
              <el-form-item label="家庭中重残人数"
                            label-width="200px">
                <el-input style="display:inline-block;"
                          v-model="jisuan.familyZC"
                          placeholder="请输入家庭中重残人数"></el-input>
              </el-form-item>
              <el-form-item label="家庭中重病人数"
                            label-width="200px">
                <el-input style="display:inline-block;"
                          v-model="jisuan.familyZB"
                          placeholder="请输入家庭中重病人数"></el-input>
              </el-form-item>
              <el-form-item label="家庭总年收入"
                            label-width="200px">
                <el-input style="display:inline-block;"
                          v-model="jisuan.familyAmt"
                          placeholder="请输入家庭总年收入"></el-input>
              </el-form-item>
              <el-form-item label="家庭年总刚性支出"
                            label-width="200px">
                <el-input style="display:inline-block;"
                          v-model="jisuan.familyZzc"
                          placeholder="请输入家庭年总刚性支出"></el-input>
              </el-form-item>
              <el-form-item label="家庭中法定赡抚养人人数"
                            label-width="200px">
                <el-input style="display:inline-block;"
                          v-model="jisuan.familyFD"
                          placeholder="请输入家庭中法定赡抚养人的人数"></el-input>
              </el-form-item>
              <el-form-item label="家庭成员中未成年人数"
                            label-width="200px">
                <el-select v-model="jisuan.familyChildrens">
                  <el-option label="0"
                             value="0"></el-option>
                  <el-option label="1"
                             value="1"></el-option>
                  <el-option label="2"
                             value="2"></el-option>
                  <el-option label="3"
                             value="3"></el-option>
                  <el-option label="4"
                             value="4"></el-option>
                  <el-option label="5人及以上"
                             value="5人及以上"></el-option>
                  <!-- <el-option label="有未成年成员" value="shanghai"></el-option>
								<el-option label="没有未成年人员" value="beijing"></el-option> -->
                </el-select>
                <!-- <el-input style="display:inline-block;width:96%;" v-model="jisuan.familyChildrens" placeholder="请输入家庭中未成年的人数" @change="changeJS"></el-input> -->
              </el-form-item>
            </el-form>
            <div style="margin:20px auto">
              <el-button type="primary"
                         size="small"
                         @click="changeAmt">获取当前申请人数据</el-button>
              <el-button type="success"
                         size="small"
                         @click="changeJS">政策计算</el-button>
              <el-button type="info"
                         size="small"
                         @click="clearJS">重置</el-button>
            </div>

            <!-- 计算结果 -->
            <div style="width:99%;margin:20px auto 0px;padding:10px;background-color:#f1f1f1;text-align: center;">
              <span v-show="jsjgshow1"
                    style="font-size:18px;color:red;margin:10px 0;">您可能符合如下救助</span>
              <span v-show="jsjgshow2"
                    style="font-size:18px;color:red;margin:10px 0;">您不符合救助条件</span>
              <p v-show="jsjgshow1"
                 class="jsjg">{{jsjgString}}</p>
            </div>
          </el-card>
        </div>
      </div>
      <!-- 政策计算 -->

      <!-- 右边导航 -->
      <div class="ainfo2">
        <div style="margin-left:20px;text-align:center;border-bottom:1px solid #ddd;padding-bottom:10px;">
          <el-button type="primary"
                     size="small"
                     @click="save">保存</el-button>
          <el-button size="small"
                     @click="closeView">返回</el-button>
          <el-button size="small"
                     @click="calculations">计算</el-button>
        </div>

        <div style="margin-left:20px;margin-top:20px;">
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
            <li :class="{listStyle:isShow8}"
                @click="isShow(8)">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow8}"
                 @click="counter('#page8')">非共同生活赡抚养人家庭成员信息</a><br>
            </li>
            <li :class="{listStyle:isShow5}"
                @click="isShow(5)">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow5}"
                 @click="counter('#page5')">家庭前12个月收入情况</a><br>
            </li>
            <li :class="{listStyle:isShow9}"
                @click="isShow(9)">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow9}"
                 @click="counter('#page9')">家庭前12个月支出情况</a><br>
            </li>
            <li :class="{listStyle:isShow6}"
                @click="isShow(6)">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow6}"
                 @click="counter('#page6')">金融资产</a><br>
            </li>
            <li :class="{listStyle:isShow10}"
                @click="isShow(10)">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow10}"
                 @click="counter('#page10')">拥有车、船情况</a><br>
            </li>
            <li :class="{listStyle:isShow11}"
                @click="isShow(11)">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow11}"
                 @click="counter('#page11')">拥有房产情况</a><br>
            </li>
            <li :class="{listStyle:isShow12}"
                @click="isShow(12)">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow12}"
                 @click="counter('#page12')">居住状况照片</a><br>
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
// import lsListGrantVue from '../ls/lsListGrant.vue'
export default {
  name: "zdpcCheck",
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
      labelPosition: 'left',
      jisuan: {
        familyNum: '',
        familyZC: '',
        familyZB: '',
        familyFD: '',
        familyAmt: '',
        familyZzc: '',
        familyChildrens: '',
      },
      jisuanShow: false,
      kxsjz: ["儿童救助", "临时救助家庭", "特困人员供养", "支出性贫困家庭", "低收入家庭", "低保边缘家庭", "最低生活保障-按人保", "最低生活保障-按户保", "重病-单人保家庭", "重残-单人保家庭"],
      jsjg: [],
      jsjgString: "",
      jsjgshow1: false,
      jsjgshow2: true,
      // 月均可支配收入常数
      incomeConstant: (39701 / 12),
      // jzsq:[],
      test: {
        xzqhArray: []
      },
      xzqhArray: [],
      isFinish: false,
      // el-cascader懒加载
      // 行政区选项
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
            // console.log(res)
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
      dibaoForm: {

      },
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
      // 材料上传图片存储数组
      uploadImg: {
        ab_ex73_img: [],
        ab_ex10_img: [],
        ab_ex16_img: [],
        ab_ex74_img: [],
        ab_ex166_img: [],//房屋整体图片
        ab_ex167_img: [],//房屋室内图片
        ab_ex177_img: [],//纸质授权书
      },

      uploadId: '',
      imgIndex: {
        ab_ex166: 0,
        ab_ex167: 0,
        ab_ex10: 0,
        ab_ex73: 0,
        ab_ex16: 0,
        ab_ex74: 0,
        ab_ex177: 0,
      },
      // 必填项未填警告弹框
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
        ab_ex11: [{
          required: true,
          message: '家庭住址不能为空',
          trigger: 'blur'
        }],
        ab_ex4: [{
          required: true,
          message: '户籍地址不能为空',
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
        abi_ex1: "",
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
      familyData1: [],
      checkedFamilyData1: [],
      familyData2: [],
      checkedFamilyData2: [],
      familyData3: [],
      checkedFamilyData3: [],
      familyData4: [],
      checkedFamilyData4: [],
      estate1: [{
        // abe_ex1: '',
        // abe_ex2: '',
        // abe_ex3: '',
        // abe_ex4: '',
        // abe_ex7: '车船',
        // abe_ex8: '',
      }],
      checkedEstate1: [],
      estate2: [{
        // abe_ex1: '',
        // abe_ex2: '',
        // abe_ex4: '',
        // abe_ex5: '',
        // abe_ex6: '',
        // abe_ex7: '房屋',
        // abe_ex11: '',
      }],
      checkedEstate2: [],
      common: [],
      ab_ex46: [], //求助原因
      work: "",  //劳动年龄
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
      leaveSave: false,
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
  methods: {
    // changeAmt(index,row,id)
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
    // 打开政策计算器卡片
    calculations () {
      console.log("显示卡片");
      this.jisuanShow = true;
      this.changeAmt();
      this.jsjgString = this.jsjg.join("，")
      console.log(this.jsjgString);
    },
    // 关闭政策计算器卡片
    closeCalculations () {
      console.log("关闭卡片");
      console.log(this.jsjg);
      // 清空卡片内所有数据
      this.jisuan.familyNum = '';
      this.jisuan.familyZC = '';
      this.jisuan.familyZB = '';
      this.jisuan.familyFD = '';
      this.jisuan.familyAmt = '';
      this.jisuan.familyZzc = '';
      this.jisuan.familyChildrens = '';
      this.jsjg = [];
      this.jsjgString = "";
      this.jisuanShow = false;
    },
    // 计算器数据清零--重置按钮
    clearJS () {
      this.jisuan.familyNum = '0';
      this.jisuan.familyZC = '0';
      this.jisuan.familyZB = '0';
      this.jisuan.familyFD = '0';
      this.jisuan.familyAmt = '0.00';
      this.jisuan.familyZzc = '0.00';
      this.jisuan.familyChildrens = '0';

    },
    // 修改计算数据
    changeJS () {
      var jsjg = [];
      // 困境儿童需要家庭成员年龄<18岁，在每本函数中无法进行困境儿童操作
      if (this.jisuan.familyChildrens > 0) {
        jsjg.push(this.kxsjz[0]); //家庭人口=1，没有赡抚养人(不管有没有重残重病)---特困
        console.log(jsjg, "儿童救助");
      }
      // 如果总收入>740 this.jisuan.familyAmt>0 &&
      if (this.jisuan.familyAmt / 12 < 740) {
        console.log("小于740", this.jisuan.familyNum >= 1, Number(this.jisuan.familyFD) >= 1);
        if (this.jisuan.familyNum == 1 && this.jisuan.familyFD < 1) {
          jsjg.push(this.kxsjz[2]); //家庭人口=1，没有赡抚养人(不管有没有重残重病)---特困
          console.log(jsjg, "特困");
        } else if (this.jisuan.familyNum > 1 || (this.jisuan.familyFD >= 1)) {
          jsjg.push(this.kxsjz[7]); //有赡抚养人(非共同生活>=1)或共同生活>1(有或没有重残重病)---按户保
          console.log(jsjg, this.jisuan, "按户保");

        } else if (Number(this.jisuan.familyNum) >= 1 && (Number(this.jisuan.familyFD) >= 1)) {
          jsjg.push(this.kxsjz[7]); //有赡抚养人(非共同生活>=1)且共同生活=1(有或没有重残重病)---按户保
          console.log(jsjg, this.jisuan, "按户保");
        }
      }
      //  if 家庭人口>0 && 如果 740<月人均<740*2
      if (this.jisuan.familyNum > 0 && this.jisuan.familyAmt / 12 / this.jisuan.familyNum >= 740 && this.jisuan.familyAmt / 12 / this.jisuan.familyNum < (740 * 2)) {

        if (this.jisuan.familyAmt / 12 / this.jisuan.familyNum < (740 * 1.5)) {	//如果 740<月人均<740*1.5

          if (this.jisuan.familyZB > 0 && this.jisuan.familyZC > 0) { 		//如果重病或重残-按人保+低收入
            jsjg.push(this.kxsjz[4]);
            jsjg.push(this.kxsjz[5]);
            jsjg.push(this.kxsjz[8]);
            jsjg.push(this.kxsjz[9]);
            console.log(jsjg, "重病/重残-按人保+低保边缘+低收入");
          } else if (this.jisuan.familyZB > 0 && this.jisuan.familyZC == 0) { 		//如果重病-按人保+低收入
            jsjg.push(this.kxsjz[4]);
            jsjg.push(this.kxsjz[5]);
            jsjg.push(this.kxsjz[8]);
            console.log(jsjg, "重病-按人保+低保边缘+低收入");
          } else if (this.jisuan.familyZB == 0 && this.jisuan.familyZC > 0) { 		//如果重残-按人保+低收入
            jsjg.push(this.kxsjz[4]);
            jsjg.push(this.kxsjz[5]);
            jsjg.push(this.kxsjz[9]);
            console.log(jsjg, "重残-按人保+低保边缘+低收入");
          } else {														//否则//低保边缘+低收入-----低收入包含低保边缘
            jsjg.push(this.kxsjz[4]);
            jsjg.push(this.kxsjz[5]);
            console.log(jsjg, "低保边缘+低收入");
          }
        }
        if (this.jisuan.familyAmt / 12 / this.jisuan.familyNum >= (740 * 1.5)) {  //如果 740*1.5<=月人均<740*2
          if (this.jisuan.familyZB > 0 && this.jisuan.familyZC > 0) { 		//如果重病或重残-按人保+低收入
            jsjg.push(this.kxsjz[4]);
            jsjg.push(this.kxsjz[8]);
            jsjg.push(this.kxsjz[9]);
            console.log(jsjg, "重病或重残-按人保+低收入");
          } else if (this.jisuan.familyZB > 0 && this.jisuan.familyZC == 0) { 		//如果重病-按人保+低收入
            jsjg.push(this.kxsjz[4]);
            jsjg.push(this.kxsjz[8]);
            console.log(jsjg, "病-按人保+低收入");
          } else if (this.jisuan.familyZB == 0 && this.jisuan.familyZC > 0) { 		//如果重残-按人保+低收入
            jsjg.push(this.kxsjz[4]);
            jsjg.push(this.kxsjz[9]);
            console.log(jsjg, "重残-按人保+低收入");
          } else {
            jsjg.push(this.kxsjz[4]);
            console.log(jsjg, "低收入");
          }
        }
        // if 家庭人口>1
        if (this.jisuan.familyNum > 1 && this.jisuan.familyAmt > 0) {//1.5标准<月人均<月人均可支配常数 && 可支配月人均<标准--支出

          //支出判别公式 ZC = (1.5i ≤ h < G/12) & ((h - (X/12/H)) < i)
          var h = this.jisuan.familyAmt / 12 / this.jisuan.familyNum;
          var condition1 = ((740 * 1.5) < h && h < this.incomeConstant) ? true : false;
          var condition2 = (h - this.jisuan.familyZzc / 12 / this.jisuan.familyNum < 740) ? true : false;
          console.log("条件1" + condition1, "条件2" + condition2);

          if (condition1 && condition2) {
            jsjg.push(this.kxsjz[3]); //支出
            console.log(jsjg, "支出");
          }
          console.log("this.jisuan.familyZB" + this.jisuan.familyZB, "this.jisuan.familyZC" + this.jisuan.familyZC, "this.jisuan.familyAmt" + this.jisuan.familyAmt);
        }
      }

      if (jsjg.length > 0) {
        jsjg.splice(1, 0, this.kxsjz[1]) //临时救助
        this.jsjgshow1 = true;
        this.jsjgshow2 = false;
      } else {
        this.jsjgshow1 = false;
        this.jsjgshow2 = true;
      }
      this.jsjgString = jsjg.join("，")

      console.log(this.jsjgString);
      console.log(jsjg);
      return jsjg;

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

      // 顺序跟上面显示顺序要相反
      let clientHeight = document.querySelector('.info2').clientHeight
      let recordtClientHeight = document.querySelector('#recordt').scrollHeight
      if (!oDiv1 || !oDiv2 || !oDiv3 || !oDiv4 || !oDiv5 || !oDiv6 || !oDiv7 || !oDiv8 || !oDiv9 || !oDiv10 || !oDiv11 || !oDiv12) {
        return ''
      }
      if (recordtClientHeight + oDiv7.clientHeight < clientHeight && scrollTop > (oDiv7.offsetTop - oDiv1.offsetTop - clientHeight + recordtClientHeight + oDiv7.clientHeight)) {
        // console.log('触发了7-1')
        this.isShow(7)
      } else if (scrollTop > (oDiv7.offsetTop - oDiv1.offsetTop)) {
        // console.log('触发了7-2')
        this.isShow(7)
      } else if (scrollTop > (oDiv12.offsetTop - oDiv1.offsetTop)) {
        // console.log('触发了12')
        this.isShow(12)
      } else if (scrollTop > (oDiv11.offsetTop - oDiv1.offsetTop)) {
        // console.log('触发了11')
        this.isShow(11)
      } else if (scrollTop > (oDiv10.offsetTop - oDiv1.offsetTop)) {
        // console.log('触发了10')
        this.isShow(10)
      } else if (scrollTop > (oDiv6.offsetTop - oDiv1.offsetTop)) {
        // console.log('触发了6')
        this.isShow(6)
      } else if (scrollTop > (oDiv9.offsetTop - oDiv1.offsetTop)) {
        // console.log('触发了9')
        this.isShow(9)
      } else if (scrollTop > (oDiv5.offsetTop - oDiv1.offsetTop)) {
        // console.log('触发了5')
        this.isShow(5)
      } else if (scrollTop > (oDiv8.offsetTop - oDiv1.offsetTop)) {
        // console.log('触发了8')
        this.isShow(8)
      } else if (scrollTop > (oDiv4.offsetTop - oDiv1.offsetTop)) {
        // console.log('触发了4')
        this.isShow(4)
      } else if (scrollTop > (oDiv3.offsetTop - oDiv1.offsetTop)) {
        // console.log('触发了3')
        this.isShow(3)
      } else if (scrollTop > (oDiv2.offsetTop - oDiv1.offsetTop)) {
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
    loadData () {// 进入页面加载数据
      this.isFinish = false;
      this.getBasic({
        sId: this.$route.query.sId,
        type: "低保",
        company: "泰州市姜堰区社会救助综合平台"
      }).then(res => {
        console.log(res, "this.getBasic====res")
        this.dibaoForm = res[0].data[0]
        this.common = res[0].common;
        this.uploadImg.ab_ex73_img = res[0].data[0].ab_ex73.split(",");
        this.uploadImg.ab_ex10_img = res[0].data[0].ab_ex10.split(",");
        this.uploadImg.ab_ex16_img = res[0].data[0].ab_ex16.split(",");
        this.uploadImg.ab_ex74_img = res[0].data[0].ab_ex74.split(",");
        this.uploadImg.ab_ex166_img = res[0].data[0].ab_ex166.split(",");//居住外
        this.uploadImg.ab_ex167_img = res[0].data[0].ab_ex167.split(",");//居住内
        this.uploadImg.ab_ex177_img = res[0].data[0].ab_ex177.split(",");//纸质授权书
        let xzqhArray = this.dibaoForm.ab_ex162.split(",");
        if (xzqhArray.length == 3) {
          this.$set(this.xzqhArray, 0, xzqhArray[0]);
          this.$set(this.xzqhArray, 1, xzqhArray[1]);
          this.$set(this.xzqhArray, 2, xzqhArray[2]);
          this.$set(this.test, "xzqhArray", xzqhArray);
        }
        this.isFinish = true;
      }).catch(res => {
        if (typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200) {
          console.log('请求失败了-----------------------')
          this.$message.error('数据获取失败或请求超时11111')
          this.$emit("closes", false)
          this.$router.go(-1)
          return false
        }
        console.log(res.response.data[0].data[0], "-----------dibaoFrom")
        this.dibaoForm = res.response.data[0].data[0]
        this.common = res.response.data[0].common;
        this.uploadImg.ab_ex10_img = res.response.data[0].data[0].ab_ex10.split(",");
        this.uploadImg.ab_ex16_img = res.response.data[0].data[0].ab_ex16.split(",");
        this.uploadImg.ab_ex73_img = res.response.data[0].data[0].ab_ex73.split(",");
        this.uploadImg.ab_ex74_img = res.response.data[0].data[0].ab_ex74.split(",");
        this.uploadImg.ab_ex166_img = res.response.data[0].data[0].ab_ex166.split(",");
        this.uploadImg.ab_ex167_img = res.response.data[0].data[0].ab_ex167.split(",");
        this.uploadImg.ab_ex177_img = res.response.data[0].data[0].ab_ex177.split(",");
        // console.log(res.response.data[0].data[0].ab_ex46,"this.ab_ex46--------求助原因")
        if (res.response.data[0].data[0].ab_ex46 != "") {
          this.ab_ex46 = res.response.data[0].data[0].ab_ex46.split(",");
        } else {
          this.ab_ex46 = [];//消除数组ab_ex46求助原因中的空元素
        }
        let xzqhArray = this.dibaoForm.ab_ex162.split(",");

        if (xzqhArray.length == 3) {
          // this.xzqhArray=[]
          this.$set(this.xzqhArray, 0, xzqhArray[0]);
          this.$set(this.xzqhArray, 1, xzqhArray[1]);
          this.$set(this.xzqhArray, 2, xzqhArray[2]);
          this.$set(this.test, "xzqhArray", xzqhArray);
          // this.$forceUpdate()
        } else {
          this.xzqhArray = []
        }
        this.isFinish = true;
        console.log(this.xzqhArray)

        // 预警信息
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

          for (var i in res.response.data[0].data) {
            // console.log(res.response.data[0].data[i].aw_dat1,"预警时间-------------"+i);
            if (res.response.data[0].data[i].aw_dat1 == "1900-01-01 00:00:00.0") {
              res.response.data[0].data[i].aw_dat1 = ""
            }
          }
          this.waringData = res.response.data[0].data;
        })

      })

      // 成员信息
      this.loadFamily({
        sId: this.$route.query.sId,
      }).then(res => {
        console.log(res)
        this.familyData1 = res[0].data
      }).catch(res => {
        if (typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200) {
          console.log('请求失败了-----------------------3')
          this.$message.error('数据获取失败或请求超时3333')
          this.$emit("closes", false)
          this.$router.go(-1)
          return false;
        }
        console.log(res.response.data[0].data, "共同生活")
        for (let i in res.response.data[0].data) {
          if (res.response.data[0].data[i].abm_ex6 == 'Y') {
            this.familyData1.push(res.response.data[0].data[i]) //共同生活
          } else if (res.response.data[0].data[i].abm_ex6 == 'N') {
            this.familyData2.push(res.response.data[0].data[i]) //非共同生活
          } else if (res.response.data[0].data[i].abm_ex6 == 'B') {
            this.familyData3.push(res.response.data[0].data[i]) //非共同生活赡抚养人信息
          } else if (res.response.data[0].data[i].abm_ex6 == 'C') {
            this.familyData4.push(res.response.data[0].data[i]) //村干部、近亲属信息
          }
        }
        var jk = 1;
        for (let i in this.familyData1) {
          this.changeCard(i)
          if (this.familyData1[i].abm_ex11 == '重病') {
            jk *= 2;

          } else if (this.familyData1[i].abm_ex11 == '残疾') {
            jk *= 3

          }
          if (jk % 6 == 0) {
            this.jkShow1 = false;
            this.jkShow2 = false;

          } else if (jk % 2 == 0) {
            this.familyData1[i].abm_ex39 = '';
            this.familyData1[i].abm_ex40 = '';
            this.jkShow1 = false;
            this.jkShow2 = true;
          } else if (jk % 3 == 0) {
            this.familyData1[i].abm_ex52 = '';
            this.jkShow1 = true;
            this.jkShow2 = false;
          }
        }

        // 收入
        this.getBasicIncome({
          sId: this.$route.query.sId,
        }).then(res => {
          console.log(res)
          this.income = res[0].data
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
              // console.log(res.response.data[0].data[i][j]);

            }
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
        })

        // 刚性支出
        this.loadPay({
          sId: this.$route.query.sId,
        }).then(res => {
          if (res[0].data.length > 0) {
            this.pay = res[0].data3
            console.log(this.pay, "---------pay111")
          }
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
            this.pay = res.response.data[0].data3[0]

          }
          if (this.familyData1.length < 2) {
            console.log("length==0")
            this.pay.abp_ex10 = Number(this.pay.abp_ex9 / 1).toFixed(2);
            // this.dibaoForm.ab_ex94_=(this.pay.ab_ex94 / this.familyData1.length).toFixed(2)
          } else {
            console.log("lengt>0")
            this.pay.abp_ex10 = Number(this.pay.abp_ex9 / this.familyData1.length).toFixed(2);
          }

          console.log(res.response.data[0], "---------pay")
        })
      })





      // 家庭财产
      this.loadEstate({
        sId: this.$route.query.sId,
        // abe_ex7:"房屋"
      }).then(res => {
        this.estate1 = res[0].data
        this.estate2 = res[0].data2
      }).catch(res => {
        if (typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200) {
          console.log('请求失败了-----------------------6')
          this.$message.error('数据获取失败或请求超时666')
          this.$emit("closes", false)
          this.$router.go(-1)
          return false
        }
        console.log(res)
        let estate1 = [];
        let estate2 = [];
        for (let i in res.response.data[0].data) {
          if (res.response.data[0].data[i].abe_ex7 == '车船') {
            estate1.push(res.response.data[0].data[i])
          } else {
            estate2.push(res.response.data[0].data[i])
          }
        }
        if (estate1.length > 0 || estate2.length > 0) {
          this.estate1 = estate1;
          this.estate2 = estate2;
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
    // 获取FamilyData3被选中的
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

      // 共同生活
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
          abm_ex49: '',
          age: '',
          work: ''
          // abm_ex42: ''
        };
        this.familyData1.push(obj);
      }
      // 非共同生活
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
          // abm_ex28: ''
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
                this.$message.warning("请先完善非共同生活抚养人信息....");
              }
            }
          })

        } else {
          console.log("提示添加非共同生活抚养人");
          this.$message.warning("请先添加非共同生活抚养人信息");
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
      // 房产信息
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

      // 重新计算收入支出
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
    // 预警
    changeAmt2 () {
      for (var i = 0; i < 3; i++) {
        var index = Number(i) + 1;
        // console.log(this.waringData[i].aw_dat1,'预警时间')
        if (this.waringData[i].aw_ex1 != "" && (this.waringData[i].aw_dat1 == "" || this.waringData[i].aw_dat1 == null)) {
          this.waringData[i].aw_dat1 = this.getTimeFn();
        }

        console.log(this.waringData[0].aw_dat1, '预警时间')
        // 预警提示
        if (this.waringData[i].aw_ex1 == "" && (this.waringData[i].aw_dat1 == null || this.waringData[i].aw_dat1 == "")) {
          continue;
        } else if (this.waringData[i].aw_ex1 != "" && (this.waringData[i].aw_dat1 == null || this.waringData[i].aw_dat1 == "")) {
          this.$message.warning("请选择预警" + index + "的时间");
          return false;
        } else if (this.waringData[i].aw_ex1 == "" && (this.waringData[i].aw_dat1 != null || this.waringData[i].aw_dat1 != "")) {
          this.$message.warning("请将预警" + index + "的内容补充完整");
          return false;
        }

      }
    },

    //设置默认时间--预警时间默认为选择当天的第十天
    getTimeFn () {
      let dates = new Date()
      let y = dates.getFullYear()
      let m = dates.getMonth() + 1
      let d = dates.getDate()
      // let d = dates.getDate()+10
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
      // let time = y + '-' + m + d  //如果是后推10天，月份后面不用‘-’，如果是当前时间，月份后面需要加‘-’
      let time = y + '-' + m + '-' + d
      console.log(time)
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
    // keyVerification2(index,row,id)
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
      // var ab_ex41 = this.dibaoForm.ab_ex41;//低保类型字段
      this.dibaoForm.ab_ex46 = this.ab_ex46.toString();//求助原因字段

      //shift+F12快速查找所有引用

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

      var illness = 0;   //重病
      var disability = 0;  //殘疾
      var children = 0;   //未成年
      if (this.familyData1.length > 0) {
        for (let j = 0; j < this.familyData1.length; j++) {
          if (this.familyData1[j].abm_ex11 == "殘疾") {
            illness++;
          }
          if (this.familyData1[j].abm_ex11 == "重病") {
            disability++;
          }
          if (this.familyData1[j].age < 18) {
            children++;
          }
        }
        this.income7[2].abi_ex2 = (amt / 12 / this.familyData1.length).toFixed(2); //月人均
        this.jisuan.familyNum = (this.familyData1.length)  //总人口
        this.jisuan.familyZB = illness;  //重病
        this.jisuan.familyZC = disability;  //重残
        this.familyChildrens = children;  //儿童
      } else {
        this.income7[2].abi_ex2 = (amt / 12 / 1).toFixed(2);
        this.jisuan.familyZB = illness;  //重病
        this.jisuan.familyZC = disability;	//重残
        this.jisuan.familyNum = 0;     //总人口
        this.familyChildrens = 0;      //儿童
      }

      if (this.familyData2.length > 0) {
        this.jisuan.familyFD = (this.familyData2.length)  //法定
      } else {
        this.jisuan.familyFD = 0;
      }

      //12个月支出计算
      var abp_ex4 = Number(this.pay.abp_ex4);
      var abp_ex5 = Number(this.pay.abp_ex5);
      var abp_ex6 = Number(this.pay.abp_ex6);
      var abp_ex7 = Number(this.pay.abp_ex7);
      var abp_ex11 = Number(this.pay.abp_ex11);
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
      } if (Number.isNaN(abp_ex11)) {
        abp_ex11 = 0;
      }


      var zzc = abp_ex4 != "" || abp_ex5 != "" || abp_ex6 != "" || abp_ex7 != "" || abp_ex11 != "" ? abp_ex4 + abp_ex5 + abp_ex6 + abp_ex7 + abp_ex11 : this.pay.abp_ex8;

      // 初次加载支出无数据zzc会为空，点击计算时会出错，这里给个判断是否为空，为空赋值
      if (zzc == null || zzc == "" || zzc == undefined) {
        zzc = 0.00;
      }
      // console.log(zzc);

      // abp_ex8总支出
      this.pay.abp_ex8 = (zzc).toFixed(2);
      // abp_ex9扣减刚性支出后年收入
      this.pay.abp_ex9 = (amt - zzc).toFixed(2);

      // 收入支出计算
      if (this.familyData1.length == 0) {
        console.log("length==0")
        this.jisuan.familyAmt = 0.00  //总收入
        this.jisuan.familyZzc = 0.00	//总支出
        this.pay.abp_ex10 = Number(this.pay.abp_ex9 / 1).toFixed(2);
        this.income7[2].abi_ex2 = Number(amt / 12 / 1).toFixed(2); //月人均

      } else {
        console.log("lengt>0")
        this.jisuan.familyAmt = amt.toFixed(2)  //总收入
        this.jisuan.familyZzc = Number(zzc).toFixed(2)	//总支出
        this.pay.abp_ex10 = Number(this.pay.abp_ex9 / this.familyData1.length).toFixed(2);
        this.income7[2].abi_ex2 = Number(amt / 12 / this.familyData1.length).toFixed(2); //月人均
        // this.ab_ex94_ = Number(this.dibaoForm.ab_ex94/this.familyData1.length).toFixed(2);
      }
      // 1234
      if (children > 0) {
        this.jsjg.push(this.kxsjz[0]); //困境儿童
      }

      this.jsjg = this.changeJS();


      console.log(this.jsjg);
      if (this.jsjg.length > 0) {
        // this.jsjg.splice(1,0,this.kxsjz[1]) //临时救助
        console.log(222);
        this.jsjgshow1 = true;
        this.jsjgshow2 = false;
      } else {
        console.log(222);
        this.jsjgshow1 = false;
        this.jsjgshow2 = true;
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
    closeView () {
      this.$emit("closes", false)
      this.$router.go(-1)
    },
    // 上传图片
    uploads (id) {
      // 过滤身份证照片
      //this.dibaoForm.ab_ex10.split(",")--(result)  是有空值的数组
      //r是处理好的数组
      var r = this.dibaoForm.ab_ex10.split(",").filter(function (s) {
        return s && s.trim();
      });
      this.dibaoForm.ab_ex10 = r.toString();

      this.dialogVisible3 = true;
      this.uploadId = id;
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

    save () {
      // 信息提示的判断条件
      let doms = document.getElementsByClassName('el-message')[0]
      console.log(document.getElementsByClassName('el-message')[0], 'el-message');

      console.log(this.uploadImg.ab_ex10_img);
      if (!this.uploadImg.ab_ex10_img) {
        console.log(this.uploadImg.ab_ex10_img + "没有身份证照片");
        isSave = false;
        return false;
      } else {
        console.log("有身份证照片");
      }

      // 基础信息填写验证
      this.$refs['dibaoForm'].validate((valid) => {
        if (valid) {
          //alert('submit!');
        } else {
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

      // 验证预警信息
      let waringData_ = [];
      for (var i = 0; i < 3; i++) {
        var index = Number(i) + 1;
        if (this.waringData[i].aw_ex1 == "" && (this.waringData[i].aw_dat1 == null || this.waringData[i].aw_dat1 == "")) {
          continue;
        } else if (this.waringData[i].aw_ex1 != "" && (this.waringData[i].aw_dat1 == null || this.waringData[i].aw_dat1 == "")) {
          this.$message.warning("请选择预警" + index + "的时间");
          return false;
        } else if (this.waringData[i].aw_ex1 == "" && (this.waringData[i].aw_dat1 != null || this.waringData[i].aw_dat1 != "")) {
          this.$message.warning("请将预警" + index + "的内容补充完整");
          return false;
        } else {
          waringData_.push(this.waringData[i]);
        }
      }

      // 验证户主身份证格式
      if (this.dibaoForm.ab_ex7) {
        let msg = this.isCardID(this.dibaoForm.ab_ex7);
        if (msg) {
          this.$message.warning("户主" + msg);
          return false
        }
      }

      let isSave = true;
      // 验证共同生活成员信息
      if (this.familyData1.length != this.dibaoForm.ab_ex5 && doms == undefined) {
        console.log(123);
        this.$message.warning("家庭人口数与实际填报共同生活成员数不符，请重新填报");
        isSave = false;
        return false;
      } else if (this.familyData1.length > 0) {
        // 共同家庭成员没填全保存不了
        let huzhu = 0;
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
          let abm_ex49 = this.familyData1[i].abm_ex49;
          let abm_ex14 = this.familyData1[i].abm_ex14;

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
            } else if (!abm_ex11) {
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

            if (this.familyData1[i].abm_ex1 == "户主") {
              huzhu++;
            }
          }
        }
        console.log(huzhu);

        if (huzhu != 1) {
          this.$message.warning("共同生活家庭成员必须有一位户主");
          isSave = false;
          return false;
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
          }
          else if (!abm_ex1) {
            this.$message.warning("请选择第" + (index) + "行非共同生活赡扶抚养人与申请人的关系");
            isSave = false;
            return false;
          }
          else if (!abm_ex2 || abm_ex2) {
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
            this.$message.warning("请填写第" + (index) + "行非共同生活赡扶抚养人劳动能力");
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

      // debugger
      /// 收入数据保存过滤 : 遍历收入，如果计入收入名称、金额为空，则去除该行数据,否则进行数据验证
      // 1.工资、
      if (this.income1.length > 0) {
        for (let i = 0; this.income1.length > i; i++) {
          let abi_ex1 = this.income1[i].abi_ex1;
          let abi_ex2 = this.income1[i].abi_ex2;
          if (!abi_ex1 && !abi_ex2) {
            this.income1.splice(i, 1);
            --i;
            console.log(this.income1);
          }
          // else if(!abi_ex1 && abi_ex2){
          // 	this.$message.warning("请将第"+(i+1)+"行工资性收入计入收入名称补充完整");
          // 	return false;
          // }else if(abi_ex1 && !abi_ex2){
          // 	this.$message.warning("请将第"+(i+1)+"行工资性收入金额补充完整");
          // 	return false;
          // }
        }
      }
      if (this.income2.length > 0) {
        for (let i = 0; this.income2.length > i; i++) {
          let abi_ex1 = this.income2[i].abi_ex1;
          let abi_ex2 = this.income2[i].abi_ex2;
          if (!abi_ex1 && !abi_ex2) {
            this.income2.splice(i, 1);
            --i;
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
          }
          // else if(!abi_ex1 && abi_ex2){
          // 	this.$message.warning("请将第"+(i+1)+"行财产净收入计入收入名称补充完整");
          // 	return false;
          // }else if(abi_ex1 && !abi_ex2){
          // 	this.$message.warning("请将第"+(i+1)+"行财产净收入金额补充完整");
          // 	return false;
          // }
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
          }
          // else if(!abi_ex1 && abi_ex2){
          // 	this.$message.warning("请将第"+(i+1)+"行转移净收入入收入名称补充完整");
          // 	return false;
          // }else if(abi_ex1 && !abi_ex2){
          // 	this.$message.warning("请将第"+(i+1)+"行转移净收入金额补充完整");
          // 	return false;
          // }
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
          if (!abe_ex1 && doms == undefined) {
            this.$message.warning("请填写第" + (index) + "行车（船）主姓名");
            isSave = false;
            return false;

          } else if (!abe_ex2 && doms == undefined) {
            this.$message.warning("请填写第" + (index) + "行车（船）购买时间");
            isSave = false;
            return false;

          } else if (!abe_ex3 && doms == undefined) {
            this.$message.warning("请填写第" + (index) + "行车（船）用途");
            isSave = false;
            return false;

          } else if (!abe_ex8 && doms == undefined) {
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
        if (!abe_ex1 && !abe_ex2 && !abe_ex4 && !abe_ex5 && !abe_ex6 && !abe_ex11) {//数据都为空，不进行操作
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

      // for(let i in this.uploadImg){
      // 	if(this.uploadImg.ab_ex166_img[0]=''){
      // 		this.uploadImg.ab_ex166_img=[]
      // 	}
      // }

      //过滤家庭财产空数据 
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

      //单独存放总收入--保存时发送给后台
      var income7 = [];
      income7.push(this.income7[0]);

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
      this.leaveSave = isSave;
      // 是否核对--B-已完成线下核查
      this.dibaoForm.ab_ex120 = 'B';
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
      // console.log(this.pay,"save  pay")
      console.log(this.familyData1.ab_ex120, "this.familyData1.ab_ex120")
      this.saveBasic({
        "data": '[' + JSON.stringify(this.dibaoForm) + ']',
        "member": JSON.stringify(this.familyData1.concat(this.familyData2).concat(this.familyData3).concat(this.familyData4)),
        "pay": '[' + JSON.stringify(this.pay) + ']',
        "income": JSON.stringify(this.income1.concat(this.income2).concat(this.income3).concat(this.income4).concat(this.income5).concat(this.income6).concat(income7)),
        "waring": JSON.stringify(waringData_),
        "estate": JSON.stringify(this.estate1.concat(this.estate2)),

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
        // console.log(res.response.data)
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

    getBasic (data) {
      return request({
        // headers: {
        // 	'Accept': 'application/json',
        // },
        url: "/social/assistance/getBasic",
        method: 'post',
        data: data
      })
    },
    loadWaring (data) {
      return request({
        // headers: {
        // 	accept: 'application/json',
        // }
        method: 'post',
        url: '/social/assistance/getBasicWaring4',
        data: data
      })
    },
    loadFamily (data) {
      return request({
        // headers: {
        // 	accept: 'application/json',
        // }
        method: 'post',
        url: '/social/assistance/getBasicFamily',
        data: data
      })
    },
    getBasicIncome (data) {
      return request({
        url: "/social/assistance/getBasicIncome",
        method: 'post',
        data: data
      })
    },
    loadPay (data) {
      return request({
        method: 'post',
        url: '/social/assistance/getBasicPay',
        data: data,
      })
    },
    loadEstate (data) {
      return request({
        method: 'post',
        url: '/social/assistance/getBasicEstate',
        data: data
      })
    },
    saveBasic (data) {
      return request({
        method: 'post',
        url: '/social/assistance/saveBasic',
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
      console.log(age)
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
      // console.log( sBirthday,"=====",d)
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
              console.log(1111);
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
/* 政策计算卡片样式 */
.calculations {
  /* display:none ; */
  width: 50vw;
  height: auto;
  display: block;
  position: fixed;
  top: 20vh;
  left: 25vw;
  z-index: 1000;
}
/* 政策计算卡片灰色背景版 */
.mengBan {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.685);
  z-index: 999;
}
.jsjg {
  animation-delay: 2s;
  -webkit-animation-delay: 2s;
}
/* 	.my-table .el-input .el-input__inner{
		border: none !important;
	} */
.my-table >>> .el-input__inner {
  border: 0;
}
.srname >>> .el-input__inner {
  text-align: center;
}
</style>
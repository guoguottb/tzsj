<template>
  <div class="g-box">
    <div class="g-box2">
      <div class="info2">
        <el-form v-if="isOk"
                 ref="dibaoForm"
                 :inline-message="true"
                 :model="dibaoForm"
                 label-width="auto"
                 style='padding-right: 10px;'
                 @submit.native.prevent>
          <h3 id="page1"
              class="line_blue">&emsp;儿童基本情况</h3>
          <div class="lineSt"></div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="收养状态"
                            prop="basicInfo.adoptedType">
                <el-select v-model="dibaoForm.basicInfo.adoptedType"
                           placeholder="请选择收养状态"
                           style="width:100%">
                  <el-option :value="0"
                             label="无需收养"></el-option>
                  <el-option :value="1"
                             label="未被收养"></el-option>
                  <el-option :value="2"
                             label="已被收养"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否患有艾滋病"
                            prop="basicInfo.sufferingFromAids">
                <el-select v-model="dibaoForm.basicInfo.sufferingFromAids"
                           style="width:100%;">
                  <el-option :value="true"
                             label="是"></el-option>
                  <el-option :value="false"
                             label="否"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="姓名"
                            prop="basicInfo.name">
                <el-input v-model="dibaoForm.basicInfo.name"
                          placeholder="请输入儿童姓名"></el-input>
              </el-form-item>

            </el-col>
            <el-col :span="12">
              <el-form-item label="身份证号"
                            prop="basicInfo.idCard">
                <el-input v-model="dibaoForm.basicInfo.idCard"
                          placeholder="请输入身份证号"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="性别"
                            prop="basicInfo.gender">
                <el-input v-model="dibaoForm.basicInfo.gender"
                          disabled
                          style="width:100%;">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="出生日期"
                            prop="basicInfo.birth">
                <el-input v-model="dibaoForm.basicInfo.birth"
                          disabled
                          style="width:100%;">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="民族"
                            prop="basicInfo.nation">
                <el-select v-model="dibaoForm.basicInfo.nation"
                           style="width:100%;">
                  <el-option v-for="(item,index) in nation"
                             :key="index"
                             :label="item"
                             :value="item"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="行政区域"
                            prop="basicInfo.divisionCode">
                <el-cascader v-model="xzqhArray"
                             :props="props"
                             placeholder="请选择"
                             style="width:100%;"></el-cascader>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="户籍类型"
                            prop="basicInfo.censusRegisterType">
                <el-select v-model="dibaoForm.basicInfo.censusRegisterType"
                           style="width:100%;">
                  <el-option label="农村社区"
                             value="农村社区"></el-option>
                  <el-option label="城市社区"
                             value="城市社区"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="户籍地址"
                            prop="basicInfo.censusRegisterAddress">
                <el-input v-model="dibaoForm.basicInfo.censusRegisterAddress"
                          placeholder="请输入户籍地址"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="开户人"
                            prop="basicInfo.bankAccountName">
                <el-input v-model="dibaoForm.basicInfo.bankAccountName"
                          placeholder="请输入开户人"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="开户行"
                            prop="basicInfo.bankName">
                <el-input v-model="dibaoForm.basicInfo.bankName"
                          placeholder="请输入开户行"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="开户卡号"
                            prop="basicInfo.bankCardId">
                <el-input v-model="dibaoForm.basicInfo.bankCardId"
                          placeholder="请输入开户卡号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="居住地址"
                            prop="basicInfo.residentialAddress">
                <el-input v-model="dibaoForm.basicInfo.residentialAddress"
                          placeholder="请输入居住地址"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="行为能力"
                            prop="basicInfo.haveFullCapacity">
                <el-select v-model="dibaoForm.basicInfo.haveFullCapacity"
                           style="width:100%;">
                  <el-option :value="true"
                             label="完全行为能力"></el-option>
                  <el-option :value="false"
                             label="限制行为能力"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否在校"
                            prop="basicInfo.whetherInSchool">
                <el-select v-model="dibaoForm.basicInfo.whetherInSchool"
                           style="width:100%;">
                  <el-option :value="true"
                             label="是"></el-option>
                  <el-option :value="false"
                             label="否"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="生活状况简述"
                            prop="basicInfo.livingDesc">
                <el-input v-model="dibaoForm.basicInfo.livingDesc"
                          placeholder="请输入儿童生活状况"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="儿童主任姓名"
                            prop="basicInfo.childrenDirectorName">
                <el-input v-model="dibaoForm.basicInfo.childrenDirectorName"
                          placeholder="请输入儿童主任姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="儿童主任联系电话"
                            prop="basicInfo.childrenDirectorTel">
                <el-input v-model="dibaoForm.basicInfo.childrenDirectorTel"
                          placeholder="请输入儿童主任联系电话"
                          type="number"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <h3 id="page2"
              class="line_blue">&emsp;身体状况</h3>
          <div class="lineSt"></div>
          <el-row :gutter="20">
            <!-- 身体状况 -->
            <el-col :span="12">
              <el-form-item label="是否有劳动能力"
                            prop="basicInfo.whetherHealth">
                <el-select v-model="dibaoForm.basicInfo.whetherHealth"
                           style="width:100%;">
                  <el-option :value="true"
                             label="是"></el-option>
                  <el-option :value="false"
                             label="否"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="是否重病"
                            prop="basicInfo.whetherSeriousIllness">
                <el-select v-model="dibaoForm.basicInfo.whetherSeriousIllness"
                           style="width:100%;">
                  <el-option :value="true"
                             label="是"></el-option>
                  <el-option :value="false"
                             label="否"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item v-if="dibaoForm.basicInfo.whetherSeriousIllness"
                            label="重病类型"
                            prop="basicInfo.seriousIllnessType">
                <el-select v-model="dibaoForm.basicInfo.seriousIllnessType"
                           clearable
                           style="width:100%;">
                  <el-option label="白血病"
                             value="白血病"></el-option>
                  <el-option label="再生障碍性贫血"
                             value="再生障碍性贫血"></el-option>
                  <el-option label="血友病"
                             value="血友病"></el-option>
                  <el-option label="地中海贫血"
                             value="地中海贫血"></el-option>
                  <el-option label="先天性心脏病"
                             value="先天性心脏病"></el-option>
                  <el-option label="尿毒症"
                             value="尿毒症"></el-option>
                  <el-option label="慢性肾功能衰竭"
                             value="慢性肾功能衰竭"></el-option>
                  <el-option label="器官移植"
                             value="器官移植"></el-option>
                  <el-option label="恶性肿瘤"
                             value="恶性肿瘤"></el-option>
                  <el-option label="颅内良性肿瘤"
                             value="颅内良性肿瘤"></el-option>
                  <el-option label="上年度医保政策规定的住院和门诊治疗费用1年中自付部分超过2万元的疾病"
                             value="上年度医保政策规定的住院和门诊治疗费用1年中自付部分超过2万元的疾病"></el-option>
                  <el-option label="其他重病"
                             value="其他重病"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="是否残疾"
                            prop="basicInfo.whetherDisability">
                <el-select v-model="dibaoForm.basicInfo.whetherDisability"
                           style="width:100%;">
                  <el-option :value="true"
                             label="是"></el-option>
                  <el-option :value="false"
                             label="否"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item v-if="dibaoForm.basicInfo.whetherDisability"
                            label="残疾类型"
                            prop="basicInfo.disabilityType">
                <el-select v-model="dibaoForm.basicInfo.disabilityType"
                           clearable
                           style="width:100%;">
                  <el-option label="智力残疾"
                             value="智力残疾"></el-option>
                  <el-option label="肢体残疾"
                             value="肢体残疾"></el-option>
                  <el-option label="精神残疾"
                             value="精神残疾"></el-option>
                  <el-option label="孤独症"
                             value="孤独症"></el-option>
                  <el-option label="视力残疾"
                             value="视力残疾"></el-option>
                  <el-option label="听力残疾"
                             value="听力残疾"></el-option>
                  <el-option label="言语残疾"
                             value="言语残疾"></el-option>
                  <el-option label="多重残疾"
                             value="多重残疾"></el-option>
                  <el-option label="预防接种异常反应残疾"
                             value="预防接种异常反应残疾"></el-option>
                  <el-option label="其他"
                             value="其他"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item v-if="dibaoForm.basicInfo.whetherDisability"
                            label="残疾等级"
                            prop="basicInfo.disabilityLevel">
                <el-select v-model="dibaoForm.basicInfo.disabilityLevel"
                           clearable
                           style="width:100%;">
                  <el-option :value="1"
                             label="一级"></el-option>
                  <el-option :value="2"
                             label="二级"></el-option>
                  <el-option :value="3"
                             label="三级"></el-option>
                  <el-option :value="4"
                             label="四级"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="残疾救助方式"
                            prop="basicInfo.disabilityRescueMode">
                <el-select v-model="dibaoForm.basicInfo.disabilityRescueMode"
                           clearable
                           style="width:100%;">
                  <el-option label="无"
                             value="无"></el-option>
                  <el-option label="一户多残"
                             value="一户多残"></el-option>
                  <el-option label="依老养残"
                             value="依老养残"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="其他残疾类型情况说明"
                            prop="basicInfo.descriptionOfDisability">
                <el-input v-model="dibaoForm.basicInfo.descriptionOfDisability"
                          placeholder="请输入其他残疾类型情况说明"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- 教育状况 -->
          <h3 id="page3"
              class="line_blue">&emsp;教育情况</h3>
          <div class="lineSt"></div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="教育情况类型"
                            prop="education">
                <el-cascader v-model="education"
                             :options="options"
                             style="width:100%;"></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="参加课外辅导班"
                            prop="tutorialClass">
                <el-cascader v-model="tutorialClass"
                             :options="options2"
                             style="width:100%;"></el-cascader>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 教育情况类型选择不是未入学时显示 学校名称、年级（班级）、教师妈妈、教师妈妈联系电话 -->
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="学校名称"
                            prop="schoolName">
                <el-input v-model="dibaoForm.basicInfo.schoolName"
                          placeholder="请输入学校名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="年级（班级）"
                            prop="gradeClass">
                <el-input v-model="dibaoForm.basicInfo.gradeClass"
                          placeholder="请输入年级（班级）"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="教师妈妈"
                            prop="teacher">
                <el-input v-model="dibaoForm.basicInfo.teacher"
                          placeholder="请输入教师妈妈名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="教师妈妈联系电话"
                            prop="teacherTel">
                <el-input v-model="dibaoForm.basicInfo.teacherTel"
                          placeholder="请输入联系电话"
                          type="number"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- 相关经历 -->
          <h3 id="page4"
              class="line_blue">&emsp;相关经历</h3>
          <div class="lineSt"></div>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="遭受侵害和虐待"
                            prop="typeOfInfringed">
                <el-select v-model="typeOfInfringed"
                           multiple
                           style="width:100%"
                           @change="changeExperience($event,'whetherInfringed','infringedSketch')">
                  <el-option label="性侵害"
                             value="性侵害"></el-option>
                  <el-option label="拐卖"
                             value="拐卖"></el-option>
                  <el-option label="遗弃"
                             value="遗弃"></el-option>
                  <el-option label="虐待"
                             value="虐待"></el-option>
                  <el-option label="暴力伤害"
                             value="暴力伤害"></el-option>
                  <el-option label="其他"
                             value="其他"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="遭受侵害和虐待情况简述"
                            prop="infringedSketch">
                <el-input v-model="dibaoForm.basicInfo.infringedSketch"
                          placeholder="请输入遭受侵害和虐待情况简述"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="失足未成年人"
                            prop="typeOfJuvenileDelinquent">
                <el-select v-model="typeOfJuvenileDelinquent"
                           multiple
                           style="width:100%"
                           @change="changeExperience($event,'whetherJuvenileDelinquent','juvenileDelinquentSketch')">
                  <el-option label="追究刑事责任"
                             value="追究刑事责任"></el-option>
                  <el-option label="治安拘留"
                             value="治安拘留"></el-option>
                  <el-option label="附条件不诉"
                             value="附条件不诉"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="失足未成年人情况简述"
                            prop="juvenileDelinquentSketch">
                <el-input v-model="dibaoForm.basicInfo.juvenileDelinquentSketch"
                          placeholder="请输入失足未成年人情况简述"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="遭遇困境类型"
                            prop="typeOfEncounteringEmergencies">
                <el-select v-model="typeOfEncounteringEmergencies"
                           multiple
                           style="width:100%"
                           @change="changeExperience($event,'whetherEncounteringEmergencies','encounteringEmergenciesSketch')">
                  <el-option label="火灾"
                             value="火灾"></el-option>
                  <el-option label="爆炸"
                             value="爆炸"></el-option>
                  <el-option label="交通事故"
                             value="交通事故"></el-option>
                  <el-option label="人身伤害"
                             value="人身伤害"></el-option>
                  <el-option label="其他"
                             value="其他"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="遭遇困境情况简述"
                            prop="encounteringEmergenciesSketch">
                <el-input v-model="dibaoForm.basicInfo.encounteringEmergenciesSketch"
                          placeholder="请输入遭遇困境情况简述"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="流浪儿童类型"
                            prop="typeOfStreetChildren">
                <el-select v-model="dibaoForm.basicInfo.typeOfStreetChildren"
                           clearable
                           style="width:100%"
                           @change="changeExperience2($event,'streetChildrenSketch')">
                  <el-option label="长期在外流浪儿童"
                             value="长期在外流浪儿童"></el-option>
                  <el-option label="外地长期在本地流浪儿童"
                             value="外地长期在本地流浪儿童"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="流浪儿童情况简述"
                            prop="streetChildrenSketch">
                <el-input v-model="dibaoForm.basicInfo.streetChildrenSketch"
                          placeholder="请输入流浪儿童情况简述"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- 父母情况 -->
          <h3 id="page6"
              class="line_blue">&emsp;父母情况</h3>
          <div class="lineSt"></div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="是否无父母信息"
                            prop="familyInfo.whetherNoParentInfo">
                <el-select v-model="dibaoForm.familyInfo.whetherNoParentInfo"
                           style="width:100%;"
                           @change="isShowParentInfo">
                  <el-option :value="true"
                             label="是"></el-option>
                  <el-option :value="false"
                             label="否"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <div v-if="isNoParent">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item :rules="{
									      required: true, message: '父亲姓名不能为空', trigger: 'blur'
									    }"
                              label="父亲姓名"
                              prop="familyInfo.father.name">
                  <el-input v-model="dibaoForm.familyInfo.father.name"
                            placeholder="请输入父亲姓名"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="父亲身份证号码"
                              prop="familyInfo.father.cardId">
                  <el-input v-model="dibaoForm.familyInfo.father.cardId"
                            placeholder="请输入父亲身份证号码"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="父亲联系电话"
                              prop="familyInfo.father.tel">
                  <el-input v-model="dibaoForm.familyInfo.father.tel"
                            placeholder="请输入父亲联系电话"
                            type="number"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :rules="{
									      required: true, message: '父亲状况不能为空', trigger: 'blur'
									    }"
                              label="父亲当前状况"
                              prop="familyInfo.father.type">
                  <el-select v-model="dibaoForm.familyInfo.father.type"
                             placeholder="请选择父亲当前状况"
                             style="width:100%"
                             @change='changeType($event,"father")'>
                    <el-option label="健康"
                               value="健康"></el-option>
                    <el-option label="重病"
                               value="重病"></el-option>
                    <el-option label="残疾"
                               value="残疾"></el-option>
                    <el-option label="自然死亡"
                               value="自然死亡"></el-option>
                    <el-option label="宣告死亡"
                               value="宣告死亡"></el-option>
                    <el-option label="宣告失踪"
                               value="宣告失踪"></el-option>
                    <el-option label="离家出走"
                               value="离家出走"></el-option>
                    <el-option label="长期外出打工"
                               value="长期外出打工"></el-option>
                    <el-option label="不履行监护抚养责任"
                               value="不履行监护抚养责任"></el-option>
                    <el-option label="服刑在押"
                               value="服刑在押"></el-option>
                    <el-option label="强制戒毒"
                               value="强制戒毒"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="父亲重病情况简述"
                              prop="familyInfo.father.seriousIllnessDesc">
                  <el-input v-model="dibaoForm.familyInfo.father.seriousIllnessDesc"
                            placeholder="请输入父亲重病情况简述"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="父亲残疾状况"
                              prop="fatherDisabilityStatus">
                  <el-select v-model="dibaoForm.familyInfo.father.disabilityStatus"
                             clearable
                             placeholder="请选择父亲残疾状况"
                             style="width:100%">
                    <el-option label="二级以上残疾"
                               value="二级以上残疾"></el-option>
                    <el-option label="三级四级精神残疾"
                               value="三级四级精神残疾"></el-option>
                    <el-option label="三级四级智力残疾"
                               value="三级四级智力残疾"></el-option>
                    <el-option label="其他"
                               value="其他"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="父亲不履行监护抚养责任是否报案"
                              prop="fatherWhetherToReport">
                  <el-select v-model="dibaoForm.familyInfo.father.whetherToReport"
                             clearable
                             style="width:100%">
                    <el-option :value="true"
                               label="是"></el-option>
                    <el-option :value="false"
                               label="否"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="父亲不履行监护抚养责任报案时间"
                              prop="fatherReportTime">
                  <el-date-picker v-model="dibaoForm.familyInfo.father.reportTime"
                                  placeholder="请选择父亲不履行监护抚养责任报案时间"
                                  style="width: 100% !important;"
                                  type="datetime"
                                  value-format="yyyy-MM-dd HH:mm:ss"
                                  @change='changeTime($event,"father","reportingTime")'></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="父亲服刑在押羁押时间"
                              prop="fatherDetentionTime">
                  <el-date-picker v-model="dibaoForm.familyInfo.father.detentionTime"
                                  placeholder="请选择父亲服刑在押羁押时间"
                                  style="width: 100% !important;"
                                  type="datetime"
                                  value-format="yyyy-MM-dd HH:mm:ss"
                                  @change='changeTime2("father","detentionTime","termInCustody","timeRemaining")'></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="父亲服刑在押羁押期限(月)"
                              prop="fatherTermInCustody">
                  <el-input v-model="dibaoForm.familyInfo.father.termInCustody"
                            placeholder="请输入父亲服刑在押羁押期限(月)"
                            type='number'
                            @input='changeTime2("father","detentionTime","termInCustody","timeRemaining")'></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="父亲强制戒毒隔离时间"
                              prop="fatherIsolationTime">
                  <el-date-picker v-model="dibaoForm.familyInfo.father.isolationTime"
                                  placeholder="请选择父亲强制戒毒隔离时间"
                                  style="width: 100% !important;"
                                  type="datetime"
                                  value-format="yyyy-MM-dd HH:mm:ss"
                                  @change='("father","isolationTime","isolationPeriod","isolationTimeRemaining")'></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="父亲强制戒毒隔离期限(月)"
                              prop="fatherIsolationPeriod">
                  <el-input v-model="dibaoForm.familyInfo.father.isolationPeriod"
                            placeholder="请输入父亲强制戒毒隔离期限(月)"
                            type='number'
                            @input='("father","isolationTime","isolationPeriod","isolationTimeRemaining")'></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="是否有其他限制人身自由措施"
                              prop="fatherRestrictionOfPersonalFreedom">
                  <el-select v-model="dibaoForm.familyInfo.father.restrictionOfPersonalFreedom"
                             clearable
                             style="width:100%">
                    <el-option :value="true"
                               label="是"></el-option>
                    <el-option :value="false"
                               label="否"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="其他情况(父亲)描述"
                              prop="fatherOtherSituation">
                  <el-input v-model="dibaoForm.familyInfo.father.otherSituation"
                            placeholder="请输入其他情况(父亲)描述"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item :rules="{
									      required: true, message: '母亲姓名不能为空', trigger: 'blur'
									    }"
                              label="母亲姓名"
                              prop="familyInfo.mother.name">
                  <el-input v-model="dibaoForm.familyInfo.mother.name"
                            placeholder="请输入母亲姓名"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="母亲身份证号码"
                              prop="familyInfo.mother.cardId">
                  <el-input v-model="dibaoForm.familyInfo.mother.cardId"
                            placeholder="请输入母亲身份证号码"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="母亲联系电话"
                              prop="familyInfo.mother.tel">
                  <el-input v-model="dibaoForm.familyInfo.mother.tel"
                            placeholder="请输入母亲联系电话"
                            type="number"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :rules="{
									      required: true, message: '母亲当前状况不能为空', trigger: 'blur'
									    }"
                              label="母亲当前状况"
                              prop="familyInfo.mother.type">
                  <el-select v-model="dibaoForm.familyInfo.mother.type"
                             placeholder="请选择母亲当前状况"
                             style="width:100%"
                             @change='changeType($event,"mother")'>
                    <el-option label="健康"
                               value="健康"></el-option>
                    <el-option label="重病"
                               value="重病"></el-option>
                    <el-option label="残疾"
                               value="残疾"></el-option>
                    <el-option label="自然死亡"
                               value="自然死亡"></el-option>
                    <el-option label="宣告死亡"
                               value="宣告死亡"></el-option>
                    <el-option label="宣告失踪"
                               value="宣告失踪"></el-option>
                    <el-option label="离家出走"
                               value="离家出走"></el-option>
                    <el-option label="长期外出打工"
                               value="长期外出打工"></el-option>
                    <el-option label="不履行监护抚养责任"
                               value="不履行监护抚养责任"></el-option>
                    <el-option label="服刑在押"
                               value="服刑在押"></el-option>
                    <el-option label="强制戒毒"
                               value="强制戒毒"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="母亲重病情况简述"
                              prop="motherSeriousIllnessDesc">
                  <el-input v-model="dibaoForm.familyInfo.mother.seriousIllnessDesc"
                            placeholder="请输入母亲重病情况简述"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="母亲残疾状况"
                              prop="motherDisabilityStatus">
                  <el-select v-model="dibaoForm.familyInfo.mother.disabilityStatus"
                             clearable
                             placeholder="请选择母亲残疾状况"
                             style="width:100%">
                    <el-option label="二级以上残疾"
                               value="二级以上残疾"></el-option>
                    <el-option label="三级四级精神残疾"
                               value="三级四级精神残疾"></el-option>
                    <el-option label="三级四级智力残疾"
                               value="三级四级智力残疾"></el-option>
                    <el-option label="其他"
                               value="其他"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="母亲不履行监护抚养责任是否报案"
                              prop="motherWhetherToReport">
                  <el-select v-model="dibaoForm.familyInfo.mother.whetherToReport"
                             clearable
                             style="width:100%">
                    <el-option :value="true"
                               label="是"></el-option>
                    <el-option :value="false"
                               label="否"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="母亲不履行监护抚养责任报案时间"
                              prop="motherReportTime">
                  <el-date-picker v-model="dibaoForm.familyInfo.mother.reportTime"
                                  placeholder="请选择母亲不履行监护抚养责任报案时间"
                                  style="width: 100% !important;"
                                  type="datetime"
                                  value-format="yyyy-MM-dd HH:mm:ss"
                                  @change='changeTime($event,"mother","reportingTime")'></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="母亲服刑在押羁押时间"
                              prop="motherDetentionTime">
                  <el-date-picker v-model="dibaoForm.familyInfo.mother.detentionTime"
                                  placeholder="请选择母亲服刑在押羁押时间"
                                  style="width: 100% !important;"
                                  type="datetime"
                                  value-format="yyyy-MM-dd HH:mm:ss"
                                  @change='changeTime2("mother","detentionTime","termInCustody","timeRemaining")'></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="母亲服刑在押羁押期限(月)"
                              prop="motherTermInCustody">
                  <el-input v-model="dibaoForm.familyInfo.mother.termInCustody"
                            placeholder="请输入母亲服刑在押羁押期限(月)"
                            type='number'
                            @input='changeTime2("mother","detentionTime","termInCustody","timeRemaining")'></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="母亲强制戒毒隔离时间"
                              prop="motherIsolationTime">
                  <el-date-picker v-model="dibaoForm.familyInfo.mother.isolationTime"
                                  placeholder="请选择母亲强制戒毒隔离时间"
                                  style="width: 100% !important;"
                                  type="datetime"
                                  value-format="yyyy-MM-dd HH:mm:ss"
                                  @change='("mother","isolationTime","isolationPeriod","isolationTimeRemaining")'></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="母亲强制戒毒隔离期限(月)"
                              prop="motherIsolationPeriod">
                  <el-input v-model="dibaoForm.familyInfo.mother.isolationPeriod"
                            placeholder="请输入母亲强制戒毒隔离期限(月)"
                            type='number'
                            @input='("mother","isolationTime","isolationPeriod","isolationTimeRemaining")'></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="是否有其他限制人身自由措施"
                              prop="motherRestrictionOfPersonalFreedom">
                  <el-select v-model="dibaoForm.familyInfo.mother.restrictionOfPersonalFreedom"
                             clearable
                             style="width:100%">
                    <el-option :value="true"
                               label="是"></el-option>
                    <el-option :value="false"
                               label="否"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="其他情况(母亲)描述"
                              prop="motherOtherSituation">
                  <el-input v-model="dibaoForm.familyInfo.mother.otherSituation"
                            placeholder="请输入其他情况(母亲)描述"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>

          <!-- 实际监护人情况 -->
          <h3 id="page7"
              class="line_blue">&emsp;实际监护人情况</h3>
          <div class="lineSt"></div>
          <el-table :data="dibaoForm.familyInfo.guardians"
                    border
                    class="my-table"
                    empty-text='空'>

            <!-- <el-table-column type="selection" width="40" align="center" /> -->
            <el-table-column label="姓名"
                             min-width="110"
                             prop="guardiansActualGuardianName">
              <template slot-scope="scope">
                <el-input v-model="scope.row.actualGuardianName"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="与儿童关系"
                             min-width="125"
                             prop="guardiansRelationshipWithChildren">
              <template slot-scope="scope">
                <el-input v-model="scope.row.relationshipWithChildren"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="身份证号码"
                             min-width="190"
                             prop="guardiansActualGuardianCardId">
              <template slot-scope="scope">
                <el-input v-model="scope.row.actualGuardianCardId"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="身体状况"
                             min-width="120"
                             prop="guardiansActualGuardianHealthStatus">
              <template slot-scope="scope">
                <el-input v-model="scope.row.actualGuardianHealthStatus"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="联系电话"
                             min-width="150"
                             prop="guardiansActualGuardianTel">
              <template slot-scope="scope">
                <el-input v-model="scope.row.actualGuardianTel"
                          type='number'></el-input>
              </template>
            </el-table-column>
            <el-table-column label="教育程度"
                             min-width="100"
                             prop="guardiansActualGuardianEducationalLevel">
              <template slot-scope="scope">
                <el-input v-model="scope.row.actualGuardianEducationalLevel"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="是否同住"
                             min-width="100"
                             prop="guardiansWhetherCohabitation">
              <template slot-scope="scope">
                <el-select v-model="scope.row.whetherCohabitation"
                           style="width:100%">
                  <el-option :value="true"
                             label="是"></el-option>
                  <el-option :value="false"
                             label="否"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="亲密程度"
                             min-width="150"
                             prop="guardiansIntimacy">
              <template slot-scope="scope">
                <el-select v-model="scope.row.intimacy"
                           style="width:100%">
                  <el-option label="好"
                             value="好"></el-option>
                  <el-option label="差"
                             value="差"></el-option>
                </el-select>
              </template>
            </el-table-column>
          </el-table>

          <!-- 家庭经济情况 -->
          <h3 id="page9"
              class="line_blue">&emsp;家庭经济状况</h3>
          <div class="lineSt"></div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="是否贫困家庭"
                            prop="familyInfo.whetherPoorFamilies">
                <el-select v-model="dibaoForm.familyInfo.whetherPoorFamilies"
                           style="width:100%">
                  <el-option :value="true"
                             label="是"></el-option>
                  <el-option :value="false"
                             label="否"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item v-if="dibaoForm.familyInfo.whetherPoorFamilies"
                            label="贫困类型"
                            prop="familyInfo.typesOfPoverty">
                <el-select v-model="dibaoForm.familyInfo.typesOfPoverty"
                           style="width:100%">
                  <el-option label="最低生活保障"
                             value="最低生活保障"></el-option>
                  <el-option label="特困供养"
                             value="特困供养"></el-option>
                  <el-option label="建档立卡户"
                             value="建档立卡户"></el-option>
                  <el-option label="低收入家庭（低保边缘户）"
                             value="低收入家庭（低保边缘户）"></el-option>
                  <el-option label="临时救助"
                             value="临时救助"></el-option>
                  <el-option label="其他"
                             value="其他"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="其他家庭贫困类型简述"
                            prop="familyInfoOtherTypeOfSketch">
                <el-input v-model="dibaoForm.familyInfo.otherTypeOfSketch"
                          placeholder="请输入其他家庭贫困类型简述"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 成长关爱需求 -->
          <h3 id="page10"
              class="line_blue">&emsp;成长关爱需求</h3>
          <div class="lineSt"></div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="儿童微心愿"
                            prop="familyInfoChildrenNeeds">
                <el-input v-model="dibaoForm.familyInfo.childrenNeeds"
                          placeholder="请输入儿童微心愿"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="其他需求"
                            prop="familyInfoOtherNeeds">
                <el-input v-model="dibaoForm.familyInfo.otherNeeds"
                          placeholder="请输入其他需求"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="家庭主要诉求"
                            prop="familyInfoFamilyNeeds">
                <el-input v-model="dibaoForm.familyInfo.familyNeeds"
                          placeholder="请输入家庭主要诉求"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- 生活保障情况 -->
          <h3 id="page14"
              class="line_blue">&emsp;生活保障情况</h3>
          <div class="lineSt"></div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="生活保障情况"
                            prop="assureInfoWhetherGuarantee">
                <el-select v-model="dibaoForm.assureInfo.whetherGuarantee"
                           style="width:100%">
                  <el-option label="未保障"
                             value="未保障"></el-option>
                  <el-option label="已保障"
                             value="已保障"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="保障方式"
                            prop="assureInfoGuaranteeMode">
                <el-select v-model="dibaoForm.assureInfo.guaranteeMode"
                           clearable
                           style="width:100%">
                  <el-option label="孤儿"
                             value="孤儿"></el-option>
                  <el-option label="重病"
                             value="重病"></el-option>
                  <el-option label="重残（生活补贴 、护理补贴）"
                             value="重残（生活补贴 、护理补贴）"></el-option>
                  <el-option label="贫困家庭（低保/特困供养/建档立卡）"
                             value="贫困家庭（低保/特困供养/建档立卡）"></el-option>
                  <el-option label="低收入家庭（低保边缘户）"
                             value="低收入家庭（低保边缘户）"></el-option>
                  <el-option label="临时救助"
                             value="临时救助"></el-option>
                  <el-option label="父母监护缺失"
                             value="父母监护缺失"></el-option>
                  <el-option label="父母无力履行监护责任"
                             value="父母无力履行监护责任"></el-option>
                  <el-option label="流浪儿童"
                             value="流浪儿童"></el-option>
                  <el-option label="其他"
                             value="其他"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="其他保障方式简述"
                            prop="assureInfoGuaranteeModeResume">
                <el-input v-model="dibaoForm.assureInfo.guaranteeModeResume"
                          placeholder="请输入其他保障方式简述"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="发放金额"
                            prop="assureInfoPaymentAmount">
                <el-input v-model="dibaoForm.assureInfo.paymentAmount"
                          placeholder="请填报发放金额"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="发放周期"
                            prop="assureInfoDistributionCycle">
                <el-select v-model="dibaoForm.assureInfo.distributionCycle"
                           style="width:100%">
                  <el-option label="每年"
                             value="每年"></el-option>
                  <el-option label="每季"
                             value="每季"></el-option>
                  <el-option label="半年一次"
                             value="半年一次"></el-option>
                  <el-option label="一年一次"
                             value="一年一次"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="发放方式"
                            prop="assureInfoDistributionMethod">
                <el-select v-model="dibaoForm.assureInfo.distributionMethod"
                           style="width:100%">
                  <el-option label="现金"
                             value="现金"></el-option>
                  <el-option label="社会化打卡发放"
                             value="社会化打卡发放"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="收领人"
                            prop="assureInfoReceiver">
                <el-input v-model="dibaoForm.assureInfo.receiver"
                          placeholder="请填写收领人"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="与儿童关系"
                            prop="assureInfoWithChildren">
                <el-input v-model="dibaoForm.assureInfo.withChildren"
                          placeholder="请填与写儿童关系"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <h3 id="page5"
              class="line_blue">&emsp;教育资助情况</h3>
          <div class="lineSt"></div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="是否有教育资助"
                            prop="assureInfoWhetherEducationSubsidy">
                <el-select v-model="dibaoForm.assureInfo.whetherEducationSubsidy"
                           style="width:100%">
                  <el-option :value="true"
                             label="是"></el-option>
                  <el-option :value="false"
                             label="否"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="教育资助是否免学杂费"
                            prop="assureInfoWhetherFreeOfSchoolFees">
                <el-select v-model="dibaoForm.assureInfo.whetherFreeOfSchoolFees"
                           style="width:100%">
                  <el-option :value="true"
                             label="是"></el-option>
                  <el-option :value="false"
                             label="否"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="教育资助是否免书本费"
                            prop="assureInfoWhetherFreeBooks">
                <el-select v-model="dibaoForm.assureInfo.whetherFreeBooks"
                           style="width:100%">
                  <el-option :value="true"
                             label="是"></el-option>
                  <el-option :value="false"
                             label="否"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="减保教费(元/年)"
                            prop="assureInfoReduceTheAmountOfTuition">
                <el-input v-model="dibaoForm.assureInfo.reduceTheAmountOfTuition"
                          placeholder="请填写减保教费"
                          type="number"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="教育资助(元/年)"
                            prop="educationSubsidyOfMoney">
                <el-input v-model="dibaoForm.assureInfo.educationSubsidyOfMoney"
                          placeholder="请填写教育资助"
                          type="number"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="孤儿助学项目资助(元/年)"
                            prop="assureInfoFinancialAidForOrphansOfMoney">
                <el-input v-model="dibaoForm.assureInfo.financialAidForOrphansOfMoney"
                          placeholder="请填写孤儿助学项目资助"
                          type="number"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="牵手贫困学子项目资助(元/年)"
                            prop="assureInfoFinancialAidForPoorStudentsOfMoney">
                <el-input v-model="dibaoForm.assureInfo.financialAidForPoorStudentsOfMoney"
                          placeholder="请填写牵手贫困学子项目资助"
                          type="number"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="其他资助情况"
                            prop="assureInfoOtherFundingDescription">
                <el-input v-model="dibaoForm.assureInfo.otherFundingDescription"
                          placeholder="请填写其他资助情况"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <h3 id="page15"
              class="line_blue">&emsp;医疗救助情况</h3>
          <div class="lineSt"></div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="基本医疗保险"
                            prop="assureInfoMedicalInsuranceType">
                <el-select v-model="dibaoForm.assureInfo.medicalInsuranceType"
                           style="width:100%">
                  <el-option label="政府资助参保"
                             value="政府资助参保"></el-option>
                  <el-option label="自费参保"
                             value="自费参保"></el-option>
                  <el-option label="未参保"
                             value="未参保"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="个人医疗费"
                            prop="assureInfoMedicalExpense">
                <el-input v-model="dibaoForm.assureInfo.medicalExpense"
                          placeholder="请填写个人医疗费用（元）"
                          type="number"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="个人医疗费-门诊（元）"
                            prop="assureInfoOutpatientExpenses">
                <el-input v-model="dibaoForm.assureInfo.outpatientExpenses"
                          placeholder="请填写门诊费用"
                          type="number"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="个人医疗费-住院（元）"
                            prop="assureInfoHospitalizationExpenses">
                <el-input v-model="dibaoForm.assureInfo.hospitalizationExpenses"
                          placeholder="请填写住院疗费"
                          type="number"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="个人医疗费-住院（天）"
                            prop="assureInfoLengthOfStay">
                <el-input v-model="dibaoForm.assureInfo.lengthOfStay"
                          placeholder="请填写住院天数"
                          type="number"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="门诊费用报支-医疗报销（元）"
                            prop="assureInfoOpcMedicalReimbursement">
                <el-input v-model="dibaoForm.assureInfo.opcMedicalReimbursement"
                          placeholder="请填写门诊费用报支-医疗报销费用"
                          type="number"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="门诊费用报支-明天计划（元）"
                            prop="assureInfoOpcPlannedExpensesForTomorrow">
                <el-input v-model="dibaoForm.assureInfo.opcPlannedExpensesForTomorrow"
                          placeholder="请填写门诊费用报支-明天计划费用"
                          type="number"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="门诊费用报支-大病慈善救助（元）"
                            prop="assureInfoOpcCharityAidForSeriousIllness">
                <el-input v-model="dibaoForm.assureInfo.opcCharityAidForSeriousIllness"
                          placeholder="请填写门诊费用报支-大病慈善救助费用"
                          type="number"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="门诊费用报支-牵手困境儿童（元）"
                            prop="assureInfoOpcAssistanceForChildrenInNeed">
                <el-input v-model="dibaoForm.assureInfo.opcAssistanceForChildrenInNeed"
                          placeholder="请填写门诊费用报支-牵手困境儿童费用"
                          type="number"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="住院费用报支-医疗报销（元）"
                            prop="assureInfoHaMedicalReimbursement">
                <el-input v-model="dibaoForm.assureInfo.haMedicalReimbursement"
                          placeholder="请填写住院费用报支-医疗报销费用"
                          type="number"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="住院费用报支-明天计划（元）"
                            prop="assureInfoHaPlannedExpensesForTomorrow">
                <el-input v-model="dibaoForm.assureInfo.haPlannedExpensesForTomorrow"
                          placeholder="请填写住院费用报支-明天计划费用"
                          type="number"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="住院费用报支-大病慈善救助（元）"
                            prop="assureInfoHaCharityAidForSeriousIllness">
                <el-input v-model="dibaoForm.assureInfo.haCharityAidForSeriousIllness"
                          placeholder="请填写住院费用报支-大病慈善救助费用"
                          type="number"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="住院费用报支-牵手困境儿童（元）"
                            prop="assureInfoHaAssistanceForChildrenInNeed">
                <el-input v-model="dibaoForm.assureInfo.haAssistanceForChildrenInNeed"
                          placeholder="请填写住院费用报支-牵手困境儿童费用"
                          type="number"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="个人自付医疗费用（元）"
                            prop="assureInfoIndividualPaymedicalCare">
                <el-input v-model="dibaoForm.assureInfo.individualPaymedicalCare"
                          placeholder="请填写个人自付医疗费用"
                          type="number"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="个人自付医疗-门诊（元）"
                            prop="assureInfoIndividualPayOutpatient">
                <el-input v-model="dibaoForm.assureInfo.individualPayOutpatient"
                          placeholder="请填写个人自付医疗-门诊费用"
                          type="number"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="个人自付医疗-住院（元）"
                            prop="assureInfoIndividualPayHospitalization">
                <el-input v-model="dibaoForm.assureInfo.individualPayHospitalization"
                          placeholder="请填写个人自付医疗-住院费用"
                          type="number"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <h3 id="page16"
              class="line_blue">&emsp;康复救助情况</h3>
          <div class="lineSt"></div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="残疾确诊时年龄"
                            prop="assureInfoDisabilityDiagnosisAge">
                <el-input v-model="dibaoForm.assureInfo.disabilityDiagnosisAge"
                          placeholder="请填写残疾确诊时年龄"
                          type="number"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="残疾确诊情况简述"
                            prop="disabilitySketchDisabilitySketch">
                <el-input v-model="dibaoForm.assureInfo.disabilitySketch"
                          placeholder="请填写残疾确诊时情况简述"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="是否参加康复训练"
                            prop="whetherRehabilitationTraining">
                <el-select v-model="dibaoForm.assureInfo.whetherRehabilitationTraining"
                           style="width:100%">
                  <el-option :value="true"
                             label="是"></el-option>
                  <el-option :value="false"
                             label="否"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="康复训练康复机构"
                            prop="assureInfoRehabilitationInstitution">
                <el-input v-model="dibaoForm.assureInfo.rehabilitationInstitution"
                          placeholder="请填写康复训练康复机构"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="康复效果"
                            prop="assureInfoRehabilitationEffect">
                <el-input v-model="dibaoForm.assureInfo.rehabilitationEffect"
                          placeholder="请填写康复效果"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="康复费用"
                            prop="assureInfoRehabilitationExpenses">
                <el-input v-model="dibaoForm.assureInfo.rehabilitationExpenses"
                          placeholder="康复费用"
                          type="number"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="未参加康复训练原因"
                            prop="assureInfoWhyNoRecovery">
                <el-select v-model="dibaoForm.assureInfo.whyNoRecovery"
                           clearable
                           style="width:100%">
                  <el-option label="交通因素"
                             value="交通因素"></el-option>
                  <el-option label="家庭人力因素"
                             value="家庭人力因素"></el-option>
                  <el-option label="不知道政策"
                             value="不知道政策"></el-option>
                  <el-option label="康复效果不佳"
                             value="康复效果不佳"></el-option>
                  <el-option label="其他"
                             value="其他"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否配备矫治器具"
                            prop="assureInfoWhetherEquipmentCorrector">
                <el-select v-model="dibaoForm.assureInfo.whetherEquipmentCorrector"
                           style="width:100%">
                  <el-option :value="true"
                             label="是"></el-option>
                  <el-option :value="false"
                             label="否"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="配备器具"
                            prop="assureInfoCorrectorType">
                <el-select v-model="dibaoForm.assureInfo.correctorType"
                           clearable
                           style="width:100%">
                  <el-option label="验配助视器"
                             value="验配助视器"></el-option>
                  <el-option label="验配助听器（双耳）"
                             value="验配助听器（双耳）"></el-option>
                  <el-option label="装配假肢或矫形器、适配轮椅、坐姿椅、站立架、助行器"
                             value="装配假肢或矫形器、适配轮椅、坐姿椅、站立架、助行器"></el-option>
                  <el-option label="配基本型人工耳蜗"
                             value="配基本型人工耳蜗"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="矫治器具配备简述"
                            prop="assureInfoCorrectionSketch">
                <el-input v-model="dibaoForm.assureInfo.correctionSketch"
                          placeholder="请填写矫治器具配备简述"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="未配备原因"
                            prop="assureInfoWhyNoEquipmentCorrector">
                <el-select v-model="dibaoForm.assureInfo.whyNoEquipmentCorrector"
                           clearable
                           style="width:100%">
                  <el-option label="不需要"
                             value="不需要"></el-option>
                  <el-option label="不知道"
                             value="不知道"></el-option>
                  <el-option label="不符合政策"
                             value="不符合政策"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <h3 id="page17"
              class="line_blue">&emsp;司法援助情况</h3>
          <div class="lineSt"></div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="是否需要司法援助"
                            prop="assureInfoWhetherJudicialAssistance">
                <el-select v-model="dibaoForm.assureInfo.whetherJudicialAssistance"
                           style="width:100%">
                  <el-option :value="true"
                             label="是"></el-option>
                  <el-option :value="false"
                             label="否"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="司法援助情况简述"
                            prop="assureInfoJudicialAssistanceSketch">
                <el-input v-model="dibaoForm.assureInfo.judicialAssistanceSketch"
                          placeholder="请填写司法援助情况简述"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="是否有群体组织及社会关爱"
                            prop="assureInfoWhetherSocialAssistance">
                <el-select v-model="dibaoForm.assureInfo.whetherSocialAssistance"
                           style="width:100%">
                  <el-option :value="true"
                             label="是"></el-option>
                  <el-option :value="false"
                             label="否"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="是否有志愿者结对关爱"
                            prop="assureInfoWhetherVolunteerCare">
                <el-select v-model="dibaoForm.assureInfo.whetherVolunteerCare"
                           style="width:100%">
                  <el-option :value="true"
                             label="是"></el-option>
                  <el-option :value="false"
                             label="否"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="志愿者结对关爱情况简述"
                            prop="assureInfoVolunteerCareSketch">
                <el-input v-model="dibaoForm.assureInfo.volunteerCareSketch"
                          placeholder="请填写志愿者结对关爱情况简述"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="是否有部门（单位）结对关爱"
                            prop="assureInfoWhetherDepartmentCare">
                <el-select v-model="dibaoForm.assureInfo.whetherDepartmentCare"
                           style="width:100%">
                  <el-option :value="true"
                             label="是"></el-option>
                  <el-option :value="false"
                             label="否"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="部门（单位）结对关爱情况简述"
                            prop="assureInfoDepartmentCareSketch">
                <el-input v-model="dibaoForm.assureInfo.departmentCareSketch"
                          placeholder="请填写部门（单位）结对关爱情况简述"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="是否有社会捐助"
                            prop="assureInfoWhetherSocialDonations">
                <el-select v-model="dibaoForm.assureInfo.whetherSocialDonations"
                           style="width:100%">
                  <el-option :value="true"
                             label="是"></el-option>
                  <el-option :value="false"
                             label="否"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="社会捐助情况简述"
                            prop="assureInfoSocialDonationsSketch">
                <el-input v-model="dibaoForm.assureInfo.socialDonationsSketch"
                          placeholder="请填写社会捐助情况简述"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="是否有其他关爱"
                            prop="assureInfoWhetherOtherCare">
                <el-select v-model="dibaoForm.assureInfo.whetherOtherCare"
                           style="width:100%">
                  <el-option :value="true"
                             label="是"></el-option>
                  <el-option :value="false"
                             label="否"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="其他关爱情况简述"
                            prop="assureInfoOtherCareSketch">
                <el-input v-model="dibaoForm.assureInfo.otherCareSketch"
                          placeholder="请填写其他关爱情况简述"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- 身份证及其他证明材料 -->
          <template>
            <h3 id="page13"
                class="line_blue">&emsp;身份证及其他证明材料</h3>
            <div class="lineSt"></div>
            <div id="recordt"
                 style="margin-bottom:10px">
              <el-row :gutter="20"
                      style='margin-top:10px'>
                <el-col :span="12"
                        class="my-col">
                  <el-card class="box-card">
                    <div slot="header"
                         class="clearfix">
                      <el-button style="float: left; padding: 3px 0"
                                 type="text"
                                 @click="handleRemove(uploadImg, 'childValue')">
                        删除
                      </el-button>
                      <span>上传儿童身份证明材料(<span style='color:red'>{{ imgNum.childValue_img }}</span>)</span>
                      <el-button style="float: right; padding: 3px 0"
                                 type="text"
                                 @click="uploads('childValue', 'materials')">上传
                      </el-button>
                    </div>
                    <div class="block">
                      <image-view id="childValue_img"
                                  :imgList="uploadImg.childValue_img"
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
                                 @click="handleRemove(uploadImg, 'parentValue')">
                        删除
                      </el-button>
                      <span>上传儿童父母身份证明材料(<span style='color:red'>{{ imgNum.parentValue_img }}</span>)</span>
                      <el-button style="float: right; padding: 3px 0"
                                 type="text"
                                 @click="uploads('parentValue', 'materials')">上传
                      </el-button>
                    </div>
                    <div class="block">
                      <image-view id="parentValue_img"
                                  :imgList="uploadImg.parentValue_img"
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
                                 @click="handleRemove(uploadImg, 'otherValue')">
                        删除
                      </el-button>
                      <span>上传其他材料(<span style='color:red'>{{ imgNum.otherValue_img }}</span>)</span>
                      <el-button style="float: right; padding: 3px 0"
                                 type="text"
                                 @click="uploads('otherValue', 'materials')">上传
                      </el-button>
                    </div>
                    <div class="block">
                      <image-view id="otherValue_img"
                                  :imgList="uploadImg.otherValue_img"
                                  @Imgindex='getImgIndex'></image-view>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </div>
          </template>
          <!-- 当点击退回按钮出现本模块 -->
          <h3 v-if="isReturn"
              id="page20"
              class="line_blue">&emsp;退回意见</h3>
          <div v-if="isReturn"
               class="lineSt"></div>
          <div v-if="isReturn"
               id="recordt"
               style="margin-bottom:10px">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item :rules="{
								      required: true, message: '处理结果不能为空', trigger: 'blur'
								    }"
                              label="处理结果"
                              prop="result">
                  <el-select v-model="handlingCommentsList.result"
                             style="width:100%">
                    <el-option label="退回"
                               value="退回"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <br>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="处理备注">
                  <el-input v-model="handlingCommentsList.remark"
                            placeholder="请填写处理备注"
                            type="textarea"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12"
                      class="my-col">
                <el-form-item label="处理材料">
                  <el-card class="box-card">
                    <div slot="header"
                         class="clearfix">
                      <el-button style="float: left; padding: 3px 0"
                                 type="text"
                                 @click="handleRemove(uploadImg,'material')">删除
                      </el-button>
                      <span>上传退回材料</span>
                      <el-button style="float: right; padding: 3px 0"
                                 type="text"
                                 @click="uploads('material','handlingCommentsList')">上传
                      </el-button>
                    </div>
                    <div class="block">
                      <image-view :imgList="uploadImg.material_img"
                                  @Imgindex='getImgIndex'></image-view>
                    </div>
                  </el-card>
                </el-form-item>
              </el-col>
            </el-row>
            <br>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item>
                  <el-button type="danger"
                             @click="subClick">确定退回</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <!-- 提交到审批 -->
          <h3 v-if="isSubToApproval"
              id="page21"
              class="line_blue">&emsp;审核</h3>
          <div v-if="isSubToApproval"
               class="lineSt"></div>
          <div v-if="isSubToApproval"
               id="recordt"
               style="margin-bottom:10px">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item :rules="{
								      required: true, message: '处理结果不能为空', trigger: 'blur'
								    }"
                              label="处理结果"
                              prop="result">
                  <el-select v-model="handlingCommentsList.result"
                             style="width:100%">
                    <el-option label="同意"
                               value="同意"></el-option>
                    <el-option label="退回"
                               value="退回"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <br>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="处理备注">
                  <el-input v-model="handlingCommentsList.remark"
                            placeholder="请填写处理备注"
                            type="textarea"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12"
                      class="my-col">
                <el-form-item label="处理材料">
                  <el-card class="box-card">
                    <div slot="header"
                         class="clearfix">
                      <el-button style="float: left; padding: 3px 0"
                                 type="text"
                                 @click="handleRemove(uploadImg,'material')">删除
                      </el-button>
                      <span>上传处理材料</span>
                      <el-button style="float: right; padding: 3px 0"
                                 type="text"
                                 @click="uploads('material','handlingCommentsList')">上传
                      </el-button>
                    </div>
                    <div class="block">
                      <image-view :imgList="uploadImg.material_img"
                                  @Imgindex='getImgIndex'></image-view>
                    </div>
                  </el-card>
                </el-form-item>
              </el-col>
            </el-row>
            <br>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item>
                  <el-button type="danger"
                             @click="subClick">提交</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <!-- 提交到办结 -->
          <h3 v-if="isSubToFinish"
              id="page22"
              class="line_blue">&emsp;审核</h3>
          <div v-if="isSubToFinish"
               class="lineSt"></div>
          <div v-if="isSubToFinish"
               id="recordt"
               style="margin-bottom:10px">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item :rules="{
								      required: true, message: '处理结果不能为空', trigger: 'blur'
								    }"
                              label="处理结果"
                              prop="result">
                  <el-select v-model="handlingCommentsList.result"
                             style="width:100%">
                    <el-option label="同意"
                               value="同意"></el-option>
                    <el-option label="退回"
                               value="退回"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <br>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="处理备注">
                  <el-input v-model="handlingCommentsList.remark"
                            placeholder="请填写处理备注"
                            type="textarea"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12"
                      class="my-col">
                <el-form-item label="处理材料">
                  <el-card class="box-card">
                    <div slot="header"
                         class="clearfix">
                      <el-button style="float: left; padding: 3px 0"
                                 type="text"
                                 @click="handleRemove(uploadImg,'material')">删除
                      </el-button>
                      <span>上传处理材料</span>
                      <el-button style="float: right; padding: 3px 0"
                                 type="text"
                                 @click="uploads('material','handlingCommentsList')">上传
                      </el-button>
                    </div>
                    <div class="block">
                      <image-view :imgList="uploadImg.material_img"
                                  @Imgindex='getImgIndex'></image-view>
                    </div>
                  </el-card>
                </el-form-item>
              </el-col>
            </el-row>
            <br>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item>
                  <el-button type="danger"
                             @click="subClick">提交</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <!-- 注销 -->
          <h3 v-if="isCancel"
              id="page23"
              class="line_blue">&emsp;注销</h3>
          <div v-if="isCancel"
               class="lineSt"></div>
          <div v-if="isCancel"
               id="recordt"
               style="margin-bottom:10px">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="注销原因"
                              prop="reason">
                  <el-input v-model="reason"
                            placeholder="请填写注销原因"
                            type="textarea"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <br>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item>
                  <el-button type="danger"
                             @click="subClick">提交</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <!-- 流程 -->
        </el-form>
      </div>
      <div class="ainfo2">
        <div style="margin-left:20px;text-align:center;border-bottom:1px solid #ddd;padding-bottom:10px;">
          <el-button size="small"
                     @click="closeView">返回</el-button>
        </div>
        <div style="margin-left:20px;margin-top:20px;">
          <ul>
            <li :class="{listStyle:isShow1}"
                @click="isShow(1)">
              <a :class="{listStyleA:!isShow1}"
                 class="ainfoFont"
                 @click="counter('#page1')">儿童基本情况</a><br>
            </li>
            <!-- 办结变更时的页面
            <li v-if="$route.query.type == 'bg'" :class="{listStyle:isShow8}" @click="isShow(8)">
              <a class="ainfoFont" :class="{listStyleA:!isShow8}" @click="counter('#page8')">变更信息</a><br>
            </li>-->
            <!-- 办结变更时的页面 -->
            <li v-if="this.dibaoForm.abc_ex205=='委托确认'"
                :class="{listStyle:isShow12}"
                @click="isShow(12)">
              <a :class="{listStyleA:!isShow12}"
                 class="ainfoFont"
                 @click="counter('#page12')">核查情况</a><br>
            </li>
            <li :class="{listStyle:isShow2}"
                @click="isShow(2)">
              <a :class="{listStyleA:!isShow2}"
                 class="ainfoFont"
                 @click="counter('#page2')">身体状况</a><br>
            </li>
            <li :class="{listStyle:isShow3}"
                @click="isShow(3)">
              <a :class="{listStyleA:!isShow3}"
                 class="ainfoFont"
                 @click="counter('#page3')">教育情况</a><br>
            </li>
            <li :class="{listStyle:isShow4}"
                @click="isShow(4)">
              <a :class="{listStyleA:!isShow4}"
                 class="ainfoFont"
                 @click="counter('#page4')">相关经历</a><br>
            </li>
            <li :class="{listStyle:isShow6}"
                @click="isShow(6)">
              <a :class="{listStyleA:!isShow6}"
                 class="ainfoFont"
                 @click="counter('#page6')">父母情况</a><br>
            </li>
            <li :class="{listStyle:isShow7}"
                @click="isShow(7)">
              <a :class="{listStyleA:!isShow7}"
                 class="ainfoFont"
                 @click="counter('#page7')">实际监护人情况</a><br>
            </li>
            <li :class="{listStyle:isShow9}"
                @click="isShow(9)">
              <a :class="{listStyleA:!isShow9}"
                 class="ainfoFont"
                 @click="counter('#page9')">家庭经济状况</a><br>
            </li>
            <li :class="{listStyle:isShow10}"
                @click="isShow(10)">
              <a :class="{listStyleA:!isShow10}"
                 class="ainfoFont"
                 @click="counter('#page10')">成长关爱需求</a><br>
            </li>

            <li :class="{listStyle:isShow14}"
                @click="isShow(14)">
              <a :class="{listStyleA:!isShow14}"
                 class="ainfoFont"
                 @click="counter('#page14')">生活保障情况</a><br>
            </li>
            <li :class="{listStyle:isShow5}"
                @click="isShow(5)">
              <a :class="{listStyleA:!isShow5}"
                 class="ainfoFont"
                 @click="counter('#page5')">教育资助情况</a><br>
            </li>
            <li :class="{listStyle:isShow15}"
                @click="isShow(15)">
              <a :class="{listStyleA:!isShow15}"
                 class="ainfoFont"
                 @click="counter('#page15')">医疗救助情况</a><br>
            </li>
            <li :class="{listStyle:isShow16}"
                @click="isShow(16)">
              <a :class="{listStyleA:!isShow16}"
                 class="ainfoFont"
                 @click="counter('#page16')">康复救助情况</a><br>
            </li>
            <li :class="{listStyle:isShow17}"
                @click="isShow(17)">
              <a :class="{listStyleA:!isShow17}"
                 class="ainfoFont"
                 @click="counter('#page17')">司法援助情况</a><br>
            </li>
            <!-- <li :class="{listStyle:isShow18}" @click="isShow(18)">
              <a class="ainfoFont" :class="{listStyleA:!isShow18}" @click="counter('#page18')">群团组织及社会关爱情况</a><br>
            </li> -->
            <li :class="{listStyle:isShow13}"
                @click="isShow(13)">
              <a :class="{listStyleA:!isShow13}"
                 class="ainfoFont"
                 @click="counter('#page13')">身份证及其他证明材料</a><br>
            </li>
            <li v-if="isReturn"
                :class="{listStyle:isShow20}"
                @click="isShow(20)">
              <a :class="{listStyleA:!isShow20}"
                 class="ainfoFont"
                 @click="counter('#page20')">退回意见</a><br>
            </li>
            <li v-if="isSubToApproval"
                :class="{listStyle:isShow21}"
                @click="isShow(21)">
              <a :class="{listStyleA:!isShow21}"
                 class="ainfoFont"
                 @click="counter('#page21')">提交审核意见</a><br>
            </li>
            <li v-if="isSubToFinish"
                :class="{listStyle:isShow22}"
                @click="isShow(22)">
              <a :class="{listStyleA:!isShow22}"
                 class="ainfoFont"
                 @click="counter('#page22')">提交审批意见</a><br>
            </li>
            <li v-if="isCancel"
                :class="{listStyle:isShow23}"
                @click="isShow(23)">
              <a :class="{listStyleA:!isShow23}"
                 class="ainfoFont"
                 @click="counter('#page23')">提交注销意见</a><br>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
import upload from '@/views/modules/assistance/upload.vue'
import imageView from '@/views/modules/assistance/imageView.vue'

export default {
  name: "kjetEtzrListView",
  components: {
    upload,
    imageView
  },
  data () {
    return {
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
      nation: ['汉族', '壮族', '满族', '回族', '苗族', '维吾尔族', '彝族', '土家族', '蒙古族', '藏族', '布依族', '侗族', '瑶族', '朝鲜族', '白族',
        '哈尼族', '哈萨克族', '黎族', '傣族', '畲族', '傈僳族', '仡佬族',
        '拉祜族', '高山族', '东乡族', '佤族', '水族', '纳西族', '羌族', '土族', '锡伯族', '仫佬族', '柯尔克孜族', '达斡尔族', '景颇族', '撒拉族',
        '布朗族', '毛难族', '塔吉克族', '普米族', '阿昌族', '怒族',
        '鄂温克族', '京族', '基诺族', '德昂族', '乌孜别克族', '俄罗斯族', '保安族', '裕固族', '门巴族', '鄂伦春族', '独龙族', '塔塔尔族', '赫哲族',
        '珞巴族'
      ],
      dibaoForm: {},
      isOk: false,
      education: [], // 教育情况类型
      tutorialClass: [], //辅导班
      typeOfJuvenileDelinquent: [], //失足未成年人
      typeOfEncounteringEmergencies: [], //遭遇困境类型
      typeOfInfringed: [], //遭受侵害和虐待
      // 材料上传图片存储数组
      materials: {
        childValue: '',
        parentValue: '',
        otherValue: '',
        materialValue: '' //通用材料上传
      },
      uploadImg: {
        // abc_ex206_img: [],
        // abc_ex225_img: [],
        // abc_ex207_img: [],
        childValue_img: [],
        parentValue_img: [],
        otherValue_img: [],
        material_img: []
      },
      imgIndex: {
        // abc_ex206:0,
        // abc_ex225: 0,
        // abc_ex207:
        childValue: 0,
        parentValue: 0,
        otherValue: 0,
        materialValue: 0 //通用材料上传
      },
      imgNum: {},//图片数量
      uploadId: '',
      dialogImageUrl: '',
      dialogImageArray: [],
      dialogVisible: false,
      dialogVisible3: false,
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
      isShow20: true,//是否需要退回意见
      isShow21: true,//是否需要提交审核
      isShow22: true,//是否需要提交审批
      isShow23: true,//是否需要提交注销
      isReturn: false,		//是否点击退回按钮
      isSubToApproval: false,				//是否提交公示
      isSubToFinish: false,				//是否提交审批
      isCancel: false,		//是否提交注销
      reason: "",			//注销原因
      handlingCommentsList: {  //通用处理意见的集合
        id: "",
        result: "",		//处理结果
        material: "",   //材料
        remark: ""		//备注
      },
      options: [
        {
          value: '学龄前',
          label: '学龄前',
          children: [
            {
              value: '未入园',
              label: '未入园',
            }, {
              value: '幼儿园',
              label: '幼儿园',
            }, {
              value: '特教',
              label: '特教',
            }
          ]
        }, {
          value: '义务教育',
          label: '义务教育',
          children: [
            {
              value: '小学',
              label: '小学',
            }, {
              value: '初中',
              label: '初中',
            }, {
              value: '特教',
              label: '特教',
            }
          ]
        }, {
          value: '高中',
          label: '高中',
          children: [
            {
              value: '高中',
              label: '高中',
            }, {
              value: '中职',
              label: '中职',
            }, {
              value: '特教',
              label: '特教',
            }
          ]
        }, {
          value: '高等教育',
          label: '高等教育',
          children: [
            {
              value: '大专',
              label: '大专',
            }, {
              value: '本科',
              label: '本科',
            }
          ]
        }, {
          value: '其他',
          label: '其他',
          children: [
            {
              value: '辍学',
              label: '辍学',
            }, {
              value: '无随班就读能力',
              label: '无随班就读能力',
            }, {
              value: '待业',
              label: '待业',
            }, {
              value: '就业',
              label: '就业',
            }
          ]
        }
      ],
      options2: [
        {
          value: true,
          label: '是',
          children: [
            {
              value: '每天',
              label: '每天',
            }, {
              value: '休息日',
              label: '休息日',
            }, {
              value: '寒暑假',
              label: '寒暑假',
            }
          ]
        }, {
          value: false,
          label: '否',
        }
      ],

    }
  },
  watch: {
    // xzqhArray(newA,oldA){
    // 	let qu = newA[0].split("#")[0]
    // 	let zhen = newA[1].split("#")[0]
    // 	let cun = newA[2].split("#")[0]
    // 	this.dibaoForm.basicInfo.divisionCode = newA[0]+","+newA[1]+","+newA[2]
    // 	this.dibaoForm.basicInfo.district = qu
    // 	this.dibaoForm.basicInfo.townStreet = zhen
    // 	this.dibaoForm.basicInfo.rusticate = cun
    // }
  },

  created () {
    //this.loadData();
    //alert(this.$route.query.type=="审核")
    //alert(this.$route.query.cancelId)
    //页面加载之初   判断当前是什么流程显示对应的页面
    if (this.$route.query.type == "退回") {
      this.isReturn = true
    }
    if (this.$route.query.type == "审核") {
      this.isSubToApproval = true
    }
    if (this.$route.query.type == "审批") {
      this.isSubToFinish = true
    }
    if (this.$route.query.type == "注销") {
      this.isCancel = true
    }
    this.getBasic({
      id: this.$route.query.id,
    }).then(res => {

    }).catch(res => {
      if (typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200) {
        console.log('请求失败了-----------------------')
        this.$message.error('数据获取失败或请求超时')
        // this.$emit("closes", false)
        // this.$router.go(-1)
        this.closeView();
        return false
      }
      let data = res.response.data.data
      //console.log(data)
      this.dibaoForm = data
      this.isShowParentInfo();
      for (var i = 0; i < this.dibaoForm.materials.length; i++) {
        if (this.dibaoForm.materials[i].type == '0') {
          this.uploadImg.childValue_img = this.dibaoForm.materials[i].value ? this.dibaoForm.materials[i].value.split(",") : [];
          this.materials.childValue = this.dibaoForm.materials[i].value
        }
        if (this.dibaoForm.materials[i].type == '1') {
          this.uploadImg.parentValue_img = this.dibaoForm.materials[i].value ? this.dibaoForm.materials[i].value.split(",") : [];
          this.materials.parentValue = this.dibaoForm.materials[i].value
        }
        if (this.dibaoForm.materials[i].type == '2') {
          this.uploadImg.otherValue_img = this.dibaoForm.materials[i].value ? this.dibaoForm.materials[i].value.split(",") : [];
          this.materials.otherValue = this.dibaoForm.materials[i].value
        }
      }
      this.isOk = true
      // 获取图片数量
      this.getImgNum()
      let xzqhArray = this.dibaoForm.basicInfo.completeDivisionCode ? this.dibaoForm.basicInfo.completeDivisionCode.split(",") : [];

      // 相关经历
      this.typeOfJuvenileDelinquent = this.dibaoForm.basicInfo.typeOfJuvenileDelinquent ? this.dibaoForm.basicInfo.typeOfJuvenileDelinquent.split(',') : [];
      this.typeOfEncounteringEmergencies = this.dibaoForm.basicInfo.typeOfEncounteringEmergencies ? this.dibaoForm.basicInfo.typeOfEncounteringEmergencies.split(',') : [];

      if (this.dibaoForm.basicInfo.educationStage && this.dibaoForm.basicInfo.educationType) {
        this.education = [this.dibaoForm.basicInfo.educationStage, this.dibaoForm.basicInfo.educationType];
      }
      if (this.dibaoForm.basicInfo.tutorialClass == true) {
        this.tutorialClass = [this.dibaoForm.basicInfo.tutorialClass, this.dibaoForm.basicInfo.typeOfTutorialClass];
      } else if (this.dibaoForm.basicInfo.tutorialClass == false) {
        this.tutorialClass = [this.dibaoForm.basicInfo.tutorialClass];
      }

      this.typeOfInfringed = this.dibaoForm.basicInfo.typeOfInfringed ? this.dibaoForm.basicInfo.typeOfInfringed.split(',') : [];
      if (xzqhArray.length == 3) {
        this.$set(this.xzqhArray, 0, xzqhArray[0]);
        this.$set(this.xzqhArray, 1, xzqhArray[1]);
        this.$set(this.xzqhArray, 2, xzqhArray[2]);
      } else {
        this.xzqhArray = [];
      }
      this.isFinish = true;
    })

  },
  methods: {
    //是否显示父母信息
    isShowParentInfo () {
      if (this.dibaoForm.familyInfo.whetherNoParentInfo) {
        this.isNoParent = false
      } else {
        this.isNoParent = true
      }
    },
    // 菜单点击事件
    counter (id) { //counter1是绑定的点击事件名称
      document.querySelector(id).scrollIntoView(true);
    },

    loadData () {
      this.isFinish = false;
    },
    // 相关经历对应的是否字段赋值，如果无相关经历，对应的简述赋值为空
    changeExperience (val, field1, field2) {
      if (val.length == 0) {
        this.dibaoForm.basicInfo[field1] = false
        this.dibaoForm.basicInfo[field2] = ''
      } else {
        this.dibaoForm.basicInfo[field1] = true
      }
    },
    changeExperience2 (val, field1) {
      if (!val) {
        this.dibaoForm.basicInfo[field1] = ''
      }
    },
    changeType (val, val2) {
      this.dibaoForm.familyInfo[val2].whetherDisability = false
      this.dibaoForm.familyInfo[val2].whetherInCustody = false
      this.dibaoForm.familyInfo[val2].whetherCompulsoryDetoxification = false
      if (val == '残疾') {
        // 是否残疾
        this.dibaoForm.familyInfo[val2].whetherDisability = true
      } else if (val == '服刑在押') {
        // 是否服刑在押
        this.dibaoForm.familyInfo[val2].whetherInCustody = true
      } else if (val == '强制戒毒') {
        // 是否强制戒毒
        this.dibaoForm.familyInfo[val2].whetherCompulsoryDetoxification = true
      }
    },
    changeTime (val, val2, val3) {
      let year = new Date().getFullYear() - new Date(val).getFullYear()
      let month = new Date().getMonth() - new Date(val).getMonth()
      month += year * 12
      console.log(month)
      // 报案时长
      this.dibaoForm.familyInfo[val2][val3] = month
    },
    // 剩余月份
    changeTime2 (val1, val2, val3, val4) {
      if (this.dibaoForm.familyInfo[val1][val2] && this.dibaoForm.familyInfo[val1][val3]) {
        let year = new Date(this.dibaoForm.familyInfo[val1][val2]).getFullYear()
        let month = new Date(this.dibaoForm.familyInfo[val1][val2]).getMonth() + 1
        month += Number(this.dibaoForm.familyInfo[val1][val3])
        console.log(Math.floor(month / 12))
        if (month / 12 > 0) {
          year += Math.floor(month / 12)
          month = month % 12
          console.log(year)
          console.log(month)
        }
        let nowYear = new Date().getFullYear()
        let nowMonth = new Date().getMonth() + 1
        if (year - nowYear >= 0) {
          let t = (year - nowYear) * 12 + (month - nowMonth)
          if (t >= 0) {
            this.dibaoForm.familyInfo[val1][val4] = t
          } else {
            this.dibaoForm.familyInfo[val1][val4] = 0
          }
        } else {
          this.dibaoForm.familyInfo[val1][val4] = 0
        }
        // console.log(this.dibaoForm.familyInfo[val1].timeRemaining)
      }


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
      this.isShow20 = true;		//退回
      this.isShow21 = true;		//提交审核
      this.isShow22 = true;		//提交审批
      this.isShow23 = true;		//提交注销
      if (n == 1) {
        this.isShow1 = false;
      } else if (n == 2) {
        this.isShow2 = false;
      } else if (n == 3) {
        this.isShow3 = false;
      } else if (n == 4) {
        this.isShow4 = false;
      } else if (n == 5) {
        this.isShow5 = false;
      } else if (n == 6) {
        this.isShow6 = false;
      } else if (n == 7) {
        this.isShow7 = false;
      } else if (n == 8) {
        this.isShow8 = false;
      } else if (n == 9) {
        this.isShow9 = false;
      } else if (n == 10) {
        this.isShow10 = false;
      } else if (n == 11) {
        this.isShow11 = false;
      } else if (n == 12) {
        this.isShow12 = false;
      } else if (n == 13) {
        this.isShow13 = false;
      } else if (n == 14) {
        this.isShow14 = false;
      } else if (n == 15) {
        this.isShow15 = false;
      } else if (n == 16) {
        this.isShow16 = false;
      } else if (n == 17) {
        this.isShow17 = false;
      } else if (n == 18) {
        this.isShow18 = false;
      } else if (n == 20) {
        this.isShow20 = false;
      } else if (n == 21) {
        this.isShow21 = false;
      } else if (n == 22) {
        this.isShow22 = false;
      } else if (n == 23) {
        this.isShow23 = false;
      }
    },

    closeView () {
      this.$emit("closes", false);
      this.$router.go(-1);
      if (process.env.NODE_ENV != "development") {
        this.$router.go(-1);
      }
    },

    getImgIndex (item) {
      let data = JSON.parse(item);
      this.imgIndex[data.id] = data.index;
    },
    // 获取图片数量
    getImgNum () {
      for (let key in this.uploadImg) {
        if (this.uploadImg[key][0] == '') {
          this.uploadImg[key].length = 0
          this.imgNum[key] = this.uploadImg[key].length
          console.log(this.imgNum[key])
        } else {
          this.imgNum[key] = this.uploadImg[key].length
          console.log(this.imgNum[key] + key)
        }
      }
      console.log("图片数量", this.imgNum);
    },
    // 上传事件
    uploadEvent (data) {
      console.log("event" + data);
      let val = this.materials[this.uploadId];
      val = val == "" ? data : val + "," + data;
      this.materials[this.uploadId] = val;
      this.uploadImg[this.uploadId + "_img"] = val.split(",");
      this.getImgNum()
    },
    uploadEvent2 () {
      this.uploadImg[this.uploadId + "_img"] = this[this.uploadDataName][this.uploadId].split(",");
      this.uploadDataName = null;
      console.log("event2" + this.uploadImg[this.uploadId + "_img"]);
      this.getImgNum()   // 获取图片数量
    },
    // 删除事件
    handleRemove (file, str) {
      this.$confirm('是否删除该图片？', "提示", {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$delete(this.uploadImg[str + "_img"], this.imgIndex[str]);
        this.materials[str] = this.uploadImg[str + "_img"].join(",");
        this.getImgNum()  //获取图片数量

        // console.log(this.imgNum,'imgNum：各类图片的数量-删除后');

      }).catch(action => {
        console.log("留在本页");
      });
    },
    //获取基础数据
    getBasic (data) {
      return request({
        headers: {
          'Accept': 'application/json',
        },
        url: "/social/child/getChildDetailInfo",
        method: 'post',
        data: data
      })
    },

    //点击保存处理意见
    subClick () {
      //alert(this.handlingCommentsList.result)
      let newResult = this.handlingCommentsList.result
      let status = this.$route.query.type
      if (status == '注销') {
        this.subToCancel({
          "childId": this.$route.query.id,
          "reason": this.reason
        }).then(Res => {
        }).catch(res => {
          // return  console.log(res)
          if (res && res.response && res.response.data && res.response.data.status === "+OK") {
            this.$message.success(res.response.data.msg)
            this.closeView();
            return
          }
          return this.$message.error(res.response.data.msg)
          // if (typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200) {
          //   console.log('请求失败了-----------------------')
          //   this.$message.error('数据获取失败或请求超时')
          //   this.closeView();
          //   return false
          // } else {
          //   this.closeView();
          //   this.$message.success('成功提交至注销')
          // }
        })
      }
      if (newResult == "同意") {
        if (status == "审核") {
          this.saveToApproval({
            "id": this.$route.query.cancelId,
            "material": this.handlingCommentsList.material,
            "remark": this.handlingCommentsList.remark,
            "result": this.handlingCommentsList.result
          }).then(res => {

          }).catch(res => {
            if (typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200) {
              console.log('请求失败了-----------------------')
              this.$message.error('数据获取失败或请求超时')
              this.closeView();
              return false
            } else {
              this.closeView();
              this.$message.success('提交成功')
            }
          })
        }
        if (status == "审批") {
          this.saveToFinish({
            "id": this.$route.query.cancelId,
            "material": this.handlingCommentsList.material,
            "remark": this.handlingCommentsList.remark,
            "result": this.handlingCommentsList.result
          }).then(res => {

          }).catch(res => {
            if (typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200) {
              console.log('请求失败了-----------------------')
              this.$message.error('数据获取失败或请求超时')
              this.closeView();
              return false
            } else {
              this.closeView();
              this.$message.success('提交成功')
            }
          })
        }
      }

      if (newResult == "退回") {
        this.saveReturn({
          "id": this.$route.query.cancelId,
          "material": this.handlingCommentsList.material,
          "remark": this.handlingCommentsList.remark,
          "result": this.handlingCommentsList.result
        }).then(res => {

        }).catch(res => {
          if (typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200) {
            console.log('请求失败了-----------------------')
            this.$message.error('数据获取失败或请求超时')
            this.closeView();
            return false
          } else {
            this.$message.success('成功退回')
          }
        });
      }
    },
    //保存退回意见
    saveReturn (data) {
      return request({
        headers: {
          'Accept': 'application/json',
        },
        url: "/social/childCancel/childReturn",
        method: 'post',
        data: data
      })
    },
    //保存审批意见
    saveToApproval (data) {
      return request({
        headers: {
          'Accept': 'application/json',
        },
        url: "/social/childCancel/childSubmitApproval",
        method: 'post',
        data: data
      })
    },
    //保存办结意见
    saveToFinish (data) {
      return request({
        headers: {
          'Accept': 'application/json',
        },
        url: "/social/childCancel/childSubmitClose",
        method: 'post',
        data: data
      })
    },
    //退回到核查派单
    returnCheckDispatch (data) {
      return request({
        headers: {
          Accept: "application/json",
        },
        url: "/social/child/childReturnToReturn",
        method: "post",
        data: data,
      });
    },
    //将数据进行注销
    subToCancel (data) {
      return request({
        headers: {
          Accept: "application/json",
        },
        url: "/social/childCancel/createChildCancel",
        method: "post",
        data: data,
      });
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

.photo_num {
  color: red;
}
</style>

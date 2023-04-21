<template>
  <!-- 困境儿童列表查看页 -->
  <div class="g-box">
    <div class="g-box2">
      <div ref="info2"
           class="info2">
        <el-form v-if="isOk"
                 ref="Form"
                 v-loading="loading"
                 label-width="auto"
                 style='padding-right: 10px;'
                 @submit.native.prevent>
          <!-- 儿童基本情况 -->
          <template>
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
                              prop="basicInfo.sufferFromAids">
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
                <el-form-item label="曾用名">
                  <el-input v-model="dibaoForm.basicInfo.formerName"
                            placeholder="请输入曾用名"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
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
                  <el-input v-model='dibaoForm.basicInfo.gender'
                            disabled
                            style="width:100%;">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="出生日期"
                              prop="basicInfo.birth">
                  <el-input v-model='dibaoForm.basicInfo.birth'
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
                              prop="basicInfo.completeDivisionCode">
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
                    <el-option label="农业户口"
                               value="农业户口"></el-option>
                    <el-option label="非农业户口"
                               value="非农业户口"></el-option>
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
                <!-- <el-form-item label="开户卡号"
                              prop="basicInfo.bankCardId">
                  <el-input v-model="dibaoForm.basicInfo.bankCardId"
                            placeholder="请输入开户卡号"></el-input>
                </el-form-item> -->
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
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="街道联系的电话"
                              prop="basicInfo.childrenDirectorName">
                  <el-input v-model="dibaoForm.basicInfo.townStreetPhone"
                            placeholder="请输入街道联系的电话"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="村居联系电话"
                              prop="basicInfo.childrenDirectorTel">
                  <el-input v-model="dibaoForm.basicInfo.villagePhone"
                            placeholder="请输入村居联系电话"
                            type="number"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </template>
          <!-- 身体状况 -->
          <template>
            <h3 id="page2"
                class="line_blue">&emsp;身体状况</h3>
            <div class="lineSt"></div>
            <el-row :gutter="20">
              <!-- 身体状况 -->
              <el-col :span="12">
                <el-form-item label="是否健康"
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
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="重病类型"
                              prop="basicInfo.seriousIllnessType">
                  <el-select v-model="dibaoForm.basicInfo.seriousIllnessType"
                             clearable
                             style="width:100%;">
                    <el-option label="三级以上预防接种异常反应残疾儿童"
                               value="三级以上预防接种异常反应残疾儿童"></el-option>
                    <el-option label="经三甲机构诊断符合低收入单人保认定的重大疾病"
                               value="经三甲机构诊断符合低收入单人保认定的重大疾病"></el-option>
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
                    <el-option label="医保规定住院和门诊治疗费1年中自付超过2万"
                               value="医保规定住院和门诊治疗费1年中自付超过2万"></el-option>
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
                </el-form-item>
              </el-col>
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
                <el-form-item label="残疾类型"
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
                <el-form-item label="残疾等级"
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
          </template>
          <!-- 教育状况 -->
          <template>
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
                <el-form-item label="学校名称"
                              prop="basicInfo.schoolName">
                  <el-input v-model="dibaoForm.basicInfo.schoolName"
                            placeholder="请输入学校名称"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 入学时间 -->
            <el-row :gutter="20"
                    v-if="['高中','高等教育'].includes(education[0])">
              <el-col :span="12">
                <el-form-item label="入学时间">
                  <el-date-picker v-model="dibaoForm.basicInfo.admissionDate"
                                  :editable='false'
                                  style="width:100%"
                                  type="date"
                                  placeholder="高中及以后需要选择入学时间">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
              </el-col>
            </el-row>
            <!-- 受教学制 受教学年 -->
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="受教学制(年)">
                  <el-input v-model="dibaoForm.basicInfo.schoolSystem"
                            type="number"
                            :max="10"
                            :min="0"
                            :step="1"
                            controls-position="right"
                            placeholder="请输入受教学制"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="受教学年">
                  <!-- <el-input v-model="dibaoForm.basicInfo.schoolName"
                          placeholder="请输入学校名称"></el-input> -->
                  <el-radio v-model="dibaoForm.basicInfo.schoolYear"
                            label="上半年">上半年</el-radio>
                  <el-radio v-model="dibaoForm.basicInfo.schoolYear"
                            label="下半年">下半年</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 教育情况类型选择不是未入学时显示 学校名称、年级（班级）、教师妈妈、教师妈妈联系电话 -->
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="学校名称"
                              prop="basicInfo.schoolName">
                  <el-input v-model="dibaoForm.basicInfo.schoolName"
                            placeholder="请输入学校名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="年级（班级）"
                              prop="basicInfo.gradeClass">
                  <el-input v-model="dibaoForm.basicInfo.gradeClass"
                            placeholder="请输入年级（班级）"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="教师妈妈"
                              prop="basicInfo.teacher">
                  <el-input v-model="dibaoForm.basicInfo.teacher"
                            placeholder="请输入教师妈妈名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="教师妈妈联系电话"
                              prop="basicInfo.teacherTel">
                  <el-input v-model="dibaoForm.basicInfo.teacherTel"
                            placeholder="请输入联系电话"
                            type="number"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </template>
          <!-- 相关经历 -->
          <template>
            <h3 id="page4"
                class="line_blue">&emsp;相关经历</h3>
            <div class="lineSt"></div>
            <el-row>
              <el-col :span="12">
                <el-form-item label="是否有相关特殊经历">
                  <el-select v-model="dibaoForm.basicInfo.specialExperience"
                             style="width:100%;">
                    <el-option :value="true"
                               label="是"></el-option>
                    <el-option :value="false"
                               label="否"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <template v-if="dibaoForm.basicInfo.specialExperience">
              <el-row :gutter="20">
                <el-col :span="24">
                  <el-form-item label="遭受侵害和虐待"
                                prop="typeOfInfringed">
                    <el-select v-model="typeOfInfringed"
                               multiple
                               style="width:100%">
                      <el-option label="无"
                                 value="无"></el-option>
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
                               style="width:100%">
                      <el-option label="无"
                                 value="无"></el-option>
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
                               style="width:100%">
                      <el-option label="无"
                                 value="无"></el-option>
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
                                prop="basicInfo.typeOfStreetChildren">
                    <el-select v-model="dibaoForm.basicInfo.typeOfStreetChildren"
                               clearable
                               style="width:100%">
                      <el-option label="无"
                                 value="无"></el-option>
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
            </template>
          </template>
          <!-- 父母情况 -->
          <h3 id="page6"
              class="line_blue">&emsp;父母情况</h3>
          <div class="lineSt"></div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="是否无父亲信息"
                            prop="familyInfo.father.whetherNoParentInfo">
                <el-select v-model="dibaoForm.familyInfo.father.whetherNoParentInfo"
                           style="width:100%;">
                  <el-option :value="true"
                             label="是"></el-option>
                  <el-option :value="false"
                             label="否"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <template v-if="!dibaoForm.familyInfo.father.whetherNoParentInfo">
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
                             @change='parentChangeType($event,"father")'>
                    <el-option label="健康"
                               value="健康"></el-option>
                    <el-option label="重病"
                               value="重病"></el-option>
                    <el-option label="残疾"
                               value="残疾"></el-option>
                    <el-option label="重病和残疾"
                               value="重病和残疾"></el-option>
                    <el-option label="自然死亡"
                               value="自然死亡"></el-option>
                    <el-option label="宣告死亡"
                               value="宣告死亡"></el-option>
                    <el-option label="宣告失踪"
                               value="宣告失踪"></el-option>
                    <el-option label="失联"
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
                <el-form-item label="是否履行监护责任"
                              prop="fatherWhetherToReport">
                  <el-select v-model="dibaoForm.familyInfo.father.whetherPerformObligations"
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
                  <el-input v-model="dibaoForm.familyInfo.father.isolationTimeRemaining"
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
            <!-- <div class="FMImgArrBox">
                    <el-upload action="https://jsonplaceholder.typicode.com/posts/"
                               list-type="picture-card"
                               :on-preview="FMImgArrHandlePictureCardPreview"
                               :on-remove="FMImgArrHandleRemove">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                  </div> -->
          </template>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="是否无母亲信息"
                            prop="familyInfo.mother.whetherNoParentInfo">
                <el-select v-model="dibaoForm.familyInfo.mother.whetherNoParentInfo"
                           style="width:100%;">
                  <el-option :value="true"
                             label="是"></el-option>
                  <el-option :value="false"
                             label="否"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <template v-if="!dibaoForm.familyInfo.mother.whetherNoParentInfo">
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
                             @change='parentChangeType($event,"mother")'>
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
                <el-form-item label="是否履行监护责任"
                              prop="motherWhetherToReport">
                  <el-select v-model="dibaoForm.familyInfo.mother.whetherPerformObligations"
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
                  <el-input v-model="dibaoForm.familyInfo.mother.isolationTimeRemaining"
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
          </template>
          <!-- 实际监护人情况 -->
          <template>
            <h3 id="page7"
                class="line_blue">&emsp;实际监护人情况</h3>
            <div class="lineSt"></div>
            <el-row class="button-group">
            </el-row>
            <el-table :data="dibaoForm.familyInfo.guardians"
                      :row-class-name="rowClassName"
                      border
                      class="my-table"
                      empty-text='空'
                      @selection-change="handleFamilyData1">
              <el-table-column align="center"
                               type="selection"
                               width="40" />
              <el-table-column label="姓名"
                               min-width="110"
                               prop="actualGuardianName">
                <template slot-scope="scope">
                  <el-input v-model="dibaoForm.familyInfo.guardians[scope.row.xh-1].actualGuardianName"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="与儿童关系"
                               min-width="125"
                               prop="relationshipWithChildren">
                <template slot-scope="scope">
                  <el-input v-model="dibaoForm.familyInfo.guardians[scope.row.xh-1].relationshipWithChildren"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="身份证号码"
                               min-width="190"
                               prop="actualGuardianCardId">
                <template slot-scope="scope">
                  <el-input v-model="dibaoForm.familyInfo.guardians[scope.row.xh-1].actualGuardianCardId"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="身体状况"
                               min-width="120"
                               prop="actualGuardianHealthStatus">
                <template slot-scope="scope">
                  <el-input v-model="dibaoForm.familyInfo.guardians[scope.row.xh-1].actualGuardianHealthStatus"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="联系电话"
                               min-width="150"
                               prop="actualGuardianTel">
                <template slot-scope="scope">
                  <el-input v-model="dibaoForm.familyInfo.guardians[scope.row.xh-1].actualGuardianTel"
                            type='number'></el-input>
                </template>
              </el-table-column>
              <el-table-column label="教育程度"
                               min-width="100"
                               prop="actualGuardianEducationalLevel">
                <template slot-scope="scope">
                  <el-input v-model="dibaoForm.familyInfo.guardians[scope.row.xh-1].actualGuardianEducationalLevel"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="是否同住"
                               min-width="100"
                               prop="whetherCohabitation">
                <template slot-scope="scope">
                  <el-select v-model="dibaoForm.familyInfo.guardians[scope.row.xh-1].whetherCohabitation"
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
                               prop="intimacy">
                <template slot-scope="scope">
                  <el-select v-model="dibaoForm.familyInfo.guardians[scope.row.xh-1].intimacy"
                             style="width:100%">
                    <el-option label="好"
                               value="好"></el-option>
                    <el-option label="差"
                               value="差"></el-option>
                  </el-select>
                </template>
              </el-table-column>
            </el-table>
          </template>
          <!-- 家庭经济情况 -->
          <template>
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
                             multiple
                             placeholder="请选择贫困类型"
                             style="width:100%">
                    <el-option label="最低生活保障"
                               value="最低生活保障"></el-option>
                    <el-option label="特困供养"
                               value="特困供养"></el-option>
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
          </template>
          <!-- 生活保障情况 -->
          <template>
            <h3 id="page14"
                class="line_blue">&emsp;生活保障情况</h3>
            <div class="lineSt"></div>

            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="生活保障情况"
                              prop="assureInfo.whetherGuarantee">
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
                              prop="assureInfo.guaranteeMode">
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
                              prop="assureInfo.guaranteeModeResume">
                  <el-input v-model="dibaoForm.assureInfo.guaranteeModeResume"
                            placeholder="请输入其他保障方式简述"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="收领人与儿童关系"
                              prop="basicInfo.receiverRelation">
                  <el-input v-model="dibaoForm.basicInfo.receiverRelation"
                            placeholder="请填与写收领人与儿童关系"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="发放金额"
                              prop="assureInfo.paymentAmount">
                  <el-input v-model="dibaoForm.assureInfo.paymentAmount"
                            placeholder="请填报发放金额"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <!-- <el-form-item label="发放周期"
                              prop="assureInfo.distributionCycle">
                  <el-select v-model="dibaoForm.assureInfo.distributionCycle"
                             style="width:100%">
                    <el-option label="每月"
                               value="每月"></el-option>
                    <el-option label="每季"
                               value="每季"></el-option>
                    <el-option label="半年"
                               value="半年"></el-option>
                    <el-option label="一年"
                               value="一年"></el-option>
                  </el-select>
                </el-form-item> -->
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="发放方式"
                              prop="basicInfo.collectionMethod">
                  <el-select v-model="dibaoForm.basicInfo.collectionMethod"
                             style="width:100%">
                    <el-option label="社会化打卡发放"
                               value="社会化打卡发放"></el-option>
                    <el-option label="现金"
                               value="现金"></el-option>
                    <el-option label="福利院发放"
                               value="福利院发放"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12"
                      v-if="dibaoForm.basicInfo.receiverRelation !== '本人'">
                <el-form-item label="收领人"
                              prop="basicInfo.receiver">
                  <el-input v-model="dibaoForm.basicInfo.receiver"
                            placeholder="请填写收领人"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <template v-if="dibaoForm.basicInfo.collectionMethod !== '福利院发放' ">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="开户人姓名"
                                prop="basicInfo.bankAccountName">
                    <el-input v-model="dibaoForm.basicInfo.bankAccountName"
                              placeholder="请输入开户人姓名"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="开户行名称"
                                prop="basicInfo.bankName">
                    <el-input v-model="dibaoForm.basicInfo.bankName"
                              placeholder="请输入开户行名称"></el-input>
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
                </el-col>
              </el-row>
              <el-row :gutter="20"
                      v-if="dibaoForm.basicInfo.receiverRelation !== '本人'">
                <el-col :span="
                    12">
                  <el-form-item label="收领人身份证"
                                prop="basicInfo.receiverIdCard">
                    <el-input v-model="dibaoForm.basicInfo.receiverIdCard"
                              placeholder="请填写收领人身份证"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="收领人电话"
                                prop="basicInfo.receiverPhone">
                    <el-input v-model="dibaoForm.basicInfo.receiverPhone"
                              placeholder="请填写收领人电话"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </template>
            <!-- <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="与儿童关系"
                              prop="basicInfo.receiverRelation">
                  <el-input v-model="dibaoForm.basicInfo.receiverRelation"
                            placeholder="请填与写儿童关系"></el-input>
                </el-form-item>
              </el-col>
            </el-row> -->
          </template>
          <!-- 教育资助情况 -->
          <template>
            <h3 id="page5"
                class="line_blue">&emsp;教育资助情况</h3>
            <div class="lineSt"></div>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="是否有教育资助"
                              prop="assureInfo.whetherEducationSubsidy">
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
                              prop="assureInfo.whetherFreeOfSchoolFees">
                  <el-select v-model="dibaoForm.assureInfo.whetherFreeOfSchoolFees"
                             style="width:100%">
                    <el-option :value="true"
                               label="是"></el-option>
                    <el-option :value="false"
                               label="否"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="12">
					        <el-form-item label="教育资助类型" prop="abc_ex104">
					            <el-select v-model="dibaoForm.abc_ex104" style="width:100%">
					                <el-option label="免学杂费" value="免学杂费"></el-option>
					                <el-option label="免书本费" value="免书本费"></el-option>
					                <el-option label="减保教费" value="减保教费"></el-option>
					                <el-option label="教育资助" value="教育资助"></el-option>
					                <el-option label="孤儿助学项目资助" value="孤儿助学项目资助"></el-option>
					                <el-option label="牵手贫困学子项目资助" value="牵手贫困学子项目资助"></el-option>
					                <el-option label="其他" value="其他"></el-option>
					            </el-select>
					        </el-form-item>
					    </el-col> -->
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="教育资助是否免书本费"
                              prop="assureInfo.whetherFreeBooks">
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
                              prop="dibaoForm.assureInfo.reduceTheAmountOfTuition">
                  <el-input v-model="dibaoForm.assureInfo.reduceTheAmountOfTuition"
                            placeholder="请填写减保教费"
                            type="number"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="教育资助(元/年)">
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
          </template>
          <!-- 医疗救助情况 -->
          <template>
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
              <!-- <el-col :span="12" >
							<el-form-item label="门诊费用报支（这个字段少了）" prop="abc_ex115">
								<el-input v-model="dibaoForm.assureInfo.abc_ex115" type="number" placeholder="请填写门诊费用报支"></el-input>
							</el-form-item>
						</el-col> -->
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
              <!-- <el-col :span="12">
							<el-form-item label="住院费用报支（元）" prop="abc_ex120">
								<el-input v-model="dibaoForm.assureInfo.abc_ex120" type="number" placeholder="请填写住院费用报支"></el-input>
							</el-form-item>
						</el-col> -->
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
          </template>
          <!-- 康复救助情况 -->
          <template>
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
          </template>
          <!-- 司法援助情况 -->
          <template>
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
          </template>
          <!-- 群团组织及社会关爱情况 -->
          <template>
            <h3 id="page18"
                class="line_blue">&emsp;群团组织及社会关爱情况</h3>
            <div class="lineSt"></div>
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
          </template>
          <!-- 注销 -->
          <template v-if="$route.query.type ==='注销'">
            <h3 id="pagezx"
                class="line_blue">&emsp;注销</h3>
            <div class="lineSt"></div>
            <el-row :gutter="20"
                    style='marginTop:10px'>
              <el-col :span="12"
                      class="my-col">
                <el-form-item label="注销原因">
                  <el-input v-model="cancelInfo"
                            placeholder="请填写注销原因"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12"
                      class="my-col">
                <el-button type="primary"
                           @click="affirmCancel">确认注销</el-button>
              </el-col>
            </el-row>
          </template>
          <!-- 身份证及其他证明材料 -->
          <template>
            <h3 id="page13"
                class="line_blue">&emsp;身份证证明材料</h3>
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
                      <!-- <el-button style="float: left; padding: 3px 0"
                                 type="text"
                                 @click="handleRemove(uploadImg, 'childPhoto',imgInfo)">
                        删除
                      </el-button> -->
                      <!-- (<span class="photo_num">必填</span>) -->
                      <span>儿童头像照片(<span class="photo_num">{{ uploadImg.childPhoto.length }}</span>)</span>
                      <!-- <el-button style="float: right; padding: 3px 0"
                                 type="text"
                                 @click="uploads('childPhoto', 'materials','头像')">上传
                      </el-button> -->
                    </div>
                    <div class="block">
                      <image-view id="childPhoto"
                                  :imgList="uploadImg.childPhoto"
                                  @Imgindex='getImgIndex'></image-view>
                    </div>
                  </el-card>
                </el-col>
                <el-col :span="12"
                        class="my-col">
                  <el-card class="box-card">
                    <div slot="header"
                         class="clearfix">
                      <!-- <el-button style="float: left; padding: 3px 0"
                                 type="text"
                                 @click="handleRemove(uploadImg, 'childValue',imgInfo)">
                        删除
                      </el-button> -->
                      <span>身份证证明材料 (<span class="photo_num">{{ uploadImg.childValue_img.length }}</span>)</span>
                      <!-- <el-button style="float: right; padding: 3px 0"
                                 type="text"
                                 @click="uploads('childValue', 'materials','儿童')">上传
                      </el-button> -->
                    </div>
                    <div class="block">
                      <image-view id="childValue_img"
                                  :imgList="uploadImg.childValue_img"
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
                      <!-- <el-button style="float: left; padding: 3px 0"
                                 type="text"
                                 @click="handleRemove(uploadImg, 'parentValue',imgInfo)">
                        删除
                      </el-button> -->
                      <!-- (<span class="photo_num">必填</span>) -->
                      <span>儿童户口本证明材料(<span style='color:red'>{{ uploadImg.parentValue_img.length }}</span>)</span>
                      <!-- <el-button style="float: right; padding: 3px 0"
                                 type="text"
                                 @click="uploads('parentValue', 'materials','父母')">上传
                      </el-button> -->
                    </div>
                    <div class="block">
                      <image-view id="parentValue_img"
                                  :imgList="uploadImg.parentValue_img"
                                  @Imgindex='getImgIndex'></image-view>
                    </div>
                  </el-card>
                </el-col>
                <el-col :span="12"
                        class="my-col">
                  <el-card class="box-card">
                    <div slot="header"
                         class="clearfix">
                      <!-- <el-button style="float: left; padding: 3px 0"
                                 type="text"
                                 @click="handleRemove(uploadImg, 'otherValue',imgInfo)">
                        删除
                      </el-button> -->
                      <span>其他材料(<span style='color:red'>{{ uploadImg.otherValue_img.length }}</span>)</span>
                      <!-- <el-button style="float: right; padding: 3px 0"
                                 type="text"
                                 @click="uploads('otherValue', 'materials','其他')">上传
                      </el-button> -->
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
          <!-- 审批记录 -->
          <template>
            <h3 v-if="isChangeRecord"
                id="page24"
                class="line_blue">&emsp;变更记录</h3>
            <div v-if="isChangeRecord"
                 class="lineSt"></div>
            <el-table :data="changeRecord"
                      stripe
                      style="width: 100%">
              <el-table-column label="修改模块"
                               prop="module"
                               width="180">
              </el-table-column>
              <el-table-column label="修改字段"
                               prop="describe"
                               width="180">
              </el-table-column>
              <el-table-column label="原值"
                               prop="originalValue">
              </el-table-column>
              <el-table-column label="修改值"
                               prop="targetValue">
              </el-table-column>
            </el-table>
          </template>
          <!-- 审批记录 -->
          <template>
            <h3 v-if="isSelect"
                id="page23"
                class="line_blue">&emsp;审批记录</h3>
            <div v-if="isSelect"
                 class="lineSt"></div>
            <table v-if="isSelect"
                   id="recordt"
                   style="width:100%;table-layout:fixed">
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
                  <td style="color:#899197;height:30px">处理业务：</td>
                  <td>{{ itemR.businessName }}</td>
                </tr>
                <tr>
                  <td style="color:#899197;height:30px">处理步骤：</td>
                  <td>{{ itemR.type }}</td>
                  <td style="color:#899197">处理时间：</td>
                  <td>{{ itemR.createTime }}</td>
                  <td style="color:#899197">处理结果：</td>
                  <td rowspan="2"
                      style="text-align:left">
                    <img v-if="itemR.result == '同意'||itemR.result == '申请' "
                         src="@/assets/img/auditStatus/agree.png"
                         style="width:100px">
                    <img v-else-if="itemR.result =='退回重新核查'"
                         src="@/assets/img/auditStatus/return2.png"
                         style="width:100px">
                    <img v-else
                         src="@/assets/img/auditStatus/return.png"
                         style="width:100px">
                  </td>
                </tr>
                <tr>
                  <td style="color:#899197;height:30px">处理人：</td>
                  <td>{{ itemR.name }}</td>
                  <td style="color:#899197">处理用时：</td>
                  <td v-if="itemR.processingTime =='0' "> 1天</td>
                  <td v-else> {{ itemR.processingTime }}天</td>
                </tr>
                <tr style="border-bottom:1px solid #ddd">
                  <td style="color:#899197;height:30px">处理意见：</td>
                  <td colspan="4">{{ itemR.remark }}</td>
                </tr>
                <tr>
                  <td colspan="5"
                      style="height:20px">&nbsp;
                  </td>
                </tr>
              </tbody>
            </table>
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
                    <el-option label="同意"
                               value="同意"></el-option>
                    <el-option label="退回重新核查"
                               value="退回重新核查"></el-option>
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
            <br>
            <el-row :gutter="20">
              <el-col :span="12"
                      class="my-col">
                <el-form-item label="处理材料">
                  <el-card class="box-card">
                    <div slot="header"
                         class="clearfix">
                      <el-button style="float: left; padding: 3px 0"
                                 type="text"
                                 @click="handleRemove(DTBGSH_ImgArr, 'DTBGSH_ImgArr',imgInfo)">
                        删除
                      </el-button>
                      <span>上传处理材料(<span style='color:red'>{{ DTBGSH_ImgArr.length }}</span>)</span>
                      <el-button style="float: right; padding: 3px 0"
                                 type="text"
                                 @click="uploads('materialValue', 'materials')">上传
                      </el-button>
                    </div>
                    <div class="block">
                      <image-view id="materialValue_img"
                                  :imgList="DTBGSH_ImgArr"
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
                             @click="subClick">确定退回
                  </el-button>
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
                    <el-option v-if="!$route.query.changeId && !$route.query.cancelId "
                               label="退回重新核查"
                               value="退回重新核查"></el-option>
                    <el-option label="退回"
                               value="退回"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="处理备注">
                  <el-input v-model="handlingCommentsList.remark"
                            placeholder="请填写处理备注"
                            type="textarea"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- <el-row :gutter="20">
              <el-col :span="12"
                      class="my-col">
                <el-form-item label="处理材料">
                  <el-card class="box-card">
                    <div slot="header"
                         class="clearfix">
                      <el-button style="float: left; padding: 3px 0"
                                 type="text"
                                 @click="handleRemove(DTBGSH_ImgArr, 'DTBGSH_ImgArr',imgInfo)">
                        删除
                      </el-button>
                      <span>上传处理材料(<span style='color:red'>{{ DTBGSH_ImgArr.length }}</span>)</span>
                      <el-button style="float: right; padding: 3px 0"
                                 type="text"
                                 @click="uploads('materialValue', 'materials')">上传
                      </el-button>
                    </div>
                    <div class="block">
                      <image-view id="materialValue_img"
                                  :imgList="DTBGSH_ImgArr"
                                  @Imgindex='getImgIndex'></image-view>
                    </div>
                  </el-card>
                </el-form-item>
              </el-col>
            </el-row> -->
            <br>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item>
                  <el-button type="danger"
                             @click="subClick">提交
                  </el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <!-- 提交到办结 -->
          <template>
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
                      <el-option v-if="!$route.query.changeId  && !$route.query.cancelId"
                                 label="退回重新核查"
                                 value="退回重新核查"></el-option>
                      <el-option label="退回"
                                 value="退回"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="处理备注">
                    <el-input v-model="handlingCommentsList.remark"
                              placeholder="请填写处理备注"
                              type="textarea"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- <el-row :gutter="20"
                      style='marginTop:10px'>
                <el-col :span="12"
                        class="my-col">
                  <el-form-item label="处理材料">
                    <el-card class="box-card">
                      <div slot="header"
                           class="clearfix">
                        <el-button style="float: left; padding: 3px 0"
                                   type="text"
                                   @click="handleRemove(DTBGSH_ImgArr, 'DTBGSH_ImgArr',imgInfo)">
                          删除
                        </el-button>
                        <span>上传处理材料(<span style="color:red">{{ DTBGSH_ImgArr.length }}</span>)</span>
                        <el-button style="float: right; padding: 3px 0"
                                   type="text"
                                   @click="uploads('materialValue', 'materials')">上传
                        </el-button>
                      </div>
                      <div class="block">
                        <image-view id="materialValue_img"
                                    :imgList="DTBGSH_ImgArr"
                                    @Imgindex='getImgIndex'></image-view>
                      </div>
                    </el-card>
                  </el-form-item>
                </el-col>
              </el-row> -->
              <br>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item>
                    <el-button type="danger"
                               @click="subClick">提交
                    </el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </template>
          <!-- 流程 -->
          <el-dialog :visible.sync="dialogVisible"
                     append-to-body>
            <el-image :preview-src-list="dialogImageArray"
                      :src="dialogImageUrl"></el-image>
          </el-dialog>

          <el-dialog :visible.sync="dialogVisible3"
                     append-to-body
                     title="上传"
                     width="500px"
                     @close='uploadEvent2'>
            <upload ref="myUpload"
                    @upload="uploadEvent"></upload>
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
          <el-button size="small"
                     @click="closeView">返回
          </el-button>
        </div>
        <div style="margin-left:20px;margin-top:20px;">
          <ul class="right-ul">
            <li :class="{currentLi:currListStyle === 'ETJBQK'}">
              <a class="ainfoFont"
                 href="javascript:"
                 @click="changeCurrStyle('#page1','ETJBQK')">儿童基本情况</a><br>
            </li>
            <li :class="{currentLi:currListStyle === 'STQK'}">
              <a class="ainfoFont"
                 href="javascript:"
                 @click="changeCurrStyle('#page2','STQK')">身体状况</a><br>
            </li>
            <li :class="{currentLi:currListStyle === 'JYQK'}">
              <a class="ainfoFont"
                 href="javascript:"
                 @click="changeCurrStyle('#page3','JYQK')">教育情况</a><br>
            </li>
            <li :class="{currentLi:currListStyle === 'XGJL'}">
              <a class="ainfoFont"
                 href="javascript:"
                 @click="changeCurrStyle('#page4','XGJL')">相关经历</a><br>
            </li>
            <li :class="{currentLi:currListStyle === 'FMQK'}">
              <a class="ainfoFont"
                 href="javascript:"
                 @click="changeCurrStyle('#page6','FMQK')">父母情况</a><br>
            </li>
            <li :class="{currentLi:currListStyle === 'SJJHRQK'}">
              <a class="ainfoFont"
                 href="javascript:"
                 @click="changeCurrStyle('#page7','SJJHRQK')">实际监护人情况</a><br>
            </li>
            <li :class="{currentLi:currListStyle === 'JTJJQK'}">
              <a class="ainfoFont"
                 href="javascript:"
                 @click="changeCurrStyle('#page9','JTJJQK')">家庭经济状况</a><br>
            </li>
            <li :class="{currentLi:currListStyle === 'SHBZQK'}">
              <a class="ainfoFont"
                 href="javascript:"
                 @click="changeCurrStyle('#page14','SHBZQK')">生活保障情况</a><br>
            </li>
            <li :class="{currentLi:currListStyle === 'JYZZQK'}">
              <a class="ainfoFont"
                 href="javascript:"
                 @click="changeCurrStyle('#page5','JYZZQK')">教育资助情况</a><br>
            </li>
            <li :class="{currentLi:currListStyle === 'YLJZQK'}">
              <a class="ainfoFont"
                 href="javascript:"
                 @click="changeCurrStyle('#page15','YLJZQK')">医疗救助情况</a><br>
            </li>
            <li :class="{currentLi:currListStyle === 'KFJZQK'}">
              <a class="ainfoFont"
                 href="javascript:"
                 @click="changeCurrStyle('#page16','KFJZQK')">康复救助情况</a><br>
            </li>
            <li :class="{currentLi:currListStyle === 'SFYZQK'}">
              <a class="ainfoFont"
                 href="javascript:"
                 @click="changeCurrStyle('#page17','SFYZQK')">司法援助情况</a><br>
            </li>
            <li :class="{currentLi:currListStyle === 'QTZZJSHGAQK'}">
              <a class="ainfoFont"
                 href="javascript:"
                 @click="changeCurrStyle('#page18','QTZZJSHGAQK')">群团组织及社会关爱情况</a><br>
            </li>
            <li v-if="$route.query.type==='注销'"
                :class="{currentLi:currListStyle === 'KJETSPZX'}">
              <a class="ainfoFont"
                 href="javascript:"
                 @click="changeCurrStyle('#pagezx','KJETSPZX')">注销</a><br>
            </li>
            <li :class="{currentLi:currListStyle === 'SFZJQTZMCL'}">
              <a class="ainfoFont"
                 href="javascript:"
                 @click="changeCurrStyle('#page13','SFZJQTZMCL')">身份证及其他证明材料</a><br>
            </li>
            <li v-if="isReturn"
                :class="{currentLi:currListStyle === 'THYJ'}">
              <a class="ainfoFont"
                 href="javascript:"
                 @click="changeCurrStyle('#page20','THYJ')">退回意见</a><br>
            </li>
            <li v-if="isSubToApproval"
                :class="{currentLi:currListStyle === 'TJSHYJ'}">
              <a class="ainfoFont"
                 href="javascript:"
                 @click="changeCurrStyle('#page21','TJSHYJ')">提交审核意见</a><br>
            </li>
            <li v-if="isSubToFinish"
                :class="{currentLi:currListStyle === 'TJSPYJ'}">
              <a class="ainfoFont"
                 href="javascript:"
                 @click="changeCurrStyle('#page22','TJSPYJ')">提交审批意见</a><br>
            </li>
            <li v-if="isChangeRecord"
                :class="{currentLi:currListStyle === 'BGJL'}">
              <a class="ainfoFont"
                 href="javascript:"
                 @click="changeCurrStyle('#page24','BGJL')">变更记录</a><br>
            </li>
            <li v-if="isSelect"
                :class="{currentLi:currListStyle === 'SPJL'}">
              <a class="ainfoFont"
                 href="javascript:"
                 @click="changeCurrStyle('#page23','SPJL')">审批记录</a><br>
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
import {
  createChildCancelApi,
  childChangeSubmitApprovalApi,  // 困境儿童变更 审核提交到审批
  childChangeSubmitCloseApi,  // 困境儿童变更 审批提交到办结
  childCancelSubmitApprovalApi, // 困境儿童注销 提交到注销审批
  childCancelSubmitCloseApi, // // 困境儿童注销 提交到注销办结
  childSubmitApprovalApi, // // 困境儿童提交到审核  根据儿童ID
  childSubmitCloseApi, // // 困境儿童提交到办结  根据儿童ID
} from "@/api/lifeRescue/predicamentChild"
export default {
  name: "kjetEtzrListView",
  components: {
    upload,
    imageView
  },
  data () {
    return {
      cancelInfo: "", // 注销原因
      isChangeRecord: false,
      changeRecord: [],
      loading: false,
      xzqhArray: [],
      test: {
        xzqhArray: []
      },
      isFinish: false,
      nation: ['汉族', '壮族', '满族', '回族', '苗族', '维吾尔族', '彝族', '土家族', '蒙古族', '藏族', '布依族', '侗族', '瑶族', '朝鲜族', '白族',
        '哈尼族', '哈萨克族', '黎族', '傣族', '畲族', '傈僳族', '仡佬族',
        '拉祜族', '高山族', '东乡族', '佤族', '水族', '纳西族', '羌族', '土族', '锡伯族', '仫佬族', '柯尔克孜族', '达斡尔族', '景颇族', '撒拉族',
        '布朗族', '毛难族', '塔吉克族', '普米族', '阿昌族', '怒族',
        '鄂温克族', '京族', '基诺族', '德昂族', '乌孜别克族', '俄罗斯族', '保安族', '裕固族', '门巴族', '鄂伦春族', '独龙族', '塔塔尔族', '赫哲族',
        '珞巴族'
      ],
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
        childPhoto: [],
        childValue_img: [],
        parentValue_img: [],
        otherValue_img: [],
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
      isShow23: true,//查看审批记录
      isShow24: true,//查看变更记录
      isReturn: false,		//是否点击退回按钮
      isSubToApproval: false,				//是否提交公示
      isSubToFinish: false,				//是否提交审批
      isSelect: true,	//是否是查看页面
      record: [],
      isNoParent: true,
      handlingCommentsList: {  //通用处理意见的集合
        id: "",
        result: "",		//处理结果
        material: "",   //材料
        remark: ""		//备注
      },
      checkedFamilyData1: [], //用于监护人信息添加
      currListStyle: "ETJBQK",
      fatherDom_Top: "",
      DTBGSH_ImgArr: [], // 困境儿童动态变更 审核节点 审核图片数组
      imgInfo: {},
    }
  },
  watch: {
    xzqhArray (newA, oldA) {
      let qu = newA[0].split("#")[0]
      let zhen = newA[1].split("#")[0]
      let cun = newA[2].split("#")[0]
      let divisioncode = newA[2].split("#")[1]
      this.dibaoForm.basicInfo.completeDivisionCode = newA[0] + "," + newA[1] + "," + newA[2]
      this.dibaoForm.basicInfo.district = qu
      this.dibaoForm.basicInfo.townStreet = zhen
      this.dibaoForm.basicInfo.village = cun
      this.dibaoForm.basicInfo.divisionCode = divisioncode
    }
  },

  created () {
    if (this.$route.query.type == "退回") {
      this.isSelect = false
      this.isReturn = true
    }
    if (this.$route.query.type == "审核") {
      this.isSelect = false
      this.isSubToApproval = true
    }
    if (this.$route.query.type == "审批") {
      this.isSelect = false
      this.isSubToFinish = true
    }
    if (this.$route.query.type == "变更") {
      this.isChangeRecord = true
      this.getChildChangeRecord({
        id: this.$route.query.changeId
      }).then(res => {

      }).catch(res => {
        this.changeRecord = res.response.data.data
      })
    }
    this.getChildRecord({
      id: this.$route.query.id,
    }).then(res => {

    }).catch(res => {
      console.log(res.response)
      this.record = res.response.data.data
    });
    this.getBasic({
      id: this.$route.query.id,
    }).then(res => {
    }).catch(res => {
      if (res && res.response && res.response.data && res.response.data.status === "+OK") {
        let data = res.response.data.data
        //console.log(JSON.stringify(res.response.data))
        this.dibaoForm = data
        if (this.dibaoForm && this.dibaoForm.familyInfo && !this.dibaoForm.familyInfo.typesOfPoverty) this.dibaoForm.familyInfo.typesOfPoverty = []
        // return console.log(this.dibaoForm.materials,"this.dibaoForm.materials")
        if (this.dibaoForm.basicInfo.headImage) this.uploadImg.childPhoto.push(this.dibaoForm.basicInfo.headImage)
        // 身份证 户口本 其他材料 图片回显
        if (this.dibaoForm.materials.length && this.dibaoForm.materials[1] && this.dibaoForm.materials[1].value) this.materials.parentValue = this.uploadImg.parentValue_img = this.dibaoForm.materials[1].value.split(",")
        if (this.dibaoForm.materials.length && this.dibaoForm.materials[2] && this.dibaoForm.materials[2].value) this.materials.otherValue = this.uploadImg.otherValue_img = this.dibaoForm.materials[2].value.split(",")
        if (this.dibaoForm.materials.length && this.dibaoForm.materials[0] && this.dibaoForm.materials[0].value) this.materials.childValue = this.uploadImg.childValue_img = this.dibaoForm.materials[0].value.split(",")
        // 获取图片数量
        this.getImgNum()
        this.isOk = true
        let xzqhArray = this.dibaoForm.basicInfo.completeDivisionCode ? this.dibaoForm.basicInfo.completeDivisionCode.split(",") : [];
        // 行政区划回显
        if (xzqhArray.length == 3) {
          this.$set(this.xzqhArray, 0, xzqhArray[0]);
          this.$set(this.xzqhArray, 1, xzqhArray[1]);
          this.$set(this.xzqhArray, 2, xzqhArray[2]);
          this.$set(this.test, "xzqhArray", xzqhArray);
        } else {
          this.xzqhArray = []
        }
        // 相关经历
        this.typeOfJuvenileDelinquent = this.dibaoForm.basicInfo.typeOfJuvenileDelinquent ? this.dibaoForm.basicInfo.typeOfJuvenileDelinquent.split(',') : [];
        this.typeOfEncounteringEmergencies = this.dibaoForm.basicInfo.typeOfEncounteringEmergencies ? this.dibaoForm.basicInfo.typeOfEncounteringEmergencies.split(',') : [];
        if (this.dibaoForm.basicInfo.educationStage && this.dibaoForm.basicInfo.educationType) {
          this.education = [this.dibaoForm.basicInfo.educationStage, this.dibaoForm.basicInfo.educationType];
        }
        if (this.dibaoForm.basicInfo.tutorialClass) {
          this.tutorialClass = [this.dibaoForm.basicInfo.tutorialClass, this.dibaoForm.basicInfo.typeOfTutorialClass];
        } else {
          this.tutorialClass = [this.dibaoForm.basicInfo.tutorialClass];
        }
        this.typeOfInfringed = this.dibaoForm.basicInfo.typeOfInfringed ? this.dibaoForm.basicInfo.typeOfInfringed.split(',') : [];
        this.isFinish = true;
      } else {
        this.$message.error(res.response.data.msg)
      }
    })
  },
  methods: {
    handleAddDetails (str) {
      let obj = {};
      if (str == 'familyData1') {
        if (this.dibaoForm.familyInfo.guardians == undefined) {
          this.dibaoForm.familyInfo.guardians = [];
        }
        obj = {
          actualGuardianCardId: '',
          actualGuardianEducationalLevel: '',
          actualGuardianHealthStatus: '',
          actualGuardianName: '',
          actualGuardianTel: '',
          intimacy: '',
          relationshipWithChildren: '',
          whetherCohabitation: true
        };
        this.dibaoForm.familyInfo.guardians.push(obj);
      }
    },
    // 根据str找table删除选中行
    handleDelDetails (str) {
      let obj;
      let old;
      if (str == 'familyData1') {
        obj = this.checkedFamilyData1;
        console.log(obj, "fam1");
        old = this.dibaoForm.familyInfo.guardians;
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
    //是否显示父母信息
    isShowParentInfo () {
      if (this.dibaoForm.familyInfo.whetherNoParentInfo) {
        this.isNoParent = false
      } else {
        this.isNoParent = true
      }
    },
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
      } catch (e) {
      }
    },
    // 菜单点击事件
    counter (id) { //counter1是绑定的点击事件名称
      document.querySelector(id).scrollIntoView(true);
    },
    loadData () {
      this.isFinish = false;
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
      this.isShow23 = true;		//审批记录
      this.isShow24 = true;		//变更记录
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
      } else if (n == 24) {
        this.isShow24 = false;
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
      this.imgInfo = JSON.parse(item)
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
      if (data) this.DTBGSH_ImgArr.push(data)
      // if (this.$route.query.rype = '审批' && this.$route.query.changeId || this.$route.query.cancelId) return this.DTBGSH_ImgArr.push(data)
      // // if (this.$route.query.rype = '审批' && this.$route.query.cancelId) return this.DTBGSH_ImgArr.push(data)
      // console.log("event" + data);
      // let val = this.materials[this.uploadId];
      // val = val == "" ? data : val + "," + data;
      // this.materials[this.uploadId] = val;
      // this.uploadImg[this.uploadId + "_img"] = val.split(",");
      // this.getImgNum()
    },
    uploadEvent2 () {
      this.uploadImg[this.uploadId + "_img"] = this[this.uploadDataName][this.uploadId].split(",");
      this.uploadDataName = null;
      console.log("event2" + this.uploadImg[this.uploadId + "_img"]);
      this.getImgNum()   // 获取图片数量
    },
    // 删除事件
    handleRemove (file, str, imgInfo) {
      // 如果图片数组中没有图片
      if (!this.DTBGSH_ImgArr.length) return
      this.$confirm('是否删除该图片？', "提示", {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        if (!imgInfo.id) return this.DTBGSH_ImgArr.shift()
        // 有下标删除下标值
        this.DTBGSH_ImgArr = this.DTBGSH_ImgArr.filter((item, index) => index !== imgInfo.index)
      }).catch(action => {
        console.log("留在本页");
      });
    },
    //点击保存处理意见
    async subClick () {
      let type = this.$route.query.type
      let childID = this.$route.query.id
      let changeID = this.$route.query.changeId
      let cancelID = this.$route.query.cancelId
      let newResult = this.handlingCommentsList.result;
      // let status = this.$route.query.type;
      // 处理意见
      let portObject = {
        id: changeID,
        material: this.DTBGSH_ImgArr.join(),
        remark: this.handlingCommentsList.remark,
        result: this.handlingCommentsList.result,
      }
      if (changeID && type === '审核') {
        this.childChangeSubmitApproval(portObject)
        return console.log('困境儿童change审核提交按钮')
      } else if (changeID && type === '审批') {
        this.childChangeSubmitClose(portObject)
        return console.log('困境儿童change审批提交按钮')
      } else if (cancelID && type === '审核') {
        portObject.id = cancelID
        this.childCancelSubmitApproval(portObject)
        console.log(this.handlingCommentsList.result, this.handlingCommentsList.remark, this.DTBGSH_ImgArr)
        return console.log('困境儿童cancel审核提交按钮')
      } else if (cancelID && type === '审批') {
        portObject.id = cancelID
        this.childCancelSubmitClose(portObject)
        console.log(this.handlingCommentsList.result, this.handlingCommentsList.remark, this.DTBGSH_ImgArr)
        return console.log('困境儿童cancel审批提交按钮')
      } else if (type === '审核' && !changeID && !cancelID) {
        portObject.id = childID
        return this.childSubmitApproval(portObject)
      } else if (type === '审批' && !changeID && !cancelID) {
        portObject.id = childID
        return this.childSubmitClose(portObject)
      }
      // 如果是退回页面
      else if (type == "退回") {
        portObject.id = this.$route.query.id
        if (newResult === '同意') {
          this.saveReturn(portObject).then(res => {
          }).catch(res => {
            if (res.response.data.status == "+OK") {
              this.closeView();
              return this.$message.success(res.response.data.msg)
            }
            this.$message.error(res.response.data.msg)
          });
        } else if (newResult === '退回重新核查') {
          this.returnCheckDispatch(portObject).then(res => {
          }).catch(res => {
            if (res.response.data.status == "+OK") {
              this.closeView();
              return this.$message.success(res.response.data.msg)
            }
            this.$message.error(res.response.data.msg)
          })
        }
      }
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
    //保存退回意见
    saveReturn (data) {
      return request({
        headers: {
          'Accept': 'application/json',
        },
        url: "/social/child/childReturn",
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
        url: "/social/child/childSubmitApproval",
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
        url: "/social/child/childSubmitClose",
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
    //获取审批记录
    getChildRecord (data) {
      return request({
        headers: {
          Accept: "application/json",
        },
        url: "/social/child/getChildRecord",
        method: "post",
        data: data,
      });
    },
    //获取变更记录
    getChildChangeRecord (data) {
      return request({
        headers: {
          Accept: "application/json",
        },
        url: "/social/childChange/getChildChangeItem",
        method: "post",
        data: data,
      });
    },
    onScroll () {
      // 这里做了个兜底 保障在dom滚动的时候如果下面dom不存在会报错的情况
      let ETJBQK = document.querySelector("#page1") || "" // 儿童基本情况
      let STQK = document.querySelector("#page2") || ""
      let JYQK = document.querySelector("#page3") || ""
      let XGJL = document.querySelector("#page4") || ""
      let FMQK = document.querySelector("#page6") || ""
      let SJJHRQK = document.querySelector("#page7") || ""
      let JTJJQK = document.querySelector("#page9") || ""
      let CZGAXQ = document.querySelector("#page10") || ""
      let SHBZQK = document.querySelector("#page14") || ""
      let JYZZQK = document.querySelector("#page5") || ""
      let YLJZQK = document.querySelector("#page15") || ""
      let KFJZQK = document.querySelector("#page16") || ""
      let SFYZQK = document.querySelector("#page17") || ""
      let QTZZJSHGAQK = document.querySelector("#page18") || ""
      let SFZJQTZMCL = document.querySelector("#page13") || ""
      let SPJL = document.querySelector("#page23") || ""
      let BGJL = document.querySelector("#page24") || ""
      let THYJ = document.querySelector("#page20") || ""
      let TJSHYJ = document.querySelector("#page21") || ""
      let TJSPYJ = document.querySelector("#page22") || ""
      let KJETSPZX = document.querySelector("#pagezx") || ""
      if (ETJBQK && Math.abs(ETJBQK.getBoundingClientRect().top - this.fatherDom_Top) < 25) this.currListStyle = "ETJBQK"
      if (KJETSPZX && Math.abs(KJETSPZX.getBoundingClientRect().top - this.fatherDom_Top) < 25) this.currListStyle = "KJETSPZX"
      if (STQK && Math.abs(STQK.getBoundingClientRect().top - this.fatherDom_Top) < 25) this.currListStyle = "STQK"
      if (JYQK && Math.abs(JYQK.getBoundingClientRect().top - this.fatherDom_Top) < 25) this.currListStyle = "JYQK"
      if (XGJL && Math.abs(XGJL.getBoundingClientRect().top - this.fatherDom_Top) < 25) this.currListStyle = "XGJL"
      if (FMQK && Math.abs(FMQK.getBoundingClientRect().top - this.fatherDom_Top) < 25) this.currListStyle = "FMQK"
      if (SJJHRQK && Math.abs(SJJHRQK.getBoundingClientRect().top - this.fatherDom_Top) < 25) this.currListStyle = "SJJHRQK"
      if (JTJJQK && Math.abs(JTJJQK.getBoundingClientRect().top - this.fatherDom_Top) < 25) this.currListStyle = "JTJJQK"
      if (CZGAXQ && Math.abs(CZGAXQ.getBoundingClientRect().top - this.fatherDom_Top) < 25) this.currListStyle = "CZGAXQ"
      if (SHBZQK && Math.abs(SHBZQK.getBoundingClientRect().top - this.fatherDom_Top) < 25) this.currListStyle = "SHBZQK"
      if (JYZZQK && Math.abs(JYZZQK.getBoundingClientRect().top - this.fatherDom_Top) < 25) this.currListStyle = "JYZZQK"
      if (YLJZQK && Math.abs(YLJZQK.getBoundingClientRect().top - this.fatherDom_Top) < 25) this.currListStyle = "YLJZQK"
      if (KFJZQK && Math.abs(KFJZQK.getBoundingClientRect().top - this.fatherDom_Top) < 25) this.currListStyle = "KFJZQK"
      if (SFYZQK && Math.abs(SFYZQK.getBoundingClientRect().top - this.fatherDom_Top) < 25) this.currListStyle = "SFYZQK"
      if (QTZZJSHGAQK && Math.abs(QTZZJSHGAQK.getBoundingClientRect().top - this.fatherDom_Top) < 25) this.currListStyle = "QTZZJSHGAQK"
      if (SFZJQTZMCL && Math.abs(SFZJQTZMCL.getBoundingClientRect().top - this.fatherDom_Top) < 25) this.currListStyle = "SFZJQTZMCL"
      if (SPJL && Math.abs(SPJL.getBoundingClientRect().top - this.fatherDom_Top) < 25) this.currListStyle = "SPJL"
      if (BGJL && Math.abs(BGJL.getBoundingClientRect().top - this.fatherDom_Top) < 25) this.currListStyle = "BGJL"
      if (THYJ && Math.abs(THYJ.getBoundingClientRect().top - this.fatherDom_Top) < 25) this.currListStyle = "THYJ"
      if (TJSHYJ && Math.abs(TJSHYJ.getBoundingClientRect().top - this.fatherDom_Top) < 25) this.currListStyle = "TJSHYJ"
      if (TJSPYJ && Math.abs(TJSPYJ.getBoundingClientRect().top - this.fatherDom_Top) < 25) this.currListStyle = "TJSPYJ"
    },
    changeCurrStyle (id, curr) {
      this.currListStyle = curr
      document.querySelector(id).scrollIntoView(true);
    },
    // 注销功能
    async affirmCancel () {
      if (!this.$route.query.id) return this.$message.error("未获取到儿童ID请稍后重试！")
      try {
        await createChildCancelApi(this.$route.query.id, this.cancelInfo)
      } catch (error) {
        if (error && error.response.data.status === "+OK") {
          this.routerGoBack()
          return console.log(this.$route.query.id, "该儿童信息注销成功")
        }
        this.$message.error(error.response.data.msg)
      }
    },
    // 返回上一级页面
    routerGoBack () {
      this.$router.go(-1)
      // 部署到泰州社救系统需要再次返回一次 否则会出现空白画面
      if (process.env.NODE_ENV != 'development') this.$router.go(-1)
    },
    // 困境儿童变更 审核提交到审批 根据变更ID
    async childChangeSubmitApproval (data) {
      try {
        await childChangeSubmitApprovalApi(data)
      } catch (error) {
        this.portObjectRes(error)
      }
    },
    // 困境儿童变更 审批提交到办结  根据变更ID
    async childChangeSubmitClose (data) {
      try {
        await childChangeSubmitCloseApi(data)
      } catch (error) {
        this.portObjectRes(error)
      }
    },
    // 困境儿童注销模块 审核提交到审批  根据注销ID
    async childCancelSubmitApproval (data) {
      try {
        await childCancelSubmitApprovalApi(data)
      } catch (error) {
        this.portObjectRes(error)
      }
    },
    // 困境儿童注销模块 审批提交到办结 根据注销ID
    async childCancelSubmitClose (data) {
      try {
        await childCancelSubmitCloseApi(data)
      } catch (error) {
        this.portObjectRes(error)
      }
    },
    // 困境儿童审核提交 根据儿童ID
    async childSubmitApproval (data) {
      try {
        await childSubmitApprovalApi(data)
      } catch (error) {
        this.portObjectRes(error)
      }
    },
    // 困境儿童审批提交 根据儿童ID
    async childSubmitClose (data) {
      try {
        await childSubmitCloseApi(data)
      } catch (error) {
        this.portObjectRes(error)
      }
    },
    portObjectRes (error) {
      error && this.$message.success(error.response.data.msg)
      if (error.response.data.status === "+OK") this.routerGoBack()
    },
    // 监听父母状态的改变
    parentChangeType (e, val) {
      console.log(e, val)
    }
  },
  mounted () {
    this.$refs.info2.addEventListener("scroll", this.onScroll)
    this.fatherDom_Top = this.$refs.info2.getBoundingClientRect().top
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
<style lang="less" scoped>
.right-ul li {
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
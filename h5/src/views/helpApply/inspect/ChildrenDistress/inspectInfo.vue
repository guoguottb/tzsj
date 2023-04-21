<template>
  <div class="maxBox">
    <van-form ref='rule1'
              v-model="userInfo">
      <van-tabs v-model="active"
                sticky
                color="#fff"
                title-active-color="#fff"
                title-inactive-color="#323233"
                background="#3e80cc">
        <!-- #3e80cc -->
        <!-- 儿童基本情况 -->
        <van-tab title="儿童基本情况"
                 name="1">
          <!-- 收养状态 -->
          <van-field required
                     readonly
                     clickable
                     :value="userInfo.basicInfo.adoptedTypeStr"
                     label="收养状态"
                     is-link
                     placeholder="点击选择收养状态"
                     @click="showSelect('收养状态')"
                     :rules="[{ required: true, message: '请选择儿童基本情况下的收养状态' }]" />
          <!-- 是否患有艾滋病 -->
          <van-field name="radio"
                     label="是否患艾滋病"
                     required
                     :rules="[{ required: true, message: '请选择儿童基本情况下的是否患艾滋病' }]">
            <template #input>
              <!-- ETAZB -->
              <!-- userInfo.basicInfo.sufferingFromAids -->
              <van-radio-group v-model="ETAZB"
                               direction="horizontal">
                <van-radio name="是">是</van-radio>
                <van-radio name="否">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <!-- /^(?:[\u4e00-\u9fa5·]{2,16})$/ -->
          <!-- 儿童姓名 -->
          <van-field v-model="userInfo.basicInfo.name"
                     required
                     maxlength="10"
                     label="姓名"
                     placeholder="姓名"
                     :rules="[{ required: true, message: '请填写儿童基本情况下的儿童姓名' },{pattern:/^(?:[\u4e00-\u9fa5·]{2,16})$/, message: '儿童基本情况下的儿童姓名格式错误！'}]">
            <template #button>
              <van-uploader :before-read="beforeRead"
                            :after-read="uploadImg('IDCard')"
                            :before-delete="beforeDelete('photo')">
                <van-button size="small"
                            type="info"
                            native-type="button">拍照识别
                </van-button>
              </van-uploader>
            </template>
          </van-field>
          <!-- 儿童曾用名 -->
          <van-field v-model="userInfo.basicInfo.formerName"
                     maxlength="10"
                     label="曾用名"
                     placeholder="请输入曾用名">
          </van-field>
          <!-- 联系电话 -->
          <van-field v-model="userInfo.basicInfo.phone"
                     required
                     label="联系电话"
                     placeholder="联系电话"
                     :rules="[{ required: true, message: '请填写儿童基本情况下的联系电话'},{ pattern: /^(?:(?:\+|00)86)?1\d{10}$/, message: '儿童基本情况下的联系电话格式错误！'}]" />
          <!-- 身份证 -->
          <van-field v-model="userInfo.basicInfo.idCard"
                     required
                     label="身份证号"
                     placeholder="身份证号"
                     :rules="[{ required: true, message: '请填写儿童基本情况下的身份证号'},{ pattern: /^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))(\d|X|x)$/, message: '儿童基本情况下的儿童身份证格式错误！'}]" />
          <!-- 性别 -->
          <van-field name="radio"
                     label="性别"
                     required
                     :rules="[{ required: true, message: '请选择儿童基本情况下的儿童性别'}]">
            <template #input>
              <van-radio-group v-model="userInfo.basicInfo.gender"
                               direction="horizontal">
                <van-radio name="男">男</van-radio>
                <van-radio name="女">女</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <!-- <van-field v-model="userInfo.basicInfo.birth"
          required
          label="出生日期"
          placeholder="出生日期"
          :rules="[{ required: true, message: '请选择出生日期'}]" /> -->
          <!-- 出生日期 -->
          <van-field readonly
                     clickable
                     name="datetimePicker"
                     :value="userInfo.basicInfo.birth"
                     label="出生日期"
                     placeholder="点击选择出生日期"
                     @click="showPicker7 = true" />
          <van-popup v-model="showPicker7"
                     position="bottom">
            <van-datetime-picker v-model="currentDate"
                                 type="date"
                                 title="选择年月日"
                                 :min-date="minDate7"
                                 :max-date="maxDate7"
                                 @confirm="showPicker7Confirm"
                                 @cancel="showPicker7 = false" />
          </van-popup>
          <!-- 民族 -->
          <van-field required
                     readonly
                     clickable
                     :value="userInfo.basicInfo.nation"
                     label="民族"
                     is-link
                     placeholder="点击选择民族"
                     @click="showSelect('民族')"
                     :rules="[{ required: true, message: '请选择儿童基本情况下的民族类型' }]" />
          <!-- 行政区划 -->
          <van-field v-model="areaName"
                     required
                     center
                     readonly
                     label="行政区划"
                     placeholder="请选择所在行政区划"
                     @click="areaShow = true"
                     :rules="[{ required: true, message: '请选择儿童基本情况下的行政区划' }]">
          </van-field>
          <van-popup v-model="areaShow"
                     round
                     position="bottom">
            <van-cascader title="请选择所在行政区划"
                          :options="options"
                          @close="areaShow = false"
                          @finish="onFinish" />
          </van-popup>
          <!-- 户籍类型 -->
          <van-field required
                     readonly
                     clickable
                     :value="userInfo.basicInfo.censusRegisterType"
                     label="户籍类型"
                     is-link
                     placeholder="点击选择户籍类型"
                     @click="showSelect('户籍类型')"
                     :rules="[{ required: true, message: '请选择户籍类型' }]" />
          <!-- 户籍地址 -->
          <van-field v-model="userInfo.basicInfo.censusRegisterAddress"
                     required
                     label="户籍地址"
                     placeholder="请填写户籍地址"
                     :rules="[{ required: true, message: '请填写户籍地址'},{pattern:/[a-zA-Z0-9_\u4e00-\u9fa5]+/, message: '户籍类型只能有大小写字母,汉字,数字'}]" />
          <!-- 居住地址 -->
          <van-field v-model="userInfo.basicInfo.residentialAddress"
                     required
                     label="居住地址"
                     placeholder="请填写居住地址"
                     :rules="[{ required: true, message: '请填写儿童基本情况下的居住地址'},{pattern:/[a-zA-Z0-9_\u4e00-\u9fa5]+/, message: '儿童基本情况下的居住地址只能有大小写字母,汉字,数字'}]" />
          <!-- 行为能力 -->
          <van-field name="radio"
                     label="完全行为能力"
                     required
                     :rules="[{ required: true, message: '请选择儿童基本情况下的是否完全行为能力'}]">
            <template #input>
              <!-- ETWQXNL -->
              <!-- userInfo.basicInfo.haveFullCapacity -->
              <van-radio-group v-model="ETWQXNL"
                               direction="horizontal">
                <van-radio name="是">是</van-radio>
                <van-radio name="否">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <!-- 是否在校 -->
          <van-field name="radio"
                     label="是否在校"
                     required
                     :rules="[{ required: true, message: '请选择儿童基本情况下的是否在校'}]">
            <template #input>
              <!-- ETZX -->
              <!-- userInfo.basicInfo.whetherInSchool -->
              <van-radio-group v-model="ETZX"
                               direction="horizontal">
                <van-radio name="是">是</van-radio>
                <van-radio name="否">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <!-- 生活状况简述 -->
          <!-- required -->
          <!-- :rules="[{ required: true, message: '请填写儿童基本情况下的生活状况简述'},{pattern:/[\u4e00-\u9fa5]+/, message: '儿童基本情况下的生活状况简述只能有汉字'}]"  -->
          <van-field v-model="userInfo.basicInfo.livingDesc"
                     required
                     type="text"
                     label="生活状况简述"
                     :rules="[{ required: true, message: '请填写生活状况简述'}]"
                     placeholder="生活状况简述" />
          <!-- 儿童主任姓名 -->
          <van-field v-model="userInfo.basicInfo.childrenDirectorName"
                     label="儿童主任姓名"
                     placeholder="儿童主任姓名" />
          <!-- 儿童主任电话 -->
          <van-field v-model="userInfo.basicInfo.childrenDirectorTel"
                     type="number"
                     label="儿童主任电话"
                     placeholder="儿童主任电话" />
          <!-- 街镇联系电话 -->
          <van-field v-model="userInfo.basicInfo.townStreetPhone"
                     type="number"
                     label="街镇联系电话"
                     placeholder="街镇联系电话" />
          <!-- 村居联系电话 -->
          <van-field v-model="userInfo.basicInfo.villagePhone"
                     type="number"
                     label="村居联系电话"
                     placeholder="村居联系电话" />
        </van-tab>

        <!-- 身份证及其他证明材料 -->
        <van-tab title="身份证及其他证明材料"
                 name="15">
          <!-- 上传儿童头像照片 -->
          <div class="page6Div5">
            <div class="page4Img2Font">儿童头像照片:</div>
            <div class="page4Img2Div">
              <div style="position:relative;width:91%;float: left;">
                <van-uploader v-model="fileList4"
                              :max-count="1"
                              :after-read="myAfterRead4"
                              :before-delete="myBeforeDelete4"
                              multiple />
              </div>
            </div>
          </div>
          <!-- 上传儿童身份证明材料 -->
          <div class="page6Div5">
            <div class="page4Img2Font">身份证证明材料:</div>
            <div class="page4Img2Div">
              <div style="position:relative;width:91%;float: left;">
                <van-uploader v-model="fileList1"
                              :after-read="myAfterRead1"
                              :before-delete="myBeforeDelete1"
                              multiple />
              </div>
            </div>
          </div>
          <!-- 上传儿童父母身份证明材料 -->
          <div class="page6Div5">
            <div class="page4Img2Font">儿童户口本证明材料:</div>
            <div class="page4Img2Div">
              <div style="position:relative;width:91%;float: left;">
                <van-uploader v-model="fileList2"
                              :after-read="myAfterRead2"
                              :before-delete="myBeforeDelete2"
                              multiple />
              </div>
            </div>
          </div>
          <!-- 上传其他材料 -->
          <div class="page6Div5">
            <div class="page4Img2Font">其他材料:</div>
            <div class="page4Img2Div">
              <div style="position:relative;width:91%;float: left;">
                <van-uploader v-model="fileList3"
                              :after-read="myAfterRead3"
                              :before-delete="myBeforeDelete3"
                              multiple />
              </div>
            </div>
          </div>
        </van-tab>
        <!-- 身体状况 -->
        <van-tab title="身体状况"
                 name="2">
          <!-- 是否健康 -->
          <van-field name="radio"
                     label="是否健康"
                     required
                     :rules="[{ required: true, message: '儿童基本情况下的是否健康不可为空'}]">
            <template #input>
              <!-- STJK -->
              <!-- userInfo.basicInfo.whetherHealth -->
              <van-radio-group v-model="STJK"
                               direction="horizontal">
                <van-radio name="是">是</van-radio>
                <van-radio name="否">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <!-- 是否重病 -->
          <van-field name="radio"
                     label="是否重病"
                     required
                     :rules="[{ required: true, message: '请选择身体状况下的是否重病'}]">
            <template #input>
              <!-- STZB -->
              <!-- userInfo.basicInfo.whetherSeriousIllness -->
              <van-radio-group v-model="STZB"
                               direction="horizontal">
                <van-radio name="是">是</van-radio>
                <van-radio name="否">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <template v-if="STZB ==='是'">
            <!-- 重病类型 -->
            <van-field required
                       readonly
                       clickable
                       :value="userInfo.basicInfo.seriousIllnessType"
                       label="重病类型"
                       is-link
                       placeholder="点击选择重病类型"
                       @click="showSelect('重病类型')"
                       :rules="[{ required: true, message: '请选择身体状况下的重病类型' }]" />
          </template>
          <!-- 是否患有残疾 -->
          <van-field name="radio"
                     label="是否残疾"
                     required
                     :rules="[{ required: true, message: '请选择身体状况下的是否残疾'}]">
            <template #input>
              <!-- STCJ -->
              <!-- userInfo.basicInfo.whetherDisability -->
              <van-radio-group v-model="STCJ"
                               direction="horizontal">
                <van-radio name="是">是</van-radio>
                <van-radio name="否">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <!-- 如果残疾 -->
          <template v-if="STCJ ==='是'">
            <!-- 残疾类型 -->
            <van-field required
                       readonly
                       clickable
                       :value="userInfo.basicInfo.disabilityType"
                       label="残疾类型"
                       is-link
                       placeholder="点击选择残疾类型"
                       @click="showSelect('残疾类型')"
                       :rules="[{ required: true, message: '请选择身体状况下的残疾类型' }]" />
            <!-- 残疾等级 -->
            <van-field required
                       readonly
                       clickable
                       :value="disabilityClass"
                       label="残疾等级"
                       is-link
                       placeholder="点击选择残疾等级"
                       @click="showSelect('残疾等级')"
                       :rules="[{ required: true, message: '请选择身体状况下的残疾等级' }]" />
            <!-- 残疾救助方式 -->
            <van-field v-model="userInfo.basicInfo.disabilityRescueMode"
                       label="残疾救助方式"
                       placeholder="残疾救助方式" />
            <!-- 其他残疾类型情况说明 -->
            <van-field v-model="userInfo.basicInfo.descriptionOfDisability"
                       label="其他残疾类型情况说明"
                       placeholder="其他残疾类型情况说明" />
          </template>
        </van-tab>
        <!-- 教育情况 -->
        <van-tab title="教育情况"
                 name="3">
          <!-- 教育情况类型 -->
          <van-field readonly
                     clickable
                     required
                     :value="userInfo.basicInfo.educationType"
                     label="教育情况类型"
                     is-link
                     placeholder="点击选择教育情况类型"
                     @click="showSelect('教育情况类型')"
                     :rules="[{ required: true, message: '请选择教育情况下的教育情况类型' }]" />
          <!-- 参加课外辅导班 -->
          <van-field readonly
                     clickable
                     :value="KWFDB"
                     label="是否参加课外辅导班"
                     is-link
                     placeholder="点击选择课外辅导班情况"
                     @click="showSelect('课外辅导班')" />
          <!-- 学校名称 -->
          <van-field v-model="userInfo.basicInfo.schoolName"
                     label="学校名称"
                     placeholder="学校名称" />
          <!-- 入学时间 -->
          <van-field readonly
                     v-if="['高中','高等教育'].includes(userInfo.basicInfo.educationType)"
                     clickable
                     name="datetimePicker"
                     :value="userInfo.basicInfo.admissionDate"
                     label="入学时间"
                     placeholder="高中及以后需要选择入学时间"
                     @click="showPicker8 = true" />
          <van-popup v-model="showPicker8"
                     position="bottom">
            <van-datetime-picker v-model="currentDate"
                                 type="date"
                                 title="选择年月日"
                                 :min-date="minDate"
                                 :max-date="maxDate"
                                 @confirm="showPicker8Confirm"
                                 @cancel="showPicker8 = false" />
          </van-popup>
          <!-- 受教学制(年) -->
          <van-field v-model="userInfo.basicInfo.schoolSystem"
                     type="number"
                     label="受教学制(年)"
                     @change="lengthOfSchoolingChange"
                     placeholder="请输入受教学制" />
          <!-- 受教学年 -->
          <!-- <van-field v-model="userInfo.basicInfo.schoolName"
                     label="受教学年"
                     placeholder="请输入受教学年" /> -->
          <van-field name="radio"
                     label="受教学年">
            <template #input>
              <van-radio-group v-model="userInfo.basicInfo.schoolYear"
                               direction="horizontal">
                <van-radio name="上半年">上半年</van-radio>
                <van-radio name="下半年">下半年</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <!-- 年级（班级） -->
          <van-field v-model="userInfo.basicInfo.gradeClass"
                     label="年级（班级）"
                     placeholder="年级（班级）" />
          <!-- 负责老师名称 -->
          <van-field v-model="userInfo.basicInfo.teacher"
                     label="负责老师名称"
                     placeholder="负责老师名称" />
          <!-- 老师联系电话 -->
          <van-field v-model="userInfo.basicInfo.teacherTel"
                     type="number"
                     label="老师联系电话"
                     placeholder="请输入老师联系电话" />
        </van-tab>
        <!-- 相关经历 -->
        <van-tab title="相关经历"
                 name="4">
          <!-- 是否有相关特殊经历 -->
          <van-field name="radio"
                     label="是否有相关特殊经历">
            <template #input>
              <!-- XGTSJL -->
              <van-radio-group v-model="XGTSJL"
                               direction="horizontal">
                <van-radio name="是">是</van-radio>
                <van-radio name="否">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <!-- 相关特殊经历 -->
          <template v-if="XGTSJL === '是'">
            <!-- 遭受侵害类型 -->
            <van-field name="checkboxGroup"
                       label="遭受侵害类型">
              <template #input>
                <van-checkbox-group v-model="userInfo.basicInfo.typeOfInfringedArr"
                                    direction="horizontal">
                  <van-checkbox name="性侵害"
                                shape="square">性侵害</van-checkbox>
                  <van-checkbox name="拐卖"
                                shape="square">拐卖</van-checkbox>
                  <van-checkbox name="遗弃"
                                shape="square">遗弃</van-checkbox>
                  <van-checkbox name="虐待"
                                shape="square">虐待</van-checkbox>
                  <van-checkbox name="暴力伤害"
                                shape="square">暴力伤害</van-checkbox>
                  <van-checkbox name="其他"
                                shape="square">其他</van-checkbox>
                </van-checkbox-group>
              </template>
            </van-field>
            <!-- 遭受侵害简述 -->
            <van-field v-model="userInfo.basicInfo.infringedSketch"
                       label="遭受侵害简述"
                       placeholder="请输入遭受侵害简述" />
            <!-- 失足未成年人 -->
            <van-field name="checkboxGroup"
                       label="失足未成年人">
              <template #input>
                <van-checkbox-group v-model="userInfo.basicInfo.typeOfJuvenileDelinquentArr"
                                    direction="horizontal">
                  <van-checkbox name="追究刑事责任"
                                shape="square">追究刑事责任</van-checkbox>
                  <van-checkbox name="治安拘留"
                                shape="square">治安拘留</van-checkbox>
                  <van-checkbox name="附条件不诉"
                                shape="square">附条件不诉</van-checkbox>
                </van-checkbox-group>
              </template>
            </van-field>
            <!-- 	失足情况简述 -->
            <van-field v-model="userInfo.basicInfo.juvenileDelinquentSketch"
                       label="	失足情况简述"
                       placeholder="请输入失足情况简述" />
            <!-- 遭遇困境类型 -->
            <van-field name="checkboxGroup"
                       label="遭遇困境类型">
              <template #input>
                <van-checkbox-group v-model="userInfo.basicInfo.typeOfEncounteringEmergenciesArr"
                                    direction="horizontal">
                  <van-checkbox name="火灾"
                                shape="square">火灾</van-checkbox>
                  <van-checkbox name="爆炸"
                                shape="square">爆炸</van-checkbox>
                  <van-checkbox name="附条件不诉"
                                shape="square">交通事故</van-checkbox>
                  <van-checkbox name="人身伤害"
                                shape="square">人身伤害</van-checkbox>
                  <van-checkbox name="其他"
                                shape="square">其他</van-checkbox>
                </van-checkbox-group>
              </template>
            </van-field>
            <!-- 遭遇困境情况简述 -->
            <van-field v-model="userInfo.basicInfo.encounteringEmergenciesSketch"
                       label="遭遇困境情况简述"
                       placeholder="请输入遭遇困境情况简述" />
            <!-- 流浪儿童类型 -->
            <van-field readonly
                       clickable
                       name="ab_ex192"
                       :value="userInfo.basicInfo.typeOfStreetChildren"
                       label="流浪儿童类型"
                       is-link
                       placeholder="请选择流浪儿童类型"
                       @click="showSelect('流浪儿童类型')" />
            <!-- 流浪儿童情况简述 -->
            <van-field v-model="userInfo.basicInfo.streetChildrenSketch"
                       label="流浪儿童情况简述"
                       placeholder="请输入流浪儿童情况简述" />
          </template>
        </van-tab>
        <!-- 父母情况 -->
        <van-tab title="父母情况"
                 name="5">
          <template>
            <!-- -----------  父亲  --------------- -->
            <van-divider>父亲信息</van-divider>
            <!-- 父亲姓名 -->
            <van-field name="radio"
                       label="是否无父亲信息"
                       required
                       :rules="[{ required: true, message: '请选择父母情况下的是否无父亲信息'}]">
              <template #input>
                <!-- isFQXX -->
                <!-- userInfo.familyInfo.father.whetherNoParentInfo -->
                <van-radio-group v-model="isFQXX"
                                 direction="horizontal">
                  <van-radio name="是">是</van-radio>
                  <van-radio name="否">否</van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <template v-if="isFQXX === '否'">
              <van-field v-model="userInfo.familyInfo.father.name"
                         required
                         label="父亲姓名"
                         placeholder="请输入父亲姓名"
                         :rules="[{ required: true, message: '请填写父母情况下的父亲姓名' },{pattern:/^(?:[\u4e00-\u9fa5·]{2,16})$/, message: '父母情况下的父亲姓名格式错误！'}]" />
              <!-- 父亲身份证号 -->
              <van-field v-model="userInfo.familyInfo.father.cardId"
                         type="number"
                         label="父亲身份证号"
                         placeholder="请输入父亲身份证号" />
              <!-- 父亲联系电话 -->
              <!-- :rules="[{ required: true, message: '请输入父亲联系电话' }]" -->
              <van-field v-model="userInfo.familyInfo.father.tel"
                         type="number"
                         label="父亲联系电话"
                         placeholder="请输入父亲联系电话" />
              <!-- 父亲当前状况 -->
              <van-field required
                         readonly
                         clickable
                         :value="userInfo.familyInfo.father.type"
                         label="父亲当前状况"
                         is-link
                         placeholder="点击选择行为能力"
                         @click="showSelect('父亲当前状况')"
                         :rules="[{ required: true, message: '请选择父母情况下的父亲当前状况' }]" />
              <!-- <van-field name="uploader"
                         required
                         v-if="userInfo.familyInfo.father.type=== '重病' || userInfo.familyInfo.father.type=== '残疾'"
                         :label="`${userInfo.familyInfo.father.type}资料上传`">
                <template #input>
                  <van-uploader v-model="fatherStatusImg"
                                :max-count="6" />
                </template>
              </van-field> -->
              <!-- 父亲重病简述 -->
              <van-field v-model="userInfo.familyInfo.father.seriousIllnessDesc"
                         v-if="userInfo.familyInfo.father.type === '重病' || userInfo.familyInfo.father.type === '重病和残疾'"
                         label="父亲重病简述"
                         placeholder="请填写父亲重病简述" />
              <!-- 父亲残疾状况 -->
              <van-field readonly
                         clickable
                         v-if="userInfo.familyInfo.father.type === '残疾' || userInfo.familyInfo.father.type === '重病和残疾'"
                         :value="userInfo.familyInfo.father.disabilityStatus"
                         label="父亲残疾状况"
                         is-link
                         placeholder="点击选择父亲残疾状况"
                         @click="showSelect('父亲残疾状况')"
                         :rules="[{ required: true, message: '请选择父母情况下的父亲残疾状况' }]" />
              <!-- 父亲是否履行监护责任 -->
              <van-field name="radio"
                         label="是否履行监护责任">
                <template #input>
                  <van-radio-group v-model="userInfo.familyInfo.father.whetherPerformObligations"
                                   direction="horizontal">
                    <van-radio :name="true">是</van-radio>
                    <van-radio :name="false">否</van-radio>
                  </van-radio-group>
                </template>
              </van-field>
              <!-- 父亲不履行监护抚养责时间 -->
              <van-field readonly
                         v-if="!userInfo.familyInfo.father.whetherPerformObligations"
                         clickable
                         name="datetimePicker"
                         :value="userInfo.familyInfo.father.reportTime"
                         label="父亲不履行监护抚养责时间"
                         placeholder="点击选择父亲不履行监护抚养责时间"
                         @click="showPicker1 = true" />
              <van-popup v-model="showPicker1"
                         position="bottom">
                <van-datetime-picker v-model="currentDate"
                                     type="date"
                                     title="选择年月日"
                                     :min-date="minDate"
                                     :max-date="maxDate"
                                     @confirm="showPicker1Confirm"
                                     @cancel="showPicker1 = false" />
              </van-popup>
              <!-- 父亲服刑在押羁押时间 -->
              <template v-if="userInfo.familyInfo.father.type === '服刑在押'">
                <van-field readonly
                           clickable
                           name="datetimePicker"
                           :value="userInfo.familyInfo.father.detentionTime"
                           label="父亲服刑在押羁押时间"
                           placeholder="点击选择父亲服刑在押羁押时间"
                           @click="showPicker2 = true" />
                <van-popup v-model="showPicker2"
                           position="bottom">
                  <van-datetime-picker v-model="currentDate"
                                       type="date"
                                       title="选择年月日"
                                       :min-date="minDate"
                                       :max-date="maxDate"
                                       @confirm="showPicker2Confirm"
                                       @cancel="showPicker2 = false" />
                </van-popup>
                <!-- 父亲羁押期限(月) -->
                <van-field v-model="userInfo.familyInfo.father.termInCustody"
                           type="number"
                           label="父亲羁押期限(月)"
                           placeholder="请输入月数" />
              </template>
              <!-- 父亲强制戒毒隔离时间 -->
              <template v-if="userInfo.familyInfo.father.type === '强制戒毒'">
                <van-field readonly
                           clickable
                           name="datetimePicker"
                           :value="userInfo.familyInfo.father.isolationTime"
                           label="父亲强制戒毒隔离时间"
                           placeholder="请选择父亲强制戒毒隔离时间"
                           @click="showPicker3 = true" />
                <van-popup v-model="showPicker3"
                           position="bottom">
                  <van-datetime-picker v-model="currentDate"
                                       type="date"
                                       title="选择年月日"
                                       :min-date="minDate"
                                       :max-date="maxDate"
                                       @confirm="showPicker3Confirm"
                                       @cancel="showPicker3 = false" />
                </van-popup>
                <!-- 父亲戒毒期限(月) -->
                <van-field v-model="userInfo.familyInfo.father.isolationTimeRemaining"
                           label="父亲戒毒期限(月)"
                           placeholder="请输入月数" />
              </template>
              <!-- 是否有其他限制人身自由措施（父亲） -->
              <van-field name="radio"
                         label="是否有其他限制人身自由措施（父亲）">
                <template #input>
                  <van-radio-group v-model="userInfo.familyInfo.father.restrictionOfPersonalFreedom"
                                   direction="horizontal">
                    <van-radio :name="true">是</van-radio>
                    <van-radio :name="false">否</van-radio>
                  </van-radio-group>
                </template>
              </van-field>
              <!-- 其他情况(父亲)描述 -->
              <van-field v-model="userInfo.familyInfo.father.otherSituation"
                         label="其他情况(父亲)描述"
                         placeholder="请输入其他情况(父亲)描述" />
            </template>
            <!-- -----------  母亲  --------------- -->
            <van-divider>母亲信息</van-divider>
            <van-field name="radio"
                       label="是否无母亲信息"
                       required
                       :rules="[{ required: true, message: '请选择父母情况下的是否无母亲信息'}]">
              <template #input>
                <!-- isFQXX -->
                <!-- userInfo.familyInfo.father.whetherNoParentInfo -->
                <van-radio-group v-model="isMQXX"
                                 direction="horizontal">
                  <van-radio name="是">是</van-radio>
                  <van-radio name="否">否</van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <template v-if="isMQXX === '否'">
              <!-- 母亲姓名 -->
              <van-field v-model="userInfo.familyInfo.mother.name"
                         required
                         label="母亲姓名"
                         placeholder="请输入母亲姓名"
                         :rules="[{ required: true, message: '请填写父母情况下的母亲姓名' },{pattern:/^(?:[\u4e00-\u9fa5·]{2,16})$/, message: '父母情况下的母亲姓名格式错误！'}]" />
              <!-- 母亲身份证号 -->
              <van-field v-model="userInfo.familyInfo.mother.cardId"
                         label="母亲身份证号"
                         placeholder="请输入母亲身份证号" />
              <!-- 母亲联系电话 -->
              <!-- :rules="[{ required: true, message: '请输入父母情况下的母亲联系电话' }]"  -->
              <van-field v-model="userInfo.familyInfo.mother.tel"
                         type="number"
                         label="母亲联系电话"
                         placeholder="请输入母亲联系电话" />
              <!-- 母亲当前状况 -->
              <van-field required
                         readonly
                         clickable
                         :value="userInfo.familyInfo.mother.type"
                         label="母亲当前状况"
                         is-link
                         placeholder="点击选择母亲当前状况"
                         @click="showSelect('母亲当前状况')"
                         :rules="[{ required: true, message: '请选择父母情况下的母亲当前状况' }]" />
              <!-- 母亲重病简述 -->
              <van-field v-model="userInfo.familyInfo.mother.seriousIllnessDesc"
                         v-if="userInfo.familyInfo.mother.type === '重病' || userInfo.familyInfo.mother.type === '重病和残疾'"
                         label="母亲重病简述"
                         placeholder="请填写母亲重病简述" />
              <!-- 母亲残疾状况 -->
              <van-field readonly
                         clickable
                         v-if="userInfo.familyInfo.mother.type === '残疾' || userInfo.familyInfo.mother.type === '重病和残疾'"
                         :value="userInfo.familyInfo.mother.disabilityStatus"
                         label="母亲残疾状况"
                         is-link
                         placeholder="点击选择母亲残疾状况"
                         @click="showSelect('母亲残疾状况')"
                         :rules="[{ required: true, message: '请选择父母情况下的母亲残疾状况' }]" />
              <!-- 是否履行监护责任 -->
              <van-field name="radio"
                         label="母亲是否履行监护责任">
                <template #input>
                  <van-radio-group v-model="userInfo.familyInfo.mother.whetherPerformObligations"
                                   direction="horizontal">
                    <van-radio :name="true">是</van-radio>
                    <van-radio :name="false">否</van-radio>
                  </van-radio-group>
                </template>
              </van-field>
              <!-- 母亲不履行监护抚养责时间 -->
              <van-field readonly
                         v-if="!userInfo.familyInfo.mother.whetherPerformObligations"
                         clickable
                         name="datetimePicker"
                         :value="userInfo.familyInfo.mother.reportTime"
                         label="母亲不履行监护抚养责时间"
                         placeholder="点击选择母亲不履行监护抚养责时间"
                         @click="showPicker4 = true" />
              <van-popup v-model="showPicker4"
                         position="bottom">
                <van-datetime-picker v-model="currentDate"
                                     type="date"
                                     title="选择年月日"
                                     :min-date="minDate"
                                     :max-date="maxDate"
                                     @confirm="showPicker4Confirm"
                                     @cancel="showPicker4 = false" />
              </van-popup>
              <!-- 母亲服刑在押羁押时间 -->
              <template v-if="userInfo.familyInfo.mother.type === '服刑在押'">
                <van-field readonly
                           clickable
                           name="datetimePicker"
                           :value="userInfo.familyInfo.mother.detentionTime"
                           label="母亲服刑在押羁押时间"
                           placeholder="点击选择母亲服刑在押羁押时间"
                           @click="showPicker5 = true" />
                <van-popup v-model="showPicker5"
                           position="bottom">
                  <van-datetime-picker v-model="currentDate"
                                       type="date"
                                       title="选择年月日"
                                       :min-date="minDate"
                                       :max-date="maxDate"
                                       @confirm="showPicker5Confirm"
                                       @cancel="showPicker5 = false" />
                </van-popup>
                <!-- 母亲羁押期限(月) -->
                <van-field v-model="userInfo.familyInfo.mother.termInCustody"
                           type="number"
                           label="母亲羁押期限(月)"
                           placeholder="请输入月数" />
              </template>
              <!-- 母亲强制戒毒隔离时间 -->
              <template v-if="userInfo.familyInfo.mother.type === '强制戒毒'">
                <van-field readonly
                           clickable
                           name="datetimePicker"
                           :value="userInfo.familyInfo.mother.isolationTime"
                           label="母亲强制戒毒隔离时间"
                           placeholder="请选择母亲强制戒毒隔离时间"
                           @click="showPicker6 = true" />
                <van-popup v-model="showPicker6"
                           position="bottom">
                  <van-datetime-picker v-model="currentDate"
                                       type="date"
                                       title="选择年月日"
                                       :min-date="minDate"
                                       :max-date="maxDate"
                                       @confirm="showPicker6Confirm"
                                       @cancel="showPicker6 = false" />
                </van-popup>
                <!-- 母亲戒毒期限(月) -->
                <van-field v-model="userInfo.familyInfo.mother.isolationTimeRemaining"
                           label="母亲戒毒期限(月)"
                           placeholder="请输入月数" />
              </template>
              <!-- 是否有其他限制人身自由措施（母亲） -->
              <van-field name="radio"
                         label="是否有其他限制人身自由措施（母亲）">
                <template #input>
                  <van-radio-group v-model="userInfo.familyInfo.mother.restrictionOfPersonalFreedom"
                                   direction="horizontal">
                    <van-radio :name="true">是</van-radio>
                    <van-radio :name="false">否</van-radio>
                  </van-radio-group>
                </template>
              </van-field>
              <!-- 其他情况(母亲)描述 -->
              <van-field v-model="userInfo.familyInfo.mother.otherSituation"
                         label="其他情况(母亲)描述"
                         placeholder="请输入其他情况(母亲)描述" />
            </template>
          </template>
        </van-tab>
        <!-- 实际监护人情况 -->
        <van-tab title="实际监护人情况"
                 name="6">
          <van-button type="primary"
                      @click="addGuardian"
                      block>新增监护人</van-button>
          <div v-for="(item,index) in userInfo.familyInfo.guardians"
               :key="item.NO">
            <van-divider>监护人{{ index +1 }}</van-divider>
            <!-- 监护人姓名 -->
            <van-field v-model="item.actualGuardianName"
                       label="监护人姓名"
                       placeholder="请输入监护人姓名" />
            <!-- 与儿童关系 -->
            <!-- <van-field v-model="item.relationshipWithChildren"
                       label="与儿童关系"
                       placeholder="请输入与儿童关系" /> -->
            <van-field readonly
                       clickable
                       :value="item.relationshipWithChildren"
                       label="与儿童关系"
                       is-link
                       placeholder="点击选择与儿童关系"
                       @click="showSelect('与儿童关系',index)" />
            <!-- 身份证号码 -->
            <van-field v-model="item.actualGuardianCardId"
                       label="身份证号码"
                       placeholder="请输入身份证号码" />
            <!-- 身体状况 -->
            <van-field readonly
                       clickable
                       :value="item.actualGuardianHealthStatus"
                       label="身体状况"
                       is-link
                       placeholder="点击选择身体状况"
                       @click="showSelect('监护人身体状况',index)" />
            <!-- <van-field v-model="item.actualGuardianHealthStatus"
                       label="身体状况"
                       placeholder="请输入身体状况" /> -->
            <!-- 联系电话 -->
            <van-field v-model="item.actualGuardianTel"
                       type="number"
                       label="联系电话"
                       placeholder="请输入联系电话" />
            <!-- 教育程度 -->
            <van-field readonly
                       clickable
                       :value="item.actualGuardianEducationalLevel"
                       label="教育程度"
                       is-link
                       placeholder="点击选择教育程度"
                       @click="showSelect('监护人教育程度',index)" />
            <!-- <van-field v-model="item.actualGuardianEducationalLevel"
                       label="教育程度"
                       placeholder="请输入教育程度" /> -->
            <!-- 是否同住 -->
            <!-- <van-field v-model="item.whetherCohabitation"
                       label="是否同住"
                       placeholder="请输入是否同住" /> -->
            <van-field name="radio"
                       label="是否同住">
              <template #input>
                <van-radio-group v-model="item.whetherCohabitation"
                                 direction="horizontal">
                  <van-radio :name="true">是</van-radio>
                  <van-radio :name="false">否</van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <!-- 亲密程度 -->
            <!-- <van-field v-model="item.intimacy"
                       label="亲密程度"
                       placeholder="请输入亲密程度" /> -->
            <van-field name="radio"
                       label="亲密程度">
              <template #input>
                <van-radio-group v-model="item.intimacy"
                                 direction="horizontal">
                  <van-radio name="好">好</van-radio>
                  <van-radio name="差">差</van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <van-button type="info"
                        @click="deleteGuardian(item)"
                        block>删除</van-button>
          </div>
        </van-tab>
        <!-- 家庭经济状况 -->
        <van-tab title="家庭经济状况"
                 name="7">
          <!-- 是否贫困家庭 -->
          <van-field name="radio"
                     label="是否贫困家庭"
                     required
                     :rules="[{ required: true, message: '请选择家庭经济状况下的是否贫困家庭'}]">
            <template #input>
              <!-- JTPKJT -->
              <!-- userInfo.familyInfo.whetherPoorFamilies -->
              <van-radio-group v-model="JTPKJT"
                               direction="horizontal">
                <van-radio name="是">是</van-radio>
                <van-radio name="否">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <template v-if="JTPKJT==='是'">
            <van-field name="checkboxGroup"
                       label="贫困类型">
              <template #input>
                <van-checkbox-group v-model="userInfo.familyInfo.typesOfPoverty"
                                    direction="horizontal">
                  <van-checkbox name="最低生活保障"
                                shape="square">最低生活保障</van-checkbox>
                  <van-checkbox name="特困供养"
                                shape="square">特困供养</van-checkbox>
                  <van-checkbox name="低收入家庭（低保边缘户）"
                                shape="square">低收入家庭（低保边缘户）</van-checkbox>
                  <van-checkbox name="其他"
                                shape="square">其他</van-checkbox>
                </van-checkbox-group>
              </template>
            </van-field>
          </template>
          <!-- 其他家庭贫困类型简述 -->
          <van-field v-model="userInfo.familyInfo.otherTypeOfSketch"
                     label="其他家庭贫困类型简述"
                     placeholder="请输入其他家庭贫困类型简述" />
        </van-tab>
        <!-- 成长关爱需求 -->
        <!-- <van-tab title="成长关爱需求"
                 name="8">
          <van-field v-model="userInfo.familyInfo.childrenNeeds"
                     label="儿童微心愿"
                     placeholder="请输入儿童微心愿" />
          <van-field v-model="userInfo.familyInfo.otherNeeds"
                     label="其他需求"
                     placeholder="请输入其他需求" />
          <van-field v-model="userInfo.familyInfo.familyNeeds"
                     label="家庭主要诉求"
                     placeholder="请输入家庭主要诉求" />
        </van-tab> -->
        <!-- 生活保障情况 -->
        <van-tab title="生活保障情况"
                 name="9">
          <!-- 生活保障情况 -->
          <van-field required
                     readonly
                     clickable
                     :value="userInfo.assureInfo.whetherGuarantee"
                     label="生活保障情况"
                     is-link
                     placeholder="请选择生活保障情况"
                     @click="showSelect('生活保障情况')"
                     :rules="[{ required: true, message: '请选择生活保障情况下的生活保障情况' }]" />
          <!-- 保障方式 -->
          <van-field readonly
                     clickable
                     :value="userInfo.assureInfo.guaranteeMode"
                     label="保障方式"
                     is-link
                     placeholder="请选择保障方式"
                     @click="showSelect('保障方式')" />
          <!-- 其他保障方式简述 -->
          <van-field v-model="userInfo.assureInfo.guaranteeModeResume"
                     label="其他保障方式简述"
                     placeholder="请输入其他保障方式简述" />
          <!-- 收领人与儿童关系 -->
          <!-- <van-field v-model="userInfo.basicInfo.receiverRelation"
                     label="收领人与儿童关系"
                     required
                     placeholder="请输入收领人与儿童关系"
                     :rules="[{ required: true, message: '请输入收领人与儿童关系' }]" /> -->
          <van-field readonly
                     clickable
                     :value="userInfo.basicInfo.receiverRelation"
                     label="收领人与儿童关系"
                     is-link
                     placeholder="点击选择收领人与儿童关系"
                     @click="showSelect('收领人与儿童关系')" />
          <!-- 发放金额 -->
          <van-field v-model="userInfo.assureInfo.paymentAmount"
                     type="number"
                     label="发放金额"
                     placeholder="请输入发放金额" />
          <!-- 发放周期 -->
          <!-- <van-field readonly
                     clickable
                     name="ab_ex192"
                     :value="userInfo.assureInfo.distributionCycle"
                     label="发放周期"
                     is-link
                     placeholder="请选择发放周期"
                     @click="showSelect('发放周期')" /> -->
          <!-- 发放方式 -->
          <van-field name="radio"
                     required
                     label="发放方式"
                     :rules="[{ required: true, message: '请选择生活保障情况下的发放方式' }]">
            <template #input>
              <van-radio-group v-model="userInfo.basicInfo.collectionMethod"
                               direction="horizontal">
                <van-radio name="社会化打卡发放">社会化打卡发放</van-radio>
                <van-radio name="现金">现金</van-radio>
                <van-radio name="福利院发放">福利院发放</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <!-- 收领人 -->
          <van-field v-model="userInfo.basicInfo.receiver"
                     v-if="userInfo.basicInfo.receiverRelation !== '本人'"
                     required
                     label="收领人"
                     placeholder="请输入收领人"
                     :rules="[{ required: true, message: '请选择生活保障情况下的收领人' }]" />
          <template v-if="userInfo.basicInfo.collectionMethod !== '福利院发放'">
            <!-- 开户人姓名 -->
            <van-field v-model="userInfo.basicInfo.bankAccountName"
                       required
                       label="开户人姓名"
                       placeholder="请输入开户人姓名"
                       :rules="[{ required: true, message: '请输入儿童基本情况下的开户人姓名'},{pattern:/[\u4e00-\u9fa5]+/, message: '开户人姓名只能有汉字'}]" />
            <!-- 开户行名称 -->
            <van-field v-model="userInfo.basicInfo.bankName"
                       required
                       label="开户行名称"
                       placeholder="开户行名称"
                       :rules="[{ required: true, message: '请输入儿童基本情况下的开户行名称'},{pattern:/[\u4e00-\u9fa5]+/, message: '开户行名称只能有汉字'}]" />
            <!-- 开户卡号 -->
            <van-field v-model="userInfo.basicInfo.bankCardId"
                       type="number"
                       required
                       label="开户卡号"
                       placeholder="开户卡号"
                       :rules="[{ required: true, message: '请填写儿童基本情况下的开户卡号'},{pattern:/^[1-9]\d{9,29}$/, message: '开户卡号请输入10到30位数字'}]" />
            <!-- 收领人身份证 -->
            <van-field v-model="userInfo.basicInfo.receiverIdCard"
                       v-if="userInfo.basicInfo.receiverRelation !== '本人'"
                       required
                       label="收领人身份证"
                       placeholder="请输入收领人身份证"
                       :rules="[{ required: true, message: '请选择生活保障情况下的收领人身份证' },{ pattern: /^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))(\d|X|x)$/, message: '生活保障情况下的收领人身份证格式错误！'}]" />
            <!-- 收领人电话 -->
            <van-field v-model="userInfo.basicInfo.receiverPhone"
                       v-show="userInfo.basicInfo.receiverRelation !== '本人'"
                       type="number"
                       required
                       label="收领人电话"
                       placeholder="请输入收领人电话" /></template>
        </van-tab>
        <!-- 教育资助情况 -->
        <van-tab title="教育资助情况"
                 name="10">
          <!-- 是否有教育资助 -->
          <van-field name="radio"
                     label="是否有教育资助">
            <template #input>
              <van-radio-group v-model="userInfo.assureInfo.whetherEducationSubsidy"
                               direction="horizontal">
                <van-radio :name="true">是</van-radio>
                <van-radio :name="false">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <!-- 教育资助是否免学杂费 -->
          <van-field name="radio"
                     label="教育资助是否免学杂费">
            <template #input>
              <van-radio-group v-model="userInfo.assureInfo.whetherFreeOfSchoolFees"
                               direction="horizontal">
                <van-radio :name="true">是</van-radio>
                <van-radio :name="false">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <!-- 教育资助是否免书本费 -->
          <van-field name="radio"
                     label="教育资助是否免书本费">
            <template #input>
              <van-radio-group v-model="userInfo.assureInfo.whetherFreeBooks"
                               direction="horizontal">
                <van-radio :name="true">是</van-radio>
                <van-radio :name="false">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <!-- 减保教费(元/年) -->
          <van-field v-model="userInfo.assureInfo.reduceTheAmountOfTuition"
                     type="number"
                     label="减保教费(元/年)"
                     placeholder="请输入减保教费(元/年)" />
          <!-- 教育资助(元/年) -->
          <van-field v-model="userInfo.assureInfo.educationSubsidyOfMoney"
                     type="number"
                     label="教育资助(元/年)"
                     placeholder="请输入教育资助(元/年)" />
          <!-- 孤儿助学项目资助(元/年) -->
          <van-field v-model="userInfo.assureInfo.financialAidForOrphansOfMoney"
                     type="number"
                     label="孤儿助学项目资助(元/年)"
                     placeholder="请输入孤儿助学项目资助(元/年)" />
          <!-- 牵手贫困学子项目资助(元/年) -->
          <van-field v-model="userInfo.assureInfo.financialAidForPoorStudentsOfMoney"
                     type="number"
                     label="牵手贫困学子项目资助(元/年)"
                     placeholder="请输入牵手贫困学子项目资助(元/年)" />
          <!-- 其他资助情况 -->
          <van-field v-model="userInfo.assureInfo.otherFundingDescription"
                     type="string"
                     label="其他资助情况"
                     placeholder="请输入其他资助情况" />
        </van-tab>
        <!-- 医疗救助情况 -->
        <van-tab title="医疗救助情况"
                 name="11">
          <!-- 基本医疗保险 -->
          <van-field readonly
                     clickable
                     :value="userInfo.assureInfo.medicalInsuranceType"
                     label="基本医疗保险"
                     is-link
                     placeholder="请选择基本医疗保险"
                     @click="showSelect('基本医疗保险')" />
          <!-- 个人医疗费 -->
          <van-field v-model="userInfo.assureInfo.medicalExpense"
                     type="number"
                     label="个人医疗费"
                     placeholder="个人医疗费" />
          <!-- 个人医疗费-门诊（元） -->
          <van-field v-model="userInfo.assureInfo.outpatientExpenses"
                     type="number"
                     label="个人医疗费-门诊（元）"
                     placeholder="请输入个人医疗费-门诊（元）" />
          <!-- 个人医疗费-住院（元） -->
          <van-field v-model="userInfo.assureInfo.hospitalizationExpenses"
                     type="number"
                     label="个人医疗费-住院（元）"
                     placeholder="请输入个人医疗费-住院（元）" />
          <!-- 个人医疗费-住院（元） -->
          <van-field v-model="userInfo.assureInfo.lengthOfStay"
                     type="number"
                     label="个人医疗费-住院（元）"
                     placeholder="请输入个人医疗费-住院（元）" />
          <!-- 门诊费用报支-医疗报销（元） -->
          <van-field v-model="userInfo.assureInfo.opcMedicalReimbursement"
                     type="number"
                     label="门诊费用报支-医疗报销（元）"
                     placeholder="请输入门诊费用报支-医疗报销（元）" />
          <!-- 门诊费用报支-明天计划（元） -->
          <van-field v-model="userInfo.assureInfo.opcPlannedExpensesForTomorrow"
                     type="number"
                     label="门诊费用报支-明天计划（元）"
                     placeholder="请输入门诊费用报支-明天计划（元）" />
          <!-- 门诊费用报支-大病慈善救助（元） -->
          <van-field v-model="userInfo.assureInfo.opcCharityAidForSeriousIllness"
                     type="number"
                     label="门诊费用报支-大病慈善救助（元）"
                     placeholder="请输入门诊费用报支-大病慈善救助（元）" />
          <!-- 门诊费用报支-牵手困境儿童（元） -->
          <van-field v-model="userInfo.assureInfo.opcAssistanceForChildrenInNeed"
                     type="number"
                     label="门诊费用报支-牵手困境儿童（元）"
                     placeholder="请输入门诊费用报支-牵手困境儿童（元）" />
          <!-- 住院费用报支-医疗报销（元） -->
          <van-field v-model="userInfo.assureInfo.haMedicalReimbursement"
                     type="number"
                     label="住院费用报支-医疗报销（元）"
                     placeholder="请输入住院费用报支-医疗报销（元）" />
          <!-- 住院费用报支-明天计划（元） -->
          <van-field v-model="userInfo.assureInfo.haPlannedExpensesForTomorrow"
                     type="number"
                     label="住院费用报支-明天计划（元）"
                     placeholder="请输入住院费用报支-明天计划（元）" />
          <!-- 住院费用报支-大病慈善救助（元） -->
          <van-field v-model="userInfo.assureInfo.haCharityAidForSeriousIllness"
                     type="number"
                     label="住院费用报支-大病慈善救助（元）"
                     placeholder="请输入住院费用报支-大病慈善救助（元）" />
          <!-- 住院费用报支-牵手困境儿童（元） -->
          <van-field v-model="userInfo.assureInfo.haAssistanceForChildrenInNeed"
                     type="number"
                     label="住院费用报支-牵手困境儿童（元）"
                     placeholder="请输入住院费用报支-牵手困境儿童（元）" />
          <!-- 个人自付医疗费用（元） -->
          <van-field v-model="userInfo.assureInfo.individualPaymedicalCare"
                     type="number"
                     label="个人自付医疗费用（元）"
                     placeholder="请输入个人自付医疗费用（元）" />
          <!-- 个人自付医疗-门诊（元） -->
          <van-field v-model="userInfo.assureInfo.individualPayOutpatient"
                     type="number"
                     label="个人自付医疗-门诊（元）"
                     placeholder="请输入个人自付医疗-门诊（元））" />
          <!-- 个人自付医疗-住院（元） -->
          <van-field v-model="userInfo.assureInfo.individualPayHospitalization"
                     type="number"
                     label="个人自付医疗-住院（元）"
                     placeholder="请输入个人自付医疗-住院（元）" />
        </van-tab>
        <!-- 康复救助情况 -->
        <van-tab title="康复救助情况"
                 v-if="STZB === '是' || STZB === '是'"
                 name="12">
          <!-- 残疾确诊时年龄 -->
          <van-field v-model="userInfo.assureInfo.disabilityDiagnosisAge"
                     type="number"
                     label="残疾确诊时年龄"
                     placeholder="请输入残疾确诊时年龄" />
          <!-- 残疾确诊情况简述 -->
          <van-field v-model="userInfo.assureInfo.disabilitySketch"
                     label="残疾确诊情况简述"
                     placeholder="请输入残疾确诊情况简述" />
          <!-- 是否参加康复训练 -->
          <van-field name="radio"
                     label="是否参加康复训练">
            <template #input>
              <van-radio-group v-model="userInfo.assureInfo.whetherRehabilitationTraining"
                               direction="horizontal">
                <van-radio :name="true">是</van-radio>
                <van-radio :name="false">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <!-- 康复训练康复机构 -->
          <van-field v-model="userInfo.assureInfo.rehabilitationInstitution"
                     label="康复训练康复机构"
                     placeholder="请输入康复训练康复机构" />
          <!-- 康复效果 -->
          <van-field v-model="userInfo.assureInfo.rehabilitationEffect"
                     label="康复效果"
                     placeholder="请输入康复效果" />
          <!-- 康复费用 -->
          <van-field v-model="userInfo.assureInfo.rehabilitationExpenses"
                     type="number"
                     label="康复费用"
                     placeholder="请输入康复费用" />
          <!-- 未参加康复训练原因 -->
          <van-field readonly
                     clickable
                     name="ab_ex192"
                     :value="userInfo.assureInfo.whyNoRecovery"
                     label="未参加康复训练原因"
                     is-link
                     placeholder="未参加康复训练原因"
                     @click="showSelect('未参加康复训练原因')" />
          <!-- 是否配备矫治器具 -->
          <van-field name="radio"
                     label="是否配备矫治器具">
            <template #input>
              <van-radio-group v-model="userInfo.assureInfo.whetherEquipmentCorrector"
                               direction="horizontal">
                <van-radio :name="true">是</van-radio>
                <van-radio :name="false">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <!-- 配备器具 -->
          <van-field readonly
                     clickable
                     :value="userInfo.assureInfo.correctorType"
                     label="配备器具"
                     is-link
                     placeholder="请选择配备器具"
                     @click="showSelect('配备器具')" />
          <!-- 矫治器具配备简述 -->
          <van-field v-model="userInfo.assureInfo.correctionSketch"
                     label="矫治器具配备简述"
                     placeholder="请输入矫治器具配备简述" />
          <!-- 未配备原因 -->
          <van-field readonly
                     clickable
                     :value="userInfo.assureInfo.whyNoEquipmentCorrector"
                     label="未配备原因"
                     is-link
                     placeholder="请选择未配备原因"
                     @click="showSelect('未配备原因')" />
        </van-tab>
        <!-- 司法援助情况 -->
        <van-tab title="司法援助情况"
                 name="13">
          <!-- 是否需要司法援助 -->
          <van-field name="radio"
                     label="是否需要司法援助">
            <template #input>
              <van-radio-group v-model="userInfo.assureInfo.whetherJudicialAssistance"
                               direction="horizontal">
                <van-radio :name="true">是</van-radio>
                <van-radio :name="false">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <!-- 司法援助情况简述 -->
          <van-field v-model="userInfo.assureInfo.judicialAssistanceSketch"
                     label="司法援助情况简述"
                     placeholder="请输入司法援助情况简述" />
        </van-tab>
        <!-- 群团组织及社会关爱情况 -->
        <van-tab title="群团组织及社会关爱情况"
                 name="14">
          <!-- 是否有群体组织及社会关爱 -->
          <van-field name="radio"
                     label="是否有群体组织及社会关爱">
            <template #input>
              <van-radio-group v-model="userInfo.assureInfo.whetherSocialAssistance"
                               direction="horizontal">
                <van-radio :name="true">是</van-radio>
                <van-radio :name="false">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <!-- 是否有志愿者结对关爱 -->
          <van-field name="radio"
                     label="是否有志愿者结对关爱">
            <template #input>
              <van-radio-group v-model="userInfo.assureInfo.whetherVolunteerCare"
                               direction="horizontal">
                <van-radio :name="true">是</van-radio>
                <van-radio :name="false">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <!-- 志愿者结对关爱情况简述 -->
          <van-field v-model="userInfo.assureInfo.volunteerCareSketch"
                     label="志愿者结对关爱情况简述"
                     placeholder="请输入志愿者结对关爱情况简述" />
          <!-- 是否有部门（单位）结对关爱 -->
          <van-field name="radio"
                     label="是否有部门（单位）结对关爱">
            <template #input>
              <van-radio-group v-model="userInfo.assureInfo.whetherDepartmentCare"
                               direction="horizontal">
                <van-radio :name="true">是</van-radio>
                <van-radio :name="false">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <!-- 部门（单位）结对关爱情况简述 -->
          <van-field v-model="userInfo.assureInfo.departmentCareSketch"
                     label="部门（单位）结对关爱情况简述"
                     placeholder="请输入部门（单位）结对关爱情况简述" />
          <!-- 是否有社会捐助 -->
          <van-field name="radio"
                     label="是否有社会捐助">
            <template #input>
              <van-radio-group v-model="userInfo.assureInfo.whetherSocialDonations"
                               direction="horizontal">
                <van-radio :name="true">是</van-radio>
                <van-radio :name="false">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <!-- 社会捐助情况简述 -->
          <van-field v-model="userInfo.assureInfo.socialDonationsSketch"
                     label="社会捐助情况简述"
                     placeholder="请输入社会捐助情况简述" />
          <!-- 是否有其他关爱 -->
          <van-field name="radio"
                     label="是否有其他关爱">
            <template #input>
              <van-radio-group v-model="userInfo.assureInfo.whetherOtherCare"
                               direction="horizontal">
                <van-radio :name="true">是</van-radio>
                <van-radio :name="false">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <!-- 其他关爱情况简述 -->
          <van-field v-model="userInfo.assureInfo.otherCareSketch"
                     label="其他关爱情况简述"
                     placeholder="请输入其他关爱情况简述" />
        </van-tab>
        <!-- 底部选择框（单选） -->
        <van-popup v-model="showPicker"
                   position="bottom">
          <van-picker show-toolbar
                      :columns='kosekiTyle'
                      @confirm="confirmType($event)"
                      @cancel="showPicker = false" />
        </van-popup>
        <!-- 时间选择器（年月日） -->
        <!-- <van-datetime-picker v-model="currentDate"
                             type="date"
                             title="选择年月日"
                             :min-date="minDate"
                             :max-date="maxDate" /> -->
      </van-tabs>
      <div style="margin: 16px;">
      </div>
    </van-form>
    <div class="footerButton">
      <van-button type="primary"
                  @click="submit('暂存')">暂存</van-button>
      <van-button type="info"
                  @click="submit('提交')">提交</van-button>
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs'
let nationality = ["汉族", "满族", "蒙古族", "回族", "藏族", "维吾尔族", "苗族", "彝族", "壮族", "布依族", "侗族", "瑶族", "白族", "土家族", "哈尼族", "哈萨克族", "傣族", "黎族", "傈僳族", "佤族", "畲族", "高山族", "拉祜族", "水族", "东乡族", "纳西族", "景颇族", "柯尔克孜族", "土族", "达斡尔族", "仫佬族", "羌族", "布朗族", "撒拉族", "毛南族", "仡佬族", "锡伯族", "阿昌族", "普米族", "朝鲜族", "塔吉克族", "怒族", "乌孜别克族", "俄罗斯族", "鄂温克族", "德昂族", "保安族", "裕固族", "京族", "塔塔尔族", "独龙族", "鄂伦春族", "赫哲族", "门巴族", "珞巴族", "基诺族"]
import {
  getDisabledUserInfoApi,  // 残疾人上门核查 获取残疾人信息
  saveChildInfoApi, // 保存困境儿童信息
  temporarilySaveApi, // 暂存困境儿童信息
  getChildDetailInfoApi, // 查看困境儿童信息
  fileUploadApi, // 图片上传接口
  viewImgApi, // 图片回显
} from "@/api"
import { compressImg } from '@/utils/utils.js'
import request from "@/utils/request"
export default {
  name: "userInfoAccept",
  data () {
    return {
      active: 1,
      // 用户信息
      userInfo: {
        abd_ex77: [], // 求助原因
        abd_ex37: [], // 身份证照片
        // -----
        assureInfo: {
          correctionSketch: "", // 矫正情况简述
          correctorType: "",   // 矫正器具类型
        },
        basicInfo: {
          idCard: "",
          name: "",
          source: ""
        },
        familyInfo: {
          father: {},
          guardians: [],
          mother: [],
        },
        allMaterial: {}
      },
      showPicker: false,  // 户籍类别底部弹框
      kosekiTyle: [],     // 户籍选项
      kosekiTyleName: '',
      areaShow: false,
      // { url: 'https://img01.yzcdn.cn/vant/leaf.jpg' }
      fileList1: [
      ],
      img1Arr: [],      // 儿童身份证图片路径
      fileList2: [
      ],
      img2Arr: [],      // 儿童身份证图片路径
      fileList3: [
      ],
      img3Arr: [],      // 儿童身份证图片路径
      fileList4: [
      ],
      img4Arr: [],      // 儿童身份证图片路径
      minDate: new Date(2005, 0, 1),
      maxDate: new Date(2025, 10, 1),
      minDate7: new Date(2000, 0, 1),
      maxDate7: new Date(2030, 10, 1),
      currentDate: new Date(),
      showPicker1: false,  // 父亲不履行抚养责任时间选择器
      showPicker2: false,  // 父亲羁押时间选择器
      showPicker3: false, //  父亲戒毒时间
      showPicker4: false, //  母亲不履行抚养责任时间选择器
      showPicker5: false, //  母亲羁押时间选择器
      showPicker6: false, //  母亲戒毒时间
      showPicker7: false, //  儿童出生日期
      showPicker8: false, //  入学时间
      options: [],
      areaName: "",
      saveFlage: false,
      disabilityClass: "",    // 残疾等级
      ETAZB: "",  // 儿童基本情况下是否患有艾滋
      ETWQXNL: "",  // 儿童基本情况下完全行为能力
      ETZX: "",  // 儿童基本情况下是否在校
      STJK: "",  // 身体状况下的是否健康
      STZB: "",  // 身体状况下的是否重病
      STCJ: "",  // 身体状况下的是否残疾
      isFQXX: "",  // 父母情况下的是否无父亲信息
      isMQXX: "",  // 父母情况下的是否无母亲信息
      JTPKJT: "",  // 家庭经济情况下的是否贫困
      XGTSJL: "", // 相关经历下的是否有相关特殊经历
      KWFDB: "", // 课外辅导班情况
      physicalConditionIndex: "", // 监护人身体状况index
      educationalStatusIndex: "", // 监护人教育情况index
      withChildIndex: "", // 监护人与儿童关系index
      fatherStatusImg: []
    }
  },
  async created () {

    this.getChildDetailInfo({
      id: this.$route.query
        .sId
    })
    // 区划选项数据
    request({
      method: 'post',
      url: '/social/assistanceWeixin/getCitys',
      data: {}
    }).then(res => {
      // 区
      for (let i in res) {
        this.options.push({ text: '', value: '', children: [] });
        this.options[i].text = res[i].n.split('#')[0];
        this.options[i].value = '#' + res[i].n.split('#')[1];
        // 镇
        for (let j in res[i].c) {
          // this.options[i].children=[]
          this.options[i].children[j] = { text: '', value: '', children: [] };
          this.options[i].children[j].text = res[i].c[j].n.split('#')[0];
          this.options[i].children[j].value = '#' + res[i].c[j].n.split('#')[1];

          // 村
          for (let k in res[i].c[j].a) {
            this.options[i].children[j].children[k] = { text: '', value: '' };
            this.options[i].children[j].children[k].text = res[i].c[j].a[k].split('#')[0];
            this.options[i].children[j].children[k].value = '#' + res[i].c[j].a[k].split('#')[1];
          }

        }

      }
      console.log(this.options, '区划');

    }).catch(res => {
      console.log(res, 'xzqh');
      this.$toast.fail('数据请求失败1')
    })
  },
  methods: {
    // 户籍弹框确认点击事项
    confirmType (value) {
      // console.log(value);
      if (this.kosekiTyleName === '民族') this.userInfo.basicInfo.nation = value;
      if (this.kosekiTyleName === '行为能力') this.userInfo.basicInfo.haveFullCapacity = value;
      if (this.kosekiTyleName === '收养状态') this.userInfo.basicInfo.adoptedTypeStr = value;
      if (this.kosekiTyleName === '流浪儿童类型') this.userInfo.basicInfo.typeOfStreetChildren = value;
      if (this.kosekiTyleName === '保障方式') this.userInfo.assureInfo.guaranteeMode = value;
      if (this.kosekiTyleName === '发放周期') this.userInfo.assureInfo.distributionCycle = value;
      if (this.kosekiTyleName === '基本医疗保险') this.userInfo.assureInfo.medicalInsuranceType = value;
      if (this.kosekiTyleName === '未参加康复训练原因') this.userInfo.assureInfo.whyNoRecovery = value;
      if (this.kosekiTyleName === '配备器具') this.userInfo.assureInfo.correctorType = value;
      if (this.kosekiTyleName === '未配备原因') this.userInfo.assureInfo.whyNoEquipmentCorrector = value;
      if (this.kosekiTyleName === '户籍类型') this.userInfo.basicInfo.censusRegisterType = value;
      if (this.kosekiTyleName === '课外辅导班') this.KWFDB = value
      if (this.kosekiTyleName === '教育情况类型') {
        let arr = value.split(" / ")
        this.userInfo.basicInfo.educationStage = arr[0];
        this.userInfo.basicInfo.educationType = arr[1];
      }
      if (this.kosekiTyleName === '父亲当前状况') {
        this.userInfo.familyInfo.father.type = value;
        this.parentChangeType(value, "father")
      }
      if (this.kosekiTyleName === '父亲残疾状况') this.userInfo.familyInfo.father.disabilityStatus = value;
      if (this.kosekiTyleName === '母亲当前状况') {
        this.userInfo.familyInfo.mother.type = value;
        this.parentChangeType(value, "mother")
      }
      if (this.kosekiTyleName === '母亲残疾状况') this.userInfo.familyInfo.mother.disabilityStatus = value;
      if (this.kosekiTyleName === '生活保障情况') this.userInfo.assureInfo.whetherGuarantee = value;
      if (this.kosekiTyleName === '残疾类型') this.userInfo.basicInfo.disabilityType = value;
      if (this.kosekiTyleName === '残疾等级') this.disabilityClass = value;
      if (this.kosekiTyleName === '重病类型') this.userInfo.basicInfo.seriousIllnessType = value;
      if (this.kosekiTyleName === '监护人身体状况') this.userInfo.familyInfo.guardians[this.physicalConditionIndex].actualGuardianHealthStatus = value;
      if (this.kosekiTyleName === '监护人教育程度') this.userInfo.familyInfo.guardians[this.educationalStatusIndex].actualGuardianEducationalLevel = value;
      if (this.kosekiTyleName === '与儿童关系') this.userInfo.familyInfo.guardians[this.withChildIndex].relationshipWithChildren = value;
      if (this.kosekiTyleName === '收领人与儿童关系') this.userInfo.basicInfo.receiverRelation = value;

      this.showPicker = false;
    },
    showSelect (type, index) {
      // 核对类别选择框
      if (type === "民族") this.kosekiTyle = nationality
      if (type === "行为能力") this.kosekiTyle = ["完全行为能力", "限制行为能力"]
      if (type === "残疾类别") this.kosekiTyle = ["肢体残疾", "精神残疾", "智力残疾", "盲视力残疾", "言语残疾", "听力残疾"]
      if (type === "残疾等级") this.kosekiTyle = ["一级残疾", "二级残疾", "三级残疾", "四级残疾"]
      if (type === "是否享受低保") this.kosekiTyle = ["是", "否"]
      if (type === "家庭特征") this.kosekiTyle = ["一名残疾人", "两名以上残疾人", "由达到法定退休年龄父母供养", "由达到法定退休年龄的其他供养人员供养", "其他特征"]
      if (type === "收养状态") this.kosekiTyle = ["无需收养", "未被收养", "已被收养"]
      if (type === "流浪儿童类型") this.kosekiTyle = ["长期在外流浪儿童", "外地长期在本地流浪儿童"]
      if (type === "父亲当前状况" || type === "母亲当前状况") this.kosekiTyle = ["健康", "重病", "残疾", "重病和残疾", "自然死亡", "宣告死亡", "宣告失踪", "失联", "离家出走", "长期外出打工", "服刑在押", "强制戒毒"]
      if (type === "保障方式") this.kosekiTyle = ["孤儿", "重病", "重残（生活补贴 、护理补贴）", "贫困家庭（低保/特困供养/建档立卡）", "低收入家庭（低保边缘户）", "临时救助", "父母监护缺失", "父母无力履行监护责任", "流浪儿童", "其他"]
      if (type === "发放周期") this.kosekiTyle = ["每月", "每季", "半年", "一年"]
      if (type === "基本医疗保险") this.kosekiTyle = ["政府资助参保", "自费参保", "未参保"]
      if (type === "未参加康复训练原因") this.kosekiTyle = ["交通因素", "家庭人力因素", "不知道政策", "康复效果不佳", "其他 "]
      if (type === "配备器具") this.kosekiTyle = ["验配助视器", "验配助听器（双耳）", "装配假肢或矫形器、适配轮椅、坐姿椅、站立架、助行器", "配基本型人工耳蜗"]
      if (type === "未配备原因") this.kosekiTyle = ["不需要", "不知道", "不符合政策"]
      if (type === "户籍类型") this.kosekiTyle = ["农业户口", "非农业户口"]
      if (type === "课外辅导班") this.kosekiTyle = ["每天参加", "休息日参加", "寒暑假参加", "不参加"]
      if (type === "教育情况类型") this.kosekiTyle = ["学龄前 / 未入园", "学龄前 / 幼儿园", "学龄前 / 特教", "义务教育 / 小学", "义务教育 / 初中", "义务教育 / 特教", "高中 / 高中", "高中 / 中职", "高中 / 特教", "高等教育 / 大专", "高等教育 / 本科", "其他 / 辍学", "其他 / 无随班就读能力", "其他 / 待业", "其他 / 就业"]
      if (type === "父亲残疾状况" || type === "母亲残疾状况") this.kosekiTyle = ["二级以上残疾", "三级四级精神残疾", "三级四级智力残疾", "其他"]
      if (type === "生活保障情况") this.kosekiTyle = ["已保障", "部分保障", "未保障"]
      if (type === "残疾类型") this.kosekiTyle = ["智力残疾", "肢体残疾", "精神残疾", "孤独症", "视力残疾", "听力残疾", "言语残疾", "多种残疾", "预防接种异常反应残疾", "其他"]
      if (type === "残疾等级") this.kosekiTyle = ["一级", "二级", "三级", "四级"]
      if (type === "重病类型") this.kosekiTyle = ["三级以上预防接种异常反应残疾儿童", "经三甲机构诊断符合低收入单人保认定的重大疾病", "先天性心脏病", "尿毒症", "慢性肾功能衰竭", "器官移植", "恶性肿瘤", "颅内良性肿瘤", "医保规定住院和门诊治疗费1年中自付超过2万", "白血病", "终末期肾病", "恶性肿瘤", "器官移植后抗排异药物治疗", "再生障碍性贫血", "系统性红斑狼疮(活动期或伴有脏器损害)", "血友病", "肝硬化失代偿期", "重症类风湿关节炎", "强直性脊柱炎", "糖尿病合并严重并发症(限晚期糖尿病肾病、糖尿病足〈有坏疽、 深部溃疡、脓肿、骨髓炎〉患者)", "艾滋病机会感染", "慢性阻塞性肺疾病", "尘肺", "地中海贫血", "克罗恩病", "渐冻人病"]
      if (type === "监护人身体状况") this.kosekiTyle = ["健康", "重病", "残疾", "重病和残疾", '其他']
      if (type === "监护人教育程度") this.kosekiTyle = ["文盲/半文盲", "小学", "初中", "高中", "大学及以上学历"]
      if (type === "与儿童关系") this.kosekiTyle = ["父亲", "母亲", "爷爷", "奶奶", '伯伯/叔叔', '伯母/婶婶', "其他"]
      if (type === "收领人与儿童关系") this.kosekiTyle = ["本人", "父亲", "母亲", "爷爷", "奶奶", '伯伯/叔叔', '伯母/婶婶', "其他"]
      this.physicalConditionIndex = index
      this.educationalStatusIndex = index
      this.withChildIndex = index
      this.kosekiTyleName = type
      this.showPicker = true
    },
    parentChangeType (e, val) {
      this.userInfo.familyInfo[val].whetherDisability = false
      this.userInfo.familyInfo[val].whetherInCustody = false
      this.userInfo.familyInfo[val].whetherCompulsoryDetoxification = false
      this.userInfo.familyInfo[val].whetherPerformObligations = false
      if (e == '残疾' || e === "重病和残疾") {
        // 是否残疾
        this.userInfo.familyInfo[val].whetherDisability = true
      } else if (e == '服刑在押') {
        // 是否服刑在押
        this.userInfo.familyInfo[val].whetherInCustody = true
      } else if (this.educationalStatusIndex == '强制戒毒') {
        // 是否强制戒毒
        this.userInfo.familyInfo[val].whetherCompulsoryDetoxification = true
      } else if (e == '不履行监护抚养责任') {
        this.userInfo.familyInfo[val].whetherPerformObligations = true
      }
    },
    // 拍照识别
    beforeRead (file) {
      if (file.type == 'image/heic' || file.type == '') {
        this.$toast.fail('照片格式不正确')
        return false
      } else {
        return true
      }
    },
    // 组件方法 获取 流
    uploadImg (num, index) {
      return file => {
        file.status = 'uploading';
        file.message = '上传中...';

        console.log(file.file)

        // 执行压缩图片并上传
        let obj = new compressImg(file, num, this.imgRequest, index)
      }
    },
    beforeDelete (val) { },
    imgRequest (formData, file, num, index) {
      console.log('index', index, num);
      request({
        method: 'post',
        url: '/social/weixinMinios/fileUpload',
        data: formData,
      }).then(res => {
        file.status = 'done';
        file.message = '上传完成';
        console.log(res);
        if ((num + '').indexOf('IDCard') != -1) {
          // 需要发送身份证照片到后台获取身份证号和姓名是否和前面输入的身份证号，姓名相同
          request({
            method: 'post',
            url: '/social/assistanceWeixin/idOrc',
            data: {
              img: file.content
            }
          }).then(res => {
            console.log(res, 'res');
            if (res[0].status == 'ok') {
              try {
                let data = res[0].data.words_result;
                //formatBirth
                console.log(data, this.getBirthday(data["公民身份号码"].words));
                this.userInfo.basicInfo.censusRegisterAddress = data["住址"].words
                this.userInfo.basicInfo.residentialAddress = data["住址"].words
                this.userInfo.basicInfo.idCard = data["公民身份号码"].words
                this.userInfo.basicInfo.name = data["姓名"].words
                this.userInfo.basicInfo.birth = this.getBirthday(data["公民身份号码"].words)
                this.userInfo.basicInfo.gender = data["性别"].words
                this.userInfo.basicInfo.nation = data["民族"].words === "汉" ? data["民族"].words + "族" : data["民族"].words
              } catch (e) {
                console.log(e);
                // this.fileList2.pop()
                this.$toast.fail('身份证对比信息不符,请上传正确的身份证')
              }
            } else {
              // this.fileList2.pop()
              this.$toast.fail('身份证对比信息不符,请上传正确的身份证2')
            }
          }).catch(err => {
            // console.log(err)
          })

        } else if (num == 1 || num == 2) {
          // 需要发送身份证照片到后台获取身份证号和姓名是否和前面输入的身份证号，姓名相同
          request({
            method: 'post',
            url: '/social/assistanceWeixin/idOrc',
            data: {
              img: file.content
            }
          }).then(res => {
            console.log(res, 'res', num);
            if (res[0].status == 'ok') {
              try {
                let data = res[0].data.words_result;
                console.log(data);
                if (num == '1') {
                  let name1 = data["签发机关"].words;
                  let name2 = data["签发日期"].words;
                  let name3 = data["失效日期"].words;
                  if (!name1 || !name2 || !name3) {
                    this.fileList.pop()
                    this.$toast.fail('身份证国徽面照片不符,请上传正确的身份证国徽面1')
                  }
                } else if (num == '2') {
                  data["公民身份号码"].words = data["公民身份号码"].words.replace(/\s+/g, "");

                  this.$set(this.family[index], 'abm_ex3', data["姓名"].words);
                  this.$set(this.family[index], 'abm_ex2', data["公民身份号码"].words);
                  // 自动计算性别与年龄
                  this.changeSfz2(this.family[index]);


                }

              } catch (e) {
                console.log(e);
                this.fileList2.pop()
                this.$toast.fail('身份证对比信息不符,请上传正确的身份证1')
              }

            } else {
              this.fileList2.pop()
              this.$toast.fail('身份证对比信息不符,请上传正确的身份证2')
            }

          }).catch(err => {
            console.log(err)
          })

        }

        if (num == 'bankCard') {

          // 识别银行卡照片内容并 填充 银行卡信息 orc是银行卡识别的没有写错
          request({
            method: 'post',
            url: '/social/assistanceWeixin/orc',
            data: {
              img: file.content
            }

          }).then(res => {
            console.log(res, 'res');
            console.log(res[0].data.result, 'res');

            if (res[0].status == 'ok') {
              try {
                let data = res[0].data.result;

                console.log(data);
                data.bank_card_number = data.bank_card_number.replace(/\s+/g, "");
                this.form.ab_ex42 = data.bank_name;
                this.form.ab_ex43 = data.bank_card_number;

              } catch (e) {
                console.log(e);
                this.fileList2.pop()
                this.$toast.fail('银行卡对比信息不符,请上传正确的银行卡')
              }


            } else {
              this.fileList2.pop()
              this.$toast.fail('银行卡对比信息不符,请上传正确的银行卡')
            }

          }).catch(err => {
            console.log(err)
          })
        }

        if (num == 1) {
          this.form.ab_ex10_1 = res[0].filename
        } else if (num == 2) {
          this.form.ab_ex10_2 = res[0].filename
        } else if (num == 3) {
          this.form.ab_ex73 = res[0].filename
          // this.fileList3 = res[0].filename
        } else if (num == 4) {
          // 其他证明材料
          if (this.form.ab_ex16) {
            this.form.ab_ex16 = this.form.ab_ex16.concat(',', res[0].filename)
          } else {
            this.form.ab_ex16 = this.form.ab_ex16.concat(res[0].filename)
          }
          console.log(this.form.ab_ex16)
        } else if (num == 5) {
          // 民主评议
          this.form.ab_ex97 = res[0].filename
        } else if (num == 11) {
          // 自理能力评估报告
          this.form.ab_ex196 = res[0].filename
        } else if (num == 12) {
          // 集中供养意愿书
          this.form.ab_ex197 = res[0].filename
        } else if (num == 6) {
          // 房屋整体照片
          if (this.form.ab_ex166) {
            this.form.ab_ex166 = this.form.ab_ex166.concat(',', res[0].filename)
          } else {
            this.form.ab_ex166 = this.form.ab_ex166.concat(res[0].filename)
          }
        } else if (num == 7) {
          // 房屋室内照片
          if (this.form.ab_ex167) {
            this.form.ab_ex167 = this.form.ab_ex167.concat(',', res[0].filename)
          } else {
            this.form.ab_ex167 = this.form.ab_ex167.concat(res[0].filename)
          }
        } else if (num == 8) {
          // 房产材料照片
          if (this.form.ab_ex168) {
            this.form.ab_ex168 = this.form.ab_ex168.concat(',', res[0].filename)
          } else {
            this.form.ab_ex168 = this.form.ab_ex168.concat(res[0].filename)
          }
        } else if (num == 9) {
          // 车船材料照片
          if (this.form.ab_ex169) {
            this.form.ab_ex169 = this.form.ab_ex169.concat(',', res[0].filename)
          } else {
            this.form.ab_ex169 = this.form.ab_ex169.concat(res[0].filename)
          }
        } else if (num == 10) {
          // 自愿放弃照片
          if (this.form.ab_ex175) {
            this.form.ab_ex175 = this.form.ab_ex175.concat(',', res[0].filename)
          } else {
            this.form.ab_ex175 = this.form.ab_ex175.concat(res[0].filename)
          }
        }
      }).catch(error => {
        file.status = 'failed';
        file.message = '上传失败';
        if (num == 1) {
          this.fileList.pop()
        } else if (num == 2) {
          this.fileList2.pop()
        } else if (num == 3) {
          this.fileList3.pop()
        } else if (num == 4) {
          this.fileList5.pop()
        } else if (num == 5) {
          this.fileList4.pop()
        } else if (num == 6) {
          this.fileList6.pop()
        } else if (num == 7) {
          this.fileList7.pop()
        }
        // else if(num == 8){
        // 	this.fileList8.pop()
        // }else if(num == 9){
        // 	this.fileList9.pop()
        // }
        else if (num == 10) {
          this.fileList10.pop()
        } else if (num == 11) {
          this.fileList11.pop()
        } else if (num == 12) {
          this.fileList12.pop()
        }
        this.$toast.fail('上传失败')
        console.log(error)
      })
    },
    // 根据路由传参id数据回显
    async getChildDetailInfo (data) {
      try {
        const res = await getChildDetailInfoApi(data)
        res.data.familyInfo.guardians.forEach((item, index) => item.NO = index)
        let num
        if (res.data.basicInfo.disabilityLevel) {
          let num = res.data.basicInfo.disabilityLevel
          if (num == 1) this.disabilityClass = '一级'
          if (num == 2) this.disabilityClass = '二级'
          if (num == 3) this.disabilityClass = '三级'
          if (num == 4) this.disabilityClass = '四级'
        }
        this.userInfo = res.data
        if (this.userInfo.basicInfo.completeDivisionCode) {
          let arr = this.userInfo.basicInfo.completeDivisionCode.split(",")
          this.areaName = arr.map(item => item.replace(/[0-9#]/g, "")).join("/")
        }
        let ETAZB = this.userInfo.basicInfo.sufferingFromAids
        let ETWQXNL = this.userInfo.basicInfo.haveFullCapacity
        let ETZX = this.userInfo.basicInfo.whetherInSchool
        let STJK = this.userInfo.basicInfo.whetherHealth
        let STZB = this.userInfo.basicInfo.whetherSeriousIllness
        let STCJ = this.userInfo.basicInfo.whetherDisability
        let isFQXX = this.userInfo.familyInfo.father.whetherNoParentInfo
        let isMQXX = this.userInfo.familyInfo.mother.whetherNoParentInfo
        let JTPKJT = this.userInfo.familyInfo.whetherPoorFamilies
        let XGTSJL = this.userInfo.basicInfo.specialExperience
        // 课外辅导班数据回显
        if (!this.userInfo.basicInfo.tutorialClass) {
          this.KWFDB = '不参加'
        } else {
          if (this.userInfo.basicInfo.typeOfTutorialClass === '每天') this.KWFDB = '每天参加'
          if (this.userInfo.basicInfo.typeOfTutorialClass === '休息日') this.KWFDB = '休息日参加'
          if (this.userInfo.basicInfo.typeOfTutorialClass === '寒暑假') this.KWFDB = '寒暑假参加'
        }
        if (ETAZB !== null) this.ETAZB = ETAZB ? "是" : "否"
        if (ETWQXNL !== null) this.ETWQXNL = ETWQXNL ? "是" : "否"
        if (ETZX !== null) this.ETZX = ETZX ? "是" : "否"
        if (STJK !== null) this.STJK = STJK ? "是" : "否"
        if (STZB !== null) this.STZB = STZB ? "是" : "否"
        if (STCJ !== null) this.STCJ = STCJ ? "是" : "否"
        if (isFQXX !== null) this.isFQXX = isFQXX ? "是" : "否"
        if (isMQXX !== null) this.isMQXX = isMQXX ? "是" : "否"
        if (JTPKJT !== null) this.JTPKJT = JTPKJT ? "是" : "否"
        if (XGTSJL !== null) this.XGTSJL = XGTSJL ? "是" : "否"
        if (!this.userInfo.familyInfo.typesOfPoverty) this.userInfo.familyInfo.typesOfPoverty = []
        // 儿童头像回显
        let imgarr4 = this.userInfo.basicInfo.headImage ? this.userInfo.basicInfo.headImage.split(",") : []
        imgarr4.forEach(async item => {
          try {
            const imgRes = await viewImgApi(item)
            this.fileList4.push({ url: imgRes, isImage: true })
            this.img4Arr.push(item)
          } catch (error) {
            console.log(error, "00000")
          }
        })
        // 身份证图片回显
        let imgarr1 = this.userInfo.allMaterial.idCard.value ? this.userInfo.allMaterial.idCard.value.split(",") : []
        imgarr1.forEach(async item => {
          try {
            const imgRes = await viewImgApi(item)
            this.fileList1.push({ url: imgRes, isImage: true })
            this.img1Arr.push(item)
          } catch (error) {
            console.log(error, "00000")
          }
        })
        // 户口本材料图片回显
        let imgarr2 = this.userInfo.allMaterial.familyRegister.value ? this.userInfo.allMaterial.familyRegister.value.split(",") : []
        imgarr2.forEach(async item => {
          try {
            const imgRes = await viewImgApi(item)
            this.fileList2.push({ url: imgRes, isImage: true })
            this.img2Arr.push(item)
          } catch (error) {
            console.log(error)
          }
        })
        // 其他材料图片回显
        let imgarr3 = this.userInfo.allMaterial.otherMaterial.value ? this.userInfo.allMaterial.otherMaterial.value.split(",") : []
        imgarr3.forEach(async item => {
          try {
            const imgRes = await viewImgApi(item)
            this.fileList3.push({ url: imgRes, isImage: true })
            this.img3Arr.push(item)
          } catch (error) {
            console.log(error)
          }
        })
        if (this.userInfo.allMaterial.familyRegister.value === null) this.userInfo.allMaterial.familyRegister.value = ""
      } catch (error) {
        console.log(error, "数据回显error")
      }
    },
    // 保存按钮
    async submit (val) {
      // 如果是提交按钮 去校验表单
      if (val === '提交') {
        try {
          const rulesRes = await this.$refs.rule1.validate()
          console.log(rulesRes)
        } catch (error) {
          if (error.length) {
            this.$toast(error[0].message)
            throw new Error(error[0].message)
          }
        }
      }
      // if(this.userInfo.familyInfo.father.type)
      // 将数组图片路径转化为逗号隔开的字符串
      this.userInfo.allMaterial.idCard.value = this.img1Arr.join()
      this.userInfo.allMaterial.familyRegister.value = this.img2Arr.join()
      this.userInfo.allMaterial.otherMaterial.value = this.img3Arr.join()
      this.userInfo.basicInfo.headImage = this.img4Arr.join()
      if (this.KWFDB) {
        this.userInfo.basicInfo.tutorialClass = true
        if (this.KWFDB === '每天参加') this.userInfo.basicInfo.typeOfTutorialClass = '每天'
        if (this.KWFDB === '休息日参加') this.userInfo.basicInfo.typeOfTutorialClass = '休息日'
        if (this.KWFDB === '寒暑假参加') this.userInfo.basicInfo.typeOfTutorialClass = '寒暑假'
        if (this.KWFDB === '不参加') {
          this.userInfo.basicInfo.tutorialClass = false
          this.userInfo.basicInfo.typeOfTutorialClass = null
        }
      }
      // 节流-----
      if (this.saveFlage) return this.$toast("请勿重复保存")
      this.saveFlage = true
      setTimeout(() => {
        this.saveFlage = false
      }, 3000);
      // -----
      if (this.disabilityClass) {
        let num = this.disabilityClass
        if (num === "一级") this.userInfo.basicInfo.disabilityLevel = 1
        if (num === "二级") this.userInfo.basicInfo.disabilityLevel = 2
        if (num === "三级") this.userInfo.basicInfo.disabilityLevel = 3
        if (num === "四级") this.userInfo.basicInfo.disabilityLevel = 4
      }
      if (this.ETAZB) this.userInfo.basicInfo.sufferingFromAids = this.ETAZB === '是' ? true : false
      // if (this.ETAZB === null) return this.$toast("儿童基本情况下的是否患有艾滋选项不可为空")
      if (this.ETWQXNL) this.userInfo.basicInfo.haveFullCapacity = this.ETWQXNL === '是' ? true : false
      // if (this.ETWQXNL === null) return this.$toast("儿童基本情况下的是否完全行为能力选项不可为空")
      if (this.ETZX) this.userInfo.basicInfo.whetherInSchool = this.ETZX === '是' ? true : false
      // if (this.ETZX === null) return this.$toast("儿童基本情况下的是否住校选项不可为空")
      if (this.STJK) this.userInfo.basicInfo.whetherHealth = this.STJK === '是' ? true : false
      if (this.STZB) this.userInfo.basicInfo.whetherSeriousIllness = this.STZB === '是' ? true : false
      if (this.STCJ) this.userInfo.basicInfo.whetherDisability = this.STCJ === '是' ? true : false
      console.log(this.isFQXX, "this.isFQXX")
      if (this.isFQXX) this.userInfo.familyInfo.father.whetherNoParentInfo = this.isFQXX === '是' ? true : false
      // return console.log(111)
      // return console.log(this.userInfo.familyInfo.father.whetherNoParentInfo)
      // console.log(this.userInfo.familyInfo.father.whetherNoParentInfo, "this.userInfo.familyInfo.father.whetherNoParentInfo")
      if (this.isMQXX) this.userInfo.familyInfo.mother.whetherNoParentInfo = this.isMQXX === '是' ? true : false
      if (this.JTPKJT) this.userInfo.familyInfo.whetherPoorFamilies = this.JTPKJT === '是' ? true : false
      if (this.XGTSJL) this.userInfo.basicInfo.specialExperience = this.XGTSJL === '是' ? true : false
      if (val === "暂存") this.temporarilySave(this.userInfo)
      if (val === "提交") {
        this.userInfo.basicInfo.whetherChecked = true
        this.saveChildInfo(this.userInfo)
      }
    },
    lengthOfSchoolingChange (e) {
      console.log(e)
      if (e.target.value > 10) this.userInfo.basicInfo.schoolSystem = 10
      if (e.target.value < 0) this.userInfo.basicInfo.schoolSystem = 0
      this.userInfo.basicInfo.schoolSystem = Math.floor(this.userInfo.basicInfo.schoolSystem)
    },
    // 时间选择器确认按钮
    showPicker1Confirm (val) {
      this.userInfo.familyInfo.father.reportTime = dayjs(val).format("YYYY-MM-DD HH:mm:ss");
      this.showPicker1 = false;
    },
    showPicker2Confirm (val) {
      this.userInfo.familyInfo.father.detentionTime = dayjs(val).format("YYYY-MM-DD HH:mm:ss");
      this.showPicker2 = false;
    },
    showPicker3Confirm (val) {
      this.userInfo.familyInfo.father.isolationTime = dayjs(val).format("YYYY-MM-DD HH:mm:ss");
      this.showPicker3 = false;
    },
    showPicker4Confirm (val) {
      this.userInfo.familyInfo.mother.reportTime = dayjs(val).format("YYYY-MM-DD HH:mm:ss");
      this.showPicker4 = false;
    },
    showPicker5Confirm (val) {
      this.userInfo.familyInfo.mother.detentionTime = dayjs(val).format("YYYY-MM-DD HH:mm:ss");
      this.showPicker5 = false;
    },
    showPicker6Confirm (val) {
      this.userInfo.familyInfo.mother.isolationTime = dayjs(val).format("YYYY-MM-DD HH:mm:ss");
      this.showPicker6 = false;
    },
    showPicker7Confirm (val) {
      this.userInfo.basicInfo.birth = dayjs(val).format("YYYY-MM-DD");
      this.showPicker7 = false;
    },
    showPicker8Confirm (val) {
      this.userInfo.basicInfo.admissionDate = dayjs(val).format("YYYY-MM-DD");
      this.showPicker8 = false;
    },
    // 新增监护人按钮
    addGuardian () {
      if (this.userInfo.familyInfo.guardians.length >= 5) return this.$toast('监护人数量最多为五位')
      let NO = this.userInfo.familyInfo.guardians.length ? this.userInfo.familyInfo.guardians[this.userInfo.familyInfo.guardians.length - 1].NO + 1 : 1
      this.userInfo.familyInfo.guardians.push({
        actualGuardianName: "",
        relationshipWithChildren: "",
        actualGuardianCardId: "",
        actualGuardianHealthStatus: "",
        actualGuardianTel: "",
        actualGuardianEducationalLevel: "",
        whetherCohabitation: "",
        intimacy: "",
        NO,
      })
    },
    // 删除监护人按钮
    deleteGuardian (val) {
      this.userInfo.familyInfo.guardians = this.userInfo.familyInfo.guardians.filter(item => item.NO !== val.NO)
    },
    formatBirth (val) {
      let newVal = val
      if (typeof val === "'string'") {
        newVal = val.split("")
        newVal = newVal.splice(4, 0, "-")
        newVal = newVal.splice(7, 0, "-")
        newVal = newVal.join("")
        return newVal
      } else {
        return this.$toast("出生年月识别失败")
      }
    },
    getBirthday (idCard) {
      let birthday = "";
      if (idCard != null && idCard !== "") {
        if (idCard.length === 15) {
          birthday = "19" + idCard.substr(6, 6);
        } else if (idCard.length === 18) {
          birthday = idCard.substr(6, 8);
        }
        birthday = birthday.replace(/(.{4})(.{2})/, "$1-$2-");
      }
      return birthday;
    },
    async myAfterRead1 (file) {
      let formData = new FormData();
      formData.append('file', file.file)
      try {
        const res = await fileUploadApi(formData)
        this.img1Arr.push("/social/weixinMinios/show?filename=" + res[0].filename)
      } catch (error) {
        this.fileList1.pop()
        this.$toast("图片上传失败")
        throw new Error("图片上传失败")
      }
    },
    myBeforeDelete1 (file, detail) {
      this.fileList1 = this.fileList1.filter((item, index) => index !== detail.index);
      this.img1Arr = this.img1Arr.filter((item, index) => index !== detail.index);
    },
    async myAfterRead2 (file) {
      let formData = new FormData();
      formData.append('file', file.file)
      try {
        const res = await fileUploadApi(formData)
        this.img2Arr.push("/social/weixinMinios/show?filename=" + res[0].filename)
      } catch (error) {
        this.fileList2.pop()
        this.$toast("图片上传失败")
        throw new Error("图片上传失败")
      }
    },
    myBeforeDelete2 (file, detail) {
      this.fileList2 = this.fileList2.filter((item, index) => index !== detail.index);
      this.img2Arr = this.img2Arr.filter((item, index) => index !== detail.index);
    },
    async myAfterRead3 (file) {
      let formData = new FormData();
      formData.append('file', file.file)
      try {
        const res = await fileUploadApi(formData)
        this.img3Arr.push("/social/weixinMinios/show?filename=" + res[0].filename)
      } catch (error) {
        this.fileList3.pop()
        this.$toast("图片上传失败")
        throw new Error("图片上传失败")
      }
    },
    myBeforeDelete3 (file, detail) {
      this.fileList3 = this.fileList3.filter((item, index) => index !== detail.index);
      this.img3Arr = this.img3Arr.filter((item, index) => index !== detail.index);
    },
    async myAfterRead4 (file) {
      let formData = new FormData();
      formData.append('file', file.file)
      try {
        const res = await fileUploadApi(formData)
        this.img4Arr.push("/social/weixinMinios/show?filename=" + res[0].filename)
      } catch (error) {
        this.fileList4.pop()
        this.$toast("图片上传失败")
        throw new Error("图片上传失败")
      }
    },
    myBeforeDelete4 (file, detail) {
      this.fileList4 = this.fileList4.filter((item, index) => index !== detail.index);
      this.img4Arr = this.img4Arr.filter((item, index) => index !== detail.index);
    },
    // 全部选项选择完毕后，会触发 finish 事件
    onFinish ({
      selectedOptions
    }) {
      this.areaShow = false;
      let area = selectedOptions.map((option) => option.text)
      let area2 = selectedOptions.map((option) => option.text + option.value)
      // return console.log(area,area2)
      this.userInfo.basicInfo.completeDivisionCode = area2.join(',')
      this.userInfo.basicInfo.district = area[0]  //区
      this.userInfo.basicInfo.townStreet = area[1]  //街道
      this.userInfo.basicInfo.village = area[2]  //村  village  rusticate
      this.areaName = area.join('/');
      if (!this.userInfo.basicInfo.censusRegisterAddress) this.userInfo.basicInfo.censusRegisterAddress = area.join("");
      if (!this.userInfo.basicInfo.residentialAddress) this.userInfo.basicInfo.residentialAddress = area.join("");
      // this.form.arv_ex14 = area2.join(','); //xzqh
    },
    // 保存
    async saveChildInfo (data) {
      try {
        const res = await saveChildInfoApi(data)
        if (res.code !== 200) return this.$toast(res.msg)
        this.$toast("保存成功")
        // 清除本地图片 重新获取
        this.formatImgs()
        // 重新获取数据
        this.getChildDetailInfo({
          id: this.$route.query
            .sId
        })
        this.$router.push('/kjetfxpg?childID=' + this.$route.query.sId)
      } catch (error) {
        this.$toast("保存失败，请稍后重试")
        console.log("保存", error)
      }
    },
    // 暂存
    async temporarilySave (data) {
      // return console.log(data)
      try {
        const res = await temporarilySaveApi(data)
        if (res.code !== 200) return this.$toast(res.msg)
        this.$toast("暂存成功！")
        // 清除本地图片 重新获取
        this.formatImgs()
        // 重新获取数据
        this.getChildDetailInfo({
          id: this.$route.query
            .sId
        })
      } catch (error) {
        this.$toast("暂存失败，请稍后重试")
      }
    },
    formatImgs () {
      this.fileList1 = []
      this.img1Arr = []
      this.fileList2 = []
      this.img2Arr = []
      this.fileList3 = []
      this.img3Arr = []
      this.fileList4 = []
      this.img4Arr = []
    }
  },
}
</script>

<style scoped lang="less">
.maxBox {
  position: relative;
  min-height: 100vh;
  padding-bottom: 2rem;
  background-color: #f5f5f5;
}
.van-tab span {
  color: #fff !important;
}
::v-deep.van-tabs__wrap {
  background-color: #1989fa;
}
::v-deep.van-tab {
  color: #fff !important;
}
.footerButton {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  .van-button {
    width: 50% !important;
    border-radius: unset !important;
  }
}
.page6Div5 {
  margin-top: 1rem;
}
.deleteGuardianButton {
  width: 100%;
  height: 6vh;
  background-color: red;
}
</style>

<template>
  <div class="SelfCareAssessmentTable">
    <header>
      长护险失能评估表
    </header>
    <van-sticky>
      <div class="pg_result">
        <span style="margin:10px">所得分值：<span style="color:red">{{this.form.aer_ex15}}</span></span>
        <span style="margin:10px">评估等级：<span style="color:red">{{this.form.aer_ex12}}</span></span>
      </div>
    </van-sticky>
    <main>
      <div>

        <div class="PGBTitle">
          评估事项
        </div>
        <van-form ref='rule1'
                  @submit="save">
          <!-- <van-field v-if="isShow" style="color:red" name="name" readonly label="评估分值：" :value="form.aer_ex15"/>
                    <van-field v-if="isShow" name="name" readonly label="评估结果：" :value="form.aer_ex12"/> -->
          <van-field name="name"
                     readonly
                     label="评估对象："
                     :value="form.aer_ex4" />

          <van-field name="question1"
                     label="1. 进食："
                     required
                     :rules="[{ required: true, message: '请选择一个进食选项'}]">
            <template #input>
              <!-- <div>1.进食:</div> -->
              <van-radio-group direction="horizontal"
                               @change="getEvent(question.question1,'question1')"
                               v-model="question.question1">
                <div>
                  <van-radio class="marginstyle"
                             name="0"
                             shape="square">A.较大和完全依赖(0分)</van-radio>
                  <van-radio class="marginstyle"
                             name="5"
                             shape="square">B.需部分帮助（夹菜、盛饭）(5分)</van-radio>
                  <van-radio class="marginstyle"
                             name="10"
                             shape="square">C.全面自理(10分)</van-radio>
                </div>
              </van-radio-group>
            </template>
          </van-field>
          <van-field name="question2"
                     label="2. 洗澡："
                     required
                     :rules="[{ required: true, message: '请选择一个洗澡选项' }]">
            <template #input>
              <van-radio-group v-model="question.question2"
                               @change="getEvent(question.question2,'question2')"
                               direction="horizontal">
                <div>
                  <van-radio class="marginstyle"
                             name="0"
                             shape="square">A.依赖(0分)</van-radio>
                  <van-radio class="marginstyle"
                             name="5"
                             shape="square">B.自理(5分)</van-radio>
                </div>
              </van-radio-group>
            </template>
          </van-field>
          <van-field name="question3"
                     label="3. 梳洗、修饰："
                     required
                     :rules="[{ required: true, message: '请选择一个梳洗、修饰选项' }]">
            <template #input>
              <van-radio-group v-model="question.question3"
                               @change="getEvent(question.question3,'question3')"
                               direction="horizontal">
                <div>
                  <van-radio class="marginstyle"
                             name="0"
                             shape="square">A.依赖(0分)</van-radio>
                  <van-radio class="marginstyle"
                             name="5"
                             shape="square">B.自理（能独立完成洗脸、梳头、刷牙、剃须）(5分)</van-radio>
                </div>
              </van-radio-group>
            </template>
          </van-field>
          <van-field name="question4"
                     label="4. 穿衣："
                     required
                     :rules="[{ required: true, message: '请选择一个穿衣选项' }]">
            <template #input>
              <van-radio-group v-model="question.question4"
                               @change="getEvent(question.question4,'question4')"
                               direction="horizontal">
                <div>
                  <van-radio class="marginstyle"
                             name="0"
                             shape="square">A.依赖(0分)</van-radio>
                  <van-radio class="marginstyle"
                             name="5"
                             shape="square">B.需一半帮助(5分)</van-radio>
                  <van-radio class="marginstyle"
                             name="10"
                             shape="square">C.自理（系开钮扣、开关拉链和穿鞋）(10分)</van-radio>
                </div>
              </van-radio-group>
            </template>
          </van-field>
          <van-field name="question5"
                     label="5. 控制大便："
                     required
                     :rules="[{ required: true, message: '请选择一个控制大便选项' }]">
            <template #input>
              <van-radio-group v-model="question.question5"
                               @change="getEvent(question.question5,'question5')"
                               direction="horizontal">
                <div>
                  <van-radio class="marginstyle"
                             name="0"
                             shape="square">A.昏迷或失禁(0分)</van-radio>
                  <van-radio class="marginstyle"
                             name="5"
                             shape="square">B.偶尔失禁（每周大于1次）(5分)</van-radio>
                  <van-radio class="marginstyle"
                             name="10"
                             shape="square">C.能控制(10分)</van-radio>
                </div>
              </van-radio-group>
            </template>
          </van-field>
          <van-field name="question6"
                     label="6. 控制小便："
                     required
                     :rules="[{ required: true, message: '请选择一个控制小便选项' }]">
            <template #input>
              <van-radio-group v-model="question.question6"
                               @change="getEvent(question.question6,'question6')"
                               direction="horizontal">
                <div>
                  <van-radio class="marginstyle"
                             name="0"
                             shape="square">A.失禁或昏迷或需他人导尿(0分)</van-radio>
                  <van-radio class="marginstyle"
                             name="5"
                             shape="square">B.偶尔失禁（1次/24小时；大于1次/周）(5分)</van-radio>
                  <van-radio class="marginstyle"
                             name="10"
                             shape="square">C.能控制(10分)</van-radio>
                </div>
              </van-radio-group>
            </template>
          </van-field>
          <van-field name="question7"
                     label="7. 如厕："
                     required
                     :rules="[{ required: true, message: '请选择一个如厕选项' }]">
            <template #input>
              <van-radio-group v-model="question.question7"
                               @change="getEvent(question.question7,'question7')"
                               direction="horizontal">
                <div>
                  <van-radio class="marginstyle"
                             name="0"
                             shape="square">A.依赖(0分)</van-radio>
                  <van-radio class="marginstyle"
                             name="5"
                             shape="square">B.需部分帮助(5分)</van-radio>
                  <van-radio class="marginstyle"
                             name="10"
                             shape="square">C.自理(10分)</van-radio>
                </div>
              </van-radio-group>
            </template>
          </van-field>
          <van-field name="question8"
                     label="8. 床椅转移："
                     required
                     :rules="[{ required: true, message: '转移请选择一个床椅选项' }]">
            <template #input>
              <van-radio-group v-model="question.question8"
                               @change="getEvent(question.question8,'question8')"
                               direction="horizontal">
                <div>
                  <van-radio class="marginstyle"
                             name="0"
                             shape="square">A.完全依赖别人(0分)</van-radio>
                  <van-radio class="marginstyle"
                             name="5"
                             shape="square">B.需大量帮助（2人），能坐(5分)</van-radio>
                  <van-radio class="marginstyle"
                             name="10"
                             shape="square">C.需小量帮助（1人），或监护(10分)</van-radio>
                  <van-radio class="marginstyle"
                             name="15"
                             shape="square"> D.自理(15分)</van-radio>
                </div>
              </van-radio-group>
            </template>
          </van-field>
          <van-field name="question9"
                     label="9. 行走："
                     required
                     :rules="[{ required: true, message: '请选择一个行走选项' }]">
            <template #input>
              <van-radio-group v-model="question.question9"
                               @change="getEvent(question.question9,'question9')"
                               direction="horizontal">
                <div>
                  <van-radio class="marginstyle"
                             name="0"
                             shape="square">A.不能走(0分)</van-radio>
                  <van-radio class="marginstyle"
                             name="5"
                             shape="square">B.在轮椅上独立行动(5分)</van-radio>
                  <van-radio class="marginstyle"
                             name="10"
                             shape="square">C.需1人帮助（体力或语言督导）(10分)</van-radio>
                  <van-radio class="marginstyle"
                             name="15"
                             shape="square">D.独自步行（可用辅助器具）(15分)</van-radio>
                </div>
              </van-radio-group>
            </template>
          </van-field>
          <van-field name="question10"
                     label="10. 上下楼梯："
                     required
                     :rules="[{ required: true, message: '请选择一个上下楼梯选项' }]">
            <template #input>
              <van-radio-group v-model="question.question10"
                               @change="getEvent(question.question10,'question10')"
                               direction="horizontal">
                <div>
                  <van-radio class="marginstyle"
                             name="0"
                             shape="square">A.不能(0分)</van-radio>
                  <van-radio class="marginstyle"
                             name="5"
                             shape="square">B.需帮助(5分)</van-radio>
                  <van-radio class="marginstyle"
                             name="10"
                             shape="square">C.自理(10分)</van-radio>
                </div>
              </van-radio-group>
            </template>
          </van-field>

          <van-field v-model="form.aer_ex16"
                     name="aer_ex16"
                     label="是否有集中供养意愿"
                     placeholder="点击选择集中供养意愿"
                     is-link
                     required
                     readonly
                     clickable
                     @click="showOption1 = true"
                     :rules="[{ required: true, message: '点击选择集中供养意愿' }]" />

          <van-popup v-model="showOption1"
                     position="bottom">
            <van-picker show-toolbar
                        :columns='option1'
                        @confirm="optionEvent($event,'集中意愿')"
                        @cancel="showOption1 = false" />
          </van-popup>

          <van-field required
                     readonly
                     clickable
                     name="aer_ex17"
                     :value="form.aer_ex17"
                     label="是否有精神病史或者精神认知障碍"
                     is-link
                     placeholder="是否有精神病史或者精神认知障碍"
                     @click="showOption2 = true"
                     :rules="[{ required: true, message: '请选择是否有精神病史或者精神认知障碍' }]" />
          <van-popup v-model="showOption2"
                     position="bottom">
            <van-picker show-toolbar
                        :columns='option2'
                        @confirm="optionEvent($event,'认知障碍')"
                        @cancel="showOption2 = false" />
          </van-popup>

          <van-field v-model="form.aer_ex32"
                     readonly
                     required
                     name="aer_ex32"
                     label="评估机构"
                     placeholder="请填写评估机构"
                     :rules="[{ required: true, message: '请填写评估机构'}]" />
          <van-field v-model="form.aer_ex31"
                     readonly
                     required
                     name="aer_ex31"
                     label="评估人员"
                     placeholder="请填写评估人员"
                     :rules="[{ required: true, message: '请填写评估人员'}]" />

          <van-field v-if="form.aer_ex10=='完成'"
                     :value='form.aer_dat3'
                     readonly
                     name="aer_dat3"
                     label="评估时间" />
          <van-field v-else
                     :value='form.aer_dat2'
                     readonly
                     name="aer_dat2"
                     label="暂存时间" />

          <!-- <van-popup v-model="showTime" readonly position="bottom">
                        <van-datetime-picker v-model="time1" type="datetime" @confirm="optionEvent($event,'评估时间')" @cancel="showTime = false" />
                    </van-popup> -->
        </van-form>

        <div class="PGBTitle"> 图片资料 </div>
        <div class="page4Img">
          <div class="page4Img2">
            <div class="page4Img2Font">纸质评估照片:</div>
            <div class="page4Img2Div">
              <div style="position:relative;width:91%;float: left;">
                <van-uploader v-model="fileList1"
                              :before-read="beforeRead"
                              :after-read="uploadImg(1)"
                              :before-delete="beforeDelete('aer_ex21')" />
              </div>
            </div>
          </div>
          <div class="page4Img2 page4Img22">
            <div class="page4Img2Font">评估现场照片:</div>
            <div class="page4Img2Div">
              <div style="position:relative;width:91%;float: left;">
                <van-uploader v-model="fileList2"
                              :before-read="beforeRead"
                              :after-read="uploadImg(2)"
                              :before-delete="beforeDelete('aer_ex22')" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- <div style="width: 100%;position: fixed;bottom: 0px;text-align: center;display: flex;justify-content: space-around"> -->
      <div v-if="!isShow"
           style="width: 100%;position: fixed;bottom: 0px;text-align: center;display: flex;justify-content: space-around">

        <van-button block
                    @click="save('暂存')">暂存</van-button>
        <van-button block
                    type="info"
                    @click="save('提交')">提交</van-button>
      </div>
      <div v-else
           style="width: 100%;position: fixed;bottom: 0px;text-align: center;display: flex;justify-content: space-around">

        <van-button block
                    type="info"
                    @click="goBack()">返回</van-button>
        <van-button block
                    type="primary"
                    @click="save('提交')">修改</van-button>
      </div>

      <!-- <van-popup v-model="popshow" style="width:90%;height:140px;padding:10px"> -->
      <!-- <div class="poptitle">评估结果</div>
                
                <div style="margin:10px">所得分值：<span style="color:red">{{this.form.aer_ex15}}</span></div>
                <div style="margin:10px">评估等级：<span style="color:red">{{this.form.aer_ex12}}</span></div> -->

      <!-- <van-button type="info" style="margin:10px" native-type="button" @click="reset">重置</van-button> -->
      <!-- <van-button to="SelfCareAssessmentList" type="info" style="margin:10px">返回列表</van-button> -->
      <!-- </van-popup> -->

    </main>
  </div>
</template>

<script>
import { tszfValidate, tszfFilter, tszfFilter2, getSex, getAge, nation, isCardID, compressImg } from '@/utils/utils.js'
import request from '@/utils/request.js'
export default {
  data () {
    return {
      // rules:[],
      JsonData: {},
      question: {
        question1: '',
        question2: '',
        question3: '',
        question4: '',
        question5: '',
        question6: '',
        question7: '',
        question8: '',
        question9: '',
        question10: '',
      },
      isShow: false, // 显示评估结果
      // wantTogether:[], //
      option1: ['是', '否'], //集中供养意愿
      option2: ['是', '否'], //精神病史 

      showTime: false,
      showOption1: false,
      showOption2: false,

      time1: new Date(),

      form: {
        aer_dat3: '', //提交时间
        aer_dat2: '',   //暂存时间
        // aer_dat3:'',
        saveType: '',
        aer_ex1: '',
        aer_ex2: '',
        aer_ex4: '',
        aer_ex5: '',
        aer_ex6: '',
        aer_ex7: '',
        aer_ex8: '',
        aer_ex9: '',
        aer_ex10: '',
        aer_ex11: {},
        aer_ex12: '',
        aer_ex13: '',
        aer_ex14: '',
        aer_ex15: '',
        aer_ex16: '',
        aer_ex17: '',
        aer_ex21: '',
        aer_ex22: '',
        // aer_ex17:'',
      },

      fileList1: [], //纸质评估表照片列表
      fileList2: [], //评估场景照片列表
      popshow: false,  //  匹配结果弹出框
    }
  },
  created () {
    this.loadData();
  },
  methods: {



    loadData () {
      console.log(this.$route.query.sId);

      this.evaluationReportQuestionView({
        // "sId":'1',
        "aer_id": this.$route.query.sId,
      }).then(res => {

        this.form = res[0];
        if (this.form.aer_ex10 != '完成') {

          this.form.aer_ex31 = this.form.name;
        }

        for (let i in res[0].aer_ex11) {
          this.question[i] = res[0].aer_ex11[i].toString();
        }

        console.log(this.question, 'this.question');

        let json = res[0];
        console.log(json.aer_ex22);

        // 显示评估结果
        if (this.$route.query.stype == '完成') {
          this.isShow = true;
        }


        if (json.aer_ex21) {

          let imgs = json.aer_ex21.split(",");

          console.log(this.fileList1)

          imgs.forEach((value, index) => {

            console.log(value, 'value');

            this.imageView(value).then(res => {
              // 这个从正确的进来

              console.log(res, 'res');
              this.fileList1.push({
                url: res,
                isImage: true
              })
            }).catch(res => {
              console.log(res)
            })
          })
        }

        if (json.aer_ex22) {

          let imgs = json.aer_ex22.split(",");

          console.log(this.fileList2)

          imgs.forEach((value, index) => {
            console.log(value, 'value');
            this.imageView(value).then(res => {
              // 这个从正确的进来

              // console.log(res,'res');
              this.fileList2.push({
                url: res,
                isImage: true
              })
            }).catch(res => {
              console.log(res)
            })
          })
        }

        // this.fileList1 = this.form.aer_ex21.split(",")
        // this.fileList2 = this.form.aer_ex22.split(",")
        console.log(this.fileList1, 'fileList1');
        console.log(this.fileList2, 'fileList2');
        console.log(res);
        console.log(this.form);

      }).catch(error => {
        console.log(error);
      })

    },

    // 评估选项
    getEvent (data, key) {

      console.log(data, key);

      // console.log(this.question.question7,'this.question.question7');
      // console.log(this.question.question7== undefined,'this.question.question7');

      let q1 = this.question.question1 == ('' || undefined) ? 0 : Number(this.question.question1);
      let q2 = this.question.question2 == ('' || undefined) ? 0 : Number(this.question.question2);
      let q3 = this.question.question3 == ('' || undefined) ? 0 : Number(this.question.question3);
      let q4 = this.question.question4 == ('' || undefined) ? 0 : Number(this.question.question4);
      let q5 = this.question.question5 == ('' || undefined) ? 0 : Number(this.question.question5);
      let q6 = this.question.question6 == ('' || undefined) ? 0 : Number(this.question.question6);
      let q7 = this.question.question7 == ('' || undefined) ? 0 : Number(this.question.question7);
      let q8 = this.question.question8 == ('' || undefined) ? 0 : Number(this.question.question8);
      let q9 = this.question.question9 == ('' || undefined) ? 0 : Number(this.question.question9);
      let q10 = this.question.question10 == ('' || undefined) ? 0 : Number(this.question.question10);

      console.log(q1, q2, q3, q4, q5, q6, q7, q8, q9, q10);



      let sum = 0;
      sum = q1 + q2 + q3 + q4 + q5 + q6 + q7 + q8 + q9 + q10;

      console.log(sum, '总分');


      this.form.aer_ex15 = sum;

      if (sum >= 0 && sum <= 40) {

        this.form.aer_ex12 = '失能'

      } else if (sum >= 41 && sum <= 60) {

        this.form.aer_ex12 = '半失能'

      } else if (sum >= 61 && sum <= 100) {

        this.form.aer_ex12 = '自理'

      } else {

        this.form.aer_ex12 = '分值异常'

      }

    },

    // 图片查看
    imageView (url) {
      return request({
        method: 'post',
        url: url,
        headers: {
          'token': sessionStorage.getItem('token')
        },
        data: {

        },
      })
    },

    // 请求数据
    evaluationReportQuestionView (data) {
      return request({
        method: 'post',
        // url: '/social/assistanceWeixin/WXListByPage?stype=' + escape(escape(this.$route.query.stype)),
        url: '/social/assistanceWeixin/evaluationReportQuestionView',
        data,
        headers: {
          token: sessionStorage.getItem('token1'),
        }
      })
    },

    //	列表选择
    optionEvent (value, key) {
      // console.log(value);

      if (key == '集中意愿') {

        this.form.aer_ex16 = value;
        this.showOption1 = false;

      } else if (key == '认知障碍') {

        this.form.aer_ex17 = value;
        this.showOption2 = false;

      } else if (key == '评估时间') {
        this.onConfirm(value)

      }
      console.log(this.form);

    },
    // 返回
    goBack () {
      window.history.back(-1);
    },


    // 评估时间 格式调整
    onConfirm (date1) {
      let date = new Date();
      console.log(date);
      this.time1 = date;
      let YY = date.getFullYear() + '-';
      let MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      let DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
      let hh = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours());
      let mm = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes());
      let ss = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());

      this.form.aer_dat3 = YY + MM + DD + " " + hh + ":" + mm + ":" + ss;

      this.showTime = false;
    },

    // 照片格式验证
    beforeRead (file) {
      if (file.type == 'image/heic' || file.type == '') {
        this.$toast.fail('照片格式不正确')
        return false
      } else {
        return true
      }
    },

    imgRequest (formData, file, num, index) {

      console.log('formData', formData);

      request({
        method: 'post',
        url: '/social/weixinMinios/fileUpload',
        data: formData,
      }).then(res => {

        file.status = 'done';
        file.message = '上传完成';
        console.log(res);


        if (num == 1) {
          if (this.form.aer_ex21) {

            this.form.aer_ex21 = this.form.aer_ex21.concat(',', res[0].filename)
          } else {
            this.form.aer_ex21 = this.form.aer_ex21.concat(res[0].filename)
          }

        } else if (num == 2) {
          if (this.form.aer_ex22) {

            this.form.aer_ex22 = this.form.aer_ex22.concat(',', res[0].filename)
          } else {
            this.form.aer_ex22 = this.form.aer_ex22.concat(res[0].filename)
          }

        }

      }).catch(error => {
        file.status = 'failed';
        file.message = '上传失败';

        if (num == 1) {
          this.fileList1.pop()
        } else if (num == 2) {
          this.fileList2.pop()

        }


        this.$toast.fail('上传失败')
        console.log(error)
      })
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

    // 删除
    beforeDelete (data) {
      return (file, detail) => {

        let arr = this.form[data].split(',')

        arr.splice(detail.index, 1)
        this.form[data] = arr.join(',')

        console.log(this.form[data])
        console.log(data)
        console.log(file)
        console.log(detail)
        return true
      }
    },

    save (btnName) {

      // 分值数组
      let arr = [];
      for (let i in this.question) {

        arr.push(this.question[i]);

      }
      console.log(arr);


      // 是题目否填报完整 false完整了  ，true 有空值
      var isAllQuestion = arr.some((item) => {
        return item == ''
      })

      // 照片字段过滤,去掉前缀-纸质评估表照片
      let imgArr21 = this.form.aer_ex21.split(',')

      if (imgArr21.length > 0) {
        let imgString = [];
        for (let i in imgArr21) {
          if (imgArr21[i].split('=').length == 2) {

            imgString.push(imgArr21[i].split('=')[1]);
          } else {
            imgString.push(imgArr21[i])
          }
        }

        console.log(imgString, 'imgString');
        this.form.aer_ex21 = imgString.join(',')
      }

      // 评估现场照片 
      let imgArr22 = this.form.aer_ex22.split(',')

      if (imgArr22.length > 0) {
        let imgString = [];
        for (let i in imgArr22) {
          if (imgArr22[i].split('=').length == 2) {

            imgString.push(imgArr22[i].split('=')[1]);
          } else {
            imgString.push(imgArr22[i])
          }
        }

        console.log(imgString, 'imgString');
        this.form.aer_ex22 = imgString.join(',')
      }

      console.log(this.form);

      // if(!isAllQuestion){
      //     let sum = 0 ;
      //     for(let j in arr){
      //         sum += Number(arr[j]); 
      //     }

      //     this.form.aer_ex15 = sum;

      //     if(sum >= 0 && sum <= 40){

      //         this.form.aer_ex12 =  '自理' 

      //     }else if(sum>=41 && sum <= 60){

      //         this.form.aer_ex12 =  '半失能' 

      //     }else if(sum >= 61 && sum <= 100){

      //         this.form.aer_ex12 =  '失能' 

      //     }else{

      //         this.form.aer_ex12 =  '分值异常'

      //     }


      //     sum = 0;
      // }

      // 特困供养能力评估结果：61-100分为自理，41-60为半失能，0-40为失能
      // 评估结果

      console.log(isAllQuestion, 'isAllQuestion');
      console.log(this.form.aer_ex15, 'this.form.aer_ex15');
      console.log(this.form.aer_ex12, 'this.form.aer_ex12');

      this.form.aer_ex11 = this.question;
      console.log(this.question);



      if (btnName == '暂存') {

      } else if (btnName == '提交') {
        if (isAllQuestion) {

          this.$toast.fail('请完善测评题目')
          return false

        } else if (this.form.aer_ex16 == '') {
          this.$toast.fail('请选择是否有集中供养意愿')
          return false
        } else if (this.form.aer_ex17 == '') {
          this.$toast.fail('请选择是否有精神病史或者精神认知障碍')
          return false
        }
        else {
          this.popshow = true
        }
      }

      console.log(this.form, 'this.form');

      // return false

      request({
        method: 'post',
        url: '/social/assistanceWeixin/saveTkEvaluationReportQuestion',
        data: {
          data: '[' + JSON.stringify(this.form) + ']',
          abr_ex10: btnName
        },
      }).then(res => {
        console.log(res);



        if (res[0].status == '+OK') {
          if (btnName == '提交') {

            this.$dialog.alert({
              message: '提交成功！',
            }).then(() => {
              // window.location.href= "/SelfCareAssessmentList"; 
              window.history.back(-1);
            })

          } else {

            // this.$toast.fail(res[0].msg);
            this.$dialog.alert({
              message: '暂存成功！',
            }).then(() => {
              // window.location.href= "/SelfCareAssessmentList"; 
              window.history.back(-1);
            })


          }
        } else {

          this.$dialog.alert({
            message: res[0].msg,
          }).then(() => {
            window.history.back(-1);
          })

        }

      }).catch(error => {

        if (btnName == '提交') {

          this.$toast.fail('提交失败')
        } else {
          this.$toast.fail('暂存失败')

        }


      })


    }
  },



}
</script>

<style scoped>
.SelfCareAssessmentTable {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  background-size: 100% 100%;
  position: fixed;
  overflow: auto;
}
.PGBTitle {
  color: #00aaff;
  line-height: 60px;
  padding: 10px 20px;
  text-align: left;
  font-size: 0.3rem;
}
header {
  width: 100%;
  height: 88px;
  /* background-color: #f5f5f5; */
  background-color: #3e80cc;
  box-shadow: 0px 0px 30px #a1a1a1;
  position: fixed;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  /* font-size: 10px; */
  font-size: 28px;
  color: #ffffff;
}
main {
  padding-top: 0px;
  margin-bottom: 30px;
}
.marginstyle {
  margin: 10px;
}
.pg_result {
  width: 100%;
  margin-top: 80px;
  display: flex;
  background-color: rgb(227, 253, 255);
  margin: 80px auto 0;
  text-align: center;
  /* box-shadow: (0, 0 5px)#545454; */
}

.page4Img {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 140px;
  /* margin-top:40px; */
}
.page4Img22 {
  margin-top: 40px;
}
.page4Img2 {
  background-color: #fff;
  overflow: auto;
  text-align: left;
  /* width:85%; */
  width: 100%;
  height: 500px;
  font-size: 28px;
  color: #545454;
  padding: 10px 30px;
  /* border-radius: 30px; */
  overflow: hidden;
  box-sizing: border-box;
  /* border:#aaa solid 1px; */
}
.page4Img2Font {
  height: 80px;
  line-height: 80px;
  font-size: 28px;
}
.page4Img2Div {
  margin-top: 10px;
}
.van-button {
  border-radius: unset;
}
</style>
<template>
  <div class="helpApply">
    <header>
      <div class="headerHead">
        <div>
          <div :class="{headerF:isShow}">申请须知</div>
          <!-- <div class="headerCircle"></div> -->
        </div>
        <div class="headerRectangle"></div>
        <div>
          <div :class="{headerF:isShow2}">在线填表</div>
          <!-- <div class="headerCircle"></div> -->
        </div>
        <div class="headerRectangle"></div>
        <div>
          <div :class="{headerF:isShow3}">材料申报</div>
          <!-- <div class="headerCircle"></div> -->
        </div>
      </div>
    </header>
    <main>
      <div id="page1"
           v-show="page1"
           style="height: auto; display: block;text-align: left;">
        <div style="color:#333333;padding-left:20px;padding-right:20px;margin-top: 110px;">
          <span class="page1Font1">温馨提示:</span><br><br>
          <span class="page1Font2">1.申请救助需提供申请人的身份证件；</span><br><br>
          <span class="page1Font2">2.救助核查可能会通过大数据核对申请人家庭财产收入等状况，需要申请人授权确认；</span><br><br>
          <span class="page1Font2">3.申请人需对所提供材料和信息的真实性负责，否则有可能影响个人诚信记录。</span><br><br>
        </div>
        <div style="margin-top: 40px;">
          <div v-if="isApply">
            <van-button type="info"
                        size="large"
                        style="width: 100%;height:55px"
                        @click="next1"
                        to="policiesCalculator">不 了 解 政 策 , 进 行 自 我 评 估</van-button>
            <van-button type="primary"
                        size="large"
                        style="width: 100%;margin-top: 30px;height:55px"
                        @click="isApply = false">了 解 政 策 , 直 接 进 入 申 请</van-button>
          </div>
          <div v-if="!isApply"
               style="display: flex;justify-content: center;">
            <van-checkbox v-model="checked"
                          class="page1Font3">我已知晓，并继续下一步操作</van-checkbox>
          </div>
        </div>
        <div v-show="checked"
             style="margin-left: 20px;margin-right: 20px;margin-top: 40px;">
          <div style="width: 100%;margin-bottom: 10px;">民政救助申请</div>
          <van-button type="info"
                      style="width: 100%;"
                      @click="next1">下一步</van-button>
          <!-- <van-button type="info" style="width: 100%;" @click="next1">下一步</van-button> -->
          <!-- <div style="width: 100%;margin-top: 10px;">其他协助申请</div> -->
          <!-- <van-button type="primary" style="width: 100%;margin-top: 10px;" to="flyzList">法律援助</van-button>
					<van-button type="primary" style="width: 100%;margin-top: 10px;" to="ylApply">医疗救助</van-button>
					<van-button type="primary" style="width: 100%;margin-top: 10px;" to="hhApply">红会救助</van-button>
					<van-button type="primary" style="width: 100%;margin-top: 10px;" to="csApply">慈善救助</van-button> -->
          <!-- <van-button type="primary"
                      style="width: 100%;margin-top: 10px;"
                      to="qtApply?type=医疗救助">医疗救助</van-button>
          <van-button type="primary"
                      style="width: 100%;margin-top: 10px;"
                      to="qtApply?type=法律援助">法律援助</van-button>
          <van-button type="primary"
                      style="width: 100%;margin-top: 10px;"
                      to="qtApply?type=慈善救助">慈善救助</van-button>
          <van-button type="primary"
                      style="width: 100%;margin-top: 10px;"
                      to="qtApply?type=教育救助">教育救助</van-button>
          <van-button type="primary"
                      style="width: 100%;margin-top: 10px;"
                      to="qtApply?type=康复救助">康复救助</van-button>
          <van-button type="primary"
                      style="width: 100%;margin-top: 10px;"
                      to="qtApply?type=住房救助">住房救助</van-button>
          <van-button type="primary"
                      style="width: 100%;margin: 10px 0;"
                      to="qtApply?type=就业救助">就业救助</van-button> -->
          <!-- <van-button type="primary"
                      style="width: 100%;margin-top: 10px;"
                      to="qtApply?type=社会力量救助">社会力量救助</van-button> -->
        </div>
      </div>

      <div id="page2"
           v-show="page2"
           style="display: block;padding-top: 10px;">
        <div class="page2Div1">
          <div class="page2Div2">
            <!-- <span style="background-color: #1989fa;display: inline-block;width: 3px;height: 14px;margin-right:5px"></span> -->
            <span style="color: #333333;"
                  class="title2">基本信息</span>
          </div>
          <van-form ref='apply'
                    @submit="next2"
                    style="margin-top: 10px;">
            <van-field required
                       name="ab_ex75"
                       label="申请方式"
                       :rules="rules.rules1">
              <template #input>
                <van-radio-group v-model="form.ab_ex75"
                                 direction="horizontal">
                  <van-radio name="委托代理">代申请</van-radio>
                  <van-radio name="本人">本人</van-radio>
                </van-radio-group>
              </template>
            </van-field>

            <!-- v-show="false" -->
            <van-field required
                       readonly
                       name="ab_ex13"
                       :value="form.ab_ex13"
                       label="求助类别"
                       @click="showOption1 = true"
                       is-link
                       placeholder="请选择一个求助类别"
                       clickable
                       :rules="rules.rules11" />
            <van-popup v-model="showOption1"
                       position="bottom">
              <van-picker show-toolbar
                          :columns='help_list'
                          @confirm="optionEvent($event)"
                          @cancel="showOption1 = false" />
            </van-popup>

            <van-field required
                       v-model="form.ab_ex3"
                       maxlength="10"
                       name="ab_ex3"
                       label="救助人姓名"
                       placeholder="请输入救助人姓名"
                       :rules="rules.rules2">
              <template #button>
                <van-uploader :before-read="beforeRead"
                              :after-read="uploadImg('pz')"
                              :before-delete="beforeDelete('photo')">
                  <van-button size="small"
                              type="info"
                              native-type="button">拍照识别
                  </van-button>
                </van-uploader>
              </template>
            </van-field>
            <van-field v-model="form.ab_ex7"
                       name="ab_ex7"
                       label="身份证号"
                       placeholder="请输入身份证号" />
            <van-field required
                       v-model="ab_ex162_2"
                       name="ab_ex162_2"
                       center
                       readonly
                       label="行政区划"
                       placeholder="请选择所在行政区划"
                       @click="show = true"
                       :rules="rules.rules4">
              <template #button>
                <van-button size="small"
                            type="info"
                            native-type="button"
                            @click.stop="syqh">市外</van-button>
              </template>
            </van-field>

            <van-popup v-model="show"
                       round
                       position="bottom">
              <van-cascader title="请选择所在行政区划"
                            :options="options"
                            @close="show = false"
                            @finish="onFinish" />

            </van-popup>

            <van-field required
                       v-model="form.ab_ex11"
                       maxlength="50"
                       name="ab_ex11"
                       label="家庭住址"
                       placeholder="家庭住址"
                       :rules="rules.rules5" />
            <van-field required
                       v-model="form.ab_ex5"
                       name="ab_ex5"
                       type="number"
                       label="家庭人口"
                       placeholder="家庭人口"
                       :rules="rules.rules6" />
            <van-field required
                       name="ab_ex6"
                       label="户籍性质"
                       :rules="rules.rules7">
              <template #input>
                <van-radio-group v-model="form.ab_ex6"
                                 direction="horizontal">
                  <van-radio name="农业户口">农业户口</van-radio>
                  <van-radio name="非农业户口">非农业户口</van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <van-field required
                       v-model="form.ab_ex28"
                       center
                       type="number"
                       name="ab_ex28"
                       label="联系电话"
                       placeholder="联系电话"
                       :rules="rules.rules8">
              <template #button>
                <van-button size="small"
                            type="info"
                            :disabled="hqyzmDis"
                            native-type="button"
                            @click='hqyzm'>{{hqyzmtext}}</van-button>
              </template>
            </van-field>
            <van-field v-model="form.yanzm"
                       center
                       name="yanzm"
                       type="number"
                       label="验证码"
                       placeholder="验证码"
                       :rules="rules.rules12" />

            <!-- <van-field required name="ab_ex13_1" label="求助类别" :rules="rules.rules11"> -->
            <!-- <template #input> -->
            <!-- 保存转成字符串保存到ab_ex13 -->
            <!-- <van-checkbox-group v-model="ab_ex13_1" direction="horizontal" @change="qzlbChange"> -->
            <!-- <van-checkbox :disabled="dis1" class="marginstyle" name="社会救助" shape="square">社会救助</van-checkbox> -->
            <!-- <van-checkbox :disabled="dis1" class="marginstyle" name="特困供养" shape="square">特困供养</van-checkbox>
									<van-checkbox :disabled="dis1" class="marginstyle" name="家庭边缘" shape="square">低保边缘家庭</van-checkbox> -->
            <!-- <van-checkbox :disabled="dis1" class="marginstyle" name="困境儿童" shape="square">困境儿童</van-checkbox> -->
            <!-- 手机申请尊老金隐藏，暂时不申请 -->
            <!-- <van-checkbox :disabled="dis2" class="marginstyle" name="尊老金" shape="square">尊老金</van-checkbox> -->
            <!-- <van-checkbox :disabled="dis1" class="marginstyle" name="临时救助" shape="square">临时救助</van-checkbox> -->
            <!-- <van-checkbox :disabled="dis1" class="marginstyle" name="残疾人两项补贴" shape="square">残疾人两项补贴</van-checkbox> -->
            <!-- <van-checkbox :disabled="dis1" class="marginstyle" name="支出型困难" shape="square">支出型困难家庭</van-checkbox> -->
            <!-- <van-checkbox :disabled="dis1" class="marginstyle" name="重度失能" shape="square">重度失能护理补贴</van-checkbox> -->
            <!-- <van-checkbox class="marginstyle" name="医疗救助" shape="square">医疗救助</van-checkbox> -->
            <!-- <van-checkbox class="marginstyle" name="教育救助" shape="square">教育救助</van-checkbox> -->
            <!-- <van-checkbox class="marginstyle" name="住房救助" shape="square">住房救助</van-checkbox> -->
            <!-- <van-checkbox class="marginstyle" name="就业救助" shape="square">就业救助</van-checkbox> -->
            <!-- <van-checkbox class="marginstyle" name="法律援助" shape="square">法律援助</van-checkbox> -->
            <!-- </van-checkbox-group> -->
            <!-- </template> -->

            <van-field required
                       name="ab_ex46_1"
                       label="求助原因"
                       :rules="rules.rules10">
              <template #input>
                <!-- 保存转成字符串保存到ab_ex46 -->
                <van-checkbox-group v-model="ab_ex46_1"
                                    direction="horizontal">
                  <van-checkbox class="marginstyle"
                                name="疾病"
                                shape="square">疾病</van-checkbox>
                  <van-checkbox class="marginstyle"
                                name="受灾"
                                shape="square">受灾</van-checkbox>
                  <van-checkbox class="marginstyle"
                                name="失业"
                                shape="square">失业</van-checkbox>
                  <van-checkbox class="marginstyle"
                                name="教育"
                                shape="square">教育</van-checkbox>
                  <van-checkbox class="marginstyle"
                                name="住房"
                                shape="square">住房</van-checkbox>
                  <van-checkbox class="marginstyle"
                                name="残疾"
                                shape="square">残疾</van-checkbox>
                  <van-checkbox class="marginstyle"
                                name="缺乏劳动力"
                                shape="square">缺乏劳动力</van-checkbox>
                  <van-checkbox class="marginstyle"
                                name="其他"
                                shape="square">其他</van-checkbox>
                </van-checkbox-group>
              </template>
            </van-field>
            <van-field required
                       v-model="form.ab_ex93"
                       maxlength="100"
                       name="ab_ex93"
                       rows="2"
                       type="textarea"
                       show-word-limit
                       label="求助描述"
                       placeholder="请填写100字以内的求助描述"
                       :rules="rules.rules9" />
            <div style="margin: 16px 0 16px 0;display: flex;justify-content: space-around;">
              <van-button block
                          native-type="button"
                          @click="back2">上一步</van-button>
              <van-button block
                          type="info"
                          native-type="button"
                          @click="next2">下一步</van-button>
            </div>
          </van-form>
        </div>
      </div>

      <div id="page3"
           v-show="page3"
           style="display: none;">
        <div class="page3Class">
          <div style="height:40px;line-height:40px">身份证照片:</div>
          <div id="img"
               style="margin-top:10px;">
            <div style="position:relative;width:100%;float: left;"
                 id="be">
              <div style="width:40%;height:200px;text-align: center;float: left;margin-left:20px;"
                   class="cd-bouncy-nav-trigger"
                   id="sfzm">
                <van-uploader v-model="fileList"
                              :before-read="beforeRead"
                              :max-count="1"
                              :after-read="uploadImg(1)"
                              :before-delete="beforeDelete('ab_ex10_1')" />

                <br>
                <span>上传身份证国徽面</span>
              </div>
              <div style="width:40%;height:200px;text-align: center;float: right;margin-right:20px;"
                   class="cd-bouncy-nav-trigger"
                   id="sfzm2">
                <van-uploader v-model="fileList2"
                              :before-read="beforeRead"
                              :max-count="1"
                              :after-read="uploadImg(2)"
                              :before-delete="beforeDelete('ab_ex10_2')" />

                <br>
                <span>上传身份证头像面</span>
              </div>
            </div>
          </div>
        </div>
        <div class="page3Class2">
          <div style="height:40px;line-height:40px;">证明材料照片:</div>
          <div style="margin-top:10px;">
            <div style="position:relative;width:100%;float: left;">
              <van-uploader v-model="fileList3"
                            :before-read="beforeRead"
                            :after-read="uploadImg(3)"
                            :before-delete="beforeDelete('ab_ex16')" />

            </div>
          </div>
        </div>
        <!-- <div style="margin-top: 20px;display: flex;justify-content: space-around;">
					<van-button type="info" native-type="button" @click="back3">上一步</van-button>
					<van-button type="info" @click="save">提交</van-button>
				</div> -->
        <div style="margin-top: 20px;display: flex;justify-content: space-around;">
          <van-button block
                      native-type="button"
                      @click="back3">上一步</van-button>
          <van-button block
                      type="info"
                      @click="save">提交</van-button>
        </div>
      </div>
    </main>
    <footer>
    </footer>
  </div>
</template>

<script>
import request from '@/utils/request.js'
import { verifyCodeApi } from "@/api"

import { compressImg, tszfValidate, tszfFilter, tszfFilter2, getAge, getBirthday, getSex, xzqh, isCardID } from '@/utils/utils.js'
export default {
  data () {
    return {
      dis1: false,
      dis2: false,
      isShow: true,
      isShow2: false,
      isShow3: false,
      isApply: true,
      checked: false,
      page1: true,
      page2: false,
      page3: false,
      hqyzmtext: '获取验证码',
      m: 60,
      rules: {
        rules1: [
          {
            required: true,
            message: '请选择申请方式',
            trigger: 'onBlur'
          }
        ],
        rules2: [
          {
            required: true,
            message: '请填写姓名',
            trigger: 'onBlur',

          },
          { pattern: /^(?:[\u4e00-\u9fa5]{2,16})$/, message: '姓名应为2-16位的汉字', trigger: 'onBlur' }
        ],
        rules4: [
          {
            required: true,
            message: '请选择行政区划',
            trigger: 'onBlur'
          }
        ],
        rules5: [
          {
            required: true,
            message: '请填写家庭住址',
            trigger: 'onBlur'
          }
        ],
        rules6: [
          {
            required: true,
            message: '请填写家庭人口',
            trigger: 'onBlur'
          }
        ],
        rules7: [
          {
            required: true,
            message: '请选择户籍性质',
            trigger: 'onBlur'
          }
        ],
        rules8: [
          {
            required: true,
            message: '请填写联系电话',
            trigger: 'onBlur'
          }
        ],
        rules9: [
          {
            required: true,
            message: '请填写求助描述',
            trigger: 'onBlur'
          }
        ],
        rules10: [
          {
            required: true,
            message: '请选择求助原因',
            trigger: 'onBlur'
          }
        ],
        rules11: [
          {
            required: true,
            message: '请选择求助类别',
            trigger: 'onBlur'
          }
        ],
        rules12: [
          {
            required: true,
            message: '请填写验证码',
            trigger: 'onBlur'
          }
        ],

      },
      // 
      form: {
        ab_ex75: '本人',
        ab_ex3: '',
        ab_ex7: '',
        ab_ex1: '',
        ab_ex2: '',
        ab_ex4: '',
        ab_ex11: '',
        ab_ex13: '',//模块名称
        ab_ex15: '申请',	//业务节点
        ab_ex5: '',
        ab_ex6: '',
        ab_ex28: '',
        ab_ex46: '',
        ab_ex93: '',
        ab_ex161: '',
        ab_ex157: '泰州公众号', //数据来源
        ab_ex162: '',
        yanzm: '',
        ab_dat14: '',
        ab_ex10: '', //身份证正头像面照片
        ab_ex10_1: '', //身份证国徽面照片
        ab_ex10_2: '', //身份证头像面照片
        ab_ex16: '', //其他证明材料照片
      },
      ab_ex46_1: [], //保存转换成字符串保存到form的ab_ex46
      // ab_ex13_1: [],//保存转换成字符串保存到form的ab_ex13
      fileList: [],
      fileList2: [],
      fileList3: [],
      ab_ex162: '',
      ab_ex162_2: '',
      yzm: '',    //正确验证码
      show: false,
      // 获取验证码按钮禁用状态
      hqyzmDis: false,
      // 选项列表，children 代表子选项，支持多级嵌套
      // options: xzqh,
      options: [],
      // help_type:'',
      // help_list:['群众申请','困境儿童'],
      help_list: ['群众申请', '困境儿童', '尊老金', '残疾人两项补贴'],
      showOption1: false,  // 救助类型选择列表
    }
  },
  created () {

    // 根据Home页面给的userId来获取用户信息（userId为通号提供以链接形式拼在后面？userId=...）
    // request({
    // 	method:'post',
    // 	url: '/social/assistanceWeixin/getUserInfo',
    // 	params:{
    // 		userId:localStorage.getItem("cs_userId") ? localStorage.getItem("cs_userId") : ""
    // 	}
    // }).then(res=>{
    // 	console.log(res)
    // 	if(res.success){
    // 		this.form.ab_ex7 = res.data.cardNo
    // 		this.form.ab_ex28 = res.data.phone
    // 		this.form.ab_ex3 = res.data.userName
    // 		this.form.ab_ex69 = res.data.sex

    // 	}
    // }).catch(error=>{
    // 	this.$toast.fail('数据请求失败2')
    // 

    request({
      method: 'post',
      url: '/social/assistanceWeixin/getCitys',
      data: {
        // ab_ex13:this.ab_ex13_1.join(),
        // ab_ex7:this.form.ab_ex7,
        // ab_ex3:this.form.ab_ex3
      }
    }).then(res => {
      console.log(res, '接口区划');
      // 市区
      for (let i in res) {
        this.options.push({ text: '', value: '', children: [] });
        this.options[i].text = res[i].n.split('#')[0];
        this.options[i].value = '#' + res[i].n.split('#')[1];
        // 街道
        for (let j in res[i].c) {
          // this.options[i].children=[]
          this.options[i].children[j] = { text: '', value: '', children: [] };
          this.options[i].children[j].text = res[i].c[j].n.split('#')[0];
          this.options[i].children[j].value = '#' + res[i].c[j].n.split('#')[1];
          // 村居
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

    //	列表选择
    optionEvent (value) {

      console.log(value);
      this.form.ab_ex13 = value;

      this.showOption1 = false;

    },

    // 行政区划 选择 市外
    syqh () {
      this.ab_ex162 = '泰州市外';
      this.ab_ex162_2 = '泰州市外';
      this.form.ab_ex2 = '泰州市外';
      this.form.ab_ex162_2 = '泰州市外';
      console.log(this.ab_ex162);
    },

    // 我已知晓，下一步
    next1 () {

      this.page1 = false;
      this.page2 = true;
      this.isShow = false;
      this.isShow2 = true;
    },

    // 基础信息填完，下一步
    async next2 () {
      if (this.form.ab_ex13 == '') {
        this.$toast.fail('请选择一种求助类别')
        return fals
      }

      // 去除姓名的空白符号并且判断姓名是否合法
      this.form.ab_ex3 = this.form.ab_ex3.replace(/\s*/g, "")
      let tszf = tszfValidate(this.form.ab_ex3)
      if (tszf) {
        this.$toast.fail("请输入正确的姓名")
        return false
      }
      // 判断身份证是否合法
      let msg = isCardID(this.form.ab_ex7);

      if (msg) {
        this.$toast.fail(msg)
        return false
      }

      // 困境儿童、尊老金申请判断
      let age = getAge(this.form.ab_ex7);
      if (age < 80 && this.form.ab_ex13 == '尊老金') {
        this.$dialog.alert({
          message: '申请尊老金需要大于80周岁',
        }).then(() => {

        })
        return false
      } else if (age >= 18 && this.form.ab_ex13 == '困境儿童') {
        this.$dialog.alert({
          message: '申请困境儿童需要小于18周岁',
        }).then(() => {

        })
        return false
      }

      console.log(age);

      // 过滤家庭住址特殊字符和空格
      this.form.ab_ex11 = this.form.ab_ex11.replace(/\s*/g, "")
      this.form.ab_ex11 = tszfFilter(this.form.ab_ex11)
      // 家庭人口验证1-20人
      if (this.form.ab_ex5 < 1 || this.form.ab_ex5 > 20) {
        this.$toast.fail("家庭人口在1-20之间")
        return false
      }
      // 验证手机号
      var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
      if (!myreg.test(this.form.ab_ex28)) {
        this.$toast.fail('请填写正确的手机号')
        return false
      }

      const verifyCodeRes = await verifyCodeApi({
        "code": this.form.yanzm,
        "phone": this.form.ab_ex28
      })

      if (verifyCodeRes.status !== "+OK") return this.$toast(verifyCodeRes.msg)
      // // 判断验证码是否正确
      // if (!this.yzm || this.yzm != this.form.yanzm) {
      //   // 测试用(等于0可以继续下一步)
      //   if (this.form.yanzm != '0') {
      //     this.$toast.fail('验证码错误')
      //     return false
      //   }
      //   return false
      // }

      // 过滤求助描述特殊字符和空格
      this.form.ab_ex93 = this.form.ab_ex93.replace(/\s*/g, "")
      this.form.ab_ex93 = tszfFilter2(this.form.ab_ex93)

      // 验证求助类别是否已经申请
      // request({
      // 	method:'post',
      // 	url: '/social/assistanceWeixin/checkRepeat',
      // 	data:{
      // 		ab_ex13:this.ab_ex13_1.join(),
      // 		ab_ex7:this.form.ab_ex7,
      // 		ab_ex3:this.form.ab_ex3
      // 	}
      // }).then(res=>{
      // 	console.log(res)
      // 	if(res[0].status == '+OK'){
      // 		console.log(this.form)
      // 		this.$refs.apply.validate().then(()=>{
      this.page2 = false;
      this.page3 = true;
      this.isShow2 = false;
      this.isShow3 = true;
      // 		}).catch((err)=>{
      // 			console.log(err)
      // 			this.$toast.fail(err[0].message)
      // 		})
      // 	}else{
      // 		this.$toast.fail(res[0].msg)
      // 	}
      // }).catch(error=>{
      // 	this.$toast.fail('数据请求失败')
      // })

    },

    back2 () {
      this.page1 = true
      this.page2 = false
      this.isShow = true
      this.isShow2 = false
    },

    save () {
      // return console.log(this.form)
      // if(!this.form.ab_ex10_1){
      // 	this.$dialog({
      // 		message:'请上传身份证国徽面照片'
      // 	})
      // 	return
      // }else if(!this.form.ab_ex10_2){
      // 	this.$dialog({
      // 		message:'请上传身份证头像面照片'
      // 	})
      // 	return
      // }
      if (this.fileList.length == 0) {
        this.$dialog({
          message: '身份证国徽面不能为空'
        })
        return
      }
      if (this.fileList2.length == 0) {
        this.$dialog({
          message: '身份证头像面不能为空'
        })
        return
      }

      // let IDCardImg = this.fileList.concat(this.fileList2);
      console.log(this.form.ab_ex10_1);
      console.log(this.form.ab_ex10_2);

      this.form.ab_ex10 = this.form.ab_ex10_1 + ',' + this.form.ab_ex10_2;
      // this.form.ab_ex10 = IDCardImg.join(',');

      // console.log(IDCardImg);
      console.log(this.form.ab_ex10);

      // return false
      // 遮罩
      let toast = this.$toast({
        type: 'loading',
        message: '提交中...',
        overlay: true,
        duration: 0
      })

      var date = new Date();
      var year = date.getFullYear(); //获取当前年份
      var mon = date.getMonth() + 1; //获取当前月份
      var da = date.getDate(); //获取当前日
      var day = date.getDay(); //获取当前星期几
      var h = date.getHours(); //获取小时
      var m = date.getMinutes(); //获取分钟
      var s = date.getSeconds(); //获取秒
      var d = document.getElementById('Date');
      h < 10 ? h = '0' + h : h;
      m < 10 ? m = '0' + m : m;
      s < 10 ? s = '0' + s : s;
      var mytime = year + '-' + mon + '-' + da + ' ' + h + ':' + m + ':' + s;
      this.form.ab_dat14 = mytime

      // ab_ex46数组转换成字符串
      this.form.ab_ex46 = this.ab_ex46_1.join()
      // ab_ex13数组转换成字符串
      // this.form.ab_ex13 = this.ab_ex13_1.join()
      //如果选择了尊老金需要满足80周岁

      if (this.form.ab_ex13.includes("尊老金")) {
        this.form.ab_dat11 = getBirthday(this.form.ab_ex7)
        this.form.ab_ex69 = getSex(this.form.ab_ex7)

        let age = getAge(this.form.ab_ex7)
        this.form.ab_ex70 = age
        if (age < 80) {
          this.$dialog({
            message: '申请尊老金需要大于80周岁'
          })
          toast.clear()
          return
        }
      }

      // 提交
      request({

        method: 'post',
        url: '/social/assistanceWeixin/applyBasic',
        // url: '/social/assistanceWeixin/saveApply',
        // url: '/social/assistanceWeixin/saveBasic',
        data: {
          "data": '[' + JSON.stringify(this.form) + ']',
          // "data":formData,
          // type: '申请'
        },
      }).then(res => {
        toast.clear()
        // 提示提交成功
        // this.$toast.success('提交成功')
        // this.$router.push('/')
        this.$dialog.alert({
          message: '提交成功',
        }).then(() => {
          this.$router.push('/')
        })
        console.log(res)
      }).catch(error => {
        toast.clear()
        // 提示提交失败
        this.$toast.fail('提交失败')
        console.log(error)
      })
    },

    // 求助类型选择--泰州，没有

    // 尊老金 》=80，
    // 救助类型选择
    qzlbChange (val) {
      // if(){

      // }
      console.log(val, 1)
      if (val.length == 1) {
        if (val[0] == "尊老金") {
          this.dis1 = true
        } else {
          this.dis2 = true
        }
      } else if (val.length == 0) {
        this.dis1 = false
        this.dis2 = false
      }
    },

    // 图片材料返回
    back3 () {
      this.page3 = false,
        this.page2 = true
      this.isShow3 = false,
        this.isShow2 = true
    },

    // 全部选项选择完毕后，会触发 finish 事件
    onFinish ({ selectedOptions }) {
      this.show = false;
      console.log(selectedOptions.map((option) => option.text))
      let area = selectedOptions.map((option) => option.text)
      let area2 = selectedOptions.map((option) => option.text + option.value)
      this.form.ab_ex1 = area[2]
      this.form.ab_ex2 = area[1]
      this.form.ab_ex161 = area[0]
      this.ab_ex162_2 = area.join('/');
      this.form.ab_ex162 = area2.join(',');
      // 更改家庭住址
      if (this.form.ab_ex11 == '') {
        this.form.ab_ex11 = area[0] + area[1] + area[2];
      }
    },


    // 行政区划泰兴区外
    // xzqh(){
    // 	this.ab_ex162 = '泰兴区外';
    // 	this.form.ab_ex2 = '泰兴区外'
    // },


    // 验证码
    hqyzm () {
      var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
      if (!myreg.test(this.form.ab_ex28)) {
        this.$toast.fail('请填写正确的手机号')
        return false
      }
      // 获取验证码
      console.log('-----------------')

      request({
        method: 'POST',
        // /social/assistanceWeixin/sendSMS2
        // url: '/social/assistanceWeixin/backTelCheck',
        url: '/social/assistanceWeixin/sendSMS2',
        params: {
          mobiles: this.form.ab_ex28
        },

      }).then(res => {
        // return console.log(res)
        if (res.status === '+OK') {
          this.$toast.success(res.msg)
        } else {
          this.$toast.fail(res.msg)
        }
      }).catch(error => {
        this.$toast.fail("验证码发送失败")
        console.log(error)
      })

      console.log('-----------------')
      // 倒计时
      this.hqyzmtext = this.m + 's'
      this.hqyzmDis = true
      let time = setInterval(() => {
        this.m--
        this.hqyzmtext = this.m + 's'
        if (this.m == 0) {
          this.hqyzmtext = '获取验证码'
          this.m = 60
          this.hqyzmDis = false

          clearInterval(time)
        }
      }, 1000)
    },
    // hqyzmajax(data){
    // 	return request({
    // 		method:'post',
    // 		url: '/social/assistanceWeixin/WXshejiu',
    // 		data:data,
    // 	})
    // },

    // 照片格式验证
    beforeRead (file) {
      console.log(file, 'file');
      if (file.type == 'image/heic' || file.type == '') {
        this.$toast.fail('照片格式不正确')
        return false
      } else {
        return true
      }
    },

    // 图片请求
    imgRequest (param, file, num) {
      console.log(222);
      console.log(param, file, num);

      request({
        method: 'post',
        url: '/social/weixinMinios/fileUpload',
        // url: '/social/minios/fileUpload',
        data: param,
      }).then(res => {
        file.status = 'done';
        file.message = '上传完成';
        console.log(res)

        if (num == 1 || num == 2 || num == 'pz') {
          //console.log(file.content)

          // 9.15 泰州没有身份证照片的姓名身份证号与申请人姓名身份证号对比--- 先不调用
          // // 需要发送身份证照片到后台获取身份证号和姓名是否和前面输入的身份证号，姓名相同
          request({
            method: 'post',
            url: '/social/assistanceWeixin/idOrc',
            data: {
              img: file.content
            }
            // data:{
            // 	img:file.content
            // },

          }).then(res => {
            console.log(res, num);
            if (num == 2 || num == 'pz') {
              if (res[0].status == 'ok') {

                if (res[0].data.words_result_num != "0") {
                  try {
                    let data = res[0].data.words_result;
                    //	console.log("data========================")
                    console.log(data)
                    if (num == 'pz') {

                      this.form.ab_ex7 = data["公民身份号码"].words
                      this.form.ab_ex3 = data["姓名"].words
                      this.form.ab_ex4 = data["住址"].words
                    }

                    // if(name !=this.form.ab_ex3||sCode!=this.form.ab_ex7){
                    // 	this.fileList2.pop()
                    // 	this.$toast.fail('身份证对比信息不符,请上传正确的身份证')
                    // }else{

                    // }
                  } catch (e) {
                    this.fileList2.pop()
                    this.$toast.fail('身份证对比信息不符,请上传正确的身份证1')
                  }

                  // alert(sCode+"=="+name)
                } else {
                  this.fileList2.pop()
                  this.$toast.fail('身份证对比信息不符,请上传正确的身份证2')
                }
              } else {
                this.fileList2.pop()
                this.$toast.fail('身份证对比信息不符,请上传正确的身份证3')
              }
            } else if (num == 1) {
              if (res[0].status == 'ok') {

                console.log(res[0].data, "data========================")
                if (res[0].status == "ok") {
                  try {
                    let data = res[0].data.words_result;
                    //	console.log(data)
                    let name1 = data["签发机关"].words;
                    let name2 = data["签发日期"].words;
                    let name3 = data["失效日期"].words;
                    if (!name1 || !name2 || !name3) {
                      this.fileList.pop()
                      this.$toast.fail('身份证国徽面照片不符,请上传正确的身份证国徽面1')
                    } else {

                    }
                  } catch (e) {
                    this.fileList.pop()
                    this.$toast.fail('身份证国徽面照片不符,请上传正确的身份证国徽面2')
                  }

                  // alert(sCode+"=="+name)
                } else {
                  this.fileList.pop()
                  this.$toast.fail('身份证国徽面照片不符,请上传正确的身份证国徽面3')
                }
              } else {
                this.fileList.pop()
                this.$toast.fail('身份证国徽面照片不符,请上传正确的身份证国徽面4')
              }
            }

          }).catch(err => {
            console.log(err)
            this.$toast.fail('拍照识别请求失败')
          })

          if (num == 1) {

            this.form.ab_ex10_1 = res[0].filename;

          } else if (num == 2) {

            this.form.ab_ex10_2 = res[0].filename;

          }

        } else if (num == 3) {
          console.log("其他证明材料")
          if (this.form.ab_ex16) {
            this.form.ab_ex16 = this.form.ab_ex16.concat(',', res[0].filename)
          } else {
            this.form.ab_ex16 = this.form.ab_ex16.concat(res[0].filename)
          }
          console.log(this.form.ab_ex16)
        }
      }).catch(erro => {
        file.status = 'failed';
        file.message = '上传失败';
        if (num == 1) {
          this.fileList.pop()
        } else if (num == 2) {
          this.fileList2.pop()
        } else if (num == 3) {
          this.fileList3.pop()
        }
        this.$toast.fail('上传失败')
        console.log(erro)
      })
    },

    // 照片上传
    uploadImg (num) {
      return file => {
        console.log(file)
        console.log(num)
        file.status = 'uploading';
        file.message = '上传中...';

        let obj = new compressImg(file, num, this.imgRequest)

      }
    },

    // 照片删除
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

    //求助描述 
    // selectChange(val){
    // 	if(val.indexOf('生病')!= -1){
    // 		this.ab_ex46_1.indexOf('疾病')==-1 ? this.ab_ex46_1.push('疾病') : ''
    // 		this.ab_ex13_1.indexOf('低保')==-1 ? this.ab_ex13_1.push('低保') : ''
    // 	}
    // 	if(val.indexOf('火灾')!= -1 || val.indexOf('洪水')!= -1 || val.indexOf('发大水')!= -1){
    // 		this.ab_ex46_1.indexOf('受灾')==-1 ? this.ab_ex46_1.push('受灾') : ''
    // 		this.ab_ex13_1.indexOf('临时救助')==-1 ? this.ab_ex13_1.push('临时救助') : ''
    // 	}
    // 	if(val.indexOf('工作')!= -1 || val.indexOf('失业')!= -1 || val.indexOf('没工作')!= -1){
    // 		this.ab_ex46_1.indexOf('失业')==-1 ? this.ab_ex46_1.push('失业') : ''
    // 		this.ab_ex13_1.indexOf('就业救助')==-1 ? this.ab_ex13_1.push('就业救助') : ''
    // 	}
    // 	if(val.indexOf('读书')!= -1 || val.indexOf('教育')!= -1){
    // 		this.ab_ex46_1.indexOf('教育')==-1 ? this.ab_ex46_1.push('教育') : ''
    // 		this.ab_ex13_1.indexOf('教育救助')==-1 ? this.ab_ex13_1.push('教育救助') : ''
    // 	}
    // 	if(val.indexOf('房子')!= -1 || val.indexOf('住房')!= -1){
    // 		this.ab_ex46_1.indexOf('住房')==-1 ? this.ab_ex46_1.push('住房') : ''
    // 		this.ab_ex13_1.indexOf('住房救助')==-1 ? this.ab_ex13_1.push('住房救助') : ''
    // 	}
    // 	if(val.indexOf('瞎子')!= -1 || val.indexOf('聋子')!= -1 || val.indexOf('残疾')!= -1){
    // 		this.ab_ex46_1.indexOf('残疾')==-1 ? this.ab_ex46_1.push('残疾') : ''
    // 		this.ab_ex13_1.indexOf('残疾人两项补贴')==-1 ? this.ab_ex13_1.push('残疾人两项补贴') : ''
    // 	}
    // 	if(val.indexOf('劳动力')!= -1){
    // 		this.ab_ex46_1.indexOf('缺乏劳动力')==-1 ? this.ab_ex46_1.push('缺乏劳动力') : ''
    // 		this.ab_ex13_1.indexOf('低保')==-1 ? this.ab_ex13_1.push('低保') : ''
    // 	}
    // },
  }
}
</script>

<style scoped>
.headerF {
  color: #333333;
}
.marginstyle {
  margin: 10px;
}
.helpApply {
  width: 100%;
  height: 100%;
  /* background-color: #f3f3f3; */
  background-color: #f5f5f5;
  background-size: 100% 100%;
  position: fixed;
  overflow: auto;
}

header {
  width: 100%;
  height: 88px;
  /* background-color: #eee; */
  background-color: #3e80cc;
  box-shadow: 0px 0px 30px #a1a1a1;
  position: fixed;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: #ffffff;
}

.headerHead {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
}

/* 	.headerCircle{
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background-color: #008B8B;
	} */
.headerRectangle {
  width: 100px;
  height: 8px;
  background-color: #f5f5f5;
  border-radius: 10px;
  margin: 0 20px 0 20px;
}

main {
  margin-top: 100px;
}
.page1Font1 {
  margin-bottom: 20px;
  font-size: 34px;
  font-weight: 600;
}
.page1Font2 {
  font-size: 28px;
  line-height: 50px;
  letter-spacing: 1px;
}
.page1Font3 {
  font-size: 28px;
}
.page2Div1 {
  padding: 0 20px 0 20px;
  text-align: left;
}
.page2Div2 {
  border-bottom: #aaa solid 1px;
  font-size: 30px;
}
.page3Class {
  /* width:80%;
		margin-left:4%;
		height:200px;
		font-size:16px;
		color:#333333;
		padding-left:20px;
		padding-right:20px;
		margin-top:10px;
		border-radius: 15px;
		border:#aaa solid 1px; */
  width: 90%;
  margin-left: 5%;
  height: 400px;
  font-size: 34px;
  color: #333333;
  /* padding:0 20px 0 20px; */
  margin-top: 10px;
  border-radius: 15px;
  border: #aaa solid 1px;
  margin-top: 140px;
}
.page3Class2 {
  overflow: auto;
  margin-left: 5%;
  width: 90%;
  height: 500px;
  font-size: 34px;
  color: #333333;
  /* padding-left:20px;
		padding-right:20px; */
  border-radius: 15px;
  border: #aaa solid 1px;
}
/* 新增的样式 */
.title2 {
  /* content: ' '; */
  border-left: 6px solid #1989fa;
  padding-left: 4px;
  /* width: 3px;
		height: 20px;
		background-color: #1989fa; */
}
</style>

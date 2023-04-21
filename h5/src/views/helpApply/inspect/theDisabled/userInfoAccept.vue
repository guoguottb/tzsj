<template>
  <div class="maxBox">
    <van-form ref='rule1'
              validate-first
              @failed="onFailed">
      <van-tabs v-model="active"
                sticky
                color="#fff"
                title-active-color="#fff"
                title-inactive-color="#323233"
                background="#3e80cc">
        <van-tab title="基本信息"
                 name="1">
          <!-- 姓名 -->
          <van-field v-model="userInfo.abd_ex2"
                     required
                     name="pattern"
                     maxlength="10"
                     label="姓名"
                     placeholder="姓名"
                     :rules="[{ required: true, message: '请填写姓名' },{pattern:/^(?:[\u4e00-\u9fa5·]{2,16})$/, message: '姓名应为2-16位的汉字！'}]">
            <template #button>
              <van-uploader :before-read="beforeRead"
                            :after-read="uploadImg('IDCard')">
                <van-button size="small"
                            type="info"
                            native-type="button">拍照识别
                </van-button>
              </van-uploader>
            </template>
          </van-field>
          <!-- 身份证 -->
          <van-field v-model="userInfo.abd_ex3"
                     required
                     name="pattern"
                     label="身份证号"
                     placeholder="身份证号"
                     :rules="[{ required: true, message: '请填写身份证号'},{ pattern: /^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))(\d|X|x)$/, message: '身份证格式错误！'}]" />
          <!-- 性别 -->
          <van-field name="radio"
                     label="性别"
                     required
                     :rules="[{ required: true, message: '请填写性别'}]">
            <template #input>
              <van-radio-group v-model="userInfo.abd_ex12"
                               direction="horizontal">
                <van-radio name="男">男</van-radio>
                <van-radio name="女">女</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <!-- 年龄 -->
          <van-field v-model="userInfo.abd_ex34"
                     type="number"
                     required
                     name="abd_ex34"
                     label="年龄"
                     placeholder="年龄"
                     :rules="[{ required: true, message: '请填写年龄'}]" />
          <!-- 户籍类别 -->
          <van-field required
                     readonly
                     clickable
                     name="ab_ex192"
                     :value="userInfo.abd_ex17"
                     label="户籍类别"
                     is-link
                     placeholder="点击选择户籍类别"
                     @click="showSelect('户籍类别')"
                     :rules="[{ required: true, message: '请选择户籍类别' }]" />
          <!-- 民族 -->
          <van-field required
                     readonly
                     clickable
                     name="abd_ex16"
                     :value="userInfo.abd_ex16"
                     label="民族"
                     is-link
                     placeholder="点击选择民族"
                     @click="showSelect('民族')"
                     :rules="[{ required: true, message: '请选择核对民族' }]" />
          <!-- 与户主关系 -->
          <van-field required
                     readonly
                     clickable
                     name="abd_ex16"
                     :value="userInfo.abd_ex66"
                     label="与户主关系"
                     is-link
                     placeholder="点击选择与户主关系"
                     @click="showSelect('与户主关系')"
                     :rules="[{ required: true, message: '请选择与户主关系' }]" />
          <!-- 残疾证号 -->
          <van-field v-model="userInfo.abd_ex5"
                     type="number"
                     required
                     label="残疾证号"
                     placeholder="残疾证号"
                     :rules="[{ required: true, message: '请填写残疾证号'},{pattern:/[a-zA-Z0-9_\u4e00-\u9fa5]+/, message: '残疾证号只能有数字'}]" />
          <!-- 残疾类别 -->
          <van-field required
                     readonly
                     clickable
                     name="abd_ex15"
                     :value="userInfo.abd_ex15"
                     label="残疾类别"
                     is-link
                     placeholder="点击选择残疾类别"
                     @click="showSelect('残疾类别')"
                     :rules="[{ required: true, message: '请选择残疾类别' }]" />
          <!-- 残疾等级 -->
          <van-field required
                     readonly
                     clickable
                     name="abd_ex14"
                     :value="userInfo.abd_ex14"
                     label="残疾等级"
                     is-link
                     placeholder="点击选择残疾等级"
                     @click="showSelect('残疾等级')"
                     :rules="[{ required: true, message: '请选择残疾等级' }]" />
          <!-- 户籍地址 -->
          <van-field v-model="userInfo.abd_ex18"
                     required
                     name="pattern"
                     label="户籍地址"
                     placeholder="户籍地址"
                     :rules="[{ required: true, message: '请输入户籍地址'},{pattern:/[a-zA-Z0-9_\u4e00-\u9fa5]+/, message: '户籍地址只能有大小写字母,汉字,数字'}]" />
          <!-- 现住址 -->
          <van-field v-model="userInfo.abd_ex19"
                     required
                     name="pattern"
                     label="现住址"
                     placeholder="现住址"
                     :rules="[{ required: true, message: '请输入现住址'},{pattern:/[a-zA-Z0-9_\u4e00-\u9fa5]+/, message: '现住址只能有大小写字母,汉字,数字'}]" />
          <!-- 家庭人口数 -->
          <van-field v-model="userInfo.abd_ex67"
                     type="number"
                     required
                     name="abd_ex67"
                     label="家庭人口数"
                     placeholder="家庭人口数"
                     :rules="[{ required: true, message: '请输入家庭人口数'},{pattern:/[a-zA-Z0-9_\u4e00-\u9fa5]+/, message: '家庭人口数只能有数字'}]" />
          <!-- 伤残原因说明 -->
          <van-field v-model="userInfo.abd_ex68"
                     required
                     name="abd_ex68"
                     label="伤残原因说明"
                     placeholder="伤残原因说明" />
          <!-- 伤残收入说明 -->
          <van-field v-model="userInfo.abd_ex69"
                     required
                     name="abd_ex69"
                     label="伤残收入说明"
                     placeholder="伤残收入说明" />
          <!-- 是否享受低保 -->
          <van-field required
                     readonly
                     clickable
                     name="abd_ex70"
                     :value="userInfo.abd_ex70"
                     label="是否享受低保"
                     is-link
                     placeholder="是否享受低保"
                     @click="showSelect('是否享受低保')"
                     :rules="[{ required: true, message: '是否享受低保' }]" />
          <!-- 家庭特征 -->
          <van-field required
                     readonly
                     clickable
                     name="abd_ex73"
                     :value="userInfo.abd_ex73"
                     label="家庭特征"
                     is-link
                     placeholder="家庭特征"
                     @click="showSelect('家庭特征')"
                     :rules="[{ required: true, message: '请填写家庭特征' }]" />
          <!-- 联系电话 -->
          <van-field v-model="userInfo.abd_ex20"
                     required
                     name="abd_ex20"
                     label="联系电话"
                     placeholder="联系电话"
                     :rules="[{ required: true, message: '请填写联系电话'}]" />
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
          <!-- 是否属于村干部或经办人员近亲属 -->
          <van-field required
                     readonly
                     clickable
                     name="abd_ex75"
                     :value="userInfo.abd_ex75"
                     label="是否属于村干部或经办人员近亲属"
                     is-link
                     placeholder="是否属于村干部或经办人员近亲属"
                     @click="showSelect('是否属于村干部或经办人员近亲属')"
                     :rules="[{ required: true, message: '请选择是否属于村干部或经办人员近亲属' }]" />
          <!-- 求助描述 -->
          <van-field v-model="userInfo.abd_ex76"
                     required
                     name="abd_ex76"
                     label="求助描述"
                     placeholder="求助描述"
                     :rules="[{ required: true, message: '请填写求助描述'}]" />
          <!-- 求助原因 -->
          <van-field name="checkboxGroup"
                     required
                     label="求助原因"
                     :rules="[{required:true,message:'请至少选择一项'}]">
            <template #input>
              <van-checkbox-group v-model="helpCause"
                                  direction="horizontal">
                <van-checkbox name="缺乏劳动力"
                              shape="square">缺乏劳动力</van-checkbox>
                <van-checkbox name="无生活来源"
                              shape="square">无生活来源</van-checkbox>
                <van-checkbox name="疾病"
                              shape="square">疾病</van-checkbox>
                <van-checkbox name="残疾"
                              shape="square">残疾</van-checkbox>
                <van-checkbox name="教育"
                              shape="square">教育</van-checkbox>
                <van-checkbox name="住房"
                              shape="square">住房</van-checkbox>
                <van-checkbox name="受灾"
                              shape="square">受灾</van-checkbox>
                <van-checkbox name="其他"
                              shape="square">其他</van-checkbox>
              </van-checkbox-group>
            </template>
          </van-field>
          <!-- <van-popup v-model="show"
                     round
                     position="bottom">
            <van-cascader v-model="cascaderValue"
                          title="请选择所在地区"
                          :options="options"
                          @close="show = false"
                          @change="onChange"
                          @finish="onFinish" />
          </van-popup> -->
          <!-- 底部选择框 -->
          <van-popup v-model="showPicker"
                     position="bottom">
            <van-picker show-toolbar
                        :columns='kosekiTyle'
                        @confirm="confirmType($event)"
                        @cancel="showPicker = false" />
          </van-popup>
        </van-tab>
        <!-- 其他信息 -->
        <van-tab title="其他信息"
                 name="2">
          <!-- 开户银行 -->
          <van-field v-model="userInfo.abd_ex23"
                     required
                     name="abd_ex23"
                     label="开户银行"
                     placeholder="开户银行"
                     :rules="[{ required: true, message: '请填写开户银行'}]" />
          <!-- 开户人 -->
          <van-field v-model="userInfo.abd_ex78"
                     required
                     name="abd_ex78"
                     label="开户人"
                     placeholder="开户人"
                     :rules="[{ required: true, message: '请填写开户人'}]" />
          <!-- 银行账号 -->
          <van-field v-model="userInfo.abd_ex24"
                     required
                     name="abd_ex24"
                     label="银行卡号"
                     placeholder="银行卡号"
                     :rules="[{ required: true, message: '请填写银行卡号'}]" />
          <!-- 银行总存款 -->
          <van-field v-model="userInfo.abd_ex79"
                     name="abd_ex79"
                     label="银行总存款"
                     placeholder="银行总存款" />
          <!-- 有价证券 -->
          <van-field v-model="userInfo.abd_ex80"
                     name="abd_ex80"
                     label="有价证券"
                     placeholder="有价证券" />
          <!-- 债权 -->
          <van-field v-model="userInfo.abd_ex81"
                     name="abd_ex81"
                     label="债权"
                     placeholder="债权" />
          <!-- 其他金融产品 -->
          <van-field v-model="userInfo.abd_ex82"
                     name="abd_ex82"
                     label="其他金融产品"
                     placeholder="其他金融产品金额" />
          <!-- 前六个月护理费用 -->
          <van-field v-model="userInfo.abd_ex104"
                     required
                     name="abd_ex104"
                     label="前六个月护理费用"
                     placeholder="前六个月护理费用"
                     :rules="[{ required: true, message: '请填写前六个月护理费用'}]" />
          <!-- 家庭人均月收入 -->
          <van-field v-model="userInfo.abd_ex89"
                     required
                     name="abd_ex89"
                     label="家庭人均月收入"
                     placeholder="家庭人均月收入"
                     :rules="[{ required: true, message: '请填写家庭人均月收入'}]" />
        </van-tab>
        <van-tab title="证明材料"
                 name="3">
          <!-- 身份证照片 -->
          <div class="page6Div5">
            <div class="page4Img2Font">身份证照片:</div>
            <div class="page4Img2Div">
              <div style="position:relative;width:91%;float: left;">
                <van-uploader v-model="fileList1"
                              :after-read="myAfterRead1"
                              :before-delete="myBeforeDelete1"
                              multiple />
              </div>
            </div>
          </div>
          <!-- 纸质授权书 -->
          <div class="page6Div5">
            <div class="page4Img2Font">纸质授权书:</div>
            <div class="page4Img2Div">
              <div style="position:relative;width:91%;float: left;">
                <van-uploader v-model="fileList2"
                              :after-read="myAfterRead2"
                              :before-delete="myBeforeDelete2"
                              multiple />
              </div>
            </div>
          </div>
          <!-- 其他证明材料 -->
          <div class="page6Div5">
            <div class="page4Img2Font">其他证明材料:</div>
            <div class="page4Img2Div">
              <div style="position:relative;width:91%;float: left;">
                <van-uploader v-model="fileList5"
                              :after-read="myAfterRead5"
                              :before-delete="myBeforeDelete5"
                              multiple />
              </div>
            </div>
          </div>
          <!-- 近亲属备案表 -->
          <div class="page6Div5">
            <div class="page4Img2Font">近亲属备案照片:</div>
            <div class="page4Img2Div">
              <div style="position:relative;width:91%;float: left;">
                <van-uploader v-model="fileList6"
                              :after-read="myAfterRead6"
                              :before-delete="myBeforeDelete6"
                              multiple />
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
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
let nationality = ["汉族", "满族", "蒙古族", "回族", "藏族", "维吾尔族", "苗族", "彝族", "壮族", "布依族", "侗族", "瑶族", "白族", "土家族", "哈尼族", "哈萨克族", "傣族", "黎族", "傈僳族", "佤族", "畲族", "高山族", "拉祜族", "水族", "东乡族", "纳西族", "景颇族", "柯尔克孜族", "土族", "达斡尔族", "仫佬族", "羌族", "布朗族", "撒拉族", "毛南族", "仡佬族", "锡伯族", "阿昌族", "普米族", "朝鲜族", "塔吉克族", "怒族", "乌孜别克族", "俄罗斯族", "鄂温克族", "德昂族", "保安族", "裕固族", "京族", "塔塔尔族", "独龙族", "鄂伦春族", "赫哲族", "门巴族", "珞巴族", "基诺族"]
import {
  getDisabledUserInfoApi,  // 获取残疾人上面核查信息
  fileUploadApi,  // 图片上传
  viewImgApi,  // 图片回显
  saveDisabledInfoApi,  // 残疾人上面核查 暂存/保存接口
} from "@/api"
import { compressImg } from '@/utils/utils.js'
import request from "@/utils/request"
export default {
  name: "userInfoAccept",
  data () {
    return {
      active: 1,
      // 用户信息 根据接口直接回显  响应的是什么结构 提交什么结构
      userInfo: {},
      // 身份证照片base64
      fileList1: [],
      // 身份证照片路径
      img1Arr: [],
      // 纸质授权书base64 
      fileList2: [],
      // 纸质授权书图片路径
      img2Arr: [],
      // 其他证明材料图片base64
      fileList5: [],
      // 其他证明材料图片路径
      img5Arr: [],
      // 近亲属备案表base64
      fileList6: [],
      // 近亲属备案图片路径
      img6Arr: [],
      areaName: "",
      helpCause: [],
      // ========
      showPicker: false,  // 户籍类别底部弹框
      kosekiTyle: [],     // 户籍选项
      kosekiTyleName: '',
      areaShow: false,
      fieldValue: '',
      cascaderValue: '',
      options: [],
      saveFlage: false,  // 提交按钮节流
    }
  },
  created () {
    // 根据id数据回显
    this.getDisabledUserInfo({
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
      // console.log(this.options, '区划');
    }).catch(res => {
      console.log(res, 'xzqh');
      this.$toast.fail('数据请求失败1')
    })
  },
  methods: {
    // 根据id数据回显
    async getDisabledUserInfo (id) {
      try {
        const res = await getDisabledUserInfoApi(id)
        // 求助原因后端返回的是以逗号隔开的字符串，将其转化为数组
        this.userInfo = res.data
        this.formatData()
        this.helpCause = this.userInfo.abd_ex77.split(",")
        // 身份证拍照图片回显
        if (this.userInfo.abd_ex37) {
          this.userInfo.abd_ex37.split(",").forEach(async item => {
            try {
              const res = await viewImgApi(item)
              this.fileList1.push({ url: res, isImage: true })
              this.img1Arr.push(item)
            } catch (error) {
              console.log(error, "this.userInfo.abd_ex37.split.forEach Error")
            }
          })
        }
        // 纸质授权书图片回显
        if (this.userInfo.abd_ex92) {
          this.userInfo.abd_ex92.split(",").forEach(async item => {
            try {
              const res = await viewImgApi(item)
              this.fileList2.push({ url: res, isImage: true })
              this.img2Arr.push(item)
            } catch (error) {
              console.log(error, "this.userInfo.abd_ex92.split.forEach Error")
            }
          })
        }
        // 其他证明材料图片回显
        if (this.userInfo.abd_ex38) {
          this.userInfo.abd_ex38.split(",").forEach(async item => {
            try {
              const res = await viewImgApi(item)
              this.fileList5.push({ url: res, isImage: true })
              this.img5Arr.push(item)
            } catch (error) {
              console.log(error, "this.userInfo.abd_ex38.split.forEach Error")
            }
          })
        }
        // 近亲属备案表图片回显
        if (this.userInfo.abd_ex95) {
          this.userInfo.abd_ex95.split(",").forEach(async item => {
            try {
              const res = await viewImgApi(item)
              this.fileList6.push({ url: res, isImage: true })
              this.img6Arr.push(item)
            } catch (error) {
              console.log(error, "this.userInfo.abd_ex95.split.forEach Error")
            }
          })
        }
      } catch (error) {
        console.log("根据id获取残疾人信息失败")
      }
    },
    async submit (val) {
      // 节流-----
      if (this.saveFlage) return this.$toast("请勿重复保存")
      this.saveFlage = true
      setTimeout(() => {
        this.saveFlage = false
      }, 3000);
      // 如果是提交按钮 去校验表单
      // if (val === '提交') {
      //   try {
      //     const rulesRes = await this.$refs.rule1.validate()
      //     console.log(rulesRes)
      //   } catch (error) {
      //     if (error.length) {
      //       this.$toast(error[0].message)
      //       throw new Error(error[0].message)
      //     }
      //   }
      // }
      // -----
      // 将数组图片路径转化为逗号隔开的字符串
      // 救助原因
      this.userInfo.abd_ex77 = this.helpCause.join()
      // 身份证照片路径转化
      this.userInfo.abd_ex37 = this.img1Arr.join()
      // 	核对授权书路径转化
      this.userInfo.abd_ex92 = this.img2Arr.join()
      // 	其他证明材料图片路径转化
      this.userInfo.abd_ex38 = this.img5Arr.join()
      // 	近亲属备案图片路径转化
      this.userInfo.abd_ex95 = this.img6Arr.join()
      if (val === "暂存") {
        this.userInfo.abd_ex99 = false
        this.onRegister(this.userInfo)
      }
      if (val === "提交") {
        this.userInfo.abd_ex99 = true
        this.onSave(this.userInfo)
      }
    },
    // 暂存按钮
    async onRegister (data) {
      try {
        const res = await saveDisabledInfoApi(data)
        if (res.msg === "+OK") {
          console.log(res, "暂存按钮 res")
          // 成功提示
          this.$toast("暂存成功")
          // 重新获取数据
          this.getDisabledUserInfo({
            id: this.$route.query
              .sId
          })
        } else {
          this.$toast(res.msg)
        }
      } catch (error) {
        this.$toast("暂存失败，请稍后重试")
        console.log(error, "暂存按钮 Error")
      }
    },
    // 保存按钮
    async onSave (data) {
      try {
        const res = await saveDisabledInfoApi(data)
        if (res.status === "+OK") {
          console.log(res, "保存 res")
          // 成功提示
          this.$toast("保存成功")
          // 重新获取数据
          this.getDisabledUserInfo({
            id: this.$route.query
              .sId
          })
        } else {
          this.$toast(res.msg)
        }
      } catch (error) {
        this.$toast("保存失败，请稍后重试")
        // this.$toast(error.msg)
        console.log(error, "保存按钮 Error")
      }
    },
    formatData () {
      // 1
      this.fileList1 = []
      this.img1Arr = []
      // 2
      this.fileList2 = []
      this.img2Arr = []
      // 5
      this.fileList5 = []
      this.img5Arr = []
      // 6
      this.fileList6 = []
      this.img6Arr = []
    },
    onFailed (errorInfo) {
      console.log('failed', errorInfo);
    },
    // 户籍弹框确认点击事项
    confirmType (value) {
      // console.log(value);
      if (this.kosekiTyleName === '核对类别') this.userInfo.ab_ex192 = value;
      if (this.kosekiTyleName === '民族') this.userInfo.abd_ex16 = value;
      if (this.kosekiTyleName === '与户主关系') this.userInfo.abd_ex66 = value;
      if (this.kosekiTyleName === '残疾类别') this.userInfo.abd_ex15 = value;
      if (this.kosekiTyleName === '残疾等级') this.userInfo.abd_ex14 = value;
      if (this.kosekiTyleName === '是否享受低保') this.userInfo.abd_ex70 = value;
      if (this.kosekiTyleName === '家庭特征') this.userInfo.abd_ex73 = value;
      if (this.kosekiTyleName === '是否属于村干部或经办人员近亲属') this.userInfo.abd_ex75 = value;
      if (this.kosekiTyleName === '户籍类别') this.userInfo.abd_ex17 = value;
      this.showPicker = false;
    },
    showSelect (type) {
      // 核对类别选择框
      if (type === "核对类别") this.kosekiTyle = ["农业户口", "非农业户口"]
      if (type === "民族") this.kosekiTyle = nationality
      if (type === "与户主关系") this.kosekiTyle = ["户主本人", "户主配偶"]
      if (type === "残疾类别") this.kosekiTyle = ["肢体残疾", "精神残疾", "智力残疾", "盲视力残疾", "言语残疾", "听力残疾"]
      if (type === "残疾等级") this.kosekiTyle = ["一级残疾", "二级残疾", "三级残疾", "四级残疾"]
      if (type === "是否享受低保") this.kosekiTyle = ["是", "否"]
      if (type === "家庭特征") this.kosekiTyle = ["一名残疾人", "两名以上残疾人", "由达到法定退休年龄父母供养", "由达到法定退休年龄的其他供养人员供养", "其他特征"]
      if (type === "是否属于村干部或经办人员近亲属") this.kosekiTyle = ["是", "否"]
      if (type === "户籍类别") this.kosekiTyle = ["农业户口", "非农业户口"]
      this.kosekiTyleName = type
      this.showPicker = true
    },
    onFinish ({
      selectedOptions
    }) {
      this.areaShow = false;
      let area = selectedOptions.map((option) => option.text)
      let area2 = selectedOptions.map((option) => option.text + option.value)
      // return console.log(area,area2)
      this.userInfo.abd_ex28 = area2.join(',')
      this.areaName = area.join('/');
      // this.form.arv_ex14 = area2.join(','); //xzqh
    },
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
                console.log(data);
                if (num == 'IDCard') {
                  this.form.ab_ex3 = data["姓名"].words;
                  data["公民身份号码"].words = data["公民身份号码"].words.replace(/\s+/g, "");
                  this.form.ab_ex7 = data["公民身份号码"].words;
                  this.form.ab_ex4 = data["住址"].words;
                } else if (num == 'IDCard2') {
                  data["公民身份号码"].words = data["公民身份号码"].words.replace(/\s+/g, "");
                  this.$set(this.family[index], 'abm_ex3', data["姓名"].words);
                  this.$set(this.family[index], 'abm_ex2', data["公民身份号码"].words);
                  // 自动计算性别与年龄
                  this.changeSfz2(this.family[index]);
                } else if (num == 'IDCard3') {
                  this.family2[index].abm_ex3 = data["姓名"].words;
                  data["公民身份号码"].words = data["公民身份号码"].words.replace(/\s+/g, "");
                  this.family2[index].abm_ex2 = data["公民身份号码"].words;
                  // 自动计算性别与年龄
                  this.changeSfz2(this.family2[index]);
                } else if (num == 'IDCard4') {
                  this.family4[index].abm_ex3 = data["姓名"].words;
                  data["公民身份号码"].words = data["公民身份号码"].words.replace(/\s+/g, "");
                  this.family4[index].abm_ex2 = data["公民身份号码"].words;
                }
              } catch (e) {
                // console.log(e);
                this.fileList2.pop()
                this.$toast.fail('身份证对比信息不符,请上传正确的身份证1')
              }
            } else {
              this.fileList2.pop()
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
    async myAfterRead5 (file) {
      let formData = new FormData();
      formData.append('file', file.file)
      try {
        const res = await fileUploadApi(formData)
        this.img5Arr.push("/social/weixinMinios/show?filename=" + res[0].filename)
      } catch (error) {
        this.fileList5.pop()
        this.$toast("图片上传失败")
        throw new Error("图片上传失败")
      }
    },
    myBeforeDelete5 (file, detail) {
      this.fileList5 = this.fileList5.filter((item, index) => index !== detail.index);
      this.img5Arr = this.img5Arr.filter((item, index) => index !== detail.index);
    },
    async myAfterRead6 (file) {
      let formData = new FormData();
      formData.append('file', file.file)
      try {
        const res = await fileUploadApi(formData)
        this.img6Arr.push("/social/weixinMinios/show?filename=" + res[0].filename)
      } catch (error) {
        this.fileList6.pop()
        this.$toast("图片上传失败")
        throw new Error("图片上传失败")
      }
    },
    myBeforeDelete6 (file, detail) {
      this.fileList6 = this.fileList6.filter((item, index) => index !== detail.index);
      this.img6Arr = this.img6Arr.filter((item, index) => index !== detail.index);
    },
  }
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
</style>

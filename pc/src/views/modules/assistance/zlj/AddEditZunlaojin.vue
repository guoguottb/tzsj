<!--城乡低保修改页面不用了，新版之后就没改过了--> 
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
                          placeholder="请输入申请人姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="身份证号码"
                            prop="ab_ex7">
                <el-input v-model="dibaoForm.ab_ex7"
                          placeholder="请输入身份证号码"></el-input>
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
                          placeholder="请输入户籍地址"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="家庭住址"
                            prop="ab_ex11">
                <el-input v-model="dibaoForm.ab_ex11"
                          placeholder="请输入家庭住址"></el-input>
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
                          @change="changeAmt"></el-input>
              </el-form-item>
            </el-col>

          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="联系电话"
                            prop="ab_ex28">
                <el-input v-model="dibaoForm.ab_ex28"
                          placeholder="请输入联系电话（手机）"></el-input>
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

          <h3 class="line_blue"
              id="page2">&emsp;其他信息</h3>
          <div class="lineSt"></div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="一卡通开户银行"
                            prop="ab_ex42">
                <el-input v-model="dibaoForm.ab_ex42"
                          placeholder="请输入开户银行"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="开户人"
                            prop="ab_ex8">
                <el-input v-model="dibaoForm.ab_ex8"
                          placeholder="请输入开户人"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="一卡通银行账号"
                            prop="ab_ex43">
                <el-input v-model="dibaoForm.ab_ex43"
                          placeholder="请输入银行账号"></el-input>
              </el-form-item>
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
                    <span>身份证拍照（正反面）(<span style='color:red'>{{imgNum.ab_ex10_img}}</span>)</span>
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
                    <span>纸质授权书(<span style='color:red'>{{imgNum.ab_ex177_img}}</span>)</span>
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
                    <span>其他证明材料(<span style='color:red'>{{imgNum.ab_ex16_img}}</span>)</span>
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
                    <span>审核审批表(<span style='color:red'>{{imgNum.ab_ex74_img}}</span>)</span>
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
                    <span>电子授权书(<span style='color:red'>{{imgNum.ab_ex73_img}}</span>)</span>
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
      <!-- 右边导航菜单 -->
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
                 @click="counter('#page1')">基本信息</a><br>
            </li>
            <li :class="{listStyle:isShow2}"
                @click="isShow(2)">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow2}"
                 @click="counter('#page2')">其他信息</a><br>
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
  name: "addEditDibao",
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
          return time.getTime() < Date.now();
          // return time.getTime() < Date.now() + 8.64e7*9;
        }
      },
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
      dibaoForm: {},
      pay: {
        abp_ex4: '',
        abp_ex5: '',
        abp_ex6: '',
        abp_ex7: '',
        abp_ex8: '',
        abp_ex9: '',
        abp_ex10: '',
      },

      // 材料上传图片存储数组
      uploadImg: {
        ab_ex73_img: [],
        ab_ex10_img: [],
        ab_ex16_img: [],
        ab_ex74_img: [],
        ab_ex177_img: [],//纸质授权书
      },
      imgNum: {},//图片数量
      uploadId: '',
      imgIndex: {
        // ab_ex166:0,
        // ab_ex167:0,
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

      common: [],
      ab_ex46: [], //求助原因
      work: "",  //劳动年龄
      ab_ex94_: '',
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
    }
  },
  mounted () {
    // 滚动鼠标右侧导航栏跟随滚动位置改变而改变显示
    // window.removeEventListener('scroll',this.scroll,false)
    window.addEventListener('scroll', this.scroll, true)
  },
  watch: {
    xzqhArray (newA, oldA) {
      console.log(newA, 'newA');
      if (newA.length > 0) {

        let qu = newA[0].split("#")[0]
        let cun = newA[1].split("#")[0]
        let zhen = newA[2].split("#")[0]
        // let i =qu+"#"+cun+"#"+zhen
        this.dibaoForm.ab_ex162 = newA[0] + "," + newA[1] + "," + newA[2]
        this.dibaoForm.ab_ex161 = qu
        this.dibaoForm.ab_ex1 = zhen
        this.dibaoForm.ab_ex2 = cun
      }
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
          // this.$message.error('数据获取失败或请求超时11111')
          // this.$emit("closes", false)
          // this.$router.go(-1)

          return false
        }
        console.log(this.$route.query.eventType, '11');


        /*
         * 功能：判断是否为新增数据
         * 新增：清除部分必填验证，给三个必须字段赋值
         * 完善信息：数据回显，必填验证完善
        */
        if (this.$route.query.eventType == 'addNewData') {
          this.dibaoForm.ab_ex13 = '尊老金';  // 这个必需要
          this.dibaoForm.ab_ex15 = '申请';	// 这个必需要
          this.dibaoForm.ab_ex17 = '泰州市姜堰区社会救助综合平台'; // 这个必需要

          this.rules.ab_ex4 = [];
          this.rules.ab_ex5 = [];
          this.rules.ab_ex6 = [];
          this.rules.ab_ex8 = [];
          this.rules.ab_ex10 = [];
          this.rules.ab_ex11 = [];
          this.rules.ab_ex42 = [];
          this.rules.ab_ex43 = [];
          this.rules.ab_ex46 = [];
          // this.rules.ab_ex92 = [];

          console.log('新增数据');
        } else {

          this.dibaoForm = res.response.data[0].data[0]
          this.common = res.response.data[0].common;
          this.uploadImg.ab_ex10_img = res.response.data[0].data[0].ab_ex10.split(",");
          this.uploadImg.ab_ex16_img = res.response.data[0].data[0].ab_ex16.split(",");
          this.uploadImg.ab_ex73_img = res.response.data[0].data[0].ab_ex73.split(",");
          this.uploadImg.ab_ex74_img = res.response.data[0].data[0].ab_ex74.split(",");
          this.uploadImg.ab_ex177_img = res.response.data[0].data[0].ab_ex177.split(",");

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
            }
            // else if(i=='ab_ex97_img'){
            // 	this.dibaoForm.ab_ex97=r.join(",")
            // 	this.uploadImg.ab_ex97_img = r;
            // }else if(i=='ab_ex98_img'){
            // 	this.dibaoForm.ab_ex98=r.join(",")
            // 	this.uploadImg.ab_ex98_img = r;
            // }
            // else if(i=='ab_ex166_img'){
            // 	this.dibaoForm.ab_ex166=r.join(",")
            // 	this.uploadImg.ab_ex166_img = r;
            // }else if(i=='ab_ex167_img'){
            // 	this.dibaoForm.ab_ex167=r.join(",")
            // 	this.uploadImg.ab_ex167_img = r;
            // }
            else if (i == 'ab_ex177_img') {
              this.dibaoForm.ab_ex177 = r.join(",")
              this.uploadImg.ab_ex177_img = r;
            }
          }



          // console.log(res.response.data[0].data[0].ab_ex46,"this.ab_ex46--------求助原因")
          if (res.response.data[0].data[0].ab_ex46 != "") {
            this.ab_ex46 = res.response.data[0].data[0].ab_ex46.split(",");
          } else {
            this.ab_ex46 = [];//消除数组ab_ex46求助原因中的空元素
          }


          let xzqhArray = this.dibaoForm.ab_ex162 == '' ? '' : this.dibaoForm.ab_ex162.split(",");

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
        }

        // 获取图片数量
        this.getImgNum()

        this.isFinish = true;
        console.log(this.xzqhArray)


      })
    },

    // 给tabledata添加序号便于操作
    rowClassName ({ row, rowIndex }) {
      row.xh = rowIndex + 1;
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
        this.dibaoForm[str] = this.uploadImg[str + "_img"].join(",");
        this.getImgNum()

      }).catch(action => {
        // 取消留在本页
        console.log("留在本页");
      });


    },
    handlePictureCardPreview (file) {
      this.dialogImageArray = file
      this.dialogImageUrl = file[0];
      this.dialogVisible = true;
    },

    changeAmt2 () {
      for (var i in this.warningData) {
        var index = Number(i) + 1;
        // console.log(this.warningData[i].aw_dat1,'预警时间')
        if (this.warningData[i].aw_ex1 != "" && (this.warningData[i].aw_dat1 == "" || this.warningData[i].aw_dat1 == null)) {
          this.warningData[i].aw_dat1 = this.getTimeFn();
        }
        // 预警提示
        if (this.warningData[i].aw_ex1 == "" && (this.warningData[i].aw_dat1 == null || this.warningData[i].aw_dat1 == "")) {
          continue;
        } else if (this.warningData[i].aw_ex1 != "" && (this.warningData[i].aw_dat1 == null || this.warningData[i].aw_dat1 == "")) {
          this.$message.warning("请选择预警" + index + "的时间");
          return false;
        } else if (this.warningData[i].aw_ex1 == "" && (this.warningData[i].aw_dat1 != null || this.warningData[i].aw_dat1 != "")) {
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
      let d = dates.getDate() + 10
      //  console.log(time)
      if (m == 2 && d > 28) {
        m = dates.getMonth() + 2
        d = dates.getDate() + 10 - 28
      } else if ((m == 4 || m == 6 || m == 9 || m == 11) && d > 30) {
        m = dates.getMonth() + 2
        d = dates.getDate() + 10 - 30
      } else {
        m = dates.getMonth() + 2
        d = dates.getDate() + 10 - 31
      }
      let time = y + '-' + m + '-' + d
      return time
    },


    changeAmt (total) {

      // 基本信息-家庭人口-输入判断
      if (Number.isNaN(ab_ex5) || ab_ex5 == 0) {
        this.$message.warning("请输入家庭口数，或修改为阿拉伯数字");
        return false;
      }
      // var ab_ex41 = this.dibaoForm.ab_ex41;//低保类型字段
      this.dibaoForm.ab_ex46 = this.ab_ex46.toString();//求助原因字段

      var ab_ex5 = Number(this.dibaoForm.ab_ex5);

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

    // 返回按钮
    closeView () {
      this.$emit("closes", false)
      this.$router.go(-1)
      if (process.env.NODE_ENV != "development") {
        this.$router.go(-1);
      }
    },

    // 上传图片
    uploads (id) {
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

    // 删除图片
    // deleteImg(id){
    // 	this.dialogVisible4 = true;
    // 	this.uploadId = id;
    // 	console.log(this.uploadId);

    // },


    save () {

      // 信息提示的判断条件
      let doms = document.getElementsByClassName('el-message')[0]
      console.log(document.getElementsByClassName('el-message')[0]);

      this.$refs['dibaoForm'].validate((valid) => {
        if (valid) {
          //alert('submit!');
        } else {
          //console.log('error submit!!');
          return false;
        }
      });

      let msgs = this.validate();

      /* this.$route.query.eventType!='addNewData' 不是新增
       * 进行必填验证  完善状态 ab_ex182 == 是
       * 是新增 不验证必填 ab_ex182 == 否
       *
      */
      if (this.$route.query.eventType != 'addNewData') {

        //基本信息-家庭人口-输入类型判断
        if (Number.isNaN(Number(this.dibaoForm.ab_ex5)) || this.dibaoForm.ab_ex5 == 0) {
          console.log(Number.isNaN(this.dibaoForm.ab_ex5), "条件1")
          console.log(this.dibaoForm.ab_ex5, "条件2")
          this.$message.warning("请输入家庭人口，或修改人口格式");
          return false;
        }

        if (msgs) {
          this.$message.warning(msgs);
          return false
        }

        if (this.dibaoForm.ab_ex7) {
          let msg = this.isCardID(this.dibaoForm.ab_ex7);
          if (msg) {
            this.$message.warning("申请人" + msg);
            return false
          }
        }

        this.dibaoForm.ab_ex182 = '是';
        let isSave = true;

        if (!isSave) {
          return false;
        }

      } else {

        this.dibaoForm.ab_ex182 = '否';
      }




      // 是否核对--B-已完成线下核查
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
        // this.$router.go(-1)
        this.closeView();
      }, 30000)
      // console.log(this.pay,"save  pay")

      this.saveBasic({
        "data": '[' + JSON.stringify(this.dibaoForm) + ']',
      }).then((res) => {
        if (res[0].status == "+Ok") {
          loading.close()
          this.$message.success(res[0].msg)
          // this.$emit("closes", false)
          // this.$router.go(-1)
          this.closeView();
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
          // this.$emit("closes", false)
          // this.$router.go(-1)
          this.closeView();
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

    saveBasic (data) {
      return request({
        // headers: {
        // 	accept: 'application/json',
        // }
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
          } catch (e) { }
        }
        return msg;
      } catch (e) { return ""; }
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

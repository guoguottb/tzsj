<template>
  <div class="g-box">
    <div class="g-box2">
      <div class="info2">
        <el-form ref="dibaoForm" :inline-message="true" :model="dibaoForm" :rules="rules" :show-message="false"
                 label-width="auto" style='padding-right: 10px;'>
          <h3 id="page1" class="line_blue">&emsp;基本信息</h3>
          <div class="lineSt"></div>
          <el-row :gutter="20">

            <el-col :span="8">
              <el-form-item label="姓名" prop="abcd_ex4">
                <el-input v-model="dibaoForm.abcd_ex4" placeholder="请输入姓名"></el-input>
              </el-form-item>

              <el-form-item label="证件号码 " prop="abcd_ex6">
                <el-input v-model="dibaoForm.abcd_ex6" placeholder="请输入证件号码 "></el-input>
              </el-form-item>

              <el-form-item label="性别" prop="abcd_ex8">
                <el-select v-model="dibaoForm.abcd_ex8" style="width:100%">
                  <el-option label="男" value="男"></el-option>
                  <el-option label="女" value="女"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="特长" prop="abcd_ex10">
                <el-input v-model="dibaoForm.abcd_ex10" placeholder="请输入特长"></el-input>
              </el-form-item>

              <el-form-item label="文化程度" prop="abcd_ex12">
                <el-select v-model="dibaoForm.abcd_ex12" style="width:100%">
                  <el-option v-for="(item,index) in whcd" :key="index" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="证件类型" prop="abcd_ex5">
                <el-select v-model="dibaoForm.abcd_ex5" style="width:100%">
                  <el-option label="内地居民身份证" value="内地居民身份证"></el-option>
                  <el-option label="香港居民身份证" value="香港居民身份证"></el-option>
                  <el-option label="澳门居民身份证" value="澳门居民身份证"></el-option>
                  <el-option label="台湾居民身份证" value="台湾居民身份证"></el-option>
                  <el-option label="护照" value="护照"></el-option>
                  <el-option label="军官证" value="军官证"></el-option>
                  <el-option label="士兵证" value="士兵证"></el-option>
                  <el-option label="其他有效国籍旅行证件" value="其他有效国籍旅行证件"></el-option>
                  <el-option label="香港居民来往内地通行证" value="香港居民来往内地通行证"></el-option>
                  <el-option label="澳门居民来往内地通行证" value="澳门居民来往内地通行证"></el-option>
                  <el-option label="台湾居民来往内地通行证" value="台湾居民来往内地通行证"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="民族" prop="abcd_ex7">
                <el-select v-model='dibaoForm.abcd_ex7' style="width:100%">
                  <el-option v-for="(item,index) in nation" :key="index" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="出生日期" prop="abcd_ex9">
                <el-date-picker v-model="dibaoForm.abcd_ex9" placeholder="选择出生日期" style="width:100%" type="date"
                                value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>

              <el-form-item label="政治面貌" prop="abcd_ex11">
                <el-select v-model="dibaoForm.abcd_ex11" style="width:100%">
                  <el-option v-for="(item,index) in zzmm" :key="index" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="专业" prop="abcd_ex13">
                <el-input v-model="dibaoForm.abcd_ex13" placeholder="请输入专业"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <div class="head_box">
                <div class="head_photo">
                  <div v-if="!this.imgUrl" class="head_img2">
                    <p style="margin-top:60px;text-align:center;color:#666">暂无头像</p>
                  </div>
                  <el-image v-if="this.url" :preview-src-list="[imgUrl]" :src="imgUrl" class="head_img"></el-image>
                </div>
                <el-button class="head_btn" size="small" type="success" @click="uploads('abcd_ex27','头像')">上传照片
                </el-button>
              </div>

            </el-col>
          </el-row>

          <!-- <el-row :gutter="20">
            <el-col :span="8">

            </el-col>
            <el-col :span="8">

            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">

            </el-col>
            <el-col :span="8">

            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">

            </el-col>
            <el-col :span="8">

            </el-col>
          </el-row> -->

          <el-row :gutter="20">
            <el-col :span="8">

            </el-col>
            <el-col :span="8">

            </el-col>

          </el-row>
          <!-- <el-row :gutter="20">

          </el-row> -->
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="工作单位" prop="abcd_ex13">
                <el-input v-model="dibaoForm.abcd_ex13" placeholder="请输入工作单位"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="职务" prop="abcd_ex13">
                <el-input v-model="dibaoForm.abcd_ex13" placeholder="请输入职务"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="健康状况" prop="abcd_ex14">
                <el-select v-model="dibaoForm.abcd_ex14" style="width:100%">
                  <el-option v-for="(item,index) in jkzk" :key="index" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="婚姻状况" prop="abcd_ex15">
                <el-select v-model="dibaoForm.abcd_ex15" style="width:100%">
                  <el-option v-for="(item,index) in hyzk" :key="index" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="邮箱" prop="abcd_ex16">
                <el-input v-model="dibaoForm.abcd_ex16" placeholder="请输入邮箱"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="取得证书" prop="abcd_ex17">
                <el-input v-model="dibaoForm.abcd_ex17" placeholder="请输入取得证书"></el-input>
              </el-form-item>
            </el-col>

          </el-row>
          <!-- <el-row :gutter="20">


          </el-row> -->
          <el-row :gutter="20">

          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="手机号码" prop="abcd_ex18">
                <el-input v-model="dibaoForm.abcd_ex18" placeholder="请输入手机号码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="座机号" prop="abcd_ex19">
                <el-input v-model="dibaoForm.abcd_ex19" placeholder="请输入座机号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否专兼职" prop="abcd_ex20">
                <el-select v-model="dibaoForm.abcd_ex20" style="width:100%">
                  <el-option label="专职" value="专职"></el-option>
                  <el-option label="兼职" value="兼职"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="是否政府购买服务" prop="abcd_ex21">
                <el-select v-model="dibaoForm.abcd_ex21" style="width:100%">
                  <el-option label="是" value="是"></el-option>
                  <el-option label="否" value="否"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="津贴" prop="abcd_ex22">
                <el-input v-model="dibaoForm.abcd_ex22" placeholder="请输入津贴"></el-input>

              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开始从事儿童工作" prop="abcd_dat3">
                <el-date-picker v-model="dibaoForm.abcd_dat3" placeholder="选择出生日期" style="width:100%" type="date"
                                value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
            </el-col>

          </el-row>

          <el-row :gutter="20">
            <el-col v-if="dibaoForm.abcd_ex28=='儿童主任'" :span="8">
              <el-form-item label="其他职务" prop="abcd_ex13">
                <el-input v-model="dibaoForm.abcd_ex13" placeholder="请输入其他职务"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="行政区划" prop="abcd_ex34">
                <el-cascader v-if="isFinish" v-model="xzqhArray" :props="props" placeholder="请选择"
                             style="width:100%;"></el-cascader>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="从业状况" prop="abcd_ex13">
                <el-input v-model="dibaoForm.abcd_ex13" :autosize="{ minRows: 3}" placeholder="请输入职责补充"
                          type="textarea"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="职责补充" prop="abcd_ex24">
                <el-input v-model="dibaoForm.abcd_ex24" :autosize="{ minRows: 3}" placeholder="请输入职责补充"
                          type="textarea"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="工作及培训经历" prop="abcd_ex26">
                <el-input v-model="dibaoForm.abcd_ex26" :autosize="{ minRows: 3}" class="textarea" placeholder="请输入工作及培训经历"
                          type="textarea"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <h3 id="page2" class="line_blue">&emsp;上传图片</h3>
          <div class="lineSt"></div>
          <div id="recordt">
            <el-row :gutter="20">
              <el-col :span="12" class="my-col">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>儿童主任身份证明材料</span>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="uploads('abcd_ex27')">上传
                    </el-button>
                  </div>
                  <div class="block">
                    <image-view :imgList="uploadImg.abcd_ex27_img"></image-view>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="12" class="my-col">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>儿童主任头像</span>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="uploads('abcd_ex27')">上传
                    </el-button>
                  </div>
                  <div class="block">
                    <image-view :imgList="uploadImg.abcd_ex27_img"></image-view>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>

          <el-dialog :visible.sync="dialogVisible" append-to-body>
            <el-image :preview-src-list="dialogImageArray" :src="dialogImageUrl"></el-image>
          </el-dialog>

          <el-dialog :visible.sync="dialogVisible3" append-to-body title="上传" width="500px">
            <upload ref="myUpload" @upload="uploadEvent"></upload>
            <span slot="footer" class="dialog-footer">
							<el-button @click="dialogVisible3 = false">取 消</el-button>
							<el-button type="primary" @click="dialogVisible3 = false">确 定</el-button>
						</span>
          </el-dialog>
        </el-form>
      </div>
      <div class="ainfo2">
        <div style="margin-left:20px;text-align:center;border-bottom:1px solid #ddd;padding-bottom:10px;">
          <el-button size="small" type="primary" @click="save">保存</el-button>
          <el-button size="small" @click="closeView">返回</el-button>
        </div>

        <div style="margin-left:20px;margin-top:20px;">
          <ul>
            <li :class="{listStyle:isShow1}" @click="isShow(1)">
              <a :class="{listStyleA:!isShow1}" class="ainfoFont" @click="counter('#page1')">基本信息</a><br>
            </li>
            <li :class="{listStyle:isShow2}" @click="isShow(2)">
              <a :class="{listStyleA:!isShow2}" class="ainfoFont" @click="counter('#page2')">上传图片</a><br>
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
  name: "addEditDibao",
  components: {
    upload,
    imageView
  },
  data() {
    return {
      test: {
        xzqhArray: []
      },
      xzqhArray: [],
      isFinish: false,
      // el-cascader懒加载
      props: {
        lazy: true,
        lazyLoad(node, resolve) {
          const {level} = node; // 获取当前node对象中的level属性
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
            // const nodes = res;
            // nodes.forEach(item => {
            // 	item.value = item.cs_ex2+"#"+item.cs_ex1;
            // 	item.label = item.cs_ex2;
            // 	item.leaf = level >= 2; //判断是否为末尾节点，这个地方是0,1,2三级
            // })
            // resolve(nodes);
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

      uploadImg: {
        abcd_ex27_img: [],
      },
      uploadId: '',
      rules: {
        abcd_ex4: [{
          required: true,
          message: '儿童主任姓名不能为空',
          trigger: 'blur'
        }],
        abcd_ex5: [{
          required: true,
          message: '证件类型不能为空',
          trigger: 'blur'
        }],
        abcd_ex6: [{
          required: true,
          message: '证件号码不能为空',
          trigger: 'blur'
        }],
        abcd_ex7: [{
          required: true,
          message: '民族不能为空',
          trigger: 'blur'
        }],
        abcd_ex8: [{
          required: true,
          message: '性别不能为空',
          trigger: 'blur'
        }],
        abcd_ex9: [{
          required: true,
          message: '出生日期不能为空',
          trigger: 'blur'
        }],
        abcd_ex11: [{
          required: true,
          message: '政治面貌不能为空',
          trigger: 'blur'
        }],
        abcd_ex12: [{
          required: true,
          message: '文化程度不能为空',
          trigger: 'blur'
        }],
        abcd_ex15: [{
          required: true,
          message: '婚姻状况不能为空',
          trigger: 'blur'
        }],
        abcd_ex13: [{
          required: true,
          message: '职务不能为空',
          trigger: 'blur'
        }],
        abcd_ex13: [{
          required: true,
          message: '工作单位不能为空',
          trigger: 'blur'
        }],
        abcd_ex13: [{
          required: true,
          message: '其他职务不能为空',
          trigger: 'blur'
        }],
        abcd_ex18: [{
          required: true,
          message: '手机号不能为空',
          trigger: 'blur'
        }],
        abcd_ex20: [{
          required: true,
          message: '是否专兼职不能为空',
          trigger: 'blur'
        }],
      },
      familyData1: [],
      checkedFamilyData1: [],
      nation: ['汉族', '壮族', '满族', '回族', '苗族', '维吾尔族', '彝族', '土家族', '蒙古族', '藏族', '布依族', '侗族', '瑶族', '朝鲜族', '白族',
        '哈尼族', '哈萨克族', '黎族', '傣族', '畲族', '傈僳族', '仡佬族',
        '拉祜族', '高山族', '东乡族', '佤族', '水族', '纳西族', '羌族', '土族', '锡伯族', '仫佬族', '柯尔克孜族', '达斡尔族', '景颇族', '撒拉族',
        '布朗族', '毛难族', '塔吉克族', '普米族', '阿昌族', '怒族',
        '鄂温克族', '京族', '基诺族', '德昂族', '乌孜别克族', '俄罗斯族', '保安族', '裕固族', '门巴族', '鄂伦春族', '独龙族', '塔塔尔族', '赫哲族',
        '珞巴族'
      ],
      zzmm: ['中国共产党党员', '中国共产党预备党员', '中国共产主义青年团团员', '中国国民党革命委员会会员', '中国民主同盟盟员', '中国民主建国会会员', '中国民主促进会会员', '中国农工民主党党员', '中国致公党党员', '九三学社社员', '台湾民主自治同盟盟员', '无党派民主人士', '群众', '未说明情况'],
      whcd: ['文盲或半文盲', '博士研究生', '硕士研究生', '大学本科', '大学专科和专科学校', '中等专业学校或中等技术学校', '技工学校', '高中', '初中', '小学', '幼儿园', '学龄前', '特殊教育', '未说明情况'],
      jkzk: ['健康', '一般或较弱', '重病', '慢性病', '残疾', '未说明情况', '其他'],
      hyzk: ['未婚', '已婚', '初婚', '再婚', '复婚', '丧偶', '离婚', '未说明的婚姻状况'],
      dialogImageUrl: '',
      dialogImageArray: [],
      dialogVisible: false,
      dialogVisible3: false,
      isShow1: false,
      isShow2: true,
      url: '',
      imgUrl: '',//头像图片
    }
  },
  mounted() {
    // 滚动鼠标右侧导航栏跟随滚动位置改变而改变显示
    // window.removeEventListener('scroll',this.scroll,false)
    window.addEventListener('scroll', this.scroll, true)
  },
  watch: {
    xzqhArray(newA, oldA) {
      let qu = newA[0].split("#")[0]
      let cun = newA[1].split("#")[0]
      let zhen = newA[2].split("#")[0]
      // let i =qu+"#"+cun+"#"+zhen
      this.dibaoForm.abcd_ex34 = newA[0] + "," + newA[1] + "," + newA[2]
      this.dibaoForm.abcd_ex1 = qu
      this.dibaoForm.abcd_ex2 = zhen
      this.dibaoForm.abcd_ex3 = cun
    }
  },
  created() {
    this.loadData();
  },
  methods: {
    scroll() {
      // var scrollTop =document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset;
      if (document.querySelector('.info2') == null || document.querySelector('#recordt') == null) {
        return ''
      }
      let scrollTop = document.querySelector('.info2').scrollTop
      let cHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      let oDiv1 = document.querySelector('#page1');
      let oDiv2 = document.querySelector('#page2');

      // 顺序跟上面显示顺序要相反
      let clientHeight = document.querySelector('.info2').clientHeight
      let recordtClientHeight = document.querySelector('#recordt').scrollHeight
      if (!oDiv1 || !oDiv2) {
        return ''
      }
      if (recordtClientHeight + oDiv2.clientHeight < clientHeight && scrollTop > (oDiv2.offsetTop - oDiv1.offsetTop - clientHeight + recordtClientHeight + oDiv2.clientHeight)) {
        // console.log('触发了2-1')
        this.isShow(2)
      } else if (scrollTop > (oDiv2.offsetTop - oDiv1.offsetTop)) {
        // console.log('触发了2-2')
        this.isShow(2)
      } else if (scrollTop > (oDiv1.offsetTop - oDiv1.offsetTop)) {
        // console.log('触发了1')
        this.isShow(1)
      }
    },
    counter(id) { //counter1是绑定的点击事件名称
      document.querySelector(id).scrollIntoView(true);
    },
    loadData() {
      this.isFinish = false;
      this.getBasic({
        sId: this.$route.query.sId ? this.$route.query.sId : '',
      }).then(res => {
        // console.log(res)
        // this.dibaoForm = res[0]
        // this.uploadImg.abcd_ex27_img = res[0].abcd_ex27.split(",");
        // let  xzqhArray=this.dibaoForm.abcd_ex34.split(",");
        // if(xzqhArray.length==3){
        // 	this.$set(this.xzqhArray,0,xzqhArray[0]);
        // 	this.$set(this.xzqhArray,1,xzqhArray[1]);
        // 	this.$set(this.xzqhArray,2,xzqhArray[2]);
        // 	this.$set(this.test,"xzqhArray",xzqhArray);
        // }else{
        // 	this.xzqhArray=[]
        // }
        // this.isFinish=true;
        // console.log(this.xzqhArray)
      }).catch(res => {
        // this.$emit("closes", false)
        if (typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200) {
          console.log('请求失败了-----------------------')
          this.$message.error('数据获取失败或请求超时')
          this.$emit("closes", false)
          this.$router.go(-1)
          return false
        }
        this.dibaoForm = res.response.data[0]

        console.log('图片字符串', res.response.data);
        // console.log('图片字符串',JSON.parse(res.response.data));

        this.uploadImg.abcd_ex27_img = res.response.data[0].abcd_ex27.split(",");
        let xzqhArray = this.dibaoForm.abcd_ex34.split(",");
        if (xzqhArray.length == 3) {
          this.$set(this.xzqhArray, 0, xzqhArray[0]);
          this.$set(this.xzqhArray, 1, xzqhArray[1]);
          this.$set(this.xzqhArray, 2, xzqhArray[2]);
          this.$set(this.test, "xzqhArray", xzqhArray);
        } else {
          this.xzqhArray = [];
        }
        this.isFinish = true;

        // 谨防换行符 这里是文本域点击回车保存后再打开读取数据格式会出错；
        // 没有一个好的解决办法只能先在读取时、保存是进行文本格式替换
        if (res.response.data[0].abcd_ex26) {
          // var abcd_ex26 = this.dibaoForm.abcd_ex26.split('<br>');
          // this.dibaoForm.abcd_ex26=''
          // for(let i in abcd_ex26){
          // 	abcd_ex26[i] = abcd_ex26[i]+'\n';
          // 	this.dibaoForm.abcd_ex26 += abcd_ex26[i];
          // }
          // this.dibaoForm.abcd_ex26 = this.dibaoForm.abcd_ex26.replace(/['//n']+/g,'\n')
          this.dibaoForm.abcd_ex26 = this.dibaoForm.abcd_ex26.replace(/['\\n']+/g, '\n')
          // this.dibaoForm.abcd_ex26 = this.dibaoForm.abcd_ex26.replace('<br>','\n')
          this.dibaoForm.abcd_ex26 = this.dibaoForm.abcd_ex26.replace(/['&quot']+/g, '"')
          // this.dibaoForm.abcd_ex26 = this.dibaoForm.abcd_ex26.replace('\n','\n')
        }

        this.url = this.dibaoForm.abcd_ex27;
        this.url = this.url.replace("social/weixinMinios", "social/minios");
        console.log('头像照片', this.url);
        this.loadImg();
      })
    },

    // 加载图片 将图片路径作为参数发送给后端
    async loadImg() {
      if (this.url) {
        this.url = this.url.replace("social/weixinMinios", "social/minios");
        await request({
          method: 'post',
          url: this.url,
          data: {}
        }).then(res => {
          // this.imageList.push(res)
          // if(this.imageList.length>=this.len){
          // this.isOk=true;
          // }
        }).catch(res => {
          // console.log(res.response.data,'照片数据');
          console.log(res.response, '照片1')
          this.imgUrl = res.response.data;
        })
      }
    },


    isShow(n) {
      this.isShow1 = true
      this.isShow2 = true
      if (n == 1) {
        this.isShow1 = false
      } else if (n == 2) {
        this.isShow2 = false
      }
    },
    closeView() {
      this.$emit("closes", false)
      this.$router.go(-1)
    },
    async uploads(id, txt) {

      this.uploadId = id;

      if (txt == '头像') {
        await this.$alert('上传后会覆盖原头像，是否继续？')
      }
      this.dialogVisible3 = true;
      // 过滤身份证照片
      //this.dibaoForm.ab_ex10.split(",")--(result)  是有空值的数组

      //r是处理好的数组
      // if(this[dataName][id] == null) this[dataName][id] = "";
      // var r = this[dataName][id].split(",").filter(function (s) {
      // 	return s && s.trim();
      // });

      // this[dataName][id]=r.toString();

      // this.uploadId = id;
      // this.uploadDataName = dataName;
      // console.log(this.uploadId);

      try {
        this.$refs.myUpload.clears();
      } catch (e) {
      }
    },


    uploadEvent(data) {
      // 当上传的是头像时
      this.imgUrl = data;
      this.url = this.imgUrl;
      console.log(this.imgUrl, '头像照片');
      this.loadImg();

      console.log(data, '上传数据');
      let val = this.dibaoForm[this.uploadId];
      val = val == "" ? data : val + "," + data;

      this.dibaoForm[this.uploadId] = val;

      this.uploadImg[this.uploadId + "_img"] = val.split(",");

      console.log(data);

      // let val = this[this.uploadDataName][this.uploadId];
      // val = val == "" ? data : val + "," + data;
      // this[this.uploadDataName][this.uploadId] = val;
    },

    // uploadEvent2(){
    // 	this.uploadImg[this.uploadId + "_img"] = this[this.uploadDataName][this.uploadId].split(",");
    // 	this.uploadDataName = null;
    // 	this.getImgNum()   // 获取图片数量
    // },

    save() {
      this.$refs['dibaoForm'].validate((valid) => {
        if (valid) {
        } else {
          //console.log('error submit!!');
          return false;
        }
      });
      let msgs = this.validate();
      if (msgs) {
        this.$message.warning(msgs);
        return false
      }

      this.dibaoForm.abcd_ex26 = this.dibaoForm.abcd_ex26.replace(/["]+/g, '&quot')
      // this.dibaoForm.abcd_ex26 = this.dibaoForm.abcd_ex26.replace(/[\n\r]/g,'/\/n')

      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      if (this.$route.query.type == 'etzr') {
        this.dibaoForm.abcd_ex28 = '儿童主任'
      } else if (this.$route.query.type == 'etddy') {
        this.dibaoForm.abcd_ex28 = '儿童督导员'
      }
      this.saveBasic({
        data: '[' + JSON.stringify(this.dibaoForm) + ']',
        type: this.$route.query.type,
      }).then((res) => {
        // if (res[0].status=="+OK") {
        // 	loading.close()
        // 	this.$message.success(res[0].msg)
        // 	this.$emit("closes", false)

        // } else {
        // 	loading.close()
        // 	this.$message.error(res[0].msg)
        // }
      }).catch((res) => {
        // loading.close()
        // this.$message.error("请求超时或网络异常");
        if (typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200) {
          console.log('请求失败了-----------------------')
          this.$message.error('数据获取失败或请求超时')
          this.$emit("closes", false)
          this.$router.go(-1)
          return false
        }
        if (res.response.data[0].status == "+OK") {
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
    getBasic(data) {
      return request({
        // headers: {
        // 	'Accept': 'application/json',
        // },
        url: "/social/assistance/getDirector",
        method: 'post',
        data: data
      })
    },
    saveBasic(data) {
      return request({
        // headers: {
        // 	accept: 'application/json',
        // }
        method: 'post',
        url: '/social/assistance/saveBasicDirector',
        data: data
      })
    },
    isCardID(sId) {
      var aCity = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外"
      };
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
    validate() {
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

  }
}
</script>

<style scoped>
.g-box {
  height: 80VH !important;
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
  overflow: auto
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
  margin-left: 10px
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
  border-bottom: 1px solid #EBEEF5 !important;
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
  border-left: 2px solid #3385FF;
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
  color: #3385FF !important
}

/* 	.my-table .el-input .el-input__inner{
  border: none !important;
} */
.my-table >>> .el-input__inner {
  border: 0;
}

.head_box {
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  float: right;
  margin-left: 10px;
  box-sizing: border-box;
  overflow: hidden;
  /* padding: 5px 10px; */
  /* border:1px dashed #333; */
}

.head_photo {
  margin: 0 auto;
  width: 100%;
  height: 220px;
  border-radius: 10px;
  overflow: hidden;
  /* box-shadow: 3px 3px 5px rgba(211, 211, 211, 0.438); */
  float: right;
  /* border: 1px solid #eee; */
  /* background-color: rgb(245, 245, 245); */
}

.head_img2 {
  width: 120px;
  height: 140px;
  border: 1px solid #eee;
  border-radius: 10px;
  margin: 10px auto;
  box-sizing: border-box;
  background-color: #ececec;
}

.head_img {
  width: 120px;
  height: 140px;
  border: 1px solid #eee;
  /* padding:5px; */
  border-radius: 10px;
  display: block;
  margin: 10px auto;
  box-sizing: border-box;
}

.head_btn {
  margin: -50px auto 20px;
  width: 120px;
  box-sizing: border-box;

  /* float: right; */
  /* margin-right: 50px; */
  /* flex-direction: column; */
  /* justify-content: space-around; */
}

/* .textarea{
  white-space: pre-wrap;
} */
</style>

<template>
  <div class="g-box">
    <div class="g-box2">
      <div class="info2">
        <el-form ref="dibaoForm" :inline-message="true" :model="dibaoForm" :rules="rules" :show-message="false"
                 label-width="auto" style='padding-right: 10px;'>
          <h3 id="page1" class="line_blue">&emsp;基本信息</h3>
          <div class="lineSt"></div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="儿童姓名" prop="abc_ex6">
                <el-input v-model="dibaoForm.abc_ex6" placeholder="请输入儿童姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="身份证号码" prop="abc_ex7">
                <el-input v-model="dibaoForm.abc_ex7" placeholder="请输入身份证号码"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <!-- <el-col :span="12">
              <el-form-item label="联系电话" prop="ab_ex28">
                <el-input v-model="dibaoForm.ab_ex28" placeholder="请输入联系电话"></el-input>
              </el-form-item>
            </el-col> -->
            <el-col :span="12">
              <el-form-item label="档案号" prop="abc_ex158">
                <el-input v-model="dibaoForm.abc_ex158" placeholder="请输入档案号"></el-input>
                <!-- <el-date-picker type="date" v-model="dibaoForm.abc_ex158"  value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker> -->
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="行政区域" prop="abc_ex234">
                <el-cascader v-if="isFinish" v-model="xzqhArray" :props="props" placeholder="请选择"
                             style="width:100%;"></el-cascader>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="困境类别" prop="abc_ex93">
                <el-checkbox-group v-model="abc_ex93">
                  <el-checkbox label="孤儿"></el-checkbox>
                  <el-checkbox label="父母监护缺失"></el-checkbox>
                  <el-checkbox label="父母无力履行监护职责"></el-checkbox>
                  <el-checkbox label="重残"></el-checkbox>
                  <el-checkbox label="非重残"></el-checkbox>
                  <el-checkbox label="重病"></el-checkbox>
                  <el-checkbox label="流浪儿童"></el-checkbox>
                  <el-checkbox label="贫困家庭">贫困家庭(
                    <el-checkbox-group v-model="abc_ex95" style="display:inline-block">
                      <el-checkbox label="低保"></el-checkbox>
                      <el-checkbox label="特困供养"></el-checkbox>
                      <el-checkbox label="建档立卡"></el-checkbox>
                    </el-checkbox-group>
                    )
                  </el-checkbox>
                  <el-checkbox label="低收入家庭（低保边缘户）"></el-checkbox>
                  <el-checkbox label="其他">其他
                    <el-input v-model="dibaoForm.abc_ex96" placeholder="请输入其他类别"></el-input>
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="12">
              <el-form-item label="档案号" prop="abc_ex158">
                <el-input v-model="dibaoForm.abc_ex158" placeholder="请输入档案号"></el-input>
                <el-date-picker type="date" v-model="dibaoForm.abc_ex158"  value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col> -->
          </el-row>


          <h3 id="page2" class="line_blue">&emsp;问题清单</h3>
          <div class="lineSt"></div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="生活保障" prop="abc_ex160">
                <el-select v-model="dibaoForm.abc_ex160" placeholder="请选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="生活保障简述" prop="abc_ex161">
                <el-input v-model="dibaoForm.abc_ex161" placeholder="请输入生活保障简述"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="医疗保障" prop="abc_ex162">
                <el-checkbox-group v-model="abc_ex162">
                  <el-checkbox label="已保障到位"></el-checkbox>
                  <el-checkbox label="未资助参保"></el-checkbox>
                  <el-checkbox label="未报销到位">未报销到位(
                    <el-checkbox-group v-model="abc_ex163" style="display:inline-block">
                      <el-checkbox label="医疗"></el-checkbox>
                      <el-checkbox label="明天计划"></el-checkbox>
                      <el-checkbox label="牵手困境儿童"></el-checkbox>
                      <el-checkbox label="大病慈善救助"></el-checkbox>
                    </el-checkbox-group>
                    )
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="医疗保障简述" prop="abc_ex164">
                <el-input v-model="dibaoForm.abc_ex164" placeholder="请输入医疗保障简述"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="教育资助" prop="abc_ex165">
                <el-checkbox-group v-model="abc_ex165">
                  <el-checkbox label="已资助到位"></el-checkbox>
                  <el-checkbox label="未报销到位">未资助到位(
                    <el-checkbox-group v-model="abc_ex167" style="display:inline-block">
                      <el-checkbox label="教育资助"></el-checkbox>
                      <el-checkbox label="孤儿助学"></el-checkbox>
                      <el-checkbox label="牵手贫困学子"></el-checkbox>
                    </el-checkbox-group>
                    )
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="教育资助" prop="abc_ex166">
                <el-select v-model="dibaoForm.abc_ex166" placeholder="请选择">
                  <!-- <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option> -->
                  <el-option label="失学" value="失学"></el-option>
                  <el-option label="辍学" value="辍学"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="教育资助简述" prop="abc_ex168">
                <el-input v-model="dibaoForm.abc_ex168" placeholder="请输入教育资助简述"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="康复救助" prop="abc_ex169">
                <el-checkbox-group v-model="abc_ex169">
                  <el-checkbox label="已救助到位"></el-checkbox>
                  <el-checkbox label="未参加康复训练"></el-checkbox>
                  <el-checkbox label="未配备矫治器具"></el-checkbox>
                  <el-checkbox label="不符合康复救助"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="康复救助简述" prop="abc_ex170">
                <el-input v-model="dibaoForm.abc_ex170" placeholder="请输入康复救助简述"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="监护保护" prop="abc_ex171">
                <el-checkbox-group v-model="abc_ex171">
                  <el-checkbox label="监护正常"></el-checkbox>
                  <el-checkbox label="父">父
                    <el-checkbox label="母">母不履行监护责任(
                      <el-radio-group v-model="dibaoForm.abc_ex172" style="display:inline-block">
                        <el-radio label="已报案"></el-radio>
                        <el-radio label="未报案"></el-radio>
                      </el-radio-group>
                      )
                    </el-checkbox>
                  </el-checkbox>
                  <el-checkbox label="未按规定委托监护人"></el-checkbox>
                  <el-checkbox label="委托监护人监护不当"></el-checkbox>
                  <el-checkbox label="其他"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="监护保护简述" prop="abc_ex173">
                <el-input v-model="dibaoForm.abc_ex173" placeholder="请输入监护保护简述"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="四色管理" prop="abc_ex228">
                <el-select v-model="dibaoForm.abc_ex228" placeholder="请选择">
                  <!-- <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option> -->
                  <el-option label="红" value="红"></el-option>
                  <el-option label="黄" value="黄"></el-option>
                  <el-option label="蓝" value="蓝"></el-option>
                  <el-option label="绿" value="绿"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="四色管理简述" prop="abc_ex229">
                <el-input v-model="dibaoForm.abc_ex229" placeholder="请输入四色管理简述"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="其他" prop="abc_ex174">
                <el-input v-model="dibaoForm.abc_ex174" placeholder="请输入其他"></el-input>
              </el-form-item>
            </el-col>
          </el-row>


          <h3 id="page3" class="line_blue">&emsp;服务方案</h3>
          <div class="lineSt"></div>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="服务方案" prop="abc_ex175">
                <el-checkbox-group v-model="abc_ex175">
                  <el-checkbox label="协助争取保障"></el-checkbox>
                  <el-checkbox label="志愿者定期探访"></el-checkbox>
                  <el-checkbox label="社工结对服务"></el-checkbox>
                  <el-checkbox label="强制报告"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="社工" prop="abc_ex176">
                <el-input v-model="dibaoForm.abc_ex176" placeholder="请输入社工"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="社工签字时间" prop="abc_ex177">
                <el-date-picker v-model="dibaoForm.abc_ex177" placeholder="请选择" style="width: 100%;" type="date"
                                value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="村（居）" prop="abc_ex178">
                <el-input v-model="dibaoForm.abc_ex178" placeholder="请输入村（居）"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="签字/盖章时间" prop="abc_ex179">
                <el-date-picker v-model="dibaoForm.abc_ex179" placeholder="请选择" style="width: 100%;" type="date"
                                value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="镇（街道）民政科" prop="abc_ex180">
                <el-input v-model="dibaoForm.abc_ex180" placeholder="请输入镇（街道）民政科"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="签字/盖章时间" prop="abc_ex181">
                <el-date-picker v-model="dibaoForm.abc_ex181" placeholder="请选择" style="width: 100%;" type="date"
                                value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="服务方案内容" prop="abc_ex182">
                <el-input v-model="dibaoForm.abc_ex182" autosize type="textarea"></el-input>
              </el-form-item>
            </el-col>
          </el-row>


          <!-- <h3 class="line_blue" id="page7">&emsp;身份证及其他证明材料</h3>
          <div class="lineSt"></div> -->
          <div id="recordt">
          </div>

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
              <a :class="{listStyleA:!isShow1}" class="ainfoFont" @click="counter('#page1')">基础信息</a><br>
            </li>
            <li :class="{listStyle:isShow2}" @click="isShow(2)">
              <a :class="{listStyleA:!isShow2}" class="ainfoFont" @click="counter('#page2')">问题清单</a><br>
            </li>
            <li :class="{listStyle:isShow3}" @click="isShow(3)">
              <a :class="{listStyleA:!isShow3}" class="ainfoFont" @click="counter('#page3')">服务方案</a><br>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import request from '@/utils/request'

export default {
  name: "AddEditKjetFwbz",
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
      abc_ex93: [],
      abc_ex95: [],
      abc_ex162: [],
      abc_ex165: [],
      abc_ex163: [],
      abc_ex167: [],
      abc_ex169: [],
      abc_ex171: [],
      abc_ex175: [],


      options: [
        {
          label: '已全额保障',
          value: '已全额保障',
        }, {
          label: '符合政策但未保障',
          value: '符合政策但未保障',
        }, {
          label: '已纳入保障但未足额',
          value: '已纳入保障但未足额',
        }, {
          label: '不符合生活补助',
          value: '不符合生活补助',
        }, {
          label: '其他',
          value: '其他',
        },
      ],
      dibaoForm: {},
      rules: {
        // ab_ex3: [{
        // 	required: true,
        // 	message: '户主姓名不能为空',
        // 	trigger: 'blur'
        // }],
      },
      isShow1: false,
      isShow2: true,
      isShow3: true,
      isShow4: true,
      isShow5: true,
      isShow6: true,
      isShow7: true,
      isShow8: true,
      isShow9: true,
    }
  },
  mounted() {
    // 滚动鼠标右侧导航栏跟随滚动位置改变而改变显示
    window.addEventListener('scroll', this.scroll, true)
  },
  watch: {
    xzqhArray(newA, oldA) {
      let qu = newA[0].split("#")[0]
      let cun = newA[1].split("#")[0]
      let zhen = newA[2].split("#")[0]
      // let i =qu+"#"+cun+"#"+zhen
      this.dibaoForm.abc_ex234 = newA[0] + "," + newA[1] + "," + newA[2]
      this.dibaoForm.abc_ex1 = qu
      this.dibaoForm.abc_ex2 = zhen
      this.dibaoForm.abc_ex3 = cun
      // console.log(i)
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
      let oDiv3 = document.querySelector('#page3');

      // 顺序跟上面显示顺序要相反
      let clientHeight = document.querySelector('.info2').clientHeight
      let recordtClientHeight = document.querySelector('#recordt').scrollHeight
      if (!oDiv1 || !oDiv2 || !oDiv3) {
        return ''
      }
      if (recordtClientHeight + oDiv3.clientHeight < clientHeight && scrollTop > (oDiv3.offsetTop - oDiv1.offsetTop - clientHeight + recordtClientHeight + oDiv3.clientHeight)) {
        // console.log('触发了3-1')
        this.isShow(3)
      } else if (scrollTop > (oDiv3.offsetTop - oDiv1.offsetTop)) {
        // console.log('触发了3')
        this.isShow(2)
      } else if (scrollTop > (oDiv2.offsetTop - oDiv1.offsetTop)) {
        // console.log('触发了2')
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
        sId: this.$route.query.sId,
        type: this.$route.query.type,
      }).then(res => {
        // this.dibaoForm = res[0]

        // this.abc_ex93 = res[0].abc_ex93.split(',')
        // this.abc_ex95 = res[0].abc_ex95.split(',')
        // this.abc_ex162 = res[0].abc_ex162.split(',')
        // this.abc_ex165 = res[0].abc_ex165.split(',')
        // this.abc_ex163 = res[0].abc_ex163.split(',')
        // this.abc_ex167 = res[0].abc_ex167.split(',')
        // this.abc_ex169 = res[0].abc_ex169.split(',')
        // this.abc_ex171 = res[0].abc_ex171.split(',')
        // this.abc_ex175 = res[0].abc_ex175.split(',')

        // let  xzqhArray=this.dibaoForm.abc_ex234.split(",");
        // if(xzqhArray.length==3){
        // 	// this.xzqhArray=[]
        // 	this.$set(this.xzqhArray,0,xzqhArray[0]);
        // 	this.$set(this.xzqhArray,1,xzqhArray[1]);
        // 	this.$set(this.xzqhArray,2,xzqhArray[2]);
        // 	this.$set(this.test,"xzqhArray",xzqhArray);
        // 	// this.$forceUpdate()
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
        this.abc_ex93 = res.response.data[0].abc_ex93.split(',')
        this.abc_ex95 = res.response.data[0].abc_ex95.split(',')
        this.abc_ex162 = res.response.data[0].abc_ex162.split(',')
        this.abc_ex165 = res.response.data[0].abc_ex165.split(',')
        this.abc_ex163 = res.response.data[0].abc_ex163.split(',')
        this.abc_ex167 = res.response.data[0].abc_ex167.split(',')
        this.abc_ex169 = res.response.data[0].abc_ex169.split(',')
        this.abc_ex171 = res.response.data[0].abc_ex171.split(',')
        this.abc_ex175 = res.response.data[0].abc_ex175.split(',')
        let xzqhArray = this.dibaoForm.abc_ex234.split(",");
        if (xzqhArray.length == 3) {
          this.$set(this.xzqhArray, 0, xzqhArray[0]);
          this.$set(this.xzqhArray, 1, xzqhArray[1]);
          this.$set(this.xzqhArray, 2, xzqhArray[2]);
          this.$set(this.test, "xzqhArray", xzqhArray);
        } else {
          this.xzqhArray = []
        }
        this.isFinish = true;
      })
    },
    isShow(n) {
      this.isShow1 = true
      this.isShow2 = true
      this.isShow3 = true

      if (n == 1) {
        this.isShow1 = false
      } else if (n == 2) {
        this.isShow2 = false
      } else if (n == 3) {
        this.isShow3 = false
      }
    },
    closeView() {
      this.$emit("closes", false)
      this.$router.go(-1)
    },


    save() {
      /*if(this.dibaoForm.ab_ex7 =='' || this.dibaoForm.ab_ex7.length!=18){
        this.$message.warning('请输入正确的身份证号')
        return false
      }*/
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
      // if(this.dibaoForm.ab_ex7){
      // 	let msg=this.isCardID(this.dibaoForm.ab_ex7);
      // 	if(msg){
      // 		this.$message.warning("户主"+msg);
      // 		return false
      // 	}
      // }

      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      this.dibaoForm.abc_ex93 = this.abc_ex93.join(',')
      this.dibaoForm.abc_ex95 = this.abc_ex95.join(',')
      this.dibaoForm.abc_ex162 = this.abc_ex162.join(',')
      this.dibaoForm.abc_ex165 = this.abc_ex165.join(',')
      this.dibaoForm.abc_ex163 = this.abc_ex163.join(',')
      this.dibaoForm.abc_ex167 = this.abc_ex167.join(',')
      this.dibaoForm.abc_ex169 = this.abc_ex169.join(',')
      this.dibaoForm.abc_ex171 = this.abc_ex171.join(',')
      this.dibaoForm.abc_ex175 = this.abc_ex175.join(',')

      this.saveBasic({
        sId: this.$route.query.sId ? this.$route.query.sId : '',
        type: this.$route.query.type ? this.$route.query.type : '',
        data: '[' + JSON.stringify(this.dibaoForm) + ']',
      }).then((res) => {
        // if (res[0].status=="+Ok") {
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
          loading.close()
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
        url: "/social/assistance/getChildrenBasicsFwfa",
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
        url: '/social/assistance/childrenBasicsEditFwfa',
        data: data
      })
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
</style>

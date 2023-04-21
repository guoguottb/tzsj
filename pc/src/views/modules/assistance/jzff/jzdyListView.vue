<template>
  <div class="g-box">
    <div class="g-box2">
      <div class="info2">
        <el-form :model="ptreatment1"
                 :inline-message="true"
                 :show-message="false"
                 ref="supportinst"
                 label-width="auto"
                 style='padding-right: 10px;'>

          <h3 class="line_blue"
              id="page1">&emsp;个人享受待遇信息</h3>
          <div class="lineSt"></div>
          <div class="inner-content">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="姓名"
                              prop="abp_ex1">
                  {{ptreatment1.abp_ex1}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="身份证号"
                              prop="abp_ex2">
                  {{ptreatment1.abp_ex2}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="所属地区"
                              prop="abp_ex14">
                  {{ptreatment1.abp_ex14}} <span v-if="ptreatment1.abp_ex15 != ''"
                        style="color:red;font-weight:bold;"
                        title="区划数据异常">{{ptreatment1.abp_ex15}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="待遇类型"
                              prop="abp_ex4">
                  {{ptreatment1.abp_ex4}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="创建时间"
                              prop="abp_dat1">
                  {{ptreatment1.abp_dat1}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="更新时间"
                              prop="abp_dat2">
                  {{ptreatment1.abp_dat2}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="家庭关系"
                              prop="abp_ex12">
                  {{ptreatment1.abp_ex12}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="享受待遇状态"
                              prop="abp_ex6">
                  {{ptreatment1.abp_ex6}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="待遇开始年月"
                              prop="abp_dat3">
                  {{ptreatment1.abp_dat3}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="待遇结束年月"
                              prop="abp_dat4">
                  {{ptreatment1.abp_dat4}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="救助金额"
                              prop="abp_ex5">
                  {{ptreatment1.abp_ex5}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20"
                    v-if="ptreatment4.length > 0">
              <el-col :span="12">
                <el-form-item>
                  <span slot="label"
                        style="color: red; font-weight: bold;">救助金分类详情</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20"
                    v-if="ptreatment4.length > 0">
              <el-col :span="12">
                <el-form-item>
                  <span slot="label">{{ptreatment4[0].abpc_ex1}}</span>
                  {{ptreatment4[0].abpc_ex5}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item>
                  <span slot="label">{{ptreatment4[1].abpc_ex1}}</span>
                  {{ptreatment4[1].abpc_ex5}}
                </el-form-item>
              </el-col>
            </el-row>
          </div>

          <h3 class="line_blue"
              id="page2">&emsp;个人享受待遇增减记录</h3>
          <div class="lineSt"></div>
          <div class="inner-content">
            <el-table :data="ptreatment3"
                      border>
              <el-table-column prop="abpc_ex4"
                               label="变化类型"
                               width="80"></el-table-column>
              <el-table-column prop="abpc_ex5"
                               label="变化前金额"
                               width="100"></el-table-column>
              <el-table-column prop="abpc_ex6"
                               label="变化后金额"
                               width="100"></el-table-column>
              <el-table-column prop="abpc_ex7"
                               label="变化金额"
                               width="100"></el-table-column>
              <el-table-column prop="abpc_ex9"
                               label="变化前待遇类型"
                               width="180"></el-table-column>
              <el-table-column prop="abpc_ex10"
                               label="变化后待遇类型"
                               width="180"></el-table-column>
              <el-table-column prop="abpc_dat3"
                               label="生效年月"
                               width="100"></el-table-column>
            </el-table>
          </div>

          <h3 class="line_blue"
              id="page3">&emsp;个人享受其他待遇记录</h3>
          <div class="lineSt"></div>
          <div class="inner-content">
            <el-table :data="ptreatment2"
                      border>
              <el-table-column prop="abp_dat1"
                               label="创建日期"
                               width="100"></el-table-column>
              <el-table-column prop="abp_ex14"
                               label="所属地区"
                               width="180"></el-table-column>
              <el-table-column prop="abp_ex4"
                               label="待遇类型"
                               width="180"></el-table-column>
              <el-table-column prop="abp_ex5"
                               label="救助金额"
                               width="100"></el-table-column>
              <el-table-column prop="abp_ex6"
                               label="状态"
                               width="80"></el-table-column>
              <el-table-column prop="abp_dat3"
                               label="待遇开始年月"
                               width="180"></el-table-column>
              <el-table-column prop="abp_dat4"
                               label="待遇结束年月"
                               width="180"></el-table-column>
            </el-table>
          </div>

          <h3 class="line_blue"
              id="page5">&emsp;个人享受待遇资金发放明细(个人所有待遇)</h3>
          <div class="lineSt"></div>
          <div class="inner-content">
            <el-table :data="reliefdist1"
                      border>
              <el-table-column prop="arfm_dat1"
                               label="创建时间"
                               width="100"></el-table-column>
              <el-table-column prop="ar_ex9"
                               label="发放机构区划"
                               width="180"></el-table-column>
              <el-table-column prop="arfm_ex8"
                               label="所属地区"
                               width="180"></el-table-column>
              <el-table-column prop="arfm_dat3"
                               label="发放年月"
                               width="100"></el-table-column>
              <el-table-column prop="arfm_ex3"
                               label="待遇类型"
                               width="200"></el-table-column>
              <el-table-column prop="arfm_ex10"
                               label="发放金额"
                               width="180"></el-table-column>
            </el-table>
          </div>
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
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow1}"
                 @click="counter('#page1')">个人享受待遇信息</a><br>
            </li>
            <li :class="{listStyle:isShow2}"
                @click="isShow(2)">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow2}"
                 @click="counter('#page2')">个人享受待遇增减记录</a><br>
            </li>
            <li :class="{listStyle:isShow3}"
                @click="isShow(3)">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow3}"
                 @click="counter('#page3')">个人享受其他待遇记录</a><br>
            </li>
            <li :class="{listStyle:isShow5}"
                @click="isShow(5)">
              <a class="ainfoFont"
                 :class="{listStyleA:!isShow5}"
                 @click="counter('#page5')">个人享受待遇资金发放明细</a><br>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import request from '@/utils/request'
import commonList from '../commonList'

export default {
  name: "yldyListVIew",
  components: {
    commonList
  },
  data () {
    return {
      reliefdist1: [], //个人享受待遇资金发放明细
      ptreatment1: {}, //个人享受待遇信息
      ptreatment2: [], //个人享受其他待遇记录
      ptreatment3: [], //个人享受待遇增减记录
      ptreatment4: [], //个人待遇分类信息
      isFinish: false, //貌似没什么用
      isShow1: false,
      isShow2: true,
      isShow3: true,
      isShow4: true, //貌似没什么用
      isShow5: true
    }
  },
  mounted () {
    window.addEventListener('scroll', this.scroll, true)
  },
  created () {
    this.loadData();
  },
  methods: {
    scroll () {
      if (document.querySelector('.info2') == null) {
        return ''
      }
      let scrollTop = document.querySelector('.info2').scrollTop
      let cHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      let oDiv1 = document.querySelector('#page1');
      let oDiv2 = document.querySelector('#page2');
      let oDiv3 = document.querySelector('#page3');
      let oDiv5 = document.querySelector('#page5');

      // 顺序跟上面显示顺序要相反
      let clientHeight = document.querySelector('.info2').clientHeight
      if (!oDiv1 || !oDiv2 || !oDiv3 || !oDiv5) {
        return ''
      }
      if (scrollTop > (oDiv5.offsetTop - oDiv1.offsetTop)) {
        this.isShow(5)
      } else if (scrollTop > (oDiv3.offsetTop - oDiv1.offsetTop)) {
        this.isShow(3)
      } else if (scrollTop > (oDiv2.offsetTop - oDiv1.offsetTop)) {
        this.isShow(2)
      } else if (scrollTop > (oDiv1.offsetTop - oDiv1.offsetTop)) {
        this.isShow(1)
      }
    },
    counter (id) { //counter1是绑定的点击事件名称
      document.querySelector(id).scrollIntoView(true);
    },
    isShow (n) {
      this.isShow1 = true
      this.isShow2 = true
      this.isShow3 = true
      this.isShow4 = true
      this.isShow5 = true
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
      }
    },
    closeView () {
      this.$emit("closes", false)
      this.$router.go(-1)
    },
    loadData () {// 进入页面加载数据
      this.isFinish = false;
      this.getPTreatmentInfo({
        sId: this.$route.query.sId
      }).then(res => {
        this.ptreatment1 = res[0].ptreatment1[0];
        this.ptreatment2 = res[0].ptreatment2;
        this.ptreatment3 = res[0].ptreatment3;
        this.ptreatment4 = res[0].ptreatment4;
        this.reliefdist1 = res[0].reliefdist1;
        //this.formatData();
        this.isFinish = true;
      }).catch(res => {
        if (typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200) {
          console.log('请求失败了-----------------------')
          this.$message.error('数据获取失败或请求超时11111')
          this.$emit("closes", false)
          this.$router.go(-1)
          return false
        }
        //this.supportinst = this.formatPTSS(res.response.data[0].data, "set");
        try {
          this.ptreatment1 = res.response.data[0].ptreatment1[0];
          this.ptreatment2 = res.response.data[0].ptreatment2;
          this.ptreatment3 = res.response.data[0].ptreatment3;
          this.ptreatment4 = res.response.data[0].ptreatment4;
          this.reliefdist1 = res.response.data[0].reliefdist1;
          this.formatData();
        } catch (e) { alert(e.message) }
        this.isFinish = true;
      })
    },

    vss (d) {
      var h = [];
      for (var k in d) {
        h.push(k + "=" + d[k]);
      }
      return h.join("\r");
    },

    getPTreatmentInfo (data) {
      return request({
        url: "/social/assistance/getPTreatmentInfo",
        method: 'post',
        data: data
      })
    },
    formatData () {
      //处理增减记录
      for (let i = 0; i < this.ptreatment3.length; i++) {
        this.ptreatment3[i].abpc_dat1 = this.formatDate(this.ptreatment3[i].abpc_dat1, "yyyy-MM-dd");
        this.ptreatment3[i].abpc_dat3 = this.formatDate(this.ptreatment3[i].abpc_dat3, "yyyyMM");
      }
      //处理其他待遇记录
      for (let i = 0; i < this.ptreatment2.length; i++) {
        this.ptreatment2[i].abpc_dat1 = this.formatDate(this.ptreatment2[i].abpc_dat1, "yyyy-MM-dd");
        this.ptreatment2[i].abpc_dat2 = this.formatDate(this.ptreatment2[i].abpc_dat2, "yyyy-MM-dd");
        this.ptreatment2[i].abpc_dat3 = this.formatDate(this.ptreatment2[i].abpc_dat3, "yyyyMM");
        this.ptreatment2[i].abpc_dat4 = this.formatDate(this.ptreatment2[i].abpc_dat4, "yyyyMM");
      }
      //处理本待遇信息
      this.ptreatment1.abp_dat1 = this.formatDate(this.ptreatment1.abp_dat1, "yyyy-MM-dd");
      this.ptreatment1.abp_dat2 = this.formatDate(this.ptreatment1.abp_dat2, "yyyy-MM-dd");
      this.ptreatment1.abp_dat3 = this.formatDate(this.ptreatment1.abp_dat3, "yyyyMM");
      this.ptreatment1.abp_dat4 = this.formatDate(this.ptreatment1.abp_dat4, "yyyyMM");

      switch (this.ptreatment1.abp_ex6) {
        case "1":
          this.ptreatment1.abp_ex6 = "正常";
          break;
        case "2":
          this.ptreatment1.abp_ex6 = "停止";
          break;
        case "3":
          this.ptreatment1.abp_ex6 = "暂停";
          break;
        default:
          this.ptreatment1.abp_ex6 = "未开始";
          break;
      }
      this.ptreatment1.abp_ex15 = this.ptreatment1.abp_ex15 == "1" ? "(*)" : "";
      //处理发放记录
      for (let i = 0; i < this.reliefdist1.length; i++) {
        this.reliefdist1[i].arfm_dat1 = this.formatDate(this.reliefdist1[i].arfm_dat1, "yyyy-MM-dd");
        this.reliefdist1[i].arfm_dat3 = this.formatDate(this.reliefdist1[i].arfm_dat3, "yyyyMM");
      }
    },
    formatDate (str, fmt) {
      if (!str) return "";
      let re = (new Date(str)).Format(fmt);
      if (re.startsWith("1900")) {
        re = "";
      }
      return re;
    }
  }
}
</script>
<style scoped>
.g-box {
  height: 80vh !important;
}
.g-box2 {
  height: 100%;
  width: 100%;
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
.inner-content {
  width: 100%;
  margin-top: 20px;
  margin-bottom: 50px;
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
</style>

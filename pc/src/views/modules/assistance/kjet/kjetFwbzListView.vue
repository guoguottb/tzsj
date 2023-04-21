<template>
  <div v-loading="loading" class="g-box">
    <div class='g-box2'>
      <div class="info2">
        <el-form :inline="true" class="demo-form-inline">
          <h3 id="page1" class="line_blue">&emsp;基础信息</h3>
          <div class="lineSt"></div>
          <div class="top_1">
            <table class="top_2">
              <tr style="height:40px;">
                <td style="width:10%;">儿童姓名:</td>
                <td style="width:40%;">{{ basicInf.abc_ex6 }}</td>
                <td style="width:10%;">身份证号码:</td>
                <td style="width:40%;">{{ basicInf.abc_ex7 }}</td>
              </tr>
              <tr style="height:40px;">
                <td style="width:10%;">档案号:</td>
                <td style="width:40%;">{{ basicInf.abc_ex158 }}</td>
                <td style="width:10%;">行政区划:</td>
                <td style="width:40%;">
                  {{ basicInf.abc_ex234 ? basicInf.abc_ex234.split(',')[0].split('#')[0] + basicInf.abc_ex234.split(',')[1].split('#')[0] + basicInf.abc_ex234.split(',')[2].split('#')[0] : '' }}
                </td>
              </tr>
              <tr style="height:40px;">
                <td>困境类别:</td>
                <td>
                  {{ basicInf.abc_ex93.replace(/贫困家庭/, '贫困家庭(' + basicInf.abc_ex95 + ')').replace(/其他/, '其他(' + basicInf.abc_ex96 + ')') }}
                </td>
              </tr>
            </table>
          </div>
          <h3 id="page2" class="line_blue">&emsp;问题清单</h3>
          <div class="lineSt"></div>
          <div class="top_1">
            <table class="top_2">
              <tr style="height:40px;">
                <td style="width:10%;">生活保障:</td>
                <td style="width:40%;">{{ basicInf.abc_ex160 }}</td>
                <td style="width:10%;">生活保障简述:</td>
                <td style="width:40%;">{{ basicInf.abc_ex161 }}</td>
              </tr>
              <tr style="height:40px;">
                <td style="width:10%;">医疗保障:</td>
                <td style="width:40%;">{{ basicInf.abc_ex162.replace(/未报销到位/, '未报销到位(' + basicInf.abc_ex163 + ')') }}
                </td>
                <td style="width:10%;">医疗保障简述:</td>
                <td style="width:40%;">{{ basicInf.abc_ex164 }}</td>
              </tr>
              <tr style="height:40px;">
                <td style="width:10%;">教育资助:</td>
                <td style="width:40%;">
                  {{ basicInf.abc_ex162.replace(/未资助到位/, '未资助到位(' + basicInf.abc_ex167 + ')') }}{{ basicInf.abc_ex166 ? (',' + basicInf.abc_ex166) : '' }}
                </td>
                <td style="width:10%;">教育资助简述:</td>
                <td style="width:40%;">{{ basicInf.abc_ex168 }}</td>
              </tr>
              <tr style="height:40px;">
                <td style="width:10%;">康复救助:</td>
                <td style="width:40%;">{{ basicInf.abc_ex169 }}</td>
                <td style="width:10%;">康复救助简述:</td>
                <td style="width:40%;">{{ basicInf.abc_ex170 }}</td>
              </tr>
              <tr style="height:40px;">
                <td style="width:10%;">监护保护:</td>
                <td style="width:40%;">
                  {{ basicInf.abc_ex171.replace(/母/, '母亲不履行监护责任(' + basicInf.abc_ex172 + ')').replace(/父/, '父亲不履行监护责任(' + basicInf.abc_ex172 + ')') + basicInf.abc_ex172 }}
                </td>
                <td style="width:10%;">监护保护简述:</td>
                <td style="width:40%;">{{ basicInf.abc_ex173 }}</td>
              </tr>
              <tr style="height:40px;">
                <td style="width:10%;">四色管理:</td>
                <td style="width:40%;">{{ basicInf.abc_ex228 }}</td>
                <td style="width:10%;">四色管理简述:</td>
                <td style="width:40%;">{{ basicInf.abc_ex229 }}</td>
              </tr>
              <tr style="height:40px;">
                <td style="width:10%;">其他情况:</td>
                <td style="width:40%;">{{ basicInf.abc_ex174 }}</td>
              </tr>
            </table>
          </div>
          <h3 id="page3" class="line_blue">&emsp;服务方案</h3>
          <div class="lineSt"></div>
          <div class="top_1">
            <table class="top_2">
              <tr style="height:40px;">
                <td style="width:10%;">服务方案:</td>
                <td style="width:40%;">{{ basicInf.abc_ex175 }}</td>
                <td style="width:10%;"></td>
                <td style="width:40%;"></td>
              </tr>

              <tr style="height:40px;">
                <td style="width:10%;">社工:</td>
                <td style="width:40%;">{{ basicInf.abc_ex176 }}</td>
                <td style="width:10%;">社工签字时间:</td>
                <td style="width:40%;">{{ basicInf.abc_ex177 }}</td>
              </tr>
              <tr style="height:40px;">
                <td style="width:10%;">村（居）:</td>
                <td style="width:40%;">{{ basicInf.abc_ex178 }}</td>
                <td style="width:10%;">签字/盖章时间:</td>
                <td style="width:40%;">{{ basicInf.abc_ex179 }}</td>
              </tr>
              <tr style="height:40px;">
                <td style="width:10%;">镇（街道）民政科:</td>
                <td style="width:40%;">{{ basicInf.abc_ex180 }}</td>
                <td style="width:10%;">签字/盖章时间:</td>
                <td style="width:40%;">{{ basicInf.abc_ex181 }}</td>
              </tr>
              <tr style="height:40px;">
                <td style="width:10%;">服务方案内容:</td>
                <td colspan="3">{{ basicInf.abc_ex182 }}</td>
              </tr>
            </table>
          </div>
          <!-- 不能删除的 -->
          <div id="recordt"></div>
        </el-form>
      </div>
      <div class="ainfo2">
        <div style="margin-left:20px;text-align:center;border-bottom:1px solid #ddd;padding-bottom:10px;">
          <!-- <el-button type="primary" size="small" @click="save">保存</el-button> -->
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
  name: "KjetFwbzListView",
  data() {
    return {
      loading: false,
      isShow1: false,
      isShow2: true,
      isShow3: true,
      basicInf: {},
      sId: "",
      cId: "",
      type: ""
    }
  },
  created() {
    this.loadData();
  },
  mounted() {
    // 滚动鼠标右侧导航栏跟随滚动位置改变而改变显示
    window.addEventListener('scroll', this.scroll, true)
  },
  methods: {
    closeView() {
      this.$emit("closes", false);
      this.$router.go(-1);
      if (process.env.NODE_ENV != "development") {
        this.$router.go(-1);
      }
    },
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
      // 在新增dialog打开时不执行后面的程序
      if (!oDiv1 || !oDiv2 || !oDiv3) {
        return ''
      }
      if (recordtClientHeight + oDiv3.clientHeight < clientHeight && scrollTop > (oDiv3.offsetTop - oDiv1.offsetTop - clientHeight + recordtClientHeight + oDiv3.clientHeight)) {
        console.log('触发了3-1')
        this.isShow(3)
      } else if (scrollTop > (oDiv3.offsetTop - oDiv1.offsetTop)) {
        console.log('触发了3-2')
        this.isShow(3)
      } else if (scrollTop > (oDiv2.offsetTop - oDiv1.offsetTop)) {
        console.log('触发了2')
        this.isShow(2)
      } else if (scrollTop > (oDiv1.offsetTop - oDiv1.offsetTop)) {
        console.log('触发了1')
        this.isShow(1)
      }
    },
    counter(id) { //counter1是绑定的点击事件名称
      document.querySelector(id).scrollIntoView(true);
      // const returnEle = document.querySelector("#page8"); //productId是将要跳转区域的id
      // if (!!returnEle) {
      // 	returnEle.scrollIntoView(true); // true 是默认的
      // }
      // document.querySelector("counter1").scrollIntoView(true); //这里的counter1是将要返回地方的id
    },
    loadData() {
      this.sId = this.$route.query.sId;
      this.cId = this.$route.query.cId;
      this.type = this.$route.query.type;
      this.getData({
        sId: this.sId,
        type: this.type
      }).then(res => {
        // this.basicInf = res[0]
      }).catch(res => {
        // this.$emit("closes", false)
        if (typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200) {
          console.log('请求失败了-----------------------')
          this.$message.error('数据获取失败或请求超时')
          // this.$emit("closes", false)
          // this.$router.go(-1)
          this.closeView();
          return false
        }
        this.basicInf = res.response.data[0]
      })
    },
    getData(sid) {
      return request({
        headers: {
          'Accept': 'application/json',
        },
        url: '/social/assistance/getChildrenBasicsFwfa',
        method: 'post',
        // data:{
        // sId:"57943",
        // },
        data: sid
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

.lineSt {
  background-color: #dcdfe6;
  height: 1px;
  width: 100%;
  margin-bottom: 10px;
}

.top_2 {
  width: 100%;
}

.top_1 {
  margin-bottom: 50px;
}

.imgSt {
  width: 140px;
  margin-top: -4%;
  z-index: 10000;
  transform: rotate(30deg);
  -ms-transform: rotate(30deg);
  /* IE 9 */
}

.line_blue {
  border-left: 2px solid #3385FF;
}

.family {
  width: 90%;
  margin-top: 20px;
  margin-left: 5%;
  margin-bottom: 50px;
}

.top_3 {
  width: 50%;
  float: left;
}

.top_4 {
  height: 200px;
  margin-top: 40px;
  margin-bottom: -30px;
}

.demo-image__preview {
  height: 200px;
  width: 200px;
  float: left;
  margin-left: 5%;
  overflow: hidden;
  margin-top: 15px;
}

.info2 {
  flex: 1;
  padding-right: 10px;
  box-sizing: border-box;
  border-right: 1px solid #ddd;
  overflow: auto
}

.ainfo2 {
  width: 240px;
  font-size: 14px;
  line-height: 20px;
  text-align: left;
  padding-left: 10px;
  box-sizing: border-box;
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


.btn button {
  padding: 2px 6px;
  background: #ffffff;
  border: 1px solid #606266;
}

.btn :nth-child(1) {
  margin-right: 5px;
  background: blue;
  color: #ffffff;
  border: 1px solid blue;

}
</style>

<template>
  <div style="background: #0061cc;">
    <div class="crole-wrap"
         id="crole">
      <div style="height: 100px;">
        <span class="choose-person"
              @click="goPersonCenter"
              title="进入个人中心">个人中心</span>
      </div>

      <div class="center">
        <p class="crole-title">
          <span class="middle-text">选择岗位</span>
        </p>
        <el-radio-group v-model="radio"
                        :loading="isLoading">
          <div v-for="(item,index) in chars"
               :key="index"
               class="crole-radios"
               :label="item.chart.charId"
               :class="{active:item.chart.charId==radio && item.chart.status==11}"
               @dblclick="dbTab(item)">
            <!-- <img src="" alt=""> -->
            <i class="icon"
               v-show="item.chart.status!=11">
              <icon-svg name="lock"
                        class="lock-icon"></icon-svg>
            </i>
            <span class="role-pic"
                  @click="singleTab(item.chart.charId)"
                  v-if="item.chart.status==11"></span>
            <span class="role-pic cursor-forbid"
                  v-else="item.chart.status!=11"></span>
            <el-radio :key="index"
                      :label="item.chart.charId"
                      :disabled="item.chart.status!=11">{{item.chart.charName}}<br>{{item.organ.organName}}</el-radio>

          </div>
        </el-radio-group>
        <el-button-group>
          <el-button class="chooseBtn"
                     :loading="isLoading"
                     :disabled="cantChoose"
                     @click="choose()">确定选择</el-button>
          <el-button class="backLoginPage"
                     @click="doLoginout">返回</el-button>
        </el-button-group>

      </div>
    </div>

  </div>
</template>
<script>
import { clearLoginInfo,getUUID} from '@/utils'
import { switchCharactor,logout } from "../api/system/login";
import requestConst from '@/utils/request-const'
export default {
  data () {
    return {
      chars: [],
      radio: 0,
      isLoading: false,
      cantChoose: false
    }
  },
  created () {
    // this.computedH();
  },
  mounted: function () {
    this.chars = JSON.parse(sessionStorage.getItem('chars'))
    if (this.chars.length) {
      this.radio = this.chars[0].charId
    } else {
      this.cantChoose = true
    }
    this.computedH()
  },
  updated () {
    this.computedH()
  },
  methods: {
    choose () {
      this.isLoading = true
      let formData= { 'chartId':this.radio}
      var _this = this;
      switchCharactor(formData).then(res =>{
       sessionStorage.setItem(requestConst.headers.sesstionCsrf, getUUID())
        sessionStorage.setItem(requestConst.headers.greenChannel, res.data)
       // sessionStorage.setItem('charId', this.radio)
        _this.$router.replace({ name: 'home' })
      }).catch(error => {
          this.isLoading = false
        })

      // this.$http({
      //   url: this.$http.adornUrl('login/impersonate'),
      //   method: 'post',
      //   data: this.$http.adornData(
      //     {
      //       username: this.radio
      //     },
      //     true,
      //     'notJson'
      //   ),
      //   headers: {
      //     Accept: 'application/json',
      //     'Content-Type': 'application/x-www-form-urlencoded'
      //   }
      // })
      //   .then(res => {
      //     sessionStorage.setItem('token', res.data.data.data.token)
      //     sessionStorage.setItem('charId', this.radio)
      //     // this.$cookie.set("token", res.data.data.data.token);
      //     this.$router.replace({ name: 'home' })
      //   })
      //   .catch(error => {
      //     this.isLoading = false
      //     console.log(error)
      //     this.$message({
      //       message: error.response.data.message ? error.response.data.message : '网络异常',
      //       type: 'warning'
      //     })
      //   })
    },
    // 退出 返回登录页
    doLoginout () {
      logout().then(res =>{
        clearLoginInfo()
      })
      .catch(error => {
          clearLoginInfo()
      //   })
      // this.$http({
      //   url: this.$http.adornUrl('j_spring_security_logout'),
      //   method: 'post',
      //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      // })
      //   .then(({ data }) => {
      //     clearLoginInfo()
      //   })
      //   .catch(error => {
      //     console.log(error)
      //     this.$message({
      //       message: error.response.data.message ? error.response.data.message : '网络异常',
      //       type: 'warning'
      //     })
      //     clearLoginInfo()
        })
      if (sessionStorage.getItem('code')) {
        // 单点登录登出跳转
        window.location.href = window.SITE_CONFIG.logoutRedirectUrl
      } else {
        this.$router.replace({ name: 'login' })
      }
    },
    computedH () {
      var wHeight = document.documentElement.clientHeight
      document.getElementById('crole').style.height = wHeight + 'px'
    },
    // 单击切换
    singleTab (charid) {
      this.radio = charid
    },
    dbTab (item) {
      if (item.status !== 11) {
        return
      }
      this.radio = item.charId

       choose();

      // this.$http({
      //   url: this.$http.adornUrl('login/impersonate'),
      //   method: 'post',
      //   data: this.$http.adornData(
      //     {
      //       username: this.radio
      //     },
      //     true,
      //     'notJson'
      //   ),
      //   headers: {
      //     Accept: 'application/json',
      //     'Content-Type': 'application/x-www-form-urlencoded'
      //   }
      // })
      //   .then(res => {
      //     sessionStorage.setItem('token', res.data.data.data.token)
      //     sessionStorage.setItem('charId', this.radio)
      //     this.$router.replace({ name: 'home' })
      //   })
      //   .catch(error => {
      //     console.log(error)
      //     this.$message({
      //       message: error.response.data.message ? error.response.data.message : '网络异常',
      //       type: 'warning'
      //     })
      //   })
    },
    // 进入个人中心
    goPersonCenter () {
      this.$router.replace({ name: 'personCenter' })
    }
  }
}
</script>
<style scope lang="scss">
.crole-top {
}
.crole-wrap {
  width: 100%;
  // height: 100%;
  //padding-top: 100px;
  background: url(~@/assets/img/crole-bg.jpg) no-repeat;
  background-size: 100% 100%;
  position: relative;
  .backLoginPage {
    width: 120px;
    margin-left: 10px !important;
    background: #6bb1fa;
    color: #fff;
    border: 1px solid #6bb1fa;
    border-radius: 6px !important;
    text-align: center;
  }
  .chooseBtn {
    width: 120px;
    background: #ffa800;
    color: #fff;
    border: 1px solid #ffa800;
    border-radius: 6px !important;
    text-align: center;
  }
}
/* .choose-person {
  height: 50px;
  float: right;
  top: 20px;
  right: 20px;
  //margin-right: 10px;
  // margin-top: 20px;
} */
.center {
  //   height: 200px;
  // width: 30%;
  margin: 0 auto;
  text-align: center;
  .crole-title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    font-weight: 600;
    color: #fff;
    text-align: center;
    background: url(../assets/img/choosetitle-bg.png) center bottom no-repeat;
    .middle-text::before {
      display: inline-block;
      content: "";
      width: 20px;
      height: 20px;
      background: url(../assets/img/choosetitle-icon.png) no-repeat;
      vertical-align: middle;
    }
  }
  .el-radio-group {
    display: block;
    margin-bottom: 30px;
  }
  .el-radio {
    display: block;
    width: 100%;
    height: 40px;
  }
  .crole-radios {
    position: relative;
    display: inline-block;
    width: 210px;
    height: 230px;
    margin: 10px;
    background: #fff;
    border-radius: 6px;
    cursor: pointer;
    .icon {
      position: absolute;
      width: 30px;
      height: 30px;
      bottom: 0;
      right: 0;
      .lock-icon {
        display: inline-block;
        width: 100%;
        height: 100%;
      }
    }
    .cursor-forbid {
      cursor: not-allowed !important;
    }
    .role-pic {
      display: inline-block;
      width: 110px;
      height: 110px;
      margin-top: 30px;
      margin-bottom: 30px;
      cursor: pointer;
    }
    &:nth-child(2n + 1) .role-pic {
      background: url(../assets/img/notchooserole-icon1.png) no-repeat;
    }
    &:nth-child(2n) .role-pic {
      background: url(../assets/img/notchooserole-icon2.png) no-repeat;
    }
    &.active:nth-child(2n + 1) .role-pic {
      background: url(../assets/img/chooserole-icon1.png) no-repeat;
    }
    &.active:nth-child(2n) .role-pic {
      background: url(../assets/img/chooserole-icon2.png) no-repeat;
    }
  }
  .el-button--success {
    background-color: transparent;
    border-color: transparent;
    background: url(../assets/img/crole-btn.png) no-repeat;
    background-size: 100%;
  }
  .el-button--small,
  .el-button--small.is-round {
    // padding: 9px 40px;
    border-radius: 6px;
  }
}

.choose-person {
  text-align: right;
  float: right;
  padding-top: 10px;
  padding-right: 10px;
  color: beige;
  cursor: pointer;
  font-size: 16px;
}
</style>

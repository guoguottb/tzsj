<template>
  <div class="login">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
    >
      <h3 class="title">登录页</h3>
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          type="text"
          auto-complete="off"
          placeholder="账号"
        >
        </el-input>

        <!-- <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" /> -->
      </el-form-item>
      <el-form-item prop="userpassword">
        <el-input
          v-model="loginForm.userpassword"
          type="password"
          auto-complete="off"
          placeholder="密码"
        >
        </el-input>
      </el-form-item>

      <el-form-item style="width: 100%">
        <el-button
          :loading="loading"
          size="medium"
          type="primary"
          style="width: 100%"
          @click.native.prevent="handleLogin"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>

      <!-- <el-form-item style="width:100%;">
      <el-button :loading="loading" size="medium" type="primary" style="width:100%;" @click.native.prevent="handleSso">
        <span v-if="!loading">SSO 登 录</span>
        <span v-else>登 录 中...</span>
      </el-button>
    </el-form-item> -->
    </el-form>
    <!--  底部  -->
    <div class="el-login-footer">
      <span>Copyright © 2018-2019 ruoyi.vip All Rights Reserved.</span>
    </div>
  </div>
</template>

<script>
import { login, getCharacter, switchCharactor } from "../api/system/login";
import { getUUID } from "@/utils";
import requestConst from "@/utils/request-const";

export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "3212",
        userpassword: "3212",
      },

      loginRules: {
        username: [
          {
            required: true,
            trigger: "blur",
            message: "用户名不能为空",
          },
        ],
      },
      loading: false,
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  created() {
    //this.getCode();
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          let formData = { userId: this.loginForm.username };

          login(formData)
            .then((res) => {
              sessionStorage.setItem(
                requestConst.headers.greenChannel,
                res.data
              );
              sessionStorage.setItem(
                requestConst.headers.sesstionCsrf,
                getUUID()
              );
              getCharacter().then((res) => {
                console.log(res);
                // debugger
                if (res.data.length === 1) {
                  let charId = res.data[0].chart.charId;
                  sessionStorage.setItem("charId", charId);
                  let formData = { chartId: charId };
                  console.log(charId, "charId");
                  switchCharactor(formData)
                    .then((res) => {
                      sessionStorage.setItem(
                        requestConst.headers.sesstionCsrf,
                        getUUID()
                      );
                      sessionStorage.setItem(
                        requestConst.headers.greenChannel,
                        res.data
                      );
                      this.$router.replace({ name: "home" });
                    })
                    .catch((error) => {
                      console.log(error, "error");
                    });
                } else {
                  sessionStorage.setItem("chars", JSON.stringify(res.data));
                  this.$router.replace({
                    name: "chooseChar",
                    query: { chars: res.data },
                  });
                }
              });
            })
            .catch((error) => {
              this.loading = false;
              console.log(error);
            });
        }
      });
    },
    handleSso() {
      //浏览器访问 bsp认证中心，并指定回调的业务系统前端地址   .../sso
      window.location.href =
        "http://127.0.0.1:8080/bsp/oauth/authorize?response_type=code&scope=trust&client_id=ruoyi&state=ruoyi&redirect_uri=http%3a%2f%2f127.0.0.1%3a9600%2fsso";
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  // background-image: url("../assets/image/login-background.jpg");
  background-size: cover;
  .title {
    margin: 0 auto 30px;
    text-align: center;
    color: #707070;
  }
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px;
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
</style>

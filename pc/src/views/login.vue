<template>
  <div class="login">
    <div class="mengban"></div>

    <div class="login_box">

      <div class="left">
        <div class="left_content">
          <!-- <div class="logo">logo</div> -->
          <!-- <el-image style="width: 100px; height: 100px" src="@/assets/img/logo/png" :fit="fit"></el-image> -->
          <img src="@/assets/img/logo2.png"
               style="width: 55px;height: 55px;margin-bottom:10px"
               alt="">
          <div class="left_title">泰州市智慧民政登录平台</div>
        </div>
        <div class="welcome">
          welcome
        </div>
      </div>
      <div class="right">
        <el-form ref="loginForm"
                 :model="loginForm"
                 :rules="loginRules"
                 class="login-form">
          <h3 class="title">登录</h3>

          <el-form-item prop="username">
            <el-input v-model="loginForm.username"
                      type="text"
                      style="width:100%"
                      clearable
                      auto-complete="off"
                      placeholder="用户名">
              <i class="el-icon-s-custom"
                 slot="prefix"
                 style="font-size:18px"> </i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password"
                      type="password"
                      style="width:100%"
                      clearable
                      auto-complete="off"
                      placeholder="密码">
              <i class="el-icon-edit"
                 slot="prefix"
                 style="font-size:18px"> </i>
            </el-input>
          </el-form-item>
          <div class="yzm">
            <el-form-item>
              <el-input v-model="loginForm.yzm"
                        type="text"
                        style="width:95%"
                        clearable
                        auto-complete="off"
                        placeholder="请输入验证码">
              </el-input>
            </el-form-item>
            <div class="yzm_num"
                 @click="getCode"
                 readonly>{{code}}
            </div>
          </div>
          <el-form-item style="width: 100%">
            <el-button :loading="loading"
                       size="medium"
                       type="primary"
                       style="width: 100%;margin:0 auto"
                       @click.native.prevent="handleLogin">
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
      </div>

    </div>

    <!--  底部  -->

    <!-- <div class="el-login-footer">
      <span>Copyright © 2018-2019 ruoyi.vip All Rights Reserved.</span>
    </div> -->
  </div>
</template>

<script>
import { login, getCharacter, switchCharactor } from "../api/system/login";
import { getUUID } from "@/utils";
import requestConst from "@/utils/request-const";
import { exceedOldSignOutApi } from "@/api"

export default {
  name: "Login",
  data () {
    return {
      loginForm: {
        username: "3212",
        password: "3212",
        yzm: "",
      },

      loginRules: {
        username: [
          {
            required: true,
            trigger: "blur",
            message: "用户名不能为空",
          },
        ],
        password: [
          {
            required: true,
            trigger: "blur",
            message: "密码不能为空",
          },
        ],
      },
      loading: false,
      redirect: undefined,
      code: '', ////声明一个变量用于存储生成的验证码
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
  created () {
    this.getCode();
  },
  methods: {

    // 随机验证码生成
    getCode () {
      var arrays = new Array(
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
        'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
        'u', 'v', 'w', 'x', 'y', 'z',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
        'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
        'U', 'V', 'W', 'X', 'Y', 'Z'
      );
      this.code = ''; //重新初始化验证码
      //alert(arrays.length);
      //随机从数组中获取四个元素组成验证码
      for (var i = 0; i < 4; i++) {
        //随机获取一个数组的下标
        var r = parseInt(Math.random() * arrays.length);
        this.code += arrays[r];
      }
      this.code; //将验证码写入指定区域
      //  console.log(this.code);
    },

    // 登录跳转
    async handleLogin () {
      // try {
      //   const res = await this.$refs.loginForm.validate()
      //   if (res) {
      //     await exceedOldSignOutApi(this.loginForm)
      //   }
      // } catch (error) {
      //   // 登录成功
      //   if (error && error.response.data.code === 200) {
      //     sessionStorage.setItem("charName", "泰州市核对中心")
      //     sessionStorage.setItem("GREEN-CHANNEL-AUTH", "2ObtrqwrPZxefiiHTgk3RvaTpdp9KsAtEqhU3PPNnWx1WyMggUwMWe8CmRYjiHo0275bkaOg1s6Jqb9wApmM3J5mpOiaZpxPj0LW3QJt4VJHnmaS9Vx8IvAhPs6szxj0kLzPcf5khPSRYgSbTR7HI5zDB1cBW9l7ljj94cApTNqWkjV9gW46C4sgRvtjdMvQVKLK6uFMKHrAK5Yft8IZCpNpAs6LmttDL7nwuMsLqOrQQW2Itxz0GHXVcfr0HFABnDFj8njGeX.LU85mcVmPFTIwMaVrjscSv2mqWVpCgdyeWvItECurJI")
      //     sessionStorage.setItem("charId", "char_321200000000")
      //     sessionStorage.setItem("token", "253f5da3-a607-48d1-8ae2-0c6720bebe8a")
      //     this.$message.success(error.response.data.msg)
      //     return this.$router.push("/home")
      //   }
      //   this.$message.error(error.response.data.msg)
      // }
      // return
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
                console.log(res, '222');
                // debugger
                if (res.data.length === 1) {
                  let charId = res.data[0].chart.charId;
                  let charName = res.data[0].chart.charName;

                  sessionStorage.setItem("charId", charId);
                  sessionStorage.setItem("charName", charName);

                  let formData = { chartId: charId };
                  console.log(charId, "charId");
                  console.log(charName, "charName");

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
                      // this.$router.replace({ name: "Home2" });

                    }).catch((error) => {
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

            }).catch((error) => {
              // console.log(res);
              this.loading = false;
              console.log(error, '111');

            });
        }
      });
    },
    handleSso () {
      //浏览器访问 bsp认证中心，并指定回调的业务系统前端地址   .../sso
      window.location.href =
        "http://127.0.0.1:8080/bsp/oauth/authorize?response_type=code&scope=trust&client_id=ruoyi&state=ruoyi&redirect_uri=http%3a%2f%2f127.0.0.1%3a9600%2fsso";
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
.login {
  // display: flex;
  // justify-content: center;
  // align-items: center;
  height: 100%;
  background-image: url("../assets/loginbg33.jpg");
  // background-image: url("../assets/login.jpg");
  background-size: cover;
  .title {
    margin: 0 auto 30px;
    text-align: center;
    font-size: 20px;
    // margin-bottom: 38px;
    letter-spacing: 10px;
    color: #333;
    font-weight: 500;
    // font:  微软雅黑, "Microsoft Yahei", "Helvetica Neue", "Hiragino Sans GB", 宋体, simsun, 黑体, Arial, sans-serif;
  }
}
.mengban {
  float: left;
  // position: relative;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);
}
.login-form {
  // border-radius: 6px;
  background: #ffffff;
  width: 400px;
  height: 100%;
  padding: 40px 60px 40px;

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

.login_box {
  width: 750px;
  height: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  border-radius: 3px;
  overflow: hidden;
  box-shadow: 1px 1px 5px (rgb(210, 233, 255));
}

.left {
  width: 350px;
  height: 100%;
  color: #fff;
  position: relative;
  text-align: center;
  background-color: #66b0ffcb;
  background-image: linear-gradient(to left, rgba(255, 0, 0, 0), #4ca1fcf6);
}

.yzm {
  display: flex;
  flex: row;
  justify-content: space-between;
}

.yzm_num {
  display: inline-block;
  width: 40%;
  height: 35px;
  background-color: rgb(197, 214, 228);
  font-size: 18px;
  text-align: center;
  letter-spacing: 5px;
  cursor: pointer;
}
.left_content {
  margin-top: 12%;
  font-size: 20px;
  letter-spacing: 5px;
  //  font-family:'宋体';
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}
.welcome {
  text-align: center;
  margin: 0 auto;
  font-family: "Times New Roman", Times, serif;
  margin-top: 50%;
  font-size: 20px;
  letter-spacing: 2px;
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}

// .login-code {
//     width: 33%;
//     height: 38px;
//     float: right;
//     img {
//         cursor: pointer;
//         vertical-align: middle;
//     }
// }

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
.el-input__prefix {
  left: 5px;
  margin: 0 3px;
  font-size: 18px;
  display: inline-block;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
}
</style>
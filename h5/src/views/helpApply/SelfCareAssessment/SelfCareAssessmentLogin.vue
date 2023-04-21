// 自理评估第三放机构登录
<template>
  <div class="login">
    <header>
      <div>
        <div class="headerFont">
          <img src="@/assets/ysjylogo.png"
               class="headerImg">
          <span style="font-size:25px;display:block;margin-top:10px;letter-spacing: 4px">泰州智慧民政社会救助</span>
          <span style="font-size:20px;display:block;margin-top:10px;letter-spacing: 4px">评估机构登录</span>
        </div>

      </div>
    </header>
    <el-form ref="loginForm"
             :show-message='false'
             :model="loginForm"
             :rules="loginRules"
             class="login-form">
      <!-- <div class="headerFont">
				<span style="font-size:30px;vertical-align: super;text-shadow: 1px 3px 5px #3bb9a4;">泰州二期演示</span>
				<img src="../assets/ysjylogo.png" class="headerImg">
			</div> -->
      <el-form-item prop="username">
        <el-input class="loginInput"
                  v-model="loginForm.username"
                  type="text"
                  auto-complete="off"
                  placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input class="loginPassword"
                  type="password"
                  v-model="loginForm.password"
                  auto-complete="off"
                  placeholder="请输入密码"
                  @paste.native.capture.prevent="handlePaste"></el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button class="loginPassword"
                   :loading="loading"
                   size="medium"
                   type="primary"
                   @click.native.prevent="handleLogin">
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
    </el-form>
    <footer>
      <span style="color:#fff">所属单位：泰州市民政局 联系电话：0523-86198830</span>
    </footer>
  </div>
</template>

<script>

// import {Decrypt,Encrypt} from '@/utils/AES.js'
import request from '@/utils/request.js'
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        // username: '321200000000',
        // password: '123',
        username: localStorage.getItem('username'),
        password: localStorage.getItem('password'),
      },
      loginRules: {
        username: [{
          required: true,
          trigger: "blur",
          message: "用户名不能为空"
        }],
        password: [{
          required: true,
          trigger: "blur",
          message: "密码不能为空"
        }]
      },
      loading: false,
    }
  },
  watch: {},
  methods: {
    handleLogin () {

      // var a = Encrypt('登录')
      // var b = Decrypt(a)
      // console.log(a)
      // console.log(b)
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          request({
            method: 'post',
            // url: '/social/login',
            url: '/social/assistanceWeixin/login',
            data: {
              username: this.loginForm.username,
              password: this.loginForm.password,
              module: '特困自理能力评估'
            },
          }).then(res => {

            this.loading = false
            // 如果没有 router没有 redirect，跳转到主页，主要针对直接进入login页面登录跳转不了
            if (res[0].status == 'ok') {
              sessionStorage.setItem('token1', res[0].token)
              localStorage.setItem('username', this.loginForm.username)
              localStorage.setItem('password', this.loginForm.password)
              // 跳转到自理评估列表页
              this.$router.push({
                path: "/SelfCareAssessmentList"
              })
              /*
              if(!this.$route.query.redirect){
                this.$router.push({
                  path:'/'
                })
              }else{
                this.$router.push({
                  path:this.$route.query.redirect
                })
              }*/
            } else {
              this.$alert('账号或密码错误')
            }
          }).catch(error => {
            this.loading = false
            console.log(error)
          })
        } else {
          this.$toast.fail('请输入账号或密码')
        }
      });
    },
  }
}
</script>

<style scoped>
.login {
  /* background-size: 100% 100%; */
  /* background: url(../assets/img/bg/bg1.png) right bottom no-repeat / 650px,
			url(../assets/img/bg/bg2.png) 0px 0px no-repeat rgba(22, 121, 190, 1) / 500px 580px; */
  /* background: url(../assets/img/bg/bg1.png) 0 0 no-repeat,url(../assets/img/bg/bg2.png) 0 600px no-repeat;
		background-size: 100% 500px,100% 100%; */
  background-color: #447bca;
  width: 100%;
  height: 100%;
  position: fixed;
}
/* .login-form{
		margin-top: 100px;
	} */

header {
  /* width: 700px;
		text-align: left;
		margin-left: 40px;
		margin-top: 40px; */
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 6rem;
  /* top: -50px; */
  margin: 0 auto;

  overflow: hidden;
}
header > div {
  background-color: #fff;
  width: 150%;
  height: 6.6rem;
  position: absolute;
  top: -1rem;
  border-radius: 50%;
}
.headerFont {
  text-align: center;
  font-size: 34px;
  color: #414141;
  position: absolute;
  top: 53%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.title {
  color: white;
  font-size: 32px;
  font-weight: 600;
}
.loginImg {
  width: 98px;
  height: 98px;
  border-radius: 50%;
}
.loginInput {
  width: 400px;
  margin-top: 100px;
}
.loginPassword {
  width: 400px;
}
/* 9.15新增 */
.headerImg {
  width: 150px;
  height: 150px;
  border-radius: 50%;
}
.headerImg2 {
  width: 100%;
  height: 1px;
}
footer {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 20px;
  font-size: 0.2rem;
}
</style>

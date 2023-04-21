<template>
  <div/>
</template>

<script>
  import {getQueryString} from '@/utils'
  import Cookies from "js-cookie";

  export default {
    name: 'sso',
    data() {
      return {
        loginForm: {
          username: "admina",
          password: "admin123",
          rememberMe: false,
          ssoCode: "",
          code: "",
          uuid: ""
        }
      };
    },
    created() {
      Cookies.remove('Admin-Token')
      const url = window.location.href.replace('#/authredirect', '')
      //获取回调后的得到的授权码
      this.loginForm.ssoCode = getQueryString(url, 'code')
      //拿着授权码访问业务系统
      this.$store.dispatch("Login", this.loginForm)
        .then(() => {this.$router.push({path: this.redirect || "/"});})
    }
  }
</script>

<style>
</style>

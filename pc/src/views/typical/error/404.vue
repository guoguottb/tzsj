<template>
  <div id="four-zero-four-con" class="error-con-wrapper">
    <div class="error-con">
      <div class="image-con">
        <img src="@/assets/img/image-404.png">
      </div>
      <div class="text-con">
        <h1>404</h1>
        <p>抱歉，您访问的页面不存在</p>
        <el-button @click="goBack" type="primary">后退一页</el-button>
        <el-button @click="pushToIndex">返回首页</el-button>
      </div>
      <div class="clearfix"></div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    pushToIndex() {
      this.$router.push('/')
    },
    goBack() {
      this.$router.back()
    }
  },
}
</script>
<style lang="scss" src="./index.scss" scoped></style>
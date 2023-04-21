<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  margin: 0;
  padding: 0;
  padding-right: 0 !important;
}
/* 弹出确认框 */
.el-message-box {
  width: 100% !important;
  margin-top: 50%;
}
.el-checkbox__label {
  font-size: 40px !important;
}
.el-checkbox__inner {
  width: 40px !important;
  height: 40px !important;
}
.el-checkbox__inner::after {
  height: 20px !important;
  left: 12px !important;
}

.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
}
.page6Div3 {
  width: 90%;
  margin-left: 2%;
  height: 400px;
  font-size: 28px;
  color: #545454;
  padding: 0 20px 0 20px;
  margin-top: 10px;
  border-radius: 15px;
  border: #aaa solid 1px;
}

.page6Div3Font {
  height: 80px;
  line-height: 80px;
}
.page4Img2Div {
  margin-top: 10px;
}

.page6Div3Img {
  width: 40%;
  height: 400px;
  text-align: center;
  float: left;
  margin-left: 20px;
}

.page6Div5 {
  overflow: auto;
  text-align: left;
  margin-left: 2%;
  width: 90%;
  height: 500px;
  font-size: 28px;
  color: #545454;
  padding: 0 20px 0 20px;
  border-radius: 30px;
  border: #aaa solid 1px;
}

.page4Img2Font {
  height: 80px;
  line-height: 80px;
  font-size: 28px;
}
</style>

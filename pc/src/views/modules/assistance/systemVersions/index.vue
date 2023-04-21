<!-- 系统版本模块 -->
<template>
  <div>
    <!-- <commonList sKey="596"></commonList> -->
    <el-card class="box-card">
      <div slot="header"
           class="clearfix">
        <span>卡片名称</span>
      </div>
    </el-card>
  </div>
</template>

<script>
import commonList from "@/views/modules/assistance/commonList"
export default {
  data () {
    return {}
  },
  created () {

  },
  methods: {

  },
  components: {
    commonList
  }
}
</script>

<style scoped lang='less'>
.box-card {
  height: 720px;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>

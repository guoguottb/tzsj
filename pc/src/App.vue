<template>
  <div id="app">
    <router-view></router-view>
  </div>

  <!-- <template slot-scope="{row}">
    <p :title="row.id"
       class="ellipsis">{{row.id}}</p>
  </template> -->
</template>
<script>
</script>
<style lang="less">
@import "./assets/css/main.css";
@import "./assets/css/color-dark.css";

/* table 行中数据单行溢出省略号隐藏*/
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
}
/deep/el-table {
  text-align: center !important;
  th {
    text-align: center !important;
  }
  td {
    text-align: center !important;
  }
}
/* 该样式解决150上table th td 对照不齐问题，哪个页面有问题则将下方样式放入该页面中 */
/deep/.has-gutter th {
  text-align: center !important;
}
/deep/ .el-table__row td {
  text-align: center !important;
}
</style>
<template>
  <div>
    <commonList sKey="578"
                :type="`残疾人补贴变更`"
                :tableName="`残疾人补贴变更`"></commonList>
  </div>
</template>

<script>
import commonList from "../../commonList"
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
.pageTitle {
  border-left: 2px solid #3385ff;
  padding-left: 16px;
  border-bottom: 1px solid #dcdfe6;
  margin-bottom: 6px;
}
/deep/ .el-descriptions--small {
  font-size: 14px;
  color: black;
}
/deep/ .leftFather {
  padding-right: 6px;
  height: 75vh !important;
  overflow: hidden;
  overflow-y: scroll;
  border-right: 1px solid #dcdfe6;
  .el-descriptions-row {
    td {
      line-height: 30px;
    }
    height: 30px;
  }

  .el-select.el-select--small {
    width: 100%;
  }

  .el-col {
    margin: 4px 0;
  }

  .el-input input {
    height: 36px;
  }
  .el-date-editor--date {
    width: 100%;
  }
  .el-cascader--large {
    width: 100%;
  }
  .clearfix {
    display: flex;
    justify-content: space-around;
  }
}

.right-ui {
  padding: 20px 0 0 60px;
}
#page1 {
  position: relative;
  .no1img {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 2;
    transform: rotate(30deg);
    margin: 4% 4% 0 0;
    img {
      width: 140px;
    }
  }
}
</style>

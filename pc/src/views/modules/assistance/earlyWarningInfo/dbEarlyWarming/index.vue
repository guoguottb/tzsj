<template>
  <div>
      
      <!-- card主体部分 -->
      <el-card class="mainCard">
        <el-row>
          <el-col :span="4" v-for="(item,index) in warningText" :key="index" @click.native="showDialog(item.sKey)">
            <div class="warningImg">
             <img :src="warningImg" :alt="item.warningTitle" :title="item.warningTitle">
            </div>
            <p class="warningInfoText">{{item.warningTitle}}</p>
          </el-col>
        </el-row>
      </el-card>
      <!-- dialog -->
      <el-dialog title="城乡低保预警"  :visible.sync="dialogVisible"  width="64%" top="1vh">
        <commonList v-if="dialogVisible" :sKey="sKey" :type="`业务办理预警`" :tableName="`城乡低保预警`"></commonList>
      </el-dialog>
  </div>
</template>

<script>
import commonList from "../../commonList"
import warningImg from "@/assets/img/yj1.8096bba3.png"
export default {
  data() {
    return {
      warningImg, // 灯图片
      warningText:[
        {
          warningTitle:"受理超时预警",
          sKey:522,
        },
        {
          warningTitle:"核查超时预警",
          sKey:523,
        },
        {
          warningTitle:"公示超时预警",
          sKey:524,
        },
        {
          warningTitle:"个性化预警",
          sKey:525,
        },
        {
          warningTitle:"基本保障重复预警",
          sKey:526,
        },
        {
          warningTitle:"残疾等级变动预警",
          sKey:527,
        },
        {
          warningTitle:"死亡信息预警",
          sKey:528,
        },
        {
          warningTitle:"满18岁增发预警",
          sKey:529,
        },
        {
          warningTitle:"满60岁未增发预警",
          sKey:530,
        },
        {
          warningTitle:"残疾人享受增发预警",
          sKey:531,
        }],
      dialogVisible: false,
      sKey:null,
    }
  },
  components:{
    commonList,
  },
  created() {
  },
  methods: {
    showDialog(val){
      this.sKey = val
      this.dialogVisible = true
    },
  },
}
</script>

<style scoped lang='less'>
::v-deep .mainCard {
  min-height: 600px;
  .warningImg {
    text-align: center;
    img {
      width: 220px;
      height: 220px;
    }
  }
  .warningInfoText {
    text-align: center;
  }
  ::v-deep .dialogBox {
    .el-dialog__header {
      padding: 0 !important;
    }
    
  .el-dialog__body {
    padding: 0 !important;
  }
  }
}
</style>

<template>
  <div>
    <!-- card主体部分 -->
    <el-card class="mainCard">
      <el-row>
        <el-col :span="4"
                v-for="(item,index) in warningText"
                :key="index"
                @click.native="showDialog(item.sKey)">
          <div class="warningImg">
            <img :src="warningImg"
                 :alt="item.warningTitle"
                 :title="item.warningTitle">
          </div>
          <p class="warningInfoText">{{item.warningTitle}}</p>
        </el-col>
      </el-row>
    </el-card>
    <!-- dialog -->
    <el-dialog title="特困供养预警"
               :visible.sync="dialogVisible"
               width="64%">
      <commonList v-if="dialogVisible"
                  :sKey="sKey"
                  :type="`特困供养预警`"
                  :tableName="`特困供养预警`"></commonList>
    </el-dialog>
  </div>
</template>

<script>
import commonList from "../../commonList"
import warningImg from "@/assets/img/yj1.8096bba3.png"
export default {
  data () {
    return {
      warningImg, // 灯图片
      warningText: [
        {
          warningTitle: "受理超时预警",
          sKey: "532"
        },
        {
          warningTitle: "核查超时预警",
          sKey: "533"
        },
        {
          warningTitle: "公示超时预警",
          sKey: "534"
        },
        {
          warningTitle: "个性化预警",
          sKey: "535"
        },
        {
          warningTitle: "基本保障重复预警",
          sKey: "536"
        },
        {
          warningTitle: "死亡信息预警",
          sKey: "537"
        },
      ],
      dialogVisible: false,
      sKey: null,
    }
  },
  components: {
    commonList,
  },
  created () {

  },
  methods: {
    showDialog (val) {
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
}
</style>

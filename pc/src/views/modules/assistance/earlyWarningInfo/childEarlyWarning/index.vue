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
    <el-dialog title="困境儿童预警"
               :visible.sync="dialogVisible"
               width="64%">
      <commonList :sKey="sKey"
                  v-if="dialogVisible"
                  :type="`困境儿童预警`"
                  :tableName="`困境儿童预警`"></commonList>
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
          sKey: 548,
        },
        {
          warningTitle: "核查超时预警",
          sKey: 549,
        },
        {
          warningTitle: "公示超时预警",
          sKey: 550,
        },
        {
          warningTitle: "个性化预警",
          sKey: 551,
        },
        {
          warningTitle: "满18岁预警",
          sKey: 552,
        },
        {
          warningTitle: "高额医疗费预警",
          sKey: 553,
        },
        {
          warningTitle: "新增贫困家庭儿童预警",
          sKey: 554,
        },
        {
          warningTitle: "核减残疾补贴儿童预警",
          sKey: 555,
        },
        {
          warningTitle: "核减贫困家庭儿童预警",
          sKey: 556,
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
    console.dir(this.warningImg)
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

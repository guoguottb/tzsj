<template>
  <div class="g-box">
    <!-- <el-image>

        </el-image> -->
    <!-- <el-image 
          style="dispaly:black;width:99%; text-align:center"
               :z-index="2015"
          :src="this.imgArr" :preview-src-list="[this.imgURl]">
        </el-image> -->
    <!-- <img :src="imgArr"  /> -->

    <div>
      <div style="marginBottom:30px">
        <el-button type="primary">生成月度报告</el-button>
        <el-button type="primary">上传月度报告</el-button>
      </div>
      <el-tabs type="border-card"
               :value="activeName"
               @tab-click="handleClick">
        <el-tab-pane v-for="item in monthlyMagazineArr"
                     :key="item.path"
                     :name="item.path"
                     :label="item.month"></el-tab-pane>
      </el-tabs>
    </div>
    <div v-loading="loading">
      <iframe :src="imgArr"
              style="width: 100%; height: 70vh"
              id="iframe1"
              padding="0"
              frameborder="no"
              border="0"
              marginwidth="0"
              marginheight="0"></iframe>
    </div>

  </div>
</template>

<script>
import request from "@/utils/request";   //后端接口调用封装
import {
  getMonthlyMagazineApi,  // 获取月报
  showPDFApi,   // 展示月度报告
} from "@/api/dataCentre"
export default {
  name: 'ydbg', //月度报告
  data () {
    return {
      imgArr: '',
      index: 0,
      loading: true,
      src: '',
      activeName: "",
      monthlyMagazineArr: []
    }

  },

  created () {
    this.getMonthlyMagazine()
    this.getImg()
  },

  methods: {

    //切换标签 
    handleClick (tab, event) {
      // return console.log(event)
      this.showPDF(tab.name);
    },
    // 获取月报
    async getMonthlyMagazine () {
      try {
        await getMonthlyMagazineApi()
      } catch (error) {
        if (error && error.response.data.status === "+OK") {
          this.monthlyMagazineArr = error.response.data.data
          this.activeName = this.monthlyMagazineArr[0].month
          return this.showPDF(this.monthlyMagazineArr[0].path)
        }
        return this.$message.error("获取月度报告失败")
      }
    },
    // 请求pdf
    async showPDF (key) {
      try {
        this.loading = true;
        const res = await showPDFApi(key)
        this.src = "data:image/png;base64," + res;
      } catch (error) {
        return console.log(error, "showPDF")
        this.imgArr = "data:application/pdf;base64," + res.response.data;
      } finally {
        this.loading = false
      }
      // if (!this.monthlyMagazineArr.length) return
      // key = this.monthlyMagazineArr[0].path
      // // /social/minios/showPDF?filename=ydbg1.pdf
      // // /social/minios/showPDF?filename=ydbg2.pdf

      // this.loading = true;
      // request({
      //   headers: {
      //     Accept: "application/json",
      //   },
      //   url: '/social/minios/showPDF?filename=' + key,
      //   method: "post",
      //   data: {},
      // }).then((res) => {

      //   this.loading = false;
      //   this.src = "data:image/png;base64," + res;

      // }).catch((res) => {

      //   this.imgArr = "data:application/pdf;base64," + res.response.data;
      //   // this.imgURl = "data:image/png;base64," + res.response.data;

      //   this.loading = false; //关闭加载动画
      // });
    }

  }
}
</script>

<style>
</style>
<template>
  <div class="g-box">
    <div>132132</div>
    <!-- <el-image>

        </el-image> -->
    <!-- <el-image 
          style="dispaly:black;width:99%; text-align:center"
               :z-index="2015"
          :src="this.imgArr" :preview-src-list="[this.imgURl]">
        </el-image> -->
    <!-- <img :src="imgArr"  /> -->

    <div>
      <el-tabs type="border-card"
               v-model="activeName"
               @tab-click="handleClick">
        <el-tab-pane name="first"
                     label="2022年9月"></el-tab-pane>
        <el-tab-pane name="second"
                     label="2022年10月"></el-tab-pane>
        <el-tab-pane name="third"
                     label="2022年11月"></el-tab-pane>
        <el-tab-pane name="fourth"
                     label="2022年12月"></el-tab-pane>
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
import { getPdfFileApi } from "@/api/dataCentre"
export default {
  name: 'ydbg', //月度报告
  data () {
    return {
      imgArr: '',
      index: 0,
      loading: true,
      src: '',
      activeName: 'first'
    }

  },

  created () {
    this.getImg()
  },

  methods: {

    //切换标签 
    handleClick (tab, event) {
      console.log(tab.name,);

      this.getImg(tab.name);
    },


    // 请求pdf
    getImg (key) {

      let filename = '';

      if (!key || key == 'first') {
        filename = 'ydbg1.pdf'
      } else {
        filename = 'ydbg2.pdf'
      }

      // /social/minios/showPDF?filename=ydbg1.pdf
      // /social/minios/showPDF?filename=ydbg2.pdf

      this.loading = true;
      request({
        headers: {
          Accept: "application/json",
        },
        url: '/social/minios/showPDF?filename=' + filename,
        method: "post",
        data: {},
      }).then((res) => {

        this.loading = false;
        this.src = "data:image/png;base64," + res;

      }).catch((res) => {

        this.imgArr = "data:application/pdf;base64," + res.response.data;
        // this.imgURl = "data:image/png;base64," + res.response.data;

        this.loading = false; //关闭加载动画
        console.log(res, 'res');
        console.log(this.src, 'this.src');
      });
    }

  }
}
</script>

<style>
</style>
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
      <el-form :inline="true"
               :model="formInline"
               class="demo-form-inline">
        <el-form-item label="月报时间">
          <el-date-picker v-model="formInline.PDFdata"
                          type="date"
                          placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="月报期数">
          <el-select v-model="formInline.phase"
                     placeholder="请选择月报期数">
            <el-option v-for="item in (monthlyMagazineArr.length+1)"
                       :key="item"
                       :label="`第 ${item} 期`"
                       :value="`第 ${item} 期`"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary"
                     :loading="createPDFLoading"
                     :disabled="createButton"
                     @click="createPDF">生成月度报告</el-button>
          <el-button type="primary"
                     @click="downloadPDF">下载月度报告</el-button>
        </el-form-item>
      </el-form>
      <el-tabs type="border-card"
               v-model="activeName"
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
    <Qkdcbg v-if="qkdcbgShow"
            :isShow="qkdcbgShow"
            :limit="1"
            :data="qkdcbgForm"
            :uploadType="`月度报告`"
            @savePDF="savePDF"
            @function="qkdcbgShowView"></Qkdcbg>
  </div>
</template>

<script>
import dayjs from "dayjs"
import Qkdcbg from '@/views/modules/assistance/components/Qkdcbg.vue' //情况调查报告组件 
import {
  getMonthlyMagazineApi,  // 获取月报
  showPDFApi,   // 展示月度报告
  generateMonthlyMagazineApi,   // 生成月报
  uploadingMonthlyMagazineApi,   // 上传月报
  downloadMonthlyReportFileApi,   // 下载月度报告
} from "@/api/dataCentre"
export default {
  name: 'ydbg', //月度报告
  components: {
    Qkdcbg,
  },
  data () {
    return {
      imgArr: '',
      index: 0,
      loading: true,
      src: '',
      activeName: "",
      monthlyMagazineArr: [],
      qkdcbgShow: false,  // PDF上传组件
      qkdcbgForm: {},
      formInline: {
        PDFdata: new Date(),
      },
      createPDFLoading: false,
      createButton: true
    }

  },
  created () {
    this.getMonthlyMagazine()
  },
  methods: {
    //切换标签 
    handleClick (tab, event) {
      this.showPDF(tab.name);
    },
    // 获取月报
    async getMonthlyMagazine () {
      try {
        await getMonthlyMagazineApi()
      } catch (error) {
        if (error && error.response.data.status === "+OK") {
          // 如果获取月报成功才可以生成月度报告
          this.createButton = false
          // tab数组
          this.monthlyMagazineArr = error.response.data.data
          if (this.monthlyMagazineArr.length) {
            // 默认选择第一个tab标签
            this.activeName = this.monthlyMagazineArr[0].path
            // 掉接口显示第一期PDF图片
            return this.showPDF(this.monthlyMagazineArr[0].path)
          }
          return
        }
        this.loading = false
        return this.$message.error("获取月度报告失败")
      }
    },
    // 请求pdf
    async showPDF (key) {
      try {
        this.loading = true;
        await showPDFApi(key)
      } catch (error) {
        if (error && error.response.statusText === "OK") return this.imgArr = "data:application/pdf;base64," + error.response.data;
        this.$message.error("获取PDF图片失败")
      } finally {
        this.loading = false
      }
    },
    // 同上-上传情况调查报告
    qkdcbgShowView (param1, param2) {
      this.qkdcbgShow = false
      console.log(param1, param2, '上传情况调查报告子组件传值');
    },
    // 生成PDF
    createPDF () {
      if (!this.formInline.PDFdata) return this.$message.warning("请选择月报时间")
      let date = dayjs(this.formInline.PDFdata).format('YYYY-MM-DD')
      this.generateMonthlyMagazine({
        date,
      })
    },
    // 上传PDF
    uploadPDF () {
      if (!this.formInline.PDFdata) return this.$message.warning("请选择月报时间")
      this.qkdcbgShow = true

    },
    // 生成月报
    async generateMonthlyMagazine (data) {
      try {
        this.createPDFLoading = true
        await generateMonthlyMagazineApi(data)
      } catch (error) {
        if (error && error.response.data.status === "+OK") return this.$message.success(error.response.data.msg)
        this.$message.error(error.response.data.msg)
      } finally {
        this.createPDFLoading = false
      }
    },
    // 上传月报
    async uploadingMonthlyMagazine (data) {
      try {
        await uploadingMonthlyMagazineApi(data)
      } catch (error) {
        // 成功则提示
        if (error && error.response.data.status === "+OK") {
          this.$message.success(error.response.data.msg)
          return this.getMonthlyMagazine()
        }
        // else 失败提示
        this.$message.error(error.response.data.msg)
      } finally {
        this.qkdcbgShow = false
      }
    },
    savePDF (val) {
      let month = dayjs(this.formInline.PDFdata).format('YYYY-MM-') + "01"
      this.uploadingMonthlyMagazine({
        month,
        path: val
      })
    },
    // 下载月度报告
    downloadPDF () {
      if (!this.formInline.PDFdata) return this.$message.warning("请选择下载时间")
      let date = dayjs(this.formInline.PDFdata).format("YYYY-MM-DD")
      this.downloadMonthlyReportFile(date)
    },
    async downloadMonthlyReportFile (data) {
      try {
        await downloadMonthlyReportFileApi(data)
      } catch (error) {
        if (error && error.response.data.code === 200) {
          this.savePicture("data:application/pdf;base64," + error.response.data.data, `泰州市社会救助和残疾人两项补贴工作情况月度报告${dayjs(this.formInline.PDFdata).format("YYYY年MM月")}.zip`);
          return
        }
        this.$message.error(error.response.data.msg)
      }
    },
    savePicture (base64, fileName = "下载文件（测试）.zip") {
      var arr = base64.split(",");
      var bytes = atob(arr[1]);
      let ab = new ArrayBuffer(bytes.length);
      let ia = new Uint8Array(ab);
      for (let i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
      }
      var blob = new Blob([ab], { type: "application/octet-stream" });
      var url = URL.createObjectURL(blob);
      const el = document.createElement("a");
      el.style.display = "none";
      el.setAttribute("target", "_blank");
      fileName && el.setAttribute("download", fileName);
      el.href = url;
      document.body.appendChild(el);
      el.click();
      document.body.removeChild(el);
    }
  }
}
</script>

<style>
</style>
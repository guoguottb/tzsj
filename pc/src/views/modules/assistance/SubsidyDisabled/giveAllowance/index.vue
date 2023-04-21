<template>
  <div>
    <commonList sKey="595"
                :type="`残疾人补贴发放`"
                :formItemLabel="'124px'"
                @uploadExcel="dialogVisible = true"
                :tableName="`残疾人补贴发放`"></commonList>
    <!-- excel 导入 弹框 -->
    <el-dialog title="残疾人两项补贴导入"
               :visible.sync="dialogVisible"
               width="30%"
               :before-close="handleClose">
      <!-- 下载模板 -->
      <el-button type="danger"
                 style="margin:8px"
                 :loading="downLoadLoading"
                 @click="DownLoad">下载 Excel 导入模板</el-button>
      <!-- 上传月份 -->
      <el-form>
        <el-form-item label="上传月份"
                      :rules="{ required: true, message: '请输入活动名称', trigger: 'change' }">
          <el-date-picker v-model="uploadExcelMonth"
                          type="month"
                          placeholder="选择月">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <!-- excel upload -->
      <div class="uploadDiv">
        <el-upload class="upload-demo"
                   drag
                   action="/social/assistance/disabledImport"
                   :limit="1"
                   ref="uploadExcel"
                   :headers="headers"
                   :auto-upload="false"
                   accept=".xlsx,.xls,.csv"
                   :before-upload="beforeUploadFile"
                   :file-list="fileList"
                   @submit="confirmUploadExcel"
                   multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip"
               slot="tip">只能上传xlsx(xls)和csv文件且不可超过100M</div>
        </el-upload>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary"
                   @click="confirmUploadExcel">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import commonList from "../../commonList"
// api
import { disabledImportTemplateApi } from "@/api/lifeRescue/disabilityAllowance"
export default {
  data () {
    return {
      // 请求头
      headers: {
        "X-CSRF-TOKEN": sessionStorage.getItem("token"),
      },
      dialogVisible: false,
      uploadExcelMonth: "",
      fileList: [],
      downLoadLoading: false
    }
  },
  created () {

  },
  methods: {
    // excel 导入弹框关闭前
    handleClose () {
      this.$refs.uploadExcel.clearFiles()
      this.dialogVisible = false
    },
    // 确认上传excel
    confirmUploadExcel () {
      console.log(this.fileList)
    },
    beforeUploadFile (file) {
      if (!this.uploadExcelMonth) {
        this.$message.warning("请先选择上传月份")
        return false
      }
      let extension = file.name.substring(file.name.lastIndexOf('.') + 1);
      let size = file.size / 1024 / 1024;
      if (extension !== 'xlsx' && extension !== 'xls' && extension !== 'csv') {
        this.$message.warning('只能上传后缀是.xlsx(.xls)和.csv的文件');
        return false
      }
      // 现在文件上传大小
      if (size > 100) {
        this.$message.warning('文件大小不得超过100M');
        return false
      }
    },
    // upload excel 成功回调
    handleSuccess (res, file, fileList) {
      this.uploadLoading = false
      if (res.code !== 200) return this.$message.error(res.msg)
      if (res.code === 200) {
        this.show = false
        this.tempData = []
        // 成功消息提示
        this.$message.success(res.msg);
        // 获取模块名
        let modelName = '残疾人补贴发放'
        let exportObject = JSON.parse(localStorage.getItem("exportObject_ID"))
        // 如果本地没有存储导入id对象
        if (!exportObject) {
          exportObject = {}
          exportObject[modelName] = res.data
          localStorage.setItem("exportObject_ID", JSON.stringify(exportObject))
        }
        // 如果有导入id存储
        else {
          // 给其模块的id赋值
          exportObject[modelName] = res.data
          localStorage.setItem("exportObject_ID", JSON.stringify(exportObject))
        }
      }
    },
    // 下载excel导入模板
    async DownLoad () {
      try {
        this.downLoadLoading = true
        await disabledImportTemplateApi({
          type: "残疾人补贴发放"
        })
      } catch (error) {
        if (error && error.response.status === 200) {
          const base64Data = error.response.data;
          const fileName = "残疾人补贴发放模板.xlsx";
          return this.downloadExcelFromBase64(base64Data, fileName);
        }
        this.$message.error("模板下载失败请联系管理员或稍后重试！")
      } finally {
        this.downLoadLoading = false
      }
    },
    downloadExcelFromBase64 (base64Data, fileName) {
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    },
  },
  components: {
    commonList
  }
}
</script>

<style scoped lang='less'>
.uploadDiv {
  display: flex;
  justify-content: center;
}
</style>

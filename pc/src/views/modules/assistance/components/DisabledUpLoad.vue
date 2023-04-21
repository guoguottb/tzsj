<template>
  <el-dialog :visible.sync="isShow"
             :title="module_name"
             width="30%"
             :before-close="handleClose">
    <div style="marginBottom:8px">
      <el-button type="danger"
                 @click="DownLoad">下载 Excel 导入模板</el-button>
      <!-- <el-button type="primary"
                 @click="importCompletionRate">查询导入进度</el-button> -->
    </div>
    <el-form inline>
      <el-form-item label="上传月份"
                    :rules="{ required: true, message: '请输入活动名称', trigger: 'change' }">
        <el-date-picker v-model="uploadExcelMonth"
                        type="month"
                        placeholder="选择月">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="$refs.uploadExcel.submit()">立即上传</el-button>
      </el-form-item>
    </el-form>
    <div class="Disable">
      <!-- 返回主页 -->
      <div class="centerDom">
        <el-upload drag
                   :limit="1"
                   ref="uploadExcel"
                   :auto-upload="false"
                   v-loading="uploadLoading"
                   accept=".xlsx,.xls,.csv"
                   :action="UploadUrl()"
                   :before-upload="beforeUploadFile"
                   :on-remove="handleRemove"
                   :headers="headers"
                   :data="datas"
                   :on-exceed="exceedFile"
                   :on-success="handleSuccess"
                   :on-error="handleError"
                   :file-list="fileList">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip"
               slot="tip">只能上传xlsx(xls)和csv文件且文件大小不可超过100M</div>
        </el-upload>
      </div>

      <el-progress :percentage="percentage"
                   v-if="module_name === '残疾人补贴发放'"
                   :color="percentageColor"></el-progress>
    </div>
  </el-dialog>
</template>

<script>
import { importCompletionRateApi } from "@/api"
import request from '@/utils/request'
import requestConst from '@/utils/request-const'
import dayjs from 'dayjs'
export default {
  name: 'DisabledUpLoadVue',
  props: ["data", "isShow", 'module_name'],
  data () {
    return {
      InformationCollectionArr: ["残疾人证信息", "长护保险待遇名单", "高额医疗费", "特困职工", "大重病预警", "救助诚信", "陆运从业资格", "建档立卡扶贫", "死亡信息"],
      height: document.documentElement.clientHeight - 200,
      uploadExcelMonth: "",
      tempData: [],
      // 问题数据列表显示
      percentageColor: "#67C23A",
      show: false,
      uploadLoading: false,
      currentPage: 1, //初始页
      pagesize: 30,    //    每页的数据
      // userList: []
      percentage: 0,
      timer: null,
      headers: {
        "X-CSRF-TOKEN": sessionStorage.getItem("token"),
      }, //请求头
      limitNum: 1, // 上传excell时，同时允许上传的最大数
      fileList: [], // excel文件列表
      tableData: [],
      dataArr: [],
      dataObj: {},
      data1: [],
      uploadLoading: false,
      // filename:this.$route.query.filename
    }
  },
  created () {
    this.headers[requestConst.headers.greenChannel] = sessionStorage.getItem(requestConst.headers.greenChannel)
    this.headers['Accept'] = 'application/json; charset=utf-8'
  },
  methods: {
    // 查询导入进度 接口
    async importCompletionRate (id) {
      try {
        let exportObject = JSON.parse(localStorage.getItem("exportObject_ID"))
        // 如果本地存储没有查询ID 则清除定时器  且终止方法
        if (!exportObject || !exportObject[this.module_name]) {
          return clearInterval(this.timer)
        }
        await importCompletionRateApi(exportObject[this.module_name])
      } catch (error) {
        if (error.response.data.code === 200 && error.response.data.data >= 0) {
          // 进度满之后清除定时器
          if (error.response.data.data >= 100) {
            clearInterval(this.timer);
            // 清空本地的excle导入id
            this.clearExcelUploadID()
            this.$notify({
              title: this.module_name,
              message: 'excel文件导入成功',
              type: 'success'
            });
          }
          // 进度未到100 给其进度条赋值
          return this.percentage = error.response.data.data
        }
        // 如果上传失败
        this.percentageColor = "#F56C6C"
        this.clearExcelUploadID() // 清空本地存储的查询id
        clearInterval(this.timer)// 清除每五秒查询一次进度的定时器
        this.$notify.error({ // 右上角提示
          title: this.module_name,
          message: 'excel文件导入失败请联系管理员或者稍后重试'
        });
      }
    },
    submitUploadExcel () {
      this.$refs.uploadExcel.submit()
    },
    // 文件超出个数限制时的钩子
    exceedFile (files, fileList) {
      this.$message.warning(`只能选择 ${this.limitNum} 个文件，当前共选择了 ${files.length + fileList.length} 个`);
    },
    //文件移除操作
    handleRemove (file, fileList) {
      this.fileList = fileList
    },
    // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
    beforeUploadFile (file) {
      // 残疾人补贴发放 页面需要选择上传月份
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
      if (size > 100) {
        this.$message.warning('文件大小不得超过100M');
        return false
      }
      this.uploadLoading = true
    },
    // 文件上传成功时的钩子
    handleSuccess (res, file, fileList) {
      this.uploadLoading = false
      this.percentage = 0
      if (res.code !== 200) return this.$message.error(res.msg)
      if (res.code === 200) {
        this.show = false
        this.tempData = []
        // 成功消息提示
        this.$message.success(res.msg);
        if (typeof res.data !== 'number') return
        // 获取模块名
        let modelName = this.module_name
        let exportObject = JSON.parse(localStorage.getItem("exportObject_ID"))
        // 如果本地没有存储导入id对象
        if (!exportObject) {
          exportObject = {}
          exportObject[modelName] = res.data
          localStorage.setItem("exportObject_ID", JSON.stringify(exportObject))
          this.timer = setInterval(() => {
            this.importCompletionRate()
          }, 3000);
        }
        // 如果有导入id存储
        else {
          // 给其模块的id赋值
          exportObject[modelName] = res.data
          localStorage.setItem("exportObject_ID", JSON.stringify(exportObject))
          this.timer = setInterval(() => {
            this.importCompletionRate()
          }, 3000);
        }
      }
    },
    // 文件上传失败时的钩子
    handleError (err, file, fileList) {
      this.uploadLoading = false
      this.$message.error('文件上传失败');
    },
    UploadUrl: function () {
      if (this.module_name === "残疾人补贴发放") return "/social/assistance/disabledImport"
      if (this.InformationCollectionArr.includes(this.module_name)) return "/social/excel/importDistrictLevelComparison"
      // 因为action参数是必填项，我们使用二次确认进行文件上传时，直接填上传文件的url会因为没有参数导致api报404，所以这里将action设置为一个返回为空的方法就行，避免抛错
      // return "https://jsonplaceholder.typicode.com/posts/"
      if (['水电气缴费情况', '通讯出行情况', '疾病康复情况'].includes(this.module_name)) {
        return "/social/excel/liveImport"
      } else {
        return "/social/assistance/disabledImport"
      }
    },
    // 下载模板
    DownLoad () {
      if (['水电气缴费情况', '通讯出行情况', '疾病康复情况'].includes(this.module_name)) {
        this.liveImportTemplate({
          type: this.module_name
        }).then(res => {
        }).catch(error => {
          console.log("liveImportTemplate")
          const base64Data = error.response.data;
          const fileName = this.module_name + "列表.xlsx"
          this.downloadExcelFromBase64(base64Data, fileName)
        })
      }
      else {
        this.disabledImportTemplate({
          type: this.module_name
        })
          .then()
          .catch((error) => {
            const base64Data = error.response.data;
            const fileName = this.module_name + "列表.xlsx";
            this.downloadExcelFromBase64(base64Data, fileName);
          });
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
    // 残疾人下载模板接口
    disabledImportTemplate (data) {
      return request({
        headers: {
          'Accept': 'application/json',
        },
        url: ["残疾人名单", "长护保险待遇名单", "高额医疗费", "特困职工", "大重病预警", "救助诚信", "陆运从业资格", "建档立卡扶贫", "死亡信息"].includes(this.module_name) ? "/social/excel/importDistrictLevelComparisonTemplate" : '/social/assistance/disabledImportTemplate',
        method: 'post',
        data,
      })
    },
    // 生活状况监督模块下载模板接口1
    liveImportTemplate (data) {
      return request({
        headers: {
          'Accept': 'application/json',
        },
        url: '/social/excel/liveImportTemplate',
        method: 'post',
        data: data
      })
    },
    // excel转码
    // base64ToBlob (code) {
    //   let parts = code.split(";base64,");
    //   let contentType = parts[0].split(":")[1];
    //   let raw = window.atob(parts[1]);
    //   let rawLength = raw.length;

    //   let uInt8Array = new Uint8Array(rawLength);

    //   for (let i = 0; i < rawLength; ++i) {
    //     uInt8Array[i] = raw.charCodeAt(i);
    //   }

    //   return new Blob([uInt8Array], {
    //     type: contentType,
    //   });
    // },
    // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
    // beforeUploadFile (file) {

    //   console.log('before upload');
    //   console.log(file);
    //   let extension = file.name.substring(file.name.lastIndexOf('.') + 1);
    //   let size = file.size / 1024 / 1024;
    //   if (extension !== 'xlsx' && extension !== 'xls') {
    //     this.$message.warning('只能上传后缀是.xlsx(.xls)的文件');
    //   }
    //   if (size > 100) {
    //     return this.$message.warning('文件大小不得超过100M');
    //   }
    // },

    // 导入接口
    disabledImport (data) {

      let form = new FormData();
      form.append('file', data)

      console.log(data, '参数');
      console.log(form, '参数');

      return request({
        headers: {
          'Content-type': 'multipart/form/form-data',
        },
        url: '/social/assistance/disabledImport',
        method: 'post',
        data: form
      })
    },
    handleClose (done) {
      return this.$emit("closeDialog")
    },
    clearExcelUploadID () {
      let exportObject = JSON.parse(localStorage.getItem("exportObject_ID"))
      exportObject[this.module_name] = null
      localStorage.setItem("exportObject_ID", JSON.stringify(exportObject))
    }
  },
  mounted () {
    this.timer = setInterval(() => {
      this.importCompletionRate()
    }, 3000);
  },
  beforeDestroy () {
    clearInterval(this.timer);
  },
  computed: {
    datas () {
      return {
        type: this.module_name,
        date: dayjs(this.uploadExcelMonth).format("YYYY-MM") + "-01"
      }
    }
  }
}
</script>


<style lang="less" scoped>
.g-box {
  height: 80vh !important;
}
.g-box2 {
  width: 100%;
  height: 100%;
  overflow: auto !important;
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
}
.homeBox {
  // position: fixed;
  // top: 10px;
  // right: 20px;
  z-index: 9999;
  font-size: 16px;
}

// .buttonBox {
//   padding: 15px;
//   display: flex;
//   width: 35%;
//   overflow: auto;
//   box-sizing: border-box;
//   justify-content: flex-start;
//   & .el-button {
//     margin-right: 20px !important;
//   }
// }

.tableBox {
  padding: 0 15px;
  h3 {
    font-size: 18px;
    color: #f56c6c;
    padding-bottom: 15px;
  }
  .el-table {
    // height: 390px;
  }
}
.centerDom {
  display: flex;
  justify-content: center;
}
</style>

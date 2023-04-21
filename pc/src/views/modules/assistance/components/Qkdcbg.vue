<template>
  <el-dialog title="情况调查报告"
             :visible.sync="isShow1"
             z-index=1999
             width="400px">
    <div style="height:auto;padding:0 0 30px 0">
      <!-- <p>处理结果：</p>
           <el-input type="textarea"  :autosize="{ minRows: 2}" v-model="data.result"  style="margin:10px  0 20px 0"></el-input> -->
      <p style="margin-bottom:10px">调查报告：</p>
      <el-upload ref="uploads"
                 class="upload-demo"
                 drag
                 :limit="limit"
                 :accept="'.pdf'"
                 :headers="headers"
                 action="/social/minios/fileUpload"
                 :on-success="uploadSuccess"
                 :before-upload="beforeAvatarUpload"
                 multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip"
             slot="tip">只能上传pdf文件</div>
      </el-upload>

      <el-button size="small"
                 type="primary"
                 @click="save"
                 style="float:right">确定</el-button>

    </div>
  </el-dialog>
</template>
 
<script>
import pdf from "vue-pdf";
import request from "@/utils/request";   //后端接口调用封装
export default {
  components: { pdf },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      },
      required: false
    },
    isShow: {
      type: Boolean,
      default: false,
      required: true
    },
    limit: {
      type: Number,
      default: 5,
      required: false
    },
    uploadType: {
      type: String,
      default: "",
      required: false
    }
  },
  // ["data", "isShow"]
  data () {
    return {
      isShow1: this.isShow,
      headers: {
        "X-CSRF-TOKEN": sessionStorage.getItem("token"),
        'Accept': 'application/json; charset=utf-8'
      },
      filename: '',
      // isShow2:false,
      // pdfUrl: "",
      // numPages: [],
      // fileArr: [],
      // upLoadImgUrl: "",
      // form:{},
    }
  },
  created () {
    // let token = sessionStorage.getItem("token")
    // do something before request is sent
    // console.log(this.headers)
    // console.log(process.env.NODE_ENV)
    // this.headers['X-CSRF-TOKEN'] = sessionStorage.getItem("token")
    // 测试在非development执行怎么样
    // let greentoken = sessionStorage.getItem(requestConst.headers.greenChannel)
    // this.headers[requestConst.headers.greenChannel] = greentoken
    // 测试在非development执行怎么样
    // 原版
    // if (process.env.NODE_ENV == 'development') {
    // 	let greentoken = sessionStorage.getItem(requestConst.headers.greenChannel)
    // 	this.headers[requestConst.headers.greenChannel] = greentoken
    // }
    // 原版
    // this.headers['Accept'] = 'application/json; charset=utf-8'

  },

  watch: {
    isShow1 (newS, oldS) {
      this.isShow1 = newS;
      this.getEmit(newS);
    },

  },
  methods: {

    save () {
      if (this.filename && this.uploadType === '月度报告') {
        this.$emit("savePDF", this.filename)
        return
      }
      if (this.filename) {
        request({
          url: "/social/assistance/saveAssistanceComplaintPDF",
          method: "post",
          data: {
            id: this.data.id,
            filename: this.filename,
          },
        })
          .then((res) => { })
          .catch((res) => {
            if (res.response.data.status == '+OK') {
              this.$message.success(res.response.data.msg)
              this.isShow1 = false;
            } else {
              this.$message.error('上传失败！')
              this.isShow1 = false;
            }
            console.log(res.response.data);
          });
      } else {
        this.$message.warning('请上传PDF文件！')

      }


    },

    // 子向父传值
    getEmit () {
      // console.log(this.isShow1,'this.isShow1==');
      // console.log(this.close,'this.close==');
      this.$emit("function", this.isShow1);
    },


    uploadSuccess (response, file, fileList) {
      let val = "";
      for (let i = 0; i < response.length; i++) {
        let url = response[i].filename;
        val = val == "" ? url : val + "," + url;
      }


      this.filename = val;
      console.log(this.filename, 'val');


      // this.$emit('upload', val);
      // console.log(response,1, file,2,fileList,3)
    },

    clears () {
      this.$refs.uploads.clearFiles();
    },
    beforeAvatarUpload (file) {
      let _this = this
      var is1M = file.size / 1024 / 1024 < 20; // 限制小于20M

      if (!is1M) {
        _this.$message.error('图片大小不可超过20MB')
        // console.log('图片大小不可超过20MB',file.size);
        return false
      }
      if (is1M) {
        is1M = file.size / 1024 > 1; // 限制小于1M
      }
      if (!is1M) {
        _this.$message.error('图片大小不可小于1KB')
        //  console.log('图片大小不可小于50KB',file.size);
      }
      return is1M

    }

  }
}
</script>
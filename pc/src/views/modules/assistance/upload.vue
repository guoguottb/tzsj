<template>
  <el-upload ref="uploads"
             class="upload-demo"
             drag
             :accept="'image/*'"
             :headers="headers"
             action="/social/weixinMinios/fileUpload"
             :on-success="uploadSuccess"
             :before-upload="beforeAvatarUpload"
             multiple>
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    <div class="el-upload__tip"
         slot="tip">只能上传jpg/png文件</div>
  </el-upload>
</template>
<script>
import requestConst from '@/utils/request-const'
export default {
  name: "upload",
  data () {
    return {
      headers: {}
    }
  },
  created () {
    let token = sessionStorage.getItem(requestConst.headers.sesstionCsrf)
    // do something before request is sent
    console.log(this.headers)
    console.log(process.env.NODE_ENV)
    this.headers[requestConst.headers.csrf] = token
    // 测试在非development执行怎么样
    let greentoken = sessionStorage.getItem(requestConst.headers.greenChannel)
    this.headers[requestConst.headers.greenChannel] = greentoken
    // 测试在非development执行怎么样
    // 原版
    // if (process.env.NODE_ENV == 'development') {
    // 	let greentoken = sessionStorage.getItem(requestConst.headers.greenChannel)
    // 	this.headers[requestConst.headers.greenChannel] = greentoken
    // }
    // 原版
    this.headers['Accept'] = 'application/json; charset=utf-8'

  },
  methods: {
    uploadSuccess (response, file, fileList) {
      let arrImg = []
      // let val = "";
      for (let i = 0; i < response.length; i++) {
        let url = "/social/weixinMinios/show?filename=" + response[i].filename;
        // val = val == "" ? url : val + "," + url;
        arrImg.push(url)
      }
      this.$emit('upload', arrImg.join());
      // console.log(response,1, file,2,fileList,3)
    },

    clears () {
      this.$refs.uploads.clearFiles();
    },
    beforeAvatarUpload (file) {
      let _this = this
      var is1M = file.size / 1024 / 1024 < 20; // 限制小于3M

      if (!is1M) {
        _this.$message.error('图片大小不可超过20MB')
        // console.log('图片大小不可超过20MB',file.size);
        return false
      }
      if (is1M) {
        is1M = file.size / 1024 > 50; // 限制小于3M
      }
      if (!is1M) {
        _this.$message.error('图片大小不可小于50KB')
        //  console.log('图片大小不可小于50KB',file.size);
      }
      return is1M

    }
  }
}
</script>
<style >
.el-upload-list {
  max-height: 100px;
  overflow: auto;
}
</style>
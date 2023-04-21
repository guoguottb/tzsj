<template>
  <el-dialog title="投诉预警查看" center :visible.sync="dialogVisible"  width="80%" :before-close="handleClose"  top="5vh">
    <div class="ComplaintsView">
      <!-- 返回主页 -->

      <!-- 解析出来的数据 style="width:800px" -->
        <el-form ref="form" :model="form" label-width="120px" style="height:700px;overflow:auto">
            <el-form-item label="投诉人">
                <el-input v-model="form.name" disabled></el-input>
            </el-form-item>
            <el-form-item label="手机号码">
                <el-input v-model="form.tel" disabled></el-input>
            </el-form-item>
            <el-form-item label="投诉时间">
                <el-input v-model="form.complaint_time" disabled></el-input>
            </el-form-item>
            <el-form-item label="投诉类型">
                <el-input v-model="form.complaint_type" disabled></el-input>
            </el-form-item>
            <el-form-item label="投诉内容">
                <el-input type="textarea" disabled v-model="form.complaint_content"></el-input>
            </el-form-item>
            <el-form-item label="处理人">
                <el-input  disabled v-model="form.processor"></el-input>
            </el-form-item>
            <el-form-item label="处理时间">
                <el-input  disabled v-model="form.processing_time"></el-input>
            </el-form-item>
            <el-form-item label="处理结果">
                <el-input  disabled v-model="form.result"></el-input>
            </el-form-item>
            <el-form-item label="相关材料">

                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>相关材料(<span style='color:red'>{{imgNum.complaint_picture_len}}</span>)</span>
                    </div>
                    <image-view v-if="this.imgArr.complaint_picture_len" :imgList="this.imgArr.complaint_picture_len" height="150px" width="150px"></image-view>
                </el-card>

                <!-- <el-input type="textarea" v-model="form.complaint_content"></el-input> -->
            </el-form-item>
            <el-form-item label="情况调查报告" v-if="this.pdfArr!=''">

                <!-- <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>情况调查报告(<span style='color:red'>{{imgNum.complaint_picture_len}}</span>)</span>
                    </div>
                    <image-view v-if="this.imgArr.complaint_picture_len" :imgList="this.imgArr.complaint_picture_len" height="150px" width="150px"></image-view>
                </el-card> -->

                <!-- <el-input type="textarea" v-model="form.complaint_content"></el-input> -->
                <iframe  :src="pdfArr" style="width: 100%; height: 70vh" id="iframe1" padding="0"
                  frameborder="no"  border="0"  marginwidth="0" marginheight="0"  ></iframe>

            </el-form-item>

           
        </el-form>
    </div>
  </el-dialog>
</template>

<script>
import imageView from '../imageView'
import request from "@/utils/request";
export default {
  name: "Upload",
  components: {
        imageView,
    },
  props: ["data", "isShow"],
  data() {
    return {
        pdfArr:'',
        loading:false,
        form: this.data,
        show: false,
        dialogVisible: this.isShow,
        isShow1: this.isShow, // 向父组件传值
        tableData: [],
        imgNum:{},//图片数量
        imgArr:{},//图片数组
    };
  },
  created() {
    this.loadData();
  },
  watch: {
    isShow1(newS, oldS) {

      this.isShow1 = newS;
      this.getEmit(newS);
      // this.loadData(newS);
    },
    
  },
  methods: {
    loadData() {
      console.log(this.data, "投诉预警数据");
      this.imgArr.complaint_picture_len = this.data.complaint_picture.split(",");

      for(let key in this.imgArr){
            if(this.imgArr[key][0] == ''){
                this.imgArr[key].length = 0;
                this.imgNum[key] = this.imgArr[key].length;
            }else{
                this.imgNum[key] = this.imgArr[key].length;
            }
        }

         let filename = '';
         filename = this.data.tsyj_pdf;


        request({
          headers: {
            Accept: "application/json",
          },
          url: '/social/minios/showPDF?filename='+filename,
          method: "post",
          data: {},
        }).then((res) => {

          this.loading = false;
          this.src = "data:image/png;base64," + res;

        }).catch((res) => {

          this.pdfArr = "data:application/pdf;base64," + res.response.data;
          // this.imgURl = "data:image/png;base64," + res.response.data;
         
         this.loading = false; //关闭加载动画
          console.log(res,'res');
          console.log(this.src,'this.src');
        });
    },

    // 子向父传值
    getEmit() {
      // console.log(this.isShow1,'this.isShow1==');
      // console.log(this.close,'this.close==');
      this.$emit("function", this.isShow1, this.close);
    },

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          this.dialogVisible = false;
          this.isShow1 = false;
          done();
        })
        .catch((_) => {});
    },
  },
};
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

.buttonBox {
  padding: 15px;
  display: flex;
  width: 35%;
  overflow: auto;
  box-sizing: border-box;
  justify-content: flex-start;
  & .el-button {
    margin-right: 20px !important;
  }
}

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
</style>

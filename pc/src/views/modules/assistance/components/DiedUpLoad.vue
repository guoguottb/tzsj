<template>
  <div class="HDYJBox">
    <el-dialog :title="data.btnName"
               :visible.sync="isShow1"
               z-index=1999
               :before-close="handleClose">

      <div>
        <el-card class="box-card">
          <div slot="header"
               class="clearfix">
            <el-button style="float: left; padding: 3px 0"
                       type="text"
                       v-if="data.btnName ==='上传情况证明'"
                       @click="handleRemove(uploadImg,'ad_ex10')">删除</el-button>
            <span><span style="color:red;"> * </span> 情况证明材料(<span style='color:red'>{{sum}}</span>)</span>
            <el-button style="float: right; padding: 3px 0"
                       type="text"
                       v-if="data.btnName ==='上传情况证明'"
                       @click="uploads('ad_ex10', 'form2')">上传</el-button>

          </div>
          <div class="block">
            <image-view :imgList="uploadImg.ad_ex10_img"
                        @Imgindex='getImgIndex'
                        id="ad_ex10"></image-view>
          </div>
        </el-card>
      </div>

      <div slot="footer"
           class="dialog-footer"
           v-if="this.data.btnName!='查看未死亡证明'">
        <el-button @click="closeView">取 消</el-button>
        <el-button type="primary"
                   @click="saveHDType">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="上传"
               :visible.sync="dialogVisible3"
               width="500px"
               append-to-body
               @close='uploadEvent2'>
      <upload @upload="uploadEvent"
              ref="myUpload"></upload>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible3 = false">取 消</el-button>
        <el-button type="primary"
                   @click="dialogVisible3 = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import request from '@/utils/request'
import imageView from '@/views/modules/assistance/imageView'
import upload from '@/views/modules/assistance/upload'
export default {
  name: "DiedUpLoad",
  props: ["data", "isShow"],
  components: {
    imageView,
    upload
  },
  data () {
    return {
      isShow1: this.isShow,
      formLabelWidth: '100px',
      form2: {                         //死亡预警
        ad_ex4: this.data.ad_ex4,    //姓名
        ad_ex10: this.data.ad_ex10,                //情况证明材料
        btnName: this.data.btnName,                //按钮名称
        sid: this.data.ad_id,       //sid-查找对应的户主
      },
      uploadImg: {
        //    ad_ex10_img:[],
        ad_ex10_img: (this.data.ad_ex10).split(','),
      },
      imgNum: [],
      sum: this.data.ad_ex10 == '' ? 0 : (this.data.ad_ex10).split(',').length, //图片数量
      dialogVisible: false,
      dialogVisible3: false,
      imgIndex: {
        ad_ex10: 0,
      },
      close: false,   //关闭弹窗后重新请求数据
    }
  },

  watch: {
    isShow1 (newS, oldS) {
      // console.log(newS,oldS,'123');
      this.isShow1 = newS;

      this.getEmit(newS);
      // this.loadData(newS);
    },

    isShow (newS, oldS) {
      // console.log(newS,oldS,'123456');
      this.loadData();
    },
  },

  created () {
    this.loadData();
  },
  methods: {

    //关闭确定 
    handleClose (done) {
      this.closeView()
    },

    // 取消
    closeView () {
      this.isShow1 = false; //关闭核对授权书上传弹窗
      this.close = true;    //关闭弹窗后不再重新请求数据
      // getEmit()
    },

    // 核对类别
    getType (key) {
      console.log(key);
      console.log(this.data);
      console.log(this.form2);
    },

    // 子向父传值
    getEmit () {
      // console.log(this.isShow1,'this.isShow1==');
      // console.log(this.close,'this.close==');
      this.$emit('function', this.isShow1, this.close);
    },

    loadData (index) {
      console.log(this.data);

      this.form2.ad_ex4 = this.data.ad_ex4;
      this.data.ad_ex10 = this.form2.ad_ex10;

      // if(this.data.ad_ex10.indexof(',')!=-1){

      //     this.uploadImg.ad_ex10_img = (this.data.ad_ex10).split(',');
      // }else if(this.data.ad_ex10!=''){

      //      this.uploadImg.ad_ex10_img[0] = this.data.ad_ex10;
      // }else{
      //     this.uploadImg.ad_ex10_img=[];
      // }

      // this.data.ab_ex192 = this.form2.ab_ex192;
      // this.data.ab_ex221 = this.form2.ab_ex221;
      this.data.ab_id = this.form2.sid;

      // console.log(this.isShow1,'this.isShow1++');
      console.log(this.form2, '--子表');
      console.log(this.data, '--父表');
    },


    // 上传图片
    uploads (id, dataName) {
      // console.log(id, dataName);
      if (!dataName) dataName = "form2";

      //r是处理好的数组
      if (this[dataName][id] == null) this[dataName][id] = "";
      var r = this[dataName][id].split(",").filter(function (s) {
        return s && s.trim();
      });

      this[dataName][id] = r.toString();
      this.dialogVisible3 = true;
      this.uploadId = id;
      this.uploadDataName = dataName;

      try {
        this.$refs.myUpload.clears();
      } catch (e) { }

    },

    uploadEvent (data) {
      let val = this[this.uploadDataName][this.uploadId];
      val = val == "" ? data : val + "," + data;
      this[this.uploadDataName][this.uploadId] = val;
    },

    uploadEvent2 () {
      this.uploadImg[this.uploadId + "_img"] = this[this.uploadDataName][this.uploadId].split(",");
      this.uploadDataName = null;
      this.getImgNum()   // 获取图片数量
      console.log(this.imgNum, 'imgNum：各类图片的数量-上传后');

    },

    // 获取图片数量
    getImgNum () {
      console.log('图片数量', this.uploadImg);
      for (let key in this.uploadImg) {
        if (this.uploadImg[key][0] == '') {
          this.uploadImg[key].length = 0;
          this.imgNum[key] = this.uploadImg[key].length;
        } else {
          this.imgNum[key] = this.uploadImg[key].length;
        }
      }
      this.sum = this.imgNum.ad_ex10_img;
    },

    //获取图片索引
    getImgIndex (item) {
      let data = JSON.parse(item);
      this.imgIndex[data.id] = data.index;

      console.log(item, '图片索引');
      console.log(data);
    },

    // 图片移除
    handleRemove (file, str) {

      this.$confirm('是否删除该图片？', "提示", {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        console.log(12346, str);

        this.$delete(this.uploadImg[str + "_img"], this.imgIndex[str]);
        this.form2[str] = this.uploadImg[str + "_img"].join(",");

        this.getImgNum()        //获取图片数量
      })
        .catch(action => {

          console.log("留在本页");   // 取消留在本页
        });
    },

    saveHDType () {

      // if(this.form2.ab_ex192==''){
      //     this.$message.warning('请选择一种核对类别！')
      //     return false;
      // }else if(!['最低生活保障','特困人员供养','受灾人员救助','医疗救助','临时救助','低保外重残','低保外一户多残依老养残','慈善救助'
      // ,'低保边缘','教育救助','住房救助','就业救助','易返贫致贫对象','司法援助','困难职工','支出型困难','其他'].includes(this.form2.ab_ex192)){
      //     this.$message.warning('当前选择的核对类别有误，请重新选择！')
      //     return false;
      // }

      // if(this.sum>1){
      //     this.$message.warning('纸质授权书照片只能上传一张！')
      //     return false;
      // }else
      //  if(this.sum==0){
      //     this.$message.warning('请上传纸质授权书照片！')
      //     return false;
      // }


      console.log('上传保存', this.form2);



      // this.$emit('function',this.isShow1);
      this.changeCheckReport({
        "ad_ex10": this.form2.ad_ex10,
        "id": this.form2.sid,
      }).then((res) => {

      }).catch((res) => {
        console.log(res);
        if (res.response.data.status == "+OK") {
          this.$message.success(res.response.data.msg)
          this.isShow1 = false;
          console.log("保存成功");
        } else {
          console.log("保存失败");
          this.$message.error(res.response.data.msg)
        }
      })
    },

    // 核对授权书保存
    changeCheckReport (data) {
      return request({
        headers: {
          'Accept': 'application/json',
        },
        url: '/social/assistance/confirmDeath2',
        method: 'post',
        data: data
      })
    },

  }

}
</script>

<style scoped>
.HDYJBox .el-dialog {
  width: 60%;
}
.HDYJBox .el-dialog__header {
  text-align: center;
  border-bottom: 1px solid #ddd;
}
.HDYJBox .el-dialog__body {
  padding: 20px 20px 0px;
}
.block {
  width: 100%;
  /* margin: 0 auto; */
}
.clearfix {
  text-align: center;
}
.hdTitle >>> .el-form-item__label::before {
  content: " * ";
  color: red;
}
</style>
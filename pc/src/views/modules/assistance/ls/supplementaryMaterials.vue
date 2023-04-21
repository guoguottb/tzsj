<template>
  <!-- 临时救助 / 材料补充 -->
  <div class="g-box">
    <el-row>
      <el-col :span="20">
        <h3 class="line_blue">&emsp;身份证及其他证明材料</h3>
        <div class="lineSt"></div>
        <div style="margin-bottom: 10px">
          <el-row>
            <!-- 身份证 纸质授权书 -->
            <el-row :gutter="20"
                    style="margintop: 10px">
              <el-col :span="12"
                      class="my-col">
                <el-card class="box-card">
                  <div slot="header"
                       class="clearfix">
                    <el-button class="leftButton"
                               type="text"
                               @click="handleRemove(uploadImg, 'ab_ex10', imgInfo)">删除
                    </el-button>
                    <span>身份证({{uploadImg.ab_ex10.length}})</span>
                    <el-button class="rightButton"
                               type="text"
                               @click="uploads('ab_ex10')">上传
                    </el-button>
                  </div>
                  <div class="block">
                    <image-view id="ab_ex10"
                                :imgList="uploadImg.ab_ex10"
                                @Imgindex="getImgIndex"></image-view>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="12"
                      class="my-col">
                <el-card class="box-card">
                  <div slot="header"
                       class="clearfix">
                    <el-button class="leftButton"
                               type="text"
                               @click="handleRemove(uploadImg, 'ab_ex177', imgInfo)">删除
                    </el-button>
                    <span>纸质授权书({{uploadImg.ab_ex177.length}})</span>
                    <el-button class="rightButton"
                               type="text"
                               @click="uploads('ab_ex177')">上传
                    </el-button>
                  </div>
                  <div class="block">
                    <image-view id="ab_ex177"
                                :imgList="uploadImg.ab_ex177"
                                @Imgindex="getImgIndex"></image-view>
                  </div>
                </el-card>
              </el-col>
            </el-row>
            <!-- 民主评议 其他材料 -->
            <el-row :gutter="20"
                    style="margin-top: 10px">
              <el-col :span="12"
                      class="my-col">
                <el-card class="box-card">
                  <div slot="header"
                       class="clearfix">
                    <el-button class="leftButton"
                               type="text"
                               @click="
                        handleRemove(uploadImg, 'ab_ex97', imgInfo)">删除
                    </el-button>
                    <span>民主评议({{uploadImg.ab_ex97.length}})</span>
                    <el-button class="rightButton"
                               type="text"
                               @click="uploads('ab_ex97')">上传
                    </el-button>
                  </div>
                  <div class="block">
                    <image-view id="ab_ex97"
                                :imgList="uploadImg.ab_ex97"
                                @Imgindex="getImgIndex"></image-view>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="12"
                      class="my-col">
                <el-card class="box-card">
                  <div slot="header"
                       class="clearfix">
                    <el-button class="leftButton"
                               type="text"
                               @click="handleRemove(uploadImg, 'ab_ex16', imgInfo)">删除
                    </el-button>
                    <span>其他材料({{uploadImg.ab_ex16.length}})</span>
                    <el-button class="rightButton"
                               type="text"
                               @click="uploads('ab_ex16')">上传
                    </el-button>
                  </div>
                  <div class="block">
                    <image-view id="ab_ex16"
                                :imgList="uploadImg.ab_ex16"
                                @Imgindex="getImgIndex"></image-view>
                  </div>
                </el-card>
              </el-col>
            </el-row>
            <!-- 审核审批表 电子授权书 -->
            <el-row :gutter="20"
                    style="margin-top: 10px">
              <el-col :span="12"
                      class="my-col">
                <el-card class="box-card">
                  <div slot="header"
                       class="clearfix">
                    <el-button class="leftButton"
                               type="text"
                               @click="
                        handleRemove(uploadImg, 'ab_ex74', imgInfo)">删除
                    </el-button>
                    <span>审核审批表({{uploadImg.ab_ex74.length}})</span>
                    <el-button class="rightButton"
                               type="text"
                               @click="uploads('ab_ex74')">上传
                    </el-button>
                  </div>
                  <div class="block">
                    <image-view id="ab_ex74"
                                :imgList="uploadImg.ab_ex74"
                                @Imgindex="getImgIndex"></image-view>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="12"
                      class="my-col">
                <el-card class="box-card">
                  <div slot="header"
                       class="clearfix">
                    <el-button class="leftButton"
                               type="text"
                               @click="handleRemove(uploadImg, 'ab_ex73', imgInfo)">删除
                    </el-button>
                    <span>电子授权书({{uploadImg.ab_ex73.length}})</span>
                    <el-button class="rightButton"
                               type="text"
                               @click="uploads('ab_ex73')">上传
                    </el-button>
                  </div>
                  <div class="block">
                    <image-view id="ab_ex73"
                                :imgList="uploadImg.ab_ex73"
                                @Imgindex="getImgIndex"></image-view>
                  </div>
                </el-card>
              </el-col>
            </el-row>
            <!-- 公示图片 -->
            <el-row :gutter="20"
                    style="margin-top: 10px">
              <el-col :span="12"
                      class="my-col">
                <el-card class="box-card">
                  <div slot="header"
                       class="clearfix">
                    <el-button class="leftButton"
                               type="text"
                               @click="
                        handleRemove(uploadImg, 'ab_ex98', imgInfo)">删除
                    </el-button>
                    <span>公示图片({{uploadImg.ab_ex98.length}})</span>
                    <el-button class="rightButton"
                               type="text"
                               @click="uploads('ab_ex98')">上传
                    </el-button>
                  </div>
                  <div class="block">
                    <image-view id="ab_ex98"
                                :imgList="uploadImg.ab_ex98"
                                @Imgindex="getImgIndex"></image-view>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="12"
                      class="my-col">
              </el-col>
            </el-row>
          </el-row>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="ainfo2">
          <div style="margin-left:20px;text-align:center;border-bottom:1px solid #ddd;padding-bottom:10px;">
            <el-button @click="closeView"
                       icon="el-icon-arrow-left"
                       type="primary">返回</el-button>
            <el-button type="primary"
                       @click="onSave">确认材料补充</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 上传框 -->
    <el-dialog :visible.sync="dialogVisible"
               append-to-body
               title="上传"
               width="500px">
      <upload ref="myUpload"
              @upload="uploadEvent"></upload>
    </el-dialog>
  </div>
</template>

<script>
import imageView from "@/views/modules/assistance/imageView"
import upload from '@/views/modules/assistance/upload.vue'
// api
import {
  getBasicsApi, // 获取基本信息
  saveLsjzclApi,  // 材料补充
} from "@/api/lifeRescue/temporaryRescue"
import { isSelectGreenChannelApi } from "@/api/PreAlertSystem"
export default {
  name: "supplementaryMaterials",
  data () {
    return {
      uploadImg: {
        ab_ex10: [],  // 身份证照片
        ab_ex177: [], // 纸质授权书
        ab_ex97: [],  // 民主评议
        ab_ex16: [],  // 其他证明材料
        ab_ex74: [],  // 审批表照片
        ab_ex73: [],  // 电子授权书
        ab_ex98: [],  // 公示图片
      },
      dialogVisible: false,
      imgInfo: {},
      updataImgType: "",
      responseData: {}
    }
  },
  components: {
    imageView,
    upload,
  },
  created () {
    this.getBasics()
  },
  methods: {
    // 删除
    handleRemove (file, str, imgInfo) {
      if (!this.uploadImg[str].length) return
      this.$confirm('是否删除该图片？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      })
        .then(() => {
          console.log(file, str, imgInfo)
          if (imgInfo.id)
            return (this.uploadImg[imgInfo.id] = this.uploadImg[
              imgInfo.id
            ].filter((item, index) => index !== imgInfo.index))
          this.uploadImg[str].shift()
        })
        .catch((action) => {
        })
    },
    // 上传
    uploads (id, dataName, val) {
      this.updataImgType = id
      return this.dialogVisible = true
    },
    // 图片上传按钮
    uploadEvent (data) {
      this.uploadImg[this.updataImgType].push(data)
      this.dialogVisible = false
    },
    // 图片切页
    getImgIndex (item) {
      this.imgInfo = JSON.parse(item)
    },
    // 根据路由传参 数据获取基本信息 数据回显
    async getBasics () {
      try {
        await getBasicsApi({
          sId: this.$route.query.id
        })
      } catch (error) {
        if (error.response.status !== 200) return this.$message.error("基本信息获取失败")
        this.responseData = error.response.data.data
        console.log(this.responseData)
        this.uploadImg.ab_ex10 = this.responseData.ab_ex10 ? this.responseData.ab_ex10.split(",") : []
        this.uploadImg.ab_ex177 = this.responseData.ab_ex177 ? this.responseData.ab_ex177.split(",") : []
        this.uploadImg.ab_ex97 = this.responseData.ab_ex97 ? this.responseData.ab_ex97.split(",") : []
        this.uploadImg.ab_ex16 = this.responseData.ab_ex16 ? this.responseData.ab_ex16.split(",") : []
        this.uploadImg.ab_ex74 = this.responseData.ab_ex74 ? this.responseData.ab_ex74.split(",") : []
        this.uploadImg.ab_ex73 = this.responseData.ab_ex73 ? this.responseData.ab_ex73.split(",") : []
        this.uploadImg.ab_ex98 = this.responseData.ab_ex98 ? this.responseData.ab_ex98.split(",") : []
      }
    },
    // 返回方法
    closeView () {
      if (process.env.NODE_ENV != "development") this.$router.go(-1)
      this.$router.go(-1)
    },
    // 确认材料补充
    async onSave () {
      try {
        this.responseData.ab_ex10 = this.uploadImg.ab_ex10.join(",")
        this.responseData.ab_ex177 = this.uploadImg.ab_ex177.join(",")
        this.responseData.ab_ex97 = this.uploadImg.ab_ex97.join(",")
        this.responseData.ab_ex16 = this.uploadImg.ab_ex16.join(",")
        this.responseData.ab_ex74 = this.uploadImg.ab_ex74.join(",")
        this.responseData.ab_ex73 = this.uploadImg.ab_ex73.join(",")
        this.responseData.ab_ex98 = this.uploadImg.ab_ex98.join(",")
        await this.saveLsjzcl(this.responseData)
        // 如果没有提交信息核对给其
        if (this.responseData.ab_ex214 !== 'C' && this.responseData.ab_ex214 !== 'D') {
          this.$confirm('是否提交经济核对', '提示', {
            confirmButtonText: '是',
            cancelButtonText: '否',
            type: 'warning'
          }).then(async () => {
            // 用户点击了“确定”按钮，执行相应的操作
            this.isSelectGreenChannel({
              sId: this.responseData.ab_id + '',
              green: "否",
              blclTjhd: "是"
            })
          }).catch(() => {
            this.closeView()
            // 用户点击了“取消”按钮，不执行任何操作
          })
        }
        else {
          this.closeView()
        }
      } catch (error) {
        console.log(error, 'onSave')
        if (error === 'cancel') return
      }
    },
    // 材料补充
    async saveLsjzcl (data) {
      try {
        await saveLsjzclApi(data)
      } catch (error) {
        if (error.response.data.code !== 200) return this.$message.error(error.response.data.msg)
        this.$message.success(error.response.data.data)
      }
    },
    async isSelectGreenChannel (data) {
      try {
        await isSelectGreenChannelApi(data)
      } catch (error) {
        console.log(error, '提交经济核对结果')
        if (error.response.data.status !== '+OK') return this.$message.error(error.response.data.msg)
        this.closeView()
        this.$message.success(error.response.data.msg)
      }
    }
  }
}
</script>

<style scoped lang='less'>
.g-box {
  overflow: scroll;
  .clearfix {
    text-align: center;
  }
  .leftButton {
    float: left;
    padding: 3px 0;
  }
  .rightButton {
    float: right;
    padding: 3px 0;
  }
  .pageTitle {
    border-left: 2px solid #3385ff;
    padding-left: 16px;
    border-bottom: 1px solid #dcdfe6;
    margin-bottom: 6px;
  }
  .lineSt {
    background-color: #dcdfe6;
    height: 1px;
    width: 100%;
    margin-bottom: 10px;
  }
  .line_blue {
    border-left: 2px solid #3385ff;
  }
}
/deep/.el-card__body {
  text-align: center;
}
</style>

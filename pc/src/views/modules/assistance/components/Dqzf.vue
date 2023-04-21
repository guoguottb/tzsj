<template>
  <div>
    <el-dialog title="查看"
               :visible.sync="isShow"
               width="60%"
               :before-close="handleClose">
      <el-form ref="form"
               :model="data"
               disabled
               label-width="120px"
               style="overflow:auto">
        <!-- 走访类型 慰问物资 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="走访类型">
              <el-input v-model="data.arv_ex8"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="慰问物资"
                          v-if="data.arv_ex8 ==='走访慰问'">
              <el-input v-model="arv_ex18"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 走访对象 身份证号 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="走访对象">
              <el-input v-model="data.arv_ex1"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证号">
              <el-input v-model="data.arv_ex2"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 保障类别 行政区划 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="保障类别">
              <el-input v-model="data.arv_ex4"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="行政区划">
              <el-cascader :props="props"
                           style="width:100%"
                           v-model="area">
              </el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 家庭住址 联系电话 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="家庭住址">
              <el-input v-model="data.arv_ex3"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话">
              <el-input v-model="data.arv_ex5"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 四方协议 模块 -->
        <template v-if="data.arv_ex8 === '四方协议'">
          <!-- 是否落实 落实时间 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="是否落实">
                <!-- <el-input v-model="form.four_pact_implementation"></el-input> -->
                <el-radio-group v-model="data.four_pact_implementation">
                  <el-radio label="已落实">已落实</el-radio>
                  <el-radio label="未落实">未落实</el-radio>
                  <el-radio label="部分落实">部分落实</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="落实时间">
                <el-input v-model="data.four_pact_time"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 协议描述 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="协议描述">
                <el-input v-model="data.four_pact_desc"></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="12">
          </el-col> -->
          </el-row>
        </template>
        <!-- 急难需求 模块 -->
        <template v-if="data.arv_ex8 === '急难需求'">
          <!-- 急难需求 需求描述 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="急难需求">
                <el-radio-group v-model="data.whether_need">
                  <el-radio label="有">有</el-radio>
                  <el-radio label="无">无</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="需求描述">
                <el-input v-model="data.need_desc"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </template>
        <!-- 隐患排查 模块 -->
        <template v-if="data.arv_ex8 === '隐患排查'">
          <!-- 有无安全隐患 安全隐患描述 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="有无安全隐患">
                <el-radio-group v-model="data.whether_hidden_danger">
                  <el-radio label="有">有</el-radio>
                  <el-radio label="无">无</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="安全隐患描述">
                <el-input v-model="data.hidden_danger_desc"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </template>
        <!-- 走访人 走访内容 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="走访人">
              <el-input v-model="data.arv_ex6"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="走访内容">
              <el-input v-model="data.arv_ex7"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 发现问题 走访日期 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="发现问题">
              <el-input v-model="data.arv_ex9"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="走访日期">
              <el-input v-model="data.arv_dat1"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 发现问题 走访日期 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="走访照片">
              <el-card class="box-card">
                <div slot="header"
                     class="clearfix">
                  <span>相关材料(<span style='color:red;'>{{imgArr.arv_ex10.length}}</span>)</span>
                </div>
                <image-view v-if="this.imgArr.arv_ex10"
                            :imgList="this.imgArr.arv_ex10"
                            width="100%"></image-view>
              </el-card>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="协议照片">
              <el-card class="box-card">
                <div slot="header"
                     class="clearfix">
                  <span>相关材料(<span style='color:red'>{{imgArr.four_pact_picture.length}}</span>)</span>
                </div>
                <image-view v-if="this.imgArr.four_pact_picture"
                            :imgList="this.imgArr.four_pact_picture"
                            width="100%"></image-view>
              </el-card>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import imageView from '../imageView'
import mixin from "@/mixins"
export default {
  name: "Upload",
  components: {
    imageView,
  },
  props: ["data", "isShow", "arv_ex18"],
  mixins: [mixin],
  data () {
    return {
      // isShow1: this.isShow, // 向父组件传值
      tableData: [],
      imgArr: {
        arv_ex10: [],
        four_pact_picture: []
      },//图片数组
      xzqh: '',
    };
  },
  created () {
    this.loadData();
  },
  methods: {
    loadData () {
      this.imgArr.arv_ex10 = this.data.arv_ex10 ? this.data.arv_ex10.split(",") : []
      this.imgArr.four_pact_picture = this.data.four_pact_picture ? this.data.four_pact_picture.split(",") : []
    },
    handleClose () {
      this.$emit("closeDialog")
    },
  },
  computed: {
    area () {
      return this.data.arv_ex14 ? this.data.arv_ex14.split(',') : []
    }
  }
};
</script>


<style lang="less" scoped>
/deep/.box-card {
  .el-card__body {
    text-align: center;
    .el-image {
      height: 100%;
    }
  }
}
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

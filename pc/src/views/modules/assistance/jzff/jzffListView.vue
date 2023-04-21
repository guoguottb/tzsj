<template>
  <div class="g-box">
    <div class="g-box2">
      <div class="info2">
        <el-form :model="relifdist"
                 :inline-message="true"
                 :show-message="false"
                 ref="supportinst"
                 label-width="auto"
                 style='paddingRight: 10px;'>
          <h3 class="line_blue"
              id="page1">&emsp;基本信息</h3>
          <div class="lineSt"></div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="业务名称"
                            prop="ar_ex1">
                {{relifdist.ar_ex1}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="发放机构区划"
                            prop="ar_ex9">
                {{relifdist.ar_ex9}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="发放类型"
                            prop="ar_ex6">
                {{relifdist.ar_ex6 == 1 ? "正常发放": "补发"}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="发放年月"
                            prop="ar_dat3">
                {{relifdist.ar_dat3}}
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="发放笔数"
                            prop="ar_ex2">
                {{relifdist.ar_ex2}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="发放金额"
                            prop="ar_ex3">
                {{relifdist.ar_ex3}}
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="创建时间"
                            prop="ar_dat1">
                {{relifdist.ar_dat1}}
              </el-form-item>
            </el-col>
          </el-row>

          <h3 class="line_blue"
              id="page2">&emsp;发放名单明细</h3>
          <div class="lineSt"></div>
          <div>
            <!-- relifdist.ar_ex1 -->
            <el-button type="success"
                       @click="addEconomics('open')"
                       :disabled="isActionOrEnd !== true || !disArr.includes(relifdist.ar_ex1) ">公示开始</el-button>
            <el-button type="danger"
                       @click="addEconomics('close')"
                       :disabled="isActionOrEnd !== false || !disArr.includes(relifdist.ar_ex1)">公示结束</el-button>
          </div>
          <common-list :sKey="469"
                       :type="'资金发放名单明细'"
                       :tableName="'资金发放名单明细'"
                       :search="search"
                       style="box-shadow: 0px 0px 0px #fff;"></common-list>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
import commonList from '../commonList'
import {
  isOpenOrCloseReliefdistApi,
  addEconomicsApi
} from "@/api"
export default {
  name: "yljgListVIew",
  components: {
    commonList
  },
  data () {
    return {
      relifdist: {},
      search: {},
      isActionOrEnd: "",
      disArr: ['特困人员供养', '城市最低生活保障', '农村最低生活保障']
    }
  },
  created () {
    this.loadData();
    this.isOpenOrCloseReliefdist()
  },
  methods: {
    closeView () {
      this.$emit("closes", false)
      this.$router.go(-1)
    },
    loadData () {// 进入页面加载数据
      this.search["arf_mainid"] = this.$route.query.sId;

      // this.isFinish=false;
      this.getRelifdist({
        sId: this.$route.query.sId
      }).then(res => {
        this.relifdist = res[0].data;
        // this.isFinish=true;
      }).catch(res => {
        if (typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200) {
          console.log('请求失败了-----------------------')
          this.$message.error('数据获取失败或请求超时11111')
          this.$emit("closes", false)
          this.$router.go(-1)
          return false
        }
        console.log(res, '资金发放');
        this.relifdist = res.response.data[0].data;
        // this.isFinish=true;
      })
    },
    vss (d) {
      var h = [];
      for (var k in d) {
        h.push(k + "=" + d[k]);
        h.push(k + "=" + d[k]);
      }
      return h.join("\r");
    },
    getRelifdist (data) {
      return request({
        url: "/social/assistance/getRelifdist",
        method: 'post',
        data: data
      })
    },
    async isOpenOrCloseReliefdist () {
      try {
        await isOpenOrCloseReliefdistApi(this.$route.query.sId)
      } catch (error) {
        console.log(error, "error.response.data.sreult")
        if (error && error.response.data.code === 200) return this.isActionOrEnd = error.response.data.data;
      }
    },
    async addEconomics (type) {
      try {
        await addEconomicsApi({
          ar_id: this.$route.query.sId,
          type,
        })
      } catch (error) {
        if (error && error.response.data.code === 200) {
          if (isNaN(this.isActionOrEnd)) this.isActionOrEnd = !this.isActionOrEnd
          return this.$message.success(error.response.data.msg)
        }
        this.$message.error(error.response.data.msg)
      }
    }
  }
}
</script>
<style scoped>
.g-box {
  height: 80vh !important;
}
.g-box2 {
  height: 100%;
  width: 100%;
  overflow: auto !important;
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
}
.info2 {
  flex: 1;
  padding-right: 10px;
  box-sizing: border-box;
  border-right: 1px solid #ddd;
  overflow: auto;
}

.my-divider {
  margin: 15px auto 10px;
}

.my-table {
  width: 100%;
  margin-bottom: 5px;
}

.my-col {
  text-align: center;
  color: #909399;
}

.button-group {
  margin-bottom: 5px;
  margin-left: 10px;
}

.el-table__body-wrapper .el-table__empty-block {
  background-image: none;
  min-height: auto;
  height: auto !important;
}

.el-table__empty-block .el-table__empty-text {
  display: block;
  line-height: 40px;
}

.el-table--border {
  border-bottom: 1px solid #ebeef5 !important;
}

.ainfo2 {
  width: 240px;
  font-size: 14px;
  line-height: 20px;
  text-align: left;
  padding-left: 10px;
  box-sizing: border-box;
}

.line_blue {
  border-left: 2px solid #3385ff;
  margin-top: 25px;
}

.lineSt {
  background-color: #dcdfe6;
  height: 1px;
  width: 100%;
  margin-bottom: 10px;
}

.ainfoFont {
  display: block;
  margin-bottom: -15px;
  font-weight: bold;
  color: #606266;
}

.listStyle {
  list-style: none;
}

.listStyleA {
  color: #3385ff !important;
}
</style>

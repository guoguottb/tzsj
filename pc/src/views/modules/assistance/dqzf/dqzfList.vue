<template>
  <div>
    <!-- commonlist -->
    <common-list :sKey="488"
                 ref="commonList"
                 :type="'定期走访'"
                 :tableName="'定期走访'"
                 @createData="createData"
                 @updataRecord="updataRecord"
                 @operateButton='operateButton'
                 @openView="openView">
    </common-list>
    <!-- 生成定期走访数据 dialog -->
    <el-dialog title="生成定期走访记录"
               :visible.sync="createDataDialogVisible"
               width="30%"
               :before-close="createDataHandleClose">
      <el-select v-model="allMatterValue"
                 style="width:100%"
                 multiple
                 filterable
                 allow-create
                 default-first-option
                 placeholder="请选择需要发放的物质">
        <el-option v-for="(item,index) in allMatter"
                   :key="index"
                   :label="item.name"
                   :value="item.id">
        </el-option>
      </el-select>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="createDataDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="onAffirm">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 查看按钮的dialog -->
    <Dqzf v-if="dqzfShow"
          :isShow="dqzfShow"
          :data="dqzfForm"
          ref="Dqzf"
          :arv_ex18="arv_ex18"
          @closeDialog="dqzfShow = false"></Dqzf>
    <!-- 定期走访记录派发 -->
    <el-dialog title="定期走访任务派发"
               :visible.sync="distributeDialogVisible"
               width="60%"
               :before-close="distributeHandleClose">
      <!-- <span>这是一段信息</span> -->
      <el-button type="primary"
                 @click="addDistributeArrItem">新增</el-button>
      <el-form label-width="140px">
        <el-row v-for="item in distributeArr"
                :key="item.key">
          <!-- 行政区划 -->
          <el-col :span="10">
            <el-form-item label="行政区划">
              <el-cascader placeholder="选择区划"
                           v-model="item.distributeArea"
                           :props="distributeProps"
                           style="width:100%">

              </el-cascader>
            </el-form-item>
          </el-col>
          <!-- 救助服务站名称 -->
          <el-col :span="10">
            <el-form-item label="救助服务站名称">
              <el-select v-model="item.workstationName"
                         style="width:100%"
                         placeholder="请输入救助服务站名称">
                <el-option v-for="(item,index) in SGZList"
                           :key="index"
                           :label="item"
                           :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 删除 -->
          <el-col :span="4"
                  class="distributeDelete">
            <el-button type="danger"
                       @click="deleteDistributeArrItem(item.key)">删除</el-button>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="distributeDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="ConfirmationDistribution">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// 组件
import commonList from '../commonList'
import Dqzf from '@/views/modules/assistance/components/Dqzf.vue' //定期走访查看组件 
import request from "@/utils/request"
// api
import {
  queryGoodsApi,  // 获取物资
  generateDqzfRecordApi,  // 生成定期走访记录
  updateDqzfRecordApi,     // 更新定期走访记录
  getGoodsInfoApi,  // 获取定期走访信息
} from "@/api/RegularVisits"
// 救助服务站接口
import {
  WorkStationGetSGZListApi, // 艾 救助服务站列表
  assignRegularVisitRecordsApi, // 艾 分配定期走访记录接口
} from "@/api/SocialWorkStation"
export default {
  name: "dqzfList",
  data () {
    return {
      createDataDialogVisible: false,
      allMatter: [],   // 全部物质
      allMatterValue: [],
      dqzfShow: false,
      dqzfForm: {},
      arv_ex18: "",
      distributeDialogVisible: false, // 定期走访记录派发 dialog
      distributeArr: [{ distributeArea: [], workstationName: "", key: 1 }],
      distributeProps: {
        multiple: true,//多选
        // checkStrictly:true,
        lazy: true,
        lazyLoad (node, resolve) {
          const { level } = node; // 获取当前node对象中的level属性
          let pId = "0";
          if (level > 0) {
            let value = node.value;
            if (value) {
              let values = value.split("#");
              pId = values.length > 1 ? values[1] : "0";
            }
          }
          request({
            url: "/social/assistance/getCityOption",
            method: "post",
            data: {
              pId: pId,
            },
          })
            .then((res) => {
            })
            .catch((res) => {
              const nodes = res.response.data;
              nodes.forEach((item) => {
                item.value = item.cs_ex2 + "#" + item.cs_ex1;
                item.label = item.cs_ex2;
                item.leaf = level >= 1; //判断是否为末尾节点，这个地方是0,1,2三级
              });
              resolve(nodes);
            });
        },
      },
      option: [],//评估机构
      workstationName: "",
      SGZList: []
    }
  },
  beforeRouteLeave (to, from, next) {
    sessionStorage.setItem('activeName', this.$children[0].activeName);
    next();
  },
  components: {
    commonList,
    Dqzf
  },
  methods: {
    // 生成定期走访记录按钮   点击事件
    createData () {
      this.createDataDialogVisible = true
      this.queryGoods()
    },
    // 生成定期走访记录dialog关闭前
    createDataHandleClose () {
      // 关闭弹框
      this.createDataDialogVisible = false
      // 清空value arr
      this.allMatterValue = []
    },
    // 获取所以走访物资
    async queryGoods () {
      try {
        console.log("获取所以走访物资")
        await queryGoodsApi()
      } catch (error) {
        console.log(error)
        if (error && error.response && error.response.data && error.response.data.status === "+OK") return this.allMatter = error.response.data.data
      }
    },
    // 生成定期走访记录  确认按钮点击事项
    async onAffirm () {
      console.log(this.allMatterValue)
      try {
        await generateDqzfRecordApi(this.allMatterValue)
      } catch (error) {
        if (error && error.response && error.response.data && error.response.data.status === "+OK") {
          // 操作成功关闭弹框
          this.createDataHandleClose()
          // 提升消息 
          return this.$message.success(error.response.data.msg)
        }
        // 如果错误
        this.$message.error(error.response.data.msg)
      }
    },
    // 更新定期走访记录按钮  点击事项
    async updataRecord () {
      try {
        await updateDqzfRecordApi()
      } catch (error) {
        if (error && error.response && error.response.data && error.response.data.status === "+OK") return this.$message.success(error.response.data.msg)
      }
      this.$message.success(error.response.data.msg)
    },
    DqzfView (param1, param2) {
      this.dqzfShow = param1;
      console.log(param1, param2, '定期走访子组件传值');
      // 保存后重新请求，取消不请求
      if (!param2) {
        this.$refs.commonList.loadData();
      }
    },
    openView (value) {
      this.dqzfForm = value
      console.log(this.dqzfForm, "this.dqzfForm")
      // arv_id
      this.getGoodsInfo()
      this.dqzfShow = true
    },
    async getGoodsInfo () {
      try {
        await getGoodsInfoApi({
          id: this.dqzfForm.arv_id
        })
      } catch (error) {
        if (error && error.response && error.response.data && error.response.data.status === "+OK") {
          let str = []
          error.response.data.data.arv_ex18.filter(item => {
            str.push(item.name)
          })
          this.arv_ex18 = str.join(" / ")
          console.log(this.arv_ex18, "this.arv_ex18this.arv_ex18this.arv_ex18")
        }
      }
    },
    operateButton () {
      this.distributeDialogVisible = true
    },
    // 定期走访记录派发 dialog 关闭前
    distributeHandleClose () {
      this.distributeDialogVisible = false
    },
    // 定期走访任务派发 新增
    addDistributeArrItem () {
      // push item 如果有数组中有对象 取其最后一项的key + 1   else 取1 
      let key = this.distributeArr.length ? this.distributeArr[this.distributeArr.length - 1].key + 1 : 1
      this.distributeArr.push({ distributeArea: [], workstationName: "", key, })
    },
    // 移除 救助服务站派发 item
    deleteDistributeArrItem (key) {
      this.distributeArr = this.distributeArr.filter(item => item.key !== key)
    },
    // 艾 救助服务站列表
    async WorkStationGetSGZList () {
      try {
        await WorkStationGetSGZListApi({})
      } catch (error) {
        if (error.response.data.code === 200) return this.SGZList = error.response.data.data
      }
    },
    // 艾 分配定期走访记录接口
    async assignRegularVisitRecords (array) {
      try {
        await assignRegularVisitRecordsApi(array)
      } catch (error) {
        if (error.response.data.code === 200) {
          this.distributeHandleClose()  // 关闭弹框
          this.distributeArr = [{ distributeArea: [], workstationName: "", key: 1 }]  // 重置数据
          return this.$message.success(error.response.data.msg) // 成功消息提示
        }
        error && this.$message.error(error.response.data.msg)  // 错误消息提示
      }
    },
    // 救助服务站 确认派发
    ConfirmationDistribution () {
      // 如果没有新增数据 直接关闭弹框
      if (!this.distributeArr.length) return this.distributeHandleClose()
      let formArr = []
      if (this.distributeArr.length) {
        this.distributeArr.forEach(item => {
          formArr.push({
            name: item.workstationName,
            streets: item.distributeArea.map(area => area[area.length - 1].replace(/[\d#]/g, ""))
          })
        })
      }
      let flag = formArr.every(item => item.name && item.streets.length)
      // 如果有formArr中有对应item的name和streets为空值
      flag ? this.assignRegularVisitRecords(formArr) : this.$message.error("提交信息不完整，请仔细核对!")
    }
  },
  created () {
    this.WorkStationGetSGZList()
  }
}
</script>
<style lang="less">
.distributeDelete {
  display: flex;
  justify-content: flex-end;
}
</style>
<template>
  <div class="maxDiv">
    <commonList sKey="576"
                ref="commonList"
                :type="`残疾人补贴审核`"
                :tableName="`残疾人补贴审核`"
                @addData="addData"></commonList>
    <!-- 新增残疾人数据 -->
    <el-dialog title="残疾人补贴申请表"
               class="addDataDialog"
               :visible.sync="addDataDialogVisible"
               width="60%"
               :before-close="addDataHandleClose">
      <el-form ref="addDataForm"
               :model="addDataForm"
               label-width="120px">
        <!-- 姓名 身份证号 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名"
                          :rules="{
              required: true, message: '姓名不能为空', trigger: 'blur'
            }">
              <el-input v-model.trim="addDataForm.abd_ex2"
                        placeholder="请输入姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证号"
                          :rules="{
              required: true, message: '身份证号不能为空', trigger: 'blur'
            }">
              <el-input v-model.trim="addDataForm.abd_ex3"
                        placeholder="请输入身份证号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 手机号码 行政区划 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="手机号码"
                          :rules="{
              required: true, message: '身手机号码不能为空', trigger: 'blur'
            }">
              <el-input v-model="addDataForm.abd_ex20"
                        placeholder="请输入手机号码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="行政区划"
                          :rules="{
              required: true, message: '身手机号码不能为空', trigger: 'change'
            }">
              <div class="block"
                   style="width:100%!important"
                   placeholder="请选择行政区划">
                <el-cascader :props="props"
                             v-model="addDataForm.abd_ex28"></el-cascader>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="addDataHandleClose">取消申请</el-button>
        <el-button type="primary"
                   @click="addDataAffirm">确认申请</el-button>
      </span>
    </el-dialog>
    <!-- 残疾人查看页面 -->
    <el-dialog title="提示"
               :visible.sync="viewDialogVisible"
               width="30%"
               :before-close="viewHandleClose">
      <span>这是一段信息</span>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="viewDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="viewDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import commonList from "../../commonList"
import {
  getTaiZhouAreaApi,  // 泰州区域 > 街道 > 村庄 联机选择框
  confirmModificationApi, // 新增残疾人信息
} from "@/api/lifeRescue/disabilityAllowance"
let pId = "0";
export default {
  name: "SubsidyDisabledAudit",
  data () {
    return {
      addDataDialogVisible: false,
      addDataForm: {
        abd_ex2: "",  //  姓名
        abd_ex3: "",  //  身份证号
        abd_ex20: "", // 手机号码
        abd_ex28: [], // 行政区划
      },
      props: {
        lazy: true,
        that: this,
        async lazyLoad (node, resolve) {
          const { level } = node;
          try {
            let areaID = node.data ? node.data.pId : pId
            await getTaiZhouAreaApi({ pId: areaID })
          } catch (error) {
            console.log(error, "行政区划")
            if (error && error.response && error.response.statusText === "OK") {
              const nodes = Array.from(error.response.data)
                .map(item => ({
                  value: item.cs_ex2 + "#" + item.cs_ex1,
                  label: item.cs_ex2,
                  leaf: level >= 2,
                  pId: item.cs_ex1
                }));
              // 通过调用resolve将子节点数据返回，通知组件数据加载完成
              resolve(nodes);
            }
          }
          // }, 1000);
        }
      },
      viewDialogVisible: false
    }
  },
  created () {

  },
  methods: {
    // 新增按钮点击事项
    addData () {
      this.addDataDialogVisible = true;
    },
    // 新增残疾人数据dialog关闭前
    addDataHandleClose () {
      this.addDataForm = {
        abd_ex2: "",  //  姓名
        abd_ex3: "",  //  身份证号
        abd_ex20: "", // 手机号码
        abd_ex28: [], // 行政区划
      },
        this.addDataDialogVisible = false
    },
    async addDataAffirm () {
      try {
        // 改四项为必填项 任何一条信息不全即不通过
        if (!this.addDataForm.abd_ex2 || !this.addDataForm.abd_ex3 || !this.addDataForm.abd_ex20 || !this.addDataForm.abd_ex28.length) return this.$message.error("请完善全部的信息")
        this.addDataForm.abd_ex28 = this.addDataForm.abd_ex28.join()
        await confirmModificationApi({
          data: "[" + JSON.stringify(this.addDataForm) + "]"
        })
      } catch (error) {
        if (error && error.response && error.response.data && error.response.data.status === '+OK') {
          this.addDataHandleClose()
          this.$refs.commonList.loadData(true)
          return this.$message.success(error.response.data.msg)
        }
        this.$message.error(error.response.data.msg)
      }
    },
    // 残疾人查看 dialog
    viewHandleClose () { }
  },
  components: {
    commonList
  },
}
</script>

<style scoped lang='less'>
/deep/ .addDataDialog {
  .el-cascader.el-cascader--small {
    width: 100% !important;
  }
}
.pageTitle {
  border-left: 2px solid #3385ff;
  padding-left: 16px;
  border-bottom: 1px solid #dcdfe6;
  margin-bottom: 6px;
}
/deep/ .el-descriptions--small {
  font-size: 14px;
  color: black;
}
/deep/ .leftFather {
  padding-right: 6px;
  height: 75vh !important;
  overflow: hidden;
  overflow-y: scroll;
  border-right: 1px solid #dcdfe6;
  .el-descriptions-row {
    td {
      line-height: 30px;
    }
    height: 30px;
  }
}

.right-ui {
  padding: 20px 0 0 60px;
}
#page1 {
  position: relative;
  .no1img {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 2;
    transform: rotate(30deg);
    margin: 4% 4% 0 0;
    img {
      width: 140px;
    }
  }
}
</style>

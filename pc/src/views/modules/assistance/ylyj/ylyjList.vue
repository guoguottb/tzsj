<template>
  <!-- 问题反馈 -->
  <div>
    <!-- txt  -->
    <common-list :sKey="620"
                 @viewRowInfo="viewRowInfo"
                 @addProblemFeedback="addProblemFeedback"></common-list>
    <!-- 问题反馈dialog -->
    <el-dialog title="提示"
               :visible.sync="dialogVisible"
               width="48%"
               :before-close="handleClose">
      <!-- form -->
      <el-form :model="ruleForm"
               :rules="rules"
               ref="ruleForm"
               label-width="100px"
               class="demo-ruleForm">
        <!-- 反馈单位 问题描述 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="反馈单位"
                          prop="fp_ex1">
              <el-input v-model="ruleForm.fp_ex1"></el-input>
            </el-form-item></el-col>
          <el-col :span="12">
            <el-form-item label="问题描述"
                          prop="fp_ex3">
              <el-input v-model="ruleForm.fp_ex3"></el-input>
            </el-form-item></el-col>
        </el-row>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary"
                   @click="onAffirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>

import commonList from '../commonList'
import { saveFeedbackProblemApi } from "@/api/problemFeedback"
export default {
  name: "feedbackProblem",
  data () {
    return {
      rowInfo: {},
      dialogVisible: false,
      ruleForm: {
        fp_id: "",
        fp_ex1: "",
        fp_ex3: "",
      },
      rules: {
        fp_ex1: [{ required: true, message: '请输入反馈单位', trigger: 'blur' }],
        fp_ex3: [{ required: true, message: '请输入问题描述', trigger: 'blur' }],
      }
    }
  },
  components: {
    commonList
  },
  methods: {
    // 新增问题反馈
    addProblemFeedback () {
      this.dialogVisible = true
    },
    // 查看按钮
    viewRowInfo (rowInfo) {
      this.rowInfo = rowInfo
    },
    handleClose () {
      this.dialogVisible = false
    },
    onAffirm () {
      this.handleClose()
    }
  }
}
</script>
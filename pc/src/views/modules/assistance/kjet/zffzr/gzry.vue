<template>
  <div>
    <common-list :sKey="572"
                 type='工作人员'
                 @addEmployee="addEmployee"
                 :formItemLabel="`90px`"></common-list>
    <!-- 操作工作人员信息dialog -->
    <el-dialog title="提示"
               :visible.sync="dialogVisible"
               width="50%"
               :before-close="handleClose">
      <el-form :model="ruleForm"
               :rules="rules"
               ref="ruleForm"
               label-width="100px"
               class="demo-ruleForm">
        <!-- 姓名 性别 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名"
                          prop="name">
              <el-input v-model="ruleForm.name"
                        placeholder="请输入姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别"
                          prop="gender">
              <el-select v-model="ruleForm.gender"
                         style="width: 100%"
                         placeholder="请选择性别">
                <el-option label="男"
                           value="男"></el-option>
                <el-option label="女"
                           value="女"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 民族 政治面貌 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="民族"
                          prop="nationality">
              <el-select v-model="ruleForm.nationality"
                         style="width:100%"
                         placeholder="请选择民族">
                <el-option :label="item"
                           value="item"
                           v-for="(item,index) in nationality"
                           :key="index"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="政治面貌"
                          prop="politicalStatus">
              <el-select v-model="ruleForm.politicalStatus"
                         style="width: 100%"
                         placeholder="请选择政治面貌">
                <el-option :label="item"
                           :value="item"
                           v-for="(item,index) in politicsStatus"
                           :key="index"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 身份证号 联系方式 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="身份证号"
                          prop="credentialsNumber">
              <el-input v-model="ruleForm.credentialsNumber"
                        placeholder="请输入身份证号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系方式"
                          prop="tel">
              <el-input v-model="ruleForm.tel"
                        placeholder="请输入联系方式"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 行政区划 文化程度 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="行政区划"
                          prop="divisionCode">
              <el-cascader :props="props"
                           style="width: 100%"
                           v-model="ruleForm.divisionCode"
                           placeholder="行政区划">
              </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="文化程度"
                          prop="educationalLevel">
              <el-select v-model="ruleForm.educationalLevel"
                         style="width:100%"
                         placeholder="请选择文化程度">
                <el-option :label="item"
                           :value="item"
                           v-for="(item,index) in standardOfCulture"
                           :key="index"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 工作单位 担任职务 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="工作单位"
                          prop="workUnit">
              <el-input v-model="ruleForm.workUnit"
                        placeholder="请输入工作单位"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="担任职务"
                          prop="resource">
              <el-input v-model="ruleForm.job"
                        placeholder="请输入担任职务"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script> 

import commonList from '../../commonList'
// mixins
import mixin from "@/mixins"
import {
  nationality,  // 民族
  politicsStatus,   // 政治面貌
  standardOfCulture,   // 文化程度
} from "@/mappingFiles"   // 映射文件
export default {
  data () {
    return {
      dialogVisible: false,
      nationality,  // 56个民族
      politicsStatus,  // 政治面貌
      standardOfCulture,   // 文化程度
      ruleForm: {
      },
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        gender: [{ required: true, message: '请选择性别', trigger: 'blur' }]
      }
    }
  },
  mixins: [mixin],
  components: {
    commonList
  },
  methods: {
    handleClose () {
      this.dialogVisible = false
    },
    // 新增按钮
    addEmployee () {
      console.log('新增')
    }
  }
} 
</script>
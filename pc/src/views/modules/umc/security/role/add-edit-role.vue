<template>
  <el-dialog :title="dialogTitle"
             :visible.sync="dialogTableVisible"
             class="tasklist-table g-dialog "
             :close-on-click-modal="false"
             :close-on-press-escape="false"
             @close="dialogClose('ruleForm')">
    <el-form :model="ruleForm"
             :rules="rules"
             ref="ruleForm"
             label-width="120px"
             class="demo-ruleForm"
             size="small"
             :label-position="labelPosition">
      <div class="addUser-step">
        <el-row>
          <div class="accountInfo">
            <el-col :span="24">
              <el-form-item label="角色编码"
                            prop="roleId">
                <el-input v-model="ruleForm.roleId"
                          maxlength="20"
                          disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="角色名称"
                            prop="name">
                <el-input v-model="ruleForm.name"
                          maxlength="100"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="备注"
                            prop="note">
                <el-input v-model="ruleForm.note"
                          maxlength="40"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24"
                    class="text-center">
              <el-button @click="dialogClose('ruleForm')">取消</el-button>
              <el-button type="primary"
                         :loading="isLoading"
                         @click="saveRoleInfo('ruleForm')">保存</el-button>
            </el-col>
          </div>
        </el-row>
      </div>

    </el-form>
  </el-dialog>
</template>

<script>
import roleService from "@/api/user/role-manage";

export default {
  props: {

  },

  data () {
    return {
      isLoading: false,
      // 步骤当前激活状态
      active: 0,
      // 导航步骤与对应的三个表单
      dialogTableVisible: false,
      dialogTitle: '',
      dataListLoading: false,
      labelPosition: 'right',
      // 表单字段
      ruleForm: {
        roleId: '',
        name: '',
        note: '',
        parentRole: ''
      },
      // 表单校验字段
      rules: {
        roleId: [{ required: true, message: '角色编码不能为空', trigger: 'blur' }],
        parentRole: [{ required: true, message: '上级角色不能为空', trigger: 'blur' }],
        name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }]
      }
    }
  },
  computed: {

  },
  watch: {

  },

  methods: {
    init (dialogTitle) {
      this.isLoading = false
      this.dialogTableVisible = true
      this.dialogTitle = dialogTitle
    },
    // 初始化节点基本信息
    initData (data) {
      this.ruleForm = { ...data }
    },

    // 重置表单
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    dialogClose (formName) {
      this.active = 0
      this.$refs[formName].resetFields()
      this.dialogTableVisible = false
    },
    // 保存
    saveRoleInfo (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {}
          params.roleId = this.ruleForm.roleId
          params.name = this.ruleForm.name
          params.note = this.ruleForm.note
          params.parentRole = this.ruleForm.parentRole
          this.isLoading = true
            roleService.updateRole(params).then((data) => {
              if (data.status === 0) {
                this.$message({
                  message: '角色信息修改成功',
                  type: 'success',
                  duration: 1000
                })
                this.$emit('getUpdateData', this.ruleForm)
              } else {
                this.$message.warning(data.msg ? data.msg : '网络异常 请稍后重试')
              }
              this.isLoading = false
            })
            .catch(error => {
              this.isLoading = false
            })
        }
      })
    }

  }
}
</script>

<style lang="scss">
</style>

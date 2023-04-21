<template>
  <el-dialog :title="title"
             :visible.sync="dialogVisible"
             width="30%"
             :close-on-click-modal="false"
             :before-close="handleClose">
    <div style="margin-right: 10%;">
      <el-form :model="formData"
               :rules="rules"
               ref="formData"
               label-width="80px">
        <el-form-item label="字典编码"
                      prop="dictCode">
          <el-input :disabled="notEditFlag"
                    maxlength="32"
                    v-model="formData.dictCode"></el-input>
        </el-form-item>
        <el-form-item label="字典名称"
                      prop="dictName">
          <el-input maxlength="60"
                    v-model="formData.dictName"></el-input>
        </el-form-item>
        <el-form-item label="字典描述">
          <el-input type="textarea"
                    :autosize="{minRows: 6, maxRows: 6}"
                    placeholder="内容"
                    maxlength="100"
                    v-model="formData.note">
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary"
                 :loading="isLoading"
                 @click="saveForm('formData')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import dictSendService from "../../../../../api/dict/dict-send";

export default {
  data () {
    let validateCode = (rule, value, callback) => {
      if (value && value === this.originDictCode) {
        callback()
        return
      }
        dictSendService.isExistDict({ 'dictCode': value}).then((data) => {
          if (data.status !== 0) {
            callback(new Error('网络异常'))
            return
          }
          if (data.data) {
            callback(new Error('字典编号已存在'))
          } else {
            callback()
          }
        }).catch(error => {
          callback(new Error('网络异常'))
        })
    }
    return {
      originDictCode: '',
      isLoading: false,
      title: '保存',
      dialogVisible: false,
      setMan: undefined,
      notEditFlag: false,
      formData: {
        dictCode: '',
        dictName: '',
        note: '',
        setMan: ''
      },
      rules: {
        dictCode: [
          { required: true, message: '字典编号不能为空', trigger: 'blur' },
          { validator: validateCode, trigger: 'blur' }
        ],
        dictName: [
          { required: true, message: '字典名称不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  components: {},
  computed: {},
  mounted () {

  },
  watch: {
    dialogVisible (val) {
      !val && setTimeout(() => {
        this.$refs['formData'].resetFields()
      }, 0)
    }
  },
  methods: {
    init (row) {
      this.dialogVisible = true
      if (!row.dictCode) {
        this.originDictCode = ''
        this.notEditFlag = false
        this.title = '新增字典'
        this.formData = {
          dictCode: '',
          dictName: '',
          note: '',
          setMan: ''
        }
        return
      }
      this.originDictCode = row.dictCode
      this.formData = JSON.parse(JSON.stringify(row))
      this.title = '修改字典'
      this.notEditFlag = true
    },
    clearValidate (formName) {
      this.$refs[formName].resetFields()
    },
    handleClose () {
      this.clearValidate('formData')
      this.dialogVisible = false
    },
    updateDict () {
      if (!this.formData.dictName.length) {
        return
      }
      this.isLoading = true
        dictSendService.updateDicts(this.formData).then((data) => {
          this.isLoading = false
          if (data.status === 0) {
            this.$message({ message: '修改成功', type: 'success' })
            this.dialogVisible = false
            this.$emit('refreshDataList')
          } else {
            this.$message.warning(data.msg ? data.msg : '网络异常')
          }
        })
        .catch(error => {
          this.isLoading = false
        })
    },
    insertDict (formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return false
        }
        this.isLoading = true
         dictSendService.saveDict(this.formData).then((data) => {
            this.isLoading = false
            if (data.status === 0) {
              this.$message({ message: '添加成功', type: 'success' })
              this.dialogVisible = false
              this.$emit('refreshDataList')
            } else {
              this.$message.warning(data.msg ? data.msg : '网络异常')
            }
          })
          .catch(error => {
            this.isLoading = false
          })
      })
    },
    saveForm (formName) {
      if (this.originDictCode) {
        this.updateDict()
        return
      }
      this.insertDict(formName)
    }
  }
}
</script>
<style lang='scss' scoped>
.el-input--medium .el-input__inner {
  width: 250px;
}
</style>

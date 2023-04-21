<template>
  <el-dialog :title="title"
             :visible.sync="itemDialogVisible"
             width="30%"
             :close-on-click-modal="false"
             :before-close="handleClose">
    <div style="margin-right: 30px">
      <el-form :model="formData"
               :rules="rules"
               ref="formData"
               label-width="100px">
        <el-form-item label="编号"
                      prop="itemCode">
          <el-input :disabled="notEditFlag"
                    maxlength="32"
                    v-model="formData.itemCode"></el-input>
        </el-form-item>
        <el-form-item label="名称"
                      prop="itemValue">
          <el-input v-model="formData.itemValue"
                    maxlength="100"></el-input>
        </el-form-item>
        <el-form-item label="序号"
                      prop="sortNum">
          <el-input-number v-model="formData.sortNum"
                           :min="0"
                           :max="99999999999"></el-input-number>
        </el-form-item>
        <el-form-item label="是否启用"
                      prop="inUse">
          <el-switch :active-value="'1'"
                     active-text="启用"
                     :inactive-value="'0'"
                     inactive-text="停用"
                     v-model="formData.inUse"></el-switch>
        </el-form-item>
        <el-form-item label="字典项描述">
          <el-input type="textarea"
                    :autosize="{minRows: 6, maxRows: 6}"
                    :maxlength="100"
                    placeholder="内容"
                    v-model="formData.note">
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="itemDialogVisible = false">取 消</el-button>
      <el-button type="primary"
                 :loading="isLoading"
                 @click="saveForm">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import dictSendService from "../../../../../api/dict/dict-send";

export default {
  data () {
    let validateCode = (rule, value, callback) => {
        dictSendService.isExistDictItem(this.formData).then((data) => {
          if (data.status !== 0) {
            callback(new Error('网络异常'))
            return
          }
          if (data.data) {
            callback(new Error('字典项已存在'))
          } else {
            callback()
          }
        }).catch(error => {
          callback(new Error('网络异常'))
        })
    }
    return {
      isLoading: false,
      title: '保存',
      itemDialogVisible: false,
      notEditFlag: false,
      dictCode: '',
      setMan: '',
      queryParam: {
        dictCode: '',
        itemCode: '',
        parentCode: ''
      },
      formData: {
        dictCode: '',
        itemCode: '',
        itemValue: '',
        sortNum: '',
        note: '',
        inUse: '1'
      },
      rules: {
        itemCode: [
          { required: true, message: '字典项编号不能为空', trigger: 'blur' },
          { validator: validateCode, trigger: 'blur' }
        ],
        itemValue: [
          { required: true, message: '字典项名称不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  components: {},
  computed: {},
  mounted () {

  },
  watch: {
    itemDialogVisible (val) {
      !val && setTimeout(() => {
        this.$refs['formData'].resetFields()
      }, 0)
    }
  },
  methods: {
    init (dictCode, row) {
      this.isLoading = false
      this.dictCode = dictCode
      this.itemDialogVisible = true
      this.queryParam.dictCode = dictCode
      if (!row.itemCode) {
        this.dictCode = dictCode
        this.notEditFlag = false
        this.title = '新增字典项'

        this.formData.dictCode = dictCode
        this.formData.itemCode = ''
        this.formData.itemValue = ''
        this.formData.sortNum = ''
        this.formData.note = ''
        return
      }
      this.formData = JSON.parse(JSON.stringify(row))
      this.setMan = row.setMan
      this.title = '修改字典项'
      this.notEditFlag = true
    },
    clearValidate (formName) {
      this.$refs[formName].resetFields()
    },
    handleClose () {
      this.clearValidate('formData')
      this.itemDialogVisible = false
    },
    updateDictItem () {
      if (!this.formData.itemValue.length) {
        return
      }
      this.isLoading = true
      dictSendService.updateDictItem(this.formData) .then((data) => {
          this.isLoading = false
          if (data.status === 0) {
            this.$message({ message: '修改成功', type: 'success' })
            this.itemDialogVisible = false
            this.$emit('refreshDataList')
            return
          }
          this.$message({ message: '修改失败', type: 'warning' })
        })
        .catch(error => {
          this.isLoading = false

        })
    },
    insertDictItem (formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return false
        }
        this.isLoading = true
        dictSendService.saveDictItem (this.formData) .then((data) => {
            this.isLoading = false
            if (data.status === 0) {
              this.$message({ message: '添加成功', type: 'success' })
              this.itemDialogVisible = false
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
    saveForm () {
      if (this.notEditFlag) {
        this.updateDictItem()
        return
      }
      this.insertDictItem('formData')
    }
  }
}
</script>
<style lang='scss' scoped>
</style>

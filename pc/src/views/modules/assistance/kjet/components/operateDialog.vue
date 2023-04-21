<template>
  <el-dialog :title="operateTitle"
             :visible.sync="operateDialogVisible"
             width="30%"
             :before-close="operateHandleClose">
    <el-form :model="disposeResult"
             ref="disposeResult">
      <el-form-item label="处理结果">
        <el-select v-model="disposeResult.result"
                   style="width:100%"
                   placeholder="">
          <el-option label="同意"
                     value="同意"></el-option>
          <el-option label="退回"
                     value="退回"></el-option>
          <el-option label="退回重新核查"
                     value="退回重新核查"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="operateDialogVisible = false">取 消</el-button>
      <el-button type="primary"
                 @click="operateDialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "kjetOperateDialog",
  props: {
    // dialog title
    operateTitle: {
      type: String,
      default: "操作"
    },
    // dialog Visible
    operateDialogVisible: {
      type: Boolean,
      require: true
    }
  },
  data () {
    return {
      disposeResult: {

      }
    }
  },
  created () {

  },
  methods: {
    operateHandleClose () {
      this.$emit('operateHandleClose')
    }
  },
}
</script>

<style scoped lang='less'>
</style>

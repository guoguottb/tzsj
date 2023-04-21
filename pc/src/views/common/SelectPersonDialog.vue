<template>
   <el-dialog title="选择人物" :visible="dialogVisible" :before-close="thisBeforeClose">
      <p class="margin-b">姓名：张三 年龄：23</p>
      <el-button @click="sendPersonInfo">确定</el-button>
   </el-dialog>
</template>

<script>
export default {
   props: ['dialog-visible', 'before-close'],
   data() {
      return {
         
      }
   },
   methods: {
      thisBeforeClose() {
         this.beforeClose()
      },
      sendPersonInfo() {
         this.$emit('get-person', { name: '张三', age: 23 })
         this.beforeClose()
      }
   }
}
</script>
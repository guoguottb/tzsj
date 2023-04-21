/*
   为了解决表格组件不可以自动分页的需求，特别封装了这套分页表格组件。
   由于封装的组件接口较多，导致封装后的组件灵活度有限，本组件只封装了最基本的功能。
   如果有更灵活的需求，请分别使用表格组件(el-table)和分页组件(el-pagination)，
   不要修改本组件。
*/
<template>
   <div class="el-table-pagination">
      <el-table :data="data" style="width: 100%">
         <!-- 传入el-table-column -->
         <slot></slot>
      </el-table>
      <div class="pagination-con">
         <el-pagination layout="prev, pager, next, jumper, sizes" 
            :page-size.sync="aPageSize" :total="total" :page-sizes="pageSizes" :hide-on-single-page="false" :pager-count="5"
            @size-change="handleSizeChange" :current-page.sync="aCurrentPage" @current-change="handleCurrentChange">
         </el-pagination>
      </div>
   </div>
</template>

<script>
export default {
   name: 'ElTablePagination',
   props: ['data', 'page-sizes', 'total', 'page-size', 'current-page'],
   data() {
      return {
         aCurrentPage: this.currentPage,
         aPageSize: this.pageSize
      }
   },
   methods: {
      handleSizeChange(){
         this.$emit('size-change')
         this.$emit('update:page-size', this.aPageSize)
      },
      handleCurrentChange(){
         this.$emit('current-change')
         this.$emit('update:current-page', this.aCurrentPage)
      }
   }
}
</script>

<style lang="scss" scoped>
.pagination-con {
   margin-top: 10px;
   text-align: right;
}
</style>

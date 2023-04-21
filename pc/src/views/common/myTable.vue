<template>
  <div class="maxBox">
    <el-table ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
              :max-height="maxHeight"
              border
              @selection-change="handleSelectionChange">
      <!-- select 选择框-->
      <el-table-column type="selection"
                       width="55">
      </el-table-column>
      <!-- 展示列 -->
      <el-table-column :label="item.label"
                       v-for="(item,index) in tableInfo"
                       :key="index"
                       :width="item.width">
        <!-- :width="item.width" -->
        <template slot-scope="{row}">
          <p :title="row[item.value]"
             class="ellipsis">{{row[item.value]}}</p>
        </template>
      </el-table-column>
      <!-- 操作按钮 operate button -->
      <el-table-column label="操作"
                       :width="operateWidth"
                       fixed="right"
                       style="textAlign:center">
        <template slot-scope="scope">
          <!-- 按钮居中对齐 -->
          <el-button-group style="width:100%,textAlign:center"
                           class="buttons">
            <slot name="buttons"
                  :row="scope"></slot>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <div class="block"
         style="float:right;marginTop:20px">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="pageNo"
                     :page-sizes="pageSizes"
                     :page-size="pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="totalElements">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      multipleSelection: [],
    }
  },
  props: {
    // table
    tableData: {
      type: Array,
      default: () => {
        return {}
      },
      require: true
    },
    tableInfo: {
      type: Array,
      default: () => [],
      require: true
    },
    operateWidth: {
      type: Number,
      default: 240,
      require: false
    },
    maxHeight: {
      type: String,
      default: "300px",
      require: false
    },
    // foot page
    pageNo: {
      type: Number,
      default: 1,
      require: true,
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 50, 100],
      require: false
    },
    pageSize: {
      type: Number,
      default: 10,
      require: true,
    },
    totalElements: {
      type: Number,
      default: 0,
      require: true,
    }
  },
  created () {

  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    handleSizeChange (val) {
      this.$emit("handleSizeChange", val)
    },
    handleCurrentChange (val) {
      this.$emit("handleCurrentChange", val)
    }
  },
}
</script>

<style scoped lang='less'>
</style>

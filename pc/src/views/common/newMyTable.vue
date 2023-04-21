<template>
  <div>
    <!-- <el-form :model="searchForm"
             label-width="88px"
             inline
             class="demo-ruleForm">
      <el-form-item label="批次号"
                    prop="name">
        <el-input v-model="searchForm.name"
                  placeholder="请输入批次号"></el-input>
      </el-form-item>
      <el-form-item label="批次名称"
                    prop="name">
        <el-input v-model="searchForm.name"
                  placeholder="请输入批次名称"></el-input>
      </el-form-item>
      <el-form-item label="任务状态"
                    prop="region">
        <el-select v-model="searchForm.region"
                   placeholder="请选择任务状态">
          <el-option label="进行中"
                     value="进行中"></el-option>
          <el-option label="已完成"
                     value="已完成"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   ref="formSearchButton"
                   @click="searchList"
                   icon="el-icon-search">查询</el-button>
        <el-button type="info"
                   @click="resetForm"
                   icon="el-icon-refresh">重置</el-button>
      </el-form-item>
    </el-form> -->
    <!-- row-class-name="table-row" -->
    <el-table :data="tableData"
              :max-height="tableHeight"
              border
              @sort-change="sortChange"
              :header-cell-style="{background:'#f5f7fa',color:'#909399'}"
              :cell-style="{color:'#606266'}"
              :default-sort="{prop: 'date', order: 'descending'}"
              v-loading="loading">
      <!-- selece框 -->
      <el-table-column type="selection"
                       width="42"></el-table-column>
      <!-- 根据 columns 数组生成表格列 -->
      <el-table-column v-for="(column,index) in columns"
                       :key="index"
                       :sortable="column.sortable"
                       :label="column.label"
                       :prop="column.prop"
                       :min-width="column.minWidth"
                       :width="column.width"
                       :resizable="column.resizable"
                       :show-overflow-tooltip="column.showOverflowTooltip"
                       :formatter="column.formatter"
                       :render-header="column.renderHeader">
        <template slot-scope="{row}">
          <p :title="row[column.prop]"
             class="ellipsis">{{row[column.prop]}}</p>
        </template>
        <!-- show-overflow-tooltip / 当内容过长被隐藏时显示 tooltip / Boolean default:false -->
        <!-- formatter / 用来格式化内容 / Function(row, column, cellValue, index) -->
      </el-table-column>
      <!-- 表格分页 -->
      <el-table-column v-if="pagination"
                       label="操作"
                       :width="tableWidth">
        <template slot-scope="scope">
          <!-- 操作按钮环绕 -->
          <el-button-group>
            <slot name="buttons"
                  :row="scope"></slot>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格分页 -->
    <div v-if="pagination"
         class="pagination-wrapper">
      <el-pagination background
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total"
                     :page-size="pageSize"
                     :page-count="pageCount"
                     :current-page="pageNo"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 表格列配置
    columns: {
      type: Array,
      required: true
    },
    // 表格数据
    tableData: {
      type: Array,
      required: true
    },
    // 表格数据
    tableHeight: {
      type: Number,
      default: 480,
    },
    // 表格数据
    tableWidth: {
      type: Number,
      default: 120,
    },
    // 是否显示表格分页
    pagination: {
      type: Boolean,
      default: false
    },
    // 每页显示数据条数
    pageSize: {
      type: Number,
      default: 10
    },
    // 总数据条数
    total: {
      type: Number,
      default: 0
    },
    // 当前页码
    pageNo: {
      type: Number,
      default: 1
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {

    }
  },
  computed: {
    // 计算总页数
    pageCount () {
      return Math.ceil(this.total / this.pageSize)
    },
  },
  methods: {
    // 处理每页显示数据条数变化
    handleSizeChange (pageSize) {
      this.$emit('update:pageSize', pageSize)
      this.$emit('size-change', pageSize)
    },
    // 处理当前页码变化
    handleCurrentChange (pageNo) {
      this.$emit('update:pageNo', pageNo)
      this.$emit('current-change', pageNo)
    },
    sortChange (object) {
      this.$emit('sortChange', object)
    }
  }
}
</script>

<style lang="less" scope>
.pagination-wrapper {
  margin-top: 20px;
  display: flex;
  justify-content: end;
}
/deep/.table-row:hover {
  background-color: #d10d0d !important;
}
</style>
<!-- 父组件使用方法 -->
<!-- <template>
  <div class="g-box">
    <my-table :columns="columns"
              :table-data="tableData"
              :pagination="true"
              :page-size.sync="pageSize"
              :total="total"
              :current-page.sync="pageNo"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange">
      <template slot="buttons"
                slot-scope="{row}">
        <el-button type="primary"
                   @click="viewRowInfo(row.row)">查看</el-button>
      </template>
    </my-table>
  </div>
</template>

<script>
import myTable from '@/views/common/newMyTable'

export default {
  components: {
    myTable
  },
  data () {
    return {
      searchForm: {
        name: "",
        region: "",
      },
      columns: [
        { label: '姓名', prop: 'name', minWidth: 100 },
        { label: '年龄', prop: 'age', minWidth: 100 },
        { label: '性别', prop: 'gender', minWidth: 100 }
      ],
      tableData: [{
        age: '2016-05-02',
        name: '王小虎',
        gender: '上海市普陀区金沙江路 1518 弄'
      }, {
        age: '2016-05-04',
        name: '王小虎',
        gender: '上海市普陀区金沙江路 1517 弄'
      }, {
        age: '2016-05-01',
        name: '王小虎',
        gender: '上海市普陀区金沙江路 1519 弄'
      }, {
        age: '2016-05-03',
        name: '王小虎',
        gender: '上海市普陀区金沙江路 1516 弄'
      }],
      pageSize: 10,
      total: 0,
      pageNo: 1,
      tableLoading: false,
    }
  },
  mounted () {
    this.getTableData()
  },
  methods: {
    getTableData (object) {
      // TODO：从后端获取表格数据
      console.log(object)
    },
    handleSizeChange (row) {
      // TODO：处理每页显示数据条数变化
      console.log(row)
    },
    handleCurrentChange (row) {
      // TODO：处理当前页码变化
      console.log(row)
    },
    viewRowInfo (row) {
      // TODO：查看当前行
      console.log(row)
    },
    // 搜索 
    searchList () {
      this.pageNo = 1
      this.total = 0
      this.getTableData({
        batchNo: this.searchForm.batchNo,
        title: this.searchForm.title,
        taskStatus: this.searchForm.taskStatus,
        pageNo: this.pageNo,
        pageSize: this.pageSize,
      })
    },
    resetForm () {
      console.log("重置")
    }
  }
}
</script> -->
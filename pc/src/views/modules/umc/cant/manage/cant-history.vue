<template>
    <div>
        <div>
            <el-table :data="tableData" stripe border ref="showTable" style="width: 100%">
                <el-table-column type="index" :index="getStartPageNo" width="60" label="序号"></el-table-column>
                <el-table-column align="left" prop="source.cantCode" label="行政区划代码" :show-overflow-tooltip="true" width="auto"></el-table-column>
                <el-table-column align="left" prop="source.cantName" label="行政区划名称" :show-overflow-tooltip="true" width="auto">
                </el-table-column>
                <el-table-column align="left" prop="source.shortName" label="行政区划简称" :show-overflow-tooltip="true"
                    width="auto"></el-table-column>
                <el-table-column align="left" prop="source.cantType" label="行政区划类型" :show-overflow-tooltip="true" width="auto"></el-table-column>
                <el-table-column align="left" prop="operateTime" :formatter="operateTimeFormat" label="变更时间"
                    :show-overflow-tooltip="true" width="auto"></el-table-column>
                <el-table-column align="left" prop="operator" label="变更人" :show-overflow-tooltip="true" width="auto"></el-table-column>
                <el-table-column align="left" prop="operate" :formatter="operateFormat" :show-overflow-tooltip="true"
                    label="变更类型" width="auto"></el-table-column>
            </el-table>
            <el-pagination background layout="total, sizes, prev, pager, next" :total="pageTotal" :page-size="pageParam.pageSize"
                :page-sizes="[5, 10, 20, 50,100]" :current-page="pageParam.page + 1" @size-change="handleSizeChange"
                @current-change="handleCurrentChange"></el-pagination>
        </div>
    </div>
</template>
<script>
    import {
        formatTime
    } from '@/utils/index.js'

    import cantListService from '@/api/cant/cant-list'
import historyService from "@/api/other/historyService";
    const histUrls = {
        query: 'history/cant'
    }
    export default {
        data() {
            return {
                tableData: [],
                cantTypeList: [],
                pageTotal: 0,
                pageParam: {
                    source: {},
                    page: 0,
                    pageSize: 10,
                    needTotal: true,
                    sortFiled: '',
                    sortAsc: ''
                }
            }
        },
        components: {},
        computed: {
            getStartPageNo() {
                return this.pageParam.page * this.pageParam.pageSize + 1
            }
        },
        created() {

        },
        methods: {
            init(row) {
                this.pageParam.source = row && row.cantId ? {
                        cantId: row.cantId
                    } :
                    {
                        organId: this.$store.state.common.organId
                    }
                this.queryList()
                this.getCantTypeList()
            },
            getCantTypeList() {
                cantListService.listAllCantTypes({
                    'inUse': 1
                }).then(data => {
                    if (data.status === 0 && data.data) {
                        this.cantTypeList = data.data.rows
                        this.cantTypeFormat()
                    }
                })
            },

            async queryList() {
                let res = await historyService['getCantHistory'](this.pageParam);
                this.tableData = res.rows
                this.pageTotal = res.totalCount
            },

            backToMainList() {
                this.$emit('backListPage')
            },
            // table 处理基本函数 start
            handleSizeChange(pageSize) {
                this.pageParam.page = 0
                this.pageParam.pageSize = pageSize
                this.queryList()
            },
            handleCurrentChange(currentPage) {
                this.pageParam.page = currentPage - 1
                this.queryList()
            },
            // table 处理基本函数 end
            // table 格式化 start
            operateTimeFormat(row, col) {
                return formatTime(new Date(row.operateTime * 1000))
            },
            operateFormat(row, col) {
                if (row.operate === '1') {
                    return '修改'
                } else if (row.operate === '2') {
                    return '删除'
                }
                return ''
            },
            cantTypeFormat() {
                this.tableData.forEach(item => {
                    this.cantTypeList.forEach(ele => {
                        if (item.source.cantType === ele.cantType) {
                            item.source.cantType = ele.typeName
                            return false
                        }
                    })
                })
            }
            // table 格式化 end
        }
    }
</script>
<style lang='scss' scoped>

</style>

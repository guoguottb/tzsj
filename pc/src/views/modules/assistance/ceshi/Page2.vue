<template>
<div style="width: 100%;height: 10vh;margin-top:30px;overflow-y:auto;border:1px solid #ddd; border-radius: 4px; box-sizing: border-box; " >
    <!-- <span>我爱中国！</span> -->
    <el-table :data="tableData"   style="width: 100%;height: 50vh;overflow-y:auto">
        <el-table-column prop="ip" label="身份证" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="150"></el-table-column>
        <el-table-column label="上传结果"></el-table-column>
    </el-table>

</div>

 
</template>

<script>
export default {
    data () {
        return {
            tableData: []
        }
    },
    methods:{

    }
}
</script>

<style>

</style>
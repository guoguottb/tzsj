<template>
    <div>
        <table class="top_2">
            <tr style="height:40px;">
                <td style="width:10%; padding: 0px 0px 0px 10px;">姓名: </td>
                <td style="width:40%; font-size: 16px;">{{data.abm_ex3}} <span v-if="data.death == true" style="color: red;font-weight: bold;">(已死亡)</span></td>
                <td style="width:10%; padding: 0px 0px 0px 10px;">身份证:</td>
                <td style="width:40%; font-size: 16px;">{{data.abm_ex2}}</td>
            </tr>
        </table>
        <el-table style="width: 100%" :data="data.ass">
            <el-table-column label="救助内容列表" style="text-align:left">  
                <el-table-column prop="jznr" label="救助内容"   min-width="260"></el-table-column>
                <el-table-column label="办理进度" style="text-align:left"> 
                    <el-table-column prop="step1" label="申请"   min-width="60"></el-table-column>
                    <el-table-column prop="step2" label="退回"   min-width="60"></el-table-column>
                    <el-table-column prop="step3" label="委托确认"   min-width="80"></el-table-column>
                    <el-table-column prop="step4" label="信息核对"   min-width="80"></el-table-column>
                    <el-table-column prop="step5" label="初审"   min-width="60"></el-table-column>
                    <el-table-column prop="step6" label="公示"   min-width="60"></el-table-column>
                    <el-table-column prop="step7" label="审批"   min-width="60"></el-table-column>
                    <el-table-column prop="step8" label="办结/注销"   min-width="80"></el-table-column>
                </el-table-column>
                <el-table-column label="残疾两项补贴" style="text-align:left"> 
                    <el-table-column prop="step9" label="最近发放月份"   min-width="100"></el-table-column>
                    <el-table-column prop="step10" label="补贴金额"   min-width="80"></el-table-column>
                </el-table-column>
            </el-table-column>
        </el-table>
        <div style="padding-top: 20px"></div>
    </div>
</template><script>
	export default {
		name: "RepeatWarnTable",
        props: ["data"],
		components: {
		},
        data() {
            return {
            }
        }
    }
</script>

<style scoped>

	.top_2 {
		width: 100%;
	}
</style>

<template>
    <div>
        <h3 class="line_blue">&emsp;承包山林土地情况</h3>
        <div class="lineSt"></div>
        <div class="top_1">
            <el-table style="width: 100%" :data="lands">
                <el-table-column label="承包山林土地情况" style="text-align:center">
                    <el-table-column prop="abl_ex1" label="承包人姓名"   min-width="110"></el-table-column>
                    <el-table-column prop="abl_ex2" label="承包面积(亩)"  min-width="190"></el-table-column>
                    <el-table-column prop="abl_ex3" label="土地类型"   min-width="130"></el-table-column>
                    <el-table-column prop="abl_ex4" label="土地估值(元)"   min-width="130"></el-table-column>
                    <el-table-column prop="abl_ex5" label="备注"   min-width="200"></el-table-column>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
	import request from '@/utils/request'
	export default {
		name: "LandView",
        props: [],
		components: {
		},
        data() {
            return {
                lands: []
            }
        },
        created() {
            this.loadData();
        },
        methods: {
            loadData() {
                this.loadLand({
					"sId": this.$route.query.sId,
				}).then(res => {
					this.lands = res[0].data;
				}).catch(res => {
                    if(!this.requestError(res)) return false;
					this.lands = res.response.data[0].data;
				})
            },
			loadLand(data){
				return request({
					method: 'post',
					url: '/social/assistance/getBasicLand',
					data: data
				});
			},
            requestError(res){
                if(typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200){
                    console.log('请求失败了-----------------------6')
                    this.$message.error('数据获取失败或请求超时')
                    this.$emit("closes", false)
                    this.$router.go(-1)
                    return false
                }
                return true;
            }
        }
    }
</script>

<template>
    <div>
        <h3 v-if="showTitle" class="line_blue">&emsp;重复预警</h3>
        <div v-if="showTitle" class="lineSt"></div>
        <div>
            <repeatWarnTable v-for="item in datas"
                :key="item.ibm_ex2"
                :data="item">
            </repeatWarnTable>
            <!-- <div v-if="!showTitle.default" style="color:#999; margin:10px 0 20px;font-size:16px; ">暂无重复预警数据</div> -->
        </div>
    </div>
</template>

<script>
	import request from '@/utils/request'
	import repeatWarnTable from '@/views/modules/assistance/qzsq/components/repeatWarnTable.vue'
	export default {
		name: "RepeatWarnView",
        props: {
            "showTitle": {default: true}
        },
		components: {
            repeatWarnTable
		},
        data() {
            return {
                datas: []
            }
        },
        created() {
            this.loadData();
        },
        methods: {
            loadData() {
                this.loadRepeatWarn({
					"sId": this.$route.query.sId,
				}).then(res => {
					this.datas = res[0].data.member;
                    this.isRepeat = res[0].data.repeat;
				}).catch(res => {
                    if(!this.requestError(res)) return false;
					this.datas = res.response.data[0].data.member;
                    this.isRepeat = res.response.data[0].data.repeat;
				});
            },
            vss(d){
                var h = [];
                for(var k in d){
                    h.push(k + "=" + d[k]);
                }
                return h.join("\r\n");
            },
			loadRepeatWarn(data){
                //alert(data.sId)
				return request({
					method: 'post',
					url: '/social/assistance/getBasicRepeatWarn',
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

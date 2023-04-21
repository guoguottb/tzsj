<template>
    <div>
        <h3 class="line_blue">&emsp;代理人信息</h3>
        <div class="lineSt"></div>
        <div class="top_1">
            <table class="top_2">
                <tr style="height:40px;">
                    <td style="width:10%; padding: 0px 0px 0px 10px;">姓名: </td>
                    <td style="width:40%;">{{agents.aba_ex1}}</td>
                    <td style="width:10%; padding: 0px 0px 0px 10px;">身份证号:</td>
                    <td style="width:40%;">{{agents.aba_ex3}}</td>
                </tr>
            </table>

            <el-row>
                <el-col :span="12">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>身份证(<span style='color:red'>{{agents.aba_ex4.split(',')[0]=="" ? 0 : agents.aba_ex4.split(',').length}}</span>)</span>
                        </div>
                        <div class="block c">
                            <image-view :imgList="agents.aba_ex4.split(',')" id="aba_ex4"></image-view>
                        </div>
                    </el-card> 
                </el-col>
                <el-col :span="12">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix c">
                            <span>委托书(<span style='color:red'>{{agents.aba_ex5.split(",")[0]=="" ? 0 :agents.aba_ex5.split(",").length}}</span>)</span>
                        </div>
                        <div class="block c">
                            <image-view :imgList="agents.aba_ex5.split(',')" id="aba_ex5"></image-view>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
	import request from '@/utils/request'
	import imageView from '@/views/modules/assistance/imageView'

	export default {
		name: "AgentView",
        props: [],
		components:{
			imageView
		},
        data() {
            return {
                agents: {
                    aba_ex1: "",
                    aba_ex2: "",
                    aba_ex3: "",
                    aba_ex4: "",
                    aba_ex5: ""
                }
            }
        },
        created() {
            this.loadData();
        },
        methods: {
            loadData() {
				//代理人信息
				this.loadAgent({
					"sId": this.$route.query.sId
				}).then(res => {
					this.agents = res[0].data
				}).catch(res => {
					if(typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200){
						console.log('请求失败了-----------------------')
						this.$message.error('数据获取失败或请求超时')
						this.$emit("closes", false)
						this.$router.go(-1)
						return false
					}
					this.agents = res.response.data[0].data
				});
            },
			loadAgent(data) {
				return request({
					url: '/social/assistance/getBasicAgent',
					method: 'post',
					data: data
				})
			}
        }
    }
</script>
<style scoped>
	.top_1 {
		margin-bottom: 50px;
	}
	.top_2 {
		width: 100%;
	}
    .c{
        text-align: center;
    }
</style>

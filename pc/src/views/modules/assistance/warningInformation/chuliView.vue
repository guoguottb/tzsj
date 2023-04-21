<template>
	<div class="g-box">
		<div class="g-box2">
			<el-row type='flex' justify='center' style='padding-top: 40px;'>
				<el-col :span='6' :push='3'><div>处理人:</div></el-col>
				<!-- <el-col :span='6' :pull='1'><div>{{uName}}</div></el-col> -->
				<el-col :span='6' :pull='1'><div>管理员</div></el-col>
			</el-row>
			<el-row type='flex' justify='center' style='padding-top: 40px;'>
				<el-col :span='6' :push='3'>处理意见:</el-col>
				<el-col :span='6' :pull='1'>
					<el-input v-model='ayj_ex13' type='textarea' :rows='4' placeholder='请输入内容'></el-input>
				</el-col>
			</el-row>
			<el-row type='flex' justify='center' style='padding-top: 40px;'>
				<el-col :span='2'>
					<el-button type='primary' @click='confirm'>确定</el-button>
				</el-col>
				<el-col :span='2'>
					<el-button @click='closeView'>返回</el-button>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import request from '@/utils/request'
	export default{
		data(){
			return{
				ayj_ex13:'',
				uName:this.$route.query.name
			}
		},
		created(){
		},

		methods:{
			closeView() {
				this.$emit("closes", false)
				this.$router.go(-1)
			},
			confirm(){
				if(this.ayj_ex13 ==''){
					this.$message.warning('请输入处理意见')
					return false
				}else{
					let sType=this.$route.query.sType;
					let sUrl="/social/assistance/chuliSave";
					if(this.$route.query.hflag=='火化处理'){
					    sUrl="/social/assistance/handelHH"
					}
					const loading = this.$loading({
						lock: true,
						text: 'Loading',
						spinner: 'el-icon-loading',
						background: 'rgba(0, 0, 0, 0.7)'
					});
					// setTimeout((loading)=>{
					// 	loading.close()
					// },2000)
					// 设置定时器，30秒请求失败刷新页面
					let time = setTimeout(()=>{
									loading.close()
									this.$emit("closes", false)
									this.$message.error("网络异常");
									this.$router.go(-1)
								},30000)
					this.chuliSave({
						sId:this.$route.query.sId,
						ayj_ex13:this.$route.query.ayj_ex13,
						type:this.$route.query.type,
						before_data:this.$route.query.before_data,
						after_data:this.$route.query.after_data,
					},sUrl).then(()=>{
						
					}).catch((res)=>{
						// 数据请求成功删除定时器
						clearTimeout(time);
						loading.close()
						if(res.response.data[0].status=='+Ok'){
							this.$message.success(res.response.data[0].msg)
							this.$emit("closes")
							this.$router.go(-1)
						}else{
							this.$message.error(res.response.data[0].msg)
						}
					})
				}
			},
			chuliSave(data,url){
				return request({
					url,
					method:'post',
					data
				})
			},

		}
	}
</script>

<style scoped>

</style>

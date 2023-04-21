<template>
	<div class="g-box">
		<div class="g-box2">
			<el-row type='flex' justify='center' style='padding-top: 40px;'>
				<el-col :span='6' :push='3'><div>取消人:</div></el-col>
				<el-col :span='6' :pull='1'><div>{{uName}}</div></el-col>
			</el-row>
			<el-row type='flex' justify='center' style='padding-top: 40px;'>
				<el-col :span='6' :push='3'>取消原因:</el-col>
				<el-col :span='6' :pull='1'>
					<el-input v-model='ayj_ex16' type='textarea' :rows='4' placeholder='请输入内容'></el-input>
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
				ayj_ex16:'',
				uName:''
			}
		},
		created(){
			this.loadData()
		},
		watch:{
			'$route': 'fetchData',
		},
		methods:{
			fetchData(){
				this.loadData()
			},
			loadData(){
				this.ayj_ex16 = this.$route.query.ayj_ex16
				this.getUser().then((res)=>{
					console.log(res)
				}).catch((res)=>{
					if(typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200){
						console.log('请求失败了-----------------------')
						this.$message.error('数据获取失败或请求超时')
						this.$emit("closes", false)
						this.$router.go(-1)
						return false
					}
					console.log(res.response)
					this.uName = res.response.data[0].username
				})
			},
			closeView() {
				this.$emit("closes", false)
				this.$router.go(-1)
			},
			confirm(){
				if(this.ayj_ex16 ==''){
					this.$message.warning('请输入取消原因')
					return false
				}else{
					let sType=this.$route.query.sType;
					let sUrl="";
					if(sType==1){
					    //新增申请、核查等的取消
					    sUrl="/social/assistance/handelCommonality";
					}else if(sType==2){
					    //已派单的取消
					    sUrl="/social/assistance/cancelYj";
					}else if(sType==3){
					    //重复对比的取消
					    sUrl="/social/assistance/cfCancel";
					}else if(sType==4){
					    //其他的取消
					    sUrl="/social/assistance/handelOther";
					}else if(sType==5){
					    //火化的取消
					    sUrl="/social/assistance/handelHH";
					}else if(sType==6){
					    //变动数据的取消
					    sUrl="/social/assistance/changeCancel";
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
					this.handelCommonality({
						// uName:this.uName,
						ayj_ex16:this.ayj_ex16,
						sId:this.$route.query.sId,
						type:this.$route.query.type,
						status:this.$route.query.status,
						ayj_id:this.$route.query.ayj_id,
						// repeat:this.$route.query.repeat,
						// cId:this.$route.query.cId,
						// ab_ex13:this.$route.query.type,
						// aef_ex4:this.$route.query.aef_ex4,
						// before_data:this.$route.query.before_data,
						// after_data:this.$route.query.after_data,
						// curYM:this.$route.query.curYM,
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
			handelCommonality(data,url){
				return request({
					url,
					method:'post',
					data
				})
			},
			getUser(){
				return request({
					url:'/social/assistance/getuser',
					method:'post',
				})
			}
		}
	}
</script>

<style scoped>

</style>

<template>
	<div class="g-box">
		<div class="g-box2">
			<el-row type='flex' justify='center' style='padding-top: 40px;'>
				<el-col :span='6' :push='3'><div>姓名:</div></el-col>
				<el-col :span='6' :pull='1'><div>{{ab_ex3}}</div></el-col>
			</el-row>
			<el-row type='flex' justify='center' style='padding-top: 40px;'>
				<el-col :span='6' :push='3'><div>身份证:</div></el-col>
				<el-col :span='6' :pull='1'><div>{{ab_ex7}}</div></el-col>
			</el-row>
			<el-row type='flex' justify='center' style='padding-top: 40px;'>
				<el-col :span='6' :push='3'><div>派单部门:</div></el-col>
				<el-col :span='6' :pull='1'>
					<el-select v-model='ab_ex13' placeholder='请选择派单部门'>
						<el-option v-for='(item,index) in optionValue' :label='item.label' :value='item.value' :key='index'></el-option>
					</el-select>
				</el-col>
			</el-row>
			<el-row type='flex' justify='center' style='padding-top: 40px;'>
				<el-col :span='6' :push='3'>派单原因:</el-col>
				<el-col :span='6' :pull='1'>
					<el-input v-model='ayj_ex20' type='textarea' :rows='4' placeholder='请输入内容'></el-input>
				</el-col>
			</el-row>
			<el-row v-if='isBtnShow' type='flex' justify='center' style='padding-top: 40px;'>
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
				ab_ex13 : '',
				ayj_ex20 : '',
				ab_ex3:'',
				ab_ex7:'',
				isBtnShow:true,
				optionValue:[
					{
						label:'城乡低保',
						value:'低保'
					},{
						label:'特困供养',
						value:'特困供养'
					},{
						label:'低收入家庭',
						value:'低收入家庭'
					},
					// {
					// 	label:'残疾人两项补贴',
					// 	value:'残疾人两项补贴'
					// },{
					// 	label:'困境儿童',
					// 	value:'困境儿童'
					// },
					{
						label:'临时救助',
						value:'临时救助'
					},
					// {
					// 	label:'尊老金',
					// 	value:'尊老金'
					// },{
					// 	label:'下放职工',
					// 	value:'下放职工'
					// },{
					// 	label:'建档立卡',
					// 	value:'建档立卡'
					// },{
					// 	label:'医疗救助',
					// 	value:'医疗救助'
					// },{
					// 	label:'教育救助',
					// 	value:'教育救助'
					// },{
					// 	label:'住房救助',
					// 	value:'住房救助'
					// },{
					// 	label:'灾害救助',
					// 	value:'灾害救助'
					// },{
					// 	label:'就业救助',
					// 	value:'就业救助'
					// },{
					// 	label:'司法援助',
					// 	value:'司法援助'
					// },{
					// 	label:'工会救助',
					// 	value:'工会救助'
					// },{
					// 	label:'红会救助',
					// 	value:'红会救助'
					// },{
					// 	label:'社会组织救助',
					// 	value:'社会组织救助'
					// },{
					// 	label:'慈善救助',
					// 	value:'慈善救助'
					// },{
					// 	label:'其他救助',
					// 	value:'其他救助'
					// }
				]
			}
		},
		watch:{
			$route:'fetchData'
		},
		created() {
			console.log(this.$route.query)
			console.log(88887)
			this.loadData()
		},
		methods:{
			fetchData() {
				console.log('路由发送变化doing...');
				console.log(this.$route.query)
				this.loadData()
			},
			loadData(){
				this.ab_ex3 = this.$route.query.ab_ex3
				this.ab_ex7 = this.$route.query.ab_ex7	
				this.ayj_ex20 = this.$route.query.ayj_ex20
				this.ab_ex13 = this.$route.query.ab_ex13
				let yj = this.$route.query.ab_ex3 + ',' + this.$route.query.ab_ex7 + ',' +this.$route.query.ab_ex13
				let paidan = this.$route.query.ayj_ex8 //是否派单
				let quxiao = this.$route.query.ayj_ex4 //是否取消
				if(paidan || quxiao){
					this.isBtnShow = false
				}
				if(this.$route.query.ab_ex13=='低收入'){
					this.ab_ex13 = '低收入家庭'
				}else if(this.$route.query.ab_ex13=='法律援助'){
					this.ab_ex13 = '司法援助'
				}else{
					this.optionValue.find((item)=>{
						if(item.value == this.$route.query.ab_ex13){
							this.ab_ex13 = item.value
						}
						return item.value == this.$route.query.ab_ex13
					})
				}
			},
			closeView() {
				this.$emit("closes", false)
				this.$router.go(-1)
			},
			confirm(){
				if(this.ab_ex13 ==''){
					this.$message.warning('请选择派单部门')
					return false
				}else if(this.ayj_ex20 ==''){
					this.$message.warning('请输入派单原因')
					return false
				}else{
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
					this.distribute2({
						// ayj_ex1:this.$route.query.ayj_ex1,
						ayj_ex1:'assistance_basic',
						// ayj_ex3:this.$route.query.ayj_ex3,
						ayj_ex3:'申请',
						tId:this.$route.query.ayj_ex5,
						ab_ex13:this.$route.query.ab_ex13,
						ayj_ex20:this.$route.query.ayj_ex20,
					}).then((res)=>{
						console.log(res)
					}).catch((res)=>{
						// 数据请求成功删除定时器
						clearTimeout(time);
						loading.close()
						if(res.response.data[0].status == '+OK'){
							this.$message.success(res.response.data[0].msg)
							this.$emit("closes")
							this.$router.go(-1)
						}else{
							this.$message.error(res.response.data[0].msg)
						}
					})
				}
			},
			distribute2(data){
				return request({
					url:'/social/assistance/distribute2',
					method:'post',
					data:data
				})
			}
		}
	}
</script>

<style scoped>

</style>

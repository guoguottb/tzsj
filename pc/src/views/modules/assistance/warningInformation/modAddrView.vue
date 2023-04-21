<template>
	<div class="g-box">
		<div class="g-box2">
			<el-row type='flex' justify='center' style='padding-top: 40px;'>
				<el-col :span='6' :push='3'><div>姓名:</div></el-col>
				<el-col :span='6' :pull='1'><div>{{uName}}</div></el-col>
			</el-row>
			<el-row type='flex' justify='center' style='padding-top: 40px;'>
				<el-col :span='6' :push='3'>行政区划:</el-col>
				<el-col :span='6' :pull='1'>
					<!-- <el-cascader :props="props" v-model="xzqhArray" placeholder="请选择" style="width:100%;" v-if="isFinish"></el-cascader> -->
					<el-cascader :props="props" v-model="xzqhArray" v-if="isFinish" placeholder="请选择" style="width:100%;"></el-cascader>
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
				isFinish:false,
				xzqhArray:[],
				props: {
					lazy: true,
					lazyLoad(node, resolve) {
						const { level } = node; // 获取当前node对象中的level属性
						let pId="0";
						if(level>0){
							let value=node.value;
							if(value){
								let values=value.split("#")
								pId=values.length>1 ? values[1]:"0";
							}
							
						}
						request({
							url:"/social/assistance/getCityOption",
							method:"post",
							data:{
								pId:pId
							}
						}).then(res => {
						}).catch(res=>{
							console.log(res)
							const nodes = res.response.data;
							nodes.forEach(item => {
								item.value = item.cs_ex2+"#"+item.cs_ex1;
								item.label = item.cs_ex2;
								item.leaf = level >= 2; //判断是否为末尾节点，这个地方是0,1,2三级
							})
							resolve(nodes);
						})
					}
				},
				uName:this.$route.query.ab_ex3,
				oldAb_ex1:'',
				oldAb_ex2:'',
				oldAb_ex161:'',
				oldAb_ex162:'',
				
				ab_ex162:'',
				ab_ex161:'',
				ab_ex1:'',
				ab_ex2:'',
			}
		},
		created() {
			this.loadData()
		},
		watch:{
			$route(){
				this.loadData()
			},
			xzqhArray(newA,oldA){
				let qu = newA[0].split("#")[0]
				let cun = newA[1].split("#")[0]
				let zhen = newA[2].split("#")[0]
				// let i =qu+"#"+cun+"#"+zhen
				this.ab_ex162 = newA[0]+","+newA[1]+","+newA[2]
				this.ab_ex161 = qu
				this.ab_ex1 = zhen
				this.ab_ex2 = cun
				// console.log(i)
			}
		},
		methods:{
			loadData(){
				this.isFinish = false
				let ab_ex1 = this.$route.query.ab_ex1
				let ab_ex2 = this.$route.query.ab_ex2
				let ab_ex161 = this.$route.query.ab_ex161
				let ab_ex162 = this.$route.query.ab_ex162
				this.oldAb_ex1 = ab_ex1
				this.oldAb_ex2= ab_ex2
				this.oldAb_ex161 = ab_ex161
				this.oldAb_ex162 = ab_ex162
				// 要先清空xzqhArray,不然跳别的页面因为路由跳转如果其他页面没有值会导致它的值不更改
				let  xzqhArray=this.$route.query.ab_ex162.split(",");
				if(xzqhArray.length==3){
					this.$set(this.xzqhArray,0,xzqhArray[0]);
					this.$set(this.xzqhArray,1,xzqhArray[1]);
					this.$set(this.xzqhArray,2,xzqhArray[2]);
				}else{
					this.xzqhArray=[]
				}
				this.isFinish = true
				// 测试
				// this.xzqhArray=["高港区#321203000000","口岸街道#321203001000","引江社区居委会#321203001001"]
			},
			closeView() {
				this.$emit("closes", false)
				this.$router.go(-1)
			},
			confirm(){
				if(this.xzqhArray.length!=3){
					this.$message.warning('请选择行政区划')
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
					this.modAddr({
						sId:this.$route.ab_ex7,
						ab_ex3:this.uName,
						ab_ex2:this.ab_ex2,
						ab_ex1:this.ab_ex1,
					}).then((res)=>{
						console.log(res)
					}).catch((res)=>{
						// 数据请求成功删除定时器
						clearTimeout(time);
						console.log(res)
						loading.close()
						if(res.response.data[0].status=='+Ok'){
							this.$message.success('行政区划修改成功')
							this.$emit("closes")
							this.$router.go(-1)
						}else{
							this.$message.error('行政区划修改失败')
						}
					})
				}
			},
			modAddr(data){
				return request({
					url:'/social/assistance/modAddr',
					method:'post',
					data:data
				})
			}
		}
	}
</script>

<style scoped>

</style>

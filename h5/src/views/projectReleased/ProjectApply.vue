<template>
	<div class="policyMessage">
		<header>
			<div class="title">爱在星期天-陪伴关怀社区空巢(独居、寡居)老人</div>
			<div class="headerspan"><span class="headerspan1">发布者：泰兴救助平台</span><span class="headerspan2">2021年05月25日</span></div>
		</header>
		<main>
			<div class="maindiv" @click="submit">
				<span>报名前请仔细阅读下文，确认您是否符合报名条件以及报名须知！</span>
				<el-button type="primary" size="mini" round style="height: 30px;margin-left: 10px;margin-right: 10px;">立即报名</el-button>
			</div>
			<img style="border-radius: 10px;margin-bottom: 20px;" width="100%" src="../../assets/img/project/love.jpg" alt="">
			<div class="font2">银桂社区的金桂小区廉租房有十几户孤寡老人。未婚无子女，生活困难。众合帮了解这—情况后，对接银桂社区，并在2021年5月23日开展了《礼赞百年爱心向党2021年第一期慈善项目爱在星期天-陪伴关怀社区空巢(独居、寡居)老人》并带着物资慰问看望低保、低边的孤寡老人。</div>
		</main>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			submit(){
				this.$message.success("报名成功")
				setTimeout(()=>{
					this.$router.back(-1)
				},200)
			}
		}
	}
</script>

<style scoped>
	.policyMessage{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	header{
		margin-top: 40px;
		width: 90%;
	}
	.title{
		text-align: left;
		font-size: 34px;
		font-weight: bold;
		margin-bottom: 20px;
	}
	.headerspan{
		display: flex;
		color: #666666;
		font-size: 30px
	}
	.headerspan span{
		flex: 1;
	}
	.headerspan1{
		text-align: left;
	}
	.headerspan2{
		text-align: right;
	}
	main{
		width: 90%;
		display: flex;
		flex-direction: column;
		/* align-items: center; */
		text-align: left;
	}
	.maindiv{
		width: 100%;
		height: 130px;
		background-color: #e8e8e8;
		/* background-color: #f5f5f5; */
		margin-top: 50px;
		margin-bottom: 50px;
		display: flex;
		border-radius: 20px;
		overflow: hidden;
		/* justify-content: center; */
		align-items: center;
	}
	.maindiv span{
		font-size: 28px;
		padding-left: 20px;
		padding-right: 20px;
	}
	.font2{
		font-size: 28px;
		margin-bottom: 20px;
		line-height: 50px;
	}

</style>

<template>
	<div>
		<header>
			<div></div>
		</header>
		<div class="linkdiv">
			<a @click="routerPush('/participation')">慈善捐赠</a>
			<a href="https://mp.weixin.qq.com/s/iNXUQQV0Rf_g8rBmt5rawg">捐赠公示</a>
		</div>
		<main style="margin-top: 10px;">
			<div class="maindiv" @click="routerPush('/ProjectApply')">
				<img width="100%" src="../../assets/img/project/projectimg.png" alt="">
				<div class="maindivfont1">爱在星期天-陪伴关怀社区空巢(独居、寡居)老人</div>
				<div class="maindivfont2">2021年爱在星期天-陪伴关怀社区空巢(独居、寡居)老人是针对社区孤寡老人设立的志愿服务慈善慰问项目。</div>
				<div class="maindivF"><span class="maindivFSpan">1天前</span><el-button class="maindivFButton" type="primary" size="mini">立即报名</el-button></div>
			</div>
			<div class="maindiv" @click="routerPush('ProjectMessage')">
				<!-- <img width="100%" src="../../assets/img/project/headerimg.png" alt=""> -->
				<div class="maindivfont1">慈善助困，访贫问暖</div>
				<div class="maindivfont2">每年元且过后，春节来临，为了让困难群众过上一个快乐、祥和的新春佳节，市慈善总会对因病、因灾或意外事故造成经济、生活困难的家庭户经核实后进行慰问，发放救助金。</div>
				<div class="maindivF"><span class="maindivFSpan">11天前</span><el-button class="maindivFButton" type="primary" size="mini">活动结束</el-button></div>
			</div>
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
			routerPush(url){
				this.$router.push({
					path:url,
				})
			}
		}
	}
</script>

<style scoped>
	header {
		display: flex;
		justify-content: center;
		background: url(../../assets/img/policy/policybg.png) no-repeat;
		/* background-color: #42B983; */
		background-size: 100% 90%;
		margin-bottom: 20px;
	}
	.linkdiv{
		display: flex;
		justify-content: space-around;
		font-size: 30px;
		color:#333333
	}
	.linkdiv>a{
		background-color: rgba(93, 223, 145, 0.4);
		box-shadow: 5px 5px 5px 5px #d0c9a2;
		padding: 2px;
	}
	header>div {
		width: 90%;
		height: 350px;
		margin-top: 80px;
		background: url(../../assets/img/project/headerimg.png);
		background-size: 100% 100%;
	}

	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		color:#333333
		/* justify-content: center; */
	}

	.maindiv {
		width: 90%;
		/* border: 1px solid #2C3E50; */
		box-shadow: 0px 0px 10px 10px #e3eee9;
		border-radius: 20px;
		overflow: hidden;
		margin-bottom: 50px;
	}

	.maindivfont1 {
		text-align: left;
		font-size: 34px;
		font-weight: bold;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin-top: 20px;
		margin-bottom: 20px;
	}

	.maindivfont2 {
		color: #666666;
		font-size: 30px;
		word-break: break-all;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		margin-bottom: 20px;
	}
	.maindivF{
		display: flex;
		justify-content: space-between;
		padding-left: 10px;
		padding-right: 10px;
		margin-top: 20px;
		margin-bottom: 20px;
	}
	.maindivFSpan{
		text-align: left;
		display: flex;
		align-items: center;
		color: #666666;
	}
	.maindivFButton{
		
	}
</style>

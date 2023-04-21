<template>
	<div>
		<header>
			<div></div>
		</header>
		<main>
			<div class="maindiv">
				<div class="font1">编号：202105225136</div>
				<div class="font2">姓名：方**</div>
				<div class="font2">地址：江苏省-泰兴市</div>
				<div class="font2 font3">需求：天气炎热起来,低保户想要一台电风扇</div>
				<img class="maindivimg" src="@/assets/img/participation/participationImg3.jpg" alt="">
				<div class="maindiv2">
					<span>2021-05-22 14:39:18</span>
					<el-button type="primary" size="mini" @click="submit">我要救助</el-button>
				</div>
			</div>
			<div style="background-color: #f5f5f5;width: 100%;display: flex;flex-direction: column;align-items:center;">
				<div class="maindiv">
					<div class="font1">编号：202105015556</div>
					<div class="font2">姓名：邵**</div>
					<div class="font2">地址：江苏省-泰兴市</div>
					<div class="font2 font3">需求：三无人员，体弱无业，每月依靠特困金生活，家中电饭煲已坏—个月，想要一个电饭煲烧饭...</div>
					<img class="maindivimg" src="@/assets/img/participation/participationImg1.jpg" alt="">
					<div class="maindiv2">
						<span>2021-03-01 14:39:18</span>
						<el-button type="primary" size="mini" @click="submit">我要救助</el-button>
					</div>
				</div>
			</div>
			<div class="maindiv">
				<div class="font1">编号：202105035587</div>
				<div class="font2">姓名：郑**</div>
				<div class="font2">地址：江苏省-泰兴市</div>
				<div class="font2 font3">需求：本人郑宝发，今年59周岁，平时靠捡垃圾为生，没有其他收入，所以生活拮据，想要大米和油。</div>
				<img class="maindivimg" src="@/assets/img/participation/participationImg2.jpg" alt="">
				<div class="maindiv2">
					<span>2021-05-03 11:02:18</span>
					<el-button type="primary" size="mini" @click="submit">我要救助</el-button>
				</div>
			</div>
			<div style="background-color: #f5f5f5;width: 100%;display: flex;flex-direction: column;align-items:center;">
				<div class="maindiv">
					<div class="font1">编号：202105205666</div>
					<div class="font2">姓名：陈**</div>
					<div class="font2">地址：江苏省-泰兴市</div>
					<div class="font2 font3">需求：低保人员，无经济来源，夏天到了需要一台电风扇</div>
					<div class="maindiv2">
						<span>2021-05-20 14:39:18</span>
						<el-button type="primary" size="mini" @click="submit">我要救助</el-button>
					</div>
				</div>
			</div>

			<div class="maindiv">
				<div class="font1">编号：202105015159</div>
				<div class="font2">姓名：柴**</div>
				<div class="font2">地址：江苏省-泰兴市</div>
				<div class="font2 font3">需求：电风扇，凉席</div>
				<div class="maindiv2">
					<span>2021-05-01 11:39:58</span>
					<el-button type="primary" size="mini" @click="submit">我要救助</el-button>
				</div>
			</div>

			<div style="background-color: #f5f5f5;width: 100%;display: flex;flex-direction: column;align-items:center;">
				<div class="maindiv">
					<div class="font1">编号：202101215136</div>
					<div class="font2">姓名：统**</div>
					<div class="font2">地址：江苏省-泰兴市</div>
					<div class="font2 font3">需求：开化县苏庄镇中心小学的留守儿童们生活用品陈日简陋，卫生条件较差。</div>
					<div class="maindiv2">
						<span>2021-01-21 14:28:18</span>
						<el-button type="primary" size="mini" @click="submit">我要救助</el-button>
					</div>
				</div>
			</div>
		</main>
	</div>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {
			submit() {
				this.$confirm('确认要领取此救助任务吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '领取成功!'
					});
				}).catch(() => {
					// this.$message({
					// 	type: 'info',
					// 	message: '已取消删除'
					// });
				});
			}
		}
	}
</script>

<style scoped>
	header div{
		width: 100%;
		height: 380px;
		background:url(../../assets/img/participation/bg.png) no-repeat;
		background-size: 103% 100%;
		overflow: hidden;
		border-radius: 10px 10px 10px 10px;
	}
	main {
		color: #333333;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.maindiv {
		width: 90%;
		text-align: left;
		margin-bottom: 20px;
	}

	.font1 {
		/* color: cornflowerblue; */
		font-size: 34px;
		font-weight: bold;
		margin-top: 20px;
		margin-bottom: 14px;
	}

	.font2 {
		font-size: 28px;
		line-height: 48px;
		color: #666666;
		/* overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap; */

		/* 规定自动换行的处理方法：允许在单词内换行 */
		word-break: break-all;
		/* 文本溢出显示省略符号来代表被修剪的文本 */
		text-overflow: ellipsis;
		/* 父元素设置该属性后，作用与display:flex类似，子元素可在一行显示，且实现自适应。 */
		display: -webkit-box;
		/* 从上向下垂直排列子元素 */
		-webkit-box-orient: vertical;
		/* 限制在一个块元素显示的文本的行数 */
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.font3 {
		height: 90px;
	}

	.maindiv2 {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.maindiv2 span {
		font-size: 30px;
		color: #666666;
	}

	.maindivimg {
		width: 140px;
		height: 150px;
		border-radius: 10px;
		margin-top: 10px;
	}
</style>

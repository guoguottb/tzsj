<template>
	<div class="login">
		<el-form ref="loginForm" :show-message='false' :model="loginForm" :rules="loginRules" class="login-form">
			<img class="loginImg" src="../assets/logo.png" alt="">
			<h3 class="title">泰兴市大救助一体化平台</h3>
			<el-form-item prop="username">
				<el-input class="loginInput" v-model="loginForm.username" type="text" auto-complete="off" placeholder="请输入账号"></el-input>
			</el-form-item>
			<el-form-item prop="password">
				<el-input class="loginPassword" type="password" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码"></el-input>
			</el-form-item>
			<el-form-item style="width:100%;">
				<el-button class="loginPassword" :loading="loading" size="medium" type="primary" @click.native.prevent="handleLogin">
					<span v-if="!loading">登 录</span>
					<span v-else>登 录 中...</span>
				</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import request from '@/utils/request.js'
	export default {
		name: 'Login',
		data() {
			return {
				loginForm: {
					// username: '321200000000',
					// password: '123',
					username: localStorage.getItem('username'),
					password: localStorage.getItem('password'),
				},
				loginRules: {
					username: [{
						required: true,
						trigger: "blur",
						message: "用户名不能为空"
					}],
					password: [{
						required: true,
						trigger: "blur",
						message: "密码不能为空"
					}]
				},
				loading: false,
			}
		},
		watch: {},
		methods: {
			handleLogin() {
				this.$refs.loginForm.validate(valid => {
					if (valid) {
						this.loading = true;
						request({
							method: 'post',
							url: '/social/login',
							data: {
								username:this.loginForm.username,
								password:this.loginForm.password
							},
						}).then(res => {
							sessionStorage.setItem('token', res[0].token)
							localStorage.setItem('username',this.loginForm.username)
							localStorage.setItem('password',this.loginForm.password)
							this.loading = false
							// 如果没有 router没有 redirect，跳转到主页，主要针对直接进入login页面登录跳转不了
							if(res[0].status=='ok'){
								if(!this.$route.query.redirect){
									this.$router.push({
										path:'/'
									})
								}else{
									this.$router.push({
										path:this.$route.query.redirect
									})
								}
							}else{
								this.$alert('账号或密码错误')
							}
						}).catch(error => {
							this.loading = false
							console.log(error)
						})
					}else{
						this.$toast.fail('请输入账号或密码')
					}
				});
			},
		}
	}
</script>

<style scoped>
	.login {
		/* background-size: 100% 100%; */
		/* background: url(../assets/img/bg/bg1.png) right bottom no-repeat / 650px,
			url(../assets/img/bg/bg2.png) 0px 0px no-repeat rgba(22, 121, 190, 1) / 500px 580px; */
			background: url(../assets/img/bg/bg1.png) 0 0 no-repeat,url(../assets/img/bg/bg2.png) 0 600px no-repeat;
			background-size: 100% 500px,100% 100%;
		width: 100%;
		height: 100%;
		position: fixed;
	}
	.login-form{
		margin-top: 100px;
	}
	.title{
		color: white;
		font-size: 34px;
	}
	.loginImg{
		width: 98px;
		height: 98px;
		border-radius: 50%;
	}
	.loginInput{
		width: 400px;
		margin-top: 100px;
	}
	.loginPassword{
		width: 400px;
	}
</style>

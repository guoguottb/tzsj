<template>
	<div class="talk">
		<div class="fontDiv">意见或者建议</div>
		  <van-field
		    v-model="data1"
		    rows="6"
		    autosize
		    type="textarea"
		    placeholder="请输入留言"
		  />
		  <div class="fontDiv">添加图片</div>
		  <van-cell>
			  <!-- <van-uploader v-model="fileList" multiple :after-read="uploadImg()" /> -->
			  <van-uploader v-model="fileList" :before-read="beforeRead" :after-read="uploadImg(1)" :before-delete="beforeDelete('image')" />
		  </van-cell>
		<div class="fontDiv">选填，方便我们与你联系</div>
		<van-field v-model="data2" type="tel" rows="1" autosize placeholder="请输入您的手机号,便于我们联系" />
		<van-button style="width: 94%;margin-top: 20px;" type="info" @click='submit'>提交</van-button>
	</div>
</template>

<script>
	import request from '@/utils/request.js'
	import {compressImg} from '@/utils/utils.js'
	export default{
		data(){
			return{
				data1:'',
				data2:'',
				fileList: [],
				image:'',
			}
		},
		methods:{
			beforeRead(file){
				if(file.type == 'image/heic' || file.type==''){
					this.$toast.fail('照片格式不正确')
					return false
				}else{
					return true
				}
			},
			imgRequest(param,file,num){
				request({
					method:'post',
					url: '/social/minios/fileUpload',
					data:param,
				}).then(res=>{
					file.status = 'done';
					file.message = '上传完成';
					console.log(res)
				if(num == 1){
					if(this.image){
						this.image = this.image.concat(',',res[0].filename)
					}else{
						this.image = this.image.concat(res[0].filename)
					}
				}
				}).catch(erro=>{
					file.status = 'failed';
					file.message = '上传失败';
					if(num == 1){
						this.fileList.pop()
					}
					this.$toast.fail('上传失败')
					console.log(erro)
				})
			},
			uploadImg(num) {
				return file=>{
					console.log(file)
					console.log(num)
					file.status = 'uploading';
					file.message = '上传中...';
					
					let obj = new compressImg(file,num,this.imgRequest)
					
				}
			},
			beforeDelete(data){
				return (file,detail)=>{
					let arr = this[data].split(',')
					arr.splice(detail.index,1)
					this[data] = arr.join(',')
					
					console.log(this[data])
					console.log(data)
					console.log(file)
					console.log(detail)
					return true
				}
			},
			submit(){
				var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
				if (!myreg.test(this.data2)) {
					this.$toast.fail('请填写正确的手机号')
				}else{
					request({
						method:'post',
						url:'/social/assistanceWeixin/saveMessageBoard',
						data:{
							amb_ex1:this.data1,
							amb_ex2:this.image,
							amb_ex3:this.data2
						}
					}).then(res=>{
						console.log(res)
						this.$dialog.alert({
							message: res[0].msg
						}).then(()=>{
							this.$router.back(-1)
						})
					}).catch(erro=>{
						
					})
				}
			}
		}
	}
</script>

<style scoped>
	.talk{
		width: 100%;
		height: 100%;
		position: fixed;
		display: flex;
		flex-direction: column;
		align-items: center;
		/* background-color: #ecf4f2; */
		background-color: #f5f5f5;
		font-size: 34px;
	}
	.fontDiv{
		color: #008B8B;
		width: 100%;
		text-align: left;
		margin-left: 60px;
		margin-top: 20px;
		margin-bottom: 20px;
	}
</style>

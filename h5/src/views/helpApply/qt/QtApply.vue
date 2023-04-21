<template>
<!-- 其他救助 -->
	<div class="helpApply">
		<header>
			<div class="headerHead">
				<div>
					<div :class="{headerF:isShow2}">{{this.title}}申请</div>
				</div>
			</div>
		</header>
		<main>
			<div id="page1" v-show="page1" style="display: block;padding-top: 20px;">
				<div class="page1Div1">
					<div class="page1Div2">
						<span style="background-color: #333333;display: inline-block;width: 5px;height: 10px;"></span>
						<span style="color: #333333;">基本信息</span>
					</div>
					<van-form ref='apply'  style="margin-top: 20px;">
						<van-field required v-model="form2.aa_ex6" name="aa_ex6" maxlength="10" label="姓名" placeholder="姓名" :rules="rules.rules2" >
                            <template #button>
								<!-- <van-button size="small" type="info" :disabled="hqyzmDis" native-type="button" @click='hqyzm'>拍照识别</van-button> -->
                                <van-uploader :before-read="beforeRead" :after-read="uploadImg('IDCard')" :before-delete="beforeDelete('photo')" >
                                    <van-button size="small" type="info" native-type="button" >拍照识别
                                    </van-button>
                                </van-uploader>
							</template>
                        </van-field>
						<van-field required v-model="form2.aa_ex5" name="aa_ex5" label="身份证号" placeholder="身份证号" @input="changeCard1($event,'aa_ex7')" :rules="rules.rules3" />
                        <van-field v-model="form2.aa_ex7"  name="aa_ex7" label="性别" placeholder="性别" />
                        <van-field required name="aa_ex1" v-model="form2.aa_ex1" readonly  label="申请类型"></van-field>
						<van-field required v-model="ab_ex162_2"  name="ab_ex162_2" center readonly label="行政区划" placeholder="请选择所在行政区划" @click="show = true" :rules="rules.rules4">
						</van-field>
						<van-popup v-model="show" round position="bottom">
							<van-cascader title="请选择所在行政区划" :options="options" @click="show = false" @finish="onFinish" />
						</van-popup>

						<van-field required v-model="form2.aa_ex8" name="aa_ex8" label="家庭住址"  type="textarea" rows="1" placeholder="家庭住址" :rules="rules.rules5" autosize />


						<van-field required v-model="form2.aa_ex9" center type="number" name="aa_ex9" label="联系电话" placeholder="联系电话" :rules="rules.rules8">
							<template #button>
								<van-button size="small" type="info" :disabled="hqyzmDis" native-type="button" @click='hqyzm'>{{hqyzmtext}}</van-button>
							</template>
						</van-field>
						<van-field required v-model="form2.yanzm" center name="yanzm" type="number" label="验证码" placeholder="验证码" :rules="[{ required: true, message: '请填写验证码' }]" />


						<div style="margin: 16px 0 16px 0;display: flex;justify-content: space-around;">
							<van-button block type="info" @click="save">提交</van-button>
							<!-- <van-button block type="info" native-type="button" @click="next1">下一步</van-button> -->
						</div>
					</van-form>
				</div>
			</div>
		</main>
		<footer>
		</footer>
	</div>
</template>

<script>
	import request from '@/utils/request.js'

	import {compressImg,tszfValidate,tszfFilter,tszfFilter2,getAge,getBirthday,getSex,xzqh,isCardID} from '@/utils/utils.js'
	export default {
		data() {
			return {
				isShow: true,
				isShow2: false,
				// isShow3: false,
				checked: false,
				page1: true,
				page2: false,
				// page3: false,
				hqyzmtext:'获取验证码',
				m:60,
				rules:{
					rules1:[
						{
							required:true,
							message:'请选择申请方式',
							trigger:'onBlur'
						}
					],
					rules2:[
						{
							required:true,
							message:'请填写姓名',
							trigger:'onBlur'
						}
					],
					rules3:[
						{
							required:true,
							message:'请填写身份证号',
							trigger:'onBlur'
						}
					],
					rules4:[
						{
							required:true,
							message:'请选择行政区划',
							trigger:'onBlur'
						}
					],
					rules5:[
						{
							required:true,
							message:'请填写家庭住址',
							trigger:'onBlur'
						}
					],
					rules8:[
						{
							required:true,
							message:'请填写联系电话',
							trigger:'onBlur'
						}
					],
					// rules10:[
					// 	{
					// 		required:true,
					// 		message:'请选择患病类别',
					// 		trigger:'onBlur'
					// 	}
					// ],
					// rules11:[
					// 	{
					// 		required:true,
					// 		message:'请选择参保险种',
					// 		trigger:'onBlur'
					// 	}
					// ],
					
				},
                form2:{
                    aa_id:'',
                    aa_ex1:this.$route.query.type,
                    aa_ex2:'',
                    aa_ex3:'',
                    aa_ex4:'',
                    aa_ex5:'',
                    aa_ex6:'',
                    aa_ex7:'',
                    aa_ex8:'',
                    aa_ex9:'',
					yanzm:'',	//输入验证码
                },
				
				fileList: [], //图片数据
				fileList2: [],
				fileList3: [],
				fileList4: [],

				ab_ex162:'',
				ab_ex162_2:'',
				yzm:'',    //正确验证码
				show: false,
				// 获取验证码按钮禁用状态
				hqyzmDis:false,
				// 选项列表，children 代表子选项，支持多级嵌套
				options: [],
                title:this.$route.query.type  //协助申请类型标题
			}
		},
		created() {
			// 根据Home页面给的userId来获取用户信息（userId为通号提供以链接形式拼在后面？userId=...）
			// request({
			// 	method:'post',
			// 	url: '/social/assistanceWeixin/getUserInfo',
			// 	params:{
			// 		userId:localStorage.getItem("cs_userId") ? localStorage.getItem("cs_userId") : ""
			// 	}
			// }).then(res=>{
			// 	console.log(res)
			// 	if(res.success){
			// 		this.form.ab_ex7 = res.data.cardNo
			// 		this.form.ab_ex28 = res.data.phone
			// 		this.form.ab_ex3 = res.data.userName
			// 		this.form.ab_ex69 = res.data.sex
					
			// 	}
			// }).catch(error=>{
            //     console.log(11);
            //     console.log(this.$route.query.type);
			// 	this.$toast.fail('数据请求失败')
			// })

            request({
					method:'post',
					url: '/social/assistanceWeixin/getCitys',
					data:{}
				}).then(res=>{
					// console.log(res,'接口区划');
					// 市区
					for(let i in res){
						this.options.push({text:'',value:'',children:[]});
						this.options[i].text = res[i].n.split('#')[0];
						this.options[i].value =	'#'+ res[i].n.split('#')[1];
						// 街道
						for(let j in res[i].c){
							// this.options[i].children=[]
							this.options[i].children[j]={text:'',value:'',children:[]};
							this.options[i].children[j].text =	res[i].c[j].n.split('#')[0];
							this.options[i].children[j].value =	'#'+ res[i].c[j].n.split('#')[1];
							// 村居
							for(let k in res[i].c[j].a){
								this.options[i].children[j].children[k]={text:'',value:''};
								this.options[i].children[j].children[k].text =	res[i].c[j].a[k].split('#')[0];
								this.options[i].children[j].children[k].value =	'#'+ res[i].c[j].a[k].split('#')[1];
							}

						}

					}
					// console.log( this.options,'区划');
					
				}).catch(res=>{
					console.log(res,'xzqh');
					this.$toast.fail('数据请求失败1')
				})

            console.log(this.form2.aa_ex1);
		},
		methods: {
			changeCard1(value,sex){
				if(isCardID(value) == ''){
					this.$set(this.form2,sex,getSex(value))
				}
			},
			next1() {
				// 去除姓名的空白符号并且判断姓名是否合法
				this.form2.aa_ex6 = this.form2.aa_ex6.replace(/\s*/g,"")
				let tszf = tszfValidate(this.form2.aa_ex6)
				if(tszf){
					this.$toast.fail("请输入正确的姓名")
					return false
				}
				// 判断身份证是否合法
				let msg = isCardID(this.form2.aa_ex5)
				if(msg){
				  this.$toast.fail(msg)
				  return false
				}
				
				// request({
				//   method:'post',
				//   url: '/social/assistanceWeixin/checkRepeat',
				//   data:{
				// 	ab_ex13:this.form.ab_ex13,
				// 	ab_ex7:this.form.ab_ex7,
				// 	ab_ex3:this.form.ab_ex3
				//   }
				// }).then(res=>{
				//   console.log(res)
				//   if(res[0].status == '+OK'){
					console.log(this.form2)
					// this.$refs.apply.validate().then(()=>{
					document.getElementsByClassName('helpApply')[0].scrollTop = 0
					  this.page1 = false
					  this.page2 = true
					  this.isShow = false
					  this.isShow2 = true
				// 	}).catch((err)=>{
				// 	  console.log(err)
				// 	  this.$toast.fail(err[0].message)
				// 	})
				//   }else{
				// 	this.$toast.fail(res[0].msg)
				//   }
				// }).catch(error=>{
				//   this.$toast.fail('数据请求失败')
				// })
			},
			back2() {
				this.page1 = true
				this.page2 = false
				this.isShow = true
				this.isShow2 = false
			},
			save() {
				

                this.form2.aa_ex6 = this.form2.aa_ex6.replace(/\s*/g,"")
				let tszf = tszfValidate(this.form2.aa_ex6)

				if(tszf){
					this.$toast.fail("请输入正确的姓名")
					return false
				}
				// 判断身份证是否合法
				let msg = isCardID(this.form2.aa_ex5)
				if(msg){
				  this.$toast.fail(msg)
				  return false
				}

				var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
				if (!myreg.test(this.form2.aa_ex9)) {
					this.$toast.fail('请填写正确的手机号')
					return false
				}

				// 判断验证码是否正确
				if(!this.yzm ||	this.yzm!=this.form2.yanzm){
					// 测试用(等于0可以继续下一步)
					if(this.form2.yanzm != '0'){
						this.$toast.fail('验证码错误')
						return false
					}
					return false
				}

				console.log('执行到');

				// 遮罩
				let toast = this.$toast({
					type:'loading',
					message:'提交中...',
					overlay:true,
					duration:0
				})
				
				// 提交
				request({
					method:'post',
					url: '/social/assistanceWeixin/saveApply',
					data:{
						data:JSON.stringify(this.form2),
						// type: '申请'
					},
				}).then(res=>{
					toast.clear()

					this.$dialog.alert({
						message: '提交成功',
					}).then(()=>{
						this.$router.push('/apply')
					})

					console.log(res)
				}).catch(error=>{
					toast.clear()
					// 提示提交失败
					this.$toast.fail('提交失败')
					console.log(error)
				})
			},
				// 区划全部选项选择完毕后，会触发 finish 事件
			onFinish({selectedOptions}) {
				
			
				this.show = false;
				console.log(selectedOptions.map((option) => option.text));
				let area = selectedOptions.map((option) => option.text);
				let area2 = selectedOptions.map((option) => option.text+option.value);
				this.form2.aa_ex3 = area[2];
				this.form2.aa_ex4 = area[1];
				this.form2.aa_ex2 = area[0];
				this.ab_ex162_2 = area.join('/');
				// this.form.ab_ex162 = area2.join(',');
				this.form2.aa_ex2 = area2.join(',');
				// 更改家庭住址
				if(this.form2.aa_ex8==''){
					this.form2.aa_ex8=area[0]+area[1]+area[2];
				}
			},
				

            // 获取验证码
			hqyzm(){
				var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
				if (!myreg.test(this.form2.aa_ex9)) {
					this.$toast.fail('请填写正确的手机号')
					return false
				}
				// 获取验证码
				console.log('-----------------')
				
				request({
					method:'get',
					url: '/social/assistanceWeixin/sendSMS',
					params:{
						mobiles:this.form2.aa_ex9
					},
				}).then(res=>{
					if(res.status == '+OK'){
						this.$toast.success('发送成功')
						this.yzm = res.data.securityCode
					}else{
						this.$toast.fail(res.msg)
					}
				}).catch(error=>{
					this.$toast.fail("验证码发送失败")
					console.log(error)
				})
				
				console.log('-----------------')
				// 倒计时
				this.hqyzmtext = this.m+'s'
				this.hqyzmDis = true
				let time = setInterval(()=>{
				this.m--
				this.hqyzmtext = this.m+'s'
				if(this.m==0){
					this.hqyzmtext = '获取验证码'
					this.m = 60
					this.hqyzmDis = false
					
					clearInterval(time)
				}
				},1000)
			},
				
			

			beforeRead(file){
				if(file.type == 'image/heic' || file.type==''){
					this.$toast.fail('照片格式不正确')
					return false
				}else{
					return true
				}
			},
			
			imgRequest(formData,file,num,index){

                console.log(file,'照片文件');
				// console.log('index',index);
				request({
				 	method: 'post',
					url: '/social/weixinMinios/fileUpload',
					data: formData,
				}).then(res => {
					file.status = 'done';
				 	file.message = '上传完成';
					console.log(res);

					// console.log('1111', num,'imgRequest-num');
					// 身份证照片识别 自动填报姓名、身份证等
					if(num.indexOf('IDCard')!=-1){
					
						// 需要发送身份证照片到后台获取身份证号和姓名是否和前面输入的身份证号，姓名相同
						request({
							method:'post',
							url:'/social/assistanceWeixin/idOrc',
							data:{
								img:file.content
							}

						}).then(res=>{

								console.log(res,'res');
								// console.log(res[0].data.words_result,'res');

								if(res[0].status == 'ok'){
							
										try{

											let data = res[0].data.words_result;
											console.log(data);

											if(num=='IDCard'){

												this.form2.aa_ex6 = data["姓名"].words;
												data["公民身份号码"].words = data["公民身份号码"].words.replace(/\s+/g,""); 
												this.form2.aa_ex5 = data["公民身份号码"].words;
												this.form2.aa_ex8 = data["住址"].words;
												this.form2.aa_ex7 = data["性别"].words;

											}

										}catch(e){
											console.log(e);
											this.fileList2.pop()
											this.$toast.fail('身份证对比信息不符,请上传正确的身份证')
										}
									
								}else{
									this.fileList2.pop()
									this.$toast.fail('身份证对比信息不符,请上传正确的身份证')
								}
							
							
						}).catch(err=>{
							console.log(err)
						})

					}

				}).catch(error => {
				 	file.status = 'failed';
				 	file.message = '上传失败';
				 	this.$toast.fail('上传失败')
				 	console.log(error)
				})
			},
			// 组件方法 获取 流
			uploadImg(num,index) {
				return file => {
					file.status = 'uploading';
					file.message = '上传中...';
					
					console.log(file.file)
					
					// 执行压缩图片并上传
					let obj = new compressImg(file,num,this.imgRequest,index)
					
				}
			},

			// 删除
			beforeDelete(data){
				return (file,detail)=>{
					let arr = this.form[data].split(',')
					arr.splice(detail.index,1)
					this.form[data] = arr.join(',')
					
					console.log(this.form[data])
					console.log(data)
					console.log(file)
					console.log(detail)
					return true
				}
			},
		}
	}
</script>

<style scoped>
	.headerF {
		color: #333333;
	}
	.marginstyle {
		margin: 10px;
	}
	.helpApply {
		width: 100%;
		height: 100%;
		background-color: #f5f5f5;
		background-size: 100% 100%;
		position: fixed;
		overflow: auto;
	}

	header {
		width: 100%;
		height: 100px;
		background-color: #3e80cc;
		box-shadow: 0px 0px 30px #a1a1a1;
		position: fixed;
		z-index: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28px;
		color:#ffffff;
	}

	.headerHead {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size:36px;
	}

	/* 	.headerCircle{
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background-color: #008B8B;
	} */
	.headerRectangle {
		width: 100px;
		height: 8px;
		background-color: #e2e2e2;
		border-radius: 10px;
		margin: 0 20px 0 20px;
	}

	main {
		margin-top: 100px;

	}
	.page1Div1{
		padding:0 20px 0 20px;
		text-align: left;
	}
	.page1Div2{
		border-bottom:#aaa solid 1px;
		font-size: 30px;
	}
	.page2Class{
		/* width:80%;
		margin-left:4%;
		height:200px;
		font-size:16px;
		color:#333333;
		padding-left:20px;
		padding-right:20px;
		margin-top:10px;
		border-radius: 15px;
		border:#aaa solid 1px; */
		width:90%;
		margin-left:5%;
		height:400px;
		font-size:34px;
		color:#333333;
		/* padding:0 20px 0 20px; */
		margin-top:10px;
		border-radius: 15px;
		border:#aaa solid 1px;
		margin-top: 140px;
	}
	.page2Class2{
		overflow: auto;
		margin-top: 10px;
		margin-left:5%;
		width:90%;
		height:500px;
		font-size:34px;
		color:#333333;
		border-radius: 15px;
		border:#aaa solid 1px;
	}
</style>

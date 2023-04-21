<template>
	<div class="helpApply">
		<header>
			<div class="headerHead">
				<div>
					<div :class="{headerF:isShow}">在线填表</div>
					<!-- <div class="headerCircle"></div> -->
				</div>
				<div class="headerRectangle"></div>
				<div>
					<div :class="{headerF:isShow2}">材料申报</div>
					<!-- <div class="headerCircle"></div> -->
				</div>
<!--				<div class="headerRectangle"></div>-->
<!--				<div>-->
<!--					<div :class="{headerF:isShow3}">材料申报</div>-->
<!--					&lt;!&ndash; <div class="headerCircle"></div> &ndash;&gt;-->
<!--				</div>-->
			</div>
		</header>
		<main>
			<div id="page1" v-show="page1" style="display: block;padding-top: 20px;">
				<div class="page1Div1">
					<div class="page1Div2">
						<span style="background-color: #333333;display: inline-block;width: 5px;height: 10px;"></span>
						<span style="color: #333333;">基本信息</span>
					</div>
					<van-form ref='apply' @submit="next1" style="margin-top: 20px;">
						<van-field required name="ab_ex75" label="申请方式" :rules="rules.rules1">
							<template #input>
								<van-radio-group v-model="form.ab_ex75" direction="horizontal">
									<van-radio name="委托代理">代申请</van-radio>
									<van-radio name="本人">本人</van-radio>
								</van-radio-group>
							</template>
						</van-field>
						<van-field required v-model="form.ab_ex3" name="ab_ex3" maxlength="10" label="姓名" placeholder="姓名" :rules="rules.rules2" />
						<van-field required v-model="form.ab_ex7" name="ab_ex7" label="身份证号" placeholder="身份证号" @input="changeCard1($event,'ab_ex69')" :rules="rules.rules3" />
						<van-field v-model="form.ab_ex69" disabled name="ab_ex69" label="性别" placeholder="性别" />

						<van-field required v-model="ab_ex162_2"  name="ab_ex162_2" center readonly label="行政区划" placeholder="请选择所在行政区划" @click="show = true" :rules="rules.rules4">
							<!-- <template #button>
								<van-button size="small" type="info" native-type="button" @click.stop="xzqh">区外</van-button>
							</template> -->
						</van-field>
						<van-popup v-model="show" round position="bottom">
							<van-cascader title="请选择所在行政区划" :options="options" @click="show = false" @finish="onFinish" />
						</van-popup>
						<van-field required v-model="form.ab_ex11" name="ab_ex11" label="家庭住址" placeholder="家庭住址" :rules="rules.rules5" />


						<van-field required v-model="form.ab_ex28" center type="number" name="ab_ex28" label="联系电话" placeholder="联系电话" :rules="rules.rules8">
							<template #button>
								<van-button size="small" type="info" :disabled="hqyzmDis" native-type="button" @click='hqyzm'>{{hqyzmtext}}</van-button>
							</template>
						</van-field>
						<van-field v-model="form.yanzm" center name="yanzm" type="number" label="验证码" placeholder="验证码" :rules="[{ required: true, message: '请填写验证码' }]" />


						<van-field required name="ab_ex83" label="患病类别" :rules="rules.rules10">
							<template #input>
								<van-radio-group v-model="form.ab_ex83" direction="horizontal" @change="hblbChange">
									<van-radio class="marginstyle" name="尿毒症" shape="square">尿毒症</van-radio>
									<van-radio class="marginstyle" name="白血病" shape="square">白血病</van-radio>
									<van-radio class="marginstyle" name="重性精神病" shape="square">重性精神病</van-radio>
								</van-radio-group>
							</template>
						</van-field>

						<van-field required name="ab_ex152" label="参保险种" :rules="rules.rules11">
							<template #input>
								<van-radio-group v-model="form.ab_ex152" direction="horizontal">
									<van-radio class="marginstyle" name="职工医保" shape="square">职工医保</van-radio>
									<van-radio class="marginstyle" name="居民医保" shape="square">居民医保</van-radio>
								</van-radio-group>
							</template>
						</van-field>

						<van-field v-if="form.ab_ex83!='重性精神病'" v-model="form.ab_ex143" name="ab_ex143" maxlength="30" label="困难对象类别" placeholder="困难对象类别" />
						<van-field v-if="form.ab_ex83=='重性精神病'" v-model="form.ab_ex88" name="ab_ex88" maxlength="30" label="疾病诊断" placeholder="疾病诊断" />
						<van-field v-if="form.ab_ex83=='重性精神病'" v-model="form.ab_ex29" name="ab_ex29" maxlength="10"  label="监护人姓名" placeholder="监护人姓名" />
						<van-field v-if="form.ab_ex83=='重性精神病'" v-model="form.ab_ex31" name="ab_ex31" label="监护人身份证号码" placeholder="监护人身份证号码" />

						<van-field v-model="form.ab_ex42" name="ab_ex42" maxlength="15" label="开户银行" placeholder="开户银行" />
						<van-field v-model="form.ab_ex8" name="ab_ex8" maxlength="15" label="开户人" placeholder="开户人" />
						<van-field v-model="form.ab_ex43" name="ab_ex43" maxlength="22" label="银行账号" placeholder="银行账号" onkeyup="value=value.replace(/[^\dx]/gi,'')" />
						<van-field v-model="form.ab_ex30" name="ab_ex30" maxlength="30" label="持卡人姓名及与受助人关系" placeholder="持卡人姓名及与受助人关系" />
				


						<div style="margin: 16px 0 16px 0;display: flex;justify-content: space-around;">
							<van-button block type="info" native-type="button" @click="next1">下一步</van-button>
						</div>
					</van-form>
				</div>
			</div>

			<div id="page2" v-show="page2" style="display: none;">
				<div class="page2Class">
					<div style="height:40px;line-height:40px">身份证照片:</div>
					<div id="img" style="margin-top:10px;">
						<div style="position:relative;width:100%;float: left;" id="be">
							<div style="width:40%;height:100px;text-align: center;float: left;margin-left:20px;"
								class="cd-bouncy-nav-trigger" id="sfzm">
								<van-uploader v-model="fileList" :before-read="beforeRead" :max-count="1" :after-read="uploadImg(1)" :before-delete="beforeDelete('ab_ex10_1')" />

								<br>
								<span>上传身份证正面</span>
							</div>
							<div style="width:40%;height:100px;text-align: center;float: right;margin-right:20px;"
								class="cd-bouncy-nav-trigger" id="sfzm2">
								<van-uploader v-model="fileList2" :before-read="beforeRead" :max-count="1" :after-read="uploadImg(2)" :before-delete="beforeDelete('ab_ex10_2')" />

								<br>
								<span>上传身份证反面</span>
							</div>
						</div>
					</div>
				</div>
				<div class="page2Class2">
					<div style="height:40px;line-height:40px;">证明材料照片:</div>
					<div style="margin-top:10px;">
						<div id="zmcl" style="position:relative;width:100%;float: left;">
							<van-uploader v-model="fileList3" :before-read="beforeRead" :after-read="uploadImg(3)" :before-delete="beforeDelete('ab_ex16')" />
						</div>
					</div>
				</div>
				<div class="page2Class2">
				  <div style="height:40px;line-height:40px;">银行卡复印件:</div>
				  <div style="margin-top:10px;">
					<div id="zmcl" style="position:relative;width:100%;float: left;">
						<van-uploader v-model="fileList4" :before-read="beforeRead" :after-read="uploadImg(4)" :before-delete="beforeDelete('ab_ex141')" />
					</div>
				  </div>
				</div>
				<div style="margin-top: 20px;display: flex;justify-content: space-around;">
					<van-button block native-type="button" @click="back2">上一步</van-button>
					<van-button block type="info" @click="save">提交</van-button>
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
					rules10:[
						{
							required:true,
							message:'请选择患病类别',
							trigger:'onBlur'
						}
					],
					rules11:[
						{
							required:true,
							message:'请选择参保险种',
							trigger:'onBlur'
						}
					],
					
				},
				// 
				form: {
					ab_ex75: '本人',
					ab_ex3: '',
					ab_ex7: '',
					ab_ex1: '',
					ab_ex2: '',
					ab_ex11: '',
					ab_ex28: '',
					ab_ex83: '',
					ab_ex152: '',
					ab_ex161: '',
					ab_ex162: '',
					yanzm: '',
					ab_dat14:'',
					ab_ex10_1:'', //身份证正面照片
					ab_ex10_2:'', //身份证反面照片
					ab_ex16:'', //其他证明材料照片
					ab_ex69:'',
					ab_ex143:'',
					ab_ex88:'',
					ab_ex29:'',
					ab_ex31:'',
					ab_ex42:'',
					ab_ex8:'',
					ab_ex43:'',
					ab_ex30:'',
					ab_ex141:'',
					ab_ex13:'医疗救助',
				},
				fileList: [],
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
				options: xzqh,
			}
		},
		created() {
			
			console.log(11);
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
			// 	console.log(11);
			// 	this.$toast.fail('数据请求失败')
			// 	console.log(this.$route,'路由11');
			// })

			
			
		},
		methods: {
			changeCard1(value,sex){
				if(isCardID(value) == ''){
					this.$set(this.form,sex,getSex(value))
				}
			},
			next1() {
				// 去除姓名的空白符号并且判断姓名是否合法
				this.form.ab_ex3 = this.form.ab_ex3.replace(/\s*/g,"")
				let tszf = tszfValidate(this.form.ab_ex3)
				if(tszf){
					this.$toast.fail("请输入正确的姓名")
					return false
				}
				// 判断身份证是否合法
				let msg = isCardID(this.form.ab_ex7)
				if(msg){
				  this.$toast.fail(msg)
				  return false
				}
				// 判断验证码是否正确
				if(!this.yzm ||	this.yzm!=this.form.yanzm){
				  // 测试用(等于0可以继续下一步)
				  if(this.form.yanzm != '0'){
					this.$toast.fail('验证码错误')
					return false
				  }
				}
			
				if(this.form.ab_ex83=='重性精神病'){
					// 去除监护人姓名的空白符号并且判断监护人姓名是否合法
					this.form.ab_ex29 = this.form.ab_ex29.replace(/\s*/g,"")
					let tszf = tszfValidate(this.form.ab_ex29)
					if(tszf){
						this.$toast.fail("请输入正确的监护人姓名")
						return false
					}
					// 过滤疾病诊断特殊字符和空格
					this.form.ab_ex88 = this.form.ab_ex88.replace(/\s*/g,"")
					this.form.ab_ex88 = tszfFilter2(this.form.ab_ex88)
					// 判断监护人身份证是否合法
					let msg = isCardID(this.form.ab_ex31)
					if(msg){
					  this.$toast.fail("监护人"+msg)
					  return false
					}
					
				}
				if(this.form.ab_ex83!='重性精神病'){
					// 过滤困难对象类别特殊字符和空格
					this.form.ab_ex143 = this.form.ab_ex143.replace(/\s*/g,"")
					this.form.ab_ex143 = tszfFilter(this.form.ab_ex143)
				}
				// 过滤开户银行特殊字符和空格
				this.form.ab_ex42 = this.form.ab_ex42.replace(/\s*/g,"")
				this.form.ab_ex42 = tszfFilter(this.form.ab_ex42)
				// 过滤开户人特殊字符和空格
				this.form.ab_ex8 = this.form.ab_ex8.replace(/\s*/g,"")
				this.form.ab_ex8 = tszfFilter(this.form.ab_ex8)
				// 过滤持卡人姓名及与受助人关系特殊字符和空格
				this.form.ab_ex30 = this.form.ab_ex30.replace(/\s*/g,"")
				this.form.ab_ex30 = tszfFilter(this.form.ab_ex30)
				
				// 验证参保险种是否已经申请
				request({
				  method:'post',
				  url: '/social/assistanceWeixin/checkRepeat',
				  data:{
					ab_ex13:this.form.ab_ex13,
					ab_ex7:this.form.ab_ex7,
					ab_ex3:this.form.ab_ex3
				  }
				}).then(res=>{
				  console.log(res)
				  if(res[0].status == '+OK'){
					console.log(this.form)
					this.$refs.apply.validate().then(()=>{
					document.getElementsByClassName('helpApply')[0].scrollTop = 0
					  this.page1 = false
					  this.page2 = true
					  this.isShow = false
					  this.isShow2 = true
					}).catch((err)=>{
					  console.log(err)
					  this.$toast.fail(err[0].message)
					})
				  }else{
					this.$toast.fail(res[0].msg)
				  }
				}).catch(error=>{
				  this.$toast.fail('数据请求失败')
				})
			},
			back2() {
				this.page1 = true
				this.page2 = false
				this.isShow = true
				this.isShow2 = false
			},
			save() {
				if(!this.form.ab_ex10_1){
					this.$dialog({
						message:'请上传身份证正面照片'
					})
					return
				}else if(!this.form.ab_ex10_2){
					this.$dialog({
						message:'请上传身份证反面照片'
					})
					return
				}
				// 遮罩
				let toast = this.$toast({
					type:'loading',
					message:'提交中...',
					overlay:true,
					duration:0
				})
				
				var date=new Date();
				var year=date.getFullYear(); //获取当前年份
				var mon=date.getMonth()+1; //获取当前月份
				var da=date.getDate(); //获取当前日
				var day=date.getDay(); //获取当前星期几
				var h=date.getHours(); //获取小时
				var m=date.getMinutes(); //获取分钟
				var s=date.getSeconds(); //获取秒
				var d=document.getElementById('Date');
				h<10 ? h='0'+h:h
				m<10 ? m='0'+m:m
				s<10 ? s='0'+s:s
				var mytime=year+'-'+mon+'-'+da+' '+h+':'+m+':'+s;
				this.form.ab_dat14 = mytime

				// 提交
				request({
					method:'post',
					url: '/social/assistanceWeixin/saveApply',
					data:{
						data:'['+JSON.stringify(this.form)+']',
						type: '申请'
					},
				}).then(res=>{
					toast.clear()
					// 提示提交成功
					// this.$toast.success('提交成功')
					// this.$router.push('/')
					this.$dialog.alert({
						  message: '提交成功',
						}).then(()=>{
							this.$router.push('/')
						})
					console.log(res)
				}).catch(error=>{
					toast.clear()
					// 提示提交失败
					this.$toast.fail('提交失败')
					console.log(error)
				})
			},
				// 全部选项选择完毕后，会触发 finish 事件
			onFinish({
				selectedOptions
			}) {
				this.show = false;
				console.log(selectedOptions.map((option) => option.text))
				let area = selectedOptions.map((option) => option.text)
				let area2 = selectedOptions.map((option) => option.text+option.value)
				this.form.ab_ex1 = area[2]
				this.form.ab_ex2 = area[1]
				this.form.ab_ex161 = area[0]
				this.ab_ex162_2 = area.join('/');
				this.form.ab_ex162 = area2.join(',');
				// 更改家庭住址
				if(this.form.ab_ex11==''){
					this.form.ab_ex11=area[0]+area[1]+area[2];
				}
			},
				// 行政区划泰兴区外
				// xzqh(){
				// 	this.ab_ex162 = '泰兴区外';
				// 	this.form.ab_ex2 = '泰兴区外'
				// },
			hblbChange(val){
				if(val!="重性精神病"){
					this.form.ab_ex143 = ""
					this.form.ab_ex88 = ""
					this.form.ab_ex29 = ""
					this.form.ab_ex31 = ""
				}
			},
			hqyzm(){
				var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
				if (!myreg.test(this.form.ab_ex28)) {
					this.$toast.fail('请填写正确的手机号')
					return false
				}
				// 获取验证码
				console.log('-----------------')
				// this.hqyzmajax({
				// 	yanzm:this.form.ab_ex28
				// 	}).then(res=>{
				// 	console.log(res)
				// 	request({
				// 		method:'post',
				// 		url: '/social/assistanceWeixin/backTelCheck',
				// 		data:{
				// 			tel:this.form.ab_ex28
				// 		},
				// 	}).then(res=>{
				// 		this.yzm = res
				// 	}).catch(error=>{
				// 		console.log(error)
				// 	})
				// }).catch(erro=>{
				// 	console.log(erro)
				// })
				request({
					method:'get',
					url: '/social/assistanceWeixin/backTelCheck',
					params:{
						tel:this.form.ab_ex28
					},
				}).then(res=>{
					if(res[0].status == '+OK'){
						this.$toast.success(res[0].msg)
						this.yzm = res[0].Vcode
					}else{
						this.$toast.fail(res[0].msg)
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
				// hqyzmajax(data){
				// 	return request({
				// 		method:'post',
				// 		url: '/social/assistanceWeixin/WXshejiu',
				// 		data:data,
				// 	})
				// },
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
						this.form.ab_ex10_1=res[0].filename
					}else if(num == 2){
						this.form.ab_ex10_2=res[0].filename
					}else if(num == 3){
						console.log(1111)
						if(this.form.ab_ex16){
							this.form.ab_ex16 = this.form.ab_ex16.concat(',',res[0].filename)
						}else{
							this.form.ab_ex16 = this.form.ab_ex16.concat(res[0].filename)
						}
						console.log(this.form.ab_ex16)
					}else if(num == 4){
						if(this.form.ab_ex141){
							this.form.ab_ex141 = this.form.ab_ex141.concat(',',res[0].filename)
						}else{
							this.form.ab_ex141 = this.form.ab_ex141.concat(res[0].filename)
						}
						console.log(this.form.ab_ex141)
					}
				}).catch(erro=>{
					file.status = 'failed';
					file.message = '上传失败';
					if(num == 1){
						this.fileList.pop()
					}else if(num == 2){
						this.fileList2.pop()
					}else if(num == 3){
						this.fileList3.pop()
					}else if(num == 4){
						this.fileList4.pop()
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

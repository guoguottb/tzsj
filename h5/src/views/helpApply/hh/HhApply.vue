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
						
						<van-field v-model="form.ab_ex46" required center readonly clickable name="ab_ex46" label="救助项目" placeholder="请选择救助项目" :rules="rules.rules12"  @click="show2 = true"></van-field>
						<van-popup v-model="show2" position="bottom">
							<van-picker show-toolbar :columns="columns" @confirm="onConfirm21($event,form,'ab_ex46','show2');jzxmChange($event)" @cancel="show2 = false" />
						</van-popup>
						
						<van-field required v-model="form.ab_ex3" name="ab_ex3" maxlength="10" label="姓名" placeholder="姓名" :rules="rules.rules2" />
						<van-field required v-model="form.ab_ex7" name="ab_ex7" label="身份证号" placeholder="身份证号" @input="changeCard1($event,'ab_ex69','ab_dat11')" :rules="rules.rules3" />

						<van-field required v-model="ab_ex162_2"  name="ab_ex162_2" center readonly label="行政区划" placeholder="请选择所在行政区划" @click="show = true" :rules="rules.rules4">
							<!-- <template #button>
								<van-button size="small" type="info" native-type="button" @click.stop="xzqh">区外</van-button>
							</template> -->
						</van-field>
						<van-popup v-model="show" round position="bottom">
							<van-cascader title="请选择所在行政区划" :options="options" @click="show = false" @finish="onFinish" />
						</van-popup>
						
						<van-field required v-model="form.ab_ex28" center type="number" name="ab_ex28" label="联系电话" placeholder="联系电话" :rules="rules.rules8">
							<template #button>
								<van-button size="small" type="info" :disabled="hqyzmDis" native-type="button" @click='hqyzm'>{{hqyzmtext}}</van-button>
							</template>
						</van-field>
						<van-field v-model="form.yanzm" center name="yanzm" type="number" label="验证码" placeholder="验证码" :rules="[{ required: true, message: '请填写验证码' }]" />
						
						<van-field v-if="form.ab_ex46!='造血干细胞移植资助申请'" v-model="form.ab_ex11" required name="ab_ex11" maxlength="50" label="家庭住址" placeholder="家庭住址" :rules="[{ required: true, message: '请填写家庭住址' }]" />
						
						<van-field v-if="form.ab_ex46=='博爱光明行'" v-model="form.ab_ex50" required name="ab_ex50" maxlength="6" type="number" label="邮政编码" placeholder="邮政编码" :rules="[{ required: true, message: '请填写邮政编码' }]" />
						<van-field v-if="form.ab_ex46=='博爱光明行'" v-model="form.ab_ex29" required name="ab_ex29" maxlength="10" label="监护人姓名" placeholder="监护人姓名" :rules="[{ required: true, message: '请填写监护人姓名' }]" />
						<van-field v-if="form.ab_ex46=='博爱光明行'" v-model="form.ab_ex30" required name="ab_ex30" maxlength="30" label="监护人地址" placeholder="监护人地址" :rules="[{ required: true, message: '请填写监护人地址' }]" />
						<van-field v-if="form.ab_ex46=='博爱光明行'" v-model="form.ab_ex58" required name="ab_ex58" type="number" label="年收入" placeholder="年收入" :rules="[{ required: true, message: '请填写年收入' }]" />
						
						<van-field v-if="form.ab_ex46=='博爱光明行'" v-model="form.ab_ex37" required center readonly clickable name="ab_ex37" label="医保类型" placeholder="请选择医保类型" :rules="[{ required: true, message: '请选择医保类型' }]"  @click="show3 = true"></van-field>
						<van-popup v-model="show3" position="bottom">
							<van-picker show-toolbar :columns="columns2" @confirm="onConfirm21($event,form,'ab_ex37','show3')" @cancel="show3 = false" />
						</van-popup>
						
						<van-field v-if="form.ab_ex46=='血液病救助'" required v-model="form.ab_ex45" name="ab_ex45" maxlength="30" label="所患病型" placeholder="所患病型" :rules="[{ required: true, message: '请填写所患病型' }]" />
						<van-field v-if="form.ab_ex46=='血液病救助'" required v-model="form.ab_ex43" name="ab_ex43" maxlength="22" label="患者银行账号" placeholder="患者银行账号" :rules="[{ required: true, message: '请填写患者银行账号' }]" onkeyup="value=value.replace(/[^\dx]/gi,'')" />
						<van-field v-if="form.ab_ex46=='血液病救助'" required v-model="form.ab_ex42" name="ab_ex42" maxlength="15" label="开户行" placeholder="开户行" :rules="[{ required: true, message: '请填写开户行' }]" />
						<van-field v-if="form.ab_ex46=='血液病救助'" required v-model="form.ab_ex93" type="textarea" autosize :rows="2" name="ab_ex93" label="救助事由" placeholder="救助事由" :rules="[{ required: true, message: '请填写救助事由' }]" />
						
						<van-field v-if="form.ab_ex46=='造血干细胞移植资助申请'" v-model="form.ab_ex40" required type="number" name="ab_ex40" label="移植费用" placeholder="移植费用" :rules="[{ required: true, message: '请填写移植费用' }]" />
						
						<van-field v-if="form.ab_ex46=='造血干细胞移植资助申请'" required name="ab_ex80" label="是否获得过资助" :rules="[{ required: true, message: '请选择是否获得过资助' }]">
							<template #input>
								<van-radio-group v-model="form.ab_ex80" direction="horizontal">
									<van-radio name="是">是</van-radio>
									<van-radio name="否">否</van-radio>
								</van-radio-group>
							</template>
						</van-field>
						
						<van-field v-if="form.ab_ex80 =='是'" v-model="form.ab_ex84" required type="number" name="ab_ex84" label="获得资助金额(万)" placeholder="获得资助金额(万)" :rules="[{ required: true, message: '请填写获得资助金额(万)' }]" />
						<van-field v-if="form.ab_ex80 =='是'" v-model="form.ab_dat12" required type="digit" name="ab_dat12" label="获得资助时间(年)" placeholder="获得资助时间(年)" :rules="[{ required: true, message: '请填写获得资助时间(年)' }]" />


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
							<div style="width:40%;height:200px;text-align: center;float: left;margin-left:20px;" id="sfzm">
								<van-uploader v-model="fileList" :before-read="beforeRead" :max-count="1" :after-read="uploadImg(1)" :before-delete="beforeDelete('ab_ex10_1')" />

								<br>
								<span>上传身份证正面</span>
							</div>
							<div style="width:40%;height:200px;text-align: center;float: right;margin-right:20px;"
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
				<!-- <div class="mui-input-row " style="overflow: auto;margin-left:3%;width:80%;height:250px;font-size:12px;color:#545454;padding-left:20px;padding-right:20px;border-radius: 15px;border:#aaa solid 1px;">
				  <div style="height:40px;line-height:40px;font-size: 17px;">银行卡复印件:</div>
				  <div style="margin-top:10px;">
					<div id="zmcl" style="position:relative;width:91%;float: left;">
						<van-uploader v-model="fileList4" :before-read="beforeRead" :after-read="uploadImg(4)" :before-delete="beforeDelete('ab_ex141')" />
					</div>
				  </div>
				</div> -->
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

	import {compressImg,tszfValidate,tszfFilter,getAge,getBirthday,getSex,xzqh,isCardID} from '@/utils/utils.js'
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
					rules8:[
						{
							required:true,
							message:'请填写联系电话',
							trigger:'onBlur'
						}
					],
					rules12:[
						{
							required:true,
							message:'请选择救助项目',
							trigger:'onBlur'
						}
					],
					
				},
				// 
				form: {
					ab_ex75: '本人',
					ab_ex46: '',
					ab_ex3: '',
					ab_ex7: '',
					ab_ex1: '',
					ab_ex2: '',
					ab_ex28: '',
					ab_ex161: '',
					ab_ex162: '',
					ab_dat14:'',
					ab_ex10_1:'', //身份证正面照片
					ab_ex10_2:'', //身份证反面照片
					ab_ex16:'', //其他证明材料照片
					ab_ex69:'',
					yanzm: '',
					ab_ex11: '',
					ab_ex50: '',
					ab_ex29: '',
					ab_ex30: '',
					ab_ex58: '',
					ab_ex37: '',
					ab_ex45: '',
					ab_ex43: '',
					ab_ex42: '',
					ab_ex93: '',
					ab_ex40: '',
					ab_ex80: '',
					ab_ex84: '',
					ab_dat12: '',
					ab_ex13:'红会救助',
				},
				fileList: [],
				fileList2: [],
				fileList3: [],
				// fileList4: [],

				ab_ex162:'',
				ab_ex162_2:'',
				yzm:'',    //正确验证码
				show: false,
				// 获取验证码按钮禁用状态
				hqyzmDis:false,
				// 选项列表，children 代表子选项，支持多级嵌套
				options: xzqh,
				show2:false,
				columns:["博爱光明行","血液病救助","造血干细胞移植资助申请"],
				show3:false,
				columns2:["","职工医保","居民医保","新农合","其它"]
			}
		},
		created() {
			// 根据Home页面给的userId来获取用户信息（userId为通号提供以链接形式拼在后面？userId=...）
			request({
				method:'post',
				url: '/social/assistanceWeixin/getUserInfo',
				params:{
					userId:localStorage.getItem("cs_userId") ? localStorage.getItem("cs_userId") : ""
				}
			}).then(res=>{
				console.log(res)
				if(res.success){
					this.form.ab_ex7 = res.data.cardNo
					this.form.ab_ex28 = res.data.phone
					this.form.ab_ex3 = res.data.userName
					this.form.ab_ex69 = res.data.sex
					
				}
			}).catch(error=>{
				this.$toast.fail('数据请求失败')
			})
		},
		methods: {
			changeCard1(value,sex,birthday){
				if(isCardID(value) == ''){
					this.$set(this.form,sex,getSex(value))
					this.$set(this.form,birthday,getBirthday(value))
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
				var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
				if (!myreg.test(this.form.ab_ex28)) {
					this.$toast.fail('请填写正确的手机号')
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
				if(this.form.ab_ex46!='造血干细胞移植资助申请'){
					// 过滤家庭住址特殊字符和空格
					this.form.ab_ex11 = this.form.ab_ex11.replace(/\s*/g,"")
					this.form.ab_ex11 = tszfFilter(this.form.ab_ex11)
				}
				if(this.form.ab_ex46=='血液病救助'){
					// 过滤案所患病型特殊字符和空格
					this.form.ab_ex45 = this.form.ab_ex45.replace(/\s*/g,"")
					this.form.ab_ex45 = tszfFilter(this.form.ab_ex45)
					// 过滤开户行特殊字符和空格
					this.form.ab_ex42 = this.form.ab_ex42.replace(/\s*/g,"")
					this.form.ab_ex42 = tszfFilter(this.form.ab_ex42)
				}
				if(this.form.ab_ex46=='博爱光明行'){
					// 过滤监护人地址特殊字符和空格
					this.form.ab_ex30 = this.form.ab_ex30.replace(/\s*/g,"")
					this.form.ab_ex30 = tszfFilter(this.form.ab_ex30)
					// 验证邮政编码长度为6
					if(this.form.ab_ex50.length!=6){
						this.$toast.fail("请输入正确的邮政编码")
						return false
					}
					// 去除监护人姓名的空白符号并且判断监护人姓名是否合法
					this.form.ab_ex29 = this.form.ab_ex29.replace(/\s*/g,"")
					let tszf = tszfValidate(this.form.ab_ex29)
					if(tszf){
						this.$toast.fail("请输入正确的监护人姓名")
						return false
					}
					
				}
				
				
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
			jzxmChange(val){
				if(val == "博爱光明行"){
					this.form.ab_ex45 = ""
					this.form.ab_ex43 = ""
					this.form.ab_ex42 = ""
					this.form.ab_ex93 = ""
					
					this.form.ab_ex40 = ""
					this.form.ab_ex80 = ""
					this.form.ab_ex84 = ""
					this.form.ab_dat12 = ""
				}else if(val == "血液病救助"){
					this.form.ab_ex50 = ""
					this.form.ab_ex29 = ""
					this.form.ab_ex30 = ""
					this.form.ab_ex58 = ""
					this.form.ab_ex37 = ""
					
					this.form.ab_ex40 = ""
					this.form.ab_ex80 = ""
					this.form.ab_ex84 = ""
					this.form.ab_dat12 = ""
				}else if(val == "造血干细胞移植资助申请"){
					this.form.ab_ex11 = ""
					
					this.form.ab_ex45 = ""
					this.form.ab_ex43 = ""
					this.form.ab_ex42 = ""
					this.form.ab_ex93 = ""
					
					this.form.ab_ex50 = ""
					this.form.ab_ex29 = ""
					this.form.ab_ex30 = ""
					this.form.ab_ex58 = ""
					this.form.ab_ex37 = ""
				}
			},
			onConfirm21(value,item,itemval1,itemval2) {
				item[itemval1] = value
				this[itemval2] = false
				console.log(this.form)
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
					}
					// else if(num == 4){
					// 	if(this.form.ab_ex141){
					// 		this.form.ab_ex141 = this.form.ab_ex141.concat(',',res[0].filename)
					// 	}else{
					// 		this.form.ab_ex141 = this.form.ab_ex141.concat(res[0].filename)
					// 	}
					// 	console.log(this.form.ab_ex141)
					// }
				}).catch(erro=>{
					file.status = 'failed';
					file.message = '上传失败';
					if(num == 1){
						this.fileList.pop()
					}else if(num == 2){
						this.fileList2.pop()
					}else if(num == 3){
						this.fileList3.pop()
					}
					// else if(num == 4){
					// 	this.fileList4.pop()
					// }
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

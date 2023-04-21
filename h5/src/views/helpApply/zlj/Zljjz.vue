<template>
	<div class="dbjz">
		<header>
			<div class="headerHead">
				<div>
					<div :class="{headerF:isShow}">基础信息</div>
				</div>
				<div class="headerRectangle"></div>
				<div>
					<div :class="{headerF:isShow5}">授权书</div>
				</div>
				<div class="headerRectangle"></div>
				<div>
					<div :class="{headerF:isShow6}">材料上传</div>
				</div>
			</div>
		</header>
		<main>
			<div id="page1" v-show="page1" class="page1Div1">
				<div class="page1Div2">
					&nbsp;&nbsp;&nbsp;&nbsp;<span class="page1Div2Font">基本信息</span>
				</div>

				<van-form ref='rule1' @submit="next1">
					<van-field name="ab_ex75" label="申请方式" required :rules="[{ required: true, message: '请选择申请方式' }]">
						<template #input>
							<van-radio-group v-model="form.ab_ex75" direction="horizontal">
								<van-radio name="委托代理">代申请</van-radio>
								<van-radio name="本人">本人</van-radio>
							</van-radio-group>
						</template>
					</van-field>
					<van-field v-model="form.ab_ex3" required name="ab_ex3" maxlength="10" label="姓名" placeholder="姓名" :rules="[{ required: true, message: '请填写姓名' }]">
						<!-- <template #button>
							<van-button size="small" type="info" native-type="button">拍照识别</van-button>
						</template> -->
					</van-field>
					<van-field v-model="form.ab_ex7" required name="ab_ex7" label="身份证号" placeholder="身份证号" :rules="[{ required: true, message: '请填写身份证号'}]" @input='changeSfz' />
					<van-field v-model="form.ab_dat11" name="ab_dat11" disabled label="出生年月" placeholder="出生年月" />
					<van-field v-model="form.ab_ex70" name="ab_ex70" disabled label="年龄" placeholder="年龄" />

					<van-field v-model="form.ab_ex162_2" required center readonly label="行政区划" placeholder="请选择所在行政区划" @click="showxzqh = true" :rules="[{ required: true, message: '请选择行政区划' }]">
						<!-- <template #button>
							<van-button size="small" type="info" native-type="button" @click.stop="xzqh">区外</van-button>
						</template> -->
					</van-field>
					<van-popup v-model="showxzqh" round position="bottom">
						<!-- ab_ex162_3是因为和上面field显示的要不一样，不然区划选到一半关闭会显示options的value值 -->
						<van-cascader v-model="form.ab_ex162_3" title="请选择所在行政区划" :options="options" @close="showxzqh = false" @finish="onFinish" />
					</van-popup>
					<van-field v-model="form.ab_ex28" center name="ab_ex28" maxlength="11" type="number" required label="联系电话" placeholder="联系电话" :rules="[{ required: true, message: '请填写联系电话' }]">
					</van-field>
					<van-field v-model="form.ab_ex4" name="ab_ex4" required label="户籍地址" placeholder="户籍地址" :rules="[{ required: true, message: '请填写户籍地址' }]" />
					<van-field v-model="form.ab_ex11" name="ab_ex11" maxlength="50" label="家庭住址" required placeholder="家庭住址" :rules="[{ required: true, message: '请填写家庭住址' }]" />
					<van-field v-model="form.ab_ex29" name="ab_ex29" label="代理人姓名" placeholder="代理人姓名" />
					<van-field v-model="form.ab_ex31" name="ab_ex31" label="代理人身份证号" placeholder="代理人身份证号" />
					<van-field v-model="form.ab_ex30" name="ab_ex30" label="与申请人关系" placeholder="与申请人关系" />
					<van-field v-model="form.ab_ex32" center name="ab_ex32" type="number" label="代理人联系电话" placeholder="代理人联系电话" />
					
					<van-field name="ab_ex92" label="是否属于村干部或近亲属" required
						:rules="[{ required: true, message: '请选择是否属于村干部或近亲属' }]">
						<template #input>
							<van-radio-group v-model="form.ab_ex92" direction="horizontal">
								<van-radio name="是">是</van-radio>
								<van-radio name="否">否</van-radio>
							</van-radio-group>
						</template>
					</van-field>
					
					
					
					<div class="page1Div2">
						&nbsp;&nbsp;&nbsp;&nbsp;<span class="page1Div2Font">其他信息</span>
					</div>
					<van-field v-model="form.ab_ex42" name="ab_ex42" maxlength="15" label="开户银行" placeholder="开户银行" required
						:rules="[{ required: true, message: '请填写开户银行' }]">
						<!-- <template #button>
							<van-button size="small" type="info" native-type="button">拍照识别</van-button>
						</template> -->
					</van-field>
					<van-field v-model="form.ab_ex8" center name="ab_ex8" maxlength="15" label="开户人" placeholder="开户人" required
						:rules="[{ required: true, message: '请填写开户人' }]">
					</van-field>
					<van-field v-model="form.ab_ex43" center name="ab_ex43" maxlength="22" label="银行账号" placeholder="银行账号" required
						:rules="[{ required: true, message: '请填写银行账号' }]" onkeyup="value=value.replace(/[^\dx]/gi,'')">
					</van-field>
					<van-field v-model="form.ab_ex5" disabled center name="ab_ex5" type="number" label="尊老金发放标准" placeholder="尊老金发放标准" />
					
					<van-field name="ab_ex33" label="人员是否健在">
						<template #input>
							<van-radio-group v-model="form.ab_ex33" direction="horizontal">
								<van-radio name="是">是</van-radio>
								<van-radio name="否">否</van-radio>
							</van-radio-group>
						</template>
					</van-field>

<!--					<van-field name="ab_ex12" label="资金发放是否正常">-->
<!--						<template #input>-->
<!--							<van-radio-group v-model="form.ab_ex12" direction="horizontal">-->
<!--								<van-radio name="是">是</van-radio>-->
<!--								<van-radio name="否">否</van-radio>-->
<!--							</van-radio-group>-->
<!--						</template>-->
<!--					</van-field>-->
					<van-field v-model="form.ab_ex34" center name="ab_ex34" label="备注" placeholder="备注" />
					
					
					
					
					
					<div class="page1Div2">
						&nbsp;&nbsp;&nbsp;&nbsp;<span class="page1Div2Font">自定义预警</span>
					</div>
					<!-- warning没有showPicker，要自己手动添加 -->
					<van-cell-group v-for="(item,index) in warning" :key='index'>
						<van-field name="message" maxlength="50" v-model="item.aw_ex1" rows="1" autosize label="预警内容" type="textarea"
							placeholder="请输入预警内容" />
						<van-field readonly clickable name="time" :value="item.aw_dat1" label="预警时间"
							placeholder="点击选择预警时间" @click="item.showPicker = true" />
						<van-popup v-model="item.showPicker" position="bottom">
							<van-datetime-picker v-model="item.currentDate" type="date" @confirm="onConfirm($event,index)"
								@cancel="item.showPicker = false" />
						</van-popup>
					</van-cell-group>

					
					<!-- <div style="margin: 16px;display: flex;justify-content: space-around;"> -->
					<div style="width: 100%;position: fixed;bottom: 0px;text-align: center;display: flex;justify-content: space-around">
						<van-button block type="info" native-type="button" @click="next1">下一步</van-button>
					</div>
				</van-form>
			</div>

			
			
			
			<!-- 授权书 -->
			<div id="page5" v-show="page5" style="margin-bottom: 100px;display: block;padding-top: 20px;">
				<div class="page5Div">
					<div style="margin-bottom: 10px;">授权书编号</div>
					<!-- <td v-for="(item,index) in form.ab_ex85.split('')">{{item}}</td> -->
					<van-field v-model="form.ab_ex85" type="digit" size="large"></van-field>
					<div style="margin-top: 50px;">请务必将授权书编号准确无误的誊抄到纸质授权书上！</div>
				</div>
				<div style="width: 100%;position: fixed;bottom: 0px;text-align: center;display: flex;justify-content: space-around">
					<van-button block native-type="button" @click="back5">上一步</van-button>
					<van-button block type="info" native-type="button" @click="next5">下一步</van-button>
				</div>
			</div>
			<!-- 身份证 -->

			<div id="page6" v-show="page6" style="margin-bottom: 100px;">
				<div class="page6Div1">
					<div class="page6Div2">
						<span style="background-color: #00AAFF;display: inline-block;width: 5px;height: 10px;"></span>
						<span style="color: #00AAFF;">照片</span>
					</div>
					<div class="page6Div3">
						<div style="height:40px;line-height:40px">身份证照片:</div>
						<div style="margin-top:10px;">
							<div style="position:relative;width:100%;float: left;">
								<div style="width:40%;height:200px;text-align: center;float: left;margin-left:20px;"
									class="cd-bouncy-nav-trigger">
									<van-uploader v-model="fileList" :before-read="beforeRead" :max-count="1" :after-read="uploadImg(1)" :before-delete="beforeDelete('ab_ex10_1')" />

									<br>
									<span>上传身份证正面</span>
								</div>

								<div style="width:40%;height:200px;text-align: center;float: right;margin-right:20px;"
									class="cd-bouncy-nav-trigger">
									<van-uploader v-model="fileList2" :before-read="beforeRead" :max-count="1" :after-read="uploadImg(2)" :before-delete="beforeDelete('ab_ex10_2')" />
									<br>
									<span>上传身份证反面</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="page6Div4">
					<div class="page6Div3">
						<div style="height:40px;line-height:40px">授权书及民主评议:</div>
						<div style="margin-top:10px;">
							<div style="position:relative;width:100%;float: left;">
								<div style="width:40%;height:200px;text-align: center;float: left;margin-left:20px;"
									class="cd-bouncy-nav-trigger">
									<van-uploader v-model="fileList3" :before-read="beforeRead" :max-count="1" :after-read="uploadImg(3)" :before-delete="beforeDelete('ab_ex73')" />

									<br>
									<span>上传授权书照片</span>
								</div>

								<div style="width:40%;height:200px;text-align: center;float: right;margin-right:20px;"
									class="cd-bouncy-nav-trigger" id="sfzm2">
									<van-uploader v-model="fileList4" :before-read="beforeRead" :max-count="1" :after-read="uploadImg(5)" :before-delete="beforeDelete('ab_ex97')" />
									<br>
									<span>民主评议</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="page6Div5">
					<div class="page6Div6">其他证明材料:</div>
					<div style="margin-top:10px;">
						<div id="zmcl" style="position:relative;width:91%;float: left;">
							<van-uploader v-model="fileList5" :before-read="beforeRead" :after-read="uploadImg(4)" :before-delete="beforeDelete('ab_ex16')" />
						</div>
					</div>
				</div>
				<!-- 核查结果 -->

				<div class="page6Div7">
					<div class="page6Div2">
						<span style="background-color: #00AAFF;display: inline-block;width: 5px;height: 10px;"></span>
						<span style="color: #00AAFF;">核查结果(不属实将自动生成诚信记录)</span>
					</div>
					<van-form style="margin-top: 20px;">

						<van-field required readonly clickable name="ab_ex79" :value="form.ab_ex79" label="情况是否属实"
							placeholder="点击选择情况是否属实" @click="showPicker61 = true" />
						<van-popup v-model="showPicker61" position="bottom">
							<van-picker show-toolbar :columns="columns16" @confirm="onConfirm61"
								@cancel="showPicker61 = false" />
						</van-popup>
						
						<van-field disabled value="调查人以' , '分隔(如 张三,李四 )"></van-field>
						<van-field v-model="form.ab_ex78" name="ab_ex78" maxlength="30" label="调查人" placeholder="调查人" required
							:rules="[{ required: true, message: '请填写调查人' }]">
						</van-field>

						<van-field v-model="form.ab_ex80" name="ab_ex80" maxlength="50" label="备注" placeholder="备注" required
							:rules="[{ required: true, message: '请填写备注' }]">
						</van-field>
					</van-form>
				</div>
				<!-- <div style="margin-top: 20px;display: flex;justify-content: space-around;"> -->
				<div style="width: 100%;position: fixed;bottom: 0px;text-align: center;display: flex;justify-content: space-around">
					<van-button block @click="back6">上一步</van-button>
					<van-button block type="info" @click="save">提交</van-button>
				</div>
			</div>
		</main>
	</div>
</template>

<script>
	import request from '@/utils/request.js'
	import {tszfValidate,tszfFilter,tszfFilter2,xzqh,getSex,isCardID,getBirthday,getAge,compressImg} from '@/utils/utils.js'
	export default {
		data() {
			return {
				typelx: this.$route.query.type,
				isShow: true,
				isShow5: false,
				isShow6: false,
				page1: true,
				page5: false,
				page6: false,
				fileList: [],
				fileList2: [],
				fileList3: [],
				fileList4: [],
				fileList5: [],
				ab_ex85_2: '',
				showPicker61: false,
				form: {
					ab_ex75: '',
					ab_ex3: '',
					ab_ex7: '',
					ab_ex162: '',
					ab_ex162_2: '',
					ab_ex162_3:'', 
					ab_ex4: '',
					ab_ex11: '',
					ab_ex28: '',
					ab_ex92: '',
					ab_ex42: '',
					ab_ex8: '',
					ab_ex43: '',
					ab_ex13: '',
					// 材料上传
					ab_ex78: '',
					ab_ex85: '',
					ab_ex79: '',
					ab_ex80: '',
				},
				warning: [{
						aw_ex1: '',
						aw_dat1: '',
						currentDate: new Date(),
						showPicker: false
					},
					{
						aw_ex1: '',
						aw_dat1: '',
						currentDate: new Date(),
						showPicker: false
					},
					{
						aw_ex1: '',
						aw_dat1: '',
						currentDate: new Date(),
						showPicker: false
					},
					{
						aw_ex1: '',
						aw_dat1: '',
						currentDate: new Date(),
						showPicker: false
					},
					{
						aw_ex1: '',
						aw_dat1: '',
						currentDate: new Date(),
						showPicker: false
					}
				],
				showPicker: false,
				showPicker2: false,
				showPicker3: false,
				showPicker4: false,
				showPicker5: false,
				showxzqh: false,
				common: [],
				columns: ['户主本人', '配偶', '子女', '父母','兄弟姐妹','孙子女','其他'],
				columns16: ['属实', '不属实', '转其他救助'],

				options: xzqh,
			}
		},
		created() {
			this.getBasic()
		},
		methods: {
			next1() {
				this.getBasicIdNum(1)
				// this.page1 = false
				// this.page5 = true
				// this.isShow = false
				// this.isShow5 = true
				// 去除姓名的空白符号并且判断姓名是否合法
				this.form.ab_ex3 = this.form.ab_ex3.replace(/\s*/g,"")
				let tszf = tszfValidate(this.form.ab_ex3)
				if(tszf){
					this.$toast.fail("请输入正确的姓名")
					return false
				}
				// 判断身份证是否合法
				let msg = isCardID(this.form.ab_ex7)
				if (msg) {
					this.$toast.fail(msg)
					return false
				}
				// 验证联系电话
				let myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
				if (!myreg.test(this.form.ab_ex28)) {
					this.$toast.fail('请填写正确的联系电话')
					return false
				}
				// 过滤家庭住址特殊字符和空格
				this.form.ab_ex11 = this.form.ab_ex11.replace(/\s*/g,"")
				this.form.ab_ex11 = tszfFilter(this.form.ab_ex11)
				
				if(parseInt(this.form.ab_ex70) > 200){
					this.$toast.fail('年龄不能超过200')
					return false
				}
				
				// 过滤开户银行特殊字符和空格
				this.form.ab_ex42 = this.form.ab_ex42.replace(/\s*/g,"")
				this.form.ab_ex42 = tszfFilter(this.form.ab_ex42)
				// 过滤开户人特殊字符和空格
				this.form.ab_ex8 = this.form.ab_ex8.replace(/\s*/g,"")
				this.form.ab_ex8 = tszfFilter(this.form.ab_ex8)
				// 过滤预警特殊字符和空格
				this.warning.forEach((value,index)=>{
					if(value.aw_ex1 && value.aw_dat1){
						value.aw_ex1 = value.aw_ex1.replace(/\s*/g,"")
						value.aw_ex1 = tszfFilter2(value.aw_ex1)
					}
					
				})
				this.$refs.rule1.validate().then(()=>{
					this.page1 = false
					this.page5 = true
					this.isShow = false
					this.isShow5 = true
					document.getElementsByClassName('dbjz')[0].scrollTop = 0
				}).catch(err=>{
					this.$toast.fail(err[0].message)
				})
				
			},
			next5() {
				this.page5 = false
				this.page6 = true
				this.isShow5 = false
				this.isShow6 = true
				document.getElementsByClassName('dbjz')[0].scrollTop = 0
				
			},
			back5() {
				this.page5 = false
				this.page1 = true
				this.isShow5 = false
				this.isShow = true
				document.getElementsByClassName('dbjz')[0].scrollTop = 0
			},
			back6() {
				this.page6 = false
				this.page5 = true
				this.isShow6 = false
				this.isShow5 = true
				document.getElementsByClassName('dbjz')[0].scrollTop = 0
			},
			// 全部选项选择完毕后，会触发 finish 事件
			onFinish({
				selectedOptions
			}) {
				this.showxzqh = false;
				let area = selectedOptions.map((option) => option.text)
				let area2 = selectedOptions.map((option) => option.text + option.value)
				console.log(area2)
				console.log(area)
				this.form.ab_ex1 = area[2]
				this.form.ab_ex2 = area[1]
				this.form.ab_ex161 = area[0]
				this.form.ab_ex162_2 = area.join('/');
				this.form.ab_ex162 = area2.join(',');
				// 更改家庭住址
				if (this.form.ab_ex11 == '') {
					this.form.ab_ex11 = area[0] + area[1] + area[2];
				}
				if (this.form.ab_ex4 == '') {
					this.form.ab_ex4 = area[0] + area[1] + area[2];
				}
				// this.getBasicIdNum(1)
			},
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
					method: 'post',
					url: '/social/weixinMinios/fileUpload',
					data: param,
				}).then(res => {
					file.status = 'done';
					file.message = '上传完成';
					if (num == 1) {
						this.form.ab_ex10_1 = res[0].filename
					} else if (num == 2) {
						this.form.ab_ex10_2 = res[0].filename
					} else if (num == 3) {
						this.form.ab_ex73 = res[0].filename
						// this.fileList3 = res[0].filename
					} else if (num == 4) {
						// 其他证明材料
						if (this.form.ab_ex16) {
							this.form.ab_ex16 = this.form.ab_ex16.concat(',', res[0].filename)
						} else {
							this.form.ab_ex16 = this.form.ab_ex16.concat(res[0].filename)
						}
						console.log(this.form.ab_ex16)
					} else if (num == 5) {
						// 民主评议
						this.form.ab_ex97 = res[0].filename
					}
				}).catch(erro => {
					file.status = 'failed';
					file.message = '上传失败';
					console.log(erro)
					if(num == 1){
						this.fileList.pop()
					}else if(num == 2){
						this.fileList2.pop()
					}else if(num == 3){
						this.fileList3.pop()
					}else if(num == 4){
						this.fileList5.pop()
					}else if(num == 5){
						this.fileList4.pop()
					}
					this.$toast.fail('上传失败')
				})
			},
			uploadImg(num) {
				return file => {
					console.log(file)
					console.log(this.fileList)
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
			onConfirm(date, index) {
				console.log(index)
				let YY = date.getFullYear() + '-';
				let MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				let DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
				this.warning[index].aw_dat1 = YY + MM + DD
				this.warning[index].showPicker = false;
			},
			onConfirm61(value) {
				this.form.ab_ex79 = value;
				this.showPicker61 = false;
			},
			getBasic() {
				// 获取基础数据
				request({
					method: 'post',
					url: '/social/assistanceWeixin/getBasic',
					data: {
						sId: this.$route.query.sId
					},
					headers: {
						'token': sessionStorage.getItem('token')
					}
				}).then(res => {
					this.common = res[0].common
					let json = res[0].data[0]
					let warning = res[0].waring
					
					this.form = json
					if (json.ab_ex8 == "") {
						this.form.ab_ex8 = json.ab_ex3
					}
					// this.getBasicIdNum(1);
					
					var ab_ex10 = json.ab_ex10.split(",");
					this.form.ab_ex10_1 = ab_ex10[0]
					this.form.ab_ex10_2 = ab_ex10.length > 1 ? ab_ex10[1] : ""
					if (this.form.ab_ex10_1) {
						// this.fileList.push(this.form.ab_ex10_1)
						console.log(this.form.ab_ex10_1)
						this.imageView(this.form.ab_ex10_1).then(res=>{
							console.log(res)
							// 这个从正确的进来
							this.fileList.push({
								url: res,
								isImage: true
							})
						}).catch(res=>{
							console.log(res)
						})
					}
					if (this.form.ab_ex10_2) {
						// this.fileList2.push(this.form.ab_ex10_2)
						this.imageView(this.form.ab_ex10_2).then(res=>{
							// 这个从正确的进来
							this.fileList2.push({
								url: res,
								isImage: true
							})
							console.log(this.fileList2)
						}).catch(res=>{
							console.log(res)
						})
					}
					if (json.ab_ex73) {
						let ab_ex73 = json.ab_ex73.split(",");
						// this.fileList3.push(ab_ex73[0])
						this.imageView(ab_ex73[0]).then(res=>{
							// 这个从正确的进来
							this.fileList3.push({
								url: res,
								isImage: true
							})
						}).catch(res=>{
							console.log(res)
						})
					}
					// 其他证明材料
					if (json.ab_ex16) {
						let imgs = json.ab_ex16.split(",");
						// this.fileList5 = this.fileList5.concat(imgs)
						console.log(this.fileList5)
						imgs.forEach((value,index)=>{
							this.imageView(value).then(res=>{
								// 这个从正确的进来
								this.fileList5.push({
									url: res,
									isImage: true
								})
							}).catch(res=>{
								console.log(res)
							})
						})
					}

					// 民主评议
					if (json.ab_ex97) {
						let ab_ex97 = json.ab_ex97.split(",");
						// this.fileList4.push(ab_ex97[0])
						this.imageView(ab_ex97[0]).then(res=>{
							// 这个从正确的进来
							this.fileList4.push({
								url: res,
								isImage: true
							})
							console.log(this.fileList4)
						}).catch(res=>{
							console.log(res)
						})
					}
					
					console.log(this.$route.query.sId)
					if (this.$route.query.sId) {
						console.log(this.form.ab_ex162)
						if (json.ab_ex161 != "" && json.ab_ex2 != "" && json.ab_ex1 != "") {
							this.form.ab_ex162_2 = json.ab_ex161 + '/' + json.ab_ex2 + '/' + json.ab_ex1
						}
					}
					if (warning.length > 0) {
						this.warning = warning
						warning.forEach((item, index) => {
							// this.warning[index].showPicker = false
							this.$set(this.warning[index],'showPicker',false)
							console.log(this.warning)
						})
					}

					if (json.ab_ex42 == "") {
						this.form.ab_ex42 = '泰兴农商行';
					}
					if (json.ab_ex13 == "") {
						this.form.ab_ex13 = this.$route.query.type
						this.form.ab_ex15 = '委托确认'
						this.form.ab_ex100 = 'Y'
					}
				}).catch(error => {

				})
			},
			getBasicIdNum(val) {
				// 防止第一次有发请求ab_ex85不用改用ab_ex85_2卡一下
				if (!this.ab_ex85_2 && this.form.ab_ex85 && this.form.ab_ex85.length == 22) {
					this.ab_ex85_2 = this.form.ab_ex85
				} else {
					//生成授权书编号ab_ex85
					//取地址
					var idNum = '';
					var ab_ex2 = this.form.ab_ex2;
					if (ab_ex2 == '济川街道') {
						idNum = '321283001';
					}else if (ab_ex2 == '延令街道') {
						idNum = '321283002';
					}else if (ab_ex2 == '黄桥镇') {
						// idNum = '321283100';
					idNum = '321283101';
					}else if (ab_ex2 == '珊瑚镇') {
						// idNum = '321283105';
						idNum = '321283102';
					}else if (ab_ex2 == '广陵镇') {
						// idNum = '321283106';
						idNum = '321283103';
					}else if (ab_ex2 == '古溪镇') {
						// idNum = '321283102';
						idNum = '321283106';
					}else if (ab_ex2 == '元竹镇') {
						// idNum = '321283104';
						idNum = '321283107';
					}else if (ab_ex2 == '张桥镇') {
						// idNum = '321283109';
						idNum = '321283108';
					}else if (ab_ex2 == '曲霞镇') {
						// idNum = '321283108';
						idNum = '321283109';
					}else if (ab_ex2 == '河失镇') {
						// idNum = '321283112';
						idNum = '321283110';
					}else if (ab_ex2 == '新街镇') {
						idNum = '321283113';
					}else if (ab_ex2 == '姚王街道') {
						idNum = '321283114';
					}else if (ab_ex2 == '宣堡镇') {
						idNum = '321283115';
					}else if (ab_ex2 == '分界镇') {
						// idNum = '321283101';
						idNum = '321283122';
					}else if (ab_ex2 == '滨江镇') {
						idNum = '321283123';
					}else if (ab_ex2 == '虹桥镇') {
						idNum = '321283124';
					}else if (ab_ex2 == '根思乡') {
						// idNum = '321283200';
						idNum = '321283201';
					}
					//增加年月
					var myDate = new Date();
					idNum += '' + myDate.getFullYear() + '' + (myDate.getMonth() > 8 ? myDate.getMonth() + 1 : '0' + "" + (
						myDate.getMonth() + 1));
					//增加救助代码
					var ab_ex13 = this.form.ab_ex13;
					if (ab_ex13 == '低保') {
						idNum += '' + '01';
					}else if (ab_ex13 == '城乡低保') {
						idNum += '' + '01';
					}else if (ab_ex13 == '特困供养') {
						idNum += '' + '02';
					}else if (ab_ex13 == '医疗救助') {
						idNum += '' + '04';
					}else if (ab_ex13 == '教育救助') {
						idNum += '' + '21';
					}else if (ab_ex13 == '住房救助') {
						idNum += '' + '22';
					}else if (ab_ex13 == '就业救助') {
						idNum += '' + '23';
					}else if (ab_ex13 == '其他') {
						idNum += '' + '90';
					}else if (ab_ex13 == '家庭边缘') {
						idNum += '' + '11';
					}else if (ab_ex13 == '支出型困难') {
						idNum += '' + '27'; 
					}else if (ab_ex13 == '临时救助') {
						idNum += '' + '05';
					}else if (ab_ex13 == '受灾人员救助') {
						idNum += '' + '03';
					}else if (ab_ex13 == '低保外重残') {
						idNum += '' + '06';
					}else if (ab_ex13 == '低保外一户多残依老养残') {
						idNum += '' + '07';
					}else if (ab_ex13 == '慈善救助') {
						idNum += '' + '09';
					}else if (ab_ex13 == '易返贫易致贫对象') {
						idNum += '' + '24';
					}else if (ab_ex13 == '法律援助') {
						idNum += '' + '25';
					}else if (ab_ex13 == '困难职工') {
						idNum += '' + '26';
					}
					request({
						method: 'post',
						url: '/social/assistanceWeixin/getBasicIdNum?type=' + val + '&ab_id=' + this.$route.query
							.sId, //路径',
						data: {
							idNum: idNum
						},
						headers: {
							'token': sessionStorage.getItem('token')
						}
					}).then(res => {
						console.log(res)
						if (res[0].data != null && res[0].data.length > 20) {
							idNum = "" + res[0].data;
						} else {
							idNum += "" + res[0].data;
						}
						this.form.ab_ex85 = idNum
					}).catch(error => {
						console.log(error)
					})
				}
			},
			save() {
				// 民主评议可以不传
				this.form.ab_ex13 = ''
				// 遮罩
				let toast = this.$toast({
					type:'loading',
					message:'提交中...',
					overlay:true,
					duration:0
				})
				if(this.fileList.length == 0){
					this.$toast.fail('身份证正面不能为空')
					return false
				}
				if(this.fileList2.length == 0){
					this.$toast.fail('身份证反面不能为空')
					return false
				}
				if(this.fileList5.length == 0){
					this.$toast.fail('其他证明材料不能为空')
					return false
				}
				if(!this.form.ab_ex79){
					this.$toast.fail('请选择情况是否属实')
					return false
				}
				if(!this.form.ab_ex78){
					this.$toast.fail('请填写调查人')
					return false
				}
				if(this.form.ab_ex78 && (this.form.ab_ex78.split(',').length<2 && this.form.ab_ex78.split('，').length<2)){
					this.$toast.fail('调查人数不能少于两人')
					return false
				}
				if(!this.form.ab_ex80){
					this.$toast.fail('请填写备注')
					return false
				}
				// 过滤调查人姓名特殊字符和空格
				this.form.ab_ex78 = this.form.ab_ex78.replace(/\s*/g,"")
				this.form.ab_ex78 = tszfFilter2(this.form.ab_ex78)
				// 过滤备注特殊字符和空格
				this.form.ab_ex80 = this.form.ab_ex80.replace(/\s*/g,"")
				this.form.ab_ex80 = tszfFilter2(this.form.ab_ex80)
				
				this.form.ab_ex10 = this.form.ab_ex10_1 + ',' + this.form.ab_ex10_2
				this.form.ab_ex17 = '泰州市姜堰区社会救助综合平台'
				this.form.stype = this.$route.query.type
				console.log(this.form)
				let warning2 = []
				this.warning.forEach((value,index)=>{
					if(value.aw_ex1 && value.aw_dat1){
						warning2.push(value)
					}
				})
				console.log(warning2)
				request({
					method: 'post',
					url: '/social/assistanceWeixin/saveBasic',
					data: {
						'data': '[' + JSON.stringify(this.form) + ']',
						'waring': JSON.stringify(warning2),
						'isHc': "Y",
						'isCf': 'Y',
						'type': '核查'
					},
					headers: {
						'token': sessionStorage.getItem('token')
					}
				}).then(res => {
					// console.log(res)
					// this.$message.success(res[0].msg)
					// this.$router.go(-1)
					toast.clear()
					this.$dialog.alert({
					      message: res[0].msg,
					    }).then(()=>{
							this.$router.go(-1)
						})
				}).catch(error => {
					toast.clear()
					console.log(error)
				})
			},
			changeSfz(value) {
				if (isCardID(value) == '') {
					this.form.ab_ex69 = getSex(value)
					this.form.ab_dat11 = getBirthday(value)

					let age = getAge(value)
					this.form.ab_ex70 = age
					if(age>=80 && age<90){
						this.form.ab_ex5 = 50
					} else if(age>=90 && age<100){
						this.form.ab_ex5 = 100
					} else if(age>=100){
						this.form.ab_ex5 = 300
					}
				}
			},
			
			imageView(url){
				return request({
					method: 'post',
					url: url,
					headers: {
						'token': sessionStorage.getItem('token')
					},
					data:{
						
					},
				})
			},
		}
	}
</script>

<style scoped>
	.headerF {
		/* color: #409EFF; */
		color: #333333;
	}

	header {
		width: 100%;
		height: 88px;
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

	.dbjz {
		width: 100%;
		height: 100%;
		background-color: #f5f5f5;
		background-size: 100% 100%;
		position: fixed;
		overflow: auto;
	}
	.marginstyle {
		margin: 10px;
	}
	.headerHead {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28px;
	}

	.headerRectangle {
		width: 200px;
		height: 8px;
		background-color: #e2e2e2;
		border-radius: 10px;
		margin: 0 1px 0 1px;
	}

	main {
		padding-top: 100px;
	}
	.page1Div1{
		margin-bottom: 100px;
		display: block;
		text-align: left;
	}
	.page1Div2{
		padding:20px;
		background:#f5f5f5;
		height:30px;
		border-bottom:1px solid #ddd;
	}
	.page1Div2Font{
		color: #00AAFF;
		line-height:30px
	}
	.page5Div{
		font-size:28px;
		padding-left:40px;
		padding-right:40px;
		text-align: left;
	}
	.page6Div1{
		font-size:28px;
		text-align: left;
	}
	.page6Div2{
		border-bottom:#aaa solid 1px;
		font-size: 28px;
	}
	.page6Div3{
		width:80%;
		margin-left:4%;
		height:400px;
		font-size:28px;
		color:#545454;
		padding-left:40px;
		padding-right:40px;
		margin-top:20px;
		border-radius: 30px;
		border:#aaa solid 1px;
	}
	.page6Div4{
		font-size:28px;
		text-align: left;
		margin-top: 100px;
	}
	.page6Div5{
		overflow: auto;
		text-align:left;
		margin-left:4%;
		width:80%;
		height:500px;
		font-size:28px;
		color:#545454;
		padding-left:40px;
		padding-right:40px;
		border-radius: 30px;
		border:#aaa solid 1px;
	}
	.page6Div6{
		height:80px;
		line-height:80px;
		font-size: 28px;
	}
	.page6Div7{
		font-size:28px;
		padding-left:40px;
		padding-right:40px;
		text-align: left;
	}
</style>

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
					<van-field v-model="form.ab_ex7" required name="ab_ex7" label="身份证号" placeholder="身份证号"
						:rules="[{ required: true, message: '请填写身份证号'}]" @input='changeSfz' />

					<van-field v-model="form.ab_ex162_2" required center readonly label="行政区划" placeholder="请选择所在行政区划"
						@click="showxzqh = true" :rules="[{ required: true, message: '请选择行政区划' }]">
						<!-- <template #button>
							<van-button size="small" type="info" native-type="button" @click.stop="xzqh">区外</van-button>
						</template> -->
					</van-field>
					<van-popup v-model="showxzqh" round position="bottom">
						<!-- ab_ex162_3是因为和上面field显示的要不一样，不然区划选到一半关闭会显示options的value值 -->
						<van-cascader v-model="form.ab_ex162_3" title="请选择所在行政区划" :options="options"
							@close="showxzqh = false" @finish="onFinish" />
					</van-popup>
					<van-field v-model="form.ab_ex28" center name="ab_ex28" maxlength="11" type="number" required label="联系电话" placeholder="联系电话" :rules="[{ required: true, message: '请填写联系电话' }]">
					</van-field>
					<van-field v-model="form.ab_ex11" name="ab_ex11" maxlength="50" label="家庭住址" required placeholder="家庭住址" :rules="[{ required: true, message: '请填写家庭住址' }]" />
					
					<van-field readonly clickable name="ab_ex127" :value="form.ab_ex127" label="失能类别" placeholder="点击选择失能类别" @click="showPicker1 = true" />
					<van-popup v-model="showPicker1" position="bottom">
						<van-picker show-toolbar :columns="columns2" @confirm="onConfirm2($event,'ab_ex127','showPicker1')" @cancel="showPicker1 = false"></van-picker>
					</van-popup>
					
					<van-field readonly clickable name="ab_ex128" :value="form.ab_ex128" label="失能对象" placeholder="点击选择失能对象" @click="showPicker2 = true" />
					<van-popup v-model="showPicker2" position="bottom">
						<van-picker show-toolbar :columns="columns3" @confirm="onConfirm2($event,'ab_ex128','showPicker2')" @cancel="showPicker2 = false"></van-picker>
					</van-popup>
					
					<van-field v-model="form.ab_ex129" required name="ab_ex129" label="护理员姓名(养老机构名称)" placeholder="护理员姓名(养老机构名称)" />
					
					
					<div class="page1Div2">
						&nbsp;&nbsp;&nbsp;&nbsp;<span class="page1Div2Font">其他信息</span>
					</div>
					
					<van-field readonly clickable name="ab_ex130" :value="form.ab_ex130" label="吃饭失能表现" placeholder="点击选择吃饭失能表现" @click="showPicker3 = true" />
					<van-popup v-model="showPicker3" position="bottom">
						<van-picker show-toolbar :columns="columns4" @confirm="onConfirm2($event,'ab_ex130','showPicker3')" @cancel="showPicker3 = false"></van-picker>
					</van-popup>
					<!--  -->
					<van-field readonly clickable name="ab_ex131" :value="form.ab_ex131" label="穿衣失能表现" placeholder="点击选择穿衣失能表现" @click="showPicker4 = true" />
					<van-popup v-model="showPicker4" position="bottom">
						<van-picker show-toolbar :columns="columns4" @confirm="onConfirm2($event,'ab_ex131','showPicker4')" @cancel="showPicker4 = false"></van-picker>
					</van-popup>
					
					<van-field readonly clickable name="ab_ex132" :value="form.ab_ex132" label="上下床失能表现" placeholder="点击选择上下床失能表现" @click="showPicker5 = true" />
					<van-popup v-model="showPicker5" position="bottom">
						<van-picker show-toolbar :columns="columns4" @confirm="onConfirm2($event,'ab_ex132','showPicker5')" @cancel="showPicker5 = false"></van-picker>
					</van-popup>
					
					<van-field readonly clickable name="ab_ex133" :value="form.ab_ex133" label="如厕失能表现" placeholder="点击选择如厕失能表现" @click="showPicker6 = true" />
					<van-popup v-model="showPicker6" position="bottom">
						<van-picker show-toolbar :columns="columns4" @confirm="onConfirm2($event,'ab_ex133','showPicker6')" @cancel="showPicker6 = false"></van-picker>
					</van-popup>
					
					<van-field readonly clickable name="ab_ex134" :value="form.ab_ex134" label="室内走动失能表现" placeholder="点击选择室内走动失能表现" @click="showPicker7 = true" />
					<van-popup v-model="showPicker7" position="bottom">
						<van-picker show-toolbar :columns="columns4" @confirm="onConfirm2($event,'ab_ex134','showPicker7')" @cancel="showPicker7 = false"></van-picker>
					</van-popup>
					
					<van-field readonly clickable name="ab_ex135" :value="form.ab_ex135" label="洗澡失能表现" placeholder="点击选择洗澡失能表现" @click="showPicker8 = true" />
					<van-popup v-model="showPicker8" position="bottom">
						<van-picker show-toolbar :columns="columns4" @confirm="onConfirm2($event,'ab_ex135','showPicker8')" @cancel="showPicker8 = false"></van-picker>
					</van-popup>
					
					<van-field readonly clickable name="ab_ex136" :value="form.ab_ex136" label="控制大小便失能表现" placeholder="点击选择控制大小便失能表现" @click="showPicker9 = true" />
					<van-popup v-model="showPicker9" position="bottom">
						<van-picker show-toolbar :columns="columns4" @confirm="onConfirm2($event,'ab_ex136','showPicker9')" @cancel="showPicker9 = false"></van-picker>
					</van-popup>
					
					<van-field v-model="form.ab_ex53" label="请输入鉴定结论" rows="6" autosize type="textarea" placeholder="请输入鉴定结论" />
					
					<van-field readonly clickable name="ab_dat14" :value="form.ab_dat14" label="申请时间" placeholder="点击选择申请时间" @click="showPicker10 = true" />
					<van-popup v-model="showPicker10" position="bottom">
						<van-datetime-picker v-model="currentDate" type="date" @confirm="onConfirm3($event,'ab_dat14','showPicker10')" @cancel="showPicker10 = false" />
					</van-popup>
					
					<van-field v-model="form.ab_ex54" label="重度失能情况简介" rows="6" autosize type="textarea" placeholder="重度失能情况简介" />
					<van-field v-model="form.ab_ex55" label="能力评审委员会意见" rows="6" autosize type="textarea" placeholder="能力评审委员会意见" />
					
					
					
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

			<div id="page6" v-show="page6" class="page6Div1">
				<div class="page6Div2">
					<div class="page6Div3">
						<span class="page6Div3Span1"></span>
						<span style="color: #00AAFF;">照片</span>
					</div>
					<div class="page6Div4">
						<div style="height:40px;line-height:40px">身份证照片:</div>
						<div style="margin-top:10px;">
							<div style="position:relative;width:100%;float: left;">
								<div class="page6Div5">
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

				<div class="page6Div7">
					<div class="page6Div4">
						<div style="height:40px;line-height:40px">授权书及民主评议:</div>
						<div style="margin-top:10px;">
							<div style="position:relative;width:100%;float: left;">
								<div class="page6Div5">
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

				<div class="page6Div8">
					<div class="page6Div8Font">其他证明材料:</div>
					<div style="margin-top:10px;">
						<div id="zmcl" style="position:relative;width:91%;float: left;">
							<van-uploader v-model="fileList5" :before-read="beforeRead" :after-read="uploadImg(4)" :before-delete="beforeDelete('ab_ex16')" />
						</div>
					</div>
				</div>
				<!-- 核查结果 -->

				<div class="page6Div9">
					<div class="page6Div3">
						<span class="page6Div3Span1"></span>
						<span style="color: #00AAFF;">核查结果(不属实将自动生成诚信记录)</span>
					</div>
					<van-form style="margin-top: 20px;">

						<van-field required readonly clickable name="ab_ex79" :value="form.ab_ex79" label="情况是否属实"
							placeholder="点击选择情况是否属实" @click="showPicker61 = true" />
						<van-popup v-model="showPicker61" position="bottom">
							<van-picker show-toolbar :columns="columns16" @confirm="onConfirm2($event,'ab_ex79','showPicker61')"
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
	import {tszfValidate,tszfFilter,tszfFilter2,xzqh,getSex,isCardID,getAge,compressImg} from '@/utils/utils.js'
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
					ab_ex11: '',
					ab_ex28: '',
					ab_ex13: '',
					ab_ex85: '',
					// 材料上传
					ab_ex78: '',
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
				showPicker1: false,
				showPicker2: false,
				showPicker3: false,
				showPicker4: false,
				showPicker5: false,
				showPicker6: false,
				showPicker7: false,
				showPicker8: false,
				showPicker9: false,
				showPicker10: false,
				currentDate: new Date(),
				showxzqh: false,
				common: [],
				columns: ['户主本人', '配偶', '子女', '父母','兄弟姐妹','孙子女','其他'],
				columns2: ['老年', '残疾', '未成年'],
				columns3: ['城乡低保', '特困供养'],
				columns4: ['正常', '轻丧失','中丧失','完全丧失'],
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
					this.$toast.fail('请填写正确的手机号')
					return false
				}
				// 过滤家庭住址特殊字符和空格
				this.form.ab_ex11 = this.form.ab_ex11.replace(/\s*/g,"")
				this.form.ab_ex11 = tszfFilter(this.form.ab_ex11)
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
			onConfirm2(value,fitem,spicker) {
				this.form[fitem] = value;
				this[spicker] = false;
			},
			onConfirm3(date,fitem,spicker) {
				let YY = date.getFullYear() + '-';
				let MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				let DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
				this.form[fitem] = YY + MM + DD
				this[spicker] = false;
			},
			// onConfirm61(value) {
			// 	this.form.ab_ex79 = value;
			// 	this.showPicker61 = false;
			// },
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
					console.log(json.ab_ex13)
					console.log(this.$route.query.type)
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
				this.form.ab_ex145 = '重度失能'
				this.form.ab_ex158 = '重度失能'
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
					this.form.ab_ex70 = getAge(value)
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
		margin-bottom: 200px;
		/* padding-left: 20px; */
		/* display: none; */
	}
	.page6Div2{
		font-size:28px;
		text-align: left;
	}
	.page6Div3{
		border-bottom:#aaa solid 1px;
		font-size: 28px;
	}
	.page6Div3Span1{
		background-color: #00AAFF;
		display: inline-block;
		width: 10px;
		height: 20px;
	}
	.page6Div4{
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
	.page6Div5{
		width:40%;
		height:400px;
		text-align: center;
		float: left;
		margin-left:40px;
	}
	.page6Div7{
		font-size:28px;
		text-align: left;
		margin-top: 100px;
	}
	.page6Div8{
		overflow: auto;
		text-align:left;
		margin-left:4%;
		width:80%
		;height:500px;
		font-size:28px;
		color:#545454;
		padding-left:40px;
		padding-right:40px;
		border-radius: 30px;
		border:#aaa solid 1px;
	}
	.page6Div8Font{
		height:80px;
		line-height:80px;
		font-size: 28px;
	}
	.page6Div9{
		font-size:28px;
		padding-left:40px;
		padding-right:40px;
		text-align: left;
	}
</style>

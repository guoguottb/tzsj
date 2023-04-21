<template>
	<div class="g-box">
		<div class='g-box2'>
			<div class="info2">
			<el-form :model="dibaoForm" :rules="rules"  :inline-message="true" :show-message="false" ref="dibaoForm" label-width="auto" style='padding-right: 10px;'  @submit.native.prevent>
				<h3 class="line_blue" id="page1">&emsp;基本信息
				</h3>
				<div class="lineSt"></div>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="申请人姓名" prop="ab_ex3">
							<el-input  v-model="dibaoForm.ab_ex3" placeholder="请输入申请人姓名" @change="keyVerification(dibaoForm.ab_ex3,'ab_ex3')"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="身份证号码" prop="ab_ex7">
							<el-input v-model="dibaoForm.ab_ex7" placeholder="请输入身份证号码" @change="keyVerification(dibaoForm.ab_ex7,'ab_ex7')"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col>
						<el-form-item label="行政区划" prop="ab_ex162">
							<el-cascader :props="props" v-model="xzqhArray" placeholder="请选择"  style="width:100%;" v-if="isFinish"></el-cascader>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="户籍地址" prop="ab_ex4">
							<el-input v-model="dibaoForm.ab_ex4" placeholder="请输入户籍地址" @change="keyVerification(dibaoForm.ab_ex4,'ab_ex4')"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="家庭住址" prop="ab_ex11">
							<el-input v-model="dibaoForm.ab_ex11" placeholder="请输入家庭住址" @change="keyVerification(dibaoForm.ab_ex11,'ab_ex11')"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="户籍性质" prop="ab_ex6">
							<el-select v-model="dibaoForm.ab_ex6" style="width:100%">
								<el-option label="非农业户口" value="非农业户口"></el-option>
								<el-option label="农业户口" value="农业户口"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="家庭人口" prop="ab_ex5">
							<el-input v-model="dibaoForm.ab_ex5" placeholder="请输入家庭人口"  @change="keyVerification(dibaoForm.ab_ex5,'ab_ex5')"></el-input>
						</el-form-item>
					</el-col>
					
				</el-row>
				<el-row :gutter="20">
					<el-col :span="24">
						<el-form-item label="联系电话" prop="ab_ex28">
							<el-input v-model="dibaoForm.ab_ex28" placeholder="请输入联系电话(手机)" @change="keyVerification(dibaoForm.ab_ex28,'ab_ex28')"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="24">
						<el-form-item label="求助原因" prop="ab_ex46" >
							<el-select v-model="ab_ex46" multiple  placeholder="请选择求助原因(可多选)"  @change="changeAmt" style="width:100%">
								<el-option label="缺乏劳动力" value="缺乏劳动力"></el-option>
								<el-option label="无生活来源" value="无生活来源"></el-option>
								<el-option label="疾病" value="疾病"></el-option>
								<el-option label="残疾" value="残疾"></el-option>
								<el-option label="教育" value="教育"></el-option>
								<el-option label="住房" value="住房"></el-option>
								<el-option label="受灾" value="受灾"></el-option>
								<el-option label="其他" value="其他"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="24">
						<el-form-item label="是否属于村干部或经办人员近亲属"  label-width="260px" prop="ab_ex92">
							<el-select v-model="dibaoForm.ab_ex92" style="width:100%"  @change="changeFm4(dibaoForm.ab_ex92)">
								<el-option label="否" value="否"></el-option>
								<el-option label="是" value="是"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="一卡通开户银行" prop="ab_ex42">
							<el-input v-model="dibaoForm.ab_ex42" placeholder="请输入开户银行"  @change="keyVerification(dibaoForm.ab_ex42,'ab_ex42')" ></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="开户人" prop="ab_ex8">
							<el-input v-model="dibaoForm.ab_ex8" placeholder="请输入开户人"  @change="keyVerification(dibaoForm.ab_ex8,'ab_ex8')"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="(this.dibaoForm.ab_ex13 == '低保'? 12 : 24)">
						<el-form-item label="一卡通银行账号" prop="ab_ex43">
							<el-input v-model="dibaoForm.ab_ex43" placeholder="请输入银行账号"  @change="keyVerification(dibaoForm.ab_ex43,'ab_ex43')"></el-input>
						</el-form-item>
					</el-col>
					
				</el-row>
				
				



				<h3 class="line_blue" id="page8" style='margin-top:15px'>&emsp;变更信息</h3>
				<div class="lineSt"></div>
				<el-row :gutter="20">
					<el-col :span="24">
						<span class="change_title">(请尽量将变更理由写详细，80字以内--</span>
						<el-popover	placement="top"	width="650"	trigger="hover"
						content="如：申请人基本信息修改；保障标准调整...">
							<ins  slot="reference" style="color:#3585ff;cursor: pointer;">例如</ins>
						</el-popover>
						<span>)</span>
					</el-col>
				</el-row>
			
				<el-row :gutter="20">
					<el-col :span="24">
						<el-form-item label='变更理由说明' >
							<!-- <el-select v-model='changeM.ac_ex10' placeholder='请选择'>
								<el-option label='人口增加' value='人口增加'></el-option>
								<el-option label='人口减少' value='人口减少'></el-option>
								<el-option label='收入变化' value='收入变化'></el-option>
								<el-option label='保障标准调整' value='保障标准调整'></el-option>
								<el-option label='其他' value='其他'></el-option>
							</el-select> -->
							<el-input  v-model='changeM.ac_ex10'
								placeholder='请输入说明情况'></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label='变更时间'>
							<el-date-picker type="datetime" v-model="changeM.ac_dat1" value-format="yyyy-MM-dd HH:mm:ss"  style="width: 100%;"  >
							<!-- <el-date-picker type="date" v-model="changeM.ac_dat1"  style="width: 100%;"  > -->
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				
				
				
				

				
				<h3 class="line_blue" id="page6" style='margin-top:15px'>&emsp;金融资产</h3>
				<div class="lineSt"></div>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="银行总存款" prop="ab_ex36">
							<el-input v-model="dibaoForm.ab_ex36" placeholder="请输入银行总存款"  @change="keyVerification(dibaoForm.ab_ex36,'ab_ex36')"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="有价证券" prop="ab_ex60">
							<el-input v-model="dibaoForm.ab_ex60" placeholder="请输入有价证券"  @change="keyVerification(dibaoForm.ab_ex60,'ab_ex60')"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="基金" prop="ab_ex179">
							<el-input v-model="dibaoForm.ab_ex179" placeholder="请输入基金"  @change="keyVerification(dibaoForm.ab_ex179,'ab_ex179')"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="商业保险" prop="ab_ex180">
							<el-input v-model="dibaoForm.ab_ex180" placeholder="请输入商业保险"  @change="keyVerification(dibaoForm.ab_ex180,'ab_ex180')"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="债权" prop="ab_ex61">
							<el-input v-model="dibaoForm.ab_ex61" placeholder="请输入债权"  @change="keyVerification(dibaoForm.ab_ex61,'ab_ex61')"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="其他金融产品" prop="ab_ex37">
							<el-input v-model="dibaoForm.ab_ex37" placeholder="请输入其他金融产品"  @change="keyVerification(dibaoForm.ab_ex37,'ab_ex37')"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				
			

				<h3 class="line_blue" id="page7" style="margin-top:15px">&emsp;身份证及其他证明材料上传</h3>
				<div class="lineSt"></div>
				<div id="recordt">
						<el-row :gutter="20">
						<el-col :span="12" class="my-col">
							<el-card class="box-card">
								<div slot="header" class="clearfix">
									<el-button style="float: left; padding: 3px 0" type="text" @click="handleRemove(uploadImg,'ab_ex10')">
										删除</el-button>
									<span>身份证拍照(正反面)(<span style='color:red'>{{imgNum.ab_ex10_img}}</span>)</span>
									<el-button style="float: right; padding: 3px 0" type="text"  @click="uploads('ab_ex10', 'dibaoForm')">上传</el-button>
								</div>
								<div class="block">
									<image-view :imgList="uploadImg.ab_ex10_img" id="ab_ex10"  @Imgindex='getImgIndex' ></image-view>
								</div>
							</el-card>
						</el-col>
						<el-col :span="12" class="my-col">
							<el-card class="box-card">
								<div slot="header" class="clearfix">
									<el-button style="float: left; padding: 3px 0" type="text" @click="handleRemove(uploadImg,'ab_ex177')">
										删除</el-button>
									<span>纸质授权书(<span style='color:red'>{{imgNum.ab_ex177_img}}</span>)</span>
									<el-button style="float: right; padding: 3px 0" type="text" @click="uploads('ab_ex177', 'dibaoForm')">上传</el-button>
								</div>
								<div class="block">
									<image-view :imgList="uploadImg.ab_ex177_img" id="ab_ex177"  @Imgindex='getImgIndex'></image-view>
								</div>
							</el-card>
						</el-col>
					</el-row>
					<el-row :gutter="20" style='margin-top:10px'>
						<el-col :span="12" class="my-col">
							<el-card class="box-card">
								<div slot="header" class="clearfix">
									<el-button style="float: left; padding: 3px 0" type="text" @click="handleRemove(uploadImg,'ab_ex16')">
										删除</el-button>
									<span>其他证明材料(<span style='color:red'>{{imgNum.ab_ex16_img}}</span>)</span>
									<el-button style="float: right; padding: 3px 0" type="text" @click="uploads('ab_ex16', 'dibaoForm')">上传</el-button>
								</div>
								<div class="block">
									<image-view :imgList="uploadImg.ab_ex16_img" id="ab_ex16"  @Imgindex='getImgIndex' ></image-view>
								</div>
							</el-card>
						</el-col>
						<el-col :span="12" class="my-col">
							<el-card class="box-card">
								<div slot="header" class="clearfix">
									<el-button style="float: left; padding: 3px 0" type="text" @click="handleRemove(uploadImg,'ab_ex74')">
										删除</el-button>
									<span>审核审批表(<span style='color:red'>{{imgNum.ab_ex74_img}}</span>)</span>
									<el-button style="float: right; padding: 3px 0" type="text" @click="uploads('ab_ex74', 'dibaoForm')">上传</el-button>
								</div>
								<div class="block">
									<image-view :imgList="uploadImg.ab_ex74_img" id="ab_ex74"  @Imgindex='getImgIndex' ></image-view>
								</div>
							</el-card>
						</el-col>
					</el-row>
					<el-row :gutter="20" style='margin-top:10px'>
						<el-col :span="12" class="my-col">
							<el-card class="box-card">
								<div slot="header" class="clearfix">
									<el-button style="float: left; padding: 3px 0" type="text" @click="handleRemove(uploadImg,'ab_ex97')">
										删除</el-button>
									<span>民主评议(<span style='color:red'>{{imgNum.ab_ex97_img}}</span>)</span>
									<el-button style="float: right; padding: 3px 0" type="text" @click="uploads('ab_ex97','dibaoForm')">上传</el-button>
								</div>
								<div class="block">
									<image-view :imgList="uploadImg.ab_ex97_img" id="ab_ex97"  @Imgindex='getImgIndex' ></image-view>
								</div>
							</el-card>
						</el-col>
						<el-col :span="12" class="my-col">
							<el-card class="box-card">
								<div slot="header" class="clearfix">
									<el-button style="float: left; padding: 3px 0" type="text" @click="handleRemove(uploadImg,'ab_ex98')">
										删除</el-button>
									<span>公示图片(<span style='color:red'>{{imgNum.ab_ex98_img}}</span>)</span>
									<el-button style="float: right; padding: 3px 0" type="text" @click="uploads('ab_ex98','dibaoForm')">上传</el-button>
								</div>
								<div class="block">
									<image-view :imgList="uploadImg.ab_ex98_img" id="ab_ex98"  @Imgindex='getImgIndex' ></image-view>
								</div>
							</el-card>
						</el-col>
					</el-row>
					<el-row :gutter="20" style='margin-top:10px'>
						<el-col :span="12" class="my-col">
							<el-card class="box-card">
								<div slot="header" class="clearfix">
									<el-button style="float: left; padding: 3px 0" type="text" @click="handleRemove(uploadImg,'ab_ex73')">
										删除</el-button>
									<span>电子授权书(<span style='color:red'>{{imgNum.ab_ex73_img}}</span>)</span>
									<el-button style="float: right; padding: 3px 0" type="text" @click="uploads('ab_ex73', 'dibaoForm')">上传</el-button>
								</div>
								<div class="block">
									<image-view :imgList="uploadImg.ab_ex73_img" id="ab_ex73"  @Imgindex='getImgIndex' ></image-view>
								</div>
							</el-card>
						</el-col>
					</el-row>
					<el-row :gutter="20" style='margin-top:10px'>
						
					</el-row>
				</div>

				
				<el-dialog :visible.sync="dialogVisible" append-to-body>
					<el-image :src="dialogImageUrl" :preview-src-list="dialogImageArray"></el-image>
				</el-dialog>
				<el-dialog title="上传" :visible.sync="dialogVisible3" width="500px" append-to-body  @close='uploadEvent2'>
					<upload @upload="uploadEvent" ref="myUpload"></upload>
					<span slot="footer" class="dialog-footer">
						<el-button @click="dialogVisible3 = false">取 消</el-button>
						<el-button type="primary" @click="dialogVisible3 = false">确 定</el-button>
					</span>
				</el-dialog>
			</el-form>
			</div>
			<!-- 右边导航 -->
			<div class="ainfo2">
				<div style="margin-left:20px;text-align:center;border-bottom:1px solid #ddd;padding-bottom:10px;">
					<el-button type="primary" size="small" @click="saveDeletedReason"  :disabled='disabled'>保存</el-button>
					<el-button size="small" @click="closeView">返回</el-button>
					<el-button type="success" size="small" @click="getDatailMoney('see')" v-if="['低保','特困供养'].includes(this.dibaoForm.ab_ex13) && ['低收入型低保',''].includes(this.dibaoForm.ab_ex41)">救助金</el-button>
				</div>
				<div style="margin-left:40px;margin-top:20px;"> 
					<ul>
						<li :class="{listStyle:isShow1}" @click="isShow(1)">
							<a class="ainfoFont" :class="{listStyleA:!isShow1}" 
							@click="counter('#page1')">基本信息</a><br>
						</li>
						
						<li :class="{listStyle:isShow8}" @click="isShow(8)">
							<a class="ainfoFont" :class="{listStyleA:!isShow8}" 
							@click="counter('#page8')">变更信息</a><br>
						</li>
						
						<li :class="{listStyle:isShow6}" @click="isShow(6)">
							<a class="ainfoFont" :class="{listStyleA:!isShow6}" 
							@click="counter('#page6')">金融资产</a><br>
						</li>
						
						<li :class="{listStyle:isShow7}" @click="isShow(7)">
							<a class="ainfoFont" :class="{listStyleA:!isShow7}"
							@click="counter('#page7')">身份证及其他证明材料</a><br>
						</li>
					</ul>
				</div>
			</div>
			
		</div>
		
	
	</div>
</template>

<script>
	import request from '@/utils/request'
	import {checkPhone,isName,isFamilyNum,isText,isNum,isBankID,isCardID,warningContent,isSpecialAccount} from '@/utils/until'
	import upload from '../upload'
	import imageView from '../imageView'
	export default {
		name: "dbListChangeEdit",
		components: {
			upload,
			imageView
		},
		data() {
			return {
				deletedReason:[],//核减原因
				pickerOptions: {
				    disabledDate(time) {
                    	// 限制预警时间只能选择第10天及以后
					    return time.getTime() < Date.now();
					    // return time.getTime() < Date.now() + 8.64e7*9;
                    }
                },  
				
				test:{  
					xzqhArray:[]
				},
				xzqhArray:[],  // 区划
				isFinish:false,
				// el-cascader懒加载
				props: {
					lazy: true,
					lazyLoad(node, resolve) {
						const { level } = node; // 获取当前node对象中的level属性
						let pId="0";
						if(level>0){
							let value=node.value;
							if(value){
								let values=value.split("#")
								pId=values.length>1 ? values[1]:"0";
							}
						}
						request({
							url:"/social/assistance/getCityOption",
							method:"post",
							data:{ pId:pId },
						}).then(res => {

						}).catch(res=>{
							const nodes = res.response.data;
							nodes.forEach(item => {
								item.value = item.cs_ex2+"#"+item.cs_ex1;
								item.label = item.cs_ex2;
								item.leaf = level >= 2; //判断是否为末尾节点，这个地方是0,1,2三级
							})
							resolve(nodes);
						})
					}
				},
				
				// 户主关系，
				dibaoForm: {},
				common:[],
				uploadImg:{
					ab_ex10_img: [],
					ab_ex16_img: [],
					ab_ex73_img: [],
					ab_ex74_img: [],
					ab_ex97_img: [],
					ab_ex98_img: [],
					// ab_ex166_img: [],//房屋整体图片
					// ab_ex167_img: [],//房屋室内图片
					ab_ex177_img: [],//纸质授权书
					
					
				},
				imgNum:{},//图片数量
				uploadId:'',
				imgIndex: { //图片索引
					ab_ex10: 0,
					ab_ex16: 0,
					ab_ex73: 0,
					ab_ex74: 0,
					ab_ex97: 0,
					ab_ex98: 0,
					// ab_ex166: 0,
					// ab_ex167: 0,
					ab_ex177: 0,
					// ab_ex196: 0,
					// ab_ex197: 0,
				
					
				},
				
				rules: {
					ab_ex3: [{
						required: true,
						message: '申请人姓名不能为空',
						trigger: 'blur'
					}],
					ab_ex7: [{
						required: true,
						message: '申请人身份证不能为空',
						trigger: 'blur'
					}],
					ab_ex162: [{
						required: true,
						message: '行政区划不能为空',
						trigger: 'blur'
					}],
					
					ab_ex4: [{
						required: true,
						message: '户籍地址不能为空',
						trigger: 'blur'
					}],
					ab_ex11: [{
						required: true,
						message: '家庭住址不能为空',
						trigger: 'blur'
					}],
					ab_ex5: [{
						required: true,
						message: '家庭人口不能为空',
						trigger: 'blur'
					}],
					ab_ex28: [{
						required: true,
						message: '联系电话不能为空',
						trigger: 'blur'
					}],
					ab_ex6: [{
						required: true,
						message: '户籍性质不能为空',
						trigger: 'blur'
					}],
					ab_ex46: [{
						required: true,
						message: '求助原因不能为空',
						trigger: 'blur'
					}],
					ab_ex92: [{
						required: true,
						message: '是否属于村干部或经办人员近亲属不能为空',
						trigger: 'blur'
					}],
                    
					ab_ex42: [{
						required: true,
						message: '一卡通开户银行不能为空',
						trigger: 'blur'
					}],
					ab_ex8: [{
						required: true,
						message: '开户人不能为空',
						trigger: 'blur'
					}],
					ab_ex43: [{
						required: true,
						message: '一卡通银行账号不能为空',
						trigger: 'blur'
					}],
					ab_ex10: [{
						required: true,
						message: '身份证照片不能为空',
						trigger: 'blur'
					}],
					
				},
				
				// 变更数据
				changeM: {
					ac_ex10: '',
					ac_dat1: new Date(),
					// ac_ex10_2: ''
				},
			
				checkedWarningData: [],
				
				
				help_reason_list:['缺乏劳动力','无生活来源','疾病','残疾','教育','住房','受灾','其他'],
				ab_ex46:[], //求助原因
				
				dialogImageUrl: '',
				dialogImageArray: [],
				dialogVisible: false, //核减列表显示
				dialogVisible2: false, //明细表显示
				dialogVisible3: false, //图片上传组件
				dialogVisible4: false, //政策计算器
				jkShow1: true,
				jkShow2: true,
				isShow1: false,
				isShow2: true,
				isShow3: true,
				isShow4: true,
				isShow5: true,
				isShow6: true,
				isShow7: true,
				isShow8: true,
				isShow9: true,
				isShow10: true,
				isShow11: true,
				isShow12: true,
				isShow13: true,
				isShow17: true,
				isShow18: true,
				isShow21: true,
				isShow22: true,
				dibaoFormOld: [],
				visible: false,
				leaveSave:false, //离开页面的弹窗
				isSaves:false,   //控制保存按钮禁用
				isTest:false,    //保存时控制数据验证
				tkStandard:'',   //特困救助标准
				dbStandard:'',   //低保救助标准
				zcStandard:'',	//人均可支配常数
				incomeConstant:'', // 月均可支配收入常数
				ab_ex200:'',     //输入的生活费

			
				// 总发放金额
				ab_ex40:'',
				setType:'',  //  现在 政策计算器提示内容
				assistanceType:'',//原来 政策计算器提示内容
				ab_ex13:'',  //选择的类型

				
				datas:[],  //变更报告
				moneybtn:false, //false 明细没有确定按钮 ture 有明细按钮
				childrenWarning:[], //儿童预警
				showChildren:false, //兴化儿童预警显示
				old_abm_ex71:[],//老的儿童救助金
				disabled:false,  //保存禁用
				specialAccount:false, //是否为特殊账号 true 是，false 否
				
			}
		},
		mounted() {
			// 滚动鼠标右侧导航栏跟随滚动位置改变而改变显示
			// window.removeEventListener('scroll',this.scroll,false)
			window.addEventListener('scroll',this.scroll,true)
		},

		//未保存离开页面的提示 
		beforeRouteLeave (to, from, next) {
			if(this.leaveSave){
				next();
			}else{
				const answer = window.confirm('当前数据未核查完成，是否确定要离开？')
				if (answer) {
					next();
				} else {
					next(false);
				}
			}
		},

		watch:{
			xzqhArray(newA,oldA){
				// console.log(newA);
				if(newA.length>0){
					let qu = newA[0].split("#")[0]
					let cun = newA[1].split("#")[0]
					let zhen = newA[2].split("#")[0]
					// let i =qu+"#"+cun+"#"+zhen
					this.dibaoForm.ab_ex162 = newA[0]+","+newA[1]+","+newA[2]
					this.dibaoForm.ab_ex161 = qu
					this.dibaoForm.ab_ex1 = zhen
					this.dibaoForm.ab_ex2 = cun
					console.log(qu,zhen,cun,'区划监听');
				}
				// console.log(i)
			}
		},

		created() {
			this.loadData();
			// this.getStandard();
		},
	
		methods: {
		
			
			// 正则校验输入数据
			keyVerification(key,id){
				//js去掉所有空格 \s表示查找空格带上加好表示连续的空格
				// console.log(key);
				key = key.replace(/\s+/g,""); 
				var msg="";

				//申请人姓名
				if(id=="ab_ex3"){
					this.dibaoForm.ab_ex3=key; 
					msg = isName(key,id)
					if(msg!==true){
						// console.log(msg,"msg");
						this.$message.warning(msg) 
						this.isSaves=false;
						return false;
					}
				}

				// 申请人身份证号
				if(id=="ab_ex7"){
					this.dibaoForm.ab_ex7=key; 
					this.dibaoForm.ab_ex7=key.replace(/x$/i,"X");
					msg=isCardID(key,id)
					if(msg!=true){
						// console.log(msg);
						this.$message.warning("申请人"+msg);
						this.isSaves=false;
						return false;
					}
				}

				// 户籍地址，家庭住址--不能含有特殊字符或空格
				if(id=="ab_ex4"){
					this.dibaoForm.ab_ex4=key
					msg=isText(key,id);
					if(msg!=true){
						this.$message.warning(msg);
						this.isSaves=false;
						return false;
					}
				}
				// 家庭住址
				if(id=="ab_ex11"){
					this.dibaoForm.ab_ex11=key
					msg=isText(key,id);
					if(msg!=true){
						this.$message.warning(msg);
						this.isSaves=false;
						return false;
					}
				}
				// 家庭人口
				if(id=="ab_ex5"){
					this.dibaoForm.ab_ex5=key
					msg=isFamilyNum(key,id)
					if(msg!=true){
						this.$message.warning(msg);
						this.isSaves=false;
						return false;
					}
				}
				
				// 联系电话
				if(id=="ab_ex28"){
					this.dibaoForm.ab_ex28=key
					msg=checkPhone(key,id)
					if(msg!=true){
						this.$message.warning(msg);
						this.isSaves=false;
						return false;
					}
				} 
				// 银行名称
				if(id=="ab_ex42"){
					console.log(key);
					this.dibaoForm.ab_ex42=key.replace(/\s+/g,""); 
					msg=isName(key,id)
					if(msg!=true){
						this.$message.warning(msg)
						this.isSaves=false;
						return false;
					}
				}
				// 开户人
				if(id=="ab_ex8"){
					console.log(key,id);
					this.dibaoForm.ab_ex8=key.replace(/\s+/g,""); 
					msg=isName(key,id);
					if(msg!=true){
						this.$message.warning(msg)
						this.isSaves=false;
						return false;
					}
				}
				// 一卡通账号
				if(id == "ab_ex43"){
					console.log("一卡通",key);
					this.dibaoForm.ab_ex43=key.replace(/\s+/g,""); 
					msg = isBankID(key,id);
					if(msg!=true){
						this.$message.warning(msg);
						this.isSaves=false;
						return false;
					}
				}

				
			},
			scroll(){
				// var scrollTop =document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset;
				if(document.querySelector('.info2')==null || document.querySelector('#recordt')==null){
					return ''
				}
				// console.log(document.querySelector('.info2'),document.querySelector('#recordt')==null,'456456----')
				let scrollTop = document.querySelector('.info2').scrollTop
				let cHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
				let oDiv1 = document.querySelector('#page1');
				let oDiv2 = document.querySelector('#page2');
				let oDiv3 = document.querySelector('#page3');
				let oDiv4 = document.querySelector('#page4');
				let oDiv5 = document.querySelector('#page5');
				let oDiv6 = document.querySelector('#page6');
				let oDiv7 = document.querySelector('#page7');
				let oDiv8 = document.querySelector('#page8');
				let oDiv9 = document.querySelector('#page9');
				let oDiv10 = document.querySelector('#page10');
				let oDiv11 = document.querySelector('#page11');
				let oDiv12 = document.querySelector('#page12');
				let oDiv13 = document.querySelector('#page13');
				let oDiv17 = document.querySelector('#page17');
				let oDiv18 = document.querySelector('#page18');
				let oDiv21 =  true;
				if(this.dibaoForm.ab_ex92=="是"){
					oDiv21 =  document.querySelector('#page21');
				}
				let oDiv22 = true;
				if(this.dibaoForm.ab_ex13=='特困供养'){
					oDiv22 = document.querySelector('#page22');
				}
				// 顺序跟上面显示顺序要相反
				let clientHeight = document.querySelector('.info2').clientHeight
				let recordtClientHeight = document.querySelector('#recordt').scrollHeight
				if(!oDiv1 || !oDiv2 || !oDiv3 || !oDiv4 || !oDiv5 || !oDiv6 || !oDiv7|| !oDiv8|| !oDiv9|| !oDiv10|| !oDiv11|| !oDiv12|| !oDiv13|| !oDiv17|| !oDiv18|| !oDiv21|| !oDiv22){
					return ''
				}
				if(recordtClientHeight+oDiv7.clientHeight<clientHeight && scrollTop>(oDiv7.offsetTop-oDiv1.offsetTop-clientHeight+recordtClientHeight+oDiv7.clientHeight)){
					// console.log('触发了7-1')
					this.isShow(7)
				}else if(scrollTop > (oDiv7.offsetTop-oDiv1.offsetTop-1)){
					// console.log('触发了7-2')
					this.isShow(7)
				}else if(scrollTop > (oDiv22.offsetTop-oDiv1.offsetTop)){
					// console.log('触发了22')
					this.isShow(22)
				}else if(scrollTop > (oDiv18.offsetTop-oDiv1.offsetTop)){
					// console.log('触发了18')
					this.isShow(18)
				}else if(scrollTop > (oDiv17.offsetTop-oDiv1.offsetTop)){
					// console.log('触发了17')
					this.isShow(17)
				}else if(scrollTop > (oDiv13.offsetTop-oDiv1.offsetTop-1)){
					// console.log('触发了13')
					this.isShow(13)
				}else if(scrollTop > (oDiv12.offsetTop-oDiv1.offsetTop-1)){
					// console.log('触发了12')
					this.isShow(12)
				}else if(scrollTop > (oDiv11.offsetTop-oDiv1.offsetTop-1)){
					// console.log('触发了11')
					this.isShow(11)
				}else if(scrollTop > (oDiv6.offsetTop-oDiv1.offsetTop-1)){
					// console.log('触发了6')
					this.isShow(6)
				}else if(scrollTop > (oDiv10.offsetTop-oDiv1.offsetTop-1)){
					// console.log('触发了10')
					this.isShow(10)
				}else if(scrollTop > (oDiv5.offsetTop-oDiv1.offsetTop-1)){
					// console.log('触发了5')
					this.isShow(5)
				}else if(scrollTop > (oDiv9.offsetTop-oDiv1.offsetTop-1)){
					// console.log('触发了9')
					this.isShow(9)
				}else if(scrollTop > (oDiv4.offsetTop-oDiv1.offsetTop-1)){
					// console.log('触发了4')
					this.isShow(4)
				}else if(scrollTop > (oDiv3.offsetTop-oDiv1.offsetTop-1)){
					// console.log('触发了3')
					this.isShow(3)
				}else if(scrollTop > (oDiv8.offsetTop-oDiv1.offsetTop-1)){
					// console.log('触发了8')
					this.isShow(8)
				}else if(scrollTop > (oDiv2.offsetTop-oDiv1.offsetTop-1)){
					// console.log('触发了2')
					this.isShow(2)
				}else if(scrollTop > (oDiv21.offsetTop-oDiv1.offsetTop)){
					// console.log('触发了21')
					this.isShow(21)
				}else if(scrollTop > (oDiv1.offsetTop-oDiv1.offsetTop-1)){
					// console.log('触发了1')
					this.isShow(1)
				}
			},
			counter(id) { //counter1是绑定的点击事件名称
				document.querySelector(id).scrollIntoView(true);
				// const returnEle = document.querySelector("#page8"); //productId是将要跳转区域的id
				// if (!!returnEle) {
				// 	returnEle.scrollIntoView(true); // true 是默认的
				// }
				// document.querySelector("counter1").scrollIntoView(true); //这里的counter1是将要返回地方的id
			},

			async loadData() {

				await this.checkSpecialAccount()
				.then()
				.catch((res)=>{
					try {
						console.log(res.response.data[0].specialAccount,'账号验证');

						this.specialAccount = res.response.data[0].specialAccount;

					} catch (error) {
						this.$message.error(error)
					}
				})
				
				// if(!this.specialAccount){

				// 	this.rules.ab_ex177= [{
				// 		required: true,
				// 		message: '纸质授权书不能为空',
				// 		trigger: 'blur'
				// 	}]

				// }else{
				// 	this.rules.ab_ex177=[];
				// }

				// console.log(this.rules,'校验数组');
				// console.log(this.specialAccount,'是否是特殊账号');

				//救助标准
				this.sId = this.$route.query.sId;
				this.cId = this.$route.query.cId;
				this.type = this.$route.query.type;
				this.isFinish = false;

				this.getBasicsChange({
					sId: this.$route.query.sId,
					// type: "低保",
					company: "泰州市姜堰区社会救助综合平台"
				}).then(res =>  {
					if(res.response.data[0].msg=="该信息正在进行变更申请，不能进行变更操作"){
						//this.$message.error(res.response.data[0].msg)
						this.$alert(res.response.data[0].msg, {
							confirmButtonText: '确定',
							callback: action => {
								this.$emit("closes", false)
								// this.$router.go(-1)
								this.closeView();
							}
						});
						
					}else{
						this.dibaoFormOld = JSON.parse(JSON.stringify(res[0].data));
						this.dibaoForm = res[0].data[0];
						this.common = res[0].common;
						this.uploadImg.ab_ex73_img = res[0].data[0].ab_ex73.split(",");
						this.uploadImg.ab_ex10_img = res[0].data[0].ab_ex10.split(",");   //身份证照片
						this.uploadImg.ab_ex16_img = res[0].data[0].ab_ex16.split(",");
						this.uploadImg.ab_ex97_img = res[0].data[0].ab_ex97.split(","); //民主评议
						this.uploadImg.ab_ex98_img = res[0].data[0].ab_ex98.split(","); //公示
						this.uploadImg.ab_ex74_img = res[0].data[0].ab_ex74.split(","); //审核审批表
						// this.uploadImg.ab_ex166_img = res[0].data[0].ab_ex166.split(",");//居住外
						// this.uploadImg.ab_ex167_img = res[0].data[0].ab_ex167.split(",");//居住内
						this.uploadImg.ab_ex177_img = res[0].data[0].ab_ex177.split(",");//纸质授权书
						
						let  xzqhArray=this.dibaoForm.ab_ex162.split(",");
						if(res.response.data[0].data[0].ab_ex46!=""){
							this.ab_ex46 = res.response.data[0].data[0].ab_ex46.split(",");
						}else{
							this.ab_ex46=[];//消除数组ab_ex46中的空元素
						}
						if(xzqhArray.length==3){
							this.$set(this.xzqhArray,0,xzqhArray[0]);
							this.$set(this.xzqhArray,1,xzqhArray[1]);
							this.$set(this.xzqhArray,2,xzqhArray[2]);
							this.$set(this.test,"xzqhArray",xzqhArray);
						}
						this.isFinish=true;
					}
				}).catch(res => {
					if(typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200){
						console.log('请求失败了-----------------------')
						// this.$message.error('数据获取失败或请求超时')
						// this.$emit("closes", false)
						// this.$router.go(-1)

						return false
					}
					// 如果是正在变更的数据，则进行弹框提示 不再继续往下进行其他操作
					if(res.response.data[0].msg=="该信息正在进行变更申请，不能进行变更操作"){
						//this.$message.error(res.response.data[0].msg)
						this.$alert(res.response.data[0].msg, {
							confirmButtonText: '确定',
							callback: action => {
								this.leaveSave=true; //不再做离开页面的弹框提示
								this.$emit("closes", false)
								// this.$router.go(-1)
								this.closeView();
							}
						});
						
					}else{
						// 过滤数据库里传"NULL"的字段
						for(let i in res.response.data[0].data[0]){
							if(res.response.data[0].data[0][i]=="NULL"){
								res.response.data[0].data[0][i]=""
							}
						}

						// 如果是特困的数据 生活费为空时 自动将特困救助标准赋给生活费，否则用其原本的值
					

						this.dibaoFormOld = JSON.parse(JSON.stringify(res.response.data[0].data));
						this.dibaoForm = res.response.data[0].data[0];
						this.common = res.response.data[0].common; //是增发类别，但是数据杂乱 貌似没什么用

						this.uploadImg.ab_ex10_img = res.response.data[0].data[0].ab_ex10.split(",");
						this.uploadImg.ab_ex16_img = res.response.data[0].data[0].ab_ex16.split(",");
						this.uploadImg.ab_ex73_img = res.response.data[0].data[0].ab_ex73.split(",");
						this.uploadImg.ab_ex74_img = res.response.data[0].data[0].ab_ex74.split(",");
						this.uploadImg.ab_ex97_img = res.response.data[0].data[0].ab_ex97.split(",");
						this.uploadImg.ab_ex98_img = res.response.data[0].data[0].ab_ex98.split(",");
						// this.uploadImg.ab_ex166_img = res.response.data[0].data[0].ab_ex166.split(",");
						// this.uploadImg.ab_ex167_img = res.response.data[0].data[0].ab_ex167.split(",");
						this.uploadImg.ab_ex177_img = res.response.data[0].data[0].ab_ex177.split(",");
							
						for(let i in this.uploadImg){
							var r = this.uploadImg[i].filter(function (s) {
										return s && s.trim();
									});

							// console.log(r,"过滤数组");
							if(i=='ab_ex10_img'){
								this.dibaoForm.ab_ex10 = r.join(",")
								this.uploadImg.ab_ex10_img = r;
							}else if(i=='ab_ex16_img'){
								this.dibaoForm.ab_ex16=r.join(",")
								this.uploadImg.ab_ex16_img = r;
							}else if(i=='ab_ex73_img'){
								this.dibaoForm.ab_ex73=r.join(",")
								this.uploadImg.ab_ex73_img = r;
							}else if(i=='ab_ex74_img'){
								this.dibaoForm.ab_ex74=r.join(",")
								this.uploadImg.ab_ex74_img = r;
							}else if(i=='ab_ex97_img'){
								this.dibaoForm.ab_ex97=r.join(",")
								this.uploadImg.ab_ex97_img = r;
							}else if(i=='ab_ex98_img'){
								this.dibaoForm.ab_ex98=r.join(",")
								this.uploadImg.ab_ex98_img = r;
							}
							// else if(i=='ab_ex166_img'){
							// 	this.dibaoForm.ab_ex166=r.join(",")
							// 	this.uploadImg.ab_ex166_img = r;
							// }else if(i=='ab_ex167_img'){
							// 	this.dibaoForm.ab_ex167=r.join(",")
							// 	this.uploadImg.ab_ex167_img = r;
							// }
							else if(i=='ab_ex177_img'){
								this.dibaoForm.ab_ex177=r.join(",")
								this.uploadImg.ab_ex177_img = r;
							}
						}
						
						// 获取图片数量
						this.getImgNum()

						// 变更时间
						let dates = new Date();
						let y = dates.getFullYear();
						let M = dates.getMonth() + 1;
						let d = dates.getDate();
						let h = dates.getHours();
						let m = dates.getMinutes();
						let s = dates.getSeconds();
						let time = y + '-' + M + '-' + d+' '+ h +":"+ m + ":" + s;
						this.changeM.ac_dat1 = time;
						// console.log(this.changeM.ac_dat1,'load变更时间'); 

						if(res.response.data[0].data[0].ab_ex46!=""){
							this.ab_ex46 = res.response.data[0].data[0].ab_ex46.split(",");
						}else{
							this.ab_ex46=[];//消除数组ab_ex46中的空元素
						}

						// //是否为村干部选项过滤--不是 "是"/"否"，清空
						// if(this.dibaoForm.ab_ex92!="" && (this.dibaoForm.ab_ex92!="是" || this.dibaoForm.ab_ex92!="否")){
						// 	this.dibaoForm.ab_ex92=""
						// }

						let xzqhArray = this.dibaoForm.ab_ex162.split(",");
						if(xzqhArray.length==3){
							this.$set(this.xzqhArray,0,xzqhArray[0]);
							this.$set(this.xzqhArray,1,xzqhArray[1]);
							this.$set(this.xzqhArray,2,xzqhArray[2]);
							this.$set(this.test,"xzqhArray",xzqhArray);
							var cun= this.xzqhArray[2].split("#")[0]
							// console.log(cun);
						}else{
							this.xzqhArray=[]
						}

						this.isFinish=true;
						if(this.xzqhArray[2]){
							var cun= this.xzqhArray[2].split("#")[0]
							// console.log(cun);
							for(let i=0 ;i<cun.length;i++){
								if(i+1==cun.length && cun[i]=="村"){cun+="委会";}
								if(i+1==cun.length && cun[i]=="区"){cun+="居委会";}
							}
							this.xzqhArray[2] = cun + '#' + this.xzqhArray[2].split("#")[1]
						}
						
						// console.log(this.xzqhArray,'数据加载 区划')
					}

					//自定义预警预警信息
					this.loadWarning({
						sId: this.$route.query.sId,
					}).then(res => {
						// console.log(res)
						this.warningData = res[0].data
					}).catch(res => {
						if(typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200){
							console.log('数据获取失败或请求超时-预警');
							// this.$message.error('数据获取失败或请求超时-预警')
							// this.$emit("closes", false)
							// this.$router.go(-1)

							return false
						}

						for(var i in  res.response.data[0].data){
							if(res.response.data[0].data[i].aw_dat1=="1900-01-01 00:00:00.0"){
								res.response.data[0].data[i].aw_dat1="";
							}
						}
						// 过滤预警空数据
						this.warningData = res.response.data[0].data.filter((item, index, arr)=> {
							return item.aw_dat1 != "" || item.aw_ex1 != "";
						})
						// 老数据
						this.warningDataOld = JSON.parse(JSON.stringify(this.warningData))

						// 初始显示一条数据
						if(this.warningData.length==0){
							this.warningData.push({
								aw_dat1 : "",
								aw_ex1 : ""
							})
						}
						// 老数据在这里没过滤
						// this.warningDataOld=JSON.parse(JSON.stringify(res.response.data[0].data))
					})
			})
		},	


			//清空近亲属
			changeFm4(ab_ex92){
				if(ab_ex92=="否"){
					console.log('清空近亲属 old=>',this.familyData4Old);
					console.log('核减列表 deletedReason before=>',this.deletedReason);
					
					if(this.deletedReason.length>0){
						for(let j in this.deletedReason){
							if(this.deletedReason[j].from == '近亲属'){
								this.deletedReason.splice(j , 1)
							}
						}
					}
					for(let i in this.familyData4Old){
						console.log(this.familyData4Old[i].abm_ex3);
						var deletedReason = {name:'',from:'近亲属',reason:''};
						deletedReason.name = this.familyData4Old[i].abm_ex3;
						this.deletedReason.push(deletedReason);
					}
					this.familyData4=[];
					console.log('核减列表 deletedReason after=>',this.deletedReason);
					console.log('清空近亲属 new=>',this.familyData4);	
				}
			},

			// 给familyData1添加序号便于操作
			rowClassName({row,rowIndex}) {
				row.xh = rowIndex + 1;
			},

			handleWarningData(selection) {
				this.checkedWarningData = selection;
			},

			// 获取FamilyData1被选中的
			handleFamilyData1(selection) {
				this.checkedFamilyData1 = selection;
			},
			// 获取FamilyData2被选中的
			handleFamilyData2(selection) {
				this.checkedFamilyData2 = selection;
			},
			// 获取FamilyData2被选中的
			handleFamilyData3(selection) {
				this.checkedFamilyData3 = selection;
			},
			// 获取FamilyData4被选中的
			handleFamilyData4(selection) {
				this.checkedFamilyData4 = selection;
			},
			// 获取Income1被选中的
			handleIncome1(selection) {
				this.checkedIncome1 = selection;
			},
			// 获取Income2被选中的
			handleIncome2(selection) {
				this.checkedIncome2 = selection;
			},
			// 获取Income3被选中的
			handleIncome3(selection) {
				this.checkedIncome3 = selection;
			},
			// 获取Income4被选中的
			handleIncome4(selection) {
				this.checkedIncome4 = selection;
			},
			// 获取Estate1被选中的
			handleEstate1(selection) {
				this.checkedEstate1 = selection;
			},
			// 获取Estate2被选中的
			handleEstate2(selection) {
				this.checkedEstate2 = selection;
			},
			handleLandInfoData(selection) {
				this.checkedLandInfo = selection;
			},
			// 根据str找table添加行
			handleAddDetails(str) {
				let obj = {};

				// 自定义预警
				if (str == 'warningData') {
					if (this.warningData == undefined) {
						this.warningData = new Array();
					}
					obj = {
						aw_ex1: '',
						aw_dat1: '',
					};
					this.warningData.push(obj);
					console.log('预警',this.warningData);
				}


				
				// 村干部、近亲属
				if (str == 'familyData4') {
					if (this.familyData4 == undefined) {
						this.familyData4 = new Array();
					}
					obj = {
						abm_ex1: '',
						abm_ex3: '',
						abm_ex6: 'C',
						abm_ex15: ''
					};
					this.familyData4.push(obj);
				}
			},
			// 根据str找table删除选中行
			handleDelDetails(str) {
				let obj;
				let old;
				if (str == 'warningData') {
					obj = this.checkedWarningData;
					old = this.warningData;
					if (obj.length > 0) {
						obj.forEach((v1, i1) => {
							old.forEach((v2, i2) => {
								if (v1.xh == v2.xh) {
									old.splice(i2, 1)
								}
							})
						})
					}
					console.log("删除选中预警",this.warningData);
				}
				
			},

			isShow(n) {
				this.isShow1 = true
				this.isShow2 = true
				this.isShow3 = true
				this.isShow4 = true
				this.isShow5 = true
				this.isShow6 = true
				this.isShow7 = true
				this.isShow8 = true
				this.isShow9 = true
				this.isShow10 = true
				this.isShow11 = true
				this.isShow12 = true
				this.isShow13 = true
				this.isShow17 = true
				this.isShow18 = true
				this.isShow21 = true
				this.isShow22 = true

				if (n == 1) {
					this.isShow1 = false
				} else if (n == 2) {
					this.isShow2 = false
				} else if (n == 3) {
					this.isShow3 = false
				} else if (n == 4) {
					this.isShow4 = false
				} else if (n == 5) {
					this.isShow5 = false
				} else if (n == 6) {
					this.isShow6 = false
				} else if (n == 7) {
					this.isShow7 = false
				}else if (n == 8) {
					this.isShow8 = false
				}else if (n == 9) {
					this.isShow9 = false
				}else if (n == 10) {
					this.isShow10 = false
				}else if (n == 11) {
					this.isShow11 = false
				}else if (n == 12) {
					this.isShow12 = false
				}else if (n == 13) {
					this.isShow13 = false
				}else if (n == 17) {
					this.isShow17 = false
				}else if (n == 18) {
					this.isShow18 = false
				}else if (n == 21) {
					this.isShow21 = false
				}else if (n == 22) {
					this.isShow22 = false
				}
			},

			//获取供养机构   机构id赋值
			getSupportinst(){
				const narr = this.supportinstList.filter(item=> (item.abs_ex1 == this.dibaoForm.ab_ex195));
				this.dibaoForm.ab_ex201 = narr[0].abs_id;
				console.log('供养机构名称=》',this.dibaoForm.ab_ex195);
				console.log('供养机构对象=》',narr);
			}, 

			//供养机构列表
			getSupportinstList() {
				return request({
					headers: {
						'Accept': 'application/json',
					},
					url: '/social/assistance/getSupportinstList',
					method: 'post',
					data: {}
				}).then(res=>{}).catch(res=>{
					this.supportinstList = res.response.data;
					console.log('getSupportinstList=>',res.response.data);
					console.log(this.supportinstList);
				})
			},

			// 返回按钮
			closeView() {
				this.$emit("closes", false)
				this.$router.go(-1)
				if(process.env.NODE_ENV!="development"){
					this.$router.go(-1);
				}
			},
	
			// 给子组件传递图片下标
			getImgIndex(item){
				let data=JSON.parse(item);
				this.imgIndex[data.id]=data.index;
			},

			// 获取图片数量
			getImgNum(){
				for(let key in this.uploadImg){
					if(this.uploadImg[key][0]==''){
						this.uploadImg[key].length = 0;
						this.imgNum[key] = this.uploadImg[key].length;
					}else{
						this.imgNum[key] = this.uploadImg[key].length;
					}
				}
				console.log(this.imgNum,'图片数量');
			},

			handleRemove(file, str) {

				console.log(str,'照片删除');

				this.$confirm('是否删除该图片？',"提示" , {
				// distinguishCancelAndClose: true,
				confirmButtonText: '确定',
				cancelButtonText: '取消'
				}).then(() => {

					this.$delete(this.uploadImg[str+"_img"],this.imgIndex[str]);

					if(str+"_img"=="aba_ex4_img" || str+"_img"=="aba_ex5_img"){

						this.agentInfo[str]=this.uploadImg[str+"_img"].join(",");
					}else{
						this.dibaoForm[str]=this.uploadImg[str+"_img"].join(",");
					}

					this.getImgNum()
				}).catch(action => {
					// 取消留在本页
					console.log("留在本页");
				});
			},
			
			handlePictureCardPreview(file) {
				this.dialogImageArray = file;
				this.dialogImageUrl = file[0];
				this.dialogVisible = true;
			},

			// 上传图片
			uploads(id, dataName) {
				console.log(id, dataName,"================");
				// 过滤身份证照片
				//this.dibaoForm.ab_ex10.split(",")--(result)  是有空值的数组

				//r是处理好的数组
				if(this[dataName][id] == null) this[dataName][id] = "";
				var r = this[dataName][id].split(",").filter(function (s) {
					return s && s.trim();
				});

				this[dataName][id] = r.toString();
				this.dialogVisible3 = true;
				this.uploadId = id;
				this.uploadDataName = dataName;
				// console.log(this.uploadDataName);
				try {
					console.log(this.$refs.myUpload);
					this.$refs.myUpload.clears();
				} catch (e) {}
			},

			uploadEvent(data) {
				// console.log(data);
				let val = this[this.uploadDataName][this.uploadId];
				val = val == "" ? data : val + "," + data;
				this[this.uploadDataName][this.uploadId] = val;
			},

			uploadEvent2(){
				this.uploadImg[this.uploadId + "_img"] = this[this.uploadDataName][this.uploadId].split(",");
				this.uploadDataName = null;
				this.getImgNum();
				console.log(this.uploadImg);
			},
		

			// 预警检测
			changeAmt2(j,row,id) {
				if(this.warningData.length>0){
					for(var i=0;i < this.warningData.length ;i++){
						var index = Number(i)+1;
						var aw_dat1 = this.warningData[i].aw_dat1;
						// 自动添加预警时间
						if(this.warningData[i].aw_ex1!="" && (aw_dat1==""||aw_dat1==null)){
							this.warningData[i].aw_dat1 = this.getTimeFn();
						}
						// 预警提示
						if(this.warningData[i].aw_ex1 == "" &&  (aw_dat1 == null ||aw_dat1 =="")){
							 continue;
						}else if(this.warningData[i].aw_ex1 != "" && (aw_dat1 == null||aw_dat1 =="")){
							this.$message.warning("请选择预警"+(index)+"的时间");
							return false;
						}else if(this.warningData[i].aw_ex1 == "" && (aw_dat1 != null ||aw_dat1 !="")){
							this.$message.warning("请将预警"+(index)+"的内容补充完整");
							return false;
						} 
	
						// 预警格式验证
						var msg=""
						if(id == "warning.aw_ex1"){
							console.log(this.warningData,j);
							this.warningData[j].aw_ex1 = row.aw_ex1.replace(/\s+/g,"");
							msg = warningContent(row.aw_ex1,id,j);
							if(msg != true){
								this.$message.warning(msg);
								this.isSaves = false;
								return false;
							}
						}
					}
				}
			},

			//设置默认时间--预警时间默认为选择当天 （的第十天——取消）
			getTimeFn() {
				let dates = new Date()
				let y = dates.getFullYear()
				let m = dates.getMonth() + 1
				let d = dates.getDate()
		
				let time = y + '-' + m + '-' + d;
				return time
			},

		
			changeAmt(index,row,id){
				// 基本信息-家庭人口-输入判断
				if(Number.isNaN(ab_ex5)||ab_ex5==0 ){
					this.$message.warning("请输入家庭口数，或修改为阿拉伯数字");
					return false;
				}
				this.dibaoForm.ab_ex46 = this.ab_ex46.toString();//求助原因字段
				
			},

			// 核减原因填报保存
			async saveDeletedReason(data){
				var data1 = this.deletedReason;
				

				var isSave = true;
				console.log('核减原因=》',data1);

				// isTest 数据核验  false校验，true不校验
				if(!this.isTest){ 
					// 基础信息填写验证
					this.$refs['dibaoForm'].validate((valid) => {
						if (valid) {}
						else { return false;}
					});

					let msgs = this.validate();
					if(msgs){
						this.$message.warning(msgs);
						return false;
					}

					//基本信息-家庭人口-输入类型判断
					if(Number.isNaN(Number(this.dibaoForm.ab_ex5)) || this.dibaoForm.ab_ex5 == 0 ){
						// console.log(Number.isNaN(this.dibaoForm.ab_ex5),"条件1-家庭人口非数字")
						// console.log(this.dibaoForm.ab_ex5==0,"条件2-家庭人口为0")
						this.$message.warning("家庭人口数应大于0");
						return false;
					}
					
					// 基础信息填写格式验证
					// console.log(this.dibaoForm);
					for(let i in this.dibaoForm){
						//正则验证的时候只能是字符型，所以正则验证的时候要先转为字符串 
						this.dibaoForm[i] = this.dibaoForm[i].toString()
						if(this.keyVerification(this.dibaoForm[i],i) == false){
							isSave = false;
							this.isSaves = false;
							return false;
						}
					}
					// 检测求助原因是否有非选项内容
					if(this.ab_ex46.length > 0){
						console.log("求助原因",this.ab_ex46);
						for(var i in this.ab_ex46){
							var ab_ex46 = this.ab_ex46[i];
							var help_reason_arr = this.help_reason_list.filter((value)=>{return value==ab_ex46})
							// console.log(help_reason_arr,"求助原因数组");
							if(help_reason_arr.length == 0){
								this.$message.warning("基础信息：求助原因，不能有除求助列表以外的字符");
								this.isSaves = false;
								return false;
							}
						}
					}
					//是否为村干部选项过滤--不是 "是"/"否"，清空
					if(this.dibaoForm.ab_ex92!="" ){
						if(this.dibaoForm.ab_ex92 !="是" && this.dibaoForm.ab_ex92 != "否"){
							this.$message.warning("基础信息：是否属于村干部或经办人员近亲属，只能选择 '是' 或 '否'");
							this.isSaves = false;
							return false;
						}
					} 
					// console.log(this.dibaoForm.ab_ex92+"近亲属","长度为:"+this.familyData4.length);
					if(this.familyData4.length == 0 && this.dibaoForm.ab_ex92=="是"){
						this.$message.warning("村干部或经办人员近亲属信息不能为空");
						this.isSaves = false;
						return false;
					}else if(this.familyData4.length > 0 && this.dibaoForm.ab_ex92=="是"){
						// 近亲属选择"是"，近亲属成员信息必填
						for(let i in this.familyData4){
							// this.familyData4[i].abm_ex6 = "C"
							for(let j in this.familyData4[i]){
								if(this.keyVerification2(i,this.familyData4[i],"f4."+j)==false){
									this.isSaves = false;
									return false;
								}
							}
							let abm_ex1 = this.familyData4[i].abm_ex1;
							let abm_ex3 = this.familyData4[i].abm_ex3;
							let abm_ex15 = this.familyData4[i].abm_ex15;

							if(!abm_ex3 && !abm_ex1 && !abm_ex15 && this.dibaoForm.ab_ex92=="是"){ //近亲属选择"是"，近亲属成员信息必填
								this.$message.warning("请将第"+(Number(i)+1) +"行的村干部或近亲属信息补充完整");
								this.isSaves = false;
								return false;
							}else if(abm_ex3 && abm_ex1 && abm_ex15){
								console.log('都填了跳过'); 
							}else{
								this.$message.warning("请将第"+(Number(i)+1) +"行的村干部或近亲属信息补充完整");
								this.isSaves = false;
								return false;
							}
						}
					}
						// 验证户主身份证格式
					if(this.dibaoForm.ab_ex7){
						this.dibaoForm.ab_ex7 = this.dibaoForm.ab_ex7.replace(/x$/i,"X");
						let msg = isCardID(this.dibaoForm.ab_ex7);
						if(msg != true){
							this.$message.warning("申请人"+msg);
							this.isSaves = false;
							return false;
						}
					}
					// 变更理由
					if(this.changeM.ac_ex10 == ""){
						this.$message.warning("请填报变更理由说明");
						return false;
					}
					console.log(this.changeM.ac_dat1,'请填报变更时间');
					if(this.changeM.ac_dat1 == null || this.changeM.ac_dat1 == ''){
						this.$message.warning("请填报变更时间");
						return false;
					}
					
					var nameSame = 0;
					var IDCardSame = 0;
				
					// console.log('申请人姓名数量',nameSame);
					// console.log('申请人身份证数量',IDCardSame);
					
					//纸质授权书只能一张
					if(this.uploadImg.ab_ex177_img.length!=1 && !this.specialAccount){
						this.$message.warning("纸质授权书照片只能上传一张!");
						this.isSaves = false;
						return false;
					}
				
					// 每位共同生活家庭成员上传两张身份证照片
					if(this.uploadImg.ab_ex10_img.length < 2 ){
						this.$message.warning("请确保每位 成年的 共同生活家庭成员上传两张身份证照片!!");
						this.isSaves = false;
						return false;
					}
				
				// // 验证预警信息
				// var warningData_=[];
				// // this.isTest 开启上面的所有校验则关闭下面只有预警的校验
				// if(this.warningData.length > 0 && this.isTest){
				// 	for(var i=0;i<this.warningData.length ;i++){
				// 		var index = Number(i) + 1;

				// 		if(this.warningData[i].aw_ex1 == "" && (this.warningData[i].aw_dat1)){
				// 			this.$message.warning("请将预警"+index+"的内容补充完整");
				// 			this.isSaves = false;
				// 			return false;
				// 		}else if(this.warningData[i].aw_ex1  && (this.warningData[i].aw_dat1 == null||this.warningData[i].aw_dat1 =="")){
				// 			this.$message.warning("请选择预警"+index+"的时间");
				// 			this.isSaves = false;
				// 			return false;
				// 		}else if(this.warningData[i].aw_ex1  &&  (this.warningData[i].aw_dat1 != null ||this.warningData[i].aw_dat1)){
				// 			if(this.warningData[i].aw_dat1 || this.warningData[i].aw_ex1){
				// 				warningData_.push(this.warningData[i]);
				// 			}
				// 		} 
				// 	}

				// 	// 预警内容格式保存校验
				// 	if(warningData_.length > 0){
				// 		// console.log("预警验证");
				// 		for(let i in warningData_){
				// 			let msg = warningContent(warningData_[i].aw_ex1,"warning.aw_ex1",i);
				// 			if(msg != true){
				// 				this.$message.warning(msg);
				// 				this.isSaves = false;
				// 				return false;
				// 			}
				// 		}
				// 	}
				// }

		
				var isStop = false;
				
				// 核减原因显示 共同、非共同、非共同家庭、近亲属成员核减，显示核减原因填报弹框
				// 否则直接执行下一步保存
				if(this.deletedReason.length>0){
					this.dialogVisible = true;
				}else if(!isStop){
					this.save2()
				}
			}
		},	
			// 点击政策计算器的确定 计算器关闭 显示明细表 生成变更记录
			async save2(){
				//alert("pp")
				console.log(this.dibaoForm.ab_ex40,'save2');
				

				var data = [];
				data.push(this.dibaoForm);

				// 变更数据
			
				for(var key in data[0]){
					var val = data[0][key];
					var old = this.dibaoFormOld[0][key];
					old = old == undefined || old == "undefined" || old == null || old == "null" ? "" : old;
					val = val == undefined || val == "undefined" || val == null || val == "null" ? "" : val;
					// console.log("1111");
					// console.log("key==="+key+"=="+val+"=="+old)
					var d = {};
					var name = "";
					if(old == val){
						
					}else{
						name = key == "ab_ex1" ? "村居" : name;
						name = key == "ab_ex2" ? "街道" : name;
						name = key == "ab_ex3" ? "申请人姓名" : name;
						name = key == "ab_ex4" ? "户籍地址" : name;
						name = key == "ab_ex5" ? "家庭人口" : name;
						name = key == "ab_ex6" ? "户籍性质" : name;												
						name = key == "ab_ex7" ? "身份证号码" : name;
						name = key == "ab_ex8" ? "开户人" : name;
						name = key == "ab_ex10" ? "身份证照片" : name;
						name = key == "ab_ex11" ? "家庭住址" : name;
						name = key == "ab_ex16" ? "其他证明材料" : name;
						name = key == "ab_ex28" ? "联系电话" : name;
						name = key == "ab_ex36" ? "银行总存款" : name;
						name = key == "ab_ex37" ? "其他金融产品" : name;
						name = key == "ab_ex42" ? "开户银行" : name;
						name = key == "ab_ex43" ? "银行账号" : name;
						name = key == "ab_ex46" ? "求助原因" : name;
						name = key == "ab_ex60" ? "有价证券" : name;
						name = key == "ab_ex61" ? "债权" : name;
						name = key == "ab_ex74" ? "审核审批表" : name;
						name = key == "ab_ex97" ? "民主评议" : name;
						name = key == "ab_ex98" ? "公示图片" : name;
						name = key == "ab_ex161" ? "区县" : name;
						name = key == "ab_ex162" ? "行政区划" : name;
						name = key == "ab_ex177" ? "纸质授权书" : name;
						name = key == "ab_ex179" ? "基金" : name;
						name = key == "ab_ex180" ? "商业保险" : name;
						
						if(name){
							d.acc_ex1 = name;
							d.acc_ex2 = escape(old);
							d.acc_ex3 = escape(val);
							d.acc_ex4 = key;
							d.acc_ex5 = "基础信息修改";
							d.acc_ex6 = "修改";
							this.datas.push(d);
						}
					}
				}
				//alert(JSON.stringify(this.datas).length)
				
	
				// ???下面两个条件不知道有没有用，以后有空看看
				if(this.dibaoForm.ab_ex7 =='' || this.dibaoForm.ab_ex7.length!=18){
					this.$message.warning('请输入正确的身份证号')
					return false
				}
				if(this.dibaoForm.ab_ex3 ==''){
					this.$message.warning('请输入姓名')
					return false
				}

				
				if(this.datas.length==0 ){
					await this.$confirm('未检测出数据变动，无法生成变更记录!','提示', {
						dangerouslyUseHTMLString: true,
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						customClass: 'myClass1'
					}).then(() => {
					// this.isSaves = true;
						console.log("无法生成变更记录,确定");
						return false;
					}).catch(action => {
					// 取消留在本页
						console.log("留在本页");
						this.isSaves = false;
						return false;
					});	
				}else{
					this.dialogVisible4 = false; //计算器关闭
					this.moneybtn = true;  // 明细表 确定按钮
					//保存变更报告
					this.save3()
				}
			},

			async save3(){
				this.dialogVisible2 = false; //明细表显示
				
				const loading = this.$loading({
					lock: true,
					text: 'Loading',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				});

				// 保存禁用
				this.disabled=true;

				// 设置定时器，30秒请求失败刷新页面
				let time = setTimeout(()=>{
								loading.close()
								this.$emit("closes", false)
								this.$message.error("网络异常");
								this.$router.go(-1)
							},30000)
				this.saveBasicChange({
					"data" : JSON.stringify(this.datas),
					"sId" : this.$route.query.sId,
					// ac_ex10 : this.changeM.ac_ex10!='其他' ? this.changeM.ac_ex10 : this.changeM.ac_ex10_2,
					ac_ex10 : this.changeM.ac_ex10,
					ac_dat1 : this.changeM.ac_dat1,
					ab_ex13 : this.dibaoForm.ab_ex13, //本身的类型
					ab_ex41 : this.ab_ex13, //选择/计算的类型
					ac_ex13 : this.ab_ex13 //选择/计算的类型
				}).then((res) => {
					if (res[0].status=="+Ok") {
						loading.close()
						this.$message.success(res[0].msg)
						this.closeView();
						// console.log("保存成功");
					} else {
						loading.close()
						this.$message.error(res[0].msg)
					}
				}).catch((res) => {
					// 数据请求成功删除定时器
					clearTimeout(time);
					if (res.response.data[0].status=="+Ok") {
						loading.close()
						this.$message.success(res.response.data[0].msg)
						this.closeView();
						// console.log("保存成功");
					} else {
						loading.close()
						this.$message.error(res.response.data[0].msg)
					}
				})
			},
			
			getLabel(id){

				let name = "";
				var arr = document.getElementsByTagName("label");
				for(let i=0;i<arr.length;i++){
					//取出参数for的值
					if(arr[i].getAttributeNode("for")){

						var forvalue=arr[i].getAttributeNode("for").value;

						//因为for的值和相应checkbox的id对应，所以判断是否相等，如果
						//相等，那么它的innerHTML的值就是label的显示的值

						if(forvalue==id)
						{
							//或者使用innerText来获取。
							name = arr[i].innerHTML;
						}
					}
				}
				return name;
			},

			 // 账号识别
			checkSpecialAccount() {
				return request({
					url: "/social/common/checkSpecialAccount",
					method: "post",
					// data: data,
				});
			},

			// 自定义预警
			loadWarning(data) {
				return request({
					method: 'post',
					url: '/social/assistance/getBasicWaring4',
					data: data
				})
			},
			// 家庭成员
			loadFamily(data) {
				return request({
					method: 'post',
					url: '/social/assistance/getBasicFamily',
					data: data
				})
			},
			// 家庭收入
			getBasicIncome(data) {
				return request({
					url: "/social/assistance/getBasicIncome",
					method: 'post',
					data: data
				})
			},
			// 家庭支出
			loadPay(data) {
				return request({
					headers: {
						'Accept': 'application/json',
					},
					url: '/social/assistance/getBasicPay',
					method: 'post',
					data: data
				})
			},
			loadEstate(data) {
				return request({
					// headers: {
					// 	accept: 'application/json',
					// },
					method: 'post',
					url: '/social/assistance/getBasicEstate',
					data: data
				})
			},
			loadAgent(data){
				return request({
					method: 'post',
					url: '/social/assistance/getBasicAgent',
					data: data
				});
			},
			loadLand(data){
				return request({
					method: 'post',
					url: '/social/assistance/getBasicLand',
					data: data
				});
			},
			getBasicsChange(data) {
				return request({
					method: 'post',
					url: '/social/assistance/getBasicsChange',
					data: data
				})
			},
			saveBasicChange(data) {
				return request({
					method: 'post',
					url: '/social/assistance/saveBasicChange',
					data: data
				})
			},
			
			getBirthdayFromIdCard (idCard) {  
				var birthday = "";  
				if(idCard != null && idCard != ""){  
					if(idCard.length == 15){  
						birthday = "19"+idCard.substr(6,6);  
					} else if(idCard.length == 18){  
						birthday = idCard.substr(6,8);  
					} 
					birthday = birthday.replace(/(.{4})(.{2})/,"$1-$2-");  
				}  
				return birthday;  
			},
			//获取性别
			getSex(card){
				let sex="";
				let msg=isCardID(card);
				// console.log(msg);
				if(msg==true){
					// if(parseInt(card.substr(16,1))%2==1){ 
					// 	sex="男";
					// }else 
					// 	sex="女";
					sex = parseInt(card.substr(16,1))%2==1 ? '男' : '女';
				}
				return sex;
			},
			getAge(identityCard) {
				var len = (identityCard + "").length;

				if (len == 0) {
					return 0;
				} else {
					if ((len != 15) && (len != 18))//身份证号码只能为15位或18位其它不合法
					{ return 0; }
				}
				var strBirthday = "";
				if (len == 18){//处理18位的身份证号码从号码中得到生日和性别代码
					strBirthday = identityCard.substr(6, 4) + "/" + identityCard.substr(10, 2) + "/" + identityCard.substr(12, 2);
				}else if (len == 15) {
					strBirthday = "19" + identityCard.substr(6, 2) + "/" + identityCard.substr(8, 2) + "/" + identityCard.substr(10, 2);
				}
				//时间字符串里，必须是“/”
				var birthDate = new Date(strBirthday);
				var nowDateTime = new Date();
				var age = nowDateTime.getFullYear() - birthDate.getFullYear();
				//再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
				if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() == birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())) {
					age--;
				}
				return age;
			},
			validate(){
				try{
					let msg="";
					for(let key in this.rules){
						try{
							let r_=this.rules[key];
							let val=this.dibaoForm[key];
							if(val==""){
								msg = r_[0].message;
								break;
								//document.getElementById(key).style.border="1px solid red"
							}else{
								//document.getElementById(key).style.border="1px solid #C0C4CC"
							}
						}catch(e){}
					}
					return msg;
				}catch(e){
					return "";
				}
			},
			getNation(index){
				if(this.familyData1[index].age >= 18 && this.familyData1[index].age < 60){

					//如果民族非空且不是汉族，特定对象又没选，特定对象自动赋值
					if((this.familyData1[index].abm_ex16!="汉族" && this.familyData1[index].abm_ex16!="") && !this.familyData1[index].abm_ex51){
						this.$set(this.familyData1[index],"abm_ex51","少数民族");
					}else{
						this.tddx(index)
					}
				}
			},
			tddx(index,row,id){
				let rowIndex = Number(index) + 1;
				// let isOk=true;
				if(this.familyData1[index].abm_ex51!=""){
					this.familyData1[index].age=this.getAge(this.familyData1[index].abm_ex2);
					if(this.familyData1[index].age>=60 && this.familyData1[index].abm_ex51!="老年人"){
						this.$message.warning("第"+(rowIndex)+"行共同生活家庭成员，特定对象首选为 老年人，请重新选择");
						return false
					}else if(this.familyData1[index].age<18 && this.familyData1[index].abm_ex51!="未成年人"){
						this.$message.warning("第"+(rowIndex)+"行共同生活家庭成员，特定对象应为 未成年人，请重新选择");
					}else if(this.familyData1[index].age>18 && this.familyData1[index].age<60){
						if(this.familyData1[index].abm_ex16!="汉族" && this.familyData1[index].abm_ex51!="少数民族"){
							this.$message.warning("第"+(rowIndex)+"行共同生活家庭成员，特定对象应为 少数民族，请重新选择");
						}else if(this.familyData1[index].abm_ex16=="汉族" && this.familyData1[index].abm_ex51=="少数民族"){
							this.$message.warning("第"+(rowIndex)+"行共同生活家庭成员，特定对象不能为 少数民族，请重新选择");
						}else if(this.familyData1[index].abm_ex16=="汉族" && this.familyData1[index].abm_ex11=="重病" && this.familyData1[index].abm_ex51!="重病"){
							this.$message.warning("第"+(rowIndex)+"行共同生活家庭成员，特定对象应为 重病，请重新选择");
						}else if(this.familyData1[index].abm_ex16=="汉族" && this.familyData1[index].abm_ex11=="重残" && this.familyData1[index].abm_ex51!="重残"){
							this.$message.warning("第"+(rowIndex)+"行共同生活家庭成员，特定对象应为 重残，请重新选择");
						}
					}
				}
			},
			changeCard(index,row,id){
				if(id=="f1.abm_ex2"){
					this.familyData1[index].abm_ex2=row.abm_ex2.replace(/\s+/g,"");
					this.familyData1[index].abm_ex2=row.abm_ex2.replace(/x$/i,"X");
					var msg=isCardID(this.familyData1[index].abm_ex2)
					if(msg!=true){
						console.log(msg);
						this.$message.warning("第"+(index+1)+"行共同生活成员"+msg);
						return false;
					}
				}
				this.familyData1[index].abm_ex5=this.getSex(this.familyData1[index].abm_ex2);
				this.familyData1[index].age = this.getAge(this.familyData1[index].abm_ex2);
				// console.log(this.getSex(this.familyData1[index].abm_ex2));
				// console.log(this.familyData1[index].abm_ex2);
				if(this.familyData1[index].age < 18 || this.familyData1[index].age >= 60){
					this.$set(this.familyData1[index],"work","否");
					if(this.familyData1[index].age < 18 && this.familyData1[index].abm_ex51==""){
						this.$set(this.familyData1[index],"abm_ex51","未成年人");
					}else if(this.familyData1[index].age >= 60 && this.familyData1[index].abm_ex51==""){
						this.$set(this.familyData1[index],"abm_ex51","老年人");
					}
				}else{
					this.$set(this.familyData1[index],"work","是");
				}
			},
			changeCard2(index,row,id){
				let rowIndex=Number(index+1);
				this.familyData2[index].abm_ex2=row.abm_ex2.replace(/\s+/g,"");
				this.familyData2[index].abm_ex2=row.abm_ex2.replace(/x$/i,"X");
				if(id=="f2.abm_ex2"){
					var msg=isCardID(this.familyData2[index].abm_ex2)
					if(msg!=true){
						console.log(msg);
						this.$message.warning("第"+(rowIndex)+"行非共同生活赡抚养人"+msg);
						return false;
					}
				}
				let sex = this.getSex(this.familyData2[index].abm_ex2)
				this.$set(this.familyData2[index],"abm_ex5",sex);
			},
			changeCard3(index,row,id){
				let rowIndex=Number(index+1);
				this.familyData3[index].abm_ex2=row.abm_ex2.replace(/\s+/g,"");
				this.familyData3[index].abm_ex2=row.abm_ex2.replace(/x$/i,"X");
				if(id=="f3.abm_ex2"){
					var msg=isCardID(this.familyData3[index].abm_ex2)
					if(msg!=true){
						console.log(msg);
						this.$message.warning("第"+(rowIndex)+"行共非同生活赡抚养人家庭成员"+msg);
						return false;
					}
				}
				let sex = this.getSex(this.familyData3[index].abm_ex2)
				this.$set(this.familyData3[index],"abm_ex5",sex);
			}
		}
	}
</script>

<style scoped>
	.my-divider {
		margin: 15px auto 10px;
	}
	.my-table {
		width: 100%;
		margin-bottom: 5px;
	}
	.my-col {
		text-align: center;
		color: #909399;
	}
	.button-group {
		margin-bottom: 5px;
		margin-left: 10px
	}
	.el-table__body-wrapper .el-table__empty-block {
		background-image: none;
		min-height: auto;
		height: auto !important;
	}
	.el-table__empty-block .el-table__empty-text {
		display: block;
		line-height: 40px;
	}
	.el-table--border {
		border-bottom: 1px solid #EBEEF5 !important;
	}
	.info2 {
		flex:1;
		padding-right:10px;
		box-sizing: border-box;
		border-right: 1px solid #ddd;
		overflow: auto
	}
	.ainfo2 {
		width: 240px;
		font-size: 14px;
		line-height: 20px;
		text-align: left;
		padding-left:10px;
		box-sizing: border-box;
	}
	.g-box {
		height: 80VH !important;
	}
	.g-box2{
		overflow: auto !important;
		display:flex;
		display: -webkit-flex;
		flex-direction: row;
		height:100%;
		width:100%;
	}
	.line_blue {
		border-left: 2px solid #3385FF;
	}
	.lineSt {
		background-color: #dcdfe6;
		height: 1px;
		width: 100%;
		margin-bottom: 10px;
	}
	.ainfoFont {
		display: block;
		margin-bottom: -15px;
		font-weight: bold;
		color: #606266;
	}
	.listStyle {
		list-style: none;
	}
	.listStyleA {
		color: #3385FF !important
	}
	.change_title{
		display: inline-block;
		margin:0 0 5px 20px;
		color: #606266;
		font-size: 14px;
	}
	.eg{
		display: none;
	}
	.my-table>>>.el-input__inner {
	    border: 0;
	  }
	.srname>>>.el-input__inner{
		text-align:center;
	}
	div>>>.el-table__empty-block{
		border-bottom: 1px solid #eee;
		height: auto !important;
		background-image: none;
	}
</style>
<style >
	.myClass1 .el-message-box__title> span{
		font-size: 16px !important;
	}
</style>
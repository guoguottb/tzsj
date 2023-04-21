<template>
	<div class="helpApply">
		<header>
			<div class="headerHead">
				<div>
					<div :class="{headerF:isShow}">援助对象</div>
					<!-- <div class="headerCircle"></div> -->
				</div>
				<div class="headerRectangle"></div>
				<div>
					<div :class="{headerF:isShow2}">基本情况</div>
					<!-- <div class="headerCircle"></div> -->
				</div>
				<div class="headerRectangle"></div>
				<div>
					<div :class="{headerF:isShow3}">案件情况</div>
					<!-- <div class="headerCircle"></div> -->
				</div>
				<div class="headerRectangle"></div>
				<div>
					<div :class="{headerF:isShow4}">材料申报</div>
					<!-- <div class="headerCircle"></div> -->
				</div>
			</div>
		</header>
		<main>
			
			<div id="page1" v-show="page1" style="display: block;padding-top: 20px;">
				<div class="page1Div1">
					<div class="page1Div2">
						<span style="background-color: #333333;display: inline-block;width: 5px;height: 10px;"></span>
						<span style="color: #333333;">援助对象</span>
					</div>
					<!-- 这部分没做完，可能需要后台判断 -->
					<van-form ref='apply' @submit="next1" style="margin-top: 20px;">
						<van-field required readonly name="ab_ex175_1" label="免于经济状况审查且不受事项范围限制对象(单选)" label-width="100%" />
						<van-checkbox-group v-model="ab_ex175_1" max="1" style="background-color: #ffffff;">
							<van-checkbox class="marginstyle" name="农村“五保”对象" shape="square">农村“五保”对象</van-checkbox>
							<van-checkbox class="marginstyle" name="正在享受最低生活保障待遇的人员" shape="square">正在享受最低生活保障待遇的人员</van-checkbox>
							<van-checkbox class="marginstyle" name="领取市和各市（区）总工会发放的特困证的职工" shape="square">领取市和各市（区）总工会发放的特困证的职工</van-checkbox>
							<van-checkbox class="marginstyle" name="依靠抚恤金生活的人员" shape="square">依靠抚恤金生活的人员</van-checkbox>
							<van-checkbox class="marginstyle" name="社会福利机构中由政府供养的人员" shape="square">社会福利机构中由政府供养的人员</van-checkbox>
							<van-checkbox class="marginstyle" name="无固定生活来源的重度残疾人" shape="square">无固定生活来源的重度残疾人</van-checkbox>
						</van-checkbox-group>
						
						
						
						
						
						<div style="margin: 16px 0 16px 0;display: flex;justify-content: space-around;">
							<van-button block native-type="button" @click="back1">上一步</van-button>
							<van-button block type="info" native-type="button" @click="next1">下一步</van-button>
						</div>
					</van-form>
				</div>
			</div>
			
			
			
			<div id="page2" v-show="page2" class="stepPage" style="display: block;padding-top: 20px;">
				<div class="page1Div1">
					<div class="page1Div2">
						<span style="background-color: #00AAFF;display: inline-block;width: 5px;height: 10px;"></span>
						<span style="color: #333333;">基本信息</span>
					</div>
					<van-form ref='apply2' @submit="next2" style="margin-top: 20px;">
						<van-field required name="ab_ex75" label="申请方式" >
							<template #input>
								<van-radio-group v-model="form.ab_ex75" direction="horizontal" @change="changeSqfs">
									<van-radio name="委托代理">代申请</van-radio>
									<van-radio name="本人">本人</van-radio>
								</van-radio-group>
							</template>
						</van-field>
						<van-field required v-model="form.ab_ex3" name="ab_ex3" maxlength="10" label="申请人姓名" placeholder="申请人姓名" :rules="[{required:true,message:'请填写申请人姓名'}]" />
						
						<van-field required v-model="form.ab_ex7" name="ab_ex7" label="身份证号" placeholder="身份证号" :rules="[{required:true,message:'请填写身份证号'}]" @input="changeSfz" />
						
						<van-field v-model="form.ab_ex14" required name="ab_ex14" maxlength="10" label="国籍" :rules="[{required:true,message:'请填写国籍'}]" placeholder="国籍" />
						
						<van-field v-model="form.ab_ex65" required readonly clickable  name="ab_ex65" label="民族" :rules="[{required:true,message:'请选择民族'}]" placeholder="点击选择民族" @click="showPicker2 = true" />
						<van-popup v-model="showPicker2" round position="bottom">
							<van-picker show-toolbar :columns="columns2" @cancel="showPicker2=false" @confirm="onConfirm($event,'ab_ex65','showPicker2')"></van-picker>
						</van-popup>
						
						<van-field v-model="form.ab_ex12" required readonly clickable  name="ab_ex12" label="文化程度" :rules="[{required:true,message:'请选择文化程度'}]" placeholder="点击选择文化程度" @click="showPicker3 = true" />
						<van-popup v-model="showPicker3" round position="bottom">
							<van-picker show-toolbar :columns="columns3" @cancel="showPicker3=false" @confirm="onConfirm($event,'ab_ex12','showPicker3')"></van-picker>
						</van-popup>
						
						<van-field v-model="form.ab_ex69" required readonly name="ab_ex69" label="性别" />
						
						<van-field required readonly name="ab_dat11" v-model="form.ab_dat11" label="出生日期" />
						
						<van-field required v-model="ab_ex162_2"  name="ab_ex162_2" center readonly label="行政区划" :rules="[{required:true,message:'请选择所在行政区划'}]" placeholder="请选择所在行政区划" @click="show = true">
							<!-- <template #button>
								<van-button size="small" type="info" native-type="button" @click.stop="xzqh">区外</van-button>
							</template> -->
						</van-field>
						<van-popup v-model="show" round position="bottom">
							<van-cascader title="请选择所在行政区划" :options="options" @close="show = false" @finish="onFinish" />
						</van-popup>
						<van-field required v-model="form.ab_ex4" name="ab_ex4" maxlength="50" label="户籍所在地" placeholder="户籍所在地" :rules="[{ required: true, message: '请填写户籍所在地' }]" />
						<van-field required v-model="form.ab_ex129" name="ab_ex129" maxlength="50" label="住所地(经常居住地)" placeholder="住所地(经常居住地)" :rules="[{ required: true, message: '请填写住所地(经常居住地)' }]" />
						<van-field v-model="form.ab_ex50" required name="ab_ex50" maxlength="6" type="number" label="邮政编码" placeholder="邮政编码" :rules="[{ required: true, message: '请填写邮政编码' }]" />
						
						<van-field required v-model="form.ab_ex28" type="number" name="ab_ex28" label="联系电话" placeholder="联系电话" :rules="[{ required: true, message: '请填写联系电话' }]">
							<template #button>
								<van-button size="small" type="info" :disabled="hqyzmDis" native-type="button" @click='hqyzm'>{{hqyzmtext}}</van-button>
							</template>
						</van-field>
						<van-field v-model="form.yanzm" required center name="yanzm" type="number" label="验证码" placeholder="验证码" :rules="[{ required: true, message: '请填写验证码' }]" />
						
						<van-field required v-model="form.ab_ex44" name="ab_ex44" maxlength="30" label="工作单位" placeholder="工作单位" :rules="[{ required: true, message: '请填写工作单位' }]" />
						
						<van-field required readonly name="ab_ex23_1" label="身份类别（可重复交叉）" label-width="200px">
							<!-- 保存转成字符串保存到ab_ex23 -->
							<!-- <template #input>
								<van-checkbox-group v-model="ab_ex23_1" direction="horizontal">
									<van-checkbox class="marginstyle" name="低保对象" shape="square">低保对象</van-checkbox>
									<van-checkbox class="marginstyle" name="社会福利机构中由政府供养人员" shape="square">社会福利机构中由政府供养人员</van-checkbox>
									<van-checkbox class="marginstyle" name="特困职工" shape="square">特困职工</van-checkbox>
									<van-checkbox class="marginstyle" name="优抚对象" shape="square">优抚对象</van-checkbox>
									<van-checkbox class="marginstyle" name="灾民" shape="square">灾民</van-checkbox>
									<van-checkbox class="marginstyle" name="农民" shape="square">农民</van-checkbox>
									<van-checkbox class="marginstyle" name="农村“五保”对象" shape="square">农村“五保”对象</van-checkbox>
									<van-checkbox class="marginstyle" name="农民工" shape="square">农民工</van-checkbox>
									<van-checkbox class="marginstyle" name="军人" shape="square">军人</van-checkbox>
									<van-checkbox class="marginstyle" name="军属" shape="square">军属</van-checkbox>
									<van-checkbox class="marginstyle" name="离退休人员" shape="square">离退休人员</van-checkbox>
									<van-checkbox class="marginstyle" name="无业、失业人员" shape="square">无业、失业人员</van-checkbox>
									<van-checkbox class="marginstyle" name="在校生" shape="square">在校生</van-checkbox>
									<van-checkbox class="marginstyle" name="未成年人" shape="square">未成年人</van-checkbox>
									<van-checkbox class="marginstyle" name="学龄前儿童" shape="square">学龄前儿童</van-checkbox>
									<van-checkbox class="marginstyle" name="辍学生" shape="square">辍学生</van-checkbox>
									<van-checkbox class="marginstyle" name="单亲家庭儿童" shape="square">单亲家庭儿童</van-checkbox>
									<van-checkbox class="marginstyle" name="留守儿童" shape="square">留守儿童</van-checkbox>
									<van-checkbox class="marginstyle" name="残疾人" shape="square">残疾人</van-checkbox>
									<van-checkbox class="marginstyle" name="老年人（60岁以上）" shape="square">老年人（60岁以上）</van-checkbox>
									<van-checkbox class="marginstyle" name="其他" shape="square">其他</van-checkbox>
								</van-checkbox-group>
							</template> -->
						</van-field>
						
						
						<van-checkbox-group v-model="ab_ex23_1" direction="horizontal" style="background-color: #ffffff;" @change="changeSflb">
							<van-checkbox class="marginstyle" name="低保对象" shape="square">低保对象</van-checkbox>
							<van-checkbox class="marginstyle" name="社会福利机构中由政府供养人员" shape="square">社会福利机构中由政府供养人员</van-checkbox>
							<van-checkbox class="marginstyle" name="特困职工" shape="square">特困职工</van-checkbox>
							<van-checkbox class="marginstyle" name="优抚对象" shape="square">优抚对象</van-checkbox>
							<van-checkbox class="marginstyle" name="灾民" shape="square">灾民</van-checkbox>
							<van-checkbox class="marginstyle" name="农民" shape="square">农民(</van-checkbox>
							<van-checkbox class="marginstyle" name="农村“五保”对象" shape="square">农村“五保”对象</van-checkbox>
							<van-checkbox class="marginstyle" name="农民工" shape="square">农民工)</van-checkbox>
							<van-checkbox class="marginstyle" name="军人" shape="square">军人</van-checkbox>
							<van-checkbox class="marginstyle" name="军属" shape="square">军属</van-checkbox>
							<van-checkbox class="marginstyle" name="离退休人员" shape="square">离退休人员</van-checkbox>
							<van-checkbox class="marginstyle" name="无业、失业人员" shape="square">无业、失业人员</van-checkbox>
							<van-checkbox class="marginstyle" name="在校生" shape="square">在校生</van-checkbox>
							<van-checkbox class="marginstyle" name="未成年人" shape="square">未成年人(</van-checkbox>
							<van-checkbox class="marginstyle" name="学龄前儿童" shape="square">学龄前儿童</van-checkbox>
							<van-checkbox class="marginstyle" name="辍学生" shape="square">辍学生</van-checkbox>
							<van-checkbox class="marginstyle" name="单亲家庭儿童" shape="square">单亲家庭儿童</van-checkbox>
							<van-checkbox class="marginstyle" name="留守儿童" shape="square">留守儿童)</van-checkbox>
							<van-checkbox class="marginstyle" name="残疾人" shape="square">残疾人</van-checkbox>
							<van-checkbox class="marginstyle" name="老年人（60岁以上）" shape="square">老年人（60岁以上）</van-checkbox>
							<van-checkbox class="marginstyle" name="其他" shape="square">其他</van-checkbox>
						</van-checkbox-group>
						
						<van-field v-if="ab_ex23_1.indexOf('其他') != -1" required v-model="form.ab_ex24" name="ab_ex24" maxlength="30" label="其他身份" placeholder="其他身份" :rules="[{ required: true, message: '请填写其他身份' }]" />
						
						<div style="margin: 16px 0 16px 0;display: flex;justify-content: space-around;">
							<van-button block native-type="button" @click="back2">上一步</van-button>
							<van-button block type="info" native-type="button" @click="next2">下一步</van-button>
						</div>
					</van-form>
				</div>
			</div>

			<div id="page3" v-show="page3" class="stepPage" style="display: block;padding-top: 20px;">
				<div class="page1Div1">
					<div class="page1Div2">
						<span style="background-color: #00AAFF;display: inline-block;width: 5px;height: 10px;"></span>
						<span style="color: #00AAFF;">代理人/案件情况</span>
					</div>
					<van-form ref='apply3' @submit="next3" style="margin-top: 20px;">
						<div v-if="form.ab_ex75=='委托代理'">
							<van-field v-model="form.ab_ex29" name="ab_ex29" maxlength="10" label="姓名" placeholder="姓名" :rules="[{ required: true, message: '请填写姓名' }]" />
													
							<van-field name="ab_ex30_1" label="代理人类型" center :rules="[{ required: true, message: '请选择代理人类型' }]">
								<template #input>
									<van-checkbox-group v-model="ab_ex30_1" direction="horizontal" @change='changeDlr'>
										<van-checkbox class="marginstyle" name="法定代理人" shape="square">法定代理人</van-checkbox>
										<van-checkbox class="marginstyle" name="委托代理人" shape="square">委托代理人</van-checkbox>
									</van-checkbox-group>
								</template>
							</van-field>
							
							<van-field v-model="form.ab_ex31" name="ab_ex31" label="身份证号" placeholder="身份证号" :rules="[{ required: true, message: '请填写身份证号' }]" />
							<van-field v-model="form.ab_ex32" name="ab_ex32" maxlength="30" label="与申请人的关系" placeholder="与申请人的关系" :rules="[{ required: true, message: '请填写与申请人的关系' }]" />
							<van-field v-model="form.ab_ex33" type="number" name="ab_ex33" label="联系方式" placeholder="联系方式" :rules="[{ required: true, message: '请填写联系方式' }]" />
						</div>
						
						<van-field v-model="form.ab_ex34" readonly clickable  name="ab_ex34" label="律师" placeholder="点击选择律师" @click="showPicker5 = true" :rules="[{ required: true, message: '请选择律师' }]" />
						<van-popup v-model="showPicker5" round position="bottom">
							<!-- <van-picker show-toolbar :columns="columns4" @cancel="showPicker5=false" @confirm="onConfirm($event,'ab_ex34','showPicker5')"></van-picker> -->
							<van-cascader v-model="form.ab_ex34" title="请选择律师" :options="options2" @close="showPicker5=false" @change="onChange" @finish="onFinish2"></van-cascader>
						</van-popup>
						<van-field v-model="form.ab_ex35" disabled name="ab_ex35" label="律师执业证号" placeholder="律师执业证号" :rules="[{ required: true, message: '请填写律师执业证号' }]" />
						<van-field v-model="form.ab_ex36" disabled name="ab_ex36" label="律师联系电话" placeholder="律师联系电话" :rules="[{ required: true, message: '请填写律师联系电话' }]" />
						
						
						
						<van-field required readonly name="ab_ex37_1" label="案件来源" label-width="200px" />
						<van-checkbox-group v-model="ab_ex37_1" direction="horizontal" style="background-color: #ffffff;" @change="changeAjly">
							<van-checkbox class="marginstyle" name="当事人直接申请" shape="square">当事人直接申请</van-checkbox>
							<van-checkbox class="marginstyle" name="转交申请" shape="square">转交申请(</van-checkbox>
							<van-checkbox class="marginstyle" name="人民法院" shape="square">人民法院</van-checkbox>
							<van-checkbox class="marginstyle" name="人民检察院" shape="square">人民检察院</van-checkbox>
							<van-checkbox class="marginstyle" name="公安机关" shape="square">公安机关</van-checkbox>
							<van-checkbox class="marginstyle" name="监狱" shape="square">监狱</van-checkbox>
							<van-checkbox class="marginstyle" name="看守所" shape="square">看守所</van-checkbox>
							<van-checkbox class="marginstyle" name="强制隔离戒毒所" shape="square">强制隔离戒毒所)</van-checkbox>
							<van-checkbox class="marginstyle" name="其他来源" shape="square">其他来源</van-checkbox>
						</van-checkbox-group>
						<van-field v-if="ab_ex37_1.indexOf('其他来源') != -1" required v-model="form.ab_ex38" name="ab_ex38" label="其他来源" placeholder="其他来源" :rules="[{ required: true, message: '请填写其他来源' }]" />
						
						<van-field required v-model="form.ab_ex39" name="ab_ex39" maxlength="100" label="申请事项" placeholder="申请事项" :rules="[{ required: true, message: '请填写申请事项' }]" />
						
						
						<van-field required readonly name="ab_ex40_1" label="申请事项所处阶段" label-width="200px" />
						<van-checkbox-group v-model="ab_ex40_1" direction="horizontal" style="background-color: #ffffff;">
							<van-checkbox class="marginstyle" name="尚未进入法律程序" shape="square">尚未进入法律程序</van-checkbox>
							<van-checkbox class="marginstyle" name="侦查" shape="square">侦查</van-checkbox>
							<van-checkbox class="marginstyle" name="审查起诉" shape="square">审查起诉</van-checkbox>
							<van-checkbox class="marginstyle" name="仲裁" shape="square">仲裁</van-checkbox>
							<van-checkbox class="marginstyle" name="调解" shape="square">调解</van-checkbox>
							<van-checkbox class="marginstyle" name="诉讼" shape="square">诉讼(</van-checkbox>
							<van-checkbox class="marginstyle" name="一审" shape="square">一审</van-checkbox>
							<van-checkbox class="marginstyle" name="二审" shape="square">二审</van-checkbox>
							<van-checkbox class="marginstyle" name="审判监督程序" shape="square">审判监督程序)</van-checkbox>
							<van-checkbox class="marginstyle" name="行政处理" shape="square">行政处理</van-checkbox>
							<van-checkbox class="marginstyle" name="行政复议" shape="square">行政复议</van-checkbox>
							<van-checkbox class="marginstyle" name="国家赔偿" shape="square">国家赔偿</van-checkbox>
							<van-checkbox class="marginstyle" name="死刑复核" shape="square">死刑复核</van-checkbox>
							<van-checkbox class="marginstyle" name="申诉" shape="square">申诉</van-checkbox>
							<van-checkbox class="marginstyle" name="执行" shape="square">执行</van-checkbox>
						</van-checkbox-group>
						
						<van-field required v-model="form.ab_ex41" name="ab_ex41" maxlength="200" autosize rows="2" type="textarea" label="案情及申请理由概述" placeholder="案情及申请理由概述" :rules="[{ required: true, message: '请填写案情及申请理由概述' }]" />
						
						<!-- <van-field required v-model="form.ab_ex619" name="ab_ex619" label="申请人" placeholder="申请人" :rules="[{ required: true, message: '请填写申请人' }]" /> -->
						<!-- <van-field required v-model="form.ab_ex620" name="ab_ex620" label="代理人" placeholder="代理人" :rules="[{ required: true, message: '请填写代理人' }]" /> -->
						
						<!-- <van-field readonly required clickable name="ab_ex14" v-model="form.ab_ex14" label="日期" placeholder="点击选择日期" @click="showPicker4 = true" :rules="[{ required: true, message: '请选择日期' }]" />
						<van-popup v-model="showPicker4" position="bottom">
							<van-datetime-picker v-model="currentDate" type="date" @confirm="onConfirm2($event,'ab_ex14','showPicker4')" @cancel="showPicker4 = false" />
						</van-popup> -->
						
						<div style="margin: 16px 0 16px 0;display: flex;justify-content: space-around;">
							<van-button block native-type="button" @click="back3">上一步</van-button>
							<van-button block type="info" native-type="button" @click="next3">下一步</van-button>
						</div>
					</van-form>
				</div>
			</div>

			<div id="page4" v-show="page4" style="display: none">
				<div class="page4Class page4ClassMargin">
					<div style="height:40px;line-height:40px">身份证照片:</div>
					<div id="img" style="margin-top:10px;">
						<div style="position:relative;width:100%;float: left;" id="be">
							<div style="width:40%;height:100px;text-align: center;float: left;margin-left:20px;" id="sfzm">
								<van-uploader v-model="fileList" :before-read="beforeRead" :max-count="1" :after-read="uploadImg(1)" :before-delete="beforeDelete('ab_ex10_1')" />

								<br>
								<span>上传身份证正面</span>
							</div>
							<div style="width:40%;height:100px;text-align: center;float: right;margin-right:20px;" id="sfzm2">
								<van-uploader v-model="fileList2" :before-read="beforeRead" :max-count="1" :after-read="uploadImg(2)" :before-delete="beforeDelete('ab_ex10_2')" />

								<br>
								<span>上传身份证反面</span>
							</div>
						</div>
					</div>
				</div>
				
				<div class="page4Class page4ClassMargin2">
					<div style="height:40px;line-height:40px">委托书和经济状况表:</div>
					<div id="img" style="margin-top:10px;">
						<div style="position:relative;width:100%;float: left;" id="be">
							<div style="width:40%;height:100px;text-align: center;float: left;margin-left:20px;">
								<van-uploader v-model="fileList4" :before-read="beforeRead" :max-count="1" :after-read="uploadImg(4)" :before-delete="beforeDelete('ab_ex141')" />
				
								<br>
								<span>委托书</span>
							</div>
							<div style="width:40%;height:100px;text-align: center;float: right;margin-right:20px;">
								<van-uploader v-model="fileList5" :before-read="beforeRead" :max-count="1" :after-read="uploadImg(5)" :before-delete="beforeDelete('ab_ex142')" />
				
								<br>
								<span>经济状况表</span>
							</div>
						</div>
					</div>
				</div>
				
				<div class="page4Class2">
					<div style="height:40px;line-height:40px;">证明材料照片:</div>
					<div style="margin-top:10px;">
						<div id="zmcl" style="position:relative;width:100%;float: left;">
							<van-uploader v-model="fileList3" :before-read="beforeRead" :after-read="uploadImg(3)" :before-delete="beforeDelete('ab_ex16')" />

						</div>
					</div>
				</div>
				<div style="margin-top: 20px;display: flex;justify-content: space-around;">
					<van-button block native-type="button" @click="back4">上一步</van-button>
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
	import {xzqh,compressImg,tszfValidate,tszfFilter,tszfFilter2} from '@/utils/utils.js'
	export default {
		data() {
			return {
				isShow: true,
				isShow2: false,
				isShow3: false,
				isShow4: false,
				page1: true,
				page2: false,
				page3: false,
				page4: false,
				hqyzmtext:'获取验证码',
				m:60,
				form: {
					ab_ex75: '',
					ab_ex3: '',
					ab_ex69: '',
					ab_ex7: '',
					ab_ex14:'',
					ab_dat11: '',
					ab_ex65: '',
					ab_ex12: '',
					ab_ex129: '',
					ab_ex50: '',
					ab_ex44: '',
					ab_ex24: '',
					ab_ex29: '',
					ab_ex30: '',
					ab_ex31: '',
					ab_ex32: '',
					ab_ex33: '',
					ab_ex37: '',
					ab_ex40: '',
					ab_ex38: '',
					ab_ex39: '',
					ab_ex41: '',
					// ab_ex619: '',
					// ab_ex620: '',
					ab_ex34: '',
					ab_ex35: '',
					ab_ex36: '',
					ab_ex175: '',
					
					ab_ex1: '',
					ab_ex2: '',
					ab_ex4: '',
					ab_ex28: '',
					ab_ex23: '',
					ab_ex161: '',
					ab_ex162: '',
					yanzm: '',
					ab_dat14:'',
					ab_ex10_1:'', //身份证正面照片
					ab_ex10_2:'', //身份证反面照片
					ab_ex16:'', //其他证明材料照片
					ab_ex141:'', //委托书照片
					ab_ex142:'', //经济状况表照片
				},
				
				showPicker2:false,
				showPicker3:false,
				// showPicker4:false,
				showPicker5:false,
				// currentDate:new Date(),
				
				ab_ex23_1: [], //保存转换成字符串保存到form的ab_ex23
				ab_ex30_1: [], //保存转换成字符串保存到form的ab_ex30
				ab_ex37_1: [], //保存转换成字符串保存到form的ab_ex37
				ab_ex40_1: [], //保存转换成字符串保存到form的ab_ex40
				ab_ex175_1: [], //保存转换成字符串保存到form的ab_ex175
				fileList: [],
				fileList2: [],
				fileList3: [],
				fileList4: [],
				fileList5: [],
				ab_ex162:'',
				ab_ex162_2:'',
				yzm:'',    //正确验证码
				show: false,
				// 获取验证码按钮禁用状态
				hqyzmDis:false,
				// 选项列表，children 代表子选项，支持多级嵌套
				options: xzqh,
				options2:[],
				columns2: ['汉族', '壮族', '满族', '回族', '苗族', '维吾尔族', '彝族', '土家族', '蒙古族', '藏族', '布依族', '侗族', '瑶族', '朝鲜族', '白族',
					'哈尼族', '哈萨克族', '黎族', '傣族', '畲族', '傈僳族', '仡佬族', '拉祜族', '高山族', '东乡族', '佤族', '水族', '纳西族', '羌族', '土族',
					'锡伯族', '仫佬族', '柯尔克孜族', '达斡尔族', '景颇族', '傈僳族', '撒拉族', '布朗族', '毛难族', '塔吉克族', '普米族', '阿昌族', '怒族',
					'鄂温克族', '京族', '基诺族', '德昂族', '乌孜别克族', '俄罗斯族', '保安族', '裕固族', '门巴族', '鄂伦春族', '独龙族', '塔塔尔族', '赫哲族',
					'珞巴族', '其他', '外国血统中国籍人士'
				],
				columns3:['研究生','本科','大专','高中','初中','小学','小学以下'],
			}
		},
		created() {
			this.form.ab_ex14 = '中国'
			this.form.ab_ex75 = '本人'
			request({
				method:'post',
				url: '/social/assistanceWeixin/getLawyerList',
				data:{
					al_ex4:''
				}
			}).then(res=>{
				res.forEach((item,index)=>{
					this.options2.push({
						text: item.al_ex1,
						value: item.al_ex1,
						num:index,
						children: []
					})
					console.log(this.options2)
				})
			}).catch(error=>{
				this.$toast.fail('数据请求失败')
			})
			
			if(this.$route.query.stype=='法律援助' && this.$route.query.sId){
				request({
					method:'post',
					url: '/social/assistanceWeixin/getFLBasic',
					data:{
						sId: this.$route.query.sId
					}
				}).then(res=>{
					console.log(res[0].data[0])
					this.form = res[0].data[0]
					// this.form.yanzm = ''
					// this.form.ab_ex10_1 = (res[0].data[0].ab_ex10 && res[0].data[0].ab_ex10.split(",").length>=2) ? res[0].data[0].ab_ex10.split(",")[0] : ""
					// this.form.ab_ex10_2 = (res[0].data[0].ab_ex10 && res[0].data[0].ab_ex10.split(",").length>=2) ? res[0].data[0].ab_ex10.split(",")[1] : ""
					if(this.form.ab_ex23){
						this.ab_ex23_1 = this.form.ab_ex23.split(",")
					}
					if(this.form.ab_ex37){
						this.ab_ex37_1 = this.form.ab_ex37.split(",")
					}
					if(this.form.ab_ex30){
						this.ab_ex30_1 = this.form.ab_ex30.split(",")
					}
					if(this.form.ab_ex40){
						this.ab_ex40_1 = this.form.ab_ex40.split(",")
					}
					if(this.form.ab_ex175){
						this.ab_ex175_1 = this.form.ab_ex175.split(",")
					}
					if (this.form.ab_ex161 != "" && this.form.ab_ex2 != "" && this.form.ab_ex1 != "") {
						this.ab_ex162_2 = this.form.ab_ex161 + '/' + this.form.ab_ex2 + '/' + this.form.ab_ex1
					}
					
					var ab_ex10 = res[0].data[0].ab_ex10.split(",");
					this.form.ab_ex10_1 = ab_ex10[0]
					this.form.ab_ex10_2 = ab_ex10.length > 1 ? ab_ex10[1] : ""
					if (this.form.ab_ex10_1) {
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
					if (this.form.ab_ex141) {
						this.imageView(this.form.ab_ex141).then(res=>{
							// 这个从正确的进来
							this.fileList4.push({
								url: res,
								isImage: true
							})
						}).catch(res=>{
							console.log(res)
						})
					}
					if (this.form.ab_ex142) {
						this.imageView(this.form.ab_ex142).then(res=>{
							// 这个从正确的进来
							this.fileList5.push({
								url: res,
								isImage: true
							})
						}).catch(res=>{
							console.log(res)
						})
					}
					// 其他证明材料
					if (this.form.ab_ex16) {
						let imgs = this.form.ab_ex16.split(",");
						imgs.forEach((value,index)=>{
							this.imageView(value).then(res=>{
								// 这个从正确的进来
								this.fileList3.push({
									url: res,
									isImage: true
								})
							}).catch(res=>{
								console.log(res)
							})
						})
					}
					
				}).catch(error=>{
					this.$toast.fail('数据请求失败')
				})
			}else{
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
						this.changeSfz(res.data.cardNo)
					}
				}).catch(error=>{
					this.$toast.fail('数据请求失败')
				})
			}
		},
		methods: {
			next1() {
				this.page1 = false
				this.page2 = true
				this.isShow = false
				this.isShow2 = true
				
			},
			back1(){
				this.$router.go(-1)
			},
			next2() {
				// 去除姓名的空白符号并且判断姓名是否合法
				this.form.ab_ex3 = this.form.ab_ex3.replace(/\s*/g,"")
				let tszf = tszfValidate(this.form.ab_ex3)
				if(tszf){
					this.$toast.fail("请输入正确的姓名")
					return false
				}
				// 判断身份证是否合法
				let msg = this.isCardID(this.form.ab_ex7)
				if(msg){
					this.$toast.fail(msg)
					return false
				}
				// 去除国籍的空白符号并且判断国籍是否合法
				this.form.ab_ex14 = this.form.ab_ex14.replace(/\s*/g,"")
				if(tszfValidate(this.form.ab_ex14)){
					this.$toast.fail("请输入正确的国籍")
					return false
				}
				// 过滤户籍所在地特殊字符和空格
				this.form.ab_ex4 = this.form.ab_ex4.replace(/\s*/g,"")
				this.form.ab_ex4 = tszfFilter(this.form.ab_ex4)
				// 过滤住所地特殊字符和空格
				this.form.ab_ex129 = this.form.ab_ex129.replace(/\s*/g,"")
				this.form.ab_ex129 = tszfFilter(this.form.ab_ex129)
				// 验证邮政编码长度为6
				if(this.form.ab_ex50.length!=6){
					this.$toast.fail("请输入正确的邮政编码")
				}
				
				// 判断验证码是否正确
				if(!this.yzm ||	this.yzm!=this.form.yanzm){
					console.log(this.yzm)
					console.log(this.form.yanzm)
					console.log(this.form.yanzm == '0')
					// 测试用(等于0可以继续下一步)
					if(this.form.yanzm != '0'){
						console.log('gg')
						this.$toast.fail('验证码错误')
						return false
					}
				}
				// 过滤工作单位特殊字符和空格
				this.form.ab_ex44 = this.form.ab_ex44.replace(/\s*/g,"")
				this.form.ab_ex44 = tszfFilter(this.form.ab_ex44)
				
				if(this.ab_ex23_1.length==0){
					this.$toast.fail('请选择身份类别（可重复交叉）')
					return false
				}
				if(this.ab_ex23_1.indexOf('其他') != -1){
					// 过滤其他身份特殊字符和空格
					this.form.ab_ex24 = this.form.ab_ex24.replace(/\s*/g,"")
					this.form.ab_ex24 = tszfFilter(this.form.ab_ex24)
				}
				this.$refs.apply2.validate().then(()=>{
					this.page2 = false
					this.page3 = true
					this.isShow2 = false
					this.isShow3 = true
				}).catch((err)=>{
					console.log(err)
					this.$toast.fail(err[0].message)
				})
			},
			back2() {
				this.page1 = true
				this.page2 = false
				this.isShow = true
				this.isShow2 = false
			},
			next3() {
				if(this.form.ab_ex75=='委托代理'){
					// 去除姓名的空白符号并且判断姓名是否合法
					this.form.ab_ex29 = this.form.ab_ex29.replace(/\s*/g,"")
					let tszf = tszfValidate(this.form.ab_ex29)
					if(tszf){
						this.$toast.fail("请输入正确的姓名")
						return false
					}
					// 判断身份证是否合法
					let msg = this.isCardID(this.form.ab_ex31)
					if(msg){
						this.$toast.fail(msg)
						return false
					}
					// 过滤与申请人关系特殊字符和空格
					this.form.ab_ex32 = this.form.ab_ex32.replace(/\s*/g,"")
					this.form.ab_ex32 = tszfFilter(this.form.ab_ex32)
					// 验证手机号
					let myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
					if (!myreg.test(this.form.ab_ex33)) {
						this.$toast.fail('请填写正确的联系方式')
						return false
					}
				}
				
				
				if(this.ab_ex37_1.length==0){
					this.$toast.fail('请选择案件来源')
					return false
				}
				// 过滤申请事项特殊字符和空格
				this.form.ab_ex39 = this.form.ab_ex39.replace(/\s*/g,"")
				this.form.ab_ex39 = tszfFilter(this.form.ab_ex39)
				
				if(this.ab_ex40_1.length==0){
					this.$toast.fail('请选择申请事项所处阶段')
					return false
				}
				// 过滤案情及申请理由概述特殊字符和空格
				this.form.ab_ex41 = this.form.ab_ex41.replace(/\s*/g,"")
				this.form.ab_ex41 = tszfFilter2(this.form.ab_ex41)
				
				this.$refs.apply3.validate().then(()=>{
					this.page3 = false
					this.page4 = true
					this.isShow3 = false
					this.isShow4 = true
				}).catch((err)=>{
					console.log(err)
					this.$toast.fail(err[0].message)
				})
				
				
			},
			back3() {
				this.page2 = true
				this.page3 = false
				this.isShow2 = true
				this.isShow3 = false
			},
			save() {
				// if(!this.form.ab_ex10_1){
				// 	this.$dialog({
				// 		message:'请上传身份证正面照片'
				// 	})
				// 	return
				// }else if(!this.form.ab_ex10_2){
				// 	this.$dialog({
				// 		message:'请上传身份证反面照片'
				// 	})
				// 	return
				// }
				if(this.fileList.length == 0){
					this.$dialog({
						message:'请上传身份证正面照片'
					})
					return
				}else if(this.fileList2.length == 0){
					this.$dialog({
						message:'请上传身份证反面照片'
					})
					return
				}else if(this.form.ab_ex75 == "委托代理"){
					// if(!this.form.ab_ex141){
					// 	this.$dialog({
					// 		message:'请上传委托书照片'
					// 	})
					// 	return
					// }
					if(this.fileList4.length == 0){
						this.$dialog({
							message:'请上传委托书照片'
						})
						return
					}
				}else if(this.ab_ex175_1.length==0){
					// if(!this.form.ab_ex142){
					// 	this.$dialog({
					// 		message:'请上传经济状况表照片'
					// 	})
					// 	return
					// }
					if(this.fileList5.length == 0){
						this.$dialog({
							message:'请上传经济状况表照片'
						})
						return
					}
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
				// 当前时间
				this.form.ab_dat14 = mytime
				
				// ab_ex23数组转换成字符串
				this.form.ab_ex23 = this.ab_ex23_1.join()
				
				// ab_ex37数组转换成字符串
				this.form.ab_ex37 = this.ab_ex37_1.join()
				
				// ab_ex30数组转换成字符串
				this.form.ab_ex30 = this.ab_ex30_1.join()
				
				// ab_ex40数组转换成字符串
				this.form.ab_ex40 = this.ab_ex40_1.join()
				
				// ab_ex175数组转换成字符串
				this.form.ab_ex175 = this.ab_ex175_1.join()
				// 提交
				request({
					method:'post',
					url: '/social/assistanceWeixin/saveFlyz',
					data:{
						data:'['+JSON.stringify(this.form)+']',
					},
				}).then(res=>{
					toast.clear()
					// 提示提交成功
					// this.$toast.success('提交成功')
					// this.$router.push('/')
					if(res[0].status == 'error'){
						this.$toast.fail(res[0].msg)
					}else{
						this.$dialog.alert({
							message: res[0].msg,
						}).then(()=>{
							this.$router.push('/')
						})
					}
					
					console.log(res)
				}).catch(error=>{
					toast.clear()
					// 提示提交失败
					this.$toast.fail('提交失败')
					console.log(error)
				})
			},
			back4() {
				this.page4 = false,
					this.page3 = true
				this.isShow4 = false,
					this.isShow3 = true
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
				// 更改户籍所在地
				if(this.form.ab_ex4==''){
					this.form.ab_ex4=area[0]+area[1]+area[2];
				}
				//住所地(经常居住地)
				if(this.form.ab_ex129==''){
					this.form.ab_ex129=area[0]+area[1]+area[2];
				}
			},
			onChange({selectedOptions}){
				console.log(selectedOptions)
				if(selectedOptions.length==1){
					request({
						method:'post',
						url: '/social/assistanceWeixin/getLawyerList',
						data:{
							al_ex4: selectedOptions[0].value
						}
					}).then(res=>{
						this.options2[selectedOptions[0].num].children = res
						res.forEach((item,index)=>{
							this.options2[selectedOptions[0].num].children[index].text = item.al_ex1
							this.options2[selectedOptions[0].num].children[index].value = item.al_ex1
						})
					}).catch(error=>{
						this.$toast.fail('数据请求失败')
					})
				}
			},
			onFinish2({selectedOptions}){
				console.log(selectedOptions[1])
				this.showPicker5=false
				this.form.ab_ex35=selectedOptions[1].al_ex2 //律师执政号
				this.form.ab_ex36=selectedOptions[1].al_ex3 //律师电话
				this.form.ab_ex42=selectedOptions[1].al_ex4 //律师事务所
				this.form.ab_ex43=selectedOptions[1].al_ex4 + ',' + selectedOptions[1].al_ex1//律师事务所
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
						this.yzm = res[0].Vcode
						this.$toast.success(res[0].msg)
					}else{
						this.$toast.fail(res[0].msg)
					}
				}).catch(error=>{
					console.log(error)
					this.$toast.fail("验证码发送失败")
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
					 }else if(num == 4){
						 this.form.ab_ex141=res[0].filename
					 }else if(num == 5){
						 this.form.ab_ex142=res[0].filename
					 }else if(num == 3){
						 console.log(1111)
						 if(this.form.ab_ex16){
							 this.form.ab_ex16 = this.form.ab_ex16.concat(',',res[0].filename)
						 }else{
							 this.form.ab_ex16 = this.form.ab_ex16.concat(res[0].filename)
						 }
						 console.log(this.form.ab_ex16)
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
					 }else if(num == 5){
					 	this.fileList5.pop()
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
			onConfirm(value,item,showItem){
				this.form[item] = value
				this[showItem] = false
			},
			// onConfirm2(value,item,showItem){
			// 	let YY = value.getFullYear() + '-';
			// 	let MM = (value.getMonth() + 1 < 10 ? '0' + (value.getMonth() + 1) : value.getMonth() + 1) + '-';
			// 	let DD = (value.getDate() < 10 ? '0' + (value.getDate()) : value.getDate());
			// 	this.form[item] = YY + MM + DD
			// 	this.form[showItem] = false
			// },
			changeSflb(value){
				if(value.indexOf("其他")==-1){
					this.form.ab_ex24 = ""
				}
			},
			changeAjly(item){
				console.log(item)
				if(item.indexOf("其他来源")==-1){
					this.form.ab_ex38 = ""
				}
			},
			changeDlr(value){
				if(value.length == 2){
					value.splice(0,1)  //删除前一个选项，返回值是删除的选项
				}
			},
			// 身份证改变设置性别和出生日期
			changeSfz(value){
				let msg = this.isCardID(this.form.ab_ex7)
				if(!msg){
					//获取出生日期
					this.form.ab_dat11=value.substring(6,10) + "-" + value.substring(10,12) + "-" + value.substring(12,14);
					this.form.ab_ex69=this.getSex(value)
				}
			},
			getSex(card){
				let sex="";
				let msg=this.isCardID(card);
				if(!msg){
					//获取性别 
					if(parseInt(card.substr(16,1))%2==1){ 
						sex="男";
					}else 
					{ 
						sex="女";
					} 
				}
				
				return sex;
			},
			changeSqfs(val){
				if(val=='本人'){
					this.form.ab_ex29 = ''
					this.ab_ex30_1=[]
					this.form.ab_ex31 = ''
					this.form.ab_ex32 = ''
					this.form.ab_ex33 = ''
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
			isCardID(sId) {
				var aCity = {
					11: "北京",
					12: "天津",
					13: "河北",
					14: "山西",
					15: "内蒙古",
					21: "辽宁",
					22: "吉林",
					23: "黑龙江",
					31: "上海",
					32: "江苏",
					33: "浙江",
					34: "安徽",
					35: "福建",
					36: "江西",
					37: "山东",
					41: "河南",
					42: "湖北",
					43: "湖南",
					44: "广东",
					45: "广西",
					46: "海南",
					50: "重庆",
					51: "四川",
					52: "贵州",
					53: "云南",
					54: "西藏",
					61: "陕西",
					62: "甘肃",
					63: "青海",
					64: "宁夏",
					65: "新疆",
					71: "台湾",
					81: "香港",
					82: "澳门",
					91: "国外"
				};
				var iSum = 0;
				var info = "";
				if (!/^\d{17}(\d|x)$/i.test(sId)) return "身份证长度或格式错误";
				sId = sId.replace(/x$/i, "a");
				if (aCity[parseInt(sId.substr(0, 2))] == null) return "身份证地区非法";
				let sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2));
				var d = new Date(sBirthday.replace(/-/g, "/"));
				if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) return "身份证上的出生日期非法";
				for (var i = 17; i >= 0; i--) iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
				if (iSum % 11 != 1) return "身份证号非法";
				//aCity[parseInt(sId.substr(0,2))]+","+sBirthday+","+(sId.substr(16,1)%2?"男":"女");//此次还可以判断出输入的身份证号的人性别
				return "";
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
		width: 35px;
		height: 8px;
		background-color: #e2e2e2;
		border-radius: 10px;
		margin: 0 10px 0 10px;
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
	.page4ClassMargin{
		margin-top: 140px;
	}
	.page4ClassMargin2{
		margin-top: 10px;
	}
	.page4Class{
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
		border-radius: 15px;
		border:#aaa solid 1px;
	}
	.page4Class2{
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

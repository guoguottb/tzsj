<template>
	<div class="dbjz">
		<header>
			<div class="headerHead">
				<div>
					<div :class="{headerF:isShow}">基础信息</div>
				</div>
				<div class="headerRectangle"></div>
				<div>
					<div :class="{headerF:isShow2}">收入情况</div>
				</div>
				<div class="headerRectangle"></div>
				<div>
					<div :class="{headerF:isShow3}">财产情况</div>
				</div>
				<div class="headerRectangle"></div>
				<div>
					<div :class="{headerF:isShow4}">材料上传</div>
				</div>
				<!-- <div class="headerRectangle"></div>
				<div>
					<div :class="{headerF:isShow5}">授权书</div>
				</div>
				<div class="headerRectangle"></div>
				<div>
					<div :class="{headerF:isShow6}">材料上传</div>
				</div> -->
			</div>
		</header>
		<main>
			<div id="page1" v-show="page1" class="page1Div1">
				<div class="page1Div2">
					&nbsp;&nbsp;&nbsp;&nbsp;<span class="page1Div2Font">基本信息</span>
				</div>

				<van-form ref='rule1' @submit="next1">
					<van-field v-model="form.abd_ex2" required name="abd_ex2" maxlength="10" label="姓名" placeholder="姓名" :rules="[{ required: true, message: '请填写姓名' }]">
						<!-- <template #button>
							<van-button size="small" type="info" native-type="button">拍照识别</van-button>
						</template> -->
					</van-field>
					<van-field v-model="form.abd_ex3" required name="abd_ex3" label="身份证号" placeholder="身份证号" :rules="[{ required: true, message: '请填写身份证号'}]" @input='changeSfz' />
					
					<van-field v-model="form.abd_ex28_2" required center readonly label="行政区划" placeholder="请选择所在行政区划"
						@click="showxzqh = true" :rules="[{ required: true, message: '请选择行政区划' }]">
						<!-- <template #button>
							<van-button size="small" type="info" native-type="button" @click.stop="xzqh">区外</van-button>
						</template> -->
					</van-field>
					<van-popup v-model="showxzqh" round position="bottom">
						<!-- abd_ex28_3是因为和上面field显示的要不一样，不然区划选到一半关闭会显示options的value值 -->
						<van-cascader v-model="form.abd_ex28_3" title="请选择所在行政区划" :options="options"
							@close="showxzqh = false" @finish="onFinish" />
					</van-popup>
					
					<van-field v-model="form.abd_ex12" disabled name="form.abd_ex12" label="性别" placeholder="性别" />
					
					<van-field v-model="form.abd_ex34" disabled type="number" name="abd_ex34" label="年龄" placeholder="年龄" />
					
					<van-field name="abd_ex17" label="户籍类别" required :rules="[{ required: true, message: '请选择户籍类别' }]">
						<template #input>
							<van-radio-group v-model="form.abd_ex17" direction="horizontal">
								<van-radio name="农业户口">农业户口</van-radio>
								<van-radio name="非农业户口">非农业户口</van-radio>
							</van-radio-group>
						</template>
					</van-field>
					
					<van-field readonly clickable name="abd_ex16" :value="form.abd_ex16" label="民族" required placeholder="点击选择民族" :rules="[{ required: true, message: '请选择民族'}]" @click="showPicker11 = true" />
					<van-popup v-model="showPicker11" position="bottom">
						<van-picker show-toolbar :columns="columns3" @confirm="onConfirm11($event,form,'abd_ex16','showPicker11')" @cancel="showPicker11 = false" />
					</van-popup>
					
					<van-field readonly clickable name="abd_ex66" :value="form.abd_ex66" label="与户主关系" required placeholder="点击选择与户主关系" :rules="[{ required: true, message: '请选择与户主关系' }]" @click="showPicker12 = true" />
					<van-popup v-model="showPicker12" position="bottom">
						<van-picker show-toolbar :columns="columns6" @confirm="onConfirm11($event,form,'abd_ex66','showPicker12')" @cancel="showPicker12 = false" />
					</van-popup>
					
					<van-field v-model="form.abd_ex5" required name="abd_ex5" label="残疾证号" placeholder="残疾证号" :rules="[{ required: true, message: '请填写残疾证号'}]" />
					
					<van-field v-model="form.abd_ex15" required name="abd_ex15" label="残疾类别" placeholder="点击选择残疾类别" :rules="[{ required: true, message: '请选择残疾类别' }]" @click="showPicker13 = true" />
					<van-popup v-model="showPicker13" position="bottom">
						<van-picker show-toolbar :columns="columns2" @confirm="onConfirm11($event,form,'abd_ex15','showPicker13')" @cancel="showPicker13 = false" />
					</van-popup>
					
					<van-field v-model="form.abd_ex14" required name="abd_ex14" label="残疾等级" placeholder="点击选择残疾等级" :rules="[{ required: true, message: '请选择残疾等级' }]" @click="showPicker14 = true" />
					<van-popup v-model="showPicker14" position="bottom">
						<van-picker show-toolbar :columns="columns4" @confirm="onConfirm11($event,form,'abd_ex14','showPicker14')" @cancel="showPicker14 = false" />
					</van-popup>
					
					<van-field v-model="form.abd_ex18" name="abd_ex18" required label="户籍地址" placeholder="户籍地址"
						:rules="[{ required: true, message: '请填写户籍地址' }]" />
					<van-field v-model="form.abd_ex19" name="abd_ex19" maxlength="50" label="现住址" required placeholder="现住址"
						:rules="[{ required: true, message: '请填写现住址' }]" />
					<van-field v-model="form.abd_ex67" name="abd_ex67" label="家庭人口" placeholder="家庭人口" required :rules="[{ required: true, message: '请填写家庭人口' }]" type="digit" />
					
					<van-field v-model="form.abd_ex68" name="abd_ex68" label="伤残原因说明" placeholder="伤残原因说明" required :rules="[{ required: true, message: '请填写伤残原因说明' }]" />
					<van-field v-model="form.abd_ex69" name="abd_ex69" label="残疾人收入说明" placeholder="残疾人收入说明" required :rules="[{ required: true, message: '请填写残疾人收入说明' }]" />
					
					<van-field name="abd_ex70" label="是否享受低保" required :rules="[{ required: true, message: '请选择是否享受低保' }]">
						<template #input>
							<van-radio-group v-model="form.abd_ex70" direction="horizontal">
								<van-radio name="是">是</van-radio>
								<van-radio name="否">否</van-radio>
							</van-radio-group>
						</template>
					</van-field>
					
					<van-field v-model="form.abd_ex73" required name="abd_ex73" label="家庭特征" placeholder="点击选择家庭特征" :rules="[{ required: true, message: '请选择家庭特征' }]" @click="showPicker15 = true" />
					<van-popup v-model="showPicker15" position="bottom">
						<van-picker show-toolbar :columns="columns5" @confirm="onConfirm11($event,form,'abd_ex73','showPicker15')" @cancel="showPicker15 = false" />
					</van-popup>
					
					<van-field v-model="form.abd_ex20" center name="abd_ex20" maxlength="11" type="number" required label="联系电话" placeholder="联系电话"
						:rules="[{ required: true, message: '请填写联系电话' }]">
					</van-field>
					
					<van-field readonly clickable name="abd_dat5" :value="form.abd_dat5" label="申请时间" placeholder="点击选择申请时间" @click="showPicker16 = true" />
					<van-popup v-model="showPicker16" position="bottom">
						<van-datetime-picker v-model="abd_dat5_2" type="date" @confirm="onConfirm2($event,index)" @cancel="showPicker16 = false" />
					</van-popup>
					
					<van-field name="abd_ex103" label="求助属实类别" required :rules="[{ required: true, message: '请选择求助属实类别' }]">
						<template #input>
							<van-checkbox-group v-model="abd_ex103" direction="horizontal" @change="sslbChange">
								<!-- <van-checkbox class="marginstyle" name="低保" shape="square">城乡低保</van-checkbox> -->
								<!-- <van-checkbox class="marginstyle" name="特困供养" shape="square">特困供养</van-checkbox> -->
								<!-- <van-checkbox class="marginstyle" name="家庭边缘" shape="square">低收入家庭</van-checkbox> -->
								<!-- <van-checkbox :disabled="sslbDisabled1" class="marginstyle" name="困境儿童" shape="square">困境儿童</van-checkbox> -->
								<van-checkbox :disabled="sslbDisabled1" class="marginstyle" name="残疾人两项补贴" shape="square">残疾人两项补贴</van-checkbox>
								<!-- <van-checkbox class="marginstyle" name="残疾人两项补贴" shape="square">残疾人两项补贴</van-checkbox> -->
								<!-- <van-checkbox class="marginstyle" name="医疗救助" shape="square">医疗救助</van-checkbox> -->
								<!-- <van-checkbox class="marginstyle" name="教育救助" shape="square">教育救助</van-checkbox> -->
								<!-- <van-checkbox class="marginstyle" name="住房救助" shape="square">住房救助</van-checkbox> -->
								<!-- <van-checkbox class="marginstyle" name="就业救助" shape="square">就业救助</van-checkbox> -->
								<!-- <van-checkbox class="marginstyle" name="司法援助" shape="square">司法援助</van-checkbox> -->
								<!-- <van-checkbox class="marginstyle" name="临时救助" shape="square">临时救助</van-checkbox> -->
								<van-checkbox :disabled="sslbDisabled2" class="marginstyle" name="不符合救助条件" shape="square">不符合救助条件</van-checkbox>
							</van-checkbox-group>
						</template>
					</van-field>
					
					
					<van-field name="abd_ex77" label="原因分类" required
						:rules="[{ required: true, message: '请选择原因分类' }]">
						<template #input>
							<van-checkbox-group v-model="abd_ex77" direction="horizontal">
								<van-checkbox class="marginstyle" name="疾病" shape="square">疾病</van-checkbox>
								<van-checkbox class="marginstyle" name="受灾" shape="square">受灾</van-checkbox>
								<van-checkbox class="marginstyle" name="教育" shape="square">教育</van-checkbox>
								<van-checkbox class="marginstyle" name="住房" shape="square">住房</van-checkbox>
								<van-checkbox class="marginstyle" name="残疾" shape="square">残疾</van-checkbox>
								<van-checkbox class="marginstyle" name="缺乏劳动力" shape="square">缺乏劳动力</van-checkbox>
								<van-checkbox class="marginstyle" name="无生活来源" shape="square">无生活来源</van-checkbox>
								<van-checkbox class="marginstyle" name="其他" shape="square">其他</van-checkbox>
							</van-checkbox-group>
						</template>
					</van-field>
					
					<van-field name="abd_ex75" label="是否属于村干部或近亲属" required :rules="[{ required: true, message: '请选择是否属于村干部或近亲属' }]">
						<template #input>
							<van-radio-group v-model="form.abd_ex75" direction="horizontal">
								<van-radio name="是">是</van-radio>
								<van-radio name="否">否</van-radio>
							</van-radio-group>
						</template>
					</van-field>
					
					<div class="page1Div2">
						&nbsp;&nbsp;&nbsp;&nbsp;<span class="page1Div2Font">其他信息</span>
					</div>
					<van-field v-model="form.abd_ex23" name="abd_ex23" maxlength="15" label="开户银行" placeholder="开户银行" required
						:rules="[{ required: true, message: '请填写开户银行' }]">
						<!-- <template #button>
							<van-button size="small" type="info" native-type="button">拍照识别</van-button>
						</template> -->
					</van-field>
					<van-field v-model="form.abd_ex78" center name="abd_ex78" maxlength="15" label="开户人" placeholder="开户人" required
						:rules="[{ required: true, message: '请填写开户人' }]">
					</van-field>
					<van-field v-model="form.abd_ex24" center name="abd_ex24" maxlength="22" label="银行账号" placeholder="银行账号" required
						:rules="[{ required: true, message: '请填写银行账号' }]" onkeyup="value=value.replace(/[^\dx]/gi,'')">
					</van-field>
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
			
			<!-- 家庭前12个月总收入情况 -->
			<div id="page2" v-show="page2" class="page2Div">
				<div class="page2Div2">
					<div class="page2Div3">
						<span class="page2Div3Div"></span>
						<span class="page2Div3Font">家庭前12个月总收入情况</span>
					</div>
					<van-form style="margin-top: 20px;">
						<van-field v-model="form.abd_ex83" name="abd_ex83" label="工资性收入"
							placeholder="工资性收入" :rules="[{ required: true, message: '请填写工资性收入' }]" type="number"
							@input='changeAmt'>
						</van-field>
				
						<van-field v-model="form.abd_ex84" name="abd_ex84" label="经营净收入"
							placeholder="经营净收入" :rules="[{ required: true, message: '请填写经营净收入' }]" type="number"
							@input='changeAmt'>
						</van-field>
						<van-field v-model="form.abd_ex85" name="abd_ex85" label="财产净收入"
							placeholder="财产净收入" :rules="[{ required: true, message: '请填写财产净收入' }]" type="number"
							@input='changeAmt'>
						</van-field>
						<van-field v-model="form.abd_ex86" name="abd_ex86" label="转移净收入"
							placeholder="转移净收入" :rules="[{ required: true, message: '请填写转移净收入' }]" type="number"
							@input='changeAmt'>
						</van-field>
						<van-field v-model="form.abd_ex87" name="abd_ex87" label="其他收入"
							placeholder="其他收入" :rules="[{ required: true, message: '请填写其他收入' }]" type="number"
							@input='changeAmt'>
						</van-field>
						<van-field v-model="form.abd_ex88" name="abd_ex88" label="家庭总收入" placeholder="家庭总收入"
							:rules="[{ required: true, message: '请填写家庭总收入' }]" type="number" @input='change'>
						</van-field>
						<van-field v-model="form.abd_ex89" name="abd_ex89" label="家庭月平均收入"
							placeholder="家庭月平均收入" :rules="[{ required: true, message: '请填写家庭月平均收入' }]" type="number">
						</van-field>
						<van-field v-model="form.abd_ex89_" name="abd_ex89_" disabled label="家庭月人均收入" placeholder="家庭月人均收入" type="number">
						</van-field>
						<van-field v-model="form.abd_ex90" name="abd_ex90" label="低保标准" placeholder="低保标准" disabled type="number" />
						<van-field v-model="form.abd_ex91" name="abd_ex91" label="家庭月保障金额" placeholder="家庭月保障金额" :rules="[{ required: true, message: '请填写家庭月保障金额' }]" type="number" />
						<van-field v-model="form.abd_ex72" name="abd_ex72" label="月享受金额" placeholder="月享受金额" type="number" />
						<van-field v-model="form.abd_ex42" name="abd_ex42" label="护理补贴金额" placeholder="护理补贴金额" type="number" />
						<van-field v-model="form.abd_ex71" name="abd_ex71" label="增发金额" placeholder="增发金额" type="number" />
				
						<div style="border-bottom: 10px solid #f3f3f3;"> </div>
					</van-form>
				</div>

				<div style="width: 100%;position: fixed;bottom: 0px;text-align: center;display: flex;justify-content: space-around">
					<van-button block native-type="button" @click="back2">上一步</van-button>
					<van-button block type="info" native-type="button" @click="next2">下一步</van-button>
				</div>
			</div>
			<!-- 财产情况 -->
			<div id="page3" v-show="page3" class="page2Div">
				<div class="page2Div2">
					<div class="page2Div3">
						<span class="page2Div3Div"></span>
						<span class="page2Div3Font">金融资产</span>
					</div>
					<van-form style="margin-top: 20px;">
						<van-field v-model="form.abd_ex79" name="abd_ex79" type="number" label="银行总存款" placeholder="银行总存款"
							:rules="[{ required: true, message: '请填写银行总存款' }]">
						</van-field>
				
						<van-field v-model="form.abd_ex80" name="abd_ex80" label="有价证券" placeholder="有价证券"
							:rules="[{ required: true, message: '请填写有价证券' }]">
						</van-field>
						<van-field v-model="form.abd_ex81" name="abd_ex81" label="债权" placeholder="债权"
							:rules="[{ required: true, message: '请填写债权' }]">
						</van-field>
						<van-field v-model="form.abd_ex82" name="abd_ex82" label="其他金融产品" placeholder="其他金融产品"
							:rules="[{ required: true, message: '请填写其他金融产品' }]">
						</van-field>
				
						<div style="border-bottom: 10px solid #f3f3f3;"> </div>
					</van-form>
				</div>
				

				<!-- <div style="margin: 16px;display: flex;justify-content: space-around;"> -->
				<div style="width: 100%;position: fixed;bottom: 0px;text-align: center;display: flex;justify-content: space-around">
					<van-button block native-type="button" @click="back3">上一步</van-button>
					<van-button block type="info" native-type="button" @click="next3">下一步</van-button>
				</div>
			</div>


			<div id="page4" v-show="page4" class="page4Div">
				<div class="page4Div2">
					<div class="page2Div3">
						<span class="page2Div3Div"></span>
						<span class="page2Div3Font">照片</span>
					</div>
					<div class="page4Div3">
						<div class="page4Div3Font">身份证照片:</div>
						<div style="margin-top:10px;">
							<div style="position:relative;width:100%;float: left;">
								<div class="page4Div4">
									<van-uploader v-model="fileList" :before-read="beforeRead" :max-count="1" :after-read="uploadImg(1)" :before-delete="beforeDelete('abd_ex37_1')" />

									<br>
									<span>上传身份证正面</span>
								</div>

								<div class="page4Div5">
									<van-uploader v-model="fileList2" :before-read="beforeRead" :max-count="1" :after-read="uploadImg(2)" :before-delete="beforeDelete('abd_ex37_2')" />
									<br>
									<span>上传身份证反面</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="page4Div6">
					<div class="page4Div3">
						<div class="page4Div3Font">授权书及民主评议:</div>
						<div style="margin-top:10px;">
							<div style="position:relative;width:100%;float: left;">
								<div class="page4Div4">
									<van-uploader v-model="fileList3" :before-read="beforeRead" :max-count="1" :after-read="uploadImg(3)" :before-delete="beforeDelete('abd_ex92')" />

									<br>
									<span>上传授权书照片</span>
								</div>

								<div class="page4Div5" id="sfzm2">
									<van-uploader v-model="fileList4" :before-read="beforeRead" :max-count="1" :after-read="uploadImg(5)" :before-delete="beforeDelete('abd_ex96')" />
									<br>
									<span>民主评议</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="page4Div7">
					<div class="page4Div7Font">其他证明材料:</div>
					<div style="margin-top:10px;">
						<div id="zmcl" style="position:relative;width:91%;float: left;">
							<van-uploader v-model="fileList5" :before-read="beforeRead" :after-read="uploadImg(4)" :before-delete="beforeDelete('abd_ex38')" />
						</div>
					</div>
				</div>
				<!-- 核查结果 -->

				<div class="page2Div2">
					<div class="page2Div3">
						<span class="page2Div3Div"></span>
						<span class="page2Div3Font">核查结果(不属实将自动生成诚信记录)</span>
					</div>
					<van-form style="margin-top: 20px;">

						<van-field required readonly clickable name="abd_ex100" :value="form.abd_ex100" label="情况是否属实"
							placeholder="点击选择情况是否属实" @click="showPicker61 = true" />
						<van-popup v-model="showPicker61" position="bottom">
							<van-picker show-toolbar :columns="columns16" @confirm="onConfirm61"
								@cancel="showPicker61 = false" />
						</van-popup>
						
						<van-field disabled value="调查人以' , '分隔(如 张三,李四 )"></van-field>
						<van-field v-model="form.abd_ex101" name="abd_ex101" maxlength="30" label="调查人" placeholder="调查人" required
							:rules="[{ required: true, message: '请填写调查人' }]">
						</van-field>

						<van-field v-model="form.abd_ex102" name="abd_ex102" maxlength="50" label="备注" placeholder="备注" required
							:rules="[{ required: true, message: '请填写备注' }]">
						</van-field>
					</van-form>
				</div>
				<!-- <div style="margin-top: 20px;display: flex;justify-content: space-around;"> -->
				<div style="width: 100%;position: fixed;bottom: 0px;text-align: center;display: flex;justify-content: space-around">
					<van-button block @click="back4">上一步</van-button>
					<van-button block type="info" @click="save">提交</van-button>
				</div>
			</div>
		</main>
	</div>
</template>

<script>
	import request from '@/utils/request.js'
	import {tszfValidate,tszfFilter,tszfFilter2,getSex,getAge,nation,xzqh,isCardID,compressImg} from '@/utils/utils.js'
	// import html2canvas from "html2canvas"
	export default {
		data() {
			return {
				sslbDisabled1:false,
				sslbDisabled2:false,
				showPicker11: false,
				showPicker12: false,
				showPicker13: false,
				showPicker14: false,
				showPicker15: false,
				showPicker16: false,
				abd_dat5_2: new Date(),
				
				typelx: this.$route.query.type,
				isShow: true,
				isShow2: false,
				isShow3: false,
				isShow4: false,
				isShow5: false,
				isShow6: false,
				page1: true,
				page2: false,
				page3: false,
				page4: false,
				page5: false,
				page6: false,
				fileList: [],
				fileList2: [],
				fileList3: [],
				fileList4: [],
				fileList5: [],
				abd_ex103: [],
				showPicker61: false,
				abd_ex77: [], //复选保存后转字符串
				form: {
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
				showxzqh: false,
				columns2: ['肢体','精神','智力','盲视力','言语','听力'],
				columns3: nation,
				columns4: ['一级','二级','三级','四级'],
				columns5: ['','2名以上残疾人','由达到法定退休年龄父母供养','由达到法定退休年龄的其他供养人供养'],
				columns6: ['户主本人','父母','配偶','子女','兄弟姐妹','孙子女','其他'],
				columns16: ['属实', '不属实', '转其他救助'],

				// 选项列表，children 代表子选项，支持多级嵌套
				options: xzqh,
			}
		},
		created() {
			this.getBasic()
		},
		methods: {
			next1() {
				// 去除姓名的空白符号并且判断姓名是否合法
				this.form.abd_ex2 = this.form.abd_ex2.replace(/\s*/g,"")
				let tszf = tszfValidate(this.form.abd_ex2)
				if(tszf){
					this.$toast.fail("请输入正确的姓名")
					return false
				}
				// 判断身份证是否合法
				let msg = isCardID(this.form.abd_ex3)
				if (msg) {
					this.$toast.fail(msg)
					return false
				}
				
				if(parseInt(this.form.abd_ex34) > 200){
					this.$toast.fail('年龄不能超过200')
					return false
				}
				// 过滤现住址特殊字符和空格
				this.form.abd_ex19 = this.form.abd_ex19.replace(/\s*/g,"")
				this.form.abd_ex19 = tszfFilter(this.form.abd_ex19)
				// 判断家庭人口是否大于20
				if(this.form.abd_ex67>20){
					this.$toast.fail("家庭人口不能超过20")
					return false
				}
				// 过滤开户银行特殊字符和空格
				this.form.abd_ex23 = this.form.abd_ex23.replace(/\s*/g,"")
				this.form.abd_ex23 = tszfFilter(this.form.abd_ex23)
				// 过滤开户人特殊字符和空格
				this.form.abd_ex78 = this.form.abd_ex78.replace(/\s*/g,"")
				this.form.abd_ex78 = tszfFilter(this.form.abd_ex78)
				// 验证联系电话
				let myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
				if (!myreg.test(this.form.abd_ex20)) {
					this.$toast.fail('请填写正确的联系电话')
					return false
				}
				// 过滤预警特殊字符和空格
				this.warning.forEach((value,index)=>{
					if(value.aw_ex1 && value.aw_dat1){
						value.aw_ex1 = value.aw_ex1.replace(/\s*/g,"")
						value.aw_ex1 = tszfFilter2(value.aw_ex1)
					}
					
				})
				this.$refs.rule1.validate().then(()=>{
					this.page1 = false
					this.page2 = true
					this.isShow = false
					this.isShow2 = true
					document.getElementsByClassName('dbjz')[0].scrollTop = 0
				}).catch(err=>{
					this.$toast.fail(err[0].message)
				})
				
			},
			next2() {
				this.page2 = false
				this.page3 = true
				this.isShow2 = false
				this.isShow3 = true
				document.getElementsByClassName('dbjz')[0].scrollTop = 0
			},
			next3() {
				// 过滤有价证券特殊字符和空格
				this.form.abd_ex80 = this.form.abd_ex80.replace(/\s*/g,"")
				this.form.abd_ex80 = tszfFilter(this.form.abd_ex80)
				// 过滤债权特殊字符和空格
				this.form.abd_ex81 = this.form.abd_ex81.replace(/\s*/g,"")
				this.form.abd_ex81 = tszfFilter(this.form.abd_ex81)
				// 过滤其他金融产品特殊字符和空格
				this.form.abd_ex82 = this.form.abd_ex82.replace(/\s*/g,"")
				this.form.abd_ex82 = tszfFilter(this.form.abd_ex82)
				this.page3 = false
				this.page4 = true
				this.isShow3 = false
				this.isShow4 = true
				document.getElementsByClassName('dbjz')[0].scrollTop = 0
			},
			next4() {
				this.page4 = false
				this.page5 = true
				this.isShow4 = false
				this.isShow5 = true
				document.getElementsByClassName('dbjz')[0].scrollTop = 0
			},
			back2() {
				this.page2 = false
				this.page1 = true
				this.isShow2 = false
				this.isShow = true
				document.getElementsByClassName('dbjz')[0].scrollTop = 0
			},
			back3() {
				this.page3 = false
				this.page2 = true
				this.isShow3 = false
				this.isShow2 = true
				document.getElementsByClassName('dbjz')[0].scrollTop = 0
			},
			back4() {
				this.page4 = false
				this.page3 = true
				this.isShow4 = false
				this.isShow3 = true
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
				this.form.abd_ex26 = area[2]
				this.form.abd_ex1 = area[1]
				this.form.abd_ex27 = area[0]
				this.form.abd_ex28_2 = area.join('/');
				this.form.abd_ex28 = area2.join(',');
				// 更改现住址
				if (this.form.abd_ex19 == '') {
					this.form.abd_ex19 = area[0] + area[1] + area[2];
				}
				if (this.form.abd_ex18 == '') {
					this.form.abd_ex18 = area[0] + area[1] + area[2];
				}
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
						this.form.abd_ex37_1 = res[0].filename
					} else if (num == 2) {
						this.form.abd_ex37_2 = res[0].filename
					} else if (num == 3) {
						this.form.abd_ex92 = res[0].filename
						// this.fileList3 = res[0].filename
					} else if (num == 4) {
						// 其他证明材料
						if (this.form.abd_ex38) {
							this.form.abd_ex38 = this.form.abd_ex38.concat(',', res[0].filename)
						} else {
							this.form.abd_ex38 = this.form.abd_ex38.concat(res[0].filename)
						}
						console.log(this.form.abd_ex38)
					} else if (num == 5) {
						// 民主评议
						this.form.abd_ex96 = res[0].filename
					}
				}).catch(erro => {
					file.status = 'failed';
					file.message = '上传失败';
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
					console.log(erro)
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
			onConfirm2(date) {
				let YY = date.getFullYear() + '-';
				let MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				let DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
				this.form.abd_dat5 = YY + MM + DD
				this.showPicker16 = false;
			},
			onConfirm11(value,item,itemval1,itemval2) {
				item[itemval1] = value
				this[itemval2] = false
			},
			onConfirm61(value) {
				this.form.abd_ex100 = value;
				this.showPicker61 = false;
			},
			getBasic() {
				// 获取基础数据
				request({
					method: 'post',
					url: '/social/assistanceWeixin/getCJBasic',
					data: {
						sId: this.$route.query.sId
					},
					headers: {
						'token': sessionStorage.getItem('token')
					}
				}).then(res => {
					let json = res[0].data[0]
					let warning = res[0].waring
					
					this.form = json
					this.changeSfz(json.abd_ex3)
					this.form.abd_ex89_ = (json.abd_ex89 / json.abd_ex67).toFixed(2)
					if (json.abd_ex77) {
						this.abd_ex77 = json.abd_ex77.split(',')
						// this.$set(this.form, 'abd_ex77_', json.abd_ex77)
					} 
					// else {
					// 	this.$set(this.form, 'abd_ex77_', "无劳动能力、无生活来源、无法定赡养抚养扶养义务人或者其法定义务人无履行义务能力")
					// }
					if (json.abd_ex78 == "") {
						this.form.abd_ex78 = json.abd_ex2
					}
					// 属实类别
					if(json.abd_ex103){
						this.abd_ex103 = json.abd_ex103.split(',')
						this.sslbChange(this.abd_ex103)
					}
					
					var abd_ex37 = json.abd_ex37.split(",");
					this.form.abd_ex37_1 = abd_ex37[0]
					this.form.abd_ex37_2 = abd_ex37.length > 1 ? abd_ex37[1] : ""
					if (this.form.abd_ex37_1) {
						// this.fileList.push(this.form.abd_ex37_1)
						console.log(this.form.abd_ex37_1)
						this.imageView(this.form.abd_ex37_1).then(res=>{
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
					if (this.form.abd_ex37_2) {
						// this.fileList2.push(this.form.abd_ex37_2)
						this.imageView(this.form.abd_ex37_2).then(res=>{
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
					if (json.abd_ex92) {
						let abd_ex92 = json.abd_ex92.split(",");
						// this.fileList3.push(abd_ex92[0])
						this.imageView(abd_ex92[0]).then(res=>{
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
					if (json.abd_ex38) {
						let imgs = json.abd_ex38.split(",");
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
					if (json.abd_ex96) {
						let abd_ex96 = json.abd_ex96.split(",");
						// this.fileList4.push(abd_ex96[0])
						this.imageView(abd_ex96[0]).then(res=>{
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
						console.log(this.form.abd_ex28)
						if (json.abd_ex27 != "" && json.abd_ex1 != "" && json.abd_ex26 != "") {
							this.form.abd_ex28_2 = json.abd_ex27 + '/' + json.abd_ex1 + '/' + json.abd_ex26
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

					if (json.abd_ex23 == "") {
						this.form.abd_ex23 = '泰兴农商行';
					}
					// if (json.ab_ex13 == "") {
					// 	this.form.ab_ex13 = this.$route.query.type
					// 	this.form.abd_ex35 = '委托确认'
					// }
				}).catch(error => {

				})
			},
			save() {
				// 民主评议可以不传
				// this.form.ab_ex13 = ''
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
				if(!this.form.abd_ex100){
					this.$toast.fail('请选择情况是否属实')
					return false
				}
				if(!this.form.abd_ex101){
					this.$toast.fail('请填写调查人')
					return false
				}
				if(this.form.abd_ex101 && (this.form.abd_ex101.split(',').length<2 && this.form.abd_ex101.split('，').length<2)){
					this.$toast.fail('调查人数不能少于两人')
					return false
				}
				if(!this.form.abd_ex102){
					this.$toast.fail('请填写备注')
					return false
				}
				// 过滤调查人姓名特殊字符和空格
				this.form.abd_ex101 = this.form.abd_ex101.replace(/\s*/g,"")
				this.form.abd_ex101 = tszfFilter2(this.form.abd_ex101)
				// 过滤备注特殊字符和空格
				this.form.abd_ex102 = this.form.abd_ex102.replace(/\s*/g,"")
				this.form.abd_ex102 = tszfFilter2(this.form.abd_ex102)
				
				if(this.abd_ex103.length>0){
					this.form.abd_ex103 = this.abd_ex103.join(',')
				}
				this.form.abd_ex37 = this.form.abd_ex37_1 + ',' + this.form.abd_ex37_2
				// this.form.ab_ex17 = '泰州市姜堰区社会救助综合平台'
				this.form.abd_ex77 = this.abd_ex77.join()
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
			// 属实类别选择(不符合救助条件和救助类别不能同时选中)
			sslbChange(val){
				if(val.length>0){
					if(val.length == 1 && val[0] == '不符合救助条件'){
						this.sslbDisabled1 = true
					}else{
						this.sslbDisabled2 = true
					}
				}else{
					// 全部解除禁用
					this.sslbDisabled1 = false
					this.sslbDisabled2 = false
				}
			},
			change(value) {
				console.log(value)
				console.log('change方法')
				this.form.abd_ex89 = (value / 12).toFixed(2)
				this.form.abd_ex89_ = (this.form.abd_ex89 / this.form.abd_ex67).toFixed(2)
				this.changeAmt('change')
			},
			changeSfz(value) {
				if (isCardID(value) == '') {
					this.form.abd_ex12 = getSex(value)
					this.form.abd_ex34 = getAge(value)
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
			// 特困补贴标准
			changeAmt(total) {
				
					let a1 = this.form.abd_ex83 ? parseInt(this.form.abd_ex83) : 0
					let a2 = this.form.abd_ex84 ? parseInt(this.form.abd_ex84) : 0
					let a3 = this.form.abd_ex85 ? parseInt(this.form.abd_ex85) : 0
					let a4 = this.form.abd_ex86 ? parseInt(this.form.abd_ex86) : 0
					let a5 = this.form.abd_ex87 ? parseInt(this.form.abd_ex87) : 0
					var amt =a1+a2+a3+a4+a5;
					if (total!='true' && amt) {
						this.form.abd_ex88 = amt
						this.form.abd_ex89 = (amt / 12).toFixed(2)
					}
				
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
		width: 90px;
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
	.page2Div{
		margin-bottom: 200px;
		display: block;
		padding-top: 40px;
	}
	.page2Div2{
		font-size:28px;
		padding-left:40px;
		padding-right:40px;
		text-align: left;
	}
	.page2Div3{
		border-bottom:#aaa solid 1px;
		font-size: 28px;
	}
	.page2Div3Div{
		background-color: #00AAFF;
		display: inline-block;
		width: 10px;height: 20px;
	}
	.page2Div3Font{
		color: #00AAFF;
	}
	.page4Div{
		margin-bottom: 200px;
		/* padding-left: 20px; */
		/* display: none; */
	}
	.page4Div2{
		font-size:28px;
		text-align: left;
	}
	.page4Div3{
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
	.page4Div3Font{
		height:80px;
		line-height:80px
	}
	.page4Div4{
		width:40%;
		height:400px;
		text-align: center;
		float: left;
		margin-left:40px;
	}
	.page4Div5{
		width:40%;
		height:400px;
		text-align: center;
		float: right;
		margin-right:40px;
	}
	.page4Div6{
		font-size:28px;
		text-align: left;
		margin-top: 100px;
	}
	.page4Div7{
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
	.page4Div7Font{
		height:80px;
		line-height:80px;
		font-size: 28px;
	}
</style>

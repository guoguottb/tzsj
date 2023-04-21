<template>
	<div class="dbjz">
		<header>
			<div class="headerHead">
				<div>
					<div :class="{headerF:isShow}">基础信息</div>
				</div>
				<div class="headerRectangle"></div>
				<div>
					<div :class="{headerF:isShow2}">家庭状况</div>
				</div>
				<div class="headerRectangle"></div>
				<div>
					<div :class="{headerF:isShow3}">监护状况</div>
				</div>
				<div class="headerRectangle"></div>
				<div>
					<div :class="{headerF:isShow4}">材料上传</div>
				</div>
				<!-- <div class="headerRectangle"></div>
				<div>
					<div :class="{headerF:isShow5}">材料上传</div>
				</div> -->
				<!-- <div class="headerRectangle"></div>
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
					<!-- <van-field name="ab_ex75" label="申请方式" required :rules="[{ required: true, message: '请选择申请方式' }]">
						<template #input>
							<van-radio-group v-model="form.ab_ex75" direction="horizontal">
								<van-radio name="委托代理">代申请</van-radio>
								<van-radio name="本人">本人</van-radio>
							</van-radio-group>
						</template>
					</van-field> -->
					<van-field v-model="form.abc_ex6" required name="abc_ex6" maxlength="10" label="姓名" placeholder="姓名" :rules="[{ required: true, message: '请填写姓名' }]">
						<!-- <template #button>
							<van-button size="small" type="info" native-type="button">拍照识别</van-button>
						</template> -->
					</van-field>
					<van-field v-model="form.abc_ex7" required name="abc_ex7" label="身份证号" placeholder="身份证号"
						:rules="[{ required: true, message: '请填写身份证号'}]" @input='changeSfz' />
					<van-field readonly clickable name="abc_ex9" v-model="form.abc_ex9" label="性别" required
						placeholder="点击选择性别" :rules="[{ required: true, message: '请选择性别'}]" @click="showPickerN1 = true" />
					<van-popup v-model="showPickerN1" position="bottom">
						<van-picker show-toolbar :columns="columns2" @confirm="onConfirmN1($event,'abc_ex9','showPickerN1')" @cancel="showPickerN1 = false" />
					</van-popup>
					
					<van-field readonly clickable name="abc_ex12" v-model="form.abc_ex12" label="民族" required
						placeholder="点击选择民族" :rules="[{ required: true, message: '请选择民族'}]" @click="showPickerN2 = true" />
					<van-popup v-model="showPickerN2" position="bottom">
						<van-picker show-toolbar :columns="columns3" @confirm="onConfirmN1($event,'abc_ex12','showPickerN2')"
							@cancel="showPickerN2 = false" />
					</van-popup>
					<van-field v-model="form.abc_ex234_2" name="abc_ex234_2" required center readonly label="行政区划" placeholder="请选择所在行政区划"
						@click="showxzqh = true" :rules="[{ required: true, message: '请选择行政区划' }]">
						<!-- <template #button>
							<van-button size="small" type="info" native-type="button" @click.stop="xzqh">区外</van-button>
						</template> -->
					</van-field>
					<van-popup v-model="showxzqh" round position="bottom">
						<!-- abc_ex234_3是因为和上面field显示的要不一样，不然区划选到一半关闭会显示options的value值 -->
						<van-cascader v-model="form.abc_ex234_3" title="请选择所在行政区划" :options="options"
							@close="showxzqh = false" @finish="onFinish" />
					</van-popup>
					<van-field v-model="form.abc_ex13" name="abc_ex13" required label="户籍地址" placeholder="户籍地址"
						:rules="[{ required: true, message: '请填写户籍地址' }]" />
						
					<van-field v-model="form.abc_ex235" name="abc_ex235" required label="家庭与邻里关系" placeholder="请选择家庭与邻里关系"
						@click = "showPickerN33 = true" :rules="[{required:true,message:'请选择家庭与邻里关系'}]" />
					<van-popup v-model="showPickerN33" round position="bottom">
						<van-picker show-toolbar :columns="columnsN1" @confirm="onConfirmN1($event,'abc_ex235','showPickerN33')" @cancel="showPickerN33 = false"></van-picker>
					</van-popup>
					
					<!-- <van-field v-model="form.ab_ex11" name="ab_ex11" label="家庭住址" required placeholder="家庭住址"
						:rules="[{ required: true, message: '请填写家庭住址' }]" /> -->
					<van-field v-model="form.abc_ex14" name="abc_ex14" maxlength="50" label="现住地址" required placeholder="现住地址"
						:rules="[{ required: true, message: '请填写现住地址' }]" />
					
					<van-field v-model="form.abc_ex190" center name="abc_ex190" maxlength="11" type="number" required label="联系电话" placeholder="联系电话"
						:rules="[{ required: true, message: '请填写联系电话' }]">
					</van-field>
					
					<van-field v-model="form.abc_ex15" name="abc_ex15" label="健康状况" required placeholder="请选择健康状况" :rules="[{required:true,message:'请选择健康状况'}]" @click="showPickerN3 = true" />
					<van-popup v-model="showPickerN3" round position="bottom">
						<van-picker show-toolbar :columns="columnsN2" @confirm="onConfirmN1($event,'abc_ex15','showPickerN3')" @cancel="showPickerN3 = false"></van-picker>
					</van-popup>
					<div v-if="form.abc_ex15 == '残疾'">
						<van-field v-model="form.abc_ex17" name="abc_ex17" label="残疾类别" required placeholder="请选择残疾类别" :rules="[{required:true,message:'请选择残疾类别'}]" @click="showPickerN4 = true" />
						<van-popup v-model="showPickerN4" round position="bottom">
							<van-picker show-toolbar :columns="columnsN3" @confirm="onConfirmN1($event,'abc_ex17','showPickerN4')" @cancel="showPickerN4 = false"></van-picker>
						</van-popup>
						<van-field v-model="form.abc_ex16" name="abc_ex16" label="是否残疾二代证" required placeholder="请选择是否残疾二代证" :rules="[{required:true,message:'请选择是否残疾二代证'}]" @click="showPickerN5 = true" />
						<van-popup v-model="showPickerN5" round position="bottom">
							<van-picker show-toolbar :columns="columns22" @confirm="onConfirmN1($event,'abc_ex16','showPickerN5')" @cancel="showPickerN5 = false"></van-picker>
						</van-popup>
						<van-field v-model="form.abc_ex18" name="abc_ex18" label="残疾等级" required placeholder="请选择残疾等级" :rules="[{required:true,message:'请选择残疾等级'}]" @click="showPickerN6 = true" />
						<van-popup v-model="showPickerN6" round position="bottom">
							<van-picker show-toolbar :columns="columnsN4" @confirm="onConfirmN1($event,'abc_ex18','showPickerN6')" @cancel="showPickerN6 = false"></van-picker>
						</van-popup>
						<van-field v-model="form.abc_ex20" required name="abc_ex20" label="残疾证号" placeholder="残疾证号" :rules="[{ required: true, message: '请填写残疾证号'}]" />
					</div>
					<div v-if="form.abc_ex15 == '患病'">
						<van-field v-model="form.abc_ex236" readonly required clickable name="abc_ex236" label="患病时间" placeholder="请选择患病时间" @click="showPickerN7 = true" />
						<van-popup v-model="showPickerN7" position="bottom">
							<van-datetime-picker v-model="currentDate" type="date" @confirm="onConfirmN2($event,'abc_ex236','showPickerN7')" @cancel="showPickerN7 = false" />
						</van-popup>
						<van-field v-model="form.abc_ex238" required name="abc_ex238" label="患病名称" placeholder="患病名称" :rules="[{ required: true, message: '请填写患病名称'}]" />
						<van-field v-model="form.abc_ex239" required name="abc_ex239" label="患病描述" placeholder="患病描述" :rules="[{ required: true, message: '请填写患病描述'}]" />
						<van-field name="abc_ex240" label="医保政策规定的住院和门诊治疗费用1年中自付部分超过两万元" required :rules="[{ required: true, message: '请选择医保政策规定的住院和门诊治疗费用' }]">
							<template #input>
								<van-radio-group v-model="form.abc_ex240" direction="horizontal">
								  <van-radio class="marginstyle" name="是">是</van-radio>
								  <van-radio class="marginstyle" name="否">否</van-radio>
								</van-radio-group>
							</template>
						</van-field>
					</div>
					<van-field v-model="form.abc_ex22" required name="abc_ex22" label="就学情况" placeholder="请选择就学情况" :rules="[{ required: true, message: '请选择就学情况'}]" @click="showPickerN8 = true" />
					<van-popup v-model="showPickerN8" position="bottom">
						<van-picker show-toolbar :columns="columnsN5" @confirm="onConfirmN1($event,'abc_ex22','showPickerN8')" @cancel="showPickerN8 = false"></van-picker>
					</van-popup>
					
					<van-field v-if="form.abc_ex22 && form.abc_ex22!= '未入学'" v-model="form.abc_ex26" required name="abc_ex26" label="就读学校" placeholder="就读学校" :rules="[{ required: true, message: '请填写就读学校'}]" />
					
					<van-field v-model="form.abc_ex241" required name="abc_ex241" label="务工情况" placeholder="请选择务工情况" :rules="[{ required: true, message: '请选择务工情况'}]" @click="showPickerN9 = true" />
					<van-popup v-model="showPickerN9" position="bottom">
						<van-picker show-toolbar :columns="columnsN6" @confirm="onConfirmN1($event,'abc_ex241','showPickerN9')" @cancel="showPickerN9 = false"></van-picker>
					</van-popup>
					<van-field v-if="form.abc_ex241 == '其他'" v-model="form.abc_ex242" required name="abc_ex242" label="其他务工情况" placeholder="其他务工情况" :rules="[{ required: true, message: '请填写其他务工情况'}]" />
					
					<van-field v-model="form.abc_ex243" name="abc_ex243" label="违法犯罪经历" placeholder="请选择违法犯罪经历" @click="showPickerN10 = true" />
					<van-popup v-model="showPickerN10" position="bottom">
						<van-picker show-toolbar :columns="columnsN7" @confirm="onConfirmN1($event,'abc_ex243','showPickerN10')" @cancel="showPickerN10 = false"></van-picker>
					</van-popup>
					
					<!-- <van-field v-if="ab_ex158.length>0" name="ab_ex158" label="原申请类别" required
						:rules="[{ required: true, message: '请选择原申请类别' }]">
						<template #input>
							<van-checkbox-group disabled  v-model="ab_ex158" direction="horizontal">
								<div v-for="(item,index) in ab_ex158" :key='index'>
									<van-checkbox class="marginstyle" v-if="item=='低保'" :name="item" shape="square">城乡低保</van-checkbox>
									<van-checkbox class="marginstyle" v-else-if="item=='家庭边缘'" :name="item" shape="square">低收入家庭</van-checkbox>
									<van-checkbox class="marginstyle" v-else :name="item" shape="square">{{item}}</van-checkbox>
								</div>
							</van-checkbox-group>
						</template>
					</van-field> -->
					<van-field name="abc_ex283" label="求助属实类别" required
						:rules="[{ required: true, message: '请选择求助属实类别' }]">
						<template #input>
							<van-checkbox-group v-model="abc_ex283" direction="horizontal" @change="sslbChange">
								<!-- <van-checkbox class="marginstyle" name="低保" shape="square">城乡低保</van-checkbox> -->
								<!-- <van-checkbox class="marginstyle" name="特困供养" shape="square">特困供养</van-checkbox> -->
								<!-- <van-checkbox class="marginstyle" name="家庭边缘" shape="square">低收入家庭</van-checkbox> -->
								<van-checkbox :disabled="sslbDisabled1" class="marginstyle" name="困境儿童" shape="square">困境儿童</van-checkbox>
								<!-- <van-checkbox class="marginstyle" name="残疾人补贴" shape="square">残疾人补贴</van-checkbox> -->
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
					<van-field name="abc_ex230" label="原因分类" required
						:rules="[{ required: true, message: '请选择原因分类' }]">
						<template #input>
							<van-checkbox-group v-model="abc_ex230" direction="horizontal">
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
					
					<div class="page1Div2">
						&nbsp;&nbsp;&nbsp;&nbsp;<span class="page1Div2Font">其他信息</span>
					</div>
					<van-field v-model="form.abc_ex192" name="abc_ex192" maxlength="15" label="开户银行" placeholder="开户银行" required
						:rules="[{ required: true, message: '请填写开户银行' }]">
						<!-- <template #button>
							<van-button size="small" type="info" native-type="button">拍照识别</van-button>
						</template> -->
					</van-field>
					<van-field v-model="form.abc_ex193" center name="abc_ex193" maxlength="15" label="开户人" placeholder="开户人" required
						:rules="[{ required: true, message: '请填写开户人' }]">
					</van-field>
					<van-field v-model="form.abc_ex195" center name="abc_ex195" maxlength="22" label="银行账号" placeholder="银行账号" required
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
			
			
			
			<div id="page2" v-show="page2" class="page1Div1">
				<div class="page1Div2">
					&nbsp;&nbsp;&nbsp;&nbsp;<span class="page1Div2Font">家庭状况</span>
				</div>
				<van-form ref='rule2' @submit="next2">
					<!-- 最后保存这里要改成字符串存进去 -->
					<van-field name="abc_ex244" label="家庭主要成员">
						<template #input>
							<van-checkbox-group v-model="abc_ex244" direction="horizontal" @change='changeJtcy'>
								<van-checkbox class="marginstyle" name="祖父" shape="square">祖父</van-checkbox>
								<van-checkbox class="marginstyle" name="外祖父" shape="square">外祖父</van-checkbox>
								<van-checkbox class="marginstyle" name="父亲" shape="square">父亲</van-checkbox>
								<van-checkbox class="marginstyle" name="母亲" shape="square">母亲</van-checkbox>
								<van-checkbox class="marginstyle" name="哥哥" shape="square">哥哥</van-checkbox>
								<van-checkbox class="marginstyle" name="弟弟" shape="square">弟弟</van-checkbox>
								<van-checkbox class="marginstyle" name="祖母" shape="square">祖母</van-checkbox>
								<van-checkbox class="marginstyle" name="外祖母" shape="square">外祖母</van-checkbox>
								<van-checkbox class="marginstyle" name="继父" shape="square">继父</van-checkbox>
								<van-checkbox class="marginstyle" name="姐姐" shape="square">姐姐</van-checkbox>
								<van-checkbox class="marginstyle" name="妹妹" shape="square">妹妹</van-checkbox>
							</van-checkbox-group>
						</template>
					</van-field>
					<van-field name="abc_ex250" label="是否独生子女" required :rules="[{ required: true, message: '请选择是否独生子女' }]">
						<template #input>
							<van-radio-group v-model="form.abc_ex250" direction="horizontal">
								<van-radio class="marginstyle" name="是" >是</van-radio>
								<van-radio class="marginstyle" name="否" >否</van-radio>
							</van-radio-group>
						</template>
					</van-field>
					<van-field v-if="abc_ex244.indexOf('哥哥')!= -1" v-model="form.abc_ex245" name="abc_ex245" type="digit" label="哥哥个数" placeholder="哥哥个数" required :rules="[{ required: true, message: '请填写哥哥个数' }]" @change='changeNum' />
					<van-field v-if="abc_ex244.indexOf('弟弟')!= -1" v-model="form.abc_ex246" name="abc_ex246" type="digit" label="弟弟个数" placeholder="弟弟个数" required :rules="[{ required: true, message: '请填写弟弟个数' }]" @change='changeNum' />
					<van-field v-if="abc_ex244.indexOf('姐姐')!= -1" v-model="form.abc_ex247" name="abc_ex247" type="digit" label="姐姐个数" placeholder="姐姐个数" required :rules="[{ required: true, message: '请填写姐姐个数' }]" @change='changeNum' />
					<van-field v-if="abc_ex244.indexOf('妹妹')!= -1" v-model="form.abc_ex248" name="abc_ex248" type="digit" label="妹妹个数" placeholder="妹妹个数" required :rules="[{ required: true, message: '请填写妹妹个数' }]" @change='changeNum' />
					
					<van-field v-model="form.abc_ex249" required name="abc_ex249" label="家庭类型" placeholder="请选择家庭类型" :rules="[{ required: true, message: '请选择家庭类型'}]" @click="showPickerN11 = true" />
					<van-popup v-model="showPickerN11" position="bottom">
						<van-picker show-toolbar :columns="columnsN8" @confirm="onConfirmN1($event,'abc_ex249','showPickerN11')" @cancel="showPickerN11 = false"></van-picker>
					</van-popup>
					
					
					
					<van-field v-model="form.abc_ex251" type="digit" required name="abc_ex251" label="家庭成员数量" placeholder="家庭成员数量" :rules="[{ required: true, message: '请填写家庭成员数量' }]" />
					<van-field v-if="abc_ex244.indexOf('哥哥')!= -1 || abc_ex244.indexOf('弟弟')!= -1 || abc_ex244.indexOf('姐姐')!= -1 || abc_ex244.indexOf('妹妹')!= -1" v-model="form.abc_ex252" type="digit" required name="abc_ex252" label="兄弟姐妹数量" placeholder="兄弟姐妹数量" :rules="[{ required: true, message: '请填写兄弟姐妹数量' }]" />
					<van-field v-if="abc_ex244.indexOf('父亲')!= -1" v-model="form.abc_ex42" required name="abc_ex42" maxlength="10" label="父亲姓名" placeholder="父亲姓名" :rules="[{ required: true, message: '请填写父亲姓名' }]" />
					<van-field v-if="abc_ex244.indexOf('父亲')!= -1" v-model="form.abc_ex253" required name="abc_ex253" maxlength="50" label="父亲职业描述" placeholder="父亲职业描述" :rules="[{ required: true, message: '请填写父亲职业描述' }]" />
					<van-field v-if="abc_ex244.indexOf('父亲')!= -1" v-model="form.abc_ex254" required name="abc_ex254" maxlength="50" label="父亲就业地点" placeholder="父亲就业地点" :rules="[{ required: true, message: '请填写父亲就业地点' }]" />
					
					<van-field v-if="abc_ex244.indexOf('父亲')!= -1" v-model="form.abc_ex52" required name="abc_ex52" label="父亲健康状况" placeholder="请选择父亲健康状况" :rules="[{ required: true, message: '请选择父亲健康状况'}]" @click="showPickerN13 = true" />
					<van-popup v-model="showPickerN13" position="bottom">
						<van-picker show-toolbar :columns="columnsN10" @confirm="onConfirmN1($event,'abc_ex52','showPickerN13')" @cancel="showPickerN13 = false"></van-picker>
					</van-popup>
					<div v-if="form.abc_ex52 == '残疾'">
						<van-field v-model="form.abc_ex261" required name="abc_ex261" label="残疾类别及等级描述" placeholder="残疾类别及等级描述" :rules="[{ required: true, message: '请填写残疾类别及等级描述' }]" />
						
						<van-field name="abc_ex262" label="是否领证" required :rules="[{ required: true, message: '请选择是否领证' }]">
							<template #input>
								<van-radio-group v-model="form.abc_ex262" direction="horizontal">
									<van-radio class="marginstyle" name="是" >是</van-radio>
									<van-radio class="marginstyle" name="否" >否</van-radio>
								</van-radio-group>
							</template>
						</van-field>
					</div>
					<div v-if="form.abc_ex52 == '患病'">
						<van-field v-model="form.abc_ex263" readonly required clickable name="abc_ex263" label="患病时间" placeholder="请选择患病时间" @click="showPickerN14 = true" />
						<van-popup v-model="showPickerN14" position="bottom">
							<van-datetime-picker v-model="currentDate2" type="date" @confirm="onConfirmN2($event,'abc_ex263','showPickerN14')" @cancel="showPickerN14 = false" />
						</van-popup>
						<van-field v-model="form.abc_ex264" required name="abc_ex264" label="患病名称" placeholder="患病名称" :rules="[{ required: true, message: '请填写患病名称'}]" />
						<van-field v-model="form.abc_ex265" required name="abc_ex265" label="患病描述" placeholder="患病描述" :rules="[{ required: true, message: '请填写患病描述'}]" />
					</div>
					
					
					
					<van-field v-if="abc_ex244.indexOf('母亲')!= -1" v-model="form.abc_ex47" required name="abc_ex47" maxlength="10" label="母亲姓名" placeholder="母亲姓名" :rules="[{ required: true, message: '请填写母亲姓名' }]" />
					<van-field v-if="abc_ex244.indexOf('母亲')!= -1" v-model="form.abc_ex255" required name="abc_ex255" maxlength="50" label="母亲职业描述" placeholder="母亲职业描述" :rules="[{ required: true, message: '请填写母亲职业描述' }]" />
					<van-field v-if="abc_ex244.indexOf('母亲')!= -1" v-model="form.abc_ex256" required name="abc_ex256" maxlength="50" label="母亲就业地点" placeholder="母亲就业地点" :rules="[{ required: true, message: '请填写母亲就业地点' }]" />
					
					<van-field v-if="abc_ex244.indexOf('母亲')!= -1" v-model="form.abc_ex65" required name="abc_ex65" label="母亲健康状况" placeholder="请选择母亲健康状况" :rules="[{ required: true, message: '请选择母亲健康状况'}]" @click="showPickerN15 = true" />
					<van-popup v-model="showPickerN15" position="bottom">
						<van-picker show-toolbar :columns="columnsN10" @confirm="onConfirmN1($event,'abc_ex65','showPickerN15')" @cancel="showPickerN15 = false"></van-picker>
					</van-popup>
					<div v-if="form.abc_ex65 == '残疾'">
						<van-field v-model="form.abc_ex266" required name="abc_ex266" label="残疾类别及等级描述" placeholder="残疾类别及等级描述" :rules="[{ required: true, message: '请填写残疾类别及等级描述' }]" />
						
						<van-field name="abc_ex267" label="是否领证" required :rules="[{ required: true, message: '请选择是否领证' }]">
							<template #input>
								<van-radio-group v-model="form.abc_ex267" direction="horizontal">
									<van-radio class="marginstyle" name="是" >是</van-radio>
									<van-radio class="marginstyle" name="否" >否</van-radio>
								</van-radio-group>
							</template>
						</van-field>
					</div>
					<div v-if="form.abc_ex65 == '患病'">
						<van-field v-model="form.abc_ex268" readonly required clickable name="time" label="患病时间" placeholder="请选择患病时间" @click="showPickerN16 = true" />
						<van-popup v-model="showPickerN16" position="bottom">
							<van-datetime-picker v-model="currentDate3" type="date" @confirm="onConfirmN2($event,'abc_ex268','showPickerN16')" @cancel="showPickerN16 = false" />
						</van-popup>
						<van-field v-model="form.abc_ex269" required name="abc_ex269" label="患病名称" placeholder="患病名称" :rules="[{ required: true, message: '请填写患病名称'}]" />
						<van-field v-model="form.abc_ex270" required name="abc_ex270" label="患病描述" placeholder="患病描述" :rules="[{ required: true, message: '请填写患病描述'}]" />
					</div>
					
					<van-field v-model="form.abc_ex257" required name="abc_ex257" label="住房" placeholder="请选择住房" :rules="[{ required: true, message: '请选择住房'}]" @click="showPickerN12 = true" />
					<van-popup v-model="showPickerN12" position="bottom">
						<van-picker show-toolbar :columns="columnsN9" @confirm="onConfirmN1($event,'abc_ex257','showPickerN12')" @cancel="showPickerN12 = false"></van-picker>
					</van-popup>
					<van-field v-model="form.abc_ex258" required name="abc_ex258" type="number" label="住房面积" placeholder="住房面积" :rules="[{ required: true, message: '请填写住房面积' }]" />
					<van-field v-model="form.abc_ex259" required name="abc_ex259" type="digit" label="住房套数" placeholder="住房套数" :rules="[{ required: true, message: '请填写住房套数' }]" />
					<van-field v-model="form.abc_ex260" required name="abc_ex260" maxlength="100" label="家庭月收入描述" placeholder="家庭月收入描述" :rules="[{ required: true, message: '请填写家庭月收入描述' }]" />
					
					
					<div style="width: 100%;position: fixed;bottom: 0px;text-align: center;display: flex;justify-content: space-around">
						<van-button block native-type="button" @click="back2">上一步</van-button>
						<van-button block type="info" native-type="button" @click="next2">下一步</van-button>
					</div>
				</van-form>
			</div>
			<!-- page3 -->
			<div id="page3" v-show="page3" class="page1Div1">
				<div class="page1Div2">
					&nbsp;&nbsp;&nbsp;&nbsp;<span class="page1Div2Font">监护状况</span>
				</div>
				<van-form ref='rule3' @submit="next3">
					<!-- 最后保存为无的值设为空 -->
					<!-- <van-field v-model="form.ab_ex542" name="ab_ex542" label="父亲已享受救助情况" placeholder="请选择父亲已享受救助情况" @click="showPickerN17 = true" />
					<van-popup v-model="showPickerN17" position="bottom">
						<van-picker show-toolbar :columns="columnsN11" @confirm="onConfirmN1($event,'ab_ex542','showPickerN17')" @cancel="showPickerN17 = false"></van-picker>
					</van-popup>
					
					<van-field v-if="form.ab_ex542 == '其他'" v-model="form.ab_ex543" required name="ab_ex543" label="父亲其他已享受救助情况描述" placeholder="父亲其他已享受救助情况描述" :rules="[{ required: true, message: '请填写父亲其他已享受救助情况描述'}]" />
					
					
					<van-field v-model="form.ab_ex544" name="ab_ex544" label="母亲已享受救助情况" placeholder="请选择母亲已享受救助情况" @click="showPickerN18 = true" />
					<van-popup v-model="showPickerN18" position="bottom">
						<van-picker show-toolbar :columns="columnsN11" @confirm="onConfirmN1($event,'ab_ex544','showPickerN18')" @cancel="showPickerN18 = false"></van-picker>
					</van-popup>
					
					<van-field v-if="form.ab_ex544 == '其他'" v-model="form.ab_ex545" required name="ab_ex545" label="母亲其他已享受救助情况描述" placeholder="母亲其他已享受救助情况描述" :rules="[{ required: true, message: '请填写母亲其他已享受救助情况描述'}]" />
					
					
					<van-field v-model="form.ab_ex546" name="ab_ex546" label="本人已享受救助情况" placeholder="请选择本人已享受救助情况" @click="showPickerN19 = true" />
					<van-popup v-model="showPickerN19" position="bottom">
						<van-picker show-toolbar :columns="columnsN12" @confirm="onConfirmN1($event,'ab_ex546','showPickerN19')" @cancel="showPickerN19 = false"></van-picker>
					</van-popup>
					
					<van-field v-if="form.ab_ex546 == '其他'" v-model="form.ab_ex547" required name="ab_ex547" label="本人其他已享受救助情况描述" placeholder="本人其他已享受救助情况描述" :rules="[{ required: true, message: '请填写本人其他已享受救助情况描述'}]" />
					
					<van-field v-if="form.ab_ex546 && form.ab_ex546 != '无'" v-model="form.ab_ex548" readonly required clickable name="time" label="停保日期" placeholder="请选择停保日期" @click="showPickerN20 = true" />
					<van-popup v-model="showPickerN20" position="bottom">
						<van-datetime-picker v-model="currentDate4" type="date" @confirm="onConfirmN2($event,'ab_ex548','showPickerN20')" @cancel="showPickerN20 = false" />
					</van-popup>
					
					
					<van-field v-model="form.ab_ex549" name="ab_ex549" label="爷爷已享受救助情况" placeholder="请选择爷爷已享受救助情况" @click="showPickerN21 = true" />
					<van-popup v-model="showPickerN21" position="bottom">
						<van-picker show-toolbar :columns="columnsN11" @confirm="onConfirmN1($event,'ab_ex549','showPickerN21')" @cancel="showPickerN21 = false"></van-picker>
					</van-popup>
					
					<van-field v-if="form.ab_ex549 == '其他'" v-model="form.ab_ex550" required name="ab_ex550" label="爷爷其他已享受救助情况描述" placeholder="爷爷其他已享受救助情况描述" :rules="[{ required: true, message: '请填写爷爷其他已享受救助情况描述'}]" />
					
					
					<van-field v-model="form.ab_ex551" name="ab_ex551" label="奶奶已享受救助情况" placeholder="请选择奶奶已享受救助情况" @click="showPickerN22 = true" />
					<van-popup v-model="showPickerN22" position="bottom">
						<van-picker show-toolbar :columns="columnsN11" @confirm="onConfirmN1($event,'ab_ex551','showPickerN22')" @cancel="showPickerN22 = false"></van-picker>
					</van-popup>
					
					<van-field v-if="form.ab_ex551 == '其他'" v-model="form.ab_ex552" required name="ab_ex552" label="奶奶其他已享受救助情况描述" placeholder="奶奶其他已享受救助情况描述" :rules="[{ required: true, message: '请填写奶奶其他已享受救助情况描述'}]" />
					
					
					<van-field v-model="form.ab_ex553" name="ab_ex553" label="兄弟已享受救助情况" placeholder="请选择兄弟已享受救助情况" @click="showPickerN23 = true" />
					<van-popup v-model="showPickerN23" position="bottom">
						<van-picker show-toolbar :columns="columnsN12" @confirm="onConfirmN1($event,'ab_ex553','showPickerN23')" @cancel="showPickerN23 = false"></van-picker>
					</van-popup>
					
					<van-field v-if="form.ab_ex553 == '其他'" v-model="form.ab_ex554" required name="ab_ex554" label="兄弟其他已享受救助情况描述" placeholder="兄弟其他已享受救助情况描述" :rules="[{ required: true, message: '请填写兄弟其他已享受救助情况描述'}]" />
					
					
					<van-field v-model="form.ab_ex555" name="ab_ex555" label="姐妹已享受救助情况" placeholder="请选择姐妹已享受救助情况" @click="showPickerN24 = true" />
					<van-popup v-model="showPickerN24" position="bottom">
						<van-picker show-toolbar :columns="columnsN12" @confirm="onConfirmN1($event,'ab_ex555','showPickerN24')" @cancel="showPickerN24 = false"></van-picker>
					</van-popup>
					
					<van-field v-if="form.ab_ex556 == '其他'" v-model="form.ab_ex556" required name="ab_ex556" label="姐妹其他已享受救助情况描述" placeholder="姐妹其他已享受救助情况描述" :rules="[{ required: true, message: '请填写姐妹其他已享受救助情况描述'}]" /> -->
					
					
					<van-field v-model="form.abc_ex271" name="abc_ex271" required label="亲子关系" placeholder="请选择亲子关系" @click="showPickerN25 = true" :rules="[{required:true,message:'请选择家庭与邻里关系'}]" />
					<van-popup v-model="showPickerN25" position="bottom">
						<van-picker show-toolbar :columns="columnsN13" @confirm="onConfirmN1($event,'abc_ex271','showPickerN25')" @cancel="showPickerN25 = false"></van-picker>
					</van-popup>
					
					<van-field v-model="form.abc_ex272" name="abc_ex272" maxlength="100" required label="监护状况" placeholder="请选择监护状况" :rules="[{ required: true, message: '请选择监护状况'}]" @click="showPickerN26 = true" />
					<van-popup v-model="showPickerN26" position="bottom">
						<van-picker show-toolbar :columns="columnsN14" @confirm="onConfirmN1($event,'abc_ex272','showPickerN26')" @cancel="showPickerN26 = false"></van-picker>
					</van-popup>
					
					<van-field v-model="form.abc_ex273" required name="abc_ex273" label="监护状况具体描述" placeholder="监护状况具体描述" :rules="[{ required: true, message: '请填写监护状况具体描述'}]" />
					
					
					<van-field v-model="form.abc_ex274" name="abc_ex274" required label="监护人" placeholder="请选择监护人" :rules="[{ required: true, message: '请选择监护人'}]" @click="showPickerN27 = true" />
					<van-popup v-model="showPickerN27" position="bottom">
						<van-picker show-toolbar :columns="columnsN15" @confirm="onConfirmN1($event,'abc_ex274','showPickerN27')" @cancel="showPickerN27 = false"></van-picker>
					</van-popup>
					
					<van-field v-model="form.abc_ex275" required name="abc_ex275" maxlength="100" label="监护人具体描述" placeholder="监护人具体描述" :rules="[{ required: true, message: '请填写监护人具体描述'}]" />
					
					<van-field v-model="form.abc_ex276" name="abc_ex276" maxlength="100" label="受监护侵害和虐待情况" placeholder="受监护侵害和虐待情况" />
					
					<van-field v-model="form.abc_ex277" name="abc_ex277" label="其他情况(父亲)" placeholder="请选择其他情况(父亲)" @click="showPickerN28 = true" />
					<van-popup v-model="showPickerN28" position="bottom">
						<van-picker show-toolbar :columns="columnsN16" @confirm="onConfirmN1($event,'abc_ex277','showPickerN28')" @cancel="showPickerN28 = false"></van-picker>
					</van-popup>
					
					<van-field v-if="form.abc_ex277 == '其他'" v-model="form.abc_ex64" required name="abc_ex64" label="其他情况(父亲)描述" placeholder="其他情况(父亲)描述" :rules="[{ required: true, message: '请填写其他情况(父亲)描述'}]" />
					
					
					<van-field v-model="form.abc_ex279" name="abc_ex279" label="其他情况(母亲)" placeholder="请选择其他情况(母亲)" @click="showPickerN29 = true" />
					<van-popup v-model="showPickerN29" position="bottom">
						<van-picker show-toolbar :columns="columnsN16" @confirm="onConfirmN1($event,'abc_ex279','showPickerN29')" @cancel="showPickerN29 = false"></van-picker>
					</van-popup>
					
					<van-field v-if="form.abc_ex279 == '其他'" v-model="form.abc_ex77" required name="abc_ex77" label="其他情况(母亲)描述" placeholder="其他情况(母亲)描述" :rules="[{ required: true, message: '请填写其他情况(母亲)描述'}]" />
					
					<van-field v-model="form.abc_ex281" name="abc_ex281" label="父亲有无特殊情况" placeholder="请选择父亲有无特殊情况" @click="showPickerN30 = true" />
					<van-popup v-model="showPickerN30" position="bottom">
						<van-picker show-toolbar :columns="columnsN17" @confirm="onConfirmN1($event,'abc_ex281','showPickerN30')" @cancel="showPickerN30 = false"></van-picker>
					</van-popup>
					
					<van-field v-model="form.abc_ex282" name="abc_ex282" label="母亲有无特殊情况" placeholder="请选择母亲有无特殊情况" @click="showPickerN31 = true" />
					<van-popup v-model="showPickerN31" position="bottom">
						<van-picker show-toolbar :columns="columnsN17" @confirm="onConfirmN1($event,'abc_ex282','showPickerN31')" @cancel="showPickerN31 = false"></van-picker>
					</van-popup>
					
					<van-field v-model="form.abc_ex278" name="abc_ex278" maxlength="100" label="其他需要说明的情况" placeholder="其他需要说明的情况"  />
					
					<div style="width: 100%;position: fixed;bottom: 0px;text-align: center;display: flex;justify-content: space-around">
						<van-button block native-type="button" @click="back3">上一步</van-button>
						<van-button block type="info" native-type="button" @click="next3">下一步</van-button>
					</div>
				</van-form>
			</div>
			
			<div id="page4" v-show="page4" class="page4Div1">

				<div class="page4Div2">
					<div class="page4Div2Font">困境儿童身份证明材料:</div>
					<div style="margin-top:10px;">
						<div id="zmcl" style="position:relative;width:91%;float: left;">
							<van-uploader v-model="fileList" :before-read="beforeRead" :after-read="uploadImg(1)" :before-delete="beforeDelete('abc_ex206')" />
						</div>
					</div>
				</div>
				
				<div class="page4Div2">
					<div class="page4Div2Font">父母证明材料:</div>
					<div style="margin-top:10px;">
						<div id="zmcl" style="position:relative;width:91%;float: left;">
							<van-uploader v-model="fileList2" :before-read="beforeRead" :after-read="uploadImg(2)" :before-delete="beforeDelete('abc_ex225')" />
						</div>
					</div>
				</div>
				
				<div class="page4Div2">
					<div class="page4Div2Font">其他证明材料(如儿童情况,监护人情况):</div>
					<div style="margin-top:10px;">
						<div id="zmcl" style="position:relative;width:91%;float: left;">
							<van-uploader v-model="fileList5" :before-read="beforeRead" :after-read="uploadImg(5)" :before-delete="beforeDelete('abc_ex207')" />
						</div>
					</div>
				</div>
				<!-- 核查结果 -->

				<div class="page4Div3">
					<div class="page4Div4">
						<span class="page4Div4Span1"></span>
						<span style="color: #00AAFF;">核查结果(不属实将自动生成诚信记录)</span>
					</div>
					<van-form style="margin-top: 20px;">

						<van-field required readonly clickable name="abc_ex280" :value="form.abc_ex280" label="情况是否属实"
							placeholder="点击选择情况是否属实" @click="showPicker61 = true" />
						<van-popup v-model="showPicker61" position="bottom">
							<van-picker show-toolbar :columns="columns16" @confirm="onConfirm61"
								@cancel="showPicker61 = false" />
						</van-popup>
						<van-field disabled value="核对人人以' , '分隔(如 张三,李四 )"></van-field>
						<!-- <van-field v-model="form.ab_ex569" name="ab_ex569" label="村(居)调查员" placeholder="村(居)调查员" required :rules="[{ required: true, message: '请填写村(居)调查员' }]" />
						<van-field v-model="form.ab_ex570" name="ab_ex570" label="乡镇(街道)调查员" placeholder="乡镇(街道)调查员" required :rules="[{ required: true, message: '请填写乡镇(街道)调查员' }]" />-->
						<van-field v-model="form.abc_ex209" name="abc_ex209" label="上门核对人" placeholder="上门核对人" required :rules="[{ required: true, message: '请填写上门核对人' }]" />
						
						<van-field v-model="form.abc_dat11" readonly required clickable name="abc_dat11" label="调查时间" placeholder="请选择调查时间" @click="showPickerN32 = true" />
						<van-popup v-model="showPickerN32" position="bottom">
							<van-datetime-picker v-model="currentDate5" type="date" @confirm="onConfirmN2($event,'abc_dat11','showPickerN32')" @cancel="showPickerN32 = false" />
						</van-popup>
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
	import {tszfValidate,tszfFilter,tszfFilter2,getSex,isCardID,xzqh,nation,compressImg} from '@/utils/utils.js'
	import html2canvas from "html2canvas"
	export default {
		data() {
			return {
				typelx: this.$route.query.type,
				sslbDisabled1:false,
				sslbDisabled2:false,
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
				currentDate: new Date(),
				currentDate2: new Date(),
				currentDate3: new Date(),
				currentDate4: new Date(),
				currentDate5: new Date(),
				// 性别显示
				showPickerN1:false,
				// 民族
				showPickerN2:false,
				showPickerN3:false,
				showPickerN4:false,
				showPickerN5:false,
				showPickerN6:false,
				showPickerN7:false,
				showPickerN8:false,
				showPickerN9:false,
				showPickerN10:false,
				showPickerN11:false,
				showPickerN12:false,
				showPickerN13:false,
				showPickerN14:false,
				showPickerN15:false,
				showPickerN16:false,
				showPickerN17:false,
				showPickerN18:false,
				showPickerN19:false,
				showPickerN20:false,
				showPickerN21:false,
				showPickerN22:false,
				showPickerN23:false,
				showPickerN24:false,
				showPickerN25:false,
				showPickerN26:false,
				showPickerN27:false,
				showPickerN28:false,
				showPickerN29:false,
				showPickerN30:false,
				showPickerN31:false,
				showPickerN32:false,
				showPickerN33:false,
				// 家庭主要成员
				abc_ex244:[],
				fileList: [],
				fileList2: [],
				fileList3: [],
				fileList4: [],
				fileList5: [],
				// ab_ex158:[],
				abc_ex283: [],
				showPicker61: false,
				abc_ex230: [], //复选保存后转字符串
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
				columnsN1: ['融洽', '有矛盾','很少联系'],
				columnsN2: ['健康', '残疾','患病'],
				columnsN3: ['视力残疾', '肢体残疾','智力残疾','精神残疾'],
				columnsN4: ['一级', '二级','三级','四级'],
				columnsN5: ['未入学', '学前班','小学','初中','高中','职高','中专','大学本科','不在校'],
				columnsN6: ['从未就业', '就业后自愿失业','就业后非自愿失业','其他'],
				columnsN7: ['', '曾行政处罚','曾劳动教养','曾刑事处罚'],
				columnsN8: ['组合家庭', '单亲家庭','未婚单亲家庭','正常家庭','其他'],
				columnsN9: ['农村自建房','租房','购买商品房','其他'],
				columnsN10: ['健康', '残疾','患病','死亡','宣告死亡','失踪','宣告失踪'],
				columnsN11: ['','城市低保','农村低保','重残无业','其他'],
				columnsN12: ['','城市低保','农村低保','重残无业','孤儿','五保','其他'],
				columnsN13: ['溺爱型','冷漠型','粗暴型','朋友型','专制型'],
				columnsN14: ['正常监护','无力监护','监护缺失','隔代照料','其他'],
				columnsN15: ['正常','父母一方缺失','父母双方缺失'],
				columnsN16: ['','失踪','宣告失踪','召婿','长期无法联系','其他'],
				columnsN17: ['','社会矫正','强制戒毒', '服刑在押','流浪乞讨','有严重不良嗜好'],
				columns2: ['男', '女'],
				columns3: nation,
				columns16: ['属实', '不属实', '转其他救助'],
				columns22: ['是', '否'],

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
				this.form.abc_ex6 = this.form.abc_ex6.replace(/\s*/g,"")
				let tszf = tszfValidate(this.form.abc_ex6)
				if(tszf){
					this.$toast.fail("请输入正确的姓名")
					return false
				}
				// 判断身份证是否合法
				let msg = isCardID(this.form.abc_ex7)
				if (msg) {
					this.$toast.fail(msg)
					return false
				}
				// 过滤户籍住址特殊字符和空格
				this.form.abc_ex13 = this.form.abc_ex13.replace(/\s*/g,"")
				this.form.abc_ex13 = tszfFilter(this.form.abc_ex13)
				// 过滤现住址特殊字符和空格
				this.form.abc_ex14 = this.form.abc_ex14.replace(/\s*/g,"")
				this.form.abc_ex14 = tszfFilter(this.form.abc_ex14)
				// 验证联系电话
				let myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
				if (!myreg.test(this.form.abc_ex190)) {
					this.$toast.fail('请填写正确的联系电话')
					return false
				}
				// 过滤开户银行特殊字符和空格
				this.form.abc_ex192 = this.form.abc_ex192.replace(/\s*/g,"")
				this.form.abc_ex192 = tszfFilter(this.form.abc_ex192)
				// 过滤开户人特殊字符和空格
				this.form.abc_ex193 = this.form.abc_ex193.replace(/\s*/g,"")
				this.form.abc_ex193 = tszfFilter(this.form.abc_ex193)
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
				
				// document.getElementsByClassName('dbjz')[0].scrollTop = 0
				// this.page1 = false
				// this.page2 = true
				// this.isShow = false
				// this.isShow2 = true
			},
			
			
			
			next2() {
				// let next2f = async ()=>{
					
				// 	if(await this.familyValidate() && await this.family2Validate() && await this.family3Validate() && await this.family4Validate() ){
				// 		this.page2 = false
				// 		this.page3 = true
				// 		this.isShow2 = false
				// 		this.isShow3 = true
				// 		document.getElementsByClassName('dbjz')[0].scrollTop = 0
				// 	}
				// }
				// next2f()
				// 过滤父亲姓名描述特殊字符和空格
				this.form.abc_ex42 = this.form.abc_ex42.replace(/\s*/g,"")
				this.form.abc_ex42 = tszfFilter(this.form.abc_ex42)
				// 过滤父亲职业描述特殊字符和空格
				this.form.abc_ex253 = this.form.abc_ex253.replace(/\s*/g,"")
				this.form.abc_ex253 = tszfFilter2(this.form.abc_ex253)
				// 过滤父亲就业地点特殊字符和空格
				this.form.abc_ex254 = this.form.abc_ex254.replace(/\s*/g,"")
				this.form.abc_ex254 = tszfFilter(this.form.abc_ex254)
				// 过滤母亲姓名特殊字符和空格
				this.form.abc_ex47 = this.form.abc_ex47.replace(/\s*/g,"")
				this.form.abc_ex47 = tszfFilter(this.form.abc_ex47)
				// 过滤母亲职业描述特殊字符和空格
				this.form.abc_ex255 = this.form.abc_ex255.replace(/\s*/g,"")
				this.form.abc_ex255 = tszfFilter2(this.form.abc_ex255)
				// 过滤母亲就业地点特殊字符和空格
				this.form.abc_ex256 = this.form.abc_ex256.replace(/\s*/g,"")
				this.form.abc_ex256 = tszfFilter(this.form.abc_ex256)
				
				// 过滤家庭月收入描述特殊字符和空格
				this.form.abc_ex260 = this.form.abc_ex260.replace(/\s*/g,"")
				this.form.abc_ex260 = tszfFilter2(this.form.abc_ex260)
				this.$refs.rule2.validate().then(()=>{
					
					if(Number(this.form.abc_ex245)>10){
						this.$toast.fail("哥哥个数不能超过10")
						return false
					}
					else if(Number(this.form.abc_ex246)>10){
						this.$toast.fail("弟弟个数不能超过10")
						return false
					}
					else if(Number(this.form.abc_ex247)>10){
						this.$toast.fail("姐姐个数不能超过10")
						return false
					}
					else if(Number(this.form.abc_ex248)>10){
						this.$toast.fail("妹妹个数不能超过10")
						return false
					}
					else if(Number(this.form.abc_ex251)>50){
						this.$toast.fail("家庭成员数量不能超过50")
						return false
					}
					else if(Number(this.form.abc_ex252)>10){
						this.$toast.fail("兄弟姐妹数量不能超过40")
						return false
					}
					else if(Number(this.form.abc_ex258)>300){
						this.$toast.fail("住房面积不能超过300")
						return false
					}
					else if(Number(this.form.abc_ex259)>10){
						this.$toast.fail("住房套数不能超过10")
						return false
					}
					else{
						this.page2 = false
						this.page3 = true
						this.isShow2 = false
						this.isShow3 = true
						document.getElementsByClassName('dbjz')[0].scrollTop = 0
					}
					
				}).catch(err=>{
					this.$toast.fail(err[0].message)
				})
				
			},
			next3() {
				// 过滤监护状况具体描述特殊字符和空格
				this.form.abc_ex273 = this.form.abc_ex273.replace(/\s*/g,"")
				this.form.abc_ex273 = tszfFilter2(this.form.abc_ex273)
				// 过滤监护人具体描述特殊字符和空格
				this.form.abc_ex275 = this.form.abc_ex275.replace(/\s*/g,"")
				this.form.abc_ex275 = tszfFilter2(this.form.abc_ex275)
				// 过滤受监护侵害和虐待情况特殊字符和空格
				this.form.abc_ex276 = this.form.abc_ex276.replace(/\s*/g,"")
				this.form.abc_ex276 = tszfFilter2(this.form.abc_ex276)
				// 过滤其他需要说明的情况特殊字符和空格
				this.form.abc_ex278 = this.form.abc_ex278.replace(/\s*/g,"")
				this.form.abc_ex278 = tszfFilter2(this.form.abc_ex278)
				
				this.$refs.rule3.validate().then(()=>{
					this.page3 = false
					this.page4 = true
					this.isShow3 = false
					this.isShow4 = true
					document.getElementsByClassName('dbjz')[0].scrollTop = 0
				}).catch(err=>{
					this.$toast.fail(err[0].message)
				})
			},
			// next4() {
			// 	if(this.form.ab_ex166 && this.form.ab_ex166.split(',').length >=2 && this.form.ab_ex167 && this.form.ab_ex167.split(',').length >=2){
			// 		this.page4 = false
			// 		this.page5 = true
			// 		this.isShow4 = false
			// 		this.isShow5 = true
			// 		document.getElementsByClassName('dbjz')[0].scrollTop = 0
			// 	}else if(!this.form.ab_ex166 && !this.form.ab_ex167){
			// 		this.page4 = false
			// 		this.page5 = true
			// 		this.isShow4 = false
			// 		this.isShow5 = true
			// 		document.getElementsByClassName('dbjz')[0].scrollTop = 0
			// 	}else{
			// 		this.$toast.fail('请上传两张房屋整体和室内照片')
			// 	}
			// },
			// next5() {
			// 	let toast =this.$toast.loading({
			// 		message:'加载中...',
			// 		forbidClick:true,
			// 		duration:0,
			// 	})
			// 	setTimeout(()=>{
			// 		html2canvas(this.$refs.imageWrapper).then(canvas => {
			// 		let dataURL = canvas.toDataURL("image/png");
			// 		this.canvasImg = dataURL;
			// 		this.$set(this.fileList3,0,{
			// 			url: this.canvasImg,
			// 			isImage: true
			// 		})
					
			// 		// 授权书页面转成图片后上传
			// 		const param = new FormData()
			// 		let blob = this.dataURLtoFile(dataURL, 'image/jpeg');
			// 		param.append('file', blob)
			// 		request({
			// 			method: 'post',
			// 			url: '/social/weixinMinios/fileUpload',
			// 			data: param,
			// 		}).then(res => {
			// 			this.page5 = false
			// 			this.page6 = true
			// 			this.isShow5 = false
			// 			this.isShow6 = true
			// 			document.getElementsByClassName('dbjz')[0].scrollTop = 0
			// 			console.log(res)
			// 			this.form.ab_ex73 = res[0].filename
			// 			toast.clear()
			// 		}).catch(erro => {
			// 			console.log(erro)
			// 		})
			// 	});
			// 	},100)
			// },

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
				this.form.abc_ex3 = area[2]
				this.form.abc_ex2 = area[1]
				this.form.abc_ex1 = area[0]
				this.form.abc_ex234_2 = area.join('/');
				this.form.abc_ex234 = area2.join(',');
				// 更改家庭住址
				// if (this.form.ab_ex11 == '') {
				// 	this.form.ab_ex11 = area[0] + area[1] + area[2];
				// }
				if (this.form.abc_ex13 == '') {
					this.form.abc_ex13 = area[0] + area[1] + area[2];
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
						// 困境儿童身份材料
						if (this.form.abc_ex206) {
							this.form.abc_ex206 = this.form.abc_ex206.concat(',', res[0].filename)
						} else {
							this.form.abc_ex206 = this.form.abc_ex206.concat(res[0].filename)
						}
					}else if (num == 2) {
						// 父母证明材料
						if (this.form.abc_ex225) {
							this.form.abc_ex225 = this.form.abc_ex225.concat(',', res[0].filename)
						} else {
							this.form.abc_ex225 = this.form.abc_ex225.concat(res[0].filename)
						}
					}else if (num == 5) {
						// 其他证明材料
						if (this.form.abc_ex207) {
							this.form.abc_ex207 = this.form.abc_ex207.concat(',', res[0].filename)
						} else {
							this.form.abc_ex207 = this.form.abc_ex207.concat(res[0].filename)
						}
					}
				}).catch(erro => {
					file.status = 'failed';
					file.message = '上传失败';
					if(num == 1){
						this.fileList.pop()
					}else if(num == 2){
						this.fileList2.pop()
					}else if(num == 5){
						this.fileList5.pop()
					}
					this.$toast.fail('上传失败')
					console.log(erro)
				})
			},
			uploadImg(num) {
				return file => {
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
			// 性别
			onConfirmN1(value,itemval1,itemval2){
				this.form[itemval1] = value
				this[itemval2] = false
			},
			onConfirmN2(date,item,item2) {
				let YY = date.getFullYear() + '-';
				let MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				let DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
				this.form[item] = YY + MM + DD
				this[item2] = false;
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
				this.form.abc_ex280 = value;
				this.showPicker61 = false;
			},
			// 根据家庭主要成员判断是否独生子女，显示部分输入框/选项
			changeJtcy(value){
				console.log(value)
				if(value.indexOf('父亲') == -1){
					this.form.abc_ex42 = ''
					this.form.abc_ex253 = ''
					this.form.abc_ex254 = ''
					this.form.abc_ex52 = ''
					this.form.abc_ex261 = ''
					this.form.abc_ex262 = ''
					this.form.abc_ex263 = ''
					this.form.abc_ex264 = ''
					this.form.abc_ex265 = ''
				}
				if(value.indexOf('母亲') == -1){
					this.form.abc_ex47 = ''
					this.form.abc_ex255 = ''
					this.form.abc_ex256 = ''
					this.form.abc_ex65 = ''
					this.form.abc_ex266 = ''
					this.form.abc_ex267 = ''
					this.form.abc_ex268 = ''
					this.form.abc_ex269 = ''
					this.form.abc_ex270 = ''
				}
				if(value.indexOf('哥哥') == -1){
					this.form.abc_ex245 = ''
				}
				if(value.indexOf('弟弟') == -1){
					this.form.abc_ex246 = ''
				}
				if(value.indexOf('姐姐') == -1){
					this.form.abc_ex247 = ''
				}
				if(value.indexOf('妹妹') == -1){
					this.form.abc_ex248 = ''
				}
				// this.form.abc_ex252 = this.form.abc_ex245 + this.form.abc_ex246 + this.form.abc_ex247 + this.form.abc_ex248
				if(value.indexOf('哥哥') == -1 && value.indexOf('弟弟') == -1 && value.indexOf('姐姐') == -1 && value.indexOf('妹妹') == -1){
					this.form.abc_ex252 = ''
					this.form.abc_ex250 = '是'	// 是否独生子女
				}else{
					this.form.abc_ex250 = '否'	// 是否独生子女
				}
				// this.changeNum()
			},
			// 兄弟姐妹个数
			changeNum(value){
				this.form.abc_ex252 = Number(this.form.abc_ex245) + Number(this.form.abc_ex246) + Number(this.form.abc_ex247) + Number(this.form.abc_ex248)
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
			getBasic() {
				// 获取基础数据
				request({
					method: 'post',
					url: '/social/assistanceWeixin/getkjBasic',
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
					if (json.abc_ex230) {
						this.abc_ex230 = json.abc_ex230.split(',')
					} 
					// 家庭主要成员
					if(json.abc_ex244){
						this.abc_ex244 = json.abc_ex244.split(',')
					}
					// 开户人
					if (json.abc_ex193 == "") {
						this.form.abc_ex193 = json.abc_ex6
					}
					// 原申请类别
					// if(json.ab_ex158){
					// 	this.ab_ex158 = json.ab_ex158.split(',')
					// }
					// 属实类别
					if(json.abc_ex283){
						this.abc_ex283 = json.abc_ex283.split(',')
						this.sslbChange(this.abc_ex283)
					}
					
					// 儿童身份证明材料
					if (json.abc_ex206) {
						let imgs = json.abc_ex206.split(",");
						imgs.forEach((value,index)=>{
							this.imageView(value).then(res=>{
								// 这个从正确的进来
								this.fileList.push({
									url: res,
									isImage: true
								})
							}).catch(res=>{
								console.log(res)
							})
						})
					}
					// 监护人身份证明材料
					if (json.abc_ex225) {
						let imgs = json.abc_ex225.split(",");
						imgs.forEach((value,index)=>{
							this.imageView(value).then(res=>{
								// 这个从正确的进来
								this.fileList2.push({
									url: res,
									isImage: true
								})
							}).catch(res=>{
								console.log(res)
							})
						})
					}
					// 其他证明材料
					if (json.abc_ex207) {
						let imgs = json.abc_ex207.split(",");
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
					// 行政区划
					if (this.$route.query.sId) {
						if (json.abc_ex1 != "" && json.abc_ex2 != "" && json.abc_ex3 != "") {
							this.form.abc_ex234_2 = json.abc_ex1 + '/' + json.abc_ex2 + '/' + json.abc_ex3
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

					if (json.abc_ex192 == "") {
						this.form.abc_ex192 = '泰兴农商行';
					}
					// if (json.ab_ex13 == "") {
					// 	// this.form.ab_ex13 = this.$route.query.type
					// 	this.form.ab_ex15 = '委托确认'
					// 	this.form.ab_ex100 = 'Y'
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
					this.$toast.fail('困境儿童身份证明材料不能为空')
					return false
				}
				if(this.fileList2.length == 0){
					this.$toast.fail('父母情况证明材料不能为空')
					return false
				}
				if(this.fileList5.length == 0){
					this.$toast.fail('其他证明材料不能为空')
					return false
				}
				if(!this.form.abc_ex280){
					this.$toast.fail('请选择情况是否属实')
					return false
				}
				if(!this.form.abc_ex209){
					this.$toast.fail('请填写上门核对人')
					return false
				}
				if(this.form.abc_ex209 && (this.form.abc_ex209.split(',').length<2 && this.form.abc_ex209.split('，').length<2)){
					this.$toast.fail('上门核对人数不能少于两人')
					return false
				}
				
				
				// 过滤上门核对人特殊字符和空格
				this.form.abc_ex209 = this.form.abc_ex209.replace(/\s*/g,"")
				this.form.abc_ex209 = tszfFilter2(this.form.abc_ex209)
				
				// if(!this.form.ab_ex80){
				// 	this.$toast.fail('请填写备注')
				// 	return false
				// }
				// this.form.ab_ex17 = '泰州市姜堰区社会救助综合平台'
				
				// 直接赋值困境儿童
				// this.form.ab_ex158 = '困境儿童'
				
				this.form.abc_ex230 = this.abc_ex230.join()
				this.form.stype = this.$route.query.type
				// if(this.ab_ex158.length>0){
				// 	this.form.ab_ex158 = this.ab_ex158.join(',')
				// }
				if(this.abc_ex283.length>0){
					this.form.abc_ex283 = this.abc_ex283.join(',')
				}
				if(this.abc_ex244.length>0){
					this.form.abc_ex244 = this.abc_ex244.join(',')
				}
				let memeber = []
				let warning2 = []
				this.warning.forEach((value,index)=>{
					if(value.aw_ex1 && value.aw_dat1){
						warning2.push(value)
					}
				})
				request({
					method: 'post',
					url: '/social/assistanceWeixin/saveBasic',
					data: {
						'data': '[' + JSON.stringify(this.form) + ']',
						'waring': JSON.stringify(warning2),
						// 'isHc': "Y",
						// 'isCf': 'Y',
						// 'type': '核查'
					},
					headers: {
						'token': sessionStorage.getItem('token')
					}
				}).then(res => {
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
				console.log(isCardID(value))
				console.log(isCardID(value) == '')
				if (isCardID(value) == '') {
					this.form.abc_ex9 = getSex(value)
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
	.page4Div1{
		margin-bottom: 200px;
		/* padding-left: 20px; */
		/* display: none; */
	}
	.page4Div2{
		overflow: auto;
		text-align:left;
		margin-left:4%;
		margin-top: 20px;
		width:80%;
		height:500px;
		font-size:28px;
		color:#545454;
		padding-left:40px;
		padding-right:40px;
		border-radius: 30px;
		border:#aaa solid 1px;
	}
	.page4Div2Font{
		height:80px;
		line-height:80px;
		font-size: 28px;
	}
	.page4Div3{
		font-size:28px;
		padding-left:40px;
		padding-right:40px;
		text-align: left;
	}
	.page4Div4{
		border-bottom:#aaa solid 1px;
		font-size: 28px;
	}
	.page4Div4Span1{
		background-color: #00AAFF;
		display: inline-block;
		width: 10px;
		height: 20px;
	}
</style>

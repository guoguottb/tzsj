<template>
	<div class="dbjz">
		<header>
			<div class="headerHead">
				<div>
					<div :class="{headerF:isShow}">基础信息</div>
				</div>
				<div class="headerRectangle"></div>
				<div>
					<div :class="{headerF:isShow2}">成员情况</div>
				</div>
				<div class="headerRectangle"></div>
				<div>
					<div :class="{headerF:isShow3}">收入支出</div>
				</div>
				<div class="headerRectangle"></div>
				<div>
					<div :class="{headerF:isShow4}">财产情况</div>
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
			<div id="page1" v-show="page1" style="height: 600px; display: block;text-align: left;">
				<div style="padding:10px;background:#eeeeee;height:30px;border-bottom:1px solid #ddd;">
					&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #00AAFF;line-height:30px">基本信息</span>
				</div>

				<van-form @submit="next1">
					<van-field name="ab_ex75" label="申请方式" :rules="[{ required: true, message: '请选择申请方式' }]">
						<template #input>
							<van-radio-group v-model="form.ab_ex75" direction="horizontal">
								<van-radio name="委托代理">代申请</van-radio>
								<van-radio name="本人">本人</van-radio>
							</van-radio-group>
						</template>
					</van-field>
					<van-field v-model="form.ab_ex3" name="ab_ex3" label="姓名" placeholder="姓名"
						:rules="[{ required: true, message: '请填写姓名' }]">
						<!-- <template #button>
							<van-button size="small" type="info" native-type="button">拍照识别</van-button>
						</template> -->
					</van-field>
					<van-field v-model="form.ab_ex7" type="number" name="ab_ex7" label="身份证号" placeholder="身份证号"
						:rules="[{ required: true, message: '请填写身份证号'}]" @input='changeSfz' />

					<van-field v-model="form.ab_ex162_2" center readonly label="行政区划" placeholder="请选择所在行政区划"
						@click="showxzqh = true" :rules="[{ required: true, message: '请选择行政区划' }]">
						<!-- <template #button>
							<van-button size="small" type="info" native-type="button" @click.stop="xzqh">区外</van-button>
						</template> -->
					</van-field>
					<van-popup v-model="showxzqh" round position="bottom">
						<van-cascader v-model="form.ab_ex162_2" title="请选择所在行政区划" :options="options"
							@close="showxzqh = false" @finish="onFinish" />
					</van-popup>
					<van-field v-model="form.ab_ex4" name="ab_ex4" label="户籍地址" placeholder="户籍地址"
						:rules="[{ required: true, message: '请填写户籍地址' }]" />
					<van-field v-model="form.ab_ex11" name="ab_ex11" label="家庭住址" placeholder="家庭住址"
						:rules="[{ required: true, message: '请填写家庭住址' }]" />
					<van-field v-model="form.ab_ex5" name="ab_ex5" label="家庭人口" placeholder="家庭人口"
						:rules="[{ required: true, message: '请填写家庭人口' }]" type="number" />
					<van-field name="ab_ex6" label="户籍性质" :rules="[{ required: true, message: '请选择户籍性质' }]">
						<template #input>
							<van-radio-group v-model="form.ab_ex6" direction="horizontal" @change='changeHj'>
								<van-radio name="农业户口">农业户口</van-radio>
								<van-radio name="非农业户口">非农业户口</van-radio>
							</van-radio-group>
						</template>
					</van-field>
					<van-field v-model="form.ab_ex28" center name="ab_ex28" label="联系电话" placeholder="联系电话"
						:rules="[{ required: true, message: '请填写联系电话' }]">
					</van-field>
					<van-field name="ab_ex46" label="原因分类" :rules="[{ required: true, message: '请选择原因分类' }]">
						<template #input>
							<van-checkbox-group v-model="ab_ex46" direction="horizontal">
								<van-checkbox name="疾病" shape="square">疾病</van-checkbox>
								<van-checkbox name="受灾" shape="square">受灾</van-checkbox>
								<van-checkbox name="失业" shape="square">失业</van-checkbox>
								<van-checkbox name="教育" shape="square">教育</van-checkbox>
								<van-checkbox name="住房" shape="square">住房</van-checkbox>
								<van-checkbox name="残疾" shape="square">残疾</van-checkbox>
								<van-checkbox name="缺乏劳动力" shape="square">缺乏劳动力</van-checkbox>
								<van-checkbox name="其他" shape="square">其他</van-checkbox>
							</van-checkbox-group>
						</template>
					</van-field>
					<van-field name="ab_ex41" label="低保类型" :rules="[{ required: true, message: '请选择低保类型' }]">
						<template #input>
							<van-radio-group v-model="form.ab_ex41" direction="horizontal">
								<van-radio name="低收入型低保">低收入型低保</van-radio>
								<van-radio name="残疾人单列户施保">残疾人单列户施保</van-radio>
								<van-radio name="重病型单列户施保">重病型单列户施保</van-radio>
							</van-radio-group>
						</template>
					</van-field>
					<van-field name="ab_ex92" label="是否属于亲属" :rules="[{ required: true, message: '请选择是否属于亲属' }]">
						<template #input>
							<van-radio-group v-model="form.ab_ex92" direction="horizontal">
								<van-radio name="是">是</van-radio>
								<van-radio name="否">否</van-radio>
							</van-radio-group>
						</template>
					</van-field>
					<div style="padding:10px;background:#eeeeee;height:30px;border-bottom:1px solid #ddd;">
						&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #00AAFF;line-height:30px">其他信息</span>
					</div>
					<van-field v-model="form.ab_ex42" name="ab_ex42" label="开户银行" placeholder="开户银行"
						:rules="[{ required: true, message: '请填写开户银行' }]">
						<!-- <template #button>
							<van-button size="small" type="info" native-type="button">拍照识别</van-button>
						</template> -->
					</van-field>
					<van-field v-model="form.ab_ex8" center name="ab_ex8" label="开户人" placeholder="开户人"
						:rules="[{ required: true, message: '请填写开户人' }]">
					</van-field>
					<van-field v-model="form.ab_ex43" center name="ab_ex43" label="银行账号" placeholder="银行账号"
						:rules="[{ required: true, message: '请填写银行账号' }]">
					</van-field>
					<div style="padding:10px;background:#eeeeee;height:30px;border-bottom:1px solid #ddd;">
						&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #00AAFF;line-height:30px">自定义预警</span>
					</div>
					<!-- warning没有showPicker，要自己手动添加 -->
					<van-cell-group v-for="(item,index) in warning" :key='index'>
						<van-field name="message" v-model="item.aw_ex1" rows="2" autosize label="预警内容" type="textarea"
							placeholder="请输入预警内容" />
						<van-field readonly clickable name="time" :value="item.aw_dat1" label="预警时间"
							placeholder="点击选择预警时间" @click="item.showPicker = true" />
						<van-popup v-model="item.showPicker" position="bottom">
							<van-datetime-picker type="date" @confirm="onConfirm($event,index)"
								@cancel="item.showPicker = false" />
						</van-popup>
					</van-cell-group>


					<!-- <van-field name="message2" v-model="warning.message2" rows="2" autosize label="预警内容2"
						type="textarea" placeholder="请输入预警内容" />
					<van-field readonly clickable name="time2" :value="warning.time2" label="预警时间2"
						placeholder="点击选择预警时间" @click="showPicker2 = true" />
					<van-popup v-model="showPicker2" position="bottom">
						<van-datetime-picker type="date" @confirm="onConfirm2" @cancel="showPicker2 = false" />
					</van-popup>

					<van-field name="message3" v-model="warning.message3" rows="2" autosize label="预警内容3"
						type="textarea" placeholder="请输入预警内容" />
					<van-field readonly clickable name="time3" :value="warning.time3" label="预警时间3"
						placeholder="点击选择预警时间" @click="showPicker3 = true" />
					<van-popup v-model="showPicker3" position="bottom">
						<van-datetime-picker type="date" @confirm="onConfirm3" @cancel="showPicker3 = false" />
					</van-popup>

					<van-field name="message4" v-model="warning.message4" rows="2" autosize label="预警内容4"
						type="textarea" placeholder="请输入预警内容" />
					<van-field readonly clickable name="time4" :value="warning.time4" label="预警时间4"
						placeholder="点击选择预警时间" @click="showPicker4 = true" />
					<van-popup v-model="showPicker4" position="bottom">
						<van-datetime-picker type="date" @confirm="onConfirm4" @cancel="showPicker4 = false" />
					</van-popup>

					<van-field name="message5" v-model="warning.message5" rows="2" autosize label="预警内容5"
						type="textarea" placeholder="请输入预警内容" />
					<van-field readonly clickable name="time5" :value="warning.time5" label="预警时间5"
						placeholder="点击选择预警时间" @click="showPicker5 = true" />
					<van-popup v-model="showPicker5" position="bottom">
						<van-datetime-picker type="date" @confirm="onConfirm5" @cancel="showPicker5 = false" />
					</van-popup> -->
					<div style="margin: 16px;display: flex;justify-content: space-around;">
						<van-button round type="info" native-type="button" @click="next1">下一步</van-button>
					</div>
				</van-form>
			</div>

			<div id="page2" v-show="page2" class="stepPage" style="display: block;padding-top: 20px;">
				<div style="font-size:12px;padding-left:20px;padding-right:20px;text-align: left;">
					<div style="border-bottom:#aaa solid 1px;font-size: 16px;">
						<span style="background-color: #00AAFF;display: inline-block;width: 5px;height: 10px;"></span>
						<span style="color: #00AAFF;">共同家庭生活成员情况</span>
					</div>
					<van-form style="margin-top: 20px;">
						<div v-for="(item,index) in family" :key='index'>
							<van-field v-model="item.abm_ex3" name="abm_ex3" label="姓名" placeholder="姓名"
								:rules="[{ required: true, message: '请填写姓名' }]">
								<!-- <template #button>
									<van-button size="small" type="info" native-type="button">拍照识别</van-button>
								</template> -->
							</van-field>

							<van-field readonly clickable name="abm_ex1" :value="item.abm_ex1" label="与户主关系"
								placeholder="点击选择与户主关系" @click="item.showPicker21 = true" />
							<van-popup v-model="item.showPicker21" position="bottom">
								<van-picker show-toolbar :columns="columns" @confirm="onConfirm21($event,item)"
									@cancel="item.showPicker21 = false" />
							</van-popup>

							<van-field v-model="item.abm_ex2" type="number" name="abm_ex2" label="身份证号"
								placeholder="身份证号" :rules="[{ required: true, message: '请填写身份证号'}]" />



							<van-field readonly clickable name="abm_ex5" :value="item.abm_ex5" label="性别"
								placeholder="点击选择性别" @click="item.showPicker22 = true" />
							<van-popup v-model="item.showPicker22" position="bottom">
								<van-picker show-toolbar :columns="columns2" @confirm="onConfirm22($event,item)"
									@cancel="item.showPicker22 = false" />
							</van-popup>

							<van-field readonly clickable name="abm_ex16" :value="item.abm_ex16" label="民族"
								placeholder="点击选择民族" @click="item.showPicker23 = true" />
							<van-popup v-model="item.showPicker23" position="bottom">
								<van-picker show-toolbar :columns="columns3" @confirm="onConfirm23($event,item)"
									@cancel="item.showPicker23 = false" />
							</van-popup>

							<van-field readonly clickable name="abm_ex7" :value="item.abm_ex7" label="户口性质"
								placeholder="点击选择户口性质" @click="item.showPicker24 = true" />
							<van-popup v-model="item.showPicker24" position="bottom">
								<van-picker show-toolbar :columns="columns4" @confirm="onConfirm24($event,item)"
									@cancel="item.showPicker24 = false" />
							</van-popup>

							<van-field readonly clickable name="abm_ex48" :value="item.abm_ex48" label="年龄段"
								placeholder="点击选择年龄段" @click="item.showPicker25 = true" />
							<van-popup v-model="item.showPicker25" position="bottom">
								<van-picker show-toolbar :columns="columns5" @confirm="onConfirm25($event,item)"
									@cancel="item.showPicker25 = false" />
							</van-popup>

							<van-field readonly clickable name="abm_ex28" :value="item.abm_ex28" label="婚姻状况"
								placeholder="点击选择婚姻状况" @click="item.showPicker26 = true" />
							<van-popup v-model="item.showPicker26" position="bottom">
								<van-picker show-toolbar :columns="columns6" @confirm="onConfirm26($event,item)"
									@cancel="item.showPicker26 = false" />
							</van-popup>

							<van-field readonly clickable name="abm_ex11" :value="item.abm_ex11" label="健康状况"
								placeholder="点击选择健康状况" @click="item.showPicker27 = true" />
							<van-popup v-model="item.showPicker27" position="bottom">
								<van-picker show-toolbar :columns="columns7" @confirm="onConfirm27($event,item)"
									@cancel="item.showPicker27 = false" />
							</van-popup>

							<van-field readonly clickable name="abm_ex52" :value="item.abm_ex52" label="重病病种"
								placeholder="点击选择重病病种" @click="item.showPicker28 = true" />
							<van-popup v-model="item.showPicker28" position="bottom">
								<van-picker show-toolbar :columns="columns8" @confirm="onConfirm28($event,item)"
									@cancel="item.showPicker28 = false" />
							</van-popup>

							<van-field readonly clickable name="abm_ex47" :value="item.abm_ex47" label="残疾状况"
								placeholder="点击选择残疾状况" @click="item.showPicker29 = true" />
							<van-popup v-model="item.showPicker29" position="bottom">
								<van-picker show-toolbar :columns="columns9" @confirm="onConfirm29($event,item)"
									@cancel="item.showPicker29 = false" />
							</van-popup>

							<van-field readonly clickable name="abm_ex51" :value="item.abm_ex51" label="特定对象"
								placeholder="点击选择特定对象" @click="item.showPicker213 = true" />
							<van-popup v-model="item.showPicker213" position="bottom">
								<van-picker show-toolbar :columns="columns13" @confirm="onConfirm213($event,item)"
									@cancel="item.showPicker213 = false" />
							</van-popup>

							<van-field readonly clickable name="abm_ex14" :value="item.abm_ex14" label="职业状况"
								placeholder="点击选择职业状况" @click="item.showPicker210 = true" />
							<van-popup v-model="item.showPicker210" position="bottom">
								<van-picker show-toolbar :columns="columns10" @confirm="onConfirm210($event,item)"
									@cancel="item.showPicker210 = false" />
							</van-popup>

							<van-field v-model="item.abm_ex15" name="abm_ex15" label="工作单位" placeholder="工作单位"
								:rules="[{ required: true, message: '请填写工作单位'}]" />
							<van-field v-model="item.abm_ex17" type="number" name="abm_ex17" label="月收入"
								placeholder="月收入" :rules="[{ required: true, message: '请填写月收入'}]" />

							<van-field readonly clickable name="abm_ex8" :value="item.abm_ex8" label="增发类型"
								placeholder="点击选择增发类型" @click="item.showPicker211 = true" />
							<van-popup v-model="item.showPicker211" position="bottom">
								<van-picker show-toolbar :columns="columns11" @confirm="onConfirm211($event,item)"
									@cancel="item.showPicker211 = false" />
							</van-popup>

							<van-field readonly clickable name="abm_ex42" :value="item.abm_ex42" label="是否保障对象"
								placeholder="点击选择是否保障对象" @click="item.showPicker212 = true" />
							<van-popup v-model="item.showPicker212" position="bottom">
								<van-picker show-toolbar :columns="columns12" @confirm="onConfirm212($event,item)"
									@cancel="item.showPicker212 = false" />
							</van-popup>

							<van-field readonly clickable name="resultImg" label="本人签字" placeholder="点击签字"
								@click="item.showPicker214 = true" />
							<van-popup v-model="item.showPicker214" position="bottom" style="text-align: center;">
								<vue-esign ref="esign" :width="800" :height="300" :isCrop='isCrop'
									:lineWidth="lineWidth" :lineColor='lineColor' :bgCol.sync='bgColor' />
								<van-button @click="handleReset(index)">重置</van-button>
								<van-button type="info" @click="handleGenerate(item,index)">完成</van-button>
							</van-popup>
							<van-cell-group style="text-align: center;">
								<van-image v-if="item.resultImg" width="100" height="100" :src="item.resultImg" />
							</van-cell-group>

							<van-button block native-type="button" @click='page2FamilyDelMyself(index)'>删除</van-button>
							<div style="border-bottom: 10px solid #f3f3f3;"> </div>
						</div>
						<div style="display: flex;justify-content: center;">
							<van-button block type="info" native-type="button" @click='page2FamilyDel'>-</van-button>
							<van-button block type="info" native-type="button" @click='page2FamilyAdd'>+</van-button>
						</div>
					</van-form>
				</div>
				<!-- 非共同生活赡抚扶养人信息 -->
				<div style="font-size:12px;padding-left:20px;padding-right:20px;text-align: left;">
					<div style="border-bottom:#aaa solid 1px;font-size: 16px;">
						<span style="background-color: #00AAFF;display: inline-block;width: 5px;height: 10px;"></span>
						<span style="color: #00AAFF;">非共同生活赡抚扶养人信息</span>
					</div>
					<van-form style="margin-top: 20px;">
						<div v-for="(item,index) in family2" :key='index'>
							<van-field v-model="item.abm_ex3" name="abm_ex3" label="姓名" placeholder="姓名"
								:rules="[{ required: true, message: '请填写姓名' }]">
								<!-- <template #button>
									<van-button size="small" type="info" native-type="button">拍照识别</van-button>
								</template> -->
							</van-field>

							<van-field readonly clickable name="abm_ex1" :value="item.abm_ex1" label="与户主关系"
								placeholder="点击选择与户主关系" @click="item.showPicker21 = true" />
							<van-popup v-model="item.showPicker21" position="bottom">
								<van-picker show-toolbar :columns="columns" @confirm="onConfirm21($event,item)"
									@cancel="item.showPicker21 = false" />
							</van-popup>

							<van-field v-model="item.abm_ex2" type="number" name="abm_ex2" label="身份证号"
								placeholder="身份证号" :rules="[{ required: true, message: '请填写身份证号'}]" />



							<van-field readonly clickable name="abm_ex5" :value="item.abm_ex5" label="性别"
								placeholder="点击选择性别" @click="item.showPicker22 = true" />
							<van-popup v-model="item.showPicker22" position="bottom">
								<van-picker show-toolbar :columns="columns2" @confirm="onConfirm22($event,item)"
									@cancel="item.showPicker22 = false" />
							</van-popup>


							<van-field readonly clickable name="abm_ex48" :value="item.abm_ex48" label="年龄段"
								placeholder="点击选择年龄段" @click="item.showPicker25 = true" />
							<van-popup v-model="item.showPicker25" position="bottom">
								<van-picker show-toolbar :columns="columns5" @confirm="onConfirm25($event,item)"
									@cancel="item.showPicker25 = false" />
							</van-popup>

							<van-field readonly clickable name="abm_ex28" :value="item.abm_ex28" label="婚姻状况"
								placeholder="点击选择婚姻状况" @click="item.showPicker26 = true" />
							<van-popup v-model="item.showPicker26" position="bottom">
								<van-picker show-toolbar :columns="columns6" @confirm="onConfirm26($event,item)"
									@cancel="item.showPicker26 = false" />
							</van-popup>

							<van-field readonly clickable name="abm_ex11" :value="item.abm_ex11" label="健康状况"
								placeholder="点击选择健康状况" @click="item.showPicker27 = true" />
							<van-popup v-model="item.showPicker27" position="bottom">
								<van-picker show-toolbar :columns="columns7" @confirm="onConfirm27($event,item)"
									@cancel="item.showPicker27 = false" />
							</van-popup>

							<van-field readonly clickable name="abm_ex47" :value="item.abm_ex47" label="残疾状况"
								placeholder="点击选择残疾状况" @click="item.showPicker29 = true" />
							<van-popup v-model="item.showPicker29" position="bottom">
								<van-picker show-toolbar :columns="columns9" @confirm="onConfirm29($event,item)"
									@cancel="item.showPicker29 = false" />
							</van-popup>

							<van-field readonly clickable name="abm_ex14" :value="item.abm_ex14" label="职业状况"
								placeholder="点击选择职业状况" @click="item.showPicker210 = true" />
							<van-popup v-model="item.showPicker210" position="bottom">
								<van-picker show-toolbar :columns="columns10" @confirm="onConfirm210($event,item)"
									@cancel="item.showPicker210 = false" />
							</van-popup>

							<van-field v-model="item.abm_ex15" name="abm_ex15" label="工作单位" placeholder="工作单位"
								:rules="[{ required: true, message: '请填写工作单位'}]" />
							<van-field v-model="item.abm_ex17" type="number" name="abm_ex17" label="月收入"
								placeholder="月收入" :rules="[{ required: true, message: '请填写月收入'}]"
								@input='change2($event,item)' />
							<van-field v-model="item.abm_ex21" type="number" name="abm_ex21" label="家庭月总收入"
								placeholder="家庭月总收入" :rules="[{ required: true, message: '请填写家庭月总收入'}]" />
							<van-field v-model="item.abm_ex20" type="number" name="abm_ex20" label="家庭总人口"
								placeholder="家庭总人口" :rules="[{ required: true, message: '请填写家庭总人口'}]" />
							<van-field v-model="item.abm_ex18" type="number" name="abm_ex18" label="月赡（扶、抚）养费"
								placeholder="月赡（扶、抚）养费" :rules="[{ required: true, message: '请填写月赡（扶、抚）养费'}]" />

							<van-field readonly clickable name="resultImg" label="本人签字" placeholder="点击签字"
								@click="item.showPicker214 = true" />
							<van-popup v-model="item.showPicker214" position="bottom" style="text-align: center;">
								<vue-esign ref="esign2" :width="800" :height="300" :isCrop='isCrop'
									:lineWidth="lineWidth" :lineColor='lineColor' :bgCol.sync='bgColor' />
								<van-button @click="handleReset2(index)">重置</van-button>
								<van-button type="info" @click="handleGenerate2(item,index)">完成</van-button>
							</van-popup>
							<van-cell-group style="text-align: center;">
								<van-image v-if="item.resultImg" width="100" height="100" :src="item.resultImg" />
							</van-cell-group>

							<van-button block native-type="button" @click='page2FamilyDelMyself2(index)'>删除</van-button>
							<div style="border-bottom: 10px solid #f3f3f3;"> </div>
						</div>
						<div style="display: flex;justify-content: center;">
							<van-button block type="info" native-type="button" @click='page2FamilyDel2'>-</van-button>
							<van-button block type="info" native-type="button" @click='page2FamilyAdd2'>+</van-button>
						</div>
					</van-form>
				</div>

				<div style="margin: 16px;display: flex;justify-content: space-around;">
					<van-button round type="info" native-type="button" @click="back2">上一步</van-button>
					<van-button round type="info" native-type="button" @click="next2">下一步</van-button>
				</div>
			</div>
			<!-- 家庭前12个月总收入情况 -->
			<div id="page3" v-show="page3" class="stepPage" style="display: block;padding-top: 20px;">
				<div style="font-size:12px;padding-left:20px;padding-right:20px;text-align: left;">
					<div style="border-bottom:#aaa solid 1px;font-size: 16px;">
						<span style="background-color: #00AAFF;display: inline-block;width: 5px;height: 10px;"></span>
						<span style="color: #00AAFF;">家庭前12个月总收入情况</span>
					</div>
					<van-form style="margin-top: 20px;">
						<van-field v-model="form.ab_ex29" name="ab_ex29" label="工资性收入" placeholder="工资性收入"
							:rules="[{ required: true, message: '请填写工资性收入' }]" type="number" @input='changeAmt'>
						</van-field>

						<van-field v-model="form.ab_ex30" name="ab_ex30" label="经营净收入" placeholder="经营净收入"
							:rules="[{ required: true, message: '请填写经营净收入' }]" type="number" @input='changeAmt'>
						</van-field>
						<van-field v-model="form.ab_ex31" name="ab_ex31" label="财产净收入" placeholder="财产净收入"
							:rules="[{ required: true, message: '请填写财产净收入' }]" type="number" @input='changeAmt'>
						</van-field>
						<van-field v-model="form.ab_ex32" name="ab_ex32" label="转移净收入" placeholder="转移净收入"
							:rules="[{ required: true, message: '请填写转移净收入' }]" type="number" @input='changeAmt'>
						</van-field>
						<van-field v-model="form.ab_ex33" name="ab_ex33" label="其他收入" placeholder="其他收入"
							:rules="[{ required: true, message: '请填写其他收入' }]" type="number" @input='changeAmt'>
						</van-field>
						<van-field v-model="form.ab_ex58" name="ab_ex58" label="家庭总收入" placeholder="家庭总收入"
							:rules="[{ required: true, message: '请填写家庭总收入' }]" type="number" @input='change'>
						</van-field>
						<van-field v-model="form.ab_ex94" name="ab_ex94" label="家庭月平均收入" placeholder="家庭月平均收入"
							:rules="[{ required: true, message: '请填写家庭月平均收入' }]" type="number">
						</van-field>
						<!-- 应该是方法算出来的不是自己输入的 -->
						<van-field v-model="form.ab_ex94_" name="ab_ex94_" label="家庭月人均收入" placeholder="家庭月人均收入"
							:rules="[{ required: true, message: '请填写家庭月人均收入' }]" type="number">
						</van-field>
						<van-field v-model="form.ab_ex38" name="ab_ex38" label="低保标准" placeholder="低保标准"
							:rules="[{ required: true, message: '请填写低保标准' }]" type="number">
						</van-field>
						<van-field v-model="form.ab_ex40" name="ab_ex40" label="家庭月保障金额" placeholder="家庭月保障金额"
							:rules="[{ required: true, message: '请填写家庭月保障金额' }]" type="number">
						</van-field>

						<div style="border-bottom: 10px solid #f3f3f3;"> </div>
					</van-form>
				</div>
				<div style="margin: 16px;display: flex;justify-content: space-around;">
					<van-button round type="info" native-type="button" @click="back3">上一步</van-button>
					<van-button round type="info" native-type="button" @click="next3">下一步</van-button>
				</div>
			</div>
			<!-- 财产情况 -->
			<div id="page4" v-show="page4" class="stepPage" style="display: block;padding-top: 20px;">

				<div style="font-size:12px;padding-left:20px;padding-right:20px;text-align: left;">
					<div style="border-bottom:#aaa solid 1px;font-size: 16px;">
						<span style="background-color: #00AAFF;display: inline-block;width: 5px;height: 10px;"></span>
						<span style="color: #00AAFF;">金融资产</span>
					</div>
					<van-form style="margin-top: 20px;">
						<van-field v-model="form.ab_ex36" name="ab_ex36" label="银行总存款" placeholder="银行总存款"
							:rules="[{ required: true, message: '请填写银行总存款' }]">
						</van-field>

						<van-field v-model="form.ab_ex60" name="ab_ex60" label="有价证券" placeholder="有价证券"
							:rules="[{ required: true, message: '请填写有价证券' }]">
						</van-field>
						<van-field v-model="form.ab_ex61" name="ab_ex61" label="债权" placeholder="债权"
							:rules="[{ required: true, message: '请填写债权' }]">
						</van-field>
						<van-field v-model="form.ab_ex37" name="ab_ex37" label="其他金融产品" placeholder="其他金融产品"
							:rules="[{ required: true, message: '请填写其他金融产品' }]">
						</van-field>

						<div style="border-bottom: 10px solid #f3f3f3;"> </div>
					</van-form>
				</div>
				<!-- 拥有车船情况 -->
				<div style="font-size:12px;padding-left:20px;padding-right:20px;text-align: left;">
					<div style="border-bottom:#aaa solid 1px;font-size: 16px;">
						<span style="background-color: #00AAFF;display: inline-block;width: 5px;height: 10px;"></span>
						<span style="color: #00AAFF;">拥有车船情况</span>
					</div>
					<van-form style="margin-top: 20px;">
						<div v-for="(item,index) in estate" :key='index'>
							<van-field v-model="item.abe_ex1" name="abe_ex1" label="车(船)主姓名" placeholder="车(船)主姓名"
								:rules="[{ required: true, message: '请填写车(船)主姓名' }]">
							</van-field>
							<van-field v-model="item.abe_ex8" name="abe_ex8" label="车(船)型" placeholder="车(船)型"
								:rules="[{ required: true, message: '请填写车(船)型' }]">
							</van-field>
							<van-field v-model="item.abe_ex9" name="abe_ex9" label="车(船)牌号" placeholder="车(船)牌号"
								:rules="[{ required: true, message: '请填写车(船)牌号' }]">
							</van-field>
							<van-field v-model="item.abe_ex10" name="abe_ex10" label="排气量" placeholder="排气量"
								:rules="[{ required: true, message: '请填写排气量' }]">
							</van-field>
							<van-field v-model="item.abe_ex2" name="abe_ex2" label="购买时间" placeholder="购买时间"
								:rules="[{ required: true, message: '请填写购买时间' }]">
							</van-field>
							<van-field v-model="item.abe_ex4" name="abe_ex4" label="购买金额" placeholder="购买金额"
								:rules="[{ required: true, message: '请填写购买金额' }]">
							</van-field>
							<van-button block native-type="button" @click='page4FamilyDelMyself(index)'>删除</van-button>
							<div style="border-bottom: 10px solid #f3f3f3;"> </div>
						</div>
						<div style="display: flex;justify-content: center;">
							<van-button block type="info" native-type="button" @click='page4FamilyDel'>-</van-button>
							<van-button block type="info" native-type="button" @click='page4FamilyAdd'>+</van-button>
						</div>
					</van-form>
				</div>
				<!-- 拥有房产情况 -->
				<div style="font-size:12px;padding-left:20px;padding-right:20px;text-align: left;">
					<div style="border-bottom:#aaa solid 1px;font-size: 16px;">
						<span style="background-color: #00AAFF;display: inline-block;width: 5px;height: 10px;"></span>
						<span style="color: #00AAFF;">拥有房产情况</span>
					</div>
					<van-form style="margin-top: 20px;">
						<div v-for="(item,index) in estate2" :key='index'>
							<van-field v-model="item.abe_ex1" name="abe_ex1" label="房屋产权人/共有人" placeholder="房屋产权人/共有人"
								:rules="[{ required: true, message: '请填写房屋产权人/共有人' }]">
							</van-field>
							<van-field v-model="item.abe_ex5" name="abe_ex5" label="房屋地址" placeholder="房屋地址"
								:rules="[{ required: true, message: '请填写房屋地址' }]">
							</van-field>
							<van-field v-model="item.abe_ex6" name="abe_ex6" label="建筑面积(平方)" placeholder="建筑面积(平方)"
								:rules="[{ required: true, message: '请填写建筑面积(平方)' }]">
							</van-field>
							<!--  -->
							<van-field readonly clickable name="abe_ex11" :value="item.abe_ex11" label="房屋性质"
								placeholder="点击选择房屋性质" @click="item.showPicker41 = true" />
							<van-popup v-model="item.showPicker41" position="bottom">
								<van-picker show-toolbar :columns="columns14" @confirm="onConfirm41($event,item)"
									@cancel="item.showPicker41 = false" />
							</van-popup>

							<van-field readonly clickable name="abe_ex12" :value="item.abe_ex12" label="房屋来源"
								placeholder="点击选择房屋来源" @click="item.showPicker42 = true" />
							<van-popup v-model="item.showPicker42" position="bottom">
								<van-picker show-toolbar :columns="columns15" @confirm="onConfirm42($event,item)"
									@cancel="item.showPicker42 = false" />
							</van-popup>

							<van-field readonly clickable name="abe_ex2" :value="item.abe_ex2" label="购(建)房时间"
								placeholder="点击选择购(建)房时间" @click="item.showPicker43 = true" />
							<van-popup v-model="item.showPicker43" position="bottom">
								<van-datetime-picker type="date" @confirm="onConfirm43($event,item)"
									@cancel="item.showPicker43 = false" />
							</van-popup>


							<van-button block native-type="button" @click='page4FamilyDelMyself2(index)'>删除</van-button>
							<div style="border-bottom: 10px solid #f3f3f3;"> </div>
						</div>
						<div style="display: flex;justify-content: center;">
							<van-button block type="info" native-type="button" @click='page4FamilyDel2'>-</van-button>
							<van-button block type="info" native-type="button" @click='page4FamilyAdd2'>+</van-button>
						</div>
					</van-form>
				</div>

				<div style="margin: 16px;display: flex;justify-content: space-around;">
					<van-button round type="info" native-type="button" @click="back4">上一步</van-button>
					<van-button round type="info" native-type="button" @click="next4">下一步</van-button>
				</div>
			</div>
			<!-- 授权书 -->

			<div id="page5" v-show="page5" class="stepPage" style="display: block;padding-top: 20px;">
				<div ref="imageWrapper">

					<div style="font-size:12px;padding-left:20px;padding-right:20px;text-align: left;">
						<div style="border-bottom:#aaa solid 1px;font-size: 16px;">
							<!-- <span style="background-color: #00AAFF;display: inline-block;width: 5px;height: 10px;"></span> -->
							<!-- <span style="color: #00AAFF;">授权书</span> -->
						</div>
						<table border="1" id="idNum1" style="width:100%;border-collapse: collapse;">
							<tr>
								<td v-for="(item,index) in form.ab_ex85.split('')">{{item}}</td>
							</tr>
						</table>
						<div style="font-size: 22px;font-weight: 600;text-align: center;margin-bottom:20px;">
							江苏省泰州市姜堰区县居民家庭经济状况核对授权书</div>
						<div style="font-size: 16px;margin-bottom:20px;text-indent: 20px;line-height:25px">为申请 <span
								style="padding-left:5px;padding-right:5px;border-bottom:1px solid #000"
								id="ab_ex13_">{{form.ab_ex13}}</span>（救助项目），本人及家庭成员现就有关事项作出如下授权、承诺：</div>
						<div style="font-size: 16px;text-indent: 20px;">一、<span id="ab_ex3_"
								style="padding-left:5px;padding-right:5px;border-bottom:1px solid #000">{{form.ab_ex3}}</span>具有完全民事行为能力，是我们全家共同推荐的申请人和家庭经济状况核对具体申报经办人，其申请和经办行为代表全家的意愿。
						</div>
						<div style="font-size: 16px;text-indent: 20px;line-height:25px">
							二、本人及家庭成员已了解并愿意遵守江苏省社会救助和核对等有关政策规定，所提供的材料全部真实有效，所申报的家庭收入和财产全部真实完整，如有虚假或瞒报，愿意接受相关部门按照有关规定给予的处罚。
						</div>
						<div style="font-size: 16px;text-indent: 20px;line-height:25px">
							三、本人及家庭成员同意授权县级以上民政部门及其指定的经济状况核对机构对本家庭成员的收入和财产等信息进行核对，包括到公安、人社、住建、国土、交通、工商、税务、公积金等相关部门，以及银行、证券、保险等金融机构进行核对。并自愿接受、配合基层工作人员按规定进行入户调查、民主评议等工作。
						</div>

						<div style="font-size: 16px;text-indent: 20px;line-height:25px">
							四、本授权书自签署之日起生效。如经核对不符合要求，则授权终止；如经核对符合要求，则授权在享受社会救助期间内有效。家庭成员发生变化或再次申请，需重新签署授权书。</div>
						<div style="font-size: 16px;text-indent: 20px;line-height:25px">
							五、本授权书一式三份，一份由家庭保管，一份作为申报资料，一份作为经济状况核对机构核对依据并存档。</div>
						<div style="font-size: 16px;text-indent: 20px;line-height:25px">家庭成员签名、身份证号码和摁指模印：<br><br></div>
					</div>
					<table
						style="margin-top: 10px;widows:100%;width: 100%;border-right:1px solid black;border-bottom:black solid 1px;font-size: 15px;border-collapse: collapse;">
						<colgroup>
							<col>
							<col>
							<col>
							<col>
						</colgroup>
						<tr>
							<td style="border:1px solid #000">同意核对签名</td>
							<td style="border:1px solid #000">与户主关系</td>
							<td style="border:1px solid #000">身份证号码</td>
							<td style="border:1px solid #000">指模印</td>
						</tr>
						<tr>
							<td style="border:1px solid #000">
								<van-image v-if="familyResultImg" width="50" height="50" :src="familyResultImg" />
							</td>
							<td style="border:1px solid #000">户主本人</td>
							<td style="border:1px solid #000">323232525214253658</td>
							<td style="border:1px solid #000"></td>
						</tr>
						<tr>
							<td style="border:1px solid #000">基层经办人签字</td>
							<td style="border:1px solid #000" colspan="3">
								<span v-for="(item,index) in signature">
									<van-image width="50" height="50" :src="item.signatureUrl"
										@click='item.showPicker51 = true' />

									<van-popup v-model="item.showPicker51" position="bottom"
										style="text-align: center;">
										<vue-esign ref="esign3" :width="800" :height="300" :isCrop='isCrop'
											:lineWidth="lineWidth" :lineColor='lineColor' :bgCol.sync='bgColor' />
										<van-button @click="handleReset3(index)">重置</van-button>
										<van-button type="info" @click="handleGenerate3(item,index)">完成</van-button>
									</van-popup>
								</span>
							</td>
						</tr>
					</table>
					<div style="font-size: 16px;font-weight: 600;text-align: center;margin-top:40px;">
						注：无民事行为能力或限制民事行为能力的家庭成员由其法定监护人代签并摁指模印</div>
					<!-- <div style="width:100%;text-align:center;margin-top: 20px;">
					<van-button type="info">重置</van-button>
				</div> -->
				</div>
				<div style="margin: 16px;display: flex;justify-content: space-around;">
					<van-button round type="info" native-type="button" @click="back5">上一步</van-button>
					<van-button round type="info" native-type="button" @click="next5">下一步</van-button>
				</div>
			</div>
			<!-- 身份证 -->

			<div id="page6" v-show="page6" class="stepPage" style="padding-left: 10px; height: 600px; display: none;">
				<div style="font-size:12px;text-align: left;">
					<div style="border-bottom:#aaa solid 1px;font-size: 16px;">
						<span style="background-color: #00AAFF;display: inline-block;width: 5px;height: 10px;"></span>
						<span style="color: #00AAFF;">照片</span>
					</div>
					<div
						style="width:80%;margin-left:3%;height:200px;font-size:16px;color:#545454;padding-left:20px;padding-right:20px;margin-top:10px;border-radius: 15px;border:#aaa solid 1px;">
						<div style="height:40px;line-height:40px">身份证照片:</div>
						<div style="margin-top:10px;">
							<div style="position:relative;width:100%;float: left;">
								<div style="width:40%;height:200px;text-align: center;float: left;margin-left:20px;"
									class="cd-bouncy-nav-trigger">
									<van-uploader v-model="fileList" :max-count="1" :after-read="uploadImg(1)" />

									<br>
									<span>上传身份证正面</span>
								</div>

								<div style="width:40%;height:200px;text-align: center;float: right;margin-right:20px;"
									class="cd-bouncy-nav-trigger">
									<van-uploader v-model="fileList2" :max-count="1" :after-read="uploadImg(2)" />
									<br>
									<span>上传身份证反面</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div style="font-size:12px;text-align: left;margin-top: 50px;">
					<div
						style="width:80%;margin-left:3%;height:200px;font-size:16px;color:#545454;padding-left:20px;padding-right:20px;margin-top:10px;border-radius: 15px;border:#aaa solid 1px;">
						<div style="height:40px;line-height:40px">授权书及民主评议:</div>
						<div style="margin-top:10px;">
							<div style="position:relative;width:100%;float: left;">
								<div style="width:40%;height:200px;text-align: center;float: left;margin-left:20px;"
									class="cd-bouncy-nav-trigger">
									<van-uploader v-model="fileList3" :max-count="1" :after-read="uploadImg(3)" />

									<br>
									<span>上传授权书照片</span>
								</div>

								<div style="width:40%;height:200px;text-align: center;float: right;margin-right:20px;"
									class="cd-bouncy-nav-trigger" id="sfzm2">
									<van-uploader v-model="fileList4" :max-count="1" :after-read="uploadImg(5)" />
									<br>
									<span>民主评议</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div
					style="overflow: auto;margin-left:3%;width:80%;height:250px;font-size:12px;color:#545454;padding-left:20px;padding-right:20px;border-radius: 15px;border:#aaa solid 1px;">

					<div style="height:40px;line-height:40px;font-size: 17px;">其他证明材料:</div>
					<div style="margin-top:10px;">
						<div id="zmcl" style="position:relative;width:91%;float: left;">
							<van-uploader v-model="fileList5" :after-read="uploadImg(4)" />
						</div>
					</div>
				</div>
				<!-- 核查结果 -->

				<div style="font-size:12px;padding-left:20px;padding-right:20px;text-align: left;">
					<div style="border-bottom:#aaa solid 1px;font-size: 16px;">
						<span style="background-color: #00AAFF;display: inline-block;width: 5px;height: 10px;"></span>
						<span style="color: #00AAFF;">核查结果(不属实将自动生成诚信记录)</span>
					</div>
					<van-form style="margin-top: 20px;">

						<van-field readonly clickable name="ab_ex79" :value="form.ab_ex79" label="情况是否属实"
							placeholder="点击选择情况是否属实" @click="showPicker61 = true" />
						<van-popup v-model="showPicker61" position="bottom">
							<van-picker show-toolbar :columns="columns16" @confirm="onConfirm61"
								@cancel="showPicker61 = false" />
						</van-popup>

						<van-field v-model="form.ab_ex78" name="ab_ex78" label="调查人" placeholder="调查人"
							:rules="[{ required: true, message: '请填写调查人' }]">
						</van-field>

						<van-field v-model="form.ab_ex80" name="ab_ex80" label="备注" placeholder="备注"
							:rules="[{ required: true, message: '请填写备注' }]">
						</van-field>
					</van-form>
				</div>
				<div style="margin-top: 20px;display: flex;justify-content: space-around;">
					<van-button type="info" @click="back6">上一步</van-button>
					<van-button type="info" @click="save">提交</van-button>
				</div>
			</div>
		</main>
	</div>
</template>

<script>
	import request from '@/utils/request.js'
	import html2canvas from "html2canvas"
	export default {
		data() {
			return {
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
				ab_ex85_2: '',
				familyResultImg: '', //授权书页面的签字图片（family[0]的签字）
				canvasImg: '', //授权书页面转图片
				signature: [{
						signatureUrl: require('@/assets/img/helpApply/signature.jpg'), //签名图片
						showPicker51: false
					},
					{
						signatureUrl: require('@/assets/img/helpApply/signature.jpg'), //签名图片
						showPicker51: false
					},
					{
						signatureUrl: require('@/assets/img/helpApply/signature.jpg'), //签名图片
						showPicker51: false
					},
					{
						signatureUrl: require('@/assets/img/helpApply/signature.jpg'), //签名图片
						showPicker51: false
					},
					{
						signatureUrl: require('@/assets/img/helpApply/signature.jpg'), //签名图片
						showPicker51: false
					},
				],
				showPicker61: false,
				ab_ex46: '', //复选保存后转字符串
				form: {
					ab_ex75: '',
					ab_ex3: '',
					ab_ex7: '',
					ab_ex162: '',
					ab_ex162_2: '',
					ab_ex4: '',
					ab_ex11: '',
					ab_ex5: '',
					ab_ex6: '',
					ab_ex28: '',
					ab_ex41: '',
					ab_ex92: '',
					ab_ex42: '',
					ab_ex8: '',
					ab_ex43: '',
					ab_ex46: '', //复选保存后转字符串
					ab_ex93: '',
					ab_ex13: [],
					// 材料上传
					ab_ex78: '',
					ab_ex79: '',
					ab_ex80: '',
					// 财产情况金融资产
					ab_ex36: '',
					ab_ex60: '',
					ab_ex61: '',
					ab_ex37: '',
					// 家庭前12个月总收入情况
					ab_ex29: '',
					ab_ex30: '',
					ab_ex31: '',
					ab_ex32: '',
					ab_ex33: '',
					ab_ex58: '',
					ab_ex94: '',
					ab_ex94_: '',
					ab_ex38: '',
					ab_ex40: '',
					resultImg: '',
				},
				// warning: {
				// 	message: '',
				// 	time: '',
				// 	message2: '',
				// 	time2: '',
				// 	message3: '',
				// 	time3: '',
				// 	message4: '',
				// 	time4: '',
				// 	message5: '',
				// 	time5: '',
				// },
				warning: [{
						aw_ex1: '',
						aw_dat1: '',
						showPicker: false
					},
					{
						aw_ex1: '',
						aw_dat1: '',
						showPicker: false
					},
					{
						aw_ex1: '',
						aw_dat1: '',
						showPicker: false
					},
					{
						aw_ex1: '',
						aw_dat1: '',
						showPicker: false
					},
					{
						aw_ex1: '',
						aw_dat1: '',
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
				family: [{
					abm_ex3: '',
					abm_ex1: '',
					showPicker21: false,
					showPicker22: false,
					showPicker23: false,
					showPicker24: false,
					showPicker25: false,
					showPicker26: false,
					showPicker27: false,
					showPicker28: false,
					showPicker29: false,
					showPicker210: false,
					showPicker211: false,
					showPicker212: false,
					showPicker213: false,
					showPicker214: false,
					abm_ex15: '',
					abm_ex17: '',
					abm_ex2: '',
					abm_ex5: '',
					abm_ex16: '',
					abm_ex7: '',
					abm_ex48: '',
					abm_ex28: '',
					abm_ex11: '',
					abm_ex52: '',
					abm_ex47: '',
					abm_ex51: '',
					abm_ex8: '',
					abm_ex42: '',
					abm_ex14: '',
					resultImg: '', //签名图片
				}],
				columns: ['户主本人', '配偶', '子女', '父母', '女婿', '儿媳', '兄弟姐妹', '(外)祖父母', '(外)孙子女', '其他'],
				columns2: ['男', '女'],
				columns3: ['汉族', '壮族', '满族', '回族', '苗族', '维吾尔族', '彝族', '土家族', '蒙古族', '藏族', '布依族', '侗族', '瑶族', '朝鲜族', '白族',
					'哈尼族', '哈萨克族', '黎族', '傣族', '畲族', '傈僳族', '仡佬族', '拉祜族', '高山族', '东乡族', '佤族', '水族', '纳西族', '羌族', '土族',
					'锡伯族', '仫佬族', '柯尔克孜族', '达斡尔族', '景颇族', '傈僳族', '撒拉族', '布朗族', '毛难族', '塔吉克族', '普米族', '阿昌族', '怒族',
					'鄂温克族', '京族', '基诺族', '德昂族', '乌孜别克族', '俄罗斯族', '保安族', '裕固族', '门巴族', '鄂伦春族', '独龙族', '塔塔尔族', '赫哲族',
					'珞巴族', '其他', '外国血统中国籍人士'
				],
				columns4: ['农业户口', '非农业户口'],
				columns5: ['老年人', '未成年人', '成年人'],
				columns6: ['未婚', '已婚', '离异', '丧偶'],
				columns7: ['健康或良好', '一般或较弱', '重病'],
				columns8: ['白血病', '终末期肾病', '恶性肿瘤', '器官移植后抗排异药物治疗', '再生障碍性贫血', '系统性红斑狼疮（活动期或伴有脏器损害）', '血友病', '肝硬化失代偿期',
					'重症类风湿关节炎', '强直性脊柱炎', '糖尿病合并严重并发症（限晚期糖尿病肾病、糖尿病足〈有坏疽、 深部溃疡、脓肿、骨髓炎〉患者）', '艾滋病机会感染', '慢性阻塞性肺疾病', '尘肺',
					'地中海贫血', '克罗恩病', '渐冻人病'
				],
				columns9: ['非残疾', '轻残', '重残'],
				columns10: ['老年人', '未成年人', '在职职工', '灵活就业人员', '登记失业人员', '未登记失业人员', '无就业条件'],
				columns11: ['老年人', '未成年人', '重病', '重残', '独居', '归侨', '退役军人'],
				columns12: ['是', '否'],
				columns13: ['非特定对象', '独居', '归侨', '退役军人'],
				columns14: ['自有私房', '租用公房', '租用私房', '临时搭建房', '借用房', '其他'],
				columns15: ['自购房', '自建房', '回迁房', '承租公房', '其他'],
				columns16: ['属实', '不属实', '转其他救助'],
				family2: [{
					abm_ex3: '',
					abm_ex1: '',
					showPicker21: false,
					showPicker22: false,
					showPicker25: false,
					showPicker26: false,
					showPicker27: false,
					showPicker29: false,
					showPicker210: false,
					showPicker214: false,
					abm_ex15: '',
					abm_ex17: '',
					abm_ex2: '',
					abm_ex5: '',
					abm_ex48: '',
					abm_ex28: '',
					abm_ex11: '',
					abm_ex47: '',
					abm_ex21: '',
					abm_ex20: '',
					abm_ex18: '',
					abm_ex14: '',
					resultImg: '', //签名图片
				}],
				// 家庭前12个月总收入情况
				// familyIncome: {
				// 	ab_ex29: '',
				// 	ab_ex30: '',
				// 	ab_ex31: '',
				// 	ab_ex32: '',
				// 	ab_ex33: '',
				// 	ab_ex58: '',
				// 	ab_ex94: '',
				// 	ab_ex94_: '',
				// 	ab_ex38: '',
				// 	ab_ex40: '',
				// },
				// 财产情况金融资产
				// money: {
				// 	ab_ex36: '',
				// 	ab_ex60: '',
				// 	ab_ex61: '',
				// 	ab_ex37: '',
				// },
				// 财产情况拥有车船情况
				estate: [{
					abe_ex1: '',
					abe_ex8: '',
					abe_ex9: '',
					abe_ex10: '',
					abe_ex2: '',
					abe_ex4: '',
				}],
				estate2: [{
					abe_ex1: '',
					abe_ex5: '',
					abe_ex6: '',
					abe_ex11: '',
					abe_ex12: '',
					abe_ex2: '',
					showPicker41: false,
					showPicker42: false,
					showPicker43: false,
				}],
				// 签名
				lineWidth: 6,
				lineColor: '#000000',
				bgColor: '',
				isCrop: false,

				showPicker51: false,
				// 签名
				// 选项列表，children 代表子选项，支持多级嵌套
				options: [{
					text: '泰兴市',
					value: '#321283000000',
					children: [{
						text: '济川街道',
						value: '#321283001000',
						children: [{
							text: '南殷村',
							value: '#321283001215'
						}, {
							text: '燕头村',
							value: '#321283001207'
						}, {
							text: '房元村',
							value: '#321283001211'
						}, {
							text: '耿戴村',
							value: '#321283001209'
						}, {
							text: '渡河村',
							value: '#321283001212'
						}, {
							text: '王坔村',
							value: '#321283001213'
						}, {
							text: '众贤村',
							value: '#321283001210'
						}, {
							text: '新联村',
							value: '#321283001208'
						}, {
							text: '苏城村',
							value: '#321283001203'
						}, {
							text: '三六村',
							value: '#321283001202'
						}, {
							text: '向阳村',
							value: '#321283001231'
						}, {
							text: '张庄村',
							value: '#321283001229'
						}, {
							text: '郭庄村',
							value: '#321283001230'
						}, {
							text: '兴燕居委会',
							value: '#321283001012'
						}, {
							text: '北站居委会',
							value: '#321283001010'
						}, {
							text: '商井居委会',
							value: '#321283001008'
						}, {
							text: '跃进居委会',
							value: '#321283001009'
						}, {
							text: '文垈居委会',
							value: '#321283001214' //假的
						}, {
							text: '张陈居委会',
							value: '#321283001214'
						}, {
							text: '钱庄居委会',
							value: '#321283001216'
						}],
					}, {
						text: '延令街道',
						value: '#321283002000',
						children: [{
							text: '南郊村',
							value: '#321283001217'
						}, {
							text: '延陵村',
							value: '#321283001218'
						}, {
							text: '大生村',
							value: '#321283001206'
						}, {
							text: '双进村',
							value: '#321283001226　'
						}, {
							text: '陆桥村',
							value: '#321283001200'
						}, {
							text: '三阳村',
							value: '#321283001204'
						}, {
							text: '蔡巷村',
							value: '#321283001205'
						}, {
							text: '蔡桥村',
							value: '#321283123233'
						}, {
							text: '东联居委会',
							value: '#321283001004'
						}, {
							text: '府前居委会',
							value: '#321283001017'
						}, {
							text: '越街居委会',
							value: '#321283001005　'
						}, {
							text: '南街居委会',
							value: '#321283001006'
						}, {
							text: '国庆二村居委会',
							value: '#321283001007'
						}, {
							text: '复兴居委会',
							value: '#321283001013　'
						}, {
							text: '西郊居委会',
							value: '#321283001015'
						}, {
							text: '国庆新村居委会',
							value: '#321283001001'
						}, {
							text: '鼓楼居委会',
							value: '#321283001016'
						}, {
							text: '华泰居委会',
							value: '#321283001003　'
						}, {
							text: '东城居委会',
							value: '#321283001011'
						}, {
							text: '五里墩居委会',
							value: '#321283001018'
						}, {
							text: '周曾居委会',
							value: '#321283001014　'
						}, {
							text: '三营居委会',
							value: '#321283001002'
						}, {
							text: '祥泰居委会',
							value: '#321283001019'
						}, {
							text: '润泰居委会',
							value: '#321283001020'
						}],
					}, {
						text: '黄桥镇',
						value: '#321283100000',
						children: [{
							text: '胜利村',
							value: '#321283100208'
						}, {
							text: '东场村',
							value: '#321283100209'
						}, {
							text: '西寺桥村',
							value: '#321283100211'
						}, {
							text: '直来桥村',
							value: '#321283100210'
						}, {
							text: '站东村',
							value: '#321283100206'
						}, {
							text: '勤丰村',
							value: '#321283100213'
						}, {
							text: '合心村',
							value: '#321283100212'
						}, {
							text: '浩堡村',
							value: '#321283100214'
						}, {
							text: '野屋村',
							value: '#321283100215'
						}, {
							text: '朱何村',
							value: '#321283100207'
						}, {
							text: '封家庄村',
							value: '#321283100216'
						}, {
							text: '前进村',
							value: '#321283100220'
						}, {
							text: '三里村',
							value: '#321283100217'
						}, {
							text: '东闾村',
							value: '#321283100218'
						}, {
							text: '革新村',
							value: '#321283100219'
						}, {
							text: '樊家集村',
							value: '#321283100222'
						}, {
							text: '双桥村',
							value: '#321283100221'
						}, {
							text: '横巷村',
							value: '#321283100255'
						}, {
							text: '太平村',
							value: '#321283100200'
						}, {
							text: '祁巷村',
							value: '#321283100204'
						}, {
							text: '余家庄村',
							value: '#321283100205'
						}, {
							text: '韩庄村',
							value: '#321283100203'
						}, {
							text: '西洋庄村',
							value: '#321283100202'
						}, {
							text: '陈桥村',
							value: '#321283100225'
						}, {
							text: '翁庄村',
							value: '#321283100223'
						}, {
							text: '钱葛村',
							value: '#321283100227'
						}, {
							text: '朱徐村',
							value: '#321283100226'
						}, {
							text: '野向村',
							value: '#321283100232'
						}, {
							text: '吴韩村',
							value: '#321283100231'
						}, {
							text: '江堡村',
							value: '#321283100228'
						}, {
							text: '南殷村',
							value: '#321283100224'
						}, {
							text: '诸马村',
							value: '#321283100229'
						}, {
							text: '金堡村',
							value: '#321283100230'
						}, {
							text: '华庄村',
							value: '#321283100233'
						}, {
							text: '南沙村',
							value: '#321283100256'
						}, {
							text: '新洋村',
							value: '#321283100236'
						}, {
							text: '中盐村',
							value: '#321283100235'
						}, {
							text: '路庄村',
							value: '#321283100234'
						}, {
							text: '唐港村',
							value: '#321283100242'
						}, {
							text: '秦庄村',
							value: '#321283100241'
						}, {
							text: '南垈村',
							value: '#321283100240'
						}, {
							text: '印院村',
							value: '#321283100238'
						}, {
							text: '王庄村',
							value: '#321283100237'
						}, {
							text: '刘陈村',
							value: '#321283100247'
						}, {
							text: '黄坍村',
							value: '#321283100246'
						}, {
							text: '印家院村',
							value: '#321283100250'
						}, {
							text: '大张村',
							value: '#321283100245'
						}, {
							text: '海顾村',
							value: '#321283100244'
						}, {
							text: '东顾村',
							value: '#321283100243'
						}, {
							text: '鞠垛村',
							value: '#321283100251'
						}, {
							text: '严徐村',
							value: '#321283100253'
						}, {
							text: '吴庄村',
							value: '#321283100253' //假的
						}, {
							text: '扬春村',
							value: '#321283100248'
						}, {
							text: '果园村',
							value: '#321283100252'
						}, {
							text: '双联村',
							value: '#321283100249'
						}, {
							text: '南街居委会',
							value: '#321283100004'
						}, {
							text: '北街居委会',
							value: '#321283100008'
						}, {
							text: '米巷居委会',
							value: '#321283100007'
						}, {
							text: '永丰居委会',
							value: '#321283100006'
						}, {
							text: '东进居委会',
							value: '#321283100006' //假的
						}, {
							text: '滨河居委会',
							value: '#321283100006' //假的
						}, {
							text: '金溪居委会',
							value: '#321283100006'//假的
						}, {
							text: '琴韵居委会',
							value: '#321283100006'//假的
						}, {
							text: '银杏居委会',
							value: '#321283100006'//假的
						}, {
							text: '华溪居委会',
							value: '#321283100010'
						}, {
							text: '白庄居委会',
							value: '#321283100012'
						}],
					}, {
						text: '珊瑚镇',
						value: '#321283105000',
						children: [{
							text: '洋港村',
							value: '#321283105200'
						}, {
							text: '曹埠村',
							value: '#321283105201'
						}, {
							text: '祯祥村',
							value: '#321283105202'
						}, {
							text: '顾堡村',
							value: '#321283105203'
						}, {
							text: '左庄村',
							value: '#321283105209'
						}, {
							text: '新桥村',
							value: '#321283105208'
						}, {
							text: '八户村',
							value: '#321283105207'
						}, {
							text: '徐家庄村',
							value: '#321283105205'
						}, {
							text: '八达村',
							value: '#321283105206'
						}, {
							text: '周岱村',
							value: '#321283105204'
						}, {
							text: '二河新村居委会',
							value: '#321283105003'
						}, {
							text: '珊瑚新村居委会',
							value: '#321283105001'
						}, {
							text: '镇前新村居委会',
							value: '#321283105002'
						}],
					}, {
						text: '广陵镇',
						value: '#321283106000',
						children: [{
							text: '新圩村',
							value: '#321283106200'
						}, {
							text: '张拾村',
							value: '#321283106201'
						}, {
							text: '通靖村',
							value: '#321283106202'
						}, {
							text: '季圩村',
							value: '#321283106203'
						}, {
							text: '曹市村',
							value: '#321283106204'
						}, {
							text: '大有村',
							value: '#321283106206'
						}, {
							text: '顾周村',
							value: '#321283106205'
						}, {
							text: '木行村',
							value: '#321283106207'
						}, {
							text: '宁界村',
							value: '#321283106208'
						}, {
							text: '禅师村',
							value: '#321283106214'
						}, {
							text: '龙王村',
							value: '#321283106215'
						}, {
							text: '北肖村',
							value: '#321283106210'
						}, {
							text: '马庄村',
							value: '#321283106211'
						}, {
							text: '联吴村',
							value: '#321283106212'
						}, {
							text: '联匡村',
							value: '#321283106209'
						}, {
							text: '广陵居委会',
							value: '#321283106001'
						}, {
							text: '兴宁居委会',
							value: '#321283106002'
						}],
					}, {
						text: '古溪镇',
						value: '#321283102000',
						children: [{
							text: '皂桥村',
							value: '#321283102216'
						}, {
							text: '东雁岭村',
							value: '#321283102209'
						}, {
							text: '西雁岭村',
							value: '#321283102210'
						}, {
							text: '刁网村',
							value: '#321283102211'
						}, {
							text: '野芹村',
							value: '#321283102212'
						}, {
							text: '钱荡村',
							value: '#321283102213'
						}, {
							text: '谢荡村',
							value: '#321283102214'
						}, {
							text: '塘湾村',
							value: '#321283102215'
						}, {
							text: '周庄村',
							value: '#321283102201'
						}, {
							text: '尹垛村',
							value: '#321283102204'
						}, {
							text: '顾庄村',
							value: '#321283102205'
						}, {
							text: '常桥村',
							value: '#321283102206'
						}, {
							text: '古溪居委会',
							value: '#321283102003'
						}, {
							text: '横垛居委会',
							value: '#321283102002'
						}],
					}, {
						text: '元竹镇',
						value: '#321283104000',
						children: [{
							text: '丁庄村',
							value: '#321283104200'
						}, {
							text: '兴杨村',
							value: '#321283104201'
						}, {
							text: '蒋堡村',
							value: '#321283104209'
						}, {
							text: '申庄村',
							value: '#321283104202'
						}, {
							text: '潘元村',
							value: '#321283104203'
						}, {
							text: '成庄村',
							value: '#321283104204'
						}, {
							text: '野叶村',
							value: '#321283104205'
						}, {
							text: '芮徐村',
							value: '#321283104208'
						}, {
							text: '沿泰村',
							value: '#321283104206'
						}, {
							text: '镇北村',
							value: '#321283104207'
						}, {
							text: '大元居委会',
							value: '#321283104002'
						}, {
							text: '双赵居委会',
							value: '#321283104001'
						}],
					},{
						text: '张桥镇',
						value: '#321283109000',
						children: [{
							text: '汤庄村',
							value: '#321283109200'
						}, {
							text: '匡庄村',
							value: '#321283109201'
						}, {
							text: '常巷村',
							value: '#321283109202'
						}, {
							text: '陈庄村',
							value: '#321283109203'
						}, {
							text: '镇西村',
							value: '#321283109204'
						}, {
							text: '吴榨村',
							value: '#321283109205'
						}, {
							text: '西桥村',
							value: '#321283109207'
						}, {
							text: '东联村',
							value: '#321283109208'
						}, {
							text: '杨庄村',
							value: '#321283109210'
						}, {
							text: '薛庄村',
							value: '#321283109211'
						}, {
							text: '郭桥村',
							value: '#321283109212'
						}, {
							text: '克仁村',
							value: '#321283109213'
						}, {
							text: '刘井村',
							value: '#321283109214'
						}, {
							text: '圩港村',
							value: '#321283109209'
						}, {
							text: '褚陈村',
							value: '#321283109206'
						}, {
							text: '焦堡居委会',
							value: '#321283109002'
						}, {
							text: '焦荡居委会',
							value: '#321283109003'
						}, {
							text: '张桥居委会',
							value: '#321283109001'
						}],
					},{
						text: '曲霞镇',
						value: '#321283108000',
						children: [{
							text: '印达村',
							value: '#321283108200'
						}, {
							text: '戴窑村',
							value: '#321283108206'
						}, {
							text: '安乐村',
							value: '#321283108205'
						}, {
							text: '肖榨村',
							value: '#321283108203'
						}, {
							text: '李圩村',
							value: '#321283108208'
						}, {
							text: '朱圩村',
							value: '#321283108209'
						}, {
							text: '镇西村',
							value: '#321283108210'
						}, {
							text: '丁桥村',
							value: '#321283108204'
						}, {
							text: '曲霞居委会',
							value: '#321283108201'
						}],
					},{
						text: '河失镇',
						value: '#321283112000',
						children: [{
							text: '同心村',
							value: '#321283112217'
						}, {
							text: '元仙村',
							value: '#321283112211'
						}, {
							text: '司马村',
							value: '#321283112212'
						}, {
							text: '洋碾村',
							value: '#321283112215'
						}, {
							text: '沈丁村',
							value: '#321283112216'
						}, {
							text: '三军村',
							value: '#321283112213'
						}, {
							text: '西黄村',
							value: '#321283112214'
						}, {
							text: '夏港村',
							value: '#321283112200'
						}, {
							text: '刘官村',
							value: '#321283112201'
						}, {
							text: '刘桥村',
							value: '#321283112203'
						}, {
							text: '赵杜村',
							value: '#321283112204'
						}, {
							text: '李湾村',
							value: '#321283112202'
						}, {
							text: '西荡村',
							value: '#321283112205'
						}, {
							text: '印荡村',
							value: '#321283112206'
						}, {
							text: '刘庄村',
							value: '#321283112208'
						}, {
							text: '印庄村',
							value: '#321283112207'
						}, {
							text: '常周居委会',
							value: '#321283112001'
						}, {
							text: '河头居委会',
							value: '#321283112002'
						}, {
							text: '失迷巷居委会',
							value: '#321283112003'
						}],
					},{
						text: '新街镇',
						value: '#321283113000',
						children: [{
							text: '南新街村',
							value: '#321283113211'
						}, {
							text: '杏陆村',
							value: '#321283113209'
						}, {
							text: '车马庄村',
							value: '#321283113208'
						}, {
							text: '张吉村',
							value: '#321283113203'
						}, {
							text: '严家堡村',
							value: '#321283113210'
						}, {
							text: '野肖村',
							value: '#321283113202'
						}, {
							text: '管凤村',
							value: '#321283113213'
						}, {
							text: '顾庄寺村',
							value: '#321283113214'
						}, {
							text: '梅家庄村',
							value: '#321283113201'
						}, {
							text: '鞠山村',
							value: '#321283113200'
						}, {
							text: '白马村',
							value: '#321283113207'
						}, {
							text: '金干村',
							value: '#321283113212'
						}, {
							text: '孔叶村',
							value: '#321283113204'
						}, {
							text: '东河村',
							value: '#321283113206'
						}, {
							text: '河西村',
							value: '#321283113205'
						}, {
							text: '东申村',
							value: '#321283113216'
						}, {
							text: '夏徐村',
							value: '#321283113218'
						}, {
							text: '杨芮村',
							value: '#321283113217'
						}, {
							text: '霍庄村',
							value: '#321283113215'
						}, {
							text: '倪浒村',
							value: '#321283113219'
						}, {
							text: '钱南村',
							value: '#321283113220'
						}, {
							text: '新街村',
							value: '#321283113221'
						}, {
							text: '吴岱村',
							value: '#321283113222'
						}, {
							text: '梧桐村',
							value: '#321283113223'
						}, {
							text: '宋福村',
							value: '#321283113227'
						}, {
							text: '叶利村',
							value: '#321283113226'
						}, {
							text: '谢荡村',
							value: '#321283113225'
						}, {
							text: '李荡村',
							value: '#321283113224'
						}],
					},{
						text: '姚王街道',
						value: '#321283114000',
						children: [{
							text: '十里甸村',
							value: '#321283114208'
						}, {
							text: '姚垈村',
							value: '#321283114201'
						}, {
							text: '官沟村',
							value: '#321283114202'
						}, {
							text: '新星村',
							value: '#321283114200'
						}, {
							text: '桑木村',
							value: '#321283114204'
						}, {
							text: '朝阳村',
							value: '#321283114205'
						}, {
							text: '阡垈村',
							value: '#321283114210'
						}, {
							text: '夏家垈村',
							value: '#321283114211'
						}, {
							text: '北殷村',
							value: '#321283114209'
						}, {
							text: '王庄村',
							value: '#321283114203'
						}, {
							text: '石桥村',
							value: '#321283114212'
						}, {
							text: '东林村',
							value: '#321283114215'
						}, {
							text: '王家堡村',
							value: '#321283114216'
						}, {
							text: '鲁堡村',
							value: '#321283114213'
						}, {
							text: '封垈村',
							value: '#321283114217'
						}, {
							text: '毛庄村',
							value: '#321283114214'
						}, {
							text: '新镇居委会',
							value: '#330711'
						}, {
							text: '东阳居委会',
							value: '#321283114001'
						}],
					},{
						text: '宣堡镇',
						value: '#321283115000',
						children: [{
							text: '西宣村',
							value: '#321283115203'
						}, {
							text: '梅埝村',
							value: '#321283115201'
						}, {
							text: '崇头庄村',
							value: '#321283115202'
						}, {
							text: '三堡村',
							value: '#321283115204'
						}, {
							text: '北森庄村',
							value: '#321283115206'
						}, {
							text: '郭寨村',
							value: '#321283115205'
						}, {
							text: '纪沟村',
							value: '#321283115210'
						}, {
							text: '毛群村',
							value: '#321283115207'
						}, {
							text: '联新村',
							value: '#321283115209'
						}, {
							text: '张河村',
							value: '#321283115211'
						}, {
							text: '银杏村',
							value: '#321283115208'
						}, {
							text: '宣堡居委会',
							value: '#321283115200'
						}],
					},{
						text: '分界镇',
						value: '#321283101000',
						children: [{
							text: '张竹村',
							value: '#321283101203'
						}, {
							text: '分界村',
							value: '#321283101210'
						}, {
							text: '开绿村',
							value: '#321283101213'
						}, {
							text: '官庄村',
							value: '#321283101216'
						}, {
							text: '滕兴村',
							value: '#321283101215'
						}, {
							text: '南周村',
							value: '#321283101201'
						}, {
							text: '七贤村',
							value: '#321283101202'
						}, {
							text: '王厂村',
							value: '#321283101206'
						}, {
							text: '耿厂村',
							value: '#321283101207'
						}, {
							text: '湖头村',
							value: '#321283101209'
						}, {
							text: '沿界村',
							value: '#321283101211'
						}, {
							text: '赵庄村',
							value: '#321283101204'
						}, {
							text: '野庙村',
							value: '#321283101205'
						}, {
							text: '长生居委会',
							value: '#321283101002'
						}],
					},{
						text: '滨江镇',
						value: '#321283123000',
						children: [{
							text: '褚港村',
							value: '#321283123209'
						}, {
							text: '龙港村',
							value: '#321283123204'
						}, {
							text: '蒋港村',
							value: '#321283123205'
						}, {
							text: '仁寿村',
							value: '#321283123206'
						}, {
							text: '过船村',
							value: '#321283123207'
						}, {
							text: '长沟村',
							value: '#321283123208'
						}, {
							text: '石桥村',
							value: '#321283123211'
						}, {
							text: '殷石村',
							value: '#321283123210'
						}, {
							text: '中港村',
							value: '#321283123212'
						}, {
							text: '卢碾村',
							value: '#321283123200'
						}, {
							text: '翻身村',
							value: '#321283123203'
						}, {
							text: '天星村',
							value: '#321283123202'
						}, {
							text: '新星村',
							value: '#321283123201'
						}, {
							text: '红旗村',
							value: '#321283123215'
						}, {
							text: '蒋榨村',
							value: '#321283123214'
						}, {
							text: '洋思村',
							value: '#321283123213'
						}, {
							text: '五杨村',
							value: '#321283123216'
						}, {
							text: '三联村',
							value: '#321283123232'
						}, {
							text: '马甸村',
							value: '#321283123224'
						}, {
							text: '中兴村',
							value: '#321283123225'
						}, {
							text: '大马庄村',
							value: '#321283123217'
						}, {
							text: '小马庄村',
							value: '#321283123218'
						}, {
							text: '苏坔村',
							value: '#321283123221'
						}, {
							text: '苏余村',
							value: '#321283123222'
						}, {
							text: '大何庄村',
							value: '#321283123220'
						}, {
							text: '西江村',
							value: '#321283123219'
						}, {
							text: '双彭村',
							value: '#321283123223'
						}, {
							text: '顾阚村',
							value: '#321283123227'
						}, {
							text: '联杨村',
							value: '#321283123226'
						}, {
							text: '永新村',
							value: '#321283123228'
						}, {
							text: '印桥居委会',
							value: '#321283123002'
						}],
					},{
						text: '虹桥镇',
						value: '#321283124000',
						children: [{
							text: '蒋华村',
							value: '#321283124217'
						}, {
							text: '同德村',
							value: '#321283124218'
						}, {
							text: '广福村',
							value: '#321283124220'
						}, {
							text: '三桥村',
							value: '#321283124219'
						}, {
							text: '六圩村',
							value: '#321283124221'
						}, {
							text: '宋桥村',
							value: '#321283124223'
						}, {
							text: '清水村',
							value: '#321283124213'
						}, {
							text: '上元村',
							value: '#321283124216'
						}, {
							text: '新市村',
							value: '#321283124209'
						}, {
							text: '毗芦村',
							value: '#321283124208'
						}, {
							text: '张公村',
							value: '#321283124210'
						}, {
							text: '季桥村',
							value: '#321283124212'
						}, {
							text: '通石村',
							value: '#321283124215'
						}, {
							text: '封祝村',
							value: '#321283124214'
						}, {
							text: '唐港村',
							value: '#321283124211'
						}, {
							text: '崇福村',
							value: '#321283124222'
						}, {
							text: '七圩村',
							value: '#321283124201'
						}, {
							text: '八圩村',
							value: '#321283124202'
						}, {
							text: '九圩村',
							value: '#321283124203'
						}, {
							text: '高圩村',
							value: '#321283124206'
						}, {
							text: '四仙村',
							value: '#321283124207'
						}, {
							text: '公殿村',
							value: '#321283124200'
						}, {
							text: '桃园村',
							value: '#321283124204'
						}, {
							text: '涌兴村',
							value: '#321283124205'
						}, {
							text: '祥福居委会',
							value: '#321283124001'
						}],
					},{
						text: '根思乡',
						value: '#321283200000',
						children: [{
							text: '根思村',
							value: '#321283200211'
						}, {
							text: '李秀河村',
							value: '#321283200213'
						}, {
							text: '南湖村',
							value: '#321283200208'
						}, {
							text: '井坔村',
							value: '#321283200212'
						}, {
							text: '老叶村',
							value: '#321283200203'
						}, {
							text: '鞠顾村',
							value: '#321283200207'
						}, {
							text: '新港村',
							value: '#321283200219'
						}, {
							text: '兴许村',
							value: '#321283200220'
						}, {
							text: '双联村',
							value: '#321283200218'
						}, {
							text: '双港村',
							value: '#321283200217'
						}],
					}],
				}],
			}
		},
		created() {
			this.getBasic()
			this.loadFamily('Y')
			this.loadFamily2("N")
			// this.loadPay()
		},
		methods: {
			next1() {
				this.page1 = false
				this.page2 = true
				this.isShow = false
				this.isShow2 = true
				// 判断身份证是否合法
				// let msg = this.isCardID(this.form.ab_ex7)
				// if (msg) {
				// 	this.$toast.fail(msg)
				// 	return false
				// }

				// // console.log(Object.values(this.form))
				// Object.values(this.form).forEach((val, index) => {
				// 	if (val.length == 0) {
				// 		this.$toast.fail('内容不能为空')
				// 	} else if (index == Object.values(this.form).length - 1 && val.length != 0) {
				// 		this.page1 = false
				// 		this.page2 = true
				// 		this.isShow = false
				// 		this.isShow2 = true
				// 	}
				// })
			},
			next2() {
				this.page2 = false
				this.page3 = true
				this.isShow2 = false
				this.isShow3 = true
				// // 判断身份证是否合法
				// let msg = this.isCardID(this.form.ab_ex7)
				// if (msg) {
				// 	this.$toast.fail(msg)
				// 	return false
				// }

				// // console.log(Object.values(this.form))
				// Object.values(this.form).forEach((val, index) => {
				// 	if (val.length == 0) {
				// 		this.$toast.fail('内容不能为空')
				// 	} else if (index == Object.values(this.form).length - 1 && val.length != 0) {
				// 		this.page2 = false
				// 		this.page3 = true
				// 		this.isShow2 = false
				// 		this.isShow3 = true
				// 	}
				// })
			},
			next3() {
				this.page3 = false
				this.page4 = true
				this.isShow3 = false
				this.isShow4 = true
			},
			next4() {
				this.page4 = false
				this.page5 = true
				this.isShow4 = false
				this.isShow5 = true
			},
			next5() {

				html2canvas(this.$refs.imageWrapper).then(canvas => {
					let dataURL = canvas.toDataURL("image/png");
					this.canvasImg = dataURL;
					// 如果fileList3有值就不用生成新的授权书了
					if(this.fileList3.length == 0){
						this.fileList3.push({
							url: this.canvasImg,
							isImage: true
						})
						// this.form.ab_ex73 = this.canvasImg
						// 授权书页面转成图片后上传
						const param = new FormData()
						let blob = this.dataURLtoFile(dataURL, 'image/jpeg');
						param.append('file', blob)
						request({
							method: 'post',
							url: '/social/weixinMinios/fileUpload',
							data: param,
						}).then(res => {
							console.log(res)
							this.form.ab_ex73 = res[0].filename
						}).catch(erro => {
							console.log(erro)
						})
					}

				});
				this.page5 = false
				this.page6 = true
				this.isShow5 = false
				this.isShow6 = true
			},
			//将base64转换为blob
			dataURLtoFile(dataURI, type) {
				let binary = atob(dataURI.split(',')[1]);
				let array = [];
				for (let i = 0; i < binary.length; i++) {
					array.push(binary.charCodeAt(i));
				}
				return new Blob([new Uint8Array(array)], {
					type: type
				});
			},
			// next6() {
			// 	this.$message.success("提交成功")
			// 	this.$router.go(-1)
			// },

			back2() {
				this.page2 = false,
					this.page1 = true
				this.isShow2 = false,
					this.isShow = true
			},
			back3() {
				this.page3 = false,
					this.page2 = true
				this.isShow3 = false,
					this.isShow2 = true
			},
			back4() {
				this.page4 = false
				this.page3 = true
				this.isShow4 = false
				this.isShow3 = true
			},
			back5() {
				this.page5 = false
				this.page4 = true
				this.isShow5 = false
				this.isShow4 = true
			},
			back6() {
				this.page6 = false
				this.page5 = true
				this.isShow6 = false
				this.isShow5 = true
			},
			// 签字
			handleReset(index) {
				this.$refs.esign[index].reset()
			},
			handleGenerate(item, index) {
				this.$refs.esign[index].generate().then(res => {
					item.resultImg = res
					item.showPicker214 = false
					if (index == 0) {
						// 授权书页面的签字
						this.familyResultImg = res
					}
					console.log(res)
					console.log(this.form)
				}).catch(err => {
					// alert(err) // 画布没有签字时会执行这里 'Not Signned'
				})
			},
			// 签字
			// 签字2
			handleReset2(index) {
				this.$refs.esign2[index].reset()
			},
			handleGenerate2(item, index) {
				this.$refs.esign2[index].generate().then(res => {
					item.resultImg = res
					item.showPicker214 = false
					console.log(res)
				}).catch(err => {
					// alert(err) // 画布没有签字时会执行这里 'Not Signned'
				})
			},
			// 签字2
			// 基层经办人签字
			handleReset3(index) {
				this.$refs.esign3[index].reset()
			},
			handleGenerate3(item, index) {
				this.$refs.esign3[index].generate().then(res => {
					item.signatureUrl = res
					item.showPicker51 = false
					console.log(res)
				}).catch(err => {
					// alert(err) // 画布没有签字时会执行这里 'Not Signned'
				})
			},
			// 基层经办人签字

			// 全部选项选择完毕后，会触发 finish 事件
			onFinish({
				selectedOptions
			}) {
				this.showxzqh = false;
				let area = selectedOptions.map((option) => option.text)
				let area2 = selectedOptions.map((option) => option.text + option.value)
				console.log(area2)
				this.form.ab_ex1 = area[2]
				this.form.ab_ex2 = area[1]
				this.form.ab_ex162_2 = area.join('/');
				this.form.ab_ex162 = area2.join(',');
				// 更改家庭住址
				if (this.form.ab_ex11 == '') {
					this.form.ab_ex11 = area[0] + area[1] + area[2];
				}
				if (this.form.ab_ex4 == '') {
					this.form.ab_ex4 = area[0] + area[1] + area[2];
				}
				this.getBasicIdNum(1)
			},
			// 行政区划泰兴区外
			// xzqh() {
			// 	this.form.ab_ex162 = '泰兴区外';
			// 	console.log(this.form.ab_ex162)
			// },
			// afterRead(file) {
			// 	file.status = 'uploading';
			// 	file.message = '上传中...';

			// 	setTimeout(() => {
			// 		file.status = 'failed';
			// 		file.message = '上传失败';
			// 	}, 1000);
			// },
			uploadImg(num) {
				return file => {
					console.log(file)
					console.log(this.fileList)
					console.log(num)
					file.status = 'uploading';
					file.message = '上传中...';
					const param = new FormData()
					param.append('file', file.file)
					// param.append("token", localStorage.getItem("token"));
					request({
						method: 'post',
						url: '/social/weixinMinios/fileUpload',
						data: param,
					}).then(res => {
						file.status = 'done';
						file.message = '上传完成';
						console.log(res)
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
					})
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
				this.warning.time2 = YY + MM + DD
				this.showPicker2 = false;
			},
			onConfirm3(date) {
				let YY = date.getFullYear() + '-';
				let MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				let DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
				this.warning.time3 = YY + MM + DD
				this.showPicker3 = false;
			},
			onConfirm4(date) {
				let YY = date.getFullYear() + '-';
				let MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				let DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
				this.warning.time4 = YY + MM + DD
				this.showPicker4 = false;
			},
			onConfirm5(date) {
				let YY = date.getFullYear() + '-';
				let MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				let DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
				this.warning.time5 = YY + MM + DD
				this.showPicker5 = false;
			},
			onConfirm21(value, item) {
				console.log(item)
				console.log(value)
				item.abm_ex1 = value;
				item.showPicker21 = false;
			},
			onConfirm22(value, item) {
				console.log(item)
				console.log(value)
				item.abm_ex5 = value;
				item.showPicker22 = false;
			},
			onConfirm23(value, item) {
				console.log(item)
				console.log(value)
				item.abm_ex16 = value;
				item.showPicker23 = false;
			},
			onConfirm24(value, item) {
				console.log(item)
				console.log(value)
				item.abm_ex7 = value;
				item.showPicker24 = false;
			},
			onConfirm25(value, item) {
				console.log(item)
				console.log(value)
				item.abm_ex48 = value;
				item.showPicker25 = false;
			},
			onConfirm26(value, item) {
				console.log(item)
				console.log(value)
				item.abm_ex28 = value;
				item.showPicker26 = false;
			},
			onConfirm27(value, item) {
				console.log(item)
				console.log(value)
				item.abm_ex11 = value;
				item.showPicker27 = false;
			},
			onConfirm28(value, item) {
				console.log(item)
				console.log(value)
				item.abm_ex52 = value;
				item.showPicker28 = false;
			},
			onConfirm29(value, item) {
				console.log(item)
				console.log(value)
				item.abm_ex47 = value;
				item.showPicker29 = false;
			},
			onConfirm210(value, item) {
				item.abm_ex14 = value;
				item.showPicker210 = false;
			},
			onConfirm211(value, item) {
				item.abm_ex8 = value;
				item.showPicker211 = false;
			},
			onConfirm212(value, item) {
				item.abm_ex42 = value;
				item.showPicker212 = false;
			},
			onConfirm214(value, item) {
				item.resultImg = value;
				item.showPicker214 = false;
			},
			onConfirm213(value, item) {
				item.abm_ex51 = value;
				item.showPicker213 = false;
			},
			onConfirm41(value, item) {
				item.abe_ex11 = value;
				item.showPicker41 = false;
			},
			onConfirm42(value, item) {
				item.abe_ex12 = value;
				item.showPicker42 = false;
			},
			onConfirm43(date, item) {
				let YY = date.getFullYear() + '-';
				let MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				let DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
				item.abe_ex2 = YY + MM + DD
				item.showPicker43 = false;
			},
			onConfirm61(value) {
				this.form.ab_ex79 = value;
				this.showPicker61 = false;
			},
			// page2共同家庭成员增加
			page2FamilyAdd() {
				this.family.push({
					abm_ex3: '',
					abm_ex1: '',
					showPicker21: false,
					showPicker22: false,
					showPicker23: false,
					showPicker24: false,
					showPicker25: false,
					showPicker26: false,
					showPicker27: false,
					showPicker28: false,
					showPicker29: false,
					showPicker210: false,
					showPicker211: false,
					showPicker212: false,
					showPicker214: false,
					abm_ex15: '',
					abm_ex17: '',
					abm_ex2: '',
					abm_ex5: '',
					abm_ex16: '',
					abm_ex7: '',
					abm_ex48: '',
					abm_ex28: '',
					abm_ex11: '',
					abm_ex52: '',
					abm_ex47: '',
					abm_ex51: '',
					showPicker213: false,
					abm_ex8: '',
					abm_ex42: '',
					abm_ex14: '',
					resultImg: '',
				})
			},
			page2FamilyDel() {
				this.family.pop()
			},
			page2FamilyDelMyself(index) {
				this.family.splice(index, 1)
			},

			// page2共同家庭成员增加
			page2FamilyAdd2() {
				this.family2.push({
					abm_ex3: '',
					abm_ex1: '',
					showPicker21: false,
					showPicker22: false,
					showPicker25: false,
					showPicker26: false,
					showPicker27: false,
					showPicker29: false,
					showPicker210: false,
					showPicker214: false,
					abm_ex15: '',
					abm_ex17: '',
					abm_ex2: '',
					abm_ex5: '',
					abm_ex48: '',
					abm_ex28: '',
					abm_ex11: '',
					abm_ex47: '',
					abm_ex21: '',
					abm_ex20: '',
					abm_ex18: '',
					abm_ex14: '',
					resultImg: '', //签名图片
				})
			},
			page2FamilyDel2() {
				this.family2.pop()
			},
			page2FamilyDelMyself2(index) {
				this.family2.splice(index, 1)
			},
			// page4拥有车船情况增删
			page4FamilyAdd() {
				this.estate.push({
					abe_ex1: '',
					abe_ex8: '',
					abe_ex9: '',
					abe_ex10: '',
					abe_ex2: '',
					abe_ex4: '',
				})
			},
			page4FamilyDel() {
				this.estate.pop()
			},
			page4FamilyDelMyself(index) {
				this.estate.splice(index, 1)
			},
			// page4拥有房产情况增删
			page4FamilyAdd2() {
				this.estate2.push({
					abe_ex1: '',
					abe_ex5: '',
					abe_ex6: '',
					abe_ex11: '',
					abe_ex12: '',
					abe_ex2: '',
					showPicker41: false,
					showPicker42: false,
					showPicker43: false,
				})
			},
			page4FamilyDel2() {
				this.estate2.pop()
			},
			page4FamilyDelMyself2(index) {
				this.estate2.splice(index, 1)
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
					this.ab_ex46 = json.ab_ex46.split(',')
					// if(json.ab_ex46!=""){
					// 	this.form.ab_ex46_ = json.ab_ex46
					// }else{
					// 	this.form.ab_ex46_ = "无劳动能力、无生活来源、无法定赡养抚养扶养义务人或者其法定义务人无履行义务能力"
					// }
					// if (json.ab_ex13=="") {
					// 	this.form.ab_ex13 = this.$route.query.type
					// 	this.form.ab_ex15 = '委托确认'
					// 	this.form.ab_ex100 = 'Y'
					// }
					if (json.ab_ex8 == "") {
						this.form.ab_ex8 = json.ab_ex3
					}
					// if (json.ab_ex13 == "低保")
					//     this.form.ab_ex13 = "最低生活保障";
					// else if (json.ab_ex13 == "家庭边缘")
					//     this.form.ab_ex13 = "低收入家庭";
					// else if (json.ab_ex13 == "特困供养")
					//     this.form.ab_ex13 = "特困人员供养";
					this.getBasicIdNum(1);
					var ab_ex10 = json.ab_ex10.split(",");
					this.form.ab_ex10_1 = ab_ex10[0]
					this.form.ab_ex10_2 = ab_ex10.length > 1 ? ab_ex10[1] : ""
					if (this.form.ab_ex10_1) {
						this.fileList.push(this.form.ab_ex10_1)
					}
					if (this.form.ab_ex10_2) {
						this.fileList2.push(this.form.ab_ex10_2)
					}
					if (json.ab_ex73) {
						let ab_ex73 = json.ab_ex73.split(",");
						this.fileList3.push(ab_ex73[0])
					}
					// 其他证明材料
					if (json.ab_ex16) {
						let imgs = json.ab_ex16.split(",");
						this.fileList5 = this.fileList5.concat(imgs)
						console.log(this.fileList5)
					}
					// 民主评议
					if (json.ab_ex97) {
						let ab_ex97 = json.ab_ex97.split(",");
						this.fileList4.push(ab_ex97[0])
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
							this.warning[index].showPicker = false
						})
					}

					if (json.ab_ex42 == "") {
						this.form.ab_ex42 = '泰州农商行';
					}
					if (json.ab_ex13 == "") {
						this.form.ab_ex13 = this.$route.query.type
						this.form.ab_ex15 = '委托确认'
						this.form.ab_ex100 = 'Y'
					}
					this.loadEstate();
				}).catch(error => {

				})
			},
			loadF(sType) {
				return request({
					method: 'post',
					url: '/social/assistanceWeixin/getBasicFamily',
					data: {
						sId: this.$route.query.sId,
						'sType': sType
					},
					headers: {
						'token': sessionStorage.getItem('token')
					}
				})
			},
			loadFamily(sType) {
				this.loadF(sType).then(res => {
					this.family = res[0].data
					res[0].data.forEach((item, index) => {
						console.log(this.family)
						this.$set(this.family[index], 'showPicker21', false)
						this.$set(this.family[index], 'showPicker22', false)
						this.$set(this.family[index], 'showPicker23', false)
						this.$set(this.family[index], 'showPicker24', false)
						this.$set(this.family[index], 'showPicker25', false)
						this.$set(this.family[index], 'showPicker26', false)
						this.$set(this.family[index], 'showPicker27', false)
						this.$set(this.family[index], 'showPicker28', false)
						this.$set(this.family[index], 'showPicker29', false)
						this.$set(this.family[index], 'showPicker210', false)
						this.$set(this.family[index], 'showPicker211', false)
						this.$set(this.family[index], 'showPicker212', false)
						this.$set(this.family[index], 'showPicker213', false)
						this.$set(this.family[index], 'showPicker214', false)
						this.$set(this.family[index], 'resultImg', '')
						console.log(this.family)
					})
				}).catch(error => {

				})
			},
			loadFamily2(sType) {
				this.loadF(sType).then(res => {
					this.family2 = res[0].data
					res[0].data.forEach((item, index) => {
						this.$set(this.family2[index], 'showPicker21', false)
						this.$set(this.family2[index], 'showPicker22', false)
						this.$set(this.family2[index], 'showPicker25', false)
						this.$set(this.family2[index], 'showPicker26', false)
						this.$set(this.family2[index], 'showPicker27', false)
						this.$set(this.family2[index], 'showPicker29', false)
						this.$set(this.family2[index], 'showPicker210', false)
						this.$set(this.family2[index], 'showPicker214', false)
					})
				}).catch(error => {})
			},
			// loadPay(){
			// 	request({
			// 		method: 'post',
			// 		url: '/social/assistanceWeixin/getBasicPay',
			// 		data: {
			// 			sId: this.$route.query.sId,
			// 		},
			// 		headers: {
			// 			'token': sessionStorage.getItem('token')
			// 		}
			// 	}).then(res => {
			// 		console.log(res)

			// 	}).catch(error => {
			// 		console.log(error)
			// 	})
			// },
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
					}
					if (ab_ex2 == '延令街道') {
						idNum = '321283002';
					}
					if (ab_ex2 == '黄桥镇') {
						idNum = '321283100';
					}
					if (ab_ex2 == '珊瑚镇') {
						idNum = '321283105';
					}
					if (ab_ex2 == '广陵镇') {
						idNum = '321283106';
					}
					if (ab_ex2 == '古溪镇') {
						idNum = '321283102';
					}
					if (ab_ex2 == '元竹镇') {
						idNum = '321283104';
					}
					if (ab_ex2 == '张桥镇') {
						idNum = '321283109';
					}
					if (ab_ex2 == '曲霞镇') {
						idNum = '321283108';
					}
					if (ab_ex2 == '河失镇') {
						idNum = '321283112';
					}
					if (ab_ex2 == '新街镇') {
						idNum = '321283113';
					}
					if (ab_ex2 == '姚王街道') {
						idNum = '321283114';
					}
					if (ab_ex2 == '宣堡镇') {
						idNum = '321283115';
					}
					if (ab_ex2 == '分界镇') {
						idNum = '321283101';
					}
					if (ab_ex2 == '滨江镇') {
						idNum = '321283123';
					}
					if (ab_ex2 == '虹桥镇') {
						idNum = '321283124';
					}
					if (ab_ex2 == '根思乡') {
						idNum = '321283200';
					}
					//增加年月
					var myDate = new Date();
					idNum += '' + myDate.getFullYear() + '' + (myDate.getMonth() > 8 ? myDate.getMonth() + 1 : '0' + "" + (
						myDate.getMonth() + 1));
					//增加救助代码
					var ab_ex13 = this.form.ab_ex13;
					if (ab_ex13 == '低保') {
						idNum += '' + '01';
					}
					if (ab_ex13 == '城乡低保') {
						idNum += '' + '01';
					}
					if (ab_ex13 == '特困供养') {
						idNum += '' + '02';
					}
					if (ab_ex13 == '低保边缘') {
						idNum += '' + '10';
					}
					if (ab_ex13 == '医疗救助') {
						idNum += '' + '04';
					}
					if (ab_ex13 == '教育救助') {
						idNum += '' + '21';
					}
					if (ab_ex13 == '住房救助') {
						idNum += '' + '22';
					}
					if (ab_ex13 == '就业救助') {
						idNum += '' + '23';
					}
					if (ab_ex13 == '其他') {
						idNum += '' + '27';
					}
					if (ab_ex13 == '家庭边缘') {
						idNum += '' + '10';
					}
					if (ab_ex13 == '临时救助') {
						idNum += '' + '05';
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
			loadEstate() {
				request({
					method: 'post',
					url: '/social/assistanceWeixin/getBasicEstate',
					data: {
						sId: this.$route.query.sId,
					},
					headers: {
						'token': sessionStorage.getItem('token')
					}
				}).then(res => {
					console.log(res)
					this.estate = res[0].data;
					this.estate2 = res[0].data2;
					res[0].data2.forEach((item, index) => {
						this.$set(this.estate2[index], 'showPicker41', false)
						this.$set(this.estate2[index], 'showPicker42', false)
						this.$set(this.estate2[index], 'showPicker43', false)
					})
				}).catch(error => {
					console.log(error)
				})
			},
			save() {
				this.form.ab_ex10 = this.form.ab_ex10_1 + ',' + this.form.ab_ex10_2
				this.form.ab_ex17 = '泰州市姜堰区社会救助综合平台'
				this.form.ab_ex46 = this.ab_ex46.join()
				this.form.stype = this.$route.query.type
				console.log(this.form)
				let memeber = this.family.concat(this.family2)
				let pay = []
				let estate = this.estate.concat(this.estate2)
				request({
					method: 'post',
					url: '/social/assistanceWeixin/saveBasic',
					data: {
						'data': '['+JSON.stringify(this.form)+']',
						'member': JSON.stringify(memeber),
						'pay': JSON.stringify(pay),
						'estate': JSON.stringify(estate),
						'waring': JSON.stringify(this.warning),
						'isHc': "Y",
						'isCf': 'Y',
						'type': '核查'
					},
					headers: {
						'token': sessionStorage.getItem('token')
					}
				}).then(res => {
					console.log(res)
				}).catch(error => {
					console.log(error)
				})
			},
			change(value) {
				console.log(value)
				this.form.ab_ex94 = (value / 6).toFixed(2)
				this.form.ab_ex94_ = (this.form.ab_ex94 / this.form.ab_ex5).toFixed(2)
				this.changeAmt(true)
			},
			change2(value, item) {
				var money = (value - this.form.ab_ex38 * 2) / 2;
				if (money < 0) {
					money = 0;
				}
				item.abm_ex18 = money
				console.log(item)
			},
			changeSfz(value) {
				if (this.isCardID(value) == '') {
					this.form.ab_ex69 = this.getSex(value)
				}
			},
			changeHj(value) {
				console.log(value)
				if (value = '农业户口') {
					this.form.ab_ex44 = 农村低保
				} else if (value = '非农业户口') {
					this.form.ab_ex44 = '城市低保'
				}
			},
			getSex(idCard) {
				//alert(idCard);
				var sexStr = '';
				if (parseInt(idCard.slice(-2, -1)) % 2 == 1) {
					sexStr = '男';
				} else {
					sexStr = '女';
				}
				return sexStr;
			},
			changeAmt(total) {
				if (this.$route.query.type = '特困供养') {
					this.form.ab_ex40 = 855
					this.form.ab_ex38 = 855
				} else {
					var amt = this.form.ab_ex29 + this.form.ab_ex30 + this.form.ab_ex31 + this.form.ab_ex32 + this.form
						.ab_ex33;
					var amt2 = 0;
					var num = 0;
					var num2 = 0;
					var abm_ex11_ = "";
					var examt = 0;
					this.family.forEach((item, index) => {
						var amt_ = 0;
						if (item.abm_ex1 == "户主本人")
							abm_ex11_ = item.abm_ex11
						if (item.abm_ex3 != "" && item.abm_ex42 == '是') {
							num2++;
							if (item.abm_ex8 == "未成年人") {
								examt = examt + (this.form.ab_ex38 * 1.1);
							} else if (item.abm_ex8 == "重病" || item.abm_ex11 == "重病") {
								examt = examt + (this.form.ab_ex38 * 1.2);
							} else if (item.abm_ex11 == "重残") {
								examt = examt + (this.form.ab_ex38);
							} else
								num++;

							this.common.forEach((item2, index2) => {
								let optname = this.common[index2].optname
								let optvalue = this.common[index2].optvalue
								if (optname == item.abm_ex8) {
									optvalue = optvalue.replace("%", "");
									amt_ = Number(optvalue);
									if (item.abm_ex11 != '轻残' && item.abm_ex11 != '重残' && item.abm_ex8 !=
										'未成年人' && item.abm_ex8 != '重病' && item.abm_ex11 != '重病') {
										amt2 += (amt_ / 100) * this.form.ab_ex38;
									}
								}
							})
						}
					})
					this.form.ab_ex39 = amt2
					if (!total && amt) {
						this.form.ab_ex58 = amt
						this.form.ab_ex94 = (amt / 6).toFixed(2)
					}
					var amt_ = Number(this.form.ab_ex94)
					if (this.form.ab_ex41 == '残疾人单列户施保') {
						if (abm_ex11_ == '轻残') {
							this.form.ab_ex40 == (this.form.ab_ex38 * 0.75).toFixed(2)
						} else if (abm_ex11_ == '重残') {
							this.form.ab_ex40 == (this.form.ab_ex38 * 0.65).toFixed(2)
						}
						this.form.ab_ex39 = ''
					} else if (this.form.ab_ex41 == '重病型单列户施保') {
						this.form.ab_ex40 = this.form.ab_ex38
						this.form.ab_ex39 = ''
					} else {
						if ((num == null || num == 0) && examt == 0) {
							num = 1;
						}

						var m = (this.form.ab_ex38 - (amt_ / num2)) * num + amt2 + examt;
						m = m < 0 ? 0 : m;
						if (num2 == 0) {
							m = 0;
						}
						if (num == null || num == 0) {
							m = examt;
						}
						this.form.ab_ex40 = m.toFixed(2)
					}
				}
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
		color: #409EFF;
	}

	header {
		width: 100%;
		height: 100px;
		background-color: #eee;
		box-shadow: 0px 0px 30px #a1a1a1;
		position: fixed;
		z-index: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 10px;
	}

	.dbjz {
		width: 100%;
		height: 100%;
		background-color: #f3f3f3;
		background-size: 100% 100%;
		position: fixed;
		overflow: auto;
	}

	.headerHead {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.headerRectangle {
		width: 20px;
		height: 10px;
		background-color: #e2e2e2;
		border-radius: 10px;
		margin: 0 1px 0 1px;
	}

	main {
		padding-top: 100px;
	}
</style>

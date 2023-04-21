<template>
	<div class="dbjz">
		<header>
			<div class="headerHead">
				<div>
					<div :class="{headerF:isShow0}">温馨提示</div>
				</div>
				<div class="headerRectangle"></div>
				<div >
					<div :class="{headerF:isShow1}">基础信息</div>
				</div>
				<div class="headerRectangle"></div>
				<div>
					<div :class="{headerF:isShow2}">成员情况</div>
				</div>
				<div class="headerRectangle"></div>
				<div>
					<!-- <div :class="{headerF:isShow3}">收入支出</div> -->
					<div :class="{headerF:isShow3}">具结说明</div>
				</div>
				<!-- <div class="headerRectangle"></div>
				<div>
					<div :class="{headerF:isShow4}">财产情况</div>
				</div>
				<div class="headerRectangle"></div>
				<div>
					<div :class="{headerF:isShow5}">授权书</div>
				</div> -->
				<div class="headerRectangle"></div>
				<div>
					<div :class="{headerF:isShow6}">材料上传</div>
				</div>
			</div>
		</header>
		<main>
			<div id="page0" v-show="page0" class="page0Class">
				<!-- <div class="page1ClassDiv">
					&nbsp;&nbsp;&nbsp;&nbsp;<span class="page1ClassDivFont">温馨提示</span>
				</div> -->
				<div style="width:90%;margin:auto;">
					<h2>温馨提示:</h2> 

					<div style="font-size:15px">&nbsp;&nbsp;1、申请人及其他家庭成员的身份证（正反面）、户口簿（含户口簿首页，多个户口簿均应提供户口簿首页）[必填项]</div><br>
					<div style="font-size:15px">&nbsp;&nbsp;2、结婚证（户口不在一个户口簿的提供结婚证，户口在一个户口簿的可以不提供）；离婚证、离婚协议或法院判决书和民事调解书（多次离婚的均应提供的相关手续）；个人婚姻状况声明（个人手写上传）[必填项]</div><br>
					<div style="font-size:15px">&nbsp;&nbsp;3、拥有不动产证明（不动产中心出具，如果有房产的应提供不动产权证证明）[必填项]</div><br>
					<div style="font-size:15px">&nbsp;&nbsp;4、核对授权书（民政部门核查需要，要求两名社区工作人员签字）[必填项]</div><br>
					<div style="font-size:15px">&nbsp;&nbsp;5、收入情况证明（工作单位盖章证明收入情况，退休人员由人社局出具收入情况证明，无业人员由个人申报、社区公示后，由社区出具收入情况说明）[必填项]</div><br>
					<div style="font-size:15px">&nbsp;&nbsp;6、担保情况。担保人必须为行政事业人员或企业法人（①行政事业单位的担保人需本人签字、单位盖章并附本人身份证②担保人为企业法人的需提供单位法人身份证复印件、单位营业执照或统一社会信用代码证复印件）[必填项]</div><br>
					<div style="font-size:15px">&nbsp;&nbsp;7、申报时，无相关证明时填写“无”。</div><br><br>
					<div style="font-size: 15px;">
						<!-- <van-field name="checkbox">
							<template #input> -->
								<van-checkbox  v-model="checkbox" shape="square" style="color:#000" >我已知晓，并进行下一步操作</van-checkbox>
							<!-- </template>
						</van-field> -->
					</div>
				</div>
				<div style="width: 100%;position: fixed;bottom: 0px;text-align: center;display: flex;justify-content: space-around">
					<van-button block type="info" native-type="button" @click="next0">下一步</van-button>
				</div>
				
			</div>

			<div id="page1" v-show="page1" class="page1Class">
				<div class="page1ClassDiv">
					&nbsp;&nbsp;&nbsp;&nbsp;<span class="page1ClassDivFont">基本信息</span>
				</div>

				<van-form ref='rule1' @submit="next1">
					
					<van-field v-model="form.ab_ex3" required name="ab_ex3" maxlength="10" label="申请人姓名" placeholder="请输入申请人姓名" :rules="[{ required: true, message: '请填写姓名' }]">
						<!-- <template #button>
							<van-button size="small" type="info" native-type="button">拍照识别</van-button>
						</template> -->
					</van-field>
					<van-field v-model="form.ab_ex7" required name="ab_ex7" label="身份证号码" placeholder="请输入申请人身份证号"
						:rules="[{ required: true, message: '请填写身份证号'}]" @input='changeSfz' />
					
					<!-- <van-field v-model="form.ab_ex7" required name="ab_ex7" label="申请人类型" placeholder="请输入申请人身份证号"
						:rules="[{ required: true, message: '请填写身份证号'}]" @input='changeSfz' /> -->


					<van-field v-model="form.ab_ex82" required clickable name="picker"  label="申请人类型"
						placeholder="点击选择申请人类型" :rules="[{ required: true, message: '请选择申请人类型'}]" @click="showPicker82 = true" />
						
						
					<van-popup v-model="showPicker82" position="bottom">
						<van-picker show-toolbar :columns="columnsType" @confirm="onConfirm82" @cancel="showPicker82 = false"/>
					</van-popup>




					<van-field v-model="form.ab_ex162_2" required center readonly label="行政区划" placeholder="请选择所在行政区划"
						@click="showxzqh = true" :rules="[{ required: true, message: '请选择行政区划' }]">
					</van-field>

					<van-popup v-model="showxzqh" round position="bottom">
						<!-- ab_ex162_3是因为和上面field显示的要不一样，不然区划选到一半关闭会显示options的value值 -->
						<van-cascader v-model="form.ab_ex162_3" title="请选择所在行政区划" :options="options"
							@close="showxzqh = false" @finish="onFinish" />
					</van-popup>

					<van-field v-model="form.ab_ex4" name="ab_ex4" required label="户籍地址" placeholder="户籍地址"
						:rules="[{ required: true, message: '请填写户籍地址' }]" />

					<!-- <van-field v-model="form.ab_ex11" name="ab_ex11" maxlength="50" label="家庭住址" required placeholder="家庭住址"
						:rules="[{ required: true, message: '请填写家庭住址' }]" />
					<van-field v-model="form.ab_ex5" name="ab_ex5" label="家庭人口" placeholder="家庭人口" required
						:rules="[{ required: true, message: '请填写家庭人口' }]" type="digit" /> -->

					<van-field name="ab_ex69" label="性别" required :rules="[{ required: true, message: '请选择性别' }]">
						<template #input>
							<van-radio-group v-model="sex" direction="horizontal" @change='changeSex'>
								<van-radio name="男">男</van-radio>
								<van-radio name="女">女</van-radio>
							</van-radio-group>
						</template>
					</van-field>
					
					<van-field v-model="form.ab_ex28" center name="ab_ex28" maxlength="11" type="number" required label="联系电话" placeholder="联系电话"
						:rules="[{ required: true, message: '请填写联系电话' }]">
					</van-field>

					<van-field v-model="form.ab_ex83" required clickable name="picker"  label="婚姻状况"
						placeholder="点击选择婚姻状况" :rules="[{ required: true, message: '请选择婚姻状况'}]" @click="showPicker83 = true" />
						
						
					<van-popup v-model="showPicker83" position="bottom">
						<van-picker show-toolbar :columns="maritalStatus" @confirm="onConfirm83" @cancel="showPicker83 = false"/>
					</van-popup>
					<van-field v-model="form.ab_ex4" name="ab_ex130" required label="现居住面积(m²)" placeholder="现居住面积"
						:rules="[{ required: true, message: '请填写现居住面积'}]" />

<!-- 
					<van-field required v-model="form.ab_ex93" maxlength="100" name="ab_ex93" label="求助描述" placeholder="求助描述" :rules="[{ required: true, message: '请填写求助描述' }]" />
					<van-field v-if="ab_ex158.length>0" name="ab_ex158" label="原申请类别" required
						:rules="[{ required: true, message: '请选择原申请类别' }]">
						<template #input>
							<van-checkbox-group disabled  v-model="ab_ex158" direction="horizontal">
								<div v-for="(item,index) in ab_ex158" :key='index'>
									<van-checkbox class="marginstyle" v-if="item=='低保'" :name="item" shape="square">城乡低保</van-checkbox>
									<van-checkbox class="marginstyle" v-else-if="item=='家庭边缘'" :name="item" shape="square">低保边缘</van-checkbox>
									<van-checkbox class="marginstyle" v-else :name="item" shape="square">{{item}}</van-checkbox>
								</div>
							</van-checkbox-group>
						</template>
					</van-field> -->
					<!-- <van-field name="ab_ex145" label="求助属实类别" required :rules="[{ required: true, message: '请选择求助属实类别' }]">
						<template #input>
							<van-checkbox-group v-model="ab_ex145" direction="horizontal"  @change="sslbChange">
								<van-checkbox :disabled="sslbDisabled1" class="marginstyle" name="低保" shape="square">城乡低保</van-checkbox>
								<van-checkbox :disabled="sslbDisabled5" class="marginstyle" name="特困供养" shape="square">特困供养</van-checkbox>
								<van-checkbox :disabled="sslbDisabled6" class="marginstyle" name="家庭边缘" shape="square">低保边缘</van-checkbox>
								<van-checkbox :disabled="sslbDisabled7" class="marginstyle" name="支出型困难" shape="square">支出型困难家庭</van-checkbox>
								<van-checkbox :disabled="sslbDisabled8" class="marginstyle" name="尊老金" shape="square">尊老金</van-checkbox>
								<van-checkbox :disabled="sslbDisabled9" class="marginstyle" name="临时救助" shape="square">临时救助</van-checkbox>
								<van-checkbox :disabled="sslbDisabled2" class="marginstyle" name="不符合救助条件" shape="square">不符合救助条件</van-checkbox>
								<van-checkbox :disabled="sslbDisabled3" class="marginstyle" name="自愿放弃" shape="square">自愿放弃</van-checkbox>
								<van-checkbox :disabled="sslbDisabled4" class="marginstyle" name="死亡" shape="square">死亡</van-checkbox>
								<van-checkbox :disabled="sslbDisabled10" class="marginstyle" name="两书拒签" shape="square">两书拒签</van-checkbox>
								<van-checkbox :disabled="sslbDisabled11" class="marginstyle" name="失踪失联" shape="square">失踪失联</van-checkbox>
								<van-checkbox :disabled="sslbDisabled12" class="marginstyle" name="其它" shape="square">其它</van-checkbox>
							</van-checkbox-group>
						</template>
					</van-field> -->
					<!-- <van-cell-group v-if="ab_ex145.indexOf('不符合救助条件')!=-1 || ab_ex145.indexOf('自愿放弃')!=-1 || ab_ex145.indexOf('死亡')!=-1 || ab_ex145.indexOf('两书拒签')!=-1 || ab_ex145.indexOf('失踪失联')!=-1 || ab_ex145.indexOf('其它')!=-1">
						<van-field v-model="form.ab_ex178" name="ab_ex178" maxlength="30" type="textarea" autosize :rows="2" label="退回描述" placeholder="退回描述" />
						<van-field v-model="form.ab_ex80" name="ab_ex80" maxlength="50" label="不诚信原因" placeholder="不诚信原因" />
						<van-cell title="*证明材料"></van-cell>
						<van-uploader v-model="fileList10" :before-read="beforeRead" :after-read="uploadImg(10)" :before-delete="beforeDelete('ab_ex175')" />
						<van-cell title="点击提交退回救助" center>
							<template>
								<van-button type="info" native-type="button" @click = "abandon">提交退回</van-button>
							</template>
						</van-cell>
					</van-cell-group> -->
					<!-- 用rules验证莫名其妙一直会显示选择原因分类 -->
					<!-- <van-field name="ab_ex46" label="原因分类" required>
						<template #input>
							<van-checkbox-group v-model="ab_ex46" direction="horizontal">
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
					<van-field v-if="typelx=='低保'" name="ab_ex41" required label="低保类型" :rules="[{ required: true, message: '请选择低保类型' }]">
						<template #input>
							<van-radio-group v-model="form.ab_ex41" direction="horizontal">
								<van-radio class="marginstyle" name="低收入型低保">一般低保</van-radio>
								<van-radio class="marginstyle" name="残疾人单列户施保">重残单人保</van-radio>
								<van-radio class="marginstyle" name="重病型单列户施保">重病单人保</van-radio>
							</van-radio-group>
						</template>
					</van-field>
					<van-field name="ab_ex92" label="是否属于村干部或经办人员近亲属" required :rules="[{ required: true, message: '请选择是否属于村干部或经办人员近亲属' }]">
						<template #input>
							<van-radio-group v-model="form.ab_ex92" direction="horizontal"  @change="changeKinsfolk">
								<van-radio name="是">是</van-radio>
								<van-radio name="否">否</van-radio>
							</van-radio-group>
						</template>
					</van-field>
					
					<van-field v-model="form.safeguard" center name="safeguard" type="number" required label="在保人数" placeholder="在保人数" />
					<van-field v-if="typelx=='特困供养'" name="ab_ex71" label="申请供养方式" required
						:rules="[{ required: true, message: '请选择申请供养方式' }]">
						<template #input>
							<van-radio-group v-model="form.ab_ex71" direction="horizontal" @change='changetkbt'>
								<van-radio name="集中">集中</van-radio>
								<van-radio name="分散">分散</van-radio>
							</van-radio-group>
						</template>
					</van-field>
					<van-field v-if="typelx=='特困供养'" v-model="form.ab_ex195" center name="ab_ex195" label="特困供养机构" placeholder="特困供养机构"></van-field>
					<van-field v-if="typelx=='特困供养'" name="ab_ex198" label="自理能力">
						<template #input>
							<van-radio-group v-model="form.ab_ex198" direction="horizontal">
								<van-radio name="自理">自理</van-radio>
								<van-radio name="失能">失能</van-radio>
								<van-radio name="半失能">半失能</van-radio>
							</van-radio-group>
						</template>
					</van-field>
					<van-field v-if="typelx=='特困供养'" v-model="form.ab_ex199" type="number" center name="ab_ex199" label="护理费(每人每月)" placeholder="护理费" :rules="[{ required: true, message: '请填写护理费' }]"></van-field>
					<van-field v-if="typelx=='特困供养'" v-model="form.ab_ex200" type="number" center name="ab_ex200" label="生活费(每人每月)" placeholder="生活费" :rules="[{ required: true, message: '请填写生活费' }]"></van-field>
					
					<van-field v-if="typelx=='临时救助'" name="ab_ex218" label="审批类型" required :rules="[{ required: true, message: '请选择审批类型' }]">
						<template #input>
							<van-radio-group v-model="form.ab_ex218" direction="horizontal">
								<van-radio class="marginstyle" name="镇街审批">镇街审批</van-radio>
								<van-radio class="marginstyle" name="市领导审批">市领导审批</van-radio>
								<van-radio class="marginstyle" name="市级审批">市级审批</van-radio>
							</van-radio-group>
						</template>
					</van-field>
					<van-field v-if="typelx=='临时救助'" name="ab_ex122" label="困难类型" required :rules="[{ required: true, message: '请选择困难类型' }]">
						<template #input>
							<van-radio-group v-model="form.ab_ex122" direction="horizontal">
								<van-radio class="marginstyle" name="因病支出型困难家庭">因病支出型困难家庭</van-radio>
								<van-radio class="marginstyle" name="因灾急难型困难家庭">因灾急难型困难家庭</van-radio>
								<van-radio class="marginstyle" name="发生人身伤害意外事件">发生人身伤害意外事件</van-radio>
								<van-radio class="marginstyle" name="因学支出型困难家庭">因学支出型困难家庭</van-radio>
								<van-radio class="marginstyle" name="其他特殊原因致困">其他特殊原因致困</van-radio>
							</van-radio-group>
						</template>
					</van-field>

					<van-field v-if="typelx=='临时救助'" name="ab_ex81" label="转介服务" required
						:rules="[{ required: true, message: '请选择转介服务' }]">
						<template #input>
							<van-radio-group v-model="form.ab_ex81" direction="horizontal" @change='zjfwChange'>
								<van-radio class="marginstyle" name="发放临时救助金">发放临时救助金</van-radio>
								<van-radio class="marginstyle" name="发放实物">发放实物</van-radio>
								 <van-radio class="marginstyle" name="提供转介服务">提供转介服务</van-radio> 
							</van-radio-group>
						</template>
					</van-field> -->

					<!-- <van-field v-if="typelx=='临时救助' && isZjfw ==true" name="ab_ex106" label="转介方向" required :rules="[{ required: true, message: '请选择转介方向' }]">
						<template #input>
							<van-checkbox-group v-model="ab_ex106" direction="horizontal">
								<van-checkbox class="marginstyle" name="低保" shape="square">低保</van-checkbox>
								<van-checkbox class="marginstyle" name="医疗" shape="square">医疗</van-checkbox>
								<van-checkbox class="marginstyle" name="教育" shape="square">教育</van-checkbox>
								<van-checkbox class="marginstyle" name="住房" shape="square">住房</van-checkbox>
								<van-checkbox class="marginstyle" name="就业" shape="square">就业</van-checkbox>
								<van-checkbox class="marginstyle" name="慈善帮扶" shape="square">慈善帮扶</van-checkbox>
								<van-checkbox class="marginstyle" name="志愿服务" shape="square">志愿服务</van-checkbox>
							</van-checkbox-group>
						</template>
					</van-field>
					 -->
					<!-- <van-field v-model="form.ab_ex123" name="ab_ex123" label="家庭状况和申请原因" placeholder="家庭状况和申请原因" required
						:rules="[{ required: true, message: '请填写家庭状况和申请原因' }]" /> -->
					<!-- 临时 -->

					<div class="page1ClassDiv">
						&nbsp;&nbsp;&nbsp;&nbsp;<span class="page1ClassDivFont">工作信息</span>
					</div>
					<van-field v-model="form.ab_ex42" name="ab_ex42" maxlength="15" label="工作单位" placeholder="工作单位" required
						:rules="[{ required: true, message: '请填写工作单位' }]">
					</van-field>
					
					<van-field v-model="form.ab_ex8" center name="ab_ex8" maxlength="15" label="工作地址" placeholder="工作地址" required
						:rules="[{ required: true, message: '请填写工作地址' }]">
					</van-field>

					<van-field v-model="form.ab_ex43" center name="ab_ex43" maxlength="22" label="工作现状" placeholder="工作现状" required
						:rules="[{ required: true, message: '请填写工作现状' }]" >
					</van-field>
					
					<div class="page1ClassDiv">
						&nbsp;&nbsp;&nbsp;&nbsp;<span class="page1ClassDivFont">保险信息</span>
					</div>
					<van-field v-model="form.ab_ex42" name="ab_ex42" label-width='120px' label="是否缴纳养老保险" placeholder="是否缴纳养老保险" required
						:rules="[{ required: true, message: '请填写是否缴纳养老保险' }]">
						<template #input>
							<van-radio-group v-model="form.ab_ex122" direction="horizontal">
								<van-radio class="marginstyle" name="是">是</van-radio>
								<van-radio class="marginstyle" name="否">否</van-radio>
							</van-radio-group>
						</template>
					</van-field>

					<van-field v-model="form.ab_ex8" center name="ab_ex8"  label-width='120px' label="是否缴纳医疗保险" placeholder="是否缴纳医疗保险" required
						:rules="[{ required: true, message: '请填写是否缴纳医疗保险' }]">
						<template #input>
							<van-radio-group v-model="form.ab_ex122" direction="horizontal">
								<van-radio class="marginstyle" name="是">是</van-radio>
								<van-radio class="marginstyle" name="否">否</van-radio>
							</van-radio-group>
						</template>
					</van-field>

					<van-field v-model="form.ab_ex43" center name="ab_ex43"  label-width='120px' label="是否缴纳住房公积金" placeholder="是否缴纳住房公积金" required
						:rules="[{ required: true, message: '请填写是否缴纳住房公积金' }]" >
						<template #input>
							<van-radio-group v-model="form.ab_ex122" direction="horizontal">
								<van-radio class="marginstyle" name="是">是</van-radio>
								<van-radio class="marginstyle" name="否">否</van-radio>
							</van-radio-group>
						</template>
					</van-field>
					
					<!-- 收入信息 -->
					<div class="page1ClassDiv">
						&nbsp;&nbsp;&nbsp;&nbsp;<span class="page1ClassDivFont">收入信息</span>
					</div>
					<van-field v-model="form.ab_ex42" name="ab_ex42" maxlength="15"  label-width='120px' label="月工薪收入(元)" placeholder="月工薪收入(元)" required
						:rules="[{ required: true, message: '请填写月工薪收入' }]">
					</van-field>
					
					<van-field v-model="form.ab_ex8" center name="ab_ex8" maxlength="15"  label-width='120px' label="月财产性收入(元)" placeholder="月财产性收入(元)" required
						:rules="[{ required: true, message: '请填写月财产性收入' }]">
					</van-field>

					<van-field v-model="form.ab_ex43" center name="ab_ex43" maxlength="22"  label-width='120px' label="月收入共计(元)" placeholder="月收入共计(元)" required
						:rules="[{ required: true, message: '请填写月收入共计' }]" >
					</van-field>
					
					<van-field v-model="form.ab_ex43" center name="ab_ex43" maxlength="22"  label-width='120px' label="家庭月工薪收入共计(元)" placeholder="家庭月工薪收入共计(元)" required
						:rules="[{ required: true, message: '请填写家庭月工薪收入共计' }]" >
					</van-field>
					
					<!-- 住房信息 -->
					<div class="page1ClassDiv">
						&nbsp;&nbsp;&nbsp;&nbsp;<span class="page1ClassDivFont">住房信息</span>
					</div>

					<van-field v-model="form.ab_ex42" name="ab_ex42"  label="是否在城区有私有产权房" required
						:rules="[{ required: true, message: '请选择是否在城区有私有产权房' }]">
						<template #input>
							<van-radio-group v-model="form.ab_ex122" direction="horizontal">
								<van-radio class="marginstyle" name="是">是</van-radio>
								<van-radio class="marginstyle" name="否">否</van-radio>
							</van-radio-group>
						</template>
					</van-field>

					<van-field v-model="form.ab_ex8" center name="ab_ex8"  label="是否在城区承租公房或廉租房"  required
						:rules="[{ required: true, message: '请选择是否在城区承租公房或廉租房' }]">
						<template #input>
							<van-radio-group v-model="form.ab_ex122" direction="horizontal">
								<van-radio class="marginstyle" name="是">是</van-radio>
								<van-radio class="marginstyle" name="否">否</van-radio>
							</van-radio-group>
						</template>
					</van-field>

					<van-field v-model="form.ab_ex43" center name="ab_ex43"  label="申请之日前5年内是否有住房买卖、征收搬迁"  required
						:rules="[{ required: true, message: '请选择申请之日前5年内是否有住房买卖、征收搬迁' }]" >
						<template #input>
							<van-radio-group v-model="form.ab_ex122" direction="horizontal">
								<van-radio class="marginstyle" name="是">是</van-radio>
								<van-radio class="marginstyle" name="否">否</van-radio>
							</van-radio-group>
						</template>
					</van-field>

					<div class="page1ClassDiv">
						&nbsp;&nbsp;&nbsp;&nbsp;<span class="page1ClassDivFont">其他信息</span>
					</div>
					<van-field v-model="form.ab_ex42" name="ab_ex42" maxlength="22" label="开户银行" placeholder="开户银行" required
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

					
					<!-- <div style="margin: 16px;display: flex;justify-content: space-around;"> -->
					<div style="width: 100%;position: fixed;bottom: 0px;text-align: center;display: flex;justify-content: space-around">
						<van-button block native-type="button" @click="back1">上一步</van-button>
						<van-button block type="info" native-type="button" @click="next1">下一步</van-button>
					</div>
				</van-form>
			</div>

			<div id="page2" v-show="page2" class="page2Class">
				
				<div class="page2ClassDiv">
					<!-- <div class="page2ClassDiv2"> -->
						<!-- <span class="page2ClassDiv2Font"></span> -->
						<!-- <span>共同申请人情况</span> -->
					<!-- </div> -->
					<div class="page1ClassDiv">
						&nbsp;&nbsp;&nbsp;&nbsp;<span class="page1ClassDivFont">共同申请人情况</span>
					</div>
					<van-form ref='rule2'>
						<div v-for="(item,index) in family" :key='index'>
							<van-field v-model="item.abm_ex3" name="abm_ex3" maxlength="10" label="姓名" placeholder="姓名" required :rules="[{ required: true, message: '请填写姓名' }]">
								<!-- <template #button>
									<van-button size="small" type="info" native-type="button">拍照识别</van-button>
								</template> -->
							</van-field>

							<van-field readonly clickable name="abm_ex1" :value="item.abm_ex1" label="与户主关系" required
								placeholder="点击选择与户主关系" :rules="[{ required: true, message: '请选择与户主关系' }]" @click="item.showPicker21 = true" />
							<van-popup v-model="item.showPicker21" position="bottom">
								<van-picker show-toolbar :columns="columns" @confirm="onConfirm21($event,item,'abm_ex1','showPicker21')"
									@cancel="item.showPicker21 = false" />
							</van-popup>

							<van-field v-model="item.abm_ex2" name="abm_ex2" label="身份证号" required
								placeholder="身份证号" :rules="[{ required: true, message: '请填写身份证号'}]"
								@blur='changeSfz2(item)' />

							<!-- <van-field readonly clickable name="abm_ex16" :value="item.abm_ex16" label="民族" required
								placeholder="点击选择民族" :rules="[{ required: true, message: '请选择民族'}]" @click="item.showPicker23 = true" />
							<van-popup v-model="item.showPicker23" position="bottom">
								<van-picker show-toolbar :columns="columns3" @confirm="onConfirm21($event,item,'abm_ex16','showPicker23')"
									@cancel="item.showPicker23 = false" />
							</van-popup> -->

							<van-field readonly clickable name="abm_ex5" :value="item.abm_ex5" label="性别" required
								placeholder="点击选择性别" :rules="[{ required: true, message: '请选择性别'}]" @click="item.showPicker22 = true" />
							<van-popup v-model="item.showPicker22" position="bottom">
								<van-picker show-toolbar :columns="columns2" @confirm="onConfirm21($event,item,'abm_ex5','showPicker22')"
									@cancel="item.showPicker22 = false" />
							</van-popup>

							<van-field v-model="item.abm_ex15" required name="abm_ex15" maxlength="30" label="工作单位" placeholder="工作单位" />
							<van-field v-model="item.abm_ex30" required name="abm_ex29" maxlength="30" label="单位地址" placeholder="单位地址" />
							

							<!-- <van-field v-if="typelx!='临时救助'" v-model="item.abm_ex29" type="number" name="abm_ex29" required
								label="年龄" placeholder="年龄" :rules="[{ required: true, message: '请填写年龄'}]" /> -->


							<!-- <van-field readonly clickable name="abm_ex7" :value="item.abm_ex7" label="户口性质" required
								placeholder="点击选择户口性质" :rules="[{ required: true, message: '请选择户口性质'}]" @click="item.showPicker24 = true" />
							<van-popup v-model="item.showPicker24" position="bottom">
								<van-picker show-toolbar :columns="columns4" @confirm="onConfirm21($event,item,'abm_ex7','showPicker24')"
									@cancel="item.showPicker24 = false" />
							</van-popup> -->

							<van-field readonly clickable name="abm_ex46" :value="item.abm_ex46" label="工作现状" required
								placeholder="点击选择工作现状" :rules="[{ required: true, message: '请选择工作现状'}]" @click="item.showPicker219 = true" />
							<van-popup v-model="item.showPicker219" position="bottom">
								<van-picker show-toolbar :columns="columns22" @confirm="onConfirm21($event,item,'abm_ex46','showPicker219')"
									@cancel="item.showPicker219 = false" />
							</van-popup>

							<van-field readonly clickable name="abm_ex28" required :value="item.abm_ex28" label="婚姻状况"
								placeholder="点击选择婚姻状况" :rules="[{ required: true, message: '请选择婚姻状况'}]" @click="item.showPicker26 = true" />
							<van-popup v-model="item.showPicker26" position="bottom">
								<van-picker show-toolbar :columns="columns6" @confirm="onConfirm21($event,item,'abm_ex28','showPicker26')"
									@cancel="item.showPicker26 = false" />
							</van-popup>

							<van-field readonly clickable name="abm_ex11" :value="item.abm_ex11" label="健康状况" required
								placeholder="点击选择健康状况" :rules="[{ required: true, message: '请选择健康状况'}]" @click="item.showPicker27 = true" />
							<van-popup v-model="item.showPicker27" position="bottom">
								<van-picker show-toolbar :columns="columns7" @confirm="changeJkzk($event,item,'abm_ex11','showPicker27')"
									@cancel="item.showPicker27 = false" />
							</van-popup>

							<van-field v-model="item.abm_ex10" required name="abm_ex10" maxlength="30" label="联系电话" placeholder="请填写联系电话" />
							<van-field v-model="item.abm_ex9" required name="abm_ex9" maxlength="30" label="户籍所在地" placeholder="请填写户籍所在地" />

							<van-field readonly clickable name="abm_ex52" required
								:value="item.abm_ex52" label="是否缴纳养老保险" placeholder="点击选择是否缴纳养老保险" :rules="[{ required: true, message: '请选择是否缴纳养老保险'}]"
								@click="item.showPicker28 = true" />
							<van-popup v-model="item.showPicker28" position="bottom">
								<van-picker show-toolbar :columns="columns33" @confirm="onConfirm21($event,item,'abm_ex52','showPicker28')"
									@cancel="item.showPicker28 = false" />
							</van-popup>
							
							<van-field  readonly clickable name="abm_ex39" required
								:value="item.abm_ex39" label="缴纳养老保险时间" placeholder="点击选择缴纳养老保险时间" :rules="[{ required: true, message: '请选择缴纳养老保险时间'}]"
								@click="item.showPicker220 = true" />
							<van-popup v-model="item.showPicker220" position="bottom">

								<!-- <van-picker show-toolbar :columns="columns23" @confirm="onConfirm21($event,item,'abm_ex39','showPicker220')"
									@cancel="item.showPicker220 = false" /> -->

							<van-datetime-picker v-model="currentDate" type="date" title="选择年月日" :min-date="minDate" 
							@confirm="onConfirm43($event,item,'abm_ex39','showPicker220')"
							  @cancel="item.showPicker220 = false"/>
							</van-popup>
							
							<van-field readonly clickable name="abm_ex52" required
								:value="item.abm_ex52" label="是否缴纳医疗保险" placeholder="点击选择是否缴纳医疗保险" :rules="[{ required: true, message: '请选择是否缴纳医疗保险'}]"
								@click="item.showPicker28 = true" />
							<van-popup v-model="item.showPicker28" position="bottom">
								<van-picker show-toolbar :columns="columns33" @confirm="onConfirm21($event,item,'abm_ex52','showPicker28')"
									@cancel="item.showPicker28 = false" />
							</van-popup>
							
							<van-field  readonly clickable name="abm_ex39" required
								:value="item.abm_ex39" label="缴纳医疗保险时间" placeholder="点击选择缴纳医疗保险时间" :rules="[{ required: true, message: '请选择缴纳医疗保险时间'}]"
								@click="item.showPicker220 = true" />
							<van-popup v-model="item.showPicker220" position="bottom">

								<!-- <van-picker show-toolbar :columns="columns23" @confirm="onConfirm21($event,item,'abm_ex39','showPicker220')"
									@cancel="item.showPicker220 = false" /> -->

							<van-datetime-picker v-model="currentDate" type="date" title="选择年月日" :min-date="minDate" 
							@confirm="onConfirm43($event,item,'abm_ex39','showPicker220')"
							  @cancel="item.showPicker220 = false"/>
							</van-popup>
							
							<van-field readonly clickable name="abm_ex52" required
								:value="item.abm_ex52" label="是否缴纳住房公积金" placeholder="点击选择是否缴纳住房公积金" :rules="[{ required: true, message: '请选择是否缴纳住房公积金'}]"
								@click="item.showPicker28 = true" />
							<van-popup v-model="item.showPicker28" position="bottom">
								<van-picker show-toolbar :columns="columns33" @confirm="onConfirm21($event,item,'abm_ex52','showPicker28')"
									@cancel="item.showPicker28 = false" />
							</van-popup>
							
							<van-field  readonly clickable name="abm_ex39" required
								:value="item.abm_ex39" label="缴纳住房公积金时间" placeholder="点击选择缴纳住房公积金时间" :rules="[{ required: true, message: '请选择缴纳住房公积金时间'}]"
								@click="item.showPicker220 = true" />
							<van-popup v-model="item.showPicker220" position="bottom">

								<!-- <van-picker show-toolbar :columns="columns23" @confirm="onConfirm21($event,item,'abm_ex39','showPicker220')"
									@cancel="item.showPicker220 = false" /> -->

							<van-datetime-picker v-model="currentDate" type="date" title="选择年月日" :min-date="minDate" 
							@confirm="onConfirm43($event,item,'abm_ex39','showPicker220')"
							  @cancel="item.showPicker220 = false"/>
							</van-popup>
								
							
							<van-field v-model="item.abm_ex17" type="number" name="abm_ex17" required
								label="月工薪收入(元)" placeholder="请填写月工薪收入" :rules="[{ required: true, message: '请填写月工薪收入'}]" />

							<van-field v-model="item.abm_ex17" type="number" name="abm_ex17" required
								label="月财产性收入(元)" placeholder="请填写月财产性收入" :rules="[{ required: true, message: '请填写月财产性收入'}]" />

							<van-field v-model="item.abm_ex17" type="number" name="abm_ex17" required
								label="月收入共计(元)" placeholder="请填写月收入共计" :rules="[{ required: true, message: '请填写月收入共计'}]" />


							<van-field readonly clickable name="abm_ex52" required
								:value="item.abm_ex52" label="是否在城区有私有产权房" placeholder="点击选择是否在城区有私有产权房" :rules="[{ required: true, message: '请选择是否在城区有私有产权房'}]"
								@click="item.showPicker28 = true" />
							<van-popup v-model="item.showPicker28" position="bottom">
								<van-picker show-toolbar :columns="columns33" @confirm="onConfirm21($event,item,'abm_ex52','showPicker28')"
									@cancel="item.showPicker28 = false" />
							</van-popup>

							<van-field v-model="item.abm_ex69" type="number" name="abm_ex69" label="房屋坐落" placeholder="请输入房屋坐落" @input='changeAmt' />
							<van-field v-model="item.abm_ex70" type="number" name="abm_ex70" label="建筑面积(m²)" placeholder="请输入建筑面积" @input='changeAmt' />
							<van-field v-model="item.abm_ex71" type="number" name="abm_ex71" label="户籍人数" placeholder="请输入户籍人数" />
							<van-field v-model="item.abm_ex70" type="number" name="abm_ex70" label="人均建筑面积(m²)" placeholder="请输入人均建筑面积" @input='changeAmt' />
							
							<van-field v-model="form.ab_ex8" center name="ab_ex8"  label="是否在城区承租公房或廉租房"  required
								:rules="[{ required: true, message: '请选择是否在城区承租公房或廉租房' }]">
								<template #input>
									<van-radio-group v-model="form.ab_ex122" direction="horizontal">
										<van-radio class="marginstyle" name="是">是</van-radio>
										<van-radio class="marginstyle" name="否">否</van-radio>
									</van-radio-group>
								</template>
							</van-field>

							<van-field readonly clickable name="abm_ex52" required
								:value="item.abm_ex52" label="申请之日前5年内是否有住房、买卖征收搬迁" placeholder="点击选择是否有住房、买卖征收搬迁" :rules="[{ required: true, message: '请选择是否在城区有私有产权房'}]"
								@click="item.showPicker28 = true" />
							<van-popup v-model="item.showPicker28" position="bottom">
								<van-picker show-toolbar :columns="columns33" @confirm="onConfirm21($event,item,'abm_ex52','showPicker28')"
									@cancel="item.showPicker28 = false" />
							</van-popup>

							<!-- <van-field v-if="item.abm_ex11 =='残疾'" readonly clickable name="abm_ex40" required
								:value="item.abm_ex40" label="残疾等级" placeholder="点击选择残疾等级" :rules="[{ required: true, message: '请选择残疾等级'}]"
								@click="item.showPicker221 = true" />
							<van-popup v-model="item.showPicker221" position="bottom">
								<van-picker show-toolbar :columns="columns24" @confirm="onConfirm21($event,item,'abm_ex40','showPicker221')"
									@cancel="item.showPicker221 = false" />
							</van-popup> -->
							
							<!-- <van-field v-if="typelx=='临时救助'" readonly clickable name="abm_ex47" required :value="item.abm_ex47" label="残疾状况"
								placeholder="点击选择残疾状况" :rules="[{ required: true, message: '请选择残疾状况'}]" @click="item.showPicker29 = true" />
							<van-popup v-model="item.showPicker29" position="bottom">
								<van-picker show-toolbar :columns="columns9" @confirm="onConfirm21($event,item,'abm_ex47','showPicker29')"
									@cancel="item.showPicker29 = false" />
							</van-popup> -->
							
							<!-- <van-field readonly clickable name="abm_ex51"
								:value="item.abm_ex51" label="特定对象" placeholder="点击选择特定对象" @click="item.showPicker213 = true" />
							<van-popup v-model="item.showPicker213" position="bottom">
								<van-picker show-toolbar :columns="columns13" @confirm="onConfirm21($event,item,'abm_ex51','showPicker213')"
									@cancel="item.showPicker213 = false" />
							</van-popup> -->
							

							<!-- <van-field readonly clickable name="abm_ex14" :value="item.abm_ex14"
								label="职业状况" placeholder="点击选择职业状况" @click="item.showPicker210 = true" />
							<van-popup v-model="item.showPicker210" position="bottom">
								<van-picker show-toolbar :columns="columns10" @confirm="onConfirm21($event,item,'abm_ex14','showPicker210')"
									@cancel="item.showPicker210 = false" />
							</van-popup> -->

							<!-- <van-field v-if="typelx=='特困供养' || typelx=='低保'" readonly clickable name="abm_ex30" :value="item.abm_ex30"
								label="自理能力" placeholder="点击选择自理能力" @click="item.showPicker222 = true" />
							<van-popup v-model="item.showPicker222" position="bottom">
								<van-picker show-toolbar :columns="columns32" @confirm="onConfirm21($event,item,'abm_ex30','showPicker222')"
									@cancel="item.showPicker222 = false" />
							</van-popup> -->

							


							<!-- <van-field  readonly required clickable name="abm_ex49" :value="item.abm_ex49"
								label="劳动能力" placeholder="点击选择劳动能力" :rules="[{ required: true, message: '请选择劳动能力'}]" @click="item.showPicker216 = true" />
							<van-popup v-model="item.showPicker216" position="bottom">
								<van-picker show-toolbar :columns="columns18" @confirm="onConfirm21($event,item,'abm_ex49','showPicker216')"
									@cancel="item.showPicker216 = false" />
							</van-popup> -->
<!-- 
							<van-field readonly clickable required name="abm_ex42" :value="item.abm_ex42"
								label="是否保障对象" placeholder="点击选择是否保障对象" :rules="[{ required: true, message: '请选择是否保障对象'}]" @click="item.showPicker212 = true" />
							<van-popup v-model="item.showPicker212" position="bottom">
								<van-picker show-toolbar :columns="columns12" @confirm="onConfirm21($event,item,'abm_ex42','showPicker212')"
									@cancel="item.showPicker212 = false" />
							</van-popup> -->

							

							

							<van-button block native-type="button" @click='page2FamilyDelMyself(index)'>删除</van-button>
							<div style="border-bottom: 10px solid #f3f3f3;"> </div>
						</div>
						<div style="display: flex;justify-content: center;">
							<van-button block native-type="button" @click='page2FamilyDel'>-</van-button>
							<van-button block native-type="button" @click='page2FamilyAdd'>+</van-button>
						</div>
					</van-form>
				</div>
				<!-- 非共同生活赡抚扶养人信息 -->
				<div class="page2ClassDiv">
					<!-- <div class="page2ClassDiv2"> -->
						<!-- <span class="page2ClassDiv2Font"></span> -->
						<!-- <span>直系亲属保障情况</span> -->
					<!-- </div> -->
					<div class="page1ClassDiv">
						&nbsp;&nbsp;&nbsp;&nbsp;<span class="page1ClassDivFont">直系亲属保障情况</span>
					</div>
					<van-form ref="rule3" >
						<div v-for="(item,index) in family2" :key='index'>
							

							<van-field readonly clickable name="abm_ex1" required :value="item.abm_ex1" label="与户主关系"
								placeholder="点击选择与户主关系" :rules="[{ required: true, message: '请选择与户主关系' }]" @click="item.showPicker21 = true" />
							<van-popup v-model="item.showPicker21" position="bottom">
								<van-picker show-toolbar :columns="columns27" @confirm="onConfirm21($event,item,'abm_ex1','showPicker21')"
									@cancel="item.showPicker21 = false" />
							</van-popup>

							<van-field v-model="item.abm_ex3" name="abm_ex3" maxlength="10" label="姓名" placeholder="姓名" required :rules="[{ required: true, message: '请填写姓名' }]">
								<!-- <template #button>
									<van-button size="small" type="info" native-type="button">拍照识别</van-button>
								</template> -->
							</van-field>

							<van-field v-model="item.abm_ex2" required name="abm_ex2" label="身份证号"
								placeholder="身份证号" :rules="[{ required: true, message: '请填写身份证号'}]" />

							<van-field v-model="item.abm_ex15" name="abm_ex15" maxlength="30" label="城区拥有住房情况" required placeholder="城区拥有住房情况" />

							<van-field v-model="item.abm_ex17" type="number" required name="abm_ex17" label="城区拥有住房套数"
								placeholder="城区拥有住房套数" :rules="[{ required: true, message: '请填写城区拥有住房套数'}]"
								@input='change2($event,item)' />
						
							<van-field v-model="item.abm_ex20" type="digit"
								name="abm_ex20" label="城区拥有住房面积(m²)" placeholder="城区拥有住房面积(m²)" required
								:rules="[{ required: true, message: '请填写城区拥有住房面积(m²)'}]" />

							<van-field v-model="item.abm_ex18" type="number"
								name="abm_ex18" label="城区拥有住房户籍人数" placeholder="城区拥有住房户籍人数" required
								:rules="[{ required: true, message: '请填写城区拥有住房户籍人数'}]" />


							<van-button block native-type="button" @click='page2FamilyDelMyself2(index)'>删除</van-button>
							<div style="border-bottom: 10px solid #f3f3f3;"> </div>
						</div>
						<div style="display: flex;justify-content: center;">
							<van-button block native-type="button" @click='page2FamilyDel2'>-</van-button>
							<van-button block native-type="button" @click='page2FamilyAdd2'>+</van-button>
						</div>
					</van-form>
				</div>
				
				<!-- 非共同生活赡抚养人家庭成员信息 -->
				

				<div style="width: 100%;position: fixed;bottom: 0px;text-align: center;display: flex;justify-content: space-around">
					<van-button block native-type="button" @click="back2">上一步</van-button>
					<van-button block type="info" native-type="button" @click="next2">下一步</van-button>
				</div>
			</div>
			<!-- 家庭前12个月总收入情况 -->
			<div id="page3" v-show="page3" class="page2Class">
			
				
				<div class="page2ClassDiv">
					<!-- <div class="page2ClassDiv2"> -->
						<!-- <span class="page2ClassDiv2Font"></span> -->
						<!-- <span>申请人家庭基本情况说明</span> -->
					<!-- </div> -->
					<div class="page1ClassDiv">
						&nbsp;&nbsp;&nbsp;&nbsp;<span class="page1ClassDivFont">申请人家庭基本情况说明</span>
					</div>
					<van-form ref="rule12">
						<van-field v-model="pay.abp_ex4" required name="abp_ex4" label="户籍地址"
							placeholder="请填写户籍地址" :rules="[{ required: true, message: '请填写户籍地址' }]" type="number" @input="paychange">
						</van-field>
						<van-field v-model="pay.abp_ex5" required name="abp_ex5" label="现有家庭人口"
							placeholder="请填写现有家庭人口" :rules="[{ required: true, message: '请填写现有家庭人口' }]" type="number" @input="paychange">
						</van-field>
						<van-field v-model="pay.abp_ex6" required name="abp_ex6" label="家庭月总收入(元)"
							placeholder="请填写家庭月总收入" :rules="[{ required: true, message: '请填写家庭月总收入' }]" type="number" @input="paychange">
						</van-field>

						<van-field v-model="pay.abp_ex7" required name="abp_ex7" label="人均月收入(元)"
							placeholder="请填写人均月收入" :rules="[{ required: true, message: '请填写人均月收入' }]" type="number" @input="paychange">
						</van-field>

						<van-field  clickable name="abp_ex9" required
							:value="pay.abp_ex9" label="是否拥有住房" placeholder="点击选择是否拥有住房" :rules="[{ required: true, message: '请选择是否拥有住房'}]"
							@click="showPicker52 = true" />
						<van-popup v-model="showPicker52" position="bottom">
							<van-picker show-toolbar :columns="columns33" @confirm="onConfirm21($event,item,'abp_ex9','showPicker52')"
								@cancel="showPicker52 = false" />
						</van-popup>
						<van-field  clickable name="abp_e10" required
							:value="pay.abp_e10" label="是否拥有汽车" placeholder="点击选择是否拥有汽车" :rules="[{ required: true, message: '请选择是否拥有汽车'}]"
							@click="showPicker52 = true" />
						<van-popup v-model="showPicker52" position="bottom">
							<van-picker show-toolbar :columns="columns33" @confirm="onConfirm21($event,item,'abp_e10','showPicker52')"
								@cancel="showPicker52 = false" />
						</van-popup>
						<van-field  clickable name="abp_e10" required
							:value="pay.abp_e10" label="是否有工商登记" placeholder="点击选择是否有工商登记" :rules="[{ required: true, message: '请选择是否有工商登记'}]"
							@click="showPicker52 = true" />
						<van-popup v-model="showPicker52" position="bottom">
							<van-picker show-toolbar :columns="columns33" @confirm="onConfirm21($event,item,'abp_e10','showPicker52')"
								@cancel="showPicker52 = false" />
						</van-popup>



						<van-field v-model="pay.abp_ex8" required name="abp_ex8" label="家庭成员缴纳社保人数"
							placeholder="家庭成员缴纳社保人数" :rules="[{ required: true, message: '请填写家庭成员缴纳社保人数' }]"  type="number">
						</van-field>

						<!-- <div class="page2ClassDiv2"> -->
							<!-- <span class="page2ClassDiv2Font"></span> -->
							<!-- <span>具结说明</span> -->
						<!-- </div> -->
						<div class="page1ClassDiv">
							&nbsp;&nbsp;&nbsp;&nbsp;<span class="page1ClassDivFont">具结说明</span>
						</div>
 
						<van-field v-model="pay.abp_ex11" rows="4" autosize  type="textarea" placeholder="其他需要说明的事项（含家庭其他主要收入、财产的说明、公司名称等相关情况）" />
						

						<div style="border-bottom: 10px solid #f3f3f3;"> </div>
						
						<van-field v-model="pay.abp_ex12" required label="具结说明人"  placeholder="请填写具结说明人" 
						:rules="[{ required: true, message: '请填写家庭成员缴纳社保人数' }]"/>

					</van-form>
				</div>

				<!-- 临时救助救助核算 -->
				<!-- <div v-if="typelx=='临时救助'"
					class="page2ClassDiv">
					<div class="page2ClassDiv2">
						<span class="page2ClassDiv2Font"></span>
						<span>救助核算</span>
					</div>
					<van-form >
						<div v-if="form.ab_ex122 == '因病支出型困难家庭'">
							<van-field v-model="form.ab_ex107" name="ab_ex107" label="自付医疗费用" placeholder="自付医疗费用"
								:rules="[{ required: true, message: '请填写自付医疗费用' }]" type="number"
								@input='changeInp'>
							</van-field>
							<van-field v-model="form.ab_ex108" name="ab_ex108" label="救助金额" placeholder="救助金额"
								:rules="[{ required: true, message: '请填写救助金额' }]" type="number"
								@input='getJZMoney2'>
							</van-field>
						</div>

						<div v-if="form.ab_ex122 == '因灾急难型困难家庭'">
							<van-field v-model="form.ab_ex109" name="ab_ex109" label="家庭财产损失金额" placeholder="家庭财产损失金额"
								:rules="[{ required: true, message: '请填写家庭财产损失金额' }]" type="number"
								@input='changeInp2'>
							</van-field>
							<van-field v-model="form.ab_ex110" name="ab_ex110" label="救助金额" placeholder="救助金额"
								:rules="[{ required: true, message: '请填写救助金额' }]" type="number"
								@input='getJZMoney3'>
							</van-field>
						</div>

						<div v-if="form.ab_ex122 == '发生人身伤害意外事件'">
							<van-field v-model="form.ab_ex111" name="ab_ex111" label="救助金额" placeholder="救助金额"
								:rules="[{ required: true, message: '请填写救助金额' }]" type="number"
								@input='changeInp3'>
							</van-field>
						</div>

						<div v-if="form.ab_ex122 == '因学支出型困难家庭'">

							<van-field name="ab_ex112" label="就读阶段" :rules="[{ required: true, message: '请选择就读阶段' }]">
								<template #input>
									<van-radio-group v-model="form.ab_ex112" direction="horizontal">
										<van-radio name="高中">高中</van-radio>
										<van-radio name="专科">专科</van-radio>
										<van-radio name="本科">本科</van-radio>
									</van-radio-group>
								</template>
							</van-field>
							<van-field v-model="form.ab_ex103" name="ab_ex103" label="救助金额" placeholder="救助金额"
								:rules="[{ required: true, message: '请填写救助金额' }]" type="number"
								@input='changeInp4'>
							</van-field>
						</div>

						<div v-if="form.ab_ex122 == '其他特殊原因致困'">
							<van-field v-model="form.ab_ex113" name="ab_ex113" label="原因" placeholder="原因"
								:rules="[{ required: true, message: '请填写原因' }]" type="number">
							</van-field>
							<van-field v-model="form.ab_ex114" name="ab_ex114" label="救助金额" placeholder="救助金额"
								:rules="[{ required: true, message: '请填写救助金额' }]" type="number">
							</van-field>
						</div>
						<div style="border-bottom: 10px solid #f3f3f3;"> </div>
					</van-form>
				</div> -->

				<!-- <div style="margin: 16px;display: flex;justify-content: space-around;"> -->
				<div style="width: 100%;position: fixed;bottom: 0px;text-align: center;display: flex;justify-content: space-around">
					<van-button block native-type="button" @click="back3">上一步</van-button>
					<van-button block type="info" native-type="button" @click="next5">下一步</van-button>
				</div>
			</div>
			<!-- 财产情况 -->
			<div id="page4" v-show="page4" class="page2Class">

				<div class="page2ClassDiv">
					<div class="page2ClassDiv2">
						<span class="page2ClassDiv2Font"></span>
						<span>金融资产</span>
					</div>
					<van-form style="margin-top: 20px;">
						<van-field v-model="form.ab_ex36" required name="ab_ex36" type="number" label="银行总存款" placeholder="银行总存款"
							:rules="[{ required: true, message: '请填写银行总存款' }]">
						</van-field>

						<van-field v-model="form.ab_ex60" required name="ab_ex60" type="number" label="有价证券" placeholder="有价证券"
							:rules="[{ required: true, message: '请填写有价证券' }]">
						</van-field>
						<van-field v-model="form.ab_ex61" required name="ab_ex61" type="number" label="债权" placeholder="债权"
							:rules="[{ required: true, message: '请填写债权' }]">
						</van-field>
						<van-field v-model="form.ab_ex37" required name="ab_ex37" type="number" label="其他金融产品" placeholder="其他金融产品"
							:rules="[{ required: true, message: '请填写其他金融产品' }]">
						</van-field>
						<van-field v-if="typelx!='临时救助' && typelx!='家庭边缘' && typelx!='支出型困难'" v-model="form.ab_ex38" name="ab_ex38"
							:label="typelx!='特困供养'?'低保标准':'生活补贴标准'" :placeholder="typelx!='特困供养'?'低保标准':'生活补贴标准'" disabled type="number">
						</van-field>
						<van-field v-if="typelx!='临时救助' && typelx!='家庭边缘' && typelx!='支出型困难'" v-model="form.ab_ex40" name="ab_ex40"
							:label="typelx!='特困供养'?'家庭月保障金额':'家庭每月生活补贴'" :placeholder="typelx!='特困供养'?'家庭月保障金额':'家庭每月生活补贴'"
							:rules="[{ required: true, message: '请填写家庭月保障金额(家庭每月生活补贴)' }]" type="number">
						</van-field>
						<div style="border-bottom: 10px solid #f3f3f3;"> </div>
					</van-form>
				</div>
				<!-- 拥有车船情况 -->
				<div class="page2ClassDiv">
					<div class="page2ClassDiv2">
						<span class="page2ClassDiv2Font"></span>
						<span>拥有车船情况</span>
					</div>
					<van-form style="margin-top: 20px;">
						<div v-for="(item,index) in estate" :key='index'>
							<van-field v-model="item.abe_ex1" name="abe_ex1" maxlength="30" label="车(船)主姓名" placeholder="车(船)主姓名" :rules="[{ required: true, message: '请填写车(船)主姓名' }]">
							</van-field>
							
							<van-field readonly clickable name="abe_ex2" :value="item.abe_ex2" label="购买时间"
								placeholder="点击选择购买时间" :rules="[{ required: true, message: '请填写购买时间' }]" @click="item.showPicker43 = true" />
							<van-popup v-model="item.showPicker43" position="bottom">
								<van-datetime-picker v-model="item.currentDate" type="date" :min-date="minDate" @confirm="onConfirm43($event,item)"
									@cancel="item.showPicker43 = false" />
							</van-popup>
							
							<van-field v-model="item.abe_ex3" name="abe_ex3" maxlength="30" label="用途" placeholder="用途"
								:rules="[{ required: true, message: '请填写用途' }]">
							</van-field>
							<van-field v-model="item.abe_ex4" name="abe_ex4" label="车(船)价值" placeholder="车(船)价值"
								:rules="[{ required: true, message: '请填写车(船)价值' }]" type="number">
							</van-field>
							<van-button block native-type="button" @click='page4FamilyDelMyself(index)'>删除</van-button>
							<div style="border-bottom: 10px solid #f3f3f3;"> </div>
						</div>
						<div style="display: flex;justify-content: center;">
							<van-button block native-type="button" @click='page4FamilyDel'>-</van-button>
							<van-button block native-type="button" @click='page4FamilyAdd'>+</van-button>
						</div>
					</van-form>
				</div>
				<!-- 拥有房产情况 -->
				<div class="page2ClassDiv">
					<div class="page2ClassDiv2">
						<span class="page2ClassDiv2Font"></span>
						<span>拥有房产情况</span>
					</div>
					<van-form style="margin-top: 20px;">
						<div v-for="(item,index) in estate2" :key='index'>
							<van-field v-model="item.abe_ex1" name="abe_ex1" maxlength="30" label="房屋产权人/共有人" placeholder="房屋产权人/共有人"
								:rules="[{ required: true, message: '请填写房屋产权人/共有人' }]">
							</van-field>
							
							<van-field readonly clickable name="abe_ex2" :value="item.abe_ex2" label="购(建)房时间"
								placeholder="点击选择购(建)房时间" @click="item.showPicker43 = true" />
							<van-popup v-model="item.showPicker43" position="bottom">
								<van-datetime-picker v-model="item.currentDate" type="date" :min-date="minDate" @confirm="onConfirm43($event,item)"
									@cancel="item.showPicker43 = false" />
							</van-popup>
							
							<van-field v-model="item.abe_ex5" name="abe_ex5" maxlength="30" label="房屋地址" placeholder="房屋地址"
								:rules="[{ required: true, message: '请填写房屋地址' }]">
							</van-field>
							<van-field v-model="item.abe_ex6" name="abe_ex6" label="建筑面积(平方)" placeholder="建筑面积(平方)" type="number"
								:rules="[{ required: true, message: '请填写建筑面积(平方)' }]">
							</van-field>
							<van-field v-model="item.abe_ex4" name="abe_ex4" label="购置价/建造价" placeholder="购置价/建造价" type="number"
								:rules="[{ required: true, message: '请填写购置价/建造价' }]">
							</van-field>
							<!--  -->
							<!-- <van-field readonly clickable name="abe_ex11" :value="item.abe_ex11" label="房屋性质"
								placeholder="点击选择房屋性质" @click="item.showPicker41 = true" />
							<van-popup v-model="item.showPicker41" position="bottom">
								<van-picker show-toolbar :columns="columns14" @confirm="onConfirm21($event,item,'abe_ex11','showPicker41')"
									@cancel="item.showPicker41 = false" />
							</van-popup> -->

							<!-- <van-field readonly clickable name="abe_ex12" :value="item.abe_ex12" label="房屋来源"
								placeholder="点击选择房屋来源" @click="item.showPicker42 = true" />
							<van-popup v-model="item.showPicker42" position="bottom">
								<van-picker show-toolbar :columns="columns15" @confirm="onConfirm21($event,item,'abe_ex12','showPicker42')"
									@cancel="item.showPicker42 = false" />
							</van-popup> -->

							<van-button block native-type="button" @click='page4FamilyDelMyself2(index)'>删除</van-button>
							<div style="border-bottom: 10px solid #f3f3f3;"> </div>
						</div>
						<div style="display: flex;justify-content: center;">
							<van-button block native-type="button" @click='page4FamilyDel2'>-</van-button>
							<van-button block native-type="button" @click='page4FamilyAdd2'>+</van-button>
						</div>
					</van-form>
				</div>
				<div class="page4Img">
					<div class="page4Img2">
						<div class="page4Img2Font">房屋整体照片:</div>
						<div class="page4Img2Div">
							<div style="position:relative;width:91%;float: left;">
								<van-uploader v-model="fileList6" :before-read="beforeRead" :after-read="uploadImg(6)" :before-delete="beforeDelete('ab_ex166')" />
							</div>
						</div>
					</div>
					<div class="page4Img2">
						<div class="page4Img2Font">房屋室内照片:</div>
						<div class="page4Img2Div">
							<div style="position:relative;width:91%;float: left;">
								<van-uploader v-model="fileList7" :before-read="beforeRead" :after-read="uploadImg(7)" :before-delete="beforeDelete('ab_ex167')" />
							</div>
						</div>
					</div>
				</div>
				<div class="page4Img">
					<div class="page4Img2">
						<div class="page4Img2Font">房产材料照片:</div>
						<div class="page4Img2Div">
							<div style="position:relative;width:91%;float: left;">
								<van-uploader v-model="fileList8" :before-read="beforeRead" :after-read="uploadImg(8)" :before-delete="beforeDelete('ab_ex168')" />
							</div>
						</div>
					</div>
					<div class="page4Img2">
						<div class="page4Img2Font">车船材料照片:</div>
						<div class="page4Img2Div">
							<div style="position:relative;width:91%;float: left;">
								<van-uploader v-model="fileList9" :before-read="beforeRead" :after-read="uploadImg(9)" :before-delete="beforeDelete('ab_ex169')" />
							</div>
						</div>
					</div>
				</div>
				<!-- <div style="margin: 16px;display: flex;justify-content: space-around;"> -->
				<div style="width: 100%;position: fixed;bottom: 0px;text-align: center;display: flex;justify-content: space-around">
					<van-button block native-type="button" @click="back3">上一步</van-button>
					<van-button block type="info" native-type="button" @click="next4">下一步</van-button>
				</div>
			</div>
			<!-- 授权书 -->
			<!--授权书编号 <td v-for="(item,index) in form.ab_ex85.split('')">{{item}}</td> -->
			<div id="page5" v-show="page5" class="page2Class">
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

			<div id="page6" v-show="page6" class="page6Div">
				<div class="page6Div2">
					<div class="page1ClassDiv">
						&nbsp;&nbsp;&nbsp;&nbsp;<span class="page1ClassDivFont">照片</span>
					</div>
					<div class="page6Div3">
						<div class="page6Div3Font">申请人身份证照片:</div>
						<div class="page4Img2Div">
							<div style="position:relative;width:100%;float: left;">
								<div class="page6Div3Img">
									<van-uploader v-model="fileList" :before-read="beforeRead" :max-count="1" :after-read="uploadImg(1)" :before-delete="beforeDelete('ab_ex10_1')" />

									<br>
									<span>上传身份证正面</span>
								</div>

								<div class="page6Div3Img2">
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
						<div class="page6Div3Font">授权书:</div>
						<div class="page4Img2Div">
							<div style="position:relative;width:100%;float: left;">
								<div class="page6Div3Img">
									<van-uploader v-model="fileList3" :before-read="beforeRead" :max-count="1" :after-read="uploadImg(3)" :before-delete="beforeDelete('ab_ex73')" />

									<br>
									<span>上传授权书照片</span>
								</div>

								<div class="page6Div3Img2">
									<van-uploader v-model="fileList4" :before-read="beforeRead" :max-count="1" :after-read="uploadImg(5)" :before-delete="beforeDelete('ab_ex97')" />
									<br>
									<span>上传公示图片</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- <div class="page6Div4">
					<div class="page6Div3">
						<div class="page6Div3Font">自理能力评估报告与集中供养意愿书:</div>
						<div class="page4Img2Div">
							<div style="position:relative;width:100%;float: left;">
								<div class="page6Div3Img">
									<van-uploader v-model="fileList11" :before-read="beforeRead" :max-count="1" :after-read="uploadImg(11)" :before-delete="beforeDelete('ab_ex196')" />

									<br>
									<span>上传自理能力评估报告</span>
								</div>

								<div class="page6Div3Img2">
									<van-uploader v-model="fileList12" :before-read="beforeRead" :max-count="1" :after-read="uploadImg(12)" :before-delete="beforeDelete('ab_ex197')" />
									<br>
									<span>上传集中供养意愿书</span>
								</div>
							</div>
						</div>
					</div>
				</div> -->

				<div class="page6Div5">
					<div class="page4Img2Font">其他证明材料:</div>
					<div class="page4Img2Div">
						<div style="position:relative;width:91%;float: left;">
							<van-uploader v-model="fileList5" :before-read="beforeRead" :after-read="uploadImg(4)" :before-delete="beforeDelete('ab_ex16')" />
						</div>
					</div>
				</div>
				<!-- 核查结果 -->

				<!-- <div class="page2ClassDiv">
					<div class="page2ClassDiv2">
						<span class="page2ClassDiv2Font"></span>
						<span>核查结果(不属实将自动生成诚信记录)</span>
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
				</div> -->
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
	import {tszfValidate,tszfFilter,tszfFilter2,getSex,getAge,nation,isCardID,xzqh,compressImg} from '@/utils/utils.js'
	// import html2canvas from "html2canvas"
	export default {
		data() {
			return {
				checkbox: false,//我已知晓


				typelx: this.$route.query.type,
				sslbDisabled1:false,
				sslbDisabled2:false,
				sslbDisabled3:false,
				sslbDisabled4:false,
				sslbDisabled5:false,
				sslbDisabled6:false,
				sslbDisabled7:false,
				sslbDisabled8:false,
				sslbDisabled9:false,
				sslbDisabled10:false,
				sslbDisabled11:false,
				sslbDisabled12:false,

				isShow0: true,
				isShow1: false,
				isShow2: false,
				isShow3: false,
				isShow4: false,
				isShow5: false,
				isShow6: false,
				page0: true,
				page1: false,
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
				fileList6: [],
				fileList7: [],
				fileList8: [],
				fileList9: [],
				fileList10: [],
				fileList11: [],
				fileList12: [],
				ab_ex85_2: '',
				isZjfw: false,
				ab_ex108_2:'',
				ab_ex110_2:'',
				ab_ex158:[],
				ab_ex145: [],
				showPicker61: false,
				ab_ex46: [], //复选保存后转字符串
				ab_ex106: [],
				form: {
					ab_ex75: '',
					ab_ex3: '',
					ab_ex7: '',
					ab_ex162: '',
					ab_ex162_2: '',
					ab_ex162_3:'', 
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
					// ab_ex46_: '',
					ab_ex106: '',
					ab_ex93: '',
					// ab_ex123: '',
					// ab_ex13: [],
					ab_ex13: '',
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
					ab_ex71: '',
					ab_ex122: '',
					// resultImg: '',
					ab_ex81: '',
					ab_ex107: '',
					ab_ex108: '',
					ab_ex109: '',
					ab_ex110: '',
					ab_ex111: '',
					ab_ex112: '',
					ab_ex113: '',
					ab_ex114: '',
					ab_ex103: '',
					ab_ex158: '',
					ab_ex145: '',
					safeguard: '',
					ab_ex193: '',
					ab_ex194: '',
					ab_ex195: '',
					ab_ex196: '',
					ab_ex218: '',
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
				family: [{
					abm_ex3: '',
					abm_ex1: '',
					showPicker21: false,
					showPicker22: false,
					showPicker23: false,
					showPicker24: false,
					// showPicker25: false,
					showPicker26: false,
					showPicker27: false,
					showPicker28: false,
					showPicker29: false,
					showPicker210: false,
					// showPicker211: false,
					showPicker212: false,
					showPicker213: false,
					// showPicker214: false,
					// showPicker215: false,
					showPicker216: false,
					showPicker217: false,
					// showPicker218: false,
					showPicker219: false,
					showPicker220: false,
					showPicker221: false,
					showPicker222: false,
					abm_ex15: '',
					abm_ex17: '',
					abm_ex2: '',
					abm_ex29: '',
					abm_ex5: '',
					abm_ex16: '',
					abm_ex7: '',
					// abm_ex48: '',
					abm_ex46:'',
					abm_ex28: '',
					abm_ex11: '',
					abm_ex52: '',
					abm_ex39: '',
					abm_ex47: '',
					abm_ex51: '',
					// abm_ex8: '',
					// abm_ex30: '',
					abm_ex49: '',
					abm_ex50: '',
					// abm_ex32: '',
					abm_ex42: '',
					abm_ex14: '',
					abm_ex30: '',
					abm_ex69: '',
					abm_ex70: '',
					abm_ex71: '',
					// resultImg: '', //签名图片
					// resultImgId: '', //签名id
					abm_ex6:"Y",
				}],
				columnsType:['城区户籍城镇村民','新就业无房职工','引进人才','其他进城务工人员','其他外来地来主城区工作人员'],
				columns: ['户主本人', '配偶', '子女', '父母','兄弟姐妹','孙子女','其他'],
				columns2: ['男', '女'],
				columns3: nation,
				columns4: ['农业户口', '非农业户口'],
				// columns5: ['老年人', '未成年人', '成年人'],
				columns6: ['未婚', '已婚', '离异', '丧偶'],
				columns7: ['健康', '重病', '残疾'],
				columns8: ['','白血病', '终末期肾病', '恶性肿瘤', '器官移植后抗排异药物治疗', '再生障碍性贫血', '系统性红斑狼疮（活动期或伴有脏器损害）', '血友病', '肝硬化失代偿期',
					'重症类风湿关节炎', '强直性脊柱炎', '糖尿病合并严重并发症（限晚期糖尿病肾病、糖尿病足〈有坏疽、 深部溃疡、脓肿、骨髓炎〉患者）', '艾滋病机会感染', '慢性阻塞性肺疾病', '尘肺',
					'地中海贫血', '克罗恩病', '渐冻人病','其他'
				],
				columns9: ['非残疾', '轻残', '重残'],
				columns10: ['','在职职工', '灵活就业人员', '登记失业人员', '失业未登记人员', '无就业条件'],
				// columns11: ['老年人', '未成年人', '重病', '重残', '独居', '归侨', '退役军人'],
				columns12: ['是', '否'],
				columns13: ['','老年人', '未成年人','独居', '归侨','散居归侨侨属','少数民族','重病', '重残','退役军人','军转干部','已故原工商业者无工作的配偶','艾滋病患者', '易肇事肇祸精神病人', '两牢释放人员', '社区矫正人员', '建国前老党员','高校毕业生','宗教教职人员','未成年时在保的学生'],
				// columns14: ['自有私房', '租用公房', '租用私房', '临时搭建房', '借用房', '其他'],
				// columns15: ['自购房', '自建房', '回迁房', '承租公房', '其他'],
				columns16: ['属实', '不属实', '转其他救助'],
				// columns17: ['自理', '失能', '半失能'],
				columns18: ['有劳动能力', '部分丧失劳动能力', '完全丧失劳动能力'],
				columns19: ['无生活来源', '收入低于低保标准'],
				// columns20: ['无赡扶抚养人', '义务人无履行义务能力'],
				columns21: ['父母', '配偶', '子女', '兄弟姐妹', '其他'],
				columns22: ['企业', '个体工商户','灵活就业','退休','机关事业单位'],
				columns23: ['','肢体','精神','智力','盲视力','言语','听力'],
				columns24: ['','一级','二级','三级','四级'],
				columns25: ['父母', '配偶', '子女', '兄弟姐妹','孙子女','其他'],
				columns26: ['健康', '重病', '重残'],
				columns27: ['申请人父亲','申请人母亲','申请人配偶父亲','申请人配偶母亲', '子(女)' ],
				columns28: ['工资', '奖金', '津贴', '补贴','福利','其他劳动收入'],
				columns29: ['经营性净收入'],
				columns30: ['土地和房屋出租收入', '存款及利息', '有价证券及红利', '其他投资收入','知识产权收入','财产变卖收入','其他财产性收入'],
				columns31: ['养老金或离退休金', '基本生活费', '失业保险金', '保险收入','赔偿收入','捐赠收入','遗产收入','赡（扶、抚）养收入','一次性安置费和经济补偿金'],
				columns32: ['正常自理', '部分丧失', '完全丧失'],
				columns33: ['是','否'],
				family2: [{
					abm_ex3: '',
					abm_ex1: '',
					showPicker21: false,
					// showPicker22: false,
					// showPicker25: false,
					showPicker26: false,
					showPicker27: false,
					showPicker216: false,
					showPicker29: false,
					// showPicker210: false,
					// showPicker214: false,
					abm_ex15: '',
					abm_ex17: '',
					abm_ex2: '',
					// abm_ex5: '',
					// abm_ex48: '',
					abm_ex28: '',
					abm_ex11: '',
					abm_ex49: '',
					// abm_ex47: '',
					// abm_ex21: '',
					// abm_ex9: '',
					// abm_ex10: '',
					abm_ex20: '',
					abm_ex18: '',
					// abm_ex14: '',
					// resultImg: '', //签名图片
					// resultImgId: '', //签名id
					abm_ex6:"N",
				}],
				pay:{
					abp_ex4:'',
					abp_ex5:'',
					abp_ex6:'',
					abp_ex7:'',
					abp_ex8:'',
					abp_ex9:'',
					abp_ex10:'',
					abp_ex11:'',
					abp_ex12:'',
				},
				// family3:[],
				family4:[],
				family5:[],
				
				// income各种收入的数组，占位用的
				income1:[{
					abi_ex1:"",
					abi_ex2:"",
					abi_ex3:"工资性收入",
					abi_ex4: "A",
					abi_ex5: "",
					showPicker31: false,
				}],
				// 对收入数据删除、新增操作用的数组
				income2:[{
					abi_ex1:"",
					abi_ex2:"",
					abi_ex3:"经营净收入",
					abi_ex4: "B",
					abi_ex5: "",
					showPicker31: false,
				}],
				income3:[{
					abi_ex1:"",
					abi_ex2:"",
					abi_ex3:"财产净收入",
					abi_ex4: "C",
					abi_ex5: "",
					showPicker31: false,
				}],
				income4:[{
					abi_ex1:"",
					abi_ex2:"",
					abi_ex3:"转移净收入",
					abi_ex4: "D",
					abi_ex5: "",
					showPicker31: false,
				}],
				income5:[{
					abi_ex1:"其他收入",
					abi_ex2:"",
					abi_ex3:"其他收入",
					abi_ex4: "E",
					abi_ex5: "",
				}],
				income6:[{
					abi_ex1:"必要就业成本抵扣",
					abi_ex2:"",
					abi_ex3:"必要就业成本抵扣",
					abi_ex4: "F",
					abi_ex5: "",
				}],
				income7:[{
					abi_ex1:"总收入",
					abi_ex2:"",
					abi_ex3:"总收入",
					abi_ex4: "G",
					abi_ex5: ""
				},{
					abi_ex1:"家庭月平均收入",
					abi_ex2:"",
					abi_ex3:"总收入",
					abi_ex4: "G",
					abi_ex5: ""
				},{
					abi_ex1:"家庭月人均收入",
					abi_ex2:"",
					abi_ex3:"总收入",
					abi_ex4: "G",
					abi_ex5: ""
				}],
				
				// 财产情况拥有车船情况
				estate: [{
					abe_ex1: '',
					// abe_ex8: '',
					// abe_ex9: '',
					// abe_ex10: '',
					abe_ex3: '',
					abe_ex2: '',
					abe_ex4: '',
					abe_ex7: '车船',
					currentDate : new Date(),
					showPicker43: false,
				}],
				estate2: [{
					abe_ex1: '',
					abe_ex4: '',
					abe_ex5: '',
					abe_ex6: '',
					// abe_ex11: '',
					// abe_ex12: '',
					abe_ex2: '',
					abe_ex7: '房屋',
					currentDate : new Date(),
					// showPicker41: false,
					// showPicker42: false,
					showPicker43: false,
					
				}],

				showPicker51: false,
				// 签名
				// 选项列表，children 代表子选项，支持多级嵌套
				options: xzqh,
				minDate: new Date(1950,0,1),	

				showPicker82:false,
				sex:'1',
				maritalStatus:['未婚','已婚','离异','丧偶'],
				showPicker83:false,

				minDate: new Date(1990, 0, 1),
				// maxDate: new Date(2025, 10, 1),
				currentDate: new Date(),
				showPicker52: false,
				
			}
		},
		created() {
			this.getBasic()
			this.loadFamily('Y')
			this.loadFamily2("N")
			this.loadFamily4("B")
			this.loadFamily5("C")
			this.loadPay()
			this.loadIncome()
		},
		methods: {

			// 婚姻状况
			onConfirm83(value) {
				console.log(value);
				this.form.ab_ex83 = value;
				this.showPicker83 = false;
			},

			// 申请人类型
			onConfirm82(value) {
				console.log(value);
				this.form.ab_ex82 = value;
				this.showPicker82 = false;
			},


			hold(){
				// 到最后的保存则首页的自愿放弃图片,退回描述需要删除
				this.form.ab_ex175 = ''
				this.form.ab_ex178 = ''
				
				
				// 民主评议可以不传
				// this.form.ab_ex13 = ''
				this.form.ab_ex17 = '泰州市姜堰区社会救助综合平台'
				this.form.ab_ex46 = this.ab_ex46.join(',')
				this.form.ab_ex106 = this.ab_ex106.join(',')
				this.form.stype = this.$route.query.type
				if(this.ab_ex158.length>0){
					this.form.ab_ex158 = this.ab_ex158.join(',')
				}
				if(this.ab_ex145.length>0){
					this.form.ab_ex145 = this.ab_ex145.join(',')
				}
				let memeber = this.family.concat(this.family2).concat(this.family4).concat(this.family5)
				let estate = this.estate.concat(this.estate2)
				let warning2 = []
				this.warning.forEach((value,index)=>{
					if(value.aw_ex1 && value.aw_dat1){
						value.aw_ex1 = value.aw_ex1.replace(/\s*/g,"")
						value.aw_ex1 = tszfFilter2(value.aw_ex1)
						warning2.push(value)
						if(index == this.warning.length-1){
							request({
								method: 'post',
								url: '/social/assistanceWeixin/saveBasic',
								data: {
									'data': '[' + JSON.stringify(this.form) + ']',
									'member': JSON.stringify(memeber),
									'pay': JSON.stringify([this.pay]),
									'estate': JSON.stringify(estate),
									'waring': JSON.stringify(warning2),
									'isHc': "Y",
									'isCf': 'Y',
									'type': '核查'
								},
								headers: {
									'token': sessionStorage.getItem('token')
								}
							}).then(res => {
								if(res[0].status!='ok'){
									
									console.log(res[0].ab_id);
									this.$dialog.alert({
										  message: res[0].msg,
										}).then(()=>{
										})
								}else
									this.form.ab_id=res[0].ab_id;
							}).catch(error => {
								console.log(error)
							})
						}
					}else if(index == this.warning.length-1){
						request({
							method: 'post',
							url: '/social/assistanceWeixin/saveBasic',
							data: {
								'data': '[' + JSON.stringify(this.form) + ']',
								'member': JSON.stringify(memeber),
								'pay': JSON.stringify([this.pay]),
								'estate': JSON.stringify(estate),
								'waring': JSON.stringify(warning2),
								'isHc': "Y",
								'isCf': 'Y',
								'type': '核查'
							},
							headers: {
								'token': sessionStorage.getItem('token')
							}
						}).then(res => {
							if(res[0].status!='ok'){
								
								console.log(res[0].ab_id);
								this.$dialog.alert({
										message: res[0].msg,
									}).then(()=>{
									})
							}else
								this.form.ab_id=res[0].ab_id;
						}).catch(error => {
							console.log(error)
						})
					}
				})
			},

			next0() {
				if(this.checkbox == true){
						// this.$refs.rule1.validate().then(()=>{
							// this.hold()
							this.page0 = false
							this.page1 = true
							this.page2 = false
							this.isShow0 = false
							this.isShow1 = true
							document.getElementsByClassName('dbjz')[0].scrollTop = 0
						// }).catch(err=>{
						// 	this.$toast.fail(err[0].message)
						// })
					}else{
						this.$toast.fail('请勾选我已知晓！')
					}

			},

			next1() {
				this.getBasicIdNum(1)

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
				// 判断家庭人口是否大于20
				// if(this.form.ab_ex5>20){
				// 	this.$toast.fail("家庭人口不能超过20")
				// 	return false
				// }
				// 过滤家庭住址特殊字符和空格
				this.form.ab_ex11 = this.form.ab_ex11.replace(/\s*/g,"")
				this.form.ab_ex11 = tszfFilter2(this.form.ab_ex11)
				// 过滤退回描述特殊字符和空格
				this.form.ab_ex178 = this.form.ab_ex178.replace(/\s*/g,"")
				this.form.ab_ex178 = tszfFilter2(this.form.ab_ex178)

				// 过滤不诚信原因特殊字符和空格
				this.form.ab_ex80 = this.form.ab_ex80.replace(/\s*/g,"")
				this.form.ab_ex80 = tszfFilter2(this.form.ab_ex80)
				
				// 过滤开户银行特殊字符和空格
				this.form.ab_ex42 = this.form.ab_ex42.replace(/\s*/g,"")
				this.form.ab_ex42 = tszfFilter(this.form.ab_ex42)
				// 过滤开户人特殊字符和空格
				this.form.ab_ex8 = this.form.ab_ex8.replace(/\s*/g,"")
				this.form.ab_ex8 = tszfFilter(this.form.ab_ex8)
				// 过滤求助描述特殊字符和空格
				this.form.ab_ex93 = this.form.ab_ex93.replace(/\s*/g,"")
				this.form.ab_ex93 = tszfFilter2(this.form.ab_ex93)
				// 验证联系电话
				let myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
				if (!myreg.test(this.form.ab_ex28)) {
					this.$toast.fail('请填写正确的联系电话')
					return false
				}
				// if(this.typelx=='特困供养' && this.form.ab_ex71 == '集中' && this.form.ab_ex195== ''){
				// 	this.$message.warning("请输入特困供养机构");
				// 	return false
				// }
				
				// 过滤预警特殊字符和空格
				// this.warning.forEach((value,index)=>{
				// 	if(value.aw_ex1 && value.aw_dat1){
				// 		value.aw_ex1 = value.aw_ex1.replace(/\s*/g,"")
				// 		value.aw_ex1 = tszfFilter2(value.aw_ex1)
				// 	}
					
				// })
				// 验证是否选择了ab_ex46,用rules在上面验证会一直提示
				// if(this.ab_ex46.length == 0){
				// 	this.$toast.fail('请选择原因分类')
				// 	return false
				// }
				// 验证求助类别是否已经申请
				// request({
				// 	method:'post',
				// 	url: '/social/assistanceWeixin/checkRepeat',
				// 	data:{
				// 		ab_ex13:this.form.ab_ex13,
				// 		ab_ex7:this.form.ab_ex7,
				// 		ab_ex3:this.form.ab_ex3,
				// 		ab_id:this.form.ab_id,
				// 	}
				// }).then(res=>{
					// if(res[0].status == '+OK'){
						this.$refs.rule1.validate().then(()=>{
							this.hold()
							this.page1 = false
							this.page2 = true
							this.isShow1 = false
							this.isShow2 = true
							document.getElementsByClassName('dbjz')[0].scrollTop = 0
						}).catch(err=>{
							this.$toast.fail(err[0].message)
						})
					// }else{
					// 	this.$toast.fail(res[0].msg)
					// }
				// }).catch(error=>{
				// 	this.$toast.fail('数据请求失败')
				// })
				
			},
			familyValidate(){
				return new Promise(resolve=>{
					if(this.family.length == 0){
						this.$toast.fail('共同家庭生活成员不能为空')
						resolve(false)
					}else{
						console.log(this.family.length)
						let hzbr = 0
						for(let i =0;i<this.family.length;i++){
							this.form.safeguard = 0
							if(this.family[i].abm_ex42 == '是'){
								this.form.safeguard += 1
							}
							this.$refs.rule2.validate().then(()=>{
								if(this.family[i].abm_ex1=='户主本人'){
									hzbr++
									if(hzbr>1){
										this.$toast.fail("共同家庭生活成员只能有一个户主本人");
										resolve(false)
									}
									if(this.$route.query.type == '低保' || this.$route.query.type == '特困供养'){
										if(this.family[i].abm_ex42 != '是'){
											this.$toast.fail("共同家庭生活成员户主本人必须是保障对象");
											resolve(false)
										}
									}
								}
								if(i+1 == this.family.length && hzbr == 0){
									this.$toast.fail("共同家庭生活成员需要一个户主本人");
									resolve(false)
								}
								if(this.$route.query.type == '家庭边缘' || this.$route.query.type == '支出型困难'){
									if(this.family[i].abm_ex42 != '是'){
										this.$toast.fail("共同家庭生活成员必须是保障对象");
										resolve(false)
									}
								}
								// if(this.family[0].abm_ex1 != '户主本人'){
								// 	this.$toast.fail('共同家庭生活成员第'+parseInt(i+1)+"位必须为户主本人")
								// 	resolve(false)
								// }else if(i!=0 && this.family[i].abm_ex1 == '户主本人'){
								// 	this.$toast.fail('共同家庭生活成员第'+parseInt(i+1)+"位不能是户主本人，必须第一行为户主本人")
								// 	resolve(false)
								// }
								// 去除姓名的空白符号并且判断姓名是否合法
								this.family[i].abm_ex3 = this.family[i].abm_ex3.replace(/\s*/g,"")
								let tszf = tszfValidate(this.family[i].abm_ex3)
								if(tszf){
									this.$toast.fail('共同家庭生活成员第'+parseInt(i+1)+"位请输入正确的姓名")
									resolve(false)
								}
								else if(isCardID(this.family[i].abm_ex2)){
									this.$toast.fail('共同家庭生活成员第'+parseInt(i+1)+'位'+isCardID(this.family[i].abm_ex2))
									resolve(false)
								}
								else if(parseInt(this.family[i].abm_ex29) > 200){
									this.$toast.fail('共同家庭生活成员第'+parseInt(i+1)+'位年龄不能超过200')
									resolve(false)
								}
								else if((parseInt(this.family[i].abm_ex29) > 60 || parseInt(this.family[i].abm_ex29) < 18 ) && !this.family[i].abm_ex51 ){
									this.$toast.fail('共同家庭生活成员第'+parseInt(i+1)+'位请选择特定对象')
									resolve(false)
								}
								
								
								// else if(!this.family[i].resultImg){
								// 	this.$toast.fail('共同家庭生活成员第'+parseInt(i+1)+'位请签名')
								// 	resolve(false)
								// }
								else if(this.family[i].abm_ex46 == '是' && !this.family[i].abm_ex14){
									this.$toast.fail('共同家庭生活成员第'+parseInt(i+1)+'位属于劳动年龄时请选择职业状况')
									resolve(false)
								}else if(i == this.family.length-1){
									// 过滤工作单位特殊字符和空格
									this.family[i].abm_ex15 = this.family[i].abm_ex15.replace(/\s*/g,"")
									this.family[i].abm_ex15 = tszfFilter(this.family[i].abm_ex15)
									console.log('返回true')
									resolve(true)
									
								}
							}).catch(err=>{
								console.log(err)
								this.$toast.fail('共同家庭生活成员第'+parseInt(i+1)+'位'+err[0].message)
								resolve(false)
							})
						}
						
					}
				})
			},
			family2Validate(){
				return new Promise(resolve=>{
					if(this.family2.length == 0){
						resolve(true)
					}else{
						for(let i =0;i<this.family2.length;i++){
							console.log(this.family2[i])
							this.$refs.rule3.validate().then(()=>{
								// 去除姓名的空白符号并且判断姓名是否合法
								this.family2[i].abm_ex3 = this.family2[i].abm_ex3.replace(/\s*/g,"")
								let tszf = tszfValidate(this.family2[i].abm_ex3)
								if(tszf){
									this.$toast.fail('非共同生活赡抚扶养人信息第'+parseInt(i+1)+"位请输入正确的姓名")
									resolve(false)
								}
								else if(isCardID(this.family2[i].abm_ex2)){
									this.$toast.fail('非共同生活赡抚扶养人信息第'+parseInt(i+1)+'位'+isCardID(this.family2[i].abm_ex2))
									resolve(false)
								}
								// 判断家庭人口是否大于20
								else if(this.family2[i].abm_ex20>20){
									this.$toast.fail('非共同生活赡抚扶养人信息第'+parseInt(i+1)+"家庭总人口不能超过20")
									return false
								}
								// else if(!this.family2[i].resultImg){
								// 	this.$toast.fail('非共同生活赡抚扶养人信息第'+parseInt(i+1)+'位请签名')
								// 	resolve(false)
								// }
								else if(i == this.family2.length-1){
									// 过滤工作单位特殊字符和空格
									this.family2[i].abm_ex15 = this.family2[i].abm_ex15.replace(/\s*/g,"")
									this.family2[i].abm_ex15 = tszfFilter(this.family2[i].abm_ex15)
									console.log('f2返回tRUE')
									resolve(true)
									// this.page2 = false
									// this.page3 = true
									// this.isShow2 = false
									// this.isShow3 = true
								}
							}).catch(err=>{
								this.$toast.fail('非共同生活赡抚扶养人信息第'+parseInt(i+1)+'位'+err[0].message)
								resolve(false)
							})
						}
						
					}
				})
			},
			
			family4Validate(){
				return new Promise(resolve=>{
					if(this.family4.length == 0){
						console.log('f4返回true')
						resolve(true)
					}else{
						for(let i =0;i<this.family4.length;i++){
							this.$refs.rule4.validate().then(()=>{
								// 去除姓名的空白符号并且判断姓名是否合法
								this.family4[i].abm_ex3 = this.family4[i].abm_ex3.replace(/\s*/g,"")
								let tszf = tszfValidate(this.family4[i].abm_ex3)
								if(tszf){
									this.$toast.fail('非共同生活赡抚养人家庭成员信息第'+parseInt(i+1)+"位请输入正确的姓名")
									resolve(false)
								}
								else if(isCardID(this.family4[i].abm_ex2)){
									this.$toast.fail('非共同生活赡抚养人家庭成员信息第'+parseInt(i+1)+'位'+isCardID(this.family4[i].abm_ex2))
									resolve(false)
								}else if(i == this.family4.length-1){
									resolve(true)
								}
							}).catch(err=>{
								this.$toast.fail('非共同生活赡抚养人家庭成员信息第'+parseInt(i+1)+'位'+err[0].message)
								resolve(false)
							})
						}
						
					}
				})
			},
			family5Validate(){
				return new Promise(resolve=>{
					if(this.family5.length == 0){
						console.log('f4返回true')
						resolve(true)
					}else{
						for(let i =0;i<this.family5.length;i++){
							this.$refs.rule5.validate().then(()=>{
								// 去除姓名的空白符号并且判断姓名是否合法
								this.family5[i].abm_ex3 = this.family5[i].abm_ex3.replace(/\s*/g,"")
								let tszf = tszfValidate(this.family5[i].abm_ex3)
								if(tszf){
									this.$toast.fail('村干部或经办人员近亲属信息第'+parseInt(i+1)+"位请输入正确的姓名")
									resolve(false)
								}
								else if(!this.family5[i].abm_ex1){
									this.$toast.fail('村干部或经办人员近亲属信息第'+parseInt(i+1)+'位请输入近亲属关系')
									resolve(false)
								}else if(!this.family5[i].abm_ex15){
									this.$toast.fail('村干部或经办人员近亲属信息第'+parseInt(i+1)+'位请输入任职机构和职位')
									resolve(false)
								}else if(i == this.family5.length-1){
									resolve(true)
								}
							}).catch(err=>{
								this.$toast.fail('村干部或经办人员近亲属信息第'+parseInt(i+1)+'位'+err[0].message)
								resolve(false)
							})
						}
						
					}
				})
			},
			next2() {
				let next2f = async ()=>{
					
					// if(await this.familyValidate() && await this.family2Validate() && await this.family4Validate() && await this.family5Validate() ){
						// this.hold()
						this.page2 = false
						this.page3 = true
						this.isShow2 = false
						this.isShow3 = true
						document.getElementsByClassName('dbjz')[0].scrollTop = 0
					// }
				}
				next2f()
			},
			// income1，工资性收入
			incomeValidate1(income,msg,rule){
				return new Promise(resolve=>{
					if(income.length == 0){
						this.$toast.fail(msg+'不能为空')
						resolve(false)
					}else{
						console.log(income.length)
						for(let i =0;i<income.length;i++){
							this.$refs[rule].validate().then(()=>{
								if(!income[i].abi_ex1 || !income[i].abi_ex2){
									this.$toast.fail(msg+'第'+parseInt(i+1)+'位'+'请选择和填写完整')
									resolve(false)
								}else if(income[i].abi_ex2<0){
									this.$toast.fail(msg+'第'+parseInt(i+1)+'位'+'不能为负数')
									resolve(false)
								}else if(i == income.length-1){
									console.log('返回true')
									resolve(true)
								}
							}).catch(err=>{
								this.$toast.fail(msg+'第'+parseInt(i+1)+'位'+err[0].message)
								resolve(false)
							})
						}
						
					}
				})
			},
			next3() {
				let next3f = async ()=>{
					
					// if(await this.incomeValidate1(this.income1,'工资性收入','rule5') && await this.incomeValidate1(this.income2,'经营净收入','rule6') && await this.incomeValidate1(this.income3,'财产净收入','rule7') && this.incomeValidate1(this.income4,'转移净收入','rule8') ){
					// 	if(!this.income5[0].abi_ex2){
					// 		this.$toast.fail('其他收入不能为空')
					// 		return false
					// 	}else if(this.income5[0].abi_ex2 && this.income5[0].abi_ex2<0){
					// 		this.$toast.fail('其他收入不能为负数')
					// 		return false
					// 	}else if(!this.income6[0].abi_ex2){
					// 		this.$toast.fail('必要就业成本抵扣不能为空')
					// 		return false
					// 	}else if(this.income6[0].abi_ex2 && this.income6[0].abi_ex2<0){
					// 		this.$toast.fail('必要就业成本抵扣不能为负数')
					// 		return false
					// 	}else{
					// 		this.$refs.rule12.validate().then(()=>{

								// this.hold()
								this.page3 = false
								this.page4 = true
								this.isShow3 = false
								this.isShow4 = true
								document.getElementsByClassName('dbjz')[0].scrollTop = 0

							// }).catch(err=>{
							// 	this.$toast.fail(err[0].message)
							// 	resolve(false)
							// })
							
						// }
								
					// }
				}
				next3f()
			},

			estateValidate(){
				return new Promise((resolve,reject)=>{
					if(this.estate.length == 0){
						resolve(true);
					}else{
						// 过滤车(船)主姓名，用途特殊字符和空格
						this.estate.forEach((value,index)=>{
							console.log("来了来了")
							if(value.abe_ex1){
								value.abe_ex1 = value.abe_ex1.replace(/\s*/g,"")
								value.abe_ex1 = tszfFilter(value.abe_ex1)
							}
							if(value.abe_ex3){
								value.abe_ex3 = value.abe_ex3.replace(/\s*/g,"")
								value.abe_ex3 = tszfFilter2(value.abe_ex3)
							}
							if(!(this.estate[index].abe_ex1=='' && this.estate[index].abe_ex2=='' && this.estate[index].abe_ex3=='' && this.estate[index].abe_ex4=='')){
								if(!(this.estate[index].abe_ex1!='' && this.estate[index].abe_ex2!='' && this.estate[index].abe_ex3!='' && this.estate[index].abe_ex4!='')){
									this.$toast.fail("第"+(Number(index)+1)+"行拥有车(船)情况不能为空")
									resolve(false);
								}
							}
							if(index == this.estate.length-1){
								resolve(true);
							}
							
							
						})
					}
					
				})
			},

			estateValidate2(){
				return new Promise((resolve,reject)=>{
					// 过滤车(船)主姓名，用途特殊字符和空格
					// 过滤房屋产权人/共有人，房屋地址特殊字符和空格
					if(this.estate2.length == 0){
						resolve(true);
					}else{
						this.estate2.forEach((value,index)=>{
							if(value.abe_ex1){
								value.abe_ex1 = value.abe_ex1.replace(/\s*/g,"")
								value.abe_ex1 = tszfFilter(value.abe_ex1)
							}
							if(value.abe_ex5){
								value.abe_ex5 = value.abe_ex5.replace(/\s*/g,"")
								value.abe_ex5 = tszfFilter2(value.abe_ex5)
							}
							if(!(this.estate2[index].abe_ex1=='' && this.estate2[index].abe_ex2=='' && this.estate2[index].abe_ex4=='' && this.estate2[index].abe_ex5=='' && this.estate2[index].abe_ex6=='')){
								if(!(this.estate2[index].abe_ex1!='' && this.estate2[index].abe_ex2!='' && this.estate2[index].abe_ex4!='' && this.estate2[index].abe_ex5!='' && this.estate2[index].abe_ex6!='')){
									this.$toast.fail("第"+(Number(index)+1)+"行拥有房产情况不能为空")
									resolve(false);
								}
							}
							if(index == this.estate2.length-1){
								resolve(true);
							}
						})
					}
					
				})
			},
			async next4() {
				if(!this.form.ab_ex36){
					this.$toast.fail("请填写银行总存款")
					return false
				}
				if(!this.form.ab_ex60){
					this.$toast.fail("请填写有价证券")
					return false
				}
				if(!this.form.ab_ex61){
					this.$toast.fail("请填写债权")
					return false
				}
				if(!this.form.ab_ex37){
					this.$toast.fail("请填写其他金融产品")
					return false
				}


				let e1 = await this.estateValidate()
				let e2 = await this.estateValidate2()
				if(!e1 || !e2){
					return false
				}

				if(this.fileList6.length>=2 && this.fileList7.length>=2){
					this.hold()
					this.page4 = false
					this.page5 = true
					this.isShow4 = false
					this.isShow5 = true
					document.getElementsByClassName('dbjz')[0].scrollTop = 0
				}else if(this.fileList6.length==0 && this.fileList7.length==0){
					// 目前页面删除照片ab_ex166，ab_ex167赋值后并没有删除，所以需要赋值空
					this.form.ab_ex166 = ''
					this.form.ab_ex167 = ''
					
					this.hold()
					this.page4 = false
					this.page5 = true
					this.isShow4 = false
					this.isShow5 = true
					document.getElementsByClassName('dbjz')[0].scrollTop = 0
				}else{
					this.$toast.fail('请上传两张房屋整体和室内照片')
				}
				
			},
			next5() {
				
				
				// 判断核对授权书编号
				// request({
				// 	method: 'post',
				// 	url: '/social/assistanceWeixin/checkNum',
				// 	data: {
				// 		ab_ex85:this.form.ab_ex85,
				// 		ab_id:this.form.ab_id
				// 	},
				// }).then(res => {
				// 	if(res[0].status == "+OK"){
				// 		this.hold()
						this.page3 = false
						this.page6 = true
						this.isShow3 = false
						this.isShow6 = true
						document.getElementsByClassName('dbjz')[0].scrollTop = 0
				// 	}else{
				// 		this.$toast.fail(res[0].msg)
				// 	}
					
				// }).catch(erro => {
				// 	console.log(erro)
				// })
				
				
			},
			// //将base64转换为blob
			// dataURLtoFile(dataURI, type) {
			// 	let binary = atob(dataURI.split(',')[1]);
			// 	let array = [];
			// 	for (let i = 0; i < binary.length; i++) {
			// 		array.push(binary.charCodeAt(i));
			// 	}
			// 	return new Blob([new Uint8Array(array)], {
			// 		type: type
			// 	});
			// },
			back1() {
				this.page1 = false
				this.page0 = true
				this.isShow1 = false
				this.isShow0 = true
				document.getElementsByClassName('dbjz')[0].scrollTop = 0
			},
			back2() {
				this.page2 = false
				this.page1 = true
				this.isShow2 = false
				this.isShow0 = true
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
			back5() {
				this.page5 = false
				this.page4 = true
				this.isShow5 = false
				this.isShow4 = true
				document.getElementsByClassName('dbjz')[0].scrollTop = 0
			},
			back6() {
				this.page6 = false
				this.page5 = true
				this.isShow6 = false
				this.isShow5 = true
				document.getElementsByClassName('dbjz')[0].scrollTop = 0
			},
			// 转介服务改变
			zjfwChange(value) {
				if (value == '提供转介服务') {
					this.isZjfw = true
				} else {
					this.isZjfw = false
				}
			},
			
			sslbChange(val){
				if(val.length>0){
					if(val.length == 1 && val[0] == '不符合救助条件'){
						this.sslbDisabled1 = true
						this.sslbDisabled5 = true
						this.sslbDisabled6 = true
						this.sslbDisabled7 = true
						this.sslbDisabled8 = true
						this.sslbDisabled9 = true
						this.sslbDisabled10 = true
						this.sslbDisabled11 = true
						this.sslbDisabled12 = true

						this.sslbDisabled3 = true
						this.sslbDisabled4 = true
					}else if(val.length == 1 && val[0] == '自愿放弃'){
						this.sslbDisabled5 = true
						this.sslbDisabled6 = true
						this.sslbDisabled7 = true
						this.sslbDisabled8 = true
						this.sslbDisabled9 = true
						this.sslbDisabled10 = true
						this.sslbDisabled11 = true
						this.sslbDisabled12 = true
						this.sslbDisabled1 = true
						this.sslbDisabled2 = true
						this.sslbDisabled4 = true
					}else if(val.length == 1 && val[0] == '死亡'){
						this.sslbDisabled5 = true
						this.sslbDisabled6 = true
						this.sslbDisabled7 = true
						this.sslbDisabled8 = true
						this.sslbDisabled9 = true
						this.sslbDisabled10 = true
						this.sslbDisabled11 = true
						this.sslbDisabled12 = true
						this.sslbDisabled1 = true
						this.sslbDisabled2 = true
						this.sslbDisabled3 = true
					}else if(val.length == 1 && val[0] == '两书拒签'){
						this.sslbDisabled4 = true
						this.sslbDisabled5 = true
						this.sslbDisabled6 = true
						this.sslbDisabled7 = true
						this.sslbDisabled8 = true
						this.sslbDisabled9 = true
						this.sslbDisabled11 = true
						this.sslbDisabled12 = true
						this.sslbDisabled1 = true
						this.sslbDisabled2 = true
						this.sslbDisabled3 = true
					}else if(val.length == 1 && val[0] == '失踪失联'){
						this.sslbDisabled4 = true
						this.sslbDisabled5 = true
						this.sslbDisabled6 = true
						this.sslbDisabled7 = true
						this.sslbDisabled8 = true
						this.sslbDisabled9 = true
						this.sslbDisabled10 = true
						this.sslbDisabled12 = true
						this.sslbDisabled1 = true
						this.sslbDisabled2 = true
						this.sslbDisabled3 = true
					}else if(val.length == 1 && val[0] == '其它'){
						this.sslbDisabled4 = true
						this.sslbDisabled5 = true
						this.sslbDisabled6 = true
						this.sslbDisabled7 = true
						this.sslbDisabled8 = true
						this.sslbDisabled9 = true
						this.sslbDisabled10 = true
						this.sslbDisabled11 = true
						this.sslbDisabled1 = true
						this.sslbDisabled2 = true
						this.sslbDisabled3 = true
					}else if(val.length == 1 && val[0] == '低保'){
						this.sslbDisabled5 = true
						this.sslbDisabled6 = true
						this.sslbDisabled7 = true
						this.sslbDisabled8 = true
						this.sslbDisabled9 = true
						this.sslbDisabled10 = true
						this.sslbDisabled11 = true
						this.sslbDisabled12 = true
						this.sslbDisabled2 = true
						this.sslbDisabled3 = true
						this.sslbDisabled4 = true
					}else if(val.length == 1 && val[0] == '特困供养'){
						this.sslbDisabled1 = true
						this.sslbDisabled6 = true
						this.sslbDisabled7 = true
						this.sslbDisabled8 = true
						this.sslbDisabled9 = true
						this.sslbDisabled10 = true
						this.sslbDisabled11 = true
						this.sslbDisabled12 = true
						this.sslbDisabled2 = true
						this.sslbDisabled3 = true
						this.sslbDisabled4 = true
					}else if(val.length == 1 && val[0] == '家庭边缘'){
						this.sslbDisabled1 = true
						this.sslbDisabled5 = true
						this.sslbDisabled7 = true
						this.sslbDisabled8 = true
						this.sslbDisabled9 = true
						this.sslbDisabled10 = true
						this.sslbDisabled11 = true
						this.sslbDisabled12 = true
						this.sslbDisabled2 = true
						this.sslbDisabled3 = true
						this.sslbDisabled4 = true
					}else if(val.length == 1 && val[0] == '支出型困难'){
						this.sslbDisabled1 = true
						this.sslbDisabled5 = true
						this.sslbDisabled6 = true
						this.sslbDisabled8 = true
						this.sslbDisabled9 = true
						this.sslbDisabled10 = true
						this.sslbDisabled11 = true
						this.sslbDisabled12 = true
						this.sslbDisabled2 = true
						this.sslbDisabled3 = true
						this.sslbDisabled4 = true
					}else if(val.length == 1 && val[0] == '尊老金'){
						this.sslbDisabled1 = true
						this.sslbDisabled5 = true
						this.sslbDisabled6 = true
						this.sslbDisabled7 = true
						this.sslbDisabled9 = true
						this.sslbDisabled10 = true
						this.sslbDisabled11 = true
						this.sslbDisabled12 = true
						this.sslbDisabled2 = true
						this.sslbDisabled3 = true
						this.sslbDisabled4 = true
					}else if(val.length == 1 && val[0] == '临时救助'){
						this.sslbDisabled1 = true
						this.sslbDisabled5 = true
						this.sslbDisabled6 = true
						this.sslbDisabled7 = true
						this.sslbDisabled8 = true
						this.sslbDisabled10 = true
						this.sslbDisabled11 = true
						this.sslbDisabled12 = true
						this.sslbDisabled2 = true
						this.sslbDisabled3 = true
						this.sslbDisabled4 = true
					}
				}else{
					// 全部解除禁用
					// this.sslbDisabled1 = false
					if(this.$route.query.type == "低保"){
						this.sslbDisabled1 = false
					}else if(this.$route.query.type == "特困供养"){
						this.sslbDisabled5 = false
					}else if(this.$route.query.type == "家庭边缘"){
						this.sslbDisabled6 = false
					}else if(this.$route.query.type == "支出型困难"){
						this.sslbDisabled7 = false
					}else if(this.$route.query.type == "尊老金"){
						this.sslbDisabled8 = false
					}else if(this.$route.query.type == "临时救助"){
						this.sslbDisabled9 = false
					}
					this.sslbDisabled2 = false
					this.sslbDisabled3 = false
					this.sslbDisabled4 = false
					this.sslbDisabled10 = false
					this.sslbDisabled11 = false
					this.sslbDisabled12 = false
				}
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
			
			imgRequest(formData,file,num){
				request({
				 	method: 'post',
					url: '/social/weixinMinios/fileUpload',
					data: formData,
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
				 	}  else if (num == 11) {
				 		// 自理能力评估报告
				 		this.form.ab_ex196 = res[0].filename
				 	}  else if (num == 12) {
				 		// 集中供养意愿书
				 		this.form.ab_ex197 = res[0].filename
				 	} else if (num == 6) {
				 		// 房屋整体照片
				 		if (this.form.ab_ex166) {
				 			this.form.ab_ex166 = this.form.ab_ex166.concat(',', res[0].filename)
				 		} else {
				 			this.form.ab_ex166 = this.form.ab_ex166.concat(res[0].filename)
				 		}
				 	} else if (num == 7) {
				 		// 房屋室内照片
				 		if (this.form.ab_ex167) {
				 			this.form.ab_ex167 = this.form.ab_ex167.concat(',', res[0].filename)
				 		} else {
				 			this.form.ab_ex167 = this.form.ab_ex167.concat(res[0].filename)
				 		}
				 	} else if (num == 8) {
				 		// 房产材料照片
				 		if (this.form.ab_ex168) {
				 			this.form.ab_ex168 = this.form.ab_ex168.concat(',', res[0].filename)
				 		} else {
				 			this.form.ab_ex168 = this.form.ab_ex168.concat(res[0].filename)
				 		}
				 	} else if (num == 9) {
				 		// 车船材料照片
				 		if (this.form.ab_ex169) {
				 			this.form.ab_ex169 = this.form.ab_ex169.concat(',', res[0].filename)
				 		} else {
				 			this.form.ab_ex169 = this.form.ab_ex169.concat(res[0].filename)
				 		}
				 	} else if (num == 10) {
				 		// 自愿放弃照片
						if (this.form.ab_ex175) {
							this.form.ab_ex175 = this.form.ab_ex175.concat(',', res[0].filename)
						} else {
							this.form.ab_ex175 = this.form.ab_ex175.concat(res[0].filename)
						}
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
				 	}else if(num == 6){
				 		this.fileList6.pop()
				 	}else if(num == 7){
				 		this.fileList7.pop()
				 	}else if(num == 8){
				 		this.fileList8.pop()
				 	}else if(num == 9){
				 		this.fileList9.pop()
				 	}else if(num == 10){
				 		this.fileList10.pop()
				 	}else if(num == 11){
				 		this.fileList11.pop()
				 	}else if(num == 12){
				 		this.fileList12.pop()
				 	}
				 	this.$toast.fail('上传失败')
				 	console.log(erro)
				})
			},
			// 组件方法 获取 流
			uploadImg(num) {
				return file => {
					file.status = 'uploading';
					file.message = '上传中...';
					
					console.log(file.file)
					
					// 执行压缩图片并上传
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
			// 自愿放弃救助
			abandon(){
				if(this.form.ab_ex3==''){
					this.$toast.fail("请填写姓名")
					return false
				}
				if(this.form.ab_ex7==''){
					this.$toast.fail("请填写身份证号")
					return false
				}
				let msg = isCardID(this.form.ab_ex7)
				if (msg) {
					this.$toast.fail(msg)
					return false
				}
				if(this.form.ab_ex162_2==''){
					this.$toast.fail("请填写行政区划")
					return false
				}
				if(this.form.ab_ex11==''){
					this.$toast.fail("请填写家庭住址")
					return false
				}
				if(this.form.ab_ex6==''){
					this.$toast.fail("请填写户口性质")
					return false
				}
				if(this.form.ab_ex28==''){
					this.$toast.fail("请填写联系电话")
					return false
				}
				if(this.form.ab_ex178=='' && this.ab_ex145.indexOf("其他")!= -1){
					this.$toast.fail("请填写退回描述")
					return false
				}
				if(this.form.ab_ex80==''){
					this.$toast.fail("请填写不诚信原因")
					return false
				}
				// if(this.fileList10.length == 0){
				// 	this.$toast.fail('自愿放弃材料不能为空')
				// 	return false
				// }
				
				
				// 遮罩
				let toast = this.$toast({
					type:'loading',
					message:'提交中...',
					overlay:true,
					duration:0
				})
				this.form.ab_ex17 = '泰州市姜堰区社会救助综合平台'
				this.form.ab_ex46 = this.ab_ex46.join(',')
				this.form.ab_ex106 = this.ab_ex106.join(',')
				this.form.stype = this.$route.query.type
				if(this.ab_ex158.length>0){
					this.form.ab_ex158 = this.ab_ex158.join(',')
				}
				if(this.ab_ex145.length>0){
					this.form.ab_ex145 = this.ab_ex145.join(',')
				}
				
				
				request({
					method: 'post',
					url: '/social/assistanceWeixin/saveBasic',
					data: {
						'data': '[' + JSON.stringify(this.form) + ']',
						'member': '',
						'pay': '',
						'estate': '',
						'waring': '',
						'isHc': "Y",
						'isCf': 'Y',
						'type': '核查'
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
			
			
			onConfirm(date, index) {
				console.log(index)
				let YY = date.getFullYear() + '-';
				let MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				let DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
				this.warning[index].aw_dat1 = YY + MM + DD
				this.warning[index].showPicker = false;
			},
			changeJkzk(value,item,itemval1,itemval2){
				this.onConfirm21(value,item,itemval1,itemval2)
				if(value == '健康'){
					item.abm_ex52 = ''
					item.abm_ex39 = ''
					item.abm_ex40 = ''
				}else if(value == '重病'){
					item.abm_ex39 = ''
					item.abm_ex40 = ''
				}else if(value == '残疾'){
					item.abm_ex52 = ''
				}
			},

			onConfirm21(value,item,itemval1,itemval2) {
				item[itemval1] = value
				item[itemval2] = false
			},

			onConfirm43(date, item,key1,key2) {
				console.log(date, item);
				
				let YY = date.getFullYear() + '-';
				let MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				let DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
				if(key1=='abm_ex39'){
					item.abm_ex39 = YY + MM + DD;
					item[key2] = false
				}else{

					item.abe_ex2 = YY + MM + DD;
					item.showPicker43 = false;
				}
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
					// showPicker25: false,
					showPicker26: false,
					showPicker27: false,
					showPicker28: false,
					showPicker29: false,
					showPicker210: false,
					// showPicker211: false,
					showPicker212: false,
					// showPicker214: false,
					// showPicker215: false,
					showPicker216: false,
					showPicker217: false,
					// showPicker218: false,
					showPicker219: false,
					showPicker220: false,
					showPicker221: false,
					showPicker222: false,
					abm_ex15: '',
					abm_ex17: '',
					abm_ex2: '',
					abm_ex29: '',
					abm_ex5: '',
					abm_ex16: '',
					abm_ex7: '',
					// abm_ex48: '',
					abm_ex46: '',
					abm_ex28: '',
					abm_ex11: '',
					abm_ex52: '',
					abm_ex39: '',
					abm_ex47: '',
					abm_ex51: '',
					showPicker213: false,
					// abm_ex8: '',
					// abm_ex30: '',
					// abm_ex49: '',
					abm_ex50: '',
					// abm_ex32: '',
					abm_ex42: '',
					abm_ex14: '',
					abm_ex30: '正常自理',
					abm_ex69: 0,
					abm_ex70: 0,
					abm_ex71: 0,
					// resultImg: '',
					// resultImgId: '',
					abm_ex6:"Y",
				})
			},
			page2FamilyDel() {
				this.family.pop()
			},
			page2FamilyDelMyself(index) {
				this.family.splice(index, 1)
			},

			// page2非共同家庭成员增加
			page2FamilyAdd2() {
				this.family2.push({
					abm_ex3: '',
					abm_ex1: '',
					showPicker21: false,
					// showPicker22: false,
					// showPicker25: false,
					showPicker26: false,
					showPicker27: false,
					showPicker29: false,
					// showPicker210: false,
					// showPicker214: false,
					showPicker216: false,
					abm_ex15: '',
					abm_ex17: '',
					abm_ex2: '',
					// abm_ex5: '',
					// abm_ex48: '',
					abm_ex28: '',
					abm_ex11: '',
					abm_ex49: '',
					// abm_ex47: '',
					// abm_ex21: '',
					abm_ex20: '',
					abm_ex18: '',
					// abm_ex14: '',
					// abm_ex9: '',
					// abm_ex10: '',
					// resultImg: '', //签名图片
					// resultImgId: '',
					abm_ex6:"N",
				})
			},
			page2FamilyDel2() {
				this.family2.pop()
			},
			page2FamilyDelMyself2(index) {
				this.family2.splice(index, 1)
			},
		
			// page2非共同生活赡抚养人家庭成员信息
			page2FamilyAdd4() {
				this.family4.push({
					abm_ex3: '',
					abm_ex1: '',
					abm_ex2: '',
					showPicker21: false,
					abm_ex6:"B",
				})
			},
			page2FamilyDel4() {
				this.family4.pop()
			},
			page2FamilyDelMyself4(index) {
				this.family4.splice(index, 1)
			},
			// page2村干部
			page2FamilyAdd5() {
				this.family5.push({
					abm_ex3: '',
					abm_ex1: '',
					abm_ex15: '',
					showPicker21: false,
					abm_ex6:"C",
				})
			},
			page2FamilyDel5() {
				this.family5.pop()
			},
			page2FamilyDelMyself5(index) {
				this.family5.splice(index, 1)
			},
			// page3工资性收入
			page3IncomeAdd1() {
				this.income1.push({
					abi_ex1: '',
					abi_ex2: '',
					abi_ex3: '工资性收入',
					abi_ex4: 'A',
					abi_ex5: '',
					showPicker31: false,
				})
			},
			page3IncomeDel1() {
				this.income1.pop()
			},
			page3IncomeDelMyself1(index) {
				this.income1.splice(index, 1)
				this.changeAmt()
			},
			// page3经营净收入
			page3IncomeAdd2() {
				this.income2.push({
					abi_ex1: '',
					abi_ex2: '',
					abi_ex3: '经营净收入',
					abi_ex4: 'B',
					abi_ex5: '',
					showPicker31: false,
				})
			},
			page3IncomeDel2() {
				this.income2.pop()
			},
			page3IncomeDelMyself2(index) {
				this.income2.splice(index, 1)
				this.changeAmt()
			},
			// page3财产净收入
			page3IncomeAdd3() {
				this.income3.push({
					abi_ex1: '',
					abi_ex2: '',
					abi_ex3: '财产净收入',
					abi_ex4: 'C',
					abi_ex5: '',
					showPicker31: false,
				})
			},
			page3IncomeDel3() {
				this.income3.pop()
			},
			page3IncomeDelMyself3(index) {
				this.income3.splice(index, 1)
				this.changeAmt()
			},
			// page3转移净收入
			page3IncomeAdd4() {
				this.income4.push({
					abi_ex1: '',
					abi_ex2: '',
					abi_ex3: '转移净收入',
					abi_ex4: 'D',
					abi_ex5: '',
					showPicker31: false,
				})
			},
			page3IncomeDel4() {
				this.income4.pop()
			},
			page3IncomeDelMyself4(index) {
				this.income4.splice(index, 1)
				this.changeAmt()
			},
			// page4拥有车船情况增删
			page4FamilyAdd() {
				this.estate.push({
					abe_ex1: '',
					// abe_ex8: '',
					// abe_ex9: '',
					// abe_ex10: '',
					abe_ex2: '',
					abe_ex3: '',
					abe_ex4: '',
					abe_ex7: '车船',
					currentDate : new Date(),
					showPicker43: false,
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
					abe_ex4: '',
					abe_ex5: '',
					abe_ex6: '',
					// abe_ex11: '',
					// abe_ex12: '',
					abe_ex2: '',
					abe_ex7: '房屋',
					currentDate : new Date(),
					// showPicker41: false,
					// showPicker42: false,
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
					this.form.ab_ex94_ = (json.ab_ex94 / json.ab_ex5).toFixed(2)
					if (json.ab_ex46) {
						this.ab_ex46 = json.ab_ex46.split(',')
						// this.$set(this.form, 'ab_ex46_', json.ab_ex46)
					} 
					// else {
					// 	this.$set(this.form, 'ab_ex46_', "无劳动能力、无生活来源、无法定赡养抚养扶养义务人或者其法定义务人无履行义务能力")
					// }
					if (json.ab_ex106) {
						this.ab_ex106 = json.ab_ex106.split(',')
					}
					if (json.ab_ex8 == "") {
						this.form.ab_ex8 = json.ab_ex3
					}
					if(json.ab_ex158){
						this.ab_ex158 = json.ab_ex158.split(',')
					}
					// if(json.ab_ex145){
					// 	this.ab_ex145 = json.ab_ex145.split(',')
					// 	this.sslbChange(this.ab_ex145)
					// }

					if(this.$route.query.type){
						this.ab_ex145 = this.$route.query.type.split(',')
						this.sslbChange(this.ab_ex145)
					}

					// if (json.ab_ex13 == "低保")
					//     this.form.ab_ex13 = "最低生活保障";
					// else if (json.ab_ex13 == "家庭边缘")
					//     this.form.ab_ex13 = "低收入家庭";
					// else if (json.ab_ex13 == "特困供养")
					//     this.form.ab_ex13 = "特困人员供养";
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
					// 自理能力评估报告
					if (json.ab_ex196) {
						let ab_ex196 = json.ab_ex196.split(",");
						// this.fileList11.push(ab_ex196[0])
						this.imageView(ab_ex196[0]).then(res=>{
							// 这个从正确的进来
							this.fileList11.push({
								url: res,
								isImage: true
							})
							console.log(this.fileList11)
						}).catch(res=>{
							console.log(res)
						})
					}
					// 集中供养意愿书
					if (json.ab_ex197) {
						let ab_ex197 = json.ab_ex197.split(",");
						// this.fileList12.push(ab_ex197[0])
						this.imageView(ab_ex197[0]).then(res=>{
							// 这个从正确的进来
							this.fileList12.push({
								url: res,
								isImage: true
							})
							console.log(this.fileList12)
						}).catch(res=>{
							console.log(res)
						})
					}
					// 房屋整体照片
					if (json.ab_ex166) {
						let imgs = json.ab_ex166.split(",");
						console.log(this.fileList6)
						imgs.forEach((value,index)=>{
							this.imageView(value).then(res=>{
								// 这个从正确的进来
								this.fileList6.push({
									url: res,
									isImage: true
								})
							}).catch(res=>{
								console.log(res)
							})
						})
					}
					// 房屋室内照片
					if (json.ab_ex167) {
						let imgs = json.ab_ex167.split(",");
						console.log(this.fileList7)
						imgs.forEach((value,index)=>{
							this.imageView(value).then(res=>{
								// 这个从正确的进来
								this.fileList7.push({
									url: res,
									isImage: true
								})
							}).catch(res=>{
								console.log(res)
							})
						})
					}
					// 房产材料照片
					if (json.ab_ex168) {
						let imgs = json.ab_ex168.split(",");
						console.log(this.fileList8)
						imgs.forEach((value,index)=>{
							this.imageView(value).then(res=>{
								// 这个从正确的进来
								this.fileList8.push({
									url: res,
									isImage: true
								})
							}).catch(res=>{
								console.log(res)
							})
						})
					}
					// 车船材料照片
					if (json.ab_ex169) {
						let imgs = json.ab_ex169.split(",");
						console.log(this.fileList9)
						imgs.forEach((value,index)=>{
							this.imageView(value).then(res=>{
								// 这个从正确的进来
								this.fileList9.push({
									url: res,
									isImage: true
								})
							}).catch(res=>{
								console.log(res)
							})
						})
					}
					
					// 自愿放弃照片
					if (json.ab_ex175) {
						let imgs = json.ab_ex175.split(",");
						console.log(this.fileList10)
						imgs.forEach((value,index)=>{
							this.imageView(value).then(res=>{
								// 这个从正确的进来
								this.fileList10.push({
									url: res,
									isImage: true
								})
							}).catch(res=>{
							console.log(res)
							})
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
						while(this.warning.length<5){
							this.warning.push({
								aw_dat1: "",
								aw_ex1: ""
							})
						}
						warning.forEach((item, index) => {
							// this.warning[index].showPicker = false
							this.$set(this.warning[index],'showPicker',false)
							this.$set(this.warning[index],'currentDate',new Date())
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
						// this.$set(this.family[index], 'showPicker25', false)
						this.$set(this.family[index], 'showPicker26', false)
						this.$set(this.family[index], 'showPicker27', false)
						this.$set(this.family[index], 'showPicker28', false)
						this.$set(this.family[index], 'showPicker29', false)
						this.$set(this.family[index], 'showPicker210', false)
						// this.$set(this.family[index], 'showPicker211', false)
						this.$set(this.family[index], 'showPicker212', false)
						this.$set(this.family[index], 'showPicker213', false)
						// this.$set(this.family[index], 'showPicker214', false)
						// this.$set(this.family[index], 'showPicker215', false)
						this.$set(this.family[index], 'showPicker216', false)
						this.$set(this.family[index], 'showPicker217', false)
						// this.$set(this.family[index], 'showPicker218', false)
						this.$set(this.family[index], 'showPicker219', false)
						this.$set(this.family[index], 'showPicker220', false)
						this.$set(this.family[index], 'showPicker221', false)
						this.$set(this.family[index], 'showPicker222', false)
						// this.$set(this.family[index], 'resultImg', '')
						// this.$set(this.family[index], 'resultImgId', '')
						this.$set(this.family[index], 'abm_ex6', 'Y')
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
						// this.$set(this.family2[index], 'showPicker22', false)
						// this.$set(this.family2[index], 'showPicker25', false)
						this.$set(this.family2[index], 'showPicker26', false)
						this.$set(this.family2[index], 'showPicker27', false)
						this.$set(this.family2[index], 'showPicker29', false)
						// this.$set(this.family2[index], 'showPicker210', false)
						// this.$set(this.family2[index], 'showPicker214', false)
						this.$set(this.family2[index], 'showPicker216', false)
						// this.$set(this.family2[index], 'resultImg', '')
						// this.$set(this.family2[index], 'resultImgId', '')
						this.$set(this.family2[index], 'abm_ex6', 'N')
					})
				}).catch(error => {})
			},
			// loadFamily3(sType) {
			// 	this.loadF(sType).then(res => {
			// 		this.family3 = res[0].data
			// 		res[0].data.forEach((item, index) => {
			// 			this.$set(this.family3[index], 'showPicker21', false)
			// 			this.$set(this.family3[index], 'showPicker22', false)
			// 			this.$set(this.family3[index], 'showPicker26', false)
			// 			this.$set(this.family3[index], 'showPicker27', false)
			// 			this.$set(this.family3[index], 'showPicker29', false)
			// 			this.$set(this.family3[index], 'abm_ex6', 'A')
			// 		})
			// 	}).catch(error => {})
			// },
			loadFamily4(sType) {
				this.loadF(sType).then(res => {
					this.family4 = res[0].data
					res[0].data.forEach((item, index) => {
						this.$set(this.family4[index], 'showPicker21', false)
						this.$set(this.family4[index], 'abm_ex6', 'B')
					})
				}).catch(error => {})
			},
			loadFamily5(sType) {
				this.loadF(sType).then(res => {
					this.family5 = res[0].data
					res[0].data.forEach((item, index) => {
						this.$set(this.family5[index], 'showPicker21', false)
						this.$set(this.family5[index], 'abm_ex6', 'C')
					})
				}).catch(error => {})
			},
			loadIncome() {
				request({
					method: 'post',
					url: '/social/getIncomeObj',
					data: {
						sId: this.$route.query.sId,
					},
					headers: {
						'token': sessionStorage.getItem('token')
					}
				}).then(res => {
					this.income1=[{
						abi_ex1:"",
						abi_ex2:"",
						abi_ex3:"工资性收入",
						abi_ex4: "A",
						abi_ex5: "",
						showPicker31:false
					}]
					this.income2=[{
						abi_ex1:"",
						abi_ex2:"",
						abi_ex3:"经营净收入",
						abi_ex4: "B",
						abi_ex5: "",
						showPicker31:false
					}]
					this.income3=[{
						abi_ex1:"",
						abi_ex2:"",
						abi_ex3:"财产净收入",
						abi_ex4: "C",
						abi_ex5: "",
						showPicker31:false
					}]
					this.income4=[{
						abi_ex1:"",
						abi_ex2:"",
						abi_ex3:"转移净收入",
						abi_ex4: "D",
						abi_ex5: "",
						showPicker31:false
					}]
					this.income5=[{
						abi_ex1:"其他收入",
						abi_ex2:"",
						abi_ex3:"其他收入",
						abi_ex4: "E",
						abi_ex5: ""
					}]
					this.income6=[{
						abi_ex1:"必要就业成本抵扣",
						abi_ex2:"",
						abi_ex3:"必要就业成本抵扣",
						abi_ex4: "F",
						abi_ex5: ""
					}]
					this.income7=[{
						abi_ex1:"总收入",
						abi_ex2:"",
						abi_ex3:"总收入",
						abi_ex4: "G",
						abi_ex5: ""
					},{
						abi_ex1:"家庭月平均收入",
						abi_ex2:"",
						abi_ex3:"总收入",
						abi_ex4: "G",
						abi_ex5: ""
					},{
						abi_ex1:"家庭月人均收入",
						abi_ex2:"",
						abi_ex3:"总收入",
						abi_ex4: "G",
						abi_ex5: ""
					}]
					//工资性收入 ： A； 经营：B； 财产：C； 转移：D； 其他：E； 必要就业：F；总：G
					
					var income1=[];
					var income2=[];
					var income3=[];
					var income4=[];
					var income5=[];
					var income6=[];
					var income7=[];

					for(let i in res[0].data ){
						res[0].data[i].abi_ex2=Number(res[0].data[i].abi_ex2).toFixed(2)
						if(res[0].data[i].abi_ex4=='A'&&(res[0].data[i].abi_ex1!=""||res[0].data[i].abi_ex2!="")){
							income1.push(res[0].data[i]);
							this.$set(income1[income1.length-1], 'showPicker31', false)
						}
						else if(res[0].data[i].abi_ex4=='B'&&(res[0].data[i].abi_ex1!=""||res[0].data[i].abi_ex2!="")){
							income2.push(res[0].data[i]);
							this.$set(income2[income2.length-1], 'showPicker31', false)
						}
						else if(res[0].data[i].abi_ex4=='C'&&(res[0].data[i].abi_ex1!=""||res[0].data[i].abi_ex2!="")){
							income3.push(res[0].data[i]);
							this.$set(income3[income3.length-1], 'showPicker31', false)
						}
						else if(res[0].data[i].abi_ex4=='D'&&(res[0].data[i].abi_ex1!=""||res[0].data[i].abi_ex2!="")){
							income4.push(res[0].data[i]);
							this.$set(income4[income4.length-1], 'showPicker31', false)
						}
						else if(res[0].data[i].abi_ex4=='E'&&(res[0].data[i].abi_ex1!=""||res[0].data[i].abi_ex2!="")){
							// res[0].data[i].abi_ex1="其他收入";
							income5.push(res[0].data[i]);
						}
						else if(res[0].data[i].abi_ex4=='F'&&(res[0].data[i].abi_ex1!=""||res[0].data[i].abi_ex2!="")){
							// res[0].data[i].abi_ex1="必要就业成本抵扣";
							income6.push(res[0].data[i]);
						}
						else if(res[0].data[i].abi_ex4=='G'&&(res[0].data[i].abi_ex1!=""||res[0].data[i].abi_ex2!="")){
							// income7.push(res[0].data[i]);
							if(res[0].data[i].abi_ex1=='总收入'){
								income7[0] = res[0].data[i]
							}
							// income7[0].abi_ex1="总收入";
						}
					}
					
					console.log(res[0].data);
					console.log(income1,"工资收入");
					
					if(income1.length>0){				
						this.income1=income1;	
					}
					if(income2.length>0){
						this.income2=income2;
					}
					if(income3.length>0){
						this.income3=income3;
					}
					if(income4.length>0){
						this.income4=income4;
					}
					if(income5.length>0){
						this.income5=income5;
					}
					if(income6.length>0){
						this.income6=income6;
					}
					// if(income7.length>0){
					// 	this.income7=income7;
					// }
					if(income7.length>0){
						income7[1]={abi_ex1:"家庭月平均收入"};
						income7[2]={abi_ex1:"家庭月人均收入"};
						income7[1].abi_ex2=(income7[0].abi_ex2/12).toFixed(2);
						if(this.form.ab_ex5 && this.form.ab_ex5!=0){
							income7[2].abi_ex2=(income7[0].abi_ex2/12/this.form.ab_ex5).toFixed(2);
						}else{
							income7[2].abi_ex2=income7[1].abi_ex2
						}
						this.income7=income7;
					}
				}).catch(error => {
					console.log('gggggggggggggggggggggggggggggggggggggggg')
				})
			},
			loadPay(){
				request({
					method: 'post',
					url: '/social/assistanceWeixin/getBasicPay',
					data: {
						sId: this.$route.query.sId,
					},
					headers: {
						'token': sessionStorage.getItem('token')
					}
				}).then(res => {
					if(res[0].data3.length>0){
						this.pay = res[0].data3[0]
					}
				}).catch(error => {
					console.log(error)
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
					idNum += '' + myDate.getFullYear() + '' + (myDate.getMonth() > 8 ? myDate.getMonth() + 1 : '0' + "" + (myDate.getMonth() + 1));
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
						// url: '/social/assistanceWeixin/getBasicIdNum?type=' + val + '&ab_id=' + this.$route.query.sId, //路径',
						url: '/social/assistanceWeixin/getBasicIdNum?type=' + val + '&ab_id=' + '82115', //路径',
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
					res[0].data.forEach((item, index) => {
						this.$set(this.estate[index], 'abe_ex7', '车船')
						this.$set(this.estate[index], 'showPicker43', false)
						this.$set(this.estate[index], 'currentDate', new Date())
					})
					res[0].data2.forEach((item, index) => {
						// this.$set(this.estate2[index], 'showPicker41', false)
						// this.$set(this.estate2[index], 'showPicker42', false)
						this.$set(this.estate2[index], 'showPicker43', false)
						this.$set(this.estate2[index], 'currentDate', new Date())
						this.$set(this.estate2[index], 'abe_ex7', '房屋')
					})
				}).catch(error => {
					console.log(error)
				})
			},
			save() {
				// 到最后的保存则首页的自愿放弃图片，退回描述需要删除
				this.form.ab_ex175 = ''
				this.form.ab_ex178 = ''
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
				// if(!this.form.ab_ex79){
				// 	this.$toast.fail('请选择情况是否属实')
				// 	return false
				// }
				// if(!this.form.ab_ex78){
				// 	this.$toast.fail('请填写调查人')
				// 	return false
				// }
				// if(this.form.ab_ex78 && (this.form.ab_ex78.split(',').length<2 && this.form.ab_ex78.split('，').length<2)){
				// 	this.$toast.fail('调查人数不能少于两人')
				// 	return false
				// }
				// if(!this.form.ab_ex80){
				// 	this.$toast.fail('请填写备注')
				// 	return false
				// }
				// 过滤调查人姓名特殊字符和空格
				this.form.ab_ex78 = this.form.ab_ex78.replace(/\s*/g,"")
				this.form.ab_ex78 = tszfFilter2(this.form.ab_ex78)
				// 过滤备注特殊字符和空格
				this.form.ab_ex80 = this.form.ab_ex80.replace(/\s*/g,"")
				this.form.ab_ex80 = tszfFilter2(this.form.ab_ex80)
				
				this.form.ab_ex10 = this.form.ab_ex10_1 + ',' + this.form.ab_ex10_2
				this.form.ab_ex17 = '泰州市姜堰区社会救助综合平台'
				this.form.ab_ex46 = this.ab_ex46.join(',')
				this.form.ab_ex106 = this.ab_ex106.join(',')
				this.form.stype = this.$route.query.type
				if(this.ab_ex158.length>0){
					this.form.ab_ex158 = this.ab_ex158.join(',')
				}
				if(this.ab_ex145.length>0){
					this.form.ab_ex145 = this.ab_ex145.join(',')
				}
				console.log(this.form)
				// let memeber = []
				// if (this.typelx == '低保' || this.typelx == '特困供养') {
				// 	memeber = this.family.concat(this.family2).concat(this.family4)
				// }else {
				// 	memeber = this.family.concat(this.family2)
				// }
				// let memeber = this.family.concat(this.family2)
				// let memeber = this.family.concat(this.family2).concat(this.family4).concat(this.family5)
				// let estate = this.estate.concat(this.estate2)
				// let warning2 = []
				// this.warning.forEach((value,index)=>{
				// 	if(value.aw_ex1 && value.aw_dat1){
				// 		warning2.push(value)
				// 	}
				// })
				// console.log(warning2)
				// 收入只在保存提交，暂存没加，需要再加
				request({
					method: 'post',
					url: '/social/saveIncome1',
					data: {
						abi_mainid : this.$route.query.sId,
						data : JSON.stringify(this.income1.concat(this.income2).concat(this.income3).concat(this.income4).concat(this.income5).concat(this.income6).concat(this.income7)),
					},
					headers: {
						'token': sessionStorage.getItem('token')
					}
				}).then(res => {


					console.log('成功');
					toast.clear()
					this.$dialog.alert({
						message: res[0].msg,
						}).then(()=>{
							this.$router.go(-1)
						})

					// request({
					// 	method: 'post',
					// 	url: '/social/assistanceWeixin/saveBasic',
					// 	data: {
					// 		'data': '[' + JSON.stringify(this.form) + ']',
					// 		'member': JSON.stringify(memeber),
					// 		'pay': JSON.stringify([this.pay]),
					// 		'estate': JSON.stringify(estate),
					// 		'waring': JSON.stringify(warning2),
					// 		'isHc': "Y",
					// 		'isCf': 'Y',
					// 		'type': '核查'
					// 	},
					// 	headers: {
					// 		'token': sessionStorage.getItem('token')
					// 	}
					// }).then(res => {
					// 	// console.log(res)
					// 	// this.$message.success(res[0].msg)
					// 	// this.$router.go(-1)
					// 	toast.clear()
					// 	this.$dialog.alert({
					// 		message: res[0].msg,
					// 		}).then(()=>{
					// 			this.$router.go(-1)
					// 		})
					// }).catch(error => {
					// 	toast.clear()
					// 	console.log(error)
					// })
				}).catch(error => {
					toast.clear()
					console.log(error)
				})
				// request({
				// 	method: 'post',
				// 	url: '/social/assistanceWeixin/saveBasic',
				// 	data: {
				// 		'data': '[' + JSON.stringify(this.form) + ']',
				// 		'member': JSON.stringify(memeber),
				// 		'pay': JSON.stringify([this.pay]),
				// 		'estate': JSON.stringify(estate),
				// 		'waring': JSON.stringify(warning2),
				// 		'isHc': "Y",
				// 		'isCf': 'Y',
				// 		'type': '核查'
				// 	},
				// 	headers: {
				// 		'token': sessionStorage.getItem('token')
				// 	}
				// }).then(res => {
				// 	// console.log(res)
				// 	// this.$message.success(res[0].msg)
				// 	// this.$router.go(-1)
				// 	toast.clear()
				// 	this.$dialog.alert({
				// 	      message: res[0].msg,
				// 	    }).then(()=>{
				// 			this.$router.go(-1)
				// 		})
				// }).catch(error => {
				// 	toast.clear()
				// 	console.log(error)
				// })
			},
			// change(value) {
			// 	console.log(value)
			// 	console.log('change方法')
			// 	this.form.ab_ex94 = (value / 12).toFixed(2)
			// 	this.form.ab_ex94_ = (this.form.ab_ex94 / this.form.ab_ex5).toFixed(2)
			// 	this.changeAmt('change')
			// },
			change2(value, item) {
				var money = ((value - this.form.ab_ex38 * 2) / 2).toFixed(2);
				if (money < 0) {
					money = 0;
				}
				item.abm_ex18 = money
				console.log(item)
			},
			changeSfz(value) {
				if (isCardID(value) == '') {
					this.form.ab_ex69 = getSex(value)
				}
			},
			changeSfz2(item) {
				console.log(item)
				if (isCardID(item.abm_ex2) == '') {
					item.abm_ex5 = getSex(item.abm_ex2)
					item.abm_ex29 = getAge(item.abm_ex2)
					if(item.abm_ex5)
					if(item.abm_ex5 == "男"){
						if(item.abm_ex29 >= 60){
							this.$set(item,"abm_ex46",'否');
						}else{
							this.$set(item,"abm_ex46",'是');
						}
					}else if(item.abm_ex5 == "女"){
						if(item.abm_ex29 >= 55){
							this.$set(item,"abm_ex46",'否');
						}else{
							this.$set(item,"abm_ex46",'是');
						}
					}
					
				}
			},
			changeSex(value) {
				console.log(value)
				if (value = '男') {
					this.form.ab_ex69 = '男'
				} else if (value = '女') {
					this.form.ab_ex69 = '女'
				}
				console.log(this.form.ab_ex69,'this.form.ab_ex69');

				// 特困补贴标准
				// this.changetkbt()
			},

			changeInp(val) {
				if (val <= 20000) {
					var m = 1065;
					this.form.ab_ex108 = m.toFixed(2)
					this.form.ab_ex40 = m.toFixed(2)
					this.ab_ex108_2 = m.toFixed(2)
				} else {
					this.getJZMoney("因病支出型困难家庭");
				}
			},
			changeInp2(val) {
				//财产损失
				if (val <= 20000) {
					var m = 1065;
					this.form.ab_ex110 = m.toFixed(2)
					this.form.ab_ex40 = m.toFixed(2)
					this.ab_ex110_2 = m.toFixed(2)
				} else {
					this.getJZMoney("因灾急难型困难家庭");
				}
			},
			changeInp3(val) {
				this.getJZMoney("发生人身伤害意外事件");
			},
			changeInp4(val) {
				this.getJZMoney("因学支出型困难家庭");
			},
			getJZMoney(knType) {
				var ab_ex38 = Number(this.form.ab_ex38); //救助标准基数
				var pro1_5 = ab_ex38 * 1.5; //1.5倍
				var pro3 = ab_ex38 * 3;
				var pro12 = ab_ex38 * 12;
			
				var m = 0;
				var inputV = 0;
				var v = 0;
				switch (knType) {
					case "因病支出型困难家庭":
						var pro15 = ab_ex38 * 15;
						inputV = Number(this.form.ab_ex107); //自付医疗费
						v = Number(this.form.ab_ex108);
						m = pro1_5;
						m = inputV <= 20000 ? (pro1_5 > v ? pro1_5 : (pro3 < v ? pro3 : v)) : ((inputV * 0.1) > pro15 ? pro15 : (inputV * 0.1));
						this.form.ab_ex108 = m.toFixed(2)
						console.log(m.toFixed(2))
						break;
					case "因灾急难型困难家庭":
						inputV = this.form.ab_ex109; //财产损失
						v = Number(this.form.ab_ex110);
						m = inputV <= 20000 ? (pro1_5 > v ? pro1_5 : (pro3 < v ? pro3 : v)) : ((inputV * 0.1) > pro12 ? pro12 : (inputV * 0.1));
						this.form.ab_ex110 = m.toFixed(2);
						console.log(ab_ex38)
						break;
					case "发生人身伤害意外事件":
						inputV = this.form.ab_ex111;
						m = inputV > pro12 ? pro12 : inputV;
						this.form.ab_ex111 = m.toFixed(2);
						break;
					case "因学支出型困难家庭":
						var yxType = this.form.ab_ex112;
						inputV = Number(this.form.ab_ex103);
						var pro2_5 = ab_ex38 * 2.5;
						var pro4 = ab_ex38 * 4;
						if (yxType === "高中") {
							m = inputV > pro2_5 ? pro2_5 : inputV;
						} else if (yxType === "专科") {
							m = inputV > pro3 ? pro3 : inputV;
						} else {
							m = inputV > pro4 ? pro4 : inputV;
						}
						this.form.ab_ex103 = m.toFixed(2);
						break;
					case "其他特殊原因致困":
						m = Number(this.form.ab_ex114);
						break;
					default:
						break;
				}
				this.form.ab_ex40 = m.toFixed(2);
			},
			getJZMoney2(val){
				if (this.ab_ex108_2 && val <= this.ab_ex108_2) {
					this.form.ab_ex108 = val
					this.form.ab_ex40 = val
				}else if(this.form.ab_ex107){
					this.changeInp(this.form.ab_ex107)
				}
			},
			getJZMoney3(val){
				if (this.ab_ex110_2 && val <= this.ab_ex110_2) {
					this.form.ab_ex109 = val
					this.form.ab_ex40 = val
				}else if(this.form.ab_ex109){
					this.changeInp2(this.form.ab_ex109)
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
			changetkbt(){
				console.log('erro')
				if (this.$route.query.type == '特困供养' && this.form.ab_ex6 && this.form.ab_ex71) {
					// this.form.ab_ex40 = 855
					// this.form.ab_ex38 = 855
					// form.ab_ex6 //户口性质
					// form.ab_ex71//供养方式
					let ab_ex6 = ''
					let nc = false
					if(this.form.ab_ex6 =='农业户口'){
						ab_ex6 = '农村'
						nc = true
					}else if(this.form.ab_ex6 =='非农业户口'){
						ab_ex6 = '城市'
					}
					
					request({
						method: 'post',
						url: '/social/assistance/getBasicMoney',
						data: {
							as_ex6:ab_ex6,
							as_ex7:this.form.ab_ex71,
						},
					}).then(res => {
						if(nc == true){
							console.log((res[0].money / 12).toFixed(2))
							this.form.ab_ex38 = (res[0].money / 12).toFixed(2)
							this.form.ab_ex40 = (res[0].money / 12).toFixed(2)
						}else{
							this.form.ab_ex38 = res[0].money
							this.form.ab_ex40 = res[0].money
						}
					}).catch(erro => {
						console.log(erro)
					})
					
				}
			},
			changeKinsfolk(val){
				if(val=='否'){
					this.family5 = []
				}
			},
			paychange(){
				// 家庭人口
				let r = Number(this.form.ab_ex5)
				// 家庭总收入
				let s = Number(this.income7[0].abi_ex2)
				let p4 = Number(this.pay.abp_ex4)
				let p5 = Number(this.pay.abp_ex5)
				let p6 = Number(this.pay.abp_ex6)
				let p7 = Number(this.pay.abp_ex7)
				this.pay.abp_ex8 = (p4+p5+p6+p7).toFixed(2)
				this.pay.abp_ex9 = s-this.pay.abp_ex8
				this.pay.abp_ex10 = (this.pay.abp_ex9/r).toFixed(2)
			},
			incomeAmt(income){
				return new Promise((resolve,reject)=>{
					let amt = 0
					if(income.length>0){
						for(let i=0; i<income.length ; i++){
							if(income[i].abi_ex2){
								amt+= Number(Number(income[i].abi_ex2).toFixed(2))
							}
							if(i==income.length-1){
								resolve(amt)
							}
						}
					}else{
						resolve(amt)
					}
					
				})
			},
			async changeAmt() {
				if (this.$route.query.type == '低保') {
					// 要算数组里所有的值
					let a1 = await this.incomeAmt(this.income1) //工资性收入
					let a2 = await this.incomeAmt(this.income2) //经营净收入
					let a3 = await this.incomeAmt(this.income3) //财产净收入
					let a4 = await this.incomeAmt(this.income4) //转移性收入
					let a5 = this.income5[0].abi_ex2 ? parseInt(this.income5[0].abi_ex2) : 0 //其他收入
					let a6 = this.income6[0].abi_ex2 ? parseInt(this.income6[0].abi_ex2) : 0 //必要就业成本抵扣
					var amt =a1+a2+a3+a4+a5+a6; //家庭总收入(不包括赡养费)

					// let mm = 0 //保障对象人数
					// let nn = 0 //人数(除去未成年人，重残，重病)
					let rr = 0 //增发人数
					// let oo = 0 //保障对象为是且增发类别为未成年人的人数
					// let pp = 0 //保障对象为是且增发类别为重病的人数
					// let qq = 0 //保障对象为是且增发类别为重残的人数
					let ii = Number(this.form.ab_ex38) //低保标准
					
					let fyf = 0 //赡抚养费
					new Promise((resolve,reject)=>{
						if(this.family2.length>0){
							this.family2.forEach((item,index)=>{
								let f = item.abm_ex18 ? parseInt(item.abm_ex18) : 0
								fyf += f
								if(this.family2.length-1 == index){
									console.log('promise里面')
									resolve(fyf)
								}
							})
						}else{
							console.log('fyf:'+fyf)
							console.log('promise直接反')
							resolve(fyf)
						}
						
					}).then((res)=>{
						console.log('res:'+res)
						// 总收入(包括赡抚养费)
						amt+=res
						this.income7[0].abi_ex2 = amt
						this.paychange()
						// 月平均
						this.income7[1].abi_ex2 = (amt / 12).toFixed(2)
						if(this.form.ab_ex5){
							this.$set(this.income7[2],'abi_ex2',(this.income7[1].abi_ex2 / this.form.ab_ex5).toFixed(2))
						}else{
							this.$set(this.income7[2],'abi_ex2',this.income7[1].abi_ex2)
						}
						let monthlyInsuranceAmount = 0
						this.family.forEach((item, index) => {
							if(item.abm_ex42 == '是'){
								// 单人保
								if(this.form.ab_ex41 == '残疾人单列户施保'){
									// item.abm_ex69 = Math.round(ii*1.35)
									// item.abm_ex70 = 0
									// item.abm_ex71 = item.abm_ex69
									// this.form.ab_ex40 = item.abm_ex69
									item.abm_ex71 = Number(item.abm_ex69)+Number(item.abm_ex70)
									this.form.ab_ex40 = item.abm_ex71
									return false
								}else if(this.form.ab_ex41 == '重病型单列户施保'){
									// item.abm_ex69 = Math.round(ii*1.2)
									// item.abm_ex70 = 0
									// item.abm_ex71 = item.abm_ex69
									// this.form.ab_ex40 = item.abm_ex69
									item.abm_ex71 = Number(item.abm_ex69)+Number(item.abm_ex70)
									this.form.ab_ex40 = item.abm_ex71
									return false
								}else{
									console.log('增发金额')
								
									item.abm_ex71 = Number(item.abm_ex69) + Number(item.abm_ex70)
									monthlyInsuranceAmount += item.abm_ex71
									this.form.ab_ex40 = monthlyInsuranceAmount
								}

							}else{
								item.abm_ex69 =	0
								item.abm_ex70 = 0
								item.abm_ex71 = 0
							}
						})
					})
					
				}else{
					let a1 = await this.incomeAmt(this.income1) //工资性收入
					let a2 = await this.incomeAmt(this.income2) //经营净收入
					let a3 = await this.incomeAmt(this.income3) //财产净收入
					let a4 = await this.incomeAmt(this.income4) //转移性收入
					let a5 = this.income5[0].abi_ex2 ? parseInt(this.income5[0].abi_ex2) : 0 //其他收入
					let a6 = this.income6[0].abi_ex2 ? parseInt(this.income6[0].abi_ex2) : 0 //必要就业成本抵扣
					var amt =a1+a2+a3+a4+a5+a6; //家庭总收入(不包括赡养费)
					this.income7[0].abi_ex2 = amt
					this.paychange()
					this.income7[1].abi_ex2 = (amt / 12).toFixed(2)
					if(this.form.ab_ex5){
							this.$set(this.income7[2],'abi_ex2',(this.income7[1].abi_ex2 / this.form.ab_ex5).toFixed(2))
						}else{
							this.$set(this.income7[2],'abi_ex2',this.income7[1].abi_ex2)
						}
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
		/* background-color: #f5f5f5; */
		background-color: #3e80cc;
		box-shadow: 0px 0px 30px #a1a1a1;
		position: fixed;
		z-index: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		/* font-size: 10px; */
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
		width: 20px;
		height: 8px;
		background-color: #e2e2e2;
		border-radius: 10px;
		margin: 0 0.1px 0 0.1px;
	}

	main {
		padding-top: 100px;
	}
	.page0Class{
		margin-bottom: 120px;
		display: block;
		text-align: left;
	}
	.page1Class{
		margin-bottom: 200px;
		display: block;
		text-align: left;
	}
	.page1ClassDiv{
		padding:10px;
		background:#f5f5f5;
		height:60px;
		border-bottom:1px solid #ddd;
		font-size: 28px;
	}
	.page1ClassDivFont{
		color: #00AAFF;
		line-height:60px
	}
	.page2Class{
		margin-bottom: 120px;
		display: block;
		/* padding-top: 20px; */
	}
	.page2ClassDiv{
		font-size:28px;
		padding:0 20px 0 20px;
		text-align: left;
	}
	.page2ClassDiv2{
		border-bottom:#aaa solid 1px;
		font-size: 28px;
		color: #00AAFF;
	}
	.page2ClassDiv2Font{
		background-color: #00AAFF;
		display: inline-block;
		width: 10px;height: 20px;
	}
	.page4Img{
		display:flex;
		flex-direction:column;
		justify-content: center;
		align-items: center;
	}
	.page4Img2{
		overflow: auto;
		margin-top:40px;
		text-align: left;
		width:90%;
		height:500px;
		font-size:28px;
		color:#545454;
		padding:0 20px 0 20px;
		border-radius: 30px;
		border:#aaa solid 1px;
	}
	.page4Img2Font{
		height:80px;
		line-height:80px;
		font-size: 28px;
	}
	.page4Img2Div{
		margin-top:10px;
	}
	.page5Div{
		font-size:34px;
		padding:0 20px 0 20px;
		text-align: left;
	}
	.page6Div{
		margin-bottom: 100px;
		/* padding-left: 10px; */
		/* display: none; */
	}
	.page6Div2{
		font-size:28px;
		text-align: left;
	}
	.page6Div3{
		width:90%;
		margin-left:2%;
		height:400px;
		font-size:28px;
		color:#545454;
		padding:0 20px 0 20px;
		margin-top:10px;
		border-radius: 15px;
		border:#aaa solid 1px;
	}
	.page6Div3Font{
		height:80px;
		line-height:80px
	}
	.page6Div3Img{
		width:40%;
		height:400px;
		text-align: center;
		float: left;
		margin-left:20px;
	}
	.page6Div3Img2{
		width:40%;
		height:400px;
		text-align: center;
		float: right;
		margin-right:20px;
	}
	.page6Div4{
		font-size:28px;
		text-align: left;
		margin-top: 100px;
	}
	.page6Div5{
		overflow: auto;
		text-align:left;
		margin-left:2%;
		width:90%;
		height:500px;
		font-size:28px;
		color:#545454;
		padding:0 20px 0 20px;
		border-radius: 30px;
		border:#aaa solid 1px;
	}
</style>

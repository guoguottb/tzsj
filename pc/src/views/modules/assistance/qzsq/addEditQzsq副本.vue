<template>
	<div class="g-box">
	<div class="g-box2">
		<div class="info2">
			<el-form :model="dibaoForm" :rules="rules"  :inline-message="true" :show-message="false" ref="dibaoForm" label-width="auto" style='padding-right: 10px;' @submit.native.prevent>
				<h3 class="line_blue" id="page1">&emsp;基本信息</h3>
				<div class="lineSt"></div>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="申请人姓名" prop="ab_ex3">
							<el-input v-model="dibaoForm.ab_ex3" placeholder="请输入申请人姓名"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="身份证号码" prop="ab_ex7">
							<el-input v-model="dibaoForm.ab_ex7" placeholder="请输入身份证号码"  ></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col>
						<el-form-item label="行政区划" prop="ab_ex162">
							<el-cascader :props="props" v-model="xzqhArray" placeholder="请选择" style="width:100%;" v-if="isFinish"></el-cascader>
						</el-form-item>
					</el-col>
				</el-row>
				<!-- <el-row >
					<el-col :span="12">
						<el-form-item label="户籍地址" prop="ab_ex4">
							<el-cascader :props="props" v-model="householdRegistrationAddress" @change="hAddress" placeholder="请选择户籍地址" style="width:100%;" v-if="isFinish"></el-cascader>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						 <el-input v-model="houseNum" style="width:99%;margin-left:1%" placeholder="请完善户籍地址门牌号"></el-input>
					</el-col>
				</el-row> -->

				<el-row :gutter="20"> 
					<el-col :span="12">
						<el-form-item label="户籍地址" prop="ab_ex4">
							<el-input v-model="dibaoForm.ab_ex4" placeholder="请输入户籍地址" ></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="家庭住址" prop="ab_ex11">
							<el-input v-model="dibaoForm.ab_ex11" placeholder="请输入家庭住址" clearable></el-input>
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
						<el-form-item label="家庭人口" prop="ab_ex5" >
							<el-input v-model="dibaoForm.ab_ex5" placeholder="请输入家庭人口"  @change="changeAmt" ></el-input>
						</el-form-item>
					</el-col>
					
				</el-row>
				<el-row :gutter="20">
					<el-col :span="24">
						<el-form-item label="联系电话" prop="ab_ex28">
							<el-input v-model="dibaoForm.ab_ex28" placeholder="请输入联系电话(手机) "></el-input>
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
							<el-select v-model="dibaoForm.ab_ex92" style="width:100%" @change="changeFm4(dibaoForm.ab_ex92)" >
								<el-option label="否" value="否"></el-option>
								<el-option label="是" value="是"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<div v-if="dibaoForm.ab_ex92=='是'" style="margin-bottom:30px">
					<h3 class="line_blue" id="page21">&emsp;村干部或经办人员近亲属信息</h3>
					<div class="lineSt"></div>
					<el-row class="button-group">
						<el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAddDetails('familyData4')">
							新增</el-button>
						<el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDelDetails('familyData4')">
							删除</el-button>
					</el-row>
					<el-table :data="familyData4" border :row-class-name="rowClassName"
						@selection-change="handleFamilyData4" empty-text='空' class="my-table">
						<el-table-column type="selection" width="40" align="center" />
						<el-table-column prop="abm_ex3" label="姓名" min-width="110">
							<template slot-scope="scope">
								<el-input v-model="familyData4[scope.row.xh-1].abm_ex3"></el-input>
							</template>
						</el-table-column>
						<el-table-column prop="abm_ex1" label="近亲属关系" min-width="125">
							<template slot-scope="scope">
								<el-input v-model="familyData4[scope.row.xh-1].abm_ex1"></el-input>
							</template>
						</el-table-column>
						<el-table-column prop="abm_ex15" label="任职机构和职位" min-width="190">
							<template slot-scope="scope">
								<el-input v-model="familyData4[scope.row.xh-1].abm_ex15"></el-input>
							</template>
						</el-table-column>
					</el-table>
				</div>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="一卡通开户银行" prop="ab_ex42">
							<el-input v-model="dibaoForm.ab_ex42" placeholder="请输入开户银行"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="开户人" prop="ab_ex8">
							<el-input v-model="dibaoForm.ab_ex8" placeholder="请输入开户人"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="24">
						<el-form-item label="一卡通银行账号" prop="ab_ex43">
							<el-input v-model="dibaoForm.ab_ex43" placeholder="请输入银行账号"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<h3 class="line_blue" id="page2">&emsp;自定义预警</h3>
				<div class="lineSt"></div>
				<el-row class="button-group">
					<el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAddDetails('warningData')">
						新增</el-button>
					<el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDelDetails('warningData')">
						删除</el-button>
				</el-row>
				<el-table :data="warningData" border :row-class-name="rowClassName"
					@selection-change="handleWarningData" empty-text='空' class="my-table">
					<el-table-column type="selection" width="40" align="center" />
					<el-table-column prop="aw_ex1" label="预警内容" min-width="110">
						<template slot-scope="scope">
							<el-input v-model="warningData[scope.row.xh-1].aw_ex1" placeholder="请输入预警内容" @change="changeAmt2"></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="aw_dat1" label="预警时间" min-width="125">
						<template slot-scope="scope">
							<!-- <el-input v-model="warningData[scope.row.xh-1].aw_dat1"></el-input> -->
							<el-date-picker  v-model="warningData[scope.row.xh-1].aw_dat1"  value-format="yyyy-MM-dd" style="width: 100%;" :picker-options="pickerOptions"  @change="changeAmt2">
						</el-date-picker>
						</template>
					</el-table-column>
				</el-table>
				<!-- <el-row :gutter="20"  v-for="(item,index) in warningData" :key="index"> -->
					<!-- <el-col :span="12">
						<el-form-item label="预警内容" prop="aw_ex1">
							<el-input v-model="warningData[index].aw_ex1" placeholder="请输入预警内容"  @change="changeAmt2"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="预警时间" prop="aw_dat1" disabledDate>
							<el-date-picker  v-model="warningData[index].aw_dat1"  value-format="yyyy-MM-dd" style="width: 100%;" :picker-options="pickerOptions"  @change="changeAmt2">
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row> -->
				<!-- <el-row :gutter="20" >
					<el-col :span="12">
						<el-form-item label="预警内容2" prop="aw_ex1">
							<el-input v-model="warningData[1].aw_ex1" placeholder="请输入预警内容" @change="changeAmt2"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="预警时间2" prop="aw_dat1">
							<el-date-picker type="date" v-model="warningData[1].aw_dat1"  value-format="yyyy-MM-dd" style="width: 100%;" :picker-options="pickerOptions" @change="changeAmt2">
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20" >
					<el-col :span="12">
						<el-form-item label="预警内容3" prop="aw_ex1">
							<el-input v-model="warningData[2].aw_ex1" placeholder="请输入预警内容" @change="changeAmt2"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="预警时间3" prop="aw_dat1">
							<el-date-picker type="date" v-model="warningData[2].aw_dat1"  value-format="yyyy-MM-dd" style="width: 100%;" :picker-options="pickerOptions"  @change="changeAmt2">
							</el-date-picker>
						</el-form-item>
					</el-col>-->
				<!-- </el-row>  -->
				<h3 class="line_blue" id="page3">&emsp;共同生活家庭成员情况</h3>
				<div class="lineSt"></div>
				<el-row class="button-group">
					<el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAddDetails('familyData1')">
						新增</el-button>
					<el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDelDetails('familyData1')">
						删除</el-button>
				</el-row>
				<el-table :data="familyData1" border :row-class-name="rowClassName"
					@selection-change="handleFamilyData1" empty-text='空' class="my-table">
					<el-table-column type="selection" width="40" align="center" />
					<el-table-column prop="abm_ex3" label="姓名" min-width="110">
						<template slot-scope="scope">
							<el-input v-model="familyData1[scope.row.xh-1].abm_ex3"></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="abm_ex1" label="与户主关系" min-width="150">
						<template slot-scope="scope">
							<el-select v-model="familyData1[scope.row.xh-1].abm_ex1" >
								<el-option label="户主" value="户主"></el-option>
								<el-option label="配偶" value="配偶"></el-option>
								<el-option label="子/婿" value="子/婿"></el-option>
								<el-option label="女/媳" value="女/媳"></el-option>
								<el-option label="(外)孙子女" value="(外)孙子女"></el-option>
								<el-option label="父母/岳父母/公婆" value="父母/岳父母/公婆"></el-option>
								<el-option label="(外)祖父母" value="(外)祖父母"></el-option>
								<el-option label="兄弟姐妹" value="兄弟姐妹"></el-option>
								<el-option label="其他" value="其他"></el-option>
							</el-select>
						</template>
					</el-table-column>
					<el-table-column prop="abm_ex2" label="身份证号码" min-width="190">
						<template slot-scope="scope">
							<el-input v-model="familyData1[scope.row.xh-1].abm_ex2" @change="changeCard(scope.$index,scope.row)"></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="abm_ex5" label="性别" min-width="110">
						<template slot-scope="scope">
							<el-select v-model="familyData1[scope.row.xh-1].abm_ex5">
								<el-option label="男" value="男"></el-option>
								<el-option label="女" value="女"></el-option>
							</el-select>
						</template>
					</el-table-column>
					<el-table-column prop="abm_ex16" label="民族选择" min-width="190" >
						<template slot-scope="scope">
							<el-select v-model="familyData1[scope.row.xh-1].abm_ex16">
								<el-option label="请选择" value=""></el-option>
								<el-option v-for="(item,index) in nation" :key="index" :label="item" :value="item">
								</el-option>
							</el-select>
						</template>
					</el-table-column>
					<el-table-column prop="abm_ex7" label="户口性质" min-width="130">
						<template slot-scope="scope">
							<el-select v-model="familyData1[scope.row.xh-1].abm_ex7" >
								<el-option label="请选择"  value=""></el-option>
								<el-option label="非农业户口" value="非农业户口"></el-option>
								<el-option label="农业户口" value="农业户口"></el-option>
							</el-select>
						</template>
					</el-table-column>
					<el-table-column prop="abm_ex28" label="婚姻状况" min-width="110">
						<template slot-scope="scope">
							<el-select v-model="familyData1[scope.row.xh-1].abm_ex28" >
								<el-option label="请选择" value=""></el-option>
									<el-option label="未婚" value="未婚"></el-option>
									<el-option label="已婚" value="已婚"></el-option>
									<el-option label="离异" value="离异"></el-option>
									<el-option label="初婚" value="初婚"></el-option>
									<el-option label="再婚" value="再婚"></el-option>
									<el-option label="复婚" value="复婚"></el-option>
									<el-option label="丧偶" value="丧偶"></el-option>
									<!-- <el-option label="未说明的婚姻状况" value="未说明的婚姻状况"></el-option> -->
							</el-select>
						</template>
					</el-table-column>
					<el-table-column prop="abm_ex51" label="特定对象" min-width="200">
						<template slot-scope="scope">
							<el-select v-model="familyData1[scope.row.xh-1].abm_ex51">
								<el-option label="请选择" value=""></el-option>
								<el-option label="老年人" value="老年人"></el-option>
								<el-option label="未成年人" value="未成年人"></el-option>
								<el-option label="独居" value="独居"></el-option>
								<el-option label="散居归侨/侨属" value="散居归侨/侨属"></el-option>
								<el-option label="少数民族" value="少数民族"></el-option>
								<el-option label="重病" value="重病"></el-option>
								<el-option label="重残" value="重残"></el-option>
								<el-option label="退役军人" value="退役军人"></el-option>
								<el-option label="军转干部" value="军转干部"></el-option>
								<el-option label="已故原工商业者无工作的配偶" value="已故原工商业者无工作的配偶"></el-option>
								<el-option label="艾滋病患者" value="艾滋病患者"></el-option>
								<el-option label="易肇事肇祸精神病人" value="易肇事肇祸精神病人"></el-option>
								<el-option label="两牢释放人员" value="两牢释放人员"></el-option>
								<el-option label="社区矫正人员" value="社区矫正人员"></el-option>
								<el-option label="建国前老党员" value="建国前老党员"></el-option>
								<el-option label="高校毕业生" value="高校毕业生"></el-option>
								<el-option label="宗教教职员" value="宗教教职员"></el-option>

								<el-option label="休渔期渔民" value="休渔期渔民"></el-option>
								<el-option label="非农水库移民" value="非农水库移民"></el-option>
								<el-option label="农业户口水库移民" value="农业户口水库移民"></el-option>
								<el-option label="森工企业/含国有林场人员" value="森工企业/含国有林场人员"></el-option>
								<el-option label="农垦企业人员/含农场" value="农垦企业人员/含农场"></el-option>
								<el-option label="原民政救济对象" value="原民政救济对象"></el-option>
								<el-option label="被征地人员" value="被征地人员"></el-option>
								<el-option label="僧尼" value="僧尼"></el-option>
								<el-option label="持独生子女父母光荣证人员" value="持独生子女父母光荣证人员"></el-option>
								<el-option label="奖扶/特扶人员" value="奖扶/特扶人员"></el-option>
								<el-option label="边民" value="边民"></el-option>
								<el-option label="归侨" value="归侨"></el-option>
								<el-option label="劳模先进" value="劳模先进"></el-option>
								<el-option label="原工商业主" value="原工商业主"></el-option>
								<el-option label="优抚对象" value="优抚对象"></el-option>
								<el-option label="其他优抚对象" value="其他优抚对象"></el-option>
								<el-option label="集中孤儿" value="集中孤儿"></el-option>
								<el-option label="分散孤儿" value="分散孤儿"></el-option>
								<el-option label="单亲家庭子女" value="单亲家庭子女"></el-option>
								<el-option label="三类企业人员" value="三类企业人员"></el-option>
								<el-option label="托管人员" value="托管人员"></el-option>
								<el-option label="孤儿" value="孤儿"></el-option>
								<el-option label="计生失独人员" value="计生失独人员"></el-option>
								<el-option label="血友病转艾滋病人员" value="血友病转艾滋病人员"></el-option>
								<el-option label="2008年前鉴定的完全丧失劳动能力残疾人" value="2008年前鉴定的完全丧失劳动能力残疾人"></el-option>
								<el-option label="吸毒史人员" value="吸毒史人员"></el-option>
								<el-option label="服刑人员" value="服刑人员"></el-option>
								<el-option label="信访维稳对象" value="信访维稳对象"></el-option>
								<el-option label="民政部门认定的其它特定救助对象" value="民政部门认定的其它特定救助对象"></el-option>
								<el-option label="非特定救助对象" value="非特定救助对象"></el-option>
							</el-select>
						</template>
						
					</el-table-column>
					<el-table-column prop="" label="年龄" min-width="110">
						<template slot-scope="scope">
							<el-input v-model="familyData1[scope.row.xh-1].age" ></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="" label="是否属于劳动年龄段" min-width="160">
						<template slot-scope="scope">
							<el-select  v-model="familyData1[scope.row.xh-1].work" @change="changeMember(scope.$index)" >
								<el-option label="是" value="是"></el-option>
								<el-option label="否" value="否"></el-option>
							</el-select>
						</template>
					</el-table-column>
					<el-table-column prop="abm_ex11" label="健康状况" min-width="150">
					
						<template slot-scope="scope">
							<el-select v-model="familyData1[scope.row.xh-1].abm_ex11" @change="changeMember(scope.$index)">
								<el-option label="请选择" value=""></el-option>
								<el-option label="健康" value="健康"></el-option>
								<el-option label="重病" value="重病"></el-option>
								<el-option label="残疾" value="残疾"></el-option>
							</el-select>
						</template>
					</el-table-column>
					<el-table-column prop="abm_ex52" label="重病病种" min-width="200" >
						<template slot-scope="scope">
							<!--el-select v-model="familyData1[scope.row.xh-1].abm_ex52"  :disabled="disabledList.indexOf('a'+scope.$index)>=0 "   @change="changeMember(scope.$index)"-->
							<el-select v-model="familyData1[scope.row.xh-1].abm_ex52"  :disabled="scope.row.abm_ex11!='重病' "   @change="changeMember(scope.$index)">
								<el-option label="请选择" value=""></el-option>
								<el-option label="急性白血病" value="急性白血病"></el-option>
								<el-option label="白血病" value="白血病"></el-option>
								<el-option label="再生障碍性贫血" value="再生障碍性贫血"></el-option>
								<el-option label="戈谢病" value="戈谢病"></el-option>
								<el-option label="血友病" value="血友病"></el-option>
								<el-option label="血小板减少性紫癜" value="血小板减少性紫癜"></el-option>
								<el-option label="恶性肿瘤（癌症）" value="恶性肿瘤（癌症）"></el-option>
								<el-option label="子宫癌" value="子宫癌"></el-option>
								<el-option label="细胞间质瘤" value="细胞间质瘤"></el-option>
								<el-option label="心脏病" value="心脏病"></el-option>
								<el-option label="急性心律衰竭" value="急性心律衰竭"></el-option>
								<el-option label="心肌梗塞" value="心肌梗塞"></el-option>
								<el-option label="风湿性心脏病" value="风湿性心脏病"></el-option>
								<el-option label="终末期肾病" value="终末期肾病"></el-option>
								<el-option label="器官移植后抗排异药物治疗" value="器官移植后抗排异药物治疗"></el-option>
								<el-option label="系统性红斑狼疮(活动期或伴有脏器损害)" value="系统性红斑狼疮(活动期或伴有脏器损害)"></el-option>
								<el-option label="肝硬化失代偿期" value="肝硬化失代偿期"></el-option>
								<el-option label="重症类风湿关节炎" value="重症类风湿关节炎"></el-option>
								<el-option label="强直性脊柱炎" value="强直性脊柱炎"></el-option>
								<el-option label="糖尿病合并严重并发症(限晚期糖尿病肾病、糖尿病足〈有坏疽、 深部溃疡、脓肿、骨髓炎〉患者)" value="糖尿病合并严重并发症(限晚期糖尿病肾病、糖尿病足〈有坏疽、 深部溃疡、脓肿、骨髓炎〉患者)"></el-option>
								<el-option label="艾滋病机会感染" value="艾滋病机会感染"></el-option>
								<el-option label="慢性阻塞性肺疾病" value="慢性阻塞性肺疾病"></el-option>
								<el-option label="尘肺" value="尘肺"></el-option>
								<el-option label="地中海贫血" value="地中海贫血"></el-option>
								<el-option label="克罗恩病" value="克罗恩病"></el-option>
								<el-option label="渐冻人病" value="渐冻人病"></el-option>
							</el-select>
						</template>
					</el-table-column>
					<el-table-column prop="abm_ex39" label="残疾种类" min-width="110" >
						<template slot-scope="scope">
							<!--el-select v-model="familyData1[scope.row.xh-1].abm_ex39"  :disabled="disabledList2.indexOf('a'+scope.$index)>=0 "   @change="changeMember(scope.$index)"-->
							<el-select v-model="familyData1[scope.row.xh-1].abm_ex39"  :disabled="scope.row.abm_ex11!='残疾' "   @change="changeMember(scope.$index)">
								<!--el-option :label="disabledList2.indexOf(scope.$index)>=0" value=""></el-option-->
								<el-option label="请选择" value=""></el-option>
								<el-option label="肢体残疾" value="肢体残疾"></el-option>
								<el-option label="精神残疾" value="精神残疾"></el-option>
								<el-option label="智力残疾" value="智力残疾"></el-option>
								<el-option label="视力残疾" value="视力残疾"></el-option>
								<el-option label="言语残疾" value="言语残疾"></el-option>
								<el-option label="听力残疾" value="听力残疾"></el-option>
								<el-option label="多重残疾" value="多重残疾"></el-option>
								<el-option label="其他残疾" value="其他残疾"></el-option>
							</el-select>
						</template>
					</el-table-column>
					<el-table-column prop="abm_ex40" label="残疾等级" min-width="110" >
						<template slot-scope="scope">
							<!--el-select v-model="familyData1[scope.row.xh-1].abm_ex40"  :disabled="disabledList2.indexOf('a'+scope.$index)>=0 "   @change="changeMember(scope.$index)"-->
							<el-select v-model="familyData1[scope.row.xh-1].abm_ex40"  :disabled="scope.row.abm_ex11!='残疾' "   @change="changeMember(scope.$index)">
								<el-option label="请选择" value=""></el-option>
								<el-option label="一级残疾" value="一级残疾"></el-option>
								<el-option label="二级残疾" value="二级残疾"></el-option>
								<el-option label="三级残疾" value="三级残疾"></el-option>
								<el-option label="四级残疾" value="四级残疾"></el-option>
							</el-select>
						</template>
					</el-table-column>
					<el-table-column prop="abm_ex49" label="劳动能力" min-width="160">
						<template slot-scope="scope">
							<el-select v-model="familyData1[scope.row.xh-1].abm_ex49">
								<el-option label="请选择" value=""></el-option>
								<el-option label="有劳动能力" value="有劳动能力"></el-option>
								<el-option label="部分丧失劳动能力" value="部分丧失劳动能力"></el-option>
								<el-option label="完全丧失劳动能力" value="完全丧失劳动能力"></el-option>
								<el-option label="无劳动能力" value="无劳动能力"></el-option>
							</el-select>
						</template>
					</el-table-column>
					<el-table-column prop="abm_ex14" label="职业状况" min-width="160">
						<template slot-scope="scope">
							<el-select v-model="familyData1[scope.row.xh-1].abm_ex14">
								<el-option label="请选择" value=""></el-option>
								<el-option label="在职职工" value="在职职工"></el-option>
								<el-option label="灵活就业人员" value="灵活就业人员"></el-option>
								<el-option label="登记失业人员" value="登记失业人员"></el-option>
								<el-option label="未登记失业人员" value="未登记失业人员"></el-option>
								<el-option label="无就业条件人员" value="无就业条件"></el-option>
								<el-option label="离退休人员" value="离退休人员"></el-option>
								<el-option label="务农人员" value="务农人员"></el-option>
								<el-option label="务工人员" value="务工人员"></el-option>
								<el-option label="非法定年龄就业状况" value="非法定年龄就业状况"></el-option>
								<el-option label="享受养老保险人员" value="享受养老保险人员"></el-option>
								<el-option label="其他就业情况" value="其他就业情况"></el-option>
							</el-select>
						</template>
					</el-table-column>
					<el-table-column prop="abm_ex15" label="工作单位" min-width="200">
						<template slot-scope="scope">
							<el-input v-model="familyData1[scope.row.xh-1].abm_ex15"></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="abm_ex17" label="月收入" min-width="100">
						<template slot-scope="scope">
							<el-input v-model="familyData1[scope.row.xh-1].abm_ex17"></el-input>
						</template>
					</el-table-column>
					<!-- <el-table-column prop="abm_ex17" label="身份证材料上传" min-width="150">
							<el-button type="text" @click=""> 上传</el-button>
					</el-table-column> -->
				</el-table>
				<h3 class="line_blue" id="page4">&emsp;非共同生活赡抚扶养人信息</h3>
				<div class="lineSt"></div>
				<el-row class="button-group">
					<el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAddDetails('familyData2')">
						新增</el-button>
					<el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDelDetails('familyData2')">
						删除</el-button>
				</el-row>
				<el-table :data="familyData2" border :row-class-name="rowClassName"
					@selection-change="handleFamilyData2" empty-text='空' class="my-table">
					<el-table-column type="selection" width="40" align="center" />
					<el-table-column prop="abm_ex3" label="姓名" min-width="110">
						<template slot-scope="scope">
							<el-input v-model="familyData2[scope.row.xh-1].abm_ex3"></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="abm_ex1" label="赡(扶、抚)养关系" min-width="150">
						<template slot-scope="scope">
							<el-select v-model="familyData2[scope.row.xh-1].abm_ex1">
								<el-option label="请选择" value=""></el-option>
								<el-option label="户主" value="户主"></el-option>
								<el-option label="配偶" value="配偶"></el-option>
								<el-option label="子/婿" value="子/婿"></el-option>
								<el-option label="女/媳" value="女/媳"></el-option>
								<el-option label="(外)孙子女" value="(外)孙子女"></el-option>
								<el-option label="父母/岳父母/公婆" value="父母/岳父母/公婆"></el-option>
								<el-option label="(外)祖父母" value="(外)祖父母"></el-option>
								<el-option label="兄弟姐妹" value="兄弟姐妹"></el-option>
								<el-option label="其他" value="其他"></el-option>
							</el-select>
						</template>
					</el-table-column>
					<el-table-column prop="abm_ex2" label="身份证号码" min-width="190">
						<template slot-scope="scope">
							<el-input v-model="familyData2[scope.row.xh-1].abm_ex2"  @change="changeCard2(scope.$index,scope.row)"></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="abm_ex11" label="健康状况" min-width="110">
						<template slot-scope="scope">
							<el-select v-model="familyData2[scope.row.xh-1].abm_ex11" >
								<el-option label="请选择" value=""></el-option>
								<el-option label="健康" value="健康"></el-option>
								<el-option label="重病" value="重病"></el-option>
								<el-option label="残疾" value="残疾"></el-option>
							</el-select>
						</template>
					</el-table-column>
					<el-table-column prop="abm_ex49" label="劳动能力" min-width="160">
						<template slot-scope="scope">
							<el-select v-model="familyData2[scope.row.xh-1].abm_ex49">
								<el-option label="请选择" value=""></el-option>
								<el-option label="有劳动能力" value="有劳动能力"></el-option>
								<el-option label="部分丧失劳动能力" value="部分丧失劳动能力"></el-option>
								<el-option label="完全丧失劳动能力" value="完全丧失劳动能力"></el-option>
								<el-option label="无劳动能力" value="无劳动能力"></el-option>
							</el-select>
						</template>
					</el-table-column>
					<el-table-column prop="abm_ex21" label="家庭主要财产状况(房、车、金融资产)" min-width="220">
						<template slot-scope="scope">
							<el-input v-model="familyData2[scope.row.xh-1].abm_ex21"  @change="changeCard2(scope.$index,scope.row)"></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="abm_ex15" label="工作单位" min-width="200">
						<template slot-scope="scope">
							<el-input v-model="familyData2[scope.row.xh-1].abm_ex15"></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="abm_ex20" label="家庭人口" min-width="120">
						<template slot-scope="scope">
							<el-input v-model="familyData2[scope.row.xh-1].abm_ex20"></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="abm_ex17" label="家庭人均月收入" min-width="100">
						<template slot-scope="scope">
							<el-input v-model="familyData2[scope.row.xh-1].abm_ex17"></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="abm_ex18" label="月赡(扶、抚)养费" min-width="130">
						<template slot-scope="scope">
							<el-input v-model="familyData2[scope.row.xh-1].abm_ex18"></el-input>
						</template>
					</el-table-column>
				</el-table>

				<h3 class="line_blue" id="page8">&emsp;非共同生活赡抚扶养人家庭成员信息</h3>
				<div class="lineSt"></div>
				<el-row class="button-group">
					<el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAddDetails('familyData3')">
						新增</el-button>
					<el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDelDetails('familyData3')">
						删除</el-button>
				</el-row>
				<el-table :data="familyData3" border :row-class-name="rowClassName"
					@selection-change="handleFamilyData3" empty-text='空' class="my-table">
					<el-table-column type="selection" width="40" align="center" />
					<el-table-column prop="abm_ex3" label="姓名" min-width="110">
						<template slot-scope="scope">
							<el-input v-model="familyData3[scope.row.xh-1].abm_ex3"></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="abm_ex1" label="赡(扶、抚)养关系" min-width="125">
						<template slot-scope="scope">
							<el-select v-model="familyData3[scope.row.xh-1].abm_ex1" >
								<el-option label="请选择" value=""></el-option>
								<el-option label="配偶" value="配偶"></el-option>
								<el-option label="子/婿" value="子/婿"></el-option>
								<el-option label="女/媳" value="女/媳"></el-option>
								<el-option label="(外)孙子女" value="(外)孙子女"></el-option>
								<el-option label="父母/岳父母/公婆" value="父母/岳父母/公婆"></el-option>
								<el-option label="(外)祖父母" value="(外)祖父母"></el-option>
								<el-option label="兄弟姐妹" value="兄弟姐妹"></el-option>
								<el-option label="其他" value="其他"></el-option>
							</el-select>
						</template>
					</el-table-column>
					<el-table-column prop="abm_ex2" label="身份证号码" min-width="190">
						<template slot-scope="scope">
							<el-input v-model="familyData3[scope.row.xh-1].abm_ex2"></el-input>
						</template>
					</el-table-column>
				</el-table>

				<h3 class="line_blue" id="page5">&emsp;家庭前12个月收入情况</h3>
				<div class="lineSt"></div>
				<div >
					<el-row class="button-group">
						<el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAddDetails('income1')">新增</el-button>
						<el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDelDetails('income1')">删除</el-button>
					</el-row>
					<el-table :data="income1" border :row-class-name="rowClassName" @selection-change="handleIncome1" empty-text='空' class="my-table">
						<el-table-column label="工资性收入(年)" align="center"  >
							<el-table-column type="selection" min-width="40" align="center" />
							<el-table-column label="计入收入名称" prop="abi_ex1" min-width="145" >
								
								<template slot-scope="scope">
									<el-select v-model="income1[scope.row.xh-1].abi_ex1" >
										<el-option label="请选择收入名称" value=""></el-option>
										<el-option label="工资" value="工资"></el-option>
										<el-option label="奖金" value="奖金"></el-option>
										<el-option label="津贴" value="津贴"></el-option>
										<el-option label="补贴" value="补贴"></el-option>
										<el-option label="福利" value="福利"></el-option>
										<el-option label="其他劳动收入" value="其他劳动收入"></el-option>
									</el-select>
								</template>
							</el-table-column>
							<el-table-column label="金额" prop="abi_ex2" min-width="145" >
								<template slot-scope="scope">
									<el-input v-model="income1[scope.row.xh-1].abi_ex2" class="srname" @change="changeAmt(scope.$index,scope.row,'ico1.abi_ex2')"></el-input>
								</template>
							</el-table-column>
						</el-table-column>
						
					</el-table>
				</div>
				
				<div style="margin-top:20px">
					<el-table :data="income2" border :row-class-name="rowClassName" @selection-change="handleIncome2" empty-text='空' class="my-table">
						<el-table-column label="经营性收入(年)" align="center">
							<el-table-column label="计入收入名称" prop="abi_ex1" min-width="160">
								<template>
									<el-input :value="income2[0].abi_ex1" class="srname"></el-input>
								</template>
							</el-table-column>
							<el-table-column label="金额" prop="abi_ex2" min-width="145" >
								<template slot-scope="scope">
									<el-input v-model="income2[scope.row.xh-1].abi_ex2" class="srname" @change="changeAmt(scope.$index,scope.row,'ico2.abi_ex2')" ></el-input>
								</template>
							</el-table-column>
						</el-table-column>
					</el-table>
				</div>

				<div>
					<el-row class="button-group" style="margin-top:20px">
						<el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAddDetails('income3')">新增</el-button>
						<el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDelDetails('income3')">删除</el-button>
					</el-row>
					<el-table :data="income3" border :row-class-name="rowClassName" @selection-change="handleIncome3" empty-text='空' class="my-table">
						<el-table-column label="财产性收入(年)" align="center">
							<el-table-column type="selection" min-width="40" align="center" />
							<el-table-column label="计入收入名称" prop="abi_ex1" min-width="145" >
								<!-- <template slot-scope="scope">
									<el-input v-model="income3[scope.row.xh-1].abi_ex1"></el-input>
								</template> -->
								<template slot-scope="scope">
									<el-select v-model="income3[scope.row.xh-1].abi_ex1" >
										<el-option label="请选择收入名称" value=""></el-option>
										<el-option label="土地和房屋出租收入" value="土地和房屋出租收入"></el-option>
										<el-option label="存款及利息" value="存款及利息"></el-option>
										<el-option label="有价证券及红利" value="有价证券及红利"></el-option>
										<el-option label="其他投资收入" value="其他投资收入"></el-option>
										<el-option label="知识产权收入" value="知识产权收入"></el-option>
										<el-option label="财产变卖收入" value="财产变卖收入"></el-option>
										<el-option label="其他财产性收入" value="其他财产性收入"></el-option>
									</el-select>
								</template>
							</el-table-column>
							<el-table-column label="金额" prop="abi_ex2" min-width="145" >
								<template slot-scope="scope">
									<el-input v-model="income3[scope.row.xh-1].abi_ex2" class="srname" @change="changeAmt(scope.$index,scope.row,'ico3.abi_ex2')"></el-input>
								</template>
							</el-table-column>
						</el-table-column>
						
					</el-table>
				</div>

				<div>
					<el-row class="button-group"  style="margin-top:20px">
						<el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAddDetails('income4')">新增</el-button>
						<el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDelDetails('income4')">删除</el-button>
					</el-row>
					<el-table :data="income4" border :row-class-name="rowClassName" @selection-change="handleIncome4" empty-text='空' class="my-table">
						<el-table-column label="转移净收入(年)" align="center">
							<el-table-column type="selection" min-width="40" align="center" />
							<el-table-column label="计入收入名称" prop="abi_ex1" min-width="145" >
								<!-- <template slot-scope="scope">
									<el-input v-model="income4[scope.row.xh-1].abi_ex1"></el-input>
								</template> -->
								<template slot-scope="scope">
									<el-select v-model="income4[scope.row.xh-1].abi_ex1" >
										<el-option label="请选择收入名称" value=""></el-option>
										<el-option label="养老金或离退休金" value="养老金或离退休金"></el-option>
										<el-option label="基本生活费" value="基本生活费"></el-option>
										<el-option label="失业保险金" value="失业保险金"></el-option>
										<el-option label="保险收入" value="保险收入"></el-option>
										<el-option label="赔偿收入" value="赔偿收入"></el-option>
										<el-option label="捐赠收入" value="捐赠收入"></el-option>
										<el-option label="遗产收入" value="遗产收入"></el-option>
										<el-option label="赡(扶、抚)养收入" value="赡(扶、抚)养收入"></el-option>
										<el-option label="一次性安置费和经济补偿金" value="一次性安置费和经济补偿金"></el-option>
									</el-select>
								</template>
							</el-table-column>
							<el-table-column label="金额" prop="abi_ex2" min-width="145" >
								<template slot-scope="scope">
									<el-input v-model="income4[scope.row.xh-1].abi_ex2" class="srname" @change="changeAmt(scope.$index,scope.row,'ico4.abi_ex2')"></el-input>
								</template>
							</el-table-column>
						</el-table-column>
					</el-table>
				</div>

				<div style="margin-top:20px">
					<el-table :data="income5" border :row-class-name="rowClassName"  empty-text='空' class="my-table">
						<el-table-column label="其他收入(年)" align="center">
							<el-table-column label="计入收入名称" prop="abi_ex1" min-width="160">
								<template >
									<el-input :value="income5[0].abi_ex1" class="srname"></el-input>
								</template>
							</el-table-column>
							<el-table-column label="金额" prop="abi_ex2" min-width="145" >
								<template slot-scope="scope">
									<el-input v-model="income5[scope.row.xh-1].abi_ex2" class="srname" @change="changeAmt(scope.$index,scope.row,'ico5.abi_ex2')"></el-input>
								</template>
							</el-table-column>
						</el-table-column>
					</el-table>
				</div>
				<div style="margin-top:20px">
					<el-table :data="income6" border :row-class-name="rowClassName" empty-text='空' class="my-table">
						<el-table-column label="必要就业成本抵扣" align="center">
							<el-table-column label="计入收入名称" prop="abi_ex1" min-width="160">
								<template>
									<el-input :value="income6[0].abi_ex1" class="srname"></el-input>
								</template>
							</el-table-column>
							<el-table-column label="金额" prop="abi_ex2" min-width="145" >
								<template slot-scope="scope">
									<el-input v-model="income6[scope.row.xh-1].abi_ex2" class="srname" @change="changeAmt(scope.$index,scope.row,'ico6.abi_ex2')"></el-input>
								</template>
							</el-table-column>
						</el-table-column>
						
					</el-table>
				</div>
				<div style="margin-top:20px">
					<el-table :data="income7" border :row-class-name="rowClassName" empty-text='空' class="my-table">
						<el-table-column label="总收入" align="center">
							<el-table-column label="计入收入名称" prop="abi_ex1" min-width="160">
								<template slot-scope="scope">
									<el-input :value="income7[scope.row.xh-1].abi_ex1" class="srname"></el-input>
								</template>
							</el-table-column>
							<el-table-column label="金额" prop="abi_ex2" min-width="145" >
								<template slot-scope="scope">
									<el-input v-model="income7[scope.row.xh-1].abi_ex2" class="srname" readonly @change="changeAmt(scope.$index,scope.row,'ico7.abi_ex2')"></el-input>
								</template>
							</el-table-column>
								
						</el-table-column>
						
					</el-table>
				</div>

				<h3 class="line_blue" id="page9">&emsp;家庭前12个月支出情况</h3>
				<div class="lineSt"></div>
				<el-row :gutter="20">
					<el-col :span="12" >
						<el-form-item label="医疗支出" prop="abp_ex4" label-width="200px">
							<el-input v-model="pay.abp_ex4" placeholder="请输入医疗支出" @change="changeAmt3(pay.abp_ex4,'pay.abp_ex4')"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="教育支出" prop="abp_ex5" label-width="200px">
							<el-input v-model="pay.abp_ex5" placeholder="请输入教育支出" @change="changeAmt3(pay.abp_ex5,'pay.abp_ex5')">
							</el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="残疾康复费用支出" prop="abp_ex6" label-width="200px">
							<el-input v-model="pay.abp_ex6" placeholder="请输入残疾康复费用支出" @change="changeAmt3(pay.abp_ex6,'pay.abp_ex6')"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="因灾、因意外事故费用支出" prop="abp_ex11" label-width="200px">
							<el-input v-model="pay.abp_ex11" placeholder="请输入因灾、因意外事故费用支出" @change="changeAmt3(pay.abp_ex11,'pay.abp_ex11')"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="其他支出" prop="abp_ex7"  label-width="200px">
							<el-input v-model="pay.abp_ex7" placeholder="请输入其他支出" @change="changeAmt3(pay.abp_ex7,'pay.abp_ex7')"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="家庭总支出" prop="abp_ex8" label-width="200px">
							<el-input v-model="pay.abp_ex8" placeholder="请输入家庭总支出" @change="changeAmt3(pay.abp_ex8,'pay.abp_ex8')"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="扣减刚性支出后家庭年收入" prop="abp_ex9" label-width="200px">
							<el-input v-model="pay.abp_ex9" placeholder="请输入扣减刚性支出后家庭年收入" @change="changeAmt3(pay.abp_ex9,'pay.abp_ex9')">
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="扣减刚性支出后人均年收入" prop="abp_ex10" label-width="200px">
							<el-input v-model="pay.abp_ex10" placeholder="扣减刚性支出后人均年收入"  @change="changeAmt3(pay.abp_ex10,'pay.abp_ex10')"></el-input>
						</el-form-item>
					</el-col>
				</el-row>

				<h3 class="line_blue" id="page6">&emsp;金融资产</h3>
				<div class="lineSt"></div>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="银行总存款" prop="ab_ex36">
							<el-input v-model="dibaoForm.ab_ex36" placeholder="请输入银行总存款"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="有价证券" prop="ab_ex60">
							<el-input v-model="dibaoForm.ab_ex60" placeholder="请输入有价证券"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="基金" prop="ab_ex179">
							<el-input v-model="dibaoForm.ab_ex179" placeholder="请输入基金"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="商业保险" prop="ab_ex180">
							<el-input v-model="dibaoForm.ab_ex180" placeholder="请输入商业保险"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="债权" prop="ab_ex61">
							<el-input v-model="dibaoForm.ab_ex61" placeholder="请输入债权"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="其他金融产品" prop="ab_ex37">
							<el-input v-model="dibaoForm.ab_ex37" placeholder="请输入其他金融产品"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				
				<h3 class="line_blue" id="page10">&emsp;拥有车、船情况</h3>
				<div class="lineSt"></div>
				<el-row class="button-group">
						<el-col :span="12">
						<el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAddDetails('estate1')">
							新增</el-button>
						<el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDelDetails('estate1')">
							删除</el-button>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="24">
						<el-table :data="estate1" border :row-class-name="rowClassName"
							@selection-change="handleEstate1" empty-text='空' class="my-table">
							<el-table-column type="selection" min-width="40" align="center" />
							<el-table-column prop="abe_ex1" label="车(船)主" min-width="100">
								<template slot-scope="scope">
									<el-input v-model="scope.row.abe_ex1"></el-input>
								</template>
							</el-table-column>
							<el-table-column prop="abe_ex2" label="购买时间" min-width="100">
								<template slot-scope="scope">
									<el-date-picker type="date" v-model="scope.row.abe_ex2" placeholder="选择日期" value-format="yyyy-MM-dd" style="width: 100%;" >
									</el-date-picker>
									<!-- <el-input v-model="scope.row.abe_ex2"></el-input> -->
								</template>
							</el-table-column>
							<el-table-column prop="abe_ex3" label="用途" min-width="100">
								<template slot-scope="scope">
									<el-input v-model="scope.row.abe_ex3"></el-input>
								</template>
							</el-table-column>
							<el-table-column prop="abe_ex8" label="车(船)型" min-width="100">
								<template slot-scope="scope">
									<el-input v-model="scope.row.abe_ex8"></el-input>
								</template>
							</el-table-column>
							<el-table-column prop="abe_ex4" label="车(船)价值" min-width="100">
								<template slot-scope="scope">
									<el-input v-model="scope.row.abe_ex4"></el-input>
								</template>
							</el-table-column>
						</el-table>
					</el-col>
				</el-row>
				<h3 class="line_blue" id="page11">&emsp;拥有房产情况</h3>
				<div class="lineSt"></div>
				<el-row class="button-group">
					<el-col :span="12">
						<el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAddDetails('estate2')">
							新增</el-button>
						<el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDelDetails('estate2')">
							删除</el-button>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="24">
						<el-table :data="estate2" border :row-class-name="rowClassName" 
						@selection-change="handleEstate2" empty-text='空' class="my-table">
							<el-table-column type="selection" min-width="40" align="center" />
							<el-table-column prop="abe_ex1" label="房屋产权人/共有人" min-width="120">
								<template slot-scope="scope">
									<el-input v-model="scope.row.abe_ex1"></el-input>
								</template>
							</el-table-column>
							<el-table-column prop="abe_ex2" label="建房(购房)时间" min-width="120">
								<template slot-scope="scope">
									<!-- <el-input v-model="scope.row.abe_ex2"></el-input> -->
									<el-date-picker type="date" v-model="scope.row.abe_ex2" placeholder="选择日期" value-format="yyyy-MM-dd" style="width: 100%;" >
									</el-date-picker>
								</template>
							</el-table-column>
							<el-table-column prop="abe_ex5" label="房屋地址" min-width="180">
								<template slot-scope="scope">
									<el-input v-model="scope.row.abe_ex5"></el-input>
								</template>
							</el-table-column>
							<el-table-column prop="abe_ex11" label="房屋性质" min-width="180">
								<template slot-scope="scope">
									<el-select v-model="scope.row.abe_ex11" >
										<el-option label="请选择" value=""></el-option>
										<el-option label="商品房" value="商品房"></el-option>
										<el-option label="产权房" value="产权房"></el-option>
										<el-option label="单位福利房" value="单位福利房"></el-option>
										<el-option label="拆迁安置房" value="拆迁安置房"></el-option>
										<el-option label="经济适用房" value="经济适用房"></el-option>
										<el-option label="自建住房" value="自建住房"></el-option>
										<el-option label="共有产权房" value="共有产权房"></el-option>
										<el-option label="公租房" value="公租房"></el-option>
										<el-option label="廉租房" value="廉租房"></el-option>
										<el-option label="租赁房" value="租赁房"></el-option>
										<el-option label="借住房" value="借住房"></el-option>
										<el-option label="其他" value="其他"></el-option>
									</el-select>
								</template>
							</el-table-column>
							<el-table-column prop="abe_ex6" label="面积(平方)" min-width="120">
								<template slot-scope="scope">
									<el-input v-model="scope.row.abe_ex6"></el-input>
									<!-- <el-input v-model="scope.row.abe_ex6" @change="keyVerification2(scope.$index,scope.row,'e2.abe_ex6')"></el-input> -->
								</template>
							</el-table-column>
							<el-table-column prop="abe_ex4" label="购置价/建造价" min-width="120">
								<template slot-scope="scope">
									<el-input v-model="scope.row.abe_ex4"></el-input>
								</template>
							</el-table-column>
						</el-table>
					</el-col>
				</el-row>
				
				<h3 class="line_blue" id="page12">&emsp;居住状况照片</h3>
				<div class="lineSt"></div>
				<el-row :gutter="20">
					<el-col :span="12" class="my-col">
							<el-card class="box-card">
								<div slot="header" class="clearfix">
									<el-button style="float: left; padding: 3px 0" type="text" @click="handleRemove(uploadImg,'ab_ex166')">
										删除</el-button>
									<span>房屋整体照片(每套房屋上传两张)(<span style='color:red'>{{imgNum.ab_ex166_img}}</span>)</span>
									<el-button style="float: right; padding: 3px 0" type="text" @click="uploads('ab_ex166', 'dibaoForm')">
										上传</el-button>
								</div>
								<div class="block">
									<image-view :imgList="uploadImg.ab_ex166_img" @Imgindex='getImgIndex' id="ab_ex166"></image-view>
								</div>
							</el-card>
						</el-col>
					<el-col :span="12" class="my-col">
							<el-card class="box-card">
								<div slot="header" class="clearfix">
									<el-button style="float: left; padding: 3px 0" type="text" @click="handleRemove(uploadImg,'ab_ex167')">
										删除</el-button>
									<span>室内照片(每套房屋上传两张)(<span style='color:red'>{{imgNum.ab_ex167_img}}</span>)</span>
									<el-button style="float: right; padding: 3px 0" type="text" @click="uploads('ab_ex167', 'dibaoForm')">
										上传</el-button>
								</div>
								<div class="block">
									<image-view :imgList="uploadImg.ab_ex167_img"  @Imgindex='getImgIndex' id="ab_ex167"></image-view>
								</div>
							</el-card>
						</el-col>
				</el-row>

				<h3 class="line_blue" id="page18">&emsp;承包山林土地情况</h3>
				<div class="lineSt"></div>
				<el-row class="button-group">
					<el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAddDetails('landInfo')">
						新增</el-button>
					<el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDelDetails('landInfo')">
						删除</el-button>
				</el-row>
				<el-table :data="landInfo" border :row-class-name="rowClassName"
					@selection-change="handleLandInfoData" empty-text='空' class="my-table">
					<el-table-column type="selection" width="40" align="center" />
					<el-table-column prop="abl_ex1" label="承包人姓名" min-width="110">
						<template slot-scope="scope">
							<el-input v-model="landInfo[scope.row.xh-1].abl_ex1" ></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="abl_ex2" label="承包面积(亩)" min-width="190">
						<template slot-scope="scope">
							<el-input v-model="landInfo[scope.row.xh-1].abl_ex2" ></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="abl_ex3" label="土地类型" min-width="130">
						<template slot-scope="scope">
							<el-select v-model="landInfo[scope.row.xh-1].abl_ex3" >
								<el-option label="请选择"  value=""></el-option>
								<el-option label="耕地" value="耕地"></el-option>
								<el-option label="山林" value="山林"></el-option>
								<el-option label="草场" value="草场"></el-option>
								<el-option label="水塘" value="水塘"></el-option>
								<el-option label="其他" value="其他"></el-option>
							</el-select>
						</template>
					</el-table-column>
					<el-table-column prop="abl_ex4" label="土地估值" min-width="130">
						<template slot-scope="scope">
							<el-input v-model="landInfo[scope.row.xh-1].abl_ex4"  ></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="abl_ex5" label="备注" min-width="200" >
						<template slot-scope="scope">
							<el-input v-model="landInfo[scope.row.xh-1].abl_ex5"></el-input>
						</template>
					</el-table-column>
				</el-table>


				<h3 class="line_blue" id="page7">&emsp;身份证及其他证明材料上传</h3>
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
									<image-view :imgList="uploadImg.ab_ex177_img" id="ab_ex177"  @Imgindex='getImgIndex' ></image-view>
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
									<el-button style="float: left; padding: 3px 0" type="text" @click="handleRemove(uploadImg,'ab_ex73')">
										删除</el-button>
									<span>电子授权书(<span style='color:red'>{{imgNum.ab_ex73_img}}</span>)</span>
									<el-button style="float: right; padding: 3px 0" type="text" @click="uploads('ab_ex73', 'dibaoForm')">上传</el-button>
								</div>
								<div class="block">
									<image-view v-if="uploadImg.ab_ex73_img" :imgList="uploadImg.ab_ex73_img" id="ab_ex73"  @Imgindex='getImgIndex' ></image-view>
								</div>
							</el-card>
						</el-col>
					</el-row>
					<el-row :gutter="20" style='margin-top:10px'>
						<!--  -->
					</el-row>
				</div>

				<h3 class="line_blue" id="page17">&emsp;代理人信息</h3>
				<div class="lineSt"></div>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="姓名" prop="aba_ex1">
							<el-input v-model="agentInfo.aba_ex1" placeholder="请输入代理人姓名"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="身份证号码" prop="aba_ex3">
							<el-input v-model="agentInfo.aba_ex3" placeholder="请输入身份证号码"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20" style='margin-top:10px'>
					<el-col :span="12" class="my-col">
						<el-card class="box-card">
							<div slot="header" class="clearfix">
								<el-button style="float: left; padding: 3px 0" type="text" @click="handleRemove(uploadImg, 'aba_ex4')">
									删除</el-button>
								<span>身份证拍照(正反面)(<span style='color:red'>{{imgNum.aba_ex4_img}}</span>)</span>
								<el-button style="float: right; padding: 3px 0" type="text" @click="uploads('aba_ex4', 'agentInfo')">上传</el-button>
							</div>
							<div class="block">
								<image-view :imgList="uploadImg.aba_ex4_img" id="aba_ex4"  @Imgindex='getImgIndex' ></image-view>
							</div>
						</el-card>
					</el-col>
					<el-col :span="12" class="my-col">
						<el-card class="box-card">
							<div slot="header" class="clearfix">
								<el-button style="float: left; padding: 3px 0" type="text" @click="handleRemove(uploadImg,'aba_ex5')">
									删除</el-button>
								<span>委托书(<span style='color:red'>{{imgNum.aba_ex5_img}}</span>)</span>
								<el-button style="float: right; padding: 3px 0" type="text" @click="uploads('aba_ex5', 'agentInfo')">上传</el-button>
							</div>
							<div class="block">
								<image-view :imgList="uploadImg.aba_ex5_img" id="aba_ex5"  @Imgindex='getImgIndex' ></image-view>
							</div>
						</el-card>
					</el-col>
				</el-row>
				
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
				<el-button type="primary" size="small"  @click="save">保存</el-button>
				<el-button size="small" @click="closeView">返回</el-button>
			</div>

			<div style="margin-left:20px;margin-top:20px;">
				<ul>
					<li :class="{listStyle:isShow1}" @click="isShow(1)">
						<a class="ainfoFont" :class="{listStyleA:!isShow1}" 
						@click="counter('#page1')">基本信息</a><br>
					</li>
					<li v-if="dibaoForm.ab_ex92=='是'" :class="{listStyle:isShow21}" @click="isShow(21)">
						<a class="ainfoFont" :class="{listStyleA:!isShow21}" 
						@click="counter('#page21')">近亲属信息</a><br>
					</li>
					<li :class="{listStyle:isShow2}" @click="isShow(2)">
						<a class="ainfoFont" :class="{listStyleA:!isShow2}" 
						@click="counter('#page2')">自定义预警</a><br>
					</li>
					<li :class="{listStyle:isShow3}" @click="isShow(3)">
						<a class="ainfoFont" :class="{listStyleA:!isShow3}"
							@click="counter('#page3')">共同生活家庭成员情况</a><br>
					</li>
					<li :class="{listStyle:isShow4}" @click="isShow(4)">
						<a class="ainfoFont" :class="{listStyleA:!isShow4}"
							@click="counter('#page4')">非共同生活家庭成员情况</a><br>
					</li>
					<li :class="{listStyle:isShow8}" @click="isShow(8)">
						<a class="ainfoFont" :class="{listStyleA:!isShow8}"
							@click="counter('#page8')">非共同生活赡抚养人家庭成员信息</a><br>
					</li>
					<li :class="{listStyle:isShow5}" @click="isShow(5)">
						<a class="ainfoFont" :class="{listStyleA:!isShow5}"
							@click="counter('#page5')">家庭前12个月收入情况</a><br>
					</li>
					<li :class="{listStyle:isShow9}" @click="isShow(9)">
						<a class="ainfoFont" :class="{listStyleA:!isShow9}"
							@click="counter('#page9')">家庭前12个月支出情况</a><br>
					</li>
					<li :class="{listStyle:isShow6}" @click="isShow(6)">
						<a class="ainfoFont" :class="{listStyleA:!isShow6}" 
						@click="counter('#page6')">金融资产</a><br>
					</li>
					<li :class="{listStyle:isShow10}" @click="isShow(10)">
						<a class="ainfoFont" :class="{listStyleA:!isShow10}" 
						@click="counter('#page10')">拥有车(船)情况</a><br>
					</li>
					<li :class="{listStyle:isShow11}" @click="isShow(11)">
						<a class="ainfoFont" :class="{listStyleA:!isShow11}" 
						@click="counter('#page11')">拥有房产情况</a><br>
					</li>
					<li :class="{listStyle:isShow12}" @click="isShow(12)">
						<a class="ainfoFont" :class="{listStyleA:!isShow12}" 
						@click="counter('#page12')">居住状况照片</a><br>
					</li>
					<li :class="{listStyle:isShow18}" @click="isShow(18)">
						<a class="ainfoFont" :class="{listStyleA:!isShow18}" 
						@click="counter('#page18')">承包山林土地情况</a><br>
					</li>
					<li :class="{listStyle:isShow7}" @click="isShow(7)">
						<a class="ainfoFont" :class="{listStyleA:!isShow7}"
							@click="counter('#page7')">身份证及其他证明材料</a><br>
					</li>
					<li :class="{listStyle:isShow17}" @click="isShow(17)">
						<a class="ainfoFont" :class="{listStyleA:!isShow17}"
							@click="counter('#page17')">代理人信息</a><br>
					</li>

				</ul>
			</div>
		</div>
	</div>
	</div>

</template>

<script>
	import request from '@/utils/request'
	import upload from '../upload'
	import imageView from '../imageView'
	import {checkPhone,isName,isFamilyNum,isText,isNum,isBankID,isCardID} from '@/utils/until' //验证
	export default {
		name: "addEditQzsq",
		components: {
			upload,
			imageView,
		},
		data() {
			return {
				pickerOptions: {
					disabledDate(time) {
						// 限制预警时间只能选择第10天及以后
						return time < Date.now();
						// return time < Date.now() + 8.64e7*9;
					}
				}, 
				// jisuan:{
				// 	familyNum:'',
				// 	familyZC:'',
				// 	familyZB:'',
				// 	familyFD:'',
				// 	familyAmt:'',
				// 	familyZzc:'',
				// 	familyChildrens:'',
				// },
				// jisuanShow:false,
				// kxsjz:["儿童救助","临时救助家庭","特困人员供养","支出性困难家庭","单人保家庭","低保边缘家庭","最低生活保障-按人保","最低生活保障-按户保","最低生活保障-按人保-重病单人保","最低生活保障-按人保-重残单人保"],
				// jsjg:[],
				// jsjgString:"",
				// jsjgshow1:false,
				// jsjgshow2:true,
				// 月均可支配收入常数
				// incomeConstant:(39701/12),

				test:{
					xzqhArray:[]
				},
				xzqhArray:[],
				isFinish:false,
				
				// el-cascader懒加载
				// 行政区划选项
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
							data:{
								pId:pId
							}
						}).then(res => {
						}).catch(res=>{
							console.log(res)
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
				relation:["户主","配偶","子/婿","女/媳","(外)孙子女","父母/岳父母/公婆","(外)祖父母","兄弟姐妹","其他"],
				dibaoForm: {},
				pay:{
					abp_ex4:'',
					abp_ex5:'',
					abp_ex6:'',
					abp_ex7:'',
					abp_ex8:'',
					abp_ex9:'',
					abp_ex10:'',
					abp_ex11:'',
				},
				// 材料上传图片存储数组
				uploadImg: {
					ab_ex73_img: [],
					ab_ex10_img: [],
					ab_ex16_img: [],
					ab_ex74_img: [],
					ab_ex166_img: [],//房屋整体图片
					ab_ex167_img: [],//房屋室内图片
					ab_ex177_img: [],//纸质授权书
					aba_ex4_img: [], //代理人身份证
					aba_ex5_img: [], //代理委托书
				},
				imgNum:{},//图片数量
				uploadId: '',
				imgIndex: {
					ab_ex166:0,
					ab_ex167:0,
					ab_ex10:0,
					ab_ex73:0,
					ab_ex16:0,
					ab_ex74:0,
					ab_ex177:0,
					aba_ex4: 0,
					aba_ex5: 0
				},
				"landInfo": [],
				agentInfo: { //代理人信息
					"aba_ex1": "",
					"aba_ex2": "",
					"aba_ex3": "",
					"aba_ex4": "",
					"aba_ex5": "",
				}, 	
				// 必填项未填警告弹框
				rules: {
					ab_ex3: [{
						required: true,
						message: '申请人姓名不能为空',
						trigger: 'blur'
					}],
					ab_ex7: [{
						required: true,
						message: '身份证号不能为空',
						trigger: 'blur'
					}],
					ab_ex162: [{
						required: true,
						message: '行政区划不能为空',
						trigger: 'blur'
					}],
					ab_ex28: [{
						required: true,
						message: '联系电话不能为空',
						trigger: 'blur'
					}],
				},
				// income各种收入的数组，占位用的
				income1:[{
					abi_ex1:"",
					abi_ex2:"",
					abi_ex3:"工资性收入",
					abi_ex4: "A",
					abi_ex5: ""
				}],
				// 对收入数据删除、新增操作用的数组
				checkedIncome1: [],
				income2:[{
					abi_ex1:"经营净收入",
					abi_ex2:"",
					abi_ex3:"经营净收入",
					abi_ex4: "B",
					abi_ex5: ""
				}],
				checkedIncome2: [],
				income3:[{
					abi_ex1:"",
					abi_ex2:"",
					abi_ex3:"财产净收入",
					abi_ex4: "C",
					abi_ex5: ""
				}],
				checkedIncome3: [],
				income4:[{
					abi_ex1:"",
					abi_ex2:"",
					abi_ex3:"转移净收入",
					abi_ex4: "D",
					abi_ex5: ""
				},],
				checkedIncome4: [],
				income5:[{
					abi_ex1:"其他收入",
					abi_ex2:"",
					abi_ex3:"其他收入",
					abi_ex4: "E",
					abi_ex5: ""
				},],
				income6:[{
					abi_ex1:"必要就业成本抵扣",
					abi_ex2:"",
					abi_ex3:"必要就业成本抵扣",
					abi_ex4: "F",
					abi_ex5: ""
				},],
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
				// 预警占位数组
				warningData: [
					{
						aw_dat1:"",
						aw_ex1:"",
					},
				],
				// 疾病类型
				illnessList:[{
					illType:'血液类重病',
					illnessChild:['急性白血病（再生障碍性贫血）','白血病','再生障碍性贫血','戈谢病','血友病','血小板减少性紫癜'],
				},{
					illType:'肿瘤类重病',
					illnessChild:['恶性肿瘤（癌症）','子宫癌','细胞间质瘤'],
				},{
					illType:'肝类重病',
					illnessChild:['严重传染性肝类（并发症）','肝硬化','慢性重症肝炎','肝豆状核变性','肝功能衰竭'],
				},{
					illType:'免疫类重病',
					illnessChild:['系统性红斑狼疮晚期','艾滋病','强直性脊柱炎'],
				},{
					illType:'传染类重病',
					illnessChild:['急性传染性肺结核及国家规定的特种传染病','急性传染性肺结核','国家规定的特种传染病','耐多药肺结核','其他传染病'],
				},{
					illType:'心脑血管类重病',
					illnessChild:['严重心脑血管疾病/中风（有明显后遗症）','严重心脑血管疾病','中风（有明显后遗症）','心脏换瓣','血管支架','血管搭桥','脑梗死（脑梗塞）','脑出血后遗症','高血压','肺动脉高压'],
				},{
					illType:'心脏类重病',
					illnessChild:['心脏病','急性心律衰竭/心肌梗塞/风湿性心脏病','急性心律衰竭','心肌梗塞','风湿性心脏病'],
				},{
					illType:'肾病类重病',
					illnessChild:['严重肾病综合症慢性肾衰竭（尿毒症）','尿毒症','肾病综合症'],
				},{
					illType:'器官移植类重病',
					illnessChild:['肾移植','心脏移植','肝脏移植','肺移植','骨髓移植','器官移植后抗排异药物治疗'],
				},{
					illType:'内分泌类重病',
					illnessChild:['I型糖尿病','糖尿病综合症','甲亢'],
				},{
					illType:'神经类重病',
					illnessChild:['阿尔茨海默病','重症肌无力','硬化症','癫痫','偏瘫','运动神经元病'],
				},{
					illType:'其他重病',
					illnessChild:['孕产妇高危重症抢救','严重精神病','腰间盘突出','脊髓性肌萎缩','重症类风湿关节炎','克罗恩病','尘肺病','其他一般慢性病'],
				},{
					illType:'民政部门认定的其他病种',
					illnessChild:['民政部门认定的其他病种']
				}],
				checkedWarningData: [],
				familyData:[], //做身份证重复验证用的
				familyData1: [],
				checkedFamilyData1: [],
				familyData2: [],
				checkedFamilyData2: [],
				familyData3: [],
				checkedFamilyData3: [],
				familyData4: [],
				checkedFamilyData4: [],
				estate1: [],
				checkedEstate1: [],
				estate2: [],
				checkedEstate2: [],
				common: [],
				help_reason_list:['缺乏劳动力','无生活来源','疾病','残疾','教育','住房','受灾','其他'],
				ab_ex46:[], //求助原因

				work :"",  //劳动年龄
				nation: ['汉族', '壮族', '满族', '回族', '苗族', '维吾尔族', '彝族', '土家族', '蒙古族', '藏族', '布依族', '侗族', '瑶族', '朝鲜族', '白族',
					'哈尼族', '哈萨克族', '黎族', '傣族', '畲族', '傈僳族', '仡佬族',
					'拉祜族', '高山族', '东乡族', '佤族', '水族', '纳西族', '羌族', '土族', '锡伯族', '仫佬族', '柯尔克孜族', '达斡尔族', '景颇族', '撒拉族',
					'布朗族', '毛难族', '塔吉克族', '普米族', '阿昌族', '怒族',
					'鄂温克族', '京族', '基诺族', '德昂族', '乌孜别克族', '俄罗斯族', '保安族', '裕固族', '门巴族', '鄂伦春族', '独龙族', '塔塔尔族', '赫哲族',
					'珞巴族', '其他', '外国血统中国籍人士'
				],
				// city:[
				// 	{
				// 		name:'海陵区',
				// 		town:[
				// 			{
				// 				name:'城东街道',
				// 				village:['碧桂园社区居委会','东安社区居委会','东康社区居委会','老东河社区居委会','东风社区居委会','居委会','居委会','居委会','居委会',]
				// 			},
				// 			{
				// 				name:'城西街道',
				// 				village:['碧桂园社区居委会','东安社区居委会','东康社区居委会','老东河社区居委会','东风社区居委会','居委会','居委会','居委会','居委会',]
				// 			},
				// 			{
				// 				name:'城南街道',
				// 				village:['碧桂园社区居委会','东安社区居委会','东康社区居委会','老东河社区居委会','东风社区居委会','居委会','居委会','居委会','居委会',]
				// 			},
				// 			{
				// 				name:'城中街道',
				// 				village:['碧桂园社区居委会','东安社区居委会','东康社区居委会','老东河社区居委会','东风社区居委会','居委会','居委会','居委会','居委会',]
				// 			},
				// 			{
				// 				name:'城北街道',
				// 				village:['碧桂园社区居委会','东安社区居委会','东康社区居委会','老东河社区居委会','东风社区居委会','居委会','居委会','居委会','居委会',]
				// 			},
				// 		]
				// 	},{
				// 		name:'高港区',
				// 	},{
				// 		name:'姜堰区',
					
				// 	},{
				// 		name:'兴化市',
					
				// 	},{
				// 		name:'靖江市',
					
				// 	},{
				// 		name:'',
				// 	}
				// ],
				// town:[],
				// village:[],
				// householdRegistrationAddress:[],//户籍地址
				houseNum:'', //门牌号

				dialogImageUrl: '',
				dialogImageArray: [],
				dialogVisible: false,
				dialogVisible3: false,
				jkShow1:true,
				jkShow2:true,
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
				isShow17: true,
				isShow18: true,
				isShow21: true,
				leaveSave:false,
				isSaves:false,
				isNewData:false,//是否为pc新增数据
				familyIDCardImg:[{
					fid:"",
					familyName:"",
					idcardImg:[]
				}],//暂存家庭成员和对应图片
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
				if (answer) next();
				else next(false);
			}
		},

		watch:{
			xzqhArray(newA,oldA){
				console.log(newA[0]);
				if(newA[0]){

					let qu = newA[0].split("#")[0]
					let cun = newA[1].split("#")[0]
					let zhen = newA[2].split("#")[0]
					// let i =qu+"#"+cun+"#"+zhen
					this.dibaoForm.ab_ex162 = newA[0]+","+newA[1]+","+newA[2]
					this.dibaoForm.ab_ex161 = qu
					this.dibaoForm.ab_ex1 = zhen
					this.dibaoForm.ab_ex2 = cun
				}
				console.log(newA[0])
			}
		},
		// 
		created() {
			this.loadData();
		},

		methods: {
			// 右侧菜单滑动高亮
			scroll(){
				// var scrollTop =document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset;
				if(document.querySelector('.info2')==null || document.querySelector('#recordt')==null){
					return ''
				}
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
				let oDiv17 = document.querySelector('#page17');
				let oDiv18 = document.querySelector('#page18');
				let oDiv21 =  true;
				if(this.dibaoForm.ab_ex92=="是"){
					oDiv21 =  document.querySelector('#page21');
				}
				
			
				// 顺序跟上面显示顺序要相反
				let clientHeight = document.querySelector('.info2').clientHeight
				let recordtClientHeight = document.querySelector('#recordt').scrollHeight
				if(!oDiv1 || !oDiv2 || !oDiv3 || !oDiv4 || !oDiv5 || !oDiv6 || !oDiv7|| !oDiv8|| !oDiv9|| !oDiv10|| !oDiv11|| !oDiv12 || !oDiv17|| !oDiv18|| !oDiv21){
					return ''
				}
				if(recordtClientHeight+oDiv7.clientHeight<clientHeight && scrollTop>(oDiv7.offsetTop-oDiv1.offsetTop-clientHeight+recordtClientHeight+oDiv7.clientHeight)){
					// console.log('触发了7-1')
					this.isShow(7)
				}else if(scrollTop > (oDiv7.offsetTop-oDiv1.offsetTop)){
					// console.log('触发了7-2')
					this.isShow(7)
				}else if(scrollTop > (oDiv18.offsetTop-oDiv1.offsetTop)){
					// console.log('触发了12')
					this.isShow(18)
				}else if(scrollTop > (oDiv17.offsetTop-oDiv1.offsetTop)){
					// console.log('触发了17')
					this.isShow(17)
				}else if(scrollTop > (oDiv12.offsetTop-oDiv1.offsetTop)){
					// console.log('触发了12')
					this.isShow(12)
				}else if(scrollTop > (oDiv11.offsetTop-oDiv1.offsetTop)){
					// console.log('触发了11')
					this.isShow(11)
				}else if(scrollTop > (oDiv10.offsetTop-oDiv1.offsetTop)){
					// console.log('触发了10')
					this.isShow(10)
				}else if(scrollTop > (oDiv6.offsetTop-oDiv1.offsetTop)){
					// console.log('触发了6')
					this.isShow(6)
				}else if(scrollTop > (oDiv9.offsetTop-oDiv1.offsetTop)){
					// console.log('触发了9')
					this.isShow(9)
				}else if(scrollTop > (oDiv5.offsetTop-oDiv1.offsetTop)){
					// console.log('触发了5')
					this.isShow(5)
				}else if(scrollTop > (oDiv8.offsetTop-oDiv1.offsetTop)){
					// console.log('触发了8')
					this.isShow(8)
				}else if(scrollTop > (oDiv4.offsetTop-oDiv1.offsetTop)){
					// console.log('触发了4')
					this.isShow(4)
				}else if(scrollTop > (oDiv3.offsetTop-oDiv1.offsetTop)){
					// console.log('触发了3')
					this.isShow(3)
				}else if(scrollTop > (oDiv2.offsetTop-oDiv1.offsetTop)){
					// console.log('触发了2')
					this.isShow(2)
				}else if(scrollTop > (oDiv21.offsetTop-oDiv1.offsetTop)){
					// console.log('触发了21')
					this.isShow(21)
				}else if(scrollTop > (oDiv1.offsetTop-oDiv1.offsetTop)){
					// console.log('触发了1')
					this.isShow(1)
				}
			},
			counter(id) { //counter1是绑定的点击事件名称
				document.querySelector(id).scrollIntoView(true);
			},
			 loadData() {// 进入页面加载数据
				this.isFinish=false;
				this.getBasic({
					sId: this.$route.query.sId,
					// type: "低保",
					company: "泰州市姜堰区社会救助综合平台"
				}).then(res => {
					// console.log(res[0].data[0],"this.getBasic====res")
					this.dibaoForm = res[0].data[0]
					this.common = res[0].common;
					this.uploadImg.ab_ex73_img = res[0].data[0].ab_ex73.split(",");
					this.uploadImg.ab_ex10_img = res[0].data[0].ab_ex10.split(",");
					this.uploadImg.ab_ex16_img = res[0].data[0].ab_ex16.split(",");
					this.uploadImg.ab_ex74_img = res[0].data[0].ab_ex74.split(",");
					this.uploadImg.ab_ex166_img = res[0].data[0].ab_ex166.split(",");//居住外
					this.uploadImg.ab_ex167_img = res[0].data[0].ab_ex167.split(",");//居住内
					this.uploadImg.ab_ex177_img = res[0].data[0].ab_ex177.split(",");//纸质授权书
					let  xzqhArray = this.dibaoForm.ab_ex162.split(",");
					if(xzqhArray.length==3){
						this.$set(this.xzqhArray,0,xzqhArray[0]);
						this.$set(this.xzqhArray,1,xzqhArray[1]);
						this.$set(this.xzqhArray,2,xzqhArray[2]);
						this.$set(this.test,"xzqhArray",xzqhArray);
					}
					this.isFinish=true;
				}).catch(res => {
					if(typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200){
						// console.log('请求失败了-----------------------')
						this.$message.error('数据获取失败或请求超时11111')
						this.$emit("closes", false)
						this.$router.go(-1)
						return false
					}
					// console.log(res.response.data[0].data[0],"-----------dibaoFrom")
					for(let i in res.response.data[0].data[0]){
						if(res.response.data[0].data[0][i]=="NULL"){
							res.response.data[0].data[0][i]=""
						}
					}

					this.dibaoForm = res.response.data[0].data[0]
					this.common = res.response.data[0].common;
					this.uploadImg.ab_ex10_img = res.response.data[0].data[0].ab_ex10.split(",");
					this.uploadImg.ab_ex16_img = res.response.data[0].data[0].ab_ex16.split(",");
					this.uploadImg.ab_ex73_img = res.response.data[0].data[0].ab_ex73.split(",");
					this.uploadImg.ab_ex74_img = res.response.data[0].data[0].ab_ex74.split(",");
					this.uploadImg.ab_ex166_img = res.response.data[0].data[0].ab_ex166.split(",");
					this.uploadImg.ab_ex167_img = res.response.data[0].data[0].ab_ex167.split(",");
					this.uploadImg.ab_ex177_img = res.response.data[0].data[0].ab_ex177.split(",");

					for(let i in this.uploadImg ){
						var r = this.uploadImg[i].filter(function (s) {
								return s && s.trim();
								});
						// console.log(r,"过滤数组");
						if(i=='ab_ex10_img'){
							this.dibaoForm.ab_ex10 = r.join(",")
							this.uploadImg.ab_ex10_img = r

						}else if(i=='ab_ex16_img'){
							this.dibaoForm.ab_ex16=r.join(",")
							this.uploadImg.ab_ex16_img = r

						}else if(i=='ab_ex73_img'){
							this.dibaoForm.ab_ex73=r.join(",")
							this.uploadImg.ab_ex73_img = r

						}else if(i=='ab_ex74_img'){
							this.dibaoForm.ab_ex74=r.join(",")
							this.uploadImg.ab_ex74_img = r

						}else if(i=='ab_ex166_img'){
							this.dibaoForm.ab_ex166=r.join(",")
							this.uploadImg.ab_ex166_img = r

						}else if(i=='ab_ex167_img'){
							this.dibaoForm.ab_ex167=r.join(",")
							this.uploadImg.ab_ex167_img = r

						}else if(i=='ab_ex177_img'){
							this.dibaoForm.ab_ex177=r.join(",")
							this.uploadImg.ab_ex177_img = r

						}
					}

					// console.log(this.dibaoForm.ab_ex162 != "" && this.dibaoForm.ab_ex4 == "");
					// if(this.dibaoForm.ab_ex162 != "" && this.dibaoForm.ab_ex4 == ""){
					// 	this.dibaoForm.ab_ex4 = this.dibaoForm.ab_ex162
					// }
					
					// 新增检测
					if(this.dibaoForm.ab_ex3 == '' ||this.dibaoForm.ab_ex162 == ''){
						this.isNewData = true;
						// this.dibaoForm.ab_ex13 = '申请'
						// var typeStr = sessionStorage.getItem("activeName").split('/');
						// this.dibaoForm.ab_ex13 = typeStr[1]
						// console.log('新增检测 =>',typeStr);
						// console.log('this.dibaoForm.ab_ex13 =>',this.dibaoForm.ab_ex13);
					}


					this.$forceUpdate()

					// 获取图片数量
					this.getImgNum()
					
					//消除数组ab_ex46求助原因中的空元素
					if(this.dibaoForm.ab_ex46!=""){
						this.ab_ex46 = this.dibaoForm.ab_ex46.split(",");
							// this.ab_ex46.push("测试")
					}else{
						this.ab_ex46=[];
					}
					
					let  xzqhArray=this.dibaoForm.ab_ex162.split(",");
					if(xzqhArray.length==3){
						// this.xzqhArray=[]
						this.$set(this.xzqhArray,0,xzqhArray[0]);
						this.$set(this.xzqhArray,1,xzqhArray[1]);
						this.$set(this.xzqhArray,2,xzqhArray[2]);
						this.$set(this.test,"xzqhArray",xzqhArray);
					}else{
						this.xzqhArray=[]
					}
					this.isFinish=true;
					console.log('text=>',this.test)
					console.log('xzqhArray=>',this.xzqhArray)

					let HJaddressArr =[] 
					HJaddressArr = this.dibaoForm.ab_ex4.split(';')
					console.log(HJaddressArr);

					// if(HJaddressArr.length>1){
					// 	let householdRegistrationAddress = HJaddressArr[0].split(",");
					// 	this.$set(this.householdRegistrationAddress,0,householdRegistrationAddress[0]);
					// 	this.$set(this.householdRegistrationAddress,1,householdRegistrationAddress[1]);
					// 	this.$set(this.householdRegistrationAddress,2,householdRegistrationAddress[2]);
					// 	this.houseNum = HJaddressArr[1]
					// }else{
					// 	this.householdRegistrationAddress = this.xzqhArray;
					// 	this.houseNum = this.dibaoForm.ab_ex4;
					// }

					// 预警信息
					this.loadWarning({
						sId: this.$route.query.sId,
					}).then(res => {
						console.log(res)
						this.warningData = res[0].data
					}).catch(res => {
						if(typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200){
							console.log('请求失败了-----------------------2')
							this.$message.error('数据获取失败或请求超时2222')
							this.$emit("closes", false)
							this.$router.go(-1)
							return false
						}
						for(var i in  res.response.data[0].data){
							// console.log(res.response.data[0].data[i].aw_dat1,"预警时间-------------"+i);
							if(res.response.data[0].data[i].aw_dat1=="1900-01-01 00:00:00.0"){
								res.response.data[0].data[i].aw_dat1=""
							}
						}
						// 过滤预警空数据
						
						this.warningData = res.response.data[0].data.filter((item, index, arr)=> {
							return item.aw_dat1 != "" || item.aw_ex1 != ""
						})
						// 初始显示一条数据
						if(this.warningData.length==0){
							this.warningData.push({
								aw_dat1 : "",
								aw_ex1 : ""
							})
						}
						console.log(this.warningData);
					})

					// 成员信息
					this.loadFamily({
						sId: this.$route.query.sId,
					}).then(res => {
						console.log(res)
						this.familyData1 = res[0].data
					}).catch(res => {
						if(typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200){
							console.log('请求失败了-----------------------3')
							this.$message.error('数据获取失败或请求超时3333')
							this.$emit("closes", false)
							this.$router.go(-1)
							return false;
						}
						console.log(res.response.data[0].data,"成员信息")
						var familyData = res.response.data[0].data;
						// this.familyData = res.response.data[0].data;
						let familyRelation=[];
						for(let i in res.response.data[0].data ){

							// 户主关系过滤:
							if(res.response.data[0].data[i].abm_ex6!='C'){
								if(familyData[i].abm_ex1=="户主本人"){
									familyData[i].abm_ex1="户主"
								}
								let familyResult=familyData[i].abm_ex1;
								// 如果数据返回的户主关系，与选项都不相同(如选项有户主，没有户主本人，但是返回的是户主本人)则清空户主关系
								familyRelation=(this.relation.filter( (relationval)=>{return familyResult==relationval}));
								if(familyRelation.length==0){
									res.response.data[0].data[i].abm_ex1=""
								}
							}

							if(res.response.data[0].data[i].abm_ex6=='Y'){
								this.familyData1.push(res.response.data[0].data[i]) //共同生活
							
							}else if(res.response.data[0].data[i].abm_ex6=='N'){
								this.familyData2.push(res.response.data[0].data[i]) //非共同生活
							}else if(res.response.data[0].data[i].abm_ex6=='B'){
								this.familyData3.push(res.response.data[0].data[i]) //非共同生活赡抚养人信息
							}else if(res.response.data[0].data[i].abm_ex6=='C'){
								this.familyData4.push(res.response.data[0].data[i]) //村干部、近亲属信息
							}
						}
						var jk=1;
						// var familyIDCardImg=[];
						for(let i in this.familyData1 ){
							this.familyIDCardImg[i].fid = this.familyData1[i].abm_id;
							this.familyIDCardImg[i].familyName = this.familyData1[i].abm_ex3;
							if(i+1 < this.familyData1.length){
								this.familyIDCardImg.push({fid:'',familyName:'',idcardImg:[]});
							}
							console.log("i="+i);
							this.changeCard(i)
							if(this.familyData1[i].abm_ex11=='重病'){
								jk*=2;
								
							}else if(this.familyData1[i].abm_ex11=='残疾'){
								jk*=3
								
							}
							if(jk%6==0){
								this.jkShow1=false;
								this.jkShow2=false;

							}else if(jk%2==0){
								this.familyData1[i].abm_ex39='';
								this.familyData1[i].abm_ex40='';
								this.jkShow1=false;
								this.jkShow2=true;
							}else if(jk%3==0){
								this.familyData1[i].abm_ex52='';
								this.jkShow1=true;
								this.jkShow2=false;
							}
						}

						console.log(this.familyIDCardImg,'家庭成员身份证');
						// 人均月收入计算
						// if(res.response.data[0].data.length<2){
						// 	this.ab_ex94_ = Number (this.dibaoForm.ab_ex94); 
						// 	this.pay.abp_ex10=Number(this.pay.abp_ex9)
						// }else{
						// 	this.ab_ex94_ = Number(this.dibaoForm.ab_ex94 / this.familyData1.length).toFixed(2);
						// 	this.pay.abp_ex10=Number(this.pay.abp_ex9 / this.familyData1.length).toFixed(2);
						// }
					
				
						// 收入
						this.getBasicIncome({
							sId: this.$route.query.sId,
						}).then(res => {
							// console.log(res)
							this.income = res[0].data
						}).catch(res => {
							if(typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200){
								console.log('请求失败了-----------------------3')
								this.$message.error('数据获取失败或请求超时3333')
								this.$emit("closes", false)
								this.$router.go(-1)
								return false;
							}
							//工资性收入 ： A；经营：B；财产：C；转移：D；其他：E；必要就业：F；总：G
						var income1=[]
						var income2=[]
						var income3=[]
						var income4=[]
						var income5=[]
						var income6=[]
						var income7=[]
						
						for(let i in res.response.data[0].data ){
							for (let j in res.response.data[0].data[i]) {
								res.response.data[0].data[i][j]=unescape(res.response.data[0].data[i][j]) 
							}
							// console.log(Number(res.response.data[0].data[i].abi_ex2).toFixed(2));
							res.response.data[0].data[i].abi_ex2=Number(res.response.data[0].data[i].abi_ex2).toFixed(2)
							
							if(res.response.data[0].data[i].abi_ex4=='A'){
								income1.push(res.response.data[0].data[i]) 
							}
							else if(res.response.data[0].data[i].abi_ex4=='B'){
								res.response.data[0].data[i].abi_ex1="经营性净收入"
								income2.push(res.response.data[0].data[i]) 
							}
							else if(res.response.data[0].data[i].abi_ex4=='C'){
								income3.push(res.response.data[0].data[i]) 
							}
							else if(res.response.data[0].data[i].abi_ex4=='D'){
								income4.push(res.response.data[0].data[i]) 
							}
							else if(res.response.data[0].data[i].abi_ex4=='E'){
								res.response.data[0].data[i].abi_ex1="其他收入"
								income5.push(res.response.data[0].data[i]) 
							}
							else if(res.response.data[0].data[i].abi_ex4=='F'){
								res.response.data[0].data[i].abi_ex1="必要就业成本抵扣"
								income6.push(res.response.data[0].data[i]) 
							}
							else if(res.response.data[0].data[i].abi_ex4=='G'){
								income7.push(res.response.data[0].data[i]) 
							}
						}
						var abi_ex2_1=0;
						var abi_ex2_2=0;
						var abi_ex2_3=0;
						var abi_ex2_4=0;
						var abi_ex2_5=0;
						var abi_ex2_6=0;
						var len=0;

						if(income1.length>0){
							this.income1=income1;
							for(let i in this.income1 ){
								if(this.income1[i].abi_ex2!=""&& !isNaN(Number(this.income1[i].abi_ex2)) ){
									len++;
									abi_ex2_1+=Number(this.income1[i].abi_ex2)
								}else if(len==0){
									abi_ex2_1=0.00;
								}
							}
						}
						if(income2.length>0){
							this.income2=income2;
							for(let i in this.income2 ){
								if(this.income2[i].abi_ex2!=""&& !isNaN(Number(this.income2[i].abi_ex2)) ){
									len++;
									abi_ex2_2+=Number(this.income2[i].abi_ex2)
								}else if(len==0){
									abi_ex2_2=0.00;
								}
							}
						}
						if(income3.length>0){
							this.income3=income3;
							for(let i in this.income3 ){
								if(this.income3[i].abi_ex2!=""&& !isNaN(Number(this.income3[i].abi_ex2)) ){
									len++;
									abi_ex2_3+=Number(this.income3[i].abi_ex2)
								}else if(len==0){
									abi_ex2_3=0.00;
								}
							}
						}
						if(income4.length>0){
							this.income4=income4;
							for(let i in this.income4 ){
								if(this.income4[i].abi_ex2!="" && !isNaN(Number(this.income4[i].abi_ex2)) ){
									len++;
									abi_ex2_4+=Number(this.income4[i].abi_ex2)
								}else if(len==0){
									abi_ex2_4=0.00;
								}
								// console.log( this.income4);
							}
						}
						if(income5.length>0){
							this.income5=income5;
							for(let i in this.income5 ){
								if(this.income5[i].abi_ex2!="" && !isNaN(Number(this.income5[i].abi_ex2)) ){
									len++;
									abi_ex2_5+=Number(this.income5[i].abi_ex2)
								}else if(len==0){
									abi_ex2_5=0.00;
								}
								// console.log( this.income5);
							}
						}
						if(income6.length>0){
							this.income6=income6;
							if(this.income6[0].abi_ex2!=""&& !isNaN(Number(this.income6[0].abi_ex2)) ){
								len++;
								abi_ex2_6+=Number(this.income6[0].abi_ex2)
							}else if(len==0){
								abi_ex2_6=0.00;
							}
						}
						
						if(income1.length>0||income2.length>0||income3.length>0||income4.length>0||income5.length>0||income6.length>0){
							var	amt=abi_ex2_1+abi_ex2_2+abi_ex2_3+abi_ex2_4+abi_ex2_5-abi_ex2_6;
							this.income7[0].abi_ex1="总收入";
							this.income7[1]={abi_ex1:"家庭月平均收入"};
							this.income7[2]={abi_ex1:"家庭月人均收入"};

							console.log("总收入有值",this.income7);
							this.income7[0].abi_ex2=Number(amt).toFixed(2)
							this.income7[1].abi_ex2=Number(amt/12).toFixed(2)

							if(this.familyData1.length>0){
								var income7_2=Number(amt/12/this.familyData1.length).toFixed(2);
								this.income7[2].abi_ex2=income7_2;
							}else{
								console.log("月人均收入为零，因为家庭人口为",this.familyData1.length);
								this.income7[2].abi_ex2="0.00";
							}

						}
						else if(income7.length>0){
							this.income7=income7;
							this.income7[0].abi_ex1="总收入";
							this.income7[1]={abi_ex1:"家庭月平均收入"};
							this.income7[2]={abi_ex1:"家庭月人均收入"};
							this.income7[1].abi_ex2=(this.income7[0].abi_ex2/12).toFixed(2);
							if(this.familyData1.length<1){
								this.income7[2].abi_ex2=0.00;
							}else{
								this.income7[2].abi_ex2=(income7[0].abi_ex2/12/this.familyData1.length).toFixed(2);
							}

						} else{
							this.income7[0].abi_ex1="总收入";
							this.income7[1].abi_ex1="家庭月平均收入";
							this.income7[2].abi_ex1="家庭月人均收入";
							this.income7[0].abi_ex2="0.00";
							this.income7[1].abi_ex2="0.00";
							this.income7[2].abi_ex2="0.00";
						}
						// console.log(res.response.data[0].data,"收入")
					})

				

						// console.log(this.income1,"工资性收入");
						
						// 刚性支出
						this.loadPay({
							sId: this.$route.query.sId,
						}).then(res => {
							if(res[0].data.length>0){
								this.pay = res[0].data3
								// console.log(this.pay,"---------pay111")
							}
						}).catch(res => {
								let pay=res.response.data[0].data3[0];
								let zzc=0;
								if(res.response.data[0].data3.length==0){
									this.pay.abp_ex4='';
									this.pay.abp_ex5='';
									this.pay.abp_ex6='';
									this.pay.abp_ex7='';
									this.pay.abp_ex8='';
									this.pay.abp_ex9='';
									this.pay.abp_ex10='';
									this.pay.abp_ex11='';
								}
								else{

									// 过滤支出空数据，将有数据的支出类别进行累加
									Object.keys(pay).filter(function(value){
										if([value]=="abp_ex4" || [value]=="abp_ex5" || [value]=="abp_ex6" || [value]=="abp_ex7" ||[value]=="abp_ex11"){
											if(isNaN(Number(pay[value]))==false){
												zzc+=Number(pay[value])
											}
										}
										return zzc
									})

									// zzc=Number(pay.abp_ex4)+Number(pay.abp_ex5)+Number(pay.abp_ex6)+Number(pay.abp_ex7)+Number(pay.abp_ex11)
									console.log(zzc,"zzc");
									
									// console.log(data2,"data2");
									this.pay = pay

									if(pay.abp_ex8==""|| pay.abp_ex8==0){
										this.pay.abp_ex8 = Number(zzc).toFixed(2);
									}
									this.pay.abp_ex8 = Number(this.pay.abp_ex8).toFixed(2);
									this.pay.abp_ex9 = (Number(this.income7[0].abi_ex2) - Number(this.pay.abp_ex8)).toFixed(2);

									if(this.familyData1.length<1){
										console.log("length==0")
										// this.pay.abp_ex8 = Number(zzc).toFixed(2);
										// this.pay.abp_ex9 = Number(0).toFixed(2);
										this.pay.abp_ex10 = Number(0).toFixed(2);
										// this.dibaoForm.ab_ex94_=(this.pay.ab_ex94 / this.familyData1.length).toFixed(2)
									}else{
										console.log("lengt>0")
									
										this.pay.abp_ex10 = Number(this.pay.abp_ex9 / this.familyData1.length).toFixed(2);
									}
								}
							// console.log(res.response.data[0],"---------pay")
						})
					})
				})
				// 家庭财产
				this.loadEstate({
					sId: this.$route.query.sId,
					// abe_ex7:"房屋"
				}).then(res => {
					this.estate1 = res[0].data
					this.estate2 = res[0].data2
				}).catch(res => {
					if(typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200){
						console.log('请求失败了-----------------------')
						this.$message.error('数据获取失败或请求超时666')
						this.$emit("closes", false)
						this.$router.go(-1)
						return false
					}
					console.log(res.response.data[0].data.length);
					for(let i in res.response.data[0].data){
						if(res.response.data[0].data[i].abe_ex7=='车船'){
							this.estate1.push(res.response.data[0].data[i]) 
						}else{
							this.estate2.push(res.response.data[0].data[i]) 
						}
					}
				})

				//加载代理人信息
				this.loadAgent({
					"sId": this.$route.query.sId,
				}).then(res => {
					this.agentInfo = res[0].data;
					this.uploadImg.aba_ex4_img = this.agentInfo.aba_ex4.split(",");
					this.uploadImg.aba_ex5_img = this.agentInfo.aba_ex5.split(",");
				}).catch(res => {
					/*if(typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200){
						console.log('请求失败了-----------------------6')
						this.$message.error('数据获取失败或请求超时666')
						this.$emit("closes", false)
						this.$router.go(-1)
						return false
					}*/
					try{
						this.agentInfo = res.response.data[0].data;
						this.uploadImg.aba_ex4_img = this.agentInfo.aba_ex4.split(",");
						this.uploadImg.aba_ex5_img = this.agentInfo.aba_ex5.split(",");

						for(let i in this.uploadImg ){
							var r = this.uploadImg[i].filter(function (s) {
									return s && s.trim();
									});
							// console.log(r,"过滤数组");
							if(i=='aba_ex4_img'){
								this.agentInfo.aba_ex4 = r.join(",")
								this.uploadImg.aba_ex4_img = r

							}else if(i=='aba_ex5_img'){
								this.agentInfo.aba_ex5 = r.join(",")
								this.uploadImg.aba_ex5_img = r
							}
						}
						this.getImgNum()
					}catch(e){
						alert(e)
					}
					
				})

				//承包山林土地
				this.loadLand({
					"sId": this.$route.query.sId,
				}).then(res => {
					this.landInfo = res[0].data;
				}).catch(res => {
					if(typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200){
						console.log('请求失败了-----------------------6')
						this.$message.error('数据获取失败或请求超时666')
						this.$emit("closes", false)
						this.$router.go(-1)
						return false
					}
					this.landInfo = res.response.data[0].data;
				})
			},
			//基本信息中如果近亲属选择"否",清空近亲属
			changeFm4(ab_ex92){
				if(ab_ex92=="否"){
					this.familyData4=[];	
				}
			},
			// 给tabledata添加序号便于操作
			rowClassName({
				row,
				rowIndex
			}) {
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
			// 获取FamilyData3被选中的
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
			// 土地山林
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


				// 共同生活
				if (str == 'familyData1') {
					if (this.familyData1 == undefined) {
						this.familyData1 = new Array();
					}
					obj = {
						abm_ex1: '',
						abm_ex2: '',
						abm_ex3: '',
						abm_ex5: '',
						abm_ex6: 'Y',
						abm_ex7: '',
						abm_ex11: '',
						abm_ex14: '',
						abm_ex15: '',
						abm_ex16: '',
						abm_ex17: '',
						abm_ex28: '',
						abm_ex39: '',
						abm_ex40: '',
						abm_ex49: '',
						abm_ex51:'',
						abm_ex52:'',
						age: '',
						work:''
						// abm_ex42: ''
					};
					this.familyData1.push(obj);
				}
				// 非共同生活
				if (str == 'familyData2') {
					if (this.familyData2 == undefined) {
						this.familyData2 = new Array();
					}
					obj = {
						abm_ex1: '',
						abm_ex3: '',
						abm_ex2: '',
						abm_ex6: 'N',
						abm_ex11: '',
						abm_ex15: '',
						abm_ex20: '',
						abm_ex17: '',
						abm_ex49: '',
						abm_ex18: ''
						// abm_ex28: ''
					};
					this.familyData2.push(obj);
				}
				// 非共同生活家庭成员
				if (str == 'familyData3') {
					if (this.familyData3 == undefined) {
						this.familyData3 = new Array();
					}
					obj = {
						abm_ex1: '',
						abm_ex3: '',
						abm_ex6: 'B',
						abm_ex2: ''
						
					};
					this.familyData3.push(obj);
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

				// 工资性收入
				if (str == 'income1') {
					if (this.income1 == undefined) {
						this.income1 = new Array();
					}
					obj = {
						abi_ex1: '',
						abi_ex2: '',
						abi_ex3: '工资性收入',
						abi_ex4: 'A',
						abi_ex5: '',
					};
					this.income1.push(obj);
				}
				// 经营净收入
				// if (str == 'income2') {
				// 	if (this.income2 == undefined) {
				// 		this.income2 = new Array();
				// 	}
				// 	obj = {
				// 		abi_ex1: '',
				// 		abi_ex2: '',
				// 		abi_ex3: '经营净收入',
				// 		abi_ex4: 'B',
				// 		abi_ex5: '',
				// 	};
				// 	this.income2.push(obj);
				// }
				// 财产净收入
				if (str == 'income3') {
					if (this.income3 == undefined) {
						this.income3 = new Array();
					}
					obj = {
						abi_ex1: '',
						abi_ex2: '',
						abi_ex3: '财产净收入',
						abi_ex4: 'C',
						abi_ex5: '',
					};
					this.income3.push(obj);
				}
				// 转移净收入
				if (str == 'income4') {
					if (this.income4 == undefined) {
						this.income4 = new Array();
					}
					obj = {
						abi_ex1: '',
						abi_ex2: '',
						abi_ex3: '转移净收入',
						abi_ex4: 'D',
						abi_ex5: '',
					};
					this.income4.push(obj);
				}
				// 车船信息
				if (str == 'estate1') {
					if (this.estate1 == undefined) {
						this.estate1 = new Array();
					}
					obj = {
						abe_ex1: '',
						abe_ex2: '',
						abe_ex3: '',
						abe_ex4: '',
						abe_ex7: '车船',
						abe_ex8: '',
					};
					this.estate1.push(obj);
				}
				// 房产信息
				if (str == 'estate2') {
					if (this.estate2 == undefined) {
						this.estate2 = new Array();
					}
					obj = {
						abe_ex1: '',
						abe_ex2: '',
						abe_ex4: '',
						abe_ex5: '',
						abe_ex6: '',
						abe_ex7: '房屋',
						abe_ex11: '',
					};
					this.estate2.push(obj);
				}
				if (str == 'landInfo') {
					if (this.landInfo == undefined) {
						this.landInfo = new Array();
					}
					obj = {
						abl_id: '',
						abl_ex1: '',
						abl_ex2: '',
						abl_ex3: '',
						abl_ex4: '',
						abl_ex5: ''
					};
					this.landInfo.push(obj);
				}
				console.log('新增',this.familyData1.length);
				
				// 重新计算收入支出
				this.changeAmt()
			},
			// 根据str找table删除选中行
			handleDelDetails(str) {
				let obj;
				let old;
			
				if (str == 'warningData') {
					obj = this.checkedWarningData;
					console.log(obj,"warn");
					old = this.warningData;
					if (obj.length > 0) {
						console.log();
						obj.forEach((v1, i1) => {
							old.forEach((v2, i2) => {
								if (v1.xh == v2.xh) {
									old.splice(i2, 1)
								}
							})
						})
					}
					console.log("删除预警",this.warningData);
				}
				
				if (str == 'familyData1') {
					obj = this.checkedFamilyData1;
					console.log(obj,"fam1");
					old = this.familyData1;
					if (obj.length > 0) {
						obj.forEach((v1, i1) => {
							old.forEach((v2, i2) => {
								if (v1.xh == v2.xh) {
									old.splice(i2, 1)
								}
							})
						})
					}
				}
				if (str == 'familyData2') {
					obj = this.checkedFamilyData2;
					old = this.familyData2;
					if (obj.length > 0) {
						obj.forEach((v1, i1) => {
							old.forEach((v2, i2) => {
								if (v1.xh == v2.xh) {
									old.splice(i2, 1)
								}
							})
						})
					}
				}
				if (str == 'familyData3') {
					obj = this.checkedFamilyData3;
					old = this.familyData3;
					if (obj.length > 0) {
						obj.forEach((v1, i1) => {
							old.forEach((v2, i2) => {
								if (v1.xh == v2.xh) {
									old.splice(i2, 1)
								}
							})
						})
					}
				}
				if (str == 'familyData4') {
					obj = this.checkedFamilyData4;
					old = this.familyData4;
					if (obj.length > 0) {
						obj.forEach((v1, i1) => {
							old.forEach((v2, i2) => {
								if (v1.xh == v2.xh) {
									old.splice(i2, 1)
								}
							})
						})
					}
				}
				if (str == 'income1') {
					obj = this.checkedIncome1;
					old = this.income1;
					if (obj.length > 0) {
						obj.forEach((v1, i1) => {
							old.forEach((v2, i2) => {
								if (v1.xh == v2.xh) {
									old.splice(i2, 1)
								}
							})
						})
					}
				}
				if (str == 'income2') {
					obj = this.checkedIncome2;
					old = this.income2;
					if (obj.length > 0) {
						obj.forEach((v1, i1) => {
							old.forEach((v2, i2) => {
								if (v1.xh == v2.xh) {
									old.splice(i2, 1)
								}
							})
						})
					}
				}
				if (str == 'income3') {
					obj = this.checkedIncome3;
					old = this.income3;
					if (obj.length > 0) {
						obj.forEach((v1, i1) => {
							old.forEach((v2, i2) => {
								if (v1.xh == v2.xh) {
									old.splice(i2, 1)
								}
							})
						})
					}
				}
				if (str == 'income4') {
					obj = this.checkedIncome4;
					old = this.income4;
					if (obj.length > 0) {
						obj.forEach((v1, i1) => {
							old.forEach((v2, i2) => {
								if (v1.xh == v2.xh) {
									old.splice(i2, 1)
								}
							})
						})
					}
				}
				if (str == 'estate1') {
					obj = this.checkedEstate1;
					old = this.estate1;
					if (obj.length > 0) {
						obj.forEach((v1, i1) => {
							old.forEach((v2, i2) => {
								if (v1.xh == v2.xh) {
									old.splice(i2, 1)
								}
							})
						})
					}
				}
				if (str == 'estate2') {
					obj = this.checkedEstate2;
					old = this.estate2;
					if (obj.length > 0) {
						obj.forEach((v1, i1) => {
							old.forEach((v2, i2) => {
								if (v1.xh == v2.xh) {
									old.splice(i2, 1)
								}
							})
						})
					}
				}

				if (str == 'landInfo') {
					obj = this.checkedLandInfo;
					old = this.landInfo;
					if (obj.length > 0) {
						obj.forEach((v1, i1) => {
							old.forEach((v2, i2) => {
								if (v1.xh == v2.xh) {
									old.splice(i2, 1)
								}
							})
						})
					}
				}
				// 每次对家庭成员进行操作重新对收支进行计算
				this.changeAmt()
			},
		
			// 支出、资产--正则验证
			changeAmt3(key,id){
				// 医疗
				let msg="";
				if(id=="pay.abp_ex4"){
					this.pay.abp_ex4=key.replace(/\s+/g,""); 
					msg=isNum(key,id);
					if(msg!=true){
						this.$message.warning(msg);
						this.isSaves=false;
						return false;
					}
				}
				// 教育 5
				if(id=="pay.abp_ex5"){
					this.pay.abp_ex5=key.replace(/\s+/g,"");
					msg=isNum(key,id);
					if(msg!=true){
						this.$message.warning(msg);
						this.isSaves=false;
						return false;
					}
				}
				// 残疾康复费用 6
				if(id=="pay.abp_ex6"){
					this.pay.abp_ex6=key.replace(/\s+/g,""); 
					msg=isNum(key,id);
					if(msg!=true){
						this.$message.warning(msg);
						this.isSaves=false;
						return false;
					}
				}
				// 因灾、因意外事故费用 11
				if(id=="pay.abp_ex11"){
					this.pay.abp_ex11=key.replace(/\s+/g,""); 
					msg=isNum(key,id);
					if(msg!=true){
						this.$message.warning(msg);
						this.isSaves=false;
						return false;
					}
				}
				// 其他支出 7
				if(id=="pay.abp_ex7"){
					this.pay.abp_ex7=key.replace(/\s+/g,""); 
					msg=isNum(key,id);
					if(msg!=true){
						this.$message.warning(msg);
						this.isSaves=false;
						return false;
					}
				}
				// 总支出
				// if(id=="pay.abp_ex8"){
				// 	this.pay.abp_ex8=key.replace(/\s+/g,""); 
				// 	// this.isNum(key,id)
				// 	msg=isNum(key,id);
				// 	if(msg!=true){
				// 		this.$message.warning(msg);
				// 		this.isSaves=false;
				// 		return false;
				// 	}
				// }
				// 支出计算
				this.changeAmt();
				
			},
			// 户籍地址
			// hAddress(){
				// let address=[];
				
				// for(let i in this.householdRegistrationAddress){
				// 	address.push(this.householdRegistrationAddress[i].split("#"));
				// }
				// console.log(this.householdRegistrationAddress);
				
				// this.dibaoForm.ab_ex4=this.householdRegistrationAddress.join(',')+';' + this.houseNum;
				// let address2 = address[0][0]+address[1][0]+address[2][0]
				// if(this.dibaoForm.ab_ex11 == ''){
				// 	this.dibaoForm.ab_ex11 = address2;
				// }
				// console.log('address=>',address);
				// console.log('this.dibaoForm.ab_ex11=>',this.dibaoForm.ab_ex11);
				// console.log('this.dibaoForm.ab_ex9=>',this.dibaoForm.ab_ex9);
			// },

			//预警
			changeAmt2() {
				for(var i in this.warningData){
					if(this.warningData[i].aw_ex1!="" && (this.warningData[i].aw_dat1==""||this.warningData[i].aw_dat1==null)){
						this.warningData[i].aw_dat1 =this.getTimeFn();
					}
				}
				// console.log(this.getTimeFn());
				// console.log(this.warningData[0].aw_dat1);
			},
			
			//设置默认时间--预警时间默认为选择当天的第十天
			getTimeFn() {
				let dates = new Date()
				let y = dates.getFullYear()
				let m = dates.getMonth() + 1
				// let d = dates.getDate()+10
				let d = dates.getDate()
				let time = y + '-' + m +'-'+ d
				// console.log(time)
				return time
			},
			//健康状况
			changeMember(index){
				let item=this.familyData1[index];
				if(item.abm_ex11=="重病"){
					// this.disabledList2.push("a"+index);
					item.abm_ex39="";
					item.abm_ex40="";
				}else if(item.abm_ex11=='残疾'){
					
					item.abm_ex52="";
				}else{
					item.abm_ex39="";
					item.abm_ex40="";
					item.abm_ex52="";

				}
				this.changeAmt();
			},
			//shift+F12快速查找所有引用
			changeAmt(index,row,id) {
				// 工资收入
				var msg=""
				if(id=="ico1.abi_ex2"){
					this.income1[index].abi_ex2=row.abi_ex2.replace(/\s+/g,"");
					msg=isNum(row.abi_ex2,id,index);
					if(msg!=true){
						this.$message.warning(msg);
						this.isSaves=false;
						return false;
					}
				}
				// 经营收入
				if(id=="ico2.abi_ex2"){
					this.income2[index].abi_ex2=row.abi_ex2.replace(/\s+/g,"");
					msg=isNum(row.abi_ex2,id,index);
					if(msg!=true){
						this.$message.warning(msg);
						this.isSaves=false;
						return false;
					}
				}
				// 财产收入
				if(id=="ico3.abi_ex2"){
					this.income3[index].abi_ex2=row.abi_ex2.replace(/\s+/g,"");
					msg=isNum(row.abi_ex2,id,index);
					if(msg!=true){
						this.$message.warning(msg);
						this.isSaves=false;
						return false;
					}
				}
				// 转移收入
				if(id=="ico4.abi_ex2"){
					this.income4[index].abi_ex2=row.abi_ex2.replace(/\s+/g,"");
					msg=isNum(row.abi_ex2,id,index);
					if(msg!=true){
						this.$message.warning(msg);
						this.isSaves=false;
						return false;
					}
				}
				// 其他收入
				if(id=="ico5.abi_ex2"){
					this.income5[index].abi_ex2=row.abi_ex2.replace(/\s+/g,"");
					msg=isNum(row.abi_ex2,id,index);
					if(msg!=true){
						this.$message.warning(msg);
						this.isSaves=false;
						return false;
					}
				}
				// 必要就业成本
				if(id=="ico6.abi_ex2"){
					this.income6[index].abi_ex2=row.abi_ex2.replace(/\s+/g,"");
					// this.isNum(row.abi_ex2,id);
					msg=isNum(row.abi_ex2,id);
					if(msg!=true){
						this.$message.warning(msg);
						this.isSaves=false;
						return false;
					}
				}
				// 总收入
				if(id=="ico7.abi_ex2"){
					this.income7[index].abi_ex2=row.abi_ex2.replace(/\s+/g,"");
					// this.isNum(row.abi_ex2,id);
					msg=isNum(row.abi_ex2,id);
					if(msg!=true){
						this.$message.warning(msg);
						this.isSaves=false;
						return false;
					}
				}


				this.dibaoForm.ab_ex46=this.ab_ex46.toString();//求助原因字段

				// 12个月收入
				
				var ab_ex5 = Number(this.dibaoForm.ab_ex5);
				var abi_ex2_1=0;
				var abi_ex2_2=0;
				var abi_ex2_3=0;
				var abi_ex2_4=0;
				var abi_ex2_5=0;
				var abi_ex2_6=0;
				// var abi_ex2_7=0;
				var amt=0;
				var len=0;
				for(let i in this.income1 ){
					if(this.income1[i].abi_ex2!=""&& !isNaN(Number(this.income1[i].abi_ex2)) ){
						len++;
						abi_ex2_1+=Number(this.income1[i].abi_ex2) 
					}else if(len==0){
						abi_ex2_1=0;
					}
				}
				// console.log(abi_ex2_1);

				for(let i in this.income2 ){
					if(this.income2[i].abi_ex2!=""&& !isNaN(Number(this.income2[i].abi_ex2)) ){
						len++;
						abi_ex2_2+=Number(this.income2[i].abi_ex2) 
					}else if(len==0){
						abi_ex2_2=0;
					}
				}

				for(let i in this.income3 ){
					if(this.income3[i].abi_ex2!=""&& !isNaN(Number(this.income3[i].abi_ex2)) ){
						len++;
						abi_ex2_3+=Number(this.income3[i].abi_ex2) 
					}else if(len==0){
						abi_ex2_3=0;
					}
				}

				for(let i in this.income4 ){
					if(this.income4[i].abi_ex2!="" && !isNaN(Number(this.income4[i].abi_ex2)) ){
						len++;
						abi_ex2_4+=Number(this.income4[i].abi_ex2) 
						
					}else if(len==0){
						abi_ex2_4=0;
					}
				}

				for(let i in this.income5 ){
					if(this.income5[i].abi_ex2!="" && !isNaN(Number(this.income5[i].abi_ex2)) ){
						len++;
						abi_ex2_5+=Number(this.income5[i].abi_ex2) 
					}else if(len==0){
						abi_ex2_5=0;
					}
				}

				for(let i in this.income6 ){
					if(this.income6[i].abi_ex2!=""&& !isNaN(Number(this.income6[i].abi_ex2)) ){
						len++;
						abi_ex2_6+=Number(this.income6[i].abi_ex2) 
					}else if(len==0){
						abi_ex2_6=0;
					}
					// console.log( this.income6);
				}
				
				amt=abi_ex2_1+abi_ex2_2+abi_ex2_3+abi_ex2_4+abi_ex2_5-abi_ex2_6;
				
				this.income7[0].abi_ex2=amt.toFixed(2);
				
				var illness=0;   //重病
				var disability=0;  //殘疾
				var children=0;   //未成年
				var income72={}
				console.log(this.familyData1.length>0,'Amt');
				
				if(this.familyData1.length>0){

					// this.income7[1].abi_ex2=(amt/12).toFixed(2);
					// this.income7[2].abi_ex2=(amt/12/this.familyData1.length).toFixed(2);
					// this.$set(this.income7[1],'abi_ex2',(amt/12).toFixed(2))
					// this.$set(this.income7[2],'abi_ex2',(amt/12/this.familyData1.length).toFixed(2))
					// this.$forceUpdate();
					// 以上都没用

					income72.abi_ex2=(amt/12/this.familyData1.length).toFixed(2);
					income72.abi_ex1='家庭月人均收入';
					this.income7.splice(2, 1, income72)

					
					console.log(amt,this.familyData1.length);
					console.log(this.income7[1].abi_ex2,this.income7[2].abi_ex2);

					for(let j=0;j<this.familyData1.length;j++){
						if(this.familyData1[j].abm_ex11=="残疾"){
							if(this.familyData1[j].abm_ex40=="一级残疾" || this.familyData1[j].abm_ex40=="二级残疾"){
								disability++;
							}else if(this.familyData1[j].abm_ex40=="三级残疾" &&(this.familyData1[j].abm_ex39=='精神残疾' || this.familyData1[j].abm_ex39=='智力残疾')){
								disability++;
							}
						} 
						if(this.familyData1[j].abm_ex11=="重病"){
							illness++;
						}
						if(this.familyData1[j].age<18){
							children++;
						}
					}
					// this.jisuan.familyNum=(this.familyData1.length)  //总人口
					// this.jisuan.familyZB=illness;  //重病
					// this.jisuan.familyZC=disability;  //重残
					// this.jisuan.familyChildrens=children;  //儿童
				}else{
					this.income7[1].abi_ex2=(amt/12).toFixed(2);
					this.income7[2].abi_ex2='0.00';
					// this.jisuan.familyZB=illness;  //重病
					// this.jisuan.familyZC=disability;	//重残
					// this.jisuan.familyNum=0;     //总人口
					// this.jisuan.familyChildrens=0;      //儿童
				}

				// if(this.familyData2.length>0){
				// 	this.jisuan.familyFD=(this.familyData2.length)  //法定
				// }else{
				// 	this.jisuan.familyFD=0;
				// }


				// 基本信息-家庭人口-输入判断
				//  if(Number.isNaN(ab_ex5)){
				// 	this.$message.warning("家庭人口数应大于0");
				// 	return false;
				// }
				//12个月支出
				// console.log(this.pay,"支出");
				var abp_ex4 = Number(this.pay.abp_ex4);
				var abp_ex5 = Number(this.pay.abp_ex5);
				var abp_ex6 = Number(this.pay.abp_ex6);
				var abp_ex7 = Number(this.pay.abp_ex7);
				var abp_ex8 = Number(this.pay.abp_ex8);
				var abp_ex11 = Number(this.pay.abp_ex11);
				
				if(Number.isNaN(abp_ex4)){
					abp_ex4 = 0;
				}
				if(Number.isNaN(abp_ex5)){
					abp_ex5 = 0;
				}
				if(Number.isNaN(abp_ex6)){
					abp_ex6 = 0;
				}
				if(Number.isNaN(abp_ex7)){
					abp_ex7 = 0;
				}
				if(Number.isNaN(abp_ex8)){
					abp_ex8 = 0;
				}
				if(Number.isNaN(abp_ex11)){
					abp_ex11 = 0;
				}
				// console.log("支出:",abp_ex4,abp_ex5,abp_ex6,abp_ex7,abp_ex8,abp_ex11);
				var zzc=abp_ex4!=""||abp_ex5!=""||abp_ex6!=""||abp_ex7!=""||abp_ex11!="" ? abp_ex4 + abp_ex5 + abp_ex6 + abp_ex7+ abp_ex11 : this.pay.abp_ex8;
				// console.log(abp_ex4,abp_ex5,abp_ex6,abp_ex7,"abp_ex4,abp_ex5,abp_ex6,abp_ex7")
				
				this.pay.abp_ex8 = Number(zzc).toFixed(2); ;
				this.pay.abp_ex9 = Number(amt - zzc).toFixed(2);

				// 收支计算
				if(this.familyData1.length==0){
					// console.log("length==0")
					// this.jisuan.familyAmt = 0.00  //总收入
					// this.jisuan.familyZzc = 0.00	//总支出
					this.pay.abp_ex10 = 0.00; //扣减刚性支出后人均年收入
					
				}else{
					// console.log("lengt>0")
					// this.jisuan.familyAmt=amt.toFixed(2)  //总收入
					// this.jisuan.familyZzc=Number(zzc).toFixed(2)	//总支出
					this.pay.abp_ex10 = Number(this.pay.abp_ex9 / this.familyData1.length).toFixed(2); //扣减刚性支出后人均年收入
				}

				// if( children>0 && this.jsjg[0]!="儿童救助"){
				// 	this.jsjg.push(this.kxsjz[0]); //困境儿童
				// }
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
				this.isShow17 = true
				this.isShow18 = true
				this.isShow21 = true
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
				} else if (n == 8) {
					this.isShow8 = false
				} else if (n == 9) {
					this.isShow9 = false
				}else if (n == 10) {
					this.isShow10 = false
				}else if (n == 11) {
					this.isShow11 = false
				}else if (n == 12) {
					this.isShow12 = false
				}else if (n == 17) {
					this.isShow17 = false
				}else if (n == 18) {
					this.isShow18 = false
				}else if (n == 21) {
					this.isShow21 = false
				}
			},

			closeView() {
				this.$emit("closes", false)
				this.$router.go(-1)
				// 泰州的线上点击返回要点两次，本地不用这里判断一下运行环境
				if(process.env.NODE_ENV!="development"){
					this.$router.go(-1)
				}
			},

			// 不造谁写的，不造有没有用
			// vss(d){
			// 	var h =[];
			// 	for(var k in d){
			// 		h.push(k + "=" + d[k]);
			// 	}
			// 	return h.join("\r\n")
			// },

				
			getImgIndex(item){
				let data = JSON.parse(item);
				this.imgIndex[data.id] = data.index;
			},

			// 获取图片数量
			getImgNum(){
				for(let key in this.uploadImg){
					if(this.uploadImg[key][0] == ''){
						this.uploadImg[key].length = 0;
						this.imgNum[key]=this.uploadImg[key].length;
					}else{
						this.imgNum[key]=this.uploadImg[key].length;
						// console.log(this.uploadImg[key].length);
					}

					//获取身份证照片
					if(key=="ab_ex10_img"){
						this.familyIDCardImg[0].idcardImg = this.uploadImg[key];
					}
				}
				
				console.log(this.uploadImg,"图片");
				console.log(this.familyIDCardImg,"身份证图片");
			},

			//删除图片
			handleRemove(file, str) {
				this.$confirm('是否删除该图片？',"提示" , {
				// distinguishCancelAndClose: true,
				confirmButtonText: '确定',
				cancelButtonText: '取消'
				}).then(() => {
					this.$delete(this.uploadImg[str+"_img"],this.imgIndex[str]);
					
					if(str+"_img"=="aba_ex4_img" || str+"_img"=="aba_ex5_img"){

						this.agentInfo[str] = this.uploadImg[str+"_img"].join(",");
						console.log(this.uploadImg);
						console.log(this.imgIndex);
					}else{
						this.dibaoForm[str] = this.uploadImg[str+"_img"].join(",");
					}

					this.getImgNum()  //获取图片数量
					// console.log(this.imgNum,'imgNum：各类图片的数量-删除后');

				})
				.catch(action => {
					// 取消留在本页
					console.log("留在本页");
				});
				console.log(this.agentInfo);
				console.log(this.dibaoForm);

			},
			//图片预览
			handlePictureCardPreview(file) {
				this.dialogImageArray = file;
				this.dialogImageUrl = file[0];
				this.dialogVisible = true;
			},

			
			// 上传图片
			uploads(id, dataName) {
				if(!dataName) dataName = "dibaoForm";
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
				// console.log(this.uploadId);

				// if(id == "ab_ex10"){
				// 	console.log(this.familyIDCardImg,"身份证");
				// }

				try {
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
				// console.log(this.uploadImg,'111');
				
				
				this.getImgNum()   // 获取图片数量
				// console.log(this.imgNum,'imgNum：各类图片的数量-上传后');
			},
			// 保存
			async save() {
				this.isSaves=true
				let isSave=true;

				// 基础信息填写验证，勿删
				// this.$refs['dibaoForm'].validate((valid) => {
				// 	if (valid) {

				// 	} else {
				// 		return false;
				// 	}
				// });
				// let msgs=this.validate();
				// if(msgs){
				// 	this.$message.warning(msgs);
				// 	return false
				// }
				
				//行政区划填报验证 
				if(this.xzqhArray.length!=3 || !this.dibaoForm.ab_ex162){
					this.$message.warning("请填报行政区划");
						this.isSaves=false;
						isSave=false;
						return false
				}

				if(this.dibaoForm.ab_ex7){
					var msg = this.isCardID(this.dibaoForm.ab_ex7)
					if(msg){
						this.$message.warning("申请人"+msg);
						this.isSaves=false;
						isSave=false;
						return false
					}
				}
				
				// 检测求助原因是否有非选项内容
				if(this.ab_ex46.length>0){
					console.log("求助原因",this.ab_ex46);
					for(var i in this.ab_ex46){
						var ab_ex46=this.ab_ex46[i]
						var help_reason_arr=this.help_reason_list.filter((value)=>{return value == ab_ex46})
						// console.log(help_reason_arr,"求助原因数组");

						if(help_reason_arr.length == 0){
							this.$message.warning("基础信息：求助原因，不能有除求助列表以外的字符");
							this.isSaves = false;
							isSave = false;
							return false;
						}
					}
				}

				//是否为村干部选项过滤--不是 "是"/"否"，清空
				if(this.dibaoForm.ab_ex92!="" ){
					if(this.dibaoForm.ab_ex92=="是"){
						console.log('有近亲属是经办人或村干部');
					}else if(this.dibaoForm.ab_ex92=="否"){

					}else{
						this.$message.warning("基础信息：是否属于村干部或经办人员近亲属，只能选择 '是' 或 '否'");
						this.isSaves=false;
						isSave=false;
						return false;
					}
				} 
				
				// 对预警信息进行赋值
				var warningData_=[];
				for(var i in this.warningData){
					if(this.warningData[i].aw_dat1 || this.warningData[i].aw_ex1){
						warningData_.push(this.warningData[i]);
					}
				}
				
				
				// 共同家庭成员人数验证，不然保存不了
				// if(this.familyData1.length!=this.dibaoForm.ab_ex5){
				// 	this.$message.warning("家庭人口数与实际填报共同生活成员数不符，请重新填报");
					
				// 	isSave=false;
				// }
				
				var nameSame = 0;
				var IDCardSame = 0;
				for(let i in this.familyData1){
					this.familyData1[i].abm_ex6 = "Y"
					let abm_ex2 = this.familyData1[i].abm_ex2;
					let abm_ex3 = this.familyData1[i].abm_ex3;
					let abm_ex1 = this.familyData1[i].abm_ex1;
					let abm_ex5 = this.familyData1[i].abm_ex5;
					let abm_ex7 = this.familyData1[i].abm_ex7;
					let abm_ex11 = this.familyData1[i].abm_ex11;
                    let abm_ex14 = this.familyData1[i].abm_ex14;
                    let abm_ex15 = this.familyData1[i].abm_ex15;
                    let abm_ex16 = this.familyData1[i].abm_ex16;
                    let abm_ex17 = this.familyData1[i].abm_ex17;
                    let abm_ex18 = this.familyData1[i].abm_ex18;
                    let abm_ex28 = this.familyData1[i].abm_ex28;
                    let abm_ex49 = this.familyData1[i].abm_ex49;
                    let abm_ex51 = this.familyData1[i].abm_ex51;
					
					let index = Number(i) + 1;

					if(!abm_ex3 && !abm_ex1 && !abm_ex2 ){
						console.log('都没填跳过');
						if(abm_ex5 || abm_ex7 || abm_ex11 || abm_ex14 || abm_ex15 || abm_ex16 || abm_ex17 || abm_ex18 || abm_ex28 || abm_ex49 || abm_ex51){
							this.$message.warning("第"+(index)+"行同生活家庭成员情况：姓名、与户主关系、身份证号码请至少填写一项");
							this.isSaves = false;
							isSave = false;
							break;
						}else{
							this.familyData1.splice(i,1);
							--i;
							break;
						}
                    }else{
						if(abm_ex2){
							let msg = this.isCardID(abm_ex2);
							if(msg){
								this.$message.warning("第"+(index)+"行共同家庭成员"+msg);
								this.isSaves = false;
								isSave = false;
								break;
							}else{
								this.familyData1[i].abm_ex29 = this.familyData1[i].age;
							}
						}
					}

					
					// 计算共同生活家庭成员申请人的姓名、身份证的数量，检测是否有重复姓名身份证
					if(this.dibaoForm.ab_ex3 == this.familyData1[i].abm_ex3){
						nameSame++;
						if(this.dibaoForm.ab_ex7 == this.familyData1[i].abm_ex2 ){
							IDCardSame++;
						}
					}
				}
				console.log('申请人姓名数量',nameSame);
				console.log('申请人身份证数量',IDCardSame);
				if(this.familyData1.length>0){

					if(nameSame == IDCardSame ){
						if(nameSame == 1 ){
							console.log("申请人是共同家庭成员");
						}else if(nameSame > 1 ){
							// alert()
							this.$message.warning('共同生活家庭成员姓名重复！');
							this.isSaves=false;
							isSave=false;
							return false
						}
						// else if(nameSame < 1) {
						// 	// alert('申请人缺少！')
						// 	console.log('1共同生活家庭成员缺少申请人姓名！');
						// 	this.$message.warning('共同生活家庭成员缺少申请人姓名！');
						// 	this.isSaves=false;
						// 	isSave=false;
						// 	return false
						// }
					}else{
						if(nameSame == 1 ){
							this.$message.warning('共同生活家庭成员户主身份证号和姓名与申请人的不一致！');
							this.isSaves=false;
							isSave=false;
							return false
						}
						else if(nameSame < 1){
							console.log('2共同生活家庭成员缺少申请人姓名！');
							this.$message.warning('共同生活家庭成员缺少申请人姓名！');
							this.isSaves=false;
							isSave=false;
							return false
						}
						else if(nameSame > 1 ){
							// alert()
							this.$message.warning('共同生活家庭成员姓名重复！');
							this.isSaves=false;
							isSave=false;
							return false
						}
						
					}
				}
				
				
				// 非共同生活赡抚养人个别验证，不然保存不了
				for(let i in this.familyData2){
					this.familyData2[i].abm_ex6 = "N"
                    let abm_ex1=this.familyData2[i].abm_ex1;
					let abm_ex2=this.familyData2[i].abm_ex2;
					let abm_ex3=this.familyData2[i].abm_ex3;
                    let abm_ex11=this.familyData2[i].abm_ex11;
                    let abm_ex15=this.familyData2[i].abm_ex15;
                    let abm_ex17=this.familyData2[i].abm_ex17;
                    let abm_ex18=this.familyData2[i].abm_ex18;
                    let abm_ex20=this.familyData2[i].abm_ex20;
                    let abm_ex49=this.familyData2[i].abm_ex49;
					let index=Number(i)+1;
					if(!abm_ex3 && !abm_ex1 && !abm_ex2 ){
                        console.log('都没填跳过');
						if(abm_ex11 || abm_ex15 || abm_ex17 ||abm_ex18 || abm_ex20 || abm_ex49){
							this.$message.warning("第"+(index)+"行非共同生活赡扶抚养人：姓名，赡(抚、扶)养关系，身份证号码请至少填写一项");
							this.isSaves=false;
							isSave=false;
							break;
						}
                    }else{
						console.log(abm_ex1);
						if(abm_ex2){
                            let msg=this.isCardID(abm_ex2);
                            console.log(abm_ex2)
                            if(msg){
                                this.$message.warning("第"+(index)+"行非共同生活赡扶抚养人"+msg);
								this.isSaves=false;
                                isSave=false;
                                break;
                            }else{
                                // this.familyData2[i].abm_ex4=this.getBirthdayFromIdCard(abm_ex2);//abm_ex4已被取消
                                this.familyData2[i].abm_ex5=this.getSex(abm_ex2);
                                this.familyData2[i].age=this.getAge(abm_ex2);
                                this.familyData2[i].abm_ex29=this.getAge(abm_ex2);
                            }
                        }
                    }
				}

				// 非共同生活赡抚养人家庭成员没填全保存不了
				for(let i in this.familyData3){
					this.familyData3[i].abm_ex6 = "B"
					let abm_ex3=this.familyData3[i].abm_ex3;
					let abm_ex1=this.familyData3[i].abm_ex1;
					let abm_ex2=this.familyData3[i].abm_ex2;
					let index=Number(i)+1;
					if(!abm_ex3 && !abm_ex1 && !abm_ex2){
						console.log('都没填跳过'); 
					}
					else{
						if(abm_ex2){
							console.log(abm_ex1);
							let msg=this.isCardID(abm_ex2);
							// console.log(abm_ex2)
							if(msg){
								this.$message.warning("第"+(index)+"行非共同生活赡抚养人家庭成员"+msg);
								this.isSaves=false;
								isSave=false;
								return false;
							}else{
								this.familyData3[i].abm_ex4=this.getBirthdayFromIdCard(abm_ex2);//abm_ex4已被取消
								this.familyData3[i].abm_ex5=this.getSex(abm_ex2);
								this.familyData3[i].age=this.getAge(abm_ex2);
								this.familyData3[i].abm_ex29=this.getAge(abm_ex2);
							}
						}
					}
				}

				this.familyData=this.familyData1.concat(this.familyData2).concat(this.familyData3)
				console.log(this.familyData,'家庭成员');
				for(let i = 0;i < this.familyData.length-1;i++){
					// console.log(this.familyData[i].abm_ex3);

					for(let j=i+1;j<this.familyData.length;j++){
						// console.log(this.familyData[i].abm_ex3 ,this.familyData[j].abm_ex3);
						var whereFamilyLeft='';
						var whereFamilyRight='';
						if(this.familyData[i].abm_ex6=="Y"){
							whereFamilyLeft="共同生活家庭成员"
						}else if(this.familyData[i].abm_ex6=="N"){
							whereFamilyLeft="非共同生活赡抚养人"
						}else if(this.familyData[i].abm_ex6=="B"){
							whereFamilyLeft="非共同生活赡抚养人家庭成员"
						}
						
						if(this.familyData[j].abm_ex6=="Y"){
							whereFamilyRight="共同生活家庭成员"
						}else if(this.familyData[j].abm_ex6=="N"){
							whereFamilyRight="非共同生活赡抚养人"
						}else if(this.familyData[j].abm_ex6=="B"){
							whereFamilyRight="非共同生活赡抚养人家庭成员"
						}

						if( this.familyData[i].abm_ex2 == this.familyData[j].abm_ex2 && this.familyData[i].abm_ex2!=''){
							// console.log(this.familyData[i].abm_ex3 +'与'+ this.familyData[j].abm_ex3+'的身份证号重复啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦，请修改');
							this.$message.warning(whereFamilyLeft +'"'+ this.familyData[i].abm_ex3 +'"，与' + whereFamilyRight +'"'+ this.familyData[j].abm_ex3+'"的身份证号重复，请重新确认填报信息！');
								this.isSaves=false;
								isSave=false;
								return false;

						}
						if(whereFamilyLeft == whereFamilyRight && whereFamilyLeft == '共同生活家庭成员'){

							if(this.familyData[i].abm_ex3 == this.familyData[j].abm_ex3 && this.familyData[i].abm_ex3!=''){
								// console.log(this.familyData[i].abm_ex3 +'与'+ this.familyData[j].abm_ex3+'的姓名重复啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦，请修改');
								this.$message.warning( '第'+i+'行'+whereFamilyLeft +'，与第'+j+'行'+ whereFamilyRight +'的姓名重复！');
									this.isSaves=false;
									isSave=false;
									return false;
	
							}
						}
					}

				}

				// 村干部近亲属数据验证
				for(let i in this.familyData4){
					this.familyData4[i].abm_ex6 = "C"
					let abm_ex3=this.familyData4[i].abm_ex3;
					let abm_ex1=this.familyData4[i].abm_ex1;
					let abm_ex15=this.familyData4[i].abm_ex15;
					if(!abm_ex3 && !abm_ex1 && !abm_ex15){
						console.log('都没填跳过'); 
					}else if(!abm_ex3 || !abm_ex1 || !abm_ex15){
						console.log("村干部近亲属数据不全");
					}
				}
					
				// 收入数据保存过滤 : 遍历收入，如果计入收入名称、金额为空，则去除该行数据
				if(this.income1.length>0){
					for(let i in this.income1){
						let abi_ex1=this.income1[i].abi_ex1;
						let abi_ex2=this.income1[i].abi_ex2;
						if(!abi_ex1 && !abi_ex2 ){
							this.income1.splice(i,1);
							--i;
						}

						// 格式验证
						for(let j in this.income1[i]){
							if(this.changeAmt(i,this.income1[i],"ico1."+j)==false){
								isSave=false;
								this.isSaves=false
								return false;
							}
						}
					}
				}

				if(this.income2.length>0){
					console.log("收入验证0---------------");
					for(let i in this.income2.length){
						let abi_ex1=this.income2[i].abi_ex1;
						let abi_ex2=this.income2[i].abi_ex2;
						if( !abi_ex1 &&!abi_ex2 ){
							this.income2.splice(i,1);
							--i;
						}
						console.log("收入验证1");
						// 格式验证
						for(let j in this.income2[i]){
							if(this.changeAmt(i,this.income2[i],"ico2."+j)==false){
								isSave=false;
								this.isSaves=false
								return false;
							}
						}
					}
				}
				
				if(this.income3.length>0){
					for(let i=0; this.income3.length>i;i++){
						let abi_ex1=this.income3[i].abi_ex1;
						let abi_ex2=this.income3[i].abi_ex2;
						if(!abi_ex1 && !abi_ex2 ){
							this.income3.splice(i,1)
							--i;
						}

						// 格式验证
						for(let j in this.income3[i]){
							if(this.changeAmt(i,this.income3[i],"ico3."+j)==false){
								isSave=false;
								this.isSaves=false
								return false;
							}
						}
					}

				}
				if(this.income4.length>0){
					for(let i=0; this.income4.length>i;i++){
						let abi_ex1=this.income4[i].abi_ex1;
						let abi_ex2=this.income4[i].abi_ex2;
						if(!abi_ex1 && !abi_ex2 ){
							this.income4.splice(i,1)
							--i;
						}
					
						// 格式验证
						for(let j in this.income4[i]){
							if(this.changeAmt(i,this.income4[i],"ico4."+j)==false){
								isSave=false;
								this.isSaves=false
								return false;
							}
						}
					}

				}

				if(this.income5.length>0){
					for(let i=0; this.income5.length>i;i++){
						let abi_ex1=this.income5[i].abi_ex1;
						let abi_ex2=this.income5[i].abi_ex2;
						if( !abi_ex1 &&!abi_ex2 ){
							this.income5.splice(i,1);
							--i;
						}
					
						// 格式验证
						for(let j in this.income5[i]){
							if(this.changeAmt(i,this.income5[i],"ico5."+j)==false){
								isSave=false;
								this.isSaves=false
								return false;
							}
						}
					}

				}
				if(this.income6.length>0){
					for(let i=0; this.income6.length>i;i++){
						let abi_ex1=this.income6[i].abi_ex1;
						let abi_ex2=this.income6[i].abi_ex2;
						if(!abi_ex1 && !abi_ex2 ){
							this.income6.splice(i,1);
							--i;
						}
					
						// 格式验证
						for(let j in this.income6[i]){
							if(this.changeAmt(i,this.income6[i],"ico6."+j)==false){
								isSave=false;
								this.isSaves=false
								return false;
							}
						}
					}

					
				}
				//单独存放总收入--保存时发送给后台
				var income7=[];
				income7.push(this.income7[0]);

				// console.log("支出格式校验0");
				// 支出格式校验
				for(let i in this.pay ){
					console.log("支出格式校验1");
					if(this.changeAmt3(this.pay[i],"pay."+i)==false){
						// console.log("支出格式校验2");
						isSave=false;
						this.isSaves=false
						return false;
					}
				}
				
				// 月人均收支计算
				let num=0;
				for (let i in this.familyData1){
					if(this.familyData1[i].abm_ex3==''){//先判断数据是否符合要求(这里我用申请人姓名是否为空作为判断依据)
						num++
					}
					if(this.familyData1.length-num<2){ //若符合要求的共同生活成员人数小于2 则默认被除数为1 
						this.pay.abp_ex10 = Number(this.pay.abp_ex9/1).toFixed(2);
						this.income7[2].abi_ex2 = Number(this.income7[1].abi_ex2/1).toFixed(2);
					}else{
						// 若共同生活成员人数">="2  则被除数数为符合要求的人数
						this.pay.abp_ex10 = Number(this.pay.abp_ex9 / (this.familyData1.length-num)).toFixed(2);
						this.income7[2].abi_ex2 = Number(this.income7[1].abi_ex2/ (this.familyData1.length-num)).toFixed(2);
					}
				}

				// 申请节点验证取消

				// 房屋没填全保存不了--面积验证
				// for(let i in this.estate2){
				// 	   for(let j in this.estate2[i]){
				// 			if(this.keyVerification2(i,this.estate2[i],"e2."+j)==false){
				// 				isSave=false;
				// 				this.isSaves=false
				// 				return false;
				// 			}
				// 		}
				// }

				//代理人信息检验
				// if(this.agentInfo.aba_ex1 || this.agentInfo.aba_ex3 || this.agentInfo.aba_ex4 || this.agentInfo.aba_ex5){
				// 	if(!this.agentInfo.aba_ex1){
				// 		this.$message.warning("请填写代理人姓名");
				// 		isSave=false;
				// 		this.isSaves=false;
				// 		return false;
				// 	}
				// 	if(!this.agentInfo.aba_ex3){
				// 		this.$message.warning("请填写代理人身份证号");
				// 		isSave=false;
				// 		this.isSaves=false;
				// 		return false;
				// 	}
				// 	if(this.agentInfo.aba_ex3){
				// 		var msg=this.isCardID(this.agentInfo.aba_ex3)
				// 		if(msg){
				// 			console.log(msg);
				// 			this.$message.warning("代理人"+msg);
				// 			isSave=false;
				// 			this.isSaves=false;
				// 			return false;
				// 		}
				// 	}
				// 	if(!this.agentInfo.aba_ex4){
				// 		this.$message.warning("请拍照并上传代理人身份证正反面");
				// 		isSave=false;
				// 		this.isSaves=false;
				// 		return false;
				// 	}
				// 	if(this.uploadImg.aba_ex4_img.length<2){
				// 		this.$message.warning("代理人身份证照片至少上传两张");
				// 		isSave=false;
				// 		this.isSaves=false;
				// 		return false;
				// 	}
				// 	if(!this.agentInfo.aba_ex5){
				// 		this.$message.warning("请拍照并上传委托书");
				// 		isSave=false;
				// 		this.isSaves=false;
				// 		return false;
				// 	}
				// 	if(this.uploadImg.aba_ex5_img.length<1){
				// 		this.$message.warning("代理人委托书照片至少上传一张");
				// 		isSave=false;
				// 		this.isSaves=false;
				// 		return false;
				// 	}
				// }
			

				// 支出过滤
				var pay_=this.pay
				this.pay={
					abp_ex4:'',
					abp_ex5:'',
					abp_ex6:'',
					abp_ex7:'',
					abp_ex8:'',
					abp_ex9:'',
					abp_ex10:'',
					abp_ex11:''
				}
				for(let key in pay_ ){
					if(pay_[key]){
						this.pay[key]=pay_[key]
					}
				}

				
				// 代理人信息过滤
				if(!this.agentInfo.aba_ex1 && !this.agentInfo.aba_ex3 && !this.agentInfo.aba_ex4 && !this.agentInfo.aba_ex5){
					this.agentInfo={
						"aba_ex1": "",
						"aba_ex2": "",
						"aba_ex3": "",
						"aba_ex4": "",
						"aba_ex5": "",
					}
				}


				if(!isSave){
					this.isSaves=false;
					return false;
				}
				this.leaveSave=isSave;

				// 新增检测
				if(this.isNewData){
					// this.dibaoForm.ab_ex13 = '申请'
					var typeStr = sessionStorage.getItem("activeName").split('/');
					typeStr[1] = typeStr[1] == '预警申请' ? '预警推送' : typeStr[1];
					this.dibaoForm.ab_ex13 = typeStr[1]
					this.dibaoForm.ab_ex157 = '电脑端新增';
					console.log('新增检测 =>',typeStr[1]);
				}


				// this.dibaoForm.ab_ex4=this.householdRegistrationAddress.join(',')+';' + this.houseNum;
				const loading = this.$loading({
					lock: true,
					text: 'Loading',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				});
				
				// 设置定时器，30秒请求失败刷新页面
				let time = setTimeout(()=>{
								loading.close()
								this.$emit("closes", false)
								this.$message.error("网络异常");
								this.$router.go(-1)
							},30000)

				// 将数据传给后端
				this.saveBasic({
					"data": '[' + JSON.stringify(this.dibaoForm) + ']',
					"member": JSON.stringify(this.familyData1.concat(this.familyData2).concat(this.familyData3).concat(this.familyData4)),
					"pay": '[' + JSON.stringify(this.pay) + ']',
					"income":  JSON.stringify(this.income1.concat(this.income2).concat(this.income3).concat(this.income4).concat(this.income5).concat(this.income6).concat(income7)),
					"waring": JSON.stringify(warningData_),
					"estate": JSON.stringify(this.estate1.concat(this.estate2)),
					"agents": JSON.stringify(this.agentInfo),
					"lands": JSON.stringify(this.landInfo),
					// 'add':''
				}).then((res) => {

					if (res[0].status=="+Ok") {
						loading.close()
						this.$message.success(res[0].msg)
						this.closeView();
					} else {
						
						this.isSaves=false;
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
						console.log("保存成功");
					} else {
						
						this.isSaves=false;
						loading.close()
						this.$message.error(res.response.data[0].msg)
					}
				})
			},
			//请求基础信息、上传资料的数据
			getBasic(data) {
				return request({
					url: "/social/assistance/getBasic",
					method: 'post',
					data: data
				})
			},
			//获取预警的数据
			loadWarning(data) {
				return request({
					method: 'post',
					url: '/social/assistance/getBasicWaring4',
					data: data
				})
			},
			//请求家庭成员的数据
			loadFamily(data) {
				return request({
					method: 'post',
					url: '/social/assistance/getBasicFamily',
					data: data
				})
			},
			//请求收入的数据
			getBasicIncome(data) {
				return request({
					url: "/social/assistance/getBasicIncome",
					method: 'post',
					data: data
				})
			},
			//请求收入的数据
			loadPay(data){
				return request({
						method: 'post',
						url: '/social/assistance/getBasicPay',
						data: data,
					})
			},
			//请求房屋、车船的数据
			loadEstate(data) {
				return request({
					method: 'post',
					url: '/social/assistance/getBasicEstate',
					data: data
				})
			},
			//请求代理人
			loadAgent(data){
				return request({
					method: 'post',
					url: '/social/assistance/getBasicAgent',
					data: data
				});
			},
			// 请求山林土地
			loadLand(data){
				return request({
					method: 'post',
					url: '/social/assistance/getBasicLand',
					data: data
				});
			},
			saveBasic(data) {
				return request({
					method: 'post',
					url: '/social/assistance/saveBasic',
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
			getAge(identityCard) {
				var len = (identityCard + "").length;
				if (len == 0) {
					return 0;
				} else {
					if ((len != 15) && (len != 18))//身份证号码只能为15位或18位其它不合法
					{
						return 0;
					}
				}
				var strBirthday = "";
				if (len == 18)//处理18位的身份证号码从号码中得到生日和性别代码
				{
					strBirthday = identityCard.substr(6, 4) + "/" + identityCard.substr(10, 2) + "/" + identityCard.substr(12, 2);
				}
				if (len == 15) {
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
				// console.log(age)
				return age;
			},
			isCardID(sId){
				var aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};
				var iSum=0 ;
				var info="" ;
				if(!/^\d{17}(\d|x)$/i.test(sId)) return "身份证长度或格式错误";
				sId=sId.replace(/x$/i,"a");
				if(aCity[parseInt(sId.substr(0,2))]==null) return "身份证地区非法";
				let sBirthday=sId.substr(6,4)+"-"+Number(sId.substr(10,2))+"-"+Number(sId.substr(12,2));
				var d=new Date(sBirthday.replace(/-/g,"/")) ;
				if(sBirthday!=(d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate()))return "身份证上的出生日期非法";
				for(var i = 17;i>=0;i --) iSum += (Math.pow(2,i) % 11) * parseInt(sId.charAt(17 - i),11) ;
				if(iSum%11!=1) return "身份证号非法";
				// console.log( sBirthday,"=====",d)
				//aCity[parseInt(sId.substr(0,2))]+","+sBirthday+","+(sId.substr(16,1)%2?"男":"女");//此次还可以判断出输入的身份证号的人性别
				return "";
			},

			//用来给save时的基本信息验证，勿删
			// validate(){
			// 	try{
			// 			let msg="";
			// 			for(let key in this.rules){
			// 				try{
			// 					let r_=this.rules[key];
			// 					let val=this.dibaoForm[key];
			// 					if(val==""){
			// 						msg=r_[0].message;
			// 						break;
			// 					}else{
			// 					}
			// 				}catch(e){
								
			// 				}
			// 			}
			// 			return msg;
			// 	}catch(e){
			// 		return "";
			// 	}
			
			// },

			changeCard(index,row){
				this.familyData1[index].abm_ex5=this.getSex(this.familyData1[index].abm_ex2);
				this.familyData1[index].age=this.getAge(this.familyData1[index].abm_ex2);
				if(this.familyData1[index].age<18 || this.familyData1[index].age>=60){
					this.$set(this.familyData1[index],"work","否");
				}else{
					this.$set(this.familyData1[index],"work","是");
				}
			},

			changeCard2(index,row){
				let sex = this.getSex(this.familyData2[index].abm_ex2)
				this.$set(this.familyData2[index],"abm_ex5",sex);
			},
			// changeCard3(index,row){
				// let sex = this.getSex(this.familyData3[index].abm_ex2)
				// this.$set(this.familyData3[index],"abm_ex5",sex);
			// }
		}
	}
</script>

<style scoped>
	.g-box {
		height: 80VH !important;
		/* text-align: center; */
	}
	.g-box2{
		width:100%;
		height:100%;
		overflow: auto !important;
		display: flex;
		display: -webkit-flex;
		flex-direction: row;
	}

	.info2 {
		flex: 1;
		padding-right: 10px;
		box-sizing: border-box;
		border-right: 1px solid #ddd;
		overflow: auto
	}

	.my-divider {
		margin: 15px auto 10px;
	}

	.my-table {
		width: 100%;
		margin-bottom: 5px;
		/* margin:15px 0 5px; */
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

	.ainfo2 {

		width: 240px;
		font-size: 14px;
		line-height: 20px;
		text-align: left;
		padding-left: 10px;
		box-sizing: border-box;
	}
	.line_blue {
		border-left: 2px solid #3385FF;
		margin-top: 25px;
	}

	.lineSt {
		background-color: #dcdfe6;
		height: 1px;
		width: 100%;
		margin-bottom: 10px;
	}

	.ainfoFont{
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
	
	.my-table>>>.el-input__inner {
		border: 0;
	}
	.srname>>>.el-input__inner{
		text-align:center;
	}
	/* .el-message-box__header>>>.el-message-box__title{
		color:red;
		font-size: 16px !important; 
	} */
	
	/* table表下边框 */
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
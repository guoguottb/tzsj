<template>
	<div class="g-box">
		<div class='g-box2'>
			<div class="info2">
			<el-form :model="dibaoForm" :rules="rules" ref="dibaoForm" label-width="auto" style='padding-right: 10px;'>
				<h3 class="line_blue" id="page1">&emsp;基本信息</h3>
				<div class="lineSt"></div>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="户主姓名" prop="ab_ex3">
							<el-input v-model="dibaoForm.ab_ex3" placeholder="请输入户主姓名"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="户主身份证" prop="ab_ex7">
							<el-input v-model="dibaoForm.ab_ex7" placeholder="请输入户主身份证"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="联系电话" prop="ab_ex28">
							<el-input v-model="dibaoForm.ab_ex28" placeholder="请输入联系电话"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="申请时间" prop="ab_dat14">
							<el-date-picker type="date" value-format="yyyy-MM-dd" v-model="dibaoForm.ab_dat14" style="width: 100%;">
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<!-- <el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="所在镇" prop="ab_ex2">
							<el-input v-model="dibaoForm.ab_ex2"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="所在村居" prop="ab_ex1">
							<el-input v-model="dibaoForm.ab_ex1"></el-input>
						</el-form-item>
					</el-col>
				</el-row> -->
				<el-row>
					<el-col>
						<el-form-item label="行政区域">
							<el-cascader :props="props" v-model="xzqhArray" placeholder="请选择" style="width:100%;" v-if="isFinish"></el-cascader>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="家庭住址" prop="ab_ex11">
							<el-input v-model="dibaoForm.ab_ex11" placeholder="请输入家庭住址"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="户籍地址" prop="ab_ex4">
							<el-input v-model="dibaoForm.ab_ex4" placeholder="请输入户籍地址"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="家庭人口" prop="ab_ex5">
							<el-input v-model="dibaoForm.ab_ex5" placeholder="请输入家庭人口"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="户籍性质" prop="ab_ex6">
							<el-select v-model="dibaoForm.ab_ex6">
								<el-option label="非农业户口" value="非农业户口"></el-option>
								<el-option label="农业户口" value="农业户口"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="申请供养方式" prop="ab_ex71">
							<el-select v-model="dibaoForm.ab_ex71">
								<el-option label="分散" value="分散"></el-option>
								<el-option label="集中" value="集中"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					
				</el-row>
				<el-row :gutter="20">
					<el-col :span="24">
						<el-form-item label="求助原因" prop="ab_ex46">
							<el-input type="textarea" v-model="dibaoForm.ab_ex46"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="医保卡号" prop="ab_ex153">
							<el-input v-model="dibaoForm.ab_ex153" placeholder="请输入医保卡号"></el-input>
						</el-form-item>
					</el-col>

				</el-row>


				<h3 class="line_blue" id="page2">&emsp;其他信息</h3>
				<div class="lineSt"></div>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="开户银行" prop="ab_ex42">
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
					<el-col :span="12">
						<el-form-item label="银行账号" prop="ab_ex43">
							<el-input v-model="dibaoForm.ab_ex43" placeholder="请输入银行账号"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="银行总存款" prop="ab_ex36">
							<el-input v-model="dibaoForm.ab_ex36" placeholder="请输入银行总存款"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="有价证券" prop="ab_ex60">
							<el-input v-model="dibaoForm.ab_ex60" placeholder="请输入有价证券"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="债权" prop="ab_ex61">
							<el-input v-model="dibaoForm.ab_ex61" placeholder="请输入债权"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="其他金融产品" prop="ab_ex37">
							<el-input v-model="dibaoForm.ab_ex37" placeholder="请输入其他金融产品"></el-input>
						</el-form-item>
					</el-col>
				</el-row>

				<h3 class="line_blue" id="page8">&emsp;变更信息</h3>
				<div class="lineSt"></div>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label='变更理由'>
							<el-select v-model='changeM.ac_ex10' placeholder='请选择'>
								<el-option label='人口增加' value='人口增加'></el-option>
								<el-option label='人口减少' value='人口减少'></el-option>
								<el-option label='收入变化' value='收入变化'></el-option>
								<el-option label='保障标准调整' value='保障标准调整'></el-option>
								<el-option label='其他' value='其他'></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="24">
						<el-form-item label='说明情况'>
							<el-input :disabled="changeM.ac_ex10!='其他'" v-model='changeM.ac_ex10_2'
								placeholder='请输入说明情况'></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label='变更时间'>
							<el-date-picker type="date" v-model="changeM.ac_dat1" style="width: 100%;">
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
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
					<el-table-column prop="abm_ex1" label="与户主关系" min-width="125">
						<template slot-scope="scope">
							<el-select v-model="familyData1[scope.row.xh-1].abm_ex1">
								<el-option label="户主本人" value="户主本人"></el-option>
								<el-option label="父母" value="父母"></el-option>
								<el-option label="配偶" value="配偶"></el-option>
								<el-option label="子女" value="子女"></el-option>
								<el-option label="兄弟姐妹" value="兄弟姐妹"></el-option>
								<el-option label="孙子女" value="孙子女"></el-option>
								<el-option label="其他" value="其他"></el-option>
							</el-select>
						</template>
					</el-table-column>
					<el-table-column prop="abm_ex3" label="姓名" min-width="110">
						<template slot-scope="scope">
							<el-input v-model="familyData1[scope.row.xh-1].abm_ex3"></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="abm_ex2" label="身份证号码" min-width="190">
						<template slot-scope="scope">
							<el-input v-model="familyData1[scope.row.xh-1].abm_ex2"  @change="changeCard(scope.$index,scope.row)"></el-input>
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
					<el-table-column prop="abm_ex16" label="民族" min-width="190">
						<template slot-scope="scope">
							<el-select v-model="familyData1[scope.row.xh-1].abm_ex16">
								<el-option v-for="(item,index) in nation" :key="index" :label="item" :value="item">
								</el-option>
							</el-select>
						</template>
					</el-table-column>
					<el-table-column prop="abm_ex7" label="户口性质" min-width="130">
						<template slot-scope="scope">
							<el-select v-model="familyData1[scope.row.xh-1].abm_ex7">
								<el-option label="非农业户口" value="非农业户口"></el-option>
								<el-option label="农业户口" value="农业户口"></el-option>
							</el-select>
						</template>
					</el-table-column>
					<el-table-column prop="abm_ex48" label="年龄段" min-width="120">
						<template slot-scope="scope">
							<el-select v-model="familyData1[scope.row.xh-1].abm_ex48">
								<el-option label="老年人" value="老年人"></el-option>
								<el-option label="未成年人" value="未成年人"></el-option>
								<el-option label="成年人" value="成年人"></el-option>
							</el-select>
						</template>
					</el-table-column>
					<el-table-column prop="abm_ex28" label="婚姻状况" min-width="110">
						<template slot-scope="scope">
							<el-select v-model="familyData1[scope.row.xh-1].abm_ex28">
								<el-option label="未婚" value="未婚"></el-option>
								<el-option label="已婚" value="已婚"></el-option>
								<el-option label="离异" value="离异"></el-option>
								<el-option label="丧偶" value="丧偶"></el-option>
							</el-select>
						</template>
					</el-table-column>
					<el-table-column prop="abm_ex11" label="健康状况" min-width="130">
						<template slot-scope="scope">
							<el-select v-model="familyData1[scope.row.xh-1].abm_ex11">
								<el-option label="健康或良好" value="健康或良好"></el-option>
								<el-option label="一般或较弱" value="一般或较弱"></el-option>
								<el-option label="重病" value="重病"></el-option>
							</el-select>
						</template>
					</el-table-column>
					<el-table-column prop="abm_ex47" label="残疾状况" min-width="110">
						<template slot-scope="scope">
							<el-select v-model="familyData1[scope.row.xh-1].abm_ex47">
								<el-option label="非残疾" value="非残疾"></el-option>
								<el-option label="轻残" value="轻残"></el-option>
								<el-option label="重残" value="重残"></el-option>
							</el-select>
						</template>
					</el-table-column>
					<el-table-column prop="abm_ex30" label="自理能力" min-width="110">
						<template slot-scope="scope">
							<el-select v-model="familyData1[scope.row.xh-1].abm_ex30">
								<el-option label="自理" value="自理"></el-option>
								<el-option label="失能" value="失能"></el-option>
								<el-option label="半失能" value="半失能"></el-option>
							</el-select>
						</template>
					</el-table-column>
					<el-table-column prop="abm_ex49" label="劳动能力" min-width="220">
						<template slot-scope="scope">
							<el-select v-model="familyData1[scope.row.xh-1].abm_ex49">
								<el-option label="60岁以上，无劳动能力" value="60岁以上，无劳动能力"></el-option>
								<el-option label="18岁以下，无劳动能力" value="18岁以下，无劳动能力"></el-option>
								<el-option label="智力精神一二级，无劳动能力" value="智力精神一二级，无劳动能力"></el-option>
								<el-option label="肢体一级，无劳动能力" value="肢体一级，无劳动能力"></el-option>
							</el-select>
						</template>
					</el-table-column>
					<el-table-column prop="abm_ex50" label="生活来源" min-width="180">
						<template slot-scope="scope">
							<el-select v-model="familyData1[scope.row.xh-1].abm_ex50">
								<el-option label="无生活来源" value="无生活来源"></el-option>
								<el-option label="收入低于低保标准" value="收入低于低保标准"></el-option>
							</el-select>
						</template>
					</el-table-column>
					<el-table-column prop="abm_ex32" label="赡扶抚养人" min-width="200">
						<template slot-scope="scope">
							<el-select v-model="familyData1[scope.row.xh-1].abm_ex32">
								<el-option label="无赡扶抚养人" value="无赡扶抚养人"></el-option>
								<el-option label="义务人无履行义务能力" value="义务人无履行义务能力"></el-option>
							</el-select>
						</template>
					</el-table-column>
					
					<el-table-column prop="abm_ex42" label="是否保障对象" min-width="110">
						<template slot-scope="scope">
							<el-select v-model="familyData1[scope.row.xh-1].abm_ex42" @change="changeAmt">
								<el-option label="是" value="是"></el-option>
								<el-option label="否" value="否"></el-option>
							</el-select>
						</template>
					</el-table-column>
				</el-table>



				<h3 class="line_blue" id="page4">&emsp;非共同生活家庭成员情况</h3>
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
					<el-table-column prop="abm_ex1" label="与户主关系" min-width="125">
						<template slot-scope="scope">
							<el-select v-model="familyData2[scope.row.xh-1].abm_ex1">
								<el-option label="父母" value="父母"></el-option>
								<el-option label="配偶" value="配偶"></el-option>
								<el-option label="子女" value="子女"></el-option>
								<el-option label="兄弟姐妹" value="兄弟姐妹"></el-option>
								<el-option label="其他" value="其他"></el-option>
							</el-select>
						</template>
					</el-table-column>
					<el-table-column prop="abm_ex3" label="姓名" min-width="110">
						<template slot-scope="scope">
							<el-input v-model="familyData2[scope.row.xh-1].abm_ex3"></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="abm_ex2" label="身份证号码" min-width="190">
						<template slot-scope="scope">
							<el-input v-model="familyData2[scope.row.xh-1].abm_ex2"  @change="changeCard2(scope.$index,scope.row)"></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="abm_ex5" label="性别" min-width="110">
						<template slot-scope="scope">
							<el-select v-model="familyData2[scope.row.xh-1].abm_ex5">
								<el-option label="男" value="男"></el-option>
								<el-option label="女" value="女"></el-option>
							</el-select>
						</template>
					</el-table-column>
					<el-table-column prop="abm_ex11" label="健康状况" min-width="130">
						<template slot-scope="scope">
							<el-select v-model="familyData2[scope.row.xh-1].abm_ex11">
								<el-option label="健康或良好" value="健康或良好"></el-option>
								<el-option label="一般或较弱" value="一般或较弱"></el-option>
								<el-option label="重病" value="重病"></el-option>
							</el-select>
						</template>
					</el-table-column>
					<el-table-column prop="abm_ex47" label="残疾状况" min-width="110">
						<template slot-scope="scope">
							<el-select v-model="familyData2[scope.row.xh-1].abm_ex47">
								<el-option label="非残疾" value="非残疾"></el-option>
								<el-option label="轻残" value="轻残"></el-option>
								<el-option label="重残" value="重残"></el-option>
							</el-select>
						</template>
					</el-table-column>
					<el-table-column prop="abm_ex9" label="住址" min-width="200">
						<template slot-scope="scope">
							<el-input v-model="familyData2[scope.row.xh-1].abm_ex9"></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="abm_ex10" label="电话" min-width="140">
						<template slot-scope="scope">
							<el-input v-model="familyData2[scope.row.xh-1].abm_ex10"></el-input>
						</template>
					</el-table-column>
					
				</el-table>
				<h3 class="line_blue" id="page9">&emsp;监护人情况</h3>
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
					<el-table-column prop="abm_ex1" label="与户主关系" min-width="125">
						<template slot-scope="scope">
							<el-select v-model="familyData3[scope.row.xh-1].abm_ex1">
								<el-option label="父母" value="父母"></el-option>
								<el-option label="配偶" value="配偶"></el-option>
								<el-option label="子女" value="子女"></el-option>
								<el-option label="兄弟姐妹" value="兄弟姐妹"></el-option>
								<el-option label="其他" value="其他"></el-option>
							</el-select>
						</template>
					</el-table-column>
					<el-table-column prop="abm_ex3" label="姓名" min-width="110">
						<template slot-scope="scope">
							<el-input v-model="familyData3[scope.row.xh-1].abm_ex3"></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="abm_ex2" label="身份证号码" min-width="190">
						<template slot-scope="scope">
							<el-input v-model="familyData3[scope.row.xh-1].abm_ex2"  @change="changeCard3(scope.$index,scope.row)"></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="abm_ex5" label="性别" min-width="110">
						<template slot-scope="scope">
							<el-select v-model="familyData3[scope.row.xh-1].abm_ex5">
								<el-option label="男" value="男"></el-option>
								<el-option label="女" value="女"></el-option>
							</el-select>
						</template>
					</el-table-column>
					
					<el-table-column prop="abm_ex11" label="健康状况" min-width="130">
						<template slot-scope="scope">
							<el-select v-model="familyData3[scope.row.xh-1].abm_ex11">
								<el-option label="健康或良好" value="健康或良好"></el-option>
								<el-option label="一般或较弱" value="一般或较弱"></el-option>
								<el-option label="重病" value="重病"></el-option>
							</el-select>
						</template>
					</el-table-column>
					<el-table-column prop="abm_ex47" label="残疾状况" min-width="110">
						<template slot-scope="scope">
							<el-select v-model="familyData3[scope.row.xh-1].abm_ex47">
								<el-option label="非残疾" value="非残疾"></el-option>
								<el-option label="轻残" value="轻残"></el-option>
								<el-option label="重残" value="重残"></el-option>
							</el-select>
						</template>
					</el-table-column>
					<el-table-column prop="abm_ex9" label="住址" min-width="200">
						<template slot-scope="scope">
							<el-input v-model="familyData3[scope.row.xh-1].abm_ex9"></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="abm_ex10" label="联系电话" min-width="140">
						<template slot-scope="scope">
							<el-input v-model="familyData3[scope.row.xh-1].abm_ex10"></el-input>
						</template>
					</el-table-column>
					
					<!--el-table-column prop="abm_ex32" label="是否具有赡扶抚养能力" min-width="100">
						<template slot-scope="scope">
							<el-select v-model="familyData3[scope.row.xh-1].abm_ex32">
								<el-option label="是" value="是"></el-option>
								<el-option label="否" value="否"></el-option>
								
							</el-select>
						</template>
					</el-table-column-->
					
				</el-table>

				<h3 class="line_blue" id="page5">&emsp;家庭总收入情况(12个月)</h3>
				<div class="lineSt"></div>

				
				<el-row :gutter="20">
					
					<el-col :span="12">
						<el-form-item label="家庭总收入" prop="ab_ex58">
							<el-input v-model="dibaoForm.ab_ex58" placeholder="请输入家庭总收入"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="生活补贴标准" prop="ab_ex38">
							<el-input v-model="dibaoForm.ab_ex38" placeholder="请输入补贴标准"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="生活补贴" prop="ab_ex40">
							<el-input v-model="dibaoForm.ab_ex40" placeholder="生活补贴"></el-input>
						</el-form-item>
					</el-col>
					
				</el-row>
				


				<h3 class="line_blue" id="page6">&emsp;家庭财产情况</h3>
				<div class="lineSt"></div>
				<el-row class="button-group">
					<el-col :span="12">
						<el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAddDetails('estate1')">
							新增</el-button>
						<el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDelDetails('estate1')">
							删除</el-button>
					</el-col>
					<el-col :span="12">
						<el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAddDetails('estate2')">
							新增</el-button>
						<el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDelDetails('estate2')">
							删除</el-button>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12" class="my-col">
						拥有车(船)情况
					</el-col>
					<el-col :span="12" class="my-col">
						拥有房产情况
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-table :data="estate1" border :row-class-name="rowClassName"
							@selection-change="handleEstate1" empty-text='空' class="my-table">
							<el-table-column type="selection" width="40" align="center" />
							<el-table-column prop="abe_ex1" label="车(船)主" min-width="100">
								<template slot-scope="scope">
									<el-input v-model="scope.row.abe_ex1"></el-input>
								</template>
							</el-table-column>
							<el-table-column prop="abe_ex2" label="购买时间" min-width="100">
								<template slot-scope="scope">
									<el-input v-model="scope.row.abe_ex2"></el-input>
								</template>
							</el-table-column>
							<el-table-column prop="abe_ex3" label="用途" min-width="100">
								<template slot-scope="scope">
									<el-input v-model="scope.row.abe_ex3"></el-input>
								</template>
							</el-table-column>
							<el-table-column prop="abe_ex4" label="车辆价值" min-width="100">
								<template slot-scope="scope">
									<el-input v-model="scope.row.abe_ex4"></el-input>
								</template>
							</el-table-column>
						</el-table>
					</el-col>
					<el-col :span="12">
						<el-table :data="estate2" border :row-class-name="rowClassName"
							@selection-change="handleEstate2" empty-text='空' class="my-table">
							<el-table-column type="selection" width="40" align="center" />
							<el-table-column prop="abe_ex1" label="产权人/共有人" min-width="100">
								<template slot-scope="scope">
									<el-input v-model="scope.row.abe_ex1"></el-input>
								</template>
							</el-table-column>
							<el-table-column prop="abe_ex2" label="建房(购买)时间" min-width="100">
								<template slot-scope="scope">
									<el-input v-model="scope.row.abe_ex2"></el-input>
								</template>
							</el-table-column>
							<el-table-column prop="abe_ex5" label="房屋地址" min-width="100">
								<template slot-scope="scope">
									<el-input v-model="scope.row.abe_ex5"></el-input>
								</template>
							</el-table-column>
							<el-table-column prop="abe_ex6" label="面积" min-width="100">
								<template slot-scope="scope">
									<el-input v-model="scope.row.abe_ex6"></el-input>
								</template>
							</el-table-column>
						</el-table>
					</el-col>
				</el-row>


				<h3 class="line_blue" id="page7">&emsp;身份证及其他证明材料</h3>
				<div class="lineSt"></div>
				
				<el-row :gutter="20">
					<el-col :span="12" class="my-col">
						
						<el-card class="box-card">
							<div slot="header" class="clearfix">
								<span>核对授权书</span>
								<el-button style="float: right; padding: 3px 0" type="text" @click="uploads('ab_ex73')">上传</el-button>
							</div>
							<div class="block">
								<image-view :imgList="uploadImg.ab_ex73_img"></image-view>
							</div>
						</el-card>
					</el-col>
					<el-col :span="12" class="my-col">
						
						<el-card class="box-card">
							<div slot="header" class="clearfix">
								<span>身份证拍照</span>
								<el-button style="float: right; padding: 3px 0" type="text" @click="uploads('ab_ex10')">上传</el-button>
							</div>
							<div class="block">
								<image-view :imgList="uploadImg.ab_ex10_img"></image-view>
							</div>
						</el-card>
					</el-col>
				</el-row>
				<el-row :gutter="20"  style='margin-top:10px'>
					<el-col :span="12" class="my-col">
						
						<el-card class="box-card">
							<div slot="header" class="clearfix">
								<span>民主评议</span>
								<el-button style="float: right; padding: 3px 0" type="text" @click="uploads('ab_ex97')">上传</el-button>
							</div>
							<div class="block">
								<image-view :imgList="uploadImg.ab_ex97_img"></image-view>
							</div>
						</el-card>
					</el-col>
					<el-col :span="12" class="my-col">
						
						<el-card class="box-card">
							<div slot="header" class="clearfix">
								<span>其他证明材料</span>
								<el-button style="float: right; padding: 3px 0" type="text" @click="uploads('ab_ex16')">上传</el-button>
							</div>
							<div class="block">
								<image-view :imgList="uploadImg.ab_ex16_img"></image-view>
							</div>
						</el-card>
					</el-col>
				</el-row>
				<el-row :gutter="20" style='margin-top:10px'>
					<el-col :span="12" class="my-col">
						
						<el-card class="box-card">
							<div slot="header" class="clearfix">
								<span>审核审批表</span>
								<el-button style="float: right; padding: 3px 0" type="text" @click="uploads('ab_ex74')">上传</el-button>
							</div>
							<div class="block">
								<image-view :imgList="uploadImg.ab_ex74_img"></image-view>
							</div>
						</el-card>
					</el-col>
					<el-col :span="12" class="my-col">
						
						<el-card class="box-card">
							<div slot="header" class="clearfix">
								<span>公示图片</span>
								<el-button style="float: right; padding: 3px 0" type="text" @click="uploads('ab_ex98')">上传</el-button>
							</div>
							<div class="block">
								<image-view :imgList="uploadImg.ab_ex98_img"></image-view>
							</div>
						</el-card>
					</el-col>
				</el-row>
				<el-row :gutter="20" style='margin-top:10px'>
					<el-col :span="12" class="my-col">
						
						<el-card class="box-card">
							<div slot="header" class="clearfix">
								<span>供养协议书</span>
								<el-button style="float: right; padding: 3px 0" type="text" @click="uploads('ab_ex72')">上传</el-button>
							</div>
							<div class="block">
								<image-view :imgList="uploadImg.ab_ex72_img"></image-view>
							</div>
						</el-card>
					</el-col>
					<el-col :span="12" class="my-col">
						
						<el-card class="box-card">
							<div slot="header" class="clearfix">
								<span>医保卡图片</span>
								<el-button style="float: right; padding: 3px 0" type="text" @click="uploads('ab_ex154')">上传</el-button>
							</div>
							<div class="block">
								<image-view :imgList="uploadImg.ab_ex154_img"></image-view>
							</div>
						</el-card>
					</el-col>
				</el-row>
				
				
				<el-dialog :visible.sync="dialogVisible" append-to-body>
					<el-image :src="dialogImageUrl" :preview-src-list="dialogImageArray"></el-image>
				</el-dialog>
				
				<el-dialog
					title="上传"
					:visible.sync="dialogVisible3"
					width="500px"  append-to-body>
					<upload @upload="uploadEvent" ref="myUpload"></upload>
					<span slot="footer" class="dialog-footer">
						<el-button @click="dialogVisible3 = false">取 消</el-button>
						<el-button type="primary" @click="dialogVisible3 = false">确 定</el-button>
					</span>
				</el-dialog>
			</el-form>
		</div>
		<div class="ainfo2">
			<div style="margin-left:20px;text-align:center;border-bottom:1px solid #ddd;padding-bottom:10px;">
				<el-button type="primary" size="small" @click="save">保存</el-button>
				<el-button size="small" @click="closeView">返回</el-button>
			</div>

			<div style="margin-left:25%;margin-top:20px;"> 
				<ul>
					<li :class="{listStyle:isShow1}" @click="isShow(1)">
						<a class="ainfoFont" :class="{listStyleA:!isShow1}" @click="counter('#page1')">基础信息</a><br>
					</li>
					<li :class="{listStyle:isShow2}" @click="isShow(2)">
						<a class="ainfoFont" :class="{listStyleA:!isShow2}" @click="counter('#page2')">其他信息</a><br>
					</li>
					<li :class="{listStyle:isShow8}" @click="isShow(8)">
						<a class="ainfoFont" :class="{listStyleA:!isShow8}" @click="counter('#page8')">变更信息</a><br>
					</li>
					<li :class="{listStyle:isShow3}" @click="isShow(3)">
						<a class="ainfoFont" :class="{listStyleA:!isShow3}" @click="counter('#page3')">共同生活家庭成员情况</a><br>
					</li>
					<li :class="{listStyle:isShow4}" @click="isShow(4)">
						<a class="ainfoFont" :class="{listStyleA:!isShow4}" @click="counter('#page4')">非共同生活家庭成员情况</a><br>
					</li>
					<li :class="{listStyle:isShow9}" @click="isShow(9)">
						<a class="ainfoFont" :class="{listStyleA:!isShow9}" @click="counter('#page9')">监护人情况</a><br>
					</li>
					<li :class="{listStyle:isShow5}" @click="isShow(5)">
						<a class="ainfoFont" :class="{listStyleA:!isShow5}" @click="counter('#page5')">家庭总收入情况(12个月)</a><br>
					</li>
					<li :class="{listStyle:isShow6}" @click="isShow(6)">
						<a class="ainfoFont" :class="{listStyleA:!isShow6}" @click="counter('#page6')">家庭财产情况</a><br>
					</li>
					<li :class="{listStyle:isShow7}" @click="isShow(7)">
						<a class="ainfoFont" :class="{listStyleA:!isShow7}" @click="counter('#page7')">身份证及其他证明材料</a><br>
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
	export default {
		name: "addEditDibao",
		components: {
			upload,
			imageView
		},
		data() {
			return {
				dialogVisible3: false,
				uploadImg:{
					ab_ex73_img:[],
					ab_ex10_img:[],
					ab_ex97_img:[],
					ab_ex16_img:[],
					ab_ex72_img:[],
					ab_ex74_img:[],
					ab_ex98_img:[],
					ab_ex154_img:[],
				},
				dialogImageArray: [],
				test:{
					xzqhArray:[]
				},
				xzqhArray:[],
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
				familyField:{
					abm_ex1:"与户主关系",
					abm_ex3:"姓名",
					abm_ex2:"身份证号码",
					abm_ex5:"性别",
					abm_ex16:"民族",
					abm_ex7:"户口性质",
					abm_ex48:"年龄段",
					abm_ex28:"婚姻状况",
					abm_ex11:"健康状况",
					abm_ex47:"残疾状况",
					abm_ex14:"职业状况",
					abm_ex15:"工作单位",
					abm_ex17:"月收入",
					abm_ex8:"增发类型",
					abm_ex42:"是否保障对象",
					abm_ex30:"自理能力",
					abm_ex49:"劳动能力",
					abm_ex50:"生活来源",
					abm_ex32:"赡扶抚养人",
				},
				family2Field:{
					abm_ex1:"与户主关系",
					abm_ex3:"姓名",
					abm_ex2:"身份证号码",
					abm_ex5:"性别",
					abm_ex18:"月赡(扶、抚)养费",
					abm_ex28:"婚姻状况",
					abm_ex28:"婚姻状况",
					abm_ex11:"健康状况",
					abm_ex14:"职业状况",
					abm_ex15:"工作单位",
					abm_ex17:"月收入",
					abm_ex8:"增发类型",
					abm_ex42:"是否保障对象",
					abm_ex47:"残疾状况",
					abm_ex9:"住址",
					abm_ex10:"电话",
				},
				family3Field:{
					abm_ex1:"与户主关系",
					abm_ex3:"姓名",
					abm_ex2:"身份证号码",
					abm_ex5:"性别",
					abm_ex18:"月赡(扶、抚)养费",
					abm_ex28:"婚姻状况",
					abm_ex28:"婚姻状况",
					abm_ex11:"健康状况",
					abm_ex14:"职业状况",
					abm_ex15:"工作单位",
					abm_ex17:"月收入",
					abm_ex8:"增发类型",
					abm_ex42:"是否保障对象",
					abm_ex47:"残疾状况",
					abm_ex9:"住址",
					abm_ex10:"联系电话",
				},
				estate1Field:{
					abe_ex1:"车(船)主",
					abe_ex2:"购买时间",
					abe_ex3:"用途",
					abe_ex4:"车辆价值"
				},
				estate2Field:{
					abe_ex1:"产权人/共有人",
					abe_ex2:"建房(购买)时间",
					abe_ex5:"房屋地址",
					abe_ex6:"面积"
				},
				dibaoForm: {
					
				},
				rules: {
					// ab_ex7: [{
					// 		required: true,
					// 		// message: '请输入身份证号码',
					// 		trigger: 'blur'
					// 	},
					// 	{
					// 		min: 18,
					// 		max: 18,
					// 		// message: '长度在18个字符',
					// 		trigger: 'blur'
					// 	}
					// ]
				},
				uploadId:'',
				changeM: {
					ac_ex10: '',
					ac_dat1: new Date(),
					ac_ex10_2: ''
				},
				familyData1: [],
				checkedFamilyData1: [],
				familyData2: [],
				checkedFamilyData2: [],
				familyData3: [],
				checkedFamilyData3: [],
				estate1: [],
				checkedEstate1: [],
				estate2: [],
				checkedEstate2: [],
				nation: ['汉族', '壮族', '满族', '回族', '苗族', '维吾尔族', '彝族', '土家族', '蒙古族', '藏族', '布依族', '侗族', '瑶族', '朝鲜族', '白族',
					'哈尼族', '哈萨克族', '黎族', '傣族', '畲族', '傈僳族', '仡佬族',
					'拉祜族', '高山族', '东乡族', '佤族', '水族', '纳西族', '羌族', '土族', '锡伯族', '仫佬族', '柯尔克孜族', '达斡尔族', '景颇族', '撒拉族',
					'布朗族', '毛难族', '塔吉克族', '普米族', '阿昌族', '怒族',
					'鄂温克族', '京族', '基诺族', '德昂族', '乌孜别克族', '俄罗斯族', '保安族', '裕固族', '门巴族', '鄂伦春族', '独龙族', '塔塔尔族', '赫哲族',
					'珞巴族', '其他', '外国血统中国籍人士'
				],
				dialogImageUrl: '',
				dialogVisible: false,
				isShow1: false,
				isShow2: true,
				isShow3: true,
				isShow4: true,
				isShow5: true,
				isShow6: true,
				isShow7: true,
				isShow8: true,
				isShow9: true,
				dibaoFormOld: [],
				familyData1Old: [],
				familyData2Old: [],
				familyData3Old: [],
				estate1Old: [],
				estate2Old: []
				// sId: window.location.href.split('sId=').length>1 ? window.location.href.split('sId=')[1].split('&')[0] : '',
				// cId: window.location.href.split('cId=').length>1 ? window.location.href.split('cId=')[1].split('&')[0] : '',
				// type: window.location.href.split('type=').length>1 ? window.location.href.split('type=')[1].split('&')[0] : '',
			}
		},
		created() {
			this.loadData();
		},
		watch:{
			xzqhArray(newA,oldA){
				let qu = newA[0].split("#")[0]
				let cun = newA[1].split("#")[0]
				let zhen = newA[2].split("#")[0]
				// let i =qu+"#"+cun+"#"+zhen
				this.dibaoForm.ab_ex162 = newA[0]+","+newA[1]+","+newA[2]
				this.dibaoForm.ab_ex161 = qu
				this.dibaoForm.ab_ex1 = zhen
				this.dibaoForm.ab_ex2 = cun
				// console.log(i)
			}
		},
		methods: {
			counter(id) { //counter1是绑定的点击事件名称
				document.querySelector(id).scrollIntoView(true);
				// const returnEle = document.querySelector("#page8"); //productId是将要跳转区域的id
				// if (!!returnEle) {
				// 	returnEle.scrollIntoView(true); // true 是默认的
				// }
				// document.querySelector("counter1").scrollIntoView(true); //这里的counter1是将要返回地方的id
			},
			loadData() {
				this.isFinish = false
				this.getBasicsChange({
					abid: this.$route.query.abid,
					// type: "低保",
					// company: "泰州市姜堰区社会救助综合平台"
				}).then(res => {
					if(res.response.data[0].msg=="该信息正在进行变更申请，不能进行变更操作"){
						//this.$message.error(res.response.data[0].msg)
						this.$alert(res.response.data[0].msg, {
							confirmButtonText: '确定',
							callback: action => {
								this.$emit("closes", false)
								this.$router.go(-1)
							}
						});
						
					}else{
						this.dibaoFormOld=JSON.parse(JSON.stringify(res[0].data))
						
						this.dibaoForm = res[0].data[0]
						this.common=res[0].common;
						this.uploadImg.ab_ex73_img=res[0].data[0].ab_ex73.split(",");
						this.uploadImg.ab_ex10_img=res[0].data[0].ab_ex10.split(",");
						this.uploadImg.ab_ex16_img=res[0].data[0].ab_ex16.split(",");
						this.uploadImg.ab_ex97_img=res[0].data[0].ab_ex97.split(",");
						this.uploadImg.ab_ex98_img=res[0].data[0].ab_ex98.split(",");
						this.uploadImg.ab_ex74_img=res[0].data[0].ab_ex74.split(",");
						this.uploadImg.ab_ex72_img=res[0].data[0].ab_ex72.split(",");
						this.uploadImg.ab_ex154_img=res[0].data[0].ab_ex154.split(",");
						let  xzqhArray=this.dibaoForm.ab_ex162.split(",");
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
						this.$message.error('数据获取失败或请求超时')
						this.$emit("closes", false)
						this.$router.go(-1)
						return false
					}
					if(res.response.data[0].msg=="该信息正在进行变更申请，不能进行变更操作"){
						//this.$message.error(res.response.data[0].msg)
						this.$alert(res.response.data[0].msg, {
							confirmButtonText: '确定',
							callback: action => {
								this.$emit("closes", false)
								this.$router.go(-1)
							}
						});
						
					}else{
							this.dibaoForm = res.response.data[0].data[0]
							let xzqhArray = res.response.data[0].data[0].ab_ex162.split(",");
							if(xzqhArray.length==3){
								this.$set(this.xzqhArray,0,xzqhArray[0]);
								this.$set(this.xzqhArray,1,xzqhArray[1]);
								this.$set(this.xzqhArray,2,xzqhArray[2]);
								this.$set(this.test,"xzqhArray",xzqhArray);
							}else{
								this.xzqhArray=[]
							}
							this.isFinish = true
							this.dibaoFormOld=JSON.parse(JSON.stringify(res.response.data[0].data))
							
							this.uploadImg.ab_ex73_img=res.response.data[0].data[0].ab_ex73.split(",");
							this.uploadImg.ab_ex10_img=res.response.data[0].data[0].ab_ex10.split(",");
							this.uploadImg.ab_ex16_img=res.response.data[0].data[0].ab_ex16.split(",");
							this.uploadImg.ab_ex97_img=res.response.data[0].data[0].ab_ex97.split(",");
							this.uploadImg.ab_ex98_img=res.response.data[0].data[0].ab_ex98.split(",");
							this.uploadImg.ab_ex72_img=res.response.data[0].data[0].ab_ex72.split(",");
							this.uploadImg.ab_ex74_img=res.response.data[0].data[0].ab_ex74.split(",");
							this.uploadImg.ab_ex154_img=res.response.data[0].data[0].ab_ex154.split(",");
					}
					
					
				})
				// 共同生活
				this.loadFamily({
					sId: this.$route.query.sId,
					sType: 'Y',
				}).then(res => {
					console.log(res)
					this.familyData1 = res[0].data
					this.familyData1Old=JSON.parse(JSON.stringify(res[0].data))
				}).catch(res => {
					console.log(res.response.data[0].data)
					this.familyData1 = res.response.data[0].data
					this.familyData1Old=JSON.parse(JSON.stringify(res.response.data[0].data))
				})
				// 非共同生活
				this.loadFamily({
					sId: this.$route.query.sId,
					sType: 'N',
				}).then(res => {
					console.log(res)
					this.familyData2 = res[0].data
					this.familyData2Old=JSON.parse(JSON.stringify(res[0].data))
				}).catch(res => {
					console.log(res)
					this.familyData2 = res.response.data[0].data
					this.familyData2Old=JSON.parse(JSON.stringify(res.response.data[0].data))
				})
				// 监护人
				this.loadFamily({
					sId: this.$route.query.sId,
					sType: 'A',
				}).then(res => {
					console.log(res)
					this.familyData3 = res[0].data
					this.familyData3Old=JSON.parse(JSON.stringify(res[0].data))
				}).catch(res => {
					console.log(res)
					this.familyData3 = res.response.data[0].data
					this.familyData3Old=JSON.parse(JSON.stringify(res.response.data[0].data))
				})
				this.loadEstate({
					sId: this.$route.query.sId,
				}).then(res => {
					console.log(res)
					this.estate1 = res[0].data
					this.estate2 = res[0].data2
					this.estate1Old=JSON.parse(JSON.stringify(res[0].data))
					this.estate2Old=JSON.parse(JSON.stringify(res[0].data2))
				}).catch(res => {
					console.log(res)
					this.estate1 = res.response.data[0].data
					this.estate2 = res.response.data[0].data2
					this.estate1Old=JSON.parse(JSON.stringify(res.response.data[0].data))
					this.estate2Old=JSON.parse(JSON.stringify(res.response.data[0].data2))
				})
			},
			// 给tabledata添加序号便于操作
			rowClassName({
				row,
				rowIndex
			}) {
				row.xh = rowIndex + 1;
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
			// 获取Estate1被选中的
			handleEstate1(selection) {
				this.checkedEstate1 = selection;
			},
			// 获取Estate2被选中的
			handleEstate2(selection) {
				this.checkedEstate2 = selection;
			},
			// 根据str找table添加行
			handleAddDetails(str) {
				let obj = {};
				if (str == 'familyData1') {
					if (this.familyData1 == undefined) {
						this.familyData1 = new Array();
					}
					obj = {
						abm_ex1: '',
						abm_ex3: '',
						abm_ex2: '',
						abm_ex5: '',
						abm_ex16: '',
						abm_ex7: '',
						abm_ex28: '',
						abm_ex11: '',
						abm_ex14: '',
						abm_ex15: '',
						abm_ex17: '',
						abm_ex8: '',
						abm_ex42: ''
					};
					this.familyData1.push(obj);
				}
				if (str == 'familyData2') {
					if (this.familyData2 == undefined) {
						this.familyData2 = new Array();
					}
					obj = {
						abm_ex1: '',
						abm_ex3: '',
						abm_ex2: '',
						abm_ex11: '',
						abm_ex16: '',
						abm_ex17: '',
						abm_ex18: '',
						abm_ex28: ''
					};
					this.familyData2.push(obj);
				}
				if (str == 'familyData3') {
					if (this.familyData3 == undefined) {
						this.familyData3 = new Array();
					}
					obj = {
						abm_ex1: '',
						abm_ex3: '',
						abm_ex2: '',
						abm_ex11: '',
						abm_ex15: '',
						abm_ex17: ''
					};
					this.familyData3.push(obj);
				}
				if (str == 'estate1') {
					if (this.estate1 == undefined) {
						this.estate1 = new Array();
					}
					obj = {
						abe_ex1: '',
						abe_ex2: '',
						abe_ex3: '',
						abe_ex4: ''
					};
					this.estate1.push(obj);
				}
				if (str == 'estate2') {
					if (this.estate2 == undefined) {
						this.estate2 = new Array();
					}
					obj = {
						abe_ex1: '',
						abe_ex2: '',
						abe_ex5: '',
						abe_ex6: ''
					};
					this.estate2.push(obj);
				}
			},
			// 根据str找table删除选中行
			handleDelDetails(str) {
				let obj;
				let old;
				if (str == 'familyData1') {
					obj = this.checkedFamilyData1;
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
			},
			handleRemove(file, str) {
				if (str == 'ab_ex73') {
					this.$refs.ab_ex73.handleRemove(file);
				}
				if (str == 'ab_ex10') {
					this.$refs.ab_ex10.handleRemove(file);
				}
				if (str == 'ab_ex97') {
					this.$refs.ab_ex97.handleRemove(file);
				}
				if (str == 'ab_ex16') {
					this.$refs.ab_ex16.handleRemove(file);
				}
				if (str == 'ab_ex72') {
					this.$refs.ab_ex72.handleRemove(file);
				}
				if (str == 'ab_ex74') {
					this.$refs.ab_ex74.handleRemove(file);
				}
				if (str == 'ab_ex98') {
					this.$refs.ab_ex98.handleRemove(file);
				}
				if (str == 'ab_ex154') {
					this.$refs.ab_ex154.handleRemove(file);
				}
			},
			handlePictureCardPreview(file) {
				this.dialogImageArray = file
				this.dialogImageUrl = file[0];
				this.dialogVisible = true;
			},
			uploads(id){
				this.dialogVisible3=true;
				this.uploadId=id;
				try{
				this.$refs.myUpload.clears();}catch(e){}
			},
			uploadEvent(data){
				let val=this.dibaoForm[this.uploadId];
				val=val=="" ? data:val+","+data;
				this.dibaoForm[this.uploadId]=val;
				this.uploadImg[this.uploadId+"_img"]=val.split(",");
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
				}
			},
			closeView() {
				this.$emit("closes", false)
				this.$router.go(-1)
			},
			save() {
					// 没填姓名保存不了
					for(let i in this.familyData1){
						this.familyData1[i].abm_ex6 = "Y"
					}
					for(let i in this.familyData2){
						this.familyData2[i].abm_ex6 = "N"
					}
					// 没填全保存不了
					for(let i in this.estate1){
						this.estate1[i].abe_ex7= "车船"
					}
					for(let i in this.estate2){
						this.estate2[i].abe_ex7 = "房屋"
					}
					var data=[];
					data.push(this.dibaoForm);
				    var data2=this.familyData1 ;
				    var data3=this.familyData2 ;
					var data5=this.familyData3 ;
				    var data4=this.estate1 ;
					//data2 = data2.concat(data3).concat(data4)
				    //this.familyData1Old = this.familyData1Old.concat(this.familyData2Old)
				    var datas=[];
					console.log("this.dibaoFormOld=============================================");
					console.log(this.dibaoFormOld);
				    for(var key in data[0]){
				        var val=data[0][key];
				        var old=this.dibaoFormOld[0][key];
				        old=old==undefined||old=="undefined"||old==null||old=="null" ?"":old
				        val=val==undefined||val=="undefined"||val==null||val=="null" ?"":val
				        old=old.trim();
				        val=val.trim();
				        if(old!=val&&key.indexOf("abm_")==-1&&key.indexOf("abp_")==-1&&key.indexOf("_id")==-1&&key.indexOf("ac_")==-1){
				            console.log("1111");
				            console.log("key==="+key+"=="+val+"=="+old)
				            var d={};
				            var name="";
				            if(key=="ab_ex11")
				                name="家庭住址";
				            else
				                 name=this.getLabel(key);
				
				            name=key=="ab_ex10" ? "身份证照片":name;
				            name=key=="ab_ex16" ? "其他证明材料照片":name;
				            name=key=="ab_ex73" ? "核对授权书":name;
				            name=key=="ab_ex97" ? "民主评议":name;
				            name=key=="ab_ex72" ? "供养协议书":name;
							name=key=="ab_ex74" ? "审核审批表":name;
				            name=key=="ab_ex98" ? "公示图片":name;
							name=key=="ab_ex154" ? "医保卡图片":name;
				            if(key=="ab_ex10"||key=="ab_ex16"||key=="ab_ex73"||key=="ab_ex97"||key=="ab_ex74"||key=="ab_ex98"||key=="ab_ex72"||key=="ab_ex154"){
				                var olds=old.split(",");
				                var vals=val.split(",");
				                old="";
								 for(let i=0;i<olds.length;i++){
									 if(olds[i])
				                        old+="<img src='"+olds[i]+"' style='height:60px' data-original='"+olds[i]+"'/>"
								}
				               
				                val="";
				                for(let i=0;i<vals.length;i++){
				                    if(vals[i])
				                        val+="<img src='"+vals[i]+"' style='height:60px' data-original='"+vals[i]+"'/>"
				                }
				            }
				
				            if(name)
				                name=name.replace("&nbsp;","");
				            console.log("key==111="+key+"=="+val+"=="+old+"=="+name)
				            if(name){
				                d.acc_ex1=name;
				                d.acc_ex2=escape(old);
				                d.acc_ex3=escape(val);
				                d.acc_ex4=key;
				                d.acc_ex5="基础信息修改";
				                d.acc_ex6="修改";
				                datas.push(d);
				            }
				
				        }
				    }
				    var index=1;
				    console.log("1111111111111111122222222222222222222222222222222");
				    console.log(data2);
				    for(let i=0;i<data2.length;i++){
				
				        var abm_id=data2[i].abm_id;
				        console.log("abm_id====="+abm_id);
				        if(abm_id==""||abm_id=="0"||abm_id==undefined){
				
				            for(var key in data2[i]){
				                var val=unescape(data2[i][key]);
				                var text=this.familyField[key];
				                if(key.indexOf("_id")!=-1||!text||key=="amb_ex6"||val=="")
				                    continue;
				
				                var d={};
				                d.acc_ex1=text;
				                d.acc_ex2="";
				                d.acc_ex3=escape(val);
				                d.acc_ex4=key;
				                d.acc_ex5="共同生活家庭成员";
				                d.acc_ex6="新增";
				                d.acc_ex7="add"+index;
				
				                datas.push(d);
				            }
				
				
				        }else{
				            var data_={};
							for(let j=0;j<this.familyData1Old.length;j++){
								var abm_id_=this.familyData1Old[j].abm_id;
				                if(abm_id==abm_id_){
				                    data_=this.familyData1Old[j];
				                }
							} 
				           
				
				            index=1;
				            var html="";
				            for(var key in data2[i]){
				                var val=unescape(data2[i][key]);
				                var old=unescape(data_[key]);
				                var text=this.familyField[key];
				                if(key.indexOf("_id")!=-1||!text||key=="abm_ex6")
				                     continue;
				
				                if(val!=old&&text){
				
				
				                    var d={};
				                    d.acc_ex1=text;
				                    d.acc_ex2=escape(old);
				                    d.acc_ex3=escape(val);
				                    d.acc_ex4=key;
				                    d.acc_ex5="共同生活家庭成员";
				                    d.acc_ex6="修改";
				                    d.acc_ex7="edit"+index;
				                    d.acc_ex8="姓名："+data_["abm_ex3"];
				                    d.acc_ex9=abm_id;
				                    datas.push(d);
				
				                }
				            }
				
				        }
				        index++;
				    }
				    index=1;
				    for(let j=0;j<this.familyData1Old.length;j++){
				        var abm_ex2=this.familyData1Old[j].abm_ex2;
				        var isOk=false;
						for(let i=0;i<data2.length;i++){
				        
				            var abm_ex2_=data2[i].abm_ex2;
				            console.log("abm_ex2_====="+abm_ex2_);
				            if(abm_ex2==abm_ex2_){
				                isOk=true;
				            }
				        }
				        console.log(abm_ex2+"=="+isOk);
				        if(!isOk){
				            for(var key in data2[0]){
				                var text=this.familyField[key];
				                var d={};
				                d.acc_ex1=text;
				                d.acc_ex2=unescape(this.familyData1Old[j][key]);
				                d.acc_ex3="";
				                d.acc_ex4=key;
				                d.acc_ex5="共同生活家庭成员";
				                d.acc_ex6="删除";
				                d.acc_ex7="del"+index;
				                d.acc_ex8="姓名："+this.familyData1Old[j]["abm_ex3"];
				                d.acc_ex9=this.familyData1Old[j]["abm_id"];
				                datas.push(d);
				            }
				        }
				    }
				    console.log(datas);
				    index=1;
					for(let i=0;i<data3.length;i++){
				  
				
				        var abm_id=data3[i].abm_id;
				        if(abm_id==""||abm_id=="0"||abm_id==undefined){
				            for(var key in data3[i]){
				                var val=data3[i][key];
				                var text=this.family2Field[key];
				                if(key.indexOf("_id")!=-1||!text||key=="abm_ex6"||val=="")
				                    continue;
				
				
				                var d={};
				                d.acc_ex1=text;
				                d.acc_ex2="";
				                d.acc_ex3=val;
				                d.acc_ex4=key;
				                d.acc_ex5="非共同生活家庭成员";
				                d.acc_ex6="新增";
				                d.acc_ex7="add"+index;
				
				                datas.push(d);
				            }
				
				
				        }else{
				            var data_={};
							for(let j=0;j<this.familyData2Old.length;j++){
								var abm_id_=this.familyData2Old[j].abm_id;
				                if(abm_id==abm_id_){
				                    data_=this.familyData2Old[j];
				                }
							}
				           
				            index=1;
				            var html="";
				            for(var key in data3[i]){
				                if(key.indexOf("_id")!=-1||key=="amb_ex6")
				                    continue;
				                var val=data3[i][key];
				                var old=data_[key];
				                var text=this.family2Field[key];
				                if(val!=old&&text){
				
				
				                    var d={};
				                    d.acc_ex1=text;
				                    d.acc_ex2=old;
				                    d.acc_ex3=val;
				                    d.acc_ex4=key;
				                    d.acc_ex5="非共同生活家庭成员";
				                    d.acc_ex6="修改";
				                    d.acc_ex7="edit"+index;
				                    d.acc_ex8="姓名："+data_["abm_ex3"];
				                    d.acc_ex9=abm_id;
				                    datas.push(d);
				
				                }
				            }
				
				        }
				        index++;
				    }
				index=1;
			    for(let j=0;j<this.familyData2Old.length;j++){
				
				    var abm_ex2=this.familyData2Old[j].abm_ex2;
				    var isOk=false;
					for(let i=0;i<data3.length;i++){
				    
				        var abm_ex2_=data3[i].abm_ex2;
				        if(abm_ex2==abm_ex2_){
				            isOk=true;
				        }
				    }
				
				    if(!isOk){
				        for(var key in this.familyData2Old[0]){
				            var text=this.family2Field[key];
				            if(text){
				                var d={};
				                d.acc_ex1=text;
				                d.acc_ex2=unescape(this.familyData2Old[j][key]);
				                d.acc_ex3="";
				                d.acc_ex4=key;
				                d.acc_ex5="非共同生活家庭成员";
				                d.acc_ex6="删除";
				                d.acc_ex7="del"+index;
				                d.acc_ex8="姓名："+this.familyData2Old[j]["abm_ex3"];
				                d.acc_ex9=this.familyData2Old[j]["abm_id"];
				                datas.push(d);
				            }
				
				        }
				    }
				 }
				
			
				console.log(datas);
				    index=1;
					for(let i=0;i<data5.length;i++){
				  
				
				        var abm_id=data5[i].abm_id;
				        if(abm_id==""||abm_id=="0"||abm_id==undefined){
				            for(var key in data5[i]){
				                var val=data5[i][key];
				                var text=this.family3Field[key];
				                if(key.indexOf("_id")!=-1||!text||key=="abm_ex6"||val=="")
				                    continue;
				
				
				                var d={};
				                d.acc_ex1=text;
				                d.acc_ex2="";
				                d.acc_ex3=val;
				                d.acc_ex4=key;
				                d.acc_ex5="监护人信息";
				                d.acc_ex6="新增";
				                d.acc_ex7="add"+index;
				
				                datas.push(d);
				            }
				
				
				        }else{
				            var data_={};
							for(let j=0;j<this.familyData3Old.length;j++){
								var abm_id_=this.familyData3Old[j].abm_id;
				                if(abm_id==abm_id_){
				                    data_=this.familyData3Old[j];
				                }
							}
				           
				            index=1;
				            var html="";
				            for(var key in data5[i]){
				                if(key.indexOf("_id")!=-1||key=="amb_ex6")
				                    continue;
				                var val=data5[i][key];
				                var old=data_[key];
				                var text=this.family3Field[key];
				                if(val!=old&&text){
				
				
				                    var d={};
				                    d.acc_ex1=text;
				                    d.acc_ex2=old;
				                    d.acc_ex3=val;
				                    d.acc_ex4=key;
				                    d.acc_ex5="监护人信息";
				                    d.acc_ex6="修改";
				                    d.acc_ex7="edit"+index;
				                    d.acc_ex8="姓名："+data_["abm_ex3"];
				                    d.acc_ex9=abm_id;
				                    datas.push(d);
				
				                }
				            }
				
				        }
				        index++;
				    }
				index=1;
			    for(let j=0;j<this.familyData3Old.length;j++){
				
				    var abm_ex2=this.familyData3Old[j].abm_ex2;
				    var isOk=false;
					for(let i=0;i<data3.length;i++){
				    
				        var abm_ex2_=data3[i].abm_ex2;
				        if(abm_ex2==abm_ex2_){
				            isOk=true;
				        }
				    }
				
				    if(!isOk){
				        for(var key in this.familyData3Old[0]){
				            var text=this.family3Field[key];
				            if(text){
				                var d={};
				                d.acc_ex1=text;
				                d.acc_ex2=unescape(this.familyData3Old[j][key]);
				                d.acc_ex3="";
				                d.acc_ex4=key;
				                d.acc_ex5="监护人信息";
				                d.acc_ex6="删除";
				                d.acc_ex7="del"+index;
				                d.acc_ex8="姓名："+this.familyData3Old[j]["abm_ex3"];
				                d.acc_ex9=this.familyData3Old[j]["abm_id"];
				                datas.push(d);
				            }
				
				        }
				    }
				 }
				
				  
				    
				index=1;
				var estates=[];
				let estate=this.estate1;
				for(let i=0;i<this.estate1.length;i++){
				
			
					var abe_id=estate[i].abe_id;
					if(abe_id==""||abe_id=="0"||abe_id==undefined){
						for(var key in estate[i]){
							var val=estate[i][key];
							var text=this.estate1Field[key]
							if(key.indexOf("_id")!=-1||!text||val=="")
								continue;
			
			
							var d={};
							d.acc_ex1=text;
							d.acc_ex2="";
							d.acc_ex3=val;
							d.acc_ex4=key;
							d.acc_ex5="家庭财产(车船)";
							d.acc_ex6="新增";
							d.acc_ex7="add"+index;
			
							datas.push(d);
						}
			
			
					}else{
						var data_={};
						for(let j=0;j<this.estate1Old.length;j++){
							var abe_id_=this.estate1Old[j].abe_id;
							if(abe_id==abe_id_){
								data_=this.estate1Old[j];
							}
						}
						
						index=1;
						var html="";
						for(var key in estate[i]){
							if(key.indexOf("_id")!=-1)
								continue;
							var val=estate[i][key];
							var old=data_[key];
							var text=this.estate1Field[key]
							if(val!=old&&text){
			
			
								var d={};
								d.acc_ex1=text;
								d.acc_ex2=old;
								d.acc_ex3=val;
								d.acc_ex4=key;
								d.acc_ex5="家庭财产(车船)";
								d.acc_ex6="修改";
								d.acc_ex7="edit"+index;
								d.acc_ex9=abe_id;
								datas.push(d);
			
							}
						}
			
					}
					index++;
				}
				
				index=1;
				for(let j=0;j<this.estate1Old.length;j++){
				    var abe_id=this.estate1Old[j].abe_id;
				    var isOk=false;
				    for(let i=0;i<estate.length;i++){
				        var abe_id_=estate[i].abe_id;
				
				        if(abe_id==abe_id_){
				            isOk=true;
				        }
				    }
				
				    if(!isOk){
				        for(var key in estate[0]){
				            var text=this.estate1Field[key];
				            var d={};
				            d.acc_ex1=text;
				            d.acc_ex2=this.estate1Old[j][key];
				            d.acc_ex3="";
				            d.acc_ex4=key;
				            d.acc_ex5="家庭财产(车船)";
				            d.acc_ex6="删除";
				            d.acc_ex7="del"+index;
				            d.acc_ex9=abe_id;
				            datas.push(d);
				        }
				    }
				}
				estate=this.estate2;
				index=1;
				var estates=[];
				for(let i=0;i<estate.length;i++){
				
				    var abe_id=estate[i].abe_id;
				    if(abe_id==""||abe_id=="0"||abe_id==undefined){
				        for(var key in estate[i]){
				            var val=estate[i][key];
				            var text=this.estate2Field[key]
				            if(key.indexOf("_id")!=-1||!text||val=="")
				                continue;
				
				
				            var d={};
				            d.acc_ex1=text;
				            d.acc_ex2="";
				            d.acc_ex3=val;
				            d.acc_ex4=key;
				            d.acc_ex5="拥有房产情况";
				            d.acc_ex6="新增";
				            d.acc_ex7="add"+index;
				
				            datas.push(d);
				        }
				
				
				    }else{
				        var data_={};
						for(let j=0;j<this.estate2Old.length;j++){
							var abe_id_=this.estate2Old[j].abe_id;
				            if(abe_id==abe_id_){
				                data_=this.estate2Old[j];
				            }
						}
				        
				        index=1;
				        var html="";
				        for(var key in estate[i]){
				            if(key.indexOf("_id")!=-1)
				                continue;
				            var val=estate[i][key];
				            var old=data_[key];
				            var text=this.estate2Field[key];
				            if(val!=old&&text){
				
				
				                var d={};
				                d.acc_ex1=text;
				                d.acc_ex2=old;
				                d.acc_ex3=val;
				                d.acc_ex4=key;
				                d.acc_ex5="拥有房产情况";
				                d.acc_ex6="修改";
				                d.acc_ex7="edit"+index;
				                d.acc_ex9=abe_id;
				                datas.push(d);
				
				            }
				        }
				
				    }
				    index++;
				}
				index=1;
				
				if(this.dibaoForm.ab_ex7 =='' || this.dibaoForm.ab_ex7.length!=18){
					this.$message.warning('请输入正确的身份证号')
					return false
				}
				if(this.dibaoForm.ab_ex3 ==''){
					this.$message.warning('请输入姓名')
					return false
				}
				const loading = this.$loading({
					lock: true,
					text: 'Loading',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				});
				// setTimeout((loading)=>{
				// 	loading.close()
				// },2000)
				// 设置定时器，30秒请求失败刷新页面
				let time = setTimeout(()=>{
								loading.close()
								this.$emit("closes", false)
								this.$message.error("网络异常");
								this.$router.go(-1)
							},30000)
				this.saveBasicChange({
					"data" : JSON.stringify(datas),
					"sId" : this.$route.query.sId,
					ab_ex13 : '特困供养',
					ac_ex10 : this.changeM.ac_ex10!='其他' ? this.changeM.ac_ex10 : this.changeM.ac_ex10_2,
					ac_dat1 : this.changeM.ac_dat1
				}).then((res) => {
					if (res[0].status=="+Ok") {
						loading.close()
						this.$message.success(res[0].msg)
						this.$emit("closes", false)
						this.$router.go(-1)
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
						this.$emit("closes", false)
						this.$router.go(-1)
					} else {
						loading.close()
						this.$message.error(res.response.data[0].msg)
					}
				})
			},
			getLabel(id){
				let name="";
				var arr=document.getElementsByTagName("label");
				//for循环
				for(let i=0;i<arr.length;i++)
				{
					//取出参数for的值
						if(arr[i].getAttributeNode("for")){
							var forvalue=arr[i].getAttributeNode("for").value;
							//因为for的值和相应checkbox的id对应，所以判断是否相等，如果
							//相等，那么它的innerHTML的值就是label的显示的值
							if(forvalue==id)

							{

									//或者使用innerText来获取。                          

								name=arr[i].innerHTML;

							}
						}
						

				}
				return name;
			},
			loadFamily(data) {
				return request({
					// headers: {
					// 	accept: 'application/json',
					// }
					method: 'post',
					url: '/social/assistance/getBasicFamily',
					data: data
				})
			},
			loadEstate(data) {
				return request({
					// headers: {
					// 	accept: 'application/json',
					// }
					method: 'post',
					url: '/social/assistance/getBasicEstate',
					data: data
				})
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
					// headers: {
					// 	accept: 'application/json',
					// }
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
			GetAge(identityCard) {
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
				//aCity[parseInt(sId.substr(0,2))]+","+sBirthday+","+(sId.substr(16,1)%2?"男":"女");//此次还可以判断出输入的身份证号的人性别
				return "";
			},
			validate(){
				try{
						let msg="";
						for(let key in this.rules){
							try{
							
								let r_=this.rules[key];
								
								let val=this.dibaoForm[key];
								
								if(val==""){
									msg=r_[0].message;
									//document.getElementById(key).style.border="1px solid red"
									break;
								}else{
									//document.getElementById(key).style.border="1px solid #C0C4CC"
								}
							}catch(e){
								
							}
							
						}
						return msg;
				}catch(e){
					return "";
				}
				
			
			},
			changeCard(index,row){
				this.familyData1[index].abm_ex5=this.getSex(this.familyData1[index].abm_ex2);
			},
			changeCard2(index,row){
				
				this.familyData2[index].abm_ex5=this.getSex(row.abm_ex2);
				this.$set(this.familyData2[index],"abm_ex5",this.getSex(row.abm_ex2));
				
			},
			changeCard3(index,row){
				
				this.familyData3[index].abm_ex5=this.getSex(row.abm_ex2);
				this.$set(this.familyData3[index],"abm_ex5",this.getSex(row.abm_ex2));
				
			},
			changeAmt(total) {

				let index=0;
				//alert($("#member").find("tr[flag='row']").size())
				for (let i = 0; i < this.familyData1.length; i++) {
					if(this.familyData1[i].abm_ex42=="是"){
						index++;
					}
				}
				this.dibaoForm.ab_ex40=Number(this.dibaoForm.ab_ex38)*index;
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
		height: 60VH !important;
	}
.g-box2 {
		height:100%;
		width:100%;
		overflow: auto !important;
		display:flex;
		display: -webkit-flex;
		flex-direction: row;
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

/* 	.my-table .el-input__inner {
		border: 0 !important;
	} */
	.my-table>>>.el-input__inner {
	    border: 0;
	  }
</style>

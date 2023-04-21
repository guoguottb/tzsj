<!-- getBasicData table写死吗 type值是多少 idcard是多少-->
<template>
	<div class='g-box'>
		<div>
			<el-tabs v-model='activeName' type='card' @tab-click='handleClick'>
				<el-tab-pane label='市级对比信息' name='first'>
					<el-row>
						<el-col :span='2' :offset='19'>
							<el-button @click='getmes("ceshi")'>下载核对报告</el-button>
						</el-col>
						<el-col :span='2' :offset='1'>
							<el-button @click='closeView'>返回</el-button>
						</el-col>
					</el-row>
					<div id="ceshi" class="ceshi" style="overflow: auto !important;">
						<h2 style="text-align: center;">市级对比信息核对报告</h2>
						<el-row>
							<el-col :span='2' :offset='2'>核对编号:</el-col>
							<el-col :span='6'>{{info.ab_ex85}}</el-col>
						</el-row>
						<el-row style='display:flex;flex-wrap: wrap;'>
							<el-col :span='2' :offset='2'>核对时间:</el-col>
							<el-col :span='6'>
								<div>{{info.ab_dat3}}</div>
							</el-col>
							<el-col :span='3'>申请救助类型:</el-col>
							<el-col :span='6'>{{info.ab_ex13}}</el-col>
						</el-row>
						<el-row style='display:flex;flex-wrap: wrap;'>
							<el-col :span='2' :offset='2'>申请人:</el-col>
							<el-col :span='6'>{{info.ab_ex3}}</el-col>
							<el-col :span='3'>身份证号码:</el-col>
							<el-col :span='6'>{{info.ab_ex7}}</el-col>
						</el-row>
						<h4 style="padding-top: 10px;">一、家庭基本情况</h4>
						<h3 style="text-align: center;padding-top: 20px;">家庭成员基本情况</h3>
						<el-table :data='tableData' border style="width: 100%;">
							<el-table-column prop='abm_ex3' label='姓名' width="100"></el-table-column>
							<el-table-column prop='abm_ex2' label='身份证号' width="200"></el-table-column>
							<el-table-column prop='abm_ex1' label='与主申请人关系' width="180"></el-table-column>
							<el-table-column prop='ab_ex4' label='户籍所在地'></el-table-column>
						</el-table>
						<h3 style="text-align: center;padding-top: 20px;">赡抚养人基本情况</h3>
						<el-table :data='tableData2' border style="width: 100%;" >
							<el-table-column prop='abm_ex3' label='姓名' width="100"></el-table-column>
							<el-table-column prop='abm_ex2' label='身份证号' width="200"></el-table-column>
							<el-table-column prop='abm_ex1' label='与主申请人关系' width="180"></el-table-column>
							<el-table-column prop='ab_ex4' label='户籍所在地'></el-table-column>
						</el-table>
						<h3 style="text-align: center;padding-top: 20px;">诚信信息</h3>
						<el-table :data='tableData3' border style="width: 100%" >
							<el-table-column prop='as_ex1' label='姓名' width="100"></el-table-column>
							<el-table-column prop='as_ex2' label='身份证号' width="200"></el-table-column>
							<el-table-column prop='ab_ex4' label='户籍地址' width="200"></el-table-column>
							<el-table-column prop='as_ex3' label='诚信记录' width="200"></el-table-column>
							<el-table-column prop='ab_ex4' label='调查人' width="180"></el-table-column>
							<el-table-column prop='as_ex5' label='调查时间' width="180"></el-table-column>
							<el-table-column prop='as_dat1' label='登记时间'></el-table-column>
						</el-table>
						<h4 style="padding-top: 10px;">二、家庭财产信息</h4>
						<div style="text-indent: 30px;">此次经济核对了15个项目共有公积金缴存，公积金贷款，就业失业，职工基础信息，户籍信息等反馈疑似信息，具体信息反馈如下：
						</div>
						<h3 style="text-align: center;padding-top: 20px;">公积金缴存信息</h3>
						<el-table :data='gjjjc2' border style="width: 100%" >
							<el-table-column prop='aca_ex1' label='家庭成员姓名' width="100"></el-table-column>
							<el-table-column prop='aca_ex8' label='职工缴交率' width="100"></el-table-column>
							<el-table-column prop='aca_ex9' label='该职工代码存在的数据条数' width="100"></el-table-column>
							<el-table-column prop='aca_ex10' label='汇缴年月' width="100"></el-table-column>
							<el-table-column prop='aca_ex11' label='营业执照代码' width="100"></el-table-column>
							<el-table-column prop='aca_ex13' label='月缴额' width="100"></el-table-column>
							<el-table-column prop='aca_ex14' label='单位缴交率' width="100"></el-table-column>
							<el-table-column prop='aca_ex15' label='单位代码' width="100"></el-table-column>
							<el-table-column prop='aca_ex16' label='单位名称' width="100"></el-table-column>
							<el-table-column prop='aca_ex17' label='职工内码' width="100"></el-table-column>
							<el-table-column prop='aca_ex18' label='职工月缴额' width="100"></el-table-column>
							<el-table-column prop='aca_ex19' label='汇缴状态' width="100"></el-table-column>
							<el-table-column prop='aca_dat10' label='反馈时间' width="100"></el-table-column>
						</el-table>
						<h3 style="text-align: center;padding-top: 20px;">公积金贷款信息</h3>
						<el-table :data='gjjdk2' border style="width: 100%" >
							<el-table-column prop='aca_ex1' label='家庭成员姓名' width="100"></el-table-column>
							<el-table-column prop='aca_ex36' label='月还金额' width="100"></el-table-column>
							<el-table-column prop='aca_ex39' label='还款账户' width="100"></el-table-column>
							<el-table-column prop='aca_dat10' label='反馈时间'></el-table-column>
						</el-table>
						<h3 style="text-align: center;padding-top: 20px;">死亡信息</h3>
						<el-table :data='byg2' border style="width: 100%">
							<el-table-column prop='sz_ex3' label='家庭成员姓名' width="100"></el-table-column>
							<el-table-column prop='sz_ex4' label='性别' width="100"></el-table-column>
							<el-table-column prop='sz_ex5' label='年龄' width="100"></el-table-column>
							<el-table-column prop='sz_ex6' label='籍贯' width="100"></el-table-column>
							<el-table-column prop='sz_ex7' label='证件号码' width="100"></el-table-column>
							<el-table-column prop='sz_ex8' label='死亡原因' width="100"></el-table-column>
							<el-table-column prop='sz_ex16' label='死亡日期' width="100"></el-table-column>
							<el-table-column prop='sz_dat1' label='火化日期' width="100"></el-table-column>
							<el-table-column prop='sz_dat7' label='备注'></el-table-column>
						</el-table>
						<h3 style="text-align: center;padding-top: 20px;">就业失业信息</h3>
						<el-table :data='loseJob2' border style="width: 100%" >
							<el-table-column prop='abm_ex3' label='家庭成员姓名' width="100"></el-table-column>
							<el-table-column prop='aca_ex20' label='失业经办人' width="100"></el-table-column>
							<el-table-column prop='aca_ex21' label='减少原因' width="100"></el-table-column>
							<el-table-column prop='aca_ex22' label='失业原因' width="100"></el-table-column>
							<el-table-column prop='aca_dat2' label='失业登记时间' width="100"></el-table-column>
							<el-table-column prop='aca_dat3' label='就业登记日期' width="100"></el-table-column>
							<el-table-column prop='aca_dat4' label='就业时间' width="100"></el-table-column>
							<el-table-column prop='aca_ex23' label='剩余失业保险金月数' width="100"></el-table-column>
							<el-table-column prop='aca_ex24' label='结束期' width="100"></el-table-column>
							<el-table-column prop='aca_ex25' label='登记号码' width="100"></el-table-column>
							<el-table-column prop='aca_ex26' label='人员类别' width="100"></el-table-column>
							<el-table-column prop='aca_ex27' label='就业形式' width="100"></el-table-column>
							<el-table-column prop='aca_ex28' label='失业经办机构' width="100"></el-table-column>
							<el-table-column prop='aca_ex29' label='经办机构' width="100"></el-table-column>
							<el-table-column prop='aca_ex30' label='单位名称' width="100"></el-table-column>
							<el-table-column prop='aca_ex31' label='失业经办机构' width="100"></el-table-column>
							<el-table-column prop='aca_dat10' label='反馈时间' width="100"></el-table-column>
						</el-table>
						<h3 style="text-align: center;padding-top: 20px;">职工基础信息</h3>
						<el-table :data='works2' border style="width: 100%" >
							<el-table-column prop='abm_ex3' label='家庭成员姓名' width="100"></el-table-column>
							<el-table-column prop='aca_ex41' label='性别' width="100" :formatter='formatterxb'>
							</el-table-column>
							<el-table-column prop='aca_ex40' label='个人存款账户号码' width="100"></el-table-column>
							<el-table-column prop='aca_dat1' label='出生日期' width="100" :formatter='formatDate'>
							</el-table-column>
							<el-table-column prop='aca_ex42' label='就业状态' width="100"></el-table-column>
							<el-table-column prop='aca_dat6' label='销户日期' width="100" :formatter='formatDate2'>
							</el-table-column>
							<el-table-column prop='aca_dat7' label='参工日期' width="100" :formatter='formatDate2'>
							</el-table-column>
							<el-table-column prop='aca_ex45' label='社保账号' width="100"></el-table-column>
							<el-table-column prop='aca_dat8' label='开户日期' width="100" :formatter='formatDate2'>
							</el-table-column>
							<el-table-column prop='aca_ex46' label='是否现役军人' width="100" :formatter='formatterxbsfxyjr'>
							</el-table-column>
							<el-table-column prop='aca_ex44' label='是否转业军人' width="100" :formatter='formattersfzyjr'>
							</el-table-column>
							<el-table-column prop='aca_ex48' label='所属行业' width="100"></el-table-column>
							<el-table-column prop='aca_ex49' label='家庭住址' width="100"></el-table-column>
							<el-table-column prop='aca_ex50' label='信用等级' width="100"></el-table-column>
							<el-table-column prop='aca_ex51' label='联系地址' width="100"></el-table-column>
							<el-table-column prop='aca_ex52' label='浮动工资' width="100"></el-table-column>
							<el-table-column prop='aca_ex53' label='是否存在住房公积金' width="100"
								:formatter='formatterxbsfczzfgjj'></el-table-column>
							<el-table-column prop='aca_ex56' label='英文姓名' width="100"></el-table-column>
							<el-table-column prop='aca_ex60' label='联系地址邮编' width="100"></el-table-column>
							<el-table-column prop='aca_ex61' label='户籍性质' width="100" :formatter='formatterxbhjxz'>
							</el-table-column>
							<el-table-column prop='aca_ex62' label='个人存款账户开户行' width="100"></el-table-column>
							<el-table-column prop='aca_ex63' label='职工内码' width="100"></el-table-column>
							<el-table-column prop='aca_ex64' label='代为代码' width="100"></el-table-column>
							<el-table-column prop='aca_ex65' label='政治面貌' width="100"></el-table-column>
							<el-table-column prop='aca_ex58' label='邮编' width="100"></el-table-column>
							<el-table-column prop='aca_ex59' label='实际工资基数' width="100"></el-table-column>
							<el-table-column prop='ahc_dat2' label='反馈时间' width="100"></el-table-column>
						</el-table>
						<h3 style="text-align: center;padding-top: 20px;">高考信息</h3>
						<el-table :data='college2' border style="width: 100%" >
							<el-table-column prop='aca_ex1' label='家庭成员姓名' width="100"></el-table-column>
							<el-table-column prop='aca_ex3' label='户口所在地' width="100"></el-table-column>
							<el-table-column prop='aca_ex5' label='院校名称' width="100"></el-table-column>
							<el-table-column prop='aca_ex6' label='批次名称' width="100"></el-table-column>
							<el-table-column prop='aca_ex7' label='录取年度' width="100"></el-table-column>
							<el-table-column prop='aca_dat10' label='反馈时间'></el-table-column>
						</el-table>
						<h3 style="text-align: center;padding-top: 20px;">户籍信息</h3>
						<el-table :data='hj2' border style="width: 100%" >
							<el-table-column prop='xm' label='家庭成员姓名' width="100"></el-table-column>
							<el-table-column prop='gmsfhm' label='身份证号' width="100"></el-table-column>
							<el-table-column prop='sex' label='性别' width="100"></el-table-column>
							<el-table-column prop='birthday' label='出生日期' width="100"></el-table-column>
							<el-table-column prop='hjdxz' label='户籍地址' width="100"></el-table-column>
							<el-table-column prop='hh' label='户号'></el-table-column>
						</el-table>
						<h3 style="text-align: center;padding-top: 20px;">住建局信息</h3>
						<el-table :data='zjjxx2' border style="width: 100%" >
							<el-table-column prop='aca_ex1' label='家庭成员姓名' width="100"></el-table-column>
							<el-table-column prop='aca_ex66' label='证书编号' width="100"></el-table-column>
							<el-table-column prop='aca_ex67' label='执业范围' width="100"></el-table-column>
							<el-table-column prop='aca_ex68' label='资格许可时间' width="100"></el-table-column>
							<el-table-column prop='aca_ex4' label='证件类型' width="100"></el-table-column>
							<el-table-column prop='aca_ex69' label='资格许可机关' width="100"></el-table-column>
							<el-table-column prop='aca_dat9' label='资格取得时间' width="100"></el-table-column>
							<el-table-column prop='aca_ex70' label='资格名称' width="100"></el-table-column>
							<el-table-column prop='aca_dat10' label='反馈时间'></el-table-column>
						</el-table>
						<h3 style="text-align: center;padding-top: 20px;">残疾信息</h3>
						<el-table :data='cjxx2' border style="width: 100%" >
							<el-table-column prop='abdl_ex1' label='家庭成员姓名' width="100"></el-table-column>
							<el-table-column prop='abdl_ex2' label='性别' width="100"></el-table-column>
							<el-table-column prop='abdl_ex3' label='出生日期' width="100"></el-table-column>
							<el-table-column prop='abdl_ex4' label='市区' width="100"></el-table-column>
							<el-table-column prop='abdl_ex5' label='镇街' width="100"></el-table-column>
							<el-table-column prop='abdl_ex6' label='村委' width="100"></el-table-column>
							<el-table-column prop='abdl_ex7' label='残疾人证号码' width="100"></el-table-column>
							<el-table-column prop='abdl_ex8' label='身份证号码' width="100"></el-table-column>
							<el-table-column prop='abdl_ex9' label='残疾类别' width="100"></el-table-column>
							<el-table-column prop='abdl_ex10' label='残疾等级' width="100"></el-table-column>
							<el-table-column prop='abdl_ex11' label='复审日期' width="100"></el-table-column>
							<el-table-column prop='abdl_dat1' label='录入时间'></el-table-column>
						</el-table>
						<h3 style="text-align: center;padding-top: 20px;">长护险信息</h3>
						<el-table :data='chxxx2' border style="width: 100%" >
							<el-table-column prop='abi_ex2' label='家庭成员姓名' width="100"></el-table-column>
							<el-table-column prop='abi_ex1' label='统筹区' width="100"></el-table-column>
							<el-table-column prop='abi_ex7' label='镇街' width="100"></el-table-column>
							<el-table-column prop='abi_ex3' label='性别' width="100"></el-table-column>
							<el-table-column prop='abi_ex4' label='身份证号码' width="100"></el-table-column>
							<el-table-column prop='abi_ex5' label='残疾类别' width="100"></el-table-column>
							<el-table-column prop='abi_ex6' label='残疾等级' width="100"></el-table-column>
							<el-table-column prop='abi_ex8' label='待遇开始日期' width="100"></el-table-column>
							<el-table-column prop='abi_ex9' label='长护保险待遇标准'></el-table-column>
						</el-table>
						<h3 style="text-align: center;padding-top: 20px;">高额医疗费信息</h3>
						<el-table :data='geylfxx2' border style="width: 100%" >
							<el-table-column prop='ac_ex5' label='家庭成员姓名' width="100"></el-table-column>
							<el-table-column prop='ac_ex1' label='参保所属区' width="100"></el-table-column>
							<el-table-column prop='ac_ex2' label='单位代码' width="100"></el-table-column>
							<el-table-column prop='ac_ex3' label='单位名称' width="100"></el-table-column>
							<el-table-column prop='ac_ex4' label='身份证号码' width="100"></el-table-column>
							<el-table-column prop='ac_ex6' label='医院名称' width="100"></el-table-column>
							<el-table-column prop='ac_ex7' label='医疗人员类别' width="100"></el-table-column>
							<el-table-column prop='ac_ex8' label='总费用' width="100"></el-table-column>
							<el-table-column prop='ac_ex9' label='统筹支出' width="100"></el-table-column>
							<el-table-column prop='ac_ex10' label='现金支付' width="100"></el-table-column>
							<el-table-column prop='ac_ex11' label='个人账户' width="100"></el-table-column>
							<el-table-column prop='ac_ex12' label='大病救助' width="100"></el-table-column>
							<el-table-column prop='ac_ex13' label='城乡救助' width="100"></el-table-column>
							<el-table-column prop='ac_ex14' label='大病保险' width="100"></el-table-column>
							<el-table-column prop='ac_ex15' label='健康扶贫支付' width="100"></el-table-column>
							<el-table-column prop='ac_ex16' label='进入大病保险范围内费用' width="100"></el-table-column>
							<el-table-column prop='ac_ex17' label='丙类费用' width="100"></el-table-column>
							<el-table-column prop='ac_ex18' label='医院应救助' width="100"></el-table-column>
							<el-table-column prop='ac_ex19' label='医院实际救助' width="100"></el-table-column>
							<el-table-column prop='ac_ex20' label='托底保障金额' width="100"></el-table-column>
							<el-table-column prop='ac_ex21' label='入院时间' width="100"></el-table-column>
							<el-table-column prop='ac_ex22' label='出院时间' width="100"></el-table-column>
							<el-table-column prop='ac_ex23' label='结算日期' width="100"></el-table-column>
							<el-table-column prop='ac_ex24' label='健康扶贫人员类别' width="100"></el-table-column>
							<el-table-column prop='ac_ex25' label='健康扶贫所属区' width="100"></el-table-column>
							<el-table-column prop='ac_ex26' label='城乡救助所属区' width="100"></el-table-column>
							<el-table-column prop='ac_ex27' label='精准扶贫人员类别' width="100"></el-table-column>
						</el-table>
						<h3 style="text-align: center;padding-top: 20px;">特困职工信息</h3>
						<el-table :data='tkzgxx2' border style="width: 100%" >
							<el-table-column prop='ab_ex3' label='家庭成员姓名' width="100"></el-table-column>
							<el-table-column prop='ab_ex2' label='行政区划' width="100"></el-table-column>
							<el-table-column prop='ab_ex69' label='性别' width="100"></el-table-column>
							<el-table-column prop='ab_ex7' label='身份证号' width="100"></el-table-column>
							<el-table-column prop='ab_ex11' label='家庭住址' width="100"></el-table-column>
							<el-table-column prop='ab_ex28' label='联系电话' width="100"></el-table-column>
							<el-table-column prop='ab_ex87' label='救助原因' width="100"></el-table-column>
							<el-table-column prop='ab_ex88' label='备注'></el-table-column>
						</el-table>
						<h3 style="text-align: center;padding-top: 20px;">工商信息</h3>
						<el-table :data='gsxx2' border style="width: 100%" >
							<el-table-column prop='abu_ex4' label='家庭成员姓名' width="100"></el-table-column>
							<el-table-column prop='abu_ex1' label='统一社会信用代码/注册号' width="100"></el-table-column>
							<el-table-column prop='abu_ex2' label='企业名称' width="100"></el-table-column>
							<el-table-column prop='abu_ex3' label='类型' width="100"></el-table-column>
							<el-table-column prop='abu_ex4' label='法定代表人' width="100"></el-table-column>
							<el-table-column prop='abu_ex5' label='成立日期' width="100"></el-table-column>
							<el-table-column prop='abu_ex6' label='核准日期' width="100"></el-table-column>
							<el-table-column prop='abu_ex7' label='营业期限自' width="100"></el-table-column>
							<el-table-column prop='abu_ex8' label='营业期限至' width="100"></el-table-column>
							<el-table-column prop='abu_ex99' label='登记机关' width="100"></el-table-column>
							<el-table-column prop='abu_ex1' label='登记状态' width="100"></el-table-column>
							<el-table-column prop='abu_ex11' label='注册资本' width="100"></el-table-column>
							<el-table-column prop='abu_ex12' label='组成形式' width="100"></el-table-column>
							<el-table-column prop='abu_ex13' label='住所' width="100"></el-table-column>
							<el-table-column prop='abu_ex14' label='经营范围'></el-table-column>
						</el-table>
						<h3 style="text-align: center;padding-top: 20px;">陆运从业资格</h3>
						<el-table :data='lycyzg2' border style="width: 100%" >
							<el-table-column prop='lt_ex1' label='家庭成员姓名' width="100"></el-table-column>
							<el-table-column prop='lt_ex2' label='性别' width="100"></el-table-column>
							<el-table-column prop='lt_ex3' label='出生日期' width="100"></el-table-column>
							<el-table-column prop='lt_ex4' label='身份证件类别' width="100"></el-table-column>
							<el-table-column prop='lt_ex5' label='身份证号' width="100"></el-table-column>
							<el-table-column prop='lt_ex6' label='从业资格名称' width="100"></el-table-column>
							<el-table-column prop='lt_ex7' label='服务单位' width="100"></el-table-column>
							<el-table-column prop='lt_ex8' label='民族' width="100"></el-table-column>
							<el-table-column prop='lt_ex9' label='隶属区县' width="100"></el-table-column>
							<el-table-column prop='lt_ex10' label='管辖机构' width="100"></el-table-column>
							<el-table-column prop='lt_ex11' label='固定电话' width="100"></el-table-column>
							<el-table-column prop='lt_ex12' label='手机号码' width="100"></el-table-column>
							<el-table-column prop='lt_ex13' label='身份证地址' width="100"></el-table-column>
							<el-table-column prop='lt_ex14' label='现住地地址' width="100"></el-table-column>
							<el-table-column prop='lt_ex15' label='学历' width="100"></el-table-column>
							<el-table-column prop='lt_ex16' label='发证机构名称'></el-table-column>
						</el-table>
						<h3 style="text-align: center;padding-top: 20px;">婚姻信息</h3>
						<el-table :data='hyxx2' border style="width: 100%" >
							<el-table-column prop='abm_ex3' label='家庭成员姓名' width="100"></el-table-column>
							<el-table-column prop='am_ex5' label='配偶姓名' width="100"></el-table-column>
							<el-table-column prop='am_ex6' label='登记类型' width="100"></el-table-column>
							<el-table-column prop='am_ex1' label='登记日期'></el-table-column>
						</el-table>
						<h4 style="padding-top: 10px;">注：1、如有疑问或与事实不符，请接到核对报告后5日内通知核查机构。</h4>
						<h4 style="padding-top: 10px;">2、本报告仅供本行政区域内社会救助审核使用，不做其他用途。</h4>
						<h4 style="padding-top: 10px;">3、本报告于<span>{{getTime}}</span>进行了第1次打印。</h4>
						<el-row style="padding-top: 10px;color:rgba(0, 0, 0, 0.85)">
							<el-col :span='8' :push='16'>泰州市社会救助家庭经济状况核对中心</el-col>
						</el-row>
						<el-row style="padding-top: 10px;color:rgba(0, 0, 0, 0.85)">
							<el-col :span='8' :push='16'>{{getTime}}</el-col>
						</el-row>
					</div>

				</el-tab-pane>



				<el-tab-pane label='省核对反馈' name='seconed'>
					<el-row>
						<el-col :span='2' :offset='19'>
							<el-button  @click='getmes("ceshi2")'>下载核对报告</el-button>
						</el-col>
						<el-col :span='2'  :offset='1' >
							<el-button  @click='closeView'>返回</el-button>
							<!-- <common-list  @click='closeView'>返回</common-list> -->
						</el-col>
					</el-row>
					<div id="ceshi2" class="ceshi2">
						<h2 style="text-align: center;">泰州市社会救助家庭经济状况核对报告</h2>
						<el-row>
							<el-col :span='2' :offset='2'>核对编号:</el-col>
							<el-col :span='6'>{{info.ab_ex85}}</el-col>
						</el-row>
						<el-row style='display:flex;flex-wrap: wrap;'>
							<el-col :span='2' :offset='2'>核对时间:</el-col>
							<el-col :span='6'>{{info.ab_dat3}}</el-col>
							<el-col :span='3'>申请救助类型:</el-col>
							<el-col :span='6'>{{info.ab_ex13}}</el-col>
						</el-row>
						<el-row style='display:flex;flex-wrap: wrap;'>
							<el-col :span='2' :offset='2'>申请人:</el-col>
							<el-col :span='6'>{{info.ab_ex3}}</el-col>
							<el-col :span='3'>身份证号码:</el-col>
							<el-col :span='6'>{{info.ab_ex7}}</el-col>
						</el-row>
						<h4 style="padding-top: 10px;">一、家庭基本情况</h4>
						<h3 style="text-align: center;padding-top: 20px;">家庭成员基本情况</h3>
						<el-table :data='tableData' border style="width: 100%" >
							<el-table-column prop='abm_ex3' label='姓名' width="100"></el-table-column>
							<el-table-column prop='abm_ex2' label='身份证号' width="200"></el-table-column>
							<el-table-column prop='abm_ex1' label='与主申请人关系' width="180"></el-table-column>
							<el-table-column prop='ab_ex4' label='户籍所在地'></el-table-column>
						</el-table>
						<h3 style="text-align: center;padding-top: 20px;">赡抚养人基本情况</h3>
						<el-table :data='tableData2' border style="width: 100%" >
							<el-table-column prop='abm_ex3' label='姓名' width="100"></el-table-column>
							<el-table-column prop='abm_ex2' label='身份证号' width="200"></el-table-column>
							<el-table-column prop='abm_ex1' label='与主申请人关系' width="180"></el-table-column>
							<el-table-column prop='ab_ex4' label='户籍所在地'></el-table-column>
						</el-table>
						<h4 style="padding-top: 10px;">二、家庭财产信息</h4>
						<div style="text-indent: 30px;">
							此次经济核对了15个省级项目，5个市级项目共有婚姻，户籍信息车辆，金融信息，职工基本信息，证券信息等反馈疑似信息，具体信息反馈如下：
						</div>
						<h3 style="text-align: center;padding-top: 20px;">证劵信息</h3>
						<el-table :data='zj' border style="width: 100%" >
							<el-table-column prop='abm_ex3' label='家庭成员姓名' width="100"></el-table-column>
							<el-table-column prop='d204c240001' label='股票总市值' width="100"></el-table-column>
							<el-table-column prop='d204c240002' label='新三板总股本' width="100"></el-table-column>
							<el-table-column prop='d204c240003' label='新三板估值' width="100"></el-table-column>
							<el-table-column prop='d204c240004' label='持有基金总市值' width="100"></el-table-column>
							<el-table-column prop='d204c240005' label='债券总市值' width="100"></el-table-column>
							<el-table-column prop='d204c240006' label='数据记录的实际查询日期' width="100"></el-table-column>
							<el-table-column prop='d204c240007' label='结果标识' width="100"></el-table-column>
							<el-table-column prop='d204c240008' label='托管商' width="100"></el-table-column>
							<el-table-column prop='d204c240009' label='深市/沪市' width="100"></el-table-column>
							<el-table-column prop='d204c240010' label='是否开立' width="100"></el-table-column>
							<el-table-column prop='ahc_dat2' label='反馈时间' width="100"></el-table-column>
						</el-table>
						<h3 style="text-align: center;padding-top: 20px;">存款信息</h3>
						<el-table :data='ck' border style="width: 100%" >
							<el-table-column prop='abm_ex3' label='家庭成员姓名' width="100"></el-table-column>
							<el-table-column prop='d204c230016' label='个人存款是否超限' width="200"></el-table-column>
							<el-table-column prop='d204c230017' label='家庭存款是否超限'></el-table-column>
							<el-table-column prop='ahc_dat2' label='反馈时间'></el-table-column>
						</el-table>
						<h3 style="text-align: center;padding-top: 20px;">不动产信息</h3>
						<el-table :data='bdc' border style="width: 100%" >
							<el-table-column prop='abm_ex3' label='家庭成员姓名' width="100"></el-table-column>
							<el-table-column prop='d204c310001' label='房地坐落' width="100"></el-table-column>
							<el-table-column prop='d204c310002' label='建筑面积' width="100"></el-table-column>
							<el-table-column prop='d204c310003' label='规划用途' width="100"></el-table-column>
							<el-table-column prop='d204c310004' label='房屋性质' width="100"></el-table-column>
							<el-table-column prop='d204c310005' label='不动产权证号' width="100"></el-table-column>
							<el-table-column prop='d204c310006' label='登记时间' width="100"></el-table-column>
							<el-table-column prop='d204c310007' label='共有方式' width="100"></el-table-column>
							<el-table-column prop='d204c310008' label='房屋结构' width="100"></el-table-column>
							<el-table-column prop='d204c310009' label='房屋类型' width="100"></el-table-column>
							<el-table-column prop='ahc_dat2' label='反馈时间' width="100"></el-table-column>
						</el-table>
						<h3 style="text-align: center;padding-top: 20px;">公积金缴存信息</h3>
						<el-table :data='gjjjc' border style="width: 100%" >
							<el-table-column prop='abm_ex3' label='家庭成员姓名' width="100"></el-table-column>
							<el-table-column prop='d204d3410001' label='职工缴交率' width="100"></el-table-column>
							<el-table-column prop='d204d3410002' label='该职工代码存在的数据条数' width="100"></el-table-column>
							<el-table-column prop='d204d3410003' label='汇缴年月' width="100"></el-table-column>
							<el-table-column prop='d204d3410004' label='营业执照代码' width="100"></el-table-column>
							<el-table-column prop='d204d3410005' label='月缴额' width="100"></el-table-column>
							<el-table-column prop='d204d3410006' label='单位缴交率' width="100"></el-table-column>
							<el-table-column prop='d204d3410007' label='单位代码' width="100"></el-table-column>
							<el-table-column prop='d204d3410008' label='单位名称' width="100"></el-table-column>
							<el-table-column prop='d204d3410009' label='职工内码' width="100"></el-table-column>
							<el-table-column prop='d204d3410010' label='职工月缴额' width="100"></el-table-column>
							<el-table-column prop='d204d3410011' label='汇缴状态' width="100"></el-table-column>
							<el-table-column prop='d204d3410012' label='单位月缴' width="100"></el-table-column>
							<el-table-column prop='ahc_dat2' label='反馈时间' width="100"></el-table-column>
						</el-table>
						<h3 style="text-align: center;padding-top: 20px;">公积金贷款信息</h3>
						<el-table :data='gjjdk' border style="width: 100%" >
							<el-table-column prop='abm_ex3' label='家庭成员姓名' width="100"></el-table-column>
							<el-table-column prop='d204d340001' label='经办银行' width="100"></el-table-column>
							<el-table-column prop='d204d340002' label='申请日期' width="100"></el-table-column>
							<el-table-column prop='d204d340003' label='申请贷款期限(月)' width="100"></el-table-column>
							<el-table-column prop='d204d340004' label='还款方式' width="100"></el-table-column>
							<el-table-column prop='d204d340005' label='贷款类型' width="100"></el-table-column>
							<el-table-column prop='d204d340006' label='月还金额' width="100"></el-table-column>
							<el-table-column prop='d204d340007' label='扣款账号' width="100"></el-table-column>
							<el-table-column prop='d204d340008' label='还款账户' width="100"></el-table-column>
							<el-table-column prop='ahc_dat2' label='反馈时间' width="100"></el-table-column>
						</el-table>
						<h3 style="text-align: center;padding-top: 20px;">车辆信息</h3>
						<el-table :data='car' border style="width: 100%" >
							<el-table-column prop='abm_ex3' label='家庭成员姓名' width="100"></el-table-column>
							<el-table-column prop='d204c210001' label='中文品牌' width="100"></el-table-column>
							<el-table-column prop='d204c210002' label='号牌号码' width="100"></el-table-column>
							<el-table-column prop='d204c210003' label='车辆型号' width="100"></el-table-column>
							<el-table-column prop='d204c210004' label='初次登记日期' width="100"></el-table-column>
							<el-table-column prop='d204c210006' label='使用性质' width="100"></el-table-column>
							<el-table-column prop='d204c210012' label='机动车状态' width="100"></el-table-column>
							<el-table-column prop='d204c210016' label='号牌种类' width="100"></el-table-column>
							<el-table-column prop='ahc_dat2' label='反馈时间'></el-table-column>
						</el-table>
						<h3 style="text-align: center;padding-top: 20px;">企业高级管理人员</h3>
						<el-table :data='business' border style="width: 100%" >
							<el-table-column prop='abm_ex3' label='家庭成员姓名' width="100"></el-table-column>
							<el-table-column prop='d204b120001' label='所属企业的统一社会信用代码' width="100"></el-table-column>
							<el-table-column prop='d204b120002' label='注册号' width="100"></el-table-column>
							<el-table-column prop='d204b120003' label='企业名称' width="100"></el-table-column>
							<el-table-column prop='d204b120004' label='企业类型' width="100"></el-table-column>
							<el-table-column prop='d204b120005' label='注册资本' width="100"></el-table-column>
							<el-table-column prop='d204b120006' label='经营范围' width="100"></el-table-column>
							<el-table-column prop='d204b120007' label='职务' width="100"></el-table-column>
							<el-table-column prop='d204b120008' label='登记机关' width="100"></el-table-column>
							<el-table-column prop='d204b120009' label='成立日期' width="100"></el-table-column>
							<el-table-column prop='d204b120010' label='在业状态' width="100"></el-table-column>
							<el-table-column prop='ahc_dat2' label='反馈时间' width="100"></el-table-column>
						</el-table>
						<h3 style="text-align: center;padding-top: 20px;">死亡信息</h3>
						<el-table :data='byg' border style="width: 100%" >
							<el-table-column prop='abm_ex3' label='家庭成员姓名' width="100"></el-table-column>
							<el-table-column prop='d204z780001' label='性别' width="100"></el-table-column>
							<el-table-column prop='d204z780002' label='出生日期' width="100"></el-table-column>
							<el-table-column prop='d204z780003' label='注销标识' width="100"></el-table-column>
							<el-table-column prop='d204z780004' label='派出所' width="100"></el-table-column>
							<el-table-column prop='ahc_dat2' label='反馈时间'></el-table-column>
						</el-table>
						<h3 style="text-align: center;padding-top: 20px;">个人所得税信息</h3>
						<el-table :data='income' border style="width: 100%" >
							<el-table-column prop='abm_ex3' label='家庭成员姓名' width="100"></el-table-column>
							<el-table-column prop='d204d380002' label='税款所属期起' width="100"></el-table-column>
							<el-table-column prop='d204d380003' label='税款所属期止' width="100"></el-table-column>
							<el-table-column prop='d204d380005' label='入库金额' width="100"></el-table-column>
							<el-table-column prop='d204d380006' label='收入额' width="100"></el-table-column>
							<el-table-column prop='d204d380007' label='入库日期' width="100"></el-table-column>
							<el-table-column prop='d204d380010' label='单位纳税人名称' width="100"></el-table-column>
							<el-table-column prop='d204d380013' label='所得项目名称' width="100"></el-table-column>
							<el-table-column prop='d204d380014' label='应纳税所得额' width="100"></el-table-column>
							<el-table-column prop='ahc_dat2' label='反馈时间' width="100"></el-table-column>
						</el-table>
						<h3 style="text-align: center;padding-top: 20px;">个体经营者信息</h3>
						<el-table :data='individual' border style="width: 100%" >
							<el-table-column prop='abm_ex3' label='家庭成员姓名' width="100"></el-table-column>
							<el-table-column prop='d204b120001' label='个体工商户的统一社会信用代码' width="100"></el-table-column>
							<el-table-column prop='d204b120002' label='注册号' width="100"></el-table-column>
							<el-table-column prop='d204b120003' label='资金数额' width="100"></el-table-column>
							<el-table-column prop='d204b120004' label='经营范围' width="100"></el-table-column>
							<el-table-column prop='d204b120005' label='登记机关' width="100"></el-table-column>
							<el-table-column prop='d204b120006' label='成立日期' width="100"></el-table-column>
							<el-table-column prop='d204b120007' label='在业状态' width="100"></el-table-column>
							<el-table-column prop='d204b120008' label='企业名称' width="100"></el-table-column>
							<el-table-column prop='ahc_dat2' label='反馈时间' width="100"></el-table-column>
						</el-table>
						<h3 style="text-align: center;padding-top: 20px;">企业投资人信息</h3>
						<el-table :data='investor' border style="width: 100%" >
							<el-table-column prop='abm_ex3' label='家庭成员姓名' width="100"></el-table-column>
							<el-table-column prop='d204b120001' label='所属企业的统一社会信用代码' width="100"></el-table-column>
							<el-table-column prop='d204b120002' label='注册号' width="100"></el-table-column>
							<el-table-column prop='d204b120003' label='企业名称' width="100"></el-table-column>
							<el-table-column prop='d204b120004' label='认缴出资额' width="100"></el-table-column>
							<el-table-column prop='d204b120005' label='登记机关' width="100"></el-table-column>
							<el-table-column prop='d204b120006' label='成立日期' width="100"></el-table-column>
							<el-table-column prop='d204b120007' label='在业状态' width="100"></el-table-column>
							<el-table-column prop='ahc_dat2' label='反馈时间'></el-table-column>
						</el-table>
						<h3 style="text-align: center;padding-top: 20px;">司法信息</h3>
						<el-table :data='judicial' border style="width: 100%" >
							<el-table-column prop='abm_ex3' label='家庭成员姓名' width="100"></el-table-column>
							<el-table-column prop='d204z820001' label='是否重点人员' width="100"></el-table-column>
							<el-table-column prop='d204z820002' label='类型' width="100"></el-table-column>
							<el-table-column prop='ahc_dat2' label='反馈时间'></el-table-column>
						</el-table>
						<h3 style="text-align: center;padding-top: 20px;">就业失业信息</h3>
						<el-table :data='loseJob' border style="width: 100%" >
							<el-table-column prop='abm_ex3' label='家庭成员姓名' width="100"></el-table-column>
							<el-table-column prop='d204d3210001' label='失业经办人' width="100"></el-table-column>
							<el-table-column prop='d204d3210002' label='减少原因' width="100"></el-table-column>
							<el-table-column prop='d204d3210003' label='失业原因' width="100"></el-table-column>
							<el-table-column prop='d204d3210004' label='失业登记时间' width="100"></el-table-column>
							<el-table-column prop='d204d3210005' label='就业登记日期' width="100"></el-table-column>
							<el-table-column prop='d204d3210006' label='就业时间' width="100"></el-table-column>
							<el-table-column prop='d204d3210007' label='剩余失业保险金月数' width="100"></el-table-column>
							<el-table-column prop='d204d3210008' label='结束期' width="100"></el-table-column>
							<el-table-column prop='d204d3210009' label='登记号码' width="100"></el-table-column>
							<el-table-column prop='d204d3210010' label='人员类别' width="100"></el-table-column>
							<el-table-column prop='d204d3210011' label='就业形式' width="100"></el-table-column>
							<el-table-column prop='d204d3210012' label='失业经办机构' width="100"></el-table-column>
							<el-table-column prop='d204d3210013' label='经办机构' width="100"></el-table-column>
							<el-table-column prop='d204d3210014' label='单位名称' width="100"></el-table-column>
							<el-table-column prop='d204d3210015' label='失业经办机构' width="100"></el-table-column>
							<el-table-column prop='ahc_dat2' label='反馈时间' width="100"></el-table-column>
						</el-table>
						<h3 style="text-align: center;padding-top: 20px;">婚姻信息</h3>
						<el-table :data='marriage' border style="width: 100%" >
							<el-table-column prop='abm_ex3' label='家庭成员姓名' width="100"></el-table-column>
							<el-table-column prop='d204z630004' label='配偶姓名' width="100"></el-table-column>
							<el-table-column prop='d204z630005' label='配偶证件号码' width="100"></el-table-column>
							<el-table-column prop='d204z630006' label='婚姻状况' width="100"></el-table-column>
							<el-table-column prop='d204z630007' label='登记日期' width="100"></el-table-column>
							<el-table-column prop='d204z630008' label='登记类型' width="100"></el-table-column>
							<el-table-column prop='ahc_dat2' label='反馈时间'></el-table-column>
						</el-table>
						<h3 style="text-align: center;padding-top: 20px;">社会组织</h3>
						<el-table :data='organization' border style="width: 100%" >
							<el-table-column prop='abm_ex3' label='家庭成员姓名' width="100"></el-table-column>
							<el-table-column prop='d204z540001' label='组织名称' width="100"></el-table-column>
							<el-table-column prop='d204z540002' label='组织类型' width="100"></el-table-column>
							<el-table-column prop='d204z540003' label='登记证号' width="100"></el-table-column>
							<el-table-column prop='d204z540004' label='组织机构代码' width="100"></el-table-column>
							<el-table-column prop='d204z540005' label='业务主管单位' width="100"></el-table-column>
							<el-table-column prop='d204z540006' label='登记管理机关' width="100"></el-table-column>
							<el-table-column prop='d204z540007' label='开办资金(元)' width="100"></el-table-column>
							<el-table-column prop='d204z540008' label='行业分类' width="100"></el-table-column>
							<el-table-column prop='ahc_dat2' label='反馈时间' width="100"></el-table-column>
						</el-table>
						<h3 style="text-align: center;padding-top: 20px;">法人纳税信息</h3>
						<el-table :data='taxes' border style="width: 100%" >
							<el-table-column prop='abm_ex3' label='家庭成员姓名' width="100"></el-table-column>
							<el-table-column prop='d204d330002' label='纳税人企业名称' width="100"></el-table-column>
							<el-table-column prop='d204d330006' label='申报日期' width="100"></el-table-column>
							<el-table-column prop='d204d330007' label='税种' width="100"></el-table-column>
							<el-table-column prop='d204d330009' label='收入' width="100"></el-table-column>
							<el-table-column prop='d204d330010' label='税额' width="100"></el-table-column>
							<el-table-column prop='d204d330011' label='税务登记证号' width="100"></el-table-column>
							<el-table-column prop='d204d330012' label='税务登记类型' width="100"></el-table-column>
							<el-table-column prop='d204d330014' label='征税机构' width="100"></el-table-column>
							<el-table-column prop='d204d330015' label='免税收入额' width="100"></el-table-column>
							<el-table-column prop='d204d330018' label='所属期起' width="100"></el-table-column>
							<el-table-column prop='d204d330019' label='所属期止' width="100"></el-table-column>
							<el-table-column prop='d204d330020' label='申报表类型' width="100"></el-table-column>
							<el-table-column prop='ahc_dat2' label='反馈时间' width="100"></el-table-column>
						</el-table>
						<h3 style="text-align: center;padding-top: 20px;">职工基础信息</h3>
						<el-table :data='works' border style="width: 100%" >
							<el-table-column prop='abm_ex3' label='家庭成员姓名' width="100"></el-table-column>
							<el-table-column prop='d204d340001' label='性别' width="100"></el-table-column>
							<el-table-column prop='d204d340002' label='个人存款账户号码' width="100"></el-table-column>
							<el-table-column prop='' label='出生日期' width="100"></el-table-column>
							<el-table-column prop='d204d340004' label='就业状态' width="100"></el-table-column>
							<el-table-column prop='d204d340005' label='婚姻状况' width="100"></el-table-column>
							<el-table-column prop='d204d340006' label='最高学历' width="100"></el-table-column>
							<el-table-column prop='d204d340007' label='销户日期' width="100"></el-table-column>
							<el-table-column prop='d204d340008' label='是否转业军人' width="100"></el-table-column>
							<el-table-column prop='d204d340009' label='参工日期' width="100"></el-table-column>
							<el-table-column prop='d204d340010' label='社保账号' width="100"></el-table-column>
							<el-table-column prop='d204d340011' label='开户日期' width="100"></el-table-column>
							<el-table-column prop='d204d340012' label='是否现役军人' width="100"></el-table-column>
							<el-table-column prop='d204d340013' label='职称' width="100"></el-table-column>
							<el-table-column prop='d204d340014' label='所属行业' width="100"></el-table-column>
							<el-table-column prop='d204d340015' label='家庭住址' width="100"></el-table-column>
							<el-table-column prop='d204d340016' label='信用等级' width="100"></el-table-column>
							<el-table-column prop='d204d340017' label='联系地址' width="100"></el-table-column>
							<el-table-column prop='d204d340018' label='浮动工资' width="100"></el-table-column>
							<el-table-column prop='d204d340019' label='是否存在住房公积金' width="100"></el-table-column>
							<el-table-column prop='d204d340020' label='民族' width="100"></el-table-column>
							<el-table-column prop='d204d340021' label='职务' width="100"></el-table-column>
							<el-table-column prop='d204d340022' label='英文姓名' width="100"></el-table-column>
							<el-table-column prop='d204d340023' label='职业' width="100"></el-table-column>
							<el-table-column prop='d204d340024' label='是否贷款' width="100"></el-table-column>
							<el-table-column prop='d204d340025' label='邮编' width="100"></el-table-column>
							<el-table-column prop='d204d340026' label='实际工资基数' width="100"></el-table-column>
							<el-table-column prop='d204d340027' label='联系地址邮编' width="100"></el-table-column>
							<el-table-column prop='d204d340028' label='户籍性质' width="100"></el-table-column>
							<el-table-column prop='d204d340029' label='个人存款账户开户行' width="100"></el-table-column>
							<el-table-column prop='d204d340030' label='职工内码' width="100"></el-table-column>
							<el-table-column prop='d204d340031' label='代为代码' width="100"></el-table-column>
							<el-table-column prop='d204d340032' label='政治面貌' width="100"></el-table-column>
							<el-table-column prop='ahc_dat2' label='反馈时间' width="100"></el-table-column>
						</el-table>
						<h3 style="text-align: center;padding-top: 20px;">高考信息</h3>
						<el-table :data='college' border style="width: 100%" >
							<el-table-column prop='abm_ex3' label='家庭成员姓名' width="100"></el-table-column>
							<el-table-column prop='d204z510001' label='户口所在地' width="100"></el-table-column>
							<el-table-column prop='d204z510002' label='院校名称' width="100"></el-table-column>
							<el-table-column prop='d204z510003' label='批次名称' width="100"></el-table-column>
							<el-table-column prop='d204z510004' label='录取年度' width="100"></el-table-column>
							<el-table-column prop='ahc_dat2' label='反馈时间'></el-table-column>
						</el-table>
						<h3 style="text-align: center;padding-top: 20px;">户籍信息</h3>
						<el-table :data='hj' border style="width: 100%" >
							<el-table-column prop='abm_ex3' label='家庭成员姓名' width="100"></el-table-column>
							<el-table-column prop='d204a050002' label='性别' width="100"></el-table-column>
							<el-table-column prop='d204a050003' label='民族' width="100"></el-table-column>
							<el-table-column prop='d204a050004' label='出生日期' width="100"></el-table-column>
							<el-table-column prop='d204a050010' label='户籍行政区划' width="100"></el-table-column>
							<el-table-column prop='d204a050011' label='派出所' width="100"></el-table-column>
							<el-table-column prop='ahc_dat2' label='反馈时间'></el-table-column>
						</el-table>
						<h3 style="text-align: center;padding-top: 20px;">殡葬信息</h3>
						<el-table :data='bz' border style="width: 100%" >
							<el-table-column prop='abm_ex3' label='家庭成员姓名' width="100"></el-table-column>
							<el-table-column prop='d204z620004' label='性别' width="100"></el-table-column>
							<el-table-column prop='d204z620005' label='出生日期' width="100"></el-table-column>
							<el-table-column prop='d204z620006' label='死亡日期' width="100"></el-table-column>
							<el-table-column prop='d204z620007' label='死亡原因' width="100"></el-table-column>
							<el-table-column prop='d204z620008' label='死亡地点' width="100"></el-table-column>
							<el-table-column prop='d204z620010' label='殡仪馆名称' width="100"></el-table-column>
							<el-table-column prop='ahc_dat2' label='反馈时间'></el-table-column>
						</el-table>
						<h4 style="padding-top: 10px;">注：1、如有疑问或与事实不符，请接到核对报告后5日内通知核查机构。</h4>
						<h4 style="padding-top: 10px;">2、本报告仅供本行政区域内社会救助审核使用，不做其他用途。</h4>
						<h4 style="padding-top: 10px;">3、本报告于<span>{{getTime}}</span>进行了第1次打印。</h4>
						<el-row style="padding-top: 10px;color:rgba(0, 0, 0, 0.85)">
							<el-col :span='8' :push='16'>泰州市社会救助家庭经济状况核对中心</el-col>
						</el-row>
						<el-row style="padding-top: 10px;color:rgba(0, 0, 0, 0.85)">
							<el-col :span='8' :push='16'>{{getTime}}</el-col>
						</el-row>
					</div>

				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
	import request from '@/utils/request'
	import CommonList from './commonList.vue';
import commonList from './commonList.vue';
	export default {
  components: { commonList },
		data() {
			return {
				
				CommonListctiveName: 'first',
				sId: '',
				zj: [], //证卷
				ck: [],
				bdc: [],
				gjjjc: [],
				gjjjc2: [],
				gjjdk: [],
				gjjdk2: [],
				car: [],
				business: [],
				byg: [],
				byg2: [],
				income: [],
				individual: [],
				investor: [],
				judicial: [],
				loseJob: [],
				loseJob2: [],
				marriage: [],
				organization: [],
				taxes: [],
				works: [],
				works2: [],
				college: [],
				college2: [],
				hj: [],
				hj2: [],
				bz: [],
				info: {},
				tableData: [],
				tableData2: [],
				tableData3: [],
				zjjxx2: [],
				cjxx2: [],
				chxxx2: [],
				geylfxx2: [],
				tkzgxx2: [],
				gsxx2: [],
				lycyzg2: [],
				hyxx2: []
			}
		},
		created() {
			this.sId = this.$route.query.sId;
			this.loadData();
		},
		// watch: {
		// 	$route() {
		// 		this.sId = this.$route.query.sId;
		// 		this.loadData();
		// 	}
		// },
		computed: {
			getTime() {
				var date = new Date();
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var day = date.getDate();
				return year + '' + '-' + (month > 9 ? month : '0' + month) + '' + '-' + (day > 9 ? day : '0' + day);
			}
		},
		methods: {
			handleClick(aaa) {
				console.log(aaa)
			},
			formatterxb(row, column, cellValue, index) {
				return cellValue == '0' ? '女' : '男'
			},
			formatterxbsfxyjr(row, column, cellValue, index) {
				return cellValue == '1' ? '是' : '不是'
			},
			formattersfzyjr(row, column, cellValue, index) {
				return cellValue == '1' ? '是' : '不是'
			},
			formatterxbsfczzfgjj(row, column, cellValue, index) {
				return cellValue == '1' ? '存在' : '不存在'
			},
			formatterxbhjxz(row, column, cellValue, index) {
				if (cellValue == '01') {
					return '农业户口'
				} else if (cellValue == '02') {
					return '非农业户口'
				} else if (cellValue == '09') {
					return '其他'
				}
			},
			formatDate2(row, column, cellValue, index) {
				if (cellValue == null || cellValue == '') {
					return '';
				} else {
					var date = new Date(parseFloat(cellValue)); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
					var Y = date.getFullYear() + '-';
					var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
					var D = date.getDate() + ' ';
					return Y + M + D;
				}
			},
			formatDate(row, column, cellValue, index) {
				if (cellValue == null || cellValue == '') {
					return "";
				} else {
					var unixTimestamp = new Date(parseFloat(cellValue));
					var arr = unixTimestamp.toLocaleString().split(' ');
					return commonTime = arr[0];
				}
			},
			getmes(ele) {
				// A2纸张打印就完事了 A4调整缩放也行
				const bdhtml = window.document.body.innerHTML;
				let subOutPrintButton = document.getElementsByClassName(ele);
				var newContent = [];
				for (var i = 0; i < subOutPrintButton.length; i++) {
					var obj = subOutPrintButton[i].innerHTML;
					newContent.push(obj);
				}
				document.body.innerHTML = newContent;
				document.getElementsByTagName('body')[0].style.zoom = 1.35;
				window.print();
				window.location.reload();
				


				// var oIframe = document.createElement('iframe');
				// var oScript = document.createElement('script');

				// document.body.appendChild(oIframe);

				// var titleText = document.head.getElementsByTagName('title')[0].innerText;
				// document.head.getElementsByTagName('title')[0].innerText = `${fileName}`;

				// oIframe.contentDocument.head.innerHTML = `<meta charset="utf-8">
				//                                           <title>${fileName}</title>
				//                                           <meta name="format-detection" content="telephone=no">
				//                                           <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
				//                                           <meta name="viewport" content="width=device-width,initial-scale=1.0">`;

				// // oIframe.contentWindow.document.body.innerHTML = document.querySelector(ele).outerHTML;
				// oIframe.contentDocument.body.innerHTML = document.querySelector(ele).outerHTML;
				// oScript.innerHTML = 'window.print();';
				// oIframe.contentDocument.body.appendChild(oScript);
				// document.body.removeChild(oIframe);
				// document.head.getElementsByTagName('title')[0].innerText = titleText;

			},
			// 返回
			closeView() {
				this.$emit("closes", false)
				this.$router.go(-1)
			},
			// getmes(val) {
			//         var dId = "";
			//         if(val=='市级核对报告'){
			//             dId = "qjPdf";
			//         }if(val=='省级核对报告'){
			//             dId = "sjPdf";
			//         }
			//         html2canvas(document.getElementById(dId),{ //此处的id为要打印的部分
			//             onrendered:function(canvas){
			//                 var contentWidth = canvas.width;
			//                 var contentHeight = canvas.height;

			//                 //一页pdf显示html页面生成的canvas高度;
			//                 var pageHeight = contentWidth / 592.28 * 841.89;
			//                 //未生成pdf的html页面高度
			//                 var leftHeight = contentHeight;
			//                 //pdf页面偏移
			//                 var position = 0;
			//                 //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
			//                 var imgWidth = 595.28;
			//                 var imgHeight = 592.28/contentWidth * contentHeight;

			//                 var pageData = canvas.toDataURL('image/jpeg', 1.0);

			//                 var pdf = new jsPDF('', 'pt', 'a4');

			//                 //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
			//                 //当内容未超过pdf一页显示的范围，无需分页
			//                 if (leftHeight < pageHeight) {
			//                     pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight );
			//                 } else {
			//                     while(leftHeight > 0) {
			//                         pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
			//                         leftHeight -= pageHeight;
			//                         position -= 841.89;
			//                         //避免添加空白页
			//                         if(leftHeight > 0) {
			//                             pdf.addPage();
			//                         }
			//                     }
			//                 }

			//                 pdf.save($("#ab_ex3").html()+"的"+val+'.pdf'); //
			//             }
			//         });

			// },
			loadData() {
				this.activeName = 'first'
				this.zj = [] //证卷
				this.ck = []
				this.bdc = []
				this.gjjjc = []
				this.gjjjc2 = []
				this.gjjdk = []
				this.gjjdk2 = []
				this.car = []
				this.business = []
				this.byg = []
				this.byg2 = []
				this.income = []
				this.individual = []
				this.investor = []
				this.judicial = []
				this.loseJob = []
				this.loseJob2 = []
				this.marriage = []
				this.organization = []
				this.taxes = []
				this.works = []
				this.works2 = []
				this.college = []
				this.college2 = []
				this.hj = []
				this.hj2 = []
				this.bz = []
				this.info = {}
				this.tableData = []
				this.tableData2 = []
				this.tableData3 = []
				this.zjjxx2 = []
				this.cjxx2 = []
				this.chxxx2 = []
				this.geylfxx2 = []
				this.tkzgxx2 = []
				this.gsxx2 = []
				this.lycyzg2 = []
				this.hyxx2 = []
				this.getBasicData();
				if (this.$route.query.type == "death") {
					this.getData8();
				} else if (this.$route.query.type == "car") {
					this.getData6();
				} else if (this.$route.query.type == "ceo") {
					this.getData7();
				} else if (this.$route.query.type == "deposit") {
					this.getData2();
				} else if (this.$route.query.type == "estate") {
					this.getData3();
				} else if (this.$route.query.type == "individual") {
					this.getData10();
				} else if (this.$route.query.type == "investor") {
					this.getData11();
				} else if (this.$route.query.type == "judicial") {
					this.getData12();
				} else {
					this.getData1();
					this.getData2();
					this.getData3();
					this.getData4();
					this.getData5();
					this.getData6();
					this.getData7();
					this.getData8();
					this.getData9();
					this.getData10();
					this.getData11();
					this.getData12();
					this.getData13();
					this.getData14();
					this.getData15();
					this.getData16();
					this.getData17();
					//getData18();
					this.getData19();
					this.getData20();
					this.getData21();
					this.getData22();
					this.getData23();
					this.getData24();
					this.getData25();
					//getData26();
					this.getData27();
					this.getData28();
				}
			},
			getData1() {
				request({
					headers: {
						'Accept': 'application/json',
					},
					url: '/social/assistance/getBone',
					method: 'post',
					// data:{
					// sId:"57943",
					// },
					data: {
						sId: this.sId
					}
				}).then(res => {
					this.zj = res.response.data;
				}).catch(res => {
					this.zj = res.response.data;
				})

			},
			getData2() {
				request({
					headers: {
						'Accept': 'application/json',
					},
					url: '/social/assistance/getDeposit',
					method: 'post',
					// data:{
					// sId:"57943",
					// },
					data: {
						sId: this.sId
					}
				}).then(res => {

				}).catch(res => {
					this.ck = res.response.data;
					if (this.ck.length > 0) {
						for (let i = 0; i < this.ck.length; i++) {
							var abm_ex3 = unescape(this.ck[i].abm_ex3);
							var d204c230016 = unescape(this.ck[i].d204c230016);
							if (d204c230016 == '0') {
								d204c230016 = '否';
							} else {
								d204c230016 = '是';
							}
							this.ck[i].d204c230016 = d204c230016;


							var d204c230017 = unescape(this.ck[i].d204c230017);
							if (d204c230017 == '0') {
								d204c230017 = '否';
							} else {
								d204c230017 = '是';
							}
							this.ck[i].d204c230017 = d204c230017;
							var ahc_dat2 = unescape(this.ck[i].ahc_dat2) != null ? unescape(this.ck[i].ahc_dat2)
								.substring(0, 10) : '';
							this.ck[i].ahc_dat2 = ahc_dat2
						}
					}

				})

			},
			getData3() {
				request({
					headers: {
						'Accept': 'application/json',
					},
					url: '/social/assistance/getEstate',
					method: 'post',
					// data:{
					// sId:"57943",
					// },
					data: {
						sId: this.sId
					}
				}).then(res => {
					this.bdc = res.response.data;
				}).catch(res => {
					// console.log(res.response.data);
					// res.response.data里面没有sj属性所以会报错，线上有没有用不知道
					if (res.response.data.sj.length > 0) {
						// let json3 = res.response.data.sj.oldData;
						let json3 = res.response.data.sj;
						let datas = [];
						for (var i = 0; i < json3.length; i++) {
							var json = json3[i];
							for (var k in json) {
								if (json[k] == null) {
									json[k] = "";
								}
							}
							datas.push(json);
						}
						this.bdc = datas;
					}
				})

			},
			// ok
			getData4() {
				request({
					headers: {
						'Accept': 'application/json',
					},
					url: '/social/assistance/getFundHand',
					method: 'post',
					// data:{
					// sId:"57943",
					// },
					data: {
						sId: this.sId,
						idcard: this.$route.query.idcard,
						// table:'assistance_basic_member'
					}
				}).then(res => {

				}).catch(res => {
					let json3 = res.response.data.sj;
					let json2 = res.response.data.qj;
					let datas = [];
					let datas2 = [];
					if (json3.length > 0) {
						for (var i = 0; i < json3.length; i++) {
							var json = json3[i];
							for (var k in json) {
								if (json[k] == null) {
									json[k] = "";
								}
							}
							datas.push(json);
						}
						console.log(datas)
						this.gjjjc = datas;
					}
					// let json3 = res.response.data.sj.oldData;
					// let json2 = res.response.data.qj.oldData;
					if (json2.length > 0) {
						for (var i = 0; i < json2.length; i++) {
							var json = json2[i];
							for (var k in json) {
								if (json[k] == null) {
									json[k] = "";
								}
							}
							datas2.push(json);
						}
						this.gjjjc2 = datas2
					}
				})
			},
			getData5() {
				request({
					headers: {
						'Accept': 'application/json',
					},
					url: '/social/assistance/getFund',
					method: 'post',
					// data:{
					// sId:"57943",
					// },
					data: {
						sId: this.sId,
						// table:'assistance_basic_member',
					}
				}).then(res => {}).catch(res => {
					// let json3 = res.response.data.sj.oldData;
					// let json2 = res.response.data.qj.oldData;
					let json3 = res.response.data.sj;
					let json2 = res.response.data.qj;
					let datas = [];
					let datas2 = [];
					if (json3.length > 0) {
						for (var i = 0; i < json3.length; i++) {
							var json = json3[i];
							for (var k in json) {
								if (json[k] == null) {
									json[k] = "";
								}
							}
							datas.push(json);
						}
						console.log(datas)
						this.gjjdk = datas;
					}
					if (json2.length > 0) {
						for (var i = 0; i < json2.length; i++) {
							var json = json2[i];
							for (var k in json) {
								if (json[k] == null) {
									json[k] = "";
								}
							}
							datas2.push(json);
						}
						this.gjjdk2 = datas2
					}
				})
			},
			getData6() {
				request({
					headers: {
						'Accept': 'application/json',
					},
					url: '/social/assistance/getCar',
					method: 'post',
					// data:{
					// sId:"57943",
					// },
					data: {
						sId: this.sId
					}
				}).then(res => {
					this.car = res.response.data;
				}).catch(res => {
					this.car = res.response.data;
				})

			},



			getData7() {
				request({
					headers: {
						'Accept': 'application/json',
					},
					url: '/social/assistance/getCeo',
					method: 'post',
					// data:{
					// sId:"57943",
					// },
					data: {
						sId: this.sId
					}
				}).then(res => {
					this.business = res.response.data;
				}).catch(res => {
					this.business = res.response.data;
				})

			},

			getData8() {
				request({
					headers: {
						'Accept': 'application/json',
					},
					url: '/social/assistance/getByg',
					method: 'post',
					// data:{
					// sId:"57943",
					// },
					data: {
						sId: this.sId
					}
				}).then(res => {}).catch(res => {
					// let json3 = res.response.data.sj.oldData;
					// let json2 = res.response.data.qj.oldData;
					let json3 = res.response.data.sj;
					let json2 = res.response.data.qj;
					let datas = [];
					let datas2 = [];
					if (json3.length > 0) {
						for (var i = 0; i < json3.length; i++) {
							var json = json3[i];
							for (var k in json) {
								if (json[k] == null) {
									json[k] = "";
								}
							}
							datas.push(json);
						}
						console.log(datas)
						this.byg = datas;
					}
					if (json2.length > 0) {
						for (var i = 0; i < json2.length; i++) {
							var json = json2[i];
							for (var k in json) {
								if (json[k] == null) {
									json[k] = "";
								}
							}
							datas2.push(json);
						}
						this.byg2 = datas2
					}
				})

			},
			getData9() {
				request({
					headers: {
						'Accept': 'application/json',
					},
					url: '/social/assistance/getIncome',
					method: 'post',
					// data:{
					// sId:"57943",
					// },
					data: {
						sId: this.sId
					}
				}).then(res => {
					this.income = res.response.data;
				}).catch(res => {
					this.income = res.response.data;
				})
			},
			getData10() {
				request({
					headers: {
						'Accept': 'application/json',
					},
					url: '/social/assistance/getIndividual',
					method: 'post',
					// data:{
					// sId:"57943",
					// },
					data: {
						sId: this.sId
					}
				}).then(res => {
					this.individual = res.response.data;
				}).catch(res => {
					this.individual = res.response.data;
				})
			},

			getData11() {
				request({
					headers: {
						'Accept': 'application/json',
					},
					url: '/social/assistance/getInvestor',
					method: 'post',
					// data:{
					// sId:"57943",
					// },
					data: {
						sId: this.sId
					}
				}).then(res => {
					this.investor = res.response.data;
				}).catch(res => {
					this.investor = res.response.data;
				})
			},

			getData12() {
				request({
					headers: {
						'Accept': 'application/json',
					},
					url: '/social/assistance/getJudicial',
					method: 'post',
					// data:{
					// sId:"57943",
					// },
					data: {
						sId: this.sId
					}
				}).then(res => {
					this.judicial = res.response.data;
				}).catch(res => {
					this.judicial = res.response.data;
				})

			},

			getData13() {
				request({
					headers: {
						'Accept': 'application/json',
					},
					url: '/social/assistance/getLoseJob',
					method: 'post',
					// data:{
					// sId:"57943",
					// },
					data: {
						sId: this.sId
					}
				}).then(res => {}).catch(res => {
					// let json3 = res.response.data.sj.oldData;
					// let json2 = res.response.data.qj.oldData;
					let json3 = res.response.data.sj;
					let json2 = res.response.data.qj;
					let datas = [];
					let datas2 = [];
					if (json3.length > 0) {
						for (var i = 0; i < json3.length; i++) {
							var json = json3[i];
							for (var k in json) {
								if (json[k] == null) {
									json[k] = "";
								}
							}
							datas.push(json);
						}
						console.log(datas)
						this.loseJob = datas;
					}
					if (json2.length > 0) {
						for (var i = 0; i < json2.length; i++) {
							var json = json2[i];
							for (var k in json) {
								if (json[k] == null) {
									json[k] = "";
								}
							}
							datas2.push(json);
						}
						this.loseJob2 = datas2
					}
				})
			},

			getData14() {
				request({
					headers: {
						'Accept': 'application/json',
					},
					url: '/social/assistance/getMarriage',
					method: 'post',
					// data:{
					// sId:"57943",
					// },
					data: {
						sId: this.sId
					}
				}).then(res => {
					this.marriage = res.response.data;
				}).catch(res => {
					this.marriage = res.response.data;
				})
			},
			getData15() {
				request({
					headers: {
						'Accept': 'application/json',
					},
					url: '/social/assistance/getOrganization',
					method: 'post',
					// data:{
					// sId:"57943",
					// },
					data: {
						sId: this.sId
					}
				}).then(res => {
					this.organization = res.response.data;
				}).catch(res => {
					this.organization = res.response.data;
				})
			},

			getData16() {
				request({
					headers: {
						'Accept': 'application/json',
					},
					url: '/social/assistance/getTaxes',
					method: 'post',
					// data:{
					// sId:"57943",
					// },
					data: {
						sId: this.sId
					}
				}).then(res => {
					this.taxes = res.response.data;
				}).catch(res => {
					this.taxes = res.response.data;
				})

			},

			getData17() {
				request({
					headers: {
						'Accept': 'application/json',
					},
					url: '/social/assistance/getWorks',
					method: 'post',
					// data:{
					// sId:"57943",
					// },
					data: {
						sId: this.sId,
						// table:'assistance_basic_member',
					}
				}).then(res => {

				}).catch(res => {
					// let json3 = res.response.data.sj.oldData;
					// let json2 = res.response.data.qj.oldData;
					let json3 = res.response.data.sj;
					let json2 = res.response.data.qj;
					let datas = [];
					let datas2 = [];
					if (json3.length > 0) {
						for (var i = 0; i < json3.length; i++) {
							var json = json3[i];
							for (var k in json) {
								if (json[k] == null) {
									json[k] = "";
								}
							}
							datas.push(json);
						}
						console.log(datas)
						this.works = datas;
					}
					if (json2.length > 0) {
						for (var i = 0; i < json2.length; i++) {
							var json = json2[i];
							for (var k in json) {
								if (json[k] == null) {
									json[k] = "";
								}
							}
							datas2.push(json);
						}
						this.works2 = datas2
					}
				})
			},

			getData18() {
				request({
					headers: {
						'Accept': 'application/json',
					},
					url: '/social/assistance/getCollege',
					method: 'post',
					// data:{
					// sId:"57943",
					// },
					data: {
						sId: this.sId
					}
				}).then(res => {

				}).catch(res => {
					// let json3 = res.response.data.sj.oldData;
					// let json2 = res.response.data.qj.oldData;
					let json3 = res.response.data.sj;
					let json2 = res.response.data.qj;
					let datas = [];
					let datas2 = [];
					if (json3.length > 0) {
						for (var i = 0; i < json3.length; i++) {
							var json = json3[i];
							for (var k in json) {
								if (json[k] == null) {
									json[k] = "";
								}
							}
							datas.push(json);
						}
						console.log(datas)
						this.college = datas;
					}
					if (json2.length > 0) {
						for (var i = 0; i < json2.length; i++) {
							var json = json2[i];
							for (var k in json) {
								if (json[k] == null) {
									json[k] = "";
								}
							}
							datas2.push(json);
						}
						this.college2 = datas2
					}
				})

			},
			getData19() {
				request({
					headers: {
						'Accept': 'application/json',
					},
					url: '/social/assistance/getHJInfo',
					method: 'post',
					// data:{
					// sId:"57943",
					// },
					data: {
						sId: this.sId
					}
				}).then(res => {}).catch(res => {
					// let json3 = res.response.data.sj.oldData;
					// let json2 = res.response.data.qj.oldData;
					let json3 = res.response.data.sj;
					let json2 = res.response.data.qj;
					let datas = [];
					let datas2 = [];
					if (json3.length > 0) {
						for (var i = 0; i < json3.length; i++) {
							var json = json3[i];
							for (var k in json) {
								if (json[k] == null) {
									json[k] = "";
								}
							}
							datas.push(json);
						}
						console.log(datas)
						this.hj = datas;
					}
					if (json2.length > 0) {
						for (var i = 0; i < json2.length; i++) {
							var json = json2[i];
							for (var k in json) {
								if (json[k] == null) {
									json[k] = "";
								}
							}
							datas2.push(json);
						}
						this.hj2 = datas2
					}
				})
				//户籍信息
			},

			getData20() {
				request({
					headers: {
						'Accept': 'application/json',
					},
					url: '/social/assistance/getBZInfo',
					method: 'post',
					// data:{
					// sId:"57943",
					// },
					data: {
						sId: this.sId
					}
				}).then(res => {
					this.bz = res.response.data;
				}).catch(res => {
					this.bz = res.response.data;
				})

			},
			getData21() {
				request({
					headers: {
						'Accept': 'application/json',
					},
					url: '/social/assistance/getZJCX',
					method: 'post',
					// data:{
					// sId:"57943",
					// },
					data: {
						sId: this.sId,
						// table:'assistance_basic_member',
						idcard: this.$route.query.idcard,
					}
				}).then(res => {}).catch(res => {
					// let json2 = res.response.data.qj.oldData;
					let json2 = res.response.data.qj;
					let datas2 = [];
					if (json2.length > 0) {
						for (var i = 0; i < json2.length; i++) {
							var json = json2[i];
							for (var k in json) {
								if (json[k] == null) {
									json[k] = "";
								}
							}
							datas2.push(json);
						}
						this.zjjxx2 = datas2
					}
				})

			},
			getData22() {
				request({
					headers: {
						'Accept': 'application/json',
					},
					url: '/social/assistance/getDisableder',
					method: 'post',
					// data:{
					// sId:"57943",
					// },
					data: {
						sId: this.sId,
						// table:'assistance_basic_member',
						idcard: this.$route.query.idcard,
					}
				}).then(res => {}).catch(res => {
					// let json2 = res.response.data.qj.oldData;
					let json2 = res.response.data.qj;
					let datas2 = [];
					if (json2.length > 0) {
						for (var i = 0; i < json2.length; i++) {
							var json = json2[i];
							for (var k in json) {
								if (json[k] == null) {
									json[k] = "";
								}
							}
							datas2.push(json);
						}
						this.cjxx2 = datas2
					}
				})

			},
			getData23() {
				request({
					headers: {
						'Accept': 'application/json',
					},
					url: '/social/assistance/getCHXXX',
					method: 'post',
					// data:{
					// sId:"57943",
					// },
					data: {
						sId: this.sId,
						idcard: this.$route.query.idcard,
					}
				}).then(res => {}).catch(res => {
					// let json2 = res.response.data.qj.oldData;
					let json2 = res.response.data.qj;
					let datas2 = [];
					if (json2.length > 0) {
						for (var i = 0; i < json2.length; i++) {
							var json = json2[i];
							for (var k in json) {
								if (json[k] == null) {
									json[k] = "";
								}
							}
							datas2.push(json);
						}
						this.chxxx2 = datas2
					}
				})
			},
			getData24() {
				request({
					headers: {
						'Accept': 'application/json',
					},
					url: '/social/assistance/getGEYLF',
					method: 'post',
					// data:{
					// sId:"57943",
					// },
					data: {
						sId: this.sId,
						idcard: this.$route.query.idcard,
					}
				}).then(res => {}).catch(res => {
					// let json2 = res.response.data.qj.oldData;
					let json2 = res.response.data.qj;
					let datas2 = [];
					if (json2.length > 0) {
						for (var i = 0; i < json2.length; i++) {
							var json = json2[i];
							for (var k in json) {
								if (json[k] == null) {
									json[k] = "";
								}
							}
							datas2.push(json);
						}
						this.geylfxx2 = datas2
					}
				})
			},
			getData25() {
				request({
					headers: {
						'Accept': 'application/json',
					},
					url: '/social/assistance/getTKZG',
					method: 'post',
					// data:{
					// sId:"57943",
					// },
					data: {
						sId: this.sId,
						idcard: this.$route.query.idcard,
					}
				}).then(res => {}).catch(res => {
					// let json2 = res.response.data.qj.oldData;
					let json2 = res.response.data.qj;
					let datas2 = [];
					if (json2.length > 0) {
						for (var i = 0; i < json2.length; i++) {
							var json = json2[i];
							for (var k in json) {
								if (json[k] == null) {
									json[k] = "";
								}
							}
							datas2.push(json);
						}
						this.tkzgxx2 = datas2
					}
				})
			},
			getData26() {
				request({
					headers: {
						'Accept': 'application/json',
					},
					url: '/social/assistance/getGSXX',
					method: 'post',
					// data:{
					// sId:"57943",
					// },
					data: {
						sId: this.sId,
						idcard: this.$route.query.idcard,
					}
				}).then(res => {}).catch(res => {
					// let json2 = res.response.data.qj.oldData;
					let json2 = res.response.data.qj;
					let datas2 = [];
					if (json2.length > 0) {
						for (var i = 0; i < json2.length; i++) {
							var json = json2[i];
							for (var k in json) {
								if (json[k] == null) {
									json[k] = "";
								}
							}
							datas2.push(json);
						}
						this.gsxx2 = datas2
					}
				})
			},
			getData27() {
				request({
					headers: {
						'Accept': 'application/json',
					},
					url: '/social/assistance/getLYCY',
					method: 'post',
					// data:{
					// sId:"57943",
					// },
					data: {
						sId: this.sId,
						idcard: this.$route.query.idcard,
					}
				}).then(res => {}).catch(res => {
					// let json2 = res.response.data.qj.oldData;
					let json2 = res.response.data.qj;
					let datas2 = [];
					if (json2.length > 0) {
						for (var i = 0; i < json2.length; i++) {
							var json = json2[i];
							for (var k in json) {
								if (json[k] == null) {
									json[k] = "";
								}
							}
							datas2.push(json);
						}
						this.lycyzg2 = datas2
					}
				})
			},
			getData28() {
				request({
					headers: {
						'Accept': 'application/json',
					},
					url: '/social/assistance/getQJHYXX',
					method: 'post',
					// data:{
					// sId:"57943",
					// },
					data: {
						sId: this.sId,
						idcard: this.$route.query.idcard,
					}
				}).then(res => {}).catch(res => {
					// let json2 = res.response.data.qj.oldData;
					// let json2s = res.response.data.qj2.oldData;
					let json2 = res.response.data.qj;
					let json2s = res.response.data.qjs;
					// res.response.data里面没有qsj属性所以会报错，线上有没有用不知道
					// console.log(json2s);
					let datas2 = [];
					let datas2s = [];
					if (json2.length > 0) {
						for (var i = 0; i < json2.length; i++) {
							var json = json2[i];
							for (var k in json) {
								if (json[k] == null) {
									json[k] = "";
								}
							}
							datas2.push(json);
						}
					}
					if (json2s.length > 0) {
						for (var i = 0; i < json2s.length; i++) {
							var json = json2s[i];
							for (var k in json) {
								if (json[k] == null) {
									json[k] = "";
								}
							}
							datas2s.push(json);
						}
					}
					this.hyxx2 = [...datas2, ...datas2s]
				})
			},
			getBasicData() {
				request({
					url: '/social/assistance/getBasicDataByIdCard',
					method: 'post',
					data: {
						sId: this.$route.query.sId,
						// table:'assistance_basic_member',
						// table:'assistance_hdapi_child',
						// 应该不是写死
						// table:this.$route.query.table,
					}
				}).then(rs => {

				}).catch(res => {
					let json3 = res.response.data;
					if (json3[0].ab_ex3 == null || json3[0].ab_ex3 == '' || json3[0].ab_ex3 == 'undefined') {
						this.info = {
							'ab_ex3': json3[0].abm_ex3,
							'ab_ex85': json3[0].ab_ex85,
							'ab_ex13': json3[0].ab_ex13,
							'ab_ex7': json3[0].ab_ex7,
							'ab_dat3': json3[0].ab_dat3
						};
					} else {
						this.info = {
							'ab_ex3': json3[0].ab_ex3,
							'ab_ex85': json3[0].ab_ex85,
							'ab_ex13': json3[0].ab_ex13,
							'ab_ex7': json3[0].ab_ex7,
							'ab_dat3': json3[0].ab_dat3
						};
					}
					let datas = [];
					let datas2 = [];
					let sSfzs = ''
					for (var i = 0; i < json3.length; i++) {
						var json = json3[i];
						sSfzs += json.abm_ex2 + ','
						if (json.abm_ex6 == 'Y') {
							datas.push(json);
						} else {
							datas2.push(json);
						}
					}
					this.tableData = datas;
					this.tableData2 = datas2;
					request({
						url: '/social/assistance/getCxxxDataByIdCard',
						method: 'post',
						data: {
							sSfzs: sSfzs,
							// table:'assistance_basic_member',
							// 应该不是写死
							// table:this.$route.query.table,
						}
					}).then(rs => {

					}).catch(rs => {
						let json33 = rs.response.data
						this.tableData3 = json33

					})

				})


			}
		}
	}
</script>

<style scoped>
	.g-box {
		height: 80VH !important;
		overflow: auto !important;
	}
</style>
<style>
	@media print {
		@page{
			/* size: auto;
			size: portrait;
			margin: 0; */
			/* 删除打印页眉页脚 */
			margin-bottom: 0mm;
			margin-top: 0mm;
		}
		body{
			/* color: #006600; */
			height : auto;
		}
	}
</style>

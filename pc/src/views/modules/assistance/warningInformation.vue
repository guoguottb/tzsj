<template>
	<div class="g-box">
		<div class="g-box2">
			<!-- <el-dialog :title="titles" @close='close' :visible.sync="centerDialogVisible2" width="80%" height="60VH" center>
				<router-view @closes="closes" ref="routers"></router-view>
			</el-dialog> -->
			<el-dialog :title="titles" :visible.sync="centerDialogVisible" width="80%" center>
					<common-list2 style="height: 63vh !important;" :sKey2="sKeyNum" :searchParam="searchParam"></common-list2>
			</el-dialog>
			<div class="info2" style="">
				<h3 class="line_blue" id="pageg1">&emsp;共性救助预警</h3>
				<div class="lineSt"></div>
				<div class="top_1">
					<div class="top_2">
						<!-- 后期优化可以遍历设置 -->
						<el-row :gutter="20">
							<el-col :span="4">
								<div style="text-align: center;cursor: pointer;" @click="openDialog(280,'新增申请提示')">
									<el-badge :value="num.sqNum" :max="99" v-if='num.sqNum>0' style="position:absolute;left: 10%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.sqNum>0?imgUrl2:imgUrl'></el-image>
										<!-- 先加载图片出来，不然请求太多会出现图片加载太慢 -->
										<el-image style="width: 100%;height: 100%; display: none;" :src='imgUrl'></el-image>
										<el-image style="width: 100%;height: 100%; display: none;" :src='imgUrl2'></el-image>
									</el-col>
									<el-col>
										新增申请提示
									</el-col>
								</div>
							</el-col>
							<el-col :span="4">
								<div style="text-align: center;cursor: pointer;" @click="openDialog(281,'新增核查提示')">
									<el-badge :value="num.hcNum" v-if="num.hcNum" :max="99" style="position:absolute;left: 27%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.hcNum>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										新增核查提示
									</el-col>
								</div>
							</el-col>
							<el-col :span="4">
								<div style="text-align: center;cursor: pointer;" @click="openDialog(282,'新增审批提示')">
									<el-badge :value="num.spNum" :max="99" v-if='num.spNum>0' style="position:absolute;left: 44%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.spNum>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										新增审批提示
									</el-col>
								</div>
							</el-col>
							<el-col :span="4">
								<div style="text-align: center;cursor: pointer;" @click="openDialog(283,'办理超时预警')">
									<el-badge :value="num.csNum" :max="99" v-if='num.csNum>0' style="position:absolute;left: 60%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.csNum>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										办理超时预警
									</el-col>
								</div>
							</el-col>
							<el-col :span="4">
								<div style="text-align: center;cursor: pointer;" @click="openDialog(371,'基本保障重复对比')">
									<el-badge :value="num.jbbzcfNum" :max="99" v-if='num.jbbzcfNum>0' style="position:absolute;left: 77%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.jbbzcfNum>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										基本保障重复对比
									</el-col>
								</div>
							</el-col>
							<!-- <el-col :span="4">
								<div style="text-align: center;cursor: pointer;" @click="openDialog(304,'高额医疗费预警')">
									<el-badge :value="num.ylfNum" :max="99" v-if='num.ylfNum>0' style="position:absolute;left: 77%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.ylfNum>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										高额医疗费预警
									</el-col>
								</div>
							</el-col> -->
							<el-col :span="4">
								<div style="text-align: center;cursor: pointer;" @click="openDialog(297,'个性化预警')">
									<el-badge :value="num.autoPush" :max="99" v-if='num.autoPush>0' style="position:absolute;left: 94%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.autoPush>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										个性化预警
									</el-col>
								</div>
							</el-col>
						</el-row>
						<el-row :gutter="20" style="padding-top: 20px;">
							<!-- 其他救助先隐藏 -->
							<!-- <el-col :span="4">
								<div style="text-align: center;cursor: pointer;" @click="openDialog(375,'其他救助重复对比')">
									<el-badge :value="num.qtjzNum" :max="99" v-if='num.qtjzNum>0' style="position:absolute;left: 10%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.qtjzNum>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										其他救助重复对比
									</el-col>
								</div>
							</el-col> -->
							<!-- <el-col :span="4">
								<div style="text-align: center;cursor: pointer;" @click="openDialog(374,'护理补贴重复对比')">
									<el-badge :value="num.chxcfNum" :max="99" v-if='num.chxcfNum>0' style="position:absolute;left: 27%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.chxcfNum>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										护理补贴重复对比
									</el-col>
								</div>
							</el-col>
							<el-col :span="4">
								<div style="text-align: center;cursor: pointer;" @click="openDialog(517,'新增重残预警')">
									<el-badge :value="num.xzzcNum" :max="99" v-if='num.xzzcNum>0' style="position:absolute;left: 60%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.xzzcNum>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										新增重残预警
									</el-col>
								</div>
							</el-col>
							<el-col :span="4">
								<div style="text-align: center;cursor: pointer;" @click="openDialog(756,'火灾预警')">
									<el-badge :value="num.hzyjNum" :max="99" v-if='num.hzyjNum>0' style="position:absolute;left: 77%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.hzyjNum>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										火灾预警
									</el-col>
								</div>
							</el-col> -->
						</el-row>
					</div>
				</div>
				
				<h3 class="line_blue" id="pageg2">&emsp;城乡低保预警</h3>
				<div class="lineSt"></div>
				<div class="top_1">
					<div class="top_2">
						<el-row :gutter="20">
							<el-col :span="4">
								<div style="text-align: center;cursor: pointer;" @click="openDialog(390,'新增申请预警','ayj_ex10:低保')">
									<el-badge :value="num.dbSq" :max="99" v-if='num.dbSq>0' style="position:absolute;left: 10%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.dbSq>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										新增申请预警
									</el-col>
								</div>
							</el-col>
							<el-col :span="4">
								<div style="text-align: center;cursor: pointer;" @click="openDialog(463,'新增核查预警','ayj_ex10:低保')">
									<el-badge :value="num.dbHc" v-if="num.dbHc" :max="99" style="position:absolute;left: 27%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.dbHc>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										新增核查预警
									</el-col>
								</div>
							</el-col>
							<el-col :span="4">
								<div style="text-align: center;cursor: pointer;" @click="openDialog(391,'新增审批预警','ayj_ex10:低保')">
									<el-badge :value="num.dbSp" :max="99" v-if='num.dbSp>0' style="position:absolute;left: 44%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.dbSp>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										新增审批预警
									</el-col>
								</div>
							</el-col>
							<el-col :span="4">
								<div style="text-align: center;cursor: pointer;" @click="openDialog(392,'督办提醒预警','ayj_ex10:低保')">
									<el-badge :value="num.dbDbtx" :max="99" v-if='num.dbDbtx>0' style="position:absolute;left: 60%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.dbDbtx>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										督办提醒预警
									</el-col>
								</div>
							</el-col>
							<el-col :span="4">
								<div style="text-align: center;cursor: pointer;" @click="openDialog(744,'公示期满预警','ab_ex13:低保')">
									<el-badge :value="num.gsDb" :max="99" v-if='num.gsDb>0' style="position:absolute;left: 77%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.gsDb>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										公示期满预警
									</el-col>
								</div>
							</el-col>
							<el-col :span="4">
								<div style="text-align: center;cursor: pointer;" @click="openDialog(385,'个性化预警','ayj_ex10:低保')">
									<el-badge :value="num.dbQt" v-if="num.dbQt" :max="99" style="position:absolute;left: 94%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.dbQt>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										个性化预警
									</el-col>
								</div>
							</el-col>
							<!-- <el-col :span="4">
								<div style="text-align: center;cursor: pointer;" @click="openDialog(747,'人口户籍变动预警','ab_ex13:低保')">
									<el-badge :value="num.hjDb" :max="99" v-if='num.hjDb>0' style="position:absolute;left: 94%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.hjDb>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										人口户籍变动预警
									</el-col>
								</div>
							</el-col> -->
						</el-row>
						<!-- <el-row :gutter="20">
							<el-col :span="4">
								<div style="text-align: center;cursor: pointer;" @click="openDialog(734,'火花信息预警')">
									<el-badge :value="num.hhDb" :max="99" v-if='num.hhDb>0' style="position:absolute;left: 10%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.hhDb>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										火花信息预警
									</el-col>
								</div>
							</el-col>
							<el-col :span="4">
								<div style="text-align: center;cursor: pointer;" >
									<el-badge :value="num.dbnum8" v-if="num.dbnum8" :max="99" style="position:absolute;left: 27%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.dbnum8>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										就业变动预警
									</el-col>
								</div>
							</el-col>
							<el-col :span="4">
								<div style="text-align: center;cursor: pointer;" @click="openDialog(294,'学生毕业预警','ab_ex13:低保')">
									<el-badge :value="num.byNum" :max="99" v-if='num.byNum>0' style="position:absolute;left: 44%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.byNum>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										学生毕业预警
									</el-col>
								</div>
							</el-col>
							<el-col :span="4">
								<div style="text-align: center;cursor: pointer;" @click="openDialog(749,'新增重病预警')">
									<el-badge :value="num.dbZb" :max="99" v-if='num.dbZb>0' style="position:absolute;left: 60%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.dbZb>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										新增重病预警
									</el-col>
								</div>
							</el-col>
							<el-col :span="4">
								<div style="text-align: center;cursor: pointer;">
									<el-badge :value="num.dbnum11" :max="99" v-if='num.dbnum11>0' style="position:absolute;left: 77%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.dbnum11>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										社保享受预警
									</el-col>
								</div>
							</el-col>
							<el-col :span="4">
								<div style="text-align: center;cursor: pointer;">
									<el-badge :value="num.dbnum12" :max="99" v-if='num.dbnum12>0' style="position:absolute;left: 94%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.dbnum12>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										重病康复预警
									</el-col>
								</div>
							</el-col>
						</el-row> -->
						<el-row :gutter="20">
							<!-- <el-col :span="4">
								<div style="text-align: center;cursor: pointer;">
									<el-badge :value="num.dbnum13" :max="99" v-if='num.dbnum13>0' style="position:absolute;left: 10%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.dbnum13>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										服刑信息预警
									</el-col>
								</div>
							</el-col> -->
							<el-col :span="4">
								<div style="text-align: center;cursor: pointer;" @click="openDialog(763,'基本保障重复对比')">
									<el-badge :value="num.jbbzcfDBNum" :max="99" v-if='num.jbbzcfDBNum>0' style="position:absolute;left: 10%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.jbbzcfDBNum>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										基本保障重复对比
									</el-col>
								</div>
							</el-col>
							<!-- 其他救助先隐藏 -->
							<!-- <el-col :span="4">
								<div style="text-align: center;cursor: pointer;" @click="openDialog(758,'其他救助重复对比','ayj_ex29:低保')">
									<el-badge :value="num.qtjzDBNum" :max="99" v-if='num.qtjzDBNum>0' style="position:absolute;left: 27%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.qtjzDBNum>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										其他救助重复对比
									</el-col>
								</div>
							</el-col> -->
							<!-- <el-col :span="4">
								<div style="text-align: center;cursor: pointer;" @click="openDialog(295,'满18周岁预警','ab_ex13:低保;abm_ex42:是')">
									<el-badge :value="num.db18" :max="99" v-if='num.db18>0' style="position:absolute;left: 77%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.db18>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										满18周岁预警
									</el-col>
								</div>
							</el-col>
							<el-col :span="4">
								<div style="text-align: center;cursor: pointer;" @click="openDialog(296,'满60周岁预警','ab_ex13:低保')">
									<el-badge :value="num.db60" :max="99" v-if='num.db60>0' style="position:absolute;left: 94%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.db60>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										满60周岁预警
									</el-col>
								</div>
							</el-col> -->
						</el-row>
						<!-- <el-row :gutter="20">
							<el-col :span="4">
								<div style="text-align: center;cursor: pointer;" @click="openDialog(328,'残疾等级变动预警','ab_ex13:低保;abm_ex42:是')">
									<el-badge :value="num.cjdjbdDB" :max="99" v-if='num.cjdjbdDB>0' style="position:absolute;left: 10%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.cjdjbdDB>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										残疾等级变动预警
									</el-col>
								</div>
							</el-col>
							<el-col :span="4">
								<div style="text-align: center;cursor: pointer;" @click="openDialog(478,'残疾人享受增发预警')">
									<el-badge :value="num.CJRXSZFNum" v-if="num.CJRXSZFNum" :max="99" style="position:absolute;left: 27%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.CJRXSZFNum>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										残疾人享受增发预警
									</el-col>
								</div>
							</el-col>
						</el-row> -->
					</div>
				</div>
				
				<h3 class="line_blue" id="pageg3">&emsp;特困供养预警</h3>
				<div class="lineSt"></div>
				<div class="top_1">
					<div class="top_2">
						<el-row :gutter="20">
							<el-col :span="4">
								<div style="text-align: center;cursor: pointer;" @click="openDialog(390,'新增申请预警','ayj_ex10:特困供养')">
									<el-badge :value="num.tkSq" :max="99" v-if='num.tkSq>0' style="position:absolute;left: 10%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.tkSq>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										新增申请预警
									</el-col>
								</div>
							</el-col>
							<el-col :span="4">
								<div style="text-align: center;cursor: pointer;" @click="openDialog(463,'新增核查预警','ayj_ex10:特困供养')">
									<el-badge :value="num.tkHc" v-if="num.tkHc" :max="99" style="position:absolute;left: 27%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.tkHc>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										新增核查预警
									</el-col>
								</div>
							</el-col>
							<el-col :span="4">
								<div style="text-align: center;cursor: pointer;" @click="openDialog(391,'新增审批预警','ayj_ex10:特困供养')">
									<el-badge :value="num.tkSp" :max="99" v-if='num.tkSp>0' style="position:absolute;left: 44%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.tkSp>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										新增审批预警
									</el-col>
								</div>
							</el-col>
							<el-col :span="4">
								<div style="text-align: center;cursor: pointer;" @click="openDialog(392,'督办提醒预警','ayj_ex10:特困供养')">
									<el-badge :value="num.tkDbtx" :max="99" v-if='num.tkDbtx>0' style="position:absolute;left: 60%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.tkDbtx>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										督办提醒预警
									</el-col>
								</div>
							</el-col>
							<!-- <el-col :span="4">
								<div style="text-align: center;cursor: pointer;" @click="openDialog(295,'满18周岁预警','ab_ex13:特困供养;abm_ex1:户主本人')">
									<el-badge :value="num.tk18" :max="99" v-if='num.tk18>0' style="position:absolute;left: 77%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.tk18>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										满18周岁预警
									</el-col>
								</div>
							</el-col> -->
							<el-col :span="4">
								<div style="text-align: center;cursor: pointer;" @click="openDialog(385,'个性化预警','ayj_ex10:特困供养')">
									<el-badge :value="num.tkQt" :max="99" v-if='num.tkQt>0' style="position:absolute;left: 77%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.tkQt>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										个性化预警
									</el-col>
								</div>
							</el-col>
							<el-col :span="4">
								<div style="text-align: center;cursor: pointer;" @click="openDialog(744,'公示期满预警','ab_ex13:特困供养')">
									<el-badge :value="num.gsTkgsTk" :max="99" v-if='num.gsTkgsTk>0' style="position:absolute;left: 94%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.gsTkgsTk>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										公示期满预警
									</el-col>
								</div>
							</el-col>
						</el-row>
						<!-- <el-row :gutter="20">
							<el-col :span="4">
								<div style="text-align: center;cursor: pointer;">
									<el-badge :value="num.tknum7" :max="99" v-if='num.tknum7>0' style="position:absolute;left: 10%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.tknum7>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										自理能力评估预警
									</el-col>
								</div>
							</el-col>
							<el-col :span="4">
								<div style="text-align: center;cursor: pointer;" @click="openDialog(736,'火花信息预警')">
									<el-badge :value="num.hhTk" v-if="num.hhTk" :max="99" style="position:absolute;left: 27%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.hhTk>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										火花信息预警
									</el-col>
								</div>
							</el-col>
							<el-col :span="4">
								<div style="text-align: center;cursor: pointer;">
									<el-badge :value="num.tknum9" :max="99" v-if='num.tknum9>0' style="position:absolute;left: 44%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.tknum9>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										康复信息预警
									</el-col>
								</div>
							</el-col>
							<el-col :span="4">
								<div style="text-align: center;cursor: pointer;">
									<el-badge :value="num.tknum10" :max="99" v-if='num.tknum10>0' style="position:absolute;left: 60%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.tknum10>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										服刑信息预警
									</el-col>
								</div>
							</el-col>
							<el-col :span="4">
								<div style="text-align: center;cursor: pointer;">
									<el-badge :value="num.tknum11" :max="99" v-if='num.tknum11>0' style="position:absolute;left: 77%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.tknum11>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										财产收入状况变动预警
									</el-col>
								</div>
							</el-col>
							<el-col :span="4">
								<div style="text-align: center;cursor: pointer;" @click="openDialog(360,'婚姻信息预警','ab_ex13:特困供养')">
									<el-badge :value="num.hytk" :max="99" v-if='num.hytk>0' style="position:absolute;left: 94%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.hytk>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										婚姻信息预警
									</el-col>
								</div>
							</el-col>
						</el-row> -->
						<el-row :gutter="20">
							<el-col :span="4">
								<div style="text-align: center;cursor: pointer;" @click="openDialog(764,'基本保障重复对比')">
									<el-badge :value="num.jbbzcfTKNum" v-if="num.jbbzcfTKNum" :max="99" style="position:absolute;left: 10%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.jbbzcfTKNum>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										基本保障重复对比
									</el-col>
								</div>
							</el-col>
							<!-- <el-col :span="4">
								<div style="text-align: center;cursor: pointer;" @click="openDialog(471,'护理补贴重复对比','ar_ex8:特困供养;ar_ex10:护理补贴重复对比')">
									<el-badge :value="num.chxcfTKNum" :max="99" v-if='num.chxcfTKNum>0' style="position:absolute;left: 44%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.chxcfTKNum>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										护理补贴重复对比
									</el-col>
								</div>
							</el-col> -->
							<!-- 其他救助先隐藏 -->
							<!-- <el-col :span="4">
								<div style="text-align: center;cursor: pointer;" @click="openDialog(759,'其他救助重复对比','ayj_ex29:特困供养')">
									<el-badge :value="num.qtjzTKNum" :max="99" v-if='num.qtjzTKNum>0' style="position:absolute;left: 27%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.qtjzTKNum>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										其他救助重复对比
									</el-col>
								</div>
							</el-col> -->
						</el-row>
					</div>
				</div>
				
				<h3 class="line_blue" id="pageg4">&emsp;低收入家庭预警</h3>
				<div class="lineSt"></div>
				<div class="top_1">
					<div class="top_2">
						<el-row :gutter="20">
							<el-col :span="4">
								<div style="text-align: center;cursor: pointer;" @click="openDialog(390,'新增申请预警','ayj_ex10:低收入家庭')">
									<el-badge :value="num.bySq" :max="99" v-if='num.bySq>0' style="position:absolute;left: 10%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.bySq>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										新增申请预警
									</el-col>
								</div>
							</el-col>
							<el-col :span="4">
								<div style="text-align: center;cursor: pointer;" @click="openDialog(463,'新增核查预警','ayj_ex10:低收入家庭')">
									<el-badge :value="num.byHc" v-if="num.byHc" :max="99" style="position:absolute;left: 27%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.byHc>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										新增核查预警
									</el-col>
								</div>
							</el-col>
							<el-col :span="4">
								<div style="text-align: center;cursor: pointer;" @click="openDialog(391,'新增审批预警','ayj_ex10:低收入家庭')">
									<el-badge :value="num.bySp" :max="99" v-if='num.bySp>0' style="position:absolute;left: 44%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.bySp>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										新增审批预警
									</el-col>
								</div>
							</el-col>
							<el-col :span="4">
								<div style="text-align: center;cursor: pointer;" @click="openDialog(392,'督办提醒预警','ayj_ex10:低收入家庭')">
									<el-badge :value="num.byDbtx" :max="99" v-if='num.byDbtx>0' style="position:absolute;left: 60%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.byDbtx>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										督办提醒预警
									</el-col>
								</div>
							</el-col>
							<el-col :span="4">
								<div style="text-align: center;cursor: pointer;" @click="openDialog(385,'个性化预警','ayj_ex10:低收入家庭')">
									<el-badge :value="num.byQt" :max="99" v-if='num.byQt>0' style="position:absolute;left: 77%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.byQt>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										个性化预警
									</el-col>
								</div>
							</el-col>
							<el-col :span="4">
								<div style="text-align: center;cursor: pointer;" @click="openDialog(765,'基本保障重复对比')">
									<el-badge :value="num.jbbzcfBYNum" :max="99" v-if='num.jbbzcfBYNum>0' style="position:absolute;left: 94%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.jbbzcfBYNum>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										基本保障重复对比
									</el-col>
								</div>
							</el-col>
							<!-- <el-col :span="4">
								<div style="text-align: center;cursor: pointer;" @click="openDialog(748,'人口户籍变动预警','ab_ex13:家庭边缘')">
									<el-badge :value="num.hjBy" :max="99" v-if='num.hjBy>0' style="position:absolute;left: 77%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.hjBy>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										人口户籍变动预警
									</el-col>
								</div>
							</el-col> -->
							<!-- <el-col :span="4">
								<div style="text-align: center;cursor: pointer;" @click="openDialog(293,'火花信息预警','ab_ex13:低收入家庭')">
									<el-badge :value="num.hhBy" :max="99" v-if='num.hhBy>0' style="position:absolute;left: 94%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.hhBy>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										火花信息预警
									</el-col>
								</div>
							</el-col> -->
						</el-row>
						<el-row :gutter="20">
							<!-- <el-col :span="4">
								<div style="text-align: center;cursor: pointer;">
									<el-badge :value="num.dsrnum7" :max="99" v-if='num.dsrnum7>0' style="position:absolute;left: 10%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.dsrnum7>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										就业变动预警
									</el-col>
								</div>
							</el-col> -->
							<!-- <el-col :span="4">
								<div style="text-align: center;cursor: pointer;">
									<el-badge :value="num.dsrnum8" v-if="num.dsrnum8" :max="99" style="position:absolute;left: 27%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.dsrnum8>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										财产收入状况变动预警
									</el-col>
								</div>
							</el-col> -->
							<!-- 其他救助先隐藏 -->
							<!-- <el-col :span="4">
								<div style="text-align: center;cursor: pointer;" @click="openDialog(760,'其他救助重复对比','ayj_ex29:低收入家庭')">
									<el-badge :value="num.qtjzBYNum" :max="99" v-if='num.qtjzBYNum>0' style="position:absolute;left: 10%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.qtjzBYNum>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										其他救助重复对比
									</el-col>
								</div>
							</el-col> -->
						</el-row>
					</div>
				</div>
				
				<h3 class="line_blue" id="pageg5">&emsp;临时救助预警</h3>
				<div class="lineSt"></div>
				<div class="top_1">
					<div class="top_2">
						<el-row :gutter="20">
							<el-col :span="4">
								<div style="text-align: center;cursor: pointer;" @click="openDialog(390,'新增申请预警','ayj_ex10:临时救助')">
									<el-badge :value="num.lsSq" :max="99" v-if='num.lsSq>0' style="position:absolute;left: 10%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.lsSq>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										新增申请预警
									</el-col>
								</div>
							</el-col>
							<el-col :span="4">
								<div style="text-align: center;cursor: pointer;" @click="openDialog(463,'新增核查预警','ayj_ex10:临时救助')">
									<el-badge :value="num.lsHc" v-if="num.lsHc" :max="99" style="position:absolute;left: 27%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.lsHc>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										新增核查预警
									</el-col>
								</div>
							</el-col>
							<el-col :span="4">
								<div style="text-align: center;cursor: pointer;" @click="openDialog(391,'新增审批预警','ayj_ex10:临时救助')">
									<el-badge :value="num.lsSp" :max="99" v-if='num.lsSp>0' style="position:absolute;left: 44%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.lsSp>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										新增审批预警
									</el-col>
								</div>
							</el-col>
							<el-col :span="4">
								<div style="text-align: center;cursor: pointer;" @click="openDialog(392,'督办提醒预警','ayj_ex10:临时救助')">
									<el-badge :value="num.lsDbtx" :max="99" v-if='num.lsDbtx>0' style="position:absolute;left: 60%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.lsDbtx>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										督办提醒预警
									</el-col>
								</div>
							</el-col>
							<el-col :span="4">
								<div style="text-align: center;cursor: pointer;" @click="openDialog(475,'核对信息预警','ab_ex13:临时救助')">
									<el-badge :value="num.hdLs" :max="99" v-if='num.hdLs>0' style="position:absolute;left: 77%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.hdLs>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										核对信息预警
									</el-col>
								</div>
							</el-col>
							<el-col :span="4">
								<div style="text-align: center;cursor: pointer;" @click="openDialog(385,'个性化预警','ayj_ex10:临时救助')">
									<el-badge :value="num.lsQt" :max="99" v-if='num.lsQt>0' style="position:absolute;left: 94%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.lsQt>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										个性化预警
									</el-col>
								</div>
							</el-col>
							<!-- <el-col :span="4">
								<div style="text-align: center;cursor: pointer;">
									<el-badge :value="num.lsnum6" :max="99" v-if='num.lsnum6>0' style="position:absolute;left: 94%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.lsnum6>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										灾害信息预警
									</el-col>
								</div>
							</el-col> -->
						</el-row>
						<el-row :gutter="20">
							<!-- <el-col :span="4">
								<div style="text-align: center;cursor: pointer;">
									<el-badge :value="num.lsnum7" :max="99" v-if='num.lsnum7>0' style="position:absolute;left: 10%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.lsnum7>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										新增重病预警
									</el-col>
								</div>
							</el-col>
							<el-col :span="4">
								<div style="text-align: center;cursor: pointer;">
									<el-badge :value="num.lsnum8" v-if="num.lsnum8" :max="99" style="position:absolute;left: 27%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.lsnum8>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										建档立卡扶贫预警
									</el-col>
								</div>
							</el-col> -->
							<!-- 其他救助先隐藏 -->
							<!-- <el-col :span="4">
								<div style="text-align: center;cursor: pointer;" @click="openDialog(762,'其他救助重复对比','jz:临时救助;ayj_ex29:临时救助')">
									<el-badge :value="num.qtjzLSNum" :max="99" v-if='num.qtjzLSNum>0' style="position:absolute;left: 10%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.qtjzLSNum>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										其他救助重复对比
									</el-col>
								</div>
							</el-col> -->
						</el-row>
					</div>
				</div>
				
				<!-- <h3 class="line_blue" id="page6">&emsp;其他救助预警</h3>
				<div class="lineSt"></div>
				<div class="top_1">
					<div class="top_2">
						<el-row :gutter="20">
							<el-col :span="4">
								<div style="text-align: center;cursor: pointer;" @click="openDialog(390,'新增申请预警','ayj_ex10:其他救助')">
									<el-badge :value="num.qtjzSq" :max="99" v-if='num.qtjzSq>0' style="position:absolute;left: 10%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.qtjzSq>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										新增申请预警
									</el-col>
								</div>
							</el-col>
							<el-col :span="4">
								<div style="text-align: center;cursor: pointer;" @click="openDialog(463,'新增核查预警','ayj_ex10:其他救助')">
									<el-badge :value="num.qtjzHc" v-if="num.qtjzHc" :max="99" style="position:absolute;left: 27%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.qtjzHc>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										新增核查预警
									</el-col>
								</div>
							</el-col>
							<el-col :span="4">
								<div style="text-align: center;cursor: pointer;" @click="openDialog(391,'新增审批预警','ayj_ex10:其他救助')">
									<el-badge :value="num.qtjzSp" :max="99" v-if='num.qtjzSp>0' style="position:absolute;left: 44%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.qtjzSp>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										新增审批预警
									</el-col>
								</div>
							</el-col>
							<el-col :span="4">
								<div style="text-align: center;cursor: pointer;" @click="openDialog(392,'督办提醒预警','ayj_ex10:其他救助')">
									<el-badge :value="num.qtjzDbtx" :max="99" v-if='num.qtjzDbtx>0' style="position:absolute;left: 60%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.qtjzDbtx>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										督办提醒预警
									</el-col>
								</div>
							</el-col>
							<el-col :span="4">
								<div style="text-align: center;cursor: pointer;" @click="openDialog(385,'个性化预警','ayj_ex10:其他救助')">
									<el-badge :value="num.qtjzQt" :max="99" v-if='num.qtjzQt>0' style="position:absolute;left: 77%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.qtjzQt>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										个性化预警
									</el-col>
								</div>
							</el-col>
							<el-col :span="4">
								<div style="text-align: center;cursor: pointer;" @click="openDialog(762,'其他救助重复对比','jz:其他救助;ayj_ex29:其他救助')">
									<el-badge :value="num.qtjzQTNum" :max="99" v-if='num.qtjzQTNum>0' style="position:absolute;left: 94%;">
									</el-badge>
									<el-col>
										<el-image style="width: 100%;height: 100%;" :src='num.qtjzQTNum>0?imgUrl2:imgUrl'></el-image>
									</el-col>
									<el-col>
										其他救助重复对比
									</el-col>
								</div>
							</el-col>
						</el-row>
					</div>
				</div> -->
				
			</div>
			
			<div class="ainfo2">
				<div style="margin-left:20px;text-align:center;border-bottom:1px solid #ddd;padding-bottom:10px;">
					<el-button size="small" @click="closeView">返回</el-button>
				</div>
				<div style="margin-left:25%;margin-top:20px;">
					<ul>
						<li :class="{listStyle:isShow1}" @click="isShow(1)">
							<a class="ainfoFont" :class="{listStyleA:!isShow1}" @click="counter('#pageg1')">共性救助预警</a><br>
						</li>
						<li :class="{listStyle:isShow2}" @click="isShow(2)">
							<a class="ainfoFont" :class="{listStyleA:!isShow2}" @click="counter('#pageg2')">城乡低保预警</a><br>
						</li>
						<li :class="{listStyle:isShow3}" @click="isShow(3)">
							<a class="ainfoFont" :class="{listStyleA:!isShow3}" @click="counter('#pageg3')">特困供养预警</a><br>
						</li>
						<li :class="{listStyle:isShow4}" @click="isShow(4)">
							<a class="ainfoFont" :class="{listStyleA:!isShow4}" @click="counter('#pageg4')">低收入家庭预警</a><br>
						</li>
						<li :class="{listStyle:isShow5}" @click="isShow(5)">
							<a class="ainfoFont" :class="{listStyleA:!isShow5}" @click="counter('#pageg5')">临时救助预警</a><br>
						</li>
						<!-- <li :class="{listStyle:isShow6}" @click="isShow(6)">
							<a class="ainfoFont" :class="{listStyleA:!isShow6}" @click="counter('#page6')">其他救助预警</a><br>
						</li> -->
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import request from '@/utils/request'
	import commonList2 from './commonList2'
	export default{
		components:{
			commonList2
		},
		data(){
			return{
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
				imgUrl:require("../../../assets/img/yj/yj1.png"),
				imgUrl2:require("../../../assets/img/yj/yj3.png"),
				num:{
					// 共性数量
					sqNum:'',
					hcNum:'',
					spNum:'',
					csNum:'',
					// ylfNum:'',
					autoPush:'',
					jbbzcfNum:'',
					// chxcfNum:'',
					qtjzNum:'',
					// xzzcNum:'',
					// hzyjNum:'',
					// 城乡低保预警
					dbSq:'',
					dbHc:'',
					dbSp:'',
					dbDbtx:'',
					gsDb:'',
					// hjDb:'',
					// hhDb:'',
					// dbnum8:'',
					// byNum:'',
					// dbZb:'',
					// dbnum11:'',
					// dbnum12:'',
					// dbnum13:'',
					dbQt:'',
					jbbzcfDBNum:'',
					qtjzDBNum:'',
					// db18:'',
					// db60:'',
					// cjdjbdDB:'',
					// CJRXSZFNum:'',
					// 特困供养预警
					tkSq:'',
					tkHc:'',
					tkSp:'',
					tkDbtx:'',
					// tk18:'',
					gsTkgsTk:'',
					// tknum7:'',
					// hhTk:'',
					// tknum9:'',
					// tknum10:'',
					// tknum11:'',
					// hytk:'',
					tkQt:'',
					jbbzcfTKNum:'',
					// chxcfTKNum:'',
					qtjzTKNum:'',
					// 低收入家庭预警
					bySq:'',
					byHc:'',
					bySp:'',
					byDbtx:'',
					// hjBy:'',
					// hhBy:'',
					// dsrnum7:'',
					// dsrnum8:'',
					byQt:'',
					jbbzcfBYNum:'',
					qtjzBYNum:'',
					// 临时预警
					lsSq:'',
					lsHc:'',
					lsSp:'',
					lsDbtx:'',
					hdLs:'',
					// lsnum6:'',
					// lsnum7:'',
					// lsnum8:'',
					lsQt:'',
					qtjzLSNum:'',
					// 其他预警
					// qtjzSq:'',
					// qtjzHc:'',
					// qtjzSp:'',
					// qtjzDbtx:'',
					// qtjzQt:'',
					// qtjzQTNum:'',
				},
				centerDialogVisible:false,
				titles:"",
				sKeyNum:'',
				searchParam:''
			}
		},
		created() {
			this.getData()
		},
		methods:{
			counter(id) { //counter1是绑定的点击事件名称
				document.querySelector(id).scrollIntoView(true);
			},
			closeView() {
				this.$emit("closes", false)
				this.$router.go(-1)
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
				} else if (n == 10) {
					this.isShow10 = false
				} else if (n == 11) {
					this.isShow11 = false
				}
			},
			getBasicWaring(data){
				return request({
					url:'/social/assistance/getBasicWaring',
					method:'post',
					data:data
				})
			},
			getBasicWaring2(data){
				return request({
					url:'/social/assistance/getBasicWaring2',
					method:'post',
					data:data
				})
			},
			getBasicWaring3(data){
				return request({
					url:'/social/assistance/getBasicWaring3',
					method:'post',
					data:data
				})
			},
			getBasicWaring4(data){
				return request({
					url:'/social/assistance/getBasicWaring4',
					method:'post',
					data:data
				})
			},
			getBasicWaringOne(data){
				return request({
					url:'/social/assistance/getBasicWaringOne',
					method:'post',
					data:data
				})
			},
			getBasicWaringFn(){
				this.getBasicWaring().then((res)=>{
					console.log(res)
				}).catch((res)=>{
					console.log(res.response.data[0])
					let json = res.response.data
				//共性救助预警
					// // 高额医疗费预警
					// let ylfNum = json[0].ylfNum;
					// if (ylfNum && ylfNum != 0 && ylfNum != "0") {
					// 	this.num.ylfNum = ylfNum
					// }
					
				//城乡低保预警
					// 申请预警
					let dbSq = json[0].dbSq;
					// 核查预警
					let dbHc = json[0].dbHc;
					// 审批预警
					let dbSp=json[0].dbSp;
					// 督办提醒预警
					let dbDbtx=json[0].dbDbtx;
					// 公示期满预警
					let gsDb = json[0].gsDb;
					// 个性化预警
					let dbQt=json[0].dbQt;
					// 基本保障重复对比
					let jbbzcfDBNum = json[0].jbbzcfDBNum;
					
					if (dbSq && dbSq != 0 && dbSq != "0") {
						this.num.dbSq = dbSq
					}
					if (dbHc && dbHc != 0 && dbHc != "0") {
						this.num.dbHc = dbHc
					}
					if (dbSp && dbSp != 0 && dbSp != "0") {
						this.num.dbSp = dbSp
					}
					if (dbDbtx && dbDbtx != 0 && dbDbtx != "0") {
						this.num.dbDbtx = dbDbtx
					}
					if (gsDb && gsDb != 0 && gsDb != "0") {
						this.num.gsDb = gsDb
					}
					if (dbQt && dbQt != 0 && dbQt != "0") {
						this.num.dbQt = dbQt
					}
					if (jbbzcfDBNum && jbbzcfDBNum != 0 && jbbzcfDBNum != "0") {
						this.num.jbbzcfDBNum = jbbzcfDBNum
					}
				//特困供养预警
					// 申请
					var tkSq = json[0].tkSq;
					// 核查
					var tkHc = json[0].tkHc;
					// 审批
					var tkSp=json[0].tkSp;
					// 督办提醒
					var tkDbtx=json[0].tkDbtx;
					// 公示期满预警
					var gsTk = json[0].gsTk;
					// 火化信息预警
					// var hhTk = json[0].hhTk;
					// 个性化预警
					var tkQt=json[0].tkQt;
					// 基本保障重复对比
					var jbbzcfTKNum = json[0].jbbzcfTKNum;
					// 护理补贴重复对比
					// var chxcfTKNum = json[0].chxcfTKNum;
					
					if (tkSq && tkSq != 0 && tkSq != "0") {
						this.num.tkSq = tkSq
					}
					if (tkHc && tkHc != 0 && tkHc != "0") {
						this.num.tkHc = tkHc
					}
					if (tkSp && tkSp != 0 && tkSp != "0") {
						this.num.tkSp = tkSp
					}
					if (tkDbtx && tkDbtx != 0 && tkDbtx != "0") {
						this.num.tkDbtx = tkDbtx
					}
					if (gsTk && gsTk != 0 && gsTk != "0") {
						this.num.gsTkgsTk = gsTk
					}
					// if (hhTk && hhTk != 0 && hhTk != "0") {
					// 	this.num.hhTk = hhTk
					// }
					if (tkQt && tkQt != 0 && tkQt != "0") {
						this.num.tkQt = tkQt
					}
					if (jbbzcfTKNum && jbbzcfTKNum != 0 && jbbzcfTKNum != "0") {
						this.num.jbbzcfTKNum = jbbzcfTKNum
					}
					// if (chxcfTKNum && chxcfTKNum != 0 && chxcfTKNum != "0") {
					// 	this.num.chxcfTKNum = chxcfTKNum
					// }
				//低收入家庭预警
					// 新增申请预警
					var bySq = json[0].bySq;
					// 新增核查预警
					var byHc = json[0].byHc;
					// 新增审批预警
					var bySp=json[0].bySp;
					// 督办提醒预警
					var byDbtx=json[0].byDbtx;
					// 火化信息预警
					// var hhBy = json[0].hhBy;
					// 个性化预警
					var byQt=json[0].byQt;
					// 基本保障重复对比
					var jbbzcfBYNum = json[0].jbbzcfBYNum;
					
					if (bySq && bySq != 0 && bySq != "0") {
					   this.num.bySq = bySq
					}
					if (byHc && byHc != 0 && byHc != "0") {
						this.num.byHc = byHc
					}
					if (bySp && bySp != 0 && bySp != "0") {
						this.num.bySp = bySp
					}
					if (byDbtx && byDbtx != 0 && byDbtx != "0") {
						this.num.byDbtx = byDbtx
					}
					// if (hhBy && hhBy != 0 && hhBy != "0") {
					// 	this.num.hhBy = hhBy
					// }
					if (byQt && byQt != 0 && byQt != "0") {
						this.num.byQt = byQt
					}
					if (jbbzcfBYNum && jbbzcfBYNum != 0 && jbbzcfBYNum != "0") {
						this.num.jbbzcfBYNum = jbbzcfBYNum
					}
				//临时救助预警
					// 新增申请预警
					var lsSq = json[0].lsSq;
					// 新增核查预警
					var lsHc = json[0].lsHc;
					// 新增审批预警
					var lsSp=json[0].lsSp;
					// 督办提醒预警
					var lsDbtx=json[0].lsDbtx;
					// 核对信息预警
					var hdLs = json[0].hdLs;
					// 个性化预警
					var lsQt=json[0].lsQt;;
					
					if (lsSq && lsSq != 0 && lsSq != "0") {
						this.num.lsSq = lsSq
					}
					if (lsHc && lsHc != 0 && lsHc != "0") {
						this.num.lsHc = lsHc
					}
					if (lsSp && lsSp != 0 && lsSp != "0") {
						this.num.lsSp = lsSp
					}
					if (lsDbtx && lsDbtx != 0 && lsDbtx != "0") {
						this.num.lsDbtx = lsDbtx
					}
					if (hdLs && hdLs != 0 && hdLs != "0") {
						this.num.hdLs = hdLs
					}
					if (lsQt && lsQt != 0 && lsQt != "0") {
						this.num.lsQt = lsQt
					}
				// //其他救助预警
				// 	// 新增申请预警
				// 	var qtjzSq = json[0].qtjzSq;
				// 	// 新增核查预警
				// 	var qtjzHc = json[0].qtjzHc;
				// 	// 新增审批预警
				// 	var qtjzSp=json[0].qtjzSp;
				// 	// 督办提醒预警
				// 	var qtjzDbtx=json[0].qtjzDbtx;
				// 	// 个性化预警
				// 	var qtjzQt=json[0].qtjzQt;
					
				// 	if (qtjzSq && qtjzSq != 0 && qtjzSq != "0") {
				// 		this.num.qtjzSq = qtjzSq
				// 	}
				// 	if (qtjzHc && qtjzHc != 0 && qtjzHc != "0") {
				// 		this.num.qtjzHc = qtjzHc
				// 	}
				// 	if (qtjzSp && qtjzSp != 0 && qtjzSp != "0") {
				// 		this.num.qtjzSp = qtjzSp
				// 	}
				// 	if (qtjzQt && qtjzQt != 0 && qtjzQt != "0") {
				// 		this.num.qtjzQt = qtjzQt
				// 	}
				// 	if (qtjzDbtx && qtjzDbtx != 0 && qtjzDbtx != "0") {
				// 		this.num.qtjzDbtx = qtjzDbtx
				// 	}
				})
			},
			getBasicWaring2Fn(){
				this.getBasicWaring2().then((res)=>{
					console.log(res)
				}).catch((res)=>{
					console.log(res.response.data)
					let json = res.response.data
					// 共性 基本保障重复对比
					let jbbzcfNum = json[0].jbbzcfNum;
					if (jbbzcfNum && jbbzcfNum != 0 && jbbzcfNum != "0") {
						this.num.jbbzcfNum = jbbzcfNum
					}
					// //共性 护理补贴重复对比
					// let chxcfNum = json[0].chxcfNum;
					// if (chxcfNum && chxcfNum != 0 && chxcfNum != "0") {
					// 	this.num.chxcfNum = chxcfNum
					// }
				})
			},
			getBasicWaring3Fn(){
				this.getBasicWaring3().then((res)=>{
					console.log(res)
				}).catch((res)=>{
					console.log(res.response.data)
					let json = res.response.data
					//共性 其他救助重复对比
					let qtjzNum = json[0].qtjzNum;
					if (qtjzNum && qtjzNum != 0 && qtjzNum != "0") {
					    this.num.qtjzNum = qtjzNum
					}
				})
			},
			getData(){
				// Promise.all([this.getBasicWaringFn(),this.getBasicWaring2Fn(),this.getBasicWaring3Fn()]).then(([one,two,three])=>{
				// 	console.log(1)
				// 	for(let i in this.num){
				// 		this.getBasicWaringOne({
				// 			id:i
				// 		}).then((res)=>{
				// 			console.log(res)
				// 		}).catch((res)=>{
				// 			// console.log(i,res.response.data[0].id)
				// 			// console.log(res.response.data)
				// 			let json = res.response.data
				// 			// this.num.json[0].id
				// 			let id_=json[0].id;
				// 			let num=json[0].num;
				// 			if (num && num != 0 && num != "0") {
				// 				this.$set(this.num,id_,1)
				// 			}
				// 		})
				// 	}
				// }).catch(([one,two,three])=>{
				// 	console.log(12)
				// })
				this.getBasicWaringFn()
				this.getBasicWaring2Fn()
				this.getBasicWaring3Fn()
				for(let i in this.num){
					this.getBasicWaringOne({
						id:i
					}).then((res)=>{
						console.log(res)
					}).catch((res)=>{
						console.log(res.request.readyState)
				// if(res.request.readyState == 4 && res.request.status == 0){
				// 	//我在这里重新请求
				// }
				if(res.request.readyState != 4 || res.request.status != 200){
					console.log('5555')
				}
						// console.log(res)
						// console.log(i,res.response.data[0].id)
						// console.log(res.response.data)
						let json = res.response.data
						// this.num.json[0].id
						let id_=json[0].id;
						let num=json[0].num;
						if (num && num != 0 && num != "0" && i != 'jbbzcfNum') {
							this.$set(this.num,id_,num)
						}
					})
				}
				// this.getBasicWaring4().then((res)=>{
				// 	console.log(res)
				// }).catch((res)=>{
				// 	console.log(res.response.data)
				// 	let json = res.response.data
				// })
				
				
			},
			openDialog(skey,title,searchParam){
				// if(searchParam){
				// 	this.searchParam = searchParam
				// }
				this.searchParam = searchParam || ''
				this.titles = title
				this.sKeyNum = skey
				this.centerDialogVisible =true
			}
		}
	}
</script>

<style scoped>
	.g-box {
		height: 80VH !important;
	}
	.g-box2 {
		height:100%;
		width:100%;
		overflow: auto !important;
		display:flex;
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
	.ainfo2 {
		width: 240px;
		font-size: 14px;
		line-height: 20px;
		text-align: left;
		padding-left: 10px;
		box-sizing: border-box;
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
	.line_blue {
		border-left: 2px solid #3385FF;
	}
	.lineSt {
		background-color: #dcdfe6;
		height: 1px;
		width: 100%;
		margin-bottom: 10px;
	}
	.top_2 {
		width: 100%;
	}
	.top_1 {
		margin-bottom: 50px;
	}
</style>

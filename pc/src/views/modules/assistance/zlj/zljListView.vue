<template>
	<div class="g-box" v-loading="loading">
		<div class='g-box2'>
			<div class="info2">
				<el-form :inline="true" class="demo-form-inline">
					<h3 class="line_blue" id="page1">&emsp;档案信息</h3>
					<div class="lineSt"></div>
					<div class="top_1">
						<table class="top_2">
							<tr style="height:40px;">
								<td >申请人姓名:</td>
								<td colspan='2'>{{basicInf.ab_ex3}}</td>
								<td >身份证号码:</td>
								<td colspan='2'>{{basicInf.ab_ex7}}</td>
							</tr>
							<tr style="height:40px;">
								<td >性别:</td>
								<td colspan='2'>{{basicInf.ab_ex69}}</td>
								<td >年龄:</td>
								<td colspan='2'>{{basicInf.ab_ex70}}</td>
							</tr>
							<tr>
								<td>申请时间:</td>
								<td colspan='2'>{{basicInf.ab_dat14}}</td>
								<td >出生年月</td>
								<td colspan='2'>{{basicInf.ab_dat11}}</td>
								<td >
									<img v-if="basicInf.ab_ex15 == '申请'"
										src='@/assets/img/auditStatus/notSubmitted.png' class='imgSt'>
									<img v-else-if="basicInf.ab_ex15 == '核对中'"
										src='@/assets/img/auditStatus/audit.png' class='imgSt'>
									<img v-else-if="basicInf.ab_ex15 == '办结' || basicInf.ab_ex15=='审核通过' && ab_ex48=='已享受'"
										src='@/assets/img/auditStatus/enjoyment.png' class='imgSt'>
									<img v-else-if="basicInf.ab_ex15 == '办结' || basicInf.ab_ex15=='审核通过'"
										src='@/assets/img/auditStatus/passTheAudit.png' class='imgSt'>
									<img v-else-if="basicInf.ab_ex15 == '退回'"
										src='@/assets/img/auditStatus/return.png' class='imgSt'>
									<img v-else src='@/assets/img/auditStatus/audit.png' class='imgSt'>
								</td>
							</tr>
						</table>
					</div>
					<h3 class="line_blue" id="page2">&emsp;基础信息</h3>
					<div class="lineSt"></div>
					<div class="top_1">
						<table class="top_2">
							<tr style="height:40px;">
								<td style="width:10%;">行政区划:</td>
								<td style="width:40%;">{{basicInf.address}}</td>
								<td style="width:10%;">联系电话:</td>
								<td style="width:40%;">{{basicInf.ab_ex28}}</td>
							</tr>
							<tr style="height:40px;">
								<td style="width:10%;">户口性质:</td>
								<td style="width:40%;">{{basicInf.ab_ex6}}</td>
								<td style="width:10%;">家庭人口:</td>
								<td style="width:40%;">{{basicInf.ab_ex5}}</td>
							</tr>
							<tr style="height:40px;">
								<td>户籍地址:</td>
								<td>{{basicInf.ab_ex4}}</td>
								<td>家庭地址:</td>
								<td>{{basicInf.ab_ex11}}</td>
							</tr>
							<!-- 88888888888888888888888888888 -->
							<tr style="height:40px;">
								<td>代理人姓名:</td>
								<td>{{basicInf.ab_ex29}}</td>
								<td>代理人身份证号:</td>
								<td>{{basicInf.ab_ex31}}</td>
							</tr>
							<tr style="height:40px;">
								<td>与申请人关系:</td>
								<td>{{basicInf.ab_ex30}}</td>
								<td>代理人联系电话:</td>
								<td>{{basicInf.ab_ex32}}</td>
							</tr>
							
							<!-- <tr v-if="$route.query.hdzt!='未核对'" style="height:40px;">
								<td>调查人:</td>
								<td>{{basicInf.ab_ex78}}</td>
								<td>调查结果:</td>
								<td>{{basicInf.ab_ex79}}</td>
							</tr> -->
							<tr style="height:40px;">
								<td>尊老金发放标准:</td>
								<td>{{basicInf.ab_ex5}}</td>
								<td>人员是否健在:</td>
								<td>{{basicInf.ab_ex33}}</td>
							</tr>

							<!-- 88888888888888888888888888888 -->
							<tr style="height:40px;">
								<td  >资金发放是否正常:</td>
								<td >{{basicInf.ab_ex92}}</td>
								<td  >是否属于村干部或经办人员近亲属:</td>
								<td >{{basicInf.ab_ex92}}</td>
								<!-- <td>是否渐退期:</td>
								<td >{{basicInf.ab_ex207}}</td> -->
							</tr>
							<tr style="height:40px;">
								<td  >备注:</td>
								<td >{{basicInf.ab_ex92}}</td>
								<tr style="height:40px;">
								<td>诉求描述:</td>
								<td colspan="3">{{basicInf.ab_ex93}}</td>
							</tr>
							
						</table>
					</div>
					<!-- <div v-if="basicInf.ab_ex92=='是'">	
						<h3 class="line_blue" id="page21" >&emsp;村干部或经办人员近亲属信息</h3>
						<div class="lineSt"></div>
						<div class="family">
							<el-table :data="tableData7" border style="width: 100%">
								<el-table-column prop="abm_ex3" label="姓名"  min-width="100"></el-table-column>
								<el-table-column prop="abm_ex1" label="近亲属关系"  min-width="150"></el-table-column>
								<el-table-column prop="abm_ex15" label="任职机构和职位"  min-width="280"></el-table-column>
							</el-table>
						</div>
					</div> -->
					<h3 class="line_blue" id="page3">&emsp;银行信息</h3>
					<div class="lineSt"></div>
					<div class="top_1">
						<table class="top_2">
							<tr style="height:40px;">
								<td style="width:10%;">一卡通开户银行:</td>
								<td style="width:20%;">{{basicInf.ab_ex42}}</td>
								<td style="width:10%;">开户人:</td>
								<td style="width:20%;">{{basicInf.ab_ex8}}</td>
								<td style="width:10%;">一卡通银行账号:</td>
								<td style="width:20%;">{{basicInf.ab_ex43}}</td>
							</tr>
						</table>
					</div>

					
					<h3 class="line_blue" id="page8">&emsp;已享受救助情况</h3>
					<div class="lineSt"></div>
					<div class="top_1">
						<div class="top_3">
							<el-table :data="tableData5" style="width: 99%">
								<el-table-column label="救助信息" style="text-align:center">
									<el-table-column prop="ab_ex3" label="姓名" min-width="120"></el-table-column>
									<el-table-column prop="ab_ex13" label="救助类型" min-width="120"></el-table-column>
									<el-table-column prop="ag_ex1" label="发放时间" min-width="120"></el-table-column>
									<el-table-column prop="ag_ex2" label="发放金额" min-width="120"></el-table-column>
								</el-table-column>
							</el-table>
						</div>
						<div class="top_3">
							<el-table :data="tableData6" style="width: 99%">
								<el-table-column label="救助信息" style="text-align:center">
									<el-table-column prop="ab_ex3" label="姓名" min-width="120"></el-table-column>
									<el-table-column prop="ab_ex13" label="救助类型" min-width="120"></el-table-column>
									<el-table-column prop="ab_dat14" label="申请日期" min-width="150"></el-table-column>
									<el-table-column prop="ab_dat5" label="审批日期" min-width="150"></el-table-column>
								</el-table-column>
							</el-table>
						</div>
					</div>

					<div style='clear:both'></div>
					<h3 class="line_blue" id="page9" style='margin-top:15px'>&emsp;电子附件</h3>
					<div class="lineSt"></div>
					<div class="top_1">
						<el-row :gutter="20" style='margin-top:10px'>
							<el-col :span="12">
								<el-card class="box-card">
									<div slot="header" class="clearfix">
										<span>身份证(<span style='color:red'>{{imgNum.ab_ex10_len}}</span>)</span>
									</div>
									<image-view  v-if="this.imgArr.ab_ex10_len" :imgList="this.imgArr.ab_ex10_len" height="150px" width="150px"></image-view>
								</el-card>
							</el-col>
							<el-col :span="12">
								<el-card class="box-card">
									<div slot="header" class="clearfix">
										<span>纸质授权书(<span style='color:red'>{{imgNum.ab_ex177_len}}</span>)</span>
									</div>
									<image-view  v-if="this.imgArr.ab_ex177_len" :imgList="this.imgArr.ab_ex177_len" height="150px" width="150px"></image-view>
								</el-card>
							</el-col>
						</el-row>
						
						<el-row :gutter="20" style='margin-top:10px'> 
							<el-col :span="12">
								<el-card class="box-card">
									<div slot="header" class="clearfix">
										<span>审核审批表(<span style='color:red'>{{imgNum.ab_ex74_len}}</span>)</span>
									</div>
									<image-view  v-if="this.imgArr.ab_ex74_len" :imgList="this.imgArr.ab_ex74_len" height="150px" width="150px"></image-view>
								</el-card>
							</el-col>
							<el-col :span="12" v-if="this.type != 'cs' " >
								<el-card class="box-card">
									<div slot="header" class="clearfix">
										<span>公示图片(<span style='color:red'>{{imgNum.ab_ex98_len}}</span>)</span>
									</div>
									<image-view v-if="this.imgArr.ab_ex98_len" :imgList="this.imgArr.ab_ex98_len" height="150px" width="150px"></image-view>
								</el-card>
							</el-col>
							
						</el-row>
						<el-row :gutter="20" style='margin-top:10px'>
							
							<el-col :span="12">
								<el-card class="box-card">
									<div slot="header" class="clearfix">
										<span>其他材料(<span style='color:red'>{{imgNum.ab_ex16_len}}</span>)</span>
									</div>
									<image-view  v-if="this.imgArr.ab_ex16_len" :imgList="this.imgArr.ab_ex16_len" height="150px" width="150px"></image-view>
								</el-card>
							</el-col>
							<el-col :span="12">
								<el-card class="box-card">
									<div slot="header" class="clearfix">
										<span>近亲属备案表(<span style='color:red'>{{imgNum.ab_ex164_len}}</span>)</span>
									</div>
									<image-view  v-if="this.imgArr.ab_ex164_len" :imgList="this.imgArr.ab_ex164_len" height="150px" width="150px"></image-view>
								</el-card>
							</el-col>
						</el-row>
						<el-row :gutter="20" style='margin-top:10px'>
							<el-col :span="12">
								<el-card class="box-card">
									<div slot="header" class="clearfix">
										<span>电子授权书(<span style='color:red'>{{imgNum.ab_ex73_len}}</span>)</span>
									</div>
									<image-view  v-if="this.imgArr.ab_ex73_len" :imgList="this.imgArr.ab_ex73_len"  height="150px" width="150px"></image-view>
								</el-card>
							</el-col>
							<el-col :span="12">
								<el-card class="box-card">
									<div slot="header" class="clearfix">
										<span>民主评议(<span style='color:red'>{{imgNum.ab_ex97_len}}</span>)</span>
									</div>
									<image-view  v-if="this.imgArr.ab_ex97_len" :imgList="this.imgArr.ab_ex97_len" height="150px" width="150px"></image-view>								
								</el-card>
							</el-col>
							
							<el-col  v-if="this.basicInf.ab_ex15=='退回'" :span="12">
								<el-card class="box-card">
									<div slot="header" class="clearfix">
										<span>退回材料(<span style='color:red'>{{imgNum.ab_ex175_len}}</span>)</span>
									</div>
									<image-view  v-if="this.imgArr.ab_ex175_len" :imgList="this.imgArr.ab_ex175_len" height="150px" width="150px"></image-view>
								</el-card>
							</el-col>
						</el-row>
					</div>

					<div style='clear:both'></div>

					<!-- <h3 class="line_blue" id="page24" style="margin-top: 20px;">&emsp;汇总表</h3>
					<div class="lineSt"></div>
					<div>
						<el-table :data="[basicInf]" border style="width: 100% ; margin-bottom: 20px;">
							<el-table-column prop="ab_ex13" label="救助类别" min-width="100"></el-table-column>
							<el-table-column prop="ab_ex3"  label="申请人"   min-width="100"></el-table-column>
							<el-table-column prop="ab_ex40" label="家庭月保障金额（元）" min-width="180"></el-table-column>
							
						</el-table>
					</div><br> -->

					<!-- 初审/审核 -->
					<h3 class="line_blue" id="page11" style="margin-top: 20px;" v-if="this.type == 'cs'">&emsp;审核</h3>
					<div class="lineSt" v-if="this.type == 'cs'"></div>
					<div class="top_1" v-if="this.type == 'cs'">
						<el-row>
							<el-col :span="2">
								<div style="line-height: 30px;text-align:center;"><span style="color:red"> * </span>审核意见</div>
							</el-col>
							<el-col :span="6">
								<el-select @change="changeSh" v-model="auditValue.ab_ex27" placeholder="请选择" style="width=100%">
									<el-option v-for="item in options" :key="item.value" :label="item.label"
										:value="item.value"></el-option>
								</el-select>
							</el-col>
							<el-col :span="2">
								<div style="line-height: 30px;text-align:center;"><span style="color:red"> * </span>审核人</div>
							</el-col>
							<el-col :span="6">
								<el-input v-model="auditValue.ab_ex19"></el-input>
							</el-col>
							<el-col :span="2" style="line-height: 30px;text-align:center;">
								<div><span style="color:red"> * </span>审核时间</div>
							</el-col>
							<el-col :span="6">
								<el-date-picker v-model="auditValue.ab_dat4" type="datetime" value-format="yyyy-MM-dd HH:mm" placeholder="选择日期时间">
									
								</el-date-picker>
							</el-col>
						</el-row>
						<!--    退回    -->
						<div v-if="auditValue.ab_ex27=='退回'">
							<el-row style="margin-top: 10px;">
								<el-col :span="2" style="line-height: 30px;text-align:center">
									<div><span style="color:red"> * </span>退回原因</div>
								</el-col>
								<el-col :span="6">
									<!--  自愿放弃、两书拒签、死亡、失踪失联、其它 -->
									<el-select @change="changeSh" v-model="auditValue.ab_ex25" placeholder="请选择">
										<el-option label="自愿放弃" value="自愿放弃"></el-option>
										<el-option label="两书拒签" value="两书拒签"></el-option>
										<el-option label="失踪失联" value="失踪失联"></el-option>
										<el-option label="死亡" value="死亡"></el-option>
										<el-option label="其他" value="其他"></el-option>
									</el-select>
								</el-col>
							</el-row>
							<el-row style="margin-top: 10px;text-align:center" type="flex" justify="center">
								<el-col :span="2" style="line-height:30px;">
									<div>退回描述</div>
								</el-col>
								<el-col :span="22" >
									<el-input type="textarea" :rows='4' :disabled="auditValue.ab_ex25!='其他'" v-model="auditValue.ab_ex178"></el-input>
								</el-col>
							</el-row>
							<el-row style="margin-top: 10px;">
								<el-col :span="20" :offset="2">
									<el-card class="box-card">
										<div slot="header" style="text-align:center" class="clearfix">
											<el-button style="float:left;padding:3px 0" type="text" @click="handleRemove(imgArr,'ab_ex175')">删除</el-button>
											<span><span style="color:red" v-if="auditValue.ab_ex202=='' && this.must"> * </span>退回材料(<span style='color:red'>{{imgNum.ab_ex175_len}}</span>)</span>
											<el-button style="float:right;padding:3px 0" type="text" @click="uploads('ab_ex175')">上传</el-button>
										</div>
										<div class="block">
											<image-view :imgList="imgArr.ab_ex175_len"  @Imgindex='getImgIndex' id="ab_ex175" ></image-view>
										</div>
									</el-card>
								</el-col>
							</el-row>
						</div>
						<el-row style="margin-top: 10px;"  v-if="auditValue.ab_ex27!='退回'">
							<el-col :span="2" style="line-height: 30px;text-align:center">
								<div>备注</div>
							</el-col>
							<el-col :span="22">
								<el-input type="textarea" autosize v-model="auditValue.ab_ex25"></el-input>
							</el-col>
						</el-row>
						<br>
						<el-row style="margin-top: 10px;" type="flex" justify="center">
							<el-col :span="24" style="text-align: center;">
								<el-button type="primary" @click="save(auditValue)" :disabled="saveDisabled" >保存</el-button>
							</el-col>
						</el-row>
					</div>
					<!-- 公示 -->
					<h3 class="line_blue" id="page11" style="margin-top: 20px;" v-if="this.type == 'gs'">&emsp;公示</h3>
					<div class="lineSt" v-if="this.type == 'gs'"></div>
					<div class="top_1" v-if="this.type == 'gs'">
					
						<el-row>
							<el-col :span="2">
								<div style="line-height: 30px;text-align:center"><span style="color:red"> * </span>公示结果</div>
							</el-col>
							<el-col :span="6">
								<el-select @change="changeSh" v-model="publicity.ab_ex34" placeholder="请选择">
									<el-option v-for="item in options2" :key="item.value" :label="item.label"
										:value="item.value"></el-option>
								</el-select>
							</el-col>
							<el-col :span="2">
								<div style="line-height: 30px;text-align:center"><span style="color:red"> * </span>公示地点</div>
							</el-col>
							<el-col :span="6">
								<el-input v-model="publicity.ab_ex47"></el-input>
							</el-col>
							<el-col :span="2" style="line-height: 30px;;text-align:center">
								<div>公示开始时间</div>
							</el-col>
							<el-col :span="6">
								<el-date-picker
									v-model="publicity.ab_dat9"
									type="date"
									size="small"
									style="width:90%"
									value-format="yyyy-MM-dd"
									placeholder="选择公示开始时间">
								</el-date-picker>
							</el-col>
						</el-row>

						<el-row style='margin-top:10px'>
							<el-col :span="2" style="line-height: 30px;text-align:center">
								<div>公示结束时间</div>
							</el-col>
							<el-col :span="6">
								<el-date-picker
										v-model="publicity.ab_dat10"
										type="date"
										value-format="yyyy-MM-dd"
										placeholder="选择公示结束时间">
								</el-date-picker>
							</el-col>
							<el-col :span="2" style="line-height: 30px;text-align:center" v-if="['无异议','有异议通过',''].includes(publicity.ab_ex34)">
								<div >备注</div>
							</el-col>
							<el-col :span="14" v-if="['无异议','有异议通过',''].includes(publicity.ab_ex34)" >
								<el-input  type="textarea" autosize v-model="publicity.ab_ex35"></el-input>
							</el-col>
							<el-col :span="2" style="line-height: 30px;text-align:center" v-if="publicity.ab_ex34 == '退回'|| publicity.ab_ex34 == '有异议退回'">
								<div><span style="color:red"> * </span>退回原因</div>
							</el-col>
							<el-col  :span="6" v-if="publicity.ab_ex34 == '退回'|| publicity.ab_ex34 == '有异议退回'">
								<el-select @change="changeSh" v-model="auditValue.ab_ex35" placeholder="请选择">
									<el-option label="自愿放弃" value="自愿放弃"></el-option>
									<el-option label="两书拒签" value="两书拒签"></el-option>
									<el-option label="失踪失联" value="失踪失联"></el-option>
									<el-option label="死亡" value="死亡"></el-option>
									<el-option label="其他" value="其他"></el-option>
								</el-select>
								<!--  自愿放弃、两书拒签、死亡、失踪失联、其它 -->
							</el-col>
						</el-row>

						<!--    退回    -->
						<div v-if="publicity.ab_ex34 == '退回'|| publicity.ab_ex34 == '有异议退回'">
							<!-- <el-row style="margin-top: 10px;">
								
							</el-row> -->
							<el-row style="margin-top: 10px;text-align:center" type="flex" justify="center">
								<el-col :span="2" style="line-height:30px;">
									<div>退回描述</div>
								</el-col>
								<el-col :span="22"  >
									<el-input type="textarea" :rows='4' :disabled="auditValue.ab_ex35!='其他'"  v-model="auditValue.ab_ex178"></el-input>
								</el-col>
							</el-row>
						</div>	

						<el-row :gutter="20" style="margin-top: 10px;">
							<el-col :span="12">
								<el-card class="box-card">
									<div slot="header" style="text-align:center" class="clearfix">
										<el-button style="float:left;padding:3px 0" type="text" @click="handleRemove(imgArr,'ab_ex98')">删除</el-button>
										<span><span  v-if="['无异议','有异议通过'].includes(publicity.ab_ex34) && ['','复核','新申请','迁移'].includes(publicity.ab_ex202) " style="color:red"> * </span>公示图片(<span style='color:red'>{{imgNum.ab_ex98_len}}</span>)</span>
										<el-button style="float: right; padding: 3px 0" type="text" @click="uploads('ab_ex98')">上传</el-button>
											
									</div>
									<div class="block">
										<image-view :imgList="imgArr.ab_ex98_len"  @Imgindex='getImgIndex' id="ab_ex98" ></image-view>

									</div>
								</el-card>
							</el-col>
							<el-col :span="12">
									<el-card class="box-card">
										<div slot="header" style="text-align:center" class="clearfix">
											<el-button style="float:left;padding:3px 0" type="text" @click="handleRemove(imgArr,'ab_ex97')">删除</el-button>
											<span><span  v-if="['有异议退回','有异议通过'].includes(publicity.ab_ex34)" style="color:red"> * </span>民主评议(<span style='color:red'>{{imgNum.ab_ex97_len}}</span>)</span>
											<el-button style="float: right; padding: 3px 0" type="text" @click="uploads('ab_ex97')">上传</el-button>
										</div>
										<div class="block">
											<image-view :imgList="imgArr.ab_ex97_len"  @Imgindex='getImgIndex' id="ab_ex97" ></image-view>
										</div>
									</el-card>
							</el-col>
						</el-row>

						<el-row :gutter="20" style="margin-top: 10px;" v-if="publicity.ab_ex34 == '退回'|| publicity.ab_ex34 == '有异议退回'">
							<el-col :span="12">
									<el-card class="box-card">
										<div slot="header" style="text-align:center" class="clearfix">
											<el-button style="float:left;padding:3px 0" type="text" @click="handleRemove(imgArr,'ab_ex175')">删除</el-button>
											<span><span style="color:red" v-if="auditValue.ab_ex202=='' && this.must"> * </span>退回材料(<span style='color:red'>{{imgNum.ab_ex175_len}}</span>)</span>
											<el-button style="float:right;padding:3px 0" type="text" @click="uploads('ab_ex175')">上传</el-button>
										</div>
										<div class="block">
											<image-view :imgList="imgArr.ab_ex175_len"  @Imgindex='getImgIndex' id="ab_ex175" ></image-view>
										</div>
									</el-card>
							</el-col>
						</el-row>
						<el-row style="margin-top: 10px;" type="flex" justify="center">
							<el-col :span="24" style="text-align: center;">
								<el-button type="primary" @click="save2(publicity)" :disabled="saveDisabled">保存</el-button>
							</el-col>
						</el-row>
					</div>
					<br>

					<h3 class="line_blue" id="page11" style="margin-top: 20px;" v-if="this.type == 'sp'">&emsp;审批</h3>
					<div class="lineSt" v-if="this.type == 'sp'"></div>
					<div class="top_1" v-if="this.type == 'sp'">
						<el-row >
							<el-col :span="2">
								<div style="line-height: 30px;text-align:center"><span style="color:red"> * </span>审批意见</div>
							</el-col>
							<el-col :span="6">
								<el-select @change="changeSh" v-model="approval.ab_ex21" placeholder="请选择">
									<el-option v-for="item in options3" :key="item.value" :label="item.label"
										:value="item.value"></el-option>
								</el-select>
							</el-col>
							<el-col :span="2">
								<div style="line-height: 30px;text-align:center"><span style="color:red"> * </span>审批人</div>
							</el-col>
							<el-col :span="6">
								<el-input v-model="approval.ab_ex20"></el-input>
							</el-col>
							<el-col :span="2" style="line-height: 30px;text-align:center;">
								<div><span style="color:red"> * </span>审批时间</div>
							</el-col>
							<el-col :span="6">
								<el-date-picker
									v-model="approval.ab_dat5"
									type="datetime"
									value-format="yyyy-MM-dd HH:mm"
									placeholder="选择审批时间">
								</el-date-picker>
								
							</el-col>
						</el-row>

						<el-row style="margin-top: 10px;">
							<el-col :span="2" style="line-height: 30px;text-align:center" v-if="approval.ab_ex21!='退回'">
								<div v-if="this.approval.ab_ex21=='驳回'"><span style="color:red;"> * </span> 驳回原因</div>
								<div v-else>备注</div>
							</el-col>
							<el-col :span="22" v-if="approval.ab_ex21!='退回'">
								<el-input type="textarea" autosize v-model="approval.ab_ex26"></el-input>
							</el-col>
						</el-row>
						
						<!--    退回    -->
						<div v-if="approval.ab_ex21=='退回'">
							<el-row style="margin-top: 10px;">
								<el-col :span="2" style="line-height: 30px;text-align:center">
									<div><span style="color:red"> * </span> 退回原因</div>
								</el-col>
								<el-col :span="6">
									<el-select @change="changeSh" v-model="auditValue.ab_ex26" placeholder="请选择">
										<el-option label="自愿放弃" value="自愿放弃"></el-option>
										<el-option label="两书拒签" value="两书拒签"></el-option>
										<el-option label="失踪失联" value="失踪失联"></el-option>
										<el-option label="死亡" value="死亡"></el-option>
										<el-option label="其他" value="其他"></el-option>
									</el-select>
									<!--  自愿放弃、两书拒签、死亡、失踪失联、其它 -->
								</el-col>
							</el-row>
							<el-row style="margin-top: 10px;text-align:center" type="flex" justify="center">
								<el-col :span="2" style="line-height:30px;">
									<div>退回描述</div>
								</el-col>
								<el-col :span="22" >
									<el-input type="textarea" :disabled="auditValue.ab_ex26!='其他'" :rows='4'  v-model="auditValue.ab_ex178"></el-input>
								</el-col>
							</el-row>
							<el-row style="margin-top: 10px;">
								<el-col :span="20" :offset="2">
									<el-card class="box-card">
										<div slot="header" style="text-align:center" class="clearfix">
											<el-button style="float:left;padding:3px 0" type="text" @click="handleRemove(imgArr,'ab_ex175')">删除</el-button>
											<span>
												<span style="color:red" v-if="auditValue.ab_ex202=='' && this.must"> * </span>
												退回材料(<span style='color:red'>{{imgNum.ab_ex175_len}}</span>)
											</span>
											<el-button style="float:right;padding:3px 0" type="text" @click="uploads('ab_ex175')">上传</el-button>
										</div>
										<div class="block">
											<image-view :imgList="imgArr.ab_ex175_len"  @Imgindex='getImgIndex' id="ab_ex175" ></image-view>
										</div>
									</el-card>
								</el-col>
							</el-row>
							<br>
						</div>
						
						<el-row style="margin-top: 10px;" type="flex" justify="center">
							<el-col :span="24" style="text-align: center;">
								<el-button type="primary" @click="save3(auditValue)" :disabled="saveDisabled">保存</el-button>
							</el-col>
						</el-row>
					</div>

					<h3 class="line_blue" id="page10">&emsp;审批记录</h3>
					<div class="lineSt"></div>
					<div class="top_1" id="record">
						<div class="top_1">
							<table style="width:100%;table-layout:fixed" id="recordt">
								<colgroup>
									<col style="width:15%">
									<col style="width:20%">
									<col style="width:15%">
									<col style="width:15%">
									<col style="width:15%">
									<col style="width:20%">
								</colgroup>
								
								<tbody v-for="(itemR,index) in record" :key="index">
									<tr>
										<td style="color:#899197;height:30px">处理步骤：</td>
										<td>{{itemR.ar_ex4}}</td>
										<td style="color:#899197">处理时间：</td>
										<td>{{itemR.ar_dat1}}</td>
										<td style="color:#899197" v-if="(itemR.ar_ex4).indexOf('标准调整')==-1">处理结果：</td>
										<td rowspan="2" style="text-align:left" v-if="(itemR.ar_ex4).indexOf('标准调整')==-1">
											<img v-if="itemR.ar_ex3 == '同意'||itemR.ar_ex3 =='无异议' ||itemR.ar_ex3.indexOf('通过')!=-1 "
												src="@/assets/img/auditStatus/agree.png" style="width:100px">
											<img v-else-if="itemR.ar_ex3 =='驳回'" src="@/assets/img/auditStatus/return2.png"
												style="width:100px">
											<img v-else src="@/assets/img/auditStatus/return.png"
												style="width:100px">
										</td>
									</tr>
									<tr v-if="(itemR.ar_ex4).indexOf('标准调整')==-1">
										<td style="color:#899197;height:30px">处理人：</td>
										<td>{{itemR.ar_ex5}}</td>
										<td style="color:#899197">处理用时：</td>
										<td>{{itemR.ar_ex6}}天</td>
									</tr>
									<tr v-if="itemR.flag == true">
										<td style="color:#899197;height:30px">公示时间：</td>
										<td>{{itemR.ab_dat9}}</td>
										<td style="color:#899197">公示地点：</td>
										<td>{{itemR.ab_ex47}}</td>
									</tr>
									<tr style="border-bottom:1px solid #ddd">
										<td style="color:#899197;height:30px">处理意见：</td>
										<td colspan="4">{{itemR.ar_ex2}}</td>
									</tr>
									<tr>
										<td colspan="5" style="height:20px">&nbsp;</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</el-form>
			</div>


			<div class="ainfo2">
				<div style="margin-left:20px;text-align:center;border-bottom:1px solid #ddd;padding-bottom:10px;">
					<el-button size="small" @click="closeView">返回</el-button>
				</div>
				<div style="margin-left:30px;margin-top:20px;">
					<ul>
						<li :class="{listStyle:isShow1}" @click="isShow(1)">
							<a class="ainfoFont" :class="{listStyleA:!isShow1}" @click="counter('#page1')">档案信息</a><br>
						</li>
						<li :class="{listStyle:isShow2}" @click="isShow(2)">
							<a class="ainfoFont" :class="{listStyleA:!isShow2}" @click="counter('#page2')">基础信息</a><br>
						</li>
						
						<li :class="{listStyle:isShow3}" @click="isShow(3)">
							<a class="ainfoFont" :class="{listStyleA:!isShow3}" @click="counter('#page3')">银行信息</a><br>
						</li>
					
						<li :class="{listStyle:isShow8}" @click="isShow(8)">
							<a class="ainfoFont" :class="{listStyleA:!isShow8}" @click="counter('#page8')">已享受救助情况</a><br>
						</li>
						<li :class="{listStyle:isShow9}" @click="isShow(9)">
							<a class="ainfoFont" :class="{listStyleA:!isShow9}" @click="counter('#page9')">电子附件</a><br>
						</li>
						<!-- <li :class="{listStyle:isShow24}" @click="isShow(24)" style="height:25px">
							<a class="ainfoFont" :class="{listStyleA:!isShow24}"  @click="counter('#page24')">汇总表</a>
						</li> -->
					
						<li :class="{listStyle:isShow11}" @click="isShow(11)"
							v-if="type=='cs'||type=='th'||type=='gs'||type=='sp'">
							<a class="ainfoFont" :class="{listStyleA:!isShow11}" @click="counter('#page11')">
								<span v-if="type=='cs'">审核</span>
								<span v-if="type=='th'">审核</span>
								<span v-if="type=='gs'">公示</span>
								<span v-if="type=='sp'">审批</span>
							</a><br>
						</li>
						<li :class="{listStyle:isShow10}" @click="isShow(10)">
							<a class="ainfoFont" :class="{listStyleA:!isShow10}" @click="counter('#page10')">审批记录</a>
						</li>
					</ul>
				</div>
			</div>
			<el-dialog title="上传" :visible.sync="dialogVisible3" width="500px" append-to-body>
				<upload @upload="uploadEvent" ref="myUpload"></upload>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogVisible3 = false">取 消</el-button>
					<el-button type="primary" @click="dialogVisible3 = false">确 定</el-button>
				</span>
			</el-dialog>

			<!-- 明细表 -->
			<el-dialog title="家庭月保障金额明细" :visible.sync="detailShow" top='30vh' center>
				<el-table :data="detailTable" border>
					<el-table-column property="abd_ex1" label="姓名"></el-table-column>
					<el-table-column property="abd_ex2" label="成员关系"></el-table-column>
					<el-table-column property="abd_ex3" label="救助标准"></el-table-column>
					<el-table-column property="abd_ex10" label="救助类型"></el-table-column>
					<el-table-column property="abd_ex5" v-if="approval.ab_ex13=='特困供养' && ['审批','办结'].includes(approval.ab_ex15)" label="生活费"></el-table-column>
					<el-table-column property="abd_ex6" v-if="approval.ab_ex13=='特困供养' && ['审批','办结'].includes(approval.ab_ex15)" label="护理费"></el-table-column>
					
					<el-table-column  property="abd_ex9" label="救助金"></el-table-column>
				</el-table>
				<br><hr><br>
				<div style="width:30%;margin:0 auto;">家庭月保障金合计为：<span style="color:red">{{basicInf.ab_ex40}}</span></div>
			</el-dialog>
		</div>
	</div>
</template>
<script>
	import request from '@/utils/request'
	import imageView from '@/views/modules/assistance/imageView'
	import upload from '@/views/modules/assistance/upload'
	import repeatWarnView from '@/views/modules/assistance/qzsq/components/repeatWarnView.vue'
	import {isName,isText,isFamilyNum,isNum,isCardID,isSpecialAccount} from '@/utils/until'
	// import  baseURL from '@/utils/baseUrl'
	export default {
		name: "dbListView",
		components:{
			imageView,
			upload,
			repeatWarnView //重复预警子组件
		},
		data() {
			return {
				
				dialogVisible3:false, //图片（材料）上传弹框
				repeatDialogShow: false, //重复预警弹框
				dialogChangeForm:false, //转办表单弹框
				uploadId: '',
				loading: false,
				saveDisabled:false, //保存禁用
				tableData5: [], //已享受救助数据
				tableData6: [], //已享受救助数据
				tableData7: [], //近亲属

				record: [], //审批记录
				// 对收入数据删除、新增操作用的数组
				
				// 转办类型2
				ab_ex13:"",
				flag: true,    // 跟公示有关
				auditValue: {},// 初审
				publicity: {}, // 公示
				approval: {},  // 审批
				isHDBG:true,   // 是否有核对报告
				detailShow:false, // 详情列表展示
				detailTable:[{abd_ex9:''}], // 救助金明细表
				//审核 
				options: [{
					value: '同意',
					label: '同意',
				}, {
					value: '退回',
					label: '退回',
				},{
					value: '退回重新核查',
					label: '退回重新核查',
				}],
				// 退回
				options1: [{
					value: '退回',
					label: '退回'
				}],
				// 公示
				options2: [{
					value: '无异议',
					label: '无异议'
				}, {
					value: '有异议通过',
					label: '有异议通过'
				}, {
					value: '有异议退回',
					label: '有异议退回'
				}, {
					value: '退回',
					label: '退回'
				}],
				// 审批
				options3: [{
					value: '同意',
					label: '同意'
				}, {
					value: '退回',
					label: '退回'
				}
				,{
					value: '驳回',
					label: '驳回',
				}
				],
				
				// 必填验证
				rules: {
					ab_ex10: [{
						required: true,
						message: '身份证照片不能为空',
						trigger: 'blur'
					}]
				},
				
				isShow1: false,
				isShow2: true,
				isShow3: true,
				// isShow4: true,
				// isShow5: true,
				// isShow6: true,
				// isShow7: true,
				isShow8: true,
				isShow9: true,
				isShow10: true,
				isShow11: true,
				// isShow12: true,
				// isShow13: true,
				// isShow14: true,
				// isShow15: true,
				// isShow16: true,
				// isShow17: true,
				// isShow18: true,
				// isShow19: true,
				// isShow21: true,
				// isShow22: true,
				// isShow23: true,
				isShow24: true,
				basicInf: {},   //展示数据

				imgNum: {},		//图片数量
				imgArr: { 		//图片数组
					ab_ex10_len:[],
					ab_ex97_len:[],
					ab_ex98_len:[],
					ab_ex175_len:[],
					ab_ex196_len:[],
					ab_ex197_len:[],
					ab_ex164_len:[], //近亲属备案表
				},
				sId: "", //本户的sid
				cId: "",
				type: "",
				checked: false, //转办复选框禁用
				disabled:true,  //转办类型单选框禁用
				arb:false,   //ab_ex41为xx--低保按人保，转办隐藏
				
				isSave:true,   //是否可以保存
				isSave2:true,   //符合转办类型
				zfShow:true,  //保障金明细是否展示增发
				imgIndex: {    //图片索引
					ab_ex10:0,
					ab_ex97:0,
					ab_ex98:0,
					ab_ex175:0,
					ab_ex196:0,
					ab_ex197:0,
					ab_ex164:0,
				},
				specialAccount:false,  //特殊账号验证
				must:false,
			}
		},
	
		 created() {
			this.loadData();
		},

		mounted() {
			// 滚动鼠标右侧导航栏跟随滚动位置改变而改变显示
			// window.removeEventListener('scroll',this.scroll,false)
			window.addEventListener('scroll',this.scroll,true);
		},
		methods: {

			scroll(){
				// var scrollTop =document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset;
				if(document.querySelector('.info2') == null || document.querySelector('#recordt') == null){
					return ''
				}

				let scrollTop = document.querySelector('.info2').scrollTop;
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
				let oDiv14 = document.querySelector('#page14');
				let oDiv15 = document.querySelector('#page15');
				let oDiv16 = document.querySelector('#page16');
				let oDiv17 = document.querySelector('#page17');
				let oDiv18 = document.querySelector('#page18');
				let oDiv19 = document.querySelector('#page19');
				let oDiv21 = true;

				if(this.basicInf.ab_ex92=="是"){
					oDiv21 = document.querySelector('#page21');
				}
				let oDiv22 = true;
				if(this.basicInf.ab_ex13=="特困供养" && (this.basicInf.ab_ex15=="审批" || this.basicInf.ab_ex15=="办结")){
					oDiv22 = document.querySelector('#page22');
				}
				let oDiv23 = true;
				if(this.basicInf.ab_ex13=="低保"){
					oDiv23 = document.querySelector('#page23');
				}
				let oDiv24 = document.querySelector('#page24');
				// 顺序跟上面显示顺序要相反
				let clientHeight = document.querySelector('.info2').clientHeight
				let recordtClientHeight = document.querySelector('#recordt').scrollHeight
				// 在新增dialog打开时不执行后面的程序
				if(!oDiv1 || !oDiv2 || !oDiv3 || !oDiv4 || !oDiv5 || !oDiv6 || !oDiv7 || !oDiv8 || !oDiv9 || !oDiv10|| !oDiv12|| !oDiv13|| !oDiv14|| !oDiv15|| !oDiv16|| !oDiv17|| !oDiv18|| !oDiv19|| !oDiv21|| !oDiv22|| !oDiv23|| !oDiv24){
					return ''
				}
				if(recordtClientHeight+oDiv10.clientHeight<clientHeight && scrollTop>(oDiv10.offsetTop-oDiv1.offsetTop-clientHeight+recordtClientHeight+oDiv10.clientHeight)){
					// console.log('触发了10-1')
					this.isShow(10)
				}else if(scrollTop > (oDiv10.offsetTop-oDiv1.offsetTop-1)){
					// console.log('触发了10-2')
					this.isShow(10)
				}
				else if (oDiv11 && scrollTop > (oDiv11.offsetTop-oDiv1.offsetTop-1)){
					// console.log('触发了11')
					this.isShow(11)
				}else if (oDiv22 && scrollTop > (oDiv22.offsetTop-oDiv1.offsetTop-1)){
					// console.log('触发了22')
					this.isShow(22)
				}else if (oDiv24 && scrollTop > (oDiv24.offsetTop-oDiv1.offsetTop-1)){
					// console.log('触发了24')
					this.isShow(24)
				}else if (oDiv23 && scrollTop > (oDiv23.offsetTop-oDiv1.offsetTop-1)){
					// console.log('触发了23')
					this.isShow(23)
				}else if (oDiv19 && scrollTop > (oDiv19.offsetTop-oDiv1.offsetTop-1)){
					// console.log('触发了19')
					this.isShow(19)
				}else if (oDiv17 && scrollTop > (oDiv17.offsetTop-oDiv1.offsetTop-1)){
					// console.log('触发了17')
					this.isShow(17)
				}else if(scrollTop > (oDiv9.offsetTop-oDiv1.offsetTop-1)){
					// console.log('触发了9')
					this.isShow(9)
				}else if(scrollTop > (oDiv8.offsetTop-oDiv1.offsetTop-1)){
					// console.log('触发了8')
					this.isShow(8)
				}else if(scrollTop > (oDiv18.offsetTop-oDiv1.offsetTop-1)){
					// console.log('触发了18')
					this.isShow(18)
				}else if(scrollTop > (oDiv16.offsetTop-oDiv1.offsetTop-1)){
					// console.log('触发了16')
					this.isShow(16)
				}else if(scrollTop > (oDiv15.offsetTop-oDiv1.offsetTop-1)){
					// console.log('触发了15')
					this.isShow(15)
				}else if(scrollTop > (oDiv7.offsetTop-oDiv1.offsetTop-1)){
					// console.log('触发了7')
					this.isShow(7)
				}else if(scrollTop > (oDiv14.offsetTop-oDiv1.offsetTop-1)){
					// console.log('触发了14')
					this.isShow(14)
				}else if(scrollTop > (oDiv6.offsetTop-oDiv1.offsetTop-1)){
					// console.log('触发了6')
					this.isShow(6)
				}else if(scrollTop > (oDiv13.offsetTop-oDiv1.offsetTop-1)){
					// console.log('触发了13')
					this.isShow(13)
				}else if(scrollTop > (oDiv5.offsetTop-oDiv1.offsetTop-1)){
					// console.log('触发了5')
					this.isShow(5)
				}else if(scrollTop > (oDiv4.offsetTop-oDiv1.offsetTop-1)){
					// console.log('触发了4')
					this.isShow(4)
				}else if(scrollTop > (oDiv12.offsetTop-oDiv1.offsetTop-1)){
					// console.log('触发了12')
					this.isShow(12)
				}else if(scrollTop > (oDiv3.offsetTop-oDiv1.offsetTop-1)){
					// console.log('触发了3')
					this.isShow(3)
				}else if(scrollTop > (oDiv21.offsetTop-oDiv1.offsetTop)){
					// console.log('触发了21')
					this.isShow(21)
				}else if(scrollTop > (oDiv2.offsetTop-oDiv1.offsetTop-1)){
					// console.log('触发了2')
					this.isShow(2)
				}else if(scrollTop > (oDiv1.offsetTop-oDiv1.offsetTop)){
					// console.log('触发了1')
					this.isShow(1)
				}
			},
			counter(id) { //counter1是绑定的点击事件名称
				document.querySelector(id).scrollIntoView(true);
				
			},

			// 数据加载 then为失败，catch为成功
			async loadData() {
				this.sId = this.$route.query.sId;
				this.cId = this.$route.query.cId;
				this.type = this.$route.query.type;

				this.getData({
					sId: this.sId,
					type: this.type
				}).then(res => {
					this.record1(res[0].record)
					this.auditValue = res[0].data[0];
					if (this.type == "th")
						this.auditValue.ab_ex27 = "退回";

					this.publicity = res[0].data[0]
					this.approval = res[0].data[0]

				}).catch(res => {
					if(typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200){
						// console.log('请求失败了-----------------------')
						// this.$message.error('数据获取失败或请求超时')
						// this.$emit("closes", false)
						// this.$router.go(-1)
						this.closeView();
						return false
					}
					

					console.log('getData=>',res.response);
					

					this.basicInf = res.response.data[0].data[0];
					this.publicity = res.response.data[0].data[0];
					this.approval = res.response.data[0].data[0];

				
				
					// 没有保障金时设置为0
					this.basicInf.ab_ex40 = this.basicInf.ab_ex40 == '' ? "0.0" : this.basicInf.ab_ex40;
					console.log('load 保障金=>',this.basicInf.ab_ex40);
					
					// console.log(this.basicInf.ab_ex15 !='初审');

					// 救助类型为单人保时不可转办
					if(["残疾人单列户施保","重病型单列户施保"].includes(this.basicInf.ab_ex41)){
						this.arb = true;
					}

					// this.record = res.response.data[0].record
					this.record1(res.response.data[0].record);
					this.auditValue = res.response.data[0].data[0];
					// console.log(res.response,"this.auditValue")
					if (this.type == "th")
						this.auditValue.ab_ex27 = "退回";

					//获取图片数组
					this.imgArr.ab_ex10_len = this.basicInf.ab_ex10.split(",")
					this.imgArr.ab_ex16_len = this.basicInf.ab_ex16.split(",")
					this.imgArr.ab_ex73_len = this.basicInf.ab_ex73.split(",")
					this.imgArr.ab_ex74_len = this.basicInf.ab_ex74.split(",")
					this.imgArr.ab_ex97_len = this.basicInf.ab_ex97.split(",")
					this.imgArr.ab_ex98_len = this.basicInf.ab_ex98.split(",")
					this.imgArr.ab_ex166_len = this.basicInf.ab_ex166.split(",")
					this.imgArr.ab_ex167_len = this.basicInf.ab_ex167.split(",")
					this.imgArr.ab_ex175_len = this.basicInf.ab_ex175.split(",")
					this.imgArr.ab_ex177_len = this.basicInf.ab_ex177.split(",")
					this.imgArr.ab_ex196_len = this.basicInf.ab_ex196.split(",")
					this.imgArr.ab_ex164_len = this.basicInf.ab_ex164.split(",")
					// console.log(this.imgArr,'图片');
					for(let key in this.imgArr){
						if(this.imgArr[key][0]==''){
							this.imgArr[key].length=0
							this.imgNum[key]=this.imgArr[key].length
						}else{
							this.imgNum[key]=this.imgArr[key].length
						}
					}
					
				})

				
					// 已享受救助数据
					this.loadSalvation({
						sId: this.sId,
						cId: this.cId
					}).then(res => {
						console.log(res)
						this.tableData5 = res[0].data
						this.tableData6 = res[0].data2
					}).catch(res => {
					if(typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200){
						console.log('请求失败了-----------------------已享受救助数据')
						// this.$message.error('数据获取失败或请求超时')
						// this.$emit("closes", false)
						// this.$router.go(-1)
						return false
					}
					// console.log(res)
					this.tableData5 = res.response.data[0].data;
					this.tableData6 = res.response.data[0].data2;

					console.log(this.basicInf.ab_ex40,'保障金');
				})

			},

			// 给tabledata添加序号便于操作
			rowClassName({
				row,
				rowIndex
			}) {
				row.xh = rowIndex + 1;
			},

			// 主表数据
			getData(sid) {
				return request({
					headers: {
						'Accept': 'application/json',
					},
					url: '/social/assistance/getBasics',
					method: 'post',
					data: sid
				})
			},
			
			
			// 已享受救助数据
			loadSalvation(data) {
				return request({
					headers: {
						'Accept': 'application/json',
					},
					url: '/social/assistance/getBasicSalvation',
					method: 'post',
					data: data
				})
			},
			
			
			// 关于处理审批记录的一个方法
			record1(rec) {
				for (let i in rec) {
					if ("公示开始" == rec[i].ar_ex4 && this.flag == false) {
						return true;
					}
					// this.record[i].ar_ex4 = rec[i].ar_ex4
					// this.record[i].ar_dat1 = rec[i].ar_dat1
					// this.record[i].ar_ex3 = rec[i].ar_ex3
					// this.record[i].ar_ex5 = rec[i].ar_ex5
					// this.record[i].ar_ex6 = rec[i].ar_ex6
					// this.record[i].ar_ex2 = rec[i].ar_ex2
					// this.record[i].flag = false
					this.record[i] = {
						ar_ex4: rec[i].ar_ex4,
						ar_dat1: rec[i].ar_dat1,
						ar_ex3: rec[i].ar_ex3,
						ar_ex5: rec[i].ar_ex5,
						ar_ex6: rec[i].ar_ex6,
						ar_ex2: rec[i].ar_ex2,
						flag: false
					}
					if ("公示开始" == rec[i].ar_ex4 && this.flag) {
						this.record[i].flag = true
						this.flag = false;
						this.record[i].ab_dat9 = this.basicInf.ab_dat9 + "~" + this.basicInf.ab_dat10
						this.record[i].ab_ex47 = this.basicInf.ab_ex47
						console.log(rec[i])
					}
				}
				console.log(this.record)
			},

			// 退回原因
			changeSh(val) {
				
				let data =  this.basicInf;
				
				if(!['其他','死亡'].includes(data.ab_ex25) ){
					console.log(data.ab_ex25,'原因非空');
					this.must = true;
				}else{
					
					this.must = false;
				}

				console.log(val)
			},

			

			// saveRepeatBack(){ //重复预警退回
			// 	if(confirm("是否要退回？\r\n\r\n注意：操作退回后此救助记录将会到退回栏目中\r\n\r\n\"确定\"继续退回操作,\"取消\"返回审批界面！")){
			// 		this.repeatDialogShow = false;
			// 		this.approval.ab_ex21 = "退回";
			// 		this.save3(this.approval);
			// 	}else{
			// 		this.repeatDialogShow = false;
			// 	}
			// },

			// saveRepeatContinue(){ //重复预警继续
			// 	this.repeatDialogShow = false;

			// 	this.approval.ab_ex21 = "同意";
			// 	this.save3(this.approval);
			// },

			// 初审保存
			async save(data) {
				console.log(data.ab_ex27);

				
				if (data.ab_ex27 == "") {
					this.$message.error('请选择审核意见');
					this.isSave = false;
					return false;
				}
				
				else if(data.ab_ex27=="同意"){
					if( data.ab_ex202 !=''){
						if(data.ab_ex4 == ''){//用户籍地址作为导入数据是否补录验证
							this.$message.error('本户未进行补录，请返回列表页点击修改补充本户数据');
							this.isSave = false;
							return false;
						}else{
							this.isSave = true;
						}
					}
					
				}

				if(data.ab_ex27=="退回"){
					if(data.ab_ex25==""){
						this.$message.error('请选择退回原因');
						this.isSave=false;
						return false;
					}else if(data.ab_ex25=="其他" && data.ab_ex178==''){
						this.$message.error('请填写退回描述');
						this.isSave=false;
						return false;
					}
					else if(!['其他','死亡'].includes(data.ab_ex25) && data.ab_ex175==''){
						if(data.ab_ex202!=''|| data.ab_ex202==''){
							this.$message.error('请上传退回材料');
							this.isSave=false;
							return false;
						}else{
							this.isSave=true;
						}
					}
					else{
						this.isSave=true;
					}
				}

				if(this.isSave){
					// this.loading = true;
					// 设置定时器，30秒请求失败刷新页面
					let time = setTimeout(()=>{
									this.loading = false;
									this.$emit("closes", false)
									this.$message.error("网络异常");
									// this.$router.go(-1)
									this.closeView();
								},30000)
					
				

					// console.log('save this.saveDisabled=>',this.saveDisabled);

					// 保存按钮禁用
					this.saveDisabled = true;
					this.saveBasiccs({
						"data": "[" + JSON.stringify(data) + "]",
						"sId": this.sId,
						'typeData': "[" + JSON.stringify(this.typeData) + "]",
					}).then((res) => {
						if (res[0].status=="+OK") {
							this.loading = false;
							this.$message.success(res[0].msg)
							this.closeView();
						} else {
							this.loading = false;
							this.$message.error(res[0].msg)
						}
					}).catch((res) => {
						
						clearTimeout(time);
						console.log(res.response.data[0].status);
						if (res.response.data[0].status=="+OK") {

							this.loading = false;
							this.$message.success(res.response.data[0].msg)
							this.closeView()
							
						} else {
							this.loading = false;
							this.$message.error(res.response.data[0].msg)
						}
					})
				}
			},

			//公示保存
			async save2(data) {

				console.log(this.isSave);
				console.log(data);

				if (data.ab_ex34 == "") {
					this.$message.error('请选择公示结果');
					this.isSave=false;
					return false
				}else if(["无异议","有异议通过"].includes(data.ab_ex34)){
					
					// 检验公示地点
					if(data.ab_ex47 == "" ){
						this.$message.error('请输入公示地点');
						this.isSave = false;
						return false
					}
					// 检验公示图片
					if(["NULL",''].includes(data.ab_ex98)){
						this.$message.error('请上传公示图片');
						this.isSave = false;
						return false
					}
					// 检验民主评议
					if(data.ab_ex97 == "" && data.ab_ex34 == "有异议通过"){
						if(data.ab_ex202=='' || data.ab_ex202!=''){
							this.$message.error('请上传民主评议');
							this.isSave = false;
							return false
						}else{
							this.isSave = true;
						}
					}else{
						this.isSave = true;
					}
					
					console.log("data.ab_ex34",this.isSave);
				}
				else if(data.ab_ex34 == "有异议退回"){
					// 检验公示地点
					if(data.ab_ex47 == "" ){
						this.$message.error('请输入公示地点');
						this.isSave = false;
						return false
					}
					if(data.ab_ex35 == ""){
						this.$message.error('请选择退回原因');
						this.isSave=false;
						return false
					}else if(data.ab_ex35 == "其他" && data.ab_ex178=="" ){
						this.$message.error('请填报退回描述');
						this.isSave=false;
						return false
					}else if(data.ab_ex98 == ""||data.ab_ex98=="NULL"){
						if(data.ab_ex202=='' || data.ab_ex202!=''){
							this.$message.error('请上传公示图片');
							this.isSave = false;
							return false
						}else{
							this.isSave=true;
						}
					}
					else if(data.ab_ex97==""){
						if(data.ab_ex202=='' || data.ab_ex202!=''){
							this.$message.error('请上传民主评议');
							this.isSave = false;
							return false
						}else{
							this.isSave=true;
						}
					}
					else if(!['其他','死亡'].includes(data.ab_ex35) && data.ab_ex175==""){
					// else if(data.ab_ex175==""){
						if(data.ab_ex202=='' || data.ab_ex202!=''){
							// 有异议退回，退回原因选择其他可以不上传退回材料吗？---不能2022.06.06
							this.$message.error('请上传退回材料');
							this.isSave = false;
							return false;
						}else{
							this.isSave = true;
						}
					}
					else{
						this.isSave = true;
					}
				} 
				else if(data.ab_ex34 == "退回"){
					if(data.ab_ex35 == ""){
						this.$message.error('请选择退回原因');
						this.isSave=false;
						return false
					}else if(data.ab_ex35 == "其他" && data.ab_ex178=="" ){
						this.$message.error('请填报退回描述');
						this.isSave=false;
						return false
					}
					else if(!['其他','死亡'].includes(data.ab_ex35) && data.ab_ex175==""){
						if(data.ab_ex202=='' || data.ab_ex202!=''){
							this.$message.error('请上传退回材料');
							this.isSave = false;
							return false;
						}else{
							this.isSave = true;
						}
					}
					else{
						this.isSave = true;
					}
				}

				console.log(this.isSave,'this.isSave');
				// return false
				
				if(this.isSave){
						this.loading = true;

						// 保存按钮禁用
						this.saveDisabled = true;
						// 设置定时器，30秒请求失败刷新页面
						let time = setTimeout(()=>{
										this.loading = false;
										this.$message.error("网络异常");
										this.$emit("closes", false)
										// this.$router.go(-1)
										this.closeView();
									},30000)
						this.saveBasicgs({
							"data": "[" + JSON.stringify(data) + "]",
							"sId": this.sId,
							"ab_ex98": data.ab_ex98,
							"ab_ex97": data.ab_ex97,
						}).then((res) => {
							if (res[0].status=="+OK") {
								this.loading = false;
								this.$message.success(res[0].msg)
								this.closeView();
							} else {
								this.loading = false;
								this.$message.error(res[0].msg)
							}
						}).catch((res) => {
							// 数据请求成功删除定时器
							clearTimeout(time);
							if (res.response.data[0].status=="+OK") {
								this.loading = false;
								this.$message.success(res.response.data[0].msg)
								this.closeView();
							} else {
								this.loading = false;
								this.$message.error(res.response.data[0].msg)
							}
						})
					}
			},

			
			// 审批
			async save3() {
			// async save3(data) {
				let data = this.approval
				console.log(data.ab_ex21);

				console.log(data)
				if (data.ab_ex21 == "") {
					this.$message.error('请选择审批意见');
					this.isSave=false;
					return false;
				}else if (data.ab_ex21 == "同意") {
					
					console.log(this.isSave,'isSave');

				}else if(data.ab_ex21 == "退回"){
					if(data.ab_ex26 == ""){
						this.$message.error('请选择退回原因');
						this.isSave=false;
						return false
					}else if(data.ab_ex26 == "其他" && data.ab_ex178=="" ){
						this.$message.error('请填报退回描述！');
						this.isSave=false;
						return false
					}
					else if(!['其他','死亡'].includes(data.ab_ex26) && data.ab_ex175==""){
						if(data.ab_ex202=='' || data.ab_ex202!=''){
							this.$message.error('请上传退回材料！');
							this.isSave=false;
							return false;
						}else{
							this.isSave=true;
						}
					}
					else{
						this.isSave = true;
					}
				}else if(data.ab_ex21 == "驳回"){
					if(data.ab_ex26 == ""){
						this.$message.error('请填写驳回原因！');
						this.isSave=false;
						return false
					}
				}
				
				this.isSave = true;
				

				if(this.isSave) {
					// console.log('保存');
					// return false
					this.loading = true;

					// 保存按钮禁用
					this.saveDisabled = true;
					// 设置定时器，30秒请求失败刷新页面
					let time = setTimeout(()=>{
									this.loading = false;
									this.$emit("closes", false)
									this.$message.error("网络异常");
									// this.$router.go(-1)
									this.closeView();
								},30000)
					this.saveBasicsh({
						"data": "[" + JSON.stringify(data) + "]",
						"sId": this.sId,
					}).then((res) => {
						console.log('审批返回标记 then =>',res);
						if (res[0].status=="+OK") {
							this.loading = false;
							this.$message.success(res[0].msg)
							this.closeView()
						} else {
							this.loading = false;
							this.$message.error(res[0].msg)
						}
					}).catch((res) => {
						// 数据请求成功删除定时器
						console.log('审批返回标记 catch =>',res);
						clearTimeout(time);
						if (res.response.data[0].status=="+OK") {
							this.loading = false;
							this.$message.success(res.response.data[0].msg)
							this.closeView()
						} else {
							this.loading = false;
							this.$message.error(res.response.data[0].msg)
						}
					})
				}
			},
			//初审 /.退回
			saveBasiccs(data) {
				let url = ''
				if (this.type == 'th') {
					console.log(data);
					url = "/social/assistance/saveBasicth"
				} else {
					console.log(data);
					url = "/social/assistance/saveBasiccs"
				}
				return request({
					headers: {
						'Accept': 'application/json',
					},
					url: url,
					method: 'post',
					data: data
				})
			},
			//公示
			saveBasicgs(data) {
				return request({
					headers: {
						'Accept': 'application/json',
					},
					url: '/social/assistance/saveBasicgs',
					method: 'post',
					data: data
				})
			},
			//审批
			saveBasicsh(data) {
				return request({
					headers: {
						'Accept': 'application/json',
					},
					url: '/social/assistance/saveBasicsh',
					method: 'post',
					data: data
				})
			},
			
			// 关闭本页面
			closeView() {
				this.$emit("closes", false)
				this.$router.go(-1)
				if(process.env.NODE_ENV!="development"){
					this.$router.go(-1)
				}
			},

			// 获取图片数量
			getImgNum(){
				for(let key in this.imgArr){
					if(this.imgArr[key][0]==''){
						this.imgArr[key].length=0
						this.imgNum[key]=this.imgArr[key].length
					}else{
						this.imgNum[key]=this.imgArr[key].length
						// console.log("图片数量",this.imgArr[key].length);
					}
				}
			},

			//获取图片索引
			getImgIndex(item){
				let data=JSON.parse(item);
				this.imgIndex[data.id]=data.index;
			},
			// 图片移除
			handleRemove(file, str) {
				this.$confirm('是否删除该图片？',"提示" , {
				// distinguishCancelAndClose: true,
				confirmButtonText: '确定',
				cancelButtonText: '取消'
				}).then(() => {
					this.$delete(this.imgArr[str+"_len"],this.imgIndex[str]);
					this.basicInf[str]=this.imgArr[str+"_len"].join(",");
					this.getImgNum()  //获取图片数量
				})
				.catch(action => {
					// 取消留在本页
					console.log("留在本页");
				});
			},

			isShow(n) {
				this.isShow1 = true;
				this.isShow2 = true;
				this.isShow3 = true;
				this.isShow8 = true;
				this.isShow9 = true;
				this.isShow10 = true;
				this.isShow11 = true;
				this.isShow24 = true;

				if (n == 1) {
					this.isShow1 = false
				} else if (n == 2) {
					this.isShow2 = false
				} else if (n == 3) {
					this.isShow3 = false
				}
				else if (n == 8) {
					this.isShow8 = false
				} else if (n == 9) {
					this.isShow9 = false
				}
				else if (n == 10) {
					this.isShow10 = false
				}
				else if (n == 11) {
					this.isShow11 = false
				}
				else if (n == 24) {
					this.isShow24 = false
				}
			},
			uploads(id) {
				this.dialogVisible3 = true;
				this.uploadId = id;
				try {
					this.$refs.myUpload.clears();
				} catch (e) {}
			},
			// 上传事件
			uploadEvent(data) {
				
				let val = this.publicity[this.uploadId];
				val = val == "" ? data : val + "," + data;
				this.publicity[this.uploadId] = val;
				this.imgArr[this.uploadId + "_len"] = this.publicity[this.uploadId].split(",");


				// console.log(data); 
				// console.log(this.publicity,'--publicity');
				// console.log(this.imgArr,'--imgArr');
				this.getImgNum()  //获取图片数量
			},
			//获取性别
			getSex(card){
				let sex = "";
				let msg = isCardID(card);
				// console.log(msg);
				if(msg == true){
					if(parseInt(card.substr(16,1))%2==1){ 
						sex="男";
					}else 
						sex="女";
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
			
		}
	}
</script>
<style scoped>
	.g-box {
		height: 80VH !important;
	}
	.g-box2{
		width:100%;
		height:100%;
		overflow: auto !important;
		display: flex;
		display: -webkit-flex;
		flex-direction: row;
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
		margin-bottom: 30px;
	}

	.imgSt {
		width: 140px;
		margin-top: -4%;
		z-index: 10000;
		transform: rotate(30deg);
		-ms-transform: rotate(30deg);
		/* IE 9 */
	}

	.line_blue {
		border-left: 2px solid #3385FF;
	}

	.family {
		width: 100%;
		margin-top: 20px;
		margin-bottom: 50px;
	}

	.top_3 {
		width: 50%;
		float: left;
	}

	.top_4 {
		height: 200px;
		margin-top: 40px;
		margin-bottom: -30px;
	}

	.demo-image__preview {
		height: 200px;
		width: 200px;
		float: left;
		margin-left: 5%;
		overflow: hidden;
		margin-top:15px;
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
	.btn button {
		padding: 2px 6px;
		background: #ffffff;
		border: 1px solid #606266;
	}
	.btn :nth-child(1) {
		margin-right: 5px;
		background: blue;
		color: #ffffff;
		border: 1px solid blue;

	}
	.block{
		width: 100%;
		height: 200px;
	}
	.changeTypeGroup{
		margin: 0 5px;
	}
</style>
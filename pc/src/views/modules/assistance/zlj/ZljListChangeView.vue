<template>
	<div class="g-box">
		<div class='g-box2'>
			<div class="info2">
				<el-form :inline="true" class="demo-form-inline">
					<h3 class="line_blue" id="page1">&emsp;档案信息</h3>
					<div class="lineSt"></div>
					<div class="top_1">
						<table class="top_2">
							<tr style="height:40px;">
								<td >申请人:</td>
								<td colspan='2'>{{basicInf.ab_ex3}}</td>
								<td >身份证号码:</td>
								<td colspan='2'>{{basicInf.ab_ex7}}</td>
								<td rowspan="2"></td>
							</tr>
							<tr>
								<td>申请时间:</td>
								<td colspan='2'>{{basicInf.ab_dat14}}</td>
								<!-- 占位用的，用来把图片挤到右边 -->
								<td ></td>
								<td colspan='2'></td>
								<td>
									<img v-if="basicInf.ac_ex3 == '申请'"
										src='../../../../assets/img/auditStatus/notSubmitted.png' class='imgSt'>
									<img v-else-if="basicInf.ac_ex3 == '核对中'"
										src='../../../../assets/img/auditStatus/audit.png' class='imgSt'>
									<img v-else-if="basicInf.ac_ex3 == '办结'"
										src='../../../../assets/img/auditStatus/enjoyment.png' class='imgSt'>
									<img v-else-if="basicInf.ac_ex3 == '办结' || basicInf.ac_ex3=='审核通过'"
										src='../../../../assets/img/auditStatus/passTheAudit.png' class='imgSt'>
									<img v-else-if="basicInf.ac_ex3 == '退回'"
										src='../../../../assets/img/auditStatus/return.png' class='imgSt'>
									<img v-else src='../../../../assets/img/auditStatus/audit.png' class='imgSt'>
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
								<!-- <td style="width:40%;">{{basicInf.address}}</td> -->
								<td style="width:40%;">{{address}}</td>
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
							<tr style="height:40px;">
								<td>求助原因:</td>
								<td>{{basicInf.ab_ex46}}</td>
								<td  >是否属于村干部或经办人员近亲属:</td>
								<td >{{basicInf.ab_ex92}}</td>
							</tr>
							

							<tr style="height:40px;">
								<td>变更理由:</td>
								<td >{{basicInf.ac_ex10}}</td>
								<td>是否渐退期:</td>
								<td v-if="this.basicInf.ab_ex41=='低收入型低保'">{{basicInf.ac_ex207}}</td>
							</tr>
						</table>
					</div>
					
					<div v-if="basicInf.ab_ex92=='是'">	
						<h3 class="line_blue" id="page21" >&emsp;村干部或经办人员近亲属信息</h3>
						<div class="lineSt"></div>
						<div class="family">
							<el-table :data="tableData7" border style="width: 100%">
								<el-table-column prop="abm_ex3" label="姓名"  min-width="100"></el-table-column>
								<el-table-column prop="abm_ex1" label="近亲属关系"  min-width="150"></el-table-column>
								<el-table-column prop="abm_ex15" label="任职机构和职位"  min-width="280"></el-table-column>
							</el-table>
							
						</div>
					</div>

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

					<h3 class="line_blue" id="page13">&emsp;自定义预警</h3>
					<div class="lineSt"></div>
					<div class="top_1">
						<table class="top_2">
							<tr style="height:40px;" v-for="(item,index) in warningData" :key="index">
								<td style="width:10%;">预警内容:</td>
								<td style="width:20%;">{{warningData[index].aw_ex1}}</td>
								<td style="width:10%;">预警时间:</td>
								<td style="width:20%;">{{warningData[index].aw_dat1.slice(0,10)}}</td>
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
					<h3 class="line_blue" id="page12" style='margin-top:20px'>&emsp;变更报告</h3>
					<div class="lineSt"></div>
					<div class="top_1" style='width:95%'>
						<div class='change_item' v-for="(item,index) in changeChild" :key="index">
							<div class='item' v-if="item.acc_ex5_1!='N'">{{item.acc_ex5}}</div>
							<div class='item_child' v-if="item.acc_ex7==''" style='margin-left:15px'>
								<!-- <span class='item_text'>{{item.acc_ex1}}</span>:从
								<span style='color:blue'>{{item.acc_ex2=="" ? "空":item.acc_ex2}}</span>变成
								<span style='color:green'>{{item.acc_ex3}}</span> -->
								<!-- 有图片显示图片 是文字显示内容 -->
								<span class='item_text'>{{item.acc_ex1}}</span>：从
								
								<span style='color:blue' v-if='item.acc_ex2==""'>空</span>
								<span style='color:blue' v-else-if='item.acc_ex2.indexOf("/social/minios/show?filename")==-1'>{{item.acc_ex2}}</span>
								<!-- item.acc_ex2.split(',')只有自己的数组 -->
								<!-- item.acc_ex2.match(/''(\S*)''/)[1] 以''开头 以''结束的字符串 -->
								<image-view v-else :imgList="item.acc_ex2.split(',')" height="150px" width="150px"></image-view>
								
								变成
								<span style='color:green' v-if='item.acc_ex3==""'>空</span>
								<span style='color:green' v-else-if='item.acc_ex3.indexOf("/social/minios/show?filename")==-1'>{{item.acc_ex3}}</span>
								<!-- item.acc_ex3.split(',')只有自己的数组 -->
								<!-- item.acc_ex2.match(/''(\S*)''/)[1] 以''开头 以''结束的字符串 -->
								<image-view v-else :imgList="item.acc_ex3.split(',')" height="150px" width="150px"></image-view>
							</div>
							<div v-else>
								<div v-if="item.acc_ex7_1!='N'">
									<div v-if="item.acc_ex6=='修改'" class='item_1_1'>
										<div class='item_1'>数据变更情况:</div>
											<span class='item_1_1 item_text'>{{item.acc_ex8}}，{{item.acc_ex1}}</span>：从<span
												style='color:blue'>{{item.acc_ex2=="" ? "空":item.acc_ex2}}</span> 变成 <span
												style='color:green'>{{item.acc_ex3}}</span>；
									</div>
									<div v-else-if="item.acc_ex6=='删除'" class='item_1_1'>
										<div class='item_1'>删除数据：</div><span
											class='item_1_1 item_text'>{{item.acc_ex1}}</span>：{{item.acc_ex2}} ;
									</div>
									<div v-else-if="item.acc_ex6=='核减'" class='item_1_1'>
										<div class='item_1'>核减数据：</div><span
											class='item_1_1 item_text'>{{item.acc_ex1}}</span>：{{item.acc_ex2}} ;
									</div>
									<div v-else class='item_1_1'>
										<div class='item_1'>新增数据：</div><span
											class='item_1_1 item_text'>{{item.acc_ex1}}</span>：{{item.acc_ex3}} ;
									</div>
								</div>
								<div v-else style='margin-left:30px;'>
									<div v-if="item.acc_ex6=='修改'"><span
										class='item_text'>{{item.acc_ex8}}，{{item.acc_ex1}}</span>：从<span
										style='color:blue'>{{item.acc_ex2=="" ? "空":item.acc_ex2}}</span> 变成 <span
										style='color:green'>{{item.acc_ex3}}</span>；
									</div>
									<div v-else-if="item.acc_ex6=='删除'">
										<!--acc_ex2为空，acc_ex4为abm_ex68 不显示内容  -->
										<div v-if="item.acc_ex2!='' && item.acc_ex4!='abm_ex68'">
											<span class='item_text' >{{item.acc_ex1}}</span>
											：{{item.acc_ex2}} ;
										</div>
									</div>
									<div v-else-if="item.acc_ex6=='核减'">
										<!--acc_ex2为空，acc_ex4为abm_ex68 不显示内容  -->
										<div v-if="item.acc_ex2!='' && item.acc_ex4!='abm_ex68'">
											<span class='item_text' >{{item.acc_ex1}}</span>
											：{{item.acc_ex2}} ;
										</div>
									</div>
									<div v-else><span class='item_text'>{{item.acc_ex1}}</span>：{{item.acc_ex3}} ;</div>
								</div>
							</div>
						</div>
					</div>
					<div style='clear:both'></div>
					<h3 class="line_blue" id="page9" style='margin-top:15px'>&emsp;电子附件</h3>
					<div class="lineSt"></div>
					<div class="top_1">
						<!-- <div class="top_4"> -->
						<el-row :gutter="20">
							<el-col :span="12">
								<el-card class="box-card">
									<div slot="header" class="clearfix">
										<span>身份证(<span style='color:red'>{{imgNum.ab_ex10_len}}</span>)</span>
										
									</div>
									<!-- <image-view :imgList="this.basicInf.ab_ex10.split(',')" height="150px" width="150px"></image-view> -->
									<!-- 增加v-if的目的是为了让子组件有值再显示 -->
									<image-view  v-if="this.imgArr.ab_ex10_len" :imgList="this.imgArr.ab_ex10_len" height="150px" width="150px"></image-view>
									
								</el-card>
							</el-col>
							<el-col :span="12">
								<el-card class="box-card">
									<div slot="header" class="clearfix">
										<span>纸质授权书(<span
										style='color:red'>{{imgNum.ab_ex177_len}}
										<!-- {{basicInf.ab_ex177.split(',')[0]=="" ? 0 : basicInf.ab_ex177.split(',').length}} -->
										</span>)</span>
										
									</div>
									<image-view  v-if="this.imgArr.ab_ex177_len" :imgList="this.imgArr.ab_ex177_len" height="150px" width="150px"></image-view>
									
								</el-card>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="12">
								<el-card class="box-card">
									<div slot="header" class="clearfix">
										<span>民主评议(<span
											style='color:red'>{{imgNum.ab_ex97_len}}
											<!-- {{basicInf.ab_ex97.split(',')[0]=="" ? 0 : basicInf.ab_ex97.split(',').length}} -->
											</span>)</span>
										
									</div>
									<image-view  v-if="this.imgArr.ab_ex97_len" :imgList="this.imgArr.ab_ex97_len" height="150px" width="150px"></image-view>
									<!-- <image-view :imgList="this.basicInf.ab_ex97.split(',')" height="150px" width="150px"></image-view> -->
									
								</el-card>
							</el-col>
							<el-col :span="12">
								<el-card class="box-card">
									<div slot="header" class="clearfix">
										<span>其他材料(<span
									style='color:red'>{{imgNum.ab_ex16_len}}</span>)</span>
									</div>
									<image-view :imgList="this.imgArr.ab_ex16_len" height="150px" width="150px"></image-view>
								</el-card>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="12">
								<el-card class="box-card">
									<div slot="header" class="clearfix">
										<span>审核审批表(<span
											style='color:red'>{{imgNum.ab_ex74_len}}</span>)</span>
									</div>
									<image-view  v-if="this.imgArr.ab_ex74_len" :imgList="this.imgArr.ab_ex74_len" height="150px" width="150px"></image-view>
								</el-card>
							</el-col>
							<el-col :span="12">
								<el-card class="box-card">
									<div slot="header" class="clearfix">
										<span>电子授权书(<span style='color:red'>{{imgNum.ab_ex73_len}}</span>)</span>
									</div>
									<image-view  v-if="this.imgArr.ab_ex73_len" :imgList="this.imgArr.ab_ex73_len"  height="150px" width="150px"></image-view>
								</el-card>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="12" >
								<el-card class="box-card">
									<div slot="header" class="clearfix">
										<span>公示图片(<span style='color:red'>{{imgNum.ab_ex98_len}}</span>)</span>
									</div>
									<image-view v-if="this.imgArr.ab_ex98_len" :imgList="this.imgArr.ab_ex98_len" height="150px" width="150px"></image-view>
									
								</el-card>
							</el-col>
						</el-row>
					</div>

					<h3 class="line_blue" id="page18" style='margin-top:15px'>&emsp;代理人信息</h3>
					<div class="lineSt"></div>
					<div class="top_1">
						<table class="top_2">
							<tr style="height:40px;">
								<td style="width:10%; padding: 0px 0px 0px 10px;">姓名: </td>
								<td style="width:40%;">{{agentInfo.aba_ex1}}</td>
								<td style="width:10%; padding: 0px 0px 0px 10px;">身份证号:</td>
								<td style="width:40%;">{{agentInfo.aba_ex3}}</td>
							</tr>
						</table>
						<el-row :gutter="20">
							<el-col :span="12">
								<el-card class="box-card">
									<div slot="header" class="clearfix">
										<span>身份证(<span style='color:red'>{{imgNum.aba_ex4_len}}</span>)</span>
									</div>
									<image-view v-if="this.imgArr.aba_ex4_len" :imgList="this.imgArr.aba_ex4_len" height="150px" width="150px"></image-view>
								</el-card> 
							</el-col>
							<el-col :span="12">
								<el-card class="box-card">
									<div slot="header" class="clearfix">
										<span>委托书(<span style='color:red'>{{imgNum.aba_ex5_len}}</span>)</span>
									</div>
									<image-view v-if="this.imgArr.aba_ex5_len" :imgList="this.imgArr.aba_ex5_len" height="150px" width="150px"></image-view>
								</el-card>
							</el-col>
						</el-row>
					</div>
					<!-- 重复预警 -->
					<repeatWarnView id="page20" v-if="',申请,退回,'.indexOf(',' + basicInf.ab_ex15 + ',') == -1"></repeatWarnView>
					
					<h3 class="line_blue"  id="page24" style='margin-top:15px'>&emsp;汇总表</h3>
					<div class="lineSt"></div>
					<el-table :data="[basicInf]" border style="width: 100%;margin-bottom:20px;">
					<!-- <el-table :data="oldData" border style="width: 100% ; margin-bottom:20px;"> -->
						<el-table-column   label="变更前汇总表" >
							<el-table-column prop="ab_ex13"  label="救助类别" min-width="100"></el-table-column>
							<el-table-column prop="ab_ex3" label="申请人"  min-width="100"></el-table-column>
							<el-table-column prop="ab_ex40" label="原 家庭月保障金额（元）" min-width="160"></el-table-column>	
							<el-table-column  label="明细" min-width="120" v-if="['低保','特困供养'].includes(publicity.ab_ex13)">
								<template slot-scope="scope" v-if="['低保','特困供养'].includes(publicity.ab_ex13)">
									<el-button @click="moneyDetail(scope.row)" type="text" size="small">明细</el-button>
								</template>
							</el-table-column>		
						</el-table-column>
					</el-table>

					<el-table v-if="this.newData.length>0" :data="newData" border style="width: 100%;margin-bottom:15px;">
						<el-table-column  label="变更后汇总表" >
							<el-table-column  prop="ab_ex13"  label="救助类别" min-width="100"></el-table-column>
							<el-table-column prop="ab_ex3" label="申请人"  min-width="100"></el-table-column>
							<el-table-column prop="ab_ex40" label="家庭月保障金额（元）" min-width="160"></el-table-column>							
							<el-table-column  label="明细" min-width="120" v-if="['低保','特困供养',''].includes(publicity.ab_ex13)">
								<template slot-scope="scope" v-if="['低保','特困供养',''].includes(publicity.ab_ex13)">
									<el-button @click="moneyDetail2(scope.row)" type="text" size="small">明细</el-button>
								</template>
							</el-table-column>		
						</el-table-column>
					</el-table>
					<!-- <div v-else style="color:red;">暂无变更后汇总表</div> -->

					<div style='clear:both'></div>
					<h3 class="line_blue" id="page11" style="margin-top: 20px;" v-if="this.type == 'cs'">&emsp;审核</h3>
					<div class="lineSt" v-if="this.type == 'cs'"></div>
					<div class="top_1" v-if="this.type == 'cs'">
						<el-row>
							<el-col :span="2">
								<div style="line-height: 30px;text-align:center">审核意见</div>
							</el-col>
							<el-col :span="6">
								<el-select @change="changeSh" v-model="auditValue.ac_ex4" placeholder="请选择">
									<el-option v-for="item in options" :key="item.value" :label="item.label"
										:value="item.value"></el-option>
								</el-select>
							</el-col>
							<el-col :span="2">
								<div style="line-height: 30px;text-align:center;">审核人</div>
							</el-col>
							<el-col :span="6">
								<el-input v-model="auditValue.ac_ex6"></el-input>
							</el-col>
							<el-col :span="2" style="line-height: 30px;text-align:center;">
								<div>审核时间</div>
							</el-col>
							<el-col :span="6">
								<el-date-picker v-model="auditValue.ac_dat2" type="datetime"
									value-format="yyyy-MM-dd HH:mm" placeholder="选择审核时间">
								</el-date-picker>
							</el-col>
						</el-row>
						<el-row style="margin-top: 10px;">
							<el-col :span="2" style="line-height: 30px;text-align:center;">
								<div>备注</div>
							</el-col>
							<el-col :span="22">
								<el-input type="textarea" autosize v-model="auditValue.ac_ex5"></el-input>
							</el-col>
						</el-row>
						<el-row style="margin-top: 10px;" type="flex" justify="center">
							<el-col :span="24" style="text-align: center;">
								<el-button type="primary" @click="save(auditValue)" :disabled='disabled'>保存</el-button>
							</el-col>
						</el-row>
					</div>
					<br>
					<!-- //退回 -->
					<h3 class="line_blue" id="page11" style="margin-top: 20px;" v-if="this.type == 'th'">&emsp;审核</h3>
					<div class="lineSt" v-if="this.type == 'th'"></div>
					<div class="top_1" v-if="this.type == 'th'">
						<el-row>
							<el-col :span="2">
								<div style="line-height: 30px;text-align:center;">审核意见</div>
							</el-col>
							<el-col :span="6">
								<el-select @change="changeSh" v-model="auditValue.ac_ex4" placeholder="请选择">
									<el-option v-for="item in options1" :key="item.value" :label="item.label"
										:value="item.value"></el-option>
								</el-select>
							</el-col>
							<el-col :span="2">
								<div style="line-height: 30px;text-align:center;">审核人</div>
							</el-col>
							<el-col :span="6">
								<el-input v-model="auditValue.ac_ex6"></el-input>
							</el-col>
							<el-col :span="2" style="line-height: 30px;text-align:center;">
								<div>审核时间</div>
							</el-col>
							<el-col :span="6">
								<el-date-picker v-model="auditValue.ac_dat2" type="datetime"
									value-format="yyyy-MM-dd HH:mm" placeholder="选择审核时间">
								</el-date-picker>
							</el-col>
						</el-row>
						<el-row style="margin-top: 10px;">
							<el-col :span="2" style="line-height: 30px;text-align:center;">
								<div>退回原因</div>
							</el-col>
							<el-col :span="22">
								<el-input type="textarea" autosize v-model="auditValue.ac_ex5"></el-input>
							</el-col>
						</el-row>
						<el-row style="margin-top: 10px;" type="flex" justify="center">
							<el-col :span="24" style="text-align: center;">
								<el-button type="primary" @click="save(auditValue)" :disabled='disabled'>保存</el-button>
							</el-col>
						</el-row>
					</div>
					<br>

					<h3 class="line_blue" id="page11" style="margin-top: 20px;" v-if="this.type == 'sp'">&emsp;审批</h3>
					<div class="lineSt" v-if="this.type == 'sp'"></div>
					<div class="top_1" v-if="this.type == 'sp'">
						
						<div class="lineSt"></div>
						<el-row style="margin-top: 20px;">
							<el-col :span="2">
								<div style="line-height: 30px;text-align:center;">审批意见</div>
							</el-col>
							<el-col :span="6">
								<el-select @change="changeSh" v-model="approval.ac_ex7" placeholder="请选择">
									<el-option v-for="item in options3" :key="item.value" :label="item.label"
										:value="item.value"></el-option>
								</el-select>
							</el-col>
							<el-col :span="2">
								<div style="line-height: 30px;text-align:center;">审批人</div>
							</el-col>
							<el-col :span="6">
								<el-input v-model="approval.ac_ex9"></el-input>
							</el-col>
							<el-col :span="2" style="line-height: 30px;text-align:center;">
								<div>审批时间</div>
							</el-col>
							<el-col :span="6">
								<el-date-picker v-model="approval.ac_dat3" type="datetime"
									value-format="yyyy-MM-dd HH:mm" placeholder="选择审批时间">
								</el-date-picker>
							</el-col>
						</el-row>
						<el-row style="margin-top: 10px;">
							<el-col :span="2" style="line-height: 30px;text-align:center;">
								<div>备注</div>
							</el-col>
							<el-col :span="22">
								<el-input type="textarea" autosize v-model="approval.ac_ex8"></el-input>
							</el-col>
						</el-row>
						<el-row style="margin-top: 10px;" type="flex" justify="center">
							<el-col :span="24" style="text-align: center;">
								<el-button type="primary" @click="save3(approval)" :disabled='disabled'>保存</el-button>
							</el-col>
						</el-row>
					</div>
					<br>

					<h3 class="line_blue" id="page10" v-if="this.type!='zx'">&emsp;审批记录</h3>
					<div class="lineSt" v-if="this.type!='zx'"></div>
					<div class="top_1" v-if="this.type!='zx'">
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
								<tbody>
									<tr>
										<td style="color:#899197;height:30px">处理步骤：</td>
										<td>申请变更</td>
										<td style="color:#899197">处理时间：</td>
										<td>{{basicInf.ac_dat1}}</td>
										<td style="color:#899197">处理结果：</td>
										<td rowspan="2" style="text-align:left">
											<img src="../../../../assets/img/auditStatus/agree.png" style="width:100px">
										</td>
									</tr>
									<tr style="border-bottom:1px solid #ddd">
										<td style="color:#899197;height:30px">申请变更人</td>
										<td>{{basicInf.ac_ex2}}</td>
										<td style="color:#899197">申请理由</td>
										<td>{{basicInf.ac_ex10}}</td>
									</tr>
									<tr>
										<td colspan="5" style="height:20px">&nbsp;</td>
									</tr>
								</tbody>
								<tbody v-for="(itemR,index) in record" :key="index">
									<tr>
										<td style="color:#899197;height:30px">处理步骤：</td>
										<td>{{itemR.ar_ex4}}</td>
										<td style="color:#899197">处理时间：</td>
										<td>{{itemR.ar_dat1}}</td>
										<td style="color:#899197">处理结果：</td>
										<td rowspan="2" style="text-align:left">
											<!-- <img v-if="itemR.ar_ex3 == '同意'"
												src="../../../../assets/img/auditStatus/agree.png" style="width:100px">
											<img v-else src="../../../../assets/img/auditStatus/return.png" style="width:100px"> -->
											<img v-if="itemR.ar_ex3 == '同意'||itemR.ar_ex3 =='无异议' ||itemR.ar_ex3.indexOf('通过')!=-1 "
												src="@/assets/img/auditStatus/agree.png" style="width:100px">
											<img v-else-if="itemR.ar_ex3 =='驳回'" src="@/assets/img/auditStatus/return2.png"
												style="width:100px">
											<img v-else src="@/assets/img/auditStatus/return.png"
												style="width:100px">
										</td>
									</tr>
									<tr>
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
								<!-- <tbody><tr><td style="color:#899197;height:30px">处理步骤：</td><td>{{basicInf.ar_ex4}}</td><td style="color:#899197">处理时间：</td><td>{{basicInf.ar_dat1}}</td><td style="color:#899197">处理结果：</td><td rowspan="2" style="text-align:left"><img src="http://221.130.79.150:10088/image/aud/%E5%90%8C%E6%84%8F.png" style="width:100px"></td></tr><tr><td style="color:#899197;height:30px">处理人：</td><td>{{basicInf.ar_ex5}}</td><td style="color:#899197">处理用时：</td><td>{{basicInf.ar_ex6}}天</td></tr><tr style="border-bottom:1px solid #ddd"><td style="color:#899197;height:30px">处理意见：</td><td colspan="4">{{basicInf.ar_ex2}}</td></tr><tr><td colspan="5" style="height:20px">&nbsp;</td></tr></tbody> -->
							</table>
						</div>
					</div>
				</el-form>
			</div>
			<div class="ainfo2">
				<div style="margin-left:20px;text-align:center;border-bottom:1px solid #ddd;padding-bottom:10px;">
					<!-- <el-button type="primary" size="small" @click="save">保存</el-button> -->
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
						<li v-if="basicInf.ab_ex92=='是'" :class="{listStyle:isShow21}" @click="isShow(21)">
							<a class="ainfoFont" :class="{listStyleA:!isShow21}" @click="counter('#page21')">近亲属信息</a><br>
						</li>
						<li :class="{listStyle:isShow3}" @click="isShow(3)">
							<a class="ainfoFont" :class="{listStyleA:!isShow3}" @click="counter('#page3')">银行信息</a><br>
						</li>
						<li :class="{listStyle:isShow13}" @click="isShow(13)">
							<a class="ainfoFont" :class="{listStyleA:!isShow13}" @click="counter('#page13')">自定义预警信息</a><br>
						</li>
						<li :class="{listStyle:isShow8}" @click="isShow(8)">
							<a class="ainfoFont" :class="{listStyleA:!isShow8}" @click="counter('#page8')">已享受救助情况</a><br>
						</li>
						<li :class="{listStyle:isShow12}" @click="isShow(12)">
							<a class="ainfoFont" :class="{listStyleA:!isShow12}" @click="counter('#page12')">变更报告</a><br>
						</li>
						<li :class="{listStyle:isShow9}" @click="isShow(9)">
							<a class="ainfoFont" :class="{listStyleA:!isShow9}" @click="counter('#page9')">电子附件</a><br>
						</li>
						<li :class="{listStyle:isShow18}" @click="isShow(18)">
							<a class="ainfoFont" :class="{listStyleA:!isShow18}" @click="counter('#page18')">代理人信息</a><br>
						</li>
						<li :class="{listStyle:isShow20}" @click="isShow(20)" v-if="',申请,退回,'.indexOf(',' + basicInf.ab_ex15 + ',') == -1" style="height:25px">
							<a class="ainfoFont" :class="{listStyleA:!isShow20}"  @click="counter('#page20')">重复预警</a>
						</li>
						<li :class="{listStyle:isShow24}" @click="isShow(24)" style="height:25px">
							<a class="ainfoFont" :class="{listStyleA:!isShow24}"  @click="counter('#page24')">汇总表</a>
						</li>
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

			<!-- 明细表 -->
			<el-dialog title="家庭月保障金额明细" :visible.sync="detailShow" top='30vh' center>
				<el-table :data="detailTable" border>
					<el-table-column property="abd_ex1" label="姓名" ></el-table-column>
					<el-table-column property="abd_ex2" label="成员关系" ></el-table-column>
					<el-table-column property="abd_ex3" label="救助标准" ></el-table-column>
					<el-table-column property="abd_ex10" label="救助类型" ></el-table-column>
					<!-- <el-table-column property="abd_ex4" v-if="approval.ab_ex13!='特困供养'" label="救助金" width="120"></el-table-column> -->
					<el-table-column property="abd_ex5" v-if="approval.ab_ex13=='特困供养' " label="生活费"></el-table-column>
					<el-table-column property="abd_ex6" v-if="approval.ab_ex13=='特困供养' " label="护理费"></el-table-column>
					<!-- <el-table-column property="abd_ex7" v-if="zfShow" label="增发类别"></el-table-column> -->
					<!-- <el-table-column property="abd_ex8" v-if="zfShow" label="增发金额"></el-table-column> -->
					<!-- <el-table-column property="abd_ex9" label="保障金额" ></el-table-column> -->
					<el-table-column  property="abd_ex9" label="救助金" ></el-table-column>
				</el-table>
				<br><hr><br>
				<div style="width:30%;margin:0 auto;">家庭月保障金合计为：<span style="color:red">{{this.ab_ex40}}</span></div>
			</el-dialog>
		</div>
	</div>
</template>
<script>
	import request from '@/utils/request'
	import imageView from '../imageView'
	// import  baseURL from '@/utils/baseUrl'
	import repeatWarnView from '@/views/modules/assistance/qzsq/components/repeatWarnView.vue'
	import { login } from '../../../../api/system/login'
	export default {
		name: "dbListView",
		components: {
			imageView,
			repeatWarnView
		},
		data() {
			return {
				warningData: [
					// {aw_ex1:"",aw_dat1:""},
					// {aw_ex1:"",aw_dat1:""},
					// {aw_ex1:"",aw_dat1:""}
				],
				tableData: [],
				tableData2: [],
				tableData2_: [],
				tableData3: [],
				tableData4: [],
				tableData5: [],
				tableData6: [],
				tableData7: [], //近亲属
				assistance: [],
				changeChild: [], //变更报告
				record: [],
				income1:[],
				income2:[],
				income3:[],
				income4:[],
				income5:[],
				income6:[],
				income7:[],
				agentInfo: { //代理人信息
					"aba_ex1": "",
					"aba_ex2": "",
					"aba_ex3": "",
					"aba_ex4": "",
					"aba_ex5": "",
				},  
				"landInfo": [], //山林
				flag: true,
				// 初审
				auditValue: {

				},
				// 公示
				publicity: {

				},
				//审批
				approval: {

				},
				options: [{
					value: '同意',
					label: '同意'
				}, {
					value: '退回',
					label: '退回'
				}],
				options1: [{
					value: '退回',
					label: '退回'
				}],

				options2: [{
					value: '无异议',
					label: '无异议'
				}, {
					value: '有异议',
					label: '有异议'
				}],
				// 审批选项
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
				isShow13: true,
				isShow14: true,
				isShow15: true,
				isShow16: true,
				isShow17: true,
				isShow18: true,
				isShow19: true,
				isShow20: true,
				isShow21: true,
				isShow22: true,
				isShow24: true,
				basicInf: {},
				oldData:[], //用来显示元汇总表的
				imgNum:{},//图片数量
				imgArr:{},//图片数组
				pay: {
					abp_ex4 :'',
					abp_ex5 :'',
					abp_ex6 :'',
					abp_ex7 :'',
					abp_ex8 :'',
					abp_ex9 :'',
					abp_ex10 :'',
					abp_ex11 :'',
				},
				sId: "",
				cId: "",
				type: "",
				detailShow:false, //详情列表展示
				detailTable:[{abd_ex9:''}], //救助金明细表
				dbStandard:'',
				tkStandard:'',
				// 变更的新数据
				newData:[],   //新主要数据
				newFamily:[], //新家庭数据
				newIncome:[], //新收入数据
				newPay:[],    //新支出数据
				newEstate:[], //新家庭财产数据
				changeType:'', //有值的时候 识别单人单户 选择的的是低保还是特困
				ab_ex40:'0.00',//明细表总额
				address:'', 	//区划
				disabled:false,//保存按钮禁用

			}
		},
		created() {
			this.loadData();
		},
		mounted() {
			// 滚动鼠标右侧导航栏跟随滚动位置改变而改变显示
			// window.removeEventListener('scroll',this.scroll,false)
			window.addEventListener('scroll',this.scroll,true)
		},
		methods: {
			
			// 楼层导航
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


				let oDiv8 = document.querySelector('#page8');
				let oDiv9 = document.querySelector('#page9');
				let oDiv11 = document.querySelector('#page11');
				let oDiv12 = document.querySelector('#page12');
				let oDiv13 = document.querySelector('#page13');
			
				let oDiv18 = document.querySelector('#page18');
				let oDiv20 = document.querySelector('#page20');
				let oDiv21 = this.basicInf.ab_ex92 == "是" ? document.querySelector('#page21') : true;
				let oDiv24 = document.querySelector('#page24');
				// 顺序跟上面显示顺序要相反
				let clientHeight = document.querySelector('.info2').clientHeight
				let recordtClientHeight = document.querySelector('#recordt').scrollHeight
				// 在新增dialog打开时不执行后面的程序
				if(!oDiv1 || !oDiv2 || !oDiv3 || !oDiv4 || !oDiv5 || !oDiv6 || !oDiv7 || !oDiv8 || !oDiv9 || !oDiv10|| !oDiv12|| !oDiv13|| !oDiv14|| !oDiv15|| !oDiv16|| !oDiv17|| !oDiv18|| !oDiv19|| !oDiv20 || !oDiv21 || !oDiv22 || !oDiv24){
					return ''
				}
				if (oDiv11 && scrollTop > (oDiv11.offsetTop-oDiv1.offsetTop-1)){
					// console.log('触发了11')
					this.isShow(11)
				}
				else if (oDiv24 && scrollTop > (oDiv24.offsetTop-oDiv1.offsetTop-1)){
					// console.log('触发了24')
					this.isShow(24)
				}
				else if(scrollTop > (oDiv20.offsetTop-oDiv1.offsetTop-1)){
					// console.log('触发了20')
					this.isShow(20)
				}else if(scrollTop > (oDiv18.offsetTop-oDiv1.offsetTop-1)){
					// console.log('触发了18')
					this.isShow(18)
				}else if(scrollTop > (oDiv9.offsetTop-oDiv1.offsetTop-1)){
					// console.log('触发了9')
					this.isShow(9)
				}else if(scrollTop > (oDiv18.offsetTop-oDiv1.offsetTop-1)){
					// console.log('触发了18')
					this.isShow(18)
				}else if(scrollTop > (oDiv12.offsetTop-oDiv1.offsetTop-1)){
					// console.log('触发了12')
					this.isShow(12)
				}else if(scrollTop > (oDiv8.offsetTop-oDiv1.offsetTop-1)){
					// console.log('触发了8')
					this.isShow(8)
				}else if(scrollTop > (oDiv13.offsetTop-oDiv1.offsetTop-1)){
					// console.log('触发了13')
					this.isShow(13)
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
				// const returnEle = document.querySelector("#page8"); //productId是将要跳转区域的id
				// if (!!returnEle) {
				// 	returnEle.scrollIntoView(true); // true 是默认的
				// }
				// document.querySelector("counter1").scrollIntoView(true); //这里的counter1是将要返回地方的id
			},

			async loadData() {
				//救助标准
				await this.getStandard();
				
				this.sId = this.$route.query.sId;
				this.cId = this.$route.query.cId;
				this.type = this.$route.query.type;

				// 对象数据
				this.getData({
					sId: this.sId,
					type: this.type,
					isbg: "Y"
				}).then(res => {
					// console.log(res)
					let json = res;
					this.basicInf = json[0].data[0]
					// this.record = res.response.data[0].record
					//console.log("record===============================")
					//console.log(json[0].record);
					this.record1(json[0].record);
					this.auditValue = json[0].data[0];
					this.publicity = json[0].data[0];
					this.approval = json[0].data[0];
					this.changeChild = json[0].child;
					
					if (this.type == "th")
						this.auditValue.ac_ex4 = "退回";
					
					this.loadData2(this.auditValue.ab_id);

					for (let i = 0; i < this.changeChild.length; i++) {
						let oldacc_ex5 = "";
						let oldacc_ex7 = "";
						if (i > 0) {
							oldacc_ex5 = this.changeChild[i - 1].acc_ex5;
							oldacc_ex7 = this.changeChild[i - 1].acc_ex7;
						}

						let acc_ex5 = this.changeChild[i].acc_ex5;
						let acc_ex7 = this.changeChild[i].acc_ex7;

						if (oldacc_ex5 == acc_ex5) {
							this.changeChild[i].acc_ex5_1 = "N";
						} else
							this.changeChild[i].acc_ex5_1 = "Y";
						if (oldacc_ex7 == acc_ex7 && acc_ex5 == oldacc_ex5) {
							this.changeChild[i].acc_ex7_1 = "N";
						} else
							this.changeChild[i].acc_ex7_1 = "Y";
					}
				}).catch(res => {
					if(typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200){
						console.log('请求失败了-----------------------')
						// this.$message.error('数据获取失败或请求超时')
						// this.$emit("closes", false)
						// this.$router.go(-1)
						this.closeView();
						return false
					}

					// console.log(res.response.data[0].data[0])
					let json = res.response.data;
					this.oldData = json[0].data;
					this.basicInf = json[0].data[0];

					// 区划拼接--有的区划显示不了市级名称
					this.address = this.basicInf.ab_ex161 + this.basicInf.ab_ex2 + this.basicInf.ab_ex1
					// console.log(this.address,'区划拼接');

					if(this.basicInf.ab_ex40 == ''){
						this.basicInf.ab_ex40 = "0.0";
					}

					this.record1(json[0].record)
					this.auditValue = json[0].data[0];
					this.publicity = json[0].data[0];
					this.approval = json[0].data[0];

					// 变更记录
					this.changeChild = json[0].child;
					
					// 把兴化儿童标记的 变更记录过滤掉不进行显示
					// this.changeChild = this.changeChild.filter(item=>{
					// 	return item.acc_ex1 !='兴化儿童标记';
					// })

					console.log(json[0].child , '变更记录');

					// if (this.type == "th"){
					this.auditValue.ac_ex4 = this.type == "th" ? "退回" : this.auditValue.ac_ex4;
					// }

					// console.log(this.changeChild.length,'变更记录个数');
					
					this.loadData2(this.auditValue.ab_id);

					for (let i = 0; i < this.changeChild.length; i++) {
						let oldacc_ex5 = "";
						let oldacc_ex7 = "";
						if (i > 0) {
							oldacc_ex5 = this.changeChild[i - 1].acc_ex5;
							oldacc_ex7 = this.changeChild[i - 1].acc_ex7;
						}

						let acc_ex5 = this.changeChild[i].acc_ex5;
						let acc_ex7 = this.changeChild[i].acc_ex7;

						if (oldacc_ex5 == acc_ex5) {
							this.changeChild[i].acc_ex5_1 = "N";
						} else
							this.changeChild[i].acc_ex5_1 = "Y";

						if (oldacc_ex7 == acc_ex7 && acc_ex5 == oldacc_ex5) {
							this.changeChild[i].acc_ex7_1 = "N";
						} else
							this.changeChild[i].acc_ex7_1 = "Y";
					}

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
					this.imgArr.ab_ex197_len = this.basicInf.ab_ex197.split(",")
					
					console.log(this.imgArr,'图片');
					for(let key in this.imgArr){
						if(this.imgArr[key][0] == ''){
							this.imgArr[key].length = 0;
							this.imgNum[key] = this.imgArr[key].length;
						}else{
							this.imgNum[key] = this.imgArr[key].length;
						}
					}


					// 新数据
					this.getChangeAfterData({
						sId: this.sId,
					}).then(res => {
						console.log(res,);
						this.warningData = res[0].data ;
					}).catch(res => {
						if(typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200){
							console.log('请求失败了-----------------------')
							// this.$message.error('数据获取失败或请求超时')
							// this.$emit("closes", false)
							// this.$router.go(-1)
							this.closeView();
							return false
						}
						// console.log('新数据测试=》',res.response.data[0]);
						if(res.response.data[0]){
							var familyData_Y = [];
							for(let i  in res.response.data[0].memberData){
								if(res.response.data[0].memberData[i].abm_ex6 == 'Y'){
									familyData_Y.push(res.response.data[0].memberData[i]);
								}
							}
							this.newData = res.response.data[0].basicData;
							this.newFamily = familyData_Y;
							this.newIncome = res.response.data[0].incomeData;
							this.newPay = res.response.data[0].payData;
							this.changeType = res.response.data[0].changeType;
						}
					})

					
					// 图片数量
					this.getImgNum();
					
					// 自定义预警
					this.loadWarning({
						sId:res.response.data[0].data[0].ab_id,
					}).then(res => {
						console.log(res,)
						this.warningData = res[0].data 
					}).catch(res => {
						if(typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200){
							console.log('请求失败了-----------------------')
							// this.$message.error('数据获取失败或请求超时')
							// this.$emit("closes", false)
							// this.$router.go(-1)
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
						// console.log(res.response.data[0]);
						// if(res.response.data[0].data.length>0){
						// 	for(let i=0;i< res.response.data[0].data.length;i++){
						// 		this.warningData[i] = res.response.data[0].data[i] 
						// 	}
						// }
					})		

					console.log(this.basicInf.ab_ex40,'----家庭保障金');

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
				// console.log(this.imgArr,"this.imgArr");
				// console.log(this.imgNum,"this.imgNum");
			},


			loadData2(sId) {

				// 已享受救助情况 tableData5表1 tableData6表2
				this.loadSalvation({
					sId: sId,
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
					this.tableData5 = res.response.data[0].data
					this.tableData6 = res.response.data[0].data2
				})


				//代理人信息
				this.loadAgent({
					"sId": this.sId
				}).then(res => {
					this.agentInfo = res[0].data
				}).catch(res => {
					if(typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200){
						console.log('请求失败了-----------------------')
						// this.$message.error('数据获取失败或请求超时')
						// this.$emit("closes", false)
						// this.$router.go(-1)
						return false
					}
					this.agentInfo = res.response.data[0].data
					this.imgArr.aba_ex4_len = this.agentInfo.aba_ex4.split(",");
					this.imgArr.aba_ex5_len = this.agentInfo.aba_ex5.split(",");
					for(let i in this.imgArr ){
						var r = this.imgArr[i].filter(function (s) {
								return s && s.trim();
								});
						// console.log(r,"过滤数组");
						if(i=='aba_ex4_len'){
							this.agentInfo.aba_ex4=r.join(",")
						}else if(i=='aba_ex5_len'){
							this.agentInfo.aba_ex5=r.join(",")
						}
					}
					this.getImgNum()
				});
			},

			//救助标准调用
			getStandard(data) {
				return request({
					headers: {
						'Accept': 'application/json',
					},
					url: '/social/assistance/getStandard',
					method: 'post',
					data: {}
				}).then(res=>{}).catch(res=>{
					console.log('救助标准=》',res.response.data[0]);
					
					var data = JSON.parse(JSON.stringify(res.response.data[0]))
					this.dbStandard = data.dbStandard;
					this.tkStandard = data.tkStandard;
					this.zcStandard = data.zcStandard;
				})
			},
			// 变更后数据
			getChangeAfterData(data){
				// console.log( '变更记录=>',data.sId,this.sid);
				return request({
					headers: {
						'Accept': 'application/json',
						// 'Content-Type':'application/json;charset=UTF-8',
					},
					url: '/social/assistance/getChangeAfterData',
					method: 'post',
					data: data
				})
			},

			// 获取数据
			getData(sid) {
				return request({
					headers: {
						'Accept': 'application/json',
					},
					url: '/social/assistance/getBasicsChange',
					method: 'post',
					data: sid
				})
			},
			// 自定义预警
			loadWarning(data) {
				return request({
					headers: {
						'Accept': 'application/json',
					},
					url: '/social/assistance/getBasicWaring4',
					method: 'post',
					data: data
				})
			},
			// 家庭成员
			loadFamily(data) {
				return request({
					headers: {
						'Accept': 'application/json',
					},
					url: '/social/assistance/getBasicFamily',
					method: 'post',
					data: data
				})
			},
			
			
			
			
			// 代理人
			loadAgent(data) {
				return request({
					headers: {
						'Accept': 'application/json',
					},
					url: '/social/assistance/getBasicAgent',
					method: 'post',
					data: data
				})
			},
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
			changeSh(val) {
				// var text = $("#ab_ex25").val();
				// if(text==null||text==''||text=='同意'||text=='退回重新核查'||text=='退回'){
				//     $("#ab_ex25").val(val);
				// }
				console.log(val)
				console.log(this.auditValue.ac_ex4)

			},
			save(data) {
				// console.log(data)
				
				if (data.ac_ex4 == "") {
					this.$message.error('请选择审核意见');
				} else {
					this.disabled = true;  //保存按钮禁用
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
									// this.$router.go(-1)
									this.closeView();
								},30000)
					this.saveBasiccs({
						"data": "[" + JSON.stringify(data) + "]",
						"sId": this.sId,
						"type": this.type
					}).then((res) => {
						console.log(res,'then + Err');
						if (res[0].status == "+OK") {
							loading.close()
							this.$message.success(res[0].msg)
							this.closeView();
						} else {
							loading.close()
							this.$message.error(res[0].msg)
						}
					}).catch((res) => {
						// 数据请求成功删除定时器
						clearTimeout(time);

						 if (res.response.data[0].status == "+OK") {
							loading.close()
							this.$message.success(res.response.data[0].msg)
							this.closeView();

						} else {
							loading.close()
							this.$message.error(res.response.data[0].msg)
						}
					})
				}
			},

			save3(data) {
				// console.log(data)
				if (data.ac_ex7 == "") {
					this.$message.error('请选择审批意见');
				}
				// else if(data.ac_ex7 == "驳回"){
				// 	if(data.ab_ex26 == ""){
				// 		this.$message.error('请填写驳回原因！');
				// 		this.isSave=false;
				// 		return false
				// 	}
				// }
				 else {
					this.disabled = true;  //保存按钮禁用

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
									// this.$router.go(-1)
									this.closeView();
								},30000);

					this.saveBasicsh({
						"data": "[" + JSON.stringify(data) + "]",
						"sId": this.sId,
						"type": this.type
					}).then((res) => {
						if (res[0].status == "+OK") {
							loading.close()
							this.$message.success(res[0].msg)
							this.closeView();
						} else {
							loading.close()
							this.$message.error(res[0].msg)
						}
					}).catch((res) => {
						// 数据请求成功删除定时器
						clearTimeout(time);
						console.log(res.response);
						console.log(data);
						console.log(res.response.data);

						var setData={};

						for(let key in res.response.data[0]){
							setData[key]=res.response.data[0][key]
						}

						setData.data = data;
						// return false;
						// var data1 = JSON.parse(res.response.data)
						// console.log(data1);

						if(res.response.data[0].status == "+NEW"){
							loading.close();
							this.$confirm("变更后的数据，符合<b style='color:#638fdd'> "+res.response.data[0].tipMsg + " </b>，是否进行救助类型派发？", "提示", {
								dangerouslyUseHTMLString: true,
								confirmButtonText: "确定",
								cancelButtonText: "取消",
								// type: "warning",
							}).then((res) => {
								console.log(res,'then');
								this.disabled = true;  //保存按钮禁用
								this.saveBasicChangeBj({
									"data": "[" + JSON.stringify(setData) + "]",
								}).then((res)=>{

								}).catch((res)=>{
									console.log('saveBasicChangeBj');
									loading.close()
									
									// if(){

									// }
									// this.$message.success(res.response.data.msg)//---+?
									this.$message.success(res.response.data[0].msg)//---+OK
									this.closeView();
								})
							}).catch((res) =>{
								console.log(res,'catch');

							})

						}else if (res.response.data[0].status == "+OK") {
							loading.close()
							this.$message.success(res.response.data[0].msg)
							this.closeView();
						} else {
							loading.close();
							this.closeView();
							this.$message.error(res.response.data[0].msg)
						}
					})
				}
			},
			//初审 /.退回
			saveBasiccs(data) {
				let url = "/social/assistance/saveBasicChangeAud"

				return request({
					headers: {
						'Accept': 'application/json',
					},
					url: url,
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
					url: '/social/assistance/saveBasicChangeAud',
					method: 'post',
					data: data
				})
			},

			//办结
			saveBasicChangeBj(data) {
				return request({
					headers: {
						'Accept': 'application/json',
					},
					url: '/social/assistance/saveBasicChangeBj',
					method: 'post',
					data: data
				})
			},


			isShow(n) {
				this.isShow1 = true
				this.isShow2 = true
				this.isShow3 = true
				this.isShow8 = true
				this.isShow9 = true
				this.isShow11 = true
				this.isShow12 = true
				this.isShow13 = true
				this.isShow18 = true
				this.isShow20 = true
				this.isShow21 = true
				this.isShow24 = true
				

				if (n == 1) {
					this.isShow1 = false
				} else if (n == 2) {
					this.isShow2 = false
				} else if (n == 3) {
					this.isShow3 = false
				}  else if (n == 8) {
					this.isShow8 = false
				} else if (n == 9) {
					this.isShow9 = false
				} else if (n == 11) {
					this.isShow11 = false
				} else if (n == 12) {
					this.isShow12 = false
				}else if (n == 13) {
					this.isShow13 = false
				}else if (n == 18) {
					this.isShow18 = false
				}else if (n == 20) {
					this.isShow20 = false
				}else if (n == 21) {
					this.isShow21 = false
				}else if (n == 24) {
					this.isShow24 = false
				}
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
			changeCard(index,row){
				// this.familyData1[index].abm_ex5=this.getSex(this.familyData1[index].abm_ex2);
				this.tableData[index].age=this.getAge(this.tableData[index].abm_ex2);
				if(this.tableData[index].age<16 || this.tableData[index].age>60){
					this.tableData[index].work="否"
				}else{
					this.tableData[index].work="是"
				}
			},

		}
	}
</script>
<style scoped>
	.g-box {
		height: 80VH !important;
	}

	.g-box2 {
		overflow: auto !important;
		display: flex;
		display: -webkit-flex;
		flex-direction: row;
		width: 100%;
		height: 100%;
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
		height: 120px;
		width: 100px;
		float: left;
		margin-left: 5%;
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

	.item {
		font-weight: bold;
		background: #eeee;
		padding: 10px;
		margin-top: 15px;
		margin-bottom: 5px;
	}

	.item_1 {
		font-weight: bold;
		margin-top: 15px;
	}

	.item_1_1 {
		margin-left: 15px;
	}

	.item_text {
		font-weight: bold;
		color: #7f8585;
	}
	/* table表下边框 */
div>>>.el-table__empty-block{
	border-bottom: 1px solid #eee;
	min-height: 40px;
	height: auto !important;
	background-image: none;
}
</style>
<style>
	.myClass1 .el-message-box__title> span{
		font-size: 16px !important;
	}
</style>
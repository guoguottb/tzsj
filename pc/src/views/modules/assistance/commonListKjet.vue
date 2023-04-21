<template>
	<div class="g-box">
		<el-dialog :title="titles" @close="close" :visible.sync="centerDialogVisible2" width="80%"  height="80VH" center>
			<router-view @closes="closes" ref="routers"></router-view>
		</el-dialog>

		<el-dialog :title="titles2" :visible.sync="centerDialogVisible4" id="pdfbox" width="80%" height="85VH" center>
			<iframe :src="src" style="width: 100%; height: 74vh" id="iframe1" padding="0" frameborder="no" border="0"  marginwidth="0" marginheight="0"></iframe>
		</el-dialog>

		<el-dialog  :title="titles2"  :visible.sync="centerDialogVisible5"  width="80%" height="80VH" center>
			<div style="height: 80vh; overflow: auto">
				<img :src="item" v-for="(item, index) in pdfList" :key="index" />
			</div>
		</el-dialog>

		<div class="search">
			<el-form :inline="true" :model="searchInline" class="demo-form-inline">
				<el-form-item v-for="(item, index) in searchInline.searchArr" :label="item.text" :key="index" label-width="110px">
				
					<!--前俩查询输入框 -->
					<el-input v-if="item.searchType == 'text'" v-model="searchData[item.searchId]"  :placeholder="item.text" style="width: 180px"></el-input>
					<!-- 后俩查询选择框 -->
					<el-select v-else-if=" item.searchType == 'select' ||  (item.searchType == 'link' && item.searchId != 'stone')" v-model="searchData[item.searchId]" :placeholder="item.text" style="width: 180px">
						<el-option v-for="(itemOp, index22) in item.vals.split('#')" :value="itemOp" :key="index22"></el-option>
						
					</el-select>

					<!-- 区划选择框 -->
					<el-cascader  v-else-if="item.searchType == 'select' || (item.searchType == 'link' && item.searchId == 'stone')" 
						:props="props" v-model="xzqhArray" :placeholder="item.text"  style="width: 180px">
					</el-cascader>
					
					<!-- 日期选择器 -->
					<el-date-picker v-else-if="item.searchType == 'date' || item.searchType == 'date2'" v-model="searchData[item.searchId]"
						:placeholder="item.text" style="width: 180px" type="date"  value-format="yyyy-MM-dd" >
					</el-date-picker>

					<el-date-picker v-else-if="item.searchType == 'date5' || item.searchType == 'date4'"
						v-model="searchData[item.searchId]" :placeholder="item.text" style="width: 180px" type="month"  value-format="yyyy-MM" >
					</el-date-picker>

				</el-form-item>

				<el-form-item class="btn_group">
					<el-button type="primary"  @click="queryListByCriteria" @keyup.enter.native="queryListByCriteria" icon="el-icon-search" > 查询</el-button>
					<el-button type="info" @click="resetQuery" icon="el-icon-refresh" > 重置</el-button >
					
					<!-- 新增按钮 -->
					<template v-if="buttonJson.length > 0 && addYljgBtn == true">
						<el-button  type='primary'  v-for="(item,index) in buttonJson" :key="index"  icon='el-icon-s-promotion' @click='grant(item)'>{{item.buttonName}}</el-button>
					</template>

				</el-form-item>
			</el-form>
		</div>

		<div class="content">
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane  v-for="(item, index) in tabData" :name="item.listname" :key="index" >
					<span slot="label" >{{ item.val }}
						<!-- 列表数据数量显示 -->
						<span class="tabNum" v-if="tabsNum2[item.val] && tabsNum2[item.val] <= 99">{{ tabsNum2[item.val] }}</span>
						<span class="tabNum" v-else-if="tabsNum2[item.val] && tabsNum2[item.val] > 99" >99+</span>
					</span>
				</el-tab-pane>
			</el-tabs>

			<el-table :data="tableData" :row-class-name="tableRowClassName" height="100%" border style="width: 100%" @selection-change="selectionChange" v-loading="loading" :element-loading-text="loading_text">
				
				<!-- 表格背景 -->
				<el-table-column type="selection" width="42"></el-table-column>
				
				<!--表格-->
				<el-table-column v-if="itemT.field != 'btn'" v-for="(itemT, index4) in tableList" :key="index4" :prop="itemT.field" :label="itemT.names" :width="itemT.width" ></el-table-column>
				<el-table-column v-else label="操作" :width="itemT.width">
					<template slot-scope="scope">
						<el-button-group style=" width=100% ">
						<el-button :type="itemF.btnType" v-for="(itemF, index3) in scope.row[itemT.field]" :key="index3" :disabled="itemF.isDisabled=='Y'" @click="btnEvent(itemF)">
						{{ itemF.name }}</el-button>
						</el-button-group>
					</template>
				</el-table-column>
			</el-table>
		
			<!-- 核对反馈列表 -->
			<el-popover v-show="visible"  placement="top" width="160" class="fkbox" v-model="visible" >
				<h3 style="display:inline-block;margin-bottom:10px;font-weight: 600;">核对反馈表</h3>
				<i class="el-icon-close" style="float:right;" @click="fkListClose('hdfk')"></i>
				<div style="text-align: center; margin: 0;overflow-y: auto;height:200px">
				<el-table :data="fkListTable"  @row-click="getPDF"  stripe border style="width: 100%" >
					<el-table-column prop="file_name" label="名称" width="180">
					</el-table-column>
					<el-table-column prop="upload_time" label="时间" width="180">
					</el-table-column>
				</el-table>
				</div>
			</el-popover>

			<el-popover v-show="visible5"  placement="top" width="160" class="fkbox" v-model="visible5" >
				<h3 style="display:inline-block;margin-bottom:10px;font-weight: 600;">授权书列表</h3>
				<i class="el-icon-close" style="float:right;" @click="fkListClose('sqs')"></i>
				<div style="text-align: center; margin: 0;overflow-y: auto;height:200px">

				<el-table :data="SQSListTable"  @row-click="getIMG"  stripe border style="width: 100%" >
					<el-table-column prop="file_name" label="姓名" width="180">
					</el-table-column>
					<el-table-column prop="upload_time" label="救助类型" width="180">
					</el-table-column>
				</el-table>
				</div>
			</el-popover>

			<!--  -->
			<el-dialog title="核对系统核授权书" :visible.sync="dialogVisible5"  width="60%" z-index=1999>
				<div style="margin:0 auto;width:100%;height:522px;overflow:auto;">
					<el-image style="dispaly:black;width:99%; text-align:center" v-if="this.dialogVisible5" :z-index="2015" :src="this.imgURl" :preview-src-list="[this.imgURl]">
					</el-image>
				</div>

			</el-dialog>
		
	
			<div class="footer" style="position: relative;" >
				<!-- 数量 -->
				<div style="display:inline-block;padding-bottom:0px" v-if="isShowNum">
				<el-form :inline="true" class="com_num" style="position: absolute;top: 11px;left: 0;">
					<el-form-item label="户数" ><span style="color:green;margin-bottom: 0px ;font-size:12px">{{hNum}}</span></el-form-item>
					<el-form-item label="在保人数"><span style="color:green;font-size:12px">{{zbnum}} </span></el-form-item>
					<el-form-item label="共同人数"><span style="color:green;font-size:12px">{{ynum}} </span></el-form-item>
					<el-form-item label="非共同人数"><span style="color:green;font-size:12px">{{nnum}} </span></el-form-item>
					<el-form-item label="非共同成员人数"><span style="color:green;font-size:12px">{{bnum}} </span></el-form-item>
					<el-form-item label="近亲属人数"><span style="color:green;font-size:12px">{{cnum}} </span></el-form-item>
				</el-form>
				</div>

				<!-- 分页 -->
				<div style="position: absolute;top: 10px;right: 0;">
					<el-pagination style="display:inline-block;background: #fff;" background layout="total,sizes,prev,pager, next,jumper"
					:page-size="30" :current-page="page" @size-change="handleSizeChange" @current-change="handleCurrentPageChange" :total="count">
					
					</el-pagination>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
import pdf from "vue-pdf";
import request from "@/utils/request";   //后端接口调用封装
import {isSpecialAccount} from '@/utils/until' //特殊账号校验
import { Loading } from "element-ui";
import xlsx from "xlsx";
export default {
	name: "commonList",
	// 子组件
	components: {
		pdf,
	},
	// 父组件传值
	props: ["sKey", "type", "tableName","search"],
	data() {
		return {
			visible: false, //核对反馈列表显示
			visible5: false, //纸质授权书列表显示
			fkListTable: [], //核对反馈列表
			SQSListTable:[],
			sid:"",
			page: 1,
			count: 1,
			limit: 30,
			listname:"",
			numPages: 0,
			currentPage: 0,
			imgURl:'', //授权书图片
			loading: true, //表格加载过渡
			centerDialogVisible: false,  //废除变量
			centerDialogVisible2: false, //页面跳转对话框
			centerDialogVisible3: false, //废除变量
			centerDialogVisible4: false, //pdf对话框
			centerDialogVisible5: false,  //核对报告pdf对话框
			dialogVisible5: false,  //核对授权书loading对话框
			form: {       //核对类别弹框的表单
				ab_ex192:'', //核对类别
				sid:'',      //sid-查找对应的户主
				item:{}     //存入'提交信息核对按钮'的属性
			},
			mustData:{},    //传给核对报告预警子组件的值
			formLabelWidth: '100px',
			pdfurl2: [],
			pdfList: [],
			src: "",
			isLoad: true,
			titles: "",   //模块标题
			titles2: "",  //核对报告pdf标题
			titles3: "",  //废除变量
			activeName: "", //业务节点名
			// 选中数据
			selectionList: [],
			disabled: false,
			loading: false,
			isShowNum:false,
			tabName:'', //节点名
			pNum: '0', //节点人数
			hNum: '0', //节点户数
			zbnum: '0', //在保人数
			ynum: '0', //总共同人数
			nnum: '0', //总非共同人数
			bnum: '0', //总非共同家庭人数 / 已上传授权书数
			cnum: '0', //总近亲属人数 /  已提交核对数
			anum: '0', //核对报告存疑数
			dnum: '0', //已完成数
			num: '0',  //预警总数
			searchInline: {"searchArr":[]}, //搜索内容列表
			searchData: {},     //搜索项和搜索内容
			tabData: [],        //业务节点名
			tableList: [],      //列表显示字段
			tableData: [],      //表格数据
			buttonJson: [],     //后端新增的按钮数组
			addYljgBtn:false,   //导出、新增按钮显示
			xzqhArray: [],      //行政区划搜索
			tabsNum2: {},       //业务节点数据数量
			searchDataNum: {},  //公司名、父组件某些属性
			listHdBtn:{},       //操作按钮 属性（颜色、禁用状态、名称等）
			tabsnum: [],        //废除变量
			tabsnumArr: [],     //废除变量
			loading_text:'拼命加载中,请稍后',

			
			// el-cascader懒加载
			props: {
				checkStrictly:true,
				lazy: true,
				lazyLoad(node, resolve) {
					const { level } = node; // 获取当前node对象中的level属性
					let pId = "0";
					if (level > 0) {
						let value = node.value;
						if (value) {
							let values = value.split("#");
							pId = values.length > 1 ? values[1] : "0";
						}
					}
					request({
						url: "/social/assistance/getCityOption",
						method: "post",
						data: {
							pId: pId,
						},
					}).then((res) => {})  
					.catch((res) => {
						// console.log(res,"city");
						const nodes = res.response.data;
						nodes.forEach((item) => {
							item.value = item.cs_ex2 + "#" + item.cs_ex1;
							item.label = item.cs_ex2;
							item.leaf = level >= 2; //判断是否为末尾节点，这个地方是0,1,2三级
						});
						resolve(nodes);
					});
				},
			},

			wur_title:'',//业务名称
			specialAccount:false,//是否为特殊账号

			// dialogVisible10:false,//确认时间弹框
			// confirmationDate:new Date(),//确认时间选择
		};
	},

	watch: {
		// 区划选择监听
		xzqhArray(newA, oldA) {
			console.log(newA);

			let i = null;
			if(newA.length > 0){
				i = newA.length ==1 ? newA[0].split("#")[0] : i;
				i = newA.length ==2 ? newA[0].split("#")[0] + "#" + newA[1].split("#")[0] : i;
				i = newA.length ==3 ? newA[0].split("#")[0] + "#" + newA[1].split("#")[0]+ "#" + newA[2].split("#")[0] : i;
			}
			this.searchData.stone = i;
		},

		$route: "fetchData",

		activeName(newA1, oldA1) {
			console.log(newA1, oldA1,'业务节点监听');
		},
		
	},

  methods: {
    
    // 给表格行 添加类名 进行样式调整 （从0开始）
    // 双数添加 warning-row 类名（白色），单数添加 success-row 类名（灰色）
    tableRowClassName({ rowIndex }) {
		if (rowIndex % 2 === 0) {
			return "warning-row";
		} else if (rowIndex % 2 === 1) {
			return "success-row";
		}
		return "";
    },

    // 路由改变
    fetchData() {
		console.log("路由发送变化doing...");

		this.$refs.routers.loadData();
		this.isLoad = true;
		// this.$refs.routers2.loadData();
    },

    // 列表多选事件--目前没啥用但是和标签绑定 
    selectionChange(val) {
		this.selectionList = val;
		console.log('多选事件',val);
    },
    
    resetQuery() {// 重置

		for (let key in this.searchData) {
			this.searchData[key] = "";
		}

		this.xzqhArray = [];
    },

    // 业务节点按钮
    handleClick(tab, event) {
		console.log("tab.name===============" + tab.name);
		this.listname = tab.name;
		this.page = 1;
		this.getData();
		this.loadData();
    },

    // 修改每页列表长度
    handleSizeChange(val) {
		this.limit = val;
		this.loadData();
    },

    // 翻页
    handleCurrentPageChange(val) {
		this.page = val;
		this.loadData();
    },

    // 第一次一次加载的时候获取节点名
    getListName(isFrist){
		// if(isFrist){
		// 	console.log('第一次一次加载的时候获取节点名');
		// }else{
		// 	console.log('非第一次一次加载的时候获取节点名');
		// }
		
		// 节点名
        let listname = this.listname;

        // console.log('-------------------------------');
        console.log(this.listname,'this.listname');
        // console.log('-------------------------------');

        try{
			if(isFrist && sessionStorage.getItem("activeName")){
				
				var activeNameArr1 = sessionStorage.getItem(this.sKey+"activeName").split("/");
				var activeNameArr2 = sessionStorage.getItem("activeName").split("/");
					
				if (activeNameArr2.length > 2) {
					if (activeNameArr1[1] == activeNameArr2[1]) {
					
						listname = sessionStorage.getItem("activeName");
						this.page = 1;
					}
				} else if (activeNameArr2.length == 2) { 
					if (activeNameArr1[0] == activeNameArr2[0]) {
						listname = sessionStorage.getItem("activeName");
						this.page = 1;
					}
				}
			} 

			console.log(this.activeName,'getListName 获取activeName');

        }catch(e){}

       return listname;
    },

    async loadData(isFrist) {
      
		for(var key in this.search){
			this.searchData[key] = this.search[key];
		}

		this.getNum();   // 获取表格数据数量
		this.loading = true;
		let listname ='';
        listname = this.getListName(isFrist);

		this.getSearchData({
			sKey: "" + this.sKey,
			listname: listname,
			params: JSON.stringify(this.searchData),
			limit: "" + this.limit,
			page: "" + this.page,
		}).then((res) => {
			this.tableData = [];
			this.count = 1;
			if (res.data) {
				this.tableData = res.data;
				this.count = res.count;
			}
			for (let i = 0; i < this.tableData.length; i++) {
				if (this.tableData[i]["btn"]) {
					let btn = this.tableData[i].btn;

					for (let j = 0; j < btn.length; j++) {
						let type = this.tableData[i].btn[j].type;

						if (type == "openWin") {
							this.tableData[i].btn[j].btnType = "primary";
						} else {
							this.tableData[i].btn[j].btnType = "danger";
						}
						
					}
				}
			}

			this.loading = false;
        }).catch((res) => {

			this.tableData = [];
			this.count = 1;
            
			if (res.response.data.data) {
				this.tableData = JSON.parse(JSON.stringify(res.response.data.data)) ;
				this.count = res.response.data.count;
			}
            

			// 数据字段匹配，将资金发放信息管理的 最低生活保障边缘 改为 低保边缘家庭
			if(this.tabName=='资金发放信息'){
				for (let i = 0; i < this.tableData.length; i++) {
					if(this.tableData[i].ar_ex1=='最低生活保障边缘'){
						this.tableData[i].ar_ex1='低保边缘家庭';
					}
				}
			}

			for (let i = 0; i < this.tableData.length; i++) {

				// 针对儿童模块 的儿童主任和督导员  的列表页中的 经历内容 的显示
				if(['儿童主任','儿童督导员'].includes(this.tabName)){
					this.tableData[i].abcd_ex26 = this.tableData[i].abcd_ex26.replace(/["\\n"]+/g,'\n')
				}

				if (this.tableData[i]["btn"]) {
					let btn = this.tableData[i].btn;
					for (let j = 0 ; j < btn.length ; j++) {
						let type = this.tableData[i].btn[j].type;
						if (type == "openWin") {
							this.tableData[i].btn[j].btnType = "primary";
						} else {
							this.tableData[i].btn[j].btnType = "danger";
						}
						// 删除退回阶段的 “删除”按钮
						if(this.tabName == '退回' && this.tableData[i].btn[j].name=="删除"){
							this.tableData[i].btn.splice(j,1); 
						}
					
					}
				}
			}

			// 现在是 核对报告预警模块 禁止个人提交核对系统
			if(['低保','特困供养','家庭边缘','支出贫困'].includes(this.tabName) ){
				console.log('核对报告预警-按钮属性修改');
				for(let i in this.tableData){
					for(let j in this.tableData[i].btn){
						if(this.tableData[i].btn[j].name=='提交核对'){
							// console.log('核对报告预警-按钮属性修改',j);
							this.$set(this.tableData[i].btn[j],"isDisabled","Y")
							this.$set(this.tableData[i].btn[j],"btnType","info")
						}
					}
				}
			}

			console.log(this.tableData,"--列表数据");
			console.log(this.tabName,"--模块名称");
			console.log(this.activeName.split('/'),"--activeName");
			console.log(this.activeName.split('/')[1],"--activeName[1]");

			this.loading = false;
        });
    },

    // 键盘Enter事件--输入搜索内容后直接回车搜索
    handleKeyDown(e) {
		let key = null;
		if (window.event === undefined) {
			key = e.keyCode;
		}else {
			key = window.event.keyCode;
		}
		
		if (key === 13) {
			console.log('回车事件');
			this.queryListByCriteria();
		}
    },

    // 查询按钮绑定事件
    queryListByCriteria() {
		this.page = 1;

		console.log("查询内容",this.searchData);
		console.log(this.searchData!="{}",this.searchData);
		
		if(this.searchData!="{}"){
			sessionStorage.setItem("searchData",JSON.stringify(this.searchData));
		}

		if (this.searchData.code && (this.searchData.code.length != 18 && this.searchData.code.length != 15)) {
			this.$message.warning("请输入正确的身份证号码");
		} else {
			this.loadData();
		}
    },

    // 进入页面数据加载  ，frist是在create传的参数，初次加载时用的
    getData(frist) {

		this.loading = true;
		let listname = this.getListName(frist);

		console.log(frist,'frist');
		console.log(listname,'listname');

		this.checkSpecialAccount()
		.then((res)=>{
			console.log('456','账号验证');
		})
		.catch((res)=>{
			try {
				console.log(res.response.data[0].specialAccount,'账号验证');
				this.specialAccount = res.response.data[0].specialAccount;
			} catch (error) {
				this.$message.error(error)
			}
		})


		this.getDatas({
			sKey: "" + this.sKey,
			listname: listname,

		}).then((res) => {
			
			if (this.listname == ""){

				if (res[0].searchStr.length > 0) {
					this.searchInline.searchArr = res[0].searchStr;
				}

				if (res[0].tabJson.length > 0 && res[0].tabJson[0].maps.length > 0){
					// 获取tabs的数量
					this.tabData = res[0].tabJson[0].maps;
					this.activeName = res[0].tabJson[0].maps[0].listname;

					console.log('getdata',this.tabData);
					sessionStorage.setItem(this.sKey+"activeName",this.activeName);
				}
			}
          
			this.loadData(frist);
			this.tableList = [];
			if (res[0].list.length > 0) {
				this.tableList = res[0].list;
				// console.log(res[0].list,"-");
			}

			this.wur_title=res[0].wur_title=="供养机构";
			// 供养机构、群众申请新增按钮， 资金发放信息的导出按钮， 核对报告预警模块的 核对报告检测按钮
			if(res[0].wur_title=="供养机构" || res[0].wur_title=="资金发放信息" || res[0].wur_title=="群众申请" || res[0].wur_title=="核对报告预警"){
				this.addYljgBtn=true
			}else{
				this.addYljgBtn=false
			}

			this.buttonJson = res[0].buttonJson;
          
        }).catch((res) => {
          // console.log(res.response.data,"页面加载数据");

			if (typeof res.request === "undefined" ||typeof res.response === "undefined" ||  res.request.status != 200 ) {
				console.log("请求失败了-----------------------6");
				this.$message.error("数据获取失败或请求超时666");
				this.$emit("closes", false);
				// this.goBack();
				return false;
			}

			if (this.listname == "") {
				if (res.response.data[0].searchStr.length > 0) {
					this.searchInline.searchArr = res.response.data[0].searchStr;
					// console.log(this.searchInline.searchArr,'this.searchInline.searchArr');
				}

				if (res.response.data[0].tabJson.length > 0 && res.response.data[0].tabJson[0].maps.length > 0) {
				
					// 获取tabs的数量
					this.tabData = res.response.data[0].tabJson[0].maps;
					// console.log(this.tabData, "this.tabData");

					if(this.tabData.length > 2){ //防止标签卡的数量太少
						if (this.tabData[2].name == "委托确认") {
							this.tabData[2].val = "核查派单";
						}
						if (this.tabData[2].name == "提交信息核对") {
							console.log("请先落实核查信息");
							this.$message.warning("请先落实核查信息");
							return false;
						}
					}

					
					// 将节点名存入缓存中
					this.activeName = res.response.data[0].tabJson[0].maps[0].listname;
					console.log(res.response.data[0].tabJson[0].maps[0].listname);
				
			
				}else{
				//  this.activeName = res.response.data[0].tabJson[0].maps[0].listname;
				}
			}
          
			console.log('key+activeName--------------:'+sessionStorage.getItem(this.sKey+"activeName"))
			console.log('this.activeName--------------:'+this.activeName)

			sessionStorage.setItem(this.sKey+"activeName",this.activeName);

			// 搜索数据本地缓存
			console.log(res.response.data[0],'detData---');
			console.log(sessionStorage.getItem('searchData'),'searchData');
			console.log(this.searchInline.searchArr,'searchArr');

			console.log(this.searchData,'searchData');
          

			// 获取节点名称
			let len = res.response.data[0].wur_listname.split('/').length
			this.tabName = res.response.data[0].wur_listname.split('/')[len - 1]
			this.wur_title = res.response.data[0].wur_title;
			console.log( this.wur_title,' this.wur_title');
			// console.log(' tabName 获取节点名称=>',this.tabName);

			// 这里的的低保是指-核对报告预警低保     isShowNum--数字显示
			let tabNameArr = ['申请','退回','初审','公示开始','委托确认','核对中','审批','办结','低保'] 
			this.isShowNum = tabNameArr.some((item,index,arr)=> {
				return item == this.tabName;
			})   

			if (sessionStorage.getItem("activeName") != null && this.activeName != 0) {
				
				var activeNameArr1 = this.activeName.split("/");
				var activeNameArr2 = sessionStorage.getItem("activeName").split("/");
				
				console.log(this.activeName ,"本地缓存");
				console.log(activeNameArr1, "activeNameArr1");
				console.log(activeNameArr2, "activeNameArr2");
				

				// 业务节点位置名
				if (activeNameArr2.length > 2) {
					if (activeNameArr1[1] == activeNameArr2[1]) {
						this.activeName = sessionStorage.getItem("activeName");
						this.listname = this.activeName;
						this.page = 1;

						// 搜索数据缓存
						var huancunData = JSON.parse(sessionStorage.getItem('searchData'))
						if(huancunData){

						this.searchData = huancunData;
						}

						sessionStorage.removeItem("activeName");
						// sessionStorage.removeItem("searchData");
					}else{
						sessionStorage.removeItem("searchData");
					}

				}else if (activeNameArr2.length == 2) {

					if (activeNameArr1[0] == activeNameArr2[0]) {
						this.activeName = sessionStorage.getItem("activeName");
						this.listname = sessionStorage.getItem("activeName");
						this.page = 1;
						
						// 搜索数据缓存
						var huancunData = JSON.parse(sessionStorage.getItem('searchData'))
						if(huancunData){
							this.searchData = huancunData;
						}

						console.log(huancunData,'本地缓存数据');
						sessionStorage.removeItem("activeName");
						// sessionStorage.removeItem("searchData");
					}else{
						sessionStorage.removeItem("searchData");
					}
				}
			}

			this.loadData(frist);
			this.tableList = [];

			if (res.response.data[0].list.length > 0) {
				this.tableList = res.response.data[0].list;
				console.log("this.tableList=>",res.response.data[0].list);
			}

			// “新增” 按钮显示，'特困人员供养','资金发放信息','支出性贫困家庭','城乡低保','家庭边缘','低保边缘家庭'-的导出按钮，核对报告预警的核对报告检测按钮-，'核对报告预警'--核对报告检测按钮
			var arr = ['特困人员供养','资金发放信息','群众申请','供养机构','支出性贫困家庭','城乡低保','家庭边缘','困境儿童申请','低保边缘家庭','核对报告预警']
			if(arr.includes(res.response.data[0].wur_title)){
				this.addYljgBtn = true;
			}else{
				this.addYljgBtn = false;
			}

			this.buttonJson = res.response.data[0].buttonJson;

			console.log(this.buttonJson, "----buttonJson");
			// console.log(res.response.data[0].wur_title, "----res.response.data[0].wur_title");
        });
    },

    // 获取表格数据数量
    getNum() {
		this.searchDataNum = { ...this.searchData };
		// console.log(this.searchDataNum);
		for (let key in this.searchDataNum) {
			// this.searchDataNum[key] = escape(this.searchDataNum[key]);  
			this.searchDataNum[key] = this.searchDataNum[key];  
		}

		this.searchDataNum.type = this.type;
		this.searchDataNum.company = "泰州市姜堰区社会救助综合平台";
		this.searchDataNum.tableName = this.tableName;

		if (this.type) {
			request({
				headers: {
					Accept: "application/json",
				},
				url: "/social/assistance/getBasicNum",
				method: "post",
				data: this.searchDataNum,
			}).then((res) => {
				let json = res;
				for (let i = 0; i < json.length; i++) {
					let ab_ex15 = unescape(json[i].ab_ex15);
					let num = json[i].num;
					this.tabsNum2[ab_ex15] = num;
				}
			})
			.catch((res) => {
				this.tabsNum2 = {};
				let json = res.response.data;
				for (let i = 0; i < json.length; i++) {
					if (json[i].ab_ex15) {
						//申请
						let ab_ex15 = unescape(json[i].ab_ex15);
						let ab_ex15_m = unescape(json[i].ab_ex15)+'m';
						json[i].ab_ex15 = unescape(json[i].ab_ex15);

						if (ab_ex15 == "审核") {
							ab_ex15 = "审核2";
						} else if (ab_ex15 == "初审") {
							ab_ex15 = "审核";
						} else if (ab_ex15 == "公示") {
							ab_ex15 = "公示2";
						} else if (ab_ex15 == "公示开始") {
							ab_ex15 = "公示";
						} else if (ab_ex15 == "核对中") {
							ab_ex15 = "信息核对";
						} else if (ab_ex15 == "委托确认") {
							ab_ex15 = "核查派单";
						}

						//各个节点的数字 各节点数量
						let num = json[i].num;

						this.tabsNum2[ab_ex15] = num;
						// this.tabsNum2[ab_ex15_m] = memnum;
						
					} else if (json[i].ac_ex3) {
						//变更
						let ac_ex3 = unescape(json[i].ac_ex3);
						let ac_ex3_m = unescape(json[i].ac_ex3)+'m';
						json[i].ac_ex3 = unescape(json[i]. ac_ex3);

						if (ac_ex3 == "初审") {
							ac_ex3 = "审核";
						} else if (ac_ex3 == "公示开始") {
							ac_ex3 = "公示";
						} else if (ac_ex3 == "核对中") {
							ac_ex3 = "信息核对";
						}

						let num = json[i].num;
						this.tabsNum2[ac_ex3] = num;
						console.log(ac_ex3, num,'各节点数量'); //各个节点的数字

					} else if (json[i].ac_ex7) {
						//注销
						let ac_ex7 = unescape(json[i].ac_ex7);
						json[i].ac_ex7 = unescape(json[i]. ac_ex7);
						if (ac_ex7 == "初审") {
							ac_ex7 = "审核";
						} else if (ac_ex7 == "公示开始") {
							ac_ex7 = "公示";
						} else if (ac_ex7 == "核对中") {
							ac_ex7 = "信息核对";
						}

						let num = json[i].num;
						this.tabsNum2[ac_ex7] = num;
					}else if (json[i].ab_ex13) {
						//注销
						let ab_ex13 = unescape(json[i].ab_ex13);
						json[i].ab_ex13 = unescape(json[i]. ab_ex13);
						
					}
				}
	
				// 节点名称匹配
				this.tabName = this.tabName=='审核' ? '初审' : this.tabName;
				this.tabName = this.tabName=='城乡低保申请' ? '申请' : this.tabName;
				this.tabName = this.tabName=='城乡低保退回' ? '退回' : this.tabName;
				this.tabName = this.tabName=='城乡低保初审' ? '初审' : this.tabName;
				this.tabName = this.tabName=='城乡低保公示开始' ? '公示开始' : this.tabName;
				this.tabName = this.tabName=='城乡低保审批' ? '审批' : this.tabName;
				this.tabName = this.tabName=='城乡低保办结' ? '办结' : this.tabName;

				this.tabName = this.tabName=='困境儿童申请' ? '申请' : this.tabName;

				this.tabName = this.tabName=='家庭边缘退回' ? '退回' : this.tabName;
				this.tabName = this.tabName=='家庭边缘初审' ? '初审' : this.tabName;
				this.tabName = this.tabName=='家庭边缘公示开始' ? '公示开始' : this.tabName;
				this.tabName = this.tabName=='家庭边缘审批' ? '审批' : this.tabName;
				this.tabName = this.tabName=='家庭边缘办结' ? '办结' : this.tabName;
				this.tabName = this.tabName=='家庭边缘申请' ? '申请' : this.tabName;
			
				this.tabName = this.tabName=='临时救助退回' ? '退回' : this.tabName;
				this.tabName = this.tabName=='临时救助初审' ? '初审' : this.tabName;
				this.tabName = this.tabName=='临时救助公示开始' ? '公示开始' : this.tabName;
				this.tabName = this.tabName=='临时救助审批' ? '审批' : this.tabName;
				this.tabName = this.tabName=='临时救助办结' ? '办结' : this.tabName;
				this.tabName = this.tabName=='临时救助申请' ? '申请' : this.tabName;
				this.tabName = this.tabName=='核对报告预警低保' ? '低保' : this.tabName;
				this.tabName = this.tabName=='核对报告预警特困' ? '特困供养' : this.tabName;
				this.tabName = this.tabName=='核对报告预警低保边缘' ? '家庭边缘' : this.tabName;
				this.tabName = this.tabName=='核对报告预警支出贫困' ? '支出贫困' : this.tabName;
				this.tabName = this.tabName=='低保边缘家庭' ? '办结' : this.tabName;

				// json 包含 所有节点的各个对象的数量
				// 获取节点人数、户数
				if(json.length>0){
					for(let i in json){
						if(json[i].ab_ex15 == this.tabName){
							this.hNum = json[i].num;
							this.zbnum = json[i].zbnum;
							this.ynum = json[i].ynum;
							this.nnum = json[i].nnum;
							this.bnum = json[i].bnum;
							this.cnum = json[i].cnum;
							// this.pNum = json[i].memnum;
							break;
						}else if(json[i].ac_ex3 == this.tabName){

							this.hNum = json[i].num ;
							this.zbnum = json[i].zbnum;
							this.ynum = json[i].ynum;
							this.nnum = json[i].nnum;
							this.bnum = json[i].bnum;
							this.cnum = json[i].cnum;
							// this.pNum = json[i].memnum;
							break;
						}else if(json[i].ac_ex7 == this.tabName){
							this.hNum = json[i].num;
							this.zbnum = json[i].zbnum;
							this.ynum = json[i].ynum;
							this.nnum = json[i].nnum;
							this.bnum = json[i].bnum;
							this.cnum = json[i].cnum;
							// this.pNum = json[i].memnum;
							break;
						}else if(json[i].ab_ex13 == this.tabName){
							// 核对预警人数
							this.hNum = json[i].num;
							this.anum = json[i].anum;
							this.bnum = json[i].bnum;
							this.cnum = json[i].cnum;
							this.dnum = json[i].dnum;
							this.num = json[i].num;
							// this.pNum = json[i].memnum;
							break;
						}else{
							this.hNum = 0;
							this.hNum = 0;
							this.zbnum = 0;
							this.ynum = 0;
							this.nnum = 0;
							this.anum = 0;
							this.bnum = 0;
							this.cnum = 0;
							this.dnum = 0;
							this.num = 0;
							// this.pNum = 0;
						}
					}
				}else{
					this.hNum = 0;
					this.hNum = 0;
					this.zbnum = 0;
					this.ynum = 0;
					this.nnum = 0;
					this.anum = 0;
					this.bnum = 0;
					this.cnum = 0;
					this.dnum = 0;
					this.num = 0;
					// this.pNum = 0;
				}
				// 这里的的低保是指-核对报告预警低保
				let tabNameArr = ['申请','退回','初审','公示开始','委托确认','核对中','审批','办结','低保','特困供养','家庭边缘','支出贫困',] 
				this.isShowNum = tabNameArr.some((item,index,arr)=> {
					return item == this.tabName  //narr==ture
				})   
				
				// console.log('isShowNum=>',this.isShowNum);
				// console.log('各节点人数、户数 =>',json);
				// console.log('this.hNum=>',this.hNum);
				console.log('节点名称=>',this.tabName);
			});
		}
		return this.tableName;
    },

    // 列表数据
    getSearchData(data) {
		return request({
			headers: {
				Accept: "application/json",
			},
			url: "/social/weida/getCommonListJson",
			method: "post",
			data: data,
		});
    },

    // 页面识别及 数据筛选样式
    getDatas(data) {
		return request({
			url: "/social/common/commonListJson",
			method: "post",
			data: data,
		});
    },
    
    // 账号识别
    checkSpecialAccount() {
		return request({
			url: "/social/common/checkSpecialAccount",
			method: "post",
			// data: data,
		});
    },


    closes(data) {
		this.centerDialogVisible2 = false;
		this.$emit("closeWin", this.centerDialogVisible2);
		this.loadData();
		console.log("关闭了啊");
		// this.$emit('自定义名称',要发送的数据)
    },

    // 修改了内容 未保存点击关闭，重新打开由于路由没有发生变化，导致会显示上次修改内容，需要重新获取数据
    close() {
		console.log("关闭了");
		//this.$refs.routers.loadData();
    },
   
    // 获取核对系统授权书img照片
    getIMG(item) {

		var st = document.getElementById("pdfbox");
		var st2 = document.getElementById("iframe1");
		st.children[0].style.marginTop = "6vh";
		st.style.padding = "0px";

		// 拼接pdf请求路径
		var pingjie = "";
		pingjie = item.file_path+"/"+item.file_name
		pingjie = "/social/minios/showPDF?filename=" + pingjie;
		
		this.titles2 = "本报告核对系统中信息的反馈，仅作为委托部门审批的参考。";
		this.loading = true;
      
		//  接口
		if(item.file_name){
			request({
				headers: {
					Accept: "application/json",
				},
				url: pingjie,
				method: "post",
				data: {},
			}).then((res) => {
				this.loading = false;
				this.src = "data:image/png;base64," + res;
				this.dialogVisible5 = true;
			}).catch((res) => {
				this.loading = false;
				this.src = "data:image/png;base64," + res.response.data;
				this.imgURl = "data:image/png;base64," + res.response.data;
				this.dialogVisible5 = true;
			});
		}
	},

    // 获取PDF照片
    getPDF(item) {
		var st = document.getElementById("pdfbox");
		var st2 = document.getElementById("iframe1");
		st.children[0].style.marginTop = "6vh";
		st.style.padding = "0px";

		// 拼接pdf请求路径
		var pingjie = "";
		pingjie = item.file_path+"/"+item.file_name
		pingjie = "/social/minios/showPDF?filename=" + pingjie;
     
		this.titles2 = "本报告是核对对象在各相关部门信息系统中信息的反馈，仅作为委托部门审批的参考。";
		// this.loading = true;
      
		//  接口
		if(item.file_name){
			request({
				headers: {
					Accept: "application/json",
				},
				url: pingjie,
				method: "post",
				data: {},
			}).then((res) => {

				this.loading = false;
				this.src = "data:application/pdf;base64," + res;
				this.centerDialogVisible4 = true;

			}).catch((res) => {

				this.loading = false;
				this.src = "data:application/pdf;base64," + res.response.data;
				this.centerDialogVisible4 = true;

			});
		}
    },

    // 关闭核对反馈列表
    fkListClose(key){
		console.log(key);

		if(key=='hdfk'){
			this.visible = false;
		}else if(key=='sqs'){
			this.visible5 = false;
		}

    },

    // 操作 按钮事件
	btnEvent(item) {
        // console.log(item.url,"按钮事件"); //群众申请、其他

        var arr = item.url.split("=");
        console.log('非pdf=>',arr);
        // 获取id
        if(["打印通知书","打印档案","打印档案","审核","公示结束","审批"].includes(item.name)) {
			this.sid = arr[2];
        }else if(item.name=='查看' && this.tabName!='退回' && arr.length>3){
			this.sid = arr[3].split('&')[0];
        }else if(item.name=='确认资金发放'){
			console.log(arr,'sid');
			this.sid = arr[1].split('&')[0];
        }
        else {
			this.sid = arr[1];
        }
        
        console.log('item.name=>',item.name);
        console.log('btnEvent 获取sid=>',this.sid);

        // 点击核查派单检测区划是否完整
        if(item.name == "核查派单"){
			for(let i in this.tableData){
				if(this.tableData[i].ab_id == this.sid && !this.tableData[i].ab_ex162){
					var xzqhArray = this.tableData[i].ab_ex162.split(",");
					
					this.$alert("请先填报行政区划", "提示", {
						confirmButtonText: "确定",
					});
					return false;

				}else if(this.tableData[i].ab_id == this.sid){
					var xzqhArray = this.tableData[i].ab_ex162.split(",");
					console.log(xzqhArray);

					if(xzqhArray.length != 3){
					
						this.$alert("请先填报行政区划", "提示", {
							confirmButtonText: "确定",
						});

						return false;
					}
				} 
			}
        }

		// 点击“查看核对报告”，调用反馈列表
		if (item.name == "查看核对报告") {
			console.log("查看核对报告");
			this.getFamilyHDPDF(this.sid,item,true)

		}else if(item.name == "查看授权书"){
			console.log("查看授权书");
			this.getFamilySQS(this.sid,item,true)
			
		}else if(item.name == "提交信息核对"){
			this.form.sid = this.sid;

			for(let i in this.tableData ){
				if(this.tableData[i].ab_id == this.sid ){

					this.form.ab_ex192 = this.tableData[i].ab_ex192
					this.goUrl(item)
					this.form.item = item
					console.log(this.form.item,'<=核对类型');
				}
			}
			console.log("提交信息核对=>",this.sid);

		}else if(item.name == "退回重新核查"){
			// console.log(item,"data");
			// console.log(arr,"arr");
			this.$confirm('是否退回到核查派单？',"提示" , {
				// distinguishCancelAndClose: true,
				confirmButtonText: '退回核查派单',
				cancelButtonText: '取消'

			}).then(() => {

				// 确认退回上门核查
				console.log("退回核查派单");
				this.bankData(arr[2])

			}).catch(action => {
				
				console.log("留在本页"); // 取消留在本页
			});
		}else if((item.name == "审核" ||item.name == "公示结束" || item.name == "审批") && this.tableName=='申请'){ // 核对报告过滤
        
			// 正式环境进行核对报告验证
			if(process.env.NODE_ENV!="development"){
				console.log('模块功能名称 =》',this.tableName);
				this.getFamilyHDPDF(this.sid,item,false)
				return false

			}else {
				this.goUrl(item)
			}

		}else if(item.name == "上传纸质授权书"){

			for(let i in this.tableData){
				if(this.sid == this.tableData[i].ab_id){
					console.log('获取对象姓名 ',this.tableData[i].ab_ex3);
					this.mustData = this.tableData[i];

					console.log(this.form,'<=核对类型');
				}
			}

		}else{
			console.log('item=>',item);
			this.goUrl(item)
		}

      console.log('操作按钮名=>',item.name);
      console.log('模块功能名称=>',this.tableName);
      console.log('核对报告过滤=>',this.fkListTable);
    },

    // 提交核对时获取反馈信息
    checkData(sId,item){
		request({
			headers: {
				Accept: "application/json",
			},
			url:'/social/assistance/checkData',
			method: "post",
			data: {
				sId:sId,
			},
        }).then((res) => {
			console.log(res, "then");
           
        }).catch((res) => {
          
			console.log(res.response.data[0],"--反馈信息");
			// 返回+ERR--数据不全，进行提示
			if(res.response.data[0].status=="+ERR"){

				this.$confirm(res.response.data[0].msg+'是否退回到核查派单？',"提示" , {
					// distinguishCancelAndClose: true,
					confirmButtonText: '退回核查派单',
					cancelButtonText: '取消'
				}).then(() => {
				
					// 确认 退回上门核查
					console.log("退回核查派单");
					this.bankData(sId)

				}).catch(action => {
					// 取消 留在列表页
					console.log("留在本页");
				});

			}else if(res.response.data[0].status=="+OK"){  
				//数据完整，数据从 信息核对 提交到 审批确定
				this.goUrl(item);
			}
        })
    },

    // 选择核对类别
    saveHDType(){

		var data = {
			sid:this.form.sid,
			ab_ex192:this.form.ab_ex192
		};
      
		if(this.form.ab_ex192 != ''){
			request({
				headers: {
					Accept: "application/json",
				},
				url:'/social/assistance/saveHDType',
				method: "post",
				data: data
			}).then((res) => {
				console.log(res, "then");
				if(res.data[0].status=="+OK"){
					//  this.$message.success(res.response.data[0].msg)
					this.dialogFormVisible=false
					this.getFamilyHDPDF(this.sid,this.form.item,false)
				}else{
					this.$message.warning(res.data[0].msg)
				}
			}).catch((res) => {
				console.log(res.response.data,"核对类别-saveHDType-catch");
				
				if(res.response.data[0].status == "+OK"){
					this.dialogFormVisible = false;
					this.submitData(this.form.item)
				}else{
					this.$message.warning(res.response.data[0].msg);
				}

			})
		}
		else{
			this.$message.warning('请选择核对类型')
		}
    },

    // 审核退回上门核查
    bankData(sId){
		this.loading = true;
		request({
			headers: {
				Accept: "application/json",
			},
			url:'/social/assistance/bankData',
			method: "post",
			data: {
				sId:sId,
			},
        }).then((res) => {
            console.log(res, "then");
        }).catch((res) => {
			this.loading = false;
			console.log(res.response.data,"退回上门核查");
			if(res.response.data[0].status=="+OK"){
				this.$message.success(res.response.data[0].msg)
				this.loadData()
			}else{
				this.$message.warning(res.response.data[0].msg)
			}
        })
    },
    
    // 按钮退回上门核查
    bankDataCs(sId){
		this.loading = true;
		request({
			headers: {
				Accept: "application/json",
			},
			url:'/social/assistance/bankDataCs',
			method: "post",
			data: {
				sId:sId,
			},
        }).then((res) => {
            console.log(res, "then");
        }).catch((res) => {
			this.loading = false;
			console.log(res.response.data,"退回上门核查");
			if(res.response.data[0].status == "+OK"){
				this.$message.success(res.response.data[0].msg)
				this.loadData()
			}else{
				this.$message.warning(res.response.data[0].msg)
			}
        })
    },

	// 退回重新核查 //预警退回接口与审批确定不通用
	backCheckAgain(){
        this.$confirm('该户无核对报告，是否退回重新核查？',"提示" , {
			// distinguishCancelAndClose: true,
			confirmButtonText: '退回核查派单',
			cancelButtonText: '取消'
        }).then(() => {
          
			// 确认退回上门核查
			console.log("退回核查派单");
			this.bankDataCs(this.sid)

        }).catch(action => {

			// 取消留在本页
			console.log("留在本页");
        });
    },

    // 获取核对列表
    getFamilyHDPDF(sId,item,isShow){

		return request({
			headers: {
				Accept: "application/json",
			},
			url:'/social/assistance/getFamilyHDPDF',
			method: "post",
			data: {
				sId:sId,
			},
        }).then((res) => {
            console.log(res, "then-getFamilyHDPDF");
            // console.log();
        }).catch((res) => {

			if(res.response.status == 200){       //返回成功200
				if(res.response.data.length == 0 ){ 
					//判断是否有数据--无
					if(isShow){ // 展示
						this.$alert('暂无核对报告', '提示', {confirmButtonText: '确定',});
					}else{
						console.log('节点数据列表=>',this.tableData);
						for(let i in this.tableData){
							console.log(this.tableData[i].ab_id,this.sid);

							if(this.tableData[i].ab_id == sId && ['审核','公示结束','审批'].includes(item.name)){
								// 退回上门核查操作 
								// this.backCheckAgain();
								this.goUrl(item);
							}
						}
					}
					return false
				}else {            
					//--有数据，如果 isShow = true ,展示反馈列表
					if(isShow){  // 展示
						for(let i in res.response.data){
							for(let j in res.response.data[i]){
								res.response.data[i][j] = unescape(res.response.data[i][j]) 
							}
						}
						this.visible = true;

						if(this.visible == true){
							this.fkListTable = [];
							for(let i in  res.response.data){
					
								this.fkListTable.push(res.response.data[i])
							}
						}else if(this.visible == false){
							this.fkListTable = [];
						}
					}else{
						//--有数据， isShow = false , 跳转页面
						this.goUrl(item);
					}    
					
				}
			}else{   
				// 如果是开发环境，没有核对报告也能提交，否则提示网络异常
				// 注 getFamilyHDPDF掉的是核对系统 的接口，核对系统出问题也会显示 ‘网络异常’
				if(process.env.NODE_ENV!="development"){
					this.$message.error("网络异常");
				}else{
					console.log("getFamilyHDPDF调用失败！");
					this.goUrl(item);
				}
			}
        })
    },

    // 获取核对列表
    getFamilySQS(sId,item,isShow){

		return request({
			headers: {
				Accept: "application/json",
			},
			url:'/social/assistance/getFamilySQSIMG',
			method: "post",
			data: {
				sId:sId,
			},
        }).then((res) => {
            console.log(res, "then-getFamilySQSIMG");
        }).catch((res) => {

			if(res.response.status == 200){       //返回成功200

				if(res.response.data.length==0 ){ 
					//判断是否有数据--无
					// 展示
					if(isShow){
						this.$alert('暂无授权数书', '提示', {
							confirmButtonText: '确定',
						});
					}else{
						console.log('节点数据列表=>',this.tableData);
						for(let i in this.tableData){
							console.log(this.tableData[i].ab_id,this.sid);

							if(this.tableData[i].ab_id == sId){
							console.log(22);
							
							}
						}
					}
					return false
				}else {            
					//--有数据，如果 isShow = true ,展示反馈列表
					// 展示
					if(isShow){
						for(let i in res.response.data){
							for(let j in res.response.data[i]){
								res.response.data[i][j] = unescape(res.response.data[i][j]) 
							}
						}
						this.visible5 = true;
					if(this.visible5 == true){
						this.SQSListTable = [];
						for(let i in  res.response.data){
							this.SQSListTable.push(res.response.data[i]);
						}
					}else if(this.visible == false){
						this.SQSListTable = [];
					}
					}else{
						this.goUrl(item)
					}    //--有数据， isShow = false , 跳转页面
					console.log(this.SQSListTable,'授权书数据');
				}
			}else{   
				// 如果是开发环境，没有核对报告也能提交，否则提示网络异常
				// 注 getFamilyHDPDF掉的是核对系统 的接口，核对系统出问题也会显示 ‘网络异常’
				if(process.env.NODE_ENV!="development"){
					this.$message.error("网络异常");
				}else{
					console.log("getFamilyHDPDF调用失败！");
					//  this.goUrl(item);
				}
			}
        })
    },

    //页面跳转触发 或 pdf请求
    goUrl(item){
        var st = document.getElementById("pdfbox");
        // var st2=document.getElementById("iframe1");

        st.children[0].style.marginTop="6vh";
        st.style.padding="0px"
        st.children[0].children[0].children[0].style.color="black";
        st.children[0].children[0].style.fontWeight="600";

        //获取申请人id，作为上门核查的判断条件
        console.log(item,"goUrl");

        var ab_id  = this.sid 

        if (item.type == "openWin") {  //type=='openWin'页面跳转

            let timestamp = Date.parse(new Date());
            let url = item.url;
            url = url.indexOf("?") == -1 ? url + "?timestamp=" + timestamp : url + "&timestamp=" + timestamp;
              
            console.log(url, "-----url");
            if(process.env.NODE_ENV == "development"){  //生产环境执行
				this.$router.push({
					path: url,
				});
            }else{
				this.$pushRouter({path:generalConfig.defaultUrl + url,})
            }
          
            // this.$pushRouter({path:generalConfig.defaultUrl + url,})
            this.centerDialogVisible2 = true;

            if (item.title) {
				this.titles = item.title;
            } else {
				this.titles = item.name;
            }

        } else if (item.type == "get") {  //type=='get' 获取pdf
			console.log(item.url,"get");

			this.titles2 = item.name;
			this.loading = true;

			request({
				headers: {
				Accept: "application/json",
				},
				url: item.url,
				method: "post",
				data: {},
			}).then((res) => {
				this.loading = false;
				this.src = "data:application/pdf;base64," + res;
				this.centerDialogVisible4 = true;
            }).catch((res) => {
				this.loading = false;
				this.src = "data:application/pdf;base64," + res.response.data;
				this.centerDialogVisible4 = true;
            });

        } else if (item.type == "get2") {

			this.titles2 = item.name;
			this.loading = true;

			// 图片转换
			request({
				headers: {
					Accept: "application/json",
				},
				url: item.url,
				method: "post",
				data: {},
			}).then((res) => {

				this.loading = false;

			}).catch((res) => {
				// alert(sef.tableData[i].ab_ex120)
				this.loading = false;
				let json = res.response.data;
				this.pdfList = [];
				for (let i = 0; i < json.length; i++) {
				this.pdfList.push(
					"data:image/;base64," + unescape(json[i].base64)
				);
				}
				//this.src = 'data:application/pdf;base64,' + res.response.data;
				this.centerDialogVisible5 = true;
				// console.log(this.tableData[0].ab_ex73, "---------电子授权书");
			});
        } else if (item.type == "confirm" || item.type == "comfirms") {
          
			let sef = this;
			console.log(sef.tabData,"--tabData");  

			if(sef.tabData.length != 0){
				// tab 切换 第三个是核查派单
				if (sef.tabData[2].val == "核查派单") {

					for (let i in sef.tableData) {
					
						if (sef.tableData[i].btn[2].name == "提交信息核对" && ['','F','A'].includes(sef.tableData[i].ab_ex120) &&  sef.tableData[i].ab_id == ab_id){
							
							console.log("第" + (i*1 + 1) + "位", "条件不符合");
							this.$message.warning("请先完成上门核查");
							return false;

						}else if(sef.tableData[i].btn[2].name == "提交信息核对" && !['','F','A'].includes(sef.tableData[i].ab_ex120)  && sef.tableData[i].ab_id == ab_id){
						
							// 提交信息核对时， 特殊账号验证，特殊账号不用进行核对类型选择，直接提交，正常账号需要选择一个核对类型
							if(!this.specialAccount){
								// 核对类型选择弹框
								this.dialogFormVisible = true;
							
							}else{

								this.submitData(item);
							}

							console.log(sef.tableData[i].ab_ex120,"ab_ex120");
						}

						if (sef.tableData[i].btn[2].name == "提交审核" && sef.tableData[i].ab_id == ab_id) {
							this.submitData(item);
							console.log('提交审核');
						}

						if(sef.tableData[i].btn[2].name == "核查派单" && sef.tableData[i].ab_id == ab_id){
							this.submitData(item)
							console.log('核查派单');
						}
						// 删除按钮点击提示
						if(sef.tableData[i].btn[1].name == "删除" && sef.tableData[i].ab_id == ab_id){
							this.submitData(item,i);
							console.log('删除');
						}
					}
	
				}else{//审批确定里的提交
					// console.log('2492-sumitData');
					this.submitData(item)
				}
			}else if(item.name.indexOf('导出')!=-1){
				this.grant(item)
				console.log('导出按钮的item',item);

			}else{//执行删除

				console.log('执行删除=>',this.sid);
				console.log(this.tabName,"--模块名称");
        
				if(this.tabName=="资金发放信息"){
					let date = new Date();
					let y = date.getFullYear();
					let M = date.getMonth() + 1;
					let d = date.getDate();
					let ym ="";
					if(M>9){
						ym = y + '' + M;
					}else{
						ym = y +'0'+ M;
					}
				
					let today = d + '' ;
					// let ym =  date.Format('yyyyMM');
					// let today =  date.Format('dd');

					console.log(ym,today,"--当前时间",y,M,d);
					console.log("救助资金发放信息管理的删除按钮");
					// console.log(this.sid,'this.sId');

					for(let i in this.tableData){
						if(this.tableData[i].ar_id == this.sid  ){
							console.log(this.tableData[i].ar_dat3_view,ym);
							// console.log(this.tableData[i].btn[5].name,this.sid );
							console.log(item,);
							// if((this.tableData[i].ar_dat3_view*1 <= 202206 || today>20) && !['单人保家庭','低保边缘家庭','支出型困难家庭'].includes(this.tableData[i].ar_ex1) ){
							if((this.tableData[i].ar_dat3_view < ym || today > 31) && !['单人保家庭','低保边缘家庭','支出型困难家庭'].includes(this.tableData[i].ar_ex1) && item.name=='删除'){

								this.$confirm("超出操作时间，禁止删除", "提示", {
									confirmButtonText: "确定",
									cancelButtonText: "取消",
									type: "warning",
								}).then(() => {}).catch((res) => {})
							}else{
								console.log('233333');
								this.submitData(item)
							}
						}
					}
				}else{
					console.log('5555');
					this.submitData(item)

				}
           
           
          }
          // console.log(item.name,'item.name');
        }
      
    },
    // 提交到下个阶段弹框提示
    submitData(item,i){

      console.log('comfirms 按钮属性=>',item);
      console.log('节点/模块名字',this.tabName);

      var prompt = '';
      if(item.name=='删除'){
        if(['儿童主任','儿童督导员'].includes(this.tabName)){
           prompt ='确定要删除该'+this.tabName+'?'
        }else if(this.tabName=='资金发放信息'){
          //   console.log(this.tableData,"--列表数据");
          prompt ='确定要删除该批次发放名单?';
        }else{
          prompt ='确定要删除该条数据?';
        }
      }else{
        prompt = "确定要" + item.name + "?";
      }

      this.$confirm(prompt, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
             
            this.loading = true; // 打开遮罩层

            // 设置定时器，30秒请求失败刷新页面
            let time = setTimeout(() => {
              this.loadData();
              this.$message.error("网络异常");
            }, 30000);

            // var data={};
            // var charId = sessionStorage.getItem("charId").split('_')[1]
            // if(item.name == '确认资金发放'){
            //   data.cId = charId
            // }

              request({
                url: item.url,
                method: "post",
                data: {},
              }).then((res) => {

                  // 数据请求成功删除定时器
                  clearTimeout(time);

                  this.loading = false;
                  if (res[0].status == "+OK") {

                    // this.$alert(unescape(res[0].msg), '提示', {
                      // confirmButtonText: '确定',
                    // });

                    this.$message({
                      message: unescape(res[0].msg),
                      type: "success",
                    });

                    this.loadData();
                  } else {
                    //  this.$alert(unescape(res[0].msg), '提示', {
                    //   confirmButtonText: '确定',
                    // });
                    sef.$message.error(unescape(res[0].msg));
                  }
                })
                .catch((res) => {

                  // 数据请求成功删除定时器
                  clearTimeout(time);
                  this.loading = false;

                  // this.loadData();
                  // var string =  res.response.data[0].msg.replace('\n','<br>');

                  var string =  res.response.data[0].msg;

                  if (res.response.data[0].status == "+OK") {
                   
                    console.log(res.response.data[0].msg, "------成功提示"); //上门核查中低保类别不能为空

                    // this.$alert(unescape(res.response.data[0].msg), '提示', {
                    this.$alert(unescape(string), '提示', {
                      confirmButtonText: '确定',
                      
                      dangerouslyUseHTMLString:true
                    });

                    // console.log(res.response.data[0],"返回值msg");
                    console.log(string,"返回值msg");
  
                    this.loadData();

                  } else {
                    string =  res.response.data[0].msg.split('\r\n').join('<br/>');
                    console.log(res.response.data[0].msg,'msg');
                    console.log(string,'string');

                    this.$alert(string, "提示", {
                      confirmButtonText: "确定",
                      customClass:'message_box_alert',
                      dangerouslyUseHTMLString:true
                    });
                  }

                });
            })
            .catch(() => {});
    },

    // excel转码
    base64ToBlob(code) {
      let parts = code.split(";base64,");
      let contentType = parts[0].split(":")[1];
      let raw = window.atob(parts[1]);
      let rawLength = raw.length;

      let uInt8Array = new Uint8Array(rawLength);

      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }
      
      return new Blob([uInt8Array], {
        type: contentType,
      });
    },

    // 低保导出按钮测试
    diBaoLoadExcel(){
       console.log( '低保导出测试');
        // let msg = item.wb_msg;
        // let msgs = msg.split("#");
        // let selectField = msgs.length > 2 ? msgs[2] : "*";
        // let groupField = msgs.length > 3 ? msgs[3] : "";
        // let listField = msgs.length > 4 ? msgs[4] : "";
        // let titles = msgs.length > 5 ? msgs[5] : "";

        // console.log(msgs,selectField,groupField,listField,titles);
        //let url='/social/excel/ExcelDownload?printName='+escape(escape(msgs[0]))+"&groupField="+groupField+"&selectField="+escape(escape(selectField))+"&titles="+escape(escape(titles))+"&listField="+escape(escape(listField))+"&sType="+escape(escape(msgs.length>1 ? msgs[1]:""))+"&sCurItem=&pParam="+escape(escape(JSON.stringify(this.searchData)));

        this.loading = true;

        request({
          headers: {
            Accept: "application/json",
          },
          // url: "/social/excel/ExcelDownload",
          url: "/social/excel/ExcelDownload2",
          method: "post",
          data: {

            // printName: escape(escape(msgs[0])),
            // groupField: groupField,
            // selectField: escape(escape(selectField)),
            // titles: escape(escape(titles)),
            // listField: escape(escape(listField)),
            // sType: escape(escape(msgs.length > 1 ? msgs[1] : "")),
            sCurItem: "",
            pParam: escape(escape(JSON.stringify(this.searchData))),
            sKey: "" + this.sKey,
            listname: this.listname,
            limit: "" + this.limit,
            page: "" + this.page,
          },
        }).then((res) => {

            this.loading = false;
            let data = this.base64ToBlob("data:application/vnd.ms-excel;base64," + res );
            let blob = new Blob([data], { type: "application/vnd.ms-excel", });
            let fileName = Date.parse(new Date()) + ".xlsx";
            console.log(blob,"--1659");

            if (window.navigator.msSaveOrOpenBlob) {

              navigator.msSaveBlob(blob, fileName);
            } else {

              var link = document.createElement("a");
              link.href = window.URL.createObjectURL(blob);
              link.download = fileName;
              link.click();
              //释放内存
              window.URL.revokeObjectURL(link.href);
            }
          }).catch((res) => {

            this.loading = false;
            let data = this.base64ToBlob("data:application/vnd.ms-excel;base64," + res.response.data );
            let blob = new Blob([data], {type: "application/vnd.ms-excel", });
            let fileName = Date.parse(new Date()) + ".xlsx";
            console.log(blob);

            if (window.navigator.msSaveOrOpenBlob) {
              // console.log(2)
              navigator.msSaveBlob(blob, fileName);
            } else {
              // console.log(3)
              var link = document.createElement("a");
              link.href = window.URL.createObjectURL(blob);
              link.download = fileName;
              link.click();
              //释放内存
              window.URL.revokeObjectURL(link.href);
            }
          });

    },


    // 救助资金发放**导出按钮，群众申请新增按钮，支出贫困等救助模块导出按钮
    async grant(item) {
      console.log(item,"功能按钮数据");
        console.log(this.tabName,"节点名称");

      if(this.tabName=='资金发放信息'){

        console.log(item,'救助资金发放信息管理');

        if(item.name.indexOf('导出')!=-1){

          item.buttonName='救助资金发放';
          item.wb_msg='';
          item.buttonName='救助资金发放导出';
          var sid = item.url.split("=")[1];


          this.$confirm('确认导出所选数据？','提示')
          .then((res)=>{

            this.loading=true;

            // 数据导出请求
            request({
              headers: {
                Accept: "application/json",
              },
              // url: "/social/excel/exportReliefdistExcel",
              url: "/social/excel/exportReliefdistExcel2",
              method: "post",
              data: {

                sId:sid,
                btnName:item.name,
              },
            }).then((res)=>{
              
              this.loading = false;
              let data = this.base64ToBlob( "data:application/vnd.ms-excel;base64," + res);
              let blob = new Blob([data], { type: "application/vnd.ms-excel", });
              let fileName = Date.parse(new Date()) + ".xlsx";
              // console.log(blob,"--1659");

              if (window.navigator.msSaveOrOpenBlob) {

                navigator.msSaveBlob(blob, fileName);
              } else {

                var link = document.createElement("a");
                link.href = window.URL.createObjectURL(blob);
                link.download = fileName;
                link.click();
                //释放内存
                window.URL.revokeObjectURL(link.href);
              }

            }).catch((res)=>{

              this.loading = false;
              let data = this.base64ToBlob("data:application/vnd.ms-excel;base64," + res.response.data);
              let blob = new Blob([data], {  type: "application/vnd.ms-excel",});
              let fileName = Date.parse(new Date()) + ".xlsx";
              console.log(blob);

              if (window.navigator.msSaveOrOpenBlob) {

                navigator.msSaveBlob(blob, fileName);
              } else {

                var link = document.createElement("a");
                link.href = window.URL.createObjectURL(blob);
                link.download = fileName;
                link.click();
                //释放内存
                window.URL.revokeObjectURL(link.href);
              }
            })


          })
          .catch((res)=>{
            console.log('取消导出');
          })
          // console.log(sid);

      
        }

      } else if (item.buttonName.indexOf("导出") != -1 && this.tabName!='资金发放信息') {

        console.log(item ,'低保、特困、支出导出');
        let msg = item.wb_msg;
        let msgs = msg.split("#");
        let selectField = msgs.length > 2 ? msgs[2] : "*";
        let groupField = msgs.length > 3 ? msgs[3] : "";
        let listField = msgs.length > 4 ? msgs[4] : "";
        let titles = msgs.length > 5 ? msgs[5] : "";

        console.log(msgs,selectField,groupField,listField,titles);
        //let url='/social/excel/ExcelDownload?printName='+escape(escape(msgs[0]))+"&groupField="+groupField+"&selectField="+escape(escape(selectField))+"&titles="+escape(escape(titles))+"&listField="+escape(escape(listField))+"&sType="+escape(escape(msgs.length>1 ? msgs[1]:""))+"&sCurItem=&pParam="+escape(escape(JSON.stringify(this.searchData)));

        this.loading = true;
        // this.loading_text='拼命导出中，请稍后',

        request({
          headers: {
            Accept: "application/json",
          },
          url: "/social/excel/ExcelDownload2",
          // url: "/social/excel/ExcelDownload",
          method: "post",
          data: {

            printName: escape(escape(msgs[0])),
            groupField: groupField,
            selectField: escape(escape(selectField)),
            titles: escape(escape(titles)),
            listField: escape(escape(listField)),
            sType: escape(escape(msgs.length > 1 ? msgs[1] : "")),
            sCurItem: "",
            pParam: escape(escape(JSON.stringify(this.searchData))),
            sKey: "" + this.sKey,
            listname: this.listname,
            limit: "" + this.limit,
            page: "" + this.page,
          },
        }).then((res) => {

            this.loading = false;
            let data = this.base64ToBlob("data:application/vnd.ms-excel;base64," + res );
            let blob = new Blob([data], { type: "application/vnd.ms-excel", });
            let fileName = Date.parse(new Date()) + ".xlsx";
            console.log(blob,"--1659");

            if (window.navigator.msSaveOrOpenBlob) {

              navigator.msSaveBlob(blob, fileName);
            } else {

              var link = document.createElement("a");
              link.href = window.URL.createObjectURL(blob);
              link.download = fileName;
              link.click();
              //释放内存
              window.URL.revokeObjectURL(link.href);
            }
          }).catch((res) => {

            this.loading = false;
            let data = this.base64ToBlob("data:application/vnd.ms-excel;base64," + res.response.data );
            let blob = new Blob([data], {type: "application/vnd.ms-excel", });
            let fileName = Date.parse(new Date()) + ".xlsx";
            console.log(blob);

            if (window.navigator.msSaveOrOpenBlob) {
              // console.log(2)
              navigator.msSaveBlob(blob, fileName);
            } else {
              // console.log(3)
              var link = document.createElement("a");
              link.href = window.URL.createObjectURL(blob);
              link.download = fileName;
              link.click();
              //释放内存
              window.URL.revokeObjectURL(link.href);
            }
          });
      } else if (item.buttonName.indexOf("支出贫困导出") != -1 || item.buttonName.indexOf("低保按户保导出") != -1) {
        // 这部分条件压根没用 , 是无效的起作用的是上一个条件
        console.log('支出贫困导出');
        console.log(item.url, "item.buttonName");

        if(process.env.NODE_ENV=="development"){

            this.$router.push({path: item.url, });
        }else{

           this.$pushRouter({path:generalConfig.defaultUrl + item.url,})
        }
       
        // this.$pushRouter({path:generalConfig.defaultUrl + item.url,})
        if (item.title) {
          this.titles = item.title;
        } else {
          this.titles = item.name;
        }

        this.centerDialogVisible2 = true;
      } else if(item.buttonName.indexOf("核对报告检测") != -1){
        
          console.log('核对报告检测');
          await this.$alert("核对报告按当前日期比对近三个自然月数据，是否继续比对已认定数据中三个自然月内无核对报告数据？",'提示');

          console.log(item.url,'核对报告检测-item.url');
          console.log(sid,'核对报告检测-sid');
          var sid = item.url.split("=")[1];

        let msg = item.wb_msg;
        let msgs = msg.split("#");
        let selectField = msgs.length > 2 ? msgs[2] : "*";
        let groupField = msgs.length > 3 ? msgs[3] : "";
        let listField = msgs.length > 4 ? msgs[4] : "";
        let titles = msgs.length > 5 ? msgs[5] : "";

        console.log(msgs,selectField,groupField,listField,titles);
        //let url='/social/excel/ExcelDownload?printName='+escape(escape(msgs[0]))+"&groupField="+groupField+"&selectField="+escape(escape(selectField))+"&titles="+escape(escape(titles))+"&listField="+escape(escape(listField))+"&sType="+escape(escape(msgs.length>1 ? msgs[1]:""))+"&sCurItem=&pParam="+escape(escape(JSON.stringify(this.searchData)));

        this.loading = true;

          // 数据导出请求
          request({
            headers: {
              Accept: "application/json",
            },
            url: "/social/assistance/createCheckReportWaringList",
            // url: "/social/assistance/batchCommitCheckReport",
            method: "post",
            data: {
              printName: escape(escape(msgs[0])),
              groupField: groupField,
              selectField: escape(escape(selectField)),
              titles: escape(escape(titles)),
              listField: escape(escape(listField)),
              sType: escape(escape(msgs.length > 1 ? msgs[1] : "")),
              sCurItem: "",
              pParam: escape(escape(JSON.stringify(this.searchData))),
              sKey: "" + this.sKey,
              listname: this.listname,
              limit: "" + this.limit,
              page: "" + this.page,
              // sId:sid,
              // btnName:item.name,
            },
          }).then((res)=>{
              console.log('核对报告检测请求结果 --then');
             this.loading = false;

            // let data = this.base64ToBlob( "data:application/vnd.ms-excel;base64," + res);
            // let blob = new Blob([data], { type: "application/vnd.ms-excel", });
            // let fileName = Date.parse(new Date()) + ".xlsx";
            // console.log(blob,"--1659");

            // if (window.navigator.msSaveOrOpenBlob) {

            //   navigator.msSaveBlob(blob, fileName);
            // } else {

            //   var link = document.createElement("a");
            //   link.href = window.URL.createObjectURL(blob);
            //   link.download = fileName;
            //   link.click();
            //   //释放内存
            //   window.URL.revokeObjectURL(link.href);
            // }

          }).catch((res)=>{
             console.log('核对报告检测请求结果 --catch');
            this.loading = false;

            // let data = this.base64ToBlob("data:application/vnd.ms-excel;base64," + res.response.data);
            // let blob = new Blob([data], {  type: "application/vnd.ms-excel",});
            // let fileName = Date.parse(new Date()) + ".xlsx";
            // console.log(blob);

            // if (window.navigator.msSaveOrOpenBlob) {

            //   navigator.msSaveBlob(blob, fileName);
            // } else {

            //   var link = document.createElement("a");
            //   link.href = window.URL.createObjectURL(blob);
            //   link.download = fileName;
            //   link.click();
            //   //释放内存
            //   window.URL.revokeObjectURL(link.href);
            // }

          })

      } else {  // 新增按钮请求

        console.log(item.url+ "&params=" + JSON.stringify(this.searchData),"--新增");

        // 点击新增按钮，进行路由跳转（区分本地和线上环境）
        if(process.env.NODE_ENV=="development"){

          this.$router.push({ path: item.url + "&params=" + JSON.stringify(this.searchData), // query:JSON.stringify(this.searchData) 
          });
        }else{
          this.$pushRouter({path:generalConfig.defaultUrl + item.url + "&params=" + JSON.stringify(this.searchData)})
        }

        // 这个条件不知道干嘛的
        if (item.title) {
          this.titles = item.title;
        } else {
          this.titles = item.name;
        }

        this.centerDialogVisible2 = true;
      }

      console.log(this.titles, "this.titles");
      console.log(item.url, "item.buttonName");
      console.log(item.buttonName, "item.buttonName");
    },

  },
  // 销毁周期--销毁回车响应事件
  destroyed(){
    console.log('销毁周期');
    window.removeEventListener("keydown", this.handleKeyDown, true)
  },
  // 创建周期
  created() {
    this.getData(true);
    // console.log(this.tabsNum2,"created");
    // if(this.tabsNum2){   
      window.addEventListener("keydown", this.handleKeyDown, true); //开启监听键盘按下事件
    // }
  },
};
</script>



<style scoped>
.g-box {
  display: flex;
  width: 100%;
  height: 80vh;
  flex-direction: column;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.e-table {
  flex: 1;
  overflow: auto;
}
.item {
  margin-top: 10px;
  margin-right: 40px;
}

.view {
  height: 50px;
}

.footer {
  height: 57px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  padding-top: 10px;
  text-align: right;
  padding-right: 30px;
  /*background:#f9f9f9;*/
  background: #fff;
  border-top: 1px solid #ddd;
}
/* 搜索那一排的按钮间距 */
.btn_group > .el-form-item__content > button,span{
  margin:0 10px;
}
/* 通用全局样式 */
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 180px !important;
}
</style>

<style >
/* 表格添加下划线 */
.g-box .el-table td {
    border-bottom: 1px solid #ebeef5;
}
/* *站内信长单词强制居中 */
  .message_box_alert {
      /* word-break: break-all !important; */
      text-align: center !important;
      
  }
  .message_box_alert p{
    height: auto ;
    max-height: 500px;
    overflow-y: auto !important;
  }

/* .warning-row { */
  /* background: #c0d2c6 !important; */
  /* background: #DCDCDC !important; */
/* } */
.success-row {
  /* background: #C0C0C0 !important; */
  background: #dcdcdc !important;
}

/* 	.el-dialog__header{
			text-align: center !important;
		} */
.el-dialog__title {
  font-size: 22px !important;
}
.el-table-column--selection .cell {
  text-align: center;
}
/* 操作下居中 */
.cell {
  text-align: center;
}
/* 表头颜色 */
.el-table--border th {
  /* background-color: #2196f394 !important; */
  /* box-shadow: 0 0 18px rgb(12 4 8 / 5%); */
  /* box-shadow: 0 2px 12px 0 rgb(0 0 0 / 5%); */
  font-weight: 700;
  font-size: 14px;
}
.buttonBox {
  margin-right: 10px;
}
/* 表格宽度铺满 */
.el-table__body,
.el-table__footer,
.el-table__header {
  width: 100% !important;
}
/* 节点数据样式 */
.tabNum{
  background-color: red;
  color: white;
  width: 30px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  text-align: center;
}
.com_num:nth-child(0){
  /* color: rgb(109, 109, 109); */
  margin-bottom: 0px !important;
}
/* 反馈列表 */
.fkList{
	width: 100vw;
	height: 100vh;
	background-color: #0808087a;
	z-index: 100;
	position: absolute;
	top: -50px;
  left: -250px;
}
.fkbox> .el-popover {
  width: 50% !important;
  z-index: 1000;
  padding:10px;
  max-height: 400px;
  /* overflow-y: auto; */
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center; 
}
.fkbox  .el-table__body tr:hover>td{
	background-color: aqua !important;
	cursor: pointer !important;
}

.fkbox th> .gutter{
	background-color: aqua;
	/* width: 9px !important; */
}
.el-icon-close{
	font-size: 14px;
}
.el-icon-close:hover{
	color: rgb(51, 203, 250) !important;
	
}
.fkbox .el-table--striped .el-table__body tr.el-table__row--striped td {
  background: #ebeef5;
}

.CheckCategoriesBox .el-dialog{
  width: 30%;
}
.CheckCategoriesBox .el-dialog__header{
  text-align: center;
  border-bottom: 1px solid #ddd;
}
.CheckCategoriesBox .el-dialog__body{
  padding: 20px 20px 0px;
}

.el-table__footer{
  border-bottom: 1px solid #ebeef5;
}
</style>
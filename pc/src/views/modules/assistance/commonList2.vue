<template>
	<div class="g-box">

		<el-dialog :title="titles" @close='close' :visible.sync="centerDialogVisible2" append-to-body width="80%" height="60VH" center>
			<router-view style="height: 63vh !important;" @closes="closes" ref="routers"></router-view>
		</el-dialog>


		<el-dialog :title="titles2" :visible.sync="centerDialogVisible4" width="80%" height="60VH" center>
			<iframe :src="src" style='width:100%;height:60VH' frameborder="no" border="0" marginwidth="0"
				marginheight="0"></iframe>
		</el-dialog>
		<el-dialog :title="titles2" :visible.sync="centerDialogVisible5" width="80%" height="60VH" center>
			<div style='height:60VH;overflow:auto'>
				<img :src="item" v-for="(item,index) in pdfList" :key="index">
			</div>
		</el-dialog>
		<div class="search">
			<el-form :inline="true" :model="searchInline" class="demo-form-inline">
				<el-form-item v-for="(item,index) in searchInline" :label="item.text" :key="index" label-width="110px">
					<el-input v-if="item.searchType=='text'" v-model="searchData[item.searchId]"
						:placeholder="item.text" style="width:180px;"></el-input>
					<el-select
						v-else-if="item.searchType=='select' || item.searchType=='link' && item.searchId != 'stone' "
						v-model="searchData[item.searchId]" :placeholder="item.text" style="width:180px;">
						<el-option v-for="(itemOp,index22) in item.vals.split('#')" :value="itemOp" :key="index22">
						</el-option>
					</el-select>
					
					<el-cascader
						v-else-if="item.searchType=='select' || item.searchType=='link' && item.searchId=='stone' "
						:props="props" v-model="xzqhArray" :placeholder="item.text"
						style="width:180px;"></el-cascader>
					<!--  -->


					<el-date-picker
						v-else-if="item.searchType=='date'||item.searchType=='date2' "
						v-model="searchData[item.searchId]" :placeholder="item.text" style="width:180px;" type="date" value-format="yyyy-MM-dd">
					</el-date-picker>
					<el-date-picker v-else-if="item.searchType=='date5'|| item.searchType=='date4'" v-model="searchData[item.searchId]"
						:placeholder="item.text" style="width:180px;" type="month"  value-format="yyyy-MM">
					</el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="queryListByCriteria" icon="el-icon-search">查询</el-button>
					<el-button type="info" @click="resetQuery" icon="el-icon-refresh">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<el-row type='flex' justify="end" v-if="buttonJson.length>0"
			style='padding-top: 10px;text-align:right;padding-right:20px;'>
			<el-col :span="24" >
				<el-button  type='primary'  v-for="(item,index) in buttonJson" icon='el-icon-s-promotion' @click='grant(item)'
					:key="index">{{item.buttonName}}</el-button>
				
			</el-col>
		</el-row>
		<div class="content">
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane v-for="(item,index) in tabData" 
					:name="item.listname" :key="index">
					<span slot="label">{{item.val}}
					<!-- tabs数量 -->
					<span v-if="tabsNum2[item.val] && tabsNum2[item.val]<=99" style="background-color: red; color: white; width: 20px; height: 20px; line-height: 20px; display: inline-block; text-align: center;">
						{{tabsNum2[item.val]}}
					</span>
					<span v-else-if="tabsNum2[item.val] && tabsNum2[item.val]>99" style="background-color: red; color: white; width: 25px; height: 20px; line-height: 20px; display: inline-block; text-align: center;">
						99+
					</span>
					</span>
				</el-tab-pane>
			</el-tabs>
			<!--div class="umc-filter clearfix tables"-->
				<el-table :data="tableData" stripe height="100%" border style="width: 100%" v-loading="loading">
					<el-table-column type="selection" width="42"></el-table-column>
					<el-table-column v-if="itemT.field!='btn' && itemT.field!='btn5'" v-for="(itemT,index4) in tableList" :key="index4"
						:prop="itemT.field" :label="itemT.names" :width="itemT.width"></el-table-column>
					<el-table-column v-else label="操作" :width="itemT.width">
						<template slot-scope="scope">
							<el-button-group>
								<el-button :type="itemF.btnType" v-for="(itemF,index3) in scope.row[itemT.field]"
									:key="index3" @click="btnEvent(itemF)">{{itemF.name}}</el-button>
							</el-button-group>
						</template>
					</el-table-column>
				</el-table>
			<!--/div-->
			<div class="footer">
				<el-pagination background layout="total,sizes,prev,pager,next,jumper" :page-size="30" :current-page="page" @size-change="handleSizeChange" @current-change="handleCurrentPageChange" :total="count">
				</el-pagination>
			</div>
		</div>
	</div>
</template>
<script>
	//
	import axios from 'axios'
	import request from '@/utils/request'
	export default {
		name: "commonList2",
		props: ['sKey2','searchParam'],
		data() {
			return {
				page: 1,
				count: 1,
				limit: 30,
				listname: "",
				loading: true,
				centerDialogVisible: false,
				centerDialogVisible2: false,
				centerDialogVisible3: false,
				centerDialogVisible4: false,
				centerDialogVisible5:false,
				pdfList:[],
				src: '',
				isLoad:true,
				titles: '',
				// titles2:'',
				titles2: '',
				activeName: '',
				formInline: {
					field: "",
				},
				searchInline: [],
				searchData: {
					// ab_ex3:""
				},
				tabData: [],
				tableList: [],
				tableData: [],
				buttonJson: [],
				tabsnum: [],
				tabsnumArr: [],
				xzqhArray:[],
				tabsNum2:{
				},
				searchDataNum:{},
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
								item.leaf = level >= 1; //判断是否为末尾节点，这个地方是0,1,2三级
							})
							resolve(nodes);
						})
					}
				},
			}
		},
		computed:{
			listenRoute(){
				const {sKey2,searchParam} =this
				return {
					sKey2,
					searchParam
				}
			}
		},
		watch: {
			xzqhArray(newA,oldA){
				let i =newA[0].split("#")[0]+"#"+newA[1].split("#")[0]
				this.searchData.stone=i;
				console.log(i)
			},
			'$route': 'fetchData',
			// 监听sKey2和searchParam
			listenRoute(newVal,oldVal){
				this.searchData={}
				this.getData();
				this.loadData();
			},
			// sKey2(){
			// 	// console.log('skey2改变了',this.sKey2)
			// 	// if(this.sKey2){
			// 	// 	console.log(this.sKey2)
			// 	// 	this.getData();
			// 	// 	this.loadData();
			// 	// }
			// 	this.getData();
			// 	this.loadData();
			// },
			// searchParam(){
			// 	this.getData();
			// 	this.loadData();
			// }
		},
		methods: {
			fetchData() {
				console.log('路由发送变化doing...');
				console.log(this.sKey2)
				console.log(this.$route.query.sKey2)
				// if(this.$route.query.sKey2){
				// 	this.sKey2 = this.$route.query.sKey2
				// 	this.loadData()
				// 	this.isLoad=true;
				// }else if(this.sKey2){
				// 	this.loadData()
					// this.$refs.routers.loadData();
					// this.isLoad=true;
				// }
				// // this.$refs.routers2.loadData();
				if(!this.sKey2){
					this.getData()
					this.loadData()
					this.isLoad=true;
				}
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						alert('submit!');
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			resetQuery() {
				for (let key in this.searchData) {
					this.searchData[key] = "";
				}
				this.xzqhArray=[]
			},
			handleClick(tab, event) {
				console.log(tab, event);
				console.log("tab.name===============" + tab.name)
				this.listname = tab.name;
				this.page = 1;
				this.getData();
				this.loadData();
			},
			closedbListView(n) {
				this.centerDialogVisible2 = false
			},
			handleSizeChange(val) {
				this.limit = val;
				this.loadData()
			},
			handleCurrentPageChange(val) {
				this.page = val;
				this.loadData()
			},
			loadData() {
				let sKey2num = this.sKey2
				if(this.$route.query.sKey2 && !this.sKey2){
					sKey2num = this.$route.query.sKey2
				}
				this.getNum()
				this.loading = true
				let dataParams = {
					// sKey2: "" + this.sKey2,
					sKey2: "" + sKey2num,
					listname: this.listname,
					params: JSON.stringify(this.searchData),
					limit: "" + this.limit,
					page: "" + this.page
				}
				if(this.searchParam){
					console.log(this.searchParam)
					if(this.searchParam.split(';').length == 2){
						let ss0 = this.searchParam.split(';')[0]
						let ss1 = this.searchParam.split(';')[1]
						let s0 = ss0.split(':')[0]
						let s1 = ss1.split(':')[1]
						this.$set(dataParams,s0,s1)
					}else{
						let s0 = this.searchParam.split(':')[0]
						let s1 = this.searchParam.split(':')[1]
						this.$set(dataParams,s0,s1)
						this.$set(this.searchData,'ab_ex13',s1)
						this.$set(dataParams,'params',JSON.stringify(this.searchData))
						console.log(this.searchData)
					}
				}
				this.getSearchData(dataParams).then(res => {
					
					this.tableData = [];
					this.count = 1;

					if (res.data) {
						this.tableData = res.data
						this.count = res.count;
					}
					for (let i = 0; i < this.tableData.length; i++) {
						if (this.tableData[i]['btn']) {
							let btn = this.tableData[i].btn;
							for (let j = 0; j < btn.length; j++) {
								let type = this.tableData[i].btn[j].type;
								if (type == "openWin") {
									this.tableData[i].btn[j].btnType = "primary"
								} else
									this.tableData[i].btn[j].btnType = "danger"
							}

						}
					}
					this.loading = false;
				}).catch(res => {
					console.log(res.response.data.data)
					this.tableData = [];
					this.count = 1;

					if (res.response.data.data) {
						this.tableData = res.response.data.data
						this.count = res.response.data.count;
					}
					for (let i = 0; i < this.tableData.length; i++) {
						if (this.tableData[i]['btn']) {
							let btn = this.tableData[i].btn;
							for (let j = 0; j < btn.length; j++) {
								let type = this.tableData[i].btn[j].type;
								if (type == "openWin") {
									this.tableData[i].btn[j].btnType = "primary"
								} else
									this.tableData[i].btn[j].btnType = "danger"
							}
						}
						if (this.tableData[i]['btn5']) {
							let btn = this.tableData[i].btn5;
							for (let j = 0; j < btn.length; j++) {
								let type = this.tableData[i].btn5[j].type;
								if (type == "openWin") {
									this.tableData[i].btn5[j].btnType = "primary"
								} else
									this.tableData[i].btn5[j].btnType = "danger"
							}
						}
					}
					this.loading = false;
				})
			},
			queryListByCriteria() {
				this.page = 1;
				if (this.searchData.code && this.searchData.code.length != 18) {
					this.$message.warning('请输入正确的身份证号码')
				} else {
					this.loadData();
				}
			},
			getData() {
				this.loading = true
				let sKey2num = this.sKey2
				if(this.$route.query.sKey2 && !this.sKey2){
					sKey2num = this.$route.query.sKey2
				}
				this.getDatas({
					// sKey2: "" + this.sKey2,
					sKey2: "" + sKey2num,
					listname: this.listname
				}).then(res => {
					console.log(res)
					if (this.listname == '') {
						if (res[0].searchStr.length > 0) {
							this.searchInline = res[0].searchStr
						}
						if (res[0].tabJson.length > 0 && res[0].tabJson[0].maps.length > 0) {
							
							this.tabData = res[0].tabJson[0].maps
							// this.activeName = res.response.data[0].tabJson[0].maps[0].val
							this.activeName = res[0].tabJson[0].maps[0].listname
						}
					}
					this.tableList = [];
					if (res[0].list.length > 0) {
						this.tableList = res[0].list
						console.log(res[0].list)
					}
					this.buttonJson = res[0].buttonJson
				}).catch(res => {
					if (this.listname == '') {
						if (res.response.data[0].searchStr.length > 0) {
							this.searchInline = res.response.data[0].searchStr
						}
						if (res.response.data[0].tabJson.length > 0 && res.response.data[0].tabJson[0].maps
							.length > 0) {
							
							this.tabData = res.response.data[0].tabJson[0].maps
							// this.activeName = res.response.data[0].tabJson[0].maps[0].val
							this.activeName = res.response.data[0].tabJson[0].maps[0].listname
						}
					}
					this.tableList = [];
					if (res.response.data[0].list.length > 0) {
						this.tableList = res.response.data[0].list
						console.log(res.response.data[0].list)
					}
					this.buttonJson = res.response.data[0].buttonJson
				})
			},
			getNum(){
				// console.log(this.type,this.sKey2)
				// this.searchDataNum = {...this.searchData}
				// for(let key in this.searchDataNum){
				// 	this.searchDataNum[key] = escape(this.searchDataNum[key])
				// }
				// this.searchDataNum.type = escape(this.type)
				// this.searchDataNum.company = escape("泰州市姜堰区社会救助综合平台")
				// this.searchDataNum.tableName = escape(this.tableName)
				// console.log(this.searchDataNum)
				// if(this.type){
				// 	request({
				// 		headers: {
				// 			'Accept': 'application/json',
				// 		},
				// 		url: '/social/assistance/getBasicNum',
				// 		method: 'post',
				// 		data: this.searchDataNum
				// 	}).then(res=>{
				// 		let json=res;
				// 		for(let i=0;i<json.length;i++){
				// 			let ab_ex15=unescape(json[i].ab_ex15);
				// 			let num=json[i].num;
				// 			this.tabsNum2[ab_ex15]=num;
				// 		}
				// 	}).catch(res=>{
				// 		this.tabsNum2={}
				// 		console.log(res.response.data)
				// 		let json=res.response.data;
				// 		for(let i=0;i<json.length;i++){
				// 			if(json[i].ab_ex15){//申请
				// 				let ab_ex15=unescape(json[i].ab_ex15);
				// 				if(ab_ex15=="审核"){
				// 					ab_ex15 = "审核2"
				// 				}else if(ab_ex15=="初审"){
				// 					ab_ex15 = "审核"
				// 				}else if(ab_ex15=="公示"){
				// 					ab_ex15 = "公示2"
				// 				}else if(ab_ex15=="公示开始"){
				// 					ab_ex15 = "公示"
				// 				}else if(ab_ex15=="核对中"){
				// 					ab_ex15 = "信息核对"
				// 				}
				// 				let num=json[i].num;
				// 				console.log(ab_ex15,num)
				// 				this.tabsNum2[ab_ex15]=num;
				// 			}else if(json[i].ac_ex3){//变更
				// 				let ac_ex3=unescape(json[i].ac_ex3);
				// 				if(ac_ex3=="初审"){
				// 					ac_ex3 = "审核"
				// 				}else if(ac_ex3=="公示开始"){
				// 					ac_ex3 = "公示"
				// 				}else if(ac_ex3=="核对中"){
				// 					ac_ex3 = "信息核对"
				// 				}
				// 				let num=json[i].num;
				// 				console.log(ac_ex3,num)
				// 				this.tabsNum2[ac_ex3]=num;
				// 			}else if(json[i].ac_ex7){//注销
				// 				let ac_ex7=unescape(json[i].ac_ex7);
				// 				if(ac_ex7=="初审"){
				// 					ac_ex7 = "审核"
				// 				}else if(ac_ex7=="公示开始"){
				// 					ac_ex7 = "公示"
				// 				}else if(ac_ex7=="核对中"){
				// 					ac_ex7 = "信息核对"
				// 				}
				// 				let num=json[i].num;
				// 				this.tabsNum2[ac_ex7]=num;
				// 			}
				// 		}
				// 		console.log(this.tabsNum2)
				// 	})
				// }
				
			},
			getSearchData(data) {
				return request({
					headers: {
						'Accept': 'application/json',
					},
					url: '/social/weida/getCommonListJson',
					method: 'post',

					data: data
				})
			},
			getDatas(data) {
				return request({

					url: '/social/common/commonListJson',
					method: 'post',
					data: data
				})
			},
			closes(data) {
				console.log('close-----------------')
				this.centerDialogVisible2 = false;
				this.loadData();
			},
			// 修改了内容未保存点击关闭，重新打开由于路由没有发生变化，导致会显示上次修改内容，需要重新获取数据
			close() {
				console.log('关闭了')
				// this.$refs.routers.loadData();
			},
			// closes2(data){
			// 	this.centerDialogVisible3=false;
			// 	this.loadData();
			// },
			btnEvent(item) {
				//alert(item.url)
				if (item.type == "openWin") {

					//item.url="dbListCancel"+item.url
					//alert(item.url);
					//item.url=item.url.replace("dbListView","dbListCancelView");
					// alert(item.url)
					let timestamp = Date.parse(new Date());
					let url=item.url;
					url=url.indexOf("?")==-1 ? url+"?timestamp="+timestamp:url+"&timestamp="+timestamp;
					// 预警信息查看判断页面跳转
					console.log(url)
					if(url.indexOf('ab_ex13=低保')!=-1){
						url = url.replace('assistance/toView','dbListView6')
						console.log(url)
					}else if(url.indexOf('ab_ex13=低收入')!=-1){
						url = url.replace('assistance/toView','dsrListView2')
						console.log(url)
					}else if(url.indexOf('ab_ex13=特困供养')!=-1){
						url = url.replace('assistance/toView','tkListView2')
						console.log(url)
					}else if(url.indexOf('ab_ex13=临时救助')!=-1){
						url = url.replace('assistance/toView','lsListView2')
						console.log(url)
					}else if(url.indexOf('ab_ex13=其他救助')!=-1){
						url = url.replace('assistance/toView','qtListView2')
						console.log(url)
					}else if(url.indexOf('ab_ex13=法律援助')!=-1){
						url = url.replace('assistance/toView','flyzListView2')
						console.log(url)
					}else if(url.indexOf('ab_ex13=下放职工')!=-1){
						url = url.replace('assistance/toView','xfzgCancelView2')
						console.log(url)
					}
					// 预警信息查看判断页面跳转
					this.$router.push({
						// path: '/dbListView6?sId=58341&cId=22030219890511064x&timestamp=1618362449000'
						path: url
					});
					// this.$pushRouter({path:generalConfig.defaultUrl + url,})
					this.centerDialogVisible2 = true;

					if (item.title) {
						this.titles = item.title;
					} else {
						this.titles = item.name;
					}

				} else if (item.type == "get") {
					this.titles2 = item.name;
					this.loading = true;
					request({
						headers: {
							'Accept': 'application/json',
						},
						url: item.url,
						method: 'post',
						data: {}
					}).then(res => {
						this.loading = false;
						this.src = 'data:application/pdf;base64,' + res;
						this.centerDialogVisible4 = true;
					}).catch(res => {
						this.loading = false;
						this.src = 'data:application/pdf;base64,' + res.response.data;
						this.centerDialogVisible4 = true;
					})

				}else if (item.type == "get2") {
					this.titles2 = item.name;
					this.loading = true;
					request({
						headers: {
							'Accept': 'application/json',
						},
						url: item.url,
						method: 'post',
						data: {}
					}).then(res => {
						this.loading = false;
						
					}).catch(res => {
						this.loading = false;
						let json=res.response.data;
						this.pdfList=[];
						for(let i=0;i<json.length;i++){
							this.pdfList.push('data:image/;base64,'+unescape(json[i].base64))
						}
						//this.src = 'data:application/pdf;base64,' + res.response.data;
						this.centerDialogVisible5 = true;
					})

				} else if (item.type == "confirm" || item.type == "comfirms") {
					let sef = this;
					this.$confirm('确定要' + item.name + '?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						// 打开遮罩层
						this.loading = true
						// 设置定时器，20秒请求失败刷新页面
						let time = setTimeout(()=>{
										this.loadData();
										this.$message.error("网络异常");
									},30000)
						request({

							url: item.url,
							method: 'post',
							data: {}
						}).then(res => {
							if (res[0].status == "+OK") {
								this.$message({
									message: unescape(res[0].msg),
									type: 'success'
								});

								this.loadData();
							} else {
								sef.$message.error(unescape(res[0].msg));
							}

						}).catch(res => {
							// 数据请求成功删除定时器
							clearTimeout(time);
							if (res.response.data[0].status == "+OK") {
								this.$message({
									message: unescape(res.response.data[0].msg),
									type: 'success'
								});

								this.loadData();
							} else {
								sef.$message.error(unescape(res.response.data[0].msg));
							}

						})


					}).catch(() => {

					});
				}
			},
			base64ToBlob(code) {
				let parts = code.split(';base64,');
				let contentType = parts[0].split(':')[1];
				let raw = window.atob(parts[1]);
				let rawLength = raw.length;

				let uInt8Array = new Uint8Array(rawLength);

				for (let i = 0; i < rawLength; ++i) {
					uInt8Array[i] = raw.charCodeAt(i);
				}
				return new Blob([uInt8Array], {
					type: contentType
				});
			},
			grant(item) {
				console.log(item);
				if (item.buttonName.indexOf("导出") != -1) {
					let msg = item.wb_msg;
					let msgs = msg.split("#");
					let selectField = msgs.length > 2 ? msgs[2] : "*";
					let groupField = msgs.length > 3 ? msgs[3] : "";
					let listField = msgs.length > 4 ? msgs[4] : "";
					let titles = msgs.length > 5 ? msgs[5] : "";


					//let url='/social/excel/ExcelDownload?printName='+escape(escape(msgs[0]))+"&groupField="+groupField+"&selectField="+escape(escape(selectField))+"&titles="+escape(escape(titles))+"&listField="+escape(escape(listField))+"&sType="+escape(escape(msgs.length>1 ? msgs[1]:""))+"&sCurItem=&pParam="+escape(escape(JSON.stringify(this.searchData)));

					this.loading = true
					request({
						headers: {
							'Accept': 'application/json',
						},
						url: "/social/excel/ExcelDownload",
						method: 'post',
						data: {
							printName: escape(escape(msgs[0])),
							groupField: groupField,
							selectField: escape(escape(selectField)),
							titles: escape(escape(titles)),
							listField: escape(escape(listField)),
							sType: escape(escape(msgs.length > 1 ? msgs[1] : "")),
							sCurItem: "",
							pParam: escape(escape(JSON.stringify(this.searchData))),
							sKey2: "" + this.sKey2,
							listname: this.listname,
							limit: "" + this.limit,
							page: "" + this.page

						}
					}).then(res => {
						this.loading = false
						let data = this.base64ToBlob('data:application/vnd.ms-excel;base64,' + res)
						let blob = new Blob([data], {
							type: 'application/vnd.ms-excel'
						})
						console.log(blob)
						let fileName = Date.parse(new Date()) + '.xlsx'
						if (window.navigator.msSaveOrOpenBlob) {
							// console.log(2)
							navigator.msSaveBlob(blob, fileName)
						} else {
							// console.log(3)
							var link = document.createElement('a')
							link.href = window.URL.createObjectURL(blob)
							link.download = fileName
							link.click()
							//释放内存
							window.URL.revokeObjectURL(link.href)
						}
					}).catch(res => {
						this.loading = false
						let data = this.base64ToBlob('data:application/vnd.ms-excel;base64,' + res.response.data)
						let blob = new Blob([data], {
							type: 'application/vnd.ms-excel'
						})
						console.log(blob)
						let fileName = Date.parse(new Date()) + '.xlsx'
						if (window.navigator.msSaveOrOpenBlob) {
							// console.log(2)
							navigator.msSaveBlob(blob, fileName)
						} else {
							// console.log(3)
							var link = document.createElement('a')
							link.href = window.URL.createObjectURL(blob)
							link.download = fileName
							link.click()
							//释放内存
							window.URL.revokeObjectURL(link.href)
						}
					})
				} else {
					console.log(item.url)
					this.$router.push({
						path: item.url + "&params=" + JSON.stringify(this.searchData),
						// query:JSON.stringify(this.searchData)
					});
					// this.$pushRouter({path:generalConfig.defaultUrl + item.url + "&params=" + JSON.stringify(this.searchData)})
					if (item.title) {
						this.titles = item.title;
					} else {
						this.titles = item.name;
					}
					this.centerDialogVisible2 = true;
				}



			}
		},
		created() {
			console.log(8888888888888888888888888888888888888888888)
			console.log(this.sKey2)
			console.log(this.$route.query.sKey2)
			// 预警信息点击第一次加载进来并不是路由跳转，只有this.sKey2，第一次watch监听this.sKey2并不会执行，所以需要先在created执行一次，
			// 后续watch监听才会生效,历史记录页面是路由跳转，所以需要监听路由，这样做导致会执行几次getdata和loaddata，后续优化可以改成都执行路由跳转
			
			// if(this.$route.query.sKey2){
			// 	this.sKey2 = this.$route.query.sKey2
			// }else{
			// 	this.getData();
			// 	this.loadData();
			// }
			this.getData();
			this.loadData();
			
		}
	}
</script>



<style scoped>
	.g-box {
		display: flex;
		width: 100%;
		height: 80VH;
		flex-direction: column;
	}

	.content {
		flex: 1;
		display:flex;
		flex-direction: column;
	}
	.e-table{
		flex:1;
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
		height: 50px;
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
</style>

<style >
.el-date-editor.el-input, .el-date-editor.el-input__inner{
	width:180px  !important;
}
</style>
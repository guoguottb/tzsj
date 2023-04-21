<template>
	<div class="box">
		<h3 class="line_blue" >&emsp;自动计算</h3>
		<div class="lineSt"></div>
		<el-row :gutter="20">
			<el-col :span="24">
				<el-input type="textarea" rows="10" v-model='setTypeData'></el-input>
			</el-col>
		</el-row>
		<el-row :gutter="20">
			<el-col :span="6">
				<el-button @click='setType(setTypeData)' type="primary">setType</el-button>
			</el-col>
			<el-col :span="6">
				<el-button @click='setMoney(setTypeData)' type="primary">setMoney</el-button>
			</el-col>
			<el-col :span="6">
				<el-button @click='submitSTHD(setTypeData)' type="primary">submitSTHD</el-button>
			</el-col>
			<el-col :span="6">
				<el-button @click='submitJMtoMySQL(setTypeData)' type="primary">submitJMtoMySQL</el-button>
			</el-col>
			
		</el-row>
		<el-row :gutter="20">
			<el-col :span="6" >
				<el-button @click='getHDPDF(setTypeData)' type="primary">getHDPDF</el-button>
			</el-col>
			<el-col :span="6" >
				<el-button @click='checkDatas(setTypeData)' type="primary">checkDatas</el-button>
			</el-col>
			<el-col :span="6" >
				<el-button @click='checkJMData(setTypeData)' type="primary">checkJMData</el-button>
			</el-col>
			<el-col :span="6" >
				<el-button @click='newCheckData(setTypeData)' type="primary">newCheckData</el-button>
			</el-col>
		</el-row>

		<el-row :gutter="20">
			<el-col :span="6" >
				<el-button @click='submitJTHD(setTypeData)' type="primary">submitJTHD</el-button>
			</el-col>
			<el-col :span="6" >
				<el-button @click='typeJs(setTypeData)' type="primary">typejs</el-button>
			</el-col>
			<!-- <el-col :span="6" >
				<el-button @click='changePwd(setTypeData)' type="primary">changePwd</el-button>
			</el-col> -->
			<el-col :span="6" >
				<el-button @click='base64(setTypeData)' type="primary">base64</el-button>
			</el-col>
			
		</el-row>

		
		<!-- <el-button style="float: right; padding: 3px 0" type="text" @click="uploads('shangchuan')">上传</el-button> -->
		<!-- <div class="block">
			<import-excel :imgList="uploadImg" ></import-excel>
			
		</div> -->
		<!-- <page-1 /> -->
		
	</div>
</template>

<script>
	import request from '@/utils/request'
	import Page1 from './Page1.vue'
	// import ImportExcel from '../importExcel.vue'
	export default{
		components: {
			Page1,
			// ImportExcel
			// ImportExcel
		},
		data(){
			return{
				setTypeData:'',
				
				// uploadId:'',
				// uploadImg:'',
			}
		},

		methods:{

			// uploads(id) {
			// 	// this.dialogVisible3 = true;
			// 	this.uploadId = id;
			// 	try {
			// 		this.$refs.myUpload.clears();
			// 	} catch (e) {}
			// 	console.log('====上传s',id)
			// },

			// 获取文本框的内容
			getB(){
				let a = this.setTypeData.split(',')
				let b = {}
				// console.log('getB');
				if(a!=''){
					console.log("get输入的接收数据");
					a.forEach((item,index)=>{
						if(item.split(':').length>1){
							console.log(555);
							console.log(item.split(':')[0]);
							let c1 = item.split(':')[0].trim();
							let c2 = item.split(':')[1].trim();
							// let c1 = item.split(':')[0].replaceAll(" ", "")
							// let c2 = item.split(':')[1].replaceAll(" ", "")
							b[c1] = c2;
							console.log(c1);
						}
					})
				}
				return b
			},


			setType(){
				// let a = this.setTypeData.split(',')
				// let b = {}
				// a.forEach((item,index)=>{
				// 	let c1 = item.split(':')[0].replaceAll(" ", "")
				// 	let c2 = item.split(':')[1].replaceAll(" ", "")
				// 	b[c1] = c2
				// })
				var b = this.getB()

				request({
					url:"/social/assistance/setType",
					method:"post",
					data:b
				}).then(res => {
				}).catch(res=>{
					
				})
			},

			setMoney(){
				// let a = this.setTypeData.split(',')
				// let b = {}
				// a.forEach((item,index)=>{
				// 	let c1 = item.split(':')[0].replaceAll(" ", "")
				// 	let c2 = item.split(':')[1].replaceAll(" ", "")
				// 	b[c1] = c2
				// })

				var b = this.getB()

				request({
					url:"/social/assistance/setMoney",
					method:"post",
					data:b
				}).then(res => {
				}).catch(res=>{
					
				})
			},

			submitSTHD(){
				// let a = this.setTypeData.split(',')
				// let b = {}
				// a.forEach((item,index)=>{
				// 	let c1 = item.split(':')[0].replaceAll(" ", "")
				// 	let c2 = item.split(':')[1].replaceAll(" ", "")
				// 	b[c1] = c2
				// })
				var b = this.getB()

				request({
					url:"/social/assistance/submitSTHD",
					method:"post",
					data:b
				}).then(res => {
				}).catch(res=>{
					
				})
			},

			submitJMtoMySQL(){
				// let a = this.setTypeData.split(',')
				// let b = {}
				// a.forEach((item,index)=>{
				// 	let c1 = item.split(':')[0].replaceAll(" ", "")
				// 	let c2 = item.split(':')[1].replaceAll(" ", "")
				// 	b[c1] = c2
				// })
				var b = this.getB()

				request({
					url:"/social/assistance/submitJMtoMySQL",
					method:"post",
					data:b
				}).then(res => {
				}).catch(res=>{
					
				})
			},

			getHDPDF(){
				// console.log("getHDPDF");
				// let a = this.setTypeData.split(',')
				// let b = {}
				// a.forEach((item,index)=>{
				// 	let c1 = item.split(':')[0].replaceAll(" ", "")
				// 	let c2 = item.split(':')[1].replaceAll(" ", "")
				// 	b[c1] = c2
				// })
				var b = this.getB()

				request({
					url:"/social/assistance/getHDPDF",
					method:"post",
					data:b
				}).then(res => {
				}).catch(res=>{
					
				})
			},

			checkDatas(){
				// let a = this.setTypeData.split(',')
				// let b = {}
				// a.forEach((item,index)=>{
				// 	let c1 = item.split(':')[0].replaceAll(" ", "")
				// 	let c2 = item.split(':')[1].replaceAll(" ", "")
				// 	b[c1] = c2
				// })
				var b = this.getB()

				request({
					url:"/social/assistance/checkDatas",
					method:"post",
					data:b
				}).then(res => {
				}).catch(res=>{
					
				})
			},

			checkJMData(){
				// let a = this.setTypeData.split(',')
				// let b = {}
				// a.forEach((item,index)=>{
				// 	let c1 = item.split(':')[0].replaceAll(" ", "")
				// 	let c2 = item.split(':')[1].replaceAll(" ", "")
				// 	b[c1] = c2
				// })

				var b = this.getB()

				request({
					url:"/social/assistance/checkJMData",
					method:"post",
					data:b
				}).then(res => {
				}).catch(res=>{
					
				})
			},
			newCheckData(){
				// let a = this.setTypeData.split(',')
				// let b = {}
				// a.forEach((item,index)=>{
				// 	let c1 = item.split(':')[0].replaceAll(" ", "")
				// 	let c2 = item.split(':')[1].replaceAll(" ", "")
				// 	b[c1] = c2
				// })
				var b = this.getB()

				request({
					url:"/social/assistance/newCheckData",
					method:"post",
					data:b
				}).then(res => {
				}).catch(res=>{
					
				})
			},

			submitJTHD(){
				// let a = this.setTypeData.split(',')
				// let b = {}
				// a.forEach((item,index)=>{
				// 	let c1 = item.split(':')[0].replaceAll(" ", "")
				// 	let c2 = item.split(':')[1].replaceAll(" ", "")
				// 	b[c1] = c2
				// })
					var b = this.getB()
					console.log(b);

					// console.log("将"+b+"发送给后端");
					
				request({
					url:"/social/assistance/submitJTHD",
					method:"post",
					data:b
				}).then(res => {
				}).catch(res=>{
					
				})
			},

			typeJs(data){
				var b = this.getB()
				console.log(b);
				request({
					url:"/social/assistance/typeJs",
					method:"post",
					data:b
				}).then(res => {
					console.log(res,'then');
					alert(res)
				}).catch(res=>{
					// 有值走catch，无值走then	
					console.log(res,'catch');
					alert(res.response.data)
				})
			},

			// base64格式Excel导出
			base64(data){
				var b = this.getB(data)
				 console.log(b);
				//  https://blog.csdn.net/qq_30351747/article/details/122670334
				request({
					url:"/social/assistance/typeJs1",
					method:"post",
					data:b
				}).then(res => {
					console.log(res,'then');
					// alert(res)
				}).catch(res=>{
					this.loading = false;
					let data = this.base64ToBlob(
					"data:application/vnd.ms-excel;base64," + res.response.data
					);
					let blob = new Blob([data], {
					type: "application/vnd.ms-excel",
					});

					console.log(blob);

					let fileName = Date.parse(new Date()) + ".xlsx";
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
				})
			},

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
			
			// changePwd(){
			// 	// let a = this.setTypeData.split(',')
			// 	// let b = {}
			// 	// a.forEach((item,index)=>{
			// 	// 	let c1 = item.split(':')[0].replaceAll(" ", "")
			// 	// 	let c2 = item.split(':')[1].replaceAll(" ", "")
			// 	// 	b[c1] = c2
			// 	// })
			// 	var b = this.getB()

			// 	request({
			// 		url:"/social/taizhou/changePwd",
			// 		method:"post",
			// 		data:b
			// 	}).then(res => {
			// 	}).catch(res=>{
					
			// 	})
			// },

			// changeAccount(){
			// 	// let a = this.setTypeData.split(',')
			// 	// let b = {}
			// 	// a.forEach((item,index)=>{
			// 	// 	let c1 = item.split(':')[0].replaceAll(" ", "")
			// 	// 	let c2 = item.split(':')[1].replaceAll(" ", "")
			// 	// 	b[c1] = c2
			// 	// })
			// 	var b = this.getB()

			// 	request({
			// 		url:"/social/taizhou/changeAccount",
			// 		method:"post",
			// 		data:b
			// 	}).then(res => {
			// 	}).catch(res=>{
					
			// 	})
			// },

			// changePwd(){
			// 	// let a = this.setTypeData.split(',')
			// 	// let b = {}
			// 	// a.forEach((item,index)=>{
			// 	// 	let c1 = item.split(':')[0].replaceAll(" ", "")
			// 	// 	let c2 = item.split(':')[1].replaceAll(" ", "")
			// 	// 	b[c1] = c2
			// 	// })
			// 	var b = this.getB()

			// 	request({
			// 		url:"/social/taizhou/changePwd",
			// 		method:"post",
			// 		data:b
			// 	}).then(res => {
			// 	}).catch(res=>{
					
			// 	})
			// },


		}
	}
</script>

<style>

	.box{
		padding: 10px;
		/* width: 90%; */
		/* border:1px solid #ddd; */
		background-color: #fff;
		box-shadow: 0 0 18px rgb(12 4 8 / 10%);
	}
	.box>.el-row{
		margin-bottom: 18px;
	}
	.line_blue {
		border-left: 2px solid #3385FF;
		/* margin-top: 25px; */
	}
	.lineSt {
		background-color: #dcdfe6;
		height: 1px;
		width: 100%;
		margin-bottom: 10px;
	}
</style>

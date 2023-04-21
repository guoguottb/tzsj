<template>
	<!-- <el-dialog title="提示" :visible.sync="dialogVisible" width="80%" :before-close="handleClose"> -->
		<div class="g-box">
			<div class="g-box2">
				<div style="width: 100%;text-align: center;">
					<el-row type='flex' justify='center' style='padding-top: 40px;'>
						<el-col :span='24' style="text-align: center;">
							<!-- <el-button type='primary'>点击这里上传EXCEL文件</el-button> -->
							<div>
								<el-upload drag :limit="limitNum"
									:auto-upload="true" 
									accept=".xlsx,.xls" 
									:action="UploadUrl()"
									:before-upload="beforeUploadFile" 
									:on-remove="handleRemove" 
									:headers="headers"
									:data="datas"
									:on-exceed="exceedFile" 
									:on-success="handleSuccess" 
									:on-error="handleError"
									:file-list="fileList">
									<i class="el-icon-upload"></i>
									<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
									<div class="el-upload__tip" slot="tip">只能上传xlsx(xls)文件，且不超过50M</div>
								</el-upload>
								<br />
								<!-- <el-button size="small" type="primary" @click="uploadFile">立即上传</el-button>
								<el-button size="small">取消</el-button> -->
							</div>
						</el-col>
					</el-row>
					<!-- <el-row type='flex' justify='center' style='padding-top: 40px;'>
						<el-col :span='24'>
							<div style="text-align: center;">导入完成:其中已成功导入0条数据，未成功导入0条数据</div>
						</el-col>
					</el-row> -->
					<el-row type='flex' justify='end' style='padding-top: 40px;'>
						<!-- <el-col :span='6'>
							<el-link type='primary' @click='download'>下载上传模板</el-link>
						</el-col> -->
						<el-col :span='6'><a :href='downloadTemplate'>下载上传模板</a></el-col>
					
					</el-row>
					<el-divider></el-divider>
					<!-- <el-row type='flex' justify='center' style='padding-top: 40px;'>
						<el-col :span='18' :push='6'>
							<div>第1条到1条数据导入成功</div>
						</el-col>
					</el-row>
					<el-row type='flex' justify='center' style='padding-top: 20px;'>
						<el-col :span='18' :push='6'>
							<div>导入完成:其中已成功导入0条数据，未成功导入0条数据</div>
						</el-col>
					</el-row> -->
				</div>
			</div>
		</div>
	<!-- </el-dialog> -->
</template>

<script>
	import request from '@/utils/request'
	import requestConst from '@/utils/request-const'
	export default {
		data() {
			return {
				headers: {}, //请求头
				limitNum: 10, // 上传excell时，同时允许上传的最大数
				fileList: [], // excel文件列表
				// filename:this.$route.query.filename
				datas:{
					// 传给后端参数判断是哪个页面的
					'filename':unescape(this.$route.query.filename)
				},
				// downloadTemplate: '/social/excel/ImportExcelDownload?fileName=社救/assistance_basic_medical_care&name=上传模板'
				// 上面这行给领导看效果的 下面的还没改
				// downloadTemplate: '/social/excel/ImportExcelDownload?fileName='+this.$route.query.filename+'&name=上传模板'
				downloadTemplate: `/social/assistance/disabledImportTemplate?fileName=${unescape(this.$route.query.filename)}&name=上传模板`
				
			}
		},
		created() {
			let token = sessionStorage.getItem(requestConst.headers.sesstionCsrf)
			// do something before request is sent
			this.headers[requestConst.headers.csrf] = token
			console.log(this.headers)
			console.log(this.headers[requestConst.headers.csrf])
			if (process.env.NODE_ENV == 'development') {
				let greentoken = sessionStorage.getItem(requestConst.headers.greenChannel)
				this.headers[requestConst.headers.greenChannel] = greentoken
			}
			this.headers['Accept'] = 'application/json; charset=utf-8'
			
			// let token = sessionStorage.getItem(requestConst.headers.sesstionCsrf)
			// // do something before request is sent
			// this.headers[requestConst.headers.csrf] = token
			// if (process.env.NODE_ENV == 'development') {
			// 	let greentoken = sessionStorage.getItem(requestConst.headers.greenChannel)
			// 	this.headers[requestConst.headers.greenChannel] = greentoken
			// }
			// this.headers['Accept'] = 'application/json; charset=utf-8'
		},
		watch: {

		},
		mounted() {
			// alert(this.$route.query.filename)
		},
		methods: {
			// 文件超出个数限制时的钩子
			exceedFile(files, fileList) {
				this.$message.warning(`只能选择 ${this.limitNum} 个文件，当前共选择了 ${files.length + fileList.length} 个`);
			},
			//文件移除操作
			handleRemove(file, fileList) {
				console.info(file, "file")
				console.info(fileList, "fileList")
				this.fileList = fileList
			},
			// 文件状态改变时的钩子
			// fileChange(file, fileList) {
			//   console.log(file.raw);
			//   this.fileList.push(file.raw) ;
			//   console.log(this.fileList);
			// },
			// 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
			beforeUploadFile(file) {
				console.log('before upload');
				console.log(file);
				let extension = file.name.substring(file.name.lastIndexOf('.') + 1);
				let size = file.size / 1024 / 1024;
				if (extension !== 'xlsx' && extension !== 'xls') {
					this.$message.warning('只能上传后缀是.xlsx(.xls)的文件');
				}
				if (size > 50) {
					this.$message.warning('文件大小不得超过50M');
				}
			},
			// 文件上传成功时的钩子
			handleSuccess(res, file, fileList) {
				console.log(res)
				// this.$message.success('文件上传成功');
				if(res.status=='+ERR'){
					this.$message.error(res.msg);
				}else{
					this.$message.success(res.msg);
				}
			},
			// 文件上传失败时的钩子
			handleError(err, file, fileList) {
				this.$message.error('文件上传失败');
			},
			UploadUrl: function() {
				// 因为action参数是必填项，我们使用二次确认进行文件上传时，直接填上传文件的url会因为没有参数导致api报404，所以这里将action设置为一个返回为空的方法就行，避免抛错
				// return "https://jsonplaceholder.typicode.com/posts/"
				return "/social/assistance/disabledImport"
			},
			//    uploadFile() {
			//      if (this.fileList.length === 0){
			//        this.$message.warning('请上传文件');
			//      } else {
			//        let form = new FormData();
			//        form.append('file', this.fileList);
			//        request({
			//          method:"post",
			//          // url: "/social/excel/imports/",
			// url:'https://jsonplaceholder.typicode.com/posts/',
			//          headers:{
			//            'Content-type': 'multipart/form-data',
			//          },
			//          data:form
			//        }).then(
			//          res=>{
			// 	console.log(res)
			//          },err =>{
			// 	console.log(err)
			//          });
			//      }
			//    },


			// download() {
			// 	request({
			// 		headers: {
			// 			'Accept': 'application/json',
			// 		},
			// 		url: "/social/excel/ImportExcelDownload",
			// 		method: 'get',
			// 		params: {
			// 			fileName: '社救/assistance_basic_medical_care',
			// 			name: '上传模板'
			// 		}
			// 	}).then(res => {}).catch(res => {

			// 	})
			// },
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
</style>

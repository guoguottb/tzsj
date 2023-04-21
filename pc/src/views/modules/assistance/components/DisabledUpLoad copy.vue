<template>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="80%" :before-close="handleClose">
    
        <div  class="Disable">
            <!-- 返回主页 -->
            <!-- 上传文件按钮 -->
            <el-button type="danger" @click="DownLoad">下载 Excel 导入模板</el-button>

            <div class="buttonBox">

              <!-- <div> -->
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
							<!-- </div> -->






                <!-- <el-upload action  
                accept=".xlsx,.xls"  
                :auto-upload="false" 
                :show-file-list="true" 
                :on-change="handle" 
                :before-upload="beforeUploadFile"
                :on-success="handleSuccess" >
                    <el-button type="primary" slot="trigger"> 选取 Excel 文件 </el-button>
                </el-upload> -->

                

                <!-- <el-button type="success" @click="submit">采集数据提交</el-button> -->

                <!-- <router-link to="/yj"> -->
                    <!-- <el-tooltip content="返回列表页面" placement="top"><span>返回主页</span>  --><!-- </el-tooltip> -->
                    <!-- <el-button type="primary" >返回主页</el-button> -->
                <!-- </router-link> -->
            </div>

            <!-- 解析出来的数据 -->
            <div class="tableBox" v-show="show">
            <h3>
                <i class="el-icon-info">
                以下是上传过程中的问题的数据，请您检查后重新上传</i>
                
            </h3>
            <el-table :data="tempData" border style="width: 100%" >
                <!-- <el-table-column prop="id" label="NO" min-width="50px" align="center"></el-table-column> -->
                <el-table-column prop="abd_ex1" label="乡镇" min-width="150px" align="center"></el-table-column>
                <el-table-column prop="abd_ex2" label="姓名" min-width="150px" align="center"></el-table-column>
                <el-table-column prop="abd_ex3" label="身份证号码" min-width="100px" align="center"></el-table-column>
                <el-table-column prop="abd_ex5" label="残疾人证号" min-width="100px" align="center"></el-table-column>
                <el-table-column prop="abd_ex6" label="补贴类型" min-width="100px" align="center"></el-table-column>
                <el-table-column prop="abd_ex7" label="补贴对象类型" min-width="180px" align="center"></el-table-column>
                <el-table-column prop="abd_ex8" label="补贴金额" min-width="120px" align="center"></el-table-column>
                <el-table-column prop="abd_ex9" label="享受补贴起始月份" min-width="140px" align="center"></el-table-column>
                <el-table-column prop="abd_ex10" label="续发月份" min-width="100px" align="center"></el-table-column>
                <!-- <el-table-column prop="abd_ex11" label="历史上报数据" min-width="100px" align="center"></el-table-column> -->
                <el-table-column prop="abd_ex12" label="性别" min-width="100px" align="center"></el-table-column>
                <el-table-column prop="abd_ex13" label="出生年月" min-width="100px" align="center"></el-table-column>
                <el-table-column prop="abd_ex14" label="残疾等级" min-width="100px" align="center"></el-table-column>
                <el-table-column prop="abd_ex15" label="残疾类别" min-width="100px" align="center"></el-table-column>
                <el-table-column prop="abd_ex16" label="民族" min-width="100px" align="center"></el-table-column>
                <el-table-column prop="abd_ex17" label="户口性质" min-width="100px" align="center"></el-table-column>
                <el-table-column prop="abd_ex18" label="户籍地址" min-width="100px" align="center"></el-table-column>
                <el-table-column prop="abd_ex19" label="家庭住址" min-width="100px" align="center"></el-table-column>
                <el-table-column prop="abd_ex20" label="手机号码" min-width="100px" align="center"></el-table-column>
                <el-table-column prop="abd_ex21" label="联系人" min-width="100px" align="center"></el-table-column>
                <el-table-column prop="abd_ex22" label="联系电话" min-width="100px" align="center"></el-table-column>
                <el-table-column prop="abd_ex23" label="开户银行" min-width="100px" align="center"></el-table-column>
                <el-table-column prop="abd_ex24" label="银行卡号" min-width="100px" align="center"></el-table-column>
                <el-table-column prop="abd_ex25" label="低保类别" min-width="100px" align="center"></el-table-column>
                <el-table-column prop="abd_ex26" label="是否死亡" min-width="100px" align="center"></el-table-column>
                
                <el-table-column prop="abd_ex28" label="地区" min-width="100px" ></el-table-column>
                
            </el-table>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[5, 10, 20, 40]" 
                    :page-size="pagesize"         
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="tempData.length">    //这是显示总共有多少数据，
            </el-pagination>
            </div>
        </div>
    
    </el-dialog>
</template>

<script>
import xlsx from 'xlsx'
import { Loading } from 'element-ui'
import { readFile, character, delay } from '../assets/js/utils'
import requestConst from '@/utils/request-const'
import request from '@/utils/request'
export default {
  name: 'Upload',
  props: ["data","isShow"],
  data() {
    return {
      height: document.documentElement.clientHeight - 200,
      tempData: [],
      show: false,
      currentPage:1, //初始页
      pagesize:20,    //    每页的数据
      dialogVisible: this.isShow,



      headers: {}, //请求头
				limitNum: 10, // 上传excell时，同时允许上传的最大数
				fileList: [], // excel文件列表
				// filename:this.$route.query.filename
				datas:{
					// 传给后端参数判断是哪个页面的
					'filename':unescape(this.$route.query.filename)
				},

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
		},
  methods: {

    // 文件上传成功时的钩子
    handleSuccess(res, file, fileList) {
        console.log(res)
        console.log(file);
        // this.$message.success('文件上传成功');
        if(res[0].status=='+error'){
            this.$message.error(res[0].msg);
        }else{
            this.$message.success(res[0].msg);
        }
    },

    // 下载模板
    DownLoad(){



        this.disabledImportTemplate()
        .then()
        .catch((res)=>{
            console.log(res);

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
    // 下载模板接口
    disabledImportTemplate() {
        return request({
            headers: {
                'Accept': 'application/json',
            },
            url: '/social/assistance/disabledImportTemplate',
            method: 'post',
            // data: data
        })
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

    // 导入接口
    disabledImport(data) {

        let form = new FormData();
        form.append('file',data)

        console.log(data,'参数');
        console.log(form,'参数');

        return request({
            // headers: {
            //     'Accept': 'application/json',
            // },
            url: '/social/assistance/disabledImport',
            method: 'post',
            data: form
        })
    },

     handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },

    // 采集 EXCEL 数据   async用于申明一个function是异步的
    async handle(e) {


      let file = e.raw




      if (!file) return

      this.show = false
      let loading = Loading.service({
        text: '小主，请您稍等片刻，女家正在玩命处理中...',
        background: 'rgba(0,0,0,.5)'
      })

      await delay(300)

      // 读取FILE中的数据   await 用于等待一个异步方法执行完成
      let data = await readFile(file)
      let SheetNames=[]
      // console.log('二进制data',data);
      let workbook = xlsx.read(data, { type: 'binary' }),//workbook==解析二进制后的data
      worksheet = workbook.Sheets[workbook.SheetNames[1]],//worksheet==确定sheets表后的data
      list = xlsx.utils.sheet_to_json(worksheet)          //xlsx.utils.sheet_to_json()==给Excel表中空的单元格赋值为空字符串

      console.log('解析二进制后的data',workbook);
      console.log('确定sheets表后的data----worksheet',worksheet);
      console.log('给Excel表中空的单元格赋值为空字符串后的data----list',list)


      for(let i=0;i<workbook.SheetNames.length;i++){
        SheetNames[i]=workbook.SheetNames[i]
      }
      console.log('Excel表名的集合---SheetNames',SheetNames);
      console.log(workbook.Strings,'Excel表名的集合---Strings');
      
      
      
       
        

      // 把读取出来的数据变为可以提交为服务器的数据格式
      let arr = []
      let oldData = JSON.parse(window.localStorage.getItem('excel') || '[]')
      let index = oldData.length;
      console.log(character);

      list.forEach(item => {
        let obj = {}
        for (let key in character) {
          if (!character.hasOwnProperty(key)) break
          let v = character[key],
            text = v.text,
            type = v.type
          v = item[text] || ''
          type === 'string' ? (v = String(v)) : null
          type === 'number' ? (v = Number(v)) : null
          obj[key] = v
        }
        obj.id = ++index
        obj.time = new Date()
        arr.push(obj)
      })

      console.log(arr);
      await delay(300)

      // 展示到页面中
      this.show = true
      console.log(arr,'arr')
      this.tempData = arr


    
        this.disabledImport({
            file:workbook.Strings
        }).then(res=>{

        })
        .catch(res=>{
            console.log(res);
        })


      loading.close()
    },

     // 初始页currentPage、初始每页数据数pagesize和数据data
        handleSizeChange: function (size) {
                this.pagesize = size;
                console.log(this.pagesize)  //每页下拉显示数据
                // this.loadData()
        },
        handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                console.log(this.currentPage)  //点击第几页
                // this.loadData()
        },
       handleUserList() {
            this.$http.get('http://localhost:9633/#/Page1').then(res => {  //这是从本地请求的数据接口，
                this.tempData = res.body
               
            }) 
            console.log(this.tempData,'--------res');
        },


    // 提交数据给服务器
    submit() {
      if (this.tempData.length <= 0) {
        return this.$message({
          message: '小主，请您先选择 EXCEL 文件！',
          type: 'warning',
          showClose: true
        })
      }
      let oldData = JSON.parse(window.localStorage.getItem('excel') || '[]'),
      newData = [...oldData, ...this.tempData]
      window.localStorage.setItem('excel', JSON.stringify(newData))
      // this.loadData()
    },


    // loadData() {
		// 		// this.getNum()
		// 		this.loading = true
		// 		this.getSearchData({
		// 			sKey: "" + this.sKey,
		// 			listname: this.listname,
		// 			params: JSON.stringify(this.searchData),
		// 			limit: "" + this.limit,
		// 			page: "" + this.page
		// 		}).then(res => {
					
		// 			this.tableData = [];
		// 			this.count = 1;

		// 			if (res.data) {
		// 				this.tableData = res.data
		// 				this.count = res.count;
		// 			}
		// 			for (let i = 0; i < this.tableData.length; i++) {
		// 				if (this.tableData[i]['btn']) {
		// 					let btn = this.tableData[i].btn;
		// 					for (let j = 0; j < btn.length; j++) {
		// 						let type = this.tableData[i].btn[j].type;
		// 						if (type == "openWin") {
		// 							this.tableData[i].btn[j].btnType = "primary"
		// 						} else
		// 							this.tableData[i].btn[j].btnType = "danger"
		// 					}

		// 				}
		// 			}
		// 			this.loading = false;
		// 		}).catch(res => {
		// 			// if(res.request.readyState != 4 || res.request.status != 200){
		// 			// 	console.log('5555====275')
		// 			// }
		// 			console.log(res.response.data.data)
		// 			this.tableData = [];
		// 			this.count = 1;
		// 			console.log(res,"-----res==280");
		// 			if (res.response.data.data) {
		// 				this.tableData = res.response.data.data
		// 				this.count = res.response.data.count;
		// 				console.log(this.tableData,"-----this.tableData");
		// 			}
		// 			// for (let i = 0; i < this.tableData.length; i++) {
		// 			// 	if (this.tableData[i]['btn']) {
		// 			// 		let btn = this.tableData[i].btn;
		// 			// 		for (let j = 0; j < btn.length; j++) {
		// 			// 			let type = this.tableData[i].btn[j].type;
		// 			// 			if (type == "openWin") {
		// 			// 				this.tableData[i].btn[j].btnType = "primary"
		// 			// 			} else
		// 			// 				this.tableData[i].btn[j].btnType = "danger"
		// 			// 		}
		// 			// 	}
		// 			// }
		// 			this.loading = false;
		// 		})
		// 	},


      // getSearchData(data) {
			// 	return request({
			// 		headers: {
			// 			'Accept': 'application/json',
			// 		},
			// 		url: '/social/weida/getCommonListJson',
			// 		method: 'post',
			// 		data: data
			// 	})
			// },
  },

  

 
}
</script>


<style lang="less" scoped>
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
.homeBox {
  // position: fixed;
  // top: 10px;
  // right: 20px;
  z-index: 9999;
  font-size: 16px;
}

.buttonBox {
  padding: 15px;
  display: flex;
  width: 35%;
  justify-content: flex-start;
  & .el-button {
    margin-right: 20px !important;
  }
}

.tableBox {
  padding: 0 15px;
  h3 {
    font-size: 18px;
    color: #f56c6c;
    padding-bottom: 15px;
  }
  .el-table{
    // height: 390px;
  }
}
</style>

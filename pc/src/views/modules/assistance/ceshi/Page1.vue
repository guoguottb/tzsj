<template>
  <div  class="g-box">
    <!-- 返回主页 -->
    <!-- <div class="g-box2">
      
    </div> -->

    <!-- 上传文件按钮 -->
    <div class="buttonBox">
      <el-upload
        action
        accept=".xlsx,.xls"
        :auto-upload="false"
        :show-file-list="false"
        :on-change="handle">
      
        <el-button type="primary" slot="trigger">选取 Excel 文件</el-button>
      </el-upload>

      <el-button type="success" @click="submit">采集数据提交</el-button>
      <router-link to="/yj">
        <!-- <el-tooltip content="返回列表页面" placement="top"><span>返回主页</span>  --><!-- </el-tooltip> -->
          <el-button type="primary" >返回主页</el-button>
      </router-link>
    </div>

    <!-- 解析出来的数据 -->
    <div class="tableBox" v-show="show">
      <h3>
        <i class="el-icon-info">
          以下是采集完成的数据，请您检查无误后，点击“采集数据提交”按钮上传至服务器</i
        >
      </h3>
      <el-table :data="tempData" border style="width: 100%" max-height="690px" >
        <el-table-column prop="id" label="NO" min-width="50px" align="center"></el-table-column>
        <el-table-column prop="ab_ex2" label="行政区划" min-width="150px" align="center"></el-table-column>
        <el-table-column prop="ab_ex9" label="区县(市)" min-width="150px" align="center"></el-table-column>
        <el-table-column prop="ab_ex3" label="申请人姓名" min-width="100px" align="center"></el-table-column>
        <el-table-column prop="ab_ex7" label="身份证号码" min-width="180px" align="center"></el-table-column>
        <el-table-column prop="ab_ex5" label="家庭人口" min-width="100px" align="center"></el-table-column>
        <el-table-column prop="ab_ex6" label="户口性质" min-width="100px" align="center"></el-table-column>
        <el-table-column prop="" label="已享受救助" min-width="100px" align="center"></el-table-column>
        <el-table-column prop="hdzt" label="核对状态" min-width="100px" align="center"></el-table-column>
        <!-- <el-table-column prop="ab_dat14" label="申请时间" min-width="100px" ></el-table-column> -->
        <!-- <el-table-column prop="time" label="申请时间" min-width="100px" ></el-table-column> -->
        <el-table-column prop="ab_ex28" label="电话" min-width="50%" ></el-table-column>
         
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
</template>

<script>
import xlsx from 'xlsx'
import { Loading } from 'element-ui'
import { readFile, character, delay } from '../assets/js/utils'
export default {
  name: 'Upload',
  data() {
    return {
      height: document.documentElement.clientHeight - 200,
      tempData: [],
      show: false,
      currentPage:1, //初始页
      pagesize:20,    //    每页的数据
      // userList: []

    }
  },
  methods: {
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
      
      
      
       
        

      // 把读取出来的数据变为可以提交为服务器的数据格式
      let arr = []
      let oldData = JSON.parse(window.localStorage.getItem('excel') || '[]')
      let index = oldData.length
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
      // console.log(arr)
      this.tempData = arr
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
    height: 590px;
  }
}
</style>

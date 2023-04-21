<template>
    <div class="g-box" v-loading="loading" element-loading-text="拼命加载中"> 
        <!-- 信息公开 -->
         <div class="block">
            <span class="demonstration">请进行月份确认   </span>
            <el-date-picker
              v-model="value"
              type="month"
              placeholder="选择查询月份">
            </el-date-picker>
          </div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="最低生活保障" name="低保">
                     <table class="listTab" cellspacing="0" cellpadding="0">
                                   <thead>
                                       <tr>
                                           <th v-for="(item,val) in tableHead">{{item.title}}</th>
                                       </tr>
                                   </thead>
                                   <tbody>
                                       <tr v-for="(item,key,index) in formData" :key="item.openId">
                                           <td v-for="(val,index) in tableHead" :key="index">
                                               <div >{{item[val.key]}}</div>
                                           </td>
                                       </tr>
                                   </tbody>
                               </table> 
            </el-tab-pane>
            <el-tab-pane label="特困供养" name="特困供养">
				<table class="listTab" cellspacing="0" cellpadding="0">
				              <thead>
				                  <tr>
				                      <th v-for="(item,val) in tableHead">{{item.title}}</th>
				                  </tr>
				              </thead>
				              <tbody>
				                  <tr v-for="(item,key,index) in formData" :key="item.openId">
				                      <td v-for="(val,index) in tableHead" :key="index">
				                          <div >{{item[val.key]}}</div>
				                      </td>
				                  </tr>
				              </tbody>
				          </table> 
				
			</el-tab-pane>
            <el-tab-pane label="支出困难" name="支出贫困">
				<table class="listTab" cellspacing="0" cellpadding="0">
				              <thead>
				                  <tr>
				                      <th v-for="(item,val) in tableHead">{{item.title}}</th>
				                  </tr>
				              </thead>
				              <tbody>
				                  <tr v-for="(item,key,index) in formData" :key="item.openId">
				                      <td v-for="(val,index) in tableHead" :key="index">
				                          <div >{{item[val.key]}}</div>
				                      </td>
				                  </tr>
				              </tbody>
				          </table> 
			</el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import request from '@/utils/request'
export default {
    data() {
        return {
            activeName: 'second',
			tableHead:[
			                {key:"city",title:'所属区县'},
							{key:"applicationNum",title:'当月申请救助人数'},
			                {key:"application",title:'申请'},
			                {key:"infoConfirm",title:'委托确认'},
			                {key:"checking",title:'核对中'},
			                {key:"firstTrial",title:'初审'},
							{key:"formulaStarts",title:'公示开始'},
							{key:"approval",title:'审批'},
							{key:"finish",title:'办结'},
			            ], 
			formData:[],
			value:'',
			loading:false,
        };
    },
    methods: {
        handleClick(tab, event) {
            //console.log(tab, event);
			
			this.formData=[]
			//alert(this.value)
			if(this.value == null || this.value === '' ){
				this.$message({
						showClose: true,
						message: '请选择想要查询的月份',
						type: 'error'
					  });
			}else{
				this.loading=true;
				var y = this.value.getFullYear()
				var m = (this.value.getMonth() + 1 < 10 ? '0' + (this.value.getMonth() + 1) : this.value.getMonth() + 1)
					this.getData({
						'typeOfRescue':tab.name,
						'applicationMonth':m,
						'year':y
					}).then(res => {
					}).catch(res => {
						this.formData=res.response.data.data.data
						this.loading=false
						//console.log("---------------2"+this.formData)
					})
			}
			//alert(tab.name+"   "+y+"   "+m)   
		},
        
        onSubmit() {
            console.log('submit!');
        },
		
		getData(data) {
			return request({
				headers: {
					'Accept': 'application/json',
				},
				url: '/social/supervisionControl/selectInformationDisclosure',
				method: 'post',
				data:data
			})
		},
		
       
    },
	created(){
	       this.$confirm('本统计表中--本月申请救助人数 包含本月申请所有救助人数(困境儿童除外)', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	          this.$message({
	            type: 'success',
	            message: '已确认您已知晓'
	          });
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '请确认'
	          });          
	        });
			
	},
	
  };
</script>

<style> 
.g-box{
  width: 98%;
  margin-left: 1%;
  overflow-x:auto;
}
table.listTab{
    width: 100%;
    font-size: 14px;
    color: #6a6a6a;
    border: 1px solid #ececed;
    padding: 1px;
    background-color: #fff;
}
table.listTab th{
    background-color: #ecf0f4;
    padding: 14px 8px;
    text-align: left;
    font-size: 14px;
    border: 1px solid #ecf0f4;
    min-width: 40px;
    color:#292d31;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
table.listTab th.check{
    min-width: 20px;
}
table.listTab tbody > tr td{
    padding: 16px 8px;
    text-align: left;
    font-size: 14px;
    border-bottom: 1px solid #ececed;
    vertical-align: middle;
    word-break: break-all;
    min-width: 50px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
table.listTab tbody > tr td.check{
min-width: 20px;
}
table.listTab tbody > tr td:first-child{
    width: 20px;
}
table.listTab tbody > tr:hover{
    background-color: #dfeefc;
}
table.listTab tbody > tr.check{
    background-color: #dfeefc;
}
table.listTab tbody > tr:last-child td{
    border-bottom: 0px;
}
table.listTab tbody > tr td a{
    color: #248bfc;
}
table.listTab tbody > tr td input{
border:1px solid #248bfc;
}
table.listTab tbody > tr td .green{
color: #72d34b;
font-weight:bold;
}
table.listTab tbody > tr td .red{
color: #f00;
font-weight:bold;
}

</style>
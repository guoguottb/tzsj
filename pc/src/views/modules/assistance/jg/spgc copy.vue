<template>
    <div class="g-box"  v-loading="loading" element-loading-text="拼命加载中"> 
        <!-- 审批监管 -->
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="最低生活保障" name="低保">
				<table class="listTab" cellspacing="0" cellpadding="0">
				              <thead>
				                  <tr>
				                      <th v-for="(item,val) in tableHead" :key="item">{{item.title}}</th>
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
				                      <th v-for="(item,val) in tableHead" :key="item">{{item.title}}</th>
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
				                      <th v-for="(item,val) in tableHead" :key="item">{{item.title}}</th>
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
							{key:"infoConfirm",title:'超时数据申请时间'},
			                {key:"application",title:'今日办理时间超时人数'},
			            ], 
			formData:[],
			 loading: false,
        };
    },
    methods: {
        handleClick(tab, event) {
			this.loading=true;
            //console.log(tab, event);
			this.getData({
				'typeOfRescue':tab.name,
			}).then(res => {
			}).catch(res => {
				this.formData=res.response.data.data.data
				this.loading=false;
				//console.log("---------------2"+this.formData)
			})
        },
        
        onSubmit() {
            console.log('submit!');
        },
		getData(data) {
			return request({
				headers: {
					'Accept': 'application/json',
				},
				url: '/social/supervisionControl/selectApprovalProcess',
				method: 'post',
				data:data
			})
		},
       
    }
  };
</script>

<style>

</style>

<template>
  	<div class="g-box"> 
		<!-- 批注记录 -->
		  <h3
		      class="line_blue">&emsp;批注记录</h3>
		  <div 
		       class="lineSt"></div>
		  <table
		         style="width:100%;table-layout:fixed"
		         id="recordt">
		    <colgroup>
		      <col style="width:15%">
		      <col style="width:20%">
		      <col style="width:15%">
		      <col style="width:15%">
		      <col style="width:15%">
		      <col style="width:20%">
		    </colgroup>
		
		    <tbody v-for="(itemR,index) in record"
		           :key="index">
		      <tr>
		        <td style="color:#899197;height:30px">批注用户：</td>
		        <td>{{itemR.user}}</td>
		        <td style="color:#899197">批注时间：</td>
		        <td>{{itemR.time}}</td>
		      </tr>
		      <tr>
		        <td style="color:#899197;height:30px">批注内容：</td>
		        <td>{{itemR.content}}</td>
		      </tr>		 
		      <tr>
		        <td colspan="5"
		            style="height:20px">&nbsp;
				</td>
		      </tr>
		    </tbody>
		  </table>
		  <div>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="批注内容" prop="content">
					<el-input type="textarea" v-model="ruleForm.content"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')">发送</el-button>					
					<el-button @click="resetForm('ruleForm')">清除</el-button>
					<el-button @click="closeView ()">返回</el-button>
				</el-form-item>
			</el-form>
		  </div>
	</div>
</template>
<script>
// import commonList from "../commonList";
import request from "@/utils/request";
import { Loading } from "element-ui";
export default {
    name:'pzjl',
    data() {
        return {
			record:[],
			ruleForm: {
				content:'',
			},
			rules: {
				content:[
					{ required: true, message: '请输入回复的批注内容', trigger: 'blur' },
				]
			}	
	};
},
	watch:{
	
	},
    components: {
       
    },
    created(){
		this.loadData();
    },
    methods:{
		submitForm(formName) {
		    this.$refs[formName].validate((valid) => {
		        if (valid) {
		            this.addConversationRecord({
						id:this.$route.query.sId,
						text:this.ruleForm.content
					}).then(res =>{
						
					}).catch(res =>{
						this.$message.success(res.response.data.msg)
						//alert(JSON.stringify(res.response.data))
						if(res.response.data.status=="+OK"){
							this.loadData();
						}
					})
		        } else {
					this.$message.error("提交失败")
		            return false;
		        }
		    });
		},
		resetForm(formName) {
		    this.$refs[formName].resetFields();
		},
		loadData(){
			this.getConversationRecord({
				id:this.$route.query.sId
			}).then(res => {
				
			}).catch(res =>{
				this.record=res.response.data.data
			})
		},
		//返回上一层
		closeView () {
		  this.$emit("closes", false);
		  this.$router.go(-1);
		  if (process.env.NODE_ENV != "development") {
		    this.$router.go(-1);
		  }
		},
		//获取批注记录
		getConversationRecord (data) {
		  return request({
		    headers: {
		      Accept: "application/json",
		    },
		    url: "/social/supervisionPlatform/getConversationRecord",
		    method: "post",
		    data: data,
		  });
		},
		//保存批注记录
		addConversationRecord (data) {
		  return request({
			headers: {
			  Accept: "application/json",
			},
			url: "/social/supervisionPlatform/addConversationRecord",
			method: "post",
			data: data,
		  });
		},
  }
};
</script>
<style scoped>
.g-box {
  display: flex;
  /* width: 100%; */
  height: 80vh;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
}
</style>
<template>
	<div>
		<header >
			<div >
                <i class="el-icon-arrow-left" @click="goBack" style="float:left;margin:10px;z-index:1000 "></i>
                我要救助认领
            </div>	
		</header>
		<div class="body" >
            <el-form :model="claimData" :rules="rules" :inline-message="true" :show-message="false" ref="claimData" label-width="100px" class="demo-ruleForm">
                <el-form-item label="认领类型" prop="abc_ex11">
                    <el-select v-model="claimData.abc_ex11"   placeholder="请选择" style="width:200px;border:0">
                        <el-option label="请选择" value=""></el-option>
                        <el-option label="个人" value="个人"></el-option>
                        <el-option label="团体" value="团体"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="认领名称" prop="abc_ex12">
                    <el-input  v-model="claimData.abc_ex12" placeholder="请输入认领名称"></el-input>
                </el-form-item>
                <el-form-item label="证件号码" prop="abc_ex13">
                    <el-input  v-model="claimData.abc_ex13" placeholder="请输入证件号码"></el-input>
                </el-form-item>
                <el-form-item label="认领住址" prop="abc_ex14">
                    <el-input  v-model="claimData.abc_ex14" placeholder="请输入认领住址"></el-input>
                </el-form-item>
                <el-form-item label="认领说明" prop="abc_ex15">
                    <el-input class="claimSay" type="textarea" v-model="claimData.abc_ex15" placeholder="请输入认领说明"></el-input>
                   
                </el-form-item>
                <el-form-item label="联系电话" prop="abc_ex16" >
                    <el-input  v-model="claimData.abc_ex16" class="phoneNum" placeholder="请输入联系电话"></el-input>
                    <el-button :disabled="hqyzmDis" @click='hqyzm'>{{hqyzmtext}}</el-button>
                </el-form-item>
                <el-form-item label="验证码" prop="yanzm">
                    <el-input v-model="claimData.yanzm" placeholder="请输入验证码" onkeyup="value=value.replace(/[^\d]/g,'')"></el-input>
                </el-form-item>
               
            </el-form>
        </div>
        <footer>
            <el-button style="width:90%;position: fixed;bottom: 10px;left: 5%;right: 5%;font-size:16px" size="small" round type="primary" @click="submit('/projectReleased')">确定</el-button>
        </footer>
	
	</div>
</template>

<script>
    import request from '@/utils/request.js'
    import {isCardID,getPresentTime} from '@/utils/utils'
	export default{
		data(){
			return{
                // 获取验证码按钮禁用状态
				hqyzmDis:false,
				hqyzmtext:'获取验证码',
				yzm:'',    //正确验证码
				m:60,
				claimData:{
                    yanzm:"",
                    abc_id:"",
                    abc_ex10:"",
                    abc_ex11:"",
                    abc_ex12:"",
                    abc_ex13:"",
                    abc_ex14:"",
                    abc_ex15:"",
                    abc_ex16:"",
                },
                rules: {
					abc_ex11: [{
						required: true,
						message: '认领类型不能为空',
						trigger: 'blur'
					}],
					abc_ex12: [{
						required: true,
						message: '认领名称不能为空',
						trigger: 'blur'
					}],
					abc_ex13: [{
						required: true,
						message: '证件号码不能为空',
						trigger: 'blur'
					}],
					abc_ex14: [{
						required: true,
						message: '认领住址不能为空',
						trigger: 'blur'
					}],
					abc_ex15: [{
						required: true,
						message: '认领说明不能为空',
						trigger: 'blur'
					}],
					abc_ex16: [{
						required: true,
						message: '联系电话不能为空',
						trigger: 'blur'
					}],
					// yanzm: [{
					// 	required: true,
					// 	message: '验证码不能为空',
					// 	trigger: 'blur'
					// }],
                }
			}
		},
        // created() {
		// 	this.loadData();
		// },
		methods:{
            // 返回
            goBack() {
                setTimeout(()=>{
					this.$router.back(-1)
				},200)
            },

            // 获取验证码
            hqyzm(){
				
                // 基础信息填写验证
				this.$refs['claimData'].validate((valid) => {
					if (valid) {
						
					}
					else {
						return false;
					}
				});

				let msgs=this.validate();
				if(msgs){
					this.$message.warning(msgs);
					return false
				}
                // 证件格式验证
                if(this.claimData.abc_ex13){
                    
					let msg=isCardID(this.claimData.abc_ex13);
					if(msg){
						this.$message.warning(msg);
						return false
					}
				}
                // 手机格式验证
                var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
				if (!myreg.test(this.claimData.abc_ex16)) {
					this.$message.warning('请填写正确的联系电话')
					return false
				}
				// 获取验证码
				console.log('-----------------')
				request({
					method:'get',
					url: '/social/assistanceWeixin/backTelCheck',
					params:{
						tel:this.claimData.abc_ex16
					},
				}).then(res=>{
					if(res[0].status == '+OK'){
						this.$message.success(res[0].msg)
						this.yzm = res[0].Vcode
					}else{
						this.$message.warning(res[0].msg)
					}
				}).catch(error=>{
					this.$message.warning("验证码发送失败")
					console.log(error)
				})
				
				console.log('-----------------')
				// 倒计时
				this.hqyzmtext = this.m+'s'
				this.hqyzmDis = true
				let time = setInterval(()=>{
				this.m--
				this.hqyzmtext = this.m+'s'
				if(this.m==0){
					this.hqyzmtext = '获取验证码'
					this.m = 60
					this.hqyzmDis = false
					
					clearInterval(time)
				}
				},1000)
			},

			submit(url){

                // 基础信息填写验证
				this.$refs['claimData'].validate((valid) => {
					if (valid) {
						
					}
					else {
						return false;
					}
				});

				let msgs=this.validate();
				if(msgs){
					this.$message.warning(msgs);
					return false
				}

                

                // 手机格式验证
                var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
				if (!myreg.test(this.claimData.abc_ex16)) {
					this.$message.warning('请填写正确的联系电话')
					return false
				}

                if(this.claimData.abc_ex13){

					let msg=isCardID(this.claimData.abc_ex13);
					if(msg){
						this.$message.warning(msg);
						return false
					}
				}

                // 验证码验证
				if (this.claimData.yanzm=="") {
					this.$message.warning('验证码不能为空')
					return false
				}
                if(this.claimData.yanzm!=this.yzm){
                    this.$message.warning('验证码错误')
					return false
                }
                this.claimData.abc_id=this.$route.query.id;
                console.log(this.$route.query.id);
                console.log(JSON.stringify(this.claimData));
                // return 
				// this.$message.success("认领成功")
                this.$notify({
                    // title: '成功',
                    message: '认领成功',
                    type: 'success'
                });

				//保存到后端 
                this.saveClaim({}).then(res => {
                        console.log(this);
                        console.log(res,"res");
                    }).catch(res => {
                        console.log("catch",res)
                    })

                setTimeout(()=>{
                    // 跳转到我来助列表页
                    this.$router.push({
                        path:url,
                    })
				},1000)
			},


            // 验证提示
            validate(){
				try{
						let msg="";
						for(let key in this.rules){
							try{
							
								let r_=this.rules[key];
								let val=this.claimData[key];
								
								if(val==""){
									msg=r_[0].message;
									break;
								}else{
									
								}
							}catch(e){
								
							}
							
						}
						return msg;
				}catch(e){
					return "";
				}
			},

			// 认领接口
			saveClaim(data) {
				console.log(data,"data");
                
				return request({
                    method: 'post',
                    url : "/social/assistanceWeixin/saveBasicCharityRL",//路径
                    data :{
                        data:'['+JSON.stringify(this.claimData)+']',
                        // sId:this.$route.query.id
                    } 
                 })
			},
		}
	}
</script>

<style scoped>
	header{
        
		width: 100%;
		height: 80px;
		line-height: 80px;
		background-color: rgb(60, 159, 240);
		color: #fff;
		font-size: 40px;
		font-weight: 600;
        z-index: 100;
        position: fixed;
        top: 0px;
        left: 0%;
        right: 0;
	}
    .body{
        margin: 80px 0 110px  0 ;
        width: 100%;
    }
    .body .el-input{
        width: auto;
    }
    .body>>>.el-form-item__content{
        text-align: left;
    }
    .body>>>input{
        border:0px;
    }
    .body>>>.el-form-item__label{
        text-align: center;
       font-size: 1.3em;
    }
    .body>>>.el-input__suffix{
        right: 80px;
    }
    .body>>>.el-select-dropdown__list{
       padding: 7px 0 22px 0;
    }
    .body>>>.el-form-item{
        padding: 16px 0;
        width: 98vw;
        margin: 0px auto;
        border-bottom:1px solid #ccc;
    }
    .claimSay{
        display: block;
        width: 100%;
    }
    .claimSay>>>textarea{
        width: 95%;
        height: 400px;
        background-color: #eee;
        outline: 0;
        resize: none;
        border: 0;
        border-radius: 10px;
    }
    .phoneNum{
         width: 300px !important;
    }
    
</style>

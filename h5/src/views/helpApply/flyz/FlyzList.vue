<template>
	<div class="helpApply">
		<header>
			<div>
				<div class="headerdiv1">泰兴市</div>
				<img src="@/assets/img/bg/lujing1.png" class="headerimg1">
				<div class="headerdiv2">大救助一体化平台</div>
				<img src="@/assets/img/bg/lujing1.png" class="headerimg1">
			</div>
		</header>
		<div class="helpApply2">
			<van-button type="info" class="helpApply2button1" to="flyzApply">法律援助</van-button>
			<van-button @click = "isShow=!isShow">退回申请材料补全</van-button>
			<div class="helpApply2div1">
				<div v-if="isShow">
					<van-cell-group>
						<van-field v-model="ab_ex3" label="姓名" placeholder="请输入姓名" />
						<van-field v-model="ab_ex7" label="身份证" placeholder="请输入身份证" />
						<van-button @click = "search" type="info" plain>搜索</van-button>
					</van-cell-group>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import request from '@/utils/request.js'
	export default{
		data(){
			return{
				isShow:false,
				ab_ex3:'',
				ab_ex7:''
			}
		},
		methods:{
			search(){
				let msg = this.isCardID(this.ab_ex7)
				if(msg){
					this.$toast.fail(msg)
					return false
				}
				if(!this.ab_ex3){
					this.$toast.fail('请输入姓名')
					return false
				}
				request({
					method: 'post',
					url: '/social/assistanceWeixin/FLListByPage?stype=法律援助',
					data:{
						page: 1,
						// sqlwhere: " and ab_ex3 =\'"+this.ab_ex3+"\' and ab_ex7 = \'"+this.ab_ex7+"\'"
						ab_ex3:this.ab_ex3,
						ab_ex7:this.ab_ex7
					},
					// headers: {
					// 	'token': sessionStorage.getItem('token')
					// }
				}).then(res=>{
					console.log(res)
					if(res.length ==0){
						this.$dialog.alert({
							message:'无此人信息'
						})
					}else{
						this.$router.push({
							path:'/flyzHc',
							query:{
								ab_ex3:this.ab_ex3,
								ab_ex7:this.ab_ex7,
								stype:'法律援助'
							}
						})
					}
				}).catch(err=>{
					this.$toast.fail('查询失败')
				})
			},
			isCardID(sId) {
				var aCity = {
					11: "北京",
					12: "天津",
					13: "河北",
					14: "山西",
					15: "内蒙古",
					21: "辽宁",
					22: "吉林",
					23: "黑龙江",
					31: "上海",
					32: "江苏",
					33: "浙江",
					34: "安徽",
					35: "福建",
					36: "江西",
					37: "山东",
					41: "河南",
					42: "湖北",
					43: "湖南",
					44: "广东",
					45: "广西",
					46: "海南",
					50: "重庆",
					51: "四川",
					52: "贵州",
					53: "云南",
					54: "西藏",
					61: "陕西",
					62: "甘肃",
					63: "青海",
					64: "宁夏",
					65: "新疆",
					71: "台湾",
					81: "香港",
					82: "澳门",
					91: "国外"
				};
				var iSum = 0;
				var info = "";
				if (!/^\d{17}(\d|x)$/i.test(sId)) return "身份证长度或格式错误";
				sId = sId.replace(/x$/i, "a");
				if (aCity[parseInt(sId.substr(0, 2))] == null) return "身份证地区非法";
				let sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2));
				var d = new Date(sBirthday.replace(/-/g, "/"));
				if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) return "身份证上的出生日期非法";
				for (var i = 17; i >= 0; i--) iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
				if (iSum % 11 != 1) return "身份证号非法";
				//aCity[parseInt(sId.substr(0,2))]+","+sBirthday+","+(sId.substr(16,1)%2?"男":"女");//此次还可以判断出输入的身份证号的人性别
				return "";
			},
		}
	}
</script>

<style scoped>
	.helpApply {
		/* background-size: 100% 100%; */
		/* background: url(../assets/img/bg/bg1.png) right bottom no-repeat / 650px,
			url(../assets/img/bg/bg2.png) 0px 0px no-repeat rgba(22, 121, 190, 1) / 500px 580px; */
		background: url('../../../assets/img/bg/bg1.png') 0 0 no-repeat,url('../../../assets/img/bg/bg2.png') 0 600px no-repeat;
		background-size: 100% 500px,100% 100%;
		width: 100%;
		height: 100%;
		position: fixed;
		overflow: auto;
	}
	header{
		/* width: 700px;
		text-align: left;
		margin-left: 40px;
		margin-top: 40px; */
		display: flex;
		justify-content: center;
	}
	header > div{
		width: 700px;
		text-align: left;
		margin-top: 40px;
	}
	.helpApply2{
		height: 70%;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.headerdiv1{
		font-size: 50px;
		color: #00d1ca;
	}
	.headerimg1{
		width: 100%;
		height: 2px;
	}
	.headerdiv2{
		font-size: 25px;
		font-weight: 600;
		color: #ffffff;
	}
	.helpApply2button1{
		margin-bottom: 20px;
	}
	.helpApply2div1{
		height: 150px;
	}
</style>

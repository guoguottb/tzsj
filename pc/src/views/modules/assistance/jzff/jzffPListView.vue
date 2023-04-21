<template>
	<div class="g-box">
	<div class="g-box2">
		<div class="info2">
			<el-form :model="family"  :inline-message="true" :show-message="false" 
                ref="supportinst" label-width="auto" style='padding-right: 10px;'>
				<h3 class="line_blue" id="page1">&emsp;基本信息</h3>
				<div class="lineSt"></div>
				
                <div class="inner-content">
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="业务名称" prop="arf_ex3">
								{{family.arf_ex3}}
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="所属地区" prop="arf_ex15">
								{{family.arf_ex15}}
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="发放年月" prop="arf_dat3">
								{{family.arf_dat3}}
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="户主姓名" prop="arf_ex5">
								{{family.arf_ex5}}
							</el-form-item>
						</el-col>
					</el-row>

					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="户主身份证号" prop="arf_ex6">
								{{family.arf_ex6}}
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="开户人名称" prop="arf_ex7">
								{{family.arf_ex7}}
							</el-form-item>
						</el-col>
					</el-row>

					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="开户银行" prop="arf_ex8">
								{{family.arf_ex8}}
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="银行卡号" prop="arf_ex9">
								{{family.arf_ex9}}
							</el-form-item>
						</el-col>
					</el-row>

					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="发放金额" prop="arf_ex10">
								{{family.arf_ex10}}
							</el-form-item>
						</el-col>
					</el-row>
				</div>
                
				<h3 class="line_blue" id="page2">&emsp;资金发放家庭成员明细</h3>
				<div class="lineSt"></div>
                
				<div class="inner-content">
                    <el-table :data="members" border ref="memberTable">
                        <el-table-column prop="arfm_ex5" label="姓名" width="80"></el-table-column>
                        <el-table-column prop="arfm_ex7" label="家庭关系" width="100"></el-table-column>
                        <el-table-column prop="arfm_ex6" label="身份证号码" width="180"></el-table-column>
                        <el-table-column prop="arfm_ex10" label="发放金额" width="100"></el-table-column>
                        <el-table-column prop="abm_ex5" label="性别" width="80"></el-table-column>
                        <el-table-column prop="abm_ex16" label="民族" width="80"></el-table-column>
                        <el-table-column prop="abm_ex7" label="户口性质" width="100"></el-table-column>
                        <el-table-column prop="age" label="年龄" width="100"></el-table-column>
                        <el-table-column prop="abm_ex11" label="健康状况" width="100"></el-table-column>
                        <el-table-column prop="abm_ex52" label="重病病种" width="100"></el-table-column>
                        <el-table-column prop="abm_ex39" label="残疾种类"  width="100"></el-table-column>
                        <el-table-column  prop="abm_ex40" label="残疾等级" width="100"></el-table-column>
                        <el-table-column  prop="abm_ex49" label="劳动能力" width="100"></el-table-column>
                    </el-table>
                </div>

				<h3 class="line_blue" id="page3">&emsp;资金发放记录</h3>
				<div class="lineSt"></div>
				<div class="inner-content">
                    <el-table :data="familydist" border>
                        <el-table-column prop="ar_ex9" label="发放机构区划" width="180"></el-table-column>
                        <el-table-column prop="arf_ex3" label="业务名称" width="220"></el-table-column>
                        <el-table-column prop="arf_dat3" label="发放年月" width="180"></el-table-column>
                        <el-table-column prop="arf_ex10" label="发放金额" width="180"></el-table-column>
                        <el-table-column prop="arf_dat1" label="创建时间" width="180"></el-table-column>
                    </el-table>
                </div>
			</el-form>
		</div>
		
		<div class="ainfo2">
			<div style="margin-left:20px;text-align:center;border-bottom:1px solid #ddd;padding-bottom:10px;">
				<el-button size="small" @click="closeView">返回</el-button>
			</div>

			<div style="margin-left:20px;margin-top:20px;">
				<ul>
					<li :class="{listStyle:isShow1}" @click="isShow(1)">
						<a class="ainfoFont" :class="{listStyleA:!isShow1}" 
						@click="counter('#page1')">基本信息</a><br>
					</li>
					<li :class="{listStyle:isShow2}" @click="isShow(2)">
						<a class="ainfoFont" :class="{listStyleA:!isShow2}" 
						@click="counter('#page2')">资金发放家庭成员明细</a><br>
					</li>
					<li :class="{listStyle:isShow3}" @click="isShow(3)">
						<a class="ainfoFont" :class="{listStyleA:!isShow3}" 
						@click="counter('#page3')">资金发放记录</a><br>
					</li>
				</ul>
			</div>
		</div>
        </div>
	</div>
</template>

<script>
	import request from '@/utils/request'
	import commonList from '../commonList'

	export default {
		name: "yljgListView",
		components:{
			commonList
		},
		data() {
			return {
                family: {},
                members: [],
				familydist: [],
				isShow1: false,
				isShow2: true,
				isShow3: true,
			}
		},
		mounted() {
			window.addEventListener('scroll', this.scroll, true)
		},
		created() {
			this.loadData();
		},
		methods: {
			scroll(){
				if(document.querySelector('.info2')==null){
					return ''
				}
				let scrollTop = document.querySelector('.info2').scrollTop
				let cHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
				let oDiv1 = document.querySelector('#page1');
				let oDiv2 = document.querySelector('#page2');
				let oDiv3 = document.querySelector('#page3');
			
				// 顺序跟上面显示顺序要相反
				let clientHeight = document.querySelector('.info2').clientHeight
				if(!oDiv1 || !oDiv2 || !oDiv3){
					return ''
				}
				if(scrollTop > (oDiv3.offsetTop-oDiv1.offsetTop)){
					this.isShow(3)
				}else if(scrollTop > (oDiv2.offsetTop-oDiv1.offsetTop)){
					this.isShow(2)
				}else if(scrollTop > (oDiv1.offsetTop-oDiv1.offsetTop)){
					this.isShow(1)
				}
			},
			counter(id) { //counter1是绑定的点击事件名称
				document.querySelector(id).scrollIntoView(true);
			},
			isShow(n) {
				this.isShow1 = true
				this.isShow2 = true
				this.isShow3 = true
				if (n == 1) {
					this.isShow1 = false
				} else if (n == 2) {
					this.isShow2 = false
				} else if (n == 3) {
					this.isShow3 = false
				}
			},
			closeView() {
				this.$emit("closes", false)
				this.$router.go(-1)
			},
			loadData() {// 进入页面加载数据
				this.isFinish=false;
				this.getRelifdistFamilyInfo({
					sId: this.$route.query.sId
				}).then(res => {
					this.family = res[0].family[0];
					this.members = res[0].members;
					this.familydist = res[0].familydist;
                    this.roundAge(this.members);
					this.isFinish=true;
				}).catch(res => {
					if(typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200){
						console.log('请求失败了-----------------------')
						this.$message.error('数据获取失败或请求超时11111')
						this.$emit("closes", false)
						this.$router.go(-1)
						return false
					}
					console.log(res.response.data[0]);
					this.family = res.response.data[0].family[0];
					this.members = res.response.data[0].members;
					this.familydist = res.response.data[0].familydist;
                    this.formatData();
					this.isFinish=true;
				});
			},
			vss(d){
				var h = [];
				for(var k in d){
					h.push(k + "=" + d[k]);
				}
				return h.join("\r");
			},
			getRelifdistFamilyInfo(data) {
				return request({
					url: "/social/assistance/getRelifdistFamilyInfo",
					method: 'post',
					data: data
				})
			},
            formatData(){
                for(let i = 0; i < this.members.length; i++){
                    this.members[i].age = this.getAge(this.members[i].arfm_ex6);
                }
				this.family.arf_dat3 = this.formatDate(this.family.arf_dat3, "yyyyMM");
				for(let i = 0; i < this.familydist.length; i++){
					this.familydist[i].arf_dat1 = this.formatDate(this.familydist[i].arf_dat1, "yyyy-MM-dd");
					this.familydist[i].arf_dat3 = this.formatDate(this.familydist[i].arf_dat3, "yyyyMM");
				}
            },
            formatDate(str, fmt){
                if(!str) return "";
                let re = (new Date(str)).Format(fmt);
                if(re.startsWith("1900")){
                    re = "";
                }
                return re;
            },
			getAge(identityCard) {
				var len = !identityCard ? 0: identityCard.length;
				if (len == 0) {
					return 0;
				} 
                if ((len != 15) && (len != 18))//身份证号码只能为15位或18位其它不合法
                {
                    return 0;
                }

				var strBirthday = "";
				if (len == 18)//处理18位的身份证号码从号码中得到生日和性别代码
				{
					strBirthday = identityCard.substr(6, 4) + "/" + identityCard.substr(10, 2) + "/" + identityCard.substr(12, 2);
				}
				if (len == 15) {
					strBirthday = "19" + identityCard.substr(6, 2) + "/" + identityCard.substr(8, 2) + "/" + identityCard.substr(10, 2);
				}
				//时间字符串里，必须是“/”
				var birthDate = new Date(strBirthday);
				var nowDateTime = new Date();
				var age = nowDateTime.getFullYear() - birthDate.getFullYear();
				//再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
				if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() == birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())) {
					age--;
				}
				return age;
			}
		}
	}
</script>
<style scoped>
	.g-box {
		height: 80VH !important;
	}
	.g-box2 {
		height:100%;
		width:100%;
		overflow: auto !important;
		display:flex;
		display: -webkit-flex;
		flex-direction: row;
	}
	.info2 {
		flex:1;
		padding-right:10px;
		box-sizing: border-box;
		border-right: 1px solid #ddd;
		overflow: auto
	}
	.my-divider {
		margin: 15px auto 10px;
	}

	.my-table {
		width: 100%;
		margin-bottom: 5px;
	}

	.my-col {
		text-align: center;
		color: #909399;
	}

	.button-group {
		margin-bottom: 5px;
		margin-left: 10px
	}

	.el-table__body-wrapper .el-table__empty-block {
		background-image: none;
		min-height: auto;
		height: auto !important;
	}

	.el-table__empty-block .el-table__empty-text {
		display: block;
		line-height: 40px;
	}

	.el-table--border {
		border-bottom: 1px solid #EBEEF5 !important;
	}

	
	.ainfo2 {

		width: 240px;
		font-size: 14px;
		line-height: 20px;
		text-align: left;
		padding-left:10px;
		box-sizing: border-box;
	}

    .inner-content{
		width: 100%;
		margin-top: 20px;
		margin-bottom: 50px;
    }
	

	.line_blue {
		border-left: 2px solid #3385FF;
		margin-top:25px;
	}

	.lineSt {
		background-color: #dcdfe6;
		height: 1px;
		width: 100%;
		margin-bottom: 10px;
	}

	.ainfoFont {
		display: block;
		margin-bottom: -15px;
		font-weight: bold;
		color: #606266;
	}

	.listStyle {
		list-style: none;
	}

	.listStyleA {
		color: #3385FF !important
	}
</style>

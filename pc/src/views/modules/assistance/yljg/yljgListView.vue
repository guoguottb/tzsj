<template>
	<div class="g-box">
	<div class="g-box2">
		<div class="info2">
			<el-form :model="supportinst"  :inline-message="true" :show-message="false" 
                ref="supportinst" label-width="auto" style='padding-right: 10px;'>
				<h3 class="line_blue" id="page1">&emsp;基本信息</h3>
				<div class="lineSt"></div>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="机构名称" prop="abs_ex1">
							{{supportinst.abs_ex1}}
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="成立时间" prop="abs_dat3">
							{{supportinst.abs_dat3}}
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="所在区域" prop="abs_ex16">
							{{supportinst.abs_ex16}}
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="法人类型" prop="abs_ex2">
							{{supportinst.abs_ex2}}
						</el-form-item>
					</el-col>
				</el-row>

                <el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="服务范围" prop="abs_ex15">
							{{supportinst.abs_ex15}}
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="法人代表" prop="abs_ex3">
							{{supportinst.abs_ex3}}
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<!--el-col :span="12">
						<el-form-item label="地区名称代码" prop="abs_ex14">
							{{supportinst.abs_ex14}}
						</el-form-item>
					</el-col-->
					<el-col :span="12">
						<el-form-item label="联系电话" prop="abs_ex4">
							{{supportinst.abs_ex4}}
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="所在地址" prop="abs_ex5">
							{{supportinst.abs_ex5}}
						</el-form-item>
					</el-col>
				</el-row>

				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="床位数" prop="abs_ex6">
							{{supportinst.abs_ex6}}
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="护理人员数" prop="abs_ex7">
							{{supportinst.abs_ex7}}
						</el-form-item>
					</el-col>
				</el-row>
                
                <el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="执证人数" prop="abs_ex8">
							{{supportinst.abs_ex8}}
						</el-form-item>
					</el-col>
				</el-row>
                
                <el-row :gutter="20">
					<el-col :span="24">
						<el-form-item label="配套设置">
							{{supportinst.abs_ptss}}
						</el-form-item>
					</el-col>
				</el-row>

				<!--el-row :gutter="20">
				</el-row-->

				<h3 class="line_blue" id="page2">&emsp;银行信息</h3>
				<div class="lineSt"></div>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="开户人名称" prop="abs_ex13">
							{{supportinst.abs_ex13}}
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="开户银行" prop="abs_ex12">
							{{supportinst.abs_ex12}}
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="银行卡号" prop="abs_ex11">
							{{supportinst.abs_ex11}}
						</el-form-item>
					</el-col>
				</el-row>
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
						@click="counter('#page2')">银行信息</a><br>
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
		name: "yljgListVIew",
		components:{
			commonList
		},
		data() {
			return {
                supportinst: {},
				isFinish:false,
				isShow1: false,
				isShow2: true,
				isShow3: true
			}
		},
		mounted() {
			// 滚动鼠标右侧导航栏跟随滚动位置改变而改变显示
			// window.removeEventListener('scroll',this.scroll,false)
			window.addEventListener('scroll', this.scroll, true)
		},
		created() {
			this.loadData();
		},
		methods: {
			scroll(){
				// var scrollTop =document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset;
				if(document.querySelector('.info2')==null || document.querySelector('#recordt')==null){
					return ''
				}
				let scrollTop = document.querySelector('.info2').scrollTop
				let cHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
				let oDiv1 = document.querySelector('#page1');
				let oDiv2 = document.querySelector('#page2');
				let oDiv3 = document.querySelector('#page3');
			
				// 顺序跟上面显示顺序要相反
				let clientHeight = document.querySelector('.info2').clientHeight
				let recordtClientHeight = document.querySelector('#recordt').scrollHeight
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
				if(process.env.NODE_ENV!="development"){
					this.$router.go(-1)
				}
			},
			loadData() {// 进入页面加载数据
				this.isFinish=false;
				this.getSupportinst({
					sId: this.$route.query.sId
				}).then(res => {
					this.supportinst = this.formatPTSS(res[0].data, "set");
					this.isFinish=true;
				}).catch(res => {
					if(typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200){
						console.log('请求失败了-----------------------')
						this.$message.error('数据获取失败或请求超时11111')
						this.$emit("closes", false)
						this.$router.go(-1)
						return false
					}
					this.supportinst = this.formatPTSS(res.response.data[0].data, "set");
					this.isFinish=true;
				})
			},
			vss(d){
				var h = [];
				for(var k in d){
					h.push(k + "=" + d[k]);
				}
				return h.join("\r");
			},
			getSupportinst(data) {
				return request({
					url: "/social/assistance/getBasicSupportinst",
					method: 'post',
					data: data
				})
			},
            formatPTSS(data){
                let v = [];
                if(data.abs_ex21 == 1){
                    v.push("厨房");
                }
				if(data.abs_ex22 == 1){
                    v.push("康复训练中心");
                }
				if(data.abs_ex23 == 1){
                    v.push("健身房");
                }
				if(data.abs_ex24 == 1){
                    v.push("医疗护理室");
                }
				if(data.abs_ex25 == 1){
                    v.push("清洗房");
                }
				if(data.abs_ex26 == 1){
                    v.push("室外活动设备");
                }
				if(data.abs_ex27 == 1){
                    v.push("娱乐室");
                }
				if(data.abs_ex28 == 1){
                    v.push("读书室");
                }
				data.abs_ex9 = this.formatArea(data.abs_ex9);
				data.abs_ex10 = this.formatArea(data.abs_ex10);
                data.abs_ptss = v.join("，");
				return data;
            },
			formatArea(s){		
				let arr = s.split(",");
				let area = [];
				for(let i = 0; i < arr.length; i++){
					let __arr = arr[i].split("#");
					area.push(__arr[0]);
				}
				return area.join(" / ");
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

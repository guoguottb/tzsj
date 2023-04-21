//低收入人口核查-- 预警申请页面
<template>
	<common-list :sKey="444" :type="'预警推送'" :tableName="'预警'"></common-list>
</template>
<script>

import commonList from '../commonList'
export default {
	data(){
		return{

		}
	},
	beforeRouteLeave (to, from, next){
		// this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
		// console.log('commonList==============离开-------------------------',this);
		// console.log(this.$children[0].activeName);
		// for(let i in this.$children[0].tableData){
		// 	if(this.$children[0].tableData[i].btn[0].name=='查看'){

				sessionStorage.setItem('activeName',this.$children[0].activeName)
		// 	}
		// }
		
		next();
	},
	components:{
		commonList
	}
}
</script>
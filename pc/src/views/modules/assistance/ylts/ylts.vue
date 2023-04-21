//低收入人口核查-- 医疗推送页面
<template>
	<common-list :sKey="456" :type="'医疗推送'" :tableName="'医疗'"></common-list>
</template>
<script>

import commonList from '../commonList'
export default {
	data(){
		return{

		}
	},
	beforeRouteLeave (to, from, next){
		sessionStorage.setItem('activeName',this.$children[0].activeName)
		next();
	},
	components:{
		commonList
	}
}
</script>
<template>
	<common-list :sKey="520" :type="'政策计算器'" :tableName="'政策计算器'"></common-list>
</template>
<script>

import commonList from '../commonList'
export default {
	data(){
		return{

		}
	},
	beforeRouteLeave (to, from, next){
		sessionStorage.setItem('activeName',this.$children[0].activeName);
		next();
	},
	components:{
		commonList
	}
}
</script>
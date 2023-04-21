<template>
	<common-list :sKey="90" :type="'低保'" :tableName="'注销'"></common-list>
</template>
<script> 

import commonList from '../commonList'
export default {
	data(){
		return{

		}
	},
	// 本地缓存
	beforeRouteLeave (to, from, next){
		sessionStorage.setItem('activeName',this.$children[0].activeName);
		// sessionStorage.setItem('searchData',JSON.stringify(this.$children[0].searchData));
		next();
	},
	components:{
		commonList
	}
} 
</script>
<template>
	<common-list :sKey="519" :type="'救助边缘人员预警'" :tableName="'救助边缘人员预警'"></common-list>
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
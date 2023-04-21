<template>
	<common-list :sKey="517" :type="'即将进保人员预警'" :tableName="'即将进保人员预警'"></common-list>
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
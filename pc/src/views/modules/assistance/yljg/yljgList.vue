<template>
	<common-list :sKey="468" :type="'养老机构'" :tableName="'申请'"></common-list>
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
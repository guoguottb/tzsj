<template>
	<common-list :sKey="585" :type="'尊老金资金发放'" :tableName="'尊老金资金发放'">
		
	</common-list>
</template>
<script>

import commonList from '../commonList'
export default {
	data(){
		return{

		}
	},
	// beforeRouteLeave (to, from, next){
	// 	sessionStorage.setItem('activeName',this.$children[0].activeName)
	// 	next();
	// },
	components:{
		commonList
	}
}
</script>
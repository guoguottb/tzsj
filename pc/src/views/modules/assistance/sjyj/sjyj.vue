<template>
<div>
		<!-- <common-list :sKey="785" :type="'市长热线涉救'" :tableName="'市长热线涉救'"></common-list> -->
		<common-list :sKey="458" :type="'市长热线涉救'" :tableName="'市长热线涉救'"></common-list>
</div>
	
</template>
<script>

import commonList from '../commonList'
export default {
	name:"sjyj",
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
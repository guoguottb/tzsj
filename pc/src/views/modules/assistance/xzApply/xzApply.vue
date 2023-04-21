<template>
<div>
	<common-list :sKey="503" :type="'协助申请'" :tableName="'协助申请'"></common-list>
</div>
	
</template>
<script>

import commonList from '../commonList'
export default {
	name:"xzApply",
	data(){
		return{
			
		}
	
	},
	
	components:{
		commonList
	}
}
</script>
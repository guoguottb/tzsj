<template>
<div>
    <common-list :sKey="513" :type="'应急灾害预警'" :tableName="'申请'"></common-list>
</div>
	
</template>
<script>

import commonList from '../commonList'
export default {
	name:"yjzhyj",
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
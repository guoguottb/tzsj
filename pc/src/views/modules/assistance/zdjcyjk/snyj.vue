<template>
<div>
    <common-list :sKey="508" :type="'涉农预警'" :tableName="'申请'"></common-list>
</div>
	
</template>
<script>

import commonList from '../commonList'
export default {
	name:"snyj",
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
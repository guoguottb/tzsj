<template>
<div>
    <common-list :sKey="514" :type="'就业预警'" :tableName="'申请'"></common-list>
</div>
	
</template>
<script>

import commonList from '../commonList'
export default {
	name:"jyyjxx",
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
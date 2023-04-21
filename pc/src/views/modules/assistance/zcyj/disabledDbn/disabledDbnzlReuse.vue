<template>
<div>
		<common-list :sKey="501" :type="'低保内残补种类等级预警'" :tableName="'低保内残补种类等级预警'"></common-list>
</div>
	
</template>
<script>

import commonList from '../../commonList'
export default {
	name:"disabledDbnzlReuse",
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
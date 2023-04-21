<template>
<div>
		<common-list :sKey="489" :type="'残补和特困重复预警'" :tableName="'残补和特困重复预警'"></common-list>
</div>
	
</template>
<script>

import commonList from '../../commonList'
export default {
	name:"disabledTKReuse",
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
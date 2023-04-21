<template>
<div>
		<common-list :sKey="490" :type="'低保内残补存疑预警'" :tableName="'低保内残补存疑预警'"></common-list>
</div>
	
</template>
<script>

import commonList from '../../commonList'
export default {
	name:"disabledDbnReuse",
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
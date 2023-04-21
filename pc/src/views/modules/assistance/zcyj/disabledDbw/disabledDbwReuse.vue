<template>
<div>
		<common-list :sKey="491" :type="'低保外残补存疑预警'" :tableName="'低保外残补存疑预警'"></common-list>
</div>
	
</template>
<script>

import commonList from '../../commonList'
export default {
	name:"disabledDbwReuse",
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
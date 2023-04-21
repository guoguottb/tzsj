<template>
<div>
		<common-list :sKey="492" :type="'低收入家庭残补存疑预警'" :tableName="'低收入家庭残补存疑预警'"></common-list>
</div>
	
</template>
<script>

import commonList from '../../commonList'
export default {
	name:"disabledDsrReuse",
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
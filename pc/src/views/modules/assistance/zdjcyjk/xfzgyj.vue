<template>
<div>
    <common-list :sKey="515" :type="'下方职工预警'" :tableName="'申请'"></common-list>
</div>
	
</template>
<script>

import commonList from '../commonList'
export default {
	name:"xfzgyj",
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
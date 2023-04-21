<template>
<div>
		<common-list :sKey="784" :type="'团市委梦想改造'" :tableName="'团市委梦想改造'"></common-list>
</div>
	
</template>
<script>

import commonList from '../commonList'
export default {
	name:"tsw",
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
<template>
<div>
		<common-list :sKey="790" :type="'主动排查'" :tableName="'主动排查'"></common-list>
</div>
	
</template>
<script>

import commonList from '../commonList'
export default {
	name:"zdpc",
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
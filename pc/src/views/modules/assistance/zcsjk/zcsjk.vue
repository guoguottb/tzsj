<template>
<div>
	<common-list :sKey="502" :type="'政策数据库'" :tableName="'政策数据库'"></common-list>
</div>
	
</template>
<script>

import commonList from '../commonList'
export default {
	name:"zcsjk",
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
<template>
<div>
		<common-list :sKey="786" :type="'水电减免'" :tableName="'水电减免'"></common-list>
</div>
	
</template>
<script>

import commonList from '../commonList'
export default {
	name:"sdyj",
	data(){
		return{
			
		}
		
	},
	beforeRouteLeave (to, from, next){
		sessionStorage.setItem('activeName',this.$children[0].activeName);
		// sessionStorage.setItem('searchData',JSON.stringify(this.$children[0].searchData));
		next();
	},
	components:{
		commonList
	}
}
</script>
<template>
    <div>
		<common-list :sKey="583" :type="'疾病康复情况'" :tableName="'疾病康复情况'"></common-list>
    </div>
	
</template>
<script>

import commonList from '../commonList'
export default {
	name:"jbkfqk",
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
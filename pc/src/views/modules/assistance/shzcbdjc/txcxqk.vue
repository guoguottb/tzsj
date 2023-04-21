<template>
    <div>
		<common-list :sKey="582" :type="'通讯出行情况'" :tableName="'通讯出行情况'"></common-list>
    </div>
	
</template>
<script>

import commonList from '../commonList'
export default {
	name:"txcxqk",
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
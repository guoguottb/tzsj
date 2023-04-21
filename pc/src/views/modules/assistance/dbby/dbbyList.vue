<template>
	<common-list :sKey="446" :type="'低保家庭边缘'" :tableName="'申请'"></common-list>
    <!-- <div>低保边缘家庭</div> -->
</template>
<script>

import commonList from '../commonList'
export default {
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
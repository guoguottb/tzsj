<template>
	<common-list :sKey="487" :type="'尊老金'" :tableName="'注销'">
		<!-- <div>支出</div> -->
	</common-list>
</template>
<script>

import commonList from '../commonList'
export default {
	data(){
		return{

		}
	},
	beforeRouteLeave (to, from, next){
		//sessionStorage.setItem('activeName',this.$children[0].activeName)
		next();
	},
	components:{
		commonList
	}
}
</script>
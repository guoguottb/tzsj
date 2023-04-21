<template>
	<common-list :sKey="448" :type="'支出贫困'" :tableName="'申请'">
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
		sessionStorage.setItem('activeName',this.$children[0].activeName)
		next();
	},
	components:{
		commonList
	}
}
</script>
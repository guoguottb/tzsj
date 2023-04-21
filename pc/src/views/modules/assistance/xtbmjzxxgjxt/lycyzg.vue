<template>
	<common-list :sKey="431" :type="'陆运从业资格'" :tableName="'陆运从业资格'"></common-list>
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
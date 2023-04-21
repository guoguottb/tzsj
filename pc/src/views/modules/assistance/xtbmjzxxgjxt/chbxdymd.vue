<template>
	<common-list :sKey="425" :type="'长护保险待遇名单'" :tableName="'长护保险待遇名单'"></common-list>
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
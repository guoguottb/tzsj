<template>
	<common-list :sKey="426" :type="'高额医疗费'" :tableName="'高额医疗费'"></common-list>
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
<template>
	<common-list :sKey="477" :type="'特困复核'" :tableName="'特困复核'"></common-list>
</template>
<script>

import commonList from '../../commonList'
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
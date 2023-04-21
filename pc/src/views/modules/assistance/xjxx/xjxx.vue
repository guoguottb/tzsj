<template>
	<div>
		<common-list :sKey="580" :type="'学籍信息'" :tableName="'学籍信息'"></common-list>
	</div>
</template>
<script>

import commonList from '../commonList'
export default {
	name:"xjxx",
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
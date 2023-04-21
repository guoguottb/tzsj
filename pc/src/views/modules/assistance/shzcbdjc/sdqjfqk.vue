<template>
	<div>
		<common-list :sKey="581" :type="'水电气缴费情况'" :tableName="'水电气缴费情况'"></common-list>
	</div>
</template>
<script>

import commonList from '../commonList'
export default {
	name:"sdqjfqk",
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
<template>
    <div>
		<common-list :sKey="584" :type="'自定义预警'" :tableName="'自定义预警'"></common-list>
    </div>
	
</template>
<script>

import commonList from '../commonList'
export default {
	name:"zdyyj",
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


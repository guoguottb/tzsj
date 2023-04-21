<template>
	<common-list :sKey="464" :type="'错误数据补录'" ></common-list>
</template>
<script>

import commonList from '../commonList'
export default {
    name:"cwbl",
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
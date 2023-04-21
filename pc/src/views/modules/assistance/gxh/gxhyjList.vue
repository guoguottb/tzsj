<template>
    <div>
        <!-- 个性化预警库 -->
		<common-list :sKey="574" :type="'个性化预警库'" :tableName="'个性化预警库'"></common-list>
    </div>
</template>
<script>

import commonList from '../commonList'
export default {
	data(){
		return{

		}
	},
	// beforeRouteLeave (to, from, next){
	// 	sessionStorage.setItem('activeName',this.$children[0].activeName);
	// 	next();
	// },
	components:{
		commonList
	}
}
</script>
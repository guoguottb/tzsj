<template>
    <div>
        <common-list :sKey="500" :type="'财政供养人员预警'" :tableName="'财政供养人员预警'"></common-list>
    </div>
</template>
<script>

import commonList from '../commonList'
export default {
	name:"czgyryyj",
	data(){
		return{
			
		}
		
	},
	beforeRouteLeave (to, from, next){
		console.log(this.$children[0].activeName,'列表父组件');
        // sessionStorage.setItem('activeName',this.$children[0].activeName);// 修改了：注释了
		// sessionStorage.setItem('searchData',JSON.stringify(this.$children[0].searchData));
		next();
	},
	components:{
		commonList
	}
}
</script>
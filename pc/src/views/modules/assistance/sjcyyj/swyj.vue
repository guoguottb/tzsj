<template>
    <div>
        <common-list :sKey="482" :type="'死亡预警'" :tableName="'死亡预警'"></common-list>
    </div>
</template>
<script>

import commonList from '../commonList'
export default {
	name:"swyj",
	data(){
		return{
			
		}
		
	},
	beforeRouteLeave (to, from, next){
		console.log(this.$children[0].activeName,'列表父组件');
		// sessionStorage.setItem('activeName',this.$children[0].activeName);
        // sessionStorage.setItem('activeName',this.$children[0].activeName);// 修改了：注释了
		sessionStorage.setItem('searchData',JSON.stringify(this.$children[0].searchData));

		next();
	},
	components:{
		commonList
	}
}
</script>
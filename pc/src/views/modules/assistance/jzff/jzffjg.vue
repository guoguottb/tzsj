<template>
	<div>
		<!-- 521潘工 -->
		<!-- <common-list :sKey="521" :type="'资金发放监管'" :tableName="'资金发放监管'" :search="search"></common-list> -->
		<!-- 565刘工 -->
		<common-list :sKey="565" :type="'资金发放监管'" :tableName="'资金发放监管'" :search="search"></common-list>
	</div>
</template>
<script>

import commonList from '../commonList'
export default {
	name:"jzffjg",
	data(){
		return{
			search:{}
		}
	},
	
	components:{
		commonList
	},
	
	methods:{
		loadData(){
			// console.log(this.$route.query,'this.$route.query');
			// for( var key in this.this.$route.query){
			// 	this.search[key]=this.$route.query[key]
			// }
		},
	},
	created(){
		this.loadData()
	},
}
</script>
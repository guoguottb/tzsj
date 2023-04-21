<template>
<div>
		<common-list :sKey="789" :type="'物价补贴'" :tableName="'物价补贴'"></common-list>
</div>
	
</template>
<script>

import commonList from '../commonList'
export default {
	name:"wjyj",
	data(){
		return{
			
		}
		
	},
	
	components:{
		commonList
	}
}
</script>
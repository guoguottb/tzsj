/**
 * TjfxBox组件的slot
 * @param icon - icon
 * @param num - 数量
 * @param unit - 单位
 * @param title - 标题
 * 
 */
<template>
	<div class="tjfxBoxSlot">
		<div class="box-icon" :class="icon"></div>
		<div class="box-content">
			<div>{{num}}<span class="box-content-span">{{unit}}</span></div>
			<div class="box-content-title">{{title}}</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		created() {
		},
		mounted() {
		},
		props: {
			icon: {
				// default: 'el-icon-data-analysis',
				type: String
			},
			num: {
				// default: '1959',
			},
			unit: {
				// default: '起',
			},
			title: {
				// default: '智慧监察',
			},
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.tjfxBoxSlot{
		height: 10vh;
		display: flex;
		align-items: center;
	}
	.box-icon{
		/* width: 40%; */
		flex: 1;
		font-size: 50px;
		color: #27b8d9;
		text-align: center;
		padding-right: 10px;
	}
	.box-content{
		/* width: 60%; */
		flex: 2;
		font-size: 20px;
		color: #439eda;
	}
	.box-content-span{
		font-size: 20px;
		padding-left: 10px;
	}
	.box-content-title{
		font-size: 20px;
		color: #dedede;
	}
</style>

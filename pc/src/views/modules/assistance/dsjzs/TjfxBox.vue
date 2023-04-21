/**
 * 边框组件
 * @param width - 宽度
 * @param height - 长度(建议单位vh)
 * 
 */
<template>
	<div class="tjfx-box" :style="{ width : width, height : height }">
		<!-- 四个边框 -->
		<div class="box-border box-border-lt"></div>
		<div class="box-border box-border-rt"></div>
		<div class="box-border box-border-rb"></div>
		<div class="box-border box-border-lb"></div>
		
		<div v-if="$slots.header" class="header">
			<slot name="header"></slot>
		</div>
		<!-- <div> -->
			<slot></slot>
		<!-- </div> -->
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
			width: {
				default: '100%',
				type: String
			},
			height: {
				// default: '80px',
				type: String
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped >
	.tjfx-box{
		/* width: 150px; */
		/* height: 60px; */
		border: 3px solid #122e77;
		box-shadow: 0 0 80px #143487 inset;
		position: relative;
		box-sizing: border-box;
	}
	.box-border{
		width: 10px;
		height: 10px;
		/* border-left: 4px solid #1caafc;
		border-top: 4px solid #1caafc; */
	}
	.box-border-lt{
		border-left: 4px solid #1caafc;
		border-top: 4px solid #1caafc;
		position: absolute;
		left: -4px; top: -4px 
	}
	.box-border-rt{
		border-right: 4px solid #1caafc;
		border-top: 4px solid #1caafc;
		position: absolute;
		right: -4px; top: -4px 
	}
	.box-border-rb{
		border-right: 4px solid #1caafc;
		border-bottom: 4px solid #1caafc;
		position: absolute;
		right: -4px; bottom: -4px 
	}
	.box-border-lb{
		border-left: 4px solid #1caafc;
		border-bottom: 4px solid #1caafc;
		position: absolute;
		left: -4px; bottom: -4px 
	}
	.header{
		/* height: 20px; */
		border-bottom: 3px solid #122e77;
		color: #2aa3b0;
		font-weight: bold;
		padding: 5px;
	}
</style>

/**
 * Echarts折线图
 * @param {String} height - 高度(建议单位vh)
 * @param {Array} xAxis - x轴命名
 * @param {Array} data - 数据
 * 
 */
<template>
	<div class="echarts-line" ref="echarts-line" :style="{ height: height }">
		
	</div>
</template>

<script>
	import * as echarts from 'echarts/core';
	import { GridComponent } from 'echarts/components';
	import { LineChart } from 'echarts/charts';
	import { UniversalTransition } from 'echarts/features';
	import { CanvasRenderer } from 'echarts/renderers';
	export default {
		data() {
			return {
				
			}
		},
		props: {
			height: {
				default: '20vh',
				type: String
			},
			xAxis: {
				// default: '30vh',
				type: Array
			},
			data: {
				// default: '30vh',
				type: Array
			},
		},
		watch: {
			xAxis(newVal, oldVal) {
				this.init()
			},
			data(newVal, oldVal) {
				this.init()
			}
		},
		created() {
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition]);
				var chartDom = this.$refs['echarts-line'];
				var myChart = echarts.init(chartDom);
				var option;
				
				option = {
					// 鼠标放置提示
					tooltip: {
						trigger: 'axis', //坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用
						// 鼠标放置背景样式
						// axisPointer: {
						// 	type: 'shadow'
						// }
					},
					xAxis: {
						type: 'category',
						data: this.xAxis,
					},
					yAxis: {
						type: 'value'
					},
					series: [
						{
							data: this.data,
							type: 'line'
						}
					]
				};
				
				option && myChart.setOption(option);
			}
		}
	}
</script>

<style scoped>
	/* .echarts-bar{
		height: 300px;
	} */
</style>

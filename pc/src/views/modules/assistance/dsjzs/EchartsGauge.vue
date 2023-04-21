/**
 * Echarts仪表盘
 * @param {String} height - 高度(建议单位vh)
 * @param {String} name - 名称
 * @param {Array} data - 数据
 * 
 */
<template>
	<div class="echarts-gauge" ref="echarts-gauge" :style="{ height: height }">
		
	</div>
</template>

<script>
	import * as echarts from 'echarts/core';
	import { GaugeChart } from 'echarts/charts';
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
			name: {
				// default: '20vh',
				type: String
			},
			data: {
				// default: '20vh',
				type: Array
			},
		},
		watch: {
			name(newVal, oldVal) {
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
				echarts.use([GaugeChart, CanvasRenderer]);
				
				var chartDom = this.$refs['echarts-gauge'];
				var myChart = echarts.init(chartDom);
				var option;
				
				option = {
					tooltip: {
					   formatter: '{a} <br/>{b} : {c}'
					},
					series: [
						{
							name: this.name,
							type: 'gauge',
							min: 0,
							max: 10000,
							// 展示当前进度
							progress: {
								show: true,
								// 宽度
								width: 5
							},
							// 仪表盘轴线相关配置。
							axisLine: {
								// 仪表盘轴线样式。
								// { color , width , shadowBlur , shadowColor , shadowOffsetX , shadowOffsetY , opacity }
								lineStyle: {
									// 轴线宽度
									width: 5
								}
							},
							// 刻度样式。
							axisTick: {
								show: false
							},
							// 分隔线样式。(指着数字的那条线)
							splitLine: {
								show:false,
								// length: 10,
								// lineStyle: {
								// 	width: 2,
								// 	color: '#999'
								// }
							},
							// 刻度标签。
							axisLabel: {
								show: false,
								// 标签与刻度线的距离。
								// distance: 2,
								// color: '#999',
								// fontSize: 20
							},
							// 表盘中指针的固定点。(中间的小圆圈)
							anchor: {
								show: true,
								// 固定点是否显示在指针上面。
								showAbove: true,
								size: 1,
								itemStyle: {
									// borderWidth: 10
								}
							},
							// 仪表盘标题。
							title: {
								show: false,
								// offsetCenter: [0, '30%']
								// fontSize: 80,
							},
							// 仪表盘详情，用于显示数据。
							detail: {
								// 是否开启标签的数字动画。
								valueAnimation: true,
								// fontSize: 80,
								// 相对于仪表盘中心的偏移位置，数组第一项是水平方向的偏移，第二项是垂直方向的偏移。可以是绝对的数值，也可以是相对于仪表盘半径的百分比。
								offsetCenter: [0, '70%']
							},
							// 仪表盘刻度的分割段数。
							splitNumber: 1,
							data: this.data
						}
					]
				};
				
				option && myChart.setOption(option);
			}
		}
	}
</script>

<style scoped>
	/* .echarts-gauge{
		height: 300px;
	} */
</style>

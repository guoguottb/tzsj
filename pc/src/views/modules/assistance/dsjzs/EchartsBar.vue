/**
 * Echarts柱状图
 * @param {String} height - 高度(建议单位vh)
 * @param {Array} dataNameArr - 名称
 * @param {Array} dataArr - 数据
 * 
 */
<template>
	<div class="echarts-bar" ref="echarts-bar" :style="{ height: height }">
		
	</div>
</template>

<script>
	import * as echarts from 'echarts/core';
	import { TooltipComponent, GridComponent } from 'echarts/components';
	import { BarChart } from 'echarts/charts';
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
			dataNameArr: {
				// default: '30vh',
				type: Array
			},
			dataArr: {
				// default: '30vh',
				type: Array
			},
		},
		watch: {
			dataNameArr(newVal, oldVal) {
				this.init()
			},
			dataArr(newVal, oldVal) {
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
				echarts.use([TooltipComponent, GridComponent, BarChart, CanvasRenderer]);
				var chartDom = this.$refs['echarts-bar'];
				var myChart = echarts.init(chartDom);
				var option;
				
				option = {
					// 鼠标放置提示
					tooltip: {
						trigger: 'axis', //坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用
						axisPointer: {
							type: 'shadow'
						}
					},
					// 直角坐标系内绘图网格
					grid: {
						left: '3%', //距离容器左边
						right: '4%',
						bottom: '3%',
						containLabel: true //grid 区域是否包含坐标轴的刻度标签
					},
					xAxis: [
						{
							// type
							// 'value' 数值轴，适用于连续数据。
							// 'category' 类目轴，适用于离散的类目数据。为该类型时类目数据可自动从 series.data 或 dataset.source 中取，或者可通过 xAxis.data 设置类目数据。
							// 'time' 时间轴，适用于连续的时序数据，与数值轴相比时间轴带有时间的格式化，在刻度计算上也有所不同，例如会根据跨度的范围来决定使用月，星期，日还是小时范围的刻度。
							// 'log' 对数轴。适用于对数数据。
							type: 'category',
							// data
							//类目数据，在类目轴（type: 'category'）中有效。
							//如果没有设置 type，但是设置了 axis.data，则认为 type 是 'category'。
							//如果设置了 type 是 'category'，但没有设置 axis.data，则 axis.data 的内容会自动从 series.data 中获取，这会比较方便。不过注意，axis.data 指明的是 'category' 轴的取值范围。如果不指定而是从 series.data 中获取，那么只能获取到 series.data 中出现的值。比如说，假如 series.data 为空时，就什么也获取不到。
							data: this.dataNameArr,
							axisTick: {
								// 类目轴中在 boundaryGap 为 true 的时候有效，可以保证刻度线和标签对齐
								alignWithLabel: true
							}
						}
					],
					yAxis: [
						{
							type: 'value'
						}
					],
					series: [
						{
							name: '数量',
							type: 'bar',
							barWidth: '60%',
							// 图形样式。
							itemStyle: {
								// 柱条的描边颜色。
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
									{ offset: 0, color: '#83bff6' },
									{ offset: 0.5, color: '#188df0' },
									{ offset: 1, color: '#188df0' }
								])
							},
							// 高亮的图形样式和标签样式。
							emphasis: {
								itemStyle: {
									color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
										{ offset: 0, color: '#2378f7' },
										{ offset: 0.7, color: '#2378f7' },
										{ offset: 1, color: '#83bff6' }
									])
								}
							},
							data: this.dataArr
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

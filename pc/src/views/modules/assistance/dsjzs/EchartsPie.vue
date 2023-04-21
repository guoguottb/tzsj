/**
 * Echarts饼图
 * @param {String} height - 高度(建议单位vh)
 * @param {String} name - 名称
 * @param {Array} data - 数据
 * @param {String} roseType - 是否展示成南丁格尔图，通过半径区分数据大小。可选择两种模式：'radius' (默认值) 扇区圆心角展现数据的百分比，半径展现数据的大小。'area' 所有扇区圆心角相同，仅通过半径展现数据大小。
 * 
 */
<template>
	<div class="echarts-pie" ref="echarts-pie" :style="{ height: height }">
		
	</div>
</template>

<script>
	import * as echarts from 'echarts/core';
	import { ToolboxComponent, LegendComponent } from 'echarts/components';
	import { PieChart } from 'echarts/charts';
	import { LabelLayout } from 'echarts/features';
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
				// default: '30vh',
				type: String
			},
			data: {
				// default: '30vh',
				type: Array
			},
			roseType: {
				default: 'radius',
				type: String
			}
		},
		watch: {
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

				console.log(this.data,'data')
				echarts.use([
					ToolboxComponent,
					LegendComponent,
					PieChart,
					CanvasRenderer,
					LabelLayout
				]);
				
				var chartDom = this.$refs['echarts-pie'];
				var myChart = echarts.init(chartDom);
				var option;
				
				option = {
					legend: {
						// 图例组件离容器上侧的距离。
						top: 'bottom',
						// 图例文字颜色
						textStyle: {
							color: '#ffffff'
						}
					},
					// 鼠标放置提示
					tooltip: {
					    trigger: 'item'
					  },
					toolbox: {
						// 是否显示工具栏组件
						show: true,
						feature: {
							mark: { show: true },
							// 数据视图工具，可以展现当前图表所用的数据，编辑后可以动态更新。
							dataView: {
								// 是否显示该工具。
								show: true,
								// 是否不可编辑（只读）
								readOnly: false ,
							},
							// 配置项还原。
							restore: {
								// 是否显示该工具。
								show: true,
							},
							// 保存为图片
							saveAsImage: { show: true }
						}
					},
					series: [
						{
							// 系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列。
							name: this.name,
							type: 'pie',
							// 饼图的半径。可以为如下类型：
							// number：直接指定外半径值。
							// string：例如，'20%'，表示外半径为可视区尺寸（容器高宽中较小一项）的 20% 长度。
							// Array.<number|string>：数组的第一项是内半径，第二项是外半径。每一项遵从上述 number string 的描述。
							// 可以将内半径设大显示成圆环图（Donut chart）。
							// radius: [50, 250],
							radius: 50,
							// 饼图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。
							// 支持设置成百分比，设置成百分比时第一项是相对于容器宽度，第二项是相对于容器高度。
							center: ['50%', '50%'],
							// 是否展示成南丁格尔图，通过半径区分数据大小。可选择两种模式：
							// 'radius' 扇区圆心角展现数据的百分比，半径展现数据的大小。
							// 'area' 所有扇区圆心角相同，仅通过半径展现数据大小。
							roseType: this.roseType,
							// 图形样式。
							itemStyle: {
								// 用于指定饼图扇形区块的内外圆角半径，支持设置固定数值或者相对于扇形区块的半径的百分比值。
								// borderRadius: 10：表示内圆角半径和外圆角半径都是 10px。
								// borderRadius: '20%'：表示内圆角半径和外圆角半径都是扇形区块半径的 20%。
								// borderRadius: [10, 20]：表示为环形图时，内圆角半径是 10px、外圆角半径是 20px。
								// borderRadius: ['20%', '50%']：表示为环形图时，内圆角半径是内外圆半径差的 20%、外圆角半径是内外圆半径差的 50%。
								// borderRadius: [5, 10, 15, 20]：表示内圆角半径分别为 5px 和 10px，外圆角半径分别为 15px 和 20px。
								borderRadius: 8
							},
							label: {
								fontStyle: "normal",
								fontWeight: "bold",
								fontSize: 16,
								backgroundColor: 'transparent',
								color: '#fff'
							},
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
	/* .echarts-bar{
		height: 300px;
	} */
</style>

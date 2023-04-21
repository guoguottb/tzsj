/**
 * 高德地图
 * @param {String} height - 高度(建议单位vh)
 * 
 */
<template>
	<div id="map" class="map" ref="map" :style="{ height: height }">
		
	</div>
</template>

<script>
	export default {
		data() {
			return {
				map:null,
			}
		},
		props: {
			height: {
				default: '61.8vh',
				type: String
			},
		},
		created() {
			
		},
		mounted() {
			let map;
			let zoom = 14;
			//初始化地图对象(div id)
			map = new T.Map("map");
			//设置显示地图的中心点和级别
			// 市政府
			// map.centerAndZoom(new T.LngLat(120.061334,32.177107), zoom);
			// 民政局 [119.987428, 32.50923]
			map.centerAndZoom(new T.LngLat(119.921467,32.462050), zoom);
			// 设置地图样式
			map.setStyle('black')
			//创建标注对象
			// 市政府
			// let marker = new T.Marker(new T.LngLat(120.047000,32.173838));
			// 民政局
			let marker = new T.Marker(new T.LngLat(119.921467,32.462050));
			//向地图上添加标注
			map.addOverLay(marker);
			
			let markerInfoWin = new T.InfoWindow("泰州市民政局");
			marker.addEventListener("mouseover", function() {
				marker.openInfoWindow(markerInfoWin);
			}); // 将标注添加到地图中
			// 移除左下角天地图logo
			document.getElementsByClassName("tdt-control-copyright tdt-control")[0].style.display = 'none';
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.map {
		width: 100%;
	}

</style>

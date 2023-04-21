<template>
	<hc :headername='"临时救助核查"' :jz='"lsjz"'></hc>
</template>

<script>
	import hc from '@/components/Hc.vue'
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			
		},
		components:{
			hc
		}
	}
</script>
<!-- <template>
	<div class="dbhc">
		<header>
			临时救助核查
		</header>
		<main>
			
		</main>
		<van-button style="width: 90%;position: absolute;bottom: 20px;" type="info" block to="lsjz">主动救助</van-button>
	</div>
</template>

<script>
	
</script>

<style scoped>
	.dbhc{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	header{
		height: 100px;
		line-height: 100px;
		width: 100%;
		font-size: 40px;
		color: #FFFFFF;
		background: #1597fc;
	}
</style>
 -->
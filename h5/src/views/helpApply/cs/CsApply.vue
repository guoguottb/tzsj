<template>
	<div class="csApply">
		<header>需要准备的材料</header>
		<main>
			<ul>
				<li>1.《申请表》（慈善总会办公室领取）。</li>
				<li>2.患儿、父母户口本复印件和监护人身份证复印件。</li>
				<li>3.经济状况证明：低保户请民政科出具低保证明；非低保到乡镇民政科（政法社会事业管理局）出具低收入证明乡镇民政科盖章。</li>
				<li>4.患儿一寸照片2张。</li>
				<li>5.疾病诊断书。</li>
				<li>6.患儿医保卡复印件。</li>
				<li>7.住院票据和医保结算单，住院票据已经显示报销金额的，无需另外提供医保结算单。住院票据和医保结算单可以提供复印件，但必须把所有原件带上审核。</li>
				<li>8.医院门诊票据必须提供原件且是单张门诊票据满200元的才有效。</li>
				<li>9.出院小结（不需要每次的，只要一次的就行）。</li>
			</ul>
		</main>
		<footer>
			<div>联系人：郁老师；电话：0523-87729083</div>
			<div>切记：以上所有需要材料均需一式二份，低保和贫困证明统一去乡镇（街道）民政科办理</div>
		</footer>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			
		}
	}
</script>

<style scoped>
	.csApply{
		width: 100%;
		height: 100%;
		background-color: #f5f5f5;
		background-size: 100% 100%;
		position: fixed;
		overflow: auto;
	}
	header{
		font-size: 34px;
		margin-top: 20px;
		font-weight: bold;
		color: #333333
	}
	main{
		margin-top: 20px;
		width: 100%;
		display: flex;
		justify-content: center;
	}
	main ul{
		width: 95%;
		text-align: left;
		font-size: 28px;
	}
	main ul li{
		padding-top: 20px;
	}
	footer{
		margin-top: 20px;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: left;
		font-size: 28px;
	}
	footer div{
		width: 95%;
		padding-top: 20px;
	}
	footer div:nth-child(2){
		color: red;
		font-weight: bold;
	}
</style>

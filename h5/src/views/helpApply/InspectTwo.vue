<template>
  <div class="inspect">
    <!-- 下面核查全都显示则用上面这个header -->
    <!-- <header>
			<div>
				<div style="font-size: 20px;color: #00d1ca;">泰兴市</div>
				<img src="../../assets/img/bg/lujing1.png" width="100%" height="2px">
				<div style="font-size: 25px;font-weight: 600;color: #ffffff;">大救助一体化平台</div>
				<img src="@/assets/img/bg/lujing1.png" width="100%" height="1px">
			</div>
		</header> -->
    <header>
      <div>
        <div class="headerFont">
          <img src="@/assets/ysjylogo.png"
               class="headerImg">
          <span style="font-size:25px;display:block;margin-top:10px">泰州智慧民政社会救助</span>
        </div>
        <!-- <img src="@/assets/img/bg/lujing1.png" class="headerImg2">
				<div class="headerFont2">大救助一体化平台</div>
				<img src="@/assets/img/bg/lujing1.png" class="headerImg2"> -->
      </div>
    </header>
    <main>
      <div>
        <div class="maindivbox">
          <div class="maindiv maindivimg1"
               @click="routePush('/dbhc','群众申请')"></div>
          <div>群众申请</div>
          <!-- <div class="maindiv maindivimg1" @click="routePush('/dbhc','低保')"></div>
					<div>城乡低保核查</div> -->
        </div>
        <div class="maindivbox">
          <div class="maindiv maindivimg2"
               @click="routePush('/dsrhc','主动排查')"></div>
          <!-- <div class="maindiv maindivimg2" @click="routePush('/dsrhc','家庭边缘')"></div> -->
          <div>主动排查</div>
        </div>
        <div class="maindivbox">
          <div class="maindiv maindivimg3"
               @click="routePush('/tkhc','预警推送')"></div>
          <div>预警推送</div>
          <!-- <div>医疗预警</div> -->
        </div>
        <div class="maindivbox">
          <div class="maindiv maindivimg4"
               @click="routePush('/lshc','临时救助')"></div>
          <div>临时救助</div>
          <!-- <div>建档立卡预警</div> -->
        </div>
        <!-- <div class="maindivbox">
					<div class="maindiv maindivimg5" @click="routePush('/kjethc','困境儿童')"></div>
					<div>困境儿童核查</div>
				</div> -->
        <!-- 住房救助 -->
        <!-- <div class="maindivbox">
					<div class="maindiv maindivimg14" @click="routePush('/zfjz','住房救助')"></div>
					<div>住房救助</div>
				</div> -->

        <!-- 暂时隐藏 ,解除隐藏后下面mstyle ain的500px改成800-->
        <!-- <div class="maindivbox">
					<div class="maindiv maindivimg6" @click="routePush('/zljhc','尊老金')"></div>
					<div>尊老金核查</div>
				</div>
				<div class="maindivbox">
					<div class="maindiv maindivimg11" @click="routePush('/zfhc','定期走访')"></div>
					<div>定期走访</div>
				</div> -->

        <!-- <div class="maindivbox">
					<div class="maindiv maindivimg7" @click="routePush('/cjrhc','残疾人两项补贴')"></div>
					<div>残疾人补贴核查</div>
				</div> -->

        <!-- 暂时隐藏 ，解除隐藏后下面mstyle ain的500px改成800-->
        <!-- <div class="maindivbox">
					<div class="maindiv maindivimg13" @click="routePush('/zdsnhc','重度失能')"></div>
					<div>重度失能护理补贴</div>
				</div> -->
        <div style="maindivbox">
          <!-- <span>sdf</span> -->
        </div>

        <!-- <div class="maindiv maindivimg5" @click="routePush('/helpList')">
				</div>
				<div class="maindiv maindivimg6" @click="routePush('/participation')">
				</div>
				
				<div class="maindiv maindivimg7" @click="routePush('/participation')">
				</div>
				<div class="maindiv maindivimg8" @click="routePush('/participation')">
				</div>
				<div class="maindiv maindivimg9" @click="routePush('/participation')">
				</div>
				<div class="maindiv maindivimg10" @click="routePush('/participation')">
				</div>
				<div class="maindiv maindivimg11" @click="routePush('/participation')">
				</div> -->
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    routePush (url, stype) {



      let userName = localStorage.getItem('username');
      let token = sessionStorage.getItem('token');
      // if(['群众申请','预警推送','预警推送','主动排查','临时救助'].includes(stype) ){
      // 	window.location.href='http://zhmz.tlt.cn:10111/assistanceWeixin/WXhechaList?stype='+stype+'&username='+userName+'&token='+token;
      // }
      // else if(stype=='预警推送'){
      // 	window.location.href='http://218.90.225.71:10111/assistanceWeixin/WXhechaList?stype='+stype+'&userName='+username+'&token='+token;
      // }else if(stype=='主动排查'){
      // 	window.location.href='http://218.90.225.71:10111/assistanceWeixin/WXhechaList?stype='+stype+'&userName='+username+'&token='+token;
      // }else if(stype=='临时救助'){
      // 	window.location.href='http://218.90.225.71:10111/assistanceWeixin/WXhechaList?stype='+stype+'&userName='+username+'&token='+token;
      // }

      // else{

      this.$router.push({
        path: url,
        query: {
          stype: stype
        }
      })

      // }

    }
  }
}
</script>

<style scoped>
.inspect {
  /* background-size: 100% 100%; */
  /* background: url(../assets/img/bg/bg1.png) right bottom no-repeat / 650px,
			url(../assets/img/bg/bg2.png) 0px 0px no-repeat rgba(22, 121, 190, 1) / 500px 580px; */
  /* background: url(~@/assets/img/bg/bg1.png) 0 0 no-repeat,url(~@/assets/img/bg/bg2.png) 0 600px no-repeat; */
  /* background-size: 100% 500px,100% 100%; */
  /* background: url(~@/assets/img/bg/ysbg2.png) 0 0 no-repeat;
		background-size: 100% 100%; */
  background-color: #fff;
  width: 100%;
  height: 100%;
  position: fixed;
  overflow: auto;
}
header {
  /* width: 700px;
		text-align: left;
		margin-left: 40px;
		margin-top: 40px; */
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 6rem;
  /* top: -50px; */
  margin: 0 auto;

  overflow: hidden;
}
header > div {
  /* background-color: #fff; */
  background-color: #447bca;
  width: 150%;
  height: 6.6rem;
  position: absolute;
  top: -1rem;
  border-radius: 50%;
}

.headerFont {
  text-align: center;
  font-size: 34px;
  color: #ffffff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
main {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  width: 100%;
  /* 暂时改的,上面隐藏的图标显示就改成800px */
  /* height: 800px; */
  /* 暂时改的，去除后还剩两列 */
  height: 540px;
  overflow: auto;
}

main > div {
  width: 700px;
  display: flex;
  /* justify-content: space-between; */
  justify-content: flex-start;
  flex-flow: wrap;
}

.maindiv {
  width: 98px;
  height: 98px;
  margin-bottom: 20px;
}
.maindivbox {
  width: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 12px 50px 12px;
  color: #333333;
  font-size: 30px;
}
.maindivimg1 {
  /* background: url(~@/assets/img/inspect/btn7_1.png); */
  background: url(~@/assets/img/inspect/qzsq.png);
  background-size: 100% 100%;
}
.maindivimg2 {
  background: url(~@/assets/img/inspect/zdpc.png);
  background-size: 100% 100%;
}
.maindivimg3 {
  background: url(~@/assets/img/inspect/yljzhc.png);
  /* background: url(~@/assets/img/inspect/btn8_1.png); */
  background-size: 100% 100%;
}
.maindivimg4 {
  /* background: url(~@/assets/img/inspect/btn10_1.png); */
  background: url(~@/assets/img/inspect/jdlkjzhc.png);
  background-size: 100% 100%;
}
.maindivimg5 {
  background: url(~@/assets/img/inspect/kjer.png);
  /* background: url(~@/assets/img/inspect/btn2_1.png); */
  background-size: 100% 100%;
}
.maindivimg6 {
  background: url(~@/assets/img/inspect/zljhc.png);
  background-size: 100% 100%;
}
.maindivimg7 {
  background: url(~@/assets/img/inspect/btn5.png);
  background-size: 100% 100%;
}
.maindivimg8 {
  background: url(~@/assets/img/inspect/btn4.png);
  background-size: 100% 100%;
}
.maindivimg9 {
  background: url(~@/assets/img/inspect/btn6.png);
  background-size: 100% 100%;
}
.maindivimg10 {
  background: url(~@/assets/img/inspect/btn11_1.png);
  background-size: 100% 100%;
}
.maindivimg11 {
  background: url(~@/assets/img/inspect/dqzf.png);
  /* background: url(~@/assets/img/inspect/btn12_1.png); */
  background-size: 100% 100%;
}
.maindivimg12 {
  background: url(~@/assets/img/inspect/btn13_1.png);
  background-size: 100% 100%;
}
.maindivimg13 {
  background: url(~@/assets/img/inspect/btn14_1.png);
  background-size: 100% 100%;
}
.maindivimg14 {
  background: url(~@/assets/img/inspect/zfjzhc.png);
  background-size: 100% 100%;
}
/* .headerFont{
		text-align: center;
		font-size: 34px;
		color: #414141;
	} */
.headerImg {
  /* margin-left: 20px;
		vertical-align: bottom; */
  width: 120px;
  height: 120px;
  background-color: #fff;
  border-radius: 50%;
}
.headerImg2 {
  width: 100%;
  height: 1px;
}
.headerFont2 {
  font-size: 34px;
  font-weight: 600;
  color: #ffffff;
}
</style>

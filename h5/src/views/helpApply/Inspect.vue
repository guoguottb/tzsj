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
        <!-- <div class="headerFont">
					<span>泰兴市</span>
					<img src="@/assets/logo.png" class="headerImg">
				</div>
				<img src="@/assets/img/bg/lujing1.png" class="headerImg2">
				<div class="headerFont2">大救助一体化平台</div>
				<img src="@/assets/img/bg/lujing1.png" class="headerImg2"> -->
        <div class="headerFont">
          <img src="@/assets/ysjylogo.png"
               class="headerImg">
          <span style="font-size:25px;display:block;margin-top:10px">泰州智慧民政社会救助</span>
        </div>
      </div>
    </header>
    <main>
      <div>
        <div class="maindivbox">
          <div class="maindiv maindivimg1"
               @click="routePush('/inspectTwo')"></div>
          <div>民政部门</div>
        </div>
        <!-- 暂时隐藏 -->
        <!-- <div class="maindivbox">
					<div class="maindiv maindivimg2" @click="routePush('/inspectQtbm')"></div>
					<div>其他部门</div>
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
    routePush (url) {
      this.$router.push({
        path: url,
      })
    }
    // routePush(url,stype) {
    // 	this.$router.push({
    // 		path: url,
    // 		query:{
    // 			stype:stype
    // 		}
    // 	})
    // }
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
  background: url(~@/assets/img/inspect/mzbm.png);
  background-size: 100% 100%;
}
.maindivimg2 {
  background: url(~@/assets/img/inspect/qtbm.png);
  background-size: 100% 100%;
}
.maindivimg3 {
  background: url(~@/assets/img/inspect/btn8_1.png);
  background-size: 100% 100%;
}
.maindivimg4 {
  background: url(~@/assets/img/inspect/btn10_1.png);
  background-size: 100% 100%;
}
.maindivimg5 {
  background: url(~@/assets/img/inspect/btn2_1.png);
  background-size: 100% 100%;
}
.maindivimg6 {
  background: url(~@/assets/img/inspect/btn3.png);
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
  background: url(~@/assets/img/inspect/btn12_1.png);
  background-size: 100% 100%;
}
/* .headerFont{
		font-size: 34px;
		color: #00d1ca;
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

<template>
  <div class="home">
    <header>
      <div>
        <!-- <div style="font-size: 50px;color: #00d1ca;">泰兴市</div> -->
        <div class="headerFont">
          <span style="font-size:30px;vertical-align: super;text-shadow: 1px 3px 5px #3bb9a4;">泰州智慧民政社会救助</span>
          <img src="../assets/ysjylogo.png"
               class="headerImg">
        </div>
        <!-- <img src="../assets/img/bg/lujing1.png" class="headerImg2">
				<div class="headerFont2">大救助一体化平台</div>
				<img src="../assets/img/bg/lujing1.png" class="headerImg2"> -->
      </div>
    </header>
    <main>
      <div>
        <!-- apply申请
					inspect核查
					 跳转到helpApply可以在进行选择申请和核查-->
        <!-- <div class="maindiv maindivimg1" @click="routePush('/helpApply')">
				</div> -->
        <!-- 直接跳转到申请/核查 -->
        <div class="maindivbox"
             @click="routePush('/apply')">
          <div class="maindiv maindivimg1"></div>
          <div>申请救助</div>
        </div>

        <div class="maindivbox"
             @click="routePush('/projectReleased')">
          <div class="maindiv maindivimg2"></div>
          <div>领取救助</div>
        </div>

        <div class="maindivbox"
             @click="routePush('/talk')">
          <div class="maindiv maindivimg3"></div>
          <div>在线留言</div>
        </div>

        <div class="maindivbox"
             @click="routePush('/policySolutions')">
          <div class="maindiv maindivimg4"></div>
          <div>查看政策</div>
        </div>
        <div class="maindivbox"
             @click="routePush('/inspectTwo')">
          <div class="maindiv maindivimg5"></div>
          <div>救助核查</div>
        </div>
        <div class="maindivbox"
             @click="routePush('信访举报')">
          <div class="maindiv maindivimg33"></div>
          <div>信访举报</div>
        </div>
        <!-- <div class="maindivbox" @click="routePush('/123')">
					<div class="maindiv maindivimg33" ></div>
					<div>123</div>
				</div> -->

        <!-- <div class="maindiv maindivimg5" @click="routePush('/helpList')">
				</div> -->
        <!-- <div class="maindiv maindivimg6" @click="routePush('/participation')">
				</div> -->

      </div>
    </main>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  // components: {
  //   HelloWorld
  // }
  data () {
    return {

    }
  },
  created () {
    if (this.$route.query.userId) {
      localStorage.setItem("cs_userId", this.$route.query.userId)
    }

  },
  methods: {
    routePush (url) {
      if (url == '信访举报') {
        console.log(url, '信访');
        window.location.href = 'http://jiangsu.12388.gov.cn/taizhoushi/m/sm_area.html'
      } else {
        this.$router.push({
          path: url
        })
      }
    }
  }
}
</script>
<style scoped>
.home {
  /* background-size: 100% 100%; */
  /* background: url(../assets/img/bg/bg1.png) right bottom no-repeat / 650px,
			url(../assets/img/bg/bg2.png) 0px 0px no-repeat rgba(22, 121, 190, 1) / 500px 580px; */
  /* background: url(../assets/img/bg/bg1.png) 0 0 no-repeat,url(../assets/img/bg/bg2.png) 0 600px no-repeat; */
  background: url(../assets/img/bg/ysbg2.png) 0 0 no-repeat;
  background-size: 100% 100%;
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
}
header > div {
  width: 700px;
  text-align: left;
  margin-top: 40px;
}
main {
  margin-top: 120px;
  display: flex;
  justify-content: center;
}

main > div {
  width: 700px;
  height: 880px;
  display: flex;
  /* justify-content: space-between; */
  justify-content: flex-start;
  flex-flow: wrap;
  flex-direction: column;
}

.maindiv {
  width: 98px;
  height: 98px;
  /* margin-bottom: 20px; */
  margin-top: 10px;
}
.maindivbox {
  width: 40%;
  background-color: #fffffff1;
  border-radius: 14px;
  margin: auto;
  text-align: center;
  display: flex;
  flex-direction: row;
  /* align-items: center; */
  justify-content: space-between;
  /* margin: 0 0.16rem 0.66667rem 0.16rem; */
  color: #333333;
  font-size: 0.4rem;
  padding: 5px 120px;
}
.maindivbox > div {
  line-height: 1.5rem;
  font-size: 36px;
}
.maindivimg1 {
  background: url(../assets/img/bg/bgimg1.png);
  background-size: 100% 100%;
}
.maindivimg2 {
  background: url(../assets/img/bg/bgimg2.png);
  background-size: 100% 100%;
}
.maindivimg3 {
  background: url(../assets/img/bg/bgimg3.png);
  background-size: 100% 100%;
}
.maindivimg4 {
  background: url(../assets/img/bg/bgimg4.png);
  background-size: 100% 100%;
}
.maindivimg5 {
  background: url(../assets/img/bg/bgimg5.png);
  background-size: 100% 100%;
}
.maindivimg11 {
  background: url(../assets/img/bg/bgimg11.png);
  background-size: 100% 100%;
}
.maindivimg33 {
  background: url(../assets/img/bg/bgimg33.png);
  background-size: 100% 100%;
}
.headerFont {
  text-align: center;
  font-size: 34px;
  color: #414141;
}
.headerImg {
  margin-left: 20px;
  vertical-align: bottom;
  width: 98px;
  height: 98px;
  margin-top: 6%;
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

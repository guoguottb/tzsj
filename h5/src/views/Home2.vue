<template>
  <div class="home">
    <header>
      <div>
        <div class="headerFont">
          <img src="../assets/ysjylogo.png"
               class="headerImg">
          <span style="font-size:22px;display:block;margin-top:10px;">泰州智慧民政社会救助</span>
        </div>

      </div>
    </header>
    <main>
      <div>
        <div v-for="(item, index) in btnList2"
             :key="index"
             class="maindivbox"
             @click="operateBtn(item)">
          <!-- routePush(item.url,item.btnName) -->
          <div style="font-size:14px">{{item.btnName}}</div>
        </div>
        <!-- <div class="maindivbox" @click="routePush('/inspectTwo','上门核查')">
					<div>上门核查</div>
				</div> -->
        <!-- <div class="maindivbox"  @click="routePush('/SelfCareAssessmentList','特困自理能力评估')">
					<div>特困自理能力评估</div>
				</div>
				<div class="maindivbox" @click="routePush('/PoliciesCalculator','救助对象自我评估')">
					<div>救助对象自我评估</div>
				</div>
				<div class="maindivbox" @click="routePush('/PoliciesCalculator','困境儿童风险评估')">
					<div>困境儿童风险评估</div>
				</div>
				<div class="maindivbox" @click="routePush('/PoliciesCalculator','走访记录')">
					<div>走访记录</div>
				</div> -->
      </div>
    </main>
    <footer>
      <span style="color:#fff;font-size:12px">所属单位：泰州市民政局 联系电话：0523-86198830</span>
    </footer>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home2',
  // components: {
  //   HelloWorld
  // }
  data () {
    return {
      btnList: [
        {
          btnName: '群众自助申请',
          url: '/apply',
          type: 'qz'
        },
        {
          btnName: '救助公示栏',
          url: '/helpBulletinBoard',
          type: 'qz'
        },
        {
          btnName: '受理进度查询',
          url: '/workNode',
          type: 'qz'
        },
        {
          btnName: '救助对象自我评估',
          url: '/PoliciesCalculator',
          type: 'qz'
        },
        {
          btnName: '上门核查',
          url: '/inspectTwo',
          type: 'mz'
        },
        {
          btnName: '特困自理能力评估',
          url: '/SelfCareAssessmentList',
          type: 'gg'
        },
        {
          btnName: '上门走访',
          url: '/reexaminationList',
          type: 'sgz'
        },
        {
          btnName: '困境儿童风险评估',
          url: '/etpgList',
          type: 'gg'
        },
        {
          btnName: '服务记录(走访)',
          url: '/zfhc',
          type: 'mz'
        },
        {
          btnName: '政策查询',
          url: '/policySearch',
          type: 'qz'
        }, {
          btnName: '投诉建议',
          url: '/complaints',
          type: 'qz'
        },
        {
          btnName: '退出账号',
          url: '/Login',
          type: 'gg'
        },
      ],
      btnList2: [],
      station_handle: localStorage.getItem("station_handle") || false
    }
  },
  created () {
    if (this.$route.query.userId) {
      localStorage.setItem("cs_userId", this.$route.query.userId)
    }
    this.loadData();

  },
  methods: {

    loadData () {
      let username = localStorage.getItem("username");
      let station_handle = localStorage.getItem("station_handle")
      this.btnList2 = [];
      let reg = /^3212.*/
      if (this.$route.query.module == '社会群众入口') return this.btnList2 = this.btnList.filter(item => item.type == 'qz');
      if (station_handle === 'true') return this.btnList2 = this.btnList.filter(item => item.type == 'sgz' || item.btnName === '退出账号')
      if (username.includes('pg')) return this.btnList2 = this.btnList.filter(item => item.type == 'pg' || item.type == 'gg')
      if (reg.test(username)) return this.btnList2 = this.btnList.filter(item => item.type == 'mz' || item.type == 'gg')
    },
    operateBtn (item) {
      if (item.btnName === "退出账号") {
        localStorage.removeItem("username")
        localStorage.removeItem("password")
        localStorage.removeItem("station_handle")
      }
      this.routePush(item.url, item.btnName)
    },
    routePush (url, name) {
      if (name === "上门核查") url = "/inspectClass"

      // if(url=='信访举报'){
      // 	// console.log(url,'信访');
      // 	// window.location.href='http://jiangsu.12388.gov.cn/taizhoushi/m/sm_area.html'
      // 	this.$toast.fail('请填写正确的联系电话')
      // }
      console.log(name);
      if (name == '退出账号') {
        // localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        this.$router.push({
          path: '/'
        })

      }
      // else if(['困境儿童风险评估'].includes(name)){
      // // }else if(['困境儿童风险评估','走访记录','投诉建议'].includes(name)){

      // 	this.$toast.fail('该模块暂未开放')
      // }
      else {
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
  /* background: url(../assets/img/bg/ysbg2.png) 0 0 no-repeat; */
  /* background-color: rgb(138, 184, 142); */
  /* background-size:100% 100%; */
  /* background:linear-gradient(#3758b1, #5c7dd6 ,#3c8e9c); */
  background-color: #447bca;
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
  background-color: #fff;
  width: 150%;
  height: 6.6rem;
  position: absolute;
  top: -1rem;
  border-radius: 50%;
}

.headerFont {
  text-align: center;
  font-size: 34px;
  color: #414141;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.headerFont2 {
  font-size: 34px;
  font-weight: 600;
  color: #ffffff;
}
/*margin-top: 1rem;*/

main {
  /* margin-top:16px; */
  display: flex;
  justify-content: center;
}

main > div {
  width: 600px;
  height: auto;
  display: flex;
  /* justify-content: space-between; */
  justify-content: flex-start;
  flex-flow: wrap;
  flex-direction: row;
}

.maindiv {
  width: 98px;
  height: 98px;
  /* margin-bottom: 20px; */
  margin-top: 10px;
}
.maindivbox {
  width: 5.33333rem;
  height: 1.2rem;
  line-height: 1.2rem;
  background-color: #fcfcfcfc;
  border-radius: 0.18667rem;
  margin: 0.26667rem auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #333333;
  font-size: 0.55rem;
  /* padding: 0.13333rem 0.06667rem; */
}
.maindivbox > div {
  /* line-height:1.5rem; */
  margin-top: 10px;
  font-size: 16px;
  margin: 5px auto;
}
/* .maindivimg1{
		background: url(../assets/img/bg/bgimg1.png);
		background-size: 100% 100%;
	}
	.maindivimg2{
		background: url(../assets/img/bg/bgimg2.png);
		background-size: 100% 100%;
	}
	.maindivimg3{
		background: url(../assets/img/bg/bgimg3.png);
		background-size: 100% 100%;
	}
	.maindivimg4{
		background: url(../assets/img/bg/bgimg4.png);
		background-size: 100% 100%;
	}
	.maindivimg5{
		background: url(../assets/img/bg/bgimg5.png);
		background-size: 100% 100%;
	}
	.maindivimg11{
		background: url(../assets/img/bg/bgimg11.png);
		background-size: 100% 100%;
	}
	.maindivimg33{
		background: url(../assets/img/bg/bgimg33.png);
		background-size: 100% 100%;
	} */

.headerImg {
  width: 130px;
  height: 130px;
  border-radius: 50%;
}
.headerImg2 {
  width: 100%;
  height: 1px;
}
footer {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 20px;
  font-size: 0.2rem;
}
</style>

<template>
  <div class="home">
    <header>
      <div>
        <div class="headerFont">
          <img src="@/assets/ysjylogo.png"
               class="headerImg">
          <span style="font-size:22px;display:block;margin-top:10px;">泰州智慧民政社会救助</span>
        </div>

      </div>
    </header>
    <main>
      <div>
        <div v-for="(item, index) in btnList"
             :key="index"
             class="maindivbox"
             @click="routePush(item.url,item.btnName)">
          <div style="font-size:14px">{{item.btnName}}</div>
        </div>
      </div>
    </main>
    <footer>
      <span style="color:#fff;font-size:12px">所属单位：泰州市民政局 联系电话：0523-86198830</span>
    </footer>
  </div>
</template>

<script>

export default {
  name: 'inspectClass',
  data () {
    return {
      btnList: [
        {
          btnName: '困境儿童上门核查',
          url: '/inspectClass/ChildrenDistress',
        },
        {
          btnName: '残疾人上门核查',
          url: '/inspectClass/theDisabled',
        },
        {
          btnName: '社会救助上门核查',
          url: '/InspectTwo',
        }
      ],
    }
  },
  created () {
  },
  methods: {
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
  background-color: #447bca;
  width: 100%;
  height: 100%;
  position: fixed;
  overflow: auto;
}
header {
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
main {
  margin-top: 1rem;
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

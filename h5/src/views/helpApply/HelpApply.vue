<template>
  <div class="helpApply">
    <header>
      <div>
        <div style="font-size: 50px;color: #00d1ca;">泰兴市</div>
        <img src="@/assets/img/bg/lujing1.png"
             width="100%"
             height="2px">
        <div style="font-size: 25px;font-weight: 600;color: #ffffff;">大救助一体化平台</div>
        <img src="@/assets/img/bg/lujing1.png"
             width="100%"
             height="1px">
      </div>
    </header>
    <div class="helpApply2">
      <van-button type="info"
                  style="margin-bottom: 20px;"
                  to="apply">申请救助</van-button>
      <van-button to="inspect">救助核查</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
  }
}
</script>

<style scoped>
.helpApply {
  /* background-size: 100% 100%; */
  /* background: url(../assets/img/bg/bg1.png) right bottom no-repeat / 650px,
			url(../assets/img/bg/bg2.png) 0px 0px no-repeat rgba(22, 121, 190, 1) / 500px 580px; */
  background: url("../../assets/img/bg/bg1.png") 0 0 no-repeat,
    url("../../assets/img/bg/bg2.png") 0 600px no-repeat;
  background-size: 100% 500px, 100% 100%;
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
  width: 600px;
  text-align: left;
  margin-top: 40px;
}
.helpApply2 {
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>

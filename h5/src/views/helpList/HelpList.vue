<template>
  <div>
    <header>
      <div></div>
    </header>
    <main style="width: 100%;border-radius: 10px 10px;background-color: #ffffff;margin-top: -10px;text-align: left;display: flex;justify-content: center;">
      <div style="width: 90%;">
        <div class="mainHeader"
             style="display: flex;font-size: 16px;padding-top: 20px;padding-bottom: 10px;border-bottom: 1px solid #68aeaf;margin-bottom: 10px;color: cadetblue;">
          <span style="flex: 1;">排名</span>
          <span style="flex: 3;">组织名称</span>
          <span style="flex: 2;text-align: right;">服务数量</span>
        </div>
        <div v-for="item in datas"
             style="display: flex;font-size: 17px;margin-bottom: 15px;">
          <span v-if="item.ranking>3"
                style="flex: 1;line-height: 26px;">{{item.ranking}}</span>
          <span v-else-if="item.ranking==1"
                style="flex: 1;"><img width="20px"
                 height="25px"
                 src="../../assets/img/ranking/ranking1.png"
                 alt=""></span>
          <span v-else-if="item.ranking==2"
                style="flex: 1;"><img width="20px"
                 height="25px"
                 src="../../assets/img/ranking/ranking2.png"
                 alt=""></span>
          <span v-else-if="item.ranking==3"
                style="flex: 1;"><img width="20px"
                 height="25px"
                 src="../../assets/img/ranking/ranking3.png"
                 alt=""></span>
          <span style="flex: 3;">{{item.name}}</span>
          <span style="flex: 2;text-align: right;">{{item.num}}次</span>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data () {
    return {
      datas: [
        {
          ranking: 1,
          name: '泰兴市慈善总会',
          num: 118
        }, {
          ranking: 2,
          name: '黄桥镇慈善总会',
          num: 117
        }, {
          ranking: 3,
          name: '虹桥镇慈善总会',
          num: 116
        }, {
          ranking: 4,
          name: '广陵镇慈善总会',
          num: 115
        }, {
          ranking: 5,
          name: '滨江镇慈善总会',
          num: 114
        }, {
          ranking: 6,
          name: '宣堡镇慈善总会',
          num: 113
        }, {
          ranking: 7,
          name: '古溪镇慈善总会',
          num: 112
        }, {
          ranking: 8,
          name: '曲霞镇慈善总会',
          num: 111
        }, {
          ranking: 9,
          name: '河失镇慈善总会',
          num: 18
        }, {
          ranking: 10,
          name: '姚王镇慈善总会',
          num: 17
        }, {
          ranking: 11,
          name: '新街镇慈善总会',
          num: 8
        }, {
          ranking: 12,
          name: '珊瑚镇慈善总会',
          num: 1
        }
      ]
    }
  }
}
</script>

<style scoped>
header div {
  width: 100%;
  height: 380px;
  background: url(../../assets/img/bg/helpbg.png) no-repeat;
  background-size: 100% 100%;
}
</style>

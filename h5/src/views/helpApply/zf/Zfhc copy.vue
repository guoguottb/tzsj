<template>
  <div class="dbhc">
    <header>
      服务记录（走访）
    </header>
    <main>
      <van-search v-model="searchValue"
                  show-action
                  placeholder="请输入姓名/身份证号码"
                  @search="onSearch">
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
      <van-pull-refresh v-model="refreshing"
                        @refresh="onRefresh">
        <van-list v-model="loading"
                  :finished="finished"
                  finished-text="没有更多了"
                  @load="onLoad">
          <div class="hc"
               v-for="(item,index) in items"
               :key='index'
               @click="routerPush(item.arv_id)">
            <div class="hcHeader">
              <div class="hcHeader1">
                <div class="circle"
                     :style="{backgroundColor:item.bgcolor}"></div>
                <div style="color: #333333;">{{item.arv_ex1}}({{item.arv_ex8}})</div>
              </div>
              <!-- <div style="color: #48b4fd;">{{item.ab_ex15}}</div> -->
            </div>
            <div class="hcHeader2">
              <div>联系电话：{{item.arv_ex5}}</div>
              <!-- <div style="margin-left: 10px;">家庭人口：{{item.ab_ex5}}</div> -->
            </div>
            <div class="hcHeader3">现住地：{{item.arv_ex3}}</div>
            <div class="hcHeader4">申请日期：{{item.arv_dat1}}</div>
          </div>
        </van-list>
      </van-pull-refresh>
    </main>
    <van-button style="width: 90%;position: fixed;bottom: 20px;"
                type="info"
                block
                :to="'Dqzf?sId=&type='+this.$route.query.stype+'&ab_ex100=Y'">走访</van-button>
  </div>
</template>

<script>
let getListApi = (data) => {
  return request({
    method: 'post',
    url: '/social/assistanceWeixin/WXListByPage?stype=定期走访',
    data,
    headers: {
      'token': sessionStorage.getItem('token')
    }
  })
}
import request from '@/utils/request.js'
export default {
  name: 'hc',
  data () {
    return {
      items: [],
      page: 1,
      bgcolor: '#bcbcbc', //圆点颜色
      loading: false,
      finished: false,
      refreshing: false,
      searchValue: ""
    }
  },
  methods: {

    async loadData (Data) {
      try {
        const res = await getListApi(Data)
        console.log(res)
      } catch (error) {

      }
    },
    onLoad () {
      // 是否刷新
      if (this.refreshing) {
        this.items = [];
        this.page = 1
      }
      this.loadData({
        'page': this.page.toString(),
        'sqlwhere': ""
      }).then(res => {
        // 关闭刷新
        this.refreshing = false;
        console.log(res)
        for (let i = 0; i < res.length; i++) {
          let num = parseInt(res[i].rownumber) - 1
          console.log(num)
          this.$set(this.items, num, {
            // ab_ex15: unescape(res[i].ab_ex15),
            arv_ex1: unescape(res[i].arv_ex1),
            arv_ex8: unescape(res[i].arv_ex8),
            arv_ex5: unescape(res[i].arv_ex5),
            // ab_ex5: unescape(res[i].ab_ex5),
            arv_ex3: unescape(res[i].arv_ex3),
            arv_dat1: unescape(res[i].arv_dat1),
            arv_id: res[i].arv_id,
            // bgcolor: unescape(res[i].ab_ex15) != "申请" ? '#bcbcbc' : '#48b4fd',
          })
        }
        // 是否处于加载状态
        this.loading = false;
        console.log(this.items)
        this.page++
        console.log(this.page)
        if (res.length == 0) {
          this.finished = true;
        }
      }).catch(error => {
        console.log(error)
      })
    },
    onRefresh () {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    routerPush (id) {
      console.log(id)
      console.log(this.$route.query.stype)
      this.$router.push({
        // path:'/dbjz',
        path: '/dqzf',
        query: {
          sId: id,
          type: this.$route.query.stype
        }
      })
    },
    onSearch () { }
  },
  created () { },
}
</script>

<style scoped>
.dbhc {
  display: flex;
  flex-direction: column;
  align-items: center;
}

header {
  height: 88px;
  line-height: 100px;
  width: 100%;
  font-size: 36px;
  color: #ffffff;
  background: #3e80cc;
}

main {
  text-align: center;
  width: 95%;
  margin-top: 10px;
  margin-bottom: 200px;
}

.hc {
  border: 1px solid #a1a1a1;
  border-radius: 10px;
  width: 99%;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 30px;
}

.hcHeader {
  margin-top: 20px;
  width: 90%;
  display: flex;
  /* align-items: center;
		justify-content: center; */
  line-height: 20px;
  font-size: 32px;
  justify-content: space-between;
}

.hcHeader1 {
  display: flex;
}

.hcHeader2 {
  width: 90%;
  display: flex;
  margin-top: 30px;
  color: #666666;
}

.hcHeader3 {
  width: 90%;
  display: flex;
  margin-top: 10px;
  color: #666666;
}

.hcHeader4 {
  width: 90%;
  text-align: right;
  margin-top: 10px;
  color: #666666;
}

.circle {
  /* background-color: #bcbcbc; */
  width: 20px;
  height: 20px;
  border-radius: 50px;
  line-height: 20px;
}
</style>

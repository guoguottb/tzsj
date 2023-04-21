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
            <div class="hcHeader3">是否走访：{{item.arv_ex19}}</div>
            <div class="hcHeader4">申请日期：{{item.arv_dat2 | formatDate}}</div>
          </div>
        </van-list>
      </van-pull-refresh>
    </main>
    <van-button style="width: 90%;position: fixed;bottom: 20px;"
                type="info"
                block
                :to="'Dqzf?sId=&type='+this.$route.query.stype+'&ab_ex100=Y'">新增走访</van-button>
  </div>
</template>

<script>
let getIDApi = (data) => {
  return request({
    method: 'post',
    url: '/social/assistanceWeixin/getRegularVisits',
    data,
  })
}
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
      searchValue: "",
      sid: ''
    }
  },
  methods: {
    async loadData (Data) {
      try {
        const res = await getListApi(Data)
        if (res.length < 10) this.finished = true
        this.items = [...this.items, ...res]
        Data.ab_ex3 ? this.key = Data.ab_ex3 : this.key = ""
        this.page = (+this.page + 1).toString()
        this.loading = false
      } catch (error) {

      }
    },
    // 滑动加载
    onLoad () {
      if (this.refreshing) {
        this.item = [];
        this.refreshing = false;
      }
      this.loadData({
        ab_ex3: this.key,
        page: this.page + "",
      })
    },
    // 刷新
    onRefresh () {
      // 清空列表数据
      this.resetInfo()
      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    // 查询
    onSearch () {
      this.resetInfo()
      this.loadData({
        ab_ex3: this.searchValue,
        page: "1",
      });
    },
    routerPush (id) {
      this.$router.push({
        // path:'/dbjz',
        path: '/dqzf',
        query: {
          sId: id,
          type: this.$route.query.stype
        }
      })
    },
    resetInfo () {
      this.items = []
      this.page = "1"
      this.key = ""
    },
    async getId () {
      const res = await getIDApi({
        id: ""
      })
      this.sid = res[0].data[0].userName
      // console.log(sid, "sidsidsidsid")
    }
  },
  created () {
    this.getId()
  },
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

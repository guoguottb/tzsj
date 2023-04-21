<template>
  <div class="dbhc">
    <header>
      {{headername}}
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
               @click="routerPush(item.ab_id)">
            <div class="hcHeader">
              <div class="hcHeader1">
                <div class="circle"
                     :style="{backgroundColor:item.bgcolor}"></div>
                <div style="color: #333333;">{{item.ab_ex3}}({{item.ab_ex13}})</div>
              </div>
              <div style="color: #666666;">{{item.ab_ex15}}</div>
            </div>
            <div class="hcHeader2">
              <div>是否完成线下核查：{{['C','B','D','E'].includes(item.ab_ex120) ? '已完成' : "未完成"}}</div>
            </div>
            <div class="hcHeader2">
              <div>联系电话：{{item.ab_ex28}}</div>
              <div style="margin-left: 10px;">家庭人口：{{item.ab_ex5}}</div>
            </div>
            <div :title="item.ab_ex11"
                 class="hcHeader3 ellipsis">现住地：{{item.ab_ex11}}</div>
            <div class="hcHeader4">申请日期：{{item.ab_dat14 | formatDate}}</div>
          </div>
        </van-list>
      </van-pull-refresh>
    </main>
    <!-- 尊老金不需要主动救助 -->
    <!-- <van-button v-if="$route.query.stype!='尊老金'" style="width: 90%;position: fixed;bottom: 20px;" type="info" block :to="this.jz+'?sId=&type='+this.$route.query.stype+'&ab_ex100=Y'">主动救助</van-button> -->
  </div>
</template>

<script>
let getListApi = (data, stype) => {
  return request({
    method: 'post',
    url: '/social/assistanceWeixin/WXListByPage?stype=' + stype,
    data,
    headers: {
      token: sessionStorage.getItem('token'),
    }
  })
}
import request from '@/utils/request.js'
export default {
  name: 'hc',
  props: ['headername', 'jz'],
  data () {
    return {
      items: [],
      page: "1",
      ab_ex15: '',
      ab_ex96: '',
      ab_ex3: '',
      ab_ex13: '',
      bgcolor: '#bcbcbc', //圆点颜色
      loading: false,
      finished: false,
      refreshing: false,
      searchValue: '',
      searchName: '',
      searchIdCard: '',
      key: "",
    }
  },

  created () {
  },
  watch: {
    // '$route': {
    //   handler (newVal, oldVal) {
    //     console.log(sessionStorage.getItem('token'))
    //     this.loadData({
    //       page: this.page.toString(),
    //       'sqlwhere': "",
    //     }).then(res => {
    //       console.log(res)
    //       for (let i = 0; i < res.length; i++) {
    //         this.$set(this.items, i, {
    //           ab_ex15: unescape(res[i].ab_ex15),
    //           ab_ex3: unescape(res[i].ab_ex3),
    //           ab_ex13: unescape(res[i].ab_ex13),
    //           ab_ex28: unescape(res[i].ab_ex28),
    //           ab_ex5: unescape(res[i].ab_ex5),
    //           ab_ex11: unescape(res[i].ab_ex11),
    //           ab_dat14: unescape(res[i].ab_dat14),
    //           bgcolor: unescape(res[i].ab_ex15) != "申请" ? '#bcbcbc' : '#48b4fd',
    //         })
    //         console.log(this.items)
    //       }
    //     }).catch(error => {
    //       console.log(error)
    //     })
    //     // console.log(newVal)
    //     // console.log(oldVal)
    //   },
    //   deep: true,
    //   immediate: true
    // }
  },
  methods: {

    async loadData (Data) {
      try {
        const res = await getListApi(Data, this.$route.query.stype)
        if (res.length < 10) this.finished = true
        this.items = [...this.items, ...res]
        Data.ab_ex3 ? this.key = Data.ab_ex3 : this.key = ""
        this.page = (+this.page + 1).toString()
        this.loading = false
      } catch (error) {
        console.log(error)
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
      if(!this.searchValue) this.finished = false
      this.loadData({
        ab_ex3: this.searchValue,
        page: "1",
      });
    },

    routerPush (id) {
      if (id) {
        this.$router.push({
          // path:'/dbjz',
          path: '/' + this.jz,
          query: {
            sId: id,
            type: this.$route.query.stype
          }
        })

      } else {
        console.log('sid为空');
        this.$toast('请下拉刷新一下')
      }
    },
    resetInfo () {
      this.items = []
      this.page = "1"
      this.key = ""
    }
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

<template>
  <div class="dbhc">
    <header>
      {{$route.query.city && $route.query.street ? `${$route.query.city}${$route.query.street} 救助公示栏`: "救助公示栏" }}
    </header>
    <main>
      <!-- 搜索框 -->
      <van-search v-model.trim="searchValue"
                  class="searchInput"
                  show-action
                  @search="onSearch"
                  placeholder="请输入姓名">
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
      <van-pull-refresh v-model="refreshing"
                        @refresh="onRefresh">
        <van-list v-model="loading"
                  :finished="finished"
                  :finished-text="noMore"
                  @load="onLoad">
          <!-- @click="goInspect(item)" -->
          <div class="hc"
               v-for="(item,index) in items"
               :key='index'>
            <!--  @click="routerPush(item)" -->
            <div class="hcHeader">
              <div class="hcHeader1">
                <div class="circle"
                     :style="{backgroundColor:item.bgcolor}"></div>
                <div style="color: #333333;margin-left:5px">{{item.arfm_ex5 }}</div>
              </div>
              <!-- <div style="color: #666666;">{{item.ab_ex15}}</div> -->
              <!-- <div style="color: #666666;">发放金额：{{item.arfm_ex10}}</div> -->
            </div>
            <div class="hcHeader2">
              <div>发放金额：{{item.arfm_ex10}} 元</div>
            </div>
            <div class="hcHeader3">
              <!-- <div>身份证号：{{item.arfm_ex6}}</div> -->
              <!-- <div style="margin-left: 10px;">家庭人口：{{item.ab_ex5}}</div> -->
            </div>
            <div class="hcHeader3">
              <div>行政区划：{{item.arfm_ex8 ? item.arfm_ex8: "暂无信息" }}</div>
            </div>
            <!-- <div class="hcHeader3">现住地：{{item.ab_ex11}}</div> -->
            <!-- <div class="hcHeader3">所属区划：{{item.ab_ex162}}</div> -->
            <!-- <div class="hcHeader4">派单日期：{{item.dispatchTime | formatDate}}</div> -->
          </div>
        </van-list>
      </van-pull-refresh>
    </main>
  </div>
</template>

<script>
import dayjs from "dayjs"
let newDate = dayjs(new Date()).format("YYYY-MM-" + '01')
import {
  getReliefdistOpenApi, // 救助公示栏 list 列表数据
} from "@/api"
export default {
  name: 'MassInspectionList',
  data () {
    return {
      items: [],
      page: 1,
      bgcolor: '#bcbcbc', //圆点颜色
      loading: false,
      finished: false,
      refreshing: false,
      searchValue: '',
      key: "",
      noMore: "没有更多了"
    }
  },
  created () {
  },
  watch: {
  },
  methods: {
    // list数据加载
    async loadData (Data) {
      try {
        const res = await getReliefdistOpenApi(Data)
        if (res.code === 200) {
          this.items = [...this.items, ...res.data.list]
          if (this.items.length === res.data.inum) {
            this.finished = true
          } else {
            this.finished = false
          }
          Data.nameOrCard ? this.nameOrCard = Data.nameOrCard : this.nameOrCard = ""
          // 更新页面
          this.loading = false
          if (this.page == 1 && !res.data.list.length) {
            // this.noMore = `${this.$route.query.street}${this.$route.query.type}救助信息尚未公示`
            // if (!Data.nameOrCard) this.noMore = "没有更多了"
            return this.noMore = Data.nameOrCard ? "没有更多了" : `${this.$route.query.street}${this.$route.query.type}救助信息尚未公示`
            // return this.$toast()
          }
          this.page = this.page + 1
        }
      } catch (error) {
      } finally {
      }
    },
    // 滑动加载
    onLoad () {
      // 节流
      if (this.refreshing) {
        this.list = [];
        this.refreshing = false;
      }
      this.loadData({
        nameOrCard: this.key,
        city: this.$route.query.city,
        street: this.$route.query.street,
        page: this.page,
        type: this.$route.query.type,
        time: newDate,
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
        nameOrCard: this.searchValue,
        city: this.$route.query.city,
        street: this.$route.query.street,
        page: 1,
        type: this.$route.query.type,
        time: newDate,
      });
    },
    // 初始化查询信息
    resetInfo () {
      // this.finished = false
      this.items = []
      this.page = 1
      this.key = ""
    },
    // goInspect (item) {
    //   this.$router.push({
    //     path: `/inspectClass/inspectInfo?sId=${item.id}`,
    //   })
    // },
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
  font-size: 34px;
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
  background-color: #bcbcbc;
  width: 20px;
  height: 20px;
  border-radius: 50px;
  line-height: 20px;
}
</style>

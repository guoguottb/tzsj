<template>
  <div class="dbhc">
    <header>
      残疾人上门核查
    </header>
    <main>
      <!-- 搜索框 -->
      <van-search v-model.trim="searchValue"
                  class="searchInput"
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
               @click="goInspect(item)"
               v-for="(item,index) in items"
               :key='index'>
            <!--  @click="routerPush(item)" -->
            <div class="hcHeader">
              <div class="hcHeader1">
                <div class="circle"
                     :style="{backgroundColor:item.bgcolor}"></div>
                <div style="color: #333333;margin-left:5px">{{item.abd_ex2 }}</div>
              </div>
              <div style="color: #666666;">评估状态：{{item.abd_ex99 ? "已完成": "未完成"}}</div>
            </div>
            <div class="hcHeader2">
              <div>身份证号：{{item.abd_ex3}}</div>
            </div>
            <div class="hcHeader3">
              <div>联系电话：{{item.abd_ex20 }}</div>
              <!-- <div style="margin-left: 10px;">家庭人口：{{item.ab_ex5}}</div> -->
            </div>
            <div class="hcHeader3">
              <div>家庭住址：{{item.abd_ex19 ? item.abd_ex19 : "暂无数据"}}</div>
            </div>
            <!-- <div class="hcHeader3">现住地：{{item.ab_ex11}}</div> -->
            <!-- <div class="hcHeader3">所属区划：{{item.ab_ex162}}</div> -->
            <div class="hcHeader4">派发日期：{{item.abdDat17 | formatDate}}</div>
          </div>
        </van-list>
      </van-pull-refresh>
    </main>
  </div>
</template>

<script>
import { getDisabledInspectList } from "@/api"
export default {
  name: 'disabledList',
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
        const { data } = await getDisabledInspectList(Data)
        this.items = [...this.items, ...data.content]
        if (this.items.length === data.totalElements) this.finished = true
        data.key ? this.key = data.key : this.key = ""
        // 更新页面
        this.page = this.page + 1
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
        key: this.key,
        notNeedPage: false,
        pageNo: this.page,
        pageSize: 10,
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
        key: this.searchValue,
        notNeedPage: false,
        pageNo: 1,
        pageSize: 10,
      });
    },
    // 路由跳转
    routerPush (item) {
      this.$router.push("/inspectClass/inspectInfo")
    },
    // 初始化查询信息
    resetInfo () {
      this.items = []
      this.page = 1
      this.key = ""
    },
    // list item 点击事项 跳转 上门核查页面
    goInspect (item) {
      this.$router.push({
        path: `/inspectClass/userInfoAccept?sId=${item.id}`,
      })
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
  background-color: #bcbcbc;
  width: 20px;
  height: 20px;
  border-radius: 50px;
  line-height: 20px;
}
</style>

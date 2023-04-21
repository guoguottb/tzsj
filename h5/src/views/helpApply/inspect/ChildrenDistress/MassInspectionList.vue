<template>
  <div class="dbhc">
    <header>
      困境儿童上门核查
    </header>
    <main>
      <!-- 搜索框 -->
      <van-search v-model.trim="searchValue"
                  class="searchInput"
                  show-action
                  @search="onSearch"
                  placeholder="请输入姓名/身份证号码">
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
                <div style="color: #333333;margin-left:5px">{{item.name }}</div>
              </div>
              <!-- <div style="color: #666666;">{{item.ab_ex15}}</div> -->
              <div style="color: #666666;">核查状态：{{item.whetherChecked ? "已完成": "未完成"}}</div>
            </div>
            <div class="hcHeader2">
              <div>身份证号：{{item.idCard }}</div>
            </div>
            <div class="hcHeader3">
              <div>联系电话：{{item.phone }}</div>
              <!-- <div style="margin-left: 10px;">家庭人口：{{item.ab_ex5}}</div> -->
            </div>
            <div class="hcHeader3">
              <div>家庭住址：{{item.residentialAddress ? item.residentialAddress : "暂无数据"}}</div>
            </div>
            <!-- <div class="hcHeader3">现住地：{{item.ab_ex11}}</div> -->
            <!-- <div class="hcHeader3">所属区划：{{item.ab_ex162}}</div> -->
            <div class="hcHeader4">派单日期：{{item.dispatchTime | formatDate}}</div>
          </div>
        </van-list>
      </van-pull-refresh>
    </main>
  </div>
</template>

<script>
import { plightChildrenListApi } from "@/api"
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
        const res = await plightChildrenListApi(Data)
        console.log(res,"0000")
        let { data } = res
        this.items = [...this.items, ...data.content]
        if (this.items.length === data.totalElements) this.finished = true
        data.key ? this.key = data.key : this.key = ""
        // 更新页面
        this.page = this.page + 1
        this.loading = false
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
    // 初始化查询信息
    resetInfo () {
      // this.finished = false
      this.items = []
      this.page = 1
      this.key = ""
    },
    goInspect (item) {
      this.$router.push({
        path: `/inspectClass/inspectInfo?sId=${item.id}`,
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

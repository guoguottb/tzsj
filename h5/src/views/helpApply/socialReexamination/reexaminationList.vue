<template>
  <div class="dbhc">
    <header>
      上门走访
    </header>
    <main>
      <!-- 搜索框 -->
      <van-search v-model.trim="searchValue"
                  show-action
                  clearable
                  placeholder="请输入姓名/身份证号码"
                  @search="onSearch">
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
      <!-- 筛选框 -->
      <van-dropdown-menu v-if="show">
        <van-dropdown-item v-model="value1"
                           @change="change1"
                           :options="option1" />
        <van-dropdown-item v-model="value2"
                           @change="change2"
                           :options="option2" />
      </van-dropdown-menu>
      <!-- 列表 -->
      <van-pull-refresh v-model="refreshing"
                        @refresh="onRefresh">
        <van-list v-model="loading"
                  :finished="finished"
                  finished-text="没有更多了"
                  @load="onLoad">

          <div v-for="(item,index) in items"
               :key='index'>
            <div class="hc">
              <div class="boxTop"
                   @click="goInspect(item)">
                <div class="hcHeader">
                  <div class="hcHeader1">
                    <div class="circle"
                         :style="{backgroundColor:item.bgcolor}"></div>
                    <!-- <div style="color: #333333;margin-left:5px">{{item.abd_ex2 }}</div> -->
                  </div>
                  <div style="color: #666666;">完成情况：{{item.completionStatus }}</div>
                </div>
                <div class="hcHeader3">
                  <div>走访人员：{{item.personName}}</div>
                </div>
                <div class="hcHeader3">
                  <div>被走访人员姓名：{{item.visitName}}</div>
                </div>
                <div class="hcHeader3">
                  <div> 被走访人员身份证：{{item.visitIdCard}}</div>
                </div>
                <div class="hcHeader3">
                  <div>被走访人员保障类型：{{item.supportType}}</div>
                </div>
                <div class="hcHeader3">
                  <div> 创建时间：{{item.createTime }}</div>
                </div>
              </div>
              <div class="boxBottom"
                   v-if="item.completionStatus === '已完成'">
                <van-row>
                  <van-col span="18">
                  </van-col>
                  <van-col span="6">
                    <a href="javascript:;"
                       style="color:#3E80CC"
                       @click="createWork(item)">创建工单</a>
                  </van-col>
                </van-row>
              </div>
            </div>
            <div class="footBtn"></div>
          </div>
        </van-list>
      </van-pull-refresh>
    </main>
  </div>
</template>

<script>
import {
  getNotFinishBatchListApi,
  getRecordListApi
} from '@/api/socialWorkStation'
export default {
  name: 'reexaminationList',
  data () {
    return {
      historySearch: '',
      items: [],
      page: 1,
      bgcolor: '#bcbcbc', //圆点颜色
      loading: false,
      finished: false,
      refreshing: false,
      searchValue: '',
      key: "",
      // ----------
      show: true,
      value1: '',
      value2: '未完成',
      option1: [
      ],
      option2: [
        { text: '未完成', value: '未完成' },
        { text: '已完成', value: '已完成' },
      ],
    }
  },
  created () {
  },
  watch: {
  },
  methods: {
    // 获取社工站批次
    async getNotFinishBatchList (data) {
      try {
        const res = await getNotFinishBatchListApi(data)
        if (res.code !== 200) return this.$toast.fail(res.msg)
        if (!res.data.length) {
          this.show = false
        }
        this.option1 = res.data
        this.value1 = this.option1[0].value
      } catch (error) {

      }
    },
    // list数据加载
    async loadData (Data) {
      try {
        const { data } = await getRecordListApi(Data)
        this.historySearch = Data
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
    async onLoad () {
      if (!this.value1) await this.getNotFinishBatchList({})
      if (this.refreshing) {
        this.item = [];
        this.refreshing = false;
      }
      if (this.historySearch) this.historySearch.pageNo = this.page
      this.loadData(this.historySearch || {
        batchId: this.value1,
        completionStatus: this.value2,
        key: this.searchValue,
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
        batchId: this.value1,
        completionStatus: this.value2,
        key: this.searchValue,
        notNeedPage: false,
        pageNo: 1,
        pageSize: 10,
      });
    },
    createWork (item) {
      this.$router.push(`/WorkOrderDetails?familyId=${item.familyId}&personId=${item.personId}`)
    },
    // 初始化查询信息
    resetInfo () {
      this.items = []
      this.page = 1
      this.key = ""
    },
    // list item 点击事项 跳转 上门核查页面
    goInspect (item) {
      this.$router.push(item.viewRoute)
    },
    change1 (val) {
      this.historySearch.batchId = val
      this.historySearch.pageNo = 1
      this.items = []
      this.loadData(this.historySearch)
    },
    change2 (val) {
      this.historySearch.completionStatus = val
      this.historySearch.pageNo = 1
      this.items = []
      this.loadData(this.historySearch)
    },
  },

}
</script>

<style scoped lang="less">
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
  .boxTop {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 30px;
  }
  .boxBottom {
    font-size: 0.38rem;
    color: #666666;
    line-height: 0.8rem;
  }
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

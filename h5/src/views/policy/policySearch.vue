<template>
  <div>
    <header>
      政策查询
    </header>
    <div class="searchBox">
      <van-sticky>
        <van-search v-model="searchValue"
                    show-action
                    placeholder="请输入政策文件名称"
                    @search="onSearch"
                    :clearable='false'>
          <template #action>
            <div @click="onSearch">搜索</div>
          </template>
        </van-search>

      </van-sticky>
    </div>
    <van-pull-refresh v-model="isLoading"
                      @refresh="onRefresh"
                      style="height:80vh"
                      success-text="刷新成功">
      <main>
        <div v-if="list.length==0">
          <p>数据为空啦！</p>
        </div>
        <van-cell-group v-else>
          <van-cell v-for="(item ,index) in list"
                    :key="index"
                    is-link
                    @click="toRoutr(item)">
            <span class="content">{{item.title}}</span>
            <!-- <span>标题：<span class="content">{{item.title}}</span></span> -->
            <!-- <span>添加时间：{{item.time}}</span> -->
            <span class="time">{{item.time}}</span>
          </van-cell>
        </van-cell-group>

      </main>
    </van-pull-refresh>
    <!-- 分页 -->
    <!-- <van-sticky> -->
    <div class="footer">
      <van-pagination v-model="currentPage"
                      :total-items="total"
                      :show-page-size="pageSize"
                      force-ellipses
                      @change="changePage" />
    </div>
    <!-- </van-sticky> -->

  </div>

</template>

<script>
import request from '@/utils/request.js'
// import { PullRefresh } from 'vant';
export default {
  name: 'policySearch',  // 政策查询
  data () {
    return {

      data: [
        // { title: '关于明确困难残疾人生活补贴和重度残疾人护理补贴工作相关事项的通知', time: '2023-01-07' },
        // { title: '关于对市区三、四级智力、精神残疾人发放生活补贴的通知', time: '2023-01-07' },
        // { title: '关于做好困难残疾人生活补贴和重度残疾人护理补贴发放管理工作的通知', time: '2023-01-07' },
        { title: '江苏省民政厅 江苏省财政厅 江苏省残联关于完善困难残疾人生活补贴和重度残疾人护理补贴制度的实施意见（苏民规〔2022〕4号）', time: '2023-04-20' },
        { title: '江苏省最低生活保障工作规程', time: '2022-10-04' },
        { title: '市政府办公室关于印发泰州市临时救助实施办法的通知', time: '2022-10-04' },
        { title: '江苏省特困人员认定办法', time: '2022-10-04' },
        { title: '市政府办公室关于城乡居民最低生活保障特困人员供养困境儿童分类保障和重度残疾人护理补贴标准的通知', time: '2022-10-04' },
        { title: '市政府关于印发泰州市低收入人口认定管理办法的通知', time: '2022-10-04' },
      ],
      isLoading: false,
      total: '',       //数据条数
      currentPage: 1, //当前页
      searchValue: '', //搜索文件名
      pageSize: 10,    //每页条数
      list: [],        //显示数据
      list2: [],       //搜索的总条数
      // path:''
    }

  },


  created () {
    this.total = this.data.length;
    this.loadData();
    // this.getData();
  },

  methods: {
    /*
        目前这个模块的搜索和分页的功能没有跟后端关联上，
        列表的标题和日期都是前端写的固定数据，后期需要从后端获取标题和日期
        搜索功能后期也要跟后端关联上
    
    */

    // 换页
    changePage (page) {
      console.log('换页', page);
      this.currentPage = page;
      this.loadData();
    },

    // 数据加载
    loadData () {

      this.list = [];

      /*  每页显示10条数据
          如果 页码*10 < 数据总量 则显示 (页码-1)*10到 页码*10 的 10条数据
          否则 显示 第 (页码-1)*10条到最后的数据 
      */
      let data = [];

      if (this.searchValue == '') {
        data = this.data;
        this.total = this.data.length;
      } else {
        data = this.list2;
      }


      if (this.currentPage * 10 < data.length) {

        for (let i = (this.currentPage - 1) * 10; i < this.currentPage * 10; i++) {
          this.list.push(data[i])
        }

      } else {

        for (let i = (this.currentPage - 1) * 10; i < data.length; i++) {

          this.list.push(data[i])
        }
      }

      console.log(this.list, '显示数据');
      console.log(data, '显示数据2');
      console.log(this.data, '显示数据3');

      // 关闭加载
      this.isLoading = false;

    },

    // 搜索
    onSearch () {
      console.log(this.searchValue, '点击搜索');
      let arrData = [];

      if (this.searchValue != '') {

        for (let i in this.data) {
          let obj = {};
          if (this.data[i].title.indexOf(this.searchValue) != -1) {
            arrData.push(this.data[i])
          }

        }
      } else {
        this.list2 = this.data
      }

      if (arrData.length > 0) {
        this.list2 = arrData;
        this.total = arrData.length;
      } else {
        this.list2 = arrData;
        this.total = arrData.length;
      }

      this.loadData();


    },

    // 清除搜索内容
    onCancel () {
      console.log(11);
    },

    // 刷新
    onRefresh () {
      setTimeout(() => {
        // Toast('刷新成功');
        this.isLoading = true;

        // 本地写的死数据列表
        this.loadData();


        // 请求政策数据库的方法
        // this.getData();
      }, 1000);
    },

    // 页面跳转
    toRoutr (data) {
      console.log(data);

      this.$router.push({
        path: '/policyDetail',

        query: {
          type: data.title,

        }
      })
    },

    // 请求政策数据库的方法
    getData (data) {

      request({
        method: 'post',
        url: '/social/assistanceWeixin/getPolicy',
        data: { type: '' },

      }).then(res => {

        console.log(res);
        this.data = [];

        for (let i in res) {

          let obj = { title: '' };

          this.data.push(obj)

          this.data[i].title = res[i].familyType;

        }

        this.isLoading = false;

      }).catch(error => {

        // 提示提交失败
        this.$toast.fail('数据加载失败')
        console.log(error);
        this.isLoading = false;
      })
    }



  }
}
</script>

<style scoped>
header {
  height: 88px;
  line-height: 100px;
  width: 100%;
  font-size: 36px;
  color: #ffffff;
  background: #3e80cc;
}
.content {
  display: inline-block;
  width: 80%;
  min-height: 35px;
  color: rgb(33, 150, 243);
  font-size: 26px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.time {
  display: inline-block;
  width: 20%;
  min-height: 35px;
  /* color: rgb(33, 150, 243); */
  font-size: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
mian {
  margin-bottom: 45px;
  height: 100vh;
}
:deep(.searchBox .van-sticky) {
  box-shadow: 0px 0px 10px #ddd;
}
.footer {
  position: fixed;
  width: 100%;
  bottom: 10px;
  left: 0px;
  right: 0px;
}
</style>
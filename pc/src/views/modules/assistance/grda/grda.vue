<template>
  <div class="g-box"
       @resize="aa">
    <el-form :inline="true"
             :model="searchData"
             class="demo-form-inline tycxForm"
             label-width="160px"
             label-position="left">
      <el-form-item label="申请人姓名">
        <el-input v-model="searchData.name"
                  placeholder="申请人姓名"></el-input>
      </el-form-item>
      <el-form-item label="申请人身份证">
        <el-input v-model="searchData.idCard"
                  placeholder="申请人身份证"></el-input>
      </el-form-item>
      <el-button type="primary"
                 @click="subSelect">查询</el-button>
      <el-button type="info"
                 @click="subReset">重置</el-button>
    </el-form>
    <h3>社会救助档案</h3>
    <el-table :data="societyData"
              border
              height="300">
      <el-table-column prop="id"
                       label="档案ID"> </el-table-column>
      <el-table-column prop="type"
                       label="档案救助类型">
      </el-table-column>
      <el-table-column prop="businessNode"
                       label="档案状态">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-link type="danger"
                   v-bind:href="  '/#/assistance/db/dbListView?type=2&sId=' + scope.row['id'] ">
            查看
          </el-link>
        </template>
      </el-table-column>
    </el-table>

    <h3>残疾人档案</h3>
    <el-table :data="disabledData"
              border
              height="300">
      <el-table-column prop="id"
                       label="档案ID"> </el-table-column>
      <el-table-column prop="type"
                       label="档案类型">
      </el-table-column>
      <el-table-column prop="businessNode"
                       label="档案状态">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-link type="danger"
                   v-bind:href="'/#/SubsidyDisabled/viewPage?sId=' + scope.row['id']">
            查看
          </el-link>
        </template>
      </el-table-column>
    </el-table>
    <h3>困境儿童档案</h3>
    <el-table :data="childData"
              border
              height="300">
      <el-table-column prop="id"
                       label="档案ID"> </el-table-column>
      <el-table-column prop="type"
                       label="档案类型">
      </el-table-column>
      <el-table-column prop="businessNode"
                       label="档案状态">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-link type="danger"
                   v-bind:href="'/#/social/assistance/kjet/kjetListView?id=' + scope.row['id'] ">
            查看
          </el-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import request from "@/utils/request";
export default {
  name: "grda",
  data () {
    return {
      searchData: {
        name: "",
        idCard: "",
      },
      societyData: [],
      disabledData: [],
      childData: [],
    };
  },

  watch: {},
  created () { },
  mounted () {
    window.onresize = () => {
      window.screenWidths = document.body.clientWidth; //获取页面装口宽度
      this.screenWidths = window.screenWidths; //赋值screenWidths
      console.log("视口大小发生变化");
    };
  },

  methods: {
    aa () {
      // var account = isSpecialAccount();
      // this.$alert(account,'账号');
      console.log("视口大小发生变化");
    },

    onSubmit () {
      console.log("submit!");
    },
    //统一查询筛选调用的接口
    gradList (data) {
      return request({
        headers: {
          Accept: "application/json",
        },
        url: "/social/dataCenter/getPersonFile",
        method: "post",
        data: data,
      });
    },
    //点击查询调用的方法
    subSelect () {
      this.gradList({
        name: this.searchData.name,
        idCard: this.searchData.idCard,
      })
        .then((res) => {
          console.log(res, "then");
        })
        .catch((res) => {
          console.log("返回的数据" + JSON.stringify(res.response.data.data));
          this.societyData = res.response.data.data.societyData;
          this.disabledData = res.response.data.data.disabledData;
          this.childData = res.response.data.data.childData;
        });
    },
    //
    //点击重置按钮调用的方法
    subReset () {
      this.searchData = {};
      this.societyData = [];
      this.disabledData = [];
      this.childData = [];
    },
  },
};
</script>

<style scoped lang="less">
.g-box {
  overflow-y: scroll;
}
</style>
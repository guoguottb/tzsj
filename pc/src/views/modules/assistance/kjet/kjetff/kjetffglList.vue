<template>
  <div class="g-box">
    <!-- 查询 -->
    <div class="search">
      <el-form :inline="true"
               :model="searchData"
               class="demo-form-inline">

        <el-form-item label-width="110px"
                      label="困境儿童类型">
          <el-select v-model="searchData.childType"
                     style="width:100%"
                     clearable
                     placeholder="困境儿童类型">
            <el-option v-for="(item,index) in options"
                       :key="index"
                       :label="item.value"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label-width="110px"
                      label="发放类型">

          <el-select v-model="searchData.issuingType"
                     style="width:100%"
                     clearable
                     placeholder="发放类型">
            <el-option label="正常发放"
                       value="正常发放"></el-option>
            <el-option label="补发"
                       value="补发"></el-option>
            <el-option label="一次性发放"
                       value="一次性发放"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label-width="110px"
                      label="行政区划">
          <el-cascader :props="props"
                       v-model="xzqhArray"
                       clearable
                       placeholder="行政区划"
                       style="width:100%"></el-cascader>
        </el-form-item>

        <el-form-item label-width="110px">
          <el-button type="primary"
                     @click="queryListByCriteria"
                     icon="el-icon-search"> 查询</el-button>
          <el-button type="info"
                     @click="resetQuery"
                     icon="el-icon-refresh"> 重置</el-button>
        </el-form-item>

      </el-form>
    </div>
    <div class="content">
      <el-table ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                border
                style="width: 100%"
                @selection-change="handleSelectionChange"
                height="100%"
                v-loading="loading">
        <el-table-column type="index"
                         label="序号"
                         width="50">
        </el-table-column>
        <!-- <el-table-column prop="id" label="资金发放ID" width="100px"></el-table-column> -->
        <el-table-column prop="createTime"
                         label="创建时间"></el-table-column>
        <el-table-column prop="childType"
                         label="儿童救助类型"></el-table-column>
        <el-table-column prop="divisionName"
                         label="区划"></el-table-column>
        <el-table-column prop="frequency"
                         label="发放频次"></el-table-column>
        <el-table-column prop="goodsType"
                         label="物资类型"></el-table-column>
        <el-table-column prop="issuingType"
                         label="发放类型"></el-table-column>
        <el-table-column label="发放金额"
                         width="120px">
          <template slot-scope="{row}">
            {{row.moneys}}
          </template>
        </el-table-column>
        <el-table-column prop="number"
                         label="发放笔数"></el-table-column>
        <el-table-column prop="active"
                         label="操作"
                         :width="cazuoBtn">
          <template slot-scope="scope">
            <el-button-group>
              <el-button type="primary"
                         @click="viewRowInfo(scope.row)">查看</el-button>
              <el-button @click="handleClick(scope.row, '导出')"
                         type="primary"
                         size="small">导出</el-button>
              <el-button @click="DeltClick(scope.row, '删除')"
                         type="danger"
                         size="small">删除</el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页-->
    <div class="block footer">
      <el-pagination background
                     layout="total, sizes, prev, pager, next, jumper"
                     @size-change="handleSizeChange"
                     :page-sizes="[10, 30, 50]"
                     @current-change="handleCurrentChange"
                     :current-page="page"
                     :page-size="pageSize"
                     :total="totalElements">
      </el-pagination>
    </div>
    <!-- 查看rowListInfo dialog -->
    <el-dialog title="发放名单明细"
               :visible.sync="viewRowdialogVisible"
               width="80%"
               :before-close="viewRowhandleClose">
      <div class="maxBox">
        <!-- topform -->
        <template>
          <span class="span">姓名：</span>
          <el-input v-model.trim="viewForm.name"
                    class="input"></el-input>
          <span class="span">身份证：</span>
          <el-input v-model.trim="viewForm.idCard"
                    class="input"></el-input>
          <el-button type="primary"
                     icon="el-icon-search"
                     class="button"
                     @click="viewSearch"
                     :loading="viewSearchLoading">查询</el-button>
          <el-button type="info"
                     icon="el-icon-refresh"
                     @click="viewReset">重置</el-button>
        </template>
        <!-- table -->
        <template>
          <el-table :data="viewsData.content"
                    class="veiwTable"
                    border
                    stripe
                    height="360"
                    style="width: 100%">
            <el-table-column label="序号"
                             width="80"
                             type="index">
              <template slot-scope="{row,$index}">
                <span :title="$index + 1 + ((+viewsData.pageNo-1) * +viewsData.pageSize)"
                      class="ellipsis">{{$index + 1 + ((+viewsData.pageNo-1) * +viewsData.pageSize) }}</span>
              </template>
            </el-table-column>
            <el-table-column label="所属地区"
                             min-width="220">
              <template slot-scope="{row}">
                <span :title=" `${row.district}/${row.townStreet}/${row.village}`"
                      class="ellipsis">{{ `${row.district}/${row.townStreet}/${row.village}`
                }}</span>
              </template>
            </el-table-column>
            <el-table-column label="儿童姓名"
                             min-width="100">
              <template slot-scope="{row}">
                <span :title="row.name"
                      class="ellipsis">{{ row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="儿童身份证"
                             min-width="150">
              <template slot-scope="{row}">
                <span :title="row.idCard"
                      class="ellipsis">{{ row.idCard }}</span>
              </template>
            </el-table-column>
            <el-table-column label="发放金额"
                             min-width="120">
              <template slot-scope="{row}">
                <span class="ellipsis"
                      :title="row.money">
                  {{+row.money | toFixed}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="120"
                             label="发放时间">
              <template slot-scope="{row}">
                <span class="ellipsis"
                      :title="row.issuingTime">
                  {{row.issuingTime | formatDateYMD}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="120"
                             prop="type"
                             label="救助类型">
              <template slot-scope="{row}">
                <span :title="row.type"
                      class="ellipsis">{{row.type}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="{row}">
                <el-popover placement="right"
                            width="460"
                            trigger="click">
                  <el-table :data="gridData"
                            height="250">
                    <el-table-column min-width="120"
                                     property="issuingTime"
                                     label="发放时间">
                      <template slot-scope="{row}">
                        <span :title="row.issuingTime"
                              class="ellipsis">{{row.issuingTime}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column min-width="120"
                                     label="发放金额">
                      <template slot-scope="{row}">
                        <span :title="row.money"
                              class="ellipsis">{{row.money | toFixed}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="物资类型">
                      <template slot-scope="{row}">
                        <span :title="row.goodsType"
                              class="ellipsis">{{row.goodsType}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="发放类型">
                      <template slot-scope="{row}">
                        <span :title="row.issuingType"
                              class="ellipsis">{{row.issuingType}}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-button slot="reference"
                             @click="viewDetalInfo(row)">发放明细</el-button>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <!-- footer page -->
        <template>
          <div class="block footerPaging">
            <el-pagination @size-change="viewHandleSizeChange"
                           @current-change="viewHandleCurrentChange"
                           :current-page="viewsData.pageNo"
                           :page-sizes="[10, 20, 50, 100]"
                           :page-size="viewsData.pageSize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="viewsData.totalElements">
            </el-pagination>
          </div>
        </template>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// import commonList from "../commonList";
import request from "@/utils/request";
import { Loading } from "element-ui";
import {
  DetailsOfFundReleaseApi,    // 资金发放详情信息列表
  getOneChildFundReleaseList,  // 查看单个儿童资金发放记录
} from "@/api/lifeRescue/plightChildren"
export default {
  name: "yjptsz",
  data () {
    return {
      cazuoBtn: "240",
      //困境儿童救助类型:孤儿,事实无人抚养,重病重残,贫困家庭,其他,未知
      options: [
        {
          value: "孤儿",
          label: "孤儿",
        },
        {
          value: "事实无人抚养",
          label: "事实无人抚养",
        },
        {
          value: "重病重残",
          label: "重病重残",
        },
        {
          value: "贫困家庭",
          label: "贫困家庭",
        },
        {
          value: "其他",
          label: "其他",
        },
      ],
      tableData: [],  //列表数据
      page: 1, //当前页
      pageNum: "1",
      pageSize: 10,   //每页条数
      totalElements: 0, //总数
      loading: true,
      searchData: {
        childType: '',              //困境儿童类型
        issuingType: '',             //发放类型
        administrativeDivision: '',  //行政区划
      },
      xzqhArray: [], //行政区划搜索
      props: {
        checkStrictly: true,
        lazy: true,
        lazyLoad (node, resolve) {
          const { level } = node; // 获取当前node对象中的level属性
          let pId = "0";
          if (level > 0) {
            let value = node.value;
            if (value) {
              let values = value.split("#");
              pId = values.length > 1 ? values[1] : "0";
            }
          }
          request({
            url: "/social/assistance/getCityOption",
            method: "post",
            data: {
              pId: pId,
            },
          })
            .then((res) => { })
            .catch((res) => {
              // console.log(res);
              // console.log(res,"city");
              const nodes = res.response.data;
              nodes.forEach((item) => {
                item.value = item.cs_ex2 + "#" + item.cs_ex1;
                item.label = item.cs_ex2;
                item.leaf = level >= 2; //判断是否为末尾节点，这个地方是0,1,2三级
              });
              resolve(nodes);
            });
        },
      },
      viewRowdialogVisible: false,
      // viewSearchForm
      viewForm: {
        name: "",  // 姓名
        idCard: "",     // 身份证
      },
      copyViewForm: {
        name: "",  // 姓名
        idCard: "",     // 身份证
      },
      // 单个儿童资金发放记录
      gridData: [],
      // 资金发放详情信息列表data
      viewsData: {
        content: [],
        pageSize: 10,
        totalPages: 1,
        pageNo: 1,
        totalElements: 0
      },
      viewSearchLoading: false,
      viewReleaseId: "",   // releaseId
    };
  },

  components: {
  },
  created () {
    this.isApplication = true;
    this.loadData();
  },
  methods: {
    loadData () {
      this.loading = true;
      // this.searchData;
      this.getFundReleaseList({
        administrativeDivision: this.searchData.administrativeDivision,          //	行政区划,例：市区#街镇#村居
        childType: this.searchData.childType,                       //  困境儿童类型
        issuingType: this.searchData.issuingType,              //	发放类型 正常发放、补发、一次性发放                     
        notNeedPage: 'false',                //  是否不需要分页
        pageNo: this.page.toString(),       //第几页默认从1开始
        pageSize: this.pageSize.toString(), //每页几条
      })
        .then((res) => {
          console.log(res, "then");
        })
        .catch((res) => {
          console.log(res.response.data, "catch");
          if (res.response.data.status == "+OK") {
            this.tableData = res.response.data.data.content;
            this.totalElements = res.response.data.data.totalElements;
            // this.pageSize = res.response.data.data.pageSize;
            this.loading = false;
          } else {
            this.$message.error("网络错误");
            this.loading = false;
          }
        });
    },

    // 困境儿童资金列表
    getFundReleaseList (data) {
      return request({
        headers: {
          Accept: "application/json",
        },
        url: "/social/child/getFundReleaseList",
        method: "post",
        data,
      });
    },

    // 换页，修改每页数量
    handleSizeChange (val) {
      this.pageSize = val;
      this.loadData();
      console.log(`每页 ${val} 条`);
    },
    // 跳页
    handleCurrentChange (val) {
      this.page = val;
      this.loadData();
      console.log(`当前页: ${val}`);
    },
    // 查询
    queryListByCriteria () {
      console.log(this.xzqhArray);
      if (this.xzqhArray.length > 0) {
        let arr = [];
        for (let i in this.xzqhArray) {

          arr.push(this.xzqhArray[i].split('#')[0]);
        }
        this.searchData.administrativeDivision = arr.join('#')
        console.log(arr, '行政区划');
        console.log(this.searchData.administrativeDivision, '行政区划');
      };

      this.page = 1;
      this.loadData();
    },
    // 重置
    resetQuery () {
      this.searchData = {};
      this.xzqhArray = [];
    },
    // 复选
    handleSelectionChange (val) {
      // this.multipleSelection = val;
    },
    // 导出操作按钮
    handleClick (data, key) {
      // window.open("/social/child/exportFundRelease?id="+data.id,)

      var link = document.createElement("a");
      link.href = "/social/child/exportFundRelease?id=" + data.id;
      link.download = data.childType + '_儿童资金发放.xlsx';
      link.click();

      //     console.log(data,'数据');
      //     request({
      //         headers: {
      //             Accept: "application/json",
      //         },
      //         url: "/social/child/exportFundRelease?id="+data.id,
      //         method: "get",
      //         data:{
      //             // id:data.id,
      //         },
      //     }).then(res=>{
      //         console.log(res.data,'then');
      //     }).catch(res=>{
      // // console.log(res.response.data);
      // if(res.response.data.status=='+OK'){
      // this.loading=false;
      // }else{
      //     this.loading=false;
      //     this.$message.success('删除失败')

      // }

      // });
    },
    // 删除列表数据操作
    DeltClick (data) {
      this.loading = true;

      console.log(data, '数据');
      request({
        headers: {
          Accept: "application/json",
        },
        url: "/social/child/deleteFundRelease",
        method: "post",
        data: {
          id: data.id
        },
      }).then(res => {

      }).catch(res => {
        // console.log(res.response.data);
        if (res.response.data.status == '+OK') {
          this.loading = false;
          this.$message.success(res.response.data.msg)
          this.loadData();

        } else {
          this.loading = false;
          this.$message.success('删除失败')

        }

      });
    },
    // 查看按钮点击事项
    async viewRowInfo (row) {
      // 保存资金发放id
      this.viewReleaseId = row.id
      this.viewRowdialogVisible = true
      try {
        await DetailsOfFundReleaseApi({
          releaseId: row.id
        })
      } catch (error) {
        if (error && error.response && error.response.data && error.response.data.status === '+OK') {
          this.viewsData = error.response.data.data
          return console.log(this.viewsData)
        }
        return this.$message.error("获取信息失败")
      }
    },
    // 查看按钮dialog关闭前
    viewRowhandleClose () {
      this.viewRowdialogVisible = false
    },
    // 单行查看dialog中的搜索按钮
    async viewSearch () {
      let copyViewForm = {
        name: this.viewForm.name,
        idCard: this.viewForm.idCard,
      }
      try {
        this.viewSearchLoading = true
        await DetailsOfFundReleaseApi({
          name: this.viewForm.name,
          idCard: this.viewForm.idCard,
          releaseId: this.viewReleaseId,
          pageSize: this.viewsData.pageSize
        })
      } catch (error) {
        if (error && error.response && error.response.data && error.response.data.status === '+OK') {
          this.viewsData = error.response.data.data
          this.copyViewForm = copyViewForm
          return console.log(this.viewsData)
        }
        return this.$message.error("获取信息失败")
      } finally {
        this.viewSearchLoading = false
      }
    },
    // 单行查看dialog中的重置按钮
    viewReset () {
      this.viewForm.name = ""
      this.viewForm.idCard = ""
    },
    // 查看按钮dialog中的切换页码
    async viewHandleSizeChange (val) {
      try {
        await DetailsOfFundReleaseApi({
          name: this.copyViewForm.name,
          idCard: this.copyViewForm.idCard,
          releaseId: this.viewReleaseId,
          pageSize: val,
          pageNo: this.viewsData.pageNo
        })
      } catch (error) {
        if (error && error.response && error.response.data && error.response.data.status === '+OK') return this.viewsData = error.response.data.data
        return this.$message.error("获取信息失败")
      }
    },
    // 查看按钮dialog中的切换分页
    async viewHandleCurrentChange (val) {
      try {
        await DetailsOfFundReleaseApi({
          name: this.copyViewForm.name,
          idCard: this.copyViewForm.idCard,
          releaseId: this.viewReleaseId,
          pageSize: this.viewsData.pageSize,
          pageNo: val
        })
      } catch (error) {
        if (error && error.response && error.response.data && error.response.data.status === '+OK') return this.viewsData = error.response.data.data
        return this.$message.error("获取信息失败")
      }
    },
    // 查看明细按钮
    async viewDetalInfo (row) {
      try {
        this.gridData = []
        await getOneChildFundReleaseList({
          childId: row.childId
        })
      } catch (error) {
        if (error && error.response && error.response.data && error.response.data.status === '+OK') return this.gridData = error.response.data.data.content
        this.$message.error("获取失败请稍后重试")
      }
    }
  },
};
</script>

<style scoped lang="less">
/deep/.maxBox {
  .span {
    margin-right: 8px;
  }
  .input {
    width: 200px !important;
    margin-right: 10px;
  }
  .button {
    margin-right: 4px !important;
  }
  .veiwTable {
    margin-top: 10px;
  }

  .footerPaging {
    display: flex;
    justify-content: flex-end !important;
    margin-top: 6px;
  }
}
.g-box {
  display: flex;
  /* width: 100%; */
  height: 80vh;
  flex-direction: column;
  /* overflow: hidden; */
  /* box-sizing: border-box; */
}
.search {
  /*margin-left: 20px;
  margin-bottom: 50px;*/
  display: flex;
}
.search .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 240px !important;
}
.content {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.e-table {
  flex: 1;
  overflow: auto;
}
.demonstration {
  font-size: 14px;
  color: #606266;
}
.block {
  margin-right: 10px;
}
.footer {
  height: 50px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  padding-top: 10px;
  text-align: right;
  padding-right: 30px;
  /*background:#f9f9f9;*/
  background: #fff;
  border-top: 1px solid #ddd;
}
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/deep/.has-gutter th {
  text-align: center !important;
}
/deep/ .el-table__row td {
  text-align: center !important;
}
</style>
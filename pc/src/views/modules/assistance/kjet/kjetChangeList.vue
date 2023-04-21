<template>
  <div class="g-box">
    <!-- 查询 -->
    <div class="search">
      <el-form :inline="true"
               :model="searchData"
               class="demo-form-inline">
        <el-form-item label="儿童姓名"
                      label-width="110px">
          <el-input v-model="searchData.name"
                    placeholder="儿童姓名"
                    style="width: 180px"></el-input>
        </el-form-item>
        <el-form-item label="儿童身份证"
                      label-width="110px">
          <el-input v-model="searchData.idCard"
                    placeholder="儿童身份证"
                    style="width: 180px"></el-input>
        </el-form-item>
        <el-form-item label="是否健康"
                      label-width="110px">
          <el-select v-model="searchData.whetherHealth"
                     placeholder="请选择是否健康">
            <el-option v-for="item in whethers"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否残疾"
                      label-width="110px">
          <el-select v-model="searchData.whetherDisability"
                     placeholder="请选择是否残疾">
            <el-option v-for="item in whethers"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否重病"
                      label-width="110px">
          <el-select v-model="searchData.whetherSeriousIllness"
                     placeholder="请选择是否重病">
            <el-option v-for="item in whethers"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="残疾类型"
                      label-width="110px">
          <el-select v-model="searchData.disabilityType"
                     placeholder="请选择残疾类型">
            <el-option v-for="item in disabilityTypes"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="行政区划"
                      label-width="110px">
          <div class="block">
            <!-- <span class="demonstration">行政区划：</span> -->
            <el-cascader v-model="xzqhArray"
                         :props="props"
                         clearable
                         placeholder="行政区划"></el-cascader>
          </div>
        </el-form-item>
        <el-form-item label-width="110px">
          <el-button icon="el-icon-search"
                     type="primary"
                     @click="queryListByCriteria">
            查询
          </el-button>
          <el-button icon="el-icon-refresh"
                     type="info"
                     @click="resetQuery">
            重置
          </el-button>
          <!-- </div> -->
        </el-form-item>
      </el-form>
    </div>
    <el-tabs v-model="activeName"
             @tab-click="handleClickSelect">
      <el-tab-pane v-for="(item, index) in options2"
                   :key="index"
                   :label="item.listname"
                   :name="item.listname">
        <span slot="label">{{ item.value }}
          <!-- 列表数据数量显示 -->
          <span v-if="item.label && item.label <= 99"
                class="tabNum">
            {{ item.label }}
          </span>
          <span v-else-if="item.label && item.label > 99"
                class="tabNum">
            99+
          </span>
        </span>
      </el-tab-pane>
    </el-tabs>
    <el-table ref="multipleTable"
              v-loading="loading"
              :data="tableData"
              border
              height="100%"
              style="width: 100%"
              tooltip-effect="dark"
              @selection-change="handleSelectionChange">
      <el-table-column prop="selecttions"
                       type="selection"
                       width="40px"></el-table-column>
      <el-table-column align="center"
                       label="序号"
                       type="index"
                       width="50">
        <template slot-scope="scope">
          <span>{{ (page - 1) * pageSize + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="儿童姓名"
                       width="100px">
        <template slot-scope="{row}">
          <p :title="row.name"
             class="ellipsis">{{row.name}}</p>
        </template>
      </el-table-column>
      <el-table-column label="儿童身份证"
                       width="180px">
        <template slot-scope="{row}">
          <p :title="row.idCard"
             class="ellipsis">{{row.idCard}}</p>
        </template>
      </el-table-column>
      <el-table-column label="性别">
        <template slot-scope="{row}">
          <p :title="row.gender"
             class="ellipsis">{{row.gender}}</p>
        </template>
      </el-table-column>
      <el-table-column label="年龄">
        <template slot-scope="{row}">
          <p :title="row.age"
             class="ellipsis">{{row.age}}</p>
        </template>
      </el-table-column>
      <el-table-column label="健康状态">
        <template slot-scope="{row}">
          <p :title="row.healthStatus"
             class="ellipsis">{{row.healthStatus}}</p>
        </template>
      </el-table-column>
      <el-table-column label="儿童类型">
        <template slot-scope="{row}">
          <p :title="row.typeName"
             class="ellipsis">{{row.typeName}}</p>
        </template>
      </el-table-column>
      <el-table-column :formatter="formatBoolean"
                       label="是否患有重病"
                       prop="whetherSeriousIllness"
                       width="120"></el-table-column>
      <el-table-column :formatter="formString"
                       label="重病类型"
                       prop="seriousIllnessType"></el-table-column>
      <el-table-column :formatter="formatBoolean"
                       label="是否患有残疾"
                       prop="whetherDisability"
                       width="120"></el-table-column>
      <el-table-column :formatter="formString"
                       label="残疾类型"
                       prop="disabilityType"></el-table-column>
      <el-table-column :formatter="formString"
                       label="残疾等级"
                       prop="disabilityLevel"></el-table-column>
      <el-table-column label="申请人姓名"
                       width="100px">
        <template slot-scope="{row}">
          <p :title="row.name"
             class="ellipsis">{{row.name}}</p>
        </template>
      </el-table-column>
      <el-table-column v-if="false"
                       label="儿童编号"
                       width="100px">
        <template slot-scope="{row}">
          <p :title="row.childCode"
             class="ellipsis">{{row.childCode}}</p>
        </template>
      </el-table-column>
      <el-table-column v-if="false"
                       label="儿童ID"
                       width="100px">
        <template slot-scope="{row}">
          <p :title="row.childId"
             class="ellipsis">{{row.childId}}</p>
        </template>
      </el-table-column>
      <el-table-column v-if="false"
                       label="家庭编号"
                       width="100px">
        <template slot-scope="{row}">
          <p :title="row.familyCode"
             class="ellipsis">{{row.familyCode}}</p>
        </template>
      </el-table-column>
      <el-table-column label="申请时间"
                       width="100px">
        <template slot-scope="{row}">
          <p :title="row.createTime"
             class="ellipsis">{{row.createTime}}</p>
        </template>
      </el-table-column>
      <el-table-column v-if="isReturn"
                       label="初审时间"
                       width="100px">
        <template slot-scope="{row}">
          <p :title="row.auditTime"
             class="ellipsis">{{row.auditTime}}</p>
        </template>
      </el-table-column>
      <el-table-column v-if="isExamine"
                       label="初审时间"
                       width="100px">
        <template slot-scope="{row}">
          <p :title="row.auditTime"
             class="ellipsis">{{row.auditTime}}</p>
        </template>
      </el-table-column>
      <el-table-column v-if="isApproval"
                       label="审批时间"
                       width="100px">
        <template slot-scope="{row}">
          <p :title="row.approvalTime"
             class="ellipsis">{{row.approvalTime}}</p>
        </template>
      </el-table-column>
      <el-table-column v-if="isFinish"
                       label="办结时间"
                       width="100px">
        <template slot-scope="{row}">
          <p :title="row.completionTime"
             class="ellipsis">{{row.completionTime}}</p>
        </template>
      </el-table-column>
      <el-table-column fixed="right"
                       label="操作"
                       prop="active"
                       width="350px">
        <template slot-scope="scope">
          <el-button-group>
            <el-button size="small"
                       type="primary"
                       @click="handleClick(scope.row,'查看')">查看</el-button>
            <el-button size="small"
                       type="primary"
                       @click="handleClick(scope.row ,'查看核对报告')">查看核对报告</el-button>
            <!-- 申请节点的按钮 -->
            <el-button v-if="isApplication"
                       size="small"
                       type="danger"
                       @click="handleClick(scope.row ,'提交审核')">提交审核
            </el-button>
            <!-- 退回节点的按钮 -->
            <el-button v-if="isReturn"
                       size="small"
                       type="danger"
                       @click="handleClick(scope.row ,'救助申请不予批准决定书')">
              救助申请不予批准决定书
            </el-button>
            <!-- 审核节点的按钮 -->
            <el-button v-if="isExamine"
                       size="small"
                       type="danger"
                       @click="handleClick(scope.row ,'审核')">审核</el-button>
            <!-- 审批节点的按钮 -->
            <el-button v-if="isApproval"
                       size="small"
                       type="danger"
                       @click="handleClick(scope.row ,'审批')">审批</el-button>
            <!-- 办结节点的按钮 -->
            <el-button v-if="isFinish"
                       size="small"
                       type="danger"
                       @click="handleClick(scope.row ,'打印通知书')">打印通知书
            </el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页-->
    <div class="block footer">
      <el-pagination :current-page="page"
                     :page-size="pageSize"
                     :total="totalElements"
                     background
                     layout="total, sizes, prev, pager, next, jumper"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>
<script>
// import commonList from "../commonList";
import request from "@/utils/request";

export default {
  name: 'yjptsz',
  data () {
    return {
      newStatus: "申请",
      isApplication: false, 		//是否申请节点
      isReturn: false,				//是否退回节点
      isExamine: false,			//是否审核节点
      isApproval: false,			//是否审批节点
      isFinish: false,				//是否办结节点
      tabsNum2: {},       //业务节点数据数量
      //布尔类型下拉框
      whethers: [
        {
          value: 'true',
          label: '是'
        }, {
          value: 'false',
          label: '否'
        }],
      //困境儿童残疾类型 (非残疾,智力残疾,肢体残疾,听力残疾,精神残疾,视力残疾,言语残疾,多重残疾)
      disabilityTypes: [
        {
          value: '智力残疾',
          label: '智力残疾'
        }, {
          value: '肢体残疾',
          label: '肢体残疾'
        }, {
          value: '听力残疾',
          label: '听力残疾'
        }, {
          value: '精神残疾',
          label: '精神残疾'
        }, {
          value: '视力残疾',
          label: '视力残疾'
        }, {
          value: '言语残疾',
          label: '言语残疾'
        }, {
          value: '多重残疾',
          label: '多重残疾'
        }],
      //困境儿童救助类型:孤儿,事实无人抚养,重病重残,贫困家庭,其他,未知
      options: [{
        value: '孤儿',
        label: '孤儿'
      }, {
        value: '事实无人抚养',
        label: '事实无人抚养'
      }, {
        value: '重病重残',
        label: '重病重残'
      }, {
        value: '贫困家庭',
        label: '贫困家庭'
      }, {
        value: '其他',
        label: '其他'
      }, {
        value: '未知',
        label: '未知'
      }],
      //申请,退回,核查派单,信息核对,审核,审批,办结
      options2: [{
        value: '申请',
        label: 0
      }, {
        value: '退回',
        label: 0
      }, {
        value: '审核',
        label: 0
      }, {
        value: '审批',
        label: 0
      }, {
        value: '办结',
        label: 0
      }],
      activeName: "", //业务节点名
      tableData: [],
      page: 1, //当前页
      pageNum: "1",
      pageSize: 10,
      totalElements: 0, //总数
      loading: true,
      searchData: {
        name: '',//申请人姓名
        checkStatus: '',//核对状态
        disabilityTypes: '',//残疾类型
        idCard: '',	//儿童身份证
        name: '',	//儿童姓名
        pageSize: '', //每页几条
        sortField: '',//排序
        source: '',		//数据来源
        status: '',		//业务状态
        type: '',		//困境儿童救助类型
        whetherDisability: '',	//是否残疾
        whetherHealth: '',		//是否健康
        whetherSeriousIllness: '',	//是否重病
      },
      xzqhArray: [],      //行政区划搜索
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
            .then((res) => {
            })
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
    };
  },
  components: {
    // commonList,
  },
  created () {
    this.isApplication = true
    this.loadData()
    this.getStatusNums();
    this.doLayout();
  },
  methods: {
    /* 重新渲染table组件 */
    doLayout () {
      let that = this
      this.$nextTick(() => {
        that.$refs.multipleTable.doLayout()
      })
    },
    //转换后端的布尔类型
    formatBoolean (row, column, cellValue) {
      var ret = ''  //你想在页面展示的值
      if (cellValue) {
        ret = "是"  //根据自己的需求设定
      } else {
        ret = "否"
      }
      return ret;
    },
    //转换后端为空的字符
    formString (row, column, cellValue) {
      var ret = '';
      if (cellValue === '' || cellValue === null) {
        ret = "无";
      } else {
        ret = cellValue;
      }
      return ret;
    },
    //切换业务节点
    handleClickSelect () {
      this.page = 1
      this.loading = true;
      //0=申请  1=退回  2=审核  3=审批   4=办结
      if (this.activeName == 0) {
        this.newStatus = "申请";
        this.isApplication = true; 		//是否申请节点
        this.isReturn = false;				//是否退回节点
        this.isExamine = false;			//是否审核节点
        this.isApproval = false;			//是否审批节点
        this.isFinish = false;				//是否办结节点
        this.getStatusNums();
      }
      if (this.activeName == 1) {
        this.newStatus = "退回";
        this.isApplication = false; 		//是否申请节点
        this.isReturn = true;				//是否退回节点
        this.isExamine = false;			//是否审核节点
        this.isApproval = false;			//是否审批节点
        this.isFinish = false;				//是否办结节点
        this.getStatusNums();
      }
      if (this.activeName == 2) {
        this.newStatus = "审核";
        this.isApplication = false; 		//是否申请节点
        this.isReturn = false;				//是否退回节点
        this.isExamine = true;			//是否审核节点
        this.isApproval = false;			//是否审批节点
        this.isFinish = false;				//是否办结节点
        this.getStatusNums();
      }
      if (this.activeName == 3) {
        this.newStatus = "审批";
        this.isApplication = false; 		//是否申请节点
        this.isReturn = false;				//是否退回节点
        this.isExamine = false;			//是否审核节点
        this.isApproval = true;			//是否审批节点
        this.isFinish = false;				//是否办结节点
        this.getStatusNums();
      }
      if (this.activeName == 4) {
        this.newStatus = "办结";
        this.isApplication = false; 		//是否申请节点
        this.isReturn = false;				//是否退回节点
        this.isExamine = false;			//是否审核节点
        this.isApproval = false;			//是否审批节点
        this.isFinish = true;			//是否办结节点
        this.getStatusNums();
      }
      this.loadData();
      this.doLayout();
    },
    // 换页
    handleSizeChange (val) {
      this.pageSize = val;
      this.loadData();
      console.log(`每页 ${val} 条`);
    },
    // 跳页
    handleCurrentChange (val) {
      this.page = val
      this.loadData();
      console.log(`当前页: ${val}`);
    },

    // 查询
    queryListByCriteria () {
      this.page = 1;
      this.loadData();
      this.getStatusNums();
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

    // 操作按钮
    handleClick (data, key) {
      if (key == '查看') {
        if (process.env.NODE_ENV == "development") {  //生产环境执行
          // grade 信息显示等级 1：区（市）2：街道； confirmationDate 选择的年月
          this.$router.push({ path: '/social/assistance/kjet/kjetListView?type=变更&id=' + data.childId + '&changeId=' + data.changeId, });
        } else {
          this.$pushRouter({ path: generalConfig.defaultUrl + '/social/assistance/kjet/kjetListView?type=变更&id=' + data.childId + '&changeId=' + data.changeId, })
        }
      } else if (key == '提交审核') {
        this.$confirm('此操作将提交数据到审核, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.submitToExamine({
            "id": data.changeId,
            "result": '同意',
            // data:this.searchData
          }).then((res) => {
            console.log(res, 'then');
          }).catch((res) => {
            if (res.response.data.status == '+OK') {
              this.loadData()
              this.$message({
                type: 'success',
                message: '提交至审核成功!'
              });
              this.getStatusNums();
            } else {
              this.loadData()
              this.$message({
                type: 'info',
                message: '提交至审核失败'
              });
            }

          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消提交到审核'
          });
        })
      } else if (key == '审核') {
        if (process.env.NODE_ENV == "development") {  //生产环境执行
          // grade 信息显示等级 1：区（市）2：街道； confirmationDate 选择的年月
          this.$router.push({ path: '/social/assistance/kjet/kjetListView?type=审核&id=' + data.childId + '&changeId=' + data.changeId, });
        } else {
          this.$pushRouter({ path: generalConfig.defaultUrl + '/social/assistance/kjet/kjetListView?type=审核&id=' + data.childId + '&changeId=' + data.changeId, })
        }
      } else if (key == '审批') {
        if (process.env.NODE_ENV == "development") {  //生产环境执行
          // grade 信息显示等级 1：区（市）2：街道； confirmationDate 选择的年月
          this.$router.push({ path: '/social/assistance/kjet/kjetListView?type=审批&id=' + data.childId + '&changeId=' + data.changeId, });
        } else {
          this.$pushRouter({ path: generalConfig.defaultUrl + '/social/assistance/kjet/kjetListView?type=审批&id=' + data.childId + '&changeId=' + data.changeId, })
        }
      }

      console.log(data);
    },
    loadData () {
      this.loading = true;
      // this.searchData;
      this.kjetList({
        name: this.searchData.name,
        checkStatus: this.searchData.checkStatus,
        disabilityTypes: this.searchData.disabilityTypes,
        idCard: this.searchData.idCard,
        name: this.searchData.name,
        source: this.searchData.source,
        status: this.newStatus,
        type: this.searchData.type,
        whetherDisability: this.searchData.whetherDisability,
        whetherHealth: this.searchData.whetherHealth,
        whetherSeriousIllness: this.searchData.whetherSeriousIllness,
        divisionCode: this.searchData.completeDivisionCode,
        pageNo: this.page,//第几页默认从0开始
        pageSize: this.pageSize,//每页几条
        // data:this.searchData
      }).then((res) => {
        console.log(res, 'then');
      }).catch((res) => {

        console.log(res.response.data, 'catch');
        if (res.response.data.status == '+OK') {
          this.tableData = res.response.data.data.content
          this.totalElements = res.response.data.data.totalElements
          this.totalPages = res.response.data.data.totalPages
          // this.tableData = JSON.parse(JSON.stringify(res.response.data.data) )
          // console.log(this.tableData);
          this.loading = false;
          this.getStatusNums();

        } else {
          this.$message.error('网络错误');
          this.loading = false;
        }


      })
    },
    getStatusNums () {
      this.getChildNumsGroupByStatus({
        name: this.searchData.name,
        checkStatus: this.searchData.checkStatus,
        disabilityType: this.searchData.disabilityType,
        idCard: this.searchData.idCard,
        name: this.searchData.name,
        source: this.searchData.source,
        whetherDisability: this.searchData.whetherDisability,
        whetherHealth: this.searchData.whetherHealth,
        whetherSeriousIllness: this.searchData.whetherSeriousIllness,
        divisionCode: this.searchData.completeDivisionCode
      }).then((res) => {

      }).catch((res) => {

        for (var i = 0; i < this.options2.length; i++) {
          if (this.options2[i].value == '申请') {
            this.options2[i].label = res.response.data.data.申请
          }
          if (this.options2[i].value == '退回') {
            this.options2[i].label = res.response.data.data.退回
          }
          if (this.options2[i].value == '审核') {
            this.options2[i].label = res.response.data.data.审核
          }
          if (this.options2[i].value == '审批') {
            this.options2[i].label = res.response.data.data.审批
          }
          if (this.options2[i].value == '办结') {
            this.options2[i].label = res.response.data.data.办结
          }
        }
        // console.log(this.options2[1].value)
        // console.log("业务节点数量",res.response.data.data.核查派单)
      })
    },
    //查询变更表的列表接口
    kjetList (data) {
      return request({
        headers: {
          Accept: "application/json",
        },
        url: "/social/childChange/getList",
        method: "post",
        data: data,
      });
    },

    //信息核对提交到审核
    submitToExamine (data) {
      return request({
        headers: {
          Accept: "application/json",
        },
        url: "/social/childChange/childSubmitToExamine",
        method: "post",
        data: data,
      });
    },
    //获取各节点数据
    getChildNumsGroupByStatus (data) {
      return request({
        headers: {
          Accept: "application/json",
        },
        url: "/social/childChange/getChildNumsGroupByStatus",
        method: "post",
        data: data,
      });
    },

  }
};
</script>
<style scoped lang="less">
.g-box {
  display: flex;
  /* width: 100%; */
  height: 80vh;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
}

.search {
  display: flex;
}

.search .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 240px !important;
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
/deep/.has-gutter th {
  text-align: center !important;
}
/deep/ .el-table__row td {
  text-align: center !important;
}
</style>
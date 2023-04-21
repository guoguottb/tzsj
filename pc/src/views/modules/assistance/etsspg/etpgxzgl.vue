
<template>
  <div class="g-box">
    <!-- 查询 -->
    <div class="search">
      <el-form :inline="true"
               :model="searchData"
               class="demo-form-inline">

        <el-form-item label-width="110px"
                      label="小组名称">
          <el-input v-model="searchData.title"
                    placeholder="小组名称"
                    style="width: 180px"></el-input>
        </el-form-item>

        <el-form-item label-width="110px">
          <el-button type="primary"
                     @click="queryListByCriteria"
                     icon="el-icon-search">
            查询</el-button>
          <el-button type="info"
                     @click="resetQuery"
                     icon="el-icon-refresh">
            重置</el-button>
          <el-button type="primary"
                     @click="addGroup"
                     icon="el-icon-menu">

            新增小组</el-button>
          <!-- </div> -->
        </el-form-item>
      </el-form>
    </div>

    <!-- 表格 -->
    <el-table ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              border
              style="width: auto"
              @selection-change="handleSelectionChange"
              height="100%"
              v-loading="loading">
      <el-table-column type="selection"
                       width="40px"> </el-table-column>

      <el-table-column label="评估主体">
        <template slot-scope="{row}">
          <p :title="row.evaluateSubject"
             class="ellipsis">{{row.evaluateSubject}}</p>
        </template>
      </el-table-column>
      <el-table-column label="组长">
        <template slot-scope="{row}">
          <p :title="row.leader"
             class="ellipsis">{{row.leader}}</p>
        </template>
      </el-table-column>
      <el-table-column label="小组成员">
        <template slot-scope="{row}">
          <p :title="row.persons"
             class="ellipsis">{{row.persons}}</p>
        </template>
      </el-table-column>
      <el-table-column label="小组名称">
        <template slot-scope="{row}">
          <p :title="row.title"
             class="ellipsis">{{row.title}}</p>
        </template>
      </el-table-column>

      <!-- <el-table-column prop="evaluator" label="评估人员" width="80px"></el-table-column> -->

      <el-table-column prop="active"
                       label="操作"
                       width="140px">
        <template slot-scope="scope">
          <el-button-group :inline="true">
            <el-button @click="handleClick(scope.row,'修改')"
                       type="primary"
                       size="small">修改</el-button>
            <!-- <el-button  @click="handleClick(scope.row,'删除')" type="danger" size="small">删除</el-button> -->

          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页-->
    <div class="block footer">
      <el-pagination background
                     layout="total, sizes, prev, pager, next, jumper"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="pageNo"
                     :page-size="pageSize"
                     :total="totalElements">
      </el-pagination>
    </div>

    <!-- 评估任务弹框 -->
    <el-dialog title="儿童风险评估小组"
               :visible.sync="dialogVisible"
               width="40%"
               :before-close="handleClose">
      <div class="content">
        <div v-for="(item,index) in [groupObj] "
             :key="index">
          <el-form ref="item"
                   :model="item"
                   label-width="100px"
                   :rules="rules"
                   class="Card">

            <el-form-item label="评估主体"
                          prop="evaluateSubject">
              <el-select v-model="item.evaluateSubject"
                         placeholder="请选择评估主体">
                <el-option label="民政机构"
                           value="民政机构"></el-option>
                <el-option label="民政委托的机构"
                           value="民政委托的机构"></el-option>
                <el-option label="第三方评估机构"
                           value="第三方评估机构"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="小组名称"
                          prop="title">
              <el-input v-model="item.title"></el-input>
            </el-form-item>

            <el-form-item label="小组成员"
                          prop="memberIds">
              <!-- <el-input v-model="item.memberIds"></el-input> -->
              <el-select v-model="groupObj.memberIds"
                         @change="seeList('组员')"
                         multiple
                         filterable
                         placeholder="请选择"
                         style="width:100%">
                <el-option v-for="item in options"
                           :key="item.id"
                           :label="item.name"
                           :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="小组长"
                          prop="leaderId">
              <!-- <el-input v-model="item.leaderId" ></el-input> -->
              <el-select v-model="groupObj.leaderId"
                         @change="seeList('组长')"
                         filterable
                         placeholder="请选择"
                         style="width:100%">
                <el-option v-for="item in options2"
                           :key="item.id+'2'"
                           :label="item.name"
                           :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>

          </el-form>
        </div>
      </div>

      <span slot="footer"
            class="dialog-footer">

        <el-button @click="closeView">取 消</el-button>

        <el-button type="primary"
                   @click="save">确 定</el-button>

      </span>
    </el-dialog>
  </div>
</template>
<script>
// import commonList from "../commonList";
import request from "@/utils/request";
import { Loading } from "element-ui";
export default {
  name: 'yjptsz',
  data () {
    return {

      // 搜索内容
      searchData: {
        title: '',   // 小组名称-查询条件
        notNeedPage: '', // 是否不需要分页-导出条件
        pageNo: '1',     //第几页,默认从1开始
        pageSize: '', //每页几条
        sortField: '',//排序
      },

      dialogVisible: false,  //评估小组信息弹框显示

      tableData: [         //列表数据

        {
          evaluateSubject: "",    // 评估主体
          leader: "",             // 组长
          persons: "",            // 人员
          title: ""               // 小组名称
        }

      ],


      pageNo: 1, //当前页
      pageNum: "1",
      pageSize: 20,
      totalElements: 25, //总数
      loading: true,
      options: [],     //评估人员列表
      options2: [],     //评估小组长选项列表


      // 新增、修改评估任务弹框内容
      groupObj: {
        evaluateSubject: '',      // 评估主体
        memberIds: [],           // 小组成员ID 
        members: '',           // 小组成员ID 
        // groupId: '',             // 小组ID-查看时使用后端生成
        leader: '',             // 小组长姓名
        leaderId: '',            // 小组长ID
        title: '',                // 小组名

      },
      rules: {
        title: [
          { required: true, message: '请输入任务名称', trigger: 'blur' },
        ],
        administrativeDivisions: [
          { required: true, message: '请选择评估范围', trigger: 'blur' }
        ],
        evaluateSubject: [
          { required: true, message: '请选择评估主体', trigger: 'blur' }
        ],
        evaluatorIds: [
          { required: true, message: '请指派评估人员', trigger: 'blur' }
        ],

      },


    };
  },

  components: {
    // commonList,
  },
  created () {
    // this.isApplication=true	
    this.loadData()
    this.getEvaluator();
  },
  methods: {

    // 整合小组和组长id
    seeList (key) {

      if (key == '组员') {
        // 将选择的小组成员作为选择组长的列表
        this.options2 = [];
        for (let i in this.options) {
          for (let j in this.groupObj.memberIds) {

            if (this.options[i].id == this.groupObj.memberIds[j]) {
              this.options2.push(this.options[i])
            }
          }
        }
      } else if (key == '组长') {
        console.log(this.groupObj.leader);


      }


      console.log(this.groupObj);
      console.log(this.options2);

    },

    // 保存
    save () {

      this.saveEvaluateGroup(
        this.groupObj
      ).then(res => {

      }).catch(res => {


        if (res.response.data.status == "+OK") {

          this.$message.success(res.response.data.msg)
          this.closeView();
          this.loadData();

        } else {

          this.$message.error(res.response.data.msg)

        }

      })


    },

    // 关闭窗口
    closeView () {
      this.dialogVisible = false;

      // 小组对象数据清空
      this.groupObj = {};
    },



    // 关闭弹框
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },

    // 新增小组
    addGroup () {
      this.dialogVisible = true;
      console.log(this.groupObj, '新增小组对象');
    },

    // 操作--修改按钮
    handleClick (data, key) {
      console.log(data, '操作行数据');

      if (key == '修改') {
        this.groupObj = data
        this.dialogVisible = true;
      }

      let memberIds = [];

      for (let i in this.groupObj.evaluators) {
        // memberIds[i].id=this.groupObj.evaluators[i].id;
        // memberIds[i].name=this.groupObj.evaluators[i].name;
        memberIds.push(this.groupObj.evaluators[i].id);

      }
      // this.groupObj.memberIds =  this.groupObj.persons;
      this.groupObj.memberIds = memberIds;
      this.options2 = this.groupObj.evaluators
      console.log(this.groupObj, '修改数据对象');
    },
    loadData () {

      this.loading = true;

      this.getListData({
        data: this.searchData
      }).then(res => {
        console.log(res, 'then');

      }).catch(res => {
        console.log(res, 'catch');
        this.tableData = res.response.data.data.content

        this.loading = false;
      })

      // this.loading = false;

    },

    // 获取评估小组列表
    getListData (data) {
      return request({
        headers: {
          Accept: "application/json",
        },
        url: "/social/childEvaluate/getEvaluateGroupList",
        method: "post",
        data: data,
      });
    },

    // 保存评估小组
    saveEvaluateGroup (data) {
      return request({
        headers: {
          Accept: "application/json",
        },
        url: "/social/childEvaluate/saveEvaluateGroup",
        method: "post",
        data: data,
      });
    },

    // 评估人员列表
    getEvaluator (data) {
      request({
        headers: {
          Accept: "application/json",
        },
        url: "/social/childEvaluate/getEvaluator",
        method: "post",
        data: {},
      }).then(res => {

      }).catch(res => {
        console.log(res.response.data.data);
        this.options = res.response.data.data.content
      });
    },

    // 换页
    handleSizeChange (val) {
      this.pageSize = val;
      this.searchData.pageSize = val;
      this.loadData();
      console.log(`每页 ${val} 条`);
    },
    // 跳页
    handleCurrentChange (val) {
      this.pageNo = val;
      this.searchData.pageNo = val;

      this.loadData();
      console.log(`当前页: ${val}`);
    },

    // 查询
    queryListByCriteria () {
      this.pageNo = 1;
      this.loadData();

    },
    // 重置
    resetQuery () {
      this.searchData = ''
    },

    // 复选
    handleSelectionChange (val) {
      // this.multipleSelection = val;
    },


  }
};
</script>
<style scoped>
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

.content {
  max-height: 500px;
  overflow: auto;
}
.Card {
  /* border: 1px solid #ddd; */
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  /* font-weight: ; */
  /* -webkit-box-shadow: 10px 10px 5px #888888; */
  /* box-shadow: 0 2px 12px 0 rgb(196 196 196); */
}
</style>
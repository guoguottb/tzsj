
<template>
  <div class="g-box">
    <!-- 查询 -->
    <div class="search">
      <el-form :inline="true"
               :model="searchData"
               class="demo-form-inline">
        <el-form-item label-width="110px"
                      label="任务名称">
          <el-input v-model="searchData.title"
                    placeholder="任务名称"
                    style="width: 180px"></el-input>
        </el-form-item>
        <el-form-item label-width="110px"
                      label="批次编号">
          <el-input v-model="searchData.title"
                    placeholder="批次编号"
                    style="width: 180px"></el-input>
        </el-form-item>

        <el-form-item label-width="110px"
                      label="任务创建时间">
          <el-date-picker @change="getTime(value1)"
                          value-format="yyyy-MM-dd"
                          v-model="value1"
                          type="daterange"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期">
          </el-date-picker>
          <!-- <el-input  v-model="searchData.idCard" placeholder="开始时间" style="width: 180px"></el-input> -->
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
                     @click="pgPF"
                     icon="el-icon-folder-add">
            儿童评估任务派发</el-button>
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
      <el-table-column label="批次编号">
        <template slot-scope="{row}">
          <p :title="row.id"
             class="ellipsis">{{row.id}}</p>
        </template>
      </el-table-column>
      <el-table-column label="任务名称">
        <template slot-scope="{row}">
          <p :title="row.title"
             class="ellipsis">{{row.title}}</p>
        </template>

      </el-table-column>
      <!-- <el-table-column prop="address" label="评估范围" width="15"> </el-table-column> -->
      <el-table-column label="儿童数量">
        <template slot-scope="{row}">
          <p :title="row.number"
             class="ellipsis">{{row.number}}</p>
        </template>
      </el-table-column>
      <el-table-column label="组长"
                       width="80px">
        <template slot-scope="{row}">
          <p :title="row.leader"
             class="ellipsis">{{row.leader}}</p>
        </template>
      </el-table-column>
      <el-table-column label="评估主体"
                       width="120px">
        <template slot-scope="{row}">
          <p :title="row.evaluateSubject"
             class="ellipsis">{{row.evaluateSubject}}</p>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="evaluator" label="评估人员" width="80px"></el-table-column> -->
      <el-table-column label="任务创建时间"
                       width="160px">
        <template slot-scope="{row}">
          <p :title="row.createTime"
             class="ellipsis">{{row.createTime | formatDate}}</p>
        </template>
      </el-table-column>
      <el-table-column label="任务开始时间"
                       width="160px">
        <template slot-scope="{row}">
          <p :title="row.startTime"
             class="ellipsis">{{row.startTime | formatDate}}</p>
        </template>
      </el-table-column>
      <el-table-column label="任务结束时间"
                       width="160px">
        <template slot-scope="{row}">
          <p :title="row.endTime"
             class="ellipsis">{{row.endTime | formatDate}}</p>
        </template>
      </el-table-column>

      <el-table-column prop="active"
                       label="操作"
                       width="280px">
        <!-- 添加操作列浮动功能该列样式会错乱 -->
        <!-- <el-table-column prop="active"  label="操作" width="220px" fixed="right"> -->

        <template slot-scope="scope">
          <el-button-group :inline="true"
                           style=" width=100% ">
            <el-button @click="handleClick(scope.row,'查看')"
                       type="primary"
                       size="small">查看</el-button>
            <el-button @click="handleClick(scope.row,'修改')"
                       type="primary"
                       size="small">修改</el-button>
            <el-button @click="handleClick(scope.row,'开始')"
                       type="primary"
                       size="small">开始任务</el-button>
            <!-- <el-button  @click="del(scope.row,'删除')" type="danger" size="small">删除</el-button> -->
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
    <el-dialog title="儿童风险评估任务指派"
               :visible.sync="dialogVisible"
               width="40%"
               :before-close="handleClose">
      <!-- <el-button  @click="addTask" type="primary" size="small" v-if="!isDisabled">新增任务</el-button> -->
      <div class="content">
        <div v-for="(item,index) in taskArr "
             :key="index">
          <el-divider content-position="left"><span style="font-weight:600">评估任务{{index*1+1}}</span> </el-divider>

          <el-form :disabled='isDisabled'
                   ref="item"
                   :model="item"
                   label-width="120px"
                   :rules="rules"
                   class="Card">

            <el-form-item label="任务名称"
                          prop="title">
              <el-row :span="24"
                      :gutter="22">
                <el-col :span="16"
                        :xs="12">
                  <el-input v-model="item.title"></el-input>
                </el-col>
                <!-- <el-col :span="6" :xs="12">
                                <el-button type="danger" v-if="!isDisabled" @click="onSubmit('del',index)">删除</el-button>
                            </el-col> -->
              </el-row>
            </el-form-item>

            <el-form-item label="评估范围"
                          prop="administrativeDivisions">
              <!-- <el-row :span="24"   v-for="(item1,index1) in pgfw" :key="index1" style="margin-bottom:10px"> -->
              <el-row :span="24"
                      style="margin-bottom:10px">
                <!-- 区划 -->
                <el-col :span="8"
                        :xs="12">
                  <el-cascader width="100%"
                               placeholder="请选择评估范围"
                               v-model="pgfw"
                               :props="props"
                               style="width:90%"></el-cascader>
                </el-col>
                <!-- 
                            本来评估范围预计功能是多选的，但是由于功能没有完善，所以就暂时注释掉了

                           -->
                <!-- <el-col :span="5" :xs="11" style="margin-left:10px">
                                <el-button  type="success" @click="onSubmit('add',index)" v-if="!isDisabled">新增</el-button>
                                <el-button  type="danger" @click="onSubmit('del',index)">删除</el-button>
                            </el-col> -->
              </el-row>
            </el-form-item>
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
            <el-form-item v-if="(item.evaluateSubject=='民政机构')"
                          label="评估小组1"
                          prop="evaluatorIds">
              <!-- <el-select v-model="item.evaluatorIds" placeholder="请指派评估人员"> -->
              <!-- <el-option v-for="(item3,index3) in options" :key="index3" :label="item3.label" :value="item3.value"></el-option> -->
              <!-- </el-select> -->
              <el-cascader width="100%"
                           placeholder="请指派评估小组"
                           v-model="pgfw"
                           :props="props"
                           style="width:90%"></el-cascader>
            </el-form-item>
            <el-form-item v-else-if="(item.evaluateSubject=='民政委托的机构')"
                          label="评估小组2"
                          prop="evaluatorIds">
              <el-select v-model="item.evaluatorId"
                         placeholder="请指派评估小组">
                <el-option v-for="(item3,index3) in wtGroup"
                           :key="index3"
                           :label="item3.label"
                           :value="item3.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-else-if="(item.evaluateSubject=='第三方评估机构')"
                          label="评估小组3"
                          prop="evaluatorIds">
              <el-select v-model="item.groupId"
                         placeholder="请指派评估小组">
                <el-option v-for="(item3,index3) in dsfGroup"
                           :key="index3"
                           :label="item3.title"
                           :value="item3.groupId"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="item.id"
                          label="创建时间"
                          prop="createTime">
              <el-input v-model="item.createTime"
                        disabled='true'></el-input>
            </el-form-item>

            <!-- </el-col>
                    </el-row> -->

          </el-form>
        </div>
      </div>

      <span slot="footer"
            class="dialog-footer">

        <el-button @click="dialogVisible = false">取 消</el-button>
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
      isDisabled: false,  //是否查看  查看--禁用  新增、修改--不禁用
      // 搜索内容
      searchData: {
        endTime: '',  // 创建结束时间-查询条件
        startTime: '',  // 创建开始时间-查询条件
        title: '',  // 任务名称-查询条件
        notNeedPage: '', // 是否不需要分页-导出条件
        pageNo: '1',     //第几页,默认从1开始
        pageSize: '', //每页几条
        sortField: '',//排序
      },
      value1: '',

      dialogVisible: false,  //评估任务生成弹框显示
      tableData: [         //列表数据
        {
          id: '1',
          title: '任务一',
          number: '25',
          leader: '张三',  //组长
          evaluateSubject: '第三方机构',
          evaluator: '张三、李四',
          createTime: '2022-10-26',
        },

      ],

      pageNo: 1, //当前页
      pageNum: "1",
      pageSize: 20,
      totalElements: 25, //总数
      loading: true,

      // 新增、修改评估任务弹框内容
      taskArr: [
        {
          title: '',                       //任务名称
          administrativeDivisions: [],     //评估范围
          evaluateSubject: '',             //评估主体
          evaluatorIds: [],                //评估人员

        }
      ],
      pgfw: [], //评估范围

      dsfGroup: [],//第三方评估小组 

      // 评估小组都应该是后端传的，以下是假数据
      wtGroup: [ //委托评估小组
        {
          value: '评估人员1',
          label: '评估人员1'
        }, {
          value: '评估人员2',
          label: '评估人员2'
        },
      ],



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
    };
  },

  components: {
    // commonList,
  },
  created () {
    // this.isApplication=true	
    this.loadData()
    this.getEvaluateGroupList()

  },
  methods: {

    aa () {
      console.log(123);
    },

    // 评估开始时间结束时间
    getTime (data) {
      console.log(data);

      this.searchData.endTime = data[1] + ' 23:59:00';
      this.searchData.startTime = data[0] + ' 00:00:00';
    },

    // 打开自理评估人员
    openList (event) {

    },

    // // 删除儿童评估任务
    // del(){

    // },

    // 新增任务
    addTask () {
      let obj = {
        title: '',                       //任务名称
        administrativeDivisions: [],     //评估范围
        evaluateSubject: '',             //评估主体
        evaluatorIds: [],                //评估人员
      };

      this.taskArr.push(obj);
    },

    // 新增评估范围
    onSubmit (key, index) {
      let obj2 = "";

      if (key == 'add') {
        this.pgfw.push(obj2);
      }

      console.log(key, index);
      console.log(this.pgfw);
      this.taskArr[index].administrativeDivisions = this.pafw
    },

    // 保存--新增评估范围的逻辑还没完善
    save () {

      console.log(this.pgfw);

      let qh = '';
      for (let i in this.pgfw) {
        if (i < this.pgfw.length - 1) {

          qh += this.pgfw[i].split('#')[0] + '#'
        } else {
          qh += this.pgfw[i].split('#')[0]

        }
      }


      this.taskArr[0].administrativeDivisions.push(qh);
      console.log(qh, '区划');
      console.log(this.taskArr, '任务');

      // this.$refs['taskArr'].validate((valid) => {
      //     if (!valid) {
      // 			return false;
      // 		}
      // });

      // let msgs = this.validate();

      // if(msgs){
      //     this.$message.warning(msgs);
      // return false
      // }


      // let data = {};


      // console.log(data);

      this.createEvaluateTask(
        this.taskArr
      ).then(res => {

      }).catch(res => {

        if (res.response.data.status == "+OK") {
          this.$message.success(res.response.data.msg);
          this.dialogVisible = false;
          this.loadData();

        } else {

          this.$message.error(res.response.data.msg)

        }

      })


    },

    // 派发事件 --新增派发任务
    pgPF () {
      this.addTask = [];
      this.dialogVisible = true;
      this.isDisabled = false;
      this.addTask[0] = {
        title: '',                       //任务名称
        administrativeDivisions: [],     //评估范围
        evaluateSubject: '',             //评估主体
        evaluatorIds: [],                //评估人员
      };
    },

    // 关闭弹框
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },



    // 操作按钮
    handleClick (data, key) {
      console.log(data, key);

      if (key == '开始') {
        this.startTask({
          id: data.id
        }).then(res => {
          console.log(res, 'then');
        }).catch(res => {
          console.log(res, 'catch');
          this.$message.success(res.response.data.msg);
          this.loadData()
        })
      } else if (key == '查看') {

        this.dialogVisible = true;
        this.isDisabled = true;
        this.taskArr[0] = data;

      } else if (key == '修改') {

        this.dialogVisible = true;
        this.isDisabled = false;
        this.taskArr[0] = data;

      }


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



    },

    // 获取评估小组列表
    getEvaluateGroupList () {
      request({
        headers: {
          Accept: "application/json",
        },
        url: "/social/childEvaluate/getEvaluateGroupList",
        method: "post",
        data: {},
      }).then(res => {
        console.log(res, '获取评估小组列表-then');
      }).catch(res => {
        console.log(res.response.data, '获取评估小组列表-catch');
        this.dsfGroup = res.response.data.data.content
      });
    },

    // 获取评估任务列表数据
    getListData (data) {
      return request({
        headers: {
          Accept: "application/json",
        },
        url: "/social/childEvaluate/getTaskList",
        method: "post",
        data: data,
      });
    },

    // 创建四色评估任务
    createEvaluateTask (data) {
      return request({
        headers: {
          Accept: "application/json",
        },
        url: "/social/childEvaluate/createEvaluateTask",
        method: "post",
        data: data,
      });
    },

    // 开始四色评估任务
    startTask (data) {
      return request({
        headers: {
          Accept: "application/json",
        },
        url: "/social/childEvaluate/startTask",
        method: "post",
        data: data,
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
/deep/.has-gutter th {
  text-align: center !important;
}
/deep/ .el-table__row td {
  text-align: center !important;
}
</style>
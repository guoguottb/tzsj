<!-- 设置预警条件 -->
<template>
  <div class="g-box">
    <!-- 查询 -->
    <div class="search">

      <el-form :inline="true"
               :model="searchData"
               class="demo-form-inline">
        <el-form-item label-width="110px"
                      label="预警名称">
          <el-input v-model="searchData.name"
                    placeholder="预警名称"
                    style="width: 180px"></el-input>
        </el-form-item>

        <el-form-item label-width="110px"
                      label="预警状态">
          <el-select v-model="searchData.status"
                     placeholder="请选择">
            <el-option v-for="item in yjztoptions"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value"> </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label-width="110px">
          <el-button type="primary"
                     @click="queryListByCriteria"
                     icon="el-icon-search">查询</el-button>

          <el-button type="info"
                     @click="resetQuery"
                     icon="el-icon-refresh">重置</el-button>

          <el-button type="primary"
                     @click="addYjtj"
                     icon="el-icon-refresh">新增预警条件</el-button>

          <el-button type="success"
                     @click="onClick">导入excel文件</el-button>
          <input class="file"
                 ref="uploadInput"
                 type="file"
                 accept=".xls,.xlsx"
                 style="opacity:0"
                 enctype="multipart/form-data"
                 @change="readExcel($event)" />
        </el-form-item>
      </el-form>
    </div>

    <!-- 表格 -->
    <el-table ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              border
              @selection-change="handleSelectionChange"
              height="100%"
              v-loading="loading">
      <el-table-column type="selection"
                       width="55px"> </el-table-column>
      <el-table-column label="预警名称"
                       width="120px">
        <template slot-scope="{row}">
          <p :title="row.ruleName"
             class="ellipsis">{{row.ruleName}}</p>
        </template>
      </el-table-column>
      <el-table-column label="预警内容条件">
        <template slot-scope="{row}">
          <p :title="row.content"
             class="ellipsis">{{row.content}}</p>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="dsl" label="查询语句" width="120px"></el-table-column> -->
      <el-table-column label="预警频率"
                       width="120">
        <template slot-scope="{row}">
          <p :title="row.days"
             class="ellipsis">{{row.days}}</p>
        </template>
      </el-table-column>
      <el-table-column label="预警方式"
                       width="120">
        <template slot-scope="{row}">
          <p :title="row.mode"
             class="ellipsis">{{row.mode}}</p>
        </template>
      </el-table-column>
      <el-table-column label="下次预警时间">
        <template slot-scope="{row}">
          <p :title="row.nextTimeStr"
             class="ellipsis">{{row.nextTimeStr}}</p>
        </template>
      </el-table-column>
      <el-table-column label="预警状态"
                       width="120">
        <template slot-scope="{row}">
          <p :title="row.status"
             class="ellipsis">{{row.status}}</p>
        </template>
      </el-table-column>

      <el-table-column prop="active"
                       label="操作"
                       width="280">
        <template slot-scope="scope">
          <el-button-group style=" width=100% ">
            <el-button @click="handleClick(scope.row,'正在使用')"
                       type="primary"
                       size="small">开始</el-button>
            <el-button @click="handleClick(scope.row ,'停止使用')"
                       type="danger"
                       size="small">停止</el-button>
            <el-button @click="changeData(scope.row ,'修改')"
                       type="primary"
                       size="small">修改</el-button>
            <el-button @click="handleClick(scope.row ,'删除')"
                       type="danger"
                       size="small">删除</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="block footer">
      <!-- <span class="demonstration">完整功能</span> -->
      <el-pagination background
                     layout="total, sizes, prev, pager, next, jumper"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="page"
                     :page-size="pageSize"
                     :total="totalElements">
      </el-pagination>
    </div>

    <!-- 新增，修改弹框 -->
    <el-dialog :title="btnName"
               :visible.sync="dialogVisible"
               width="60%"
               :before-close="handleClose">

      <!-- <div>这是一段信息</div> -->
      <el-form ref="form"
               :model="form"
               label-width="150px"
               :rules="rules"
               style="max-height:500px;overflow:auto;">
        <el-form-item label="预警名称"
                      prop="ruleName">
          <el-input v-model="form.ruleName"></el-input>
        </el-form-item>

        <el-form-item label="预警内容条件"
                      prop="rules">
          <el-row :span="24"
                  v-for="(item,index) in form.rules"
                  :key="index"
                  style="margin-bottom:10px">
            <el-col :span="6"
                    :xs="12">

              <el-select v-model="item.name"
                         filterable
                         placeholder="字段">
                <el-option v-for="item1 in zd"
                           :key="item1.value"
                           :label="item1.label"
                           :value="item1.value"></el-option>
              </el-select>
            </el-col>

            <el-col :span="6"
                    :xs="12">
              <el-select v-model="item.connector"
                         placeholder="连接符">
                <el-option v-for="(item2,index2) in connector"
                           :key="index2"
                           :label="item2.label"
                           :value="item2.value"></el-option>
              </el-select>
            </el-col>

            <el-col :span="6"
                    :xs="12">
              <el-input v-model="item.value"
                        placeholder="值"></el-input>
            </el-col>

            <el-col :span="5"
                    :xs="11"
                    style="margin-left:10px">
              <el-button v-if="index == 0"
                         type="success"
                         @click="onSubmit('add')">新增</el-button>
              <el-button v-if="index > 0"
                         type="danger"
                         @click="onSubmit('del',index)">删除</el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="预警频率（天）"
                      prop="days">
          <el-input v-model="form.days"
                    placeholder="请输入天数"
                    type="number"></el-input>
        </el-form-item>
        <el-form-item label="预警方式"
                      prop="mode">
          <el-select v-model="form.mode"
                     placeholder="请选择预警方式">
            <el-option label="手动"
                       value="手动"></el-option>
            <el-option label="自动"
                       value="自动"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="下次预警（天）">
          <el-input v-model="form.nextTimeStr"
                    readonly
                    disabled
                    type="number"></el-input>
        </el-form-item>
        <el-form-item label="预警状态"
                      prop="status">
          <el-select v-model="form.status"
                     placeholder="请选择预警状态">
            <el-option v-for="(item3,index3) in yjztoptions"
                       :key="index3"
                       :label="item3.label"
                       :value="item3.value"></el-option>
          </el-select>
        </el-form-item>

      </el-form>

      <span slot="footer"
            class="dialog-footer">

        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="save">确 定</el-button>

      </span>
    </el-dialog>
    <!-- 导入excel dialog -->
    <el-dialog title="提示"
               :visible.sync="exportExceldialogVisible"
               width="30%"
               :before-close="exportExcelHandleClose">
      <p style="marginBottom:4px">请选择或输入excel类型:</p>
      <el-select v-model="updataType"
                 style="width:100%"
                 :multiple="false"
                 filterable
                 allow-create
                 default-first-option
                 placeholder="请选择或输入excel类型">
        <el-option v-for="item in options"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>
      <p style="marginBottom:4px；marginTop:4px">请输入excel描述:</p>
      <el-input type="textarea"
                placeholder="请输入内容"
                v-model="excelExplain"
                maxlength="50"
                show-word-limit>
      </el-input>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="exportExcelHandleClose">取 消</el-button>
        <el-button type="primary"
                   @click="confirmExportExcel">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// import commonList from "../commonList";
import request from "@/utils/request";
import { Loading } from "element-ui";
import * as XLSX from 'xlsx'
import { exportExcelApi } from "@/api/yjptxt/SettingWarning"
export default {
  name: 'yjptsz',
  // 组件
  components: {
    // commonList,
  },
  data () {
    return {
      //预警状态
      yjztoptions: [
        {
          value: '未使用',
          label: '未使用'
        }, {
          value: '正在使用',
          label: '正在使用'
        }, {
          value: '已停用',
          label: '已停用'
        }
      ],
      // 列表数据
      tableData: [
        {
          id: '0',
          ruleName: '年龄预警',
          content: '大于60岁预警',
          // dsl:'',
          days: '每天',
          mode: '手动',
          nextTimeStr: '明天',
          status: '正在使用',
        }
      ],
      // 字段-接口完善后后端传
      zd: [],
      // 连接符
      connector: [
        {
          value: '大于',
          label: '大于'
        }, {
          value: '小于',
          label: '小于'
        }, {
          value: '等于',
          label: '等于'
        }, {
          value: '大于等于',
          label: '大于等于'
        }, {
          value: '小于等于',
          label: '小于等于'
        }, {
          value: '包含',  // 模糊查询
          label: '包含'
        }
      ],
      //预警规则
      // 新增、修改预警弹框内容
      form: {
        content: '', //预警内容
        days: '',    //预警频率
        rules: [{
          name: '',
          connector: '',
          value: ''
        }],
        id: '',        // id
        mode: '',      //手动
        nextTimeStr: '',//下次预警时间
        ruleName: '', //预警规则名称
        status: '',  //预警状态
      },
      rulesArr: [],
      page: 1, //当前页
      pageNum: "1",
      pageSize: 20,
      totalElements: null, //总数
      loading: true,
      searchData: {
        name: '',
        status: '',
        sortField: '',//排序
        pageSize: '', //每页几条
      },
      dialogVisible: false,
      btnName: '提示',
      rules: {
        ruleName: [
          { required: true, message: '请输入预警名称', trigger: 'blur' },
        ],
        rules: [
          { required: true, message: '请完善预警条件', trigger: 'blur' }
        ],
        days: [
          { required: true, message: '请输入预警频率', trigger: 'blur' }
        ],
        mode: [
          { required: true, message: '请选择预警状态', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择预警状态', trigger: 'blur' }
        ],

      },
      isUpload: false,
      //贼值input中file内容
      xlsxFile: "",
      exportExceldialogVisible: false,
      updataType: "",
      excelExplain: "",
      options: [{
        value: '医疗',
        label: '医疗'
      }, {
        value: '病残',
        label: '病残'
      }, {
        value: '教育',
        label: '教育'
      }, {
        value: '消防',
        label: '消防'
      }, {
        value: '交通',
        label: '交通'
      }, {
        value: '涉农',
        label: '涉农'
      }, {
        value: '妇联',
        label: '妇联'
      }, {
        value: '党团',
        label: '党团'
      }, {
        value: '应急',
        label: '应急'
      }, {
        value: '慈善',
        label: '慈善'
      }, {
        value: '死亡',
        label: '死亡'
      }],
    };
  },
  created () {
    this.loadData();
    this.getWarnFields()

  },
  methods: {

    loadData () {
      this.loading = true;
      this.searchData;

      this.yclList({
        name: this.searchData.name,
        status: this.searchData.status,
        sortField: this.searchData.sortField,
        pageSize: this.searchData.pageSize,
        // data:this.searchData
      }).then((res) => {
        console.log(res, 'then');
      }).catch((res) => {

        console.log(res.response.data, 'catch');
        if (res.response.data.status == '+OK') {
          this.tableData = res.response.data.data.content
          // this.tableData = JSON.parse(JSON.stringify(res.response.data.data) ) 
          // this.rulesArr = JSON.parse(this.tableData[0].content)
          // console.log(this.rulesArr,'this.rulesArr-预警规则');
          // this.tableData[0].content =  this.rulesArr[0].name +  this.rulesArr[0].connector +   this.rulesArr[0].value;

          if (this.tableData.length > 0) {
            for (let i in this.tableData) {
              let string = '';
              for (let j in this.tableData[i].rules) {
                for (let k in this.tableData[i].rules[j]) {

                  // console.log(this.tableData[i].rules[j][k]);
                  string += this.tableData[i].rules[j][k];
                }
                if (j < this.tableData[i].rules.length - 1) {
                  string += ' , '
                }
              }
              console.log(string);
              this.tableData[i].content = string;
            }

          }


          this.loading = false;
          console.log(this.tableData);

        } else {
          this.$message.error('网络错误');
          this.loading = false;
        }
      })


    },
    // 保存--接口还没完善
    save () {
      // 提示
      this.$refs['form'].validate((valid) => {
        if (!valid) {
          return false;
        }
      });
      let msgs = this.validate();
      if (msgs) {
        this.$message.warning(msgs);
        return false
      }
      this.saveWarnRule(
        this.form
      ).then(res => {
      }).catch(res => {
        if (res.response.data.status == "+OK") {
          this.$message.success(res.response.data.msg)
          this.loadData();
          this.dialogVisible = false;
        } else {
          this.dialogVisible = false;
          this.$message.error('网络错误')
        }
      })
    },
    // 保存校验提示
    validate () {
      try {
        let msg = "";
        for (let key in this.rules) {
          try {
            let r_ = this.rules[key];
            let val = this.form[key];

            if (val == "") {
              console.log(1111);
              msg = r_[0].message;
              //document.getElementById(key).style.border="1px solid red"
              break;
            } else {
              //document.getElementById(key).style.border="1px solid #C0C4CC"
            }
          } catch (e) { }
        }
        return msg;
      } catch (e) { return ""; }
    },
    // 新增，删除预警规则内容
    onSubmit (key, index) {

      let obj = {
        name: '',
        connector: '',
        value: ''
      }

      if (key == 'add') {
        this.form.rules.push(obj);

      }
      if (key == 'del') {

        // 删除指定评估人员
        for (let i in this.form.rules) {
          if (i == index) {
            this.form.rules.splice(i, 1);
          }
        }

      }

      console.log(key);
    },
    // 修改按钮
    changeData (data, key) {

      console.log("修改", data, key);

      for (let i in this.tableData) {
        if (data.id == this.tableData[i].id) {
          console.log(this.tableData[i]);
        }
      }

      this.dialogVisible = true;
      this.form = data;
      // this.form.rules =  this.rulesArr;
      this.btnName = '修改预警条件';

    },
    // 新增预警条件设置
    addYjtj () {

      // this.form.rules=[{
      //     name:'',
      //     connector:'',
      //     value:''
      // }];

      console.log("新增");
      this.dialogVisible = true;
      this.btnName = '新增预警条件';

      let obj = {
        // id:'0',
        ruleName: '',
        content: '',
        rules: [{
          name: '',
          connector: '',
          value: ''
        }],
        days: '',
        mode: '',
        nextTimeStr: '',
        status: '',
      }

      this.form = obj;

    },
    // 启动，停用操作按钮
    handleClick (data, key) {

      console.log('操作按钮', data);

      if (key == '正在使用') {
        this.$confirm('此操作完成将开始使用本条预警规则', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then((res) => {
          // this.$message.success('已确认您已知晓');
          this.updateStstus({
            id: data.id,
            status: '正在使用',
          }).then((res) => {
            console.log(res, 'then');
          }).catch((res) => {

            console.log(res.response.data, 'catch');
            if (res.response.data.status == '+OK') {
              this.$message.success(res.response.data.msg);
              this.loading = true;
              this.loadData();

            } else {
              this.$message.error('网络错误');
              this.loading = false;
            }
          }).catch((err) => {
            this.$message.warning('请确认' + err);
          });

        })
      } else if (key == '停止使用') {
        this.$confirm('此操作完成将停止使用本条预警规则', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {


          this.updateStstus({
            id: data.id,
            status: '已停用',
          }).then((res) => {
            console.log(res, 'then');
          }).catch((res) => {
            console.log(res.response.data, 'catch');
            if (res.response.data.status == '+OK') {
              this.loading = true;
              this.loadData();
              this.$message.success(res.response.data.msg);

            } else {
              this.$message.error('网络错误');
              this.loading = false;
            }
          })
        }).catch((err) => {
          this.$message.warning('请确认' + err);
        });

      } else if (key == '删除') {
        this.deleteWarnRule({
          id: data.id
        }).then(res => {
          console.log('then', res);
        }).catch(res => {
          if (res.response.data.status == "+OK") {
            this.loading = true;
            this.$message.success(res.response.data.msg)
            this.loadData();
          } else {
            this.loading = false;
            this.$message.error('网络错误')

          }


        })

      }
    },
    // 获取预警字段
    getWarnFields () {
      request({
        headers: {
          Accept: "application/json",
        },
        url: "/social/bigDataWarnRule/getWarnFields",
        method: "post",
        data: { key: '' },
      }).then(res => {

      }).catch(res => {
        if (res.response.data.status == "+OK") {

          this.zd = res.response.data.data;
        } else {
          this.$message.error(res.response.data.msg);
        }
        console.log(res.response.data.data, '字段');
      })

    },
    // 预警条件列表
    yclList (data) {
      return request({
        headers: {
          Accept: "application/json",
        },
        url: "/social/bigDataWarnRule/getWarnRuleList",
        method: "post",
        data: data,
      });
    },
    // 保存接口 
    saveWarnRule (data) {
      return request({
        headers: {
          Accept: "application/json",
        },
        url: "/social/bigDataWarnRule/saveWarnRule",
        method: "post",
        data: data,
      });
    },
    // 删除接口 
    deleteWarnRule (data) {
      return request({
        headers: {
          Accept: "application/json",
        },
        url: "/social/bigDataWarnRule/deleteWarnRule",
        method: "post",
        data: data,
      });
    },
    // 更新使用状态
    updateStstus (data) {
      return request({
        headers: {
          Accept: "application/json",
        },
        url: "/social/bigDataWarnRule/updateWarnStatus",
        method: "post",
        data: data,
      });
    },
    // 关闭弹框
    handleClose () {
      this.dialogVisible = false
      // this.$confirm('确认关闭？')
      //   .then(_ => {
      //     done();
      //   })
      //   .catch(_ => { });
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

    },
    // 重置
    resetQuery () {
      this.searchData.name = ''
      this.searchData.status = ''
    },
    // 复选
    handleSelectionChange (val) {
    },
    // upExcel change事项
    async readExcel (e) {
      if (e.target && !e.target.files[0]) return false;
      this.exportExceldialogVisible = true
    },
    // 上传excel对话框的确认按钮
    async confirmExportExcel () {
      if (!this.updataType) return this.$message.error("所填写类型不可为空")
      // this.$message.success("正在上传请稍等")
      this.exportExceldialogVisible = false
      var formData = new FormData()
      // 通过files就可以拿到所有上传的文件，如果是多个文件循环即可
      formData.append('file', this.$refs.uploadInput.files[0])
      formData.set("category", this.updataType)
      formData.set("explain", this.excelExplain)
      try {
        await exportExcelApi(formData)
      } catch (error) {
        if (error && error.response && error.response.data && error.response.data.status === "+OK") return this.$message.success(error.response.data.msg)
        if (error && error.response && error.response.data && error.response.data.status === "+ERR") return this.$message.error(error.response.data.msg)
        this.$message.error("上传失败，请稍后重试！")

      } finally {
        this.updataType = ""
        this.excelExplain = ""
        this.$refs.uploadInput.value = ""
      }
    },
    exportExcelHandleClose () {
      this.exportExceldialogVisible = false
      this.updataType = ""
      this.excelExplain = ""
      this.$refs.uploadInput.value = ""
    },
    // 上传按钮的点击事项
    onClick () {
      this.$refs.uploadInput.click()
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
</style>
<template>
  <!-- 救助服务站 救助服务站管理 -->
  <div class="g-box">
    <el-form inline
             label-width="100px">
      <el-form-item label="员工姓名">
        <el-input v-model="searchData.title"
                  placeholder="请输入员工姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   icon="el-icon-search"
                   @click="getTableData(searchData)">查询</el-button>
        <el-button type="info"
                   icon="el-icon-refresh"
                   @click="resetSearch">重置</el-button>
        <el-button type="primary"
                   icon="el-icon-plus"
                   @click="AdditionalStaff">新增人员</el-button>
        <el-button type="success"
                   icon="el-icon-folder-opened"
                   :loading="exportLoading"
                   @click="exportTble">导出列表</el-button>
      </el-form-item>
      <el-form-item style="float:right">
        <el-button type="primary"
                   icon="el-icon-arrow-left"
                   @click="returnPreviousPage">返回</el-button>
      </el-form-item>
    </el-form>
    <!-- table list -->
    <my-table :columns="columns"
              :table-data="tableList.content"
              :pagination="true"
              :page-size.sync="tableList.pageSize"
              :total="tableList.totalElements"
              :current-page.sync="tableList.pageNo"
              :tableWidth="160"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange">
      <!-- button 插槽 -->
      <template slot="buttons"
                slot-scope="{row}">
        <!-- <el-button type="primary"
                   @click="addRowInfo(row.row)">考核</el-button> -->
        <el-button type="primary"
                   @click="changeRowInfo(row.row)">更改</el-button>
        <!-- <el-button type="danger"
                   @click="changeRowInfo(row.row)">移除</el-button> -->
      </template>
    </my-table>
    <!--  新增 救助服务站 工作人员-->
    <el-dialog :title="staffInfoTitle"
               :visible.sync="addStaffdialogVisible"
               width="54%"
               :before-close="addStaffhandleClose">
      <el-form ref="addStaffForm"
               :rules="addStaffRules"
               :model="addStaffForm"
               label-width="120px">
        <!-- 身份证号码 姓名 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名"
                          prop="name">
              <el-input v-model="addStaffForm.name"
                        placeholder="请输入姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证号码"
                          prop="idCard">
              <el-input v-model="addStaffForm.idCard"
                        placeholder="请输入身份证号码"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 联系方式 居住地址 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系方式"
                          prop="phone">
              <el-input v-model="addStaffForm.phone"
                        placeholder="请输入联系方式"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="居住地址"
                          prop="address">
              <el-input v-model="addStaffForm.address"
                        placeholder="请输入居住地址"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 账号 密码 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="账号"
                          prop="username">
              <el-input v-model="addStaffForm.username"
                        placeholder="请输入居住地址"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="密码"
                          prop="password">
              <el-input v-model="addStaffForm.password"
                        placeholder="请输入居住地址"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="addStaffdialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="affirmAddStaff">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import myTable from "@/views/common/newMyTable"
import {
  socialWorkStationGetPersonListApi,      // 救助服务站人员列表
  socialWorkStationSaveStationPerson,      // 救助服务站人员列表
  getStationPersonDetailApi,      // 救助服务站人员列表
} from "@/api/SocialWorkStation"
import {
  commonExcelExportApi,
} from "@/api/lifeRescue/plightChildren"
import {
  getTaiZhouAreaApi,  // 泰州区域 > 街道 > 村庄 联机选择框
} from "@/api/lifeRescue/disabilityAllowance"
export default {
  name: "SocialWorkStationManage",
  data () {
    return {
      searchData: {
        name: "",
        stationId: this.$route.query.stationId,
      },
      searchForm: {
        name: "",
        stationId: this.$route.query.stationId,
      },
      // table columns
      columns: [
        { label: '姓名', prop: 'name' },
        { label: '身份证', prop: 'idCard', minWidth: '120px' },
        { label: '联系方式', prop: 'phone', minWidth: 100 },
        { label: '居住地址', prop: 'address', minWidth: 120, showOverflowTooltip: true, },
        { label: '账号', prop: 'password', minWidth: 100 },
      ],
      // table 数据
      tableList: {
        content: [],
        pageNo: 1,
        pageSize: 10,
        totalElements: 0,
      },
      // 新增 救助服务站 弹框
      addStaffdialogVisible: false,
      // 新增 救助服务站 工作人员 弹框
      addWorkerDialogVisible: false,
      // 行政区划
      props: {
        checkStrictly: true,
        lazy: true,
        async lazyLoad (node, resolve) {
          const { level } = node; // 获取当前node对象中的level属性
          let pId = "0";
          if (level > 0) {
            let value = node.value;
            if (value) {
              let values = value.split("#")
              pId = values.length > 1 ? values[1] : "0";
            }
          }
          await getTaiZhouAreaApi({
            pId: pId
          }).then(res => {
          }).catch(res => {
            const nodes = res.response.data;
            nodes.forEach(item => {
              item.value = item.cs_ex2 + "#" + item.cs_ex1;
              item.label = item.cs_ex2;
              item.leaf = level >= 2; //判断是否为末尾节点，这个地方是0,1,2三级
            })
            resolve(nodes);
          })
        }
      },
      addStaffForm: {
      },
      // 校验规则
      addStaffRules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { pattern: /^(?:[\u4e00-\u9fa5·]{2,16})$/, message: '姓名格式不正确', trigger: 'blur' },
        ],
        idCard: [
          { required: true, message: '请输入身份证号码', trigger: 'blur' },
          { pattern: /^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))(\d|X|x)$/, message: '身份证号码格式不正确', trigger: 'blur' },
        ],
        phone: [
          { required: true, message: '请输入联系方式', trigger: 'blur' },
          { pattern: /^(?:(?:\+|00)86)?1\d{10}$/, message: '手机号格式不正确', trigger: 'blur' },
        ],
        address: [
          { required: true, message: '请输入居住地址', trigger: 'blur' },
        ],
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { pattern: /^[A-Za-z0-9]{6,15}$/, message: '请输入6-15个字节的数字和字母', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^[A-Za-z0-9]{6,15}$/, message: '请输入6-15个字节的数字和字母', trigger: 'blur' },
        ]
      },
      staffInfoTitle: "",
      exportLoading: false
    }
  },
  components: {
    myTable,
  },
  created () {
    this.getTableData(this.searchData)
  },
  methods: {
    // 数据回显
    async getTableData (c) {
      // TODO：从后端获取表格数据
      try {
        // this.searchData.divisionCode
        await socialWorkStationGetPersonListApi(c)
      } catch (error) {
        console.log(error.response.data.data)
        if (error.response.data.code === 200) {
          this.searchForm = c
          let Data = error.response.data
          this.tableList = Data.data
          return
        }
        this.$message.error(error.response.data.msg)
      }
    },
    // 搜索重置
    resetSearch () {
      this.searchData = {
        name: "",
        stationId: this.$route.query.stationId,
        sex: "",
      }
    },
    // 新增人员
    AdditionalStaff () {
      this.staffInfoTitle = "新增工作人员"
      this.addStaffdialogVisible = true
    },
    // 切页
    handleSizeChange (row) {
      // TODO：处理每页显示数据条数变化
      this.getTableData({
        name: this.searchForm.name,
        stationId: this.$route.query.stationId,
        sex: this.searchForm.sex,
        pageSize: row,
      })
    },
    // 切换页码
    handleCurrentChange (row) {
      // TODO：处理当前页码变化
      this.getTableData({
        name: this.searchForm.name,
        stationId: this.$route.query.stationId,
        sex: this.searchForm.sex,
        pageSize: this.tableList.pageSize,
        pageNo: row,
      })
    },
    // 查看
    addRowInfo (row) {
      // TODO：查看当前行
      this.addWorkerDialogVisible = true
      console.log(row)
    },
    async getStationPersonDetail (data) {
      try {
        await getStationPersonDetailApi(data)
      } catch (error) {
        console.log(error, "行数据回显")
        if (error.response.data.code !== 200) return this.$message.error(error.response.data.msg)
        this.addStaffForm = error.response.data.data
      }
    },
    // 修改信息
    changeRowInfo (row) {
      this.staffInfoTitle = "员工信息修改"
      this.getStationPersonDetail({ id: row.id })
      this.addStaffdialogVisible = true
      console.log(row)
    },
    // 新增救助服务站员工 弹框 关闭前
    addStaffhandleClose () {
      this.addStaffdialogVisible = false
      this.addStaffForm = {}  // 数据重置
    },
    // 新增救助服务站人员
    async affirmAddStaff () {
      // if (this.staffInfoTitle === "员工信息修改") return this.$message.warning("员工信息修改")
      try {
        const formRes = await this.$refs.addStaffForm.validate()
        if (!formRes) return
        // 调接口
        let obj = {
          persons: [this.addStaffForm],
          stationId: this.$route.query.stationId,
        }
        await socialWorkStationSaveStationPerson(obj)
      } catch (error) {
        if (error.response.data.code === 200) {
          // 关闭弹框之前
          this.addStaffhandleClose()
          let obj = this.searchForm
          obj.pageSize = this.tableList.pageSize
          obj.pageNo = this.tableList.pageNo
          this.getTableData(obj)
          return this.$message.success(error.response.data.msg)
        }
        this.$message.error(error.response.data.msg)
      }
    },
    // 导出table列表  excel
    async exportTble () {
      try {
        this.exportLoading = true
        await commonExcelExportApi("/social/socialWorkStation/getPersonList", this.searchForm)
      } catch (error) {
        if (error && error.response.status === 200) {
          const base64Data = error.response.data.data;
          const fileName = "救助服务站工作人员信息列表.xlsx";
          return this.downloadExcelFromBase64(base64Data, fileName);
        }
        // 公共导出接口后端 报错提示文字
        this.$message.error(error.response.data.msg)
      } finally {
        this.exportLoading = false
      }
    },
    downloadExcelFromBase64 (base64Data, fileName) {
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    },
    // 返回按钮
    returnPreviousPage () {
      this.$router.go(-1);
      if (process.env.NODE_ENV != "development") this.$router.go(-1);
    },
  },
}
</script>

<style scoped lang='less'></style>

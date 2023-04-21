<template>
  <!-- 救助服务站 -->
  <div class="g-box">
    <el-form inline
             label-width="100px">
      <el-form-item label="行政区划">
        <el-cascader v-model="searchData.divisionCodes"
                     :props="props"
                     clearable
                     placeholder="请选择行政区划"></el-cascader>
      </el-form-item>
      <el-form-item label="服务站名称">
        <el-input v-model="searchData.title"
                  placeholder="请输入救助服务站名称"></el-input>
      </el-form-item>
      <el-form-item label="审核状态">
        <el-select v-model="searchData.auditStatus"
                   placeholder="请选择审核状态">
          <el-option label="待审核"
                     value="待审核"></el-option>
          <el-option label="已驳回"
                     value="已驳回"></el-option>
          <el-option label="已通过"
                     value="已通过"></el-option>
        </el-select>
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
                   @click="openSocialWorkStation('新增救助服务站')">新增救助服务站</el-button>
        <el-button type="success"
                   icon="el-icon-folder-opened"
                   :loading="exportLoading"
                   @click="exportTble">导出列表</el-button>
      </el-form-item>
    </el-form>
    <!-- table list -->
    <my-table :columns="columns"
              :table-data="tableList.content"
              :pagination="true"
              :page-size.sync="tableList.pageSize"
              :total="tableList.totalElements"
              :current-page.sync="tableList.pageNo"
              :tableWidth="280"
              @loading="tableLoading"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange">
      <!-- button 插槽 -->
      <template slot="buttons"
                slot-scope="{row}">
        <el-button type="primary"
                   @click="viewRowInfo(row.row)">查看</el-button>
        <el-button type="primary"
                   @click="changeRowInfo(row.row)">修改</el-button>
        <el-button type="primary"
                   @click="peopleManagement(row.row)">人员管理</el-button>
        <!-- <el-button type="danger"
                   @click="removeRowInfo(row.row)">移除</el-button> -->
      </template>
    </my-table>
    <!-- 新增救助服务站 dialog -->
    <el-dialog title="救助服务站新增"
               :visible.sync="addSGZdialogVisible"
               width="30%"
               :before-close="addSGZhandleClose">
      <el-form ref="addSGZForm"
               :rules="addSGZRules"
               :model="addSGZForm"
               label-width="120px">
        <el-form-item label="服务站名称"
                      prop="title">
          <el-input v-model="addSGZForm.title"
                    placeholder="请输入救助服务站名称"></el-input>
        </el-form-item>
        <el-form-item label="行政区划"
                      prop="divisionCodes">
          <el-cascader v-model="addSGZForm.divisionCodes"
                       @change="addSGZAreaChange"
                       style="width:100%"
                       :props="props"
                       clearable
                       placeholder="请选择行政区划"></el-cascader>
        </el-form-item>
        <el-form-item label="承载主体"
                      prop="bearingBody">
          <el-input v-model="addSGZForm.bearingBody"
                    placeholder="请输入承载主体"></el-input>
        </el-form-item>
        <el-form-item label="负责人姓名"
                      prop="adminName">
          <el-input v-model="addSGZForm.adminName"
                    placeholder="请输入负责人姓名"></el-input>
        </el-form-item>
        <el-form-item label="负责人电话"
                      prop="adminPhone">
          <el-input v-model="addSGZForm.adminPhone"
                    placeholder="请输入负责人电话"></el-input>
        </el-form-item>
        <!-- <el-form-item label="营业时间"
                      prop="time">
          <el-time-picker is-range
                          style="width: 100%"
                          v-model="addSGZForm.time"
                          range-separator="至"
                          start-placeholder="开始时间"
                          end-placeholder="结束时间"
                          placeholder="选择时间范围">
          </el-time-picker>
        </el-form-item> -->
        <el-form-item label="服务站地址"
                      prop="address">
          <el-input v-model="addSGZForm.address"
                    placeholder="请输入救助服务站地址"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="addSGZdialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="affirmAddSGZForm">确 定</el-button>
      </span>
    </el-dialog>
    <!-- view row detail info  -->
    <el-dialog :title="SocialWorkStationTitle"
               :visible.sync="rowDetailDialogVisible"
               :before-close="rowDetailHandleClose"
               width="54%">
      <el-form :model="rowDetailInfo"
               label-width="140px">
        <!-- 救助服务站名称 上级团队 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="服务站名称">
              <el-input v-model="rowDetailInfo.title"
                        placeholder="请输入救助服务站名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上级团队">
              <el-input v-model="rowDetailInfo.superiorTeam"
                        placeholder="请输入上级团队"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 行政区划 营业时间 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="行政区划"
                          prop="divisionCodes">
              <el-cascader v-model="rowDetailInfo.divisionCodes"
                           style="width:100%"
                           :props="props"
                           clearable
                           placeholder="请选择行政区划"></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <!-- <el-form-item label="营业时间">
              <el-time-picker is-range
                              style="width: 100%"
                              v-model="rowDetailInfo.time"
                              range-separator="至"
                              start-placeholder="开始时间"
                              end-placeholder="结束时间"
                              placeholder="选择时间范围">
              </el-time-picker>
            </el-form-item> -->
          </el-col>
        </el-row>
        <!-- 登记备案情况 组织机构代码 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="登记备案情况">
              <el-radio-group v-model="rowDetailInfo.whetherRegister">
                <el-radio label="已备案">已备案</el-radio>
                <el-radio label="未备案">未备案</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="组织机构代码">
              <el-input v-model="rowDetailInfo.organizationCode"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 专职人数 社工人数 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="专职人数">
              <el-input v-model="rowDetailInfo.soleDutyNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="社工人数">
              <el-input v-model="rowDetailInfo.socialWorkerNumber"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 主管部门 注册地址 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="主管部门">
              <el-input v-model="rowDetailInfo.competentDept"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="注册地址">
              <el-input v-model="rowDetailInfo.registerAddress"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 管理员姓名 管理员电话 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="管理员姓名">
              <el-input v-model="rowDetailInfo.adminName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="管理员电话">
              <el-input v-model="rowDetailInfo.adminPhone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 负责人姓名 负责人电话 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="负责人姓名">
              <el-input v-model="rowDetailInfo.contactName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="负责人电话">
              <el-input v-model="rowDetailInfo.contactPhone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 服务领域 服务区域 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="服务领域">
              <el-input v-model="rowDetailInfo.serviceField"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="服务区域">
              <el-input v-model="rowDetailInfo.serviceArea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 团队Logo 备案材料复印件 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="团队Logo">
              <!-- <el-input v-model="rowDetailInfo.name"
                 disabled></el-input> -->
              <el-upload action="/social/weixinMinios/fileUpload"
                         list-type="picture-card"
                         :disabled="isChangeRowInfo"
                         :file-list="fileList1"
                         :on-success="onSuccess1"
                         :on-remove="handleRemove1"
                         :limit="1">
                <!-- :on-preview="handlePictureCardPreview" -->
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备案材料复印件">
              <el-upload action="/social/weixinMinios/fileUpload"
                         list-type="picture-card"
                         :file-list="fileList2"
                         :disabled="isChangeRowInfo"
                         :on-success="onSuccess2"
                         :on-remove="handleRemove2"
                         :limit="1">
                <!-- :on-preview="handlePictureCardPreview" -->
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-dialog :visible.sync="photoDialogVisible"
                     width="30%">
            <img width="100%"
                 :src="dialogImageUrl"
                 alt="">
          </el-dialog>
        </el-row>
        <!-- 审核状态-->
        <el-row>
          <el-col :span="12">
            <el-form-item label="审核状态">
              <el-radio v-model="rowDetailInfo.auditStatus"
                        label="1">待审核</el-radio>
              <el-radio v-model="rowDetailInfo.auditStatus"
                        label="2">已通过</el-radio>
              <el-radio v-model="rowDetailInfo.auditStatus"
                        label="3">已驳回</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 团队介绍 审核意见 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="团队介绍">
              <el-input v-model="rowDetailInfo.teamIntro"
                        type="textarea"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="审核意见">
              <el-input v-model="rowDetailInfo.auditOpinion"
                        type="textarea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer"
            v-if="!isChangeRowInfo"
            class="dialog-footer">
        <el-button @click="rowDetailDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="saveRowInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import dayjs from "dayjs"
let getYear = dayjs().get('year')
let getMonth = dayjs().get('month')
let getDate = dayjs().get('date')
import { viewImgsApi } from "@/api"
import myTable from "@/views/common/newMyTable"
import {
  socialWorkStationGetListApi,  // 获取救助服务站列表
  socialWorkStationSaveStationApi,      // 新增救助服务站
  getStationDetailApi,      // 救助服务站 查看
  saveStationApi,      // 救助服务站 修改
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
        title: "",
        auditStatus: "",
        divisionCodes: [],
      },
      searchForm: {
        title: "",
        auditStatus: "",
        divisionCodes: [],
      },
      // table columns
      columns: [
        { label: '救助服务站名称', prop: 'title', minWidth: 100 },
        { label: '承载主体', prop: 'bearingBody', minWidth: 100 },
        { label: '所属区域', prop: 'area', minWidth: 100 },
        { label: '管理员姓名', prop: 'adminName' },
        { label: '管理员电话', prop: 'adminPhone', minWidth: 100 },
        { label: '职工人数', prop: 'soleDutyNumber', minWidth: 100 },
        { label: '救助服务站地址', prop: 'address', minWidth: 100, showOverflowTooltip: true, },
      ],
      // table 数据
      tableList: {
        content: [],
        pageNo: 1,
        pageSize: 10,
        totalElements: 0,
      },
      // 新增 救助服务站 弹框
      addSGZdialogVisible: false,
      // row 救助服务站 detail 弹框
      rowDetailDialogVisible: false,
      photoDialogVisible: false,
      SocialWorkStationTitle: "",
      dialogImageUrl: '',
      // row info
      rowDetailInfo: {
      },
      isChangeRowInfo: true,
      fileList1: [],
      fileList2: [],

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
      addSGZForm: {
        title: '救助服务站名称3',  // 救助服务站名称
        divisionCodes: ["海陵区#321202000000", "城东街道#321202001000", "老东河社区居委会#321202001014"],
        bearingBody: "承载主体",  // 承载主体
        adminName: "管理员姓名",  // 管理员姓名
        adminPhone: "13273714760",  // 管理员电话
        address: "救助服务站地址",    // 救助服务站地址
        time: [new Date(getYear, getMonth, getDate, 8, 0), new Date(getYear, getMonth, getDate, 18, 0)]
      },
      // 校验规则
      addSGZRules: {
        title: [
          { required: true, message: '请输入救助服务站名称', trigger: 'blur' },
        ],
        divisionCodes: [
          { required: true, message: '请选择行政区划', trigger: 'change' }
        ],
        bearingBody: [
          { required: true, message: '请输入承载主体', trigger: 'blur' }
        ],
        adminName: [
          { required: true, message: '请输入管理员姓名', trigger: 'blur' },
          { pattern: /^(?:[\u4e00-\u9fa5·]{2,16})$/, message: '姓名格式不正确', trigger: 'blur' },
        ],
        adminPhone: [
          { required: true, message: '请输入社管理员电话', trigger: 'blur' },
          { pattern: /^(?:(?:\+|00)86)?1\d{10}$/, message: '电话格式不正确', trigger: 'blur' },
        ],
        // time: [
        //   { required: true, message: '请选择营业时间', trigger: 'change' }
        // ],
        address: [
          { required: true, message: '请输入救助服务站地址', trigger: 'blur' }
        ]
      },
      exportLoading: false,
      tableLoading: false
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
      try {
        this.tableLoading = true
        await socialWorkStationGetListApi(c)
      } catch (error) {
        if (error.response.data.code !== 200) return this.$message.error(error.response.data.msg)
        this.searchForm = c
        let Data = error.response.data
        this.tableList = Data.data
      } finally {
        this.tableLoading = false
      }
    },
    // 搜索重置
    resetSearch () {
      this.searchData = {
        title: "",
        divisionCodes: [],
      }
    },
    // 切页
    handleSizeChange (row) {
      this.searchForm.pageSize = row
      this.getTableData(this.searchForm)
    },
    // 切换页码
    handleCurrentChange (row) {
      this.searchForm.pageNo = row
      this.getTableData(this.searchForm)
    },
    // 查看 按钮
    viewRowInfo (row) {
      this.rowDetailInfo = row // 行信息存储
      this.isChangeRowInfo = true // 是否禁用
      this.SocialWorkStationTitle = "救助服务站查看"
      this.getStationDetail({
        id: row.id,
      })
      this.rowDetailDialogVisible = true // 打开弹框
    },
    // 行信息 数据回显
    async getStationDetail (data) {
      try {
        await getStationDetailApi(data)
      } catch (error) {
        console.log(error, "行信息数据回显")
        if (error.response.data.code !== 200) return this.$message.error(error.response.data.msg)
        this.rowDetailInfo = error.response.data.data
        if (this.rowDetailInfo.logo) this.viewImgs(this.rowDetailInfo.logo, 'fileList1', 'logo.jpeg')
        if (this.rowDetailInfo.registerMaterial) this.viewImgs(this.rowDetailInfo.registerMaterial, 'fileList2', 'registerMaterial.jpeg')
      }
    },
    // 图片回显
    async viewImgs (url, list, name) {
      try {
        await viewImgsApi(url)
      } catch (error) {
        console.log(error, "图片回显")
        if (error.response.status !== 200) return
        this[list].push({ name, url: error.response.data })
      }
    },
    // 修改 按钮
    changeRowInfo (row) {
      // 是否禁用
      this.isChangeRowInfo = false
      this.SocialWorkStationTitle = "救助服务站修改"
      this.getStationDetail({
        id: row.id,
      })
      this.rowDetailDialogVisible = true
      console.log(row)
    },
    // 救助服务站修改
    async saveStation (data) {
      try {
        await saveStationApi(data)
      } catch (error) {
        if (error.response.data.code !== 200) return this.$message.error(error.response.data.msg)
        this.$message.success(error.response.data.msg)
      }
    },
    // 图片上传成功
    onSuccess1 (response, file, fileList) {
      console.log(response, file, fileList)
      this.rowDetailInfo.logo = '/social/weixinMinios/show?filename=' + response[0].filename  // logo存储
    },
    onSuccess2 (response, file, fileList) {
      console.log(response, file, fileList)
      this.rowDetailInfo.registerMaterial = '/social/weixinMinios/show?filename=' + response[0].filename  // logo存储
    },
    // 救助服务站修改弹框 确认按钮
    saveRowInfo () {
      this.saveStation(this.rowDetailInfo)  // 信息保存
      this.rowDetailHandleClose()
      this.getTableData(this.searchForm)  // 重新请求列表
    },
    // 当前行信息 弹框 关闭前
    rowDetailHandleClose () {
      this.rowDetailDialogVisible = false
      this.rowDetailInfo = {} // 数据重置
      this.fileList1 = []
      this.fileList2 = []
    },
    // 人员管理
    peopleManagement (row) {
      let url = '/SocialWorkStationManage/staffManagement?stationId='
      if (process.env.NODE_ENV == "development") return this.$router.push(url + row.id)
      this.$pushRouter({ path: generalConfig.defaultUrl + url + row.id, })
    },
    // 移除
    removeRowInfo (row) {
      console.log(row)
    },
    // 新增救助服务站dialog 关闭前
    addSGZhandleClose () {
      this.addSGZdialogVisible = false
      this.addSGZForm = {
        title: '救助服务站名称3',  // 救助服务站名称
        divisionCodes: ["海陵区#321202000000", "城东街道#321202001000", "老东河社区居委会#321202001014"],
        bearingBody: "承载主体",  // 承载主体
        adminName: "管理员姓名",  // 管理员姓名
        adminPhone: "13273714760",  // 管理员电话
        address: "救助服务站地址",    // 救助服务站地址
        time: [new Date(getYear, getMonth, getDate, 8, 0), new Date(getYear, getMonth, getDate, 18, 0)]
      }
    },
    // 新增救助服务站
    async affirmAddSGZForm () {
      try {
        const formRes = await this.$refs.addSGZForm.validate()
        if (!formRes) return
        // 调接口
        await socialWorkStationSaveStationApi(this.addSGZForm)
      } catch (error) {
        if (error.response.data.code === 200) {
          // 关闭弹框之前
          this.addSGZhandleClose()
          this.getTableData({
            title: this.searchForm.title,
            divisionCodes: this.searchForm.divisionCodes,
            pageSize: this.tableList.pageSize,
            pageNo: this.tableList.pageNo,
          })
          return this.$message.success(error.response.data.msg)
        }
        this.$message.error(error.response.data.msg)
      }
    },
    // 如果选择行政区划的时候未选择居住地址 则给其赋值
    addSGZAreaChange (val) {
      if (!this.addSGZForm.address) this.addSGZForm.address = val.join("").replace(/[#0-9]/g, "")
    },
    // 导出table列表  excel
    async exportTble () {
      try {
        this.exportLoading = true
        await commonExcelExportApi("/social/socialWorkStation/getList", this.searchForm)
      } catch (error) {
        if (error && error.response.status === 200) {
          const base64Data = error.response.data.data;
          const fileName = "救助服务站管理列表.xlsx";
          this.downloadExcelFromBase64(base64Data, fileName);
        }
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
    openSocialWorkStation () {
      this.SocialWorkStationTitle = "添加救助服务站"
      this.addSGZdialogVisible = true;
    },
    handleRemove1 (file, fileList) {
      this.fileList1 = []
      this.rowDetailInfo.logo = ""
    },
    handleRemove2 (file, fileList) {
      this.fileList2 = []
      this.rowDetailInfo.registerMaterial = ""
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;
      this.photoDialogVisible = true;
    }
  },
}
</script>

<style scoped lang='less'></style>

<template>
  <div>
    <el-dialog :title="dialogTitle"
               :visible.sync="dialogTableVisible"
               class="tasklist-table"
               :close-on-click-modal="false"
               :close-on-press-escape="false">
      <el-steps :active="active"
                process-status="finish"
                align-center
                finish-status="success">
        <el-step title="账号信息"
                 @click="goStep1"></el-step>
        <el-step title="个人信息"
                 @click="goStep2"></el-step>
        <el-step title="账号授权"
                 @click="goStep3"></el-step>
      </el-steps>

      <!-- 第一步 账号信息-->
      <div class="addUser-step"
           v-if="isStep1">
        <el-form :model="ruleForm"
                 :rules="rules"
                 ref="ruleForm"
                 label-width="100px"
                 class="demo-ruleForm"
                 size="small"
                 :label-position="labelPosition">
          <el-row>
            <div class="accountInfo">
              <el-col :span="12">
                <el-form-item label="登录账号"
                              prop="userId">
                  <el-input v-model="ruleForm.userId"
                            disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="姓名"
                              prop="chartName">
                  <el-input v-model="ruleForm.chartName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="手机号"
                              prop="loginPhone">
                  <el-input v-model="ruleForm.loginPhone"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="邮箱"
                              prop="loginEmail">
                  <el-input v-model="ruleForm.loginEmail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="是否停用"
                              prop="state">
                  <el-switch v-model="ruleForm.state"
                             active-text="启用"
                             :active-value="11"
                             :inactive-value="10"
                             inactive-text="停用">
                  </el-switch>
                </el-form-item>
              </el-col>
              <el-col :span="24"
                      class="text-center">
                <el-button type="primary"
                           :loading="isLoading"
                           @click="saveUserInfo('ruleForm')">保存</el-button>
                <el-button type="primary"
                           @click="goStep2">跳过</el-button>
                <el-button @click="resetFormStep1">重置</el-button>
              </el-col>
            </div>
          </el-row>
        </el-form>
      </div>
      <!-- 第二步 个人信息-->
      <div class="addUser-step"
           v-if="isStep2">
        <el-form :model="ruleForm2"
                 :rules="formRule2"
                 ref="ruleForm"
                 label-width="100px"
                 class="demo-ruleForm"
                 size="small"
                 :label-position="labelPosition">
          <el-row>
            <el-col :span="12">
              <el-form-item label="证件类型"
                            prop="certType">
                <el-select v-model="ruleForm2.certType"
                           placeholder="请选择证件类型">
                  <el-option v-for="item in dicts.idcardTypes"
                             :key="item.itemCode"
                             :label="item.itemValue"
                             :value="item.itemCode">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <!--  -->
            <el-col :span="12">
              <el-form-item label="证件号码"
                            prop="certNum">
                <el-input @change="setAgeSexByIdCard"
                          v-model="ruleForm2.certNum"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="出生日期"
                            prop="birthday">
                <el-form-item prop="date">
                  <el-date-picker type="date"
                                  placeholder="选择日期"
                                  v-model="ruleForm2.birthday"
                                  style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="性别"
                            prop="sex">
                <el-select clearable
                           placeholder="请选择性别"
                           v-model="ruleForm2.sex">
                  <el-option v-for="item in dicts.sexTypes"
                             :key="item.itemCode"
                             :label="item.itemValue"
                             :value="item.itemCode">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <!--  -->

            <el-col :span="24"
                    class="text-center">
              <el-button type="info"
                         @click="goStep1">上一步</el-button>
              <el-button type="primary"
                         @click="goStep3">跳过</el-button>
              <el-button type="primary"
                         :loading="isLoading"
                         @click="savePersonInfo('ruleForm')">保存</el-button>

              <el-button @click="resetFormStep2('ruleForm')">重置</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <!-- 第三步 账号授权-->
      <div class="addUser-step"
           v-if="isStep3">
        <el-form :model="ruleForm1"
                 :rules="rulesStep3"
                 ref="ruleForm1"
                 label-width="100px"
                 class="demo-ruleForm"
                 size="small"
                 :label-position="labelPosition">
          <div class="page-header">
            <h3>账号信息</h3>
          </div>
          <el-row>
            <el-col :span="12">
              <el-form-item label="账号"
                            prop="userId">
                <el-input v-model="ruleForm.userId"
                          disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="姓名"
                            prop="chartName">
                <el-input v-model="ruleForm.chartName"
                          disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="手机号"
                            prop="loginPhone">
                <el-input v-model="ruleForm.loginPhone"
                          disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="邮箱"
                            prop="loginEmail">
                <el-input v-model="ruleForm.loginEmail"
                          disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="page-header">
            <h3>岗位权限</h3>
          </div>
          <el-row>
            <el-col :span="12">
              <el-form-item label="所属机构"
                            prop="selectOrganName">
                <el-input v-model="ruleForm.currOrganName"
                          disabled></el-input>
                <el-button type="primary"
                           @click="editOrgan">选择机构</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="岗位名称"
                            prop="nickName">
                <el-input v-model="ruleForm.nickName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="角色权限"
                            prop="power">
                <el-select v-model="ruleForm.power"
                           multiple
                           placeholder="请选择权限"
                           name="231323">
                  <el-option v-for="item in roleOptions"
                             :key="item.roleId"
                             :label="item.name"
                             :value="item.roleId"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="岗位状态"
                            prop="chartstatus">
                <el-switch v-model="ruleForm.chartstatus"
                           active-text="打开"
                           :active-value="11"
                           :inactive-value="10"
                           inactive-text="停用"></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="24"
                    class="text-center">
              <el-button type="info"
                         @click="goStep2">上一步</el-button>
              <el-button type="primary"
                         :loading="isLoading"
                         @click="savePermitInfo('ruleForm')">保存</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!-- </el-form> -->
    </el-dialog>

    <el-dialog :title="dialogTitle"
               :visible.sync="dialogOrganVisible"
               class="tasklist-table"
               :close-on-click-modal="false"
               :close-on-press-escape="false">

      <div class="umc-treeNode">
        <el-tree :data="treeData"
                 ref="showTree"
                 :props="defaultProps"
                 accordion
                 node-key="id"
                 :highlight-current="true"
                 :expand-on-click-node="false"
                 :default-expanded-keys="expandedKeys"
                 @node-click="handleNodeClick"
                 @node-expand="handleNodeExpand">
          <span class="custom-tree-node span-ellipsis"
                slot-scope="{ node, data }">
            <span :title="node.label">{{ node.label }}</span>
          </span>
        </el-tree>
      </div>
    </el-dialog>
  </div>

</template>

<script>
  import userOtherService from "../../../../api/system/system";
  import userService from "../../../../api/user/userService";
  import struService from "../../../../api/stru/struService";
  import characterService from "../../../../api/system/characterService";
  import personService from "../../../../api/user/person";
  import roleService from "../../../../api/user/role-manage";

  const originFormData = {
    account: '',
    userId: '',
    chartId: '',
    chartName: '',
    nickName: '',
    password: '',
    surepassword: '',
    state: '',
    admin: '',
    othername: '',
    ca: '',
    certNum: '',
    certType: '',
    sex: '',
    power: [],
    birthday: '',
    worknumber: '',
    checkname: '',
    loginPhone: '',
    loginEmail: '',
    qq: '',
    wechat: '',
    newNickName: '',
    ucUid: '',
    chartstatus: '',
    selectOrganName: '',
    selectOrganId: ''
  }
  const nodePage = {
    page: 0,
    pageSize: -1
  }
  export default {
    props: ['dicts'],
    data () {
      let isphone = (rule, value, callback) => {
        if (!value || this.orignData.phone === value) {
          callback()
          return
        }
        /* this.$http({
         url: this.$http.adornUrl('/users/phoneUniqueCheck'),
          method: 'post',
          data: this.$http.adornData(
            {
              phone: value
            },
            false,
            'notJson'
          ),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })*/
          userService.checkPhoneUnique({ phone: value}).then(res => {
            if (res.data.data === 0) {
              callback()
            } else if (res.data.data === 1) {
              callback(new Error('您的手机号已存在'))
            } else {
              callback(new Error('网络异常'))
            }
          })
          .catch(error => {
            callback(new Error('网络异常'))
            console.log(error)
          })
      }
      let isemail = (rule, value, callback) => {
        if (!value || this.orignData.email === value) {
          callback()
          return
        }
       /* this.$http({
          url: this.$http.adornUrl('/users/emailUniqueCheck'),
          method: 'post',
          data: this.$http.adornData(
            {
              email: value
            },
            false,
            'notJson'
          ),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })*/
        userService.checkEmailUnique({ email: value}).then(res => {
          if (res.data.data === 0) {
            callback()
          }
          if (res.data.data === 1) {
            callback(new Error('您的邮箱已存在'))
          }
        })
      }
      let iscard = (rule, value, callback) => {
        if (!value || this.orignData.card === value) {
          callback()
          return
        }
        this.setAgeSexByIdCard()
        /*this.$http({
          url: this.$http.adornUrl('/person/certNumUniqueCheck'),
          method: 'post',
          data: this.$http.adornData(
            {
              certNum: value
            },
            false,
            'notJson'
          ),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })*/
        personService.checkCertNumUnique({certNum: value}).then(res => {
          if (res.data.data === 0) {
            callback()
          }
          if (res.data.data === 1) {
            callback(new Error('您的证件号已存在'))
          }
        })
      }
      return {
        treeData: [],
        defaultProps: {
          children: 'children',
          label: 'label',
          isLeaf: 'leaf',
          title: 'label'
        },
        treeRootParam: {
          struId: '',
          struType: '',
          organCode: '',
          organName: '',
          organId: ''
        },
        expandedKeys: [],
        isLoading: false,
        organName: '',
        orignData: {
          email: '',
          phone: '',
          card: ''
        },
        certTypeOptions: [
          {
            value: '1',
            label: '身份证'
          },
          {
            value: '2',
            label: '军官证'
          }
        ],
        organOptions: [],
        organProps: {
          label: 'organName',
          value: 'organId',
          checkStrictly: true
        },
        // 步骤当前激活状态
        active: 0,
        // 判断是否有账号
        hasAccount: false,
        // 角色权限列表
        roleOptions: [],
        // 导航步骤与对应的三个表单
        isStep1: true,
        isStep2: false,
        isStep3: false,
        dialogTableVisible: false,
        dialogOrganVisible: false,
        memorandumAddVisible: false,
        organTreeVisible: false,
        dialogTitle: '',
        dataListLoading: false,
        labelPosition: 'right',
        // 表单字段
        ruleForm1: {},
        ruleForm2: {
          certType: '',
          certNum: '',
          sex: '',
          birthday: ''
        },
        extRuleForm: {
          idcard: [
            { required: true, message: '请填写证件号码', trigger: 'blur' },
            {
              pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
              message: '证件号码格式有误！',
              trigger: 'blur'
            },
            { validator: iscard, trigger: 'blur' }
          ],
          cardRules: [
            { required: true, message: '请填写证件号码', trigger: 'blur' },
            { validator: iscard, trigger: 'blur' }
          ]
        },
        formRule2: {
          certNum: [
            { required: true, message: '请填写证件号码', trigger: 'blur' },
            {
              pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
              message: '证件号码格式有误！',
              trigger: 'blur'
            },
            { validator: iscard, trigger: 'blur' }
          ]
        },
        ruleForm: {
          originStepForm: {},
          account: '',
          userId: '',
          chartId: '',
          chartName: '',
          nickName: '',
          password: '',
          surepassword: '',
          state: '',
          admin: '',
          othername: '',
          ca: '',
          certNum: '',
          certType: '',
          sex: '',
          power: [],
          birthday: '',
          worknumber: '',
          checkname: '',
          loginPhone: '',
          loginEmail: '',
          qq: '',
          wechat: '',
          newNickName: '',
          ucUid: '',
          chartstatus: '',
          selectOrganName: '',
          selectOrganId: '',
          currOrganId: '',
          currOrganName: ''
        },
        rulesStep3: {},
        // 表单校验字段
        rules: {
          certNum: [],
          account: [
            {
              required: true,
              message: '账号或身份证号不能为空',
              trigger: 'blur'
            },
            { min: 3, max: 18, message: '长度在 3 到 18 个字符', trigger: 'blur' }
          ],
          userId: [
            { required: true, message: '账号不能为空', trigger: 'blur' },
            { min: 3, max: 18, message: '长度在 3 到 18 个字符', trigger: 'blur' }
          ],
          nickName: [
            { required: true, message: '岗位名不能为空', trigger: 'blur' },
            { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
          ],
          chartName: [
            { required: true, message: '用户名不能为空', trigger: 'blur' },
            { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
          ],
          idcardtype: [
            { required: true, message: '请选择证件类型', trigger: 'change' }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' }
          ],
          surepassword: [
            { required: true, message: '请再次输入密码', trigger: 'blur' }
          ],
          idcard: [
            { required: true, message: '证件号码不能为空', trigger: 'blur' }
          ],
          loginEmail: [
            { required: true, message: '邮箱不能为空', trigger: 'blur' },
            { type: 'email', message: '正确的邮箱地址', trigger: 'blur' },
            { validator: isemail, trigger: 'blur' }
          ],
          loginPhone: [
            { required: true, message: '手机号码不能为空', trigger: 'blur' },
            {
              pattern: /^[1]([3-9])[0-9]{9}$/,
              message: '手机号格式不对',
              trigger: 'blur'
            },
            { validator: isphone }
          ],
          none: [
            { required: false, message: '手机号码不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    components: {
      // organTree
    },
    computed: {
      struId: {
        get () {
          return this.$store.state.common.struId
        },
        set (val) {
          this.$store.commit('common/updateStruId', val)
        }
      },
      selectOrganName: {
        get () {
          return this.$store.state.common.selectOrganName
        },
        set (val) {
          this.$store.commit('common/updateSelectOrganName', val)
        }
      },
      selectOrganId: {
        get () {
          return this.$store.state.common.selectOrganId
        },
        set (val) {
          this.$store.commit('common/updateSelectOrganId', val)
        }
      },
      // 登录人的organId 用于查询所属机构
      loginOrganId: {
        get () {
          return this.$store.state.common.loginOrganId
        },
        set (val) {
          this.$store.commit('common/updateLoginOrganId', val)
        }
      },
      editUserId: {
        get () {
          return this.$store.state.common.editUserId
        },
        set (val) {
          this.$store.commit('common/updateEditUserId', val)
        }
      },
      userUcUid: {
        get () {
          return this.$store.state.common.userUcUid
        },
        set (val) {
          this.$store.commit('common/updateUserUcUid', val)
        }
      },
      userChartId: {
        get () {
          return this.$store.state.common.userChartId
        },
        set (val) {
          this.$store.commit('common/updateUserChartId', val)
        }
      }
    },
    watch: {
      'ruleForm2.certType' (val) {
        if (val === '1') {
          this.$refs['ruleForm'].rules.certNum = this.extRuleForm.idcard
        } else {
          this.$refs['ruleForm'].rules.certNum = this.extRuleForm.cardRules
        }
      }
    },

    methods: {
      init (dialogTitle) {
        // 表单数据相关
        this.dialogClose()
        this.ruleForm = JSON.parse(JSON.stringify(originFormData))
        this.orignData.phone = ''
        this.orignData.email = ''
        // 弹层dom相关
        this.isLoading = false
        this.dialogTableVisible = true
        this.dialogTitle = dialogTitle
        this.$nextTick(() => {
          this.$refs.ruleForm.clearValidate()
        })
        // this.dataList = todolist;
        // this.getDataList();
      },
      //
      info () {
        /*this.$http({
          url: this.$http.adornUrl('role/roleList'),
          method: 'post',
          params: this.$http.adornParams({}, false, 'notJson'),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })*/
        roleService.getRoleList().then(res => {
            this.roleOptions = res.data.data
          })
          .catch(error => {
            console.log(error)
          })
      },
      // 第三步 查询所属机构
      queryOrganList (organId) {
        /*this.$http({
          url: this.$http.adornUrl('/stru/simpleTree'),
          method: 'get',
          params: this.$http.adornParams(
            {
              organId: this.loginOrganId // 传登录人的organId
            },
            false
          )
        })*/
        // 传登录人的organId
        struService.getTreeByOrgId({organId: this.loginOrganId }).then(res => {
            this.organOptions = []
            let list = res.data.data
            // this.organOptions.push(res.data.data)
            list = this.deleteEmptyProperty(list)
            this.organOptions.push(list)
          })
          .catch(error => {

          })
      },
      // 删除json对象中值为空的key
      deleteEmptyProperty (obj) {
        var object = obj
        for (var i in object) {
          var value = object[i]
          if (typeof value === 'object') {
            if (Array.isArray(value)) {
              if (value.length == 0) {
                delete object[i]
                continue
              }
            }
            this.deleteEmptyProperty(value)
          } else {
            if (value === '' || value === null || value === undefined) {
              delete object[i]
            }
          }
        }
        return object
      },
      // 第一步保存
      saveUserInfo (formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.isLoading = true
            /*this.$http({
              url: this.$http.adornUrl('users/update'),
              method: 'post',
              data: this.$http.adornData(
                {
                  data: {
                    ucUid: this.userUcUid,
                    nickName: this.ruleForm.chartName,
                    loginEmail: this.ruleForm.loginEmail,
                    loginPhone: this.ruleForm.loginPhone,
                    status: this.ruleForm.state
                  },
                  params: {
                    person: 'no',
                    uname: this.ruleForm.chartName
                  }
                },
                false,
                'json'
              )
            })*/
            var params = {
              data: {
                ucUid: this.userUcUid,
                nickName: this.ruleForm.chartName,
                loginEmail: this.ruleForm.loginEmail,
                loginPhone: this.ruleForm.loginPhone,
                status: this.ruleForm.state
              },
              params: {
                person: 'no',
                uname: this.ruleForm.chartName
              }
            }
            userService.updataUser(params).then(res => {
                if (res.data && res.data.status === 0) {
                  this.$message({
                    message: '账号信息保存成功',
                    type: 'success',
                    duration: 1000,
                    onClose: () => {
                      this.goStep2()
                      this.queryPersonInfo(this.userUcUid)
                    }
                  })
                } else {
                  this.$message.warning('网络异常 请稍后重试')
                }
                this.isLoading = false
              })
              .catch(error => {
                this.isLoading = false
              })
          }
        })
      },
      // 提交第二步表单
      savePersonInfo (formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.isLoading = true
            /*this.$http({
              url: this.$http.adornUrl('person/update'),
              method: 'post',
              data: this.$http.adornData(
                {
                  ucUid: this.userUcUid,
                  sex: this.ruleForm2.sex,
                  birthday: this.ruleForm2.birthday,
                  certType: this.ruleForm2.certType,
                  certNum: this.ruleForm2.certNum,
                  uname: this.ruleForm.chartName
                },
                false,
                'json'
              )
            })*/
            personService.update({
              ucUid: this.userUcUid,
              sex: this.ruleForm2.sex,
              birthday: this.ruleForm2.birthday,
              certType: this.ruleForm2.certType,
              certNum: this.ruleForm2.certNum,
              uname: this.ruleForm.chartName
            }).then(res => {
                if (res.data && res.data.status === 0) {
                  this.$message({
                    message: '个人信息保存成功',
                    type: 'success'
                  })
                  this.goStep3()
                  this.queryPermitInfo(this.userChartId)
                } else {
                  this.$message.warning(res.data.msg)
                }
                this.isLoading = false
              })
              .catch(error => {
                this.isLoading = false
                console.log(error)
                this.$message({
                  message: error.response.data.message
                    ? error.response.data.message
                    : '网络异常',
                  type: 'warning'
                })
              })
          }
        })
      },
      // 格式化organid 数组只取最后一个
      formateOrganId (id) {
        if (typeof id === 'string') {
          return id
        } else {
          id = id.pop()
          return id
        }
      },
      // 第三步账号授权保存
      savePermitInfo (formName) {
        this.$refs['ruleForm1'].validate(valid => {
          if (valid) {
            this.isLoading = true
            /*this.$http({
              url: this.$http.adornUrl('character/insert'),
              method: 'post',
              data: this.$http.adornData(
                {
                  chart: {
                    charId: '',
                    charName: this.ruleForm.nickName,
                    ucUid: this.ruleForm.ucUid,
                    status: this.ruleForm.chartstatus,
                    bdefault: false
                  },
                  organId: this.ruleForm.currOrganId,
                  roleIds: this.ruleForm.power
                },
                false,
                'json'
              )
            })*/
            var params = {
              chart: {
                charId: '',
                charName: this.ruleForm.nickName,
                ucUid: this.ruleForm.ucUid,
                status: this.ruleForm.chartstatus,
                bdefault: false
              },
              organId: this.ruleForm.currOrganId,
              roleIds: this.ruleForm.power
            };
              characterService.insert(params).then(res => {
                if (res.data && res.data.status === 0) {
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration: 1000,
                    onClose: () => {
                      this.$emit('refreshDataList')
                      this.dialogClose(formName)
                      // this.resetForm(formName);
                    }
                  })
                } else {
                  this.$message.error('操作失败 请稍后重试')
                }
                this.isLoading = false
              })
              .catch(error => {
                this.isLoading = false
              })
          }
        })
      },
      // 重置第一个表单
      resetFormStep1 () {
        this.ruleForm.chartName = this.originStepForm.nickName
        this.ruleForm.loginPhone = this.originStepForm.loginPhone
        this.ruleForm.loginEmail = this.originStepForm.loginEmail
        this.ruleForm.state = this.originStepForm.status
        this.$nextTick(() => {
          this.$refs['ruleForm'].clearValidate()
        })
        // this.originStepForm
      },
      // 重置第二个表单
      resetFormStep2 () {
        this.ruleForm2.sex = this.originStepForm.sex
        this.ruleForm2.birthday = this.originStepForm.birthday
        this.ruleForm2.certNum = this.originStepForm.certNum
        this.ruleForm2.certType = this.originStepForm.certType
        this.$nextTick(() => {
          this.$refs['ruleForm'].clearValidate()
        })
      },
      // 重置表单
      resetForm (formName) {
        this.ruleForm.organId = this.originStepForm.organId
        this.ruleForm.power = this.originStepForm.power
        this.ruleForm.nickName = this.originStepForm.nickName
        this.ruleForm.chartstatus = this.originStepForm.chartstatus
        this.$nextTick(() => {
          this.$refs['ruleForm1'].clearValidate()
        })
      },
      dialogClose (formName) {
        this.ruleForm.userId = ''
        this.ruleForm.nickName = ''
        this.ruleForm.loginPhone = ''
        this.ruleForm.loginEmail = ''
        this.hasAccount = false
        this.active = 0
        this.isStep1 = true
        this.isStep2 = false
        this.isStep3 = false
        this.dialogTableVisible = false
      },
      clearFormData () {
        this.ruleForm.userId = ''
        this.ruleForm.nickName = ''
        this.ruleForm.loginPhone = ''
        this.ruleForm.loginEmail = ''
      },
      goStep1 () {
        this.isStep3 = false
        this.isStep2 = false
        this.isStep1 = true
        this.active = 0
      },
      // 无账号 第一步按钮
      goStep2 () {
        this.isStep3 = false
        this.isStep2 = true
        this.isStep1 = false
        this.active = 1
        this.queryPersonInfo(this.userUcUid)
      },
      goStep3 () {
        this.active = 2
        this.isStep3 = true
        this.isStep2 = false
        this.isStep1 = false
        this.ruleForm.power = []
        this.$refs['ruleForm'].clearValidate()
        this.info()
        // this.queryPermitInfo(this.userChartId);
      },
      // 初始化查询账号信息
      queryUserInfo (id) {
       /* this.$http({
          url: this.$http.adornUrl('users/info/ucuid'),
          method: 'get',
          params: this.$http.adornParams(
            {
              ucUid: id
            },
            false
          )
        })*/
          userService.getUserInfoByUcuid({  ucUid: id}).then(res => {
            if (res.data && res.data.status === 0) {
              this.hasAccount = true
              this.ruleForm.userId = res.data.data.userId
              this.ruleForm.chartName = res.data.data.nickName
              this.ruleForm.loginPhone = res.data.data.loginPhone
              this.ruleForm.loginEmail = res.data.data.loginEmail
              this.ruleForm.ucUid = res.data.data.ucUid
              this.ruleForm.state = res.data.data.status
              // 修改时表单校验用
              this.orignData.phone = res.data.data.loginPhone
              this.orignData.email = res.data.data.loginEmail

              this.originStepForm = res.data.data
            } else {
              this.$message.warning(res.msg ? res.msg : '网络异常')
            }
          })
          .catch(error => {
          })
      },
      // 初始化查询个人信息
      queryPersonInfo (id) {
        this.ruleForm2.sex = ''
        this.ruleForm2.birthday = ''
        this.ruleForm2.certNum = ''
        this.ruleForm2.certType = ''
        this.orignData.card = ''
        this.originStepForm = {}

        /*this.$http({
          url: this.$http.adornUrl('person/info'),
          method: 'get',
          params: this.$http.adornParams(
            {
              ucUid: id
            },
            false
          )
        })*/
          personService.getInfo({ucUid: id}).then(res => {
            if (res.data.data && res.data.status === 0) {
              this.hasAccount = true
              this.ruleForm2.sex = res.data.data.sex
              this.ruleForm2.birthday = res.data.data.birthday
              this.ruleForm2.certNum = res.data.data.certNum
              this.ruleForm2.certType = res.data.data.certType
              this.originStepForm = res.data.data
              this.orignData.card = res.data.data.certNum
            }
          })
          .catch(error => {

          })
      },
      // 初始化查询账号授权
      queryPermitInfo (id) {
   /*     this.$http({
          url: this.$http.adornUrl('character/permitinfo'),
          method: 'get',
          params: this.$http.adornParams(
            {
              chartId: id
            },
            false
          )
        })*/
        characterService.characterPermitinfo({chartId: id}).then(res => {
            if (res.data && res.data.status === 0) {
              // this.organName = res.data.data.organ.organName;
              //
              // this.ruleForm.organId = res.data.data.organ.organId;
              // this.ruleForm.organName = res.data.data.organ.organName;
              // this.ruleForm.selectOrganName = res.data.data.organ.organName;
              // this.ruleForm.nickName = res.data.data.charName;
              this.ruleForm.power = []
              if (Array.isArray(res.data.data.permits)) {
                res.data.data.permits.forEach(item => {
                  this.ruleForm.power.push(item.roleId)
                })
              }
              // this.ruleForm.power = Array.isArray(res.data.data.permits) ? res.data.data.permits : []
              this.ruleForm.chartstatus = res.data.data.status
              // 表单重置项的赋值
              this.originStepForm.organId = this.ruleForm.organId
              this.originStepForm.power = this.ruleForm.power
              this.originStepForm.nickName = this.ruleForm.nickName
              this.originStepForm.chartstatus = this.ruleForm.chartstatus
              // this.originStepForm.selectOrganName = this.ruleForm.selectOrganName

              // 查询所属机构
              // this.queryOrganList(this.ruleForm.organId)
            } else {
              this.$message.warning(res.msg ? res.msg : '网络异常')
            }
          })
          .catch(error => {

          })
      },
      // 通过ruleform的
      setAgeSexByIdCard () {
        if (this.ruleForm2.certType !== '1') {
          return
        }
        let idcard = this.ruleForm2.certNum
        if (!idcard) {
          return
        }
        // let sexStr = ''
        if (idcard.length === 15) {
          let flag = parseInt(idcard.substr(-1, 1)) % 2
          if (flag === 1) {
            this.ruleForm2.sex = '1'
          } else if (flag === 0) {
            this.ruleForm2.sex = '2'
          }

          this.ruleForm2.birthday = `19${idcard.substr(6, 2)}-${idcard.substr(
            8,
            2
          )}-${idcard.substr(10, 2)}`
        } else if (idcard.length === 18) {
          let flag = parseInt(idcard.substr(-2, 1)) % 2
          if (flag === 1) {
            this.ruleForm2.sex = '1'
          } else if (flag === 0) {
            this.ruleForm2.sex = '2'
          }

          this.ruleForm2.birthday = `${idcard.substr(6, 4)}-${idcard.substr(
            10,
            2
          )}-${idcard.substr(12, 2)}`
        }
      },
      editOrgan () {
        this.dialogOrganVisible = true
        this.initTreeNode()
      },
      initTreeNode () {
       /* this.$http({
          url: this.$http.adornUrl('authen/loginfo/full'),
          method: 'get'
        })*/
        userOtherService.loginfoFull().then(res => {
            let list = res.data.data.activeChart
            this.selectOrganName = res.data.data.activeChart.corpName
            this.selectOrganId = res.data.data.activeChart.corpId
            this.loginOrganId = res.data.data.activeChart.corpId
            let str = {}
            str.id = list.corpId
            str.struId = ''
            str.label = list.corpName
            str.organName = list.corpName
            str.children = [{}]
            this.treeData.push(str)
            // 默认展开根节点
            this.expandedKeys.push(str.id)
            // 请求struId
            /*this.$http({
              url: this.$http.adornUrl('stru/getStru'),
              method: 'get',
              params: this.$http.adornParams(
                {
                  organId: str.id
                },
                false
              )
            })*/
              struService.getStru({  organId: str.id}).then(res => {
                this.treeRootParam.struId = res.data.data.struId
                this.treeRootParam.struType = res.data.data.struType
                this.treeRootParam.organCode = res.data.data.organCode
                this.treeRootParam.organName = res.data.data.organName
                this.treeRootParam.organId = res.data.data.organId
                //
                let list = res.data.data.struId
                str.struId = list
                // this.firstNode.struId=list;
                this.struId = list
                this.treeData.push(str)
                // 初始化查询树的下级 默认显示用
                this.getChildNode(str)
              })
              .catch(error => {

              })
          })
          .catch(error => {

          })
      },
      getChildNode (data) {
        // 存 store  新增人员时用到
        this.struId = data.struId
        // this.selectOrganName = data.organName;
        // this.selectOrganId = data.id;
       /* this.$http({
          url: this.$http.adornUrl('stru/children'),
          method: 'get',
          params: this.$http.adornParams(
            {
              organId: data.id,
              struType: this.treeRootParam.struType,
              page: nodePage.page,
              pageSize: nodePage.pageSize
            },
            false
          )
        })*/
         struService.query({
           organId: data.id,
           struType: this.treeRootParam.struType,
           page: nodePage.page,
           pageSize: nodePage.pageSize
         }) .then(res => {
            data.children = []
            let list = res.data.data.rows
            for (let i = 0; i < list.length; i++) {
              let item = this.fillData(list[i])
              data.children.push(item)
            }
          })
          .catch(error => {
            console.log(error)
            this.$message({
              message: error.response.data.message
                ? error.response.data.message
                : '网络异常',
              type: 'warning'
            })
          })
      },
      // 树点击后事件
      handleNodeClick (data) {
        this.getChildNode(data)
        console.log(data)
        this.ruleForm.currOrganId = data.id
        this.ruleForm.currOrganName = data.organName
        this.dialogOrganVisible = false
      },
      handleNodeExpand (data) {
        this.getChildNode(data)
      },
      fillData (data) {
        let str = {}
        str.id = data.organId
        str.organCode = data.organCode
        str.struId = data.id
        str.label = data.organName
        str.organName = data.organName
        str.organShort = data.organShort
        str.children = [{}]
        return str
      }
    }
  }
</script>

<style lang="scss" >
</style>

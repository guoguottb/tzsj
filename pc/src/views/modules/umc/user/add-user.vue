<template>
  <el-dialog :title="dialogTitle"
             :visible.sync="dialogTableVisible"
             class="tasklist-table"
             :close-on-click-modal="false"
             :close-on-press-escape="false">
    <el-steps :active="active"
              process-status="finish"
              align-center
              finish-status="success">
      <el-step title="已有账号"></el-step>
      <el-step title="新增账号"></el-step>
      <el-step title="账号授权"></el-step>
    </el-steps>
    <el-form :model="ruleForm"
             :rules="rules"
             ref="ruleForm"
             label-width="100px"
             class="demo-ruleForm"
             size="small"
             @submit.native.prevent
             :label-position="labelPosition">
      <div class="addUser-step"
           v-if="isStep1">
        <el-row>
          <el-col :span="20">
            <el-form-item label="登录账号"
                          prop="account">
              <el-input v-model="ruleForm.account"
                        placeholder="登录账号/邮箱"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="4">
            <el-button type="primary"
                       icon="el-icon-search"
                       @click="checkUserId"></el-button>
          </el-col>
          <el-col :span="24">
            <p>
              我没有账号，需要
              <el-button type="text"
                         @click="goStep">创建</el-button>
            </p>
          </el-col>
          <div class="accountInfo"
               v-if="hasAccount">
            <el-col :span="12">
              <el-form-item label="账号"
                            prop="userId">
                <el-input v-model="ruleForm.userId"
                          disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="姓名"
                            prop="nickName">
                <el-input v-model="ruleForm.nickName"
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
            <el-col :span="24"
                    class="text-center">
              <el-button type="primary"
                         :loading="isLoading"
                         @click="goStep3">确定</el-button>
            </el-col>
          </div>
        </el-row>
      </div>
      <!-- 第二步 基本信息-->
      <div class="addUser-step"
           v-if="isStep2">
        <el-row>
          <el-col :span="12">
            <!-- 处理第一个表单项校验失效的问题 别问,问我也不知道为什么能行 -->
            <el-form-item label
                          prop
                          style="display: none">
              <el-input></el-input>
            </el-form-item>
            <!-- 处理第一个表单项校验失效的问题 -->
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名"
                          prop="nickName">
              <el-input v-model="ruleForm.nickName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号码"
                          prop="loginPhone">
              <el-input v-model="ruleForm.loginPhone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="证件类型"
                          prop="idcardtype">
              <el-select v-model="ruleForm.idcardtype"
                         placeholder="请选择证件类型">
                <el-option v-for="item in dicts.dictList['IDCARD_TYPE']"
                           :key="item.itemCode"
                           :label="item.itemValue"
                           :value="item.itemCode"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="证件号码"
                          prop="idcard">
              <el-input @change="setAgeSexByIdCard"
                        v-model="ruleForm.idcard"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="密码"
                          prop="password">
              <el-input v-model="ruleForm.password"
                        type="text"
                        autocomplete="off"
                        onfocus="this.type='password'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="确认密码"
                          prop="surepassword">
              <el-input v-model="ruleForm.surepassword"
                        onfocus="this.type='password'"
                        autocomplete="off"
                        type="text"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱"
                          prop="loginEmail">
              <el-input v-model="ruleForm.loginEmail"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别"
                          prop="sex">
              <el-select clearable
                         placeholder="请选择性别"
                         v-model="ruleForm.sex">
                <el-option v-for="item in dicts.dictList['GenderCode']"
                           :key="item.itemCode"
                           :label="item.itemValue"
                           :value="item.itemCode">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="出生日期"
                          prop="birthday">
              <el-form-item prop="date">
                <el-date-picker type="date"
                                placeholder="选择日期"
                                v-model="ruleForm.birthday"
                                value-format="yyyy-MM-dd"
                                style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位座机" prop="officePhone">
              <el-input v-model="ruleForm.officePhone"/>
            </el-form-item>
          </el-col>
          <!--
          <el-col :span="12">
            <el-form-item label="是否已实名" prop="checkname">
              <el-switch v-model="ruleForm.checkname" active-text="是" inactive-text="否"></el-switch>
            </el-form-item>
          </el-col>-->
          <el-col :span="24"
                  class="text-center">
            <el-button type="primary"
                       :loading="isLoading"
                       @click="submitForm('ruleForm')">下一步</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-col>
        </el-row>
      </div>
      <!-- 第三部 创建角色-->
      <div class="addUser-step"
           v-if="isStep3">
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
                          prop="nickName">
              <el-input v-model="ruleForm.nickName"
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
                          prop="userId">
              <el-input v-model="currOrganName"
                        disabled>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="岗位名称"
                          prop="nickName">
              <el-input v-model="ruleForm.newNickName"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="角色权限">
              <el-select v-model="roleIds"
                         multiple
                         placeholder="请选择权限">
                <el-option v-for="item in options"
                           :key="item.roleId"
                           :label="item.name"
                           :value="item.roleId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="岗位排位"
                          prop="charSortNo">
              <el-input v-model="ruleForm.charSortNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="岗位状态"
                          prop="chartstatus">
              <el-switch v-model="ruleForm.chartstatus"
                         active-text="打开"
                         active-value="11"
                         inactive-value="10"
                         inactive-text="停用"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="24"
                  class="text-center">
            <el-button type="primary"
                       :loading="isLoading"
                       @click="addNewAccount('ruleForm')">保存</el-button>
            <el-button @click="resetFormStep3('ruleForm')">重置</el-button>
          </el-col>
        </el-row>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
import { isLetterNumUl } from '@/utils'
import  userService from "../../../../api/user/userService";
import struService from "../../../../api/stru/struService";
import characterService from '../../../../api/system/characterService'
import userOtherService from "../../../../api/system/system";
import roleService from "../../../../api/user/role-manage";
import personService from "../../../../api/user/person";
const originFormData = {
  account: '',
  userId: '',
  nickName: '',
  password: '',
  surepassword: '',
  state: '',
  admin: '',
  othername: '',
  ca: '',
  idcard: '',
  idcardtype: '1',
  sex: [],
  birthday: '',
  worknumber: '',
  checkname: '',
  loginPhone: '',
  officePhone: '',
  loginEmail: '',
  qq: '',
  wechat: '',
  newNickName: '',
  charSortNo: '',
  ucUid: '',
  power: [],
  chartstatus: '11',
  organId: ''
}
export default {
  props: ['dicts'],
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空'))
      } else {
        if (this.ruleForm.surepassword !== '') {
          this.$refs.ruleForm.validateField('surepassword')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    let isphone = (rule, value, callback) => {
      userService.checkPhoneUnique({phone: value}) .then(res => {
          if (res.data === 0) {
            callback()
          } else if (res.data === 1) {
            callback(new Error('您的手机号已存在'))
          } else {
            callback(new Error('网络异常'))
          }
        })
        .catch(e => {
          callback(new Error('网络异常'))
        })
    }
    let isemail = (rule, value, callback) => {
      userService.checkEmailUnique({email: value}).then(res => {
        if (res.data.data === 0) {
          callback()
        } else if (res.data.data === 1) {
          callback(new Error('您的邮箱已存在'))
        } else {
          callback(new Error('网络异常'))
        }
      }).catch(error => {
        callback(new Error('网络异常'))
        console.log(error)
      })
    }
    let isuserId = (rule, value, callback) => {
      userService.checkUserIdUnique({userId: value}).then(res => {
        if (res.data.data === 0) {
          callback()
        } else if (res.data.data === 1) {
          callback(new Error('您的账号已存在'))
        } else {
          callback(new Error('网络异常'))
        }
      }).catch(error => {
        callback(new Error('网络异常'))
        console.log(error)
      })
    }
    let iscard = (rule, value, callback) => {
      if (value) {
        this.setAgeSexByIdCard()
      }
      personService.checkCertNumUnique({ certNum: value}).then(res => {
        if (res.data === 0) {
          callback()
        } else if (res.data === 1) {
          callback(new Error('您的证件号已存在'))
        } else {
          callback(new Error('网络异常'))
        }
      }).catch(error => {
        callback(new Error('网络异常'))
        console.log(error)
      })
    }
    return {
      isLoading: false,
      valueTitle: [],
      props: {
        label: 'name',
        children: 'zones'
      },
      currOrganId: '',
      currOrganName: '',
      // 所属机构
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
      // 导航步骤与对应的三个表单
      isStep1: true,
      isStep2: false,
      isStep3: false,
      isShow: true,
      dialogTableVisible: false,
      memorandumAddVisible: false,
      dialogTitle: '',
      dataListLoading: false,
      labelPosition: 'right',
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      roleIds: [],
      value: '',
      selectedOptions: [],
      extRuleForm: {
        idcard: [
          { required: true, message: '请填写证件号码', trigger: 'blur' },
          {
            pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
            message: '证件号码格式错误',
            trigger: 'blur'
          },
          { validator: iscard, trigger: 'blur' }
        ],
        cardRules: [
          { required: true, message: '证件号不能为空', trigger: 'blur' },
          { validator: iscard, trigger: 'blur' }
        ]
      },
      // 表单字段
      ruleForm: {
        account: '',
        userId: '',
        nickName: '',
        password: '',
        surepassword: '',
        state: '',
        admin: '',
        othername: '',
        ca: '',
        idcard: '',
        idcardtype: '1',
        sex: [],
        birthday: '',
        worknumber: '',
        checkname: '',
        loginPhone: '',
        officePhone: '',
        loginEmail: '',
        qq: '',
        wechat: '',
        newNickName: '',
        charSortNo: '',
        ucUid: '',
        power: [],
        chartstatus: '11',
        organId: ''
      },
      options: [],
      // 表单校验字段
      rules: {
        password: [
          { required: true, validator: validatePass, trigger: 'blur' },
          { min: 6, max: 30, message: '长度在 6 到 30 个字符' },
          { pattern: /^(?=.*[0-9])(?=.*[a-zA-Z]).{6,30}/, message: '密码至少包含数字和字母' }
        ],
        surepassword: [{ required: true, validator: validatePass2, trigger: 'blur' }],
        loginEmail: [
          {type: 'email', message: '邮箱格式错误', trigger: 'blur'}
          // 暂时去掉邮箱的重复和非空验证
          // {required: true, message: '邮箱不能为空', trigger: 'blur'},
          // {validator: emailUniqueCheck, trigger: 'blur'}
        ],
        /*userId: [
          { required: true, message: '账号', trigger: 'blur' },
          { validator: isLetterNumUl },
          {
            min: 3,
            max: 18,
            message: '长度在 3 到 18 个字符',
            trigger: 'blur'
          },
          { validator: isuserId, trigger: 'blur' }
        ],*/
        nickName: [
          { required: true, message: '姓名不能为空', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
        ],
        idcardtype: [
          { required: true, message: '请选择证件类型', trigger: 'change' }
        ],
        idcard: [
          { required: true, message: '请填写证件号码', trigger: 'blur' },
          {
            pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
            message: '证件号码格式错误',
            trigger: 'blur'
          },
          { validator: iscard, trigger: 'blur' }
        ],
        loginPhone: [
          {
            required: true,
            message: '手机号不能为空',
            trigger: 'blur'
          },
          {
            pattern: /^[1]([3-9])[0-9]{9}$/,
            message: '手机号格式错误',
            trigger: 'blur'
          },
          { validator: isphone, trigger: 'blur' }
        ],
        none: [{ required: false, message: '手机号码', trigger: 'blur' }],
        officePhone: [
            {
                pattern: /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/,
                message: '单位座机格式错误',
                trigger: 'blur'
            }
        ],
        charSortNo: [
            { required: false,
                message: '岗位排位',
                trigger: 'blur'
            },
            {
                pattern: /^[1-9]([0-9])*$/,
                message: '岗位排位格式错误',
                trigger: 'blur'
            }
        ]
      }
    }
  },
  components: {},
  computed: {
    struId: {
      get () {
        return this.$store.state.common.struId
      },
      set (val) {
        this.$store.commit('common/updateStruId', val)
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
    }
  },
  mounted () {
    this.isShow = true
    this.options.push(this.parentTochild)
    let lists = this.parentTochild
  },
  created () {
    this.isShow = true
    this.info()
  },
  watch: {
    isStep2 (val) {
      if (val) {
        this.$nextTick(() => {
          this.$refs['ruleForm'].resetFields()
        })
      }
    },
    'ruleForm.idcardtype' (val) {
      if (val === '1') {
        this.$refs['ruleForm'].rules.idcard = this.extRuleForm.idcard
      } else {
        this.$refs['ruleForm'].rules.idcard = this.extRuleForm.cardRules
      }
      this.$refs['ruleForm'].clearValidate('idcard')
    }
  },
  methods: {
    info () {
      roleService.getRoleList().then(res => {
        if (res.status === 0) {
          this.options = res.data
        } else {
          this.$message.warning(res.msg ? res.msg : '网络异常')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 第三步 查询所属机构
    queryOrganList (organId) {
      this.ruleForm.organId = this.selectOrganId
      struService.getTreeByOrgId({organId: this.loginOrganId}).then(res => {
        if (res.data.status === 0) {
          this.organOptions = []
          let list = res.data.data
          list = this.deleteEmptyProperty(list)
          this.organOptions.push(list)
        } else {
          this.$message.warning(res.msg ? res.msg : '网络异常')
        }
      }).catch(error => {
        console.log(error)
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
    // 格式化organid 数组只取最后一个
    formateOrganId (id) {
      if (typeof id === 'string') {
        return id
      } else {
        id = id.pop()
        return id
      }
    },
    init (dialogTitle, organId, organName) {
      this.isLoading = false
      this.dialogTableVisible = true
      this.dialogTitle = dialogTitle
      this.currOrganId = organId
      this.currOrganName = organName
      this.ruleForm = JSON.parse(JSON.stringify(originFormData))
      this.roleIds = []
      this.dialogClose()
    },
    // 提交第二步表单
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
     /*     this.isLoading = true*/
          this.goStep3();
          /*userOtherService.addUser(params).then(res => {
              this.ruleForm.sex = ''
              if (res.data && res.status === 0) {
                this.ruleForm.ucUid = res.data.ucUid
                this.ruleForm.userId = res.data.userId
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1000,
                  onClose: () => {
                    this.checkUserId()
                    this.goStep3()
                  }
                })
              } else {

                this.$message.warning(res.data.msg ? res.data.msg : '网络异常 请稍后重试')
              }
              this.isLoading = false
            })
            .catch(error => {
              this.isLoading = false
              console.log(error)
            })*/
        }
      })
    },
    // 重置第1步表单
    // 重置第2步表单
    // 重置第3步表单
    resetFormStep3 () {
      // this.ruleForm.organId = ''
      this.ruleForm.newNickName = ''
      this.roleIds = []
      this.ruleForm.chartstatus = '11'
    },
    // 重置表单
    resetForm (formName) {
      this.isLoading = false
      this.$refs[formName].resetFields()
      // this.ruleForm=[]
    },
    dialogClose (formName) {
      this.hasAccount = false
      this.active = 0
      this.isStep1 = true
      this.isStep2 = false
      this.isStep3 = false
    },
    clearFormData () {
      this.ruleForm.userId = ''
      this.ruleForm.nickName = ''
      this.ruleForm.loginPhone = ''
      this.ruleForm.loginEmail = ''
      this.ruleForm.newNickName = ''
      this.ruleForm.charSortNo = ''
    },
    // 无账号 第一步按钮
    goStep () {
      this.active = 1
      this.isStep2 = true
      this.isStep3 = false
      this.isStep1 = false
      this.isShow = true
      this.clearFormData()
    },
    goStep3 () {
      this.active = 2
      this.isStep3 = true
      this.isStep2 = false
      this.isStep1 = false
      this.isShow = true
      this.ruleForm.account = ''
      this.ruleForm.newNickName = ''
      this.ruleForm.charSortNo = ''

        // 查询所属机构
      this.queryOrganList(this.ruleForm.organId)
    },
    // 第一步确定按钮 查询账号是否有
    checkUserId () {
      if (this.ruleForm.account) {
        userService.getUserInfo({userId: this.ruleForm.account}).then(res => {
            if (res.data && res.data.status === 0) {
              this.hasAccount = true
              this.ruleForm.userId = res.data.data.userId
              this.ruleForm.nickName = res.data.data.nickName
              this.ruleForm.loginPhone = res.data.data.loginPhone
              this.ruleForm.loginEmail = res.data.data.loginEmail
              this.isShow = false
            } else {
              this.$confirm(
                '没有查询到此账号，请确认是否输入正确，若需创建，请点击创建按钮',
                '提示',
                {
                  confirmButtonText: '创建',
                  cancelButtonText: '取消',
                  type: 'warning'
                })
                .then(() => {
                  this.goStep()
                  this.ruleForm.account = ''
                }).catch(res => {
                  this.ruleForm.account = ''
                })
            }
          })
          .catch((error) => {

          })
      }
    },
    // 新增人物  第三步 弹层最终的保存
    addNewAccount (formName) {
      if (this.ruleForm.newNickName) {
        this.isLoading = true
          var params =   {
              user: {
                  ucUid:'',
                  userId: this.ruleForm.userId,
                  nickName: this.ruleForm.nickName,
                  loginEmail: this.ruleForm.loginEmail,
                  loginPhone: this.ruleForm.loginPhone,
                  password: this.ruleForm.password
              },
              person: {
                  uname: this.ruleForm.nickName,
                  sex: this.ruleForm.sex,
                  birthday: this.ruleForm.birthday,
                  certType: this.ruleForm.idcardtype,
                  certNum: this.ruleForm.idcard
              },
              chart: {
                  charId:"",
                  charName:this.ruleForm.newNickName,
                  bdefault:false,
                  organId:this.currOrganId,
                  status: this.ruleForm.chartstatus,
                  roles:this.roleIds
              }
          };
          userOtherService.addUser(params)
        /*characterService.saveCharacter(params)*/.then(res => {
            if (res.data && res.status === 0) {
              this.$message({
                message: '新增成功',
                type: 'success'
              })
              this.$emit('refreshDataList')
              this.dialogTableVisible = false
            } else {
              this.$message.warning(res.msg ? res.msg : '网络异常 请稍后重试')
            }
            this.isLoading = false
          })
          .catch(error => {
            this.isLoading = false
          })
      } else {
        this.$message.warning('岗位名称不能为空')
      }
    },
    // 获取当前选中的菜单id数据集合
    getCheckedKeys (data, state) {
      this.valueTitle.push(data[this.defaultProps.label])
    },
    // 通过ruleform的
    setAgeSexByIdCard () {
      if (this.ruleForm.idcardtype !== '1') {
        return
      }
      let idcard = this.ruleForm.idcard
      if (!idcard) {
        return
      }
      if (idcard.length === 15) {
        let flag = parseInt(idcard.substr(-1, 1)) % 2
        if (flag === 1) {
          this.ruleForm.sex = '1'
        } else if (flag === 0) {
          this.ruleForm.sex = '2'
        }

        this.ruleForm.birthday = `19${idcard.substr(6, 2)}-${idcard.substr(8, 2)}-${idcard.substr(10, 2)}`
      } else if (idcard.length === 18) {
        let flag = parseInt(idcard.substr(-2, 1)) % 2
        if (flag === 1) {
          this.ruleForm.sex = '1'
        } else if (flag === 0) {
          this.ruleForm.sex = '2'
        }
        this.ruleForm.birthday = `${idcard.substr(6, 4)}-${idcard.substr(10, 2)}-${idcard.substr(12, 2)}`
      }
    }
  }
}
</script>

<style scoped>
</style>

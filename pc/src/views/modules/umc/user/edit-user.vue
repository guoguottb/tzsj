<template>
<el-dialog :title="dialogTitle" :visible.sync="dialogTableVisible" :close-on-click-modal="false" :close-on-press-escape="false">
  <el-steps :active="active" process-status="finish" align-center finish-status="success">
    <el-step title="账号信息" />
    <el-step title="个人信息" />
    <el-step title="账号授权" />
  </el-steps>

  <!-- 第一步 账号信息-->
  <div class="addUser-step" v-if="active===0">
    <el-form :model="userModel" :rules="userFormRules" ref="userForm" label-width="100px" class="demo-ruleForm" size="small" :label-position="labelPosition">
      <el-row>
        <div class="accountInfo">
          <el-col :span="12">
            <el-form-item label="登录账号" prop="userId">
              <el-input v-model="userModel.userId" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名" prop="nickName">
              <el-input v-model="userModel.nickName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号" prop="loginPhone">
              <el-input v-model="userModel.loginPhone" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="loginEmail">
              <el-input v-model="userModel.loginEmail" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="是否停用">
              <el-switch v-model="userModel.status" active-text="启用" :active-value="11" :inactive-value="10" inactive-text="停用" />
            </el-form-item>
          </el-col>
          <el-col :span="24" class="text-center">
            <el-button type="primary" :loading="isLoading" @click="saveUserInfo">保存</el-button>
            <el-button type="primary" @click="skipToStep2">跳过</el-button>
            <el-button @click="resetUserForm">重置</el-button>
          </el-col>
        </div>
      </el-row>
    </el-form>
  </div>

  <!-- 第二步 个人信息-->
  <div class="addUser-step" v-if="active===1">
    <el-form :model="personModel" :rules="personFormRules" ref="personForm" label-width="100px" class="demo-ruleForm" size="small" :label-position="labelPosition">
      <el-row>
        <el-col :span="12">
          <el-form-item label="证件类型">
            <el-select v-model="personModel.certType" placeholder="请选择证件类型">
              <el-option v-for="item in dicts.dictList['IDCARD_TYPE']" :key="item.itemCode" :label="item.itemValue" :value="item.itemCode" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="证件号码" prop="certNum">
            <el-input @change="setAgeSexByIdCard" v-model="personModel.certNum" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出生日期">
            <el-form-item prop="date">
              <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="personModel.birthday" style="width: 100%;" />
            </el-form-item>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别">
            <el-select clearable placeholder="请选择性别" v-model="personModel.sex">
              <el-option v-for="item in dicts.dictList['GenderCode']" :key="item.itemCode" :label="item.itemValue" :value="item.itemCode" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" style="float:none;">
          <el-form-item label="单位座机" prop="officePhone">
            <el-input v-model="personModel.officePhone" />
          </el-form-item>
        </el-col>
        <el-col :span="24" class="text-center">
          <el-button type="info" @click="backToStep1">上一步</el-button>
          <el-button type="primary" @click="skipToStep3">跳过</el-button>
          <el-button type="primary" :loading="isLoading" @click="savePersonInfo">保存</el-button>
          <el-button @click="resetPersonForm">重置</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>

  <!-- 第三步 账号授权-->
  <div class="addUser-step" v-if="active===2">
    <el-form :model="permitModel" :rules="permitFormRules" ref="permitForm" label-width="100px" class="demo-ruleForm" size="small" :label-position="labelPosition">
      <div class="page-header">
        <h3>账号信息</h3>
      </div>
      <el-row>
        <el-col :span="12">
          <el-form-item label="账号">
            <el-input v-model="originUserData.userId" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="姓名">
            <el-input v-model="originUserData.nickName" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号">
            <el-input v-model="originUserData.loginPhone" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱">
            <el-input v-model="originUserData.loginEmail" disabled />
          </el-form-item>
        </el-col>
      </el-row>
      <div class="page-header">
        <h3>岗位权限</h3>
      </div>
      <el-row>
        <el-col :span="12">
          <el-form-item label="所属机构">
            <el-input v-model="permitModel.organName" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="岗位名称" prop="charName">
            <el-input v-model="permitModel.charName" />
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="角色权限">
            <el-select v-model="permitModel.roleIds" multiple placeholder="请选择权限">
              <el-option v-for="item in roleOptions" :key="item.roleId" :label="item.name" :value="item.roleId" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="岗位排位">
            <el-input v-model="permitModel.sortNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="岗位状态">
            <el-switch v-model="permitModel.status" active-text="启用" :active-value="11" :inactive-value="10" inactive-text="停用" />
          </el-form-item>
        </el-col>
        <el-col :span="24" class="text-center">
          <el-button type="info" @click="backToStep2">上一步</el-button>
          <el-button type="primary" :loading="isLoading" @click="savePermitInfo">保存</el-button>
          <el-button @click="resetPermitForm">重置</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</el-dialog>
</template>

<script>
// import {
//   encryptDes,
//   decryptDes
// } from '@/utils/aes'

import userOtherService from "../../../../api/system/system";
import userService from '../../../../api/user/userService'
import characterService from '../../../../api/system/characterService'
import personService from "../../../../api/user/person";
import roleService from "../../../../api/user/role-manage";
export default {
  props: ['dicts'],
  data() {
    let phoneUniqueCheck = (rule, value, callback) => {
      if (!value || this.originUserData.loginPhone === value) {
        return callback()
      }
      userService.checkPhoneUnique({ phone: value}).then(res => {
        if (res.data.data === 0) {
          return callback()
        } else {
          return callback(new Error('您的手机号已存在'))
        }
      })
    }
    let emailUniqueCheck = (rule, value, callback) => {
      if (!value || this.originUserData.loginEmail === value) {
        return callback()
      }
      userService.checkEmailUnique({ email: value}).then(res => {
        if (res.data.data === 0) {
          return callback()
        } else {
          return callback(new Error('您的邮箱已存在'))
        }
      })
    }
    let certNumUniqueCheck = (rule, value, callback) => {
      if (!value || this.originPersonData.certNum === value) {
        return callback()
      }
      this.setAgeSexByIdCard()
      personService.checkCertNumUnique({  certNum: value}).then(res => {
        if (res.data === 0) {
          return callback()
        } else {
          return callback(new Error('您的证件号已存在'))
        }
      })
    }
    return {
      isChange: true,
      dialogTableVisible: false,
      dialogTitle: '',
      labelPosition: 'right',
      isLoading: false,
      // 当前编辑账号主键，固定不变
      ucUid: '',
      // 当前编辑岗位主键，固定不变
      charId: '',
      // 步骤当前激活状态
      active: 0,

      // 初始账号数据，重置表单使用
      originUserData: {},
      // 账号信息数据模型
      userModel: {},
      // 账号信息表单验证规则
      userFormRules: {
        userId: [{
            required: true,
            message: '账号不能为空',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 18,
            message: '长度在 3 到 18 个字符',
            trigger: 'blur'
          }
        ],
        nickName: [{
            required: true,
            message: '姓名不能为空',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 15,
            message: '长度在 2 到 15 个字符',
            trigger: 'blur'
          }
        ],
        loginEmail: [{
            type: 'email',
            message: '邮箱格式错误',
            trigger: 'blur'
          }
          // 暂时去掉邮箱的重复和非空验证
          // {required: true, message: '邮箱不能为空', trigger: 'blur'},
          // {validator: emailUniqueCheck, trigger: 'blur'}
        ],
        loginPhone: [{
            required: true,
            message: '手机号码不能为空',
            trigger: 'blur'
          },
          {
            pattern: /^[1]([3-9])[0-9]{9}$/,
            message: '手机号格式错误',
            trigger: 'blur'
          },
          {
            validator: phoneUniqueCheck,
            trigger: 'blur'
          }
        ]
      },

      // 初始个人信息数据，重置表单使用
      originPersonData: {},
      // 个人信息数据模型
      personModel: {},
      // 个人信息表单验证规则
      personFormRules: {
        officePhone: [{
          pattern: /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/,
          message: '单位座机格式错误',
          trigger: 'blur'
        }],
        certNum: []
      },
      extRuleForm: {
        // 身份证号码验证
        idCardNum: [{
            required: true,
            message: '请填写证件号码',
            trigger: 'blur'
          },
          {
            pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
            message: '证件号码格式错误',
            trigger: 'blur'
          },
          {
            validator: certNumUniqueCheck,
            trigger: 'blur'
          }
        ],
        otherCertNum: [{
            required: true,
            message: '请填写证件号码',
            trigger: 'blur'
          },
          {
            validator: certNumUniqueCheck,
            trigger: 'blur'
          }
        ]
      },

      // 初始岗位权限数据，重置表单使用
      originPermitData: {},
      // 岗位权限数据模型
      permitModel: {
        charName: '',
        sortNo: ''
      },
      // 岗位权限表单验证规则
      permitFormRules: {
        charName: [{
            required: true,
            message: '岗位名不能为空',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 15,
            message: '长度在 2 到 15 个字符',
            trigger: 'blur'
          }
        ],
        sortNo: [{
            required: false,
            message: '岗位排位',
            trigger: 'blur'
          },
          {
            pattern: /^[1-9]([0-9])*$/,
            message: '岗位排位格式错误',
            trigger: 'blur'
          }
        ]
      },
      // 角色权限列表
      roleOptions: [],
    }
  },

  watch: {
    'personModel.certType'(val) {
      if (this.$refs['personForm']) {
        if (val === '1') {
          this.personFormRules.certNum = this.extRuleForm.idCardNum
        } else {
          this.personFormRules.certNum = this.extRuleForm.otherCertNum
        }
      }
    }
  },

  methods: {
    init(title, ucUid, charId) {
      this.dialogTitle = title
      this.dialogTableVisible = true
      this.ucUid = ucUid
      this.charId = charId
      this.active = 0
      this.queryUserInfo(ucUid)
    },

    // 第一步初始化查询账号信息
    queryUserInfo() {
      userService.getUserInfoByUcuid({ucUid: this.ucUid}).then(res => {
        if (res.data && res.status === 0) {
          this.userModel = JSON.parse(JSON.stringify(res.data))
          this.originUserData = JSON.parse(JSON.stringify(this.userModel))
        } else {
          this.$message.warning(res.msg ? res.msg : '网络异常')
        }
      }).catch(error => {

      })
    },
    // 第一步保存账号信息
    saveUserInfo() {
      this.$refs.userForm.validate((valid) => {
        if (valid) {
          this.isLoading = true
          userService.updataUser(this.userModel).then(res => {
            if (res.data && res.status === 0) {
              this.$message({
                message: '账号信息保存成功',
                type: 'success',
                duration: 500,
                onClose: () => {
                  // 保存成功后更新初始数据
                  this.originUserData = JSON.parse(JSON.stringify(this.userModel))
                  this.active = 1
                  this.queryPersonInfo()
                  this.$emit('refreshDataList')
                }
              })
            } else {
              this.$message.warning('网络异常 请稍后重试')
            }
          }).catch((error) => {
          }).finally(() => {
            this.isLoading = false
          })
        }
      })
    },
    // 第一步跳过操作
    skipToStep2() {
      this.resetUserForm()
      this.active = 1
      this.queryPersonInfo()
    },
    // 第一步重置操作
    resetUserForm() {
      this.userModel = JSON.parse(JSON.stringify(this.originUserData))
      this.$refs.userForm.clearValidate()
    },

    // 第二步初始化查询个人信息
    queryPersonInfo() {
      personService.getInfo({ ucUid: this.ucUid}).then(res => {
        if (res.data && res.status === 0) {
          this.personModel = JSON.parse(JSON.stringify(res.data.certInfo))
          this.originPersonData = JSON.parse(JSON.stringify(this.personModel))
        }
      }).catch(error => {
      })
    },
    // 第二步保存个人信息
    savePersonInfo() {
      if(this.isChange){
          this.skipToStep3();
      }else{
          this.$refs.personForm.validate((valid) => {
              if (valid) {
                  this.isLoading = true
                  personService.update(this.personModel).then(res => {
                      if (res.data && res.status === 0) {
                          this.$message({
                              message: '个人信息保存成功',
                              type: 'success',
                              duration: 500,
                              onClose: () => {
                                  // 保存成功后更新初始数据
                                  this.originPersonData = JSON.parse(JSON.stringify(this.personModel))
                                  this.active = 2
                                  this.getRoleOptions()
                                  this.queryPermitInfo()
                                  this.$emit('refreshDataList')
                              }
                          })
                      } else {
                          this.$message.warning(res.data.msg)
                      }
                  }).catch((error) => {

                  }).finally(() => {
                      this.isLoading = false
                  })
              }
          })
      }
    },
    // 第二步跳过操作
    skipToStep3() {
      this.resetPersonForm()
      this.active = 2
      this.getRoleOptions()
      this.queryPermitInfo()
    },
    // 第二步重置操作
    resetPersonForm() {
      this.personModel = JSON.parse(JSON.stringify(this.originPersonData))
      this.$refs.personForm.clearValidate()
    },
    // 第二步上一步操作
    backToStep1() {
      this.resetPersonForm()
      this.active = 0
      this.queryUserInfo()
    },

    // 第三步初始化查询岗位权限
    queryPermitInfo() {
      characterService.characterPermitinfo({chartId: this.charId}).then(res => {
        if (res.data && res.status === 0) {
          let data = res.data;
          this.permitModel.organId = data.organ.organId
          this.permitModel.organName = data.organ.organName
          this.permitModel.charName = data.charName
          this.permitModel.roleIds = []
          if (Array.isArray(data.permits)) {
            data.permits.forEach((item) => {
              this.permitModel.roleIds.push(item.roleId)
            })
          }
          this.permitModel.status = data.status
          this.permitModel.sortNo = data.sortNo

          // 保存初始信息
          this.originPermitData = JSON.parse(JSON.stringify(this.permitModel))
        } else {
          this.$message.warning(res.msg ? res.msg : '网络异常')
        }
      }).catch(error => {

      })
    },
    // 第三步保存岗位权限
    savePermitInfo() {
      this.$refs.permitForm.validate((valid) => {
        if (valid) {
          this.isLoading = true
          var params = {
            chart: {
              charId: this.charId,
              charName: this.permitModel.charName,
              ucUid: this.ucUid,
              status: this.permitModel.status,
              /*sortNo: this.permitModel.sortNo,*/
              bdefault: false
            },
            organId: this.permitModel.organId,
            roleIds: this.permitModel.roleIds
          };
          characterService.updateCharacter(params).then(res => {
            if (res.data && res.status === 0) {
              this.$message({
                message: '账号授权保存成功',
                type: 'success',
                duration: 500,
                onClose: () => {
                  this.dialogTableVisible = false
                  this.$emit('refreshDataList')
                }
              })
            } else {
              this.$message.error('操作失败 请稍后重试')
            }
          }).catch((error) => {

          }).finally(() => {
            this.isLoading = false
          })
        }
      })
    },
    // 第三步重置操作
    resetPermitForm() {
      this.permitModel = JSON.parse(JSON.stringify(this.originPermitData))
      this.$refs.permitForm.clearValidate()
    },
    // 第三步上一步操作
    backToStep2() {
      this.resetPermitForm()
      this.active = 1
      this.queryPersonInfo()
    },

    // 通过身份证号确定性别和出生日期
    setAgeSexByIdCard() {
      let idcard = this.personModel.certNum
      if (!idcard) {
        return
      }
      if (idcard.length === 15) {
        let flag = parseInt(idcard.substr(-1, 1)) % 2
        if (flag === 1) {
          this.personModel.sex = '1'
        } else if (flag === 0) {
          this.personModel.sex = '2'
        }
        this.personModel.birthday = `19${idcard.substr(6, 2)}-${idcard.substr(8, 2)}-${idcard.substr(10, 2)}`
      } else if (idcard.length === 18) {
        let flag = parseInt(idcard.substr(-2, 1)) % 2
        if (flag === 1) {
          this.personModel.sex = '1'
        } else if (flag === 0) {
          this.personModel.sex = '2'
        }
        this.personModel.birthday = `${idcard.substr(6, 4)}-${idcard.substr(10, 2)}-${idcard.substr(12, 2)}`
      }
      this.isChange = false;
    },

    // 角色列表
    getRoleOptions() {
      roleService.getRoleList().then(res => {
        this.roleOptions = res.data
      }).catch(error => {
      })
    },
  }
}
</script>

<style lang="scss">
</style>

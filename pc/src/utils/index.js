import Vue from 'vue'
import router from '@/router'
import store from '@/store'
import dataHandler from '@/utils/dataHandler'

/**
 * 获取uuid
 */
export function getUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    return (c === 'x' ? (Math.random() * 16) | 0 : 'r&0x3' | '0x8').toString(16)
  })
}

/**
 * 是否有权限
 * @param {*} key
 */
export function isAuth(key) {
  return (
    JSON.parse(sessionStorage.getItem('permissions') || '[]').indexOf(key) !==
      -1 || false
  )
}

/**
 * 树形数据转换
 * @param {*} data
 * @param {*} id
 * @param {*} pid
 */
export function treeDataTranslate(data, id = 'id', pid = 'parentId') {
  var res = []
  var temp = {}
  for (var i = 0; i < data.length; i++) {
    temp[data[i][id]] = data[i]
  }
  for (var k = 0; k < data.length; k++) {
    if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
      if (!temp[data[k][pid]]['children']) {
        temp[data[k][pid]]['children'] = []
      }
      if (!temp[data[k][pid]]['_level']) {
        temp[data[k][pid]]['_level'] = 1
      }
      data[k]['_level'] = temp[data[k][pid]]._level + 1
      temp[data[k][pid]]['children'].push(data[k])
    } else {
      res.push(data[k])
    }
  }
  return res
}

/**
 * 清除登录信息
 */
export function clearLoginInfo() {
  // Vue.cookie.delete('token')
  // sessionStorage.removeItem('token')
  sessionStorage.clear()
  store.commit('resetStore')
  router.options.isAddDynamicMenuRoutes = false
}

/**
 * 日期处理函数
 * yyyy-MM-dd HH:mm:ss
 */
export const formatTime = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('-') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}

const formatNumber = (n) => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 限制输入 字母 数字 下划线
export function isLetterNumUl(rule, value, callback) {
  const reg = /^[0-9a-zA-Z_]{1,}$/
  if (!reg.test(value)) {
    callback(new Error('请输入字母数字或下划线'))
  } else {
    callback()
  }
}
// 限制开头是1或者2
export function isStart12AndLetterNumUl(rule, value, callback) {
  const reg = /^[1,2][0-9a-zA-Z_]{1,}$/
  if (!reg.test(value)) {
    callback(new Error('请输入以1或者2开头后接字母数字或下划线'))
  } else {
    callback()
  }
}
// 输入限制英文
export function isEn(rule, value, callback) {
  const reg = /^[A-Za-z]+$/
  if (!reg.test(value)) {
    callback(new Error('请输入英文字符'))
  } else {
    callback()
  }
}
// 输入限制中文
export function isCH(rule, value, callback) {
  const reg = /^[\u0391-\uFFE5]+$/
  if (!reg.test(value)) {
    callback(new Error('请输入中文字符'))
  } else {
    callback()
  }
}
// 输入限制英文并且字符长度不超过10
export function isEnlength10(rule, value, callback) {
  const reg = /^[A-Za-z]{1,10}$/
  if (!reg.test(value)) {
    callback(new Error('请输入英文字符且字符长度在10个以内'))
  } else {
    callback()
  }
}
// 输入限制英文并且字符长度不超过36
export function isEnlength36(rule, value, callback) {
  const reg = /^[A-Za-z]{1,36}$/
  if (!reg.test(value)) {
    callback(new Error('请输入英文字符且字符长度在36个以内'))
  } else {
    callback()
  }
}
// 输入限制中文并且字符长度不超过15
export function isCHLength15(rule, value, callback) {
  const reg = /^[\u0391-\uFFE5]{1,15}$/
  if (!reg.test(value)) {
    callback(new Error('请输入中文字符且字符长度在15个以内'))
  }
  callback()
}
// 输入限制中文并且字符长度不超过5
export function isCHLength5(rule, value, callback) {
  const reg = /^[\u0391-\uFFE5]{1,5}$/
  if (!reg.test(value)) {
    callback(new Error('请输入中文字符且字符长度在5个以内'))
  } else {
    callback()
  }
}
export function isLen10(rule, value, callback) {
  if (value.length > 10) {
    callback(new Error('请输入10个字符以内'))
  } else {
    callback()
  }
}
// 社会信用代码或者组织代码的校验 校验有问题
export function CheckSocialCreditCode(rule, Code, callback) {
  if (!Code) {
    callback()
    return
  }

  if (Code.length == 10) {
    var ret = false
    var codeVal = [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
    ]
    var intVal = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
    ]
    var crcs = [3, 7, 9, 10, 5, 8, 4, 2]
    if (!(Code == '') && Code.length == 10) {
      var sum = 0
      for (var i = 0; i < 8; i++) {
        var codeI = Code.substring(i, i + 1)
        var valI = -1
        for (var j = 0; j < codeVal.length; j++) {
          if (codeI == codeVal[j]) {
            valI = intVal[j]
            break
          }
        }
        sum += valI * crcs[i]
      }
      var crc = 11 - (sum % 11)
      switch (crc) {
        case 10: {
          crc = 'X'
          break
        }
        default: {
          break
        }
      }
      // alert("crc="+crc+",inputCrc="+orgCode.substring(9));
      if (crc == Code.substring(9)) {
        ret = true
        callback()
      } else {
        ret = false
        callback(new Error('统一社会信用代码不正确'))
      }
    } else if (Code == '') {
      ret = true
      callback()
    }
    // return ret;
  } else {
    var patrn = /^[0-9A-Z]+$/ // 18位校验及大写校验

    if (Code.length != 18 || patrn.test(Code) == false) {
      // return -1;
      callback(new Error('统一社会信用代码不正确'))
    } else {
      var Ancode // 统一社会信用代码的每一个值
      var Ancodevalue // 统一社会信用代码每一个值的权重
      var total = 0
      var weightedfactors = [
        1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28,
      ] // 加权因子
      var str = '0123456789ABCDEFGHJKLMNPQRTUWXY' // 不用I、O、S、V、Z
      for (var i = 0; i < Code.length - 1; i++) {
        Ancode = Code.substring(i, i + 1)
        Ancodevalue = str.indexOf(Ancode)
        total = total + Ancodevalue * weightedfactors[i] // 权重与加权因子相乘之和
      }
      var logiccheckcode = 31 - (total % 31)
      var checkcode = Code.substring(17, 18)
      if (logiccheckcode != checkcode) {
        // return -1;
        callback(new Error('统一社会信用代码不正确'))
      } else {
        // return 1;
        callback()
      }
    }
  }

  callback()
}
// 邮政编码的校验
export function zipcode(rule, value, callback) {
  var re = /^[1-9][0-9]{5}$/
  if (!value) {
    callback()
    return
  }
  if (re.test(value)) {
    callback()
  } else {
    callback(new Error('邮政编码不正确'))
  }
}

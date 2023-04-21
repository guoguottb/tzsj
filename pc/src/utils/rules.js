
// 整数
export function checkInterNum(rule, value, callback) {
  const reg = /^[0-9]*[1-9][0-9]*$/
  if (!value && value != '0') {
    return callback(new Error('不能为空'))
  } else if (!reg.test(value) && value != '0') {
    return callback(new Error('请输入整数'))
  } else {
    callback()
  }
}

// 排序号正整数验证
export function checkPositiveInteger(rule, value, callback) {
  // 非0开头的1到11位正整数
  const reg = /^[1-9][0-9]{0,10}$/
  if (!reg.test(value)) {
    return callback(new Error('排序号只能是正整数'))
  }
  callback()
}

//  不为空
export function checkNotNull(rule, value, callback) {
  if (value == '' || value == undefined || value == null || (value.length > 0 && value.trim().length == 0)) {
    return callback(new Error('不能为空'))
  } else {
    callback()
  }
}

//  密码
export function checkPassword(rule, value, callback) {
  const reg = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,16}$/
  if (value == '' || value == undefined || value == null) {
    return callback(new Error('要求8~16位，包含大小写字母、数字和特殊符号三种以上'))
  } else if (!reg.test(value)) {
    return callback(new Error('要求8~16位，包含大小写字母、数字和特殊符号三种以上'))
  } else {
    callback()
  }
}

//行政区划校验
export function checkCantCode(rule, value, callback) {
  const reg = /^(00|11|12|13|14|15|21|22|23|31|32|33|34|35|36|37|41|42|43|44|45|46|50|51|52|53|54|61|62|63|64|65|66|71|81|82|99)[A-Za-z0-9]{10}$/
  if (value == '' || value == undefined || value == null) {
    return callback(new Error('要求12位，前两位必须是省、直辖市代码前两位'))
  } else if (!reg.test(value)) {
    return callback(new Error('要求12位，前两位必须是省、直辖市代码前两位'))
  } else {
    callback()
  }
}

//行政区划校验
export function checkOrganCodePre(rule, value, callback) {
  const reg = /^(00|11|12|13|14|15|21|22|23|31|32|33|34|35|36|37|41|42|43|44|45|46|50|51|52|53|54|61|62|63|64|65|66|71|81|82|99)[A-Za-z0-9]{0,10}$/
  if (value == '' || value == undefined || value == null) {
    return callback(new Error('2-12位字母或数字，前两位必须是省、直辖市代码前两位'))
  } else if (!reg.test(value)) {
    return callback(new Error('2-12位字母或数字，前两位必须是省、直辖市代码前两位'))
  } else {
    callback()
  }
}

// 判断区划编码是否已经存在
export async function checkCantCodeExist(rule, value, callback) {
  // let b = await cantService.ifCantCodeExist(value, '')
  // if (b) return callback(new Error('区划编码已存在'))
  // else return callback()
}




//  手机号
export function checkPhone(rule, value, callback) {
  const reg = /^1[345678]\d{9}$/
  if (value == '' || value == undefined || value == null || (value.length > 0 && value.trim().length == 0)) {
    return callback(new Error('不能为空'))
  } else if (!reg.test(value)) {
    return callback(new Error('目前只支持中国大陆的手机号码'))
  } else {
    callback()
  }
}

//  身份证号
export function checkIdCard(rule, idCard, callback) {
  if (idCard == '' || idCard == undefined || idCard == null || (idCard.length > 0 && idCard.trim().length == 0)) {
    return callback(new Error('不能为空'))
  }
  idCard = trim(idCard.replace(/ /g, ''))               //去掉字符串头尾空格
  if (idCard.length == 15) {
    if (isValidityBrithBy15IdCard(idCard)) { //进行15位身份证的验证
      callback()
    } else {
      callback(new Error('请输入正确的身份证'))
    }
  } else if (idCard.length == 18) {
    var a_idCard = idCard.split('')                // 得到身份证数组
    if (isValidityBrithBy18IdCard(idCard) && isTrueValidateCodeBy18IdCard(a_idCard)) {   //进行18位身份证的基本验证和第18位的验证
      callback()
    } else {
      callback(new Error('请输入正确的身份证'))
    }
  } else {
    callback(new Error('身份证长度不正确'))
  }
}

// export function CheckSocialCreditCode(value) {
export function checkSocialCreditCode(rule, value, callback) {
  var patrn = /^[0-9A-Z]+$/;
  //18位校验及大写校验
  if ((value.length != 18) || (patrn.test(value) == false)) {
    callback(new Error('不是有效的统一社会信用编码！'))
    return false;
  } else {
    var Ancode;//统一社会信用代码的每一个值
    var Ancodevalue;//统一社会信用代码每一个值的权重
    var total = 0;
    var weightedfactors = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28];//加权因子
    var str = '0123456789ABCDEFGHJKLMNPQRTUWXY';
    //不用I、O、S、V、Z
    for (var i = 0; i < value.length - 1; i++) {
      Ancode = value.substring(i, i + 1);
      Ancodevalue = str.indexOf(Ancode);
      total = total + Ancodevalue * weightedfactors[i];
      //权重与加权因子相乘之和
    }
    var logiccheckcode = 31 - total % 31;
    if (logiccheckcode == 31) {
      logiccheckcode = 0;
    }
    var Str = "0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,J,K,L,M,N,P,Q,R,T,U,W,X,Y";
    var Array_Str = Str.split(',');
    logiccheckcode = Array_Str[logiccheckcode];

    var checkcode = value.substring(17, 18);
    if (logiccheckcode != checkcode) {
      callback(new Error('不是有效的统一社会信用编码！'))
      return false;
    }
    callback()
    return true;
  }
}

/**
 * 验证15位数身份证号码中的生日是否是有效生日
 * @param idCard15 15位书身份证字符串
 * @return
 */
function isValidityBrithBy15IdCard(idCard15) {
  var year = idCard15.substring(6, 8)
  var month = idCard15.substring(8, 10)
  var day = idCard15.substring(10, 12)
  var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day))
  // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法
  if (temp_date.getYear() != parseFloat(year)
    || temp_date.getMonth() != parseFloat(month) - 1
    || temp_date.getDate() != parseFloat(day)) {
    return false
  } else {
    return true
  }
}

/**
 * 验证18位数身份证号码中的生日是否是有效生日
 * @param idCard 18位书身份证字符串
 * @return
 */
function isValidityBrithBy18IdCard(idCard18) {
  var year = idCard18.substring(6, 10)
  var month = idCard18.substring(10, 12)
  var day = idCard18.substring(12, 14)
  var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day))
  // 这里用getFullYear()获取年份，避免千年虫问题
  if (temp_date.getFullYear() != parseFloat(year)
    || temp_date.getMonth() != parseFloat(month) - 1
    || temp_date.getDate() != parseFloat(day)) {
    return false
  } else {
    return true
  }
}

/**
 * 判断身份证号码为18位时最后的验证位是否正确
 * @param a_idCard 身份证号码数组
 * @return
 */
function isTrueValidateCodeBy18IdCard(a_idCard) {
  var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]    // 加权因子
  var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]            // 身份证验证位值.10代表X
  var sum = 0                             // 声明加权求和变量
  if (a_idCard[17].toLowerCase() == 'x') {
    a_idCard[17] = 10                    // 将最后位为x的验证码替换为10方便后续操作
  }
  for (var i = 0; i < 17; i++) {
    sum += Wi[i] * a_idCard[i]            // 加权求和
  }
  var valCodePosition = sum % 11                // 得到验证码所位置
  if (a_idCard[17] == ValideCode[valCodePosition]) {
    return true
  } else {
    return false
  }
}

//去掉字符串头尾空格
function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, '')
}

export default {
  phone: [{validator: checkPhone, trigger: 'blur'}],
  InterNum: [{validator: checkInterNum, trigger: 'blur'}],
  notNull: [{validator: checkNotNull, trigger: 'blur'}],
  idCard: [{validator: checkIdCard, trigger: 'blur'}],
  password: [{validator: checkPassword, trigger: 'blur'}],
}

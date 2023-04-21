/**
 * 邮箱
 * @param {*} s
 */
export function isEmail (s) {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}

/**
 * 手机号码
 * @param {*} s
 */
export function isMobile (s) {
  return /^1[0-9]{10}$/.test(s)
}

/**
 * 电话号码
 * @param {*} s
 */
export function isPhone (s) {
  return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
}

/**
 * URL地址
 * @param {*} s
 */
export function isURL (s) {
  return /^http[s]?:\/\/.*/.test(s)
}
/**
 * 获取地址栏参数
 * @param {*} s
 */
export function getUrlParam (code) {
  return decodeURIComponent((new RegExp('[?|&]' + code + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
}
// 检查年龄是否为负数
export function checkAge(rule, value, cb) {
   value<0?cb(new Error()):cb()
}
// 检查URL是否符合语法：前7位是否为http://，或前8位是否为https://
export function checkUrl(rule, value, cb) {
   value.substr(0, 7) != 'http://' && value.substr(0, 8) != 'https://'?cb(new Error()):cb()
}
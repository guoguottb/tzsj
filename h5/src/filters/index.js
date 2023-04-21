import dayjs from 'dayjs'

// 时间格式过滤器 YYYY-MM-DD HH:mm:ss
export const formatDate = (val) => {
  return dayjs(val).format('YYYY-MM-DD HH:mm:ss')
}

// 金额保留小数点后两位
export const toFixed = (val) => {
  return val.toFixed(2)
}
// 金额保留小数点后两位
export const toFixedY = (val) => {
  return +val.toFixed(0) + ' 元'
}

export const formatDateYMD = (val) => {
  return dayjs(val).format('YYYY-MM-DD')
}

// 身份证防泄密
export const formatID = (val) => {
  let newVal = val.split('')
  if (newVal.length === 11) {
    newVal[8], newVal[9], newVal[10], (newVal[11] = '*')
    return newVal
  }
  return val
}

// 手机号防泄密
export const formatPhone = (val) => {
  return
}

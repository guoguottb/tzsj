import dayjs from 'dayjs'

// 时间格式过滤器 YYYY-MM-DD HH:mm:ss
export const formatDate = (val) => {
  return dayjs(val).format('YYYY-MM-DD HH:mm:ss')
}

// 金额保留小数点后两位
export const toFixed = (val) => {
  return val.toFixed(2)
}

// 年月日 时间格式
export const formatDateYMD = (val) => {
  return dayjs(val).format('YYYY-MM-DD')
}

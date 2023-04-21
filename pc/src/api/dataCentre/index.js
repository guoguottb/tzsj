import request from '@/utils/request'

/**
 * @param { Object} data { type,way,year,quarter}
 * @returns Promise
 */
// 数据中心 > 数据分析 > 特困供养季度表
export const exceptionalQuarterlyTableApi = (data) => {
  return request({
    method: 'POST',
    url: 'social/assistance/TKStatisticalAnalysis',
    data,
  })
}

// DB 指的是低保
/**
 *
 * @returns promise
 */
// 数据中心 > 数据分析 > 低保季度表
export const DBQuarterlyTableApi = (data) => {
  return request({
    method: 'POST',
    url: 'social/assistance/DBStatisticalAnalysis',
    data,
  })
}

// 数据中心 > 数据分析 > 低保特定对象统计表
export const DBspecificObjectApi = (data) => {
  return request({
    method: 'POST',
    url: 'social/assistance/DBTDDXStatisticalAnalysis',
    data,
  })
}

// 数据中心 > 数据分析 > 低收入人口统计表
export const StatisticsOfLowIncomePopulationApi = (data) => {
  return request({
    method: 'POST',
    url: 'social/assistance/DSRRKStatisticalAnalysis',
    data,
  })
}

// 数据中心 > 数据分析 > 临时救助季度表
export const TemporaryAssistanceApi = (data) => {
  return request({
    method: 'POST',
    url: '/social/assistance/LSJZStatisticalAnalysis',
    data,
  })
}
// 数据中心 > 数据分析 > 特困自理能力评估
export const getExceptionalAssessListApi = (data) => {
  return request({
    method: 'POST',
    url: '/social/assistance/getAllEvaluationReport',
    data,
  })
}

// 数据中心 > 统计分析 > 月度报告
export const getPdfFileApi = (id) => {
  return request({
    url: 'api/File/Download?id=' + id,
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    responseType: 'arraybuffer', //一定要设置响应类型，否则页面会是空白pdf
  })
}

// 数据中心 > 统计分析 > 月度报告 > 获取月报
export const getMonthlyMagazineApi = () => {
  return request({
    method: 'POST',
    url: '/social/assistance/getMonthlyMagazine',
  })
}

// 数据中心 > 统计分析 > 月度报告 > 展示月度报告
export const showPDFApi = (path) => {
  return request({
    method: 'POST',
    url: '/social/minios/showPDF?filename=' + path,
    data: {},
  })
}

// 数据中心 > 统计分析 > 月度报告 > 生成月报
export const generateMonthlyMagazineApi = (data) => {
  return request({
    method: 'POST',
    url: '/social/assistance/generateMonthlyMagazine',
    data,
  })
}

// 数据中心 > 统计分析 > 月度报告 > 上传月报
export const uploadingMonthlyMagazineApi = (data) => {
  return request({
    method: 'POST',
    url: '/social/assistance/uploadingMonthlyMagazine',
    data,
  })
}

// 数据中心 > 统计分析 > 月度报告 > 下载月度报告
export const downloadMonthlyReportFileApi = (value) => {
  return request({
    method: 'GET',
    url: '/social/assistance/downloadMonthlyReportFile?date=' + value,
  })
}

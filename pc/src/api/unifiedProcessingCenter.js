// 社会救助统一受理中心

import request from '@/utils/request'
// 政策计算器----------------------------------------------------------------
// 政策计算弹框 数据回显
export const assistanceCalculationApi = (id) =>
  request({
    method: 'POST',
    url: '/social/assistance/calculation',
    data: {
      id,
    },
  })
// 政策计算器 派发
export const assistanceBasicCheck3Api = (data) =>
  request({
    method: 'POST',
    url: '/social/assistance/basicCheck3',
    data,
  })

// 存疑数据预警--------------------------------------------------------
// 核对报告复核预警 / 生成三个月无核对报告家庭
export const buildThreeMonthNotHdReportFamilyApi = (data) =>
  request({
    method: 'POST',
    url: '/social/economicCheck/buildThreeMonthNotHdReportFamily',
    data,
  })
// 核对报告复核预警 / 提交三个月无核对报告家庭
export const buildNotHdReportFamilyApi = (data) =>
  request({
    method: 'POST',
    url: '/social/economicCheck/buildNotHdReportFamily',
    data,
  })

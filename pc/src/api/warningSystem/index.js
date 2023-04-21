// 预警平台系统 模块
import request from '@/utils/request'

// 核查报告问题预警 页面 全量核对接口
export const fullDoseCommitCheckReportApi = (data) => {
  return request({
    method: 'POST',
    url: '/social/economicCheck/addEconomics',
    data,
  })
}
// 核查报告问题预警 页面 table 操作按钮（提交核对）
export const commitCheckReportApi = (sId) => {
  return request({
    method: 'POST',
    url: '/social/assistance/commitCheckReport?sId=' + sId,
  })
}

// 群众申请 提交核对授权书
/**
 *  @param {String} sid // 数据id
 *  @param {String} ab_ex192  // 核对授权书类型
 * @returns
 */
export const saveHDTypeApi = (sid, ab_ex192) => {
  return request({
    method: 'POST',
    url: '/social/assistance/saveHDType',
    data: {
      sid,
      ab_ex192,
    },
  })
}

// 预警平台系统 预警核查对象数据库 对象预警 核查报告问题预警 标记核对报告超时数据（按钮）
export const createCheckReportWaringListApi = () => {
  return request({
    method: 'POST',
    url: '/social/assistance/createCheckReportWaringList',
    data: {},
  })
}

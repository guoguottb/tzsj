// 联动救助保障平台 api
import request from '@/utils/request'
// 数据共享开放 > 同步省厅操作列表 > 生成同步数据
export const GenerateSynchronousDataApi = (data) => {
  return request({
    url: '/social/syncJmBasic/createSyncJMBasic',
    method: 'POST',
    data,
  })
}

// 数据共享开放 > 同步省厅操作列表 > 同步金民的数据列表(搜索功能)
export const getTableDataApi = (data) => {
  return request({
    url: '/social/syncJmBasic/getList',
    method: 'POST',
    data,
  })
}

// 数据共享开放 > 同步省厅操作列表 > 删除一个同步金民的数据
export const deleteCurrentDataApi = (data) => {
  return request({
    method: 'POST',
    url: '/social/syncJmBasic/deleteOneBasic',
    data,
  })
}

// 数据共享开放 > 同步省厅操作列表 > 新增一个同步金民的数据
export const addSyncDataApi = (data) => {
  return request({
    method: 'POST',
    url: '/social/syncJmBasic/addSyncOneBasic',
    data,
  })
}

// 数据共享开放 > 同步省厅操作列表 > 更新一个同步金民的数据
export const updataSyncDataApi = (data) => {
  return request({
    method: 'POST',
    url: '/social/syncJmBasic/updateSyncOneBasic',
    data,
  })
}

// 数据共享开放 > 同步省厅操作列表 > 注销一个同步金民的数据
export const cancelSyncDataApi = (data) => {
  return request({
    method: 'POST',
    url: '/social/syncJmBasic/cancelSyncOneBasic',
    data,
  })
}

//  数据共享开放 > 同步省厅操作列表 > 按月删除本地数据
export const deleteMonthLocalDataApi = (data) => {
  return request({
    url: '/social/syncJmBasic/deleteSyncJMBasic',
    method: 'POST',
    data,
  })
}

//  数据共享开放 > 同步省厅操作列表 > 开始同步金民数据
export const addSyncJMDataApi = (data) => {
  return request({
    method: 'POST',
    url: '/social/syncJmBasic/startExecuteSyncJMBasic',
    data,
  })
}

// 数据共享开放 > 同步省厅操作列表 > 暂停同步金民数据
export const stopSyncJMDataApi = (data) => {
  return request({
    method: 'POST',
    url: '/social/syncJmBasic/suspendExecuteSyncJMBasic',
    data,
  })
}

// 数据共享开放 > 同步省厅操作列表 > 处理失败数据
export const recoverSyncJMDataApi = (data) => {
  return request({
    method: 'POST',
    url: '/social/syncJmBasic/resumeExecuteSyncJMBasic',
    data,
  })
}
//  数据共享开放 > 同步省厅操作列表 > 删除金民按钮
export const deleteOneJMDataApi = (data) => {
  return request({
    method: 'POST',
    url: '/social/syncJmBasic/deleteSyncOneBasic',
    data,
  })
}

//  数据共享开放 > 同步省厅操作列表 > 全量校验按钮
export const fullCalibrationApi = (data) => {
  return request({
    method: 'POST',
    url: '/social/syncJmBasic/fullCalibration',
    data,
  })
}

//  数据共享开放 > 同步省厅操作列表 > 生成校验数据
export const completionFullCalibrationApi = (data) => {
  return request({
    method: 'POST',
    url: '/social/syncJmBasic/completionFullCalibration',
    data,
  })
}

// 临时救助系统 > 临时救助审批 > 审批节点 > 救助金额修改(补充数据修改)
export const supplementMoneyApi = (data) => {
  return request({
    method: 'POST',
    url: '/social/assistance/supplementMoney',
    data,
  })
}

// ----------------------- 经济核对系统模块
// 经济核对系统数据列表 table接口
export const getEconomicCheckListApi = (data) => {
  return request({
    method: 'POST',
    url: '/social/economicCheck/getList',
    data,
  })
}
// 重新核查经济核对数据
export const recheckOneEconomicApi = (batchId) => {
  return request({
    method: 'POST',
    url: '/social/economicCheck/recheckOneEconomic',
    data: {
      batchId,
    },
  })
}

// 新增经济核查数据
export const addEconomicAoi = (id) => {
  return request({
    method: 'POST',
    url: '/social/economicCheck/addEconomic',
    data: {
      id,
    },
  })
}

// 批量核查功能
export const recheckAllEconomicApi = (data) => {
  return request({
    method: 'POST',
    url: '/social/economicCheck/recheckAllEconomic',
    data,
  })
}

// ------- 同步生态基本信息列表 S -----------
/**
 * table 中的注销 操作按钮
 * @param {String} id // row id
 * @param {String} monthTime  // 注销时间 YYYY-MM-DD HH:mm:ss
 * @returns Promise
 */
export const directCancelFamilyApi = (id, monthTime) => {
  return request({
    method: 'POST',
    url: '/social/baf01/directCancelFamily',
    data: {
      id,
      monthTime,
    },
  })
}
// ------- 同步生态基本信息列表 E -----------

// 数据共享开放 同步省厅基本信息列表 处理金民数据
export const jmCheckApi = (data) => {
  return request({
    method: 'POST',
    url: '/social/baf01/jmCheck',
    data,
  })
}

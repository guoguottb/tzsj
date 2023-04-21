import request from '@/utils/request'

// 生活救助和社会福利 > 残疾人补贴 > 残疾人审核 > 查看页面(获取残疾人信息)
export const getDisabilityAllowanceApi = (data) => {
  return request({
    method: 'POST',
    url: '/social/assistance/getDisabled',
    data,
  })
}

// 生活救助和社会福利 > 残疾人补贴 > 残疾人审核 > 查看页面(已享受救助信息)
export const getRescueSituationApi = (data) => {
  return request({
    method: 'POST',
    url: '/social/assistance/getDisabledAndElderSalvation',
    data,
  })
}

// 生活救助和社会福利 > 残疾人补贴 > 残疾人审核 > 查看页面(审批记录)
export const getDisabledRecordDataApi = (data) => {
  return request({
    method: 'POST',
    url: '/social/assistance/getDisabledRecordData',
    data,
  })
}

// 泰州区域 > 街道 > 村庄 联机选择框
export const getTaiZhouAreaApi = (data) => {
  return request({
    url: '/social/assistance/getCityOption',
    method: 'POST',
    data,
  })
}

// 生活救助和社会福利 > 残疾人补贴 > 残疾人审核 > 修改按钮 > 确认修改Api
export const confirmModificationApi = (data) => {
  return request({
    method: 'POST',
    url: '/social/assistance/saveDisabled',
    data,
  })
}

// 生活救助和社会福利 > 残疾人补贴 > 残疾人审核 图片资料数据回显
export const getBannersApi = (url) => {
  return request({
    method: 'POST',
    url,
    data: {},
  })
}

// 生活救助和社会福利 > 残疾人补贴 > 残疾人审核 > 退回接口
export const disabledFlowPathApi = (data) => {
  return request({
    method: 'POST',
    url: '/social/assistance/disabledFlowPath',
    data,
  })
}

//残疾人补贴发放 导入模板
export const disabledImportTemplateApi = (data) =>
  request({
    method: 'POST',
    url: '/social/assistance/disabledImportTemplate',
    data,
  })

import request from '@/utils/request'
export * from './moneyProvide'
export * from './lifeRescue/predicamentChild'
export * from './linkageSalvationPlatform'
// 行政区划接口
export const getCityOptionApi = (pId) => {
  return request({
    method: 'POST',
    url: '/social/assistance/getCityOption',
    data: {
      pId,
    },
  })
}

// login 登录接口
export const exceedOldSignOutApi = (data) =>
  request({
    method: 'POST',
    url: '/social/login/doLogin',
    data,
  })

// 查询导出进度接口
export const importCompletionRateApi = (id) =>
  request({
    method: 'POST',
    url: '/social/assistance/importCompletionRate',
    data: {
      id,
    },
  })

// 导入excel 接口
export const importDistrictLevelComparisonApi = (data) =>
  request({
    method: 'POST',
    url: '/social/excel/importDistrictLevelComparison',
    data,
  })

// 同一查询
export const getAllAssistanceApi = (data) =>
  request({
    method: 'POST',
    url: '/social/assistance/getAllAssistance',
    data,
  })

// 图片回显
export const viewImgsApi = (url) =>
  request({
    method: 'POST',
    url,
    data: {},
  })

import request from '@/utils/request'

// 资金发放模块

// 资金发放的公示开始/公示结束按钮  是否可以点击   判断接口
export const isOpenOrCloseReliefdistApi = (ar_id) => {
  return request({
    method: 'POST',
    url: '/social/assistance/isOpenOrCloseReliefdist',
    data: {
      ar_id,
    },
  })
}

//00
export const addEconomicsApi = (data) => {
  return request({
    method: 'POST',
    url: '/social/assistance/openReliefdist',
    data,
  })
}

// 救助资金发放信息管理 > 市区发放统计报表
export const reliefdistListApi = (data) =>
  request({
    method: 'POST',
    url: 'social/assistance/reliefdistList',
    data,
  })

// 救助资金发放信息管理 导出接口
export const excelReliefdistListExportApi = (data) =>
  request({
    method: 'POST',
    url: 'social/excel/reliefdistListExport',
    data,
  })

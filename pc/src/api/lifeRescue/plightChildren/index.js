// 生活救助和社会福利审批系统 > 困境儿童系统下所以的api

import request from '@/utils/request'
import axios from 'axios'
// 困境儿童申请--------------------------------------------------------
// 困境儿童申请 退回节点删除
export const childDeleteApi = (data) =>
  request({
    method: 'POST',
    url: '/social/child/childDelete',
    data,
  })
const CancelToken = axios.CancelToken
// 困境儿童发放 困境儿童发放信息管理 table查看按钮的api
export const DetailsOfFundReleaseApi = (data) => {
  return request({
    method: 'POST',
    url: '/social/child/fundReleaseChildList',
    data,
  })
}

// 公共excel导出
export const commonExcelExportApi = (url, data) => {
  return request({
    url: url + '/commonExport',
    method: 'POST',
    data,
  })
}

// 查看单个儿童资金发放记录
export const getOneChildFundReleaseList = (data, c) => {
  return request({
    method: 'POST',
    url: '/social/child/getOneChildFundReleaseList',
    data,
  })
}

// 困境儿童群众申请 金民儿童数据导入
export const tbjmExcelDataUploadApi = (data) =>
  request({
    method: 'POST',
    url: '/social/childImport/jmExcelImport',
    data,
    headers: { 'Content-Type': 'application/json' },
  })

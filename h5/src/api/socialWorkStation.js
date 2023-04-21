import request from '@/utils/request'
// 社工站
// 走访人员对服务进行评价
export const visitPersonRateServiceApi = (data) =>
  request({
    method: 'POST',
    url: '/social/SocialWorkOperate/visitPersonRateService',
    data,
  })
// 获取登录账号归属社工站下面的社工站所有批次
export const getNotFinishBatchListApi = (data) =>
  request({
    method: 'POST',
    url: '/social/SocialWorkOperate/getNotFinishBatchList',
    data,
  })
// 批次详情列表数据回显
export const getRecordListApi = (data) =>
  request({
    method: 'POST',
    url: '/social/SocialWorkOperate/getRecordList',
    data,
  })
// 创建工单
export const createOrderApi = (data) =>
  request({
    method: 'POST',
    url: '/social/SocialWorkOrder/createOrder',
    data,
  })

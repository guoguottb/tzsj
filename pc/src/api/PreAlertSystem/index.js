import request from '@/utils/request'

// 预警平台系统 大数据预警 大数据主动检测预警库 群众申办 核查派单 提交信息核对是否走绿色
export const isSelectGreenChannelApi = (data) => {
  return request({
    method: 'POST',
    url: '/social/assistance/basicCheck2',
    data,
  })
}

// 群众申请核查派单接口
export const assistanceBasicCheckApi = (data) =>
  request({
    method: 'POST',
    url: '/social/assistance/basicCheck',
    data,
  })

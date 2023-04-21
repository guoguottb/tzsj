import request from '@/utils/request'
// 困境儿童上门核查 保存接口

// 保存困境儿童信息
export const saveChildInfoApi = (data) => {
  return request({
    method: 'POST',
    url: '/social/child/saveChildInfo', // /social/child/saveChildInfo
    data,
  })
}

// 暂存困境儿童信息
export const temporarilySaveApi = (data) => {
  return request({
    method: 'POST',
    url: '/social/child/temporarilySave',
    data,
  })
}

// 查看困境儿童信息
export const getChildDetailInfoApi = (data) => {
  return request({
    method: 'POST',
    url: '/social/child/getChildDetailInfo',
    data,
  })
}

// 获取最新的四色评估记录
export const getNewEvaluateRecordApi = (data) => {
  return request({
    method: 'POST',
    url: '/social/childEvaluate/getNewEvaluateRecord',
    data,
  })
}

// 单独保存四色评估记录
export const saveAloneEvaluateRecordApi = (data) => {
  return request({
    method: 'POST',
    url: '/social/childEvaluate/saveAloneEvaluateRecord',
    data,
  })
}

export const saveAloneEvaluateOpinionApi = (data) => {
  return request({
    method: 'POST',
    url: '/social/childEvaluate/saveAloneEvaluateOpinion',
    data,
  })
}

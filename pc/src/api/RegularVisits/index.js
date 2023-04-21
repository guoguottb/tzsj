// 定期走访模块

import request from '@/utils/request'
// 获取物资
export const queryGoodsApi = (data) => {
  return request({
    method: 'POST',
    url: '/social/assistance/queryGoods',
    // data,
  })
}
// 生成定期走访记录
export const generateDqzfRecordApi = (goodsIds) => {
  return request({
    method: 'POST',
    url: '/social/assistance/generateDqzfRecord',
    data: {
      goodsIds,
    },
  })
}
// 更新定期走访记录
export const updateDqzfRecordApi = () => {
  return request({
    method: 'POST',
    url: '/social/assistance/updateDqzfRecord',
    // data,
  })
}
// 获取定期走访信息
export const getGoodsInfoApi = (data) => {
  return request({
    method: 'POST',
    url: '/social/assistance/getDqzf',
    data,
  })
}

// export const
// // 获取自理评估人员
// getEvaluationMan (data) {
//   return request({
//     headers: {
//       'Accept': 'application/json',
//     },
//     url: '/social/assistance/getEvaluationMan',
//     method: 'post',
//     data: data
//   })
// },

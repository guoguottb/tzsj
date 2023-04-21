// 临时救助
import request from '@/utils/request'
/**
 * 根据id获取基本信息
 * @param {Object} data {id:***}
 * @returns promise
 */
export const getBasicsApi = (data) =>
  request({
    method: 'POST',
    url: '/social/assistance/getBasicById',
    data,
  })
/**
 * 临时救助材料补充
 * @param {Object} data 
 * @returns promise
 */
export const saveLsjzclApi = (data) =>
  request({
    method: 'POST',
    url: '/social/assistance/saveLsjzcl',
    data,
  })

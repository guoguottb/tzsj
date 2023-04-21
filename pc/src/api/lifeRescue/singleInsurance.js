// 单人保家庭 api
import request from '@/utils/request'

// 单人保家庭审批 ----------------------------------------------------------------

/**
 * 按人保成员数据回显
 * @param {Number} id ab_id
 * @returns Promise
 */
export const showdrbtiquApi = (id) =>
  request({
    method: 'POST',
    url: '/social/assistance/showdrbtiqu',
    data: {
      id,
    },
  })

/**
 * 确认 提取按人保成员
 * @param {Number} id abm_mainid
 * @returns Promise
 */
export const drbtiquApi = (id) =>
  request({
    method: 'POST',
    url: '/social/assistance/drbtiqu',
    data: {
      id,
    },
  })

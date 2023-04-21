import request from '@/utils/request'

// 救助公示栏 list 列表数据
export const getReliefdistOpenApi = (data) => {
  return request({
    method: 'POST',
    url: '/social/assistanceWeixin/getReliefdistOpen',
    data,
  })
}

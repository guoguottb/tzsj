// 生活救助和社会福利审批系统 > 残疾人补贴
import request from '@/utils/request'

// 临时救助审批页面 审核节点 获取救助类型和金额等
export const getTypeAndMoneyApi = (data) => {
  return request({
    method: 'POST',
    url: '/social/assistance/getTypeAndMoney',
    data,
  })
}

import request from '@/utils/request'

// 获取儿童列表
export const childGetChildListApi = (data) =>
  request({
    method: 'POST',
    url: '/social/child/getChildList',
    data,
  })

export const submitCheckInfoApi = (data) => {
  return request({
    // headers: {
    //   Accept: 'application/json',
    // },
    url: '/social/child/childSubmitCheckInfo',
    method: 'post',
    data,
  })
}
// 计算困境儿童救助类型和金额
// 困境儿童申请 信息核对 table政策计算操作按钮
export const countChildTypeApi = (id) => {
  return request({
    method: 'POST',
    url: '/social/child/countChildType',
    data: {
      id,
    },
  })
}

// 困境儿童 审批 注销信息功能
/**
 *
 * @param {	integer(int64)} childId // 儿童id
 * @param {string} reason //注销原因
 * @returns promise
 */
export const createChildCancelApi = (childId, reason) => {
  return request({
    method: 'POST',
    url: '/social/childCancel/createChildCancel',
    data: {
      childId,
      reason,
    },
  })
}

// 困境儿童 困境儿童变更 审核提交到审批
export const childChangeSubmitApprovalApi = (data) => {
  return request({
    method: 'POST',
    url: '/social/childChange/childSubmitApproval',
    data,
  })
}

// 困境儿童 困境儿童变更 审批提交到办结
export const childChangeSubmitCloseApi = (data) => {
  return request({
    method: 'POST',
    url: '/social/childChange/childSubmitClose',
    data,
  })
}

// 困境儿童提交到注销审批
export const childCancelSubmitApprovalApi = (data) => {
  return request({
    method: 'POST',
    url: '/social/childCancel/childSubmitApproval',
    data,
  })
}

// 困境儿童提交到注销办结
export const childCancelSubmitCloseApi = (data) => {
  return request({
    method: 'POST',
    url: '/social/childCancel/childSubmitClose',
    data,
  })
}

// 困境儿童审核提交
export const childSubmitApprovalApi = (data) => {
  return request({
    method: 'POST',
    url: '/social/child/childSubmitApproval',
    data,
  })
}

// 困境儿童审批提交
export const childSubmitCloseApi = (data) => {
  return request({
    method: 'POST',
    url: '/social/child/childSubmitClose',
    data,
  })
}

// 设置困境儿童救助类型和金额
export const setChildTypeApi = (data) => {
  return request({
    method: 'POST',
    url: '/social/child/setChildType',
    data,
  })
}

// 困境儿童救助金额计算
export const childGetCountMoneyApi = (data) =>
  request({
    method: 'POST',
    url: '/social/child/getCountMoney',
    data,
  })
//   超龄管理 超龄预警  困境儿童预警列表
export const getChildWarningListApi = (data) => {
  return request({
    method: 'POST',
    url: '/social/childWarn/getList',
    data,
  })
}

// 困境儿童 超龄预警页面下的   超龄续保按钮功能
export const toOldContinueGuaranteeApi = (data) => {
  return request({
    method: 'POST',
    url: '/social/childCancel/toOldContinueGuarantee',
    data,
  })
}

// 困境儿童 超龄预警页面下的   一次性续发按钮功能
export const exceedOldContinueGrantApi = (data) =>
  request({
    method: 'POST',
    url: '/social/childCancel/exceedOldContinueGrant',
    data,
  })

// 困境儿童 超龄预警页面下的   超龄退出 按钮功能
export const OverageWithdrawalApi = (data) =>
  request({
    method: 'POST',
    url: '/social/childCancel/exceedOldSignOut',
    data,
  })

// 困境儿童 新增困境儿童申请材料
export const addChildInfoApi = (data) => {
  return request({
    url: '/social/child/addChildInfo',
    method: 'post',
    data: data,
  })
}

// 将困境儿童信息 提交到 退回节点
export const childReturnApi = (data) =>
  request({
    method: 'POST',
    url: '/social/child/childReturn',
    data: data,
  })

//退回到核查派单
export const childReturnToReturnApi = (data) => {
  return request({
    method: 'POST',
    url: '/social/child/childReturnToReturn',
    data,
  })
}

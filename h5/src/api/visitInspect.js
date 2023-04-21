// 上门核查api
import request from '@/utils/request'


// 困境儿童上门核查 群众申请 困境儿童数据列表
export const plightChildrenListApi = (data) => {
  return request({
    method: 'POST',
    url: '/social/child/getChildCheckList',
    data,
  })
}

// 残疾人上门核查 群众申请 残疾人数据列表
//disabledInspect
export const getDisabledInspectList = (data) => {
  return request({
    method: 'POST',
    url: '/social/assistanceWeixin/queryDisabledList',
    data,
  })
}

// 残疾人上门核查 获取残疾人信息
export const getDisabledUserInfoApi = (data) => {
  return request({
    method: 'POST',
    url: '/social/assistanceWeixin/getDisabled',
    data,
  })
}

// 残疾人具体信息 修改 暂存
export const saveDisabledInfoApi = (data) => {
  return request({
    method: 'POST',
    url: '/social/assistanceWeixin/saveDisabledInfo',
    data,
  })
}

// 行政区域select信息
export const getAreaApi = (data) => {
  return request({
    method: 'post',
    url: '/social/assistanceWeixin/getCitys',
    data,
  })
}

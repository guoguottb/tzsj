import request from '@/utils/request'
import baseURL from '@/utils/baseUrl';
const cantService = {}
let base_url = baseURL.user

// 获取区划节点数据
cantService.getRegionTreeData = () => request({
  url: 'cant/getRegionTreeData',
  method: 'get',
  baseURL:base_url
})

// 获取区划根节点
cantService.getRootCant = () => request({
  url: 'cant/getRootCant',
  method: 'get',
  baseURL:base_url
})

// 获取区划子节点
cantService.getCantsBySuperId = (superId) => request({
  url: 'cant/getCantsBySuperId',
  method: 'get',
  baseURL:base_url,
  params: {superId}
})

// 获取区划类型列表
cantService.listAllCantTypes = () => request({
  url: 'cant/listAllCantTypes',
  method: 'post',
  baseURL:base_url,
  data: {'inUse': 1}
})

// 获取父级区划名称
cantService.getParentName = (cantId) => request({
  url: 'cant/getParentName',
  method: 'get',
  baseURL:base_url,
  params: {cantId}
})

// 判断区划code是否已经存在
cantService.ifCantCodeExist = (cantCode, cantId) => request({
  url: 'cant/isRepeatCant',
  method: 'get',
  baseURL:base_url,
  params: {cantCode, cantId}
})

// 获取任务列表
cantService.taskList = (params) => request({
    url: 'fileTask/list',
    method: 'post',
    baseURL:base_url,
    data: params
})

export default cantService

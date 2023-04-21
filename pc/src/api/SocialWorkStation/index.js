import request from '@/utils/request'

// 社工站

// 社工站列表
export const socialWorkStationGetListApi = (data) =>
  request({
    method: 'POST',
    url: '/social/socialWorkStation/getList',
    data,
  })

// 新增社工站
export const socialWorkStationSaveStationApi = (data) =>
  request({
    method: 'POST',
    url: '/social/socialWorkStation/saveStation',
    data,
  })

// 查看 社工站
export const getStationDetailApi = (data) =>
  request({
    method: 'POST',
    url: '/social/socialWorkStation/getStationDetail',
    data,
  })
// 社工站 修改
export const saveStationApi = (data) =>
  request({
    method: 'POST',
    url: '/social/socialWorkStation/saveStation',
    data,
  })
// 社工站下拉选择列表
export const socialWorkStationGetSimpleListApi = (id) =>
  request({
    method: 'POST',
    url: '/social/socialWorkStation/getSimpleList',
    data: {
      id,
    },
  })

// 社工站人员列表
export const socialWorkStationGetPersonListApi = (data) =>
  request({
    method: 'POST',
    url: '/social/socialWorkStation/getPersonList',
    data,
  })

// 保存社工站人员
export const socialWorkStationSaveStationPerson = (data) =>
  request({
    method: 'POST',
    url: '/social/socialWorkStation/saveStationPerson',
    data,
  })
// 社工站人员详情
export const getStationPersonDetailApi = (data) =>
  request({
    method: 'post',
    url: '/social/socialWorkStation/getStationPersonDetail',
    data,
  })
// 艾 社工站列表 走访分配
export const WorkStationGetSGZListApi = (data) =>
  request({
    method: 'POST',
    url: '/social/socialWorkStation/getSGZList',
    data,
  })

// 艾 分配定期走访记录接口
export const assignRegularVisitRecordsApi = (data) =>
  request({
    method: 'POST',
    url: '/social/assistance/assignRegularVisitRecords',
    data,
  })

// 社工站批次 ----------------------------------------------------------------
// 社工站下发批次列表
export const socialWorkOperateGetBatchListApi = (data) =>
  request({
    method: 'POST',
    url: '/social/socialWorkOperate/getBatchList',
    data,
  })
// 社工站批次 创建
export const socialWorkOperateCreateBatchApi = (data) =>
  request({
    method: 'POST',
    url: '/social/socialWorkOperate/createBatch',
    data,
  })
// 批次开始
export const startBatchApi = (data) =>
  request({
    method: 'POST',
    url: '/social/socialWorkOperate/startBatch',
    data,
  })
// 批次完成
export const finishBatchApi = (data) =>
  request({
    method: 'POST',
    url: '/social/socialWorkOperate/finishBatch',
    data,
  })
// 删除批次
export const deleteBatchApi = (data) =>
  request({
    method: 'POST',
    url: '/social/socialWorkOperate/deleteBatch',
    data,
  })

//--------------------------------------------------------
// 考核管理
// 社工站考核列表 数据回显
export const getStationExamineListApi = (data) =>
  request({
    method: 'POST',
    url: '/social/socialWorkGrade/getStationExamineList',
    data,
  })
// 人员考核列表 数据回显
export const getPersonExamineListApi = (data) =>
  request({
    method: 'POST',
    url: '/social/socialWorkGrade/getPersonExamineList',
    data,
  })

//--------------------------------------------------------
// 获取走访记录列表
export const socialWorkOperateGetRecordListApi = (data) =>
  request({
    method: 'POST',
    url: '/social/socialWorkOperate/getRecordList',
    data,
  })
//走访记录 新增
export const addRecordApi = (data) =>
  request({
    method: 'POST',
    url: '/social/socialWorkOperate/addRecord',
    data,
  })
//走访记录 删除
export const deleteRecordApi = (data) =>
  request({
    method: 'POST',
    url: '/social/socialWorkOperate/deleteRecord',
    data,
  })
//走访记录 评价
export const rateServiceApi = (data) =>
  request({
    method: 'POST',
    url: '/social/socialWorkGrade/rateService',
    data,
  })
//

import request from "@/utils/request"

/**
 * 预警平台系统/预警核查对象数据库/对象预警/核查报告预警
 * @returns Promise
 */
export const getInspectReportWgApi = (data )=>{
  return request({
    url:"social/assistance/HDBGWTYJ",
    method:"POST",
    data:{
      card:data.card,
      name:data.name,
      page:data.page,
    }
  })
}
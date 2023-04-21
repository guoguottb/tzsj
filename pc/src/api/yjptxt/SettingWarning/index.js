import request from "@/utils/request"
// 预警平台系统 > 大数据预警 > 设置预警条件 > excel导入数据库

export const exportExcelApi = (data) => {
  return request({
    method:"POST",
    url:"/social/bigDataWarn/excelImport",
    data,
    headers: {'Content-Type': 'application/json'},
  })
}
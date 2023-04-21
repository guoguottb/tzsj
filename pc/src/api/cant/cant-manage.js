import request from '@/utils/request';
import baseURL from '@/utils/baseUrl';
const cantTypeService = {};
let base_url = baseURL.user

/**
 * 代码唯一性校验
 * @param {Object} code 类型代码
 */
cantTypeService.existCantType = function (param) {
    return request({
        url: 'cant/isExistCantType',
        method: 'get',
        params: param,
        baseURL: base_url
    })
}
/**
 * 代码唯一性校验
 * @param {Object} code 类型代码
 */
cantTypeService.existTypeName = function (param) {
    return request({
        url: 'cant/existTypeName',
        method: 'get',
        params: param,
        baseURL: base_url
    })
}

/**
 * 新增和编译
 * @param {Object} params
 */
cantTypeService.updateOrSaveCantType = function (params, isnew) {
    let url = isnew ? "cant/updateCantType" : "cant/saveCantType";
    return request({
        url: url,
        method: 'post',
        data: params,
        baseURL: base_url
    })
};

/**
 * 删除一个类型
 * @param {Object} code 类型代码
 */
cantTypeService.deleteCantType = function (param) {
    return request({
        url:  "cant/deleteCantType",
        method: 'post',
        data: param,
        baseURL: base_url
    })
}

cantTypeService.getCantTypesList = function(params) {
    return request({
        url: "cant/listPageCantTypes",
        method: "get",
        baseURL: base_url,
        params: params
    });
}

cantTypeService.getCantExt= function (query) {
    return request({
        method: 'get',
        url: 'cant/getCantExt',
        baseURL: base_url,
        params: query
    })
}

cantTypeService.getCantExtsList= function(query) {
    return request({
        method: 'post',
        url: 'cant/listPageCantExts',
        baseURL: base_url,
        data:query,
    })
}


export default cantTypeService;


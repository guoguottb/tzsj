import request from '@/utils/request';
import baseURL from '@/utils/baseUrl';
const base_url = baseURL.user;
const cantListService = {};


/**
 * 查询
 * @param {Object} params

 */
cantListService.query = function (params) {
    let ajax = request.get('cant/listPageCants', {
        params: params,
        baseURL: base_url
    })
    return ajax;
};
/**
 * 编译
 * @param {Object} params
 */
// cantListService.updateCant = function (param) {
//     let url = "cant/updateCant";
//     return request({
//         url: url,
//         method: 'post',
//         params: param,
//         baseURL: baseURL.user
//     })
// }
cantListService.updateCant = function (param) {
    return request.post('cant/updateCant', param, {

		headers: baseURL.jsonheader,
		baseURL:base_url
	})

}
/**
 * 新增
 * @param {Object} params
 */
// cantListService.saveCant = function (param) {
//     let url = 'cant/saveCant';
//     return request({
//         url: url,
//         method: 'post',
//         params: param,
//         baseURL: baseURL.user
//     })
// }
cantListService.saveCant = function (param) {
    return request.post('cant/saveCant', param, {
		headers: baseURL.jsonheader,
		baseURL:base_url
	})

}
cantListService.listAllCantTypes = function (param) {
    return request({
        url: 'cant/listAllCantTypes',
        method: 'get',
        params: param,
        baseURL:base_url
    })
}

cantListService.batchDelCant = function(code) {
	return request.post('cant/batchDelCant', "cantList=" + code, {
		headers: baseURL.formheader,
		baseURL: base_url
	})
}
  cantListService.ifCantCodeExist = function(cantCode, cantId) {
	return request.get('cant/isRepeatCant', {
		params: {
            cantCode:cantCode,
            cantId:cantId
		},
		baseURL: base_url
	})
}

cantListService.getRegionTreeData = function () {
	return request({
		url: 'cant/getRegionTreeData',
		method: 'get',
		baseURL: base_url
	})
}


export default cantListService;

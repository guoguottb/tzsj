import request from "@/utils/request";
import baseURL from "@/utils/baseUrl";
import qs from "qs";

const struService = {};
const baseUrl = baseURL.user;


/**
 * 查询所有的组织视角
 * @param {Object} param 组织视角
 */
struService.query = function (param) {
	return request.get("/stru/children", {
		params: param,
		baseURL: baseUrl
	});
};

// 获取当前登录用户的组织id
struService.getCharCrop = function (param) {
	return request.get("/stru/getCharCrop", {
        param:param,
		baseURL: baseUrl
	});
};


struService.getTableData = function (param) {
	return request.get("/struType/list", {
		params: param,
		baseURL: baseUrl
	});
};



struService.getStru = function (param) {
	return request.get("stru/getStru", {
		params: param,
		baseURL: baseUrl
	});
};

//添加节点
struService.selcantCode = function (param) {
	return request.post("/organstru/selcantCode", param, {
		headers: baseURL.jsonheader,
		baseURL: baseUrl
	});
};

/**
 * 查询组织视角详情
 * @param {Object} struType 组织视角
 */
struService.info = function (struType) {
	return request.get("/info", {
		params: {
			type: struType,
			baseURL: baseUrl
		}
	});
};


/**
 * 新增
 * @param {Object} data 数据
 */
struService.insert = function (data) {
	return request.post("/stru/insert", qs.stringify(data), {
		headers: baseURL.jsonheader,
		baseURL: baseUrl
	});
};


/**
 * 更新
 * @param {Object} data
 *
 */
struService.update = function (data) {
	return request.post("stru/update", data, {
		headers: baseURL.jsonheader,
		baseURL: baseUrl
	});
};

struService.delete = function (params) {
	return request.post("stru/delete", qs.stringify(data), {
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		baseURL: baseUrl
	});
};
/**
 * 删除
 * @param {Object} struType 组织视角
 */
struService.batchDel = function (data) {
	return request.post("stru/batchDel", qs.stringify(data), {
		headers: baseURL.formheader,
		baseURL: baseUrl
	});
	
};

struService.getTreeByOrgId = function (params) {
	return request({
		url: "stru/simpleTree",
		method: "get",
		params: params
	});
};

/**
 * 组织视角唯一检查
 * @param {Object} struType
 */
struService.struTypeUniqueCheck = function (struType) {
	return request.get("/struTypeUniqueCheck", {
		params: {
			struType: struType
		},
		baseURL: baseUrl
	});
};

struService.organCodeUniqueCheck = function (params) {
	return request({
		url: "stru/organCodeUniqueCheck",
		method: "post",
		data: params,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	});
};

struService.getCharOrgan = function () {
	return request({
		url: "stru/getCharOrgan",
		method: "post"
	});
};


struService.getOrganNameById = function (params) {
	return request({
		url: "stru/getOrganNameById",
		method: "get",
		params: params,
		baseURL: baseUrl
	});
};

struService.getOrganTreeData = function (params) {
	return request({
		url: "stru/getOrganTreeData",
		method: "get",
		params: params,
		baseURL: baseUrl
	});
};

struService.updateParent = function (params) {
	return request({
		url: "stru/updateParent",
		method: "post",
		data: params
	});
};

struService.listOrganHistory = function (params) {
	return request({
		url: "stru/listOrganHistory",
		method: "post",
		data: params
	});
}
export default struService;

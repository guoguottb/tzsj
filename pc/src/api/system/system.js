import request from "@/utils/request";
import baseURL from "@/utils/baseUrl";
import qs from "qs";

const userOtherService = {};
let base_url = baseURL.user


userOtherService.addUser = function (params) {
	return request({
		url: "users/insert",
		baseURL: base_url,
		method: "post",
		data: params,
		headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8'
        }
	});
};



userOtherService.listSystemChars = function (params) {
	return request({
		url: "uumUserSystem/listSystemChars",
		method: "post",
		baseURL: base_url,
		data: params
	});
};

userOtherService.listByChartIdCurrent = function (params) {
	return request({
		url: "/apps/list",
		method: "post",
		baseURL: baseURL.rac,
		data: params
	});
};

userOtherService.getListByUumSystem = function (data) {
	return request.post('uumSystem/list',data, {
			headers:baseURL.jsonheader,
			baseURL: base_url
		}
	);
};
userOtherService.getUmcInviteStruByUserchartId = function (params) {
	return request({
		url: "umcInvite/getStruByUserchartId",
		baseURL: base_url,
		method: "post",
		data: params
	});
};


userOtherService.selectByOrganId = function (params) {
	return request({
		url: "uumOrganExt/selectByOrganId",
		method: "get",
		baseURL: base_url,
		params: params
	});
};

userOtherService.saveUumOrganExt = function (params) {
	return request({
		url: "uumOrganExt/save",
		method: "post",
		baseURL: base_url,
		data: params
	});
};

userOtherService.queryUumUser = function (params) {
	return request({
		url:'uumUser/query',
		method:'post',
		baseURL: base_url,
		data:params
	})
}
userOtherService.updatePwdExpirTimeByUserId = function (params) {
	return request({
		url:'uumUser/updatePwdExpirTimeByUserId',
		method:'post',
		data:params,
		baseURL: base_url,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}

userOtherService.umcSecurityAuditLog = function(params){
	return request({
		url:'umcSecurityAuditLog/list',
		method: 'post',
		baseURL: base_url,
		data:params,
	})
}

userOtherService.getLoginConfig = function () {
	return request({
		url: 'systemParam/loginConfig?paramKey=',
		method: 'get',
		baseURL:baseURL.user,
		//params:params
	})
}
userOtherService.updateLoginConfig = function (params) {
	return request({
		url: 'systemParam/updateLoginConfig',
		method: 'get',
		baseURL:baseURL.user,
		params:params
	})
}
userOtherService.getOrgClass = function () {
	return request({
		url: 'systemParam/orgClass?paramKey=',
		method: 'get',
		baseURL:baseURL.user,
		//params: params
	})
}

export default userOtherService;

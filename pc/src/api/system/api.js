/**
 *description: api.js
 *author: Liu Jiabin
 *date: 2020/10/10
 */
import request from "@/utils/request";
import baseURL from "@/utils/baseUrl";
const apiService = {}
let base_url = baseURL.user

apiService.updatePerson = function (params) {
	return request({
		url: "person/my/updatecertinfo",
		method: "post",
		baseURL: base_url,
		data: params
	});
};
apiService.checkCertNumUnique = function (params) {
	return request({
		url: "person/certNumUniqueCheck",
		method: "get",
		baseURL: base_url,
		params: params
	});
};

apiService.checkPhoneNumUnique = function (params) {
	return request({
		url: "users/phoneUniqueCheck",
		method: "get",
		baseURL: base_url,
		params: params
	});
};

apiService.getPersonInfo = function (params) {
	return request({
		url: "users/info/ucUid",
		baseURL: base_url,
		method: "get",
		params: params
	});
};

apiService.maskPersonInfo = function (params) {
	return request({
		url: "person/info",
		baseURL: base_url,
		method: "get",
		params: params
	});
};
apiService.sendVerifyCode = function (params) {
	return request({
		url: "api/system/sendVerifyCode",
		baseURL: base_url,
		method: "post",
		data: params
	});
};

apiService.checkVerifyCode = function (params) {
	return request({
		url: "api/system/checkVerifyCode",
		method: "post",
		baseURL: base_url,
		data: params
	});
};

apiService.getUserDetail = function () {
    return request({
        url: "/users/loginfo/simple",
        baseURL: base_url,
        method: "get",
    });
};

apiService.updatePersonComminfo = function (params) {
    return request({
        url: "person/my/updatecomminfo",
        method: "post",
        baseURL: base_url,
        data: params
    });
};

export default apiService

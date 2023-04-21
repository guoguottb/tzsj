/**
 *description: security.js
 *author: Liu Jiabin
 *date: 2020/9/28
 */

import request from "@/utils/request";
import baseURL from "@/utils/baseUrl";
import qs from 'qs';
let base_url = baseURL.user
const securityPolicyService = {}


securityPolicyService.securityPolicyByUcuid  = function(ucUid) {
	return request({
		method: "get",
		url: 'securityPolicy/my/policyInfo',
		baseURL: base_url,
	});
};

securityPolicyService.securityPolicyInit = function(params) {
	return request({
		method: "post",
		url: 'securityPolicy/initPolicy',
		baseURL: base_url,
		data:params
	});
};

securityPolicyService.securityPolicyUpdate = function(params) {
	return request({
		method: "post",
		url: 'securityPolicy/my/updatePolicy',
		baseURL: base_url,
		data:qs.stringify(params)
	});
};

export default securityPolicyService

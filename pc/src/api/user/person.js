/**
 *description: person.js
 *author: Liu Jiabin
 *date: 2020/10/10
 */

import request from "@/utils/request";
import baseURL from "@/utils/baseUrl";
const personService = {}
let base_url = baseURL.user

personService.checkIdCard = function (params) {
	return request ({
		url: 'person/idCardCheck',
		method: 'get',
		params: params,
		baseURL: base_url,
	})
	
}

personService.getCurrentPersonInfo = function (params) {
	return request ({
		url: 'person/my/info',
		method: 'get',
		params: params,
		baseURL: base_url,
	})
}
personService.avatarUpload = function (params) {
	return request({
		url: "person/avatar/upload",
		method: "post",
		data: params,
		baseURL: base_url,
		headers: {
			"Content-Type": "multipart/form-data"
		}
	});
};

personService.update = function (params) {
	return request({
		url: "person/my/updatecertinfo",
		baseURL: base_url,
		method: "post",
		data: params,
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8'
        }
	});
};


personService.getInfo = function (params) {
	return request({
		url: "person/info",
		method: "get",
		baseURL: base_url,
		params: params
	});
};
personService.checkCertNumUnique = function (params) {
	return request({
		url: "person/certNumUniqueCheck",
		baseURL: base_url,
		method: "get",
        params: params,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	});
};

export default personService

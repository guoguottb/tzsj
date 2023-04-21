/**
 *description: dict-send.js 字典推送 接口
 *author: Liu Jiabin
 *date: 2020/9/28
 */
import request from "@/utils/request";
import baseURL from '@/utils/baseUrl'
import qs from "qs";
let base_url = baseURL.user
const dictSendService = {}

dictSendService.getDictsList = function(query) {
	return request({
		method: 'get',
		url: 'dict/listPageDicts',
		baseURL: base_url,
		params: query
	})
}
dictSendService.listPageDictItems = function (params) {
	return request({
		url: "dict/listPageDictItems",
		method: 'get',
        params: params,
		baseURL: base_url,
	})
}
dictSendService.batchDelDictItem = function (params) {
	return request({
		url: "dict/batchDelDictItem",
		method: 'post',
		data: qs.stringify(params),
		baseURL:base_url,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}




dictSendService.isExistDict = function (params) {
	return request({
		url: "dict/isExistDict",
		method: 'get',
		params: params,
		baseURL:base_url
	})
}
dictSendService.isExistDictItem = function(params){
	return request({
		url: "dict/isExistDictItem",
		method: 'post',
		data: qs.stringify(params),
		baseURL: base_url,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}
dictSendService.saveDict = function (params) {
	return request({
		url: 'dict/saveDict',
		method: 'post',
		baseURL: base_url,
		data: params
	})
}
dictSendService.saveDictItem = function(params){
	return request({
		url: 'dict/saveDictItem',
		method: 'post',
		data: params,
		baseURL: base_url,
	})
}
dictSendService.updateDicts = function (params) {
	return request({
		url: 'dict/updateDict',
		method: 'post',
		baseURL: base_url,
		data: params
	})
}

dictSendService.updateDictItem = function(params){
	return request({
		url: 'dict/updateDictItem',
		method: 'post',
		baseURL: base_url,
		data: params
	})
}

dictSendService.deleteDicts = function (params) {
	return request({
		url: 'dict/batchDelDict',
		method: 'post',
		baseURL: base_url,
		data: qs.stringify(params),
        headers:{
            "Content-Type": "application/x-www-form-urlencoded"
        }
	})
}

export default dictSendService

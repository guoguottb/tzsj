import request from '@/utils/request'
import baseURL from "@/utils/baseUrl";
let base_url = baseURL.user
const securityOperateService = {}

securityOperateService.getOperationList  = function(param) {
    return request({
        url: 'security/operation/list',
        method: 'get',
        params:param,
        baseURL: base_url,
    })
}


securityOperateService.operateSave  = function(param) {
    return request({
        url: 'operation/',
        method: 'post',
        baseURL: base_url,
        data: param
    })
}


securityOperateService.operateUpdate  = function(param) {
    return request({
        url: 'operation/' + param.optId,
        method: 'put',
        data: param,
        baseURL: base_url,
    })
}

securityOperateService.operateDelete  = function(param) {
    return request({
        url: 'operation/'+param,
        method: 'delete',
        baseURL: base_url,
    })
}

/*securityOperateService.operateDelete  = function(param) {
    return request({
        url: 'operation/delete?optId'+param,
        method: 'get',
        baseURL: base_url,
    })
}*/

securityOperateService.urlSave  = function(param) {
    return request({
        url: 'url/',
        method: 'post',
        baseURL: base_url,
        data: param
    })
}

securityOperateService.urlList  = function(param) {
    return request({
        url: 'url/?optId='+ param,
        method: 'get',
        baseURL: base_url,
    })
}
securityOperateService.urlSaveAll  = function(param) {
    return request({
        url: 'url',
        method: 'post',
        baseURL: base_url,
        data: param
    })
}

securityOperateService.urlUpdate  = function(param) {
    return request({
        url: 'url/' + param.urlId,
        method: 'put',
        baseURL: base_url,
        data: param
    })
}

securityOperateService.urlDelete  = function(param) {
    return request({
        url: 'url?urlIds=' + param,
        method: 'delete',
        baseURL: base_url,
    })
}
/*securityOperateService.urlDelete  = function(param) {
    return request({
        url: 'url/delete?urlIds=' + param,
        method: 'get',
        baseURL: base_url,
    })
}*/



export default securityOperateService

import request from '@/utils/request'
import baseURL from '../../utils/baseUrl'
const base_rac = baseURL.rac

const securityAppService = {}

securityAppService.appSave  = function(param) {
    return request({
        url: 'security/app/save',
        method: 'post',
        data: param,
		baseURL:base_rac
    })
}

securityAppService.appUpdate  = function(param) {
    return request({
        url: 'security/app/update/' + param.appId,
        method: 'put',
        data: param,
        baseURL:base_rac
    })
}

securityAppService.deleteApp  = function(param) {
    return request({
        url : 'security/app/delete',
        method : 'get',
        params:param,
        baseURL:base_rac
    })
}

securityAppService.listAll  = function() {
    return request({
        url: 'security/app/listAll',
        method: 'get',
        baseURL: base_rac,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
}


export  default securityAppService

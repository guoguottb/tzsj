import request from '@/utils/request'
import baseURL from "@/utils/baseUrl";
let base_url = baseURL.user
const securityModuleService = {}



securityModuleService.moduleSave  = function(param) {
    return request({
        url: 'module/',
        method: 'post',
        data: param,
        baseURL: base_url,
    })
}

securityModuleService.moduleUpdate  = function(param) {
    return request({
        url: 'module/'+param.moduleId,
        method: 'put',
        baseURL: base_url,
        data: param
    })
}
securityModuleService.getModuleChildren = function () {
    return request({
        url: "security/module/children?parentId=00",
        method: "get",
        baseURL: base_url,
    });
};

securityModuleService.moduleData = function (params) {
    return request({
        method: "get",
        url: "security/module/children",
        baseURL: base_url,
        params
    });
};
securityModuleService.getChildren  = function(param) {
    return request({
        url: 'module/'+ param.parentId + '/children',
        method: 'get',
        baseURL: base_url,
    })
}

securityModuleService.deleteModule  = function(param) {
    return request({
        url: 'security/module/delete',
        method: 'get',
        params: param,
        baseURL: base_url,
    })
}


export default securityModuleService

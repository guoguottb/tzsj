import request from '@/utils/request'
import baseURL from '../../utils/baseUrl'

let base_url = baseURL.rac
const securityMenuService = {}


securityMenuService.getChild  = function(param) {
    return request({
        url: 'menu/children',
        method: 'get',
        param:param,
        baseURL:base_url
    })
}
securityMenuService.getMenuList  = function(param) {
    return request({
        url: 'menu/list',
        method: 'post',
        data: param,
        baseURL:base_url
    })
}

securityMenuService.createMenu  = function(param) {
    return request({
        url: 'menu/',
        method: 'post',
        data: param,
        baseURL:base_url
    })
}

securityMenuService.editMenu  = function(param) {
    return request({
        url: 'menu/'+param.menuId,
        method: 'put',
        data: param,
        baseURL:base_url
    })
}
securityMenuService.deleteMenu  = function(param) {
    return request({
        url: 'menu/delete/'+param,
        method: 'get',
        baseURL:base_url
    })
}
export default securityMenuService

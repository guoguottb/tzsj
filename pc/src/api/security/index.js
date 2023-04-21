import request from '@/utils/request'

export function appData() {
    return request({
        method: 'get',
        url: 'security/app/listAll',
    })
}
export function moduleData(params) {
    return request({
        method: 'get',
        url: 'security/module/children',
        params
    })
}
export function operateData(params) {
    return request({
        method: 'get',
        url: 'security/operation/list',
        params:{
            params
        }
    })
}
export function saveApp(params) {
    return request({
        method: 'post',
        url: 'security/app/save',
        params:{
            params
        }
    })
}
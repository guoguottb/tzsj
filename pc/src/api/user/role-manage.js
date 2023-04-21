import request from '@/utils/request'
import baseURL from "@/utils/baseUrl";
import qs from "qs";
import struService from "../stru/struService";
const roleService = {}
let base_url = baseURL.user
roleService.getRoleList = function (params) {
    return request({
        url: "role/my/assiganRoleList",
        baseURL:base_url,
        method: "get",
        params: params,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
};
roleService.getRoleChildrens= function (params) {
    return request({
        url: 'role/children?parentId='+params,
        method: 'get',
        baseURL:base_url
    })
}

roleService.getRoleTree = function (params) {
    return request({
        url: 'role/tree',
        method: 'get',
        baseURL:base_url,
        params:params
    })
};

roleService.isExistRole = function (params) {
    return request({
        url: 'role/isExistRole',
        method: 'get',
        baseURL:base_url,
        params:params
    })
};

roleService.saveRole = function (param) {
    return request.post('role/insert', param, {
        headers: baseURL.jsonheader,
        baseURL:base_url
    })
};

roleService.updateRole = function (param) {
    return request.post('role/update', param, {
        headers: baseURL.jsonheader,
        baseURL:base_url
    })
};

roleService.delRole = function (params) {
    return request({
        url: "role/delete",
        method: 'post',
        data: qs.stringify(params),
        baseURL:base_url,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
};

roleService.roleManager = function (params) {
    return request({
        url: 'role/assiganRoleList',
        method: 'get',
        baseURL:base_url,
        params:params
    })
};

roleService.queryPageList = function (params) {
    return request({
        url: 'role/queryPageList',
        method: 'get',
        baseURL:base_url,
        params:params
    })
};

roleService.editRoles = function (params) {
    return request({
        url: "role/editAssignRoles",
        method: 'get',
        params: params,
        baseURL:base_url,
    })
};

roleService.getRoleChildrenInfo= function (params) {
    return request({
        url: 'api/role/children',
        method: 'get',
        baseURL:base_url,
        params:params
    })
}

roleService.getRoleChildren= function (params) {
    return request({
        url: 'role/queryPageList',
        method: 'get',
        baseURL:base_url,
        params:params
    })
}

export default  roleService

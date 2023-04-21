//  项目菜单
import Mock from 'mockjs'
import baseURL from '@/utils/baseUrl'
export function getMenuList() {
    Mock.mock(baseURL.rac + '/menu/app/', 'get', {
        "status": 0,
        "msg": "ok",
        "data": {
            "menuId": null,
            "menuName": "统一用户管理系统",
            "appId": "00",
            "parentMenuId": null,
            "requestAction": null,
            "icon": null,
            "seq": null,
            "children": [{
                "menuId": "96db7e7e42be4a04952854239463171f",
                "menuName": "行政区划管理",
                "appId": "00",
                "parentMenuId": "00",
                "requestAction": "",
                "icon": "",
                "seq": 100,
                "children": [{
                    "menuId": "b9cedccffce24196a542766592860565",
                    "menuName": "区划类型管理",
                    "appId": "00",
                    "parentMenuId": "96db7e7e42be4a04952854239463171f",
                    "requestAction": "/umc/cant/manage/cant-type-list",
                    "icon": "",
                    "seq": 100,
                    "children": null
                }, {
                    "menuId": "d4af6483e3184e49903eed48adfa3441",
                    "menuName": "区划管理",
                    "appId": "00",
                    "parentMenuId": "96db7e7e42be4a04952854239463171f",
                    "requestAction": "/umc/cant/manage/cant-list",
                    "icon": "",
                    "seq": 200,
                    "children": null
                }]
            }, {
                "menuId": "21",
                "menuName": "用户管理",
                "appId": "00",
                "parentMenuId": "00",
                "requestAction": null,
                "icon": "bb",
                "seq": 300,
                "children": [{
                    "menuId": "22",
                    "menuName": "用户管理",
                    "appId": "00",
                    "parentMenuId": "21",
                    "requestAction": "/umc/user/user-manage",
                    "icon": "geren",
                    "seq": 100,
                    "children": null
                }]
            }, {
                "menuId": "57b2e1963e0d40259676f4f34178dc0a",
                "menuName": "字典管理",
                "appId": "00",
                "parentMenuId": "00",
                "requestAction": "",
                "icon": "",
                "seq": 500,
                "children": [{
                    "menuId": "488b749c02584602817cb0be4bff95cb",
                    "menuName": "字典管理",
                    "appId": "00",
                    "parentMenuId": "57b2e1963e0d40259676f4f34178dc0a",
                    "requestAction": "/umc/dict/manage/dict-list",
                    "icon": "",
                    "seq": 100,
                    "children": null
                }]
            }, {
                "menuId": "550018ec37774c11a22f8038a1f910bf",
                "menuName": "系统管理",
                "appId": "00",
                "parentMenuId": "00",
                "requestAction": "",
                "icon": "",
                "seq": 600,
                "children": [{
                    "menuId": "264f6430790b4f7b969878e64839217f",
                    "menuName": "角色管理",
                    "appId": "00",
                    "parentMenuId": "550018ec37774c11a22f8038a1f910bf",
                    "requestAction": "/umc/security/role/role-manage",
                    "icon": "",
                    "seq": 300,
                    "children": null
                }]
            }]
        }
    })
}

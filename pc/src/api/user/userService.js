import request from '@/utils/request';
import baseURL from '@/utils/baseUrl';
import qs from 'qs';

const userService = {};
const base_url = baseURL.user;



/**
 * 查询组织视角详情
 * @param {Object} struType 组织视角
 */
userService.info = function(struType) {
	return request.get(
		'users/info',
		{
			params: {
				type: struType,
				baseURL: base_url
			}
		}
	)
};

/**
 * 组织视角唯一检查
 */
userService.struTypeUniqueCheck = function(struType) {
	return request.get(
		'users/struTypeUniqueCheck',
		{
			params: {
				struType: struType
			},
			baseURL: base_url
		}
	)
};

// 重置密码
userService.resetPwd = ucuid => request({
	url: 'users/initpasswd',
	method: 'post',
	baseURL: base_url,
    data: qs.stringify(ucuid),
    headers:{
        "Content-Type": "application/x-www-form-urlencoded"
    }
})


/*kaishi*/

userService.updatepasswd = function(params) {
	return request({
		url: "users/my/updatepwd",
		method: "post",
		data: qs.stringify(params),
		baseURL: base_url
	});
}

userService.lockUser = function(params, lock) {
	var url = "";
	if (!lock) {
		url = "users/unLockUser";
	} else {
		url = "users/lockUser";
	}
	
	return request({
		url: url,
		method: "post",
		baseURL: base_url,
		data: qs.stringify(params),
        headers:{
            "Content-Type": "application/x-www-form-urlencoded"
        }
	});
}


userService.checkPhoneUnique = function(params) {
	return request({
		url: "users/phoneUniqueCheck",
		baseURL: base_url,
		method: "get",
        params: params,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	});
}

userService.checkEmailUnique = function(params) {
	return request({
		url: "users/emailUniqueCheck",
		method: "post",
		baseURL: base_url,
		data: params,
		headers: {
			Accept: "application/json",
			"Content-Type": "application/x-www-form-urlencoded"
		}
	});
}
userService.checkUserIdUnique = function(params) {
	return request({
		url: "users/userIdUniqueCheck",
		baseURL: base_url,
		method: "post",
		data: params,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	});
}


userService.getUserInfo = function(params) {
	return request({
		url: 'users/info',
		method: 'get',
		baseURL: base_url,
		params:params
	})
}

userService.getUserInfoByUcuid = function(params) {
	return request({
		url: 'users/info/ucUid',
		method: 'get',
		baseURL: base_url,
		params:params,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
	})
}

userService.updataUser = function(params) {
	return request({
		url: 'users/update',
		baseURL: base_url,
		method: 'post',
		data:params,
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8'
        }
	})
}

// 导入任务列表查询
userService.taskList = function(params) {
    return request({
        url: '/task/import/taskList',
        method: 'get',
        baseURL: base_url,
        params: params
    })
}

// 导入任务详情列表查询
userService.taskDetailList = function(params) {
    return request({
        url: '/task/import/taskDetailList',
        method: 'get',
        baseURL: base_url,
        params: params
    })
}

export default userService;


/**
 *description: authen.js
 *author: Liu Jiabin
 *date: 2020/10/12
 */
import request from "@/utils/request";
import baseURL from "@/utils/baseUrl";

const authenService = {};
let base_url = baseURL.user


authenService.loginfoSimple = function () {
	return request({
		url: "users/loginfo/simple",
		baseURL: base_url,
		method: "get"
	});
};

authenService.getTreeNode = function (param) {
	return request({
		/*url: "authen/loginfo/full",*/
		url:"/stru/my/rootOrgan",
		baseURL: base_url,
		method: "get"
	});
};

export default authenService

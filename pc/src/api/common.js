import request from '@/utils/request'
import baseURL from '@/utils/baseUrl'

export function getMenuList (appId) {
   return request({
      method: 'get',
      url: '/menu/app/'+appId,
	  baseURL:baseURL.rac
   })
};



export function getFormOptionList (query) {
	return request({
		method: 'get',
		url: '/option/all',
		params: {query:query},
		baseURL:baseURL.user
	})
}


export function getNormalTableData() {
	return request({
		method: 'get',
		url: '/normal/all',
	})
}
export function queryTableList() {
	return request({
		method: 'get',
		url: '/respon/list',
	})
}

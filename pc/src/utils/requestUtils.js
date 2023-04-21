import request from '@/utils/request'

// 退回委托确认
export function setSatus(params) {
	return request({
		headers: {
			'Accept': 'application/json',
		},
		url: '/social/assistance/setSatus',
		method: 'get',
		params: params,
	})
}
// 按乡镇 查统计的接口
export function statistical1(data) {
	return request({
		headers: {
			'Accept': 'application/json',
		},
		url: '/social/assistance/statistical1',
		method: 'post',
		data:data
	})
}

// 判断核对授权书编号
export function checkNum(data) {
	return request({
		headers: {
			'Accept': 'application/json',
		},
		url: '/social/assistanceWeixin/checkNum',
		method: 'post',
		data: data
	})
}

// 新增自定义预警保存
export function customWarning(data) {
	return request({
		headers: {
			'Accept': 'application/json',
		},
		url: '/social/assistance/customWarning',
		method: 'post',
		data: data
	})
}

// 统计分析 - 新增、核减数据
export function getByDateCount(data) {
	return request({
		headers: {
			'Accept': 'application/json',
		},
		url: '/social/assistance/getByDateCount',
		method: 'post',
		data: data
	})
}
// 统计分析 - 全区总人数,救助人数
export function getPersonCount(data) {
	return request({
		headers: {
			'Accept': 'application/json',
		},
		url: '/social/assistance/getPersonCount',
		method: 'post',
		data: data
	})
}
// 统计分析 - 办结业务
export function getLoopChartData(data) {
	return request({
		headers: {
			'Accept': 'application/json',
		},
		url: '/social/assistance/getLoopChartData',
		method: 'post',
		data: data
	})
}
// 统计分析 - 核对户数
export function getPieChart(data) {
	return request({
		headers: {
			'Accept': 'application/json',
		},
		url: '/social/assistance/getPieChart',
		method: 'post',
		data: data
	})
}
// 统计分析 - 80周岁以上老人情况
export function getAgeLevelCount(data) {
	return request({
		headers: {
			'Accept': 'application/json',
		},
		url: '/social/assistance/getAgeLevelCount',
		method: 'post',
		data: data
	})
}
// 统计分析 - 智慧监察
export function getTimeoutCount(data) {
	return request({
		headers: {
			'Accept': 'application/json',
		},
		url: '/social/assistance/getTimeoutCount',
		method: 'post',
		data: data
	})
}
// 统计分析 - 处理户数
export function getHandleCount(data) {
	return request({
		headers: {
			'Accept': 'application/json',
		},
		url: '/social/assistance/getHandleCount',
		method: 'post',
		data: data
	})
}
// 统计分析 - 智能预警
export function getAlertCount(data) {
	return request({
		headers: {
			'Accept': 'application/json',
		},
		url: '/social/assistance/getAlertCount',
		method: 'post',
		data: data
	})
}

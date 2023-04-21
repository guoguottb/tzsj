import request from "@/utils/request";
import baseURL from "@/utils/baseUrl";
let base_url = baseURL.rac
// const dictService = {};
// const baseUrl = baseURL.user + "/dict";
// /**
//  * @param {Object} dicts
//  * @param {Object} success
//  * @param {Object} error
//  */
// dictService.queryDict = function(dicts, success, error) {
//     let strDicts = dicts.join(",");
//     let ajax = request.get("/getBatDictItems", {
//         baseURL: baseUrl,
//         params: {
//             "dictCodes": strDicts
//         }
//     }).then(data => {
//         let result = data.data;
//         // process
//         success(result);
//     }).catch(error => {
//         error(error)
//     });
// }

// export default dictService;


export function findDictsApi(dictCodes) {
	return request({
		url: "dict/getBatDictItems",
		method: "get",
		params: {dictCodes: dictCodes},
		baseURL: baseURL.user,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
	});
}


export function getBtnForAjaxApi(authUri, tarObj) {
	return request({
		url: "permit/authed?uri=" + authUri.url+"&context="+baseURL.user+"&method="+authUri.method,
		method: "get",
		baseURL: baseURL.rac,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		
	});
}


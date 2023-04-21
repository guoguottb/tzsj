/*
   文件说明：
      该文件封装了axios，可以更方便地为请求添加token
*/
import axios from 'axios'
import requestConst from '@/utils/request-const'
import { MessageBox, Message } from 'element-ui'
import router from '../router'
export let baseUrlAYL = 'http://192.168.1.62/' // 艾延伦
// let token = 'eyJhbGciOiJSUzI1325iJ9.eyJzdWIiInVzZXJJZCI6IjEiLCHdhHdjoiTXIuQUciLCJleHAiOjE1Nzc5NzU1MTl9.g5rXRfairB0kbOOsK8E26upPklagalh6otYqeHCPRElxfrG-NHSZI5kXJxNBOR1RA4fj5tI6MLwT09oH_ZmfRZbNBxKj_syEuE7YK32KwAymuRYL2jXG8gLMqHr8tMcuZN4TuFzO1-JF2su96s0fXOcKxvx5_Rg7tgGlbEVzdRI'
// export default function (data){
//    return axios({
//       ...data,
//       headers: { 'x-token': token }
//       // 模拟为每一个请求添加token
//    })
// }

// axios.defaults.timeout = 300000;
// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 300000000, // request timeout
})
let cancel = null
import store from '@/store'
// request interceptor
service.interceptors.request.use(
  (config) => {
    config.cancelToken = new axios.CancelToken((cancel) => {
      store.commit('addCancelToken', cancel)
    })
    let token = sessionStorage.getItem(requestConst.headers.sesstionCsrf)
    // do something before request is sent
    config.headers[requestConst.headers.csrf] = token
    if (process.env.NODE_ENV == 'development') {
      let greentoken = sessionStorage.getItem(requestConst.headers.greenChannel)
      config.headers[requestConst.headers.greenChannel] = greentoken
    }
    config.headers['Accept'] = 'application/json; charset=utf-8'
    return config
  },
  (error) => {
    // do something with request error
    console.error(error) // for debug
    return Promise.reject(error)
  }
)
// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res = response.data
    //没有返回体
    if (!res) {
      console.debug('返回值错误')
      // 隐藏省的报错
      // Message({
      // 	message: '返回值错误',
      // 	type: 'error',
      // 	duration: 5 * 1000
      // })
      return
    }
    //200 状态时 如果返回的body的status!=0 也是失败
    if (res.status != requestConst.body.SUCCESS) {
      let msg = res.msg ? res.msg : '出现错误'
      //Message({
      //message: msg,
      //type: 'error',
      //duration: 5 * 1000
      //	})
      return Promise.reject({
        config: response.config,
        isAxiosError: true,
        request: response.request,
        response: response,
      })
    }
    return res
  },
  (error) => {
    //console.error('err' + error) // for debug
    //响应
    const res = error.response
    //响应状态码
    const status = res.status
    //响应体
    const body = res.data
    //没有登录
    if (status === requestConst.http.UNAUTHORIZED) {
      console.error('没有登录')
      //跳到登录页
      return Promise.reject(error)
      router.push({
        name: 'login',
      })
    }
    //没有响应体
    if (!body) {
      console.log('返回值错误')
      // 隐藏省的报错
      // Message({
      // 	message: ' 返回值错误' + status,
      // 	type: 'error',
      // 	duration: 5 * 1000
      // })
      return Promise.reject(error)
    }
    //响应体状态
    const bodystatus = body.status
    if (bodystatus === requestConst.body.UNAUTHENTICATION) {
      console.log('没有登录')
      //跳到登录页
      router.push({
        name: 'login',
      })
    } else if (bodystatus === requestConst.body.CHART_REQUIRED) {
      console.log('还没选岗位')
      //跳到选岗位
    }
    //Message({
    //message: body.message,
    //type: 'error',
    //duration: 5 * 1000
    //})
    return Promise.reject(error)
  }
)
export default service

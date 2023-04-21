import request from '@/utils/request'
import baseURL from '@/utils/baseUrl'
// 登录方法
export function login(params) {
  let ajax = request.get('greenchannel/user/token', {
    params: params,
    baseURL: baseURL.user,
  })
  console.log(ajax, 'ajax')
  return ajax
}

export const loginApi = (data) => {
  return request({
    method: 'POST',
    url: '/social/login/doLogin',
    data,
  })
}
// 获取用户列表
export function getCharacter() {
  return request({
    headers: {
      Accept: 'application/json',
    },
    url: '/character/mylist',
    method: 'get',
    baseURL: baseURL.user,
  })
}
// 获取登录角色的token
export function switchCharactor(params) {
  let ajax = request.get('greenchannel/chart/token', {
    params: params,
    baseURL: baseURL.user,
  })
  return ajax
}

// 退出方法
export function logout() {
  return request({
    url: '/j_spring_security_logout',
    method: 'post',
    baseURL: baseURL.user,
  })
}

// 获取验证码
export function getCodeImg(data) {
  return request({
    url: '/captcha.jpg?uuid=' + data,
    method: 'get',
    baseURL: baseURL.user,
  })
}

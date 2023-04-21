import request from '@/utils/request'
import qs from 'qs'
import baseURL from '@/utils/baseUrl';

const characterService = {}
let base_url = baseURL.user
// 查询离岗用户列表
characterService.listUsersWithoutCharacter = params => request({
  url: 'character/userNoOrgan/list',
  method: 'get',
  params: {
    page: params.page - 1,
    pageSize: params.pageSize,
    userId: params.userId,
    nickName: params.nickName,
    loginPhone: params.loginPhone
  },
  baseURL: base_url,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded"
  }
})

characterService.query = function(param) {
  return request.get(
      '/character/userchart/list',
      {
        params: param,
        baseURL: base_url,
      }
  );
};

characterService.saveCharacter = function(params) {
  return request({
    url: "character/insert",
    baseURL: baseURL.user,
    method: "post",
    data: params,
  });
}

characterService.updateCharacter = function(params) {
  return request({
    url: "character/update",
    baseURL: base_url,
    method: "post",
    data: params,
    headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8'
    }
  });
}
characterService.updateCharacterOrg = function(params) {
  return request({
    url: "character/updateOrg",
    baseURL: base_url,
    method: "post",
    data: params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}

characterService.characterPermitinfo = function(params) {
  return request({
    url:'character/permitinfo',
    baseURL: base_url,
    method: 'get',
    params: params
  })
}

characterService.lockChart = function(params, lock) {
  var url = "";
  if (!lock) {
    url = "character/unLockChart";
  } else {
    url = "character/lockChart";
  }
  
  return request({
    url: url,
    method: "post",
    baseURL: base_url,
    data: qs.stringify(params),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
}
characterService. getCharacterMyList = function(params) {
  return request({
    url:'character/list',
    baseURL: base_url,
    method: 'get',
    params:params
  })
}

characterService.delete = function(param) {
  return request.post(
      '/character/delete',
      qs.stringify(param),
      {
        headers: baseURL.formheader,
        baseURL: base_url,
      }
  )
};

export default characterService

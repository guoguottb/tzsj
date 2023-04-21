import request from '@/utils/request'

// 验证码校验
export const verifyCodeApi = (data) => {
  return request({
    method: 'POST',
    url: '/social/assistanceWeixin/verifyCode',
    data,
  })
}

// 图片上传接口
export const fileUploadApi = (data) => {
  return request({
    method: 'POST',
    url: '/social/weixinMinios/fileUpload',
    data,
  })
}

//图片回显
export const viewImgApi = (url) => {
  return request({
    method: 'POST',
    url,
    data:{}
  })
}

///social/weixinMinios/show?filename=
export const getImgApi = (url) => {
  return request({
    method: 'POST',
    url: '/social/weixinMinios/show?filename=' + url,
    // data: {},
  })
}

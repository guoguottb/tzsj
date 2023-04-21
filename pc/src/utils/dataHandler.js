/**
 *@author Sean
 */
import store from '@/store'
import {findDictsApi,getBtnForAjaxApi} from '@/api/dict/dict'
/**
 * @param {要复制的JS对象或数组} srcObj
 * @description 必须是 对象或数据 如果出传入格式错误返回 undefined
 */
export function deepCloneObj (srcObj) {
  return typeof srcObj === 'object'
    ? JSON.parse(JSON.stringify(srcObj))
    : undefined
}

/**
 * @param 父元素的className
 * @description
 * 定时器函数 用来修改指定的input框宽度
 */
export function editInputWidth (
  className = 'form-cls',
  width = '250',
  timeOut = 100
) {
  setTimeout(() => {
    let inputList = document.querySelectorAll(`.${className} input`)
    inputList.forEach(item => {
      item.style.width = width + 'px'
    })
  }, timeOut)
}

/**
 * @param {要查询的字典项的 字典Code数组} dictList
 * @param {接收字典项的对象} tarObj
 * @global 全局函数 this.$findDicts([],{})
 * @description
 * 批量获取 指定字典 字典项的公共函数
 * dictList 中的获取字典的dictCode,在要tarObj 中定义该属性,否则vue dom 会监听不到
 * let tarObj ={REGION_LEVEL: []}
 * this.$findDicts(['REGION_LEVEL'] ,tarObj)
 * 可以参考 person.vue
 */
export function findDicts (dictList = [], tarObj = {}) {
  if (!Array.isArray(dictList) || !dictList.length || !tarObj) {
    return undefined
  }
  // store 有值的从store取值没有的再通过ajax取值
  let params = dictList.filter(item => {
      const dicts = store.state.dict.dictMap.get(item)
      if (dicts) {
        tarObj[item] = dicts
      } else {
        return item
      }
    })
    .join()

  if (!params) {
    return
  }
  
  findDictsApi(params).then(({ data }) => {
      if (data) {
        for (let key in data) {
          if (data.hasOwnProperty(key)) {
            tarObj[key] = data[key]
          }
        }
      } else {
        console.error('没有查询到指定的字典')
      }
    })
    .catch(error => {
      console.error(error)
    })
}

/**
 * @param {要查询的字典列表} dictList
 * @version 1.0 初版 待优化
 * @global 全局皆可调用 this.$getDictsBySync([])
 * @description
 * 同步方式获取 指定字典的字典项列表
 * 然后放到store中缓存
 */
export async function getDictsBySync (dictList = []) {
  if (!Array.isArray(dictList) || !dictList.length) {
    return undefined
  }
  // store 有值的从store取值没有的再通过ajax取值
  let dataList = {}
  let params = dictList
    .filter(item => {
      const dicts = store.state.dict.dictMap.get(item)
      if (dicts) {
        dataList[item] = dicts
      } else {
        return item
      }
    })
    .join()

  if (!params) {
    return dataList
  }
  let data =await findDictsApi(params)
  if (data.data.status !== 0) {
    return {}
  }
  let dictsObj = data.data.data
  for (const key in dictsObj) {
    if (dictsObj.hasOwnProperty(key)) {
      store.commit('dict/pushUpdateMap', {
        dictCode: key,
        dictItems: dictsObj[key]
      })
      dataList[key] = dictsObj[key]
    }
  }

  return dataList
}

/**
 * @param {要查询权限的路径} authUri
 * @param {权限存放对象} tarObj
 * @description
 * 按钮权限设置
 */
/** 按钮权限设置相关函数 start */
export function permitBtnAuth (authUri, tarObj) {
  if (!authUri || typeof tarObj !== 'object') {
    console.error(`第一个authUri stirng不能为空,tarObj必须为Object`)
    return undefined
  }
  let authCheck = store.state.auth.grantBtns.get(authUri)
  tarObj[authUri] = authCheck
  if (authCheck === undefined) {
    getBtnForAjax(authUri, tarObj)
  }
}

function getBtnForAjax (authUri, tarObj) {
    getBtnForAjaxApi(authUri,tarObj).then((data) => {
      if (data.status === 0) {
        store.commit('auth/pushGrantBtnItem', {
          authUri: authUri,
          flag: data.data
        })
         authUri.permit= data.data;
        tarObj[authUri];
      }
    })
    .catch(error => {
      console.error(error)
    })
}
/** 按钮权限设置相关函数 end */

import Vue from 'vue'
import Vuex from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
import common from './modules/common'
import user from './modules/user'
import dict from './modules/dict'
import auth from './modules/auth'
import socialWorkStation from '@/store/socialWorkStation'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    platform: '',
    includeRouters: [],
    cancelTokenArr: [],
  },
  modules: {
    common,
    user,
    dict,
    auth,
    socialWorkStation, // 社工站模块
  },
  mutations: {
    // 重置vuex本地储存状态
    resetStore(state) {
      Object.keys(state).forEach((key) => {
        state[key] = cloneDeep(window.SITE_CONFIG['storeState'][key])
      })
    },
    addCancelToken(state, cancel) {
      if (!state.cancelTokenArr) {
        state.cancelTokenArr = []
      }
      if (cancel) {
        state.cancelTokenArr.push(cancel)
      }
    },
    // 取消所有请求
    clearCancelToken(state) {
      state.cancelTokenArr.forEach((c) => {
        if (c) {
          c()
        }
      })
      state.cancelTokenArr = []
    },
  },
  strict: process.env.NODE_ENV !== 'production',
})

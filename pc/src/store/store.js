import Vue from 'vue'
import Vuex from 'vuex'
import cookie from 'cookie'
import $ from 'jquery'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    globalTheme: cookie.parse(document.cookie).globalTheme || 'ele', // ele, kus, red, orange
  },
  mutations: {
    SET_THEME(state, b) {
      state.theme = b
    },
    SET_GLOBAL_THEME(state, globalTheme) {
      state.globalTheme = globalTheme
      document.cookie = 'globalTheme=' + globalTheme
      $('#body')[0].className = globalTheme
    },
  },
  actions: {},
})

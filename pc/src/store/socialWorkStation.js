// 社工站模块
export default {
  namespaced: true,
  state: {
    socialWorkStationList: '',
  },
  actions: {
    // 社工站列表
    setSocialWorkList(context, payload) {
      context.commit('SET_SOCIAL_WORK_LIST', payload)
    },
  },
  mutations: {
    // 社工站列表
    SET_SOCIAL_WORK_LIST(state, payload) {
      state.socialWorkStationList = payload
    },
  },
}

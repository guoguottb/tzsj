export default {
  namespaced: true,
  state: {
    grantBtns: new Map(),
    grantUri: []
  },
  mutations: {
    updateGrantBtns (state, grantBtns) {
      state.grantBtns = grantBtns
    },
    pushGrantBtnItem (state, authObj) {
      state.grantBtns.set(authObj.authUri, authObj.flag)
    }
  }
}

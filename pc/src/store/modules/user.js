export default {
  namespaced: true,
  state: {
    id: 0,
    name: '',
    charId: '',
    userName: '',
    charName: '',
    userLoginId: '',
    userSex: ''
  },
  mutations: {
    updateUserSex (state, sex) {
      state.userSex = sex
    },
    updateId (state, id) {
      state.id = id
    },
    updateName (state, name) {
      state.name = name
    },
    updateCharId (state, id) {
      state.charId = id
    },
    updateUserName (state, name) {
      state.userName = name
    },
    updateCharName (state, name) {
      state.charName = name
    },
    updateUserLoginId (state, name) {
      state.userLoginId = name
    }
  }
}

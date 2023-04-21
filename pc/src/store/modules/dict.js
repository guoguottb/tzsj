export default {
  namespaced: true,
  state: {
    dictCode: '',
    dicts: {},
    showItem: '',
    dictItems: {},
    dictMap: new Map(),
  },
  mutations: {
    updateShowItem(state, showItem) {
      state.showItem = showItem
    },
    updateDictCode(state, dictCode) {
      state.dictCode = dictCode
    },
    updateDictItems(state, dictItems) {
      state.dictItems = dictItems
    },
    updateDicts(state, dicts) {
      state.dicts = dicts
    },
    updateDictMap(state, dictMap) {
      state.dictMap = dictMap
    },
    pushUpdateMap(state, dictObj) {
      state.dictMap.set(dictObj.dictCode, dictObj.dictItems)
    },
  },
}

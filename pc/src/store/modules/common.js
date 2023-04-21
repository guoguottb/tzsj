export default {
  namespaced: true,
  state: {
    // 页面文档可视高度(随窗口改变大小)
    documentClientHeight: 0,
    // 导航条, 布局风格, defalut(默认) / inverse(反向)
    navbarLayoutType: 'default',
    // 侧边栏, 布局皮肤, light(浅色) / dark(黑色)
    sidebarLayoutSkin: 'dark',
    // 侧边栏, 折叠状态
    sidebarFold: false,
    // 组织的studId
    struId: '',
    selectOrganName: '',
    selectOrganId: '',
    loginOrganId: '',
    //  编辑人员id
    editUserId: '',
    userUcUid: '',
    userChartId: '',
    // 侧边栏, 菜单
    menuList: [],
    topMenu: [],
    menuActiveName: '',
    // 主入口标签页
    mainTabs: [],
    mainTabsActiveName: '',
    orgTreeList: [],
    // main-navbar的高度
    mainNavbarHeight: 0,
    // main-menu的高度
    mainMenuHeight: 0,
    // 左侧菜单栏的宽度
    leftSideWidth: 0,

    // 点击一级菜单，获取菜单名称
    firstMenuName: '',
    // 二级菜单index值，
    // 解决点击一级菜单，再点击二级菜单。 切换一级菜单， 这时新的二级菜单选中的上一个的顺序位置上的二级菜单问题。
    secondMenuIndex: -1,
    // 登录岗位的organId
    organId: ''
  },
  mutations: {
    updateOrgTreeList (state, name) {
      state.orgTreeList = name
    },
    updateStruId (state, name) {
      state.struId = name
    },
    updateSelectOrganName (state, name) {
      state.selectOrganName = name
    },
    updateSelectOrganId (state, name) {
      state.selectOrganId = name
    },
    updateLoginOrganId (state, name) {
      state.loginOrganId = name
    },
    updateEditUserId (state, name) {
      state.editUserId = name
    },
    updateUserUcUid (state, name) {
      state.userUcUid = name
    },
    updateUserChartId (state, name) {
      state.userChartId = name
    },
    updateDocumentClientHeight (state, height) {
      state.documentClientHeight = height
    },
    updateNavbarLayoutType (state, type) {
      state.navbarLayoutType = type
    },
    updateSidebarLayoutSkin (state, skin) {
      state.sidebarLayoutSkin = skin
    },
    updateSidebarFold (state, fold) {
      state.sidebarFold = fold
    },
    updateMenuList (state, list) {
      state.menuList = list
    },
    updateMenuActiveName (state, name) {
      state.menuActiveName = name
    },
    updateMainTabs (state, tabs) {
      state.mainTabs = tabs
    },
    updateNavbarActiveName (state, name) {
      state.navbarActiveName = name
    },
    updateMainTabsActiveName (state, name) {
      state.mainTabsActiveName = name
    },
    updateTopMenu (state, name) {
      state.topMenu = name
    },
    updateMainNavbarHeight (state, height) {
      state.mainNavbarHeight = height
    },
    updateMainMenuHeight (state, height) {
      state.mainMenuHeight = height
    },
    updateLeftSideWidth (state, width) {
      state.leftSideWidth = width
    },
    updateFirstMenuName (state, name) {
      state.firstMenuName = name
    },
    updateSecondMenuIndex (state, name) {
      state.secondMenuIndex = name
    },
    updateOrganId (state, name) {
      state.organId = name
    }
  }
}

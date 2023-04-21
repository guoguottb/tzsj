import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    children: [],
    component: Home,
    meta: {
      title: '首页',
    },
  },
  {
    path: '/Home2',
    name: 'Home2',
    component: () => import('../views/Home2.vue'),
    meta: {
      title: '入口',
      requireAuth: true, //判断是否需要登录
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      title: '登录',
    },
  },
  // socialWorkStaffScore
  {
    path: '/SocialWorkEvaluate',
    name: 'SocialWorkEvaluate',
    component: () => import('../views/SocialWorkStation/SocialWorkEvaluate'),
    meta: {
      title: '社工站走访人员评分',
    },
  },
  {
    path: '/SelfCareAssessmentLogin',
    name: 'SelfCareAssessmentLogin',
    component: () =>
      import(
        '../views/helpApply/SelfCareAssessment/SelfCareAssessmentLogin.vue'
      ),
    meta: {
      title: '登录',
    },
  },
  // {
  //   path: '/123',
  //   name: '123',
  //   component: () => import('../views/123.vue'),
  //   meta: {
  //     title: '123',
  //   },
  // },
  {
    path: '/helpApply',
    name: 'HelpApply',
    component: () => import('../views/helpApply/HelpApply.vue'),
    meta: {
      title: '求助申请',
    },
  },
  {
    path: '/apply',
    name: 'Apply',
    component: () => import('../views/helpApply/Apply.vue'),
    meta: {
      title: '求助申请',
    },
  },
  {
    path: '/workNode',
    name: 'workNode',
    component: () => import('../views/helpApply/workNode.vue'),
    meta: {
      title: '进度查询',
    },
  },
  {
    path: '/complaints',
    name: 'complaints',
    component: () => import('../views/helpApply/complaints.vue'),
    meta: {
      title: '投诉建议',
    },
  },
  {
    path: '/inspect',
    name: 'Inspect',
    component: () => import('../views/helpApply/Inspect.vue'),
    meta: {
      title: '求助申请',
      requireAuth: true, //判断是否需要登录
    },
  },
  {
    path: '/inspectTwo',
    name: 'InspectTwo',
    component: () => import('../views/helpApply/InspectTwo.vue'),
    meta: {
      title: '求助申请',
    },
  },
  {
    path: '/inspectClass',
    name: 'inspectClass',
    component: () => import('@/views/helpApply/inspect/inspectClass'),
    meta: {
      title: '核查分类',
    },
  },
  {
    path: '/inspectClass/ChildrenDistress',
    name: 'ChildrenDistress',
    component: () =>
      import('@/views/helpApply/inspect/ChildrenDistress/index.vue'),
    meta: {
      title: '困境儿童上门核查',
    },
  },
  // 残疾人上门核查
  {
    path: '/inspectClass/theDisabled',
    name: 'theDisabled',
    component: () => import('@/views/helpApply/inspect/theDisabled/index.vue'),
    meta: {
      title: '残疾人上门核查',
    },
  },
  // 困境儿童上门核查列表页
  {
    path: '/inspectClass/MassInspectionList',
    name: 'MassInspectionList',
    component: () =>
      import(
        '@/views/helpApply/inspect/ChildrenDistress/MassInspectionList.vue'
      ),
    meta: {
      title: '困境儿童上门核查列表页',
    },
  },
  // 困境儿童上门核查填表页面
  {
    path: '/inspectClass/inspectInfo',
    name: 'inspectInfo',
    component: () =>
      import('@/views/helpApply/inspect/ChildrenDistress/inspectInfo.vue'),
    meta: {
      title: '填表页',
    },
  },
  // 社工站 救助复查
  {
    path: '/reexaminationList',
    name: 'reexaminationList',
    component: () =>
      import('@/views/helpApply/socialReexamination/reexaminationList.vue'),
    meta: {
      title: '救助复查',
    },
  },
  {
    path: '/WorkOrderDetails',
    name: 'WorkOrderDetails',
    component: () =>
      import('@/views/helpApply/socialReexamination/WorkOrderDetails.vue'),
    meta: {
      title: '工单详情',
    },
  },
  // 上门核查残疾人列表信息
  {
    path: '/inspectClass/disabledList',
    name: 'disabledList',
    component: () =>
      import('@/views/helpApply/inspect/theDisabled/disabledList.vue'),
    meta: {
      title: '残疾人上门核查列表页',
    },
  },
  // 上门核查残疾人 残疾人信息核查页面
  {
    path: '/inspectClass/userInfoAccept',
    name: 'disabledListUserInfoAccept',
    component: () =>
      import('@/views/helpApply/inspect/theDisabled/userInfoAccept.vue'),
    meta: {
      title: '信息核查',
    },
  },
  // 住房救助
  {
    path: '/zfjz',
    name: 'Zfjz',
    component: () => import('../views/helpApply/zfjz/Zfjz.vue'),
    meta: {
      title: '住房救助',
      requireAuth: true, //判断是否需要登录
    },
  },
  {
    path: '/zjbt',
    name: 'Zjbt',
    component: () => import('../views/helpApply/zfjz/Zjbt.vue'),
    meta: {
      title: '租金补贴',
    },
  },
  {
    path: '/zlzf',
    name: 'Zlzf',
    component: () => import('../views/helpApply/zfjz/Zlzf.vue'),
    meta: {
      title: '租赁住房',
    },
  },
  {
    path: '/inspectTwo',
    name: 'InspectTwo',
    component: () => import('../views/helpApply/InspectTwo.vue'),
    meta: {
      title: '求助申请',
    },
  },
  {
    path: '/inspectQtbm',
    name: 'InspectQtbm',
    component: () => import('../views/helpApply/InspectQtbm.vue'),
    meta: {
      title: '求助申请',
    },
  },
  {
    path: '/policiesCalculator',
    name: 'PoliciesCalculator',
    component: () => import('../views/helpApply/PoliciesCalculator.vue'),
    meta: {
      title: '政策计算器',
    },
  },
  {
    path: '/flyzApply',
    name: 'FlyzApply',
    component: () => import('../views/helpApply/flyz/FlyzApply.vue'),
    meta: {
      title: '法律援助申请',
    },
  },
  {
    path: '/flyzList',
    name: 'FlyzList',
    component: () => import('../views/helpApply/flyz/FlyzList.vue'),
    meta: {
      title: '法律援助',
    },
  },
  {
    path: '/flyzHc',
    name: 'FlyzHc',
    component: () => import('../views/helpApply/flyz/FlyzHc.vue'),
    meta: {
      title: '法律援助',
    },
  },
  {
    path: '/ylApply',
    name: 'YlApply',
    component: () => import('../views/helpApply/yl/YlApply.vue'),
    meta: {
      title: '医疗救助',
    },
  },
  {
    path: '/hhApply',
    name: 'HhApply',
    component: () => import('../views/helpApply/hh/HhApply.vue'),
    meta: {
      title: '医疗救助',
    },
  },
  {
    path: '/csApply',
    name: 'CsApply',
    component: () => import('../views/helpApply/cs/CsApply.vue'),
    meta: {
      title: '慈善救助',
    },
  },
  {
    path: '/qtApply',
    name: 'QtApply',
    component: () => import('../views/helpApply/qt/QtApply.vue'),
    meta: {
      title: '教育救助',
    },
  },
  {
    path: '/zcxknhc',
    name: 'Zcxknhc',
    component: () => import('../views/helpApply/zcxkn/Zcxknhc.vue'),
    meta: {
      title: '支出型困难家庭核查',
      requireAuth: true, //判断是否需要登录
    },
  },
  {
    path: '/zcxknjz',
    name: 'Zcxknjz',
    component: () => import('../views/helpApply/zcxkn/Zcxknjz.vue'),
    meta: {
      title: '支出型困难家庭核查',
    },
  },
  {
    path: '/tkhc',
    name: 'Tkhc',
    component: () => import('../views/helpApply/tk/Tkhc.vue'),
    meta: {
      title: '特困核查',
      requireAuth: true, //判断是否需要登录
    },
  },
  {
    path: '/tkjz',
    name: 'Tkjz',
    component: () => import('../views/helpApply/tk/Tkjz.vue'),
    meta: {
      title: '特困核查',
    },
  },
  {
    path: '/dsrhc',
    name: 'Dsrhc',
    component: () => import('../views/helpApply/dsr/Dsrhc.vue'),
    meta: {
      title: '低保边缘家庭核查',
      requireAuth: true, //判断是否需要登录
    },
  },
  {
    path: '/dsrjz',
    name: 'Dsrjz',
    component: () => import('../views/helpApply/dsr/Dsrjz.vue'),
    meta: {
      title: '低保边缘家庭核查',
    },
  },
  {
    path: '/lshc',
    name: 'Lshc',
    component: () => import('../views/helpApply/ls/Lshc.vue'),
    meta: {
      title: '临时救助核查',
      requireAuth: true, //判断是否需要登录
    },
  },
  {
    path: '/lsjz',
    name: 'Lsjz',
    component: () => import('../views/helpApply/ls/Lsjz.vue'),
    meta: {
      title: '临时救助核查',
    },
  },
  {
    path: '/dbhc',
    name: 'Dbhc',
    component: () => import('../views/helpApply/db/Dbhc.vue'),
    meta: {
      title: '低保核查',
      requireAuth: true, //判断是否需要登录
    },
  },

  {
    path: '/dbjz',
    name: 'Dbjz',
    component: () => import('../views/helpApply/db/Dbjz.vue'),
    meta: {
      title: '低保核查',
    },
  },
  {
    path: '/cjrhc',
    name: 'Cjrhc',
    component: () => import('../views/helpApply/cjr/Cjrhc.vue'),
    meta: {
      title: '残疾人核查',
      requireAuth: true, //判断是否需要登录
    },
  },
  {
    path: '/cjrjz',
    name: 'Cjrjz',
    component: () => import('../views/helpApply/cjr/Cjrjz.vue'),
    meta: {
      title: '残疾人核查',
    },
  },
  {
    path: '/helpBulletinBoard',
    name: 'helpBulletinBoard',
    component: () =>
      import('@/views/helpApply/helpBulletinBoard/helpBulletinBoard'),
    meta: {
      title: '救助信息查询',
    },
  },
  {
    path: '/InformationSuccour',
    name: 'InformationSuccour',
    component: () =>
      import('@/views/helpApply/helpBulletinBoard/InformationSuccour'),
    meta: {
      title: '救助信息',
    },
  },
  {
    path: '/kjethc',
    name: 'Kjethc',
    component: () => import('../views/helpApply/kjet/Kjethc.vue'),
    meta: {
      title: '困境儿童核查',
      requireAuth: true, //判断是否需要登录
    },
  },
  {
    path: '/kjetjz',
    name: 'Kjetjz',
    component: () => import('../views/helpApply/kjet/Kjetjz.vue'),
    meta: {
      title: '困境儿童核查',
    },
  },
  {
    path: '/etpgList',
    name: 'etpgList',
    component: () => import('../views/helpApply/kjet/etpgList.vue'),
    meta: {
      title: '风险评估儿童列表',
    },
  },

  {
    path: '/SelfCareAssessmentList',
    name: 'SelfCareAssessmentList',
    component: () =>
      import('@/views/helpApply/SelfCareAssessment/SelfCareAssessmentList'),
    meta: {
      title: '特困自理能力评估',
    },
  },
  {
    path: '/kjetfxpg',
    name: 'kjetfxpg',
    component: () => import('../views/helpApply/kjet/kjetfxpg.vue'),
    meta: {
      title: '困境儿童风险评估',
    },
  },
  {
    path: '/zljhc',
    name: 'Zljhc',
    component: () => import('../views/helpApply/zlj/Zljhc.vue'),
    meta: {
      title: '尊老金核查',
      requireAuth: true, //判断是否需要登录
    },
  },
  {
    path: '/zljjz',
    name: 'Zljjz',
    component: () => import('../views/helpApply/zlj/Zljjz.vue'),
    meta: {
      title: '尊老金核查',
    },
  },
  {
    path: '/zdsnhc',
    name: 'Zdsnhc',
    component: () => import('../views/helpApply/zdsn/Zdsnhc.vue'),
    meta: {
      title: '重度失能核查',
      requireAuth: true, //判断是否需要登录
    },
  },
  {
    path: '/zdsnjz',
    name: 'Zdsnjz',
    component: () => import('../views/helpApply/zdsn/Zdsnjz.vue'),
    meta: {
      title: '重度失能核查',
    },
  },
  {
    path: '/zfhc',
    name: 'Zfhc',
    component: () => import('../views/helpApply/zf/Zfhc.vue'),
    meta: {
      title: '定期走访',
      requireAuth: true, //判断是否需要登录
    },
  },
  {
    path: '/dqzf',
    name: 'Dqzf',
    component: () => import('../views/helpApply/zf/Dqzf.vue'),
    meta: {
      title: '定期走访',
    },
  },
  {
    path: '/SelfCareAssessmentTable',
    name: 'SelfCareAssessmentTable',
    component: () =>
      import(
        '../views/helpApply/SelfCareAssessment/SelfCareAssessmentTable.vue'
      ),
    meta: {
      title: '特困自理能力评估表',
      requireAuth: true, //判断是否需要登录
    },
  },
  {
    path: '/helpList',
    name: 'HelpList',
    component: () => import('../views/helpList/HelpList.vue'),
    meta: {
      title: '助人积分榜',
    },
  },
  {
    path: '/participation',
    name: 'Participation',
    component: () => import('../views/participation/Participation.vue'),
    meta: {
      title: '我要参与',
    },
  },
  {
    path: '/policySolutions',
    name: 'PolicySolutions',
    component: () => import('../views/policySolutions/PolicySolutions.vue'),
    meta: {
      title: '政策解答',
    },
  },
  {
    path: '/projectReleased',
    name: 'ProjectReleased',
    component: () => import('../views/projectReleased/ProjectReleased.vue'),
    meta: {
      title: '我来助',
    },
  },
  {
    path: '/helpLook',
    name: 'helpLook',
    component: () => import('../views/projectReleased/helpLook.vue'),
    meta: {
      title: '我来助查看',
    },
  },
  {
    path: '/helpClaim',
    name: 'helpClaim',
    component: () => import('../views/projectReleased/helpClaim.vue'),
    meta: {
      title: '我来助认领',
    },
  },
  {
    path: '/talk',
    name: 'Talk',
    component: () => import('../views/talk/Talk.vue'),
    meta: {
      title: '我有话说',
    },
  },
  {
    path: '/policyMessage',
    name: 'PolicyMessage',
    component: () => import('../views/policySolutions/PolicyMessage.vue'),
    meta: {
      title: '政策解答',
    },
  },
  {
    path: '/ProjectApply',
    name: 'ProjectApply',
    component: () => import('../views/projectReleased/ProjectApply.vue'),
    meta: {
      title: '慈善项目',
    },
  },
  {
    path: '/ProjectMessage',
    name: 'ProjectMessage',
    component: () => import('../views/projectReleased/ProjectMessage.vue'),
    meta: {
      title: '慈善项目',
    },
  },
  {
    path: '/policySearch',
    name: 'policySearch',
    component: () => import('../views/policy/policySearch.vue'),
    meta: {
      title: '政策查询',
    },
  },
  {
    path: '/policyDetail',
    name: 'policyDetail',
    component: () => import('../views/policy/policyDetail.vue'),
    meta: {
      title: '政策详情',
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  // mode: 'hash',
  base: process.env.BASE_URL,
  // base: 'testPhone',
  routes,
})

//路由判断登录 根据路由配置文件的参数
// 暂时关闭
router.beforeEach((to, from, next) => {
  // 改title是Home的按钮名
  if (to.meta.title) {
    document.title = to.meta.title
  }

  if (
    to.matched.some((record) => record.meta.requireAuth) &&
    to.query.module != '社会群众入口'
  ) {
    // //判断该路由是否需要登录权限

    // console.log('需要登录')

    // // if(to.meta.title!='特困自理能力评估'){
    // console.log(sessionStorage.token, 'token')

    if (sessionStorage.token) {
      //判断当前的token是否存在 ； 登录存入的token
      next()
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath,
        }, //将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})

// 重复点击这个路由就出现报错解决
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

export default router

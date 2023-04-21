import Vue from 'vue'
import Router from 'vue-router'
import requestConst from '@/utils/request-const'
import {
	isURL
} from '@/utils/validator'
import {
	clearLoginInfo
} from '@/utils'
Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}
/*const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}*/
import {
	getMenuList
} from '../api/common'

/* Layout */
import Layout from '@/views/common/Home.vue'
// 开发环境不使用懒加载, 因为懒加载页面太多的话会造成webpack热更新太慢, 所以只有生产环境使用懒加载
const _import = require('./import-' + process.env.NODE_ENV)
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */
// 全局路由(无需嵌套上左右整体布局)
const globalRoutes = [{
		path: '/404',
		component: _import('typical/error/404'),
		name: '404',
		meta: {
			title: '404未找到'
		}
	},

	{
		path: '/login',
		component: _import('login'),
		name: 'login',
		meta: {
			title: '登录'
		}
	},
	{
		path: '/Home2',
		component: _import('Home2'),
		name: 'Home2',
		meta: {
			title: '首页'
		}
	},
	{
		path: '/Home3',
		component: _import('Home3'),
		name: 'Home3',
		meta: {
			title: '政策数据库'
		}
	},
	{
		path: '/chooseChar',
		component: _import('chooseChar'),
		name: 'chooseChar',
		meta: {
			title: '选择岗位'
		}
	}
]
// 主入口路由(需嵌套上左右整体布局)
const mainRoutes = {
	path: '/',
	// component: () => import('../views/common/Home.vue'),
	component: Layout,
	name: 'main',
	redirect: {
		name: 'login'
	},
	meta: {
		title: '首页'
	},
	children: [
		// 通过meta对象设置路由展示方式
		// 1. isTab: 是否通过tab展示内容, true: 是, false: 否
		// 2. iframeUrl: 是否通过iframe嵌套展示内容, '以http[s]://开头': 是, '': 否
		// 提示: 如需要通过iframe嵌套展示内容, 但不通过tab打开, 请自行创建组件使用iframe处理!
		{
			path: '/home',
			name: 'home',
			component: _import('modules/demo/home'),
			meta: {
				title: '首页',
				icon: 'dashboard'
			}
		}, {
			path: '/ceshi',
			component: _import('modules/assistance/ceshi/ceshi'),
			name: 'ceshi',
			meta: {
				title: '测试'
			},
			children: []
		},
		{
			path: '/tycx',
			component: _import('modules/assistance/tycx/tycx'),
			name: 'tycx',
			meta: {
				title: '统一查询'
			},
			children: []
		},
		{
			path: '/zcsjk',
			component: _import('modules/assistance/zcsjk/zcsjk'),
			name: 'zcsjk',
			meta: {
				title: '政策数据库'
			},
			children: []
		},
		{
			path: '/xzApply',
			component: _import('modules/assistance/xzApply/xzApply'),
			name: 'xzApply',
			meta: {
				title: '协助申请'
			},
			children: []
		},
		{
			path: '/spgc',
			component: _import('modules/assistance/jg/spgc'),
			name: 'spgc',
			meta: {
				title: '审批过程监管'
			},
			children: []
		},
		{
			path: '/xxgk',
			component: _import('modules/assistance/jg/xxgk'),
			name: 'xxgk',
			meta: {
				title: '信息公开监管'
			},
			children: []
		},
		{
			path: '/social/assistance/confirmReliefdistList',
			component: _import('modules/assistance/confirmReliefdistList'),
			name: 'confirmReliefdistList',
			meta: {
				title: '查看资金确认信息'
			},
			children: []
		},
		{
			path: '/tiaozhuan',
			// path: 'assistance/salvation2?泰州市姜堰区社会救助综合平台&modelId=432',
			component: _import('modules/assistance/tiaozhuan/tiaozhuan'),
			name: 'tiaozhuan',
			meta: {
				title: '跳转'
			},
			children: []
		}, {
			path: '/page1',
			component: _import('modules/assistance/ceshi/Page1'),
			name: 'page1',
			meta: {
				title: 'Excel上传'
			},
			children: []
		},  {
			path: '/tsyj',
			component: _import('modules/assistance/tsyj/tsyj'),
			name: 'tsyj',
			meta: {
				
				title: '投诉预警', 
				
			},
			children: []
		},{
			path: '/yclpt',
			component: _import('modules/assistance/sjpt/yclpt'),
			name: 'yclpt',
			meta: {
				
				title: '预处理平台', 
				
			},
			children: []
		},{
			path: '/yjtjsz',
			component: _import('modules/assistance/sjpt/yjtjsz'),
			name: 'yjtjsz',
			meta: {
				title: '大数据预警条件设置', 
			},
			children: []
		},{
			path: '/gxpt',
			component: _import('modules/assistance/sjpt/gxpt'),
			name: 'gxpt',
			meta: {
				
				title: '数据共享平台', 
				
			},
			children: []
		},
		{
			path: '/hdbg',
			component: _import('modules/assistance/sjcyyj/hdbg'),
			name: 'hdbg',
			meta: {
				title: '核对报告预警', 
				
			},
			children: []
		}, {
			path: '/swyj',
			component: _import('modules/assistance/sjcyyj/swyj'),
			name: 'swyj',
			meta: {
				title: '死亡预警', 
				
			},
			children: []
		}, {
			path: '/cfyj',
			component: _import('modules/assistance/sjcyyj/cfyj'),
			name: 'cfyj',
			meta: {
				title: '重复预警', 
				
			},
			children: []
		}, {
			path: '/wzyj',
			component: _import('modules/assistance/sjcyyj/wzyj'),
			name: 'wzyj',
			meta: {
				title: '完整性预警', 
				
			},
			children: []
		}, {
			path: '/assistance/sjcyyj/wzyjbl',
			component: _import('modules/assistance/sjcyyj/wzyjbl'),
			name: 'assistance/sjcyyj/wzyjbl',
			meta: {
				title: '完整性预警补录', 
				
			},
			children: []
		},{
			path: '/qzsq',
			component: _import('modules/assistance/qzsq/qzsq'),
			name: 'qzsq',
			meta: {
				title: '群众申办',  //原群众申请
				
			},
			children: []
		}, 
		 {
			path: '/assistance/qzsq/qzsqListView',
			component: _import('modules/assistance/qzsq/qzsqListView'),
			name: 'assistance/qzsq/qzsqListView',
			meta: {
				title: '群众申办查看',
			},
			children: []
		}, {
			path: '/assistance/qzsq/addEditQzsq',
			component: _import('modules/assistance/qzsq/addEditQzsq'),
			name: 'assistance/qzsq/addEditQzsq',
			meta: {
				title: '群众申办修改',
				
			},
			children: []
		}, 
		{
			path: '/assistance/qzsq/qzsqInspect',
			component: _import('modules/assistance/qzsq/qzsqCheck'),
			name: 'assistance/qzsq/qzsqInspect',
			meta: {
				title: '群众申办上门核查',
				
			},
			children: []
		}, 
		{
			path: '/assistance/qzsq/qzsqBack',
			component: _import('modules/assistance/qzsq/qzsqListView'),
			name: 'assistance/qzsq/qzsqBack',
			meta: {
				title: '群众申办退回查看',
				
			},
			children: []
		}, 	{
			path: '/zdpc',
			component: _import('modules/assistance/zdpc/zdpc'),
			name: 'zdpc',
			meta: {
				title: '主动排查'
			},
			children: []
		},
		{
			path: '/assistance/zdpc/zdpcListView',
			component: _import('modules/assistance/qzsq/qzsqListView'),
			// component: _import('modules/assistance/zdpc/zdpcListView'),
			name: 'assistance/zdpc/zdpcListView',
			meta: {
				title: '主动排查查看'
			},
			children: []
		},
		{
			path: '/assistance/zdpc/addEditZdpc',
			component: _import('modules/assistance/qzsq/addEditQzsq'),
			// component: _import('modules/assistance/zdpc/addEditZdpc'),
			name: 'assistance/zdpc/addEditZdpc',
			meta: {
				title: '主动排查修改'
			},
			children: []
		},
		{
			path: '/assistance/zdpc/zdpcInspect',
			component: _import('modules/assistance/qzsq/qzsqCheck'),
			name: 'assistance/zdpc/zdpcInspect',
			meta: {
				title: '主动排查上门核查'
			},
			children: []
		},
		{
			path: '/assistance/zdpc/zdpcBack',
			component: _import('modules/assistance/qzsq/qzsqListView'),
			name: 'assistance/zdpc/zdpcBack',
			meta: {
				title: '主动排查退回'
			},
			children: []
		}, 
		{
			path: '/yj',
			component: _import('modules/assistance/yjts/yj'),
			name: 'yj',
			meta: {
				title: '建档立卡预警'
			},
			children: []
		},
		{
			path: '/assistance/yjts/yjtsListView',
			component: _import('modules/assistance/qzsq/qzsqListView'),
			// component: _import('modules/assistance/yjts/yjtsListView'),
			name: 'assistance/yjts/yjtsListView',
			meta: {
				title: '建档立卡预警查看'
			},
			children: []
		},
		{
			path: '/assistance/yjts/addEditYjts',
			component: _import('modules/assistance/qzsq/addEditQzsq'),
			// component: _import('modules/assistance/yjts/addEditYjts'),
			name: 'assistance/yjts/addEditYjts',
			meta: {
				title: '建档立卡预警修改'
			},
			children: []
		},
		{
			path: '/assistance/yjts/yjtsInspect',
			component: _import('modules/assistance/qzsq/qzsqCheck'),
			name: 'assistance/yjts/yjtsInspect',
			meta: {
				title: '建档立卡预警上门核查'
			},
			children: []
		},
		{
			path: '/assistance/yjts/yjtsBack',
			component: _import('modules/assistance/qzsq/qzsqListView'),
			name: 'assistance/yjts/yjtsBack',
			meta: {
				title: '建档立卡预警退回'
			},
			children: []
		}, 
	
		{
			path: '/ylts',
			component: _import('modules/assistance/ylts/ylts'),
			name: 'ylts',
			meta: {
				title: '医保预警'   //原医疗推送
			},
			children: []
		},
		{
			path: '/assistance/ylts/yltsListView',
			component: _import('modules/assistance/qzsq/qzsqListView'),
			// component: _import('modules/assistance/ylts/yltsListView'),
			name: 'assistance/ylts/yltsListView',
			meta: {
				title: '医保预警查看'
			},
			children: []
		},
		{
			path: '/assistance/ylts/addEditYLts',
			component: _import('modules/assistance/qzsq/addEditQzsq'),
			// component: _import('modules/assistance/ylts/addEditYLts'),
			name: 'assistance/ylts/addEditYLts',
			meta: {
				title: '医保预警修改'
			},
			children: []
		},
		{
			path: '/assistance/ylts/yltsInspect',
			component: _import('modules/assistance/qzsq/qzsqCheck'),
			name: 'assistance/ylts/yltsInspect',
			meta: {
				title: '医保预警上门核查'
			},
			children: []
		},
		{
			path: '/assistance/ylts/yltsBack',
			component: _import('modules/assistance/qzsq/qzsqListView'),
			name: 'assistance/ylts/yltsBack',
			meta: {
				title: '医保预警退回'
			},
			children: []
		},
		{
			path: '/tsw',
			name: 'tsw',
			component: _import('modules/assistance/tsw/tsw'),
			meta: {
				title: '团市委预警'
			},
			children: []

		},{
			path: '/assistance/tsw/tswListView',
			name: 'assistance/tsw/tswListView',
			component: _import('modules/assistance/qzsq/qzsqListView'),
			// component: _import('modules/assistance/tsw/tswListView'),
			meta: {
				title: '团市委预警查看'
			},
			children: []

		},{
			path: '/assistance/tsw/addEditTsw',
			name: 'assistance/tsw/addEditTsw',
			component: _import('modules/assistance/qzsq/addEditQzsq'),
			// component: _import('modules/assistance/tsw/addEditTsw'),
			meta: {
				title: '团市委预警修改'
			},
			children: []

		},{
			path: '/assistance/tsw/tswCheck',
			name: 'assistance/tsw/tswCheck',
			component: _import('modules/assistance/qzsq/qzsqCheck'),
			meta: {
				title: '团市委预警上门核查'
			},
			children: []

		},{
			path: '/assistance/tsw/tswBack',
			name: 'assistance/tsw/tswBack',
			component: _import('modules/assistance/qzsq/qzsqListView'),
			meta: {
				title: '团市委预警退回查看'
			},
			children: []
		},
		
		{
			path: '/sjyj',
			name: 'sjyj',
			component: _import('modules/assistance/sjyj/sjyj'),
			meta: {
				title: '12345涉救预警'
			},
			children: []
		},{
			path: '/assistance/sjyj/sjyjListView',
			name: 'assistance/sjyj/sjyjListView',
			component: _import('modules/assistance/qzsq/qzsqListView'),
			// component: _import('modules/assistance/sjyj/sjyjListView'),
			meta: {
				title: '12345涉救预警查看'
			},
			children: []

		},{
			path: '/assistance/sjyj/addEditSjyj',
			name: 'assistance/sjyj/addEditSjyj',
			component: _import('modules/assistance/qzsq/addEditQzsq'),
			// component: _import('modules/assistance/sjyj/addEditSjyj'),
			meta: {
				title: '12345涉救预警修改'
			},
			children: []

		},{
			path: '/assistance/sjyj/sjyjCheck',
			name: 'assistance/sjyj/sjyjCheck',
			component: _import('modules/assistance/qzsq/qzsqCheck'),
			meta: {
				title: '12345涉救预警上门核查'
			},
			children: []

		},{
			path: '/assistance/sjyj/sjyjBack',
			name: 'assistance/sjyj/sjyjBack',
			component: _import('modules/assistance/qzsq/qzsqListView'),
			meta: {
				title: '12345涉救预警退回查看'
			},
			children: []
		},
		{
			path: '/sdyj',
			name: 'sdyj',
			component: _import('modules/assistance/sdyj/sdyj'),
			meta: {
				title: '水电预警'
			},
			children: []
		},{
			path: '/assistance/sdyj/sdyjListView',
			name: 'assistance/sdyj/sdyjListView',
			component: _import('modules/assistance/qzsq/qzsqListView'),
			// component: _import('modules/assistance/sdyj/sdyjListView'),
			meta: {
				title: '水电预警查看'
			},
			children: []

		},{
			path: '/assistance/sdyj/addEditSdyj',
			name: 'assistance/sdyj/addEditSdyj',
			component: _import('modules/assistance/qzsq/addEditQzsq'),
			// component: _import('modules/assistance/sdyj/addEditSdyj'),
			meta: {
				title: '水电预警修改'
			},
			children: []

		},{
			path: '/assistance/sdyj/sdyjCheck',
			name: 'assistance/sdyj/sdyjCheck',
			component: _import('modules/assistance/qzsq/qzsqCheck'),
			meta: {
				title: '水电预警上门核查'
			},
			children: []

		},{
			path: '/assistance/sdyj/sdyjBack',
			name: 'assistance/sdyj/sdyjBack',
			component: _import('modules/assistance/qzsq/qzsqListView'),
			meta: {
				title: '水电预警退回查看'
			},
			children: []
		},{
			path: '/zfyj',
			name: 'zfyj',
			component: _import('modules/assistance/zfyj/zfyj'),
			meta: {
				title: '住房预警'
			},
			children: []
		},{
			path: '/assistance/zfyj/zfyjListView',
			name: 'assistance/zfyj/zfyjListView',
			component: _import('modules/assistance/qzsq/qzsqListView'),
			// component: _import('modules/assistance/zfyj/zfyjListView'),
			meta: {
				title: '住房预警查看'
			},
			children: []

		},{
			path: '/assistance/zfyj/addEditZfyj',
			name: 'assistance/zfyj/addEditZfyj',
			component: _import('modules/assistance/qzsq/addEditQzsq'),
			// component: _import('modules/assistance/zfyj/addEditZfyj'),
			meta: {
				title: '住房预警修改'
			},
			children: []

		},{
			path: '/assistance/zfyj/zfyjCheck',
			name: 'assistance/zfyj/zfyjCheck',
			component: _import('modules/assistance/qzsq/qzsqCheck'),
			meta: {
				title: '住房预警上门核查'
			},
			children: []

		},{
			path: '/assistance/zfyj/zfyjBack',
			name: 'assistance/zfyj/zfyjBack',
			component: _import('modules/assistance/qzsq/qzsqListView'),
			meta: {
				title: '住房预警退回查看'
			},
			children: []
		},{
			path: 'xfyj',
			name: 'xfyj',
			component: _import('modules/assistance/xfyj/xfyj'),
			meta: {
				title: '消防预警'
			},
			children: []
		},{
			path: '/assistance/xfyj/xfyjListView',
			name: 'assistance/xfyj/xfyjListView',
			component: _import('modules/assistance/qzsq/qzsqListView'),
			// component: _import('modules/assistance/xfyj/xfyjListView'),
			meta: {
				title: '消防预警查看'
			},
			children: []

		},{
			path: '/assistance/xfyj/addEditXfyj',
			name: 'assistance/xfyj/addEditXfyj',
			component: _import('modules/assistance/qzsq/addEditQzsq'),
			// component: _import('modules/assistance/xfyj/addEditXfyj'),
			meta: {
				title: '消防预警修改'
			},
			children: []

		},{
			path: '/assistance/xfyj/xfyjCheck',
			name: 'assistance/xfyj/xfyjCheck',
			component: _import('modules/assistance/qzsq/qzsqCheck'),
			meta: {
				title: '消防预警上门核查'
			},
			children: []

		},{
			path: '/assistance/xfyj/xfyjBack',
			name: 'assistance/xfyj/xfyjBack',
			component: _import('modules/assistance/qzsq/qzsqListView'),
			meta: {
				title: '消防预警退回查看'
			},
			children: []
		},{
			path: '/wjyj',
			name: 'wjyj',
			component: _import('modules/assistance/wjyj/wjyj'),
			meta: {
				title: '物价预警'
			}
		},{
			path: '/assistance/wjyj/wjyjListView',
			name: 'assistance/wjyj/wjyjListView',
			component: _import('modules/assistance/qzsq/qzsqListView'),
			// component: _import('modules/assistance/wjyj/wjyjListView'),
			meta: {
				title: '物价预警查看'
			},
			children: []

		},{
			path: '/assistance/wjyj/addEditWjyj',
			name: 'assistance/wjyj/addEditWjyj',
			component: _import('modules/assistance/qzsq/addEditQzsq'),
			// component: _import('modules/assistance/wjyj/addEditWjyj'),
			meta: {
				title: '物价预警修改'
			},
			children: []

		},{
			path: '/assistance/wjyj/wjyjCheck',
			name: 'assistance/wjyj/wjyjCheck',
			component: _import('modules/assistance/qzsq/qzsqCheck'),
			meta: {
				title: '物价预警上门核查'
			},
			children: []

		},{
			path: '/assistance/wjyj/wjyjBack',
			name: 'assistance/wjyj/wjyjBack',
			component: _import('modules/assistance/qzsq/qzsqListView'),
			meta: {
				title: '物价预警退回查看'
			},
			children: []
		},
		// 对比信息
		{
			path: '/jthdList',
			name: 'jthdList',
			component: _import('modules/assistance/jthd/jthdList'),
			meta: {
				title: '家庭核对'
			},
			children: []
		},
		 {
			path: '/assistance/jthd/hdxmview',
			name: 'assistance/jthd/hdxmview',
			component: _import('modules/assistance/jthd/hdxmview'),
			meta: {
				title: '选择核对项目'
			},
		},{
			path: '/assistance/jthd/jthdListView',
			name: 'assistance/jthd/jthdListView',
			component: _import('modules/assistance/jthd/jthdListView'),
			meta: {
				title: '家庭核对查看'
			},
		},
		{//金民同步
			path: '/tbjmList',
			name: 'tbjmList',
			component: _import('modules/assistance/tbjm/tbjmList'),
			meta: {
				title: '同步金民'
			},
			children: []
		},
		// 审批确定
		{
			path: '/tkList',
			component: _import('modules/assistance/tk/tkList'),
			name: 'tkList',
			meta: {
				title: '特困供养审批'
			},
			children: []
		}, {
			path: '/assistance/tk/tkListView',
			name: 'assistance/tk/tkListView',
			// component: _import('modules/assistance/tk/tkListView'),
			component: _import('modules/assistance/db/dbListView'),
			meta: {
				title: '特困供养查看'
			}

		},
		{
			path: '/assistance/tk/viewtk2',
			name: 'assistance/tk/viewtk2',
			// component: _import('modules/assistance/tk/tkListView'),
			component: _import('modules/assistance/db/dbListGrantEdit'),
			meta: {
				title: '特困供养发放操作'
				
			}
		},
		{
			// 特困供养在册人员、在册户数查看
			path: '/assistance/tk/viewtk',
			name: 'assistance/tk/viewtk',
			// component: _import('modules/assistance/tk/tkListView'),
			component: _import('modules/assistance/db/dbListView'),
			meta: {
				title: '特困供养在册查看'
			}
		},
		 {
			path: '/assistance/tk/addEditTeKun',
			name: 'assistance/tk/addEditTeKun',
			// component: _import('modules/assistance/tk/addEditTeKun'),
			component: _import( 'modules/assistance/db/addEditDibao'),


			meta: {
				title: '特困供养编辑'
			}
		}, {
			path: '/tkChange',
			name: 'tkChange',
			component: _import('modules/assistance/tk/tkChange'),
			meta: {
				title: '特困供养变更'
			},
			children: []
		},  {
			path: '/assistance/tk/tkListChangeEdit',
			name: 'assistance/tk/tkListChangeEdit',
			// component: _import('modules/assistance/tk/tkListChangeEdit'),
			component: _import( 'modules/assistance/db/dbListChangeEdit'),
			meta: {
				title: '特困供养变更编辑'
			}
		},{
			path: '/assistance/tk/tkListChangeView',
			name: 'assistance/tk/tkListChangeView',
			// component: _import('modules/assistance/tk/tkListChangeView'),
			component: _import('modules/assistance/db/dbListViewChange'),

			meta: {
				title: '特困供养变更查看'
			}
		}, {
			path: '/assistance/tk/tkListCancelViewZX',
			name: 'assistance/tk/tkListCancelViewZX',
			// component: _import('modules/assistance/tk/tkListCancelView'),
			component: _import('modules/assistance/db/dbListCancelView'),
			meta: {
				title: '特困供养注销申请'
			}
		},{
			path: 'tkCancel',
			component: _import('modules/assistance/tk/tkCancel'),
			name: 'tkCancel',
			meta: {
				title: '特困供养注销'
			},
			children: []
		}, {
			path: '/assistance/tk/tkListCancelView',
			name: 'assistance/tk/tkListCancelView',
			// component: _import('modules/assistance/tk/tkListCancelView'),
			component: _import('modules/assistance/db/dbListCancelView'),
			meta: {
				title: '特困供养注销查看'
			}
		}, {
			path: '/tkListGrant',
			component: _import('modules/assistance/tk/tkListGrant'),
			name: 'tkListGrant',
			meta: {
				title: '特困供养发放'
			},
			children: []
		}, {
			path: '/assistance/tk/tkListGrantSend',
			component: _import('modules/assistance/tk/tkListGrantSend'),
			name: 'assistance/tk/tkListGrantSend',
			meta: {
				title: '特困供养发放'
			}
		}, {
			path: '/tkListRecord',
			component: _import('modules/assistance/tk/tkListRecord'),
			name: 'tkListRecord',
			meta: {
				title: '特困供养发放记录'
			},
			children: []
		}, 
		{
			path: '/assistance/tk/viewtk3',
			name: 'assistance/tk/viewtk3',
			// component: _import('modules/assistance/tk/tkListView'),
			component: _import('modules/assistance/db/dbListView'),
			meta: {
				title: '特困供养发放记录查看'
			}
		},
		{
			path: '/tkSetList',
			component: _import('modules/assistance/tk/tkSetList'),
			name: 'tkSetList',
			meta: {
				title: '特困供养标准设置'
			},
			children: []
		}, 
		{
			path: '/assistance/tk/addEditTekunSet',
			name: 'assistance/tk/addEditTekunSet',
			component: _import('modules/assistance/tk/addEditTekunSet'),
			meta: {
				title: '特困供养标准编辑'
			}
		},
		{
			// 不知道哪个页面在用
			path: '/assistance/tk/tkListView2',
			name: 'assistance/tk/tkListView2',
		// 	component: _import('modules/assistance/tk/tkListView'),
			component: _import('modules/assistance/db/dbListView'),
			meta: {
				title: '特困供养查看'
			},
		},
		{
			path: '/tkListPersons',
			component: _import('modules/assistance/tk/tkListPersons'),
			name: 'tkListPersons',
			meta: {
				title: '特困供养在册人员'
			},

			children: []
		},{
			path: '/tkListHouseholds',
			component: _import('modules/assistance/tk/tkListHouseholds'),
			name: 'tkListHouseholds',
			meta: {
				title: '特困供养在册户数'
			},

			children: []
		},
		// {
		// 	path: '/assistance/tkCheck2',
		// 	name: 'assistance/tkCheck2',
		// 	component: _import('modules/assistance/check'),
		// 	meta: {
		// 		title: '核对报告'
		// 	}
		// },{
		// 	path: '/assistance/tkCheck',
		// 	name: 'assistance/tkCheck',
		// 	component: _import('modules/assistance/check'),
		// 	meta: {
		// 		title: '核对报告'
		// 	}
		// }, {
		// 	path: '/assistance/tkCheck3',
		// 	name: 'assistance/tkCheck3',
		// 	component: _import('modules/assistance/check'),
		// 	meta: {
		// 		title: '核对报告'
		// 	}
		// }, 
		{
			path: '/dbList',
			component: _import('modules/assistance/db/dbList'),
			name: 'dbList',
			meta: {
				title: '城乡低保按户保审批'
			},
			children: []
		},
		{
			path: '/dbList2',
			component: _import('modules/assistance/db/dbList2'),
			name: 'dbList2',
			meta: {
				title: '城乡低保按人保审批'
			},
			children: []
		}, {
			// 按人保、按户保
			path: '/assistance/db/dbListView',
			name: 'assistance/db/dbListView',
			component: _import('modules/assistance/db/dbListView'),
			meta: {
				title: '城乡低保查看'
			}
		}, 
		{
			path: '/assistance/db/dbListViewPerson',
			name: 'assistance/db/dbListViewPerson',
			component: _import('modules/assistance/db/dbListView'),
			meta: {
				title: '城乡低保按人保查看'
			}
		 
		}, {
			path: '/assistance/db/dbListViewHouseholds',
			name: 'assistance/db/dbListViewHouseholds',
			component: _import('modules/assistance/db/dbListView'),
			meta: {
				title: '城乡低保按户保查看'
			}
		}, {
			path: '/assistance/db/addEditDibao',
			name: 'assistance/db/addEditDibao',
			component: _import('modules/assistance/db/addEditDibao'),
			meta: {
				title: '城乡低保编辑'
			}
		}, {
			path: '/assistance/db/dbListChangeEdit',
			name: 'assistance/db/dbListChangeEdit',
			component: _import('modules/assistance/db/dbListChangeEdit'),
			meta: {
				title: '城乡低保变更编辑'
			}
		}, {
			path: '/assistance/db/dbListCancelViewZx',
			name: 'assistance/db/dbListCancelViewZx',
			component: _import('modules/assistance/db/dbListCancelView'),
			meta: {
				title: '城乡低保注销申请'
			}
		}, {
			path: '/assistance/dbCheck',
			name: 'assistance/dbCheck',
			component: _import('modules/assistance/check'),
			meta: {
				title: '城乡低保核对报告'
			}
		}, {
			path: '/dbListChange',
			component: _import('modules/assistance/db/dbListChange'),
			name: 'dbListChange',
			meta: {
				title: '城乡低保变更'
			},
			children: []
		}, {
			path: '/assistance/db/dbListViewChange',
			name: 'assistance/db/dbListViewChange',
			component: _import('modules/assistance/db/dbListViewChange'),
			meta: {
				title: '城乡低保变更查看'
			}
		}, {
			path: '/dbListCancel',
			component: _import('modules/assistance/db/dbListCancel'),
			name: 'dbListCancel',
			meta: {
				title: '城乡低保注销'
			},
			children: []
		}, {
			path: '/assistance/db/dbListCancelView',
			name: 'assistance/db/dbListCancelView',
			component: _import('modules/assistance/db/dbListCancelView'),
			meta: {
				title: '城乡低保注销查看'
			}
		},
		{
			path: '/assistance/dbCheck2',
			name: 'assistance/dbCheck2',
			component: _import('modules/assistance/check'),
			meta: {
				title: '核对报告'
			}
		},
		{
			path: '/dbSetList',
			component: _import('modules/assistance/db/dbSetList'),
			name: 'dbSetList',
			meta: {
				title: '低保标准设置'
			},
			children: []
		}, 
		{
			path: '/assistance/db/addEditDibaoSet',
			name: 'assistance/db/addEditDibaoSet',
			component: _import('modules/assistance/db/addEditDibaoSet'),
			meta: {
				title: '低保标准编辑'
			}
		},  
		 {
			path: '/dbListHouseholds',
			component: _import('modules/assistance/db/dbListHouseholds'),
			name: 'dbListHouseholds',
			meta: {
				title: '城乡低保在册户数'
			},
			children: []
		},
		 {
			path: '/assistance/db/dbListView2',
			name: 'assistance/db/dbListView2',
			component: _import('modules/assistance/db/dbListView'),
			meta: {
				title: '城乡低保在册户数查看'
			}
		}, 
		{
			path: '/dbListPersons',
			component: _import('modules/assistance/db/dbListPersons'),
			name: 'dbListPersons',
			meta: {
				title: '城乡低保在册人员'
			},
			children: []
		},
		 {
			//  城乡低保在册人员查看
			path: '/assistance/db/dbListView3',
			name: 'assistance/db/dbListView3',
			component: _import('modules/assistance/db/dbListView'),
			meta: {
				title: '城乡低保在册人员查看'
			}
		}, 
		{
			path: '/assistance/dbImportExcel',
			name: 'assistance/dbImportExcel',
			component: _import('modules/assistance/importExcel'),
			meta: {
				title: '导入excel'
			},
		}, {
			path: '/dbListGrant',
			component: _import('modules/assistance/db/dbListGrant'),
			name: 'dbListGrant',
			meta: {
				title: '城乡低保发放'
			},
			children: []
		}, {
			path: '/assistance/db/dbListGrantSend',
			component: _import('modules/assistance/db/dbListGrantSend'),
			name: 'assistance/db/dbListGrantSend',
			meta: {
				title: '城乡低保发放'
			}
		},
		{
			path: '/assistance/db/dbListView4',
			name: 'assistance/db/dbListView4',
			component: _import('modules/assistance/db/dbListView'),
			meta: {
				title: '城乡低保发放查看'
			}
		},
		 {
			path: '/dbListRecord',
			component: _import('modules/assistance/db/dbListRecord'),
			name: 'dbListRecord',
			meta: {
				title: '城乡低保发放记录'
			},
			children: []
		}, 
		{
			path: '/assistance/db/dbListView5',
			name: 'assistance/db/dbListView5',
			component: _import('modules/assistance/db/dbListView'),
			meta: {
				title: '城乡低保查看'
			}
		}, 
		{
			path: '/dsrList',
			component: _import('modules/assistance/dsr/dsrList'),
			name: 'dsrList',
			meta: {
				title: '低收入家庭审批'
			},
			children: []
		}, {
			path: '/assistance/dsr/dsrListView',
			name: 'assistance/dsr/dsrListView',
			component: _import('modules/assistance/db/dbListView'),
			// component: _import('modules/assistance/dsr/dsrListView'),
			meta: {
				title: '低收入家庭查看'
			}
		}, {
			path: '/assistance/dsr/dsrListCancelViewZX',
			name: 'assistance/dsr/dsrListCancelViewZX',
			// component: _import('modules/assistance/dsr/dsrListCancelView'),
			component: _import('modules/assistance/db/dbListCancelView'),
			meta: {
				title: '低收入家庭注销申请'
			}
		}, {
			path: '/assistance/dsr/addEditDiShouRu',
			name: 'assistance/dsr/addEditDiShouRu',
			// component: _import('modules/assistance/dsr/addEditDiShouRu'),
			component: _import('modules/assistance/db/addEditDibao'),
			meta: {
				title: '低收入家庭编辑'
			}
		}, {
			path: '/assistance/dsr/dsrListChangeEdit',
			name: 'assistance/dsr/dsrListChangeEdit',
			// component: _import('modules/assistance/dsr/dsrListChangeEdit'),
			component: _import('modules/assistance/db/dbListChangeEdit'),
			meta: {
				title: '低收入家庭变更编辑'
			}
		}, {
			path: '/assistance/dsrCheck',
			name: 'assistance/dsrCheck',
			component: _import('modules/assistance/check'),
			meta: {
				title: '核对报告'
			}
		}, {
			path: '/dsrChange',
			component: _import('modules/assistance/dsr/dsrChange'),
			name: 'dsrChange',
			meta: {
				title: '低收入家庭变更'
			},
			children: []
		}, {
			path: '/assistance/dsr/dsrListChangeView',
			name: 'assistance/dsr/dsrListChangeView',
			// component: _import('modules/assistance/dsr/dsrListChangeView'),
			component: _import('modules/assistance/db/dbListViewChange'),
			meta: {
				title: '低收入家庭变更查看'
			}
		},
		{
			path: '/assistance/dsrCheck2',
			name: 'assistance/dsrCheck2',
			component: _import('modules/assistance/check'),
			meta: {
				title: '核对报告'
			}
		}, {
			path: '/dsrCancel',
			component: _import('modules/assistance/dsr/dsrCancel'),
			name: 'dsrCancel',
			meta: {
				title: '低收入家庭注销'
			},
			children: []
		}, {
			path: '/assistance/dsr/dsrListCancelView',
			name: 'assistance/dsr/dsrListCancelView',
			// component: _import('modules/assistance/dsr/dsrListCancelView'),
			component: _import( 'modules/assistance/db/dbListCancelView'),
			meta: {
				title: '低收入家庭注销查看'
			}
		},
		{
			path: '/assistance/dsrCheck3',
			name: 'assistance/dsrCheck3',
			component: _import('modules/assistance/check'),
			meta: {
				title: '核对报告'
			}
		}, {
			path: '/dsrListHouseholds',
			component: _import('modules/assistance/dsr/dsrListHouseholds'),
			name: 'dsrListHouseholds',
			meta: {
				title: '低收入家庭在册户数'
			},
			children: []
		}, {
			path: '/assistance/dsr/dsrjtView',
			name: 'assistance/dsr/dsrjtView',
			// component: _import('modules/assistance/dsr/dsrListView'),
			component: _import('modules/assistance/db/dbListView'),
			meta: {
				title: '低收入家庭查看'
			}
		}, {
			path: '/dsrListPersons',
			component: _import('modules/assistance/dsr/dsrListPersons'),
			name: 'dsrListPersons',
			meta: {
				title: '低收入家庭在册人员'
			}
		},
		{
			path: '/dbbyList',
			component: _import('modules/assistance/dbby/dbbyList'),
			name: 'dbbyList',
			meta: {
				title: '低保边缘家庭审批'
			},
			children: []
		},{
			path: '/assistance/dbby/dbbyListView',
			// component: _import('modules/assistance/dbby/dbbyListView'),
			component: _import('modules/assistance/db/dbListView'),
			name: 'assistance/dbby/dbbyListView',
			meta: {
				title: '低保边缘家庭查看'
			},
			children: []
		},
		{
			path: '/zhchList',
			name: 'zhchList',
			component: _import('modules/assistance/zhch/zhchList'),
			meta: {
				title: '支出性困难家庭审批'
			}
		},
		{
			path: '/zhchChange',
			name: 'zhchChange',
			component: _import('modules/assistance/zhch/zhchChange'),
			component: _import('modules/assistance/zhch/zhchChange'),
			meta: {
				title: '支出性困难家庭变更'
			}
		},
		{
			path: '/assistance/zhch/zhchListChangeEidt',
			name: 'assistance/zhch/zhchListChangeEidt',
			// component: _import('modules/assistance/zhch/zhchListChangeEidt'),
			component: _import('modules/assistance/db/dbListChangeEdit'),
			meta: {
				title: '支出性困难家庭变更编辑'
			}
		},
		{
			path: '/assistance/zhch/zhchListChangeView',
			name: 'assistance/zhch/zhchListChangeEidt',
			// component: _import('modules/assistance/zhch/zhchListChangeView'),
			component: _import('modules/assistance/db/dbListViewChange'),
			meta: {
				title: '支出性困难家庭变更查看'
			}
		},
		{
			path: '/assistance/zhch/zhchCancelViewZX',
			name: 'assistance/zhch/zhchCancelViewZX',
			// component: _import('modules/assistance/zhch/zhchCancelView'),
			component: _import('modules/assistance/db/dbListCancelView'),
			meta: {
				title: '支出性困难家庭注销申请'
			}
		},
		{
			path: '/zhchCancel',
			name: 'zhchCancel',
			component: _import('modules/assistance/zhch/zhchCancel'),
			meta: {
				title: '支出性困难家庭注销'
			}
		},
		{
			path: '/assistance/zhch/zhchCancelView',
			name: 'assistance/zhch/zhchCancelView',
			// component: _import('modules/assistance/zhch/zhchCancelView'),
			component: _import('modules/assistance/db/dbListCancelView'),
			meta: {
				title: '支出性困难家庭注销查看'
			}
		},
		{
			path: '/zhchListPersons',
			component: _import('modules/assistance/zhch/zhchListPersons'),
			name: 'zhchListPersons',
			meta: {
				title: '支出性困难家庭在册人员'
			}
		},
		{
			path: '/zhchListHouseholds',
			component: _import('modules/assistance/zhch/zhchListHouseholds'),
			name: 'zhchListHouseholds',
			meta: {
				title: '支出性困难家庭在册户数'
			}
		},
		{
			path: '/assistance/zhch/addEditZhchu',
			// component: _import('modules/assistance/zhch/addEditZhchu'),
			component: _import('modules/assistance/db/addEditDibao'),
			name: 'assistance/zhch/addEditZhchu',
			meta: {
				title: '支出性困难家庭编辑'
			}
		},
		{
			path: '/assistance/zhch/zhchListView',
			// component: _import('modules/assistance/zhch/zhchListView'),
			component: _import('modules/assistance/db/dbListView'),
			name: 'assistance/zhch/zhchListView',
			meta: {
				title: '支出性困难家庭查看'
			}
		},
		{
			path: '/kjetList',
			component: _import('modules/assistance/kjet/kjetList'),
			name: 'kjetList',
			meta: {
				title: '困境儿童申请'
			},
			children: []
		},
		{
			path: '/social/assistance/kjet/kjetEtzrListView',
			component: _import('modules/assistance/kjet/kjetEtzrListView'),
			name: '/assistance/kjet/kjetEtzrListView',
			meta: {
				title: '困境儿童查看'
			},
			children: []
		},
		{
			path: '/social/assistance/kjet/addEditKjet',
			component: _import('modules/assistance/kjet/addEditKjet'),
			name: 'assistance/kjet/addEditKjet',
			meta: {
				title: '困境儿童修改'
			},
			children: []
		},
		{
			path: '/kjetGe',
			component: _import('modules/assistance/kjet/kjetGe'),
			name: 'kjetGe',
			meta: {
				title: '困境儿童孤儿'
			},
			children: []
		},
		{
			path: '/kjetWrfy',
			component: _import('modules/assistance/kjet/kjetWrfy'),
			name: 'kjetWrfy',
			meta: {
				title: '困境儿童事实无人抚养儿童'
			},
			children: []
		},
		{
			path: '/kjetPkjt',
			component: _import('modules/assistance/kjet/kjetPkjt'),
			name: 'kjetPkjt',
			meta: {
				title: '困境儿童贫困家庭儿童'
			},
			children: []
		},
		{
			path: '/kjetBC',
			component: _import('modules/assistance/kjet/kjetBC'),
			name: 'kjetBC',
			meta: {
				title: '困境儿童重病重残儿童'
			},
			children: []
		},
		{
			path: '/kjetQt',
			component: _import('modules/assistance/kjet/kjetQt'),
			name: 'kjetQt',
			meta: {
				title: '困境儿童其他需要帮助儿童'
			},
			children: []
		},{
			path: '/kjetChangeList',
			component: _import('modules/assistance/kjet/kjetChangeList'),
			name: 'kjetChangeList',
			meta: {
				title: '困境儿童变更'
			},
			children: [],
		},{
			//在办结中点击变更按钮
			path: '/social/assistance/kjet/kjetChangeView',
			component: _import('modules/assistance/kjet/kjetChangeView'),
			name: 'kjetChangeView',
			meta: {
				title: '困境儿童变更修改页'
			},
			children: [],
		},{
			//在变更的列表页中的数据
			path: '/social/assistance/kjet/kjetChangeListView',
			component: _import('modules/assistance/kjet/kjetChangeListView'),
			name: 'kjetChangeListView',
			meta: {
				title: '困境儿童变更详情页'
			},
			children: []
		},{
			path: '/kjetCancelList',
			component: _import('modules/assistance/kjet/kjetCancelList'),
			name: 'kjetCancelList',
			meta: {
				title: '困境儿童注销'
			},
			children: [],
		},{
			path: '/social/assistance/kjet/kjetCancelListView',
			component: _import('modules/assistance/kjet/kjetCancelListView'),
			name: 'kjetCancelListView',
			meta: {
				title: '困境儿童注销详情页'
			},
			children: []
		},{
			path: '/kjetListGrant',
			component: _import('modules/assistance/kjet/kjetListGrant'),
			name: 'kjetListGrant',
			meta: {
				title: '困境儿童发放'
			},
			children: []
		},{
			path: '/kjetListRecord',
			component: _import('modules/assistance/kjet/kjetListRecord'),
			name: 'kjetListRecord',
			meta: {
				title: '困境儿童发放记录'
			},
			children: []
		},{
			path: '/kjetListPersons',
			component: _import('modules/assistance/kjet/kjetListPersons'),
			name: 'kjetListPersons',
			meta: {
				title: '困境儿童在册人员'
			},
			children: []
		// },{
		// 	path: '/kjetListAdded',
		// 	component: _import('modules/assistance/kjet/kjetListAdded'),
		// 	name: 'kjetListAdded',
		// 	meta: {
		// 		title: '困境儿童已添加服务儿童'
		// 	},
		// 	children: []
		// },{
		// 	path: '/kjetListNotAdded',
		// 	component: _import('modules/assistance/kjet/kjetListNotAdded'),
		// 	name: 'kjetListNotAdded',
		// 	meta: {
		// 		title: '困境儿童未添加服务儿童'
		// 	},
		// 	children: []
		},{
			path: '/kjetListDirector',
			component: _import('modules/assistance/kjet/kjetListDirector'),
			name: 'kjetListDirector',
			meta: {
				title: '儿童主任'
			},
			children: []
		},{
			path: '/kjetListSupervisor',
			component: _import('modules/assistance/kjet/kjetListSupervisor'),
			name: 'kjetListSupervisor',
			meta: {
				title: '儿童督导员'
			},
			children: []
		},
		{
			path: '/assistance/kjet/kjetListView',
			name: 'assistance/kjet/kjetListView',
			component: _import('modules/assistance/kjet/kjetListView'),
			meta: {
				title: '困境儿童查看'
			}
		},{
			path: '/assistance/kjet/addEditKjet',
			name: 'assistance/kjet/addEditKjet',
			component: _import('modules/assistance/kjet/addEditKjet'),
			meta: {
				title: '困境儿童编辑'
			}
		},{
			path: '/assistance/kjet/kjetListGrantSend',
			name: 'assistance/kjet/kjetListGrantSend',
			component: _import('modules/assistance/kjet/kjetListGrantSend'),
			meta: {
				title: '困境儿童发放'
			}
		// },{
		// 	path: '/assistance/kjet/kjetFwbzListView',
		// 	name: 'assistance/kjet/kjetFwbzListView',
		// 	component: _import('modules/assistance/kjet/kjetFwbzListView'),
		// 	meta: {
		// 		title: '困境儿童服务方案查看'
		// 	}
		// },{
		// 	path: '/assistance/kjet/addEditKjetFwbz',
		// 	name: 'assistance/kjet/addEditKjetFwbz',
		// 	component: _import('modules/assistance/kjet/addEditKjetFwbz'),
		// 	meta: {
		// 		title: '困境儿童服务方案编辑'
		// 	}
		},{
			path: '/assistance/kjet/addEditKjetEtzr',
			name: 'assistance/kjet/addEditKjetEtzr',
			component: _import('modules/assistance/kjet/addEditKjetEtzr'),
			meta: {
				title: '困境儿童儿童主任编辑'
			}
		},{
			path: '/assistance/kjet/addEditKjetEtddy',
			name: 'assistance/kjet/addEditKjetEtddy',
			component: _import('modules/assistance/kjet/addEditKjetEtzr'),
			meta: {
				title: '困境儿童儿童督导员编辑'
			}
		},{
			path: '/assistance/kjet/kjetEtzrListView',
			name: 'assistance/kjet/kjetEtzrListView',
			component: _import('modules/assistance/kjet/kjetEtzrListView'),
			meta: {
				title: '困境儿童儿童主任查看'
			}
		},{
			path: '/assistance/kjet/kjetGletxxListView',
			name: 'assistance/kjet/kjetGletxxListView',
			component: _import('modules/assistance/kjet/kjetGletxxListView'),
			meta: {
				title: '困境儿童关联儿童信息'
			}
		},
		{
			path: '/lsList',
			component: _import('modules/assistance/ls/lsList'),
			name: 'lsList',
			meta: {
				title: '临时救助审批'
			},
			children: []
		}, {
			path: '/assistance/ls/lsListView',
			name: 'assistance/ls/lsListView',
			component: _import('modules/assistance/ls/lsListView'),
			// component: _import('modules/assistance/db/dbListView'),
			meta: {
				title: '临时救助查看'
			}
		}, {
			path: '/assistance/ls/lsListCancelViewZX',
			name: 'assistance/ls/lsListCancelViewZX',
			// component: _import('modules/assistance/ls/lsListCancelView'),
			component: _import( 'modules/assistance/db/dbListCancelView'),
			meta: {
				title: '临时救助注销申请'
			}
		}, {
			path: '/assistance/ls/addEditLinShi',
			name: 'assistance/ls/addEditLinShi',
			component: _import('modules/assistance/ls/addEditLinShi'),
			meta: {
				title: '临时救助编辑'
			}
		}, {
			path: '/assistance/ls/lsListChangeEdit',
			name: 'assistance/ls/lsListChangeEdit',
			component: _import('modules/assistance/ls/lsListChangeEdit'),
			// component: _import('modules/assistance/db/dbListChangeEdit'),
			meta: {
				title: '临时救助变更编辑'
			}
		}, {
			path: '/assistance/lsCheck',
			name: 'assistance/lsCheck',
			component: _import('modules/assistance/check'),
			meta: {
				title: '核对报告'
			}
		},

		{
			path: 'lsChange',
			component: _import('modules/assistance/ls/lsChange'),
			name: 'lsChange',
			meta: {
				title: '临时救助变更'
			},
			children: []
		}, {
			path: '/assistance/ls/lsListChangeView',
			name: 'assistance/ls/lsListChangeView',
			// component: _import('modules/assistance/ls/lsListChangeView'),
			component: _import('modules/assistance/db/dbListViewChange'),
			meta: {
				title: '临时救助变更查看'
			}
		}, {
			path: '/assistance/lsCheck2',
			name: 'assistance/lsCheck2',
			component: _import('modules/assistance/check'),
			meta: {
				title: '核对报告'
			}
		}, {
			path: 'lsCancel',
			component: _import('modules/assistance/ls/lsCancel'),
			name: 'lsCancel',
			meta: {
				title: '临时救助注销'
			},
			children: []
		}, {
			path: '/assistance/ls/lsListCancelView',
			name: 'assistance/ls/lsListCancelView',
			// component: _import('modules/assistance/ls/lsListCancelView'),
			component: _import('modules/assistance/db/dbListCancelView'),
			meta: {
				title: '临时救助注销查看'
			}
		}, {
			path: '/assistance/lsCheck3',
			name: 'assistance/lsCheck3',
			component: _import('modules/assistance/check'),
			meta: {
				title: '核对报告'
			}
		}, {
			path: '/lsRecord',
			component: _import('modules/assistance/ls/lsRecord'),
			name: 'lsRecord',
			meta: {
				title: '临时救助记录'
			},
			children: []
		}, 
		{
			path: '/assistance/ls/lsjzView',
			name: 'assistance/ls/lsjzView',
			// component: _import('modules/assistance/ls/lsListView'),
			component: _import('modules/assistance/db/dbListView'),
			meta: {
				title: '临时救助查看'
			}
		}, 
		{
			path: '/lsListPersons',
			component: _import('modules/assistance/ls/lsListPersons'),
			name: 'lsListPersons',
			meta: {
				title: '临时救助家庭成员'
			},
			children: []
		},
		 {
			path: '/assistance/ls/lsjzView2',
			name: 'assistance/ls/lsjzView2',
			// component: _import('modules/assistance/ls/lsListView'),
			component: _import('modules/assistance/db/dbListView'),
			meta: {
				title: '临时救助查看'
			}
		},
		 {
			path: '/lsListGrant',
			component: _import('modules/assistance/ls/lsListGrant'),
			name: 'lsListGrant',
			meta: {
				title: '临时救助发放管理'
			},
			children: []
		},
		 {
			path: '/assistance/ls/lsjzView3',
			name: 'assistance/ls/lsjzView3',
			// component: _import('modules/assistance/ls/lsListView'),
			component: _import('modules/assistance/db/dbListView'),
			meta: {
				title: '临时救助查看'
			}
		},
		 {
			path: '/lsListGrantRecord',
			component: _import('modules/assistance/ls/lsListGrantRecord'),
			name: 'lsListGrantRecord',
			meta: {
				title: '临时救助发放记录'
			},
			children: []
		}, 
		// {
		// 	path: '/assistance/ls/lsjzView4',
		// 	name: 'assistance/ls/lsjzView4',
		// 	component: _import('modules/assistance/ls/lsListView'),
		// 	meta: {
		// 		title: '临时救助查看'
		// 	}
		// },
		{
			path: '/disableList',
			component: _import('modules/assistance/disabled/disableList'),
			name: 'disableList',
			meta: {
				title: '残疾人补贴'
			},
			children: []
		},
		//尊老金
		{
			path: '/assistance/zlj/ZljListView',
			component: _import('modules/assistance/zlj/ZljListView'),
			name: 'assistance/zlj/ZljListView',
			meta: {
				title: '尊老金查看'
			},
			children: []
		},
		//尊老金修改
		{
			path: '/assistance/zlj/AddEditZunlaojin',
			component: _import('modules/assistance/zlj/AddEditZunlaojin'),
			name: '/assistance/zlj/AddEditZunlaojin',
			meta: {
				title: '尊老金修改'
			},
			children: []
		},
		{
			path: '/zljList',
			component: _import('modules/assistance/zlj/zljList'),
			name: 'zljList',
			meta: {
				title: '尊老金审核'
			},
			children: [],
		},	
		{
            path: '/zljChange',
            component: _import('modules/assistance/zlj/zljChange'),
            name: 'zljChange',
            meta: {
                title: '尊老金变更'
            },
            children: []
        },
        {
            path: '/zljCancel',
            component: _import('modules/assistance/zlj/zljCancel'),
            name: 'zljCancel',
            meta: {
                title: '尊老金注销'
            },
            children: []
        },
		{
			path: '/assistance/zlj/ZljListChangeEdit',
			component: _import('modules/assistance/zlj/ZljListChangeEdit'),
			name: '/assistance/zlj/ZljListChangeEdit',
			meta: {
				title: '尊老金变更修改页'
			},
			children: []
		},
		{
			path: '/assistance/zlj/ZljListChangeView',
			component: _import('modules/assistance/zlj/ZljListChangeView'),
			name: '/assistance/zlj/ZljListChangeView',
			meta: {
				title: '尊老金变更查看'
			},
			children: []
		},
		{
			path: '/assistance/zlj/ZljListCancelView',
			component: _import('modules/assistance/zlj/ZljListCancelView'),
			name: '/assistance/zlj/ZljListCancelView',
			meta: {
				title: '尊老金注销查看页'
			},
			children: []
		},
		// 统计分析
		{
			path: '/assistance/tjfx/echarts',
			name: 'echarts',
			component: _import('modules/assistance/tjfx/echarts'),
			meta: {
				title: '数据图表'
			},
			children: []
		},
		{
			path: '/assistance/tjfx/tjfx',
			name: 'tjfx',
			component: _import('modules/assistance/tjfx/tjfx'),
			meta: {
				title: '统计分析'
			},
			children: []
		},
		{
			path:'/assistance/tjfx/QuarterlyTable',
			component: _import('modules/assistance/tjfx/tkQuarterlyTable'),
			name: 'tkQuarterlyTable',
			meta: {
				title: '特困供养季度表'
			},
			children: []
		},
		{
			path:'/assistance/tjfx/dibaoStatistical',
			component: _import('modules/assistance/tjfx/dibaoStatistical'),
			name: 'dibaoStatistical',
			meta: {
				title: '低保季度表'
			},
			children: []
		},
		{
			path:'/assistance/tjfx/lsStatistical',
			component: _import('modules/assistance/tjfx/lsStatistical'),
			name: 'lsStatistical',
			meta: {
				title: '临时救助季度表'
			},
			children: []
		},
		{
			path:'/assistance/tjfx/dibaoTDStatistical',
			component: _import('modules/assistance/tjfx/dibaoTDStatistical'),
			name: 'dibaoTDStatistical',
			meta: {
				title: '低保特定对象统计表'
			},
			children: []
		},
		{
			path:'/assistance/tjfx/schedule',
			component: _import('modules/assistance/tjfx/schedule'),
			name: 'schedule',
			meta: {
				title: '低保特困进度表'
			},
			children: []
		},
		{
			path:'/assistance/tjfx/dsrListTable',
			component: _import('modules/assistance/tjfx/dsrListTable'),
			name: 'dsrListTable',
			meta: {
				title: '低收入人口统计表'
			},
			children: []
		},
		{
			path: '/yljgList',
			component: _import('modules/assistance/yljg/yljgList'),
			name: 'yljgList',
			meta: {
				title: '供养机构'
			},
			children: []
		},
		{
			path: '/assistance/yljg/yljgListView',
			component: _import('modules/assistance/yljg/yljgListView'),
			name: 'assistance/yljg/yljgListView',
			meta: {
				title: '供养机构查看'
			},
			children: []
		},
		{
			path: '/assistance/yljg/addEditYljg',
			// path: '/assistance/yljg/addEditYljg2',
			component: _import('modules/assistance/yljg/addEditYljg'),
			name: 'assistance/yljg/addEditYljg',
			meta: {
				title: '供养机构修改'
			},
			children: []
		},{
			path: '/assistance/yljg/addEditYljg',
			component: _import('modules/assistance/yljg/addEditYljg'),
			name: 'assistance/yljg/addEditYljg',
			meta: {
				title: '供养机构新增'
			},
			children: []
		},
		
		{
			path: '/cwbl',
			component: _import('modules/assistance/cwbl/cwbl'),
			name: 'cwbl',
			meta: {
				title: '错误数据补录'
			},
			children: []
		},
		{
			path: '/assistance/cwbl/cwblListView',
			component: _import('modules/assistance/qzsq/qzsqListView'),
			name: 'assistance/cwbl/cwblListView',
			meta: {
				title: '错误数据补录查看'
			},
			children: []
		},
		{
			path: '/assistance/cwbl/addEditCwbl',
			component: _import('modules/assistance/cwbl/addEditCwbl'),
			name: 'assistance/cwbl/addEditCwbl',
			meta: {
				title: '错误数据补录修改'
			},
			children: []
		},
		{
			path: '/jzffList',
			component: _import('modules/assistance/jzff/jzffList'),
			name: 'jzffList',
			meta: {
				title: '救助资金发放信息管理'
			},
			children: []
		},
		{
			path: '/jzffCreate',
			component: _import('modules/assistance/jzff/jzffCreate'),
			name: 'jzffCreate',
			meta: {
				title: '生成救助资金发放名单'
			},
			children: []
		},
		{
			path: '/assistance/jzff/jzffListView',
			component: _import('modules/assistance/jzff/jzffListView'),
			name: 'assistance/jzff/jzffListView',
			meta: {
				title: '救助资金发放明细'
			},
			children: []
		},
		{
			path: '/assistance/jzff/jzffPListView',
			component: _import('modules/assistance/jzff/jzffPListView'),
			name: 'assistance/jzff/jzffPListView',
			meta: {
				title: '救助资金发放家庭详情'
			},
			children: []
		},
		{
			path: '/jzdyList',
			component: _import('modules/assistance/jzff/jzdyList'),
			name: 'jzdyList',
			meta: {
				title: '个人享受待遇信息管理'
			},
			children: []
		},
		{
			path: '/assistance/jzff/jzdyListView',
			component: _import('modules/assistance/jzff/jzdyListView'),
			name: 'assistance/jzff/jzdyListView',
			meta: {
				title: '个人享受待遇信息详情'
			},
			children: []
		},
		// 三月导入审核数据补录页面
		{
			path: '/assistance/db/dbEditBlList',
			component: _import('modules/assistance/db/addBlList'),
			name: 'assistance/db/addBlList',
			meta: {
				title: '低保补录'
			},
			children: []
		},
		{
			path: '/assistance/db/tkEditBlList',
			component: _import('modules/assistance/db/addBlList'),
			name: 'assistance/db/addBlList',
			meta: {
				title: '特困补录'
			},
			children: []
		},
		{
			path: '/assistance/excel/excelDownload',
			component: _import('modules/assistance/excel/excelDownload'),
			name: 'assistance/excel/excelDownload',
			meta: {
				title: '数据导出'
			},
			children: []
		},
		// 复核页面路径
		{
			path: '/dbFhList',
			component: _import('modules/assistance/fh/db/dbFhList'),
			name: 'dbFhList',
			meta: {
				title: '低保复核'
			},
			children: []
		},
		{
			path: '/dsrFhList',
			component: _import('modules/assistance/fh/dsr/dsrFhList'),
			name: 'dsrFhList',
			meta: {
				title: '低收入复核'
			},
			children: []
		},
		{
			path: '/tkFhList',
			component: _import('modules/assistance/fh/tk/tkFhList'),
			name: 'tkFhList',
			meta: {
				title: '特困复核'
			},
			children: []
		},
		{
			path: '/zcFhList',
			component: _import('modules/assistance/fh/zc/zcFhList'),
			name: 'zcFhList',
			meta: {
				title: '支出复核'
			},
			children: []
		},
		{
			path: '/dqzfList',
			component: _import('modules/assistance/dqzf/dqzfList'),
			name: 'dqzfList',
			meta: {
				title: '定期走访'
			},
			children: []
		},
		{
			path: '/assistance/dqzf/dqzfListView',
			component: _import('modules/assistance/dqzf/dqzfListView'),
			name: 'assistance/dqzf/dqzfListView',
			meta: {
				title: '定期走访查看'
			},
			children: []
		},
		// 政策落实预警
		{
			path: '/disabledTKReuse',
			component: _import('modules/assistance/zcyj/disabledTk/disabledTKReuse'),
			name: 'disabledTKReuse',
			meta: {
				title: '残补和特困重复预警'
			},
			children: []
		},
		{
			path: '/disabledDbwReuse',
			component: _import('modules/assistance/zcyj/disabledDbw/disabledDbwReuse'),
			name: 'disabledDbwReuse',
			meta: {
				title: '低保外残补存疑预警'
			},
			children: []
		},
		{
			path: '/disabledDbnReuse',
			component: _import('modules/assistance/zcyj/disabledDbn/disabledDbnReuse'),
			name: 'disabledDbnReuse',
			meta: {
				title: '低保内残补存疑预警'
			},
			children: []
		},
		{
			path: '/disabledDbnzlReuse',
			component: _import('modules/assistance/zcyj/disabledDbn/disabledDbnzlReuse'),
			name: 'disabledDbnzlReuse',
			meta: {
				title: '低保内残补种类等级预警'
			},
			children: []
		},
		{
			path: '/disabledDsrReuse',
			component: _import('modules/assistance/zcyj/disabledDsr/disabledDsrReuse'),
			name: 'disabledDsrReuse',
			meta: {
				title: '低收入家庭残补存疑预警'
			},
			children: []
		},
		// 存疑预警补充
		{
			path: '/caryj',
			component: _import('modules/assistance/sjcyyj/caryj'),
			name: 'caryj',
			meta: {
				title: '车辆预警'
			},
			children: []
		},
		{
			path: '/houseyj',
			component: _import('modules/assistance/sjcyyj/houseyj'),
			name: 'houseyj',
			meta: {
				title: '房产预警'
			},
			children: []
		},
		{
			path: '/qyggyj',
			component: _import('modules/assistance/sjcyyj/qyggyj'),
			name: 'qyggyj',
			meta: {
				title: '企业高管预警'
			},
			children: []
		},
		{
			path: '/jrzcyj',
			component: _import('modules/assistance/sjcyyj/jrzcyj'),
			name: 'jrzcyj',
			meta: {
				title: '金融资产预警'
			},
			children: []
		},
		{
			path: '/fxryyj',
			component: _import('modules/assistance/sjcyyj/fxryyj'),
			name: 'fxryyj',
			meta: {
				title: '服刑人员预警'
			},
			children: []
		},
		{
			path: '/gjjyj',
			component: _import('modules/assistance/sjcyyj/gjjyj'),
			name: 'gjjyj',
			meta: {
				title: '公积金预警'
			},
			children: []
		},
		{
			path: '/taxesyj',
			component: _import('modules/assistance/sjcyyj/taxesyj'),
			name: 'taxesyj',
			meta: {
				title: '税务预警'
			},
			children: []
		},
		{
			path: '/czgyryyj',
			component: _import('modules/assistance/sjcyyj/czgyryyj'),
			name: 'czgyryyj',
			meta: {
				title: '财政供养人员预警'
			},
			children: []
		},



		// {
		// 	path: '/qtList',
		// 	component: _import('modules/assistance/qt/qtList'),
		// 	name: 'qtList',
		// 	meta: {
		// 		title: '其他救助申请'
		// 	},
		// 	children: []
		// }, {
		// 	path: '/assistance/qt/qtListView',
		// 	name: 'assistance/qt/qtListView',
		// 	component: _import('modules/assistance/qt/qtListView'),
		// 	meta: {
		// 		title: '其他救助查看'
		// 	}
		// }, {
		// 	path: '/assistance/qt/qtListCancelViewZX',
		// 	name: 'assistance/qt/qtListCancelViewZX',
		// 	component: _import('modules/assistance/qt/qtListCancelView'),
		// 	meta: {
		// 		title: '其他救助注销申请'
		// 	}
		// }, {
		// 	path: '/assistance/qt/addEditQiTa',
		// 	name: 'assistance/qt/addEditQiTa',
		// 	component: _import('modules/assistance/qt/addEditQiTa'),
		// 	meta: {
		// 		title: '其他救助编辑'
		// 	}
		// }, {
		// 	path: '/assistance/qt/qtListChangeEdit',
		// 	name: 'assistance/qt/qtListChangeEdit',
		// 	component: _import('modules/assistance/qt/qtListChangeEdit'),
		// 	meta: {
		// 		title: '其他救助变更编辑'
		// 	}
		// }, {
		// 	path: '/assistance/qtCheck',
		// 	name: 'assistance/qtCheck',
		// 	component: _import('modules/assistance/check'),
		// 	meta: {
		// 		title: '核对报告'
		// 	}
		// },

		// {
		// 	path: '/qtChange',
		// 	component: _import('modules/assistance/qt/qtChange'),
		// 	name: 'qtChange',
		// 	meta: {
		// 		title: '其他救助变更'
		// 	},
		// 	children: []
		// }, {
		// 	path: '/assistance/qt/qtListChangeView',
		// 	name: 'assistance/qt/qtListChangeView',
		// 	component: _import('modules/assistance/qt/qtListChangeView'),
		// 	meta: {
		// 		title: '其他救助变更查看'
		// 	}
		// },
		// {
		// 	path: '/assistance/qtCheck2',
		// 	name: 'assistance/qtCheck2',
		// 	component: _import('modules/assistance/check'),
		// 	meta: {
		// 		title: '核对报告'
		// 	}
		// }, {
		// 	path: '/qtCancel',
		// 	component: _import('modules/assistance/qt/qtCancel'),
		// 	name: 'qtCancel',
		// 	meta: {
		// 		title: '其他救助注销'
		// 	},
		// 	children: []
		// }, {
		// 	path: '/assistance/qt/qtListCancelView',
		// 	name: 'assistance/qt/qtListCancelView',
		// 	component: _import('modules/assistance/qt/qtListCancelView'),
		// 	meta: {
		// 		title: '其他救助注销查看'
		// 	}
		// },
		// {
		// 	path: '/assistance/qtCheck3',
		// 	name: 'assistance/qtCheck3',
		// 	component: _import('modules/assistance/check'),
		// 	meta: {
		// 		title: '核对报告'
		// 	}
		// }, {
		// 	path: '/qtListHouseholds',
		// 	component: _import('modules/assistance/qt/qtListHouseholds'),
		// 	name: 'qtListHouseholds',
		// 	meta: {
		// 		title: '其他救助在册户数'
		// 	},
		// 	children: []
		// }, {
		// 	path: '/assistance/qt/qtjtView',
		// 	name: 'assistance/qt/qtjtView',
		// 	component: _import('modules/assistance/qt/qtListView'),
		// 	meta: {
		// 		title: '其他救助查看'
		// 	}
		// }, {
		// 	path: '/qtListPersons',
		// 	component: _import('modules/assistance/qt/qtListPersons'),
		// 	name: 'qtListPersons',
		// 	meta: {
		// 		title: '其他救助在册人员'
		// 	},
		// 	children: []
		// }, {
		// 	path: '/assistance/qt/qtListView5',
		// 	name: 'assistance/qt/qtListView5',
		// 	component: _import('modules/assistance/qt/qtListView'),
		// 	meta: {
		// 		title: '其他救助查看'
		// 	}
		// }, 
		{
			path: '/assistance/disableImportExcel',
			name: 'assistance/disableImportExcel',
			component: _import('modules/assistance/importExcel'),
			meta: {
				title: '导入excel'
			},
		}, 
		// {
		// 	path: '/jdlkList',
		// 	component: _import('modules/assistance/jdlk/jdlkList'),
		// 	name: 'jdlkList',
		// 	meta: {
		// 		title: '建档立卡扶贫'
		// 	},
		// 	children: []
		// }, {
		// 	path: '/assistance/jdlkImportExcel',
		// 	name: 'assistance/jdlkImportExcel',
		// 	component: _import('modules/assistance/importExcel'),
		// 	meta: {
		// 		title: '导入excel'
		// 	},
		// }, 
		// {
		// 	path: '/xfzgList',
		// 	component: _import('modules/assistance/xfzg/xfzgList'),
		// 	name: 'xfzgList',
		// 	meta: {
		// 		title: '下放职工在册记录'
		// 	},
		// 	children: []
		// }, {
		// 	path: '/assistance/xfzg/addEditXfzgList',
		// 	name: 'assistance/xfzg/addEditXfzgList',
		// 	component: _import('modules/assistance/xfzg/addEditXfzgList'),
		// 	meta: {
		// 		title: '下放职工在册记录新增'
		// 	}
		// }, {
		// 	path: '/assistance/xfzgImportExcel',
		// 	name: 'assistance/xfzgImportExcel',
		// 	component: _import('modules/assistance/importExcel'),
		// 	meta: {
		// 		title: '导入excel'
		// 	},
		// }, {
		// 	path: '/xfzgCancelList',
		// 	component: _import('modules/assistance/xfzg/xfzgCancelList'),
		// 	name: 'xfzgCancelList',
		// 	meta: {
		// 		title: '下放职工注销管理'
		// 	},
		// 	children: []
		// }, {
		// 	path: '/assistance/xfzg/xfzgCancelView',
		// 	name: 'assistance/xfzg/xfzgCancelView',
		// 	component: _import('modules/assistance/xfzg/xfzgCancelView'),
		// 	meta: {
		// 		title: '下放职工注销查看'
		// 	}
		// }, {
		// 	path: '/wjbtList',
		// 	component: _import('modules/assistance/wjbt/wjbtList'),
		// 	name: 'wjbtList',
		// 	meta: {
		// 		title: '物价补贴'
		// 	},
		// 	children: []
		// }, {
		// 	path: '/assistance/wjbt/addWjbtbzje',
		// 	name: 'assistance/wjbt/addWjbtbzje',
		// 	component: _import('modules/assistance/wjbt/addWjbtbzje'),
		// 	meta: {
		// 		title: '输入保障金额'
		// 	}
		// }, {
		// 	path: '/sdfjmList',
		// 	component: _import('modules/assistance/sdfjm/sdfjmList'),
		// 	name: 'sdfjmList',
		// 	meta: {
		// 		title: '水电费减免'
		// 	},
		// 	children: []
		// }, {
		// 	path: '/assistance/sdfjm/addSdfjmbz',
		// 	name: 'assistance/sdfjm/addSdfjmbz',
		// 	component: _import('modules/assistance/sdfjm/addSdfjmbz'),
		// 	meta: {
		// 		title: '输入减免标准'
		// 	}
		// }, {
		// 	path: '/jyjzList',
		// 	component: _import('modules/assistance/jyjz/jyjzList'),
		// 	name: 'jyjzList',
		// 	meta: {
		// 		title: '教育救助'
		// 	},
		// 	children: []
		// }, {
		// 	path: '/assistance/jyjz/addEditJyjzList',
		// 	name: 'assistance/jyjz/addEditJyjzList',
		// 	component: _import('modules/assistance/jyjz/addEditJyjzList'),
		// 	meta: {
		// 		title: '教育救助新增'
		// 	}
		// }, {
		// 	path: '/assistance/jyjzImportExcel',
		// 	name: 'assistance/jyjzImportExcel',
		// 	component: _import('modules/assistance/importExcel'),
		// 	meta: {
		// 		title: '导入excel'
		// 	},
		// }, {
		// 	path: '/zhjzList',
		// 	component: _import('modules/assistance/zhjz/zhjzList'),
		// 	name: 'zhjzList',
		// 	meta: {
		// 		title: '灾害救助'
		// 	},
		// 	children: []
		// }, {
		// 	path: '/assistance/zhjz/addEditZhjzList',
		// 	name: 'assistance/zhjz/addEditZhjzList',
		// 	component: _import('modules/assistance/zhjz/addEditZhjzList'),
		// 	meta: {
		// 		title: '灾害救助新增'
		// 	}
		// }, {
		// 	path: '/assistance/zhjzImportExcel',
		// 	name: 'assistance/zhjzImportExcel',
		// 	component: _import('modules/assistance/importExcel'),
		// 	meta: {
		// 		title: '导入excel'
		// 	},
		// }, {
		// 	path: '/employmentList',
		// 	component: _import('modules/assistance/employment/employmentList'),
		// 	name: 'employmentList',
		// 	meta: {
		// 		title: '就业救助'
		// 	},
		// 	children: []
		// }, {
		// 	path: '/assistance/employment/addEditEmploymentList',
		// 	name: 'assistance/employment/addEditEmploymentList',
		// 	component: _import('modules/assistance/employment/addEditEmploymentList'),
		// 	meta: {
		// 		title: '就业救助新增'
		// 	}
		// }, {
		// 	path: '/assistance/employmentImportExcel',
		// 	name: 'assistance/employmentImportExcel',
		// 	component: _import('modules/assistance/importExcel'),
		// 	meta: {
		// 		title: '导入excel'
		// 	},
		// }, {
		// 	path: '/ghList',
		// 	component: _import('modules/assistance/gh/ghList'),
		// 	name: 'ghList',
		// 	meta: {
		// 		title: '工会救助'
		// 	},
		// 	children: []
		// }, {
		// 	path: '/assistance/gh/addEditGhList',
		// 	name: 'assistance/gh/addEditGhList',
		// 	component: _import('modules/assistance/gh/addEditGhList'),
		// 	meta: {
		// 		title: '工会救助新增'
		// 	}
		// }, {
		// 	path: '/assistance/ghImportExcel',
		// 	name: 'assistance/ghImportExcel',
		// 	component: _import('modules/assistance/importExcel'),
		// 	meta: {
		// 		title: '导入excel'
		// 	},
		// }, {
		// 	path: '/twList',
		// 	component: _import('modules/assistance/tw/twList'),
		// 	name: 'twList',
		// 	meta: {
		// 		title: '团委救助'
		// 	},
		// 	children: []
		// }, {
		// 	path: '/assistance/tw/addEditTwList',
		// 	name: 'assistance/tw/addEditTwList',
		// 	component: _import('modules/assistance/tw/addEditTwList'),
		// 	meta: {
		// 		title: '团委救助新增'
		// 	}
		// }, {
		// 	path: '/assistance/twImportExcel',
		// 	name: 'assistance/twImportExcel',
		// 	component: _import('modules/assistance/importExcel'),
		// 	meta: {
		// 		title: '导入excel'
		// 	},
		// }, {
		// 	path: '/fljzList',
		// 	component: _import('modules/assistance/fl/fljzList'),
		// 	name: 'fljzList',
		// 	meta: {
		// 		title: '妇联救助'
		// 	},
		// 	children: []
		// }, {
		// 	path: '/assistance/fl/addEditFljzList',
		// 	name: 'assistance/fl/addEditFljzList',
		// 	component: _import('modules/assistance/fl/addEditFljzList'),
		// 	meta: {
		// 		title: '妇联救助新增'
		// 	}
		// }, {
		// 	path: '/assistance/flImportExcel',
		// 	name: 'assistance/flImportExcel',
		// 	component: _import('modules/assistance/importExcel'),
		// 	meta: {
		// 		title: '导入excel'
		// 	},
		// }, {
		// 	path: '/hhjzList',
		// 	component: _import('modules/assistance/hh/hhjzList'),
		// 	name: 'hhjzList',
		// 	meta: {
		// 		title: '红会救助' 
		// 	},
		// 	children: []
		// }, {
		// 	path: '/assistance/hh/addEditHhjzList',
		// 	name: 'assistance/hh/addEditHhjzList',
		// 	component: _import('modules/assistance/hh/addEditHhjzList'),
		// 	meta: {
		// 		title: '红会救助新增'
		// 	}
		// }, {
		// 	path: '/shzzList',
		// 	component: _import('modules/assistance/shzz/shzzList'),
		// 	name: 'shzzList',
		// 	meta: {
		// 		title: '社会组织救助'
		// 	},
		// 	children: []
		// }, {
		// 	path: '/assistance/shzz/addEditShzzList',
		// 	name: 'assistance/shzz/addEditShzzList',
		// 	component: _import('modules/assistance/shzz/addEditShzzList'),
		// 	meta: {
		// 		title: '社会组织救助新增'
		// 	}
		// }, {
		// 	path: '/assistance/shzzImportExcel',
		// 	name: 'assistance/shzzImportExcel',
		// 	component: _import('modules/assistance/importExcel'),
		// 	meta: {
		// 		title: '导入excel'
		// 	},
		// }, {
		// 	path: '/llqtList',
		// 	component: _import('modules/assistance/llqt/llqtList'),
		// 	name: 'llqtList',
		// 	meta: {
		// 		title: '流浪乞讨救助'
		// 	},
		// 	children: []
		// }, {
		// 	path: '/assistance/llqt/addEditLlqtList',
		// 	name: 'assistance/llqt/addEditLlqtList',
		// 	component: _import('modules/assistance/llqt/addEditLlqtList'),
		// 	meta: {
		// 		title: '流浪乞讨救助新增'
		// 	}
		// }, {
		// 	path: '/assistance/llqtImportExcel',
		// 	name: 'assistance/llqtImportExcel',
		// 	component: _import('modules/assistance/importExcel'),
		// 	meta: {
		// 		title: '导入excel'
		// 	},
		// }, {
		// 	path: '/cljzList',
		// 	component: _import('modules/assistance/cl/cljzList'),
		// 	name: 'cljzList',
		// 	meta: {
		// 		title: '残联救助'
		// 	},
		// 	children: []
		// }, {
		// 	path: '/assistance/cl/addEditCljzList',
		// 	name: 'assistance/cl/addEditCljzList',
		// 	component: _import('modules/assistance/cl/addEditCljzList'),
		// 	meta: {
		// 		title: '残联救助新增'
		// 	}
		// }, {
		// 	path: '/assistance/cljzImportExcel',
		// 	name: 'assistance/cljzImportExcel',
		// 	component: _import('modules/assistance/importExcel'),
		// 	meta: {
		// 		title: '导入excel'
		// 	},
		// }, {
		// 	path: '/ylyjList',
		// 	component: _import('modules/assistance/ylyj/ylyjList'),
		// 	name: 'ylyjList',
		// 	meta: {
		// 		title: '医疗应急救助'
		// 	},
		// 	children: []
		// }, {
		// 	path: '/assistance/ylyj/addEditYlyjList',
		// 	name: 'assistance/ylyj/addEditYlyjList',
		// 	component: _import('modules/assistance/ylyj/addEditYlyjList'),
		// 	meta: {
		// 		title: '医疗应急救助新增'
		// 	}
		// }, {
		// 	path: '/assistance/ylyjImportExcel',
		// 	name: 'assistance/ylyjImportExcel',
		// 	component: _import('modules/assistance/importExcel'),
		// 	meta: {
		// 		title: '导入excel'
		// 	},
		// }, {
		// 	path: '/mzbzList',
		// 	component: _import('modules/assistance/mzbz/mzbzList'),
		// 	name: 'mzbzList',
		// 	meta: {
		// 		title: '民政补助'
		// 	},
		// 	children: []
		// }, {
		// 	path: '/assistance/mzbz/addEditMzbzList',
		// 	name: 'assistance/mzbz/addEditMzbzList',
		// 	component: _import('modules/assistance/mzbz/addEditMzbzList'),
		// 	meta: {
		// 		title: '民政补助新增'
		// 	}
		// }, {
		// 	path: '/assistance/mzbzImportExcel',
		// 	name: 'assistance/mzbzImportExcel',
		// 	component: _import('modules/assistance/importExcel'),
		// 	meta: {
		// 		title: '导入excel'
		// 	},
		// }, {
		// 	path: '/flyzList',
		// 	component: _import('modules/assistance/flyz/flyzList'),
		// 	name: 'flyzList',
		// 	meta: {
		// 		title: '法律援助申请'
		// 	},
		// 	children: []
		// }, {
		// 	path: '/assistance/flyz/flyzListView',
		// 	name: 'assistance/flyz/flyzListView',
		// 	component: _import('modules/assistance/flyz/flyzListView'),
		// 	meta: {
		// 		title: '法律援助查看'
		// 	}
		// }, {
		// 	path: '/assistance/flyz/flyzListCancelViewZX',
		// 	name: 'assistance/flyz/flyzListCancelViewZX',
		// 	component: _import('modules/assistance/flyz/flyzListCancelView'),
		// 	meta: {
		// 		title: '法律援助注销申请'
		// 	}
		// }, {
		// 	path: '/assistance/flyz/addEditFlyzList',
		// 	name: 'assistance/flyz/addEditFlyzList',
		// 	component: _import('modules/assistance/flyz/addEditFlyzList'),
		// 	meta: {
		// 		title: '法律援助编辑'
		// 	}
		// }, {
		// 	path: '/assistance/flyz/flyzListChangeEdit',
		// 	name: 'assistance/flyz/flyzListChangeEdit',
		// 	component: _import('modules/assistance/flyz/flyzListChangeEdit'),
		// 	meta: {
		// 		title: '法律援助变更编辑'
		// 	}
		// }, {
		// 	path: '/assistance/flyzCheck',
		// 	name: 'assistance/flyzCheck',
		// 	component: _import('modules/assistance/check'),
		// 	meta: {
		// 		title: '核对报告'
		// 	}
		// },
		// {
		// 	path: '/assistance/flyz/flyzRecord',
		// 	component: _import('modules/assistance/flyz/flyzRecord'),
		// 	name: 'assistance/flyz/flyzRecord',
		// 	meta: {
		// 		title: '法律援助记录'
		// 	},
		// 	children: []
		// }, {
		// 	path: '/assistance/flyz/flyzView',
		// 	name: 'assistance/flyz/flyzView',
		// 	component: _import('modules/assistance/flyz/flyzListView'),
		// 	meta: {
		// 		title: '法律援助查看'
		// 	}
		// }, {
		// 	path: '/dbSetList',
		// 	component: _import('modules/assistance/db/dbSetList'),
		// 	name: 'dbSetList',
		// 	meta: {
		// 		title: '低保标准设置'
		// 	},
		// 	children: []
		// }, {
		// 	path: '/assistance/db/addEditDibaoSet',
		// 	name: 'assistance/db/addEditDibaoSet',
		// 	component: _import('modules/assistance/db/addEditDibaoSet'),
		// 	meta: {
		// 		title: '低保标准编辑'
		// 	}
		// },  {
		// 	path: '/warningInformation',
		// 	name: 'warningInformation',
		// 	component: _import('modules/assistance/warningInformation'),
		// 	meta: {
		// 		title: '预警信息',
		// 	},
		// 	children: []
		// }, {
		// 	path: '/assistance/commonList2',
		// 	name: 'assistance/commonList2',
		// 	component: _import('modules/assistance/commonList2'),
		// 	meta: {
		// 		title: '预警信息查看'
		// 	}
		// }, {
		// 	path: '/assistance/warningInformation/cancelWarning',
		// 	name: 'assistance/warningInformation/cancelWarning',
		// 	component: _import('modules/assistance/warningInformation/cancelWarning'),
		// 	meta: {
		// 		title: '取消预警'
		// 	}
		// }, {
		// 	path: '/assistance/warningInformation/paidan',
		// 	name: 'assistance/warningInformation/paidan',
		// 	component: _import('modules/assistance/warningInformation/paidan'),
		// 	meta: {
		// 		title: '派单'
		// 	},
		// }, {
		// 	path: '/assistance/warningInformation/modAddrView',
		// 	name: 'assistance/warningInformation/modAddrView',
		// 	component: _import('modules/assistance/warningInformation/modAddrView'),
		// 	meta: {
		// 		title: '区划修改'
		// 	},
		// }, {
		// 	path: '/assistance/warningInformation/repeatView',
		// 	name: 'assistance/warningInformation/repeatView',
		// 	component: _import('modules/assistance/warningInformation/repeatView'),
		// 	meta: {
		// 		title: '重复对比'
		// 	},
		// }, {
		// 	path: '/assistance/warningInformation/chuliView',
		// 	name: 'assistance/warningInformation/chuliView',
		// 	component: _import('modules/assistance/warningInformation/chuliView'),
		// 	meta: {
		// 		title: '处理'
		// 	},
		// },{
		// 	path: '/assistance/qt/qtListView2',
		// 	name: 'assistance/qt/qtListView2',
		// 	component: _import('modules/assistance/qt/qtListView'),
		// 	meta: {
		// 		title: '其他救助查看'
		// 	},
		// }, {
		// 	path: '/assistance/flyz/flyzListView2',
		// 	name: 'assistance/flyz/flyzListView2',
		// 	component: _import('modules/assistance/flyz/flyzListView'),
		// 	meta: {
		// 		title: '法律援助查看'
		// 	},
		// }, {
		// 	path: '/assistance/xfzg/xfzgCancelView2',
		// 	name: 'assistance/xfzg/xfzgCancelView2',
		// 	component: _import('modules/assistance/xfzg/xfzgCancelView'),
		// 	meta: {
		// 		title: '下放职工查看'
		// 	},
		// },

		// {
		// 	path: '/hyxxList',
		// 	component: _import('modules/assistance/hyxx/hyxxList'),
		// 	name: 'hyxxList',
		// 	meta: {
		// 		title: '婚姻信息'
		// 	},
		// 	children: []
		// }, {
		// 	path: '/assistance/hyxxImportExcel',
		// 	name: 'assistance/hyxxImportExcel',
		// 	component: _import('modules/assistance/importExcel'),
		// 	meta: {
		// 		title: '导入excel'
		// 	},
		// },
	
		// {
		// 	path: '/chxList',
		// 	name: 'chxList',
		// 	component: _import('modules/assistance/chx/chxList'),
		// 	meta: {
		// 		title: '长护险可享受人员白名单'
		// 	},
		// },{
		// 	path: '/zfjzList',
		// 	name: 'zfjzList',
		// 	component: _import('modules/assistance/zfjz/zfjzList'),
		// 	meta: {
		// 		title: '住房救助'
		// 	},
		// },{
		// 	path: '/csjzList',
		// 	name: 'csjzList',
		// 	component: _import('modules/assistance/csjz/csjzList'),
		// 	meta: {
		// 		title: '慈善救助'
		// 	},
		// },
		
		
		// {
		// 	path: '/ceshi',
		// 	component: _import('modules/assistance/ceshi/ceshi'),
		// 	name: 'ceshi',
		// 	meta: {
		// 		title: '测试'
		// 	},
		// 	children: []
		// }
	],
	beforeEnter(to, from, next) {
		let token = sessionStorage.getItem(requestConst.headers.sesstionCsrf)
		if (!token || !/\S/.test(token)) {
			clearLoginInfo()
			next({
				name: 'login'
			})
		} else {
			next()
		}
	}
}

const router = new Router({
	mode: 'hash',
	scrollBehavior: () => ({
		y: 0
	}),
	isAddDynamicMenuRoutes: false, // 是否已经添加动态(菜单)路由
	routes: globalRoutes.concat(mainRoutes)
})
let defaultMainTemp = []
router.beforeEach((to, from, next) => {
	// 添加动态(菜单)路由
	// 1. 已经添加 or 全局路由, 直接访问
	// 2. 获取菜单列表, 添加并保存本地存储
	let token = sessionStorage.getItem(requestConst.headers.sesstionCsrf)
	if (router.options.isAddDynamicMenuRoutes || fnCurrentRouteType(to, globalRoutes) === 'global') {
		next()
	} else {
		if (token) {
			defaultMainTemp = mainRoutes.children.filter(item => {
				item.path.indexOf(generalConfig.defaultUrl) < 0 ? item.path = generalConfig.defaultUrl +
					'/' + item.path.replace(/^\//, '') : item.path
				item.name.indexOf(generalConfig.defaultUrl) < 0 ? item.name = generalConfig.defaultUrl +
					'/#/' + item.path.replace(/^\//, '') : item.path
				return item
			})

			let appId = generalConfig.appId // 当前系统的appId,在static/general.config.js中配置
			getMenuList(appId).then(({
				data
			}) => {
				console.log(data)
				if (data) {
					fnAddDynamicMenuRoutes(data.children)
					router.options.isAddDynamicMenuRoutes = true
					sessionStorage.setItem(generalConfig.menuListName, JSON.stringify(data.children ||
						'[]'))
					// sessionStorage.setItem('permissions', JSON.stringify(data.permissions || '[]'))
					next({
						...to,
						replace: true
					})
				} else {
					sessionStorage.setItem(generalConfig.menuListName, '[]')
					// sessionStorage.setItem('permissions', '[]')
					next()
				}
			}).catch((e) => {
				console.log(`%c${e} 请求菜单列表和权限失败，跳转至登录页！！`, 'color:blue')
				sessionStorage.setItem(generalConfig.menuListName, '[]')
				sessionStorage.setItem('permissions', '[]')
				next()
				// router.push({ name: 'login' })
			})
		} else {
			next()
			router.push({
				name: 'login'
			})
		}

	}
})
/**
 * 判断当前路由类型, global: 全局路由, main: 主入口路由
 * @param {*} route 当前路由
 */
function fnCurrentRouteType(route, globalRoutes = []) {
	// debugger;

	var temp = []
	for (var i = 0; i < globalRoutes.length; i++) {
		if (route.path === globalRoutes[i].path) {
			return 'global'
		} else if (globalRoutes[i].children && globalRoutes[i].children.length >= 1) {
			temp = temp.concat(globalRoutes[i].children)
		}
	}
	return temp.length >= 1 ? fnCurrentRouteType(route, temp) : 'main'
}

/**
 * 添加动态(菜单)路由
 * @param {*} menuList 菜单列表
 * @param {*} routes 递归创建的动态(菜单)路由
 */
function fnAddDynamicMenuRoutes(menuList = [], routes = []) {
	var temp = []
	for (var i = 0; i < menuList.length; i++) {
		if (menuList[i].children && menuList[i].children.length >= 1) {
			temp = temp.concat(menuList[i].children)
		} else if (menuList[i].requestAction && /\S/.test(menuList[i].requestAction)) {

			menuList[i].requestAction = menuList[i].requestAction.replace(/^\//, '')
			var route = {
				path: menuList[i].context + '/' + menuList[i].requestAction.replace('/', '/'),
				// component: _import('modules/sys/' + menuList[i].requestAction.replace('/', '/')) || null,
				component: null,
				name: menuList[i].requestAction.replace('/', '/'),
				meta: {
					menuId: menuList[i].menuId,
					title: menuList[i].menuName,
					isDynamic: true,
					isTab: true,
					iframeUrl: ''
				}
			}
			// url以http[s]://开头, 通过iframe展示
			if (isURL(menuList[i].requestAction)) {
				route['path'] = `i-${menuList[i].menuId}`
				route['name'] = `i-${menuList[i].menuId}`
				route['meta']['iframeUrl'] = menuList[i].context + '/' + menuList[i].requestAction
			} else {
				try {
					route['component'] = _import(`modules/${menuList[i].requestAction}`) || null
				} catch (e) {}
			}

			routes.push(route)
		}
	}
	if (temp.length >= 1) {
		fnAddDynamicMenuRoutes(temp, routes)
	} else {
		// debugger;
		mainRoutes.name = 'main-dynamic'
		routes = routes.concat(defaultMainTemp)
		mainRoutes.children = routes
		router.addRoutes([
			mainRoutes,
			{
				path: '*',
				redirect: {
					name: '404'
				}
			}
		])
		sessionStorage.setItem('dynamicMenuRoutes', JSON.stringify(mainRoutes.children || '[]'))
	}

}
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
// export function resetRouter() {
//   const newRouter = createRouter()
//   router.matcher = newRouter.matcher // reset router
// }
export default router

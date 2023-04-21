import Vue from 'vue'
import App from './App.vue'
import routes from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import './components/dialog'
import '@/icons' // icon
import { permitBtnAuth, findDicts, getDictsBySync } from "@/utils/dataHandler";
import AuthBtn from "@/components/auth-btn";
Vue.prototype.$axios = axios // 可以使用this.$axios了
axios.defaults.headers.common['Cache-Control'] = 'no-cache' // IE配置此项无效
Vue.use(ElementUI, { size: 'small' })
Vue.component("auth-btn", AuthBtn);
Vue.config.productionTip = false

import mockXHR from '../mock'
import Banner from '@/components/banner'
Vue.use(Banner)
import { Anchor, Affix } from 'ant-design-vue'
Vue.use(Anchor)
Vue.use(Affix)

// 注册全局过滤器
import { urgencyLevelFormatter } from '@/filters/filters'
Vue.filter('urgencyLevelFormatter', urgencyLevelFormatter)
Vue.prototype.$permitBtnAuth = permitBtnAuth; // 按钮获取权限方法
Vue.prototype.$findDicts = findDicts; // 查询指定字典 字典项的公共方法
Vue.prototype.$getDictsBySync = getDictsBySync; // 字典字典项的同步方法
// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')

import "vue-element-extends/lib/index.css";
import { Editable, EditableColumn } from "vue-element-extends"
Vue.use(Editable)
Vue.use(EditableColumn)
//判断开发环境 
if (process.env.NODE_ENV === "development"){
    mockXHR()
    // 是否显示布局（头部 菜单 ） true为显示 false为不显示
    generalConfig.hasLayout=true
}

// qiankun
if (window.__POWERED_BY_QIANKUN__) {
  // eslint-disable-next-line no-undef
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

export async function bootstrap() {
  console.log('[vue] vue app bootstraped');
}

export async function mount(props) {
  console.log('[vue] props from main framework', props);
  storeTest(props);
  render(props);
}

export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
  router = null;
}

let router = null;
let instance = null;

function render(props = {}) {
  const { container } = props;
  router = routes;

  instance = new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount(container ? container.querySelector('#app') : '#app');
}

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

function storeTest(props) {
  props.onGlobalStateChange &&
    props.onGlobalStateChange(
      (value, prev) => console.log(`[onGlobalStateChange - ${props.name}]:`, value, prev),
      true,
    );
  props.setGlobalState &&
    props.setGlobalState({
      ignore: props.name,
      user: {
        name: props.name,
      },
    });
}







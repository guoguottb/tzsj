import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './store'
import axios from 'axios'
import Vant from 'vant'
import pdf from 'vue-pdf'
import 'vant/lib/index.css'
// px转rem
import 'lib-flexible/flexible'
// 使用 canvas 实现手写电子签名
import vueEsign from 'vue-esign'
// import initRichText from './utils/initHTMLEditor.js'
import 'font-awesome/css/font-awesome.min.css'
import * as filters from '@/filters' // global filter
// 过滤器
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})
Vue.use(vueEsign)
Vue.use(Vant)
Vue.use(ElementUI)
Vue.use(pdf)
Vue.prototype.$axios = axios
Vue.config.productionTip = false
// Vue.use(Lazyload);
// 注册时可以配置额外的选项
// Vue.use(Lazyload, {
//   lazyComponent: true,
// });

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')

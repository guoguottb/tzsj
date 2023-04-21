/*
  g-banner组件入口文件
  安装：
    在main.js中，
    import Banner from '@/components/banner'
    Vue.use(Banner)
  使用：
    <g-banner title="banner标题" des="banner详情"></g-banner>
*/
import banner from './banner.vue'
export default {
  install(Vue) {
    Vue.component('g-banner', banner)
  }
}

/*
   本文件为mockjs配置文件，在main.js中调用。
   页面发起的每个请求都会经过本文件，并返回由mockjs生成的测试数据，我们称之为“拦截ajax请求”，
   所以浏览器中查看不到xhr。
   没有后端数据时，可配置vue.config.js和main.js来控制是否连接mockserver。
*/

import { getMenuList } from './modules/menu'
export default () => {
   getMenuList("")
}

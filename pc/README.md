## qiankun微应用模版
- main中要导出qiankun的生命周期
- vue.config中的packageName要与rac返回的qiankun微应用name一致
- 微应用调用umc和rac的context要与主应用一致，如主应用umc的上下文是”umc“，则微应用也应为“umc”，不能为其他
- 微应用存入session中的menuList的key不能再叫menuList，因为主应用已经使用menuList，不然会覆盖（在static/general.config.js中配置））
- 微应用同样还要注册动态路由，请求rac的menu/app时需要传入子应用的appId，当前系统的appId，请在static/general.config.js中配置
- 
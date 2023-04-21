<template>
    <div class="g-box">
        <h3>
            qiankun微应用模板
        </h3>
        <el-divider></el-divider>
        <p>本应用的菜单和路由为mock的，如不使用mock，请自行修改（main.js中将mockXHR注释掉即可）</p>
        <p>配置基本已配好,开发时1请自行修改home的路由地址(router/index.js中home的component引入文件)</p>
        <p>vue.config中的packageName要与rac返回的qiankun微应用name一致</p>
        <p>微应用调用umc和rac的context要与主应用一致，如主应用umc的上下文是”umc“，则微应用也应为“umc”，不能为其他</p>
        <p>微应用存入session中的menuList的key不能再叫menuList，因为主应用已经使用menuList，不然会覆盖（在static/general.config.js中配置）</p>
        <p>微应用同样还要注册动态路由，在请求rac的menu/app时需要传入子应用的appId，当前系统的appId，请在static/general.config.js中配置</p>
        <el-divider></el-divider>
        <p>开发参考页面：</p>
        <a @click='$router.push({name:"umc/security/role/role-manage"})'>角色管理（增删改查类）</a>
        <a @click='$router.push({name:"umc/user/user-manage"})'>用户管理（左侧树右侧列表）</a>
        更多示例页面请参考百舸框架：<a href="http://10.10.4.129/ue_template/#/dashboard" target="_blank">http://10.10.4.129/ue_template/#/dashboard</a>
  
        <el-divider></el-divider>
        <p>开发注意事项： <!--<img src="http://127.0.0.1/demo/test">--></p> 
        <p><el-tag>1</el-tag>vue单页面最外层div请加入此class样式名:g-box;dialog外层请加入g-dialog</p>
        <p><el-tag>2</el-tag>dialog外层请加入g-dialog</p>
        <p><el-tag>3</el-tag>整体样式要统一，与百舸框架一致</p>
        <p><el-tag>3</el-tag>各组件使用方法请参考element官网,element-ui版本为2.13.0以上</p>
    </div>
</template>

<script>
</script>

<style>
</style>

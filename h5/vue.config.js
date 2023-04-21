const path = require('path')
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
const resolve = (dir) => path.join(__dirname, dir)
module.exports = {
  // publicPath: process.env.NODE_ENV === 'production' ? '/testphone/' : '/testphone/', // 公共路径testphone/phone
  publicPath: process.env.NODE_ENV === 'production' ? '/phone/' : '/phone/', // 公共路径testphone/phone
  indexPath: 'index.html', // 相对于打包路径index.html的路径
  outputDir: process.env.outputDir || 'phone', // 'dist', 生产环境构建文件的目录 // phone
  assetsDir: 'static', // 相对于outputDir的静态资源(js、css、img、fonts)目录
  lintOnSave: false, // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: !IS_PROD, // 生产环境的 source map
  parallel: require('os').cpus().length > 1, // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  pwa: {}, // 向 PWA 插件传递选项。
  chainWebpack: (config) => {
    config.resolve.symlinks(true) // 修复热更新失效
    // 如果使用多页面打包，使用vue inspect --plugins查看html是否在结果数组中
    config.plugin('html').tap((args) => {
      // 修复 Lazy loading routes Error
      args[0].chunksSortMode = 'none'
      return args
    })
    config.resolve.alias // 添加别名
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@components', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@store', resolve('src/store'))
  },
  css: {
    extract: IS_PROD,
    // requireModuleExtension: false,// 去掉文件名中的 .module
    loaderOptions: {
      // px转rem
      postcss: {
        plugins: [
          require('postcss-plugin-px2rem')({
            rootValue: 75, //换算基数， 默认100  ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
            // unitPrecision: 5, //允许REM单位增长到的十进制数字。
            //propWhiteList: [],  //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
            // propBlackList: [], //黑名单
            exclude: /(node_module)/, //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)\/如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
            // selectorBlackList: [], //要忽略并保留为px的选择器
            // ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
            // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
            mediaQuery: false, //（布尔值）允许在媒体查询中转换px。
            minPixelValue: 3, //设置要替换的最小像素值(3px会被转rem)。 默认 0
          }),
        ],
      },
      // px转rem
      // 给 less-loader 传递 Less.js 相关选项
      less: {
        // `globalVars` 定义全局对象，可加入全局变量
        globalVars: {
          primary: '#333',
        },
      },
    },
  },
  devServer: {
    overlay: {
      // 让浏览器 overlay 同时显示警告和错误
      warnings: true,
      errors: true,
    },
    // host: "localhost",
    // host: '0.0.0.0', //localhosts
    port: 3003, // 端口号
    https: false, // https:{type:Boolean}
    open: false, //配置自动启动浏览器
    hotOnly: true, // 热更新
    // proxy: 'http://localhost:8080'   // 配置跨域处理,只有一个代理
    proxy: {
      //配置多个跨域
      '/social': {
        // target: 'http://192.168.1.55:10027',
        // target: 'http://192.168.1.62:10029',
        // target: 'http://192.168.1.188:10028', //潘工
        // target: 'http://192.168.1.62:10028', //艾工
        // target: 'http://192.168.1.167:10028/', //史工
        target: 'http://192.168.1.69:10028/', //熊
        changeOrigin: true, //是否跨域
        // ws: true,//websocket支持
        secure: false,
        // pathRewrite: {
        //     "^/loginAccount": "/"  // 发送请求时，请求路径重写：将 /loginAccount/xxx --> /xxx （去掉/loginAccount）
        // }
      },
      '/socialTest': {
        // target: 'http://192.168.1.55:10027',
        // target: 'http://192.168.1.62:10029',
        // target: 'http://192.168.1.188:10028', //潘工
        // target: 'http://192.168.1.62:10028', //艾工
        // target: 'http://192.168.1.167:10028/',	//史工
        target: 'http://192.168.1.69:10028/', //熊
        changeOrigin: true, //是否跨域
        // ws: true,//websocket支持
        secure: false,
        // pathRewrite: {
        //     "^/loginAccount": "/"  // 发送请求时，请求路径重写：将 /loginAccount/xxx --> /xxx （去掉/loginAccount）
        // }
      },
      '/assistanceWeixin': {
        // target: "http://192.168.1.55:10027",
        // target: 'http://192.168.1.62:10029',
        // target: 'http://192.168.1.188:10028',
        // target: 'http://192.168.1.62:10028',
        // target: 'http://192.168.1.167:10028/',
        target: 'http://192.168.1.69:10028/',
        // target: 'http://218.90.225.71:10111',
        changeOrigin: true,
        //ws: true,//websocket支持
        secure: false,
        // pathRewrite: {
        //     "^/api2": "/"
        // }
      },

      //不能直接用 “/” ,否则不会使用前端定义路由
      // "/": {
      // 	// target: "http://192.168.1.55:10027",
      // 	// target: 'http://192.168.1.62:10029',
      // 	// target: 'http://192.168.1.62:10027',
      // target: 'http://192.168.1.62:10028',
      // 	changeOrigin: true,
      // 	//ws: true,//websocket支持
      // 	secure: false,
      // 	// pathRewrite: {
      // 	//     "^/api2": "/"
      // 	// }
      // },
    },
  },
}

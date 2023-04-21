// vue配置文件
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
const packageName = 'umc-default'
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: './',
  assetsDir: 'static', // 静态资源文件夹
  productionSourceMap: false,
  devServer: {
    port: 9633, // webpack开发服务器端口  
    hot: true,
    proxy: {
      // 代理 配置多个跨域
      '/umc': {
        // target: 'http://192.168.1.52/',
        // target: 'http://8.136.193.200/',
        target: 'http://192.168.1.69/',
        // target: 'http://192.168.1.62/',
        // target: 'http://192.168.1.188:81/',
        // target: 'http://192.168.1.167:80/',
        // target: 'http://192.168.43.114/',
        // target: 'http://192.168.2.188/',
      },
      '/rac': {
        // target: 'http://192.168.1.52/',
        // target: 'http://8.136.193.200/',
        // target: 'http://192.168.1.188:81/',
        // target: 'http://192.168.1.167:80/',
        target: 'http://192.168.1.69/',
        // target: 'http://192.168.1.62/',
        // target: 'http://192.168.43.114/',
        // target: 'http://192.168.2.188/',
      },
      '/demo': {
        // target: 'http://192.168.1.52/',
        // target: 'http://8.136.193.200/',
        // target: 'http://192.168.1.188/',
        // target: 'http://192.168.1.167/',
        target: 'http://192.168.1.69/',
        // target: 'http://192.168.1.62/',
        // target: 'http://192.168.43.114/',
        // target: 'http://192.168.2.188/',
      },
      '/user': {
        // target: 'http://192.168.1.52:10026/',
        // target: 'http://8.136.193.200:10088/',
        // target: 'http://192.168.1.115:9633/',
        // target: 'http://192.168.1.188:10025/',
        // target: 'http://192.168.1.167:10025/',
        target: 'http://192.168.1.69:10025/',
        // target: 'http://192.168.1.62:10025/',
        // target: 'http://192.168.43.114:10025/',
        // target: 'http://192.168.2.188:10025/',
        changeOrigin: true,
        ws: true,
      },
      '/social': {
        // target: 'http://192.168.1.52:10026/',
        // target: 'http://8.136.193.200:10088/',
        // target: 'http://192.168.1.115:9633/',
        // target: 'http://192.168.1.188:10025/',
        // target: 'http://192.168.1.167:10025/',
        target: 'http://192.168.1.69:10025/',
        // target: 'http://192.168.1.20:10025/',
        // target: 'http://192.168.1.62:10025/',
        // target: 'http://192.168.43.114:10025/',
        // target: 'http://192.168.2.188:10025/',
        changeOrigin: true,
        ws: true,
      },
      '/weida': {
        // target: 'http://192.168.1.52:10026/',
        // target: 'http://8.136.193.200:10088/',
        // target: 'http://192.168.1.115:9633/',
        // target: 'http://192.168.1.188:10025/',
        // target: 'http://192.168.1.167:10025/',
        target: 'http://192.168.1.69:10025/',
        // target: 'http://192.168.1.62:10025/',
        // target: 'http://192.168.43.114:10025/',
        // target: 'http://192.168.2.188:10025/',
        changeOrigin: true,
        ws: true,
      },
      '/assistance': {
        // target: 'http://192.168.1.52:10026/',    //刘工
        // target: 'http://8.136.193.200:10088/',
        // target: 'http://192.168.1.115:9633/',
        // target: 'http://192.168.1.188:10025/', //潘工
        // target: 'http://192.168.1.167:10025/', //史工
        target: 'http://192.168.1.69:10025/',
        // target: 'http://192.168.1.62:10025/', //艾工
        // target: 'http://192.168.43.114:10025/',
        changeOrigin: true,
        ws: true,
      },
      '/salvation2': {
        // target: 'http://192.168.1.52:10026/',
        // target: 'http://8.136.193.200:10088/',
        // target: 'http://192.168.1.115:9633/',
        // target: 'http://192.168.1.188:10025/',
        // target: 'http://192.168.1.167:10025/',
        target: 'http://192.168.1.69:10025/',
        // target: 'http://192.168.1.62:10025/',
        // target: 'http://192.168.43.114:10025/',
        changeOrigin: true,
        ws: true,
      },
    }, // 有后端时使用proxy，无后端时配置main.js
  },
  configureWebpack: {
    externals: [
      {
        './cptable': 'var cptable',
      },
    ],
    plugins: [
      new CopyWebpackPlugin([
        {
          from: resolve('./static'), // 不打包直接输出的文件
          to: 'grp_config', // 打包后静态文件放置位置
          ignore: ['.*'], // 忽略规则。（这种写法表示将该文件夹下的所有文件都复制）
        },
      ]),

      // 打包时清除console
      // new UglifyJsPlugin({
      //     uglifyOptions: {
      //       compress: {
      //         warnings: false,
      //         drop_debugger: true, // console
      //         drop_console: true,
      //         pure_funcs:['console.log'] // 移除console
      //       },
      //     },
      //     sourceMap: false,
      //     parallel: true,
      // })
    ],
    output: {
      // 把子应用打包成 umd 库格式
      // library: 'umc',
      // library: `${name}-[name]`,
      library: `${packageName}`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${packageName}`,
    },
  },
}
